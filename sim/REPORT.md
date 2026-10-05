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
| P0 | 95.6% | 85.5% | 71.0% | 0.2% · 2.3% · 4.4% | 0.33 | 88.9% | 18.9% | 40.9% | 65.7% | 67% · 72% · 74% |
| N1 | 95.6% | 82.8% | 67.6% | 0.4% · 5.8% · 10.0% | 0.32 | 88.4% | 22.7% | 42.2% | 67.2% | 64% · 68% · 70% |
| N2 | 94.9% | 68.8% | 49.1% | 0.2% · 3.1% · 5.0% | 0.25 | 92.7% | 17.9% | 38.2% | 53.7% | 35% · 40% · 72% |

## P0 — Decided rules (S1–S11, T1–T10) with the approved numbers (S9, S10) against the targets

| Measure | Target | Simulated |  |
|---|---|---|---|
| Win, easy | 87%–93% | 95.6% | ✗ |
| Win, standard | 72%–78% | 85.5% | ✗ |
| Win, hard | 55%–60% | 71.0% | ✗ |
| Forked, easy | 0%–2% | 0.2% | ✓ |
| Forked, standard | 3%–7% | 2.3% | ✗ |
| Forked, hard | 8%–12% | 4.4% | ✗ |
| Captures per Hard raid | ≥ 0.2 | 0.33 | ✓ |
| Grand Year when the party goes for furniture | ~50% | 88.9% | ✗ |
| Going for furniture costs the Win | ~20% | 1.8% | ✗ |
| Trouble, share of rolls | 10%–22% | 18.9% | ✓ |
| Critical (doubles on a Success, S8), share of rolls | 3%–7% | 5.1% | ✓ |
| Entities spending ≥ half their charges | ≥ 50% | 65.7% | ✓ |
| Mask, share of rolls where you choose (all rolls) | ≥ 25% | 36.8% (26.3%) | ✓ |
| Monster, share of rolls where you choose (all rolls) | ≥ 25% | 63.2% (73.7%) | ✓ |
| Largest option outlier | within ±2.5 pts | gift The Invisible Man:open 3.0 pts | ✗ |

## Results by label and party size

| Label | Entities | Win | of which Grand | Partial | Bust | Forked | Captures | Left behind | Final flight: Limit | Final flight: dawn | Suspicion at end | Turns used |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| easy | 3 | 94.7% | 59.2% | 1.6% | 3.5% | 0.3% | 0.10 | 0.03 | 7% | 0% | 4.9 | 7.7 |
| easy | 4 | 95.3% | 63.0% | 1.8% | 2.8% | 0.2% | 0.11 | 0.03 | 6% | 0% | 4.9 | 7.6 |
| easy | 5 | 96.9% | 64.4% | 0.9% | 1.9% | 0.2% | 0.10 | 0.02 | 4% | 0% | 4.6 | 6.3 |
| standard | 3 | 83.0% | 15.4% | 9.0% | 5.0% | 3.1% | 0.19 | 0.07 | 14% | 0% | 7.6 | 8.8 |
| standard | 4 | 85.5% | 21.6% | 8.9% | 3.5% | 2.1% | 0.21 | 0.07 | 14% | 0% | 7.4 | 8.6 |
| standard | 5 | 88.2% | 31.6% | 6.1% | 4.0% | 1.7% | 0.21 | 0.07 | 13% | 0% | 7.4 | 7.6 |
| hard | 3 | 67.0% | 7.8% | 14.7% | 12.8% | 5.5% | 0.32 | 0.14 | 25% | 0% | 11.1 | 8.9 |
| hard | 4 | 71.7% | 12.2% | 14.0% | 9.8% | 4.6% | 0.33 | 0.16 | 24% | 0% | 10.9 | 8.6 |
| hard | 5 | 74.4% | 20.1% | 12.0% | 10.4% | 3.2% | 0.35 | 0.17 | 24% | 0% | 10.8 | 7.8 |

## Dice

| Rolls per raid | Success | Cost | Trouble | Crit (doubles) | Crit (beat 4) | Mask | Monster | Monster shows (per Monster roll) | Charges spent (mean) |
|---|---|---|---|---|---|---|---|---|---|
| 15.8 | 67.4% | 13.7% | 18.9% | 5.1% | 35.2% | 26.3% | 73.7% | 35.3% | 65.6% |

**Critical candidates** (share of all rolls; the Critical rule is open and has no effect yet):

| Doubles on a Success | Beat by 4 | Beat by 5 | Beat by 6 | Beat by 7 | Beat by 8 |
|---|---|---|---|---|---|
| 5.1% | 35.2% | 28.1% | 21.6% | 16.0% | 11.2% |

## Furniture: how the party's appetite changes the gamble

| Policy | Goes for it | Grand Year when tried | Tried and lost a Win it had | Easy win | Standard win | Hard win |
|---|---|---|---|---|---|---|
| ifSafe | 36.9% | 88.9% | 1.8% | 95.6% | 85.5% | 71.0% |
| always | 73.7% | 78.8% | 5.3% | 95.5% | 85.3% | 70.3% |

"Tried and lost a Win it had" pairs each raid with the same raid (same party, town and dice seed) played with `furniturePolicy = never`.

## Presets: every ambiguous rule for or against the players

Where a number moves a lot between generous and strict, the rules are underspecified there.

| Reading | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| baseline | 96% (+0.0) | 86% (+0.0) | 71% (+0.0) | 4.4% | 0.33 | 26% |
| generous | 93% (-2.5) | 79% (-6.6) | 68% (-3.4) | 6.1% | 0.36 | 18% |
| strict | 85% (-10.3) | 63% (-23.0) | 46% (-25.4) | 7.9% | 0.48 | 13% |

## Sweeps: what each judgement call is worth

Win rate (points vs the baseline at the same run count). Rules first, then player policies, then placeholder content.

| Variant | Easy win | Standard win | Hard win | Hard forked | Hard captures | Mask |
|---|---|---|---|---|---|---|
| critRule = "beat4" (rule) | 97% (+1.0) | 89% (+4.2) | 75% (+3.8) | 1.7% | 0.29 | 29% |
| critRule = "beat6" (rule) | 96% (+0.5) | 87% (+2.5) | 72% (+1.0) | 3.4% | 0.31 | 28% |
| critRule = "beat7" (rule) | 96% (+0.3) | 86% (+1.5) | 72% (+0.2) | 4.7% | 0.31 | 27% |
| critEffect = "none" (rule) | 95% (-0.7) | 84% (-0.5) | 69% (-2.1) | 5.9% | 0.33 | 25% |
| critEffect = "lead2" (rule) | 96% (+0.0) | 85% (-0.1) | 71% (-0.4) | 5.1% | 0.32 | 26% |
| critEffect = "charge" (rule) | 95% (-0.8) | 84% (-0.5) | 69% (-1.9) | 5.7% | 0.32 | 26% |
| costChoice = "suspicion" (rule) | 96% (+0.5) | 84% (-0.7) | 70% (-1.5) | 5.0% | 0.33 | 25% |
| costChoice = "lenient" (rule) | 96% (+0.8) | 86% (+0.9) | 72% (+0.3) | 5.1% | 0.34 | 27% |
| dropRule = "lost" (rule) | 94% (-1.8) | 81% (-3.7) | 66% (-5.9) | 4.5% | 0.32 | 26% |
| dropRule = "extrasOnly" (rule) | 95% (-0.1) | 85% (+0.0) | 71% (-0.3) | 4.7% | 0.32 | 26% |
| loudRule = "witness" (rule) | 95% (-0.3) | 84% (-0.5) | 71% (-0.3) | 4.5% | 0.35 | 27% |
| loudRule = "both" (rule) | 95% (-0.2) | 85% (+0.2) | 71% (+0.1) | 4.4% | 0.32 | 26% |
| loudRule = "none" (rule) | 96% (+0.3) | 86% (+1.0) | 71% (+0.1) | 4.8% | 0.34 | 27% |
| openApproach = "quiet" (rule) | 95% (-0.6) | 86% (+0.7) | 71% (-0.6) | 4.3% | 0.27 | 17% |
| openApproach = "switch" (rule) | 93% (-2.6) | 80% (-5.3) | 60% (-11.7) | 5.9% | 0.40 | 14% |
| overdrawAtLimit = "free" (rule) | 96% (+0.0) | 85% (+0.3) | 72% (+0.9) | 1.3% | 0.31 | 27% |
| overdrawAtLimit = "forbidden" (rule) | 96% (+0.0) | 85% (+0.0) | 71% (-0.1) | 4.9% | 0.31 | 26% |
| overdrawAtLimit = "fury" (rule) | 95% (-1.0) | 81% (-3.4) | 67% (-4.3) | 18.3% | 0.31 | 26% |
| raiseCap = "perDie" (rule) | 96% (+0.0) | 85% (+0.0) | 71% (+0.0) | 4.7% | 0.31 | 26% |
| raiseDie = "any" (rule) | 96% (+0.0) | 84% (-0.5) | 72% (+0.3) | 4.4% | 0.30 | 27% |
| openTrait = "any" (rule) | 95% (-0.1) | 86% (+0.7) | 70% (-1.1) | 3.7% | 0.35 | 29% |
| waysIn = "one" (rule) | 93% (-2.1) | 79% (-5.4) | 64% (-7.4) | 5.2% | 0.40 | 20% |
| overdrawStack = "stack" (rule) | 95% (-0.1) | 85% (-0.1) | 71% (-0.7) | 4.5% | 0.32 | 26% |
| lootHandover = "none" (rule) | 95% (-0.5) | 84% (-1.0) | 70% (-1.3) | 4.8% | 0.31 | 26% |
| partyPolicy = "together" (policy) | 93% (-2.6) | 74% (-11.1) | 58% (-13.7) | 2.3% | 0.32 | 26% |
| partyPolicy = "singles" (policy) | 95% (-0.5) | 86% (+0.9) | 71% (+0.0) | 3.8% | 0.31 | 26% |
| captiveItems = "kept" (rule) | 96% (+0.8) | 86% (+1.1) | 73% (+1.3) | 4.7% | 0.31 | 26% |
| multiCaught = "separate" (rule) | 96% (+0.1) | 85% (-0.1) | 71% (-0.3) | 4.6% | 0.31 | 26% |
| monsterRule = "plus1" (rule) | 97% (+1.2) | 91% (+5.7) | 76% (+5.1) | 2.8% | 0.41 | 14% |
| monsterRule = "tie" (rule) | 97% (+1.0) | 89% (+4.3) | 76% (+5.0) | 2.5% | 0.40 | 18% |
| monsterRule = "d8" (rule) | 96% (+0.4) | 83% (-2.2) | 65% (-6.3) | 8.0% | 0.61 | 18% |
| monsterRule = "maskSafe" (rule) | 100% (+4.3) | 100% (+15.0) | 99% (+27.4) | 0.1% | 0.00 | 65% |
| chaseSusp = "no" (rule) | 98% (+2.0) | 90% (+5.3) | 78% (+7.0) | 0.8% | 0.46 | 32% |
| slipRule = "cost" (rule) | 96% (+0.1) | 85% (+0.1) | 72% (+0.7) | 4.6% | 0.31 | 26% |
| furnitureRule = "base" (rule) | 96% (+0.0) | 85% (+0.0) | 71% (+0.0) | 4.7% | 0.31 | 26% |
| furnitureRule = "hardLoc" (rule) | 95% (-0.2) | 84% (-0.5) | 71% (-0.1) | 4.7% | 0.31 | 25% |
| furnitureRule = "noisy" (rule) | 95% (-0.7) | 84% (-0.5) | 71% (-0.6) | 5.0% | 0.31 | 25% |
| furnitureRule = "both" (rule) | 95% (-0.7) | 84% (-1.1) | 71% (-0.5) | 4.8% | 0.31 | 23% |
| furnitureRule = "noisySlow" (rule) | 95% (-0.7) | 84% (-0.5) | 71% (-0.6) | 5.0% | 0.31 | 25% |
| furniturePlace = "separate" (rule) | 95% (-0.6) | 85% (+0.0) | 73% (+1.8) | 2.8% | 0.32 | 27% |
| exitRule = "free" (rule) | 92% (-3.3) | 75% (-9.7) | 63% (-8.5) | 7.0% | 0.40 | 23% |
| exitRule = "gate" (rule) | 92% (-3.3) | 75% (-9.7) | 63% (-8.5) | 7.0% | 0.40 | 23% |
| exitRule = "gateCarriers" (rule) | 96% (+0.2) | 87% (+2.6) | 74% (+2.1) | 4.1% | 0.29 | 26% |
| groupRule = "best3" (rule) | 96% (+0.1) | 84% (-0.5) | 71% (-0.1) | 4.8% | 0.33 | 26% |
| groupRule = "best4" (rule) | 96% (+0.1) | 84% (-0.5) | 71% (-0.1) | 4.8% | 0.33 | 26% |
| tellScope = "entity" (rule) | 96% (+0.1) | 84% (-0.8) | 68% (-3.6) | 4.7% | 0.33 | 26% |
| triesPerTurn = "one" (rule) | 96% (+0.3) | 85% (+0.6) | 72% (+0.4) | 4.7% | 0.31 | 27% |
| monsterPolicy = "mask" (policy) | 94% (-1.9) | 76% (-9.0) | 54% (-17.5) | 1.8% | 0.89 | 87% |
| monsterPolicy = "monster" (policy) | 94% (-1.1) | 80% (-5.3) | 67% (-4.0) | 6.9% | 0.31 | 0% |
| caughtWeight = 0.4 (policy) | 96% (+0.0) | 83% (-1.6) | 70% (-1.8) | 5.4% | 0.37 | 27% |
| caughtWeight = 2 (policy) | 95% (-0.7) | 85% (-0.2) | 67% (-3.9) | 3.8% | 0.27 | 24% |
| chargePolicy = "hoard" (policy) | 92% (-3.3) | 77% (-7.5) | 59% (-12.8) | 5.6% | 0.35 | 23% |
| furniturePolicy = "never" (policy) | 95% (-0.4) | 85% (-0.2) | 71% (-0.5) | 4.5% | 0.31 | 27% |
| furniturePolicy = "always" (policy) | 96% (+0.2) | 85% (-0.2) | 69% (-2.5) | 5.5% | 0.34 | 25% |
| roster = "placeholder" (content) | 96% (+0.1) | 85% (-0.2) | 71% (-0.5) | 3.1% | 0.33 | 27% |
| dutyEdge = false (content) | 96% (+0.0) | 84% (-1.1) | 71% (-0.7) | 4.7% | 0.32 | 26% |
| tellChance = 0 (content) | 96% (+0.9) | 87% (+1.7) | 75% (+3.5) | 2.6% | 0.35 | 27% |
| tellChance = 0.3333333333333333 (content) | 95% (-0.5) | 82% (-2.4) | 68% (-3.4) | 5.4% | 0.31 | 26% |
| weaknessLocal = 0 (content) | 95% (-0.1) | 85% (+0.5) | 73% (+1.2) | 4.1% | 0.30 | 26% |
| weaknessLocal = 0.5 (content) | 95% (-0.1) | 84% (-0.9) | 70% (-1.0) | 4.7% | 0.33 | 26% |
| weaknessFinal = 0.25 (content) | 96% (+0.1) | 85% (+0.1) | 72% (+0.5) | 3.3% | 0.31 | 27% |
| weaknessFinal = 1 (content) | 95% (-0.1) | 84% (-0.5) | 71% (-0.9) | 7.1% | 0.31 | 26% |

## Option outliers (win Δ, parties with vs without, same label and size)

gift The Invisible Man:open +3.0 · gift Frankenstein’s Creature:open +2.4 · entity The Werewolf +2.4 · gift The Mummy:open +2.4 · duty K5 +1.8 · gift A Ghost:open +1.5 · entity Jekyll & Hyde +1.5 · gift Dracula:open +1.1 · gift A Witch:open +1.0 · gift The Werewolf:hidden +0.9 · gift A Ghost:hidden +0.8 · gift Jekyll & Hyde:raise +0.7 · duty K3 +0.3 · gift Dracula:hidden +0.1 · duty K1 -0.0 · gift The Mummy:switch -0.1 · gift Frankenstein’s Creature:hidden -0.1 · gift The Werewolf:switch -0.1 · gift A Witch:switch -0.1 · gift Jekyll & Hyde:switch -0.2 · duty K4 -0.3 · entity Dracula -0.3 · entity Frankenstein’s Creature -0.3 · entity A Witch -0.4 · entity A Ghost -0.4 · gift Jekyll & Hyde:hidden -0.5 · duty K2 -0.6 · gift The Werewolf:raise -0.8 · gift A Witch:raise -0.8 · entity The Invisible Man -1.0 · duty K6 -1.1 · gift The Invisible Man:switch -1.1 · gift Dracula:switch -1.2 · entity The Mummy -1.3 · gift The Invisible Man:hidden -1.8 · gift The Mummy:raise -2.2 · gift A Ghost:raise -2.3 · gift Frankenstein’s Creature:raise -2.3

## Detectors

| Detector | Count | Per raid |
|---|---|---|
| a raise past d12 (lost) | 11953 | 0.664 |
| a die stepped below d4 (floored at d4) | 2710 | 0.151 |
| final flight stalled (no end after max rounds) | 147 | 0.008 |
| suspicion past the Limit (lost) | 4 | 0.000 |

## Counts (baseline)

| Event | Per raid |
|---|---|
| ability:hidden | 2.525 |
| ability:open | 3.852 |
| ability:raise | 1.006 |
| ability:switch | 1.199 |
| captive rescued | 0.046 |
| captive slipped free | 0.083 |
| captures | 0.213 |
| charges regained by a Critical | 0.465 |
| charges spent | 8.335 |
| cost:drop | 0.063 |
| cost:stepdown | 0.367 |
| cost:suspicion | 0.249 |
| cost:turn | 0.371 |
| declined rolls | 0.276 |
| final flight escaped | 0.114 |
| final flight with nobody free | 0.000 |
| final flight: dawn | 0.000 |
| final flight: limit | 0.145 |
| forked | 0.023 |
| furniture dropped: carrier captured | 0.001 |
| furniture dropped: final flight | 0.003 |
| group checks | 2.161 |
| group: forced low-value roll | 0.016 |
| local chase ended by the Limit | 0.100 |
| local chase escaped | 0.125 |
| local chases | 0.434 |
| local chases (shared) | 0.005 |
| loot handed over | 1.191 |
| lost turns | 0.414 |
| opened: only the opener goes on | 1.366 |
| overdraws:final | 0.037 |
| overdraws:local | 0.100 |
| overdraws:raid | 0.108 |
| overdraws:slip | 0.002 |
| susp:chase | 1.388 |
| susp:roll | 4.102 |
| susp:slip | 0.135 |
| susp:tell | 2.117 |
| tells | 2.117 |
| weakness taken by overdraw | 0.037 |

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
