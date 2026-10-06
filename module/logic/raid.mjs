/**
 * DON'T GET FORKED — The raid's shared state (pure, Foundry-free)
 * ---------------------------------------------------------------
 * One raid's table state, kept in a world setting and written only by the
 * Storyteller's (GM's) client: the Suspicion ledger (module/logic/suspicion.mjs),
 * the Limit set by the town's difficulty, the Turn count and dawn, and whether
 * the whole town hunts. Every function returns a new state; nothing is mutated.
 *
 *   state = { v, raidId, difficulty, limit, turn, turns, dawn, hunt, huntCause,
 *             ledger: [{ id, eventId, amount, source, label, actorName, messageId,
 *                        turn, cancelled, hunt }], seq }
 *
 * Source: rulebook Chapter 4 (Turns: the night lasts 12 Turns; dawn comes when the
 * 12th Turn ends), Chapter 5 (the Limit by difficulty; one roll, one rise; at the
 * Limit, or at dawn, the whole town hunts; from then on Suspicion stops; the track
 * never goes past the Limit).
 *
 * TODO(slice 2): the final flight and local chases (Lead track, chase table,
 * majority rule), the lock-up, group checks sharing one event, Tell checks.
 */
import { DGF } from "../config.mjs";
import { foldSuspicion, addEntry, cancelEvent, restoreEvent } from "./suspicion.mjs";

export const RAID_VERSION = 1;
export const LABELS = Object.freeze(Object.keys(DGF.labels));

/** A fresh raid at this difficulty ("easy" | "standard" | "hard"). */
export function newRaid({ id = "", difficulty = "standard" } = {}) {
  if (!DGF.labels[difficulty]) throw new Error(`unknown difficulty: ${difficulty}`);
  return {
    v: RAID_VERSION,
    raidId: id,
    difficulty,
    limit: DGF.labels[difficulty].limit,
    turn: 1,
    turns: DGF.turns,
    dawn: false,
    hunt: false,
    huntCause: "",
    ledger: [],
    seq: 0,
  };
}

/** Any stored value (possibly empty or from an older version) as a complete state. */
export function normalizeRaid(stored) {
  const s = stored && typeof stored === "object" ? stored : {};
  const difficulty = DGF.labels[s.difficulty] ? s.difficulty : "standard";
  const base = newRaid({ id: typeof s.raidId === "string" ? s.raidId : "", difficulty });
  const num = (v, d) => (Number.isFinite(v) ? v : d);
  return {
    ...base,
    limit: num(s.limit, base.limit),
    turn: Math.max(1, num(s.turn, base.turn)),
    turns: num(s.turns, base.turns),
    dawn: !!s.dawn,
    hunt: !!s.hunt,
    huntCause: typeof s.huntCause === "string" ? s.huntCause : "",
    ledger: Array.isArray(s.ledger) ? s.ledger.map((e) => ({ cancelled: false, hunt: false, ...e })) : [],
    seq: num(s.seq, 0),
  };
}

/** The current Suspicion (the ledger folded against the Limit). */
export function suspicionOf(state) {
  return foldSuspicion(state.ledger, state.limit);
}

/** The ledger's events, newest first: one row per eventId, with its applied amount. */
export function eventsOf(state) {
  const rows = new Map();
  for (const e of state.ledger) {
    const r = rows.get(e.eventId);
    if (!r) rows.set(e.eventId, { ...e, sources: [e.source], lastSeq: e.seq ?? 0 });
    else {
      if (e.amount > r.amount) Object.assign(r, { amount: e.amount, label: e.label || r.label });
      r.sources.push(e.source);
      r.lastSeq = Math.max(r.lastSeq, e.seq ?? 0);
      r.cancelled = r.cancelled && e.cancelled;
    }
  }
  return [...rows.values()].sort((a, b) => b.lastSeq - a.lastSeq);
}

/** Everything the HUD shows. */
export function raidView(state) {
  const s = suspicionOf(state);
  return {
    raidId: state.raidId,
    difficulty: state.difficulty,
    value: s.value,
    limit: state.limit,
    atLimit: s.atLimit,
    turn: state.turn,
    turns: state.turns,
    dawn: state.dawn,
    hunt: state.hunt,
    huntCause: state.huntCause,
    exit: DGF.labels[state.difficulty]?.exit ?? null,
  };
}

/**
 * Record (part of) an event. Entries sharing an eventId apply only their largest
 * amount (one roll, one rise); the same eventId + source again replaces that
 * entry, so a retried request never counts twice. While the hunt is on the entry
 * is kept but ignored (Suspicion stops).
 */
export function recordEvent(state, { eventId, amount, source, label = "", actorName = "", messageId = "" }) {
  if (!eventId) throw new Error("an event needs an eventId");
  if (!Number.isFinite(amount)) throw new Error(`event ${eventId}: amount must be a number`);
  const seq = state.seq + 1;
  const entry = { id: `${eventId}:${source}`, eventId, amount, source, label, actorName, messageId, turn: state.turn, seq, cancelled: false, hunt: state.hunt };
  const i = state.ledger.findIndex((e) => e.eventId === eventId && e.source === source);
  let ledger;
  if (i >= 0) {
    ledger = state.ledger.slice();
    ledger[i] = { ...entry, cancelled: state.ledger[i].cancelled, hunt: state.ledger[i].hunt, turn: state.ledger[i].turn };
  } else ledger = addEntry(state.ledger, entry);
  foldSuspicion(ledger, state.limit); // throws on an entry the rules don't allow (a lowering from a roll)
  return { ...state, ledger, seq };
}

/** Undo an event (every entry with this eventId stops counting). */
export function cancel(state, eventId) {
  return { ...state, ledger: cancelEvent(state.ledger, eventId) };
}

/** Count a cancelled event again. */
export function restore(state, eventId) {
  return { ...state, ledger: restoreEvent(state.ledger, eventId) };
}

/** The newest event that still counts, or null. */
export function lastLiveEvent(state) {
  return eventsOf(state).find((e) => !e.cancelled && !e.hunt) ?? null;
}

/** The Storyteller's +1 / −1 on the HUD: an event of its own. */
export function adjust(state, delta, { eventId, label = "" } = {}) {
  if (!Number.isInteger(delta) || delta === 0) throw new Error("adjust by a whole number of points");
  return recordEvent(state, { eventId: eventId ?? `st:${state.seq + 1}`, amount: delta, source: "storyteller", label });
}

/**
 * Move the Turn count. Forward past the last Turn is dawn ("dawn comes when the
 * 12th Turn ends"); back from dawn undoes it.
 */
export function advanceTurn(state, delta = 1) {
  if (delta > 0) {
    if (state.dawn) return state;
    if (state.turn >= state.turns) return { ...state, dawn: true };
    return { ...state, turn: Math.min(state.turns, state.turn + delta) };
  }
  if (delta < 0) {
    if (state.dawn) return { ...state, dawn: false };
    return { ...state, turn: Math.max(1, state.turn + delta) };
  }
  return state;
}

/** Start or stop the hunt by hand ("manual"), or as the rules say ("limit" / "dawn"). */
export function setHunt(state, on, cause = "manual") {
  return { ...state, hunt: !!on, huntCause: on ? cause : "" };
}

/**
 * Chapter 5: when Suspicion reaches the Limit, or dawn comes, the whole town hunts.
 * Returns the cause ("limit" | "dawn") if the hunt should start now, else "".
 * Given the state `before` a change, only the moment of reaching the Limit or of
 * dawn counts, so a Storyteller who stops the hunt by hand isn't overruled.
 */
export function huntDue(state, before = null) {
  if (state.hunt) return "";
  if (suspicionOf(state).atLimit && !(before && suspicionOf(before).atLimit)) return "limit";
  if (state.dawn && !(before && before.dawn)) return "dawn";
  return "";
}
