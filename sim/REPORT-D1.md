# Don't Get Forked — simulator report: D1 — Decided rules (S1–S8) + proposed numbers (S9) (rough, core rules draft 0.2)

Command: `node sim/run.mjs --package D1 --runs 2000 --sweep-runs 500 --no-packages`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**Everything here runs on placeholder content** (eight anonymous Entities, generated towns, placeholder Gifts, Duties, Weaknesses and Tells; see `sim/entities.mjs`). The numbers measure the core rules and the numbers in `sim/params.mjs`, not the finished game.

## D1 — Decided rules (S1–S8) + proposed numbers (S9) against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 91.5% | ✓ |
| Win, standard | 72%–78% | 75.6% | ✓ |
| Win, hard | 55%–60% | 56.3% | ✓ |
| Forked, easy | 0%–2% | 0.6% | ✓ |
| Forked, standard | 3%–7% | 3.4% | ✓ |
| Forked, hard | 8%–12% | 6.3% | ✗ |
| Captures per Hard raid | ≥ 0.3 | 0.23 | ✗ |
| Grand Year when the party goes for furniture | ~50% | 93.0% | ✗ |
| Going for furniture costs the Win | ~20% | 2.8% | ✗ |
| Trouble, share of rolls | 10–20% | 22.2% | ✗ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 4.9% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 91.8% | ✓ |
| Mask, share of rolls (raid rolls) | ≥ 25% | 16.6% (28.1%) | ✗ |
| Monster, share of rolls (raid rolls) | ≥ 25% | 83.4% (71.9%) | ✓ |
| Largest option outlier | within ±2.5 pts | gift E6:open 5.7 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 91.0% | 55.6% | 1.1% | 7.0% | 0.9% | 0.08 | 0.02 | 10% | 9% | 5.1 | 10.4 |
| easy | 4 | 92.0% | 54.5% | 1.2% | 6.3% | 0.4% | 0.08 | 0.02 | 12% | 7% | 5.1 | 10.3 |
| easy | 5 | 91.3% | 57.6% | 1.3% | 7.0% | 0.4% | 0.10 | 0.02 | 13% | 9% | 5.0 | 10.2 |
| standard | 3 | 74.9% | 0.0% | 11.3% | 9.6% | 4.3% | 0.15 | 0.05 | 23% | 0% | 7.3 | 9.9 |
| standard | 4 | 77.3% | 0.0% | 10.7% | 9.3% | 2.8% | 0.14 | 0.04 | 22% | 0% | 7.3 | 9.9 |
| standard | 5 | 74.8% | 0.0% | 12.0% | 10.0% | 3.2% | 0.18 | 0.05 | 24% | 0% | 7.3 | 9.8 |
| hard | 3 | 56.0% | 0.0% | 17.9% | 19.0% | 7.1% | 0.21 | 0.09 | 36% | 0% | 9.6 | 9.6 |
| hard | 4 | 56.0% | 0.0% | 17.3% | 20.1% | 6.6% | 0.24 | 0.13 | 39% | 0% | 9.7 | 9.4 |
| hard | 5 | 56.9% | 0.0% | 18.1% | 19.9% | 5.2% | 0.24 | 0.12 | 41% | 0% | 9.7 | 9.1 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 21.9 | 62.9% | 14.9% | 22.2% | 4.9% | 30.2% | 16.6% | 83.4% | 33.1% | 90.6% |

**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 4.9% | 30.2% | 23.5% | 17.5% | 12.6% | 8.6% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 20.0% | 93.0% | 2.8% | 91.5% | 75.6% | 56.3% |
| always | 79.9% | 60.8% | 19.2% | 90.6% | 55.5% | 39.4% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 91% (+0.0) | 76% (+0.0) | 56% (+0.0) | 6.3% | 0.23 | 17% |
| generous | 94% (+2.3) | 84% (+8.4) | 64% (+7.6) | 4.2% | 0.26 | 19% |
| strict | 66% (-25.6) | 39% (-36.8) | 24% (-32.1) | 8.3% | 0.45 | 14% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then placeholder content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 93% (+1.3) | 81% (+5.6) | 66% (+8.7) | 3.1% | 0.20 | 17% |
| critRule = "beat6" (rule) | 92% (+0.6) | 79% (+3.5) | 61% (+4.6) | 4.6% | 0.20 | 16% |
| critRule = "beat7" (rule) | 92% (+0.2) | 78% (+2.3) | 59% (+2.6) | 5.9% | 0.21 | 16% |
| critEffect = "none" (rule) | 91% (-0.7) | 74% (-1.5) | 54% (-2.9) | 8.3% | 0.22 | 17% |
| critEffect = "lead2" (rule) | 91% (-0.1) | 74% (-0.9) | 55% (-2.1) | 7.2% | 0.22 | 17% |
| critEffect = "charge" (rule) | 91% (-0.6) | 75% (-0.6) | 56% (-1.0) | 7.7% | 0.22 | 16% |
| costChoice = "suspicion" (rule) | 91% (-0.7) | 76% (+0.7) | 53% (-4.3) | 7.8% | 0.22 | 15% |
| costChoice = "lenient" (rule) | 92% (+0.3) | 78% (+2.3) | 57% (+0.1) | 6.2% | 0.25 | 18% |
| dropRule = "lost" (rule) | 77% (-14.8) | 56% (-19.5) | 39% (-17.5) | 5.9% | 0.23 | 17% |
| dropRule = "extrasOnly" (rule) | 89% (-1.9) | 70% (-5.7) | 55% (-2.1) | 5.9% | 0.22 | 17% |
| loudRule = "witness" (rule) | 91% (-0.4) | 75% (-0.1) | 57% (+0.1) | 6.3% | 0.24 | 17% |
| loudRule = "both" (rule) | 91% (-0.2) | 75% (-0.6) | 56% (-0.5) | 6.5% | 0.22 | 17% |
| loudRule = "none" (rule) | 92% (+0.5) | 77% (+1.5) | 60% (+2.8) | 5.4% | 0.23 | 17% |
| openApproach = "switch" (rule) | 83% (-8.7) | 63% (-11.9) | 43% (-13.4) | 6.7% | 0.39 | 12% |
| overdrawAtLimit = "free" (rule) | 92% (+0.3) | 76% (+1.1) | 58% (+1.0) | 1.5% | 0.22 | 19% |
| overdrawAtLimit = "forbidden" (rule) | 91% (+0.0) | 75% (+0.1) | 57% (+0.0) | 6.1% | 0.22 | 17% |
| overdrawAtLimit = "fury" (rule) | 89% (-2.3) | 74% (-1.5) | 54% (-3.1) | 19.5% | 0.22 | 15% |
| raiseCap = "perRoll" (rule) | 91% (+0.0) | 75% (-0.1) | 57% (+0.2) | 5.9% | 0.22 | 16% |
| captiveItems = "kept" (rule) | 92% (+1.1) | 77% (+1.9) | 58% (+0.9) | 6.3% | 0.22 | 17% |
| monsterRule = "plus1" (rule) | 94% (+2.8) | 84% (+8.7) | 70% (+12.8) | 4.1% | 0.29 | 5% |
| monsterRule = "tie" (rule) | 94% (+2.4) | 82% (+6.9) | 68% (+11.3) | 4.0% | 0.28 | 7% |
| monsterRule = "d8" (rule) | 91% (-0.4) | 78% (+2.3) | 59% (+1.9) | 14.2% | 0.41 | 7% |
| monsterRule = "maskSafe" (rule) | 99% (+8.1) | 96% (+21.0) | 92% (+35.4) | 0.5% | 0.00 | 36% |
| chaseSusp = "no" (rule) | 95% (+3.5) | 82% (+6.3) | 63% (+5.7) | 3.1% | 0.43 | 21% |
| slipRule = "cost" (rule) | 92% (+0.3) | 76% (+0.3) | 57% (+0.2) | 5.9% | 0.22 | 17% |
| furnitureRule = "base" (rule) | 92% (+0.2) | 75% (+0.0) | 57% (+0.0) | 6.3% | 0.22 | 17% |
| furnitureRule = "hardLoc" (rule) | 91% (-0.1) | 75% (+0.0) | 57% (+0.0) | 6.3% | 0.22 | 17% |
| furnitureRule = "noisy" (rule) | 91% (-0.2) | 75% (+0.0) | 57% (+0.0) | 6.3% | 0.22 | 17% |
| furnitureRule = "both" (rule) | 91% (-0.8) | 75% (+0.0) | 57% (+0.0) | 6.3% | 0.22 | 16% |
| furnitureRule = "noisySlow" (rule) | 90% (-0.9) | 75% (+0.0) | 57% (+0.0) | 6.3% | 0.22 | 16% |
| furniturePlace = "separate" (rule) | 92% (+0.3) | 77% (+1.9) | 57% (+0.3) | 6.0% | 0.24 | 18% |
| exitRule = "free" (rule) | 92% (+0.5) | 77% (+1.9) | 57% (+0.3) | 4.5% | 0.23 | 17% |
| exitRule = "gate" (rule) | 89% (-1.9) | 68% (-7.4) | 50% (-7.2) | 8.9% | 0.28 | 18% |
| exitRule = "gateCarriers" (rule) | 91% (-0.7) | 79% (+3.2) | 59% (+1.8) | 4.1% | 0.21 | 16% |
| groupRule = "best3" (rule) | 92% (+1.0) | 81% (+5.7) | 62% (+5.4) | 5.9% | 0.20 | 17% |
| groupRule = "best4" (rule) | 91% (-0.3) | 77% (+2.1) | 58% (+0.7) | 6.3% | 0.21 | 17% |
| tellScope = "entity" (rule) | 91% (+0.1) | 75% (+0.0) | 55% (-1.5) | 6.5% | 0.23 | 16% |
| monsterPolicy = "mask" (policy) | 90% (-1.7) | 71% (-3.9) | 45% (-11.5) | 4.2% | 0.64 | 74% |
| monsterPolicy = "monster" (policy) | 89% (-2.4) | 66% (-9.5) | 50% (-7.1) | 9.5% | 0.20 | 0% |
| caughtWeight = 0.4 (policy) | 87% (-4.3) | 71% (-4.8) | 52% (-4.4) | 5.9% | 0.32 | 16% |
| caughtWeight = 2 (policy) | 92% (+0.5) | 77% (+1.5) | 56% (-0.7) | 5.2% | 0.18 | 16% |
| chargePolicy = "hoard" (policy) | 82% (-9.7) | 59% (-16.7) | 37% (-20.1) | 5.1% | 0.29 | 19% |
| furniturePolicy = "never" (policy) | 92% (+0.5) | 75% (+0.0) | 57% (+0.0) | 6.3% | 0.22 | 17% |
| furniturePolicy = "always" (policy) | 91% (-0.8) | 55% (-19.9) | 41% (-15.9) | 7.9% | 0.20 | 12% |
| dutyEdge = false (content) | 91% (-0.3) | 75% (-0.1) | 55% (-2.2) | 6.4% | 0.23 | 17% |
| tellChance = 0 (content) | 93% (+1.2) | 78% (+2.6) | 60% (+3.3) | 4.5% | 0.24 | 17% |
| tellChance = 0.3333333333333333 (content) | 91% (-0.5) | 74% (-1.0) | 56% (-1.3) | 6.2% | 0.21 | 16% |
| weaknessLocal = 0 (content) | 92% (+0.3) | 76% (+0.5) | 57% (+0.4) | 5.9% | 0.21 | 17% |
| weaknessLocal = 0.5 (content) | 91% (-0.2) | 75% (+0.1) | 57% (-0.1) | 6.3% | 0.22 | 17% |
| weaknessFinal = 0.25 (content) | 91% (+0.1) | 76% (+0.3) | 57% (+0.3) | 5.1% | 0.22 | 17% |
| weaknessFinal = 1 (content) | 91% (-0.3) | 75% (-0.6) | 56% (-1.3) | 10.1% | 0.22 | 16% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift E6:open +5.7 · gift E5:open +5.0 · gift E1:open +4.7 · entity E4 +3.7 · gift E2:open +3.6 · entity E8 +2.4 · gift E7:open +2.1 · gift E3:open +1.6 · duty K2 +1.2 · gift E8:switch +1.0 · gift E8:raise +1.0 · gift E4:switch +1.0 · entity E7 +0.7 · gift E3:raise +0.5 · gift E4:raise +0.5 · duty K1 +0.3 · duty K3 +0.2 · gift E7:switch -0.1 · duty K4 -0.4 · duty K5 -0.6 · duty K6 -0.6 · gift E2:hidden -0.8 · entity E2 -1.0 · entity E5 -1.3 · entity E6 -1.4 · entity E1 -1.4 · gift E4:hidden -1.5 · entity E3 -1.7 · gift E8:hidden -1.9 · gift E6:hidden -2.0 · gift E7:raise -2.0 · gift E1:hidden -2.0 · gift E5:hidden -2.0 · gift E3:switch -2.1 · gift E1:switch -2.7 · gift E2:raise -2.7 · gift E5:switch -3.0 · gift E6:raise -3.9

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 15660 | 0.870 |
| a die stepped below d4 (floored at d4) | 616 | 0.034 |
| final flight stalled (no end after max rounds) | 182 | 0.010 |
| suspicion past the Limit (lost) | 10 | 0.001 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:hidden | 5.093 |
| ability:open | 3.959 |
| ability:raise | 2.500 |
| ability:switch | 1.290 |
| captive rescued | 0.007 |
| captive slipped free | 0.090 |
| captures | 0.158 |
| charges regained by a Critical | 0.561 |
| charges spent | 11.427 |
| cost:drop | 0.296 |
| cost:stepdown | 0.441 |
| cost:suspicion | 0.451 |
| cost:turn | 0.447 |
| declined rolls | 0.167 |
| final flight escaped | 0.226 |
| final flight: dawn | 0.028 |
| final flight: limit | 0.243 |
| forked | 0.034 |
| furniture dropped: carrier captured | 0.001 |
| furniture dropped: final flight | 0.005 |
| group checks | 2.353 |
| group: forced low-value roll | 0.146 |
| local chase ended by the Limit | 0.146 |
| local chase escaped | 0.100 |
| local chases | 0.404 |
| lost turns | 0.653 |
| overdraws:final | 0.069 |
| overdraws:local | 0.130 |
| overdraws:raid | 1.217 |
| susp:chase | 1.208 |
| susp:roll | 4.452 |
| susp:slip | 0.102 |
| susp:tell | 1.576 |
| tells | 1.576 |
| weakness taken by overdraw | 0.069 |

## Rule gaps found while building the simulator

| # | Gap | Where | Parameter | Note |
|---|---|---|---|---|
| G1 | What a Critical does | CORE-RULES Rolling 3 | `critEffect` | RESOLVED by S8 (CORE-RULES 0.10): a Success on doubles; +2 Lead in a chase, otherwise one spent charge back. |
| G2 | What "the loud way" does | DESIGN Suspicion package | `loudRule` | Obstacles list a loud option, but its cost is never stated (+1 Suspicion always? counts as witnessed?). |
| G3 | What "open an approach nobody else can take" does | CORE-RULES Abilities | `openApproach` | Described only as fiction. Is it unwatched? A different Difficulty? Otherwise it is the same as using the ability's trait. |
| G4 | Overdraw and the Monster die once Suspicion is at the Limit | CORE-RULES Abilities; Suspicion | `overdrawAtLimit` | RESOLVED by S1 (CORE-RULES 0.3): once the hunt is on, Suspicion stops, the Mask is off, and overdraw puts your Weakness in play for the rest of the flight. |
| G5 | P7's raise cap: per die or per roll | CORE-RULES P7 | `raiseCap` | "No die is raised more than one size" lets the trait die and the second die each be raised once. If one raise per roll was meant, say so. Does a Castle Duty edge count toward it? |
| G6 | A captive's loot | DESIGN Captured | `captiveItems` | Does the town take back what a captured Entity carried? |
| G7 | Several Entities caught by one roll | DESIGN Two kinds of chase | `multiCaught` | A group check can catch several Entities at once. One local chase on a shared Lead (like the final flight), or one chase each? |
| G8 | Does a chase take time? | CORE-RULES P4 | — | The simulator resolves a local chase inside the Turn it started. If chase rounds should use Turns, dawn gets closer. |
| G9 | "Drop an item" with nothing carried | CORE-RULES P3 | `costChoice` | Early in the raid the party carries nothing, so this Cost is free. The Storyteller should pick a Cost that bites. |
| G16 | Is a dropped item lost? | CORE-RULES P3 | `dropRule` | RESOLVED by S3 (CORE-RULES 0.5): a dropped item falls where you are; picking it up costs that Entity its next action. |
| G10 | Below d4 | CORE-RULES Carrying, Chase, P3 | — | Several effects make a die one size smaller; nothing says what is below a d4. The simulator floors at d4. |
| G11 | Suspicion past the Limit | DESIGN Suspicion | — | A roll that adds +2 at one below the Limit loses the extra point. Harmless, but the book should say the track stops at the Limit. |
| G12 | Who may roll at a single obstacle each Turn | CORE-RULES P4 | — | P4 gives every Entity one roll per Turn, so a big party can try the same lock four times in one Turn. The simulator allows it (each try risks Suspicion). |
| G13 | Can two Entities take the same Castle Duty? | DESIGN Picks | — | Not stated. The simulator allows it. |
| G14 | Where captives are held, and whether the rescue obstacle resets | DESIGN Captured | — | The simulator uses one lock-up per town (Sly, or Brawn the loud way, always watched) and a new rescue obstacle for each capture. |
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
   "limit": 10,
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
   "limit": 11,
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
   "limit": 12,
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
