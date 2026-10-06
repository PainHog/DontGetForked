# PT7: Hard verification playtest after the PT6 fixes (Gallowsmere, a rolled Hard town, drills a–f)

## 1. What this is

A verification playtest of Hard difficulty under the current rules, after the PT6 fix round: **B6** (the Majority Rule: the shared Lead moves 2 when one side leads by two or more), **V2** (a switch ability works in a chase, in place of the ground's traits), **V4 / V11** (a piece of furniture raises Suspicion at the end of every Turn from when it is taken, even set down, until it is out of town, lost or abandoned for good), **V5** (Already Dead cornered in the round the Limit comes just joins the flight; otherwise the Ghost is back where it was caught), the overdraw rule (your Weakness is in play from your own next roll, even later the same round), and the PT6 wording fixes (a random Duty rerolls one already taken; opening an approach works at any obstacle).

**Rules source:** the rulebook text only: `book/src/chapters/11-ch01.html` to `17-ch07.html`, `31-ch08.html`, `32-ch09.html`, `40-entity-sheet.html` and `41-reference.html`, read as text (commit 0b6eff6 for the book; the book did not change while I played). Not the simulator, not `docs/`, not the Foundry code. Where the book is silent I made a ruling, listed it in section 4, and logged it as a finding in section 8.

**Dice:** every random result is a real `Math.random` roll, numbered R1 onward and listed in section 10 (354 rolls). Drills say exactly what I chose at their start; every roll after that is real. The players played to win; the Storyteller played by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now").

---

## 2. Summary

| Line | What it puts through the text | Result | Ended | Suspicion |
|---|---|---|---|---|
| **Main line A**: Gallowsmere (Hard) as printed, 4 random Entities, random picks | The premade Hard town; a random Duty rerolled; a lone local chase at mob 10; Through the Wall at a later obstacle and at the furniture's; Spectral; the armour carried | **Grand Year**: both essentials, 2 of 3 extras, the suit of armour | Out on **Turn 8** | 11 of 15 (13 after the last roll's show) |
| **Main line B**: a Hard town rolled on Chapter 8's tables, 5 random Entities, defaults | Every Rolling a Town table, Hard column; the ceiling; Spectral past two group obstacles; Out of Sight at a watched 12; the armour carried | **Grand Year**: both essentials, 2 of 3 extras, the suit of armour | Out on **Turn 7** | 6 of 15 |
| Drill a1: Hard flight from the Limit, 3 | B6 with three | Escaped in **5 rounds** (35 dice) | — | — |
| Drill a2: Hard flight from the Limit, 5 | B6 with five | Escaped in **2 rounds** (22 dice) | — | — |
| Drill b: a lone local chase at Suspicion 11 (Hard) | Mob 12; overdraws in a local chase; the Limit in the round of a cornering | **Captured** in round 3 as the Limit came (9 dice) | — | 11 → 15 |
| Drill c: an overdraw on a friend's roll, then the overdrawer's own roll | "from your own next roll (even later the same round)" | The Witch's own roll that round was a size smaller; the flight escaped in **4 rounds** (36 dice) | — | — |
| Drill d: the furniture abandoned for good | V11, mid-raid at Suspicion 11 | Abandoned at the start of Turn 5; a local chase then brought the Limit; the flight escaped in **3 rounds** (27 dice): **Partial** | Turn 5 | 11 → 15 |
| Drill e: At the Table alone | Main line B's lookups | 10 lookups in play still needed a chapter (2 more were building the town), plus 2 from the drills | — | — |
| Drill f (extra): Already Dead | V5 below the Limit (f1) and at it (f2) | f1 cornered: back before the watchman, next Turn lost; f2 cornered as the Limit came: joined the flight | — | 9 → 11; 14 → 15 |

**Fix targets and where each was exercised**

| Target | Where | Rolls |
|---|---|---|
| **B6** in Hard final flights | a1, a2, c, the drill d flight: four flights, 14 rounds; the Lead moved by 2 in 6 of them | R181–R245, R256–R291, R316–R342 |
| **B6** in shared local chases | Not met: no group check went wrong (every chase was alone) | — |
| **V2** a switch ability in a chase, your own roll | a1, a2 (Ancient Lore, Brute Force), drill b (Ancient Lore, twice overdrawn), the drill d flight (Brute Force) | R184, R186, R191, R193, R225, R233, R244, R294, R297, R300, R326 |
| **V2** on a friend's roll | The drill d flight, round 2: the Creature's Brute Force (overdrawn) on the Werewolf's roll; he rolled his own Brawn d10 | R328 |
| **V4 / V11** furniture noise until out, lost or abandoned for good | Main A and main B (carried, +2 each); drill d (abandoned for good) | R53, R172 |
| **V5** Already Dead | f1 (below the Limit: back where caught, a Turn lost); f2 (cornered as the Limit came: joined the flight) | R343–R354 |
| The overdraw's Weakness "from your own next roll (even later the same round)" | Drill c round 1 (on a friend's roll, then her own); six own-roll or roll-first overdraws in round 2 (a1, a2, c, d) | R257, R263, R191, R193, R240, R244, R268, R328 |
| A random Duty rerolls one already taken | Main A: the Invisible Man rolled Handyman (the Ghost's) and rerolled | R16–R17 |
| An approach opened at any obstacle | Main A: Through the Wall at the smithy's watchman and at the furniture's trapdoor | R39, R53 |
| Chapter 9: Gallowsmere as printed | Main A | R1–R61 |
| Chapter 8: Rolling a Town (Hard) | Main B | R70–R147 |
| The At the Table page | Drill e (main B) | — |

**Counts: 0 blockers, 0 major, 6 minor, 2 wording** (section 8). By kind: **5 wording** (m2, m3, m4, w1, w2) and **3 rules** questions for the author (m1, m5, m6).

**PT6's 8 findings: 4 resolved, 1 partly, 3 not** (m2 kept by decision; m3 and m4 unchanged in the book). Section 8.4.

**Flight lengths seen (all Hard):** 5, 2, 4 and 3 rounds (3, 5, 4 and 4 Entities; 35, 22, 36 and 27 dice); all four escaped. Exact numbers from the book for these parties: escape 63–76%, 4.3–5.6 rounds on average, 10 rounds or more 7–15% of the time, forked in round 1 7–11% (section 9.2). **Local chases:** 5, of 1–4 rounds; every one at Suspicion 9 or more on Hard ended at the Limit or a cornering.

---

## 3. Setup

### 3.1 Gallowsmere as Chapter 9 prints it

**Gallowsmere** (Hard): Limit 15, the way out 10, the lock-up 12, the final flight mob 11 escaping at Lead 6; a local chase from Lead 1 to 4 against 8 + half the Suspicion (at most 12). Five items, two essentials: **a new lock for the dungeon** (the smithy, tools), **the silver spoons** (the silversmith, silver), black-edged writing paper (the printer, books), bandages, lots (the tailor, cloth), a side of bacon (the butcher, food). The furniture: a suit of armour (Bulky) at the tailor, behind a heavy cellar trapdoor (Brawn 12, not watched). Every location is watched. Villagers: old Granny Mott (practising the bells) and a gang of children (gossiping, loudly). Lantern Night: bells rung every hour.

The page checks out against Chapter 8: one 12 under the ceiling of two (the butcher's tug-of-war; the furniture's trapdoor is "already 2 harder", a 10 before its +2), the Hard numbers line matches the difficulty table, and the two ways in at each location have different quiet traits. I couldn't see the map (it is art); the armour is Bulky, so a small entrance wouldn't have mattered.

### 3.2 Main line A party (R1–R17)

d8 in the book's order (1 Dracula … 8 Jekyll & Hyde): R1 = 4, R2 = 2, R3 = 6, R4 = 5. Picks on a d6 (1–2 the first, 3–4 the second, 5–6 the third); the Duty on its table, rerolling one already taken. 3 charges each.

| Entity | Brawn | Nimble | Sly | Charm | Wits | Signature | Gift (R) | Perk (R) | Duty (R) | Weakness |
|---|---|---|---|---|---|---|---|---|---|---|
| The Werewolf | d10 | d12 | d6 | d4 | d8 | Good Dog (hidden Monster) | Through the Hedge, open with Brawn (R5 = 3) | **Shortcut**: the way out 2 easier when he rolls it (R6 = 3) | **Cook** (R7 = 1): the bacon | Hounds (Soon) |
| Frankenstein's Creature | d12 | d8 | d6 | d4 | d10 | Brute Force (Brawn instead) | Hovel Watcher, hidden Monster (R8 = 3) | Tireless (R9 = 4) | **Butler** (R10 = 4): the spoons | Fire (Soon) |
| A Ghost | d4 | d12 | d10 | d8 | d6 | Through the Wall (open with Sly) | Chill, raise (R11 = 2) | **Spectral** (R12 = 1) | **Handyman** (R13 = 5): the lock | Cold Iron (Always) |
| The Invisible Man | d4 | d8 | d12 | d6 | d10 | Unseen (hidden Monster) | Through the Gap, open with Nimble (R14 = 2) | Hidden Pockets (R15 = 3) | Handyman (R16 = 5) taken: rerolled **Librarian** (R17 = 3): the paper | Flour (Soon) |

The Duty reroll now reads straight off Chapter 2: "(for the Castle Duty, roll on its table, rerolling one already taken)".

### 3.3 Main line B: the rolled Hard town (R70–R147)

Built by Chapter 8's Rolling a Town, Hard column, every number rolled.

**The list** (R70–R79; d6 kind, d6 item; the first two are the essentials): **a cookbook "for the guests"** (books), **ink and sealing wax** (books), a wheel of strong cheese (food), the wedding cake in the shop window (food), seed potatoes (plants). **Lantern Night** (R80 = 2): a costume parade through the square at midnight.

**Places** (R81–R86). The book says "roll or pick, one item per place" but gives no die, so I rolled a d6, 1–2 / 3–4 / 5–6 down the shopping table's list of places (S1). The ink rolled the schoolhouse, already the cookbook's, and was rolled again (R86).

**Obstacles** (counts R87–R91; each obstacle a d20 on the obstacle table, a d20 for its Difficulty (1–8: 8 · 9–17: 10 · 18–20: 12), a d10 for watched (1–6); R92–R142). Second ways in were rerolled until their quiet way differed: the baker's (R128 strongbox, Wits again → R130 garden wall) and the seed merchant's (R129, R131 strongbox, Wits again → R132 trapdoor). **The furniture** (R143–R147): a suit of armour (Bulky) at the baker (location rolled on a d6 in list order, 6 to be rerolled: S1), behind a locked front door rolled at 12, +2, held at 12.

| # | Location · item | Obstacle | Quiet way | Loud way | Difficulty | Watched |
|---|---|---|---|---|---|---|
| 1 | **The schoolhouse**: a cookbook (books) · essential | Way in: a locked front door | Sly | Brawn | 8 | — |
| | | or: the shopkeeper behind the counter | Charm | Sly | 10 | watched |
| 2 | **The bookseller**: ink and sealing wax (books) · essential | Way in: a maze of festival stalls (group) | Wits | — | 12 | watched |
| | | or: a tug-of-war across the lane (group) | Brawn | — | 8 | watched |
| | | Then: a dark, cluttered back room | Wits | Sly | 10 | — |
| | | Then: a crowded shop floor (group) | Sly | — | 8 | — |
| 3 | **The tavern cellar**: a wheel of strong cheese (food) | Way in: a locked front door | Sly | Brawn | 10 | watched |
| | | or: a locked strongbox | Wits | Charm | 10 | watched |
| | | Then: a cart blocking the alley | Brawn | Nimble | 8 | watched |
| 4 | **The baker**: the wedding cake (food) | Way in: the night watchman on his round | Wits | — | 8 | — |
| | | or: a high garden wall | Nimble | Brawn | 8 | — |
| | | Then: a heavy cellar trapdoor | Brawn | — | 8 | watched |
| | | Then: the rooftops (group) | Nimble | — | 8 | — |
| | | Furniture: a locked front door (the suit of armour, Bulky) | Sly | Brawn | 12 | watched |
| 5 | **The seed merchant**: seed potatoes (plants) | Way in: a dark, cluttered back room | Wits | Sly | 8 | — |
| | | or: a heavy cellar trapdoor | Brawn | — | 8 | watched |
| | | Then: a locked front door | Sly | Brawn | 10 | — |

Hard: Suspicion Limit 15 · the way out 10 · the lock-up 12 · the final flight: mob 11, escape at Lead 6. 17 obstacles, 9 watched (53%; the table's share is 60%); Difficulties 8 ×10, 10 ×5, 12 ×2 (the table's shares are 40 / 45 / 15%). The ceiling allows two 12s on Hard: the maze and the armour's door, which rolled a 12 before its +2 (S2). Every location is watched. No town name: the tables don't make one.

### 3.4 Main line B party (R62–R69)

R62 = 4, R63 = 4 (repeat), R64 = 8, R65 = 6, R66 = 2, then R67 = 8 and R68 = 2 (repeats) and R69 = 5: **the Werewolf, Jekyll & Hyde, the Ghost, the Creature, the Invisible Man**, default picks. The default Duties (Gardener, Librarian, Butler, Handyman, Tailor) don't clash. 3 charges each.

| Entity | Dice | Signature | Gift | Perk | Duty (item here) | Weakness |
|---|---|---|---|---|---|---|
| The Werewolf | Brawn d10 · Nimble d12 · Sly d6 · Charm d4 · Wits d8 | Good Dog | Keen Nose (Wits instead) | Night Runner (alone: Lead 2) | Gardener (the seed potatoes) | Hounds (Soon) |
| Jekyll & Hyde | Jekyll: Brawn d4 · Nimble d6 · Sly d8 · Charm d12 · Wits d10; Hyde: Brawn d12 · Nimble d10 · Sly d8 · Charm d4 · Wits d6 | The Draught (starts as Jekyll) | Doctor's Bag (raise) | Practised Hand (back to Jekyll free) | Librarian (the cookbook and the ink) | A Familiar Face (Soon) |
| A Ghost | as above | Through the Wall | Chill (raise) | Spectral | Butler (none) | Cold Iron (Always) |
| The Creature | as above | Brute Force | Mountain Stride (open with Nimble) | Strong Back | Handyman (none) | Fire (Soon) |
| The Invisible Man | as above | Unseen | Through the Gap (open with Nimble) | Out of Sight | Tailor (none) | Flour (Soon) |

---

## 4. Standing readings (my rulings where the book is silent; the ones that matter are findings in section 8)

| # | Reading | Finding |
|---|---|---|
| S1 | Rolling a town: "roll or pick, one item per place" and the furniture "at one of the list's locations (roll or pick)" give no die. I rolled a d6: 1–2 / 3–4 / 5–6 down the kind's three places (as the picks do), and 1–5 down the list for the furniture's location, rerolling a 6. A place already taken was rolled again. | w1 |
| S2 | The ceiling ("at most … two in a Hard town (the furniture's +2 doesn't count)"): a furniture obstacle that rolls a 12 before its +2 counts as one of the two; one that reaches 12 only by the +2 doesn't. Main B's armour door rolled a 12, and with the maze it made two, so nothing was rerolled either way. | w2 |
| S3 | A carried move's second Turn ends when the carrier acts in that Turn ("each result (a move too) counts at once"), so the party can roll the way out after it in the same Turn (as PT6 read it). Main A and main B each paid **+2** for a 2-Turn carry, not +3. | m3 |
| S4 | A Cost's "next roll's trait die one size smaller" waits for the Entity's next roll, wherever it comes. J&H's (main B, Turn 2) never bit: he made no other roll. | — (the text says "your next roll") |
| S5 | In a final flight the Entities roll one at a time, in any order the party chooses, each spending abilities before its own roll (Chapter 3: "Spend abilities before you roll"; Chapter 4 for Turns: "Entities act one at a time, in any order"). So an overdraw on a friend's roll comes before the overdrawer's own roll only if the party orders it that way (drill c). | m1 |
| S6 | "Abandoned for good": the party declares it, at any time, wherever the piece is; from then it makes no noise (no +1 at the end of the Turn it was abandoned in, since by then it has been abandoned), and it can't be taken again ("for good"). Drill d. | m2 |
| S7 | A Limit brought by an overdraw or a show in a local chase comes with that roll (one roll, one rise), and if that roll also corners the Entity, it is "captured first and stays behind" (drill b). Already Dead overrides this for the Ghost: "(if the Limit comes that round, you just join the final flight)" (drill f2). | — (the text answers it) |
| S8 | A local chase's Weakness ends with it: a flight that follows is a new chase, and a Soon Weakness comes "from the third round of any chase" again (drill d: the Werewolf). | — (the text answers it) |
| S9 | A friend's switch on your roll in a chase: you roll your own die for the switched trait ("The roller rolls its own die"; V2). Drill d's flight: the Creature's Brute Force gave the Werewolf his own Brawn d10 on a parade. | — |
| S10 | In a premade town the faces are the town's two villagers; in a rolled town I rolled one on Chapter 8's tables when a Tell went off at a watched place. | — |

---

## 5. Play log: main line A (Gallowsmere, Hard, 4 Entities)

Notation: trait die + second die = total vs Difficulty → result. "Shows" = the Monster die beat the trait die. Sus = Suspicion after the roll. Charges are shown as before → after.

**Plan.** Both essentials first, split three ways: the Ghost (Handyman) to the smithy (the garden wall with Nimble d12, then Through the Wall past the watchman with Sly, its Duty raising it to d12); the Werewolf and the Creature (Butler) to the silversmith's three obstacles; the Invisible Man (Librarian) to the printer (the neighbour with Sly d12, the back room with Wits d12). Then the tailor, where Spectral walks the Ghost past the crowded shop floor. The butcher (four obstacles, three watched, a Brawn 12 group tug-of-war) only if Turns are spare. The Werewolf rolls the way out (Shortcut: 10 becomes 8).

**Turn 1 (Sus 0).** Moves; every Gallowsmere location is watched, so a Tell check at each first arrival:

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R18 | the smithy (Ghost) | 4 | Cold Spot: Granny Mott's candle gutters | 1 |
| R19 | the silversmith (Creature, Werewolf) | 5 | whose (1–3 Creature, 4–6 Werewolf): R21 = 4, Eyebrows That Meet | 2 |
| R20 | the printer (Invisible Man) | 4 | Bandages and Goggles | 3 |

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R22–R23 | Ghost, smithy way B (high garden wall, Nimble / Brawn loud, 8, watched) | Nimble d12 (Handyman can't raise a d12), Mask: 71 / 15 / 14% | 10 + 1 | 11 vs 8 | Success | 3 |
| 2 | R24–R25 | Werewolf, silversmith way B (shuttered window, Nimble / Brawn loud, 8, watched) | Nimble d12, Mask; Good Dog kept for the 10s and 12s | 3 + 2 | 5 vs 8 | **Trouble**, caught (the children see him) | 4 |

**The Werewolf's local chase** (alone; his Perk is Shortcut, not Night Runner: Lead 1, escape at 4; mob 8 + 2 = **10**; Hounds from round 3). At Lead 1 a Trouble in round 1 corners him.

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R26 = 4 rooftops | Nimble d12, **Good Dog** (3 → 2): a hidden Monster, 70 / 13 / 18% against the Mask's 54 / 17 / 29% | 11 + 6 | 17 vs 10 | Success | 2 | 4 |
| 2 | R29 = 5 parade (Charm d4, Sly d6) | Sly d6, **Good Dog** (2 → 1): 45 / 20 / 35% against 17 / 25 / 58% | 6 + 2 | 8 vs 10 | Cost (no change) | 2 | 4 |
| 3 | R32 = 4 rooftops | Nimble d12 → d10 (**Hounds**), **Good Dog** (1 → 0) | 10 + 10 | 20 vs 10 | **Critical**: two Successes | **4: escaped** | 4 |

He is back below the shuttered window, his Turn used up, with no charges left.

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R35–R36 | Creature, the same window | Nimble d8 → d10 (Butler), Mask (65 / 18 / 17%; Hovel Watcher saved for the strongbox) | 2 + 5 | 7 vs 8 | **Cost**: the window is open. He carries nothing, so "drop an item" would cost nothing; Turn 2 isn't "near dawn"; Suspicion 4 of 15 isn't "near the Limit". The Storyteller takes **his next roll's trait die one size smaller** ("a smaller die before a hard roll": the strongbox is a 10). The shutter slams on his fingers | 4 |
| 2 | R37–R38 | Invisible Man, printer way A (nosy neighbour, Sly / Wits loud, 8, watched) | Sly d12, **Unseen** (3 → 2): 83 / 9 / 8% | 4 + 6 (shows, hidden) | 10 vs 8 | Success | 4 |
| 3 | R39–R40 | Ghost, smithy (night watchman, Wits 10, watched) | **Through the Wall** (3 → 2): Sly isn't listed, so Sly d10 → d12 (Handyman) at 8, Mask | 9 + 4 | 13 vs 8 | Success: **the new lock** (essential) | 4 |
| 3 | R41–R42 | Invisible Man, printer (dark back room, Wits / Sly loud, 8) | Wits d10 → d12 (Librarian), Mask | 7 + 3 | 10 vs 8 | Success: **the writing paper** | 4 |
| 3 | R43–R44 | Werewolf, silversmith (guard dog, Charm / Nimble loud, 8, watched) | Nimble d12 the loud way, Mask (his Charm is a d4; no charges) | 6 + 4 | 10 vs 8 | Success (loud +1) | 5 |
| 3 | R45–R46 | Creature, silversmith (locked strongbox, Wits / Charm loud, 10) | Wits d10 → d12 (Butler) → **d10** (the Cost's step down; they cancel), **Hovel Watcher** (3 → 2): 64 / 15 / 21% | 8 + 7 | 15 vs 10 | Success: **the silver spoons** (essential) | 5 |
| 4 | R47 | The Ghost and the Creature move to the tailor | Tell check | 3 | — | — | 5 |
| 4 | R48 | The Invisible Man and the Werewolf move to the butcher (insurance for an extra) | Tell check | 2 | — | — | 5 |
| 5 | R49–R50 | Ghost, tailor way B (rickety drainpipe, Nimble 8) | Nimble d12, Mask | 3 + 4 | 7 vs 8 | **Cost**: the drainpipe is beaten. The Ghost carries the lock, so "drop an item" is possible, but the Creature stands beside it with an action to spare; Turn 5 isn't near dawn. The Storyteller takes **its next roll's trait die one size smaller**: its next roll is the furniture's trapdoor | 5 |
| 5 | — | The Ghost walks past the crowded shop floor (group, watched) by **Spectral**, at no action: **the bandages** | | | | | 5 |
| 5 | R51–R52 | Invisible Man, butcher way A (muddy yard of geese, Sly / Nimble loud, 8, watched) | Sly d12, Mask | 7 + 1 | 8 vs 8 | Success | 5 |
| 6 | — | The Ghost hands the lock and the bandages to the Creature (free, same place): **Through the Wall** works "not while you carry loot or furniture" | | | | | 5 |
| 6 | R53–R54 | Ghost, the furniture's trapdoor (Brawn 12, not watched) | **Through the Wall** (2 → 1): Sly at 10; Sly d10, **Chill** (1 → 0) raises it to d12 and the Cost's step down takes it back to d10. The Monster: 79% gets through against the Mask's 65%, and with no charges left a retry would mean an overdraw | 7 + 10 (shows) | 17 vs 10 | Success. **The suit of armour** (Bulky) is the Ghost's: only the opener can carry it out that way | 7 |
| 6 | R55–R56 | Invisible Man, butcher (shopkeeper, Charm / Sly loud, 10, watched) | Sly d12 the loud way, **Unseen** (2 → 1): 70 / 13 / 18% | 7 + 9 (shows, hidden) | 16 vs 10 | Success (loud +1) | 8 |
| 6 | R57–R58 | Werewolf, butcher (tug-of-war, group, Brawn 12, not watched) | Brawn d10 → d12 (Cook), Mask: 38 / 17 / 46%, but Trouble here costs only +1 | 6 + 3 | 9 vs 12 | Trouble (no chase) | 9 |
| 6 | — | End of the Turn: the armour, +1 | | | | | **10** |

At 10 of 15 with the armour to carry, the party drops the bacon: the two essentials and two extras are already a Win, and the bacon would add nothing to a Grand Year.

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 7 | — | The Ghost sets off with the armour (Turns 7–8; at the end of Turn 7 it is between places). The Creature, the Invisible Man and the Werewolf move to the way out | | | | | 10 |
| 7 | R59 | The way out, the first time anyone comes back (Creature, Invisible Man, Werewolf) | Tell check | 2 | — | — | 10 |
| 7 | — | End of the Turn: the armour, +1 | | | | | 11 |
| 8 | — | The Ghost acts first and finishes its carried move (S3) | | | | | 11 |
| 8 | R60–R61 | Werewolf, the way out (Sly / Nimble / Brawn loud, watched) | **Shortcut**: 10 → 8. Nimble d12, Monster: 92% against the Mask's 86% (a show only matters if the roll fails; he has no charge for Good Dog, and an overdraw would buy nothing the Monster doesn't) | 1 + 10 (shows) | 11 vs 8 | Success: **everyone out** | 13 |

**How the Year Went: Grand Year.** Both essentials, two of the three extras (the bacon missing) and the suit of armour; nobody left behind. "A year of plenty. The new piece goes in the great hall, and everyone pretends it was always there." Then the missing kind: "Turnip soup every night until spring." Out on **Turn 8** with four Turns to spare. Suspicion 11 when the last roll was made (13 after its show). Charges: 9 of 12 spent (Good Dog ×3 in one chase; Through the Wall ×2 and Chill; Unseen ×2; Hovel Watcher ×1). The armour cost +2 (S3).

---

## 6. Play log: main line B (a rolled Hard town, 5 Entities)

**Plan.** The Librarian's two essentials are both books. J&H takes the schoolhouse (one obstacle: the front door, Sly 8, not watched; Jekyll's Sly d8 is a d10 there). The Ghost and the Invisible Man take the bookseller: the Ghost walks past both of its group obstacles by Spectral, so the only roll is the back room. The Werewolf (Gardener) takes the seed merchant. The Creature takes the baker (the watchman with Wits d10, the trapdoor with Brawn d12), and the armour's door (Sly 12, watched) goes to the Invisible Man: Out of Sight means Trouble there can't get him caught while he carries nothing. The tavern (every obstacle watched, three 10s and an 8) is insurance only.

**Turn 1 (Sus 0).** Moves; all five locations are watched (the schoolhouse and the seed merchant only by their second way in: "It's watched if any obstacle is, either way in"):

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R148 | the schoolhouse (J&H) | 1 | — | 0 |
| R149 | the bookseller (Invisible Man, Ghost) | 4 | whose (1–3 Invisible Man, 4–6 Ghost): R152 = 4, Cold Spot. The face (R153–R154): the baker's wife, tipsy from the cider | 1 |
| R150 | the seed merchant (Werewolf) | 1 | — | 1 |
| R151 | the baker (Creature) | 3 | — | 1 |

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R155–R156 | J&H (Jekyll), schoolhouse way A (locked front door, Sly / Brawn loud, 8) | Sly d8 → d10 (Librarian), Mask: 65 / 18 / 17%, and Trouble here costs only +1 | 3 + 3 | 6 vs 8 | **Cost**: **the cookbook** (essential). "Drop an item" is barred (he carries only what this roll won); Turn 2 is far from dawn and 1 of 15 far from the Limit; the Storyteller takes **his next roll's trait die one size smaller** (his next roll would be at the tavern, every obstacle a 10) | 1 |
| 2 | — | The Ghost passes the tug-of-war (way B, group, watched) by **Spectral**, at no action | | | | | 1 |
| 2 | R157–R158 | Ghost, bookseller (dark back room, Wits / Sly loud, 10) | Its Wits is a d6, and Through the Wall can't open it (the back room lists Sly). Sly d10 the loud way, **Chill** (3 → 2) to d12, Mask: the loud +1 comes whatever the result, so Trouble here costs nothing more | 10 + 6 | 16 vs 10 | Success (loud +1) | 2 |
| 2 | — | The Ghost passes the crowded shop floor (group) by Spectral, at no action: **the ink and sealing wax** (essential) | | | | | 2 |
| 2 | R159–R160 | Werewolf, seed merchant way A (dark back room, Wits / Sly loud, 8) | Wits d8 → d10 (Gardener), Mask | 1 + 6 | 7 vs 8 | **Cost**. He carries nothing; the Storyteller takes **his next roll's trait die one size smaller** (the front door, a 10, is next) | 2 |
| 2 | R161–R162 | Creature, baker way A (night watchman, Wits 8, not watched) | Wits d10, Mask | 7 + 6 | 13 vs 8 | Success | 2 |
| 2 | — | The Invisible Man, with nothing left to do at the bookseller, moves to the baker | | | | | 2 |
| 3 | R163–R164 | Creature, baker (heavy cellar trapdoor, Brawn 8, watched) | Brawn d12, Mask | 8 + 4 | 12 vs 8 | Success | 2 |
| 3 | R165–R166 | Invisible Man, baker (the rooftops, group, Nimble 8) | Nimble d8, Mask: 56 / 23 / 21%; Unseen kept for the armour's door | 7 + 6 | 13 vs 8 | Success: **the wedding cake** | 2 |
| 3 | R167–R168 | Werewolf, seed merchant (locked front door, Sly / Brawn loud, 10) | Brawn d10 → d12 (Gardener) → **d10** (the Cost), the loud way, **Good Dog** (3 → 2): 64 / 15 / 21% against Sly d6's 45% | 3 + 9 (shows, hidden) | 12 vs 10 | Success: **the seed potatoes** (loud +1) | 3 |
| 3 | — | A Win is in hand on Turn 3. The Ghost and J&H move to the way out; the tavern is dropped | | | | | 3 |
| 3 | R169 | The way out, the first time anyone comes back (Ghost, J&H) | Tell check | 3 | — | — | 3 |
| 4 | — | The Invisible Man hands the cake to the Creature (free, same place): Out of Sight protects him only while he carries nothing | | | | | 3 |
| 4 | R170–R171 | Invisible Man, the armour's locked front door (Sly / Brawn loud, 12, watched) | Sly d12, **Unseen** (3 → 2): 54 / 16 / 30% | 2 + 5 | 7 vs 12 | **Trouble**: Suspicion +1, but **not caught** (Out of Sight: he carries nothing) | 4 |
| 4 | — | The Creature (with the cake) and the Werewolf move to the way out | | | | | 4 |
| 5 | R172–R173 | Invisible Man, the door again | Sly d12, **Unseen** (2 → 1) | 6 + 8 (shows, hidden) | 14 vs 12 | Success: he takes **the suit of armour** (Bulky) | 4 |
| 5 | — | End of the Turn: the armour, +1 | | | | | 5 |
| 6 | — | The Invisible Man sets off with the armour (Turns 6–7) | | | | | 5 |
| 6 | — | End of the Turn: the armour, +1 | | | | | 6 |
| 7 | — | The Invisible Man acts first and finishes the carried move (S3) | | | | | 6 |
| 7 | R174–R175 | Werewolf, the way out (Sly / Nimble / Brawn loud, 10, watched) | Nimble d12, Monster: 70% against the Mask's 54% (nobody's ability can raise a d12 or open a way the way out doesn't list); the Werewolf rolls because Night Runner gives him Lead 2 if he's caught | 8 + 2 | 10 vs 10 | Success: **everyone out** | 6 |

**How the Year Went: Grand Year.** Both essentials, two of the three extras (the cheese missing) and the suit of armour; nobody left behind. Then "Turnip soup every night until spring." Out on **Turn 7** with five Turns to spare, at **Suspicion 6 of 15**. Charges: **4 of 15 spent** (Chill, Good Dog, Unseen ×2); J&H and the Creature never spent one, and J&H's Cost (a smaller next die) never bit: he made no other roll. The armour cost +2 (S3).

**Why it was so easy.** Of the town's 17 obstacles, the party rolled 8. The Ghost walked past both of the bookseller's group obstacles for free, so one roll (a Success) got the second essential; the schoolhouse had a single unwatched obstacle; and Out of Sight let the Invisible Man take two tries at the armour's watched Difficulty 12 door with no risk of a chase. A Hard town of 9 watched obstacles and two 12s took 7 Turns and 10 rolls of the dice (not counting Tell checks).

---

## 7. Play log: drills

Flights: every Entity rolls the Monster d10 (the Mask is off) against mob 11; the Lead starts at 2 and the party escapes at 6 (Hard). "S – T" counts Successes (a Critical as two) against Trouble; the Majority Rule moves the Lead 1 toward the side with more, or 2 if it leads by two or more. Each round's dice are the ground roll and then two dice per Entity, rolled one at a time in the order of their roll numbers (S5; the columns keep one order for reading). Default picks unless said; I chose each drill's start, and every roll after it is real.

### 7.1 Drill a: two Hard final flights from the Limit

**a1. Hard, 3 Entities** (R176–R179: the Invisible Man, the Mummy, R178 a repeat, the Creature; R180 unused). A Limit flight, 1 charge each. All three are Soon. The Invisible Man's charge can do nothing in a flight (Unseen hides a Monster when Suspicion has stopped; Through the Gap opens an approach, "Never in a chase"), and holding it he can't overdraw.

| Round | Ground | Invisible Man | Mummy | Creature | S – T | Lead |
|---|---|---|---|---|---|---|
| 1 | R181 = 5 parade | Sly d12: 7 + 1 = 8 T | **Ancient Lore** (1 → 0): Wits d12: 7 + 2 = 9 C | **Brute Force** (1 → 0): Brawn d12: 6 + 7 = 13 S | 1 – 1 | 2 |
| 2 | R188 = 5 parade | Sly d12: 2 + 7 = 9 C | Ancient Lore **overdrawn** on its own roll: Wits d12: 3 + 8 = 11 S | Brute Force **overdrawn** on its own roll: Brawn d12: 2 + 2 = 4 T | 1 – 1 | 2 |
| 3 | R195 = 3 market stalls (every Weakness in play) | Nimble d8 → d6 (Flour): 3 + 9 = 12 S | Brawn d10 → d8 (Loose Thread): 5 + 10 = 15 S | Brawn d12 → d10 (Fire): 3 + 4 = 7 T | 2 – 1 | 3 |
| 4 | R202 = 6 dead end | Wits d8: 4 + 7 = 11 S | Wits d10: 4 + 10 = 14 S | Brawn d10: 2 + 8 = 10 C | 2 – 0 | **5** (+2) |
| 5 | R209 = 6 dead end | Wits d8: 4 + 4 = 8 T | Wits d10: 10 + 2 = 12 S | Brawn d10: 9 + 4 = 13 S | 2 – 1 | **6: escaped** |

**Escaped in 5 rounds** (35 dice: 5 grounds and 30). Both round-2 overdraws were free: on its own roll, a Soon Entity's Weakness "from your own next roll" starts in round 3, when it comes anyway (PT5 m8, kept). The Invisible Man's charge went unspent.

**a2. Hard, 5 Entities** (R216–R222: the Mummy, the Witch, J&H, R219 a repeat, the Werewolf, R221 a repeat, the Creature; R223 unused). A Limit flight, 1 charge each, J&H as Jekyll. All five are Soon. The plan every party in PT5–PT7 found: spend every charge in round 1, then overdraw on your own roll in round 2, free.

| Round | Ground | Mummy | Witch | J&H | Werewolf | Creature | S – T | Lead |
|---|---|---|---|---|---|---|---|---|
| 1 | R224 = 2 back alleys | **Ancient Lore** (1 → 0): Wits d12: 10 + 1 = 11 S | Sly d10 → d12 (**Hedge Spell**, 1 → 0): 1 + 1 = 2 T | Jekyll Sly d8 → d10 (**Doctor's Bag**, 1 → 0): 9 + 4 = 13 S | Nimble d12: 7 + 7 = 14, **Critical** | **Brute Force** (1 → 0): Brawn d12: 12 + 2 = 14 S | 5 – 1 | **4** (+2) |
| 2 | R235 = 4 rooftops | Wits d12: 3 + 7 = 10 C | Wits d12: 6 + 7 = 13 S | Jekyll Wits d10 → d12 (Doctor's Bag **overdrawn**, own roll): 11 + 10 = 21 S | Nimble d12: 12 + 8 = 20 S | Brute Force **overdrawn**, own roll: Brawn d12: 3 + 7 = 10 C | 3 – 0 | **6: escaped** (+2) |

**Escaped in 2 rounds** (22 dice). The Witch's, the Mummy's and the Werewolf's overdraws were never needed (their Wits or Nimble was already a d12 on the rooftops).

### 7.2 Drill b: a lone local chase at Suspicion 11 on Hard

**Start (chosen):** Gallowsmere, Turn 8, Suspicion 11 of 15 after the Trouble that caught her. The Entity was rolled (R292 = 3): **the Mummy** (default picks: Ancient Lore, Patience of Ages; A Loose Thread, Soon), caught at the silversmith's guard dog with the silver spoons, 1 charge. Alone, Lead 1, escape at 4; the mob is 8 + 5 = 13, **held at 12** (the cap applies from Suspicion 8). With the Mask, the Mummy's best die on most grounds makes 12 less than half the time, so she lets the Monster out.

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R293 = 3 market stalls | **Ancient Lore** (1 → 0): Wits d12, Monster: 54 / 16 / 30% against Brawn d10's 45 / 19 / 36% | 11 + 8 | 19 vs 12 | Success | 2 | 11 |
| 2 | R296 = 1 square (Charm d8, Sly d6) | Ancient Lore **overdrawn** (Suspicion +2): Wits d12, Monster: 54 / 16 / 30% against Charm d8's 35 / 20 / 45%. The spoons are an essential | 3 + 1 | 4 vs 12 | Trouble (one roll, one rise: the overdraw's +2) | 1 | 13 |
| 3 | R299 = 5 parade (Charm d8 → d6, Sly d6 → d4: Loose Thread) | Overdrawn again (+2: the Limit). At Lead 1, Charm d6 and the Monster avoids Trouble 45% of the time; Wits d10 and the Monster 64%, and with Suspicion at 15 any result short of Trouble ends the chase into the flight | 4 + 2 | 6 vs 12 | **Trouble: cornered** | 0 | **15: the Limit** |

"If the Limit comes during a local chase, that chase ends at once and those Entities join the flight; anyone the same round cornered is captured first and stays behind." The Mummy is **captured** and held at the lock-up; the town takes back the spoons; the rest of the party flees in the final flight without her. **3 rounds, 9 dice, Suspicion 11 → 15.** The text answered every step at once. Exact odds from the book's numbers (best die per ground, the Monster, no charges, the mob held at 12): a lone Mummy escapes such a chase **20%** of the time (2% with the Mask); a lone Werewolf 22% (46% with Night Runner's Lead 2); a lone Ghost with Cold Iron 22%.

### 7.3 Drill c: an overdraw on a friend's roll, then the overdrawer's own roll the same round

**Start (chosen):** a Hard Limit flight with **the Witch** (chosen, 0 charges) and three rolled Entities (R246–R255, with the Witch's and repeated numbers rerolled): **Jekyll & Hyde** (as Jekyll), **the Mummy**, **Dracula**. Everyone at 0 charges. Dracula's Garlic is Always, so he is at one size smaller from round 1 and can never overdraw. The order of rolling within a round is the party's (S5); for the drill the Witch helps first and rolls last.

| Round | Ground | Dracula | J&H | Mummy | Witch | S – T | Lead |
|---|---|---|---|---|---|---|---|
| 1 | R256 = 6 dead end | Brawn d8 → d6 (Garlic) → **d8: the Witch overdraws Hedge Spell** on his roll: 2 + 10 = 12 S | Jekyll Wits d10: 7 + 4 = 11 S | Wits d12: 3 + 5 = 8 T | Wits d12 → **d10**: her Weakness (Rowan) is in play "from your own next roll (even later the same round)": 4 + 6 = 10 C | 2 – 1 | 3 |
| 2 | R265 = 4 rooftops | Nimble d10 → d8: 7 + 6 = 13 S | Jekyll Wits d10 → d12 (Doctor's Bag **overdrawn**, own roll): 2 + 2 = 4 T | Wits d12: 1 + 4 = 5 T | Wits d10 (Rowan): 4 + 8 = 12 S | 2 – 2 | 3 |
| 3 | R274 = 2 back alleys (every Weakness in play) | Nimble d8: 8 + 4 = 12 S | Jekyll Sly d8 → d6: 6 + 5 = 11 S | Sly d6 → d4: 4 + 7 = 11 S | Sly d10 → d8: 8 + 10 = 18 S | 4 – 0 | **5** (+2) |
| 4 | R283 = 1 square | Charm d12 → d10: 10 + 5 = 15 S | Jekyll Charm d12 → d10: 10 + 1 = 11 S | Charm d8 → d6: 3 + 10 = 13 S | Sly d10 → d8: 6 + 2 = 8 T | 3 – 1 | **6: escaped** |

**Escaped in 4 rounds** (36 dice). The new sentence read cleanly: the Witch's own roll later in round 1 took her Weakness, and so did round 2. The trade, exact from the book's numbers (the Monster against 11): Dracula's Brawn d6 → d8 moved his roll from 35 / 20 / 45% (Success / Cost / Trouble) to 45 / 20 / 35%, once; the Witch's Wits d12 → d10 moved hers from 63 / 14 / 23% to 55 / 17 / 28%, in rounds 1 and 2. Had she rolled first, the overdraw would have cost her round 2 only; nothing in the book says she can't (finding m1).

### 7.4 Drill d: the furniture abandoned for good mid-raid

**Start (chosen):** Gallowsmere, main line A's party with its picks, the start of **Turn 5**, Suspicion **11**. In hand: the lock (the Ghost), the paper (the Invisible Man), the bandages (the Creature). The Creature beat the tailor's trapdoor on Turn 4, took the suit of armour and set it down there at once (the +1 at the end of Turn 4 is in the 11). The silversmith's window is beaten; its guard dog (watched) and strongbox remain, and the spoons are an essential. Positions: the Werewolf and the Invisible Man at the silversmith; the Ghost and the Creature at the tailor with the armour. Charges: Werewolf 1, Creature 1, Ghost 1, Invisible Man 2.

**The decision.** The armour costs +1 at the end of every Turn ("even set down"). With two obstacles still between the party and an essential, a 2-Turn carry back, a Tell check at the way out still to come and a Limit of 15, keeping it would put the noise alone at 14 by the end of Turn 7. The party **abandons the armour for good** at the start of Turn 5, before anyone acts. The book gives no procedure, so I ruled (S6): the party declares it, at any time; the piece makes no more noise from that Turn's end on; it can't be taken again ("for good").

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 5 | R302–R303 | Werewolf, silversmith (guard dog, Charm / Nimble loud, 8, watched) | Nimble d12 the loud way, Mask | 1 + 4 | 5 vs 8 | **Trouble**, caught (one rise: +1) | 12 |

**The Werewolf's local chase** (Shortcut, not Night Runner: Lead 1, escape 4; mob 8 + 6 = 14, held at **12**; Hounds from round 3):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R304 = 1 square (Sly d6, Charm d4) | Sly d6, **Good Dog** (1 → 0) | 3 + 8 (shows, hidden) | 11 vs 12 | Cost | 1 | 12 |
| 2 | R307 = 2 back alleys | Nimble d12, Monster (54 / 16 / 30%; the Mask 38 / 17 / 46%) | 12 + 4 | 16 vs 12 | Success | 2 | 12 |
| 3 | R310 = 4 rooftops | Nimble d12 → d10 (Hounds), Monster | 1 + 9 (shows) | 10 vs 12 | Cost | 2 | 14 |
| 4 | R313 = 5 parade (Sly d6 → d4) | Sly d4, Mask: with the Monster any show or Trouble brings the Limit; with the Mask only a 4 + 6 (a Cost) keeps it off | 2 + 3 | 5 vs 12 | Trouble | 1 | **15: the Limit** |

The Limit comes during the chase and he isn't cornered (Lead 1), so the chase ends and he joins the flight. The abandoned armour played no further part: the Turn never ended, so the ruling on its last +1 never had to be applied.

**The final flight** (Hard, 4 Entities; the Ghost is Always (Cold Iron) and can never overdraw; the Invisible Man's 2 charges can do nothing):

| Round | Ground | Werewolf | Creature | Ghost | Invisible Man | S – T | Lead |
|---|---|---|---|---|---|---|---|
| 1 | R316 = 3 market stalls | Nimble d12: 11 + 6 = 17 S | Brawn d12: 10 + 7 = 17 S | Nimble d12 → d10 (Cold Iron): 6 + 4 = 10 C | Nimble d8 → d10 (**the Ghost's Chill**, 1 → 0): 5 + 8 = 13 S | 3 – 0 | **4** (+2) |
| 2 | R325 = 5 parade | Brawn d10 in place of the ground's traits: **the Creature's Brute Force, overdrawn after the Creature's own roll** (free: his Weakness comes from his next roll, in round 3): 10 + 4 = 14 S | **Brute Force** (1 → 0): Brawn d12: 10 + 2 = 12 S | Sly d10 → d8: 2 + 7 = 9 C | Sly d12: 4 + 3 = 7 T | 2 – 1 | 5 |
| 3 | R334 = 2 back alleys (every Weakness in play) | Nimble d10: 10 + 9 = 19 S | Nimble d8 → d6: 4 + 6 = 10 C | Nimble d10: 4 + 1 = 5 T | Sly d10: 9 + 4 = 13 S | 2 – 1 | **6: escaped** |

**Escaped in 3 rounds** (27 dice), home with the lock, the paper and the bandages: **Partial** (an essential missing; 3 of 5 home), nobody left behind. "The castle gets by, just. Someone has to sleep in the draughty tower." Then "Dinner is served on old coffin lids." and "Turnip soup every night until spring." The Werewolf rolled Brawn on a parade through a friend's switch: V2 on a friend's roll read cleanly again.

### 7.5 Drill e: a raid's lookups from the At the Table page alone (main line B)

I ran main line B's lookups from the At the Table page, the Entity sheets and the town table. The page carried the roll and its results, the Mask and the Monster, the Cost options, the Suspicion triggers (the loud way, a Tell, furniture each Turn), "One roll, one rise", the Duty raise, group obstacles, "Carrying: moves take two Turns", the way out's traits and "one roll for all", the results and every Hard number. I still had to open a chapter for these (the first two are building the town, which the page doesn't claim to cover):

1. **Building the town** (Chapter 8's Rolling a Town and its tables): outside the page's scope; listed for completeness.
2. **A face for a watched obstacle** (the villager tables, Chapter 8): the same.
3. **Whether a location is watched** when only its other way in is (the schoolhouse and the seed merchant, Turn 1): "It's watched if any obstacle is, either way in" is only in Chapter 4.
4. **Whose Tell** when two arrive together (the bookseller, Turn 1): only in Chapter 5.
5. **Choosing a Cost** (J&H, Turn 2): "never a Cost that costs nothing right then" and "'drop an item' … never what this roll wins" are only in Chapter 3.
6. **Through the Wall at the back room** (the Ghost, Turn 2): that an approach can be opened only where the obstacle doesn't list the trait is only in Chapter 3.
7. **Getting the item by passing the last obstacle** (Spectral, Turn 2): "beat or pass the last and it's in your hand" is only in Chapter 4.
8. **A Cost's smaller die meeting the Duty's raise** (the Werewolf, Turn 3): "Raises and steps down cancel out" is only in Chapter 3; the page and the sheet have "One raise per roll" and the d4 floor.
9. **Handing loot over** (the cake, Turn 4): "Loot has no limit; hand it over free in the same place" is only in Chapter 4.
10. **The furniture's obstacle** (Turns 4–5): when it may be tried ("Once that location's loot is in hand, whoever is past all its obstacles…") and how many carry a Bulky piece, and what carrying does to a carrier, are only in Chapter 4.
11. **The way out**: that everyone not captured must be there, that it is watched, and that its Tell check comes when anyone first comes back to it are only in Chapters 4 and 5.
12. **Two ways in, keep to one**: only in Chapters 4 and 9.

From the drills, two more: **when an overdraw's Weakness starts** (drill c; the page and the sheet say "or your Weakness once the hunt is on (once per flight)" but not "from your own next roll (even later the same round)"), and **what happens when the Limit comes during a local chase** (drills b and d; Chapter 5). Items 3–12 are the same gaps PT6 listed (its m4); none was added to the page. Finding m4.

### 7.6 Drill f (extra): Already Dead, below the Limit and at it

**f1. Start (chosen):** Gallowsmere, Turn 6, Suspicion 9: **a Ghost with the Already Dead Perk** (otherwise default: Chill, Butler; Cold Iron, Always) caught alone at the smithy's watchman, holding the lock. Lead 1, escape 4, mob 8 + 4 = 12. 1 charge. Cornered, Already Dead only costs it a Turn, so it plays the Mask to keep Suspicion down once its charge is gone.

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R343 = 1 square | Sly d10 → d8 (Cold Iron) → d10 (**Chill**, 1 → 0), Monster | 10 + 7 | 17 vs 12 | Success | 2 | 9 |
| 2 | R346 = 6 dead end (Brawn d4, Wits d6 → d4) | Wits d4, Mask | 1 + 2 | 3 vs 12 | Trouble | 1 | 10 |
| 3 | R349 = 4 rooftops | Nimble d12 → d10, Mask | 3 + 5 | 8 vs 12 | Trouble: **cornered** | 0 | 11 |

"Cornered in a local chase, you're back where you were caught and lose your next Turn instead of being captured." The Ghost is back before the watchman with the lock (not captured, so the town takes nothing) and loses Turn 7. PT6's w3 is answered by the text as it stands. 3 rounds, 9 dice.

**f2. Start (chosen):** the same Ghost, Turn 9, Suspicion **14**, 0 charges, caught alone at the printer's neighbour holding the paper. Lead 1, mob 12. Any Trouble now both corners it and brings the Limit.

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R352 = 6 dead end | Wits d6 → d4 (Cold Iron), Mask | 2 + 4 | 6 vs 12 | Trouble: **cornered** in the round **the Limit** comes | 0 | 15 |

Chapter 5 says "anyone the same round cornered is captured first and stays behind"; the Perk says "(if the Limit comes that round, you just join the final flight)". The Perk is the more specific rule and wins: the Ghost joins the flight with the paper. 1 round, 3 dice. V5 read cleanly in both cases.


---

## 8. Findings (most severe first)

No blockers and no major findings: every changed rule read cleanly at the moment it mattered (B6 in four Hard flights; V2 on own rolls and on a friend's; the furniture's noise carried and abandoned; V5 below the Limit and at it; the overdraw's new timing; the random Duty reroll; an approach opened at a later obstacle and at the furniture's). Each finding is marked **wording** (the book already implies an answer, or the fix only says more clearly what it means) or **rules** (the fix would change a rule or a number: needs the author's decision; numbers only, no new numbers proposed).

### 8.1 Major

None.

### 8.2 Minor

| id | Kind | Passage (quoted, chapter) | What happened / what I did | Suggested fix |
|---|---|---|---|---|
| m1 | rules | Ch6: "your Weakness is then in play **from your own next roll (even later the same round)** to the end of the flight" · Ch6, the Majority Rule: "Everyone rolls each round." · Ch3: "Spend abilities before you roll." | The new sentence settles PT6's m1, but it makes **the order of rolls inside a round** matter, and the book doesn't say what that order is. "Later the same round" implies the rolls come one at a time; nothing says who goes first, or that the party chooses (Chapter 4's "one at a time, in any order" is about Turns; its group check, "all declare … then roll together", is about obstacles). I ruled the party chooses (S5). Then the clause only bites a party that orders its rolls badly: an overdrawer who rolls before helping a friend gets the old timing. In drill c the Witch overdrew Hedge Spell on Dracula's round-1 roll and rolled last: her own Wits was a d10, not a d12, in rounds 1 and 2 (against mob 11 with the Monster: 55 / 17 / 28% instead of 63 / 14 / 23%), for Dracula's one roll at d8, not d6 (45 / 20 / 35% instead of 35 / 20 / 45%). Had she rolled first, only round 2 would have paid. In drill d's flight the Creature rolled first and then overdrew on the Werewolf's roll in round 2: free. | Needs the author's decision: either the party picks the order each round (and the clause is a trap for the careless), or everyone declares abilities before anyone rolls, as at a group check (and an overdraw on a friend's roll always reaches your own roll that round). Then say which in the Majority Rule box. |
| m2 | wording | Ch4: "From the Turn a piece is taken until it's out of town, lost **or abandoned for good**, Suspicion rises by 1 at the end of each Turn, even set down." · "Taking a piece is free; drop it any time." | The new words name the way to stop the noise (PT6 m5) but not how it's done. Drill d: the party wanted to abandon the suit of armour at the start of Turn 5 and had to rule (S6) that (1) the party simply declares it, (2) wherever the piece is (here, set down at the tailor, two of them standing by it), (3) the Turn it's abandoned in ends without its +1 (by then it has been "abandoned for good"), and (4) it can't be taken again ("for good"). None is written, and (3) and (4) change numbers: read the other way, the Turn of abandoning costs +1, and a piece taken back is a free way to stop and restart the noise. The other half of PT6's m5 is still open too: does a piece set down at the way out leave town when the party does? | Say it: e.g. "To abandon a piece for good, say so at any time: it makes no more noise from the end of that Turn and can't be taken again." And "a piece leaves town only if someone holds it". |
| m3 | wording, or rules if not meant | Ch4: "Carrying, every move takes two Turns (halfway, you're between places)." · "Entities act one at a time, in any order, and each result (a move too) counts at once." | PT6's m3, unchanged in the book: when does a carried move end, when the carrier acts in its second Turn or at the end of that Turn? I read the first (S3), as PT6 did: in main A (Turn 8) and main B (Turn 7) the carrier finished its move first and the way out was rolled after it in the same Turn, so each piece cost **+2**. Read the other way each would have cost **+3**, and each party would have left a Turn later (Turn 9 and Turn 8). On Hard this is the difference between leaving at 11 and at 12 of 15 in main A. | Say which: e.g. "A carrier arrives when it takes the second Turn of the move" (or "at the end of that Turn"). |
| m4 | wording (usability) | At the Table: "The rules on one page. The chapters have the details." | Drill e (7.5): running main line B from the page alone I still needed a chapter for ten things during play, the same ones PT6 listed (m4): whether a location is watched by its other way in; whose Tell when two arrive; the two limits on choosing a Cost; where an approach can be opened; "beat or pass the last and it's in your hand"; raises and steps down cancel out; handing loot over; when the furniture's obstacle can be tried, how many carry a piece and what carrying does to a carrier; the way out (everyone there, watched, its Tell check on the first return); two ways in, keep to one. The drills added two: when an overdraw's Weakness starts (neither the page nor the sheet has "from your own next roll"), and the Limit during a local chase. The page itself is unchanged since PT6. | As PT6 suggested: a short line for each, if they fit; at least the overdraw's timing on the page and the sheet ("overdraw: … or your Weakness from your own next roll"). |
| m5 | rules (balance) | Ch8, the difficulty table, Hard: "0 · 40 · 45 · 15%" obstacle shares, "Suspicion Limit 15", "The way out: Difficulty 10" · Ch2, Out of Sight: "trouble gets you caught only while you carry loot or furniture" · Spectral: "you get past group obstacles without rolling, at no action" | Both Hard raids came home with a **Grand Year**, early: Gallowsmere on Turn 8 at Suspicion 11 (9 of 12 charges spent), the rolled town on **Turn 7 at Suspicion 6** (4 of 15 charges spent), neither ever near a flight. In the rolled town the party rolled 8 of its 17 obstacles: Spectral took the Ghost past both of the bookseller's group obstacles (one roll got an essential), and Out of Sight let the Invisible Man try the armour's watched Difficulty 12 door twice with no chance of a chase (the first try was Trouble: +1, no catch). With PT5's two Gallowsmere raids, the four Hard raids played so far ended forked (Turn 2), Grand Year (Turn 10), Grand Year (Turn 8), Grand Year (Turn 7). Four raids are not a sample. | Worth a simulator look at how often a Hard raid is over by Turn 8, and at Out of Sight and Spectral on Hard. |
| m6 | rules (design question) | Ch5: "If the Limit comes during a local chase, that chase ends at once and those Entities join the flight; anyone the same round cornered is captured first and stays behind." · Ch3: "overdraw costs Suspicion +2" · Ch6: "The mob's Difficulty is 8 plus half the Suspicion (round down), at most 12" | On Hard the local mob is at its cap of 12 from Suspicion 8, where a lone Entity escapes about **20–22%** of the time (exact, the Monster, no charges: the Mummy 20%, the Werewolf 22%, a Ghost 22%; the Werewolf with Night Runner 46%; the Mummy with the Mask 2%). From Suspicion 13, any overdraw or Monster show brings the Limit with the roll, and then **any result short of a cornering ends the chase** and the Entity joins the flight. So at Lead 1 the best play can be to drag the whole party into the final flight: in drill b the Mummy overdrew at 13 (Wits d10 and the Monster against 12: 64% not cornered, against 45% for Charm d6 without the overdraw) and was cornered anyway; in drill d the Werewolf's Trouble at 14 brought the Limit at Lead 1 and he joined the flight. Both high-Suspicion lone chases in this playtest ended at the Limit, in rounds 3 and 4. | Needs the author's decision whether the Limit is meant to rescue a lone Entity from its local chase (PT5's M1, the local chase spiral, was kept by decision; this is its far end on Hard). |

### 8.3 Wording

| id | Passage (quoted) | Issue | Suggested fix |
|---|---|---|---|
| w1 | Ch8, Rolling a Town: "Locations: one for each item on the list, at one of the places its kind is found (the shopping table lists them): **roll or pick**, one item per place." · The Furniture: "standing at one of the list's locations (**roll or pick**; Chapter 4)" | No die is named for either roll (three places for most kinds, two for silver; four or five locations for the furniture). I used a d6 split evenly and rerolled a taken place (S1). | Name the die: e.g. "roll a d6: 1–2 the first place, 3–4 the second, 5–6 the third (silver: 1–3, 4–6)", and for the furniture "roll a d6 down the list, rerolling a 6". |
| w2 | Ch8: "The ceiling: at most one Difficulty 12 in an Easy or Standard town, two in a Hard town (**the furniture's +2 doesn't count**). Reroll any extra." | A furniture obstacle that rolls a 12 before its +2 (main B's armour door): does it count as one of the two? I counted it (S2); it didn't change the town, but with three natural 12s it would decide which one is rerolled. | "(a furniture obstacle counts only if it rolled 12 before its +2)", or "(the furniture's obstacle never counts)". |

**Counts: 0 blockers, 0 major, 6 minor, 2 wording** (8 in all). By kind: **5 wording** (m2, m3, m4, w1, w2: the book already implies an answer, or the fix only says more clearly what it means) and **3 rules** questions for the author (m1, m5, m6).

### 8.4 PT6's findings: what the book now says

| PT6 id | Status | Quote now in the book (or why not) |
|---|---|---|
| m1 an overdraw on a friend's roll | **resolved** | Ch6: "your Weakness is then in play from your own next roll (even later the same round) to the end of the flight". Drill c, real dice. It opens the order-of-rolls question (m1 above). |
| m2 B6's side effects | **not** (kept by decision) | Ch6 unchanged: "…or by 2 if they outnumber it by two or more". The review log (row 51: "V10 B6 unchanged") kept it. Four Hard flights here took 2–5 rounds; exact odds for these parties are in section 9 (escape 63–76%, forked in round 1 7–11%). |
| m3 when a carried move ends | **not** | Ch4 unchanged on this: "Carrying, every move takes two Turns (halfway, you're between places)." Both main lines read it as PT6 did (m3 above). |
| m4 At the Table gaps | **not** | The page is unchanged; drill e found the same ten gaps (m4 above). |
| m5 an abandoned piece | **partly** | Ch4: "until it's out of town, lost **or abandoned for good**". The way to stop the noise is in the book; how to abandon, whether that Turn pays, whether it can be retaken, and whether a set-down piece leaves town are not (m2 above). |
| w1 an approach at any obstacle | **resolved** | Ch3: "Open an approach nobody else can take: at any obstacle, not only a way in, if it doesn't list the ability's trait…". Main A: the Ghost at the smithy's watchman (its second obstacle) and at the tailor's furniture trapdoor. |
| w2 a random Duty already taken | **resolved** | Ch2: "(for the Castle Duty, roll on its table, rerolling one already taken)". Main A: the Invisible Man rolled Handyman, the Ghost's (R16), and rerolled Librarian (R17). |
| w3 Already Dead: where the Ghost ends up | **resolved** | Ch2: "cornered in a local chase, you're back where you were caught and lose your next Turn instead of being captured (if the Limit comes that round, you just join the final flight)". Drill f1 (back before the watchman, Turn lost) and f2 (cornered as the Limit came: joined the flight), real dice. |

**PT6: 4 resolved, 1 partly, 3 not** (of 8). Of the three not resolved, m2 was kept by decision (the review log, row 51); m3 and m4 were not taken up, and the book's text is unchanged for both.

---

## 9. Balance and usability notes

### 9.1 Numbers from play

- **Results:** main A (Gallowsmere) **Grand Year**, out on **Turn 8**; main B (the rolled Hard town) **Grand Year**, out on **Turn 7**; drill d (from a chosen start at Suspicion 11) Partial, through a flight. Neither main line came near a flight (m5).
- **Suspicion at the end of each Turn:** main A 3, 4, 5, 5, 5, 10, 11 (out on Turn 8 at 11; 13 after the way out's show). Main B 1, 2, 3, 4, 5, 6 (out on Turn 7 at 6).
- **Suspicion sources:** main A (11 before the last roll): Tells 3, Trouble 2 (one catch; one unwatched tug-of-war), the loud way 2, a Monster show 2 (the Ghost at the trapdoor), carrying 2. Main B (6): a Tell 1, the loud way 2, Trouble 1 (Out of Sight: no catch), carrying 2. No Cost was taken as Suspicion.
- **Tells:** 4 of 11 checks went off (main A 3 of 6, all three on Turn 1; main B 1 of 5).
- **Costs chosen** (Chapter 8: "a smaller die before a hard roll"): all four were "your next roll's trait die one size smaller". "Drop an item" was barred twice (the roller carried only what the roll won, or nothing) and was weak once (a friend stood by to pick it up); "lose a Turn" never hurt more on Turns 2–5. Twice the smaller die cancelled a raise (a Duty, Chill); once it never bit (J&H made no other roll).
- **Charges:** main A **9 of 12** spent (Good Dog ×3 in one local chase; Through the Wall ×2 and Chill; Unseen ×2; Hovel Watcher). Main B **4 of 15** (Chill, Good Dog, Unseen ×2); J&H and the Creature spent none.
- **Opened approaches:** 2 rolled (the Ghost's Through the Wall at the smithy's watchman and at the furniture's trapdoor), 2 Successes. With PT5's and PT6's, 20 opened approaches, none Trouble.
- **Furniture:** the suit of armour both times. Main A: the Ghost opened the trapdoor with Through the Wall (after handing its loot to the Creature, since the Wall works "not while you carry loot or furniture") and carried it alone, +2. Main B: the Invisible Man, carrying nothing, took Trouble then a Success at the watched 12 door, +2. Drill d: abandoned for good at once (m2).
- **Local chases:** 5 played, 14 rounds: main A's Werewolf at mob 10 (escaped in round 3 on a Critical, after three Good Dogs); drill b's Mummy at 12 (captured as the Limit came, round 3); drill d's Werewolf at 12 (joined the flight at the Limit, round 4); drill f1's Ghost at 12 (cornered, round 3: Already Dead); f2 (cornered as the Limit came, round 1: joined the flight). Every high-Suspicion chase on Hard ended at the Limit or a cornering (m6).

### 9.2 Hard final flights under B6

**Seen in play** (each round is one ground roll plus two dice per Entity):

| Flight | Entities | Rounds | Dice | Lead after each round | Result |
|---|---|---|---|---|---|
| a1 | 3 (Invisible Man, Mummy, Creature) | **5** | 35 | 2, 2, 3, 5, 6 | escaped |
| a2 | 5 (Mummy, Witch, J&H, Werewolf, Creature) | **2** | 22 | 4, 6 | escaped |
| c | 4 (Witch, J&H, Mummy, Dracula) | **4** | 36 | 3, 3, 5, 6 | escaped |
| d | 4 (Werewolf, Creature, Ghost, Invisible Man) | **3** | 27 | 4, 5, 6 | escaped |

14 rounds and 120 dice in all; the Lead moved by 2 in 6 of the 14 rounds and never fell. Charges: every party spent its useful charges in round 1 and overdrew in round 2 (six overdraws in round 2, all free; one in round 1, drill c, which cost the Witch two rolls). Dead charges: the Invisible Man's in a1 (1) and drill d (2), as in PT5's m8 (kept by decision).

**Exact odds from the book's numbers** (best die per ground, Weaknesses on time, no charges, J&H in his better form each round; the same calculation reproduces PT6's figures for its Hard parties):

| Party | Escape | Forked | Mean rounds (mean dice) | 10+ rounds | Forked in round 1 | Forked by round 3 | Escaped by round 3 |
|---|---|---|---|---|---|---|---|
| a1: Invisible Man, Mummy, Creature | 63% | 37% | 5.6 (39) | 15% | 7% | 17% | 22% |
| a2: Mummy, Witch, J&H, Werewolf, Creature | 72% | 28% | 4.4 (48) | 8% | 9% | 16% | 37% |
| c: Witch, J&H, Mummy, Dracula | 74% | 26% | 4.5 (41) | 8% | 9% | 16% | 33% |
| d and main A: Werewolf, Creature, Ghost, Invisible Man | 67% | 33% | 4.7 (42) | 10% | 11% | 19% | 29% |
| main B: Werewolf, J&H, Ghost, Creature, Invisible Man | 76% | 24% | 4.3 (47) | 7% | 9% | 15% | 38% |

The three-Entity party is the weak one: a Hard flight of 3 escapes 63% of the time and runs 10 rounds or more 15% of the time; four or five escape 67–76%.

**What felt good:** Hard flights fit in a few minutes (2–5 rounds); V2 kept the Mummy and the Creature on their best die whatever the ground, and a friend's switch on a parade (drill d) was a good table moment. The new overdraw sentence and Already Dead each answered their question in one reading. Through the Wall at the furniture, after handing the loot over, played like a ghost. **What felt bad:** at Suspicion 8+ on Hard a lone local chase is grim (mob 12), and both such chases ended at the Limit (m6). Both main lines were over by Turn 7–8 with charges left, the rolled town at Suspicion 6 (m5).

### 9.3 Using the Entity Sheet, At the Table and the town pages

- **Gallowsmere's page** was enough to run the town, with Chapter 9's opener for "keep to one way in" and "already 2 harder".
- **The rolled town** took 78 rolls to build (R70–R147, with four rerolls) and every table worked; only w1 and w2 needed a ruling. A rolled town names nothing, and some obstacles land oddly (a night watchman not watched; a locked front door as a third obstacle or as the furniture's); the obstacle table's flavour carried it.
- **The Entity Sheet:** "In a chase: □ Weakness in play □ overdrawn this flight" was ticked in every flight. Its overdraw line ("or your Weakness once the hunt is on (once per flight)") doesn't say when the Weakness starts (m4).
- **At the Table:** the Hard column, the B6 line and the chase table carried every flight. The gaps are in m4.

---

## 10. Roll appendix

Every roll in order, as logged when rolled (`Math.random`, one die per line). Labels are the log's own shorthand: "A" and "B" are the main lines; a1–a2, b, c, d and e are the drills; "IM" is the Invisible Man, "J&H" Jekyll & Hyde; "T5" is Turn 5 and "r3" round 3.

| Roll | What | Die |
|---|---|---|
| R1 | A party pick 1 | d8 = 4 |
| R2 | A party pick 2 | d8 = 2 |
| R3 | A party pick 3 | d8 = 6 |
| R4 | A party pick 4 | d8 = 5 |
| R5 | A Werewolf Gift | d6 = 3 |
| R6 | A Werewolf Perk | d6 = 3 |
| R7 | A Werewolf Duty | d6 = 1 |
| R8 | A Creature Gift | d6 = 3 |
| R9 | A Creature Perk | d6 = 4 |
| R10 | A Creature Duty | d6 = 4 |
| R11 | A Ghost Gift | d6 = 2 |
| R12 | A Ghost Perk | d6 = 1 |
| R13 | A Ghost Duty | d6 = 5 |
| R14 | A IM Gift | d6 = 2 |
| R15 | A IM Perk | d6 = 3 |
| R16 | A IM Duty | d6 = 5 |
| R17 | A IM Duty reroll (Handyman taken) | d6 = 3 |
| R18 | A T1 Tell smithy (Ghost) | d6 = 4 |
| R19 | A T1 Tell silversmith (Creature, Werewolf) | d6 = 5 |
| R20 | A T1 Tell printer (IM) | d6 = 4 |
| R21 | A T1 silversmith whose Tell (1-3 Creature, 4-6 Werewolf) | d6 = 4 |
| R22 | A T2 Ghost smithy wall Nimble | d12 = 10 |
| R23 | A T2 Ghost Mask | d6 = 1 |
| R24 | A T2 Werewolf silversmith window Nimble | d12 = 3 |
| R25 | A T2 Werewolf Mask | d6 = 2 |
| R26 | A T2 Werewolf chase r1 ground | d6 = 4 |
| R27 | A T2 Werewolf chase r1 Nimble | d12 = 11 |
| R28 | A T2 Werewolf chase r1 Monster (Good Dog) | d10 = 6 |
| R29 | A T2 Werewolf chase r2 ground | d6 = 5 |
| R30 | A T2 Werewolf chase r2 Sly | d6 = 6 |
| R31 | A T2 Werewolf chase r2 Monster (Good Dog) | d10 = 2 |
| R32 | A T2 Werewolf chase r3 ground | d6 = 4 |
| R33 | A T2 Werewolf chase r3 Nimble (d12 Hounds->d10) | d10 = 10 |
| R34 | A T2 Werewolf chase r3 Monster (Good Dog) | d10 = 10 |
| R35 | A T2 Creature silversmith window Nimble (d8 Butler->d10) | d10 = 2 |
| R36 | A T2 Creature Mask | d6 = 5 |
| R37 | A T2 IM printer neighbour Sly | d12 = 4 |
| R38 | A T2 IM Monster (Unseen) | d10 = 6 |
| R39 | A T3 Ghost smithy watchman Through the Wall Sly (d10 Handyman->d12) at 8 | d12 = 9 |
| R40 | A T3 Ghost Mask | d6 = 4 |
| R41 | A T3 IM printer back room Wits (d10 Librarian->d12) | d12 = 7 |
| R42 | A T3 IM Mask | d6 = 3 |
| R43 | A T3 Werewolf silversmith guard dog Nimble loud | d12 = 6 |
| R44 | A T3 Werewolf Mask | d6 = 4 |
| R45 | A T3 Creature strongbox Wits (d10 Butler d12, Cost step-down d10) | d10 = 8 |
| R46 | A T3 Creature Monster (Hovel Watcher) | d10 = 7 |
| R47 | A T4 Tell tailor (Ghost, Creature) | d6 = 3 |
| R48 | A T4 Tell butcher (IM, Werewolf) | d6 = 2 |
| R49 | A T5 Ghost tailor drainpipe Nimble | d12 = 3 |
| R50 | A T5 Ghost Mask | d6 = 4 |
| R51 | A T5 IM butcher geese Sly | d12 = 7 |
| R52 | A T5 IM Mask | d6 = 1 |
| R53 | A T6 Ghost tailor trapdoor TtW Sly (d10 Chill d12, step-down d10) at 10 | d10 = 7 |
| R54 | A T6 Ghost Monster | d10 = 10 |
| R55 | A T6 IM butcher shopkeeper Sly loud | d12 = 7 |
| R56 | A T6 IM Monster (Unseen) | d10 = 9 |
| R57 | A T6 Werewolf butcher tug-of-war Brawn (d10 Cook->d12) | d12 = 6 |
| R58 | A T6 Werewolf Mask | d6 = 3 |
| R59 | A T7 Tell way out first return (Creature, IM, Werewolf) | d6 = 2 |
| R60 | A T8 Werewolf way out (Shortcut 10->8) Nimble | d12 = 1 |
| R61 | A T8 Werewolf Monster | d10 = 10 |
| R62 | B party pick 1 | d8 = 4 |
| R63 | B party pick 2 | d8 = 4 |
| R64 | B party pick 3 | d8 = 8 |
| R65 | B party pick 4 | d8 = 6 |
| R66 | B party pick 5 | d8 = 2 |
| R67 | B party pick 5 (R63 repeat) | d8 = 8 |
| R68 | B party pick 5 (R67 repeat) | d8 = 2 |
| R69 | B party pick 5 (R68 repeat) | d8 = 5 |
| R70 | B list item 1 kind | d6 = 3 |
| R71 | B list item 1 item | d6 = 3 |
| R72 | B list item 2 kind | d6 = 3 |
| R73 | B list item 2 item | d6 = 4 |
| R74 | B list item 3 kind | d6 = 1 |
| R75 | B list item 3 item | d6 = 1 |
| R76 | B list item 4 kind | d6 = 1 |
| R77 | B list item 4 item | d6 = 6 |
| R78 | B list item 5 kind | d6 = 2 |
| R79 | B list item 5 item | d6 = 1 |
| R80 | B Lantern Night custom | d6 = 2 |
| R81 | B place item 1 cookbook (1-2 bookseller,3-4 printer,5-6 schoolhouse) | d6 = 6 |
| R82 | B place item 2 ink | d6 = 6 |
| R83 | B place item 3 cheese (1-2 baker,3-4 butcher,5-6 tavern cellar) | d6 = 6 |
| R84 | B place item 4 cake | d6 = 2 |
| R85 | B place item 5 seed potatoes (1-2 market garden,3-4 florist,5-6 seed merchant) | d6 = 6 |
| R86 | B place item 2 ink reroll (schoolhouse taken) | d6 = 2 |
| R87 | B obstacles count schoolhouse | d20 = 3 |
| R88 | B obstacles count bookseller | d20 = 16 |
| R89 | B obstacles count tavern cellar | d20 = 13 |
| R90 | B obstacles count baker | d20 = 15 |
| R91 | B obstacles count seed merchant | d20 = 8 |
| R92 | B obst schoolhouse way A table | d20 = 9 |
| R93 | B obst schoolhouse way A Difficulty | d20 = 3 |
| R94 | B obst schoolhouse way A watched | d10 = 10 |
| R95 | B obst bookseller way A table | d20 = 20 |
| R96 | B obst bookseller way A Difficulty | d20 = 20 |
| R97 | B obst bookseller way A watched | d10 = 2 |
| R98 | B obst bookseller then 1 table | d20 = 18 |
| R99 | B obst bookseller then 1 Difficulty | d20 = 13 |
| R100 | B obst bookseller then 1 watched | d10 = 9 |
| R101 | B obst bookseller then 2 table | d20 = 11 |
| R102 | B obst bookseller then 2 Difficulty | d20 = 8 |
| R103 | B obst bookseller then 2 watched | d10 = 9 |
| R104 | B obst tavern way A table | d20 = 9 |
| R105 | B obst tavern way A Difficulty | d20 = 16 |
| R106 | B obst tavern way A watched | d10 = 5 |
| R107 | B obst tavern then 1 table | d20 = 3 |
| R108 | B obst tavern then 1 Difficulty | d20 = 6 |
| R109 | B obst tavern then 1 watched | d10 = 3 |
| R110 | B obst baker way A table | d20 = 19 |
| R111 | B obst baker way A Difficulty | d20 = 5 |
| R112 | B obst baker way A watched | d10 = 10 |
| R113 | B obst baker then 1 table | d20 = 1 |
| R114 | B obst baker then 1 Difficulty | d20 = 6 |
| R115 | B obst baker then 1 watched | d10 = 2 |
| R116 | B obst baker then 2 table | d20 = 7 |
| R117 | B obst baker then 2 Difficulty | d20 = 2 |
| R118 | B obst baker then 2 watched | d10 = 8 |
| R119 | B obst seed merchant way A table | d20 = 18 |
| R120 | B obst seed merchant way A Difficulty | d20 = 3 |
| R121 | B obst seed merchant way A watched | d10 = 9 |
| R122 | B obst seed merchant then 1 table | d20 = 9 |
| R123 | B obst seed merchant then 1 Difficulty | d20 = 15 |
| R124 | B obst seed merchant then 1 watched | d10 = 7 |
| R125 | B obst schoolhouse way B table (quiet not Sly) | d20 = 13 |
| R126 | B obst bookseller way B table (quiet not Wits) | d20 = 2 |
| R127 | B obst tavern way B table (quiet not Sly) | d20 = 17 |
| R128 | B obst baker way B table (quiet not Wits) | d20 = 17 |
| R129 | B obst seed merchant way B table (quiet not Wits) | d20 = 17 |
| R130 | B obst baker way B table reroll (quiet not Wits) | d20 = 5 |
| R131 | B obst seed merchant way B table reroll (quiet not Wits) | d20 = 17 |
| R132 | B obst seed merchant way B table reroll 2 (quiet not Wits) | d20 = 1 |
| R133 | B obst schoolhouse way B Difficulty | d20 = 17 |
| R134 | B obst schoolhouse way B watched | d10 = 5 |
| R135 | B obst bookseller way B Difficulty | d20 = 4 |
| R136 | B obst bookseller way B watched | d10 = 3 |
| R137 | B obst tavern way B Difficulty | d20 = 13 |
| R138 | B obst tavern way B watched | d10 = 4 |
| R139 | B obst baker way B Difficulty | d20 = 7 |
| R140 | B obst baker way B watched | d10 = 7 |
| R141 | B obst seed merchant way B Difficulty | d20 = 8 |
| R142 | B obst seed merchant way B watched | d10 = 3 |
| R143 | B furniture piece | d6 = 3 |
| R144 | B furniture location (1 schoolhouse,2 bookseller,3 tavern,4 baker,5 seed merchant,6 reroll) | d6 = 4 |
| R145 | B furniture obstacle table | d20 = 9 |
| R146 | B furniture obstacle Difficulty (+2) | d20 = 19 |
| R147 | B furniture obstacle watched | d10 = 3 |
| R148 | B T1 Tell schoolhouse (J&H) | d6 = 1 |
| R149 | B T1 Tell bookseller (IM, Ghost) | d6 = 4 |
| R150 | B T1 Tell seed merchant (Werewolf) | d6 = 1 |
| R151 | B T1 Tell baker (Creature) | d6 = 3 |
| R152 | B T1 bookseller whose Tell (1-3 IM, 4-6 Ghost) | d6 = 4 |
| R153 | B T1 villager face (who) | d6 = 1 |
| R154 | B T1 villager face (doing) | d6 = 2 |
| R155 | B T2 J&H (Jekyll) schoolhouse front door Sly (d8 Librarian->d10) | d10 = 3 |
| R156 | B T2 J&H Mask | d6 = 3 |
| R157 | B T2 Ghost bookseller back room Sly loud (d10 Chill->d12) | d12 = 10 |
| R158 | B T2 Ghost Mask | d6 = 6 |
| R159 | B T2 Werewolf seed merchant back room Wits (d8 Gardener->d10) | d10 = 1 |
| R160 | B T2 Werewolf Mask | d6 = 6 |
| R161 | B T2 Creature baker watchman Wits | d10 = 7 |
| R162 | B T2 Creature Mask | d6 = 6 |
| R163 | B T3 Creature baker trapdoor Brawn | d12 = 8 |
| R164 | B T3 Creature Mask | d6 = 4 |
| R165 | B T3 IM baker rooftops (group) Nimble | d8 = 7 |
| R166 | B T3 IM Mask | d6 = 6 |
| R167 | B T3 Werewolf seed merchant front door Brawn loud (d10 Gardener d12, step-down d10) | d10 = 3 |
| R168 | B T3 Werewolf Monster (Good Dog) | d10 = 9 |
| R169 | B T3 Tell way out first return (Ghost, J&H) | d6 = 3 |
| R170 | B T4 IM baker furniture front door Sly | d12 = 2 |
| R171 | B T4 IM Monster (Unseen) | d10 = 5 |
| R172 | B T5 IM baker furniture front door Sly | d12 = 6 |
| R173 | B T5 IM Monster (Unseen) | d10 = 8 |
| R174 | B T7 Werewolf way out Nimble | d12 = 8 |
| R175 | B T7 Werewolf Monster | d10 = 2 |
| R176 | a1 party pick 1 | d8 = 5 |
| R177 | a1 party pick 2 | d8 = 3 |
| R178 | a1 party pick 3 | d8 = 5 |
| R179 | a1 party spare 1 | d8 = 2 |
| R180 | a1 party spare 2 | d8 = 4 |
| R181 | a1 r1 ground | d6 = 5 |
| R182 | a1 r1 IM Sly | d12 = 7 |
| R183 | a1 r1 IM Monster | d10 = 1 |
| R184 | a1 r1 Mummy Wits (Ancient Lore) | d12 = 7 |
| R185 | a1 r1 Mummy Monster | d10 = 2 |
| R186 | a1 r1 Creature Brawn (Brute Force) | d12 = 6 |
| R187 | a1 r1 Creature Monster | d10 = 7 |
| R188 | a1 r2 ground | d6 = 5 |
| R189 | a1 r2 IM Sly | d12 = 2 |
| R190 | a1 r2 IM Monster | d10 = 7 |
| R191 | a1 r2 Mummy Wits (Ancient Lore overdrawn) | d12 = 3 |
| R192 | a1 r2 Mummy Monster | d10 = 8 |
| R193 | a1 r2 Creature Brawn (Brute Force overdrawn) | d12 = 2 |
| R194 | a1 r2 Creature Monster | d10 = 2 |
| R195 | a1 r3 ground | d6 = 3 |
| R196 | a1 r3 IM Nimble (d8 Flour->d6) | d6 = 3 |
| R197 | a1 r3 IM Monster | d10 = 9 |
| R198 | a1 r3 Mummy Brawn (d10 Thread->d8) | d8 = 5 |
| R199 | a1 r3 Mummy Monster | d10 = 10 |
| R200 | a1 r3 Creature Brawn (d12 Fire->d10) | d10 = 3 |
| R201 | a1 r3 Creature Monster | d10 = 4 |
| R202 | a1 r4 ground | d6 = 6 |
| R203 | a1 r4 IM Wits (d10->d8) | d8 = 4 |
| R204 | a1 r4 IM Monster | d10 = 7 |
| R205 | a1 r4 Mummy Wits (d12->d10) | d10 = 4 |
| R206 | a1 r4 Mummy Monster | d10 = 10 |
| R207 | a1 r4 Creature Brawn (d12->d10) | d10 = 2 |
| R208 | a1 r4 Creature Monster | d10 = 8 |
| R209 | a1 r5 ground | d6 = 6 |
| R210 | a1 r5 IM Wits (d10->d8) | d8 = 4 |
| R211 | a1 r5 IM Monster | d10 = 4 |
| R212 | a1 r5 Mummy Wits (d12->d10) | d10 = 10 |
| R213 | a1 r5 Mummy Monster | d10 = 2 |
| R214 | a1 r5 Creature Brawn (d12->d10) | d10 = 9 |
| R215 | a1 r5 Creature Monster | d10 = 4 |
| R216 | a2 party pick 1 | d8 = 3 |
| R217 | a2 party pick 2 | d8 = 7 |
| R218 | a2 party pick 3 | d8 = 8 |
| R219 | a2 party pick 4 | d8 = 3 |
| R220 | a2 party pick 5 | d8 = 4 |
| R221 | a2 party spare 1 | d8 = 4 |
| R222 | a2 party spare 2 | d8 = 2 |
| R223 | a2 party spare 3 | d8 = 1 |
| R224 | a2 r1 ground | d6 = 2 |
| R225 | a2 r1 Mummy Wits (Ancient Lore) | d12 = 10 |
| R226 | a2 r1 Mummy Monster | d10 = 1 |
| R227 | a2 r1 Witch Sly (Hedge Spell d10->d12) | d12 = 1 |
| R228 | a2 r1 Witch Monster | d10 = 1 |
| R229 | a2 r1 J&H Jekyll Sly (Doctor's Bag d8->d10) | d10 = 9 |
| R230 | a2 r1 J&H Monster | d10 = 4 |
| R231 | a2 r1 Werewolf Nimble | d12 = 7 |
| R232 | a2 r1 Werewolf Monster | d10 = 7 |
| R233 | a2 r1 Creature Brawn (Brute Force) | d12 = 12 |
| R234 | a2 r1 Creature Monster | d10 = 2 |
| R235 | a2 r2 ground | d6 = 4 |
| R236 | a2 r2 Mummy Wits | d12 = 3 |
| R237 | a2 r2 Mummy Monster | d10 = 7 |
| R238 | a2 r2 Witch Wits | d12 = 6 |
| R239 | a2 r2 Witch Monster | d10 = 7 |
| R240 | a2 r2 J&H Jekyll Wits (Doctor's Bag overdrawn d10->d12) | d12 = 11 |
| R241 | a2 r2 J&H Monster | d10 = 10 |
| R242 | a2 r2 Werewolf Nimble | d12 = 12 |
| R243 | a2 r2 Werewolf Monster | d10 = 8 |
| R244 | a2 r2 Creature Brawn (Brute Force overdrawn) | d12 = 3 |
| R245 | a2 r2 Creature Monster | d10 = 7 |
| R246 | c party pick 1 (Witch chosen; 7 rerolled) | d8 = 8 |
| R247 | c party pick 2 | d8 = 7 |
| R248 | c party pick 3 | d8 = 7 |
| R249 | c party spare 1 | d8 = 8 |
| R250 | c party spare 2 | d8 = 3 |
| R251 | c party spare 3 | d8 = 7 |
| R252 | c party spare 4 | d8 = 8 |
| R253 | c party spare 5 | d8 = 8 |
| R254 | c party spare 6 | d8 = 7 |
| R255 | c party spare 7 | d8 = 1 |
| R256 | c r1 ground | d6 = 6 |
| R257 | c r1 Dracula Brawn (d8 Garlic d6, Witch's Hedge Spell overdrawn d8) | d8 = 2 |
| R258 | c r1 Dracula Monster | d10 = 10 |
| R259 | c r1 J&H Jekyll Wits | d10 = 7 |
| R260 | c r1 J&H Monster | d10 = 4 |
| R261 | c r1 Mummy Wits | d12 = 3 |
| R262 | c r1 Mummy Monster | d10 = 5 |
| R263 | c r1 Witch Wits (d12, Rowan from overdraw d10) | d10 = 4 |
| R264 | c r1 Witch Monster | d10 = 6 |
| R265 | c r2 ground | d6 = 4 |
| R266 | c r2 Dracula Nimble (d10 Garlic->d8) | d8 = 7 |
| R267 | c r2 Dracula Monster | d10 = 6 |
| R268 | c r2 J&H Jekyll Wits (Doctor's Bag overdrawn d10->d12) | d12 = 2 |
| R269 | c r2 J&H Monster | d10 = 2 |
| R270 | c r2 Mummy Wits | d12 = 1 |
| R271 | c r2 Mummy Monster | d10 = 4 |
| R272 | c r2 Witch Wits (Rowan d10) | d10 = 4 |
| R273 | c r2 Witch Monster | d10 = 8 |
| R274 | c r3 ground | d6 = 2 |
| R275 | c r3 Dracula Nimble (d8) | d8 = 8 |
| R276 | c r3 Dracula Monster | d10 = 4 |
| R277 | c r3 J&H Jekyll Sly (d8->d6) | d6 = 6 |
| R278 | c r3 J&H Monster | d10 = 5 |
| R279 | c r3 Mummy Sly (d6->d4) | d4 = 4 |
| R280 | c r3 Mummy Monster | d10 = 7 |
| R281 | c r3 Witch Sly (d10->d8) | d8 = 8 |
| R282 | c r3 Witch Monster | d10 = 10 |
| R283 | c r4 ground | d6 = 1 |
| R284 | c r4 Dracula Charm (d12->d10) | d10 = 10 |
| R285 | c r4 Dracula Monster | d10 = 5 |
| R286 | c r4 J&H Jekyll Charm (d12->d10) | d10 = 10 |
| R287 | c r4 J&H Monster | d10 = 1 |
| R288 | c r4 Mummy Charm (d8->d6) | d6 = 3 |
| R289 | c r4 Mummy Monster | d10 = 10 |
| R290 | c r4 Witch Sly (d10->d8) | d8 = 6 |
| R291 | c r4 Witch Monster | d10 = 2 |
| R292 | b who is caught | d8 = 3 |
| R293 | b r1 ground | d6 = 3 |
| R294 | b r1 Mummy Wits (Ancient Lore) | d12 = 11 |
| R295 | b r1 Mummy Monster | d10 = 8 |
| R296 | b r2 ground | d6 = 1 |
| R297 | b r2 Mummy Wits (Ancient Lore overdrawn, +2) | d12 = 3 |
| R298 | b r2 Mummy Monster | d10 = 1 |
| R299 | b r3 ground | d6 = 5 |
| R300 | b r3 Mummy Wits (Ancient Lore overdrawn +2; Thread d12->d10) | d10 = 4 |
| R301 | b r3 Mummy Monster | d10 = 2 |
| R302 | d T5 Werewolf silversmith guard dog Nimble loud | d12 = 1 |
| R303 | d T5 Werewolf Mask | d6 = 4 |
| R304 | d T5 Werewolf chase r1 ground | d6 = 1 |
| R305 | d T5 Werewolf chase r1 Sly | d6 = 3 |
| R306 | d T5 Werewolf chase r1 Monster (Good Dog) | d10 = 8 |
| R307 | d T5 Werewolf chase r2 ground | d6 = 2 |
| R308 | d T5 Werewolf chase r2 Nimble | d12 = 12 |
| R309 | d T5 Werewolf chase r2 Monster | d10 = 4 |
| R310 | d T5 Werewolf chase r3 ground | d6 = 4 |
| R311 | d T5 Werewolf chase r3 Nimble (Hounds d10) | d10 = 1 |
| R312 | d T5 Werewolf chase r3 Monster | d10 = 9 |
| R313 | d T5 Werewolf chase r4 ground | d6 = 5 |
| R314 | d T5 Werewolf chase r4 Sly (d6 Hounds->d4) | d4 = 2 |
| R315 | d T5 Werewolf chase r4 Mask | d6 = 3 |
| R316 | d flight r1 ground | d6 = 3 |
| R317 | d flight r1 Werewolf Nimble | d12 = 11 |
| R318 | d flight r1 Werewolf Monster | d10 = 6 |
| R319 | d flight r1 Creature Brawn | d12 = 10 |
| R320 | d flight r1 Creature Monster | d10 = 7 |
| R321 | d flight r1 Ghost Nimble (d12 Cold Iron->d10) | d10 = 6 |
| R322 | d flight r1 Ghost Monster | d10 = 4 |
| R323 | d flight r1 IM Nimble (d8, Ghost's Chill->d10) | d10 = 5 |
| R324 | d flight r1 IM Monster | d10 = 8 |
| R325 | d flight r2 ground | d6 = 5 |
| R326 | d flight r2 Creature Brawn (Brute Force, last charge) | d12 = 10 |
| R327 | d flight r2 Creature Monster | d10 = 2 |
| R328 | d flight r2 Werewolf Brawn (Creature's Brute Force overdrawn, after his roll) | d10 = 10 |
| R329 | d flight r2 Werewolf Monster | d10 = 4 |
| R330 | d flight r2 Ghost Sly (d10 Cold Iron->d8) | d8 = 2 |
| R331 | d flight r2 Ghost Monster | d10 = 7 |
| R332 | d flight r2 IM Sly | d12 = 4 |
| R333 | d flight r2 IM Monster | d10 = 3 |
| R334 | d flight r3 ground | d6 = 2 |
| R335 | d flight r3 Werewolf Nimble (d12->d10) | d10 = 10 |
| R336 | d flight r3 Werewolf Monster | d10 = 9 |
| R337 | d flight r3 Creature Nimble (d8->d6) | d6 = 4 |
| R338 | d flight r3 Creature Monster | d10 = 6 |
| R339 | d flight r3 Ghost Nimble (d12->d10) | d10 = 4 |
| R340 | d flight r3 Ghost Monster | d10 = 1 |
| R341 | d flight r3 IM Sly (d12->d10) | d10 = 9 |
| R342 | d flight r3 IM Monster | d10 = 4 |
| R343 | f Ghost chase r1 ground | d6 = 1 |
| R344 | f Ghost chase r1 Sly (d10 Cold Iron d8, Chill d10) | d10 = 10 |
| R345 | f Ghost chase r1 Monster | d10 = 7 |
| R346 | f Ghost chase r2 ground | d6 = 6 |
| R347 | f Ghost chase r2 Wits (d6 Cold Iron->d4) | d4 = 1 |
| R348 | f Ghost chase r2 Mask | d6 = 2 |
| R349 | f Ghost chase r3 ground | d6 = 4 |
| R350 | f Ghost chase r3 Nimble (d12 Cold Iron->d10) | d10 = 3 |
| R351 | f Ghost chase r3 Mask | d6 = 5 |
| R352 | f2 Ghost chase r1 ground | d6 = 6 |
| R353 | f2 Ghost chase r1 Wits (d6 Cold Iron->d4) | d4 = 2 |
| R354 | f2 Ghost chase r1 Mask | d6 = 4 |
