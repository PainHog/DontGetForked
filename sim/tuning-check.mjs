#!/usr/bin/env node
/**
 * Entity tuning after the outside review (docs/reviews/2026-10-19-outside/REVIEW.md, Section 4), measured at today's
 * defaults (the review's package with Limits 9 / 10 / 13, 12 Turns). A measuring job: nothing here changes the game.
 * The options are switches the simulator reads only when this script sets them (sim/params.mjs TUNING), so the
 * defaults and test/sim.test.mjs are unchanged. Report: sim/TUNING-2026-10-20.md.
 *
 *   node sim/tuning-check.mjs [--runs 2000] [--entity-runs 4000] [--town-runs 3000] [--seeds 1,7,11] [--jobs 4]
 *                             [--only rolled,entity,town,thistle] [--out sim/TUNING-2026-10-20.md] [--save results.json]
 *   node sim/tuning-check.mjs --from results.json --out sim/TUNING-2026-10-20.md     # the report again, no new runs
 *
 * Three kinds of run, each on the same parties, towns and dice streams as its baseline (common random numbers):
 *  - rolled: rolled towns, Easy / Standard / Hard, parties of 3, 4 and 5 (--runs raids per label and party size);
 *  - entity: one Entity in every party of 4 (the others random), Easy / Standard / Hard (--entity-runs per label);
 *    the same parties as "raids with that Entity" in a rolled run, twice as many of them for the time;
 *  - town: a premade town or the one-shot's Hallowby, parties of 3, 4 and 5 (--town-runs per party size).
 * Each under two kit policies: "random" (each Entity's Gift and Perk at random, the simulator's standard, on which every
 * target so far was measured) and "default" (every Entity on its marked default Gift, Perk and Castle Duty, what a
 * first-time table and the one-shot's Entity cards play).
 */
import { writeFileSync, readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { runConfig, metrics, LABELS, SIZES } from "./run.mjs";
import { defaults, NUMBERS, TARGETS } from "./params.mjs";
import { PREMADE, simTown } from "./premade.mjs";
import { HALLOWBY, DEMO_FILE } from "./demo-check.mjs";
import { loadTowns, TOWNS_FILE } from "../book/tools/towns.mjs";
import { ROSTERS } from "./entities.mjs";

const ENTS = ROSTERS.approved.map((e) => e.key);
const NAME = Object.fromEntries(ROSTERS.approved.map((e) => [e.key, e.id]));

/** The options (params over today's defaults). `kits`: which kit policies the option changes anything under. */
export const OPTIONS = {
  base: { title: "Today's defaults", p: {}, kits: ["random", "default"] },
  aware: { title: "Baseline, with players who know Hypnotic Eyes' \"by 2 or more\" (perkAware)", p: { perkAware: true }, kits: ["random", "default"], ent: "dracula" },
  "D-a": { title: "Hypnotic Eyes: on Charm rolls the Monster never shows", p: { hypnoticEyes: "never" }, kits: ["random", "default"], ent: "dracula" },
  "D-b": { title: "Old Money becomes Dracula's default Perk", p: { kitOverride: { dracula: { perk: "oldMoney" } } }, kits: ["default"], ent: "dracula" },
  "D-c": { title: "Mist becomes Dracula's default Gift", p: { kitOverride: { dracula: { gift: "Mist" } } }, kits: ["default"], ent: "dracula" },
  WC: { title: "Dracula picks Wall-Crawler, as the book has it", p: { kitOverride: { dracula: { perk: "wallCrawler" } } }, kits: ["random", "default"], ent: "dracula", pick: true },
  "WC-b": { title: "Wall-Crawler picked, \"...and carrying doesn't make your Nimble smaller\"", p: { kitOverride: { dracula: { perk: "wallCrawler" } }, wallCrawler: "carry" }, kits: ["random", "default"], ent: "dracula", pick: true },
  "WC-d": { title: "Wall-Crawler picked, \"...and at a way in you may roll Nimble instead\"", p: { kitOverride: { dracula: { perk: "wallCrawler" } }, wallCrawler: "wayIn" }, kits: ["random", "default"], ent: "dracula", pick: true },
  "WC-e": { title: "Wall-Crawler picked, \"...and your Nimble is one size bigger in a chase\"", p: { kitOverride: { dracula: { perk: "wallCrawler" } }, wallCrawler: "bigger" }, kits: ["random", "default"], ent: "dracula", pick: true },
  "W-b": { title: "Wall-Crawler gains \"...and carrying doesn't make your Nimble smaller\" (picked at random as usual)", p: { wallCrawler: "carry" }, kits: ["random"], ent: "dracula" },
  "W-d": { title: "Wall-Crawler gains \"...and at a way in you may roll Nimble instead\" (picked at random as usual)", p: { wallCrawler: "wayIn" }, kits: ["random"], ent: "dracula" },
  "W-e": { title: "Wall-Crawler gains \"...and your Nimble is one size bigger in a chase\" (picked at random as usual)", p: { wallCrawler: "bigger" }, kits: ["random"], ent: "dracula" },
  "C-a": { title: "Strong Back gains \"and carrying furniture doesn't stop you choosing the Mask\"", p: { strongBack: "mask" }, kits: ["random", "default"], ent: "creature" },
  "C-b": { title: "Tireless becomes the Creature's default Perk", p: { kitOverride: { creature: { perk: "tireless" } } }, kits: ["default"], ent: "creature" },
  "C-c": { title: "(context) Built to Last as the Creature's default Perk", p: { kitOverride: { creature: { perk: "builtToLast" } } }, kits: ["default"], ent: "creature" },
  "M-a": { title: "Fear the Curse becomes the Mummy's default Perk", p: { kitOverride: { mummy: { perk: "fearTheCurse" } } }, kits: ["default"], ent: "mummy" },
  "M-b": { title: "Keeper of Treasures becomes the Mummy's default Perk", p: { kitOverride: { mummy: { perk: "keeperOfTreasures" } } }, kits: ["default"], ent: "mummy" },
  "I-a": { title: "Out of Sight narrowed to \"you carry\" (the text before V17)", p: { outOfSightRule: "carry" }, kits: ["random", "default"], ent: "invisible" },
  "Wi-a": { title: "A Potion for That becomes the Witch's default Gift", p: { kitOverride: { witch: { gift: "A Potion for That" } } }, kits: ["default"], ent: "witch" },
  "Wi-b": { title: "Broomstick rolls Wits instead of Nimble", p: { giftTraits: { Broomstick: "wits" } }, kits: ["random", "default"], ent: "witch" },
  "G-a": { title: "A raise on a d12 adds +2 to the total instead", p: { raiseD12: "plus2" }, kits: ["random", "default"], ent: null, general: true },
  "G-b": { title: "(context) A raise on a d12 adds +1 to the total instead", p: { raiseD12: "plus1" }, kits: ["random", "default"], ent: null, general: true },
};
const GENERAL = Object.keys(OPTIONS).filter((k) => OPTIONS[k].general);

/**
 * Thistlewick candidates (book/src/towns.json, town "thistlewick"): one change each, within Chapter 8's rules (loadTowns
 * checks them). An edit names a location, which obstacle (way 0 or 1, then i, or the furniture's), and what to set.
 */
export const THISTLE = {
  T0: { title: "Thistlewick as printed", edits: [] },
  T1: { title: "The baker: the shopkeeper (2nd obstacle, watched) Difficulty 8 → 10", edits: [{ loc: "baker", then: 0, set: { difficulty: 10 } }] },
  T2: { title: "The china shop: the back room (2nd obstacle) Difficulty 8 → 10", edits: [{ loc: "china", then: 0, set: { difficulty: 10 } }] },
  T3: { title: "The ironmonger: the strongbox (2nd obstacle, watched) Difficulty 8 → 10", edits: [{ loc: "ironmonger", then: 0, set: { difficulty: 10 } }] },
  T4: { title: "The seed merchant: the watchman (2nd obstacle, watched) Difficulty 10 → 12", edits: [{ loc: "seeds", then: 0, set: { difficulty: 12 } }] },
  T5: { title: "The baker: the window (2nd way in) Difficulty 8 → 10", edits: [{ loc: "baker", way: 1, set: { difficulty: 10 } }] },
  T6: { title: "The china shop: the front door (1st way in) Difficulty 8 → 10", edits: [{ loc: "china", way: 0, set: { difficulty: 10 } }] },
  T7: { title: "The china shop: the watched mark moved from the back gate (2nd way in) to the back room (2nd obstacle)", edits: [{ loc: "china", way: 1, set: { watched: false } }, { loc: "china", then: 0, set: { watched: true } }] },
  T8: { title: "The china shop: the watched mark moved from the back gate (2nd way in) to the front door (1st way in)", edits: [{ loc: "china", way: 1, set: { watched: false } }, { loc: "china", way: 0, set: { watched: true } }] },
  T9: { title: "The seed merchant: the stalls (1st way in, group) Difficulty 8 → 10", edits: [{ loc: "seeds", way: 0, set: { difficulty: 10 } }] },
  T10: { title: "The hatter: the neighbour (1st way in, watched) Difficulty 8 → 10", edits: [{ loc: "hatter", way: 0, set: { difficulty: 10 } }] },
  T11: { title: "The ironmonger: the cart (1st way in) Difficulty 6 → 8", edits: [{ loc: "ironmonger", way: 0, set: { difficulty: 8 } }] },
};

// ---------------------------------------------------------------- the jobs

/** Every job: kind, kit policy, option (or Thistlewick candidate), target (an Entity or a town), seed. */
export function jobList({ seeds, only, opts = null }) {
  const all = [];
  const jobs = { push: (j) => { if (!opts || opts.includes(j.opt)) all.push(j); } };
  const want = (k) => !only || only.includes(k);
  for (const seed of seeds) {
    if (want("rolled")) {
      for (const [opt, o] of Object.entries(OPTIONS)) {
        if (o.pick) continue; // a pick is measured on its Entity (below) and by the rolled run's Perk outlier
        for (const kit of o.kits) jobs.push({ kind: "rolled", kit, opt, seed });
      }
    }
    if (want("entity")) {
      for (const kit of ["random", "default"]) {
        for (const e of ENTS) jobs.push({ kind: "entity", kit, opt: "base", target: e, seed });
        for (const g of GENERAL) for (const e of ENTS) jobs.push({ kind: "entity", kit, opt: g, target: e, seed });
        for (const [opt, o] of Object.entries(OPTIONS)) {
          if (!o.ent || !o.kits.includes(kit) || /^W-/.test(opt)) continue; // W-x random picks: the WC-x rows force the pick
          jobs.push({ kind: "entity", kit, opt, target: o.ent, seed });
        }
      }
    }
    if (want("town")) {
      for (const kit of ["default", "random"]) {
        for (const [opt, o] of Object.entries(OPTIONS)) {
          if (o.pick || /^W-/.test(opt) || !o.kits.includes(kit)) continue;
          jobs.push({ kind: "town", kit, opt, target: "hallowby", seed });
        }
      }
      for (const t of PREMADE) for (const opt of ["base", "aware", "D-a", "C-a", "I-a", "Wi-b", ...GENERAL]) jobs.push({ kind: "town", kit: "random", opt, target: t.key, seed });
      for (const t of PREMADE) jobs.push({ kind: "town", kit: "default", opt: "base", target: t.key, seed });
    }
    if (want("thistle")) {
      for (const c of Object.keys(THISTLE)) jobs.push({ kind: "thistle", kit: "random", opt: c, target: "thistlewick", seed });
      // player styles (LESSONS: every printed town for the default players, a party that always goes for the
      // furniture, and one that stays together), on the candidates worth a closer look
      for (const c of ["T0", "T1", "T2", "T3", "T7"]) for (const style of ["always", "together"]) jobs.push({ kind: "thistle", kit: "random", opt: c, target: "thistlewick", style, seed });
      for (const c of ["T0", "T1", "T2", "T3", "T7"]) jobs.push({ kind: "thistle", kit: "default", opt: c, target: "thistlewick", seed });
    }
  }
  return all;
}
const jobId = (j) => [j.kind, j.kit, j.opt, j.target ?? "-", j.style ?? "-", j.seed].join("|");

/** Thistlewick with the candidate's edits, checked by the book's own loader (throws on a broken rule). */
function thistleTown(cand, dir) {
  const raw = JSON.parse(readFileSync(TOWNS_FILE, "utf8"));
  const t = raw.towns.find((x) => x.key === "thistlewick");
  for (const e of THISTLE[cand].edits) {
    const l = t.locations.find((x) => x.key === e.loc);
    const ob = e.way !== undefined ? l.waysIn[e.way] : e.then !== undefined ? l.then[e.then] : l.furniture.obstacle;
    for (const [k, v] of Object.entries(e.set)) { if (v === false) delete ob[k]; else ob[k] = v; }
  }
  const file = join(dir, `thistlewick-${cand}.json`);
  writeFileSync(file, JSON.stringify({ towns: [t] }));
  return loadTowns(pathToFileURL(file))[0];
}

const share = (xs, f) => (xs.length ? xs.filter(f).length / xs.length : NaN);
const avg = (xs, f) => (xs.length ? xs.reduce((a, x) => a + f(x), 0) / xs.length : NaN);
const cell = (xs) => ({ n: xs.length, win: share(xs, (r) => r.win), forked: share(xs, (r) => r.forked), grand: share(xs, (r) => r.result === "grand"), captures: avg(xs, (r) => r.captures), limit: share(xs, (r) => r.finalTrigger === "limit") });
function soloBy(raids) {
  const out = {};
  for (const r of raids) for (const [k, c] of Object.entries(r.st.soloBy ?? {})) { const o = (out[k] ??= { n: 0, esc: 0, cap: 0 }); o.n += c.n; o.esc += c.esc; o.cap += c.cap; }
  return out;
}
const tuneCounts = (rec) => Object.fromEntries(Object.entries(rec.counts).filter(([k]) => k.startsWith("tune ")));

/** Run one job (in a child process). */
export function runJob(j, { runs, entityRuns, townRuns }) {
  const o = OPTIONS[j.opt];
  const P = { ...defaults(), tuneStats: true, kitPolicy: j.kit, ...(o ? o.p : {}) };
  if (j.style === "always") P.furniturePolicy = "always";
  if (j.style === "together") P.partyPolicy = "together";
  if (j.kind === "rolled") {
    const R = runConfig({ params: P, numbers: NUMBERS, runs, seed: j.seed });
    const M = metrics(R);
    const out = { labels: {}, cells: {}, ent4: {}, outliers: M.outliers, rolls: M.rolls, spendHalf: M.spendHalf, counts: tuneCounts(R.rec), soloBy: soloBy(R.raids) };
    for (const L of LABELS) {
      const xs = R.raids.filter((r) => r.label === L);
      out.labels[L] = cell(xs);
      for (const s of SIZES) out.cells[`${L}|${s}`] = cell(xs.filter((r) => r.size === s));
    }
    for (const e of ENTS) {
      out.ent4[e] = {};
      for (const L of LABELS) out.ent4[e][L] = cell(R.raids.filter((r) => r.label === L && r.size === 4 && r.members.some((m) => m.ent.key === e)));
    }
    return out;
  }
  if (j.kind === "entity") {
    const R = runConfig({ params: { ...P, forceEntity: j.target }, numbers: NUMBERS, runs: entityRuns, seed: j.seed, sizes: [4] });
    const out = { labels: {}, counts: tuneCounts(R.rec), soloBy: soloBy(R.raids) };
    for (const L of LABELS) out.labels[L] = cell(R.raids.filter((r) => r.label === L));
    return out;
  }
  // town / thistle
  let t;
  if (j.kind === "thistle") t = thistleTown(j.opt, mkdtempSync(join(tmpdir(), "thistle-")));
  else t = j.target === "hallowby" ? HALLOWBY : PREMADE.find((x) => x.key === j.target);
  const R = runConfig({ params: P, numbers: NUMBERS, runs: townRuns, seed: j.seed, labels: [t.label], townFn: () => simTown(t, NUMBERS) });
  return { label: t.label, name: t.name, stats: t.stats, all: cell(R.raids), bySize: Object.fromEntries(SIZES.map((s) => [s, cell(R.raids.filter((r) => r.size === s))])), went: share(R.raids, (r) => r.wentForFurniture), counts: tuneCounts(R.rec) };
}

// ---------------------------------------------------------------- report

const pct = (x, d = 1) => (Number.isFinite(x) ? `${(100 * x).toFixed(d)}%` : "—");
const pts = (x, d = 1) => (Number.isFinite(x) ? `${x >= 0 ? "+" : "−"}${Math.abs(100 * x).toFixed(d)}` : "—");
const inBand = (x, [lo, hi]) => x >= lo - 1e-9 && x <= hi + 1e-9;
const tick = (ok) => (ok ? "" : " ✗");
const table = (head, rows) => [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;

export function report(res, { runs, entityRuns, townRuns, seeds }) {
  const get = (j) => res[jobId(j)];
  const S = seeds;
  const L = [];
  const seedAvg = (f) => { const v = S.map(f).filter(Number.isFinite); return v.length === S.length ? mean(v) : NaN; };
  const perSeed = (f, fmt = (x) => pct(x)) => S.map((s) => fmt(f(s))).join(" · ");

  // ---- the overall rates
  const lvl = (kit, opt, s, Lb, k) => get({ kind: "rolled", kit, opt, seed: s })?.labels[Lb][k];
  const levelRows = (kit, opts) => opts.filter((opt) => get({ kind: "rolled", kit, opt, seed: S[0] })).map((opt) => {
    const row = [opt === "base" ? "**Today's defaults**" : `${opt}: ${OPTIONS[opt].title}`];
    for (const Lb of LABELS) {
      const w = seedAvg((s) => lvl(kit, opt, s, Lb, "win")), f = seedAvg((s) => lvl(kit, opt, s, Lb, "forked"));
      const dw = seedAvg((s) => lvl(kit, opt, s, Lb, "win") - lvl(kit, "base", s, Lb, "win"));
      const df = seedAvg((s) => lvl(kit, opt, s, Lb, "forked") - lvl(kit, "base", s, Lb, "forked"));
      row.push(`${pct(w)}${tick(inBand(w, TARGETS.win[Lb]))} / ${pct(f)}${tick(inBand(f, TARGETS.forked[Lb]))}` + (opt === "base" ? "" : ` (${pts(dw)} / ${pts(df)})`));
    }
    row.push(perSeed((s) => lvl(kit, opt, s, "hard", "win")));
    return row;
  });
  const levelHead = ["Option", "Easy win / forked (Δ pts)", "Standard", "Hard", "Hard win on each seed"];

  // ---- the Entity tables
  const ent = (kit, opt, e, s, Lb, k = "win") => get({ kind: "entity", kit, opt, target: e, seed: s })?.labels[Lb][k];
  const entBase = (kit) => ENTS.map((e) => {
    const r = [NAME[e]];
    for (const Lb of LABELS) r.push(`${pct(seedAvg((s) => ent(kit, "base", e, s, Lb)))} (${perSeed((s) => ent(kit, "base", e, s, Lb), (x) => (100 * x).toFixed(1))})`);
    r.push(pct(seedAvg((s) => ent(kit, "base", e, s, "hard", "forked"))));
    // the with-vs-without outlier (the review-check measure) from the rolled run
    const o = seedAvg((s) => get({ kind: "rolled", kit, opt: "base", seed: s })?.outliers.find((x) => x.what === `entity ${NAME[e]}`)?.delta);
    r.push(pts(o));
    return r;
  });
  const optRow = (kit, opt, e) => {
    const r = [opt === "base" ? "baseline" : `${opt}: ${OPTIONS[opt].title}`];
    for (const Lb of LABELS) {
      const w = seedAvg((s) => ent(kit, opt, e, s, Lb));
      const d = seedAvg((s) => ent(kit, opt, e, s, Lb) - ent(kit, "base", e, s, Lb));
      r.push(opt === "base" ? pct(w) : `${pct(w)} (${pts(d)}; ${perSeed((s) => ent(kit, opt, e, s, Lb) - ent(kit, "base", e, s, Lb), (x) => pts(x))})`);
    }
    const f = seedAvg((s) => ent(kit, opt, e, s, "hard", "forked"));
    r.push(pct(f));
    const sb = (s) => get({ kind: "entity", kit, opt, target: e, seed: s })?.soloBy[e];
    const esc = seedAvg((s) => { const c = sb(s); return c && c.n ? c.esc / c.n : NaN; });
    r.push(pct(esc, 0));
    return r;
  };
  const optHead = ["Option", "Easy win (Δ pts; per seed)", "Standard", "Hard", "Hard forked", "Its lone local chases escaped"];

  // ---- towns
  const town = (kind, kit, opt, target, s, style) => get({ kind, kit, opt, target, seed: s, style });
  const townRow = (kind, kit, opt, target, label, style) => {
    const t0 = town(kind, kit, opt, target, S[0], style);
    if (!t0) return null;
    const w = seedAvg((s) => town(kind, kit, opt, target, s, style)?.all.win), f = seedAvg((s) => town(kind, kit, opt, target, s, style)?.all.forked);
    const base = kind === "thistle" ? "T0" : "base";
    const dw = seedAvg((s) => town(kind, kit, opt, target, s, style)?.all.win - town(kind, kit, base, target, s, style)?.all.win);
    const df = seedAvg((s) => town(kind, kit, opt, target, s, style)?.all.forked - town(kind, kit, base, target, s, style)?.all.forked);
    const T = TARGETS;
    const sized = SIZES.map((n) => pct(seedAvg((s) => town(kind, kit, opt, target, s, style)?.bySize[n].win), 0)).join(" · ");
    return [label, `${pct(w)}${style ? "" : tick(inBand(w, T.win[t0.label]))}` + (opt === base ? "" : ` (${pts(dw)})`), `${pct(f)}${style ? "" : tick(inBand(f, T.forked[t0.label]))}` + (opt === base ? "" : ` (${pts(df)})`),
      perSeed((s) => town(kind, kit, opt, target, s, style)?.all.win), sized, pct(seedAvg((s) => town(kind, kit, opt, target, s, style)?.all.grand), 0), seedAvg((s) => town(kind, kit, opt, target, s, style)?.all.captures).toFixed(2)];
  };
  const townHead = ["Option", "Win (Δ pts)", "Forked (Δ pts)", "Win on each seed", "Win with 3 · 4 · 5", "Grand Year", "Captures"];

  L.push("# Entity tuning after the outside review: measurements (2026-10-20)", "");
  L.push("A measuring job for Richard's calls: nothing in the game, the book or the Foundry system was changed. The options are switches the simulator reads only when `sim/tuning-check.mjs` sets them (`sim/params.mjs` TUNING); the defaults, `test/sim.test.mjs` and every earlier report are unchanged.", "");
  L.push("## How it was measured", "");
  L.push(`- **Rules and numbers:** today's defaults (the outside review's package D1–D7 with R1 and D4, Suspicion Limits 9 / 10 / 13, 12 Turns; \`sim/params.mjs\`).`);
  L.push(`- **Seeds:** ${S.join(", ")}. Every option runs on the same parties, towns and dice streams as its baseline (common random numbers), so a difference is the option, not a different draw. Run-to-run noise between seeds is about ±0.5–1 point on a level's win rate (more on one Entity's).`);
  L.push(`- **Rolled towns:** ${runs.toLocaleString("en-GB")} raids per label and party size (3, 4 and 5 Entities) per seed, ${(runs * 9).toLocaleString("en-GB")} raids a run.`);
  L.push(`- **One Entity's win rate (party of 4):** that Entity in every party of 4, the other three at random: the same parties as "raids that include it" in a rolled run, ${entityRuns.toLocaleString("en-GB")} per label per seed (${(entityRuns * 3 * S.length).toLocaleString("en-GB")} per row).`);
  L.push(`- **Towns:** Hallowby (the one-shot), Puddlecombe, Thistlewick and Gallowsmere as printed, ${townRuns.toLocaleString("en-GB")} raids per party size (3, 4, 5) per seed.`);
  L.push("- **Kits.** *Random kits* is the simulator's standard: each Entity's Gift and Perk at random (as Chapter 2's d6 would), a Castle Duty at random; every target so far was measured on it. Changing which option is the **default** changes nothing there. *Default kits* gives every Entity its marked default Gift, Perk and Castle Duty (if two defaults clash, the later one takes another at random): what a first-time table plays, and what the one-shot's Entity cards have (Hallowby is measured on default kits).");
  L.push("- **Hypnotic Eyes and the players.** The simulated players price the Monster die from exact odds. Before this job they priced Dracula's Charm Monster rolls as if Hypnotic Eyes didn't exist (the Perk still worked when the dice were read). `aware` is the baseline with players who know it; option D-a is compared with both.");
  L.push("- ✗ marks a number outside its target. Δ is in points against today's defaults on the same seeds; the per-seed Δs show the noise.", "");
  L.push("```", `node sim/tuning-check.mjs --runs ${runs} --entity-runs ${entityRuns} --town-runs ${townRuns} --seeds ${S.join(",")} --jobs 4`, "```", "");

  // Baselines
  L.push("## 1. Baselines", "");
  L.push("### The levels against the targets", "");
  L.push(`Targets: Easy ${pct(TARGETS.win.easy[0], 0)}–${pct(TARGETS.win.easy[1], 0)} win, ≤ ${pct(TARGETS.forked.easy[1], 0)} forked; Standard ${pct(TARGETS.win.standard[0], 0)}–${pct(TARGETS.win.standard[1], 0)}, ${pct(TARGETS.forked.standard[0], 0)}–${pct(TARGETS.forked.standard[1], 0)}; Hard ${pct(TARGETS.win.hard[0], 0)}–${pct(TARGETS.win.hard[1], 0)}, ${pct(TARGETS.forked.hard[0], 0)}–${pct(TARGETS.forked.hard[1], 0)}. Averages over the seeds.`, "");
  const bl = [];
  for (const kit of ["random", "default"]) {
    const row = [kit === "random" ? "Random kits (the simulator's standard)" : "Default kits (a first-time table)"];
    for (const Lb of LABELS) { const w = seedAvg((s) => lvl(kit, "base", s, Lb, "win")), f = seedAvg((s) => lvl(kit, "base", s, Lb, "forked")); row.push(`${pct(w)}${tick(inBand(w, TARGETS.win[Lb]))} / ${pct(f)}${tick(inBand(f, TARGETS.forked[Lb]))}`); }
    row.push(LABELS.map((Lb) => perSeed((s) => lvl(kit, "base", s, Lb, "win"), (x) => (100 * x).toFixed(1))).join(" ‖ "));
    bl.push(row);
  }
  L.push(table(["Kits", "Easy win / forked", "Standard", "Hard", "Win on each seed: Easy ‖ Standard ‖ Hard"], bl), "");

  L.push("### Every Entity (party of 4)", "");
  for (const kit of ["random", "default"]) {
    L.push(`**${kit === "random" ? "Random kits" : "Default kits"}.** Win rate of a party of 4 that includes the Entity (seed average, then each seed), its Hard forked rate, and the with-vs-without measure the earlier reports use (win points, parties with it against parties without, same label and size, all party sizes).`, "");
    L.push(table(["Entity", "Easy win (per seed)", "Standard", "Hard", "Hard forked", "With vs without"], entBase(kit)), "");
    const ws = (Lb) => ENTS.map((e) => seedAvg((s) => ent(kit, "base", e, s, Lb)));
    L.push(`Spread, highest minus lowest: Easy ${(100 * (Math.max(...ws("easy")) - Math.min(...ws("easy")))).toFixed(1)}, Standard ${(100 * (Math.max(...ws("standard")) - Math.min(...ws("standard")))).toFixed(1)}, Hard ${(100 * (Math.max(...ws("hard")) - Math.min(...ws("hard")))).toFixed(1)} points.`, "");
  }

  L.push("### The towns", "");
  const tb = [];
  for (const [target, nm] of [["hallowby", "Hallowby (Easy)"], ...PREMADE.map((t) => [t.key, `${t.name} (${t.labelName})`])]) {
    for (const kit of ["random", "default"]) { const r = townRow("town", kit, "base", target, `${nm}, ${kit} kits`); if (r) tb.push(r); }
  }
  L.push(table(["Town", "Win", "Forked", "Win on each seed", "Win with 3 · 4 · 5", "Grand Year", "Captures"], tb), "");

  // Per item
  const item = (title, opts, ent, note) => {
    L.push(`## ${title}`, "");
    for (const kit of ["default", "random"]) {
      const os = ["base", ...opts.filter((o) => OPTIONS[o].kits.includes(kit) && get({ kind: "entity", kit, opt: o, target: ent, seed: S[0] }))];
      if (os.length < 2) continue;
      L.push(`**${NAME[ent]}, party of 4, ${kit} kits:**`, "");
      L.push(table(optHead, os.map((o) => optRow(kit, o, ent))), "");
    }
    for (const kit of ["default", "random"]) {
      const os = ["base", ...opts.filter((o) => !OPTIONS[o].pick && OPTIONS[o].kits.includes(kit))];
      const rows = levelRows(kit, os);
      if (rows.length < 2) continue;
      L.push(`**The levels, rolled towns, ${kit} kits** (win / forked, seed average):`, "");
      L.push(table(levelHead, rows), "");
    }
    const hrows = [];
    for (const kit of ["default", "random"]) for (const o of ["base", ...opts]) { if (!OPTIONS[o].kits.includes(kit) || OPTIONS[o].pick) continue; const r = townRow("town", kit, o, "hallowby", `${o === "base" ? "baseline" : o}, ${kit} kits`); if (r) hrows.push(r); }
    if (hrows.length > 1) { L.push("**Hallowby** (Easy targets):", ""); L.push(table(townHead, hrows), ""); }
    if (note) L.push(note, "");
  };

  item("2. Dracula: Hypnotic Eyes, Old Money, Mist", ["aware", "D-a", "D-b", "D-c"], "dracula", hypnoticNote(res, S));
  item("3. Dracula's Wall-Crawler as a pick", ["WC", "WC-b", "WC-d", "WC-e", "W-b", "W-d", "W-e"], "dracula", wallNote(res, S));
  item("4. The Creature: Strong Back", ["C-a", "C-b", "C-c"], "creature", strongNote(res, S));
  item("5. The Mummy: Patience of Ages", ["M-a", "M-b"], "mummy", null);
  item("6. The Invisible Man: Out of Sight", ["I-a"], "invisible", null);
  item("7. The Witch: Broomstick", ["Wi-a", "Wi-b"], "witch", null);

  // G-a
  L.push("## 8. General: a raise on a d12 adds +2 (G-a; +1 as G-b, for context)", "");
  const gens = GENERAL.filter((g) => get({ kind: "rolled", kit: "random", opt: g, seed: S[0] }));
  for (const kit of ["random", "default"]) {
    L.push(`**The levels, rolled towns, ${kit} kits:**`, "");
    L.push(table(levelHead, levelRows(kit, ["base", ...gens])), "");
  }
  for (const kit of ["random", "default"]) {
    L.push(`**Every Entity, party of 4, ${kit} kits** (win today, then Δ against it on the same seeds; Easy / Standard / Hard):`, "");
    const rows = ENTS.map((e) => [NAME[e], LABELS.map((Lb) => pct(seedAvg((s) => ent(kit, "base", e, s, Lb)))).join(" / "),
      ...gens.map((g) => LABELS.map((Lb) => pts(seedAvg((s) => ent(kit, g, e, s, Lb) - ent(kit, "base", e, s, Lb)))).join(" / "))]);
    L.push(table(["Entity", "Today", ...gens.map((g) => `${g} (Δ pts)`)], rows), "");
    const spread = (g) => LABELS.map((Lb) => { const w = ENTS.map((e) => seedAvg((s) => ent(kit, g, e, s, Lb))); return (100 * (Math.max(...w) - Math.min(...w))).toFixed(1); }).join(" / ");
    L.push(`Spread between Entities (highest minus lowest, Easy / Standard / Hard): today ${spread("base")}; ${gens.map((g) => `${g} ${spread(g)}`).join("; ")} points.`, "");
  }
  const trows = [];
  for (const [target, nm] of [["hallowby", "Hallowby"], ...PREMADE.map((t) => [t.key, t.name])]) for (const kit of ["random", "default"]) for (const o of ["base", ...gens]) { const r = townRow("town", kit, o, target, `${nm}, ${o === "base" ? "baseline" : o}, ${kit} kits`); if (r) trows.push(r); }
  L.push("**The towns:**", "", table(townHead, trows), "");
  L.push(raiseNote(res, S), "");

  // Thistlewick
  L.push("## 9. Thistlewick", "");
  const th = Object.keys(THISTLE).map((c) => townRow("thistle", "random", c, "thistlewick", `${c}: ${THISTLE[c].title}`)).filter(Boolean);
  L.push("**Default players, random kits** (Standard targets: win 72–78%, forked 3–7%):", "", table(townHead, th), "");
  const styles = [];
  for (const c of ["T0", "T1", "T2", "T3", "T7"]) for (const [st, nm] of [[undefined, "default players"], ["always", "always go for the furniture"], ["together", "stay together"]]) { const r = townRow("thistle", "random", c, "thistlewick", `${c}, ${nm}`, st); if (r) styles.push(r); }
  if (styles.length) L.push("**Player styles** (as `sim/full-table.mjs` checks every printed town; the styles aren't held to the targets):", "", table(townHead, styles), "");
  const dk = ["T0", "T1", "T2", "T3", "T7"].map((c) => townRow("thistle", "default", c, "thistlewick", `${c}, default kits`)).filter(Boolean);
  if (dk.length) L.push("**Default kits:**", "", table(townHead, dk), "");
  return L.join("\n");
}

function hypnoticNote(res, S) {
  const c = (kit, opt, s) => res[jobId({ kind: "entity", kit, opt, target: "dracula", seed: s })]?.counts ?? {};
  const rows = [];
  for (const kit of ["default", "random"]) for (const opt of ["base", "aware", "D-a"]) {
    const n = S.map((s) => c(kit, opt, s)["tune Hypnotic Eyes: Charm rolls"] ?? 0).reduce((a, b) => a + b, 0);
    const mon = S.map((s) => c(kit, opt, s)["tune Hypnotic Eyes: Monster on Charm"] ?? 0).reduce((a, b) => a + b, 0);
    if (n) rows.push(`${opt} (${kit} kits) ${pct(mon / n, 0)}`);
  }
  return rows.length ? `Dracula with Hypnotic Eyes takes the Monster die on this share of his Charm rolls: ${rows.join("; ")}.` : null;
}
function wallNote(res, S) {
  const c = (opt, s) => res[jobId({ kind: "entity", kit: "default", opt, target: "dracula", seed: s })]?.counts ?? {};
  const n = S.map((s) => c("WC-d", s)["tune Wall-Crawler: Nimble at a way in"] ?? 0).reduce((a, b) => a + b, 0);
  const raids = S.length * 3 * (res.__meta?.entityRuns ?? 0);
  return n && raids ? `With W-d, Dracula rolls Nimble at a way in ${(n / raids).toFixed(2)} times a raid (default kits). "Its lone local chases escaped" is the share of Dracula's own lone local chases he escaped (his Weakness, Garlic, is in play from the first round of every chase).` : null;
}
function strongNote(res, S) {
  const c = (kit, opt, s) => res[jobId({ kind: "entity", kit, opt, target: "creature", seed: s })]?.counts ?? {};
  const raids = S.length * 3 * (res.__meta?.entityRuns ?? 0);
  const out = [];
  for (const kit of ["default", "random"]) {
    const mask = S.map((s) => c(kit, "C-a", s)["tune Strong Back: the Mask while carrying"] ?? 0).reduce((a, b) => a + b, 0);
    const carr = S.map((s) => Object.entries(c(kit, "C-a", s)).filter(([k]) => k.startsWith("tune carrier rolls:") && k.endsWith(":creature")).reduce((a, [, v]) => a + v, 0)).reduce((a, b) => a + b, 0);
    if (raids) out.push(`${kit} kits: the Creature rolls while carrying ${(carr / raids).toFixed(3)} times a raid, and takes the Mask on ${(mask / raids).toFixed(3)} of them a raid under C-a`);
  }
  return out.length ? `How often C-a can matter (party of 4 with the Creature, every label): ${out.join("; ")}.` : null;
}
function raiseNote(res, S) {
  const out = [];
  for (const kit of ["random", "default"]) {
    const tot = {};
    for (const s of S) for (const [k, v] of Object.entries(res[jobId({ kind: "rolled", kit, opt: "base", seed: s })]?.counts ?? {})) tot[k] = (tot[k] ?? 0) + v;
    const sum = (re) => Object.entries(tot).filter(([k]) => re.test(k)).reduce((a, [, v]) => a + v, 0);
    const duty = sum(/^tune raise:duty:/), dutyLost = sum(/^tune raise on a d12:duty:.*lost/);
    const ab = sum(/^tune raise:ability:/), abLost = sum(/^tune raise on a d12:ability:.*lost/);
    const rolls = sum(/^tune rolls:/), d12 = sum(/^tune rolls on a d12:/);
    const raidRolls = sum(/^tune rolls:raid/), raidD12 = sum(/^tune rolls on a d12:raid/);
    if (!rolls) continue;
    const totG = {};
    for (const s of S) for (const [k, v] of Object.entries(res[jobId({ kind: "rolled", kit, opt: "G-a", seed: s })]?.counts ?? {})) totG[k] = (totG[k] ?? 0) + v;
    const sumG = (re) => Object.entries(totG).filter(([k]) => re.test(k)).reduce((a, [, v]) => a + v, 0);
    out.push(`- **${kit} kits, today's rules:** ${pct(d12 / rolls)} of all rolls are made on a d12 trait die (${pct(raidD12 / raidRolls)} of rolls at obstacles). Castle Duty's raise lands on a d12, and is lost, on ${pct(dutyLost / duty)} of the rolls it applies to (${dutyLost.toLocaleString("en-GB")} of ${duty.toLocaleString("en-GB")}). An ability spent as a raise is lost on a d12 on ${pct(abLost / (ab || 1))} of uses (the players don't spend one there unless a step down cancels it). Under G-a, ${sumG(/^tune raise on a d12:.*\(\+2\)/).toLocaleString("en-GB")} raises add +2 (Duty ${sumG(/^tune raise on a d12:duty:.*\(\+2\)/).toLocaleString("en-GB")}, abilities ${sumG(/^tune raise on a d12:ability:.*\(\+2\)/).toLocaleString("en-GB")}) against ${(dutyLost + abLost).toLocaleString("en-GB")} raises lost on a d12 today, over the same ${(S.length * 9 * (res.__meta?.runs ?? 0)).toLocaleString("en-GB")} raids.`);
  }
  return out.join("\n");
}

// ---------------------------------------------------------------- CLI

const here = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === here) {
  const args = process.argv.slice(2);
  const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : d; };
  const runs = Number(opt("--runs", 2000)), entityRuns = Number(opt("--entity-runs", 4000)), townRuns = Number(opt("--town-runs", 3000));
  const seeds = opt("--seeds", "1,7,11").split(",").map(Number);
  const jobs = Number(opt("--jobs", 4));
  const only = opt("--only", null)?.split(",") ?? null;
  const out = opt("--out", null), save = opt("--save", null), from = opt("--from", null);
  const opts = opt("--opts", null)?.split(",") ?? null, mergeFiles = opt("--merge", null)?.split(",") ?? null;
  const one = opt("--job", null), json = opt("--json", null);
  const sizes = { runs, entityRuns, townRuns };
  if (one) {
    writeFileSync(json, JSON.stringify(runJob(JSON.parse(one), sizes)));
  } else {
    let res;
    if (from) res = JSON.parse(readFileSync(from, "utf8"));
    else if (mergeFiles) {
      // several result files (e.g. a later run of extra options, --opts) into one report; the first file's sizes
      res = {};
      for (const f of mergeFiles) { const r = JSON.parse(readFileSync(f, "utf8")); for (const [k, v] of Object.entries(r)) if (!(k in res)) res[k] = v; }
      if (save) writeFileSync(save, JSON.stringify(res));
    } else {
      const list = jobList({ seeds, only, opts });
      const dir = mkdtempSync(join(tmpdir(), "tuning-"));
      res = { __meta: { runs, entityRuns, townRuns, seeds } };
      const queue = list.map((j, i) => ({ j, i }));
      let done = 0;
      const t0 = Date.now();
      const work = async () => {
        while (queue.length) {
          const { j, i } = queue.shift();
          const file = join(dir, `${i}.json`);
          await new Promise((ok, bad) => spawn(process.execPath, [here, "--runs", String(runs), "--entity-runs", String(entityRuns), "--town-runs", String(townRuns), "--job", JSON.stringify(j), "--json", file], { stdio: "inherit" })
            .on("exit", (c) => (c ? bad(new Error(`${jobId(j)} failed`)) : ok())));
          res[jobId(j)] = JSON.parse(readFileSync(file, "utf8"));
          done++;
          if (done % 10 === 0 || done === list.length) console.error(`${done}/${list.length} jobs (${((Date.now() - t0) / 60000).toFixed(1)} min)`);
          if (save && done % 20 === 0) writeFileSync(save, JSON.stringify(res));
        }
      };
      await Promise.all([...Array(Math.min(jobs, list.length))].map(work));
      if (save) writeFileSync(save, JSON.stringify(res));
    }
    const m = res.__meta ?? { runs, entityRuns, townRuns, seeds };
    const text = report(res, m);
    if (out) writeFileSync(out, text);
    else console.log(text);
  }
}

export { jobId, DEMO_FILE };
