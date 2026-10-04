/**
 * Don't Get Forked — core dice rules for the simulator.
 *
 * Implements docs/CORE-RULES.md draft 0.2 ("Rolling", P1/P2). There is no
 * rulebook yet, so these functions live in sim/ for now; when the book's
 * rolling chapter exists they move to module/logic/ (Foundry-free) and the
 * simulator imports them from there, with a frozen copy of this version kept
 * for the baseline (sim/README.md §8).
 *
 * Plain data in, plain data out. No Foundry, no randomness except through the
 * rng passed in.
 */

/** Die sizes, smallest to largest. CORE-RULES "Entities": d4 … d12. */
export const DIE_STEPS = Object.freeze([4, 6, 8, 10, 12]);

/** The second die. CORE-RULES "Rolling" 2: Mask d6, Monster d10. */
export const MASK = 6;
export const MONSTER = 10;

/** P1 Difficulty ladder. */
export const DIFFICULTY = Object.freeze({ easy: 6, standard: 8, hard: 10, daunting: 12 });

/**
 * Raise a die `n` sizes (CORE-RULES "Abilities": raise a die one size).
 * The ladder stops at d12; `over` reports how many steps were lost to that cap.
 */
export function stepUp(die, n = 1) {
  const i = DIE_STEPS.indexOf(die);
  if (i < 0) throw new Error(`not a step die: d${die}`);
  const j = Math.min(DIE_STEPS.length - 1, i + n);
  return { die: DIE_STEPS[j], over: i + n - j };
}

/**
 * Lower a die `n` sizes (carrying: Nimble one size smaller; Weakness in a chase;
 * the "next roll one size smaller" Cost). The rules never say what is below a d4;
 * the simulator floors at d4 and reports the lost steps as `under` (a gap detector).
 */
export function stepDown(die, n = 1) {
  const i = DIE_STEPS.indexOf(die);
  if (i < 0) throw new Error(`not a step die: d${die}`);
  const j = Math.max(0, i - n);
  return { die: DIE_STEPS[j], under: n - (i - j) };
}

/**
 * P2 result bands: Success if the total meets the Difficulty, Cost if 1–2 short,
 * Trouble if 3 or more short.
 */
export function band(total, difficulty) {
  if (total >= difficulty) return "success";
  if (total >= difficulty - 2) return "cost";
  return "trouble";
}

/**
 * Critical (open in CORE-RULES; the simulator measures both candidates):
 *  - "doubles": a Success where both dice show the same face;
 *  - "beat4":   the total beats the Difficulty by 4 or more.
 */
export function isCritical(traitFace, secondFace, difficulty, rule) {
  const total = traitFace + secondFace;
  if (total < difficulty) return false;
  if (rule === "doubles") return traitFace === secondFace;
  if (rule === "beat4") return total >= difficulty + 4;
  throw new Error(`unknown critical rule: ${rule}`);
}

/**
 * Decisions log 2026-10-04: the Monster shows if the Monster die rolls higher than
 * the trait die. `tie` = the S2 candidate "at least as high".
 */
export function monsterShows(traitFace, monsterFace, tie = false) {
  return tie ? monsterFace >= traitFace : monsterFace > traitFace;
}

/** Roll one trait die and one second die. */
export function rollPair(rng, traitDie, secondDie) {
  const t = rng.die(traitDie);
  const s = rng.die(secondDie);
  return { t, s, total: t + s };
}

const DIST_CACHE = new Map();

/**
 * Exact outcome distribution of one roll, by enumerating every face pair.
 * Returns probabilities of each band, split by whether the Monster shows
 * (always false for the Mask, or when `hidden`), plus both Critical rules.
 *
 * @returns {{success:number, cost:number, trouble:number,
 *            show:{success:number,cost:number,trouble:number},
 *            critDoubles:number, critBeat4:number}}
 */
export function outcomeDist(traitDie, secondDie, difficulty, { monster = false, hidden = false, tie = false } = {}) {
  const key = `${traitDie}|${secondDie}|${difficulty}|${monster ? 1 : 0}|${hidden ? 1 : 0}|${tie ? 1 : 0}`;
  const hit = DIST_CACHE.get(key);
  if (hit) return hit;
  const out = { success: 0, cost: 0, trouble: 0, show: { success: 0, cost: 0, trouble: 0 }, critDoubles: 0, critBeat4: 0 };
  const w = 1 / (traitDie * secondDie);
  for (let t = 1; t <= traitDie; t++) {
    for (let s = 1; s <= secondDie; s++) {
      const b = band(t + s, difficulty);
      out[b] += w;
      if (monster && !hidden && monsterShows(t, s, tie)) out.show[b] += w;
      if (isCritical(t, s, difficulty, "doubles")) out.critDoubles += w;
      if (isCritical(t, s, difficulty, "beat4")) out.critBeat4 += w;
    }
  }
  Object.freeze(out.show);
  DIST_CACHE.set(key, Object.freeze(out));
  return out;
}

/**
 * Decisions log 2026-10-04 (Q8g): the final flight's shared Lead moves by majority.
 * Everyone rolls; if successes outnumber trouble the Lead rises 1, if trouble
 * outnumbers successes it falls 1, otherwise no change. `critWeight` lets a
 * Critical count as more than one success (the Critical's effect is still open).
 */
export function majorityMove(results, critWeight = 1) {
  let up = 0;
  let down = 0;
  for (const r of results) {
    if (r.band === "success") up += r.critical ? critWeight : 1;
    else if (r.band === "trouble") down += 1;
  }
  return up > down ? 1 : down > up ? -1 : 0;
}

/** One Entity's Lead change in a local chase: Success +1, Cost no change, Trouble −1. */
export function leadMove(result, critWeight = 1) {
  if (result.band === "success") return result.critical ? critWeight : 1;
  if (result.band === "trouble") return -1;
  return 0;
}
