/**
 * The premade towns (C21) against their difficulty's targets: each town played as
 * printed by random parties of 3, 4 and 5 Entities (the approved roster, default
 * rules and policies, the approved numbers), the same parties and dice streams as
 * the rolled-town runs.
 *   node sim/premade-check.mjs [runs per party size] [town keys…] [--seed n]
 */
import { runConfig, metrics, SIZES } from "./run.mjs";
import { defaults, NUMBERS, TARGETS } from "./params.mjs";
import { PREMADE, premadeTown } from "./premade.mjs";

export function checkTown(key, { runs = 2000, params = defaults(), numbers = NUMBERS, seed = 1 } = {}) {
  const t = PREMADE.find((x) => x.key === key);
  const run = (p) => runConfig({ params: p, numbers, runs, seed, labels: [t.label], townFn: () => premadeTown(key, numbers) });
  const base = run(params);
  const M = metrics(base, run({ ...params, furniturePolicy: "never" }));
  const C = M.byLabel[t.label];
  const inBand = (x, [lo, hi]) => x >= lo && x <= hi;
  return {
    town: t, M, C,
    ok: inBand(C.win, TARGETS.win[t.label]) && inBand(C.forked, TARGETS.forked[t.label]),
    bySize: Object.fromEntries(SIZES.map((n) => [n, M.bySize[t.label][n]])),
  };
}

if (process.argv[1]?.endsWith("premade-check.mjs")) {
  const args = process.argv.slice(2);
  const si = args.indexOf("--seed");
  const seed = si >= 0 ? Number(args.splice(si, 2)[1]) : 1;
  const runs = Number(args[0] ?? 2000);
  const keys = args.slice(1).length ? args.slice(1) : PREMADE.map((t) => t.key);
  const pct = (x) => `${(100 * x).toFixed(1)}%`;
  const band = ([lo, hi]) => `${(100 * lo).toFixed(0)}–${(100 * hi).toFixed(0)}%`;
  console.log(`${runs} raids per party size (3, 4, 5 Entities), seed ${seed}; default rules, policies and numbers.`);
  console.log("| Town | Win (target) | Forked (target) | Win with 3 · 4 · 5 | Forked with 3 · 4 · 5 | Captures | Grand Year | Went for the furniture | Suspicion at end | Trouble |");
  console.log("|---|---|---|---|---|---|---|---|---|---|");
  for (const key of keys) {
    const { town: t, M, C, ok, bySize } = checkTown(key, { runs, seed });
    const s = t.stats;
    console.log(`| ${t.name} (${t.labelName}; ${s.obstacles} obstacles, mean ${s.mean.toFixed(2)}, ${s.watched} watched)${ok ? "" : " ✗"} | ${pct(C.win)} (${band(TARGETS.win[t.label])}) | ${pct(C.forked)} (${band(TARGETS.forked[t.label])}) | ${SIZES.map((n) => pct(bySize[n].win)).join(" · ")} | ${SIZES.map((n) => pct(bySize[n].forked)).join(" · ")} | ${C.captures.toFixed(2)} | ${pct(C.grand)} | ${pct(M.furniture.went)} | ${C.susp.toFixed(1)} | ${pct(M.rolls.trouble)} |`);
  }
}
