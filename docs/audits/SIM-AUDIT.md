# Simulator audit (2026-10-06)

Does the balance simulator (`sim/`) play the game the rulebook describes? Checked rule by rule against the rulebook source (`book/src/chapters/*.html`, the rules), `docs/CORE-RULES.md` 1.23 and every decision in `docs/DESIGN.md` that affects play (through V16 and F26), at main `972be06` (before) and after the fixes below.

**Method.** Read `sim/engine.mjs` (and `params.mjs`, `entities.mjs`, `town.mjs`, `premade.mjs`, `run.mjs`) against each passage; for every suspected deviation, counted how often it fires in default play with an instrumented copy of the engine (4,500 raids: 500 per label and party size); fixed the real ones, each with a test where practical (`test/sim.test.mjs`, scripted dice); measured each fix on its own (1,000 raids per label and party size, the same raids each time); then re-ran the full report (`node sim/run.mjs`, 2,000 raids per cell, rewrites `sim/REPORT.md`) and the premade towns (`node sim/premade-check.mjs 2000`). The committed `sim/REPORT.md` was first reproduced exactly from `972be06`, so the before numbers below are the code as it stood.

**Findings: 0 major, 11 minor, 5 nits (16), all fixed; 11 simplifications left as they are (§6), each defensible.** Severity: *major* = a rule missing or played differently enough to move a target; *minor* = a real deviation that fires in a measurable share of raids (or a report that checks a target wrongly), worth under a point; *nit* = rare or negligible. **No win or forked rate left its target** (§7); Thistlewick's forked rate, at the top edge before, is now inside.

**Status keys** in the tables: ✓ modelled as the book says · ≈ modelled differently (see the note) · — left out · **fixed** = was a deviation, fixed in this audit (SA-nn).

## 1. Findings

| Id | Sev. | What the simulator did | The book | How often (per raid, before) | Fix | Test |
|---|---|---|---|---|---|---|
| SA-01 | minor | At a group obstacle, once everyone free to act was past it, the obstacle was cleared for everyone there, so an Entity whose own roll got Trouble went on with the others. | Ch4: "each Entity who wants past rolls for itself"; T1. | 0.085 | `workLocation`: whoever hasn't got past stays behind it (`loc.behind`) and rolls again for itself; those past go on; loot, carrying and the furniture's obstacle are for those past (`pastHere`). | "whoever hasn't got past a group obstacle stays behind it" |
| SA-02 | minor | A group check planned every roll at once, so two rollers could count on the same helper's last charge and the second paid an overdraw (+2 Suspicion) nobody chose: half of all overdraws during the raid. | Ch4: "all declare their dice and abilities, then roll together" (a player wouldn't promise a charge twice). | 0.071 (of 0.138 raid overdraws) | `groupCheck`: plans in turn, setting aside the charges already promised. Raid overdraws 0.14 → 0.06. | counts in the report |
| SA-03 | minor | A switch ability to a trait the obstacle lists as the loud way was rolled quiet (Brute Force at "a locked front door: Sly; Brawn loud" dodged the +1). | Ch5: "A trait the obstacle lists as loud is loud however you came to roll it." (The Foundry audit found the same at the way out, FA-01.) | 0.077 | `rollCandidates`: a switch only to a trait the obstacle (or the ground) doesn't list; a listed trait is rolled as listed, loud included. | "a switch never dodges the loud way…" |
| SA-04 | minor | Only the roller's own switch abilities were offered. | Ch3: "An ability can help any Entity's roll at the same place … you can only open an approach on your own roll" (so a helper's switch counts; F1, F2). | missed option | `rollCandidates`: helpers' switches through `sources()` (your own only in a local chase and at the lock-up). | same test |
| SA-05 | minor | The roller handed its loot over (U2, the policy before a watched roll) after its roll was planned, so the Invisible Man with Out of Sight rolled as watched with empty hands, and a Ghost couldn't use Through the Wall. | Ch2: Out of Sight "only while you carry loot or furniture"; Through the Wall "not while you carry loot". | 0.067 | `workLocation`: plans again after the hand-over. | "Out of Sight: after handing its loot over…" |
| SA-06 | minor | A captive's slip roll that came up a Cost got a Storyteller Cost (Suspicion +1, lose a Turn, or a smaller die); with Built to Last it freed *and* cost. | Ch6: "Only a Success frees you; a Cost does nothing." | 0.019 (Suspicion +1: 0.005) | `captivesAct`: no Cost on a slip roll; the planner no longer values a Cost there unless it frees (Built to Last). | "slipping free: a Cost does nothing…" |
| SA-07 | minor | "Lose a Turn" (and picking up a dropped item) when the Entity's group moved next: it moved with the others and skipped its next roll at the new place instead, where it could still help with its charges. | Ch3: "lose a Turn (you skip your next action)"; Ch4: a move is an action. | 0.27 | `followsBehind`: the lost Turn is the move; the Entity follows a Turn behind and isn't there to roll or help until the Turn after next. | "a lost Turn skips a move" |
| SA-08 | minor | The planner weighed the Weakness an overdraw brings in the final flight only under the old `overdrawAtLimit: "weakness"`; under `"once"` (the rule since B3) it overdrew almost for free. | S1, B3: the Weakness is in play from your own next roll to the end of the flight. | 0.25 final-flight overdraws | `planRoll`: the same weight under "once". Final-flight overdraws 0.25 → 0.05 per raid; wins and forked unchanged. | policy (report counts) |
| SA-09 | minor | The report checked Hard captures as "≥ 0.2", so 0.35 showed ✓. | DESIGN S9: captures 0.2–0.3 per Hard raid. | report | `TARGETS.hardCaptures = [0.2, 0.3]`; `run.mjs`, `tune.mjs`. Now shows ✗ (§7). | — |
| SA-10 | minor | The report checked the furniture targets on the default players, who go for furniture only when it's safe (18% of raids, a Grand Year 81% of the time), so both showed ✗. | DESIGN 2026-10-04 and B2: the targets are for "a party going for furniture", tuned on `furniturePolicy: "always"`. | report | `run.mjs`: checked with "always"; the default players' figures shown beside them. | — |
| SA-11 | minor | The way out could be rolled again the same Turn by another Entity after Trouble. | Ch4, Getting Out: "one rolls for all … On Trouble … try again next Turn." (Ch4, Turns allows several tries at an obstacle in general.) | 0.023 | New rule switch `exitTries`: "one" (default, this reading) / "each" (as before). Worth 0.1 points either way. **A wording question for Richard** (§8). | "the way out: one rolls for all…" |
| SA-12 | nit | Fetch's old effect (B2 replaced it: "picking up a dropped item doesn't cost your action") still applied alongside B5's. | Ch2 Fetch (B5): the way out 1 easier; a final flight starts at Lead 3. | 0.003 | `pickCost`: only under `fetchRule: "pickup"`. | "B5's Fetch no longer waives…" |
| SA-13 | nit | In a group check each roller's Cost was picked right after its own roll, so it could be a Suspicion +1 the group was already taking (costing nothing). | F23; Ch3: "never … a Cost that costs nothing right then". | 0.015 | `groupCheck`: Costs picked after all the rolls. | "F23: a group check's Costs…" |
| SA-14 | nit | The Difficulty-12 ceiling of a rolled town counted the generated furniture location's unused obstacles before the furniture's extra obstacle, so they could take its 12. | Ch8: the ceiling counts the town's obstacles, "the furniture's obstacle … by its roll". | rare | `town.mjs` `applyCap`: list locations, then the extra obstacle, then the unused ones. | — |
| SA-15 | nit | `REPORT.md`'s "What is modelled / Not modelled" (and the engine and roster headers) said Perks aren't modelled, the Monster costs +1, the mob scales with party size, the party never splits and premade towns aren't played; the report called the Critical rule open. | — | docs | `notes.mjs`, `engine.mjs`, `entities.mjs`, `run.mjs`. | — |
| SA-16 | nit | The simulator reads the roster, tables and dice rules live from `module/config.mjs` and `module/logic/rules.mjs` (by design, `sim/README.md` §1), so a change there moves its baseline without anyone touching `sim/` (LESSONS: "Keep the simulator measuring the version it was built for"). | — | process | New tests pin what the simulator reads to the book: the eight Entities (dice, signatures, all 24 Gifts and Perks, Weakness timings), every label number, the chase table, and every rule switch's default; each Perk must be played in the engine (no placeholders). | "the roster the simulator plays is the book's", "the simulator's numbers…", "every rule switch defaults to the decided rule" |

## 2. Conformance: the rulebook, chapter by chapter

Code is `sim/engine.mjs` unless named; params are `sim/params.mjs` defaults.

### Chapter 2 — The Entities
| Rule | Status | Where | Note |
|---|---|---|---|
| Eight Entities, no duplicates in a party | ✓ | `entities.mjs` `makeParty` | 3, 4 and 5 Entities (`run.mjs` SIZES). |
| Five traits, one each d12–d4; Jekyll & Hyde two arrangements | ✓ | `entities.mjs` (from `module/config.mjs`) | Pinned to the book by test. |
| Mask d6 or Monster d10, chosen every roll | ✓ | `planRoll` (`monsterPolicy: "smart"`) | §3. |
| Three picks, each a default or a d6 | ≈ | `makeParty` | Gift and Perk uniformly at random (the d6 way); no extra weight on defaults. Right for measuring each option; a table of new players would play the defaults more often. |
| Castle Duty: unique; the trait die one size larger on your own rolls at a location of its kind, the furniture's obstacle included, not in a chase; counts as the one raise | ✓ | `makeParty` (R8), `planRoll` (`dutyEdge: true`) | Duties random and distinct (the book's defaults clash-and-reroll gives the same spread). |
| 3 charges, refilled each raid | ✓ | `NUMBERS.charges`, `makeState` | |
| Signatures (8) and Gifts (24) | ✓ | `entities.mjs` `abilitiesOf` | Pinned by test, effect and trait of each. |
| Perks (24) | ✓ | engine, by key (list above `hasPerk`) | Every one played with its book effect; none is a placeholder (test). Notes: Hypnotic Eyes and Steady Nerves change the roll but not the planner's odds (a policy, slightly pessimistic); Night Runner and Fear the Curse only alone (F14); Already Dead also in a shared chase (no "alone" in its text); Hidden Pockets keeps loot, not furniture (V16, already so); Fetch as B5 (**fixed** SA-12); Out of Sight after a hand-over (**fixed** SA-05); Built to Last on a slip Cost (**fixed** SA-06). |
| Weakness: Always (Dracula, a Ghost), Soon (the rest) | ✓ | `weakStart`, `weakNow` (`weaknessRule: "timing"`) | |
| Tell: +1 | ✓ | `arrive` | |
| The Draught: change form before a roll; starts as Jekyll; the Monster showing on a Jekyll roll makes him Hyde, free (Pillar of Society too) | ✓ | `rollCandidates`, `executeRoll` | ≈ the Draught isn't tried together with a helper's switch or Trample on one roll (legal combinations the planner skips; slightly pessimistic for Jekyll & Hyde). |
| Hedge Spell: any roll in the same place (only hers in a local chase, Ch6) | ✓ | `sources()` | |

### Chapter 3 — Rolling the Dice
| Rule | Status | Where | Note |
|---|---|---|---|
| The obstacle sets the trait; the loud way +1 whatever the result; any other trait needs an ability | ✓ | `rollCandidates`, `planRoll` (`loudRule: "suspicion"`) | |
| Difficulties 6 · 8 · 10 · 12; Success / Cost 1–2 short / Trouble 3+ short | ✓ | `rules.mjs` → `module/logic/rules.mjs` `band` | |
| Cost: Suspicion +1, drop an item, lose a Turn, next trait die smaller; never one that costs nothing; drop your own item, never what this roll wins | ✓ / ≈ | `pickCost` (`costChoice: "mixed"`, `dropRule: "recover"`) | Picked at random among those that cost something (Ch8's advice, "the one that hurts most right now", is judgement). ≈ "drop an item" is played as losing your next action with the item kept (the same cost). ≈ "lose a Turn when nothing waits" isn't screened out (0.03 per raid go unspent at the way out). Group checks **fixed** (SA-13); "lose a Turn" before a move **fixed** (SA-07). |
| Trouble: Suspicion +1, caught if watched | ✓ | `executeRoll` | |
| Critical: doubles on a Success; two Successes in a chase, else a charge back (not above the start) | ✓ | `executeRoll`, `majorityMove`, `leadMove` (`critRule: "doubles"`, `critEffect: "both"`) | |
| The Monster shows if higher than the trait die: +2 | ✓ | `executeRoll` (`monsterRule: "plus2"`) | |
| Abilities: a charge each; overdraw +2, or the Weakness once the hunt is on | ✓ | `executeRoll`, `overdrawAllowed` | |
| Raise the trait die one size (not past d12) | ✓ | `planRoll` (`raiseDie: "trait"`) | |
| Use the ability's trait instead (in a chase, instead of the ground's) | ✓ | `rollCandidates` | V2. Loud way **fixed** (SA-03); a helper's switch **fixed** (SA-04). |
| Roll the Monster without risking Suspicion (Trouble or a Cost still counts) | ✓ | `planRoll`, `executeRoll` | |
| Open an approach: an unlisted trait at 2 lower, any obstacle, never in a chase, only you get through and carry a piece out, the way out and a rescue as usual, a captive may open its own way out, watched | ✓ | `rollCandidates` (`openApproach: "easier"`, `openTrait: "unlisted"`, `openEase: 2`), `workLocation` (`loc.solo`) | |
| Spend before rolling; help anyone at the same place, even past obstacles you haven't crossed, for the charge not your action; open only on your own roll | ✓ | `sources()`, `ctxFor` | |
| At most one raise per roll, Duty included; raises and steps down cancel; nothing below a d4 | ✓ | `planRoll` (`raiseCap: "perRoll"`), `applySteps` | |

### Chapter 4 — The Raid
| Rule | Status | Where | Note |
|---|---|---|---|
| Lists of 4 / 5 / 5; one or two essentials | ✓ | `town.mjs` `makeTown`, `NUMBERS.labels` | Pinned by test. |
| A location: 1–3 obstacles in order; two ways in, the party picks one and keeps to it; watched if any obstacle is | ✓ | `makeTown`, `pickWayIn`, `arrive` (`waysIn: "two"`) | |
| 12 Turns; start by the way out, get in free; roll, move or wait; a move is a Turn | ✓ | `playRaid`, `playSplit` | |
| One at a time, results count at once; several may try one obstacle in a Turn; the party may split | ✓ | `workLocation` (`triesPerTurn: "each"`), `partyPolicy: "pairs"` | §3. |
| Dawn when the 12th Turn ends: anyone in town flees | ✓ | `playRaid`, `playSplit` → `finalFlight("dawn")` | |
| A beaten obstacle stays beaten (Success or Cost), unless group: each rolls for itself | ✓ | `workLocation` | **Fixed** SA-01. |
| Group check: declare, roll together, Suspicion once by the biggest trigger | ✓ | `groupCheck` | **Fixed** SA-02, SA-13. |
| Furniture at one of the list's locations, one extra obstacle 2 harder (at most 12), after the loot, for whoever is past | ✓ | `makeState`, `completeLocation`, `wantsFurnitureHere` (`furniturePlace: "onList"`, `furnitureRule: "noisySlowHard"`) | "Whoever is past" now leaves out anyone behind a group obstacle (SA-01). |
| Bulky one carrier, Huge two (not through a small entrance) | ✓ / — | `completeLocation` | No maps: a rolled town has no small entrance (B3), and no premade town marks one. |
| Carriers: no Mask, Nimble one size smaller | ✓ | `planRoll` | |
| Carrying, a move takes two Turns | ✓ / ≈ | `playSplit` (`g.busy`), `playRaid` | ≈ the group "arrives" (its Tell check) in the move's first Turn, not "when you act in the second"; it can't act there until after the second. Negligible. |
| Taking is free; Suspicion +1 at the end of every Turn from taking it, even set down, until out of town, lost or abandoned | ✓ / — | `noisyFurniture` (`furnitureNoise: "carried"`) | The simulated players never set a piece down or abandon it (V4, V11); they carry it until they leave or lose it, so every Turn is noisy, as the rule says for a piece taken. |
| Loot has no limit; hand it over free in the same place | ✓ | `workLocation` (`lootHandover: "free"`) | Policy: the roller hands its loot to a partner before a watched roll. **Fixed** SA-05. |
| The way out: one watched obstacle (Sly, Nimble, Brawn loud); everyone not captured is there; one rolls for all; Success or Cost: out, free; Trouble: caught, try again next Turn | ✓ | `exitLocation`, `workLocation` (`exitRule: "gateSingle"`) | **Fixed** SA-11 (`exitTries: "one"`). |

### Chapter 5 — Suspicion
| Rule | Status | Where | Note |
|---|---|---|---|
| One track, Limit 11 / 11 / 15; never past it | ✓ | `addSusp` | |
| Triggers: Trouble 1, the Monster 2, loud 1, a Cost 1, overdraw 2, a Tell 1, furniture 1 a Turn | ✓ | `executeRoll`, `arrive`, `noisyFurniture` | |
| Loud however you came to roll it | **fixed** | `rollCandidates` | SA-03. |
| One roll, one rise (overdraw included); good results never lower it | ✓ | `executeRoll` (`overdrawStack: "merge"`) | |
| Tells: first time anyone reaches each watched location (the lock-up; the way out when first back; not a captive brought in); 4–6; whose among the arrivers | ✓ / ≈ | `arrive` (`tellScope: "party"`, `tellPartyChance: 0.5`) | ≈ a location whose only watched obstacle is the furniture's extra one isn't counted as watched (the book doesn't say whether that obstacle makes the location watched; rolled towns only, rare). |
| Caught: Trouble at the watched obstacle you rolled; a group check's Troubles caught together; unwatched starts no chase | ✓ | `workLocation`, `groupCheck` | |
| At the Limit or dawn: everyone free flees; the Limit during a local chase ends it, anyone cornered that round captured first; Suspicion stops | ✓ | `localChaseBody`, `groupChase` (`corneredAtLimit: "captured"`), `finalFlight` | |

### Chapter 6 — Chases and Getting Forked
| Rule | Status | Where | Note |
|---|---|---|---|
| The Lead: Success +1 (a Critical +2), Cost 0, Trouble −1; a Cost costs nothing more; Trouble starts no other chase | ✓ | `leadMove`, `executeRoll` | |
| Local chase: Trouble and the Monster raise Suspicion, one roll one rise; several together: once a round | ✓ | `localChaseBody`, `groupChase` (`chaseSusp: "yes"`) | V1, V8, F13. |
| The ground: d6 chase table | ✓ | `chaseGround` (`chaseTable: "approved"`) | Pinned by test. |
| Weakness: one size smaller for the rest of the chase, Always from round 1, Soon from round 3 | ✓ | `weakNow` | F21: counted again in each chase. |
| Local chase: Lead 1, escape 4, mob 8 + half the Suspicion (at most 12), each round; the Mask allowed; abilities on your own roll; within the Turn; back where caught, Turn used | ✓ | `localChaseBody`, `sources()` | |
| Caught together: one Lead by the majority rule, captured together | ✓ | `groupChase` (`multiCaught: "shared"`, `finalMove: "margin2"`) | |
| Captured: the town takes what you carry, furniture included | ✓ | `capture` (`captiveItems: "lost"`) | F15, V16. |
| Rescue: Sly or Brawn loud, always watched, 10 / 10 / 12, a new one per capture; a move to get there; Success or Cost frees everyone, who act next Turn | ✓ | `lockupLocation`, `rescueObstacle`, `completeLocation` | |
| Slipping free: once a Turn from the Turn after; Sly, Nimble or Brawn loud; only a Success; a Cost does nothing; Trouble +1, no chase | **fixed** | `captivesAct` (`slipRule: "success"`) | SA-06. |
| Left behind | ✓ | `leaveTown`, `summarise` | |
| Final flight: everyone free; Lead 2 (Fetch 3); escape 5 / 5 / 6; mob 10 / 11 / 11, not by party size; abilities help anyone | ✓ | `finalFlight` | A helper's switch **fixed** (SA-04). |
| The majority rule: ±1, or ±2 when one side leads by two (B6); a Critical two Successes; any order (V12) | ✓ / ≈ | `majorityMove` (`finalMove: "margin2"`) | ≈ a fixed order (the party's), which the rules allow; V12's small edge (an overdrawer rolling first meets its Weakness a round later) isn't taken. |
| Escape: home with the goods; cornered: forked, captives left behind | ✓ | `finalFlight`, `summarise` | |
| Once the hunt is on: Suspicion stops; the Mask is off; overdraw once per flight, the Weakness from your own next roll, none while it's in play | ✓ | `planRoll`, `finalFlight` (`overdrawAtLimit: "once"`) | Planner **fixed** (SA-08). |

### Chapter 7 — How the Year Went
| Rule | Status | Where | Note |
|---|---|---|---|
| Grand Year, Win (every essential, at most one extra missing), Partial (at least half home), Bust, Forked | ✓ | `summarise` | |
| Each Entity left behind: one step down, Bust the floor | ✓ | `summarise` | |
| Epilogue; campaign upgrades | — | `sim/campaign-check.mjs` (`numbers.bonusCharges`) | Story only; the optional upgrades are measured separately, not in the baseline. |

### Chapter 8 — Building a Town; Chapter 9 — Three Towns; At the Table; Entity Sheet
| Rule | Status | Where | Note |
|---|---|---|---|
| Rolling a town: one location per item; d20 obstacle counts; d20 Difficulty; d10 watched; the second way in a different quiet trait; the ceiling on 12s | ✓ | `town.mjs` (`townBudget: "cap"`) | Shares pinned by `test/rules.test.mjs`. Ceiling order **fixed** (SA-14). V15 (a third place for linen) is flavour: the simulator never names places. |
| The obstacle table (d20) | ✓ | `OBSTACLE_TABLES.approved` (`DGF.obstacleTable`) | `test/rules.test.mjs`. |
| The difficulty table | ✓ | `NUMBERS.labels` | Pinned by test. |
| The shopping list: kinds by d6, essentials first, Standard odd/even | ✓ | `makeTown` | Item names are flavour. |
| The furniture table: four Bulky, two Huge; where: pick or d6 | ✓ | `makeTown`, `makeState` | |
| Lantern Night, villagers, Storyteller advice | — | | Flavour; "choosing Costs" is judgement (≈ above). |
| The three premade towns, as printed | ✓ | `premade.mjs` from `book/src/towns.json` | `premade-check.mjs`. |
| At the Table, the Entity Sheet (C22) | ✓ | — | They restate the chapters and add no rule; nothing to model. |

## 3. Conformance: the decisions log

Every decision that affects play, with where it lives. ✓ unless marked.

| Decisions | Status | Where / note |
|---|---|---|
| 2026-10-04 core (step dice, guardrails, roster, Gift + Perk + Duty, two abilities and the four effects, own charges, overdraw, three ways to build a town, rolled list, essentials, Grand Year, size classes, the Suspicion package, the Lead chase, forked, two kinds of chase, majority, capture, 3–5 players) | ✓ | As in §2. Their numbers were set in S1–S11 and B1–B6. |
| S1 overdraw once the hunt is on · S2 the Monster +2 · S3 a dropped item picked up for your next action · S4 the way out · S5 mob not by party size, Tells once per location · S6 slip on a Success, local Lead 1, lock-up +2 · S7 furniture on the way, moves of two Turns · S8 Criticals · S9 numbers · S10 open = 2 lower · S11 → R1–R11 | ✓ | `overdrawAtLimit` "once" (S1 + B3; planner **fixed** SA-08), `monsterRule` "plus2", `dropRule` "recover" (≈ item kept), `exitRule` "gateSingle" (+ `exitTries` "one", SA-11), `finalMobPerExtraEntity` 0 / `tellScope` "party", `slipRule` "success", `furniturePlace` "onList", `critRule`/`critEffect`, `NUMBERS`, `openApproach` "easier" + `openEase` 2. |
| P1–P8 | ✓ | Ladder, bands, Costs (`pickCost`), Turns, dawn, group checks (`groupCheck`, **fixed** SA-02/13), abilities on others (`sources()`, **fixed** SA-04), results. |
| R1–R11 | ✓ | R1 `loudRule` (**fixed** SA-03); R2 `raiseCap` "perRoll"; R3 `captiveItems` "lost"; R4 `multiCaught` "shared"; R5 chase in the Turn; R6 d4 floor; R7 `triesPerTurn` "each" (the way out excepted, SA-11); R8 unique Duties; R9 the lock-up; R10 drop only with loot; R11 the Limit stops. |
| T1–T10 | ✓ | T1 (**fixed** SA-01); T2 `waysIn` "two"; T3 once per location; T4 leave together, the exit Cost free; T5 `openTrait` "unlisted", `loc.solo`; T6 `raiseDie` "trait"; T7 one raise; T8 slip traits; T9 loot gone; T10 never a costless Cost (≈ a lost Turn when nothing waits). |
| U1, U2 | ✓ | U1 open at the way out and the lock-up; U2 `lootHandover` "free" (**fixed** SA-05). |
| C1–C10 | ✓ | Dice, signatures, the Draught, Weakness timings (Dawn dropped in B3), Tells 4–6, Perks, the four sheets, Duties: pinned by test. |
| C11, C13, C15, C19, C20, C22 | — | Cover text, festival, epilogue lines, villagers, Storyteller advice, sheet and reference: no rule to model. |
| C12, C14, C16, C17, C18, C21 | ✓ | Chase table; shopping kinds; furniture table (upgrades in `campaign-check.mjs`); rolled towns and the ceiling (SA-14); obstacle table; premade towns. |
| F1–F4, F9, F12–F21, F23 | ✓ | F1 open own roll; F2 one trait-changer a roll; F3 hunt rolls are chase rolls; F4 smaller dice stack; F9 exit Difficulty; F12 timings; F13 once a round; F14 alone-only Perks; F15 furniture lost; F16 essentials; F17 alone uses the majority rule; F18 no lock-up in the hunt; F19 no Duty in a chase; F20 the mob set each round; F21 Soon counted again; F23 (**fixed** SA-13). |
| F5 | ✓ | "Lose a Turn" is marked on the next Turn (**fixed** SA-07 for moves). |
| F6–F8, F10, F11, F22, F24–F26 | — | The online version's tracker, sheets, item choice, defaults, by-hand group checks, the Storyteller adding fleers, the epilogue, dawn mid-chase (the book's local chase ends within its Turn, so only the Limit can come during one, as simulated) and the in-raid tick: no rule for the simulator. |
| B1–B6 | ✓ | B1 numbers; B2 `furnitureRule` "noisySlowHard"; B3 all seven parts (local mob 8, escape 5, Limits 11, overdraw once, captured first, no Dawn timing, no small entrances); B4 Broomstick with Nimble; B5 `fetchRule` "flightExit" (**fixed** SA-12); B6 `finalMove` "margin2" in flights and shared chases. |
| V1–V16 | ✓ | V1 `chaseSusp` "yes"; V2 switches in chases (helpers' in the flight, SA-04); V3 overdraw; V4 every Turn from taking (`furnitureNoise` "carried"; never set down); V5 Already Dead joins the flight; V6 hand-over; V7 Broomstick; V8 once a round; V9 the hunt brings home what's carried (the players never seek it); V10 B6 kept; V11 abandon (— never chosen); V12 any order (≈ fixed order); V13, V14 no change; V15 flavour; V16 Hidden Pockets keeps loot, not furniture. |

## 4. Defaults: every rule switch is on the decided rule

All 33 rule switches in `sim/params.mjs` (with `openedRule`, added in the follow-up, §9) (and the content switches the book fixes: the chase table, the roster, the Duty edge, the Weakness timing) default to the decided rule; none needed changing. The new test "every rule switch defaults to the decided rule" lists each with its decision, so a switch that drifts, or a new one added without a decided default, fails `npm test`. In brief: `critRule` doubles, `critEffect` both (S8); `costChoice` mixed, `dropRule` recover (P3, S3, T10); `loudRule` suspicion (R1); `openApproach` easier, `openEase` 2, `openTrait` unlisted (S10, T5); `overdrawAtLimit` once (S1, B3); `overdrawStack` merge; `furnitureRule` noisySlowHard, `furniturePlace` onList, `furnitureNoise` carried (S7, B2, V4); `finalMove` margin2 (B6); `raiseCap` perRoll, `raiseDie` trait (R2, T6); `waysIn` two (T2); `lootHandover` free (U2); `captiveItems` lost (R3, T9); `multiCaught` shared (R4); `monsterRule` plus2 (S2); `chaseSusp` yes (S6, V1); `slipRule` success (S6); `corneredAtLimit` captured (B3); `fetchRule` flightExit (B5); `alreadyDeadTurns` 1 (C8); `exitRule` gateSingle (S4) and the new `exitTries` one (SA-11); `groupRule` all (P6); `tellScope` party, `tellPartyChance` 0.5 (S5, C4); `triesPerTurn` each (R7); `chaseTable` approved (C12); `roster` approved; `dutyEdge` on (C10); `weaknessRule` timing (C3). The numbers (`NUMBERS`) match Chapter 8's table (pinned by test).

Left over from before the content existed and unused by the defaults: `tellChance`, `weaknessLocal` and `weaknessFinal` (placeholder chances, read only by the non-default `tellScope: "entity"` and `weaknessRule: "chance"`), and `fetchRule`'s and `furnitureRule`'s rejected candidates. They only feed the sweeps. One clean-up: `furnitureRule` listed its default twice (removed).

## 5. Policies: how the simulated players choose

The players are simple and documented (`sim/params.mjs`, kind "policy"). Each choice below is legal; what matters is whether it makes a target look met or missed. Figures are from the new `sim/REPORT.md` (sweeps at 500 raids per cell, points against the baseline at that size).

| Choice | The policy | Reasonable? | What it does to the targets |
|---|---|---|---|
| Splitting up | **Pairs** (`partyPolicy`): each pair takes its own location; everyone regroups at the way out. Singles play about the same (−2.2 / −0.5 / −1.5). | Yes: every agent playtest split up. | **The win targets are met only by a party that splits.** Staying together lost 2 / 40 / 40 points (Easy / Standard / Hard) as first simulated; about half of that was crude together-play, now fixed (§9); played as a whole party it loses about 0 / 17 / 17 to the clock. The balance is tuned for split play; Chapter 4 says the party may split but doesn't say it should. |
| Mask or Monster | **Smart** (`monsterPolicy`): weighs the better odds against the Suspicion, harder near the Limit. | Yes. | Mask on 36% of the rolls with a choice and 28% of all rolls (the final flight forces the Monster): the "at least a quarter" target is met on all rolls by 3 points. Always the Mask costs 2 / 4 / 14 points, always the Monster 4 / 16 / 4, so both dice matter. |
| Fear of being caught | `caughtWeight` 1.2. | Yes. | Hard captures move with it (0.40 at 0.4, 0.31 at 2.0): the 0.2–0.3 target isn't met by any of the three. |
| Spending charges | **Spendy** (`chargePolicy`): spend whenever it clearly helps; charges are lost at dawn. | Yes: what the book tells players. | 74% of Entities spend at least half (target ≥ 50%). Hoarding costs 7 / 15 / 14 points. |
| Furniture | **Only when safe** (`furniturePolicy` "ifSafe"): with Suspicion 3 below the Limit and Turns to spare for the rest of the list. | Cautious: tried in 18% of raids. Its check ignores the +1 a Turn the piece adds once taken; it is safe mostly because it goes late. | **The furniture targets are met only with "always"** (the policy the target was set and tuned on, B2): Grand Year 54.8% when tried (target about half), a Win lost 17.4% (about 1 in 5). With the default players the gamble isn't one (80% and 5%), which the report used to mark as missed (SA-10). Neither policy ever abandons a piece. |
| Loot | Handed to a partner before a watched roll (U2); the roller plans its roll with empty hands (SA-05). | Yes. | +0.7 / +0.9 / +1.7 points against no hand-over; Out of Sight now counts. |
| Who rolls | The best-placed Entity at each obstacle and the way out; a group check takes everyone there. | Yes. | — |
| Rescues | One pair goes, once the essentials are claimed and if the Turns allow. | Reasonable; rescues stay rare (0.02 a raid against 0.05 slipping free). | Hard: 0.23 Entities left behind a raid. |
| Leaving | Leave early when Suspicion is one from the Limit and the essentials are in hand; in a final flight, carriers drop the piece when the Lead is 1. | Yes. | — |

## 6. Left as they are (defensible simplifications)
1. **Order of rolls in a flight round (V12):** fixed, legal; the small edge isn't taken.
2. **Setting furniture down, abandoning it (V4, V11):** never chosen. A party that always goes for furniture never abandons it near the Limit, so the "always" figures are slightly pessimistic for the gamble.
3. **A carried move's arrival** (Tell check) in its first Turn rather than the second: negligible.
4. **"Drop an item"** played as the next action lost with the item kept: the same price; the item never lies on the ground.
5. **The planner's odds** leave out Hypnotic Eyes, Steady Nerves and Hyde taking over (the rolls use them): slightly pessimistic for Dracula's Charm rolls and Jekyll.
6. **The Draught** isn't combined with a helper's switch or Trample on one roll (legal, untried).
7. **A location watched only by the furniture's obstacle** gets no Tell check (the book doesn't say).
8. **Random picks:** Gifts, Perks and Duties uniform; the right spread for the outlier measure.
9. **Together-play** (not the default): a captive gets one slip try over a two-Turn carrying move, and such a move can end a Turn past dawn.
10. **The Storyteller's Costs:** random among those that cost something, not "the one that hurts most"; a lost Turn that nothing waits for isn't screened out (0.03 a raid).
11. **No maps:** every move one Turn, no small entrances (none in rolled towns by B3, none marked in the premade towns).

## 7. Before and after

`node sim/run.mjs` (2,000 raids per label and party size, seed 1; before = main `972be06`, which reproduces the committed report exactly):

| Measure | Target | Before | After |
|---|---|---|---|
| Win, Easy / Standard / Hard | 87–93 / 72–78 / 55–60% | 92.2 / 74.2 / 56.1% | **92.3 / 74.9 / 57.0%** ✓ |
| Forked, Easy / Standard / Hard | ≤2 / 3–7 / 8–12% | 0.8 / 5.0 / 9.1% | **0.7 / 5.2 / 9.0%** ✓ |
| Hard win with 3 · 4 · 5 Entities | close together | 52.3 · 57.1 · 59.0% | 53.1 · 57.4 · 60.5% |
| Hard captures per raid | 0.2–0.3 | 0.35 (shown ✓) | **0.34 ✗** (now checked as a band) |
| Grand Year when tried / a Win lost (always goes for it) | ~50% / ~20% | 55.2% / 17.0% (not checked) | **54.8% / 17.4%** ✓ |
| Trouble; Criticals | 10–22%; 3–7% | 18.2%; 5.3% | 18.0%; 5.3% ✓ |
| Spend at least half | ≥ 50% | 73.4% | 73.8% ✓ |
| Mask: rolls with a choice (all rolls) | ≥ 25% | 35.1% (27.0%) | 35.6% (27.6%) ✓ |
| Overdraws per raid: raid / local chase / final flight | — | 0.14 / 0.13 / 0.25 | 0.06 / 0.13 / 0.05 |
| Largest option outliers (±2.5) | within ±2.5 | Dracula +2.7, Book-Learned −2.7 | Jekyll & Hyde −3.4, Rattle −3.2, Dracula +3.1, Book-Learned −3.1 (seed 1; see below) |

Each fix on its own (1,000 raids per cell, seed 1, applied in this order; win E / S / H, forked E / S / H):

| Step | Win | Forked | Note |
|---|---|---|---|
| Before | 92.4 / 74.5 / 55.2 | 0.8 / 4.9 / 9.2 | |
| SA-12 Fetch, SA-06 slip Cost | 92.4 / 74.6 / 54.9 | 0.8 / 4.8 / 9.2 | |
| SA-03 a switch never dodges the loud way | 92.4 / 74.4 / 54.8 | 0.8 / 4.9 / 9.1 | |
| SA-04 a helper's switch | 92.5 / 74.8 / 55.4 | 0.8 / 5.0 / 9.6 | |
| SA-08 the planner weighs a flight overdraw's Weakness | 92.5 / 74.6 / 55.4 | 0.8 / 5.2 / 9.5 | flight overdraws 0.27 → 0.05 a raid |
| SA-01, SA-02, SA-13 group checks | 92.2 / 74.3 / 55.3 | 0.8 / 5.4 / 9.4 | raid overdraws 0.15 → 0.06 a raid |
| SA-05 plan after the hand-over, SA-11 one way-out roll a Turn | 92.2 / 75.0 / 56.1 | 0.8 / 5.2 / 9.1 | the hand-over: +0.1 / +0.3 / +0.8 on seed 2; one way-out roll: ±0.1 |
| SA-14 the ceiling | 92.2 / 75.1 / 56.1 | 0.8 / 5.1 / 9.1 | |
| SA-07 a lost Turn skips a move | 92.2 / 75.2 / 56.1 | 0.8 / 5.2 / 9.1 | |

**The premade towns** (`node sim/premade-check.mjs 2000`): Puddlecombe 89.5 → 89.6% won, 0.7 → 0.8% forked (targets 87–93, ≤2); Thistlewick 73.9 → 74.4%, 7.0 → 6.8% (72–78, 3–7; its forked rate was a hair over the top and is now inside); Gallowsmere 57.6 → 58.0%, 9.3 → 9.4% (55–60, 8–12). All inside their targets.

**Option outliers** move between runs by about ±0.5–1 point (more for a Perk, compared within one Entity's parties). On seeds 7 and 11 (2,000 raids per cell) the same code puts Jekyll & Hyde at −1.9 and −1.2 and Rattle inside ±2.5, so seed 1's −3.4 and −3.2 are noise around a spread that was already at the edge. **One change is real: Out of Sight** is +2.5 / +3.4 / +3.0 on seeds 1 / 7 / 11 (it was +0.6 before): with SA-05 the Invisible Man who hands his loot over can no longer be caught, as the Perk says, and the simulated players use that before every watched roll. Dracula stays +2.1 to +3.1, as before the audit.

## 8. Still missing a target, and for Richard
- **No win or forked rate left its target**, on seed 1 or on seeds 7 and 11 (92.0–92.3 / 74.9–75.6 / 56.0–57.0% won; 0.7–1.0 / 4.4–5.2 / 9.0–10.1% forked).
- **Hard captures, 0.34 per raid against 0.2–0.3** (S9). Missed before the audit too (0.35); the report hid it by checking only "≥ 0.2" (SA-09). No game number changed here; it is Richard's call whether to revisit the target or the numbers (B3 already brought it from 0.41).
- **Option outliers past ±2.5:** Out of Sight (+2.5 to +3.4, now that the Perk is played as written) and Dracula (+2.1 to +3.1, unchanged). The others past the line on seed 1 are within run-to-run noise.
- **SA-11, a wording question:** Chapter 4's way out says "one rolls for all … On Trouble … try again next Turn", while Chapter 4's Turns lets several Entities try one obstacle in a Turn. The simulator now reads the way out as one roll a Turn (`exitTries: "one"`); either reading moves wins by 0.1 points. A clause such as "(the way out is rolled once a Turn)" would settle it.
- **Policy dependence:** the win targets hold for a party that splits up, and the furniture targets for a party that always goes for the piece (§5).

`npm test` is green; `test/sim.test.mjs` has 24 tests (13 before; 11 new for this audit).

## 9. Follow-up (2026-10-06): Out of Sight, and a party that stays together

Details and tables in `sim/FINDINGS.md` ("After the audit").
- **Out of Sight** is +2.5 to +3.4 because the free hand-over (U2) lets the Invisible Man roll empty-handed. Four texts measured as `outOfSightRule` (default unchanged) on seeds 1, 7 and 11: "…, or someone at your place does" brings the Perk to +0.2 to +0.7 and is recommended (six words, nothing to roll or track, can't be played round); a d6 for being seen is +0.8 to +2.0; "…, or handed loot this Turn" is +1.0 to +2.0 but +2.6 to +4.0 against a party that hands it over a Turn earlier. Hard wins fall 0.6–0.9 points with the recommended text (still inside).
- **Together-play was crude:** the simulated players opened approaches that shut the whole party out (only the opener goes on), sent everyone through every group obstacle, and counted a Turn per obstacle. With `openPolicy`, `groupPolicy` and `planTime` on "auto" (a party that stays together now plays as a whole party; pairs and singles unchanged), a party that stays together wins 92 / 58 / 40% against pairs' 92 / 75 / 57%; the rest is the clock (with 14 Turns, 70 / 51% at Standard / Hard). Recommendation: the book should advise splitting up on Standard and Hard.
- **New rule switch `openedRule`:** the book lets the others still beat an opened obstacle their own way (Chapter 3 "only you get through", Chapter 4 "once anyone beats an obstacle…"); the simulator's shortcut (only the opener goes on; the others try once the opener is caught) plays the same as the book for players who wait for the opener, which the simulation shows is the better choice, so it stays the default.
