/**
 * DON'T GET FORKED — setting up the one-shot (pure, Foundry-free)
 * ---------------------------------------------------------------
 * Lantern Night in Hallowby ships in this system's four Demo compendiums (system.json packFolders "Demo"). The
 * Storyteller's client brings them into the world (module/apps/demo-import.mjs): the first time a GM opens a world
 * without them it asks, and a settings menu runs the same import again. This module decides, from ids alone, what an
 * import does, so the Foundry side holds no rules:
 *  - the packs, in import order: the journal first (the scenes' map pins open its pages by id), then the scenes, the
 *    Entities and the macro;
 *  - per pack: nothing of it in the world yet → import it all (keeping ids); some already there → skip those and add
 *    only what's missing, or (mode "replace") delete those and import it all again: never a second copy;
 *  - whether to ask the Storyteller when the world opens.
 */

/** The Demo compendiums, by pack name (system.json packs), in the order they are imported. */
export const DEMO_PACKS = Object.freeze(["demo-journal", "demo-scenes", "demo-entities", "demo-macros"]);

/** What a second import does with documents already in the world: keep them ("skip") or replace them. */
export const IMPORT_MODES = Object.freeze(["skip", "replace"]);

/** The packs' collection ids ("dont-get-forked.demo-journal", …). */
export function demoPackIds(systemId) {
  return DEMO_PACKS.map((name) => `${systemId}.${name}`);
}

/**
 * One pack's import. `ids`: the pack's document ids; `existing`: those of them already in the world (by id: the import
 * keeps ids). Returns { importAll, create, replace, skip }: importAll = bring the whole pack in at once (Foundry's
 * importAll, keeping ids), after deleting `replace`; otherwise create only `create` and leave `skip` as it is.
 */
export function packPlan(ids = [], existing = [], mode = "skip") {
  if (!IMPORT_MODES.includes(mode)) throw new Error(`unknown import mode: ${mode}`);
  const here = new Set(existing);
  const there = ids.filter((id) => here.has(id));
  const missing = ids.filter((id) => !here.has(id));
  if (!there.length) return { importAll: missing.length > 0, create: missing, replace: [], skip: [] };
  if (mode === "replace") return { importAll: true, create: missing, replace: there, skip: [] };
  return { importAll: false, create: missing, replace: [], skip: there };
}

/**
 * Should the Storyteller be asked to set the one-shot up as the world opens? Only the active GM, with the prompt on, the
 * one-shot not imported (nor declined), all four packs present, and not everything of them in the world already
 * (imported by hand earlier: then it counts as imported, `alreadyHere`).
 */
export function shouldOffer({ isGM = false, promptOn = true, imported = "", packsFound = 0, alreadyHere = false } = {}) {
  return !!isGM && !!promptOn && !imported && packsFound === DEMO_PACKS.length && !alreadyHere;
}

/** The import's totals over every pack's plan: { created, replaced, skipped }. */
export function importTotals(plans = []) {
  return plans.reduce((t, p) => ({
    created: t.created + p.create.length, replaced: t.replaced + p.replace.length, skipped: t.skipped + p.skip.length,
  }), { created: 0, replaced: 0, skipped: 0 });
}
