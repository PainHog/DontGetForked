# Don't Get Forked — simulator report: P0 — The rules as decided (through B4, 2026-10-06) with the current numbers (core rules 1.19)

Command: `node sim/run.mjs`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**The Entities are the approved roster** (dice, signatures, Gifts, Perks and Weakness timings read from `module/config.mjs`); towns are rolled with the book's town tables (`sim/town.mjs`). Players follow the policies in `sim/params.mjs`, which are simpler than real play.

## Packages

- **P0**: The rules as decided (through B4, 2026-10-06) with the current numbers.
- **N1**: Retune tried for a party that stays together: final-flight Lead starts at 3; final mob 11 / 12 / 12; Limits 12 / 12 / 14.
- **N2**: Tried for a party that splits up: the night lasts 8 Turns; final mob 10 / 12 / 12 (on target overall, but Hard wins 42% with 3 Entities and 72% with 5).

| Package | Easy win | Standard win | Hard win | Forked E · S · H | Hard captures | Grand Year when tried | Trouble | Mask (raid rolls) | Spend ≥ ½ | Hard win, 3 · 4 · 5 Entities |
|---|---|---|---|---|---|---|---|---|---|---|
| **target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | ≥ 0.2 | ~50% | 10–20% | ≥ 25% | ≥ 50% | close together |
| P0 | 92.4% | 73.9% | 56.0% | 0.4% · 4.7% · 8.9% | 0.35 | 80.5% | 21.8% | 38.7% | 74.4% | 52% · 57% · 59% |
| N1 | 91.9% | 75.0% | 49.5% | 1.2% · 8.5% · 25.4% | 0.34 | 79.4% | 25.2% | 38.5% | 74.1% | 47% · 50% · 52% |
| N2 | 86.9% | 35.6% | 17.9% | 0.1% · 5.4% · 10.8% | 0.23 | — | 19.9% | 35.5% | 59.1% | 6% · 10% · 37% |

## P0 — The rules as decided (through B4, 2026-10-06) with the current numbers against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 92.4% | ✓ |
| Win, standard | 72%–78% | 73.9% | ✓ |
| Win, hard | 55%–60% | 56.0% | ✓ |
| Forked, easy | 0%–2% | 0.4% | ✓ |
| Forked, standard | 3%–7% | 4.7% | ✓ |
| Forked, hard | 8%–12% | 8.9% | ✓ |
| Captures per Hard raid | ≥ 0.2 | 0.35 | ✓ |
| Grand Year when the party goes for furniture | ~50% | 80.5% | ✗ |
| Going for furniture costs the Win | ~20% | 4.3% | ✗ |
| Trouble, share of rolls | 10%–22% | 21.8% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 4.9% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 74.4% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 35.0% (21.4%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 65.0% (78.6%) | ✓ |
| Largest option outlier | within ±2.5 pts | perk The Werewolf:fetch -3.3 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 92.3% | 25.5% | 3.9% | 3.2% | 0.6% | 0.08 | 0.04 | 13% | 0% | 6.4 | 8.2 |
| easy | 4 | 92.5% | 36.6% | 4.0% | 3.1% | 0.4% | 0.08 | 0.03 | 16% | 0% | 6.7 | 8.0 |
| easy | 5 | 92.4% | 39.4% | 4.3% | 3.2% | 0.1% | 0.09 | 0.04 | 16% | 0% | 6.6 | 7.0 |
| standard | 3 | 71.3% | 2.8% | 10.9% | 12.0% | 5.9% | 0.17 | 0.11 | 24% | 0% | 7.7 | 9.1 |
| standard | 4 | 76.0% | 5.0% | 9.8% | 9.7% | 4.5% | 0.17 | 0.10 | 25% | 0% | 7.7 | 8.9 |
| standard | 5 | 74.4% | 11.9% | 10.7% | 11.3% | 3.6% | 0.18 | 0.11 | 28% | 0% | 7.9 | 7.5 |
| hard | 3 | 52.0% | 1.2% | 15.4% | 21.9% | 10.7% | 0.35 | 0.23 | 31% | 9% | 12.1 | 9.3 |
| hard | 4 | 57.0% | 2.1% | 14.6% | 19.3% | 9.1% | 0.35 | 0.23 | 35% | 6% | 12.2 | 8.9 |
| hard | 5 | 59.0% | 6.2% | 16.4% | 17.6% | 7.0% | 0.36 | 0.25 | 37% | 3% | 12.4 | 7.9 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 20.9 | 63.5% | 14.7% | 21.8% | 4.9% | 30.6% | 21.4% | 78.6% | 38.2% | 73.8% |

**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 4.9% | 30.6% | 23.8% | 17.9% | 12.9% | 8.8% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 18.0% | 80.5% | 4.3% | 92.4% | 73.9% | 56.0% |
| always | 71.2% | 54.1% | 16.8% | 89.1% | 61.8% | 46.0% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 92% (+0.0) | 74% (+0.0) | 56% (+0.0) | 8.9% | 0.35 | 21% |
| generous | 90% (-2.2) | 69% (-4.7) | 50% (-6.5) | 13.9% | 0.46 | 17% |
| strict | 83% (-9.8) | 54% (-19.7) | 31% (-25.0) | 15.3% | 0.53 | 14% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 95% (+2.7) | 81% (+6.6) | 63% (+8.0) | 4.2% | 0.33 | 24% |
| critRule = "beat6" (rule) | 94% (+1.3) | 77% (+2.6) | 58% (+3.8) | 7.2% | 0.37 | 23% |
| critRule = "beat7" (rule) | 93% (+0.3) | 75% (+0.7) | 56% (+1.8) | 8.9% | 0.38 | 22% |
| critEffect = "none" (rule) | 92% (-0.9) | 73% (-2.0) | 53% (-1.6) | 11.9% | 0.39 | 21% |
| critEffect = "lead2" (rule) | 92% (-0.1) | 74% (-0.7) | 54% (-0.9) | 9.9% | 0.38 | 21% |
| critEffect = "charge" (rule) | 92% (-0.8) | 73% (-1.3) | 54% (-0.6) | 11.5% | 0.38 | 21% |
| costChoice = "suspicion" (rule) | 92% (-0.9) | 73% (-1.8) | 54% (-0.9) | 10.1% | 0.36 | 19% |
| costChoice = "lenient" (rule) | 93% (+0.5) | 76% (+1.1) | 57% (+2.4) | 9.5% | 0.39 | 22% |
| dropRule = "lost" (rule) | 90% (-2.9) | 70% (-4.8) | 50% (-4.8) | 9.3% | 0.38 | 21% |
| dropRule = "extrasOnly" (rule) | 92% (-0.2) | 74% (-0.8) | 54% (-0.5) | 9.4% | 0.38 | 21% |
| loudRule = "witness" (rule) | 92% (-0.3) | 75% (+0.3) | 55% (+0.5) | 9.1% | 0.37 | 21% |
| loudRule = "both" (rule) | 92% (-0.6) | 75% (+0.4) | 54% (-0.1) | 9.2% | 0.38 | 21% |
| loudRule = "none" (rule) | 93% (+0.9) | 77% (+2.1) | 57% (+2.9) | 8.7% | 0.36 | 22% |
| openApproach = "quiet" (rule) | 91% (-1.1) | 75% (+0.1) | 53% (-1.3) | 10.0% | 0.32 | 17% |
| openApproach = "switch" (rule) | 89% (-3.4) | 70% (-4.5) | 49% (-6.0) | 11.6% | 0.42 | 14% |
| overdrawAtLimit = "weakness" (rule) | 92% (-0.1) | 75% (-0.1) | 54% (-0.1) | 9.7% | 0.38 | 21% |
| overdrawAtLimit = "free" (rule) | 93% (+0.1) | 76% (+1.3) | 56% (+1.5) | 3.1% | 0.38 | 24% |
| overdrawAtLimit = "forbidden" (rule) | 92% (-0.1) | 75% (-0.1) | 54% (-0.5) | 10.1% | 0.38 | 21% |
| overdrawAtLimit = "fury" (rule) | 88% (-4.4) | 70% (-4.7) | 48% (-6.5) | 36.2% | 0.38 | 21% |
| raiseCap = "perDie" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.4% | 0.38 | 21% |
| raiseDie = "any" (rule) | 92% (-0.6) | 75% (+0.5) | 55% (+0.3) | 9.5% | 0.36 | 22% |
| openTrait = "any" (rule) | 92% (-0.3) | 75% (+0.8) | 54% (-0.9) | 10.9% | 0.36 | 23% |
| waysIn = "one" (rule) | 89% (-3.8) | 66% (-8.3) | 48% (-6.9) | 10.7% | 0.43 | 17% |
| overdrawStack = "stack" (rule) | 92% (-0.5) | 74% (-0.7) | 55% (+0.0) | 9.6% | 0.39 | 21% |
| lootHandover = "none" (rule) | 92% (-0.5) | 74% (-0.6) | 54% (-0.9) | 9.3% | 0.38 | 21% |
| chaseTable = "placeholder" (content) | 92% (-0.9) | 75% (-0.1) | 54% (-0.2) | 8.2% | 0.37 | 21% |
| chaseTable = "B" (content) | 93% (+1.0) | 77% (+1.9) | 58% (+3.4) | 3.7% | 0.36 | 23% |
| chaseTable = "C" (content) | 93% (+0.1) | 75% (+0.2) | 56% (+1.3) | 7.8% | 0.37 | 22% |
| partyPolicy = "together" (policy) | 89% (-3.1) | 35% (-39.4) | 16% (-38.6) | 7.4% | 0.33 | 23% |
| partyPolicy = "singles" (policy) | 90% (-2.4) | 75% (+0.5) | 54% (-0.4) | 9.5% | 0.36 | 22% |
| captiveItems = "kept" (rule) | 93% (+0.5) | 76% (+1.2) | 56% (+1.1) | 9.4% | 0.38 | 21% |
| multiCaught = "separate" (rule) | 92% (-0.1) | 75% (+0.0) | 55% (+0.1) | 9.5% | 0.38 | 21% |
| monsterRule = "plus1" (rule) | 94% (+1.8) | 83% (+8.0) | 66% (+11.4) | 6.6% | 0.42 | 12% |
| monsterRule = "tie" (rule) | 94% (+1.3) | 81% (+6.1) | 65% (+10.1) | 6.6% | 0.42 | 15% |
| monsterRule = "d8" (rule) | 90% (-2.0) | 73% (-1.9) | 51% (-3.7) | 18.3% | 0.59 | 16% |
| monsterRule = "maskSafe" (rule) | 100% (+7.1) | 97% (+22.6) | 95% (+40.7) | 0.4% | 0.00 | 59% |
| chaseSusp = "no" (rule) | 97% (+4.4) | 85% (+9.9) | 64% (+9.7) | 5.7% | 0.51 | 26% |
| slipRule = "cost" (rule) | 93% (+0.3) | 75% (+0.2) | 55% (+0.6) | 9.5% | 0.38 | 21% |
| furnitureRule = "slow" (rule) | 93% (+0.3) | 75% (+0.8) | 55% (+0.4) | 9.1% | 0.38 | 22% |
| furnitureRule = "base" (rule) | 93% (+0.3) | 75% (+0.8) | 55% (+0.4) | 9.1% | 0.38 | 22% |
| furnitureRule = "hardLoc" (rule) | 93% (+0.1) | 75% (+0.4) | 55% (+0.3) | 9.1% | 0.38 | 22% |
| furnitureRule = "noisy" (rule) | 92% (+0.0) | 75% (+0.4) | 55% (+0.2) | 9.3% | 0.38 | 22% |
| furnitureRule = "both" (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.4% | 0.38 | 21% |
| furnitureRule = "noisySlow" (rule) | 92% (+0.0) | 75% (+0.4) | 55% (+0.2) | 9.3% | 0.38 | 22% |
| furnitureRule = "slowHard" (rule) | 93% (+0.1) | 75% (+0.4) | 55% (+0.3) | 9.1% | 0.38 | 22% |
| furnitureRule = "slowWatched" (rule) | 92% (-0.2) | 75% (+0.7) | 55% (+0.5) | 9.0% | 0.38 | 22% |
| corneredAtLimit = "flight" (rule) | 93% (+0.3) | 77% (+1.9) | 57% (+2.5) | 9.1% | 0.31 | 21% |
| fetchRule = "pickup" (rule) | 92% (+0.0) | 74% (-0.2) | 54% (-0.5) | 10.5% | 0.38 | 21% |
| fetchRule = "keeper" (rule) | 92% (+0.0) | 74% (-0.2) | 54% (-0.5) | 10.5% | 0.38 | 21% |
| fetchRule = "carry" (rule) | 92% (+0.0) | 74% (-0.2) | 54% (-0.5) | 10.5% | 0.38 | 21% |
| fetchRule = "grab" (rule) | 92% (+0.0) | 74% (-0.2) | 54% (-0.4) | 10.5% | 0.38 | 21% |
| fetchRule = "lockup" (rule) | 93% (+0.1) | 75% (-0.1) | 54% (-0.4) | 10.5% | 0.38 | 21% |
| alreadyDeadTurns = 2 (rule) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.4% | 0.38 | 21% |
| furniturePlace = "separate" (rule) | 93% (+0.1) | 75% (+0.4) | 57% (+2.4) | 9.2% | 0.36 | 23% |
| exitRule = "free" (rule) | 90% (-2.3) | 66% (-9.1) | 42% (-12.7) | 14.3% | 0.53 | 20% |
| exitRule = "gate" (rule) | 90% (-2.3) | 66% (-9.1) | 42% (-12.7) | 14.3% | 0.53 | 20% |
| exitRule = "gateCarriers" (rule) | 93% (+0.6) | 77% (+2.3) | 60% (+5.5) | 6.8% | 0.32 | 22% |
| groupRule = "best3" (rule) | 93% (+0.3) | 74% (-0.3) | 56% (+1.1) | 8.9% | 0.38 | 21% |
| groupRule = "best4" (rule) | 93% (+0.3) | 74% (-0.3) | 56% (+1.1) | 8.9% | 0.38 | 21% |
| tellScope = "entity" (rule) | 91% (-1.1) | 72% (-2.9) | 53% (-1.5) | 9.6% | 0.37 | 21% |
| triesPerTurn = "one" (rule) | 93% (+0.2) | 75% (+0.7) | 55% (+0.2) | 9.9% | 0.37 | 21% |
| monsterPolicy = "mask" (policy) | 90% (-2.1) | 70% (-4.5) | 41% (-13.9) | 6.2% | 0.88 | 77% |
| monsterPolicy = "monster" (policy) | 88% (-4.3) | 58% (-16.6) | 50% (-4.4) | 11.6% | 0.31 | 0% |
| caughtWeight = 0.4 (policy) | 90% (-2.7) | 73% (-1.7) | 54% (-0.3) | 9.5% | 0.42 | 23% |
| caughtWeight = 2 (policy) | 93% (+0.5) | 75% (+0.6) | 52% (-2.5) | 9.1% | 0.31 | 20% |
| chargePolicy = "hoard" (policy) | 86% (-6.3) | 60% (-14.4) | 40% (-14.3) | 10.8% | 0.41 | 22% |
| furniturePolicy = "never" (policy) | 93% (+0.7) | 75% (+0.6) | 55% (+0.4) | 9.1% | 0.38 | 23% |
| furniturePolicy = "always" (policy) | 90% (-2.3) | 63% (-11.7) | 46% (-8.7) | 15.5% | 0.38 | 15% |
| roster = "placeholder" (content) | 92% (-0.4) | 76% (+1.2) | 55% (+0.9) | 8.7% | 0.40 | 26% |
| roster = "proposed" (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.4% | 0.38 | 21% |
| dutyEdge = false (content) | 92% (-0.5) | 74% (-0.6) | 53% (-1.1) | 9.7% | 0.39 | 21% |
| tellPartyChance = 0.3333333333333333 (rule) | 93% (+0.3) | 78% (+3.1) | 57% (+2.0) | 8.7% | 0.38 | 21% |
| tellPartyChance = 0.6666666666666666 (rule) | 92% (-0.7) | 72% (-2.9) | 52% (-2.6) | 10.7% | 0.38 | 21% |
| tellChance = 0 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.4% | 0.38 | 21% |
| tellChance = 0.3333333333333333 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.4% | 0.38 | 21% |
| weaknessRule = "chance" (content) | 92% (-0.1) | 75% (+0.5) | 58% (+3.5) | 7.8% | 0.36 | 22% |
| weaknessRule = "always" (content) | 92% (-0.9) | 73% (-2.1) | 52% (-2.5) | 12.8% | 0.41 | 21% |
| weaknessRule = "soon" (content) | 92% (-0.2) | 75% (+0.7) | 55% (+0.9) | 8.5% | 0.36 | 21% |
| weaknessRule = "table" (content) | 93% (+0.1) | 76% (+0.9) | 56% (+1.5) | 8.4% | 0.36 | 22% |
| weaknessLocal = 0 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.4% | 0.38 | 21% |
| weaknessLocal = 0.5 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.4% | 0.38 | 21% |
| weaknessFinal = 0.25 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.4% | 0.38 | 21% |
| weaknessFinal = 1 (content) | 92% (+0.0) | 75% (+0.0) | 55% (+0.0) | 9.4% | 0.38 | 21% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift The Werewolf:Through the Hedge +3.0 · entity Dracula +2.9 · entity A Ghost +2.5 · gift Frankenstein’s Creature:Mountain Stride +2.3 · perk Jekyll & Hyde:bruteStrength +2.2 · gift The Invisible Man:Through the Gap +2.1 · perk A Ghost:alreadyDead +2.0 · perk The Werewolf:shortcut +1.6 · perk The Werewolf:nightRunner +1.6 · gift Jekyll & Hyde:Trample +1.6 · gift Dracula:Bat +1.5 · entity The Invisible Man +1.4 · gift The Mummy:Royal Bearing +1.4 · gift A Witch:Black Cat +1.3 · perk Frankenstein’s Creature:strongBack +1.1 · perk The Mummy:patienceOfAges +1.0 · perk Frankenstein’s Creature:builtToLast +0.9 · perk The Invisible Man:outOfSight +0.9 · gift A Ghost:Whisper +0.8 · duty cook +0.6 · duty gardener +0.5 · gift Frankenstein’s Creature:Hovel Watcher +0.5 · gift Jekyll & Hyde:Pillar of Society +0.5 · perk Dracula:wallCrawler +0.3 · perk Dracula:hypnoticEyes +0.3 · perk A Ghost:spectral +0.3 · perk A Witch:familiarsWarning +0.2 · perk A Witch:flyByNight +0.1 · gift Dracula:Wolf +0.1 · gift A Witch:A Potion for That +0.1 · perk The Invisible Man:hiddenPockets +0.1 · gift A Ghost:Fade +0.0 · duty handyman -0.0 · gift The Mummy:Just a Costume -0.1 · duty librarian -0.2 · perk A Witch:wiseWoman -0.2 · duty butler -0.3 · perk The Mummy:fearTheCurse -0.3 · perk Jekyll & Hyde:practisedHand -0.4 · entity The Werewolf -0.5 · duty tailor -0.5 · perk Dracula:oldMoney -0.6 · gift A Ghost:Chill -0.8 · perk The Mummy:keeperOfTreasures -0.8 · gift The Invisible Man:Poltergeist -0.8 · gift The Werewolf:Howl -0.9 · perk The Invisible Man:lightStep -0.9 · entity Frankenstein’s Creature -1.0 · entity The Mummy -1.1 · gift The Mummy:Old Curse -1.3 · gift The Invisible Man:Work It Out -1.3 · gift A Witch:Broomstick -1.4 · entity A Witch -1.6 · gift Dracula:Mist -1.6 · perk Jekyll & Hyde:steadyNerves -1.8 · gift Jekyll & Hyde:Doctor’s Bag -2.0 · perk Frankenstein’s Creature:tireless -2.1 · gift The Werewolf:Keen Nose -2.1 · perk A Ghost:rattle -2.3 · entity Jekyll & Hyde -2.6 · gift Frankenstein’s Creature:Book-Learned -2.7 · perk The Werewolf:fetch -3.3

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 12747 | 0.708 |
| a die stepped below d4 (floored at d4) | 10133 | 0.563 |
| suspicion past the Limit (lost) | 1 | 0.000 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:form | 0.377 |
| ability:hidden | 3.382 |
| ability:open | 3.264 |
| ability:raise | 1.392 |
| ability:switch | 1.524 |
| already dead: drifted off | 0.013 |
| captive rescued | 0.023 |
| captive slipped free | 0.054 |
| captures | 0.204 |
| charges regained by a Critical | 0.539 |
| charges spent | 9.395 |
| cost:drop | 0.094 |
| cost:stepdown | 0.456 |
| cost:suspicion | 0.317 |
| cost:turn | 0.415 |
| declined rolls | 0.376 |
| final flight escaped | 0.224 |
| final flight rounds | 2.299 |
| final flight: dawn | 0.020 |
| final flight: limit | 0.251 |
| forked | 0.047 |
| furniture dropped: carrier captured | 0.000 |
| furniture dropped: final flight | 0.007 |
| group checks | 2.511 |
| group: forced low-value roll | 0.029 |
| Hyde takes over | 0.295 |
| local chase ended by the Limit | 0.161 |
| local chase escaped | 0.170 |
| local chases | 0.498 |
| local chases (shared) | 0.005 |
| loot handed over | 1.343 |
| lost turns | 0.481 |
| opened: only the opener goes on | 1.239 |
| overdraws:final | 0.274 |
| overdraws:local | 0.132 |
| overdraws:raid | 0.138 |
| practised hand | 0.076 |
| susp:chase | 1.593 |
| susp:furniture | 0.487 |
| susp:roll | 4.425 |
| susp:slip | 0.081 |
| susp:tell | 2.260 |
| tells | 2.260 |
| the draught | 0.453 |
| weakness taken by overdraw | 0.272 |

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
