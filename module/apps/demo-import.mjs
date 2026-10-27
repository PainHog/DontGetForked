/**
 * DON'T GET FORKED — setting up the ready-made games (GM only)
 * ------------------------------------------------------------
 * The Halloween one-shot (Lantern Night in Hallowby) and the three towns of Chapter 9 ship in this system's
 * compendiums; a world doesn't see them in Actors, Scenes, Journal or Macros until they are imported. Automation first:
 *  - when the active Storyteller opens a world that has none of them yet (the hidden world setting demoImported), a
 *    dialog asks "Set up a ready-made game?" with a tick for each (all ticked): Set it up, Not now, Don't ask
 *    again (which turns the demoPrompt switch off);
 *  - a settings menu (Configure Settings: Set up a ready-made game) sets up any of them, keeping or replacing what is
 *    already there, never doubling it.
 * Each game's documents go into the world in order (its journal first: its map's pins open the journal's pages by
 * id), each kept at its compendium id (keepId and keepEmbeddedIds), into a folder named after its pack (the one-shot's
 * and the shared Entities') or after its town. Which documents, in what order and what happens to those already here
 * is decided by module/logic/demo.mjs.
 */
import { SYSTEM_ID, SETTINGS } from "../contracts.mjs";
import { SETUPS, SETUP_PACKS, DEFAULT_CHOICE, availableSetups, setupSteps, stepIds, packPlan, toCreate, setupHere, shouldOffer, menuChoice, importTotals } from "../logic/demo.mjs";
import { isActiveGM } from "../net/gm-ops.mjs";
import { setting } from "../settings.mjs";
import { t } from "../helpers/i18n.mjs";

const { ApplicationV2, DialogV2 } = foundry.applications.api;

/** One of this system's compendiums, by name (null when it isn't there). */
const packOf = (name) => game.packs?.get?.(`${SYSTEM_ID}.${name}`) ?? null;

/** The games whose packs are all in this system. */
const available = () => availableSetups(SETUP_PACKS.filter((name) => !!packOf(name)));

/** A pack's index entries, with their flags (a town's documents are flagged with its key). */
async function indexOf(pack) {
  const index = await pack.getIndex({ fields: ["flags"] });
  return Array.from(index.values?.() ?? index);
}

/** The world collection a pack's documents go into. */
const worldOf = (pack) => game.collections.get(pack.documentName);

/** Which of these ids are already in the world. */
const inWorld = (pack, ids) => ids.filter((id) => !!worldOf(pack)?.get(id));

/** A top-level folder for the pack's documents: named `name`, or after the pack (reused if it is there, made otherwise). */
async function folderFor(pack, name = null) {
  const folderName = name ?? pack.title ?? pack.metadata?.label ?? pack.metadata?.name;
  const found = game.folders?.find?.((f) => f.type === pack.documentName && f.name === folderName && !f.folder);
  return found ?? Folder.create({ name: folderName, type: pack.documentName, folder: null, sorting: "m" });
}

/** The games that are all in this world already. */
async function gamesHere(keys = available()) {
  const here = [];
  for (const key of keys) {
    const counts = [];
    for (const step of setupSteps([key])) {
      const pack = packOf(step.pack);
      const ids = stepIds(step, await indexOf(pack));
      counts.push([ids.length, inWorld(pack, ids).length]);
    }
    if (setupHere(counts)) here.push(key);
  }
  return here;
}

/** A game's name, for the dialogs and notices. */
const gameName = (key) => t(`DGF.Demo.name.${key}`);

/**
 * Bring ready-made games into the world. `setups`: their keys (module/logic/demo.mjs SETUPS); `mode`: what happens to
 * documents already here, "skip" (keep them, add only what's missing) or "replace" (fresh copies, the same ids). GM
 * only. Marks the world set up. Returns { ok, reason?, setups, packs: [{ pack, setup, created, replaced, skipped }], totals }.
 */
export async function importDemo({ setups = DEFAULT_CHOICE, mode = "skip" } = {}) {
  if (!game.user?.isGM) return { ok: false, reason: "gmOnly" };
  const keys = SETUPS.map((s) => s.key).filter((k) => setups.includes(k));
  if (!keys.length) return { ok: false, reason: "noneChosen" };
  const can = available();
  if (keys.some((k) => !can.includes(k))) return { ok: false, reason: "noPacks" };
  const plans = [];
  for (const step of setupSteps(keys)) {
    const pack = packOf(step.pack);
    const ids = stepIds(step, await indexOf(pack));
    const plan = packPlan(ids, inWorld(pack, ids), mode);
    const create = toCreate(plan, ids);
    for (const id of plan.replace) await worldOf(pack).get(id)?.delete();
    if (create.length) {
      const folder = await folderFor(pack, step.folder);
      if (plan.importAll && !step.only) {
        await pack.importAll({ folderId: folder.id, keepId: true, keepEmbeddedIds: true });
      } else {
        const docs = await pack.getDocuments({ _id__in: create });
        const data = docs.map((doc) => ({ ...worldOf(pack).fromCompendium(doc, { keepId: true, keepEmbeddedIds: true }), folder: folder.id }));
        await pack.documentClass.createDocuments(data, { keepId: true, keepEmbeddedIds: true });
      }
    }
    plans.push({ pack: step.pack, setup: step.setup, ...plan });
  }
  await game.settings.set(SYSTEM_ID, SETTINGS.demoImported, game.system?.version || "imported");
  const totals = importTotals(plans);
  return {
    ok: true, setups: keys,
    packs: plans.map((p) => ({ pack: p.pack, setup: p.setup, created: p.create.length, replaced: p.replace.length, skipped: p.skip.length })),
    totals,
  };
}

/** Tell the Storyteller how it went. */
function report(result) {
  if (result?.ok) ui.notifications.info(t("DGF.Demo.done", { names: result.setups.map(gameName).join(", "), ...result.totals }));
  else if (result?.reason) ui.notifications.warn(t(`DGF.Demo.${result.reason}`));
  return result;
}

/** The dialogs' ticks: one per game, ticked as `ticked` says, those all in the world marked so. */
function choices(keys, ticked = [], here = []) {
  const row = (key) => {
    const s = SETUPS.find((x) => x.key === key);
    const what = t(s.town ? "DGF.Demo.what.town" : "DGF.Demo.what.hallowby");
    const mark = here.includes(key) ? ` <em>${t("DGF.Demo.here")}</em>` : "";
    return `<label class="dgf-check"><input type="checkbox" name="setup.${key}"${ticked.includes(key) ? " checked" : ""}> <strong>${gameName(key)}</strong> (${t(`DGF.Label.${s.label}`)}): ${what}${mark}</label>`;
  };
  return `<div class="dgf-setup-choices">${keys.map(row).join("")}</div>`;
}

/** The games a dialog's form has ticked. */
const tickedIn = (form, keys) => keys.filter((key) => !!form?.elements?.namedItem?.(`setup.${key}`)?.checked);

/**
 * The world opens (the active Storyteller's client, on ready): ask which game to set up if none is here yet. A world
 * that already holds all of a game (imported by hand) counts as set up, and isn't asked.
 * Returns "imported" | "later" | "never" | null (not asked, or nothing set up).
 */
export async function offerDemo() {
  if (!isActiveGM()) return null;
  const can = available();
  const here = can.length ? await gamesHere(can) : [];
  if (here.length && !setting(SETTINGS.demoImported)) await game.settings.set(SYSTEM_ID, SETTINGS.demoImported, game.system?.version || "imported");
  if (!shouldOffer({ isGM: true, promptOn: setting(SETTINGS.demoPrompt), imported: setting(SETTINGS.demoImported), available: can.length, alreadyHere: here.length > 0 })) return null;
  const start = DEFAULT_CHOICE.filter((k) => can.includes(k));
  const answer = await DialogV2.wait({
    window: { title: t("DGF.Demo.title") },
    classes: ["dont-get-forked"],
    content: `<div class="dont-get-forked dgf-dialog"><p>${t("DGF.Demo.text")}</p>${choices(can, start)}</div>`,
    buttons: [
      { action: "import", label: t("DGF.Demo.import"), default: true, callback: (event, button) => ({ action: "import", setups: tickedIn(button.form, can) }) },
      { action: "later", label: t("DGF.Demo.later") },
      { action: "never", label: t("DGF.Demo.never") },
    ],
    rejectClose: false,
  });
  const action = answer && typeof answer === "object" ? answer.action : answer;
  if (action === "never") {
    await game.settings.set(SYSTEM_ID, SETTINGS.demoPrompt, false);
    ui.notifications.info(t("DGF.Demo.neverInfo"));
    return "never";
  }
  if (action !== "import") return "later";
  const result = report(await importDemo({ setups: answer?.setups ?? start, mode: "skip" }));
  return result?.ok ? "imported" : null;
}

/** The settings menu's dialog: tick the games, then keep or replace what is already here. GM only. */
export async function demoImportDialog() {
  if (!game.user?.isGM) return report({ ok: false, reason: "gmOnly" });
  const can = available();
  if (!can.length) return report({ ok: false, reason: "noPacks" });
  const here = await gamesHere(can);
  const start = menuChoice(here, can);
  const read = (mode) => (event, button) => ({ mode, setups: tickedIn(button.form, can) });
  const answer = await DialogV2.wait({
    window: { title: t("DGF.Demo.menuTitle") },
    classes: ["dont-get-forked"],
    content: `<div class="dont-get-forked dgf-dialog"><p>${t("DGF.Demo.againText")}</p>${choices(can, start, here)}</div>`,
    buttons: [
      { action: "skip", label: t("DGF.Demo.skip"), default: true, callback: read("skip") },
      { action: "replace", label: t("DGF.Demo.replace"), callback: read("replace") },
      { action: "cancel", label: t("DGF.Dialog.cancel") },
    ],
    rejectClose: false,
  });
  const mode = answer && typeof answer === "object" ? answer.mode : answer;
  if (mode !== "skip" && mode !== "replace") return null;
  return report(await importDemo({ setups: answer?.setups ?? start, mode }));
}

/**
 * The settings menu (Configure Settings: Set up a ready-made game). Foundry opens a menu by rendering its class; this
 * one shows no window of its own, only the dialog above.
 */
export class DemoImportMenu extends ApplicationV2 {
  static DEFAULT_OPTIONS = { id: "dgf-demo-import", window: { title: "DGF.Demo.menuTitle" } };

  /** @override */
  async render() {
    await demoImportDialog();
    return this;
  }
}
