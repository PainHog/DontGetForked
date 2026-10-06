/**
 * Balance pass: candidate number packages against the agreed targets, on the
 * same raids (common random numbers). Rules and content as decided; only numbers move.
 *   node sim/balance-pass.mjs [runs] [names…]
 */
import { runConfig, metrics, mergeNumbers, LABELS } from "./run.mjs";
import { defaults, NUMBERS, TARGETS } from "./params.mjs";

const L3 = (e, s, h) => ({ easy: e, standard: s, hard: h });
const per = (key, e, s, h) => ({ labels: { easy: { [key]: e }, standard: { [key]: s }, hard: { [key]: h } } });
const deep = (...xs) => xs.reduce((a, b) => mergeNumbers(a, b), {});

export const CANDIDATES = {
  now: {},
  limit2: per("limit", 10, 11, 13),
  limit3: per("limit", 9, 10, 12),
  mob1: per("finalMob", 11, 12, 12),
  charges2: { charges: 2 },
  turns10: per("turns", 10, 10, 10),
  exit2: per("exit", 8, 10, 10),
  harderStd: { labels: { standard: { difficulty: { 6: 0.1, 8: 0.45, 10: 0.35, 12: 0.1 } }, hard: { difficulty: { 8: 0.3, 10: 0.5, 12: 0.2 } } } },
  watched: per("witnessed", 0.5, 0.6, 0.7),
  limit2mob1: deep(per("limit", 10, 11, 13), per("finalMob", 11, 12, 12)),
  limit3mob1: deep(per("limit", 9, 10, 12), per("finalMob", 11, 12, 12)),
  limit2charges2: deep(per("limit", 10, 11, 13), { charges: 2 }),
  limit2watched: deep(per("limit", 10, 11, 13), per("witnessed", 0.5, 0.6, 0.7)),
  items5: per("items", 4, 5, 5),
  ess: { labels: { easy: { essentials: [1, 2] }, standard: { essentials: [2] }, hard: { essentials: [2, 3] } } },
  moreObs: { labels: { easy: { obstacles: { 1: 0.4, 2: 0.45, 3: 0.15 } }, standard: { obstacles: { 1: 0.2, 2: 0.5, 3: 0.3 } }, hard: { obstacles: { 1: 0.1, 2: 0.45, 3: 0.45 } } } },
  items5ess: deep(per("items", 4, 5, 5), { labels: { easy: { essentials: [1, 2] }, standard: { essentials: [2] }, hard: { essentials: [2, 3] } } }),
  hardMob12: { labels: { hard: { finalMob: 12 } } },
  leadFinal1: { lead: { finalStart: 1 } },
  escape5: { lead: { finalEscape: 5 } },
  A: deep(per("items", 4, 5, 5), { lead: { finalStart: 1 } }),
  B: deep(per("items", 4, 5, 5), { lead: { finalStart: 1 } }, { labels: { standard: { limit: 12 } } }),
  C: deep(per("items", 4, 5, 5), { lead: { finalStart: 1 } }, { labels: { standard: { essentials: [2] } } }),
  E: deep(per("items", 4, 5, 5), { labels: { hard: { limit: 13 } } }),
  F: deep(per("items", 4, 5, 5), { labels: { hard: { limit: 12 } } }),
  G: deep(per("items", 4, 5, 5), { labels: { hard: { witnessed: 0.7 } } }),
  H: deep(per("items", 4, 5, 5), { labels: { hard: { limit: 13, exit: 10 } } }),
  I: deep(per("items", 4, 5, 5), { lead: { finalEscape: 7 } }),
  J: deep(per("items", 4, 5, 5), { labels: { standard: { limit: 12 }, hard: { limit: 13 } } }),
  K: deep(per("items", 4, 5, 5), { labels: { standard: { witnessed: 0.55 }, hard: { limit: 13 } } }),
  L: deep(per("items", 4, 5, 5), { labels: { standard: { limit: 12 }, hard: { limit: 14, exit: 10 } } }),
  M: deep(per("items", 4, 5, 5), { labels: { standard: { limit: 12 }, hard: { limit: 15, exit: 10 } } }),
  D: deep(per("items", 4, 5, 5), { lead: { finalStart: 1 } }, { labels: { easy: { limit: 11 }, standard: { limit: 12 } } }),
};

if (process.argv[1]?.endsWith("balance-pass.mjs")) await main();
async function main() {
const runs = Number(process.argv[2] ?? 800);
const names = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(CANDIDATES);
const pct = (x) => `${(100 * x).toFixed(1)}`;
const ok = (x, [lo, hi]) => (x >= lo && x <= hi ? "" : "*");
console.log(`runs per label × size: ${runs}; * = outside target`);
console.log("package".padEnd(16), "win E/S/H".padEnd(24), "forked E/S/H".padEnd(22), "Hard 3/4/5".padEnd(20), "capsH trouble");
for (const n of names) {
  const M = metrics(runConfig({ params: defaults(), numbers: mergeNumbers(NUMBERS, CANDIDATES[n]), runs }));
  const w = LABELS.map((l) => pct(M.byLabel[l].win) + ok(M.byLabel[l].win, TARGETS.win[l])).join(" / ");
  const f = LABELS.map((l) => pct(M.byLabel[l].forked) + ok(M.byLabel[l].forked, TARGETS.forked[l])).join(" / ");
  const hs = [3, 4, 5].map((s) => pct(M.bySize.hard[s].win)).join(" / ");
  console.log(n.padEnd(16), w.padEnd(24), f.padEnd(22), hs.padEnd(20), M.byLabel.hard.captures.toFixed(2), pct(M.rolls.trouble));
}
}
