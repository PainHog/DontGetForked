/**
 * DON'T GET FORKED — the raid store (GM-authoritative)
 * ----------------------------------------------------
 * The raid's shared state (module/logic/raid.mjs) lives in the world setting
 * SETTINGS.raidState. Every client reads it; only the active GM writes it, one
 * write at a time (a promise queue), each write a pure function of the last
 * state. Players change it by asking the GM (runOp → the operations below).
 * When it changes, every client fires HOOKS.raidChanged (and suspicionChanged /
 * huntStarted, chaseChanged / chaseEnded) and refreshes its HUD and chase tracker.
 *
 * Slice 2 rides on every write: other parts register a `transform` (state →
 * state, run inside the write, e.g. the hunt starting the final flight) and a
 * `followUp` (run after the write is saved, e.g. rolling the ground, capturing
 * the cornered) with onRaidMutation() — see module/raid/chase-flow.mjs.
 */
import { SYSTEM_ID, SETTINGS, OPS, HOOKS, CARD, ACTOR_TYPES } from "../contracts.mjs";
import { DGF } from "../config.mjs";
import * as R from "../logic/raid.mjs";
import { registerOp, isActiveGM, runOp } from "../net/gm-ops.mjs";
import { setting } from "../settings.mjs";
import { cardOf, updateCard, postCard, setRaidIdReader, setEventAmountReader, postedByOwner } from "../chat/cards.mjs";
import { newRaidUpdate } from "../logic/lockup.mjs";
import { rollAbilities, isInRaid } from "../logic/entity.mjs";
import { assignExtraCharges } from "../logic/rules.mjs";

/** The castle's upgrades (campaign play): the pieces brought home, three at most. */
export function castleUpgrades() {
  const v = game.settings.get(SYSTEM_ID, SETTINGS.castleUpgrades);
  return Array.isArray(v) ? v.map(String) : [];
}

/** The raid as every client sees it now. */
export function getRaid() {
  return R.normalizeRaid(game.settings.get(SYSTEM_ID, SETTINGS.raidState));
}

/** The current Suspicion, Limit, Turn … (for sheets, dialogs, macros). */
export function raidView() {
  return R.raidView(getRaid());
}

let queue = Promise.resolve();
const transforms = []; // (state, before) → state, inside each write
const followUps = []; // async (state, before), after each write is saved
const announcers = []; // async (before, state), inside each write, after the save

/** Register automation that rides on every raid write (see the header). */
export function onRaidMutation({ transform, followUp, announce } = {}) {
  if (transform) transforms.push(transform);
  if (followUp) followUps.push(followUp);
  if (announce) announcers.push(announce);
}

/**
 * GM only: change the raid with a pure function (state → state, or { state, result }).
 * Starts the hunt when it is due (setting autoHunt) and announces what changed.
 */
export function mutateRaid(fn) {
  const job = queue.then(async () => {
    if (!isActiveGM()) throw new Error("only the active GM writes the raid");
    const before = getRaid();
    const out = fn(before);
    let state = out && out.state ? out.state : out;
    const result = out && out.state ? out.result : undefined;
    let huntCause = "";
    if (setting(SETTINGS.autoHunt)) {
      huntCause = R.huntDue(state, before);
      if (huntCause) state = R.setHunt(state, true, huntCause);
    }
    for (const t of transforms) state = t(state, before);
    if (state === before) return { state, before, result, unchanged: true };
    await game.settings.set(SYSTEM_ID, SETTINGS.raidState, state);
    await announceChanges(before, state, huntCause);
    for (const a of announcers) await a(before, state);
    return { state, before, result };
  });
  queue = job.catch(() => {});
  job.then(({ state, before, unchanged }) => {
    if (unchanged) return;
    for (const f of followUps) Promise.resolve().then(() => f(state, before)).catch((err) => console.error("Don't Get Forked | raid follow-up failed", err));
  }, () => {});
  return job;
}

async function announce(event, state, extra = {}) {
  return postCard({ kind: CARD.raid, event, raidId: state.raidId, difficulty: state.difficulty, limit: state.limit, turns: state.turns, ...extra });
}

async function announceChanges(before, state, huntCause) {
  if (state.raidId !== before.raidId) return announce("newRaid", state);
  const atLimit = R.suspicionOf(state).atLimit, wasAtLimit = R.suspicionOf(before).atLimit;
  if (state.hunt && !before.hunt) await announce("hunt", state, { cause: state.huntCause || huntCause || "manual" });
  else if (state.dawn && !before.dawn) await announce("dawn", state);
  else if (atLimit && !wasAtLimit && !state.hunt) await announce("limit", state);
}

/* ------------------------------------------------- every client -- */

const lastSeen = new Map(); // user id → the state that client last saw (one entry in a real client)

/** Ready: remember the state this client starts from. */
export function primeRaid() {
  lastSeen.set(game.user?.id ?? "", getRaid());
}

/** The raid setting changed (runs on every client). */
export function onRaidChange(value, { refresh = () => {} } = {}) {
  const state = R.normalizeRaid(value);
  const key = game.user?.id ?? "";
  const prev = lastSeen.get(key) ?? R.normalizeRaid({});
  lastSeen.set(key, state);
  Hooks.callAll(HOOKS.raidChanged, state, prev);
  const now = R.suspicionOf(state).value, was = R.suspicionOf(prev).value;
  if (now !== was) Hooks.callAll(HOOKS.suspicionChanged, now, was);
  if (state.hunt && !prev.hunt) Hooks.callAll(HOOKS.huntStarted, state);
  if (JSON.stringify(state.chase) !== JSON.stringify(prev.chase)) {
    Hooks.callAll(HOOKS.chaseChanged, state.chase, prev.chase);
    const c = state.chase, p = prev.chase;
    if (p && p.id !== c?.id && !p.outcome) Hooks.callAll(HOOKS.chaseEnded, { ...p, outcome: "ended" }); // replaced while running (the Limit)
    if (c?.outcome && !(p && p.id === c.id && p.outcome)) Hooks.callAll(HOOKS.chaseEnded, c);
  }
  refresh(state, prev);
}

/* ------------------------------------------------- GM operations -- */

async function markCards(eventId, patch) {
  const ids = new Set(getRaid().ledger.filter((e) => e.eventId === eventId && e.messageId).map((e) => e.messageId));
  for (const id of ids) {
    const m = game.messages.get(id);
    if (m && cardOf(m)) await updateCard(m, patch);
  }
}

const isEntity = (actor) => actor?.type === ACTOR_TYPES.entity;
const prefixed = (update) => Object.fromEntries(Object.entries(update).map(([k, v]) => [`system.${k}`, v]));
/** Every Entity in the world (one of the eight chosen), in this raid or not. */
const allEntities = () => game.actors.filter((a) => isEntity(a) && a.system.entityKey);

export function registerRaidOps() {
  setRaidIdReader(() => getRaid().raidId);
  setEventAmountReader((eventId) => R.eventAmount(getRaid(), eventId));

  // Anyone: apply what a roll or ability card raised. The amount comes from the card, never from the request.
  registerOp(OPS.raidApplyCard, {
    apply: async ({ messageId }) => {
      const message = game.messages.get(messageId);
      const card = cardOf(message);
      if (!card || ![CARD.roll, CARD.ability, CARD.tell].includes(card.kind)) return { ok: false, reason: "notACard" };
      if (!postedByOwner(message)) return { ok: false, reason: "notTheirs" }; // a card about someone else's Entity
      const raid = getRaid();
      if (card.raidId !== raid.raidId) return { ok: false, reason: "otherRaid" };
      if (card.cancelled) return { ok: false, reason: "cancelled" };
      if (!(card.suspicion > 0)) return { ok: true, reason: "noop" };
      const { state } = await mutateRaid((s) => R.recordEvent(s, {
        eventId: card.eventId, amount: card.suspicion, source: card.kind,
        label: card.suspicionLabel ?? "", actorName: card.actorName ?? "", messageId,
      }));
      if (!card.applied) await updateCard(message, { applied: true });
      return { ok: true, value: R.suspicionOf(state).value };
    },
  });

  // The Storyteller picks a Cost on a roll card (only one the rules allow there).
  registerOp(OPS.raidCost, {
    gmOnly: true,
    apply: async ({ messageId, choice, itemIndex = 0 }) => {
      const message = game.messages.get(messageId);
      const card = cardOf(message);
      if (card?.kind !== CARD.roll || card.band !== "cost") return { ok: false, reason: "notACost" };
      if (card.raidId !== getRaid().raidId) return { ok: false, reason: "otherRaid" }; // the last raid's card
      if (card.cost) return { ok: false, reason: "alreadyChosen" };
      if (!(card.costs ?? []).includes(choice)) return { ok: false, reason: "notAllowed" };
      // a group check's rolls rise once, by the biggest: a Suspicion +1 the group already raised costs nothing (T10)
      if (choice === "suspicion" && card.groupId && R.eventAmount(getRaid(), card.eventId) >= DGF.suspicion.cost) return { ok: false, reason: "costsNothing" };
      const actor = game.actors.get(card.actorId);
      const patch = { cost: choice };
      if (setting(SETTINGS.autoCosts)) {
        if (choice === "suspicion") {
          await mutateRaid((s) => R.recordEvent(s, { eventId: card.eventId, amount: DGF.suspicion.cost, source: "cost", label: "cost", actorName: card.actorName ?? "", messageId }));
          Object.assign(patch, { suspicion: Math.max(card.suspicion ?? 0, DGF.suspicion.cost), triggers: [...(card.triggers ?? []), { key: "cost", amount: DGF.suspicion.cost }], applied: true });
        } else if (choice === "smaller" && isEntity(actor)) {
          await actor.update({ "system.nextRollSmaller": (actor.system.nextRollSmaller ?? 0) + 1 });
        } else if (choice === "loseTurn" && isEntity(actor)) {
          const turn = getRaid().turn + 1;
          await actor.update({ "system.skipTurn": turn });
          patch.skipTurn = turn;
        } else if (choice === "drop" && isEntity(actor)) {
          const carried = [...(actor.system.carried ?? [])];
          const i = Math.min(Math.max(0, Number(itemIndex) || 0), carried.length - 1);
          const [item] = i >= 0 ? carried.splice(i, 1) : [];
          await actor.update({ "system.carried": carried });
          patch.dropped = item?.name ?? "";
        }
      }
      await updateCard(message, patch);
      return { ok: true };
    },
  });

  registerOp(OPS.raidAdjust, {
    gmOnly: true,
    apply: async ({ delta, label = "" }) => {
      const n = Math.trunc(Number(delta));
      if (!n) return { ok: false, reason: "badDelta" };
      const { state } = await mutateRaid((s) => R.adjust(s, n, { label }));
      return { ok: true, value: R.suspicionOf(state).value };
    },
  });

  registerOp(OPS.raidCancel, {
    gmOnly: true,
    apply: async ({ eventId, restore = false }) => {
      if (!getRaid().ledger.some((e) => e.eventId === eventId)) return { ok: false, reason: "unknownEvent" };
      const { state } = await mutateRaid((s) => (restore ? R.restore(s, eventId) : R.cancel(s, eventId)));
      await markCards(eventId, { cancelled: !restore, applied: true });
      return { ok: true, value: R.suspicionOf(state).value };
    },
  });

  registerOp(OPS.raidUndo, {
    gmOnly: true,
    apply: async () => {
      const last = R.lastLiveEvent(getRaid());
      if (!last) return { ok: false, reason: "nothingToUndo" };
      const { state } = await mutateRaid((s) => R.cancel(s, last.eventId));
      await markCards(last.eventId, { cancelled: true, applied: true });
      return { ok: true, eventId: last.eventId, value: R.suspicionOf(state).value };
    },
  });

  // Next / previous Turn. B2 + V4: from the Turn the furniture's piece is taken until it leaves town or is
  // lost, each Turn's end raises Suspicion by 1, even while it is set down (autoFurniture).
  registerOp(OPS.raidTurn, {
    gmOnly: true,
    apply: async ({ delta = 1 }) => {
      const step = Math.sign(Number(delta)) || 1;
      const auto = setting(SETTINGS.autoFurniture);
      const carriers = game.actors.filter((a) => isEntity(a) && isInRaid(a.system) && a.system.carryingFurniture && a.system.status !== "captured").map((a) => a.name);
      const { state } = await mutateRaid((s) => (step > 0
        ? R.advanceTurn(auto ? R.endOfTurnFurniture(s, carriers) : s, 1)
        : R.advanceTurn(R.undoEndOfTurnFurniture(s), -1)));
      return { ok: true, turn: state.turn, dawn: state.dawn };
    },
  });

  // GM: the furniture's piece by hand — "inPlay" (taken), "out" (out of town), "lost" (the town took it back), "" (not taken).
  registerOp(OPS.raidFurniture, {
    gmOnly: true,
    apply: async ({ state: furniture }) => {
      if (!R.FURNITURE_STATES.includes(furniture)) return { ok: false, reason: "badState" };
      const { state } = await mutateRaid((s) => R.setFurniture(s, furniture));
      // lost or abandoned (V11): it stays put, so nobody carries it any more (as when a carrier is captured, F15)
      if (furniture === "lost") {
        for (const a of game.actors.filter((x) => isEntity(x) && x.system.carryingFurniture)) await a.update({ "system.carryingFurniture": false });
      }
      return { ok: true, furniture: state.furniture };
    },
  });

  // GM: take back a mistaken leaving of town (the way out, or the flight escaped), until the year is read. The party is
  // in town again; a piece that leaving took out of town or left behind is in play again. Nothing else changes.
  registerOp(OPS.raidBackInTown, {
    gmOnly: true,
    apply: async () => {
      const raid = getRaid();
      if (raid.over) return { ok: false, reason: "raidOver" };
      if (!raid.partyOut) return { ok: false, reason: "notOut" };
      const { state, before, unchanged } = await mutateRaid((s) => (s.over ? s : R.backInTown(s)));
      if (unchanged || state.partyOut) return { ok: false, reason: "notOut" };
      await announce("backInTown", state, { how: before.partyOut.how, pieceBack: state.furniture !== before.furniture });
      return { ok: true, furniture: state.furniture };
    },
  });

  // V4: the moment an Entity first takes the piece, it is in play (and noisy) until it leaves town or is lost.
  Hooks.on("updateActor", (actor, diff) => {
    if (!isActiveGM() || !isEntity(actor) || diff?.system?.carryingFurniture !== true || !setting(SETTINGS.autoFurniture)) return;
    if (getRaid().furniture !== "") return;
    mutateRaid((s) => R.takeFurniture(s)).catch((err) => console.error("Don't Get Forked | furniture", err));
  });

  registerOp(OPS.raidHunt, {
    gmOnly: true,
    apply: async ({ on }) => {
      const { state } = await mutateRaid((s) => R.setHunt(s, !!on, "manual"));
      return { ok: true, hunt: state.hunt };
    },
  });

  registerOp(OPS.raidReset, {
    gmOnly: true,
    apply: async ({ difficulty = "standard", extra = {} }) => {
      if (!R.LABELS.includes(difficulty)) return { ok: false, reason: "badDifficulty" };
      // F26: who is in this raid: every Entity with a player owner (the Storyteller can change it on the Raid window
      // or the sheet). A new raid is a new year for them: free, charges refilled, the last raid's marks gone (resetOnNewRaid).
      const reset = setting(SETTINGS.resetOnNewRaid);
      const members = allEntities().filter((a) => a.hasPlayerOwner);
      // campaign play (Chapter 7): each castle upgrade gives one Entity of the players' choice one extra charge this raid
      const upgrades = setting(SETTINGS.campaign) ? castleUpgrades().length : 0;
      const given = assignExtraCharges({ wanted: extra, upgrades, members: members.map((a) => a.id) });
      if (!given.ok) return { ok: false, reason: given.reason };
      const { state } = await mutateRaid(() => R.newRaid({ id: foundry.utils.randomID(), difficulty, readied: reset ? members.map((a) => a.id) : [] }));
      for (const actor of allEntities()) {
        const inRaid = members.includes(actor);
        const plus = given.extra[actor.id] ?? 0;
        const update = { "system.inRaid": inRaid, "system.charges.extra": plus, ...(inRaid && reset ? prefixed(newRaidUpdate(actor.system)) : {}) };
        if (plus) update["system.charges.value"] = (inRaid && reset ? actor.system.charges.start : actor.system.charges.value) + plus;
        await actor.update(update);
      }
      const extras = Object.entries(given.extra).map(([id, n]) => ({ name: game.actors.get(id)?.name ?? "", n }));
      if (upgrades) await announce("castle", state, { upgrades: castleUpgrades(), extras });
      return { ok: true, raidId: state.raidId, members: members.map((a) => a.id), extra: given.extra };
    },
  });

  // GM (F26): tick an Entity into this raid or out of it (the Raid window; the sheet's tick does the same).
  registerOp(OPS.raidMember, {
    gmOnly: true,
    apply: async ({ actorId, inRaid }) => {
      const actor = game.actors.get(actorId);
      if (!isEntity(actor)) return { ok: false, reason: "notAnEntity" };
      await actor.update({ "system.inRaid": !!inRaid });
      return { ok: true, inRaid: !!inRaid };
    },
  });

  // F26: an Entity ticked into the raid after it began is made ready for it once, as a new raid would have (resetOnNewRaid).
  Hooks.on("updateActor", (actor, diff) => {
    if (!isActiveGM() || !isEntity(actor) || diff?.system?.inRaid !== true || !setting(SETTINGS.resetOnNewRaid)) return;
    const raid = getRaid();
    if (!raid.raidId || R.markReadied(raid, actor.id) === raid) return;
    mutateRaid((s) => R.markReadied(s, actor.id))
      .then(() => actor.update(prefixed(newRaidUpdate(actor.system))))
      .catch((err) => console.error("Don't Get Forked | readying an Entity failed", err));
  });

  // Anyone: the helpers on a roll card pay for the abilities they lent (Chapter 3: helping costs the helper's charge),
  // once, as the card says. Read from a card its roller's owner posted, never from the request, so no player can
  // spend another Entity's charges (or bring its Weakness) at will.
  registerOp(OPS.actorSpendCharges, {
    apply: async ({ messageId } = {}) => {
      const message = game.messages.get(messageId);
      const card = cardOf(message);
      if (card?.kind !== CARD.roll) return { ok: false, reason: "notARoll" };
      if (!postedByOwner(message)) return { ok: false, reason: "notTheirs" };
      if (card.raidId !== getRaid().raidId) return { ok: false, reason: "otherRaid" }; // a new raid has refilled them
      if (card.helpersPaid !== false) return { ok: true, reason: "noop" };
      const paid = [];
      for (const p of (card.payments ?? []).filter((x) => !x.own && x.payerId !== card.actorId)) {
        const actor = game.actors.get(p.payerId);
        if (!isEntity(actor)) continue;
        const value = actor.system.charges?.value ?? 0;
        const most = rollAbilities(actor.system).length; // it can't lend more abilities than it has
        const spent = card.autoCharges && setting(SETTINGS.autoCharges) ? Math.min(value, most, Math.max(0, Math.trunc(Number(p.spend)) || 0)) : 0;
        const update = {};
        if (spent) update["system.charges.value"] = value - spent;
        if (p.weakness) { update["system.weaknessInPlay"] = true; update["system.overdrewInFlight"] = true; } // B3: once per flight
        if (Object.keys(update).length) await actor.update(update);
        paid.push({ actorId: actor.id, spent, weakness: !!p.weakness });
      }
      await updateCard(message, { helpersPaid: true });
      return { ok: true, paid };
    },
  });
}

/* ------------------------------------------------- GM on ready -- */

/** GM, on ready: start a raid if the world has none yet. */
export async function seedRaid() {
  if (!isActiveGM() || getRaid().raidId) return;
  await mutateRaid(() => R.newRaid({ id: foundry.utils.randomID(), difficulty: "standard" }));
}

/**
 * GM, on ready: catch up on any roll this raid made while no Storyteller was connected: a helped roll's
 * helpers pay; a roll the raid follows goes through raid.roll; any other roll's Suspicion is applied (its
 * card has Suspicion, isn't applied or cancelled, and its event isn't in the ledger; with autoSuspicion on).
 */
export async function reconcile() {
  if (!isActiveGM()) return 0;
  const autoSuspicion = setting(SETTINGS.autoSuspicion);
  const raid = getRaid();
  if (!raid.raidId) return 0;
  const known = new Set(raid.ledger.map((e) => e.messageId).filter(Boolean));
  const recent = game.messages.contents.slice(-100);
  // a roll the raid follows (a group check, a chase round, a capture, the lock-up, the way out) that the GM never saw
  const tracked = (c) => c.kind === CARD.roll && (c.groupId || c.chaseId || c.lockup || c.caught || c.wayOutBeaten);
  const unseen = recent.filter((m) => { const c = cardOf(m); return c && tracked(c) && c.raidId === raid.raidId && !c.gmSeen; });
  // a roll the raid follows is reconciled whatever the switches (raid.roll reads them); its Suspicion only with autoSuspicion
  const todo = !autoSuspicion ? [] : recent.filter((m) => {
    const c = cardOf(m);
    return c && [CARD.roll, CARD.ability, CARD.tell].includes(c.kind) && c.raidId === raid.raidId && !unseen.includes(m)
      && c.suspicion > 0 && !c.hunt && !c.applied && !c.cancelled && !known.has(m.id);
  });
  // a helped roll whose helpers haven't paid yet (whatever the switches: the op reads them)
  const unpaid = recent.filter((m) => { const c = cardOf(m); return c?.kind === CARD.roll && c.raidId === raid.raidId && c.helpersPaid === false; });
  for (const m of unpaid) await runOp(OPS.actorSpendCharges, { messageId: m.id });
  for (const m of unseen) await runOp(OPS.raidRoll, { messageId: m.id });
  for (const m of todo) await runOp(OPS.raidApplyCard, { messageId: m.id });
  return todo.length + unseen.length + unpaid.length;
}
