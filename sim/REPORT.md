# Don't Get Forked — simulator report: P0 — Decided rules (S1–S11, T1–T10) with the approved numbers (S9, S10) (rough, core rules draft 0.2)

Command: `node sim/run.mjs`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**Everything here runs on placeholder content** (eight anonymous Entities, generated towns, placeholder Gifts, Duties, Weaknesses and Tells; see `sim/entities.mjs`). The numbers measure the core rules and the numbers in `sim/params.mjs`, not the finished game.

## Packages

- **P0**: Decided rules (S1–S11, T1–T10) with the approved numbers (S9, S10).
- **N1**: Retune tried for a party that stays together: final-flight Lead starts at 3; final mob 11 / 12 / 12; Limits 12 / 12 / 14.
- **N2**: Tried for a party that splits up: the night lasts 8 Turns; final mob 10 / 12 / 12 (on target overall, but Hard wins 42% with 3 Entities and 72% with 5).

| Package | Easy win | Standard win | Hard win | Forked E · S · H | Hard captures | Grand Year when tried | Trouble | Mask (raid rolls) | Spend ≥ ½ | Hard win, 3 · 4 · 5 Entities |
|---|---|---|---|---|---|---|---|---|---|---|
| **target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | ≥ 0.2 | ~50% | 10–20% | ≥ 25% | ≥ 50% | close together |
| P0 | 95.0% | 83.7% | 69.0% | 0.1% · 1.9% · 3.5% | 0.34 | 88.5% | 18.3% | 40.9% | 65.4% | 66% · 68% · 73% |
| N1 | 95.0% | 81.8% | 66.7% | 0.3% · 4.5% · 8.1% | 0.33 | 88.1% | 22.0% | 42.2% | 66.8% | 64% · 66% · 70% |
| N2 | 94.8% | 67.7% | 48.7% | 0.0% · 2.9% · 4.1% | 0.25 | 93.2% | 17.4% | 38.0% | 53.4% | 36% · 40% · 71% |

## P0 — Decided rules (S1–S11, T1–T10) with the approved numbers (S9, S10) against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 95.0% | ✗ |
| Win, standard | 72%–78% | 83.7% | ✗ |
| Win, hard | 55%–60% | 69.0% | ✗ |
| Forked, easy | 0%–2% | 0.1% | ✓ |
| Forked, standard | 3%–7% | 1.9% | ✗ |
| Forked, hard | 8%–12% | 3.5% | ✗ |
| Captures per Hard raid | ≥ 0.2 | 0.34 | ✓ |
| Grand Year when the party goes for furniture | ~50% | 88.5% | ✗ |
| Going for furniture costs the Win | ~20% | 2.8% | ✗ |
| Trouble, share of rolls | 10%–22% | 18.3% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 5.2% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 65.4% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 36.7% (26.8%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 63.3% (73.2%) | ✓ |
| Largest option outlier | within ±2.5 pts | gift E3:open 3.4 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 93.8% | 58.2% | 1.8% | 4.0% | 0.4% | 0.10 | 0.03 | 7% | 0% | 4.9 | 7.7 |
| easy | 4 | 95.5% | 64.4% | 1.4% | 3.1% | 0.1% | 0.10 | 0.02 | 6% | 0% | 4.8 | 7.6 |
| easy | 5 | 95.8% | 63.9% | 1.9% | 2.3% | 0.1% | 0.09 | 0.03 | 5% | 0% | 4.7 | 6.3 |
| standard | 3 | 81.5% | 15.2% | 8.3% | 7.8% | 2.4% | 0.21 | 0.07 | 15% | 0% | 7.7 | 8.8 |
| standard | 4 | 83.9% | 21.9% | 8.0% | 6.6% | 1.7% | 0.21 | 0.08 | 14% | 0% | 7.4 | 8.6 |
| standard | 5 | 85.7% | 33.0% | 7.3% | 5.4% | 1.6% | 0.20 | 0.06 | 14% | 0% | 7.4 | 7.6 |
| hard | 3 | 66.0% | 8.0% | 14.8% | 14.4% | 4.8% | 0.33 | 0.15 | 23% | 0% | 10.9 | 9.0 |
| hard | 4 | 68.2% | 11.8% | 14.5% | 13.7% | 3.6% | 0.35 | 0.16 | 25% | 0% | 10.9 | 8.7 |
| hard | 5 | 72.9% | 20.0% | 12.0% | 12.8% | 2.3% | 0.35 | 0.17 | 22% | 0% | 10.7 | 7.8 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 15.6 | 68.1% | 13.6% | 18.3% | 5.2% | 35.9% | 26.8% | 73.2% | 34.5% | 65.2% |

**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.2% | 35.9% | 28.6% | 22.0% | 16.4% | 11.5% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 37.2% | 88.5% | 2.8% | 95.0% | 83.7% | 69.0% |
| always | 73.3% | 78.5% | 6.2% | 95.1% | 82.8% | 67.3% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 95% (+0.0) | 84% (+0.0) | 69% (+0.0) | 3.5% | 0.34 | 27% |
| generous | 93% (-1.8) | 80% (-3.3) | 69% (+0.1) | 4.9% | 0.36 | 18% |
| strict | 85% (-10.4) | 62% (-21.5) | 45% (-23.6) | 6.1% | 0.47 | 14% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then placeholder content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 96% (+0.9) | 86% (+2.3) | 73% (+3.4) | 1.0% | 0.31 | 30% |
| critRule = "beat6" (rule) | 95% (+0.5) | 85% (+1.0) | 72% (+2.4) | 1.6% | 0.32 | 28% |
| critRule = "beat7" (rule) | 95% (+0.4) | 84% (+0.6) | 71% (+1.3) | 2.3% | 0.32 | 27% |
| critEffect = "none" (rule) | 95% (-0.3) | 83% (-1.1) | 69% (-1.0) | 4.1% | 0.33 | 26% |
| critEffect = "lead2" (rule) | 95% (-0.1) | 84% (-0.1) | 69% (-0.2) | 3.2% | 0.33 | 27% |
| critEffect = "charge" (rule) | 95% (-0.1) | 83% (-0.7) | 69% (-0.8) | 3.7% | 0.33 | 26% |
| costChoice = "suspicion" (rule) | 95% (+0.1) | 84% (+0.0) | 69% (-1.0) | 2.7% | 0.33 | 26% |
| costChoice = "lenient" (rule) | 95% (+0.1) | 85% (+0.7) | 69% (-0.4) | 3.0% | 0.35 | 27% |
| dropRule = "lost" (rule) | 92% (-3.1) | 79% (-5.1) | 63% (-6.3) | 2.9% | 0.33 | 27% |
| dropRule = "extrasOnly" (rule) | 95% (+0.0) | 84% (+0.0) | 70% (+0.1) | 2.9% | 0.33 | 27% |
| loudRule = "witness" (rule) | 95% (-0.2) | 84% (-0.2) | 70% (+0.0) | 3.4% | 0.35 | 27% |
| loudRule = "both" (rule) | 95% (-0.3) | 84% (-0.1) | 70% (+0.2) | 3.3% | 0.33 | 27% |
| loudRule = "none" (rule) | 95% (+0.1) | 85% (+0.8) | 70% (+0.1) | 3.1% | 0.35 | 27% |
| openApproach = "quiet" (rule) | 95% (+0.1) | 84% (+0.4) | 72% (+2.5) | 2.4% | 0.26 | 17% |
| openApproach = "switch" (rule) | 93% (-2.1) | 79% (-5.1) | 61% (-8.7) | 4.0% | 0.40 | 14% |
| overdrawAtLimit = "free" (rule) | 95% (+0.0) | 84% (+0.2) | 70% (+0.5) | 1.5% | 0.33 | 28% |
| overdrawAtLimit = "forbidden" (rule) | 95% (+0.0) | 84% (+0.0) | 70% (+0.0) | 3.1% | 0.33 | 27% |
| overdrawAtLimit = "fury" (rule) | 94% (-1.2) | 80% (-3.4) | 66% (-3.9) | 17.3% | 0.33 | 26% |
| raiseCap = "perDie" (rule) | 95% (+0.0) | 84% (+0.0) | 70% (+0.0) | 3.1% | 0.33 | 27% |
| raiseDie = "any" (rule) | 95% (+0.2) | 84% (-0.3) | 70% (+0.4) | 2.5% | 0.32 | 27% |
| openTrait = "any" (rule) | 96% (+0.9) | 85% (+1.2) | 69% (-0.4) | 3.9% | 0.34 | 30% |
| waysIn = "one" (rule) | 92% (-3.1) | 80% (-3.5) | 63% (-6.8) | 4.0% | 0.42 | 21% |
| overdrawStack = "stack" (rule) | 95% (-0.1) | 84% (-0.3) | 69% (-0.4) | 3.4% | 0.33 | 27% |
| partyPolicy = "together" (policy) | 92% (-2.4) | 72% (-11.7) | 55% (-14.2) | 2.7% | 0.30 | 25% |
| partyPolicy = "singles" (policy) | 95% (+0.1) | 85% (+1.5) | 70% (+0.5) | 2.9% | 0.33 | 27% |
| captiveItems = "kept" (rule) | 96% (+0.9) | 86% (+2.2) | 73% (+3.0) | 3.1% | 0.33 | 27% |
| multiCaught = "separate" (rule) | 95% (+0.0) | 84% (-0.3) | 69% (-0.1) | 3.1% | 0.33 | 27% |
| monsterRule = "plus1" (rule) | 96% (+1.3) | 89% (+4.8) | 76% (+6.1) | 2.0% | 0.41 | 14% |
| monsterRule = "tie" (rule) | 96% (+1.0) | 88% (+4.1) | 75% (+5.4) | 2.2% | 0.40 | 18% |
| monsterRule = "d8" (rule) | 95% (-0.3) | 81% (-2.5) | 64% (-5.8) | 6.9% | 0.60 | 18% |
| monsterRule = "maskSafe" (rule) | 100% (+4.9) | 99% (+15.5) | 99% (+29.2) | 0.1% | 0.00 | 65% |
| chaseSusp = "no" (rule) | 97% (+2.0) | 88% (+4.3) | 76% (+6.7) | 0.9% | 0.48 | 33% |
| slipRule = "cost" (rule) | 95% (+0.1) | 84% (+0.5) | 70% (+0.7) | 3.3% | 0.33 | 27% |
| furnitureRule = "base" (rule) | 95% (+0.0) | 84% (+0.0) | 70% (+0.0) | 3.1% | 0.33 | 27% |
| furnitureRule = "hardLoc" (rule) | 94% (-0.7) | 84% (-0.3) | 70% (+0.1) | 3.1% | 0.33 | 26% |
| furnitureRule = "noisy" (rule) | 94% (-0.5) | 84% (+0.2) | 70% (+0.1) | 3.3% | 0.32 | 25% |
| furnitureRule = "both" (rule) | 94% (-1.0) | 84% (-0.3) | 70% (+0.0) | 3.3% | 0.32 | 24% |
| furnitureRule = "noisySlow" (rule) | 94% (-0.5) | 84% (+0.2) | 70% (+0.1) | 3.3% | 0.32 | 25% |
| furniturePlace = "separate" (rule) | 96% (+0.7) | 84% (+0.0) | 69% (-0.5) | 1.9% | 0.35 | 27% |
| exitRule = "free" (rule) | 92% (-2.5) | 75% (-9.1) | 62% (-7.5) | 4.9% | 0.40 | 23% |
| exitRule = "gate" (rule) | 92% (-2.5) | 75% (-9.1) | 62% (-7.5) | 4.9% | 0.40 | 23% |
| exitRule = "gateCarriers" (rule) | 95% (+0.5) | 87% (+2.7) | 72% (+2.4) | 2.4% | 0.30 | 26% |
| groupRule = "best3" (rule) | 95% (+0.3) | 84% (-0.1) | 70% (+0.1) | 3.0% | 0.33 | 27% |
| groupRule = "best4" (rule) | 95% (+0.3) | 84% (+0.0) | 70% (+0.1) | 3.0% | 0.33 | 27% |
| tellScope = "entity" (rule) | 94% (-1.1) | 83% (-0.7) | 69% (-0.1) | 3.3% | 0.32 | 27% |
| triesPerTurn = "one" (rule) | 95% (+0.1) | 84% (-0.3) | 68% (-1.2) | 3.1% | 0.33 | 27% |
| monsterPolicy = "mask" (policy) | 92% (-3.3) | 73% (-10.8) | 52% (-17.6) | 1.4% | 0.89 | 88% |
| monsterPolicy = "monster" (policy) | 94% (-1.1) | 79% (-4.5) | 67% (-2.6) | 5.3% | 0.31 | 0% |
| caughtWeight = 0.4 (policy) | 95% (-0.1) | 83% (-1.3) | 70% (+0.7) | 3.2% | 0.35 | 27% |
| caughtWeight = 2 (policy) | 95% (-0.2) | 85% (+0.7) | 67% (-3.0) | 2.9% | 0.28 | 25% |
| chargePolicy = "hoard" (policy) | 93% (-2.3) | 76% (-7.6) | 56% (-13.9) | 3.3% | 0.37 | 24% |
| furniturePolicy = "never" (policy) | 95% (+0.5) | 84% (+0.2) | 69% (-0.1) | 2.9% | 0.32 | 28% |
| furniturePolicy = "always" (policy) | 95% (+0.3) | 84% (+0.1) | 67% (-2.5) | 3.6% | 0.35 | 25% |
| roster = "candidateA" (content) | 95% (+0.1) | 84% (+0.0) | 70% (+0.6) | 4.8% | 0.31 | 26% |
| dutyEdge = false (content) | 95% (-0.1) | 85% (+0.7) | 68% (-1.5) | 3.2% | 0.33 | 27% |
| tellChance = 0 (content) | 96% (+0.9) | 86% (+2.1) | 74% (+4.7) | 2.2% | 0.34 | 27% |
| tellChance = 0.3333333333333333 (content) | 95% (+0.0) | 82% (-2.1) | 68% (-1.7) | 4.4% | 0.32 | 26% |
| weaknessLocal = 0 (content) | 95% (+0.2) | 84% (+0.4) | 70% (+0.7) | 2.7% | 0.31 | 27% |
| weaknessLocal = 0.5 (content) | 95% (-0.1) | 83% (-0.7) | 69% (-0.8) | 3.3% | 0.34 | 27% |
| weaknessFinal = 0.25 (content) | 95% (+0.0) | 84% (+0.0) | 70% (+0.1) | 2.7% | 0.33 | 27% |
| weaknessFinal = 1 (content) | 95% (+0.0) | 83% (-0.5) | 69% (-0.3) | 4.6% | 0.33 | 26% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift E3:open +3.4 · gift E5:open +2.6 · gift E2:open +2.4 · gift E1:open +2.3 · gift E7:open +2.0 · gift E6:open +1.7 · entity E4 +1.6 · gift E4:switch +1.2 · entity E8 +1.2 · gift E8:hidden +1.1 · entity E2 +0.9 · gift E1:switch +0.5 · duty K3 +0.5 · gift E2:hidden +0.3 · duty K2 +0.2 · duty K5 +0.1 · duty K6 +0.1 · duty K1 +0.0 · entity E7 -0.1 · gift E8:switch -0.3 · gift E4:hidden -0.4 · gift E6:hidden -0.4 · entity E3 -0.5 · gift E7:switch -0.6 · entity E6 -0.7 · gift E8:raise -0.7 · gift E4:raise -0.8 · duty K4 -0.8 · entity E1 -0.9 · gift E5:hidden -0.9 · gift E3:raise -1.1 · gift E6:raise -1.2 · entity E5 -1.4 · gift E7:raise -1.5 · gift E5:switch -1.6 · gift E3:switch -2.3 · gift E2:raise -2.8 · gift E1:hidden -2.8

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 12080 | 0.671 |
| a die stepped below d4 (floored at d4) | 108 | 0.006 |
| final flight stalled (no end after max rounds) | 100 | 0.006 |
| suspicion past the Limit (lost) | 1 | 0.000 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:hidden | 2.533 |
| ability:open | 3.812 |
| ability:raise | 1.000 |
| ability:switch | 1.131 |
| captive rescued | 0.043 |
| captive slipped free | 0.088 |
| captures | 0.216 |
| charges regained by a Critical | 0.470 |
| charges spent | 8.298 |
| cost:drop | 0.078 |
| cost:stepdown | 0.359 |
| cost:suspicion | 0.252 |
| cost:turn | 0.364 |
| declined rolls | 0.286 |
| final flight escaped | 0.120 |
| final flight with nobody free | 0.000 |
| final flight: dawn | 0.000 |
| final flight: limit | 0.144 |
| forked | 0.019 |
| furniture dropped: carrier captured | 0.001 |
| furniture dropped: final flight | 0.002 |
| group checks | 2.162 |
| group: forced low-value roll | 0.017 |
| local chase ended by the Limit | 0.098 |
| local chase escaped | 0.126 |
| local chases | 0.436 |
| local chases (shared) | 0.005 |
| lost turns | 0.421 |
| opened: only the opener goes on | 1.360 |
| overdraws:final | 0.001 |
| overdraws:local | 0.071 |
| overdraws:raid | 0.107 |
| overdraws:slip | 0.000 |
| susp:chase | 1.372 |
| susp:roll | 4.110 |
| susp:slip | 0.128 |
| susp:tell | 2.113 |
| tells | 2.113 |
| weakness taken by overdraw | 0.001 |

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
 "overdrawSuspicion": 2,
 "lead": {
  "localStart": 1,
  "localEscape": 4,
  "finalStart": 2,
  "finalEscape": 6
 },
 "localMob": {
  "base": 10,
  "perSuspicion": 0.5,
  "max": 12
 },
 "finalMobPerExtraEntity": 0,
 "maxChaseRounds": 20,
 "furyCap": 3,
 "furyLambda": 0.25,
 "labels": {
  "easy": {
   "items": 3,
   "essentials": [
    1
   ],
   "limit": 12,
   "turns": 12,
   "finalMob": 10,
   "lockup": 10,
   "exit": 6,
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
   "items": 4,
   "essentials": [
    1,
    2
   ],
   "limit": 13,
   "turns": 12,
   "finalMob": 11,
   "lockup": 10,
   "exit": 8,
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
   "items": 4,
   "essentials": [
    2
   ],
   "limit": 15,
   "turns": 12,
   "finalMob": 11,
   "lockup": 12,
   "exit": 8,
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
