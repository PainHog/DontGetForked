# PT8: Verification playtest after V15–V20, B7 and the book audit (Gallowsmere, Thistlewick, a rolled Easy town, drills a–g)

## 1. What this is

A verification playtest of the rules as they stand after PT7's fix round and the changes since: **V15** (silver, china and linen gets a third place, the laundry, and "two may share a place" when a kind has more items than places), **V16** (Hidden Pockets keeps loot, not furniture), **V17** (Out of Sight: caught only while you or anyone with you carries loot or furniture), **V18** (Chapter 4 advises splitting up on Standard and Hard), **B7** (Dracula's Mesmerise opens an approach only where someone's watching; the lock-up is Difficulty 10 on every label), **V19** (Spectral doesn't work while the Ghost carries loot or furniture), **V20** (Thistlewick's nosy neighbour at the hatter is unwatched, and a watched furniture obstacle doesn't make its location watched for the Tell check), and about 45 wording fixes from the book audit. It also checks each of PT7's eight findings against the book's text now (section 9.4).

**Rules source:** the rulebook text only: `book/src/chapters/11-ch01.html` to `17-ch07.html`, `31-ch08.html`, `32-ch09.html`, `40-entity-sheet.html` and `41-reference.html`, read as text, plus the alt text and titles the book prints for its pictures and maps (the book's chapters at commit 877c8c6; they did not change while I played). Not the simulator, not `docs/`, not the Foundry code. Where the book is silent I made a ruling, listed it in section 4, and logged it as a finding in section 9. The review log was read only to see what was decided about PT7's findings (section 9.4).

**Dice:** every random result is a real `Math.random` roll, numbered R1 onward and listed in section 11 (329 rolls; R327 was rolled by mistake and not used). Drills say exactly what I chose at their start; every roll after that is real. Where a drill needed a particular result (a Trouble, a capture) to put a rule through the text, I restarted it from the same chosen start until the dice gave that result, and every restart's rolls are listed. The players played to win; the Storyteller played by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now").

---

## 2. Summary

| Line | What it puts through the text | Result | Ended | Suspicion |
|---|---|---|---|---|
| **Main line A**: Gallowsmere (Hard) as printed; Dracula, A Ghost, the Invisible Man and a rolled fourth (the Creature); picks on a d6 | B7 Mesmerise at a watched obstacle, refused at an unwatched one, used at the way out; V19 (the Ghost hands its loot over before Spectral); a Hard capture and slipping free at the lock-up's 10; Through the Wall at the furniture | **Grand Year**: both essentials, 2 of 3 extras, the suit of armour | Out on **Turn 8** | 11 of 15 |
| **Main line B**: Thistlewick (Standard) as printed; 4 rolled Entities (the Witch, Dracula, the Werewolf, A Ghost), defaults | V20 at the hatter (no Tell check on arrival or at its furniture); V19 again; a Duty clash among defaults | **Grand Year**: all five and the gilt mirror | Out on **Turn 8** | 3 of 11 |
| **Main line C**: an Easy town rolled on Chapter 8's tables (it rolled the laundry); 3 rolled Entities (the Witch, the Werewolf, Dracula), defaults | V15 (a d3 for each place; the laundry); a group furniture obstacle and a Huge piece; the Butler at the laundry | **Grand Year**: all four and the four-poster bed | Out on **Turn 12** | 9 of 11 |
| C2 (extra): the sharing rule, a chosen list of four silver items | "two may share a place" | The fourth item shared the laundry: one location or two? (m2) | — | — |
| Drill a: Out of Sight | V17 with a companion carrying loot (a1), and alone empty-handed (a2) | a1 **caught** (Trouble on the 7th try; escaped in 6 rounds); a2 **not caught** (Trouble on the 8th try; +1 only) | — | 6 → 10; 6 → 7 |
| Drill b: Spectral | V19 empty-handed (b1), then carrying (b2) | b1 passed the tug-of-war without a roll; b2 had to roll the shop floor: Trouble, caught, **captured** in round 1 (the bacon lost) | — | 6 → 8 |
| Drill c: Mesmerise | B7 at a watched obstacle (c1), an unwatched one (c2), and slipping free (c3) | c1 Success at 8; c2 refused (my reading, M1), rolled Brawn instead; c3 slipped free at 8 | — | — |
| Drill d: a Hard capture and a rescue at 10 | The lock-up at 10; a rescuer's Trouble; "a Success or a Cost" frees | d1: the rescuer (Mountain Stride) got Trouble, was caught and escaped; the captive slipped free on its 3rd try. d2: a rescue with Brawn at 10, Success | — | 8 → 13 |
| Drill e: Hidden Pockets, captured carrying the piece | V16 | e1 the Limit came (joined the flight); e2 escaped; e3 **captured as the Limit came**: kept the bandages, lost the armour | — | 9 → 15; 6 → 13; 8 → 15 |
| Drill f: the Tell check at the hatter | V20 | No check on arrival, none at the furniture's watched dog | — | 0 |
| Drill g: At the Table alone | Main line B's lookups | 14 lookups needed a chapter | — | — |

**Changes and where each was exercised**

| Change | Where | Rolls |
|---|---|---|
| **V15** a d3 for a place; the laundry | Main C: the tablecloth rolled the laundry; a repeated place rerolled (the ink) | R104–R108 |
| **V15** "two may share a place" | C2 (chosen list): the fourth silver item shared the laundry | R238–R245 |
| **V16** Hidden Pockets keeps loot, not furniture | Drill e3: captured as the Limit came, carrying the bandages and the suit of armour | R310–R324 |
| **V17** Out of Sight, caught while anyone with you carries | Drill a1 (caught, companion carrying), a2 (alone empty-handed, not caught) | R190–R237 |
| **V18** split up on Standard and Hard | Every main line split on Turn 1 (four ways, four ways, three ways) | — |
| **B7** Mesmerise only where someone's watching | Main A (the neighbour; refused at the back room; the way out), main C (the schoolhouse's back room), drill c | R25, R39, R62, R157, R271–R276 |
| **B7** the lock-up at 10 on Hard | Main A (slipped free on the 3rd try), drill d (slipped free on the 3rd try; a rescue at 10), drill c3 | R52–R61, R251–R270 |
| **V19** Spectral not while carrying | Main A and main B (loot handed over first, then Spectral), drill b2 (carrying: had to roll) | R246–R250 |
| **V20** the hatter unwatched; a watched furniture obstacle doesn't count | Main B Turn 4–5, drill f | R91, R325–R329 |
| PT7 m3 (wording): when a carried move ends | All three main lines: the carrier acted, then the way out was rolled in the same Turn | R62, R93, R188 |
| PT7 w1 (wording): a die for the place and the furniture's location | Main C | R104–R108, R150 |
| PT7 w2 (wording): the ceiling and the furniture's +2 | Main C: the furniture's 10 (12 after +2) didn't count; the bookseller's 12 was the one | R123, R147 |

**Counts: 0 blockers, 1 major, 6 minor, 5 wording** (12 in all, section 9). By kind: **9 wording** (M1, m1, m2, m5, w1–w5: the book implies an answer, or the fix only says more clearly what it means) and **3 rules** questions for the author (m3, m4, m6).

**PT7's 8 findings: 5 resolved, 1 partly, 2 not changed by decision** (m5 and m6: V13 and V14). Section 9.4.

**Local chases:** 8, of 1–6 rounds (29 rounds): 4 escaped, 3 captured, 1 ended at the Limit. No final flight was played: none of the three raids reached the Limit or dawn.

---

## 3. Setup

### 3.1 Gallowsmere as Chapter 9 prints it

**Gallowsmere** (Hard): "Suspicion Limit 15 · the way out 10 · the lock-up 10 · the final flight: mob 11, escape at Lead 6", matching Chapter 8's difficulty table (lock-up 10 on every label, B7). Five items, two essentials: **a new lock for the dungeon** (the smithy, tools), **the silver spoons** (the silversmith, silver), black-edged writing paper (the printer, books), bandages, lots (the tailor, cloth), a side of bacon (the butcher, food). The furniture: a suit of armour (Bulky) at the tailor, behind a heavy cellar trapdoor (Brawn 12, not watched). The map's title: "Every location is watched; the star marks the furniture, at the tailor." Villagers: old Granny Mott (practising the bells) and a gang of children (gossiping, loudly).

The ceiling holds: the tug-of-war is a natural 12 and the trapdoor "counts by its roll, before its +2" (a 10). Of the 18 obstacles, 12 are watched.

### 3.2 Main line A party (R1–R16)

Dracula, A Ghost and the Invisible Man as asked; the fourth on a d8 in the book's order, rerolling the three already in (R1 = 2: **Frankenstein's Creature**). Picks on a d6 (1–2 the first, 3–4 the second, 5–6 the third); the Duty on its d6 table, "rerolling one already taken", in the book's order of the Entities. 3 charges each.

| Entity | Brawn | Nimble | Sly | Charm | Wits | Signature | Gift (R) | Perk (R) | Duty (R) | Weakness |
|---|---|---|---|---|---|---|---|---|---|---|
| Dracula | d8 | d10 | d6 | d12 | d4 | Mesmerise (open with Charm where someone's watching) | Wolf, raise (R2 = 5) | **Hypnotic Eyes** (R3 = 2) | **Librarian** (R4 = 3): the paper | Garlic (Always) |
| Frankenstein's Creature | d12 | d8 | d6 | d4 | d10 | Brute Force (Brawn instead) | Book-Learned, raise (R5 = 6) | Built to Last (R6 = 5) | **Butler** (R7 = 4): the spoons | Fire (Soon) |
| A Ghost | d4 | d12 | d10 | d8 | d6 | Through the Wall (open with Sly, not while carrying) | Fade, hidden Monster (R8 = 5) | **Spectral** (R9 = 2) | Gardener (R10 = 2): nothing on this list | Cold Iron (Always) |
| The Invisible Man | d4 | d8 | d12 | d6 | d10 | Unseen (hidden Monster) | Poltergeist, raise (R11 = 3) | Light Step (R12 = 5) | Gardener (R13 = 2) taken, Librarian (R14 = 3, R15 = 3) taken, **Tailor** (R16 = 6): the bandages | Flour (Soon) |

The Invisible Man's Perk rolled Light Step, so Out of Sight and Hidden Pockets went to drills a and e.

### 3.3 Thistlewick as Chapter 9 prints it

**Thistlewick** (Standard): "Suspicion Limit 11 · the way out 8 · the lock-up 10 · the final flight: mob 11, escape at Lead 5". Five items, two essentials: **the wedding cake** (the baker, food), **a tea service** (the china shop, silver), a top hat (the hatter, cloth), a coil of rope (the ironmonger, tools), turnip seed (the seed merchant, plants). The furniture: a gilt mirror (Bulky) at the hatter, behind a guard dog (Charm / Nimble loud, 10, **watched**). The hatter's ways in, the nosy neighbour (Sly / Wits loud, 8) and the rooftops (group, Nimble, 10), are both unwatched now (V20). The map's title: "Watched: 1 the baker, 2 the china shop, 4 the ironmonger, 5 the seed merchant; the star marks the furniture, at the hatter." No 12s.

### 3.4 Main line B party (R64–R69)

d8: R64 = 7, R65 = 1, R66 = 4, R67 = 1 (repeat), R68 = 6: **the Witch, Dracula, the Werewolf, A Ghost**, default picks. The Ghost's default Duty (Butler) clashes with Dracula's; "the second player picks another or rolls a d6, rerolling any Duty already taken". I took the order the Entities were rolled, so the Ghost is second, and it rolled: R69 = 5, **Handyman**. 3 charges each.

| Entity | Dice | Signature | Gift | Perk | Duty (item here) | Weakness |
|---|---|---|---|---|---|---|
| A Witch | Brawn d6 · Nimble d4 · Sly d10 · Charm d8 · Wits d12 | Hedge Spell (raise, hers or a friend's) | Broomstick (open with Nimble) | Familiar's Warning | Cook (the cake) | Rowan (Soon) |
| Dracula | Brawn d8 · Nimble d10 · Sly d6 · Charm d12 · Wits d4 | Mesmerise | Bat (Nimble instead) | Hypnotic Eyes | Butler (the tea service) | Garlic (Always) |
| The Werewolf | Brawn d10 · Nimble d12 · Sly d6 · Charm d4 · Wits d8 | Good Dog (hidden Monster) | Keen Nose (Wits instead) | Night Runner | Gardener (the turnip seed) | Hounds (Soon) |
| A Ghost | Brawn d4 · Nimble d12 · Sly d10 · Charm d8 · Wits d6 | Through the Wall | Chill (raise) | Spectral | **Handyman** (the rope) | Cold Iron (Always) |

### 3.5 Main line C: the rolled Easy town (R95–R150)

Built by Chapter 8's Rolling a Town, Easy column, every number rolled. The task wanted silver, china and linen on the list; it came up on the first list rolled, so nothing was forced.

**The list** (R95–R102; d6 kind, d6 item; the first is the essential, Easy has one): **black-edged writing paper** (books) · essential, ink and sealing wax (books), a side of bacon (food), a lace tablecloth (silver, china and linen). **Lantern Night** (R103 = 5): a bonfire in the square, and a straw monster burned at dawn.

**Places** ("a d3 or pick, one item per place"; a d3 rolled directly, which is a d6 halved): the paper R104 = 3, the schoolhouse; the ink R105 = 3, the schoolhouse again, so rolled again (one item per place; two books, three places, so no sharing): R108 = 1, the bookseller; the bacon R106 = 2, the butcher; the tablecloth R107 = 3, **the laundry** (V15's new place).

**Obstacles** (counts R109–R112, Easy: 1–10 one, 11–18 two, 19–20 three: two, two, one, two; each obstacle a d20 on the obstacle table, a d20 for its Difficulty (1–3: 6 · 4–13: 8 · 14–19: 10 · 20: 12) and a d10 for watched (1–4); R113–R148). Every second way in had a different quiet trait at the first roll. **The furniture** (R149 = 6, R150 = 4): a four-poster bed (Huge) at the laundry ("number them and roll a d6, rerolling a number without one": 1–4 in list order).

| # | Location · item | Obstacle | Quiet way | Loud way | Difficulty | Watched |
|---|---|---|---|---|---|---|
| 1 | **The schoolhouse**: black-edged writing paper (books) · essential | Way in: a dark, cluttered back room | Wits | Sly | 10 | watched |
| | | or: a doorman checking invitations | Charm | Wits | 10 | watched |
| | | Then: a guard dog | Charm | Nimble | 8 | — |
| 2 | **The bookseller**: ink and sealing wax (books) | Way in: a guard dog | Charm | Nimble | 12 | — |
| | | or: a nosy neighbour at her window | Sly | Wits | 8 | — |
| | | Then: a shuttered window | Nimble | Brawn | 8 | — |
| 3 | **The butcher**: a side of bacon (food) | Way in: a locked front door | Sly | Brawn | 8 | watched |
| | | or: the shopkeeper behind the counter | Charm | Sly | 8 | watched |
| 4 | **The laundry**: a lace tablecloth (silver, china and linen) | Way in: children in costumes (group) | Charm | — | 10 | — |
| | | or: a dark, cluttered back room | Wits | Sly | 8 | — |
| | | Then: the shopkeeper behind the counter | Charm | Sly | 10 | — |
| | | Furniture: children in costumes (group) (the four-poster bed, Huge) | Charm | — | 12 (rolled 10) | — |

Easy: Suspicion Limit 11 · the way out 6 · the lock-up 10 · the final flight: mob 10, escape at Lead 5. 12 obstacles, 4 watched (33%; the table's share is 40%); Difficulties by roll 8 ×6, 10 ×5, 12 ×1 (the table's 15 / 50 / 30 / 5%). The ceiling (one 12 on Easy) holds: the bookseller's guard dog is the only natural 12; the furniture's obstacle "counts by its roll, before its +2". Two locations are watched (the schoolhouse, the butcher). No town name: the tables don't make one.

### 3.6 Main line C party (R151–R153)

d8: R151 = 7, R152 = 4, R153 = 1: **the Witch, the Werewolf, Dracula**, default picks (as in 3.4). Duties: Cook (the bacon), Gardener (nothing here), **Butler (the tablecloth, at the laundry)**. No clash. 3 charges each.

---

## 4. Standing readings (my rulings where the book is silent; the ones that matter are findings in section 9)

| # | Reading | Finding |
|---|---|---|
| S1 | Random Entities: the book has players pick; as the task asked, I rolled a d8 in Chapter 2's order (1 Dracula … 8 Jekyll & Hyde), rerolling an Entity already in the party. | — (not a rule) |
| S2 | Mesmerise "where someone's watching" means **at a watched obstacle**, not at any obstacle of a watched location (Chapter 8: "A watched obstacle means someone is looking"; Chapter 5: "it's the obstacle you roll that counts"). Refused at Gallowsmere's printer's back room (unwatched, though the printer is watched by its way in) and at the butcher's tug-of-war (drill c2). Allowed at the way out ("always watched") and at the lock-up. | **M1** |
| S3 | Out of Sight's "anyone with you" means **anyone at the same place** (Chapter 3's sense: "a location, the way out or the lock-up"), whichever obstacle they stand before. | **m1** |
| S4 | Loot can't be set down at will: the book lets you "drop" a piece of furniture "any time", but loot leaves your hands only by handing it over ("free in the same place") or by a Cost's "drop an item". So in drill b2 a Ghost carrying the bacon, alone, had no way to Spectral. | **m3** |
| S5 | Handing loot over works across an obstacle at the same location (the Ghost, past the shop floor or the rooftops, hands loot to friends who aren't): "hand it over free in the same place". | — (the text answers it) |
| S6 | An approach opened at the way out (Mesmerise, main A Turn 8) gets everyone out "as usual", the Ghost's carried armour included: "though the way out and a rescue work as usual", over "(and only you can carry a piece out that way)". | **w2** |
| S7 | A Cost at the way out costs nothing: "A Success or a Cost gets everyone out, free." Two of the three ways out were Costs (main A, main C). | — (the text answers it) |
| S8 | A piece is taken in the Turn its carriers set off, not when its obstacle is beaten: "Taking a piece is free", and the noise runs "once taken". Every piece in PT8 was beaten a Turn or more before it was taken, and cost **+1** each (as PT4's m12 found). | — (the text answers it) |
| S9 | A Cost's smaller die meets a Duty's raise on a d12 and nothing changes ("a d12 raised and stepped down stays a d12"). So the Storyteller didn't pick it for the Invisible Man in main A (his next roll was Sly d12 at his Duty's location: it would cost nothing), and when it was picked for the Creature it vanished into Brute Force's d12 at his Duty's location. | **m4** |
| S10 | Mesmerise for a captive slipping free (drill c3): the lock-up "always watched" is said of the rescue obstacle; I read the captive as watched too ("a captive may open its own way out"). | **w4** |
| S11 | A d3 is a d6 halved (1–2, 3–4, 5–6), as Chapter 2's random picks do; I rolled it directly. | **w1** |
| S12 | The Duty clash's "second player" is the second in the order the Entities were chosen (here, rolled). | — (minor; not logged) |
| S13 | The faces in Chapter 9's towns are their two villagers; I picked one when a Tell went off (flavour only). | — |

---

## 5. Play log: main line A (Gallowsmere, Hard, 4 Entities)

Notation: trait die + second die = total vs Difficulty → result. "Shows" = the Monster die beat the trait die. Sus = Suspicion after the roll. Odds are Success / Cost / Trouble, exact from the book's dice. Charges are shown before → after.

**Plan.** Split four ways on Turn 1 (Chapter 4: "on Standard and Hard it usually should"): the Ghost to the smithy (the garden wall with Nimble d12, then Through the Wall past the watchman); the Creature (Butler) to the silversmith's three obstacles; Dracula (Librarian) to the printer (Mesmerise at the watched neighbour); the Invisible Man (Tailor) to the tailor. Then the Ghost walks past the tailor's crowded shop floor by Spectral, once it has handed its loot to someone. The butcher (a watched 8, a watched 10 and a Brawn 12 tug-of-war) only if Turns are spare.

**Turn 1 (Sus 0).** Moves; every location is watched, so a Tell check at each first arrival:

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R17 | the smithy (Ghost) | 1 | — | 0 |
| R18 | the silversmith (Creature) | 1 | — | 0 |
| R19 | the printer (Dracula) | 1 | — | 0 |
| R20 | the tailor (Invisible Man) | 4 | Bandages and Goggles: the gang of children point at the sneeze | 1 |

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R21–R22 | Ghost, smithy way B (high garden wall, Nimble / Brawn loud, 8, watched) | Nimble d12, Mask (71 / 15 / 14); Fade kept | 2 + 1 | 3 vs 8 | **Trouble**, caught (Granny Mott sees a sheet drift up the wall) | 2 |

**The Ghost's local chase** (alone: Lead 1, escape at 4; mob 8 + 1 = **9**; Cold Iron, Always: every trait one size smaller from round 1):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R29 = 4 rooftops | Nimble d12 → d10 (Cold Iron), **Fade** (3 → 2): 72 / 13 / 15 against the Mask's 55 / 20 / 25; at Lead 1 a Trouble corners | 8 + 8 | 16 vs 9 | **Critical**: two Successes | 3 | 2 |
| 2 | R32 = 3 market stalls | Nimble d10, Mask | 6 + 4 | 10 vs 9 | Success | **4: escaped** | 2 |

Back below the garden wall, its Turn used up.

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R23–R24 | Creature, silversmith way B (shuttered window, Nimble / Brawn loud, 8, watched) | Nimble d8 → d10 (Butler), Mask (65 / 18 / 17) | 6 + 1 | 7 vs 8 | **Cost**: the window is open. He carries nothing, so "drop an item" would cost nothing; Turn 2 isn't near dawn, 2 of 15 isn't near the Limit. The Storyteller takes **his next roll's trait die one size smaller** (a watched dog and a strongbox at 10 to come) | 2 |
| 2 | R25–R26 | Dracula, printer way A (nosy neighbour, Sly / Wits loud, 8, **watched**) | **Mesmerise** (3 → 2): Charm isn't listed and someone is watching: Charm d12 (Librarian can't raise a d12) at 6, Mask (86 / 10 / 4) | 7 + 2 | 9 vs 6 | Success. "Only you get through" | 2 |
| 2 | R27–R28 | Invisible Man, tailor way B (rickety drainpipe, Nimble, 8, unwatched) | Nimble d8 → d10 (Tailor), Mask (65 / 18 / 17) | 1 + 5 | 6 vs 8 | **Cost**: the drainpipe is beaten. "Drop an item" costs nothing (he carries nothing). The smaller die would cost nothing too: his next roll is the shop floor with Sly d12 at his Duty's location, where "a d12 raised and stepped down stays a d12" (S9). The Storyteller takes **lose a Turn** | 2 |
| 3 | R35–R36 | Ghost, the garden wall again | Nimble d12, Mask | 8 + 5 | 13 vs 8 | Success | 2 |
| 3 | R37–R38 | Creature, silversmith (guard dog, Charm / Nimble loud, 8, watched) | **Brute Force** (3 → 2): Brawn d12; the Butler's raise and the Cost's step down cancel and it stays a d12 (S9); Brawn isn't listed, so it isn't loud. Mask (71 / 15 / 14). Nimble the loud way would have been d8: 56 / 23 / 21 and +1 | 4 + 6 | 10 vs 8 | Success | 2 |
| 3 | R39–R40 | Dracula, printer (dark back room, Wits / Sly loud, 8, **unwatched**) | Mesmerise **refused**: nobody is watching this obstacle (S2; under the other reading he'd roll Charm d12 at 6: 86 / 10 / 4). Sly d6 → d8 (Librarian) the loud way, Mask (56 / 23 / 21) | 1 + 2 | 3 vs 8 | **Trouble** (unwatched: the loud way and Trouble, one roll, one rise: +1) | 3 |
| 3 | — | Invisible Man | loses his Turn | | | | 3 |
| 4 | R41–R42 | Ghost, smithy (night watchman, Wits, 10, watched) | **Through the Wall** (2 → 1): Sly d10 at 8, Mask (65 / 18 / 17) | 10 + 1 | 11 vs 8 | Success: **the new lock** (essential) | 3 |
| 4 | R43–R44 | Creature, silversmith (locked strongbox, Wits / Charm loud, 10, unwatched) | Wits d10 → d12 (Butler), Mask (54 / 17 / 29; the Monster's 70 / 13 / 18 would risk +2 for the extra) | 7 + 1 | 8 vs 10 | **Cost**: **the silver spoons** (essential). "Drop an item" is barred ("never what this roll wins"). The Storyteller takes **his next roll's trait die one size smaller** (the furniture's Brawn 12 is the hard roll ahead) | 3 |
| 4 | R45–R46 | Dracula, the back room again | Sly d8 the loud way, Mask | 7 + 3 | 10 vs 8 | Success (loud +1): **the writing paper** | 4 |
| 4 | R47–R48 | Invisible Man, tailor (crowded shop floor, group, Sly, 10, watched) | Sly d12, **Unseen** (3 → 2): 70 / 13 / 18 | 2 + 5 (shows, hidden) | 7 vs 10 | **Trouble**, caught ("if it shows, that raises nothing (Trouble or a Cost still counts)") | 5 |

**The Invisible Man's local chase** (Lead 1, escape at 4; mob 8 + 2 = **10**; Flour from round 3):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R49 = 2 back alleys | Sly d12, **Unseen** (2 → 1): 70 / 13 / 18 against the Mask's 54 / 17 / 29 | 3 + 3 | 6 vs 10 | Trouble (doubles, but not a Success): **cornered** | 0 | 6 |

**Captured.** He carried nothing, so the town takes nothing. He is held at the lock-up (Difficulty 10 on Hard now).

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 5 | R52–R53 | Invisible Man slips free (Sly or Nimble, or Brawn loud, at 10) | Sly d12, **Unseen** (1 → 0): 70% a Success, and only a Success frees | 4 + 5 (shows, hidden) | 9 vs 10 | Cost: "a Cost does nothing" | 6 |
| 5 | — | Dracula, the Creature and the Ghost move to the tailor (first reached Turn 1: no check). The party keeps to way B (the drainpipe, beaten). The Ghost **hands the lock to Dracula** (free, same place), then walks past the crowded shop floor by **Spectral**, at no action, in the Turn it moved: **the bandages**. Holding the lock it couldn't have (V19) | | | | | 6 |
| 6 | R54–R55 | Invisible Man slips free | Sly d12, Mask (54 / 17 / 29) | 4 + 2 | 6 vs 10 | Trouble: "Suspicion rises but no chase starts" | 7 |
| 6 | — | The Ghost hands the bandages to the Creature, across the shop floor (S5); Dracula hands him the lock and the paper (he is going to the lock-up, and a captured rescuer loses what he carries) | | | | | 7 |
| 6 | R56–R57 | Ghost, the furniture's trapdoor (Brawn, 12, unwatched) | **Through the Wall** (1 → 0), carrying nothing now: Sly d10 at 10, Monster (64 / 15 / 21 against the Mask's 45 / 20 / 35; unwatched, so a show costs only Suspicion) | 6 + 8 (shows) | 14 vs 10 | Success. The suit of armour is the Ghost's to take, and only the Ghost's ("only you can carry a piece out that way"). It leaves it standing until it sets off (S8) | 9 |
| 6 | R58 | Dracula moves to the lock-up: Tell check ("the lock-up does") | | 5 | — | No Reflection: the lock-up's dark window shows Granny Mott and nobody beside her | 10 |
| 6 | R59 | The Creature moves to the way out: Tell check ("when anyone first comes back to it") | | 2 | — | — | 10 |
| 7 | R60–R61 | Invisible Man slips free | Sly d12, Mask. First, so that Dracula need not risk the Mesmerise rescue (Charm at 8: 86% frees, 14% Dracula caught) | 12 + 1 | 13 vs 10 | **Success**: free at the lock-up, acts again next Turn | 10 |
| 7 | — | Dracula moves to the way out. The Ghost **takes the armour** (Bulky, one carrier) and sets off: between places | | | | | 10 |
| 7 | — | End of the Turn: the armour, +1 | | | | | **11** |
| 8 | — | The Ghost acts first and finishes its carried move ("you're between places until you act in the second"); the Invisible Man moves to the way out | | | | | 11 |
| 8 | R62–R63 | Dracula, the way out (Sly / Nimble / Brawn loud, 10, watched) | **Mesmerise** (2 → 1): Charm isn't listed and the way out is always watched: Charm d12 at 8. The Monster under Hypnotic Eyes (shows only on a 2+ lead: 30%): 83 / 9 / 8 against the Mask's 71 / 15 / 14; a show doesn't matter once out | 6 + 1 | 7 vs 8 | **Cost**: "A Success or a Cost gets everyone out, free" (S7), the Ghost's armour too (S6) | 11 |

**How the Year Went: Grand Year.** Both essentials, two of the three extras (the bacon missing) and the suit of armour; nobody left behind. "A year of plenty. The new piece goes in the great hall, and everyone pretends it was always there." Then the missing kind: "Turnip soup every night until spring." Out on **Turn 8** with four Turns to spare, at Suspicion 11 of 15. Charges: 9 of 12 spent (Mesmerise ×2; Brute Force; Fade, Through the Wall ×2; Unseen ×3). The armour cost +1 (S8).

---

## 6. Play log: main line B (Thistlewick, Standard, 4 Entities)

**Plan.** Each to its Duty's location on Turn 1: the Witch (Cook) to the baker, Dracula (Butler) to the china shop, the Werewolf (Gardener) to the seed merchant, the Ghost (Handyman) to the ironmonger. Then the hatter: the rooftops (group) by Spectral for the top hat, and Through the Wall at the furniture's watched guard dog.

**Turn 1 (Sus 0).** Moves. Four watched locations (the hatter isn't one):

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R70 | the baker (Witch) | 3 | — (Familiar's Warning not needed) | 0 |
| R71 | the china shop (Dracula; watched by its back gate, "either way in") | 3 | — | 0 |
| R72 | the seed merchant (Werewolf) | 5 | Eyebrows That Meet: the vicar stares | 1 |
| R73 | the ironmonger (Ghost) | 4 | Cold Spot: the mayor's lantern gutters | 2 |

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R74–R75 | Witch, baker way A (crowded shop floor, group, Sly, 8, watched) | Sly d10 → d12 (Cook), Mask (71 / 15 / 14) | 10 + 3 | 13 vs 8 | Success | 2 |
| 2 | R76–R77 | Dracula, china shop way A (locked front door, Sly / Brawn loud, 8, unwatched) | Sly d6 → d8 (Butler), Mask (56 / 23 / 21); Bat kept for the back room | 7 + 5 | 12 vs 8 | Success | 2 |
| 2 | R78–R79 | Werewolf, seed merchant way B (muddy yard of geese, Sly / Nimble loud, 6, unwatched) | Sly d6 → d8 (Gardener), Mask (79 / 15 / 6) | 3 + 1 | 4 vs 6 | **Cost**: "drop an item" costs nothing (he carries nothing). The Storyteller takes **his next roll's trait die one size smaller**: his next roll is the watchman at 10 ("a smaller die before a hard roll") | 2 |
| 2 | R80–R81 | Ghost, ironmonger way A (cart blocking the alley, Brawn / Nimble loud, 6, unwatched) | Brawn d4 → d6 (Handyman), Mask (72 / 19 / 8, quiet; the wall's Nimble d12 would be 71 / 15 / 14) | 4 + 5 | 9 vs 6 | Success | 2 |
| 3 | R82–R83 | Witch, baker (shopkeeper, Charm / Sly loud, 8, watched) | Charm d8 → d10 (Cook), Mask (65 / 18 / 17) | 5 + 4 | 9 vs 8 | Success: **the wedding cake** (essential) | 2 |
| 3 | R84–R85 | Dracula, china shop (dark back room, Wits / Sly loud, 8, unwatched) | **Bat** (3 → 2): Nimble d10 → d12 (Butler); Nimble isn't listed, so it isn't loud. Mask (71 / 15 / 14). (Mesmerise can't: the back room is unwatched) | 5 + 1 | 6 vs 8 | **Cost**: **the tea service** (essential). Drop barred (only what this roll won). The Storyteller takes **his next roll's trait die one size smaller** | 2 |
| 3 | R86–R87 | Werewolf, seed merchant (night watchman, Wits, 10, watched) | Wits d8 → d10 (Gardener) → d8 (the Cost): they cancel. **Good Dog** (3 → 2): 55 / 19 / 26 against the Mask's 31 / 25 / 44 | 7 + 5 (hidden) | 12 vs 10 | Success: **the turnip seed** | 2 |
| 3 | R88–R89 | Ghost, ironmonger (locked strongbox, Wits / Charm loud, 8, watched) | **Through the Wall** (3 → 2): Sly d10 → d12 (Handyman) at 6, Mask (86 / 10 / 4) | 3 + 4 | 7 vs 6 | Success: **the rope** | 2 |

Three Turns gone, Suspicion 2: both essentials and two extras in hand, a Win already.

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 4 | — | The Ghost and the Witch move to the hatter: **no Tell check** (V20: its ways in are unwatched, and "a watched furniture obstacle doesn't count"). The party takes way B, the rooftops (group). The Ghost **hands the rope to the Witch**, then passes the rooftops by **Spectral**, at no action, in the Turn it moved: **the top hat** | | | | | 2 |
| 4 | R90 | Dracula and the Werewolf move to the way out: Tell check | | 1 | — | — | 2 |
| 5 | R91–R92 | The Ghost hands the top hat to the Witch (across the rooftops, S5), then the furniture's guard dog (Charm / Nimble loud, 10, **watched**) | **Through the Wall** (2 → 1): Sly isn't listed: Sly d10 at 8, raised to d12 by the Witch's **Hedge Spell** (3 → 2: "hers or a friend's"), Mask (71 / 15 / 14). No Tell check here either (Chapter 5) | 4 + 3 | 7 vs 8 | **Cost**: the dog is beaten. Drop barred (it carries nothing). Turn 5 of 12 and 2 of 11 make Suspicion and Turns both cheap; its next roll may never come. The Storyteller takes **lose a Turn**: its next action would be setting off with the mirror | 2 |
| 6 | — | The Ghost loses its Turn. The Witch moves to the way out (no check: already come back to) | | | | | 2 |
| 7 | — | The Ghost **takes the gilt mirror** (Bulky, one carrier, and only it: an opened approach) and sets off | | | | | 2 |
| 7 | — | End of the Turn: the mirror, +1 | | | | | **3** |
| 8 | R93–R94 | The Ghost finishes its move first. Werewolf, the way out (Sly / Nimble / Brawn loud, 8, watched) | Nimble d12, **Good Dog** (2 → 1): 83 / 9 / 8 (a charge is lost at dawn anyway) | 10 + 4 (hidden) | 14 vs 8 | Success: **everyone out** | 3 |

**How the Year Went: Grand Year.** All five items and the gilt mirror; nobody left behind; no missing-kind lines. Out on **Turn 8** at **Suspicion 3 of 11**. Charges: 6 of 12 spent (Hedge Spell; Bat; Good Dog ×2; Through the Wall ×2). The mirror cost +1. The party was never near a chase: ten rolls (and five Tell checks) decided the raid.

---

## 7. Play log: main line C (a rolled Easy town, 3 Entities)

**Plan.** Dracula to the schoolhouse (the essential; Mesmerise at its watched back room), the Witch (Cook) to the butcher, the Werewolf to the bookseller (unwatched). Then the laundry, where Dracula's Butler Duty gives him the tablecloth's shopkeeper, and the bed if the party judges it worth it.

**Turn 1 (Sus 0).** Moves:

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R154 | the schoolhouse (Dracula) | 2 | — | 0 |
| R155, R156 | the butcher (Witch) | 6, then **Familiar's Warning**'s second d6: 3 | the cat warns her: no Tell | 0 |
| — | the bookseller (Werewolf): not watched | — | no check | 0 |

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R157–R158 | Dracula, schoolhouse way A (dark back room, Wits / Sly loud, 10, **watched**) | **Mesmerise** (3 → 2): Charm d12 at 8, Mask (71 / 15 / 14) | 5 + 4 | 9 vs 8 | Success (only Dracula through) | 0 |
| 2 | R159–R160 | Witch, butcher way A (locked front door, Sly / Brawn loud, 8, watched) | Sly d10 → d12 (Cook), Mask (71 / 15 / 14) | 7 + 4 | 11 vs 8 | Success: **the bacon** | 0 |
| 2 | R161–R162 | Werewolf, bookseller way B (nosy neighbour, Sly / Wits loud, 8, unwatched) | Sly d6, **Good Dog** (3 → 2): 65 / 18 / 17, quiet (the Mask: 42 / 31 / 28; Wits d8 the loud way: 56 / 23 / 21 and +1) | 6 + 6 | 12 vs 8 | **Critical**: a spent charge back (2 → 3) | 0 |
| 3 | R163–R164 | Dracula, schoolhouse (guard dog, Charm / Nimble loud, 8, unwatched) | Charm d12, Mask (71 / 15 / 14) | 1 + 3 | 4 vs 8 | Trouble (no chase) | 1 |
| 3 | R165–R166 | Werewolf, bookseller (shuttered window, Nimble / Brawn loud, 8, unwatched) | Nimble d12, Mask | 12 + 3 | 15 vs 8 | Success: **the ink** | 1 |
| 3 | — | The Witch moves to the laundry (unwatched: no check) | | | | | 1 |
| 4 | R167–R168 | Dracula, the guard dog again | Charm d12, Mask | 6 + 3 | 9 vs 8 | Success: **the writing paper** (essential) | 1 |
| 4 | R169–R170 | Witch, laundry way B (dark back room, Wits / Sly loud, 8, unwatched) | Wits d12, Mask (71 / 15 / 14) | 3 + 2 | 5 vs 8 | Trouble (no chase) | 2 |
| 4 | — | The Werewolf moves to the laundry | | | | | 2 |
| 5 | R171–R172 | Witch, the back room again | Wits d12, the Werewolf's **Good Dog** on her roll (3 → 2; "helping costs the charge, not your action"): 83 / 9 / 8 | 8 + 3 (hidden) | 11 vs 8 | Success | 2 |
| 5 | — | Dracula moves to the laundry. The Werewolf waits (his Charm d4 at the shopkeeper's 10 is hopeless) | | | | | 2 |
| 6 | R173–R174 | Dracula, laundry (shopkeeper, Charm / Sly loud, 10, unwatched) | Charm d12 (his Butler raise can't lift a d12), the Monster under Hypnotic Eyes (70 / 13 / 18; the Mask 54 / 17 / 29) | 1 + 2 | 3 vs 10 | Trouble. The Monster beat his die by 1: under Hypnotic Eyes nothing shows | 3 |
| 6 | R175–R176 | Witch, the shopkeeper | Charm d8 → d10 (**Hedge Spell**, 3 → 2), Mask (45 / 20 / 35, quiet; Sly d12 the loud way would be 54 / 17 / 29 and +1 every time) | 6 + 1 | 7 vs 10 | Trouble | 4 |
| 7 | R177–R178 | Dracula, the shopkeeper again | Charm d12, Monster (Hypnotic Eyes) | 4 + 1 | 5 vs 10 | Trouble | 5 |
| 7 | R179–R180 | Witch, the shopkeeper | Charm d10 (**Hedge Spell**, 2 → 1), the Werewolf's **Good Dog** (2 → 1): 64 / 15 / 21 | 10 + 5 (hidden) | 15 vs 10 | Success: **the lace tablecloth**. All four items | 5 |

Four items home would be a Win. The bed is behind a **group** obstacle (children in costumes, Charm 12, unwatched), and a Huge piece needs two carriers, so two of the party must each pass it. At Suspicion 5 of 11 with five Turns left, the party goes for it: being forked would cost the Win, but a flight on Easy is mob 10 and only a run of Trouble gets them there.

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 8 | R181–R184 | **Group check** at the furniture's children (Charm, 12): Dracula and the Witch declare, then roll together | Dracula: Charm d12, the Monster hidden by the Werewolf's **Good Dog** (1 → 0): 54 / 16 / 30. The Witch: Charm d8 → d10 (**Hedge Spell**, 1 → 0), Monster: 45 / 19 / 36 | Dracula 10 + 7 (hidden); Witch 4 + 4 | 17 and 8 vs 12 | Dracula Success; the Witch **Trouble** (doubles, not a Success; the tie shows nothing). "Suspicion rises only once, by the biggest trigger" | 6 |
| 8 | R185 | The Werewolf (his action still free) moves to the way out: Tell check | | 2 | — | — | 6 |
| 9 | R186–R187 | The Witch alone at the children | Charm d8, Monster (35 / 20 / 45 with a 55% show; an overdrawn Hedge Spell would be 45 / 19 / 36 at a flat +2) | 2 + 9 (shows) | 11 vs 12 | **Cost**: past. "Suspicion +1" would cost nothing (the show already raised it +2); "drop an item" (the bacon or the tablecloth) and "lose a Turn" both cost her next action; "A lost Turn bites near dawn": **lose a Turn** | 8 |
| 10 | — | The Witch loses her Turn; Dracula waits | | | | | 8 |
| 11 | — | Dracula and the Witch **take the bed** (Huge: two carriers, no Mask, Nimble one size smaller) and set off | | | | | 8 |
| 11 | — | End of the Turn: the bed, +1 | | | | | **9** |
| 12 | R188–R189 | Both carriers finish their move. Werewolf, the way out (Sly / Nimble / Brawn loud, 6, watched) | Nimble d12, Mask (86 / 10 / 4; no charges) | 1 + 4 | 5 vs 6 | **Cost**: everyone out, free (S7) | 9 |

**How the Year Went: Grand Year.** All four items and the four-poster bed, out in the **last Turn** at Suspicion 9 of 11. Charges: 8 spent of 9, one won back by the Critical (Mesmerise; Hedge Spell ×3; Good Dog ×4). The bed cost +1.

### 7.1 C2 (extra): the sharing rule, a chosen list (R238–R245)

The rolled list had two books and three places for them, so "two may share a place" never came up. To put it through the text I chose a list of **four silver, china and linen items** (an Easy list; the kind chosen, every item and place rolled): R238–R241 a lace tablecloth, bed linen, the silver spoons, a tea service. Places on a d3: the tablecloth R242 = 3 the laundry; the linen R243 = 1 the silversmith; the spoons R244 = 2 the china shop. The tea service has no free place left: "if a kind has more items than places, two may share a place", R245 = 3, **the laundry, with the tablecloth**.

Then the text runs out. "Locations: one for each item on the list" makes five locations; "two may share a place" puts two of them at the laundry; and Chapter 4's "A location: 1–3 obstacles, crossed in order, guarding a list item" gives one location one item. So is the laundry **one location guarding two items** (one obstacle count, one set of ways in, one Tell check, one visit for both) or **two locations both called the laundry** (two obstacle counts, two sets of ways in, a move between them)? Chapter 3 calls "a location" a "place" ("at the same place (a location, the way out or the lock-up)"), which leans to one. I'd rule one location with two items; the other reading costs the party about two more rolls and a Turn (finding m2).

---

## 8. Play log: drills

Default picks unless said; I chose each drill's start, and every roll after it is real.

### 8.1 Drill a: Out of Sight (V17)

**Start (chosen):** Gallowsmere, Turn 5, Suspicion 6. **The Invisible Man with Out of Sight** (otherwise default: Through the Gap, Tailor; Flour, Soon), 2 charges, empty-handed, at the butcher. The geese are beaten; next is the shopkeeper (Charm / Sly loud, 10, watched). He rolls Sly d12 the loud way with the Mask (54 / 17 / 29). Since the rule only bites on Trouble, I restarted each case from this start until a Trouble came.

**a1: a companion carrying loot at the same place.** The Creature stands with him at the butcher holding the lock and the spoons (S3: "with you" = at the same place). Tries 1–6 (R190–R201): 11 + 2, 5 + 5, 11 + 5, 6 + 2 (a Cost), 9 + 4, 12 + 3. Try 7 (R202–R203): **1 + 1 = 2 vs 10, Trouble** (loud and Trouble, one rise: +1, Suspicion 7). "Trouble gets you caught only while you or anyone with you carries loot or furniture": the Creature carries, so **he is caught**.

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R204 = 2 back alleys | Sly d12, **Unseen** (2 → 1): 63 / 14 / 23 against the Mask's 46 / 17 / 38 (mob 8 + 3 = 11) | 10 + 9 (shows, hidden) | 19 vs 11 | Success | 2 | 7 |
| 2 | R207 = 1 crowded square | Sly d12, **Unseen** (1 → 0) | 1 + 7 (shows, hidden) | 8 vs 11 | Trouble | 1 | 8 |
| 3 | R210 = 2 back alleys (mob 12) | Sly d12 → d10 (**Flour**), Monster: 45 / 19 / 36 against the Mask's 25 / 20 / 55 | 9 + 5 | 14 vs 12 | Success | 2 | 8 |
| 4 | R213 = 1 crowded square | Sly d10, Monster | 10 + 7 | 17 vs 12 | Success | 3 | 8 |
| 5 | R216 = 1 crowded square | Sly d10, Monster | 8 + 3 | 11 vs 12 | Cost (no change) | 3 | 8 |
| 6 | R219 = 1 crowded square | Sly d10, Monster | 7 + 10 (shows) | 17 vs 12 | Success: **escaped** | 4 | 10 |

Back before the shopkeeper, his Turn used up; 6 rounds, Suspicion 7 → 10.

**a2: alone and empty-handed.** The same start, nobody else at the butcher. Tries 1–7 (R222–R235): 8 + 1 and 6 + 2 (Costs), 9 + 3, 10 + 4, 10 + 1, 10 + 3, 5 + 4 (Successes). Try 8 (R236–R237): **4 + 3 = 7 vs 10, Trouble**: Suspicion +1 (7), and **no catch**: nobody with him carries anything. He may try again next Turn.

Both cases read cleanly at the table. What the text leaves open is the edge of "with you" (m1): a friend at the same location but before a different obstacle, a friend between places on a carried move, or a captive at the lock-up. At the way out it never helps once anyone holds loot: the whole party is there.

### 8.2 Drill b: Spectral (V19)

**Start (chosen):** Gallowsmere, Turn 5, Suspicion 6. **A Ghost** (default: Chill, Spectral, Butler; Cold Iron, Always), 2 charges, empty-handed, moves to the butcher, where friends have beaten the geese and the shopkeeper (not group: beaten for the party).

**b1, empty-handed.** "You get past group obstacles without rolling, at no action, even in a Turn you move, unless you carry loot or furniture": it passes the tug-of-war (group, Brawn 12) in the Turn it arrived, and **the bacon** is in its hand ("beat or pass the last and it's in your hand"). No roll.

**b2, carrying.** Turn 6: holding the bacon, it moves to the tailor, where a friend beat the drainpipe earlier and has gone; the crowded shop floor (group, Sly 10, watched) is ahead. Spectral doesn't work while it carries, and there is nobody to hand the bacon to; the book gives no way to set loot down (S4, finding m3). Turn 7, it rolls for itself:

| Roll | Choice | Dice | Total | Result | Sus |
|---|---|---|---|---|---|
| R246–R247 | Sly d10 → d12 (**Chill**, 2 → 1), Mask (54 / 17 / 29) | 5 + 1 | 6 vs 10 | **Trouble**, caught | 7 |

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R248 = 5 parade (mob 8 + 3 = 11) | Sly d10 → d8 (Cold Iron) → d10 (**Chill**, 1 → 0), Monster: 55 / 17 / 28 | 7 + 1 | 8 vs 11 | Trouble: **cornered** | 0 | 8 |

**Captured**, and "the town takes back what you were carrying": the bacon is gone for the night. V19 read cleanly, and it bit hard: the bacon cost a capture.

### 8.3 Drill c: Mesmerise (B7)

**Start (chosen):** Gallowsmere, **Dracula** (default: Bat, Hypnotic Eyes, Butler; Garlic, Always), 3 charges.

| Case | Obstacle | Ruling | Roll | Dice | Total | Result |
|---|---|---|---|---|---|---|
| c1 | The smithy's night watchman (Wits, 10, **watched**), after a friend opened the garden wall | Charm isn't listed and someone's watching: **Mesmerise** (3 → 2), Charm d12 at 8, Mask (71 / 15 / 14) | R271–R272 | 6 + 3 | 9 vs 8 | Success: only Dracula gets through |
| c2 | The butcher's tug-of-war (group, Brawn, 12, **unwatched**; the butcher itself is watched) | **Refused** under S2: nobody watches this obstacle. Under the location reading it would be Charm d12 at 10 (54 / 17 / 29 with the Mask). He rolls Brawn d8 with the Monster instead (35 / 20 / 45) | R273–R274 | 7 + 5 | 12 vs 12 | Success (lucky); no show |
| c3 | Captured, slipping free at the lock-up (Sly or Nimble, or Brawn loud, at 10) | "a captive may open its own way out"; the lock-up is "always watched" (S10): **Mesmerise** (2 → 1), Charm d12 at 8, Mask | R275–R276 | 8 + 5 | 13 vs 8 | Success: free ("Only a Success frees you") |

Under S2, Mesmerise reaches 8 of Gallowsmere's 18 obstacles (the watched ones that don't list Charm); under the location reading, 13. In main line A the difference came up on Dracula's second roll of the night (the printer's back room: Charm d12 at 6, 86 / 10 / 4, against the Sly d8 at 8 he rolled, 56 / 23 / 21 and +1 every time; it took him two Turns and +2 Suspicion). Finding M1.

### 8.4 Drill d: a capture on Hard and a rescue at the lock-up (10)

**Start:** where drill b2 ended: Gallowsmere, the Ghost **captured** at the end of Turn 7, Suspicion 8. The Creature (default: Brute Force, Mountain Stride, Strong Back, Handyman; Fire, Soon), 3 charges, empty-handed, comes for it. Main line A gave a real Hard capture too (the Invisible Man, Turn 4, who slipped free on his third try).

| Turn | Roll | Who | Choice | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 8 | R251–R252 | Ghost slips free (from the Turn after its capture) | Nimble d12, Mask (54 / 17 / 29; Cold Iron is a chase rule) | 3 + 3 | 6 vs 10 | Trouble: no chase | 9 |
| 8 | R253 | The Creature moves to the lock-up: Tell check | | 2 | — | — | 9 |
| 9 | R254–R255 | Creature, rescue (Sly, or Brawn loud, 10, always watched) | **Mountain Stride** (3 → 2): Nimble isn't listed, so Nimble d8 at 8, Mask (56 / 23 / 21: a Success or a Cost frees, 79%, against Brawn d12 the loud way's 71% and +1 every time) | 3 + 2 | 5 vs 8 | **Trouble**: "a rescuer's Trouble gets them caught as usual" | 10 |

**The Creature's local chase** (Lead 1, escape at 4; mob 8 + 5 = 13, held at **12**; Fire from round 3):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R256 = 4 rooftops | **Brute Force** (2 → 1): Brawn d12, Monster (54 / 16 / 30) | 7 + 5 | 12 vs 12 | Success | 2 | 10 |
| 2 | R259 = 4 rooftops | **Brute Force** (1 → 0): Brawn d12, Monster | 8 + 4 | 12 vs 12 | Success | 3 | 10 |
| 3 | R262 = 1 crowded square (Sly d6 → d4, Charm d4: Fire) | Brute Force **overdrawn** (+2): Brawn d12 → d10 (Fire), Monster: 45 / 19 / 36, against Sly d4's 15 / 20 / 65 | 10 + 5 | 15 vs 12 | Success: **escaped** | 4 | 12 |

He is back at the lock-up ("back where you were caught").

| Turn | Roll | Who | Choice | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 9 | R265–R266 | Ghost slips free | Nimble d12, Mask | 4 + 2 | 6 vs 10 | Trouble | 13 |
| 10 | R267–R268 | Ghost slips free (first, so the Creature need not take the loud way at 13) | Nimble d12, Mask | 9 + 2 | 11 vs 10 | **Success**: free at the lock-up, acts again next Turn | 13 |

**d2: a rescue at 10 (chosen start, R269–R270).** The same capture; the Creature, with no charge to spare, rescues with Brawn d12 the loud way, Mask (54 / 17 / 29): **5 + 6 = 11 vs 10, Success** (loud +1): "Beat it (a Success or a Cost) and every captive there is free, at the lock-up, and acts again next Turn"; a later capture would face "a new rescue obstacle".

The lock-up at 10 read the same on every label (Chapter 6, Chapter 8's table, Gallowsmere's line, At the Table). With the Mask, a Sly or Nimble d12 slips free 54% of the time per Turn at 10 (it was 38% at Hard's old 12); Built to Last frees on a Success or a Cost, 71%. Both real captives here slipped free on their third Turn.

### 8.5 Drill e: Hidden Pockets, captured while carrying the piece (V16)

**Start (chosen):** Gallowsmere: **the Invisible Man with Hidden Pockets** (otherwise default: Through the Gap, Tailor; Flour, Soon), carrying **the bandages and the suit of armour** (Bulky; he carries it alone), caught at the way out on a Trouble. A carrier "can't use the Mask" and his Nimble is a d6; he keeps carrying through the chase (dropping the armour would only buy the Mask, which is worse than the Monster on his best dice at mob 12). Lead 1, escape at 4. I ran it until a capture came.

**e1** (Suspicion 9 after the catch, 1 charge; R277–R291). R277 = 5 parade: Sly d12, **Unseen** (1 → 0): 10 + 10, **Critical**, Lead 3. R280 = 4 rooftops: Wits d10, Monster: 9 + 2 = 11, Cost. R283 = 4 rooftops (Flour): Wits d8: 3 + 6, Trouble and a show, Lead 2, Sus 11. R286 = 4: 4 + 7, Cost and a show, Sus 13. R289 = 4: 6 + 9 = 15, Success, Lead 3, and the show brings **the Limit** (15): "that chase ends at once and those Entities join the flight". Not captured: he joins the final flight carrying the armour.

**e2** (restart, Suspicion 6, 1 charge; R292–R309). R292 = 2 back alleys: Sly d12, Unseen (1 → 0): 9 + 8, Success, Lead 2. R295 = 3 market stalls: Nimble d6 (carrying), Monster: 6 + 10, Success and a show, Lead 3, Sus 8. R298 = 6 dead end (Flour): Wits d8: 6 + 2, Trouble, Lead 2, Sus 9. R301 = 6: 7 + 3, Cost. R304 = 4: 2 + 10 = 12, Success and a show, Lead 3, Sus 11. R307 = 1: Sly d10: 7 + 9 = 16, Success: **escaped** (Sus 13).

**e3** (restart, Suspicion 8, no charges; R310–R324):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R310 = 4 rooftops | Wits d10, Monster (no Mask: carrying) | 10 + 2 | 12 vs 12 | Success | 2 | 8 |
| 2 | R313 = 2 back alleys | Sly d12, Monster | 2 + 7 (shows) | 9 vs 12 | Trouble | 1 | 10 |
| 3 | R316 = 1 crowded square | Sly d12 → d10 (Flour), Monster | 4 + 8 (shows) | 12 vs 12 | Success | 2 | 12 |
| 4 | R319 = 3 market stalls | Nimble d8 → d6 (carrying) → d4 (Flour), Monster | 3 + 4 (shows) | 7 vs 12 | Trouble | 1 | 14 |
| 5 | R322 = 1 crowded square | Sly d10, Monster | 1 + 2 (shows) | 3 vs 12 | Trouble: **cornered**, as the show brings **the Limit** | 0 | 15 |

"Anyone the same round cornered is captured first and stays behind." **Captured**: "the town takes back what you were carrying, furniture included", but Hidden Pockets: "captured, you keep the loot you carry (not furniture)". He keeps **the bandages**; **the suit of armour** is gone for the night. The rest of the party flees in the final flight without him; if they escape he is left behind, and his bandages don't come home with them (Chapter 7: "look at what came home"). V16 read cleanly in one reading.

### 8.6 Drill f: the Tell check at the hatter (V20)

Main line B (Turn 4) already did it: the Ghost and the Witch arrived at the hatter and no check was rolled. **Start (chosen):** Thistlewick, Turn 1, Suspicion 0: the Werewolf (default) and Dracula (default) move to the hatter. **No Tell check**: neither way in is watched, and Chapter 5 says "(a watched furniture obstacle doesn't count …)"; the map's title agrees ("Watched: 1 the baker, 2 the china shop, 4 the ironmonger, 5 the seed merchant"). Mesmerise is no use at the neighbour (unwatched, S2).

| Turn | Roll | Who / where | Choice | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R325–R326 | Werewolf, the nosy neighbour (Sly / Wits loud, 8, unwatched) | Sly d6, **Good Dog** (3 → 2) | 5 + 9 (hidden) | 14 vs 8 | Success: **the top hat** | 0 |
| 3 | R328–R329 | Dracula, the furniture's guard dog (Charm / Nimble loud, 10, **watched**) | Charm d12, Mask (54 / 17 / 29). No Tell check on reaching it; a Trouble here would get him caught ("it's the obstacle you roll that counts") | 10 + 1 | 11 vs 10 | Success: the gilt mirror is his to take | 0 |

(R327, a d2, was rolled by mistake and not used.) The text answered every step. The one seam: Chapter 4's "It's watched if any obstacle is, either way in" doesn't itself set the furniture's obstacle aside, so a reader of Chapter 4 alone could call the hatter watched (finding w3).

### 8.7 Drill g: a raid's lookups from the At the Table page alone (main line B)

I ran main line B's lookups from the At the Table page, the Entity sheets and Thistlewick's page. The page carried the roll and its results, the Cost options, the Monster showing, "One raise per roll", the overdraw (now with "from your own next roll"), the Duty raise, group obstacles ("everyone rolls"), "Carrying: moves take two Turns", the way out's traits and "one roll for all", the Suspicion triggers with the Tell's "4–6 on a d6, first visit to a watched place" and the furniture's "each Turn once taken", the results, and every Standard number. I still needed a chapter for these:

1. **The Duty clash** among defaults (the Ghost's and Dracula's Butler): only Chapter 2.
2. **Which places are watched**, and that the hatter isn't although its furniture's dog is: Chapter 4 ("either way in"), Chapter 5 (the furniture's exception) and Chapter 9's map.
3. **Two ways in, keep to one** (the hatter's rooftops): Chapters 4 and 9.
4. **Choosing a Cost**: "never a Cost that costs nothing right then" and "'drop an item' … never what this roll wins" (three Costs in main B): only Chapter 3.
5. **A Duty's raise meeting a Cost's smaller die** (the Werewolf at the watchman): "Raises and steps down cancel out" is only in Chapter 3.
6. **Where an approach can be opened** (Through the Wall at the strongbox and the dog): "if it doesn't list the ability's trait" is only in Chapter 3; Mesmerise's "where someone's watching" is on Dracula's sheet.
7. **Handing loot over** before Spectral: "hand it over free in the same place" is only in Chapter 4.
8. **Passing the last obstacle gets the item** (the top hat by Spectral): only Chapter 4.
9. **Helping a friend's roll** (the Witch's Hedge Spell on the Ghost's): the Hedge Spell text says "hers or a friend's"; the general rule ("helping costs the charge, not your action", "at the same place") is only in Chapter 3.
10. **The furniture**: when its obstacle may be tried, that a Bulky piece needs one carrier, what carrying does to a carrier, and that only the opener carries a piece out its way: Chapters 3 and 4.
11. **When a piece starts its noise** (taken, not beaten): "Taking a piece is free" is only in Chapter 4; the page's "once taken" helps.
12. **"Lose a Turn"** (the Ghost, Turn 5): "you skip your next action" is in Chapter 3; the Entity Sheet's "action: lost" box half-says it.
13. **When a carried move ends** (the Ghost, Turn 8): "you're between places until you act in the second" is only in Chapter 4.
14. **The way out**: that everyone not captured must be there, that it is watched, its Tell check on the first return, and that a Cost gets everyone out free: Chapters 4 and 5.

Items 2–4 and 6–14 are the gaps PT6 and PT7 listed (their m4); the page gained the overdraw's timing since PT7 and nothing else. Finding m5.

---

## 9. Findings

(In progress.)

---

## 11. Roll appendix

| Roll | What | Die | Result |
|---|---|---|---|
| R1 | A: fourth Entity (d8 book order; reroll 1,5,6) | d8 | 2 |
| R2 | A: Dracula Gift | d6 | 5 |
| R3 | A: Dracula Perk | d6 | 2 |
| R4 | A: Dracula Duty (table) | d6 | 3 |
| R5 | A: Creature Gift | d6 | 6 |
| R6 | A: Creature Perk | d6 | 5 |
| R7 | A: Creature Duty (table) | d6 | 4 |
| R8 | A: Ghost Gift | d6 | 5 |
| R9 | A: Ghost Perk | d6 | 2 |
| R10 | A: Ghost Duty (table) | d6 | 2 |
| R11 | A: Invisible Man Gift | d6 | 3 |
| R12 | A: Invisible Man Perk | d6 | 5 |
| R13 | A: Invisible Man Duty (table) | d6 | 2 |
| R14 | A: Invisible Man Duty reroll (Gardener taken) | d6 | 3 |
| R15 | A: Invisible Man Duty reroll (Librarian taken) | d6 | 3 |
| R16 | A: Invisible Man Duty reroll (Librarian taken) | d6 | 6 |
| R17 | A T1: Tell check smithy (Ghost) | d6 | 1 |
| R18 | A T1: Tell check silversmith (Creature) | d6 | 1 |
| R19 | A T1: Tell check printer (Dracula) | d6 | 1 |
| R20 | A T1: Tell check tailor (Invisible Man) | d6 | 4 |
| R21 | A T2: Ghost garden wall Nimble | d12 | 2 |
| R22 | A T2: Ghost Mask | d6 | 1 |
| R23 | A T2: Creature window Nimble(Butler) | d10 | 6 |
| R24 | A T2: Creature Mask | d6 | 1 |
| R25 | A T2: Dracula neighbour Mesmerise Charm | d12 | 7 |
| R26 | A T2: Dracula Mask | d6 | 2 |
| R27 | A T2: Invisible Man drainpipe Nimble(Tailor) | d10 | 1 |
| R28 | A T2: Invisible Man Mask | d6 | 5 |
| R29 | A T2: Ghost local chase round 1 ground | d6 | 4 |
| R30 | A T2: Ghost chase r1 Nimble d12->d10 (Cold Iron) | d10 | 8 |
| R31 | A T2: Ghost chase r1 Monster (Fade) | d10 | 8 |
| R32 | A T2: Ghost chase round 2 ground | d6 | 3 |
| R33 | A T2: Ghost chase r2 Nimble d10 (Cold Iron) | d10 | 6 |
| R34 | A T2: Ghost chase r2 Mask | d6 | 4 |
| R35 | A T3: Ghost garden wall Nimble | d12 | 8 |
| R36 | A T3: Ghost Mask | d6 | 5 |
| R37 | A T3: Creature guard dog Brute Force Brawn d12 (raise+step cancel) | d12 | 4 |
| R38 | A T3: Creature Mask | d6 | 6 |
| R39 | A T3: Dracula back room Sly d6->d8 (Librarian) loud | d8 | 1 |
| R40 | A T3: Dracula Mask | d6 | 2 |
| R41 | A T4: Ghost watchman Through the Wall Sly at 8 | d10 | 10 |
| R42 | A T4: Ghost Mask | d6 | 1 |
| R43 | A T4: Creature strongbox Wits d10->d12 (Butler) | d12 | 7 |
| R44 | A T4: Creature Mask | d6 | 1 |
| R45 | A T4: Dracula back room Sly d8 loud | d8 | 7 |
| R46 | A T4: Dracula Mask | d6 | 3 |
| R47 | A T4: Invisible Man shop floor Sly d12 | d12 | 2 |
| R48 | A T4: Invisible Man Monster (Unseen) | d10 | 5 |
| R49 | A T4: Invisible Man local chase r1 ground | d6 | 2 |
| R50 | A T4: IM chase r1 Sly | d12 | 3 |
| R51 | A T4: IM chase r1 Monster (Unseen) | d10 | 3 |
| R52 | A T5: IM slip free Sly | d12 | 4 |
| R53 | A T5: IM Monster (Unseen) | d10 | 5 |
| R54 | A T6: IM slip free Sly | d12 | 4 |
| R55 | A T6: IM Mask | d6 | 2 |
| R56 | A T6: Ghost trapdoor Through the Wall Sly at 10 | d10 | 6 |
| R57 | A T6: Ghost Monster | d10 | 8 |
| R58 | A T6: Tell check lock-up (Dracula arrives) | d6 | 5 |
| R59 | A T6: Tell check way out (Creature comes back) | d6 | 2 |
| R60 | A T7: IM slip free Sly | d12 | 12 |
| R61 | A T7: IM Mask | d6 | 1 |
| R62 | A T8: Dracula way out Mesmerise Charm at 8 | d12 | 6 |
| R63 | A T8: Dracula Monster (Hypnotic Eyes) | d10 | 1 |
| R64 | B: Entity 1 (d8) | d8 | 7 |
| R65 | B: Entity 2 (d8) | d8 | 1 |
| R66 | B: Entity 3 (d8) | d8 | 4 |
| R67 | B: Entity 4 (d8) | d8 | 1 |
| R68 | B: Entity 4 reroll (Dracula repeat) | d8 | 6 |
| R69 | B: Ghost Duty (default Butler clashes with Dracula; d6 table) | d6 | 5 |
| R70 | B T1: Tell check baker (Witch) | d6 | 3 |
| R71 | B T1: Tell check china shop (Dracula) | d6 | 3 |
| R72 | B T1: Tell check seed merchant (Werewolf) | d6 | 5 |
| R73 | B T1: Tell check ironmonger (Ghost) | d6 | 4 |
| R74 | B T2: Witch shop floor Sly d10->d12 (Cook) | d12 | 10 |
| R75 | B T2: Witch Mask | d6 | 3 |
| R76 | B T2: Dracula front door Sly d6->d8 (Butler) | d8 | 7 |
| R77 | B T2: Dracula Mask | d6 | 5 |
| R78 | B T2: Werewolf geese Sly d6->d8 (Gardener) | d8 | 3 |
| R79 | B T2: Werewolf Mask | d6 | 1 |
| R80 | B T2: Ghost cart Brawn d4->d6 (Handyman) | d6 | 4 |
| R81 | B T2: Ghost Mask | d6 | 5 |
| R82 | B T3: Witch shopkeeper Charm d8->d10 (Cook) | d10 | 5 |
| R83 | B T3: Witch Mask | d6 | 4 |
| R84 | B T3: Dracula back room Bat Nimble d10->d12 (Butler) | d12 | 5 |
| R85 | B T3: Dracula Mask | d6 | 1 |
| R86 | B T3: Werewolf watchman Wits d8 (Gardener raise, Cost step: cancel) | d8 | 7 |
| R87 | B T3: Werewolf Monster (Good Dog) | d10 | 5 |
| R88 | B T3: Ghost strongbox Through the Wall Sly d10->d12 (Handyman) at 6 | d12 | 3 |
| R89 | B T3: Ghost Mask | d6 | 4 |
| R90 | B T4: Tell check way out (Dracula, Werewolf come back) | d6 | 1 |
| R91 | B T5: Ghost guard dog Through the Wall Sly d10->d12 (Witch's Hedge Spell) at 8 | d12 | 4 |
| R92 | B T5: Ghost Mask | d6 | 3 |
| R93 | B T8: Werewolf way out Nimble | d12 | 10 |
| R94 | B T8: Werewolf Monster (Good Dog) | d10 | 4 |
| R95 | C: list item 1 kind | d6 | 3 |
| R96 | C: list item 1 item | d6 | 2 |
| R97 | C: list item 2 kind | d6 | 3 |
| R98 | C: list item 2 item | d6 | 4 |
| R99 | C: list item 3 kind | d6 | 1 |
| R100 | C: list item 3 item | d6 | 2 |
| R101 | C: list item 4 kind | d6 | 4 |
| R102 | C: list item 4 item | d6 | 4 |
| R103 | C: Lantern Night custom | d6 | 5 |
| R104 | C: place for the writing paper (books: bookseller/printer/schoolhouse) | d3 | 3 |
| R105 | C: place for the ink (books) | d3 | 3 |
| R106 | C: place for the bacon (food: baker/butcher/tavern cellar) | d3 | 2 |
| R107 | C: place for the lace tablecloth (silver: silversmith/china shop/laundry) | d3 | 3 |
| R108 | C: place for the ink, reroll (schoolhouse taken) | d3 | 1 |
| R109 | C: obstacles at schoolhouse | d20 | 12 |
| R110 | C: obstacles at bookseller | d20 | 15 |
| R111 | C: obstacles at butcher | d20 | 9 |
| R112 | C: obstacles at laundry | d20 | 17 |
| R113 | C: schoolhouse way A obstacle table | d20 | 18 |
| R114 | C: schoolhouse way A Difficulty | d20 | 15 |
| R115 | C: schoolhouse way A watched | d10 | 2 |
| R116 | C: schoolhouse way B obstacle table | d20 | 15 |
| R117 | C: schoolhouse way B Difficulty | d20 | 18 |
| R118 | C: schoolhouse way B watched | d10 | 1 |
| R119 | C: schoolhouse then obstacle table | d20 | 14 |
| R120 | C: schoolhouse then Difficulty | d20 | 5 |
| R121 | C: schoolhouse then watched | d10 | 5 |
| R122 | C: bookseller way A obstacle table | d20 | 14 |
| R123 | C: bookseller way A Difficulty | d20 | 20 |
| R124 | C: bookseller way A watched | d10 | 6 |
| R125 | C: bookseller way B obstacle table | d20 | 10 |
| R126 | C: bookseller way B Difficulty | d20 | 11 |
| R127 | C: bookseller way B watched | d10 | 7 |
| R128 | C: bookseller then obstacle table | d20 | 6 |
| R129 | C: bookseller then Difficulty | d20 | 5 |
| R130 | C: bookseller then watched | d10 | 10 |
| R131 | C: butcher way A obstacle table | d20 | 9 |
| R132 | C: butcher way A Difficulty | d20 | 9 |
| R133 | C: butcher way A watched | d10 | 3 |
| R134 | C: butcher way B obstacle table | d20 | 13 |
| R135 | C: butcher way B Difficulty | d20 | 11 |
| R136 | C: butcher way B watched | d10 | 1 |
| R137 | C: laundry way A obstacle table | d20 | 16 |
| R138 | C: laundry way A Difficulty | d20 | 17 |
| R139 | C: laundry way A watched | d10 | 5 |
| R140 | C: laundry way B obstacle table | d20 | 18 |
| R141 | C: laundry way B Difficulty | d20 | 7 |
| R142 | C: laundry way B watched | d10 | 10 |
| R143 | C: laundry then obstacle table | d20 | 13 |
| R144 | C: laundry then Difficulty | d20 | 14 |
| R145 | C: laundry then watched | d10 | 9 |
| R146 | C: furniture's obstacle obstacle table | d20 | 16 |
| R147 | C: furniture's obstacle Difficulty | d20 | 17 |
| R148 | C: furniture's obstacle watched | d10 | 9 |
| R149 | C: furniture piece | d6 | 6 |
| R150 | C: furniture location (1-4 in list order, reroll 5-6) | d6 | 4 |
| R151 | C: Entity 1 (d8) | d8 | 7 |
| R152 | C: Entity 2 (d8) | d8 | 4 |
| R153 | C: Entity 3 (d8) | d8 | 1 |
| R154 | C T1: Tell check schoolhouse (Dracula) | d6 | 2 |
| R155 | C T1: Tell check butcher (Witch) | d6 | 6 |
| R156 | C T1: Familiar's Warning second d6 (butcher) | d6 | 3 |
| R157 | C T2: Dracula back room Mesmerise Charm at 8 | d12 | 5 |
| R158 | C T2: Dracula Mask | d6 | 4 |
| R159 | C T2: Witch front door Sly d10->d12 (Cook) | d12 | 7 |
| R160 | C T2: Witch Mask | d6 | 4 |
| R161 | C T2: Werewolf neighbour Sly | d6 | 6 |
| R162 | C T2: Werewolf Monster (Good Dog) | d10 | 6 |
| R163 | C T3: Dracula guard dog Charm | d12 | 1 |
| R164 | C T3: Dracula Mask | d6 | 3 |
| R165 | C T3: Werewolf window Nimble | d12 | 12 |
| R166 | C T3: Werewolf Mask | d6 | 3 |
| R167 | C T4: Dracula guard dog Charm | d12 | 6 |
| R168 | C T4: Dracula Mask | d6 | 3 |
| R169 | C T4: Witch laundry back room Wits | d12 | 3 |
| R170 | C T4: Witch Mask | d6 | 2 |
| R171 | C T5: Witch laundry back room Wits | d12 | 8 |
| R172 | C T5: Witch Monster (Werewolf's Good Dog) | d10 | 3 |
| R173 | C T6: Dracula laundry shopkeeper Charm | d12 | 1 |
| R174 | C T6: Dracula Monster (Hypnotic Eyes) | d10 | 2 |
| R175 | C T6: Witch laundry shopkeeper Charm d8->d10 (Hedge Spell) | d10 | 6 |
| R176 | C T6: Witch Mask | d6 | 1 |
| R177 | C T7: Dracula laundry shopkeeper Charm | d12 | 4 |
| R178 | C T7: Dracula Monster (Hypnotic Eyes) | d10 | 1 |
| R179 | C T7: Witch shopkeeper Charm d8->d10 (Hedge Spell) | d10 | 10 |
| R180 | C T7: Witch Monster (Werewolf's Good Dog) | d10 | 5 |
| R181 | C T8: group check children (furniture) Dracula Charm | d12 | 10 |
| R182 | C T8: Dracula Monster (Werewolf's Good Dog) | d10 | 7 |
| R183 | C T8: Witch Charm d8->d10 (Hedge Spell) | d10 | 4 |
| R184 | C T8: Witch Monster | d10 | 4 |
| R185 | C T8: Tell check way out (Werewolf comes back) | d6 | 2 |
| R186 | C T9: Witch children Charm | d8 | 2 |
| R187 | C T9: Witch Monster | d10 | 9 |
| R188 | C T12: Werewolf way out Nimble | d12 | 1 |
| R189 | C T12: Werewolf Mask | d6 | 4 |
| R190 | Drill a1 try 1: IM shopkeeper Sly (loud) | d12 | 11 |
| R191 | Drill a1 try 1: IM Mask | d6 | 2 |
| R192 | Drill a1 try 2 (restart): IM shopkeeper Sly (loud) | d12 | 5 |
| R193 | Drill a1 try 2: IM Mask | d6 | 5 |
| R194 | Drill a1 try 3 (restart): IM shopkeeper Sly (loud) | d12 | 11 |
| R195 | Drill a1 try 3: IM Mask | d6 | 5 |
| R196 | Drill a1 try 4 (restart): IM shopkeeper Sly (loud) | d12 | 6 |
| R197 | Drill a1 try 4: IM Mask | d6 | 2 |
| R198 | Drill a1 try 5 (restart): IM shopkeeper Sly (loud) | d12 | 9 |
| R199 | Drill a1 try 5: IM Mask | d6 | 4 |
| R200 | Drill a1 try 6 (restart): IM shopkeeper Sly (loud) | d12 | 12 |
| R201 | Drill a1 try 6: IM Mask | d6 | 3 |
| R202 | Drill a1 try 7 (restart): IM shopkeeper Sly (loud) | d12 | 1 |
| R203 | Drill a1 try 7: IM Mask | d6 | 1 |
| R204 | Drill a1: IM local chase r1 ground | d6 | 2 |
| R205 | Drill a1: IM chase r1 Sly | d12 | 10 |
| R206 | Drill a1: IM chase r1 Monster (Unseen) | d10 | 9 |
| R207 | Drill a1: IM chase r2 ground | d6 | 1 |
| R208 | Drill a1: IM chase r2 Sly | d12 | 1 |
| R209 | Drill a1: IM chase r2 Monster (Unseen) | d10 | 7 |
| R210 | Drill a1: IM chase r3 ground | d6 | 2 |
| R211 | Drill a1: IM chase r3 Sly d12->d10 (Flour) | d10 | 9 |
| R212 | Drill a1: IM chase r3 Monster | d10 | 5 |
| R213 | Drill a1: IM chase r4 ground | d6 | 1 |
| R214 | Drill a1: IM chase r4 Sly d12->d10 (Flour) | d10 | 10 |
| R215 | Drill a1: IM chase r4 Monster | d10 | 7 |
| R216 | Drill a1: IM chase r5 ground | d6 | 1 |
| R217 | Drill a1: IM chase r5 Sly d12->d10 (Flour) | d10 | 8 |
| R218 | Drill a1: IM chase r5 Monster | d10 | 3 |
| R219 | Drill a1: IM chase r6 ground | d6 | 1 |
| R220 | Drill a1: IM chase r6 Sly d12->d10 (Flour) | d10 | 7 |
| R221 | Drill a1: IM chase r6 Monster | d10 | 10 |
| R222 | Drill a2 try 1 (restart): IM alone shopkeeper Sly (loud) | d12 | 8 |
| R223 | Drill a2 try 1: IM Mask | d6 | 1 |
| R224 | Drill a2 try 2 (restart): IM alone shopkeeper Sly (loud) | d12 | 9 |
| R225 | Drill a2 try 2: IM Mask | d6 | 3 |
| R226 | Drill a2 try 3 (restart): IM alone shopkeeper Sly (loud) | d12 | 10 |
| R227 | Drill a2 try 3: IM Mask | d6 | 4 |
| R228 | Drill a2 try 4 (restart): IM alone shopkeeper Sly (loud) | d12 | 10 |
| R229 | Drill a2 try 4: IM Mask | d6 | 1 |
| R230 | Drill a2 try 5 (restart): IM alone shopkeeper Sly (loud) | d12 | 6 |
| R231 | Drill a2 try 5: IM Mask | d6 | 2 |
| R232 | Drill a2 try 6 (restart): IM alone shopkeeper Sly (loud) | d12 | 10 |
| R233 | Drill a2 try 6: IM Mask | d6 | 3 |
| R234 | Drill a2 try 7 (restart): IM alone shopkeeper Sly (loud) | d12 | 5 |
| R235 | Drill a2 try 7: IM Mask | d6 | 4 |
| R236 | Drill a2 try 8 (restart): IM alone shopkeeper Sly (loud) | d12 | 4 |
| R237 | Drill a2 try 8: IM Mask | d6 | 3 |
| R238 | C2: silver item 1 | d6 | 4 |
| R239 | C2: silver item 2 | d6 | 3 |
| R240 | C2: silver item 3 | d6 | 1 |
| R241 | C2: silver item 4 | d6 | 2 |
| R242 | C2: place for lace tablecloth | d3 | 3 |
| R243 | C2: place for bed linen | d3 | 1 |
| R244 | C2: place for silver spoons | d3 | 2 |
| R245 | C2: place for tea service (all three taken: shares) | d3 | 3 |
| R246 | Drill b2: Ghost (carrying bacon) crowded shop floor Sly d10->d12 (Chill) | d12 | 5 |
| R247 | Drill b2: Ghost Mask | d6 | 1 |
| R248 | Drill b2: Ghost local chase r1 ground | d6 | 5 |
| R249 | Drill b2: Ghost chase r1 Sly d10->d8 (Cold Iron)->d10 (Chill) | d10 | 7 |
| R250 | Drill b2: Ghost chase r1 Monster | d10 | 1 |
| R251 | Drill d T8: Ghost slip free Nimble | d12 | 3 |
| R252 | Drill d T8: Ghost Mask | d6 | 3 |
| R253 | Drill d T8: Tell check lock-up (Creature arrives) | d6 | 2 |
| R254 | Drill d T9: Creature rescue Mountain Stride Nimble at 8 | d8 | 3 |
| R255 | Drill d T9: Creature Mask | d6 | 2 |
| R256 | Drill d T9: Creature local chase r1 ground | d6 | 4 |
| R257 | Drill d T9: Creature chase r1 Brute Force Brawn | d12 | 7 |
| R258 | Drill d T9: Creature chase r1 Monster | d10 | 5 |
| R259 | Drill d T9: Creature chase r2 ground | d6 | 4 |
| R260 | Drill d T9: Creature chase r2 Brute Force Brawn | d12 | 8 |
| R261 | Drill d T9: Creature chase r2 Monster | d10 | 4 |
| R262 | Drill d T9: Creature chase r3 ground | d6 | 1 |
| R263 | Drill d T9: Creature chase r3 Brute Force overdrawn Brawn d12->d10 (Fire) | d10 | 10 |
| R264 | Drill d T9: Creature chase r3 Monster | d10 | 5 |
| R265 | Drill d T9: Ghost slip free Nimble | d12 | 4 |
| R266 | Drill d T9: Ghost Mask | d6 | 2 |
| R267 | Drill d T10: Ghost slip free Nimble | d12 | 9 |
| R268 | Drill d T10: Ghost Mask | d6 | 2 |
| R269 | Drill d2: Creature rescue Brawn (loud) at 10 | d12 | 5 |
| R270 | Drill d2: Creature Mask | d6 | 6 |
| R271 | Drill c1: Dracula smithy watchman Mesmerise Charm at 8 | d12 | 6 |
| R272 | Drill c1: Dracula Mask | d6 | 3 |
| R273 | Drill c2: Dracula tug-of-war (unwatched) Brawn at 12 | d8 | 7 |
| R274 | Drill c2: Dracula Monster | d10 | 5 |
| R275 | Drill c3: Dracula captive slips free Mesmerise Charm at 8 | d12 | 8 |
| R276 | Drill c3: Dracula Mask | d6 | 5 |
| R277 | Drill e: IM (carrying armour) local chase r1 ground | d6 | 5 |
| R278 | Drill e: IM chase r1 Sly | d12 | 10 |
| R279 | Drill e: IM chase r1 Monster (Unseen; carrier, no Mask) | d10 | 10 |
| R280 | Drill e: IM chase r2 ground | d6 | 4 |
| R281 | Drill e: IM chase r2 Wits | d10 | 9 |
| R282 | Drill e: IM chase r2 Monster | d10 | 2 |
| R283 | Drill e: IM chase r3 ground | d6 | 4 |
| R284 | Drill e: IM chase r3 Wits d10->d8 (Flour) | d8 | 3 |
| R285 | Drill e: IM chase r3 Monster | d10 | 6 |
| R286 | Drill e: IM chase r4 ground | d6 | 4 |
| R287 | Drill e: IM chase r4 Wits d10->d8 (Flour) | d8 | 4 |
| R288 | Drill e: IM chase r4 Monster | d10 | 7 |
| R289 | Drill e: IM chase r5 ground | d6 | 4 |
| R290 | Drill e: IM chase r5 Wits d10->d8 (Flour) | d8 | 6 |
| R291 | Drill e: IM chase r5 Monster | d10 | 9 |
| R292 | Drill e2 (restart, Sus 6): IM chase r1 ground | d6 | 2 |
| R293 | Drill e2: IM chase r1 Sly | d12 | 9 |
| R294 | Drill e2: IM chase r1 Monster (Unseen) | d10 | 8 |
| R295 | Drill e2: IM chase r2 ground | d6 | 3 |
| R296 | Drill e2: IM chase r2 Nimble d8->d6 (carrying) | d6 | 6 |
| R297 | Drill e2: IM chase r2 Monster | d10 | 10 |
| R298 | Drill e2: IM chase r3 ground | d6 | 6 |
| R299 | Drill e2: IM chase r3 Wits d10->d8 (Flour) | d8 | 6 |
| R300 | Drill e2: IM chase r3 Monster | d10 | 2 |
| R301 | Drill e2: IM chase r4 ground | d6 | 6 |
| R302 | Drill e2: IM chase r4 Wits d10->d8 (Flour) | d8 | 7 |
| R303 | Drill e2: IM chase r4 Monster | d10 | 3 |
| R304 | Drill e2: IM chase r5 ground | d6 | 4 |
| R305 | Drill e2: IM chase r5 Wits d10->d8 (Flour) | d8 | 2 |
| R306 | Drill e2: IM chase r5 Monster | d10 | 10 |
| R307 | Drill e2: IM chase r6 ground | d6 | 1 |
| R308 | Drill e2: IM chase r6 Sly d12->d10 (Flour) | d10 | 7 |
| R309 | Drill e2: IM chase r6 Monster | d10 | 9 |
| R310 | Drill e3 (restart, Sus 8, 0 charges): IM chase r1 ground | d6 | 4 |
| R311 | Drill e3: IM chase r1 Wits | d10 | 10 |
| R312 | Drill e3: IM chase r1 Monster | d10 | 2 |
| R313 | Drill e3: IM chase r2 ground | d6 | 2 |
| R314 | Drill e3: IM chase r2 Sly | d12 | 2 |
| R315 | Drill e3: IM chase r2 Monster | d10 | 7 |
| R316 | Drill e3: IM chase r3 ground | d6 | 1 |
| R317 | Drill e3: IM chase r3 Sly d12->d10 (Flour) | d10 | 4 |
| R318 | Drill e3: IM chase r3 Monster | d10 | 8 |
| R319 | Drill e3: IM chase r4 ground | d6 | 3 |
| R320 | Drill e3: IM chase r4 Nimble d8->d6 (carrying)->d4 (Flour) | d4 | 3 |
| R321 | Drill e3: IM chase r4 Monster | d10 | 4 |
| R322 | Drill e3: IM chase r5 ground | d6 | 1 |
| R323 | Drill e3: IM chase r5 Sly d12->d10 (Flour) | d10 | 1 |
| R324 | Drill e3: IM chase r5 Monster | d10 | 2 |
| R325 | Drill f T2: Werewolf hatter neighbour Sly | d6 | 5 |
| R326 | Drill f T2: Werewolf Monster (Good Dog) | d10 | 9 |
| R327 | Drill f: a d2 rolled by mistake (not used) | d2 | 1 |
| R328 | Drill f T3: Dracula furniture guard dog Charm | d12 | 10 |
| R329 | Drill f T3: Dracula Mask | d6 | 1 |
