/**
 * DON'T GET FORKED — setting up Lantern Night in Hallowby (GM only)
 * -----------------------------------------------------------------
 * The one-shot ships in the system's four Demo compendiums; a world doesn't see them in Actors, Scenes, Journal or
 * Macros until they are imported. Automation first:
 *  - when the active Storyteller opens a world that doesn't have the one-shot yet (the hidden world setting
 *    demoImported), a dialog asks "Set up Lantern Night in Hallowby?": Set it up, Not now, Don't ask again (which turns
 *    the demoPrompt switch off);
 *  - a settings menu (Configure Settings: Set up the one-shot) runs the same import again, keeping or replacing what is
 *    already there, never doubling it.
 * Each pack goes into a folder named after it (an existing one is reused), in order: the journal first, then the scenes
 * (their map pins open the journal's pages by id), the Entities and the macro, each kept at its compendium id
 * (CompendiumCollection#importAll with keepId and keepEmbeddedIds). What to do with each document is decided by
 * module/logic/demo.mjs.
 */
import { SYSTEM_ID, SETTINGS } from "../contracts.mjs";
import { DEMO_PACKS, packPlan, shouldOffer, importTotals } from "../logic/demo.mjs";
import { isActiveGM } from "../net/gm-ops.mjs";
import { setting } from "../settings.mjs";
import { t } from "../helpers/i18n.mjs";

const { ApplicationV2, DialogV2 } = foundry.applications.api;

/** The Demo compendiums this system ships, in import order (the ones found). */
export function demoPacks() {
  return DEMO_PACKS.map((name) => game.packs?.get?.(`${SYSTEM_ID}.${name}`) ?? null).filter(Boolean);
}

/** A pack's document ids (its index). */
async function packIds(pack) {
  const index = await pack.getIndex();
  return Array.from(index.values?.() ?? index).map((e) => e._id);
}

/** The world collection a pack's documents go into. */
const worldOf = (pack) => game.collections.get(pack.documentName);

/** Which of these ids are already in the world. */
const inWorld = (pack, ids) => ids.filter((id) => !!worldOf(pack)?.get(id));

/** The folder named after the pack (reused if it is there at the top level, made otherwise). */
async function folderFor(pack) {
  const name = pack.title ?? pack.metadata?.label ?? pack.metadata?.name;
  const found = game.folders?.find?.((f) => f.type === pack.documentName && f.name === name && !f.folder);
  return found ?? Folder.create({ name, type: pack.documentName, folder: null, sorting: "m" });
}

/**
 * Bring the four Demo compendiums into the world. `mode`: what happens to documents already here, "skip" (keep them,
 * add only what's missing) or "replace" (fresh copies, the same ids). GM only. Marks the one-shot imported.
 * Returns { ok, reason?, packs: [{ pack, created, replaced, skipped }], totals }.
 */
export async function importDemo({ mode = "skip" } = {}) {
  if (!game.user?.isGM) return { ok: false, reason: "gmOnly" };
  const packs = demoPacks();
  if (packs.length < DEMO_PACKS.length) return { ok: false, reason: "noPacks" };
  const plans = [];
  for (const pack of packs) {
    const ids = await packIds(pack);
    const plan = packPlan(ids, inWorld(pack, ids), mode);
    const folder = await folderFor(pack);
    for (const id of plan.replace) await worldOf(pack).get(id)?.delete();
    if (plan.importAll) {
      await pack.importAll({ folderId: folder.id, keepId: true, keepEmbeddedIds: true });
    } else if (plan.create.length) {
      const docs = await pack.getDocuments({ _id__in: plan.create });
      const data = docs.map((doc) => ({ ...worldOf(pack).fromCompendium(doc, { keepId: true, keepEmbeddedIds: true }), folder: folder.id }));
      await pack.documentClass.createDocuments(data, { keepId: true, keepEmbeddedIds: true });
    }
    plans.push({ pack: pack.metadata?.name ?? pack.collection, ...plan });
  }
  await game.settings.set(SYSTEM_ID, SETTINGS.demoImported, game.system?.version || "imported");
  const totals = importTotals(plans);
  return { ok: true, packs: plans.map((p) => ({ pack: p.pack, created: p.create.length, replaced: p.replace.length, skipped: p.skip.length })), totals };
}

/** Tell the Storyteller how it went. */
function report(result) {
  if (result?.ok) ui.notifications.info(t("DGF.Demo.done", result.totals));
  else if (result?.reason) ui.notifications.warn(t(`DGF.Demo.${result.reason}`));
  return result;
}

/**
 * The world opens (the active Storyteller's client, on ready): ask to set up the one-shot if it isn't here yet. A world
 * that already holds every Demo document (imported by hand) counts as set up, and isn't asked.
 * Returns "imported" | "later" | "never" | null (not asked).
 */
export async function offerDemo() {
  if (!isActiveGM()) return null;
  const packs = demoPacks();
  let alreadyHere = false;
  if (packs.length === DEMO_PACKS.length) {
    const counts = await Promise.all(packs.map(async (p) => { const ids = await packIds(p); return [ids.length, inWorld(p, ids).length]; }));
    alreadyHere = counts.every(([n, here]) => n > 0 && here === n);
    if (alreadyHere && !setting(SETTINGS.demoImported)) await game.settings.set(SYSTEM_ID, SETTINGS.demoImported, game.system?.version || "imported");
  }
  if (!shouldOffer({ isGM: true, promptOn: setting(SETTINGS.demoPrompt), imported: setting(SETTINGS.demoImported), packsFound: packs.length, alreadyHere })) return null;
  const answer = await DialogV2.wait({
    window: { title: t("DGF.Demo.title") },
    classes: ["dont-get-forked"],
    content: `<div class="dont-get-forked dgf-dialog"><p>${t("DGF.Demo.text")}</p></div>`,
    buttons: [
      { action: "import", label: t("DGF.Demo.import"), default: true },
      { action: "later", label: t("DGF.Demo.later") },
      { action: "never", label: t("DGF.Demo.never") },
    ],
    rejectClose: false,
  });
  if (answer === "never") {
    await game.settings.set(SYSTEM_ID, SETTINGS.demoPrompt, false);
    ui.notifications.info(t("DGF.Demo.neverInfo"));
    return "never";
  }
  if (answer !== "import") return "later";
  const result = report(await importDemo({ mode: "skip" }));
  return result?.ok ? "imported" : null;
}

/** The settings menu's dialog: import again, keeping or replacing what is already here. GM only. */
export async function demoImportDialog() {
  if (!game.user?.isGM) return report({ ok: false, reason: "gmOnly" });
  if (demoPacks().length < DEMO_PACKS.length) return report({ ok: false, reason: "noPacks" });
  const mode = await DialogV2.wait({
    window: { title: t("DGF.Demo.menuTitle") },
    classes: ["dont-get-forked"],
    content: `<div class="dont-get-forked dgf-dialog"><p>${t("DGF.Demo.againText")}</p></div>`,
    buttons: [
      { action: "skip", label: t("DGF.Demo.skip"), default: true },
      { action: "replace", label: t("DGF.Demo.replace") },
      { action: "cancel", label: t("DGF.Dialog.cancel") },
    ],
    rejectClose: false,
  });
  if (mode !== "skip" && mode !== "replace") return null;
  return report(await importDemo({ mode }));
}

/**
 * The settings menu (Configure Settings: Set up the one-shot). Foundry opens a menu by rendering its class; this one
 * shows no window of its own, only the dialog above.
 */
export class DemoImportMenu extends ApplicationV2 {
  static DEFAULT_OPTIONS = { id: "dgf-demo-import", window: { title: "DGF.Demo.menuTitle" } };

  /** @override */
  async render() {
    await demoImportDialog();
    return this;
  }
}
