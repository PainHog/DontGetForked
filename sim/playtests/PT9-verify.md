# PT9: Verification playtest after the PT8 fix round (V21, V22 and the wording fixes; a rolled Standard town, drills a–g)

## 1. What this is

A short, focused verification playtest of the rules after PT8's fix round (commit 08abd30): **V21** (Chapter 3: "A dropped item (drop yours any time) falls where you are; picking it up costs your next action"), **V22** (Chapter 8: "if a kind has more items than places, two may share a place (one location, guarding both)"), and the wording fixes: Mesmerise "at a watched obstacle", Out of Sight's "anyone in the same place", an opened approach's "Only you get through (others must beat it themselves), though the way out (everyone leaves) and a rescue work as usual", the d3 ("a d6 halved, rounding up, serves as the d3"), and a castle upgrade's "one extra charge (part of its starting number that raid)". It also checks each of PT8's twelve findings against the book's text now (section 8).

**Rules source:** the rulebook text only: `book/src/chapters/*.html`, read as text, with the alt text the book prints for its pictures (the chapters at commit 7fe8663, the same text as 08abd30; they did not change while I played). Not the simulator, not `docs/`, not the Foundry code. Where the book is silent I made a ruling, listed it in section 4, and logged it as a finding in section 7. The commit diff and the decisions log were read only to see what was decided about PT8's findings (section 8).

**Dice:** every random result is a real `Math.random` roll from `node -e`, numbered R1 onward and listed in section 10. Drills say exactly what I chose at their start; every roll after that is real. Where a drill needed a particular result to put a rule through the text, I restarted it from the same chosen start until the dice gave it, and every restart's rolls are listed. The players played to win; the Storyteller played by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now, but never one that costs nothing").

---

## 2. Summary

| Line | What it puts through the text | Result | Ended | Suspicion |
|---|---|---|---|---|
| **Main line**: a Standard town rolled on Chapter 8's tables (every location watched); 4 rolled Entities (the Witch, Jekyll & Hyde, the Invisible Man, the Creature), default picks | The d3 at five places; three second ways in rerolled; the ceiling; a Critical's charge back; Practised Hand; a friend's Hedge Spell; the furniture taken and carried; the way out rolled by a carrier | **Grand Year**: all five items and the suit of armour | Out on **Turn 7** | 5 of 11 |
| Drill a: V21 with Out of Sight | The Invisible Man sets the cape down before a watched roll: alone (a1), and with the Witch in the same place still holding loot (a2) | a1 Trouble on the 10th try, **not caught**; the top hat next Turn, the cape picked up for an action. a2 Trouble on the 4th try, **caught**; escaped in 2 rounds | — | 3 → 4; 3 → 4 |
| Drill b: V21 with Spectral | A Ghost sets the tea service down, passes the maze, sets the cape down, passes the furniture's shop floor; loot on the near side of an obstacle | Two items, two pick-ups, no rolls; the near side read as the same place (m1) | — | — |
| Drill c: V21 once caught | The Witch drops an essential and an extra before her chase | c1, c2: **the Limit** came (the loot stayed in town); c3 **captured**: the town took nothing (M1) | — | 8 → 11; 8 → 11; 4 → 5 |
| Drill d: V22 | A chosen list of four cloth items and the bacon | The top hat shared the draper with the velvet: one location, one Tell check, both items on one Cost; the armchair there, numbered 1 of 4 | — | 0 → 1 |
| Drill e: Mesmerise | Unwatched obstacle in a watched location; a watched wall and drainpipe; an obstacle that lists Charm; the way out; slipping free | Refused, then allowed four times: 4 Successes | — | — |
| Drill f: opening an approach | "Others must beat it themselves"; a rescue opened | The Creature beat the window the Ghost had opened; Through the Gap freed both captives | — | 2 → 3 |
| Drill g: the campaign charge | A castle upgrade's fourth charge and a Critical | A Critical on the 6th try took the Invisible Man from 3 back to **4** | — | 0 |

**What was verified and where**

| Text | Where | Rolls | Read cleanly? |
|---|---|---|---|
| **V21** Ch3: "A dropped item (drop yours any time) falls where you are; picking it up costs your next action." | Drills a (before a watched roll), b (for Spectral; the near side), c (once caught) | R110–R175 | Yes for its purpose; its edges are M1, m1, m2 |
| **V22** Ch8: "two may share a place (one location, guarding both)" | Drill d | R176–R207 | Yes (w2: Chapter 4's one-item wording) |
| Ch2: Mesmerise "at a watched obstacle" | Drill e | R208–R217 | Yes (w1: slipping free) |
| Ch2: Out of Sight's "anyone in the same place" | Drill a1, a2 | R110–R145 | Yes |
| Ch3: "Only you get through (others must beat it themselves), though the way out (everyone leaves) and a rescue work as usual, and a captive may open its own way out" | Drills f1, f2, e5, e6 | R214–R224 | Yes |
| Ch1: "a d6 halved, rounding up, serves as the d3" | Main line, drill d | R13–R18, R182–R188 | Yes |
| Ch7: "one extra charge (part of its starting number that raid)" | Drill g | R225–R236 | Yes |
| A Standard town from Chapter 8, played to How the Year Went | Main line | R1–R109 | Yes |

**Counts: 0 blockers, 1 major, 2 minor, 3 wording** (6 in all, section 7). By kind: **1 rules** question for the author (M1: dropping loot once caught) and **5 wording** (m1, m2, w1–w3).

**PT8's 12 findings: 8 resolved, 0 partly, 4 not changed** (m4 and m5 by decision; w3 and w4 not taken up; w4 is logged again here as w1). Section 8.

**Local chases:** 4, of 1–5 rounds (12 rounds): 1 escaped, 1 captured, 2 ended at the Limit. No final flight was played, and the main line had no chase at all.

---

## 3. Setup

### 3.1 Main line: a Standard town rolled on Chapter 8's tables (R1–R71)

Built by Chapter 8's Rolling a Town, Standard column, every number rolled.

**Lantern Night** (R1 = 1): turnip lanterns in every window.

**The list** (R2–R12). Standard: "roll any die: odd, one; even, two": R2 = 6, **two essentials**, the first two rolled. Each item a d6 for its kind and a d6 for the item: R3–R4 cloth 4, **a new cape** · essential; R5–R6 plants 3, **rose bushes for the graveyard** · essential; R7–R8 cloth 3, a top hat; R9–R10 tools 3, hinges that creak properly; R11–R12 silver 2, a tea service. No repeated item.

**Places** ("a d3 or pick, one item per place"; the d3 rolled as Chapter 1 now says, "a d6 halved, rounding up": 1–2 → 1, 3–4 → 2, 5–6 → 3): the cape R13 = 3 → 2, **the tailor**; the roses R14 = 3 → 2, **the florist**; the top hat R15 = 4 → 2, the tailor again: one item per place and cloth has three places, so rolled again: R18 = 1 → 1, **the draper**; the hinges R16 = 2 → 1, **the smithy**; the tea service R17 = 2 → 1, **the silversmith**.

**Obstacles** (counts R19–R23, Standard: 1–6 one · 7–15 two · 16–20 three: 6, 11, 9, 12, 2 → one, two, two, two, one; each obstacle a d20 on the obstacle table, a d20 for its Difficulty (1–3: 6 · 4–13: 8 · 14–19: 10 · 20: 12) and a d10 for watched (1–5); R24–R62). Three second ways in rolled the first way's quiet trait and were rerolled on the obstacle table only ("roll the obstacle table again until its quiet way is a different trait"; their Difficulty and watched rolls stand): the draper's (R42 = 18 back room, Wits; R63 = 20 maze, Wits; R65 = 18 back room, Wits; R66 = 3, a cart) and the silversmith's (R60 = 18 back room, Wits; R64 = 8, a drainpipe).

**The furniture** (R67–R71): R67 = 3, **a suit of armour** (Bulky); its location, "number them and roll a d6, rerolling a number without one" (1–5 in list order): R68 = 1, **the tailor**. Its obstacle: R69 = 11, a crowded shop floor (group), R70 = 6 → 8, +2 = **10**; R71 = 9, not watched.

| # | Location · item | Obstacle | Quiet way | Loud way | Difficulty | Watched |
|---|---|---|---|---|---|---|
| 1 | **The tailor**: a new cape (cloth and costumes) · essential | Way in: a shuttered window | Nimble | Brawn | 10 | — |
| | | or: a maze of festival stalls (group) | Wits | — | 6 | watched |
| | | Furniture: a crowded shop floor (group) (the suit of armour, Bulky) | Sly | — | 10 (rolled 8) | — |
| 2 | **The florist**: rose bushes for the graveyard (plants and seeds) · essential | Way in: the rooftops (group) | Nimble | — | 8 | — |
| | | or: a bolted back gate | Brawn | Charm | 10 | — |
| | | Then: a guard dog | Charm | Nimble | 6 | watched |
| 3 | **The draper**: a top hat (cloth and costumes) | Way in: a maze of festival stalls (group) | Wits | — | 10 | — |
| | | or: a cart blocking the alley | Brawn | Nimble | 8 | watched |
| | | Then: a shuttered window | Nimble | Brawn | 8 | watched |
| 4 | **The smithy**: hinges that creak properly (tools and hardware) | Way in: a crowded shop floor (group) | Sly | — | 6 | — |
| | | or: the shopkeeper behind the counter | Charm | Sly | 12 | watched |
| | | Then: a high garden wall | Nimble | Brawn | 8 | watched |
| 5 | **The silversmith**: a tea service (silver, china and linen) | Way in: a dark, cluttered back room | Wits | Sly | 8 | — |
| | | or: a rickety drainpipe | Nimble | — | 10 | watched |

Standard: Suspicion Limit 11 · the way out 8 · the lock-up 10 · the final flight: mob 11, escape at Lead 5. 14 obstacles, 7 watched (50%; the table's share is 50%); Difficulties by roll 6 ×3, 8 ×6, 10 ×4, 12 ×1 (the table's 15 / 50 / 30 / 5%). The ceiling (one 12 on Standard) holds: the smithy's shopkeeper is the only 12. **All five locations are watched** (the tailor and the silversmith by one way in each, "either way in"; the florist by its guard dog), so every first arrival gets a Tell check. Five group obstacles, two of them ways in the party might take. No town name: the tables don't make one.

### 3.2 Main line party (R72–R76)

As the brief asked, four Entities rolled on a d8 in Chapter 2's order (1 Dracula … 8 Jekyll & Hyde), rerolling one already in: R72 = 7, R73 = 7 (repeat), R74 = 8, R75 = 5, R76 = 2: **the Witch, Jekyll & Hyde, the Invisible Man, Frankenstein's Creature**, default picks. No Duty clash. 3 charges each.

| Entity | Dice | Signature | Gift | Perk | Duty (item here) | Weakness |
|---|---|---|---|---|---|---|
| A Witch | Brawn d6 · Nimble d4 · Sly d10 · Charm d8 · Wits d12 | Hedge Spell (raise, hers or a friend's, same place) | Broomstick (open with Nimble) | Familiar's Warning | Cook (nothing on this list) | Rowan (Soon) |
| Jekyll & Hyde | Jekyll: Brawn d4 · Nimble d6 · Sly d8 · Charm d12 · Wits d10 / Hyde: Brawn d12 · Nimble d10 · Sly d8 · Charm d4 · Wits d6 | The Draught (change form before a roll) | Doctor's Bag (raise) | Practised Hand (back to Jekyll free) | Librarian (nothing on this list) | A Familiar Face (Soon) |
| The Invisible Man | Brawn d4 · Nimble d8 · Sly d12 · Charm d6 · Wits d10 | Unseen (hidden Monster) | Through the Gap (open with Nimble) | **Out of Sight** | Tailor (the cape **and** the top hat) | Flour (Soon) |
| Frankenstein's Creature | Brawn d12 · Nimble d8 · Sly d6 · Charm d4 · Wits d10 | Brute Force (Brawn instead) | Mountain Stride (open with Nimble) | Strong Back | Handyman (the hinges) | Fire (Soon) |

The Invisible Man's default Perk is Out of Sight, so V21's set-down and Out of Sight's "anyone in the same place" could come up in the main line itself.

---

## 4. Standing readings (my rulings where the book is silent; the ones that matter are findings in section 7)

| # | Reading | Finding |
|---|---|---|
| S1 | Random Entities: the book has players pick; as the brief asked, I rolled a d8 in Chapter 2's order (1 Dracula … 8 Jekyll & Hyde), rerolling an Entity already in the party. | — (not a rule) |
| S2 | The d3 is "a d6 halved, rounding up" (Chapter 1): 1–2 → 1, 3–4 → 2, 5–6 → 3. | — (the text answers it) |
| S3 | A second way in that repeats the first's quiet trait rerolls only the obstacle table ("roll the obstacle table again"); its Difficulty and watched rolls stand. | — (the text answers it) |
| S4 | Dropping your own loot is free and takes no action, at any moment and in anyone's turn, including once you're caught and before or during a chase: "drop yours any time" (Chapter 4 says the same of a piece: "drop it any time"). | **M1**, m2 |
| S5 | Picking up a dropped item is the action you take: when you next act, you pick it up instead of rolling, moving or waiting (read with "lose a Turn (you skip your next action)" and Chapter 4's "every Entity takes one action"). Not "pick it up at once and skip your next action". | **m2** |
| S6 | "Falls where you are" means the place (Chapter 3's "the same place (a location, the way out or the lock-up)"), not a spot before one obstacle; anyone at that place, past its obstacles or not, may pick it up, for their next action. So loot set down on the near side of an obstacle can be picked up from beyond it. | **m1** |
| S7 | Each dropped item takes its own pick-up ("picking it up"). | **m2** |
| S8 | A dropped item is no longer carried: Out of Sight doesn't count it, Spectral and Through the Wall work, and a capture doesn't take it ("the town takes back what you were carrying"). | **M1** |
| S9 | Loot still lying in town when the party leaves, or when the final flight begins, stays there: Chapter 7 counts "what came home". | — (the text answers it) |
| S10 | Out of Sight's "anyone in the same place": the Witch at the draper, past the same obstacle, counted (drill a2). | — (the text answers it) |
| S11 | "Item" means a list item (loot) throughout the book; furniture is "a piece", "taken" free and dropped "any time" (Chapter 4). So Chapter 3's pick-up action is for loot, and taking up a set-down piece again is "taking" it: free. | **w3** |
| S12 | Slipping free is rolled at a watched obstacle (the lock-up is "always watched"), so Mesmerise can open it (drill e6). | **w1** (PT8's w4) |
| S13 | Two items sharing a place are one location: one obstacle count, one pair of ways in, one Tell check, one number for the furniture's d6, and passing its last obstacle puts both in hand. A fourth item of a kind with three places rolls its d3 for the place it shares. | **w2** |
| S14 | The Storyteller picks the Cost that hurts most and never one that costs nothing right then; "drop an item" was barred whenever the roller held nothing but what the roll won (both items, in drill d). | — (the text answers it) |

---

## 5. Play log: main line (a rolled Standard town, 4 Entities)

Notation: trait die + second die = total vs Difficulty → result. "Shows" = the Monster die beat the trait die. Sus = Suspicion after the roll. Odds are Success / Cost / Trouble, exact from the book's dice. Charges are shown before → after.

**Plan.** Split four ways on Turn 1 ("on Standard and Hard it usually should"), each to the place it does best: the Witch to the silversmith (the back room, Wits d12 at 8, unwatched), the Creature to the smithy (Handyman: the shop floor's Sly d6 is a d8 there), the Invisible Man to the tailor (Tailor: the maze's Wits d10 is a d12 there; then the armour's shop floor with Sly d12), Jekyll & Hyde to the florist (Hyde's Nimble d10 for the rooftops, then back to Jekyll free for the guard dog with Charm d12). Then the draper (the Invisible Man's second Tailor location) with whoever is free.

**Turn 1 (Sus 0).** Moves. Every location is watched, so a Tell check at each first arrival:

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R77, R81 | the silversmith (Witch) | 5, then **Familiar's Warning**'s second d6: 6 | the cat doesn't warn her: A Black Cat stares at the silversmith's customers | 1 |
| R78 | the smithy (Creature) | 6 | Head and Shoulders: old Granny Mott (R82–R83: looking for a lost cat) looks up, and up | 2 |
| R79 | the tailor (Invisible Man) | 3 | — | 2 |
| R80 | the florist (Jekyll) | 1 | — | 2 |

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R84–R85 | Witch, silversmith way A (dark back room, Wits / Sly loud, 8, unwatched) | Wits d12, Mask (71 / 15 / 14) | 11 + 1 | 12 vs 8 | Success: **the tea service** (one obstacle) | 2 |
| 2 | R86–R87 | Creature, smithy way A (crowded shop floor, group, Sly, 6, unwatched) | Sly d6 → d8 (Handyman), Mask (79 / 15 / 6) | 8 + 3 | 11 vs 6 | Success (group: past for himself only) | 2 |
| 2 | R88–R89 | Invisible Man, tailor way B (maze of festival stalls, group, Wits, 6, watched) | Wits d10 → d12 (Tailor), Mask (86 / 10 / 4) | 2 + 4 | 6 vs 6 | Success: **the cape** (essential; one obstacle) | 2 |
| 2 | R90–R91 | Jekyll & Hyde, florist way A (the rooftops, group, Nimble, 8, unwatched) | **The Draught** (3 → 2): Hyde, Nimble d10, Mask (65 / 18 / 17); the gate would be Hyde's Brawn d12 at 10 (54 / 17 / 29) | 5 + 3 | 8 vs 8 | Success (past for himself) | 2 |
| 3 | R92–R93 | Jekyll & Hyde, florist (guard dog, Charm / Nimble loud, 6, **watched**) | Back to Jekyll before the roll, free (**Practised Hand**): Charm d12, Mask (86 / 10 / 4) | 5 + 5 | 10 vs 6 | **Critical**: "anywhere else you get back one spent charge, up to your starting number" (2 → 3). **The rose bushes** (essential) | 2 |
| 3 | R94–R95 | Creature, smithy (high garden wall, Nimble / Brawn loud, 8, **watched**) | Nimble d8 → d10 (Handyman), Mask (65 / 18 / 17; Brawn d12 the loud way: 71 / 15 / 14 and +1 every time; Mountain Stride can't open it, it lists Nimble) | 6 + 3 | 9 vs 8 | Success: **the hinges** | 2 |
| 3 | R96–R97 | Invisible Man, tailor furniture (crowded shop floor, group, Sly, 10, unwatched): the cape is in hand, so "whoever is past all its obstacles may take on the extra one" | Sly d12 (his Tailor raise can't lift a d12), Mask (54 / 17 / 29); unwatched, so Trouble costs only +1 | 1 + 2 | 3 vs 10 | Trouble (no chase; Out of Sight doesn't come into it: nobody is watching) | 3 |
| 3 | R98 | The Witch moves to the draper: Tell check (her Familiar's Warning would need a second d6) | | 3 | — | — | 3 |

Three Turns gone, Suspicion 3: both essentials and two of the three extras in hand, a Win already. The top hat and the armour would make it a Grand Year.

The draper's way in: the maze (group, Wits 10) would make everyone who wants past roll Wits at 10; the cart (Brawn 8, watched) stays beaten for the party once anyone beats it. The party takes the cart. The window after it (Nimble / Brawn loud, 8, watched) is no job for the Witch (Nimble d4; her Broomstick can't open it, it lists Nimble), so the Creature and Jekyll come over; the Witch waits for them rather than try the cart with Brawn d6 (42 / 31 / 28, caught on Trouble).

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 4 | R99–R100 | Invisible Man, the furniture's shop floor again | Sly d12, Mask | 4 + 2 | 6 vs 10 | Trouble (no chase) | 4 |
| 4 | — | The Creature and Jekyll move to the draper (already reached: no check). The Witch waits | | | | | 4 |
| 5 | R101–R102 | Creature, draper way B (cart blocking the alley, Brawn / Nimble loud, 8, **watched**) | Brawn d12, Mask (71 / 15 / 14) | 7 + 3 | 10 vs 8 | Success: beaten for the whole party | 4 |
| 5 | R103–R104 | Jekyll & Hyde, draper (shuttered window, Nimble / Brawn loud, 8, **watched**) | **The Draught** (3 → 2): Hyde, Nimble d10 → d12 by the Witch's **Hedge Spell** (3 → 2: "on any roll in the same place, hers or a friend's"), Mask (71 / 15 / 14) | 8 + 5 | 13 vs 8 | Success: **the top hat**. All five items in hand | 4 |
| 5 | R105–R106 | Invisible Man, the furniture's shop floor a third time | **Unseen** (3 → 2): Sly d12, Monster hidden (70 / 13 / 18) | 12 + 9 | 21 vs 10 | Success (no show: 9 is under 12). The suit of armour is his to take | 4 |
| 6 | R107 | The Witch, Hyde and the Creature move to the way out: Tell check ("the way out when anyone first comes back to it") | | 2 | — | — (Familiar's Warning not needed) | 4 |
| 6 | — | The Invisible Man **takes the armour** (Bulky, one carrier; "Taking a piece is free") and sets off: between places | | | | | 4 |
| 6 | — | End of the Turn: the armour, +1 | | | | | **5** |
| 7 | — | The Invisible Man acts first and finishes his carried move ("you're between places until you act in the second") | | | | | 5 |
| 7 | R108–R109 | Invisible Man, the way out (Sly / Nimble / Brawn loud, 8, watched; "one rolls for all") | A carrier "can't use the Mask": Sly d12, **Unseen** (2 → 1) hides the Monster (83 / 9 / 8). Out of Sight wouldn't save him here: he carries furniture, and everyone at the way out carries loot | 9 + 10 (shows, hidden) | 19 vs 8 | Success: **everyone out**, all they carry with them | 5 |

**How the Year Went: Grand Year.** All five items and the suit of armour; nobody left behind; no missing-kind lines. "A year of plenty. The new piece goes in the great hall, and everyone pretends it was always there." Out on **Turn 7** with five Turns to spare, at **Suspicion 5 of 11**. Charges: 5 spent of 12, one won back by the Critical (the Draught ×2, Hedge Spell, Unseen ×2; Jekyll's change back was free). The armour cost +1. No local chase, no capture: of the 13 rolls after the Tell checks, 2 were Trouble, both at the unwatched furniture obstacle. Suspicion came from two Tells (2), two unwatched Troubles (2) and the armour (1).

The main line never needed V21 (nobody was caught with loot, and the Invisible Man rolled his watched obstacle empty-handed), Mesmerise or a shared place; those are drilled in section 6. What it did put through the text: the d3 at five places (one reroll for a taken place), three second ways in rerolled for a repeated quiet trait, the ceiling, a Critical winning back a charge, Practised Hand, a friend's Hedge Spell, the furniture taken and carried, and the way out with a carrier rolling.

---

## 6. Play log: drills

Default picks unless said; I chose each drill's start, and every roll after it is real. The drills use the main line's town unless said.

### 6.1 Drill a: setting loot down before a watched roll (V21) with Out of Sight

**Start (chosen):** the main town, Turn 4, Suspicion 3. **The Invisible Man** (default: Unseen, Through the Gap, **Out of Sight**, Tailor; Flour, Soon), 3 charges, at the draper, holding **the cape**. A friend has beaten the cart (way B) and gone. Next is the shuttered window (Nimble / Brawn loud, 8, **watched**): Nimble d8 → d10 (Tailor), Mask (65 / 18 / 17). Out of Sight bites only on Trouble, so I restarted each case from this start until a Trouble came.

**a1: alone; he sets the cape down first.** Chapter 3: "A dropped item (drop yours any time) falls where you are; picking it up costs your next action." He drops the cape before the roll, at no cost (S4); it lies at the draper (S6).

| Try | Rolls | Dice | Total | Result |
|---|---|---|---|---|
| 1 | R110–R111 | 3 + 4 | 7 vs 8 | Cost. "Drop an item" would cost nothing: he carries nothing (the cape is on the floor, and the top hat is "what this roll wins"). The others all bite; "lose a Turn" would also push back the pick-up |
| 2 | R112–R113 | 9 + 4 | 13 | Success |
| 3 | R114–R115 | 9 + 5 | 14 | Success |
| 4 | R116–R117 | 6 + 6 | 12 | Critical (no spent charge to win back) |
| 5 | R118–R119 | 10 + 6 | 16 | Success |
| 6 | R120–R121 | 2 + 5 | 7 | Cost |
| 7 | R122–R123 | 6 + 6 | 12 | Critical |
| 8 | R124–R125 | 8 + 2 | 10 | Success |
| 9 | R126–R127 | 10 + 4 | 14 | Success |
| 10 | R128–R129 | 3 + 2 | **5 vs 8** | **Trouble**: Suspicion +1 (4). "Trouble gets you caught only while you or anyone in the same place carries loot or furniture": nobody at the draper carries anything, so **he is not caught** |

Played on from try 10: **Turn 5** (R130–R131), the window again with the cape still on the floor (there is no hurry to pick it up while watched rolls remain): 6 + 2 = 8 vs 8, **Success: the top hat**. **Turn 6**: he picks up the cape: that is his action (S5). **Turn 7**: he moves on with both. The trick cost one action and saved a local chase at mob 10. Read cleanly: the drop, the miss without a catch, and the pick-up for an action all come straight from the text. What the text doesn't settle is *when* the pick-up happens (at once, skipping the next action, or as the next action: finding m2) and *where* the cape lies (finding m1); nothing in the book threatens it while it lies there.

**a2: a friend in the same place still holds loot.** The same start, but the Witch stands at the draper holding the tea service and keeps it (she means to leave next Turn). He drops the cape and rolls:

| Try | Rolls | Dice | Total | Result |
|---|---|---|---|---|
| 1 | R132–R133 | 6 + 5 | 11 | Success |
| 2 | R134–R135 | 7 + 2 | 9 | Success |
| 3 | R136–R137 | 5 + 3 | 8 | Success |
| 4 | R138–R139 | 3 + 1 | **4 vs 8** | **Trouble**: Suspicion 4, and "anyone in the same place carries": the Witch's tea service gives him away. **Caught** (only the roller is caught) |

**His local chase** (Lead 1, escape at 4; mob 8 + 2 = **10**; he carries nothing now, so the Mask is open to him; Flour from round 3):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R140 = 5 festival parade (Charm, Sly) | Sly d12, **Unseen** (3 → 2): 70 / 13 / 18 against the Mask's 54 / 17 / 29; at Lead 1 a Trouble corners | 12 + 4 | 16 vs 10 | Success | 2 | 4 |
| 2 | R143 = 2 back alleys (Nimble, Sly) | Sly d12, **Unseen** (2 → 1) | 6 + 6 | 12 vs 10 | **Critical**: two Successes: **escaped** | 4 | 4 |

Back before the window, his Turn used up, the cape still on the floor. Read cleanly: "anyone in the same place" (PT8's m1 fix) decided it at once. Had the Witch set the tea service down too, he wouldn't have been caught, and each of them would then owe an action to pick their item up.

### 6.2 Drill b: a Ghost sets loot down to use Spectral; loot on the near side of an obstacle

**Start (chosen):** the main town, Turn 4, Suspicion 3. **A Ghost** (default: Through the Wall, Chill, **Spectral**, Butler; Cold Iron, Always), 3 charges, holding **the tea service** from the silversmith, moves to the tailor (already reached: no Tell check). The party's way in is way B, the maze (group, Wits 6, watched); behind it, the cape; behind the cape, the furniture's crowded shop floor (group, Sly 10) and the suit of armour. Nobody else is there. No rolls are needed: Spectral passes "without rolling, at no action, even in a Turn you move, unless you carry loot or furniture".

| Turn | What the Ghost does | Text | Holding |
|---|---|---|---|
| 4 | Moves in. **Drops the tea service** (free, S4): it falls "where you are", before the maze | Ch3, V21 | — |
| 4 | **Spectral** past the maze (group): the last obstacle, so the cape "is in your hand" | Ch2; Ch4 "beat or pass the last and it's in your hand" | the cape |
| 4 | **Drops the cape** (free): it falls where the Ghost now is, past the maze | Ch3 | — |
| 4 | **Spectral** past the furniture's shop floor (group): "whoever is past all its obstacles may take on the extra one, and the piece" | Ch2; Ch4 | — (the armour is its to take) |
| 5 | **Picks up the tea service**, which lies on the near side of the maze (S6: same place, so the side doesn't matter) | Ch3 "picking it up costs your next action" | the tea service |
| 6 | **Picks up the cape** (each item its own pick-up, S7) | Ch3 | the tea service, the cape |
| 7 | Takes the armour (free) and sets off for the way out | Ch4 | both, and the armour |

Without V21 the Ghost needed a friend to hold its loot (PT8 drill b2: alone with the bacon it had to roll, and was captured). Now it needs only actions: two items set down cost two pick-ups, against two group obstacles and two rolls saved. A friend standing by is still better: "hand it over free in the same place", and handed back free.

**The near side.** The tea service was dropped before the maze and the Ghost was past it when it came to pick it up. The book doesn't place anything inside a location: there are obstacles "crossed in order", "whoever is past all its obstacles", and "the same place (a location, the way out or the lock-up)" for helping and handing over. I ruled that "where you are" means the place, so anyone at the tailor, past the maze or not, may pick it up (S6). The other reading, that it lies before the maze, would send the Ghost back across a group obstacle it can only pass empty-handed, and the book has no rule for going back past an obstacle at all. Finding m1.

### 6.3 Drill c: setting loot down once caught, before the chase

"Drop yours any time" has no exception for a chase, and a capture takes only "what you were carrying". So I tried it.

**Start (chosen):** the main town. **The Witch** (default: Hedge Spell, Broomstick, Familiar's Warning, Cook; Rowan, Soon), holding **the tea service and the rose bushes** (an essential), has just been caught on a Trouble at the draper's cart (watched), Suspicion 8 after the catch (mob 8 + 4 = **12**), 1 charge. Before round 1 she **drops both** (S4, S8): they fall at the draper. Lead 1, escape at 4. I meant to run it until a capture came.

**c1** (R146–R160):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R146 = 2 back alleys | Sly d10 → d12 (**Hedge Spell**, 1 → 0; "in a local chase, only hers"), Monster (54 / 16 / 30) | 10 + 3 | 13 vs 12 | Success | 2 | 8 |
| 2 | R149 = 2 back alleys | Sly d10, Monster (45 / 19 / 36) | 7 + 1 | 8 vs 12 | Trouble | 1 | 9 |
| 3 | R152 = 6 dead end (Rowan) | Wits d12 → d10, Monster. Not an overdrawn Hedge Spell: its +2 would bring the Limit | 6 + 6 | 12 vs 12 | **Critical**: two Successes | 3 | 9 |
| 4 | R155 = 1 crowded square | Sly d10 → d8, Monster | 2 + 2 | 4 vs 12 | Trouble | 2 | 10 |
| 5 | R158 = 3 market stalls (Brawn d6 → d4, Nimble d4) | Brawn d4, Monster: every result either shows or is Trouble | 2 + 7 (shows) | 9 vs 12 | Trouble and a show: +2, **the Limit** (11) | 1 | 11 |

"If the Limit comes during a local chase, that chase ends at once and those Entities join the flight." Not captured. **The tea service and the roses stay on the draper's floor**: the party flees without them, and Chapter 7 counts only "what came home" (S9).

**c2** (restart; R161–R172): R161 = 1 crowded square, Sly d12 (Hedge Spell), Monster: 7 + 8 = 15, Success and a show (Lead 2, Sus 10). R164 = 4 rooftops, Wits d12, Mask: 9 + 1 = 10, Cost (Lead 2). R167 = 4 rooftops (Rowan), Wits d10, Mask: 10 + 3 = 13, Success (Lead 3). R170 = 2 back alleys, Sly d8, Mask: 5 + 4 = 9, Trouble: Lead 2 and **the Limit** again. A start at Suspicion 8 puts the Limit three points away, and both runs reached it first.

**c3** (a new start, the same but **Suspicion 4** after the catch, mob **10**, no charges; R173–R175): R173 = 4 rooftops: Wits d12, Monster (70 / 13 / 18 against the Mask's 54 / 17 / 29): **5 + 1 = 6 vs 10, Trouble: cornered** (Sus 5). **Captured**, and "the town takes back what you were carrying, furniture included": she carries nothing. The tea service and the rose bushes lie at the draper, where anyone there may pick them up for an action each (S6, S7). Without the drop she'd have lost both, an essential among them: at best a Partial.

So under V21 as written, dropping everything the moment you're caught makes a capture cost no loot, for an action per item later; and the same was already true of furniture ("drop it any time"), which a carrier can also put down to get the Mask and their full Nimble back for the chase. Finding **M1**.

### 6.4 Drill d: two items sharing a place (V22)

**Start (chosen):** a Standard list of five whose **kinds I chose** to force sharing: four cloth and costumes, then one food and drink. Every item, place and obstacle rolled.

**The list** (R176–R181): R176 = 3, odd: one essential. **A bolt of black velvet** · essential (R177 = 1), boots in a very large size (R178 = 6), a new cape (R179 = 4), a top hat (R180 = 3), a side of bacon (R181 = 2).

**Places** (the d3 as a d6 halved, rounding up; the first three cloth items rolled together, then the rerolls): the velvet R182 = 1 → 1, **the draper**; the boots R183 = 2 → 1, the draper, taken; the cape R184 = 5 → 3, **the hatter**; the boots again R185 = 6 → 3, the hatter, taken; again R186 = 3 → 2, **the tailor**. The top hat: cloth has three places and all three are taken, so "if a kind has more items than places, two may share a place (one location, guarding both)": R187 = 1 → 1, **the draper, with the velvet**. The bacon R188 = 3 → 2, **the butcher**.

So **four locations for five items**: 1 the draper (the velvet · essential, and the top hat), 2 the tailor (the boots), 3 the hatter (the cape), 4 the butcher (the bacon). Only the draper was built and played.

**The draper, one location** (R189–R200): **one** obstacle count (R189 = 6: one), **one** pair of ways in: way A the shopkeeper behind the counter (Charm / Sly loud, R191 = 5 → 8, R192 = 4: **watched**); way B a heavy cellar trapdoor (Brawn, R194 = 17 → 10, R195 = 10: not watched). **The furniture** (R196 = 1, a wingback armchair, Bulky): "number them and roll a d6, rerolling a number without one": four locations, numbered once each, so 1–4 and reroll 5–6: R197 = 1, **the draper**. Its obstacle: the shopkeeper behind the counter (R198 = 13; R199 = 10 → 8, +2 = **10**; R200 = 10: not watched).

**Play** (the Invisible Man and Jekyll, defaults; Suspicion 0):

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R201 | Both arrive at the draper: **one** Tell check for the one location | | 2 | — | — | 0 |
| 2 | R202–R203 | Jekyll, way A (shopkeeper, Charm / Sly loud, 8, watched) | Charm d12, Mask (71 / 15 / 14); the Invisible Man's Charm is a d6 (d8 with his Tailor raise) | 5 + 1 | 6 vs 8 | **Cost**: the last obstacle, so **both the velvet and the top hat** are in his hand. "'Drop an item' … never what this roll wins" covers both: he carries nothing else, so it's barred. Suspicion +1 at 0 of 11 and a lost Turn early are cheap; the furniture's shopkeeper at 10 is next: **his next roll's trait die one size smaller** | 0 |
| 3 | R204–R205 | Jekyll, the furniture's shopkeeper (Charm / Sly loud, 10, unwatched) | Charm d12 → d10 (the Cost); **Doctor's Bag** (3 → 2) raises it back ("a d12 raised and stepped down stays a d12"), Mask (54 / 17 / 29) | 2 + 1 | 3 vs 10 | Trouble (no chase) | 1 |
| 4 | R206–R207 | Jekyll, the shopkeeper again | Charm d12, Mask | 6 + 5 | 11 vs 10 | Success: the armchair is the party's to take | 1 |

Read cleanly: "(one location, guarding both)" gave one obstacle count, one pair of ways in, one Tell check and one number for the furniture's d6, and the one roll past the last obstacle put both items in hand. Two seams in the wording, neither of which stopped play: Chapter 8's step still opens "Locations: one for each item on the list", and Chapter 4 still defines a location as "guarding a list item; beat or pass the last and **it's** in your hand" (finding w2). A shared place is a real saving for the party: two items for one location's obstacles, Tell check and move.

### 6.5 Drill e: Mesmerise only at a watched obstacle

**Start (chosen):** the main town. **Dracula** (default: Mesmerise, Bat, Hypnotic Eyes, Butler; Garlic, Always), 3 charges unless said. Chapter 2 now: "open an approach with Charm **at a watched obstacle**"; Chapter 3: "if it doesn't list the ability's trait, roll that trait at 2 lower Difficulty".

| Case | Obstacle | Ruling | Roll | Dice | Total | Result |
|---|---|---|---|---|---|---|
| e1 | The smithy's crowded shop floor (group, Sly, 6, **unwatched**; the smithy itself is watched) | **Refused**: not a watched obstacle (PT8's M1 settled). He rolls Sly d6 with the Mask (72 / 19 / 8); Bat (Nimble d10 at 6) wasn't worth a charge | R208–R209 | 1 + 1 | 2 vs 6 | Trouble (doubles, not a Success): +1, no chase |
| e2 | The smithy's high garden wall (Nimble / Brawn loud, 8, **watched**). Start: Dracula past the shop floor | Allowed: **Mesmerise** (3 → 2), Charm d12 at **6**, Mask (86 / 10 / 4). Charm isn't listed, so it isn't loud | R210–R211 | 10 + 5 | 15 vs 6 | Success: **the hinges**. "Only you get through (others must beat it themselves)": the wall is not beaten for the party |
| e3 | The smithy's way B shopkeeper (Charm / Sly loud, 12, watched) | **Can't open**: it lists Charm. Plain Charm d12 at 12 (38 / 17 / 46). Not rolled | — | — | — | — |
| e4 | The silversmith's rickety drainpipe (Nimble, 10, **watched**); way A's back room is unwatched, so refused there | **Mesmerise** (2 → 1), Charm d12 at **8** (his Butler raise can't lift a d12), Mask (71 / 15 / 14) | R212–R213 | 8 + 1 | 9 vs 8 | Success: **the tea service** |
| e5 | The way out (Sly / Nimble / Brawn loud, 8, "always watched") | **Mesmerise** (1 → 0), Charm d12 at **6**, Mask (86 / 10 / 4) | R214–R215 | 1 + 5 | 6 vs 6 | Success: "the way out (**everyone leaves**)" |
| e6 | Captured, slipping free at the lock-up (Sly or Nimble, or Brawn loud, at 10), 1 charge | Allowed on my reading that slipping free is at a watched obstacle (S12; finding w1): **Mesmerise** (1 → 0), Charm d12 at **8**, Mask | R216–R217 | 3 + 5 | 8 vs 8 | Success: free ("Only a Success frees you"), "a captive may open its own way out" |

(e2's rolls were made in one batch with e1's, before e1's result was known; I kept them for e2, whose chosen start has Dracula past the shop floor.)

Read cleanly except e6: Mesmerise at a watched obstacle is now unambiguous at an obstacle, at the way out and at the rescue (which Chapter 6 calls "always watched"); for slipping free the book still doesn't say (PT8's w4, not changed). Reach in the main town: **5 of its 14 obstacles** (the watched ones that don't list Charm: the tailor's maze, the draper's cart and window, the smithy's wall, the silversmith's drainpipe; the florist's dog and the smithy's shopkeeper list Charm), plus the way out and the lock-up.

### 6.6 Drill f: opening an approach: "others must beat it themselves"; a rescue

Chapter 3: "Only you get through (others must beat it themselves), though the way out (everyone leaves) and a rescue work as usual, and a captive may open its own way out." The way out and a captive's own way out are drill e5 and e6.

**f1. Start (chosen):** the main town, Turn 2, Suspicion 2. The party takes the tailor's **way A**, the shuttered window (Nimble / Brawn loud, 10, unwatched). **A Ghost** (default; 3 charges) and **the Creature** (default; 3 charges) are there.

| Roll | Who | Choice | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|
| R218–R219 | Ghost, the window | **Through the Wall** (3 → 2): Sly isn't listed, Sly d10 at **8**, Mask (65 / 18 / 17) | 6 + 2 | 8 vs 8 | Success: the Ghost is through, and **the cape** is in its hand. The window is **not** beaten for the party | 2 |
| R220–R221 | Creature, the same window | He must beat it himself: Brawn d12 the loud way at 10, Mask (54 / 17 / 29, +1 whatever; Nimble d8 at 10 is 31 / 25 / 44) | 7 + 6 | 13 vs 10 | Success (loud +1): now it "stays beaten for the whole party" | 3 |

Then the Ghost hands the cape to the Creature ("hand it over free in the same place") and passes the furniture's shop floor (group) by Spectral: the armour is its to take, and as it's Bulky it needs no help. Had it been **Huge**, the second carrier would need to be past the window and the shop floor too, each by its own roll: PT8's m6 (a Huge piece behind an opened approach couldn't come out) is gone with the old "(and only you can carry a piece out that way)".

**f2. Start (chosen):** the main town, Turn 6, Suspicion 6. The Witch and Jekyll were captured together (one group check, one shared chase). **The Invisible Man** (default; 2 charges, empty-handed) moves to the lock-up: Tell check ("the lock-up does") R222 = 2, none. Turn 7, the rescue (Sly, or Brawn loud, 10, always watched): **Through the Gap** (2 → 1): Nimble isn't listed, Nimble d8 at **8**, Mask (56 / 23 / 21): R223–R224 **5 + 6 = 11 vs 8, Success**: "every captive there is free, at the lock-up, and acts again next Turn": both of them, though "only you get through".

Read cleanly, both. The parenthesis "(others must beat it themselves)" answers the question PT8's w2 and m6 raised.

### 6.7 Drill g: a castle upgrade's charge (campaign play)

**Start (chosen):** main line's Grand Year brought home the suit of armour: one **castle upgrade**. "In every later raid, each upgrade gives one Entity of the players' choice one extra charge (part of its starting number that raid)." The next raid is on a town the party hasn't seen, **Puddlecombe** (Easy, Chapter 9); the players give the charge to **the Invisible Man**: **4 charges, starting number 4**. Turn 2, Suspicion 0, at the market garden's way B, the muddy yard full of geese (Sly / Nimble loud, 6, unwatched). Each try he spends **Unseen** (4 → 3) and rolls Sly d12 with the hidden Monster (92 / 6 / 3). A Critical gets back "one spent charge, up to your starting number": I restarted until one came.

| Try | Rolls | Dice | Total | Result | Charges |
|---|---|---|---|---|---|
| 1 | R225–R226 | 6 + 5 | 11 vs 6 | Success | 3 |
| 2 | R227–R228 | 7 + 10 (shows, hidden) | 17 | Success | 3 |
| 3 | R229–R230 | 12 + 3 | 15 | Success | 3 |
| 4 | R231–R232 | 8 + 6 | 14 | Success | 3 |
| 5 | R233–R234 | 12 + 8 | 20 | Success | 3 |
| 6 | R235–R236 | **3 + 3** | 6 vs 6 | **Critical**: one spent charge back, up to 4 | **4** |

Read cleanly: the extra charge is part of the starting number, so the Critical restores it (under the old text a reader could stop him at 3). Not covered, and not needed here: whether two upgrades may go to the same Entity; "each upgrade gives one Entity of the players' choice" reads as yes.

### 6.8 The d3 (Chapter 1)

"(a d6 halved, rounding up, serves as the d3)": 1–2 → 1, 3–4 → 2, 5–6 → 3, the same bands as Chapter 2's random picks. Rolled thirteen times for places (main line R13–R18, drill d R182–R188): every result mapped without a question. Clean.

---

## 7. Findings (most severe first)

No blockers. Every change I was asked to verify read cleanly at the moment it mattered: Mesmerise at a watched obstacle (refused at an unwatched one; used at a wall, a drainpipe, the way out and the lock-up), Out of Sight's "anyone in the same place" both ways, an opened approach's "others must beat it themselves" (a friend rolled the window himself), the way out and a rescue opened for everyone, the d3 at thirteen places, the castle upgrade's charge restored by a Critical, and V22's shared place. V21 works as meant before a watched roll (drill a1) and for Spectral (drill b). What needs the author is at V21's edges: "drop yours any time" reaches into a chase (M1), and the sentence doesn't say where a dropped item lies or when its pick-up happens (m1, m2). Each finding is marked **wording** (the book already implies an answer, or the fix only says more clearly what it means) or **rules** (the fix would change a rule: needs the author's decision; no new numbers proposed).

### 7.1 Major

| id | Kind | Passage (quoted, chapter) | What happened / what I did | Suggested fix |
|---|---|---|---|---|
| M1 | rules | Ch3: "A dropped item (**drop yours any time**) falls where you are; picking it up costs your next action." · Ch6: "Cornered in a local chase, you are captured, and **the town takes back what you were carrying**, furniture included: it's gone for the night." · Ch4: "Taking a piece is free; **drop it any time**." | "Any time" includes the moment you're caught. Drill c: the Witch, caught holding the tea service and the rose bushes (an essential), dropped both before her chase's first round (S4, S8). c3: cornered in round 1 and captured, she lost nothing; both items lay at the draper for anyone there to pick up, an action each (S6). c1 and c2 ended at the Limit, and the dropped loot stayed in town (S9). So for one action per item a capture no longer costs loot, which Chapter 6 makes its main sting; the same already held for a piece ("drop it any time"), whose carrier also gets the Mask and full Nimble back for the chase by putting it down. The decisions log's reason for V21 is Spectral, Through the Wall and Out of Sight, and its simulation covers an Invisible Man dropping before watched rolls; dropping once caught isn't mentioned. | Needs the author's decision. Options: **(a)** "drop yours any time **you're not caught**" (and the same for a piece): recommended, the smallest change, and it keeps V21's purpose intact; (b) "the town also takes back anything you dropped where you were caught"; (c) keep it, and simulate captures that cost an action per item instead of the items. Then sync the simulator and Foundry. |

### 7.2 Minor

| id | Kind | Passage (quoted, chapter) | What happened / what I did | Suggested fix |
|---|---|---|---|---|
| m1 | wording | Ch3: "A dropped item (drop yours any time) **falls where you are**; picking it up costs **your** next action." · Ch3: "at the same place (a location, the way out or the lock-up)" · Ch4: "hand it over free in the same place" | The book places nothing inside a location but "obstacles, crossed in order" and "whoever is past all its obstacles". Drill b: a Ghost dropped the tea service before the tailor's maze, passed it by Spectral, and wanted it back from beyond. I ruled "where you are" is the place, so anyone there, past the maze or not, may pick it up (S6), as handing over already works across obstacles. Read as a spot before the maze, the Ghost would have to go back across a group obstacle it can pass only empty-handed, and the book has no rule for going back past an obstacle at all. Nor does it say whether "your next action" means only the dropper may pick it up (I read anyone there), or where an item dropped by a carrier between places lands. | "A dropped item … stays in that place (a location, the way out or the lock-up), and anyone there may pick it up, for their next action." |
| m2 | wording (rules if the other reading is meant) | Ch3: "picking it up **costs your next action**" · "lose a Turn (**you skip your next action**)" · Ch4: "Each Turn, every Entity takes one action: a roll at its location, a move, or waiting" | Two readings: picking up is the action you next take (S5: what I played, drill a1's cape on Turn 6), or you pick it up at once and skip your next action. They differ when it counts: under the second, an item picked up in Turn 12, or as the Limit comes, costs nothing because no next action follows, and the item is in hand for the flight; under the first it isn't. Also unsaid: whether each item needs its own pick-up (S7; drill b's Ghost picked up two items over two Turns) and that dropping is free (S4). | "Dropping your own is free, any time; picking one up is your action for a Turn." (Or, if the second reading is meant, say "you pick it up at once and skip your next action".) |

### 7.3 Wording

| id | Passage (quoted, chapter) | Issue | Suggested fix |
|---|---|---|---|
| w1 | Ch6: "Rescue: the lock-up is an obstacle — Sly, or Brawn the loud way, **always watched**" · "Slipping free: … at the lock-up Difficulty" · Ch2: Mesmerise "at a **watched obstacle**" · Ch3: "a captive may open its own way out" | PT8's w4, not changed, and sharper now that Mesmerise names "a watched obstacle": slipping free isn't called watched (its Trouble starts no chase), so whether a captive Dracula may Mesmerise his way out turns on a reading. I read yes (S12, drill e6: Charm d12 at 8, free). | "Slipping free: … at the lock-up Difficulty (**it's watched**)", or "(the lock-up is always watched, for slipping free too)". |
| w2 | Ch8: "Locations: **one for each item** on the list … two may share a place (one location, guarding both)." · Ch4: "A location: 1–3 obstacles, crossed in order, guarding **a list item**; beat or pass the last and **it's** in your hand." | V22's parenthesis settles it (drill d: four locations for five items, both items in hand on one Cost), but the step still opens "one for each item" and Chapter 4's definition still has one item and "it's". | Ch4: "guarding a list item (or two sharing a place, Chapter 8); beat or pass the last and it's in your hand (both, if two)". |
| w3 | Ch3: "A dropped item (drop yours any time) falls where you are; picking it up costs your next action." · Ch4: "Taking a piece is free; drop it any time." · Ch5: "Furniture taken, each Turn (even set down)" | With V21 the two "drop … any time" rules sit side by side and a reader may ask whether taking up a set-down piece costs an action like a dropped item. The book uses "item" for list items throughout, so I read a piece as free to take up again (S11). | Ch4: "Taking a piece is free (taking it up again too); drop it any time." |

**Counts: 0 blockers, 1 major, 2 minor, 3 wording** (6 in all). By kind: **1 rules** question for the author (M1) and **5 wording** (m1, m2, w1–w3; m2 becomes a rules question only if the second reading is meant).

---

## 8. PT8's findings: what the book now says

| PT8 id | Status | Quote now in the book (or why not) | Checked in PT9 |
|---|---|---|---|
| M1 Mesmerise: a watched obstacle or a watched location | **resolved** | Ch2: "Mesmerise (signature): open an approach with Charm **at a watched obstacle**." | Drill e: refused at the smithy's unwatched shop floor inside a watched location; used at a watched wall, drainpipe, the way out and the lock-up |
| m1 Out of Sight's "anyone with you" | **resolved** | Ch2: "Trouble gets you caught only while you or **anyone in the same place** carries loot or furniture" | Drill a: a2 caught by the Witch's tea service at the draper; a1 not caught, alone with the cape set down |
| m2 two items sharing a place: one location or two | **resolved** | Ch8: "two may share a place (**one location, guarding both**)" | Drill d: one obstacle count, one pair of ways in, one Tell check, both items on one roll, numbered once for the furniture. Chapter 4's one-item definition is this playtest's w2 |
| m3 can loot be set down at will | **resolved** (V21) | Ch3: "A dropped item (**drop yours any time**) falls where you are; picking it up costs your next action." | Drills a, b and c. Its edges are this playtest's M1, m1 and m2 |
| m4 the smaller-die Cost often costs nothing | **not changed** (by decision: "the Storyteller won't pick it then") | Ch3 unchanged | Picked once (drill d): Jekyll paid a charge (Doctor's Bag) to cancel it before a roll at 10, so it bit |
| m5 At the Table and Entity Sheet gaps | **not changed** (by decision: "At the Table stays one page") | The Entity Sheet's overdraw line is still "(once per flight)" without "from your own next roll"; the page has no line on dropping loot, helping a friend's roll or the way out's terms | Not drilled |
| m6 a Huge piece behind an opened approach | **resolved** | Ch3: "Only you get through (**others must beat it themselves**)": the old "(and only you can carry a piece out that way)" is gone, so a second carrier who beats the obstacles may help | Drill f1: the Creature beat the tailor's window himself after the Ghost opened it |
| w1 the d3 | **resolved** | Ch1: "and a d20 for the Storyteller (**a d6 halved, rounding up, serves as the d3**)" | Thirteen places rolled with it (main line, drill d) |
| w2 an opened way out and what it takes | **resolved** | Ch3: "though **the way out (everyone leaves)** and a rescue work as usual" | Drill e5 (Mesmerise at the way out); drill f2 (a rescue opened frees every captive) |
| w3 Chapter 4's "watched" and the furniture's obstacle | **not changed** | Ch4 still: "It's watched if any obstacle is, either way in." (Chapter 5's Tell check sets the furniture's obstacle aside) | Didn't come up: the main town's furniture obstacle was unwatched |
| w4 slipping free: watched? | **not changed** | Ch6 unchanged | Drill e6; logged again as w1 |
| w5 the campaign charge and the starting number | **resolved** | Ch7: "one extra charge (**part of its starting number that raid**)" | Drill g: a Critical took the Invisible Man from 3 back to 4 |

**PT8: 8 resolved, 0 partly, 4 not changed** (of 12): m4 and m5 by decision; w3 and w4 not taken up (w4 is this playtest's w1).

---

## 9. Balance and usability notes

### 9.1 Numbers from play

- **Main line:** **Grand Year**, out on **Turn 7** with five Turns to spare, at Suspicion 5 of 11. Suspicion at the end of each Turn: 2, 2, 3, 4, 4, 5 (out at 5). Sources: Tells 2 (of 6 checks; at the silversmith Familiar's Warning's second d6 also came up 4–6), Trouble 2 (both at the unwatched furniture obstacle), the armour 1. 13 rolls after the Tell checks: 11 Successes (one a Critical), 0 Costs, 2 Troubles. Charges 5 of 12 spent, one won back. No chase, no capture.
- **Local chases (drills):** 4, of 1–5 rounds (12 rounds): a2 escaped in round 2 on a Critical; c1 and c2 ended at the Limit (rounds 5 and 4); c3 cornered in round 1. No final flight was played.
- **V21 in use:** 6 set-downs (the cape in a1 and a2; the tea service and the cape in b; the tea service and the roses in c), 3 pick-ups played (a1's cape; b's two items), and one capture that took nothing (c3).
- **Opened approaches:** 6 (Mesmerise 4, Through the Wall 1, Through the Gap 1), all got through. With PT5–PT8's 30 and 1 Trouble, 36 and 1.
- **Costs:** none in the main line. In drills: the Cost that won two items (drill d: the smaller die, which Jekyll paid a charge to cancel), two in drill a1's restarts (where "drop an item" would have cost nothing: the cape was already down and the top hat was what the roll won), and one in chase c2.

### 9.2 Balance

- **Six main-line Grand Years in a row** (PT7's two, PT8's three, this one). One raid isn't a sample, and the simulator is the measure; but this rolled Standard town had every location watched, and the party still never met a chase: it split four ways, each Entity went where its Duty or its best die worked, and the only Troubles were at an unwatched obstacle. On the way out a carrier's Unseen made the roll 83 / 9 / 8.
- **V21** as simulated (an Invisible Man setting loot down before watched rolls) cost about what the decisions log says: one action per item, and in drill a1 it saved a chase at mob 10. Drill c's use, dropping once caught, is outside that simulation and changes what a capture costs (M1). Either way the Entity Sheet has no box for loot lying in town, so a table needs to note where it was put down.
- **V22** saves a party one location's obstacles, a Tell check and a move when it comes up; rare by the log's own figure.
- **Mesmerise** reached 5 of the main town's 14 obstacles, plus the way out and the lock-up: at the way out it made Standard's 8 a 6.

### 9.3 Using the book at the table

- **Chapter 8's tables** built the Standard town in 71 rolls without a question; the d3 needed no lookup beyond Chapter 1.
- **The At the Table page** carries nothing of V21: its Cost line lists "drop an item", but not that you may drop your own any time or what a pick-up costs. Drills a–c needed Chapter 3 every time (PT8's m5, decided).
- **The Entity Sheet's** "Carrying (loot)" box was the one that mattered for Out of Sight, Spectral and the drops; it has nowhere to note an item set down.

---

## 10. Roll appendix

236 rolls, R1–R236, each a fresh `node -e` `Math.random` roll; none unused. Place rolls show the d3 they give (a d6 halved, rounding up). The labels of R210–R217 name the drill e cases as section 6.5 numbers them (e2, e4, e5, e6); R210–R211 were rolled in one batch with e1's (section 6.5).

| Roll | What | Die | Result |
|---|---|---|---|
| R1 | Main: Lantern Night custom | d6 | 1 |
| R2 | Main: essentials (odd one, even two) | d6 | 6 |
| R3 | Main: item 1 kind | d6 | 6 |
| R4 | Main: item 1 item | d6 | 4 |
| R5 | Main: item 2 kind | d6 | 2 |
| R6 | Main: item 2 item | d6 | 3 |
| R7 | Main: item 3 kind | d6 | 6 |
| R8 | Main: item 3 item | d6 | 3 |
| R9 | Main: item 4 kind | d6 | 5 |
| R10 | Main: item 4 item | d6 | 3 |
| R11 | Main: item 5 kind | d6 | 4 |
| R12 | Main: item 5 item | d6 | 2 |
| R13 | Main: place for the cape (d6 halved, up = d3) | d6 | 3 (d3: 2) |
| R14 | Main: place for the rose bushes (d3 via d6) | d6 | 3 (d3: 2) |
| R15 | Main: place for the top hat (d3 via d6) | d6 | 4 (d3: 2) |
| R16 | Main: place for the hinges (d3 via d6) | d6 | 2 (d3: 1) |
| R17 | Main: place for the tea service (d3 via d6) | d6 | 2 (d3: 1) |
| R18 | Main: top hat place again (tailor taken; d3 via d6) | d6 | 1 (d3: 1) |
| R19 | Main: obstacles at the tailor | d20 | 6 |
| R20 | Main: obstacles at the florist | d20 | 11 |
| R21 | Main: obstacles at the draper | d20 | 9 |
| R22 | Main: obstacles at the smithy | d20 | 12 |
| R23 | Main: obstacles at the silversmith | d20 | 2 |
| R24 | Main: tailor way A obstacle | d20 | 6 |
| R25 | Main: tailor way A Difficulty | d20 | 18 |
| R26 | Main: tailor way A watched | d10 | 7 |
| R27 | Main: tailor way B obstacle | d20 | 20 |
| R28 | Main: tailor way B Difficulty | d20 | 2 |
| R29 | Main: tailor way B watched | d10 | 3 |
| R30 | Main: florist way A obstacle | d20 | 7 |
| R31 | Main: florist way A Difficulty | d20 | 13 |
| R32 | Main: florist way A watched | d10 | 7 |
| R33 | Main: florist way B obstacle | d20 | 4 |
| R34 | Main: florist way B Difficulty | d20 | 15 |
| R35 | Main: florist way B watched | d10 | 6 |
| R36 | Main: florist then obstacle | d20 | 14 |
| R37 | Main: florist then Difficulty | d20 | 3 |
| R38 | Main: florist then watched | d10 | 2 |
| R39 | Main: draper way A obstacle | d20 | 20 |
| R40 | Main: draper way A Difficulty | d20 | 17 |
| R41 | Main: draper way A watched | d10 | 7 |
| R42 | Main: draper way B obstacle | d20 | 18 |
| R43 | Main: draper way B Difficulty | d20 | 9 |
| R44 | Main: draper way B watched | d10 | 4 |
| R45 | Main: draper then obstacle | d20 | 6 |
| R46 | Main: draper then Difficulty | d20 | 5 |
| R47 | Main: draper then watched | d10 | 5 |
| R48 | Main: smithy way A obstacle | d20 | 11 |
| R49 | Main: smithy way A Difficulty | d20 | 1 |
| R50 | Main: smithy way A watched | d10 | 10 |
| R51 | Main: smithy way B obstacle | d20 | 13 |
| R52 | Main: smithy way B Difficulty | d20 | 20 |
| R53 | Main: smithy way B watched | d10 | 5 |
| R54 | Main: smithy then obstacle | d20 | 5 |
| R55 | Main: smithy then Difficulty | d20 | 8 |
| R56 | Main: smithy then watched | d10 | 1 |
| R57 | Main: silversmith way A obstacle | d20 | 18 |
| R58 | Main: silversmith way A Difficulty | d20 | 12 |
| R59 | Main: silversmith way A watched | d10 | 6 |
| R60 | Main: silversmith way B obstacle | d20 | 18 |
| R61 | Main: silversmith way B Difficulty | d20 | 19 |
| R62 | Main: silversmith way B watched | d10 | 4 |
| R63 | Main: draper way B obstacle again (Wits = way A's quiet way) | d20 | 20 |
| R64 | Main: silversmith way B obstacle again (Wits = way A's quiet way) | d20 | 8 |
| R65 | Main: draper way B obstacle again (Wits again) | d20 | 18 |
| R66 | Main: draper way B obstacle again (Wits again) | d20 | 3 |
| R67 | Main: furniture piece | d6 | 3 |
| R68 | Main: furniture location (1-5 list order, 6 reroll) | d6 | 1 |
| R69 | Main: furniture obstacle | d20 | 11 |
| R70 | Main: furniture obstacle Difficulty (then +2) | d20 | 6 |
| R71 | Main: furniture obstacle watched | d10 | 9 |
| R72 | Main: Entity 1 (d8, Chapter 2 order) | d8 | 7 |
| R73 | Main: Entity 2 | d8 | 7 |
| R74 | Main: Entity 3 | d8 | 8 |
| R75 | Main: Entity 4 | d8 | 5 |
| R76 | Main: Entity 4th (reroll 7 repeat; 5,7,8 in) | d8 | 2 |
| R77 | Main T1: Tell check silversmith (Witch) | d6 | 5 |
| R78 | Main T1: Tell check smithy (Creature) | d6 | 6 |
| R79 | Main T1: Tell check tailor (Invisible Man) | d6 | 3 |
| R80 | Main T1: Tell check florist (Jekyll) | d6 | 1 |
| R81 | Main T1: Familiar's Warning second d6 (Witch, silversmith) | d6 | 6 |
| R82 | Main T1: villager who (smithy Tell) | d6 | 6 |
| R83 | Main T1: villager doing (smithy Tell) | d6 | 1 |
| R84 | Main T2: Witch silversmith back room Wits | d12 | 11 |
| R85 | Main T2: Witch Mask | d6 | 1 |
| R86 | Main T2: Creature smithy shop floor Sly d6->d8 (Handyman) | d8 | 8 |
| R87 | Main T2: Creature Mask | d6 | 3 |
| R88 | Main T2: IM tailor maze Wits d10->d12 (Tailor) | d12 | 2 |
| R89 | Main T2: IM Mask | d6 | 4 |
| R90 | Main T2: Hyde (Draught) florist rooftops Nimble | d10 | 5 |
| R91 | Main T2: Hyde Mask | d6 | 3 |
| R92 | Main T3: Jekyll (back, Practised Hand) florist guard dog Charm | d12 | 5 |
| R93 | Main T3: Jekyll Mask | d6 | 5 |
| R94 | Main T3: Creature smithy garden wall Nimble d8->d10 (Handyman) | d10 | 6 |
| R95 | Main T3: Creature Mask | d6 | 3 |
| R96 | Main T3: IM tailor furniture shop floor Sly | d12 | 1 |
| R97 | Main T3: IM Mask | d6 | 2 |
| R98 | Main T3: Tell check draper (Witch arrives) | d6 | 3 |
| R99 | Main T4: IM tailor furniture shop floor Sly (again) | d12 | 4 |
| R100 | Main T4: IM Mask | d6 | 2 |
| R101 | Main T5: Creature draper way B cart Brawn | d12 | 7 |
| R102 | Main T5: Creature Mask | d6 | 3 |
| R103 | Main T5: Hyde (Draught) draper window Nimble d10->d12 (Witch's Hedge Spell) | d12 | 8 |
| R104 | Main T5: Hyde Mask | d6 | 5 |
| R105 | Main T5: IM tailor furniture shop floor Sly (Unseen) | d12 | 12 |
| R106 | Main T5: IM Monster (Unseen) | d10 | 9 |
| R107 | Main T6: Tell check way out (Witch, Hyde, Creature come back) | d6 | 2 |
| R108 | Main T7: IM way out Sly (carrying; Unseen) | d12 | 9 |
| R109 | Main T7: IM Monster (Unseen) | d10 | 10 |
| R110 | Drill a1 try 1: IM draper window Nimble d8->d10 (Tailor), cape dropped | d10 | 3 |
| R111 | Drill a1 try 1: IM Mask | d6 | 4 |
| R112 | Drill a1 try 2: IM draper window Nimble d8->d10 (Tailor), cape dropped | d10 | 9 |
| R113 | Drill a1 try 2: IM Mask | d6 | 4 |
| R114 | Drill a1 try 3: IM draper window Nimble d8->d10 (Tailor), cape dropped | d10 | 9 |
| R115 | Drill a1 try 3: IM Mask | d6 | 5 |
| R116 | Drill a1 try 4: IM draper window Nimble d8->d10 (Tailor), cape dropped | d10 | 6 |
| R117 | Drill a1 try 4: IM Mask | d6 | 6 |
| R118 | Drill a1 try 5: IM draper window Nimble d8->d10 (Tailor), cape dropped | d10 | 10 |
| R119 | Drill a1 try 5: IM Mask | d6 | 6 |
| R120 | Drill a1 try 6: IM draper window Nimble d8->d10 (Tailor), cape dropped | d10 | 2 |
| R121 | Drill a1 try 6: IM Mask | d6 | 5 |
| R122 | Drill a1 try 7: IM window Nimble d10, cape dropped | d10 | 6 |
| R123 | Drill a1 try 7: IM Mask | d6 | 6 |
| R124 | Drill a1 try 8: IM window Nimble d10, cape dropped | d10 | 8 |
| R125 | Drill a1 try 8: IM Mask | d6 | 2 |
| R126 | Drill a1 try 9: IM window Nimble d10, cape dropped | d10 | 10 |
| R127 | Drill a1 try 9: IM Mask | d6 | 4 |
| R128 | Drill a1 try 10: IM window Nimble d10, cape dropped | d10 | 3 |
| R129 | Drill a1 try 10: IM Mask | d6 | 2 |
| R130 | Drill a1 T5: IM window again Nimble d10 (cape still on the floor) | d10 | 6 |
| R131 | Drill a1 T5: IM Mask | d6 | 2 |
| R132 | Drill a2 try 1: IM window Nimble d10, cape dropped, Witch holds tea service | d10 | 6 |
| R133 | Drill a2 try 1: IM Mask | d6 | 5 |
| R134 | Drill a2 try 2: IM window Nimble d10, cape dropped, Witch holds tea service | d10 | 7 |
| R135 | Drill a2 try 2: IM Mask | d6 | 2 |
| R136 | Drill a2 try 3: IM window Nimble d10, cape dropped, Witch holds tea service | d10 | 5 |
| R137 | Drill a2 try 3: IM Mask | d6 | 3 |
| R138 | Drill a2 try 4: IM window Nimble d10, cape dropped, Witch holds tea service | d10 | 3 |
| R139 | Drill a2 try 4: IM Mask | d6 | 1 |
| R140 | Drill a2 chase r1 ground | d6 | 5 |
| R141 | Drill a2 chase r1: IM Sly (Unseen) | d12 | 12 |
| R142 | Drill a2 chase r1: IM Monster (Unseen) | d10 | 4 |
| R143 | Drill a2 chase r2 ground | d6 | 2 |
| R144 | Drill a2 chase r2: IM Sly (Unseen) | d12 | 6 |
| R145 | Drill a2 chase r2: IM Monster (Unseen) | d10 | 6 |
| R146 | Drill c1 chase r1 ground (Witch, mob 12) | d6 | 2 |
| R147 | Drill c1 chase r1: Witch Sly d10->d12 (Hedge Spell) | d12 | 10 |
| R148 | Drill c1 chase r1: Witch Monster | d10 | 3 |
| R149 | Drill c1 chase r2 ground | d6 | 2 |
| R150 | Drill c1 chase r2: Witch Sly | d10 | 7 |
| R151 | Drill c1 chase r2: Witch Monster | d10 | 1 |
| R152 | Drill c1 chase r3 ground | d6 | 6 |
| R153 | Drill c1 chase r3: Witch Wits d12->d10 (Rowan) | d10 | 6 |
| R154 | Drill c1 chase r3: Witch Monster | d10 | 6 |
| R155 | Drill c1 chase r4 ground | d6 | 1 |
| R156 | Drill c1 chase r4: Witch Sly d10->d8 (Rowan) | d8 | 2 |
| R157 | Drill c1 chase r4: Witch Monster | d10 | 2 |
| R158 | Drill c1 chase r5 ground | d6 | 3 |
| R159 | Drill c1 chase r5: Witch Brawn d6->d4 (Rowan) | d4 | 2 |
| R160 | Drill c1 chase r5: Witch Monster | d10 | 7 |
| R161 | Drill c2 (restart) chase r1 ground | d6 | 1 |
| R162 | Drill c2 chase r1: Witch Sly d10->d12 (Hedge Spell) | d12 | 7 |
| R163 | Drill c2 chase r1: Witch Monster | d10 | 8 |
| R164 | Drill c2 chase r2 ground | d6 | 4 |
| R165 | Drill c2 chase r2: Witch Wits | d12 | 9 |
| R166 | Drill c2 chase r2: Witch Mask | d6 | 1 |
| R167 | Drill c2 chase r3 ground | d6 | 4 |
| R168 | Drill c2 chase r3: Witch Wits d12->d10 (Rowan) | d10 | 10 |
| R169 | Drill c2 chase r3: Witch Mask | d6 | 3 |
| R170 | Drill c2 chase r4 ground | d6 | 2 |
| R171 | Drill c2 chase r4: Witch Sly d10->d8 (Rowan) | d8 | 5 |
| R172 | Drill c2 chase r4: Witch Mask | d6 | 4 |
| R173 | Drill c3 (new start, Sus 4, mob 10, 0 charges) chase r1 ground | d6 | 4 |
| R174 | Drill c3 chase r1: Witch Wits | d12 | 5 |
| R175 | Drill c3 chase r1: Witch Monster | d10 | 1 |
| R176 | Drill d: essentials (odd one, even two) | d6 | 3 |
| R177 | Drill d: item 1 (cloth chosen) item | d6 | 1 |
| R178 | Drill d: item 2 (cloth chosen) item | d6 | 6 |
| R179 | Drill d: item 3 (cloth chosen) item | d6 | 4 |
| R180 | Drill d: item 4 (cloth chosen) item | d6 | 3 |
| R181 | Drill d: item 5 (food chosen) item | d6 | 2 |
| R182 | Drill d: place velvet (d3 via d6) | d6 | 1 (d3: 1) |
| R183 | Drill d: place boots (d3 via d6) | d6 | 2 (d3: 1) |
| R184 | Drill d: place cape (d3 via d6) | d6 | 5 (d3: 3) |
| R185 | Drill d: place boots again (draper taken) | d6 | 6 (d3: 3) |
| R186 | Drill d: place boots again (hatter taken) | d6 | 3 (d3: 2) |
| R187 | Drill d: place top hat (all three taken: shares; d3 via d6) | d6 | 1 (d3: 1) |
| R188 | Drill d: place bacon (d3 via d6) | d6 | 3 (d3: 2) |
| R189 | Drill d: obstacles at the draper (shared) | d20 | 6 |
| R190 | Drill d: draper way A obstacle | d20 | 13 |
| R191 | Drill d: draper way A Difficulty | d20 | 5 |
| R192 | Drill d: draper way A watched | d10 | 4 |
| R193 | Drill d: draper way B obstacle | d20 | 1 |
| R194 | Drill d: draper way B Difficulty | d20 | 17 |
| R195 | Drill d: draper way B watched | d10 | 10 |
| R196 | Drill d: furniture piece | d6 | 1 |
| R197 | Drill d: furniture location (1 draper, 2 tailor, 3 hatter, 4 butcher; 5-6 reroll) | d6 | 1 |
| R198 | Drill d: draper furniture obstacle | d20 | 13 |
| R199 | Drill d: draper furniture Difficulty (then +2) | d20 | 10 |
| R200 | Drill d: draper furniture watched | d10 | 10 |
| R201 | Drill d T1: Tell check draper (IM, Jekyll arrive) | d6 | 2 |
| R202 | Drill d T2: Jekyll draper way A shopkeeper Charm | d12 | 5 |
| R203 | Drill d T2: Jekyll Mask | d6 | 1 |
| R204 | Drill d T3: Jekyll draper furniture shopkeeper Charm d12 (Cost step down, Doctor's Bag raise: d12) | d12 | 2 |
| R205 | Drill d T3: Jekyll Mask | d6 | 1 |
| R206 | Drill d T4: Jekyll draper furniture shopkeeper Charm | d12 | 6 |
| R207 | Drill d T4: Jekyll Mask | d6 | 5 |
| R208 | Drill e1: Dracula smithy shop floor (unwatched; Mesmerise refused) Sly | d6 | 1 |
| R209 | Drill e1: Dracula Mask | d6 | 1 |
| R210 | Drill e2: Dracula smithy garden wall (watched) Mesmerise Charm at 6 | d12 | 10 |
| R211 | Drill e2: Dracula Mask | d6 | 5 |
| R212 | Drill e4: Dracula silversmith drainpipe (watched) Mesmerise Charm at 8 | d12 | 8 |
| R213 | Drill e4: Dracula Mask | d6 | 1 |
| R214 | Drill e5: Dracula way out Mesmerise Charm at 6 | d12 | 1 |
| R215 | Drill e5: Dracula Mask | d6 | 5 |
| R216 | Drill e6: Dracula slipping free Mesmerise Charm at 8 | d12 | 3 |
| R217 | Drill e6: Dracula Mask | d6 | 5 |
| R218 | Drill f1 T2: Ghost tailor window Through the Wall Sly at 8 | d10 | 6 |
| R219 | Drill f1 T2: Ghost Mask | d6 | 2 |
| R220 | Drill f1 T2: Creature tailor window Brawn loud at 10 | d12 | 7 |
| R221 | Drill f1 T2: Creature Mask | d6 | 6 |
| R222 | Drill f2 T6: Tell check lock-up (IM arrives) | d6 | 2 |
| R223 | Drill f2 T7: IM rescue Through the Gap Nimble d8 at 8 | d8 | 5 |
| R224 | Drill f2 T7: IM Mask | d6 | 6 |
| R225 | Drill g try 1: IM Puddlecombe geese Sly (Unseen, 4->3 charges) | d12 | 6 |
| R226 | Drill g try 1: IM Monster (Unseen) | d10 | 5 |
| R227 | Drill g try 2: IM Puddlecombe geese Sly (Unseen, 4->3 charges) | d12 | 7 |
| R228 | Drill g try 2: IM Monster (Unseen) | d10 | 10 |
| R229 | Drill g try 3: IM Puddlecombe geese Sly (Unseen, 4->3 charges) | d12 | 12 |
| R230 | Drill g try 3: IM Monster (Unseen) | d10 | 3 |
| R231 | Drill g try 4: IM Puddlecombe geese Sly (Unseen, 4->3 charges) | d12 | 8 |
| R232 | Drill g try 4: IM Monster (Unseen) | d10 | 6 |
| R233 | Drill g try 5: IM Puddlecombe geese Sly (Unseen, 4->3 charges) | d12 | 12 |
| R234 | Drill g try 5: IM Monster (Unseen) | d10 | 8 |
| R235 | Drill g try 6: IM Puddlecombe geese Sly (Unseen, 4->3 charges) | d12 | 3 |
| R236 | Drill g try 6: IM Monster (Unseen) | d10 | 3 |
