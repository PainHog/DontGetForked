/**
 * DON'T GET FORKED — the Storyteller's raid dialogs (DialogV2)
 * ------------------------------------------------------------
 * The forms behind the Raid HUD's Storyteller buttons: open a group check, make
 * a Tell check, roll the shopping list, and say what came home at the end of the
 * raid. Each form only collects choices and sends one GM operation; the rules
 * are in module/logic/ (checks.mjs, year.mjs) and module/raid/raid-checks.mjs.
 */
import { SYSTEM_ID, OPS } from "../contracts.mjs";
import { DGF } from "../config.mjs";
import { isCaptive } from "../logic/lockup.mjs";
import { listShape } from "../logic/year.mjs";
import { runOp } from "../net/gm-ops.mjs";
import { getRaid } from "../raid/store.mjs";
import { entities } from "../raid/chase-flow.mjs";
import { yearDefaults } from "../raid/raid-checks.mjs";
import { t } from "../helpers/i18n.mjs";

const PICK_TEMPLATE = `systems/${SYSTEM_ID}/templates/apps/pick-entities.hbs`;
const YEAR_TEMPLATE = `systems/${SYSTEM_ID}/templates/apps/end-raid.hbs`;
const render = (tpl, ctx) => foundry.applications.handlebars.renderTemplate(tpl, ctx);
const field = (form, name) => form?.elements?.namedItem?.(name) ?? null;
const ticked = (form, name) => !!field(form, name)?.checked;

async function ask({ title, content, okLabel, read }) {
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title },
    classes: ["dont-get-forked", "dgf-raid-dialog"],
    content,
    buttons: [
      { action: "ok", label: okLabel, default: true, callback: (event, button) => read(button.form) },
      { action: "cancel", label: t("DGF.Dialog.cancel") },
    ],
    rejectClose: false,
  });
  return answer && typeof answer === "object" ? answer : null;
}

/** The free Entities as checkboxes (all ticked to start with). */
const freeEntities = () => entities().filter((a) => !isCaptive(a.system)).map((a) => ({ id: a.id, name: a.name, checked: true }));

/** Open a group check: who rolls the group obstacle together, and what it is. */
export async function groupCheckDialog() {
  if (!game.user?.isGM) return null;
  const list = freeEntities();
  const content = await render(PICK_TEMPLATE, { intro: t("DGF.Group.intro"), entities: list, placeLabel: t("DGF.Group.what"), placeHint: t("DGF.Group.whatHint") });
  const answer = await ask({
    title: t("DGF.Group.title"), content, okLabel: t("DGF.Group.open"),
    read: (form) => ({ members: list.filter((e) => ticked(form, `entity.${e.id}`)).map((e) => e.id), label: String(field(form, "place")?.value ?? "").trim() }),
  });
  if (!answer) return null;
  return runOp(OPS.raidGroup, { action: "open", ...answer });
}

/** A Tell check: who is arriving at which watched location. */
export async function tellCheckDialog() {
  if (!game.user?.isGM) return null;
  const list = freeEntities();
  const checked = getRaid().tells.map((x) => x.place).filter(Boolean);
  const content = await render(PICK_TEMPLATE, {
    intro: t("DGF.Tell.intro"), entities: list, placeLabel: t("DGF.Tell.where"), placeHint: t("DGF.Tell.whereHint"),
    already: checked.length ? t("DGF.Tell.already", { places: checked.join(", ") }) : "",
  });
  const answer = await ask({
    title: t("DGF.Tell.title"), content, okLabel: t("DGF.Tell.check"),
    read: (form) => ({ arriving: list.filter((e) => ticked(form, `entity.${e.id}`)).map((e) => e.id), place: String(field(form, "place")?.value ?? "").trim() }),
  });
  if (!answer) return null;
  const result = await runOp(OPS.raidTell, answer);
  if (result?.ok === false) ui.notifications.warn(t(`DGF.Tell.refused.${result.reason}`));
  return result;
}

/** The shopping list: roll it on the d66 table (how many essentials, when the label lets you choose), or clear it. */
export async function shoppingListDialog() {
  if (!game.user?.isGM) return null;
  const raid = getRaid();
  const shape = listShape(raid.difficulty);
  const options = shape.essentials.map((n) => `<option value="${n}">${n}</option>`).join("");
  const current = raid.list.length ? `<ul>${raid.list.map((it) => `<li>${foundry.utils.escapeHTML(it.name)}${it.essential ? ` (${t("DGF.List.essential")})` : ""}</li>`).join("")}</ul>` : "";
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title: t("DGF.List.title") },
    classes: ["dont-get-forked", "dgf-raid-dialog"],
    content: `<div class="dont-get-forked dgf-dialog"><p>${t("DGF.List.intro", { size: shape.size, label: t(`DGF.Label.${raid.difficulty}`) })}</p>${current}<label>${t("DGF.List.essentials")} <select name="essentials">${options}</select></label></div>`,
    buttons: [
      { action: "roll", label: t("DGF.List.roll"), default: true, callback: (event, button) => ({ action: "roll", essentials: Number(field(button.form, "essentials")?.value ?? shape.essentials[0]) }) },
      { action: "clear", label: t("DGF.List.clear"), callback: () => ({ action: "clear" }) },
      { action: "cancel", label: t("DGF.Dialog.cancel") },
    ],
    rejectClose: false,
  });
  if (!answer || typeof answer !== "object") return null;
  return runOp(OPS.raidList, answer);
}

/** How the year went: the Storyteller confirms what came home (pre-filled from the list and what the Entities carry). */
export async function yearDialog() {
  if (!game.user?.isGM) return null;
  const raid = getRaid();
  if (raid.over) { ui.notifications.warn(t("DGF.Year.already")); return null; }
  const d = yearDefaults(raid);
  const rows = d.list.map((it, i) => ({
    i, name: it.name, essential: it.essential, home: it.home,
    duties: DGF.duties.map((x) => ({ key: x.key, label: x.kind, selected: x.key === it.duty })),
  }));
  const content = await render(YEAR_TEMPLATE, { rows, furnitureHome: d.furnitureHome, leftBehind: d.leftBehind, leftNames: d.leftNames.join(", "), forked: d.forked, hasList: raid.list.length > 0 });
  const answer = await ask({
    title: t("DGF.Year.formTitle"), content, okLabel: t("DGF.Year.decide"),
    read: (form) => ({
      list: rows.map((r) => ({
        name: String(field(form, `name.${r.i}`)?.value ?? r.name),
        duty: String(field(form, `duty.${r.i}`)?.value ?? r.duties.find((x) => x.selected)?.key ?? DGF.duties[0].key),
        essential: field(form, `essential.${r.i}`) ? ticked(form, `essential.${r.i}`) : r.essential,
        home: field(form, `home.${r.i}`) ? ticked(form, `home.${r.i}`) : r.home,
      })).filter((it) => it.name.trim() || it.home || it.essential),
      furnitureHome: field(form, "furnitureHome") ? ticked(form, "furnitureHome") : d.furnitureHome,
      leftBehind: Number(field(form, "leftBehind")?.value ?? d.leftBehind) || 0,
      forked: field(form, "forked") ? ticked(form, "forked") : d.forked,
    }),
  });
  if (!answer) return null;
  const result = await runOp(OPS.raidEnd, answer);
  if (result?.ok === false) ui.notifications.warn(t(`DGF.Year.refused.${result.reason}`));
  return result;
}
