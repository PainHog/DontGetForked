/**
 * The plain-English rule for each power, spelled out (rulebook Chapter 2, Richard 2026-10-07: "spell each power
 * out"). The book's entries are generated from these words (book/tools/entity-entries.mjs), so the book and anything
 * else that shows a power say the same thing. Foundry-free.
 *
 * A power's effect (DGF.entities): raise | switch | hidden | open | form. A signature with an effect of its own
 * (the Witch's Hedge Spell, Jekyll & Hyde's Draught) carries its own `rule`.
 */

/** The rule for a signature or a Gift version. */
export function powerRule(power, { traitName, ease = 2 }) {
  if (power.rule) return power.rule;
  const T = power.trait ? traitName(power.trait) : "";
  switch (power.effect) {
    case "raise":
      return "Your trait die is one size bigger for this roll (a d8 becomes a d10).";
    case "switch":
      return `Roll ${T} instead of the trait the obstacle calls for (in a chase, instead of the ground’s).`;
    case "hidden":
      return "Roll the Monster die without risking Suspicion: if it shows, Suspicion doesn’t rise for it (Trouble or a Cost still counts).";
    case "open":
      return `At ${power.watchedOnly ? "a watched obstacle" : "an obstacle"} that doesn’t list ${T}, roll ${T} at ${ease} lower Difficulty. `
        + "Only you get past, except at the way out and the lock-up (Chapter 3). Never in a chase."
        + (power.noLoot ? " Not while you carry loot or furniture: nothing you carry passes through." : "");
    default:
      throw new Error(`${power.name}: no rule for effect "${power.effect}"`);
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
  always: "Always: from the first round of any chase, your trait die is one size smaller.",
  soon: "Soon: from the third round of any chase, your trait die is one size smaller.",
};
