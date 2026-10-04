# Don't Get Forked — simulator report: P0 — Starting numbers, rules as written (rough, core rules draft 0.2)

Command: `node sim/run.mjs --runs 2000 --sweep-runs 500`

2000 raids per label × party size (3, 4, 5 Entities) for the package table and the detail below; 500 for the presets and sweeps. Same seed → same report.

**Everything here runs on placeholder content** (eight anonymous Entities, generated towns, placeholder Gifts, Duties, Weaknesses and Tells; see `sim/entities.mjs`). The numbers measure the core rules and the numbers in `sim/params.mjs`, not the finished game.

## Packages

- **P0**: Starting numbers, rules as written.
- **T1**: Tuned numbers, rules as written.
- **T2**: Tuned numbers + exit roll + recoverable drops (proposed).

| Package | Easy win | Standard win | Hard win | Forked E · S · H | Hard captures | Grand Year when tried | Trouble | Mask (raid rolls) | Spend ≥ ½ | Hard win, 3 · 4 · 5 Entities |
|---|---|---|---|---|---|---|---|---|---|---|
| **target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | ≥ 0.3 | ~50% | 10–20% | ≥ 25% | ≥ 50% | close together |
| P0 | 85.3% | 60.8% | 10.5% | 0.0% · 0.1% · 0.3% | 0.00 | 86.6% | 14.5% | 23.1% | 70.6% | 13% · 11% · 8% |
| T1 | 84.0% | 75.9% | 57.5% | 0.1% · 3.4% · 13.3% | 0.12 | 84.4% | 19.0% | 17.6% | 56.7% | 64% · 57% · 52% |
| T2 | 94.5% | 75.0% | 56.1% | 0.7% · 5.5% · 7.7% | 0.11 | 79.7% | 21.7% | 23.8% | 88.3% | 63% · 58% · 47% |

## P0 — Starting numbers, rules as written against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 85.3% | ✗ |
| Win, standard | 72%–78% | 60.8% | ✗ |
| Win, hard | 55%–60% | 10.5% | ✗ |
| Forked, easy | 0%–2% | 0.0% | ✓ |
| Forked, standard | 3%–7% | 0.1% | ✗ |
| Forked, hard | 8%–12% | 0.3% | ✗ |
| Captures per Hard raid | ≥ 0.3 | 0.00 | ✗ |
| Grand Year when the party goes for furniture | ~50% | 86.6% | ✗ |
| Going for furniture costs the Win | ~20% | 4.0% | ✗ |
| Trouble, share of rolls | 10–20% | 14.5% | ✓ |
| Critical (doubles), share of rolls | 10–20% | 5.6% | ✗ |
| Critical (beat by 4), share of rolls | 10–20% | 40.3% | ✗ |
| Entities spending ≥ half their charges | ≥ 50% | 70.6% | ✓ |
| Mask, share of rolls (raid rolls) | ≥ 25% | 18.4% (23.1%) | ✗ |
| Monster, share of rolls (raid rolls) | ≥ 25% | 81.6% (76.9%) | ✓ |
| Largest option outlier | within ±2.5 pts | entity E1 -1.7 pts | ✓ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 85.9% | 42.1% | 11.9% | 2.3% | 0.0% | 0.00 | 0.00 | 2% | 0% | 3.9 | 9.1 |
| easy | 4 | 85.8% | 39.9% | 12.1% | 2.1% | 0.0% | 0.01 | 0.00 | 2% | 0% | 4.3 | 9.0 |
| easy | 5 | 84.2% | 41.9% | 12.4% | 3.4% | 0.0% | 0.01 | 0.00 | 3% | 0% | 4.6 | 9.0 |
| standard | 3 | 66.0% | 0.0% | 26.3% | 7.8% | 0.0% | 0.00 | 0.00 | 13% | 0% | 5.4 | 9.7 |
| standard | 4 | 62.0% | 0.0% | 28.8% | 9.2% | 0.1% | 0.01 | 0.00 | 15% | 0% | 5.7 | 9.3 |
| standard | 5 | 54.4% | 0.0% | 31.6% | 13.8% | 0.3% | 0.00 | 0.00 | 22% | 0% | 6.0 | 9.0 |
| hard | 3 | 13.1% | 0.0% | 23.6% | 63.1% | 0.2% | 0.00 | 0.00 | 32% | 0% | 5.1 | 8.5 |
| hard | 4 | 10.5% | 0.0% | 21.3% | 67.8% | 0.3% | 0.00 | 0.00 | 40% | 0% | 5.2 | 7.8 |
| hard | 5 | 7.8% | 0.0% | 18.5% | 73.4% | 0.4% | 0.00 | 0.00 | 49% | 0% | 5.4 | 7.2 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 16.9 | 73.0% | 12.5% | 14.5% | 5.6% | 40.3% | 18.4% | 81.6% | 33.3% | 71.2% |

**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.6% | 40.3% | 32.4% | 25.3% | 19.1% | 13.8% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 15.9% | 86.6% | 4.0% | 85.3% | 60.8% | 10.5% |
| always | 81.7% | 43.5% | 25.5% | 74.9% | 30.7% | 1.3% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 85% (+0.0) | 61% (+0.0) | 10% (+0.0) | 0.3% | 0.00 | 18% |
| generous | 100% (+14.3) | 81% (+20.1) | 17% (+6.3) | 0.5% | 0.00 | 21% |
| strict | 83% (-1.9) | 53% (-7.4) | 7% (-3.0) | 4.6% | 0.01 | 17% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then placeholder content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 85% (+0.0) | 61% (+0.0) | 9% (+0.0) | 0.3% | 0.00 | 18% |
| critEffect = "lead2" (rule) | 85% (+0.1) | 61% (+0.1) | 10% (+0.3) | 0.2% | 0.00 | 18% |
| costChoice = "suspicion" (rule) | 99% (+14.3) | 70% (+8.8) | 8% (-0.9) | 0.3% | 0.00 | 13% |
| costChoice = "lenient" (rule) | 100% (+14.5) | 80% (+18.7) | 15% (+5.4) | 0.3% | 0.00 | 21% |
| dropRule = "recover" (rule) | 99% (+14.2) | 78% (+16.5) | 13% (+3.5) | 0.2% | 0.00 | 19% |
| loudRule = "witness" (rule) | 85% (+0.2) | 62% (+0.8) | 11% (+1.9) | 0.3% | 0.00 | 19% |
| loudRule = "both" (rule) | 85% (-0.1) | 60% (-0.5) | 9% (-0.1) | 0.3% | 0.00 | 19% |
| loudRule = "none" (rule) | 85% (+0.3) | 63% (+1.7) | 12% (+2.3) | 0.2% | 0.00 | 19% |
| openApproach = "switch" (rule) | 85% (-0.3) | 58% (-3.1) | 9% (-0.4) | 0.4% | 0.01 | 18% |
| overdrawAtLimit = "forbidden" (rule) | 85% (+0.0) | 61% (+0.0) | 9% (+0.0) | 2.2% | 0.00 | 17% |
| raiseCap = "perRoll" (rule) | 85% (+0.0) | 61% (-0.3) | 9% (-0.1) | 0.7% | 0.00 | 18% |
| captiveItems = "kept" (rule) | 85% (+0.1) | 61% (+0.0) | 9% (+0.0) | 0.3% | 0.00 | 18% |
| exitRule = "gate" (rule) | 84% (-1.3) | 57% (-3.9) | 9% (-0.7) | 0.6% | 0.00 | 19% |
| monsterPolicy = "mask" (policy) | 80% (-5.1) | 54% (-6.7) | 8% (-1.0) | 4.0% | 0.01 | 100% |
| monsterPolicy = "monster" (policy) | 87% (+1.9) | 60% (-1.1) | 8% (-0.8) | 0.5% | 0.00 | 0% |
| chargePolicy = "hoard" (policy) | 83% (-2.3) | 48% (-13.4) | 4% (-5.1) | 0.7% | 0.01 | 19% |
| furniturePolicy = "never" (policy) | 87% (+2.2) | 61% (+0.0) | 9% (+0.0) | 0.3% | 0.00 | 18% |
| furniturePolicy = "always" (policy) | 74% (-11.3) | 31% (-30.1) | 1% (-8.1) | 0.3% | 0.01 | 17% |
| dutyEdge = false (content) | 85% (+0.3) | 60% (-0.9) | 9% (-0.4) | 0.5% | 0.00 | 18% |
| tellChance = 0 (content) | 85% (+0.3) | 69% (+8.0) | 21% (+11.3) | 0.1% | 0.00 | 18% |
| tellChance = 0.3333333333333333 (content) | 84% (-0.7) | 49% (-12.5) | 4% (-5.6) | 0.3% | 0.00 | 17% |
| weaknessLocal = 0 (content) | 85% (+0.2) | 61% (+0.4) | 9% (+0.1) | 0.3% | 0.00 | 19% |
| weaknessLocal = 0.5 (content) | 85% (+0.0) | 61% (-0.1) | 9% (+0.0) | 0.3% | 0.00 | 18% |
| weaknessFinal = 0.25 (content) | 85% (+0.0) | 61% (+0.0) | 9% (+0.0) | 0.3% | 0.00 | 18% |
| weaknessFinal = 1 (content) | 85% (+0.0) | 61% (+0.0) | 9% (+0.0) | 0.3% | 0.00 | 18% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift E1:hidden +1.6 · gift E6:hidden +1.4 · gift E7:open +1.4 · gift E8:hidden +1.1 · gift E2:hidden +1.1 · duty K4 +1.0 · gift E3:open +0.9 · entity E4 +0.9 · gift E4:hidden +0.7 · entity E7 +0.7 · entity E6 +0.5 · gift E2:raise +0.4 · duty K2 +0.3 · entity E2 +0.3 · gift E4:raise +0.2 · gift E7:switch +0.2 · entity E5 +0.1 · gift E5:hidden +0.0 · gift E5:open -0.0 · gift E5:switch -0.0 · gift E1:open -0.1 · gift E3:raise -0.2 · duty K3 -0.2 · duty K1 -0.2 · duty K5 -0.3 · entity E3 -0.3 · gift E8:raise -0.4 · entity E8 -0.4 · duty K6 -0.5 · gift E3:switch -0.6 · gift E6:open -0.7 · gift E6:raise -0.7 · gift E8:switch -0.8 · gift E4:switch -0.9 · gift E1:switch -1.5 · gift E2:open -1.5 · gift E7:raise -1.6 · entity E1 -1.7

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| overdraw in the final flight (its Suspicion cost means nothing) | 31372 | 1.743 |
| a raise past d12 (lost) | 15512 | 0.862 |
| a die stepped below d4 (floored at d4) | 121 | 0.007 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:hidden | 2.941 |
| ability:open | 2.855 |
| ability:raise | 4.872 |
| ability:switch | 1.932 |
| captive slipped free | 0.004 |
| captures | 0.004 |
| charges spent | 8.544 |
| cost:drop | 0.234 |
| cost:stepdown | 0.390 |
| cost:suspicion | 0.402 |
| cost:turn | 0.397 |
| declined rolls | 0.135 |
| final flight escaped | 0.195 |
| final flight: limit | 0.196 |
| forked | 0.001 |
| group checks | 2.371 |
| group: forced low-value roll | 0.128 |
| local chase ended by the Limit | 0.069 |
| local chase escaped | 0.433 |
| local chases | 0.506 |
| lost turns | 0.327 |
| overdraws:final | 4.053 |
| overdraws:local | 0.001 |
| overdraws:raid | 0.002 |
| susp:chase | 0.390 |
| susp:roll | 3.150 |
| susp:slip | 0.001 |
| susp:tell | 1.520 |
| tells | 1.520 |

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
  "base": 6,
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
   "limit": 10,
   "turns": 12,
   "finalMob": 8,
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
   "limit": 8,
   "turns": 12,
   "finalMob": 9,
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
   "items": 5,
   "essentials": [
    2
   ],
   "limit": 6,
   "turns": 12,
   "finalMob": 10,
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
