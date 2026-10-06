#!/usr/bin/env node
/**
 * Runs the simulator and writes sim/REPORT.md (sim/README.md §7).
 *
 *   node sim/run.mjs                       # P0 (rules as written) + package table + sweeps → sim/REPORT.md
 *   node sim/run.mjs --package T2          # the same for package T2 → sim/REPORT-T2.md
 *   node sim/run.mjs --runs 2000 --sweep-runs 500 --seed 1
 *   node sim/run.mjs --numbers '{"labels":{"hard":{"limit":7}}}'   # try other numbers
 *   node sim/run.mjs --out sim/REPORT-x.md
 *
 * Every raid (label, party size, run index) gets its own seeded streams for the
 * party, the town and the dice, so variants replay the same parties and towns
 * (common random numbers).
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { makeRng } from "./rng.mjs";
import { PARAMS, PRESETS, NUMBERS, TARGETS, PACKAGES, defaults } from "./params.mjs";
import { makeParty, ROSTER, ROSTERS, DUTIES } from "./entities.mjs";
import { makeTown } from "./town.mjs";
import { playRaid } from "./engine.mjs";
import { Recorder } from "./recorder.mjs";
import { GAPS, MODELLED, NOT_MODELLED } from "./notes.mjs";

export const LABELS = ["easy", "standard", "hard"];
export const SIZES = [3, 4, 5];

/** Deep-merge plain objects (for --numbers overrides). */
export function merge(base, over) {
  if (over === null || over === undefined) return base;
  if (typeof over !== "object" || Array.isArray(over)) return over;
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const [k, v] of Object.entries(over)) out[k] = k in out && typeof out[k] === "object" && !Array.isArray(out[k]) ? merge(out[k], v) : v;
  return out;
}

/** Merge numbers, replacing (not merging) each label's Difficulty mix. */
export function mergeNumbers(base, over) {
  const out = merge(base, over);
  for (const src of [over]) {
    if (!src || !src.labels) continue;
    for (const [k, v] of Object.entries(src.labels)) if (v && v.difficulty) out.labels[k].difficulty = { ...v.difficulty };
  }
  return out;
}

/** Play `runs` raids per label × size. Returns per-raid summaries and the recorder.
 *  `townFn(rng, label, numbers)` replaces the random-table town (sim/premade.mjs: a fixed premade town). */
export function runConfig({ params, numbers, runs, seed = 1, labels = LABELS, sizes = SIZES, townFn = null }) {
  const rec = new Recorder();
  const raids = [];
  for (const label of labels) {
    for (const size of sizes) {
      for (let i = 0; i < runs; i++) {
        const rng = makeRng(seed, label, size, i);
        const party = makeParty(rng.fork("party"), size, numbers.charges, (Array.isArray(params.roster) ? params.roster : ROSTERS[params.roster] || ROSTER));
        // campaign upgrades (optional rules): each bonus charge goes to the next Entity in the party
        // (bonusStack: all of them on one Entity instead)
        for (let k = 0; k < (numbers.bonusCharges ?? 0); k++) { const m = party[numbers.bonusStack ? 0 : k % party.length]; m.charges += 1; m.chargesStart += 1; }
        const town = (townFn ?? makeTown)(rng.fork("town"), label, numbers);
        const s = playRaid({ party, town, params, numbers, rng: rng.fork("dice"), rec });
        raids.push({ label, size, i, members: party.map((m) => ({ id: m.id, ent: m.ent, gift: m.gift, perk: m.perk, duty: m.duty })), ...s });
      }
    }
  }
  return { raids, rec };
}

const rate = (xs, f) => (xs.length ? xs.filter(f).length / xs.length : NaN);
const mean = (xs, f) => (xs.length ? xs.reduce((a, x) => a + f(x), 0) / xs.length : NaN);

/** The target metrics and the per-cell tables. */
export function metrics({ raids, rec }, paired = null) {
  const out = { byLabel: {}, bySize: {} };
  for (const L of LABELS) {
    const xs = raids.filter((r) => r.label === L);
    if (!xs.length) continue;
    out.byLabel[L] = cell(xs);
    out.bySize[L] = {};
    for (const n of SIZES) {
      const ys = xs.filter((r) => r.size === n);
      if (ys.length) out.bySize[L][n] = cell(ys);
    }
  }
  const all = rec.rollTotals();
  const raid = rec.rollTotals(["raid", "slip"]);
  const choice = rec.rollTotals(["raid", "slip", "local"]);
  out.rolls = {
    perRaid: all.n / raids.length,
    trouble: all.trouble / all.n, cost: all.cost / all.n, success: all.success / all.n,
    critDoubles: all.critDoubles / all.n, critBeat4: all.critBeat4 / all.n,
    mask: all.mask / all.n, monster: all.monster / all.n,
    maskRaid: raid.n ? raid.mask / raid.n : NaN, monsterRaid: raid.n ? raid.monster / raid.n : NaN,
    maskChoice: choice.n ? choice.mask / choice.n : NaN,
    showPerMonster: all.monster ? all.show / all.monster : NaN,
  };
  const spends = raids.flatMap((r) => r.spend);
  out.spendHalf = rate(spends, (s) => s.frac >= 0.5);
  out.spendMean = mean(spends, (s) => s.frac);
  const went = raids.filter((r) => r.wentForFurniture);
  out.furniture = { went: went.length / raids.length, grandGivenWent: rate(went, (r) => r.result === "grand") };
  if (paired) {
    const key = (r) => `${r.label}|${r.size}|${r.i}`;
    const base = new Map(paired.raids.map((r) => [key(r), r]));
    const ws = went.map((r) => ({ r, b: base.get(key(r)) })).filter((x) => x.b);
    out.furniture.dropBelowWin = rate(ws, (x) => x.b.win && !x.r.win);
  }
  out.outliers = outliers(raids);
  return out;
}

function cell(xs) {
  return {
    n: xs.length,
    win: rate(xs, (r) => r.win), grand: rate(xs, (r) => r.result === "grand"),
    partial: rate(xs, (r) => r.result === "partial"), bust: rate(xs, (r) => r.result === "bust"),
    forked: rate(xs, (r) => r.forked),
    captures: mean(xs, (r) => r.captures), leftBehind: mean(xs, (r) => r.leftBehind),
    finalLimit: rate(xs, (r) => r.finalTrigger === "limit"), finalDawn: rate(xs, (r) => r.finalTrigger === "dawn"),
    susp: mean(xs, (r) => r.susp), turns: mean(xs, (r) => r.turnsUsed),
  };
}

/**
 * Win-rate Δ for raids whose party includes X vs raids that don't, averaged over
 * label × size cells (so it compares like with like). Gifts compare against the
 * same Entity's other Gifts.
 */
function outliers(raids) {
  const cells = new Map();
  for (const r of raids) {
    const k = `${r.label}|${r.size}`;
    if (!cells.has(k)) cells.set(k, []);
    cells.get(k).push(r);
  }
  const deltas = (has, within = () => true) => {
    let sum = 0, w = 0;
    for (const xs of cells.values()) {
      const pool = xs.filter(within);
      const a = pool.filter(has), b = pool.filter((r) => !has(r));
      if (a.length < 20 || b.length < 20) continue;
      sum += (rate(a, (r) => r.win) - rate(b, (r) => r.win)) * pool.length;
      w += pool.length;
    }
    return w ? sum / w : NaN;
  };
  const res = [];
  const ids = [...new Set(raids.flatMap((r) => r.members.map((m) => m.id)))];
  for (const e of ids.map((id) => raids.flatMap((r) => r.members).find((m) => m.id === id).ent)) {
    res.push({ what: `entity ${e.id}`, delta: deltas((r) => r.members.some((m) => m.id === e.id)) });
    for (const g of e.giftOptions) {
      res.push({ what: `gift ${e.id}:${g.name ?? g}`, delta: deltas((r) => r.members.some((m) => m.id === e.id && m.gift === g), (r) => r.members.some((m) => m.id === e.id)) });
    }
    for (const k of e.perkOptions ?? []) {
      res.push({ what: `perk ${e.id}:${k}`, delta: deltas((r) => r.members.some((m) => m.id === e.id && m.perk === k), (r) => r.members.some((m) => m.id === e.id)) });
    }
  }
  for (const d of DUTIES) res.push({ what: `duty ${d}`, delta: deltas((r) => r.members.some((m) => m.duty === d)) });
  return res;
}

// ---------------------------------------------------------------- report

const pct = (x, d = 1) => (Number.isFinite(x) ? `${(100 * x).toFixed(d)}%` : "—");
const num = (x, d = 2) => (Number.isFinite(x) ? x.toFixed(d) : "—");
const inBand = (x, [lo, hi]) => x >= lo && x <= hi;
const mark = (ok) => (ok ? "✓" : "✗");

function targetRows(M) {
  const T = TARGETS;
  const rows = [];
  for (const L of LABELS) rows.push([`Win, ${L}`, `${pct(T.win[L][0], 0)}–${pct(T.win[L][1], 0)}`, pct(M.byLabel[L].win), mark(inBand(M.byLabel[L].win, T.win[L]))]);
  for (const L of LABELS) rows.push([`Forked, ${L}`, `${pct(T.forked[L][0], 0)}–${pct(T.forked[L][1], 0)}`, pct(M.byLabel[L].forked), mark(inBand(M.byLabel[L].forked, T.forked[L]))]);
  rows.push(["Captures per Hard raid", `≥ ${T.hardCaptures}`, num(M.byLabel.hard.captures), mark(M.byLabel.hard.captures >= T.hardCaptures)]);
  rows.push(["Grand Year when the party goes for furniture", `~${pct(T.grandYear.reach, 0)}`, pct(M.furniture.grandGivenWent), mark(Math.abs(M.furniture.grandGivenWent - T.grandYear.reach) <= 0.1)]);
  rows.push(["Going for furniture costs the Win", `~${pct(T.grandYear.dropBelowWin, 0)}`, pct(M.furniture.dropBelowWin), mark(Math.abs(M.furniture.dropBelowWin - T.grandYear.dropBelowWin) <= 0.07)]);
  rows.push(["Trouble, share of rolls", `${pct(T.trouble[0], 0)}–${pct(T.trouble[1], 0)}`, pct(M.rolls.trouble), mark(inBand(M.rolls.trouble, T.trouble))]);
  rows.push(["Critical (doubles on a Success, S8), share of rolls", `${pct(T.critical[0], 0)}–${pct(T.critical[1], 0)}`, pct(M.rolls.critDoubles), mark(inBand(M.rolls.critDoubles, T.critical))]);
  rows.push(["Entities spending ≥ half their charges", `≥ ${pct(T.spendHalf, 0)}`, pct(M.spendHalf), mark(M.spendHalf >= T.spendHalf)]);
  // S1: the Mask is off in the final flight, so the choice is measured on the rolls where it exists.
  rows.push(["Mask, share of rolls where you choose (all rolls)", "≥ 25%", `${pct(M.rolls.maskChoice)} (${pct(M.rolls.mask)})`, mark(M.rolls.maskChoice >= T.mask)]);
  rows.push(["Monster, share of rolls where you choose (all rolls)", "≥ 25%", `${pct(1 - M.rolls.maskChoice)} (${pct(M.rolls.monster)})`, mark(1 - M.rolls.maskChoice >= T.monster)]);
  const worst = M.outliers.filter((o) => Number.isFinite(o.delta)).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))[0];
  rows.push(["Largest option outlier", "within ±2.5 pts", worst ? `${worst.what} ${(100 * worst.delta).toFixed(1)} pts` : "—", mark(!worst || Math.abs(worst.delta) <= T.outlier)]);
  return rows;
}

function table(head, rows) {
  return [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
}

function sweepRow(name, M, B) {
  const d = (L) => {
    const x = M.byLabel[L].win - B.byLabel[L].win;
    return `${pct(M.byLabel[L].win, 0)} (${x >= 0 ? "+" : ""}${(100 * x).toFixed(1)})`;
  };
  return [name, d("easy"), d("standard"), d("hard"), pct(M.byLabel.hard.forked), num(M.byLabel.hard.captures), pct(M.rolls.mask, 0)];
}

export function writeReport({ cmd, pkg, base, baseM, presets, sweeps, numbers, runs, sweepRuns, out, packages, furniture }) {
  const lines = [];
  lines.push(`# Don't Get Forked — simulator report: ${pkg} (core rules 1.21)`, "");
  lines.push(`Command: \`${cmd}\``, "");
  lines.push(`${runs} raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; ${sweepRuns} for the presets and sweeps. Same seed → same report.`, "");
  lines.push("**The Entities are the approved roster** (dice, signatures, Gifts, Perks and Weakness timings read from `module/config.mjs`); towns are rolled with the book's town tables (`sim/town.mjs`). Players follow the policies in `sim/params.mjs`, which are simpler than real play.", "");

  if (packages) {
    lines.push("## Packages", "");
    lines.push(Object.entries(PACKAGES).map(([k, p]) => `- **${k}**: ${p.title}.`).join("\n"), "");
    const T = TARGETS;
    const head = ["Package", "Easy win", "Standard win", "Hard win", "Forked E · S · H", "Hard captures", "Grand Year when tried", "Trouble", "Mask (raid rolls)", "Spend ≥ ½", "Hard win, 3 · 4 · 5 Entities"];
    const trow = ["**target**", "87–93%", "72–78%", "55–60%", "≤2 · 3–7 · 8–12%", `≥ ${T.hardCaptures}`, "~50%", "10–20%", "≥ 25%", "≥ 50%", "close together"];
    const prow = Object.entries(packages).map(([k, M]) => [k, pct(M.byLabel.easy.win), pct(M.byLabel.standard.win), pct(M.byLabel.hard.win),
      `${pct(M.byLabel.easy.forked)} · ${pct(M.byLabel.standard.forked)} · ${pct(M.byLabel.hard.forked)}`, num(M.byLabel.hard.captures),
      pct(M.furniture.grandGivenWent), pct(M.rolls.trouble), pct(M.rolls.maskRaid), pct(M.spendHalf),
      SIZES.map((n) => pct(M.bySize.hard[n].win, 0)).join(" · ")]);
    lines.push(table(head, [trow, ...prow]), "");
  }

  lines.push(`## ${pkg} against the targets`, "");
  lines.push(table(["Measure", "Target", "Simulated", ""], targetRows(baseM)), "");

  lines.push("## Results by label and party size", "");
  const rows = [];
  for (const L of LABELS) for (const n of SIZES) {
    const c = baseM.bySize[L][n];
    rows.push([L, n, pct(c.win), pct(c.grand), pct(c.partial), pct(c.bust), pct(c.forked), num(c.captures), num(c.leftBehind), pct(c.finalLimit, 0), pct(c.finalDawn, 0), num(c.susp, 1), num(c.turns, 1)]);
  }
  lines.push(table(["Label", "Entities", "Win", "of which Grand", "Partial", "Bust", "Forked", "Captures", "Left behind", "Final flight: Limit", "Final flight: dawn", "Suspicion at end", "Turns used"], rows), "");

  lines.push("## Dice", "");
  const R = baseM.rolls;
  lines.push(table(["Rolls per raid", "Success", "Cost", "Trouble", "Crit (doubles)", "Crit (beat 4)", "Mask", "Monster", "Monster shows (per Monster roll)", "Charges spent (mean)"],
    [[num(R.perRaid, 1), pct(R.success), pct(R.cost), pct(R.trouble), pct(R.critDoubles), pct(R.critBeat4), pct(R.mask), pct(R.monster), pct(R.showPerMonster), pct(baseM.spendMean)]]), "");

  lines.push("**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):", "");
  const mg = base.rec.rollTotals();
  const beat = (k) => Object.entries(mg.margin).filter(([m]) => Number(m) >= k).reduce((a, [, v]) => a + v, 0) / mg.n;
  lines.push(table(["Doubles on a Success", "Beat by 4", "Beat by 5", "Beat by 6", "Beat by 7", "Beat by 8"], [[pct(mg.critDoubles / mg.n), pct(beat(4)), pct(beat(5)), pct(beat(6)), pct(beat(7)), pct(beat(8))]]), "");

  if (furniture) {
    lines.push("## Furniture: how the party's appetite changes the gamble", "");
    lines.push(table(["Policy", "Goes for it", "Grand Year when tried", "Tried and lost a Win it had", "Easy win", "Standard win", "Hard win"],
      Object.entries(furniture).map(([k, M]) => [k, pct(M.furniture.went), pct(M.furniture.grandGivenWent), pct(M.furniture.dropBelowWin), pct(M.byLabel.easy.win), pct(M.byLabel.standard.win), pct(M.byLabel.hard.win)])), "");
    lines.push("\"Tried and lost a Win it had\" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.", "");
  }

  lines.push("## Presets: every ambiguous rule for or against the players", "");
  lines.push("Where a number moves a lot between generous and strict, the rules are underspecified there.", "");
  lines.push(table(["Reading", "Easy win", "Standard win", "Hard win", "Hard forked", "Hard captures", "Mask"],
    [sweepRow("baseline", baseM, baseM), ...Object.entries(presets).map(([k, M]) => sweepRow(k, M, baseM))]), "");

  lines.push("## Sweeps: what each judgement call is worth", "");
  lines.push("Win rate (points vs the baseline at the same run count). Rules first, then player policies, then content.", "");
  const sw = [];
  for (const s of sweeps) sw.push(sweepRow(`${s.key} = ${JSON.stringify(s.value)}${s.key in PARAMS ? ` (${PARAMS[s.key].kind})` : ""}`, s.M, s.B));
  lines.push(table(["Variant", "Easy win", "Standard win", "Hard win", "Hard forked", "Hard captures", "Mask"], sw), "");

  lines.push("## Option outliers (win Δ, parties with vs without, same label and size)", "");
  const outl = baseM.outliers.filter((o) => Number.isFinite(o.delta)).sort((a, b) => b.delta - a.delta);
  lines.push(outl.map((o) => `${o.what} ${o.delta >= 0 ? "+" : ""}${(100 * o.delta).toFixed(1)}`).join(" · "), "");

  lines.push("## Detectors", "");
  const det = Object.entries(base.rec.detectors).sort((a, b) => b[1] - a[1]);
  lines.push(det.length ? table(["Detector", "Count", "Per raid"], det.map(([k, v]) => [k, v, num(v / base.raids.length, 3)])) : "None fired.", "");

  lines.push("## Counts (baseline)", "");
  const cnt = Object.entries(base.rec.counts).sort((a, b) => a[0].localeCompare(b[0]));
  lines.push(table(["Event", "Per raid"], cnt.map(([k, v]) => [k, num(v / base.raids.length, 3)])), "");

  lines.push("## Rule gaps found while building the simulator", "");
  lines.push(table(["#", "Gap", "Where", "Parameter", "Note"], GAPS.map((g) => [g.id, g.title, g.ref, g.param ? `\`${g.param}\`` : "—", g.note])), "");

  lines.push("## What is modelled", "", ...MODELLED.map((x) => `- ${x}`), "", "## Not modelled", "", ...NOT_MODELLED.map((x) => `- ${x}`), "");

  lines.push("## Numbers used", "", "```json", JSON.stringify(numbers, null, 1), "```", "");
  writeFileSync(out, lines.join("\n"));
}

// ---------------------------------------------------------------- CLI

function args(argv) {
  const a = { runs: 2000, sweepRuns: 500, seed: 1, numbers: null, out: null, noSweeps: false, noPackages: false, pkg: "P0" };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--runs") a.runs = Number(argv[++i]);
    else if (k === "--sweep-runs") a.sweepRuns = Number(argv[++i]);
    else if (k === "--seed") a.seed = Number(argv[++i]);
    else if (k === "--numbers") a.numbers = JSON.parse(argv[++i]);
    else if (k === "--out") a.out = argv[++i];
    else if (k === "--no-sweeps") a.noSweeps = true;
    else if (k === "--no-packages") a.noPackages = true;
    else if (k === "--package") a.pkg = argv[++i];
  }
  return a;
}

async function main() {
  const a = args(process.argv.slice(2));
  const pk = PACKAGES[a.pkg];
  if (!pk) throw new Error(`unknown package ${a.pkg}; one of ${Object.keys(PACKAGES)}`);
  const numbers = mergeNumbers(mergeNumbers(NUMBERS, pk.numbers), a.numbers);
  const P = { ...defaults(), ...pk.params };
  const cfg = (params, runs) => runConfig({ params, numbers, runs, seed: a.seed });
  const base = cfg(P, a.runs);
  const never = cfg({ ...P, furniturePolicy: "never" }, a.runs);
  const baseM = metrics(base, never);
  const furniture = { ifSafe: P.furniturePolicy === "ifSafe" ? baseM : metrics(cfg({ ...P, furniturePolicy: "ifSafe" }, a.runs), never) };
  furniture.always = metrics(cfg({ ...P, furniturePolicy: "always" }, a.runs), never);
  const packages = {};
  if (!a.noPackages) {
    for (const [k, p] of Object.entries(PACKAGES)) {
      if (k === a.pkg && !a.numbers) { packages[k] = baseM; continue; }
      const nb = mergeNumbers(NUMBERS, p.numbers);
      const pp = { ...defaults(), ...p.params };
      const run = (params) => runConfig({ params, numbers: nb, runs: a.runs, seed: a.seed });
      packages[k] = metrics(run(pp), run({ ...pp, furniturePolicy: "never" }));
    }
  }
  const presets = {};
  const sweeps = [];
  if (!a.noSweeps) {
    const B = metrics(cfg(P, a.sweepRuns));
    for (const [k, p] of Object.entries(PRESETS)) presets[k] = metrics(cfg({ ...P, ...p }, a.sweepRuns));
    for (const [key, def] of Object.entries(PARAMS)) {
      for (const value of def.values) {
        if (value === def.default) continue;
        sweeps.push({ key, value, M: metrics(cfg({ ...P, [key]: value }, a.sweepRuns)), B });
      }
    }
  }
  const cmd = `node sim/run.mjs ${process.argv.slice(2).join(" ")}`.trim();
  const out = a.out || (a.pkg === "P0" ? "sim/REPORT.md" : `sim/REPORT-${a.pkg}.md`);
  writeReport({ cmd, pkg: `${a.pkg} — ${pk.title}`, base, baseM, presets, sweeps, numbers, runs: a.runs, sweepRuns: a.sweepRuns, out, packages: a.noPackages ? null : packages, furniture });
  for (const r of targetRows(baseM)) console.log(r.join("  "));
  console.log(`wrote ${out}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main();
