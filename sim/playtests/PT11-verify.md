# PT11: Verification playtest after the PT10 fix round (V26, V27 and the Chapter 6 wording; drills a–b)

## 1. What this is

A very short, drills-only verification of PT10's fix round (commit a56e0cc). The text under test:

- **Ch3:** "A dropped item stays where you are (the location, the way out or the lock-up; **between places, the one you left**); drop yours any time but in a local chase. **Anyone there but a captive may pick up any number of items**, as their action for a Turn."
- **Ch4 (V26):** "Taking a piece is free (**taking it back up is an action**); drop it any time but in a local chase."
- **Ch6, the local chase:** "When you are caught during the raid, you run, **and you can't drop anything until the chase ends**."
- **Ch6, the final flight (V27):** "every Entity who isn't captured flees together; **anything dropped in the flight is left in town**."

It also checks PT10's six findings against the book's text now (section 6).

**Rules source:** only the rulebook text, `book/src/chapters/*.html`, read as text (at a7ce6df; the chapters are unchanged since a56e0cc). I didn't use the simulator, `docs/` or the Foundry code as a source. The fix commit and the decisions log were read only to see what was decided about PT10's findings. Where the book is silent I made a ruling, said so in the log, and logged it as a finding (section 5).

**Dice:** every random result is a real `node -e` `Math.random` roll, numbered R1–R71 and listed in section 7. Each drill says exactly what I chose at its start, and every roll after that is real. Drill b needed a Trouble, so I restarted it from the same start until the dice gave one (3 restarts, all rolls listed). The players played to win, and the Storyteller followed Chapter 3 and Chapter 8.

**Town:** Thistlewick (Chapter 9: Standard, Suspicion Limit 11, the way out 8, the lock-up 10, final flight mob 11, escape at Lead 5). Entities use their default picks.

---

## 2. Summary

| Drill | What it puts through the text | Result | Suspicion |
|---|---|---|---|
| **a**: the piece | The Werewolf carries the gilt mirror (Bulky). He sets it down between places and takes it back up as his action. Later he sets it down before a roll, rolls with the Mask, and takes it back up as his next action. The Limit comes with the mirror carried, and he drops it in the final flight | Between places, the mirror stayed at the hatter. He took it back up as his Turn 6 action and the move was lost (my ruling: **m1**). The wall: Nimble d12 and the Mask, a Success. Taking the mirror back up cost his Turn 10 action. The Limit came from the mirror's own noise at the end of Turn 11, with him between places. He dropped it at Lead 1 and it was left in town. Escaped in round 8: a **Win**, no Grand Year | 4 → 11 |
| **b**: drops, pick-ups, captives | Dracula, carrying the tea service and the turnip seed, is caught in a group check. His drop and his hand-over are both refused, and he is captured. The Witch sets her two items down at the lock-up, where the captives can't pick them up. She rescues them, and the freed Mummy picks up both in one action | Caught on the 4th try and captured in round 1, so the town took both items. Dracula's Mesmerise slip was Trouble. The Witch's rescue was a Success, and the Mummy picked up both items on Turn 11 | 5 → 8 |

**What was verified and where**

| Text | Where | Rolls | Read cleanly? |
|---|---|---|---|
| Ch3: "between places, the one you left" | a, Turn 6 | none | Where the dropped thing stays: yes, but only by treating the piece as an "item" (**w1**). Where the carrier itself is: **m1** |
| Ch4: "Taking a piece is free (taking it back up is an action)" | a, Turns 5, 6 and 10 | R1–R4 | Yes. Two carriers of a Huge piece (read, not played): **w4** |
| Ch4: "Carriers can't use the Mask; their Nimble is one size smaller" (with the piece set down) | a, Turn 9 | R1–R2 | Yes |
| Ch6: "anything dropped in the flight is left in town" | a, flight round 2 | R7–R46 | Yes |
| Ch6: "you run, and you can't drop anything until the chase ends" | b, try 4 | R59–R65 | Yes for dropping. Handing over: **m2** |
| Ch3: "A dropped item stays where you are (… the lock-up …)" | b, Turn 10 | none | Yes |
| Ch3: "Anyone there but a captive may pick up any number of items, as their action for a Turn" | b, Turn 10 (refused) and Turn 11 (two items in one action) | R66–R71 | Yes. Handing loot to a captive: **w2**. Ch4's list of actions: **w3** |

**Counts: 0 blockers, 0 major, 2 minor, 4 wording** (6 in all, section 5). Both minors are **rules** questions for the author: where a carrier is after setting its piece down between places (m1), and handing loot over once caught (m2).

**PT10's 6 findings: 3 resolved, 2 partly, 1 not changed (w4, declined by decision)** (section 6).

**Chases:** 1 local chase (b: 1 round, captured) and 1 final flight (a: 8 rounds, escaped). 71 rolls in all.

---

## 3. Drill a: the piece between places, before a roll, and in the final flight

Notation: trait die + second die = total vs Difficulty → result. "Shows" means the Monster die beat the trait die. Odds are Success / Cost / Trouble, worked out exactly from the book's dice.

**Start (chosen):** Thistlewick, start of **Turn 5**, Suspicion **4**. A party of two:
- **The Werewolf** (Good Dog, Keen Nose, Night Runner, Gardener; Hounds, Soon), **2 charges**, is at **the hatter**. He is past the nosy neighbour (way A, beaten on Turn 3) and the guard dog (the furniture's obstacle, beaten on Turn 4). He carries **the top hat**. The gilt mirror (Bulky) stands there, not yet taken.
- **The Witch** (Hedge Spell, Broomstick, Familiar's Warning, Cook; Rowan, Soon), **2 charges**, carries **the wedding cake** and **the tea service** (both essentials). She has been at **the ironmonger** since Turn 4, where its Tell check was made. The party's way in there is way B, the high garden wall (Nimble 8, not watched; Brawn loud), which isn't beaten yet. She waits for the Werewolf: with Nimble d4 the wall is a poor bet for her, and she keeps her charges for the strongbox and the flight.
- **Not in hand:** the rope (behind the wall, then the strongbox: watched, Wits 8 / Charm loud) and the turnip seed.

| Turn | Rolls | The Werewolf | The Witch | Sus at the end |
|---|---|---|---|---|
| 5 | none | **Takes the mirror** ("Taking a piece is free") and starts a carried move to the ironmonger as his action. "Carrying, a move takes two Turns: you're between places until you act in the second" | Waits | 4 + 1 (the mirror) = **5** |
| 6 | none | **Sets the mirror down between places** before acting ("drop it any time but in a local chase"). It stays at **the hatter**, "the one you left": Ch3 says this of a dropped *item*, and I applied it to the piece (**w1**). Then, as his action, he **takes it back up** ("taking it back up is an action"). My ruling (**m1**): until he acts in the second Turn he is still between places and counts as at the place he left, so he can reach the mirror. Taking it up is that action, so he ends Turn 6 at the hatter, carrying it, with the move undone | Waits | **6** |
| 7 | none | Starts the carried move again | Waits | **7** |
| 8 | none | Acts in the second Turn and arrives at the ironmonger (no Tell check: the Witch reached it on Turn 4) | Waits | **8** |
| 9 | R1–R2 | **Sets the mirror down** (free). He's no longer a carrier, so he rolls the wall with **Nimble d12 and the Mask** (71 / 15 / 14). Carrying, it would have been Nimble d10 with the Monster forced (79 / 11 / 10, shows 45%). **6 + 2 = 8 vs 8: Success**, and the wall is beaten for the party | Waits | 8, then the mirror +1 "even set down": **9** |
| 10 | R3–R4 | **Takes the mirror back up as his action**: the Mask roll on Turn 9 cost him this Turn | The strongbox: Wits d12 + Mask (71 / 15 / 14): **11 + 1 = 12 vs 8: Success**. **The rope** is hers | **10** |
| 11 | R5–R6 | Starts a carried move to the way out (between places) | Arrives at the way out. Tell check ("the way out when anyone first comes back to it"): **R5 = 6**, but Familiar's Warning's second d6 **R6 = 2**, so no Tell | 10 + 1 (the mirror) = **11: the Limit** |

**Chosen at the end of Turn 10 (the drill's point):** the party keeps the mirror and goes for a Grand Year. In hand are both essentials, the top hat and the rope; only the turnip seed is missing, so a Win is on and the mirror would make it a Grand Year. Abandoning the mirror ("free: it stays put, goes quiet") would have kept Suspicion at 10 and given the way out a try on Turn 12. The mirror's noise brings the Limit at the end of Turn 11, while the Werewolf is between places and carrying. Chapter 6: "every Entity who isn't captured flees together", and being between places doesn't change that.

**The final flight:** Lead 2, escape at 5, mob 11, the Mask off. Hounds and Rowan come from round 3. **The policy was fixed before the first roll:** the Werewolf keeps the mirror while the Lead is 2 or more, and drops it before the next round if the Lead falls to 1.

| Round | Ground | The Werewolf | The Witch | Successes / Trouble | Lead |
|---|---|---|---|---|---|
| 1 | R7 = 1, the crowded square (Sly, Charm) | **Keen Nose** (2 → 1): Wits d8, raised by the Witch's **Hedge Spell** (2 → 1) to d10, + Monster (55 / 17 / 28): 5 + 5 = 10, **Cost** (doubles, but no Success) | Sly d10 + Monster (55 / 17 / 28): 4 + 4 = 8, **Trouble** | 0 / 1: −1 | **1** |
| — | — | **Drops the mirror** (Lead 1, as the policy says). Ch6: "anything dropped in the flight is left in town". The Witch can't take it up, and the Grand Year is gone | — | — | 1 |
| 2 | R12 = 5, the festival parade (Charm, Sly) | Keen Nose (1 → 0) + Hedge Spell (1 → 0): Wits d10 + Monster (55 / 17 / 28): 5 + 10 = 15, **Success**. No Nimble here, so the drop didn't help this round | Sly d10 + Monster: 10 + 9 = 19, **Success** | 2 / 0: +2 | **3** |
| 3 | R17 = 4, over the rooftops (Nimble, Wits) | **Nimble d12 → d10** (Hounds; still carrying, it would have been d8) + Monster (55 / 17 / 28; carrying, 45 / 20 / 35): 2 + 6 = 8, **Trouble** | Wits d12 → d10 (Rowan) + Monster: 10 + 9 = 19, **Success** | 1 / 1 | 3 |
| 4 | R22 = 3, the market stalls (Brawn, Nimble) | Nimble d10 + Monster: 6 + 5 = 11, **Success** | Brawn d6 → d4 (Nimble d4 can't go lower) + Monster (25 / 20 / 55): 2 + 5 = 7, **Trouble** | 1 / 1 | 3 |
| 5 | R27 = 3, the market stalls | Nimble d10 + Monster: 1 + 9 = 10, **Cost** | d4 + Monster: 2 + 1 = 3, **Trouble** | 0 / 1: −1 | **2** |
| 6 | R32 = 4, over the rooftops | Nimble d10 + Monster: 4 + 7 = 11, **Success** | Wits d10 + Monster: 9 + 3 = 12, **Success** | 2 / 0: +2 | **4** |
| 7 | R37 = 5, the festival parade | Sly d6 → d4 + Monster (25 / 20 / 55): 2 + 4 = 6, **Trouble** | Sly d10 → d8 + Monster (45 / 20 / 35): 7 + 9 = 16, **Success** | 1 / 1 | 4 |
| 8 | R42 = 6, a dead end (Brawn, Wits) | Brawn d10 → d8 + Monster (45 / 20 / 35): 7 + 10 = 17, **Success** | Wits d10 + Monster: 4 + 6 = 10, **Cost** | 1 / 0: +1 | **5: escaped** |

Both had no charges from round 3, and with their Weakness in play they couldn't overdraw ("while your Weakness is in play, however it came, you can't overdraw"). They got home with the cake, the tea service, the top hat and the rope: a **Win**. The mirror stayed in town. The drop paid off in four Nimble rounds (3–6), each at 55% for a Success instead of 45%.

**What a showed.** V26 reads cleanly. Taking the piece the first time was free (Turn 5). Each time it was taken back up, it cost that Turn's action (Turns 6 and 10). The Mask roll with the piece set down (Turn 9) cost the carrier Turn 10's action, and with it the way out before dawn: the trade-off PT10's m2 asked for. V27's flight half reads cleanly: dropped in the flight, the mirror was left in town and nobody could take it up. Two gaps, both around Turn 6. The between-places clause is worded for an "item", yet only a piece's carrier is ever between places (**w1**). And the book doesn't say where the carrier itself is after the set-down, or whether its move goes on (**m1**).

---

## 4. Drill b: caught carrying two items; a captive with loot lying at the lock-up; one pick-up for two items

**Start (chosen):** Thistlewick, start of **Turn 8**, Suspicion **5**. A party of three:
- **The Witch** (1 charge) carries **the top hat** and **the coil of rope**.
- **Dracula** (Mesmerise, Bat, Hypnotic Eyes, Butler; Garlic, Always), **2 charges**, carries **the tea service** and **the turnip seed**.
- Both have been at **the baker** since Turn 7, where its Tell check was made (nothing). Next is the crowded shop floor (way A: group, watched, Sly 8), then the shopkeeper.
- **The Mummy** (Ancient Lore, Royal Bearing, Patience of Ages, Librarian), 1 charge, was captured on Turn 7 and is held at the lock-up. She carried nothing. Nobody has reached the lock-up yet, and a captive being brought in doesn't count for Tells.
- **The roll:** the shop floor is group, so each of them rolls for itself, together ("all declare their dice and abilities, then roll together"). **The Witch:** Sly d10 → d12 (Cook: the baker is food and drink) + Mask (71 / 15 / 14). **Dracula:** **Bat** (2 → 1), Nimble d10 instead of Sly, + Mask (65 / 18 / 17).
- **Chosen:** they don't pool their loot first. Both are at about the same risk, so splitting the loot is a hedge.
- I restarted from this start until someone got Trouble.

| Try | Rolls | The Witch | Dracula | Outcome |
|---|---|---|---|---|
| 1 | R47–R50 | 6 + 6 = 12, Success (a Critical) | 3 + 6 = 9, Success | No Trouble: restart |
| 2 | R51–R54 | 8 + 5 = 13, Success | 4 + 3 = 7, Cost | No Trouble: restart |
| 3 | R55–R58 | 9 + 2 = 11, Success | 7 + 6 = 13, Success | No Trouble: restart |
| 4 | R59–R62 | 5 + 3 = 8, **Success** | 3 + 1 = 4, **Trouble** | Dracula is caught. One roll, one rise: Sus **6** |

**On being caught.** Dracula asks to set down the tea service and the turnip seed so a capture can't take them. **Refused**, Ch6: "When you are caught during the raid, you run, **and you can't drop anything until the chase ends**." This covers the moment of the catch on its own; there's no need to read Chapter 5 alongside it, as PT10's w1 did. He then asks to **hand both to the Witch**, who passed and is in the same place (Ch4: "Loot has no limit; hand it over free in the same place"). The book is silent, because handing over isn't dropping. **My ruling: refused.** "You run" means the chase starts at once, and the sentence is there so that a capture takes what you carry (**m2**).

**The local chase:** Lead 1, escape at 4, mob 8 + 3 = **11**. Garlic is Always, so his traits are one size smaller from round 1.

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R63 = 1, the crowded square (Sly, Charm) | Charm d12 → d10 (Garlic). At Lead 1 any Trouble corners him, so he takes the Monster under **Hypnotic Eyes** (55 / 17 / 28, shows 36%) over the Mask (35 / 20 / 45) | 1 + 1 | 2 vs 11 | Trouble (doubles, but no Success; a tie, so nothing shows): **cornered** | 0 | **7** |

**Captured.** "The town takes back what you were carrying, furniture included: it's gone for the night." **The tea service (an essential) and the turnip seed are gone**, and Dracula is held at the lock-up. The refusals made the capture cost what Chapter 6 says. The Mummy waits this Turn because a rescue is coming. A slip with Sly d6 and the Mask would be 17 / 25 / 58, and 58% of the time it would raise Suspicion by 1 for nothing.

| Turn | Rolls | What happens | Sus |
|---|---|---|---|
| 9 | R66–R67 | **The Witch moves to the lock-up** ("Getting there is a move"). Tell check ("the lock-up does"): **R66 = 3**, none. R67, Familiar's Warning's second d6, was rolled with it and wasn't needed | 7 |
| 9 | R68–R69 | **Dracula tries to slip free** with **Mesmerise** (1 → 0; "a captive may open its own way out"; the lock-up is "always watched"): Charm d12 at 10 − 2 = 8, + Mask (71 / 15 / 14). **2 + 1 = 3: Trouble**. "Suspicion rises but no chase starts" | **8** |
| 10 | none | **The Witch sets the top hat and the rope down** at the lock-up (free), as insurance in case she is caught and captured: "A dropped item stays where you are (… the lock-up …)". **A captive with loot lying there:** the Mummy asks to pick both up, so that she has them once freed. **Refused**: "Anyone there **but a captive** may pick up". The Witch then asks to **hand** them to Dracula instead. The book is silent, and **my ruling is refused** (**w2**) | 8 |
| 10 | R70–R71 | **The rescue** ("Sly, or Brawn the loud way, always watched", 10): Sly d10 → d12 (**Hedge Spell**, 1 → 0). At Suspicion 8 a Trouble here could lose all three, so she takes the Monster (70 / 13 / 18, shows 38%) over the Mask (54 / 17 / 29). **9 + 7 = 16 vs 10: Success** (7 doesn't beat 9, so nothing shows). "Every captive there is free, at the lock-up, and acts again next Turn". So no one picks anything up this Turn: the Witch has used her action, and the two freed Entities act next Turn | 8 |
| 11 | none | **The Mummy picks up the top hat and the rope**, both in one action ("any number of items, as their action for a Turn"). The Witch and Dracula are free to do other things | 8 |

**What b showed.** All four parts of the text read cleanly. No dropping from the moment of the catch. A dropped item stays at the lock-up. A captive can't pick it up. A freed Entity picks up two items in one action, and only from the next Turn. Two neighbouring verbs are left open: **handing over** once caught (m2) and handing to a captive (w2). Also, Chapter 4's list of what a Turn's action can be has no pick-up in it (w3).

---

## 5. Findings (most severe first)

No blockers, no majors. Each finding is marked **rules** (the fix would change or add a rule, so it needs the author's decision; no new numbers proposed) or **wording** (the book already implies an answer).

### 5.1 Minor

| id | Kind | Passage (quoted, chapter) | What happened / what I did | Suggested fix |
|---|---|---|---|---|
| m1 | rules | Ch4: "Carrying, a move takes two Turns: **you're between places until you act in the second**." · Ch3: "A dropped item stays where you are (…; **between places, the one you left**)" · Ch4: "Taking a piece is free (**taking it back up is an action**)" | Drill a, Turn 6. The Werewolf set the mirror down mid-move. The book says where the mirror stays, but not where he is, or what happens to his move. I ruled that he stays between places, counting as at the place he left, until he acts. Taking the mirror back up was that action, so he was back at the hatter and the move was lost. Two other readings change the Turn count: **(b)** his next action finishes the move and he arrives without the mirror; **(c)** with nothing to carry, a move takes one Turn, he has spent it, and he arrives the moment he sets the mirror down. Reading (c) would make a mid-move drop save a Turn | Needs the author's decision. **(a)** In Ch4, after "until you act in the second", add: "(till then you count as at the place you left: set the piece down, and that action either finishes the move without it or takes it back up)". Recommended: it matches Ch3's "the one you left", there's nothing new to track, and a mid-move drop never saves a Turn. **(b)** "Set it down between places and you arrive when you next act, without it." Either way, rule out (c). Then sync the simulator and Foundry |
| m2 | rules | Ch6: "When you are caught during the raid, you run, and **you can't drop anything** until the chase ends." · Ch4: "Loot has no limit; **hand it over free in the same place**." | Drill b, try 4. Dracula, caught in a group check the Witch passed, asked to hand both his items to her so a capture couldn't take them. Handing over isn't dropping, so on its face it's allowed. In any group check, a caught Entity could then pass its loot to one who wasn't caught, which is the escape that PT9's M1 and V24 closed for dropping. I ruled it refused, and the capture took both items | Needs the author's decision. **(a)** Ch6: "you run, and you can't drop **or hand over** anything until the chase ends". Recommended: it does what V24 set out to do. **(b)** Allow it and say so; that weakens captures in group checks |

### 5.2 Wording

| id | Passage (quoted, chapter) | Issue | Suggested fix |
|---|---|---|---|
| w1 | Ch3: "**A dropped item** stays where you are (…; between places, the one you left) … Anyone there but a captive may pick up any number of **items**" · Ch4: "Taking a piece is free (taking it back up is an action); drop it any time but in a local chase." | The book uses "item" only for list items ("4 items on Easy", "a list item"); furniture is always "a piece". Only a piece's carrier is ever between places, since moves take two Turns only when carrying. Yet the between-places clause, and the rule on who may pick things up, name items only. Drill a: I applied both to the mirror by analogy. Ch4 doesn't say where a dropped piece stays, or who may take it back up (anyone there? a captive?) | Ch3: "A dropped item **or piece** stays where you are …". Ch4: "(taking it back up is an action, **for anyone there but a captive**)" |
| w2 | Ch3: "Anyone there **but a captive** may pick up" · Ch4: "**hand it over free in the same place**" · Ch6: "the town takes back what you were carrying" | Drill b, Turn 10. The Witch asked to hand her loot to Dracula, a captive, instead of setting it down. That would save the freed captive's pick-up action. It would also keep the loot out of a capture's reach: the town takes what an Entity carries only when it is captured, and Dracula's capture had already happened. I ruled no, because a captive can't pick loot up. PT10's w3 asked about both verbs; only picking up was fixed | Ch4: "Loot has no limit; hand it over free in the same place (**never to a captive**)." |
| w3 | Ch4: "Each Turn, every Entity takes one action: **a roll at its location, a move, or waiting**" · Ch3: "pick up any number of items, **as their action for a Turn**" · Ch4: "taking it back up **is an action**" · At the Table: "Each Turn, each Entity rolls, moves or waits." | Picking up and taking a piece back up are now actions, but the list in Chapter 4 reads as complete and leaves them out. Drill b, Turn 11 (the Mummy's pick-up) and drill a, Turns 6 and 10 needed Chapter 3 to override it | Ch4: "a roll at its location, a move, **picking up (items or a set-down piece)**, or waiting". At the Table: "rolls, moves, picks up or waits", if the line still fits on the page (PT8's m5 decision keeps it to one page) |
| w4 | Ch4: "Bulky pieces need one carrier, **Huge two** … Taking a piece is free (**taking it back up is an action**)" | Read, not played: drill a's piece was Bulky. For a Huge piece, "an action" doesn't say whether one carrier's action lifts it back up, or whether each of the two carriers spends its own. I'd read it as each carrier spending its own action, since each one takes it up (the online version's latest change reads it the same way) | Ch4: "(taking it back up is an action, **for each carrier**)". This can be combined with w1's wording |

**Counts: 0 blockers, 0 major, 2 minor, 4 wording** (6 in all). By kind: **2 rules** (m1, m2) and **4 wording** (w1–w4).

---

## 6. PT10's findings: what the book now says

| PT10 id | Status | Quote now in the book | Checked in PT11 |
|---|---|---|---|
| m1 where a drop in the final flight, or between places, stays | **partly** (V27) | Ch3: "(…; **between places, the one you left**)" · Ch6: "**anything dropped in the flight is left in town**" | Drill a. The flight drop read cleanly: left in town, and the Witch couldn't take it up. The between-places clause names an "item", although only a piece's carrier is ever between places, so the mirror needed the analogy (**w1**). Where the carrier itself ends up is new and open (**m1**) |
| m2 the free take-up dodges the carrier's dice penalty | **resolved** (V26) | Ch4: "Taking a piece is free (**taking it back up is an action**)" | Drill a, Turns 9–10. The Mask roll with the mirror set down cost Turn 10's action, and with it the way out before dawn |
| w1 the moment of the catch | **resolved** | Ch6: "When you are caught during the raid, you run, **and you can't drop anything until the chase ends**." | Drill b, try 4. Refused at the catch, on Chapter 6 alone. Handing over is this playtest's m2 |
| w2 "any number" | **resolved** | Ch3: "may pick up **any number of items**, as their action for a Turn" | Drill b, Turn 11: two items in one action |
| w3 captives and loot | **partly** | Ch3: "Anyone there **but a captive** may pick up" | Drill b, Turn 10: the captive's pick-up was refused. Handing loot to a captive, which PT10's w3 also asked about, is still open: this playtest's **w2** |
| w4 "drop an item" when a friend could pick it up | **not changed** (declined by decision, 2026-10-07) | Ch8: "'drop an item' when someone carries loot" (unchanged) | Not exercised: no Cost came up in either drill |

**PT10: 3 resolved, 2 partly, 1 not changed (declined by decision)** (of 6).

---

## 7. Roll appendix

71 rolls, R1–R71, each a fresh `node -e` `Math.random` roll, listed in the order rolled. One wasn't needed: R67 (Familiar's Warning's second d6, rolled with R66, which had already missed). R47–R58 are drill b's three restarts.

| Roll | Drill | What | Die | Result |
|---|---|---|---|---|
| R1 | a | Turn 9: the Werewolf, the high garden wall, Nimble d12 (mirror set down) | d12 | 6 |
| R2 | a | Turn 9: the Werewolf, Mask | d6 | 2 |
| R3 | a | Turn 10: the Witch, the strongbox, Wits d12 | d12 | 11 |
| R4 | a | Turn 10: the Witch, Mask | d6 | 1 |
| R5 | a | Turn 11: Tell check, the way out (the Witch arrives) | d6 | 6 |
| R6 | a | Turn 11: Familiar's Warning, second d6 | d6 | 2 |
| R7 | a | Flight round 1: the ground | d6 | 1 (the crowded square) |
| R8 | a | Round 1: the Werewolf, Wits d10 (Keen Nose, Hedge Spell) | d10 | 5 |
| R9 | a | Round 1: the Werewolf, Monster | d10 | 5 |
| R10 | a | Round 1: the Witch, Sly d10 | d10 | 4 |
| R11 | a | Round 1: the Witch, Monster | d10 | 4 |
| R12 | a | Flight round 2: the ground | d6 | 5 (the festival parade) |
| R13 | a | Round 2: the Werewolf, Wits d10 (Keen Nose, Hedge Spell) | d10 | 5 |
| R14 | a | Round 2: the Werewolf, Monster | d10 | 10 |
| R15 | a | Round 2: the Witch, Sly d10 | d10 | 10 |
| R16 | a | Round 2: the Witch, Monster | d10 | 9 |
| R17 | a | Flight round 3: the ground | d6 | 4 (over the rooftops) |
| R18 | a | Round 3: the Werewolf, Nimble d10 (Hounds) | d10 | 2 |
| R19 | a | Round 3: the Werewolf, Monster | d10 | 6 |
| R20 | a | Round 3: the Witch, Wits d10 (Rowan) | d10 | 10 |
| R21 | a | Round 3: the Witch, Monster | d10 | 9 |
| R22 | a | Flight round 4: the ground | d6 | 3 (the market stalls) |
| R23 | a | Round 4: the Werewolf, Nimble d10 (Hounds) | d10 | 6 |
| R24 | a | Round 4: the Werewolf, Monster | d10 | 5 |
| R25 | a | Round 4: the Witch, Brawn d4 (Rowan) | d4 | 2 |
| R26 | a | Round 4: the Witch, Monster | d10 | 5 |
| R27 | a | Flight round 5: the ground | d6 | 3 (the market stalls) |
| R28 | a | Round 5: the Werewolf, Nimble d10 (Hounds) | d10 | 1 |
| R29 | a | Round 5: the Werewolf, Monster | d10 | 9 |
| R30 | a | Round 5: the Witch, Brawn d4 (Rowan) | d4 | 2 |
| R31 | a | Round 5: the Witch, Monster | d10 | 1 |
| R32 | a | Flight round 6: the ground | d6 | 4 (over the rooftops) |
| R33 | a | Round 6: the Werewolf, Nimble d10 (Hounds) | d10 | 4 |
| R34 | a | Round 6: the Werewolf, Monster | d10 | 7 |
| R35 | a | Round 6: the Witch, Wits d10 (Rowan) | d10 | 9 |
| R36 | a | Round 6: the Witch, Monster | d10 | 3 |
| R37 | a | Flight round 7: the ground | d6 | 5 (the festival parade) |
| R38 | a | Round 7: the Werewolf, Sly d4 (Hounds) | d4 | 2 |
| R39 | a | Round 7: the Werewolf, Monster | d10 | 4 |
| R40 | a | Round 7: the Witch, Sly d8 (Rowan) | d8 | 7 |
| R41 | a | Round 7: the Witch, Monster | d10 | 9 |
| R42 | a | Flight round 8: the ground | d6 | 6 (a dead end) |
| R43 | a | Round 8: the Werewolf, Brawn d8 (Hounds) | d8 | 7 |
| R44 | a | Round 8: the Werewolf, Monster | d10 | 10 |
| R45 | a | Round 8: the Witch, Wits d10 (Rowan) | d10 | 4 |
| R46 | a | Round 8: the Witch, Monster | d10 | 6 |
| R47 | b try 1 | The Witch, the crowded shop floor, Sly d12 (Cook) | d12 | 6 |
| R48 | b try 1 | The Witch, Mask | d6 | 6 |
| R49 | b try 1 | Dracula, Nimble d10 (Bat) | d10 | 3 |
| R50 | b try 1 | Dracula, Mask | d6 | 6 |
| R51 | b try 2 | The Witch, Sly d12 (Cook) | d12 | 8 |
| R52 | b try 2 | The Witch, Mask | d6 | 5 |
| R53 | b try 2 | Dracula, Nimble d10 (Bat) | d10 | 4 |
| R54 | b try 2 | Dracula, Mask | d6 | 3 |
| R55 | b try 3 | The Witch, Sly d12 (Cook) | d12 | 9 |
| R56 | b try 3 | The Witch, Mask | d6 | 2 |
| R57 | b try 3 | Dracula, Nimble d10 (Bat) | d10 | 7 |
| R58 | b try 3 | Dracula, Mask | d6 | 6 |
| R59 | b try 4 | The Witch, Sly d12 (Cook) | d12 | 5 |
| R60 | b try 4 | The Witch, Mask | d6 | 3 |
| R61 | b try 4 | Dracula, Nimble d10 (Bat) | d10 | 3 |
| R62 | b try 4 | Dracula, Mask | d6 | 1 |
| R63 | b | Local chase round 1: the ground | d6 | 1 (the crowded square) |
| R64 | b | Round 1: Dracula, Charm d10 (Garlic) | d10 | 1 |
| R65 | b | Round 1: Dracula, Monster (Hypnotic Eyes) | d10 | 1 |
| R66 | b | Turn 9: Tell check, the lock-up (the Witch arrives) | d6 | 3 |
| R67 | b | Turn 9: Familiar's Warning, second d6 (not needed) | d6 | 3 |
| R68 | b | Turn 9: Dracula slips free, Charm d12 (Mesmerise) | d12 | 2 |
| R69 | b | Turn 9: Dracula, Mask | d6 | 1 |
| R70 | b | Turn 10: the Witch's rescue, Sly d12 (Hedge Spell) | d12 | 9 |
| R71 | b | Turn 10: the Witch, Monster | d10 | 7 |
