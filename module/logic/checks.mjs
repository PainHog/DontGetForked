/**
 * DON'T GET FORKED — Group checks and Tell checks (pure, Foundry-free)
 * --------------------------------------------------------------------
 * Group check (rulebook Chapter 4, P6): when several Entities roll the same
 * group obstacle in one Turn, all declare their dice and abilities, then roll
 * together; Suspicion rises only once, by the biggest trigger among their rolls
 * (their rolls share one Suspicion event in the ledger), and everyone who gets
 * Trouble at a watched obstacle is caught together and flees together on one
 * shared Lead (Chapter 5, Getting Caught).
 *
 *   group = { id, label, turn, members: [{ actorId, name }], rolls: { [actorId]: { messageId, caught } }, open }
 *
 * Tell check (Chapter 5, C4): the first time anyone reaches each watched location
 * (the way out and the lock-up included), check once, however the party has
 * split: a d6, and on 4–6 a Tell goes off; roll to see whose, among the Entities
 * arriving. Familiar's Warning (Chapter 2): when the Witch arrives, it goes off
 * only if a second d6 also rolls 4–6.
 */
import { DGF } from "../config.mjs";
import { tellGoesOff } from "./rules.mjs";
import { findEntity } from "./entity.mjs";

const perkRule = (perk) => DGF.perkRules[perk] ?? {};

/* ------------------------------------------------------------ group checks -- */

/** The Suspicion event every roll of a group check shares. */
export function groupEventId(groupId) {
  return `group:${groupId}`;
}

/**
 * V19 Spectral (A Ghost): "you get past group obstacles without rolling, at no action, even in a Turn you move,
 * unless you carry loot or furniture". Does this Entity get past a group obstacle without rolling now?
 */
export function spectralPasses(system) {
  return !!perkRule(system?.perk).groupPass && !((system?.carried?.length ?? 0) > 0 || system?.carryingFurniture);
}

/**
 * Open a group check for these Entities ([{ actorId, name, passes }], at least two). A member that `passes`
 * (Spectral, carrying nothing) is past without rolling: it isn't waited for and can't be caught.
 */
export function newGroup({ id, label = "", turn = 0, members = [] }) {
  if (!id) throw new Error("a group check needs an id");
  const seen = new Set();
  const picked = members.filter((m) => m?.actorId && !seen.has(m.actorId) && seen.add(m.actorId));
  if (picked.length < 2) throw new Error("a group check is several Entities rolling together");
  const rolls = Object.fromEntries(picked.filter((m) => m.passes).map((m) => [m.actorId, { messageId: "", caught: false, passed: true }]));
  return { id, label, turn, members: picked.map((m) => ({ actorId: m.actorId, name: m.name ?? "" })), rolls, open: true };
}

/** Is this Entity in the open group check and still to roll? */
export function awaitsRoll(group, actorId) {
  return !!group?.open && group.members.some((m) => m.actorId === actorId) && !group.rolls[actorId];
}

/**
 * Record a member's roll. The same message again is a no-op; a second roll, a
 * non-member or a closed group is refused. Returns { ok, reason?, group }.
 */
export function groupRecord(group, actorId, { messageId = "", caught = false }) {
  if (!group?.open) return { ok: false, reason: "groupClosed", group };
  if (!group.members.some((m) => m.actorId === actorId)) return { ok: false, reason: "notInGroup", group };
  const had = group.rolls[actorId];
  if (had) return had.messageId === messageId ? { ok: true, reason: "noop", group } : { ok: false, reason: "alreadyRolled", group };
  return { ok: true, group: { ...group, rolls: { ...group.rolls, [actorId]: { messageId, caught: !!caught } } } };
}

/** Who still has to roll. */
export function groupWaiting(group) {
  return group ? group.members.filter((m) => !group.rolls[m.actorId]) : [];
}

/** Has every member rolled? */
export function groupDone(group) {
  return !!group && groupWaiting(group).length === 0;
}

/** Close the group check (everyone has rolled, or the Storyteller closes it). */
export function closeGroup(group) {
  return { ...group, open: false };
}

/** A member taken out of the group check (its Entity was deleted): its roll goes with it. */
export function groupWithout(group, actorId) {
  const rolls = { ...group.rolls };
  delete rolls[actorId];
  return { ...group, members: group.members.filter((m) => m.actorId !== actorId), rolls };
}

/** The members caught in this group check: they flee together. */
export function groupCaught(group) {
  return group ? group.members.filter((m) => group.rolls[m.actorId]?.caught) : [];
}

/* ------------------------------------------------------------- Tell checks -- */

/** Does this check need Familiar's Warning's second d6 (the Witch is among those arriving)? */
export function needsSecondDie(arriving) {
  return arriving.some((a) => perkRule(a.perk).tellSecondDie);
}

/**
 * Read a Tell check. `arriving` = [{ actorId, name, perk, entityKey }] (the Entities
 * arriving); `face` = the d6; `second` = Familiar's Warning's d6 (when needed);
 * `whoseFace` = the roll among those arriving (1..n). Returns
 * { goesOff, needsSecond, whose: { actorId, name, tell: { name, text } } | null }.
 */
export function readTellCheck({ arriving, face, second = null, whoseFace = 1 }) {
  if (!arriving?.length) throw new Error("a Tell check needs the Entities arriving");
  const needsSecond = needsSecondDie(arriving);
  if (needsSecond && second === null) throw new Error("Familiar's Warning: roll a second d6");
  const goesOff = tellGoesOff(face) && (!needsSecond || tellGoesOff(second));
  let whose = null;
  if (goesOff) {
    const a = arriving[Math.min(arriving.length, Math.max(1, whoseFace)) - 1];
    const e = findEntity(a.entityKey);
    whose = { actorId: a.actorId, name: a.name, tell: e ? { ...e.tell } : { name: "", text: "" } };
  }
  return { goesOff, needsSecond, whose };
}

/** Normalise a place name for "once per watched location". */
export function placeKey(place) {
  return String(place ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

/** Has this watched location already had its Tell check this raid? (No place given: never.) */
export function placeChecked(tells, place) {
  const k = placeKey(place);
  return !!k && (tells ?? []).some((t) => placeKey(t.place) === k);
}
