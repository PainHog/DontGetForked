/**
 * The premade towns of Chapter 9 (C21) for the simulator. The towns live in one place,
 * book/src/towns.json, read and checked by book/tools/towns.mjs (the book's town pages
 * and maps are generated from the same loader), so the simulator always plays the towns
 * the book prints.
 *
 * premadeTown(key, numbers) builds the same shape makeTown() returns (sim/town.mjs):
 * one location per list item, its obstacles in order, the first in two versions (`alt`,
 * its two ways in), and the furniture's extra obstacle at its rolled Difficulty (the
 * engine makes it 2 harder when the party takes it on, furnitureRule "noisySlowHard").
 * `furnitureHost` names the location the piece stands at (the engine otherwise picks one
 * at random). A fresh town is built for every raid: the engine marks obstacles cleared.
 */
import { loadTowns } from "../book/tools/towns.mjs";

export const PREMADE = loadTowns();

const obstacle = (o, difficulty = o.difficulty) => ({
  name: o.name,
  options: o.loud ? [{ trait: o.quiet, loud: false }, { trait: o.loud, loud: true }] : [{ trait: o.quiet, loud: false }],
  difficulty,
  witnessed: o.watched,
  group: o.group,
  cleared: false,
  passed: new Set(),
});

export function premadeTown(key, numbers) {
  const t = PREMADE.find((x) => x.key === key);
  if (!t) throw new Error(`no premade town "${key}"; one of ${PREMADE.map((x) => x.key).join(", ")}`);
  const L = numbers.labels[t.label];
  const items = t.locations.map((l, i) => ({ id: `item${i + 1}`, essential: l.essential, kind: l.kind }));
  const locations = t.locations.map((l, i) => {
    const obstacles = [obstacle(l.waysIn[0]), ...l.then.map((o) => obstacle(o))];
    obstacles[0].alt = obstacle(l.waysIn[1]);
    return { id: l.key, kind: l.kind, obstacles, items: [items[i]], furniture: null, done: false };
  });
  const host = t.locations.find((l) => l.furniture);
  const f = host.furniture;
  const furnitureLoc = {
    id: "furniture", kind: host.kind, items: [], done: false,
    obstacles: [obstacle(f.obstacle, f.obstacle.rolled)],
    furniture: { key: f.key, size: f.size },
  };
  return { label: t.label, L, items, locations, furnitureLoc, furnitureHost: host.key, lockup: { id: "lockup", difficulty: L.lockup }, premade: t.key };
}
