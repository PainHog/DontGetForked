# Simulation findings

The latest full numbers are in `sim/REPORT.md` (the decided rules with the approved starting numbers, 2,000 raids per label and party size of 3, 4 and 5 Entities, plus presets and sweeps):

```
node sim/run.mjs --runs 2000 --sweep-runs 500
```

**Caveat:** everything runs on placeholder content: eight anonymous Entities, generated towns, and placeholder Gifts, Duties, Weaknesses and Tells. The simulated players follow simple documented policies (`sim/params.mjs`). The results show how the core rules and numbers behave, not how the finished game will play.

## Where things stand (after S1–S11, 2026-10-04)

| Measure | Target | Simulated |
|---|---|---|
| Win, Easy / Standard / Hard | 87–93 / 72–78 / 55–60% | 90.1 / 74.8 / 58.1% |
| Forked, Easy / Standard / Hard | ≤2 / 3–7 / 8–12% | 0.7 / 3.2 / 4.5% (Hard low; the final flight is a knife-edge, see below) |
| Hard win with 3 / 4 / 5 Entities | close together | 57 / 59 / 59% |
| Captures per Hard raid | 0.2–0.3 (revised in S9) | 0.41 (more than needed, in the direction S6 wanted) |
| Trouble, share of rolls | at most 22% (revised in S9) | 20.0% |
| Criticals (doubles on a Success) | about 5% (revised in S8) | 5.0% |
| Entities spending at least half their charges | ≥ 50% | 90% |
| Mask, on rolls where you choose | ≥ 25% | 33% |
| Furniture, greedy party: Grand Year / lost a Win it had | ~50% / ~20% | about 61% / 19% (S7 run) |
| Largest option outlier | within ±2.5 points | +3.9 (a placeholder Gift; real Gifts will replace them) |

## How we got here

The first run (core rules draft 0.2, starting numbers) was far off: Hard was won 10% of the time, nobody was ever forked, and captures were zero. Easy couldn't get above 84% with numbers alone. It found these problems, each now decided (`docs/DESIGN.md`, Decisions log; `book/REVIEW.md` rows 1–9):

| | Finding | Decision |
|---|---|---|
| S1 | Overdraw was free in the final flight (about 18 boosted rolls per raid) | Once the hunt is on, the Mask is off and overdraw puts your Weakness in play |
| S2 | Always rolling the Monster cost under 1 point: no real choice | The Monster showing costs +2 Suspicion |
| S3 | "Drop an item" as a permanent loss was far harsher than the other Costs | A dropped item can be picked up again, for your next action |
| S4 | Getting out of town needed no roll | One Entity rolls the way out for the party |
| S5 | Five-Entity parties were forked in 20% of Hard raids | The final mob isn't scaled by party size; Tells are checked once per location for the party |
| S6 | Captures were rare and captives always freed themselves | Slip free only on a Success; a local chase starts at Lead 1; the lock-up is 2 harder |
| S7 | Carrying cost almost nothing (carriers let others roll) | Furniture stands on the way; carrying it, every move takes two Turns |
| S8 | Criticals had no effect | Doubles on a Success: +2 Lead in a chase, otherwise a charge back |
| S9 | Numbers | The starting numbers (`docs/CORE-RULES.md`, Starting numbers) |
| S10 | "Open an approach" was described only in fiction and, read as unwatched, was the strongest effect | An easier way: the ability's trait at 2 lower Difficulty, watched as usual; Limits 12 / 13 / 15 |
| S11 | Smaller gaps the simulator had to fill | Provisional rulings R1–R11 (`docs/CORE-RULES.md`) |

Along the way the simulated players were improved (they now weigh the cost of being caught properly, which plays 1–3 points better), and several things were measured that matter for the rest of the design:
- **The final flight is a knife-edge.** One point of mob Difficulty moves the forked rate by 10–20 points, because the majority rule turns a small edge per roll into a big edge per round. Forking is decided in the first two or three rounds.
- **Spending works.** A party that hoards its charges loses 11–14 points at Standard and Hard.
- **Tells are a big lever.** The placeholder Tell chance moves Hard by ±9–10 points, so the real Tells need their frequency designed with them.

## After the first playtests (T1–T10, 2026-10-05)
Playtests PT1 and PT2 raised ten rule questions; Richard decided all ten as recommended (`docs/DESIGN.md`). In the simulator:
- **Two ways in (T2) is worth about +5 win points** at Standard and Hard: the party picks the better of two first obstacles. Raising only the trait die (T6) changes nothing measurable; open on unlisted traits only (T5) costs about 1 point.
- With the approved numbers the rules now win **91.5 / 78.1 / 61.8%** (Standard and Hard above target; forked 0.7 / 2.0 / 4.2%).
- **Package N1** put all six win and forked rates on target **for a party that stays together** (before the T5 fix below): the final flight's Lead starts at 3 everywhere, the final mob is 11 / 12 / 12 and the Limits 12 / 12 / 14.

## Splitting the party (2026-10-05)
Both playtests split up, so the simulator now can too (`partyPolicy`: "pairs", the new default; "together"; "singles"). Each group takes its own location, abilities help only within a group, and everyone regroups at the way out (T4).
- **Splitting is much stronger:** with the approved numbers, wins go from 91 / 78 / 62% (together) to **95 / 85 / 69%** (pairs; singles about 1–2 points more). Suspicion, captures and Limit flights hardly change: the gain is time. A party that stays together runs short of Turns and leaves extras behind; a split party doesn't.
- **The 12-Turn clock doesn't bite a split party.** Raids end around Turn 7–8, as both playtests did (Turn 9 and Turn 6).
- **A shorter night isn't the fix on its own.** At 8 Turns (package N2) the overall rates land near target, but Hard wins 42% with 3 Entities against 72% with 5: small parties can't cover the town in time. N1 under split play reaches only 95 / 82 / 65%.
- So the retune belongs with the town tables (how many obstacles a location has and how far apart they are decide how long a raid takes) and the real abilities, in the balance pass.

## Fixes after PT3 (2026-10-05)
- **T5 in the simulator:** an obstacle someone opened now lets only the opener go on (it used to clear the way for everyone). That costs about 1 point with a split party and 3–5 with a party that stays together.
- **Capture timing:** a captive's first try to slip free is the Turn after its capture (the simulator let it try the same Turn).
- **Overdraw** merging with the roll's other triggers or paid on top changes nothing measurable (overdraws during the raid are rare).

## U1, U2 and the real dice (2026-10-05)
- **U2 (handing loot over)** is worth about +0.6 / +1.5 / +1.2 win points: the simulated players hand their loot to someone else before a watched roll.
- **The approved dice (C1)** are now the simulator's default roster (from `module/config.mjs`, shared with the Foundry system), still with placeholder abilities. Overall rates match the anonymous roster within a point.

## For the balance pass (from PT1–PT3 and the simulator)
- **Win rates under split play are above target** (95 / 85 / 69% with the approved numbers); a shorter night alone punishes small parties.
- **A local chase is far deadlier than the final flight.** From Lead 1 against 12 with a d12 trait: 51% escape with the Monster, 19% with the Mask; a three-Entity final flight escapes 84–96%. The local mob reaches its cap of 12 at Suspicion 4, so "rises with Suspicion" hardly matters, and near the Limit the final flight is safer than a local chase.
- **The final flight runs long** (PT2: 9 rounds of 5 rolls) with no choices once charges are gone.
- **The fourth item can be worthless:** with one essential and three extras, a Win allows one extra missing, so once three items are home the fourth adds nothing (PT3 skipped it).
- **A group check raises Suspicion once,** so when one roller risks the Monster the others can too at no extra cost (P6, as decided).
- For the ability writing: hidden does nothing once the hunt is on and open is barred in chases, so only raise and switch work in a final flight; a raise on a d12 is wasted; the d4 floor can erase the carrying penalty; a Weakness in play from round 1 (a sunlight Weakness at dawn) bars overdraw for the whole flight.

## Still open
Win rates are above target under split play (95 / 85 / 69%); the retune waits for the balance pass, after the real Entities, Tells and town tables. Time pressure that doesn't punish small parties is a design question for that pass.

## What the simulation can't tell yet
- **Real content.** Entity balance, real Tells and Weaknesses, and Perks all need the actual Entities.
- **Maps and entrances,** and premade raids (splitting is now modelled, simply).
- **How real players choose** between Mask and Monster, when they go for furniture, and when they rescue a captive.

## Campaign upgrades: what a capped bonus is worth (2026-10-05, for C16)

`node sim/campaign-check.mjs 1000` (1,000 raids per label and party size, the approved roster, split-party play, the same raids for every variant). `numbers.bonusCharges` gives one extra charge to that many Entities (one each). The baseline is the current game, still above the win targets until the balance pass.

| Variant | Easy win / forked | Standard win / forked | Hard win / forked |
|---|---|---|---|
| No upgrades | 95.6% / 0.3% | 85.0% / 2.6% | 69.2% / 4.8% |
| +1 charge (one upgrade) | 95.8% / 0.2% | 85.3% / 2.4% | 69.8% / 4.7% |
| +2 charges | 95.9% / 0.3% | 85.6% / 2.3% | 70.6% / 4.7% |
| +3 charges (cap) | 95.9% / 0.2% | 85.9% / 2.2% | 71.3% / 4.3% |
| +3 charges, all on one Entity | 95.9% / 0.3% | 86.0% / 2.3% | 70.8% / 4.3% |
| +1 Turn | 95.6% / 0.3% | 85.3% / 2.8% | 69.3% / 5.0% |
| Final flight starts at Lead 3 | 95.6% / 0.1% | 85.5% / 1.5% | 70.0% / 2.5% |
| Limit +1 | 96.0% / 0.3% | 85.9% / 2.7% | 71.2% / 5.1% |
| All four (+3 charges, +1 Turn, Lead 3, Limit +1) | 96.6% / 0.1% | 87.7% / 1.0% | 74.1% / 2.0% |

An extra charge is worth about 0.2–0.7 win points; three (the cap) about +0.3 / +0.9 / +2.0 at Easy / Standard / Hard, with forked slightly down. An extra Turn is worth almost nothing under split play. Starting the final flight at Lead 3 halves the forked rate at Hard (the mob is the game's teeth), so it is the one effect to keep out of upgrades. Stacking all three charges on one Entity is a little weaker than spreading them, so the rule needn't forbid it. (Re-run after C16, with furniture rolled on the d6 table: four Bulky pieces in six, where the generator had 70%.) **Decided (C16):** each upgrade is one extra charge for one Entity of the players' choice, at most three.

## Rolled towns: keeping them to their difficulty (2026-10-05, for C17)

The town generator rolls each obstacle's Difficulty and whether it's watched from the label's shares (S9). Two candidates for the rulebook's "difficulty budget", as `numbers.townBudget`: **budget** deals the shares out as a fixed set over the town's obstacles (both ways in counted); **cap** keeps the rolls but allows at most one Difficulty-12 obstacle in an Easy or Standard town and two in a Hard town (extras rolled again). 1,500 raids per label and party size, the same raids for each:

| Town | Easy win / forked | Standard win / forked | Hard win / forked |
|---|---|---|---|
| Rolled (now) | 95.8% / 0.2% | 85.1% / 2.5% | 69.9% / 4.9% |
| Budget | 95.6% / 0.2% | 83.8% / 3.2% | 70.3% / 5.6% |
| Cap on 12s | 95.8% / 0.2% | 85.6% / 2.4% | 71.6% / 4.8% |

How uneven the towns are (4,000 four-item towns; the town's mean Difficulty, 5th–95th percentile, and how many have three or more Difficulty-12 obstacles):

| Town | Standard | Hard |
|---|---|---|
| Rolled | 7.75–9.27; 1.5% | 8.80–10.18; 25.1% |
| Budget | 8.00–9.00; 0% | 9.09–9.83; 11.7% |
| Cap on 12s | 7.73–9.17; 0% | 8.77–9.85; 0% |

**Decided (C17):** the cap. It is now the simulator's default (`NUMBERS.townBudget = "cap"`), so baseline figures from here on include it (Hard about +1.7 win points). A test checks that the generator's shares equal the book's dice.

## The obstacle table: which traits it favours (2026-10-05, for C18)

The generator gave each obstacle random traits (60% with a loud way, 25% group). Two candidate d20 tables in `sim/town.mjs` (`numbers.obstacleTable`), each 12 of 20 with a loud way and 5 group, so the shares are unchanged:

- **c18a** (written the "natural" way: Brawn the loud way 5 times, Charm and Nimble common, Sly and Wits only as quiet ways): Dracula +3.2, Jekyll & Hyde −2.7, two Perks at ±2.5 (1,500 raids per cell). Outside the ±2.5 target.
- **c18b** (every trait the quiet way 4 times; loud ways Brawn and Nimble 3, Charm, Sly and Wits 2; one group obstacle per quiet trait): at 3,000 raids per cell, wins 95.9 / 85.5 / 71.6%, forked 0.3 / 3.2 / 5.0% (random traits: 95.6 / 85.4 / 71.3%, 0.2 / 2.8 / 5.0%); Entities −1.3 to +2.3, Gifts and Perks −2.2 to +2.3, Duties −0.4 to +0.3. Inside the target.

The second way in is rolled again until its quiet trait differs from the first.

**Decided (C18):** c18b, now `DGF.obstacleTable` and the simulator's default (`NUMBERS.obstacleTable = "approved"`).

## Balance pass: candidate number packages (2026-10-06, for B1)

`node sim/balance-pass.mjs [runs] [packages…]`: content and rules as decided (C1–C19), split-party play, the same raids for every package. Targets: win 87–93 / 72–78 / 55–60%, forked ≤2 / 3–7 / 8–12% (Easy / Standard / Hard).

| Package (3,000 raids per label and party size unless noted) | Win E / S / H | Forked E / S / H | Hard win, 3 / 4 / 5 Entities |
|---|---|---|---|
| Now | 95.9 / 85.3 / 71.4 (2,000) | 0.2 / 3.2 / 5.0 | 68.4 / 71.8 / 74.0 |
| Final mob +1 alone (800) | 95.6 / 83.4 / 67.4 | 1.0 / 9.0 / 16.2 | 65.5 / 66.3 / 70.5 |
| List 4 / 5 / 5 items alone (2,000) | 92.7 / 78.7 / 60.4 | 0.1 / 3.9 / 6.7 | 56.9 / 60.5 / 63.7 |
| A: list 4 / 5 / 5 + final flight from Lead 1 (2,000) | 92.3 / 77.3 / 58.8 | 1.1 / 8.1 / 12.8 | 55.6 / 59.1 / 61.7 |
| J: list 4 / 5 / 5 + Limits 12 / 12 / 13 | 92.8 / 77.4 / 55.6 | 0.2 / 4.5 / 7.7 | 51.2 / 56.5 / 59.0 |
| **M: list 4 / 5 / 5 + Standard Limit 12 + Hard way out 10** | **92.8 / 77.4 / 58.2** | **0.2 / 4.5 / 8.1** | 53.6 / 59.1 / 61.9 |

Lower Limits, fewer charges, more watched obstacles or a shorter night each take only 2–4 win points; the final mob's Difficulty is very strong on forked (+1 nearly triples Hard's forked rate); a longer list is what brings wins down evenly. Package M meets every win and forked target. At 2,000 raids: Entities −1.9 to +2.8 (A Ghost +2.8), Gifts and Perks −3.3 to +2.3 (the Werewolf's Fetch −3.3), Duties within ±0.8; Hard captures 0.35 (target 0.2–0.3), Trouble 21.7%.

Targets still missed now and with M (design questions, not numbers): the Mask is chosen on only 22–23% of rolls (target at least a quarter), and a party that goes for furniture reaches a Grand Year about 89% of the time (target about half).

## Fine-tuning after B1 (2026-10-06, for B2)

Measured with the B1 numbers. Switches added: `furnitureRule` noisySlow / slowHard / slowWatched / noisySlowHard, `fetchRule`, `alreadyDeadTurns`.

**The furniture gamble** (target: a party that goes for it reaches a Grand Year about half the time and drops below a Win about 1 time in 5). Measured with `furniturePolicy: "always"` against `"never"` on the same raids, 1,500 per label and party size:

| Rule | Grand Year when tried | Dropped below a Win | Wins in normal play E / S / H |
|---|---|---|---|
| Slow (now) | 71.1% | 8.6% | 92.4 / 77.5 / 57.7 |
| Slow + noisy (+1 Suspicion each Turn carried) | 60.1% | 15.1% | 92.1 / 77.2 / 57.4 |
| Slow + extra obstacle 2 harder | 65.1% | 10.3% | 92.1 / 77.3 / 57.6 |
| Slow + extra obstacle always watched | 67.8% | 10.3% | 91.9 / 77.3 / 57.7 |
| Slow + noisy + 2 harder | 55.1% | 16.5% | 91.9 / 77.1 / 57.5 |

**The Werewolf's Fetch** (−3.2 against its other Perks, which give a head start in every local chase or an easier way out): "drop an item is never your Cost", "carrying doesn't slow you" and "grab a captured companion's loot" all leave it at −3.0 to −3.2 (the situations are too rare). "The final flight starts at Lead +1 while you're in it" brings it to −2.3 (2,500 raids per cell; Hard forked 7.7%).

**A Ghost's Already Dead** losing two Turns instead of one changes nothing measurable; A Ghost stays at +2.7 and the Witch's Broomstick at +2.7–2.8, just over the ±2.5 target (they have ranged 2.3–2.8 across runs).

**Decided (B2):** `furnitureRule: "noisySlowHard"` and `fetchRule: "flight"` are now the defaults.

## Premade towns (C21)

The three towns of Chapter 9 are kept in one file, `book/src/towns.json`; `book/tools/towns.mjs` checks them against Chapter 8's rules (the list, places, obstacle table, Difficulties a label's d20 can roll, the ceiling on Difficulty 12, the furniture 2 harder, two ways in with different quiet traits), the book's town pages and maps are generated from it, and `sim/premade.mjs` plays the same towns. `node sim/premade-check.mjs [runs] [towns…] [--seed n]` plays each town as printed with random parties of 3, 4 and 5 Entities (approved roster, default rules, policies and numbers).

**With the B3 numbers (2026-10-06):** Easy and Standard Limit 11, the final flight escapes at Lead 5 on Easy and Standard (6 on Hard), the local mob 8 + half the Suspicion, overdraw once per final flight, cornered in the round the Limit comes means captured first. Gallowsmere's suit of armour moved from the smithy (the first essential) to the tailor (an extra), as Richard asked, and its printer's back room went from Difficulty 10 to 8; Puddlecombe and Thistlewick are unchanged.

| Town (2,000 raids per party size, seed 1) | Win (target) | Forked (target) | Win, 3 · 4 · 5 | Forked, 3 · 4 · 5 | Captures | Goes for the furniture |
|---|---|---|---|---|---|---|
| Puddlecombe, Easy (12 obstacles, mean Difficulty 8.0, 5 watched) | 89.7% (87–93%) | 0.4% (0–2%) | 87.4 · 90.0 · 91.6 | 0.5 · 0.4 · 0.1 | 0.10 | 13.2% |
| Thistlewick, Standard (15 obstacles, mean 8.1, 7 watched, 2 essentials) | 74.7% (72–78%) | 6.5% (3–7%) | 71.2 · 75.8 · 77.0 | 7.6 · 6.6 · 5.3 | 0.20 | 51.9% |
| Gallowsmere, Hard (18 obstacles, mean 9.3, 12 watched) | 58.4% (55–60%) | 8.9% (8–12%) | 55.8 · 60.6 · 58.7 | 10.8 · 8.3 · 7.5 | 0.38 | 0.1% |

Re-run at 3,000 raids per party size with seed 7: 89.6 / 0.4%, 74.9 / 6.3%, 57.0 / 10.0%; Gallowsmere with seeds 3 and 11: 57.8 / 9.1%, 57.4 / 9.2%. Every town is inside its targets. Thistlewick's forked rate sits half a point under the top of its band whatever its obstacles: unwatching obstacles or making them harder moved its win rate by up to 8 points but its forked rate only between 5.4 and 6.7%, so it comes from the Standard numbers (Limit 11, final mob 11), not from the town.

**The furniture gamble** (`furniturePolicy: "always"` against `"never"` on the same raids, 2,000 per party size): Puddlecombe's stuffed bear is tried in 99% of raids and brings a Grand Year 80% of the time (a Win lost 8.8% of the time); Thistlewick's gilt mirror 82%, 65% (8.8%); Gallowsmere's suit of armour, now at the tailor, 83%, 48% (14.7%). With the default policy (only with Suspicion and Turns to spare) the simulated parties go for the armour in about 0.1% of Gallowsmere raids: on Hard it is a real gamble, close to the target of a Grand Year half the time.

Before B3 (the numbers C21 was tuned on): 90.1 / 0.3%, 76.3 / 6.4%, 56.9 / 8.5% at seed 1. How they were tuned (counts and Difficulties only, all within the rules): the first drafts played 94.7% (Easy), 65.3% (Standard) and 55.9% / 7.9% forked (Hard). Puddlecombe got a watched second obstacle at the market garden (the night watchman) and a watched trapdoor; Thistlewick lost the seed merchant's third obstacle (a Difficulty-12 drainpipe) and two Difficulty-10 watched obstacles became 8; Gallowsmere's strongbox went from 12 to 10 and three ways in became watched. What moves a fixed town most is where the watched marks sit: a watched obstacle the party must cross (the second or third) costs far more than a watched way in, which a party can go round.

## PT4's questions: the final flight, local chases and overdraw (2026-10-06, for B3)

**Simulator correction:** `maxChaseRounds` was 20, and a flight that reached it counted as an escape: about 1 Standard or Hard flight in 10. It is now 200 (a safety stop only). Baseline with the correction, 2,000 raids per label and party size: wins 92.3 / 76.9 / 57.8%, forked 0.3 / 4.6 / 8.8% (still on target); final flights average **10.5 rounds**, and 21–23% of them end forked; 45% of local chases end in capture; Hard captures 0.35 per raid.

`node sim/pt4-check.mjs [runs] [variants…]` (new switches: `overdrawAtLimit: "once"`, `finalCloseIn`, and a label's own `finalEscape`):

| Variant | Win E / S / H | Forked E / S / H | Flight rounds (S · H), forked per flight | Local capture rate, Hard captures |
|---|---|---|---|---|
| Now (2,000) | 92.3 / 76.9 / 57.8 | 0.3 / 4.6 / 8.8 | 10.5 · 10.5, 21–23% | 45%, 0.35 |
| Overdraw once per flight (1,000) | 92.2 / 77.9 / 57.0 | 0.4 / 4.5 / 8.9 | 10.5 · 10.5 | 45%, 0.35 |
| Overdraw feeds the mob's fury (1,000) | 87.7 / 72.1 / 49.8 | 7.7 / 19.0 / 34.3 | 8.9, 86% | — |
| Flight escapes at 5 (1,000) | 92.2 / 78.0 / 57.2 | 0.5 / 4.0 / 7.8 | 7.1 · 6.9, 18–19% | — |
| Mob closes in from round 6 (1,000) | 90.2 / 75.0 / 53.1 | 3.3 / 11.3 / 21.1 | 10.7, 52% | — |
| Local mob 8 + half Suspicion (1,000) | 93.6 / 79.0 / 57.7 | 0.6 / 4.6 / 9.2 | — | 35%, 0.29 |
| Local chase starts at Lead 2 (1,000) | 94.1 / 79.4 / 62.7 | 0.4 / 4.6 / 8.7 | — | 20%, 0.16 |
| C: escape 5, local 8, Standard Limit 11, overdraw once (2,000) | 93.6 / 76.5 / 59.5 | 0.3 / 4.5 / 6.9 | 7.0 · 6.7, 18% | 33%, 0.28 |
| **G: as C, Easy Limit 11, Hard keeps escape 6 (3,000)** | **93.1 / 76.7 / 59.0** | **0.3 / 4.6 / 8.2** | **7.0 · 10.6**, 18 / 22% | **32%, 0.28** |

Overdraw once per flight changes nothing measurable (the simulated players rarely overdraw twice); it only closes the gap in the wording. Package G meets every win and forked target (Easy 93.1, at the edge) and brings Hard captures into the 0.2–0.3 target; Hard flights stay long (the escape at 5 drops Hard forked below 8%).

## Balance after B3 (2026-10-06, for B4)

Measured with all B3 rules (2,500–3,000 raids per label and party size): wins 92.3–92.4 / 74.2–75.3 / 56.0–57.1%, forked 0.3 / 4.3–4.7 / 7.9–8.8% (on target). Entities, Gifts and Perks near or past ±2.5, with their range across six runs (same raids, different variants elsewhere): the Witch's Broomstick +3.0 to +3.6, Dracula +2.3 to +2.9, the Werewolf's Through the Hedge +2.2 to +2.8, Fetch −2.5 to −3.1, Jekyll & Hyde −2.4 to −2.8, the Creature's Book-Learned −2.6 to −2.8. Run-to-run noise on these is about ±0.5.

Tried in memory (`sim/run.mjs` now accepts a roster array, so a patched copy can be played): Broomstick opening with Charm +2.5, **with Nimble −1.1** (Witch −1.4); Through the Hedge with Nimble +2.2; Dracula Charm d10 / Nimble d12 +2.4 (Broomstick then +3.6); Fetch starting the flight 2 higher −2.6, or making the flight's mob 1 easier −2.5 (both too small to matter: flights are rarer and shorter since B3).

**Decided (B4, under Richard's advance approval):** Broomstick opens with Nimble (it fits "in over the rooftops"; the Witch's Nimble is her d4). The rest sit at the edge of the target, within noise, and wait for the playtest.

Other targets now: Hard captures 0.35 per raid (target 0.2–0.3; B3's "cornered at the Limit is captured" adds them back: the same package without it gave 0.28). The Mask is chosen on 22% of all rolls but 36% of the rolls where there's a choice (the final flight forces the Monster); the target ("each on at least a quarter of rolls") is met where there's a choice. A party that always goes for furniture: Grand Year 80% at random towns with the default policy's choices (it only goes when safe).

## The Werewolf's Fetch after B4 (2026-10-06, for B5)

Fetch ("a final flight you're in starts at Lead 3") stayed at −2.9 to −3.3 against the ±2.5 target: since B3, final flights are rarer and shorter, and they rarely turn a raid into a Win. New `fetchRule` values, with `node sim/run.mjs`'s outlier measure (parties with vs without, same label and size):

| Fetch | Seed 1, 1,500 raids per cell | Seed 7, 2,500 raids per cell | Wins E / S / H (seed 7) |
|---|---|---|---|
| flight (B2) | −3.1 (Shortcut +1.5, Night Runner +1.5, Werewolf −0.1) | −2.9 (+0.8, +2.2, −0.2) | 92.5 / 74.7 / 56.3 |
| **flightExit**: also the way out 1 easier for whoever rolls it while the Werewolf is there | **−2.0** (+1.0, +1.0, +0.3) | **−1.8** (+0.2, +1.6, +0.2) | 92.6 / 74.9 / 56.7 |
| flightLockup: also the lock-up 2 easier when it rolls the rescue | −2.8 | — | — |

**Decided (B5, under Richard's advance approval):** `fetchRule: "flightExit"` is the default. The party leaves together, so "while you're there" means "unless you've been captured".

## Option outliers after B5 (2026-10-06)

Full report (2,000 raids per label and party size): every win and forked target met (92.4 / 74.1 / 56.3%, forked 0.4 / 4.6 / 8.8%); Fetch −2.1. Just past ±2.5: the Werewolf's Through the Hedge +2.9, Dracula +2.8, Jekyll & Hyde −2.6, the Creature's Book-Learned −2.8. At 1,500 raids on the same seed, a different set is past the line (Dracula +3.1, Jekyll & Hyde's Brute Strength +2.7 and Steady Nerves −2.7), so the edge cases are run-to-run noise (about ±0.5) around a spread of roughly −2.7 to +3.0.

Tried: an opened approach 1 lower instead of 2 (`openEase: 1`, 1,500 raids): wins fall to 90.2 / 70.9 / 50.7% (Standard and Hard below target), forked rises to 0.5 / 5.8 / 10.2%, and the spread stays −2.6 to +3.1. Not adopted; the rule stays at 2. Recommendation for Richard: no further change until real playtests show an option that feels too strong or too weak at the table.

## PT5's questions: long flights, runaway local chases, furniture noise (2026-10-06, for B6 and V1–V9)

New: chase-length histograms (`hist local rounds`, `hist local susp`, `hist final` in the recorder) and switches `finalMove`, `chaseSusp: capN`, `furnitureNoise`.

**Final flights** (1,000 raids per label and party size, then 2,000 to confirm):

| How the shared Lead moves | Wins E / S / H | Forked E / S / H | Flight rounds, median · 90% · share of 15+ (S / H) |
|---|---|---|---|
| Majority, ±1 (before B6) | 92.4 / 74.1 / 56.3 | 0.4 / 4.6 / 8.8 | 5 · 14 · 9% / 8 · 23 · 23% |
| **±2 when one side leads by two or more (B6)** | **92.2 / 74.2 / 56.1** | **0.8 / 5.0 / 9.1** | **3 · 8 · 1% / 3 · 10 · 3%** |
| By the whole difference | 92.6 / 74.5 / 55.6 | 0.7 / 4.5 / 9.5 | 2 · 6 · 1% / 3 · 8 · 2% |
| Hard escapes at 5, mob 12 | 92.8 / 74.3 / 51.7 | 0.4 / 4.3 / 24.9 | — / 6 · 16 · 12% |
| The mob closes in from round 10 | 92.6 / 73.6 / 53.8 | 0.7 / 6.8 / 17.1 | 5 · 15 · 11% / 8 · 22 · 24% |

With B6, Hard wins by party size 52.3 · 57.1 · 59.0% and forked 10.8 · 9.3 · 7.2% (as before); option outliers −2.7 to +2.7.

**Local chases** (with B6): a local chase lasts 3 rounds (median), 6 at the 90th percentile; 1.5% of Hard local chases last 10 or more. One chase in five raises Suspicion by 6 or more, and 1.5% of Hard raids are forked by Turn 4. Capping what one local chase can raise: at 4, wins 93.6 / 76.5 / 57.6%, Hard captures 0.42; at 3, 94.2 / 77.8 / 58.9%, 0.44; at 2, 95.0 / 79.7 / 60.7%, 0.46 (Hard forked by Turn 4: 0.7 / 0.4 / 0.2%). Not adopted (V1): S6 chose the snowball, and the caps move every win rate.

**Furniture noise** (with B6; "always" = the party always goes for it, paired with the same raids played without it): as written (every Turn carried), Grand Year when tried 55.6%, a Win lost 16.6%, wins with always 88.6 / 63.0 / 45.7%; only on Turns it moves, 60.5% and 13.2% (too safe). Kept as written, with "even while set down" (V4). The simulator's together-play counted one noise per two-Turn move and none while waiting; it now counts every Turn (pairs and singles, the default, already did).

## Premade towns with B6 (2026-10-06, after PT6)

`node sim/premade-check.mjs 2000` with every rule through V11 (seed 1):

| Town | Win (target) | Forked (target) | Win, 3 · 4 · 5 | Forked, 3 · 4 · 5 | Captures | Goes for the furniture |
|---|---|---|---|---|---|---|
| Puddlecombe, Easy | 89.5% (87–93%) | 0.7% (0–2%) | 87.2 · 90.0 · 91.3 | 1.0 · 0.4 · 0.8 | 0.10 | 12.2% |
| Thistlewick, Standard | 73.9% (72–78%) | 7.0% (3–7%) | 71.3 · 75.1 · 75.3 | 7.3 · 7.5 · 6.2 | 0.21 | 51.8% |
| Gallowsmere, Hard | 57.6% (55–60%) | 9.3% (8–12%) | 54.0 · 59.8 · 59.1 | 11.6 · 9.0 · 7.2 | 0.38 | 0.1% |

Thistlewick's forked rate sits at the top of its target (was 6.5% before B6); on seeds 2 and 3 (3,000 raids per party size) it is 6.9% and 6.4%, with wins 74.8% and 75.2%. Left as printed; worth watching if a later change raises Standard forked rates.

## PT7's Hard Grand Years (2026-10-06)

PT7 got a Grand Year in both Hard raids (Gallowsmere by Turn 8, a rolled Hard town by Turn 7). Gallowsmere, 2,000 raids per party size: the default players (furniture only when safe) almost never try for the armour (0.1%): wins 57.6%, forked 9.3%. A party that always goes for it tries 81.7% of the time and gets a Grand Year 50.1% of the times it tries (target about half), with wins 54.0% and forked 14.9%. Two Grand Years in two raids are within those odds; no change (V13).

## Conformance audit (2026-10-06)

The simulator checked rule by rule against the rulebook and every decision through V16 (`docs/audits/SIM-AUDIT.md`, with the full conformance table). Every rule switch was already on the decided rule and every Gift and Perk is played with its book effect; 16 places where the engine or the report drifted were fixed, none of them changing a game number:
- **Group obstacles:** whoever hasn't got past stays behind (it used to be carried along by the others); a group check plans its rolls in turn, so two rollers no longer count on the same last charge (half the overdraws during the raid were that); its Costs are picked after the rolls (F23).
- **Abilities:** a switch never dodges a loud way (Chapter 5); a helper's switch helps anyone's roll at the same place (Chapter 3); the roller plans again after handing its loot over, so Out of Sight and Through the Wall work as written.
- **Captives:** a slip roll's Cost does nothing (no Storyteller Cost).
- **Time:** a lost Turn before a move is the move: the Entity follows a Turn behind; the way out is rolled once a Turn (new switch `exitTries`, a wording question for Richard).
- **Perks and the planner:** B5's Fetch no longer also waives picking up a dropped item (the pre-B2 Fetch); the players weigh the Weakness of a final-flight overdraw under "once" (flight overdraws 0.25 → 0.05 a raid).
- **The report:** Hard captures checked against 0.2–0.3 (it checked ≥ 0.2); the furniture targets checked with a party that always goes for it, as they were set; notes brought up to date. **Tests** now pin the roster, numbers, chase table and every rule switch's default to the book, so a change to `module/config.mjs` can't move the baseline unnoticed.

`node sim/run.mjs` (2,000 raids per label and party size, seed 1):

| | Win E / S / H | Forked E / S / H | Hard captures | Grand Year / a Win lost (always goes for it) | Overdraws a raid: raid · flight |
|---|---|---|---|---|---|
| Before (main `972be06`) | 92.2 / 74.2 / 56.1 | 0.8 / 5.0 / 9.1 | 0.35 | 55.2% / 17.0% | 0.14 · 0.25 |
| After | **92.3 / 74.9 / 57.0** | **0.7 / 5.2 / 9.0** | 0.34 | 54.8% / 17.4% | 0.06 · 0.05 |

Seeds 7 and 11 after: 92.2 / 75.6 / 56.1 and 92.0 / 75.4 / 56.0% won, 1.0 / 4.4 / 9.9 and 0.9 / 4.7 / 10.1% forked. The largest single step was planning after the hand-over (Hard +0.8 on two seeds); the rest moved wins by 0.3 points or less. Every win and forked target is still met.

`node sim/premade-check.mjs 2000`: Puddlecombe 89.6% won / 0.8% forked (was 89.5 / 0.7), Thistlewick 74.4 / 6.8 (was 73.9 / 7.0, a hair over the top of its forked target; now inside), Gallowsmere 58.0 / 9.4 (was 57.6 / 9.3).

Still missing a target: **Hard captures 0.34** (target 0.2–0.3; 0.35 before, hidden by the old check). **Option outliers:** Out of Sight is now +2.5 to +3.4 (seeds 1, 7, 11; it was +0.6, when the hand-over came after the plan), Dracula +2.1 to +3.1 as before; seed 1 also shows Jekyll & Hyde −3.4 and Rattle −3.2, but seeds 7 and 11 put them inside ±2.5 (run-to-run noise of about ±0.5–1). For Richard to decide; no game number was changed.

## After the audit: Out of Sight, and a party that stays together (2026-10-06)

### Out of Sight (the Invisible Man's default Perk)
Since the audit the Invisible Man hands his loot to a partner before a watched roll (free, U2) and so can't be caught; the Perk measures +2.5 to +3.4. Four candidate texts, as `outOfSightRule` (the default stays the book's), 2,000 raids per label and party size:

| Text | Out of Sight (seeds 1 · 7 · 11) | The Invisible Man | Win E / S / H (seed 1; 7; 11) | Forked Hard (1; 7; 11) |
|---|---|---|---|---|
| (a) as now: "only while you carry loot or furniture" | +2.5 · +3.4 · +3.0 | +1.5 · +1.6 · +2.0 | 92.3/74.9/57.0; 92.2/75.6/56.1; 92.0/75.4/56.0 | 9.0; 9.9; 10.1 |
| (b) "…, or someone at your place does" | **+0.2 · +0.7 · +0.3** | +0.7 · +0.6 · +1.0 | 92.2/74.4/56.4; 92.1/75.2/55.3; 91.9/75.0/55.1 | 9.1; 10.2; 10.4 |
| (c) "on Trouble at a watched obstacle you're caught only on a 1–3 on a d6" | +1.3 · +2.0 · +0.8 | +1.1 · +1.0 · +1.3 | 92.3/74.3/57.0; 92.1/75.4/55.7; 91.8/75.2/55.3 | 8.9; 10.1; 10.0 |
| (d) "…, or you were handed loot or handed it over this Turn" | +1.0 · +2.0 · +1.3 | +0.9 · +1.0 · +1.3 | 92.2/74.6/56.6; 92.1/75.4/55.7; 92.0/75.1/55.5 | 9.1; 10.1; 10.3 |
| (d), played by a party that keeps the loot out of his hands | +2.7 · +4.0 · +2.6 | +1.5 · +1.7 · +1.8 | 92.4/74.8/57.0; 92.2/75.8/56.3; 91.9/75.3/56.0 | 9.0; 10.0; 10.1 |

**Recommendation: (b).** It is the only text inside ±2.5 with room on every seed, it adds six words and nothing to roll or remember (you look at who's beside you), it keeps the Perk's joke (they can't see you, but they can see the candlestick your friend is carrying), and play can't get round it except by going alone, which costs the help of the others. (c) is inside too but closer to the line (+2.0 on seed 7) and adds a die roll on every Trouble; (d) needs a note of who handed what this Turn and is beaten by handing the loot over a Turn earlier, which the rules allow at any time (the last row). With (b) the Invisible Man's other Perks sit close together (Hidden Pockets −0.4 to +0.6, Light Step −0.8 to +0.2). Hard wins drop 0.6–0.9 points (55.1–56.4%, still inside 55–60%, at the edge on seed 11). Possible wording: "Out of Sight: Trouble gets you caught only while you, or anyone at your place, carry loot or furniture: they can't see you, but they can see a floating candlestick."

### A party that stays together
The report's `partyPolicy: "together"` lost about 40 points at Standard and Hard (seed 1, 2,000 raids per cell: 89.2 / 35.1 / 16.9% won against pairs' 92.3 / 74.9 / 57.0%). Most of that was the simulated players, not the rules:
- **Opening an approach shut the whole party out.** Only the opener gets through, so it then crossed the location's other obstacles alone, one a Turn, while three or four Entities stood idle (1.6 times a raid). Not opening where it would shut the others out (`openPolicy: "last"`): 52.9 / 33.8% at Standard / Hard.
- **Everyone rolled every group obstacle,** spending every action on it and risking a shared chase. Sending the best two (`groupPolicy: "best2"`) with the above: 57.8 / 37.3%.
- **Counting a Turn per obstacle** when the whole party can share them out (`planTime: "perTurn"`): with both above, 58.4 / 39.9%.
- Letting the others follow an opened obstacle their own way (`openedRule: "othersMayFollow"`, the book's literal reading) changes nothing for a party that waits for the opener (the simulated players' choice), and costs 1–2 points if they try where they can be seen, so the old shortcut stays the default.

These three are now the default for a party that stays together (`"auto"`; pairs and singles play exactly as before). What is left is the clock: a whole party pays a move for every location plus about 1.5 Turns of work there, so 12 Turns cover about four of five locations. Given 14 Turns, the same party wins 70.1 / 51.3% (Easy falls to 78%: with time to spare the players go for furniture and its noise takes them to the Limit).

| Seed 1 (seed 7), 2,000 raids per cell | Easy | Standard | Hard |
|---|---|---|---|
| Pairs (the default) | 92.3% (92.2) | 74.9% (75.6) | 57.0% (56.1) |
| Singles | 90.8% (91.8) | 75.1% (75.7) | 55.2% (55.3) |
| Together, as simulated before | 89.2% (90.0) | 35.1% (33.8) | 16.9% (18.1) |
| Together, played as a whole party (now) | 91.9% (92.6) | 58.4% (58.8) | 39.9% (40.0) |

**Judgement:** a real party that stays together and plays sensibly should expect about what the last row shows: Easy unaffected, Standard and Hard about 15–20 points below a party that splits (roughly 55–60% and 35–40%), and forked about the same. Real players will find a few more Turns than the simulated ones (better routes, skipping the hardest extra early), so perhaps 5 points more, not 15. **Recommendation:** the book should advise splitting up on Standard and Hard ("the night is short: a party that splits into twos covers the town in time; one that stays together rarely finishes the list"), since every target was tuned on a party that splits, and every agent playtest split up anyway.

### V17: Out of Sight with anyone carrying beside him (decided 2026-10-06)
`outOfSightRule` now defaults to "place" ("Trouble gets you caught only while you or anyone with you carries loot or furniture"). `node sim/run.mjs` (2,000 raids per label and party size, seed 1): wins **92.2 / 74.4 / 56.4%**, forked **0.7 / 5.3 / 9.1%** (every target met; were 92.3 / 74.9 / 57.0 and 0.7 / 5.2 / 9.0); Hard captures 0.35 (0.34; target 0.2–0.3, accepted in the design log); Grand Year when a party always goes for furniture 54.5%, a Win lost 17.4%. Out of Sight **+0.2** (was +2.5), the Invisible Man +0.7. Largest outliers on this seed: Jekyll & Hyde −3.3, Dracula +3.2, Rattle −3.2, Book-Learned −3.1, A Ghost +2.9, Mountain Stride +2.7, Tireless −2.6 (the same edge cases as before V17, within run-to-run noise of about ±0.5–1; Dracula is +2.1 to +3.2 on every seed). `node sim/premade-check.mjs 2000`: Puddlecombe 89.4% won / 0.8% forked, Thistlewick 74.2 / 6.9, Gallowsmere 57.1 / 9.6, all inside their targets.

## Dracula and Hard after the audits (2026-10-06, for B7)

Three seeds (1, 7, 11), the rules through V17: Dracula +2.9 (2.3 to 3.2), A Ghost +2.5 (2.2 to 2.9), everything else inside ±2.5 on average (Jekyll & Hyde −2.1, from −3.3 to −1.3). Hard wins 56.4 / 55.3 / 55.1%.

At 1,500 raids per cell (three seeds): Mesmerise only where someone's watching: Dracula +1.9 (1.7 to 2.1), largest average outlier −2.4; Hard wins 55.5 / 54.8 / 54.9%. Dracula's Charm d10 and Nimble d12: +2.5 (1.7 to 3.4), Hard 56.4 / 54.7 / 54.9%. Both: +1.4, Hard 55.1 / 54.4 / 54.3%.

Hard only, 2,000 raids, Mesmerise watched-only: as it stands 55.3 / 54.6 / 54.8% won (forked 9.2 / 10.2 / 10.5%, captures 0.35–0.38); Hard Limit 16: 57.2 / 57.4 / 57.2% (forked 8.9–9.6%, captures 0.37–0.39); **Hard lock-up 10: 57.0 / 56.7 / 56.6% (forked 9.4–10.7%, captures 0.35–0.38)**.

**Decided (B7, under Richard's advance approval):** `mesmeriseRule: "watched"` and the Hard lock-up 10.

## After B7: A Ghost and Thistlewick (2026-10-06, for V19–V20)

Full report with B7 (seed 1): wins 91.8 / 73.6 / 57.0%, forked 0.8 / 5.2 / 9.4%, Hard captures 0.35; largest outlier A Ghost +3.6. Three seeds, 2,000 raids: A Ghost +2.7 (1.9 to 3.6). **Spectral not while carrying** (`spectralRule: "noLoot"`): A Ghost +2.0 (1.3 to 2.6); the largest average outliers are now the Werewolf's two Gift versions, Keen Nose −2.6 and Through the Hedge +2.5 (inherent in a switch against an open approach, within noise); wins 91.6–91.8 / 73.0–74.2 / 56.2–56.3%.

Premade Thistlewick after B7, three seeds: won 73.1–74.0%, forked 7.2–7.6% (target 3–7%). Seed merchant's watchman 10 → 8: won 77.5–78.3%, forked 6.5–6.8% (wins over). **Hatter's nosy neighbour unwatched:** won 76.1–77.2%, forked 6.2–6.4%.

**Decided (V19–V20, under Richard's advance approval).**

## The rules as they stand (2026-10-06, after V20)

Full report (seed 1, 2,000 raids per cell): every win and forked target met (wins 91.7 / 73.0 / 56.2%, forked 0.8 / 5.4 / 9.5%); Hard captures 0.36 (accepted, V1/V14); the furniture gamble on target for a party that always goes for it (Grand Year 53.8% when tried, a Win lost 17.7%); the Mask on 26% of all rolls. Premade towns: Puddlecombe 88.8% won / 0.8% forked, Thistlewick 76.7 / 6.4%, Gallowsmere 57.7 / 9.9%, all on target.

**On option outliers:** a single seed's largest outlier moves from option to option (this run: the Creature's Book-Learned −3.3, which isn't among the sixteen largest three-seed averages). Averaged over seeds 1, 7 and 11, every Entity, Gift and Perk is inside ±2.5 except the Werewolf's two Gift versions at the line (Keen Nose −2.6, Through the Hedge +2.5), a spread inherent in a switch against an open approach. Further single-seed chasing would be tuning to noise; real tables decide from here.


## V21: dropping your own loot, played to dodge Out of Sight (2026-10-07)

V21 (after PT8) lets you drop your own loot any time; picking it up costs your next action. The obvious use is the Invisible Man setting his loot down before a watched roll, so Trouble can't get him caught (V17 counts only loot carried by him or anyone in the same place). Player policy `lootDrop: "outOfSight"`: he does that whenever it helps (no furniture in hand, nobody else there carrying) and picks the loot up after the roll, losing his next action. Three seeds (1, 7, 11), 2,000 raids per label and party size, against the default players (`never`): about 1,600 set-downs; wins **91.7 / 73.8 / 56.5%** (were 91.7 / 73.7 / 56.3), forked **0.9 / 5.1 / 9.9%** (0.9 / 5.1 / 10.1); Out of Sight **+1.4** (was +0.7), the Invisible Man **+1.5** (+1.2). The lost action is a real price: even played this way every option stays well inside ±2.5, so V21 needs no limit. The default players don't use the trick, so the report's numbers are unchanged.
