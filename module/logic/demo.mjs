/**
 * DON'T GET FORKED — setting up the ready-made games (pure, Foundry-free)
 * ----------------------------------------------------------------------
 * Four games ship ready to play in this system's compendiums:
 *  - the Halloween one-shot, Lantern Night in Hallowby: the four Demo packs (system.json packFolders "Demo");
 *  - the three towns of Chapter 9, Puddlecombe, Thistlewick and Gallowsmere: each town's entry in the Towns and Guide
 *    journal, its scene and its Start the Raid macro in the Ready-made Towns packs, and the Demo's eight Entities.
 * A world doesn't see them in Actors, Scenes, Journal or Macros until they are imported. The Storyteller's client does
 * it (module/apps/demo-import.mjs): the first time a GM opens a world with none of them it asks which to set up, and a
 * settings menu sets up any of them again. This module decides, from ids and flags alone, what an import does, so the
 * Foundry side holds no rules:
 *  - SETUPS: each game's parts in import order: the journal first (the scenes' map pins open its pages by id), then the
 *    scene, the Entities and the macro. A part is a whole pack, or (`only`) the pack's documents flagged for that game
 *    (flags["dont-get-forked"].setup = its key), since the three towns share their packs;
 *  - the steps for a choice of games: their parts in order, a shared whole pack (the Entities) once;
 *  - per step: nothing of it in the world yet → import it all (keeping ids); some already there → skip those and add
 *    only what's missing, or (mode "replace") delete those and import them all again: never a second copy;
 *  - whether to ask the Storyteller when the world opens, and which games the dialogs tick to start with.
 */
import { FLAG } from "../contracts.mjs";

/** The one-shot's Demo compendiums, by pack name (system.json packs), in the order they are imported. */
export const DEMO_PACKS = Object.freeze(["demo-journal", "demo-scenes", "demo-entities", "demo-macros"]);

/** The three towns of Chapter 9 (book/src/towns.json, in the book's order: Easy, Standard, Hard). */
export const TOWNS = Object.freeze([
  Object.freeze({ key: "puddlecombe", name: "Puddlecombe", label: "easy" }),
  Object.freeze({ key: "thistlewick", name: "Thistlewick", label: "standard" }),
  Object.freeze({ key: "gallowsmere", name: "Gallowsmere", label: "hard" }),
]);

/**
 * Each ready-made game: its key, its level and its parts in import order: { pack, only, folder }. `folder`: the world
 * folder its documents go into, by name (null: a folder named after the pack, as the one-shot's and the shared
 * Entities' are).
 */
export const SETUPS = Object.freeze([
  Object.freeze({ key: "hallowby", name: "Hallowby", label: "easy", town: false, parts: Object.freeze(DEMO_PACKS.map((pack) => Object.freeze({ pack, only: false, folder: null }))) }),
  ...TOWNS.map((t) => Object.freeze({
    key: t.key, name: t.name, label: t.label, town: true,
    parts: Object.freeze([
      Object.freeze({ pack: "journal", only: true, folder: t.name }),
      Object.freeze({ pack: "town-scenes", only: true, folder: t.name }),
      Object.freeze({ pack: "demo-entities", only: false, folder: null }),
      Object.freeze({ pack: "town-macros", only: true, folder: t.name }),
    ]),
  })),
]);

/** Every game's key, in the dialogs' order. */
export const SETUP_KEYS = Object.freeze(SETUPS.map((s) => s.key));
/** Every pack a ready-made game takes documents from. */
export const SETUP_PACKS = Object.freeze([...new Set(SETUPS.flatMap((s) => s.parts.map((p) => p.pack)))]);
/** What the first-run question ticks to start with: every ready-made game, so players can jump straight in (Richard, 2026-10-27). */
export const DEFAULT_CHOICE = Object.freeze(SETUPS.map((s) => s.key));

/** What a second import does with documents already in the world: keep them ("skip") or replace them. */
export const IMPORT_MODES = Object.freeze(["skip", "replace"]);

/** The Demo packs' collection ids ("dont-get-forked.demo-journal", …). */
export function demoPackIds(systemId) {
  return DEMO_PACKS.map((name) => `${systemId}.${name}`);
}

/** The games whose every pack is in the system, given the pack names found. */
export function availableSetups(packsFound = []) {
  return SETUPS.filter((s) => s.parts.every((p) => packsFound.includes(p.pack))).map((s) => s.key);
}

/**
 * The import steps for a choice of games, in order: [{ pack, setup, only, folder }] (`setup`: the game whose flagged
 * documents an `only` step takes). A whole pack two games share (the Entities) comes once, where it first appears.
 * The games come in SETUPS order, whatever order they were chosen in; unknown keys are ignored.
 */
export function setupSteps(keys = []) {
  const steps = [];
  const seen = new Set();
  for (const s of SETUPS.filter((x) => keys.includes(x.key))) {
    for (const p of s.parts) {
      const id = p.only ? `${p.pack}#${s.key}` : p.pack;
      if (seen.has(id)) continue;
      seen.add(id);
      steps.push({ pack: p.pack, setup: s.key, only: p.only, folder: p.folder });
    }
  }
  return steps;
}

/** A step's documents, from its pack's index (entries with _id and flags): all of them, or those flagged for its game. */
export function stepIds(step, index = []) {
  return index.filter((e) => e && (!step.only || e.flags?.[FLAG]?.setup === step.setup)).map((e) => e._id);
}

/**
 * One step's import. `ids`: its documents' ids; `existing`: those of them already in the world (by id: the import
 * keeps ids). Returns { importAll, create, replace, skip }: importAll = bring them all in (keeping ids), after deleting
 * `replace`; otherwise create only `create` and leave `skip` as it is.
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

/** The documents a plan creates: every one of the step's when it imports them all, else only the missing ones. */
export function toCreate(plan, ids = []) {
  return plan.importAll ? [...ids] : [...plan.create];
}

/** Is a game all in the world? `counts`: for each of its steps, [its documents, those of them here]. */
export function setupHere(counts = []) {
  return counts.length > 0 && counts.every(([n, here]) => n > 0 && here === n);
}

/**
 * Should the Storyteller be asked to set a game up as the world opens? Only the active GM, with the prompt on, nothing
 * set up yet (nor declined), at least one game's packs present, and no game all in the world already (imported by
 * hand earlier: then the world counts as set up, `alreadyHere`).
 */
export function shouldOffer({ isGM = false, promptOn = true, imported = "", available = 0, alreadyHere = false } = {}) {
  return !!isGM && !!promptOn && !imported && available > 0 && !alreadyHere;
}

/** The settings menu's starting ticks: the games that aren't all in this world yet. */
export function menuChoice(here = [], available = SETUP_KEYS) {
  return available.filter((k) => !here.includes(k));
}

/** The import's totals over every step's plan: { created, replaced, skipped }. */
export function importTotals(plans = []) {
  return plans.reduce((t, p) => ({
    created: t.created + p.create.length, replaced: t.replaced + p.replace.length, skipped: t.skipped + p.skip.length,
  }), { created: 0, replaced: 0, skipped: 0 });
}
