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

| Town (2,000 raids per party size, seed 1) | Win (target) | Forked (target) | Win, 3 · 4 · 5 | Forked, 3 · 4 · 5 | Captures | Goes for the furniture |
|---|---|---|---|---|---|---|
| Puddlecombe, Easy (12 obstacles, mean Difficulty 8.0, 5 watched) | 90.1% (87–93%) | 0.3% (0–2%) | 87.0 · 90.3 · 93.0 | 0.3 · 0.3 · 0.1 | 0.14 | 13.5% |
| Thistlewick, Standard (15 obstacles, mean 8.1, 7 watched, 2 essentials) | 76.3% (72–78%) | 6.4% (3–7%) | 72.3 · 77.8 · 78.9 | 7.4 · 5.8 · 5.9 | 0.24 | 53.3% |
| Gallowsmere, Hard (18 obstacles, mean 9.4, 12 watched) | 56.9% (55–60%) | 8.5% (8–12%) | 53.1 · 58.8 · 58.8 | 10.4 · 8.3 · 6.7 | 0.37 | 0% |

Re-run at 3,000 raids per party size with seed 7: 90.1 / 0.5%, 76.9 / 6.1%, 55.5 / 9.5%; Gallowsmere with seeds 3 and 11: 56.0 / 9.1%, 55.6 / 8.7%. Every town stays inside its targets; Gallowsmere sits about a point above the bottom of both of its bands (an easier printer's back room would centre its win rate at about 58% but bring forked down to about 8.5%).

How they were tuned (counts and Difficulties only, all within the rules): the first drafts played 94.7% (Easy), 65.3% (Standard) and 55.9% / 7.9% forked (Hard). Puddlecombe got a watched second obstacle at the market garden (the night watchman) and a watched trapdoor; Thistlewick lost the seed merchant's third obstacle (a Difficulty-12 drainpipe) and two Difficulty-10 watched obstacles became 8; Gallowsmere's strongbox went from 12 to 10 and three ways in became watched. What moves a fixed town most is where the watched marks sit: a watched obstacle the party must cross (the second or third) costs far more than a watched way in, which a party can go round.

Two things worth knowing: the simulated parties go for Gallowsmere's suit of armour in none of the raids (it stands at the first essential, with too little of the night left to carry it), and at Thistlewick half the parties try for the gilt mirror and 40% of raids end in a Grand Year.

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
