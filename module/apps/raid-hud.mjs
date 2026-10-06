/**
 * DON'T GET FORKED — the Raid HUD (ApplicationV2)
 * -----------------------------------------------
 * A small window everyone sees: Suspicion against the Limit, the Turn (and
 * dawn), and whether the whole town hunts; the open group check, who is held at
 * the lock-up, the shopping list and, at the end, how the year went. The
 * Storyteller also gets the controls: Suspicion +1 / −1, undo, cancel or
 * restore any event, next or previous Turn, start or stop the hunt, a new raid,
 * a group check, a Tell check, the shopping list, the chase tracker, freeing a
 * captive and ending the raid. Every control is a GM operation; players only read.
 */
import { SYSTEM_ID, SETTINGS, OPS } from "../contracts.mjs";
import { DGF } from "../config.mjs";
import * as R from "../logic/raid.mjs";
import { runOp } from "../net/gm-ops.mjs";
import { getRaid } from "../raid/store.mjs";
import { setting } from "../settings.mjs";
import { t } from "../helpers/i18n.mjs";
import { entities } from "../raid/chase-flow.mjs";
import { isCaptive } from "../logic/lockup.mjs";
import { groupWaiting } from "../logic/checks.mjs";
import { groupCheckDialog, tellCheckDialog, shoppingListDialog, yearDialog } from "./raid-dialogs.mjs";
import { openChaseTracker } from "./chase-tracker.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class RaidHud extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "dgf-raid-hud",
    classes: ["dont-get-forked", "dgf-hud"],
    tag: "aside",
    window: { title: "DGF.Raid.title", icon: "fa-solid fa-fire", minimizable: true, resizable: false },
    position: { width: 280, top: 70, left: 110 },
    actions: {
      suspicionUp: RaidHud.#onAdjust(1),
      suspicionDown: RaidHud.#onAdjust(-1),
      undo: RaidHud.#onUndo,
      cancelEvent: RaidHud.#onCancel,
      restoreEvent: RaidHud.#onRestore,
      nextTurn: RaidHud.#onTurn(1),
      prevTurn: RaidHud.#onTurn(-1),
      toggleHunt: RaidHud.#onToggleHunt,
      newRaid: RaidHud.#onNewRaid,
      groupCheck: () => groupCheckDialog(),
      closeGroup: () => runOp(OPS.raidGroup, { action: "close" }),
      tellCheck: () => tellCheckDialog(),
      shoppingList: () => shoppingListDialog(),
      openChase: () => openChaseTracker(),
      endRaid: () => yearDialog(),
      freeCaptive: RaidHud.#onFree,
    },
  };

  static PARTS = {
    body: { template: `systems/${SYSTEM_ID}/templates/apps/raid-hud.hbs` },
  };

  /** @override */
  async _prepareContext(options) {
    const state = getRaid();
    const v = R.raidView(state);
    const isGM = !!game.user?.isGM;
    const events = isGM ? R.eventsOf(state).slice(0, 8).map((e) => ({
      eventId: e.eventId,
      amount: e.amount > 0 ? `+${e.amount}` : `${e.amount}`,
      text: e.source === "storyteller" ? t("DGF.Raid.byStoryteller") : t("DGF.Raid.eventBy", { name: e.actorName || "?", why: (e.label || "").split(",").filter(Boolean).map((k) => t(`DGF.Trigger.${k}`)).join(", ") }),
      turn: e.turn,
      cancelled: !!e.cancelled,
      hunt: !!e.hunt,
    })) : [];
    return {
      isGM,
      value: v.value,
      limit: v.limit,
      pips: Array.from({ length: v.limit }, (_, i) => ({ filled: i < v.value })),
      label: t(`DGF.Label.${v.difficulty}`),
      turnLine: v.dawn ? t("DGF.Raid.dawn") : t("DGF.Raid.turn", { turn: v.turn, turns: v.turns }),
      atLimit: v.atLimit,
      hunt: v.hunt,
      huntLine: v.hunt ? t("DGF.Raid.hunt", { cause: t(`DGF.HuntCause.${v.huntCause || "manual"}`) }) : "",
      events,
      hasEvents: events.length > 0,
      labels: R.LABELS.map((k) => ({ key: k, label: t(`DGF.Label.${k}`), selected: k === v.difficulty })),
      group: state.group?.open ? {
        label: state.group.label || t("DGF.Group.unnamed"),
        waiting: groupWaiting(state.group).map((m) => m.name).join(", "),
      } : null,
      groupsOn: setting(SETTINGS.autoGroupChecks),
      captives: entities().filter((a) => isCaptive(a.system)).map((a) => ({
        actorId: a.id, name: a.name,
        since: a.system.capturedTurn ? t("DGF.Raid.heldSince", { turn: a.system.capturedTurn }) : "",
      })),
      lockup: v.lockup,
      list: state.list.map((it) => ({ name: it.name, essential: it.essential })),
      chase: state.chase && !state.chase.outcome ? t("DGF.Raid.chaseOn", { kind: t(`DGF.Chase.kind.${state.chase.kind}`), lead: state.chase.lead, escape: state.chase.escape }) : "",
      over: v.over ? t("DGF.Raid.over", { result: t(`DGF.Result.${v.over.result}`) }) : "",
    };
  }

  static async #onFree(event, target) {
    return runOp(OPS.lockupSet, { actorId: target.dataset.actorId, captured: false });
  }

  static #onAdjust(delta) {
    return async function () { return runOp(OPS.raidAdjust, { delta }); };
  }

  static async #onUndo() {
    return runOp(OPS.raidUndo, {});
  }

  static async #onCancel(event, target) {
    return runOp(OPS.raidCancel, { eventId: target.dataset.eventId });
  }

  static async #onRestore(event, target) {
    return runOp(OPS.raidCancel, { eventId: target.dataset.eventId, restore: true });
  }

  static #onTurn(delta) {
    return async function () { return runOp(OPS.raidTurn, { delta }); };
  }

  static async #onToggleHunt() {
    return runOp(OPS.raidHunt, { on: !getRaid().hunt });
  }

  static async #onNewRaid() {
    const options = R.LABELS.map((k) => `<option value="${k}" ${k === getRaid().difficulty ? "selected" : ""}>${t(`DGF.Label.${k}`)} — ${t("DGF.Raid.limitOf", { limit: DGF.labels[k].limit })}</option>`).join("");
    const difficulty = await foundry.applications.api.DialogV2.wait({
      window: { title: t("DGF.Raid.newRaid") },
      classes: ["dont-get-forked"],
      content: `<div class="dont-get-forked dgf-dialog"><p>${t("DGF.Raid.newRaidText")}</p><select name="difficulty">${options}</select></div>`,
      buttons: [
        { action: "ok", label: t("DGF.Raid.newRaid"), default: true, callback: (event, button) => button.form.elements.namedItem("difficulty")?.value },
        { action: "cancel", label: t("DGF.Dialog.cancel") },
      ],
      rejectClose: false,
    });
    if (!difficulty || !R.LABELS.includes(difficulty)) return null;
    return runOp(OPS.raidReset, { difficulty });
  }
}

/* ------------------------------------------- one HUD per client -- */

const huds = new Map(); // user id → RaidHud (one entry in a real client)

/** Open (or refresh) this client's HUD, if the HUD is switched on. */
export async function openHud() {
  if (!setting(SETTINGS.hudVisible)) return null;
  const key = game.user?.id ?? "";
  let hud = huds.get(key);
  if (!hud) { hud = new RaidHud(); huds.set(key, hud); }
  await hud.render({ force: true });
  return hud;
}

/** Re-render this client's HUD if it is open; close it if the HUD was switched off. */
export async function refreshHud() {
  const hud = huds.get(game.user?.id ?? "");
  if (!setting(SETTINGS.hudVisible)) { if (hud?.rendered) await hud.close(); return; }
  if (hud?.rendered) await hud.render();
}

/** The HUD switch changed. */
export async function onHudSetting(on) {
  if (on) await openHud();
  else await refreshHud();
}

/** This client's HUD (for tests and macros). */
export function currentHud() {
  return huds.get(game.user?.id ?? "") ?? null;
}
