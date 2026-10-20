# Don't Get Forked — simulator report: P0 — The rules as decided (through the outside review's package, D1–D7 with R1 and D4, and F12's Limits 9 / 10 / 13, 2026-10-20) with the current numbers

Command: `node sim/run.mjs`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**The Entities are the approved roster** (dice, signatures, Gifts, Perks and Weakness timings read from `module/config.mjs`); towns are rolled with the book's town tables (`sim/town.mjs`). Players follow the policies in `sim/params.mjs`, which are simpler than real play.

## Packages

- **P0**: The rules as decided (through the outside review's package, D1–D7 with R1 and D4, and F12's Limits 9 / 10 / 13, 2026-10-20) with the current numbers.
- **V0**: The rules and Limits before the outside review (through V30 and the clarity pass, 2026-10-14).
- **P12**: The outside review's package with the old Limits 11 / 11 / 15 (before F12).
- **T10**: Not adopted (D5b): the package with a 10-Turn night on Easy and Standard and the old Limits.
- **N1**: Retune tried for a party that stays together: final-flight Lead starts at 3; final mob 11 / 12 / 12; Limits 12 / 12 / 14.
- **N2**: Tried for a party that splits up: the night lasts 8 Turns; final mob 10 / 12 / 12 (on target overall, but Hard wins 42% with 3 Entities and 72% with 5).

| Package | Easy win | Standard win | Hard win | Forked E · S · H | Hard captures | Grand Year when tried | Trouble | Mask (raid rolls) | Spend ≥ ½ | Hard win, 3 · 4 · 5 Entities |
|---|---|---|---|---|---|---|---|---|---|---|
| **target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | 0.2–0.3 | ~50% (furniturePolicy always) | 10–22% | ≥ 25% | ≥ 50% | close together |
| P0 | 92.3% | 74.7% | 55.2% | 0.9% · 3.5% · 9.2% | 0.47 | 76.8% | 18.0% | 42.6% | 77.1% | 51% · 55% · 60% |
| V0 | 91.8% | 73.2% | 56.5% | 0.7% · 5.3% · 9.3% | 0.35 | 80.0% | 18.5% | 37.6% | 73.6% | 52% · 57% · 60% |
| P12 | 94.5% | 77.6% | 61.7% | 0.5% · 3.1% · 7.0% | 0.49 | 80.3% | 17.4% | 38.4% | 73.8% | 57% · 62% · 66% |
| T10 | 95.1% | 75.6% | 61.7% | 0.1% · 1.4% · 7.0% | 0.49 | 78.9% | 16.8% | 37.1% | 71.4% | 57% · 62% · 66% |
| N1 | 92.2% | 80.1% | 56.8% | 1.1% · 3.4% · 14.4% | 0.49 | 76.5% | 18.9% | 39.6% | 75.4% | 52% · 56% · 62% |
| N2 | 87.9% | 36.7% | 19.9% | 0.1% · 1.8% · 5.1% | 0.26 | 100.0% | 14.8% | 37.1% | 61.2% | 6% · 11% · 42% |

## P0 — The rules as decided (through the outside review's package, D1–D7 with R1 and D4, and F12's Limits 9 / 10 / 13, 2026-10-20) with the current numbers against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 92.3% | ✓ |
| Win, standard | 72%–78% | 74.7% | ✓ |
| Win, hard | 55%–60% | 55.2% | ✓ |
| Forked, easy | 0%–2% | 0.9% | ✓ |
| Forked, standard | 3%–7% | 3.5% | ✓ |
| Forked, hard | 8%–12% | 9.2% | ✓ |
| Captures per Hard raid | 0.2–0.3 | 0.47 | ✗ |
| Grand Year when the party goes for furniture (a party that always goes for it) | ~50% | 48.0% | ✓ |
| Going for furniture costs the Win (a party that always goes for it) | ~20% | 19.3% | ✓ |
| The same, the default players (only when safe) | — | 76.8% · 5.6% (tried in 17.7% of raids) |  |
| Trouble, share of rolls | 10%–22% | 18.0% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 5.3% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 77.1% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 37.1% (29.9%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 62.9% (70.1%) | ✓ |
| Largest option outlier | within ±2.5 pts | gift Frankenstein’s Creature:Book-Learned -3.7 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 91.6% | 23.4% | 4.5% | 2.9% | 1.0% | 0.10 | 0.05 | 16% | 0% | 5.5 | 8.4 |
| easy | 4 | 92.3% | 35.0% | 4.6% | 1.9% | 1.2% | 0.10 | 0.05 | 20% | 0% | 5.9 | 8.1 |
| easy | 5 | 93.0% | 36.5% | 4.5% | 2.1% | 0.5% | 0.10 | 0.05 | 15% | 0% | 5.7 | 7.2 |
| standard | 3 | 72.4% | 2.4% | 12.2% | 11.2% | 4.3% | 0.22 | 0.13 | 16% | 0% | 7.0 | 9.7 |
| standard | 4 | 76.3% | 4.8% | 12.6% | 7.4% | 3.6% | 0.24 | 0.14 | 17% | 0% | 7.0 | 9.4 |
| standard | 5 | 75.4% | 11.6% | 15.2% | 6.7% | 2.7% | 0.24 | 0.12 | 19% | 0% | 7.2 | 8.0 |
| hard | 3 | 50.9% | 0.8% | 18.9% | 18.9% | 11.4% | 0.46 | 0.23 | 19% | 19% | 10.5 | 10.1 |
| hard | 4 | 54.5% | 2.1% | 18.0% | 17.2% | 10.3% | 0.49 | 0.24 | 25% | 12% | 10.7 | 9.6 |
| hard | 5 | 60.2% | 5.5% | 20.3% | 13.4% | 6.0% | 0.48 | 0.23 | 27% | 6% | 10.7 | 8.6 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 16.8 | 67.9% | 14.1% | 18.0% | 5.3% | 34.2% | 29.9% | 70.1% | 31.2% | 76.1% |

**Critical candidates** (share of all rolls; S8 decided doubles on a Success, the other columns are the rejected margins):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.3% | 34.2% | 26.8% | 20.3% | 14.8% | 10.2% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 17.7% | 76.8% | 5.6% | 92.3% | 74.7% | 55.2% |
| always | 72.6% | 48.0% | 19.3% | 87.2% | 59.6% | 43.4% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.47 | 30% |
| generous | 91% (-1.7) | 69% (-5.7) | 45% (-10.5) | 6.2% | 0.74 | 32% |
| strict | 81% (-11.6) | 48% (-26.4) | 29% (-25.9) | 7.0% | 0.80 | 29% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 93% (+1.5) | 80% (+4.7) | 61% (+6.4) | 3.9% | 0.45 | 31% |
| critRule = "beat6" (rule) | 93% (+0.8) | 79% (+3.1) | 59% (+4.1) | 7.2% | 0.47 | 30% |
| critRule = "beat7" (rule) | 92% (+0.5) | 77% (+1.8) | 57% (+2.3) | 8.1% | 0.49 | 30% |
| critEffect = "none" (rule) | 91% (-0.9) | 75% (-1.0) | 53% (-1.3) | 11.1% | 0.52 | 30% |
| critEffect = "lead2" (rule) | 92% (-0.1) | 75% (-0.9) | 54% (-0.5) | 9.0% | 0.51 | 30% |
| critEffect = "charge" (rule) | 91% (-0.7) | 75% (-0.3) | 54% (-0.9) | 10.9% | 0.52 | 29% |
| costChoice = "suspicion" (rule) | 91% (-1.2) | 70% (-5.9) | 52% (-2.5) | 9.9% | 0.48 | 28% |
| costChoice = "lenient" (rule) | 93% (+1.1) | 78% (+2.6) | 58% (+3.1) | 8.5% | 0.50 | 32% |
| dropRule = "lost" (rule) | 89% (-2.7) | 70% (-5.2) | 50% (-4.9) | 8.5% | 0.50 | 30% |
| dropRule = "extrasOnly" (rule) | 91% (-0.4) | 74% (-1.1) | 55% (+0.0) | 8.5% | 0.50 | 30% |
| loudRule = "witness" (rule) | 92% (-0.1) | 78% (+2.1) | 58% (+3.7) | 8.6% | 0.52 | 30% |
| loudRule = "both" (rule) | 91% (-0.4) | 76% (+0.6) | 55% (-0.1) | 9.3% | 0.51 | 30% |
| loudRule = "none" (rule) | 93% (+1.3) | 79% (+3.2) | 59% (+4.5) | 7.9% | 0.50 | 31% |
| openApproach = "quiet" (rule) | 90% (-1.5) | 73% (-2.4) | 54% (-0.8) | 10.4% | 0.43 | 25% |
| openApproach = "switch" (rule) | 89% (-2.7) | 69% (-6.7) | 49% (-5.7) | 11.1% | 0.55 | 23% |
| overdrawAtLimit = "weakness" (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| overdrawAtLimit = "free" (rule) | 92% (+0.4) | 76% (+0.7) | 55% (+0.9) | 3.7% | 0.50 | 31% |
| overdrawAtLimit = "forbidden" (rule) | 92% (+0.0) | 75% (-0.1) | 55% (-0.1) | 9.1% | 0.50 | 30% |
| overdrawAtLimit = "fury" (rule) | 90% (-2.3) | 74% (-1.9) | 51% (-3.5) | 23.3% | 0.50 | 29% |
| furnitureNoise = "moving" (rule) | 93% (+0.7) | 76% (+0.5) | 55% (-0.1) | 8.7% | 0.51 | 31% |
| spectralRule = "any" (rule) | 92% (+0.3) | 76% (+0.9) | 55% (+0.7) | 8.5% | 0.50 | 30% |
| mesmeriseRule = "any" (rule) | 93% (+1.1) | 77% (+1.4) | 55% (+0.6) | 9.0% | 0.51 | 31% |
| finalMove = "majority" (rule) | 92% (+0.3) | 76% (+0.0) | 55% (+0.2) | 8.2% | 0.51 | 25% |
| finalMove = "net" (rule) | 92% (+0.1) | 76% (+0.2) | 55% (+0.1) | 8.5% | 0.50 | 32% |
| openEase = 1 (rule) | 89% (-2.5) | 71% (-4.5) | 51% (-3.9) | 10.7% | 0.52 | 25% |
| raiseCap = "perDie" (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| raiseDie = "any" (rule) | 92% (+0.1) | 76% (+0.8) | 56% (+1.1) | 7.9% | 0.49 | 32% |
| openTrait = "any" (rule) | 92% (-0.2) | 76% (+0.1) | 56% (+1.2) | 10.7% | 0.50 | 32% |
| waysIn = "one" (rule) | 89% (-2.4) | 67% (-8.5) | 49% (-6.1) | 11.9% | 0.54 | 25% |
| overdrawStack = "merge" (rule) | 92% (+0.1) | 77% (+1.3) | 56% (+1.4) | 8.1% | 0.47 | 30% |
| chaseRule = "perRoll" (rule) | 88% (-3.8) | 70% (-5.2) | 51% (-3.9) | 10.9% | 0.35 | 28% |
| giveUp = "simple" (policy) | 92% (+0.1) | 75% (-0.2) | 55% (-0.1) | 8.7% | 0.50 | 30% |
| giveUp = "never" (policy) | 92% (+0.1) | 75% (-0.1) | 54% (-0.5) | 9.3% | 0.48 | 29% |
| flightRaise = "raiseOnly" (rule) | 92% (-0.1) | 76% (+0.1) | 55% (-0.1) | 8.8% | 0.50 | 30% |
| allHeld = "continue" (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| limitOrder = "limit" (rule) | 92% (-0.1) | 75% (-0.2) | 55% (-0.1) | 8.7% | 0.50 | 30% |
| spectralWhen = "work" (rule) | 92% (-0.1) | 75% (-0.3) | 55% (+0.6) | 8.7% | 0.50 | 30% |
| lootHandover = "none" (rule) | 91% (-0.7) | 74% (-1.1) | 52% (-2.6) | 8.8% | 0.51 | 30% |
| pieceSetDown = "free" (policy) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| pieceSetDown = "action" (policy) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| slipWatched = false (rule) | 92% (+0.0) | 76% (+0.0) | 55% (-0.1) | 8.7% | 0.50 | 30% |
| lootDrop = "outOfSight" (policy) | 92% (+0.1) | 76% (+0.3) | 55% (+0.3) | 8.7% | 0.50 | 30% |
| lootDrop = "guard" (policy) | 93% (+0.7) | 78% (+2.3) | 56% (+1.5) | 8.7% | 0.50 | 30% |
| chaseTable = "placeholder" (content) | 92% (-0.1) | 77% (+1.4) | 56% (+1.6) | 7.5% | 0.49 | 30% |
| chaseTable = "B" (content) | 92% (+0.5) | 77% (+1.8) | 58% (+3.4) | 4.9% | 0.46 | 31% |
| chaseTable = "C" (content) | 92% (+0.4) | 77% (+1.4) | 57% (+2.3) | 6.9% | 0.49 | 31% |
| partyPolicy = "together" (policy) | 93% (+1.6) | 59% (-16.4) | 40% (-15.0) | 8.5% | 0.44 | 26% |
| partyPolicy = "singles" (policy) | 92% (-0.3) | 77% (+1.3) | 54% (-0.6) | 9.2% | 0.46 | 31% |
| captiveItems = "kept" (rule) | 93% (+0.7) | 77% (+1.6) | 57% (+2.3) | 8.7% | 0.50 | 30% |
| multiCaught = "separate" (rule) | 92% (+0.0) | 75% (-0.1) | 55% (+0.0) | 8.7% | 0.51 | 30% |
| monsterRule = "plus1" (rule) | 93% (+1.5) | 79% (+3.9) | 69% (+14.7) | 5.1% | 0.45 | 16% |
| monsterRule = "tie" (rule) | 93% (+1.1) | 80% (+4.7) | 66% (+11.5) | 5.9% | 0.46 | 19% |
| monsterRule = "d8" (rule) | 91% (-0.8) | 75% (-0.5) | 55% (+0.7) | 14.5% | 0.62 | 20% |
| monsterRule = "maskSafe" (rule) | 98% (+6.1) | 95% (+19.3) | 91% (+36.7) | 1.5% | 0.00 | 58% |
| chaseSusp = "no" (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| chaseSusp = "cap2" (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| chaseSusp = "cap3" (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| chaseSusp = "cap4" (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| slipRule = "cost" (rule) | 92% (+0.3) | 76% (+0.4) | 57% (+2.0) | 8.1% | 0.50 | 30% |
| furnitureRule = "slow" (rule) | 93% (+1.2) | 76% (+0.7) | 55% (+0.2) | 8.4% | 0.51 | 32% |
| furnitureRule = "base" (rule) | 93% (+1.2) | 76% (+0.7) | 55% (+0.2) | 8.4% | 0.51 | 32% |
| furnitureRule = "hardLoc" (rule) | 93% (+1.0) | 76% (+0.7) | 55% (+0.1) | 8.5% | 0.51 | 31% |
| furnitureRule = "noisy" (rule) | 92% (+0.3) | 75% (-0.3) | 55% (+0.1) | 8.5% | 0.51 | 31% |
| furnitureRule = "both" (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| furnitureRule = "noisySlow" (rule) | 92% (+0.3) | 75% (-0.3) | 55% (+0.1) | 8.5% | 0.51 | 31% |
| furnitureRule = "slowHard" (rule) | 93% (+1.0) | 76% (+0.7) | 55% (+0.1) | 8.5% | 0.51 | 31% |
| furnitureRule = "slowWatched" (rule) | 92% (+0.3) | 76% (+0.3) | 55% (+0.2) | 8.4% | 0.51 | 31% |
| corneredAtLimit = "flight" (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| fetchRule = "flight" (rule) | 92% (-0.1) | 75% (-0.2) | 54% (-0.3) | 9.1% | 0.51 | 30% |
| fetchRule = "pickup" (rule) | 92% (-0.1) | 75% (-0.3) | 54% (-0.4) | 10.1% | 0.51 | 29% |
| fetchRule = "keeper" (rule) | 92% (+0.0) | 75% (-0.4) | 54% (-0.3) | 10.2% | 0.51 | 29% |
| fetchRule = "carry" (rule) | 92% (-0.1) | 75% (-0.3) | 54% (-0.4) | 10.1% | 0.51 | 29% |
| fetchRule = "grab" (rule) | 92% (+0.0) | 75% (-0.3) | 54% (-0.3) | 10.1% | 0.51 | 29% |
| fetchRule = "lockup" (rule) | 92% (+0.0) | 75% (-0.3) | 54% (-0.4) | 10.1% | 0.51 | 29% |
| fetchRule = "flightLockup" (rule) | 92% (+0.0) | 75% (-0.2) | 54% (-0.3) | 9.1% | 0.51 | 30% |
| alreadyDeadTurns = 2 (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| furniturePlace = "separate" (rule) | 93% (+1.6) | 76% (+0.0) | 56% (+1.7) | 7.9% | 0.49 | 32% |
| exitRule = "free" (rule) | 89% (-2.7) | 62% (-13.1) | 39% (-15.5) | 5.3% | 0.77 | 35% |
| exitRule = "gate" (rule) | 89% (-2.7) | 62% (-13.1) | 39% (-15.5) | 5.3% | 0.77 | 35% |
| exitRule = "gateCarriers" (rule) | 92% (+0.3) | 78% (+2.8) | 60% (+5.8) | 4.2% | 0.44 | 30% |
| groupRule = "best3" (rule) | 91% (-0.4) | 76% (+0.1) | 55% (+0.0) | 8.7% | 0.51 | 30% |
| groupRule = "best4" (rule) | 91% (-0.4) | 76% (+0.1) | 55% (+0.0) | 8.7% | 0.51 | 30% |
| tellScope = "entity" (rule) | 91% (-0.9) | 70% (-5.9) | 51% (-3.7) | 9.7% | 0.49 | 30% |
| openedRule = "othersMayFollow" (rule) | 92% (+0.4) | 74% (-1.5) | 53% (-1.3) | 9.5% | 0.51 | 30% |
| exitTries = "each" (rule) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.6% | 0.50 | 30% |
| triesPerTurn = "one" (rule) | 92% (+0.3) | 77% (+1.0) | 55% (+0.1) | 8.1% | 0.51 | 30% |
| planTime = "perObstacle" (policy) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| planTime = "perTurn" (policy) | 91% (-1.0) | 74% (-1.2) | 53% (-1.9) | 10.3% | 0.52 | 29% |
| openPolicy = "greedy" (policy) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| openPolicy = "last" (policy) | 91% (-0.9) | 73% (-2.5) | 53% (-1.9) | 9.8% | 0.52 | 28% |
| groupPolicy = "all" (policy) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| groupPolicy = "best2" (policy) | 92% (+0.0) | 76% (+0.1) | 55% (+0.2) | 8.7% | 0.50 | 30% |
| monsterPolicy = "mask" (policy) | 89% (-3.2) | 70% (-5.9) | 43% (-11.7) | 5.5% | 0.89 | 88% |
| monsterPolicy = "monster" (policy) | 84% (-8.0) | 57% (-18.1) | 48% (-7.1) | 12.6% | 0.37 | 0% |
| caughtWeight = 0.4 (policy) | 91% (-0.8) | 76% (+0.3) | 55% (+0.5) | 7.0% | 0.59 | 33% |
| caughtWeight = 2 (policy) | 91% (-0.4) | 75% (-0.2) | 50% (-4.9) | 8.6% | 0.39 | 28% |
| chargePolicy = "hoard" (policy) | 83% (-9.3) | 56% (-19.1) | 36% (-18.4) | 7.9% | 0.49 | 37% |
| furniturePolicy = "never" (policy) | 93% (+1.6) | 76% (+0.5) | 55% (+0.3) | 8.3% | 0.50 | 32% |
| furniturePolicy = "always" (policy) | 87% (-4.6) | 59% (-16.5) | 43% (-12.0) | 16.4% | 0.48 | 23% |
| outOfSightRule = "carry" (content) | 92% (+0.1) | 76% (+0.5) | 55% (+0.6) | 8.7% | 0.49 | 30% |
| outOfSightRule = "half" (content) | 92% (-0.1) | 76% (+0.1) | 55% (+0.3) | 8.3% | 0.50 | 30% |
| outOfSightRule = "handed" (content) | 92% (+0.1) | 75% (-0.3) | 55% (+0.3) | 8.6% | 0.50 | 30% |
| outOfSightRule = "handedSmart" (content) | 92% (+0.1) | 76% (+0.1) | 55% (+0.6) | 8.5% | 0.49 | 30% |
| roster = "placeholder" (content) | 93% (+1.1) | 79% (+3.0) | 57% (+2.3) | 8.6% | 0.49 | 35% |
| roster = "proposed" (content) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| dutyEdge = false (content) | 91% (-0.7) | 74% (-1.8) | 54% (-0.3) | 8.6% | 0.50 | 30% |
| tellPartyChance = 0.3333333333333333 (rule) | 94% (+2.3) | 79% (+3.5) | 57% (+2.5) | 7.2% | 0.50 | 30% |
| tellPartyChance = 0.6666666666666666 (rule) | 91% (-1.3) | 72% (-3.5) | 50% (-4.2) | 10.4% | 0.50 | 30% |
| tellChance = 0 (content) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| tellChance = 0.3333333333333333 (content) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| weaknessRule = "chance" (content) | 93% (+0.9) | 75% (-1.0) | 58% (+3.2) | 7.7% | 0.45 | 30% |
| weaknessRule = "always" (content) | 91% (-1.2) | 74% (-1.6) | 53% (-1.5) | 11.3% | 0.53 | 30% |
| weaknessRule = "soon" (content) | 92% (-0.1) | 76% (+0.4) | 55% (+0.7) | 8.3% | 0.49 | 30% |
| weaknessRule = "table" (content) | 92% (+0.1) | 76% (+0.8) | 56% (+1.5) | 7.7% | 0.48 | 30% |
| weaknessLocal = 0 (content) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| weaknessLocal = 0.5 (content) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| weaknessFinal = 0.25 (content) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |
| weaknessFinal = 1 (content) | 92% (+0.0) | 76% (+0.0) | 55% (+0.0) | 8.7% | 0.50 | 30% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift Frankenstein’s Creature:Mountain Stride +3.1 · entity Dracula +3.1 · gift The Werewolf:Through the Hedge +3.1 · entity A Ghost +2.9 · perk A Ghost:alreadyDead +2.5 · gift Jekyll & Hyde:Pillar of Society +2.2 · gift The Invisible Man:Through the Gap +2.1 · perk Frankenstein’s Creature:strongBack +1.5 · gift A Witch:A Potion for That +1.4 · perk Dracula:wallCrawler +1.3 · perk The Mummy:patienceOfAges +1.2 · perk The Werewolf:shortcut +1.1 · gift The Mummy:Royal Bearing +1.1 · entity The Werewolf +1.0 · gift Dracula:Bat +1.0 · gift A Ghost:Fade +0.9 · gift A Witch:Black Cat +0.7 · perk Jekyll & Hyde:practisedHand +0.7 · gift Frankenstein’s Creature:Hovel Watcher +0.7 · perk A Witch:familiarsWarning +0.6 · gift Jekyll & Hyde:Trample +0.6 · perk A Witch:flyByNight +0.5 · duty cook +0.5 · duty handyman +0.4 · perk Jekyll & Hyde:bruteStrength +0.4 · gift Dracula:Wolf +0.4 · duty tailor +0.3 · entity The Invisible Man +0.2 · perk The Invisible Man:lightStep +0.2 · perk The Invisible Man:outOfSight +0.2 · gift The Mummy:Just a Costume +0.2 · perk The Werewolf:fetch +0.1 · gift A Ghost:Whisper -0.0 · perk Dracula:oldMoney -0.1 · duty librarian -0.1 · perk Frankenstein’s Creature:builtToLast -0.2 · perk The Invisible Man:hiddenPockets -0.3 · gift The Werewolf:Howl -0.4 · gift The Invisible Man:Poltergeist -0.4 · duty butler -0.5 · perk The Mummy:fearTheCurse -0.5 · perk The Mummy:keeperOfTreasures -0.7 · duty gardener -0.7 · perk A Ghost:spectral -0.8 · gift A Ghost:Chill -0.9 · entity A Witch -1.1 · perk A Witch:wiseWoman -1.1 · perk The Werewolf:nightRunner -1.2 · perk Jekyll & Hyde:steadyNerves -1.2 · perk Dracula:hypnoticEyes -1.2 · gift The Mummy:Old Curse -1.2 · perk Frankenstein’s Creature:tireless -1.4 · gift Dracula:Mist -1.4 · entity Frankenstein’s Creature -1.6 · entity The Mummy -1.6 · gift The Invisible Man:Work It Out -1.7 · perk A Ghost:rattle -1.7 · gift A Witch:Broomstick -2.2 · gift The Werewolf:Keen Nose -2.6 · gift Jekyll & Hyde:Doctor’s Bag -2.8 · entity Jekyll & Hyde -2.9 · gift Frankenstein’s Creature:Book-Learned -3.7

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 11825 | 0.657 |
| a die stepped below d4 (floored at d4) | 4514 | 0.251 |
| suspicion past the Limit (lost) | 11 | 0.001 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:form | 0.377 |
| ability:hidden | 3.904 |
| ability:open | 3.060 |
| ability:raise | 0.944 |
| ability:switch | 1.494 |
| already dead: drifted off | 0.015 |
| captive rescued | 0.043 |
| captive slipped free | 0.090 |
| captures | 0.269 |
| carrier rolls: other obstacles | 0.004 |
| carrier rolls: the way out | 0.008 |
| charges regained by a Critical | 0.560 |
| charges spent | 9.688 |
| charges spent:final | 0.621 |
| charges spent:local | 0.414 |
| charges spent:raid | 8.615 |
| charges spent:slip | 0.038 |
| cost:drop | 0.102 |
| cost:stepdown | 0.489 |
| cost:suspicion | 0.355 |
| cost:turn | 0.448 |
| declined rolls | 0.599 |
| everyone held: Forked (D7b) | 0.000 |
| final flight escaped | 0.188 |
| final flight rounds | 0.962 |
| final flight: dawn | 0.042 |
| final flight: limit | 0.192 |
| forked | 0.045 |
| furniture dropped: carrier captured | 0.000 |
| furniture dropped: final flight | 0.006 |
| gave up (D2) | 0.088 |
| gave up in a shared chase (D2) | 0.003 |
| group checks | 2.643 |
| group: forced low-value roll | 0.052 |
| group: left behind a group obstacle | 0.081 |
| hist final 1 | 0.020 |
| hist final 10 | 0.004 |
| hist final 11 | 0.004 |
| hist final 12 | 0.003 |
| hist final 13 | 0.001 |
| hist final 14 | 0.001 |
| hist final 15 | 0.001 |
| hist final 16 | 0.001 |
| hist final 17 | 0.001 |
| hist final 18 | 0.001 |
| hist final 19 | 0.000 |
| hist final 2 | 0.080 |
| hist final 20 | 0.000 |
| hist final 21 | 0.000 |
| hist final 22 | 0.000 |
| hist final 23 | 0.000 |
| hist final 24 | 0.000 |
| hist final 25 | 0.000 |
| hist final 26 | 0.000 |
| hist final 28 | 0.000 |
| hist final 3 | 0.038 |
| hist final 32 | 0.000 |
| hist final 4 | 0.027 |
| hist final 5 | 0.018 |
| hist final 6 | 0.012 |
| hist final 7 | 0.009 |
| hist final 8 | 0.008 |
| hist final 9 | 0.004 |
| hist local rounds 0 | 0.088 |
| hist local rounds 1 | 0.102 |
| hist local rounds 10 | 0.006 |
| hist local rounds 11 | 0.004 |
| hist local rounds 12 | 0.004 |
| hist local rounds 13 | 0.003 |
| hist local rounds 14 | 0.001 |
| hist local rounds 15 | 0.001 |
| hist local rounds 16 | 0.001 |
| hist local rounds 17 | 0.001 |
| hist local rounds 18 | 0.001 |
| hist local rounds 19 | 0.000 |
| hist local rounds 2 | 0.049 |
| hist local rounds 20 | 0.000 |
| hist local rounds 21 | 0.000 |
| hist local rounds 22 | 0.000 |
| hist local rounds 23 | 0.000 |
| hist local rounds 24 | 0.000 |
| hist local rounds 27 | 0.000 |
| hist local rounds 3 | 0.112 |
| hist local rounds 31 | 0.000 |
| hist local rounds 4 | 0.055 |
| hist local rounds 5 | 0.040 |
| hist local rounds 6 | 0.025 |
| hist local rounds 7 | 0.020 |
| hist local rounds 8 | 0.015 |
| hist local rounds 9 | 0.010 |
| hist local susp 0 | 0.129 |
| hist local susp 1 | 0.099 |
| hist local susp 2 | 0.296 |
| hist local susp 3 | 0.001 |
| hist local susp 4 | 0.013 |
| hist local susp 5 | 0.000 |
| hist local susp 6 | 0.001 |
| hist shared susp 0 | 0.002 |
| hist shared susp 1 | 0.000 |
| hist shared susp 2 | 0.005 |
| hist shared susp 3 | 0.000 |
| hist shared susp 4 | 0.000 |
| Hyde takes over | 0.227 |
| local chase brought the hunt (D1) | 0.010 |
| local chase escaped | 0.261 |
| local chases | 0.539 |
| local chases (shared) | 0.007 |
| loot handed over | 1.383 |
| lost turns | 0.553 |
| lost turns: followed a Turn behind | 0.294 |
| opened: only the opener goes on | 1.116 |
| overdraws:final | 0.050 |
| overdraws:local | 0.018 |
| overdraws:raid | 0.021 |
| practised hand | 0.034 |
| R1: result before the Limit (exit) | 0.000 |
| R1: result before the Limit (lockup) | 0.001 |
| R1: result before the Limit (loot) | 0.009 |
| shared chase escaped | 0.004 |
| spectral: loot in hand with no action (D4) | 0.035 |
| spectral: passed with no action (D4) | 0.096 |
| susp:chase | 0.762 |
| susp:furniture | 0.455 |
| susp:roll | 4.176 |
| susp:slip | 0.077 |
| susp:tell | 2.336 |
| tells | 2.336 |
| the draught | 0.309 |
| weakness taken by overdraw | 0.050 |

## Rule gaps found while building the simulator

| # | Gap | Where | Parameter | Note |
|---|---|---|---|---|
| G1 | What a Critical does | CORE-RULES Rolling 3 | `critEffect` | RESOLVED by S8 (CORE-RULES 0.10): a Success on doubles; +2 Lead in a chase, otherwise one spent charge back. |
| G2 | What "the loud way" does | DESIGN Suspicion package | `loudRule` | RESOLVED by R1 (S11): +1 Suspicion whatever the result. |
| G3 | What "open an approach nobody else can take" does | CORE-RULES Abilities | `openApproach` | RESOLVED by S10 (CORE-RULES 0.12): roll the ability's trait at 2 lower Difficulty, watched as usual. |
| G4 | Overdraw and the Monster die once Suspicion is at the Limit | CORE-RULES Abilities; Suspicion | `overdrawAtLimit` | RESOLVED by S1 (CORE-RULES 0.3): once the hunt is on, Suspicion stops, the Mask is off, and overdraw puts your Weakness in play for the rest of the flight. |
| G5 | P7's raise cap: per die or per roll | CORE-RULES P7 | `raiseCap` | RESOLVED by R2 (S11): at most one raise per roll, from any source, Castle Duty included. |
| G6 | A captive's loot | DESIGN Captured | `captiveItems` | RESOLVED by R3 (S11): the town takes it back. |
| G7 | Several Entities caught by one roll | DESIGN Two kinds of chase | `multiCaught` | RESOLVED by R4 (S11): they flee together on one shared Lead (majority rule). |
| G8 | Does a chase take time? | CORE-RULES P4 | — | RESOLVED by R5 (S11): a local chase happens within the Turn it started. |
| G9 | "Drop an item" with nothing carried | CORE-RULES P3 | `costChoice` | RESOLVED by R10 (S11): the Storyteller picks it only if someone carries loot. |
| G16 | Is a dropped item lost? | CORE-RULES P3 | `dropRule` | RESOLVED by S3 (CORE-RULES 0.5): a dropped item falls where you are; picking it up costs that Entity its next action. |
| G10 | Below d4 | CORE-RULES Carrying, Chase, P3 | — | RESOLVED by R6 (S11): no die goes below a d4. |
| G11 | Suspicion past the Limit | DESIGN Suspicion | — | RESOLVED by R11 (S11): the track stops at the Limit. |
| G12 | Who may roll at a single obstacle each Turn | CORE-RULES P4 | — | RESOLVED by R7 (S11): allowed; each try risks Trouble. |
| G13 | Can two Entities take the same Castle Duty? | DESIGN Picks | — | RESOLVED by R8 (S11): no two Entities in a party share a Duty. |
| G14 | Where captives are held, and whether the rescue obstacle resets | DESIGN Captured | — | RESOLVED by R9 (S11): one lock-up per town, a new rescue obstacle for each capture. |
| G15 | Getting out of town costs nothing | CORE-RULES The raid | `exitRule` | RESOLVED by S4 (CORE-RULES 0.6): the way out is one watched obstacle, rolled by one Entity for the party. |
| G17 | A roll that succeeds and also fills the Limit | Chapters 4 and 6; outside review R1 | `limitOrder` | RESOLVED by R1 (2026-10-20): the result happens first, then its Suspicion: out at the way out, freed by a rescue (and into the final flight), the loot in hand. |
| G18 | Several tries at the way out in one Turn | Chapter 4; outside review R4 | `exitTries` | RESOLVED by R4 (2026-10-20): one try a Turn (the simulator's reading since the audit). |
| G19 | Spectral during a move, and the way in | Chapters 2 and 4; outside review R10, R13 | `spectralWhen` | RESOLVED by D4 (2026-10-19/20): the pass needs no roll and no action, so it works on the arrival Turn, and it never picks the way in. |
| G20 | Several overdraws on one roll; an overdraw where the Monster may show anyway | Chapter 3; outside review D3 | `overdrawStack` | RESOLVED by D3 (2026-10-19): outside the final flight every overdraw adds +2 on top of the roll's other rise. |
| G21 | No way to stop a local chase | Chapter 6; outside review D2 | `giveUp` | RESOLVED by D2 (2026-10-19): at the start of any round a runner may give up: captured, no roll. When the simulated runners do it is a policy. |

## What is modelled

- Rolling (Chapter 3): trait die + Mask d6 / Monster d10 against 6 · 8 · 10 · 12; Success, Cost, Trouble; a Critical (doubles on a Success) gives a charge back, or counts as two Successes in a chase.
- The Monster shows when it rolls higher than the trait die: Suspicion +2; one roll raises Suspicion once, by its biggest trigger (loud way, Trouble, the Monster, a Cost), and every overdraw adds +2 on top (D3); a roll's result happens before its Suspicion (R1).
- Abilities: the four standard effects and the Draught, one charge each, helping anyone at the same place (only an opened approach is your own roll's), one raise per roll (Castle Duty included), overdraw (+2 Suspicion on top, D3; once the hunt is on, once per flight, the Weakness); in the final flight any ability may be spent as a raise (D6b).
- The approved roster (module/config.mjs): the eight Entities' dice, signatures, all 24 Gifts and 24 Perks with their book effects, Weakness timings (Always / Soon); random picks; unique Castle Duties with their raise.
- Rolled towns from Chapter 8's tables (obstacle table, counts, Difficulties, watched, the ceiling on 12s, two ways in) and the three premade towns of Chapter 9 (sim/premade.mjs).
- Turns, dawn, group checks (Costs picked after the rolls, F23; one rise by the biggest trigger, every overdraw on top), beaten obstacles, the way out (one roll a Turn for the party, R4), Tells (once per watched location, 4–6), loot handed over, the lock-up (rescue, slipping free on a Success), everyone held ending the night Forked (D7b), left behind, results and the epilogue's ladder.
- Local chases (Lead 1 to 4 against 8 + half the Suspicion, set when the chase starts; one rise when it ends, by the biggest trigger among its rolls plus +2 for each overdraw, D1), giving up at the start of a round (D2; when, a policy), shared local chases and the final flight (the majority rule moving 1 or 2, B6), the chase table, Weaknesses, the Limit coming with a chase's rise, Already Dead.
- Spectral (D4): no roll and no action, so on the Turn the Ghost arrives too; the pass never picks the way in, which the others pick when they first roll there.
- Furniture: on the list's locations behind one extra obstacle 2 harder, Bulky / Huge carriers, no Mask, Nimble smaller, moves of two Turns, +1 Suspicion every Turn from taking it until it leaves town or is lost.
- The party splits into pairs by default (or singles, or stays together); players follow the documented policies in sim/params.mjs.

## Not modelled

- Maps and distances (any move is one Turn) and small entrances (a rolled town has none, B3; no premade town marks one).
- Setting a piece of furniture down or abandoning it (V4, V11): the simulated players carry it until they leave or lose it; dropping it in the final flight when about to be cornered is a policy.
- Choosing the order of rolls in a final-flight round (V12): the simulated party rolls in a fixed order, which the rules allow.
- Storyteller judgement beyond the parameters (what counts as a witness, improvised approaches, which Cost hurts most: the simulator picks one that costs something at random).
- Story-only content: the shopping table's items, Lantern Night customs, villagers, the epilogue lines, the campaign upgrades (sim/campaign-check.mjs measures them separately).

## Numbers used

```json
{
 "charges": 3,
 "townBudget": "cap",
 "obstacleTable": "approved",
 "overdrawSuspicion": 2,
 "lead": {
  "localStart": 1,
  "localEscape": 4,
  "finalStart": 2,
  "finalEscape": 6
 },
 "finalCloseIn": 0,
 "finalCloseCap": 12,
 "localMob": {
  "base": 8,
  "perSuspicion": 0.5,
  "max": 12
 },
 "finalMobPerExtraEntity": 0,
 "maxChaseRounds": 200,
 "furyCap": 3,
 "furyLambda": 0.25,
 "labels": {
  "easy": {
   "items": 4,
   "essentials": [
    1
   ],
   "limit": 9,
   "turns": 12,
   "finalMob": 10,
   "lockup": 10,
   "exit": 6,
   "finalEscape": 5,
   "difficulty": {
    "6": 0.15,
    "8": 0.5,
    "10": 0.3,
    "12": 0.05
   },
   "obstacles": {
    "1": 0.5,
    "2": 0.4,
    "3": 0.1
   },
   "witnessed": 0.4,
   "group": 0.25,
   "twoTraits": 0.6
  },
  "standard": {
   "items": 5,
   "essentials": [
    1,
    2
   ],
   "limit": 10,
   "turns": 12,
   "finalMob": 11,
   "lockup": 10,
   "exit": 8,
   "finalEscape": 5,
   "difficulty": {
    "6": 0.15,
    "8": 0.5,
    "10": 0.3,
    "12": 0.05
   },
   "obstacles": {
    "1": 0.3,
    "2": 0.45,
    "3": 0.25
   },
   "witnessed": 0.5,
   "group": 0.25,
   "twoTraits": 0.6
  },
  "hard": {
   "items": 5,
   "essentials": [
    2
   ],
   "limit": 13,
   "turns": 12,
   "finalMob": 11,
   "lockup": 10,
   "exit": 10,
   "difficulty": {
    "8": 0.4,
    "10": 0.45,
    "12": 0.15
   },
   "obstacles": {
    "1": 0.2,
    "2": 0.45,
    "3": 0.35
   },
   "witnessed": 0.6,
   "group": 0.25,
   "twoTraits": 0.6
  }
 }
}
```
