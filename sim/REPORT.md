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
| P0 | 94.8% | 84.5% | 68.6% | 0.3% · 2.1% · 4.0% | 0.35 | 90.1% | 18.9% | 40.8% | 68.0% | 66% · 69% · 71% |
| N1 | 94.8% | 82.1% | 65.4% | 0.3% · 5.1% · 8.4% | 0.34 | 89.6% | 22.7% | 42.1% | 69.3% | 63% · 66% · 68% |
| N2 | 95.1% | 73.4% | 54.9% | 0.1% · 3.2% · 4.8% | 0.26 | 95.3% | 18.5% | 37.7% | 56.2% | 42% · 51% · 72% |

## P0 — Decided rules (S1–S11, T1–T10) with the approved numbers (S9, S10) against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 94.8% | ✗ |
| Win, standard | 72%–78% | 84.5% | ✗ |
| Win, hard | 55%–60% | 68.6% | ✗ |
| Forked, easy | 0%–2% | 0.3% | ✓ |
| Forked, standard | 3%–7% | 2.1% | ✗ |
| Forked, hard | 8%–12% | 4.0% | ✗ |
| Captures per Hard raid | ≥ 0.2 | 0.35 | ✓ |
| Grand Year when the party goes for furniture | ~50% | 90.1% | ✗ |
| Going for furniture costs the Win | ~20% | 2.6% | ✗ |
| Trouble, share of rolls | 10%–22% | 18.9% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 5.1% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 68.0% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 36.6% (26.1%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 63.4% (73.9%) | ✓ |
| Largest option outlier | within ±2.5 pts | gift E1:open 3.9 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 93.8% | 66.6% | 1.7% | 4.0% | 0.4% | 0.11 | 0.03 | 6% | 0% | 5.1 | 7.6 |
| easy | 4 | 94.5% | 79.8% | 1.8% | 3.5% | 0.2% | 0.11 | 0.02 | 7% | 0% | 5.1 | 7.3 |
| easy | 5 | 95.9% | 73.5% | 1.4% | 2.5% | 0.3% | 0.10 | 0.02 | 6% | 0% | 4.9 | 6.3 |
| standard | 3 | 83.0% | 18.7% | 8.8% | 5.9% | 2.4% | 0.20 | 0.06 | 16% | 0% | 7.9 | 8.5 |
| standard | 4 | 84.8% | 30.9% | 7.5% | 5.1% | 2.6% | 0.21 | 0.06 | 15% | 0% | 7.7 | 8.0 |
| standard | 5 | 85.7% | 39.8% | 7.8% | 5.3% | 1.3% | 0.22 | 0.05 | 14% | 0% | 7.7 | 7.2 |
| hard | 3 | 65.9% | 10.2% | 15.6% | 13.6% | 4.9% | 0.33 | 0.13 | 26% | 0% | 11.2 | 8.7 |
| hard | 4 | 68.9% | 18.9% | 14.9% | 11.9% | 4.3% | 0.35 | 0.13 | 29% | 0% | 11.3 | 8.0 |
| hard | 5 | 71.0% | 25.1% | 14.0% | 12.3% | 2.7% | 0.37 | 0.15 | 26% | 0% | 11.1 | 7.4 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 16.6 | 67.4% | 13.8% | 18.9% | 5.1% | 35.0% | 26.1% | 73.9% | 34.9% | 67.5% |

**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.1% | 35.0% | 27.8% | 21.4% | 15.8% | 11.0% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 44.8% | 90.1% | 2.6% | 94.8% | 84.5% | 68.6% |
| always | 84.2% | 81.0% | 6.1% | 94.9% | 83.0% | 67.2% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 95% (+0.0) | 84% (+0.0) | 69% (+0.0) | 4.0% | 0.35 | 26% |
| generous | 93% (-1.7) | 80% (-4.1) | 69% (+0.5) | 5.1% | 0.36 | 18% |
| strict | 84% (-10.3) | 62% (-22.2) | 45% (-23.6) | 6.6% | 0.48 | 14% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then placeholder content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 96% (+1.1) | 87% (+2.7) | 73% (+5.3) | 1.9% | 0.34 | 28% |
| critRule = "beat6" (rule) | 95% (+0.3) | 86% (+1.0) | 71% (+3.3) | 2.1% | 0.35 | 27% |
| critRule = "beat7" (rule) | 95% (+0.4) | 85% (+0.4) | 70% (+2.3) | 2.7% | 0.35 | 27% |
| critEffect = "none" (rule) | 94% (-0.4) | 83% (-1.3) | 67% (-0.8) | 4.9% | 0.36 | 25% |
| critEffect = "lead2" (rule) | 95% (-0.1) | 84% (-0.7) | 68% (-0.3) | 3.9% | 0.35 | 26% |
| critEffect = "charge" (rule) | 94% (-0.3) | 84% (-0.5) | 68% (-0.4) | 4.8% | 0.35 | 25% |
| costChoice = "suspicion" (rule) | 96% (+0.7) | 84% (-0.6) | 68% (-0.3) | 3.5% | 0.34 | 25% |
| costChoice = "lenient" (rule) | 95% (+0.6) | 84% (-0.1) | 70% (+1.8) | 3.2% | 0.36 | 27% |
| dropRule = "lost" (rule) | 92% (-2.5) | 79% (-5.5) | 61% (-6.5) | 3.9% | 0.35 | 26% |
| dropRule = "extrasOnly" (rule) | 95% (-0.2) | 84% (-0.4) | 68% (-0.3) | 3.9% | 0.35 | 26% |
| loudRule = "witness" (rule) | 95% (+0.3) | 84% (-0.2) | 69% (+0.8) | 3.7% | 0.37 | 26% |
| loudRule = "both" (rule) | 95% (-0.1) | 84% (-0.2) | 69% (+0.6) | 3.5% | 0.36 | 26% |
| loudRule = "none" (rule) | 95% (+0.3) | 85% (+0.1) | 69% (+0.7) | 3.9% | 0.37 | 26% |
| openApproach = "quiet" (rule) | 95% (+0.5) | 86% (+1.3) | 72% (+3.7) | 3.3% | 0.26 | 17% |
| openApproach = "switch" (rule) | 93% (-1.5) | 79% (-5.1) | 61% (-6.7) | 3.7% | 0.40 | 14% |
| overdrawAtLimit = "free" (rule) | 95% (+0.1) | 85% (+0.3) | 69% (+0.7) | 1.6% | 0.35 | 27% |
| overdrawAtLimit = "forbidden" (rule) | 95% (+0.0) | 85% (+0.0) | 68% (+0.0) | 3.9% | 0.35 | 26% |
| overdrawAtLimit = "fury" (rule) | 93% (-1.3) | 80% (-4.6) | 63% (-5.0) | 21.2% | 0.35 | 25% |
| raiseCap = "perDie" (rule) | 95% (+0.0) | 85% (+0.0) | 68% (+0.0) | 3.9% | 0.35 | 26% |
| raiseDie = "any" (rule) | 95% (+0.2) | 85% (+0.1) | 68% (+0.5) | 4.0% | 0.34 | 26% |
| openTrait = "any" (rule) | 96% (+1.2) | 85% (+0.7) | 70% (+1.9) | 3.7% | 0.34 | 30% |
| waysIn = "one" (rule) | 92% (-2.5) | 81% (-4.1) | 62% (-5.7) | 4.3% | 0.43 | 21% |
| partyPolicy = "together" (policy) | 91% (-3.9) | 77% (-7.4) | 62% (-6.3) | 4.3% | 0.40 | 24% |
| partyPolicy = "singles" (policy) | 96% (+0.7) | 86% (+1.3) | 69% (+1.3) | 3.1% | 0.32 | 27% |
| captiveItems = "kept" (rule) | 96% (+0.9) | 87% (+2.8) | 71% (+3.0) | 3.8% | 0.35 | 26% |
| multiCaught = "separate" (rule) | 95% (+0.0) | 85% (+0.0) | 68% (-0.3) | 3.9% | 0.35 | 26% |
| monsterRule = "plus1" (rule) | 97% (+1.8) | 89% (+4.7) | 77% (+9.3) | 1.6% | 0.41 | 14% |
| monsterRule = "tie" (rule) | 96% (+1.5) | 89% (+4.3) | 76% (+7.9) | 2.0% | 0.41 | 17% |
| monsterRule = "d8" (rule) | 95% (+0.1) | 84% (-0.6) | 65% (-2.7) | 7.5% | 0.62 | 17% |
| monsterRule = "maskSafe" (rule) | 100% (+5.1) | 100% (+15.1) | 99% (+31.0) | 0.1% | 0.00 | 65% |
| chaseSusp = "no" (rule) | 98% (+2.8) | 90% (+5.7) | 76% (+8.0) | 0.6% | 0.52 | 32% |
| slipRule = "cost" (rule) | 95% (+0.1) | 85% (+0.5) | 68% (+0.5) | 4.1% | 0.35 | 26% |
| furnitureRule = "base" (rule) | 95% (+0.0) | 85% (+0.0) | 68% (+0.0) | 3.9% | 0.35 | 26% |
| furnitureRule = "hardLoc" (rule) | 94% (-0.8) | 84% (-0.4) | 68% (-0.3) | 3.9% | 0.35 | 24% |
| furnitureRule = "noisy" (rule) | 95% (-0.2) | 84% (-0.3) | 68% (+0.1) | 4.1% | 0.35 | 24% |
| furnitureRule = "both" (rule) | 94% (-0.8) | 84% (-0.9) | 68% (-0.4) | 4.2% | 0.35 | 22% |
| furnitureRule = "noisySlow" (rule) | 95% (-0.2) | 84% (-0.3) | 68% (+0.1) | 4.1% | 0.35 | 24% |
| furniturePlace = "separate" (rule) | 95% (+0.0) | 84% (-0.8) | 70% (+1.7) | 3.0% | 0.33 | 27% |
| exitRule = "free" (rule) | 92% (-2.3) | 76% (-8.9) | 61% (-6.9) | 5.7% | 0.42 | 23% |
| exitRule = "gate" (rule) | 92% (-2.3) | 76% (-8.9) | 61% (-6.9) | 5.7% | 0.42 | 23% |
| exitRule = "gateCarriers" (rule) | 95% (+0.5) | 86% (+1.5) | 70% (+2.3) | 3.2% | 0.33 | 25% |
| groupRule = "best3" (rule) | 95% (+0.1) | 85% (+0.3) | 68% (+0.1) | 3.9% | 0.35 | 26% |
| groupRule = "best4" (rule) | 95% (+0.1) | 85% (+0.3) | 68% (+0.1) | 3.9% | 0.35 | 26% |
| tellScope = "entity" (rule) | 94% (-0.8) | 83% (-1.5) | 69% (+0.6) | 3.7% | 0.34 | 26% |
| triesPerTurn = "one" (rule) | 94% (-0.3) | 85% (+0.1) | 68% (-0.2) | 3.9% | 0.36 | 26% |
| monsterPolicy = "mask" (policy) | 93% (-2.0) | 77% (-7.7) | 53% (-14.6) | 1.7% | 0.95 | 87% |
| monsterPolicy = "monster" (policy) | 94% (-0.7) | 79% (-5.6) | 66% (-2.4) | 6.1% | 0.31 | 0% |
| caughtWeight = 0.4 (policy) | 94% (-0.6) | 83% (-1.5) | 69% (+0.7) | 3.6% | 0.38 | 26% |
| caughtWeight = 2 (policy) | 95% (+0.3) | 84% (-0.5) | 66% (-2.2) | 2.9% | 0.29 | 24% |
| chargePolicy = "hoard" (policy) | 93% (-2.2) | 76% (-8.3) | 57% (-11.0) | 4.1% | 0.36 | 23% |
| furniturePolicy = "never" (policy) | 95% (+0.1) | 85% (+0.1) | 68% (-0.3) | 3.4% | 0.35 | 26% |
| furniturePolicy = "always" (policy) | 95% (+0.3) | 83% (-1.4) | 67% (-0.8) | 4.4% | 0.36 | 24% |
| roster = "candidateA" (content) | 95% (+0.1) | 82% (-2.3) | 69% (+1.2) | 4.3% | 0.35 | 26% |
| dutyEdge = false (content) | 95% (+0.1) | 85% (-0.1) | 68% (-0.4) | 3.8% | 0.36 | 26% |
| tellChance = 0 (content) | 96% (+1.0) | 86% (+1.7) | 73% (+5.3) | 2.3% | 0.38 | 27% |
| tellChance = 0.3333333333333333 (content) | 95% (-0.3) | 82% (-2.3) | 66% (-1.7) | 4.2% | 0.34 | 25% |
| weaknessLocal = 0 (content) | 95% (-0.1) | 85% (+0.6) | 68% (+0.5) | 4.0% | 0.34 | 26% |
| weaknessLocal = 0.5 (content) | 95% (+0.0) | 84% (-0.4) | 68% (-0.3) | 4.3% | 0.36 | 26% |
| weaknessFinal = 0.25 (content) | 95% (+0.1) | 85% (+0.3) | 68% (+0.4) | 3.0% | 0.35 | 26% |
| weaknessFinal = 1 (content) | 95% (-0.1) | 84% (-0.5) | 67% (-0.8) | 6.1% | 0.35 | 25% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift E1:open +3.9 · gift E3:open +2.5 · gift E2:hidden +2.1 · gift E4:switch +1.9 · gift E6:open +1.3 · gift E7:open +1.2 · entity E4 +1.1 · gift E5:switch +0.9 · entity E7 +0.9 · entity E2 +0.8 · duty K3 +0.7 · entity E8 +0.7 · duty K5 +0.6 · gift E8:raise +0.5 · gift E5:open +0.4 · gift E2:open +0.3 · gift E6:hidden +0.3 · duty K6 +0.1 · gift E4:raise +0.1 · gift E8:hidden -0.0 · duty K4 -0.3 · duty K1 -0.4 · gift E7:switch -0.4 · gift E8:switch -0.5 · duty K2 -0.7 · entity E1 -0.8 · gift E7:raise -0.8 · entity E6 -0.8 · gift E3:raise -0.9 · entity E5 -0.9 · entity E3 -1.0 · gift E1:switch -1.1 · gift E5:hidden -1.3 · gift E6:raise -1.5 · gift E3:switch -1.6 · gift E4:hidden -2.0 · gift E2:raise -2.4 · gift E1:hidden -2.9

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 12276 | 0.682 |
| a die stepped below d4 (floored at d4) | 136 | 0.008 |
| final flight stalled (no end after max rounds) | 109 | 0.006 |
| suspicion past the Limit (lost) | 3 | 0.000 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:hidden | 2.622 |
| ability:open | 3.773 |
| ability:raise | 1.077 |
| ability:switch | 1.299 |
| captive rescued | 0.020 |
| captive slipped free | 0.129 |
| captures | 0.223 |
| charges regained by a Critical | 0.481 |
| charges spent | 8.576 |
| cost:drop | 0.078 |
| cost:stepdown | 0.384 |
| cost:suspicion | 0.264 |
| cost:turn | 0.392 |
| declined rolls | 0.315 |
| final flight escaped | 0.133 |
| final flight: dawn | 0.000 |
| final flight: limit | 0.160 |
| forked | 0.021 |
| furniture dropped: carrier captured | 0.001 |
| furniture dropped: final flight | 0.003 |
| group checks | 2.382 |
| group: forced low-value roll | 0.027 |
| local chase ended by the Limit | 0.106 |
| local chase escaped | 0.136 |
| local chases | 0.459 |
| local chases (shared) | 0.006 |
| lost turns | 0.440 |
| overdraws:final | 0.001 |
| overdraws:local | 0.083 |
| overdraws:raid | 0.110 |
| overdraws:slip | 0.000 |
| susp:chase | 1.440 |
| susp:roll | 4.268 |
| susp:slip | 0.192 |
| susp:tell | 2.099 |
| tells | 2.099 |
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
