#!/usr/bin/env node
/**
 * The second outside review's open decisions (docs/reviews/2026-10-20-outside-v0.2/REVIEW.md, Section 1: items 1.1–1.6),
 * measured at today's defaults (the review package of 2026-10-19/20, Limits 9 / 10 / 13, 12 Turns, the Entity tuning of
 * 2026-10-20). A measuring job: nothing here changes the game. Each option is a REVIEW2 switch in sim/params.mjs (off by
 * default, so the defaults and test/sim.test.mjs are unchanged) or a NUMBERS override. Report: sim/REVIEW2-2026-10-21.md.
 *
 *   node sim/review2-check.mjs [--runs 2000] [--town-runs 3000] [--ghost-runs 4000] [--seeds 1,7,11] [--jobs 4]
 *                              [--only base,G1,…] [--save results.json] [--out sim/REVIEW2-2026-10-21.md]
 *   node sim/review2-check.mjs --from results.json[,more.json] [--chases-from chases.json] --out sim/REVIEW2-2026-10-21.md
 *   node sim/review2-check.mjs --chases [--chase-runs 3000] [--save chases.json]      # lone and shared chases on their own
 *
 * Every configuration plays the same parties, towns and dice streams as the baseline on each seed (common random numbers;
 * a party-size option plays sizes 3 and 4 as the baseline and changes only the 5-Entity raids). Three kinds of run:
 *  - rolled: rolled towns, Easy / Standard / Hard, parties of 3, 4 and 5 (--runs raids per label and party size);
 *  - towns: Puddlecombe, Thistlewick, Gallowsmere and the one-shot's Hallowby, parties of 3, 4 and 5 (--town-runs each);
 *  - ghost: a Ghost with Spectral in every party of 4 (the others random), rolled towns (--ghost-runs per label) and each
 *    town (--town-runs), for the Spectral options (item 1.1).
 */
import { writeFileSync, readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { runConfig, metrics, mergeNumbers, LABELS, SIZES } from "./run.mjs";
import { defaults, NUMBERS, TARGETS } from "./params.mjs";
import { PREMADE, simTown } from "./premade.mjs";
import { HALLOWBY } from "./demo-check.mjs";
import { Recorder } from "./recorder.mjs";
import { makeRng } from "./rng.mjs";
import { makeParty, ROSTERS } from "./entities.mjs";

const ROSTER = ROSTERS.approved; // the book's eight (entities.mjs ROSTER is the old placeholder set)
import { makeTown } from "./town.mjs";
import { internals as E } from "./engine.mjs";

const TOWNS = [...PREMADE, HALLOWBY];
const STEER = { ghostHandOff: "handSteer" };
/** name → { item, title, p: REVIEW2/params over the defaults, n: NUMBERS over the defaults, n5: NUMBERS for 5-Entity raids only, ghost: run the Ghost tables } */
export const CONFIGS = {
  base: { item: "0", title: "Today's rules and players", p: {}, ghost: true },
  // 1.1 Spectral plus free hand-offs
  G1: { item: "1.1", title: "Trick: the Ghost hands her loot on at once (Spectral stays on)", p: { ghostHandOff: "hand" }, ghost: true },
  G2: { item: "1.1", title: "Trick, generous: hand-offs, and her group heads for group-guarded items", p: { ...STEER }, ghost: true },
  G2a: { item: "1.1", title: "(a) Spectral not on a location's last obstacle, with the generous trick", p: { ...STEER, spectralFix: "notLast" }, ghost: true },
  G2b: { item: "1.1", title: "(b) A Spectral pass never takes the item, with the generous trick", p: { ...STEER, spectralFix: "noItem" }, ghost: true },
  G2c: { item: "1.1", title: "(c) Spectral only on a location's first obstacle, with the generous trick", p: { ...STEER, spectralFix: "firstOnly" }, ghost: true },
  Ga: { item: "1.1", title: "(a) with today's players (no trick)", p: { spectralFix: "notLast" }, ghost: true },
  Gb: { item: "1.1", title: "(b) with today's players", p: { spectralFix: "noItem" }, ghost: true },
  Gc: { item: "1.1", title: "(c) with today's players", p: { spectralFix: "firstOnly" }, ghost: true },
  // 1.2 Overdraws
  D1: { item: "1.2", title: "Trick: a doomed runner overdraws freely (Suspicion past the Limit costs nothing); overdraws unlimited", p: { doomedOverdraw: true } },
  D1o: { item: "1.2", title: "One overdraw per local chase, with the doomed-runner trick", p: { doomedOverdraw: true, localOverdraw: "once" } },
  Do: { item: "1.2", title: "One overdraw per local chase, today's players", p: { localOverdraw: "once" } },
  F1: { item: "1.2", title: "Trick: flight overdraws priced smartly (free when the Weakness comes anyway); today's rule", p: { flightODPrice: "smart" } },
  F1s: { item: "1.2", title: "Flight overdraw = a step down of its own that stacks (not while the Weakness is in play), smart pricing", p: { flightODPrice: "smart", flightOverdraw: "stack" } },
  F1sa: { item: "1.2", title: "Stacking step, allowed while the Weakness is in play too, smart pricing", p: { flightODPrice: "smart", flightOverdraw: "stackAny" } },
  F1r: { item: "1.2", title: "Flight overdraw only in round 1, smart pricing", p: { flightODPrice: "smart", flightOverdraw: "round1" } },
  Fs: { item: "1.2", title: "Stacking step, today's (flat) pricing", p: { flightOverdraw: "stack" } },
  Fr: { item: "1.2", title: "Round 1 only, today's (flat) pricing", p: { flightOverdraw: "round1" } },
  // 1.3 Late-track and long chases
  M3: { item: "1.3", title: "Local mob 8 + ⌊Suspicion / 3⌋ (at most 12)", p: {}, n: { localMob: { div: 3 } } },
  M11: { item: "1.3", title: "Local mob 8 + ⌊Suspicion / 2⌋, at most 11", p: {}, n: { localMob: { max: 11 } } },
  R6: { item: "1.3", title: "After round 6 of a local chase: Lead 2+ escapes, otherwise captured", p: { localRoundCap: 6 } },
  // 1.4 Lock-up
  LK8: { item: "1.4", title: "Lock-up Difficulty 8 on Easy (10 on Standard and Hard)", p: {}, n: { labels: { easy: { lockup: 8 } } } },
  // 1.5 Clocks and party size
  P5L: { item: "1.5", title: "With 5 Entities, the Limit is 1 lower (8 / 9 / 12)", p: {}, n5: { labels: { easy: { limit: 8 }, standard: { limit: 9 }, hard: { limit: 12 } } } },
  P5T: { item: "1.5", title: "With 5 Entities, the night lasts 10 Turns", p: {}, n5: { labels: { easy: { turns: 10 }, standard: { turns: 10 }, hard: { turns: 10 } } } },
  E10: { item: "1.5", title: "Easy Limit 10 (10 / 10 / 13)", p: {}, n: { labels: { easy: { limit: 10 } } } },
  // 1.6 Dead abilities in a local chase
  LR: { item: "1.6", title: "In a local chase, any ability may be spent as a raise on your own roll", p: { localRaise: "any" } },
};

// ---------------------------------------------------------------- one job (a configuration on one seed)

const share = (xs, f) => xs.filter(f).length / (xs.length || 1);
const sumBy = (xs, f) => xs.reduce((a, x) => a + f(x), 0);

/** Counts (not rates), so seeds can be summed. */
function raidCounts(raids) {
  const flights = raids.filter((r) => r.flightRounds > 0);
  const st = (k) => sumBy(raids, (r) => r.st[k] ?? 0);
  return {
    n: raids.length, win: raids.filter((r) => r.win).length, forked: raids.filter((r) => r.forked).length,
    grand: raids.filter((r) => r.result === "grand").length, held: raids.filter((r) => r.held).length,
    captures: sumBy(raids, (r) => r.captures), rescues: st("rescues"), slips: st("slips"), left: sumBy(raids, (r) => r.leftBehind),
    flights: flights.length, flightForked: flights.filter((r) => r.forked && !r.held).length, flightRounds: sumBy(flights, (r) => r.flightRounds),
    limit: raids.filter((r) => r.finalTrigger === "limit").length, dawn: raids.filter((r) => r.finalTrigger === "dawn").length,
    od: Object.fromEntries(["raid", "slip", "local", "final"].map((p) => [p, sumBy(raids, (r) => r.st.overdraws[p])])),
    ch: Object.fromEntries(["raid", "slip", "local", "final"].map((p) => [p, sumBy(raids, (r) => r.st.charges[p])])),
    handOffs: st("ghostHandOffs"), spectral: st("spectralArrive") + st("spectralGroup"), spectralLoot: st("spectralLoot"),
    chases: sumBy(raids, (r) => r.chases), turns: sumBy(raids, (r) => r.turnsUsed), susp: sumBy(raids, (r) => r.susp),
  };
}

/** The local chases' log (review2Stats), as counts. */
function chaseCounts(raids) {
  const log = raids.flatMap((r) => r.st.chaseLog ?? []);
  const solo = log.filter((c) => c.k === "solo"), shared = log.filter((c) => c.k === "shared");
  const bump = (o, k, n = 1) => { o[k] = (o[k] ?? 0) + n; };
  const out = { solo: { n: solo.length, bySusp: {}, rounds: {}, od: {}, byEnt: {}, esc: 0, cap: 0, gaveUp: 0, other: 0, rise: 0, hunt: 0, capped: 0, doomed: 0, doomedBroke: 0, dod: 0, dod2: 0, odMax: 0, rolls: 0, monster: 0 },
    shared: { n: shared.length, c1: 0, rounds: {}, esc: 0, cap: 0, capped: 0, rise: 0 } };
  for (const c of solo) {
    const o = out.solo, b = (o.bySusp[c.s0] ??= { n: 0, esc: 0, cap: 0, gaveUp: 0, rolls: 0, monster: 0, long: 0 });
    b.n++; b.rolls += c.rolls; b.monster += c.monster; if (c.r >= 6) b.long++;
    if (c.out === "esc") { b.esc++; o.esc++; } else if (c.out === "gaveUp") { b.gaveUp++; b.cap++; o.gaveUp++; o.cap++; } else if (c.out === "cap") { b.cap++; o.cap++; } else o.other++;
    bump(o.rounds, Math.min(c.r, 16)); bump(o.od, Math.min(c.od, 4));
    const e = (o.byEnt[c.e] ??= { n: 0, esc: 0, cap: 0 }); e.n++; if (c.out === "esc") e.esc++; else if (c.out !== "other") e.cap++;
    o.rise += c.rise; if (c.hunt) o.hunt++; if (c.capped) o.capped++;
    if (c.doomR > 0) o.doomed++; if (c.doomBroke > 0) o.doomedBroke++; o.dod += c.dod; if (c.dod >= 2) o.dod2++; o.odMax = Math.max(o.odMax, c.od);
    o.rolls += c.rolls; o.monster += c.monster;
  }
  for (const c of shared) {
    const o = out.shared;
    if (c.c1) o.c1++; bump(o.rounds, Math.min(c.r, 16)); if (c.out === "esc") o.esc++; else if (c.out === "cap") o.cap++; if (c.capped) o.capped++; o.rise += c.rise;
  }
  return out;
}

/** Run one configuration's raids for some sizes, each with its own numbers (a 5-Entity option changes only those). */
function play(cfg, P, runs, seed, { labels = LABELS, sizes = SIZES, townFn = null } = {}) {
  const raids = [];
  const rec = new Recorder();
  for (const s of sizes) {
    const N = mergeNumbers(mergeNumbers(NUMBERS, cfg.n ?? {}), s === 5 && cfg.n5 ? cfg.n5 : {});
    const R = runConfig({ params: P, numbers: N, runs, seed, labels, sizes: [s], townFn: townFn ? () => townFn(N) : null });
    raids.push(...R.raids);
    rec.merge(R.rec);
  }
  return { raids, rec };
}

function runJob(name, seed, { runs, townRuns, ghostRuns }) {
  const cfg = CONFIGS[name];
  const P = { ...defaults(), review2Stats: true, tuneStats: true, ...cfg.p };
  const out = { name, seed, runs, townRuns, ghostRuns, labels: {}, cells: {}, chase: {}, ents: {}, towns: {}, ghost: {}, ghostTowns: {} };
  const R = play(cfg, P, runs, seed);
  const M = metrics(R);
  out.rolls = { trouble: M.rolls.trouble, crit: M.rolls.critDoubles, maskChoice: M.rolls.maskChoice, spendHalf: M.spendHalf };
  for (const L of LABELS) {
    const xs = R.raids.filter((r) => r.label === L);
    out.labels[L] = raidCounts(xs);
    out.chase[L] = chaseCounts(xs);
    for (const s of SIZES) out.cells[`${L}|${s}`] = raidCounts(xs.filter((r) => r.size === s));
    const ML = metrics({ raids: xs, rec: R.rec });
    out.ents[L] = Object.fromEntries(ML.outliers.filter((o) => o.what.startsWith("entity") || o.what.startsWith("perk A Ghost")).map((o) => [o.what, o.delta]));
    // a party of 4 that includes a Ghost (any Perk), in the random parties
    out.cells[`${L}|4|ghost`] = raidCounts(xs.filter((r) => r.size === 4 && r.members.some((m) => m.ent.key === "ghost")));
    out.cells[`${L}|4|ghostSpectral`] = raidCounts(xs.filter((r) => r.size === 4 && r.members.some((m) => m.ent.key === "ghost" && m.perk === "spectral")));
  }
  for (const t of TOWNS) {
    const T = play(cfg, P, townRuns, seed, { labels: [t.label], townFn: (N) => simTown(t, N) });
    out.towns[t.key] = { name: t.name, label: t.label, all: raidCounts(T.raids), bySize: Object.fromEntries(SIZES.map((s) => [s, raidCounts(T.raids.filter((r) => r.size === s))])), chase: chaseCounts(T.raids) };
  }
  if (cfg.ghost) {
    const G = { ...P, forceEntity: "ghost", kitOverride: { ghost: { perk: "spectral" } } };
    const RG = play(cfg, G, ghostRuns, seed, { sizes: [4] });
    for (const L of LABELS) out.ghost[L] = raidCounts(RG.raids.filter((r) => r.label === L));
    for (const t of TOWNS) {
      const T = play(cfg, G, townRuns, seed, { labels: [t.label], sizes: [4], townFn: (N) => simTown(t, N) });
      out.ghostTowns[t.key] = raidCounts(T.raids);
    }
  }
  return out;
}

// ---------------------------------------------------------------- lone and shared chases on their own (--chases)

/**
 * One local chase on its own: a random party of 4 (random kits) in a rolled town of the label; the runner (party[0], or
 * party[0..1] for a shared chase) starts with `charges` charges and Suspicion `susp`. Returns the chase's log line.
 */
function oneChase({ label, susp, charges, params, numbers, seed, i, shared = false }) {
  const rng = makeRng(seed, "chase", label, susp, shared ? 2 : 1, i);
  const party = makeParty(rng.fork("party"), 4, numbers.charges, ROSTER, { kit: "random" });
  const town = makeTown(rng.fork("town"), label, numbers);
  const S = E.makeState({ party, town, params, numbers, rng: rng.fork("dice"), rec: new Recorder() });
  S.susp = susp;
  S.turn = 1;
  const runners = shared ? party.slice(0, 2) : [party[0]];
  for (const m of runners) m.charges = charges;
  if (shared) E.groupChase(S, runners);
  else E.localChase(S, runners[0]);
  return S.st.chaseLog[0];
}

export const CHASE_RULES = {
  base: ["Today", {}, {}],
  M3: ["8 + ⌊S/3⌋", {}, { localMob: { div: 3 } }],
  M11: ["cap 11", {}, { localMob: { max: 11 } }],
  R6: ["round-6 cap", { localRoundCap: 6 }, {}],
};
function runChases({ runs, seed }) {
  const res = [];
  for (const label of ["standard", "hard"]) {
    const lim = NUMBERS.labels[label].limit;
    for (const [rk, [, p, n]] of Object.entries(CHASE_RULES)) {
      const numbers = mergeNumbers(NUMBERS, n);
      for (const pol of ["smart", "mask", "monster"]) {
        if (pol !== "smart" && rk === "R6") continue;
        const params = { ...defaults(), review2Stats: true, monsterPolicy: pol, ...p };
        for (let susp = 0; susp < lim; susp++) {
          for (const charges of pol === "smart" ? [3, 0] : [3]) {
            const c = { label, rule: rk, pol, susp, charges, n: 0, esc: 0, cap: 0, gaveUp: 0, long: 0, rounds: 0, hunt: 0 };
            for (let i = 0; i < runs; i++) {
              const x = oneChase({ label, susp, charges, params, numbers, seed, i });
              c.n++; c.rounds += x.r; if (x.r >= 6) c.long++; if (x.hunt) c.hunt++;
              if (x.out === "esc") c.esc++; else if (x.out === "cap" || x.out === "gaveUp") c.cap++; if (x.out === "gaveUp") c.gaveUp++;
            }
            res.push(c);
          }
        }
      }
      // two runners caught by one group check (charges 3), players' choice of die
      const params = { ...defaults(), review2Stats: true, ...p };
      for (const susp of [0, 2, 4, 6, 8, 10, 12].filter((s) => s < lim)) {
        const c = { label, rule: rk, pol: "shared", susp, charges: 3, n: 0, esc: 0, cap: 0, c1: 0, long: 0, rounds: 0 };
        for (let i = 0; i < runs; i++) {
          const x = oneChase({ label, susp, charges: 3, params, numbers, seed, i, shared: true });
          c.n++; c.rounds += x.r; if (x.r >= 6) c.long++; if (x.c1) c.c1++;
          if (x.out === "esc") c.esc++; else if (x.out === "cap") c.cap++;
        }
        res.push(c);
      }
    }
  }
  return res;
}

// ---------------------------------------------------------------- report

const pct = (x, d = 1) => (Number.isFinite(x) ? `${(100 * x).toFixed(d)}%` : "—");
const pp = (x, d = 1) => (Number.isFinite(x) ? `${x >= 0 ? "+" : ""}${(100 * x).toFixed(d)}` : "—");
const num = (x, d = 2) => (Number.isFinite(x) ? x.toFixed(d) : "—");
const inBand = (x, [lo, hi]) => x >= lo - 1e-9 && x <= hi + 1e-9;
const X = (ok) => (ok ? "" : " ✗");
const table = (head, rows) => [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

/** Sum count objects over seeds (numbers add, nested objects recurse, odMax takes the max). */
function addCounts(a, b) {
  if (a === undefined) return structuredClone(b);
  for (const [k, v] of Object.entries(b)) {
    if (typeof v === "number") a[k] = k === "odMax" ? Math.max(a[k] ?? 0, v) : (a[k] ?? 0) + v;
    else if (v && typeof v === "object") a[k] = addCounts(a[k], v);
    else a[k] = v;
  }
  return a;
}

export function report(res, { chases = null } = {}) {
  const seeds = [...new Set(Object.values(res).map((j) => j.seed))].sort((a, b) => a - b);
  const names = Object.keys(CONFIGS).filter((k) => Object.values(res).some((j) => j.name === k));
  const jobs = (nm) => Object.values(res).filter((j) => j.name === nm);
  const any = Object.values(res)[0];
  // summed over seeds
  const S = {};
  for (const nm of names) {
    const o = {};
    for (const j of jobs(nm)) {
      for (const k of ["labels", "cells", "chase", "towns", "ghost", "ghostTowns"]) o[k] = addCounts(o[k], j[k]);
    }
    o.ents = {};
    for (const L of LABELS) {
      o.ents[L] = {};
      for (const j of jobs(nm)) for (const [w, d] of Object.entries(j.ents[L])) if (Number.isFinite(d)) (o.ents[L][w] ??= []).push(d); // NaN (too few raids) arrives as null
      for (const w of Object.keys(o.ents[L])) o.ents[L][w] = o.ents[L][w].reduce((a, b) => a + b, 0) / o.ents[L][w].length;
    }
    o.rolls = {};
    for (const k of Object.keys(jobs(nm)[0].rolls)) o.rolls[k] = jobs(nm).reduce((a, j) => a + j.rolls[k], 0) / jobs(nm).length;
    o.perSeed = Object.fromEntries(jobs(nm).map((j) => [j.seed, j]));
    S[nm] = o;
  }
  const rate = (c, k) => c[k] / (c.n || 1);
  const wf = (c, L) => `${pct(rate(c, "win"))} / ${pct(rate(c, "forked"))}${X(inBand(rate(c, "win"), TARGETS.win[L]) && inBand(rate(c, "forked"), TARGETS.forked[L]))}`;
  const wfPlain = (c) => `${pct(rate(c, "win"))} / ${pct(rate(c, "forked"))}`;
  const seedRange = (nm, f) => { const xs = seeds.map((s) => S[nm].perSeed[s]).filter(Boolean).map(f); return `${(100 * Math.min(...xs)).toFixed(1)}–${(100 * Math.max(...xs)).toFixed(1)}`; };
  const L = [];
  const rr = any.runs, tr = any.townRuns, gr = any.ghostRuns;
  L.push("# The second outside review's open decisions, simulated (2026-10-21)", "");
  L.push(`Measured for \`docs/reviews/2026-10-20-outside-v0.2/REVIEW.md\` Section 1 (items 1.1–1.6). A measuring job: nothing in the game changed. Every option is a switch in \`sim/params.mjs\` REVIEW2 (off by default) or a NUMBERS override; the defaults and \`test/sim.test.mjs\` are unchanged.`, "");
  L.push("**Baseline (\"today\"):** the rules as decided through 2026-10-20: the review package (D1–D7, R1, R4, D4), Limits 9 / 10 / 13, 12 Turns, the Entity tuning (Wall-Crawler's raise, the new defaults, Thistlewick's strongbox 10), random kits (each Entity's Gift and Perk at random, the standard the targets were set on).", "");
  L.push(`**Runs:** seeds ${seeds.join(", ")}; per seed ${rr.toLocaleString("en-GB")} rolled-town raids per label and party size (3, 4, 5), ${tr.toLocaleString("en-GB")} raids per party size in each town (Puddlecombe, Thistlewick, Gallowsmere, Hallowby), and for the Spectral options ${gr.toLocaleString("en-GB")} raids per label with a Ghost (Spectral) in a party of 4, plus ${tr.toLocaleString("en-GB")} per town. Every option plays the same parties, towns and dice streams as the baseline (common random numbers). Figures are the ${seeds.length} seeds pooled (${(3 * rr * seeds.length).toLocaleString("en-GB")} rolled raids per label) unless a seed range is shown. ✗ = outside the target.`, "");
  L.push("```", `node sim/review2-check.mjs --runs ${rr} --town-runs ${tr} --ghost-runs ${gr} --seeds ${seeds.join(",")} --save review2.json --out sim/REVIEW2-2026-10-21.md`, `node sim/review2-check.mjs --chases --chase-runs ${chases ? chases.runs : 3000} --save chases.json`, `node sim/review2-check.mjs --from review2.json --chases-from chases.json --out sim/REVIEW2-2026-10-21.md   # the report again, no new runs`, "```", "");

  // master table
  L.push("## Every option against the targets", "");
  L.push(`Targets: Win ${LABELS.map((l) => `${Math.round(100 * TARGETS.win[l][0])}–${Math.round(100 * TARGETS.win[l][1])}%`).join(" / ")}, Forked ≤2 / 3–7 / 8–12% (Easy / Standard / Hard); Hard captures 0.2–0.3 (accepted ~0.34; today's 0.47 is a known miss). Towns against their label's targets; Hallowby against Easy's.`, "");
  const town = (nm, key) => { const t = S[nm].towns[key]; return t ? wf(t.all, t.label) : "—"; };
  const mrow = names.map((nm) => [`**${nm}**`, CONFIGS[nm].item, CONFIGS[nm].title, ...LABELS.map((l) => wf(S[nm].labels[l], l)), num(S[nm].labels.hard.captures / S[nm].labels.hard.n), town(nm, "puddlecombe"), town(nm, "thistlewick"), town(nm, "gallowsmere"), town(nm, "hallowby")]);
  L.push(table(["", "Item", "Option", "Easy win / forked", "Standard", "Hard", "Hard captures", "Puddlecombe", "Thistlewick", "Gallowsmere", "Hallowby"], mrow), "");
  L.push("Win and forked per seed (Easy · Standard · Hard), for the options that move a level:", "");
  const srow = names.map((nm) => [nm, ...LABELS.map((l) => `${seedRange(nm, (j) => j.labels[l].win / j.labels[l].n)} · ${seedRange(nm, (j) => j.labels[l].forked / j.labels[l].n)}`)]);
  L.push(table(["", "Easy win · forked (lowest–highest seed)", "Standard", "Hard"], srow), "");

  // 1.1
  if (S.G1) {
    L.push("## 1.1 Spectral plus free hand-offs", "");
    L.push("**Does the simulator let the Ghost do it?** Partly. A Spectral pass at a location's last group obstacle already takes the item with no roll (D4), and the location is done, so her partner never rolls it. But the simulated players hand loot over only before a watched roll, so after the first such pass she carries the item and Spectral is off for the rest of the night. What was missing is the hand-off straight after: the new policy `ghostHandOff` adds it (\"hand\": she gives her loot to a friend at the same place at once; \"handSteer\", the generous upper bound: also her group heads for locations whose last obstacle is a group obstacle). The fixes are `spectralFix`: (a) \"notLast\", (b) \"noItem\" (she is past, but someone must roll it before it's beaten; alone, she rolls it), (c) \"firstOnly\".", "");
    const gcols = names.filter((k) => k === "base" || CONFIGS[k].item === "1.1");
    const grow = gcols.map((nm) => { const g = S[nm].ghost; return [nm, CONFIGS[nm].title, ...LABELS.map((l) => g[l] ? wfPlain(g[l]) : "—"), ...LABELS.map((l) => g[l] ? `${num(g[l].spectral / g[l].n)} · ${num(g[l].handOffs / g[l].n)}` : "—")]; });
    L.push(`**A Ghost with Spectral in every party of 4** (${(gr * seeds.length).toLocaleString("en-GB")} raids per label; the other three random):`, "");
    L.push(table(["", "Option", "Easy win / forked", "Standard", "Hard", "Easy: Spectral passes · hand-offs per raid", "Standard", "Hard"], grow), "");
    const gtrow = gcols.map((nm) => [nm, ...TOWNS.map((t) => S[nm].ghostTowns[t.key] ? wfPlain(S[nm].ghostTowns[t.key]) : "—"), ...TOWNS.map((t) => S[nm].ghostTowns[t.key] ? num(S[nm].ghostTowns[t.key].spectral / S[nm].ghostTowns[t.key].n) : "—")]);
    L.push(`**The same in each town** (party of 4 with a Ghost on Spectral, ${(tr * seeds.length).toLocaleString("en-GB")} raids each):`, "");
    L.push(table(["", ...TOWNS.map((t) => `${t.name} win / forked`), ...TOWNS.map((t) => `${t.name}: Spectral passes`)], gtrow), "");
    const rrow = gcols.map((nm) => [nm, ...LABELS.map((l) => wfPlain(S[nm].cells[`${l}|4|ghostSpectral`])), ...LABELS.map((l) => pp(S[nm].ents[l]["entity A Ghost"])), ...LABELS.map((l) => pp(S[nm].ents[l]["perk A Ghost:spectral"]))]);
    L.push("**In the random parties** (a party of 4 that drew a Ghost who drew Spectral; the Ghost with vs without, and Spectral against her other two Perks, in win points):", "");
    L.push(table(["", "Easy win / forked", "Standard", "Hard", "A Ghost with vs without, E", "S", "H", "Spectral vs her other Perks, E", "S", "H"], rrow), "");
  }

  // 1.2
  if (S.D1 || S.F1) {
    L.push("## 1.2 Overdraws", "");
    const ocols = ["base", "D1", "D1o", "Do"].filter((k) => S[k]);
    L.push("### (i) In a local chase", "");
    const orow = [];
    for (const l of LABELS) for (const nm of ocols) {
      const c = S[nm].chase[l].solo, rc = S[nm].labels[l];
      const odAny = 1 - (c.od[0] ?? 0) / (c.n || 1), od2 = ((c.od[2] ?? 0) + (c.od[3] ?? 0) + (c.od[4] ?? 0)) / (c.n || 1);
      orow.push([l, nm, num(rc.chases / rc.n), pct(odAny, 2), pct(od2, 2), String(c.odMax), pct(c.doomed / (c.n || 1), 2), pct(c.doomedBroke / (c.n || 1), 2), num(c.dod), String(c.dod2), pct(c.esc / (c.n || 1)), wf(rc, l)]);
    }
    L.push(table(["Label", "", "Chases per raid", "Lone chases with an overdraw", "with 2+", "Most in one chase", "Lone chases with the hunt already certain", "…and the runner out of charges", "Overdraws made with the hunt certain (all seeds)", "Chases with 2+ of them", "Lone escape", "Level win / forked"], orow), "");
    L.push("\"The hunt already certain\": a round rolled when the chase's rise so far already reaches the Limit, so more Suspicion is lost past it. D1 plays that trick (the runner treats further Suspicion as free); D1o adds the one-overdraw rule.", "");
    const fcols = ["base", "F1", "F1s", "F1sa", "F1r", "Fs", "Fr"].filter((k) => S[k]);
    L.push("### (ii) In the final flight", "");
    const frow = [];
    for (const l of LABELS) for (const nm of fcols) {
      const c = S[nm].labels[l];
      frow.push([l, nm, CONFIGS[nm].title, pct(c.flights / c.n), num(c.od.final / (c.flights || 1)), num(c.ch.final / (c.flights || 1)), pct(c.flightForked / (c.flights || 1)), num(c.flightRounds / (c.flights || 1), 2), wf(c, l)]);
    }
    L.push(table(["Label", "", "Rule / pricing", "Raids with a flight", "Overdraws per flight", "Charges spent per flight", "Forked per flight", "Rounds per flight", "Level win / forked"], frow), "");
  }

  // 1.3
  if (S.M3 || S.R6) {
    L.push("## 1.3 Late-track and long chases", "");
    const ccols = ["base", "M3", "M11", "R6"].filter((k) => S[k]);
    const buckets = [[0, 3], [4, 5], [6, 7], [8, 9], [10, 12]];
    L.push("### A lone runner's escape by Suspicion when the chase starts (chases in real raids, all three labels)", "");
    const brow = [];
    for (const nm of ccols) {
      const by = {};
      for (const l of LABELS) for (const [s, b] of Object.entries(S[nm].chase[l].solo.bySusp)) by[s] = addCounts(by[s], b);
      brow.push([nm, ...buckets.map(([a, b]) => { let n = 0, e = 0, m = 0, r = 0; for (let s = a; s <= b; s++) if (by[s]) { n += by[s].n; e += by[s].esc; m += by[s].monster; r += by[s].rolls; } return n ? `${pct(e / n, 0)} (${n.toLocaleString("en-GB")}; Monster ${pct(m / (r || 1), 0)})` : "—"; })]);
    }
    L.push(table(["", ...buckets.map(([a, b]) => `Suspicion ${a}–${b}: escaped (chases; Monster share of rolls)`)], brow), "");
    L.push("### Chase length and shared chases", "");
    const lrow = [];
    for (const l of LABELS) for (const nm of ccols) {
      const c = S[nm].chase[l];
      const long = Object.entries(c.solo.rounds).filter(([r]) => Number(r) >= 6).reduce((a, [, v]) => a + v, 0);
      const longS = Object.entries(c.shared.rounds).filter(([r]) => Number(r) >= 6).reduce((a, [, v]) => a + v, 0);
      const maxR = Math.max(...Object.keys(c.solo.rounds).map(Number), ...Object.keys(c.shared.rounds).map(Number));
      const meanR = Object.entries(c.solo.rounds).reduce((a, [r, v]) => a + Number(r) * v, 0) / (c.solo.n || 1);
      lrow.push([l, nm, c.solo.n.toLocaleString("en-GB"), num(meanR), pct(long / (c.solo.n || 1)), pct(longS / (c.shared.n || 1)), maxR >= 16 ? "16+" : String(maxR), pct(c.solo.esc / (c.solo.n || 1)), pct(c.solo.cap / (c.solo.n || 1)), c.shared.n.toLocaleString("en-GB"), pct(c.shared.c1 / (c.shared.n || 1)), pct(c.shared.esc / (c.shared.n || 1)), num(c.solo.rise / (c.solo.n || 1)), wf(S[nm].labels[l], l)]);
    }
    L.push(table(["Label", "", "Lone chases", "Rounds (mean)", "6+ rounds (lone)", "6+ rounds (shared)", "Longest", "Lone escaped", "Lone captured (incl. gave up)", "Shared chases", "Shared: cornered in round 1", "Shared: escaped", "Suspicion a lone chase adds", "Level win / forked"], lrow), "");
    L.push("Under R6 a chase still going after round 6 ends there, so \"6+ rounds\" counts the chases that reached round 6.", "");
  }

  // isolated chases
  if (chases) {
    L.push("### Lone chases on their own, by Suspicion when the chase starts", "");
    L.push(`Each cell: ${chases.runs.toLocaleString("en-GB")} lone local chases (seed ${chases.seed}) by a random Entity with a random kit, from Lead 1, with 3 charges unless marked; Standard's Limit (10) or Hard's (13) sets when the chase's rise brings the hunt and when giving up pays. "Mask" and "Monster" force that die every round (the review's comparison); "choice" is the simulated players' pick. Escaped %.`, "");
    for (const label of ["standard", "hard"]) {
      const cells = chases.cells.filter((c) => c.label === label && c.pol !== "shared");
      const susps = [...new Set(cells.map((c) => c.susp))].sort((a, b) => a - b);
      const cols = [["base", "mask", 3], ["base", "monster", 3], ["base", "smart", 3], ["base", "smart", 0], ["M3", "mask", 3], ["M3", "monster", 3], ["M3", "smart", 3], ["M11", "mask", 3], ["M11", "monster", 3], ["M11", "smart", 3], ["R6", "smart", 3]];
      const get = (rk, pol, ch, s) => cells.find((c) => c.rule === rk && c.pol === pol && c.charges === ch && c.susp === s);
      const head = ["Suspicion", "mob (today)", ...cols.map(([rk, pol, ch]) => `${CHASE_RULES[rk][0]}: ${pol === "smart" ? "choice" : pol === "mask" ? "Mask" : "Monster"}${ch === 0 ? ", no charges" : ""}`)];
      const rows = susps.map((s) => [String(s), String(Math.min(12, 8 + Math.floor(s / 2))), ...cols.map(([rk, pol, ch]) => { const c = get(rk, pol, ch, s); return c ? pct(c.esc / c.n, 0) : "—"; })]);
      L.push(`**${label[0].toUpperCase() + label.slice(1)} (Limit ${NUMBERS.labels[label].limit})**`, "", table(head, rows), "");
      const lrows = susps.map((s) => [String(s), ...["base", "M3", "M11", "R6"].map((rk) => { const c = get(rk, "smart", 3, s); return c ? `${pct(c.long / c.n, 0)} · ${num(c.rounds / c.n, 1)}` : "—"; })]);
      L.push(`Chase length (players' choice, 3 charges): share running 6+ rounds · mean rounds`, "", table(["Suspicion", ...["base", "M3", "M11", "R6"].map((rk) => CHASE_RULES[rk][0])], lrows), "");
      const sh = chases.cells.filter((c) => c.label === label && c.pol === "shared");
      const ss = [...new Set(sh.map((c) => c.susp))].sort((a, b) => a - b);
      L.push(`Two runners caught by one group check (players' choice, 3 charges each): cornered in round 1 · escaped`, "", table(["Suspicion", ...["base", "M3", "M11", "R6"].map((rk) => CHASE_RULES[rk][0])], ss.map((s) => [String(s), ...["base", "M3", "M11", "R6"].map((rk) => { const c = sh.find((x) => x.rule === rk && x.susp === s); return c ? `${pct(c.c1 / c.n, 0)} · ${pct(c.esc / c.n, 0)}` : "—"; })])), "");
    }
  }

  // 1.4
  if (S.LK8) {
    L.push("## 1.4 The lock-up on Easy", "");
    const krow = [];
    for (const nm of ["base", "LK8"]) {
      const c = S[nm].labels.easy;
      const tp = S[nm].towns.puddlecombe.all, th = S[nm].towns.hallowby.all;
      krow.push([nm, wf(c, "easy"), num(c.captures / c.n, 3), num(c.rescues / c.n, 3), num(c.slips / c.n, 3), num(c.left / c.n, 3), pct(c.held / c.n, 2), wf(tp, "easy"), `${num(tp.rescues / tp.n, 3)} · ${num(tp.slips / tp.n, 3)} · ${num(tp.left / tp.n, 3)}`, wf(th, "easy"), `${num(th.rescues / th.n, 3)} · ${num(th.slips / th.n, 3)} · ${num(th.left / th.n, 3)}`]);
    }
    L.push(table(["", "Easy win / forked", "Captures per raid", "Freed by rescue", "Slipped free", "Left behind", "Everyone held", "Puddlecombe", "rescued · slipped · left", "Hallowby", "rescued · slipped · left"], krow), "");
    L.push("Rescued and slipped count captives freed, per raid. Standard and Hard are untouched (their raids are identical to the baseline).", "");
  }

  // 1.5
  if (S.P5L || S.E10) {
    L.push("## 1.5 Clocks and party size", "");
    L.push("### Today, by party size", "");
    const prow = [];
    for (const l of LABELS) prow.push([l, ...SIZES.map((s) => wf(S.base.cells[`${l}|${s}`], l)), ...SIZES.map((s) => pct(S.base.cells[`${l}|${s}`].flights / S.base.cells[`${l}|${s}`].n)), ...SIZES.map((s) => pct(S.base.cells[`${l}|${s}`].dawn / S.base.cells[`${l}|${s}`].n)), ...SIZES.map((s) => num(S.base.cells[`${l}|${s}`].turns / S.base.cells[`${l}|${s}`].n, 1))]);
    L.push(table(["Label", "3 Entities win / forked", "4", "5", "Final flight, 3", "4", "5", "Dawn flight, 3", "4", "5", "Turns used, 3", "4", "5"], prow), "");
    const ptrow = [];
    for (const t of TOWNS) ptrow.push([`${t.name} (${t.label})`, ...SIZES.map((s) => wf(S.base.towns[t.key].bySize[s], t.label)), pct(S.base.towns[t.key].all.flights / S.base.towns[t.key].all.n)]);
    L.push(table(["Town", "3 win / forked", "4", "5", "Raids with a final flight"], ptrow), "");
    L.push(`**Raids that end in the final flight on Hard:** rolled Hard towns ${pct(S.base.labels.hard.flights / S.base.labels.hard.n)} (at the Limit ${pct(S.base.labels.hard.limit / S.base.labels.hard.n)}, at dawn ${pct(S.base.labels.hard.dawn / S.base.labels.hard.n)}); Gallowsmere ${pct(S.base.towns.gallowsmere.all.flights / S.base.towns.gallowsmere.all.n)} (at the Limit ${pct(S.base.towns.gallowsmere.all.limit / S.base.towns.gallowsmere.all.n)}, at dawn ${pct(S.base.towns.gallowsmere.all.dawn / S.base.towns.gallowsmere.all.n)}).`, "");
    L.push("### Options", "");
    const orow = [];
    for (const nm of ["base", "P5L", "P5T", "E10"].filter((k) => S[k])) {
      orow.push([nm, CONFIGS[nm].title, ...LABELS.map((l) => wf(S[nm].cells[`${l}|5`], l)), ...LABELS.map((l) => wf(S[nm].labels[l], l)), ...TOWNS.map((t) => wf(S[nm].towns[t.key].bySize[5], t.label))]);
    }
    L.push(table(["", "Option", "5 Entities: Easy", "Standard", "Hard", "All sizes: Easy", "Standard", "Hard", ...TOWNS.map((t) => `${t.name}, 5`)], orow), "");
    if (S.E10) L.push(`E10 on the Easy towns (all sizes): Puddlecombe ${wf(S.E10.towns.puddlecombe.all, "easy")} (today ${wf(S.base.towns.puddlecombe.all, "easy")}), Hallowby ${wf(S.E10.towns.hallowby.all, "easy")} (today ${wf(S.base.towns.hallowby.all, "easy")}).`, "");
  }

  // 1.6
  if (S.LR) {
    L.push("## 1.6 Any ability as a raise in a local chase", "");
    const ents = Object.keys(S.base.ents.standard).filter((w) => w.startsWith("entity")).map((w) => w.slice(7));
    const erow = ents.map((e) => {
      const key = Object.keys(S.base.chase.standard.solo.byEnt).find((k) => ROSTER.find((x) => x.key === k)?.id === e);
      const esc = (nm) => { let n = 0, x = 0; for (const l of LABELS) { const b = S[nm].chase[l].solo.byEnt[key]; if (b) { n += b.n; x += b.esc; } } return n ? x / n : NaN; };
      return [e, ...LABELS.map((l) => `${pp(S.base.ents[l][`entity ${e}`])} → ${pp(S.LR.ents[l][`entity ${e}`])}`), `${pct(esc("base"))} → ${pct(esc("LR"))}`];
    });
    L.push("Each Entity with vs without (win points, same label and party size), today → with the option, and its lone local chases escaped (all labels):", "");
    L.push(table(["Entity", "Easy", "Standard", "Hard", "Lone chases escaped"], erow), "");
    const lrow = LABELS.map((l) => [l, wf(S.base.labels[l], l), wf(S.LR.labels[l], l), `${pct(S.base.chase[l].solo.esc / S.base.chase[l].solo.n)} → ${pct(S.LR.chase[l].solo.esc / S.LR.chase[l].solo.n)}`, `${num(S.base.labels[l].ch.local / S.base.labels[l].n, 3)} → ${num(S.LR.labels[l].ch.local / S.LR.labels[l].n, 3)}`, `${num(S.base.labels[l].captures / S.base.labels[l].n)} → ${num(S.LR.labels[l].captures / S.LR.labels[l].n)}`]);
    L.push(table(["Label", "Today", "With the option", "Lone chases escaped", "Charges spent in local chases per raid", "Captures per raid"], lrow), "");
  }

  // the other measures
  L.push("## Other measures (all options)", "");
  const xrow = names.map((nm) => [nm, pct(S[nm].rolls.trouble), pct(S[nm].rolls.crit), pct(S[nm].rolls.spendHalf), pct(S[nm].rolls.maskChoice), LABELS.map((l) => num(S[nm].labels[l].captures / S[nm].labels[l].n)).join(" / "), LABELS.map((l) => num(S[nm].labels[l].left / S[nm].labels[l].n)).join(" / "), LABELS.map((l) => pct(S[nm].labels[l].flights / S[nm].labels[l].n, 0)).join(" / "), LABELS.map((l) => pct(S[nm].labels[l].grand / S[nm].labels[l].n, 0)).join(" / ")]);
  L.push(table(["", "Trouble (10–22%)", "Criticals (3–7%)", "Half charges spent (≥50%)", "Mask where chosen (≥25%)", "Captures per raid E / S / H", "Left behind E / S / H", "Final flight E / S / H", "Grand Year E / S / H"], xrow), "");
  return L.join("\n");
}

// ---------------------------------------------------------------- CLI

const here = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === here) {
  const args = process.argv.slice(2);
  const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : d; };
  const flag = (k) => { const i = args.indexOf(k); if (i >= 0) { args.splice(i, 1); return true; } return false; };
  const runs = Number(opt("--runs", 2000)), townRuns = Number(opt("--town-runs", 3000)), ghostRuns = Number(opt("--ghost-runs", 4000));
  const seeds = opt("--seeds", "1,7,11").split(",").map(Number);
  const jobs = Number(opt("--jobs", 4));
  const only = opt("--only", null), out = opt("--out", null), save = opt("--save", null), from = opt("--from", null), chasesFrom = opt("--chases-from", null);
  const job = opt("--job", null), json = opt("--json", null);
  const chaseRuns = Number(opt("--chase-runs", 3000));
  if (flag("--chases")) {
    const seed = seeds[0];
    const cells = runChases({ runs: chaseRuns, seed });
    const res = { runs: chaseRuns, seed, cells };
    if (save) writeFileSync(save, JSON.stringify(res));
    console.log(`chases done: ${cells.length} cells`);
  } else if (job) {
    const [nm, sd] = job.split(":");
    writeFileSync(json, JSON.stringify(runJob(nm, Number(sd), { runs, townRuns, ghostRuns })));
  } else {
    let res = {};
    if (from) for (const f of from.split(",")) Object.assign(res, JSON.parse(readFileSync(f, "utf8"))); // several files merge (name:seed keys)
    else {
      const names = only ? only.split(",") : Object.keys(CONFIGS);
      const dir = mkdtempSync(join(tmpdir(), "review2-"));
      const queue = names.flatMap((nm) => seeds.map((s) => `${nm}:${s}`));
      const work = async () => {
        while (queue.length) {
          const j = queue.shift();
          const file = join(dir, `${j.replace(/[^A-Za-z0-9]/g, "_")}.json`);
          await new Promise((ok, bad) => spawn(process.execPath, [here, "--runs", String(runs), "--town-runs", String(townRuns), "--ghost-runs", String(ghostRuns), "--job", j, "--json", file], { stdio: "inherit" }).on("exit", (c) => (c ? bad(new Error(`${j} failed`)) : ok())));
          res[j] = JSON.parse(readFileSync(file, "utf8"));
          console.error(`done ${j} (${Object.keys(res).length}/${names.length * seeds.length})`);
          if (save) writeFileSync(save, JSON.stringify(res));
        }
      };
      await Promise.all([...Array(Math.min(jobs, queue.length))].map(work));
      if (save) writeFileSync(save, JSON.stringify(res));
    }
    const chases = chasesFrom ? JSON.parse(readFileSync(chasesFrom, "utf8")) : null;
    const text = report(res, { chases });
    if (out) writeFileSync(out, text + "\n");
    console.log(text);
  }
}
