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
  { key: "dracula", name: "Dracula", duty: "butler", dice: { brawn: 8, nimble: 10, sly: 6, charm: 12, wits: 4 }, signature: { name: "Mesmerise", effect: "open", trait: "charm" },
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
  { key: "creature", name: "Frankenstein’s Creature", duty: "handyman", dice: { brawn: 12, nimble: 8, sly: 6, charm: 4, wits: 10 }, signature: { name: "Brute Force", effect: "switch", trait: "brawn" },
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
  { key: "mummy", name: "The Mummy", duty: "librarian", dice: { brawn: 10, nimble: 4, sly: 6, charm: 8, wits: 12 }, signature: { name: "Ancient Lore", effect: "switch", trait: "wits" },
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
  { key: "werewolf", name: "The Werewolf", duty: "gardener", dice: { brawn: 10, nimble: 12, sly: 6, charm: 4, wits: 8 }, signature: { name: "Good Dog", effect: "hidden" },
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
  { key: "invisible", name: "The Invisible Man", duty: "tailor", dice: { brawn: 4, nimble: 8, sly: 12, charm: 6, wits: 10 }, signature: { name: "Unseen", effect: "hidden" },
    gift: {
      name: "A Scientist’s Tricks",
      versions: [
        { key: "throughTheGap", name: "Through the Gap", effect: "open", trait: "nimble", text: "He slips through as the door swings shut.", default: true },
        { key: "poltergeist", name: "Poltergeist", effect: "raise", text: "Things move by themselves, and everyone looks the other way." },
        { key: "workItOut", name: "Work It Out", effect: "switch", trait: "wits", text: "A scientist’s mind finds another way." },
      ],
    },
    perks: [
      { key: "outOfSight", name: "Out of Sight", text: "Trouble gets you caught only while you carry loot or furniture: they can’t see you, but they can see a floating candlestick.", default: true },
      { key: "hiddenPockets", name: "Hidden Pockets", text: "Captured, you keep what you carry." },
      { key: "lightStep", name: "Light Step", text: "The loud way costs you no Suspicion." },
    ],
    weakness: { name: "Flour", timing: "soon", text: "Someone throws a bag of flour, and there he is." },
    tell: { name: "Bandages and Goggles", text: "A wrapped head, dark goggles, a false nose, and a sneeze from nowhere." },
  },
  { key: "ghost", name: "A Ghost", duty: "butler", dice: { brawn: 4, nimble: 12, sly: 10, charm: 8, wits: 6 }, signature: { name: "Through the Wall", effect: "open", trait: "sly", noLoot: true },
    gift: {
      name: "Haunting",
      versions: [
        { key: "chill", name: "Chill", effect: "raise", text: "A sudden cold, and fingers fumble.", default: true },
        { key: "whisper", name: "Whisper", effect: "switch", trait: "charm", text: "A voice in the ear." },
        { key: "fade", name: "Fade", effect: "hidden", text: "A trick of the light." },
      ],
    },
    perks: [
      { key: "spectral", name: "Spectral", text: "You get past group obstacles without rolling.", default: true },
      { key: "rattle", name: "Rattle", text: "The Monster showing on your roll is Suspicion +1, not +2: nobody takes rattling chains seriously." },
      { key: "alreadyDead", name: "Already Dead", text: "Cornered in a local chase, you lose your next Turn instead of being captured." },
    ],
    weakness: { name: "Cold Iron", timing: "always", text: "Horseshoes, railings, a poker from the fire: every street has some." },
    tell: { name: "Cold Spot", text: "Candles gutter and breath fogs wherever it drifts." },
  },
  { key: "witch", name: "A Witch", duty: "cook", dice: { brawn: 6, nimble: 4, sly: 10, charm: 8, wits: 12 }, signature: { name: "Hedge Spell", effect: "raise" },
    gift: {
      name: "Witchcraft",
      versions: [
        { key: "broomstick", name: "Broomstick", effect: "open", trait: "sly", text: "In over the rooftops, quiet as an owl.", default: true },
        { key: "blackCat", name: "Black Cat", effect: "hidden", text: "Everyone blames the cat." },
        { key: "potionForThat", name: "A Potion for That", effect: "switch", trait: "wits", text: "There’s a potion for everything." },
      ],
    },
    perks: [
      { key: "familiarsWarning", name: "Familiar’s Warning", text: "When you arrive, a Tell check goes off only if a second d6 also rolls 4–6: the cat warns you.", default: true },
      { key: "flyByNight", name: "Fly by Night", text: "In a chase you can always roll Wits." },
      { key: "wiseWoman", name: "Wise Woman", text: "A Cost on your Wits roll is never “lose a Turn”." },
    ],
    weakness: { name: "Rowan", timing: "soon", text: "A sprig of rowan, the old charm against witches: somebody’s grandmother always has one." },
    tell: { name: "A Black Cat", text: "A black cat follows her everywhere and stares at people." },
  },
  {
    key: "jekyll-hyde", name: "Jekyll & Hyde", duty: "librarian", dice: { brawn: 4, nimble: 6, sly: 8, charm: 12, wits: 10 },
    signature: { name: "The Draught", effect: "form" },
    gift: {
      name: "The Other Self",
      versions: [
        { key: "doctorsBag", name: "Doctor’s Bag", effect: "raise", text: "The right instrument for the job.", default: true },
        { key: "pillarOfSociety", name: "Pillar of Society", effect: "hidden", text: "A respectable doctor having a funny turn (if the Monster shows, Hyde still takes over)." },
        { key: "trample", name: "Trample", effect: "open", trait: "brawn", text: "A d4 as Jekyll, a d12 as Hyde." },
      ],
    },
    perks: [
      { key: "practisedHand", name: "Practised Hand", text: "Changing back to Jekyll costs no charge.", default: true },
      { key: "steadyNerves", name: "Steady Nerves", text: "Hyde takes over only if the Monster beats your trait die by 2 or more." },
      { key: "bruteStrength", name: "Brute Strength", text: "As Hyde, carrying doesn’t make your Nimble smaller." },
    ],
    weakness: { name: "A Familiar Face", timing: "soon", text: "Someone in the mob recognises the good doctor." },
    tell: { name: "The Wrong Hand", text: "One hand a gentleman’s, the other hairy and knotted." },
    forms: { jekyll: { brawn: 4, nimble: 6, sly: 8, charm: 12, wits: 10 }, hyde: { brawn: 12, nimble: 10, sly: 8, charm: 4, wits: 6 } },
  },
].map((e) => Object.freeze(e)));

/**
 * C10: the Castle Duties, one per kind of shopping-list item (a d6 in this order).
 * Edge: at a location whose list item is your Duty's kind, your trait die is one size
 * larger on your own rolls there (it counts as the roll's one raise, R2). No two
 * Entities in a party share a Duty (R8); if two defaults clash, the second rolls again.
 */
DGF.duties = Object.freeze([
  { key: "cook", name: "Cook", kind: "food and drink", where: "the baker, the butcher, the tavern cellar", role: "keeps the castle fed and knows every kitchen door" },
  { key: "gardener", name: "Gardener", kind: "plants and seeds", where: "the market garden, the florist, the seed merchant", role: "knows what grows where, and what’s poisonous" },
  { key: "librarian", name: "Librarian", kind: "books and paper", where: "the bookseller, the printer, the schoolhouse", role: "reads the town’s notices and signs" },
  { key: "butler", name: "Butler", kind: "silver, china and linen", where: "the silversmith, the china shop", role: "knows how fine houses run, and where they keep the good spoons" },
  { key: "handyman", name: "Handyman", kind: "tools and hardware", where: "the smithy, the ironmonger, the carpenter", role: "knows how locks and hinges work" },
  { key: "tailor", name: "Tailor", kind: "cloth and costumes", where: "the draper, the tailor, the hatter", role: "keeps everyone’s disguises in one piece" },
].map((d) => Object.freeze(d)));

/** C14: the d66 shopping table: a d6 for the kind (in Castle Duty order), a d6 for the item. Only the kind matters to the rules. */
DGF.shoppingTable = Object.freeze([
  { duty: "cook", items: ["a wheel of strong cheese", "a side of bacon", "a cask of red wine (“for the guests”)", "a sack of flour", "a jar of honey", "the wedding cake in the baker’s window"] },
  { duty: "gardener", items: ["seed potatoes", "a pot of nightshade (purely ornamental)", "rose bushes for the graveyard", "turnip seed for next year’s lanterns", "a crate of lilies", "mushroom spawn for the cellar"] },
  { duty: "librarian", items: ["this week’s newspapers", "black-edged writing paper", "a cookbook “for the guests”", "ink and sealing wax", "an almanac with next year’s moons", "a book of etiquette"] },
  { duty: "butler", items: ["the silver spoons", "a tea service", "bed linen", "a lace tablecloth", "a pair of candlesticks", "a gravy boat"] },
  { duty: "handyman", items: ["a box of nails", "a new lock for the dungeon", "hinges that creak properly", "a lamp and a can of oil", "a coil of rope", "a length of good chain"] },
  { duty: "tailor", items: ["a bolt of black velvet", "bandages, lots", "a top hat", "a new cape", "knitting wool", "boots in a very large size"] },
].map((r) => Object.freeze({ duty: r.duty, items: Object.freeze(r.items) })));

/** C12: the d6 chase table; one roll each round for everyone in the chase (the traits that work there). */
DGF.chaseTable = Object.freeze([
  { key: "crowdedSquare", name: "The crowded square", text: "Lose yourself in the crowd, or bluff your way through.", traits: ["sly", "charm"] },
  { key: "backAlleys", name: "Back alleys", text: "Duck, dodge, double back.", traits: ["nimble", "sly"] },
  { key: "marketStalls", name: "The market stalls", text: "Overturn a cart, vault a stall.", traits: ["brawn", "nimble"] },
  { key: "rooftops", name: "Over the rooftops", text: "Climb, jump, find a way down.", traits: ["nimble", "wits"] },
  { key: "parade", name: "The festival parade", text: "Join in: you’re in costume, after all.", traits: ["charm", "sly"] },
  { key: "deadEnd", name: "A dead end", text: "Break through, or think fast.", traits: ["brawn", "wits"] },
].map((r) => Object.freeze(r)));

/** C13: the festival, and a d6 table of local customs (flavour only, no rules). */
DGF.festival = Object.freeze({
  name: "Lantern Night",
  customs: Object.freeze([
  { key: "lanterns", text: "Turnip lanterns in every window." },
  { key: "parade", text: "A costume parade through the square at midnight." },
  { key: "maskedBall", text: "A masked ball at the mayor’s house." },
  { key: "pies", text: "Pies left on doorsteps “for the wanderers”." },
  { key: "bonfire", text: "A bonfire in the square, and a straw monster burned at dawn." },
  { key: "bells", text: "Bells rung every hour to keep the real monsters away. They never work." },
  ].map((c) => Object.freeze(c))),
});

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
