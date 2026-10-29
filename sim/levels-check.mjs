#!/usr/bin/env node
/**
 * Richard's difficulty levels after the first real game (2026-10-29, docs/DESIGN.md):
 *   Easy     as today: the players hear the shopping list, then choose monsters and may switch Castle Duties;
 *   Standard the same, but nobody switches Castle Duties (each monster keeps its own);
 *   Hard     the players choose monsters first, then hear the list; Duties locked too.
 * Each level keeps its numbers (Limits 9 / 10 / 13 and the rest). A measuring job: nothing here changes the game.
 *
 * The simulator's standard play gives each monster a Castle Duty at random (dutyPolicy "random") and picks the party at
 * random, so it never used a Duty on purpose. Real players hear the list and set their Duties to it, so "as people play
 * today" (every level: list-aware picks, Duties matched) is the fair before; the levels are the after.
 *
 *   node sim/levels-check.mjs [--runs 2000] [--seed 1] [--out sim/LEVELS-2026-10-29.md]
 */
import { writeFileSync } from "node:fs";
import { runConfig, SIZES } from "./run.mjs";
import { defaults, NUMBERS, TARGETS } from "./params.mjs";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const RUNS = Number(arg("runs", 2000));
const SEED = Number(arg("seed", 1));
const OUT = arg("out", "");
const LABELS = ["easy", "standard", "hard"];

/** Each configuration: per label, the pick and Duty policies. */
const CONFIGS = [
  { key: "sim", name: "The simulator's standard (random Duties, random picks)", per: () => ({ partyPick: "random", dutyPolicy: "random" }) },
  { key: "today", name: "Today's rules as people play them (list heard, Duties switched to it)", per: () => ({ partyPick: "list", dutyPolicy: "match" }) },
  { key: "levels", name: "Richard's levels (Easy as today; Standard: Duties locked; Hard: monsters before the list, Duties locked)", per: (L) => (L === "easy" ? { partyPick: "list", dutyPolicy: "match" } : L === "standard" ? { partyPick: "list", dutyPolicy: "default" } : { partyPick: "random", dutyPolicy: "default" }) },
  { key: "levelsHard14", name: "Richard's levels, with Hard's Suspicion Limit 14 instead of 13", per: (L) => (L === "easy" ? { partyPick: "list", dutyPolicy: "match" } : L === "standard" ? { partyPick: "list", dutyPolicy: "default" } : { partyPick: "random", dutyPolicy: "default" }), numbers: (L) => (L === "hard" ? { limit: 14 } : null) },
  { key: "levelsLow", name: "The same, if Standard players also pick monsters without thinking about the list", per: (L) => (L === "easy" ? { partyPick: "list", dutyPolicy: "match" } : { partyPick: "random", dutyPolicy: "default" }) },
];

const sumBy = (xs, f) => xs.reduce((a, x) => a + f(x), 0);
function counts(raids) {
  const n = raids.length;
  return {
    n,
    win: raids.filter((r) => r.win).length / n,
    forked: raids.filter((r) => r.forked).length / n,
    grand: raids.filter((r) => r.result === "grand").length / n,
    flight: raids.filter((r) => r.flightRounds > 0).length / n,
    chases: sumBy(raids, (r) => r.chases) / n,
    captures: sumBy(raids, (r) => r.captures) / n,
    dutyRaises: sumBy(raids, (r) => r.st?.dutyRaises ?? 0) / n,
  };
}

const results = {};
for (const c of CONFIGS) {
  results[c.key] = {};
  for (const L of LABELS) {
    const params = { ...defaults(), ...c.per(L) };
    const over = c.numbers?.(L);
    const numbers = over ? { ...NUMBERS, labels: { ...NUMBERS.labels, [L]: { ...NUMBERS.labels[L], ...over } } } : NUMBERS;
    const { raids } = runConfig({ params, numbers, runs: RUNS, seed: SEED, labels: [L], sizes: SIZES });
    results[c.key][L] = counts(raids);
    process.stderr.write(`${c.key} ${L}: ${(100 * results[c.key][L].win).toFixed(1)}% won\n`);
  }
}

const pct = (x) => `${(100 * x).toFixed(1)}%`;
const inBand = (x, [a, b]) => x >= a && x <= b;
const lines = [];
lines.push(`# Difficulty levels after the first real game (${RUNS} raids per level and party size; parties of ${SIZES.join(", ")}; seed ${SEED})`, "");
lines.push(`Targets: won ${LABELS.map((l) => `${Math.round(100 * TARGETS.win[l][0])}–${Math.round(100 * TARGETS.win[l][1])}%`).join(" / ")}; forked ≤2 / 3–7 / 8–12% (Easy / Standard / Hard). ✓ = both in target.`, "");
lines.push("| Configuration | Level | Won | Forked | Grand Year | Final flight | Local chases per raid | Captures per raid |", "|---|---|---|---|---|---|---|---|");
for (const c of CONFIGS) for (const L of LABELS) {
  const r = results[c.key][L];
  const ok = inBand(r.win, TARGETS.win[L]) && inBand(r.forked, TARGETS.forked[L]) ? " ✓" : "";
  lines.push(`| ${c.name} | ${L} | ${pct(r.win)}${ok} | ${pct(r.forked)} | ${pct(r.grand)} | ${pct(r.flight)} | ${r.chases.toFixed(2)} | ${r.captures.toFixed(2)} |`);
}
lines.push("", "```", `node sim/levels-check.mjs --runs ${RUNS} --seed ${SEED}`, "```", "");
const text = lines.join("\n");
if (OUT) writeFileSync(OUT, text);
process.stdout.write(text);
