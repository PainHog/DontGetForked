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
import { getRaid, castleUpgrades } from "../raid/store.mjs";
import { setting } from "../settings.mjs";
import { t } from "../helpers/i18n.mjs";
import { entities, allEntities, inRaid } from "../raid/chase-flow.mjs";
import { isCaptive } from "../logic/lockup.mjs";
import { groupWaiting } from "../logic/checks.mjs";
import { groupCheckDialog, tellCheckDialog, shoppingListDialog, yearDialog, castleExtraDialog, refusalText } from "./raid-dialogs.mjs";
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
      furnitureLost: () => runOp(OPS.raidFurniture, { state: "lost" }),
      furnitureOut: () => runOp(OPS.raidFurniture, { state: "out" }),
      backInTown: () => runOp(OPS.raidBackInTown, {}),
      toggleMember: RaidHud.#onToggleMember,
      pickUp: RaidHud.#onPickUp,
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
    const why = (e) => (e.label || "").split(",").filter(Boolean).map((k) => t(`DGF.Trigger.${k}`)).join(", ");
    const events = isGM ? R.eventsOf(state).slice(0, 8).map((e) => ({
      eventId: e.eventId,
      amount: e.amount > 0 ? `+${e.amount}` : `${e.amount}`,
      // nobody's name (the furniture set down): the reason alone
      text: e.source === "storyteller" ? t("DGF.Raid.byStoryteller") : e.actorName ? t("DGF.Raid.eventBy", { name: e.actorName, why: why(e) }) : why(e) || "?",
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
      // F26: who is in this raid (the Storyteller's list: tick an Entity in or out)
      party: isGM ? allEntities().map((a) => ({ actorId: a.id, name: a.name, inRaid: inRaid(a) })) : [],
      partyCount: entities().length,
      // V21: loot dropped where it fell, waiting to be picked up (by an Entity there: its next action)
      dropped: setting(SETTINGS.autoDrops) ? state.dropped.map((d) => ({ dropId: d.id, text: t("DGF.Raid.droppedItem", { item: d.name, by: d.by, turn: d.turn }) })) : [],
      canPickUp: !state.hunt, // V27: nothing is picked up in the final flight (what's dropped is left in town)
      castle: setting(SETTINGS.campaign) ? t("DGF.Raid.castle", { n: castleUpgrades().length, max: DGF.campaign.maxUpgrades, names: castleUpgrades().length ? `: ${castleUpgrades().join(", ")}` : "" }) : "",
      captives: entities().filter((a) => isCaptive(a.system)).map((a) => ({
        actorId: a.id, name: a.name,
        since: a.system.capturedTurn ? t("DGF.Raid.heldSince", { turn: a.system.capturedTurn }) : "",
      })),
      lockup: v.lockup,
      list: state.list.map((it) => ({ name: it.name, essential: it.essential })),
      chase: state.chase && !state.chase.outcome ? t("DGF.Raid.chaseOn", { kind: t(`DGF.Chase.kind.${state.chase.kind}`), lead: state.chase.lead, escape: state.chase.escape }) : "",
      over: v.over ? t("DGF.Raid.over", { result: t(`DGF.Result.${v.over.result}`) }) : "",
      partyOut: !!v.partyOut && !v.over,
      furnitureLost: v.furnitureLost,
      furnitureInPlay: v.furniture === "inPlay" && setting(SETTINGS.autoFurniture),
      furnitureOut: v.furniture === "out",
    };
  }

  /** V21: pick a dropped item up: the user's own Entity in the raid (asked which, if several; a Storyteller may pick for anyone). */
  static async #onPickUp(event, target) {
    const dropId = target.dataset.dropId;
    const free = entities().filter((a) => a.system.status !== "captured" && (game.user?.isGM || a.isOwner));
    if (!free.length) return null;
    let actorId = free[0].id;
    if (free.length > 1) {
      const options = free.map((a) => `<option value="${a.id}">${foundry.utils.escapeHTML(a.name)}</option>`).join("");
      actorId = await foundry.applications.api.DialogV2.wait({
        window: { title: t("DGF.Raid.pickUpTitle") },
        classes: ["dont-get-forked"],
        content: `<div class="dont-get-forked dgf-dialog"><p>${t("DGF.Raid.pickUpText")}</p><select name="actor">${options}</select></div>`,
        buttons: [
          { action: "ok", label: t("DGF.Raid.pickUp"), default: true, callback: (event, button) => button.form.elements.namedItem("actor")?.value },
          { action: "cancel", label: t("DGF.Dialog.cancel") },
        ],
        rejectClose: false,
      });
      if (!actorId || typeof actorId !== "string") return null;
    }
    return runOp(OPS.raidPickUp, { dropId, actorId });
  }

  static async #onToggleMember(event, target) {
    const actor = game.actors.get(target.dataset.actorId);
    if (!actor) return null;
    return runOp(OPS.raidMember, { actorId: actor.id, inRaid: !inRaid(actor) });
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
    // campaign play: each castle upgrade gives one Entity of the players' choice an extra charge this raid
    let extra = {};
    const upgrades = setting(SETTINGS.campaign) ? castleUpgrades().length : 0;
    if (upgrades) {
      const chosen = await castleExtraDialog(allEntities().filter((a) => a.hasPlayerOwner), upgrades);
      if (!chosen) return null;
      extra = chosen;
    }
    const result = await runOp(OPS.raidReset, { difficulty, extra });
    const why = result?.ok === false ? refusalText("DGF.Castle.refused", result.reason) : "";
    if (why) ui.notifications.warn(why);
    return result;
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
