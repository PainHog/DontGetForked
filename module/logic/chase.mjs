/**
 * DON'T GET FORKED — Chases (pure, Foundry-free)
 * ----------------------------------------------
 * One chase at a time, kept in the raid state (module/logic/raid.mjs) and
 * written only by the Storyteller's client. Every function returns a new chase;
 * nothing is mutated. The roll dialog asks rollContext() what a member rolls
 * this round (the ground's traits, the mob's Difficulty, the Weakness); the GM
 * records each roll and resolves the round when everyone has rolled.
 *
 *   chase = { id, kind: "local" | "final", cause: "caught" | "limit" | "dawn" | "manual",
 *             label, turn, groupId, where,
 *             members: [{ actorId, name, entityKey, perk, timing }],
 *             lead, start, escape, round, mob, ground: { face, key, traits } | null,
 *             rolls: { [actorId]: { messageId, band, critical } },
 *             history: [{ round, face, key, mob, rolls: [{ actorId, name, band, critical }], move, lead }],
 *             outcome: "" | "escaped" | "cornered" | "ended" | "dropped" }
 *
 * Source: rulebook Chapter 6 (The Lead; The Ground; Your Weakness; The Local
 * Chase; The Final Flight and the Majority Rule; the chase table) and Chapter 5
 * (At the Limit). Perks from Chapter 2 via DGF.perkRules: Wall-Crawler and Fly by
 * Night (a trait you can always roll in a chase), Night Runner and Fear the Curse
 * (when you flee alone: Lead 2, the mob 1 easier; F14: `aloneOnly`), Fetch (the
 * final flight starts at Lead 3), Already Dead (cornered in a local chase, you
 * lose your next Turn instead). F13: in a shared local chase, Suspicion rises once
 * a round, by the biggest trigger among that round's rolls (chaseEventId).
 */
import { DGF } from "../config.mjs";
import { leadMove, majorityMove, localMobDifficulty, weaknessInPlay } from "./rules.mjs";
import { findEntity } from "./entity.mjs";

const perkRule = (perk) => DGF.perkRules[perk] ?? {};
export const CHASE_KINDS = Object.freeze(["local", "final"]);

/** A member's Perk value for this chase: a Perk marked `aloneOnly` works only when that Entity flees alone (F14). */
function perkValue(chase, member, key) {
  const r = perkRule(member.perk);
  if (r.aloneOnly && chase.members.length !== 1) return 0;
  return r[key] ?? 0;
}

/** Several fleeing on one Lead in a local chase (caught together in one group check). */
export function isSharedLocal(chase) {
  return !!chase && chase.kind === "local" && chase.members.length > 1;
}

/**
 * F13: the Suspicion event a chase roll belongs to. In a shared local chase every roll of
 * a round shares one event (it rises once, by the biggest trigger); otherwise null (one
 * roll, one rise; in the final flight Suspicion has stopped anyway).
 */
export function chaseEventId(chase, round = chase?.round) {
  return isSharedLocal(chase) ? `chase:${chase.id}:${round}` : null;
}

/** A chase member from an Entity actor's id, name and system data (its Perk and its Weakness's timing). */
export function memberOf({ id, name = "", system = {} }) {
  const e = findEntity(system.entityKey);
  return { actorId: id, name, entityKey: system.entityKey ?? "", perk: system.perk ?? "", timing: e?.weakness?.timing ?? "soon" };
}

/** B3: the final flight's escape number, by the town's label (5 on Easy and Standard, 6 on Hard). */
export function finalEscape(label = "standard") {
  return DGF.labels[label]?.finalEscape ?? DGF.lead.finalEscape;
}

/**
 * A new chase. Local: Lead 1, escape at 4 (Night Runner, fleeing alone: starts at Lead 2).
 * Final flight: Lead 2, escape at the label's number (B3: 5 on Easy and Standard, 6 on Hard);
 * Fetch: it starts at Lead 3 (DGF.perkRules finalLead).
 */
export function newChase({ id, kind = "local", cause = "caught", members = [], turn = 0, groupId = "", where = "", label = "standard" }) {
  if (!CHASE_KINDS.includes(kind)) throw new Error(`unknown chase kind: ${kind}`);
  if (!id) throw new Error("a chase needs an id");
  const L = DGF.lead;
  const chase = {
    id, kind, cause, label, turn, groupId, where,
    members: members.map((m) => ({ ...m })),
    lead: kind === "final" ? L.finalStart : L.localStart,
    start: 0,
    escape: kind === "final" ? finalEscape(label) : L.localEscape,
    round: 1, mob: null, ground: null, rolls: {}, history: [], outcome: "",
  };
  // Night Runner: "when you flee alone, your local chase starts at Lead 2" (F14); Fetch: the final flight starts at Lead 3.
  const perkLead = Math.max(0, ...chase.members.map((m) => perkValue(chase, m, kind === "final" ? "finalLead" : "localLead")));
  chase.lead = Math.max(chase.lead, perkLead);
  chase.start = chase.lead;
  return chase;
}

/** Is the chase still running? */
export function isRunning(chase) {
  return !!chase && !chase.outcome;
}

/** C12: the ground on a d6 face (the traits that work this round). */
export function groundOn(face) {
  const row = DGF.chaseTable[face - 1];
  if (!row) throw new Error(`no ground for ${face}`);
  return { face, key: row.key, traits: [...row.traits] };
}

/**
 * The mob's Difficulty. Local: 8 plus half the Suspicion (B3), at most 12, checked each
 * round (Fear the Curse, fleeing alone: 1 easier). Final flight: the town's label, whatever the party's size.
 */
export function mobDifficulty(chase, { suspicion = 0, label = "standard" } = {}) {
  if (chase.kind === "final") {
    const L = DGF.labels[label];
    if (!L) throw new Error(`unknown difficulty: ${label}`);
    return L.finalMob;
  }
  const ease = Math.max(0, ...chase.members.map((m) => perkValue(chase, m, "localMobEase")));
  return localMobDifficulty(suspicion) - ease;
}

/** Start the round: roll on the chase table (one roll for everyone) and check the mob. Only before anyone rolls. */
export function startRound(chase, { face, suspicion = 0, label = "standard" }) {
  if (!isRunning(chase)) throw new Error("the chase is over");
  if (Object.keys(chase.rolls).length) throw new Error("someone has already rolled this round");
  return { ...chase, ground: groundOn(face), mob: mobDifficulty(chase, { suspicion, label }) };
}

/** The member's record, or null. */
export function memberIn(chase, actorId) {
  return chase?.members.find((m) => m.actorId === actorId) ?? null;
}

/** The traits a member can roll this round: the ground's, plus Wall-Crawler's Nimble or Fly by Night's Wits. */
export function traitsFor(chase, actorId) {
  const m = memberIn(chase, actorId);
  if (!m || !chase.ground) return [];
  const extra = perkRule(m.perk).chaseTrait;
  return extra && !chase.ground.traits.includes(extra) ? [...chase.ground.traits, extra] : [...chase.ground.traits];
}

/**
 * Is the member's Weakness in play this round? By its timing (C3: Always, Soon), or, in
 * the final flight, because it overdrew (`overdrawn`: the Entity's Weakness mark, S1).
 */
export function weaknessFor(chase, actorId, { overdrawn = false } = {}) {
  const m = memberIn(chase, actorId);
  if (!m) return false;
  return weaknessInPlay({ timing: m.timing, round: chase.round, overdrawn: overdrawn && chase.kind === "final" });
}

/**
 * What a member rolls now (for the roll dialog and the roll plan), or why it can't.
 * Returns { ok, reason?, chaseId, kind, round, difficulty, traits, weakness, ground, local }.
 */
export function rollContext(chase, actorId, { overdrawn = false } = {}) {
  const base = { ok: false, chaseId: chase?.id ?? "", kind: chase?.kind ?? "", round: chase?.round ?? 0 };
  if (!isRunning(chase)) return { ...base, reason: "noChase" };
  if (!memberIn(chase, actorId)) return { ...base, reason: "notInChase" };
  if (!chase.ground) return { ...base, reason: "noGround" };
  if (chase.rolls[actorId]) return { ...base, reason: "alreadyRolled" };
  return {
    ...base, ok: true, difficulty: chase.mob, traits: traitsFor(chase, actorId),
    weakness: weaknessFor(chase, actorId, { overdrawn }), ground: { ...chase.ground }, local: chase.kind === "local",
  };
}

/** Who still has to roll this round. */
export function waitingFor(chase) {
  return chase.members.filter((m) => !chase.rolls[m.actorId]);
}

/** Has everyone in the chase rolled this round? */
export function roundDone(chase) {
  return isRunning(chase) && !!chase.ground && chase.members.length > 0 && waitingFor(chase).length === 0;
}

/**
 * Record a member's roll for this round. The same message again is a no-op; a
 * second roll by the same member, a roll for another round, or after the end is refused.
 * Returns { ok, reason?, chase }.
 */
export function recordRoll(chase, actorId, { messageId = "", round, band, critical = false }) {
  if (!isRunning(chase)) return { ok: false, reason: "chaseOver", chase };
  if (!memberIn(chase, actorId)) return { ok: false, reason: "notInChase", chase };
  if (round !== undefined && round !== chase.round) return { ok: false, reason: "otherRound", chase };
  const had = chase.rolls[actorId];
  if (had) return had.messageId === messageId ? { ok: true, reason: "noop", chase } : { ok: false, reason: "alreadyRolled", chase };
  if (!chase.ground) return { ok: false, reason: "noGround", chase };
  return { ok: true, chase: { ...chase, rolls: { ...chase.rolls, [actorId]: { messageId, band, critical: !!critical } } } };
}

/**
 * The round's Lead move. One Entity alone in a local chase: Success +1 (a Critical +2),
 * Cost 0, Trouble −1. Several caught together, and every final flight: the majority rule
 * (Successes against Trouble; a Critical counts as two Successes).
 */
export function roundMove(chase) {
  const results = chase.members.map((m) => chase.rolls[m.actorId]).filter(Boolean);
  if (chase.kind === "local" && chase.members.length === 1) return results.length ? leadMove(results[0]) : 0;
  return majorityMove(results);
}

/** The Lead after a move, and whether that ends the chase: reach the escape number and you're clear; reach 0 and you're cornered. */
function applyLead(chase, delta) {
  const raw = chase.lead + delta;
  const outcome = raw >= chase.escape ? "escaped" : raw <= 0 ? "cornered" : "";
  return { lead: Math.max(0, Math.min(chase.escape, raw)), outcome };
}

/**
 * Resolve the round once everyone has rolled: move the Lead, then either end the
 * chase or begin the next round (the ground is rolled again).
 * Returns { chase, move, outcome }.
 */
export function resolveRound(chase) {
  if (!roundDone(chase)) throw new Error("not everyone has rolled this round");
  const move = roundMove(chase);
  const { lead, outcome } = applyLead(chase, move);
  const entry = {
    round: chase.round, face: chase.ground.face, key: chase.ground.key, mob: chase.mob,
    rolls: chase.members.map((m) => ({ actorId: m.actorId, name: m.name, band: chase.rolls[m.actorId].band, critical: chase.rolls[m.actorId].critical })),
    move, lead,
  };
  const next = { ...chase, lead, history: [...chase.history, entry], outcome };
  if (!outcome) Object.assign(next, { round: chase.round + 1, ground: null, mob: null, rolls: {} });
  return { chase: next, move, outcome };
}

/** The Storyteller moves the Lead by hand (a correction, or the chase run without automation). */
export function adjustLead(chase, delta) {
  if (!isRunning(chase)) throw new Error("the chase is over");
  const { lead, outcome } = applyLead(chase, Math.trunc(delta));
  return { ...chase, lead, outcome };
}

/** End the chase by hand, or because the Limit came during a local chase ("ended"). */
export function endChase(chase, outcome) {
  if (!DGF.chaseOutcomes.includes(outcome)) throw new Error(`unknown chase outcome: ${outcome}`);
  return { ...chase, outcome, lead: outcome === "escaped" ? chase.escape : outcome === "cornered" ? 0 : chase.lead };
}

/** Add a member (the Storyteller's correction); a member already in the chase is kept once. */
export function addMember(chase, member) {
  if (memberIn(chase, member.actorId)) return chase;
  return { ...chase, members: [...chase.members, { ...member }] };
}

/** Take a member out of the chase (the Storyteller's correction): its roll this round goes with it. */
export function removeMember(chase, actorId) {
  const rolls = { ...chase.rolls };
  delete rolls[actorId];
  return { ...chase, members: chase.members.filter((m) => m.actorId !== actorId), rolls };
}

/**
 * What being cornered does to each member. Local chase: captured (Already Dead: loses
 * its next Turn instead; V5: in the round the Limit comes, Already Dead simply joins
 * the final flight). Final flight: the party is forked.
 * Returns [{ actorId, name, fate: "captured" | "loseTurn" | "flees" | "forked" }].
 */
export function corneredFates(chase) {
  const ghostly = (m) => perkRule(m.perk).corneredLosesTurn;
  return chase.members.map((m) => ({
    actorId: m.actorId, name: m.name,
    fate: chase.kind === "final" ? "forked" : ghostly(m) ? (chase.atLimit ? "flees" : "loseTurn") : "captured",
  }));
}

/** Chapter 5: the Limit came during a local chase: it ends at once and they join the flight. */
export function limitEndsLocal(chase) {
  return isRunning(chase) && chase.kind === "local";
}

/**
 * B3 (Chapter 5, At the Limit): the Limit came during a local chase. It ends at once and
 * its Entities join the final flight — but if the roll that brought the Limit completed a
 * round that corners them, they are captured first and stay behind (V5: Already Dead isn't
 * captured and loses no Turn: it simply joins the flight). Returns { chase (the local chase,
 * ended or cornered, marked atLimit), staysBehind: [actorIds captured] }.
 */
export function endLocalAtLimit(chase) {
  if (!limitEndsLocal(chase)) return { chase, staysBehind: [] };
  if (roundDone(chase)) {
    const out = resolveRound(chase);
    if (out.outcome === "cornered") {
      const cornered = { ...out.chase, atLimit: true };
      return { chase: cornered, staysBehind: corneredFates(cornered).filter((f) => f.fate === "captured").map((f) => f.actorId) };
    }
    if (out.outcome === "escaped") return { chase: out.chase, staysBehind: [] };
    return { chase: endChase(out.chase, "ended"), staysBehind: [] };
  }
  return { chase: endChase(chase, "ended"), staysBehind: [] };
}
