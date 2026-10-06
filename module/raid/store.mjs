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
import { cardOf, updateCard, postCard, setRaidIdReader } from "../chat/cards.mjs";

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

export function registerRaidOps() {
  setRaidIdReader(() => getRaid().raidId);

  // Anyone: apply what a roll or ability card raised. The amount comes from the card, never from the request.
  registerOp(OPS.raidApplyCard, {
    apply: async ({ messageId }) => {
      const message = game.messages.get(messageId);
      const card = cardOf(message);
      if (!card || ![CARD.roll, CARD.ability, CARD.tell].includes(card.kind)) return { ok: false, reason: "notACard" };
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
      if (card.cost) return { ok: false, reason: "alreadyChosen" };
      if (!(card.costs ?? []).includes(choice)) return { ok: false, reason: "notAllowed" };
      // a group check's rolls rise once, by the biggest: a Suspicion +1 the group already raised costs nothing (T10)
      if (choice === "suspicion" && card.groupId && R.eventAmount(getRaid(), card.eventId) >= DGF.suspicion.cost) return { ok: false, reason: "costsNothing" };
      const actor = game.actors.get(card.actorId);
      const patch = { cost: choice };
      if (setting(SETTINGS.autoCosts)) {
        if (choice === "suspicion" && card.raidId === getRaid().raidId) {
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

  registerOp(OPS.raidTurn, {
    gmOnly: true,
    apply: async ({ delta = 1 }) => {
      const { state } = await mutateRaid((s) => R.advanceTurn(s, Math.sign(Number(delta)) || 1));
      return { ok: true, turn: state.turn, dawn: state.dawn };
    },
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
    apply: async ({ difficulty = "standard" }) => {
      if (!R.LABELS.includes(difficulty)) return { ok: false, reason: "badDifficulty" };
      const { state } = await mutateRaid(() => R.newRaid({ id: foundry.utils.randomID(), difficulty }));
      return { ok: true, raidId: state.raidId };
    },
  });

  // Anyone: spend a helper's charges for an ability on someone else's roll (Chapter 3: helping costs the charge).
  registerOp(OPS.actorSpendCharges, {
    apply: async ({ actorId, count = 0, weakness = false }) => {
      const actor = game.actors.get(actorId);
      if (!isEntity(actor)) return { ok: false, reason: "notAnEntity" };
      const value = actor.system.charges?.value ?? 0;
      const spent = setting(SETTINGS.autoCharges) ? Math.min(value, Math.max(0, Math.trunc(Number(count)) || 0)) : 0;
      const update = {};
      if (spent) update["system.charges.value"] = value - spent;
      if (weakness) update["system.weaknessInPlay"] = true;
      if (Object.keys(update).length) await actor.update(update);
      return { ok: true, spent };
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
 * GM, on ready: apply any roll this raid made while no Storyteller was connected
 * (its card has Suspicion, isn't applied or cancelled, and its event isn't in the ledger).
 */
export async function reconcile() {
  if (!isActiveGM() || !setting(SETTINGS.autoSuspicion)) return 0;
  const raid = getRaid();
  if (!raid.raidId) return 0;
  const known = new Set(raid.ledger.map((e) => e.messageId).filter(Boolean));
  const todo = game.messages.contents.slice(-100).filter((m) => {
    const c = cardOf(m);
    return c && [CARD.roll, CARD.ability, CARD.tell].includes(c.kind) && c.raidId === raid.raidId
      && c.suspicion > 0 && !c.hunt && !c.applied && !c.cancelled && !known.has(m.id);
  });
  for (const m of todo) await runOp(OPS.raidApplyCard, { messageId: m.id });
  return todo.length;
}
