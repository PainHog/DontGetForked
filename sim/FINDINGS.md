# Simulation findings

The latest full numbers are in `sim/REPORT.md` (the decided rules with the approved starting numbers, 2,000 raids per label and party size of 3, 4 and 5 Entities, plus presets and sweeps):

```
node sim/run.mjs --runs 2000 --sweep-runs 500
```

**Caveat:** everything runs on placeholder content: eight anonymous Entities, generated towns, and placeholder Gifts, Duties, Weaknesses and Tells. The simulated players follow simple documented policies (`sim/params.mjs`). The results show how the core rules and numbers behave, not how the finished game will play.

## Where things stand (after S1–S11, 2026-10-04)

| Measure | Target | Simulated |
|---|---|---|
| Win, Easy / Standard / Hard | 87–93 / 72–78 / 55–60% | 90.1 / 74.8 / 58.1% |
| Forked, Easy / Standard / Hard | ≤2 / 3–7 / 8–12% | 0.7 / 3.2 / 4.5% (Hard low; the final flight is a knife-edge, see below) |
| Hard win with 3 / 4 / 5 Entities | close together | 57 / 59 / 59% |
| Captures per Hard raid | 0.2–0.3 (revised in S9) | 0.41 (more than needed, in the direction S6 wanted) |
| Trouble, share of rolls | at most 22% (revised in S9) | 20.0% |
| Criticals (doubles on a Success) | about 5% (revised in S8) | 5.0% |
| Entities spending at least half their charges | ≥ 50% | 90% |
| Mask, on rolls where you choose | ≥ 25% | 33% |
| Furniture, greedy party: Grand Year / lost a Win it had | ~50% / ~20% | about 61% / 19% (S7 run) |
| Largest option outlier | within ±2.5 points | +3.9 (a placeholder Gift; real Gifts will replace them) |

## How we got here

The first run (core rules draft 0.2, starting numbers) was far off: Hard was won 10% of the time, nobody was ever forked, and captures were zero. Easy couldn't get above 84% with numbers alone. It found these problems, each now decided (`docs/DESIGN.md`, Decisions log; `book/REVIEW.md` rows 1–9):

| | Finding | Decision |
|---|---|---|
| S1 | Overdraw was free in the final flight (about 18 boosted rolls per raid) | Once the hunt is on, the Mask is off and overdraw puts your Weakness in play |
| S2 | Always rolling the Monster cost under 1 point: no real choice | The Monster showing costs +2 Suspicion |
| S3 | "Drop an item" as a permanent loss was far harsher than the other Costs | A dropped item can be picked up again, for your next action |
| S4 | Getting out of town needed no roll | One Entity rolls the way out for the party |
| S5 | Five-Entity parties were forked in 20% of Hard raids | The final mob isn't scaled by party size; Tells are checked once per location for the party |
| S6 | Captures were rare and captives always freed themselves | Slip free only on a Success; a local chase starts at Lead 1; the lock-up is 2 harder |
| S7 | Carrying cost almost nothing (carriers let others roll) | Furniture stands on the way; carrying it, every move takes two Turns |
| S8 | Criticals had no effect | Doubles on a Success: +2 Lead in a chase, otherwise a charge back |
| S9 | Numbers | The starting numbers (`docs/CORE-RULES.md`, Starting numbers) |
| S10 | "Open an approach" was described only in fiction and, read as unwatched, was the strongest effect | An easier way: the ability's trait at 2 lower Difficulty, watched as usual; Limits 12 / 13 / 15 |
| S11 | Smaller gaps the simulator had to fill | Provisional rulings R1–R11 (`docs/CORE-RULES.md`) |

Along the way the simulated players were improved (they now weigh the cost of being caught properly, which plays 1–3 points better), and several things were measured that matter for the rest of the design:
- **The final flight is a knife-edge.** One point of mob Difficulty moves the forked rate by 10–20 points, because the majority rule turns a small edge per roll into a big edge per round. Forking is decided in the first two or three rounds.
- **Spending works.** A party that hoards its charges loses 11–14 points at Standard and Hard.
- **Tells are a big lever.** The placeholder Tell chance moves Hard by ±9–10 points, so the real Tells need their frequency designed with them.

## After the first playtests (T1–T10, 2026-10-05)
Playtests PT1 and PT2 raised ten rule questions; Richard decided all ten as recommended (`docs/DESIGN.md`). In the simulator:
- **Two ways in (T2) is worth about +5 win points** at Standard and Hard: the party picks the better of two first obstacles. Raising only the trait die (T6) changes nothing measurable; open on unlisted traits only (T5) costs about 1 point.
- With the approved numbers the rules now win **91.5 / 78.1 / 61.8%** (Standard and Hard above target; forked 0.7 / 2.0 / 4.2%).
- **Package N1** put all six win and forked rates on target **for a party that stays together** (before the T5 fix below): the final flight's Lead starts at 3 everywhere, the final mob is 11 / 12 / 12 and the Limits 12 / 12 / 14.

## Splitting the party (2026-10-05)
Both playtests split up, so the simulator now can too (`partyPolicy`: "pairs", the new default; "together"; "singles"). Each group takes its own location, abilities help only within a group, and everyone regroups at the way out (T4).
- **Splitting is much stronger:** with the approved numbers, wins go from 91 / 78 / 62% (together) to **95 / 85 / 69%** (pairs; singles about 1–2 points more). Suspicion, captures and Limit flights hardly change: the gain is time. A party that stays together runs short of Turns and leaves extras behind; a split party doesn't.
- **The 12-Turn clock doesn't bite a split party.** Raids end around Turn 7–8, as both playtests did (Turn 9 and Turn 6).
- **A shorter night isn't the fix on its own.** At 8 Turns (package N2) the overall rates land near target, but Hard wins 42% with 3 Entities against 72% with 5: small parties can't cover the town in time. N1 under split play reaches only 95 / 82 / 65%.
- So the retune belongs with the town tables (how many obstacles a location has and how far apart they are decide how long a raid takes) and the real abilities, in the balance pass.

## Fixes after PT3 (2026-10-05)
- **T5 in the simulator:** an obstacle someone opened now lets only the opener go on (it used to clear the way for everyone). That costs about 1 point with a split party and 3–5 with a party that stays together.
- **Capture timing:** a captive's first try to slip free is the Turn after its capture (the simulator let it try the same Turn).
- **Overdraw** merging with the roll's other triggers or paid on top changes nothing measurable (overdraws during the raid are rare).

## For the balance pass (from PT1–PT3 and the simulator)
- **Win rates under split play are above target** (95 / 85 / 69% with the approved numbers); a shorter night alone punishes small parties.
- **A local chase is far deadlier than the final flight.** From Lead 1 against 12 with a d12 trait: 51% escape with the Monster, 19% with the Mask; a three-Entity final flight escapes 84–96%. The local mob reaches its cap of 12 at Suspicion 4, so "rises with Suspicion" hardly matters, and near the Limit the final flight is safer than a local chase.
- **The final flight runs long** (PT2: 9 rounds of 5 rolls) with no choices once charges are gone.
- **The fourth item can be worthless:** with one essential and three extras, a Win allows one extra missing, so once three items are home the fourth adds nothing (PT3 skipped it).
- **A group check raises Suspicion once,** so when one roller risks the Monster the others can too at no extra cost (P6, as decided).
- For the ability writing: hidden does nothing once the hunt is on and open is barred in chases, so only raise and switch work in a final flight; a raise on a d12 is wasted; the d4 floor can erase the carrying penalty; a Weakness in play from round 1 (a sunlight Weakness at dawn) bars overdraw for the whole flight.

## Still open
Win rates are above target under split play (95 / 85 / 69%); the retune waits for the balance pass, after the real Entities, Tells and town tables. Time pressure that doesn't punish small parties is a design question for that pass.

## What the simulation can't tell yet
- **Real content.** Entity balance, real Tells and Weaknesses, and Perks all need the actual Entities.
- **Maps and entrances,** and premade raids (splitting is now modelled, simply).
- **How real players choose** between Mask and Monster, when they go for furniture, and when they rescue a captive.
