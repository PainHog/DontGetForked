# PT7: Hard verification playtest after the PT6 fixes (Gallowsmere, a rolled Hard town, drills a–e)

## 1. What this is

A verification playtest of Hard difficulty under the current rules, after the PT6 fix round: **B6** (the Majority Rule: the shared Lead moves 2 when one side leads by two or more), **V2** (a switch ability works in a chase, in place of the ground's traits), **V4 / V11** (a piece of furniture raises Suspicion at the end of every Turn from when it is taken, even set down, until it is out of town, lost or abandoned for good), **V5** (Already Dead cornered in the round the Limit comes just joins the flight; otherwise the Ghost is back where it was caught), the overdraw rule (your Weakness is in play from your own next roll, even later the same round), and the PT6 wording fixes (a random Duty rerolls one already taken; opening an approach works at any obstacle).

**Rules source:** the rulebook text only: `book/src/chapters/11-ch01.html` to `17-ch07.html`, `31-ch08.html`, `32-ch09.html`, `40-entity-sheet.html` and `41-reference.html`, read as text (commit 0b6eff6 for the book; the book did not change while I played). Not the simulator, not `docs/`, not the Foundry code. Where the book is silent I made a ruling, listed it in section 4, and logged it as a finding in section 8.

**Dice:** every random result is a real `Math.random` roll, numbered R1 onward and listed in section 10. Drills say exactly what I chose at their start; every roll after that is real. The players played to win; the Storyteller played by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now").

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
