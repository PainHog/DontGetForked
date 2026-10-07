/**
 * Full table: five Entities, played on the three premade towns and on rolled towns, with the spread of what a group
 * can meet (endings, length, chases, captures, the final flight, charges), for the default players and a few styles.
 *   node sim/full-table.mjs [raids per town] [--seed n] [--out sim/FULL-TABLE.md]
 */
import { writeFileSync } from "node:fs";
import { runConfig } from "./run.mjs";
import { defaults, NUMBERS } from "./params.mjs";
import { PREMADE, premadeTown } from "./premade.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : d; };
const seed = Number(opt("--seed", 1));
const out = opt("--out", "sim/FULL-TABLE.md");
const runs = Number(args[0] ?? 6000);

const TOWNS = [
  ...PREMADE.map((t) => ({ name: `${t.name} (${t.labelName})`, label: t.label, townFn: () => premadeTown(t.key, NUMBERS) })),
  { name: "A rolled Easy town", label: "easy", townFn: null },
  { name: "A rolled Standard town", label: "standard", townFn: null },
  { name: "A rolled Hard town", label: "hard", townFn: null },
];
const STYLES = [
  ["Default players (split up; furniture only when safe)", {}],
  ["Cautious (never go for the furniture)", { furniturePolicy: "never" }],
  ["Daredevils (go for the furniture as soon as the essentials are in hand)", { furniturePolicy: "always" }],
  ["Stay together (the party never splits)", { partyPolicy: "together" }],
];

const pct = (x) => `${(100 * x).toFixed(0)}%`;
const q = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1);

function play(town, params, n) {
  return runConfig({ params: { ...defaults(), ...params }, numbers: NUMBERS, runs: n, seed, labels: [town.label], sizes: [5], townFn: town.townFn }).raids;
}

function row(raids) {
  const share = (f) => raids.filter(f).length / raids.length;
  const flights = raids.filter((r) => r.flightRounds > 0);
  return {
    grand: share((r) => r.result === "grand"), win: share((r) => r.result === "win"), partial: share((r) => r.result === "partial"),
    bust: share((r) => r.result === "bust"), forked: share((r) => r.result === "forked"),
    turns: [q(raids.map((r) => r.turnsUsed), 0.1), q(raids.map((r) => r.turnsUsed), 0.5), q(raids.map((r) => r.turnsUsed), 0.9)],
    byLimit: share((r) => r.finalTrigger === "limit"), byDawn: share((r) => r.finalTrigger === "dawn"),
    chase1: share((r) => r.chases > 0), chases: mean(raids.map((r) => r.chases)), chase3: share((r) => r.chases >= 3),
    flight: flights.length / raids.length, flightMed: flights.length ? q(flights.map((r) => r.flightRounds), 0.5) : 0, flightP90: flights.length ? q(flights.map((r) => r.flightRounds), 0.9) : 0,
    captures: mean(raids.map((r) => r.captures)), captured1: share((r) => r.captures > 0), left: share((r) => r.leftBehind > 0),
    susp: mean(raids.map((r) => r.susp)), went: share((r) => r.wentForFurniture),
    spent: mean(raids.flatMap((r) => r.spend.map((s) => s.frac))), unspentAll: mean(raids.map((r) => r.spend.filter((s) => s.frac === 0).length)),
  };
}

const L = [];
L.push("# Don't Get Forked — a full table (five players), simulated", "");
L.push(`Command: \`node sim/full-table.mjs ${runs}\` (seed ${seed}). ${runs.toLocaleString("en-GB")} raids per town with five Entities (random, the approved roster), the rules as decided and the current numbers; ${Math.round(runs / 2).toLocaleString("en-GB")} per town for each other style of play. The simulated players are simpler than people (sim/params.mjs): read these as the shape of what a table meets, not a promise.`, "");
L.push("## What a five-player night looks like", "");
L.push("| Town | Grand Year | Win | Partial | Bust | Forked | Turns used (1 in 10 · half · 9 in 10 by) | Ends at the Limit · at dawn | Any local chase · 3 or more · per night | Final flight (rounds: half by · 9 in 10 by) | Someone captured · left behind | Suspicion at the end | Charges spent · Entities with none spent |");
L.push("|---|---|---|---|---|---|---|---|---|---|---|---|---|");
const base = {};
for (const t of TOWNS) {
  const r = row(play(t, {}, runs)); base[t.name] = r;
  L.push(`| ${t.name} | ${pct(r.grand)} | ${pct(r.win)} | ${pct(r.partial)} | ${pct(r.bust)} | ${pct(r.forked)} | ${r.turns.join(" · ")} | ${pct(r.byLimit)} · ${pct(r.byDawn)} | ${pct(r.chase1)} · ${pct(r.chase3)} · ${r.chases.toFixed(1)} | ${pct(r.flight)} (${r.flightMed} · ${r.flightP90}) | ${pct(r.captured1)} · ${pct(r.left)} | ${r.susp.toFixed(1)} | ${pct(r.spent)} · ${r.unspentAll.toFixed(1)} of 5 |`);
}
L.push("", "Win is a Win without the furniture; a Grand Year is a Win with it. \"Ends at the Limit · at dawn\": how often the night ends in a final flight because Suspicion hit the Limit, or because the 12th Turn ended; the rest leave by the way out. A shared chase counts once.", "");
L.push("## How the style of play changes it", "");
L.push("| Town | Style | Grand Year | Win or better | Forked | Turns used (half by) | Any local chase | Someone left behind |");
L.push("|---|---|---|---|---|---|---|---|");
for (const t of TOWNS) {
  for (const [name, P] of STYLES) {
    const r = name.startsWith("Default") ? base[t.name] : row(play(t, P, Math.round(runs / 2)));
    L.push(`| ${t.name} | ${name} | ${pct(r.grand)} | ${pct(r.grand + r.win)} | ${pct(r.forked)} | ${r.turns[1]} | ${pct(r.chase1)} | ${pct(r.left)} |`);
  }
}
L.push("");
writeFileSync(out, L.join("\n"));
console.log(L.join("\n"));
