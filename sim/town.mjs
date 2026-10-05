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

/**
 * Candidate C18 obstacle table (not approved): d20 entries, the quiet trait first,
 * the loud way second; `group` = everyone rolls for themselves.
 */
export const OBSTACLE_TABLES = {
  // c18b: every trait is the quiet way 4 times; loud ways Brawn/Nimble 3, Charm/Sly/Wits 2; one group obstacle per trait.
  c18b: [
    { name: "A heavy cellar trapdoor", quiet: "brawn" },
    { name: "A tug-of-war across the lane", quiet: "brawn", group: true },
    { name: "A cart blocking the alley", quiet: "brawn", loud: "nimble" },
    { name: "A bolted back gate", quiet: "brawn", loud: "charm" },
    { name: "A high garden wall", quiet: "nimble", loud: "brawn" },
    { name: "A shuttered window", quiet: "nimble", loud: "brawn" },
    { name: "The rooftops", quiet: "nimble", group: true },
    { name: "A rickety drainpipe", quiet: "nimble" },
    { name: "A locked front door", quiet: "sly", loud: "brawn" },
    { name: "A nosy neighbour at her window", quiet: "sly", loud: "wits" },
    { name: "A crowded shop floor", quiet: "sly", group: true },
    { name: "A muddy yard full of geese", quiet: "sly", loud: "nimble" },
    { name: "The shopkeeper behind the counter", quiet: "charm", loud: "sly" },
    { name: "A guard dog", quiet: "charm", loud: "nimble" },
    { name: "A doorman checking invitations", quiet: "charm", loud: "wits" },
    { name: "Children in costumes who want a closer look", quiet: "charm", group: true },
    { name: "A locked strongbox", quiet: "wits", loud: "charm" },
    { name: "A dark, cluttered back room", quiet: "wits", loud: "sly" },
    { name: "The night watchman on his round", quiet: "wits" },
    { name: "A maze of festival stalls", quiet: "wits", group: true },
  ],
  c18a: [
    { name: "A locked front door", quiet: "sly", loud: "brawn" },
    { name: "A high garden wall", quiet: "nimble", loud: "brawn" },
    { name: "A shuttered window", quiet: "nimble", loud: "brawn" },
    { name: "A guard dog", quiet: "charm", loud: "nimble" },
    { name: "A nosy neighbour at her window", quiet: "sly", loud: "charm" },
    { name: "A doorman checking everyone", quiet: "charm", loud: "brawn", group: true },
    { name: "A locked strongbox", quiet: "wits", loud: "brawn" },
    { name: "A cart blocking the alley", quiet: "brawn", loud: "nimble" },
    { name: "A bolted back gate", quiet: "brawn", loud: "charm" },
    { name: "A muddy yard full of geese", quiet: "sly", loud: "nimble", group: true },
    { name: "A dark, cluttered back room", quiet: "wits", loud: "nimble" },
    { name: "The night watchman on his round", quiet: "wits", loud: "charm" },
    { name: "A heavy cellar trapdoor", quiet: "brawn" },
    { name: "A tug-of-war across the lane", quiet: "brawn", group: true },
    { name: "The rooftops", quiet: "nimble" },
    { name: "A rickety drainpipe", quiet: "nimble" },
    { name: "A crowded shop floor", quiet: "sly", group: true },
    { name: "The shopkeeper behind the counter", quiet: "charm" },
    { name: "Children in costumes who want a closer look", quiet: "charm", group: true },
    { name: "A combination lock", quiet: "wits" },
  ],
};

function makeObstacle(rng, L, numbers = null, avoidTrait = null) {
  const table = numbers && OBSTACLE_TABLES[numbers.obstacleTable];
  if (table) {
    let e;
    do e = rng.pick(table); while (avoidTrait && e.quiet === avoidTrait);
    return {
      name: e.name,
      options: e.loud ? [{ trait: e.quiet, loud: false }, { trait: e.loud, loud: true }] : [{ trait: e.quiet, loud: false }],
      difficulty: weightedNum(rng, L.difficulty),
      witnessed: rng.chance(L.witnessed),
      group: !!e.group,
      cleared: false,
      passed: new Set(),
    };
  }
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

function makeLocation(rng, L, id, kind, numbers = null) {
  const n = weightedNum(rng, L.obstacles);
  const obstacles = Array.from({ length: n }, () => makeObstacle(rng, L, numbers));
  // T2: two ways in = the first obstacle comes in two versions (with a different quiet trait); the party picks one.
  obstacles[0].alt = makeObstacle(rng.fork("way2", id), L, numbers, obstacles[0].options[0].trait);
  return { id, kind, obstacles, items: [], furniture: null, done: false };
}

/**
 * Candidate (C17 B): a difficulty budget. Instead of rolling each obstacle's
 * Difficulty and whether it's watched, the town gets the label's shares as a
 * fixed set (largest remainder over its obstacles, both ways in counted), dealt
 * out at random.
 */
function quota(shares, n) {
  const keys = Object.keys(shares);
  const raw = keys.map((k) => shares[k] * n);
  const out = raw.map(Math.floor);
  let left = n - out.reduce((a, b) => a + b, 0);
  const order = raw.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]);
  for (let j = 0; left > 0; j++, left--) out[order[j % order.length][1]] += 1;
  return keys.flatMap((k, i) => Array(out[i]).fill(k));
}
function applyBudget(rng, L, locs) {
  const obs = locs.flatMap((l) => l.obstacles.flatMap((o) => (o.alt ? [o, o.alt] : [o])));
  const diffs = rng.shuffle(quota(L.difficulty, obs.length));
  obs.forEach((o, i) => { o.difficulty = Number(diffs[i]); });
  const watched = rng.shuffle(quota({ yes: L.witnessed, no: 1 - L.witnessed }, obs.length));
  obs.forEach((o, i) => { o.witnessed = watched[i] === "yes"; });
}

/** Candidate (C17 C): rolled, but at most `cap` Difficulty-12 obstacles in town; extras are rolled again until they aren't 12. */
function applyCap(rng, L, locs, cap) {
  const obs = locs.flatMap((l) => l.obstacles.flatMap((o) => (o.alt ? [o, o.alt] : [o])));
  let n = 0;
  for (const o of obs) {
    if (o.difficulty !== 12) continue;
    if (++n <= cap) continue;
    do o.difficulty = Number(rng.weighted(L.difficulty)); while (o.difficulty === 12);
  }
}

/** Build a town for a difficulty label. */
export function makeTown(rng, labelName, numbers) {
  const L = numbers.labels[labelName];
  const nEss = rng.pick(L.essentials);
  const items = Array.from({ length: L.items }, (_, i) => ({
    id: `item${i + 1}`, essential: i < nEss, kind: rng.pick(DUTIES),
  }));
  const locations = items.map((it, i) => {
    const loc = makeLocation(rng, L, `loc${i + 1}`, it.kind, numbers);
    loc.items.push(it);
    return loc;
  });
  // One furniture piece, at its own location with one extra obstacle.
  const fl = makeLocation(rng, L, "furniture", rng.pick(DUTIES), numbers);
  fl.obstacles.push(makeObstacle(rng, L, numbers));
  const piece = rng.pick(DGF.furniture); // C16: the d6 furniture table
  fl.furniture = { key: piece.key, size: piece.size };
  if (numbers.townBudget === "budget") applyBudget(rng.fork("budget"), L, [...locations, fl]);
  if (numbers.townBudget === "cap") applyCap(rng.fork("cap"), L, [...locations, fl], labelName === "hard" ? 2 : 1);
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
