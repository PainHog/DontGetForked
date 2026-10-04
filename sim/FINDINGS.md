# First simulation: findings (2026-10-04)

The core rules (`docs/CORE-RULES.md` draft 0.2) were played 18,000 times per package (2,000 raids for each label and party size of 3, 4 and 5 Entities). Full numbers are in `sim/REPORT.md` (rules as written, plus the package table) and `sim/REPORT-T2.md`. Same seed, same numbers:

```
node sim/run.mjs --runs 2000 --sweep-runs 500
node sim/run.mjs --package T2 --runs 2000 --sweep-runs 500 --no-packages
```

**Caveat:** everything runs on placeholder content: eight anonymous Entities, generated towns, and placeholder Gifts, Duties, Weaknesses and Tells. The simulated players follow simple documented policies. The results show how the core rules and numbers behave, not how the finished game will play.

## Headline

| Package | Easy win | Standard win | Hard win | Forked (E · S · H) | Captures per Hard raid |
|---|---|---|---|---|---|
| **Target** | 87–93% | 72–78% | 55–60% | ≤2 · 3–7 · 8–12% | ≥ 0.3 |
| **P0**: starting numbers, rules as written | 85.3% | 60.8% | 10.5% | 0.0 · 0.1 · 0.3% | 0.00 |
| **T1**: tuned numbers, rules as written | 84.0% | 75.9% | 57.5% | 0.1 · 3.4 · 13.3% | 0.12 |
| **T2**: tuned numbers + two proposed rule fixes | 94.5% | 75.0% | 56.1% | 0.7 · 5.5 · 7.7% | 0.11 |

- **P0 is far off.** Hard is nearly unwinnable (10%), and nobody is ever forked.
  - Hard stacks five items, the stiffest obstacles and a Limit of 6, so Suspicion reaches the Limit before the list is done.
  - The final flight is too easy at the starting mob Difficulty.
- **Numbers alone (T1)** fix Standard and Hard, but **Easy can't get above about 84%**. The reason is the "drop an item" Cost (finding 3).
- **T2** adds two rule fixes, both for your call: **a roll to get out of town** and **a dropped item can be picked up again**. With retuned numbers it meets all three win targets, with Easy 1.5 points high, and comes close on forked.

### The numbers T2 uses (proposals, not decisions)

| | Easy | Standard | Hard |
|---|---|---|---|
| List size (essentials) | 3 (1) | 4 (1–2) | 4 (1–2) |
| Obstacle Difficulties (share of 6 · 8 · 10 · 12) | 40 · 50 · 10 · 0% | 15 · 50 · 30 · 5% | 0 · 40 · 45 · 15% |
| Suspicion Limit | 8 | 10 | 10 |
| Final-flight mob Difficulty (4 Entities; ±1 per Entity more or fewer) | 11 | 12 | 12 |
| Exit roll Difficulty (T2 only) | 6 | 8 | 8 |

**For every label:**
- 3 charges and 12 Turns.
- Local chase: the mob's Difficulty is 9 + half the Suspicion (at most 12), and the Lead starts at 2 and escapes at 4.
- Final flight: the Lead starts at 2 and escapes at 6.

## Findings that need your decision (largest effect first)

1. **Overdrawing in the final flight is free, and it carries the balance** (gap G4).
   - Once Suspicion is at the Limit, overdraw's +2 Suspicion means nothing, so every fleeing Entity raises every roll at no cost. That's about 8 overdraws per raid.
   - Forbidding it costs 12–13 points at Standard and Hard and lifts Hard forked from 8% to 36%.
   - T2's final-flight numbers assume it stays free.
   - **The rules need one sentence about what happens at the Limit;** then the final flight gets retuned.
2. **Mask or Monster isn't a real choice yet.**
   - Playing Monster every time costs only 0.5–1.7 points; playing Mask every time costs 25–27 at Standard and Hard.
   - The Mask is used on 24% of raid rolls and 12% of all rolls, against a target of at least 25%.
   - The Monster's risk (+1 Suspicion when it shows, 33% of Monster rolls) is cheap next to its extra +2 on average.
3. **Is a dropped item lost? (gap G16)**
   - If it is, "drop an item" is by far the harshest Cost. It decides about one Easy raid in seven: making drops recoverable is worth +14 points at Easy and +16 at Standard under P0.
   - The other three Costs are mild.
4. **Getting out of town costs nothing (gap G15).**
   - Once the loot is in hand, the party walks out with no roll unless the Limit or dawn has hit.
   - So carrying furniture (no Mask, Nimble one size smaller) and late Suspicion barely matter at the end. That's the Heisty lesson again: losing must cost something even at the end.
5. **Bigger parties do worse.**
   - Under T2, Hard is won 63%, 58% and 47% of the time with 3, 4 and 5 Entities. Forked rises from 2% to 16%.
   - Three causes add up:
     - group checks take the worst of everyone's results;
     - Tells are per Entity;
     - the final mob gets +1 for each Entity beyond 4.
6. **Captures are rare:** 0.11 per Hard raid against a target of at least 0.3.
   - A local chase usually either escapes or pushes Suspicion to the Limit, which starts the final flight.
   - Captives slip free easily, so rescues almost never happen.
7. **Furniture is safe for a cautious party and a trap for a greedy one.**
   - A party that waits until it's safe gets the Grand Year 80% of the time and almost never loses a Win for it.
   - A party that goes as soon as it has the essentials gets it 47% of the time and loses a Win it had in 33% of raids.
   - The target (about 50%, losing a Win about 1 time in 5) sits between the two.
8. **Criticals.**
   - Doubles on a Success happens on 4.9% of rolls; beating the Difficulty by 4 on 33.5%.
   - Beating it by 7 (15%) or by 8 (11%) lands in the 10–20% target.
   - A Critical still has no effect (gap G1). Giving it +2 Lead in chases is worth about 1 point.
9. **Trouble is 21.7% of rolls,** just above the 10–20% target.
10. **Tells are a big lever.** The placeholder frequency (1 in 6 per Entity at each watched location) moves Hard by ±9–10 points. Real Tells need their frequency designed along with their fiction.
11. **What "open an approach" means (gap G3)** is worth 5–7 points: unwatched, or just another trait switch.
12. **Spending works.** 88% of Entities spend at least half their charges, against a target of 50%. A hoarding party loses 11–14 points at Standard and Hard, so "spend your charges" is good advice.

## Smaller gaps
These are listed in `sim/notes.mjs` and in the report:
- what "the loud way" costs (G2);
- P7's raise cap, per die or per roll (G5);
- a captive's loot (G6);
- several Entities caught by one roll (G7);
- whether chases take Turns (G8);
- "drop an item" when nothing is carried (G9);
- what is below a d4 (G10);
- Suspicion past the Limit (G11);
- several tries at one obstacle in one Turn (G12);
- shared Castle Duties (G13);
- the lock-up (G14).

## What this simulation can't tell yet
- **Real content.** Entity balance, real Tells and Weaknesses, and Perks all need the actual Entities.
- **Splitting the party, maps and entrances,** and premade raids.
- **How real players choose** between Mask and Monster, and when they go for furniture. The policies are simple and documented in `sim/params.mjs`.
