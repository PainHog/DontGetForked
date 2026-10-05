/**
 * DON'T GET FORKED — System Configuration
 * ---------------------------------------
 * Static, version-agnostic game data lives here (attributes, tracks, tables …)
 * so data models, sheets, dice code and the pure rules logic can all share it
 * without importing any Foundry API. Pure data only: no `game`, `ui`, `foundry`
 * or DOM, so `module/logic/` and the simulator (`sim/`) can import it under plain
 * Node.
 *
 * Source: docs/CORE-RULES.md 1.0 (approved 2026-10-05) until the rulebook chapters
 * exist; then the rulebook (book/src/chapters/) is the source of truth and this file
 * follows it, never the other way round. Labels live in lang/en.json.
 */

export const DGF = {};

/** The system id (must match system.json "id" and contracts.mjs SYSTEM_ID). */
DGF.id = "dont-get-forked";

/** CORE-RULES Entities: the five traits. */
DGF.traits = Object.freeze(["brawn", "nimble", "sly", "charm", "wits"]);

/** CORE-RULES Entities: every Entity has one each of these, placed differently. */
DGF.dieSteps = Object.freeze([4, 6, 8, 10, 12]);

/**
 * The eight Entities' dice (C1) and signature abilities (C2), approved by Richard
 * 2026-10-05 (rulebook Chapter 2). Jekyll & Hyde is one sheet with two arrangements
 * of the same dice (`forms`). A signature does one standard effect (with its trait
 * for "switch" and "open"); Jekyll & Hyde's is "form": The Draught changes Jekyll to
 * Hyde or back (one charge), and the Monster showing on a Jekyll roll turns him into
 * Hyde for free (C2b). Gifts, Perks, Weaknesses and Tells are still to be written.
 */
DGF.entities = Object.freeze([
  { key: "dracula", name: "Dracula", dice: { brawn: 8, nimble: 10, sly: 6, charm: 12, wits: 4 }, signature: { name: "Mesmerise", effect: "open", trait: "charm" },
    gift: {
      name: "Shape of the Night",
      versions: [
        { key: "bat", name: "Bat", effect: "switch", trait: "nimble", text: "He flits up to the window.", default: true },
        { key: "mist", name: "Mist", effect: "hidden", text: "If he shows, it’s only fog." },
        { key: "wolf", name: "Wolf", effect: "raise", text: "The strength and speed of a wolf." },
      ],
    },
    perks: [
      { key: "hypnoticEyes", name: "Hypnotic Eyes", text: "On Charm rolls, the Monster shows only if it beats your trait die by 2 or more.", default: true },
      { key: "oldMoney", name: "Old Money", text: "A Cost on a Charm roll is never Suspicion +1." },
      { key: "wallCrawler", name: "Wall-Crawler", text: "In a chase you can always roll Nimble." },
    ],
    weakness: { name: "Garlic", timing: "always", text: "Every kitchen in town has some, and the mob knows it." },
    tell: { name: "No Reflection", text: "A shop window shows everyone but him." },
  },
  { key: "creature", name: "Frankenstein’s Creature", dice: { brawn: 12, nimble: 8, sly: 6, charm: 4, wits: 10 }, signature: { name: "Brute Force", effect: "switch", trait: "brawn" },
    gift: {
      name: "Made, Not Born",
      versions: [
        { key: "mountainStride", name: "Mountain Stride", effect: "open", trait: "nimble", text: "He bounds over walls the way he crossed the glaciers.", default: true },
        { key: "hovelWatcher", name: "Hovel Watcher", effect: "hidden", text: "He learned to watch unseen." },
        { key: "bookLearned", name: "Book-Learned", effect: "raise", text: "He taught himself from books." },
      ],
    },
    perks: [
      { key: "strongBack", name: "Strong Back", text: "You carry a Huge piece alone.", default: true },
      { key: "tireless", name: "Tireless", text: "Carrying doesn’t make your Nimble smaller." },
      { key: "builtToLast", name: "Built to Last", text: "You slip free from the lock-up on a Success or a Cost." },
    ],
    weakness: { name: "Fire", timing: "soon", text: "Someone has to light the torches." },
    tell: { name: "Head and Shoulders", text: "He stands a head above the whole crowd, and no costume hides it." },
  },
  { key: "mummy", name: "The Mummy", dice: { brawn: 10, nimble: 4, sly: 6, charm: 8, wits: 12 }, signature: { name: "Ancient Lore", effect: "switch", trait: "wits" },
    gift: {
      name: "Secrets of the Tomb",
      versions: [
        { key: "royalBearing", name: "Royal Bearing", effect: "open", trait: "charm", text: "They still bow to a pharaoh.", default: true },
        { key: "justACostume", name: "Just a Costume", effect: "hidden", text: "On festival night, who’d believe a real one?" },
        { key: "oldCurse", name: "Old Curse", effect: "raise", text: "A muttered curse, and the lock gives." },
      ],
    },
    perks: [
      { key: "patienceOfAges", name: "Patience of Ages", text: "“Lose a Turn” is never your Cost.", default: true },
      { key: "keeperOfTreasures", name: "Keeper of Treasures", text: "“Drop an item” is never your Cost." },
      { key: "fearTheCurse", name: "Fear the Curse", text: "The mob in your local chase is 1 easier: nobody wants to get too close." },
    ],
    weakness: { name: "A Loose Thread", timing: "soon", text: "Once someone grabs a loose end, it all starts to unravel." },
    tell: { name: "Dust and Spice", text: "A trail of dust and a smell of old spices wherever it walks." },
  },
  { key: "werewolf", name: "The Werewolf", dice: { brawn: 10, nimble: 12, sly: 6, charm: 4, wits: 8 }, signature: { name: "Good Dog", effect: "hidden" },
    gift: {
      name: "The Wolf Within",
      versions: [
        { key: "keenNose", name: "Keen Nose", effect: "switch", trait: "wits", text: "It smells the way in.", default: true },
        { key: "throughTheHedge", name: "Through the Hedge", effect: "open", trait: "brawn", text: "It goes straight through." },
        { key: "howl", name: "Howl", effect: "raise", text: "A howl that freezes the crowd for a moment." },
      ],
    },
    perks: [
      { key: "nightRunner", name: "Night Runner", text: "Your local chase starts at Lead 2.", default: true },
      { key: "shortcut", name: "Shortcut", text: "The way out is 2 easier when you roll it." },
      { key: "fetch", name: "Fetch", text: "Picking up a dropped item doesn’t cost your action." },
    ],
    weakness: { name: "Hounds", timing: "soon", text: "Someone lets the hunting dogs out." },
    tell: { name: "Eyebrows That Meet", text: "Brows that meet in the middle, and a little too much hair everywhere." },
  },
  { key: "invisible", name: "The Invisible Man", dice: { brawn: 4, nimble: 8, sly: 12, charm: 6, wits: 10 }, signature: { name: "Unseen", effect: "hidden" } },
  { key: "ghost", name: "A Ghost", dice: { brawn: 4, nimble: 12, sly: 10, charm: 8, wits: 6 }, signature: { name: "Through the Wall", effect: "open", trait: "nimble" } },
  { key: "witch", name: "A Witch", dice: { brawn: 6, nimble: 4, sly: 10, charm: 8, wits: 12 }, signature: { name: "Hedge Spell", effect: "raise" } },
  {
    key: "jekyll-hyde", name: "Jekyll & Hyde", dice: { brawn: 4, nimble: 6, sly: 8, charm: 12, wits: 10 },
    signature: { name: "The Draught", effect: "form" },
    forms: { jekyll: { brawn: 4, nimble: 6, sly: 8, charm: 12, wits: 10 }, hyde: { brawn: 12, nimble: 10, sly: 8, charm: 4, wits: 6 } },
  },
].map((e) => Object.freeze(e)));

/** C4: a Tell check is a d6; on this or higher a Tell goes off (whose: roll among the Entities arriving). */
DGF.tell = Object.freeze({ die: 6, goesOffOn: 4 });

/** C3: when the mob brings a Weakness. "soon" bites from this round of a chase (1-based). */
DGF.weaknessTimings = Object.freeze(["always", "soon", "dawn"]);
DGF.weaknessSoonRound = 3;

/** CORE-RULES Rolling 2: the second die. */
DGF.second = Object.freeze({ mask: 6, monster: 10 });

/** P1: the Difficulty ladder. */
DGF.difficulty = Object.freeze({ easy: 6, standard: 8, hard: 10, daunting: 12 });

/** CORE-RULES Abilities: the four standard effects; "open" is the ability's trait at this much lower Difficulty (S10). */
DGF.effects = Object.freeze(["raise", "switch", "hidden", "open"]);
DGF.openApproachEase = 2;

/** CORE-RULES Suspicion: what raises it (one roll raises it once, by its biggest trigger). */
DGF.suspicion = Object.freeze({ trouble: 1, monsterShows: 2, tell: 1, overdraw: 2, loud: 1, cost: 1 });

/** P8 + Grand Year: the year's results, worst to best (Forked stands apart). */
DGF.results = Object.freeze(["bust", "partial", "win", "grand"]);

/** S9 / S10 starting numbers (CORE-RULES, Starting numbers). */
DGF.charges = 3;
DGF.turns = 12;
DGF.lead = Object.freeze({ localStart: 1, localEscape: 4, finalStart: 2, finalEscape: 6 });
DGF.localMob = Object.freeze({ base: 10, perSuspicion: 0.5, max: 12 });
DGF.labels = Object.freeze({
  easy: Object.freeze({ items: 3, essentials: [1], limit: 12, exit: 6, finalMob: 10, lockup: 10, mix: { 6: 0.15, 8: 0.5, 10: 0.3, 12: 0.05 } }),
  standard: Object.freeze({ items: 4, essentials: [1, 2], limit: 13, exit: 8, finalMob: 11, lockup: 10, mix: { 6: 0.15, 8: 0.5, 10: 0.3, 12: 0.05 } }),
  hard: Object.freeze({ items: 4, essentials: [2], limit: 15, exit: 8, finalMob: 11, lockup: 12, mix: { 8: 0.4, 10: 0.45, 12: 0.15 } }),
});
