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
];

export const MODELLED = [
  "Rolling: trait die + Mask d6 / Monster d10, P1 Difficulties, P2 bands, both Critical rules counted.",
  "The Monster shows when the Monster die is higher than the trait die (+1 Suspicion).",
  "Abilities: the four standard effects, one charge each, overdraw (+2 Suspicion), P7 teammates at the same location.",
  "Suspicion: trouble, the Monster showing, Tells, overdraw, loud options and Costs; one roll raises it once by its biggest trigger; never lowered.",
  "Turns (P4), dawn (P5), group checks (P6), Costs (P3), results (P8) including Grand Year and the left-behind step.",
  "Local chases (Lead track), capture, rescue at the lock-up, slipping free; the final flight (shared Lead, majority rule, mob Difficulty by party size).",
  "Carrying: Bulky/Huge carriers, no Mask while carrying, Nimble one size smaller, dropping in the final flight.",
  "Placeholder content: eight anonymous Entities, Gifts as standard effects, a Castle Duty edge, mob/sunlight Weaknesses, Tells on arrival.",
];

export const NOT_MODELLED = [
  "Splitting the party; maps, distances and entrances (Huge pieces and small entrances).",
  "Perks (no placeholder could stand in for real ones).",
  "Premade raids and hand-built maps (only the random-table generator).",
  "Storyteller judgement beyond the parameters (what counts as a witness, improvised approaches).",
];
