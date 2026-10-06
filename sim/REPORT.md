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
| **target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | ≥ 0.2 | ~50% | 10–20% | ≥ 25% | ≥ 50% | close together |
| P0 | 92.2% | 74.2% | 56.1% | 0.8% · 5.0% · 9.1% | 0.35 | 80.9% | 18.2% | 38.8% | 73.4% | 52% · 57% · 59% |
| N1 | 92.0% | 75.8% | 51.3% | 1.1% · 6.6% · 20.2% | 0.34 | 80.3% | 20.4% | 38.6% | 73.0% | 49% · 51% · 54% |
| N2 | 87.0% | 35.8% | 18.1% | 0.2% · 4.4% · 8.1% | 0.22 | — | 16.1% | 35.5% | 58.5% | 6% · 10% · 38% |

## P0 — The rules as decided (through B6, 2026-10-06) with the current numbers against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 92.2% | ✓ |
| Win, standard | 72%–78% | 74.2% | ✓ |
| Win, hard | 55%–60% | 56.1% | ✓ |
| Forked, easy | 0%–2% | 0.8% | ✓ |
| Forked, standard | 3%–7% | 5.0% | ✓ |
| Forked, hard | 8%–12% | 9.1% | ✓ |
| Captures per Hard raid | ≥ 0.2 | 0.35 | ✓ |
| Grand Year when the party goes for furniture | ~50% | 80.9% | ✗ |
| Going for furniture costs the Win | ~20% | 4.6% | ✗ |
| Trouble, share of rolls | 10%–22% | 18.2% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 5.3% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 73.4% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 35.1% (27.0%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 64.9% (73.0%) | ✓ |
| Largest option outlier | within ±2.5 pts | entity Dracula 2.7 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 92.0% | 25.7% | 3.8% | 3.2% | 1.1% | 0.08 | 0.04 | 13% | 0% | 6.4 | 8.2 |
| easy | 4 | 92.0% | 36.6% | 4.0% | 3.1% | 0.8% | 0.08 | 0.04 | 16% | 0% | 6.6 | 8.0 |
| easy | 5 | 92.5% | 39.4% | 4.1% | 3.0% | 0.4% | 0.09 | 0.04 | 15% | 0% | 6.6 | 7.0 |
| standard | 3 | 71.4% | 2.9% | 10.5% | 11.6% | 6.5% | 0.17 | 0.11 | 24% | 0% | 7.7 | 9.1 |
| standard | 4 | 76.2% | 5.1% | 9.6% | 9.9% | 4.3% | 0.17 | 0.10 | 25% | 0% | 7.6 | 8.9 |
| standard | 5 | 74.9% | 12.2% | 9.9% | 11.2% | 4.1% | 0.17 | 0.11 | 27% | 0% | 7.9 | 7.5 |
| hard | 3 | 52.3% | 1.1% | 15.2% | 21.8% | 10.8% | 0.35 | 0.23 | 31% | 8% | 12.1 | 9.3 |
| hard | 4 | 57.1% | 2.1% | 14.4% | 19.1% | 9.3% | 0.35 | 0.23 | 34% | 5% | 12.2 | 8.9 |
| hard | 5 | 59.0% | 6.3% | 16.3% | 17.5% | 7.2% | 0.35 | 0.24 | 37% | 3% | 12.4 | 7.9 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 16.6 | 68.1% | 13.7% | 18.2% | 5.3% | 34.9% | 27.0% | 73.0% | 32.5% | 72.7% |

**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.3% | 34.9% | 27.6% | 21.0% | 15.4% | 10.7% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 18.0% | 80.9% | 4.6% | 92.2% | 74.2% | 56.1% |
| always | 71.2% | 55.2% | 17.0% | 88.6% | 61.9% | 46.1% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 92% (+0.0) | 74% (+0.0) | 56% (+0.0) | 9.1% | 0.35 | 27% |
| generous | 90% (-2.2) | 69% (-4.9) | 50% (-5.9) | 14.3% | 0.45 | 23% |
| strict | 82% (-10.3) | 54% (-20.4) | 31% (-24.9) | 16.3% | 0.53 | 19% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 95% (+2.8) | 81% (+6.2) | 62% (+7.8) | 4.2% | 0.33 | 28% |
| critRule = "beat6" (rule) | 94% (+1.5) | 78% (+2.6) | 59% (+3.9) | 8.0% | 0.37 | 28% |
| critRule = "beat7" (rule) | 93% (+0.4) | 75% (+0.5) | 57% (+1.9) | 9.5% | 0.38 | 27% |
| critEffect = "none" (rule) | 91% (-1.1) | 73% (-2.3) | 53% (-1.3) | 11.3% | 0.38 | 26% |
| critEffect = "lead2" (rule) | 92% (-0.2) | 74% (-0.9) | 54% (-0.7) | 9.8% | 0.38 | 27% |
| critEffect = "charge" (rule) | 91% (-0.9) | 74% (-1.4) | 54% (-0.5) | 11.1% | 0.38 | 26% |
| costChoice = "suspicion" (rule) | 91% (-1.1) | 73% (-2.1) | 54% (-0.9) | 11.1% | 0.36 | 25% |
| costChoice = "lenient" (rule) | 93% (+0.5) | 76% (+1.3) | 57% (+2.6) | 9.9% | 0.38 | 28% |
| dropRule = "lost" (rule) | 89% (-2.8) | 70% (-4.9) | 50% (-4.9) | 9.5% | 0.37 | 27% |
| dropRule = "extrasOnly" (rule) | 92% (-0.1) | 74% (-1.0) | 54% (-0.4) | 9.7% | 0.38 | 27% |
| loudRule = "witness" (rule) | 92% (-0.1) | 75% (+0.3) | 56% (+1.0) | 8.9% | 0.37 | 27% |
| loudRule = "both" (rule) | 92% (-0.5) | 75% (+0.3) | 55% (-0.1) | 9.3% | 0.38 | 27% |
| loudRule = "none" (rule) | 93% (+1.1) | 77% (+2.1) | 58% (+3.4) | 8.3% | 0.36 | 27% |
| openApproach = "quiet" (rule) | 91% (-1.1) | 75% (+0.0) | 53% (-1.2) | 10.1% | 0.32 | 21% |
| openApproach = "switch" (rule) | 89% (-3.4) | 70% (-4.8) | 49% (-5.6) | 11.7% | 0.42 | 19% |
| overdrawAtLimit = "weakness" (rule) | 92% (+0.0) | 75% (-0.2) | 55% (-0.1) | 9.7% | 0.38 | 27% |
| overdrawAtLimit = "free" (rule) | 92% (+0.1) | 75% (+0.5) | 56% (+1.1) | 5.5% | 0.38 | 28% |
| overdrawAtLimit = "forbidden" (rule) | 92% (+0.0) | 75% (-0.3) | 54% (-0.3) | 10.1% | 0.38 | 27% |
| overdrawAtLimit = "fury" (rule) | 90% (-2.3) | 72% (-3.5) | 51% (-4.1) | 27.4% | 0.38 | 26% |
| furnitureNoise = "moving" (rule) | 92% (+0.2) | 75% (+0.1) | 55% (+0.0) | 9.7% | 0.38 | 27% |
| finalMove = "majority" (rule) | 93% (+0.4) | 75% (-0.1) | 55% (+0.3) | 9.1% | 0.37 | 22% |
| finalMove = "net" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 28% |
| openEase = 1 (rule) | 90% (-1.7) | 72% (-3.5) | 50% (-5.0) | 11.1% | 0.39 | 21% |
| raiseCap = "perDie" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 27% |
| raiseDie = "any" (rule) | 92% (-0.6) | 75% (+0.2) | 55% (+0.7) | 9.5% | 0.36 | 28% |
| openTrait = "any" (rule) | 92% (-0.3) | 76% (+1.3) | 54% (-0.5) | 9.7% | 0.36 | 29% |
| waysIn = "one" (rule) | 89% (-3.4) | 67% (-8.1) | 49% (-6.1) | 10.3% | 0.43 | 21% |
| overdrawStack = "stack" (rule) | 92% (-0.5) | 74% (-0.7) | 55% (+0.0) | 10.1% | 0.39 | 27% |
| lootHandover = "none" (rule) | 92% (-0.5) | 75% (-0.5) | 54% (-1.1) | 9.9% | 0.37 | 27% |
| chaseTable = "placeholder" (content) | 92% (-0.3) | 75% (-0.4) | 55% (-0.1) | 9.0% | 0.37 | 27% |
| chaseTable = "B" (content) | 93% (+0.9) | 77% (+1.8) | 58% (+3.1) | 6.1% | 0.36 | 28% |
| chaseTable = "C" (content) | 92% (+0.3) | 74% (-0.5) | 56% (+1.4) | 7.6% | 0.37 | 27% |
| partyPolicy = "together" (policy) | 90% (-2.5) | 35% (-40.1) | 16% (-38.5) | 6.9% | 0.33 | 27% |
| partyPolicy = "singles" (policy) | 90% (-2.0) | 76% (+0.6) | 54% (-0.3) | 9.9% | 0.36 | 28% |
| captiveItems = "kept" (rule) | 93% (+0.5) | 76% (+1.2) | 56% (+1.1) | 9.7% | 0.38 | 27% |
| multiCaught = "separate" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.1) | 9.7% | 0.37 | 27% |
| monsterRule = "plus1" (rule) | 94% (+1.9) | 83% (+8.0) | 66% (+11.5) | 6.2% | 0.42 | 15% |
| monsterRule = "tie" (rule) | 94% (+1.5) | 81% (+5.9) | 65% (+10.2) | 6.1% | 0.42 | 18% |
| monsterRule = "d8" (rule) | 91% (-1.5) | 74% (-1.1) | 52% (-2.6) | 13.7% | 0.58 | 19% |
| monsterRule = "maskSafe" (rule) | 99% (+7.3) | 97% (+22.1) | 95% (+40.7) | 0.4% | 0.00 | 61% |
| chaseSusp = "no" (rule) | 97% (+4.7) | 85% (+9.9) | 65% (+10.5) | 4.9% | 0.50 | 29% |
| chaseSusp = "cap2" (rule) | 95% (+2.6) | 80% (+5.1) | 60% (+5.0) | 7.7% | 0.49 | 29% |
| chaseSusp = "cap3" (rule) | 94% (+1.6) | 78% (+3.1) | 58% (+3.2) | 8.2% | 0.47 | 28% |
| chaseSusp = "cap4" (rule) | 94% (+1.4) | 77% (+1.9) | 56% (+1.7) | 8.9% | 0.44 | 28% |
| slipRule = "cost" (rule) | 92% (+0.3) | 75% (+0.2) | 55% (+0.8) | 9.7% | 0.38 | 27% |
| furnitureRule = "slow" (rule) | 93% (+0.6) | 76% (+0.6) | 55% (+0.5) | 9.3% | 0.38 | 28% |
| furnitureRule = "base" (rule) | 93% (+0.6) | 76% (+0.6) | 55% (+0.5) | 9.3% | 0.38 | 28% |
| furnitureRule = "hardLoc" (rule) | 93% (+0.4) | 75% (+0.3) | 55% (+0.3) | 9.3% | 0.38 | 27% |
| furnitureRule = "noisy" (rule) | 92% (+0.0) | 75% (+0.2) | 55% (+0.1) | 9.7% | 0.37 | 27% |
| furnitureRule = "both" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 27% |
| furnitureRule = "noisySlow" (rule) | 92% (+0.0) | 75% (+0.2) | 55% (+0.1) | 9.7% | 0.37 | 27% |
| furnitureRule = "slowHard" (rule) | 93% (+0.4) | 75% (+0.3) | 55% (+0.3) | 9.3% | 0.38 | 27% |
| furnitureRule = "slowWatched" (rule) | 92% (+0.0) | 75% (+0.4) | 55% (+0.5) | 9.3% | 0.38 | 28% |
| corneredAtLimit = "flight" (rule) | 93% (+0.4) | 77% (+1.9) | 57% (+2.4) | 9.8% | 0.31 | 27% |
| fetchRule = "flight" (rule) | 92% (-0.1) | 75% (-0.2) | 54% (-0.4) | 9.9% | 0.38 | 27% |
| fetchRule = "pickup" (rule) | 92% (-0.1) | 75% (-0.5) | 54% (-0.8) | 11.1% | 0.38 | 26% |
| fetchRule = "keeper" (rule) | 92% (-0.1) | 75% (-0.4) | 54% (-0.8) | 11.2% | 0.38 | 26% |
| fetchRule = "carry" (rule) | 92% (-0.1) | 75% (-0.5) | 54% (-0.8) | 11.1% | 0.38 | 26% |
| fetchRule = "grab" (rule) | 92% (-0.1) | 75% (-0.5) | 54% (-0.7) | 11.1% | 0.38 | 26% |
| fetchRule = "lockup" (rule) | 92% (+0.0) | 75% (-0.4) | 54% (-0.7) | 11.1% | 0.38 | 26% |
| fetchRule = "flightLockup" (rule) | 92% (+0.0) | 75% (-0.1) | 54% (-0.3) | 9.9% | 0.38 | 27% |
| alreadyDeadTurns = 2 (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 27% |
| furniturePlace = "separate" (rule) | 92% (+0.2) | 75% (+0.5) | 58% (+2.9) | 9.1% | 0.35 | 29% |
| exitRule = "free" (rule) | 90% (-2.2) | 66% (-8.9) | 43% (-12.1) | 14.0% | 0.52 | 26% |
| exitRule = "gate" (rule) | 90% (-2.2) | 66% (-8.9) | 43% (-12.1) | 14.0% | 0.52 | 26% |
| exitRule = "gateCarriers" (rule) | 93% (+0.5) | 77% (+2.1) | 60% (+5.2) | 7.0% | 0.32 | 27% |
| groupRule = "best3" (rule) | 92% (+0.2) | 75% (-0.4) | 56% (+1.2) | 9.0% | 0.38 | 27% |
| groupRule = "best4" (rule) | 92% (+0.2) | 75% (-0.4) | 56% (+1.2) | 9.0% | 0.38 | 27% |
| tellScope = "entity" (rule) | 91% (-0.9) | 72% (-2.7) | 53% (-1.4) | 9.7% | 0.37 | 27% |
| triesPerTurn = "one" (rule) | 92% (+0.3) | 76% (+0.6) | 55% (+0.4) | 9.6% | 0.37 | 27% |
| monsterPolicy = "mask" (policy) | 90% (-1.8) | 71% (-4.2) | 41% (-13.5) | 6.0% | 0.87 | 88% |
| monsterPolicy = "monster" (policy) | 88% (-4.5) | 58% (-16.9) | 50% (-4.9) | 13.3% | 0.31 | 0% |
| caughtWeight = 0.4 (policy) | 90% (-2.5) | 74% (-1.2) | 54% (-0.6) | 9.2% | 0.42 | 29% |
| caughtWeight = 2 (policy) | 93% (+0.5) | 75% (+0.3) | 52% (-2.4) | 9.1% | 0.31 | 25% |
| chargePolicy = "hoard" (policy) | 86% (-6.3) | 60% (-14.6) | 40% (-14.7) | 11.3% | 0.41 | 30% |
| furniturePolicy = "never" (policy) | 93% (+1.0) | 75% (+0.4) | 55% (+0.5) | 9.0% | 0.37 | 28% |
| furniturePolicy = "always" (policy) | 90% (-2.6) | 63% (-11.9) | 46% (-9.1) | 15.7% | 0.38 | 22% |
| roster = "placeholder" (content) | 92% (-0.3) | 76% (+0.7) | 55% (+0.3) | 9.7% | 0.40 | 32% |
| roster = "proposed" (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 27% |
| dutyEdge = false (content) | 92% (-0.4) | 74% (-0.9) | 54% (-1.0) | 9.5% | 0.39 | 27% |
| tellPartyChance = 0.3333333333333333 (rule) | 93% (+0.4) | 78% (+3.0) | 57% (+2.2) | 9.2% | 0.38 | 27% |
| tellPartyChance = 0.6666666666666666 (rule) | 91% (-0.8) | 72% (-3.0) | 53% (-2.1) | 10.5% | 0.38 | 27% |
| tellChance = 0 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 27% |
| tellChance = 0.3333333333333333 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 27% |
| weaknessRule = "chance" (content) | 92% (+0.3) | 75% (+0.1) | 58% (+3.7) | 8.5% | 0.35 | 27% |
| weaknessRule = "always" (content) | 91% (-1.1) | 72% (-2.8) | 52% (-2.4) | 13.9% | 0.41 | 27% |
| weaknessRule = "soon" (content) | 92% (-0.1) | 76% (+0.5) | 56% (+0.9) | 8.5% | 0.36 | 27% |
| weaknessRule = "table" (content) | 92% (+0.1) | 76% (+0.5) | 56% (+1.3) | 7.9% | 0.36 | 27% |
| weaknessLocal = 0 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 27% |
| weaknessLocal = 0.5 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 27% |
| weaknessFinal = 0.25 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 27% |
| weaknessFinal = 1 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.7% | 0.38 | 27% |

## Option outliers (win Δ, parties with vs without, same label and size)

entity Dracula +2.7 · gift The Werewolf:Through the Hedge +2.7 · gift Frankenstein’s Creature:Mountain Stride +2.4 · perk Jekyll & Hyde:bruteStrength +2.2 · gift The Invisible Man:Through the Gap +2.0 · entity A Ghost +2.0 · perk A Ghost:alreadyDead +1.9 · gift Jekyll & Hyde:Trample +1.9 · gift Dracula:Bat +1.3 · gift The Mummy:Royal Bearing +1.3 · entity The Invisible Man +1.2 · perk Frankenstein’s Creature:strongBack +1.1 · gift A Witch:Black Cat +1.1 · perk The Werewolf:nightRunner +1.0 · perk The Mummy:patienceOfAges +0.8 · perk The Werewolf:shortcut +0.8 · perk The Invisible Man:outOfSight +0.6 · gift A Ghost:Whisper +0.6 · duty cook +0.6 · duty gardener +0.5 · perk Dracula:wallCrawler +0.5 · perk A Ghost:spectral +0.5 · perk Frankenstein’s Creature:builtToLast +0.4 · gift Frankenstein’s Creature:Hovel Watcher +0.4 · perk Dracula:hypnoticEyes +0.2 · gift A Ghost:Fade +0.2 · perk A Witch:familiarsWarning +0.2 · gift A Witch:A Potion for That +0.2 · gift Dracula:Wolf +0.1 · gift The Mummy:Just a Costume +0.0 · perk The Invisible Man:hiddenPockets +0.0 · entity The Werewolf -0.0 · perk A Witch:wiseWoman -0.0 · duty librarian -0.1 · perk A Witch:flyByNight -0.1 · duty handyman -0.1 · perk The Mummy:fearTheCurse -0.2 · gift Jekyll & Hyde:Pillar of Society -0.2 · duty butler -0.4 · duty tailor -0.5 · perk Jekyll & Hyde:practisedHand -0.5 · perk The Invisible Man:lightStep -0.6 · gift The Werewolf:Howl -0.6 · perk Dracula:oldMoney -0.7 · gift A Ghost:Chill -0.7 · perk The Mummy:keeperOfTreasures -0.8 · entity Frankenstein’s Creature -0.9 · entity The Mummy -1.0 · gift The Invisible Man:Poltergeist -1.0 · gift The Invisible Man:Work It Out -1.0 · gift A Witch:Broomstick -1.2 · gift The Mummy:Old Curse -1.3 · gift Dracula:Mist -1.4 · entity A Witch -1.4 · perk Frankenstein’s Creature:tireless -1.5 · gift Jekyll & Hyde:Doctor’s Bag -1.7 · perk Jekyll & Hyde:steadyNerves -1.7 · perk The Werewolf:fetch -1.8 · gift The Werewolf:Keen Nose -2.1 · perk A Ghost:rattle -2.4 · entity Jekyll & Hyde -2.6 · gift Frankenstein’s Creature:Book-Learned -2.7

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 12753 | 0.709 |
| a die stepped below d4 (floored at d4) | 3922 | 0.218 |
| suspicion past the Limit (lost) | 1 | 0.000 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:form | 0.354 |
| ability:hidden | 3.381 |
| ability:open | 3.252 |
| ability:raise | 1.346 |
| ability:switch | 1.454 |
| already dead: drifted off | 0.013 |
| captive rescued | 0.023 |
| captive slipped free | 0.054 |
| captures | 0.203 |
| charges regained by a Critical | 0.539 |
| charges spent | 9.264 |
| cost:drop | 0.095 |
| cost:stepdown | 0.456 |
| cost:suspicion | 0.317 |
| cost:turn | 0.416 |
| declined rolls | 0.368 |
| final flight escaped | 0.216 |
| final flight rounds | 1.087 |
| final flight: dawn | 0.017 |
| final flight: limit | 0.248 |
| forked | 0.049 |
| furniture dropped: carrier captured | 0.000 |
| furniture dropped: final flight | 0.004 |
| group checks | 2.513 |
| group: forced low-value roll | 0.030 |
| hist final 1 | 0.024 |
| hist final 10 | 0.005 |
| hist final 11 | 0.003 |
| hist final 12 | 0.002 |
| hist final 13 | 0.002 |
| hist final 14 | 0.001 |
| hist final 15 | 0.001 |
| hist final 16 | 0.001 |
| hist final 17 | 0.001 |
| hist final 18 | 0.000 |
| hist final 19 | 0.000 |
| hist final 2 | 0.092 |
| hist final 20 | 0.000 |
| hist final 21 | 0.000 |
| hist final 22 | 0.000 |
| hist final 23 | 0.000 |
| hist final 24 | 0.000 |
| hist final 25 | 0.000 |
| hist final 26 | 0.000 |
| hist final 27 | 0.000 |
| hist final 28 | 0.000 |
| hist final 3 | 0.045 |
| hist final 31 | 0.000 |
| hist final 33 | 0.000 |
| hist final 36 | 0.000 |
| hist final 4 | 0.026 |
| hist final 5 | 0.018 |
| hist final 6 | 0.015 |
| hist final 7 | 0.010 |
| hist final 8 | 0.010 |
| hist final 9 | 0.006 |
| hist local rounds 1 | 0.137 |
| hist local rounds 10 | 0.002 |
| hist local rounds 11 | 0.001 |
| hist local rounds 12 | 0.001 |
| hist local rounds 13 | 0.000 |
| hist local rounds 14 | 0.000 |
| hist local rounds 15 | 0.000 |
| hist local rounds 16 | 0.000 |
| hist local rounds 17 | 0.000 |
| hist local rounds 2 | 0.070 |
| hist local rounds 3 | 0.121 |
| hist local rounds 4 | 0.061 |
| hist local rounds 5 | 0.041 |
| hist local rounds 6 | 0.027 |
| hist local rounds 7 | 0.016 |
| hist local rounds 8 | 0.011 |
| hist local rounds 9 | 0.005 |
| hist local susp 0 | 0.041 |
| hist local susp 1 | 0.111 |
| hist local susp 10 | 0.005 |
| hist local susp 11 | 0.003 |
| hist local susp 12 | 0.002 |
| hist local susp 13 | 0.001 |
| hist local susp 14 | 0.000 |
| hist local susp 2 | 0.120 |
| hist local susp 3 | 0.035 |
| hist local susp 4 | 0.066 |
| hist local susp 5 | 0.028 |
| hist local susp 6 | 0.033 |
| hist local susp 7 | 0.022 |
| hist local susp 8 | 0.019 |
| hist local susp 9 | 0.009 |
| Hyde takes over | 0.266 |
| local chase ended by the Limit | 0.159 |
| local chase escaped | 0.170 |
| local chases | 0.495 |
| local chases (shared) | 0.005 |
| loot handed over | 1.345 |
| lost turns | 0.482 |
| opened: only the opener goes on | 1.239 |
| overdraws:final | 0.253 |
| overdraws:local | 0.131 |
| overdraws:raid | 0.138 |
| practised hand | 0.061 |
| susp:chase | 1.580 |
| susp:furniture | 0.487 |
| susp:roll | 4.421 |
| susp:slip | 0.081 |
| susp:tell | 2.261 |
| tells | 2.261 |
| the draught | 0.414 |
| weakness taken by overdraw | 0.251 |

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

- Rolling: trait die + Mask d6 / Monster d10, P1 Difficulties, P2 bands, both Critical rules counted.
- The Monster shows when the Monster die is higher than the trait die (+1 Suspicion).
- Abilities: the four standard effects, one charge each, overdraw (+2 Suspicion), P7 teammates at the same location.
- Suspicion: trouble, the Monster showing, Tells, overdraw, loud options and Costs; one roll raises it once by its biggest trigger; never lowered.
- Turns (P4), dawn (P5), group checks (P6), Costs (P3), results (P8) including Grand Year and the left-behind step.
- Local chases (Lead track), capture, rescue at the lock-up, slipping free; the final flight (shared Lead, majority rule, mob Difficulty by party size).
- Carrying: Bulky/Huge carriers, no Mask while carrying, Nimble one size smaller, dropping in the final flight.
- Placeholder content: eight anonymous Entities, Gifts as standard effects, a Castle Duty edge, mob/sunlight Weaknesses, Tells on arrival.

## Not modelled

- Splitting the party; maps, distances and entrances (Huge pieces and small entrances).
- Perks (no placeholder could stand in for real ones).
- Premade raids and hand-built maps (only the random-table generator).
- Storyteller judgement beyond the parameters (what counts as a witness, improvised approaches).

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
