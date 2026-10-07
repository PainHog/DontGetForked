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
import { entityView, rollAbilities } from "../logic/entity.mjs";

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
      nextActionLost: key(),                    // V21: picking a dropped item up spends the next action (the item's name; "" = none)
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
    if (!sys || user?.isGM) return allowed;
    const dropped = STORYTELLER_ONLY.filter((k) => k in sys && sys[k] !== this[k]);
    if (!dropped.length) return allowed;
    for (const k of dropped) delete sys[k];
    globalThis.ui?.notifications?.warn(game.i18n.localize("DGF.Notify.storytellerOnly"));
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
