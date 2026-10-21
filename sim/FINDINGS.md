# Simulation findings

The latest full numbers are in `sim/REPORT.md` (the decided rules with the approved starting numbers, through the outside review's package and F12's Limits of 2026-10-20; 3,000 raids per label and party size of 3, 4 and 5 Entities, plus presets and sweeps):

```
node sim/run.mjs --runs 3000 --sweep-runs 500
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

## V23–V25 after PT9 (2026-10-07)

`slipWatched` now defaults to true (V23: the lock-up is always watched, for slipping free too, so Dracula may Mesmerise his way out; only Mesmerise reads it). Three seeds (1, 7, 11), 2,000 raids per label and party size: Dracula **+1.7 → +1.8**, wins 91.7 / 73.7 / 56.3% → 91.7 / 73.8 / 56.3%, forked unchanged (0.9 / 5.1 / 10.1%). V24 (nothing is dropped in a local chase) and V25 (picking items up is an action) are what the simulator already played: captures take everything, and a pick-up costs the next action. Full report regenerated (seed 1): wins **91.7 / 73.1 / 56.3%**, forked **0.8 / 5.4 / 9.4%**, Hard captures 0.36; every win and forked target met. The seed-1 outlier line still names Book-Learned (−3.3), within the three-seed averages (inside ±2.5 but for Keen Nose −2.6 and Through the Hedge +2.5, as before).

## PT10: setting loot or a piece down before a roll (2026-10-07, for V26–V27)

Two player policies, three seeds (1, 7, 11), 2,000 raids per label and party size.

**Anyone sets loot down before a watched roll** (`lootDrop: "guard"`: everyone carrying loot except Hidden Pockets, before every watched roll with 3+ Turns left, then picks it up for an action; loot a captive set down is picked up by someone still free, at the place if anyone is there, else anywhere: an upper bound). Wins **91.4 / 74.0 / 57.0%** (default players 91.7 / 73.8 / 56.3), forked **0.9 / 4.7 / 9.5%** (0.9 / 5.1 / 10.1), Grand Year 33.8 / 6.3 / 2.9% (33.9 / 6.9 / 3.1: the actions cost time). About 780 set-downs per 1,000 raids; loot saved from a capture about 29 times per 1,000. Every target still met: V21 needs no limit beyond V24.

**A carrier sets its piece down before a roll** (`pieceSetDown`, with a party that always goes for the piece so carriers roll at all): carriers roll at an obstacle other than the way out in about 114 raids per 1,000 (6 with the default players, who take the piece last). Never / free / for an action: wins 87.9 / 60.2 / 45.6%, 87.9 / 60.4 / 45.7%, 87.9 / 60.2 / 45.4%; Grand Year 62.0 / 32.9 / 21.4%, 61.9 / 33.1 / 21.5%, 61.9 / 32.9 / 21.3%. Balance doesn't choose; V26 makes taking it back up an action so the carrier rules mean what they say, as with loot (V25).

## A full table, and Thistlewick's mirror (2026-10-07, for V29–V30)

`node sim/full-table.mjs 6000` (sim/FULL-TABLE.md): five Entities on the three printed towns and on rolled towns, with four styles of play. Five-player nights end early (half are over by Turn 7 on Easy, 8 on Standard, 9 on Hard), every win and forked rate stays on target, and charges often go unspent (half spent on Easy, about 70% on Standard, 80% on Hard). The four played games (sim/playtests/FT1–FT4) agree: raids of 35–70 minutes of play.

**Thistlewick's furniture was nearly free.** With the gilt mirror at the hatter (one obstacle, then the dog, 8 → 10 when taken), a party that always goes for it got a Grand Year 70% of the times it tried and lost the Win 9% of the time (targets about 50% and 20%); default players brought it home in 45% of raids, 61% with five. Variants (3,000 raids per party size, seed 1; Grand Year when tried / Win lost / won / forked / a party that stays together won): as printed 70 / 9 / 76.6 / 6.5 / 87.4; dog 10: 43 / 6 / 77.7 / 4.6 / 87.2 (safer, not riskier); mirror at the china shop or the baker: 45 / 36 / 80.9 / 3.2 (sensible players never try); at the ironmonger: 65 / 16 / 79.2 / 4.7; at the ironmonger with a Difficulty 10 dog: 44 / 13 / 79.4 / 4.1 (wins over the band); the ironmonger plus a watched shopkeeper at the hatter: 57 / 17 / 73.9 / 5.9 / 81.5 (the best fit, but one more table row ran Chapter 9 a page over); **the ironmonger plus the hatter's nosy neighbour watched: 60 / 16 / 75.2 / 5.9 / 84.2** (V29). Three seeds of `premade-check`: won 75.2 / 75.6 / 75.9%, forked 5.9 / 5.2 / 5.8%. With five players the default Grand Year falls from 61% to 26%.

**Tested for the full table and not taken** (2,000 raids per label and size, seed 1): a local chase starting at Lead 2 (escape 4): wins up to 93.6 / 77.6 / 62.1% (Hard over its band); starting at 2 and escaping at 5: wins 91.0 / 73.1 / 56.2% and forked 0.9 / 6.1 / 11.1%, all on target, but captures 0.04 / 0.07 / 0.16 a raid (were 0.09 / 0.18 / 0.36): the ready fallback if real tables find the one-roll capture unfair. One more list item for five players: five-player wins 92.2 → 87.8% (Easy), 73.6 → 64.8% (Standard), 60.3 → 47.3% (Hard): too harsh.

## The outside review's package (2026-10-20, for D1–D7, R1, R4 and D4)

Richard's calls after the outside review of v0.1 (DESIGN 2026-10-19), with his three calls of 2026-10-20 added, are now the simulator's rules: **D1** one chase, one rise (`chaseRule: "oneRise"`); **D2** a runner may give up at the start of any round (`giveUp`, a player policy); **D3** an overdraw adds +2 on top (`overdrawStack: "stack"`); **D6b** any ability as a raise in the final flight (`flightRaise: "any"`); **D7b** everyone held means Forked (`allHeld: "forked"`); **R1** a roll's result before its Suspicion (`limitOrder: "result"`); **R4** one way-out try a Turn (`exitTries: "one"`, unchanged); **D4** Spectral as the book has it, on the arrival Turn and never picking the way in (`spectralWhen: "arrive"`). The switch back is `BEFORE_REVIEW` with `OLD_LIMITS` in `sim/params.mjs` (package V0 in `node sim/run.mjs`); it reproduces the previous report exactly (91.7 / 73.1 / 56.3% won, 0.8 / 5.4 / 9.4% forked at seed 1, 2,000 raids). Turns stay 12; the 10-Turn night (D5b) is package T10. **Decided the same day (Richard delegated the calls): F12's Limits 9 / 10 / 13 are adopted with the package, 12 Turns stay, and the Lead-2 fallback isn't taken;** the final check on the new defaults closes this section. The tables below were measured before that, on the Limits the package was tested with (11 / 11 / 15), which `review-check.mjs` still uses as its base.

```
node sim/review-check.mjs 3000      # every table below (seed 1, 3,000 raids per label and party size, about 15 minutes)
```

V0 = the rules before the review; P12 = the package, 12 Turns; P10 = the package with 10 Turns on Easy and Standard (Hard keeps 12, so its P10 numbers are P12's). Every configuration plays the same parties, towns and dice streams. Close calls were rerun at 6,000 raids and on seeds 7 and 11.

**In short**
- **The package makes every label easier and less deadly, and nearly all of it is D1.** A local chase now adds 1.4–1.5 Suspicion instead of 3.0–3.2 (the review's own simulator said about 4), so the Limit comes in 10 / 14 / 18% of raids instead of 16 / 26 / 36% (Easy / Standard / Hard). Runners escape more often (solo: 59 / 49 / 41% against 43 / 33 / 31%), but a chase now always ends in an escape or a capture rather than in the hunt, so captures go up (Hard 0.36 → 0.50 a raid). On three seeds the package wins 94.3–94.9 / 77.8–79.1 / 61.0–61.6% and is forked 0.6–0.7 / 2.7–3.1 / 7.2–8.0%.
- **Targets missed with 12 Turns, and by how much:** Easy win 1.3–1.9 points over 93%; Standard inside on seed 1 (77.8%, forked 3.1%) but past both edges on seeds 7 and 11 (79.1% and 79.0%, 1.1 and 1.0 over 78%; forked 2.7% and 2.8%, 0.3 and 0.2 under 3%); Hard win 1.0–1.6 over 60% and forked 0.8 and 0.3 under 8% on two seeds (8.0% on the third); Hard captures 0.50–0.52 (0.2 over the 0.3 top, 0.16 over the 0.34 Richard accepted). Ready-made towns: Puddlecombe 1.2 over, Thistlewick 4.0 over, Gallowsmere 4.5 over and forked 1.0 under. Hallowby holds (92.6%, forked 1.0%). Everything else the simulator checks holds (furniture gamble, Trouble, Criticals, spending, Mask), and the Entities stay at the edge where they were (A Ghost +1.4 to +2.6 over three seeds, +1.4 to +2.7 before).
- **The smallest fix: lower the Limits to match the smaller chase rise, Easy 11 → 9, Standard 11 → 10, Hard 15 → 13** (F12 below; adopted 2026-10-20). Every rolled-town win and forked target holds on all three seeds, Hard at its floor (55.3–56.3%; 54.7% at 3,000 raids on seed 1, 55.3% at 6,000), and Puddlecombe, Gallowsmere and Hallowby come back on target; Thistlewick stays 1.5 over (a town change, Richard's call). One step less isn't enough on Easy (Limit 10: 93.7%); Hard Limit 14 is the smallest step for rolled Hard towns (58.2–58.8%, forked 8.4–8.5%) but leaves Gallowsmere 1.4–1.8 over. Lowering the Limit barely moves Hard captures (0.46–0.50 for Hard Limits 12–15); only the local chase's Lead-2 fallback (D6: start at 2, escape at 5) does: 0.34 with it (F12+L2), at the price of Easy at its top edge again (92.7–93.3%) and A Ghost at +2.3 to +3.0.
- **10 Turns: the targets don't hold**, so by Richard's condition the night stays 12 Turns. Easy is 1.8 over, Standard forked 1.6 under, Thistlewick 5.4 over and forked 1.1 under, Hallowby 0.7 over and Puddlecombe 0.3 over. It also cuts Grand Years sharply (rolled Easy towns 35% → 12%, Standard 7% → 1%) and widens the party-size gap on Standard (three Entities 67.6%, five 81.1%; with 12 Turns 73.9% and 80.3%). Making it fit needs three numbers (Easy Limit 8, Standard final mob 12, Hard Limit 13: F10) and still leaves Thistlewick 4.9 over.
- **R1 and D4 on their own change nothing measurable** (every win and forked rate within 0.1 point, either added to V0 or taken out of P12). R1 decides 3 / 7 / 12 raids per 1,000 (nearly all loot in hand as the Limit comes; a rescue about 1 in 1,000; the way out almost never, because the simulated parties don't roll the way out when its Suspicion could bring the Limit). D4's pass with no action comes in 88–107 raids per 1,000, with the loot in hand on the arrival Turn in 29–45; A Ghost is +2.6 with it and +2.7 without.
- **D2 fires 0.02 / 0.08 / 0.12 times a raid** (8 / 15 / 14% of local chases), nearly always solo. It trades a capture for not bringing the hunt: against D1 alone, the Limit is hit in 10 / 14 / 17% of raids instead of 11 / 17 / 23%, forked falls 0.1 / 0.8 / 0.6 points, wins rise 0.2 / 0.1 / 0.5, and Hard captures rise 0.44 → 0.47. The review's simple rule fires as often and plays the same (within 0.1 point).
- **D3: overdraws per raid fall from 0.09 / 0.19 / 0.43 to 0.02 / 0.07 / 0.19**, nearly all of it in local chases (0.06 / 0.10 / 0.23 → 0.01 / 0.01 / 0.06). D3 is what does it, and D1 needs it: D1 without D3 doubles them (0.19 / 0.42 / 0.90), because with one rise per chase an overdraw folded into "the biggest trigger" costs nothing once the Monster has shown. D3 is worth −0.5 / −0.9 / −1.9 win points inside the package.
- **D6b: about a quarter more charges spent per final flight** (V0 3.3 / 2.8 / 2.5, with D6b 4.3 / 3.5 / 3.1), but forked per flight doesn't move (Hard 22.7% → 23.1%): roughly one more charge over the 10–25 rolls of a flight.
- **D7b: everyone held ends 0.1% of three-Entity Easy and Hard raids** and nothing measurable elsewhere.

**How the simulator reads the package** (where the decisions leave a choice):
- D1: the mob is fixed when the chase starts (Fear the Curse still makes a lone runner's mob 1 easier). The rise is the biggest trigger among the chase's rolls (Trouble +1, the Monster showing +2, +1 with Rattle, nothing when an ability hid the Monster), plus +2 for each overdraw. The players weigh a chase roll by what it adds to the chase's biggest trigger so far, so once the Monster has shown, the rest of the chase lets it out freely (real players will find that too).
- D2 (policy `giveUp: "odds"`): at the start of a round, before the ground is rolled, with the Lead at 1, a runner gives up when stopping keeps Suspicion under the Limit and carrying on is more likely to end with the chase's rise at the Limit than with a clean escape (both worked out exactly from the plans the runner would make on each row of the chase table; no dice used). In a shared chase the weakest runner gives up first and the rest look again. Nobody gives up who would leave every Entity held (that would fork the year, D7b), and a Ghost with Already Dead never does (cornered costs her a Turn). `"simple"` is the review's candidate (escape under 1 in 2 and a Monster showing would reach the Limit).
- D3: +2 for each overdraw, two on one roll +4; in a group check the group's one rise is its biggest trigger plus every overdraw; slipping free too. The final flight's overdraw is unchanged.
- D6b: an ability spent as a roll's switch isn't also its raise; a Draught spent as a raise isn't free with Practised Hand (that's for changing back).
- D7b is checked at every capture (a Ghost cornered with Already Dead isn't held).
- R1 at the way out and a rescue as decided; the same order also puts a location's loot in hand when its last obstacle is beaten on the roll that brings the Limit (2–11 raids per 1,000). That follows from "the result first" but wasn't named in the call: one for Richard to confirm.
- D4: the Ghost passes a group obstacle the moment she reaches it, the arrival Turn included; at a first obstacle whose way in isn't picked yet she passes its group version without picking, and the others there pick their way in when they first roll; with the last obstacle passed, the loot is in her hand at once.

### Against the targets

| Measure | Target | V0 | P12 | P10 |
|---|---|---|---|---|
| Win, easy | 87%–93% | 91.6% | 94.3% ✗ | 94.8% ✗ |
| Win, standard | 72%–78% | 73.2% | 77.8% | 75.2% |
| Win, hard | 55%–60% | 56.5% | 61.0% ✗ | 61.0% ✗ |
| Forked, easy | 0%–2% | 0.9% | 0.6% | 0.1% |
| Forked, standard | 3%–7% | 5.5% | 3.1% | 1.4% ✗ |
| Forked, hard | 8%–12% | 9.3% | 7.2% ✗ | 7.2% ✗ |
| Captures per Hard raid | 0.2–0.3 (accepted ~0.34) | 0.36 ✗ | 0.50 ✗ | 0.50 ✗ |
| Grand Year when a party always goes for furniture | ~50% | 53.9% | 53.6% | 52.2% |
| Going for furniture costs the Win (always) | ~20% | 17.8% | 17.9% | 17.1% |
| Trouble, share of rolls | 10–22% | 18.5% | 17.4% | 16.8% |
| Criticals, share of rolls | 3–7% | 5.3% | 5.4% | 5.5% |
| Entities spending ≥ half their charges | ≥ 50% | 73.6% | 73.8% | 71.3% |
| Mask, share of rolls where you choose | ≥ 25% (and Monster ≥ 25%) | 34.2% | 33.2% | 32.0% |
| Entities, spread (lowest to highest) | within ±2.5 pts | -2.0 to +2.7 ✗ | -1.7 to +2.6 ✗ | -1.7 to +2.3 |
| Largest option outlier (any Entity, Gift, Perk or Duty) | within ±2.5 pts | Frankenstein’s Creature:Book-Learned -3.8 ✗ | Frankenstein’s Creature:Book-Learned -3.6 ✗ | Frankenstein’s Creature:Book-Learned -3.4 ✗ |

### By label and party size (per raid)

| Label | Entities | Rules | Win (incl. Grand) | Grand Year | Forked | of which everyone held (D7b) | Limit hit | Dawn flight | Captures | Rescues | Left behind | Turn the party leaves (mean) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | V0 | 91.2% | 25.4% | 1.4% | 0.0% | 15.8% | 0.0% | 0.08 | 0.01 | 0.04 | 8.6 |
| easy | 3 | P12 | 93.4% | 27.0% | 1.0% | 0.1% | 9.9% | 0.0% | 0.11 | 0.01 | 0.05 | 8.7 |
| easy | 3 | P10 | 94.2% | 5.4% | 0.2% | 0.1% | 2.1% | 0.0% | 0.08 | 0.01 | 0.04 | 8.0 |
| easy | 4 | V0 | 91.3% | 35.9% | 0.9% | 0.0% | 17.0% | 0.0% | 0.10 | 0.02 | 0.05 | 8.4 |
| easy | 4 | P12 | 94.4% | 37.7% | 0.5% | 0.0% | 11.4% | 0.0% | 0.12 | 0.03 | 0.05 | 8.4 |
| easy | 4 | P10 | 95.0% | 10.0% | 0.1% | 0.0% | 2.7% | 0.0% | 0.09 | 0.01 | 0.04 | 7.8 |
| easy | 5 | V0 | 92.3% | 39.0% | 0.3% | 0.0% | 15.0% | 0.0% | 0.09 | 0.03 | 0.04 | 7.4 |
| easy | 5 | P12 | 95.0% | 41.1% | 0.4% | 0.0% | 9.9% | 0.0% | 0.11 | 0.05 | 0.04 | 7.4 |
| easy | 5 | P10 | 95.3% | 20.5% | 0.1% | 0.0% | 4.8% | 0.0% | 0.10 | 0.04 | 0.04 | 7.2 |
| standard | 3 | V0 | 70.6% | 2.3% | 6.7% | 0.0% | 24.6% | 0.0% | 0.19 | 0.01 | 0.12 | 9.9 |
| standard | 3 | P12 | 73.9% | 2.3% | 3.7% | 0.0% | 12.6% | 0.3% | 0.26 | 0.02 | 0.15 | 10.0 |
| standard | 3 | P10 | 67.6% | 0.0% | 1.4% | 0.0% | 5.3% | 0.7% | 0.17 | 0.01 | 0.10 | 8.6 |
| standard | 4 | V0 | 75.2% | 4.9% | 5.2% | 0.0% | 25.8% | 0.0% | 0.18 | 0.03 | 0.11 | 9.7 |
| standard | 4 | P12 | 79.3% | 5.0% | 3.1% | 0.0% | 14.1% | 0.2% | 0.26 | 0.03 | 0.13 | 9.8 |
| standard | 4 | P10 | 77.1% | 0.0% | 1.2% | 0.0% | 5.6% | 0.4% | 0.18 | 0.01 | 0.09 | 8.4 |
| standard | 5 | V0 | 73.9% | 12.3% | 4.5% | 0.0% | 28.1% | 0.0% | 0.18 | 0.04 | 0.11 | 8.4 |
| standard | 5 | P12 | 80.3% | 13.3% | 2.6% | 0.0% | 15.9% | 0.0% | 0.26 | 0.07 | 0.12 | 8.5 |
| standard | 5 | P10 | 81.1% | 3.2% | 1.7% | 0.0% | 9.7% | 0.2% | 0.23 | 0.04 | 0.12 | 8.0 |
| hard | 3 | V0 | 51.6% | 0.8% | 11.0% | 0.0% | 32.7% | 7.5% | 0.36 | 0.03 | 0.18 | 10.2 |
| hard | 3 | P12 | 55.6% | 1.0% | 8.2% | 0.1% | 13.9% | 14.5% | 0.48 | 0.04 | 0.21 | 10.2 |
| hard | 4 | V0 | 57.1% | 2.3% | 9.5% | 0.0% | 35.9% | 5.3% | 0.36 | 0.05 | 0.17 | 9.9 |
| hard | 4 | P12 | 61.6% | 2.4% | 8.0% | 0.0% | 18.1% | 10.8% | 0.52 | 0.07 | 0.22 | 10.0 |
| hard | 5 | V0 | 60.7% | 6.4% | 7.4% | 0.0% | 38.7% | 2.3% | 0.36 | 0.07 | 0.19 | 8.9 |
| hard | 5 | P12 | 66.0% | 7.1% | 5.4% | 0.0% | 21.9% | 5.0% | 0.51 | 0.13 | 0.21 | 9.1 |

Rescues count each captive freed by a rescue. "Turn the party leaves" averages the raids that ended by the way out.

### Local chases

| Label | Rules | Chases per raid | Suspicion added per chase | solo | shared | Solo: escaped | Solo: captured | Shared: escaped | Shared: someone captured | Chase's rise brought the hunt (D1) | Give-ups per raid, solo | in shared chases |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | V0 | 0.26 | 3.08 | 3.08 | 3.27 | 42.7% | 33.6% | 50.0% | 34.6% | 0.0% | 0.000 | 0.000 |
| easy | P12 | 0.28 | 1.51 | 1.51 | 1.68 | 58.6% | 39.3% | 67.7% | 32.3% | 0.9% | 0.022 | 0.001 |
| easy | P10 | 0.24 | 1.55 | 1.55 | 1.79 | 61.4% | 36.6% | 68.4% | 31.6% | 0.6% | 0.016 | 0.000 |
| standard | V0 | 0.47 | 2.98 | 2.97 | 3.43 | 33.4% | 38.2% | 22.4% | 42.9% | 0.0% | 0.000 | 0.000 |
| standard | P12 | 0.53 | 1.42 | 1.42 | 1.63 | 49.4% | 48.0% | 50.0% | 50.0% | 1.9% | 0.078 | 0.003 |
| standard | P10 | 0.45 | 1.49 | 1.49 | 1.70 | 54.0% | 43.4% | 57.5% | 42.5% | 1.5% | 0.045 | 0.002 |
| hard | V0 | 0.79 | 3.19 | 3.19 | 3.71 | 30.9% | 45.1% | 31.0% | 37.9% | 0.0% | 0.000 | 0.000 |
| hard | P12 | 0.89 | 1.50 | 1.50 | 1.63 | 41.0% | 55.6% | 46.2% | 53.8% | 1.5% | 0.120 | 0.004 |

A chase that neither escaped nor ended in a capture was ended by the Limit mid-chase (before D1) or cornered a Ghost with Already Dead. Suspicion added is what the chase itself added, the Trouble that started it not included.

### Final flights, overdraws and charges

| Label | Rules | Final flights per raid | Forked per flight | Rounds per flight (mean) | Charges spent per flight | Overdraws per flight | Overdraws per raid | at obstacles · in local chases · slipping free · in the flight |
|---|---|---|---|---|---|---|---|---|
| easy | V0 | 15.9% | 5.4% | 2.8 | 3.29 | 0.00 | 0.086 | 0.022 · 0.063 · 0.000 · 0.001 |
| easy | P12 | 10.4% | 5.8% | 2.8 | 3.95 | 0.01 | 0.019 | 0.009 · 0.010 · 0.000 · 0.001 |
| easy | P10 | 3.2% | 3.4% | 2.8 | 4.16 | 0.01 | 0.017 | 0.008 · 0.009 · 0.000 · 0.000 |
| standard | V0 | 26.2% | 21.0% | 3.5 | 2.77 | 0.21 | 0.192 | 0.043 · 0.095 · 0.000 · 0.054 |
| standard | P12 | 14.4% | 21.7% | 3.5 | 2.67 | 0.25 | 0.070 | 0.019 · 0.014 · 0.000 · 0.037 |
| standard | P10 | 7.3% | 19.6% | 3.4 | 2.91 | 0.25 | 0.043 | 0.013 · 0.012 · 0.000 · 0.018 |
| hard | V0 | 40.8% | 22.7% | 4.9 | 2.54 | 0.25 | 0.432 | 0.098 · 0.232 · 0.000 · 0.102 |
| hard | P12 | 28.1% | 25.5% | 5.1 | 1.97 | 0.30 | 0.194 | 0.048 · 0.060 · 0.000 · 0.086 |

### Each piece on its own (added to V0) and taken out of P12

|  | Rules | Win E | Win S | Win H | Forked E | Forked S | Forked H | Hard captures | Limit hit E · S · H | Give-ups per raid |
|---|---|---|---|---|---|---|---|---|---|---|
| V0 | The rules before the review | 91.6% | 73.2% | 56.5% | 0.9% | 5.5% | 9.3% | 0.36 | 16% · 26% · 36% | 0.000 |
| V0+R1 | Before, plus R1 (result first) | 91.7% | 73.3% | 56.6% | 0.9% | 5.5% | 9.3% | 0.36 | 16% · 26% · 36% | 0.000 |
| V0+D4 | Before, plus D4 (Spectral on arrival) | 91.5% | 73.1% | 56.4% | 0.9% | 5.5% | 9.3% | 0.36 | 16% · 26% · 36% | 0.000 |
| V0+D1 | Before, plus D1 (one chase, one rise), nobody gives up | 94.6% | 78.5% | 62.4% | 0.7% | 3.9% | 7.4% | 0.44 | 11% · 17% · 23% | 0.000 |
| V0+D3 | Before, plus D3 (overdraw on top) | 91.4% | 72.8% | 55.7% | 0.9% | 5.6% | 9.4% | 0.37 | 16% · 26% · 36% | 0.000 |
| V0+D1D2 | Before, plus D1 and D2 (giving up) | 94.8% | 78.6% | 62.9% | 0.6% | 3.1% | 6.8% | 0.47 | 10% · 14% · 17% | 0.073 |
| V0+D6b | Before, plus D6b (any ability as a raise in the flight) | 91.6% | 73.2% | 56.4% | 0.9% | 5.4% | 9.4% | 0.36 | 16% · 26% · 36% | 0.000 |
| V0+D7b | Before, plus D7b (everyone held is Forked) | 91.6% | 73.2% | 56.5% | 0.9% | 5.5% | 9.3% | 0.36 | 16% · 26% · 36% | 0.000 |
| P12 | The package, 12 Turns | 94.3% | 77.8% | 61.0% | 0.6% | 3.1% | 7.2% | 0.50 | 10% · 14% · 18% | 0.076 |
| P12-R1 | The package without R1 | 94.2% | 77.7% | 60.9% | 0.6% | 3.1% | 7.2% | 0.50 | 10% · 14% · 18% | 0.076 |
| P12-D4 | The package without D4 | 94.3% | 77.9% | 61.1% | 0.6% | 3.1% | 7.2% | 0.50 | 10% · 14% · 18% | 0.075 |
| P12-D1 | The package without D1 (and so without D2) | 91.3% | 72.7% | 55.7% | 0.9% | 5.4% | 9.7% | 0.38 | 16% · 27% · 36% | 0.000 |
| P12-D2 | The package, nobody gives up | 94.1% | 77.6% | 60.5% | 0.7% | 3.8% | 7.9% | 0.48 | 11% · 17% · 24% | 0.000 |
| P12-D3 | The package without D3 | 94.8% | 78.7% | 62.9% | 0.6% | 3.0% | 6.7% | 0.47 | 10% · 14% · 17% | 0.073 |
| P12-D2s | The package, giving up by the review's simple rule | 94.3% | 77.8% | 61.1% | 0.6% | 3.1% | 7.1% | 0.50 | 10% · 14% · 18% | 0.078 |
| P12-D6b | The package without D6b | 94.2% | 77.8% | 61.0% | 0.6% | 3.2% | 7.2% | 0.50 | 10% · 14% · 18% | 0.076 |
| P12-D7b | The package without D7b | 94.3% | 77.8% | 61.0% | 0.6% | 3.1% | 7.2% | 0.50 | 10% · 14% · 18% | 0.076 |

### Number fixes for the misses (proposals, not adopted)

|  | Rules | Easy win / forked | Standard | Hard | Hard captures | Hard win, 3 · 4 · 5 | Puddlecombe | Thistlewick | Gallowsmere | Hallowby |
|---|---|---|---|---|---|---|---|---|---|---|
| P12 | The package, 12 Turns | 94.3% / 0.6% ✗ | 77.8% / 3.1% | 61.0% / 7.2% ✗ | 0.50 | 56% · 62% · 66% | 94.2% / 0.3% ✗ | 82.0% / 3.9% ✗ | 64.5% / 7.0% ✗ | 92.6% / 1.0% |
| P10 | The package, 10 Turns on Easy and Standard | 94.8% / 0.1% ✗ | 75.2% / 1.4% ✗ | 61.0% / 7.2% ✗ | 0.50 | 56% · 62% · 66% | 93.3% / 0.2% ✗ | 83.4% / 1.9% ✗ | 64.5% / 7.0% ✗ | 93.7% / 0.4% ✗ |
| F10 | P10 with Easy Limit 8, Standard final mob 12, Hard Limit 13 | 90.9% / 0.3% | 74.9% / 3.6% | 54.7% / 9.6% ✗ | 0.48 | 50% · 54% · 60% | 87.6% / 0.4% | 82.9% / 4.0% ✗ | 58.4% / 9.8% | 90.7% / 1.0% |
| F12+L2 | F12, and local chases start at Lead 2 and escape at 5 (the D6 fallback) | 92.7% / 1.0% | 76.4% / 4.4% | 56.0% / 9.9% | 0.34 | 51% · 56% · 61% | 92.2% / 0.6% | 80.7% / 5.1% ✗ | 59.6% / 10.0% | 92.8% / 1.6% |
| F12 | P12 with Limits 9 / 10 / 13 (Easy / Standard / Hard) | 92.1% / 1.0% | 75.2% / 3.7% | 54.7% / 9.6% ✗ | 0.48 | 50% · 54% · 60% | 91.1% / 0.5% | 79.5% / 4.6% ✗ | 58.4% / 9.8% | 90.9% / 1.5% |

F12+L2: Grand Year when a party always goes for furniture 48.9%, a Win lost 19.9%; Trouble 19.9%; Criticals 5.1%; half their charges spent 77.5%; the Mask on 34.8% of the rolls where there's a choice; Entities -2.2 to +3.0; give-ups 0.000 / 0.000 / 0.000 per raid; captures 0.05 / 0.15 / 0.34; left behind 0.04 / 0.11 / 0.22.

F12: Grand Year when a party always goes for furniture 48.0%, a Win lost 19.6%; Trouble 18.1%; Criticals 5.3%; half their charges spent 77.0%; the Mask on 37.2% of the rolls where there's a choice; Entities -2.4 to +2.8; give-ups 0.035 / 0.087 / 0.151 per raid; captures 0.10 / 0.23 / 0.48; left behind 0.05 / 0.13 / 0.23.

### R1 and D4 in detail (per 1,000 raids)

|  | R1 Easy: out · rescued · loot | R1 Standard | R1 Hard | D4 Easy: passes with no action · loot at once | D4 Standard | D4 Hard | A Ghost (win pts) | Spectral against her other Perks (pts) |
|---|---|---|---|---|---|---|---|---|
| V0 | 0.0 · 0.0 · 0.0 | 0.0 · 0.0 · 0.0 | 0.0 · 0.0 · 0.0 | 0 · 0 | 0 · 0 | 0 · 0 | 2.7 | -0.9 |
| V0+R1 | 0.0 · 0.3 · 2.2 | 0.0 · 0.0 · 3.8 | 0.0 · 0.3 · 8.4 | 0 · 0 | 0 · 0 | 0 · 0 | 2.7 | -0.9 |
| V0+D4 | 0.0 · 0.0 · 0.0 | 0.0 · 0.0 · 0.0 | 0.0 · 0.0 · 0.0 | 88 · 45 | 97 · 33 | 105 · 27 | 2.5 | -1.4 |
| P12 | 0.1 · 0.4 · 2.7 | 0.0 · 0.7 · 6.4 | 0.0 · 1.0 · 11.0 | 88 · 45 | 98 · 34 | 107 · 29 | 2.6 | -1.5 |
| P12-R1 | 0.0 · 0.0 · 0.0 | 0.0 · 0.0 · 0.0 | 0.0 · 0.0 · 0.0 | 88 · 45 | 98 · 34 | 107 · 29 | 2.6 | -1.5 |
| P12-D4 | 0.0 · 0.6 · 2.8 | 0.0 · 0.7 · 6.2 | 0.0 · 1.1 · 10.6 | 0 · 0 | 0 · 0 | 0 · 0 | 2.7 | -1.2 |

### Entity spread under the package (win points, parties with vs without, same label and size)

| Entity | V0 | P12 | P10 |
|---|---|---|---|
| Jekyll & Hyde | -2.0 | -1.7 | -1.7 |
| The Werewolf | +0.2 | +0.7 | +1.0 |
| A Ghost | +2.7 | +2.6 | +2.1 |
| The Mummy | -1.0 | -1.2 | -1.0 |
| The Invisible Man | +1.0 | +0.4 | +0.6 |
| Dracula | +1.7 | +2.3 | +2.3 |
| Frankenstein’s Creature | -1.0 | -1.4 | -1.5 |
| A Witch | -1.7 | -1.6 | -1.7 |

Gifts, Perks and Duties under P12, lowest to highest: gift Frankenstein’s Creature:Book-Learned -3.6, gift The Werewolf:Keen Nose -2.6, gift The Invisible Man:Work It Out -2.4, perk A Witch:wiseWoman -2.2 … gift The Mummy:Royal Bearing +2.0, perk A Ghost:alreadyDead +2.0, gift Frankenstein’s Creature:Mountain Stride +2.3, gift The Werewolf:Through the Hedge +2.7.

### The ready-made towns and the one-shot's Hallowby

| Town | Rules | Win | Forked | Win with 3 · 4 · 5 | Grand Year | Captures | Left behind | Limit hit | Dawn flight | Chases per raid | Turn the party leaves |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Puddlecombe (easy) | V0 | 88.7% | 0.9% | 86% · 88% · 92% | 13.3% | 0.11 | 0.05 | 13.9% | 0.0% | 0.34 | 7.4 |
| Puddlecombe (easy) | P12 | 94.2% ✗ | 0.3% | 91% · 94% · 97% | 14.0% | 0.13 | 0.04 | 5.7% | 0.0% | 0.37 | 7.5 |
| Puddlecombe (easy) | P10 | 93.3% ✗ | 0.2% | 90% · 94% · 97% | 0.1% | 0.13 | 0.05 | 2.4% | 0.0% | 0.37 | 7.3 |
| Thistlewick (standard) | V0 | 75.2% | 5.9% | 71% · 78% · 77% | 18.1% | 0.19 | 0.11 | 30.2% | 0.0% | 0.50 | 8.6 |
| Thistlewick (standard) | P12 | 82.0% ✗ | 3.9% | 76% · 85% · 85% | 20.9% | 0.26 | 0.12 | 18.5% | 0.1% | 0.56 | 8.7 |
| Thistlewick (standard) | P10 | 83.4% ✗ | 1.9% ✗ | 77% · 86% · 86% | 1.8% | 0.22 | 0.11 | 7.9% | 0.4% | 0.50 | 8.2 |
| Gallowsmere (hard) | V0 | 56.9% | 9.9% | 53% · 58% · 60% | 0.0% | 0.39 | 0.18 | 35.4% | 5.9% | 0.86 | 9.8 |
| Gallowsmere (hard) | P12 | 64.5% ✗ | 7.0% ✗ | 59% · 67% · 67% | 0.1% | 0.51 | 0.20 | 17.2% | 10.5% | 0.96 | 9.8 |
| Hallowby (easy) | V0 | 88.9% | 1.3% | 86% · 89% · 91% | 73.5% | 0.14 | 0.07 | 25.2% | 0.0% | 0.40 | 8.4 |
| Hallowby (easy) | P12 | 92.6% | 1.0% | 89% · 94% · 95% | 79.6% | 0.18 | 0.06 | 17.6% | 0.0% | 0.44 | 8.5 |
| Hallowby (easy) | P10 | 93.7% ✗ | 0.4% | 92% · 95% · 95% | 53.6% | 0.14 | 0.06 | 8.4% | 0.0% | 0.38 | 7.9 |

Gallowsmere is Hard, so P10 doesn't change it. Hallowby is checked against the Easy targets.

### Three seeds (3,000 raids per label and party size each)

| Rules | Seed | Win E / S / H | Forked E / S / H | Hard captures | A Ghost | Dracula |
|---|---|---|---|---|---|---|
| V0 | 1 · 7 · 11 | 91.6 / 73.2 / 56.5 · 91.7 / 74.4 / 56.8 · 91.7 / 74.4 / 56.7 | 0.9 / 5.5 / 9.3 · 1.0 / 4.9 / 9.8 · 0.9 / 5.1 / 10.3 | 0.36 · 0.37 · 0.37 | +2.7 · +1.4 · +2.2 | +1.7 · +2.0 · +1.5 |
| P12 | 1 · 7 · 11 | 94.3 / 77.8 / 61.0 · 94.5 / 79.1 / 61.6 · 94.9 / 79.0 / 61.0 | 0.6 / 3.1 / 7.2 · 0.7 / 2.7 / 8.0 · 0.7 / 2.8 / 7.7 | 0.50 · 0.51 · 0.52 | +2.6 · +1.4 · +2.5 | +2.3 · +2.6 · +1.5 |
| F12 (Limits 9 / 10 / 13) | 1 · 7 · 11 | 92.1 / 75.2 / 54.7 · 92.3 / 76.7 / 56.3 · 93.0 / 76.4 / 55.5 | 1.0 / 3.7 / 9.6 · 1.1 / 3.3 / 9.1 · 0.9 / 3.4 / 9.7 | 0.48 · 0.49 · 0.48 | +2.8 · +1.9 · +2.8 | +2.7 · +2.3 · +1.1 |
| F12+L2 (and Lead 2, escape 5) | 1 · 7 · 11 | 92.7 / 76.4 / 56.0 · 92.9 / 77.9 / 56.7 · 93.3 / 78.0 / 56.0 | 1.0 / 4.4 / 9.9 · 1.2 / 3.9 / 10.4 · 1.0 / 4.0 / 10.4 | 0.34 · 0.34 · 0.34 | +3.0 · +2.3 · +2.9 | +2.5 · +2.1 · +1.4 |

Averaged over the three seeds, every Entity is inside ±2.5 under P12 (A Ghost +2.2, Dracula +2.1) and F12 (A Ghost +2.5, at the line); with the Lead-2 fallback A Ghost averages +2.7. The single largest option, the Creature's Book-Learned (−3.6 on seed 1), was −3.8 on the same seed before the package: the old single-seed edge case, not something the package made.

### The single steps behind the fixes (seed 1, 3,000 raids per party size unless marked)

| Label | Change on top of the package | Win | Forked | Notes |
|---|---|---|---|---|
| Easy | none | 94.3% | 0.6% | 1.3 over |
| Easy | Limit 10 | 93.7% | 0.6% | still 0.7 over |
| Easy | **Limit 9** | **92.1%** | **1.0%** | 92.3% and 93.0% on seeds 7 and 11; Puddlecombe 91.1%, Hallowby 90.9% |
| Easy | way out 8 | 92.9% | 0.7% | at the edge |
| Easy | final mob 11 | 93.2% | 2.1% | both just over |
| Standard | none | 77.8% | 3.1% | 78.1% / 3.1% at 6,000; 79.1 and 79.0% on seeds 7 and 11; Thistlewick 82.0% |
| Standard | **Limit 10** | **75.2%** | **3.7%** | 75.4% / 3.6% at 6,000; Thistlewick 79.5% / 4.6% |
| Standard | way out 10 | 74.9% | 5.2% | centres both; captures 0.30; Thistlewick 79.0% / 5.8% |
| Standard | Limit 9 | 71.2% | 4.2% | 0.8 under; Thistlewick 75.7% / 5.0% |
| Standard | final mob 12 | 76.4% | 7.6% | forked over |
| Hard | none | 61.0% | 7.2% | 61.1% / 7.4% at 6,000; Gallowsmere 64.5% / 7.0% |
| Hard | Limit 14 | 58.2% | 8.4% | 58.4% / 8.5% at 6,000, 58.8% / 8.5% on seed 7; Gallowsmere 61.8% (61.4% at 6,000) |
| Hard | **Limit 13** | **54.7%** | **9.6%** | 55.3% / 9.5% at 6,000, 55.9% / 9.3% and 55.5% / 9.7% on seeds 7 and 11; Gallowsmere 58.4% / 9.8% (57.9% / 10.0% at 6,000) |
| Hard | final mob 12 | 58.4% | 17.2% | forked far over |
| Hard | final escape 7 | 60.8% | 8.1% | wins still over |
| Hard captures | local chase escapes at 3 | 63.9% | 6.9% | captures 0.46 (most captures come on the chase's first roll) |
| Hard captures | **local chase starts at 2, escapes at 5 (the D6 fallback)** | 61.8% | 7.9% | captures 0.37; with Limit 13, 56.0% / 9.9% and 0.34 |

**Recommendation: Limits 9 / 10 / 13 (F12; adopted 2026-10-20).** Each Limit was tuned when a local chase added about 3 Suspicion; one rise a chase halves that, so the hunt comes later and less often (10 / 14 / 18% of raids against 16 / 26 / 36%). Bringing the Limits down puts it back where the targets were met (F12: 17 / 17 / 24%) without touching any other rule. It is one number per label, two steps on Easy and Hard. The alternatives: Hard Limit 14 alone is the smallest step for rolled Hard towns but leaves Gallowsmere 1.4–1.8 over; Standard way out 10 instead of Limit 10 centres Standard's forked rate (5.2%) but raises its captures to 0.30. **Hard captures** stay at 0.48 under F12; if they matter more than Lead 1's bite, the D6 fallback brings them to 0.34 (Richard's accepted figure), but then giving up stops mattering (a chase starts at Lead 2, and D2 fires 0.000 a raid), Easy sits at its top edge and A Ghost at +2.3 to +3.0. **Thistlewick** is 1.5 over under F12 (79.5%) and no label number brings both it and rolled Standard towns inside (Standard Limit 9 does Thistlewick, 75.7%, but drops rolled towns to 71.2%): it needs a town change, as V20 and V29 did, which is content for Richard to choose.

### The 10-Turn night (D5b): the targets don't hold

| | Easy win / forked | Standard win / forked | Standard win with 3 · 4 · 5 | Grand Year E / S | Puddlecombe | Thistlewick | Hallowby |
|---|---|---|---|---|---|---|---|
| Target | 87–93% / ≤2% | 72–78% / 3–7% | close together | — | Easy | Standard | Easy |
| P12 (12 Turns) | 94.3% / 0.6% ✗ | 77.8% / 3.1% | 73.9 · 79.3 · 80.3% | 35% / 7% | 94.2% ✗ | 82.0% ✗ | 92.6% |
| P10 (10 Turns) | 94.8% / 0.1% ✗ | 75.2% / 1.4% ✗ | 67.6 · 77.1 · 81.1% | 12% / 1% | 93.3% ✗ | 83.4% / 1.9% ✗ | 93.7% ✗ |
| F10 (and Easy Limit 8, Standard final mob 12, Hard Limit 13) | 90.9% / 0.3% | 74.9% / 3.6% | 67.4 · 76.8 · 80.5% | 10% / 1% | 87.6% | 82.9% ✗ | 90.7% |

Ten Turns doesn't make the game harder on Easy (fewer Turns, fewer tries for the furniture, so less of its noise and fewer hunts: Easy wins rise 0.5 and forked falls to 0.1%) and it takes the risk out of Standard (the hunt comes in 7% of raids instead of 14%, forked 1.4%). Bringing it back needs three numbers, not one (single steps tried with 10 Turns: Easy Limit 10 94.2%, Limit 9 92.9%, way out 8 93.0%; Standard Limit 10 72.7% / 1.7%, Limit 9 69.2% / 2.3%, final Lead 1 75.1% / 2.4%, final mob 12 74.9% / 3.6%), and even then Thistlewick is 4.9 over and a party of three wins 13 points less often than a party of five on Standard. Not recommended: keep 12 Turns, with F12's Limits.

### Decided, and the final check on the new defaults (2026-10-20)

Richard delegated the calls: **F12 is adopted** (Suspicion Limits 9 / 10 / 13 with the package; everything else as P12), **12 Turns stay** (D5b's condition failed), and **the Lead-2 fallback isn't taken**. These are now the simulator's defaults (`sim/params.mjs` NUMBERS; the switch back is `BEFORE_REVIEW` with `OLD_LIMITS`, package V0, and the package on the old Limits is package P12). The simulator keeps its own label numbers in `sim/params.mjs` (it doesn't read the Limits from `module/config.mjs`); `test/sim.test.mjs` pins them to 9 / 10 / 13.

```
node sim/run.mjs --runs 3000 --sweep-runs 500     # sim/REPORT.md
node sim/premade-check.mjs 3000                   # Puddlecombe, Thistlewick, Gallowsmere
node sim/demo-check.mjs 6000                      # Hallowby (sim/DEMO.md)
node sim/full-table.mjs 6000                      # sim/FULL-TABLE.md
```

Seed 1, 3,000 raids per label and party size (the same numbers as F12 above, as they should be):

| Measure | Target | Before the review (V0) | Now |
|---|---|---|---|
| Win, Easy / Standard / Hard | 87–93 / 72–78 / 55–60% | 91.6 / 73.2 / 56.5% | **92.1 / 75.2 / 54.7%** (Hard 0.3 under on this seed; 55.3% at 6,000 raids, 56.3% and 55.5% on seeds 7 and 11) |
| Forked, Easy / Standard / Hard | ≤2 / 3–7 / 8–12% | 0.9 / 5.5 / 9.3% | **1.0 / 3.7 / 9.6%** (9.5% at 6,000; 9.1% and 9.7% on seeds 7 and 11) |
| Win with 3 · 4 · 5 Entities, Hard | close together | 51.6 · 57.1 · 60.7% | 49.8 · 54.3 · 60.1% |
| The hunt at the Limit / at dawn, per raid | — | 16 / 26 / 36% · 0 / 0 / 5% | 17 / 17 / 24% · 0 / 0.2 / 12% |
| Captures per raid (Hard target 0.2–0.3, accepted ~0.34) | — | 0.09 / 0.18 / 0.36 | 0.10 / 0.23 / **0.48** |
| Rescues · left behind per raid | — | 0.02 / 0.03 / 0.05 · 0.04 / 0.11 / 0.18 | 0.02 / 0.04 / 0.07 · 0.05 / 0.13 / 0.23 |
| Local chases per raid · Suspicion one adds | — | 0.26 / 0.47 / 0.79 · 3.1 / 3.0 / 3.2 | 0.27 / 0.51 / 0.86 · 1.4 / 1.4 / 1.4 |
| A lone runner escapes · is captured | — | 43 / 33 / 31% · 34 / 38 / 45% | 62 / 52 / 42% · 37 / 45 / 55% |
| Give-ups per raid (D2) | — | — | 0.035 / 0.087 / 0.151 |
| Final flights: forked per flight · rounds · charges spent | — | 5.4 / 21.0 / 22.7% · 2.8 / 3.5 / 4.9 · 3.3 / 2.8 / 2.5 | 5.5 / 21.5 / 26.5% · 2.7 / 3.7 / 5.1 · 4.0 / 2.8 / 2.0 |
| Overdraws per raid | — | 0.09 / 0.19 / 0.43 | 0.01 / 0.07 / 0.19 |
| Turn the party leaves (by the way out) | — | 8.1 / 9.3 / 9.7 | 8.1 / 9.4 / 9.7 |
| Grand Year when a party always goes for furniture · a Win lost | ~50% · ~20% | 53.9% · 17.8% | 48.0% · 19.6% |
| Trouble · Criticals | 10–22% · 3–7% | 18.5% · 5.3% | 18.1% · 5.3% |
| Entities spending half their charges | ≥ 50% | 73.6% | 77.0% |
| Mask, rolls where there's a choice | ≥ 25% (Monster too) | 34.2% | 37.2% |
| Entities | within ±2.5 | −2.0 to +2.7 | −2.4 to +2.8 on seed 1 (A Ghost +2.8, Dracula +2.7); three-seed averages A Ghost +2.5, Dracula +2.0, the rest inside |
| Largest option | within ±2.5 | Book-Learned −3.8 | Book-Learned −3.7 (the old single-seed edge case) |

| Town | Target | Before the review | Now |
|---|---|---|---|
| Puddlecombe (Easy) | 87–93% · ≤2% | 88.7% · 0.9% | **91.1% · 0.5%** (87 · 91 · 95% with 3 · 4 · 5) |
| Thistlewick (Standard) | 72–78% · 3–7% | 75.2% · 5.9% | **79.5% · 4.6%** ✗ 1.5 over (74 · 82 · 83%) |
| Gallowsmere (Hard) | 55–60% · 8–12% | 56.9% · 9.9% | **58.4% · 9.8%** (53 · 61 · 61%) |
| Hallowby (the one-shot, Easy) | 87–93% · ≤2% | 88.9% · 1.3% | **90.9% · 1.5%** (91.0% · 1.5% at 6,000; 88 · 92 · 93%) |

**Still outside a target:** Hard captures 0.48 a raid (0.18 over 0.3, 0.14 over the accepted 0.34; the Lead-2 fallback, not taken, was the only lever found); Thistlewick 1.5 points over (a town change for Richard); Hard wins at the floor (54.7–56.3% over the seeds and run sizes tried) and the three-Entity Hard party 10 points behind five, as before. Everything else holds.

## The Entity tuning (2026-10-20, after the outside review's Section 4)

Measured in `sim/TUNING-2026-10-20.md` (three seeds, on random kits and on the default kits a first-time table plays) and decided the same day under Richard's delegation (DESIGN 2026-10-20). **In the game now:**
- **W-e, Dracula's Wall-Crawler:** "In a chase you can always roll Nimble, whatever the ground, and your Nimble die is one size bigger (the roll's one raise)", in every chase, the final flight included. In the simulator it is `wallCrawler: "bigger"`, now the engine's default (`sim/params.mjs` TUNING; "plain" plays the Perk as it was). Measured: his lone local chases escape 50.5% (43.3% with Hypnotic Eyes, 43.8% with the old Perk), Hard forked with him 9.6 → 7.5% when he picks it, the levels within 0.2 point, Dracula as a random pick +2.1 → +2.3. With Garlic in play from round 1, the raise and the step down cancel: his Nimble stays a d10 in every chase.
- **C-b, the Creature's default Perk is Tireless** (was Strong Back): +0.1 / 0.0 for his party (Standard / Hard, default kits). Strong Back did nothing measurable in any form (C-a "keeps the Mask": 0.0 everywhere; a carrier rolls 0.075 times a raid).
- **M-a, the Mummy's default Perk is Fear the Curse** (was Patience of Ages): +0.6 / +1.3, her lone chases 47.7 → 58.0% escaped, with-vs-without −0.4 → +0.5.
- **Wi-a, the Witch's default Gift is A Potion for That** (was Broomstick): +0.6 / +1.5, with-vs-without −2.5 → −0.7.
- **T3, Thistlewick's strongbox at the ironmonger 8 → 10:** 79.9 → 76.3% won (75.8 / 76.9 / 76.1 on the seeds), forked 4.9%.

The new defaults come from `module/config.mjs` (`kitPolicy: "default"` reads the marked defaults), and Thistlewick from `book/src/towns.json`, so nothing else in the simulator changed; on random kits a default changes nothing. **Kept:** Hypnotic Eyes and Bat (D-a +6.0 for Dracula; D-b neutral; D-c worse); Out of Sight as V17 has it (I-a +5.5); Broomstick on Nimble (Wi-b pushes default-kit Standard and Hard out). **Open for Richard:** "+2 on a d12" (G-a pushes every level and town out; G-b needs a Limits pass) and Jekyll & Hyde's default kit (−3.5), with which kind of party the targets apply to.

### The check with everything in

```
node sim/run.mjs                                   # sim/REPORT.md: seed 1, 2,000 raids per label and party size
node sim/premade-check.mjs 3000                    # the three printed towns, seed 1
node sim/demo-check.mjs 6000                       # Hallowby (sim/DEMO.md)
node sim/full-table.mjs 6000                       # five players and play styles (sim/FULL-TABLE.md)
node sim/tuning-check.mjs --runs 2000 --town-runs 3000 --seeds 1,7,11 --only rolled,town --opts base
```

Three seeds (1, 7, 11); rolled towns 2,000 raids per label and party size per seed, towns 3,000 per party size per seed. Before = `sim/TUNING-2026-10-20.md`'s baseline on the same seeds.

| Measure | Target | Before | Now |
|---|---|---|---|
| Win / forked, random kits (the standard) | 87–93 / 72–78 / 55–60% · ≤2 / 3–7 / 8–12% | 92.4 / 76.0 / 55.4% · 1.0 / 3.4 / 9.5% | **92.5 / 76.0 / 55.6% · 0.9 / 3.3 / 9.2%** (each seed inside) |
| Win / forked, default kits (a first-time table) | the same | 92.8 / 75.5 / 55.9% · 0.9 / 3.5 / 10.9% | **93.5 ✗ / 77.1 / 57.3% · 0.9 / 3.3 / 10.6%** (Easy 0.5 over; Standard 78.4% on seed 7, 0.4 over) |
| Each Entity with vs without, random kits | within ±2.5 | +2.5 (A Ghost) to −1.9 | +2.5 (A Ghost) to −1.9; Dracula +2.1 → +2.3 |
| Each Entity with vs without, default kits | within ±2.5 | +3.1 / +2.9 / −3.5 outside (Invisible Man, Dracula, Jekyll & Hyde) | the Invisible Man +2.5 (at the line), Jekyll & Hyde −3.5 ✗; the Mummy +0.3, the Witch −1.0, Dracula +2.3 |
| Puddlecombe (Easy), random · default kits | 87–93% · ≤2% | 91.2% · 93.2% ✗ | **91.3% · 93.0%**, forked 0.6 · 0.5% |
| Thistlewick (Standard), random · default kits | 72–78% · 3–7% | 79.9% ✗ · 79.4% ✗ | **76.4% · 75.9%**, forked 4.8 · 5.0% (76.0 / 77.0 / 76.3 on the seeds) |
| Gallowsmere (Hard), random · default kits | 55–60% · 8–12% | 57.7% · 56.7% | **57.8% · 59.5%**, forked 9.7 · 11.0% |
| Hallowby (the one-shot), random · default kits | 87–93% · ≤2% | 90.8% · 90.9% | **90.9% · 91.2%**, forked 1.6 · 1.8% |

Seed 1 alone (the commands above): rolled towns **92.3 / 74.7 / 55.2% won, 0.9 / 3.5 / 9.2% forked** (`sim/REPORT.md`, now at 2,000 raids per label and party size; Hard captures 0.47 a raid, as before; on this seed Dracula +3.1 and A Ghost +2.9 with vs without, against +2.3 and +2.5 on the three-seed average, and Book-Learned −3.7, the old single-seed edge case). The printed towns at 3,000 per party size: Puddlecombe 91.2% / 0.5%, **Thistlewick 76.0% / 4.8%** (70.6 · 77.7 · 79.7% with 3 · 4 · 5), Gallowsmere 58.5% / 9.6%. Hallowby at 6,000: 91% / 1% (88 · 92 · 94%; daredevils 90% / 2%; `sim/DEMO.md`). A full table of five at Thistlewick (`sim/FULL-TABLE.md`): default players 84 → 80%, cautious 85 → 82%, daredevils 76 → 74% (Grand Year 60 → 54%), a party that stays together 91 → 88%.

**Still outside a target:** on default kits only, Easy 93.5% (0.5 over) and Standard 78.4% on seed 7; with vs without, Jekyll & Hyde −3.5 and the Invisible Man at +2.5. The targets were set on random kits, where every level, town and Entity is inside; which kind of party they should hold for is the open question for Richard (DESIGN, open questions). Hard captures 0.47 and Book-Learned as before.

## The v0.2 review's open decisions (2026-10-21, measured, nothing decided)

Measured in `sim/REVIEW2-2026-10-21.md` (`sim/review2-check.mjs`; three seeds, 2,000 rolled raids per label and party size per seed, 3,000 per party size in each town). The options are switches in `sim/params.mjs` REVIEW2, off by default. Each trick the review found is played as generously as the rules allow (an upper bound). Today: 92.5 / 76.0 / 55.6% won, 0.9 / 3.3 / 9.2% forked.
- **Spectral plus free hand-offs (1.1):** the trick is real. A party of 4 with a Spectral Ghost wins 78.3 / 58.5% (Standard / Hard) today, and 82.5–84.2 / 65.1–67.3% with it. The fixes, with the trick played: (a) not on a location's last obstacle 79.2 / 60.4%; (b) a pass never takes the item 79.8 / 61.9%; (c) only on a location's first obstacle 80.3 / 60.8%. On random kits even the trick keeps every level inside, so the damage is where a table has a Spectral Ghost (her default Perk). (a) and (b) change the one-shot's florist line; (c) doesn't.
- **Overdraws (1.2):** in a local chase, "free" overdraws with the hunt already certain happen in 0.25–0.36% of lone chases even when played as a trick; one overdraw per chase changes nothing measurable. In the flight, the free round-2 overdraw is worth about 1 point of forked per flight; a stacking step of its own takes it away (Hard forked 9.2 → 9.8%).
- **Late-track and long chases (1.3):** the mob capped at 11 keeps every target and lowers Hard captures from 0.48 to 0.44 (a lone Hard runner from Suspicion 8–10: Monster 33 → 51%, Mask 7 → 16%). 8 + ⌊Suspicion/3⌋ takes Thistlewick and Gallowsmere over. About 17% of lone chases reach round 6; the round-6 cap is balance-neutral.
- **Lock-up 8 on Easy (1.4):** Easy 93.1%, 0.1 over.
- **Party size (1.5):** five Entities sit outside on every level. A Limit 1 lower for five on Easy and Standard fixes those cells with every level inside. On Hard it needs a step both ways (five 12, three 14) to keep the pooled Hard inside. Ten Turns for five goes the wrong way. Easy Limit 10 takes Easy (94.0%) and Puddlecombe (93.1%) over. About a third of Hard raids end in the final flight (35.9% rolled, 36.3% Gallowsmere), not "most".
- **Any ability as a raise in a local chase (1.6):** balance-neutral (within 0.3 everywhere).
- **The recommended set together** ((a), one overdraw per chase, the stacking flight step, mob at most 11, the round-6 cap, any ability as a raise): 92.3 / 76.0 / 56.3% won, 1.0 / 3.3 / 9.8% forked, and every town inside. With every trick played: 92.3 / 76.1 / 56.6%.

## The v0.2 review's decisions, in the game (2026-10-21)

Decided the same day under Richard's delegation (DESIGN 2026-10-21) from `sim/REVIEW2-2026-10-21.md`, and now the simulator's defaults (`sim/params.mjs`): **Spectral only at a way in** (`spectralFix: "firstOnly"`, option (c): at a way in that is the location's only obstacle she still takes the item, and past a group way in she stays past whichever way in the others pick), **one overdraw per runner per local chase** (`localOverdraw: "once"`), **the flight overdraw's own step down** (`flightOverdraw: "stackAny"`: the overdrawer's trait die one size smaller from its next roll to the end of the flight, on top of any Weakness, once per flight, allowed while the Weakness is in play), **the local mob at most 11** (NUMBERS.localMob.max), **six rounds at most** (`localRoundCap: 6`; still running after round 6, Lead 2+ escapes, less is cornered), **five Entities: the Limit 1 lower on Easy and Standard** (NUMBERS.fivePlayers, read from `module/config.mjs` DGF.fivePlayers, the same data the Foundry system and the book's town pages use), **any ability as a raise in a local chase** (`localRaise: "any"`), and **the rolled towns' ways in** (NUMBERS.wayInRules: an `inside` row of the obstacle table, the strongbox and the back room, is rolled again at either way in, and a second way in that is also a group obstacle is rolled again). The five rule readings moved from REVIEW2 into PARAMS (so `run.mjs` sweeps them); the switch back is `BEFORE_REVIEW2` with `OLD_REVIEW2` (package V1), which reproduces the game before exactly (the same raids, seed for seed; V1 on seed 1 is 92.3 / 74.7 / 55.2%, the last recorded check). `sim/review2-check.mjs` plays every option on top of V1, so it still measures what its report measured.

```
node sim/run.mjs                                                   # sim/REPORT.md: seed 1, 2,000 raids per label and party size
node sim/run.mjs --seed 7 --no-sweeps --no-packages --out …       # and seed 11
node sim/premade-check.mjs 3000 [--seed 7 | --seed 11]             # the three printed towns
node sim/demo-check.mjs 6000                                       # Hallowby (sim/DEMO.md); three seeds at 3,000 per party size below
```

Three seeds; rolled towns 2,000 raids per label and party size per seed (6,000 per label), towns 3,000 per party size per seed. Before = the same raids on V1 (the three-seed baseline of `sim/REVIEW2-2026-10-21.md`).

| Measure | Target | Before (V1) | Now: seed 1 · 7 · 11 | Now, three seeds |
|---|---|---|---|---|
| Win, Easy | 87–93% | 92.5% | 91.4 · 91.6 · 91.8% | **91.6%** |
| Win, Standard | 72–78% | 76.0% | 73.4 · 74.1 · 74.8% | **74.1%** |
| Win, Hard | 55–60% | 55.6% | 55.9 · 56.6 · 56.7% | **56.4%** |
| Forked, Easy | ≤2% | 0.9% | 0.8 · 1.1 · 0.8% | **0.9%** |
| Forked, Standard | 3–7% | 3.3% | 4.0 · 3.2 · 3.3% | **3.5%** |
| Forked, Hard | 8–12% | 9.2% | 9.6 · 10.1 · 9.3% | **9.7%** |
| Captures per Hard raid | 0.2–0.3 (accepted ~0.34) | 0.48 | 0.42 · 0.43 · 0.43 | 0.43 ✗ (the known miss, down from 0.48) |
| Puddlecombe (Easy) | 87–93% · ≤2% | 91.3% · 0.6% | 90.3 · 90.7 · 90.2% · 0.5 · 0.6 · 0.7% | **90.4% · 0.6%** |
| Thistlewick (Standard) | 72–78% · 3–7% | 76.4% · 4.8% | 74.3 · 75.3 · 74.8% · 4.6 · 4.7 · 5.0% | **74.8% · 4.8%** |
| Gallowsmere (Hard) | 55–60% · 8–12% | 57.8% · 9.7% | 59.2 · 58.0 · 57.8% · 10.0 · 10.3 · 10.8% | **58.3% · 10.4%** |
| Hallowby (the one-shot, Easy) | 87–93% · ≤2% | 90.9% · 1.6% | 90.4 · 90.5 · 90.5% · 1.4 · 1.7 · 1.5% | **90.4% · 1.6%** (6,000 per party size on seed 1: 90% · 1%, `sim/DEMO.md`) |
| Each Entity with vs without | within ±2.5 | +2.5 (A Ghost) to −1.9 | seed 1: A Ghost +2.9, Jekyll & Hyde −2.3; seed 7: Dracula +2.2, the Creature −2.0; seed 11: Dracula +2.0, Jekyll & Hyde −1.8 | averages: A Ghost +2.2, Dracula +2.0, the Invisible Man +1.3, the Werewolf +0.5, the Mummy −1.2, the Witch −1.4, the Creature −1.6, Jekyll & Hyde −1.8 (inside) |
| Trouble · Criticals · half the charges spent · Mask where chosen | 10–22% · 3–7% · ≥50% · ≥25% | 17.9% · 5.3% · 76.8% · 37.3% | 17.8 · 17.6 · 17.6% · 5.2 · 5.3 · 5.4% · 78.0 · 77.8 · 77.9% · 38.2 · 38.2 · 38.4% | inside |
| Grand Year when a party always goes for furniture · a Win lost | ~50% · ~20% | 48.0% · 19.6% (seed 1) | 47.1 · 47.7 · 47.5% · 20.1 · 19.6 · 20.5% | inside |

**By party size** (win / forked, seeds 1 · 7 · 11):

| Label | 3 Entities | 4 Entities | 5 Entities |
|---|---|---|---|
| Easy | 91.0 / 1.1 · 89.5 / 1.8 · 92.2 / 0.9 | 92.8 / 0.9 · 92.5 / 0.9 · 91.7 / 0.8 | 90.3 / 0.5 · 93.0 / 0.5 · 91.6 / 0.8 (before: 93.8 / 0.6, over) |
| Standard | 72.8 / 4.8 · 72.1 / 3.4 · 72.5 / 4.0 | 75.4 / 3.5 · 76.3 / 3.5 · 77.3 / 3.3 | 72.0 / 3.8 · 74.0 / 2.8 · 74.6 / 2.5 (before: 77.1 / 2.7, forked under) |
| Hard | 51.4 / 12.1 · 52.9 / 12.4 · 51.4 / 12.3 | 55.8 / 10.2 · 55.3 / 11.7 · 58.8 / 8.4 | 60.5 / 6.6 · 61.7 / 6.3 · 60.0 / 7.3 |

Printed towns by party size (seed 1): Puddlecombe 87.7 · 91.3 · 91.8%, Thistlewick 70.6 · 77.7 · 74.6%, Gallowsmere 53.1 · 62.1 · 62.4%; Hallowby 88.2 · 92.0 · 91.0%.

**Every level, the three printed towns and Hallowby are inside their targets on every seed.** The five-player cells the Limit change was for came in: Easy with five 91.6% (was 93.8%), Standard with five 73.5% won and 3.0% forked (was 77.1% / 2.7%; 2.8 and 2.5% on seeds 7 and 11, at the floor). **Still outside, as before and as decided:** Hard captures 0.43 a raid (the known miss, 0.48 before); Hard by party size (three Entities about 52%, five about 61%: Hard's Limit by party size was kept as it is); on single seeds the largest option outlier (seed 1: Through the Hedge +4.8, an edge case of one seed's small cells, like Book-Learned before; seeds 7 and 11: Pillar of Society +4.0, Fear the Curse +2.8).
