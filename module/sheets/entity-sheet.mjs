/**
 * DON'T GET FORKED — the Entity sheet (ApplicationV2)
 * ---------------------------------------------------
 * Shows an Entity as the book prints it (dice, signature, Gift, Perk, Castle
 * Duty, Weakness, Tell) plus what changes in play (charges, form, status,
 * what it carries, a Cost's marks). Rolling, spending a charge and the Draught
 * are buttons; the rules behind them are in module/logic/.
 */
import { SYSTEM_ID, OPS } from "../contracts.mjs";
import { runOp } from "../net/gm-ops.mjs";
import { DGF } from "../config.mjs";
import { partyClashes, isInRaid } from "../logic/entity.mjs";
import { rollEntity, spendCharge, drinkDraught } from "../dice/rolling.mjs";
import { chooseEntity, becomeEntityUpdate } from "../entities/create.mjs";
import { getRaid } from "../raid/store.mjs";
import { t, traitLabel, dieLabel } from "../helpers/i18n.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;

export class EntitySheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["dont-get-forked", "dgf-sheet", "dgf-entity-sheet"],
    position: { width: 680, height: 760 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      rollTrait: EntitySheet.#onRollTrait,
      spendCharge: EntitySheet.#onSpendCharge,
      drinkDraught: EntitySheet.#onDrinkDraught,
      chooseEntity: EntitySheet.#onChooseEntity,
      addItem: EntitySheet.#onAddItem,
      removeItem: EntitySheet.#onRemoveItem,
      clearMark: EntitySheet.#onClearMark,
      dropItem: EntitySheet.#onDropItem,
    },
  };

  static PARTS = {
    sheet: { template: `systems/${SYSTEM_ID}/templates/actor/entity-sheet.hbs`, scrollable: [""] },
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.document;
    const sys = actor.system;
    const view = sys.view;
    const raid = getRaid();
    const effect = (e, trait) => t(`DGF.Effect.${e}`, { trait: traitLabel(trait) });
    // the party is the Entities in this raid (F26): unplayed Entities in the world clash with nobody
    const party = game.actors.filter((a) => a.type === actor.type && isInRaid(a.system)).map((a) => ({ id: a.id, entityKey: a.system.entityKey, duty: a.system.duty }));
    const clashes = partyClashes(party);
    const warnings = [];
    if (clashes.entity.includes(actor.id)) warnings.push(t("DGF.Sheet.warn.duplicate"));
    if (clashes.duty.includes(actor.id)) warnings.push(t("DGF.Sheet.warn.duty"));

    return Object.assign(context, {
      actor,
      system: sys,
      isGM: !!game.user?.isGM,
      inRaid: isInRaid(sys),
      hasEntity: !!view,
      view,
      entityName: view?.name ?? "",
      formLabel: sys.form ? t(`DGF.Form.${sys.form}`) : "",
      hasForms: (view?.forms?.length ?? 0) > 1,
      dice: DGF.traits.map((k) => ({ key: k, label: traitLabel(k), die: sys.traits[k], dieLabel: dieLabel(sys.traits[k]) })),
      charges: sys.charges,
      signatureText: view?.signature?.text ?? "",
      giftName: view?.giftName ?? "",
      gifts: (view?.gifts ?? []).map((g) => ({ key: g.key, name: g.name, selected: g.key === view.gift.key, isDefault: !!g.default })),
      giftRule: view ? effect(view.gift.effect, view.gift.trait) : "",
      giftText: view?.gift?.text ?? "",
      perks: (view?.perks ?? []).map((p) => ({ key: p.key, name: p.name, selected: p.key === view.perk.key, isDefault: !!p.default })),
      perkText: view?.perk?.text ?? "",
      duties: DGF.duties.map((d) => ({ key: d.key, name: d.name, selected: d.key === sys.duty, isDefault: d.key === view?.defaultDuty })),
      dutyText: view?.duty ? t("DGF.Sheet.dutyText", { kind: view.duty.kind, where: view.duty.where }) : "",
      weakness: view?.weakness ?? null,
      weaknessTiming: view ? t(`DGF.Timing.${view.weakness.timing}`) : "",
      tell: view?.tell ?? null,
      statuses: DGF.statuses.map((s) => ({ key: s, label: t(`DGF.Status.${s}`), selected: s === sys.status })),
      statusLabel: t(`DGF.Status.${sys.status}`), // FA-R11: a player sees its status; the Storyteller changes it
      carried: (sys.carried ?? []).map((c, i) => ({ index: i, name: c.name })),
      marks: [
        ...(sys.nextRollSmaller > 0 ? [{ key: "nextRollSmaller", label: t("DGF.Sheet.mark.smaller", { n: sys.nextRollSmaller }) }] : []),
        ...(sys.skipTurn > 0 ? [{ key: "skipTurn", label: t("DGF.Sheet.mark.skipTurn", { turn: sys.skipTurn }), now: sys.skipTurn === raid.turn }] : []),
        ...(sys.weaknessInPlay ? [{ key: "weaknessInPlay", label: t("DGF.Sheet.mark.weakness") }] : []),
        ...(sys.nextActionLost ? [{ key: "nextActionLost", label: t("DGF.Sheet.mark.actionLost", { item: sys.nextActionLost }), now: true }] : []),
      ],
      warnings,
      draughtLabel: view?.signature?.effect === "form" ? view.signature.name : "",
    });
  }

  static async #onRollTrait(event, target) {
    return rollEntity(this.document, { trait: target.dataset.trait });
  }

  static async #onSpendCharge() {
    return spendCharge(this.document);
  }

  static async #onDrinkDraught() {
    return drinkDraught(this.document);
  }

  static async #onChooseEntity() {
    if (!this.isEditable) return;
    const current = this.document.system.entityKey;
    const answer = await chooseEntity({ current });
    if (!answer) return;
    if (current && answer.key !== current) {
      const ok = await foundry.applications.api.DialogV2.confirm({ window: { title: t("DGF.Create.chooseTitle") }, content: `<p>${t("DGF.Create.replace")}</p>`, rejectClose: false });
      if (!ok) return;
    }
    const e = DGF.entities.find((x) => x.key === answer.key);
    const update = becomeEntityUpdate(answer.key);
    if (!this.document.system.entityKey && e) update.name = e.name;
    return this.document.update(update);
  }

  static async #onAddItem() {
    if (!this.isEditable) return;
    const name = await foundry.applications.api.DialogV2.prompt({
      window: { title: t("DGF.Sheet.addItem") },
      content: `<div class="dont-get-forked dgf-dialog"><label>${t("DGF.Sheet.itemName")} <input type="text" name="name" autofocus></label></div>`,
      ok: { label: t("DGF.Sheet.addItem"), callback: (event, button) => button.form.elements.namedItem("name")?.value?.trim() ?? "" },
      rejectClose: false,
    });
    if (!name) return;
    return this.document.update({ "system.carried": [...(this.document.system.carried ?? []), { name }] });
  }

  static async #onRemoveItem(event, target) {
    if (!this.isEditable) return;
    const i = Number(target.dataset.index);
    const carried = [...(this.document.system.carried ?? [])];
    if (!(i >= 0 && i < carried.length)) return;
    carried.splice(i, 1);
    return this.document.update({ "system.carried": carried });
  }

  /** V21: drop one of the Entity's loot items where it is, any time (the Storyteller's client writes it). */
  static async #onDropItem(event, target) {
    if (!this.isEditable) return;
    const i = Number(target.dataset.index);
    if (!(i >= 0 && i < (this.document.system.carried ?? []).length)) return;
    return runOp(OPS.raidDrop, { actorId: this.document.id, index: i });
  }

  static async #onClearMark(event, target) {
    if (!this.isEditable) return;
    const key = target.dataset.mark;
    const value = { nextRollSmaller: 0, skipTurn: 0, weaknessInPlay: false, nextActionLost: "" }[key];
    if (value === undefined) return;
    return this.document.update({ [`system.${key}`]: value });
  }
}
