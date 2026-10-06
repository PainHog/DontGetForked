#!/usr/bin/env node
/**
 * Searches label numbers (Suspicion Limit, final-flight mob Difficulty, list
 * size, Difficulty mix) for the set closest to the agreed targets, one label at
 * a time, under a given set of rule readings. Prints the best numbers as JSON
 * for `node sim/run.mjs --numbers '…'`. The result is a proposal for Richard,
 * not a decision.
 *
 *   node sim/tune.mjs                                   # rules as written
 *   node sim/tune.mjs --params '{"exitRule":"gate","dropRule":"recover"}'
 *   node sim/tune.mjs --runs 400 --base '{"localMob":{"base":9}}'
 */
import { NUMBERS, TARGETS, defaults } from "./params.mjs";
import { runConfig, merge, metrics } from "./run.mjs";

export const MIXES = {
  soft: { 6: 0.4, 8: 0.5, 10: 0.1 },
  mid: { 6: 0.15, 8: 0.5, 10: 0.3, 12: 0.05 },
  stiff: { 8: 0.4, 10: 0.45, 12: 0.15 },
};

const SPACE = {
  easy: { mix: ["soft", "mid"], items: [3], limit: [8, 10, 12, 14], finalMob: [10, 11, 12, 13] },
  standard: { mix: ["soft", "mid", "stiff"], items: [3, 4], limit: [10, 12, 14, 16], finalMob: [10, 11, 12, 13] },
  hard: { mix: ["mid", "stiff"], items: [4, 5], limit: [10, 12, 14, 16], finalMob: [10, 11, 12, 13] },
};

const mid = ([lo, hi]) => (lo + hi) / 2;

function score(M, label) {
  const c = M.byLabel[label];
  let s = ((c.win - mid(TARGETS.win[label])) / 0.03) ** 2;
  s += 0.5 * ((c.forked - mid(TARGETS.forked[label])) / 0.03) ** 2;
  if (label === "hard") s += 0.5 * (Math.max(0, TARGETS.hardCaptures[0] - c.captures, c.captures - TARGETS.hardCaptures[1]) / 0.1) ** 2;
  return s;
}

export function tune({ params, base, runs, seed = 1, log = () => {} }) {
  const best = {};
  for (const label of Object.keys(SPACE)) {
    const sp = SPACE[label];
    let top = null;
    for (const mix of sp.mix) for (const items of sp.items) for (const limit of sp.limit) for (const finalMob of sp.finalMob) {
      const over = { labels: { [label]: { difficulty: MIXES[mix], items, limit, finalMob, essentials: items >= 5 ? [2] : items === 3 ? [1] : [1, 2] } } };
      const numbers = merge(base, over);
      numbers.labels[label].difficulty = MIXES[mix]; // replace, don't merge, the mix
      const M = metrics(runConfig({ params, numbers, runs, seed, labels: [label] }));
      const s = score(M, label);
      if (!top || s < top.s) top = { s, mix, items, limit, finalMob, win: M.byLabel[label].win, forked: M.byLabel[label].forked, captures: M.byLabel[label].captures };
    }
    log(`${label}: ${JSON.stringify(top)}`);
    best[label] = top;
  }
  const numbers = merge(base, {});
  for (const [label, t] of Object.entries(best)) {
    numbers.labels[label] = { ...numbers.labels[label], difficulty: MIXES[t.mix], items: t.items, limit: t.limit, finalMob: t.finalMob, essentials: t.items >= 5 ? [2] : t.items === 3 ? [1] : [1, 2] };
  }
  return { best, numbers };
}

function args(argv) {
  const a = { runs: 300, params: {}, base: null, seed: 1 };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--runs") a.runs = Number(argv[++i]);
    else if (argv[i] === "--params") a.params = JSON.parse(argv[++i]);
    else if (argv[i] === "--base") a.base = JSON.parse(argv[++i]);
    else if (argv[i] === "--seed") a.seed = Number(argv[++i]);
  }
  return a;
}

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const a = args(process.argv.slice(2));
  const { numbers } = tune({ params: { ...defaults(), ...a.params }, base: merge(NUMBERS, a.base), runs: a.runs, seed: a.seed, log: console.log });
  const diff = { localMob: numbers.localMob, labels: {} };
  for (const [k, v] of Object.entries(numbers.labels)) diff.labels[k] = { difficulty: v.difficulty, items: v.items, essentials: v.essentials, limit: v.limit, finalMob: v.finalMob };
  console.log(JSON.stringify(diff));
}
