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
| 2026-10-04 | **Three ways to build a raid:** a few premade raids in the book built as a sequence of obstacles; a map of locations as an alternative; and random tables the Storyteller can roll a town on, if they want. | Richard's call, combining all three proposed structures. Confirmed by Richard: all three use the same parts (obstacle = trait + Difficulty; location = 1–3 obstacles + loot + at least two ways in; raid = locations visited until dawn, Suspicion throughout), and the random tables use a difficulty budget so a rolled town plays at its label's win rate |
| 2026-10-04 | **A new town every raid; every session stands alone.** It is always the first stock-up: the Entities have never seen or looted this town. No town memory. | Richard: the yearly return is the story premise, not a continuity mechanic. Difficulty labels come from each town's own content. Whether the castle or the Entities carry anything between sessions is open (Q6, Q9) |
| 2026-10-04 | **The raid happens on the town's yearly festival night; everyone is in costume; dawn ends the raid.** | Explains why it is once a year and why the Mask works; keeps sunlight-type Weaknesses live (dawn is everyone's deadline). How the night's length is counted (stops, rounds) is open. The festival's name and customs are content still to be decided |
| 2026-10-04 | **The shopping list is rolled:** the Storyteller rolls items on a table, the number set by difficulty; each item points to a kind of location. Premade raids give their own fixed list. | Chosen over fixed-by-town and a points menu. The example counts (Easy 3, Standard 4, Hard 5) are not decided; the simulator proposes them. Castle Duty edges apply to kinds of items |
| 2026-10-04 | **Essentials and extras:** each list has 1–2 essential items; the rest are extras. A win is the essentials plus most of the extras; missing an essential is at best a partial. | Chosen over win-by-share and points. Still to define: "most" of the extras, and what makes a loss |
| 2026-10-04 | **Nothing carries over by default.** The result decides the epilogue on a short "how the year went" table (story only). Optional campaign rules for groups who want continuity go in a sidebar (Q9). | Because nothing carries over, losing must be felt inside the session: the epilogue and what getting forked costs (Q8) |
| 2026-10-04 | **Furniture's reward: a "Grand Year" result above a win** — win, and bring home at least one piece of furniture or decor. | Chosen over "counts as two extras" and personal desires. Nothing carries over, so the reward lives inside the session. The simulator checks that going for it is a real gamble, neither free nor a trap |
| 2026-10-04 | **Carrying: size classes.** Bulky = one carrier, Huge = two. While carrying you can't use the Mask die (every roll is a Monster roll). Carriers roll Nimble one size smaller. Huge pieces don't fit small entrances. You can drop a piece at any time. | Chosen over a flat +1 Suspicion per location and extra stops. Noise comes from the existing Monster rule. Settles the Heisty carrying gap up front |
| 2026-10-04 | **Suspicion: one town-wide track to a Limit, plus getting caught along the way.** Trouble in front of witnesses gets the Entities involved caught and starts a chase from that location; the current Suspicion sets how big and dangerous that mob is. At the Limit the whole town hunts and everyone still in town must flee to the woods. | Chosen over one big chase at the Limit only, and per-Entity tracks. The Limit per difficulty is set in the simulator |
| 2026-10-04 | **A Monster roll raises Suspicion when the Monster die rolls higher than the trait die.** | The monster did the work, and it showed. Odds: d4 trait 75%, d6 65%, d8 55%, d10 45%, d12 38%. Chosen over every visible Monster roll and a flat 9–10 |
| 2026-10-04 | **Suspicion package** (numbers are simulator starting values): a trouble result +1; a Tell +1 when triggered; overdraw +2; one roll raises Suspicion only once, by its biggest trigger; good results never lower Suspicion (only a few specific abilities or Perks, within limits); each obstacle lists one or two traits that work, usually one of them the loud way, and any other trait needs an ability. | Richard: "package is fine". Free trait switching would let everyone roll d12 + Monster d10 (about 8% failure at Difficulty 8) |
| 2026-10-04 | **The chase is a Lead track.** Start with a small Lead; each round roll against the mob's Difficulty (which grows with Suspicion): success +1 Lead, cost no change, trouble −1. Reach the escape number and you've lost them. Each round rolls the ground on a d6 chase table, which lists the traits that work; every result offers at least one option that isn't Nimble. Once the mob brings an Entity's Weakness, that Entity rolls its trait one size smaller in the chase. The final flight to the woods needs a bigger Lead than a local chase. | Chosen over escape obstacles and a success race. Lead numbers, mob Difficulty and the chase table are for the simulator and for Richard to approve. How a party's shared Lead moves is open |
| 2026-10-04 | **Forked = the whole party cornered by the mob in the final flight: the monsters are killed and the raid is lost.** Forking only happens after the job is botched (Suspicion hits the Limit) and the party is fleeing town with what it stole. Escaping means getting away with the goods. | Richard: "in stories it's when the town would chase off monsters with pitchforks to kill them". It ends the session for everyone at once, so no single player sits out; sessions stand alone, so the Entities are back next session as if nothing happened. This is the Loss result. Losing a local chase mid-raid is not forking: it is being captured (see below) |
| 2026-10-04 | **Two kinds of chase.** During the raid, trouble in front of witnesses starts a local chase for the Entities involved: escape and carry on; lose and you are captured (for theft or suspected magic), not forked. When Suspicion hits the Limit, every Entity who isn't captured flees together in one final flight: escape and keep the goods; cornered and the party is forked. | Richard confirmed this reading |
| 2026-10-04 | **The final flight's shared Lead moves by majority:** everyone rolls; if successes outnumber trouble the Lead rises 1, if trouble outnumbers successes it falls 1, otherwise no change. | Chosen over worst result (a party of five loses ground 67% of rounds) and one runner per round. Bigger parties do somewhat better, so the simulator sets the mob's Difficulty by party size |
| 2026-10-04 | **Captured: held until rescued.** The captive is held at a location; the party can rescue them (that location becomes an obstacle and costs time before dawn); the captive may try to slip free once per stop (a failed attempt: Suspicion +1). Anyone still held when the party leaves town is left behind, and the result drops one step for each. | Chosen over out-for-the-raid and no capture. Keeps the captured player rolling |
| 2026-10-04 | **Core rules gap fills P1–P8 approved** (`docs/CORE-RULES.md`): P1 Difficulty 6 easy · 8 standard · 10 hard · 12 daunting; P2 Success = meet the Difficulty, Cost = 1–2 short, Trouble = 3+ short; P3 a Cost is one of Suspicion +1, drop an item, lose a Turn, next roll one size smaller (Storyteller picks); P4 the night is a number of Turns, each Entity rolls once or moves per Turn; P5 at dawn anyone still in town starts the final flight; P6 group checks: everyone rolls and passes on their own result, Suspicion rises once by the worst; P7 abilities may target any Entity's roll at the same location, no die raised more than one size per roll; P8 Win = all essentials + at most one extra missing, Partial = at least half the list home, Bust = less, Forked = cornered in the final flight; each Entity left behind drops the result one step. | Richard: "all fine". Numbers marked [sim] in CORE-RULES stay with the simulator |
| 2026-10-04 | **Balance targets:** Win (incl. Grand Year) Easy ~90%, Standard ~75%, Hard ~55–60%; Forked Easy ≤2%, Standard ~5%, Hard ~10%; captures ≥0.3 per Hard raid; a party going for furniture reaches Grand Year about half the time and drops below a Win about 1 time in 5; Trouble and Criticals each 10–20% of rolls; at least half of Entities spend at least half their charges; Mask and Monster each on at least a quarter of rolls; no Entity, Gift, Perk or Duty more than ±2.5 points from the average win rate. | Agreed before the first simulation |
| 2026-10-04 | **Table: 3–5 players plus the Storyteller.** | The simulator runs at 3, 4 and 5 players. Session length, tone and GM style (rest of Q10) still open |
| 2026-10-04 | **S1 — once the hunt is on** (the final flight, from the Limit or dawn): Suspicion stops; **the Mask is off** (everyone rolls the Monster die); an Entity may still overdraw, but **its Weakness is then in play for the rest of the flight** (its trait one size smaller), and once its Weakness is in play it can't overdraw again. | Chosen over no overdraw in the flight and a growing mob fury (which maxes out and then lets overdraws go free again). The simulator found overdraw free in the flight (about 18 boosted rolls per raid). Final-flight numbers are retuned under S9 (simulated: mob Difficulty 10/11/11 and a starting Lead of 3 give wins 94/73/54%, forked 0.4/7.5/11.1%) |
| 2026-10-04 | **S2 — the Monster showing costs +2 Suspicion** (was +1). Still "one roll raises Suspicion once, by its biggest trigger". | Chosen over showing on ties, a safe Mask (the Mask became the only sensible die, the game much easier and captures vanished) and leaving it. Simulated with Limits raised to 10/13/14: Mask on 35% of the rolls where you choose; always-Monster costs 2.5/7.1/4.8 points and always-Mask 2/16/14, so both dice matter; wins 95/75/57%, forked 0.2/6.8/10.5%. The Limits are numbers for S9 |
| 2026-10-04 | **S3 — a dropped item falls where you are; picking it up costs that Entity its next action.** | Chosen over lost for good (17–22 points harsher, and Easy could not reach 90%) and extras-only drops (still heavier than the other Costs). All four Costs now cost about the same (Heisty lesson). Simulated with the exit roll: wins 94.5/75/57.5% |
| 2026-10-04 | **S4 — getting out of town is a roll.** The way out is one watched obstacle (Sly or Nimble, or Brawn the loud way); one Entity rolls for the party (the party picks who leads them out). A Success or Cost gets everyone out; Trouble raises Suspicion and that Entity is caught, and the party may try again next Turn. | Chosen over walking out free, everyone rolling (worsens the big-party problem), and carriers only (no effect). Every raid ends with a moment of risk. The exit Difficulty per label is a number for S9 (simulated 6/8/8). Furniture's risk is S7 |

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
5. **The town.** *Decided 2026-10-04: premades + map + optional random tables; a new town every raid; festival night, ends at dawn (see the Decisions log).*
   - How a town is structured: a map of districts or shops, a sequence of obstacles, or a sandbox.
   - Is it the same town every year, changing as it remembers past raids?
   - When does the raid happen: night, a festival, market day? Do the Entities disguise themselves?
6. **The shopping list.** *Decided 2026-10-04: rolled list; essentials + extras; nothing carries over by default (see the Decisions log).*
   - How the Storyteller sets what must be replenished, and how much.
   - What a partial haul means.
   - Do consequences carry over to the castle next year (running low, the castle decaying)?
7. **Furniture and decor ("if they really really want it").** *Decided 2026-10-04: Grand Year reward; size-class carrying (see the Decisions log).*
   - What makes it tempting: castle upgrades, personal rewards?
   - What makes it risky: bulky, slow, loud?
8. **Getting caught.** *Part 1 decided 2026-10-04: Suspicion track + caught along the way; the Monster-higher-than-trait trigger; the Suspicion package (see the Decisions log). Part 2: Lead-track chase and forked = party killed in the final flight decided. Majority rule for the final flight and held-until-rescued capture decided. Q8 is settled.*
   - What raises suspicion, and what triggers the chase.
   - How the chase works.
   - What "getting forked" means mechanically: out for the session, captured and rescued, a lasting scar? These are immortal-ish monsters, so how lethal is it?
   - Can a forked Entity still contribute?
9. **Campaign.**
   - Does each session advance a year?
   - Do the castle and Entities improve?
   - Does the village escalate (more guards, a monster hunter)?
10. **Table.** *Players decided 2026-10-04: 3–5 plus the Storyteller.* Number of players, session length, age/tone (cosy-spooky? slapstick? horror-comedy?), GM-full or GM-light.
11. **Art direction.** Palette and look (Heisty used "heist noir"), and how the Entities are drawn.
12. **Foundry.** Online version from day one? The recommendation from Heisty is yes, automation-first, with the rules engine designed so every rule is automatable.
13. **Name check.** Search for existing products called "Don't Get Forked" before committing to store pages or art with the title.

### Raised by the first simulation (2026-10-04; details in `sim/FINDINGS.md`)
Not decisions. These need Richard's call before the core rules are final:
- ~~**S1.**~~ *Decided 2026-10-04 (see the Decisions log): the Mask is off, and overdraw costs your Weakness.*
- ~~**S2.**~~ *Decided 2026-10-04: the Monster showing costs +2 Suspicion.*
- ~~**S3.**~~ *Decided 2026-10-04: a dropped item can be picked up again, at the cost of the next action.*
- ~~**S4.**~~ *Decided 2026-10-04: one Entity rolls the way out for the party.*
- **S5.** Bigger parties do worse (Hard 63 / 58 / 47% for 3 / 4 / 5 Entities).
- **S6.** Captures are rare (0.11 per Hard raid against ≥ 0.3).
- **S7.** Furniture is safe for a cautious party and a trap for a greedy one.
- **S8.** The Critical rule and effect (beat by 7 or 8 lands in the 10–20% band).
- **S9.** The proposed numbers (list sizes, Difficulty mixes, Limits, mob Difficulties, Lead numbers) in `sim/FINDINGS.md`.

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
