# Simulation findings

The latest full numbers are in `sim/REPORT.md` (the decided rules with the approved starting numbers, 2,000 raids per label and party size of 3, 4 and 5 Entities, plus presets and sweeps):

```
node sim/run.mjs --runs 2000 --sweep-runs 500
```

**Caveat:** everything runs on placeholder content: eight anonymous Entities, generated towns, and placeholder Gifts, Duties, Weaknesses and Tells. The simulated players follow simple documented policies (`sim/params.mjs`). The results show how the core rules and numbers behave, not how the finished game will play.

## Where things stood after S9 (2026-10-04; S10 then changed the approach effect and the Limits; the report will be re-run after S11)

| Measure | Target | Simulated |
|---|---|---|
| Win, Easy / Standard / Hard | 87–93 / 72–78 / 55–60% | 91.5 / 75.6 / 56.3% |
| Forked, Easy / Standard / Hard | ≤2 / 3–7 / 8–12% | 0.6 / 3.4 / 6.3% (Hard a little low; the next mob step gives 18%) |
| Hard win with 3 / 4 / 5 Entities | close together | 57 / 57 / 58% |
| Captures per Hard raid | 0.2–0.3 (revised in S9) | 0.23 |
| Trouble, share of rolls | at most 22% (revised in S9) | 22% |
| Criticals (doubles on a Success) | about 5% (revised in S8) | 4.9% |
| Entities spending at least half their charges | ≥ 50% | 92% |
| Mask, on rolls where you choose | ≥ 25% | about 27% |
| Furniture, greedy party: Grand Year / lost a Win it had | ~50% / ~20% | 61% / 19% |
| Largest option outlier | within ±2.5 points | +5.7 (placeholder Gifts that "open an approach"; see S10) |

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

Along the way the simulated players were improved (they now weigh the cost of being caught properly, which plays 1–3 points better), and several things were measured that matter for the rest of the design:
- **The final flight is a knife-edge.** One point of mob Difficulty moves the forked rate by 10–20 points, because the majority rule turns a small edge per roll into a big edge per round. Forking is decided in the first two or three rounds.
- **Spending works.** A party that hoards its charges loses 11–14 points at Standard and Hard.
- **Tells are a big lever.** The placeholder Tell chance moves Hard by ±9–10 points, so the real Tells need their frequency designed with them.

## Still open
- **S11.** Smaller gaps the simulator had to fill (`sim/notes.mjs`): what the loud way costs, several Entities caught by one roll, whether chases take Turns, below a d4, several tries at one obstacle in a Turn, shared Castle Duties, the lock-up, a captive's loot, P7's raise cap.

## What the simulation can't tell yet
- **Real content.** Entity balance, real Tells and Weaknesses, and Perks all need the actual Entities.
- **Splitting the party, maps and entrances,** and premade raids.
- **How real players choose** between Mask and Monster, when they go for furniture, and when they rescue a captive.
