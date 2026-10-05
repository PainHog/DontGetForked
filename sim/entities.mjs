/**
 * PLACEHOLDER Entities for the rough simulation. None of this is game content.
 *
 * The roster is decided (Dracula, Frankenstein's creature, the Mummy, the
 * Werewolf, the Invisible Man, a Ghost, a Witch, Jekyll & Hyde), but each
 * Entity's dice arrangement, abilities, Gifts, Perks, Weakness and Tell are
 * Richard's to write. Until then the simulator uses eight anonymous stand-ins,
 * E1–E8, built only from the decided structure:
 *  - one each of d12, d10, d8, d6, d4 over the five traits (guardrail 1);
 *  - a signature ability and a Gift (one of three versions of the second
 *    ability), each doing one of the four standard effects;
 *  - a Weakness (mob-type, or sunlight-type that only bites at dawn) and a Tell;
 *  - a Castle Duty from a shared list of six (placeholder kinds K1–K6).
 * Perks are not modelled (no placeholder could stand in for real ones).
 */
import { makeRng } from "./rng.mjs";
import { DGF } from "../module/config.mjs";
import { DIE_STEPS } from "./rules.mjs";

export const TRAITS = Object.freeze(["brawn", "nimble", "sly", "charm", "wits"]);

/** CORE-RULES Abilities: the four standard effects. */
export const EFFECTS = Object.freeze(["raise", "switch", "hidden", "open"]);

/** Placeholder Castle Duties: one per placeholder item kind. */
export const DUTIES = Object.freeze(["K1", "K2", "K3", "K4", "K5", "K6"]);

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
 * so the book, the system and the simulator share one table. Abilities, Gifts and
 * Weakness types are still the placeholders of the matching E1–E8 slot (Dracula's
 * Weakness is placeholder sunlight-type); Jekyll & Hyde plays as Jekyll until the
 * change between forms is written.
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

export const ROSTERS = Object.freeze({ placeholder: ROSTER, approved: buildCandidate(APPROVED) });

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
 */
export function makeParty(rng, n, chargesEach, roster = ROSTER) {
  const picks = rng.shuffle(roster).slice(0, n);
  const duties = rng.shuffle(DUTIES); // R8: no two Entities in a party take the same Castle Duty
  return picks.map((e, k) => ({
    ent: e,
    id: e.id,
    gift: rng.pick(e.giftOptions),
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
    { effect: m.ent.signature.effect, trait: m.ent.signature.trait, source: "signature" },
    { effect: m.gift, trait: m.ent.giftTrait, source: "gift" },
  ];
}
