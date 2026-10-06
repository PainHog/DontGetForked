# PT6: verification playtest after B6 and the PT5 rulings (Thistlewick, Puddlecombe, drills a–f)

## 1. What this is

A verification playtest of the fix round that followed PT5: **B6** (the Majority Rule box in Chapter 6: the shared Lead moves 2 when one side leads by two or more, in every final flight and every shared local chase), the rulings **V2** (a switch ability works in a chase in place of the ground's traits), **V4** (a piece of furniture raises Suspicion every Turn from when it is first taken until it leaves town or is lost, even set down) and **V5** (a Ghost with Already Dead cornered in the round the Limit comes just joins the final flight), and the PT5 wording fixes (J&H's starting form and when he drinks, the random Duty, Spectral in a moving Turn, passing the last obstacle, the furniture's obstacle last, halfway through a carry, carrying out an opened approach, a loud trait however rolled, the way out's Tell check, the forked captive and the epilogue, Chapter 9's villagers, the Entity Sheet and the At the Table page).

**Rules source:** the rulebook text only: `book/src/chapters/11-ch01.html` to `17-ch07.html`, `31-ch08.html`, `32-ch09.html`, `40-entity-sheet.html` and `41-reference.html`, read as text (commit 5b60866; the book did not change while I played). Not the simulator, not `docs/`, not the Foundry code. Where the book is silent I made a ruling, listed it in section 4, and logged it as a finding in section 8. The flight and chase odds in sections 8 and 9 are my own exact calculations from the book's numbers (each Entity's best die on each ground, Weaknesses on time, no charges), not the simulator's.

**Dice:** every random result is a real `Math.random` roll, numbered R1 onward and listed in section 10 (409 rolls). Drills say exactly what I chose at their start; every roll after that is real. I played the players to win and the Storyteller by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now").

---

## 2. Summary

| Line | What it puts through the text | Result | Ended | Suspicion |
|---|---|---|---|---|
| **Main line A**: Thistlewick (Standard) as printed, 4 random Entities, random picks | The premade Standard town; a random Duty clash; the furniture behind a watched obstacle; the way out's Tell check; an opened approach at the way out | **Grand Year**: all 5 items and the gilt mirror | Out on **Turn 7** | 6 of 11 (8 after the last roll) |
| **Main line B**: Puddlecombe (Easy) as printed, 3 random Entities, defaults | The premade Easy town; two lone local chases (Night Runner; **V2** Keen Nose in a chase); the furniture; the At the Table page alone (drill f) | **Grand Year**: all 4 items and the stuffed bear | Out on **Turn 7** | 7 of 11 (9 after the last roll) |
| Drill a1: Standard flight, 3 | **B6**; the Draught before a roll; a round-2 overdraw on a friend's roll | Escaped in **2 rounds** (14 dice) | — | — |
| Drill a2: Hard flight, 4 | **B6** on Hard; Dracula can't overdraw | Escaped in **3 rounds** (27 dice) | — | — |
| Drill a3: Hard flight, 5 | **B6** with five; dead charges | Escaped in **3 rounds** (33 dice) | — | — |
| Drill b: shared local chases | **B6** in b1 (two, Standard) and b2 (three, Hard) | Both escaped in **2 rounds** (10 and 14 dice) | — | b1 +0; b2 +3 |
| Drill c: switch abilities in chases | **V2** on your own roll (local chase, flights) and on a friend's roll (flight c3); c2 a Hard flight, c3 a Standard flight | c2 escaped in **7 rounds** (63 dice); c3 **forked in 12** (84 dice) | — | — |
| Drill d: furniture taken, set down, carried out | **V4**; Spectral in a moving Turn; the last obstacle passed; an opened approach and who carries | **Grand Year**, out on Turn 9; carrying +2 (one Turn set down) | Turn 9 | 6 of 11 |
| Drill e: Already Dead at the Limit | **V5**, set up twice and rolled; e2 hit it; then the flight (4 Entities, Standard) | e2: cornered in the Limit's round, **joined the flight**; the flight escaped in **3 rounds** (27 dice) | — | 11 of 11 |
| Drill f: At the Table alone | Main line B's lookups | 7 things needed a chapter (finding m4) | — | — |

**Fix targets and where each was exercised**

| Target | Where | Rolls |
|---|---|---|
| **B6** in final flights | a1, a2, a3, c2, c3, the drill e flight: six flights, 30 rounds; the Lead moved by 2 in 12 of them | R99–R186, R199–R372 |
| **B6** in shared local chases | b1 (two caught together), b2 (three) | R373–R396 |
| **V2** a switch ability in a chase, your own roll | Main B (Keen Nose, the Werewolf's local chase); a2, a3 (Bat); drill e flight (Brute Force, Ancient Lore); b1, b2 | R67, R126, R161, R202, R204, R374, R384 |
| **V2** on a friend's roll in a flight | c3 round 1: the Werewolf's Keen Nose on the Witch's roll (she rolled her own Wits d12) | R294 |
| **V4** set-down furniture still makes noise | Drill d (set down at the way out for a Turn, +1); main A and B (carried, +1 each) | R397–R409 |
| **V5** Already Dead in the Limit's round | Drill e2 (cornered and the Limit together, real dice) | R193–R198 |
| J&H starts as Jekyll, drinks before a roll | a1, a2, c2 | R104, R124, R133, R242 |
| Random Duty from its table | Main A (and a clash, rerolled) | R8, R11, R14, R17, R18 |
| Spectral in a moving Turn; passing the last obstacle | Drill d, Turn 5 (the hatter's rooftops) | R397 |
| The furniture's obstacle comes last | Main A, main B, drill d | R42, R72, R84, R403 |
| Halfway through a carry | Main A T6, main B T6, drill d T7 | — |
| Only the opener carries a piece out its approach | Drill d (Dracula opened the rooftops; the Ghost, past them by Spectral, carried) | R399 |
| A loud trait is loud however rolled | Not met in play (no switch ever landed on a loud trait); reads clearly | — |
| The way out's Tell check | Main A, main B, drill d (each on the first return) | R44, R90, R407 |
| Forked: the captive and the epilogue | c3 forked (no captive); epilogue read as the Forked line only | R372 |
| Chapter 9's villagers | Both main lines used the town's two faces | — |
| The Entity Sheet's new boxes | Every flight (Fleeing, Weakness in play, overdrawn this flight); J&H's form | — |
| The At the Table page | Drill f (main line B) | — |

**Counts: 0 blockers, 0 major, 5 minor, 3 wording** (section 8). By kind: **5 wording** (m3, m4, w1–w3: the book already implies an answer, or the fix only says more clearly what it means) and **3 rules** questions for the author (m1, m2, m5).

**PT5's 24 findings: 18 resolved, 0 partly, 6 not** (five of the six were kept as they are by decision, section 8.4).

**Flight lengths seen:** 2, 3, 3, 3, 7 and 12 rounds (one forked), against PT5's 2, 3, 22 and 31. Exact numbers from the book: a Hard flight of 4–5 now lasts **4.4–4.5 rounds** on average (was 9.6–10.1) and goes 10 rounds or more **8%** of the time (was 38–41%); but its escape chance fell **4–7 points** (to 73–77%), and 9% of those flights are forked in round 1 (none could be before). Section 9.

---

## 3. Setup

### 3.1 The towns as Chapter 9 prints them

**Thistlewick** (Standard): Limit 11, the way out 8, the lock-up 10, the final flight mob 11 escaping at Lead 5; a local chase from Lead 1 to 4 against 8 + half the Suspicion (at most 12). Five items, two essentials: **the wedding cake** (the baker, food), **a tea service** (the china shop, silver), a top hat (the hatter, cloth), a coil of rope (the ironmonger, tools), turnip seed (the seed merchant, plants). The furniture: a gilt mirror (Bulky) at the hatter, behind a guard dog (Charm 10, or Nimble the loud way, watched). Every location is watched (the hatter and the ironmonger by one obstacle each). Villagers: the mayor (judging the costume contest) and the vicar (a lantern and a pitchfork).

**Puddlecombe** (Easy): Limit 11, the way out 6, the lock-up 10, the final flight mob 10 escaping at Lead 5. Four items, one essential: **a wheel of strong cheese** (the tavern cellar, food), seed potatoes (the market garden, plants), knitting wool (the draper, cloth), an almanac (the schoolhouse, books). The furniture: a stuffed bear (Bulky) at the tavern cellar, behind a guard dog (Charm 10 / Nimble loud, not watched). All four locations watched. Villagers: the baker's wife (a lost cat) and the night watchman (tipsy).

Both pages check out against the rules: no natural 12 in either (the cap allows one); each furniture obstacle is 8 + 2; the lists, the numbers lines and the essentials match Chapter 8's difficulty table. I couldn't see the maps (they are art), but both pieces are Bulky, so a small entrance would not have mattered.

### 3.2 Main line A party (R1–R18)

d8 in the book's order (1 Dracula … 8 Jekyll & Hyde): R1 = 7, R2 = 6, R3 = 7 (repeat), R4 = 2, R5 = 1. Picks on a d6 (1–2 the first, 3–4 the second, 5–6 the third); the Duty on its table. 3 charges each.

| Entity | Brawn | Nimble | Sly | Charm | Wits | Signature | Gift (R) | Perk (R) | Duty (R) | Weakness |
|---|---|---|---|---|---|---|---|---|---|---|
| A Witch | d6 | d4 | d10 | d8 | d12 | Hedge Spell (raise, any roll there) | A Potion for That, Wits instead (R6 = 5) | Wise Woman (R7 = 6) | **Butler** (R8 = 4): the tea service | Rowan (Soon) |
| A Ghost | d4 | d12 | d10 | d8 | d6 | Through the Wall (open with Sly) | Chill, raise (R9 = 1) | **Rattle** (R10 = 3) | Butler (R11 = 4) taken: rerolled **Tailor** (R18 = 6): the top hat and the mirror | Cold Iron (Always) |
| Frankenstein's Creature | d12 | d8 | d6 | d4 | d10 | Brute Force (Brawn instead) | Hovel Watcher, hidden Monster (R12 = 4) | Built to Last (R13 = 5) | Librarian (R14 = 3): no books on the list | Fire (Soon) |
| Dracula | d8 | d10 | d6 | d12 | d4 | Mesmerise (open with Charm) | Wolf, raise (R15 = 5) | Hypnotic Eyes (R16 = 1) | **Handyman** (R17 = 5): the rope | Garlic (Always) |

### 3.3 Main line B party (R48–R50)

R48 = 4, R49 = 7, R50 = 2: **the Werewolf, the Witch, the Creature**, default picks, no Duty clash. 3 charges each.

| Entity | Dice | Signature | Gift | Perk | Duty (item here) | Weakness |
|---|---|---|---|---|---|---|
| The Werewolf | Brawn d10 · Nimble d12 · Sly d6 · Charm d4 · Wits d8 | Good Dog (hidden Monster) | Keen Nose (Wits instead) | Night Runner (alone: Lead 2) | Gardener (the seed potatoes) | Hounds (Soon) |
| A Witch | as above | Hedge Spell | Broomstick (open with Nimble) | Familiar's Warning | Cook (the cheese, and the bear's guard dog) | Rowan (Soon) |
| The Creature | as above | Brute Force | Mountain Stride (open with Nimble) | Strong Back | Handyman (none) | Fire (Soon) |

---

## 4. Standing readings (my rulings where the book is silent; the ones that matter are findings in section 8)

| # | Reading | Finding |
|---|---|---|
| S1 | A random Castle Duty that lands on a Duty already taken is rolled again (main A, R11 → R18), as the clash rule says for defaults. | w2 |
| S2 | "Open an approach" can be used at any obstacle, not only a way in (main B T5, the schoolhouse's children; drill d T7, the seed merchant's watchman), as PT5 also played it. | w1 |
| S3 | A carried move's second Turn ends when the carrier acts in that Turn ("each result (a move too) counts at once"), so the others can roll the way out after it in the same Turn and the piece leaves town before the Turn ends. Main A and main B each paid +1, not +2, for one carried move. | m3 |
| S4 | When you overdraw on a friend's roll, your Weakness starts with your next round, not with your own roll later in the same round (a1 R111, the drill e flight R215, c3 R301). PT5 read an overdraw on your own roll the same way. | m1 |
| S5 | A set-down piece leaves town only if someone holds it when the party leaves; it is picked up again free (drill d, Turn 9). | m5 |
| S6 | Each Turn I declared the order of acting before rolling. A local chase resolves inside the caught Entity's action, before the next Entity acts (main B, Turn 4). | — (the book's "one at a time, in any order" covers it) |
| S7 | In a premade town the faces are the town's two villagers (Chapter 9: "villagers (its faces)"). No moment in play needed a third. | — |
| S8 | An Entity past a group way in by Spectral may carry the location's piece out; only Dracula could have used his own opened approach (drill d). | — (the book implies it) |
| S9 | Hypnotic Eyes works on an opened approach rolled with Charm (main A T7, drill d T7 and T9): it is a Charm roll. | — |

---

## 5. Play log: main line A (Thistlewick, Standard, 4 Entities)

Notation: trait die + second die = total vs Difficulty → result. "Shows" = the Monster die beat the trait die. Sus = Suspicion after the roll. Charges are shown as before → after.

**Plan.** Split four ways on Turn 1, one Entity per location where its die or Duty is best: the Witch to the china shop (Butler; the front door is Sly, the back room Wits), Dracula to the baker (the window with Nimble, then the shopkeeper with Charm d12), the Ghost to the hatter (Tailor: the neighbour with Sly d12), the Creature to the ironmonger (the cart with Brawn). The seed merchant next; Dracula's Charm for the mirror's guard dog last.

**Turn 1 (Sus 0).** Moves; Tell checks at all four (every Thistlewick location is watched):

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R19 | the china shop (Witch) | 4 | A Black Cat: it stares at the vicar | 1 |
| R20 | the baker (Dracula) | 1 | — | 1 |
| R21 | the hatter (Ghost) | 2 | — | 1 |
| R22 | the ironmonger (Creature) | 5 | Head and Shoulders | 2 |

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R23–R24 | Witch, china shop way A (locked front door, Sly / Brawn loud, 8, not watched) | Sly d10 → d12 (Butler), Mask: 71% | 12 + 1 | 13 vs 8 | Success | 2 |
| 2 | R25–R26 | Dracula, baker way B (shuttered window, Nimble / Brawn loud, 8, not watched) | Nimble d10, Mask (65%); Mesmerise saved for a watched roll | 4 + 6 | 10 vs 8 | Success | 2 |
| 2 | R27–R28 | Ghost, hatter way A (nosy neighbour, Sly / Wits loud, 8, watched) | Sly d10 → d12 (Tailor), Mask: Trouble 14% against 8% with the Monster, but a show would be +1 every third roll even with Rattle | 12 + 2 | 14 vs 8 | Success: **the top hat** (the only obstacle) | 2 |
| 2 | R29–R30 | Creature, ironmonger way A (cart, Brawn / Nimble loud, 6, not watched) | Brawn d12, Mask | 3 + 3 | 6 vs 6 | Success, **Critical** (no charge spent: nothing comes back) | 2 |
| 3 | R31–R32 | Witch, china shop (dark back room, Wits / Sly loud, 8, not watched) | Wits d12, Mask | 6 + 6 | 12 vs 8 | Success, Critical (nothing back): **the tea service** (essential) | 2 |
| 3 | R33–R34 | Dracula, baker (shopkeeper, Charm / Sly loud, 8, watched) | Charm d12, Mask (Trouble 14%; the Monster's Hypnotic Eyes would show 30% of the time) | 10 + 5 | 15 vs 8 | Success: **the wedding cake** (essential) | 2 |
| 3 | R35–R36 | Creature, ironmonger (locked strongbox, Wits / Charm loud, 8, watched) | Hovel Watcher (3 → 2): Wits d10 + a hidden Monster, 79% | 5 + 1 | 6 vs 8 | **Cost**: **the rope**. "Drop an item" is barred (the rope is what this roll won); the Storyteller takes Suspicion +1 (a lost Turn or a smaller die would cost little on Turn 3) | 3 |
| 3 | R37 | The Ghost moves to the seed merchant | Tell check | 3 | — | — | 3 |
| 4 | R38–R39 | Ghost, seed merchant way B (muddy yard of geese, Sly / Nimble loud, 6, not watched) | Sly d10, Mask | 7 + 4 | 11 vs 6 | Success | 3 |
| 4 | — | The Witch moves to the seed merchant; Dracula and the Creature to the hatter | | | | | 3 |
| 5 | — | Before rolling, the Witch hands the tea service to the Ghost, and Dracula hands the cake to the Creature (free, same place): a capture would then cost no essential (PT5 m12) | | | | | 3 |
| 5 | R40–R41 | Witch, seed merchant (night watchman, Wits 10, watched) | Wits d12, Monster: Trouble 18% against 29% with the Mask; a chase at mob 9 was the bigger risk | 12 + 3 | 15 vs 10 | Success: **the turnip seed** | 3 |
| 5 | R42–R43 | Dracula, hatter furniture (guard dog, Charm / Nimble loud, 10, watched) | Charm d12, Monster under Hypnotic Eyes (shows only on +2): 70% | 4 + 5 | 9 vs 10 | **Cost** (the Monster beat his die by 1: no show). He carries nothing, so "drop an item" is out; Suspicion +1 | 4 |
| 6 | — | The Creature takes the mirror and sets off for the way out (Turns 6–7). Dracula, the Witch and the Ghost move to the way out | | | | | 4 |
| 6 | R44, R45 | The way out, the first time anyone comes back (Dracula, Witch, Ghost arrive) | Tell check 5; whose (1–2 Dracula, 3–4 Witch, 5–6 Ghost) 2 | | | No Reflection | 5 |
| 6 | — | End of the Turn: the mirror, +1 | | | | | 6 |
| 7 | — | The Creature acts first and finishes its carried move (S3) | | | | | 6 |
| 7 | R46–R47 | Dracula, the way out (Sly / Nimble / Brawn loud, 8, watched) | Mesmerise (3 → 2): Charm isn't listed, so Charm d12 at 6; Monster (92%: a show only matters if the roll fails) | 3 + 9 (shows by 6) | 12 vs 6 | Success: **everyone out** | 8 |

**How the Year Went: Grand Year.** Both essentials, all three extras and the gilt mirror; nobody left behind. "A year of plenty. The new piece goes in the great hall, and everyone pretends it was always there." Out on Turn 7 with five Turns to spare and **10 of 12 charges unspent** (the Creature's Hovel Watcher and Dracula's one Mesmerise were all the party needed). Carrying cost +1 (S3).

---

## 6. Play log: main line B (Puddlecombe, Easy, 3 Entities)

**Plan.** The Witch (Cook) takes the tavern cellar: the front door with Sly d12, the back room with Wits d12, then the bear's guard dog with Charm d10. The Werewolf (Gardener) takes the market garden. The Creature opens the draper's shopkeeper with Mountain Stride (Nimble d8 at 6: 79%, better than Brute Force's Brawn d12 at 8: 71%), then goes on to the schoolhouse.

**Turn 1 (Sus 0).** R51 = 6 at the tavern: the Witch's Familiar's Warning rolls a second d6, R54 = 2: the cat warns her, no Tell. R52 = 4 at the market garden: Eyebrows That Meet (Sus 1). R53 = 1 at the draper.

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R55–R56 | Witch, tavern way A (locked front door, Sly / Brawn loud, 8, watched) | Sly d10 → d12 (Cook), Mask | 11 + 3 | 14 vs 8 | Success | 1 |
| 2 | R57–R58 | Werewolf, market garden way B (geese, Sly / Nimble loud, 6, not watched) | Sly d6 → d8 (Gardener), Mask: 79% against the wall's 71% | 3 + 5 | 8 vs 6 | Success | 1 |
| 2 | R59–R60 | Creature, draper way A (shopkeeper, Charm / Sly loud, 8, watched) | Mountain Stride (3 → 2): Nimble isn't listed, Nimble d8 at 6, Mask | 5 + 4 | 9 vs 6 | Success: **the wool** (only the Creature through) | 1 |
| 3 | R61–R62 | Witch, tavern (back room, Wits / Sly loud, 6) | Wits d12, Mask | 5 + 6 | 11 vs 6 | Success: **the cheese** (essential) | 1 |
| 3 | R63–R64 | Werewolf, market garden (night watchman, Wits 8, watched) | Wits d8 → d10 (Gardener), Good Dog (3 → 2): a hidden Monster, 79% | 4 + 1 | 5 vs 8 | **Trouble**, caught | 2 |
| 3 | R65 | The Creature moves to the schoolhouse | Tell check | 2 | — | — | 2 |

**The Werewolf's first local chase** (alone: Night Runner starts it at **Lead 2**; escape at 4; mob 8 + 1 = 9; Hounds from round 3):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R66 = 5 parade (Charm, Sly: his d4 and d6) | R67–R68 **Keen Nose (2 → 1): Wits d8 in place of the ground's traits (V2)**, and Good Dog (1 → 0): the Monster hidden. 65% against 28% for Sly d6 and the Mask | 3 + 8 (shows, hidden) | 11 vs 9 | Success | 3 | 2 |
| 2 | R69 = 6 dead end | R70–R71 Brawn d10, Mask | 10 + 2 | 12 vs 9 | Success: **escaped** | 4 | 2 |

He is back at the market garden, his Turn used up. V2 read cleanly: Chapter 3's "(in a chase, instead of the ground's)" answered the question at the moment it came up.

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 4 | R72–R73 | Witch, tavern furniture (guard dog, Charm / Nimble loud, 10, **not** watched) | Charm d8 → d10 (Cook counts at the furniture's obstacle), Mask: Trouble here costs only +1 | 2 + 3 | 5 vs 10 | Trouble (no chase) | 3 |
| 4 | R74–R75 | Werewolf, the watchman again (no charges) | Wits d10 (Gardener), Mask: 65 / 18 / 17% | 3 + 1 | 4 vs 8 | **Trouble**, caught | 4 |

**The Werewolf's second local chase** (Lead 2 by Night Runner; mob 8 + 2 = 10):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R78 = 2 back alleys | R79–R80 Nimble d12, Mask (a show would make the mob 11) | 8 + 3 | 11 vs 10 | Success | 3 | 4 |
| 2 | R81 = 2 back alleys | R82–R83 Nimble d12, Mask | 8 + 2 | 10 vs 10 | Success: **escaped** | 4 | 4 |

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 4 | R76–R77 | Creature, schoolhouse way A (bolted back gate, Brawn / Charm loud, 8, not watched) | Brawn d12, Mask | 4 + 2 | 6 vs 8 | **Cost**. He carries the wool, so "drop an item" is possible (picking it up would cost a Turn); the Storyteller takes Suspicion +1, which costs more at Turn 4 | 5 |
| 5 | R84–R85 | Witch, the guard dog again | Charm d10 (Cook), Mask | 6 + 5 | 11 vs 10 | Success | 5 |
| 5 | R86–R87 | Werewolf, the watchman a third time | Wits d10, Mask | 10 + 3 | 13 vs 8 | Success: **the seed potatoes** | 5 |
| 5 | R88–R89 | Creature, schoolhouse (children, group, Charm 8, watched) | Mountain Stride (2 → 1) at an obstacle that isn't a way in (S2): Nimble d8 at 6, Mask: 79% | 8 + 3 | 11 vs 6 | Success: **the almanac** | 5 |
| 6 | — | The Witch takes the bear and sets off for the way out (Turns 6–7); the Werewolf and the Creature move there | | | | | 5 |
| 6 | R90, R91 | The way out, first return (the Werewolf and the Creature arrive; the Witch is halfway, between places) | Tell check 5; whose (1–3 Werewolf, 4–6 Creature) 6 | | | Head and Shoulders | 6 |
| 6 | — | End of the Turn: the bear, +1 | | | | | 7 |
| 7 | — | The Witch finishes her carried move first (S3) | | | | | 7 |
| 7 | R92–R93 | Werewolf, the way out (6, watched) | Nimble d12, Monster (92%) | 9 + 10 (shows) | 19 vs 6 | Success: **everyone out** | 9 |

**How the Year Went: Grand Year**: the cheese, all three extras and the stuffed bear. Out on Turn 7 with five Turns to spare; 4 of 9 charges unspent. The Werewolf was caught twice at the same watched obstacle and escaped both chases in two rounds each without a single Suspicion point: Night Runner's Lead 2 halves the distance.

---

## 7. Play log: drills

Flights: every Entity rolls the Monster d10 (the Mask is off). "S – T" counts Successes (a Critical as two) against Trouble; under B6 the Lead moves 1 toward the side with more, or 2 if it leads by two or more. Each round's dice are the ground roll and then two dice per Entity in the order listed.

### 7.1 Drill a: three final flights under B6

The parties were rolled on a d8 (no repeats), with default picks; I chose the rest of each start.

**a1. Standard, 3 Entities** (R94–R96: the Creature, the Mummy, Jekyll & Hyde; R97–R98 unused). A Limit flight, 1 charge each, J&H as Jekyll (he starts each raid as Jekyll). Lead 2, escape 5, mob 11. All three Soon.

| Round | Ground | Creature | Mummy | J&H | S – T | Lead |
|---|---|---|---|---|---|---|
| 1 | R99 = 3 market stalls | Brawn d12: 6 + 7 = 13 S | Brawn d10: 9 + 1 = 10 C | **the Draught before his roll** (1 → 0): Hyde Brawn d12: 11 + 10 = 21 S | 2 – 0 | **4** (+2) |
| 2 | R106 = 3 market stalls | 9 + 3 = 12 S | Brawn d10 → d12 by **J&H's Doctor's Bag, overdrawn** (free in round 2: his Weakness comes in round 3 anyway): 4 + 6 = 10 C | Hyde Brawn d12: 8 + 1 = 9 C (S4: his own roll the same round as his overdraw kept the d12) | 1 – 0 | **5: escaped** |

**Escaped in 2 rounds** (14 dice). Under the old rule round 1 would have been +1 and the flight at least one round longer.

**a2. Hard, 4 Entities** (R113–R116: the Witch, the Mummy, J&H, Dracula; R117–R118 unused). A Limit flight, 1 charge each, J&H as Jekyll. Lead 2, escape 6, mob 11. Dracula is Always (Garlic from round 1), so he can never overdraw ("while your Weakness is in play, however it came, you can't overdraw").

| Round | Ground | Witch | Mummy | J&H | Dracula | S – T | Lead |
|---|---|---|---|---|---|---|---|
| 1 | R119 = 6 dead end | Wits d12: 4 + 6 = 10 C | Wits d12: 12 + 8 = 20 S | Jekyll Wits d10: 7 + 4 = 11 S | **Bat** (1 → 0): Nimble d10 → d8 (Garlic): 8 + 3 = 11 S | 3 – 0 | **4** (+2) |
| 2 | R128 = 6 dead end | Wits d12: 4 + 10 = 14 S | Wits d12: 3 + 1 = 4 T | Jekyll Wits d12 (Doctor's Bag **overdrawn** on his own roll): 1 + 3 = 4 T; the Monster showed: **Hyde** | Brawn d6 → d8 (**Hedge Spell**, 1 → 0): 3 + 8 = 11 S | 2 – 2 | 4 |
| 3 | R137 = 6 dead end (every Weakness in play) | Wits d10: 3 + 10 = 13 S | Wits d10: 8 + 5 = 13 S | Hyde Brawn d10: 9 + 6 = 15 S | Brawn d6: 4 + 3 = 7 T | 3 – 1 | **6: escaped** (+2) |

**Escaped in 3 rounds** (27 dice). The Mummy's charge was never worth spending: on three dead ends it already had Wits, and nobody else had a better Wits.

**a3. Hard, 5 Entities** (R146–R150: the Mummy, the Witch, the Werewolf, R149 a repeat, Dracula; R151 the Invisible Man; R152–R153 unused). A Limit flight, 1 charge each. Lead 2, escape 6, mob 11.

| Round | Ground | Mummy | Witch | Werewolf | Dracula | Invisible Man | S – T | Lead |
|---|---|---|---|---|---|---|---|---|
| 1 | R154 = 6 dead end | Wits d12: 3 + 6 = 9 C | Wits d12: 5 + 10 = 15 S | Brawn d10: 9 + 10 = 19 S | **Bat** (1 → 0): Nimble d8: 7 + 3 = 10 C | Wits d10: 6 + 5 = 11 S | 3 – 0 | **4** (+2) |
| 2 | R165 = 4 rooftops | Wits d12: 2 + 1 = 3 T | Wits d12: 7 + 10 = 17 S | Nimble d12: 11 + 2 = 13 S | Nimble d8 → d10 (**Hedge Spell**, 1 → 0): 2 + 9 = 11 S | Wits d10: 4 + 3 = 7 T | 3 – 2 | 5 |
| 3 | R176 = 6 dead end | Wits d10: 4 + 3 = 7 T | Wits d10: 9 + 6 = 15 S | Brawn d8: 2 + 10 = 12 S | Brawn d6: 4 + 2 = 6 T | Wits d8: 8 + 9 = 17 S | 3 – 2 | **6: escaped** |

**Escaped in 3 rounds** (33 dice). Three charges went unspent: the Mummy's Ancient Lore and the Werewolf's Keen Nose (both already had their best trait on every ground) and the Invisible Man's (Unseen and Through the Gap do nothing in a flight, and holding a charge he can't overdraw: PT5 m8).

### 7.2 Drill b: shared local chases under B6

**b1. Start (chosen):** Standard, Suspicion 4, the Creature (Brute Force; 1 charge) and the Werewolf (Good Dog, Keen Nose; 1 charge) caught together in one group check at Thistlewick's crowded shop floor. One shared Lead from 1, escape at 4; mob 8 + 2 = 10; abilities only on your own roll; Night Runner doesn't apply (not alone); Suspicion rises once a round by the biggest trigger.

| Round | Ground | Creature | Werewolf | S – T | Lead | Sus |
|---|---|---|---|---|---|---|
| 1 | R373 = 2 back alleys | **Brute Force** (1 → 0): Brawn d12 in place of the ground's traits (V2), Mask: 12 + 5 = 17 S | Nimble d12, Good Dog (1 → 0): 6 + 6 = 12, **Critical** | 3 – 0 | **3** (+2) | 4 |
| 2 | R378 = 4 rooftops | Wits d10, Mask: 3 + 5 = 8 C | Nimble d12, Mask: 8 + 5 = 13 S | 1 – 0 | **4: escaped** | 4 |

**Escaped in 2 rounds, no Suspicion.** Under the old rule round 1 would have been +1 (Lead 2), and they would still be running.

**b2. Start (chosen):** Hard (Limit 15), Suspicion 8, the Mummy, the Witch and the Ghost (Chill; 1 charge each) caught together at Gallowsmere's tailor (the crowded shop floor). Lead 1 → 4; mob 8 + 4 = 12 (the cap). With the mob already at its cap, a show only brings the Limit closer, so all three let the Monster out.

| Round | Ground | Mummy | Witch | Ghost | S – T | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R383 = 1 square | **Ancient Lore** (1 → 0): Wits d12: 8 + 6 = 14 S | Sly d10 → d12 (Hedge Spell, 1 → 0): 6 + 1 = 7 T | Sly d10 → d8 (Cold Iron) → d10 (Chill, 1 → 0): 7 + 7 = 14, **Critical** | 3 – 1 | **3** (+2) | 9 (Trouble) |
| 2 | R390 = 6 dead end | Wits d12: 10 + 9 = 19 S | Wits d12: 1 + 10 = 11 C, **shows** | Wits d6 → d4 (Cold Iron); **Chill overdrawn** → d6: 6 + 4 = 10 C | 1 – 0 | **4: escaped** | 11 (+2: the show and the overdraw, one rise) |

**Escaped in 2 rounds, Suspicion 8 → 11.** The Ghost's overdraw cost nothing: the Witch's Monster showed in the same round, and a shared chase rises once a round by its biggest trigger (PT5 m17, kept). Exact odds for both set-ups are in section 9: being caught together is now better than being caught alone (finding m2).

### 7.3 Drill c: switch abilities in chases (V2)

**On your own roll, in a local chase:** main line B, the Werewolf's first chase, round 1 (R67): Keen Nose gave Wits d8 on the parade, where his traits were Charm d4 and Sly d6. **In a flight, on your own roll:** a2 and a3 (Dracula's Bat), the drill e flight (Brute Force and Ancient Lore, R202, R204). **On a friend's roll, in a flight:** c3 below. It turned out to be rare: with V2 each switch holder's own best use almost always beat helping a friend, so a friend's roll only got one when the holder already had its best trait on the ground (c3 round 1). In c2 the Mummy's Ancient Lore was again better spent on itself.

**c2. Start (chosen):** Hard, a Limit flight, the Mummy, the Witch, the Invisible Man and J&H (as Jekyll), defaults, 1 charge each. Lead 2, escape 6, mob 11.

| Round | Ground | Mummy | Witch | Invisible Man | J&H | S – T | Lead |
|---|---|---|---|---|---|---|---|
| 1 | R226 = 6 dead end | Wits d12: 4 + 7 = 11 S | Wits d12: 4 + 2 = 6 T | Wits d10 → d12 (Hedge Spell, 1 → 0): 8 + 2 = 10 C | Jekyll Wits d10 → d12 (Doctor's Bag, 1 → 0): 4 + 3 = 7 T | 1 – 2 | 1 |
| 2 | R235 = 1 square | **Ancient Lore** (1 → 0): Wits d12: 10 + 6 = 16 S | Sly d10 → d12 (Hedge Spell **overdrawn**): 4 + 10 = 14 S | Sly d12: 7 + 8 = 15 S | Jekyll Charm d12: 5 + 1 = 6 T | 3 – 1 | 3 (+2) |
| 3 | R244 = 5 parade | Charm d6: 3 + 7 = 10 C | Sly d8: 8 + 1 = 9 C | Sly d10: 8 + 5 = 13 S | Jekyll Charm d10: 1 + 2 = 3 T; shows: **Hyde** | 1 – 1 | 3 |
| 4 | R253 = 4 rooftops | Wits d10: 3 + 9 = 12 S | Wits d10: 4 + 4 = 8 T | Wits d8: 1 + 3 = 4 T | Hyde Nimble d8: 8 + 5 = 13 S | 2 – 2 | 3 |
| 5 | R262 = 4 rooftops | 8 + 1 = 9 C | 3 + 7 = 10 C | 2 + 1 = 3 T | 7 + 9 = 16 S | 1 – 1 | 3 |
| 6 | R271 = 6 dead end | Wits d10: 3 + 9 = 12 S | Wits d10: 8 + 4 = 12 S | Wits d8: 2 + 1 = 3 T | Hyde Brawn d10: 6 + 8 = 14 S | 3 – 1 | 5 (+2) |
| 7 | R280 = 2 back alleys | Sly d4: 2 + 10 = 12 S | Sly d8: 3 + 9 = 12 S | Sly d10: 1 + 2 = 3 T | Hyde Nimble d8: 4 + 10 = 14 S | 3 – 1 | **7: escaped** (+2) |

**Escaped in 7 rounds** (63 dice). The Lead sat at 3 for four rounds (two 1–1 and one 2–2 round: B6 changes nothing on a tie). The Invisible Man rolled Trouble in five of seven rounds and carried his dead charge all flight.

**c3. Start (chosen):** Standard, a dawn flight, Dracula (Bat), the Werewolf (Keen Nose) and the Witch (Hedge Spell), defaults, 1 charge each. Lead 2, escape 5, mob 11.

| Round | Ground | Dracula | Werewolf | Witch | S – T | Lead |
|---|---|---|---|---|---|---|
| 1 | R289 = 2 back alleys | Nimble d8 (Garlic) → d10 (Hedge Spell, 1 → 0): 6 + 8 = 14 S | Nimble d12: 4 + 2 = 6 T | **Wits d12 by the Werewolf's Keen Nose** (1 → 0; V2 on a friend's roll: she rolls her own Wits): 5 + 10 = 15 S | 2 – 1 | 3 |
| 2 | R296 = 6 dead end | **Bat** (1 → 0): Nimble d8 → d10 (Hedge Spell **overdrawn** by the Witch): 8 + 2 = 10 C | Brawn d10: 7 + 8 = 15 S | Wits d12 (S4): 4 + 5 = 9 C | 1 – 0 | 4 |
| 3 | R303 = 2 back alleys | Nimble d8: 4 + 1 = 5 T | Nimble d10: 8 + 7 = 15 S | Sly d8: 1 + 6 = 7 T | 1 – 2 | 3 |
| 4 | R310 = 4 rooftops | Nimble d8: 5 + 5 = 10 C | Nimble d10: 1 + 7 = 8 T | Wits d10: 5 + 3 = 8 T | 0 – 2 | **1** (−2) |
| 5 | R317 = 5 parade | Charm d10: 7 + 9 = 16 S | Sly d4: 4 + 8 = 12 S | Sly d8: 5 + 5 = 10 C | 2 – 0 | **3** (+2) |
| 6 | R324 = 2 back alleys | Nimble d8: 2 + 6 = 8 T | Nimble d10: 5 + 4 = 9 C | Sly d8: 4 + 5 = 9 C | 0 – 1 | 2 |
| 7 | R331 = 5 parade | Charm d10: 1 + 8 = 9 C | Sly d4: 1 + 4 = 5 T | Sly d8: 8 + 8 = 16, **Critical** | 2 – 1 | 3 |
| 8 | R338 = 6 dead end | Brawn d6: 1 + 8 = 9 C | Brawn d8: 4 + 3 = 7 T | Wits d10: 1 + 2 = 3 T | 0 – 2 | **1** (−2) |
| 9 | R345 = 1 square | Charm d10: 3 + 10 = 13 S | Sly d4: 1 + 6 = 7 T | Sly d8: 8 + 6 = 14 S | 2 – 1 | 2 |
| 10 | R352 = 2 back alleys | Nimble d8: 7 + 3 = 10 C | Nimble d10: 5 + 1 = 6 T | Sly d8: 5 + 9 = 14 S | 1 – 1 | 2 |
| 11 | R359 = 3 market stalls | Nimble d8: 6 + 5 = 11 S | Nimble d10: 6 + 1 = 7 T | Brawn d4: 2 + 3 = 5 T | 1 – 2 | 1 |
| 12 | R366 = 6 dead end | Brawn d6: 5 + 2 = 7 T | Brawn d8: 3 + 6 = 9 C | Wits d10: 4 + 2 = 6 T | 0 – 2 | **0: forked** (−2) |

**Forked in round 12** (84 dice). "The monsters in the flight are killed (a captive is left behind) and the raid is lost." Nobody was in the lock-up. The epilogue is the Forked line only ("then (except after Forked) one line for each kind…"): "The town tells the story for years. Next Lantern Night, the bells ring a little louder." Both new wordings read cleanly. The Lead moved by 2 four times, three of them down. From round 3 the Werewolf rolled Trouble in 7 of 10 rounds, with a d4 on every Charm/Sly ground.

### 7.4 Drill d: furniture taken, set down while waiting, carried out (V4)

**Start (chosen):** Thistlewick, the start of Turn 5, Suspicion 4. The Ghost (defaults: Chill, **Spectral**, Butler; 2 charges), Dracula (defaults; Duty Cook, as Butler is the Ghost's; 2 charges), the Creature (defaults: Mountain Stride, Strong Back, Handyman; 2 charges). In hand: the wedding cake (Dracula), the tea service (the Ghost), the rope (the Creature); all three at the ironmonger; the baker, the china shop and the ironmonger already Tell-checked. Left: the top hat and the mirror (the hatter), the turnip seed (the seed merchant). To see V4, the carrier takes the piece one Turn early and sets it down at the way out to wait (my choice: a party playing to win never would now, since setting down saves nothing; see below).

| Turn | Roll | What | Sus |
|---|---|---|---|
| 5 | R397 = 2 | The Ghost and Dracula move to the hatter; Tell check: nothing. The party picks way B, **the rooftops** (group, Nimble 10). The Ghost gets past it by **Spectral, "at no action, even in a Turn you move"**, and since it is the hatter's last obstacle, **"beat or pass the last and it's in your hand"**: the top hat, in the Turn it arrived | 4 |
| 5 | R398 = 3 | The Creature moves to the seed merchant; Tell check: nothing | 4 |
| 6 | R399–R400 | Dracula, the rooftops (group: he must get past for himself). **Mesmerise** (2 → 1): the rooftops list only Nimble, so Charm d12 at 8, Mask: 3 + 5 = 8, Success. "Only you get through (and only you can carry a piece out that way)" | 4 |
| 6 | R401–R402 | The Creature, the geese (Sly 6 / Nimble loud): **Brute Force** (2 → 1), Brawn d12 (quiet: the geese don't list Brawn), Mask: 3 + 6 = 9, Success | 4 |
| 7 | R403–R404 | Dracula hands the cake to the Ghost, then the guard dog (Charm 10 / Nimble loud, watched; "whoever is past all its obstacles may take on the extra one"): Charm d12 + Monster (Hypnotic Eyes): 10 + 10 = 20, Success, **Critical**: a charge back (1 → 2) | 4 |
| 7 | R405–R406 | The Creature, the watchman (Wits 10, watched): **Mountain Stride** at an obstacle that isn't a way in (S2), Nimble d8 at 8, Mask: 5 + 6 = 11, Success: **the turnip seed** | 4 |
| 7 | — | The Ghost, acting last, **takes the mirror** and sets off for the way out (Turns 7–8). It may carry it: it is past every obstacle there (S8). End of the Turn, halfway, "between places": +1 | 5 |
| 8 | R407 = 3 | The Ghost arrives and **sets the mirror down**; Dracula and the Creature arrive. The way out's Tell check (first return): nothing. End of the Turn: the piece is set down, but **"even set down"**: +1 | 6 |
| 9 | R408–R409 | The Ghost picks the mirror up (free; S5). Dracula, the way out: Mesmerise (2 → 1), Charm d12 at 6 + Monster: 8 + 10 = 18, Success (the Monster beat his die by 2: it shows under Hypnotic Eyes, +2, after the party is out) | 8 |

**Grand Year**, out on Turn 9. Carrying cost **+2**: one Turn carried, one set down. Under PT5's text the set-down Turn would have been free; under V4 it costs the same as carrying, so setting a piece down now buys nothing. Taking it on Turn 8 instead (carried Turns 8–9, the party leaving after the Ghost arrives in Turn 9, S3) would have cost +1.

What the drill showed about the new wordings:
- **Spectral in a moving Turn** and **passing the last obstacle**: both read cleanly and both mattered; the Ghost took an item in the Turn it arrived, with no roll.
- **The furniture's obstacle comes last**: "Once that location's loot is in hand, whoever is past all its obstacles may take on the extra one, and the piece." Clear: Dracula had to get past the rooftops himself first.
- **Only the opener carries a piece out its own approach**: clear for Dracula's way. It doesn't say how a piece leaves through a group way in that others got past for themselves; I let the Ghost carry it (S8), which the book implies.
- **Halfway through a carry**: "(halfway, you're between places)" settled where the Ghost was at the end of Turn 7. Nothing in play needed more.
- **V4**: "even set down" is unambiguous. Two small gaps around it are finding m5 (a piece that has been taken can never be put back, and a set-down piece at the way out when the party leaves).

### 7.5 Drill e: Already Dead cornered in the round the Limit comes (V5)

**Start (chosen):** Standard (Thistlewick), Turn 8, **Suspicion 10** (Limit 11). The Ghost (Chill; Perk **Already Dead**; 1 charge) caught alone: Lead 1, escape 4, mob 8 + 5 = 13, capped at 12; Cold Iron from round 1. The Creature, the Mummy and the Witch (defaults, 1 charge each) are elsewhere in town. From Lead 1, any Trouble corners the Ghost and raises Suspicion to the Limit in the same round.

- **e1:** R187 = 4 rooftops: Nimble d12 → d10 (Cold Iron) → d12 (Chill, 1 → 0), Mask: 11 + 5 = 16, Success, Lead 2 (R188–R189). R190 = 5 parade: Sly d8 (Cold Iron), Mask: 3 + 2 = 5, Trouble: Lead 1, Suspicion 11, the Limit (R191–R192). Not cornered: the chase ends and the Ghost joins the flight. Missed the case.
- **e2 (same start):** R193 = 3 market stalls: Nimble d12 (Chill), Mask: 5 + 6 = 11, Cost, Lead 1 (R194–R195). R196 = 4 rooftops: Nimble d10, Mask: 3 + 1 = 4, **Trouble: Lead 0, cornered, and Suspicion 11, the Limit, in the same round** (R197–R198).

Chapter 5 says "anyone the same round cornered is captured first and stays behind"; Already Dead now says "(if the Limit comes that round, you just join the final flight)". The Perk is the specific rule and reads cleanly against Chapter 5: the Ghost is not captured, loses no Turn (there are none left to lose), keeps what it carries, and flees with the others. V5 resolved PT5 m10.

**The flight** (Standard: Lead 2, escape 5, mob 11): the Ghost (0 charges; Always, so it can't overdraw), the Creature, the Mummy, the Witch (1 charge each).

| Round | Ground | Ghost | Creature | Mummy | Witch | S – T | Lead |
|---|---|---|---|---|---|---|---|
| 1 | R199 = 5 parade | Sly d8 → d10 (the Witch's Hedge Spell, 1 → 0): 6 + 9 = 15 S | **Brute Force** (1 → 0): Brawn d12: 9 + 7 = 16 S | **Ancient Lore** (1 → 0): Wits d12: 1 + 9 = 10 C | Sly d10: 2 + 1 = 3 T | 2 – 1 | 3 |
| 2 | R208 = 2 back alleys | Nimble d10 → d12 (Hedge Spell **overdrawn** by the Witch): 5 + 10 = 15 S | Brute Force **overdrawn**: Brawn d12: 5 + 2 = 7 T | Ancient Lore **overdrawn**: Wits d12: 9 + 2 = 11 S | Sly d10 (S4): 2 + 7 = 9 C | 2 – 1 | 4 |
| 3 | R217 = 1 square | Sly d8: 1 + 2 = 3 T | Sly d4: 3 + 9 = 12 S | Charm d6: 5 + 7 = 12 S | Sly d8: 4 + 10 = 14 S | 3 – 1 | **6: escaped** (+2) |

**Escaped in 3 rounds** (27 dice). Three free round-2 overdraws (PT5 m8, kept): every Soon Entity spent its charge in round 1 and overdrew in round 2, when the Weakness costs nothing extra.

### 7.6 Drill f: the At the Table page alone (main line B)

I ran main line B's lookups from the At the Table page, the Entity sheets and the town page. The page carried the roll and its results, the Mask and the Monster, the Suspicion triggers, "One roll, one rise", the Duty raise, the local chase (Lead, escape, mob, the Mask allowed, abilities on your own roll), the majority rule with B6, the chase table, the Weakness timing, the results and every Easy number. I had to open a chapter seven times:

1. **Whose Tell** when two arrive together (the way out, Turn 6): "Roll to see whose, among the Entities arriving" is only in Chapter 5. The page's "first visit to a watched place" also doesn't say the way out is watched, or that its check comes on the first return rather than at the start.
2. **Keen Nose in a chase** (the Werewolf's first chase): the page's "use the ability's trait" lacks Chapter 3's "(in a chase, instead of the ground's)", which is exactly the V2 ruling.
3. **Opening an approach** (the Creature, Turns 2 and 5): the page has "open your own approach (2 lower, your roll only, never in a chase)", but not that it only works where the obstacle doesn't list the trait, nor "Only you get through".
4. **After escaping a local chase**: "back where you were caught, with your Turn used up" is only in Chapter 6.
5. **Choosing a Cost**: "never a Cost that costs nothing right then" and "'drop an item' … never what this roll wins" are only in Chapter 3; the Storyteller needed both on Turn 4.
6. **The furniture**: when its obstacle may be tried ("Once that location's loot is in hand, whoever is past all its obstacles…") and what carrying does to a carrier ("Carriers can't use the Mask, and roll Nimble one size smaller") are only in Chapter 4. The page has "Carrying: moves take two Turns" and the +1 a Turn.
7. **Two ways in, keep to one**: only in Chapters 4 and 9 (the Chapter 9 intro, not the town's own block).

Each would fit in a short line. Finding m4.

---

## 8. Findings (most severe first)

No blockers and no major findings: every new rule (B6, V2, V4, V5) and every PT5 wording fix read cleanly at the moment it mattered, and every gap below had a workable ruling. Each finding is marked **wording** (the book already implies an answer, or the fix only says more clearly what it means) or **rules** (the fix would change a rule or a number: needs the author's decision; numbers only, no new numbers proposed).

### 8.1 Major

None.

### 8.2 Minor

| id | Kind | Passage (quoted, chapter) | What happened / what I did | Suggested fix |
|---|---|---|---|---|
| m1 | rules | Ch6: "You may still overdraw, once per flight, but your Weakness is then in play **from your next roll** to the end of the flight" · Ch6, the Majority Rule: "Everyone rolls each round." · Ch3: "Spend abilities before you roll." | When you overdraw **on a friend's roll**, your own roll later in the same round is, literally, "your next roll". Does your Weakness hit it? It came up three times, all in round 2: J&H's Doctor's Bag on the Mummy (a1, R111), the Witch's Hedge Spell on the Ghost (drill e flight, R215) and on Dracula (c3, R301). I ruled the Weakness starts with the overdrawer's next round (S4), the same way PT5 read an overdraw on your own roll; the literal reading would have made each of those three dice one size smaller. The choice decides whether a Soon Entity's round-2 overdraw on a friend still costs nothing (PT5 m8): under my reading all seven round-2 overdraws in this playtest were free. | Needs the author's decision; then say "from your next round" or "from your own next roll, even this round". |
| m2 | rules (balance) | Ch6, the Majority Rule: "If Successes outnumber Trouble, the Lead rises by 1, or by 2 if they outnumber it by two or more; if Trouble outnumbers Successes, it falls the same way" · "Entities caught together in one group check flee together on one shared Lead, which moves by the majority rule below" | **B6 did what it was for** (section 9: a Hard flight of 4–5 now averages 4.4–4.5 rounds, was 9.6–10.1; 10+ rounds 8%, was 38–41%; the longest flight in play was 12 rounds, against PT5's 22 and 31). Three side effects, exact from the book's numbers (best die per ground, Weaknesses on time, no charges): (1) **Hard flights of 4–5 escape 4–7 points less often**: 73–77%, was 77–84%. Standard parties of 3–4 escape 64–71%, between 5 points lower and 2 points higher than before; Easy parties of 3, 87–88%, 3 points lower. (2) **A flight can now be forked in round 1**: 9% of Hard flights of 4–5 and 8% of a Standard 3 (none could be before); by round 3, 16% of the Hard ones (was 6%) and 18% of the Standard one (was 9%). (3) **Being caught together now beats being caught alone**: the Creature and the Werewolf caught together at mob 9 (Mask) escape 44%, against 31% and 38% each alone and 34% together before B6; the Mummy, the Witch and the Ghost together at mob 12 (Monster) 28%, against 20–26% each alone and 19% together before B6. A shared chase also raises Suspicion only once a round. In play: c3 forked after the Lead fell by 2 three times; b1 and b2 both escaped in 2 rounds. | Needs the author's decision whether these are intended. |
| m3 | wording, or rules if not meant | Ch4: "Carrying, every move takes two Turns (halfway, you're between places). From the Turn a piece is taken until it leaves town or is lost, Suspicion rises by 1 at the end of each Turn, even set down." · "Entities act one at a time, in any order, and each result (a move too) counts at once." | When does a carried move end: when the carrier acts in its second Turn, or at the end of that Turn? I read "counts at once" as the first (S3): in main A and main B the carrier acted first on Turn 7, arrived, and the party rolled the way out after it in the same Turn, so one carried move cost **+1** (the end of Turn 6 only). Read the other way it costs **+2**, and the party leaves a Turn later. This is now the main lever on furniture noise, since V4 removed the set-down dodge. | Say which: e.g. "A carrier arrives when it takes its second Turn of the move" (or "at the end of that Turn"). |
| m4 | wording (usability) | At the Table: "The rules on one page. The chapters have the details." | Drill f (7.6): running main line B from the page alone, I needed a chapter seven times: whose Tell and the way out's check; a switch ability in a chase (V2); when an approach can be opened and that only you get through; where you are after escaping a local chase; the two limits on choosing a Cost; the furniture's obstacle and what carrying does to a carrier; two ways in, keep to one. | Add a short line for each, if they fit: e.g. "a switch replaces the ground's traits in a chase"; "open only where the trait isn't listed; only you get through"; "escaped: back where you were caught, Turn used"; "a Cost must cost something; never drop what this roll won"; "the furniture: after the loot, by whoever is past every obstacle; carriers no Mask, Nimble one size smaller". |
| m5 | rules (design question) | Ch4: "From the Turn a piece is taken until it leaves town or is lost, Suspicion rises by 1 at the end of each Turn, even set down." · "Taking a piece is free; drop it any time." · Ch6: "the town takes back what you were carrying, furniture included: it's gone for the night" | Under V4 a piece is "lost" only when its carrier is captured. A party that takes a piece and then gives up on it (the Limit is close, a carrier is needed elsewhere) can't stop the noise: dropped and walked away from, it still costs +1 a Turn until the end of the raid (taken on Turn 6, up to +6 by dawn). Not met in play; it came up while planning drill d. A smaller gap next to it: if a piece is set down at the way out when the party rolls, does it leave town with them? I had the carrier pick it up first (S5). | Needs the author's decision whether an abandoned piece should keep costing. If it should, say so; either way say the piece must be held to leave town. |

### 8.3 Wording

| id | Passage (quoted) | Issue | Suggested fix |
|---|---|---|---|
| w1 | Ch3: "**Open an approach nobody else can take:** if the obstacle doesn't list the ability's trait, roll that trait at 2 lower Difficulty." | "Approach" reads like a way in. I used it at a location's second obstacle twice (the schoolhouse's children, main B R88; the seed merchant's watchman, drill d R405), as PT5 did (Dracula at the smithy's watchman). Nothing forbids it, but a new group will ask. | "…at any obstacle, not only a way in." (Or "only at a way in", if that's meant: then it's a rules change.) |
| w2 | Ch2: "to pick at random, roll a d6 … (for the Castle Duty, roll on its table)" · "if two defaults clash in a party, the second player picks another or rolls a d6, rerolling any Duty already taken" | A random Duty that lands on one already taken: the clash rule speaks only of defaults. Main A: the Ghost rolled Butler (R11), the Witch's; I rolled again (R18, Tailor), as "No two Entities in a party take the same Duty" implies (S1). | "(for the Castle Duty, roll on its table, rerolling any Duty already taken)". |
| w3 | Ch2, Already Dead: "cornered in a local chase, you lose your next Turn instead of being captured" · Ch6: "escape and you're back where you were caught" | Where is the Ghost after a cornering it survives, and does it keep what it carries? The book implies "back where it was caught" and "yes" (it isn't captured, so the town takes nothing). Noticed setting up drill e; not met in play (e2 had the Limit, where V5 now answers it). | "…instead of being captured: you're back where you were caught, with what you carry." |

**Counts: 0 blockers, 0 major, 5 minor, 3 wording.** By kind: 5 are wording fixes (m3, m4, w1–w3, where the reading I used is what the book implies) and 3 are rules questions for the author (m1, m2, m5).

### 8.4 PT5's findings: what the book now says

| PT5 id | Status | Quote now in the book (or why not) |
|---|---|---|
| M1 local chase spiral | **not** (kept by decision) | Ch6 unchanged for a lone chase: "Your Lead starts at **1** and you escape at **4**. The mob's Difficulty is **8 plus half the Suspicion**…". B6 helps shared chases only (m2). In play the lone chases were short (main B, two of 2 rounds with Night Runner; drill e, 2 rounds each at Suspicion 10), but the numbers PT5 gave still stand. |
| M2 flight length | **resolved** | The Majority Rule box: "…or by 2 if they outnumber it by two or more". Six flights of 2, 3, 3, 3, 7 and 12 rounds; Hard 4–5 averages 4.4–4.5 rounds (section 9). Side effects: m2. |
| M3 J&H's starting form | resolved | Ch2: "change form, Jekyll to Hyde or back, before one of your rolls … He starts each raid as Jekyll." The sheet: "(Jekyll & Hyde; starts as Jekyll)". Used in a1, a2, c2. |
| m1 the way out's Tell check | resolved | Ch5: "(the lock-up included, and the way out when anyone first comes back to it; …)". Used in main A, main B and drill d. |
| m2 the last obstacle passed without a roll | resolved | Ch4: "beat or pass the last and it's in your hand". Drill d, Turn 5. |
| m3 Spectral in a moving Turn | resolved | Ch2: "at no action, even in a Turn you move". Drill d, Turn 5. |
| m4 the furniture's obstacle comes last | resolved | Ch4: "Once that location's loot is in hand, whoever is past all its obstacles may take on the extra one, and the piece." Ch9: "The furniture's obstacle is already 2 harder." |
| m5 random Duty | resolved | Ch2: "(for the Castle Duty, roll on its table)". The taken-Duty case: w2. |
| m6 villagers in a premade town | resolved | Ch9: "…custom, villagers (its faces), numbers and map." |
| m7 switch abilities in a chase | resolved (V2) | Ch3: "Use the ability's trait instead of the one the obstacle calls for (in a chase, instead of the ground's)." Used on own rolls and on a friend's (7.3). |
| m8 overdraw edges | **not** (kept by decision) | Ch6 unchanged: "You may still overdraw, once per flight…". Seven free round-2 overdraws by Soon Entities (a1, a2, the drill e flight ×3, c2, c3); the Invisible Man held a dead charge through a3 and c2. See also m1. |
| m9 delayed pick-up | resolved (V4) | Ch4: "From the Turn a piece is taken until it leaves town or is lost, … even set down." Drill d. Edges: m3, m5. |
| m10 Already Dead at the Limit | resolved (V5) | Ch2: "(if the Limit comes that round, you just join the final flight)". Drill e2, real dice. |
| m11 forked captive; epilogue | resolved | Ch6: "the monsters in the flight are killed (a captive is left behind)"; Ch7: "then (except after Forked) one line for each kind…". c3. |
| m12 handing loot before risky rolls | **not** (kept by decision) | Ch4 unchanged: "Loot has no limit; hand it over free in the same place." Used again: main A Turn 5 (twice), drill d Turn 7. |
| m13 halfway through a carry | resolved | Ch4: "(halfway, you're between places)". |
| m14 a piece behind an opened obstacle | resolved | Ch3: "Only you get through (and only you can carry a piece out that way)". |
| m15 a loud trait via a switch | resolved | Ch5 box: "A trait the obstacle lists as loud is loud however you came to roll it." Not met in play. |
| m16 Broomstick's strength | **not** (kept by decision) | Ch2 unchanged: "*Broomstick* (default): open an approach with Nimble." Not used in play (main B's Witch never needed it). |
| m17 a free overdraw in a shared chase | **not** (kept by decision) | Ch6 unchanged: "when several flee together, it rises once a round, by the biggest trigger". Happened again: b2 round 2 (the Ghost's overdraw under the Witch's show). |
| w1 At the Table's "a Cost +1" | resolved | "a Cost chosen as Suspicion +1". |
| w2 Fetch "while you're there" | **not** | Ch2 unchanged: "The way out is 1 easier while you're there". Not met in play (no Fetch). |
| w3 Entity Sheet boxes | resolved | "Form (Jekyll & Hyde; starts as Jekyll)", "Fleeing", "In a chase: □ Weakness in play □ overdrawn this flight". All used in the flights. |
| w4 a d12 raised and stepped down | resolved | Ch3: "(…and a d12 raised and stepped down stays a d12)". |

**PT5: 18 resolved, 0 partly, 6 not** (of 24). Five of the six not resolved (M1, m8, m12, m16, m17) are the rules questions the fix round decided to keep as they are (the review log, row 49: "V1, V3, V6–V8 no change"); the book's text is unchanged for each, and the effects PT5 reported still happen. The sixth, w2 (Fetch), is a small wording point left as it was.

---

## 9. Balance and usability notes

### 9.1 Numbers from play

- **Results:** main A (Thistlewick, Standard) **Grand Year** on Turn 7; main B (Puddlecombe, Easy) **Grand Year** on Turn 7; drill d Grand Year on Turn 9. With PT5's rolled Standard town (Grand Year on Turn 9), the last three full raids below Hard all ended with three to five Turns to spare. One raid per town is not a sample; it would be worth a simulator look at how often an Easy or Standard premade raid is over by Turn 7 or 8.
- **Charges:** main A left with **10 of 12** unspent, main B with 4 of 9 (despite "any you don't spend on a raid are lost, so spend them").
- **Suspicion at the end of each Turn:** main A 2, 2, 3, 3, 4, 6 (out on Turn 7 at 6; 8 after the last roll's show). Main B 1, 1, 2, 5, 5, 7 (out on Turn 7 at 7; 9 after).
- **Suspicion sources:** main A: Tells 3, Costs 2, carrying 1. Main B: Tells 2, Trouble 3 (two catches and one unwatched miss), a Cost 1, carrying 1. No Monster show raised Suspicion before the way out in either raid (the one show, in the Werewolf's first chase, was hidden by Good Dog).
- **Tells:** 5 of 14 checks went off (main A 3 of 6, main B 2 of 5 with one more stopped by Familiar's Warning, drill d 0 of 3).
- **Costs chosen** (Chapter 8's "the one that hurts most right now"): Suspicion +1 all three times. "Drop an item" was barred twice (the roller carried nothing, or only what the roll won) and was never best the third time.
- **Opened approaches:** 6 rolled, **6 Successes** (Dracula's Mesmerise three times, two of them at the way out; the Creature's Mountain Stride three times). With PT5's 12 (9 Successes, 3 Costs), opened approaches have never produced Trouble in 18 rolls.
- **Furniture:** the gilt mirror's guard dog took a Cost (main A); the bear's guard dog a Trouble then a Success (main B, unwatched); drill d a Critical. Carrying cost +1, +1 and +2 (one Turn set down, V4).
- **Local chases:** 6 played, every one over in **2 rounds**: main B ×2 (alone, Night Runner, both escaped, no Suspicion), b1 (two together, escaped, no Suspicion), b2 (three together, escaped, +3), e1 (the Limit) and e2 (cornered at the Limit; V5). Lone-chase odds are unchanged from PT5 (M1, kept); shared-chase odds are in m2.

### 9.2 Final flights under B6

**Seen in play** (each round is one ground roll plus two dice per Entity):

| Flight | Difficulty | Entities | Rounds | Dice | Lead after each round | Result |
|---|---|---|---|---|---|---|
| a1 | Standard | 3 | **2** | 14 | 4, 5 | escaped |
| a2 | Hard | 4 | **3** | 27 | 4, 4, 6 | escaped |
| a3 | Hard | 5 | **3** | 33 | 4, 5, 6 | escaped |
| drill e flight | Standard | 4 | **3** | 27 | 3, 4, 6 | escaped |
| c2 | Hard | 4 | **7** | 63 | 1, 3, 3, 3, 3, 5, 7 | escaped |
| c3 | Standard | 3 | **12** | 84 | 3, 4, 3, 1, 3, 2, 3, 1, 2, 2, 1, 0 | **forked** |

30 rounds and 248 dice in all; the Lead moved by 2 in 12 of the 30 rounds. PT5's four flights took 2, 3, 22 and 31 rounds (the last two 198 and 217 dice).

**Exact odds from the book's numbers** (best die per ground, Weaknesses on time, no charges, J&H in his better form each round). The old-rule column reproduces PT5's table, which checks the calculation.

| Party | Difficulty (escape at) | B6: escape | B6: mean rounds | B6: 10+ rounds | Before B6: escape | Before: mean | Before: 10+ |
|---|---|---|---|---|---|---|---|
| Main A: Witch, Ghost, Creature, Dracula | Standard (5) | 68% | 3.6 | 4% | 73% | 7.5 | 26% |
| Main B: Werewolf, Witch, Creature | Easy (5, mob 10) | 88% | 3.4 | 2% | 91% | 6.0 | 14% |
| a1: Creature, Mummy, J&H | Standard (5) | 71% | 3.9 | 5% | 70% | 7.5 | 25% |
| a2: Witch, Mummy, J&H, Dracula | Hard (6) | 74% | 4.5 | 8% | 79% | 10.1 | 41% |
| a3: Mummy, Witch, Werewolf, Dracula, Invisible Man | Hard (6) | 73% | 4.4 | 8% | 77% | 9.9 | 40% |
| Drill e flight: Ghost, Creature, Mummy, Witch | Standard (5) | 67% | 3.6 | 4% | 69% | 7.8 | 27% |
| c2: Mummy, Witch, Invisible Man, J&H | Hard (6) | 77% | 4.4 | 8% | 82% | 9.9 | 40% |
| c3: Dracula, Werewolf, Witch | Standard (5) | 70% | 4.0 | 6% | 71% | 7.4 | 25% |
| PT5 main A: Werewolf, Ghost, Invisible Man | Hard (6) | 69% | 5.3 | 13% | 71% | 10.2 | 42% |
| PT5 a2: Dracula, Werewolf, Invisible Man, J&H | Hard (6) | 77% | 4.4 | 8% | 84% | 9.6 | 38% |
| PT5 a1: Creature, Witch, Mummy | Standard (5) | 64% | 4.0 | 6% | 62% | 7.7 | 27% |
| the same | Easy (5, mob 10) | 87% | 3.4 | 2% | 90% | 6.0 | 15% |

20+ rounds: 0–1% under B6 for every party (4–10% before). Early ends, for two of them: the a3 party (Hard, 5) is forked by round 1 9% of the time, by round 3 16%, and has escaped by round 3 36% (before B6: 0%, 6% and 0%); the c3 party (Standard, 3) 8%, 18% and 39% (before: 0%, 9% and 16%). In play the parties spent their charges in round 1 and overdrew in round 2 (7 times); every round 1 and round 2 but c2's first ended level or up.

**Shared local chases** (Lead 1 → 4, the same assumptions): the Creature and the Werewolf at mob 9 with the Mask escape 44% in 3.2 rounds on average (34% in 5.1 before B6; alone, 31% and 38%); at mob 10 with the Monster 68% (66% before). The Mummy, the Witch and the Ghost at mob 12 with the Monster escape 28% in 2.6 rounds (19% in 3.8 before; alone, 20%, 26% and 22%). See m2.

**What felt good:** flights now fit in a few minutes: four of six were over in two or three rounds, and every round mattered (12 double moves). V2 made the Mummy, the Creature and the Werewolf feel like themselves in a chase, and a friend's switch on the Witch's roll was a nice table moment. V5 settled the Ghost's corner case in one parenthesis. Spectral taking the top hat the Turn the Ghost arrived felt like a ghost. Both town pages ran their raids without another chapter except for the lookups in 7.6.

**What felt bad:** c3: twelve rounds and a fork after the Werewolf rolled Trouble in 7 of 10 rounds from round 3 on (his Charm/Sly ground is a d4 once Hounds come). Long flights are rarer now, but the weak-die grounds PT5 noted are still where they go wrong. Both premade raids were over by Turn 7 with most charges unspent.

### 9.3 Using the Entity Sheet, At the Table and the town pages

- **Entity Sheet:** "Form (Jekyll & Hyde; starts as Jekyll)" answered the question PT5 had to rule on. The "In a chase: □ Weakness in play □ overdrawn this flight" boxes were ticked in every flight round, and "Fleeing" is now there. Nothing missing in this playtest.
- **At the Table:** the B6 line ("1 toward the side with more, 2 if it leads by 2+") and the Tell and Duty lines are clear. Seven lookups still needed a chapter (7.6, m4).
- **Thistlewick and Puddlecombe:** each page was enough to run its town. "The furniture's obstacle is already 2 harder" and "villagers (its faces)" in the Chapter 9 intro answered PT5's two questions.

---

## 10. Roll appendix

Every roll in order, as logged when rolled (`Math.random`, one die per line). Labels are the log's own shorthand: "A" and "B" are the main lines; a1–a3, b1–b2, c2–c3, d and e1–e2 the drills ("e2/c" is the flight after drill e2); "IM" is the Invisible Man; "T5" is Turn 5 and "r3" round 3.

| Roll | What | Die |
|---|---|---|
| R1 | A party pick 1 | d8 = 7 |
| R2 | A party pick 2 | d8 = 6 |
| R3 | A party pick 3 | d8 = 7 |
| R4 | A party pick 4 | d8 = 2 |
| R5 | A party pick 4 (R3 repeat) | d8 = 1 |
| R6 | A Witch Gift | d6 = 5 |
| R7 | A Witch Perk | d6 = 6 |
| R8 | A Witch Duty | d6 = 4 |
| R9 | A Ghost Gift | d6 = 1 |
| R10 | A Ghost Perk | d6 = 3 |
| R11 | A Ghost Duty | d6 = 4 |
| R12 | A Creature Gift | d6 = 4 |
| R13 | A Creature Perk | d6 = 5 |
| R14 | A Creature Duty | d6 = 3 |
| R15 | A Dracula Gift | d6 = 5 |
| R16 | A Dracula Perk | d6 = 1 |
| R17 | A Dracula Duty | d6 = 5 |
| R18 | A Ghost Duty reroll (Butler taken) | d6 = 6 |
| R19 | A T1 Tell china shop (Witch) | d6 = 4 |
| R20 | A T1 Tell baker (Dracula) | d6 = 1 |
| R21 | A T1 Tell hatter (Ghost) | d6 = 2 |
| R22 | A T1 Tell ironmonger (Creature) | d6 = 5 |
| R23 | A T2 Witch china front door Sly(d12 Butler) | d12 = 12 |
| R24 | A T2 Witch Mask | d6 = 1 |
| R25 | A T2 Dracula baker window Nimble | d10 = 4 |
| R26 | A T2 Dracula Mask | d6 = 6 |
| R27 | A T2 Ghost hatter neighbour Sly(d12 Tailor) | d12 = 12 |
| R28 | A T2 Ghost Mask | d6 = 2 |
| R29 | A T2 Creature ironmonger cart Brawn | d12 = 3 |
| R30 | A T2 Creature Mask | d6 = 3 |
| R31 | A T3 Witch china back room Wits | d12 = 6 |
| R32 | A T3 Witch Mask | d6 = 6 |
| R33 | A T3 Dracula baker shopkeeper Charm | d12 = 10 |
| R34 | A T3 Dracula Mask | d6 = 5 |
| R35 | A T3 Creature ironmonger strongbox Wits | d10 = 5 |
| R36 | A T3 Creature Monster (Hovel Watcher) | d10 = 1 |
| R37 | A T3 Tell seed merchant (Ghost) | d6 = 3 |
| R38 | A T4 Ghost seed merchant geese Sly | d10 = 7 |
| R39 | A T4 Ghost Mask | d6 = 4 |
| R40 | A T5 Witch seed merchant watchman Wits | d12 = 12 |
| R41 | A T5 Witch Monster | d10 = 3 |
| R42 | A T5 Dracula hatter guard dog (furniture) Charm | d12 = 4 |
| R43 | A T5 Dracula Monster (Hypnotic Eyes) | d10 = 5 |
| R44 | A T6 Tell way out (Dracula, Witch, Ghost arrive) | d6 = 5 |
| R45 | A T6 whose Tell (1-2 Dracula, 3-4 Witch, 5-6 Ghost) | d6 = 2 |
| R46 | A T7 Dracula way out Mesmerise Charm at 6 | d12 = 3 |
| R47 | A T7 Dracula Monster | d10 = 9 |
| R48 | B party pick 1 | d8 = 4 |
| R49 | B party pick 2 | d8 = 7 |
| R50 | B party pick 3 | d8 = 2 |
| R51 | B T1 Tell tavern cellar (Witch) | d6 = 6 |
| R52 | B T1 Tell market garden (Werewolf) | d6 = 4 |
| R53 | B T1 Tell draper (Creature) | d6 = 1 |
| R54 | B T1 Familiar's Warning second d6 (tavern) | d6 = 2 |
| R55 | B T2 Witch tavern front door Sly(d12 Cook) | d12 = 11 |
| R56 | B T2 Witch Mask | d6 = 3 |
| R57 | B T2 Werewolf market garden geese Sly(d8 Gardener) | d8 = 3 |
| R58 | B T2 Werewolf Mask | d6 = 5 |
| R59 | B T2 Creature draper shopkeeper Mountain Stride Nimble at 6 | d8 = 5 |
| R60 | B T2 Creature Mask | d6 = 4 |
| R61 | B T3 Witch tavern back room Wits | d12 = 5 |
| R62 | B T3 Witch Mask | d6 = 6 |
| R63 | B T3 Werewolf market garden watchman Wits(d10 Gardener) | d10 = 4 |
| R64 | B T3 Werewolf Monster (Good Dog) | d10 = 1 |
| R65 | B T3 Tell schoolhouse (Creature) | d6 = 2 |
| R66 | B T3 Werewolf local chase r1 ground | d6 = 5 |
| R67 | B T3 Werewolf chase r1 Wits by Keen Nose | d8 = 3 |
| R68 | B T3 Werewolf chase r1 Monster (Good Dog) | d10 = 8 |
| R69 | B T3 Werewolf chase r2 ground | d6 = 6 |
| R70 | B T3 Werewolf chase r2 Brawn | d10 = 10 |
| R71 | B T3 Werewolf chase r2 Mask | d6 = 2 |
| R72 | B T4 Witch tavern guard dog (furniture) Charm(d10 Cook) | d10 = 2 |
| R73 | B T4 Witch Mask | d6 = 3 |
| R74 | B T4 Werewolf watchman Wits(d10 Gardener) | d10 = 3 |
| R75 | B T4 Werewolf Mask | d6 = 1 |
| R76 | B T4 Creature schoolhouse back gate Brawn | d12 = 4 |
| R77 | B T4 Creature Mask | d6 = 2 |
| R78 | B T4 Werewolf chase2 r1 ground | d6 = 2 |
| R79 | B T4 Werewolf chase2 r1 Nimble | d12 = 8 |
| R80 | B T4 Werewolf chase2 r1 Mask | d6 = 3 |
| R81 | B T4 Werewolf chase2 r2 ground | d6 = 2 |
| R82 | B T4 Werewolf chase2 r2 Nimble | d12 = 8 |
| R83 | B T4 Werewolf chase2 r2 Mask | d6 = 2 |
| R84 | B T5 Witch guard dog Charm(d10 Cook) | d10 = 6 |
| R85 | B T5 Witch Mask | d6 = 5 |
| R86 | B T5 Werewolf watchman Wits(d10 Gardener) | d10 = 10 |
| R87 | B T5 Werewolf Mask | d6 = 3 |
| R88 | B T5 Creature schoolhouse children Mountain Stride Nimble at 6 | d8 = 8 |
| R89 | B T5 Creature Mask | d6 = 3 |
| R90 | B T6 Tell way out (Werewolf, Creature arrive) | d6 = 5 |
| R91 | B T6 whose Tell (1-3 Werewolf, 4-6 Creature) | d6 = 6 |
| R92 | B T7 Werewolf way out Nimble | d12 = 9 |
| R93 | B T7 Werewolf Monster | d10 = 10 |
| R94 | a1 party 1 | d8 = 2 |
| R95 | a1 party 2 | d8 = 3 |
| R96 | a1 party 3 | d8 = 8 |
| R97 | a1 party 4 (spare) | d8 = 1 |
| R98 | a1 party 5 (spare) | d8 = 3 |
| R99 | a1 r1 ground | d6 = 3 |
| R100 | a1 r1 Creature Brawn | d12 = 6 |
| R101 | a1 r1 Creature Monster | d10 = 7 |
| R102 | a1 r1 Mummy Brawn | d10 = 9 |
| R103 | a1 r1 Mummy Monster | d10 = 1 |
| R104 | a1 r1 Hyde (Draught) Brawn | d12 = 11 |
| R105 | a1 r1 Hyde Monster | d10 = 10 |
| R106 | a1 r2 ground | d6 = 3 |
| R107 | a1 r2 Creature Brawn | d12 = 9 |
| R108 | a1 r2 Creature Monster | d10 = 3 |
| R109 | a1 r2 Mummy Brawn (d12 by J&H Doctor's Bag overdrawn) | d12 = 4 |
| R110 | a1 r2 Mummy Monster | d10 = 6 |
| R111 | a1 r2 Hyde Brawn | d12 = 8 |
| R112 | a1 r2 Hyde Monster | d10 = 1 |
| R113 | a2 party 1 | d8 = 7 |
| R114 | a2 party 2 | d8 = 3 |
| R115 | a2 party 3 | d8 = 8 |
| R116 | a2 party 4 | d8 = 1 |
| R117 | a2 party 5 (spare) | d8 = 1 |
| R118 | a2 party 6 (spare) | d8 = 5 |
| R119 | a2 r1 ground | d6 = 6 |
| R120 | a2 r1 Witch Wits | d12 = 4 |
| R121 | a2 r1 Witch Monster | d10 = 6 |
| R122 | a2 r1 Mummy Wits | d12 = 12 |
| R123 | a2 r1 Mummy Monster | d10 = 8 |
| R124 | a2 r1 Jekyll Wits | d10 = 7 |
| R125 | a2 r1 Jekyll Monster | d10 = 4 |
| R126 | a2 r1 Dracula Nimble by Bat (d8 Garlic) | d8 = 8 |
| R127 | a2 r1 Dracula Monster | d10 = 3 |
| R128 | a2 r2 ground | d6 = 6 |
| R129 | a2 r2 Witch Wits | d12 = 4 |
| R130 | a2 r2 Witch Monster | d10 = 10 |
| R131 | a2 r2 Mummy Wits | d12 = 3 |
| R132 | a2 r2 Mummy Monster | d10 = 1 |
| R133 | a2 r2 Jekyll Wits (d12 Doctor's Bag overdrawn) | d12 = 1 |
| R134 | a2 r2 Jekyll Monster | d10 = 3 |
| R135 | a2 r2 Dracula Brawn (d6 Garlic, d8 Hedge Spell) | d8 = 3 |
| R136 | a2 r2 Dracula Monster | d10 = 8 |
| R137 | a2 r3 ground | d6 = 6 |
| R138 | a2 r3 Witch Wits (d10 Rowan) | d10 = 3 |
| R139 | a2 r3 Witch Monster | d10 = 10 |
| R140 | a2 r3 Mummy Wits (d10 Thread) | d10 = 8 |
| R141 | a2 r3 Mummy Monster | d10 = 5 |
| R142 | a2 r3 Hyde Brawn (d10 Face) | d10 = 9 |
| R143 | a2 r3 Hyde Monster | d10 = 6 |
| R144 | a2 r3 Dracula Brawn (d6 Garlic) | d6 = 4 |
| R145 | a2 r3 Dracula Monster | d10 = 3 |
| R146 | a3 party 1 | d8 = 3 |
| R147 | a3 party 2 | d8 = 7 |
| R148 | a3 party 3 | d8 = 4 |
| R149 | a3 party 4 | d8 = 7 |
| R150 | a3 party 5 | d8 = 1 |
| R151 | a3 party 6 (spare) | d8 = 5 |
| R152 | a3 party 7 (spare) | d8 = 2 |
| R153 | a3 party 8 (spare) | d8 = 7 |
| R154 | a3 r1 ground | d6 = 6 |
| R155 | a3 r1 Mummy Wits | d12 = 3 |
| R156 | a3 r1 Mummy Monster | d10 = 6 |
| R157 | a3 r1 Witch Wits | d12 = 5 |
| R158 | a3 r1 Witch Monster | d10 = 10 |
| R159 | a3 r1 Werewolf Brawn | d10 = 9 |
| R160 | a3 r1 Werewolf Monster | d10 = 10 |
| R161 | a3 r1 Dracula Nimble by Bat (d8 Garlic) | d8 = 7 |
| R162 | a3 r1 Dracula Monster | d10 = 3 |
| R163 | a3 r1 IM Wits | d10 = 6 |
| R164 | a3 r1 IM Monster | d10 = 5 |
| R165 | a3 r2 ground | d6 = 4 |
| R166 | a3 r2 Mummy Wits | d12 = 2 |
| R167 | a3 r2 Mummy Monster | d10 = 1 |
| R168 | a3 r2 Witch Wits | d12 = 7 |
| R169 | a3 r2 Witch Monster | d10 = 10 |
| R170 | a3 r2 Werewolf Nimble | d12 = 11 |
| R171 | a3 r2 Werewolf Monster | d10 = 2 |
| R172 | a3 r2 Dracula Nimble (d8 Garlic, d10 Hedge Spell) | d10 = 2 |
| R173 | a3 r2 Dracula Monster | d10 = 9 |
| R174 | a3 r2 IM Wits | d10 = 4 |
| R175 | a3 r2 IM Monster | d10 = 3 |
| R176 | a3 r3 ground | d6 = 6 |
| R177 | a3 r3 Mummy Wits (d10) | d10 = 4 |
| R178 | a3 r3 Mummy Monster | d10 = 3 |
| R179 | a3 r3 Witch Wits (d10) | d10 = 9 |
| R180 | a3 r3 Witch Monster | d10 = 6 |
| R181 | a3 r3 Werewolf Brawn (d8) | d8 = 2 |
| R182 | a3 r3 Werewolf Monster | d10 = 10 |
| R183 | a3 r3 Dracula Brawn (d6) | d6 = 4 |
| R184 | a3 r3 Dracula Monster | d10 = 2 |
| R185 | a3 r3 IM Wits (d8) | d8 = 8 |
| R186 | a3 r3 IM Monster | d10 = 9 |
| R187 | e1 Ghost chase r1 ground | d6 = 4 |
| R188 | e1 Ghost r1 Nimble (d10 Cold Iron, d12 Chill) | d12 = 11 |
| R189 | e1 Ghost r1 Mask | d6 = 5 |
| R190 | e1 Ghost chase r2 ground | d6 = 5 |
| R191 | e1 Ghost r2 Sly (d8 Cold Iron) | d8 = 3 |
| R192 | e1 Ghost r2 Mask | d6 = 2 |
| R193 | e2 Ghost chase r1 ground | d6 = 3 |
| R194 | e2 Ghost r1 Nimble (d10 Cold Iron, d12 Chill) | d12 = 5 |
| R195 | e2 Ghost r1 Mask | d6 = 6 |
| R196 | e2 Ghost chase r2 ground | d6 = 4 |
| R197 | e2 Ghost r2 Nimble (d10 Cold Iron) | d10 = 3 |
| R198 | e2 Ghost r2 Mask | d6 = 1 |
| R199 | e2/c flight r1 ground | d6 = 5 |
| R200 | e2/c r1 Ghost Sly (d8 Cold Iron, d10 Hedge Spell) | d10 = 6 |
| R201 | e2/c r1 Ghost Monster | d10 = 9 |
| R202 | e2/c r1 Creature Brawn by Brute Force | d12 = 9 |
| R203 | e2/c r1 Creature Monster | d10 = 7 |
| R204 | e2/c r1 Mummy Wits by Ancient Lore | d12 = 1 |
| R205 | e2/c r1 Mummy Monster | d10 = 9 |
| R206 | e2/c r1 Witch Sly | d10 = 2 |
| R207 | e2/c r1 Witch Monster | d10 = 1 |
| R208 | e2/c flight r2 ground | d6 = 2 |
| R209 | e2/c r2 Ghost Nimble (d10 Cold Iron, d12 Hedge Spell overdrawn by Witch) | d12 = 5 |
| R210 | e2/c r2 Ghost Monster | d10 = 10 |
| R211 | e2/c r2 Creature Brawn by Brute Force overdrawn | d12 = 5 |
| R212 | e2/c r2 Creature Monster | d10 = 2 |
| R213 | e2/c r2 Mummy Wits by Ancient Lore overdrawn | d12 = 9 |
| R214 | e2/c r2 Mummy Monster | d10 = 2 |
| R215 | e2/c r2 Witch Sly | d10 = 2 |
| R216 | e2/c r2 Witch Monster | d10 = 7 |
| R217 | e2/c flight r3 ground | d6 = 1 |
| R218 | e2/c r3 Ghost Sly (d8) | d8 = 1 |
| R219 | e2/c r3 Ghost Monster | d10 = 2 |
| R220 | e2/c r3 Creature Sly (d4 Fire) | d4 = 3 |
| R221 | e2/c r3 Creature Monster | d10 = 9 |
| R222 | e2/c r3 Mummy Charm (d6 Thread) | d6 = 5 |
| R223 | e2/c r3 Mummy Monster | d10 = 7 |
| R224 | e2/c r3 Witch Sly (d8 Rowan) | d8 = 4 |
| R225 | e2/c r3 Witch Monster | d10 = 10 |
| R226 | c2 flight r1 ground | d6 = 6 |
| R227 | c2 r1 Mummy Wits | d12 = 4 |
| R228 | c2 r1 Mummy Monster | d10 = 7 |
| R229 | c2 r1 Witch Wits | d12 = 4 |
| R230 | c2 r1 Witch Monster | d10 = 2 |
| R231 | c2 r1 IM Wits (d12 Hedge Spell) | d12 = 8 |
| R232 | c2 r1 IM Monster | d10 = 2 |
| R233 | c2 r1 Jekyll Wits (d12 Doctor's Bag) | d12 = 4 |
| R234 | c2 r1 Jekyll Monster | d10 = 3 |
| R235 | c2 flight r2 ground | d6 = 1 |
| R236 | c2 r2 Mummy Wits by Ancient Lore | d12 = 10 |
| R237 | c2 r2 Mummy Monster | d10 = 6 |
| R238 | c2 r2 Witch Sly (d12 Hedge Spell overdrawn) | d12 = 4 |
| R239 | c2 r2 Witch Monster | d10 = 10 |
| R240 | c2 r2 IM Sly | d12 = 7 |
| R241 | c2 r2 IM Monster | d10 = 8 |
| R242 | c2 r2 Jekyll Charm | d12 = 5 |
| R243 | c2 r2 Jekyll Monster | d10 = 1 |
| R244 | c2 flight r3 ground | d6 = 5 |
| R245 | c2 r3 Mummy Charm (d6) | d6 = 3 |
| R246 | c2 r3 Mummy Monster | d10 = 7 |
| R247 | c2 r3 Witch Sly (d8) | d8 = 8 |
| R248 | c2 r3 Witch Monster | d10 = 1 |
| R249 | c2 r3 IM Sly (d10) | d10 = 8 |
| R250 | c2 r3 IM Monster | d10 = 5 |
| R251 | c2 r3 Jekyll Charm (d10) | d10 = 1 |
| R252 | c2 r3 Jekyll Monster | d10 = 2 |
| R253 | c2 flight r4 ground | d6 = 4 |
| R254 | c2 r4 Mummy Wits (d10) | d10 = 3 |
| R255 | c2 r4 Mummy Monster | d10 = 9 |
| R256 | c2 r4 Witch Wits (d10) | d10 = 4 |
| R257 | c2 r4 Witch Monster | d10 = 4 |
| R258 | c2 r4 IM Wits (d8) | d8 = 1 |
| R259 | c2 r4 IM Monster | d10 = 3 |
| R260 | c2 r4 Hyde Nimble (d8) | d8 = 8 |
| R261 | c2 r4 Hyde Monster | d10 = 5 |
| R262 | c2 flight r5 ground | d6 = 4 |
| R263 | c2 r5 Mummy Wits (d10) | d10 = 8 |
| R264 | c2 r5 Mummy Monster | d10 = 1 |
| R265 | c2 r5 Witch Wits (d10) | d10 = 3 |
| R266 | c2 r5 Witch Monster | d10 = 7 |
| R267 | c2 r5 IM Wits (d8) | d8 = 2 |
| R268 | c2 r5 IM Monster | d10 = 1 |
| R269 | c2 r5 Hyde Nimble (d8) | d8 = 7 |
| R270 | c2 r5 Hyde Monster | d10 = 9 |
| R271 | c2 flight r6 ground | d6 = 6 |
| R272 | c2 r6 Mummy Wits (d10) | d10 = 3 |
| R273 | c2 r6 Mummy Monster | d10 = 9 |
| R274 | c2 r6 Witch Wits (d10) | d10 = 8 |
| R275 | c2 r6 Witch Monster | d10 = 4 |
| R276 | c2 r6 IM Wits (d8) | d8 = 2 |
| R277 | c2 r6 IM Monster | d10 = 1 |
| R278 | c2 r6 Hyde Brawn (d10) | d10 = 6 |
| R279 | c2 r6 Hyde Monster | d10 = 8 |
| R280 | c2 flight r7 ground | d6 = 2 |
| R281 | c2 r7 Mummy Sly (d4) | d4 = 2 |
| R282 | c2 r7 Mummy Monster | d10 = 10 |
| R283 | c2 r7 Witch Sly (d8) | d8 = 3 |
| R284 | c2 r7 Witch Monster | d10 = 9 |
| R285 | c2 r7 IM Sly (d10) | d10 = 1 |
| R286 | c2 r7 IM Monster | d10 = 2 |
| R287 | c2 r7 Hyde Nimble (d8) | d8 = 4 |
| R288 | c2 r7 Hyde Monster | d10 = 10 |
| R289 | c3 flight r1 ground | d6 = 2 |
| R290 | c3 r1 Dracula Nimble (d8 Garlic, d10 Hedge Spell) | d10 = 6 |
| R291 | c3 r1 Dracula Monster | d10 = 8 |
| R292 | c3 r1 Werewolf Nimble | d12 = 4 |
| R293 | c3 r1 Werewolf Monster | d10 = 2 |
| R294 | c3 r1 Witch Wits by Werewolf's Keen Nose | d12 = 5 |
| R295 | c3 r1 Witch Monster | d10 = 10 |
| R296 | c3 flight r2 ground | d6 = 6 |
| R297 | c3 r2 Dracula Nimble by Bat (d8 Garlic, d10 Hedge Spell overdrawn) | d10 = 8 |
| R298 | c3 r2 Dracula Monster | d10 = 2 |
| R299 | c3 r2 Werewolf Brawn | d10 = 7 |
| R300 | c3 r2 Werewolf Monster | d10 = 8 |
| R301 | c3 r2 Witch Wits | d12 = 4 |
| R302 | c3 r2 Witch Monster | d10 = 5 |
| R303 | c3 flight r3 ground | d6 = 2 |
| R304 | c3 r3 Dracula Nimble (d8) | d8 = 4 |
| R305 | c3 r3 Dracula Monster | d10 = 1 |
| R306 | c3 r3 Werewolf Nimble (d10 Hounds) | d10 = 8 |
| R307 | c3 r3 Werewolf Monster | d10 = 7 |
| R308 | c3 r3 Witch Sly (d8 Rowan) | d8 = 1 |
| R309 | c3 r3 Witch Monster | d10 = 6 |
| R310 | c3 flight r4 ground | d6 = 4 |
| R311 | c3 r4 Dracula Nimble (d8) | d8 = 5 |
| R312 | c3 r4 Dracula Monster | d10 = 5 |
| R313 | c3 r4 Werewolf Nimble (d10) | d10 = 1 |
| R314 | c3 r4 Werewolf Monster | d10 = 7 |
| R315 | c3 r4 Witch Wits (d10) | d10 = 5 |
| R316 | c3 r4 Witch Monster | d10 = 3 |
| R317 | c3 flight r5 ground | d6 = 5 |
| R318 | c3 r5 Dracula Charm (d10 Garlic) | d10 = 7 |
| R319 | c3 r5 Dracula Monster | d10 = 9 |
| R320 | c3 r5 Werewolf Sly (d4 Hounds) | d4 = 4 |
| R321 | c3 r5 Werewolf Monster | d10 = 8 |
| R322 | c3 r5 Witch Sly (d8) | d8 = 5 |
| R323 | c3 r5 Witch Monster | d10 = 5 |
| R324 | c3 flight r6 ground | d6 = 2 |
| R325 | c3 r6 Dracula Nimble (d8) | d8 = 2 |
| R326 | c3 r6 Dracula Monster | d10 = 6 |
| R327 | c3 r6 Werewolf Nimble (d10) | d10 = 5 |
| R328 | c3 r6 Werewolf Monster | d10 = 4 |
| R329 | c3 r6 Witch Sly (d8) | d8 = 4 |
| R330 | c3 r6 Witch Monster | d10 = 5 |
| R331 | c3 flight r7 ground | d6 = 5 |
| R332 | c3 r7 Dracula Charm (d10) | d10 = 1 |
| R333 | c3 r7 Dracula Monster | d10 = 8 |
| R334 | c3 r7 Werewolf Sly (d4) | d4 = 1 |
| R335 | c3 r7 Werewolf Monster | d10 = 4 |
| R336 | c3 r7 Witch Sly (d8) | d8 = 8 |
| R337 | c3 r7 Witch Monster | d10 = 8 |
| R338 | c3 flight r8 ground | d6 = 6 |
| R339 | c3 r8 Dracula Brawn (d6) | d6 = 1 |
| R340 | c3 r8 Dracula Monster | d10 = 8 |
| R341 | c3 r8 Werewolf Brawn (d8) | d8 = 4 |
| R342 | c3 r8 Werewolf Monster | d10 = 3 |
| R343 | c3 r8 Witch Wits (d10) | d10 = 1 |
| R344 | c3 r8 Witch Monster | d10 = 2 |
| R345 | c3 flight r9 ground | d6 = 1 |
| R346 | c3 r9 Dracula Charm (d10) | d10 = 3 |
| R347 | c3 r9 Dracula Monster | d10 = 10 |
| R348 | c3 r9 Werewolf Sly (d4) | d4 = 1 |
| R349 | c3 r9 Werewolf Monster | d10 = 6 |
| R350 | c3 r9 Witch Sly (d8) | d8 = 8 |
| R351 | c3 r9 Witch Monster | d10 = 6 |
| R352 | c3 flight r10 ground | d6 = 2 |
| R353 | c3 r10 Dracula Nimble (d8) | d8 = 7 |
| R354 | c3 r10 Dracula Monster | d10 = 3 |
| R355 | c3 r10 Werewolf Nimble (d10) | d10 = 5 |
| R356 | c3 r10 Werewolf Monster | d10 = 1 |
| R357 | c3 r10 Witch Sly (d8) | d8 = 5 |
| R358 | c3 r10 Witch Monster | d10 = 9 |
| R359 | c3 flight r11 ground | d6 = 3 |
| R360 | c3 r11 Dracula Nimble (d8) | d8 = 6 |
| R361 | c3 r11 Dracula Monster | d10 = 5 |
| R362 | c3 r11 Werewolf Nimble (d10) | d10 = 6 |
| R363 | c3 r11 Werewolf Monster | d10 = 1 |
| R364 | c3 r11 Witch Brawn (d4 Rowan) | d4 = 2 |
| R365 | c3 r11 Witch Monster | d10 = 3 |
| R366 | c3 flight r12 ground | d6 = 6 |
| R367 | c3 r12 Dracula Brawn (d6) | d6 = 5 |
| R368 | c3 r12 Dracula Monster | d10 = 2 |
| R369 | c3 r12 Werewolf Brawn (d8) | d8 = 3 |
| R370 | c3 r12 Werewolf Monster | d10 = 6 |
| R371 | c3 r12 Witch Wits (d10) | d10 = 4 |
| R372 | c3 r12 Witch Monster | d10 = 2 |
| R373 | b1 shared chase r1 ground | d6 = 2 |
| R374 | b1 r1 Creature Brawn by Brute Force | d12 = 12 |
| R375 | b1 r1 Creature Mask | d6 = 5 |
| R376 | b1 r1 Werewolf Nimble | d12 = 6 |
| R377 | b1 r1 Werewolf Monster (Good Dog) | d10 = 6 |
| R378 | b1 shared chase r2 ground | d6 = 4 |
| R379 | b1 r2 Creature Wits | d10 = 3 |
| R380 | b1 r2 Creature Mask | d6 = 5 |
| R381 | b1 r2 Werewolf Nimble | d12 = 8 |
| R382 | b1 r2 Werewolf Mask | d6 = 5 |
| R383 | b2 shared chase r1 ground | d6 = 1 |
| R384 | b2 r1 Mummy Wits by Ancient Lore | d12 = 8 |
| R385 | b2 r1 Mummy Monster | d10 = 6 |
| R386 | b2 r1 Witch Sly (d12 Hedge Spell) | d12 = 6 |
| R387 | b2 r1 Witch Monster | d10 = 1 |
| R388 | b2 r1 Ghost Sly (d8 Cold Iron, d10 Chill) | d10 = 7 |
| R389 | b2 r1 Ghost Monster | d10 = 7 |
| R390 | b2 shared chase r2 ground | d6 = 6 |
| R391 | b2 r2 Mummy Wits | d12 = 10 |
| R392 | b2 r2 Mummy Monster | d10 = 9 |
| R393 | b2 r2 Witch Wits | d12 = 1 |
| R394 | b2 r2 Witch Monster | d10 = 10 |
| R395 | b2 r2 Ghost Wits (d4 Cold Iron, d6 Chill overdrawn) | d6 = 6 |
| R396 | b2 r2 Ghost Monster | d10 = 4 |
| R397 | d T5 Tell hatter (Ghost, Dracula arrive) | d6 = 2 |
| R398 | d T5 Tell seed merchant (Creature) | d6 = 3 |
| R399 | d T6 Dracula rooftops Mesmerise Charm at 8 | d12 = 3 |
| R400 | d T6 Dracula Mask | d6 = 5 |
| R401 | d T6 Creature geese Brawn by Brute Force | d12 = 3 |
| R402 | d T6 Creature Mask | d6 = 6 |
| R403 | d T7 Dracula guard dog Charm | d12 = 10 |
| R404 | d T7 Dracula Monster (Hypnotic Eyes) | d10 = 10 |
| R405 | d T7 Creature watchman Mountain Stride Nimble at 8 | d8 = 5 |
| R406 | d T7 Creature Mask | d6 = 6 |
| R407 | d T8 Tell way out (Ghost, Dracula, Creature arrive) | d6 = 3 |
| R408 | d T9 Dracula way out Mesmerise Charm at 6 | d12 = 8 |
| R409 | d T9 Dracula Monster (Hypnotic Eyes) | d10 = 10 |
