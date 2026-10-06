# Rules simulator — method

A first rough simulator exists for the core rules (`docs/CORE-RULES.md` draft 0.2), running
on **placeholder content** (eight anonymous Entities, generated towns). Results:
`sim/REPORT.md` (rules as written, with the package table) and `sim/REPORT-T2.md`; the
findings in plain words are in `sim/FINDINGS.md`. This file describes the method that worked
on *Heisty Spideys*, which the simulator follows.

```
node sim/run.mjs                      # P0 + package table + presets + sweeps → sim/REPORT.md (~2 min)
node sim/run.mjs --package T2         # the same for a package → sim/REPORT-T2.md
node sim/tune.mjs --params '{…}'      # search label numbers toward the targets
npm test                              # includes test/sim.test.mjs
```

Until the rulebook exists, the dice rules live in `sim/rules.mjs`; they move to
`module/logic/` when the book's rolling chapter is written (§1, §8).

**Why simulate.** On Heisty Spideys the rulebook read as tense and risky, but the
simulator showed that, as written, a party almost could not lose: the dice pools were far
larger than the Difficulties, and the free bonuses stacked. No amount of reading would have
found that. Balance is measured, not guessed: a rule isn’t “done” until it has run here
against the agreed targets.

## 1. An engine that follows the rules text
- One engine plays a whole session (or the game’s natural unit of play) from start to
  finish, **strictly by the rules text** in `book/src/chapters/`. Every rule it implements
  carries a comment citing the chapter and passage.
- It reuses the Foundry system’s pure rules functions (`module/logic/*.mjs`) and static data
  (`module/config.mjs`) wherever they exist, so the simulator, the table and the virtual
  tabletop all run the same code.
- Characters are generated the way the book says players make them (all legal options,
  random but valid), with a validator that rejects an illegal character.
- Decisions players make (what to attempt, who helps, when to spend a resource) are simple,
  sensible, documented **policies**. A policy is never “perfect play”; where a policy matters,
  it becomes a parameter too.
- Abstractions are stated up front (for example: movement not simulated, adjacency assumed
  where the fiction allows it).

## 2. Every judgement call is a named parameter
Whatever the book leaves to the person running the game — or leaves undefined — is a
**named, documented parameter** (`params.mjs`) with:
- a default (the simulator’s best reading of the book),
- the alternative readings,
- a one-line title and a `doc` explaining each value,
- `ref`: the book passage that leaves it open.

The runner re-runs everything once per alternative value of every parameter (a **sweep**),
so the report can say what each judgement call is worth in win rate.

## 3. Generous and strict readings
Two presets bracket the real game:
- **generous** — every ambiguous rule read in the players’ favour;
- **strict** — every ambiguous rule read against them.

The real game lies between. Where a number moves a lot between generous and strict, the rules
are underspecified at that point, and that is a finding in its own right.

## 4. Clarified baseline and packages
- Once the ambiguities are known, pick one reading for each (with the author): the
  **clarified baseline**, written as proposed book text.
- Candidate rule changes are bundled into **packages** (P0 = baseline only, P1, P2, …). Each
  package = the strict reading + the clarified baseline + that package’s own changes, so a
  tested game is never easier than the book allows.
- Compare packages side by side on the same seeds and dice (common random numbers via
  `makeRng(seed, label, run)`), recommend one, and list the exact book changes it needs.

## 5. Balance targets
Agree the targets with the author **before** tuning, and report every package against them in
one table: e.g. win rate per difficulty level, how often things go badly wrong, how often a
character is taken out, how often a total loss happens, the share of rolls that are big
successes and failures, and whether players actually spend their resources. Report numbers,
not impressions.

## 6. Issue detectors
A recorder counts stats and fires **issue detectors** while the engine plays. Each detector
has a kind:
- `gap` — the rules don’t say what happens (the simulator had to choose),
- `broken` — the rules say, and the result looks wrong or degenerate,
- `info` — worth knowing.

Each has a title and the book reference. Typical finds on Heisty Spideys: obstacles stuck
forever because nothing ends a run of failures; rolls that can’t succeed; abilities or
options that never fire (dead content); options that are clearly stronger or weaker than
their peers; resources nobody spends; modifiers stacking past sensible limits.

## 7. Reports
- `run.mjs` → `REPORT.md`: top findings first, then tables (outcomes per scenario under each
  reading, parameter sweeps, detector rates, dead content, outliers). Same seed → same
  report, and the exact command is printed at the top.
- `packages.mjs` → the package comparison (`BALANCE.md`), with the targets row on top.
- `notes.mjs`: the rule gaps found while implementing, and which options are / aren’t modelled.

## 8. When the live rules change: freeze the old version
When the rulebook (and so `module/logic/`) moves to a new rules version, the simulator’s
baseline must still be able to measure the version it was built against. Copy the old
functions into a **frozen file** (e.g. `rules-v0_3.mjs`, with a header saying which version it
is and why it is kept) and point the old baseline at it; the new rules become a package to
compare against it.

## 9. Playtests by agents
The simulator is backed by procedural playtests: an agent plays a session strictly by the
book with **real dice** (a `node -e` random roll script, never invented results, every roll
logged in an appendix), logs every ambiguity with severity, the quoted passage and a
suggested fix, and tries the other defensible reading as a branch. After each fix round, a
verification playtest confirms the fixes at the table.

## 10. Tests
`test/` covers the simulator: determinism (same seed → same result), the engine against
hand-worked examples with fixed dice, the character generator’s legality, and each
package’s rule switches.

## Files
| File | What |
|---|---|
| `rng.mjs` | Seeded RNG (mulberry32 + FNV-1a stream derivation) |
| `rules.mjs` | Core dice rules: die steps, P2 bands, Critical candidates, the Monster showing, exact odds, Lead moves |
| `params.mjs` | Every judgement call (rule gaps, player policies, placeholder content) with defaults, alternatives, docs and refs; presets; the tunable numbers; the agreed targets; packages P0/T1/T2 |
| `entities.mjs` | Placeholder Entities E1–E8 (guardrail 1 arrangements, standard-effect abilities, Gifts, Weakness type) + validator + party generator |
| `town.mjs` | Random-table town generator (obstacles, locations, list, furniture, lock-up) and the placeholder chase table |
| `engine.mjs` | Plays one raid by the core rules: Turns, obstacles, group checks, Costs, Suspicion, local chases, capture and rescue, the final flight, results |
| `recorder.mjs` | Counts and issue detectors |
| `notes.mjs` | Rule gaps found while building the simulator; what is and isn't modelled |
| `run.mjs` | CLI → `REPORT.md` / `REPORT-<package>.md` |
| `tune.mjs` | Searches label numbers toward the targets (a proposal tool, not a decision) |
| `premade.mjs` | The premade towns of Chapter 9 (C21), read from `book/src/towns.json` through `book/tools/towns.mjs`, built into the same shape `makeTown` returns |
| `premade-check.mjs` | Plays each premade town as printed against its label's targets |
| `FINDINGS.md` | The first simulation's findings in plain words |
