/**
 * The Entities the simulator plays. The default roster ("approved", params.roster) is the
 * book's (Chapter 2), read from module/config.mjs: the eight Entities' dice (C1),
 * signatures (C2), Gifts, Perks and Weakness timings (C6–C9, B4, B5); the engine plays each
 * Perk by its key (sim/engine.mjs). test/sim.test.mjs pins what the simulator reads to the
 * book, so a change to the config can't move the baseline unnoticed.
 *
 * Also kept: the anonymous stand-ins E1–E8 ("placeholder"), built only from the decided
 * structure, which the first simulations ran on before the content was written:
 *  - one each of d12, d10, d8, d6, d4 over the five traits (guardrail 1);
 *  - a signature ability and a Gift (one of three versions of the second
 *    ability), each doing one of the four standard effects;
 *  - a Weakness (mob-type, or sunlight-type that only bites at dawn) and a Tell;
 *  - a Castle Duty from a shared list of six.
 */
import { makeRng } from "./rng.mjs";
import { DGF } from "../module/config.mjs";
import { DIE_STEPS } from "./rules.mjs";

export const TRAITS = Object.freeze(["brawn", "nimble", "sly", "charm", "wits"]);

/** CORE-RULES Abilities: the four standard effects. */
export const EFFECTS = Object.freeze(["raise", "switch", "hidden", "open"]);

/** The Castle Duties (C10), one per kind of shopping-list item; read from the Foundry config. */
export const DUTIES = Object.freeze(DGF.duties.map((d) => d.key));

const SUNLIGHT = new Set(["E3", "E7"]);

function buildRoster() {
  const rng = makeRng(20261004, "placeholder-roster");
  const roster = [];
  for (let i = 0; i < 8; i++) {
    const id = `E${i + 1}`;
    // Spread the d12s over the traits (8 Entities over 5 traits), the rest shuffled.
    const top = TRAITS[i % TRAITS.length];
    const rest = rng.shuffle(TRAITS.filter((t) => t !== top));
    const order = [top, ...rest];
    const dice = {};
    order.forEach((t, k) => (dice[t] = DIE_STEPS[DIE_STEPS.length - 1 - k]));
    const signature = EFFECTS[i % EFFECTS.length];
    const giftOptions = EFFECTS.filter((e) => e !== signature);
    roster.push(Object.freeze({
      id,
      dice: Object.freeze(dice),
      // The trait an ability uses for "switch" / "open": the d12 trait for the
      // signature, the d10 trait for the Gift.
      signature: Object.freeze({ effect: signature, trait: order[0] }),
      giftOptions: Object.freeze(giftOptions),
      giftTrait: order[1],
      weakness: SUNLIGHT.has(id) ? "sunlight" : "mob",
    }));
  }
  return Object.freeze(roster);
}

export const ROSTER = buildRoster();

/**
 * The real roster's dice (C1, approved 2026-10-05), read from the Foundry config
 * so the book, the system and the simulator share one table. buildApproved() then
 * overlays the approved signatures, Gifts, Perks and Weakness timings.
 */
const APPROVED = DGF.entities.map((e) => [e.name, e.dice, e.key === "dracula" ? "sunlight" : "mob"]);

function buildCandidate(rows) {
  return Object.freeze(rows.map(([name, dice, weakness], i) => {
    const base = ROSTER[i];
    const order = Object.entries(dice).sort((a, b) => b[1] - a[1]).map(([t]) => t);
    return Object.freeze({
      ...base, id: name, dice: Object.freeze({ ...dice }), weakness,
      signature: Object.freeze({ effect: base.signature.effect, trait: order[0] }), giftTrait: order[1],
    });
  }));
}

/**
 * The approved signatures (C2) from the Foundry config. Jekyll & Hyde's is "form"
 * (The Draught; Hyde takes over when the Monster shows on a Jekyll roll, C2b).
 * Gifts stay placeholders: the three standard effects the signature doesn't use.
 */
function buildApproved() {
  const dice = buildCandidate(APPROVED);
  return Object.freeze(DGF.entities.map((e, i) => {
    const sig = e.signature;
    const order = Object.entries(e.dice).sort((a, b) => b[1] - a[1]).map(([t]) => t);
    const std = sig.effect === "form" ? "switch" : sig.effect;
    return Object.freeze({
      ...dice[i],
      signature: Object.freeze({ effect: sig.effect, trait: sig.trait ?? order[0], name: sig.name, noLoot: !!sig.noLoot }),
      giftOptions: Object.freeze(EFFECTS.filter((x) => x !== std)),
      giftTrait: order.find((t) => t !== sig.trait) ?? order[1],
      formDice: e.forms ? Object.freeze({ jekyll: Object.freeze({ ...e.forms.jekyll }), hyde: Object.freeze({ ...e.forms.hyde }) }) : null,
      key: e.key,
      // C3: the Weakness's timing once written ("dawn" = sunlight-type); until then the placeholder type.
      ...(e.weakness ? { weakness: e.weakness.timing === "dawn" ? "sunlight" : "mob", weaknessTiming: e.weakness.timing } : {}),
      // Approved Gifts and Perks (C6 on) replace the placeholders.
      ...(e.gift ? { giftOptions: Object.freeze(e.gift.versions.map((v) => Object.freeze({ name: v.name, effect: v.effect, trait: v.trait }))) } : {}),
      ...(e.perks ? { perkOptions: Object.freeze(e.perks.map((k) => k.key)) } : {}),
    });
  }));
}

/**
 * PROPOSED content for the next interview question (not decided): Gifts (three
 * versions of the second ability: name, effect, trait), Perks (ids the engine knows,
 * see engine.mjs PERKS) and the Weakness timing. Entities not listed keep the
 * approved roster's placeholders.
 */
const PROPOSED = {};

function buildProposed() {
  return Object.freeze(buildApproved().map((e) => {
    const c = PROPOSED[e.key];
    if (!c) return e;
    return Object.freeze({
      ...e,
      ...(c.signature ? { signature: Object.freeze({ ...e.signature, ...c.signature }) } : {}),
      giftOptions: Object.freeze(c.gifts.map((g) => Object.freeze({ ...g }))),
      perkOptions: Object.freeze([...c.perks]),
      weakness: c.weaknessTiming === "dawn" ? "sunlight" : "mob",
      weaknessTiming: c.weaknessTiming,
    });
  }));
}

export const ROSTERS = Object.freeze({ placeholder: ROSTER, approved: buildApproved(), proposed: buildProposed() });

/** Validator: rejects an Entity that breaks the decided structure. */
export function validateEntity(e) {
  const errors = [];
  const sizes = TRAITS.map((t) => e.dice[t]).sort((a, b) => a - b);
  if (JSON.stringify(sizes) !== JSON.stringify([...DIE_STEPS])) errors.push(`${e.id}: dice must be one each of d4–d12, got ${sizes}`);
  if (!EFFECTS.includes(e.signature.effect)) errors.push(`${e.id}: bad signature effect`);
  if (e.giftOptions.length !== 3 || e.giftOptions.some((g) => !EFFECTS.includes(g))) errors.push(`${e.id}: needs three Gift options`);
  if (!["mob", "sunlight"].includes(e.weakness)) errors.push(`${e.id}: bad weakness type`);
  return errors;
}

/**
 * A party of `n` distinct Entities (no duplicates), each with a random Gift and
 * a Castle Duty no one else in the party has (R8).
 *
 * Measuring aids (sim/tuning-check.mjs; all off by default, and the default path draws exactly the same random numbers):
 *  - kit "default": every Entity takes its marked default Gift and Perk (Chapter 2: "Every pick has a marked default, so a
 *    new player can skip the choices"), and its default Castle Duty; if two defaults clash, the later one in the party
 *    takes a Duty nobody has, at random (module/config.mjs: "if two defaults clash, the second rolls again"). This is
 *    what a first-time table plays, and what the one-shot's Entity cards have.
 *  - force: an Entity key always in the party (at a random place in it; the others random), so a party "with Dracula"
 *    is measured on every raid instead of half of them (the same parties as the raids that happen to include him).
 *  - override: { entityKey: { gift: name, perk: key } } replaces that Entity's Gift and/or Perk whenever it plays.
 */
export function makeParty(rng, n, chargesEach, roster = ROSTER, { kit = "random", force = null, override = null, pick = "random", town = null } = {}) {
  let picks;
  if (pick === "list" && town && !force) picks = listAwarePicks(rng, roster, n, town);
  else if (force) {
    const x = roster.find((e) => e.key === force || e.id === force);
    if (!x) throw new Error(`no Entity "${force}" to force into the party`);
    const rest = rng.shuffle(roster.filter((e) => e !== x)).slice(0, n - 1);
    const at = rng.int(0, n - 1);
    picks = [...rest.slice(0, at), x, ...rest.slice(at)];
  } else picks = rng.shuffle(roster).slice(0, n);
  const duties = rng.shuffle(DUTIES); // R8: no two Entities in a party take the same Castle Duty
  const party = makeMembers(rng, picks, duties, chargesEach);
  if (kit === "default") {
    const taken = new Set();
    for (const m of party) {
      const d = DEFAULTS[m.ent.key];
      if (!d) continue;
      m.gift = m.ent.giftOptions.find((g) => (g.name ?? g) === d.gift) ?? m.gift;
      m.perk = d.perk ?? m.perk;
      m.duty = taken.has(d.duty) ? rng.pick(DUTIES.filter((x) => !taken.has(x))) : d.duty;
      taken.add(m.duty);
    }
  }
  if (override) {
    for (const m of party) {
      const o = override[m.ent.key];
      if (!o) continue;
      if (o.gift) m.gift = m.ent.giftOptions.find((g) => (g.name ?? g) === o.gift) ?? (() => { throw new Error(`${m.ent.key}: no Gift "${o.gift}"`); })();
      if (o.perk) { if (!m.ent.perkOptions?.includes(o.perk)) throw new Error(`${m.ent.key}: no Perk "${o.perk}"`); m.perk = o.perk; }
    }
  }
  return party;
}

/** The list's kinds, essentials first (each once). */
function listKinds(town) {
  const items = [...(town.items ?? [])].sort((a, b) => (b.essential ? 1 : 0) - (a.essential ? 1 : 0));
  return [...new Set(items.map((i) => i.kind).filter(Boolean))];
}

/**
 * 2026-10-29 (Richard): the players choose their monsters after hearing the list (Easy, Standard): each pick covers a
 * list kind its default Castle Duty hasn't covered yet (essentials first), ties at random; the rest at random.
 */
export function listAwarePicks(rng, roster, n, town) {
  const kinds = listKinds(town);
  const pool = rng.shuffle(roster);
  const picks = [];
  const covered = new Set();
  for (const k of kinds) {
    if (picks.length >= n) break;
    const e = pool.find((x) => !picks.includes(x) && DEFAULTS[x.key]?.duty === k);
    if (e && !covered.has(k)) { picks.push(e); covered.add(k); }
  }
  for (const e of pool) if (picks.length < n && !picks.includes(e)) picks.push(e);
  return rng.shuffle(picks);
}

/**
 * 2026-10-29 (Richard): how the Castle Duties are set. random = the simulator's standard (a Duty at random, no two alike);
 * default = each monster keeps its own Duty (Standard and Hard: no switching; a clash takes another at random);
 * match = the players heard the list and switch Duties to cover its kinds, essentials first (Easy).
 */
export function applyDutyPolicy(rng, party, town, policy = "random") {
  if (policy === "default") {
    const taken = new Set();
    for (const m of party) {
      const d = DEFAULTS[m.ent.key]?.duty;
      m.duty = d && !taken.has(d) ? d : rng.pick(DUTIES.filter((x) => !taken.has(x)));
      taken.add(m.duty);
    }
  } else if (policy === "match") {
    const chosen = listKinds(town).slice(0, party.length);
    const all = [...chosen, ...rng.shuffle(DUTIES.filter((d) => !chosen.includes(d)))].slice(0, party.length);
    rng.shuffle(party.map((_, i) => i)).forEach((pi, k) => { party[pi].duty = all[k]; });
  }
  return party;
}

/** Each Entity's marked defaults (Chapter 2), from the Foundry config: Gift version name, Perk key, Castle Duty key. */
const DEFAULTS = Object.fromEntries(DGF.entities.map((e) => [e.key, {
  gift: e.gift?.versions.find((v) => v.default)?.name ?? null,
  perk: e.perks?.find((p) => p.default)?.key ?? null,
  duty: e.duty ?? null,
}]));
export const ENTITY_DEFAULTS = Object.freeze(DEFAULTS);

/**
 * A copy of a roster with a Gift version's trait changed (a measuring aid for sim/tuning-check.mjs, e.g. the Witch's
 * Broomstick rolling Wits instead of Nimble: { Broomstick: "wits" }). The Entities keep everything else.
 */
export function rosterWithGiftTraits(roster, traits) {
  if (!traits || !Object.keys(traits).length) return roster;
  return Object.freeze(roster.map((e) => {
    if (!e.giftOptions.some((g) => g.name && traits[g.name])) return e;
    return Object.freeze({ ...e, giftOptions: Object.freeze(e.giftOptions.map((g) => (g.name && traits[g.name] ? Object.freeze({ ...g, trait: traits[g.name] }) : g))) });
  }));
}

function makeMembers(rng, picks, duties, chargesEach) {
  return picks.map((e, k) => ({
    ent: e,
    id: e.id,
    gift: rng.pick(e.giftOptions),
    perk: e.perkOptions ? rng.pick(e.perkOptions) : null,
    duty: duties[k],
    charges: chargesEach,
    chargesStart: chargesEach,
    status: "active", // active | captured | home | forked | left
    items: [], // small loot carried
    furniture: null, // a furniture piece this Entity is (co-)carrying
    nextStepDown: 0, // the "next roll one size smaller" Cost
  }));
}

/** The Entity's abilities as {effect, trait, source}. */
export function abilitiesOf(m) {
  return [
    { effect: m.ent.signature.effect, trait: m.ent.signature.trait, source: "signature", noLoot: !!m.ent.signature.noLoot },
    typeof m.gift === "object"
      ? { effect: m.gift.effect, trait: m.gift.trait ?? m.ent.giftTrait, source: "gift" }
      : { effect: m.gift, trait: m.ent.giftTrait, source: "gift" },
  ];
}
