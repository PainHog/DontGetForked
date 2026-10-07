/**
 * DON'T GET FORKED — the Entity actor's data (TypeDataModel)
 * ----------------------------------------------------------
 * One of the eight premade Entities (rulebook Chapter 2) as a player's actor:
 * its five trait dice, charges, its three picks, Jekyll & Hyde's form, its
 * status in the raid, what it carries, and the few marks the rules leave on
 * it (a Cost's smaller die or lost Turn, a Weakness in play). Everything else
 * (signature, Gift and Perk text, Weakness, Tell) is read from the book's data
 * by key (module/logic/entity.mjs), so it can't drift from the book.
 * New Entities are filled with the book's defaults by entitySystem(key).
 */
import { DGF } from "../config.mjs";
import { SYSTEM_ID, SETTINGS } from "../contracts.mjs";
import { entityView, rollAbilities, isInRaid } from "../logic/entity.mjs";
import { normalizeRaid, isFurnitureRetake } from "../logic/raid.mjs";
import { inLocalChase } from "../logic/chase.mjs";
import { carriedChangeRefused } from "../logic/lockup.mjs";

/** The raid now (the world setting every client reads), or null. */
const currentRaid = () => {
  try { return normalizeRaid(game.settings.get(SYSTEM_ID, SETTINGS.raidState)); } catch (err) { return null; }
};
const currentChase = () => currentRaid()?.chase ?? null;
/** The switch for the drop and pick-up rules (V21–V28: "Dropped loot waits where it fell"); off, they are by hand. */
const dropsAutomated = () => {
  try { return game.settings.get(SYSTEM_ID, SETTINGS.autoDrops) !== false; } catch (err) { return true; }
};
/** Does another Entity in the raid carry the piece now (so taking it joins a carrier, rather than taking it back up)? */
const carriedByAnother = (actor) => !!game.actors?.some?.((a) => a !== actor && a.type === actor.type && isInRaid(a.system) && a.system.carryingFurniture);

/**
 * V26: taking a set-down piece back up is the carrier's action for the Turn (the same mark as picking loot up, V25),
 * in the Turn of the first take too once nobody carries it; V27: nothing is picked up in the final flight, so then it
 * isn't taken back up at all. The first take stays free, and so does joining a carrier in that Turn.
 * The action is the Entity's whoever ticks it (a Storyteller playing it too); in the flight a Storyteller's tick is a
 * correction and stands, unmarked. `model` is the Entity's data before the change; `sys` the change's system part
 * (changed in place); `refuse`: false for a Storyteller.
 */
function retake(model, sys, { refuse = true } = {}) {
  if (sys.carryingFurniture !== true || model.carryingFurniture || !model.parent) return;
  const raid = currentRaid();
  if (!raid) return;
  if (!isFurnitureRetake(raid, { setDown: !carriedByAnother(model.parent) })) return;
  if (raid.hunt) {
    if (!refuse) return;
    delete sys.carryingFurniture;
    globalThis.ui?.notifications?.warn(game.i18n.localize("DGF.Notify.noPickUpInFlight"));
    return;
  }
  const piece = game.i18n.localize("DGF.Raid.thePiece");
  const names = model.pickedUpTurn === raid.turn && model.pickedUp ? model.pickedUp.split(", ") : [];
  if (!names.includes(piece)) names.push(piece);
  sys.pickedUpTurn = raid.turn;
  sys.pickedUp = names.join(", ");
}

/** FA-R11: where an Entity stands in the raid is the Storyteller's to change (captured, since when, in this raid). */
const STORYTELLER_ONLY = Object.freeze(["status", "capturedTurn", "slipTurn", "inRaid"]);

const f = foundry.data.fields;
const die = (initial) => new f.NumberField({ required: true, nullable: false, integer: true, initial, choices: [...DGF.dieSteps] });
const count = (initial = 0) => new f.NumberField({ required: true, nullable: false, integer: true, min: 0, initial });
const key = () => new f.StringField({ required: true, blank: true, initial: "" });

export class EntityData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      entityKey: key(),                         // which of the eight (DGF.entities); "" until chosen
      form: key(),                              // Jekyll & Hyde: "jekyll" | "hyde"; "" for the others
      traits: new f.SchemaField(Object.fromEntries(DGF.traits.map((tr) => [tr, die(4)]))),
      charges: new f.SchemaField({ value: count(DGF.charges), start: count(DGF.charges), extra: count(0) }), // extra: castle upgrades this raid (campaign)
      gift: key(),                              // the chosen Gift version's key
      perk: key(),                              // the chosen Perk's key
      duty: key(),                              // the Castle Duty's key (DGF.duties)
      status: new f.StringField({ required: true, blank: false, initial: "active", choices: [...DGF.statuses] }),
      capturedTurn: count(0),                   // the Turn it was captured (0 = not held); it may slip free from the next
      slipTurn: count(0),                       // the last Turn it tried to slip free (once per Turn)
      carried: new f.ArrayField(new f.SchemaField({ name: new f.StringField({ required: true, blank: false, initial: "?" }) })),
      carryingFurniture: new f.BooleanField({ initial: false }),
      nextRollSmaller: count(0),                // a Cost: the next roll's trait die one size smaller (each)
      skipTurn: count(0),                       // a Cost: the Turn this Entity loses (0 = none)
      pickedUpTurn: count(0),                   // V25: the Turn it picked dropped items up (its action that Turn; 0 = none)
      pickedUp: key(),                          // V25: what it picked up that Turn (for the mark)
      weaknessInPlay: new f.BooleanField({ initial: false }),
      overdrewInFlight: new f.BooleanField({ initial: false }), // B3: overdrawn once in this final flight (no second)
      inRaid: new f.BooleanField({ initial: true }), // F26: in this raid (a new raid ticks those with a player owner); missing = in
      notes: new f.StringField({ required: true, blank: true, initial: "" }),
    };
  }

  /**
   * FA-R11: a player can't change its Entity's status (free its own captive from the sheet), when it was captured,
   * or whether it is in the raid; those changes are dropped (the rest of the update saves) and the player is told.
   * The Storyteller's client makes them (the lock-up, a new raid, the Raid window). Charges, notes and the rest stay
   * the player's, as on paper.
   */
  async _preUpdate(changes, options, user) {
    const allowed = await super._preUpdate?.(changes, options, user);
    if (allowed === false) return false;
    const sys = changes?.system;
    if (!sys) return allowed;
    if (user?.isGM) {
      if (dropsAutomated()) retake(this, sys, { refuse: false }); // V26: the Storyteller's tick takes it back up too
      return allowed;
    }
    const dropped = STORYTELLER_ONLY.filter((k) => k in sys && sys[k] !== this[k]);
    if (dropped.length) {
      for (const k of dropped) delete sys[k];
      globalThis.ui?.notifications?.warn(game.i18n.localize("DGF.Notify.storytellerOnly"));
    }
    // the drop and pick-up rules below follow their switch (autoDrops): off, the player keeps them by hand
    if (!dropsAutomated()) return allowed;
    // V24: a carrier in a local chase can't set the furniture down (the Storyteller can, as a correction)
    if (sys.carryingFurniture === false && this.carryingFurniture && this.parent && inLocalChase(currentChase(), this.parent.id)) {
      delete sys.carryingFurniture;
      globalThis.ui?.notifications?.warn(game.i18n.localize("DGF.Notify.noDropInChase"));
    }
    // V28: nothing is handed to a captive; nothing is dropped or handed over from a local chase (the Storyteller can correct)
    if (Array.isArray(sys.carried) && this.parent) {
      const refused = carriedChangeRefused({
        captive: this.status === "captured", inLocalChase: inLocalChase(currentChase(), this.parent.id), before: this.carried, after: sys.carried,
      });
      if (refused) {
        delete sys.carried;
        globalThis.ui?.notifications?.warn(game.i18n.localize(refused === "captive" ? "DGF.Notify.nothingToCaptive" : "DGF.Notify.noHandOverInChase"));
      }
    }
    retake(this, sys);
    return allowed;
  }

  /** The book's data for this Entity and its picks (null until an Entity is chosen). */
  get view() {
    return entityView(this);
  }

  /** The abilities it can spend on a roll (signature and Gift). */
  get abilities() {
    return rollAbilities(this);
  }

  /** It carries loot (small items) — "drop an item" needs this; Out of Sight checks it. */
  get carriesLoot() {
    return (this.carried?.length ?? 0) > 0;
  }
}
