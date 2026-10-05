/**
 * Town generator: the "random tables" way of building a raid (DESIGN: three
 * ways to build a raid), using the shared parts the decisions fix:
 *  - an obstacle  = one or two traits + a Difficulty (P1); usually one of two
 *    traits is the loud way;
 *  - a location   = 1–3 obstacles + loot + at least two ways in;
 *  - a raid       = locations visited until dawn.
 * The label's difficulty budget (params NUMBERS.labels) sets the Difficulty mix,
 * obstacle counts, witnesses and group obstacles. All of it is placeholder data.
 *
 * Abstractions: one list item per location; the obstacles at a location are
 * passed in order (getting in, then the job); "two ways in" (T2) = the first
 * obstacle comes in two versions (`alt`) and the party picks one.
 */
import { TRAITS, DUTIES } from "./entities.mjs";
import { DGF } from "../module/config.mjs";

function weightedNum(rng, table) {
  return Number(rng.weighted(table));
}

function makeObstacle(rng, L) {
  const traits = rng.shuffle(TRAITS);
  const two = rng.chance(L.twoTraits);
  return {
    // With two traits, the second is the loud way (DESIGN Suspicion package).
    options: two
      ? [{ trait: traits[0], loud: false }, { trait: traits[1], loud: true }]
      : [{ trait: traits[0], loud: false }],
    difficulty: weightedNum(rng, L.difficulty),
    witnessed: rng.chance(L.witnessed),
    group: rng.chance(L.group),
    cleared: false,
    passed: new Set(), // group obstacles: who has got past
  };
}

function makeLocation(rng, L, id, kind) {
  const n = weightedNum(rng, L.obstacles);
  const obstacles = Array.from({ length: n }, () => makeObstacle(rng, L));
  // T2: two ways in = the first obstacle comes in two versions; the party picks one.
  obstacles[0].alt = makeObstacle(rng.fork("way2", id), L);
  return { id, kind, obstacles, items: [], furniture: null, done: false };
}

/** Build a town for a difficulty label. */
export function makeTown(rng, labelName, numbers) {
  const L = numbers.labels[labelName];
  const nEss = rng.pick(L.essentials);
  const items = Array.from({ length: L.items }, (_, i) => ({
    id: `item${i + 1}`, essential: i < nEss, kind: rng.pick(DUTIES),
  }));
  const locations = items.map((it, i) => {
    const loc = makeLocation(rng, L, `loc${i + 1}`, it.kind);
    loc.items.push(it);
    return loc;
  });
  // One furniture piece, at its own location with one extra obstacle.
  const fl = makeLocation(rng, L, "furniture", rng.pick(DUTIES));
  fl.obstacles.push(makeObstacle(rng, L));
  fl.furniture = { size: rng.chance(0.7) ? "bulky" : "huge" };
  // The lock-up where captives are held; its rescue obstacle is re-made per rescue.
  const lockup = { id: "lockup", difficulty: L.lockup };
  return { label: labelName, L, items, locations, furnitureLoc: fl, lockup };
}

/** A fresh rescue obstacle at the lock-up: Sly, or Brawn the loud way; always watched. */
export function rescueObstacle(town) {
  return {
    options: [{ trait: "sly", loud: false }, { trait: "brawn", loud: true }],
    difficulty: town.lockup.difficulty, witnessed: true, group: false, cleared: false, passed: new Set(),
  };
}

/**
 * Placeholder d6 chase table (DESIGN Chase: each result lists the traits that
 * work, always including one that isn't Nimble).
 */
export const CHASE_TABLE = Object.freeze([
  ["nimble", "sly"],
  ["nimble", "brawn"],
  ["nimble", "charm"],
  ["nimble", "wits"],
  ["sly", "charm"],
  ["brawn", "wits"],
]);

/**
 * Chase tables proposed for content question C12 (not decided). A: two traits a row,
 * each trait 2–3 times (Nimble and Sly three); B: three traits a row; C: Nimble on every
 * row plus one other.
 */
export const CHASE_TABLES = Object.freeze({
  approved: DGF.chaseTable.map((r) => r.traits), // C12, approved 2026-10-05 (= candidate A)
  placeholder: CHASE_TABLE,
  A: [["sly", "charm"], ["nimble", "sly"], ["brawn", "nimble"], ["nimble", "wits"], ["charm", "sly"], ["brawn", "wits"]],
  B: [["sly", "charm", "nimble"], ["nimble", "sly", "wits"], ["brawn", "nimble", "charm"], ["nimble", "wits", "brawn"], ["charm", "sly", "brawn"], ["brawn", "wits", "sly"]],
  C: [["nimble", "sly"], ["nimble", "charm"], ["nimble", "brawn"], ["nimble", "wits"], ["nimble", "sly"], ["nimble", "brawn"]],
});
