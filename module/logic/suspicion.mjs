/**
 * DON'T GET FORKED — Suspicion as a ledger (pure, Foundry-free)
 * -------------------------------------------------------------
 * Heisty lesson: model the threat track as a ledger, and "one event, one
 * trigger" and cancels fall out naturally. Every change to Suspicion is an
 * entry; the value is a pure fold of the entries.
 *
 *   entry = { eventId, amount, source, cancelled?, hunt? }
 *
 * CORE-RULES 1.0, Suspicion:
 *  - one roll raises it once, by its biggest trigger → entries sharing an
 *    eventId apply only their largest amount (a group check shares one eventId,
 *    so Suspicion rises once, by the worst result — P6);
 *  - good results never lower it; only a few specific abilities or Perks can
 *    (negative amounts are accepted only from sources "ability" or "perk", and
 *    from "storyteller": the Storyteller's own correction on the Raid HUD, which
 *    is table housekeeping, not a game rule);
 *  - the track never goes past the Limit; extra points are lost (R11);
 *  - once the hunt is on, Suspicion stops (S1) → entries marked `hunt` are ignored;
 *  - a cancelled entry (an amendment, e.g. an ability that undoes a trigger, or
 *    the Storyteller undoing an event) is ignored; restoring it counts it again.
 */

const LOWERING = new Set(["ability", "perk", "storyteller"]);

/** Fold the ledger into the current value. */
export function foldSuspicion(entries, limit) {
  const byEvent = new Map();
  for (const e of entries) {
    if (e.cancelled || e.hunt) continue;
    if (e.amount < 0 && !LOWERING.has(e.source)) throw new Error(`only abilities or Perks lower Suspicion (event ${e.eventId})`);
    const prev = byEvent.get(e.eventId);
    // Raises: the biggest trigger wins. Lowerings are their own events.
    if (prev === undefined || e.amount > prev) byEvent.set(e.eventId, e.amount);
  }
  let value = 0;
  let lost = 0;
  for (const amount of byEvent.values()) {
    const next = value + amount;
    if (next > limit) { lost += next - limit; value = limit; }
    else value = Math.max(0, next);
  }
  return { value, atLimit: value >= limit, lost, events: byEvent.size };
}

/** A new ledger with one more entry (ledgers are never mutated). */
export function addEntry(entries, entry) {
  return [...entries, { cancelled: false, hunt: false, ...entry }];
}

/** A new ledger with every entry of an event cancelled. */
export function cancelEvent(entries, eventId) {
  return entries.map((e) => (e.eventId === eventId ? { ...e, cancelled: true } : e));
}

/** A new ledger with every entry of an event counted again (undoes cancelEvent). */
export function restoreEvent(entries, eventId) {
  return entries.map((e) => (e.eventId === eventId ? { ...e, cancelled: false } : e));
}
