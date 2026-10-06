/**
 * DON'T GET FORKED — chases and the lock-up at the table (GM-authoritative)
 * ------------------------------------------------------------------------
 * The Foundry side of module/logic/chase.mjs and lockup.mjs. Everything here
 * runs on the active Storyteller's (GM's) client, through the raid store's one
 * write queue; players reach it with GM operations (runOp).
 *
 *  - raid.roll: a roll card reached the GM — its Suspicion (when automatic), its
 *    place in an open group check, its round in the chase, a caught Entity's
 *    local chase, and the lock-up (slipping free, a rescue);
 *  - the hunt starting starts the final flight (a local chase still running ends
 *    and its Entities join the flight);
 *  - each round the ground is rolled, and once everyone has rolled the Lead moves
 *    (the majority rule for a shared Lead); escape or cornered ends the chase:
 *    cornered in a local chase is captured (the town takes back the loot; Already
 *    Dead loses its next Turn instead), in the final flight it is forked;
 *  - the Storyteller's hand on the tracker: start, roll the ground, resolve the
 *    round, Lead ±1, end, add or take out a member, capture or free.
 * Every automation is switchable (autoChase, autoLockup, autoGroupChecks, autoYear).
 */
import { SETTINGS, OPS, CARD, ACTOR_TYPES } from "../contracts.mjs";
import { DGF } from "../config.mjs";
import * as R from "../logic/raid.mjs";
import * as C from "../logic/chase.mjs";
import { captureUpdate, freeUpdate, isCaptive } from "../logic/lockup.mjs";
import { groupRecord, groupDone, closeGroup, groupCaught } from "../logic/checks.mjs";
import { registerOp, isActiveGM } from "../net/gm-ops.mjs";
import { setting } from "../settings.mjs";
import { getRaid, mutateRaid, onRaidMutation } from "./store.mjs";
import { cardOf, updateCard, postCard } from "../chat/cards.mjs";

const isEntity = (actor) => actor?.type === ACTOR_TYPES.entity;
const randomID = () => foundry.utils.randomID();
const prefix = (update) => Object.fromEntries(Object.entries(update).map(([k, v]) => [`system.${k}`, v]));

/** The Entities in the world (those with one of the eight chosen). */
export function entities() {
  return game.actors.filter((a) => isEntity(a) && a.system.entityKey);
}

/** A chase member from an Entity actor. */
export function memberFor(actor) {
  return C.memberOf({ id: actor.id, name: actor.name, system: actor.system });
}

/** Everyone who flees in the final flight: every Entity who isn't captured. */
export function partyForFlight() {
  return entities().filter((a) => !isCaptive(a.system)).map(memberFor);
}

/* ------------------------------------------------------------ starting -- */

/** A local chase for these caught Entities (one, or several caught in one group check, on a shared Lead). */
export function startLocal(state, actorIds, { groupId = "", where = "" } = {}) {
  if (state.over) return { state, started: false, reason: "raidOver" };
  if (state.hunt) return { state, started: false, reason: "huntOn" };
  if (C.isRunning(state.chase)) return { state, started: false, reason: "chaseRunning" };
  const members = [...new Set(actorIds)].map((id) => game.actors.get(id)).filter(isEntity).map(memberFor);
  if (!members.length) return { state, started: false, reason: "nobody" };
  const chase = C.newChase({ id: randomID(), kind: "local", cause: "caught", members, turn: state.turn, groupId, where });
  return { state: R.setChase(state, chase), started: true, chase };
}

/** The final flight: everyone who isn't captured flees together. */
export function startFinal(state, cause = "manual") {
  if (state.over) return { state, started: false, reason: "raidOver" };
  if (C.isRunning(state.chase) && state.chase.kind === "final") return { state, started: false, reason: "chaseRunning" };
  let s = state;
  if (C.limitEndsLocal(s.chase)) s = R.setChase(s, C.endChase(s.chase, "ended"));
  const members = partyForFlight();
  if (!members.length) return { state: s, started: false, reason: "nobody" };
  const chase = C.newChase({ id: randomID(), kind: "final", cause, members, turn: s.turn });
  return { state: R.setChase(s, chase), started: true, chase };
}

/**
 * Inside every raid write: when the whole town starts to hunt, a local chase ends
 * at once and everyone who isn't captured flees in the final flight; when the
 * Storyteller stops the hunt, the flight is called off.
 */
function huntTransform(state, before) {
  if (!setting(SETTINGS.autoChase)) return state;
  if (state.hunt && !before.hunt) return startFinal(state, state.huntCause || "manual").state;
  if (!state.hunt && before.hunt && C.isRunning(state.chase) && state.chase.kind === "final") return R.setChase(state, C.endChase(state.chase, "dropped"));
  return state;
}

/* -------------------------------------------------------- announcing -- */

function chaseFacts(chase, state, extra = {}) {
  return {
    v: 1, kind: CARD.chase, raidId: state.raidId, chaseId: chase.id, chaseKind: chase.kind, cause: chase.cause,
    round: chase.round, lead: chase.lead, start: chase.start, escape: chase.escape, mob: chase.mob,
    ground: chase.ground ? { ...chase.ground } : null, members: chase.members.map((m) => m.name), outcome: chase.outcome, ...extra,
  };
}

/** What being cornered or getting clear means, for the card. */
function outcomeFacts(chase) {
  if (chase.outcome === "cornered") return { fates: C.corneredFates(chase).map((f) => ({ name: f.name, fate: f.fate })) };
  return {};
}

/** Inside every raid write, after the save: the chase cards (start, each round's Lead, the end). */
async function announceChase(before, state) {
  if (state.raidId !== before.raidId) return; // a new raid: nothing to say about the last one's chase
  const c = state.chase, b = before.chase;
  if (b && C.isRunning(b) && (!c || c.id !== b.id)) await postCard(chaseFacts({ ...b, outcome: "ended" }, state, { event: "end" }));
  if (!c) return;
  if (!b || b.id !== c.id) {
    await postCard(chaseFacts(c, state, { event: "start" }));
    return;
  }
  if (c.history.length > b.history.length) {
    const h = c.history.at(-1);
    await postCard(chaseFacts(c, state, { event: "round", round: h.round, mob: h.mob, ground: C.groundOn(h.face), move: h.move, rolls: h.rolls.map((r) => ({ name: r.name, band: r.band, critical: r.critical })), ...outcomeFacts(c) }));
  } else if (c.outcome && !b.outcome) {
    await postCard(chaseFacts(c, state, { event: "end", ...outcomeFacts(c) }));
  }
}

/* ------------------------------------------------------- running it -- */

const pendingGround = new Set();

/**
 * Roll the ground for this chase's round (one d6 on the chase table, for everyone) and check the mob.
 * Once per round; `force` (the Storyteller's button) rolls it again while nobody has rolled yet.
 */
export async function rollGround({ id, round, force = false } = {}) {
  const now = getRaid().chase;
  if (!C.isRunning(now)) return { ok: false, reason: "noChase" };
  if (now.ground && !force) return { ok: false, reason: "groundRolled" };
  const key = `${id ?? now.id}:${round ?? now.round}`;
  if (pendingGround.has(key)) return { ok: false, reason: "pending" };
  pendingGround.add(key);
  try {
    const roll = await new Roll("1d6").evaluate();
    const { state, result } = await mutateRaid((s) => {
      const c = s.chase;
      if (!C.isRunning(c) || (id && c.id !== id) || (round && c.round !== round)) return { state: s, result: { ok: false, reason: "noChase" } };
      if (Object.keys(c.rolls).length) return { state: s, result: { ok: false, reason: "alreadyRolling" } };
      if (c.ground && !force) return { state: s, result: { ok: false, reason: "groundRolled" } };
      return { state: R.setChase(s, C.startRound(c, { face: roll.total, suspicion: R.suspicionOf(s).value, label: s.difficulty })), result: { ok: true } };
    });
    if (!result.ok) return result;
    const c = state.chase;
    const weak = c.members.filter((m) => C.weaknessFor(c, m.actorId, { overdrawn: !!game.actors.get(m.actorId)?.system?.weaknessInPlay })).map((m) => m.name);
    await postCard(chaseFacts(c, state, { event: "ground", weak, extras: c.members.filter((m) => C.traitsFor(c, m.actorId).length > c.ground.traits.length).map((m) => ({ name: m.name, traits: C.traitsFor(c, m.actorId) })) }), { rolls: [roll] });
    return { ok: true, face: roll.total };
  } finally {
    pendingGround.delete(key);
  }
}

/** Move the Lead by the round's rolls (everyone has rolled). */
export async function resolveNow({ id, round } = {}) {
  const { result } = await mutateRaid((s) => {
    const c = s.chase;
    if (!C.isRunning(c) || (id && c.id !== id) || (round && c.round !== round)) return { state: s, result: { ok: false, reason: "noChase" } };
    if (!C.roundDone(c)) return { state: s, result: { ok: false, reason: "waiting" } };
    const out = C.resolveRound(c);
    return { state: R.setChase(s, out.chase), result: { ok: true, move: out.move, outcome: out.outcome } };
  });
  return result;
}

/** After a write: the next step of a chase the automation runs (roll the ground, or move the Lead). */
export async function driveChase() {
  if (!isActiveGM() || !setting(SETTINGS.autoChase)) return null;
  const c = getRaid().chase;
  if (!C.isRunning(c)) return null;
  if (!c.ground) return rollGround({ id: c.id, round: c.round });
  if (C.roundDone(c)) return resolveNow({ id: c.id, round: c.round });
  return null;
}

/**
 * Capture an Entity: held at the lock-up, and the town takes back what it carried. F15: a
 * carrier's furniture is lost for the night — nobody carries it any more and it can't come home.
 */
async function capture(actor, turn) {
  const c = captureUpdate(actor.system, { turn });
  await actor.update(prefix(c.update));
  if (c.furniture) {
    await mutateRaid((s) => R.loseFurniture(s));
    for (const other of entities().filter((a) => a.id !== actor.id && a.system.carryingFurniture)) await other.update({ "system.carryingFurniture": false });
  }
  return { name: actor.name, taken: c.taken, kept: c.kept, furniture: c.furniture };
}

/** What a chase's end does to the Entities and the raid (once, when its outcome is first known). */
async function consequences(chase, state) {
  if (chase.outcome === "cornered" && chase.kind === "local" && setting(SETTINGS.autoLockup)) {
    const fates = [];
    for (const f of C.corneredFates(chase)) {
      const actor = game.actors.get(f.actorId);
      if (!isEntity(actor)) continue;
      if (f.fate === "captured") fates.push({ ...(await capture(actor, state.turn)), fate: "captured" });
      else if (f.fate === "loseTurn") { await actor.update({ "system.skipTurn": state.turn + 1 }); fates.push({ name: actor.name, fate: "loseTurn", skipTurn: state.turn + 1 }); }
    }
    if (fates.length) await postCard(chaseFacts(chase, state, { event: "captured", fates }));
  }
  if (chase.kind === "final" && ["escaped", "cornered", "dropped"].includes(chase.outcome) && setting(SETTINGS.autoChase)) {
    // the Weakness an overdraw brought lasts to the end of the flight
    for (const m of chase.members) {
      const actor = game.actors.get(m.actorId);
      if (isEntity(actor) && actor.system.weaknessInPlay) await actor.update({ "system.weaknessInPlay": false });
    }
  }
  if (chase.kind === "final" && setting(SETTINGS.autoYear)) {
    const { finishForked, promptHome } = await import("./raid-checks.mjs");
    if (chase.outcome === "cornered") await finishForked();
    else if (chase.outcome === "escaped") await promptHome("flight");
  }
}

/** After every raid write: a newly ended chase's consequences, then the chase's next automatic step. */
async function chaseFollowUp(state, before) {
  const c = state.chase, b = before.chase;
  if (c?.outcome && !(b && b.id === c.id && b.outcome)) await consequences(c, state);
  // the whole town hunts, but everyone is held at the lock-up: nobody flees, the raid is over
  if (isActiveGM() && state.hunt && !before.hunt && !state.over && setting(SETTINGS.autoChase) && setting(SETTINGS.autoYear)
    && !(C.isRunning(c) && c.kind === "final") && !partyForFlight().length && entities().length) {
    const { promptHome } = await import("./raid-checks.mjs");
    await promptHome("nobody");
  }
  await driveChase();
}

/* ------------------------------------------------------ GM operations -- */

async function markChaseStarted(messageIds, chaseId) {
  for (const id of messageIds) {
    const m = game.messages.get(id);
    if (m && cardOf(m) && !cardOf(m).chaseStarted) await updateCard(m, { chaseStarted: chaseId });
  }
}

/** The messages of a group check's caught rolls (this raid). */
function caughtInGroup(groupId, raidId) {
  return game.messages.contents.filter((m) => {
    const c = cardOf(m);
    return c?.kind === CARD.roll && c.raidId === raidId && c.groupId === groupId && c.caught;
  });
}

function warnGM(reason) {
  if (reason && game.user?.isGM) ui.notifications.warn(game.i18n.localize(`DGF.Chase.refused.${reason}`));
}

/** The lock-up after a slip or rescue roll (setting autoLockup): who is free now. */
async function lockupEffects(card, turn) {
  if (!setting(SETTINGS.autoLockup)) return [];
  const freed = [];
  if (card.lockup === "slip") {
    const actor = game.actors.get(card.actorId);
    if (isEntity(actor) && isCaptive(actor.system)) {
      await actor.update({ "system.slipTurn": turn, ...(card.freed ? prefix(freeUpdate()) : {}) });
      if (card.freed) freed.push(actor.name);
    }
  }
  if (card.rescued) {
    for (const actor of entities().filter((a) => isCaptive(a.system))) {
      await actor.update(prefix(freeUpdate()));
      freed.push(actor.name);
    }
  }
  return freed;
}

export function registerChaseOps() {
  onRaidMutation({ transform: huntTransform, announce: announceChase, followUp: chaseFollowUp });

  // Anyone: a roll card reached the GM. Everything is read from the card, never from the request.
  registerOp(OPS.raidRoll, {
    apply: async ({ messageId }) => {
      const message = game.messages.get(messageId);
      const card = cardOf(message);
      if (card?.kind !== CARD.roll) return { ok: false, reason: "notARoll" };
      const raid = getRaid();
      if (card.raidId !== raid.raidId) return { ok: false, reason: "otherRaid" };
      const autoSusp = setting(SETTINGS.autoSuspicion) && card.suspicion > 0 && !card.hunt && !card.cancelled;
      const autoChase = setting(SETTINGS.autoChase);
      const autoGroup = setting(SETTINGS.autoGroupChecks);
      const { state, result } = await mutateRaid((s0) => {
        let s = s0;
        const res = { suspicion: false, chase: "", group: "", started: "" };
        if (autoSusp) {
          s = R.recordEvent(s, { eventId: card.eventId, amount: card.suspicion, source: card.kind, label: card.suspicionLabel ?? "", actorName: card.actorName ?? "", messageId });
          res.suspicion = true;
        }
        // its round in the chase (the Limit may have just ended a local chase: then it no longer counts)
        if (card.chaseId && s.chase?.id === card.chaseId) {
          const r = C.recordRoll(s.chase, card.actorId, { messageId, round: card.chaseRound, band: card.band, critical: card.critical });
          if (r.ok) s = R.setChase(s, r.chase);
          res.chase = r.reason ?? "recorded";
        }
        // its place in the group check; when everyone has rolled, those caught flee together
        let caughtIds = [];
        if (card.groupId && autoGroup && s.group?.id === card.groupId) {
          const g = groupRecord(s.group, card.actorId, { messageId, caught: card.caught });
          if (g.ok) {
            s = R.setGroup(s, g.group);
            if (groupDone(g.group)) {
              s = R.setGroup(s, closeGroup(g.group));
              res.group = "closed";
              caughtIds = groupCaught(g.group).map((m) => m.actorId);
            } else res.group = "recorded";
          } else res.group = g.reason;
        } else if (card.caught) caughtIds = [card.actorId];
        if (caughtIds.length && autoChase) {
          const st = startLocal(s, caughtIds, { groupId: card.groupId && res.group === "closed" ? card.groupId : "" });
          s = st.state;
          res.started = st.started ? st.chase.id : "";
          res.refused = st.reason ?? "";
        }
        return { state: s, result: res };
      });
      const patch = { gmSeen: true };
      if (result.suspicion && !card.applied) patch.applied = true;
      await updateCard(message, patch);
      if (result.started) {
        const ids = card.groupId && result.group === "closed" ? caughtInGroup(card.groupId, raid.raidId).map((m) => m.id) : [messageId];
        await markChaseStarted(ids, result.started);
      } else if (result.refused && result.refused !== "nobody") warnGM(result.refused);
      const freed = await lockupEffects(card, state.turn);
      if (freed.length) await updateCard(message, { freedNames: freed });
      if (card.wayOutBeaten && setting(SETTINGS.autoYear) && !state.over) {
        const { promptHome } = await import("./raid-checks.mjs");
        await promptHome("wayOut");
      }
      return { ok: true, ...result, freed };
    },
  });

  // GM: a local chase from a caught card (its whole group check), or the final flight, by hand.
  registerOp(OPS.chaseStart, {
    gmOnly: true,
    apply: async ({ messageId = "", final = false } = {}) => {
      if (final) {
        const { result } = await mutateRaid((s) => {
          const st = startFinal(s, s.huntCause || "manual");
          return { state: st.state, result: st };
        });
        return result.started ? { ok: true, chaseId: result.chase.id } : { ok: false, reason: result.reason };
      }
      const message = game.messages.get(messageId);
      const card = cardOf(message);
      if (card?.kind !== CARD.roll || !card.caught) return { ok: false, reason: "notCaught" };
      const raid = getRaid();
      if (card.raidId !== raid.raidId) return { ok: false, reason: "otherRaid" };
      if (card.chaseStarted) return { ok: false, reason: "alreadyStarted" };
      const msgs = card.groupId ? caughtInGroup(card.groupId, raid.raidId) : [message];
      const ids = msgs.map((m) => cardOf(m).actorId);
      const { result } = await mutateRaid((s) => {
        let st = s;
        if (card.groupId && s.group?.id === card.groupId && s.group.open) st = R.setGroup(st, closeGroup(s.group));
        const out = startLocal(st, ids, { groupId: card.groupId ?? "" });
        return { state: out.started ? out.state : s, result: out };
      });
      if (!result.started) return { ok: false, reason: result.reason };
      await markChaseStarted(msgs.map((m) => m.id), result.chase.id);
      return { ok: true, chaseId: result.chase.id };
    },
  });

  registerOp(OPS.chaseGround, {
    gmOnly: true,
    apply: async () => {
      const c = getRaid().chase;
      if (!C.isRunning(c)) return { ok: false, reason: "noChase" };
      return rollGround({ id: c.id, round: c.round, force: true });
    },
  });

  registerOp(OPS.chaseResolve, {
    gmOnly: true,
    apply: async () => resolveNow({}),
  });

  registerOp(OPS.chaseLead, {
    gmOnly: true,
    apply: async ({ delta = 1 }) => {
      const n = Math.sign(Number(delta)) || 0;
      if (!n) return { ok: false, reason: "badDelta" };
      const { result } = await mutateRaid((s) => (C.isRunning(s.chase)
        ? { state: R.setChase(s, C.adjustLead(s.chase, n)), result: { ok: true } }
        : { state: s, result: { ok: false, reason: "noChase" } }));
      return { ...result, lead: getRaid().chase?.lead };
    },
  });

  registerOp(OPS.chaseEnd, {
    gmOnly: true,
    apply: async ({ outcome }) => {
      if (!["escaped", "cornered", "dropped"].includes(outcome)) return { ok: false, reason: "badOutcome" };
      const { result } = await mutateRaid((s) => (C.isRunning(s.chase)
        ? { state: R.setChase(s, C.endChase(s.chase, outcome)), result: { ok: true } }
        : { state: s, result: { ok: false, reason: "noChase" } }));
      return result;
    },
  });

  registerOp(OPS.chaseMember, {
    gmOnly: true,
    apply: async ({ actorId, remove = false }) => {
      const actor = game.actors.get(actorId);
      if (!remove && !isEntity(actor)) return { ok: false, reason: "notAnEntity" };
      const { result } = await mutateRaid((s) => {
        if (!C.isRunning(s.chase)) return { state: s, result: { ok: false, reason: "noChase" } };
        const next = remove ? C.removeMember(s.chase, actorId) : C.addMember(s.chase, memberFor(actor));
        return { state: R.setChase(s, next), result: { ok: true, members: next.members.length } };
      });
      return result;
    },
  });

  // GM: capture (the rules' way: the town takes back the loot) or free an Entity by hand.
  registerOp(OPS.lockupSet, {
    gmOnly: true,
    apply: async ({ actorId, captured }) => {
      const actor = game.actors.get(actorId);
      if (!isEntity(actor)) return { ok: false, reason: "notAnEntity" };
      if (captured) {
        const facts = await capture(actor, getRaid().turn);
        return { ok: true, ...facts };
      }
      await actor.update(prefix(freeUpdate()));
      return { ok: true };
    },
  });
}

/** The chase as the roll dialog needs it: this actor's context, or null when it isn't in a chase. */
export function chaseRollContext(actor, raid = getRaid()) {
  const c = raid.chase;
  if (!C.isRunning(c) || !C.memberIn(c, actor.id)) return null;
  return C.rollContext(c, actor.id, { overdrawn: !!actor.system.weaknessInPlay });
}

/** The Weakness in play for this Entity in the running chase (blocks overdraw in the flight). */
export function chaseWeakness(actorId, raid = getRaid()) {
  const c = raid.chase;
  if (!C.isRunning(c) || !C.memberIn(c, actorId)) return false;
  return C.weaknessFor(c, actorId, { overdrawn: !!game.actors.get(actorId)?.system?.weaknessInPlay });
}

/** The lock-up's Difficulty for this raid (the label's). */
export function lockupDifficulty(raid = getRaid()) {
  return DGF.labels[raid.difficulty]?.lockup ?? DGF.difficulty.hard;
}
