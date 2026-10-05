# Don't Get Forked — simulator report: P0 — Decided rules (S1–S11, T1–T10) with the approved numbers (S9, S10) (rough, core rules draft 0.2)

Command: `node sim/run.mjs`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**Everything here runs on placeholder content** (eight anonymous Entities, generated towns, placeholder Gifts, Duties, Weaknesses and Tells; see `sim/entities.mjs`). The numbers measure the core rules and the numbers in `sim/params.mjs`, not the finished game.

## Packages

- **P0**: Decided rules (S1–S11, T1–T10) with the approved numbers (S9, S10).
- **N1**: Proposed retune after T1–T10: final-flight Lead starts at 3; final mob 11 / 12 / 12; Limits 12 / 12 / 14.

| Package | Easy win | Standard win | Hard win | Forked E · S · H | Hard captures | Grand Year when tried | Trouble | Mask (raid rolls) | Spend ≥ ½ | Hard win, 3 · 4 · 5 Entities |
|---|---|---|---|---|---|---|---|---|---|---|
| **target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | ≥ 0.2 | ~50% | 10–20% | ≥ 25% | ≥ 50% | close together |
| P0 | 91.5% | 78.1% | 61.8% | 0.7% · 2.0% · 4.2% | 0.40 | 91.6% | 18.6% | 38.5% | 82.5% | 62% · 62% · 61% |
| N1 | 91.0% | 75.9% | 58.5% | 1.3% · 5.8% · 10.2% | 0.39 | 91.5% | 22.5% | 39.7% | 83.5% | 58% · 59% · 58% |

## P0 — Decided rules (S1–S11, T1–T10) with the approved numbers (S9, S10) against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 91.5% | ✓ |
| Win, standard | 72%–78% | 78.1% | ✗ |
| Win, hard | 55%–60% | 61.8% | ✗ |
| Forked, easy | 0%–2% | 0.7% | ✓ |
| Forked, standard | 3%–7% | 2.0% | ✗ |
| Forked, hard | 8%–12% | 4.2% | ✗ |
| Captures per Hard raid | ≥ 0.2 | 0.40 | ✓ |
| Grand Year when the party goes for furniture | ~50% | 91.6% | ✗ |
| Going for furniture costs the Win | ~20% | 3.9% | ✗ |
| Trouble, share of rolls | 10%–22% | 18.6% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 5.1% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 82.5% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 34.4% (24.2%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 65.6% (75.8%) | ✓ |
| Largest option outlier | within ±2.5 pts | gift E7:open 3.4 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 91.0% | 57.3% | 2.5% | 5.5% | 1.1% | 0.13 | 0.03 | 8% | 8% | 5.3 | 10.4 |
| easy | 4 | 92.2% | 56.3% | 1.6% | 5.8% | 0.4% | 0.12 | 0.03 | 8% | 7% | 5.3 | 10.3 |
| easy | 5 | 91.3% | 58.0% | 1.8% | 6.3% | 0.5% | 0.15 | 0.04 | 9% | 9% | 5.3 | 10.3 |
| standard | 3 | 76.6% | 0.0% | 10.5% | 10.4% | 2.5% | 0.24 | 0.07 | 16% | 0% | 7.6 | 10.2 |
| standard | 4 | 80.5% | 0.0% | 9.6% | 7.8% | 2.2% | 0.22 | 0.05 | 15% | 0% | 7.5 | 10.2 |
| standard | 5 | 77.2% | 0.0% | 11.5% | 9.9% | 1.4% | 0.26 | 0.07 | 18% | 0% | 7.6 | 10.0 |
| hard | 3 | 62.4% | 0.0% | 14.1% | 19.1% | 4.5% | 0.36 | 0.14 | 26% | 0% | 10.8 | 9.8 |
| hard | 4 | 61.9% | 0.0% | 14.9% | 18.8% | 4.4% | 0.41 | 0.15 | 28% | 0% | 10.9 | 9.7 |
| hard | 5 | 61.2% | 0.0% | 14.8% | 20.4% | 3.6% | 0.44 | 0.16 | 31% | 0% | 11.0 | 9.4 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 20.4 | 67.8% | 13.7% | 18.6% | 5.1% | 35.2% | 24.2% | 75.8% | 34.6% | 81.2% |

**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.1% | 35.2% | 28.0% | 21.7% | 16.1% | 11.3% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 20.8% | 91.6% | 3.9% | 91.5% | 78.1% | 61.8% |
| always | 83.3% | 61.3% | 19.9% | 90.8% | 59.0% | 42.5% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 92% (+0.0) | 78% (+0.0) | 62% (+0.0) | 4.2% | 0.40 | 24% |
| generous | 95% (+3.9) | 89% (+10.6) | 72% (+10.5) | 3.9% | 0.33 | 17% |
| strict | 80% (-11.6) | 53% (-25.3) | 40% (-22.0) | 6.1% | 0.54 | 13% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then placeholder content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 94% (+2.9) | 83% (+5.6) | 69% (+7.4) | 2.1% | 0.37 | 27% |
| critRule = "beat6" (rule) | 92% (+1.1) | 81% (+3.5) | 65% (+3.9) | 3.2% | 0.38 | 25% |
| critRule = "beat7" (rule) | 92% (+0.7) | 79% (+2.2) | 64% (+2.5) | 3.3% | 0.39 | 25% |
| critEffect = "none" (rule) | 91% (-0.3) | 77% (-0.7) | 60% (-1.6) | 4.6% | 0.42 | 23% |
| critEffect = "lead2" (rule) | 91% (-0.2) | 77% (-0.5) | 61% (-0.3) | 4.0% | 0.40 | 24% |
| critEffect = "charge" (rule) | 91% (-0.2) | 77% (-0.1) | 60% (-1.3) | 4.9% | 0.42 | 24% |
| costChoice = "suspicion" (rule) | 91% (+0.1) | 78% (+0.9) | 62% (+0.4) | 4.5% | 0.40 | 23% |
| costChoice = "lenient" (rule) | 92% (+0.6) | 80% (+2.6) | 63% (+1.1) | 4.5% | 0.42 | 25% |
| dropRule = "lost" (rule) | 86% (-4.7) | 69% (-8.4) | 54% (-8.0) | 4.3% | 0.40 | 24% |
| dropRule = "extrasOnly" (rule) | 91% (+0.1) | 76% (-1.5) | 62% (+0.3) | 4.2% | 0.40 | 24% |
| loudRule = "witness" (rule) | 90% (-0.9) | 77% (-0.1) | 62% (+0.9) | 4.1% | 0.42 | 24% |
| loudRule = "both" (rule) | 91% (-0.2) | 77% (+0.0) | 62% (+0.2) | 4.3% | 0.41 | 24% |
| loudRule = "none" (rule) | 91% (-0.1) | 77% (-0.5) | 63% (+1.7) | 3.9% | 0.41 | 25% |
| openApproach = "quiet" (rule) | 92% (+1.5) | 81% (+3.7) | 64% (+2.4) | 4.0% | 0.31 | 15% |
| openApproach = "switch" (rule) | 88% (-3.3) | 73% (-4.4) | 56% (-5.5) | 4.3% | 0.47 | 12% |
| overdrawAtLimit = "free" (rule) | 91% (+0.2) | 78% (+0.4) | 62% (+0.5) | 2.1% | 0.40 | 25% |
| overdrawAtLimit = "forbidden" (rule) | 91% (+0.0) | 77% (+0.0) | 62% (+0.0) | 4.3% | 0.40 | 24% |
| overdrawAtLimit = "fury" (rule) | 85% (-6.1) | 75% (-2.7) | 59% (-3.0) | 22.8% | 0.40 | 23% |
| raiseCap = "perDie" (rule) | 91% (+0.0) | 77% (+0.0) | 62% (+0.0) | 4.3% | 0.40 | 24% |
| raiseDie = "any" (rule) | 92% (+0.8) | 77% (-0.1) | 62% (+0.1) | 4.0% | 0.40 | 25% |
| openTrait = "any" (rule) | 91% (+0.1) | 78% (+1.2) | 63% (+1.9) | 3.9% | 0.37 | 27% |
| waysIn = "one" (rule) | 88% (-2.5) | 73% (-4.5) | 58% (-3.9) | 4.9% | 0.45 | 19% |
| captiveItems = "kept" (rule) | 93% (+1.7) | 80% (+2.5) | 65% (+3.3) | 4.4% | 0.40 | 24% |
| multiCaught = "separate" (rule) | 91% (-0.1) | 77% (+0.1) | 61% (-0.2) | 4.3% | 0.41 | 24% |
| monsterRule = "plus1" (rule) | 94% (+2.6) | 84% (+6.6) | 70% (+8.5) | 2.5% | 0.49 | 12% |
| monsterRule = "tie" (rule) | 93% (+2.5) | 84% (+6.3) | 70% (+8.0) | 2.9% | 0.48 | 15% |
| monsterRule = "d8" (rule) | 91% (+0.1) | 77% (-0.3) | 59% (-2.5) | 8.5% | 0.74 | 15% |
| monsterRule = "maskSafe" (rule) | 100% (+8.7) | 98% (+20.9) | 95% (+33.6) | 0.0% | 0.00 | 59% |
| chaseSusp = "no" (rule) | 95% (+4.3) | 85% (+7.7) | 72% (+10.4) | 0.6% | 0.56 | 28% |
| slipRule = "cost" (rule) | 91% (+0.3) | 78% (+0.6) | 62% (+0.9) | 4.3% | 0.40 | 24% |
| furnitureRule = "base" (rule) | 91% (+0.5) | 77% (+0.0) | 62% (+0.0) | 4.3% | 0.40 | 25% |
| furnitureRule = "hardLoc" (rule) | 91% (+0.1) | 77% (+0.0) | 62% (+0.0) | 4.3% | 0.40 | 24% |
| furnitureRule = "noisy" (rule) | 91% (+0.4) | 77% (+0.0) | 62% (+0.0) | 4.3% | 0.40 | 25% |
| furnitureRule = "both" (rule) | 91% (-0.3) | 77% (+0.0) | 62% (+0.0) | 4.3% | 0.40 | 24% |
| furnitureRule = "noisySlow" (rule) | 91% (-0.1) | 77% (+0.0) | 62% (+0.0) | 4.3% | 0.40 | 24% |
| furniturePlace = "separate" (rule) | 92% (+1.3) | 78% (+1.0) | 62% (+0.8) | 3.9% | 0.42 | 26% |
| exitRule = "free" (rule) | 92% (+1.5) | 80% (+3.3) | 63% (+1.5) | 3.9% | 0.40 | 25% |
| exitRule = "gate" (rule) | 89% (-2.1) | 68% (-9.4) | 54% (-7.6) | 5.6% | 0.48 | 21% |
| exitRule = "gateCarriers" (rule) | 91% (+0.0) | 80% (+3.3) | 64% (+2.6) | 3.1% | 0.38 | 25% |
| groupRule = "best3" (rule) | 91% (+0.5) | 80% (+3.0) | 65% (+3.7) | 4.3% | 0.37 | 26% |
| groupRule = "best4" (rule) | 91% (+0.3) | 78% (+0.7) | 62% (-0.1) | 4.3% | 0.41 | 24% |
| tellScope = "entity" (rule) | 92% (+1.0) | 79% (+1.6) | 61% (-0.5) | 4.8% | 0.38 | 24% |
| triesPerTurn = "one" (rule) | 91% (+0.1) | 77% (+0.3) | 61% (-0.3) | 4.3% | 0.40 | 24% |
| monsterPolicy = "mask" (policy) | 88% (-2.7) | 67% (-10.1) | 47% (-14.6) | 1.5% | 1.09 | 84% |
| monsterPolicy = "monster" (policy) | 90% (-0.7) | 73% (-4.5) | 59% (-2.9) | 6.7% | 0.37 | 0% |
| caughtWeight = 0.4 (policy) | 91% (-0.2) | 76% (-1.4) | 59% (-2.3) | 4.9% | 0.45 | 25% |
| caughtWeight = 2 (policy) | 91% (-0.2) | 77% (-0.3) | 59% (-2.2) | 3.7% | 0.35 | 21% |
| chargePolicy = "hoard" (policy) | 88% (-3.1) | 71% (-6.4) | 51% (-10.5) | 3.8% | 0.45 | 21% |
| furniturePolicy = "never" (policy) | 92% (+1.0) | 77% (+0.0) | 62% (+0.0) | 4.3% | 0.40 | 26% |
| furniturePolicy = "always" (policy) | 90% (-0.8) | 59% (-17.9) | 43% (-18.2) | 6.9% | 0.39 | 18% |
| roster = "candidateA" (content) | 92% (+0.6) | 78% (+0.4) | 60% (-1.3) | 5.1% | 0.41 | 24% |
| dutyEdge = false (content) | 91% (+0.1) | 77% (-0.3) | 60% (-1.2) | 4.0% | 0.40 | 24% |
| tellChance = 0 (content) | 92% (+0.8) | 79% (+1.9) | 64% (+2.6) | 2.7% | 0.42 | 25% |
| tellChance = 0.3333333333333333 (content) | 91% (-0.3) | 77% (-0.5) | 59% (-2.2) | 5.3% | 0.40 | 23% |
| weaknessLocal = 0 (content) | 91% (+0.1) | 78% (+0.5) | 63% (+1.3) | 4.2% | 0.39 | 24% |
| weaknessLocal = 0.5 (content) | 91% (-0.2) | 77% (-0.4) | 61% (-0.7) | 4.1% | 0.42 | 24% |
| weaknessFinal = 0.25 (content) | 91% (+0.1) | 77% (+0.3) | 62% (+0.3) | 3.3% | 0.40 | 24% |
| weaknessFinal = 1 (content) | 91% (-0.2) | 77% (-0.4) | 61% (-0.4) | 6.1% | 0.40 | 23% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift E7:open +3.4 · gift E3:open +2.4 · gift E4:switch +1.9 · gift E2:open +1.8 · entity E4 +1.6 · gift E5:open +1.5 · entity E7 +1.5 · entity E8 +1.3 · gift E8:hidden +1.2 · gift E6:open +0.9 · gift E4:raise +0.8 · gift E2:hidden +0.6 · duty K6 +0.6 · duty K5 +0.6 · gift E5:switch +0.5 · gift E1:switch +0.5 · duty K4 +0.3 · gift E1:open +0.3 · entity E2 -0.0 · gift E6:hidden -0.3 · duty K1 -0.3 · duty K2 -0.5 · gift E8:switch -0.6 · gift E8:raise -0.6 · duty K3 -0.7 · gift E6:raise -0.7 · gift E1:hidden -0.8 · entity E5 -0.8 · gift E3:switch -0.9 · entity E1 -1.0 · entity E3 -1.0 · gift E7:switch -1.3 · gift E3:raise -1.4 · entity E6 -1.5 · gift E5:hidden -1.9 · gift E7:raise -2.1 · gift E2:raise -2.4 · gift E4:hidden -2.8

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 15987 | 0.888 |
| a die stepped below d4 (floored at d4) | 541 | 0.030 |
| final flight stalled (no end after max rounds) | 126 | 0.007 |
| suspicion past the Limit (lost) | 13 | 0.001 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:hidden | 3.549 |
| ability:open | 4.749 |
| ability:raise | 1.386 |
| ability:switch | 1.344 |
| captive rescued | 0.016 |
| captive slipped free | 0.159 |
| captures | 0.258 |
| charges regained by a Critical | 0.604 |
| charges spent | 10.342 |
| cost:drop | 0.106 |
| cost:stepdown | 0.462 |
| cost:suspicion | 0.309 |
| cost:turn | 0.457 |
| declined rolls | 0.092 |
| final flight escaped | 0.174 |
| final flight with nobody free | 0.000 |
| final flight: dawn | 0.027 |
| final flight: limit | 0.177 |
| forked | 0.023 |
| furniture dropped: carrier captured | 0.003 |
| furniture dropped: final flight | 0.005 |
| group checks | 2.312 |
| group: forced low-value roll | 0.071 |
| local chase ended by the Limit | 0.103 |
| local chase escaped | 0.143 |
| local chases | 0.472 |
| local chases (shared) | 0.041 |
| lost turns | 0.527 |
| overdraws:final | 0.002 |
| overdraws:local | 0.101 |
| overdraws:raid | 0.581 |
| overdraws:slip | 0.001 |
| susp:chase | 1.723 |
| susp:roll | 4.096 |
| susp:slip | 0.245 |
| susp:tell | 1.847 |
| tells | 1.847 |
| weakness taken by overdraw | 0.002 |

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
