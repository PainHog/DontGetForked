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
 *                        turn, cancelled, hunt }], seq,
 *             chase,   // the chase running (or the last one), module/logic/chase.mjs; null
 *             group,   // the group check open (or the last one), module/logic/checks.mjs; null
 *             tells,   // the Tell checks made: [{ id, place, turn, goesOff, actorId, name }]
 *             list,    // the shopping list: [{ name, duty, essential }]
 *             over,    // how the raid ended: null, or { result, turn } once the year is decided
 *             furniture, // V4: the piece: "" (not taken) | "inPlay" (taken, in town: noisy) | "out" (out of town) | "lost"
 *             furnitureLost, // F15: a carrier was captured: the piece is gone for the night (furniture === "lost")
 *             partyOut, // null, or { how: "wayOut" | "flight", turn } once the party has left town (no hunt or chase starts)
 *             endedChase } // the local chase the Limit ended (B3: cornered that round = captured first)
 *
 * Source: rulebook Chapter 4 (Turns: the night lasts 12 Turns; dawn comes when the
 * 12th Turn ends), Chapter 5 (the Limit by difficulty; one roll, one rise; at the
 * Limit, or at dawn, the whole town hunts; from then on Suspicion stops; the track
 * never goes past the Limit), Chapter 6 (chases, the lock-up) and Chapter 7 (the year).
 */
import { DGF } from "../config.mjs";
import { foldSuspicion, addEntry, cancelEvent, restoreEvent } from "./suspicion.mjs";

export const RAID_VERSION = 2;
/** V4: the furniture's piece in this raid. */
export const FURNITURE_STATES = Object.freeze(["", "inPlay", "out", "lost"]);
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
    chase: null,
    group: null,
    tells: [],
    list: [],
    over: null,
    furniture: "",
    furnitureLost: false,
    partyOut: null,
    endedChase: null,
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
    chase: s.chase && typeof s.chase === "object" && Array.isArray(s.chase.members) ? s.chase : null,
    group: s.group && typeof s.group === "object" && Array.isArray(s.group.members) ? s.group : null,
    tells: Array.isArray(s.tells) ? s.tells : [],
    list: Array.isArray(s.list) ? s.list : [],
    over: s.over && typeof s.over === "object" ? s.over : null,
    furniture: FURNITURE_STATES.includes(s.furniture) ? s.furniture : s.furnitureLost ? "lost" : "",
    furnitureLost: s.furniture === "lost" || (!FURNITURE_STATES.includes(s.furniture) && !!s.furnitureLost),
    partyOut: s.partyOut && typeof s.partyOut === "object" ? s.partyOut : null,
    endedChase: s.endedChase && typeof s.endedChase === "object" && Array.isArray(s.endedChase.members) ? s.endedChase : null,
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
    lockup: DGF.labels[state.difficulty]?.lockup ?? null,
    over: state.over ? { ...state.over } : null,
    furniture: state.furniture ?? "",
    furnitureLost: !!state.furnitureLost,
    partyOut: state.partyOut ? { ...state.partyOut } : null,
  };
}

/**
 * Record (part of) an event. Entries sharing an eventId apply only their largest
 * amount (one roll, one rise; a group check's rolls share one event, so it rises
 * once, by the worst); the same eventId + source + message again replaces that
 * entry, so a retried request never counts twice. While the hunt is on the entry
 * is kept but ignored (Suspicion stops).
 */
export function recordEvent(state, { eventId, amount, source, label = "", actorName = "", messageId = "" }) {
  if (!eventId) throw new Error("an event needs an eventId");
  if (!Number.isFinite(amount)) throw new Error(`event ${eventId}: amount must be a number`);
  const seq = state.seq + 1;
  const id = messageId ? `${eventId}:${source}:${messageId}` : `${eventId}:${source}`;
  const entry = { id, eventId, amount, source, label, actorName, messageId, turn: state.turn, seq, cancelled: false, hunt: state.hunt };
  const i = state.ledger.findIndex((e) => e.eventId === eventId && e.source === source && (e.messageId ?? "") === messageId);
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
  if (state.hunt || state.over || state.partyOut) return ""; // dawn hunts only those still in town
  if (suspicionOf(state).atLimit && !(before && suspicionOf(before).atLimit)) return "limit";
  if (state.dawn && !(before && before.dawn)) return "dawn";
  return "";
}

/** The amount an event raises now (its biggest live entry), or 0. */
export function eventAmount(state, eventId) {
  let best = 0;
  for (const e of state.ledger) if (e.eventId === eventId && !e.cancelled && !e.hunt && e.amount > best) best = e.amount;
  return best;
}

/** The raid with this chase (module/logic/chase.mjs) as its current one (null: none). */
export function setChase(state, chase) {
  return { ...state, chase: chase ?? null };
}

/** The raid with this group check (module/logic/checks.mjs) as its current one (null: none). */
export function setGroup(state, group) {
  return { ...state, group: group ?? null };
}

/** Record a Tell check (for "once per watched location"). */
export function addTell(state, tell) {
  return { ...state, tells: [...state.tells, { ...tell, turn: state.turn }] };
}

/** The raid's shopping list (Chapter 4): [{ name, duty, essential }]. */
export function setList(state, list) {
  return { ...state, list: (list ?? []).map((it) => ({ name: String(it.name ?? ""), duty: it.duty, essential: !!it.essential })) };
}

/** The raid is over: the year is decided (no more hunts or chases start). */
export function endRaid(state, { result }) {
  return { ...state, over: { result, turn: state.turn }, chase: state.chase && !state.chase.outcome ? { ...state.chase, outcome: "dropped" } : state.chase, group: state.group ? { ...state.group, open: false } : null };
}

/** The Suspicion event for carried furniture at the end of a Turn (B2: its own event each Turn). */
export function furnitureEventId(turn) {
  return `furniture:${turn}`;
}

/**
 * B2 + V4 (Chapter 4, Carrying): from the Turn the piece is first taken until it leaves town
 * or the town takes it back, Suspicion rises by 1 at the end of each Turn — even while it is
 * set down. Call with the state before the Turn moves on and the names of anyone carrying it
 * now (carrying it marks it taken); a Turn ended again (after the Storyteller stepped back)
 * counts its event again, never twice.
 */
export function endOfTurnFurniture(state, carriers = []) {
  if (state.dawn || state.over || state.partyOut) return state;
  let s = carriers.length ? takeFurniture(state) : state;
  if (s.furniture !== "inPlay") return s;
  const eventId = furnitureEventId(s.turn);
  if (s.ledger.some((e) => e.eventId === eventId)) return restore(s, eventId);
  // set down, nobody's name goes with it: the event says so ("the furniture (set down)")
  return recordEvent(s, { eventId, amount: DGF.suspicion.furniture, source: "furniture", label: carriers.length ? "furniture" : "furnitureDown", actorName: carriers.join(", ") });
}

/** The Storyteller steps a Turn back: the Turn that ended didn't end after all, so its furniture event stops counting. */
export function undoEndOfTurnFurniture(state) {
  const turn = state.dawn ? state.turn : state.turn - 1;
  const eventId = furnitureEventId(turn);
  return state.ledger.some((e) => e.eventId === eventId) ? cancel(state, eventId) : state;
}

/** The piece's state, set (the Storyteller's hand, or the rules below). */
export function setFurniture(state, furniture) {
  if (!FURNITURE_STATES.includes(furniture)) throw new Error(`unknown furniture state: ${furniture}`);
  return state.furniture === furniture ? state : { ...state, furniture, furnitureLost: furniture === "lost" };
}

/** F15 (Chapter 6, Captured): a furniture carrier was captured: the piece is gone for the night. */
export function loseFurniture(state) {
  return setFurniture(state, "lost");
}

/** V4: the piece is taken (first picked up): it's in play — noisy each Turn — until it leaves town or is lost. */
export function takeFurniture(state) {
  return state.furniture === "" ? setFurniture(state, "inPlay") : state;
}

/**
 * V4: the party leaves town (the way out beaten, or the final flight escaped). Only a carried piece
 * leaves town ("out"); one set down stays put, abandoned ("lost"). Either way it makes no more noise.
 */
export function furnitureLeaves(state, { carried = true } = {}) {
  return state.furniture === "inPlay" ? setFurniture(state, carried ? "out" : "lost") : state;
}

/** The party has left town ("wayOut" | "flight"): from now on no hunt or chase starts, dawn included. */
export function leaveTown(state, how) {
  return state.partyOut ? state : { ...state, partyOut: { how, turn: state.turn } };
}
