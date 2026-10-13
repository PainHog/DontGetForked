/**
 * The plain-English rule for each power, spelled out (rulebook Chapter 2, Richard 2026-10-07: "spell each power
 * out"). The book's entries are generated from these words (book/tools/entity-entries.mjs), so the book and anything
 * else that shows a power say the same thing. Foundry-free.
 *
 * A power's effect (DGF.entities): raise | switch | hidden | open | form. A signature with an effect of its own
 * (the Witch's Hedge Spell, Jekyll & Hyde's Draught) carries its own `rule`.
 */

/**
 * The rule for a signature or a Gift version. A power may add a `note`: a rule of its own that follows the standard
 * wording (Trample's dice as Jekyll and as Hyde; Pillar of Society still turning Jekyll into Hyde), so that only
 * flavour is left in italics.
 */
export function powerRule(power, ctx) {
  const rule = standardRule(power, ctx);
  return power.note ? `${rule} ${power.note}` : rule;
}

function standardRule(power, { traitName, ease = 2 }) {
  if (power.rule) return power.rule;
  const T = power.trait ? traitName(power.trait) : "";
  switch (power.effect) {
    case "raise":
      return "Your trait die is one size bigger for this roll (a d8 becomes a d10; a d12 can’t go higher).";
    case "switch":
      return `Roll ${T} instead of the trait the obstacle calls for (in a chase, instead of the ground’s).`;
    case "hidden":
      return "Take the Monster d10 as your second die without risking Suspicion: if it shows, that adds nothing. "
        + "Anything else on the roll still raises Suspicion as usual (Chapter 3).";
    case "open":
      return `At ${power.watchedOnly ? "a watched obstacle" : "an obstacle"} that doesn’t list ${T}, roll ${T} at a Difficulty ${ease} lower; `
        + (power.watchedOnly ? "Trouble still gets you caught. " : "if it’s watched, Trouble still gets you caught. ")
        + "Only you get past, but the way out still takes everyone and a rescue frees every captive (Chapter 3). Never in a chase."
        + (power.noLoot ? " Not while you carry loot or furniture: nothing you carry passes through." : "");
    default:
      throw new Error(`${power.name}: no rule for effect "${power.effect}"`);
  }
}

/**
 * The four kinds of ability, each spelled out once (Chapter 2's box, Richard 2026-10-13: "explain each kind once").
 * The entries then name the kind and say only what is the ability's own (powerShort). Chapter 3's words.
 */
export function kindRules({ ease = 2 } = {}) {
  return [
    { key: "raise", name: "Your trait die one size bigger.", rule: "This is a raise, for this roll only. A d8 becomes a d10, and a d12 can’t go higher." },
    { key: "switch", name: "Roll another trait.", rule: "Roll the ability’s trait instead of the one the obstacle calls for, or in a chase instead of the ground’s." },
    { key: "hidden", name: "The Monster die without risking Suspicion.", rule: "Take the Monster d10 as your second die. If it shows, that adds nothing, but anything else on the roll still raises Suspicion as usual." },
    { key: "open", name: "An approach of your own.", rule: `At an obstacle that doesn’t list the ability’s trait, roll that trait at a Difficulty ${ease} lower. If the obstacle is watched, Trouble still gets you caught. Only you get past, though the way out still takes everyone and a rescue still frees every captive. Never in a chase.` },
  ];
}

/**
 * One ability in short, for Chapter 2's entries: its kind (spelled out once in the chapter's box) and what is its
 * own (its trait, where it works, what it can't do), then any note of its own. An ability with a rule of its own
 * (the Draught) keeps it in full. The sheet and the hand-out cards show one Entity, so they keep powerRule.
 */
export function powerShort(power, ctx) {
  const rule = shortRule(power, ctx);
  return power.note ? `${rule} ${power.note}` : rule;
}

/**
 * The full rule behind an ability's short form, for a place that has no kinds box (the Entity sheet): its kind spelled
 * out with its own trait. Empty for an ability whose short form is already its whole rule (the Draught).
 */
export function powerDetail(power, ctx) {
  return power.rule ? "" : standardRule(power, ctx);
}

function shortRule(power, { traitName }) {
  if (power.rule) return power.rule;
  const T = power.trait ? traitName(power.trait) : "";
  switch (power.effect) {
    case "raise": return "Your trait die one size bigger.";
    case "switch": return `Roll ${T} instead.`;
    case "hidden": return "The Monster die without risking Suspicion.";
    case "open": return `An approach of your own, with ${T}${power.watchedOnly ? ", at a watched obstacle only" : ""}${power.noLoot ? ", and not while you carry loot or furniture" : ""}.`;
    default: throw new Error(`${power.name}: no rule for effect "${power.effect}"`);
  }
}

/**
 * A Perk's rule and its flavour, apart. `text` is the whole sentence the data keeps; `flavour` (optional) is the
 * part that is colour, not rule, at its end (after ": " or ". ") or at its start.
 */
export function perkParts(perk) {
  const { text, flavour } = perk;
  if (!flavour) return { rule: text, flavour: "" };
  if (text.startsWith(flavour)) return { rule: text.slice(flavour.length).trim(), flavour };
  const at = text.lastIndexOf(flavour);
  if (at < 0) throw new Error(`${perk.name}: its flavour isn't in its text`);
  const rule = text.slice(0, at).replace(/[:.]\s*$/, "").trim();
  return { rule: `${rule}.`, flavour: flavour.charAt(0).toUpperCase() + flavour.slice(1) + (/[.!?]$/.test(flavour) ? "" : ".") };
}

/** When a Weakness starts to bite, in words (Chapter 6). */
export const weaknessTiming = {
  always: "Always (from round 1): in any chase, from its first round to its end, your trait die is one size smaller.",
  soon: "Soon (from round 3): in any chase, from its third round to its end, your trait die is one size smaller.",
};
