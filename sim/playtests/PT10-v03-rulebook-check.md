# PT10-v03: Verification playtest of the rulebook after the 2026-10-21 rule changes

*Agent playtest, 2026-10-21. It checks the rulebook after the day's decisions (Decisions log, 2026-10-21, "The outside review of v0.2 … decided under Richard's delegation"; `book/REVIEW.md` rows 111–139): Spectral only at a way in; one overdraw per local chase; the final flight's overdraw a step down of its own; the local mob at most 11; six rounds at most; five players: the Limit 1 lower on Easy and Standard; any ability as a raise in a local chase on your own roll; roll-offs for picks; a Huge piece held while a carrier is caught; Hyde takes over even when an ability hid the Monster; rolled towns with no inside obstacle at a way in and at most one group way in; giving up once the ground is read; At the Table's new reminders. It also checks the two new quick sheets (`docs/guides/quick-sheets/players.html` and `storyteller.html`) against the rulebook.*

*Source at the table: only `book/src/chapters/*.html` (the chapters at commit 3f2c6f7), read as a first-time group would: the players Chapters 1–7, the Entity Sheet and At the Table; the Storyteller also Chapters 8–9. The quick sheets were read against those chapters, not used to rule. The decisions log, `book/REVIEW.md` and the online version's code were opened only to word the suggested fixes so they match what was decided (and what Foundry already does). Every random result is a real `Math.random` roll through a small helper in a private scratch folder (not in the repository), numbered R1 onward and listed in the appendix. Table choices that could go either way were rolled too. Where a drill needed a particular result (a Trouble to start a chase, a chase that lasts six rounds, a Huge piece), I restarted from the same marked point until the dice gave it, and every restart is listed. The players played to win; the Storyteller picked Costs by Chapter 8 ("the one that hurts most right now, but never one that costs nothing"). Method and format follow PT9 and HW4.*

---

## 1. Summary

| Line | What it put through the text | Result | Suspicion at the end |
|---|---|---|---|
| **Raid 1**: a Standard town rolled on Chapter 8's tables; five players (Limit 9): the Ghost, Jekyll & Hyde, the Witch, the Invisible Man, Dracula | The rolled-town procedure with an inside way in rerolled (R27–R29) and four items of one kind; picks after the list with four roll-offs (one Entity, three Duties); Hyde taking over after a Monster shown | **Win**, out on **Turn 7** (all five items; the mirror left) | 5 of 9 |
| **Raid 2**: Gallowsmere (Hard), three players: the Invisible Man, the Werewolf, the Witch | Good Dog on a friend's roll, an approach at the furniture's obstacle, a Bulky piece carried out, the way out rolled by its carrier | **Grand Year**, out on **Turn 11** (four items and the suit of armour) | 8 of 13 |
| A (Raid 1, T5): the Invisible Man's **Unseen on Jekyll's roll** | Hyde takes over though the Monster raised nothing | Hyde took over; clear | 6 |
| B (Raid 1, T5, Suspicion 8 stipulated): **Trouble that brings the Limit** in a group check, then a five-runner **final flight** | No local chase; the hunt mid-Turn; a roll's result first; approaches and the Draught as raises on any runner's roll | No chase; flight escaped in 2 rounds: **Win** | 9 (stopped) |
| C (Raid 2, T11): the armour's carrier **caught at the way out** | The mob's cap (8 + 4 = 12 → **11**); a carrier in a local chase; **abandoning once caught** (finding R-M1) | Cornered in round 1; the town took the armour; the others left on T12: **Bust** | 10 of 13 |
| D (Raid 1, T2): **Dracula's local chase** | **Mesmerise (an approach) as a raise**, **Bat on a Nimble ground as a raise**, Bat changing the trait, **one overdraw, the second refused**, a Critical as two Successes | Escaped in round 5 | 3 → 6 |
| E (Raid 1, T2): **Jekyll's local chase** | The Draught changing form in a chase, the free change back, **the Draught as a raise**, Hyde taking over mid-chase | Escaped in round 5 | 4 → 6 |
| F (Raid 2, T6): a lone chase to **round 6** | "If it's still running after round 6, a Lead of 2 or more escapes" | Third attempt reached round 6 at Lead 3: escaped | 4 → 5 |
| G and G2 (Raid 1, T5–T6): **giving up once the ground is read** | A runner at 8 of 9 gives up before anyone rolls; the mob's cap (12 → 11) | G: escaped (rise 0). G2: given up, captured, **raised nothing** | 7; 8 |
| H (Raid 1's town, a **Huge** piece rolled): **one carrier caught, then captured** | The piece stays with the other; does the caught carrier still count as carrying? (finding R-M2); the town takes it | Jekyll gave up in round 1; the town took the bed from the Witch | 7 |
| I (from C, T12): a two-runner Hard **final flight** | **The flight's overdraw on top of a Weakness** (two steps from round 3); an overdraw on your own roll not taking it | Forked in round 6 | 10 (stopped) |
| J (Gallowsmere's printer): **Spectral at a group way in, then the party picks the other** | The Spectral pass doesn't pick the way in; the Ghost stays past | Clear; the Ghost took the paper the same Turn | 2 → 3 |
| K (procedure only): eight extra pairs of ways in | Inside ways in rerolled three times; a second way in rechecked after the first was rerolled | Procedure works; wording note R-L1 | — |

**Counts.** Rulebook: **0 high, 2 medium, 9 low** (section 5.1). Quick sheets: **0 high, 1 medium, 7 low** (section 5.2). 19 in all.

**Do the new rules read clearly?** Yes, all but one. Each of the day's changes was played by the book's words at least once (table in section 6), and every one read cleanly the moment it came up except today's Huge-piece rule: the town taking the piece was clear, but what a caught carrier rolls was not (R-M2). Clean in play: Spectral at a way in, one overdraw a chase, the flight's overdraw on top of a Weakness, the cap of 11, six rounds, the five-player Limit, abilities as raises in a local chase (an approach, the Draught, Bat on a Nimble ground), roll-offs, Hyde, the rolled towns' way-in rerolls, giving up once the ground is read, and At the Table's reminders. The other medium is an older gap the play reopened, abandoning a piece once caught (R-M1), which the Players sheet repeats as "Abandon it any time". The lows are wording: the rolled-town reroll sentence, the flight's overdraw timing outside Chapter 6, and Fear the Curse against the new cap.

---

## 2. Raid 1: a Standard town rolled on Chapter 8's tables (R1–R67)

### 2.1 Building the town (R1–R35), step by step

Built by Rolling a Town, Standard column, every number rolled, in the book's order.

1. **Standard.**
2. **The shopping list** (R1–R6). "Roll any die: odd, one essential; even, two": R1 = 2, **two essentials**, the first two rolled. Each item a d6 kind and a d6 item: R2 food 3, **a cask of red wine** · essential; R3 cloth 1, **a bolt of black velvet** · essential; R4 cloth 2, bandages, lots; R5 cloth 6, boots in a very large size; R6 cloth 4, a new cape. No repeats. Four of the five items are cloth.
3. **The furniture** (R7–R8): R7 = 2, **a gilt mirror** (Bulky); "number the list's items from 1 and roll a d6": R8 = 5, the cape's location.
4. **Placing the locations** (R9–R13; the d3 is "a d6, halve it and round up"). The wine: R9 = 1 → **the baker**. The velvet: R10 = 2 → 1, **the draper**. The bandages: R11 = 4 → 2, **the tailor**. The boots: R12 = 5 → 3, **the hatter**. The cape is the fourth cloth item for three places, so "they share places, two to a place": I rolled a d3 for the place it shares, R13 = 5 → 3, **the hatter** (boots and cape, one location; the mirror is there too). Clear enough, but see R-L2 ("two to a place" can be read as pairing them).
5. **How many obstacles** (R14–R17; 1–6 one · 7–15 two · 16–20 three): the baker 18 three, the draper 13 two, the tailor 4 one, the hatter 19 three.
6. **Each obstacle** (R18–R32; a d20 on the obstacle table, a d20 for Difficulty, a d10 for watched on 1–5). The hatter's first way in rolled **18, a dark, cluttered back room (inside)** (R27). "An inside obstacle is never a way in", so I rolled the obstacle table again (only that die; its Difficulty 6 and watched stand): R29 = 14, a guard dog. The reroll sentence sits after the one about the second way in and doesn't say which dice; see R-L1. No second way in shared the first's quiet trait, and no location had a group way in, so the "second group one" rule didn't arise here (Drill K, section 4.11). The furniture's obstacle (R32): a crowded shop floor (group), rolled 8, +2 = 10.
7. **The ceiling**: no 12 rolled.
8. **Lantern Night** (R33 = 4): pies on doorsteps. **Villagers** (R34–R35): the night watchman, carrying a lantern and a pitchfork "for the parade"; old Granny Mott, practising the bells.

| # | Location · item | Obstacle | Quiet | Loud | Diff. | Watched |
|---|---|---|---|---|---|---|
| 1 | **The baker**: a cask of red wine (food and drink) · essential | Way in: a cart blocking the alley | Brawn | Nimble | 10 | — |
| | | or: a rickety drainpipe | Nimble | — | 8 | — |
| | | Then: a high garden wall | Nimble | Brawn | 10 | watched |
| | | Then: a cart blocking the alley | Brawn | Nimble | 8 | — |
| 2 | **The draper**: a bolt of black velvet (cloth and costumes) · essential | Way in: a guard dog | Charm | Nimble | 10 | watched |
| | | or: a muddy yard full of geese | Sly | Nimble | 10 | watched |
| | | Then: a nosy neighbour at her window | Sly | Wits | 6 | — |
| 3 | **The tailor**: bandages, lots (cloth and costumes) | Way in: a nosy neighbour at her window | Sly | Wits | 8 | — |
| | | or: the shopkeeper behind the counter | Charm | Sly | 10 | — |
| 4 | **The hatter**: boots in a very large size and a new cape (cloth and costumes, both) | Way in: a guard dog (rerolled from the back room) | Charm | Nimble | 6 | watched |
| | | or: the night watchman on his round | Wits | — | 8 | watched |
| | | Then: the shopkeeper behind the counter | Charm | Sly | 6 | — |
| | | Then: children in costumes (group) | Charm | — | 8 | watched |
| | | For the piece (a gilt mirror, Bulky): a crowded shop floor (group) | Sly | — | 10 (rolled 8) | — |

Standard, five players: **Suspicion Limit 9** · the way out 8 · the lock-up 10 · the final flight: mob 11, Lead 2, escape at 5. 14 obstacles, 6 watched; Difficulties by roll 6 ×3, 8 ×6, 10 ×5. Three locations watched (the tailor isn't). No group way in anywhere, so **the Ghost's Spectral (its default Perk) had nothing to do all raid** (observation O1).

**Is the procedure clear?** Yes, with two short stops: the inside way in (which dice, and does the sentence cover the first way in? R-L1) and where the fourth cloth item goes (R-L2). Rolling took 35 rolls and about 25 minutes, in line with Chapter 8's "about half an hour".

### 2.2 The picks (R36–R47)

The list and the mirror were read out first (Chapter 2: "The Storyteller reads out the shopping list and the furniture before anyone picks"). The brief fixed seat 1 as **the Ghost** and seat 2 as **Jekyll & Hyde**; seats 3–5 rolled what they wanted from the other six.

- **Entity roll-off.** Seats 3 and 5 both wanted the Witch (R36, R38). "They roll off, and the high d6 keeps it": R39, 2 against 1, seat 3 keeps her. The sentence doesn't say the loser picks again (the Duty sentence does) or what a tie does (R-L3); seat 5 picked again (R40): **Dracula**. Seat 4 had **the Invisible Man** (R37).
- **Duties.** The list has only two kinds, food (the baker) and cloth (the draper, the tailor and the hatter). The Witch kept Cook and the Invisible Man Tailor (both defaults on the list); the Ghost, Jekyll and Dracula, whose defaults (Butler, Librarian, Butler) give no edge, rolled for Cook or Tailor (R41–R43: Cook, Tailor, Cook). **Roll-offs:** Cook three ways, R44: the Witch 3, the Ghost 1, Dracula 1, the Witch keeps it; Tailor, R45: the Invisible Man 5, **Jekyll 6**, Jekyll takes it. "The other picks again": nothing useful was left, and the Ghost and Dracula both wanted their default Butler, so a third roll-off for a Duty with no edge (R46: Dracula); the Ghost took Librarian and the Invisible Man Gardener (R47). Final: the Ghost Librarian, **Jekyll Tailor** (an edge at three of the four locations), **the Witch Cook**, the Invisible Man Gardener, Dracula Butler. Three roll-offs read and ran cleanly (the three-way one too); the last was pure friction (observation O2).
- Gifts and Perks: the marked defaults (the Ghost: Through the Wall, Chill, Spectral; Jekyll: the Draught, Doctor's Bag, Practised Hand; the Witch: Hedge Spell, A Potion for That, Familiar's Warning; the Invisible Man: Unseen, Through the Gap, Out of Sight; Dracula: Mesmerise, Bat, Hypnotic Eyes).

### 2.3 Play log (R48–R67)

| Turn | What happened | Rolls | Suspicion |
|---|---|---|---|
| 1 | Plan (R48): the Ghost and Dracula to the baker, Jekyll and the Witch to the draper, the Invisible Man to the tailor. Tell checks: the baker R49 = 5, R51 picks Dracula (No Reflection); the draper R50 = 1 (no Tell; the Witch's second d6 not needed). The tailor is unwatched. | R48–R51 | 1 |
| 2 | Baker: the Ghost takes the drainpipe, Nimble d12 + Mask 3 + 5 = 8 vs 8, Success (the way in is picked). Dracula, the wall (watched), Monster (R53): 6 + 10 = 16, Success, the Monster shows (+2). Draper: Jekyll at the guard dog, Charm d12 (the Tailor raise can't go higher), Monster (R55): 3 + 9 = 12, Success, the Monster shows (+2) and **Hyde takes over straight after**. The Witch, the nosy neighbour, Sly d10 + Mask 7 + 5: **the velvet**. Tailor: the Invisible Man, Sly d12 + Mask 12 + 2: **the bandages**. | R52–R58 | 5 |
| 3 | Baker: the Ghost spends Chill on Dracula's roll (a friend's roll, no action), Brawn d8 → d10 + Mask 8 + 4 = 12 vs 8: **the wine**. The Witch, Hyde, the Invisible Man and the Ghost move to the hatter; one Tell check once all have arrived, with Familiar's Warning covering all four (R60: 2, no Tell). | R59–R60 | 5 |
| 4 | Hatter: Hyde drinks the Draught back to Jekyll (free, Practised Hand) and takes the guard dog, Charm d12 + Mask 8 + 4 vs 6. The Witch, the shopkeeper, Charm d8 + Mask 4 + 3 = 7 vs 6. Dracula moves to the hatter. The others wait. | R61–R62 | 5 |
| 5 | Party decision on the mirror at 5 of 9 (R63 = 6): leave it. The children (R64: Jekyll alone with the Mask): 7 + 1 = 8 vs 8, Success: **the boots and the cape**. All five items in hand. The others wait so that everyone reaches the way out with the Witch. | R63–R65 | 5 |
| 6 | All five move to the way out; Tell check with Familiar's Warning (R66: 2, no Tell). | R66 | 5 |
| 7 | **The way out**: Dracula's Mesmerise, an approach with Charm at a watched obstacle, Difficulty 8 − 2 = 6: Charm d12 + Mask 10 + 1 = 11. "At the way out, your Success or Cost gets everyone out." | R67 | 5 |

**Result: Win** (every item home, no mirror), out on Turn 7 with 5 of 9. Charges unspent: 13 of 15. No chase, no flight. Five players finished early with most charges left, as `docs/LESSONS.md` says five-player parties do.

---

## 3. Raid 2: Gallowsmere, Hard, three players (R68–R98)

**Picks** (R68–R71): three seats rolled from all eight: **the Invisible Man**, **the Werewolf**, **the Witch**, no clash. Duties: the Invisible Man Tailor (the tailor's bandages) and the Witch Cook (the butcher's bacon) keep their defaults; the Werewolf's Gardener isn't on the list, so he took a free Duty on it (R71): **Handyman** (the smithy's lock, an essential). Defaults otherwise (the Werewolf: Good Dog, Keen Nose, Night Runner). Gallowsmere has **no Huge piece** (the suit of armour is Bulky), so the Huge piece was played as Drill H in Raid 1's rolled town (section 4.8).

Hard: Limit 13 (the same with any party size) · the way out 10 · the lock-up 10 · the final flight: mob 11, Lead 2, escape at 6.

| Turn | What happened | Rolls | Suspicion |
|---|---|---|---|
| 1 | Plan (R72): the Werewolf and the Witch to the smithy, the Invisible Man to the tailor. Smithy: no Tell (R73). Tailor: R74 = 5, the Invisible Man's Tell. | R72–R74 | 1 |
| 2 | Smithy: the Werewolf, the wall, Nimble d12 + Monster (R75) 9 + 2 = 11 vs 8. The Werewolf spends **Good Dog on the Witch's roll**; the watchman, Wits d12 + Monster 9 + 4 = 13 vs 10: **the lock**. Tailor: the Invisible Man, the drainpipe, Nimble d8 → d10 (Tailor) + Mask 7 + 4. | R75–R78 | 1 |
| 3 | Tailor: the crowded shop floor (group, watched), Sly d12 + Mask (R79) 11 + 3 = 14 vs 10: **the bandages** (carrying nothing, Out of Sight would have kept him uncaught). The Werewolf and the Witch move to the silversmith: Tell (R81: 6, and Familiar's Warning's d6 5), the Werewolf's (R82). | R79–R82 | 2 |
| 4 | Silversmith: the Werewolf, the window, 9 + 3 = 12 vs 8. The Witch, the guard dog, **A Potion for That** (Wits d12) + Mask 10 + 1 = 11 vs 8. Tailor (R84: try the armour): the trapdoor (Brawn 12), **Through the Gap**, Nimble at 12 − 2 = 10, Nimble d8 → d10 (the Tailor raise covers "the furniture's obstacle included") + Mask 9 + 6 = 15. He leaves the armour untaken for now ("free, then or on a later Turn"). | R83–R87 | 2 |
| 5 | Silversmith: the strongbox, the Witch Wits d12 + Monster with Good Dog, 4 + 8 = 12 vs 10; the Monster shows and raises nothing: **the spoons**. The Werewolf and the Invisible Man move to the printer: Tell (R89–R90), the Invisible Man's. | R88–R90 | 3 |
| 6 | Printer (R91: the Werewolf takes the rooftops): Nimble d12 + Monster (R92) 11 + 1 = 12 vs 10, past the group way in. The Invisible Man goes back to the tailor; the Witch goes to the way out (no Tell, R94). | R91–R94 | 3 |
| 7 | Printer: the back room, Wits d8 + Mask 3 + 2 = 5 vs 8, **Trouble** (unwatched: +1, no chase). Tailor: the Invisible Man takes the armour (free) and starts the two-Turn move. End of Turn: the armour +1. | R95 | 5 |
| 8 | Printer: 3 + 4 = 7 vs 8, a Cost: **the paper**. The Storyteller picks "lose a Turn" (dropping would cost nothing, he holds only what the roll won; a lost Turn costs a Turn of the armour's noise and time). The Invisible Man arrives at the way out. End: +1. | R96–R97 | 6 |
| 9–10 | The Werewolf skips his Turn, then moves to the way out. End of each: +1. | — | 8 |
| 11 | **The way out**: the Invisible Man (carrying: the Monster is forced) spends **Unseen**: Sly d12 + Monster 2 + 8 = 10 vs 10, Success; the Monster shows and raises nothing. | R98 | 8 |

**Result: Grand Year**, out on Turn 11 with 8 of 13 (the lock, the spoons, the bandages and the paper home, the bacon the one missing extra, and the armour). No chase.

---

## 4. Branches and drills

Each branch starts from a marked point in a raid; what changed there is in bold, and every roll after it is fresh.

### 4.1 Branch A: Hyde takes over on a friend's Unseen (Raid 1, T5; R99)

**R64 taken as 4–6**: the Invisible Man spends Unseen on Jekyll's roll at the children, and Jekyll rolls the Monster. R99: Charm d12 2 + Monster 5 = 7 vs 8, a Cost; the Monster beat the trait die and raised nothing. By the Draught: "When the Monster shows on one of Jekyll's rolls, that roll stands and Hyde takes over straight after it, free … He does even when an ability, his own or a friend's, meant the Monster raised no Suspicion." **Hyde took over**, holding the boots and the cape. The Cost: Suspicion +1 (the roll had raised nothing, so it costs something). Read at once; nobody asked. Pillar of Society's "Hyde still takes over if it shows" agrees.

### 4.2 Branch B: Trouble that brings the Limit, then a five-runner final flight (Raid 1, T5; R100–R112)

**Stipulated: Suspicion 8 of 9** (three earlier Tells), and **R63 taken as "go for the mirror"**, so the Ghost and the Invisible Man also want past the children. One group check (Chapter 4: "All declare their dice and abilities, then all roll at once"): Jekyll Charm d12 + Mask; the Ghost Charm d8 with its own Chill → d10 + Mask; the Invisible Man Charm d6 with the Witch's Hedge Spell → d8 + Mask. R100: Jekyll 2 + 3 = 5, **Trouble**; the Ghost 13 and the Invisible Man 8, both past. The check's one rise, +1, makes **9, the Limit**. Chapter 6: "If that Trouble brings the Limit, there's no local chase: you flee with everyone else in the final flight." A roll's result came first: the Ghost and the Invisible Man had the boots and the cape (they chose the Invisible Man to hold both). The Witch and Dracula hadn't acted that Turn, so they didn't (Chapter 4, At the Table). Read in chapter order, Chapter 5's "A roll's result comes first" first suggested running Jekyll's chase (being caught is the result), until Chapter 6's local chase opener settled it (R-L8). At the Table says it outright.

**The flight** (Standard: Lead 2, escape at 5, mob 11, the Monster only; Garlic and Cold Iron from round 1, the rest from round 3). Charges: the Ghost 1, the Witch 2, the others 3.

| Round | Ground | Rolls (vs 11) | Count | Lead |
|---|---|---|---|---|
| 1 (R101–R106) | 5, the parade (Charm, Sly) | Dracula Charm d12, Garlic −1, **Mesmerise spent as a raise** +1 = d12: 5 + 9 = 14 S. The Ghost Sly d10, Cold Iron −1, **the Invisible Man's Through the Gap spent as a raise on the Ghost's roll** +1 = d10: 16 S. The Witch Sly d10, Hedge Spell → d12: 18 S. The Invisible Man Sly d12: 7 T. Jekyll Charm d12: 2 + 2 = 4 T (no Critical on a failure; the Monster tied, so no Hyde) | 3 S, 2 T | 3 |
| 2 (R107–R112) | 3, the market (Brawn, Nimble) | Dracula Nimble d10, Garlic −1, **Bat spent as a raise** = d10: 6 T. The Ghost Nimble d12 −1, Chill +1 = d12: 7 T. The Witch, A Potion for That, Wits d12: 6 + 6 = 12, **Critical** (two Successes). The Invisible Man Nimble d8, Through the Gap as a raise = d10: 13 S. **Jekyll drinks the Draught: Hyde**, Brawn d12: 18 S | 4 S, 2 T: +2 | **5, escaped** |

Escaped in two rounds: everything carried came home, **Win** (no mirror). "Any ability, approaches and the Draught included, may also be spent as a raise … on any runner's roll" read cleanly, as did the Draught changing form in the flight. No overdraw came up (Branch I).

### 4.3 Branch C: the armour's carrier caught at the way out (Raid 2, T11; R113–R126)

**The way-out roll restarted until it gave Trouble** (R113–R121 gave Costs and Successes; R122 is the one played): the Invisible Man, carrying the armour, Unseen, Sly d12 1 + Monster 2 = 3 vs 10, **Trouble**; the Monster showed and raised nothing. Suspicion 8 → 9; he carries the armour, so Out of Sight doesn't save him: caught. **The mob: 8 + 9/2 rounded down = 12, at most 11: 11.** The cap read cleanly.

Before round 1 his player asked to **abandon the armour** ("You may abandon it at any time, free") so he could roll the Mask and his full Nimble. Chapter 4 bars only *dropping* once caught ("Once you're caught, though, you can't until your chase ends") and Chapter 6 says "You can't drop or hand over what you carry", but abandoning is listed apart from dropping. I ruled no, as V24 meant (a caught carrier setting its piece down to get the Mask back is exactly what V24 closed, and Foundry refuses it), but the text doesn't say it: **R-M1**. So he ran carrying it: the Monster only, his Nimble d8 → d6.

Round 1 (R123), the rooftops (Nimble, Wits): Wits d10 + Monster, with his last charge on Unseen (R124) rather than Through the Gap as a raise. R125: 5 + 3 = 8 vs 11, Trouble: **Lead 0, cornered** in round 1. Captured: the town took the armour and the bandages. The chase's rise: Trouble +1, Suspicion 10.

Turn 12 (R126): the Werewolf rolls the way out with Good Dog, Nimble d12 + Monster 7 + 1 = 8 vs 10, a Cost: everyone not captured is out. Home: the lock, the spoons and the paper, 3 of 5 with both essentials (two extras missing): **Partial**, one Entity left behind: **Bust**.

### 4.4 Branch D: Dracula's local chase (Raid 1, T2; R127–R144)

**Dracula's wall roll restarted until Trouble** (R127, R128 Successes; R129 played): 1 + 2 = 3, Trouble, the Monster showed: +2 (one roll, one rise), Suspicion 1 → 3. Mob 8 + 1 = 9; Lead 1; Garlic from round 1. Charges 3.

| Round | Ground | What he did | Roll | Lead |
|---|---|---|---|---|
| 1 (R130–R132) | Dead end (Brawn, Wits) | **Bat changes the trait** to Nimble d10, Garlic −1, **Mesmerise spent as a raise** +1 = d10, Mask. Two abilities, one trait change and one raise, as Chapter 3 allows | 5 + 5 = 10, **Critical**: +2 | 3 |
| 2 (R133–R135) | Dead end | Bat (last charge): Nimble d8 + Mask | 6 + 1 = 7, Cost | 3 |
| 3 (R136–R138) | Rooftops (Nimble, Wits) | **Overdraw: Bat spent as a raise on a ground that offers Nimble**: d10 + Mask; +2 at the chase's end | 1 + 2 = 3, Trouble | 2 |
| 4 (R139–R141) | Parade (Charm, Sly) | Wants to overdraw Mesmerise as a raise: **refused**, "You can overdraw only once in a local chase". Charm d10 + Mask | 8 + 4 = 12, Success | 3 |
| 5 (R142–R144) | Back alleys | Nimble d8 + Mask | 8 + 5 = 13, Success | **4, escaped** |

The rise: the biggest trigger, Trouble +1, plus the overdraw's +2: Suspicion 3 → 6. Back at the baker, Turn used. Every ability rule read cleanly, and Bat now does something on a Nimble ground.

### 4.5 Branch E: Jekyll's local chase (Raid 1, T2; R145–R162)

**Jekyll's guard-dog roll restarted until Trouble** (R145–R147 Successes; R148 played): 1 + 1, Trouble; the Monster tied, so no show and no Hyde. Suspicion 3 → 4; mob 10; A Familiar Face from round 3. Charges 3.

| Round | Ground | What he did | Roll | Lead |
|---|---|---|---|---|
| 1 (R149–R151) | Alleys (Nimble, Sly) | Choice (R150): **the Draught to change form**: Hyde, Nimble d10 + Monster | 1 + 10 = 11, Success; the Monster shows (+2 at the end) | 2 |
| 2 (R152–R153) | Dead end | Hyde Brawn d12 + Monster | 12 + 2 = 14, Success | 3 |
| 3 (R154–R156) | Square (Sly, Charm) | **Back to Jekyll free** (Practised Hand), Charm d12, Weakness −1, Doctor's Bag +1 = d12 + Monster | 5 + 1 = 6, Trouble | 2 |
| 4 (R157–R159) | Parade | **The Draught spent as a raise** (his last charge; he stays Jekyll): Charm d12 −1 +1 = d12 + Monster | 4 + 6 = 10, Success; the Monster shows: **Hyde takes over** straight after | 3 |
| 5 (R160–R162) | Dead end | Hyde Brawn d12 −1 = d10 + Monster (no overdraw, R161) | 10 + 2 = 12, Success | **4, escaped** |

The rise: the Monster +2, Suspicion 4 → 6. "The Draught included, may instead be spent as a raise" read cleanly, as did the Draught's two uses side by side in one chase.

### 4.6 Branch F: a lone chase to round 6 (Raid 2, T6; R163–R194)

**R91 taken as 1–3** (the Invisible Man at the nosy neighbour, watched, carrying the bandages); **restarted until Trouble** (R163–R173; R174 played: 2 + 3 = 5). Suspicion 3 → 4; mob 10; Flour from round 3. A stated policy for the drill: the best ground trait with the Mask, no charges. Attempts were run from the same start until one reached round 6 (a short helper made the policy's calls; every roll went to the same log).

- Attempt 1 (R175–R176): Trouble in round 1, cornered.
- Attempt 2 (R177–R182): cornered in round 3.
- **Attempt 3 (R183–R194)**: Cost, Cost (Lead 1), Success (2), Trouble (1), Cost (1), then in round 6 Sly d10 5 + 5 = 10, a Critical: Lead 3. "If it's still running after round 6, a Lead of 2 or more escapes": **escaped**. The rise: Trouble +1, Suspicion 5.

Clear at once. A Critical in round 6 that leaves the Lead at 3 escapes, the same as reaching 4 would.

### 4.7 Branch G and G2: giving up once the ground is read (Raid 1; R195–R212)

**G** (T5, **stipulated Suspicion 6**, going for the mirror): the same three-way group check at the children, restarted until Trouble (R195 none; **R196**: the Ghost 4 + 1 = 5, Trouble; R197–R200 were rolled in the same batch and are void). One rise: 7. The Ghost flees alone at mob 8 + 3 = 11. Each round, once the ground was read, a rolled give-up choice (R202, R205, R208) said run: Chill, a Success, a Cost, then a Critical: **escaped in round 3 with a rise of 0** (no Trouble, no Monster shown: Suspicion stays 7).

**G2** (T6, **stipulated Suspicion 7**): the Ghost and the Invisible Man at the children in one group check (R210): the Ghost 6, a Cost; the Invisible Man 5, **Trouble**. One rise: 8. The Ghost's Cost: "Suspicion +1" would cost nothing, because the check already rises by its biggest trigger, so the Storyteller picks "next roll's die one size smaller" (see R-L9). The Invisible Man flees alone, carrying the bandages: **mob 8 + 4 = 12, at most 11**. Round 1, the rooftops (R211); once the ground is read, he **gives up** (R212): captured, no roll. "A chase given up before anyone has rolled raises nothing": **Suspicion stays 8**. The town takes the bandages. Clear, and the Storyteller sheet's last tip says the same.

### 4.8 Drill H: a Huge piece, one carrier caught and captured (Raid 1's town; R213–R223)

**The furniture d6 rerolled until it gave a Huge piece** (R213–R215: 3, 4, 3; **R216 = 6, a four-poster bed**), at the hatter as before. The party goes for it: Jekyll (already past the children) and the Witch. T6 (R217–R218): Jekyll at the shop floor 3 + 4 = 7, Trouble (+1, unwatched); the Witch past the children with Hedge Spell. T7 (R219), one group check at the shop floor: Jekyll 9, a Cost (past; the Storyteller picks "drop an item", the cape, since Suspicion +1 would merge into the check's rise); the Witch 6, Trouble; one rise, Suspicion 7. With the bed's noise that would reach the Limit within two Turns, so **the drill continues from a stipulated position**: Turn 10, Suspicion 6, Jekyll and the Witch have carried the bed to the way out, everyone is there, and Jekyll has handed his loot to Dracula (handing over is free).

**Jekyll rolls the way out (restarted until Trouble**; R220 a Success, **R221** played): Sly d8 + Monster (forced, carrying) 3 + 1 = 4 vs 8, Trouble. Suspicion 7; caught. Chapter 4: "If one is caught, the piece stays with the other and can't move until the chase is over; if either is captured, the town takes it." Two things stalled the table here (**R-M2**):
- **Does Jekyll still count as carrying in his chase** (no Mask; Nimble one size smaller)? "A Huge piece's two carriers both count as carrying it" says yes; "the piece stays with the other" reads as if he has let go. I ruled yes, as Foundry plays it.
- **"Can't move until the chase is over"** has nothing to act on: the whole chase happens inside Jekyll's action, and nobody else acts until it ends.

Round 1 (R222), the market (Brawn, Nimble): Jekyll's Brawn d4, Nimble d6, a d4 while carrying. Once the ground is read, the rolled give-up choice (R223 = 1) says he gives up (the Draught to Hyde would have been the better play, which is the dice playing the player): **captured**, no roll, the chase raises nothing. **The town takes the bed** from the Witch's hands, and its noise stops ("lost"). Chapter 4's sentence settled that at once. The Storyteller quick sheet ("Captured, the town takes what the runner carried, furniture too") would have left a doubt, since the piece "stays with the other" (Q-L2).

### 4.9 Branch I: the final flight's overdraw on top of a Weakness (from Branch C, T12; R224–R243)

**At Turn 12 the Werewolf and the Witch go to the lock-up for a rescue instead of rolling the way out.** No Tell (R224). Dawn: the final flight, Hard: Lead 2, escape at 6, mob 11; the Invisible Man is captured and stays behind. Charges: the Werewolf 1, the Witch 2; both Weaknesses come in from round 3.

| Round | Ground | The Werewolf | The Witch | Lead |
|---|---|---|---|---|
| 1 (R225–R227) | Parade | Keen Nose (last charge), Wits d8: 6 + 5 = 11 S | Hedge Spell, Sly d12: 7 + 4 = 11 S | 4 |
| 2 (R228–R230) | Parade | **Overdraws Keen Nose on his own roll**: Wits d8 (that roll doesn't take it): 2 + 3 = 5 T | Hedge Spell (last charge), Sly d12: 3 + 4 = 7 T | 2 |
| 3 (R231–R234) | Square | Sly d6, **Hounds −1 and the overdraw's step −1**: d4 (no smaller): 1 + 2 = 3 T | Sly d10, Rowan −1 = d8: 7 + 2 = 9 Cost (R232: she saves her overdraw) | 1 |
| 4 (R235–R237) | Square | Sly d4: 1 + 1 = 2 T | **Overdraws Hedge Spell on her own roll**: Sly d10 −1 +1 = d10 (no step on this roll): 2 + 10 = 12 S | 1 |
| 5 (R238–R240) | Square | Sly d4: 3 + 5 = 8 T | Sly d10, **Rowan −1 and her step −1** = d6: 3 + 10 = 13 S | 1 |
| 6 (R241–R243) | Dead end | Brawn d10 −2 = d6: 1 + 6 = 7 T | Wits d12 −2 = d8: 4 + 4 = 8 T | **0: Forked** |

Chapter 6 read cleanly at every step: "From your own next roll to the end of the flight … on top of any Weakness (if you overdraw on your own roll, that roll doesn't take it)", and "once per flight, even while your Weakness is in play". The step is wasted below a d6, since nothing goes under a d4 (the Werewolf in rounds 3–5). Chapter 3, At the Table, the Entity Sheet and both quick sheets give the timing as "from your next roll" or not at all (R-L6, Q-L1). The six-round limit is for local chases only, and nobody at the table thought otherwise.

### 4.10 Drill J: Spectral at a group way in, then the party picks the other (Gallowsmere; R244–R248)

**Stipulated: a Ghost (default picks) and the Witch arrive at Gallowsmere's printer** (the nosy neighbour, Sly 8 watched, or the rooftops, group, Nimble 10), Suspicion 2. No Tell (R244). Next Turn the Ghost, carrying nothing, is past the rooftops by Spectral ("Group ways in don't stop you: no roll and no action"); by Chapter 4 that pass doesn't pick the way in. The Witch then rolls the **nosy neighbour** (R245: 10 + 3 = 13), which picks it for the party, and the Ghost "stays past even if the party then picks the other". With its action still unused, the Ghost rolls the back room the loud way (R246; R247 void; R248 Sly d10 + Mask 7 + 1 = 8 vs 8, +1): **the paper**. Both chapters agree and the pass took seconds.

### 4.11 Drill K: the way-in rerolls (procedure only; R249–R262)

Eight extra pairs of ways in on the obstacle table, applying step 3:
- Location 1: A children (group, Charm), B a guard dog (Charm): the same quiet trait, so B was rerolled: a doorman (Charm again), then a wall (R257, R260). (Had B come up group, it would have been rerolled as "a second group one".)
- Location 3: A a back room (**inside**), rerolled twice (R258 the back room again, R261 the shopkeeper, Charm). B, rolled earlier as children (Charm), now shared A's new quiet trait and was rerolled (R262: a trapdoor). So the second way in is checked against the first way in **as it ends up**, which the step doesn't say (R-L1).
- Location 6: A a back room (inside), rerolled (R259: a bolted back gate).
- Locations 2, 4, 5, 7 and 8 needed nothing.

---

## 5. Findings

Severity: **high** = a wrong rule, a dead end, or something that would visibly trip the table; **medium** = would stall the table or confuse; **low** = polish. "Wording" means the book already implies the answer (or a decision already made does); "rules" means the author decides. Replacement text is exact. Every fix to the book also needs a row in `book/REVIEW.md` and, where the text is shared, the Foundry texts, the one-shot and the quick sheets.

### 5.1 Rulebook (`book/src/chapters/`)

| # | Sev | Passage (file) | What happened | Suggested fix |
|---|---|---|---|---|
| R-M1 | **medium** · wording of V24 | Chapter 4, Carrying (`14-ch04.html`): "You may **abandon** it at any time, free. It stays where it is and makes no more noise, and nobody can take it again." With Dropping and Picking Up: "You may drop your own loot, or a piece you carry, at any time without using your action. Once you're caught, though, you can't until your chase ends." And Chapter 6, The Local Chase (`16-ch06.html`): "You can't drop or hand over **what you carry** until the chase ends." | Branch C: the Invisible Man, caught at the way out with the suit of armour, asked to abandon it before round 1, "at any time, free", to roll the Mask and his full Nimble. The book bars dropping once caught but lists abandoning apart, so the literal reading allows it. That reopens what V24 closed ("a carrier got the Mask and full Nimble back by setting its piece down"). Foundry already refuses it (a carrier in a local chase can't clear its carrying). I ruled no. The Players quick sheet says "Abandon it any time." (Q-M1). | Chapter 4: "You may **abandon** it at any time you could drop it, free. It stays where it is …" **and** Chapter 6, The Local Chase: "You can't drop, abandon or hand over **what you carry** until the chase ends." (Chapter 6 is where a runner looks; if a page has no room, Chapter 6's alone settles it.) |
| R-M2 | **medium** · wording, unless Richard wants the other reading | Chapter 4, Carrying (`14-ch04.html`): "A Huge piece's two carriers both count as carrying it and move together. If one is caught, the piece stays with the other and can't move until the chase is over; if either is captured, the town takes it." | Drill H: Jekyll, one carrier of the four-poster bed, was caught at the way out. (1) Does he still count as carrying in his chase (no Mask, Nimble one size smaller)? "Both count as carrying it" says yes; "the piece stays with the other" reads as no. I ruled yes, as Foundry plays it (both carriers keep the carrying mark, and it can't be cleared in a local chase). It didn't decide the result here (he gave up), but it decides the second die every round. (2) "Can't move until the chase is over" has nothing to act on: Chapter 4 finishes "one Entity's action, chase and all, before the next begins", so the other carrier never acts during the chase. It only makes readers ask what the other carrier may do meanwhile. | "A Huge piece's two carriers both count as carrying it and move together. If one is caught, it still counts as carrying in its chase, and the piece waits with the other carrier; if either is captured, the town takes it." (If Richard prefers the runner unburdened: "If one is caught, only the other carries it until the chase ends, so the runner may use the Mask; if either is captured, the town takes it.") |
| R-L1 | low · wording | Chapter 8, Placing the locations, step 3 (`31-ch08.html`): "For the first obstacle, roll all three dice twice, once for each way in. If the second way in's quiet way is the same trait as the first's, roll the obstacle table again until it differs. **Roll again, too, on an inside obstacle or a second group one.**" | Raid 1: the hatter's *first* way in rolled the back room (inside). The reroll sentence follows the one about the second way in, so it reads as about the second only; the obstacle table's "An inside obstacle is never a way in" settles it. "Roll again" doesn't say which dice (I rerolled only the obstacle table). Drill K: after A was rerolled, B had to be checked against the new A. | "For the first obstacle, roll all three dice twice, once for each way in. Reroll only the obstacle table for a way in that is an inside obstacle, then for a second way in that is a second group one or has the first's quiet trait, until each fits." |
| R-L2 | low · wording | Chapter 8, Placing the locations, step 1 (`31-ch08.html`): "If a kind has more items than places, they share places, two to a place: one location, guarding both items." | Raid 1 rolled four cloth items for three places. I gave each place one, then rolled a d3 for the place the fourth shares. "Two to a place" can also be read as pairing them (two places with two each, one place empty). | "If a kind has more items than places, each one past the third shares a place already taken (roll or pick), two to a place at most: one location, guarding both items." |
| R-L3 | low · wording | Chapter 2, opener (`12-ch02.html`): "if two want the same one, they roll off, and the high d6 keeps it." Castle Duties: "they roll off, the high d6 keeps it, and the other picks again." | Raid 1: seat 5 lost the Witch (R39) and picked again, which the Entity sentence doesn't say (the Duty one does); neither says what a tie does (none came up; a three-way roll-off for Cook worked as written). | Opener: "if two want the same one, they roll off (again on a tie), the high d6 keeps it, and the other picks again." Castle Duties: "they roll off (again on a tie), the high d6 keeps it, and the other picks again." |
| R-L4 | low · wording | Chapter 2, the Mummy's Fear the Curse (`12-ch02.html`): "its mob's Difficulty is 1 lower." With Chapter 6: "8 plus half the Suspicion … rounded down, at most 11." | Not played (no Mummy fled alone); read for the cap. From Suspicion 8 the order matters: the cap, then 1 lower, gives 10; 1 lower, then the cap, gives 11. Foundry and the simulator cap first (10). With the cap now 11 this bites from Suspicion 8 (it was 10 before), so in most late Hard chases. | Fear the Curse: "… its mob's Difficulty is 1 lower (after the cap of 11)." |
| R-L5 | low · wording | Chapter 6, Once the Hunt Is On (`16-ch06.html`): "You can overdraw only once per flight, even while your Weakness is in play." | Branch I: read fine in play, but "only … even while" reads as if the Weakness would otherwise allow more. The rule is that it's allowed while the Weakness is in play, once. | "You can overdraw once per flight, even while your Weakness is in play." |
| R-L6 | low · wording | Chapter 3, Abilities (`13-ch03.html`): "In the final flight it costs a step down instead, so your trait die is one size smaller to the end of the flight, on top of any Weakness." At the Table (`41-reference.html`): "in the final flight your trait die one size smaller from your next roll to its end". The Entity Sheet (`40-entity-sheet.html`): "your trait die one size smaller from your next roll". | Branch I: the Witch overdrew on her own roll. Chapter 6 says that roll doesn't take the step. Chapter 3 gives no start at all, and At the Table and the sheet say "from your next roll", which can mean the roll she is about to make, cancelling her own raise. Chapter 6 settles it, but players hold At the Table. | Chapter 3: "… your trait die is one size smaller from your next roll to the end of the flight (not on the roll you overdraw on), on top of any Weakness." At the Table and the Entity Sheet: "from your next roll after it" in place of "from your next roll". |
| R-L7 | low · wording | At the Table, Chases (`41-reference.html`): "Local chase: Lead 1, escape at 4, against 8 + half the Suspicion as it starts (at most 11)" | Branch G at 7: "half of 7" isn't a whole number, and At the Table doesn't say to round down (Chapter 6 and both quick sheets do). | "… against 8 + half the Suspicion as it starts (rounded down, at most 11)" |
| R-L8 | low · wording | Chapter 5, At the Limit (`15-ch05.html`): "A roll's result comes first, so if the roll that reaches the Limit gets the party out, it's out, and captives it frees join the flight." | Branch B: Jekyll's Trouble in a group check brought the Limit. Read in chapter order, "a roll's result comes first" suggests running his local chase first (being caught is the result), until Chapter 6's opener ("If that Trouble brings the Limit, there's no local chase"). At the Table has it. It's the same trip HW4 H3 found in the one-shot. | After "captives it frees join the flight": "Anyone that roll gets caught has no local chase; it flees with the others." |
| R-L9 | low · wording | Chapter 3, Results (`13-ch03.html`): "For example, Suspicion +1 costs nothing on a roll that already raises Suspicion (not counting an overdraw, which goes on top), because one roll raises it only once." Chapter 4: "Suspicion rises only once for the whole check, by the biggest trigger among the rolls." | Drill H (R219) and G2 (R210): a Cost in a group check where another runner had Trouble. "Suspicion +1" would merge into the check's one rise and so cost nothing, but the example speaks only of "a roll". Took a moment each time. | "… costs nothing on a roll that already raises Suspicion, or in a group check that already does (not counting an overdraw, which goes on top), because …" |

### 5.2 Quick sheets (`docs/guides/quick-sheets/`)

Checked line by line against the chapters (section 7). The numbers all match: the Limits with five players, the cap of 11, six rounds, one overdraw, the flight's mob and escape, the lock-up and the way out. So do the day's other changes (roll-offs, giving up once the ground is read, abilities as raises in both chases, Trouble that brings the Limit). These are what's missing or misleading.

| # | Sev | Passage (file) | What happened | Suggested fix |
|---|---|---|---|---|
| Q-M1 | **medium** | Players, Carrying (`players.html`): "**Furniture** (Bulky: one carrier; Huge: two): no Mask, Nimble one size smaller, moves one Turn longer, and Suspicion +1 at the end of every Turn once it's taken, until it leaves town. Abandon it any time." | The sheet a player holds tells a caught carrier it may abandon the piece, the move R-M1 is about (Branch C). It also leaves out setting a piece down free (not while caught) and taking it back up as an action. | "… until it leaves town. Set it down free, or abandon it for good (not while caught); taking it back up is an action." |
| Q-L1 | low | Players, The Final Flight: "Overdraw is a step down: your trait die one size smaller from your next roll to the end, on top of any Weakness. Once a flight." Storyteller, Running the Final Flight (`storyteller.html`): "Overdraw: no Suspicion, but a step down from the next roll to the end, on top of any Weakness; once a flight." | As R-L6: overdrawing on your own roll, "your next roll" can be read as that roll (Branch I, the Witch). | Players: "… one size smaller from your next roll after it to the end (not the roll you overdraw on), on top of any Weakness. Once a flight." Storyteller: "… a step down from the overdrawer's next roll after it to the end, on top of any Weakness; once a flight." |
| Q-L2 | low | Storyteller, Captured and Rescued: "Captured, the town takes what the runner carried, furniture too, for the night." Players, Carrying: "Huge: two" with nothing more. | Drill H: the caught carrier's piece "stays with the other" (Chapter 4), so a Storyteller ruling from the sheet could leave the bed with the free carrier. Chapter 4 says the town takes it. Neither sheet has the Huge piece's rule. | Storyteller: "Captured, the town takes what the runner carried, furniture too (a Huge piece even from its other carrier), for the night." Players, after "Huge: two": "(they move together; if one is caught it waits, and if either is captured the town takes it)". |
| Q-L3 | low | Storyteller, Running a Turn: "End of the Turn: furniture taken and still in town, Suspicion +1." | Read against Chapter 4: an abandoned piece is still in town but silent, and one the town took back is lost. Didn't come up in play. | "End of the Turn: furniture taken and not abandoned or lost, even set down, Suspicion +1." |
| Q-L4 | low | Storyteller, When to Roll What, Costs: "never a cost that costs nothing, like Suspicion +1 on a roll that already raised it." | As R-L9 (G2, Drill H). | "… like Suspicion +1 on a roll, or a group check, that already raised it." |
| Q-L5 | low | Players: no group check and no shared local chase; the majority rule appears only under The Final Flight. | Branch B and G2: two or three players at one group obstacle roll at once with one rise, and those caught together flee on one Lead. Players looking at their sheet find neither. | Your Turn, after the group-obstacle sentence: "Several there in one Turn roll at once, with one rise." Caught, a new line: "Caught together in one group check: one shared Lead, by the majority rule (below)." |
| Q-L6 | low | Storyteller, Running a Turn: "A roll: ask the trait, Mask or Monster, and who spends charges." | Raid 1: Jekyll's Tailor raise at the hatter and the draper, and Raid 2's Tailor raise at the furniture's obstacle. Nothing on the Storyteller sheet mentions the Duty raise (or that a chase gives none). The Players sheet has it. | "A roll: ask the trait (one size bigger at a location with the roller's Duty kind, never in a chase), Mask or Monster, and who spends charges." |
| Q-L7 | low | Players, The Job: "Its first obstacle has two ways in: the first roll at either picks it for the raid." | Drill J: true for every roll; the one exception is the Ghost's Spectral pass (no roll, so it picks nothing), which only the Ghost's own text gives. Not misleading in play; listed because the brief asks for every missing caveat. | Optional: "… the first roll at either picks it for the raid (a Ghost's Spectral pass, with no roll, doesn't)." |

**Counts:** rulebook 0 high, 2 medium, 9 low; quick sheets 0 high, 1 medium, 7 low.

---

## 6. The day's changes: where each was played, and whether it read cleanly

| Change | Text (file) | Played in | Read cleanly? |
|---|---|---|---|
| Spectral only at a way in | Ch 2 Spectral; Ch 4 The Town | Drill J (passed, the party picked the other, still past); Raid 1 (no group way in: idle, O1) | **Yes** |
| One overdraw per local chase | Ch 3, Ch 6, At the Table, Entity Sheet | Branch D (the second refused, round 4) | **Yes** |
| The final flight's overdraw, a step down of its own | Ch 3, Ch 6 Once the Hunt Is On | Branch I (on top of Hounds from round 3; the Witch's own-roll overdraw) | **Yes** in Ch 6; timing missing elsewhere (R-L5, R-L6, Q-L1) |
| The local mob at most 11 | Ch 6, Ch 8, At the Table | Branch C (12 → 11), G2 (12 → 11), G (exactly 11) | **Yes**; Fear the Curse's order (R-L4) |
| Six rounds at most | Ch 6, Ch 8, At the Table | Branch F, attempt 3 (Lead 3 after round 6: escaped) | **Yes** |
| Five players: the Limit 1 lower on Easy and Standard | Ch 5, Ch 8, At the Table, Ch 9's pages | Raid 1 (9), Branch B (reached at 9) | **Yes** |
| Any ability as a raise in a local chase, on your own roll | Ch 2 Using an Entry, Ch 3, Ch 6, At the Table | Branch D (Mesmerise, an approach; Bat on a Nimble ground), Branch E (the Draught) | **Yes** |
| Roll-offs for picks; a random Duty rerolled | Ch 2 | Raid 1 (one Entity, three Duties, one of them three-way) | **Yes** (R-L3: the loser picks again, ties; O2) |
| A Huge piece held while a carrier is caught | Ch 4 Carrying | Drill H (caught, gave up, the town took the bed) | **Partly**: the town taking it was clear; what the caught carrier rolls wasn't (R-M2) |
| Hyde takes over even when an ability hid the Monster | Ch 2 the Draught, Pillar of Society | Branch A (a friend's Unseen); Raid 1 T2 and Branch E (his own Monster) | **Yes** |
| Rolled towns: no inside way in; at most one group way in | Ch 8 step 3, the obstacle table | Raid 1 (the hatter's way in), Drill K (three inside rerolls, recheck after a reroll) | **Yes**, with R-L1's wording |
| Giving up once the ground is read | Ch 6, At the Table | G2 (round 1: raised nothing), Drill H (round 1); G (choice made each round after the ground) | **Yes** |
| At the Table's new reminders | `41-reference.html` | Start at the way out (both raids); one Entity at a time, chase and all; the hunt mid-Turn (Branch B); a group check's one rise (Branch B, H, G2); loot handed over free (Drill H); a roll's result first and Trouble at the Limit (Branch B) | **Yes**; "rounded down" missing (R-L7) |

---

## 7. Quick sheets against the rulebook (line by line)

**Players' Rules.** Your Entity, The Job, Your Turn, The Roll, Charges and Abilities, Suspicion, Caught, Captured, Leaving Town, How the Year Went and the tips all match Chapters 2–7. No contradiction in the numbers. Missing caveats: abandoning once caught (Q-M1); the Huge piece's rule (Q-L2); the overdraw's timing on your own roll (Q-L1); group checks and shared chases (Q-L5); the Spectral pass and the way in (Q-L7, optional). One tip is loose but not wrong: "Giving up stops Suspicion snowballing" is true only of rounds not yet rolled (the rise of rolls already made stands); "Near the Limit, giving up before anyone rolls raises nothing" would be exact, though the Storyteller sheet's last tip already says it.

**Storyteller's Guide.** Before the Game (the table, the five-player row, "On every level"), Setup (roll-offs, the random Duty), Running a Turn, When to Roll What (the Tell check, the group check, Costs, unwatched Trouble), Running a Local Chase (the mob with the cap, giving up once the ground is read, the Weakness, abilities as raises, one overdraw, six rounds, the one rise), Captured and Rescued, The Limit and the Hunt, Running the Final Flight, Ending and Quick Advice all match. Missing: the Huge piece (Q-L2), abandoned or lost furniture's noise (Q-L3), the group-check Cost (Q-L4), the Duty raise (Q-L6), the overdraw's timing (Q-L1). Neither sheet mentions the Perks that change a chase (Night Runner, Fear the Curse, Wall-Crawler, Fly by Night, Already Dead), which is reasonable for a one-page sheet: they're on each player's Entity entry.

---

## 8. Observations (no change proposed)

- **O1. Spectral can be idle all raid.** Raid 1's rolled town had no group way in, so the Ghost's default Perk did nothing (the town's two group obstacles were a "Then" and the furniture's). By the obstacle table, a location has a group way in a little under half the time, so about one rolled town in ten or twenty has none. That is the decided trade (option (c) keeps Hallowby's florist working). A Ghost's player might want Rattle or Already Dead in such a town, which the picks after the list already allow.
- **O2. Duty roll-offs with few kinds.** With five players and a list of two kinds, three players have no useful Duty. Dracula and the Ghost both default to Butler (as the Mummy and Jekyll do to Librarian), so taking defaults still forces a roll-off for a Duty that gives nothing. It took a minute. "Every pick has a marked default, so a new player can skip the choices" is true except when two players' defaults clash.
- **O3. One night is not a balance sample.** Raid 1 (five, Standard) was gentle: out on Turn 7 with 13 of 15 charges unspent, as the decisions log and `docs/LESSONS.md` expect of five players. Raid 2 (three, Hard) went to Turn 11 with the armour's noise the main cost. The branches were cut to reach the rules, not to sample the odds. The two flights split (a five-runner Standard flight escaped in 2 rounds, a two-runner Hard flight was forked in 6), which is what the simulator would lead one to expect.
- **O4. Give-ups by rolled choice.** In Drill H the rolled give-up came up when the Draught (Hyde's Brawn d12 on a market ground) was the better play. That's the protocol rolling for a player, not the rule.
- **O5. Practised Hand and the Draught as a raise** (Branch E): the free change back applies only when the Draught changes his form. Spent as a raise, it costs a charge. Nobody doubted it at the table, but a player could ask. Not logged as a finding.
- **O6. The Tailor at three cloth locations.** Raid 1's four cloth items gave Jekyll's Tailor Duty an edge at three of the four locations. That is legal and was the reason for the Tailor roll-off.

---

## 9. Table time

As in HW1–HW4: about 1 minute a roll, 1 minute a party decision, 1 minute to read a place, 2 minutes for each stumble a finding describes.

| | Before the session | Set-up at the table | Play | Total at the table |
|---|---|---|---|---|
| Raid 1 (five players, rolled Standard town) | about 25 min rolling the town (35 rolls, two stumbles: R-L1, R-L2) | about 13 min (reading the list and the mirror, four roll-offs, sheets) | about 30 min (7 Turns: 20 rolls and checks, about 10 decisions) | **about 45 min** |
| Raid 2 (three players, Gallowsmere) | — | about 8 min (the town page, picks, one Duty swap) | about 35 min (11 Turns: 27 rolls and checks, about 12 decisions) | **about 45 min** |
| Branch B's flight (five runners, 2 rounds) | | | about 8 min (ten rolls, charge talk) | |
| Branch I's flight (two runners, 6 rounds) | | | about 12 min | |
| A local chase | | | about 1½ min a round (Branch D 5 rounds ≈ 8 min; Branch E ≈ 9 min with the form changes; Branch F's six-round attempt ≈ 9 min; Drill H's stall over R-M2 ≈ 2 min) | |

A smooth raid with no chase takes 45 minutes at the table, and a chase and a flight bring it to about an hour and a quarter. That is inside Chapter 1's "1–2 hours", with the rolled town built beforehand, as Chapter 8 advises.

---

## Appendix: every roll

All from `Math.random` through a small helper in a private scratch folder (not in the repository), one line per call, in order. "Choice" rolls settled table decisions that could go either way. Restarts are rolls from the same marked point that didn't give the result a drill needed; they are listed, not used. Void rolls are marked. Where both possible second dice were rolled for a choice already made, the one not chosen is ignored, as noted. Section 4.6's attempts were rolled by a helper that applied the stated policy; their rolls are in this list like the rest.

| # | What | Dice |
|---|---|---|
| R1 | Raid 1 list: essentials (odd one, even two) | d6 2 |
| R2 | Raid 1 list: item 1 (kind, item) | d6 1 · d6 3 |
| R3 | Raid 1 list: item 2 (kind, item) | d6 6 · d6 1 |
| R4 | Raid 1 list: item 3 (kind, item) | d6 6 · d6 2 |
| R5 | Raid 1 list: item 4 (kind, item) | d6 6 · d6 6 |
| R6 | Raid 1 list: item 5 (kind, item) | d6 6 · d6 4 |
| R7 | Raid 1 furniture: the piece | d6 2 |
| R8 | Raid 1 furniture: which item (1-5, 6 reroll) | d6 5 |
| R9 | Raid 1 place: wine (d3 via d6: 1 baker 2 butcher 3 tavern cellar) | d6 1 |
| R10 | Raid 1 place: velvet (d3 via d6: 1 draper 2 tailor 3 hatter) | d6 2 |
| R11 | Raid 1 place: bandages (d3 via d6) | d6 4 |
| R12 | Raid 1 place: boots (d3 via d6) | d6 5 |
| R13 | Raid 1 place: cape, 4th cloth item, shares (d3 via d6) | d6 5 |
| R14 | Raid 1 obstacles at the baker (Std: 1-6 one, 7-15 two, 16-20 three) | d20 18 |
| R15 | Raid 1 obstacles at the draper (Std: 1-6 one, 7-15 two, 16-20 three) | d20 13 |
| R16 | Raid 1 obstacles at the tailor (Std: 1-6 one, 7-15 two, 16-20 three) | d20 4 |
| R17 | Raid 1 obstacles at the hatter (Std: 1-6 one, 7-15 two, 16-20 three) | d20 19 |
| R18 | Raid 1 baker way in A (obstacle, Difficulty, watched 1-5) | d20 3 · d20 16 · d10 7 |
| R19 | Raid 1 baker way in B (obstacle, Difficulty, watched 1-5) | d20 8 · d20 8 · d10 10 |
| R20 | Raid 1 baker obstacle 2 | d20 5 · d20 15 · d10 5 |
| R21 | Raid 1 baker obstacle 3 | d20 3 · d20 11 · d10 8 |
| R22 | Raid 1 draper way in A | d20 14 · d20 15 · d10 5 |
| R23 | Raid 1 draper way in B | d20 12 · d20 16 · d10 3 |
| R24 | Raid 1 draper obstacle 2 | d20 10 · d20 2 · d10 10 |
| R25 | Raid 1 tailor way in A | d20 10 · d20 12 · d10 7 |
| R26 | Raid 1 tailor way in B | d20 13 · d20 19 · d10 8 |
| R27 | Raid 1 hatter way in A | d20 18 · d20 3 · d10 1 |
| R28 | Raid 1 hatter way in B | d20 19 · d20 10 · d10 5 |
| R29 | Raid 1 hatter way in A: inside (18) rerolled, obstacle table only | d20 14 |
| R30 | Raid 1 hatter obstacle 2 | d20 13 · d20 3 · d10 9 |
| R31 | Raid 1 hatter obstacle 3 | d20 16 · d20 11 · d10 3 |
| R32 | Raid 1 hatter furniture obstacle (+2, max 12) | d20 11 · d20 10 · d10 9 |
| R33 | Raid 1 Lantern Night custom | d6 4 |
| R34 | Raid 1 villager 1 (who, doing) | d6 2 · d6 4 |
| R35 | Raid 1 villager 2 (who, doing) | d6 6 · d6 6 |
| R36 | Raid 1 seat 3 wants (1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Witch) | d6 6 |
| R37 | Raid 1 seat 4 wants (1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Witch) | d6 5 |
| R38 | Raid 1 seat 5 wants (1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Witch) | d6 6 |
| R39 | Raid 1 roll-off for the Witch: seat 3, seat 5 | d6 2 · d6 1 |
| R40 | Raid 1 seat 5 picks again (d4: 1 Dracula 2 Creature 3 Mummy 4 Werewolf) | d4 1 |
| R41 | Raid 1 Duty wish, seat 1 Ghost (1-3 Tailor, 4-6 Cook; Butler/Librarian not on list) | d6 6 |
| R42 | Raid 1 Duty wish, seat 2 Jekyll (1-3 Tailor, 4-6 Cook; Butler/Librarian not on list) | d6 3 |
| R43 | Raid 1 Duty wish, seat 5 Dracula (1-3 Tailor, 4-6 Cook; Butler/Librarian not on list) | d6 4 |
| R44 | Raid 1 Cook roll-off: Witch, Ghost, Dracula | d6 3 · d6 1 · d6 1 |
| R45 | Raid 1 Tailor roll-off: Invisible Man, Jekyll | d6 5 · d6 6 |
| R46 | Raid 1 Butler roll-off (both defaults, no edge): Ghost, Dracula | d6 3 · d6 5 |
| R47 | Raid 1 loser and IM take free Duties (d3 loser: 1 Gardener 2 Handyman 3 Librarian; IM d6 for the rest) | d6 5 · d6 2 |
| R48 | Raid 1 T1 party plan (1-3: Ghost+Witch baker, Jekyll+Dracula draper, IM tailor; 4-6: Ghost+Dracula baker, Jekyll+Witch draper, IM tailor) | d6 6 |
| R49 | Raid 1 T1 Tell check at the baker (4-6 goes off) | d6 5 |
| R50 | Raid 1 T1 Tell check at the draper, plus Familiar's Warning second d6 | d6 1 · d6 4 |
| R51 | Raid 1 T1 baker Tell: which arrival (1-3 Ghost, 4-6 Dracula) | d6 4 |
| R52 | Raid 1 T2 baker: Ghost, drainpipe, Nimble d12 + Mask vs 8 (unwatched) | d12 3 · d6 5 |
| R53 | Raid 1 T2 baker: Dracula choice of second die at the wall (1-3 Mask, 4-6 Monster) | d6 5 |
| R54 | Raid 1 T2 baker: Dracula, high garden wall, Nimble d10 + Monster vs 10 (watched) | d10 6 · d10 10 |
| R55 | Raid 1 T2 draper: Jekyll at the guard dog, choice (1-3 Mask, 4-6 Monster) | d6 5 |
| R56 | Raid 1 T2 draper: Jekyll, guard dog, Charm d12 (Tailor raise moot) + Monster vs 10 (watched) | d12 3 · d10 9 |
| R57 | Raid 1 T2 draper: Witch, nosy neighbour, Sly d10 + Mask vs 6 (unwatched) | d10 7 · d6 5 |
| R58 | Raid 1 T2 tailor: Invisible Man, nosy neighbour, Sly d12 + Mask vs 8 (unwatched) | d12 12 · d6 2 |
| R59 | Raid 1 T3 baker: Dracula, cart, Brawn d8 raised to d10 by the Ghost's Chill + Mask vs 8 (unwatched) | d10 8 · d6 4 |
| R60 | Raid 1 T3 Tell check at the hatter (Witch, Hyde, IM, Ghost arrive), plus Familiar's Warning d6 | d6 2 · d6 6 |
| R61 | Raid 1 T4 hatter: Hyde drinks the Draught (free back, Practised Hand) -> Jekyll, guard dog, Charm d12 + Mask vs 6 (watched) | d12 8 · d6 4 |
| R62 | Raid 1 T4 hatter: Witch, shopkeeper, Charm d8 + Mask vs 6 (unwatched) | d8 4 · d6 3 |
| R63 | Raid 1 T5 party decision on the mirror at Suspicion 5 of 9 (1-2 go for it, 3-6 leave it) | d6 6 |
| R64 | Raid 1 T5 hatter children: choice (1-3 Jekyll Mask alone, 4-6 IM spends Unseen, Jekyll rolls Monster) | d6 2 |
| R65 | Raid 1 T5 hatter: Jekyll, children (group, watched), Charm d12 + Mask vs 8 | d12 7 · d6 1 |
| R66 | Raid 1 T6 Tell check at the way out (all five arrive with the Witch), plus Familiar's Warning d6 | d6 2 · d6 1 |
| R67 | Raid 1 T7 way out: Dracula, Mesmerise (approach, Charm, Difficulty 8-2=6), Charm d12 + Mask vs 6 (watched) | d12 10 · d6 1 |
| R68 | Raid 2 seat 1 wants (d8: 1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Ghost 7 Witch 8 Jekyll) | d8 5 |
| R69 | Raid 2 seat 2 wants (d8: 1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Ghost 7 Witch 8 Jekyll) | d8 4 |
| R70 | Raid 2 seat 3 wants (d8: 1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Ghost 7 Witch 8 Jekyll) | d8 7 |
| R71 | Raid 2 Werewolf Duty (Gardener not on list; 1-2 Handyman 3-4 Butler 5-6 Librarian) | d6 2 |
| R72 | Raid 2 T1 plan (1-4: Werewolf+Witch smithy, IM tailor; 5-6: all three smithy) | d6 3 |
| R73 | Raid 2 T1 Tell check at the smithy (Werewolf, Witch), plus Familiar's Warning d6 | d6 3 · d6 6 |
| R74 | Raid 2 T1 Tell check at the tailor (IM alone) | d6 5 |
| R75 | Raid 2 T2 smithy: Werewolf die choice at the wall (1-3 Mask, 4-6 Monster) | d6 6 |
| R76 | Raid 2 T2 smithy: Werewolf, high garden wall, Nimble d12 (Handyman moot) + Monster vs 8 (watched) | d12 9 · d10 2 |
| R77 | Raid 2 T2 smithy: Witch, watchman, Wits d12 + Monster (Werewolf's Good Dog: no show) vs 10 (watched) | d12 9 · d10 4 |
| R78 | Raid 2 T2 tailor: IM, drainpipe, Nimble d8 raised to d10 (Tailor) + Mask vs 8 (unwatched) | d10 7 · d6 4 |
| R79 | Raid 2 T3 tailor: IM choice at the shop floor (1-3 Mask, 4-6 Unseen + Monster) | d6 2 |
| R80 | Raid 2 T3 tailor: IM, crowded shop floor (group, watched), Sly d12 + Mask vs 10 (Out of Sight: carries nothing) | d12 11 · d6 3 |
| R81 | Raid 2 T3 Tell check at the silversmith (Werewolf, Witch arrive), plus Familiar's Warning d6 | d6 6 · d6 5 |
| R82 | Raid 2 T3 silversmith Tell: which arrival (1-3 Werewolf, 4-6 Witch) | d6 1 |
| R83 | Raid 2 T4 silversmith: Werewolf die choice at the window (1-3 Mask, 4-6 Monster) | d6 2 |
| R84 | Raid 2 T4 IM decision (1-3 try the armour with Through the Gap, 4-6 move to the printer) | d6 2 |
| R85 | Raid 2 T4 silversmith: Werewolf, shuttered window, Nimble d12 + Mask vs 8 (watched) | d12 9 · d6 3 |
| R86 | Raid 2 T4 silversmith: Witch, guard dog, A Potion for That (Wits d12 instead) + Mask vs 8 (watched) | d12 10 · d6 1 |
| R87 | Raid 2 T4 tailor: IM, trapdoor for the armour (Brawn 12), Through the Gap (Nimble, 12-2=10), Nimble d8 raised to d10 (Tailor) + Mask (unwatched) | d10 9 · d6 6 |
| R88 | Raid 2 T5 silversmith: Witch, strongbox, Wits d12 + Monster (Werewolf's Good Dog) vs 10 (unwatched) | d12 4 · d10 8 |
| R89 | Raid 2 T5 Tell check at the printer (Werewolf, IM arrive) | d6 5 |
| R90 | Raid 2 T5 printer Tell: which arrival (1-3 Werewolf, 4-6 IM) | d6 6 |
| R91 | Raid 2 T6 printer way in choice (1-3 IM at the nosy neighbour Sly 8 watched; 4-6 Werewolf at the rooftops Nimble 10 group) | d6 6 |
| R92 | Raid 2 T6 printer: Werewolf die choice at rooftops, unwatched (1-3 Mask, 4-6 Monster) | d6 6 |
| R93 | Raid 2 T6 printer: Werewolf, rooftops (group, unwatched), Nimble d12 + chosen die vs 10 — Monster chosen (R92): the d6 is ignored | d12 11 · d6 5 · d10 1 |
| R94 | Raid 2 T6 Tell check at the way out (Witch arrives), plus Familiar's Warning d6 | d6 2 · d6 6 |
| R95 | Raid 2 T7 printer: Werewolf, back room, Wits d8 + Mask vs 8 (unwatched) | d8 3 · d6 2 |
| R96 | Raid 2 T8 printer: Werewolf choice at the back room (1-3 Mask, 4-6 Good Dog + Monster, last charge) | d6 1 |
| R97 | Raid 2 T8 printer: Werewolf, back room, Wits d8 + Mask vs 8 (unwatched) | d8 3 · d6 4 |
| R98 | Raid 2 T11 way out: IM (carrying the armour: Monster forced), Unseen, Sly d12 + Monster vs 10 (watched) | d12 2 · d10 8 |
| R99 | Branch A T5 hatter: Jekyll, children (group, watched), Charm d12 + Monster (IM's Unseen) vs 8 | d12 2 · d10 5 |
| R100 | Branch B T5 hatter group check at the children (Charm 8, watched): Jekyll Charm d12+Mask; Ghost Charm d8 Chill->d10 +Mask; IM Charm d6 Hedge Spell->d8 +Mask | d12 2 · d6 3 · d10 7 · d6 6 · d8 6 · d6 2 |
| R101 | Branch B final flight round 1: the ground | d6 5 |
| R102 | Branch B flight r1 (parade): Dracula Charm d12 (Garlic -1, Mesmerise as raise +1) + Monster vs 11 | d12 5 · d10 9 |
| R103 | Branch B flight r1: Ghost Sly d10 (Cold Iron -1, IM's Through the Gap as raise +1) + Monster | d10 9 · d10 7 |
| R104 | Branch B flight r1: Witch Sly d10 Hedge Spell->d12 + Monster | d12 8 · d10 10 |
| R105 | Branch B flight r1: IM Sly d12 + Monster | d12 4 · d10 3 |
| R106 | Branch B flight r1: Jekyll Charm d12 + Monster | d12 2 · d10 2 |
| R107 | Branch B final flight round 2: the ground | d6 3 |
| R108 | Branch B flight r2 (market): Dracula Nimble d10 (Garlic -1, Bat as raise +1) + Monster vs 11 | d10 5 · d10 1 |
| R109 | Branch B flight r2: Ghost Nimble d12 (Cold Iron -1, Chill +1, last charge) + Monster | d12 3 · d10 4 |
| R110 | Branch B flight r2: Witch Potion for That -> Wits d12 + Monster (last charge) | d12 6 · d10 6 |
| R111 | Branch B flight r2: IM Nimble d8 (Through the Gap as raise) d10 + Monster | d10 7 · d10 6 |
| R112 | Branch B flight r2: Jekyll drinks the Draught -> Hyde, Brawn d12 + Monster | d12 10 · d10 8 |
| R113 | Branch C (Raid 2 T11, Suspicion 8) restart 1: IM way out, Unseen, Sly d12 + Monster vs 10 (until Trouble) | d12 1 · d10 8 |
| R114 | Branch C (Raid 2 T11, Suspicion 8) restart 2: IM way out, Unseen, Sly d12 + Monster vs 10 (until Trouble) | d12 12 · d10 9 |
| R115 | Branch C (Raid 2 T11, Suspicion 8) restart 3: IM way out, Unseen, Sly d12 + Monster vs 10 (until Trouble) | d12 3 · d10 7 |
| R116 | Branch C (Raid 2 T11, Suspicion 8) restart 4: IM way out, Unseen, Sly d12 + Monster vs 10 (until Trouble) | d12 4 · d10 5 |
| R117 | Branch C (Raid 2 T11, Suspicion 8) restart 5: IM way out, Unseen, Sly d12 + Monster vs 10 (until Trouble) | d12 8 · d10 1 |
| R118 | Branch C (Raid 2 T11, Suspicion 8) restart 6: IM way out, Unseen, Sly d12 + Monster vs 10 (until Trouble) | d12 7 · d10 9 |
| R119 | Branch C (Raid 2 T11, Suspicion 8) restart 7: IM way out, Unseen, Sly d12 + Monster vs 10 (until Trouble) | d12 11 · d10 5 |
| R120 | Branch C (Raid 2 T11, Suspicion 8) restart 8: IM way out, Unseen, Sly d12 + Monster vs 10 (until Trouble) | d12 3 · d10 9 |
| R121 | Branch C restart 9: IM way out, Unseen, Sly d12 + Monster vs 10 (until Trouble) | d12 7 · d10 6 |
| R122 | Branch C restart 10: IM way out, Unseen, Sly d12 + Monster vs 10 (until Trouble) | d12 1 · d10 2 |
| R123 | Branch C IM local chase round 1 (mob 11 = min(8+4, 11); Lead 1): the ground | d6 4 |
| R124 | Branch C r1 IM choice (1-3 Through the Gap as a raise, 4-6 Unseen to hide the Monster; last charge) | d6 5 |
| R125 | Branch C r1 (rooftops): IM Wits d10 + Monster (forced, carrying; Unseen) vs 11 | d10 5 · d10 3 |
| R126 | Branch C T12 way out (Suspicion 10 of 13, IM captured): Werewolf Nimble d12 + Monster (Good Dog, last charge) vs 10 | d12 7 · d10 1 |
| R127 | Branch D (Raid 1 T2 baker, Suspicion 1) restart 1: Dracula wall Nimble d10 + Monster vs 10 watched (until Trouble) | d10 7 · d10 9 |
| R128 | Branch D (Raid 1 T2 baker, Suspicion 1) restart 2: Dracula wall Nimble d10 + Monster vs 10 watched (until Trouble) | d10 6 · d10 10 |
| R129 | Branch D (Raid 1 T2 baker, Suspicion 1) restart 3: Dracula wall Nimble d10 + Monster vs 10 watched (until Trouble) | d10 1 · d10 2 |
| R130 | Branch D Dracula local chase round 1 (mob 9, Lead 1): the ground | d6 6 |
| R131 | Branch D r1 Dracula die choice (1-3 Mask, 4-6 Monster) | d6 1 |
| R132 | Branch D r1 (dead end): Dracula Bat (trait -> Nimble d10), Garlic -1, Mesmerise as a raise +1 = Nimble d10 + Mask vs 9 | d10 5 · d6 5 |
| R133 | Branch D Dracula local chase round 2 (mob 9, Lead 3): the ground | d6 6 |
| R134 | Branch D r2 Dracula choice (1-3 Bat only with last charge, 4-6 Bat + overdraw Mesmerise as a raise); die (1-3 Mask, 4-6 Monster) | d6 2 · d6 2 |
| R135 | Branch D r2 (dead end): Dracula Bat (Nimble d10), Garlic -1 = d8 + Mask vs 9 (last charge) | d8 6 · d6 1 |
| R136 | Branch D Dracula local chase round 3 (mob 9, Lead 3): the ground | d6 4 |
| R137 | Branch D r3 Dracula choice (1-4 overdraw Bat as a raise, 5-6 no ability); die (1-3 Mask, 4-6 Monster) | d6 4 · d6 2 |
| R138 | Branch D r3 (rooftops): Dracula Nimble d10, Garlic -1, Bat as a raise +1 (overdraw: +2 at the chase's end) = d10 + Mask vs 9 | d10 1 · d6 2 |
| R139 | Branch D Dracula local chase round 4 (mob 9, Lead 2): the ground | d6 5 |
| R140 | Branch D r4 Dracula die (1-3 Mask, 4-6 Monster; a second overdraw refused) | d6 1 |
| R141 | Branch D r4 (parade): Dracula Charm d12, Garlic -1 = d10 + Mask vs 9 | d10 8 · d6 4 |
| R142 | Branch D Dracula local chase round 5 (mob 9, Lead 3): the ground | d6 2 |
| R143 | Branch D r5 Dracula die (1-3 Mask, 4-6 Monster) | d6 1 |
| R144 | Branch D r5 (alleys): Dracula Nimble d10, Garlic -1 = d8 + chosen die vs 9 (d6 Mask, d10 Monster) — Mask chosen (R143): the d10 is ignored | d8 8 · d6 5 · d10 2 |
| R145 | Branch E (Raid 1 T2 draper, Suspicion 3) restart 1: Jekyll guard dog Charm d12 + Monster vs 10 watched (until Trouble) | d12 6 · d10 5 |
| R146 | Branch E (Raid 1 T2 draper, Suspicion 3) restart 2: Jekyll guard dog Charm d12 + Monster vs 10 watched (until Trouble) | d12 11 · d10 7 |
| R147 | Branch E (Raid 1 T2 draper, Suspicion 3) restart 3: Jekyll guard dog Charm d12 + Monster vs 10 watched (until Trouble) | d12 11 · d10 8 |
| R148 | Branch E (Raid 1 T2 draper, Suspicion 3) restart 4: Jekyll guard dog Charm d12 + Monster vs 10 watched (until Trouble) | d12 1 · d10 1 |
| R149 | Branch E Jekyll local chase round 1 (mob 10 = 8 + 4/2, Lead 1): the ground | d6 2 |
| R150 | Branch E r1 Jekyll choice (1-3 the Draught as a raise: Sly d8->d10; 4-6 the Draught to change into Hyde: Nimble d10); die (1-3 Mask, 4-6 Monster) | d6 4 · d6 5 |
| R151 | Branch E r1 (alleys): Jekyll drinks the Draught -> Hyde, Nimble d10 + Monster vs 10 | d10 1 · d10 10 |
| R152 | Branch E Jekyll/Hyde local chase round 2 (mob 10, Lead 2): the ground | d6 6 |
| R153 | Branch E r2 (dead end): Hyde Brawn d12 + Monster vs 10 | d12 12 · d10 2 |
| R154 | Branch E Hyde local chase round 3 (mob 10, Lead 3; A Familiar Face from now): the ground | d6 1 |
| R155 | Branch E r3 die choice for Jekyll (1-3 Mask, 4-6 Monster) | d6 5 |
| R156 | Branch E r3 (square): Hyde drinks the Draught back to Jekyll (free, Practised Hand), Charm d12, Weakness -1, Doctor's Bag +1 = d12 + chosen die vs 10 (d6 Mask, d10 Monster) — Monster chosen (R155): the d6 is ignored | d12 5 · d6 5 · d10 1 |
| R157 | Branch E Jekyll local chase round 4 (mob 10, Lead 2): the ground | d6 5 |
| R158 | Branch E r4 die choice for Jekyll (1-3 Mask, 4-6 Monster) | d6 4 |
| R159 | Branch E r4 (parade): Jekyll Charm d12, Weakness -1, the Draught spent as a raise +1 (last charge) = d12 + chosen die vs 10 (d6 Mask, d10 Monster) — Monster chosen (R158): the d6 is ignored | d12 4 · d6 6 · d10 6 |
| R160 | Branch E Hyde local chase round 5 (mob 10, Lead 3): the ground | d6 6 |
| R161 | Branch E r5 Hyde choice (1-3 overdraw Doctor's Bag as raise, 4-6 no ability); Monster (already shown) | d6 6 |
| R162 | Branch E r5 (dead end): Hyde Brawn d12, Weakness -1 = d10 + Monster vs 10 | d10 10 · d10 2 |
| R163 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 1: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 5 · d6 3 |
| R164 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 2: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 12 · d6 4 |
| R165 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 3: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 9 · d6 3 |
| R166 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 4: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 1 · d6 6 |
| R167 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 5: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 12 · d6 5 |
| R168 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 6: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 5 · d6 1 |
| R169 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 7: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 10 · d6 3 |
| R170 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 8: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 8 · d6 5 |
| R171 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 9: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 5 · d6 6 |
| R172 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 10: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 11 · d6 5 |
| R173 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 11: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 11 · d6 5 |
| R174 | Branch F (Raid 2 T6 printer, Suspicion 3; R91 as 1-3) restart 12: IM nosy neighbour Sly d12 + Mask vs 8 watched, carrying bandages (until Trouble) | d12 2 · d6 3 |
| R175 | Branch F IM chase attempt 1 round 1 (mob 10, Lead 1; policy best trait + Mask, no charges): ground | d6 5 |
| R176 | Branch F a1 r1 (parade): IM Sly d12 + Mask vs 10 | d12 6 · d6 1 |
| R177 | Branch F a2 r1: ground | d6 5 |
| R178 | Branch F a2 r1 (parade): IM Sly d12 + Mask vs 10 | d12 11 · d6 3 |
| R179 | Branch F a2 r2: ground | d6 4 |
| R180 | Branch F a2 r2 (rooftops): IM Wits d10 + Mask vs 10 | d10 6 · d6 1 |
| R181 | Branch F a2 r3: ground | d6 1 |
| R182 | Branch F a2 r3 (square): IM Sly d10 (Flour -1) + Mask vs 10 | d10 2 · d6 2 |
| R183 | Branch F a3 r1: ground | d6 3 |
| R184 | Branch F a3 r1 (market): IM Nimble d8 + Mask vs 10 | d8 4 · d6 4 |
| R185 | Branch F a3 r2: ground | d6 3 |
| R186 | Branch F a3 r2 (market): IM Nimble d8 + Mask vs 10 | d8 5 · d6 3 |
| R187 | Branch F a3 r3: ground | d6 1 |
| R188 | Branch F a3 r3 (square): IM Sly d10 (Flour -1) + Mask vs 10 | d10 5 · d6 6 |
| R189 | Branch F a3 r4: ground | d6 4 |
| R190 | Branch F a3 r4 (rooftops): IM Wits d8 (Flour -1) + Mask vs 10 | d8 3 · d6 2 |
| R191 | Branch F a3 r5: ground | d6 5 |
| R192 | Branch F a3 r5 (parade): IM Sly d10 (Flour -1) + Mask vs 10 | d10 5 · d6 3 |
| R193 | Branch F a3 r6: ground | d6 2 |
| R194 | Branch F a3 r6 (alleys): IM Sly d10 (Flour -1) + Mask vs 10 | d10 5 · d6 5 |
| R195 | Branch G (Raid 1 T5 hatter, stipulated Suspicion 6, going for the mirror) restart 1: group check at the children: Jekyll Charm d12+Mask; Ghost Charm d8 Chill->d10 +Mask; IM Charm d6 Hedge Spell->d8 +Mask, vs 8 | d12 9 · d6 1 · d10 10 · d6 6 · d8 7 · d6 6 |
| R196 | Branch G (Raid 1 T5 hatter, stipulated Suspicion 6, going for the mirror) restart 2: group check at the children: Jekyll Charm d12+Mask; Ghost Charm d8 Chill->d10 +Mask; IM Charm d6 Hedge Spell->d8 +Mask, vs 8 | d12 6 · d6 3 · d10 4 · d6 1 · d8 8 · d6 6 |
| R197 | Branch G (Raid 1 T5 hatter, stipulated Suspicion 6, going for the mirror) restart 3: group check at the children: Jekyll Charm d12+Mask; Ghost Charm d8 Chill->d10 +Mask; IM Charm d6 Hedge Spell->d8 +Mask, vs 8 — **void** (rolled in the same batch after R196 had already given Trouble) | d12 9 · d6 1 · d10 4 · d6 5 · d8 7 · d6 2 |
| R198 | Branch G (Raid 1 T5 hatter, stipulated Suspicion 6, going for the mirror) restart 4: group check at the children: Jekyll Charm d12+Mask; Ghost Charm d8 Chill->d10 +Mask; IM Charm d6 Hedge Spell->d8 +Mask, vs 8 — **void** (as R197) | d12 5 · d6 5 · d10 10 · d6 6 · d8 6 · d6 2 |
| R199 | Branch G (Raid 1 T5 hatter, stipulated Suspicion 6, going for the mirror) restart 5: group check at the children: Jekyll Charm d12+Mask; Ghost Charm d8 Chill->d10 +Mask; IM Charm d6 Hedge Spell->d8 +Mask, vs 8 — **void** (as R197) | d12 7 · d6 1 · d10 10 · d6 5 · d8 8 · d6 6 |
| R200 | Branch G (Raid 1 T5 hatter, stipulated Suspicion 6, going for the mirror) restart 6: group check at the children: Jekyll Charm d12+Mask; Ghost Charm d8 Chill->d10 +Mask; IM Charm d6 Hedge Spell->d8 +Mask, vs 8 — **void** (as R197) | d12 3 · d6 1 · d10 7 · d6 5 · d8 5 · d6 2 |
| R201 | Branch G Ghost local chase round 1 (mob 11 = 8 + 7/2 rounded down; Lead 1; Cold Iron from round 1): the ground | d6 2 |
| R202 | Branch G r1 once the ground is read: Ghost gives up? (1-3 gives up, 4-6 runs) | d6 6 |
| R203 | Branch G r1 (alleys): Ghost Nimble d12, Cold Iron -1, Chill +1 (last charge) = d12 + Mask vs 11 | d12 11 · d6 2 |
| R204 | Branch G Ghost round 2 (mob 11, Lead 2): the ground | d6 2 |
| R205 | Branch G r2 once the ground is read: Ghost gives up? (1-2 gives up, 3-6 runs) | d6 5 |
| R206 | Branch G r2 (alleys): Ghost Nimble d12, Cold Iron -1 = d10 + Mask vs 11 | d10 9 · d6 1 |
| R207 | Branch G Ghost round 3 (mob 11, Lead 2): the ground | d6 3 |
| R208 | Branch G r3 once the ground is read: Ghost gives up? (1-2 gives up, 3-6 runs) | d6 6 |
| R209 | Branch G r3 (market): Ghost Nimble d12, Cold Iron -1 = d10 + Mask vs 11 | d10 6 · d6 6 |
| R210 | Branch G2 (Raid 1 T6 hatter, stipulated Suspicion 7, going for the mirror) restart 1: group check at the children vs 8: Ghost Charm d8 + Mask; IM Charm d6 + Mask (no charges spent) | d8 4 · d6 2 · d6 2 · d6 3 |
| R211 | Branch G2 IM local chase round 1 (Suspicion 8 of 9; mob min(8+4, 11) = 11; Lead 1): the ground | d6 4 |
| R212 | Branch G2 r1 once the ground is read: IM gives up? (1-4 gives up, 5-6 runs) | d6 3 |
| R213 | Branch H (Raid 1 town): furniture piece reroll 1 until Huge (5 clock, 6 bed) | d6 3 |
| R214 | Branch H (Raid 1 town): furniture piece reroll 2 until Huge (5 clock, 6 bed) | d6 4 |
| R215 | Branch H (Raid 1 town): furniture piece reroll 3 until Huge (5 clock, 6 bed) | d6 3 |
| R216 | Branch H (Raid 1 town): furniture piece reroll 4 until Huge (5 clock, 6 bed) | d6 6 |
| R217 | Branch H T6 hatter: Jekyll, crowded shop floor for the bed (group, unwatched), Sly d8 raised to d10 (Tailor) + Mask vs 10 | d10 3 · d6 4 |
| R218 | Branch H T6 hatter: Witch, children (group, watched), Charm d8, Hedge Spell -> d10 + Mask vs 8 | d10 3 · d6 6 |
| R219 | Branch H T7 hatter group check at the shop floor (Sly 10, unwatched): Jekyll Sly d10 (Tailor) + Mask; Witch Sly d10 Hedge Spell->d12 + Mask | d10 3 · d6 6 · d12 4 · d6 2 |
| R220 | Drill H (stipulated: T10, Suspicion 6 of 9, all at the way out, Jekyll and the Witch carry the bed) restart 1: Jekyll rolls the way out, Sly d8 + Monster (forced) vs 8 (until Trouble) | d8 7 · d10 10 |
| R221 | Drill H (stipulated: T10, Suspicion 6 of 9, all at the way out, Jekyll and the Witch carry the bed) restart 2: Jekyll rolls the way out, Sly d8 + Monster (forced) vs 8 (until Trouble) | d8 3 · d10 1 |
| R222 | Drill H Jekyll local chase round 1 (mob 11 = 8 + 7/2 rounded down; Lead 1; ruled still carrying: Monster only): the ground | d6 3 |
| R223 | Drill H r1 once the ground is read: give up? (1 gives up, 2-6 runs) | d6 1 |
| R224 | Branch I (from Branch C, T12, Suspicion 10 of 13, IM captured): Werewolf and Witch move to the lock-up: Tell check, plus Familiar's Warning d6 | d6 3 · d6 4 |
| R225 | Branch I final flight round 1 (Hard: mob 11, Lead 2, escape 6): the ground | d6 5 |
| R226 | Branch I flight r1 (parade): Werewolf Keen Nose -> Wits d8 + Monster vs 11 (last charge) | d8 6 · d10 5 |
| R227 | Branch I flight r1: Witch Sly d10, Hedge Spell -> d12 + Monster vs 11 | d12 7 · d10 4 |
| R228 | Branch I final flight round 2 (Lead 4): the ground | d6 5 |
| R229 | Branch I flight r2 (parade): Werewolf overdraws Keen Nose (step down from his next roll) -> Wits d8 + Monster vs 11 | d8 2 · d10 3 |
| R230 | Branch I flight r2: Witch Sly d10, Hedge Spell -> d12 + Monster vs 11 (last charge) | d12 3 · d10 4 |
| R231 | Branch I final flight round 3 (Lead 2; Weaknesses in play): the ground | d6 1 |
| R232 | Branch I flight r3 Witch choice (1-4 overdraw Hedge Spell on her own roll now, 5-6 save it) | d6 5 |
| R233 | Branch I flight r3 (square): Werewolf Sly d6, Hounds -1, overdraw step -1 = d4 + Monster vs 11 | d4 1 · d10 2 |
| R234 | Branch I flight r3: Witch Sly d10, Rowan -1 = d8 + Monster vs 11 | d8 7 · d10 2 |
| R235 | Branch I final flight round 4 (Lead 1): the ground | d6 1 |
| R236 | Branch I flight r4 (square): Werewolf Sly d4 (two steps down, floored at d4) + Monster vs 11 | d4 1 · d10 1 |
| R237 | Branch I flight r4: Witch overdraws Hedge Spell on her own roll: Sly d10, Rowan -1, raise +1 = d10 + Monster vs 11 | d10 2 · d10 10 |
| R238 | Branch I final flight round 5 (Lead 1): the ground | d6 1 |
| R239 | Branch I flight r5 (square): Werewolf Sly d4 + Monster vs 11 | d4 3 · d10 5 |
| R240 | Branch I flight r5: Witch Sly d10, Rowan -1, overdraw step -1 = d6 + Monster vs 11 | d6 3 · d10 10 |
| R241 | Branch I final flight round 6 (Lead 1): the ground | d6 6 |
| R242 | Branch I flight r6 (dead end): Werewolf Brawn d10 -2 = d6 + Monster vs 11 | d6 1 · d10 6 |
| R243 | Branch I flight r6: Witch Wits d12 -2 = d8 + Monster vs 11 | d8 4 · d10 4 |
| R244 | Drill J (stipulated: Gallowsmere, a Ghost with default picks and the Witch arrive at the printer, Suspicion 2): Tell check, plus Familiar's Warning d6 | d6 3 · d6 5 |
| R245 | Drill J next Turn: Ghost past the rooftops by Spectral (no roll); Witch rolls the nosy neighbour (the other way in), Sly d10 + Mask vs 8 (watched) | d10 10 · d6 3 |
| R246 | Drill J: Ghost's action, back room (Wits 8, loud Sly): choice (1-3 Wits d6 + Chill -> d8 + Mask; 4-6 Sly d10 the loud way + Mask) | d6 4 |
| R247 | Drill J: Ghost, back room, Wits d6 + Chill -> d8 + Mask vs 8 (unwatched) — **void** (rolled for the wrong choice; R246 said the loud way) | d8 7 · d6 5 |
| R248 | Drill J: Ghost, back room, Sly d10 the loud way (+1 whatever the result) + Mask vs 8 (R247 void: rolled for the wrong choice) | d10 7 · d6 1 |
| R249 | Drill K (procedure only): extra location 1, ways in A and B on the obstacle table | d20 16 · d20 14 |
| R250 | Drill K (procedure only): extra location 2, ways in A and B on the obstacle table | d20 1 · d20 7 |
| R251 | Drill K (procedure only): extra location 3, ways in A and B on the obstacle table | d20 18 · d20 16 |
| R252 | Drill K (procedure only): extra location 4, ways in A and B on the obstacle table | d20 14 · d20 12 |
| R253 | Drill K (procedure only): extra location 5, ways in A and B on the obstacle table | d20 13 · d20 12 |
| R254 | Drill K (procedure only): extra location 6, ways in A and B on the obstacle table | d20 18 · d20 5 |
| R255 | Drill K (procedure only): extra location 7, ways in A and B on the obstacle table | d20 12 · d20 19 |
| R256 | Drill K (procedure only): extra location 8, ways in A and B on the obstacle table | d20 14 · d20 8 |
| R257 | Drill K: location 1 way in B rerolled (same quiet trait Charm as A, the children) | d20 15 |
| R258 | Drill K: location 3 way in A rerolled (inside: back room) | d20 18 |
| R259 | Drill K: location 6 way in A rerolled (inside: back room) | d20 4 |
| R260 | Drill K: location 1 way in B rerolled again (doorman, Charm again) | d20 5 |
| R261 | Drill K: location 3 way in A rerolled again (back room again) | d20 13 |
| R262 | Drill K: location 3 way in B rerolled (children, Charm, now the same quiet trait as A's rerolled shopkeeper) | d20 1 |
