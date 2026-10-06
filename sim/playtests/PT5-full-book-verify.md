# PT5: verification playtest of the first full draft (Gallowsmere twice, a rolled Standard town, seven drills)

## 1. What this is

A verification playtest after B3 (gentler local chases, shorter final flights, overdraw once per flight, cornered-at-the-Limit captured first, small entrances only on maps), B4 (the Witch's Broomstick opens with Nimble), C22 (the Entity Sheet and the At the Table page) and the PT4 wording fixes. It is also the first playtest of a premade town from Chapter 9.

**Rules source:** the rulebook text only: `book/src/chapters/11-ch01.html` to `17-ch07.html`, `31-ch08.html`, `32-ch09.html`, `40-entity-sheet.html` and `41-reference.html`, read as text. Not the simulator, not `docs/`, not the Foundry code. Where the book is silent I made a ruling, listed it in section 4, and logged it as a finding in section 8.

**The book changed during the playtest.** I started on commit 20a151a (C22). B5 (commit 39bda22) landed while the main lines were being played: the Werewolf's Fetch now reads "you know the way home. The way out is 1 easier while you're there, and a final flight you're in starts at Lead 3." No other chapter changed. Fetch only appears in the Standard line (rolled as a random Perk after B5 landed), so everything here is played against the current text.

**Dice:** every random result is a real `Math.random` roll, numbered R1 onward and listed in section 10. Drills say exactly what I chose at their start; every roll after that is real. I played the players to win and the Storyteller by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now").

**Why Gallowsmere twice.** The first party (main line A) was forked on Turn 2: one Trouble at a watched obstacle started a 13-round local chase that took Suspicion from 3 to the Limit. That is a finding in itself, but it left most of Gallowsmere unplayed, so a second party (main line B, freshly rolled) raided the same town to the end.

---

## 2. Summary

| Line | What it puts through the text | Result | Ended | Suspicion |
|---|---|---|---|---|
| **Main line A**: Gallowsmere (Hard), 4 Entities, defaults | The premade town as printed; a Hard local chase; the Limit in the round Jekyll was cornered; a Hard final flight with 3 | **Forked** (Jekyll captured and left in the lock-up) | The Limit on **Turn 2** (13-round local chase); flight forked in round 2 | 15 of 15 |
| **Main line B**: Gallowsmere again, 4 new Entities, defaults (two Duty clashes) | Every location, the furniture behind a group obstacle, carrying a Bulky piece two Turns, the Hard way out (10) | **Grand Year**: all 5 items and the suit of armour | Out on Turn 10 | 12 of 15 |
| **Standard line**: a town rolled on Chapter 8's tables, 3 Entities, random picks | Every Chapter 8 table, the ceiling, random picks (d6), Fetch on the way out, a Huge piece with two carriers | **Grand Year**: all 5 items and the grandfather clock | Out on Turn 9 | 6 of 11 |
| Drill a1: a Standard final flight | Escape at 5; switch abilities on other Entities' rolls; a free round-2 overdraw | Escaped in **3 rounds** | — | — |
| Drill a2: a Hard final flight | Escape at 6 with 4 Entities; J&H's Draught by overdraw; Practised Hand every round | Escaped in **22 rounds** (198 dice) | — | — |
| Drills b–g | see section 7 | (in progress) | | |

**Fix targets and where each was exercised**

| Target | Where | Rolls |
|---|---|---|
| B3: local mob 8 + half Suspicion (at most 12) | Main A (13 rounds, mob 9 → 12); drill b | R17–R55 |
| B3: Easy/Standard Limit 11, flight escape at 5 (6 on Hard) | Standard line (Limit 11, never reached); drill a1 (escape at 5); main A, drill a2 (escape at 6) | R56–R69, R219–R421 |
| B3: overdraw once per flight | Drills a1 (Mummy, round 2), a2 (J&H, round 2), c | R231, R256 |
| B3: cornered in the round the Limit comes: captured first | **Main A, naturally** (R54–R55); drill d | R54–R55 |
| B3: small entrances only where a map marks them | Standard line: a Huge clock carried in a rolled town ("no entrance is small"); Gallowsmere's map marks none | — |
| B4: Broomstick opens with Nimble | Drill e | — |
| C22: Entity Sheet and At the Table | Used throughout; notes in 9.2 | — |
| PT4 wording fixes | Section 8.4 checks each PT4 finding | — |
| Chapter 9: Gallowsmere as printed | Main A and main B | R1–R114 |
| Chapter 8: Rolling a Town (all tables) | Standard line | R115–R193 |
| B5 (landed mid-playtest): Fetch on the way out | Standard line, the way out at 7 | R217–R218 |

**Counts: see section 8 (in progress).**

---

## 3. Setup

### 3.1 Gallowsmere as Chapter 9 prints it

Hard: Limit 15, the way out 10, the lock-up 12, the final flight mob 11 escaping at Lead 6; a local chase from Lead 1 to 4 against 8 + half the Suspicion (at most 12). Five items, two essentials: **a new lock for the dungeon** (the smithy, tools), **the silver spoons** (the silversmith, silver), black-edged writing paper (the printer, books), bandages (the tailor, cloth), a side of bacon (the butcher, food). The furniture: a suit of armour (Bulky) at the tailor, behind a heavy cellar trapdoor (Brawn, 12, not watched). Every location is watched (the map's eyes agree), and so are the way out and the lock-up. Lantern Night: bells rung every hour. Villagers: Granny Mott (practising the bells) and a gang of children (gossiping, loudly).

I checked the page against the rules: two natural 12s are allowed on Hard and the town has one (the tug-of-war); the furniture's 12 is 10 + 2 and doesn't count; the list, the numbers line and the map's eyes match. No errors found on the page.

### 3.2 Main line A party (R1–R4)

d8 in the book's order (1 Dracula … 8 Jekyll & Hyde): R1 = 8, R2 = 5, R3 = 4, R4 = 6. Defaults for every pick; the default Duties don't clash. 3 charges each.

| Entity | Brawn | Nimble | Sly | Charm | Wits | Signature | Gift | Perk | Duty (item here) | Weakness |
|---|---|---|---|---|---|---|---|---|---|---|
| Jekyll & Hyde | d4 / d12 | d6 / d10 | d8 / d8 | d12 / d4 | d10 / d6 | The Draught | Doctor's Bag (raise) | Practised Hand | Librarian (the paper) | A Familiar Face (Soon) |
| The Invisible Man | d4 | d8 | d12 | d6 | d10 | Unseen (hidden Monster) | Through the Gap (open with Nimble) | Out of Sight | Tailor (the bandages) | Flour (Soon) |
| The Werewolf | d10 | d12 | d6 | d4 | d8 | Good Dog (hidden Monster) | Keen Nose (Wits instead) | Night Runner | Gardener (none) | Hounds (Soon) |
| A Ghost | d4 | d12 | d10 | d8 | d6 | Through the Wall (open with Sly) | Chill (raise) | Spectral | Butler (the spoons) | Cold Iron (Always) |

J&H starts as Jekyll (my ruling; the book doesn't say, finding M3).

### 3.3 Main line B party (R70–R78)

R70 = 6, R71 = 3, R72 = 8, R73 = 1 (R74, R75 unused). Defaults, 3 charges each.

| Entity | Dice | Signature | Gift | Perk | Duty | Weakness |
|---|---|---|---|---|---|---|
| A Ghost | as above | Through the Wall | Chill | Spectral | Butler (the spoons) | Cold Iron (Always) |
| The Mummy | Brawn d10 · Nimble d4 · Sly d6 · Charm d8 · Wits d12 | Ancient Lore (Wits instead) | Royal Bearing (open with Charm) | Patience of Ages | Librarian (the paper) | A Loose Thread (Soon) |
| Jekyll & Hyde | as above | The Draught | Doctor's Bag | Practised Hand | **Handyman** (the lock): its Librarian clashed with the Mummy's; the player picked | A Familiar Face (Soon) |
| Dracula | Brawn d8 · Nimble d10 · Sly d6 · Charm d12 · Wits d4 | Mesmerise (open with Charm) | Bat (Nimble instead) | Hypnotic Eyes | **Cook** (the bacon): its Butler clashed with the Ghost's; rolled R76 = 3 (Librarian, taken), R77 = 1 | Garlic (Always) |

### 3.4 Standard line: party, picks, list and town (R115–R193)

**Party** (d8): R115 = 6, R116 = 4, R117 = 6 (repeat), R118 = 4 (repeat), R119 = 1: **the Ghost, the Werewolf, Dracula**. **Picks at random** ("roll a d6: 1–2 the first option, 3–4 the second, 5–6 the third"); the Duty, which has six options, on the Duty table's d6 (my ruling, finding m5):

| Entity | Gift (R) | Perk (R) | Duty (R) |
|---|---|---|---|
| Ghost | Chill (R120 = 2) | Spectral (R121 = 2) | Butler (R122 = 4) |
| Werewolf | Through the Hedge, open with Brawn (R123 = 4) | **Fetch** (R124 = 6) | Handyman (R125 = 5) |
| Dracula | Wolf, raise (R126 = 5) | Wall-Crawler (R127 = 5) | Tailor (R128 = 6) |

**List** (Standard: 5 items). Essentials: R129 = 6, even: **two**.

| Item | Kind (R) | Item (R) | Essential | Location (R) | Obstacles (R, d20) |
|---|---|---|---|---|---|
| 1 | plants and seeds (R130 = 2) | seed potatoes (R131 = 1) | **yes** | L1 the seed merchant (R143, d3 = 3) | one (R148 = 3) |
| 2 | books and paper (R132 = 3) | black-edged writing paper (R133 = 2) | **yes** | L2 the bookseller (R144 = 1) | one (R149 = 5) |
| 3 | silver, china and linen (R134 = 4; Ghost's Duty) | a gravy boat (R135 = 6) | — | L3 the silversmith (R145, d2 = 1) | three (R150 = 17) |
| 4 | the writing paper again (R136 = 3, R137 = 2): rerolled R141 = 4, R142 = 4 | a lace tablecloth (Ghost's Duty) | — | L4 the china shop (R146, d2 = 2: "one item per place") | one (R151 = 3) |
| 5 | tools and hardware (R138 = 5; Werewolf's Duty) | a new lock for the dungeon (R139 = 2) | — | L5 the smithy (R147 = 1) | one (R152 = 4) |

Lantern Night (R140 = 5): a bonfire, and a straw monster burned at dawn. Furniture (R189 = 5): **a grandfather clock (Huge)** at L3 (R190, a d5 over the list's locations = 3).

| Location | Obstacle | Quiet / loud | Difficulty (d20) | Watched (d10) | Table (d20) |
|---|---|---|---|---|---|
| L1 seed merchant | Way A: a locked strongbox | Wits / Charm | 8 (R154 = 4) | no (R155 = 6) | R153 = 17 |
| | Way B: a cart blocking the alley | Brawn / Nimble | 8 (R157 = 9) | **yes** (R158 = 1) | R156 = 3 |
| L2 bookseller | Way A: a cart blocking the alley | Brawn / Nimble | 8 (R160 = 13) | no (R161 = 7) | R159 = 3 |
| | Way B: a guard dog | Charm / Nimble | 10 (R163 = 18) | no (R164 = 7) | R162 = 14 |
| L3 silversmith | Way A: the night watchman on his round | Wits | 6 (R166 = 2) | no (R167 = 8) | R165 = 19 |
| | Way B: a doorman checking invitations | Charm / Wits | 10 (R169 = 19) | **yes** (R170 = 2) | R168 = 15 |
| | 2: a nosy neighbour at her window | Sly / Wits | 8 (R172 = 4) | **yes** (R173 = 4) | R171 = 10 |
| | 3: a cart blocking the alley | Brawn / Nimble | **12** (R175 = 20) | **yes** (R176 = 2) | R174 = 3 |
| | Furniture: a cart blocking the alley | Brawn / Nimble | 8 + 2 = **10** (R192 = 10) | **yes** (R193 = 4) | R191 = 3 |
| L4 china shop | Way A: a rickety drainpipe | Nimble | 6 (R178 = 1) | no (R179 = 8) | R177 = 8 |
| | Way B: a bolted back gate | Brawn / Charm | 8 (R181 = 10) | **yes** (R182 = 5) | R180 = 4 |
| L5 smithy | Way A: the shopkeeper behind the counter | Charm / Sly | 10 (R184 = 19) | **yes** (R185 = 2) | R183 = 13 |
| | Way B: the night watchman on his round | Wits | 8 (R187 = 6) | **yes** (R188 = 5) | R186 = 19 |

No second way in needed a reroll (every pair has different quiet traits). Ceiling: one natural 12 (L3 ob3), within the Standard cap. Mix of the 12 non-furniture obstacles: two 6, six 8, three 10, one 12 (17 / 50 / 25 / 8%, against 15 / 50 / 30 / 5%). But **four of the five locations have a single obstacle** (the d20 gives one obstacle on 1–6, 30% a location), so four list items were each one roll away, two of them unwatched. Watched locations: L1, L3, L4, L5 (and the way out and the lock-up).

Fixed parts (Standard): the way out 8 (Sly or Nimble, or Brawn loud, watched), **7 while the Werewolf is there (Fetch)**; lock-up 10; local chase Lead 1 → 4 against 8 + half Suspicion; final flight Lead 2 → 5 against 11, **from Lead 3 with Fetch**; Limit 11; 12 Turns.

---

## 4. Standing readings (my rulings where the book is silent; each is a finding in section 8)

| # | Reading | Finding |
|---|---|---|
| S1 | Jekyll & Hyde starts each raid (and each drill, unless stated) as Jekyll. | M3 |
| S2 | The way out's Tell check comes the first time anyone comes back to it, not when the raid starts there. | m1 |
| S3 | Getting past the last obstacle without a roll (Spectral at a group obstacle) puts the item in hand, like beating it. | m2 |
| S4 | Spectral's "at no action" lets the Ghost get past a group obstacle in the same Turn it moves in. | m3 |
| S5 | The furniture's extra obstacle comes after the location's last obstacle: whoever takes it on, and every carrier, must be past every obstacle there (a group one by its own roll or Spectral). | m4 |
| S6 | A random Castle Duty is rolled on the Duty table's d6 (the 1–2 / 3–4 / 5–6 rule fits three options, not six). | m5 |
| S7 | In a premade town, the town's two villagers are the faces; the d6 villager table is for rolled towns. | m6 |
| S8 | A "use the ability's trait instead" ability works in a chase: it replaces the ground's traits, and (helping) the roller rolls its own die of that trait. | m7 |
| S9 | When the Limit comes during a local chase in the middle of a Turn, the flight starts at once; Entities who hadn't acted that Turn don't act. (I resolved main A's Turn 2 in the order Werewolf, Ghost, Invisible Man, Jekyll.) | — (the book's "counts at once" covers it) |
| S10 | A piece is taken at the start of the Turn the carriers begin to move (taking is free), so carrying Suspicion is charged only for the two Turns of the move. | m9 (PT4 m12, still open) |
| S11 | Repeated item on the list: both dice (kind and item) are rolled again. | — (either reading gives a new item) |
| S12 | A d12 raised (no effect) and then stepped down by a Cost stays a d12: "raises and steps down cancel out". | w4 |

---

## 5. Play log: main line A (Gallowsmere, Hard, 4 Entities)

Notation: trait die + second die = total vs Difficulty → result. "Shows" = the Monster die beat the trait die. Sus = Suspicion after the roll. Charges are shown as before → after.

**Plan.** Split four ways on Turn 1 to cover four locations: the Werewolf to the smithy (the garden wall, Nimble 8), the Ghost to the silversmith (its Butler Duty), Jekyll to the printer (Librarian), the Invisible Man to the tailor (Tailor). Skip the butcher (the bacon is the extra a Win can lose).

**Turn 1 (Sus 0).** Everyone moves in. Tell checks at the four watched locations:

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R5 | the smithy (Werewolf) | 3 | — | 0 |
| R6 | the silversmith (Ghost) | 4 | Cold Spot: candles gutter | 1 |
| R7 | the printer (Jekyll) | 1 | — | 1 |
| R8 | the tailor (Invisible Man) | 5 | Bandages and Goggles: a sneeze from nowhere | 2 |

**Turn 2 (Sus 2).**

| Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|
| R9–R10 | Werewolf, smithy way B (garden wall, Nimble / Brawn loud, 8, watched) | Nimble d12 + Monster under Good Dog (3 → 2): 83% | 6 + 2 | 8 vs 8 | Success | 2 |
| R11–R12 | Ghost, silversmith way B (shuttered window, Nimble 8, watched) | Through the Wall: Sly isn't listed, so Sly d10 → d12 (Butler) at 6, Mask (3 → 2): 86%, Trouble 4% | 6 + 4 | 10 vs 6 | Success (only the Ghost is through) | 2 |
| R15–R16 | Invisible Man, tailor way B (rickety drainpipe, Nimble 8, not watched) | Nimble d8 → d10 (Tailor), Mask | 8 + 1 | 9 vs 8 | Success | 2 |
| R13–R14 | Jekyll, printer way A (nosy neighbour, Sly / Wits loud, 8, watched) | Sly d8 → d10 (Librarian), Mask: 65%, Trouble 17%. (The other way in, the rooftops, is Nimble 10: 31%.) Face: Granny Mott | 1 + 1 | 2 vs 8 | **Trouble**, caught | 3 |

**Jekyll's local chase** (alone; Lead 1 → 4; mob 8 + half the Suspicion; Weakness from round 3):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R17 = 1 square | R18–R19 Jekyll Charm d12 + Mask | 4 + 3 | 7 vs 9 | Cost | 1 | 3 |
| 2 | R20 = 4 rooftops | R21–R22 Wits d10 → d12 (Doctor's Bag, 3 → 2) + Monster: Trouble now is capture | 5 + 9 (shows) | 14 vs 9 | Success; **Hyde takes over** | 2 | 5 |
| 3 | R23 = 4 rooftops | R24–R25 Hyde Nimble d10 → d8 (A Familiar Face) + Monster | 7 + 1 | 8 vs 10 | Cost | 2 | 5 |
| 4 | R26 = 1 square | R27–R28 back to Jekyll free (Practised Hand); Charm d12 → d10 + Monster | 2 + 8 (shows) | 10 vs 10 | Success; Hyde | 3 | 7 |
| 5 | R29 = 3 market stalls | R30–R31 Hyde Brawn d12 → d10, Doctor's Bag → d12 (2 → 1) + Monster | 6 + 3 | 9 vs 11 | Cost | 3 | 7 |
| 6 | R32 = 5 parade | R33–R34 Jekyll (free) Charm d10 + Monster | 2 + 1 | 3 vs 11 | Trouble | 2 | 8 |
| 7 | R35 = 2 back alleys | R36–R37 Jekyll Sly d8 → d6, Doctor's Bag → d8 (1 → 0) + Monster | 1 + 5 (shows) | 6 vs 12 | Trouble; Hyde | 1 | 10 |
| 8 | R38 = 4 rooftops | R39–R40 Hyde Nimble d8 + Monster; no overdraw (+2 would be certain) | 8 + 7 | 15 vs 12 | Success | 2 | 10 |
| 9 | R41 = 5 parade | R42–R43 Jekyll (free) Charm d10 + Monster | 5 + 8 (shows) | 13 vs 12 | Success; Hyde | 3 | 12 |
| 10 | R44 = 5 parade | R45–R46 Jekyll (free) Charm d10 + Monster | 5 + 1 | 6 vs 12 | Trouble | 2 | 13 |
| 11 | R47 = 1 square | R48–R49 Jekyll Charm d10 + **Mask**: a showing Monster would now reach the Limit with nothing in hand | 2 + 3 | 5 vs 12 | Trouble | 1 | 14 |
| 12 | R50 = 6 dead end | R51–R52 Jekyll Wits d8 + Mask (32% to keep the raid alive, against 20% with the Monster) | 6 + 5 | 11 vs 12 | Cost | 1 | 14 |
| 13 | R53 = 4 rooftops | R54–R55 Jekyll Wits d8 + Mask | 1 + 4 | 5 vs 12 | **Trouble: cornered, and the Limit** | 0 | **15** |

Mob by round: 9, 9, 10, 10, 11, 11, 12, then 12 (capped) to the end. Suspicion from the chase: four Monster shows (+8) and four Troubles (+4). By Chapter 5 ("anyone the same round cornered is captured first and stays behind"), Jekyll is captured and held at the lock-up (no Tell check: "nor a captive being brought in"), and the whole town hunts. It is still Turn 2. The party has no loot.

**Final flight** (Hard: Lead 2, escape at 6, mob 11; the Mask is off). The Werewolf (2 charges, Good Dog and Keen Nose: no help here), the Ghost (2, Chill; Cold Iron from round 1), the Invisible Man (3, Unseen and Through the Gap: **neither does anything in a flight**, and he can't overdraw while he holds charges).

| Round | Ground | Werewolf | Ghost | Invisible Man | S – T | Lead |
|---|---|---|---|---|---|---|
| 1 | R56 = 3 market stalls | R57–R58 Nimble d12: 7 + 3 = 10, Cost | R59–R60 Nimble d10 (Cold Iron): 3 + 4 = 7, Trouble | R61–R62 Nimble d10 (Chill, 2 → 1): 3 + 3 = 6, Trouble | 0 – 2 | 1 |
| 2 | R63 = 3 market stalls | R64–R65 8 + 1 = 9, Cost | R66–R67 3 + 1 = 4, Trouble | R68–R69 Nimble d10 (Chill, 1 → 0): 1 + 7 = 8, Trouble | 0 – 2 | **0: forked** |

**How the Year Went: Forked.** "The town tells the story for years. Next Lantern Night, the bells ring a little louder." Read literally, the epilogue then adds a line for each kind with an item that didn't come home: all five (turnip soup, nettles, no news, coffin lids, creaking doors). Jekyll, in the lock-up, was not in the flight; the book doesn't say whether he shares the party's fate (finding m11).

---

## 6. Play log: main line B (Gallowsmere again) and the Standard line

### 6.1 Main line B (Gallowsmere, Hard, 4 new Entities)

**Plan.** Dracula's Mesmerise opens any approach that doesn't list Charm at 2 lower with his Charm d12, so he takes the smithy (the garden wall and the watchman). The Ghost takes the silversmith (Butler). The Mummy takes the printer (Librarian). Jekyll goes to the tailor to be Hyde for the trapdoor (Brawn d12).

**Turn 1 (Sus 0).** Moves. Tell checks: R79 = 6 at the smithy (No Reflection, Sus 1); R80 = 3 the silversmith; R81 = 5 the printer (Dust and Spice, Sus 2); R82 = 2 the tailor.

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R83–R84 | Dracula, smithy way B (garden wall, 8, watched) | Mesmerise (3 → 2): Charm d12 at 6, Mask: 86% | 11 + 5 | 16 vs 6 | Success (only Dracula through) | 2 |
| 2 | R85–R86 | Ghost, silversmith way B (window, 8, watched) | Through the Wall (3 → 2): Sly d12 (Butler) at 6, Mask | 2 + 2 | 4 vs 6 | **Cost** (no Critical: not a Success). The Ghost's next roll is the guard dog (watched): **next trait die one size smaller** ("a smaller die before a hard roll") | 2 |
| 2 | R87–R88 | Mummy, printer way A (nosy neighbour, Sly / Wits loud, 8, watched) | Royal Bearing (3 → 2): Charm d8 → d10 (Librarian) at 6, Mask: 83% | 7 + 2 | 9 vs 6 | Success (only the Mummy through) | 2 |
| 2 | R89–R90 | Jekyll, tailor way B (drainpipe, Nimble 8, not watched) | The Draught to Hyde (3 → 2): he is wanted for the trapdoor. Nimble d10, Mask | 6 + 1 | 7 vs 8 | **Cost**; the drainpipe is beaten for the party. Next trait die one size smaller | 2 |
| 3 | R91–R92 | Dracula, smithy (the watchman, Wits 10, watched) | Mesmerise (2 → 1): Charm d12 at 8, Monster under Hypnotic Eyes (shows only on +2): Trouble 8% | 7 + 1 | 8 vs 8 | Success: **the lock** (essential) | 2 |
| 3 | R93–R94 | Ghost, silversmith (guard dog, Charm / Nimble loud, 8, watched) | Loud Nimble d12 (the Butler raise and the Cost's step down cancel: S12), Mask: 71% against 56% for Charm d8 | 10 + 6 | 16 vs 8 | Success; loud +1 | 3 |
| 3 | R95–R96 | Mummy, printer (back room, Wits 8, not watched) | Wits d12, Mask | 10 + 6 | 16 vs 8 | Success: **the paper** | 3 |
| 3 | R97 | Hyde moves to the butcher | Tell check | 2 | — | — | 3 |
| 4 | R98–R99 | Ghost, silversmith (strongbox, Wits / Charm loud, 10, not watched) | Through the Wall (2 → 1): Sly d12 (Butler) at 8, Mask | 3 + 5 | 8 vs 8 | Success: **the spoons** (essential) | 3 |
| 4 | R100–R101 | Hyde, butcher way A (geese, Sly / Nimble loud, 8, watched) | Sly d8, stepped down by the Cost and raised by Doctor's Bag (2 → 1): d8, Monster | 1 + 8 (shows) | 9 vs 8 | Success | 5 |
| 4 | — | Dracula moves to the butcher; the Mummy to the tailor | | | | | 5 |
| 5 | — | Ghost moves to the tailor, spends Chill (1 → 0) on the Mummy's roll, and passes the crowded shop floor (group) by **Spectral at no action** (S4): **the bandages** (S3) | | | | | 5 |
| 5 | R102–R103 | Mummy, tailor (crowded shop floor, group, Sly 10, watched) | Royal Bearing (2 → 1): Charm d8 → d10 (Chill) at 8, Mask. It must get past to reach the trapdoor (S5) | 5 + 2 | 7 vs 8 | **Cost**. "Lose a Turn" is barred (Patience of Ages); the next roll is the trapdoor at 12: **next trait die one size smaller** | 5 |
| 5 | R104–R105 | Jekyll (back free), butcher (shopkeeper, Charm / Sly loud, 10, watched) | Charm d12, Monster (Trouble 18% against 29% with the Mask). Dracula, holding the lock, doesn't risk it | 12 + 6 | 18 vs 10 | Success | 5 |
| 5 | R106 | Dracula moves to the way out (first return: S2) | Tell check | 4 | — | No Reflection | 6 |
| 6 | R107–R108 | Mummy, tailor furniture (heavy cellar trapdoor, Brawn 12, not watched) | Ancient Lore (1 → 0): Wits d12 → d10 (Cost), Monster: 45% | 2 + 3 (shows) | 5 vs 12 | Trouble (not watched: no chase); +2 | 8 |
| 6 | R109–R110 | Hyde (Draught 1 → 0), butcher (tug-of-war, group, Brawn 12, not watched) | Brawn d12, Monster | 11 + 9 | 20 vs 12 | Success: **the bacon** | 8 |
| 6 | — | The Ghost moves to the way out | | | | | 8 |
| 7 | R111–R112 | Mummy, the trapdoor again | Brawn d10 + Monster: 45% (no charges; no overdraw) | 8 + 10 (shows) | 18 vs 12 | Success | 10 |
| 7 | — | Hyde moves to the way out | | | | | 10 |
| 8–9 | — | The Mummy takes the suit of armour as it sets off (S10): a two-Turn move. **+1 at the end of Turn 8 and of Turn 9** | | | | | 12 |
| 10 | R113–R114 | Dracula, the way out (10, watched): he first hands the lock to the Ghost | Mesmerise (1 → 0): Charm d12 at 8, Monster under Hypnotic Eyes: Trouble 8% | 4 + 4 | 8 vs 8 | **Success, a Critical** (a charge back, 0 → 1). Everyone is out | 12 |

**How the Year Went: Grand Year.** Both essentials, all three extras and the armour; nobody left behind. "A year of plenty. The new piece goes in the great hall, and everyone pretends it was always there." No missing-kind lines.

### 6.2 Standard line (a rolled town, 3 Entities)

**Plan.** The two essentials are a single obstacle each: the bookseller's unwatched cart (Werewolf Brawn d10) and the seed merchant's cart (Dracula, Mesmerise at 6). The Ghost takes the china shop's unwatched drainpipe (6). Then the smithy (the Werewolf's Duty) and the silversmith (the Ghost's), where the clock stands.

**Turn 1 (Sus 0).** Moves. The bookseller is not watched (no check). R194 = 4 at the china shop (Cold Spot, Sus 1); R195 = 6 at the seed merchant (No Reflection, Sus 2).

| Turn | Roll | Who / where | Choice | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R196–R197 | Werewolf, bookseller way A (cart, Brawn 8, not watched) | Brawn d10, Mask | 10 + 2 | 12 vs 8 | Success: **the paper** (essential) | 2 |
| 2 | R198–R199 | Ghost, china shop way A (drainpipe, Nimble 6, not watched) | Nimble d12, Mask | 8 + 1 | 9 vs 6 | Success: **the tablecloth** | 2 |
| 2 | R200–R201 | Dracula, seed merchant way B (cart, 8, watched) | Mesmerise (3 → 2): Charm d12 at 6, Mask | 2 + 5 | 7 vs 6 | Success: **the seed potatoes** (essential) | 2 |
| 3 | R202, R203 | Werewolf to the smithy; Ghost and Dracula to the silversmith | Tell checks | 5; 3 | — | Eyebrows That Meet (smithy) | 3 |
| 4 | R204–R205 | Werewolf, smithy way B (watchman, Wits 8, watched) | Through the Hedge (3 → 2): Brawn d10 → d12 (Handyman) at 6, Mask | 11 + 6 | 17 vs 6 | Success: **the lock** | 3 |
| 4 | R206–R207 | Ghost, silversmith way A (watchman, Wits 6, not watched) | Wits d6 → d8 (Butler), Mask | 1 + 6 | 7 vs 6 | Success (beaten for all) | 3 |
| 4 | R208–R209 | Dracula, silversmith ob2 (nosy neighbour, 8, watched) | Mesmerise (2 → 1) at 6, Mask | 4 + 5 | 9 vs 6 | Success (only Dracula through) | 3 |
| 5 | — | The Werewolf moves to the silversmith; the Ghost and Dracula hand it their loot (free) | | | | | 3 |
| 5 | R210–R211 | Ghost, the neighbour | Sly d10 → d12 (Butler), Mask, so the Werewolf can follow (Dracula's way was only his) | 6 + 2 | 8 vs 8 | Success (beaten for all) | 3 |
| 5 | R212–R213 | Dracula, ob3 (cart, Brawn 12, watched) | Brawn d8 → d10 (Wolf, 1 → 0), Monster | 10 + 9 | 19 vs 12 | Success: **the gravy boat** | 3 |
| 6 | R214–R215 | Werewolf (loot handed to the Ghost first), furniture (cart, Brawn 10, watched) | Brawn d10, Monster under Good Dog (2 → 1) | 5 + 6 (shows, hidden) | 11 vs 10 | Success | 3 |
| 7 | R216 | The Werewolf and Dracula take the clock (Huge, two carriers) and set off (Turns 7–8); the Ghost moves to the way out | Tell check | 6 | — | Cold Spot | 4 |
| 7–8 | — | Carrying: +1 at the end of Turn 7 and Turn 8 | | | | | 6 |
| 9 | R217–R218 | Ghost (loot handed to Dracula), the way out: 8, **7 with Fetch** | Nimble d12, Mask (79%) | 2 + 5 | 7 vs 7 | Success: everyone out | 6 |

**How the Year Went: Grand Year**: all five items and the grandfather clock; 6 of 11 Suspicion; out on Turn 9 with three Turns to spare. (Without Fetch the roll was a Cost, which also gets everyone out.)

---

## 7. Play log: drills

### 7.1 Drill a1: a Standard final flight (escape at 5)

**Start (chosen):** Standard, a dawn flight, the Creature (1 charge), the Witch (2), the Mummy (1), default picks. Lead 2, escape 5, mob 11. All three are Soon.

| Round | Ground | Creature | Witch | Mummy | S – T | Lead |
|---|---|---|---|---|---|---|
| 1 | R219 = 3 market stalls | R220–R221 Brawn d12: 7 + 7 = 14, **Critical** | R222–R223 Wits d12 by the **Mummy's Ancient Lore** (1 → 0; she rolls her own Wits, S8): 1 + 9 = 10, Cost | R224–R225 Brawn d10 → d12 by the Witch's Hedge Spell (2 → 1): 8 + 7 = 15, Success | 3 – 0 | 3 |
| 2 | R226 = 1 square | R227–R228 Brawn d12 by Brute Force (1 → 0): 17, Success | R229–R230 Sly d10 → d12 (Hedge Spell, 1 → 0): 14, Success | R231–R232 Wits d12 by Ancient Lore, **overdrawn**: its Weakness comes "from your next roll", round 3, when Soon brings it anyway: 11, Success | 3 – 0 | 4 |
| 3 | R233 = 5 parade (all Weaknesses in play) | R234–R235 Sly d6 → d4: 1 + 9 = 10, Cost | R236–R237 Sly d8: 13, Success | R238–R239 Charm d6: 14, Success | 2 – 0 | **5: escaped** |

Escaped in **3 rounds**. Switch abilities made the difference: the Creature's Brute Force and the Mummy's Ancient Lore each turn any ground into a d12 (S8).

### 7.2 Drill a2: a Hard final flight (escape at 6)

**Start (chosen):** Hard, a Limit flight, Dracula, the Werewolf, the Invisible Man and Jekyll & Hyde (as Jekyll), defaults, 1 charge each. Lead 2, escape 6, mob 11. Dracula Always; the rest Soon.

Round 1 (R240 = 5 parade): Dracula Charm d10 (Garlic) 3 + 4 = 7 T (R241–R242); the Werewolf Keen Nose (1 → 0) to Wits d8, raised to d10 by J&H's Doctor's Bag (1 → 0): 7 + 7 = 14, **Critical** (R243–R244); the Invisible Man Sly d12 7 + 6 = 13 S (R245–R246); Jekyll Charm d12 7 + 1 = 8 T (R247–R248). 3 – 2: Lead 3.
Round 2 (R249 = 6 dead end): Dracula Bat (1 → 0) to Nimble d10 → d8: 2 + 4 = 6 T; the Werewolf Brawn d10 6 + 10 = 16 S; the Invisible Man Wits d10 8 + 9 = 17 S; J&H **drinks the Draught by overdraw** (free in round 2: his Weakness arrives in round 3 either way) and rolls Hyde's Brawn d12: 9 + 4 = 13 S (R250–R257). 3 – 1: Lead 4.

From round 3 every Weakness is in play, nobody holds a charge, and nobody may overdraw. The Invisible Man's and the Werewolf's abilities did nothing all flight. J&H used Practised Hand to be Jekyll on Charm and Sly grounds and was flipped back to Hyde whenever the Monster beat Jekyll's die.

| Round | Ground | Dracula | Werewolf | Invisible Man | J&H | S – T | Lead |
|---|---|---|---|---|---|---|---|
| 3 | R258 = 4 rooftops | Nimble d8: 4 + 9 = 13 S | Nimble d10: 8 + 8 = 16 **Crit** | Wits d8: 6 + 10 = 16 S | Hyde Nimble d8: 1 + 9 = 10 C | 4 – 0 | 5 |
| 4 | R267 = 6 dead end | Brawn d6: 5 T | Brawn d8: 13 S | Wits d8: 9 C | Hyde Brawn d10: 4 T | 1 – 2 | 4 |
| 5 | R276 = 6 dead end | 12 S | 7 T | 8 T | 13 S | 2 – 2 | 4 |
| 6 | R285 = 6 dead end | 8 T | 7 T | 9 C | 13 S | 1 – 2 | 3 |
| 7 | R294 = 5 parade | Charm d10: 11 S | Sly d4: 7 T | Sly d10: 12 S | Jekyll Charm d10: 2 + 3 = 5 T (shows: Hyde) | 2 – 2 | 3 |
| 8 | R303 = 1 square | 16 S | 5 T | 16 S | Jekyll: 2 + 6 = 8 T (Hyde) | 2 – 2 | 3 |
| 9 | R312 = 4 rooftops | 8 + 8 = 16 **Crit** | 6 + 4 = 10 C | 8 T | Hyde: 10 C | 2 – 1 | 4 |
| 10 | R321 = 5 parade | 13 S | 5 T | 5 T | Jekyll: 4 + 7 = 11 S (Hyde) | 2 – 2 | 4 |
| 11 | R330 = 4 rooftops | 5 T | 10 C | 9 C | Hyde: 6 T | 0 – 2 | 3 |
| 12 | R339 = 2 back alleys | Nimble d8: 17 S | Nimble d10: 10 C | Sly d10: 11 S | Hyde Nimble d8: 7 T | 2 – 1 | 4 |
| 13 | R348 = 2 back alleys | 10 C | 1 + 1 = 2 T | 11 S | 10 C | 1 – 1 | 4 |
| 14 | R357 = 5 parade | 17 S | 4 T | 7 T | Jekyll: 9 + 10 = 19 S (Hyde) | 2 – 2 | 4 |
| 15 | R366 = 4 rooftops | 11 S | 6 T | 18 S | Hyde: 7 T | 2 – 2 | 4 |
| 16 | R375 = 3 market stalls | Nimble d8: 11 S | Nimble d10: 10 C | Nimble d6: 9 C | Hyde Brawn d10: 9 C | 1 – 0 | 5 |
| 17 | R384 = 5 parade | 5 T | 14 S | 10 C | Jekyll: 8 T | 1 – 2 | 4 |
| 18 | R393 = 1 square | 14 S | 8 T | 10 C | Jekyll: 2 + 9 = 11 S (Hyde) | 2 – 1 | 5 |
| 19 | R402 = 6 dead end | 4 T | 16 S | 7 T | Hyde: 11 S | 2 – 2 | 5 |
| 20 | R411 = 3 market stalls | 7 T | 11 S | 8 T | Hyde: 8 T | 1 – 3 | 4 |
| 21 | R420 = 5 parade | 11 S | 10 C | 8 T | Jekyll: 12 S | 2 – 1 | 5 |
| 22 | R429 = 1 square | 15 S | 11 S | 9 C | Jekyll: 14 S | 3 – 0 | **6: escaped** |

(Each Entity's two dice for round N are the eight rolls after that round's ground roll, in the order Dracula, Werewolf, Invisible Man, J&H; section 10 lists them.)

Escaped in **22 rounds**: 22 ground rolls and 176 dice. The Lead sat at 3–5 from round 3 to round 21. The Werewolf's d4 on the four Charm/Sly grounds produced a Trouble in every one of them but one.

### 7.3 Drills b–g

(In progress.)

---

## 8. Findings (most severe first)

(In progress: being written as the drills finish. The ids below are final.)

M1 (major, balance): the Hard local chase as a Suspicion pump (main A). M2 (major, balance, pacing): Hard final flights. M3 (major, wording): J&H's starting form is still missing from the book. Minor m1–m11 and wording w1–w4: see the readings in section 4.

---

## 9. Balance and usability notes

(In progress.)

---

## 10. Roll appendix

Every roll in order, as logged when rolled (`Math.random`, one die per line). Labels are the log's own shorthand ("IM" is the Invisible Man; "Std" the Standard line).

| Roll | What | Dice |
|---|---|---|
| R1 | Main party pick 1 | d8 = 8 |
| R2 | Main party pick 2 | d8 = 5 |
| R3 | Main party pick 3 | d8 = 4 |
| R4 | Main party pick 4 | d8 = 6 |
| R5 | Main T1 Tell check smithy (Werewolf) | d6 = 3 |
| R6 | Main T1 Tell check silversmith (Ghost) | d6 = 4 |
| R7 | Main T1 Tell check printer (Jekyll) | d6 = 1 |
| R8 | Main T1 Tell check tailor (IM) | d6 = 5 |
| R9 | Main T2 Werewolf smithy wall Nimble | d12 = 6 |
| R10 | Main T2 Werewolf Monster (Good Dog) | d10 = 2 |
| R11 | Main T2 Ghost silversmith window via Through the Wall Sly(d12 Butler) | d12 = 6 |
| R12 | Main T2 Ghost Mask | d6 = 4 |
| R13 | Main T2 Jekyll printer neighbour Sly(d10 Librarian) | d10 = 1 |
| R14 | Main T2 Jekyll Mask | d6 = 1 |
| R15 | Main T2 IM tailor drainpipe Nimble(d10 Tailor) | d10 = 8 |
| R16 | Main T2 IM Mask | d6 = 1 |
| R17 | Main T2 Jekyll chase R1 ground | d6 = 1 |
| R18 | Main T2 Jekyll chase R1 Charm | d12 = 4 |
| R19 | Main T2 Jekyll chase R1 Mask | d6 = 3 |
| R20 | Main T2 Jekyll chase R2 ground | d6 = 4 |
| R21 | Main T2 Jekyll chase R2 Wits d12 (Doctor's Bag) | d12 = 5 |
| R22 | Main T2 Jekyll chase R2 Monster | d10 = 9 |
| R23 | Main T2 Hyde chase R3 ground | d6 = 4 |
| R24 | Main T2 Hyde chase R3 Nimble d8 (Weakness) | d8 = 7 |
| R25 | Main T2 Hyde chase R3 Monster | d10 = 1 |
| R26 | Main T2 Hyde chase R4 ground | d6 = 1 |
| R27 | Main T2 Jekyll (Draught back, free) chase R4 Charm d10 (Weakness) | d10 = 2 |
| R28 | Main T2 Jekyll chase R4 Monster | d10 = 8 |
| R29 | Main T2 Hyde chase R5 ground | d6 = 3 |
| R30 | Main T2 Hyde chase R5 Brawn d12 (Weakness d10, Doctor's Bag) | d12 = 6 |
| R31 | Main T2 Hyde chase R5 Monster | d10 = 3 |
| R32 | Main T2 Hyde chase R6 ground | d6 = 5 |
| R33 | Main T2 Jekyll (Draught back, free) chase R6 Charm d10 (Weakness) | d10 = 2 |
| R34 | Main T2 Jekyll chase R6 Monster | d10 = 1 |
| R35 | Main T2 Jekyll chase R7 ground | d6 = 2 |
| R36 | Main T2 Jekyll chase R7 Sly d8 (Weakness, Doctor's Bag) | d8 = 1 |
| R37 | Main T2 Jekyll chase R7 Monster | d10 = 5 |
| R38 | Main T2 Hyde chase R8 ground | d6 = 4 |
| R39 | Main T2 Hyde chase R8 Nimble d8 (Weakness) | d8 = 8 |
| R40 | Main T2 Hyde chase R8 Monster | d10 = 7 |
| R41 | Main T2 Hyde chase R9 ground | d6 = 5 |
| R42 | Main T2 Jekyll (Draught back, free) chase R9 Charm d10 (Weakness) | d10 = 5 |
| R43 | Main T2 Jekyll chase R9 Monster | d10 = 8 |
| R44 | Main T2 Hyde chase R10 ground | d6 = 5 |
| R45 | Main T2 Jekyll (Draught back, free) chase R10 Charm d10 (Weakness) | d10 = 5 |
| R46 | Main T2 Jekyll chase R10 Monster | d10 = 1 |
| R47 | Main T2 Jekyll chase R11 ground | d6 = 1 |
| R48 | Main T2 Jekyll chase R11 Charm d10 (Weakness) | d10 = 2 |
| R49 | Main T2 Jekyll chase R11 Mask | d6 = 3 |
| R50 | Main T2 Jekyll chase R12 ground | d6 = 6 |
| R51 | Main T2 Jekyll chase R12 Wits d8 (Weakness) | d8 = 6 |
| R52 | Main T2 Jekyll chase R12 Mask | d6 = 5 |
| R53 | Main T2 Jekyll chase R13 ground | d6 = 4 |
| R54 | Main T2 Jekyll chase R13 Wits d8 (Weakness) | d8 = 1 |
| R55 | Main T2 Jekyll chase R13 Mask | d6 = 4 |
| R56 | Main flight R1 ground | d6 = 3 |
| R57 | Main flight R1 Werewolf Nimble | d12 = 7 |
| R58 | Main flight R1 Werewolf Monster | d10 = 3 |
| R59 | Main flight R1 Ghost Nimble d10 (Cold Iron) | d10 = 3 |
| R60 | Main flight R1 Ghost Monster | d10 = 4 |
| R61 | Main flight R1 IM Nimble d10 (Chill) | d10 = 3 |
| R62 | Main flight R1 IM Monster | d10 = 3 |
| R63 | Main flight R2 ground | d6 = 3 |
| R64 | Main flight R2 Werewolf Nimble | d12 = 8 |
| R65 | Main flight R2 Werewolf Monster | d10 = 1 |
| R66 | Main flight R2 Ghost Nimble d10 (Cold Iron) | d10 = 3 |
| R67 | Main flight R2 Ghost Monster | d10 = 1 |
| R68 | Main flight R2 IM Nimble d10 (Chill) | d10 = 1 |
| R69 | Main flight R2 IM Monster | d10 = 7 |
| R70 | Main B party pick 1 | d8 = 6 |
| R71 | Main B party pick 2 | d8 = 3 |
| R72 | Main B party pick 3 | d8 = 8 |
| R73 | Main B party pick 4 | d8 = 1 |
| R74 | Main B party pick spare | d8 = 6 |
| R75 | Main B party pick spare | d8 = 6 |
| R76 | Main B Dracula Duty reroll | d6 = 3 |
| R77 | Main B Dracula Duty reroll spare | d6 = 1 |
| R78 | Main B Dracula Duty reroll spare | d6 = 2 |
| R79 | Main B T1 Tell smithy (Dracula) | d6 = 6 |
| R80 | Main B T1 Tell silversmith (Ghost) | d6 = 3 |
| R81 | Main B T1 Tell printer (Mummy) | d6 = 5 |
| R82 | Main B T1 Tell tailor (Jekyll) | d6 = 2 |
| R83 | Main B T2 Dracula smithy wall via Mesmerise Charm | d12 = 11 |
| R84 | Main B T2 Dracula Mask | d6 = 5 |
| R85 | Main B T2 Ghost silversmith window via Through the Wall Sly d12 (Butler) | d12 = 2 |
| R86 | Main B T2 Ghost Mask | d6 = 2 |
| R87 | Main B T2 Mummy printer neighbour via Royal Bearing Charm d10 (Librarian) | d10 = 7 |
| R88 | Main B T2 Mummy Mask | d6 = 2 |
| R89 | Main B T2 Hyde (Draught) tailor drainpipe Nimble | d10 = 6 |
| R90 | Main B T2 Hyde Mask | d6 = 1 |
| R91 | Main B T3 Dracula smithy watchman via Mesmerise Charm | d12 = 7 |
| R92 | Main B T3 Dracula Monster (Hypnotic Eyes) | d10 = 1 |
| R93 | Main B T3 Ghost silversmith dog loud Nimble d12 | d12 = 10 |
| R94 | Main B T3 Ghost Mask | d6 = 6 |
| R95 | Main B T3 Mummy printer back room Wits | d12 = 10 |
| R96 | Main B T3 Mummy Mask | d6 = 6 |
| R97 | Main B T3 Tell butcher (Hyde) | d6 = 2 |
| R98 | Main B T4 Ghost silversmith strongbox via Through the Wall Sly d12 (Butler) | d12 = 3 |
| R99 | Main B T4 Ghost Mask | d6 = 5 |
| R100 | Main B T4 Hyde butcher geese Sly d8 (Cost down, Doctor's Bag up) | d8 = 1 |
| R101 | Main B T4 Hyde Monster | d10 = 8 |
| R102 | Main B T5 Mummy tailor shop floor via Royal Bearing Charm d10 (Chill) | d10 = 5 |
| R103 | Main B T5 Mummy Mask | d6 = 2 |
| R104 | Main B T5 Jekyll butcher shopkeeper Charm | d12 = 12 |
| R105 | Main B T5 Jekyll Monster | d10 = 6 |
| R106 | Main B T5 Tell way out (Dracula) | d6 = 4 |
| R107 | Main B T6 Mummy tailor trapdoor via Ancient Lore Wits d10 (Cost down) | d10 = 2 |
| R108 | Main B T6 Mummy Monster | d10 = 3 |
| R109 | Main B T6 Hyde (Draught) butcher tug-of-war Brawn | d12 = 11 |
| R110 | Main B T6 Hyde Monster | d10 = 9 |
| R111 | Main B T7 Mummy tailor trapdoor Brawn | d10 = 8 |
| R112 | Main B T7 Mummy Monster | d10 = 10 |
| R113 | Main B T10 Dracula way out via Mesmerise Charm | d12 = 4 |
| R114 | Main B T10 Dracula Monster (Hypnotic Eyes) | d10 = 4 |
| R115 | Std party pick 1 | d8 = 6 |
| R116 | Std party pick 2 | d8 = 4 |
| R117 | Std party pick 3 | d8 = 6 |
| R118 | Std party spare | d8 = 4 |
| R119 | Std party spare | d8 = 1 |
| R120 | Std Ghost Gift | d6 = 2 |
| R121 | Std Ghost Perk | d6 = 2 |
| R122 | Std Ghost Duty | d6 = 4 |
| R123 | Std Werewolf Gift | d6 = 4 |
| R124 | Std Werewolf Perk | d6 = 6 |
| R125 | Std Werewolf Duty | d6 = 5 |
| R126 | Std Dracula Gift | d6 = 5 |
| R127 | Std Dracula Perk | d6 = 5 |
| R128 | Std Dracula Duty | d6 = 6 |
| R129 | Std essentials (odd one, even two) | d6 = 6 |
| R130 | Std item1 kind | d6 = 2 |
| R131 | Std item1 item | d6 = 1 |
| R132 | Std item2 kind | d6 = 3 |
| R133 | Std item2 item | d6 = 2 |
| R134 | Std item3 kind | d6 = 4 |
| R135 | Std item3 item | d6 = 6 |
| R136 | Std item4 kind | d6 = 3 |
| R137 | Std item4 item | d6 = 2 |
| R138 | Std item5 kind | d6 = 5 |
| R139 | Std item5 item | d6 = 2 |
| R140 | Std Lantern Night | d6 = 5 |
| R141 | Std item4 reroll kind | d6 = 4 |
| R142 | Std item4 reroll item | d6 = 4 |
| R143 | Std L1 place (plants) | d3 = 3 |
| R144 | Std L2 place (books) | d3 = 1 |
| R145 | Std L3 place (silver) | d2 = 1 |
| R146 | Std L4 place (silver) | d2 = 2 |
| R147 | Std L5 place (tools) | d3 = 1 |
| R148 | Std L1 obstacle count | d20 = 3 |
| R149 | Std L2 obstacle count | d20 = 5 |
| R150 | Std L3 obstacle count | d20 = 17 |
| R151 | Std L4 obstacle count | d20 = 3 |
| R152 | Std L5 obstacle count | d20 = 4 |
| R153 | Std L1 wayA table | d20 = 17 |
| R154 | Std L1 wayA Difficulty | d20 = 4 |
| R155 | Std L1 wayA watched | d10 = 6 |
| R156 | Std L1 wayB table | d20 = 3 |
| R157 | Std L1 wayB Difficulty | d20 = 9 |
| R158 | Std L1 wayB watched | d10 = 1 |
| R159 | Std L2 wayA table | d20 = 3 |
| R160 | Std L2 wayA Difficulty | d20 = 13 |
| R161 | Std L2 wayA watched | d10 = 7 |
| R162 | Std L2 wayB table | d20 = 14 |
| R163 | Std L2 wayB Difficulty | d20 = 18 |
| R164 | Std L2 wayB watched | d10 = 7 |
| R165 | Std L3 wayA table | d20 = 19 |
| R166 | Std L3 wayA Difficulty | d20 = 2 |
| R167 | Std L3 wayA watched | d10 = 8 |
| R168 | Std L3 wayB table | d20 = 15 |
| R169 | Std L3 wayB Difficulty | d20 = 19 |
| R170 | Std L3 wayB watched | d10 = 2 |
| R171 | Std L3 ob2 table | d20 = 10 |
| R172 | Std L3 ob2 Difficulty | d20 = 4 |
| R173 | Std L3 ob2 watched | d10 = 4 |
| R174 | Std L3 ob3 table | d20 = 3 |
| R175 | Std L3 ob3 Difficulty | d20 = 20 |
| R176 | Std L3 ob3 watched | d10 = 2 |
| R177 | Std L4 wayA table | d20 = 8 |
| R178 | Std L4 wayA Difficulty | d20 = 1 |
| R179 | Std L4 wayA watched | d10 = 8 |
| R180 | Std L4 wayB table | d20 = 4 |
| R181 | Std L4 wayB Difficulty | d20 = 10 |
| R182 | Std L4 wayB watched | d10 = 5 |
| R183 | Std L5 wayA table | d20 = 13 |
| R184 | Std L5 wayA Difficulty | d20 = 19 |
| R185 | Std L5 wayA watched | d10 = 2 |
| R186 | Std L5 wayB table | d20 = 19 |
| R187 | Std L5 wayB Difficulty | d20 = 6 |
| R188 | Std L5 wayB watched | d10 = 5 |
| R189 | Std furniture piece | d6 = 5 |
| R190 | Std furniture location | d5 = 3 |
| R191 | Std furniture obstacle table | d20 = 3 |
| R192 | Std furniture Difficulty | d20 = 10 |
| R193 | Std furniture watched | d10 = 4 |
| R194 | Std T1 Tell china shop (Ghost) | d6 = 4 |
| R195 | Std T1 Tell seed merchant (Dracula) | d6 = 6 |
| R196 | Std T2 Werewolf bookseller cart Brawn | d10 = 10 |
| R197 | Std T2 Werewolf Mask | d6 = 2 |
| R198 | Std T2 Ghost china shop drainpipe Nimble | d12 = 8 |
| R199 | Std T2 Ghost Mask | d6 = 1 |
| R200 | Std T2 Dracula seed merchant cart via Mesmerise Charm | d12 = 2 |
| R201 | Std T2 Dracula Mask | d6 = 5 |
| R202 | Std T3 Tell smithy (Werewolf) | d6 = 5 |
| R203 | Std T3 Tell silversmith (Ghost+Dracula) | d6 = 3 |
| R204 | Std T4 Werewolf smithy watchman via Through the Hedge Brawn d12 (Handyman) | d12 = 11 |
| R205 | Std T4 Werewolf Mask | d6 = 6 |
| R206 | Std T4 Ghost silversmith watchman Wits d8 (Butler) | d8 = 1 |
| R207 | Std T4 Ghost Mask | d6 = 6 |
| R208 | Std T4 Dracula silversmith neighbour via Mesmerise Charm | d12 = 4 |
| R209 | Std T4 Dracula Mask | d6 = 5 |
| R210 | Std T5 Ghost silversmith neighbour Sly d12 (Butler) | d12 = 6 |
| R211 | Std T5 Ghost Mask | d6 = 2 |
| R212 | Std T5 Dracula silversmith cart12 Brawn d10 (Wolf) | d10 = 10 |
| R213 | Std T5 Dracula Monster | d10 = 9 |
| R214 | Std T6 Werewolf silversmith furniture cart Brawn | d10 = 5 |
| R215 | Std T6 Werewolf Monster (Good Dog) | d10 = 6 |
| R216 | Std T7 Tell way out (Ghost arrives) | d6 = 6 |
| R217 | Std T9 Ghost way out Nimble (7 with Fetch) | d12 = 2 |
| R218 | Std T9 Ghost Mask | d6 = 5 |
| R219 | Drill a1 R1 ground | d6 = 3 |
| R220 | Drill a1 R1 Creature Brawn | d12 = 7 |
| R221 | Drill a1 R1 Creature Monster | d10 = 7 |
| R222 | Drill a1 R1 Witch Wits (Mummy's Ancient Lore) | d12 = 1 |
| R223 | Drill a1 R1 Witch Monster | d10 = 9 |
| R224 | Drill a1 R1 Mummy Brawn d12 (Hedge Spell) | d12 = 8 |
| R225 | Drill a1 R1 Mummy Monster | d10 = 7 |
| R226 | Drill a1 R2 ground | d6 = 1 |
| R227 | Drill a1 R2 Creature Brawn (Brute Force) | d12 = 8 |
| R228 | Drill a1 R2 Creature Monster | d10 = 9 |
| R229 | Drill a1 R2 Witch Sly d12 (Hedge Spell) | d12 = 11 |
| R230 | Drill a1 R2 Witch Monster | d10 = 3 |
| R231 | Drill a1 R2 Mummy Wits (Ancient Lore by overdraw) | d12 = 2 |
| R232 | Drill a1 R2 Mummy Monster | d10 = 9 |
| R233 | Drill a1 R3 ground | d6 = 5 |
| R234 | Drill a1 R3 Creature Sly d4 (Fire) | d4 = 1 |
| R235 | Drill a1 R3 Creature Monster | d10 = 9 |
| R236 | Drill a1 R3 Witch Sly d8 (Rowan) | d8 = 7 |
| R237 | Drill a1 R3 Witch Monster | d10 = 6 |
| R238 | Drill a1 R3 Mummy Charm d6 (Loose Thread) | d6 = 6 |
| R239 | Drill a1 R3 Mummy Monster | d10 = 8 |
| R240 | Drill a2 R1 ground | d6 = 5 |
| R241 | Drill a2 R1 Dracula Charm d10 (Garlic) | d10 = 3 |
| R242 | Drill a2 R1 Dracula Monster | d10 = 4 |
| R243 | Drill a2 R1 Werewolf Wits d10 (Keen Nose + Doctor's Bag) | d10 = 7 |
| R244 | Drill a2 R1 Werewolf Monster | d10 = 7 |
| R245 | Drill a2 R1 IM Sly | d12 = 7 |
| R246 | Drill a2 R1 IM Monster | d10 = 6 |
| R247 | Drill a2 R1 Jekyll Charm | d12 = 7 |
| R248 | Drill a2 R1 Jekyll Monster | d10 = 1 |
| R249 | Drill a2 R2 ground | d6 = 6 |
| R250 | Drill a2 R2 Dracula Nimble d8 (Bat; Garlic) | d8 = 2 |
| R251 | Drill a2 R2 Dracula Monster | d10 = 4 |
| R252 | Drill a2 R2 Werewolf Brawn | d10 = 6 |
| R253 | Drill a2 R2 Werewolf Monster | d10 = 10 |
| R254 | Drill a2 R2 IM Wits | d10 = 8 |
| R255 | Drill a2 R2 IM Monster | d10 = 9 |
| R256 | Drill a2 R2 Hyde Brawn (Draught by overdraw) | d12 = 9 |
| R257 | Drill a2 R2 Hyde Monster | d10 = 4 |
| R258 | Drill a2 R3 ground | d6 = 4 |
| R259 | Drill a2 R3 Dracula Nimble d8 | d8 = 4 |
| R260 | Drill a2 R3 Dracula Monster | d10 = 9 |
| R261 | Drill a2 R3 Werewolf Nimble d10 | d10 = 8 |
| R262 | Drill a2 R3 Werewolf Monster | d10 = 8 |
| R263 | Drill a2 R3 IM Wits d8 | d8 = 6 |
| R264 | Drill a2 R3 IM Monster | d10 = 10 |
| R265 | Drill a2 R3 Hyde Nimble d8 | d8 = 1 |
| R266 | Drill a2 R3 Hyde Monster | d10 = 9 |
| R267 | Drill a2 R4 ground | d6 = 6 |
| R268 | Drill a2 R4 Dracula Brawn d6 | d6 = 1 |
| R269 | Drill a2 R4 Dracula Monster | d10 = 4 |
| R270 | Drill a2 R4 Werewolf Brawn d8 | d8 = 7 |
| R271 | Drill a2 R4 Werewolf Monster | d10 = 6 |
| R272 | Drill a2 R4 IM Wits d8 | d8 = 5 |
| R273 | Drill a2 R4 IM Monster | d10 = 4 |
| R274 | Drill a2 R4 Hyde Brawn d10 | d10 = 2 |
| R275 | Drill a2 R4 Hyde Monster | d10 = 2 |
| R276 | Drill a2 R5 ground | d6 = 6 |
| R277 | Drill a2 R5 Dracula Brawn d6 | d6 = 5 |
| R278 | Drill a2 R5 Dracula Monster | d10 = 7 |
| R279 | Drill a2 R5 Werewolf Brawn d8 | d8 = 5 |
| R280 | Drill a2 R5 Werewolf Monster | d10 = 2 |
| R281 | Drill a2 R5 IM Wits d8 | d8 = 7 |
| R282 | Drill a2 R5 IM Monster | d10 = 1 |
| R283 | Drill a2 R5 Hyde Brawn d10 | d10 = 9 |
| R284 | Drill a2 R5 Hyde Monster | d10 = 4 |
| R285 | Drill a2 R6 ground | d6 = 6 |
| R286 | Drill a2 R6 Dracula Brawn d6 | d6 = 1 |
| R287 | Drill a2 R6 Dracula Monster | d10 = 7 |
| R288 | Drill a2 R6 Werewolf Brawn d8 | d8 = 4 |
| R289 | Drill a2 R6 Werewolf Monster | d10 = 3 |
| R290 | Drill a2 R6 IM Wits d8 | d8 = 1 |
| R291 | Drill a2 R6 IM Monster | d10 = 8 |
| R292 | Drill a2 R6 Hyde Brawn d10 | d10 = 7 |
| R293 | Drill a2 R6 Hyde Monster | d10 = 6 |
| R294 | Drill a2 R7 ground | d6 = 5 |
| R295 | Drill a2 R7 Dracula Charm d10 | d10 = 7 |
| R296 | Drill a2 R7 Dracula Monster | d10 = 4 |
| R297 | Drill a2 R7 Werewolf Sly d4 | d4 = 2 |
| R298 | Drill a2 R7 Werewolf Monster | d10 = 5 |
| R299 | Drill a2 R7 IM Sly d10 | d10 = 4 |
| R300 | Drill a2 R7 IM Monster | d10 = 8 |
| R301 | Drill a2 R7 Jekyll (Practised Hand) Charm d10 | d10 = 2 |
| R302 | Drill a2 R7 Jekyll Monster | d10 = 3 |
| R303 | Drill a2 R8 ground | d6 = 1 |
| R304 | Drill a2 R8 Dracula Charm d10 | d10 = 6 |
| R305 | Drill a2 R8 Dracula Monster | d10 = 10 |
| R306 | Drill a2 R8 Werewolf Sly d4 | d4 = 3 |
| R307 | Drill a2 R8 Werewolf Monster | d10 = 2 |
| R308 | Drill a2 R8 IM Sly d10 | d10 = 10 |
| R309 | Drill a2 R8 IM Monster | d10 = 6 |
| R310 | Drill a2 R8 Jekyll (Practised Hand) Charm d10 | d10 = 2 |
| R311 | Drill a2 R8 Jekyll Monster | d10 = 6 |
| R312 | Drill a2 R9 ground | d6 = 4 |
| R313 | Drill a2 R9 Dracula Nimble d8 | d8 = 8 |
| R314 | Drill a2 R9 Dracula Monster | d10 = 8 |
| R315 | Drill a2 R9 Werewolf Nimble d10 | d10 = 6 |
| R316 | Drill a2 R9 Werewolf Monster | d10 = 4 |
| R317 | Drill a2 R9 IM Wits d8 | d8 = 5 |
| R318 | Drill a2 R9 IM Monster | d10 = 3 |
| R319 | Drill a2 R9 Hyde Nimble d8 | d8 = 8 |
| R320 | Drill a2 R9 Hyde Monster | d10 = 2 |
| R321 | Drill a2 R10 ground | d6 = 5 |
| R322 | Drill a2 R10 Dracula Charm d10 | d10 = 8 |
| R323 | Drill a2 R10 Dracula Monster | d10 = 5 |
| R324 | Drill a2 R10 Werewolf Sly d4 | d4 = 3 |
| R325 | Drill a2 R10 Werewolf Monster | d10 = 2 |
| R326 | Drill a2 R10 IM Sly d10 | d10 = 4 |
| R327 | Drill a2 R10 IM Monster | d10 = 1 |
| R328 | Drill a2 R10 Jekyll (Practised Hand) Charm d10 | d10 = 4 |
| R329 | Drill a2 R10 Jekyll Monster | d10 = 7 |
| R330 | Drill a2 R11 ground | d6 = 4 |
| R331 | Drill a2 R11 Dracula Nimble d8 | d8 = 1 |
| R332 | Drill a2 R11 Dracula Monster | d10 = 4 |
| R333 | Drill a2 R11 Werewolf Nimble d10 | d10 = 1 |
| R334 | Drill a2 R11 Werewolf Monster | d10 = 9 |
| R335 | Drill a2 R11 IM Wits d8 | d8 = 4 |
| R336 | Drill a2 R11 IM Monster | d10 = 5 |
| R337 | Drill a2 R11 Hyde Nimble d8 | d8 = 5 |
| R338 | Drill a2 R11 Hyde Monster | d10 = 1 |
| R339 | Drill a2 R12 ground | d6 = 2 |
| R340 | Drill a2 R12 Dracula Nimble d8 | d8 = 8 |
| R341 | Drill a2 R12 Dracula Monster | d10 = 9 |
| R342 | Drill a2 R12 Werewolf Nimble d10 | d10 = 7 |
| R343 | Drill a2 R12 Werewolf Monster | d10 = 3 |
| R344 | Drill a2 R12 IM Sly d10 | d10 = 6 |
| R345 | Drill a2 R12 IM Monster | d10 = 5 |
| R346 | Drill a2 R12 Hyde Nimble d8 | d8 = 1 |
| R347 | Drill a2 R12 Hyde Monster | d10 = 6 |
| R348 | Drill a2 R13 ground | d6 = 2 |
| R349 | Drill a2 R13 Dracula Nimble d8 | d8 = 1 |
| R350 | Drill a2 R13 Dracula Monster | d10 = 9 |
| R351 | Drill a2 R13 Werewolf Nimble d10 | d10 = 1 |
| R352 | Drill a2 R13 Werewolf Monster | d10 = 1 |
| R353 | Drill a2 R13 IM Sly d10 | d10 = 6 |
| R354 | Drill a2 R13 IM Monster | d10 = 5 |
| R355 | Drill a2 R13 Hyde Nimble d8 | d8 = 4 |
| R356 | Drill a2 R13 Hyde Monster | d10 = 6 |
| R357 | Drill a2 R14 ground | d6 = 5 |
| R358 | Drill a2 R14 Dracula Charm d10 | d10 = 8 |
| R359 | Drill a2 R14 Dracula Monster | d10 = 9 |
| R360 | Drill a2 R14 Werewolf Sly d4 | d4 = 1 |
| R361 | Drill a2 R14 Werewolf Monster | d10 = 3 |
| R362 | Drill a2 R14 IM Sly d10 | d10 = 6 |
| R363 | Drill a2 R14 IM Monster | d10 = 1 |
| R364 | Drill a2 R14 Jekyll (Practised Hand) Charm d10 | d10 = 9 |
| R365 | Drill a2 R14 Jekyll Monster | d10 = 10 |
| R366 | Drill a2 R15 ground | d6 = 4 |
| R367 | Drill a2 R15 Dracula Nimble d8 | d8 = 1 |
| R368 | Drill a2 R15 Dracula Monster | d10 = 10 |
| R369 | Drill a2 R15 Werewolf Nimble d10 | d10 = 3 |
| R370 | Drill a2 R15 Werewolf Monster | d10 = 3 |
| R371 | Drill a2 R15 IM Wits d8 | d8 = 8 |
| R372 | Drill a2 R15 IM Monster | d10 = 10 |
| R373 | Drill a2 R15 Hyde Nimble d8 | d8 = 6 |
| R374 | Drill a2 R15 Hyde Monster | d10 = 1 |
| R375 | Drill a2 R16 ground | d6 = 3 |
| R376 | Drill a2 R16 Dracula Nimble d8 | d8 = 5 |
| R377 | Drill a2 R16 Dracula Monster | d10 = 6 |
| R378 | Drill a2 R16 Werewolf Nimble d10 | d10 = 6 |
| R379 | Drill a2 R16 Werewolf Monster | d10 = 4 |
| R380 | Drill a2 R16 IM Nimble d6 | d6 = 3 |
| R381 | Drill a2 R16 IM Monster | d10 = 6 |
| R382 | Drill a2 R16 Hyde Brawn d10 | d10 = 3 |
| R383 | Drill a2 R16 Hyde Monster | d10 = 6 |
| R384 | Drill a2 R17 ground | d6 = 5 |
| R385 | Drill a2 R17 Dracula Charm d10 | d10 = 3 |
| R386 | Drill a2 R17 Dracula Monster | d10 = 2 |
| R387 | Drill a2 R17 Werewolf Sly d4 | d4 = 4 |
| R388 | Drill a2 R17 Werewolf Monster | d10 = 10 |
| R389 | Drill a2 R17 IM Sly d10 | d10 = 4 |
| R390 | Drill a2 R17 IM Monster | d10 = 6 |
| R391 | Drill a2 R17 Jekyll (Practised Hand) Charm d10 | d10 = 6 |
| R392 | Drill a2 R17 Jekyll Monster | d10 = 2 |
| R393 | Drill a2 R18 ground | d6 = 1 |
| R394 | Drill a2 R18 Dracula Charm d10 | d10 = 5 |
| R395 | Drill a2 R18 Dracula Monster | d10 = 9 |
| R396 | Drill a2 R18 Werewolf Sly d4 | d4 = 1 |
| R397 | Drill a2 R18 Werewolf Monster | d10 = 7 |
| R398 | Drill a2 R18 IM Sly d10 | d10 = 3 |
| R399 | Drill a2 R18 IM Monster | d10 = 7 |
| R400 | Drill a2 R18 Jekyll Charm d10 | d10 = 2 |
| R401 | Drill a2 R18 Jekyll Monster | d10 = 9 |
| R402 | Drill a2 R19 ground | d6 = 6 |
| R403 | Drill a2 R19 Dracula Brawn d6 | d6 = 3 |
| R404 | Drill a2 R19 Dracula Monster | d10 = 1 |
| R405 | Drill a2 R19 Werewolf Brawn d8 | d8 = 7 |
| R406 | Drill a2 R19 Werewolf Monster | d10 = 9 |
| R407 | Drill a2 R19 IM Wits d8 | d8 = 4 |
| R408 | Drill a2 R19 IM Monster | d10 = 3 |
| R409 | Drill a2 R19 Hyde Brawn d10 | d10 = 10 |
| R410 | Drill a2 R19 Hyde Monster | d10 = 1 |
| R411 | Drill a2 R20 ground | d6 = 3 |
| R412 | Drill a2 R20 Dracula Nimble d8 | d8 = 2 |
| R413 | Drill a2 R20 Dracula Monster | d10 = 5 |
| R414 | Drill a2 R20 Werewolf Nimble d10 | d10 = 2 |
| R415 | Drill a2 R20 Werewolf Monster | d10 = 9 |
| R416 | Drill a2 R20 IM Nimble d6 | d6 = 5 |
| R417 | Drill a2 R20 IM Monster | d10 = 3 |
| R418 | Drill a2 R20 Hyde Brawn d10 | d10 = 3 |
| R419 | Drill a2 R20 Hyde Monster | d10 = 5 |
| R420 | Drill a2 R21 ground | d6 = 5 |
| R421 | Drill a2 R21 Dracula Charm d10 | d10 = 2 |
| R422 | Drill a2 R21 Dracula Monster | d10 = 9 |
| R423 | Drill a2 R21 Werewolf Sly d4 | d4 = 2 |
| R424 | Drill a2 R21 Werewolf Monster | d10 = 8 |
| R425 | Drill a2 R21 IM Sly d10 | d10 = 4 |
| R426 | Drill a2 R21 IM Monster | d10 = 4 |
| R427 | Drill a2 R21 Jekyll (Practised Hand) Charm d10 | d10 = 9 |
| R428 | Drill a2 R21 Jekyll Monster | d10 = 3 |
| R429 | Drill a2 R22 ground | d6 = 1 |
| R430 | Drill a2 R22 Dracula Charm d10 | d10 = 8 |
| R431 | Drill a2 R22 Dracula Monster | d10 = 7 |
| R432 | Drill a2 R22 Werewolf Sly d4 | d4 = 1 |
| R433 | Drill a2 R22 Werewolf Monster | d10 = 10 |
| R434 | Drill a2 R22 IM Sly d10 | d10 = 1 |
| R435 | Drill a2 R22 IM Monster | d10 = 8 |
| R436 | Drill a2 R22 Jekyll Charm d10 | d10 = 10 |
| R437 | Drill a2 R22 Jekyll Monster | d10 = 4 |
