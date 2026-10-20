/**
 * The outside review's rule package (DESIGN 2026-10-19: D1 one chase, one rise; D2 giving up; D3 overdraw on top;
 * D6b any ability as a raise in the final flight; D7b everyone held means Forked; and Richard's calls of 2026-10-20:
 * R1 a roll's result before its Suspicion, R4 one way-out try a Turn, D4 Spectral as the book has it) against the rules
 * before it, on the same raids (common random numbers), with the 10-Turn night tried for Easy and Standard (D5b).
 *
 *   node sim/review-check.mjs [raids per label and party size] [--seed n] [--out file.md] [--only name,name] [--jobs 4]
 *
 * Each configuration runs in its own process (up to --jobs at once); the report goes to stdout (and --out).
 * Every configuration is played on the Limits the package was tested with, 11 / 11 / 15 (OLD_LIMITS), as it was
 * measured before F12 made 9 / 10 / 13 the default; the F configurations set their own (F12 = today's defaults).
 */
import { writeFileSync, readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { runConfig, metrics, mergeNumbers, LABELS, SIZES } from "./run.mjs";
import { defaults, NUMBERS, TARGETS, BEFORE_REVIEW, OLD_LIMITS, TEN_TURNS } from "./params.mjs";
import { PREMADE, simTown } from "./premade.mjs";
import { HALLOWBY } from "./demo-check.mjs";

const B = BEFORE_REVIEW;
const LIMITS = { labels: { easy: { limit: 9 }, standard: { limit: 10 }, hard: { limit: 13 } } };
/** name → [title, params over the defaults (the package), numbers over NUMBERS, extra runs] */
export const CONFIGS = {
  V0: ["The rules before the review", { ...B }, {}, ["targets"]],
  P12: ["The package, 12 Turns", {}, {}, ["targets", "towns"]],
  P10: ["The package, 10 Turns on Easy and Standard", {}, TEN_TURNS, ["targets", "towns"]],
  "V0+R1": ["Before, plus R1 (result first)", { ...B, limitOrder: "result" }, {}, []],
  "V0+D4": ["Before, plus D4 (Spectral on arrival)", { ...B, spectralWhen: "arrive" }, {}, []],
  "P12-R1": ["The package without R1", { limitOrder: "limit" }, {}, []],
  "P12-D4": ["The package without D4", { spectralWhen: "work" }, {}, []],
  "V0+D1": ["Before, plus D1 (one chase, one rise), nobody gives up", { ...B, chaseRule: "oneRise" }, {}, []],
  "V0+D1D2": ["Before, plus D1 and D2 (giving up)", { ...B, chaseRule: "oneRise", giveUp: "odds" }, {}, []],
  "V0+D3": ["Before, plus D3 (overdraw on top)", { ...B, overdrawStack: "stack" }, {}, []],
  "V0+D6b": ["Before, plus D6b (any ability as a raise in the flight)", { ...B, flightRaise: "any" }, {}, []],
  "V0+D7b": ["Before, plus D7b (everyone held is Forked)", { ...B, allHeld: "forked" }, {}, []],
  "P12-D1": ["The package without D1 (and so without D2)", { chaseRule: "perRoll" }, {}, []],
  "P12-D2": ["The package, nobody gives up", { giveUp: "never" }, {}, []],
  "P12-D2s": ["The package, giving up by the review's simple rule", { giveUp: "simple" }, {}, []],
  "P12-D3": ["The package without D3", { overdrawStack: "merge" }, {}, []],
  "P12-D6b": ["The package without D6b", { flightRaise: "raiseOnly" }, {}, []],
  "P12-D7b": ["The package without D7b", { allHeld: "continue" }, {}, []],
  // Number fixes proposed for the misses: the Limits brought down to what one-rise chases now add (F12, adopted
  // 2026-10-20), and the local chase's Lead-2 fallback (D6) for Hard captures (not taken).
  F12: ["P12 with Limits 9 / 10 / 13 (Easy / Standard / Hard; adopted 2026-10-20, today's defaults)", {}, LIMITS, ["targets", "towns"]],
  "F12+L2": ["F12, and local chases start at Lead 2 and escape at 5 (the D6 fallback)", {}, { ...LIMITS, lead: { localStart: 2, localEscape: 5 } }, ["targets", "towns"]],
  F10: ["P10 with Easy Limit 8, Standard final mob 12, Hard Limit 13", {}, { labels: { easy: { turns: 10, limit: 8 }, standard: { turns: 10, finalMob: 12 }, hard: { limit: 13 } } }, ["towns"]],
};

const TOWNS = () => [...PREMADE, HALLOWBY];

/** Everything the report needs from a set of raids. */
export function cellStats(raids) {
  const n = raids.length || 1;
  const sum = (f) => raids.reduce((a, r) => a + f(r), 0);
  const share = (f) => raids.filter(f).length / n;
  const flights = raids.filter((r) => r.flightRounds > 0);
  const exits = raids.filter((r) => !r.finalTrigger);
  const st = (k) => sum((r) => r.st[k]);
  return {
    n: raids.length,
    win: share((r) => r.win), grand: share((r) => r.result === "grand"), forked: share((r) => r.forked), held: share((r) => r.held),
    partial: share((r) => r.result === "partial"), bust: share((r) => r.result === "bust"),
    limit: share((r) => r.finalTrigger === "limit"), dawn: share((r) => r.finalTrigger === "dawn"),
    captures: sum((r) => r.captures) / n, rescues: st("rescues") / n, slips: st("slips") / n, left: sum((r) => r.leftBehind) / n,
    leaveTurn: exits.length ? exits.reduce((a, r) => a + r.turnsUsed, 0) / exits.length : NaN, turns: sum((r) => r.turnsUsed) / n,
    susp: sum((r) => r.susp) / n,
    chases: sum((r) => r.chases) / n,
    solo: st("solo"), soloEsc: st("soloEscaped"), soloCap: st("soloCaptured"), soloRise: st("soloRise"),
    shared: st("shared"), sharedEsc: st("sharedEscaped"), sharedCap: st("sharedCaptured"), sharedRise: st("sharedRise"),
    chaseHunt: st("chaseHunt"), giveUps: st("giveUps") / n, giveUpsShared: st("giveUpsShared") / n,
    flights: flights.length / n, flightForked: flights.filter((r) => r.forked && !r.held).length / (flights.length || 1),
    flightRounds: flights.length ? flights.reduce((a, r) => a + r.flightRounds, 0) / flights.length : NaN,
    flightCharges: flights.length ? flights.reduce((a, r) => a + r.st.charges.final, 0) / flights.length : NaN,
    flightOverdraws: flights.length ? flights.reduce((a, r) => a + r.st.overdraws.final, 0) / flights.length : NaN,
    od: Object.fromEntries(["raid", "slip", "local", "final"].map((p) => [p, sum((r) => r.st.overdraws[p]) / n])),
    ch: Object.fromEntries(["raid", "slip", "local", "final"].map((p) => [p, sum((r) => r.st.charges[p]) / n])),
    r1: Object.fromEntries(["exit", "lockup", "loot"].map((k) => [k, sum((r) => r.st.resultFirst[k]) / n])),
    spectral: st("spectralArrive") / n, spectralLoot: st("spectralLoot") / n,
  };
}

function runOne(name, runs, seed) {
  const [title, params, numbers, extra] = CONFIGS[name];
  const P = { ...defaults(), ...params };
  const N = mergeNumbers(mergeNumbers(NUMBERS, OLD_LIMITS), numbers);
  const R = runConfig({ params: P, numbers: N, runs, seed });
  const out = { name, title, runs, seed, cells: {}, labels: {} };
  for (const L of LABELS) {
    const xs = R.raids.filter((r) => r.label === L);
    out.labels[L] = cellStats(xs);
    for (const s of SIZES) out.cells[`${L}|${s}`] = cellStats(xs.filter((r) => r.size === s));
  }
  if (extra.includes("targets")) {
    const never = runConfig({ params: { ...P, furniturePolicy: "never" }, numbers: N, runs, seed });
    const M = metrics(R, never);
    const A = metrics(runConfig({ params: { ...P, furniturePolicy: "always" }, numbers: N, runs, seed }), never);
    out.M = { rolls: M.rolls, spendHalf: M.spendHalf, furniture: M.furniture, outliers: M.outliers, always: A.furniture };
  } else {
    const M = metrics(R);
    out.M = { rolls: M.rolls, spendHalf: M.spendHalf, outliers: M.outliers };
  }
  if (extra.includes("towns") || name === "V0") {
    out.towns = {};
    for (const t of TOWNS()) {
      const T = runConfig({ params: P, numbers: N, runs, seed, labels: [t.label], townFn: () => simTown(t, N) });
      out.towns[t.key] = { name: t.name, label: t.label, all: cellStats(T.raids), bySize: Object.fromEntries(SIZES.map((s) => [s, cellStats(T.raids.filter((r) => r.size === s))])) };
    }
  }
  return out;
}

// ---------------------------------------------------------------- report

const pct = (x, d = 1) => (Number.isFinite(x) ? `${(100 * x).toFixed(d)}%` : "—");
const num = (x, d = 2) => (Number.isFinite(x) ? x.toFixed(d) : "—");
const inBand = (x, [lo, hi]) => x >= lo && x <= hi;
const tick = (ok) => (ok ? "" : " ✗");
const table = (head, rows) => [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

export function report(res, { runs, seed }) {
  const L = [];
  const main = ["V0", "P12", "P10"].filter((k) => res[k]);
  L.push(`Command: \`node sim/review-check.mjs ${runs} --seed ${seed}\`. ${runs.toLocaleString("en-GB")} raids per label and party size (3, 4 and 5 Entities), the same parties, towns and dice streams in every configuration. V0 = the rules before the review; P12 = the package with 12 Turns; P10 = the package with 10 Turns on Easy and Standard (Hard stays 12, so its numbers are P12's). ✗ = outside the target.`, "");

  // targets
  if (main.every((k) => res[k].M.always)) {
    L.push("### Against the targets", "");
    const T = TARGETS;
    const rows = [];
    for (const l of LABELS) rows.push([`Win, ${l}`, `${pct(T.win[l][0], 0)}–${pct(T.win[l][1], 0)}`, ...main.map((k) => pct(res[k].labels[l].win) + tick(inBand(res[k].labels[l].win, T.win[l])))]);
    for (const l of LABELS) rows.push([`Forked, ${l}`, `${pct(T.forked[l][0], 0)}–${pct(T.forked[l][1], 0)}`, ...main.map((k) => pct(res[k].labels[l].forked) + tick(inBand(res[k].labels[l].forked, T.forked[l])))]);
    rows.push(["Captures per Hard raid", "0.2–0.3 (accepted ~0.34)", ...main.map((k) => num(res[k].labels.hard.captures) + tick(inBand(res[k].labels.hard.captures, T.hardCaptures)))]);
    rows.push(["Grand Year when a party always goes for furniture", "~50%", ...main.map((k) => pct(res[k].M.always.grandGivenWent) + tick(Math.abs(res[k].M.always.grandGivenWent - 0.5) <= 0.1))]);
    rows.push(["Going for furniture costs the Win (always)", "~20%", ...main.map((k) => pct(res[k].M.always.dropBelowWin) + tick(Math.abs(res[k].M.always.dropBelowWin - 0.2) <= 0.07))]);
    rows.push(["Trouble, share of rolls", "10–22%", ...main.map((k) => pct(res[k].M.rolls.trouble) + tick(inBand(res[k].M.rolls.trouble, T.trouble)))]);
    rows.push(["Criticals, share of rolls", "3–7%", ...main.map((k) => pct(res[k].M.rolls.critDoubles) + tick(inBand(res[k].M.rolls.critDoubles, T.critical)))]);
    rows.push(["Entities spending ≥ half their charges", "≥ 50%", ...main.map((k) => pct(res[k].M.spendHalf) + tick(res[k].M.spendHalf >= T.spendHalf))]);
    rows.push(["Mask, share of rolls where you choose", "≥ 25% (and Monster ≥ 25%)", ...main.map((k) => pct(res[k].M.rolls.maskChoice) + tick(res[k].M.rolls.maskChoice >= T.mask && 1 - res[k].M.rolls.maskChoice >= T.monster))]);
    const ents = (k) => res[k].M.outliers.filter((o) => o.what.startsWith("entity") && Number.isFinite(o.delta));
    rows.push(["Entities, spread (lowest to highest)", "within ±2.5 pts", ...main.map((k) => { const e = ents(k).map((o) => o.delta); if (!e.length) return "—"; return `${(100 * Math.min(...e)).toFixed(1)} to +${(100 * Math.max(...e)).toFixed(1)}` + tick(e.every((d) => Math.abs(d) <= T.outlier)); })]);
    const worst = (k) => res[k].M.outliers.filter((o) => Number.isFinite(o.delta)).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))[0];
    rows.push(["Largest option outlier (any Entity, Gift, Perk or Duty)", "within ±2.5 pts", ...main.map((k) => { const w = worst(k); if (!w) return "—"; return `${w.what.replace(/^(entity|gift|perk|duty) /, "")} ${(100 * w.delta).toFixed(1)}` + tick(Math.abs(w.delta) <= T.outlier); })]);
    L.push(table(["Measure", "Target", ...main], rows), "");
  }

  // by label and size
  L.push("### By label and party size (per raid)", "");
  const rows = [];
  for (const l of LABELS) for (const s of SIZES) for (const k of main) {
    if (k === "P10" && l === "hard") continue;
    const c = res[k].cells[`${l}|${s}`];
    rows.push([l, s, k, pct(c.win), pct(c.grand), pct(c.forked), pct(c.held), pct(c.limit), pct(c.dawn), num(c.captures), num(c.rescues), num(c.left), num(c.leaveTurn, 1)]);
  }
  L.push(table(["Label", "Entities", "Rules", "Win (incl. Grand)", "Grand Year", "Forked", "of which everyone held (D7b)", "Limit hit", "Dawn flight", "Captures", "Rescues", "Left behind", "Turn the party leaves (mean)"], rows), "");
  L.push("Rescues count each captive freed by a rescue. \"Turn the party leaves\" averages the raids that ended by the way out.", "");

  // chases
  L.push("### Local chases", "");
  const crow = [];
  for (const l of LABELS) for (const k of main) {
    if (k === "P10" && l === "hard") continue;
    const c = res[k].labels[l];
    const all = c.solo + c.shared;
    crow.push([l, k, num(c.chases), num((c.soloRise + c.sharedRise) / (all || 1)), num(c.soloRise / (c.solo || 1)), num(c.sharedRise / (c.shared || 1)),
      pct(c.soloEsc / (c.solo || 1)), pct(c.soloCap / (c.solo || 1)), pct(c.sharedEsc / (c.shared || 1)), pct(c.sharedCap / (c.shared || 1)), pct(c.chaseHunt / (all || 1)), num(c.giveUps, 3), num(c.giveUpsShared, 3)]);
  }
  L.push(table(["Label", "Rules", "Chases per raid", "Suspicion added per chase", "solo", "shared", "Solo: escaped", "Solo: captured", "Shared: escaped", "Shared: someone captured", "Chase's rise brought the hunt (D1)", "Give-ups per raid, solo", "in shared chases"], crow), "");
  L.push("A chase that neither escaped nor ended in a capture was ended by the Limit mid-chase (before D1) or cornered a Ghost with Already Dead. Suspicion added is what the chase itself added, the Trouble that started it not included.", "");

  // flights and overdraws
  L.push("### Final flights, overdraws and charges", "");
  const frow = [];
  for (const l of LABELS) for (const k of main) {
    if (k === "P10" && l === "hard") continue;
    const c = res[k].labels[l];
    frow.push([l, k, pct(c.flights), pct(c.flightForked), num(c.flightRounds, 1), num(c.flightCharges), num(c.flightOverdraws), num(c.od.raid + c.od.slip + c.od.local + c.od.final, 3), `${num(c.od.raid, 3)} · ${num(c.od.local, 3)} · ${num(c.od.slip, 3)} · ${num(c.od.final, 3)}`]);
  }
  L.push(table(["Label", "Rules", "Final flights per raid", "Forked per flight", "Rounds per flight (mean)", "Charges spent per flight", "Overdraws per flight", "Overdraws per raid", "at obstacles · in local chases · slipping free · in the flight"], frow), "");

  // pieces
  const pieces = Object.keys(res).filter((k) => !main.includes(k));
  if (pieces.length) {
    L.push("### Each piece on its own (added to V0) and taken out of P12", "");
    const prow = [];
    for (const k of ["V0", ...pieces.filter((x) => x.startsWith("V0")), "P12", ...pieces.filter((x) => x.startsWith("P12"))]) {
      if (!res[k]) continue;
      const c = res[k].labels;
      prow.push([k, CONFIGS[k][0], ...LABELS.map((l) => pct(c[l].win)), ...LABELS.map((l) => pct(c[l].forked)), num(c.hard.captures), LABELS.map((l) => pct(c[l].limit, 0)).join(" · "), num(LABELS.reduce((a, l) => a + c[l].giveUps + c[l].giveUpsShared, 0) / 3, 3)]);
    }
    L.push(table(["", "Rules", "Win E", "Win S", "Win H", "Forked E", "Forked S", "Forked H", "Hard captures", "Limit hit E · S · H", "Give-ups per raid"], prow), "");
  }

  // number fixes
  const fixes = ["P12", "P10", ...Object.keys(res).filter((k) => /^F/.test(k))].filter((k) => res[k]);
  if (fixes.length > 2) {
    L.push("### Number fixes for the misses (F12 adopted 2026-10-20; F12+L2 and F10 not)", "");
    const T = TARGETS;
    const town = (k, key) => { const t = res[k].towns?.[key]; return t ? `${pct(t.all.win)} / ${pct(t.all.forked)}${tick(inBand(t.all.win, T.win[t.label]) && inBand(t.all.forked, T.forked[t.label]))}` : "—"; };
    const xrow = fixes.map((k) => { const c = res[k].labels; return [k, CONFIGS[k][0], ...LABELS.map((l) => `${pct(c[l].win)} / ${pct(c[l].forked)}${tick(inBand(c[l].win, T.win[l]) && inBand(c[l].forked, T.forked[l]))}`), num(c.hard.captures),
      SIZES.map((s) => pct(res[k].cells[`hard|${s}`].win, 0)).join(" · "), town(k, "puddlecombe"), town(k, "thistlewick"), town(k, "gallowsmere"), town(k, "hallowby")]; });
    L.push(table(["", "Rules", "Easy win / forked", "Standard", "Hard", "Hard captures", "Hard win, 3 · 4 · 5", "Puddlecombe", "Thistlewick", "Gallowsmere", "Hallowby"], xrow), "");
    for (const k of fixes.filter((x) => res[x].M.always && /^F/.test(x))) {
      const M = res[k].M, e = M.outliers.filter((o) => o.what.startsWith("entity")).map((o) => o.delta);
      L.push(`${k}: Grand Year when a party always goes for furniture ${pct(M.always.grandGivenWent)}, a Win lost ${pct(M.always.dropBelowWin)}; Trouble ${pct(M.rolls.trouble)}; Criticals ${pct(M.rolls.critDoubles)}; half their charges spent ${pct(M.spendHalf)}; the Mask on ${pct(M.rolls.maskChoice)} of the rolls where there's a choice; Entities ${(100 * Math.min(...e)).toFixed(1)} to +${(100 * Math.max(...e)).toFixed(1)}; give-ups ${LABELS.map((l) => num(res[k].labels[l].giveUps + res[k].labels[l].giveUpsShared, 3)).join(" / ")} per raid; captures ${LABELS.map((l) => num(res[k].labels[l].captures)).join(" / ")}; left behind ${LABELS.map((l) => num(res[k].labels[l].left)).join(" / ")}.`, "");
    }
  }

  // R1 and D4 in detail
  const r1d4 = ["V0", "V0+R1", "V0+D4", "P12", "P12-R1", "P12-D4"].filter((k) => res[k]);
  if (r1d4.length > 2) {
    L.push("### R1 and D4 in detail (per 1,000 raids)", "");
    const ghost = (k) => res[k].M.outliers.find((o) => o.what === "entity A Ghost")?.delta;
    const spectral = (k) => res[k].M.outliers.find((o) => o.what === "perk A Ghost:spectral")?.delta;
    const rrow = r1d4.map((k) => [k, ...LABELS.map((l) => `${(1000 * res[k].labels[l].r1.exit).toFixed(1)} · ${(1000 * res[k].labels[l].r1.lockup).toFixed(1)} · ${(1000 * res[k].labels[l].r1.loot).toFixed(1)}`),
      ...LABELS.map((l) => `${(1000 * res[k].labels[l].spectral).toFixed(0)} · ${(1000 * res[k].labels[l].spectralLoot).toFixed(0)}`), Number.isFinite(ghost(k)) ? (100 * ghost(k)).toFixed(1) : "—", Number.isFinite(spectral(k)) ? (100 * spectral(k)).toFixed(1) : "—"]);
    L.push(table(["", "R1 Easy: out · rescued · loot", "R1 Standard", "R1 Hard", "D4 Easy: passes with no action · loot at once", "D4 Standard", "D4 Hard", "A Ghost (win pts)", "Spectral against her other Perks (pts)"], rrow), "");
  }

  // entities
  if (res.P12) {
    L.push("### Entity spread under the package (win points, parties with vs without, same label and size)", "");
    const e = (k) => Object.fromEntries(res[k].M.outliers.filter((o) => o.what.startsWith("entity")).map((o) => [o.what.slice(7), o.delta]));
    const cols = ["V0", "P12", "P10"].filter((k) => res[k]);
    const names = Object.keys(e("P12"));
    L.push(table(["Entity", ...cols], names.map((nm) => [nm, ...cols.map((k) => { const d = e(k)[nm]; return `${d >= 0 ? "+" : ""}${(100 * d).toFixed(1)}`; })])), "");
    const opts = res.P12.M.outliers.filter((o) => !o.what.startsWith("entity") && Number.isFinite(o.delta)).sort((a, b) => a.delta - b.delta);
    L.push(`Gifts, Perks and Duties under P12, lowest to highest: ${opts.slice(0, 4).map((o) => `${o.what} ${(100 * o.delta).toFixed(1)}`).join(", ")} … ${opts.slice(-4).map((o) => `${o.what} +${(100 * o.delta).toFixed(1)}`).join(", ")}.`, "");
  }

  // towns
  if (main.some((k) => res[k].towns)) {
    L.push("### The ready-made towns and the one-shot's Hallowby", "");
    const trow = [];
    for (const key of Object.keys((res.P12 ?? res.V0).towns)) for (const k of main) {
      const t = res[k].towns?.[key];
      if (!t) continue;
      if (k === "P10" && t.label === "hard") continue;
      const a = t.all;
      trow.push([`${t.name} (${t.label})`, k, pct(a.win) + tick(inBand(a.win, TARGETS.win[t.label])), pct(a.forked) + tick(inBand(a.forked, TARGETS.forked[t.label])), SIZES.map((s) => pct(t.bySize[s].win, 0)).join(" · "), pct(a.grand), num(a.captures), num(a.left), pct(a.limit), pct(a.dawn), num(a.chases), num(a.leaveTurn, 1)]);
    }
    L.push(table(["Town", "Rules", "Win", "Forked", "Win with 3 · 4 · 5", "Grand Year", "Captures", "Left behind", "Limit hit", "Dawn flight", "Chases per raid", "Turn the party leaves"], trow), "");
    L.push("Gallowsmere is Hard, so P10 doesn't change it. Hallowby is checked against the Easy targets.", "");
  }
  return L.join("\n");
}

// ---------------------------------------------------------------- CLI

const here = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === here) {
  const args = process.argv.slice(2);
  const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : d; };
  const seed = Number(opt("--seed", 1));
  const one = opt("--one", null), json = opt("--json", null);
  const out = opt("--out", null), only = opt("--only", null), jobs = Number(opt("--jobs", 4));
  const runs = Number(args[0] ?? 3000);
  if (one) {
    writeFileSync(json, JSON.stringify(runOne(one, runs, seed)));
  } else {
    const names = only ? only.split(",") : Object.keys(CONFIGS);
    const dir = mkdtempSync(join(tmpdir(), "review-"));
    const res = {};
    const queue = [...names];
    const work = async () => {
      while (queue.length) {
        const nm = queue.shift();
        const file = join(dir, `${nm.replace(/[^A-Za-z0-9]/g, "_")}.json`);
        await new Promise((ok, bad) => spawn(process.execPath, [here, String(runs), "--seed", String(seed), "--one", nm, "--json", file], { stdio: "inherit" }).on("exit", (c) => (c ? bad(new Error(`${nm} failed`)) : ok())));
        res[nm] = JSON.parse(readFileSync(file, "utf8"));
        console.error(`done ${nm}`);
      }
    };
    await Promise.all([...Array(Math.min(jobs, names.length))].map(work));
    const text = report(res, { runs, seed });
    if (out) writeFileSync(out, text);
    console.log(text);
  }
}
