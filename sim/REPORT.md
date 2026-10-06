# Don't Get Forked — simulator report: P0 — The rules as decided (through B6, 2026-10-06) with the current numbers (core rules 1.23)

Command: `node sim/run.mjs`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**The Entities are the approved roster** (dice, signatures, Gifts, Perks and Weakness timings read from `module/config.mjs`); towns are rolled with the book's town tables (`sim/town.mjs`). Players follow the policies in `sim/params.mjs`, which are simpler than real play.

## Packages

- **P0**: The rules as decided (through B6, 2026-10-06) with the current numbers.
- **N1**: Retune tried for a party that stays together: final-flight Lead starts at 3; final mob 11 / 12 / 12; Limits 12 / 12 / 14.
- **N2**: Tried for a party that splits up: the night lasts 8 Turns; final mob 10 / 12 / 12 (on target overall, but Hard wins 42% with 3 Entities and 72% with 5).

| Package | Easy win | Standard win | Hard win | Forked E · S · H | Hard captures | Grand Year when tried | Trouble | Mask (raid rolls) | Spend ≥ ½ | Hard win, 3 · 4 · 5 Entities |
|---|---|---|---|---|---|---|---|---|---|---|
| **target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | 0.2–0.3 | ~50% (furniturePolicy always) | 10–22% | ≥ 25% | ≥ 50% | close together |
| P0 | 92.3% | 74.9% | 57.0% | 0.7% · 5.2% · 9.0% | 0.34 | 80.4% | 18.0% | 39.2% | 73.8% | 53% · 57% · 60% |
| N1 | 92.1% | 76.2% | 52.8% | 1.1% · 6.4% · 18.8% | 0.33 | 79.8% | 20.0% | 39.0% | 73.3% | 49% · 54% · 56% |
| N2 | 87.5% | 36.4% | 18.6% | 0.2% · 4.4% · 8.5% | 0.21 | — | 16.1% | 35.7% | 58.8% | 6% · 11% · 39% |

## P0 — The rules as decided (through B6, 2026-10-06) with the current numbers against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 92.3% | ✓ |
| Win, standard | 72%–78% | 74.9% | ✓ |
| Win, hard | 55%–60% | 57.0% | ✓ |
| Forked, easy | 0%–2% | 0.7% | ✓ |
| Forked, standard | 3%–7% | 5.2% | ✓ |
| Forked, hard | 8%–12% | 9.0% | ✓ |
| Captures per Hard raid | 0.2–0.3 | 0.34 | ✗ |
| Grand Year when the party goes for furniture (a party that always goes for it) | ~50% | 54.8% | ✓ |
| Going for furniture costs the Win (a party that always goes for it) | ~20% | 17.4% | ✓ |
| The same, the default players (only when safe) | — | 80.4% · 4.9% (tried in 17.8% of raids) |  |
| Trouble, share of rolls | 10%–22% | 18.0% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 5.3% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 73.8% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 35.6% (27.6%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 64.4% (72.4%) | ✓ |
| Largest option outlier | within ±2.5 pts | entity Jekyll & Hyde -3.4 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 91.6% | 25.4% | 3.6% | 3.5% | 1.2% | 0.08 | 0.04 | 14% | 0% | 6.4 | 8.3 |
| easy | 4 | 92.4% | 35.6% | 4.0% | 3.0% | 0.5% | 0.08 | 0.04 | 15% | 0% | 6.6 | 8.1 |
| easy | 5 | 92.9% | 38.0% | 4.1% | 2.6% | 0.4% | 0.09 | 0.04 | 15% | 0% | 6.6 | 7.1 |
| standard | 3 | 72.9% | 2.8% | 9.4% | 11.7% | 6.0% | 0.17 | 0.11 | 23% | 0% | 7.6 | 9.3 |
| standard | 4 | 76.4% | 5.2% | 9.2% | 9.2% | 5.2% | 0.17 | 0.10 | 25% | 0% | 7.6 | 9.0 |
| standard | 5 | 75.3% | 12.0% | 9.4% | 11.1% | 4.3% | 0.17 | 0.10 | 27% | 0% | 7.9 | 7.6 |
| hard | 3 | 53.1% | 1.2% | 15.2% | 21.6% | 10.2% | 0.35 | 0.23 | 30% | 8% | 12.0 | 9.4 |
| hard | 4 | 57.4% | 2.4% | 14.1% | 19.1% | 9.4% | 0.34 | 0.23 | 34% | 5% | 12.1 | 9.0 |
| hard | 5 | 60.5% | 6.3% | 14.6% | 17.4% | 7.5% | 0.34 | 0.23 | 36% | 3% | 12.3 | 8.0 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 16.4 | 68.3% | 13.7% | 18.0% | 5.3% | 35.1% | 27.6% | 72.4% | 32.5% | 73.0% |

**Critical candidates** (share of all rolls; S8 decided doubles on a Success, the other columns are the rejected margins):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.3% | 35.1% | 27.8% | 21.2% | 15.6% | 10.8% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 17.8% | 80.4% | 4.9% | 92.3% | 74.9% | 57.0% |
| always | 70.2% | 54.8% | 17.4% | 89.0% | 62.2% | 46.1% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 92% (+0.0) | 75% (+0.0) | 57% (+0.0) | 9.0% | 0.34 | 28% |
| generous | 90% (-2.5) | 69% (-5.8) | 49% (-8.3) | 15.7% | 0.46 | 24% |
| strict | 81% (-11.1) | 52% (-22.9) | 32% (-25.4) | 16.0% | 0.53 | 21% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 95% (+2.7) | 82% (+6.2) | 63% (+7.3) | 4.5% | 0.34 | 29% |
| critRule = "beat6" (rule) | 94% (+1.7) | 79% (+2.7) | 60% (+4.0) | 7.4% | 0.36 | 28% |
| critRule = "beat7" (rule) | 93% (+0.7) | 77% (+0.6) | 58% (+2.1) | 8.7% | 0.36 | 28% |
| critEffect = "none" (rule) | 91% (-1.1) | 73% (-2.7) | 54% (-2.0) | 11.4% | 0.37 | 27% |
| critEffect = "lead2" (rule) | 92% (-0.1) | 75% (-1.3) | 55% (-1.0) | 9.6% | 0.36 | 27% |
| critEffect = "charge" (rule) | 91% (-0.9) | 75% (-1.5) | 55% (-1.0) | 11.1% | 0.36 | 27% |
| costChoice = "suspicion" (rule) | 92% (-0.5) | 73% (-3.5) | 54% (-2.2) | 11.8% | 0.35 | 26% |
| costChoice = "lenient" (rule) | 93% (+1.0) | 76% (+0.1) | 58% (+2.4) | 10.2% | 0.37 | 28% |
| dropRule = "lost" (rule) | 89% (-2.6) | 71% (-5.3) | 52% (-4.5) | 9.1% | 0.36 | 27% |
| dropRule = "extrasOnly" (rule) | 92% (-0.1) | 75% (-1.5) | 56% (-0.4) | 9.1% | 0.36 | 27% |
| loudRule = "witness" (rule) | 92% (-0.3) | 76% (-0.1) | 58% (+2.1) | 8.5% | 0.36 | 27% |
| loudRule = "both" (rule) | 92% (-0.3) | 76% (-0.3) | 56% (-0.3) | 9.4% | 0.37 | 27% |
| loudRule = "none" (rule) | 93% (+1.1) | 78% (+2.3) | 59% (+3.4) | 8.1% | 0.35 | 28% |
| openApproach = "quiet" (rule) | 91% (-1.2) | 75% (-1.1) | 54% (-2.3) | 10.5% | 0.31 | 21% |
| openApproach = "switch" (rule) | 89% (-3.3) | 70% (-5.7) | 50% (-5.7) | 11.0% | 0.40 | 19% |
| overdrawAtLimit = "weakness" (rule) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| overdrawAtLimit = "free" (rule) | 92% (+0.1) | 77% (+0.8) | 57% (+1.4) | 4.1% | 0.36 | 28% |
| overdrawAtLimit = "forbidden" (rule) | 92% (+0.0) | 76% (+0.0) | 56% (-0.2) | 9.7% | 0.36 | 27% |
| overdrawAtLimit = "fury" (rule) | 90% (-1.8) | 73% (-3.0) | 53% (-3.5) | 25.1% | 0.36 | 27% |
| furnitureNoise = "moving" (rule) | 92% (+0.1) | 76% (+0.2) | 56% (+0.2) | 9.1% | 0.36 | 28% |
| finalMove = "majority" (rule) | 92% (+0.3) | 76% (+0.2) | 56% (+0.1) | 8.9% | 0.36 | 22% |
| finalMove = "net" (rule) | 92% (+0.0) | 76% (-0.1) | 56% (+0.0) | 8.8% | 0.36 | 29% |
| openEase = 1 (rule) | 90% (-1.7) | 72% (-4.4) | 51% (-4.6) | 10.0% | 0.38 | 21% |
| raiseCap = "perDie" (rule) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| raiseDie = "any" (rule) | 91% (-0.7) | 77% (+0.5) | 56% (+0.1) | 8.7% | 0.35 | 28% |
| openTrait = "any" (rule) | 92% (+0.0) | 76% (+0.4) | 55% (-0.6) | 9.7% | 0.35 | 29% |
| waysIn = "one" (rule) | 89% (-3.5) | 68% (-8.1) | 48% (-8.3) | 11.2% | 0.43 | 22% |
| overdrawStack = "stack" (rule) | 92% (-0.5) | 76% (-0.5) | 56% (-0.3) | 10.2% | 0.37 | 27% |
| lootHandover = "none" (rule) | 91% (-0.7) | 75% (-0.9) | 54% (-1.7) | 9.1% | 0.37 | 27% |
| chaseTable = "placeholder" (content) | 92% (-0.5) | 76% (+0.1) | 56% (-0.2) | 9.0% | 0.35 | 27% |
| chaseTable = "B" (content) | 93% (+0.9) | 78% (+2.0) | 59% (+3.4) | 5.1% | 0.34 | 28% |
| chaseTable = "C" (content) | 92% (+0.3) | 76% (+0.4) | 58% (+1.6) | 7.4% | 0.35 | 27% |
| partyPolicy = "together" (policy) | 92% (-0.5) | 57% (-18.8) | 39% (-17.0) | 10.5% | 0.34 | 23% |
| partyPolicy = "singles" (policy) | 90% (-2.2) | 76% (-0.5) | 55% (-1.5) | 10.1% | 0.36 | 28% |
| captiveItems = "kept" (rule) | 92% (+0.3) | 77% (+0.9) | 57% (+0.9) | 9.3% | 0.36 | 27% |
| multiCaught = "separate" (rule) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| monsterRule = "plus1" (rule) | 94% (+2.0) | 82% (+6.2) | 69% (+13.4) | 6.3% | 0.39 | 15% |
| monsterRule = "tie" (rule) | 94% (+1.6) | 81% (+4.7) | 67% (+11.1) | 6.3% | 0.39 | 18% |
| monsterRule = "d8" (rule) | 92% (-0.2) | 74% (-2.4) | 53% (-2.9) | 14.3% | 0.56 | 19% |
| monsterRule = "maskSafe" (rule) | 99% (+7.1) | 97% (+21.0) | 94% (+37.6) | 1.3% | 0.00 | 60% |
| chaseSusp = "no" (rule) | 97% (+4.9) | 86% (+9.6) | 68% (+11.6) | 4.7% | 0.47 | 30% |
| chaseSusp = "cap2" (rule) | 95% (+2.6) | 81% (+4.6) | 61% (+4.9) | 7.3% | 0.45 | 29% |
| chaseSusp = "cap3" (rule) | 94% (+1.5) | 79% (+3.3) | 59% (+3.2) | 8.1% | 0.44 | 29% |
| chaseSusp = "cap4" (rule) | 93% (+1.3) | 78% (+2.3) | 58% (+1.9) | 8.1% | 0.42 | 28% |
| slipRule = "cost" (rule) | 92% (+0.3) | 76% (+0.3) | 57% (+1.1) | 8.9% | 0.36 | 27% |
| furnitureRule = "slow" (rule) | 93% (+0.7) | 77% (+0.6) | 57% (+0.5) | 8.9% | 0.36 | 28% |
| furnitureRule = "base" (rule) | 93% (+0.7) | 77% (+0.6) | 57% (+0.5) | 8.9% | 0.36 | 28% |
| furnitureRule = "hardLoc" (rule) | 93% (+0.5) | 76% (+0.2) | 56% (+0.3) | 8.9% | 0.36 | 28% |
| furnitureRule = "noisy" (rule) | 92% (+0.2) | 76% (+0.3) | 56% (+0.1) | 9.3% | 0.36 | 28% |
| furnitureRule = "both" (rule) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| furnitureRule = "noisySlow" (rule) | 92% (+0.2) | 76% (+0.3) | 56% (+0.1) | 9.3% | 0.36 | 28% |
| furnitureRule = "slowHard" (rule) | 93% (+0.5) | 76% (+0.2) | 56% (+0.3) | 8.9% | 0.36 | 28% |
| furnitureRule = "slowWatched" (rule) | 92% (+0.1) | 77% (+0.6) | 57% (+0.5) | 8.9% | 0.36 | 28% |
| corneredAtLimit = "flight" (rule) | 93% (+0.7) | 78% (+1.6) | 58% (+1.7) | 9.3% | 0.30 | 27% |
| fetchRule = "flight" (rule) | 92% (-0.1) | 76% (-0.2) | 56% (-0.4) | 9.4% | 0.36 | 27% |
| fetchRule = "pickup" (rule) | 92% (-0.1) | 75% (-0.6) | 55% (-0.9) | 10.7% | 0.36 | 27% |
| fetchRule = "keeper" (rule) | 92% (-0.1) | 75% (-0.6) | 55% (-0.9) | 10.8% | 0.36 | 27% |
| fetchRule = "carry" (rule) | 92% (-0.1) | 76% (-0.5) | 55% (-0.9) | 10.7% | 0.36 | 27% |
| fetchRule = "grab" (rule) | 92% (-0.1) | 76% (-0.5) | 55% (-0.8) | 10.7% | 0.36 | 27% |
| fetchRule = "lockup" (rule) | 92% (-0.1) | 76% (-0.5) | 55% (-0.9) | 10.8% | 0.36 | 27% |
| fetchRule = "flightLockup" (rule) | 92% (-0.1) | 76% (-0.1) | 56% (-0.4) | 9.5% | 0.36 | 27% |
| alreadyDeadTurns = 2 (rule) | 92% (+0.0) | 76% (-0.1) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| furniturePlace = "separate" (rule) | 93% (+0.8) | 76% (+0.1) | 56% (+0.1) | 8.5% | 0.35 | 29% |
| exitRule = "free" (rule) | 89% (-2.9) | 65% (-10.7) | 44% (-12.2) | 13.3% | 0.52 | 27% |
| exitRule = "gate" (rule) | 89% (-2.9) | 65% (-10.7) | 44% (-12.2) | 13.3% | 0.52 | 27% |
| exitRule = "gateCarriers" (rule) | 92% (+0.3) | 78% (+1.7) | 61% (+4.5) | 6.5% | 0.31 | 27% |
| groupRule = "best3" (rule) | 92% (+0.4) | 76% (+0.1) | 56% (+0.3) | 9.5% | 0.37 | 27% |
| groupRule = "best4" (rule) | 92% (+0.4) | 76% (+0.1) | 56% (+0.3) | 9.5% | 0.37 | 27% |
| tellScope = "entity" (rule) | 92% (-0.3) | 73% (-3.3) | 54% (-1.7) | 9.8% | 0.36 | 28% |
| openedRule = "othersMayFollow" (rule) | 92% (+0.2) | 75% (-1.3) | 54% (-1.7) | 9.3% | 0.36 | 27% |
| exitTries = "each" (rule) | 92% (+0.0) | 76% (+0.0) | 56% (+0.1) | 9.2% | 0.36 | 27% |
| triesPerTurn = "one" (rule) | 92% (+0.1) | 76% (+0.2) | 57% (+0.6) | 9.5% | 0.36 | 27% |
| planTime = "perObstacle" (policy) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| planTime = "perTurn" (policy) | 92% (-0.2) | 75% (-0.9) | 54% (-1.6) | 10.9% | 0.37 | 27% |
| openPolicy = "greedy" (policy) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| openPolicy = "last" (policy) | 91% (-1.3) | 72% (-3.8) | 54% (-1.9) | 9.7% | 0.37 | 25% |
| groupPolicy = "all" (policy) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| groupPolicy = "best2" (policy) | 92% (+0.0) | 76% (-0.1) | 56% (-0.2) | 9.3% | 0.36 | 27% |
| monsterPolicy = "mask" (policy) | 90% (-1.8) | 72% (-4.1) | 42% (-14.2) | 6.0% | 0.82 | 88% |
| monsterPolicy = "monster" (policy) | 88% (-4.1) | 60% (-16.4) | 52% (-4.1) | 13.1% | 0.29 | 0% |
| caughtWeight = 0.4 (policy) | 90% (-1.9) | 75% (-1.3) | 56% (-0.5) | 9.1% | 0.40 | 29% |
| caughtWeight = 2 (policy) | 93% (+1.1) | 75% (-0.8) | 52% (-3.8) | 9.5% | 0.31 | 26% |
| chargePolicy = "hoard" (policy) | 85% (-6.6) | 61% (-15.2) | 42% (-14.4) | 9.6% | 0.40 | 31% |
| furniturePolicy = "never" (policy) | 94% (+1.5) | 77% (+0.5) | 57% (+0.6) | 8.7% | 0.35 | 29% |
| furniturePolicy = "always" (policy) | 90% (-2.3) | 63% (-13.1) | 46% (-10.2) | 15.0% | 0.37 | 22% |
| outOfSightRule = "place" (content) | 92% (-0.2) | 76% (-0.3) | 55% (-0.6) | 9.5% | 0.36 | 27% |
| outOfSightRule = "half" (content) | 92% (-0.1) | 76% (-0.5) | 57% (+0.5) | 9.1% | 0.36 | 27% |
| outOfSightRule = "handed" (content) | 92% (-0.1) | 76% (-0.3) | 56% (-0.3) | 9.3% | 0.36 | 27% |
| outOfSightRule = "handedSmart" (content) | 92% (+0.2) | 76% (-0.1) | 56% (+0.1) | 9.1% | 0.36 | 27% |
| roster = "placeholder" (content) | 92% (-0.1) | 76% (-0.4) | 55% (-0.9) | 9.5% | 0.39 | 32% |
| roster = "proposed" (content) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| dutyEdge = false (content) | 92% (-0.1) | 76% (-0.3) | 55% (-0.9) | 9.5% | 0.37 | 27% |
| tellPartyChance = 0.3333333333333333 (rule) | 93% (+0.5) | 78% (+1.9) | 59% (+3.1) | 8.3% | 0.36 | 27% |
| tellPartyChance = 0.6666666666666666 (rule) | 91% (-0.7) | 73% (-3.5) | 54% (-2.3) | 9.5% | 0.37 | 27% |
| tellChance = 0 (content) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| tellChance = 0.3333333333333333 (content) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| weaknessRule = "chance" (content) | 92% (+0.1) | 76% (-0.2) | 60% (+3.5) | 7.3% | 0.33 | 28% |
| weaknessRule = "always" (content) | 91% (-1.5) | 74% (-2.0) | 53% (-2.7) | 13.5% | 0.39 | 27% |
| weaknessRule = "soon" (content) | 92% (-0.1) | 76% (+0.1) | 57% (+0.7) | 8.3% | 0.34 | 27% |
| weaknessRule = "table" (content) | 92% (+0.0) | 77% (+0.7) | 58% (+1.8) | 7.4% | 0.34 | 28% |
| weaknessLocal = 0 (content) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| weaknessLocal = 0.5 (content) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| weaknessFinal = 0.25 (content) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |
| weaknessFinal = 1 (content) | 92% (+0.0) | 76% (+0.0) | 56% (+0.0) | 9.3% | 0.36 | 27% |

## Option outliers (win Δ, parties with vs without, same label and size)

entity Dracula +3.1 · entity A Ghost +2.7 · gift Frankenstein’s Creature:Mountain Stride +2.7 · perk Jekyll & Hyde:bruteStrength +2.5 · perk The Invisible Man:outOfSight +2.5 · gift The Werewolf:Through the Hedge +2.3 · perk Frankenstein’s Creature:strongBack +1.8 · gift The Invisible Man:Through the Gap +1.7 · perk A Ghost:alreadyDead +1.7 · gift Jekyll & Hyde:Trample +1.6 · perk A Ghost:spectral +1.5 · entity The Invisible Man +1.5 · gift The Mummy:Royal Bearing +1.4 · gift A Witch:Black Cat +1.4 · gift A Ghost:Fade +1.2 · gift Dracula:Bat +1.2 · perk The Werewolf:shortcut +1.0 · duty gardener +0.9 · perk A Witch:familiarsWarning +0.8 · duty cook +0.7 · perk Frankenstein’s Creature:builtToLast +0.6 · perk The Werewolf:nightRunner +0.6 · gift Dracula:Wolf +0.6 · perk The Mummy:fearTheCurse +0.6 · gift Frankenstein’s Creature:Hovel Watcher +0.5 · gift A Witch:A Potion for That +0.5 · gift A Ghost:Whisper +0.5 · duty librarian +0.5 · perk Dracula:hypnoticEyes +0.4 · perk Dracula:oldMoney +0.2 · gift Jekyll & Hyde:Pillar of Society +0.1 · perk The Mummy:keeperOfTreasures -0.2 · gift The Werewolf:Howl -0.2 · perk A Witch:flyByNight -0.2 · duty handyman -0.3 · entity The Werewolf -0.4 · perk The Mummy:patienceOfAges -0.4 · gift The Mummy:Just a Costume -0.5 · gift The Invisible Man:Poltergeist -0.5 · perk A Witch:wiseWoman -0.5 · perk The Invisible Man:hiddenPockets -0.6 · perk Dracula:wallCrawler -0.6 · duty butler -0.6 · entity Frankenstein’s Creature -0.8 · gift The Mummy:Old Curse -1.0 · duty tailor -1.1 · perk Jekyll & Hyde:practisedHand -1.2 · gift The Invisible Man:Work It Out -1.3 · entity The Mummy -1.3 · perk Jekyll & Hyde:steadyNerves -1.3 · entity A Witch -1.4 · perk The Werewolf:fetch -1.6 · gift Jekyll & Hyde:Doctor’s Bag -1.6 · gift A Ghost:Chill -1.7 · gift Dracula:Mist -1.8 · gift A Witch:Broomstick -1.8 · perk The Invisible Man:lightStep -1.9 · gift The Werewolf:Keen Nose -2.1 · perk Frankenstein’s Creature:tireless -2.5 · gift Frankenstein’s Creature:Book-Learned -3.1 · perk A Ghost:rattle -3.2 · entity Jekyll & Hyde -3.4

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 12579 | 0.699 |
| a die stepped below d4 (floored at d4) | 3807 | 0.211 |
| suspicion past the Limit (lost) | 1 | 0.000 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:form | 0.303 |
| ability:hidden | 3.283 |
| ability:open | 3.272 |
| ability:raise | 1.155 |
| ability:switch | 1.532 |
| already dead: drifted off | 0.012 |
| captive rescued | 0.022 |
| captive slipped free | 0.051 |
| captures | 0.199 |
| charges regained by a Critical | 0.539 |
| charges spent | 9.303 |
| cost:drop | 0.094 |
| cost:stepdown | 0.459 |
| cost:suspicion | 0.297 |
| cost:turn | 0.412 |
| declined rolls | 0.358 |
| final flight escaped | 0.209 |
| final flight rounds | 1.053 |
| final flight with nobody free | 0.000 |
| final flight: dawn | 0.017 |
| final flight: limit | 0.242 |
| forked | 0.050 |
| furniture dropped: carrier captured | 0.000 |
| furniture dropped: final flight | 0.004 |
| group checks | 2.500 |
| group: forced low-value roll | 0.030 |
| group: left behind a group obstacle | 0.079 |
| hist final 1 | 0.024 |
| hist final 10 | 0.004 |
| hist final 11 | 0.003 |
| hist final 12 | 0.002 |
| hist final 13 | 0.002 |
| hist final 14 | 0.001 |
| hist final 15 | 0.002 |
| hist final 16 | 0.001 |
| hist final 17 | 0.001 |
| hist final 18 | 0.001 |
| hist final 19 | 0.000 |
| hist final 2 | 0.089 |
| hist final 20 | 0.000 |
| hist final 21 | 0.000 |
| hist final 22 | 0.000 |
| hist final 23 | 0.000 |
| hist final 24 | 0.000 |
| hist final 25 | 0.000 |
| hist final 27 | 0.000 |
| hist final 28 | 0.000 |
| hist final 3 | 0.044 |
| hist final 33 | 0.000 |
| hist final 35 | 0.000 |
| hist final 36 | 0.000 |
| hist final 4 | 0.027 |
| hist final 5 | 0.019 |
| hist final 6 | 0.014 |
| hist final 7 | 0.010 |
| hist final 8 | 0.008 |
| hist final 9 | 0.005 |
| hist local rounds 1 | 0.132 |
| hist local rounds 10 | 0.002 |
| hist local rounds 11 | 0.001 |
| hist local rounds 12 | 0.001 |
| hist local rounds 13 | 0.000 |
| hist local rounds 14 | 0.000 |
| hist local rounds 17 | 0.000 |
| hist local rounds 2 | 0.067 |
| hist local rounds 3 | 0.119 |
| hist local rounds 4 | 0.059 |
| hist local rounds 5 | 0.041 |
| hist local rounds 6 | 0.026 |
| hist local rounds 7 | 0.016 |
| hist local rounds 8 | 0.011 |
| hist local rounds 9 | 0.005 |
| hist local susp 0 | 0.040 |
| hist local susp 1 | 0.106 |
| hist local susp 10 | 0.005 |
| hist local susp 11 | 0.002 |
| hist local susp 12 | 0.002 |
| hist local susp 13 | 0.001 |
| hist local susp 14 | 0.000 |
| hist local susp 2 | 0.119 |
| hist local susp 3 | 0.033 |
| hist local susp 4 | 0.064 |
| hist local susp 5 | 0.028 |
| hist local susp 6 | 0.032 |
| hist local susp 7 | 0.021 |
| hist local susp 8 | 0.018 |
| hist local susp 9 | 0.009 |
| Hyde takes over | 0.262 |
| local chase ended by the Limit | 0.155 |
| local chase escaped | 0.165 |
| local chases | 0.481 |
| local chases (shared) | 0.006 |
| loot handed over | 1.304 |
| lost turns | 0.503 |
| lost turns: followed a Turn behind | 0.268 |
| opened: only the opener goes on | 1.261 |
| overdraws:final | 0.048 |
| overdraws:local | 0.132 |
| overdraws:raid | 0.063 |
| practised hand | 0.049 |
| susp:chase | 1.539 |
| susp:furniture | 0.482 |
| susp:roll | 4.433 |
| susp:slip | 0.072 |
| susp:tell | 2.261 |
| tells | 2.261 |
| the draught | 0.352 |
| weakness taken by overdraw | 0.048 |

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

## What is modelled

- Rolling (Chapter 3): trait die + Mask d6 / Monster d10 against 6 · 8 · 10 · 12; Success, Cost, Trouble; a Critical (doubles on a Success) gives a charge back, or counts as two Successes in a chase.
- The Monster shows when it rolls higher than the trait die: Suspicion +2; one roll raises Suspicion once, by its biggest trigger (loud way, Trouble, the Monster, a Cost, overdraw).
- Abilities: the four standard effects and the Draught, one charge each, helping anyone at the same place (only an opened approach is your own roll's), one raise per roll (Castle Duty included), overdraw (+2 Suspicion; once the hunt is on, once per flight, the Weakness).
- The approved roster (module/config.mjs): the eight Entities' dice, signatures, all 24 Gifts and 24 Perks with their book effects, Weakness timings (Always / Soon); random picks; unique Castle Duties with their raise.
- Rolled towns from Chapter 8's tables (obstacle table, counts, Difficulties, watched, the ceiling on 12s, two ways in) and the three premade towns of Chapter 9 (sim/premade.mjs).
- Turns, dawn, group checks (Costs picked after the rolls, F23), beaten obstacles, the way out (one roll a Turn for the party), Tells (once per watched location, 4–6), loot handed over, the lock-up (rescue, slipping free on a Success), left behind, results and the epilogue's ladder.
- Local chases (Lead 1 to 4 against 8 + half the Suspicion), shared local chases and the final flight (the majority rule moving 1 or 2, B6), the chase table, Weaknesses, the Limit coming during a chase, Already Dead.
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
   "limit": 11,
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
   "limit": 11,
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
   "limit": 15,
   "turns": 12,
   "finalMob": 11,
   "lockup": 12,
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
