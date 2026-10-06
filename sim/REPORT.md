# Don't Get Forked — simulator report: P0 — The rules as decided (through V20, 2026-10-06) with the current numbers (core rules 1.26)

Command: `node sim/run.mjs`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**The Entities are the approved roster** (dice, signatures, Gifts, Perks and Weakness timings read from `module/config.mjs`); towns are rolled with the book's town tables (`sim/town.mjs`). Players follow the policies in `sim/params.mjs`, which are simpler than real play.

## Packages

- **P0**: The rules as decided (through V20, 2026-10-06) with the current numbers.
- **N1**: Retune tried for a party that stays together: final-flight Lead starts at 3; final mob 11 / 12 / 12; Limits 12 / 12 / 14.
- **N2**: Tried for a party that splits up: the night lasts 8 Turns; final mob 10 / 12 / 12 (on target overall, but Hard wins 42% with 3 Entities and 72% with 5).

| Package | Easy win | Standard win | Hard win | Forked E · S · H | Hard captures | Grand Year when tried | Trouble | Mask (raid rolls) | Spend ≥ ½ | Hard win, 3 · 4 · 5 Entities |
|---|---|---|---|---|---|---|---|---|---|---|
| **target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | 0.2–0.3 | ~50% (furniturePolicy always) | 10–22% | ≥ 25% | ≥ 50% | close together |
| P0 | 91.7% | 73.0% | 56.2% | 0.8% · 5.4% · 9.5% | 0.36 | 79.8% | 18.6% | 37.6% | 73.7% | 52% · 57% · 60% |
| N1 | 91.5% | 75.2% | 52.0% | 1.2% · 6.7% · 19.4% | 0.34 | 79.4% | 20.4% | 37.4% | 73.1% | 48% · 51% · 56% |
| N2 | 87.1% | 36.1% | 18.7% | 0.3% · 4.7% · 9.2% | 0.23 | — | 16.7% | 33.7% | 58.4% | 6% · 11% · 40% |

## P0 — The rules as decided (through V20, 2026-10-06) with the current numbers against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 91.7% | ✓ |
| Win, standard | 72%–78% | 73.0% | ✓ |
| Win, hard | 55%–60% | 56.2% | ✓ |
| Forked, easy | 0%–2% | 0.8% | ✓ |
| Forked, standard | 3%–7% | 5.4% | ✓ |
| Forked, hard | 8%–12% | 9.5% | ✓ |
| Captures per Hard raid | 0.2–0.3 | 0.36 | ✗ |
| Grand Year when the party goes for furniture (a party that always goes for it) | ~50% | 53.8% | ✓ |
| Going for furniture costs the Win (a party that always goes for it) | ~20% | 17.7% | ✓ |
| The same, the default players (only when safe) | — | 79.8% · 4.9% (tried in 17.8% of raids) |  |
| Trouble, share of rolls | 10%–22% | 18.6% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 5.3% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 73.7% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 34.2% (26.0%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 65.8% (74.0%) | ✓ |
| Largest option outlier | within ±2.5 pts | gift Frankenstein’s Creature:Book-Learned -3.3 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 91.1% | 24.6% | 3.7% | 3.9% | 1.3% | 0.08 | 0.04 | 16% | 0% | 6.5 | 8.2 |
| easy | 4 | 91.7% | 36.5% | 4.3% | 3.3% | 0.8% | 0.10 | 0.05 | 17% | 0% | 6.8 | 8.0 |
| easy | 5 | 92.2% | 38.1% | 4.3% | 3.3% | 0.3% | 0.09 | 0.04 | 15% | 0% | 6.7 | 7.1 |
| standard | 3 | 71.4% | 2.5% | 10.3% | 12.1% | 6.2% | 0.18 | 0.12 | 24% | 0% | 7.7 | 9.2 |
| standard | 4 | 74.3% | 5.1% | 10.1% | 10.1% | 5.5% | 0.18 | 0.11 | 27% | 0% | 7.8 | 8.9 |
| standard | 5 | 73.5% | 11.9% | 10.5% | 11.6% | 4.4% | 0.18 | 0.11 | 28% | 0% | 8.0 | 7.6 |
| hard | 3 | 51.5% | 0.9% | 16.7% | 20.6% | 11.2% | 0.36 | 0.19 | 33% | 7% | 12.2 | 9.3 |
| hard | 4 | 56.8% | 2.5% | 15.6% | 17.8% | 9.8% | 0.35 | 0.17 | 35% | 6% | 12.3 | 8.9 |
| hard | 5 | 60.3% | 5.9% | 15.4% | 16.9% | 7.5% | 0.35 | 0.19 | 39% | 2% | 12.5 | 7.8 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 16.8 | 67.5% | 13.9% | 18.6% | 5.3% | 34.2% | 26.0% | 74.0% | 32.8% | 73.0% |

**Critical candidates** (share of all rolls; S8 decided doubles on a Success, the other columns are the rejected margins):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.3% | 34.2% | 27.0% | 20.5% | 14.9% | 10.3% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 17.8% | 79.8% | 4.9% | 91.7% | 73.0% | 56.2% |
| always | 70.7% | 53.8% | 17.7% | 87.9% | 60.2% | 45.2% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 92% (+0.0) | 73% (+0.0) | 56% (+0.0) | 9.5% | 0.36 | 26% |
| generous | 90% (-1.9) | 68% (-5.2) | 49% (-7.7) | 16.2% | 0.49 | 24% |
| strict | 81% (-10.7) | 50% (-22.7) | 32% (-24.1) | 16.5% | 0.53 | 21% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 94% (+2.8) | 80% (+6.3) | 62% (+6.5) | 4.1% | 0.35 | 27% |
| critRule = "beat6" (rule) | 93% (+1.7) | 77% (+3.0) | 59% (+3.5) | 7.1% | 0.37 | 27% |
| critRule = "beat7" (rule) | 92% (+0.9) | 75% (+1.4) | 58% (+2.5) | 8.7% | 0.37 | 26% |
| critEffect = "none" (rule) | 91% (-0.9) | 71% (-2.3) | 55% (-1.2) | 11.4% | 0.38 | 25% |
| critEffect = "lead2" (rule) | 92% (+0.1) | 73% (-0.9) | 55% (-0.8) | 9.4% | 0.37 | 26% |
| critEffect = "charge" (rule) | 91% (-0.9) | 72% (-1.4) | 55% (-0.4) | 10.5% | 0.37 | 25% |
| costChoice = "suspicion" (rule) | 91% (-0.8) | 71% (-2.9) | 54% (-2.3) | 11.6% | 0.36 | 25% |
| costChoice = "lenient" (rule) | 92% (+0.6) | 75% (+1.1) | 57% (+1.5) | 11.0% | 0.40 | 27% |
| dropRule = "lost" (rule) | 89% (-2.7) | 69% (-5.1) | 51% (-5.2) | 8.4% | 0.37 | 26% |
| dropRule = "extrasOnly" (rule) | 91% (-0.1) | 73% (-0.9) | 56% (-0.1) | 8.5% | 0.37 | 26% |
| loudRule = "witness" (rule) | 91% (-0.1) | 75% (+0.9) | 58% (+1.9) | 8.8% | 0.37 | 26% |
| loudRule = "both" (rule) | 91% (+0.0) | 74% (+0.8) | 56% (-0.2) | 8.9% | 0.38 | 26% |
| loudRule = "none" (rule) | 92% (+0.7) | 77% (+3.6) | 60% (+3.9) | 8.4% | 0.36 | 27% |
| openApproach = "quiet" (rule) | 90% (-1.0) | 74% (+0.5) | 55% (-1.2) | 11.1% | 0.32 | 21% |
| openApproach = "switch" (rule) | 88% (-3.2) | 69% (-4.9) | 52% (-4.3) | 10.9% | 0.41 | 19% |
| overdrawAtLimit = "weakness" (rule) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| overdrawAtLimit = "free" (rule) | 92% (+0.1) | 74% (+0.8) | 57% (+1.3) | 3.9% | 0.37 | 27% |
| overdrawAtLimit = "forbidden" (rule) | 91% (+0.0) | 73% (-0.2) | 56% (-0.1) | 8.9% | 0.37 | 26% |
| overdrawAtLimit = "fury" (rule) | 90% (-1.9) | 70% (-3.5) | 52% (-3.7) | 25.9% | 0.37 | 26% |
| furnitureNoise = "moving" (rule) | 92% (+0.3) | 74% (+0.3) | 56% (+0.1) | 8.5% | 0.37 | 26% |
| spectralRule = "any" (rule) | 91% (+0.0) | 75% (+1.2) | 57% (+0.8) | 8.5% | 0.36 | 26% |
| mesmeriseRule = "any" (rule) | 92% (+0.2) | 75% (+1.0) | 57% (+1.1) | 8.6% | 0.37 | 27% |
| finalMove = "majority" (rule) | 92% (+0.3) | 74% (-0.1) | 56% (+0.1) | 8.7% | 0.37 | 21% |
| finalMove = "net" (rule) | 92% (+0.1) | 74% (-0.1) | 56% (+0.1) | 8.5% | 0.37 | 27% |
| openEase = 1 (rule) | 89% (-2.0) | 70% (-3.9) | 51% (-4.9) | 10.3% | 0.40 | 20% |
| raiseCap = "perDie" (rule) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| raiseDie = "any" (rule) | 91% (-0.3) | 74% (+0.8) | 56% (-0.1) | 8.2% | 0.37 | 27% |
| openTrait = "any" (rule) | 92% (+0.3) | 75% (+1.5) | 57% (+1.2) | 10.1% | 0.37 | 28% |
| waysIn = "one" (rule) | 89% (-2.9) | 66% (-7.3) | 50% (-6.3) | 11.3% | 0.44 | 21% |
| overdrawStack = "stack" (rule) | 91% (-0.2) | 73% (-0.4) | 56% (+0.1) | 9.2% | 0.38 | 26% |
| lootHandover = "none" (rule) | 91% (-0.3) | 73% (-0.8) | 54% (-2.0) | 8.9% | 0.37 | 26% |
| chaseTable = "placeholder" (content) | 91% (-0.3) | 73% (-0.2) | 56% (+0.2) | 9.1% | 0.36 | 26% |
| chaseTable = "B" (content) | 93% (+1.3) | 75% (+1.7) | 59% (+2.8) | 5.3% | 0.35 | 27% |
| chaseTable = "C" (content) | 91% (+0.0) | 74% (+0.5) | 58% (+1.9) | 7.5% | 0.36 | 26% |
| partyPolicy = "together" (policy) | 92% (+0.1) | 55% (-18.8) | 39% (-17.1) | 9.9% | 0.36 | 23% |
| partyPolicy = "singles" (policy) | 89% (-2.5) | 75% (+1.3) | 55% (-1.0) | 10.1% | 0.37 | 27% |
| captiveItems = "kept" (rule) | 92% (+0.2) | 75% (+1.0) | 58% (+2.0) | 8.7% | 0.37 | 26% |
| multiCaught = "separate" (rule) | 91% (+0.0) | 74% (-0.1) | 56% (+0.1) | 8.6% | 0.37 | 26% |
| monsterRule = "plus1" (rule) | 94% (+2.5) | 80% (+6.6) | 69% (+13.3) | 6.3% | 0.40 | 14% |
| monsterRule = "tie" (rule) | 93% (+1.3) | 79% (+4.9) | 68% (+12.1) | 6.1% | 0.40 | 16% |
| monsterRule = "d8" (rule) | 91% (-0.9) | 74% (+0.1) | 55% (-0.3) | 14.7% | 0.60 | 17% |
| monsterRule = "maskSafe" (rule) | 99% (+7.8) | 96% (+22.8) | 93% (+37.1) | 1.3% | 0.00 | 58% |
| chaseSusp = "no" (rule) | 97% (+5.4) | 84% (+9.9) | 68% (+12.5) | 4.9% | 0.48 | 29% |
| chaseSusp = "cap2" (rule) | 95% (+3.2) | 78% (+4.3) | 62% (+6.2) | 7.3% | 0.46 | 28% |
| chaseSusp = "cap3" (rule) | 93% (+2.0) | 77% (+3.2) | 60% (+4.5) | 8.7% | 0.44 | 27% |
| chaseSusp = "cap4" (rule) | 93% (+1.7) | 76% (+2.6) | 59% (+2.9) | 8.3% | 0.42 | 27% |
| slipRule = "cost" (rule) | 92% (+0.1) | 74% (+0.3) | 57% (+1.1) | 8.3% | 0.37 | 26% |
| furnitureRule = "slow" (rule) | 92% (+1.0) | 74% (+0.7) | 56% (+0.2) | 8.5% | 0.37 | 27% |
| furnitureRule = "base" (rule) | 92% (+1.0) | 74% (+0.7) | 56% (+0.2) | 8.5% | 0.37 | 27% |
| furnitureRule = "hardLoc" (rule) | 92% (+0.7) | 74% (+0.4) | 56% (+0.2) | 8.4% | 0.37 | 26% |
| furnitureRule = "noisy" (rule) | 92% (+0.3) | 74% (+0.0) | 56% (+0.1) | 8.6% | 0.37 | 26% |
| furnitureRule = "both" (rule) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| furnitureRule = "noisySlow" (rule) | 92% (+0.3) | 74% (+0.0) | 56% (+0.1) | 8.6% | 0.37 | 26% |
| furnitureRule = "slowHard" (rule) | 92% (+0.7) | 74% (+0.4) | 56% (+0.2) | 8.4% | 0.37 | 26% |
| furnitureRule = "slowWatched" (rule) | 92% (+0.2) | 74% (+0.7) | 56% (+0.3) | 8.4% | 0.37 | 27% |
| corneredAtLimit = "flight" (rule) | 93% (+1.1) | 75% (+1.8) | 58% (+2.3) | 8.7% | 0.30 | 26% |
| fetchRule = "flight" (rule) | 91% (-0.1) | 74% (-0.1) | 55% (-0.3) | 8.8% | 0.37 | 26% |
| fetchRule = "pickup" (rule) | 91% (-0.1) | 73% (-0.3) | 55% (-0.7) | 10.0% | 0.37 | 25% |
| fetchRule = "keeper" (rule) | 91% (-0.1) | 73% (-0.2) | 55% (-0.7) | 10.0% | 0.37 | 25% |
| fetchRule = "carry" (rule) | 91% (-0.1) | 73% (-0.3) | 55% (-0.7) | 10.0% | 0.37 | 25% |
| fetchRule = "grab" (rule) | 91% (-0.1) | 73% (-0.3) | 55% (-0.7) | 10.1% | 0.37 | 25% |
| fetchRule = "lockup" (rule) | 91% (-0.1) | 73% (-0.3) | 55% (-0.7) | 10.1% | 0.37 | 25% |
| fetchRule = "flightLockup" (rule) | 91% (-0.1) | 74% (-0.1) | 55% (-0.3) | 8.9% | 0.37 | 26% |
| alreadyDeadTurns = 2 (rule) | 91% (+0.0) | 74% (-0.1) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| furniturePlace = "separate" (rule) | 93% (+1.2) | 74% (+0.4) | 57% (+1.7) | 8.9% | 0.36 | 27% |
| exitRule = "free" (rule) | 88% (-3.3) | 63% (-10.3) | 43% (-12.9) | 13.8% | 0.52 | 26% |
| exitRule = "gate" (rule) | 88% (-3.3) | 63% (-10.3) | 43% (-12.9) | 13.8% | 0.52 | 26% |
| exitRule = "gateCarriers" (rule) | 92% (+0.2) | 76% (+2.1) | 60% (+4.1) | 6.3% | 0.33 | 26% |
| groupRule = "best3" (rule) | 92% (+0.5) | 75% (+1.1) | 56% (+0.5) | 8.4% | 0.38 | 26% |
| groupRule = "best4" (rule) | 92% (+0.5) | 75% (+1.1) | 56% (+0.5) | 8.4% | 0.38 | 26% |
| tellScope = "entity" (rule) | 91% (-0.8) | 71% (-2.8) | 54% (-1.7) | 9.1% | 0.38 | 26% |
| openedRule = "othersMayFollow" (rule) | 92% (+0.3) | 73% (-0.5) | 54% (-1.9) | 8.7% | 0.38 | 26% |
| exitTries = "each" (rule) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| triesPerTurn = "one" (rule) | 92% (+0.5) | 75% (+1.2) | 57% (+1.3) | 8.9% | 0.36 | 26% |
| planTime = "perObstacle" (policy) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| planTime = "perTurn" (policy) | 91% (-0.3) | 73% (-0.9) | 54% (-1.8) | 10.1% | 0.38 | 25% |
| openPolicy = "greedy" (policy) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| openPolicy = "last" (policy) | 90% (-1.3) | 71% (-2.8) | 54% (-2.0) | 9.8% | 0.38 | 24% |
| groupPolicy = "all" (policy) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| groupPolicy = "best2" (policy) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.5% | 0.37 | 26% |
| monsterPolicy = "mask" (policy) | 89% (-2.7) | 69% (-4.2) | 42% (-13.7) | 6.1% | 0.91 | 88% |
| monsterPolicy = "monster" (policy) | 87% (-4.0) | 58% (-15.4) | 51% (-4.9) | 12.0% | 0.31 | 0% |
| caughtWeight = 0.4 (policy) | 90% (-1.3) | 73% (-0.9) | 56% (+0.5) | 9.0% | 0.41 | 28% |
| caughtWeight = 2 (policy) | 92% (+0.7) | 73% (-0.4) | 51% (-4.9) | 9.2% | 0.32 | 24% |
| chargePolicy = "hoard" (policy) | 85% (-6.8) | 59% (-14.3) | 41% (-14.5) | 10.5% | 0.42 | 31% |
| furniturePolicy = "never" (policy) | 93% (+1.5) | 74% (+0.5) | 56% (+0.6) | 8.1% | 0.36 | 27% |
| furniturePolicy = "always" (policy) | 88% (-3.1) | 60% (-13.2) | 45% (-10.4) | 14.0% | 0.37 | 21% |
| outOfSightRule = "carry" (content) | 92% (+0.2) | 74% (+0.5) | 56% (+0.3) | 8.5% | 0.36 | 26% |
| outOfSightRule = "half" (content) | 92% (+0.1) | 74% (-0.1) | 56% (+0.7) | 8.5% | 0.37 | 26% |
| outOfSightRule = "handed" (content) | 92% (+0.1) | 74% (+0.1) | 56% (+0.1) | 8.5% | 0.37 | 26% |
| outOfSightRule = "handedSmart" (content) | 92% (+0.3) | 74% (+0.2) | 56% (+0.3) | 8.3% | 0.36 | 26% |
| roster = "placeholder" (content) | 92% (+0.5) | 76% (+2.0) | 57% (+1.1) | 8.7% | 0.39 | 32% |
| roster = "proposed" (content) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| dutyEdge = false (content) | 91% (-0.1) | 72% (-1.3) | 55% (-0.9) | 9.3% | 0.37 | 26% |
| tellPartyChance = 0.3333333333333333 (rule) | 92% (+0.9) | 76% (+2.2) | 58% (+2.2) | 8.6% | 0.38 | 26% |
| tellPartyChance = 0.6666666666666666 (rule) | 91% (-0.7) | 70% (-3.5) | 54% (-1.5) | 9.5% | 0.37 | 26% |
| tellChance = 0 (content) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| tellChance = 0.3333333333333333 (content) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| weaknessRule = "chance" (content) | 92% (+0.5) | 74% (+0.0) | 60% (+3.8) | 8.2% | 0.34 | 27% |
| weaknessRule = "always" (content) | 90% (-1.6) | 72% (-2.1) | 54% (-2.1) | 13.2% | 0.40 | 25% |
| weaknessRule = "soon" (content) | 91% (-0.1) | 74% (+0.1) | 57% (+0.7) | 8.2% | 0.35 | 26% |
| weaknessRule = "table" (content) | 92% (+0.2) | 74% (+0.3) | 57% (+1.6) | 7.3% | 0.35 | 26% |
| weaknessLocal = 0 (content) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| weaknessLocal = 0.5 (content) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| weaknessFinal = 0.25 (content) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |
| weaknessFinal = 1 (content) | 91% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.6% | 0.37 | 26% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift Frankenstein’s Creature:Mountain Stride +2.7 · gift The Werewolf:Through the Hedge +2.7 · entity A Ghost +2.6 · perk A Ghost:alreadyDead +2.2 · entity Dracula +1.8 · perk Jekyll & Hyde:bruteStrength +1.7 · gift Jekyll & Hyde:Trample +1.7 · gift The Invisible Man:Through the Gap +1.5 · perk Frankenstein’s Creature:strongBack +1.3 · perk Frankenstein’s Creature:builtToLast +1.2 · perk A Witch:flyByNight +1.1 · perk The Invisible Man:outOfSight +1.1 · entity The Invisible Man +1.0 · perk The Werewolf:shortcut +1.0 · gift Jekyll & Hyde:Pillar of Society +1.0 · gift The Mummy:Royal Bearing +0.8 · perk Dracula:wallCrawler +0.8 · gift A Ghost:Fade +0.8 · gift A Witch:A Potion for That +0.7 · gift Dracula:Bat +0.7 · gift A Witch:Black Cat +0.7 · gift A Ghost:Whisper +0.7 · duty cook +0.6 · gift Frankenstein’s Creature:Hovel Watcher +0.5 · duty handyman +0.5 · gift The Invisible Man:Poltergeist +0.4 · perk The Invisible Man:hiddenPockets +0.3 · perk The Mummy:patienceOfAges +0.3 · entity The Werewolf +0.3 · perk The Mummy:fearTheCurse +0.2 · perk Dracula:hypnoticEyes +0.2 · perk Jekyll & Hyde:practisedHand +0.2 · gift The Werewolf:Howl +0.1 · perk A Witch:familiarsWarning +0.1 · duty gardener +0.1 · gift Dracula:Wolf -0.1 · duty librarian -0.1 · duty butler -0.2 · gift The Mummy:Old Curse -0.4 · gift The Mummy:Just a Costume -0.4 · perk The Werewolf:fetch -0.5 · perk The Mummy:keeperOfTreasures -0.6 · perk The Werewolf:nightRunner -0.6 · gift Dracula:Mist -0.6 · perk A Ghost:spectral -0.8 · duty tailor -0.8 · perk Dracula:oldMoney -1.0 · entity The Mummy -1.0 · entity Frankenstein’s Creature -1.0 · perk A Witch:wiseWoman -1.1 · perk A Ghost:rattle -1.3 · perk The Invisible Man:lightStep -1.4 · gift A Witch:Broomstick -1.5 · entity A Witch -1.5 · gift A Ghost:Chill -1.5 · perk Jekyll & Hyde:steadyNerves -2.0 · gift The Invisible Man:Work It Out -2.0 · entity Jekyll & Hyde -2.2 · gift Jekyll & Hyde:Doctor’s Bag -2.6 · perk Frankenstein’s Creature:tireless -2.6 · gift The Werewolf:Keen Nose -2.8 · gift Frankenstein’s Creature:Book-Learned -3.3

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 11494 | 0.639 |
| a die stepped below d4 (floored at d4) | 4092 | 0.227 |
| suspicion past the Limit (lost) | 1 | 0.000 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:form | 0.311 |
| ability:hidden | 3.446 |
| ability:open | 2.857 |
| ability:raise | 1.263 |
| ability:switch | 1.644 |
| already dead: drifted off | 0.013 |
| captive rescued | 0.032 |
| captive slipped free | 0.064 |
| captures | 0.210 |
| charges regained by a Critical | 0.529 |
| charges spent | 9.287 |
| cost:drop | 0.096 |
| cost:stepdown | 0.474 |
| cost:suspicion | 0.311 |
| cost:turn | 0.431 |
| declined rolls | 0.336 |
| final flight escaped | 0.225 |
| final flight rounds | 1.133 |
| final flight with nobody free | 0.000 |
| final flight: dawn | 0.017 |
| final flight: limit | 0.260 |
| forked | 0.052 |
| furniture dropped: carrier captured | 0.000 |
| furniture dropped: final flight | 0.004 |
| group checks | 2.561 |
| group: forced low-value roll | 0.033 |
| group: left behind a group obstacle | 0.074 |
| hist final 1 | 0.025 |
| hist final 10 | 0.005 |
| hist final 11 | 0.003 |
| hist final 12 | 0.003 |
| hist final 13 | 0.002 |
| hist final 14 | 0.001 |
| hist final 15 | 0.002 |
| hist final 16 | 0.001 |
| hist final 17 | 0.001 |
| hist final 18 | 0.001 |
| hist final 19 | 0.001 |
| hist final 2 | 0.095 |
| hist final 20 | 0.000 |
| hist final 21 | 0.000 |
| hist final 22 | 0.000 |
| hist final 23 | 0.000 |
| hist final 24 | 0.000 |
| hist final 25 | 0.000 |
| hist final 27 | 0.000 |
| hist final 28 | 0.000 |
| hist final 3 | 0.048 |
| hist final 32 | 0.000 |
| hist final 35 | 0.000 |
| hist final 36 | 0.000 |
| hist final 4 | 0.027 |
| hist final 5 | 0.021 |
| hist final 6 | 0.015 |
| hist final 7 | 0.011 |
| hist final 8 | 0.008 |
| hist final 9 | 0.006 |
| hist local rounds 1 | 0.140 |
| hist local rounds 10 | 0.002 |
| hist local rounds 11 | 0.001 |
| hist local rounds 12 | 0.001 |
| hist local rounds 13 | 0.000 |
| hist local rounds 14 | 0.000 |
| hist local rounds 17 | 0.000 |
| hist local rounds 2 | 0.071 |
| hist local rounds 3 | 0.122 |
| hist local rounds 4 | 0.063 |
| hist local rounds 5 | 0.042 |
| hist local rounds 6 | 0.026 |
| hist local rounds 7 | 0.016 |
| hist local rounds 8 | 0.011 |
| hist local rounds 9 | 0.005 |
| hist local susp 0 | 0.040 |
| hist local susp 1 | 0.115 |
| hist local susp 10 | 0.004 |
| hist local susp 11 | 0.002 |
| hist local susp 12 | 0.002 |
| hist local susp 13 | 0.001 |
| hist local susp 14 | 0.000 |
| hist local susp 2 | 0.124 |
| hist local susp 3 | 0.035 |
| hist local susp 4 | 0.066 |
| hist local susp 5 | 0.027 |
| hist local susp 6 | 0.033 |
| hist local susp 7 | 0.021 |
| hist local susp 8 | 0.019 |
| hist local susp 9 | 0.009 |
| Hyde takes over | 0.265 |
| local chase ended by the Limit | 0.165 |
| local chase escaped | 0.168 |
| local chases | 0.499 |
| local chases (shared) | 0.006 |
| loot handed over | 1.310 |
| lost turns | 0.520 |
| lost turns: followed a Turn behind | 0.277 |
| opened: only the opener goes on | 1.106 |
| overdraws:final | 0.052 |
| overdraws:local | 0.132 |
| overdraws:raid | 0.051 |
| practised hand | 0.050 |
| susp:chase | 1.577 |
| susp:furniture | 0.479 |
| susp:roll | 4.572 |
| susp:slip | 0.063 |
| susp:tell | 2.256 |
| tells | 2.256 |
| the draught | 0.361 |
| weakness taken by overdraw | 0.052 |

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
