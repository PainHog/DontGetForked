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
    doc: "mixed = one of the four at random, never one that costs nothing (no Suspicion +1 when the roll already raised it; \"drop an item\" only if the roller carries loot, and it drops its own) (T10); suspicion = always Suspicion +1; lenient = always the mildest (drop an item when nobody carries one, which costs nothing).",
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
    kind: "rule", default: "easier", values: ["easier", "quiet", "switch"],
    title: "What \"open an approach nobody else can take\" does",
    doc: "easier = the rule since S10 (see below); quiet = roll the ability's trait and no one witnesses it (trouble can't get you caught); switch = the same as using the ability's trait instead of the one called; easier = the ability's trait at Difficulty 2 lower, watched as usual.",
    ref: "CORE-RULES Abilities (effect 4 is described only as fiction)",
  },
  overdrawAtLimit: {
    kind: "rule", default: "once", values: ["once", "weakness", "free", "forbidden", "fury"],
    title: "Overdraw (and Suspicion triggers) once the hunt is on",
    doc: "weakness = the rule since S1 (CORE-RULES 0.3); free = draft 0.2 as written: nothing stops it, and +2 Suspicion means nothing in the final flight; forbidden = no overdraw in the final flight; weakness = you may overdraw, but your Weakness is in play for the rest of the flight (once per Entity); fury = whatever would raise Suspicion raises the mob's Difficulty instead (once per round, by the biggest trigger, at most +furyCap); once = as weakness, and each Entity may overdraw at most once per flight (PT4 M1 candidate).",
    ref: "CORE-RULES 0.3 Chases (S1); gap G4 in draft 0.2",
  },
  furnitureNoise: {
    kind: "rule", default: "carried", values: ["carried", "moving"],
    title: "Which Turns a carried piece raises Suspicion (B2: +1 at the end of each Turn)",
    doc: "carried = every Turn it's carried, both Turns of a move and waiting Turns included (as written); moving = only the Turns it moves (PT5 m9 candidate: a piece set down makes no noise). (Before PT5, together-play counted one per two-Turn move and no waiting Turns; pairs and singles already counted every Turn.)",
    ref: "DESIGN B2; PT5 m9",
  },
  spectralRule: {
    kind: "rule", default: "noLoot", values: ["noLoot", "any"],
    title: "A Ghost's Spectral: past group obstacles without rolling (V19 2026-10-06: noLoot)",
    doc: "any = as written; noLoot = not while carrying loot or furniture, like Through the Wall (candidate after B7: A Ghost the largest outlier).",
    ref: "DESIGN C8; sim/FINDINGS.md after B7",
  },
  mesmeriseRule: {
    kind: "rule", default: "watched", values: ["watched", "any"],
    title: "Dracula's Mesmerise (C2; B7 2026-10-06: watched)",
    doc: "any = as written (any obstacle that doesn't list Charm); watched = only at a watched obstacle: he needs someone to mesmerise (candidate after the audits: Dracula +2.9 on three seeds).",
    ref: "DESIGN C2; sim/FINDINGS.md after the audits",
  },
  finalMove: {
    kind: "rule", default: "margin2", values: ["margin2", "majority", "net"],
    title: "How a shared Lead moves each round (the majority rule: final flights and shared local chases; B6 2026-10-06: margin2)",
    doc: "majority = 1 toward whichever side has more (Successes vs Trouble), none on a tie (decided 2026-10-04); margin2 = as majority, but winning by 2 or more moves it 2; net = it moves by the whole difference (B6 decided margin2 after PT5's long Hard flights).",
    ref: "DESIGN 2026-10-04 (majority rule); PT5",
  },
  openEase: {
    kind: "rule", default: 2, values: [2, 1],
    title: "How much lower an opened approach's Difficulty is (S10: 2)",
    doc: "2 = as decided (Chapter 3); 1 = a candidate for the option outliers after B5 (the open-an-approach Gifts run strong, the raise Gifts weak).",
    ref: "CORE-RULES Abilities (S10); sim/FINDINGS.md after B5",
  },
  raiseCap: {
    kind: "rule", default: "perRoll", values: ["perRoll", "perDie"],
    title: "How many raises one roll can take",
    doc: "perDie = literal P7: no die raised more than one size, so the trait die and the second die can each be raised once; perRoll = one raise per roll in total.",
    ref: "CORE-RULES P7",
  },
  raiseDie: {
    kind: "rule", default: "trait", values: ["trait", "any"],
    title: "Which die a raise can raise",
    doc: "trait = only the trait die (T6, decided 2026-10-05); any = the trait die or the Mask/Monster die (d6 → d8, d10 → d12), as simulated before T6.",
    ref: "CORE-RULES Abilities (\"raise a die one size\"); PT1 A28, PT2 A27",
  },
  openTrait: {
    kind: "rule", default: "unlisted", values: ["unlisted", "any"],
    title: "Which traits \"open an approach\" can use",
    doc: "unlisted = only when the obstacle doesn't list that trait, and only on obstacles, never in a chase (T5, decided 2026-10-05); any = also on a listed trait, as simulated before T5.",
    ref: "CORE-RULES Abilities (S10); PT2 A7",
  },
  waysIn: {
    kind: "rule", default: "two", values: ["two", "one"],
    title: "A location's two ways in",
    doc: "two = a location's first obstacle comes in two versions (different traits, Difficulty, witnesses) and the party picks one (T2, decided 2026-10-05); one = a single first obstacle, as simulated before T2.",
    ref: "CORE-RULES The raid; PT1 A2, PT2 A23",
  },
  overdrawStack: {
    kind: "rule", default: "merge", values: ["merge", "stack"],
    title: "Overdraw and \"one roll, one rise\"",
    doc: "merge = overdraw's +2 is one of the roll's triggers (only the biggest counts), as in the Foundry logic; stack = overdraw is paid on top of the roll's own rise.",
    ref: "CORE-RULES Suspicion; PT3 M5",
  },
  lootHandover: {
    kind: "rule", default: "free", values: ["free", "none"],
    title: "Handing loot to each other",
    doc: "free = Entities at the same place hand loot over at any time, free (U2, decided 2026-10-05); the simulated players hand theirs over before a watched roll; none = no handing over.",
    ref: "CORE-RULES The raid (Carrying); PT3 M6",
  },
  chaseTable: {
    kind: "content", default: "approved", values: ["approved", "placeholder", "B", "C"],
    title: "The d6 chase table (C12)",
    doc: "approved = the C12 table (two traits a row, each trait 2–3 times); placeholder = the old stand-in (Nimble on four rows); B = three traits a row; C = Nimble on every row plus one other.",
    ref: "CORE-RULES Chases (the ground); content C12",
  },
  partyPolicy: {
    kind: "policy", default: "pairs", values: ["pairs", "together", "singles"],
    title: "Does the party split up?",
    doc: "together = the whole party moves and works as one; pairs = it splits into groups of two (one single with an odd number), each taking its own location and regrouping at the way out; singles = every Entity works alone. Abilities only help within a group (P7).",
    ref: "CORE-RULES Time (\"the party may split\"); PT1, PT2",
  },
  captiveItems: {
    kind: "rule", default: "lost", values: ["lost", "kept"],
    title: "What a captured Entity's loot does",
    doc: "lost = taken back by the town; kept = the captive still has it if rescued or freed.",
    ref: "DESIGN Captured (says nothing about loot)",
  },
  multiCaught: {
    kind: "rule", default: "shared", values: ["shared", "separate"],
    title: "Several Entities caught by one group check",
    doc: "separate = each runs its own local chase; shared = they flee together on one Lead that moves by the majority rule, and are captured together if cornered.",
    ref: "DESIGN Two kinds of chase / Q8g",
  },
  monsterRule: {
    kind: "rule", default: "plus2", values: ["plus2", "plus1", "tie", "d8", "maskSafe"],
    title: "How the Monster die is priced (S2)",
    doc: "plus2 = the rule since S2 (CORE-RULES 0.4): the Monster shows when it rolls higher than the trait die, +2 Suspicion; plus1 = draft 0.3 (+1); tie = +1, shows when at least as high; d8 = +1, the Monster die is a d8; maskSafe = +1, and trouble on a Mask roll never gets you caught.",
    ref: "CORE-RULES 0.4 Rolling 4 (S2)",
  },
  chaseSusp: {
    kind: "rule", default: "yes", values: ["yes", "no", "cap2", "cap3", "cap4"],
    title: "Do local-chase rolls raise Suspicion? (S6: yes)",
    doc: "yes = as written: trouble and the Monster showing raise Suspicion in a chase like anywhere else; no = you are already caught, so chase rolls only move the Lead; capN = as yes, but one local chase raises Suspicion by at most N in all (PT5 candidates).",
    ref: "DESIGN Suspicion package; Chase",
  },
  slipRule: {
    kind: "rule", default: "success", values: ["success", "cost"],
    title: "What frees a captive who tries to slip free (S6)",
    doc: "success = the rule since S6: only a clean Success; cost = draft 0.7: a Success or a Cost.",
    ref: "DESIGN Captured",
  },
  furnitureRule: {
    kind: "rule", default: "noisySlowHard", values: ["noisySlowHard", "slow", "base", "hardLoc", "noisy", "both", "noisySlow", "slowHard", "slowWatched"],
    title: "What makes furniture risky (S7 slow; B2 2026-10-06: noisySlowHard is the rule)",
    doc: "base = carrying only (no Mask, Nimble one size smaller); hardLoc = the furniture's location is 2 harder; noisy = +1 Suspicion at the end of each Turn a piece is carried in town; both = hardLoc + noisy; slow = while carrying, a move takes two Turns; noisySlow = noisy + slow; slowHard = slow, and the furniture's extra obstacle is 2 harder (B2 candidate); slowWatched = slow, and the furniture's extra obstacle is always watched (B2 candidate); noisySlowHard = noisy + slow + the extra obstacle 2 harder (B2 candidate).",
    ref: "DESIGN Furniture; S7",
  },
  corneredAtLimit: {
    kind: "rule", default: "captured", values: ["captured", "flight"],
    title: "Cornered in the round the Limit comes (B3, 2026-10-06: captured)",
    doc: "captured = you are captured first, then the final flight starts without you; flight = the chase ends at once and you join the flight (the rule before B3).",
    ref: "DESIGN B3; PT4 m29",
  },
  fetchRule: {
    kind: "rule", default: "flightExit", values: ["flightExit", "flight", "pickup", "keeper", "carry", "grab", "lockup", "flightLockup"],
    title: "The Werewolf's Fetch (C5; B2 2026-10-06: flight; B5 2026-10-06: flightExit is the rule)",
    doc: "pickup = picking up a dropped item doesn't cost your action (as written); keeper = \"drop an item\" is never your Cost; carry = carrying furniture doesn't slow your moves; grab = when an Entity beside you is captured, you take what it carried; lockup = the lock-up is 2 easier when you roll the rescue; flight = the final flight starts at Lead +1 while you are in it; flightExit = flight, and the way out is 1 easier for whoever rolls it while you are there (B5); flightLockup = flight, and the lock-up is 2 easier when you roll the rescue (tried for B5).",
    ref: "DESIGN C5; B2",
  },
  alreadyDeadTurns: {
    kind: "rule", default: 1, values: [1, 2],
    title: "A Ghost's Already Dead: Turns lost instead of capture (C8; B2 candidate)",
    doc: "1 = as written; 2 = cornered in a local chase, you lose your next two Turns.",
    ref: "DESIGN C8; B2",
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
  openedRule: {
    kind: "rule", default: "onlyOpener", values: ["onlyOpener", "othersMayFollow"],
    title: "An obstacle someone opened, for the others there",
    doc: "onlyOpener = only the opener goes on, and the others can't try it until the opener is caught (the simulator so far); othersMayFollow = it isn't beaten for the others, who may still beat it their own way, and once one does it's beaten for them all (Chapter 3: \"Only you get through\"; Chapter 4: \"Once anyone beats an obstacle … it stays beaten\").",
    ref: "Chapter 3 (open an approach), Chapter 4; T5",
  },
  exitTries: {
    kind: "rule", default: "one", values: ["one", "each"],
    title: "Rolls at the way out per Turn",
    doc: "one = one roll a Turn: \"one rolls for all … On Trouble … try again next Turn\" (Chapter 4, Getting Out; the reading since the audit, docs/audits/SIM-AUDIT.md); each = after Trouble another Entity there may roll it the same Turn, as at any other obstacle (Chapter 4, Turns: \"Several may try the same obstacle in one Turn\"; the simulator before the audit).",
    ref: "Chapter 4, Getting Out and Turns",
  },
  triesPerTurn: {
    kind: "rule", default: "each", values: ["each", "one"],
    title: "Tries at one obstacle per Turn",
    doc: "each = P4 literally: every Entity has a roll each Turn, so several can try the same obstacle in one Turn; one = only one Entity may try a given obstacle each Turn.",
    ref: "CORE-RULES P4 (gap G12)",
  },
  planTime: {
    kind: "policy", default: "auto", values: ["auto", "perObstacle", "perTurn"],
    title: "How the players count the Turns a location will take",
    doc: "auto = perTurn for a party that stays together, perObstacle for pairs and singles; perObstacle = a Turn for each obstacle left (as if one Entity rolled a Turn; cautious near dawn); perTurn = the obstacles left shared among the Entities there, at least one Turn (each can take on the next obstacle the same Turn, Chapter 4).",
    ref: "player policy (the audit follow-up: how crude is together-play?)",
  },
  openPolicy: {
    kind: "policy", default: "auto", values: ["auto", "greedy", "last"],
    title: "When the players open an approach",
    doc: "auto = last for a party that stays together, greedy for pairs and singles (where it shuts out one partner at most, and opening pays); greedy = whenever it's the best roll; last = not where it would shut the others there out of the obstacles past it (only the opener gets through), so only at a location's last obstacle, a group obstacle, or alone.",
    ref: "player policy (the audit follow-up: how crude is together-play?)",
  },
  groupPolicy: {
    kind: "policy", default: "auto", values: ["auto", "all", "best2"],
    title: "Who goes through a group obstacle",
    doc: "auto = best2 for a party that stays together (all for pairs and singles, where it makes no difference); all = everyone there rolls it; best2 = only the two best placed do, and the rest wait outside it (they can still help with abilities), unless nobody got through.",
    ref: "player policy (the audit follow-up: how crude is together-play?)",
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
  outOfSightRule: {
    kind: "content", default: "place", values: ["place", "carry", "half", "handed", "handedSmart"],
    title: "The Invisible Man's Out of Sight (V17, 2026-10-06: place)",
    doc: "place = \"Trouble gets you caught only while you or anyone with you carries loot or furniture\" (V17, the book); carry = \"only while you carry loot or furniture\" (the book before V17: free hand-over let him roll empty-handed, +2.5 to +3.4); half = \"on Trouble at a watched obstacle you're caught only on a 1–3 on a d6\"; handed = \"…, or you were handed loot or handed it over this Turn\"; handedSmart = handed, with a party that keeps the loot out of his hands (it never needs to hand it over).",
    ref: "Chapter 2 (the Invisible Man); DESIGN V17; sim/FINDINGS.md",
  },
  roster: {
    kind: "content", default: "approved", values: ["approved", "placeholder", "proposed"],
    title: "Which Entities",
    doc: "approved = the real roster from module/config.mjs (dice C1, signatures C2, Gifts, Perks and Weakness timings); placeholder = the anonymous E1–E8; proposed = approved plus the Gifts, Perks and Weakness timings proposed for the current interview question.",
    ref: "DESIGN Decisions log (C1); module/config.mjs DGF.entities",
  },
  dutyEdge: {
    kind: "content", default: true, values: [true, false],
    title: "Castle Duty edge (C10)",
    doc: "true = an Entity's trait die is one size larger on its own rolls at a location holding an item of its Duty's kind (C10, approved 2026-10-05); false = no Duty edge.",
    ref: "DESIGN Picks (Castle Duty content not written)",
  },
  tellPartyChance: {
    kind: "rule", default: 0.5, values: [0.5, 1 / 3, 2 / 3],
    title: "Tell chance per check (whole party)",
    doc: "C4: a d6 roll of 4–6 at each newly reached watched location (tellScope \"party\").",
    ref: "CORE-RULES Suspicion (Tells); C4",
  },
  tellChance: {
    kind: "content", default: 1 / 6, values: [1 / 6, 0, 1 / 3],
    title: "Placeholder Tell frequency",
    doc: "Chance per Entity, each time the party arrives at a location with witnesses, that its Tell triggers (+1 Suspicion).",
    ref: "DESIGN Weakness and Tell (content not written)",
  },
  weaknessRule: {
    kind: "content", default: "timing", values: ["timing", "chance", "always", "soon", "table"],
    title: "When the mob brings a Weakness (C3 candidates)",
    doc: "timing = each Entity's own Weakness timing (C3; \"soon\" until its Weakness is written); chance = placeholder chances at the start of each chase (below); always = from round 1 of every chase; soon = from round 3; table = from the round the chase table shows a 6, for everyone in that chase. Sunlight-type Weaknesses only bite in a dawn flight.",
    ref: "CORE-RULES Chases (Weakness); content C3",
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
 * The numbers. Approved as the starting numbers in S9 (2026-10-04); the
 * obstacle counts, witness, group and two-trait shares are generator settings
 * for the placeholder towns, not rules. `difficulty` is the share of each Difficulty (P1) among
 * a label's obstacles (the random tables' difficulty budget).
 */
export const NUMBERS = {
  charges: 3,
  townBudget: "cap",
  obstacleTable: "approved", // C18: the d20 obstacle table; "random" was the placeholder generator // C17: rolled towns, at most one Difficulty-12 obstacle (two at Hard); "rolled" and "budget" were the other candidates
  overdrawSuspicion: 2,
  lead: { localStart: 1, localEscape: 4, finalStart: 2, finalEscape: 6 }, // S6/S9
  finalCloseIn: 0, // PT4 M2 candidate: from this round of the final flight on (1-based), the mob is 1 harder each round (0 = off)
  finalCloseCap: 12,
  localMob: { base: 8, perSuspicion: 0.5, max: 12 }, // S9; B3: base 8 (was 10)
  finalMobPerExtraEntity: 0, // S5: the final mob is not scaled by party size (draft 0.6 used 1 per Entity beyond 4)
  maxChaseRounds: 200, // a safety stop only (was 20, which ended about 1 Standard or Hard flight in 10 early and counted it as an escape)
  furyCap: 3, // overdrawAtLimit "fury": most the mob's Difficulty can rise in one final flight
  furyLambda: 0.25, // policy: how much the simulated players fear a point of fury
  labels: {
    // S9 (approved 2026-10-04); Limits raised in S10. `difficulty` is the share of each Difficulty among a label's obstacles.
    easy: {
      items: 4, essentials: [1], limit: 11, turns: 12, finalMob: 10, lockup: 10, exit: 6, finalEscape: 5, // B1: 4 items (was 3); B3: Limit 11, flight escapes at 5
      difficulty: { 6: 0.15, 8: 0.5, 10: 0.3, 12: 0.05 },
      obstacles: { 1: 0.5, 2: 0.4, 3: 0.1 }, witnessed: 0.4, group: 0.25, twoTraits: 0.6,
    },
    standard: {
      items: 5, essentials: [1, 2], limit: 11, turns: 12, finalMob: 11, lockup: 10, exit: 8, finalEscape: 5, // B1: 5 items (was 4); B3: Limit 11 (B1 12), flight escapes at 5
      difficulty: { 6: 0.15, 8: 0.5, 10: 0.3, 12: 0.05 },
      obstacles: { 1: 0.3, 2: 0.45, 3: 0.25 }, witnessed: 0.5, group: 0.25, twoTraits: 0.6,
    },
    hard: {
      items: 5, essentials: [2], limit: 15, turns: 12, finalMob: 11, lockup: 10, exit: 10, // B1: 5 items, way out 10 (were 4, 8); B7: lock-up 10 (was 12)
      difficulty: { 8: 0.4, 10: 0.45, 12: 0.15 },
      obstacles: { 1: 0.2, 2: 0.45, 3: 0.35 }, witnessed: 0.6, group: 0.25, twoTraits: 0.6,
    },
  },
};

/** The agreed balance targets (DESIGN Decisions log, 2026-10-04). */
export const TARGETS = {
  win: { easy: [0.87, 0.93], standard: [0.72, 0.78], hard: [0.55, 0.60] },
  forked: { easy: [0, 0.02], standard: [0.03, 0.07], hard: [0.08, 0.12] },
  hardCaptures: [0.2, 0.3], // S9: 0.2–0.3 (was ≥ 0.3; the report checked only ≥ 0.2 until the audit)
  grandYear: { reach: 0.5, dropBelowWin: 0.2 },
  trouble: [0.10, 0.22], // S9: at most 22% (was 20%)
  critical: [0.03, 0.07], // S8: about 5% (was 10–20%)
  spendHalf: 0.5,
  mask: 0.25,
  monster: 0.25,
  outlier: 0.025,
};

/**
 * Packages (sim/README.md §4): rule readings + numbers compared side by side.
 * P0 is the decided rules (S1–S8, the defaults) with the approved numbers (S9).
 * The draft 0.2 packages (T1, T2) and the S9 proposal (D1) are in the git
 * history; new candidate packages go here as rule changes are proposed.
 */
export const PACKAGES = {
  P0: { title: "The rules as decided (through B6, 2026-10-06) with the current numbers", params: {}, numbers: {} },
  N1: {
    title: "Retune tried for a party that stays together: final-flight Lead starts at 3; final mob 11 / 12 / 12; Limits 12 / 12 / 14",
    params: {},
    numbers: { lead: { finalStart: 3 }, labels: { easy: { finalMob: 11 }, standard: { limit: 12, finalMob: 12 }, hard: { limit: 14, finalMob: 12 } } },
  },
  N2: {
    title: "Tried for a party that splits up: the night lasts 8 Turns; final mob 10 / 12 / 12 (on target overall, but Hard wins 42% with 3 Entities and 72% with 5)",
    params: {},
    numbers: { labels: { easy: { turns: 8 }, standard: { turns: 8, finalMob: 12 }, hard: { turns: 8, finalMob: 12 } } },
  },
};
