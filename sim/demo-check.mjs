/**
 * The Halloween one-shot's town, Hallowby (book/demo/hallowby.json), against the Easy targets, beside Puddlecombe (the
 * book's Easy town), with what a table is likely to meet in it: chases, captures, the final flight. Parties of 3, 4 and
 * 5 Entities (random, the approved roster), the rules as decided and the current numbers, for the default players and
 * for a table that goes for the furniture as soon as it can (a likely Halloween crowd).
 *   node sim/demo-check.mjs [raids per party size] [--seed n] [--out sim/DEMO.md]
 */
import { writeFileSync } from "node:fs";
import { runConfig, SIZES } from "./run.mjs";
import { defaults, NUMBERS, TARGETS } from "./params.mjs";
import { loadTowns } from "../book/tools/towns.mjs";
import { PREMADE, simTown } from "./premade.mjs";

export const DEMO_FILE = new URL("../book/demo/hallowby.json", import.meta.url);
export const [HALLOWBY] = loadTowns(DEMO_FILE);

const pct = (x) => `${(100 * x).toFixed(0)}%`;
const share = (raids, f) => raids.filter(f).length / (raids.length || 1);
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)] ?? 0; };

/** One town, one style of play: the raids, per party size and all together. */
export function playTown(t, { runs = 3000, seed = 1, params = {} } = {}) {
  const { raids } = runConfig({ params: { ...defaults(), ...params }, numbers: NUMBERS, runs, seed, labels: [t.label], townFn: () => simTown(t, NUMBERS) });
  return raids;
}

export function summary(raids) {
  return {
    win: share(raids, (r) => r.win), grand: share(raids, (r) => r.result === "grand"), forked: share(raids, (r) => r.forked),
    chase: share(raids, (r) => r.chases > 0), captured: share(raids, (r) => r.captures > 0), left: share(raids, (r) => r.leftBehind > 0),
    flight: share(raids, (r) => r.flightRounds > 0), byLimit: share(raids, (r) => r.finalTrigger === "limit"), byDawn: share(raids, (r) => r.finalTrigger === "dawn"),
    went: share(raids, (r) => r.wentForFurniture), turns: median(raids.map((r) => r.turnsUsed)),
    susp: raids.reduce((a, r) => a + r.susp, 0) / (raids.length || 1),
  };
}

if (process.argv[1]?.endsWith("demo-check.mjs")) {
  const args = process.argv.slice(2);
  const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : d; };
  const seed = Number(opt("--seed", 1));
  const out = opt("--out", "sim/DEMO.md");
  const runs = Number(args[0] ?? 3000);
  const towns = [HALLOWBY, PREMADE.find((t) => t.key === "puddlecombe")];
  const styles = [["Default players (furniture only when safe)", {}], ["Daredevils (go for the furniture as soon as they can)", { furniturePolicy: "always" }]];
  const band = ([lo, hi]) => `${(100 * lo).toFixed(0)}–${(100 * hi).toFixed(0)}%`;
  const L = [];
  L.push("# The Halloween one-shot: Hallowby, simulated", "");
  L.push(`Command: \`node sim/demo-check.mjs ${runs}\` (seed ${seed}). ${runs.toLocaleString("en-GB")} raids per party size (3, 4 and 5 Entities, random from the approved roster), the rules as decided and the current numbers, on Hallowby (the one-shot's town, book/demo/hallowby.json) and on Puddlecombe (the book's Easy town) for comparison. Easy targets: Win or better ${band(TARGETS.win.easy)}, Forked ${band(TARGETS.forked.easy)}. The simulated players are simpler than people: read these as the shape of the night, not a promise.`, "");
  L.push("| Town | Style | Win or better | Grand Year | Forked | Win with 3 · 4 · 5 | Any local chase | Someone captured · left behind | Final flight (at the Limit · at dawn) | Went for the furniture | Turns used (half by) | Suspicion at the end |");
  L.push("|---|---|---|---|---|---|---|---|---|---|---|---|");
  for (const t of towns) {
    const s = t.stats;
    for (const [name, P] of styles) {
      const raids = playTown(t, { runs, seed, params: P });
      const all = summary(raids);
      const by = SIZES.map((n) => summary(raids.filter((r) => r.size === n)).win);
      const ok = all.win >= TARGETS.win.easy[0] && all.win <= TARGETS.win.easy[1] && all.forked <= TARGETS.forked.easy[1];
      L.push(`| ${t.name} (${s.obstacles} obstacles, mean ${s.mean.toFixed(2)}, ${s.watched} watched) | ${name} | ${pct(all.win)}${P.furniturePolicy || ok ? "" : " ✗"} | ${pct(all.grand)} | ${pct(all.forked)} | ${by.map(pct).join(" · ")} | ${pct(all.chase)} | ${pct(all.captured)} · ${pct(all.left)} | ${pct(all.flight)} (${pct(all.byLimit)} · ${pct(all.byDawn)}) | ${pct(all.went)} | ${all.turns} | ${all.susp.toFixed(1)} |`);
    }
  }
  L.push("", "✗ marks a default-players row outside the Easy targets. A shared chase counts once.", "");
  writeFileSync(out, L.join("\n"));
  console.log(L.join("\n"));
}
