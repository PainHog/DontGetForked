# HW1: Lantern Night in Hallowby, played strictly by the script

*Agent playtest, 2026-10-13. Rules source at the table: only the one-shot, `book/demo/chapters/*.html` read in filename order, with its town key (`15-glance.html`), `book/demo/hallowby.json` and the Entity cards (`60-pregens.html`). The rulebook (`book/src/chapters/*.html`) was used only for the separate reviewer's check in section 4. Every random result is a real `node -e` roll (Math.random), numbered R1 onward and listed in the appendix (R24 was not used: the log's game separator took that number). The Storyteller read every box word for word and made a quick ruling only where the script ran out, as its Before You Play page allows. Every such moment is logged as a finding.*

*The Critical's read-aloud line in `40-happens.html` changed during this playtest (the commit "a Critical's charge back only if one was spent"). The findings use the current text and say where the old text came up at the table.*

---

## 1. Summary

Game 1 is the session asked for. The dice were kind and it ended on Turn 7 without a chase, so two more full games were played with freshly rolled parties to reach the chase pages. Neither game reached a capture or the final flight. Two branches were then replayed from a real game state (Game 3, Turn 5) to reach those pages. Every roll in the branches is real; only the branch point is assumed.

| | **Game 1 (the session)** | Game 2 | Game 3 | Branch A (from Game 3, T5) | Branch B (same point) |
|---|---|---|---|---|---|
| Party (Castle Duty) | the Mummy (Handyman), Dracula (Cook), the Invisible Man (Tailor), a Ghost (Gardener) | Dracula (Butler, kept), a Ghost (Tailor), the Werewolf (Gardener), Jekyll &amp; Hyde (Cook) | the Werewolf (Gardener), a Witch (Cook), a Ghost (Tailor), the Mummy (Handyman) | as Game 3 | as Game 3 |
| Result | **Grand Year** | Grand Year | Grand Year | **Win** (Grand Year, one step down: the Mummy left behind) | **Partial** (Win, one step down) |
| Out on | Turn 7, by the way out | Turn 6, by the way out | Turn 6, by the way out | Turn 5, by escaping the final flight | Turn 6, by escaping the final flight |
| Suspicion at the end | **6** | 10 | 10 | 11 (the Limit) | 11 (the Limit) |
| Local chases | **0** | 1: the Ghost at the guard dog, escaped in 3 rounds | 0 | 1: the Mummy at the watchman, cornered in round 1 | (that same chase) |
| Captures | **0** | 0 | 0 | 1: the Mummy (the hinges taken back) | 1: the Mummy (her slip-free try failed) |
| Final flight | **no** | no | no | yes: 4 rounds, home at Lead 6 | yes: 2 rounds, home at Lead 5 |
| The mirror | taken T6, home | taken T4, home | taken T4, home | carried home through the flight | abandoned to stop the noise |
| Charges spent | 1 of 12 | 5 of 12 | 0 of 12 | 7 | 8 |
| Table time (section 5) | **about 1 h 10** | about 1 h 20 | about 1 h | about 1 h 30 | about 1 h 30 |

What stood out:
- **The script carries a first-time Storyteller through a whole evening.** Nothing was a dead end. Every place, result and chase step had a page to turn to, and the town key, Places pages and tracker agree with each other and with `hallowby.json`.
- **The one real rules gap is netting.** The script never says that a bigger die and a smaller die cancel, or that no die goes below a d4. Read in the order it is printed, “a d12 stays a d12” and then “one size smaller” gives a d10 where the rulebook gives a d12. It came up in Game 1, Game 2 and both branches: a Castle Duty against a Cost; the Ghost’s Chill against Cold Iron in three chase rounds (three charges that would buy nothing on a literal reading); and Hedge Spell against carrying and Hounds in the flight (H1).
- **Read-aloud text states a few rules wrongly**, mostly in small ways. The biggest is “Once one of you gets past an obstacle, it stays beaten for everybody. The exception is a crowd”, which contradicts six of the eight cards (“Only you get past”) (H2). The rest are one-line fixes (H3 to H8).
- **Three procedural snags.** The Turn marker is told to move at the start and again at the end of each Turn (M1). The florist’s Ghost note doesn’t say whether Spectral hands over the nightshade on arrival (M2). The script doesn’t say when a mirror carrier arrives in its second Turn, which decided whether the way out could be rolled before the mirror’s end-of-Turn +1. That came up in all three games (M3).
- **Easy really is easy.** All three real games were Grand Years by Turn 6 or 7, matching `sim/DEMO.md` (73% Grand Year, about 8 Turns). The evening ran about 1 to 1½ hours, against the cover’s “about 2½ hours” (L15).

## 2. Turn-by-turn log

### Game 1 (the session)

**Setup.** Entities, a d8 each (1 Dracula, 2 the Creature, 3 the Mummy, 4 the Werewolf, 5 the Invisible Man, 6 a Ghost, 7 a Witch, 8 Jekyll &amp; Hyde):
- Newcomer, R1 = 3: the Mummy.
- Daredevil, R2 = 1: Dracula.
- Planner, R3 = 5: the Invisible Man.
- Joker, R4 = 6: a Ghost.

**Castle Duties** (“Keep it, or swap to any Duty nobody else has”):
- The defaults were Librarian, Butler, Tailor and Butler.
- Dracula swapped to **Cook** (“red wine, for the guests”), which freed Butler.
- The Mummy swapped to **Handyman**.
- The Ghost swapped to **Gardener**, since Butler buys nothing tonight.
- The Invisible Man kept **Tailor**.

All four of tonight’s Duties were taken. Practice R5–R12: nothing counts. Dracula’s practice Monster showed on a Charm roll (5 against 2). The practice box doesn’t mention Hypnotic Eyes, which doesn’t matter there.

| Turn | What happened | Suspicion |
|---|---|---|
| 1 | The tracker is on Turn 1 (Part One cue). Running a Turn says “Move the Turn marker” at the start, and the end-of-Turn box says it again: two moves a Turn (M1). The Planner splits the party: **Dracula and the Mummy** go to the tavern (not watched, so no Tell check), **the Ghost** to the florist and **the Invisible Man** to the tailor. At the florist, “Which way?”: the crowded shop floor. The cue says a Ghost with Spectral “walks through with no roll”, and the crowd is the only obstacle, so the Ghost holds the **nightshade** on arrival (ruling, M2). Tell checks once all moves are in: florist R13 = 5 (the Ghost’s cold spot), tailor R14 = 4 (the Invisible Man’s sneeze). | 0 → **2** |
| 2 | **Dracula**, tavern way in: the goose yard. Sly d8 (Cook) + Monster vs 6: 5+6 = 11, Success. The Monster’s 6 beat the 5, so it showed: +2 (“his shadow … has wings”). Suspicion is 4: read the dog-barking line. **Mummy**, back room, Wits d12 + Mask: 6+1 = 7, a **Cost**, and the **wine** is hers. She can’t drop what the roll won, and Patience of Ages rules out losing a Turn, so the Storyteller picks **smaller die**. **Invisible Man**, Mrs Pinch, Charm d8 (Tailor) + Mask: 8+5 = 13, Success: the **cape**. **Ghost** moves to the carpenter: Tell R18 = 2. | 2 → **4** |
| 3 | **Ghost**, carpenter way in: the garden wall, Nimble d12 + Mask: 8+6 = 14, Success. **Mummy** moves to the carpenter. Its arrival box ends “Which way?” although the way in is already chosen and beaten (L8). **Dracula** moves to the tailor. **Invisible Man** waits. | **4** |
| 4 | **Mummy**, the watchman: Wits d12, with the Handyman raise and the Cost’s smaller die on the same roll. The script never says how the two combine (H1); the Storyteller ruled that they cancel, so d12. 3+3 = 6, a Cost. They are doubles, but not on a Success, so no Critical. The **hinges** are hers, and the Cost is **drop an item**: the wine lies at the carpenter. **Ghost** picks up the wine (its action). **Dracula**, guard dog, Charm d12 + Monster, with the **Invisible Man spending Unseen on Dracula’s roll**: 6+2 = 8 vs 10, a Cost. He is past the dog, and the Cost is **lose a Turn**. The Planner: “Don’t take the mirror until you can carry it.” Taking it is free and the noise only starts once it’s taken (O3). **Invisible Man** moves to the way out. It is the first time anyone has come back there, so a Tell check (Running a Turn’s step 3 says “nobody has reached yet”, H6): R22 = 4, the sneeze again. | 4 → **5** |
| 5 | **Dracula** misses his go. The **Mummy** (hinges) and **Ghost** (nightshade, wine) move to the way out. The **Invisible Man** waits. | **5** |
| 6 | **Dracula** takes the mirror (free) and sets off, between places. Three players wait at the bridge with nothing to do (L14). End of Turn: the mirror +1. | 5 → **6** |
| 7 | **Dracula** acts first and arrives. When a carrier arrives in its second Turn isn’t in the script (M3); the ruling was “when it acts”. Everyone not locked up is at the bridge. **Invisible Man**, the way out, Sly d12 + Mask vs 6: 8+3 = 11, Success. The party is out before the end of the Turn, so the mirror adds nothing. | **6** |

**Part Three:** the wine, nightshade, hinges and cape, and the mirror, all came home. That is a **Grand Year**, read “A year of plenty…”. Nothing is missing, so there are no lines from the second table. Then Goodnight.

### Game 2 (compact)

**Setup.** Entities R25–R28:
- Newcomer: Dracula.
- Show-off: a Ghost.
- Daredevil: the Werewolf.
- Roleplayer: Jekyll &amp; Hyde.

**Castle Duties:**
- Dracula and the Ghost both default to Butler. The Ghost was rolled later, so it swaps, to Tailor.
- The Newcomer keeps **Butler**. The tracker has no Butler row to write it on (L7).
- The Werewolf keeps Gardener.
- Jekyll swaps from Librarian to Cook.

Practice R29–R36: Jekyll’s practice Monster showed (8 against 3). “Do I turn into Hyde?” The practice cue doesn’t say (L6).

| Turn | What happened | Suspicion |
|---|---|---|
| 1 | **Jekyll and Dracula** go to the tavern, the **Werewolf** to the florist and the **Ghost** to the tailor. Tell checks: R37 = 5 (the Werewolf’s eyebrows), R38 = 5 (the Ghost’s cold spot). | **2** |
| 2 | **Werewolf**, florist: the drainpipe, Nimble d12 + Monster vs 10: 9+9 = 18, a **Critical**. The dice tie, so the Monster doesn’t show. He had spent no charge, but the box then read “you feel a little of your power come back” (fixed during the test; H3 remains). He has the **nightshade**. **Jekyll**, geese, Sly d10 (Cook) + Mask: 11, Success. **Dracula**, back room, **Bat** (1 charge), Nimble d10 + Mask: 3+4 = 7, a Cost, and the **wine** is his; the Cost is Suspicion +1. **Ghost**, Mrs Pinch, Charm d10 (Tailor) + Monster: 8+9 = 17, Success, but the Monster showed: +2. He has the **cape**. Suspicion jumped from 3 to 5: is the line for 4 read? (L4) | 2 → 3 → **5** |
| 3 | **Jekyll and Dracula** move to the carpenter. Tell R43 = 5. There are two arrivals, so whose Tell, with a d6? (L5) R45 = 6: Dracula’s (no reflection). The **Werewolf** moves to the tailor. **Ghost**, guard dog, Charm d10 (Tailor) + Monster vs 10: 2+2 = 4, **Trouble**. A tie, so the Monster doesn’t show. Caught. Read the line for 7. | 5 → 6 → **7** |
| 3, chase | Lead 1, mob 8 + 3 = **11**. Cold Iron from round 1 (read its line). Each round the Ghost spends **Chill** against Cold Iron on its Nimble d12 (H1: on a literal reading, “a d12 can’t go higher” and then “one size smaller” leave a d10, and the charge buys nothing). Round 1, rooftops (R46 = 4): 11+9 = 20, Success, Lead 2. Round 2, back alleys: 12+4 = 16, Success, Lead 3. Round 3, rooftops: 11+9 = 20, Success, Lead 4: **escaped**. He is back at the tailor with his Turn used and 0 charges left. | **7** |
| 4 | **Dracula**, carpenter: the garden wall, Nimble d10 + Mask: 11, Success. **Jekyll**, the watchman, Wits d10 + Mask: 3+6 = 9, Success: the **hinges**. **Werewolf**, dog, **loud** Nimble d12 + Monster with **Good Dog** (1 charge): 3+8 = 11, Success. The Monster showed, which adds nothing; the loud way adds +1. The Success line reads “The dog thumps its tail twice, rolls over”, after “outrun it, barking” (L2). He takes the mirror at 8. The script has no cue to warn that this means 10 before it can leave (L11). End of Turn: the mirror +1. Read the line for 9. | 7 → 8 → **9** |
| 5 | The **Werewolf** sets off carrying. **Dracula, Jekyll and the Ghost** move to the way out: Tell R55 = 1. End of Turn: the mirror +1. Read the line for 10. | **10** |
| 6 | The **Werewolf** arrives. Nobody spots that Dracula’s Mesmerise makes the way out Charm d12 vs 4, which can’t fail (O1). R56 stood in for the table’s choice. **Ghost**, the way out, Nimble d12 + Mask vs 6: 2+5 = 7, Success. **Out.** | **10** |

**Grand Year.**

### Game 3 (compact)

**Setup.** Entities R58–R62 (R61 repeated a 7 and was rerolled):
- Daredevil: the Werewolf.
- Show-off: a Witch.
- Newcomer: a Ghost.
- Roleplayer: the Mummy.

**Castle Duties:** the Werewolf keeps Gardener and the Witch keeps Cook. The Ghost swaps from Butler to Tailor, and the Mummy from Librarian to Handyman. Practice R63–R70.

| Turn | What happened | Suspicion |
|---|---|---|
| 1 | All four go to the tavern, the cue’s “gentle first stop”. | **0** |
| 2 | **Witch**, geese, Sly d12 (Cook) + Monster: 11, Success. **Mummy**, back room, Wits d12 + Mask: 2+3 = 5, Trouble. It isn’t watched, so +1 and no chase. The **Werewolf** moves to the florist (Tell R73 = 2) and the **Ghost** to the tailor (Tell R74 = 1). | **1** |
| 3 | **Witch**, back room, Wits d12 + Monster: 7+10 = 17, Success, but the Monster showed: +2. She has the **wine**. **Werewolf**, drainpipe, Nimble d12 + Monster: 7+8 = 15, Success, and the Monster showed: +2. He has the **nightshade**. Suspicion passes 4 again (L4). **Ghost**, Mrs Pinch, Charm d10 + Mask: 12, Success: the **cape**. The **Mummy** moves to the carpenter: Tell R78 = 6, the Mummy’s dust and spice. | 1 → 3 → 5 → **6** |
| 4 | **Mummy**, the garden wall, **loud** Brawn d12 (Handyman) + Mask: 2+6 = 8, Success, loud +1. Read the line for 7. The Success line is “Over the wall…” after “through the gate, lock and all” (L2). **Ghost**, dog, Charm d10 (Tailor) + Mask vs 10: 3+5 = 8, a Cost. It is past the dog, and the Cost is **drop an item**: the cape lies at the tailor. The **Werewolf** moves to the tailor and takes the mirror on arrival. He never rolled there (L13), and there was no warning at Suspicion 7 (L11). The **Witch** moves to the tailor. End of Turn: the mirror +1. | 6 → 7 → **8** |
| 5 | **Mummy**, the watchman, Wits d12 + Mask: 4+3 = 7, a Cost: the **hinges**. The Cost is Suspicion +1. Read the line for 9. The **Werewolf** sets off carrying. The **Witch** picks up the cape. The **Ghost** moves to the way out: Tell R82 = 1. End of Turn: the mirror +1. Read the line for 10. | 8 → 9 → **10** |
| 6 | The **Werewolf** arrives, and the **Witch and the Mummy** arrive. **Ghost**, the way out, Nimble d12 + Mask: 9+1 = 10, Success. **Out.** | **10** |

**Grand Year**, with no charges spent all night.

### Branch A: Game 3 from Turn 5, the Mummy’s watchman roll taken as Trouble (everything after it rolled for real)

| Step | What happened | Suspicion |
|---|---|---|
| T5, Trouble | The watchman is watched, so the Mummy is caught. | 8 → **9** |
| T5, chase | Lead 1, mob 8 + 4 = **12**. Round 1, the festival parade (Charm, Sly). **Ancient Lore** (1 charge): Wits d12 + Mask: 3+4 = 7, Trouble. Lead 0: **captured**. Trouble in the chase adds +1. Read the Captured box: the town takes back the **hinges**, gone for the night. | 9 → **10** |
| T5, rest | The table votes to keep the mirror (R86). The **Werewolf** sets off carrying. The **Witch** picks up the cape. The **Ghost** moves to the lock-up, the first arrival there who isn’t a captive: Tell R87 = 5, the Ghost’s cold spot. That is **11: stop, The Final Flight.** The Mummy stays in the lock-up. | **11** |
| Flight | Runners: the Werewolf (carrying the mirror and the nightshade), the Witch (wine, cape) and the Ghost. Lead 2, escape at 5, mob 10, the Monster only. | |
| Round 1, a dead end (Brawn, Wits) | The Ghost’s Cold Iron is in play from round 1. **Werewolf** Brawn d10: 4+5 = 9, a Cost. **Witch** Wits d12: 1+3 = 4, Trouble. **Ghost** Wits d6 (Cold Iron and Chill cancel, H1): 1+10 = 11, Success. 1 to 1: Lead 2. | |
| Round 2, back alleys | **Werewolf** Nimble d12: carrying takes it down a size and the Witch’s **Hedge Spell** on his roll brings it back. The flight page doesn’t mention the carrying step-down (L12). 7+1 = 8, a Cost. **Witch** Sly d10: 7+5 = 12, Success. **Ghost** Nimble d12 (Cold Iron and Chill cancel): 5+8 = 13, Success. 2 to 0: **Lead 4**. | |
| Round 3, back alleys | Hounds and Rowan arrive (read both lines). **Werewolf** Nimble: d12, down for carrying and for Hounds, up for Hedge Spell, so a d10: 9+3 = 12, Success. **Witch** Sly: d10, down for Rowan, up for her own Hedge Spell, so a d10: 4+3 = 7, Trouble. **Ghost** Nimble d12 (Chill, its last charge): 7+2 = 9, a Cost. 1 to 1: Lead 4. | |
| Round 4, rooftops | No charge helps any more. Nobody may overdraw: the Witch and the Ghost have no charges and every Weakness is in play (“never while its Weakness is already in play”, read clean). **Werewolf** Nimble d8: 8+7 = 15, Success. **Witch** Wits d10: 8+5 = 13, Success. **Ghost** Nimble d10: 6+10 = 16, Success. 3 to 0: **Lead 6, home.** | |
| Part Three | Home: the wine, nightshade, cape and the mirror. The hinges are lost. That is a Grand Year, dropped one step for the Mummy left behind: a **Win**. Lines: Win, then the hinges (“Every door in the castle creaks…”). | |

### Branch B: the same point, the vote the other way (abandon the mirror, rescue the Mummy)

- **Turn 5:** the Werewolf abandons the mirror (free; it stays put and goes quiet) and moves to the lock-up with the Ghost: Tell R104 = 1. The Witch picks up the cape. End of Turn: no noise. Suspicion 10.
- **Turn 6:** the Mummy tries to slip free first, opening her own way with **Royal Bearing** (Charm at 8). The lock-up pages don’t say whether a captive may use one (L3); allowed as the card’s “at an obstacle that doesn’t list Charm”. 1+2 = 3, Trouble: +1, and no chase. That is **11: The Final Flight.**
- **Flight round 1, the crowded square:**
  - Werewolf, **Keen Nose**, Wits d8: 13, Success.
  - Witch, Sly d12 with Hedge Spell: 11, Success.
  - Ghost, Sly d10 (Cold Iron and Chill cancel): 16, Success.
  - Lead 4.
- **Flight round 2, the parade:** Successes for the Werewolf (16) and the Witch (13), Trouble for the Ghost (3). 2 to 1: **Lead 5, home.**
- **Part Three:** 3 of 4, with the wine: a Win, dropped one step for the Mummy left behind: a **Partial**. Lines: Partial, then the hinges.

## 3. Findings

Severity: **high** = a wrong rule or a dead end; **medium** = would stall the table; **low** = wording or polish. File names are in `book/demo/chapters/` unless marked otherwise. Fix wording is exact where given. Anything that adds new flavour text is a proposal for Richard.

| # | Sev | Passage (file) | At the table | Suggested fix |
|---|---|---|---|---|
| H1 | **high** | The script never says how a bigger die and a smaller die combine, or that no die goes below a d4. `30-raid.html`, Your first roll, step 5: “their trait die is one size bigger (a d8 becomes a d10; a d12 stays a d12). That’s the roll’s one bigger die”. `40-happens.html`, Cost: “Your next roll’s trait die is one size smaller.” Caught, step 6: “the runner’s trait die is one size smaller to the end of the chase.” Cards: “Your trait die is one size bigger for this roll (a d8 becomes a d10; a d12 can’t go higher).” Rulebook Ch3: “Net raises against steps down first … a d12 raised and stepped down stays a d12. Then apply the limits: nothing makes a die smaller than a d4, or bigger than a d12.” | Game 1, Turn 4: the Mummy’s Handyman raise against the Cost’s smaller die on Wits d12. Game 2, Turn 3: the Ghost’s Chill against Cold Iron on Nimble d12, three rounds and three charges. Branch A: Hedge Spell against carrying plus Hounds; the Ghost’s Brawn d4 under Cold Iron (a d4 minus one is what?). Read in the printed order, a d12 raised “stays a d12” and then drops to a d10, so the charge buys nothing; the rulebook gives a d12. Each time it took a stop and a ruling. | Add a step to Your first roll after step 5: “**Bigger and smaller:** if something also makes the die smaller (a Cost, a Weakness, carrying the mirror), cancel them one for one first: a d12 made bigger and smaller stays a d12. Then no die goes below a d4 or above a d12.” Add to Caught step 6 and The Final Flight step 5: “A bigger die from an ability cancels it for that roll.” |
| H2 | **high** | `30-raid.html`, read aloud: “Once one of you gets past an obstacle, it stays beaten for everybody. The exception is a crowd: everyone gets past a crowd for themselves.” Six of the eight cards say “Only you get past” for their own approach. Rulebook Ch4 lists two exceptions. | Not reached in play. The read-aloud tells the players a rule the cards contradict, and the Storyteller has nothing to settle it with. | “Once one of you gets past an obstacle, it stays beaten for everybody, with two exceptions: everyone gets past a crowd for themselves, and a way that only you can take (your card says when) is beaten only for you.” |
| H3 | **high** | `40-happens.html`, A Critical, read aloud: “Perfect. Not a sound, not a witness. If you’ve spent a charge tonight, you get one back.” The box isn’t limited to outside a chase; in a chase a Critical is two Successes and gives no charge back. | Game 2, Turn 2 (the old text): the Werewolf’s Critical with full charges was told his power came back. The current text fixes that case. Read in a chase, the box still promises a charge. | Put a cue before the box: “Outside a chase:”. Then: “In a chase, a Critical counts as two Successes: say instead, ‘You leave them standing.’” (flavour line for Richard). |
| H4 | high (small impact) | `20-castle.html`, Your Powers, read aloud: “Every ability does one of four things.” Rulebook Ch3: “Every ability but the Draught”. | Game 2 had Jekyll at the table: said aloud, the line is wrong for his Signature. | “Almost every ability does one of four things …”, and after the list: “Jekyll’s Draught is the odd one out: it changes his form.” |
| H5 | high (small impact) | `20-castle.html`, read aloud: “Or it lets you roll the Monster without it showing.” The Monster can still show; it just adds no Suspicion. Hyde still takes over under Pillar of Society. | Not reached; Good Dog’s and Unseen’s showings read cleanly from the cards. | “Or it lets you roll the Monster without it raising Suspicion.” |
| H6 | high (small impact) | `10-before.html`, Running a Turn, step 3: “If it’s a watched place that nobody has reached yet, make a Tell check”. The party starts at the bridge, so the way out would never qualify. The Way Out page and the rulebook say “the first time anyone comes back”. | Game 1, Turn 4: the Invisible Man came back to the bridge. Step 3 said no check, the Way Out page said check, and the Storyteller followed the place page. | “… that nobody has reached yet (the way out: the first time anyone comes back to it) …” |
| H7 | high (small impact) | Cards (`60-pregens.html`, generated), footer: “With no charges left you can still overdraw: Suspicion +2.” That is wrong in the final flight, where it costs the Weakness. | Branch A, round 4: when overdraw came up, the card footer and the flight page disagreed. The flight page is right. | Fix in the card data: “… overdraw: Suspicion +2 (in the final flight, your Weakness instead).” |
| H8 | high (small impact) | `70-tracker.html`, Suspicion note: “… the loud way +1 · a Cost +1 · …” This reads as if every Cost raises Suspicion. | Not misread in play, but this is the line on the table at every roll. | “a Cost picked as Suspicion +1”. |
| M1 | **medium** | `10-before.html`, Running a Turn, step 1: “Say the Turn: ‘Turn 3.’ Move the Turn marker.” `40-happens.html`, End of a Turn: “… Suspicion +1. Then move the Turn marker.” `20-castle.html`: “the tracker beside you: Suspicion 0, Turn 1”. | Game 1, Turn 1: the marker is already on 1, and step 1 says to move it. Followed word for word, it moves twice a Turn and dawn comes after 6. | Step 1: “Say the Turn: ‘Turn 3.’ (The marker moves at the end of each Turn.)” |
| M2 | **medium** | `35-places.html`, the florist: “A Ghost with its Spectral Perk isn’t stopped by a crowd: it walks through with no roll, unless it’s carrying something.” It doesn’t say when (the Turn it arrives, or its next action), or that walking through gets the pot. | Game 1, Turn 1. The ruling, by the card (“no roll and no action, so you can still move or roll that Turn”): the Ghost walked through on arrival and took the nightshade. With a Ghost and the crowd, the nightshade costs only the Tell check (O2). | “A Ghost with its Spectral Perk isn’t stopped by the crowd: it walks through with no roll and no action, even in the Turn it arrives, and takes the pot (unless it’s already carrying something).” |
| M3 | **medium** | `35-places.html`, the mirror: “every move takes two Turns: after the first you’re somewhere in between.” It doesn’t say when the carrier arrives in the second Turn. Rulebook Ch4: “You arrive when you take your action in the second.” | All three games: does the carrier arrive at the start of its second Turn, at its end, or when it acts? The answer decided whether the way out could be rolled in the same Turn, before the mirror’s end-of-Turn +1 (Game 2: 10 or 11). | “… every move takes your action in two Turns in a row: after the first you’re somewhere in between, and you arrive when you act in the second.” |
| M4 | **medium** | `40-happens.html`, Trouble: “If the obstacle is watched, the roller is caught: turn to Caught.” The Cost box does check the Mummy’s Perk, but this box doesn’t check the Invisible Man’s Out of Sight (a default Perk, which changes whether a chase happens at all). | Game 1, Turn 2: before the Invisible Man rolled Mrs Pinch, carrying nothing, the Storyteller had to go to the card to see whether Trouble would catch him. | Add: “Check the roller’s Perk: the Invisible Man isn’t caught unless he, or anyone where he is, carries loot or the mirror (Suspicion still +1).” |
| L1 | low | `10-before.html` step 3 and `40-happens.html`: “make a Tell check once everyone moving there this Turn has arrived”. Players act one at a time, so the Storyteller can’t know who else is coming. The timing moves the local mob if a chase follows in the same Turn. | Game 2, Turn 3: two arrivals at the carpenter, then the Ghost’s dog roll. It didn’t matter this time (mob 11 either way). | Add: “(if you’re not sure who else is coming, ask before the next roll, then check)”. |
| L2 | low | `35-places.html`: the Success and Trouble lines are written for the quiet way. They contradict the loud way: geese “Not one honk” after “run for it, honking”; the dog “thumps its tail twice, rolls over” after “outrun it, barking”; the front door “Click” or “The pick snaps” after “kick it in”; the garden wall “Over the wall” after “through the gate”; the window “The catch lifts with a fingernail” after “force the shutters”; Mrs Pinch “she wraps it for you” after “snatch it”. | Game 2, Turn 4 (the dog, loud) and Game 3, Turn 4 (the garden wall, loud): the read-aloud described the wrong action. | A loud-way line for each (proposals for Richard). Geese: “You charge through in a storm of feathers. Every goose in Hallowby knows your face now, but you’re in.” Dog: “You bolt past with the dog at your heels; by the time it skids to a stop, the mirror is yours.” Front door: “One kick, and the door is in. So are you.” Garden wall: “The gate, lock and all, lies flat among the timber stacks.” Window: “The shutters give with a bang, and you’re in.” Mrs Pinch: “You snatch the cape and you’re gone before the pins hit the floor.” |
| L3 | low | `40-happens.html`, Slipping free: “Sly or Nimble, or Brawn, the loud way.” The rescue cue mentions only Mesmerise. Nothing says a captive may open a way of its own to slip free (rulebook Ch3: “a captive may open one to slip free”). | Branch B, Turn 6: the Mummy asked to use Royal Bearing. Allowed, after a pause. | Add to the cue: “A captive may also slip free by a way of its own (its card’s ability, at 8).” |
| L4 | low | `40-happens.html`, Suspicion Rising: “Read each line the first time Suspicion reaches that number.” | Game 2, Turn 2 and Game 3, Turn 3: Suspicion jumped from 3 to 5. Is the line for 4 read? | “… reaches or passes that number.” |
| L5 | low | `40-happens.html`, Tell check: “number the arrivals, roll to pick one”, and the Storyteller has a d6. | Game 2, Turn 3: two arrivals. | “… roll a d6 to pick one (two arrivals: 1–3 the first, 4–6 the second; three: 1–2, 3–4, 5–6; four or five: reroll a number nobody has).” |
| L6 | low | `20-castle.html`, practice cue: “Nothing in this practice counts: no Suspicion, no charges.” | Game 2: Jekyll’s practice Monster showed. “Do I turn into Hyde?” | “… no Suspicion, no charges, and Jekyll stays Jekyll.” |
| L7 | low | `70-tracker.html`: the Castle Duties table has only Cook, Gardener, Handyman and Tailor, but the castle cue says “Write each player’s Duty on the tracker”, and Butler or Librarian can be kept. There is also no place for a Cost still owed (smaller die, lost Turn), or to mark a way in as beaten. | Game 2: Dracula kept Butler, with no row to write it on. Game 1: the Mummy’s smaller die and Dracula’s lost Turn were tracked on paper. The garden wall was beaten before the Mummy arrived. | Add a row “Butler / Librarian (nothing tonight)”; a line “Owed: smaller die · lost Turn”; a “beaten” box after each way in. |
| L8 | low | `35-places.html`: every arrival box ends “Which way?”, even after the way in is chosen. The Your first roll box says to ask at the first try, not on arrival. | Game 1, Turn 3: the Mummy arrived at the carpenter after the Ghost had chosen and beaten the wall. | Opening cue of The Places: “Ask ‘Which way?’ only the first time anyone tries the place; after that, say which way the party took.” |
| L9 | low | `45-flight.html`, step 1: “The Lead starts at 2 (the Werewolf’s Fetch Perk: 3).” The card’s Perk is Night Runner, and Part One says “keep the Gift and Perk your card shows”. | Branch A: a Werewolf was in the flight, and the Storyteller had to check his card to see he has Night Runner, not Fetch. | Delete “(the Werewolf’s Fetch Perk: 3)”. |
| L10 | low | `30-raid.html`, read aloud: “Every place has obstacles … Every place has two ways in”, right after naming the lock-up and the bridge as places. | Read cleanly, but it is wrong as said. | “Every place on the list has obstacles … two ways in.” |
| L11 | low | `35-places.html`, the mirror: no cue to count the cost before it’s taken. Rulebook Ch8: “Warn the party if that would reach the Limit.” | Game 2 (taken at 8) and Game 3 (taken at 7): it led to 10, and in Branch A to the final flight. | Add to the mirror cue: “Before anyone takes it, count aloud: it adds at least 2 Suspicion before it can leave (the end of this Turn and the next). Warn the players if that would reach 11.” |
| L12 | low | `40-happens.html` Caught, step 3: “(no Mask carrying the mirror)”. It leaves out the smaller Nimble, and the flight page mentions neither. | Branch A: the carrier’s Nimble in the flight. | Caught: “(no Mask, and Nimble one size smaller, carrying the mirror)”. Flight step 3: add “Carrying the mirror: Nimble one size smaller.” |
| L13 | low | `35-places.html`: “Once the cape has been taken, anyone past the tailor’s way in may try for the mirror.” “Past” is unclear for someone who arrives after another Entity beat the way in, or the dog. | Game 3, Turn 4: the Werewolf arrived after the Ghost had beaten Mrs Pinch and the dog, and took the mirror. | “Once the cape has been taken, anyone at the tailor’s may try for the mirror (if the way in was a way only one of you could take, only that one).” |
| L14 | low | `10-before.html`, Keeping it moving: it has no advice for players with nothing to do (the rulebook’s Ch8 has it). | Game 1, Turns 5–7: three players waited at the bridge; Branch B: the captive. | Add: “Anyone waiting, at the bridge or in the lock-up, can voice a villager: Granny Mott, the constable, a judge from the costume contest.” |
| L15 | low | Cover: “about 2½ hours”; `10-before.html` timeline: Part Two “75–100 min”. | All three games ended by Turn 6 or 7, in about 1 to 1½ hours (section 5). | Richard’s call. Options: (a) keep 2½ hours, since first-timers chat; (b) “about 2 hours”; (c) “1½–2½ hours”. Recommend (c): it is honest about the short night and still allows for a slow table. |

**Observations for Richard, all by the book, with no change proposed:**
- **O1.** Dracula’s Mesmerise at the Easy way out is Charm d12 at 4. The worst total, 2, is a Cost, and a Cost gets everyone out, so it cannot fail.
- **O2.** With a Ghost in the party and the crowd chosen, the nightshade costs only the florist’s Tell check (M2).
- **O3.** A party can beat the dog early and take the mirror only when the carrier is free to move. Game 1 saved two Suspicion this way, which the script allows (“Taking it, once they’re past the dog, is free”).
- **O4.** Charges went largely unspent: 1, 5 and 0 of 12 in the three real games.
- **O5.** Three Grand Years from three real games matches `sim/DEMO.md` (73% Grand Year).

## 4. Rules check (reviewer)

Every rule the one-shot states, checked against `book/src/chapters` (and `docs/CORE-RULES.md`).

| Area | One-shot | Rulebook | Verdict |
|---|---|---|---|
| Numbers | Easy; list 4, 1 essential; 12 Turns; 3 charges; Limit 11; way out 6; lock-up 10; local Lead 1, escape 4, mob 8 + half Suspicion (at most 12); flight Lead 2, escape 5, mob 10 (`10-before`, `15-glance`, `70-tracker`) | Ch4, Ch6, Ch8 table | Match. The local mob table (0–1: 8 … 8–10: 12) is right. |
| Results | Success at the Difficulty; Cost 1–2 short; Trouble 3+ short; Critical on doubles on a Success (`20-castle`, `30-raid`) | Ch3 | Match. Practice calls 12 “very hard” where the book says “daunting” (a label, not a rule). |
| The Monster shows | Higher than the trait die, +2; not on a tie, never with the Mask; Good Dog and Unseen; Hypnotic Eyes; Jekyll to Hyde (`40-happens`) | Ch2, Ch3 | Match. The read-aloud “without it showing” is **H5**. |
| Suspicion triggers | Trouble +1, Monster +2, loud +1, a Cost as Suspicion +1, overdraw +2, Tell +1, the mirror +1 a Turn; one roll, one rise; never past 11 (`30-raid`) | Ch5 | Match. The tracker’s “a Cost +1” is **H8**. |
| Tell checks | First arrival at each watched place; the lock-up (not a captive); the way out on coming back; once a night; d6 4–6; a random arrival; +1 only; Familiar’s Warning (`40-happens`, `35-places`) | Ch5, Ch2 | Match, except Running a Turn step 3 leaves out the way out: **H6**. |
| Ways in, beaten obstacles, group | Choose on the first try, kept for the night; beaten for everybody; a crowd for each; the group check (`30-raid`, `40-happens`) | Ch4 | **Mismatch: H2** (the own-approach exception is missing from the read-aloud). Group check: match. |
| Abilities and charges | Four kinds; spend before rolling; a friend’s roll in the same place for the charge, not the action; one bigger die; overdraw +2 (`20-castle`, cards) | Ch3 | **Mismatch: H4** (the Draught) and **H5**. Netting and the d4 floor are missing: **H1**. |
| Castle Duty raise | One size bigger on your own rolls where your Duty’s item is, the dog included; the roll’s one raise; never in a chase (`20-castle`, `30-raid`, `35-places`, `40-happens`) | Ch2, Ch3 | Match, but the netting is missing: **H1**. |
| Costs | Four options; never one that costs nothing; drop never what this roll wins and never the mirror; the Mummy’s Perk; a Cost at the way out costs nothing (`40-happens`, `35-places`) | Ch3, Ch4, Ch8 | Match. |
| Criticals | Outside a chase, a charge back if one was spent (at most 3); in a chase, two Successes (`40-happens`) | Ch3, Ch6 | The cue matches. The read-aloud box isn’t limited to outside a chase: **H3**. |
| Local chase | Within the Turn; no dropping or handing; the ground d6; Mask or Monster (no Mask carrying); own abilities only; no Duty, no own approach; Success +1, Critical +2, Cost 0, Trouble −1; Suspicion rises; Weakness from round 1 (Dracula, a Ghost) or round 3; escape back where caught; Night Runner Lead 2; caught together by the majority rule; the Limit ends it (`40-happens`) | Ch6 | Match. The carrier’s smaller Nimble isn’t repeated there (**L12**). |
| Captured and the lock-up | The town takes everything, the mirror included, gone for the night; slip free once a Turn from the next (Sly or Nimble, or Brawn loud; 10; Success only; a Cost does nothing; Trouble +1, no chase); rescue (Sly, Brawn loud; 10; a Success or Cost frees every captive, the freed act next Turn; Trouble: caught); captives spend charges at the lock-up; Mesmerise on both (`40-happens`, `35-places`) | Ch6 | Match. A captive opening its own way to slip free isn’t mentioned (**L3**). |
| The way out | Watched; the first time anyone comes back, a Tell check; one rolls when everyone not locked up is there; Sly or Nimble, Brawn loud, 6; a Success or Cost gets everyone out (the Cost free); Trouble +1 and the roller caught, try again next Turn; the left-behind (`35-places`) | Ch4 | Match. |
| Furniture | The gilt mirror (Bulky) at the tailor, after the cape; the dog at 8 + 2 = 10, watched; taking it free; one carrier, no Mask, Nimble smaller, two-Turn moves; +1 a Turn even set down until out, lost or abandoned; set down any time but when caught; taking it back up is an action; abandon free (`35-places`, `15-glance`, `40-happens`) | Ch4, Ch8 | Match. Arrival timing is unclear: **M3**. |
| Final flight | At 11 or after Turn 12; a local chase ends, anyone cornered that round captured first; captives stay; Lead 2, escape 5, mob 10, Monster only, abilities on anyone, any order, the majority rule with the example; the Weakness as a new chase; overdraw costs the Weakness once a flight, never while it’s in play; drops stay in town; Forked (`45-flight`) | Ch5, Ch6 | Match. The “Fetch Perk: 3” aside is consistent with the book, but the card has Night Runner (**L9**). The card footer’s overdraw +2 is wrong for the flight: **H7**. |
| Dawn | The mirror +1 at the end of each Turn, then dawn after Turn 12 for everyone in town and not captured (`40-happens`) | Ch4, Ch5 | Match. The marker moves twice: **M1**. |
| How the Year Went | Home = carried out by the way out or the flight; Grand Year, Win, Partial, Bust, Forked; one step down per Entity left behind, never below Bust; missing-item lines except after Forked (`50-year`) | Ch7 | Match. One line per item equals one per kind here, since every kind is different. |
| Town and cards | `15-glance` key and Places pages against `hallowby.json` and the Ch8 obstacle table; the cards against Ch2’s defaults | Ch2, Ch8 | Match: every trait, loud way, Difficulty, watched and group mark, and every card’s dice, abilities, Perk, Weakness, Tell and default Duty. |

**Mismatches (all listed as high in section 3):**
- **H1** (netting and the d4 floor missing): bites in play.
- **H2** (the read-aloud on beaten obstacles leaves out the own-approach exception).
- **H3** (the Critical box not limited to outside a chase).
- **H4** (“Every ability does one of four things”).
- **H5** (“without it showing”).
- **H6** (step 3 leaves out the way out’s Tell check).
- **H7** (the card footer’s overdraw in the flight).
- **H8** (the tracker’s “a Cost +1”).

H4 to H8 are one-line wording fixes.

## 5. Table time

Method (as in FT5): read-aloud at about 140 words a minute (Part One’s boxes are 1,123 words; Part Two’s opening 430; the flight 250), 1 minute a roll, 1 minute a party decision, about 1 minute a place read and 2 minutes a hesitation (each finding met at the table).

| | Part One | Part Two | Part Three | Total |
|---|---|---|---|---|
| Game 1 | 20 (8 reading, 6 choosing and Duties, 6 practice) | 44 (3 reading, 11 rolls, 10 place reads, 6 decisions, 7 hesitations) | 3 | **about 67 min** |
| Game 2 | 20 | 54 (21 rolls with the chase) | 3 | about 77 min |
| Game 3 | 20 | 37 (13 rolls) | 3 | about 60 min |
| Branch A (in place of Game 3’s last two Turns) | 20 | about 60 (with the capture and a 4-round flight) | 3 | about 85–90 min |

The script plans 100–150 minutes: Part One 20–25, Part Two 75–100, the flight 0–15 and Part Three 5–10. Part One’s estimate holds. Part Two came in at 37–60 minutes, because the parties finished in 6 or 7 Turns, not 12 (L15). A slower first-time table and a break would add perhaps 20 minutes, which still leaves the evening nearer 1½ hours than 2½.

## Appendix: every roll

All from `node -e` with Math.random, through a small helper in a private scratch folder (not in the repository).

| # | What | Dice |
|---|---|---|
| R1–R4 | Game 1 Entities (d8) | 3 Mummy · 1 Dracula · 5 Invisible Man · 6 Ghost |
| R5–R8 | Practice, d12 + Mask: Mummy, Dracula, Invisible Man, Ghost | 3+2 · 8+3 · 9+6 · 3+4 |
| R9–R12 | Practice, d12 + Monster: same order | 5+1 · 2+5 · 4+7 · 1+4 |
| R13 | G1 T1 Tell, florist | 5 |
| R14 | G1 T1 Tell, tailor | 4 |
| R15 | G1 T2 Dracula, geese, Sly d8 + Monster vs 6 | 5+6 |
| R16 | G1 T2 Mummy, back room, Wits d12 + Mask vs 8 | 6+1 |
| R17 | G1 T2 Invisible Man, Mrs Pinch, Charm d8 + Mask vs 8 | 8+5 |
| R18 | G1 T2 Tell, carpenter | 2 |
| R19 | G1 T3 Ghost, garden wall, Nimble d12 + Mask vs 8 | 8+6 |
| R20 | G1 T4 Mummy, watchman, Wits d12 + Mask vs 8 | 3+3 |
| R21 | G1 T4 Dracula, dog, Charm d12 + Monster (Unseen) vs 10 | 6+2 |
| R22 | G1 T4 Tell, way out | 4 |
| R23 | G1 T7 Invisible Man, way out, Sly d12 + Mask vs 6 | 8+3 |
| R24 | not used | — |
| R25–R28 | Game 2 Entities (d8) | 1 Dracula · 6 Ghost · 4 Werewolf · 8 Jekyll &amp; Hyde |
| R29–R32 | Practice, d12 + Mask: Dracula, Ghost, Werewolf, Jekyll | 4+3 · 5+2 · 3+6 · 12+5 |
| R33–R36 | Practice, d12 + Monster: same order | 4+3 · 1+6 · 1+7 · 3+8 |
| R37 | G2 T1 Tell, florist | 5 |
| R38 | G2 T1 Tell, tailor | 5 |
| R39 | G2 T2 Werewolf, drainpipe, Nimble d12 + Monster vs 10 | 9+9 |
| R40 | G2 T2 Jekyll, geese, Sly d10 + Mask vs 6 | 8+3 |
| R41 | G2 T2 Dracula, back room (Bat), Nimble d10 + Mask vs 8 | 3+4 |
| R42 | G2 T2 Ghost, Mrs Pinch, Charm d10 + Monster vs 8 | 8+9 |
| R43 | G2 T3 Tell, carpenter | 5 |
| R44 | G2 T3 Ghost, dog, Charm d10 + Monster vs 10 | 2+2 |
| R45 | G2 T3 whose Tell (1–3 Jekyll, 4–6 Dracula) | 6 |
| R46, R47 | G2 chase round 1: ground; Ghost Nimble d12 + Monster vs 11 | 4; 11+9 |
| R48, R49 | G2 chase round 2: ground; same | 2; 12+4 |
| R50, R51 | G2 chase round 3: ground; same | 4; 11+9 |
| R52 | G2 T4 Dracula, garden wall, Nimble d10 + Mask vs 8 | 8+3 |
| R53 | G2 T4 Jekyll, watchman, Wits d10 + Mask vs 8 | 3+6 |
| R54 | G2 T4 Werewolf, dog (loud, Good Dog), Nimble d12 + Monster vs 10 | 3+8 |
| R55 | G2 T5 Tell, way out | 1 |
| R56 | G2 T6 table choice: Mesmerise spotted? (1–3 no) | 3 |
| R57 | G2 T6 Ghost, way out, Nimble d12 + Mask vs 6 | 2+5 |
| R58–R62 | Game 3 Entities (d8) | 4 Werewolf · 7 Witch · 6 Ghost · 7 (repeat) · 3 Mummy |
| R63–R66 | Practice, d12 + Mask: Werewolf, Witch, Ghost, Mummy | 5+1 · 6+3 · 12+2 · 5+4 |
| R67–R70 | Practice, d12 + Monster: same order | 8+9 · 6+6 · 4+10 · 10+1 |
| R71 | G3 T2 Witch, geese, Sly d12 + Monster vs 6 | 8+3 |
| R72 | G3 T2 Mummy, back room, Wits d12 + Mask vs 8 | 2+3 |
| R73 | G3 T2 Tell, florist | 2 |
| R74 | G3 T2 Tell, tailor | 1 |
| R75 | G3 T3 Witch, back room, Wits d12 + Monster vs 8 | 7+10 |
| R76 | G3 T3 Werewolf, drainpipe, Nimble d12 + Monster vs 10 | 7+8 |
| R77 | G3 T3 Ghost, Mrs Pinch, Charm d10 + Mask vs 8 | 10+2 |
| R78 | G3 T3 Tell, carpenter | 6 |
| R79 | G3 T4 Mummy, garden wall (loud), Brawn d12 + Mask vs 8 | 2+6 |
| R80 | G3 T4 Ghost, dog, Charm d10 + Mask vs 10 | 3+5 |
| R81 | G3 T5 Mummy, watchman, Wits d12 + Mask vs 8 (the branch point) | 4+3 |
| R82 | G3 T5 Tell, way out | 1 |
| R83 | G3 T6 Ghost, way out, Nimble d12 + Mask vs 6 | 9+1 |
| R84, R85 | Branch A chase round 1: ground; Mummy (Ancient Lore) Wits d12 + Mask vs 12 | 5; 3+4 |
| R86 | Branch A table vote (1–3 keep the mirror) | 1 |
| R87 | Branch A Tell, lock-up | 5 |
| R88–R91 | Branch A flight round 1: ground; Werewolf, Witch, Ghost vs 10 | 6; 4+5 · 1+3 · 1+10 |
| R92–R95 | Branch A flight round 2 | 2; 7+1 · 7+5 · 5+8 |
| R96–R99 | Branch A flight round 3 | 2; 9+3 · 4+3 · 7+2 |
| R100–R103 | Branch A flight round 4 | 4; 8+7 · 8+5 · 6+10 |
| R104 | Branch B Tell, lock-up | 1 |
| R105 | Branch B Mummy slips free (Royal Bearing), Charm d8 + Mask vs 8 | 1+2 |
| R106–R109 | Branch B flight round 1: ground; Werewolf, Witch, Ghost vs 10 | 1; 5+8 · 7+4 · 10+6 |
| R110–R113 | Branch B flight round 2 | 5; 7+9 · 4+9 · 1+2 |
