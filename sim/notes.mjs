/**
 * Rule gaps found while building the simulator, and what is and isn't
 * modelled (sim/README.md §7). Each gap names the passage that leaves it open
 * and the parameter (if any) that carries the simulator's choice.
 */

export const GAPS = [
  { id: "G1", title: "What a Critical does", ref: "CORE-RULES Rolling 3", param: "critEffect",
    note: "The Critical rule itself is open (doubles vs beat by 4), and no effect is given. With \"good results never lower Suspicion\", a Critical needs some other reward, or it should be dropped." },
  { id: "G2", title: "What \"the loud way\" does", ref: "DESIGN Suspicion package", param: "loudRule",
    note: "Obstacles list a loud option, but its cost is never stated (+1 Suspicion always? counts as witnessed?)." },
  { id: "G3", title: "What \"open an approach nobody else can take\" does", ref: "CORE-RULES Abilities", param: "openApproach",
    note: "Described only as fiction. Is it unwatched? A different Difficulty? Otherwise it is the same as using the ability's trait." },
  { id: "G4", title: "Overdraw and the Monster die once Suspicion is at the Limit", ref: "CORE-RULES Abilities; Suspicion", param: "overdrawAtLimit",
    note: "RESOLVED by S1 (CORE-RULES 0.3): once the hunt is on, Suspicion stops, the Mask is off, and overdraw puts your Weakness in play for the rest of the flight." },
  { id: "G5", title: "P7's raise cap: per die or per roll", ref: "CORE-RULES P7", param: "raiseCap",
    note: "\"No die is raised more than one size\" lets the trait die and the second die each be raised once. If one raise per roll was meant, say so. Does a Castle Duty edge count toward it?" },
  { id: "G6", title: "A captive's loot", ref: "DESIGN Captured", param: "captiveItems",
    note: "Does the town take back what a captured Entity carried?" },
  { id: "G7", title: "Several Entities caught by one roll", ref: "DESIGN Two kinds of chase", param: "multiCaught",
    note: "A group check can catch several Entities at once. One local chase on a shared Lead (like the final flight), or one chase each?" },
  { id: "G8", title: "Does a chase take time?", ref: "CORE-RULES P4", param: null,
    note: "The simulator resolves a local chase inside the Turn it started. If chase rounds should use Turns, dawn gets closer." },
  { id: "G9", title: "\"Drop an item\" with nothing carried", ref: "CORE-RULES P3", param: "costChoice",
    note: "Early in the raid the party carries nothing, so this Cost is free. The Storyteller should pick a Cost that bites." },
  { id: "G16", title: "Is a dropped item lost?", ref: "CORE-RULES P3", param: "dropRule",
    note: "RESOLVED by S3 (CORE-RULES 0.5): a dropped item falls where you are; picking it up costs that Entity its next action." },
  { id: "G10", title: "Below d4", ref: "CORE-RULES Carrying, Chase, P3", param: null,
    note: "Several effects make a die one size smaller; nothing says what is below a d4. The simulator floors at d4." },
  { id: "G11", title: "Suspicion past the Limit", ref: "DESIGN Suspicion", param: null,
    note: "A roll that adds +2 at one below the Limit loses the extra point. Harmless, but the book should say the track stops at the Limit." },
  { id: "G12", title: "Who may roll at a single obstacle each Turn", ref: "CORE-RULES P4", param: null,
    note: "P4 gives every Entity one roll per Turn, so a big party can try the same lock four times in one Turn. The simulator allows it (each try risks Suspicion)." },
  { id: "G13", title: "Can two Entities take the same Castle Duty?", ref: "DESIGN Picks", param: null,
    note: "Not stated. The simulator allows it." },
  { id: "G14", title: "Where captives are held, and whether the rescue obstacle resets", ref: "DESIGN Captured", param: null,
    note: "The simulator uses one lock-up per town (Sly, or Brawn the loud way, always watched) and a new rescue obstacle for each capture." },
  { id: "G15", title: "Getting out of town costs nothing", ref: "CORE-RULES The raid", param: "exitRule",
    note: "Once the loot is in hand the party walks out with no roll unless the Limit or dawn has hit, so carrying furniture (no Mask, Nimble smaller) and late Suspicion cost almost nothing. Heisty lesson: losing must cost something even at the end; every scenario had 1–2 escape obstacles." },
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
