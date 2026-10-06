/**
 * The premade towns (Chapter 9, decision C21): reads book/src/towns.json, resolves
 * every entry against the approved tables (module/config.mjs DGF, which mirrors
 * Chapter 8) and checks it against Chapter 8's rules for building a town:
 *  - the list: 4 items on Easy, 5 on Standard and Hard; 1, 1–2 or 2 essentials;
 *    each item from the d66 shopping table, at one of its kind's three places;
 *  - each location: 1–3 obstacles, its first in two versions (its two ways in)
 *    whose quiet ways are different traits;
 *  - each obstacle from the d20 obstacle table, with a Difficulty its label's d20 can
 *    roll; at most one Difficulty 12 in an Easy or Standard town, two in a Hard town;
 *  - the furniture: one piece from the d6 table at one of the list's locations, behind
 *    one extra obstacle 2 harder than rolled (at most 12);
 *  - one Lantern Night custom, two villagers (who + what they're doing).
 * The way out, the lock-up, the Limit and the final mob come from the Difficulty table.
 * The book generator (town-pages.mjs) and the simulator (sim/premade.mjs) both read
 * the towns through loadTowns(), so they can't drift apart.
 */
import { readFileSync } from "node:fs";
import { DGF } from "../../module/config.mjs";

export const TOWNS_FILE = new URL("../src/towns.json", import.meta.url);
export const TRAIT_NAME = { brawn: "Brawn", nimble: "Nimble", sly: "Sly", charm: "Charm", wits: "Wits" };
export const LABEL_NAME = { easy: "Easy", standard: "Standard", hard: "Hard" };

/** The faces of a d20 band table (DGF.townDice) that give `result`. */
const rollable = (bands) => [...new Set(bands.map(([, , r]) => r))];

function resolveObstacle(o, label, problems, where) {
  const i = DGF.obstacleTable.findIndex((e) => e.key === o.obstacle);
  if (i < 0) { problems.push(`${where}: no obstacle "${o.obstacle}" on the d20 table`); return null; }
  const e = DGF.obstacleTable[i];
  if (!rollable(DGF.townDice.difficulty[label]).includes(o.difficulty)) problems.push(`${where}: Difficulty ${o.difficulty} can't be rolled in a ${label} town`);
  return {
    key: e.key, d20: i + 1, name: e.name,
    quiet: e.quiet, quietText: e.quietText ?? null, loud: e.loud ?? null, loudText: e.loudText ?? null,
    group: !!e.group, difficulty: o.difficulty, watched: !!o.watched,
  };
}

function resolveTown(t) {
  const problems = [];
  const label = t.label;
  const L = DGF.labels[label];
  if (!L) throw new Error(`${t.key}: unknown label "${label}"`);
  const items = new Set();
  const locations = t.locations.map((l, n) => {
    const where = `${t.key}/${l.key}`;
    const [kindFace, itemFace] = l.item;
    const row = DGF.shoppingTable[kindFace - 1];
    const duty = row && DGF.duties.find((d) => d.key === row.duty);
    if (!row || !row.items[itemFace - 1]) problems.push(`${where}: no item ${kindFace}-${itemFace} on the shopping table`);
    else if (items.has(`${kindFace}-${itemFace}`)) problems.push(`${where}: item ${kindFace}-${itemFace} repeats`);
    items.add(`${kindFace}-${itemFace}`);
    if (duty && !duty.where.split(", ").includes(l.place)) problems.push(`${where}: "${l.place}" is not one of ${duty.kind}'s places (${duty.where})`);
    if (l.waysIn?.length !== 2) problems.push(`${where}: a location has two ways in`);
    const waysIn = (l.waysIn ?? []).map((o, k) => resolveObstacle(o, label, problems, `${where} way in ${k + 1}`));
    const then = (l.then ?? []).map((o, k) => resolveObstacle(o, label, problems, `${where} obstacle ${k + 2}`));
    if (waysIn.length === 2 && waysIn[0] && waysIn[1] && waysIn[0].quiet === waysIn[1].quiet) problems.push(`${where}: the two ways in have the same quiet way`);
    const count = 1 + then.length;
    if (count < 1 || count > 3) problems.push(`${where}: ${count} obstacles (a location has 1–3)`);
    let furniture = null;
    if (l.furniture) {
      const piece = DGF.furniture.find((f) => f.key === l.furniture.piece);
      if (!piece) problems.push(`${where}: no furniture "${l.furniture.piece}"`);
      const ob = resolveObstacle(l.furniture.obstacle, label, problems, `${where} furniture`);
      if (ob) { ob.rolled = ob.difficulty; ob.difficulty = Math.min(DGF.furnitureObstacle.max, ob.rolled + DGF.furnitureObstacle.harder); }
      furniture = piece && { key: piece.key, name: piece.name, size: piece.size, d6: DGF.furniture.indexOf(piece) + 1, obstacle: ob };
    }
    return {
      n: n + 1, key: l.key, place: l.place, kind: row?.duty, kindName: duty?.kind, duty: duty?.name,
      itemFaces: [kindFace, itemFace], item: row?.items[itemFace - 1], essential: !!l.essential,
      waysIn, then, furniture, map: l.map ?? null,
    };
  });

  // The list (Chapter 8, Difficulty table).
  if (locations.length !== L.items) problems.push(`${t.key}: ${locations.length} items (a ${label} list has ${L.items})`);
  const ess = locations.filter((l) => l.essential).length;
  if (!L.essentials.includes(ess)) problems.push(`${t.key}: ${ess} essentials (a ${label} list has ${L.essentials.join(" or ")})`);
  // The furniture: one piece, at one of the list's locations.
  const withFurniture = locations.filter((l) => l.furniture);
  if (withFurniture.length !== 1) problems.push(`${t.key}: ${withFurniture.length} pieces of furniture (a town has one)`);
  // The ceiling on Difficulty 12, counted on the rolled Difficulties (both ways in and the furniture's extra one).
  const rolled = locations.flatMap((l) => [...l.waysIn, ...l.then, ...(l.furniture?.obstacle ? [{ difficulty: l.furniture.obstacle.rolled, watched: l.furniture.obstacle.watched }] : [])]).filter(Boolean);
  const twelves = rolled.filter((o) => o.difficulty === 12).length;
  if (twelves > DGF.townDice.twelves[label]) problems.push(`${t.key}: ${twelves} obstacles at Difficulty 12 (at most ${DGF.townDice.twelves[label]} in a ${label} town)`);

  const custom = DGF.festival.customs.find((c) => c.key === t.custom);
  if (!custom) problems.push(`${t.key}: no custom "${t.custom}"`);
  const villagers = (t.villagers ?? []).map((v) => ({ who: DGF.villagers.who[v.who - 1], doing: DGF.villagers.doing[v.doing - 1], faces: [v.who, v.doing] }));
  if (villagers.length !== 2 || villagers.some((v) => !v.who || !v.doing)) problems.push(`${t.key}: two villagers, each a d6 who and a d6 doing`);

  if (problems.length) throw new Error(`premade town ${t.key} breaks the rules:\n  ${problems.join("\n  ")}`);
  return {
    key: t.key, name: t.name, label, labelName: LABEL_NAME[label], description: t.description,
    custom: custom.text, customD6: DGF.festival.customs.indexOf(custom) + 1, villagers, locations,
    furnitureAt: withFurniture[0].key,
    wayOut: { difficulty: L.exit }, lockup: { difficulty: L.lockup },
    limit: L.limit, finalMob: L.finalMob, map: t.map ?? null,
    stats: {
      obstacles: rolled.length, twelves,
      watched: rolled.filter((o) => o.watched).length,
      mean: rolled.reduce((a, o) => a + o.difficulty, 0) / rolled.length,
    },
  };
}

/** Every premade town, resolved and checked (throws on any broken rule). */
export function loadTowns(file = TOWNS_FILE) {
  const raw = JSON.parse(readFileSync(file, "utf8"));
  return raw.towns.map(resolveTown);
}

/** "Sly (pick the lock)" — a trait, with the table's words for it when there are any. */
export const wayText = (trait, text) => (trait ? `${TRAIT_NAME[trait]}${text ? ` (${text})` : ""}` : "—");
