# Don't Get Forked — simulator report: P0 — The rules as decided (through the v0.2 review's decisions of 2026-10-21: Spectral at a way in, one overdraw per local chase, the flight overdraw's own step, the local mob at most 11, six rounds at most, five Entities' Limit, any ability as a raise in a local chase, the rolled towns' ways in) with the current numbers

Command: `node sim/run.mjs`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**The Entities are the approved roster** (dice, signatures, Gifts, Perks and Weakness timings read from `module/config.mjs`); towns are rolled with the book's town tables (`sim/town.mjs`). Players follow the policies in `sim/params.mjs`, which are simpler than real play.

## Packages

- **P0**: The rules as decided (through the v0.2 review's decisions of 2026-10-21: Spectral at a way in, one overdraw per local chase, the flight overdraw's own step, the local mob at most 11, six rounds at most, five Entities' Limit, any ability as a raise in a local chase, the rolled towns' ways in) with the current numbers.
- **V1**: The rules before the v0.2 review's decisions (the outside review's package and Limits 9 / 10 / 13, 2026-10-20).
- **V0**: The rules and Limits before the outside review (through V30 and the clarity pass, 2026-10-14).
- **P12**: The outside review's package with the old Limits 11 / 11 / 15 (before F12).
- **T10**: Not adopted (D5b): the package with a 10-Turn night on Easy and Standard and the old Limits.
- **N1**: Retune tried for a party that stays together: final-flight Lead starts at 3; final mob 11 / 12 / 12; Limits 12 / 12 / 14.
- **N2**: Tried for a party that splits up: the night lasts 8 Turns; final mob 10 / 12 / 12 (on target overall, but Hard wins 42% with 3 Entities and 72% with 5).

| Package | Easy win | Standard win | Hard win | Forked E · S · H | Hard captures | Grand Year when tried | Trouble | Mask (raid rolls) | Spend ≥ ½ | Hard win, 3 · 4 · 5 Entities |
|---|---|---|---|---|---|---|---|---|---|---|
| **target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | 0.2–0.3 | ~50% (furniturePolicy always) | 10–22% | ≥ 25% | ≥ 50% | close together |
| P0 | 91.4% | 73.4% | 55.9% | 0.8% · 4.0% · 9.6% | 0.42 | 75.7% | 17.8% | 43.2% | 78.0% | 51% · 56% · 60% |
| V1 | 92.3% | 74.7% | 55.2% | 0.9% · 3.5% · 9.2% | 0.47 | 76.8% | 18.0% | 42.6% | 77.1% | 51% · 55% · 60% |
| V0 | 91.8% | 73.2% | 56.5% | 0.7% · 5.3% · 9.3% | 0.35 | 80.0% | 18.5% | 37.6% | 73.6% | 52% · 57% · 60% |
| P12 | 94.5% | 77.6% | 61.7% | 0.5% · 3.1% · 7.0% | 0.49 | 80.3% | 17.4% | 38.4% | 73.8% | 57% · 62% · 66% |
| T10 | 95.1% | 75.6% | 61.7% | 0.1% · 1.4% · 7.0% | 0.49 | 78.9% | 16.8% | 37.1% | 71.4% | 57% · 62% · 66% |
| N1 | 91.0% | 79.7% | 57.5% | 1.4% · 3.9% · 15.7% | 0.43 | 75.4% | 18.8% | 40.2% | 76.5% | 53% · 57% · 62% |
| N2 | 87.0% | 36.6% | 20.1% | 0.2% · 2.0% · 5.3% | 0.22 | 100.0% | 14.4% | 37.6% | 62.1% | 6% · 11% · 43% |

## P0 — The rules as decided (through the v0.2 review's decisions of 2026-10-21: Spectral at a way in, one overdraw per local chase, the flight overdraw's own step, the local mob at most 11, six rounds at most, five Entities' Limit, any ability as a raise in a local chase, the rolled towns' ways in) with the current numbers against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 91.4% | ✓ |
| Win, standard | 72%–78% | 73.4% | ✓ |
| Win, hard | 55%–60% | 55.9% | ✓ |
| Forked, easy | 0%–2% | 0.8% | ✓ |
| Forked, standard | 3%–7% | 4.0% | ✓ |
| Forked, hard | 8%–12% | 9.6% | ✓ |
| Captures per Hard raid | 0.2–0.3 | 0.42 | ✗ |
| Grand Year when the party goes for furniture (a party that always goes for it) | ~50% | 47.1% | ✓ |
| Going for furniture costs the Win (a party that always goes for it) | ~20% | 20.1% | ✓ |
| The same, the default players (only when safe) | — | 75.7% · 6.0% (tried in 17.4% of raids) |  |
| Trouble, share of rolls | 10%–22% | 17.8% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 5.2% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 78.0% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 38.2% (30.3%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 61.8% (69.7%) | ✓ |
| Largest option outlier | within ±2.5 pts | gift The Werewolf:Through the Hedge 4.8 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 91.0% | 24.4% | 4.7% | 3.2% | 1.1% | 0.10 | 0.05 | 14% | 0% | 5.6 | 8.4 |
| easy | 4 | 92.8% | 34.8% | 4.2% | 2.1% | 0.9% | 0.10 | 0.04 | 20% | 0% | 5.9 | 8.1 |
| easy | 5 | 90.3% | 34.4% | 6.7% | 2.5% | 0.5% | 0.11 | 0.06 | 22% | 0% | 5.4 | 7.0 |
| standard | 3 | 72.8% | 2.6% | 11.6% | 10.9% | 4.8% | 0.24 | 0.14 | 16% | 0% | 7.1 | 9.7 |
| standard | 4 | 75.4% | 4.9% | 12.7% | 8.4% | 3.5% | 0.24 | 0.14 | 17% | 0% | 7.1 | 9.3 |
| standard | 5 | 72.0% | 9.7% | 14.1% | 10.2% | 3.8% | 0.23 | 0.13 | 23% | 0% | 6.6 | 7.8 |
| hard | 3 | 51.4% | 0.9% | 19.8% | 16.8% | 12.1% | 0.39 | 0.18 | 21% | 18% | 10.6 | 10.1 |
| hard | 4 | 55.8% | 1.1% | 17.9% | 16.2% | 10.2% | 0.44 | 0.21 | 24% | 13% | 10.7 | 9.7 |
| hard | 5 | 60.5% | 5.5% | 19.3% | 13.7% | 6.6% | 0.43 | 0.21 | 27% | 7% | 10.8 | 8.6 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 16.7 | 68.1% | 14.1% | 17.8% | 5.2% | 34.3% | 30.3% | 69.7% | 31.1% | 77.0% |

**Critical candidates** (share of all rolls; S8 decided doubles on a Success, the other columns are the rejected margins):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.2% | 34.3% | 27.0% | 20.5% | 14.8% | 10.2% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 17.4% | 75.7% | 6.0% | 91.4% | 73.4% | 55.9% |
| always | 72.3% | 47.1% | 20.1% | 85.6% | 57.9% | 43.8% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 91% (+0.0) | 73% (+0.0) | 56% (+0.0) | 9.6% | 0.42 | 30% |
| generous | 90% (-1.1) | 70% (-3.3) | 44% (-12.3) | 5.9% | 0.72 | 33% |
| strict | 79% (-12.1) | 47% (-25.9) | 30% (-25.9) | 7.0% | 0.70 | 29% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 93% (+1.2) | 80% (+4.9) | 63% (+7.7) | 4.0% | 0.40 | 31% |
| critRule = "beat6" (rule) | 93% (+0.6) | 77% (+1.8) | 59% (+4.1) | 6.5% | 0.42 | 31% |
| critRule = "beat7" (rule) | 92% (+0.1) | 76% (+1.1) | 57% (+2.1) | 7.8% | 0.43 | 31% |
| critEffect = "none" (rule) | 92% (-0.5) | 73% (-1.7) | 53% (-1.8) | 11.4% | 0.46 | 30% |
| critEffect = "lead2" (rule) | 92% (-0.5) | 74% (-1.0) | 54% (-0.9) | 10.3% | 0.44 | 31% |
| critEffect = "charge" (rule) | 92% (+0.1) | 75% (-0.3) | 54% (-0.9) | 10.4% | 0.46 | 30% |
| costChoice = "suspicion" (rule) | 91% (-1.5) | 70% (-4.6) | 52% (-2.5) | 10.1% | 0.41 | 29% |
| costChoice = "lenient" (rule) | 93% (+0.9) | 78% (+2.9) | 59% (+3.8) | 10.4% | 0.45 | 32% |
| dropRule = "lost" (rule) | 89% (-3.0) | 69% (-5.7) | 50% (-4.7) | 9.9% | 0.45 | 30% |
| dropRule = "extrasOnly" (rule) | 92% (-0.3) | 74% (-0.9) | 54% (-0.9) | 9.9% | 0.45 | 30% |
| loudRule = "witness" (rule) | 92% (-0.5) | 76% (+1.0) | 59% (+3.9) | 8.8% | 0.47 | 31% |
| loudRule = "both" (rule) | 92% (-0.5) | 75% (+0.0) | 55% (+0.6) | 8.3% | 0.46 | 31% |
| loudRule = "none" (rule) | 92% (+0.4) | 79% (+3.5) | 60% (+4.7) | 8.5% | 0.46 | 31% |
| openApproach = "quiet" (rule) | 91% (-1.5) | 73% (-2.0) | 54% (-1.3) | 10.4% | 0.38 | 25% |
| openApproach = "switch" (rule) | 88% (-3.6) | 68% (-7.2) | 49% (-6.2) | 12.1% | 0.48 | 23% |
| overdrawAtLimit = "weakness" (rule) | 92% (-0.1) | 75% (+0.0) | 55% (-0.1) | 8.9% | 0.45 | 30% |
| overdrawAtLimit = "free" (rule) | 92% (+0.1) | 76% (+1.0) | 56% (+1.1) | 2.9% | 0.45 | 32% |
| overdrawAtLimit = "forbidden" (rule) | 92% (-0.1) | 75% (-0.1) | 55% (-0.2) | 9.7% | 0.45 | 30% |
| overdrawAtLimit = "fury" (rule) | 90% (-2.2) | 74% (-1.5) | 51% (-3.7) | 24.9% | 0.45 | 30% |
| furnitureNoise = "moving" (rule) | 92% (+0.3) | 76% (+0.5) | 55% (+0.0) | 9.1% | 0.45 | 31% |
| spectralRule = "any" (rule) | 92% (-0.1) | 75% (-0.1) | 55% (+0.0) | 9.3% | 0.45 | 30% |
| mesmeriseRule = "any" (rule) | 92% (+0.3) | 76% (+1.3) | 56% (+1.3) | 9.5% | 0.43 | 31% |
| finalMove = "majority" (rule) | 92% (+0.1) | 75% (+0.1) | 54% (-1.2) | 11.1% | 0.45 | 25% |
| finalMove = "net" (rule) | 92% (+0.0) | 76% (+0.5) | 55% (+0.3) | 8.1% | 0.45 | 32% |
| openEase = 1 (rule) | 90% (-2.3) | 70% (-4.9) | 50% (-5.0) | 12.3% | 0.45 | 25% |
| raiseCap = "perDie" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| raiseDie = "any" (rule) | 92% (+0.1) | 76% (+0.6) | 56% (+0.8) | 9.7% | 0.45 | 32% |
| openTrait = "any" (rule) | 92% (+0.1) | 75% (-0.1) | 56% (+1.5) | 10.9% | 0.44 | 33% |
| waysIn = "one" (rule) | 87% (-5.4) | 66% (-8.6) | 49% (-6.1) | 11.0% | 0.49 | 25% |
| overdrawStack = "merge" (rule) | 92% (+0.2) | 76% (+0.5) | 55% (+0.6) | 9.2% | 0.44 | 31% |
| chaseRule = "perRoll" (rule) | 89% (-2.9) | 70% (-5.0) | 50% (-4.7) | 12.7% | 0.29 | 28% |
| giveUp = "simple" (policy) | 92% (-0.1) | 75% (+0.1) | 55% (-0.3) | 9.5% | 0.43 | 30% |
| giveUp = "never" (policy) | 92% (-0.3) | 75% (+0.2) | 54% (-0.4) | 10.9% | 0.40 | 30% |
| flightRaise = "raiseOnly" (rule) | 92% (-0.1) | 75% (+0.3) | 55% (-0.1) | 9.4% | 0.45 | 31% |
| allHeld = "continue" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| limitOrder = "limit" (rule) | 92% (-0.1) | 75% (-0.3) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| spectralWhen = "work" (rule) | 92% (-0.3) | 75% (+0.2) | 55% (+0.2) | 9.1% | 0.45 | 31% |
| spectralFix = "none" (rule) | 92% (+0.2) | 75% (-0.1) | 55% (+0.3) | 8.9% | 0.45 | 30% |
| spectralFix = "notLast" (rule) | 92% (-0.3) | 75% (+0.2) | 55% (+0.0) | 9.2% | 0.45 | 31% |
| spectralFix = "noItem" (rule) | 92% (-0.2) | 75% (+0.3) | 55% (-0.3) | 9.1% | 0.46 | 31% |
| localOverdraw = "any" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| flightOverdraw = "weakness" (rule) | 92% (-0.1) | 75% (+0.0) | 55% (-0.1) | 8.9% | 0.45 | 30% |
| flightOverdraw = "stack" (rule) | 92% (-0.1) | 75% (+0.0) | 55% (-0.2) | 9.6% | 0.45 | 30% |
| flightOverdraw = "round1" (rule) | 92% (-0.1) | 75% (-0.1) | 55% (-0.2) | 9.5% | 0.45 | 30% |
| localRoundCap = 0 (rule) | 92% (+0.0) | 75% (-0.3) | 54% (-0.7) | 9.6% | 0.46 | 30% |
| localRaise = "raiseOnly" (rule) | 92% (-0.1) | 75% (+0.3) | 55% (-0.1) | 9.1% | 0.46 | 31% |
| lootHandover = "none" (rule) | 91% (-0.7) | 74% (-1.4) | 53% (-1.7) | 9.7% | 0.45 | 30% |
| pieceSetDown = "free" (policy) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| pieceSetDown = "action" (policy) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| slipWatched = false (rule) | 92% (-0.1) | 75% (-0.1) | 55% (-0.1) | 9.3% | 0.45 | 30% |
| lootDrop = "outOfSight" (policy) | 92% (+0.0) | 75% (-0.1) | 55% (-0.1) | 9.3% | 0.45 | 30% |
| lootDrop = "guard" (policy) | 93% (+0.8) | 76% (+0.5) | 56% (+1.1) | 8.9% | 0.43 | 31% |
| chaseTable = "placeholder" (content) | 92% (+0.3) | 76% (+0.7) | 56% (+1.0) | 8.9% | 0.44 | 31% |
| chaseTable = "B" (content) | 93% (+1.0) | 77% (+1.7) | 58% (+2.7) | 3.7% | 0.42 | 31% |
| chaseTable = "C" (content) | 93% (+0.6) | 76% (+1.3) | 56% (+1.2) | 7.5% | 0.43 | 31% |
| partyPolicy = "together" (policy) | 92% (-0.1) | 58% (-17.1) | 38% (-16.9) | 9.0% | 0.41 | 26% |
| partyPolicy = "singles" (policy) | 90% (-2.1) | 74% (-1.3) | 55% (-0.3) | 8.7% | 0.41 | 31% |
| captiveItems = "kept" (rule) | 93% (+0.7) | 76% (+0.9) | 56% (+1.5) | 9.3% | 0.45 | 30% |
| multiCaught = "separate" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (-0.1) | 9.1% | 0.46 | 30% |
| monsterRule = "plus1" (rule) | 94% (+1.5) | 79% (+3.7) | 69% (+14.6) | 5.3% | 0.40 | 17% |
| monsterRule = "tie" (rule) | 93% (+1.3) | 79% (+3.7) | 67% (+11.7) | 7.1% | 0.40 | 20% |
| monsterRule = "d8" (rule) | 90% (-2.1) | 73% (-1.7) | 55% (+0.6) | 14.3% | 0.55 | 21% |
| monsterRule = "maskSafe" (rule) | 98% (+6.3) | 94% (+18.7) | 90% (+35.5) | 1.5% | 0.00 | 57% |
| chaseSusp = "no" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| chaseSusp = "cap2" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| chaseSusp = "cap3" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| chaseSusp = "cap4" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| slipRule = "cost" (rule) | 92% (+0.3) | 76% (+0.5) | 56% (+1.3) | 9.6% | 0.45 | 31% |
| furnitureRule = "slow" (rule) | 93% (+1.1) | 76% (+1.1) | 56% (+0.7) | 8.7% | 0.45 | 32% |
| furnitureRule = "base" (rule) | 93% (+1.1) | 76% (+1.1) | 56% (+0.7) | 8.7% | 0.45 | 32% |
| furnitureRule = "hardLoc" (rule) | 92% (+0.4) | 76% (+1.0) | 55% (+0.3) | 8.9% | 0.45 | 32% |
| furnitureRule = "noisy" (rule) | 93% (+0.8) | 75% (+0.3) | 55% (+0.2) | 9.1% | 0.45 | 31% |
| furnitureRule = "both" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| furnitureRule = "noisySlow" (rule) | 93% (+0.8) | 75% (+0.3) | 55% (+0.2) | 9.1% | 0.45 | 31% |
| furnitureRule = "slowHard" (rule) | 92% (+0.4) | 76% (+1.0) | 55% (+0.3) | 8.9% | 0.45 | 32% |
| furnitureRule = "slowWatched" (rule) | 92% (+0.4) | 76% (+1.0) | 56% (+0.7) | 8.7% | 0.45 | 32% |
| corneredAtLimit = "flight" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| fetchRule = "flight" (rule) | 92% (-0.1) | 75% (-0.3) | 54% (-0.6) | 9.8% | 0.46 | 30% |
| fetchRule = "pickup" (rule) | 92% (-0.1) | 75% (-0.5) | 54% (-0.8) | 10.8% | 0.46 | 30% |
| fetchRule = "keeper" (rule) | 92% (-0.1) | 75% (-0.5) | 54% (-0.9) | 10.9% | 0.46 | 30% |
| fetchRule = "carry" (rule) | 92% (-0.1) | 75% (-0.4) | 54% (-0.8) | 10.8% | 0.46 | 30% |
| fetchRule = "grab" (rule) | 92% (-0.1) | 75% (-0.4) | 54% (-0.7) | 10.8% | 0.46 | 30% |
| fetchRule = "lockup" (rule) | 92% (-0.1) | 75% (-0.4) | 54% (-0.7) | 10.9% | 0.46 | 30% |
| fetchRule = "flightLockup" (rule) | 92% (-0.1) | 75% (-0.3) | 54% (-0.5) | 9.9% | 0.46 | 30% |
| alreadyDeadTurns = 2 (rule) | 92% (+0.0) | 75% (+0.1) | 55% (+0.1) | 9.2% | 0.45 | 30% |
| furniturePlace = "separate" (rule) | 93% (+1.4) | 75% (-0.1) | 56% (+1.0) | 9.7% | 0.45 | 32% |
| exitRule = "free" (rule) | 89% (-3.3) | 62% (-13.1) | 40% (-15.2) | 6.0% | 0.72 | 36% |
| exitRule = "gate" (rule) | 89% (-3.3) | 62% (-13.1) | 40% (-15.2) | 6.0% | 0.72 | 36% |
| exitRule = "gateCarriers" (rule) | 92% (+0.3) | 78% (+3.0) | 60% (+5.2) | 4.8% | 0.38 | 31% |
| groupRule = "best3" (rule) | 92% (+0.0) | 75% (+0.1) | 54% (-1.1) | 9.3% | 0.46 | 31% |
| groupRule = "best4" (rule) | 92% (+0.0) | 75% (+0.1) | 54% (-1.1) | 9.3% | 0.46 | 31% |
| tellScope = "entity" (rule) | 89% (-2.8) | 68% (-7.5) | 53% (-1.6) | 9.8% | 0.41 | 30% |
| openedRule = "othersMayFollow" (rule) | 92% (-0.1) | 74% (-1.5) | 54% (-0.7) | 10.7% | 0.45 | 31% |
| exitTries = "each" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (-0.1) | 9.1% | 0.45 | 31% |
| triesPerTurn = "one" (rule) | 92% (+0.2) | 76% (+1.3) | 56% (+0.9) | 9.0% | 0.43 | 31% |
| planTime = "perObstacle" (policy) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| planTime = "perTurn" (policy) | 90% (-1.6) | 74% (-0.6) | 54% (-1.0) | 10.1% | 0.46 | 29% |
| openPolicy = "greedy" (policy) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| openPolicy = "last" (policy) | 91% (-0.8) | 72% (-3.2) | 52% (-2.4) | 10.5% | 0.46 | 29% |
| groupPolicy = "all" (policy) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| groupPolicy = "best2" (policy) | 92% (+0.0) | 75% (+0.1) | 55% (+0.1) | 9.2% | 0.45 | 30% |
| monsterPolicy = "mask" (policy) | 91% (-1.5) | 69% (-5.7) | 43% (-11.9) | 6.7% | 0.85 | 86% |
| monsterPolicy = "monster" (policy) | 83% (-9.5) | 55% (-20.3) | 46% (-8.4) | 14.3% | 0.32 | 0% |
| caughtWeight = 0.4 (policy) | 91% (-0.9) | 74% (-1.4) | 56% (+1.3) | 8.6% | 0.53 | 34% |
| caughtWeight = 2 (policy) | 92% (+0.1) | 73% (-2.1) | 51% (-4.3) | 8.6% | 0.36 | 28% |
| chargePolicy = "hoard" (policy) | 82% (-10.5) | 53% (-21.9) | 36% (-18.6) | 8.6% | 0.43 | 38% |
| furniturePolicy = "never" (policy) | 93% (+1.1) | 76% (+0.9) | 55% (+0.6) | 8.7% | 0.45 | 32% |
| furniturePolicy = "always" (policy) | 86% (-6.3) | 59% (-15.8) | 44% (-10.8) | 16.5% | 0.40 | 23% |
| outOfSightRule = "carry" (content) | 92% (+0.2) | 76% (+0.7) | 55% (+0.3) | 8.9% | 0.44 | 31% |
| outOfSightRule = "half" (content) | 92% (-0.2) | 75% (+0.3) | 55% (-0.1) | 8.7% | 0.45 | 31% |
| outOfSightRule = "handed" (content) | 92% (+0.1) | 75% (+0.2) | 55% (-0.1) | 9.1% | 0.45 | 31% |
| outOfSightRule = "handedSmart" (content) | 92% (+0.1) | 75% (+0.2) | 56% (+0.7) | 8.6% | 0.44 | 31% |
| roster = "placeholder" (content) | 92% (-0.2) | 76% (+0.9) | 58% (+3.1) | 9.7% | 0.45 | 35% |
| roster = "proposed" (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| dutyEdge = false (content) | 91% (-1.1) | 73% (-1.9) | 52% (-2.4) | 10.1% | 0.46 | 30% |
| tellPartyChance = 0.3333333333333333 (rule) | 94% (+1.9) | 79% (+4.3) | 58% (+3.1) | 8.1% | 0.46 | 31% |
| tellPartyChance = 0.6666666666666666 (rule) | 90% (-2.5) | 70% (-5.3) | 51% (-4.0) | 12.2% | 0.45 | 30% |
| tellChance = 0 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| tellChance = 0.3333333333333333 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| weaknessRule = "chance" (content) | 92% (-0.2) | 75% (+0.1) | 56% (+1.2) | 8.5% | 0.44 | 31% |
| weaknessRule = "always" (content) | 91% (-1.1) | 74% (-1.1) | 52% (-2.5) | 12.8% | 0.49 | 30% |
| weaknessRule = "soon" (content) | 92% (+0.1) | 76% (+0.6) | 56% (+1.1) | 8.0% | 0.44 | 31% |
| weaknessRule = "table" (content) | 93% (+0.5) | 76% (+1.2) | 55% (+0.6) | 7.6% | 0.44 | 31% |
| weaknessLocal = 0 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| weaknessLocal = 0.5 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| weaknessFinal = 0.25 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |
| weaknessFinal = 1 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.2% | 0.45 | 30% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift The Werewolf:Through the Hedge +4.8 · entity A Ghost +2.9 · perk A Ghost:alreadyDead +2.7 · gift Frankenstein’s Creature:Hovel Watcher +2.4 · gift A Witch:Black Cat +2.0 · entity Dracula +1.9 · gift The Mummy:Just a Costume +1.9 · perk Frankenstein’s Creature:strongBack +1.4 · perk Jekyll & Hyde:practisedHand +1.3 · entity The Invisible Man +1.3 · gift The Invisible Man:Through the Gap +1.2 · perk The Invisible Man:hiddenPockets +1.1 · gift Jekyll & Hyde:Pillar of Society +1.0 · perk The Mummy:fearTheCurse +1.0 · duty cook +0.9 · gift The Invisible Man:Poltergeist +0.8 · perk Dracula:wallCrawler +0.6 · gift A Ghost:Fade +0.6 · entity The Werewolf +0.6 · gift Dracula:Mist +0.5 · gift Dracula:Bat +0.5 · perk A Witch:wiseWoman +0.4 · perk The Werewolf:nightRunner +0.4 · duty librarian +0.3 · perk Dracula:hypnoticEyes +0.3 · gift The Mummy:Royal Bearing +0.3 · perk A Witch:familiarsWarning +0.0 · gift Jekyll & Hyde:Trample +0.0 · perk Jekyll & Hyde:bruteStrength +0.0 · gift Frankenstein’s Creature:Mountain Stride -0.1 · perk The Invisible Man:outOfSight -0.1 · duty tailor -0.1 · duty handyman -0.2 · duty gardener -0.2 · perk The Werewolf:fetch -0.2 · perk The Werewolf:shortcut -0.2 · gift A Ghost:Whisper -0.3 · perk A Witch:flyByNight -0.4 · gift A Ghost:Chill -0.4 · perk The Mummy:patienceOfAges -0.4 · perk The Mummy:keeperOfTreasures -0.6 · duty butler -0.7 · perk Frankenstein’s Creature:builtToLast -0.7 · perk Frankenstein’s Creature:tireless -0.7 · gift A Witch:A Potion for That -0.9 · perk Dracula:oldMoney -0.9 · perk A Ghost:rattle -0.9 · perk The Invisible Man:lightStep -0.9 · gift Jekyll & Hyde:Doctor’s Bag -1.0 · gift Dracula:Wolf -1.1 · gift A Witch:Broomstick -1.1 · entity Frankenstein’s Creature -1.3 · entity The Mummy -1.3 · perk Jekyll & Hyde:steadyNerves -1.4 · perk A Ghost:spectral -1.7 · entity A Witch -1.8 · gift The Invisible Man:Work It Out -2.0 · gift The Werewolf:Howl -2.0 · gift The Mummy:Old Curse -2.2 · gift Frankenstein’s Creature:Book-Learned -2.2 · entity Jekyll & Hyde -2.3 · gift The Werewolf:Keen Nose -2.8

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 11635 | 0.646 |
| a die stepped below d4 (floored at d4) | 4642 | 0.258 |
| suspicion past the Limit (lost) | 17 | 0.001 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:form | 0.416 |
| ability:hidden | 3.902 |
| ability:open | 3.159 |
| ability:raise | 0.879 |
| ability:switch | 1.597 |
| already dead: drifted off | 0.014 |
| captive rescued | 0.038 |
| captive slipped free | 0.085 |
| captures | 0.253 |
| carrier rolls: other obstacles | 0.005 |
| carrier rolls: the way out | 0.008 |
| charges regained by a Critical | 0.556 |
| charges spent | 9.799 |
| charges spent:final | 0.666 |
| charges spent:local | 0.466 |
| charges spent:raid | 8.636 |
| charges spent:slip | 0.030 |
| cost:drop | 0.102 |
| cost:stepdown | 0.492 |
| cost:suspicion | 0.357 |
| cost:turn | 0.452 |
| declined rolls | 0.635 |
| everyone held: Forked (D7b) | 0.000 |
| final flight escaped | 0.198 |
| final flight rounds | 0.993 |
| final flight: dawn | 0.042 |
| final flight: limit | 0.204 |
| flight overdraw: own step down | 0.117 |
| forked | 0.048 |
| furniture dropped: carrier captured | 0.000 |
| furniture dropped: final flight | 0.006 |
| gave up (D2) | 0.092 |
| gave up in a shared chase (D2) | 0.004 |
| group checks | 2.661 |
| group: forced low-value roll | 0.055 |
| group: left behind a group obstacle | 0.070 |
| hist final 1 | 0.023 |
| hist final 10 | 0.004 |
| hist final 11 | 0.003 |
| hist final 12 | 0.002 |
| hist final 13 | 0.002 |
| hist final 14 | 0.001 |
| hist final 15 | 0.001 |
| hist final 16 | 0.001 |
| hist final 17 | 0.001 |
| hist final 18 | 0.001 |
| hist final 19 | 0.000 |
| hist final 2 | 0.085 |
| hist final 20 | 0.000 |
| hist final 21 | 0.000 |
| hist final 22 | 0.000 |
| hist final 23 | 0.000 |
| hist final 24 | 0.000 |
| hist final 25 | 0.000 |
| hist final 26 | 0.000 |
| hist final 27 | 0.000 |
| hist final 28 | 0.000 |
| hist final 29 | 0.000 |
| hist final 3 | 0.042 |
| hist final 4 | 0.027 |
| hist final 43 | 0.000 |
| hist final 5 | 0.019 |
| hist final 6 | 0.011 |
| hist final 7 | 0.011 |
| hist final 8 | 0.006 |
| hist final 9 | 0.005 |
| hist local rounds 0 | 0.092 |
| hist local rounds 1 | 0.091 |
| hist local rounds 2 | 0.047 |
| hist local rounds 3 | 0.120 |
| hist local rounds 4 | 0.057 |
| hist local rounds 5 | 0.041 |
| hist local rounds 6 | 0.100 |
| hist local susp 0 | 0.133 |
| hist local susp 1 | 0.094 |
| hist local susp 2 | 0.309 |
| hist local susp 3 | 0.001 |
| hist local susp 4 | 0.012 |
| hist shared susp 0 | 0.002 |
| hist shared susp 1 | 0.000 |
| hist shared susp 2 | 0.005 |
| hist shared susp 4 | 0.000 |
| Hyde takes over | 0.221 |
| local chase brought the hunt (D1) | 0.012 |
| local chase escaped | 0.289 |
| local chases | 0.549 |
| local chases (shared) | 0.008 |
| loot handed over | 1.370 |
| lost turns | 0.555 |
| lost turns: followed a Turn behind | 0.295 |
| opened: only the opener goes on | 1.100 |
| overdraws:final | 0.117 |
| overdraws:local | 0.016 |
| overdraws:raid | 0.023 |
| practised hand | 0.032 |
| R1: result before the Limit (lockup) | 0.001 |
| R1: result before the Limit (loot) | 0.010 |
| shared chase escaped | 0.004 |
| spectral: loot in hand with no action (D4) | 0.030 |
| spectral: passed with no action (D4) | 0.091 |
| susp:chase | 0.775 |
| susp:furniture | 0.438 |
| susp:roll | 4.114 |
| susp:slip | 0.071 |
| susp:tell | 2.341 |
| tells | 2.341 |
| the draught | 0.303 |

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
- Abilities: the four standard effects and the Draught, one charge each, helping anyone at the same place (only an opened approach is your own roll's), one raise per roll (Castle Duty included), overdraw (+2 Suspicion on top, D3; one per runner in a local chase, 2026-10-21; once the hunt is on, once per flight, a step down of its own from the next roll to the end of the flight, on top of any Weakness and allowed with it, 2026-10-21); in any chase any ability may be spent as a raise (D6b; on your own roll in a local chase, 2026-10-21).
- The approved roster (module/config.mjs): the eight Entities' dice, signatures, all 24 Gifts and 24 Perks with their book effects, Weakness timings (Always / Soon); random picks; unique Castle Duties with their raise.
- Rolled towns from Chapter 8's tables (obstacle table, counts, Difficulties, watched, the ceiling on 12s, two ways in: never an inside obstacle, at most one group obstacle, W14 2026-10-21) and the three premade towns of Chapter 9 (sim/premade.mjs).
- The Suspicion Limit by label, 1 lower on Easy and Standard with five Entities (2026-10-21).
- Turns, dawn, group checks (Costs picked after the rolls, F23; one rise by the biggest trigger, every overdraw on top), beaten obstacles, the way out (one roll a Turn for the party, R4), Tells (once per watched location, 4–6), loot handed over, the lock-up (rescue, slipping free on a Success), everyone held ending the night Forked (D7b), left behind, results and the epilogue's ladder.
- Local chases (Lead 1 to 4 against 8 + half the Suspicion, at most 11, set when the chase starts; at most 6 rounds, then a Lead of 2 or more escapes and less is cornered, 2026-10-21; one rise when it ends, by the biggest trigger among its rolls plus +2 for each overdraw, D1), giving up at the start of a round (D2; when, a policy), shared local chases and the final flight (the majority rule moving 1 or 2, B6), the chase table, Weaknesses, the Limit coming with a chase's rise, Already Dead.
- Spectral (D4): only at a way in (2026-10-21); no roll and no action, so on the Turn the Ghost arrives too; the pass never picks the way in, which the others pick when they first roll there, and she stays past whichever they pick; at a way in that is the location's only obstacle she takes the item.
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
  "finalEscape": 6,
  "localCapEscape": 2
 },
 "finalCloseIn": 0,
 "finalCloseCap": 12,
 "localMob": {
  "base": 8,
  "perSuspicion": 0.5,
  "max": 11
 },
 "fivePlayers": {
  "size": 5,
  "limit": {
   "easy": -1,
   "standard": -1,
   "hard": 0
  }
 },
 "wayInRules": true,
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
