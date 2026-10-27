/**
 * DON'T GET FORKED — starting a ready-made game's raid (pure, Foundry-free)
 * -------------------------------------------------------------------------
 * Each ready-made game has a macro that starts its raid in one go (the Halloween one-shot's "Hallowby: Start the
 * Raid", and "Puddlecombe: Start the Raid" and the rest for the three towns of Chapter 9). The macro hands
 * game.dontGetForked.raid.start (module/raid/start-raid.mjs) what it asks for:
 *   { town: "Puddlecombe", difficulty: "easy", list: [{ name, duty, essential }, …] }
 * and the raid starts as the Raid HUD's New raid starts one, at the town's level (raid.reset: Suspicion 0, Turn 1, the
 * level's Limit, the furniture not yet taken), then with the town's shopping list and its essentials on the HUD
 * (raid.list "set"). This module checks the request and says which GM operations do it, in order; the Foundry side
 * only runs them.
 */
import { DGF } from "../config.mjs";
import { OPS } from "../contracts.mjs";

/** What a town's macro asks for, from a town as book/tools/towns.mjs resolves it (its name, label and list). */
export function townRaid(town) {
  return {
    town: town.name,
    difficulty: town.label,
    list: town.locations.map((l) => ({ name: l.item, duty: l.kind, essential: !!l.essential })),
  };
}

/**
 * The GM operations that start a ready-made raid, in order: { ok: true, town, difficulty, steps: [{ op, data }] }, or
 * { ok: false, reason } ("badDifficulty": not Easy, Standard or Hard; "badList": no list, or an item without a name or
 * with a kind that isn't one of the Castle Duties').
 */
export function raidStartSteps(spec = {}) {
  const { town = "", difficulty, list } = spec ?? {};
  if (!DGF.labels[difficulty]) return { ok: false, reason: "badDifficulty" };
  if (!Array.isArray(list) || !list.length) return { ok: false, reason: "badList" };
  const duties = new Set(DGF.duties.map((d) => d.key));
  const items = [];
  for (const it of list) {
    if (!it || typeof it.name !== "string" || !it.name.trim() || !duties.has(it.duty)) return { ok: false, reason: "badList" };
    items.push({ name: it.name, duty: it.duty, essential: !!it.essential });
  }
  return {
    ok: true,
    town: String(town ?? ""),
    difficulty,
    steps: [
      { op: OPS.raidReset, data: { difficulty } },
      { op: OPS.raidList, data: { action: "set", list: items } },
    ],
  };
}

/** Does a list keep the book's shape for its level (Chapter 8: its number of items and of essentials)? */
export function listFitsLevel(difficulty, list = []) {
  const L = DGF.labels[difficulty];
  if (!L) return false;
  return list.length === L.items && L.essentials.includes(list.filter((it) => it.essential).length);
}
