/**
 * DON'T GET FORKED — Pure Rules Logic
 * -----------------------------------
 * The convention (carried over from Heisty Spideys): every rule the system
 * automates is computed by a Foundry-free function in module/logic/ — no
 * `game`, `ui`, `foundry`, `Hooks`, `CONFIG` or DOM; only plain data in, plain
 * data out, plus static data from ../config.mjs (itself Foundry-free). Sheets,
 * chat cards and GM operations call these functions and only do the Foundry
 * plumbing around them. That keeps the rules unit-testable with `node --test`
 * (no live Foundry needed) and lets the simulator (sim/) reuse the exact same
 * code the table uses.
 *
 * Source: docs/CORE-RULES.md 1.0 (approved 2026-10-05) until the rulebook
 * chapters exist; then the rulebook is the source of truth: change the book
 * first, then this file and its tests. Each function cites its passage.
 */
import { DGF } from "../config.mjs";

export const DIE_STEPS = DGF.dieSteps;
export const MASK = DGF.second.mask;
export const MONSTER = DGF.second.monster;
export const DIFFICULTY = DGF.difficulty;

/** CORE-RULES Abilities: raise a die `n` sizes; d12 is the top (`over` = steps lost). */
export function stepUp(die, n = 1) {
  const i = DIE_STEPS.indexOf(die);
  if (i < 0) throw new Error(`not a step die: d${die}`);
  const j = Math.min(DIE_STEPS.length - 1, i + n);
  return { die: DIE_STEPS[j], over: i + n - j };
}

/** R6: no die goes below a d4; further steps down are lost (`under`). */
export function stepDown(die, n = 1) {
  const i = DIE_STEPS.indexOf(die);
  if (i < 0) throw new Error(`not a step die: d${die}`);
  const j = Math.max(0, i - n);
  return { die: DIE_STEPS[j], under: n - (i - j) };
}

/** P2: Success = meet the Difficulty; Cost = 1–2 short; Trouble = 3+ short. */
export function band(total, difficulty) {
  if (total >= difficulty) return "success";
  if (total >= difficulty - 2) return "cost";
  return "trouble";
}

/** S8: a Critical is a Success where both dice show the same face. */
export function isCritical(traitFace, secondFace, difficulty) {
  return traitFace + secondFace >= difficulty && traitFace === secondFace;
}

/** Rolling 4: the Monster shows if the Monster die rolls higher than the trait die. */
export function monsterShows(traitFace, monsterFace) {
  return monsterFace > traitFace;
}

/**
 * CORE-RULES Suspicion: one roll raises Suspicion once, by its biggest trigger.
 * Triggers: Trouble +1 · the Monster shows +2 (S2) · the loud way +1 whatever the
 * result (R1) · overdraw +2 · a Cost chosen as Suspicion +1 (P3).
 */
export function suspicionForRoll({ band: b, show = false, loud = false, overdraw = false, costSuspicion = false }) {
  const S = DGF.suspicion;
  return Math.max(
    b === "trouble" ? S.trouble : 0,
    show ? S.monsterShows : 0,
    loud ? S.loud : 0,
    overdraw ? S.overdraw : 0,
    b === "cost" && costSuspicion ? S.cost : 0,
  );
}

/**
 * Read one roll (CORE-RULES Rolling 3–4). `second` is "mask" or "monster";
 * `hidden` = an ability lets the Monster die roll without risking Suspicion.
 * Once the hunt is on (S1) Suspicion stops, so `hunt` zeroes it.
 */
export function resolveRoll({ traitFace, secondFace, difficulty, second = "mask", hidden = false, loud = false, overdraw = false, costSuspicion = false, hunt = false }) {
  const total = traitFace + secondFace;
  const b = band(total, difficulty);
  const critical = isCritical(traitFace, secondFace, difficulty);
  const show = second === "monster" && !hidden && monsterShows(traitFace, secondFace);
  const suspicion = hunt ? 0 : suspicionForRoll({ band: b, show, loud, overdraw, costSuspicion });
  return { total, band: b, critical, show, suspicion, caughtIfWatched: b === "trouble" };
}

/**
 * Exact odds of one roll, for the roll dialog: each band, the Monster showing,
 * and a Critical. Enumerates every face pair.
 */
export function rollOdds(traitDie, secondDie, difficulty, { monster = false, hidden = false } = {}) {
  const out = { success: 0, cost: 0, trouble: 0, show: 0, critical: 0 };
  const w = 1 / (traitDie * secondDie);
  for (let t = 1; t <= traitDie; t++) {
    for (let s = 1; s <= secondDie; s++) {
      out[band(t + s, difficulty)] += w;
      if (monster && !hidden && monsterShows(t, s)) out.show += w;
      if (isCritical(t, s, difficulty)) out.critical += w;
    }
  }
  return out;
}

/** S10: "open an approach" rolls the ability's trait at 2 lower Difficulty. */
export function openApproachDifficulty(difficulty) {
  return difficulty - DGF.openApproachEase;
}

/** Chases: one Entity's Lead change — Success +1 (a Critical +2, S8), Cost 0, Trouble −1. */
export function leadMove(result) {
  if (result.band === "success") return result.critical ? 2 : 1;
  if (result.band === "trouble") return -1;
  return 0;
}

/**
 * Q8g + S8: a shared Lead (the final flight; several caught by one roll, R4) moves
 * by majority. A Critical counts as two successes.
 */
export function majorityMove(results) {
  let up = 0;
  let down = 0;
  for (const r of results) {
    if (r.band === "success") up += r.critical ? 2 : 1;
    else if (r.band === "trouble") down += 1;
  }
  return up > down ? 1 : down > up ? -1 : 0;
}

/** CORE-RULES Chases: the local mob's Difficulty rises with Suspicion (S9: 10 + half, at most 12). */
export function localMobDifficulty(suspicion) {
  const M = DGF.localMob;
  return Math.min(M.max, M.base + Math.floor(suspicion * M.perSuspicion));
}

/** C4: does a Tell check go off? */
export function tellGoesOff(face) {
  return face >= DGF.tell.goesOffOn;
}

/**
 * C3: is a Weakness in play this chase round (1-based)? "always" from round 1,
 * "soon" from round 3, "dawn" only in a final flight that dawn started. An
 * overdraw in the final flight puts any Weakness in play (S1), passed as `overdrawn`.
 */
export function weaknessInPlay({ timing, round, final = false, byDawn = false, overdrawn = false }) {
  if (overdrawn) return true;
  if (timing === "always") return true;
  if (timing === "soon") return round >= DGF.weaknessSoonRound;
  if (timing === "dawn") return final && byDawn;
  throw new Error(`unknown Weakness timing: ${timing}`);
}

/**
 * How the year went (P8, Grand Year, left-behind steps). Pass what came home.
 * Returns "grand" | "win" | "partial" | "bust" | "forked".
 */
export function yearResult({ forked = false, listSize, itemsHome, essentialsAllHome, extrasMissing, furnitureHome = false, leftBehind = 0 }) {
  if (forked) return "forked";
  let step;
  if (essentialsAllHome && extrasMissing <= 1) step = furnitureHome ? 3 : 2;
  else if (itemsHome * 2 >= listSize) step = 1;
  else step = 0;
  return DGF.results[Math.max(0, step - leftBehind)];
}
