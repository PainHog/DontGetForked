/**
 * DON'T GET FORKED — Entities (pure, Foundry-free)
 * ------------------------------------------------
 * Everything the Foundry system needs to know about an Entity that follows
 * from the book: a premade Entity's starting data (its dice, its picks with the
 * book's defaults, its charges), what it can do (its abilities as the four
 * standard effects), Jekyll & Hyde's change of form, and the party checks the
 * book asks for (no duplicate Entities, no shared Castle Duty).
 *
 * Source: rulebook Chapter 2 (The Entities) and Chapter 3 (Abilities, Overdraw),
 * via module/config.mjs (DGF.entities, DGF.perkRules). Plain data in, plain data out.
 */
import { DGF } from "../config.mjs";
import { startingCharges } from "./rules.mjs";

export const TRAITS = DGF.traits;
export const ENTITY_KEYS = Object.freeze(DGF.entities.map((e) => e.key));

/** The premade Entity with this key (DGF.entities), or null. */
export function findEntity(key) {
  return DGF.entities.find((e) => e.key === key) ?? null;
}

const defaultKey = (list) => (list.find((x) => x.default) ?? list[0]).key;

/** Chapter 2: does this Entity have two forms (Jekyll & Hyde)? Its forms in book order. */
export function formsOf(key) {
  const e = findEntity(key);
  return e?.forms ? Object.keys(e.forms) : [];
}

/** The dice of one form (or the Entity's only arrangement when it has no forms). */
export function diceFor(key, form = "") {
  const e = findEntity(key);
  if (!e) throw new Error(`unknown Entity: ${key}`);
  return { ...((e.forms && e.forms[form]) || e.dice) };
}

/**
 * Chapter 2: a premade Entity's starting data (the actor's `system`), with the
 * book's marked defaults for its three picks. `upgrades` = castle upgrades given
 * to it (the optional campaign rules, C16): one extra charge each.
 */
export function entitySystem(key, { upgrades = 0 } = {}) {
  const e = findEntity(key);
  if (!e) throw new Error(`unknown Entity: ${key}`);
  const form = formsOf(key)[0] ?? "";
  const start = startingCharges(upgrades);
  return {
    entityKey: e.key,
    form,
    traits: diceFor(key, form),
    charges: { value: start, start },
    gift: defaultKey(e.gift.versions),
    perk: defaultKey(e.perks),
    duty: e.duty,
    status: "active",
    capturedTurn: 0,
    slipTurn: 0,
    carried: [],
    carryingFurniture: false,
    nextRollSmaller: 0,
    skipTurn: 0,
    weaknessInPlay: false,
    notes: "",
  };
}

/**
 * The abilities an Entity can spend on a roll (Chapter 3: each does one of the
 * four standard effects): its signature and its chosen Gift version. The Draught
 * (effect "form") changes form instead and is used from the sheet.
 */
export function rollAbilities(system) {
  const e = findEntity(system?.entityKey);
  if (!e) return [];
  const out = [];
  const sig = e.signature;
  if (DGF.effects.includes(sig.effect)) {
    out.push({ slot: "signature", name: sig.name, effect: sig.effect, trait: sig.trait ?? null, noLoot: !!sig.noLoot });
  }
  const gift = e.gift.versions.find((v) => v.key === system.gift) ?? e.gift.versions.find((v) => v.default);
  if (gift && DGF.effects.includes(gift.effect)) {
    out.push({ slot: "gift", name: gift.name, effect: gift.effect, trait: gift.trait ?? null, noLoot: false });
  }
  return out;
}

/**
 * Everything a sheet shows about an Entity, resolved from its key and picks.
 * Unknown picks fall back to the book's defaults (and are flagged `fallback`).
 */
export function entityView(system) {
  const e = findEntity(system?.entityKey);
  if (!e) return null;
  const gift = e.gift.versions.find((v) => v.key === system.gift);
  const perk = e.perks.find((p) => p.key === system.perk);
  const duty = DGF.duties.find((d) => d.key === system.duty);
  return {
    key: e.key,
    name: e.name,
    signature: { ...e.signature },
    giftName: e.gift.name,
    gift: { ...(gift ?? e.gift.versions.find((v) => v.default)), fallback: !gift },
    gifts: e.gift.versions.map((v) => ({ ...v })),
    perk: { ...(perk ?? e.perks.find((p) => p.default)), fallback: !perk },
    perks: e.perks.map((p) => ({ ...p })),
    duty: duty ? { ...duty } : null,
    defaultDuty: e.duty,
    weakness: { ...e.weakness },
    tell: { ...e.tell },
    forms: formsOf(e.key),
    book: { dice: { ...e.dice }, forms: e.forms ? JSON.parse(JSON.stringify(e.forms)) : null },
  };
}

/** The other form (Jekyll ↔ Hyde), or null for an Entity with one form. */
export function otherForm(key, form) {
  const forms = formsOf(key);
  if (forms.length < 2) return null;
  return forms[(forms.indexOf(form) + 1) % forms.length];
}

/**
 * Charges for using one ability, before you roll (Chapter 3). One charge each;
 * at zero charges you may still use it ("overdraw"): Suspicion +2, or, once the
 * hunt is on, your Weakness is in play from your next roll; while your Weakness
 * is in play you can't overdraw (Chapter 6).
 *   uses: how many abilities this Entity pays for now; cost: charges per use (1, or 0 if free)
 * Returns { spend, overdraw, suspicion, weakness, allowed }.
 */
export function payFor({ charges, uses = 1, cost = 1, hunt = false, weaknessInPlay = false }) {
  const owed = Math.max(0, uses * cost);
  const spend = Math.min(owed, Math.max(0, charges));
  const overdraw = owed - spend;
  const allowed = !(overdraw > 0 && hunt && weaknessInPlay);
  return {
    spend,
    overdraw,
    suspicion: overdraw > 0 && !hunt ? DGF.suspicion.overdraw : 0,
    weakness: overdraw > 0 && hunt,
    allowed,
  };
}

/**
 * The Draught (C2b): change form, Jekyll to Hyde or back; one charge, except
 * Practised Hand ("changing back to Jekyll costs no charge").
 * Returns { from, to, traits, cost, ...payFor } or null for an Entity without forms.
 */
export function draughtPlan(system, { hunt = false } = {}) {
  const to = otherForm(system?.entityKey, system?.form);
  if (!to) return null;
  const free = DGF.perkRules[system.perk]?.freeDraughtTo === to;
  const cost = free ? 0 : 1;
  return { from: system.form, to, traits: diceFor(system.entityKey, to), cost, ...payFor({ charges: system.charges?.value ?? 0, uses: 1, cost, hunt, weaknessInPlay: !!system.weaknessInPlay }) };
}

/**
 * Party checks (Chapter 2): no two players play the same Entity; no two Entities
 * take the same Castle Duty. `party` = [{ id, entityKey, duty }] in seating order;
 * returns the ids of the later Entity in each clash.
 */
export function partyClashes(party) {
  const seenEntity = new Set(), seenDuty = new Set();
  const entity = [], duty = [];
  for (const m of party) {
    if (m.entityKey) { if (seenEntity.has(m.entityKey)) entity.push(m.id); else seenEntity.add(m.entityKey); }
    if (m.duty) { if (seenDuty.has(m.duty)) duty.push(m.id); else seenDuty.add(m.duty); }
  }
  return { entity, duty };
}
