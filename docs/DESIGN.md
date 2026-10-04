# Don't Get Forked — design document

Living document. The **Pitch** is Richard's. **Decisions** are only what Richard has approved. Everything under **Open questions** and **Suggestions** is undecided.

## Pitch (Richard Moore, 2026-10-04)

> The idea is the players can select from one of a set of premade Entities. They would be playing figures like Frankenstein, Dracula, The Mummy, etc. They all live in a castle in the woods and once a year (the session), they must go into town and steal ingredients, and sometimes new furniture/decor (if they really really want it). The goal is to use their supernatural abilities (they have charges), stat rolls and wits to get in and out of the town with the loot the storyteller says you need to "replenish". The game will be called "Don't Get Forked". It's a play on the villagers chasing them with pitchforks. Most of the stuff would happen in the town, but if they are caught they must try to escape before getting "forked".

### What the pitch fixes
- **Title:** *Don't Get Forked* (the villagers' pitchforks).
- **Player characters:** chosen from a set of **premade Entities**: classic monsters such as Frankenstein's creature, Dracula and the Mummy.
- **Home base:** a shared **castle in the woods**.
- **One session = one yearly raid** on the town.
- **Goal:** bring back the loot the Storyteller says the castle needs to "replenish": mostly **ingredients**, sometimes **furniture/decor** (optional, high-desire).
- **Tools:** supernatural **abilities with charges**, **stat rolls**, and wits.
- **Most play happens in the town.** If caught, the Entities must **escape before they get "forked"**.

## Decisions log
| Date | Decision | Notes |
|---|---|---|
| 2026-10-04 | Title, premise and core loop as in the pitch above | — |
| 2026-10-04 | Private repository; same toolchain as Heisty Spideys (book pipeline, simulator, Foundry system) | Foundry automation-first is the default from Heisty's lessons; confirm in the first session |
| 2026-10-04 | **Engine: build a new resolution system** (not a reskin or adaptation of the Heisty Spideys engine) | Chosen over reuse-as-is and adapt-the-dice-core. Consequences: balance is simulated from zero; the Foundry dice, roll dialog and threat ledger and the simulator engine are written fresh for this game (the toolchain stays). The lessons in `docs/LESSONS.md` still apply to the new system. Which system: still open (Q1) |
| 2026-10-04 | **Resolution: step dice.** Each trait is rated as a die from d4 to d12. A roll is the trait die plus a second die, added together against a Difficulty number; the total falls into bands (success, success with a cost, trouble). | Chosen over "highest d6 + Monster dice" and "2d6 + stat" because it puts each monster's personality on the sheet. Still open: what the second die is (Q3); the Difficulty numbers, band edges and Critical rule (set in the simulator; "beat by 4" makes Criticals scale with die size, "a success on doubles" is flatter); whether charges add a Monster die and what triggers Suspicion from it (Q4) |
| 2026-10-04 | **Guardrail 1: every Entity has the same set of trait dice, arranged differently.** | Same budget, different shape, so no Entity starts stronger (LESSONS: starting resources must not swing by species). The exact set depends on the number of traits (Q3) |
| 2026-10-04 | **Guardrail 2: the situation sets the trait.** The Storyteller calls which trait a task uses; choosing a different approach costs something. The monstrous approach (the Entity's big die) is the loud one. | Stops every Entity rolling its d12 every time, which would erase the spread and the risk. What a switch costs (Suspicion, a charge, or other) is open (Q4/Q8) |
| 2026-10-04 | **Roster: eight Entities at launch, no duplicates in a party:** Dracula, Frankenstein's creature, the Mummy, the Werewolf, the Invisible Man, a Ghost, a Witch, and Jekyll & Hyde. | Chosen over six (classic or mixed) and four-now-more-later. Names come from the public-domain books and folklore ("the Werewolf", not "the Wolf Man"); designs are original (rights note). Jekyll & Hyde is a two-form Entity: one sheet, two arrangements of the same dice set (guardrail 1). Flags carried forward: the Invisible Man's invisibility and the Ghost's walking through walls must not skip rolls (Q4); Jekyll & Hyde is the hardest to balance |
| 2026-10-04 | **Entities are premade, with 2–3 picks each** for variety and replayability | More than a single perk choice. What the picks are is open (Q2c follow-up). Every pick gets a default and a random-table entry (LESSONS: character creation) and every option is measured in the simulator for win-rate outliers |
| 2026-10-04 | **Each Entity has: its dice arrangement, supernatural abilities with charges, a Weakness and a Tell.** | Weakness: a classic weakness the town can use against it (sunlight, silver, fire…), which is why the mob is dangerous. Tell: how it gives itself away in town. Weaknesses must cost about the same and come up about as often; every Tell is a Suspicion trigger and falls under "one event, one trigger". Specific Weaknesses and Tells are content for Richard to approve |
| 2026-10-04 | **The picks: Gift + Perk + Castle Duty.** Fixed core per Entity: dice arrangement, one signature ability, Weakness, Tell. **Gift:** one of three versions of the Entity's second supernatural ability. **Perk:** one of three passive edges, Entity-specific. **Castle Duty:** a shared list of about six household jobs any Entity can take, each with a small edge tied to the shopping list and a role in the party. | Chosen over Gift + Perk only, and Gift + Perk + Origin (dice swaps). 9 builds × ~6 duties ≈ 54 per Entity from about 54 written options. Each pick has a marked default and a random-table entry. The job list, its size and every Gift/Perk are content still to be approved (the examples given — Cook, Gardener, Librarian, Butler; bat/mist/wolf form — are illustrations only) |
| 2026-10-04 | **Five traits: Brawn, Nimble, Sly, Charm, Wits.** Every Entity has one each of d12, d10, d8, d6 and d4, placed differently (guardrail 1). | Brawn: force, lifting, breaking, fighting. Nimble: climbing, running, slipping free. Sly: sneaking, hiding, stealing. Charm: talking, bluffing, passing as human. Wits: noticing, knowing, figuring out. Chosen over four traits and six (with Grit) |
| 2026-10-04 | **The second die: Mask d6 or Monster d10, chosen on every roll.** Same pair for every Entity. Mask = passing as human, quiet. Monster = letting it out, stronger, risks Suspicion. | Chosen over a flat d6 and a rated skill die. What exactly makes a Monster roll raise Suspicion is open (Q8, simulator). Replaces the earlier idea of charges adding a Monster die: charges power abilities instead (Q4). Odds at Difficulty 8 (fail): d8 trait 21% Mask / 13% Monster; d4 trait 42% / 25% |
| 2026-10-04 | **Two abilities per Entity (signature + Gift); one charge = one use; every ability does one of a few standard effects:** raise a die one size; use the ability's trait instead of the one called (the paid switch of guardrail 2); roll the Monster die without risking Suspicion; open an approach nobody else can take — still with a roll. **No ability ever passes automatically.** | Perks and Castle Duty are passive and cost no charges. Chosen over adding a generic "raise a die" use, and over abilities costing 1–3 charges. Each Entity's abilities are flavoured uses of these effects |
| 2026-10-04 | **Charges: the same number for every Entity, fully refilled once a year at the castle; unspent charges are lost.** | Chosen over feeding in town and carry-over (death-spiral risk). The number is not decided: the simulator starts at 3 per raid and the result comes back to Richard. The book must tell players to spend; the simulator checks that most Entities spend at least half |
| 2026-10-04 | **Each Entity has its own charges** (no shared pool) | Chosen over a shared castle pool and a per-Entity-plus-reserve mix. Settles per-character versus per-group for charges |
| 2026-10-04 | **At zero charges an Entity may overdraw:** it can still use an ability, at a heavy cost | Chosen over "nothing more" and "your Tell shows at zero" (which punishes spending). The cost (a Suspicion rise, the Weakness flaring, or other) is open (Q8, simulator); it must not make the game easier |

## Open questions (work through these with Richard, roughly in this order)
1. **Engine.** *Decided 2026-10-04: a new system using step dice, with guardrails 1 and 2 (see the Decisions log).* Left for later: the second die (Q3), Difficulty numbers, bands and Criticals (simulator), the Monster die (Q4). Heisty's engine is a d6 pool with Successes on 5–6, Difficulty, an Alert track to a Limit, and Silk Points; it is fully simulated, balanced and automated in Foundry. Options include reusing it as-is, reusing its core dice with new subsystems, or a new resolution system.
2. **Entities.** *Decided 2026-10-04: eight, no duplicates; premade with 2–3 picks; dice + abilities + Weakness + Tell (see the Decisions log). Picks decided: Gift + Perk + Castle Duty. Still open: each Entity's actual content.*
   - Which monsters, how many at launch, and whether two players can pick the same one.
   - Premade only, or premade with choices (e.g. pick perks)?
   - What makes each one play differently?
3. **Stats.** *Decided 2026-10-04: five traits rated d12/d10/d8/d6/d4, plus a Mask d6 or Monster d10 (see the Decisions log).* Which attributes and skills, if any? How do Entities differ in them?
4. **Supernatural abilities and charges.** *Decided 2026-10-04 (see the Decisions log). Still open: the number of charges and the overdraw cost.*
   - How many abilities per Entity, and what a charge buys.
   - Whether charges refill: once a year, at the castle, or by some in-town action.
   - Whether there's a shared pool or one per Entity, and what happens at zero.
5. **The town.**
   - How a town is structured: a map of districts or shops, a sequence of obstacles, or a sandbox.
   - Is it the same town every year, changing as it remembers past raids?
   - When does the raid happen: night, a festival, market day? Do the Entities disguise themselves?
6. **The shopping list.**
   - How the Storyteller sets what must be replenished, and how much.
   - What a partial haul means.
   - Do consequences carry over to the castle next year (running low, the castle decaying)?
7. **Furniture and decor ("if they really really want it").**
   - What makes it tempting: castle upgrades, personal rewards?
   - What makes it risky: bulky, slow, loud?
8. **Getting caught.**
   - What raises suspicion, and what triggers the chase.
   - How the chase works.
   - What "getting forked" means mechanically: out for the session, captured and rescued, a lasting scar? These are immortal-ish monsters, so how lethal is it?
   - Can a forked Entity still contribute?
9. **Campaign.**
   - Does each session advance a year?
   - Do the castle and Entities improve?
   - Does the village escalate (more guards, a monster hunter)?
10. **Table.** Number of players, session length, age/tone (cosy-spooky? slapstick? horror-comedy?), GM-full or GM-light.
11. **Art direction.** Palette and look (Heisty used "heist noir"), and how the Entities are drawn.
12. **Foundry.** Online version from day one? The recommendation from Heisty is yes, automation-first, with the rules engine designed so every rule is automatable.
13. **Name check.** Search for existing products called "Don't Get Forked" before committing to store pages or art with the title.

## Rights note: classic monsters (not legal advice)
- **Public-domain sources:** these literary characters are in the public domain:
  - Dracula (Bram Stoker, 1897)
  - Frankenstein's creature (Mary Shelley, 1818)
  - The Invisible Man (H. G. Wells, 1897)
  - Dr Jekyll and Mr Hyde (1886)
  - The Phantom of the Opera (1910)
- **Generic folklore:** mummies, werewolves, ghosts, witches and vampires in general.
- **Film designs are not free to use.** The Universal Pictures film designs and branding still belong to Universal. That includes:
  - the flat-topped head with neck bolts;
  - specific makeup looks;
  - the "Universal Monsters" name;
  - characters created for the films, such as the Gill-man from *Creature from the Black Lagoon* (1954).
- **Use original visual designs** and names drawn from the public-domain books or folklore. Avoid echoing *Hotel Transylvania* too closely.
- **Before launch,** check the final roster with someone qualified.

## Suggestions from the Heisty Spideys experience (for discussion, not decisions)
- Heisty's structure maps closely onto this pitch:
  - **Location** → the town;
  - **loot tiers** → the ingredients and furniture;
  - **Alert track** → suspicion and the pitchfork mob;
  - **Escape phase and capture at Full Alert** → the chase;
  - **Silk Points** → ability charges.
  
  Reusing its simulated engine would save months. Renaming everything isn't enough, though; the new game needs its own identity.
- Decide early the things Heisty had to retrofit:
  - group checks;
  - opposed rolls versus Difficulty;
  - what a "scene" is;
  - how NPCs (villagers) are statted;
  - carrying bulky loot;
  - maps with at least two entry points for every ready-to-run town;
  - per-character versus per-group limits.

  See `docs/LESSONS.md`.
- Set win-rate targets before writing rules. Heisty settled on Easy ~90%, Standard ~75%, Hard ~55–60%.
