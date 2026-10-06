# PT4: full-book verification playtest (Standard 4, Hard 3, five drills)

## 1. What this is

The first playtest with **all real content**: the eight Entities as written, the Castle Duties, the town tables of Chapter 8 (Rolling a Town, the obstacle table, the ceiling, Lantern Night, the d66 shopping list, the furniture, the villagers), the chase table, the epilogue, and the balance-pass numbers (B1, B2).

**Rules source:** the rulebook text only, `book/src/chapters/11-ch01.html` to `17-ch07.html` and `31-ch08.html`, as of commit b6b391e (B2). Not the simulator, not the core-rules document, not the Foundry code. Where the book is silent I made a ruling, listed it in section 4, and logged it as a finding in section 8.

**The book changed during the playtest.** Commit e49ab78 (F13–F16) landed while drill B was running. It made Night Runner and Fear the Curse apply only "when you flee alone", made a shared local chase raise Suspicion once a round, made a captured carrier lose furniture too, and settled the Standard essentials ("on Standard, roll any die: odd, one; even, two"). None of it changes a result here: the Werewolf fled alone in the main line, and my d2 for the essentials (R7 = 1) reads the same under the new line ("odd, one"). Drills C, D and E were played against the new text.

**Dice:** every random result is a real `Math.random` roll, numbered R1–R535 and listed in section 10. Drills say exactly what I chose at their start; every roll after that is real. I played the players to win and the Storyteller by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now").

---

## 2. Summary

| Line | What it puts through the text | Result | Ended | Suspicion |
|---|---|---|---|---|
| **Main line**: Standard, 4 Entities | A full raid on a rolled town, played to win | **Win**: the tea service (essential), hinges, wine, etiquette book; the wedding cake missing. No furniture, nobody left behind | Limit on Turn 6; final flight escaped in round 5 | 12 of 12 |
| **Hard line**: Hard, 3 Entities | A full raid on a rolled town | **Bust**: the bacon only (the top hat, an essential, missing) | Limit on Turn 4; final flight escaped in round 4 | 15 of 15 |
| Drill A: carrying | A Bulky piece; its extra obstacle 2 harder; a Cost of "lose a Turn" on the opener; pick-up delayed; a two-Turn move; +1 at the end of a carried Turn; exit in the arrival Turn | Out with the armchair and the loot | Turn 8 | 6 |
| Drill A2: a Huge piece into the last Turn | Strong Back carrying alone; exit Trouble on Turn 12; the Limit ends the local chase in the round that cornered Dracula; a final flight with a carrier; two overdraws in one round | Escaped in flight round 10 with the clock | Turn 12 (Limit) | 12 |
| Drill B: Fetch | A final flight that starts at Lead 3; four Soon Weaknesses | Escaped in round **23** | — | Limit |
| Drill C: group checks | Four Entities roll one group obstacle in one Turn; Familiar's Warning; Out of Sight; four Monster dice in one check; a Cost swallowed by the check's single rise | Three past the way in; at the next group obstacle Dracula is caught alone and captured | Turn 4 | 7 |
| Drill D: capture, slip, rescue | Dracula held; two failed slips (one opened with Mesmerise); a rescue | Dracula freed | Turn 6 | 10 |
| Drill E: a dawn flight | Always and Soon in a flight that dawn started; Dawn timing (no Entity has it); a captive left behind | Escaped in round **26**; the Witch left behind | Dawn | 9 |

**Fix targets and where each was exercised**

| Target | Where | Rolls |
|---|---|---|
| B1: 5 items on Standard and Hard | Main (5 items, 1 essential), Hard (5 items, 2 essentials) | R7–R17, R150–R159 |
| B1: Standard Limit 12 | Main: reached on Turn 6 | R119 |
| B1: Hard way out Difficulty 10 | **Not rolled**: the Hard raid ended in the final flight on Turn 4 | — |
| B2: furniture's extra obstacle 2 harder (at most 12) | All three pieces: the mirror (main), the bed (Hard) and the armchair (drill A) rolled 10 and became 12 | R65, R180, R273 |
| B2: carrying: two-Turn moves, +1 at the end of each carried Turn | Drill A (+1, Turn 7); drill A2 (+1, Turn 11) | R275–R281 |
| B2: Fetch (final flight from Lead 3) | Drill B | R326–R440 |
| The eight Entities (dice, signatures, default Gifts and Perks, Weaknesses, Tells) | Jekyll & Hyde, the Mummy, the Werewolf, the Ghost (rolled lines); Dracula, the Creature, the Witch, the Invisible Man (drills) | throughout |
| Castle Duties (edge, clash reroll) | Mummy's clash (R5–R6); Duty raises at L1 (Ghost), L3 (Jekyll), L4 (Mummy), the hatter (Invisible Man) | R99, R105, R108, R111, R447 |
| Rolling a Town, obstacle table, ceiling, second-way-in reroll | Main, Hard, drill A | R18–R87, R160–R226, R271–R274 |
| Lantern Night, shopping d66, furniture table, villagers | Main, Hard; 8 villager faces | R18, R160; R91–R121, R231–R232, R276–R277 |
| Group check | Drill C (twice) | R444–R451 |
| Capture, slipping free, rescue | Main (Werewolf captured, slipped free); drills C and D (Dracula captured, two failed slips, rescued) | R100–R110, R452–R457 |
| The Limit during a local chase | Hard (the Ghost's second chase); drill A2 (Dracula) | R254, R285 |
| Weakness timing Always / Soon / Dawn | Always (Ghost, Dracula) and Soon (the other six) in every chase and flight; **Dawn cannot be tested: no Entity has it** | — |
| Epilogue lines | Main (Win), Hard (Bust) | — |

**Counts: 0 blockers, 6 major, 25 minor, 6 wording** (section 8).

---

## 3. Setup

### 3.1 Main line party (R1–R6)

d8 in the book's order (1 Dracula … 8 Jekyll & Hyde): R1 = 8, R2 = 3, R3 = 4, R4 = 6. Defaults for every pick (Gift, Perk, Duty). 3 charges each.

| Entity | Brawn | Nimble | Sly | Charm | Wits | Signature | Gift (default) | Perk (default) | Duty | Weakness |
|---|---|---|---|---|---|---|---|---|---|---|
| Jekyll & Hyde | d4 / d12 | d6 / d10 | d8 / d8 | d12 / d4 | d10 / d6 | The Draught | Doctor's Bag (raise) | Practised Hand | Librarian | A Familiar Face (Soon) |
| The Mummy | d10 | d4 | d6 | d8 | d12 | Ancient Lore (Wits instead) | Royal Bearing (open with Charm) | Patience of Ages | **Handyman** (R5 = 3 repeated Librarian; R6 = 5) | A Loose Thread (Soon) |
| The Werewolf | d10 | d12 | d6 | d4 | d8 | Good Dog (hidden Monster) | Keen Nose (Wits instead) | Night Runner | Gardener | Hounds (Soon) |
| The Ghost | d4 | d12 | d10 | d8 | d6 | Through the Wall (open with Sly) | Chill (raise) | Spectral | Butler | Cold Iron (Always) |

The Mummy's default Duty (Librarian) clashed with Jekyll & Hyde's, the first player picked. By "the second player picks another or rolls a d6 again", the Mummy rolled: R5 = 3 (Librarian again), R6 = 5 (Handyman).

### 3.2 Main line list and town (R7–R87)

Standard: 5 items. Essentials: R7 = 1 (a d2; see section 4, S1): **one essential**.

| Item | Kind (R) | Item (R) | Essential | Location (R) | Obstacles (R) |
|---|---|---|---|---|---|
| 1 | silver, china and linen (R8 = 4; Ghost's Duty) | a tea service (R9 = 2) | **yes** | L1 the silversmith (R19, d2 = 1) | 3 (R24 = 18) |
| 2 | food and drink (R10 = 1) | a cask of red wine (R11 = 3) | — | L2 the baker (R20 = 1) | 3 (R25 = 18) |
| 3 | books and paper (R12 = 3; Jekyll's Duty) | a book of etiquette (R13 = 6) | — | L3 the printer (R21 = 2) | 2 (R26 = 11) |
| 4 | tools and hardware (R14 = 5; Mummy's Duty) | hinges that creak properly (R15 = 3) | — | L4 the ironmonger (R22 = 2) | 2 (R27 = 9) |
| 5 | food and drink (R16 = 1) | the wedding cake in the baker's window (R17 = 6) | — | L5 the butcher (R23 = 2) | 3 (R28 = 20) |

A Win needs the tea service and three of the four extras. Lantern Night (R18 = 1): turnip lanterns in every window. Furniture (R29 = 2): **a gilt mirror (Bulky)** at L3 (R30, a d5 = 3; see S6).

| Location | Obstacle | Quiet / loud | Diff (d20) | Watched (d10) | Table (d20) |
|---|---|---|---|---|---|
| L1 silversmith | Way A: the shopkeeper behind the counter | Charm / Sly | 10 (R32 = 14) | yes (R33 = 2) | R31 = 13 |
| | Way B: a crowded shop floor (*group*) | Sly | 10 (R35 = 17) | yes (R36 = 5) | R34 = 11 |
| | 2: a high garden wall | Nimble / Brawn | 10 (R38 = 16) | yes (R39 = 4) | R37 = 5 |
| | 3: the shopkeeper behind the counter | Charm / Sly | 10 (R41 = 16) | yes (R42 = 3) | R40 = 13 |
| L2 baker | Way A: a tug-of-war across the lane (*group*) | Brawn | 10 (R44 = 15) | yes (R45 = 1) | R43 = 2 |
| | Way B: a dark, cluttered back room | Wits / Sly | 6 (R47 = 2) | yes (R48 = 4) | R46 = 18 |
| | 2: the night watchman on his round | Wits | 8 (R50 = 5) | no (R51 = 7) | R49 = 19 |
| | 3: a cart blocking the alley | Brawn / Nimble | 8 (R53 = 9) | no (R54 = 9) | R52 = 3 |
| L3 printer | Way A: a bolted back gate | Brawn / Charm | 8 (R56 = 10) | no (R57 = 9) | R55 = 4 |
| | Way B: a muddy yard full of geese | Sly / Nimble | 8 (R59 = 10) | no (R60 = 7) | R58 = 12 |
| | 2: a nosy neighbour at her window | Sly / Wits | 10 (R62 = 16) | no (R63 = 6) | R61 = 10 |
| | Furniture: the shopkeeper behind the counter | Charm / Sly | 10 + 2 = **12** (R65 = 15) | no (R66 = 10) | R64 = 13 |
| L4 ironmonger | Way A: a bolted back gate | Brawn / Charm | 10 (R68 = 18) | yes (R69 = 1) | R67 = 4 |
| | Way B: a rickety drainpipe | Nimble | 10 (R71 = 19) | yes (R72 = 5) | R70 = 8 |
| | 2: a nosy neighbour at her window | Sly / Wits | 8 (R74 = 5) | yes (R75 = 5) | R73 = 10 |
| L5 butcher | Way A: a locked strongbox | Wits / Charm | 8 (R77 = 13) | no (R78 = 8) | R76 = 17 |
| | Way B: a high garden wall | Nimble / Brawn | 8 (R80 = 6) | yes (R81 = 4) | R79 = 5 |
| | 2: the night watchman on his round | Wits | 8 (R83 = 5) | no (R84 = 10) | R82 = 19 |
| | 3: the shopkeeper behind the counter | Charm / Sly | 8 (R86 = 8) | yes (R87 = 3) | R85 = 13 |

Watched locations: L1, L2, L4, L5 (plus the way out and the lock-up). L3 has no watched obstacle. Ceiling: no natural 12 was rolled; the mirror's obstacle is the town's only 12. Mix of the 18 non-furniture obstacles: one 6, nine 8, eight 10, no 12 (6 / 50 / 44 / 0%, against 15 / 50 / 30 / 5%): harder than average.

Fixed parts (Standard): way out Difficulty 8 (Sly or Nimble, or Brawn loud, watched); lock-up 10; local chase Lead 1 → 4 against 10 + half Suspicion (at most 12); final flight Lead 2 → 6 against 11; Limit 12; 12 Turns.

### 3.3 Hard line party, list and town (R147–R226)

d8: R147 = 8, R148 = 6, R149 = 4: **Jekyll & Hyde, the Ghost, the Werewolf** (as in 3.1; default Duties Librarian, Butler, Gardener don't clash). 3 charges each.

| Item | Kind (R) | Item (R) | Essential | Location (R) | Obstacles (R) |
|---|---|---|---|---|---|
| 1 | food and drink (R150 = 1) | a side of bacon (R151 = 2) | **yes** | L1 the butcher (R161 = 2) | 1 (R166 = 3) |
| 2 | cloth and costumes (R152 = 6) | a top hat (R153 = 3) | **yes** | L2 the draper (R162 = 1) | 3 (R167 = 15) |
| 3 | tools and hardware (R154 = 5) | a lamp and a can of oil (R155 = 4) | — | L3 the carpenter (R163 = 3) | 2 (R168 = 5) |
| 4 | plants and seeds (R156 = 2; Werewolf's Duty) | turnip seed (R157 = 4) | — | L4 the seed merchant (R164 = 3) | 3 (R169 = 14) |
| 5 | food and drink (R158 = 1) | a jar of honey (R159 = 5) | — | L5 the butcher **again** (R165 = 2) | 2 (R170 = 7) |

Lantern Night (R160 = 5): a bonfire, and a straw monster burned at dawn. Furniture (R171 = 6): **a four-poster bed (Huge)** at L1 (R172, d5 = 1). Only the Werewolf's Duty matches an item.

| Location | Obstacle | Quiet / loud | Diff (d20) | Watched (d10) | Table (d20) |
|---|---|---|---|---|---|
| L1 butcher | Way A: a guard dog | Charm / Nimble | 8 (R174 = 5) | yes (R175 = 4) | R173 = 14 |
| | Way B: a locked front door | Sly / Brawn | 8 (R177 = 6) | yes (R178 = 1) | R176 = 15 and R224 = 15 (doorman: quiet Charm again), R226 = 9 |
| | Furniture: a doorman checking invitations | Charm / Wits | 10 + 2 = **12** (R180 = 9) | yes (R181 = 3) | R179 = 15 |
| L2 draper | Way A: children in costumes (*group*) | Charm | 8 (R183 = 1) | yes (R184 = 5) | R182 = 16 |
| | Way B: a maze of festival stalls (*group*) | Wits | 8 (R186 = 6) | no (R187 = 8) | R185 = 20 |
| | 2: a nosy neighbour at her window | Sly / Wits | **12** (R189 = 19) | yes (R190 = 1) | R188 = 10 |
| | 3: a rickety drainpipe | Nimble | 8 (R192 = 3) | yes (R193 = 1) | R191 = 8 |
| L3 carpenter | Way A: a high garden wall | Nimble / Brawn | 8 (R195 = 4) | no (R196 = 8) | R194 = 5 |
| | Way B: children in costumes (*group*) | Charm | 10 (R198 = 11) | yes (R199 = 1) | R197 = 16 |
| | 2: a cart blocking the alley | Brawn / Nimble | 10 (R201 = 11) | yes (R202 = 1) | R200 = 3 |
| L4 seed merchant | Way A: a locked strongbox | Wits / Charm | 10 (R204 = 17) | no (R205 = 9) | R203 = 17 |
| | Way B: a locked front door | Sly / Brawn | 8 (R207 = 2) | yes (R208 = 1) | R206 = 9 |
| | 2: a maze of festival stalls (*group*) | Wits | 8 (R210 = 5) | no (R211 = 8) | R209 = 20 |
| | 3: a crowded shop floor (*group*) | Sly | 8 (R213 = 3) | no (R214 = 8) | R212 = 11 |
| L5 butcher | Way A: a doorman checking invitations | Charm / Wits | 8 (R216 = 1) | no (R217 = 8) | R215 = 15 |
| | Way B: the rooftops (*group*) | Nimble | 10 (R219 = 13) | no (R220 = 7) | R218 = 13 (shopkeeper: quiet Charm again), R225 = 7 |
| | 2: a heavy cellar trapdoor | Brawn | 8 (R222 = 2) | yes (R223 = 6) | R221 = 1 |

Every Hard location is watched. Ceiling: two 12s (L2 ob2 and the bed), within the Hard cap either way. Mix of the 16 non-furniture obstacles: eleven 8, four 10, one 12 (69 / 25 / 6%, against 40 / 45 / 15%): easier than average.

Fixed parts (Hard): way out 10; lock-up 12; final flight 11; Limit 15.

---

## 4. Standing readings (my rulings where the book is silent; each is a finding in section 8)

| # | Reading | Finding |
|---|---|---|
| S1 | Standard essentials: rolled a d2 (the book now says odd one, even two; same result). | resolved by e49ab78 |
| S2 | A repeated *item* is rerolled; two items may share a kind. | m16 |
| S3 | The Butler's row lists two places, so a d2 picks one. | m17 |
| S4 | Two items rolled at the same place make two locations. | m18 |
| S5 | For the second way in, only the obstacle table is rerolled; its Difficulty and watched rolls stand. | m19 |
| S6 | The furniture's location is rolled (a d5 over the list's locations). | m14 |
| S7 | The furniture's +2 goes on its rolled Difficulty, and the result counts toward the ceiling (never mattered). | m15 |
| S8 | No entrance in a rolled town is small. | M6 |
| S9 | Jekyll & Hyde starts as Jekyll. The Draught (and the free change back from Practised Hand) is used before a roll, like any ability, and takes no action. | M5 |
| S10 | Spectral's pass uses the Ghost's action for that Turn. | m7 |
| S11 | An Entity may spend its Turn doing nothing. | m23 |
| S12 | The lock-up's Tell check is made when the first captive is brought in. | m8 |
| S13 | The way out's Tell check is made when someone first comes back to it, not at the start. | m9 |
| S14 | A clashing Duty's reroll avoids every Duty another party member holds by default. | m24 |
| S15 | Hedge Spell follows Chapter 6 in a local chase (own roll only). | m21 |
| S16 | In the final flight a Critical counts as two Successes, and the Lead moves at most 1 a round. | w32 |
| S17 | Overdraw is allowed any number of times until your Weakness is actually in play (the literal text). | M1 |
| S18 | Helping another Entity's roll with a "use the ability's trait" or "open" ability: avoided, because the book doesn't say whose die rolls or who gets through. | M4 |
| S19 | Getting to the lock-up is one move; a freed or rescued Entity stands at the lock-up. | m26 |
| S20 | Taking a piece can wait until the carrier starts moving; only the Entity who opened an obstacle may take the piece behind it. Carrying Suspicion is once per piece, and there's none for the Turn the party leaves town. | m10–m13 |
| S21 | A Suspicion +1 Cost on a roll inside a group check would be swallowed by the check's single rise, so it "costs nothing right then" and the Storyteller picks another Cost. | m30 |

---

## 5. Play log: main line (Standard, 4 Entities)

Notation: trait die + second die = total vs Difficulty → result. "Shows" = the Monster die beat the trait die. Sus = Suspicion after the roll.

**Plan.** Split four ways on Turn 1: the Ghost to L1 (the essential, its Butler Duty, and a group way in it passes by Spectral); Jekyll to L3 (its Librarian Duty, nothing watched); the Werewolf to L2; the Mummy to L4 (its Handyman Duty), then L5.

**Turn 1 (Sus 0).** Everyone moves in. Tell checks at the three watched locations reached:

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R88 | L1 (Ghost) | 6 | Cold Spot: candles gutter in the silversmith's | 1 |
| R89 | L2 (Werewolf) | 4 | Eyebrows That Meet | 2 |
| R90 | L4 (Mummy) | 4 | Dust and Spice | 3 |

Three Tells on Turn 1: a quarter of the Limit before a single roll.

**Turn 2 (Sus 3).**

| Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|
| — | Ghost, L1 way B (crowded shop floor, group, watched) | Spectral: past without rolling (uses its action, S10). Face: a gang of children looking for a lost cat (R91 = 3, R92 = 1) | — | — | past | 3 |
| R93 | Jekyll, L3 way B (geese, Sly 8, unwatched) | Sly d8 → d10 by Duty, Mask (65% Success). Monster would risk +2 and a free Hyde | 3 + 1 | 4 vs 8 | **Trouble** (unwatched: no chase) | 4 |
| R96 | Werewolf, L2 way B (back room, Wits 6, watched) | Wits d8 + Mask: 79% Success, 6% Trouble; Good Dog only cuts Trouble to 4%, so the charge is saved. Face: the mayor practising the bells (R94 = 5, R95 = 6) | 1 + 2 | 3 vs 6 | **Trouble**, caught | 5 |
| R99 | Mummy, L4 way B (drainpipe, Nimble 10, watched) | Royal Bearing opens with Charm (not listed) at 8; Charm d8 → d10 by Duty, Mask (charge 3 → 2). Face: Old Granny Mott with a lantern and a pitchfork (R97 = 6, R98 = 4) | 6 + 5 | 11 vs 8 | Success | 5 |

**The Werewolf's local chase** (fleeing alone; Night Runner: Lead 2, escape 4; mob 10 + 2 = 12):

| Round | Ground | Roll | Dice | Total vs 12 | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R100 = 2 back alleys | R101 Nimble d12 + Monster under Good Dog (3 → 2) | 1 + 6 (shows, hidden) | 7 | Trouble | 1 | 6 |
| 2 | R102 = 4 rooftops | R103 the same (2 → 1) | 2 + 1 | 3 | Trouble | **0: captured** | 7 |

It carried nothing. Lock-up Tell check as it is brought in (S12): R104 = 6, Eyebrows That Meet again: Sus 8.

**Turn 3 (Sus 8).**

| Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|
| R105 | Mummy, L4 ob2 (nosy neighbour, Sly / Wits loud, 8, watched; last) | Royal Bearing again, Charm d10 by Duty at 6, Mask (2 → 1): 83% Success | 1 + 6 | 7 vs 6 | Success: **hinges in hand** | 8 |
| R108 | Ghost, L1 ob2 (garden wall, Nimble / Brawn loud, 10, watched) | Through the Wall opens with Sly at 8; Sly d10 → d12 by Duty, Mask (3 → 2): 71% vs 54% for Nimble d12. Face: the vicar judging the costume contest (R106 = 4, R107 = 3) | 2 + 6 | 8 vs 8 | Success | 8 |
| R109 | Jekyll, L3 way B again | Same as R93 | 9 + 2 | 11 vs 8 | Success | 8 |
| R110 | Werewolf slips free (first Turn after capture) | Nimble d12 + Monster under Good Dog (1 → 0) vs 10 | 5 + 6 (shows, hidden) | 11 vs 10 | Success: **free** | 8 |

**Turn 4 (Sus 8).** The Mummy and the Werewolf move to L2 (its Tell is already checked).

| Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|
| R111 | Ghost, L1 ob3 (shopkeeper, Charm / Sly loud, 10, watched; last) | Charm d8 → d10 by Duty, Mask (65% to get past, no loud +1). Sly can't be opened (listed); Chill can't add to the Duty raise | 4 + 4 | 8 vs 10 | **Cost**: **tea service in hand**. Cost: Suspicion +1 ("near the Limit"; it carries nothing else to drop). Face: a gang of children practising the bells (R113 = 3, R114 = 6) | 9 |
| R112 | Jekyll, L3 ob2 (nosy neighbour, Sly / Wits loud, 10, unwatched; last) | Sly d10 by Duty + Mask | 2 + 5 | 7 vs 10 | **Trouble** | 10 |

**Turn 5 (Sus 10).** The Ghost moves L1 → L3 (unwatched, no Tell) to try L3 ob2 with a raise. Jekyll and the Werewolf wait (S11).

| Roll | Who / where | Dice | Total | Result | Sus |
|---|---|---|---|---|---|
| R115 | Mummy, L2 way B (Wits d12 + Mask vs 6) | 2 + 4 | 6 | Success | 10 |

**Turn 6 (Sus 10).** At 10 of 12 any Cost (the Storyteller will pick Suspicion) or Trouble moves toward the hunt. But a final flight brings home whatever is carried, so the party grabs loot, best odds first.

| Roll | Who / where | Choice | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|
| R116 | Mummy, L2 ob2 (watchman, Wits 8, unwatched) | Wits d12 + Mask | 9 + 2 | 11 vs 8 | Success | 10 |
| R117 | Ghost, L3 ob2 (Sly 10) | Sly d10 → d12 by Jekyll's Doctor's Bag (J&H 3 → 2), Mask | 2 + 2 | 4 vs 10 | **Trouble** (doubles, but no Success, so no Critical) | 11 |
| R118 | Werewolf, L2 ob3 (cart, Brawn / Nimble loud, 8, unwatched; last) | Brawn d10 + Mask (no charges; Nimble is loud) | 10 + 1 | 11 vs 8 | Success: **wine in hand** | 11 |
| R119 | Jekyll, L3 ob2 | Sly d10 by Duty + Mask: a Success or a Cost wins the book | 3 + 6 | 9 vs 10 | **Cost**: **etiquette book in hand**. Cost: Suspicion +1. Jekyll holds nothing else to drop, a lost Turn barely bites with six Turns left, and the advice is "Suspicion +1 near the Limit". Face: the baker's wife with a lantern and a pitchfork (R120 = 1, R121 = 4) | **12: the Limit** |

**Final flight** (Lead 2, escape 6, mob 11; the Mask is off; Cold Iron from round 1; Soon from round 3). Charges at the start: Ghost 2, J&H 2, Mummy 1, Werewolf 0.

| Round | Ground | Ghost | Jekyll / Hyde | Mummy | Werewolf | S / T | Lead |
|---|---|---|---|---|---|---|---|
| 1 | R122 = 5 parade (Charm, Sly) | R123 Sly d10 (Cold Iron −1, Chill +1; 2 → 1): 2 + 7 = 9, Cost | R124 Jekyll Charm d12: 10 + 9 = 19, Success (Monster lower: stays Jekyll) | R125 Wits d12 by Ancient Lore (1 → 0): 6 + 2 = 8, Trouble | R126 Sly d6: 4 + 6 = 10, Cost | 1 / 1 | 2 |
| 2 | R127 = 3 market stalls (Brawn, Nimble) | R128 Nimble d12 (−1, Chill +1; 1 → 0): 1 + 9 = 10, Cost | R129 Draught to Hyde (2 → 1), Brawn d12: 3 + 6 = 9, Cost | R130 Wits d12 by **overdrawn** Ancient Lore (Weakness from his next roll, round 3, when Soon brings it anyway): 10 + 6 = 16, Success | R131 Nimble d12: 3 + 8 = 11, Success | 2 / 0 | 3 |
| 3 | R132 = 5 parade | R133 Sly d8 (Cold Iron): 5 + 9 = 14, Success | R134 back to Jekyll free (Practised Hand), Charm d10 (Familiar Face): 3 + 6 = 9, Cost; the Monster showed: **Hyde takes over** | R135 Charm d8 (Loose Thread −1, J&H's Doctor's Bag +1; 1 → 0): 5 + 6 = 11, Success | R136 Sly d4 (Hounds): 3 + 2 = 5, Trouble | 2 / 1 | 4 |
| 4 | R137 = 6 dead end (Brawn, Wits) | R138 Brawn d4 (the step down is lost): 2 + 5 = 7, Trouble | R139 Hyde Brawn d10: 10 + 8 = 18, Success | R140 Wits d10: 3 + 7 = 10, Cost | R141 Brawn d8: 6 + 8 = 14, Success | 2 / 1 | 5 |
| 5 | R142 = 2 back alleys (Nimble, Sly) | R143 Nimble d10: 5 + 10 = 15, Success | R144 Hyde Nimble d8: 8 + 10 = 18, Success | R145 Sly d4: 2 + 8 = 10, Cost | R146 Nimble d10: 5 + 1 = 6, Trouble | 2 / 1 | **6: escaped** |

**How the Year Went.** Home: the tea service (essential), the hinges, the wine, the etiquette book. Missing: the wedding cake (one extra). Nobody left behind, no furniture. **Win.**

> *Full larders, warm fires. The castle creaks happily through another year.*
> Missing food and drink: *Turnip soup every night until spring.* (Read because the cake didn't come home, though the wine did; it sits oddly beside "Full larders", m16.)

Where the 12 Suspicion came from: Tells 4 (L1, L2, L4, the lock-up: four checks, four Tells), Trouble 6 (Jekyll twice, the Werewolf's catch and both chase rounds, the Ghost once), Costs chosen as Suspicion 2. Time never mattered: the party used 6 of 12 Turns.

---

## 6. Play log: Hard line (3 Entities)

**Plan.** Jekyll takes the bacon (L1: one obstacle, the guard dog, Charm d12 vs 8). The Ghost goes for the top hat (L2: the group way B by Spectral, then a Difficulty-12 watched nosy neighbour). The Werewolf goes along so Good Dog can cover the Ghost's Monster die there.

**Turn 1 (Sus 0).** Tell checks: L1 R227 = 4, Jekyll's Wrong Hand: Sus 1. L2 R228 = 3, nothing (the d2 for whose, R229, unused).

**Turn 2.** R230: Jekyll, L1 way A, Charm d12 + Mask: 10 + 4 = 14 vs 8, Success: **the bacon (essential) in hand**. The Ghost passes L2 way B (Spectral); the Werewolf waits at L2.

**Turn 3.** R233: the Ghost at L2 ob2 (Sly / Wits loud, 12, watched): Sly d10 → d12 by its own Chill (3 → 2), Monster under the Werewolf's Good Dog (3 → 2). Face: the night watchman with a lantern and a pitchfork (R231 = 2, R232 = 4). 2 + 4 = 6: **Trouble**, caught. Sus 2.

**The Ghost's first local chase** (Lead 1, escape 4; Cold Iron from round 1; mob 11 from Suspicion 2–3, then 12):

| Round | Ground | Roll and choice | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R234 = 4 rooftops | R235 Nimble d12 (−1, Chill +1; 2 → 1) + Monster | 6 + 5 | 11 vs 11 | Success | 2 | 2 |
| 2 | R236 = 1 square | R237 Sly d10 (−1, Chill +1; 1 → 0) + Monster | 5 + 1 | 6 vs 11 | Trouble | 1 | 3 |
| 3 | R238 = 2 alleys | R239 Nimble d12 (overdrawn Chill) + Monster; the overdraw's +2 also covers a showing Monster (one roll, one rise) | 10 + 1 | 11 vs 11 | Success | 2 | 5 |
| 4 | R240 = 3 stalls | R241 Nimble d10 + Monster | 2 + 10 (shows) | 12 vs 12 | Success | 3 | 7 |
| 5 | R242 = 3 stalls | R243 the same | 2 + 9 (shows) | 11 vs 12 | Cost | 3 | 9 |
| 6 | R244 = 6 dead end | R245 Wits d6 (overdrawn Chill; a d4 would show the Monster three times in four anyway) + Monster | 5 + 4 | 9 vs 12 | Trouble | 2 | 11 |
| 7 | R246 = 1 square | R247 Sly d10 (overdrawn Chill) + Monster | 6 + 9 | 15 vs 12 | Success | 3 | 13 |
| 8 | R248 = 4 rooftops | R249 Nimble d10 + **Mask** (a showing Monster would reach the Limit) | 10 + 5 | 15 vs 12 | Success | **4: escaped** | 13 |

One Trouble at a Difficulty-12 watched obstacle took Suspicion from 1 to 13 of 15 in a single Turn. The rest of Turn 3: Jekyll moves L1 → L2 to add his raise; the Werewolf waits.

**Turn 4 (Sus 13).** R250: the Ghost tries L2 ob2 again: Sly d12 by Jekyll's Doctor's Bag (J&H 3 → 2), Monster under Good Dog (WW 2 → 1). 3 + 5 = 8 vs 12: **Trouble**, caught again. Sus 14.

**Second chase** (Lead 1, mob 12). Any Trouble now reaches the Limit, and the Limit ends the chase "even if the same round cornered you", so capture is impossible.

| Round | Ground | Roll | Dice | Total | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R251 = 4 rooftops | R252 Nimble d10 + Mask | 7 + 3 | 10 vs 12 | Cost | 1 | 14 |
| 2 | R253 = 6 dead end | R254 Wits d4 + Mask (12 can't be reached; Cost at best) | 4 + 3 | 7 vs 12 | Trouble | 0, but **the Limit (15)**: the chase ends and the Ghost joins the flight | 15 |

**Final flight on Turn 4** (Lead 2, escape 6, mob 11). Charges: Ghost 0 (may not overdraw: Cold Iron is in play), J&H 2, Werewolf 1.

| Round | Ground | Ghost | Jekyll / Hyde | Werewolf | S / T | Lead |
|---|---|---|---|---|---|---|
| 1 | R255 = 4 rooftops | R256 Nimble d12 (−1, Doctor's Bag +1; J&H 2 → 1): 3 + 8 = 11, Success | R257 Jekyll Wits d10: 5 + 10 = 15, Success; Hyde takes over | R258 Nimble d12: 10 + 10 = 20, **Critical** (two Successes) | 4 / 0 | 3 |
| 2 | R259 = 1 square | R260 Sly d10 (−1, Doctor's Bag +1; J&H 1 → 0): 4 + 7 = 11, Success | R261 back to Jekyll free, Charm d12: 8 + 9 = 17, Success; Hyde again | R262 Keen Nose for Wits (its last charge, 1 → 0) d8, raised to d10 by J&H's **overdrawn** Doctor's Bag (free: J&H's Weakness arrives in round 3 anyway): 6 + 8 = 14, Success | 3 / 0 | 4 |
| 3 | R263 = 1 square | R264 Sly d8: 7 + 4 = 11, Success | R265 back to Jekyll, Charm d10: 7 + 8 = 15, Success; Hyde again | R266 Sly d4: 4 + 10 = 14, Success | 3 / 0 | 5 |
| 4 | R267 = 4 rooftops | R268 Nimble d10: 10 + 6 = 16, Success | R269 Hyde Nimble d8: 8 + 6 = 14, Success | R270 Nimble d10: 9 + 1 = 10, Cost | 2 / 0 | **6: escaped** |

**How the Year Went.** Home: the bacon only. The top hat (essential) is missing, so it's at best a Partial, and 1 of 5 is less than half: **Bust**.

> *A long, thin year, and a lot of arguing about whose fault it was.*
> Cloth and costumes: *Next year's disguises are held together with string and hope.* Tools and hardware: *Every door in the castle creaks, sticks or falls off.* Plants and seeds: *Nothing grows but nettles, and the nettles win.* Food and drink (the honey): *Turnip soup every night until spring.*

The raid was decided by one roll on Turn 3 (R233). After that came ten chase rounds for one player while the other two waited, and a Bust before a third of the night had gone.

---

## 7. Play log: drills

### 7.1 Drill A: carrying furniture (book at b6b391e)

**Chosen start.** A Standard raid at the start of Turn 5, Suspicion 4. The party: Frankenstein's Creature (Strong Back, Handyman, 3 charges), Dracula (Hypnotic Eyes, Butler, 2 charges), the Witch (Familiar's Warning, Cook, 2 charges). All at the smithy, whose loot (a box of nails) the Creature holds; Dracula holds the silver spoons, the Witch a wheel of cheese. The way out is one move away; its Tell check hasn't been made. Every roll from here is real.

- R271 = 1: **a wingback armchair (Bulky)**. Its obstacle: R272 = 15, a doorman checking invitations (Charm / Wits loud); R273 = 19 → 10, +2 = **12**; R274 = 1, watched.
- **Turn 5.** R275: the Witch opens it with Broomstick (Sly isn't listed) and raises herself with Hedge Spell: Sly d12 + Mask vs 12 − 2 = 10 (2 → 0). That's 71% to get past, against Dracula's 70% on Charm with the Monster die, which risks showing. 7 + 1 = 8: **Cost**. She's past (alone, S20). Storyteller's Cost: **lose a Turn**; for someone about to carry furniture, an idle Turn usually means another +1. Face: the mayor judging the costume contest stops to admire her hat (R276 = 5, R277 = 3).
- **Turn 6.** The Witch skips her action. She hasn't taken the armchair ("Taking a piece is free", so it can wait), so no carrying Suspicion. Sus 4.
- **Turn 7.** The Witch takes the armchair (free) and starts the two-Turn move. Dracula and the Creature move to the way out in one Turn. Tell check R278 = 4, whose R279 = 2: the Creature's Head and Shoulders, Sus 5. **End of Turn 7: the Witch is carrying, +1: Sus 6.**
- **Turn 8.** The Witch's move completes at the way out. R280: Dracula rolls the way out for everyone, Nimble d10 + Mask vs 8: 5 + 1 = 6, **Cost**: everyone leaves "with nothing more to pay". No end-of-Turn rise, since they're out of town (S20).

**What it shows.** The new rule worked as written, but its cost can be held to **+1** with two ordinary moves. The carrier leaves the piece until the Turn it sets off, and someone waits at the way out to roll in the arrival Turn (m12).

### 7.2 Drill A2: a Huge piece into the last Turn

**Chosen start.** A Standard raid at the start of Turn 11, Suspicion 8. The Creature (Strong Back, 2 charges) is at the carpenter with a grandfather clock (Huge), its extra obstacle already beaten. Dracula (1 charge, carrying the spoons) and the Witch (1 charge) are at the way out, whose Tell check is done.

- **Turn 11.** The Creature takes the clock alone (Strong Back) and starts the two-Turn move. End of Turn 11: +1, Sus 9.
- **Turn 12.** The Creature arrives. R281: Dracula, Nimble d10 + Mask vs 8: 1 + 1 = 2, **Trouble** (doubles, no Success), caught. Sus 10. Is the way out a "small entrance" for the clock? The book never says (S8, M6).
- **Dracula's local chase** (Lead 1, mob 12, Garlic from round 1). R282 = 5 parade: R283 Charm d10 + Monster (Hypnotic Eyes) 7 + 4 = 11 vs 12, Cost, Lead 1. (The Witch's Hedge Spell says "hers or a friend's", but Chapter 6 says abilities help only your own roll in a local chase; I followed Chapter 6, S15.) R284 = 5 parade: R285 1 + 5 = 6, **Trouble**, Lead 0: cornered. But his Monster beat his die by 4, so it shows, +2: Sus 12, **the Limit**. The chase ends "even if the same round cornered you". Dracula isn't captured: **the Monster showing saved him** (m29).
- **Final flight on Turn 12**, started by the Limit, not dawn. Lead 2, mob 11. The Creature carries the clock throughout (Nimble one size smaller).

| Round | Ground | Creature (carrying) | Dracula (Garlic) | Witch | S / T | Lead |
|---|---|---|---|---|---|---|
| 1 | R286 = 3 stalls | R287 Brawn d12: 7 + 9 = 16 S | R288 Nimble d10 (−1, Witch's Hedge Spell +1; 1 → 0): 10 + 1 = 11 S | R289 Brawn d6: 6 + 5 = 11 S | 3 / 0 | 3 |
| 2 | R290 = 3 stalls | R291 Brawn d12: 3 + 4 = 7 T | R292 Nimble d10 (Witch's **overdrawn** Hedge Spell): 2 + 8 = 10 C | R293 Brawn d8 (Witch's **second** overdrawn Hedge Spell, the same round): 4 + 2 = 6 T | 0 / 2 | 2 |
| 3 | R294 = 4 rooftops | R295 Brute Force for Brawn d12, Fire −1 = d10 (2 → 1): 1 + 6 = 7 T | R296 Nimble d8: 7 + 8 = 15 S | R297 Wits d10 (Rowan): 1 + 9 = 10 C | 1 / 1 | 2 |
| 4 | R298 = 6 dead end | R299 Brawn d10: 5 + 10 = 15 S | R300 Bat for Nimble d8 (1 → 0): 8 + 6 = 14 S | R301 Wits d10: 8 + 3 = 11 S | 3 / 0 | 3 |
| 5 | R302 = 2 alleys | R303 Brute Force, Brawn d10 (1 → 0): 8 + 9 = 17 S | R304 Nimble d8: 5 + 7 = 12 S | R305 Sly d8: 6 + 10 = 16 S | 3 / 0 | 4 |
| 6 | R306 = 6 dead end | R307 Brawn d10: 10 + 8 = 18 S | R308 Brawn d6: 2 + 6 = 8 T | R309 Wits d10: 4 + 5 = 9 C | 1 / 1 | 4 |
| 7 | R310 = 3 stalls | R311 Brawn d10: 10 + 9 = 19 S | R312 Nimble d8: 7 + 3 = 10 C | R313 Brawn d4: 1 + 9 = 10 C | 1 / 0 | 5 |
| 8 | R314 = 6 dead end | R315 Brawn d10: 9 + 7 = 16 S | R316 Brawn d6: 2 + 4 = 6 T | R317 Wits d10: 5 + 3 = 8 T | 1 / 2 | 4 |
| 9 | R318 = 6 dead end | R319 Brawn d10: 2 + 5 = 7 T | R320 Brawn d6: 5 + 10 = 15 S | R321 Wits d10: 5 + 6 = 11 S | 2 / 1 | 5 |
| 10 | R322 = 6 dead end | R323 Brawn d10: 6 + 6 = 12, **Critical** | R324 Brawn d6: 4 + 4 = 8 T (doubles, no Success) | R325 Wits d10: 10 + 8 = 18 S | 3 / 1 | **6: escaped** |

Home with the clock and the loot. The Huge piece came home through the flight without passing any entrance.

### 7.3 Drill B: the final flight with Fetch (book at b6b391e for the start; e49ab78 landed during it, with no effect here)

**Chosen start.** A Standard raid. On Turn 9 Suspicion reaches the Limit (12); nobody is captured. Fleeing: the Werewolf (Perk **Fetch**, Keen Nose, 2 charges), the Invisible Man (defaults, 1 charge), the Mummy (defaults, 1 charge), Frankenstein's Creature (defaults, 2 charges). All four Weaknesses are Soon. Fetch: **Lead 3**, escape 6, mob 11.

Abilities spent: R327 Keen Nose (WW 2 → 1); R329 Ancient Lore (Mummy 1 → 0); R330 Brute Force (Creature 2 → 1); round 2: R334 the Mummy's free overdraw of Ancient Lore, R335 Brute Force (Creature 1 → 0); R337 Keen Nose (WW 1 → 0). The Invisible Man's charge was never usable: Through the Gap opens, which is never allowed in a chase, and Unseen is pointless once Suspicion has stopped.

| Round | Ground | Werewolf | Invisible Man | Mummy | Creature | S / T | Lead |
|---|---|---|---|---|---|---|---|
| start | | | | | | | **3** |
| 1 | R326 = 5 parade | R327 Wits d8: 7 + 7 = 14 **Crit** | R328 Sly d12: 5 + 6 = 11 S | R329 Wits d12: 7 + 6 = 13 S | R330 Brawn d12: 2 + 1 = 3 T | 4 / 1 | 4 |
| 2 | R331 = 2 alleys | R332 Nimble d12: 2 + 5 = 7 T | R333 Sly d12: 8 + 7 = 15 S | R334 Wits d12: 5 + 1 = 6 T | R335 Brawn d12: 2 + 10 = 12 S | 2 / 2 | 4 |
| 3 | R336 = 5 parade | R337 Wits d6: 2 + 6 = 8 T | R338 Sly d10: 2 + 3 = 5 T | R339 Charm d6: 3 + 6 = 9 C | R340 Sly d4: 4 + 3 = 7 T | 0 / 3 | 3 |
| 4 | R341 = 1 square | R342 Sly d4: 4 + 10 = 14 S | R343 Sly d10: 9 + 10 = 19 S | R344 Charm d6: 5 + 6 = 11 S | R345 Sly d4: 3 + 8 = 11 S | 4 / 0 | 4 |
| 5 | R346 = 2 alleys | R347 Nimble d10: 19 S | R348 Sly d10: 19 S | R349 Sly d4: 12 S | R350 Nimble d6: 11 S | 4 / 0 | 5 |
| 6 | R351 = 4 rooftops | R352 Nimble d10: 12 S | R353 Wits d8: 9 C | R354 Wits d10: 8 T | R355 Wits d8: 6 T | 1 / 2 | 4 |
| 7 | R356 = 2 alleys | R357: 10 C | R358: 5 T | R359: 11 S | R360: 2 T | 1 / 2 | 3 |
| 8 | R361 = 2 alleys | R362: 10 C | R363: 17 S | R364: 10 C | R365 Nimble d6: 6 + 6 = 12 **Crit** | 3 / 0 | 4 |
| 9 | R366 = 5 parade | R367: 12 S | R368: 10 C | R369: 8 T | R370: 8 T | 1 / 2 | 3 |
| 10 | R371 = 3 stalls | R372 Nimble d10: 7 T | R373 Nimble d6: 8 T | R374 Brawn d8: 11 S | R375 Brawn d10: 7 T | 1 / 3 | 2 |
| 11 | R376 = 2 alleys | R377: 13 S | R378: 10 C | R379: 8 T | R380: 14 S | 2 / 1 | 3 |
| 12 | R381 = 2 alleys | R382: 8 + 8 = 16 **Crit** | R383: 11 S | R384: 6 T | R385: 13 S | 4 / 1 | 4 |
| 13 | R386 = 4 rooftops | R387: 14 S | R388: 14 S | R389: 13 S | R390: 9 C | 3 / 0 | 5 |
| 14 | R391 = 1 square | R392: 12 S | R393: 8 T | R394: 6 T | R395: 6 T | 1 / 3 | 4 |
| 15 | R396 = 5 parade | R397: 8 T | R398: 13 S | R399: 5 T | R400: 4 T | 1 / 3 | 3 |
| 16 | R401 = 6 dead end | R402 Brawn d8: 7 T | R403 Wits d8: 5 T | R404 Wits d10: 7 + 7 = 14 **Crit** | R405 Brawn d10: 5 T | 2 / 3 | 2 |
| 17 | R406 = 3 stalls | R407: 13 S | R408: 9 C | R409: 15 S | R410: 9 C | 2 / 0 | 3 |
| 18 | R411 = 6 dead end | R412: 7 T | R413: 4 T | R414: 10 C | R415: 9 C | 0 / 2 | 2 |
| 19 | R416 = 4 rooftops | R417: 17 S | R418: 13 S | R419: 16 S | R420: 11 S | 4 / 0 | 3 |
| 20 | R421 = 6 dead end | R422: 6 T | R423: 14 S | R424: 7 T | R425: 15 S | 2 / 2 | 3 |
| 21 | R426 = 4 rooftops | R427: 11 S | R428: 11 S | R429: 10 C | R430: 11 S | 3 / 0 | 4 |
| 22 | R431 = 5 parade | R432: 10 C | R433: 14 S | R434: 7 T | R435: 11 S | 2 / 1 | 5 |
| 23 | R436 = 2 alleys | R437: 11 S | R438: 14 S | R439: 4 + 4 = 8 T | R440: 11 S | 3 / 1 | **6: escaped** |

(From round 3 every die is one size smaller: Werewolf Nimble d10 / Brawn d8 / Wits d6 / Sly d4; Invisible Man Sly d10 / Wits d8 / Nimble d6; Mummy Wits d10 / Brawn d8 / Charm d6 / Sly d4; Creature Brawn d10 / Wits d8 / Nimble d6 / Sly d4. Each takes its best die for the ground; the full dice are in the appendix.)

Fetch worked as written: the flight started at Lead 3. Over rounds 3–23, with every Weakness in play and no charges: 11 rounds up, 9 down, 1 level. Without Fetch (Lead 2), the same rolls would have dropped to Lead 1 three times (rounds 10, 16 and 18), one bad round from forked.

### 7.4 Drill C: group checks (book at e49ab78)

**Chosen start.** A Standard raid at the start of Turn 2, Suspicion 2. The party: Dracula (defaults, Butler), the Mummy (defaults, Librarian), the Witch (defaults, Cook), the Invisible Man (defaults, Tailor), each with 3 charges; nobody carries anything. All four move to the hatter (cloth, the Invisible Man's Duty). Both its ways in are group obstacles: way A, children in costumes (group), Charm, 10, watched; way B, the rooftops (group), Nimble, 10, watched.

- **Turn 2.** Tell check R441 = 2: nothing. (Familiar's Warning's second d6, R442 = 3, and the d4 for whose, R443 = 3, didn't matter.)
- **Turn 3: group check at way A.** Everyone declares, then rolls together. Suspicion rises once, by the biggest trigger, so once one roller risks the Monster the others' risk is nearly free; all four roll it (m30).

| Roll | Who | Declared | Dice | Total vs 10 | Result |
|---|---|---|---|---|---|
| R444 | Dracula | Charm d12 + Monster (Hypnotic Eyes) | 11 + 9 | 20 | Success |
| R445 | Mummy | Ancient Lore → Wits d12 (3 → 2) + Monster | 11 + 6 | 17 | Success |
| R446 | Witch | Hedge Spell on herself, Charm d10 (3 → 2) + Monster | 8 + 8 | 16 | **Critical**: charge back (2 → 3); the tie shows nothing |
| R447 | Invisible Man | Charm d6 → d8 by Duty, Monster under Unseen (3 → 2) | 4 + 3 | 7 | **Trouble**. Watched, but Out of Sight: caught "only while you carry loot or furniture", and he carries nothing, so no chase |

One rise for the check: +1 (Trouble). Sus 3.

- **Turn 4 (added chosen start: the hatter's ob2 is a crowded shop floor, group, Sly, 10, watched).** The Invisible Man retries way A alone. R448: Charm d8 by Duty, Monster under Unseen (2 → 1): 7 + 3 = 10, Success. The three inside roll a group check at ob2:

| Roll | Who | Declared | Dice | Total vs 10 | Result |
|---|---|---|---|---|---|
| R449 | Dracula | Bat → Nimble d10 (3 → 2) + Monster | 2 + 2 | 4 | **Trouble** (tie: nothing shows) |
| R450 | Mummy | Ancient Lore → Wits d12 (2 → 1) + Monster | 2 + 8 | 10 | Success; the Monster **shows** |
| R451 | Witch | Hedge Spell, Sly d12 (3 → 2) + Monster | 3 + 6 | 9 | **Cost**; the Monster shows |

One rise: +2. Sus 5. The Witch's Cost can't be Suspicion +1: the check's single rise already swallows it (S21). The Storyteller picks "next roll's trait die one size smaller". Only Dracula got Trouble, so he's caught **alone**: the caught-together case (a shared Lead) still isn't exercised by real dice. Local chase: Lead 1, mob 10 + 2 = 12, Garlic from round 1. R452 = 1 square; R453 Charm d10 + Monster (Hypnotic Eyes): 3 + 5 = 8, **Trouble**, Lead 0: **captured** (carrying nothing). The Monster beat his die by 2, so it shows: +2, Sus 7.

### 7.5 Drill D: capture, slipping free and a rescue (continues from 7.4)

- Lock-up Tell check as Dracula is brought in (S12): R454 = 5, No Reflection. Sus 8.
- **Turn 5.** R455: Dracula slips free, Nimble d10 + Mask vs 10: 1 + 5 = 6, Trouble. +1, no chase. Sus 9. The Witch moves from the hatter to the lock-up (one move, S19).
- **Turn 6.** R456: Dracula opens his own way out with Mesmerise ("a captive may open its own way out"): Charm isn't listed for slipping free, so Charm d12 + Mask vs 10 − 2 = 8 (2 → 1). 2 + 2 = 4, Trouble (doubles, no Success). Sus 10. R457: the Witch's rescue (Sly, or Brawn the loud way, 10, watched): Sly d10, stepped down by her Cost and raised by Hedge Spell (2 → 1), + Mask: 8 + 2 = 10, **Success**: "every captive there is free". Dracula acts again next Turn.

### 7.6 Drill E: a dawn flight, Always and Soon (book at e49ab78)

No Entity in Chapter 2 has a Dawn Weakness (Dracula and the Ghost are Always; the other six are Soon), so the Dawn timing can't be tested with book content (m25). This drill checks Always and Soon in a flight that dawn started.

**Chosen start.** A Standard raid; dawn comes after Turn 12 at Suspicion 9. In town: the Mummy (1 charge, carrying the essential) and the Ghost (1 charge). The Witch is in the lock-up. Lead 2, mob 11.

Round 1: the Mummy spends Ancient Lore (1 → 0), the Ghost Chill (1 → 0). Round 2: the Mummy's free overdraw of Ancient Lore. From round 3 the Mummy has Loose Thread; Cold Iron is on the Ghost from round 1.

| Round | Ground | Mummy | Ghost | S / T | Lead |
|---|---|---|---|---|---|
| 1 | R458 = 5 | R459 Wits d12: 8 T | R460 Sly d10 (−1, +1): 17 S | 1 / 1 | 2 |
| 2 | R461 = 3 | R462 Wits d12 (overdraw): 17 S | R463 Nimble d10: 8 T | 1 / 1 | 2 |
| 3 | R464 = 3 | R465 Brawn d8: 8 + 8 = 16 **Crit** | R466 Nimble d10: 9 C | 2 / 0 | 3 |
| 4 | R467 = 5 | R468 Charm d6: 7 T | R469 Sly d8: 11 S | 1 / 1 | 3 |
| 5 | R470 = 6 | R471 Wits d10: 6 T | R472 Wits d4: 13 S | 1 / 1 | 3 |
| 6 | R473 = 6 | R474: 4 T | R475: 4 T | 0 / 2 | 2 |
| 7 | R476 = 2 | R477 Sly d4: 6 T | R478 Nimble d10: 10 C | 0 / 1 | 1 |
| 8 | R479 = 6 | R480: 17 S | R481: 7 T | 1 / 1 | 1 |
| 9 | R482 = 3 | R483: 13 S | R484: 7 + 7 = 14 **Crit** | 3 / 0 | 2 |
| 10 | R485 = 3 | R486: 5 T | R487: 13 S | 1 / 1 | 2 |
| 11 | R488 = 2 | R489: 8 T | R490: 17 S | 1 / 1 | 2 |
| 12 | R491 = 4 | R492: 11 S | R493: 7 T | 1 / 1 | 2 |
| 13 | R494 = 4 | R495: 8 T | R496: 13 S | 1 / 1 | 2 |
| 14 | R497 = 2 | R498: 12 S | R499: 11 S | 2 / 0 | 3 |
| 15 | R500 = 1 | R501: 12 S | R502: 6 T | 1 / 1 | 3 |
| 16 | R503 = 3 | R504: 6 T | R505: 5 T | 0 / 2 | 2 |
| 17 | R506 = 6 | R507: 7 T | R508: 9 C | 0 / 1 | 1 |
| 18 | R509 = 3 | R510: 15 S | R511: 9 C | 1 / 0 | 2 |
| 19 | R512 = 5 | R513: 6 T | R514: 11 S | 1 / 1 | 2 |
| 20 | R515 = 1 | R516: 9 C | R517: 10 C | 0 / 0 | 2 |
| 21 | R518 = 5 | R519: 12 S | R520: 8 T | 1 / 1 | 2 |
| 22 | R521 = 6 | R522: 10 C | R523: 9 C | 0 / 0 | 2 |
| 23 | R524 = 5 | R525: 12 S | R526: 11 S | 2 / 0 | 3 |
| 24 | R527 = 5 | R528: 11 S | R529: 6 + 6 = 12 **Crit** | 3 / 0 | 4 |
| 25 | R530 = 3 | R531: 12 S | R532: 13 S | 2 / 0 | 5 |
| 26 | R533 = 4 | R534: 10 C | R535: 13 S | 1 / 0 | **6: escaped** |

Escaped after 26 rounds, 13 of them level. Two fleeing Entities draw often (one Success, one Trouble). The Witch, still held, is left behind: the result drops one step (Chapter 7).

---

## 8. Findings (most severe first)

No blockers: every gap had a workable ruling, and play went on. "Needs the author's decision" marks fixes that would change rules or numbers.

### 8.1 Major

| id | Severity | Passage (quoted, chapter) | What happened / what I did | Suggested fix |
|---|---|---|---|---|
| M1 | major | Ch6: "You may still overdraw, but your Weakness is then in play from your next roll to the end of the flight, and while your Weakness is in play, however it came, you can't overdraw." · Ch6: "Soon: from the third round of any chase." | Six of the eight Entities are Soon. For them, any overdraw in flight round 2 is **free** (their Weakness arrives in round 3 anyway), and by the literal text they may overdraw **any number of times** before their next roll (S17). Used in every flight: the Mummy (main R130, B R334, E R462), J&H for the Werewolf (Hard R262), the Witch twice in one round (A2 R292–R293). Each is a raise or switch worth about 10 points on that roll, with no choice involved. | Needs the author's decision: for example "overdraw at most once per flight", or "your Weakness is in play at once" (from the overdraw, not the next roll). At least say whether several overdraws before your next roll are allowed. |
| M2 | major (balance, pacing) | Ch6, the Majority Rule: "If Successes outnumber Trouble, the Lead rises by 1; if Trouble outnumbers Successes, it falls by 1; otherwise it stays." · "The Lead starts at 2 and the party escapes at 6." | Five flights played, all escaped, in **5, 4, 10, 23 and 26 rounds** (drill B is about 115 dice). Once Soon Weaknesses arrive, a round barely drifts. Exact from the book's numbers (best trait per ground, no charges): 3–4 Entity parties go up 46–48%, down 32–33%, level 19–22% a round; a two-Entity party goes 38 / 27 / 35. A flight with no charges escapes **61–68%** of the time, is forked **32–39%**, and lasts **11–13 rounds** on average. Fetch (Lead 3) lifts drill B's party from 66% to 80%. | Needs the author's decision (numbers only, no fix proposed): check the simulator's flight length and per-flight forked rate against these figures; consider whether a 20+ round flight is wanted. |
| M3 | major (balance) | Ch6: "The mob's Difficulty is 10 plus half the Suspicion (round down), at most 12" · "Your Lead starts at 1 and you escape at 4." | The mob reaches its cap at **Suspicion 4** (a third of the Standard Limit), so nearly every round I played was against 12. Escape chances from Lead 1 at mob 12: about 49% with a d12 + Monster, 34% with a d10 + Monster, 18% with a d12 + Mask. Each Monster that shows costs +2. Five local chases: 2 captured (in 2 rounds and in 1), 1 escaped (8 rounds), 2 ended by the Limit. The Hard raid was decided by one Trouble (R233): an 8-round chase took Suspicion from **1 to 13 of 15** in one Turn, and the raid ended in a Bust on Turn 4. That's ten chase rounds for one player while two waited. | Needs the author's decision (numbers only). |
| M4 | major | Ch3: "An ability can help any Entity's roll at the same place" · "Use the ability's trait instead of the one the obstacle calls for" · "Open an approach nobody else can take … roll that trait at 2 lower Difficulty … Only you get through" | When one Entity's switch or open ability helps another's roll, whose die is rolled (the roller's Charm, or the helper's)? And who "gets through" an opened approach, the helper or the roller? It came up at main L3 ob2: the Mummy's Royal Bearing on Jekyll's roll would have been Jekyll's Charm d12 at 8 (71%) instead of Sly d10 at 10 (45%). It comes up whenever a party gathers at one place. I avoided it (S18). | Wording, if the book already means one of these: "the roller always rolls its own trait die; an opened approach lets only the roller through." Otherwise the author decides. |
| M5 | major | Ch2: "The Draught (signature): change form, Jekyll to Hyde or back; the new form lasts until the next draught." · box: "Every ability does one of four things" · Practised Hand: "changing back to Jekyll costs no charge." | Jekyll & Hyde were in both rolled parties, so this came up in every flight round. The book doesn't say which form he starts in, when the Draught may be drunk (before a roll? as an action? in a local chase?), or whether it's limited to once a Turn or round. It is also a fifth kind of ability, against the box's "four things". I ruled: starts as Jekyll; drunk before any roll like any ability; no action (S9). With Practised Hand and the Mask off, J&H effectively picks his form free every flight round. | Wording: "Jekyll & Hyde starts each raid as Jekyll. Drinking the draught is used like any ability, before a roll, and takes no action." Add "or change form" to the box. |
| M6 | major | Ch4: "Huge pieces don't fit through small entrances." · Ch8 (Rolling a Town): no step marks an entrance small | Two of the six furniture rolls are Huge, and I rolled two (the Hard bed and drill A2's clock). A rolled town gives no way to tell which entrances are small, the way out included. I ruled none are (S8). | Needs the author's decision: a d10 per way in (and for the way out), or "in a rolled town, no entrance is small". |

### 8.2 Minor

| id | Passage (quoted, chapter) | What happened / what I did | Suggested fix |
|---|---|---|---|
| m7 | Ch2, Spectral: "you get past group obstacles without rolling." | Does passing use the Ghost's action for that Turn? I ruled yes (S10); main L1 and Hard L2 each lost a Turn to it. | Say "…without rolling; it still takes your action" or "…, at no action". |
| m8 | Ch5: "The first time anyone reaches each watched location (the way out and the lock-up included), check once" | Does a captive being brought in "reach" the lock-up? I ruled yes (S12). Both checks went off (main R104, drill D R454): +1 each, and the main line's +1 counted toward its Limit. | Say whether the first captive's arrival triggers the check, or only a visitor's. |
| m9 | Ch4: "The party starts at the edge of town, by the way out" · Ch5 (same Tell passage) | Does the start count as reaching the way out? I ruled no; the check comes when someone first returns (S13; drill A R278). | Say so in the Tells paragraph. |
| m10 | Ch4: "While carrying furniture, every move takes two Turns, and Suspicion rises by 1 at the end of each Turn." · Ch5: "Carrying furniture, each Turn \| +1" | With a Huge piece and two carriers, is it +1 or +2 a Turn? Not met (Strong Back carried alone). I ruled once per piece (S20). | "…rises by 1 at the end of each Turn the piece is carried, however many carry it." |
| m11 | same passage | During the first Turn of a two-Turn move, where is the carrier: can others help it, and what if dawn or the Limit comes then? And is there a rise for the Turn the party leaves town? (I ruled no; S20.) | Add: "Halfway through a two-Turn move the carriers are between places; leaving town ends the carrying." (Wording only if this is what's meant.) |
| m12 | Ch4: "Taking a piece is free (no re-crossing); drop it any time." | Delaying the pick-up until the move starts, with someone already at the way out to roll in the arrival Turn, held the carrying cost to **+1** in both drills (A: Turn 7 only; A2: Turn 11 only). The B2 cost assumes more. | Needs the author's decision whether that's intended (it may already match the simulator). |
| m13 | Ch3: "Only you get through" · Ch4: "Taking a piece is free" | Behind an opened furniture obstacle, may anyone else take the piece (from a drop, say)? I ruled only the opener (S20; drill A, where the Witch carried). | Say whether a piece behind an opened obstacle can be passed on. |
| m14 | Ch4: "stands at one of the list's locations" · Ch8: "Roll a d6 for the piece of furniture or decor standing at one of the list's locations" | How is the location picked? I rolled (S6). | "…at one of the list's locations (roll or pick)." |
| m15 | Ch8, step 3: "and the furniture's extra one, 2 harder" · step 4: "at most one Difficulty 12 in an Easy or Standard town, two in a Hard town. Reroll any extra." | Does the piece's 12 count toward the ceiling? And which 12 is "the extra" one? All three pieces I rolled became 12 from a 10 (R65, R180, R273). By the dice table the furniture obstacle is 12 in **35%** of Standard towns and **60%** of Hard ones. | Say whether the +2 result counts, and which 12 is rerolled (say, the last one rolled). |
| m16 | Ch8: "roll again on a repeat" · Ch7: "one line for each kind of item on the list that didn't come home" | Is a repeated *kind* a repeat? Both lists had two food items (S2). Then, in the main line, the wine came home and the cake didn't: read the food line? I did, and it sits beside the Win line's "Full larders". | Say "a repeated item"; and "…for each kind with an item that didn't come home" (or "with nothing home"). |
| m17 | Ch2 (Duties table): Butler "the silversmith, the china shop" · Ch8: "at one of the three places its kind is found (Chapter 2): roll a d3 or pick." | The Butler has two places; I rolled a d2 (S3; R19). | Give the Butler a third place, or say "roll or pick". |
| m18 | Ch8: "Locations: one for each item on the list" | The bacon and the honey both landed at the butcher (Hard R161, R165). I made two locations (S4). | Say "if two items land at the same place, reroll" or "they share it". |
| m19 | Ch8: "For the second way in, roll again until its quiet way is a different trait." | Reroll only the table, or Difficulty and watched too? It happened twice (Hard L1 needed two rerolls). I rerolled the table only (S5). | "…roll the obstacle table again until…". |
| m20 | Ch2, Familiar's Warning: "when you arrive, a Tell check goes off only if a second d6 also rolls 4–6" | When she arrives with others, does it guard the whole check, or only her own Tell? Not decisive in drill C (R441 = 2). | "…when you arrive (with anyone)…" or "…if the Tell would be yours". |
| m21 | Ch2, Hedge Spell: "on any roll in the same place, hers or a friend's" · Ch6: "In a local chase, abilities help only your own roll." | Which wins? I followed Chapter 6 (S15; drill A2). | Add "(not in a local chase)" to Hedge Spell, or the reverse. |
| m22 | Ch3: "Raises and steps down cancel out. Nothing makes a die smaller than a d4: further steps down are lost." | A d4 stepped down (step lost) and then raised: d4 or d6? It came up with the Ghost's Brawn d4 under Cold Iron (Hard chase round 6); I used Wits instead. | Give one example: "a d4 stepped down and raised is a d6" (or d4). |
| m23 | Ch4: "Each Turn, every Entity either makes one roll at its location or moves" | May an Entity do nothing? Used in the main line (Turn 5) and the Hard line (Turn 2). I ruled yes (S11). | "…or waits". |
| m24 | Ch2: "if two defaults clash in a party, the second player picks another or rolls a d6 again." | "Again" suggests an earlier roll; and must the reroll avoid other players' defaults that haven't been placed yet? I avoided every default in the party (S14; R5–R6). | "…picks another or rolls a d6, rerolling any Duty already taken." |
| m25 | Ch6: "Dawn: only in a final flight that dawn started, from its first round." | No Entity has a Dawn Weakness (two Always, six Soon), so the line is dead and drill (e) couldn't test it. | Needs the author's decision: give an Entity Dawn timing, or drop the line until one has it. |
| m26 | Ch6: "Getting there costs the party Turns." · "A freed Entity acts again next Turn." | How many Turns? Where does the freed or rescued Entity stand? I ruled one move, at the lock-up (S19; drill D). | "Getting there is a move. Freed Entities start at the lock-up." |
| m27 | Ch3: "Using any other trait needs an ability." · Ch5: "When an obstacle lists a loud way and you take it" | If a switch ability (Ancient Lore, Keen Nose) changes the roll to the obstacle's loud trait, is that the loud way? It came up planning main L4 ob2. | "A trait the obstacle lists as loud is loud however you came to roll it." |
| m28 | Ch2: "At a location whose list item is your Duty's kind, your trait die is one size larger on your own rolls there" | Does it apply to the furniture's extra obstacle there, or in a local chase caught there? Not met. | Say which (say, "at its obstacles, the furniture's included; not in chases"). |
| m29 | Ch5: "If the Limit comes during a local chase, that chase ends at once (even if the same round cornered you)" | Near the Limit, a cornering round that also reaches the Limit isn't a capture, so a showing Monster can save you. It happened twice (Hard R254; drill A2 R285, where a +2 show turned a capture into a flight). That's a perverse incentive to roll the Monster when cornered. | Needs the author's decision whether that's wanted (the rule itself was approved earlier). |
| m30 | Ch4: "Suspicion rises only once, by the biggest trigger among their rolls." · Ch3: "The Storyteller never picks a Cost that costs nothing right then" | In a group check, once one roller risks the Monster the others' risk is nearly free: drill C had eight Monster dice and only +1 and +2. A Cost of Suspicion +1 inside a check is always swallowed, so the Storyteller must pick another (S21; R451). | No change needed if intended; say the second point in a line: "a Suspicion Cost inside a group check costs nothing, so pick another." |
| m31 | Ch5: "Every Entity who isn't captured flees together in the final flight" · Ch6: "Escape and you are home with the goods." · Ch8: "Suspicion +1 near the Limit" | The hunt is also a way home: it needs no way-out roll and brings everything carried. In the main line, at Limit − 1 every Cost was going to be "Suspicion +1" (the advice), so the party took the best-odds loot rolls and Won through the flight on Turn 6. Numbers: 12 of 12 Turns were never needed in either full raid; Suspicion ended both by Turn 6. | Needs the author's decision whether that's intended (it may be the design). |

### 8.3 Wording

| id | Passage (quoted, chapter) | Issue | Suggested fix |
|---|---|---|---|
| w32 | Ch3: "In a chase it moves the Lead 2" · Ch6: "A Critical counts as two Successes." | In the final flight the majority rule moves the Lead by at most 1, so a Critical there doesn't move it 2 (9 Criticals in flights, e.g. R258) (S16). | Ch3: "In a local chase it moves the Lead 2; in the final flight it counts as two Successes." |
| w33 | Ch2: "Every pick has a marked default and a random-table entry, so a new player can skip the choices." | Gifts and Perks show a default but no numbers to roll (only Castle Duty has a d6). | Number each entry's three options (1–2 / 3–4 / 5–6 on a d6, default first). |
| w34 | Ch1: "A set of polyhedral dice for each player: d4, d6, d8, d10 and d12." | Building a rolled town needs a d20 (counts, Difficulty, the obstacle table). | "…and a d20 for the Storyteller." |
| w35 | Ch2 box: "raise a die one size" vs Ch3: "Raise your trait die one size" | The box reads as if the Mask or Monster die could be raised. | Box: "raise your trait die one size". |
| w36 | Ch2, Fetch: "while you're in the final flight, it starts at Lead 3" | "While" with a one-time start; "it" has no noun. | "If you're in the final flight (not captured), it starts at Lead 3." |
| w37 | Ch8 shopping table: "the wedding cake in the baker's window" | It can be rolled at the butcher or the tavern cellar (main R23: the butcher). | "the wedding cake in the shop window", or "(at the baker's)". |

**Counts: 0 blockers, 6 major, 25 minor, 6 wording.**

**Resolved during this playtest by e49ab78:** how many essentials on Standard ("on Standard, roll any die: odd, one; even, two"); the shared-chase Suspicion rule (not exercised; no group check caught two Entities).

---

## 9. Balance and usability notes

### 9.1 Numbers from play

- **Results:** main Win (the Limit on Turn 6, flight round 5); Hard Bust (the Limit on Turn 4, flight round 4). Both raids ended by Suspicion with more than half the night left.
- **Tells:** 9 checks, 7 went off (main 4 of 4; Hard 1 of 2; drill A 1 of 1; drill C 0 of 1; drill D 1 of 1). In the main line Tells were a third of the Limit (4 of 12).
- **Suspicion sources (main):** Tells 4, Trouble 6, Costs chosen as Suspicion 2. **(Hard):** Tell 1; the first chase 12 (Trouble 2, overdraw 6, Monster shows 4); the second catch and chase 2.
- **Local chases:** 5 (15 rounds). Captured 2, escaped 1, ended by the Limit 2. Mob 12 in 12 of the 15 rounds.
- **Final flights:** 5, all escaped, in 5, 4, 10, 23 and 26 rounds. The exact odds without charges are in M2.
- **Furniture:** the extra obstacle was 12 in 3 of 3 rolls; carrying cost +1 in both carrying drills. Neither full raid tried for the piece (Suspicion ran out first).
- **Costs chosen** (by Chapter 8's advice): Suspicion +1 twice (main, near the Limit), lose a Turn once (drill A, a carrier), a smaller die once (drill C, Suspicion swallowed). "Drop an item" never: nobody who rolled a Cost held other loot.
- **What felt good:** the villager table gave every watched obstacle and Cost a face in one roll; J&H flipping to Hyde when the Monster shows, and back for free, made the flights lively; Lantern Night and the epilogue lines read well at the table.
- **What felt bad:** the Hard raid ended at its first real setback (one Trouble, ten chase rounds, a Bust on Turn 4); flights of 23 and 26 rounds were a slog; three Tells on the main line's first Turn.

### 9.2 Layout and usability

- **Chapters 2 and 8 for every location.** Rolling a Town says "at one of the three places its kind is found (Chapter 2)", but the places are in the Duties table in Chapter 2. Repeat the places in Chapter 8's shopping table.
- **Chapters 6 and 8 for the flight.** Chapter 6 says the flight's mob Difficulty "is set by the town's difficulty (Chapter 8)", and the numbers (10 / 11 / 11) are only in Chapter 8's table. The same goes for the lock-up Difficulty during a capture. Give both lines in Chapter 6 too.
- **One capture, three chapters:** the Tell at the lock-up (Ch5), the lock-up rules (Ch6), the lock-up Difficulty (Ch8). A four-line "Captured: what happens" box in Chapter 6 would save the flipping.
- **Weakness timings** sit in each Entity entry (Ch2) and their meaning in Ch6. In flights I looked each one up for every Entity. A one-line roster in Chapter 6 (Always: Dracula, Ghost; Soon: the rest) would help.
- Chapter 8's obstacle table, town dice and difficulty table worked well together: one town took about 70 dice and needed no other chapter except Chapter 2's places.

---

## 10. Roll appendix

Every roll in order. "aN + bM" rolls list each die; the total follows. One label correction: R262's label says "overdrawn Keen Nose", but the Werewolf still had one charge and paid for Keen Nose with it (only J&H's Doctor's Bag was overdrawn). The dice are unaffected.

| Roll | What | Dice |
|---|---|---|
| R1 | Main: Entity pick 1 | d8 = 8 |
| R2 | Main: Entity pick 2 | d8 = 3 |
| R3 | Main: Entity pick 3 | d8 = 4 |
| R4 | Main: Entity pick 4 | d8 = 6 |
| R5 | Main: Mummy Duty reroll | d6 = 3 |
| R6 | Main: Mummy Duty reroll | d6 = 5 |
| R7 | Main: number of essentials (1-2, my ruling) | d2 = 1 |
| R8 | Main: list item 1 kind | d6 = 4 |
| R9 | Main: list item 1 item | d6 = 2 |
| R10 | Main: list item 2 kind | d6 = 1 |
| R11 | Main: list item 2 item | d6 = 3 |
| R12 | Main: list item 3 kind | d6 = 3 |
| R13 | Main: list item 3 item | d6 = 6 |
| R14 | Main: list item 4 kind | d6 = 5 |
| R15 | Main: list item 4 item | d6 = 3 |
| R16 | Main: list item 5 kind | d6 = 1 |
| R17 | Main: list item 5 item | d6 = 6 |
| R18 | Main: Lantern Night custom | d6 = 1 |
| R19 | Main: L1 (tea service) place, Butler row has 2 places | d2 = 1 |
| R20 | Main: L2 (wine) place | d3 = 1 |
| R21 | Main: L3 (etiquette) place | d3 = 2 |
| R22 | Main: L4 (hinges) place | d3 = 2 |
| R23 | Main: L5 (wedding cake) place | d3 = 2 |
| R24 | Main: L1 obstacle count | d20 = 18 |
| R25 | Main: L2 obstacle count | d20 = 18 |
| R26 | Main: L3 obstacle count | d20 = 11 |
| R27 | Main: L4 obstacle count | d20 = 9 |
| R28 | Main: L5 obstacle count | d20 = 20 |
| R29 | Main: furniture piece | d6 = 2 |
| R30 | Main: furniture location (book silent; my ruling d5) | d5 = 3 |
| R31 | Main: L1 way A table | d20 = 13 |
| R32 | Main: L1 way A Difficulty | d20 = 14 |
| R33 | Main: L1 way A watched | d10 = 2 |
| R34 | Main: L1 way B table | d20 = 11 |
| R35 | Main: L1 way B Difficulty | d20 = 17 |
| R36 | Main: L1 way B watched | d10 = 5 |
| R37 | Main: L1 ob2 table | d20 = 5 |
| R38 | Main: L1 ob2 Difficulty | d20 = 16 |
| R39 | Main: L1 ob2 watched | d10 = 4 |
| R40 | Main: L1 ob3 table | d20 = 13 |
| R41 | Main: L1 ob3 Difficulty | d20 = 16 |
| R42 | Main: L1 ob3 watched | d10 = 3 |
| R43 | Main: L2 way A table | d20 = 2 |
| R44 | Main: L2 way A Difficulty | d20 = 15 |
| R45 | Main: L2 way A watched | d10 = 1 |
| R46 | Main: L2 way B table | d20 = 18 |
| R47 | Main: L2 way B Difficulty | d20 = 2 |
| R48 | Main: L2 way B watched | d10 = 4 |
| R49 | Main: L2 ob2 table | d20 = 19 |
| R50 | Main: L2 ob2 Difficulty | d20 = 5 |
| R51 | Main: L2 ob2 watched | d10 = 7 |
| R52 | Main: L2 ob3 table | d20 = 3 |
| R53 | Main: L2 ob3 Difficulty | d20 = 9 |
| R54 | Main: L2 ob3 watched | d10 = 9 |
| R55 | Main: L3 way A table | d20 = 4 |
| R56 | Main: L3 way A Difficulty | d20 = 10 |
| R57 | Main: L3 way A watched | d10 = 9 |
| R58 | Main: L3 way B table | d20 = 12 |
| R59 | Main: L3 way B Difficulty | d20 = 10 |
| R60 | Main: L3 way B watched | d10 = 7 |
| R61 | Main: L3 ob2 table | d20 = 10 |
| R62 | Main: L3 ob2 Difficulty | d20 = 16 |
| R63 | Main: L3 ob2 watched | d10 = 6 |
| R64 | Main: L3 furniture ob table | d20 = 13 |
| R65 | Main: L3 furniture ob Difficulty | d20 = 15 |
| R66 | Main: L3 furniture ob watched | d10 = 10 |
| R67 | Main: L4 way A table | d20 = 4 |
| R68 | Main: L4 way A Difficulty | d20 = 18 |
| R69 | Main: L4 way A watched | d10 = 1 |
| R70 | Main: L4 way B table | d20 = 8 |
| R71 | Main: L4 way B Difficulty | d20 = 19 |
| R72 | Main: L4 way B watched | d10 = 5 |
| R73 | Main: L4 ob2 table | d20 = 10 |
| R74 | Main: L4 ob2 Difficulty | d20 = 5 |
| R75 | Main: L4 ob2 watched | d10 = 5 |
| R76 | Main: L5 way A table | d20 = 17 |
| R77 | Main: L5 way A Difficulty | d20 = 13 |
| R78 | Main: L5 way A watched | d10 = 8 |
| R79 | Main: L5 way B table | d20 = 5 |
| R80 | Main: L5 way B Difficulty | d20 = 6 |
| R81 | Main: L5 way B watched | d10 = 4 |
| R82 | Main: L5 ob2 table | d20 = 19 |
| R83 | Main: L5 ob2 Difficulty | d20 = 5 |
| R84 | Main: L5 ob2 watched | d10 = 10 |
| R85 | Main: L5 ob3 table | d20 = 13 |
| R86 | Main: L5 ob3 Difficulty | d20 = 8 |
| R87 | Main: L5 ob3 watched | d10 = 3 |
| R88 | Main T1: Tell check L1 (Ghost arrives) | d6 = 6 |
| R89 | Main T1: Tell check L2 (Werewolf arrives) | d6 = 4 |
| R90 | Main T1: Tell check L4 (Mummy arrives) | d6 = 4 |
| R91 | Main T2: villager who, L1 crowded shop floor | d6 = 3 |
| R92 | Main T2: villager doing, L1 | d6 = 1 |
| R93 | Main T2: Jekyll L3 way B Sly d10(Duty)+Mask vs 8 | d10 = 3, d6 = 1 (4) |
| R94 | Main T2: villager who, L2 dark back room | d6 = 5 |
| R95 | Main T2: villager doing, L2 | d6 = 6 |
| R96 | Main T2: Werewolf L2 way B Wits d8+Mask vs 6 | d8 = 1, d6 = 2 (3) |
| R97 | Main T2: villager who, L4 drainpipe | d6 = 6 |
| R98 | Main T2: villager doing, L4 | d6 = 4 |
| R99 | Main T2: Mummy L4 way B open Charm d10(Duty)+Mask vs 8 | d10 = 6, d6 = 5 (11) |
| R100 | Main T2: Werewolf local chase round 1 ground | d6 = 2 |
| R101 | Main T2: Werewolf chase r1 Nimble d12+Monster (Good Dog) vs 12 | d12 = 1, d10 = 6 (7) |
| R102 | Main T2: Werewolf local chase round 2 ground | d6 = 4 |
| R103 | Main T2: Werewolf chase r2 Nimble d12+Monster (Good Dog) vs 12 | d12 = 2, d10 = 1 (3) |
| R104 | Main T2: Tell check lock-up (Werewolf brought in) | d6 = 6 |
| R105 | Main T3: Mummy L4 ob2 open Charm d10(Duty)+Mask vs 6 | d10 = 1, d6 = 6 (7) |
| R106 | Main T3: villager who, L1 garden wall | d6 = 4 |
| R107 | Main T3: villager doing, L1 garden wall | d6 = 3 |
| R108 | Main T3: Ghost L1 ob2 Through the Wall Sly d12(Duty)+Mask vs 8 | d12 = 2, d6 = 6 (8) |
| R109 | Main T3: Jekyll L3 way B Sly d10(Duty)+Mask vs 8 | d10 = 9, d6 = 2 (11) |
| R110 | Main T3: Werewolf slip free Nimble d12+Monster (Good Dog) vs 10 | d12 = 5, d10 = 6 (11) |
| R111 | Main T4: Ghost L1 ob3 Charm d10(Duty)+Mask vs 10 | d10 = 4, d6 = 4 (8) |
| R112 | Main T4: Jekyll L3 ob2 Sly d10(Duty)+Mask vs 10 | d10 = 2, d6 = 5 (7) |
| R113 | Main T4: villager who, Ghost's Cost | d6 = 3 |
| R114 | Main T4: villager doing, Ghost's Cost | d6 = 6 |
| R115 | Main T5: Mummy L2 way B Wits d12+Mask vs 6 | d12 = 2, d6 = 4 (6) |
| R116 | Main T6: Mummy L2 ob2 Wits d12+Mask vs 8 | d12 = 9, d6 = 2 (11) |
| R117 | Main T6: Ghost L3 ob2 Sly d12 (Doctor's Bag)+Mask vs 10 | d12 = 2, d6 = 2 (4) |
| R118 | Main T6: Werewolf L2 ob3 Brawn d10+Mask vs 8 | d10 = 10, d6 = 1 (11) |
| R119 | Main T6: Jekyll L3 ob2 Sly d10(Duty)+Mask vs 10 | d10 = 3, d6 = 6 (9) |
| R120 | Main T6: villager who, Jekyll's Cost | d6 = 1 |
| R121 | Main T6: villager doing, Jekyll's Cost | d6 = 4 |
| R122 | Main flight round 1 ground | d6 = 5 |
| R123 | Main flight r1: Ghost Sly d10 (Cold Iron -1, Chill +1)+Monster vs 11 | d10 = 2, d10 = 7 (9) |
| R124 | Main flight r1: Jekyll Charm d12+Monster vs 11 | d12 = 10, d10 = 9 (19) |
| R125 | Main flight r1: Mummy Wits d12 (Ancient Lore)+Monster vs 11 | d12 = 6, d10 = 2 (8) |
| R126 | Main flight r1: Werewolf Sly d6+Monster vs 11 | d6 = 4, d10 = 6 (10) |
| R127 | Main flight round 2 ground | d6 = 3 |
| R128 | Main flight r2: Ghost Nimble d12 (Cold Iron -1, Chill +1)+Monster vs 11 | d12 = 1, d10 = 9 (10) |
| R129 | Main flight r2: Hyde Brawn d12+Monster vs 11 | d12 = 3, d10 = 6 (9) |
| R130 | Main flight r2: Mummy Wits d12 (overdrawn Ancient Lore)+Monster vs 11 | d12 = 10, d10 = 6 (16) |
| R131 | Main flight r2: Werewolf Nimble d12+Monster vs 11 | d12 = 3, d10 = 8 (11) |
| R132 | Main flight round 3 ground | d6 = 5 |
| R133 | Main flight r3: Ghost Sly d8 (Cold Iron)+Monster vs 11 | d8 = 5, d10 = 9 (14) |
| R134 | Main flight r3: Jekyll Charm d10 (Familiar Face)+Monster vs 11 | d10 = 3, d10 = 6 (9) |
| R135 | Main flight r3: Mummy Charm d8 (Loose Thread -1, Doctor's Bag +1)+Monster vs 11 | d8 = 5, d10 = 6 (11) |
| R136 | Main flight r3: Werewolf Sly d4 (Hounds)+Monster vs 11 | d4 = 3, d10 = 2 (5) |
| R137 | Main flight round 4 ground | d6 = 6 |
| R138 | Main flight r4: Ghost Brawn d4 (floor)+Monster vs 11 | d4 = 2, d10 = 5 (7) |
| R139 | Main flight r4: Hyde Brawn d10 (Familiar Face)+Monster vs 11 | d10 = 10, d10 = 8 (18) |
| R140 | Main flight r4: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 3, d10 = 7 (10) |
| R141 | Main flight r4: Werewolf Brawn d8 (Hounds)+Monster vs 11 | d8 = 6, d10 = 8 (14) |
| R142 | Main flight round 5 ground | d6 = 2 |
| R143 | Main flight r5: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 5, d10 = 10 (15) |
| R144 | Main flight r5: Hyde Nimble d8 (Familiar Face)+Monster vs 11 | d8 = 8, d10 = 10 (18) |
| R145 | Main flight r5: Mummy Sly d4 (Loose Thread)+Monster vs 11 | d4 = 2, d10 = 8 (10) |
| R146 | Main flight r5: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 5, d10 = 1 (6) |
| R147 | Hard: Entity pick 1 | d8 = 8 |
| R148 | Hard: Entity pick 2 | d8 = 6 |
| R149 | Hard: Entity pick 3 | d8 = 4 |
| R150 | Hard: list item 1 kind | d6 = 1 |
| R151 | Hard: list item 1 item | d6 = 2 |
| R152 | Hard: list item 2 kind | d6 = 6 |
| R153 | Hard: list item 2 item | d6 = 3 |
| R154 | Hard: list item 3 kind | d6 = 5 |
| R155 | Hard: list item 3 item | d6 = 4 |
| R156 | Hard: list item 4 kind | d6 = 2 |
| R157 | Hard: list item 4 item | d6 = 4 |
| R158 | Hard: list item 5 kind | d6 = 1 |
| R159 | Hard: list item 5 item | d6 = 5 |
| R160 | Hard: Lantern Night custom | d6 = 5 |
| R161 | Hard: L1 (bacon) place | d3 = 2 |
| R162 | Hard: L2 (top hat) place | d3 = 1 |
| R163 | Hard: L3 (lamp) place | d3 = 3 |
| R164 | Hard: L4 (turnip seed) place | d3 = 3 |
| R165 | Hard: L5 (honey) place | d3 = 2 |
| R166 | Hard: L1 obstacle count | d20 = 3 |
| R167 | Hard: L2 obstacle count | d20 = 15 |
| R168 | Hard: L3 obstacle count | d20 = 5 |
| R169 | Hard: L4 obstacle count | d20 = 14 |
| R170 | Hard: L5 obstacle count | d20 = 7 |
| R171 | Hard: furniture piece | d6 = 6 |
| R172 | Hard: furniture location (my ruling d5) | d5 = 1 |
| R173 | Hard: L1 way A table | d20 = 14 |
| R174 | Hard: L1 way A Difficulty | d20 = 5 |
| R175 | Hard: L1 way A watched | d10 = 4 |
| R176 | Hard: L1 way B table | d20 = 15 |
| R177 | Hard: L1 way B Difficulty | d20 = 6 |
| R178 | Hard: L1 way B watched | d10 = 1 |
| R179 | Hard: L1 furniture ob table | d20 = 15 |
| R180 | Hard: L1 furniture ob Difficulty | d20 = 9 |
| R181 | Hard: L1 furniture ob watched | d10 = 3 |
| R182 | Hard: L2 way A table | d20 = 16 |
| R183 | Hard: L2 way A Difficulty | d20 = 1 |
| R184 | Hard: L2 way A watched | d10 = 5 |
| R185 | Hard: L2 way B table | d20 = 20 |
| R186 | Hard: L2 way B Difficulty | d20 = 6 |
| R187 | Hard: L2 way B watched | d10 = 8 |
| R188 | Hard: L2 ob2 table | d20 = 10 |
| R189 | Hard: L2 ob2 Difficulty | d20 = 19 |
| R190 | Hard: L2 ob2 watched | d10 = 1 |
| R191 | Hard: L2 ob3 table | d20 = 8 |
| R192 | Hard: L2 ob3 Difficulty | d20 = 3 |
| R193 | Hard: L2 ob3 watched | d10 = 1 |
| R194 | Hard: L3 way A table | d20 = 5 |
| R195 | Hard: L3 way A Difficulty | d20 = 4 |
| R196 | Hard: L3 way A watched | d10 = 8 |
| R197 | Hard: L3 way B table | d20 = 16 |
| R198 | Hard: L3 way B Difficulty | d20 = 11 |
| R199 | Hard: L3 way B watched | d10 = 1 |
| R200 | Hard: L3 ob2 table | d20 = 3 |
| R201 | Hard: L3 ob2 Difficulty | d20 = 11 |
| R202 | Hard: L3 ob2 watched | d10 = 1 |
| R203 | Hard: L4 way A table | d20 = 17 |
| R204 | Hard: L4 way A Difficulty | d20 = 17 |
| R205 | Hard: L4 way A watched | d10 = 9 |
| R206 | Hard: L4 way B table | d20 = 9 |
| R207 | Hard: L4 way B Difficulty | d20 = 2 |
| R208 | Hard: L4 way B watched | d10 = 1 |
| R209 | Hard: L4 ob2 table | d20 = 20 |
| R210 | Hard: L4 ob2 Difficulty | d20 = 5 |
| R211 | Hard: L4 ob2 watched | d10 = 8 |
| R212 | Hard: L4 ob3 table | d20 = 11 |
| R213 | Hard: L4 ob3 Difficulty | d20 = 3 |
| R214 | Hard: L4 ob3 watched | d10 = 8 |
| R215 | Hard: L5 way A table | d20 = 15 |
| R216 | Hard: L5 way A Difficulty | d20 = 1 |
| R217 | Hard: L5 way A watched | d10 = 8 |
| R218 | Hard: L5 way B table | d20 = 13 |
| R219 | Hard: L5 way B Difficulty | d20 = 13 |
| R220 | Hard: L5 way B watched | d10 = 7 |
| R221 | Hard: L5 ob2 table | d20 = 1 |
| R222 | Hard: L5 ob2 Difficulty | d20 = 2 |
| R223 | Hard: L5 ob2 watched | d10 = 6 |
| R224 | Hard: L1 way B table reroll | d20 = 15 |
| R225 | Hard: L5 way B table reroll | d20 = 7 |
| R226 | Hard: L1 way B table reroll 2 | d20 = 9 |
| R227 | Hard T1: Tell check L1 (Jekyll arrives) | d6 = 4 |
| R228 | Hard T1: Tell check L2 (Ghost, Werewolf arrive) | d6 = 3 |
| R229 | Hard T1: whose Tell at L2 if it goes off (1 Ghost, 2 Werewolf) | d2 = 1 |
| R230 | Hard T2: Jekyll L1 way A guard dog Charm d12+Mask vs 8 | d12 = 10, d6 = 4 (14) |
| R231 | Hard T3: villager who, L2 nosy neighbour | d6 = 2 |
| R232 | Hard T3: villager doing, L2 | d6 = 4 |
| R233 | Hard T3: Ghost L2 ob2 Sly d12 (Chill)+Monster (WW Good Dog) vs 12 | d12 = 2, d10 = 4 (6) |
| R234 | Hard T3: Ghost local chase round 1 ground | d6 = 4 |
| R235 | Hard T3: Ghost chase r1 Nimble d12 (Cold Iron -1, Chill +1)+Monster vs 11 | d12 = 6, d10 = 5 (11) |
| R236 | Hard T3: Ghost local chase round 2 ground | d6 = 1 |
| R237 | Hard T3: Ghost chase r2 Sly d10 (Cold Iron -1, Chill +1)+Monster vs 11 | d10 = 5, d10 = 1 (6) |
| R238 | Hard T3: Ghost local chase round 3 ground | d6 = 2 |
| R239 | Hard T3: Ghost chase r3 Nimble d12 (Cold Iron -1, overdrawn Chill +1)+Monster vs 11 | d12 = 10, d10 = 1 (11) |
| R240 | Hard T3: Ghost local chase round 4 ground | d6 = 3 |
| R241 | Hard T3: Ghost chase r4 Nimble d10 (Cold Iron)+Monster vs 12 | d10 = 2, d10 = 10 (12) |
| R242 | Hard T3: Ghost local chase round 5 ground | d6 = 3 |
| R243 | Hard T3: Ghost chase r5 Nimble d10 (Cold Iron)+Monster vs 12 | d10 = 2, d10 = 9 (11) |
| R244 | Hard T3: Ghost local chase round 6 ground | d6 = 6 |
| R245 | Hard T3: Ghost chase r6 Wits d6 (Cold Iron -1, overdrawn Chill +1)+Monster vs 12 | d6 = 5, d10 = 4 (9) |
| R246 | Hard T3: Ghost local chase round 7 ground | d6 = 1 |
| R247 | Hard T3: Ghost chase r7 Sly d10 (Cold Iron -1, overdrawn Chill +1)+Monster vs 12 | d10 = 6, d10 = 9 (15) |
| R248 | Hard T3: Ghost local chase round 8 ground | d6 = 4 |
| R249 | Hard T3: Ghost chase r8 Nimble d10 (Cold Iron)+Mask vs 12 | d10 = 10, d6 = 5 (15) |
| R250 | Hard T4: Ghost L2 ob2 Sly d12 (J&H Doctor's Bag)+Monster (WW Good Dog) vs 12 | d12 = 3, d10 = 5 (8) |
| R251 | Hard T4: Ghost local chase 2 round 1 ground | d6 = 4 |
| R252 | Hard T4: Ghost chase 2 r1 Nimble d10 (Cold Iron)+Mask vs 12 | d10 = 7, d6 = 3 (10) |
| R253 | Hard T4: Ghost local chase 2 round 2 ground | d6 = 6 |
| R254 | Hard T4: Ghost chase 2 r2 Wits d4 (Cold Iron)+Mask vs 12 | d4 = 4, d6 = 3 (7) |
| R255 | Hard flight round 1 ground | d6 = 4 |
| R256 | Hard flight r1: Ghost Nimble d12 (Cold Iron -1, Doctor's Bag +1)+Monster vs 11 | d12 = 3, d10 = 8 (11) |
| R257 | Hard flight r1: Jekyll Wits d10+Monster vs 11 | d10 = 5, d10 = 10 (15) |
| R258 | Hard flight r1: Werewolf Nimble d12+Monster vs 11 | d12 = 10, d10 = 10 (20) |
| R259 | Hard flight round 2 ground | d6 = 1 |
| R260 | Hard flight r2: Ghost Sly d10 (Cold Iron -1, Doctor's Bag +1)+Monster vs 11 | d10 = 4, d10 = 7 (11) |
| R261 | Hard flight r2: Jekyll Charm d12+Monster vs 11 | d12 = 8, d10 = 9 (17) |
| R262 | Hard flight r2: Werewolf Wits d10 (overdrawn Keen Nose, overdrawn Doctor's Bag)+Monster vs 11 | d10 = 6, d10 = 8 (14) |
| R263 | Hard flight round 3 ground | d6 = 1 |
| R264 | Hard flight r3: Ghost Sly d8 (Cold Iron)+Monster vs 11 | d8 = 7, d10 = 4 (11) |
| R265 | Hard flight r3: Jekyll Charm d10 (Familiar Face)+Monster vs 11 | d10 = 7, d10 = 8 (15) |
| R266 | Hard flight r3: Werewolf Sly d4 (Hounds)+Monster vs 11 | d4 = 4, d10 = 10 (14) |
| R267 | Hard flight round 4 ground | d6 = 4 |
| R268 | Hard flight r4: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 10, d10 = 6 (16) |
| R269 | Hard flight r4: Hyde Nimble d8 (Familiar Face)+Monster vs 11 | d8 = 8, d10 = 6 (14) |
| R270 | Hard flight r4: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 9, d10 = 1 (10) |
| R271 | Drill A: furniture piece | d6 = 1 |
| R272 | Drill A: furniture ob table | d20 = 15 |
| R273 | Drill A: furniture ob Difficulty (then +2) | d20 = 19 |
| R274 | Drill A: furniture ob watched | d10 = 1 |
| R275 | Drill A T5: Witch furniture ob open Sly d12 (Broomstick + Hedge Spell)+Mask vs 10 | d12 = 7, d6 = 1 (8) |
| R276 | Drill A T5: villager who, Witch's Cost | d6 = 5 |
| R277 | Drill A T5: villager doing, Witch's Cost | d6 = 3 |
| R278 | Drill A T7: Tell check way out (Dracula, Creature arrive) | d6 = 4 |
| R279 | Drill A T7: whose Tell if it goes off (1 Dracula, 2 Creature) | d2 = 2 |
| R280 | Drill A T8: Dracula way out Nimble d10+Mask vs 8 | d10 = 5, d6 = 1 (6) |
| R281 | Drill A2 T12: Dracula way out Nimble d10+Mask vs 8 | d10 = 1, d6 = 1 (2) |
| R282 | Drill A2 T12: Dracula local chase round 1 ground | d6 = 5 |
| R283 | Drill A2 T12: Dracula chase r1 Charm d10 (Garlic)+Monster (Hypnotic Eyes) vs 12 | d10 = 7, d10 = 4 (11) |
| R284 | Drill A2 T12: Dracula local chase round 2 ground | d6 = 5 |
| R285 | Drill A2 T12: Dracula chase r2 Charm d10 (Garlic)+Monster (Hypnotic Eyes) vs 12 | d10 = 1, d10 = 5 (6) |
| R286 | Drill A2 flight round 1 ground | d6 = 3 |
| R287 | Drill A2 flight r1: Creature (carrying) Brawn d12+Monster vs 11 | d12 = 7, d10 = 9 (16) |
| R288 | Drill A2 flight r1: Dracula Nimble d10 (Garlic -1, Hedge Spell +1)+Monster vs 11 | d10 = 10, d10 = 1 (11) |
| R289 | Drill A2 flight r1: Witch Brawn d6+Monster vs 11 | d6 = 6, d10 = 5 (11) |
| R290 | Drill A2 flight round 2 ground | d6 = 3 |
| R291 | Drill A2 flight r2: Creature (carrying) Brawn d12+Monster vs 11 | d12 = 3, d10 = 4 (7) |
| R292 | Drill A2 flight r2: Dracula Nimble d10 (Garlic -1, overdrawn Hedge Spell +1)+Monster vs 11 | d10 = 2, d10 = 8 (10) |
| R293 | Drill A2 flight r2: Witch Brawn d8 (overdrawn Hedge Spell)+Monster vs 11 | d8 = 4, d10 = 2 (6) |
| R294 | Drill A2 flight round 3 ground | d6 = 4 |
| R295 | Drill A2 flight r3: Creature Brawn d10 (Brute Force, Fire -1)+Monster vs 11 | d10 = 1, d10 = 6 (7) |
| R296 | Drill A2 flight r3: Dracula Nimble d8 (Garlic)+Monster vs 11 | d8 = 7, d10 = 8 (15) |
| R297 | Drill A2 flight r3: Witch Wits d10 (Rowan)+Monster vs 11 | d10 = 1, d10 = 9 (10) |
| R298 | Drill A2 flight round 4 ground | d6 = 6 |
| R299 | Drill A2 flight r4: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 5, d10 = 10 (15) |
| R300 | Drill A2 flight r4: Dracula Nimble d8 (Bat, Garlic)+Monster vs 11 | d8 = 8, d10 = 6 (14) |
| R301 | Drill A2 flight r4: Witch Wits d10 (Rowan)+Monster vs 11 | d10 = 8, d10 = 3 (11) |
| R302 | Drill A2 flight round 5 ground | d6 = 2 |
| R303 | Drill A2 flight r5: Creature Brawn d10 (Brute Force, Fire)+Monster vs 11 | d10 = 8, d10 = 9 (17) |
| R304 | Drill A2 flight r5: Dracula Nimble d8 (Garlic)+Monster vs 11 | d8 = 5, d10 = 7 (12) |
| R305 | Drill A2 flight r5: Witch Sly d8 (Rowan)+Monster vs 11 | d8 = 6, d10 = 10 (16) |
| R306 | Drill A2 flight round 6 ground | d6 = 6 |
| R307 | Drill A2 flight r6: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 10, d10 = 8 (18) |
| R308 | Drill A2 flight r6: Dracula Brawn d6 (Garlic)+Monster vs 11 | d6 = 2, d10 = 6 (8) |
| R309 | Drill A2 flight r6: Witch Wits d10 (Rowan)+Monster vs 11 | d10 = 4, d10 = 5 (9) |
| R310 | Drill A2 flight round 7 ground | d6 = 3 |
| R311 | Drill A2 flight r7: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 10, d10 = 9 (19) |
| R312 | Drill A2 flight r7: Dracula Nimble d8 (Garlic)+Monster vs 11 | d8 = 7, d10 = 3 (10) |
| R313 | Drill A2 flight r7: Witch Brawn d4 (Rowan)+Monster vs 11 | d4 = 1, d10 = 9 (10) |
| R314 | Drill A2 flight round 8 ground | d6 = 6 |
| R315 | Drill A2 flight r8: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 9, d10 = 7 (16) |
| R316 | Drill A2 flight r8: Dracula Brawn d6 (Garlic)+Monster vs 11 | d6 = 2, d10 = 4 (6) |
| R317 | Drill A2 flight r8: Witch Wits d10 (Rowan)+Monster vs 11 | d10 = 5, d10 = 3 (8) |
| R318 | Drill A2 flight round 9 ground | d6 = 6 |
| R319 | Drill A2 flight r9: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 2, d10 = 5 (7) |
| R320 | Drill A2 flight r9: Dracula Brawn d6 (Garlic)+Monster vs 11 | d6 = 5, d10 = 10 (15) |
| R321 | Drill A2 flight r9: Witch Wits d10 (Rowan)+Monster vs 11 | d10 = 5, d10 = 6 (11) |
| R322 | Drill A2 flight round 10 ground | d6 = 6 |
| R323 | Drill A2 flight r10: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 6, d10 = 6 (12) |
| R324 | Drill A2 flight r10: Dracula Brawn d6 (Garlic)+Monster vs 11 | d6 = 4, d10 = 4 (8) |
| R325 | Drill A2 flight r10: Witch Wits d10 (Rowan)+Monster vs 11 | d10 = 10, d10 = 8 (18) |
| R326 | Drill B flight round 1 ground | d6 = 5 |
| R327 | Drill B r1: Werewolf Wits d8 (Keen Nose)+Monster vs 11 | d8 = 7, d10 = 7 (14) |
| R328 | Drill B r1: Invisible Man Sly d12+Monster vs 11 | d12 = 5, d10 = 6 (11) |
| R329 | Drill B r1: Mummy Wits d12 (Ancient Lore)+Monster vs 11 | d12 = 7, d10 = 6 (13) |
| R330 | Drill B r1: Creature Brawn d12 (Brute Force)+Monster vs 11 | d12 = 2, d10 = 1 (3) |
| R331 | Drill B flight round 2 ground | d6 = 2 |
| R332 | Drill B r2: Werewolf Nimble d12+Monster vs 11 | d12 = 2, d10 = 5 (7) |
| R333 | Drill B r2: Invisible Man Sly d12+Monster vs 11 | d12 = 8, d10 = 7 (15) |
| R334 | Drill B r2: Mummy Wits d12 (overdrawn Ancient Lore)+Monster vs 11 | d12 = 5, d10 = 1 (6) |
| R335 | Drill B r2: Creature Brawn d12 (Brute Force)+Monster vs 11 | d12 = 2, d10 = 10 (12) |
| R336 | Drill B flight round 3 ground | d6 = 5 |
| R337 | Drill B r3: Werewolf Wits d6 (Keen Nose, Hounds)+Monster vs 11 | d6 = 2, d10 = 6 (8) |
| R338 | Drill B r3: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 2, d10 = 3 (5) |
| R339 | Drill B r3: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 3, d10 = 6 (9) |
| R340 | Drill B r3: Creature Sly d4 (Fire)+Monster vs 11 | d4 = 4, d10 = 3 (7) |
| R341 | Drill B flight round 4 ground | d6 = 1 |
| R342 | Drill B r4: Werewolf Sly d4 (Hounds)+Monster vs 11 | d4 = 4, d10 = 10 (14) |
| R343 | Drill B r4: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 9, d10 = 10 (19) |
| R344 | Drill B r4: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 5, d10 = 6 (11) |
| R345 | Drill B r4: Creature Sly d4 (Fire)+Monster vs 11 | d4 = 3, d10 = 8 (11) |
| R346 | Drill B flight round 5 ground | d6 = 2 |
| R347 | Drill B r5: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 9, d10 = 10 (19) |
| R348 | Drill B r5: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 9, d10 = 10 (19) |
| R349 | Drill B r5: Mummy Sly d4 (Loose Thread)+Monster vs 11 | d4 = 3, d10 = 9 (12) |
| R350 | Drill B r5: Creature Nimble d6 (Fire)+Monster vs 11 | d6 = 2, d10 = 9 (11) |
| R351 | Drill B flight round 6 ground | d6 = 4 |
| R352 | Drill B r6: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 8, d10 = 4 (12) |
| R353 | Drill B r6: Invisible Man Wits d8 (Flour)+Monster vs 11 | d8 = 1, d10 = 8 (9) |
| R354 | Drill B r6: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 6, d10 = 2 (8) |
| R355 | Drill B r6: Creature Wits d8 (Fire)+Monster vs 11 | d8 = 1, d10 = 5 (6) |
| R356 | Drill B flight round 7 ground | d6 = 2 |
| R357 | Drill B r7: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 9, d10 = 1 (10) |
| R358 | Drill B r7: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 3, d10 = 2 (5) |
| R359 | Drill B r7: Mummy Sly d4 (Loose Thread)+Monster vs 11 | d4 = 1, d10 = 10 (11) |
| R360 | Drill B r7: Creature Nimble d6 (Fire)+Monster vs 11 | d6 = 1, d10 = 1 (2) |
| R361 | Drill B flight round 8 ground | d6 = 2 |
| R362 | Drill B r8: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 4, d10 = 6 (10) |
| R363 | Drill B r8: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 7, d10 = 10 (17) |
| R364 | Drill B r8: Mummy Sly d4 (Loose Thread)+Monster vs 11 | d4 = 4, d10 = 6 (10) |
| R365 | Drill B r8: Creature Nimble d6 (Fire)+Monster vs 11 | d6 = 6, d10 = 6 (12) |
| R366 | Drill B flight round 9 ground | d6 = 5 |
| R367 | Drill B r9: Werewolf Sly d4 (Hounds)+Monster vs 11 | d4 = 3, d10 = 9 (12) |
| R368 | Drill B r9: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 3, d10 = 7 (10) |
| R369 | Drill B r9: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 5, d10 = 3 (8) |
| R370 | Drill B r9: Creature Sly d4 (Fire)+Monster vs 11 | d4 = 1, d10 = 7 (8) |
| R371 | Drill B flight round 10 ground | d6 = 3 |
| R372 | Drill B r10: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 2, d10 = 5 (7) |
| R373 | Drill B r10: Invisible Man Nimble d6 (Flour)+Monster vs 11 | d6 = 1, d10 = 7 (8) |
| R374 | Drill B r10: Mummy Brawn d8 (Loose Thread)+Monster vs 11 | d8 = 8, d10 = 3 (11) |
| R375 | Drill B r10: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 5, d10 = 2 (7) |
| R376 | Drill B flight round 11 ground | d6 = 2 |
| R377 | Drill B r11: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 10, d10 = 3 (13) |
| R378 | Drill B r11: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 2, d10 = 8 (10) |
| R379 | Drill B r11: Mummy Sly d4 (Loose Thread)+Monster vs 11 | d4 = 1, d10 = 7 (8) |
| R380 | Drill B r11: Creature Nimble d6 (Fire)+Monster vs 11 | d6 = 4, d10 = 10 (14) |
| R381 | Drill B flight round 12 ground | d6 = 2 |
| R382 | Drill B r12: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 8, d10 = 8 (16) |
| R383 | Drill B r12: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 1, d10 = 10 (11) |
| R384 | Drill B r12: Mummy Sly d4 (Loose Thread)+Monster vs 11 | d4 = 3, d10 = 3 (6) |
| R385 | Drill B r12: Creature Nimble d6 (Fire)+Monster vs 11 | d6 = 4, d10 = 9 (13) |
| R386 | Drill B flight round 13 ground | d6 = 4 |
| R387 | Drill B r13: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 4, d10 = 10 (14) |
| R388 | Drill B r13: Invisible Man Wits d8 (Flour)+Monster vs 11 | d8 = 8, d10 = 6 (14) |
| R389 | Drill B r13: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 8, d10 = 5 (13) |
| R390 | Drill B r13: Creature Wits d8 (Fire)+Monster vs 11 | d8 = 5, d10 = 4 (9) |
| R391 | Drill B flight round 14 ground | d6 = 1 |
| R392 | Drill B r14: Werewolf Sly d4 (Hounds)+Monster vs 11 | d4 = 2, d10 = 10 (12) |
| R393 | Drill B r14: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 3, d10 = 5 (8) |
| R394 | Drill B r14: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 2, d10 = 4 (6) |
| R395 | Drill B r14: Creature Sly d4 (Fire)+Monster vs 11 | d4 = 1, d10 = 5 (6) |
| R396 | Drill B flight round 15 ground | d6 = 5 |
| R397 | Drill B r15: Werewolf Sly d4 (Hounds)+Monster vs 11 | d4 = 1, d10 = 7 (8) |
| R398 | Drill B r15: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 10, d10 = 3 (13) |
| R399 | Drill B r15: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 1, d10 = 4 (5) |
| R400 | Drill B r15: Creature Sly d4 (Fire)+Monster vs 11 | d4 = 3, d10 = 1 (4) |
| R401 | Drill B flight round 16 ground | d6 = 6 |
| R402 | Drill B r16: Werewolf Brawn d8 (Hounds)+Monster vs 11 | d8 = 2, d10 = 5 (7) |
| R403 | Drill B r16: Invisible Man Wits d8 (Flour)+Monster vs 11 | d8 = 4, d10 = 1 (5) |
| R404 | Drill B r16: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 7, d10 = 7 (14) |
| R405 | Drill B r16: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 3, d10 = 2 (5) |
| R406 | Drill B flight round 17 ground | d6 = 3 |
| R407 | Drill B r17: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 10, d10 = 3 (13) |
| R408 | Drill B r17: Invisible Man Nimble d6 (Flour)+Monster vs 11 | d6 = 3, d10 = 6 (9) |
| R409 | Drill B r17: Mummy Brawn d8 (Loose Thread)+Monster vs 11 | d8 = 6, d10 = 9 (15) |
| R410 | Drill B r17: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 3, d10 = 6 (9) |
| R411 | Drill B flight round 18 ground | d6 = 6 |
| R412 | Drill B r18: Werewolf Brawn d8 (Hounds)+Monster vs 11 | d8 = 1, d10 = 6 (7) |
| R413 | Drill B r18: Invisible Man Wits d8 (Flour)+Monster vs 11 | d8 = 2, d10 = 2 (4) |
| R414 | Drill B r18: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 6, d10 = 4 (10) |
| R415 | Drill B r18: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 5, d10 = 4 (9) |
| R416 | Drill B flight round 19 ground | d6 = 4 |
| R417 | Drill B r19: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 7, d10 = 10 (17) |
| R418 | Drill B r19: Invisible Man Wits d8 (Flour)+Monster vs 11 | d8 = 4, d10 = 9 (13) |
| R419 | Drill B r19: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 6, d10 = 10 (16) |
| R420 | Drill B r19: Creature Wits d8 (Fire)+Monster vs 11 | d8 = 8, d10 = 3 (11) |
| R421 | Drill B flight round 20 ground | d6 = 6 |
| R422 | Drill B r20: Werewolf Brawn d8 (Hounds)+Monster vs 11 | d8 = 1, d10 = 5 (6) |
| R423 | Drill B r20: Invisible Man Wits d8 (Flour)+Monster vs 11 | d8 = 6, d10 = 8 (14) |
| R424 | Drill B r20: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 4, d10 = 3 (7) |
| R425 | Drill B r20: Creature Brawn d10 (Fire)+Monster vs 11 | d10 = 9, d10 = 6 (15) |
| R426 | Drill B flight round 21 ground | d6 = 4 |
| R427 | Drill B r21: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 3, d10 = 8 (11) |
| R428 | Drill B r21: Invisible Man Wits d8 (Flour)+Monster vs 11 | d8 = 6, d10 = 5 (11) |
| R429 | Drill B r21: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 3, d10 = 7 (10) |
| R430 | Drill B r21: Creature Wits d8 (Fire)+Monster vs 11 | d8 = 6, d10 = 5 (11) |
| R431 | Drill B flight round 22 ground | d6 = 5 |
| R432 | Drill B r22: Werewolf Sly d4 (Hounds)+Monster vs 11 | d4 = 1, d10 = 9 (10) |
| R433 | Drill B r22: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 10, d10 = 4 (14) |
| R434 | Drill B r22: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 4, d10 = 3 (7) |
| R435 | Drill B r22: Creature Sly d4 (Fire)+Monster vs 11 | d4 = 3, d10 = 8 (11) |
| R436 | Drill B flight round 23 ground | d6 = 2 |
| R437 | Drill B r23: Werewolf Nimble d10 (Hounds)+Monster vs 11 | d10 = 10, d10 = 1 (11) |
| R438 | Drill B r23: Invisible Man Sly d10 (Flour)+Monster vs 11 | d10 = 4, d10 = 10 (14) |
| R439 | Drill B r23: Mummy Sly d4 (Loose Thread)+Monster vs 11 | d4 = 4, d10 = 4 (8) |
| R440 | Drill B r23: Creature Nimble d6 (Fire)+Monster vs 11 | d6 = 2, d10 = 9 (11) |
| R441 | Drill C T2: Tell check hatter (4 arrive) | d6 = 2 |
| R442 | Drill C T2: Familiar's Warning second d6 | d6 = 3 |
| R443 | Drill C T2: whose Tell (1 Dracula, 2 Mummy, 3 Witch, 4 IM) | d4 = 3 |
| R444 | Drill C T3 group: Dracula Charm d12+Monster (Hypnotic Eyes) vs 10 | d12 = 11, d10 = 9 (20) |
| R445 | Drill C T3 group: Mummy Wits d12 (Ancient Lore)+Monster vs 10 | d12 = 11, d10 = 6 (17) |
| R446 | Drill C T3 group: Witch Charm d10 (Hedge Spell)+Monster vs 10 | d10 = 8, d10 = 8 (16) |
| R447 | Drill C T3 group: IM Charm d8 (Duty)+Monster (Unseen) vs 10 | d8 = 4, d10 = 3 (7) |
| R448 | Drill C T4: IM way A Charm d8 (Duty)+Monster (Unseen) vs 10 | d8 = 7, d10 = 3 (10) |
| R449 | Drill C T4 group ob2: Dracula Nimble d10 (Bat)+Monster vs 10 | d10 = 2, d10 = 2 (4) |
| R450 | Drill C T4 group ob2: Mummy Wits d12 (Ancient Lore)+Monster vs 10 | d12 = 2, d10 = 8 (10) |
| R451 | Drill C T4 group ob2: Witch Sly d12 (Hedge Spell)+Monster vs 10 | d12 = 3, d10 = 6 (9) |
| R452 | Drill C T4: Dracula local chase round 1 ground | d6 = 1 |
| R453 | Drill C T4: Dracula chase r1 Charm d10 (Garlic)+Monster (Hypnotic Eyes) vs 12 | d10 = 3, d10 = 5 (8) |
| R454 | Drill D T4: Tell check lock-up (Dracula brought in) | d6 = 5 |
| R455 | Drill D T5: Dracula slip free Nimble d10+Mask vs 10 | d10 = 1, d6 = 5 (6) |
| R456 | Drill D T6: Dracula slip free open (Mesmerise) Charm d12+Mask vs 8 | d12 = 2, d6 = 2 (4) |
| R457 | Drill D T6: Witch rescue Sly d10 (Cost -1, Hedge Spell +1)+Mask vs 10 | d10 = 8, d6 = 2 (10) |
| R458 | Drill E dawn flight round 1 ground | d6 = 5 |
| R459 | Drill E r1: Mummy Wits d12 (Ancient Lore)+Monster vs 11 | d12 = 5, d10 = 3 (8) |
| R460 | Drill E r1: Ghost Sly d10 (Cold Iron -1, Chill +1)+Monster vs 11 | d10 = 9, d10 = 8 (17) |
| R461 | Drill E dawn flight round 2 ground | d6 = 3 |
| R462 | Drill E r2: Mummy Wits d12 (overdrawn Ancient Lore)+Monster vs 11 | d12 = 10, d10 = 7 (17) |
| R463 | Drill E r2: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 3, d10 = 5 (8) |
| R464 | Drill E dawn flight round 3 ground | d6 = 3 |
| R465 | Drill E r3: Mummy Brawn d8 (Loose Thread)+Monster vs 11 | d8 = 8, d10 = 8 (16) |
| R466 | Drill E r3: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 1, d10 = 8 (9) |
| R467 | Drill E dawn flight round 4 ground | d6 = 5 |
| R468 | Drill E r4: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 4, d10 = 3 (7) |
| R469 | Drill E r4: Ghost Sly d8 (Cold Iron)+Monster vs 11 | d8 = 1, d10 = 10 (11) |
| R470 | Drill E dawn flight round 5 ground | d6 = 6 |
| R471 | Drill E r5: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 2, d10 = 4 (6) |
| R472 | Drill E r5: Ghost Wits d4 (Cold Iron)+Monster vs 11 | d4 = 4, d10 = 9 (13) |
| R473 | Drill E dawn flight round 6 ground | d6 = 6 |
| R474 | Drill E r6: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 3, d10 = 1 (4) |
| R475 | Drill E r6: Ghost Wits d4 (Cold Iron)+Monster vs 11 | d4 = 1, d10 = 3 (4) |
| R476 | Drill E dawn flight round 7 ground | d6 = 2 |
| R477 | Drill E r7: Mummy Sly d4 (Loose Thread)+Monster vs 11 | d4 = 3, d10 = 3 (6) |
| R478 | Drill E r7: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 4, d10 = 6 (10) |
| R479 | Drill E dawn flight round 8 ground | d6 = 6 |
| R480 | Drill E r8: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 10, d10 = 7 (17) |
| R481 | Drill E r8: Ghost Wits d4 (Cold Iron)+Monster vs 11 | d4 = 1, d10 = 6 (7) |
| R482 | Drill E dawn flight round 9 ground | d6 = 3 |
| R483 | Drill E r9: Mummy Brawn d8 (Loose Thread)+Monster vs 11 | d8 = 5, d10 = 8 (13) |
| R484 | Drill E r9: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 7, d10 = 7 (14) |
| R485 | Drill E dawn flight round 10 ground | d6 = 3 |
| R486 | Drill E r10: Mummy Brawn d8 (Loose Thread)+Monster vs 11 | d8 = 4, d10 = 1 (5) |
| R487 | Drill E r10: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 4, d10 = 9 (13) |
| R488 | Drill E dawn flight round 11 ground | d6 = 2 |
| R489 | Drill E r11: Mummy Sly d4 (Loose Thread)+Monster vs 11 | d4 = 4, d10 = 4 (8) |
| R490 | Drill E r11: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 10, d10 = 7 (17) |
| R491 | Drill E dawn flight round 12 ground | d6 = 4 |
| R492 | Drill E r12: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 3, d10 = 8 (11) |
| R493 | Drill E r12: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 4, d10 = 3 (7) |
| R494 | Drill E dawn flight round 13 ground | d6 = 4 |
| R495 | Drill E r13: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 4, d10 = 4 (8) |
| R496 | Drill E r13: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 7, d10 = 6 (13) |
| R497 | Drill E dawn flight round 14 ground | d6 = 2 |
| R498 | Drill E r14: Mummy Sly d4 (Loose Thread)+Monster vs 11 | d4 = 2, d10 = 10 (12) |
| R499 | Drill E r14: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 4, d10 = 7 (11) |
| R500 | Drill E dawn flight round 15 ground | d6 = 1 |
| R501 | Drill E r15: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 3, d10 = 9 (12) |
| R502 | Drill E r15: Ghost Sly d8 (Cold Iron)+Monster vs 11 | d8 = 1, d10 = 5 (6) |
| R503 | Drill E dawn flight round 16 ground | d6 = 3 |
| R504 | Drill E r16: Mummy Brawn d8 (Loose Thread)+Monster vs 11 | d8 = 2, d10 = 4 (6) |
| R505 | Drill E r16: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 1, d10 = 4 (5) |
| R506 | Drill E dawn flight round 17 ground | d6 = 6 |
| R507 | Drill E r17: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 1, d10 = 6 (7) |
| R508 | Drill E r17: Ghost Wits d4 (Cold Iron)+Monster vs 11 | d4 = 1, d10 = 8 (9) |
| R509 | Drill E dawn flight round 18 ground | d6 = 3 |
| R510 | Drill E r18: Mummy Brawn d8 (Loose Thread)+Monster vs 11 | d8 = 8, d10 = 7 (15) |
| R511 | Drill E r18: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 3, d10 = 6 (9) |
| R512 | Drill E dawn flight round 19 ground | d6 = 5 |
| R513 | Drill E r19: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 5, d10 = 1 (6) |
| R514 | Drill E r19: Ghost Sly d8 (Cold Iron)+Monster vs 11 | d8 = 7, d10 = 4 (11) |
| R515 | Drill E dawn flight round 20 ground | d6 = 1 |
| R516 | Drill E r20: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 1, d10 = 8 (9) |
| R517 | Drill E r20: Ghost Sly d8 (Cold Iron)+Monster vs 11 | d8 = 4, d10 = 6 (10) |
| R518 | Drill E dawn flight round 21 ground | d6 = 5 |
| R519 | Drill E r21: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 2, d10 = 10 (12) |
| R520 | Drill E r21: Ghost Sly d8 (Cold Iron)+Monster vs 11 | d8 = 5, d10 = 3 (8) |
| R521 | Drill E dawn flight round 22 ground | d6 = 6 |
| R522 | Drill E r22: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 3, d10 = 7 (10) |
| R523 | Drill E r22: Ghost Wits d4 (Cold Iron)+Monster vs 11 | d4 = 2, d10 = 7 (9) |
| R524 | Drill E dawn flight round 23 ground | d6 = 5 |
| R525 | Drill E r23: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 3, d10 = 9 (12) |
| R526 | Drill E r23: Ghost Sly d8 (Cold Iron)+Monster vs 11 | d8 = 5, d10 = 6 (11) |
| R527 | Drill E dawn flight round 24 ground | d6 = 5 |
| R528 | Drill E r24: Mummy Charm d6 (Loose Thread)+Monster vs 11 | d6 = 5, d10 = 6 (11) |
| R529 | Drill E r24: Ghost Sly d8 (Cold Iron)+Monster vs 11 | d8 = 6, d10 = 6 (12) |
| R530 | Drill E dawn flight round 25 ground | d6 = 3 |
| R531 | Drill E r25: Mummy Brawn d8 (Loose Thread)+Monster vs 11 | d8 = 7, d10 = 5 (12) |
| R532 | Drill E r25: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 10, d10 = 3 (13) |
| R533 | Drill E dawn flight round 26 ground | d6 = 4 |
| R534 | Drill E r26: Mummy Wits d10 (Loose Thread)+Monster vs 11 | d10 = 5, d10 = 5 (10) |
| R535 | Drill E r26: Ghost Nimble d10 (Cold Iron)+Monster vs 11 | d10 = 9, d10 = 4 (13) |
