/**
 * Every judgement call the simulator has to make, as a named parameter
 * (sim/README.md §2): a default (the best reading of docs/CORE-RULES.md draft
 * 0.2), the alternative readings, a title, a doc line and the passage that
 * leaves it open. run.mjs sweeps every alternative.
 *
 * Two kinds of parameter:
 *  - `kind: "rule"`   — the rules text leaves it open or undefined (a gap);
 *  - `kind: "policy"` — how the simulated players choose (not a rule).
 * Numbers the simulator tunes (charges, Limits, Turns, Lead…) are in NUMBERS.
 */

export const PARAMS = {
  critRule: {
    kind: "rule", default: "doubles", values: ["doubles", "beat4", "beat6", "beat7"],
    title: "What counts as a Critical",
    doc: "doubles = a Success with both dice the same face; beatN = total ≥ Difficulty + N. Only matters where a Critical has an effect (critEffect).",
    ref: "CORE-RULES Rolling 3 (Critical: open)",
  },
  critEffect: {
    kind: "rule", default: "both", values: ["both", "none", "lead2", "charge"],
    title: "What a Critical does",
    doc: "both = the rule since S8 (lead2 + charge); none = draft 0.9 (no effect given); lead2 = in a chase a Critical moves the Lead 2 (counts as two successes in the final flight); charge = outside chases a Critical gives the roller back one spent charge; both = lead2 + charge.",
    ref: "CORE-RULES Rolling 3 (no effect given)",
  },
  costChoice: {
    kind: "rule", default: "mixed", values: ["mixed", "suspicion", "lenient"],
    title: "Which Cost the Storyteller picks",
    doc: "mixed = one of the four at random (dropping an item only if someone carries one); suspicion = always Suspicion +1; lenient = always the mildest (drop an item when nobody carries one, which costs nothing).",
    ref: "CORE-RULES P3",
  },
  dropRule: {
    kind: "rule", default: "recover", values: ["recover", "lost", "extrasOnly"],
    title: "What \"drop an item\" means",
    doc: "lost = the item is gone for this raid; recover = it falls where you are and picking it up costs that Entity its next action; extrasOnly = only an extra can be dropped (and is lost); if none is carried the Storyteller picks another Cost.",
    ref: "CORE-RULES 0.5 P3 (S3: recover is the rule; lost was draft 0.4's open reading)",
  },
  loudRule: {
    kind: "rule", default: "suspicion", values: ["suspicion", "witness", "both", "none"],
    title: "What \"the loud way\" does",
    doc: "suspicion = the loud option raises Suspicion +1 whatever the result; witness = trouble on it gets you caught even at an unwatched obstacle; both; none = no effect.",
    ref: "DESIGN Suspicion package (\"usually one of them the loud way\") — the effect is never defined",
  },
  openApproach: {
    kind: "rule", default: "quiet", values: ["quiet", "switch"],
    title: "What \"open an approach nobody else can take\" does",
    doc: "quiet = roll the ability's trait and no one witnesses it (trouble can't get you caught); switch = the same as using the ability's trait instead of the one called.",
    ref: "CORE-RULES Abilities (effect 4 is described only as fiction)",
  },
  overdrawAtLimit: {
    kind: "rule", default: "weakness", values: ["weakness", "free", "forbidden", "fury"],
    title: "Overdraw (and Suspicion triggers) once the hunt is on",
    doc: "weakness = the rule since S1 (CORE-RULES 0.3); free = draft 0.2 as written: nothing stops it, and +2 Suspicion means nothing in the final flight; forbidden = no overdraw in the final flight; weakness = you may overdraw, but your Weakness is in play for the rest of the flight (once per Entity); fury = whatever would raise Suspicion raises the mob's Difficulty instead (once per round, by the biggest trigger, at most +furyCap).",
    ref: "CORE-RULES 0.3 Chases (S1); gap G4 in draft 0.2",
  },
  raiseCap: {
    kind: "rule", default: "perDie", values: ["perDie", "perRoll"],
    title: "How many raises one roll can take",
    doc: "perDie = literal P7: no die raised more than one size, so the trait die and the second die can each be raised once; perRoll = one raise per roll in total.",
    ref: "CORE-RULES P7",
  },
  captiveItems: {
    kind: "rule", default: "lost", values: ["lost", "kept"],
    title: "What a captured Entity's loot does",
    doc: "lost = taken back by the town; kept = the captive still has it if rescued or freed.",
    ref: "DESIGN Captured (says nothing about loot)",
  },
  multiCaught: {
    kind: "rule", default: "separate", values: ["separate"],
    title: "Several Entities caught by one group check",
    doc: "separate = each runs its own local chase (the shared-Lead rule is only given for the final flight).",
    ref: "DESIGN Two kinds of chase / Q8g",
  },
  monsterRule: {
    kind: "rule", default: "plus2", values: ["plus2", "plus1", "tie", "d8", "maskSafe"],
    title: "How the Monster die is priced (S2)",
    doc: "plus2 = the rule since S2 (CORE-RULES 0.4): the Monster shows when it rolls higher than the trait die, +2 Suspicion; plus1 = draft 0.3 (+1); tie = +1, shows when at least as high; d8 = +1, the Monster die is a d8; maskSafe = +1, and trouble on a Mask roll never gets you caught.",
    ref: "CORE-RULES 0.4 Rolling 4 (S2)",
  },
  chaseSusp: {
    kind: "rule", default: "yes", values: ["yes", "no"],
    title: "Do local-chase rolls raise Suspicion? (S6 candidate)",
    doc: "yes = as written: trouble and the Monster showing raise Suspicion in a chase like anywhere else; no = you are already caught, so chase rolls only move the Lead.",
    ref: "DESIGN Suspicion package; Chase",
  },
  slipRule: {
    kind: "rule", default: "success", values: ["success", "cost"],
    title: "What frees a captive who tries to slip free (S6)",
    doc: "success = the rule since S6: only a clean Success; cost = draft 0.7: a Success or a Cost.",
    ref: "DESIGN Captured",
  },
  furnitureRule: {
    kind: "rule", default: "slow", values: ["slow", "base", "hardLoc", "noisy", "both", "noisySlow"],
    title: "What makes furniture risky (S7: slow is the rule)",
    doc: "base = carrying only (no Mask, Nimble one size smaller); hardLoc = the furniture's location is 2 harder; noisy = +1 Suspicion at the end of each Turn a piece is carried in town; both = hardLoc + noisy; slow = while carrying, a move takes two Turns; noisySlow = noisy + slow.",
    ref: "DESIGN Furniture; S7",
  },
  furniturePlace: {
    kind: "rule", default: "onList", values: ["onList", "separate"],
    title: "Where the furniture is (S7: onList is the rule)",
    doc: "separate = its own location, a separate trip (as generated); onList = it stands at one of the list's locations behind one extra obstacle, so the party decides mid-raid whether to take it and carry it for the rest of the night.",
    ref: "DESIGN Furniture; S7",
  },
  exitRule: {
    kind: "rule", default: "gateSingle", values: ["gateSingle", "free", "gate", "gateCarriers"],
    title: "Getting out of town",
    doc: "free = leaving takes a Turn and no roll (as written); gate = the way out is a watched group obstacle (Sly or Nimble, or Brawn the loud way) at the label's exit Difficulty; gateSingle = the same obstacle, but one Entity's roll gets everyone out; gateCarriers = only furniture carriers must roll (a group check), everyone else walks out.",
    ref: "CORE-RULES 0.6 Getting out (S4: gateSingle is the rule; free was draft 0.5)",
  },
  groupRule: {
    kind: "rule", default: "all", values: ["all", "best3", "best4"],
    title: "Who rolls a group check (S5 candidates)",
    doc: "all = P6: every Entity rolls and gets through on its own result; best3 / best4 = at most three / four roll (the best placed), and the rest get through with them once those have.",
    ref: "CORE-RULES P6",
  },
  tellScope: {
    kind: "rule", default: "party", values: ["party", "entity"],
    title: "Tells: once per watched location for the party (S5) or per Entity (draft 0.6)",
    doc: "entity = each Entity's Tell may trigger on arrival at a watched location; party = one chance for the party, as likely as four Entities' together.",
    ref: "DESIGN Weakness and Tell",
  },
  monsterPolicy: {
    kind: "policy", default: "smart", values: ["smart", "mask", "monster"],
    title: "When players choose the Monster die",
    doc: "smart = weigh the better odds against the Suspicion risk; mask = always the Mask unless forced; monster = always the Monster.",
    ref: "player policy",
  },
  caughtWeight: {
    kind: "policy", default: 1.2, values: [1.2, 0.4, 2.0],
    title: "How much the simulated players fear being caught",
    doc: "The value a roll loses per point of chance that trouble gets the roller caught (a local chase, Suspicion, maybe capture). Success is worth 1.",
    ref: "player policy",
  },
  chargePolicy: {
    kind: "policy", default: "spendy", values: ["spendy", "hoard"],
    title: "How readily players spend charges",
    doc: "spendy = spend whenever it clearly helps (unspent charges are lost); hoard = only in chases or on risky witnessed rolls.",
    ref: "player policy (Heisty: hoarding until the book said spend)",
  },
  furniturePolicy: {
    kind: "policy", default: "ifSafe", values: ["ifSafe", "never", "always"],
    title: "When the party goes for furniture",
    doc: "ifSafe = once every list location is done, with Turns and Suspicion to spare; never; always = as soon as the essentials are in hand.",
    ref: "player policy",
  },
  dutyEdge: {
    kind: "content", default: true, values: [true, false],
    title: "Placeholder Castle Duty edge",
    doc: "true = an Entity's trait die is one size larger at a location holding an item of its duty's kind (placeholder for the real Duties).",
    ref: "DESIGN Picks (Castle Duty content not written)",
  },
  tellChance: {
    kind: "content", default: 1 / 6, values: [1 / 6, 0, 1 / 3],
    title: "Placeholder Tell frequency",
    doc: "Chance per Entity, each time the party arrives at a location with witnesses, that its Tell triggers (+1 Suspicion).",
    ref: "DESIGN Weakness and Tell (content not written)",
  },
  weaknessLocal: {
    kind: "content", default: 0.25, values: [0.25, 0, 0.5],
    title: "Placeholder: chance the mob brings your Weakness in a local chase",
    doc: "Applies to mob-type Weaknesses; sunlight-type Weaknesses only apply in a dawn flight.",
    ref: "DESIGN Chase (\"once the mob brings an Entity's Weakness\")",
  },
  weaknessFinal: {
    kind: "content", default: 0.5, values: [0.5, 0.25, 1],
    title: "Placeholder: chance the mob brings your Weakness in the final flight",
    doc: "Rolled once per Entity at the start of the final flight.",
    ref: "DESIGN Chase",
  },
};

/** Defaults for every parameter. */
export function defaults() {
  return Object.fromEntries(Object.entries(PARAMS).map(([k, p]) => [k, p.default]));
}

/** Every ambiguous rule read for (generous) or against (strict) the players. */
export const PRESETS = {
  generous: { critEffect: "both", costChoice: "lenient", dropRule: "recover", loudRule: "none", openApproach: "quiet", overdrawAtLimit: "weakness", raiseCap: "perDie", captiveItems: "kept", exitRule: "free" },
  // costChoice "mixed" keeps the harsh "drop an item" Cost in play ("suspicion" removes it and is easier at Easy).
  strict: { critEffect: "both", costChoice: "mixed", dropRule: "lost", loudRule: "both", openApproach: "switch", overdrawAtLimit: "forbidden", raiseCap: "perRoll", captiveItems: "lost", exitRule: "gate" },
};

/**
 * Numbers the simulator tunes. Every one is a starting value for Richard's
 * approval, not a rule. `difficulty` is the share of each Difficulty (P1) among
 * a label's obstacles (the random tables' difficulty budget).
 */
export const NUMBERS = {
  charges: 3,
  overdrawSuspicion: 2,
  lead: { localStart: 1, localEscape: 4, finalStart: 2, finalEscape: 6 }, // S6: local chases start at 1 (draft 0.7: 2)
  localMob: { base: 6, perSuspicion: 0.5, max: 12 },
  finalMobPerExtraEntity: 0, // S5: the final mob is not scaled by party size (draft 0.6 used 1 per Entity beyond 4)
  maxChaseRounds: 20,
  furyCap: 3, // overdrawAtLimit "fury": most the mob's Difficulty can rise in one final flight
  furyLambda: 0.25, // policy: how much the simulated players fear a point of fury
  labels: {
    easy: {
      items: 3, essentials: [1], limit: 10, turns: 12, finalMob: 8, lockup: 10, exit: 6,
      difficulty: { 6: 0.4, 8: 0.5, 10: 0.1 },
      obstacles: { 1: 0.5, 2: 0.4, 3: 0.1 }, witnessed: 0.4, group: 0.25, twoTraits: 0.6,
    },
    standard: {
      items: 4, essentials: [1, 2], limit: 8, turns: 12, finalMob: 9, lockup: 10, exit: 8,
      difficulty: { 6: 0.15, 8: 0.5, 10: 0.3, 12: 0.05 },
      obstacles: { 1: 0.3, 2: 0.45, 3: 0.25 }, witnessed: 0.5, group: 0.25, twoTraits: 0.6,
    },
    hard: {
      items: 5, essentials: [2], limit: 6, turns: 12, finalMob: 10, lockup: 12, exit: 8,
      difficulty: { 8: 0.4, 10: 0.45, 12: 0.15 },
      obstacles: { 1: 0.2, 2: 0.45, 3: 0.35 }, witnessed: 0.6, group: 0.25, twoTraits: 0.6,
    },
  },
};

/** The agreed balance targets (DESIGN Decisions log, 2026-10-04). */
export const TARGETS = {
  win: { easy: [0.87, 0.93], standard: [0.72, 0.78], hard: [0.55, 0.60] },
  forked: { easy: [0, 0.02], standard: [0.03, 0.07], hard: [0.08, 0.12] },
  hardCaptures: 0.3,
  grandYear: { reach: 0.5, dropBelowWin: 0.2 },
  trouble: [0.10, 0.20],
  critical: [0.03, 0.07], // S8: about 5% (was 10–20%)
  spendHalf: 0.5,
  mask: 0.25,
  monster: 0.25,
  outlier: 0.025,
};

/**
 * Packages (sim/README.md §4): rule readings + numbers compared side by side.
 *  - P0: the starting numbers above, rules as written (defaults).
 *  - T1: numbers tuned toward the targets (sim/tune.mjs), rules as written.
 *  - T2: two proposed rule fixes (a roll to get out of town; a dropped item can
 *        be picked up again) with numbers tuned for them.
 * Every number and both fixes are proposals for Richard, not decisions.
 */
export const PACKAGES = {
  P0: { title: "Starting numbers, rules as written", params: {}, numbers: {} },
  T1: { title: "Tuned numbers, rules as written", params: {}, numbers: {"localMob": {"base": 9}, "labels": {"easy": {"difficulty": {"6": 0.4, "8": 0.5, "10": 0.1}, "items": 3, "essentials": [1], "limit": 12, "finalMob": 11}, "standard": {"difficulty": {"6": 0.15, "8": 0.5, "10": 0.3, "12": 0.05}, "items": 3, "essentials": [1], "limit": 12, "finalMob": 13}, "hard": {"difficulty": {"6": 0.15, "8": 0.5, "10": 0.3, "12": 0.05}, "items": 4, "essentials": [1, 2], "limit": 12, "finalMob": 14}}} },
  T2: { title: "Tuned numbers + exit roll + recoverable drops (proposed)", params: { exitRule: "gate", dropRule: "recover" }, numbers: {"localMob": {"base": 9}, "labels": {"easy": {"difficulty": {"6": 0.4, "8": 0.5, "10": 0.1}, "items": 3, "essentials": [1], "limit": 8, "finalMob": 11}, "standard": {"difficulty": {"6": 0.15, "8": 0.5, "10": 0.3, "12": 0.05}, "items": 4, "essentials": [1, 2], "limit": 10, "finalMob": 12}, "hard": {"difficulty": {"8": 0.4, "10": 0.45, "12": 0.15}, "items": 4, "essentials": [1, 2], "limit": 10, "finalMob": 12}}} },
};
