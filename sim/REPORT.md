# Don't Get Forked — simulator report: P0 — Decided rules (S1–S8) with the approved numbers (S9) (rough, core rules draft 0.2)

Command: `node sim/run.mjs --runs 2000 --sweep-runs 500`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**Everything here runs on placeholder content** (eight anonymous Entities, generated towns, placeholder Gifts, Duties, Weaknesses and Tells; see `sim/entities.mjs`). The numbers measure the core rules and the numbers in `sim/params.mjs`, not the finished game.

## Packages

- **P0**: Decided rules (S1–S8) with the approved numbers (S9).

| Package | Easy win | Standard win | Hard win | Forked E · S · H | Hard captures | Grand Year when tried | Trouble | Mask (raid rolls) | Spend ≥ ½ | Hard win, 3 · 4 · 5 Entities |
|---|---|---|---|---|---|---|---|---|---|---|
| **target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | ≥ 0.2 | ~50% | 10–20% | ≥ 25% | ≥ 50% | close together |
| P0 | 90.1% | 74.8% | 58.1% | 0.7% · 3.2% · 4.5% | 0.41 | 91.7% | 20.0% | 37.2% | 90.1% | 57% · 59% · 59% |

## P0 — Decided rules (S1–S8) with the approved numbers (S9) against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 90.1% | ✓ |
| Win, standard | 72%–78% | 74.8% | ✓ |
| Win, hard | 55%–60% | 58.1% | ✓ |
| Forked, easy | 0%–2% | 0.7% | ✓ |
| Forked, standard | 3%–7% | 3.2% | ✓ |
| Forked, hard | 8%–12% | 4.5% | ✗ |
| Captures per Hard raid | ≥ 0.2 | 0.41 | ✓ |
| Grand Year when the party goes for furniture | ~50% | 91.7% | ✗ |
| Going for furniture costs the Win | ~20% | 3.4% | ✗ |
| Trouble, share of rolls | 10%–22% | 20.0% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 5.0% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 90.1% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 32.9% (21.8%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 67.1% (78.2%) | ✓ |
| Largest option outlier | within ±2.5 pts | gift E7:open 3.9 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 89.7% | 56.1% | 2.8% | 6.3% | 1.3% | 0.14 | 0.03 | 11% | 8% | 5.6 | 10.4 |
| easy | 4 | 90.1% | 54.5% | 1.6% | 7.8% | 0.4% | 0.13 | 0.03 | 12% | 6% | 5.6 | 10.1 |
| easy | 5 | 90.5% | 57.1% | 2.1% | 7.1% | 0.4% | 0.17 | 0.03 | 11% | 9% | 5.4 | 10.2 |
| standard | 3 | 74.6% | 0.0% | 11.3% | 10.5% | 3.6% | 0.22 | 0.06 | 20% | 0% | 8.0 | 10.0 |
| standard | 4 | 76.4% | 0.0% | 11.1% | 9.5% | 3.0% | 0.24 | 0.06 | 20% | 0% | 7.9 | 10.0 |
| standard | 5 | 73.3% | 0.0% | 13.2% | 10.8% | 2.9% | 0.28 | 0.06 | 22% | 0% | 7.8 | 9.8 |
| hard | 3 | 57.0% | 0.0% | 16.7% | 21.1% | 5.2% | 0.35 | 0.13 | 30% | 0% | 11.2 | 9.7 |
| hard | 4 | 58.6% | 0.0% | 17.8% | 19.1% | 4.5% | 0.42 | 0.15 | 34% | 0% | 11.3 | 9.5 |
| hard | 5 | 58.7% | 0.0% | 16.7% | 21.0% | 3.6% | 0.45 | 0.15 | 35% | 0% | 11.3 | 9.3 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 21.7 | 66.0% | 14.0% | 20.0% | 5.0% | 33.6% | 21.8% | 78.2% | 36.7% | 89.2% |

**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.0% | 33.6% | 26.6% | 20.4% | 15.0% | 10.5% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 20.3% | 91.7% | 3.4% | 90.1% | 74.8% | 58.1% |
| always | 81.3% | 60.4% | 19.3% | 89.6% | 56.1% | 40.6% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 90% (+0.0) | 75% (+0.0) | 58% (+0.0) | 4.5% | 0.41 | 22% |
| generous | 95% (+4.7) | 86% (+11.0) | 70% (+12.1) | 3.3% | 0.29 | 15% |
| strict | 68% (-22.6) | 42% (-32.3) | 30% (-28.3) | 6.9% | 0.54 | 12% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then placeholder content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 92% (+2.6) | 80% (+6.7) | 66% (+8.1) | 1.7% | 0.38 | 26% |
| critRule = "beat6" (rule) | 91% (+1.7) | 78% (+4.6) | 62% (+4.3) | 3.3% | 0.39 | 24% |
| critRule = "beat7" (rule) | 90% (+1.0) | 76% (+2.5) | 60% (+2.4) | 4.5% | 0.39 | 23% |
| critEffect = "none" (rule) | 88% (-0.7) | 73% (-1.1) | 56% (-2.3) | 5.2% | 0.42 | 21% |
| critEffect = "lead2" (rule) | 89% (-0.2) | 73% (-0.7) | 57% (-1.3) | 4.1% | 0.41 | 21% |
| critEffect = "charge" (rule) | 89% (-0.5) | 74% (-0.1) | 57% (-1.0) | 5.1% | 0.42 | 21% |
| costChoice = "suspicion" (rule) | 89% (+0.5) | 71% (-2.4) | 56% (-2.3) | 5.6% | 0.42 | 20% |
| costChoice = "lenient" (rule) | 90% (+1.3) | 73% (-0.5) | 57% (-0.7) | 5.2% | 0.44 | 22% |
| dropRule = "lost" (rule) | 77% (-12.1) | 58% (-15.8) | 42% (-15.9) | 4.9% | 0.40 | 22% |
| dropRule = "extrasOnly" (rule) | 88% (-1.1) | 70% (-3.9) | 55% (-2.5) | 4.9% | 0.41 | 22% |
| loudRule = "witness" (rule) | 89% (-0.1) | 74% (-0.1) | 59% (+0.6) | 3.9% | 0.42 | 22% |
| loudRule = "both" (rule) | 89% (-0.2) | 74% (+0.1) | 58% (+0.3) | 4.3% | 0.41 | 22% |
| loudRule = "none" (rule) | 89% (+0.5) | 74% (+0.3) | 60% (+1.9) | 3.7% | 0.41 | 22% |
| openApproach = "quiet" (rule) | 93% (+3.7) | 80% (+6.0) | 66% (+8.2) | 4.0% | 0.25 | 14% |
| openApproach = "switch" (rule) | 85% (-4.4) | 67% (-6.7) | 50% (-7.5) | 5.4% | 0.46 | 10% |
| overdrawAtLimit = "free" (rule) | 89% (+0.2) | 74% (+0.8) | 59% (+0.7) | 1.0% | 0.41 | 23% |
| overdrawAtLimit = "forbidden" (rule) | 89% (+0.0) | 74% (+0.1) | 58% (+0.1) | 4.1% | 0.41 | 22% |
| overdrawAtLimit = "fury" (rule) | 85% (-3.6) | 72% (-2.0) | 55% (-3.1) | 20.8% | 0.41 | 20% |
| raiseCap = "perDie" (rule) | 89% (+0.0) | 74% (+0.3) | 58% (+0.2) | 4.0% | 0.41 | 22% |
| captiveItems = "kept" (rule) | 91% (+2.5) | 78% (+4.1) | 62% (+3.7) | 4.1% | 0.41 | 22% |
| multiCaught = "separate" (rule) | 89% (-0.3) | 73% (-0.3) | 58% (-0.4) | 4.4% | 0.41 | 22% |
| monsterRule = "plus1" (rule) | 92% (+3.4) | 81% (+7.1) | 66% (+7.7) | 2.7% | 0.51 | 10% |
| monsterRule = "tie" (rule) | 92% (+3.1) | 80% (+6.5) | 65% (+6.7) | 3.0% | 0.50 | 13% |
| monsterRule = "d8" (rule) | 88% (-1.3) | 72% (-1.3) | 58% (+0.1) | 9.4% | 0.75 | 13% |
| monsterRule = "maskSafe" (rule) | 99% (+10.2) | 98% (+23.9) | 94% (+36.5) | 0.1% | 0.00 | 60% |
| chaseSusp = "no" (rule) | 95% (+5.7) | 81% (+7.8) | 70% (+12.0) | 0.9% | 0.60 | 27% |
| slipRule = "cost" (rule) | 89% (+0.5) | 74% (+0.6) | 59% (+1.0) | 4.1% | 0.42 | 22% |
| furnitureRule = "base" (rule) | 89% (+0.1) | 74% (+0.0) | 58% (+0.0) | 4.1% | 0.41 | 22% |
| furnitureRule = "hardLoc" (rule) | 88% (-0.5) | 74% (+0.0) | 58% (+0.0) | 4.1% | 0.41 | 22% |
| furnitureRule = "noisy" (rule) | 89% (-0.2) | 74% (+0.0) | 58% (+0.0) | 4.1% | 0.41 | 22% |
| furnitureRule = "both" (rule) | 88% (-0.8) | 74% (+0.0) | 58% (+0.0) | 4.1% | 0.41 | 22% |
| furnitureRule = "noisySlow" (rule) | 89% (-0.4) | 74% (+0.0) | 58% (+0.0) | 4.1% | 0.41 | 21% |
| furniturePlace = "separate" (rule) | 91% (+2.1) | 74% (+0.0) | 59% (+0.7) | 5.1% | 0.40 | 23% |
| exitRule = "free" (rule) | 90% (+0.6) | 76% (+2.3) | 59% (+1.2) | 3.7% | 0.41 | 22% |
| exitRule = "gate" (rule) | 88% (-1.5) | 65% (-9.0) | 52% (-6.2) | 5.8% | 0.47 | 20% |
| exitRule = "gateCarriers" (rule) | 89% (-0.3) | 77% (+3.7) | 61% (+2.6) | 3.1% | 0.39 | 22% |
| groupRule = "best3" (rule) | 90% (+1.5) | 79% (+5.0) | 62% (+4.4) | 3.7% | 0.40 | 23% |
| groupRule = "best4" (rule) | 90% (+0.6) | 75% (+1.4) | 58% (-0.1) | 4.4% | 0.40 | 22% |
| tellScope = "entity" (rule) | 90% (+1.1) | 75% (+1.1) | 57% (-1.0) | 4.8% | 0.41 | 21% |
| triesPerTurn = "one" (rule) | 89% (+0.1) | 73% (-0.5) | 57% (-1.3) | 4.4% | 0.40 | 22% |
| monsterPolicy = "mask" (policy) | 88% (-1.1) | 66% (-7.9) | 43% (-14.7) | 2.5% | 1.07 | 79% |
| monsterPolicy = "monster" (policy) | 88% (-0.6) | 68% (-5.9) | 54% (-3.6) | 6.5% | 0.38 | 0% |
| caughtWeight = 0.4 (policy) | 89% (-0.4) | 73% (-0.6) | 58% (-0.3) | 4.5% | 0.43 | 22% |
| caughtWeight = 2 (policy) | 89% (+0.0) | 75% (+0.9) | 55% (-2.9) | 4.1% | 0.38 | 19% |
| chargePolicy = "hoard" (policy) | 84% (-5.2) | 63% (-10.5) | 48% (-10.0) | 4.7% | 0.44 | 17% |
| furniturePolicy = "never" (policy) | 90% (+1.5) | 74% (+0.0) | 58% (+0.0) | 4.1% | 0.41 | 23% |
| furniturePolicy = "always" (policy) | 89% (-0.3) | 55% (-18.5) | 41% (-16.5) | 7.9% | 0.37 | 17% |
| dutyEdge = false (content) | 89% (-0.4) | 74% (-0.1) | 57% (-0.7) | 4.8% | 0.41 | 22% |
| tellChance = 0 (content) | 90% (+1.1) | 76% (+2.3) | 62% (+3.8) | 3.3% | 0.42 | 23% |
| tellChance = 0.3333333333333333 (content) | 89% (+0.1) | 73% (-0.4) | 56% (-1.6) | 5.1% | 0.40 | 21% |
| weaknessLocal = 0 (content) | 89% (+0.0) | 74% (+0.4) | 58% (+0.5) | 4.4% | 0.39 | 22% |
| weaknessLocal = 0.5 (content) | 89% (-0.5) | 73% (-0.5) | 57% (-0.5) | 4.2% | 0.43 | 22% |
| weaknessFinal = 0.25 (content) | 89% (+0.0) | 74% (+0.3) | 58% (+0.2) | 2.9% | 0.41 | 22% |
| weaknessFinal = 1 (content) | 89% (-0.3) | 73% (-0.5) | 58% (-0.4) | 6.6% | 0.41 | 21% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift E7:open +3.9 · gift E3:open +3.4 · gift E1:open +2.8 · gift E5:open +2.0 · gift E6:open +1.8 · entity E8 +1.8 · gift E4:switch +1.4 · entity E7 +1.4 · gift E2:open +1.3 · entity E4 +1.0 · gift E8:raise +0.9 · duty K4 +0.6 · duty K5 +0.5 · gift E4:raise +0.4 · gift E5:switch +0.3 · duty K6 +0.2 · duty K2 +0.1 · entity E2 -0.0 · duty K1 -0.1 · gift E8:switch -0.3 · gift E6:hidden -0.4 · gift E2:raise -0.5 · entity E1 -0.5 · gift E8:hidden -0.6 · gift E3:raise -0.7 · gift E2:hidden -0.8 · gift E7:raise -1.0 · entity E3 -1.1 · entity E5 -1.2 · gift E1:switch -1.3 · entity E6 -1.3 · gift E6:raise -1.4 · duty K3 -1.5 · gift E1:hidden -1.6 · gift E4:hidden -1.9 · gift E5:hidden -2.3 · gift E3:switch -2.7 · gift E7:switch -3.0

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 15549 | 0.864 |
| a die stepped below d4 (floored at d4) | 593 | 0.033 |
| final flight stalled (no end after max rounds) | 154 | 0.009 |
| suspicion past the Limit (lost) | 14 | 0.001 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:hidden | 3.228 |
| ability:open | 5.930 |
| ability:raise | 2.064 |
| ability:switch | 1.283 |
| captive rescued | 0.017 |
| captive slipped free | 0.173 |
| captures | 0.267 |
| charges regained by a Critical | 0.634 |
| charges spent | 11.332 |
| cost:drop | 0.256 |
| cost:stepdown | 0.393 |
| cost:suspicion | 0.395 |
| cost:turn | 0.386 |
| declined rolls | 0.119 |
| final flight escaped | 0.207 |
| final flight with nobody free | 0.000 |
| final flight: dawn | 0.025 |
| final flight: limit | 0.218 |
| forked | 0.028 |
| furniture dropped: carrier captured | 0.002 |
| furniture dropped: final flight | 0.005 |
| group checks | 2.272 |
| group: forced low-value roll | 0.117 |
| local chase ended by the Limit | 0.124 |
| local chase escaped | 0.173 |
| local chases | 0.527 |
| local chases (shared) | 0.054 |
| lost turns | 0.556 |
| overdraws:final | 0.063 |
| overdraws:local | 0.371 |
| overdraws:raid | 0.737 |
| susp:chase | 2.112 |
| susp:roll | 4.293 |
| susp:slip | 0.226 |
| susp:tell | 1.597 |
| tells | 1.597 |
| weakness taken by overdraw | 0.063 |

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
