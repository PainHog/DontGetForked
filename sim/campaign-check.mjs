/**
 * Campaign upgrades (optional rules, C16): how much does a capped bonus move the
 * win and forked rates? Same raids (common random numbers) with and without it.
 *   node sim/campaign-check.mjs [runs]
 */
import { runConfig, metrics, mergeNumbers, LABELS } from "./run.mjs";
import { defaults, NUMBERS } from "./params.mjs";

const runs = Number(process.argv[2] ?? 1000);
const params = defaults();
const variants = [
  ["no upgrades", {}],
  ["+1 charge (one upgrade)", { bonusCharges: 1 }],
  ["+2 charges", { bonusCharges: 2 }],
  ["+3 charges (cap)", { bonusCharges: 3 }],
  ["+1 Turn", { labels: { easy: { turns: 13 }, standard: { turns: 13 }, hard: { turns: 13 } } }],
  ["final flight starts at Lead 3", { lead: { finalStart: 3 } }],
  ["Limit +1", { labels: { easy: { limit: 13 }, standard: { limit: 14 }, hard: { limit: 16 } } }],
  ["+3 charges, +1 Turn, Lead 3, Limit +1 (all)", { bonusCharges: 3, lead: { finalStart: 3 }, labels: { easy: { turns: 13, limit: 13 }, standard: { turns: 13, limit: 14 }, hard: { turns: 13, limit: 16 } } }],
];
const pct = (x) => `${(100 * x).toFixed(1)}%`;
console.log(`| Variant | ${LABELS.map((l) => `${l} win / forked`).join(" | ")} |`);
console.log(`|---|${LABELS.map(() => "---").join("|")}|`);
for (const [name, over] of variants) {
  const M = metrics(runConfig({ params, numbers: mergeNumbers(NUMBERS, over), runs }));
  console.log(`| ${name} | ${LABELS.map((l) => `${pct(M.byLabel[l].win)} / ${pct(M.byLabel[l].forked)}`).join(" | ")} |`);
}
