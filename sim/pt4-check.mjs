/**
 * PT4 questions (2026-10-06): candidate fixes for the full-book playtest's
 * major findings, on the same raids. Reports wins, forked, the final flight's
 * length and forked rate, local chases and Hard captures.
 *   node sim/pt4-check.mjs [runs] [variants…]
 */
import { runConfig, metrics, mergeNumbers, LABELS } from "./run.mjs";
import { defaults, NUMBERS } from "./params.mjs";

const V = {
  now: [{}, {}],
  overdrawOnce: [{ overdrawAtLimit: "once" }, {}],
  overdrawFury: [{ overdrawAtLimit: "fury" }, {}],
  escape5: [{}, { lead: { finalEscape: 5 } }],
  closeIn6: [{}, { finalCloseIn: 6 }],
  closeIn4: [{}, { finalCloseIn: 4 }],
  localBase8: [{}, { localMob: { base: 8 } }],
  localStart2: [{}, { lead: { localStart: 2 } }],
  localPer3: [{}, { localMob: { perSuspicion: 1 / 3 } }],
  A_esc5_local8: [{ overdrawAtLimit: "once" }, { lead: { finalEscape: 5 }, localMob: { base: 8 } }],
  B_esc5_local8_start1: [{ overdrawAtLimit: "once" }, { lead: { finalEscape: 5, finalStart: 1 }, localMob: { base: 8 } }],
  C_esc5_local8_lim11: [{ overdrawAtLimit: "once" }, { lead: { finalEscape: 5 }, localMob: { base: 8 }, labels: { standard: { limit: 11 } } }],
  E: [{ overdrawAtLimit: "once" }, { lead: { finalEscape: 5 }, localMob: { base: 8 }, labels: { standard: { limit: 11 }, hard: { finalStart: 1 } } }],
  F: [{ overdrawAtLimit: "once" }, { lead: { finalEscape: 5 }, localMob: { base: 8 }, labels: { easy: { limit: 11 }, standard: { limit: 11 }, hard: { finalStart: 1 } } }],
  G: [{ overdrawAtLimit: "once" }, { lead: { finalEscape: 5 }, localMob: { base: 8 }, labels: { easy: { limit: 11 }, standard: { limit: 11 }, hard: { finalEscape: 6 } } }],
  D_esc5_local9: [{ overdrawAtLimit: "once" }, { lead: { finalEscape: 5 }, localMob: { base: 9 } }],
};
export const VARIANTS = V;

const runs = Number(process.argv[2] ?? 1000);
const names = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(V);
const p = (x) => (100 * x).toFixed(1);
console.log(`${runs} raids per label and party size`);
console.log("variant".padEnd(14), "win E/S/H".padEnd(20), "forked E/S/H".padEnd(18), "flight: rounds, forked/flight S·H".padEnd(36), "local: capture rate, capsH");
for (const n of names) {
  const [params, numbers] = V[n];
  const R = runConfig({ params: { ...defaults(), ...params }, numbers: mergeNumbers(NUMBERS, numbers), runs });
  const M = metrics(R);
  const fl = {};
  for (const L of ["standard", "hard"]) {
    const R2 = runConfig({ params: { ...defaults(), ...params }, numbers: mergeNumbers(NUMBERS, numbers), runs: Math.round(runs / 2), labels: [L] });
    const g = (k) => R2.rec.counts?.get?.(k) ?? R2.rec.counts?.[k] ?? 0;
    const esc = g("final flight escaped"), fk = g("forked"), rd = g("final flight rounds");
    fl[L] = `${(rd / Math.max(1, esc + fk)).toFixed(1)}r ${p(fk / Math.max(1, esc + fk))}%`;
  }
  const g = (k) => R.rec.counts?.get?.(k) ?? R.rec.counts?.[k] ?? 0;
  const caps = g("captures"), localChases = g("local chase started") || g("local chases") || g("local chase");
  console.log(n.padEnd(14), LABELS.map((l) => p(M.byLabel[l].win)).join("/").padEnd(20), LABELS.map((l) => p(M.byLabel[l].forked)).join("/").padEnd(18), `S ${fl.standard} · H ${fl.hard}`.padEnd(36), `${localChases ? p(caps / localChases) + "%" : "?"} ${M.byLabel.hard.captures.toFixed(2)}`);
}
