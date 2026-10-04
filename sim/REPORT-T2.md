# Don't Get Forked — simulator report: T2 — Tuned numbers + exit roll + recoverable drops (proposed) (rough, core rules draft 0.2)

Command: `node sim/run.mjs --package T2 --runs 2000 --sweep-runs 500 --no-packages`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**Everything here runs on placeholder content** (eight anonymous Entities, generated towns, placeholder Gifts, Duties, Weaknesses and Tells; see `sim/entities.mjs`). The numbers measure the core rules and the numbers in `sim/params.mjs`, not the finished game.

## T2 — Tuned numbers + exit roll + recoverable drops (proposed) against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 94.5% | ✗ |
| Win, standard | 72%–78% | 75.0% | ✓ |
| Win, hard | 55%–60% | 56.1% | ✓ |
| Forked, easy | 0%–2% | 0.7% | ✓ |
| Forked, standard | 3%–7% | 5.5% | ✓ |
| Forked, hard | 8%–12% | 7.7% | ✗ |
| Captures per Hard raid | ≥ 0.3 | 0.11 | ✗ |
| Grand Year when the party goes for furniture | ~50% | 79.7% | ✗ |
| Going for furniture costs the Win | ~20% | 0.8% | ✗ |
| Trouble, share of rolls | 10–20% | 21.7% | ✗ |
| Critical (doubles), share of rolls | 10–20% | 4.9% | ✗ |
| Critical (beat by 4), share of rolls | 10–20% | 33.5% | ✗ |
| Entities spending ≥ half their charges | ≥ 50% | 88.3% | ✓ |
| Mask, share of rolls (raid rolls) | ≥ 25% | 11.6% (23.8%) | ✗ |
| Monster, share of rolls (raid rolls) | ≥ 25% | 88.4% (76.2%) | ✓ |
| Largest option outlier | within ±2.5 pts | gift E3:open 2.5 pts | ✓ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 95.5% | 15.9% | 1.1% | 3.3% | 0.2% | 0.03 | 0.01 | 11% | 0% | 4.2 | 9.3 |
| easy | 4 | 94.8% | 14.0% | 1.1% | 3.6% | 0.4% | 0.03 | 0.01 | 16% | 0% | 4.7 | 9.2 |
| easy | 5 | 93.2% | 13.1% | 0.9% | 4.6% | 1.4% | 0.03 | 0.01 | 22% | 0% | 5.1 | 9.0 |
| standard | 3 | 79.3% | 0.0% | 11.2% | 7.4% | 2.1% | 0.09 | 0.03 | 31% | 2% | 7.4 | 10.2 |
| standard | 4 | 78.6% | 0.0% | 11.3% | 7.3% | 2.8% | 0.09 | 0.02 | 40% | 2% | 7.9 | 10.0 |
| standard | 5 | 67.0% | 0.0% | 12.3% | 9.2% | 11.6% | 0.10 | 0.03 | 53% | 2% | 8.4 | 9.6 |
| hard | 3 | 62.5% | 0.0% | 20.9% | 14.4% | 2.2% | 0.10 | 0.03 | 49% | 1% | 8.4 | 9.5 |
| hard | 4 | 58.4% | 0.0% | 20.4% | 16.0% | 5.3% | 0.11 | 0.03 | 61% | 1% | 8.9 | 9.0 |
| hard | 5 | 47.3% | 0.0% | 20.5% | 16.4% | 15.8% | 0.13 | 0.04 | 72% | 0% | 9.3 | 8.5 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 29.3 | 64.7% | 13.6% | 21.7% | 4.9% | 33.5% | 11.6% | 88.4% | 37.8% | 87.5% |

**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 4.9% | 33.5% | 26.6% | 20.4% | 15.1% | 10.7% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 6.0% | 79.7% | 0.8% | 94.5% | 75.0% | 56.1% |
| always | 91.3% | 47.4% | 32.8% | 84.8% | 38.2% | 20.9% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 94% (+0.0) | 75% (+0.0) | 56% (+0.0) | 7.7% | 0.11 | 12% |
| generous | 96% (+1.6) | 83% (+8.4) | 63% (+7.1) | 3.5% | 0.13 | 12% |
| strict | 76% (-18.9) | 42% (-32.8) | 24% (-31.9) | 37.1% | 0.16 | 10% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then placeholder content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 95% (+0.0) | 75% (+0.0) | 55% (+0.0) | 7.8% | 0.12 | 11% |
| critEffect = "lead2" (rule) | 95% (+0.2) | 75% (+0.9) | 56% (+1.3) | 6.8% | 0.12 | 12% |
| costChoice = "suspicion" (rule) | 94% (-0.9) | 73% (-1.7) | 51% (-3.1) | 8.9% | 0.13 | 9% |
| costChoice = "lenient" (rule) | 95% (-0.2) | 75% (+0.7) | 56% (+0.9) | 8.1% | 0.14 | 13% |
| dropRule = "recover" (rule) | 95% (+0.0) | 75% (+0.0) | 55% (+0.0) | 7.8% | 0.12 | 11% |
| loudRule = "witness" (rule) | 94% (-1.1) | 73% (-1.3) | 52% (-2.2) | 8.5% | 0.14 | 11% |
| loudRule = "both" (rule) | 95% (-0.1) | 74% (-0.7) | 54% (-0.6) | 8.1% | 0.12 | 11% |
| loudRule = "none" (rule) | 95% (-0.1) | 75% (+0.9) | 55% (+0.5) | 8.1% | 0.12 | 12% |
| openApproach = "switch" (rule) | 93% (-1.7) | 69% (-5.3) | 47% (-7.2) | 9.0% | 0.16 | 10% |
| overdrawAtLimit = "forbidden" (rule) | 92% (-3.2) | 62% (-12.7) | 42% (-12.2) | 36.1% | 0.12 | 11% |
| raiseCap = "perRoll" (rule) | 94% (-0.7) | 73% (-1.7) | 52% (-2.9) | 14.5% | 0.11 | 11% |
| captiveItems = "kept" (rule) | 95% (+0.3) | 75% (+0.9) | 56% (+1.1) | 7.8% | 0.12 | 11% |
| exitRule = "gate" (rule) | 95% (+0.0) | 75% (+0.0) | 55% (+0.0) | 7.8% | 0.12 | 11% |
| monsterPolicy = "mask" (policy) | 85% (-9.4) | 47% (-27.1) | 30% (-25.0) | 40.4% | 0.51 | 100% |
| monsterPolicy = "monster" (policy) | 93% (-1.3) | 73% (-1.7) | 54% (-0.5) | 7.6% | 0.12 | 0% |
| chargePolicy = "hoard" (policy) | 92% (-2.9) | 64% (-10.9) | 40% (-14.2) | 10.7% | 0.15 | 13% |
| furniturePolicy = "never" (policy) | 95% (-0.1) | 75% (+0.0) | 55% (+0.0) | 7.8% | 0.12 | 12% |
| furniturePolicy = "always" (policy) | 84% (-10.3) | 37% (-37.2) | 22% (-32.4) | 10.4% | 0.12 | 10% |
| dutyEdge = false (content) | 94% (-0.5) | 74% (-0.5) | 55% (+0.4) | 7.4% | 0.12 | 11% |
| tellChance = 0 (content) | 96% (+1.6) | 79% (+4.9) | 64% (+9.1) | 5.5% | 0.15 | 12% |
| tellChance = 0.3333333333333333 (content) | 92% (-3.2) | 66% (-8.8) | 45% (-9.9) | 10.6% | 0.08 | 10% |
| weaknessLocal = 0 (content) | 95% (+0.3) | 75% (+0.5) | 55% (+0.7) | 7.9% | 0.11 | 12% |
| weaknessLocal = 0.5 (content) | 94% (-0.5) | 74% (-1.0) | 54% (-0.6) | 7.9% | 0.13 | 11% |
| weaknessFinal = 0.25 (content) | 95% (+0.1) | 75% (+0.2) | 54% (-0.1) | 7.9% | 0.12 | 12% |
| weaknessFinal = 1 (content) | 94% (-0.3) | 74% (-0.2) | 54% (-0.6) | 9.1% | 0.12 | 12% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift E3:open +2.5 · gift E1:open +1.8 · entity E8 +1.7 · entity E4 +1.2 · gift E5:open +1.2 · entity E6 +0.9 · gift E7:open +0.9 · gift E2:open +0.9 · gift E6:open +0.7 · duty K2 +0.7 · gift E8:raise +0.4 · duty K5 +0.4 · gift E2:raise +0.4 · gift E4:switch +0.3 · duty K3 +0.2 · duty K1 -0.1 · gift E4:raise -0.1 · duty K4 -0.1 · entity E1 -0.1 · gift E4:hidden -0.2 · gift E8:switch -0.2 · entity E7 -0.2 · gift E8:hidden -0.2 · gift E7:raise -0.3 · gift E6:hidden -0.3 · gift E1:switch -0.4 · duty K6 -0.4 · entity E5 -0.4 · gift E5:switch -0.4 · gift E6:raise -0.5 · gift E7:switch -0.7 · gift E5:hidden -0.8 · gift E3:raise -1.0 · gift E2:hidden -1.2 · entity E2 -1.3 · gift E1:hidden -1.4 · gift E3:switch -1.5 · entity E3 -1.7

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| overdraw in the final flight (its Suspicion cost means nothing) | 148605 | 8.256 |
| a raise past d12 (lost) | 15208 | 0.845 |
| final flight stalled (no end after max rounds) | 210 | 0.012 |
| a die stepped below d4 (floored at d4) | 134 | 0.007 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:hidden | 3.127 |
| ability:open | 5.038 |
| ability:raise | 16.941 |
| ability:switch | 3.460 |
| captive rescued | 0.000 |
| captive slipped free | 0.054 |
| captures | 0.077 |
| charges spent | 10.504 |
| cost:drop | 0.311 |
| cost:stepdown | 0.450 |
| cost:suspicion | 0.463 |
| cost:turn | 0.458 |
| declined rolls | 0.025 |
| final flight escaped | 0.346 |
| final flight: dawn | 0.009 |
| final flight: limit | 0.395 |
| forked | 0.046 |
| furniture dropped: carrier captured | 0.000 |
| furniture dropped: final flight | 0.001 |
| group checks | 3.178 |
| group: forced low-value roll | 0.041 |
| local chase ended by the Limit | 0.228 |
| local chase escaped | 0.365 |
| local chases | 0.671 |
| lost turns | 0.591 |
| overdraws:final | 18.020 |
| overdraws:local | 0.040 |
| overdraws:raid | 0.003 |
| susp:chase | 1.279 |
| susp:roll | 3.845 |
| susp:slip | 0.021 |
| susp:tell | 2.007 |
| tells | 2.007 |

## Rule gaps found while building the simulator

| # | Gap | Where | Parameter | Note |
|---|---|---|---|---|
| G1 | What a Critical does | CORE-RULES Rolling 3 | `critEffect` | The Critical rule itself is open (doubles vs beat by 4), and no effect is given. With "good results never lower Suspicion", a Critical needs some other reward, or it should be dropped. |
| G2 | What "the loud way" does | DESIGN Suspicion package | `loudRule` | Obstacles list a loud option, but its cost is never stated (+1 Suspicion always? counts as witnessed?). |
| G3 | What "open an approach nobody else can take" does | CORE-RULES Abilities | `openApproach` | Described only as fiction. Is it unwatched? A different Difficulty? Otherwise it is the same as using the ability's trait. |
| G4 | Overdraw and the Monster die once Suspicion is at the Limit | CORE-RULES Abilities; Suspicion | `overdrawAtLimit` | In the final flight Suspicion has nowhere to go, so overdraw is free and the Mask has no use. The track's behaviour at the Limit needs one sentence (Heisty lesson: say what happens at the threat limit). |
| G5 | P7's raise cap: per die or per roll | CORE-RULES P7 | `raiseCap` | "No die is raised more than one size" lets the trait die and the second die each be raised once. If one raise per roll was meant, say so. Does a Castle Duty edge count toward it? |
| G6 | A captive's loot | DESIGN Captured | `captiveItems` | Does the town take back what a captured Entity carried? |
| G7 | Several Entities caught by one roll | DESIGN Two kinds of chase | `multiCaught` | A group check can catch several Entities at once. One local chase on a shared Lead (like the final flight), or one chase each? |
| G8 | Does a chase take time? | CORE-RULES P4 | — | The simulator resolves a local chase inside the Turn it started. If chase rounds should use Turns, dawn gets closer. |
| G9 | "Drop an item" with nothing carried | CORE-RULES P3 | `costChoice` | Early in the raid the party carries nothing, so this Cost is free. The Storyteller should pick a Cost that bites. |
| G16 | Is a dropped item lost? | CORE-RULES P3 | `dropRule` | If "drop an item" means the item is gone, it is by far the harshest Cost: one Cost on the wrong roll turns a Win into a Partial (it decides about one Easy raid in ten). The other three Costs are mild. |
| G10 | Below d4 | CORE-RULES Carrying, Chase, P3 | — | Several effects make a die one size smaller; nothing says what is below a d4. The simulator floors at d4. |
| G11 | Suspicion past the Limit | DESIGN Suspicion | — | A roll that adds +2 at one below the Limit loses the extra point. Harmless, but the book should say the track stops at the Limit. |
| G12 | Who may roll at a single obstacle each Turn | CORE-RULES P4 | — | P4 gives every Entity one roll per Turn, so a big party can try the same lock four times in one Turn. The simulator allows it (each try risks Suspicion). |
| G13 | Can two Entities take the same Castle Duty? | DESIGN Picks | — | Not stated. The simulator allows it. |
| G14 | Where captives are held, and whether the rescue obstacle resets | DESIGN Captured | — | The simulator uses one lock-up per town (Sly, or Brawn the loud way, always watched) and a new rescue obstacle for each capture. |
| G15 | Getting out of town costs nothing | CORE-RULES The raid | `exitRule` | Once the loot is in hand the party walks out with no roll unless the Limit or dawn has hit, so carrying furniture (no Mask, Nimble smaller) and late Suspicion cost almost nothing. Heisty lesson: losing must cost something even at the end; every scenario had 1–2 escape obstacles. |

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
  "localStart": 2,
  "localEscape": 4,
  "finalStart": 2,
  "finalEscape": 6
 },
 "localMob": {
  "base": 9,
  "perSuspicion": 0.5,
  "max": 12
 },
 "finalMobPerExtraEntity": 1,
 "maxChaseRounds": 20,
 "labels": {
  "easy": {
   "items": 3,
   "essentials": [
    1
   ],
   "limit": 8,
   "turns": 12,
   "finalMob": 11,
   "lockup": 8,
   "exit": 6,
   "difficulty": {
    "6": 0.4,
    "8": 0.5,
    "10": 0.1
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
   "limit": 10,
   "turns": 12,
   "finalMob": 12,
   "lockup": 8,
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
    1,
    2
   ],
   "limit": 10,
   "turns": 12,
   "finalMob": 12,
   "lockup": 10,
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
