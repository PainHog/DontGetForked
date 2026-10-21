/**
 * Rule gaps found while building the simulator, and what is and isn't
 * modelled (sim/README.md §7). Each gap names the passage that leaves it open
 * and the parameter (if any) that carries the simulator's choice.
 */

export const GAPS = [
  { id: "G1", title: "What a Critical does", ref: "CORE-RULES Rolling 3", param: "critEffect",
    note: "RESOLVED by S8 (CORE-RULES 0.10): a Success on doubles; +2 Lead in a chase, otherwise one spent charge back." },
  { id: "G2", title: "What \"the loud way\" does", ref: "DESIGN Suspicion package", param: "loudRule",
    note: "RESOLVED by R1 (S11): +1 Suspicion whatever the result." },
  { id: "G3", title: "What \"open an approach nobody else can take\" does", ref: "CORE-RULES Abilities", param: "openApproach",
    note: "RESOLVED by S10 (CORE-RULES 0.12): roll the ability's trait at 2 lower Difficulty, watched as usual." },
  { id: "G4", title: "Overdraw and the Monster die once Suspicion is at the Limit", ref: "CORE-RULES Abilities; Suspicion", param: "overdrawAtLimit",
    note: "RESOLVED by S1 (CORE-RULES 0.3): once the hunt is on, Suspicion stops, the Mask is off, and overdraw puts your Weakness in play for the rest of the flight." },
  { id: "G5", title: "P7's raise cap: per die or per roll", ref: "CORE-RULES P7", param: "raiseCap",
    note: "RESOLVED by R2 (S11): at most one raise per roll, from any source, Castle Duty included." },
  { id: "G6", title: "A captive's loot", ref: "DESIGN Captured", param: "captiveItems",
    note: "RESOLVED by R3 (S11): the town takes it back." },
  { id: "G7", title: "Several Entities caught by one roll", ref: "DESIGN Two kinds of chase", param: "multiCaught",
    note: "RESOLVED by R4 (S11): they flee together on one shared Lead (majority rule)." },
  { id: "G8", title: "Does a chase take time?", ref: "CORE-RULES P4", param: null,
    note: "RESOLVED by R5 (S11): a local chase happens within the Turn it started." },
  { id: "G9", title: "\"Drop an item\" with nothing carried", ref: "CORE-RULES P3", param: "costChoice",
    note: "RESOLVED by R10 (S11): the Storyteller picks it only if someone carries loot." },
  { id: "G16", title: "Is a dropped item lost?", ref: "CORE-RULES P3", param: "dropRule",
    note: "RESOLVED by S3 (CORE-RULES 0.5): a dropped item falls where you are; picking it up costs that Entity its next action." },
  { id: "G10", title: "Below d4", ref: "CORE-RULES Carrying, Chase, P3", param: null,
    note: "RESOLVED by R6 (S11): no die goes below a d4." },
  { id: "G11", title: "Suspicion past the Limit", ref: "DESIGN Suspicion", param: null,
    note: "RESOLVED by R11 (S11): the track stops at the Limit." },
  { id: "G12", title: "Who may roll at a single obstacle each Turn", ref: "CORE-RULES P4", param: null,
    note: "RESOLVED by R7 (S11): allowed; each try risks Trouble." },
  { id: "G13", title: "Can two Entities take the same Castle Duty?", ref: "DESIGN Picks", param: null,
    note: "RESOLVED by R8 (S11): no two Entities in a party share a Duty." },
  { id: "G14", title: "Where captives are held, and whether the rescue obstacle resets", ref: "DESIGN Captured", param: null,
    note: "RESOLVED by R9 (S11): one lock-up per town, a new rescue obstacle for each capture." },
  { id: "G15", title: "Getting out of town costs nothing", ref: "CORE-RULES The raid", param: "exitRule",
    note: "RESOLVED by S4 (CORE-RULES 0.6): the way out is one watched obstacle, rolled by one Entity for the party." },
  { id: "G17", title: "A roll that succeeds and also fills the Limit", ref: "Chapters 4 and 6; outside review R1", param: "limitOrder",
    note: "RESOLVED by R1 (2026-10-20): the result happens first, then its Suspicion: out at the way out, freed by a rescue (and into the final flight), the loot in hand." },
  { id: "G18", title: "Several tries at the way out in one Turn", ref: "Chapter 4; outside review R4", param: "exitTries",
    note: "RESOLVED by R4 (2026-10-20): one try a Turn (the simulator's reading since the audit)." },
  { id: "G19", title: "Spectral during a move, and the way in", ref: "Chapters 2 and 4; outside review R10, R13", param: "spectralWhen",
    note: "RESOLVED by D4 (2026-10-19/20): the pass needs no roll and no action, so it works on the arrival Turn, and it never picks the way in." },
  { id: "G20", title: "Several overdraws on one roll; an overdraw where the Monster may show anyway", ref: "Chapter 3; outside review D3", param: "overdrawStack",
    note: "RESOLVED by D3 (2026-10-19): outside the final flight every overdraw adds +2 on top of the roll's other rise." },
  { id: "G21", title: "No way to stop a local chase", ref: "Chapter 6; outside review D2", param: "giveUp",
    note: "RESOLVED by D2 (2026-10-19): at the start of any round a runner may give up: captured, no roll. When the simulated runners do it is a policy." },
];

// Brought up to date by the conformance audit (docs/audits/SIM-AUDIT.md, 2026-10-06); the rule-by-rule table is there.
export const MODELLED = [
  "Rolling (Chapter 3): trait die + Mask d6 / Monster d10 against 6 · 8 · 10 · 12; Success, Cost, Trouble; a Critical (doubles on a Success) gives a charge back, or counts as two Successes in a chase.",
  "The Monster shows when it rolls higher than the trait die: Suspicion +2; one roll raises Suspicion once, by its biggest trigger (loud way, Trouble, the Monster, a Cost), and every overdraw adds +2 on top (D3); a roll's result happens before its Suspicion (R1).",
  "Abilities: the four standard effects and the Draught, one charge each, helping anyone at the same place (only an opened approach is your own roll's), one raise per roll (Castle Duty included), overdraw (+2 Suspicion on top, D3; one per runner in a local chase, 2026-10-21; once the hunt is on, once per flight, a step down of its own from the next roll to the end of the flight, on top of any Weakness and allowed with it, 2026-10-21); in any chase any ability may be spent as a raise (D6b; on your own roll in a local chase, 2026-10-21).",
  "The approved roster (module/config.mjs): the eight Entities' dice, signatures, all 24 Gifts and 24 Perks with their book effects, Weakness timings (Always / Soon); random picks; unique Castle Duties with their raise.",
  "Rolled towns from Chapter 8's tables (obstacle table, counts, Difficulties, watched, the ceiling on 12s, two ways in: never an inside obstacle, at most one group obstacle, W14 2026-10-21) and the three premade towns of Chapter 9 (sim/premade.mjs).",
  "The Suspicion Limit by label, 1 lower on Easy and Standard with five Entities (2026-10-21).",
  "Turns, dawn, group checks (Costs picked after the rolls, F23; one rise by the biggest trigger, every overdraw on top), beaten obstacles, the way out (one roll a Turn for the party, R4), Tells (once per watched location, 4–6), loot handed over, the lock-up (rescue, slipping free on a Success), everyone held ending the night Forked (D7b), left behind, results and the epilogue's ladder.",
  "Local chases (Lead 1 to 4 against 8 + half the Suspicion, at most 11, set when the chase starts; at most 6 rounds, then a Lead of 2 or more escapes and less is cornered, 2026-10-21; one rise when it ends, by the biggest trigger among its rolls plus +2 for each overdraw, D1), giving up at the start of a round (D2; when, a policy), shared local chases and the final flight (the majority rule moving 1 or 2, B6), the chase table, Weaknesses, the Limit coming with a chase's rise, Already Dead.",
  "Spectral (D4): only at a way in (2026-10-21); no roll and no action, so on the Turn the Ghost arrives too; the pass never picks the way in, which the others pick when they first roll there, and she stays past whichever they pick; at a way in that is the location's only obstacle she takes the item.",
  "Furniture: on the list's locations behind one extra obstacle 2 harder, Bulky / Huge carriers, no Mask, Nimble smaller, moves of two Turns, +1 Suspicion every Turn from taking it until it leaves town or is lost.",
  "The party splits into pairs by default (or singles, or stays together); players follow the documented policies in sim/params.mjs.",
];

export const NOT_MODELLED = [
  "Maps and distances (any move is one Turn) and small entrances (a rolled town has none, B3; no premade town marks one).",
  "Setting a piece of furniture down or abandoning it (V4, V11): the simulated players carry it until they leave or lose it; dropping it in the final flight when about to be cornered is a policy.",
  "Choosing the order of rolls in a final-flight round (V12): the simulated party rolls in a fixed order, which the rules allow.",
  "Storyteller judgement beyond the parameters (what counts as a witness, improvised approaches, which Cost hurts most: the simulator picks one that costs something at random).",
  "Story-only content: the shopping table's items, Lantern Night customs, villagers, the epilogue lines, the campaign upgrades (sim/campaign-check.mjs measures them separately).",
];
