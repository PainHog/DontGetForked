/**
 * DON'T GET FORKED — The lock-up (pure, Foundry-free)
 * ---------------------------------------------------
 * Captured Entities, slipping free, rescue and being left behind, as plain
 * data: each function returns the change to make to an Entity's system data
 * (the Storyteller's client writes it), or reads what the book says happens.
 *
 * Source: rulebook Chapter 6 (Captured: the town takes back what you were
 * carrying; rescue frees every captive there; slipping free once per Turn from
 * the Turn after the capture, only a Success frees you; left behind) and
 * Chapter 2's Perks: Built to Last (slip free on a Success or a Cost), Hidden
 * Pockets (captured, you keep what you carry). U1: a captive may open its own
 * way out (the roll plan allows "open an approach" when slipping free).
 */
import { DGF } from "../config.mjs";

const perkRule = (perk) => DGF.perkRules[perk] ?? {};

/** Is this Entity held at the lock-up? */
export function isCaptive(system) {
  return system?.status === "captured";
}

/**
 * Captured: the change to the Entity, and what the town takes back. The captive's
 * loot is gone for the night (Hidden Pockets: it keeps what it carries); it stops
 * carrying furniture either way (it is held at the lock-up).
 * Returns { update, taken: [names], furniture: bool }.
 */
export function captureUpdate(system, { turn }) {
  const keep = !!perkRule(system?.perk).keepLoot;
  const carried = (system?.carried ?? []).map((c) => ({ ...c }));
  return {
    update: { status: "captured", capturedTurn: turn, slipTurn: 0, carried: keep ? carried : [], carryingFurniture: false },
    taken: keep ? [] : carried.map((c) => c.name),
    kept: keep ? carried.map((c) => c.name) : [],
    furniture: !!system?.carryingFurniture,
  };
}

/** Freed (rescued, or slipped free): it acts again next Turn. */
export function freeUpdate() {
  return { status: "active", capturedTurn: 0, slipTurn: 0 };
}

/**
 * May this captive try to slip free now? Once per Turn, from the Turn after its
 * capture. Returns a list of reason codes (empty = yes).
 */
export function slipProblems(system, { turn }) {
  if (!isCaptive(system)) return ["notCaptured"];
  const out = [];
  if ((system.capturedTurn ?? 0) >= turn) out.push("slipTooSoon");
  if ((system.slipTurn ?? 0) === turn) out.push("slipOncePerTurn");
  return out;
}

/** Slipping free: only a Success frees you (Built to Last: a Success or a Cost). */
export function slipFrees(band, perk = "") {
  return band === "success" || (band === "cost" && !!perkRule(perk).slipOnCost);
}

/** A rescue: beat the lock-up (a Success or a Cost) and every captive there is free. */
export function rescueFrees(band) {
  return band === "success" || band === "cost";
}

/** The traits the lock-up lists for a rescue or for slipping free: { quiet, loud }. */
export function lockupTraits(kind) {
  const t = DGF.lockup[kind];
  if (!t) throw new Error(`unknown lock-up roll: ${kind}`);
  return { quiet: [...t.quiet], loud: [...t.loud] };
}

/** The captives among these Entities ([{ id, name, system }]): anyone still held when the party leaves is left behind. */
export function captivesOf(entities) {
  return entities.filter((e) => isCaptive(e.system));
}

/**
 * A new raid (a new year): the Entity is free, its charges refill (Chapter 2:
 * charges refill once a year, at the castle) and the marks the last raid left go.
 */
export function newRaidUpdate(system) {
  return {
    status: "active", capturedTurn: 0, slipTurn: 0, skipTurn: 0, nextRollSmaller: 0, weaknessInPlay: false, overdrewInFlight: false,
    "charges.value": system?.charges?.start ?? DGF.charges,
  };
}
