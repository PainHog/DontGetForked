# HW5: Lantern Night in Hallowby, the v0.3 rules check (five players)

*Agent playtest and read-aloud check, 2026-10-21. It checks the one-shot after the day’s decisions on the outside review of v0.2 (Decisions log, 2026-10-21; the script edits in `git diff d630bfc~3 -- book/demo/chapters`, commit 3f2c6f7, and the run guide at b4189d3):*
- *Spectral works only at a way in.*
- *One overdraw per local chase.*
- *The final flight’s overdraw is a step down of its own (once per flight, on top of any Weakness).*
- *The local mob is at most 11, and a local chase lasts at most 6 rounds (after round 6, Lead 2+ escapes, else cornered).*
- *Five players: the Limit is 1 lower (Hallowby: 8).*
- *Any ability may be a raise in a local chase, on your own roll.*
- *Roll-offs settle two players wanting the same Entity or the same Duty.*
- *A runner gives up once the ground is read.*
- *Hyde takes over even when an ability hid the Monster.*

*Source at the table: only the one-shot, `book/demo/chapters/*.html` in filename order, with the cards (`60-pregens.html`) and the tracker (`70-tracker.html`). The rulebook (`book/src/chapters/*.html`) and the two quick sheets (`docs/guides/quick-sheets/`) were used only for the rules check in section 5. Every random result is a real roll (Math.random, run by `node`) through a small helper kept outside the repository, numbered R1 onward and listed in the appendix. Table choices that could go either way were rolled too. The Storyteller read every box word for word and stopped wherever the text tripped or ran out. Each stop is a finding. Method and format follow HW3 and HW4. Five players this time, so the Limit is 8.*

---

## 1. Summary

**The party.** Five seats rolled a d8 each for the Entity they wanted (R1).
- Two clashes went to the script’s roll-off (R2, R3), and the two losers chose again (R4, R5).
- The Newcomer plays **Jekyll & Hyde**, the Planner **Dracula**, the Joker **the Mummy**, the Daredevil **the Invisible Man**, the Quiet One **the Werewolf**.
- A Duty roll-off (R7) gave Jekyll the Handyman’s place, so Dracula took Cook.

**The session.** It ran by the script with real dice. Everyone was out on Turn 6 with all four items (no mirror): a **Win**, with no chase and no flight. So the changes were exercised in short, clearly marked branches. Each branch changes one roll or one choice, unless it is marked *stipulated*, and every roll after the branch point is fresh. The stipulated branches are D2, E, G, H and I.

| Line | Branch point | What it exercised | Result | Suspicion at the end | Ends |
|---|---|---|---|---|---|
| **The session** | none | Five players, Limit 8; two Entity roll-offs and a Duty roll-off; Suspicion Rising read at 2, 4 and 6; a Critical with no charge spent; a four-arrival Tell check with a reroll | **Win** | 6 | Turn 6, the way out |
| A | R44 taken as Trouble (the Invisible Man caught at the way out, carrying the cape) | The line for 7; mob 11; a **give-up in round 1, after the ground**; a chase with no rolls raises nothing; a captive left behind | **Partial** | 7 | Turn 7, the way out |
| B | A, R46’s call taken as “runs” | **Through the Gap spent as a raise** in a local chase, twice; cornered; the chase’s rise brings the Limit; a four-runner flight | **Partial** | 8 | Turn 6, the flight escaped in 3 rounds |
| C | R37: Jekyll tries the guard dog | The mirror at Limit 8 (the count aloud, the end-of-Turn rise to the Limit); a **five-runner flight** carrying the mirror; Hyde taking over in the flight | **Grand Year** | 8 | Turn 5, the flight escaped in 4 rounds |
| D | C, R80: the mirror abandoned | Abandoning; the way out at 7 | **Win** | 7 | Turn 6, the way out |
| D2 *(stipulated)* | D, R110 taken as Trouble | **Trouble at a watched obstacle that brings the Limit: no local chase**, straight to the flight | **Forked** | 8 | Turn 6, cornered in round 1 |
| E *(stipulated)* | D2’s flight replayed, Dracula at 0 charges | **The flight’s overdraw as a step down of its own on top of Garlic**; a friend’s raise cancels one of the two steps; **a second overdraw refused** | **Win** | 8 | the flight escaped in 4 rounds |
| F | R29 taken as Trouble (Jekyll caught at the watchman) | Jekyll’s local chase; Hyde takes over on a chase roll; a give-up | not played on | 6 | Turn 2 |
| F2 | F, R150’s call taken as “runs” | Cornered in round 3 | not played on | 6 | Turn 2 |
| G *(stipulated)* | F2’s chase, set at the start of round 5 (Lead 2, Hyde at 0 charges) | **The Draught overdrawn as a raise** in a local chase; **a second overdraw refused**; **after round 6, a Lead of 2 or more escapes**; a show and an overdraw bring the Limit | the flight starts on Turn 2 with nothing stolen (not played on) | 8 | Turn 2 |
| H *(stipulated)* | A, at four players (Limit 9), the chase starting at 8 | **The mob’s cap: 12 → 11**; Through the Gap as a raise | escaped in round 3 (not played on) | 8 of 9 | Turn 6 |
| I *(stipulated re-seat)* | The Ghost in the Werewolf’s seat, from Turn 3 | **Spectral at the florist’s crowd** (a way in): no roll, no action, takes the pot | **Win** | 5 | Turn 5, the way out |
| J | R27: Jekyll takes the Monster under the Werewolf’s Good Dog | **Hyde takes over though the show raised nothing** | not played on | 3 | Turn 2 |

**Across all lines:**
- **Local chases: 6**, two of them stipulated (G, and H at four players). They ended in 2 give-ups, 2 escapes (one by the six-round end), and 4 captures (2 cornered, 2 given up).
- **Final flights: 4 played**: 3 home, 1 forked.
- **Overdraws: 2**, one in each kind of chase, and **2 second overdraws refused**.
- **Abilities spent as a raise in a local chase: 4** (Through the Gap three times, the Draught once).
- **1 Critical**, **0 group checks**, **6 Tell checks** (4 went off).
- **Table time for the session: about 1 hour** (section 6).

What stood out:
- **The new rules read clearly at the table.** Every change was applied from the script’s own words, without a ruling:
  - the mob table to 11, and the six-round end (G: Lead 3 after round 6, away);
  - one overdraw per local chase, and once per flight (both refusals came straight from the card and the box);
  - the flight’s overdraw stacked on Garlic, with a friend’s raise taking one step back;
  - any ability as a raise in a local chase (Through the Gap, the Draught);
  - giving up once the ground is read;
  - HW4’s fix for Trouble at the Limit, which held in D2 with no pause;
  - Spectral at the crowd, Hyde under a friend’s Good Dog, and three roll-offs.
- **One medium: the five-player Limit is read aloud wrong once (M1).** How the Night Works ends with “If it reaches **9**…”. The cue that says “With five players, say 8 instead of 9” sits *after* the box, which runs over the page. Reading word for word, the Storyteller said 9 to a table of five. Everywhere else, the script gives both numbers or says “the Limit”.
- **The rest are low.** The Caught box the players hear lags the Storyteller’s steps on today’s changes (L1–L3):
  - it doesn’t say an ability can be a raise, though five cards say “Never in a chase”;
  - it gives only the good half of the six-round end;
  - its “any Trouble” can be read as counting the Trouble that got you caught.

  Smaller items: the Suspicion Rising numbers (L4), the run guide’s tricky-rules line (L5), the Foundry journal’s glance page (L6), the printer-friendly PDF (L7) and a missing word on the players’ quick sheet (L8).
- **The cards are right and whole.** All eight match Chapter 2’s defaults and `module/config.mjs`. The generator’s `--check` passes, and every card’s text ends inside its border in the current PDF. The Ghost’s card is the fullest.
- **Not reported:** the run guide’s Foundry lines, which describe 0.1.6. The release and the portal zip move to 0.1.6 after this round (the lead’s note).

## 2. Setup and Part One

**Entities.** All five seats wished at once (R1): the Newcomer 5, the Planner 1, the Joker 3, the Daredevil 5, the Quiet One 1.
- The cue (“If two players want the same Entity, they roll off: the high d6 keeps it, and the other chooses again”) settled both clashes at once: the Daredevil kept the Invisible Man 3–2 (R2), and the Planner kept Dracula 5–2 (R3).
- The two re-choices (R4) gave the Quiet One the Werewolf; the Newcomer’s 5 was held, and his reroll (R5) gave Jekyll & Hyde.
- No roll-off tied. The cue doesn’t say what a tie does (optional, section 4).

**Castle Duties.**
- Card defaults: Dracula Butler, the Mummy Librarian, the Invisible Man Tailor, the Werewolf Gardener, Jekyll Librarian. So the Mummy and Jekyll clash, and three of the five Duties buy nothing tonight.
- The three wished after the read box (R6): Dracula Handyman, the Mummy kept Librarian, Jekyll Handyman.
- Jekyll won the roll-off 4–1 (R7), and Dracula picked the one free useful Duty, Cook (R8).
- So: Dracula Cook (the wine), the Mummy Librarian (nothing), the Invisible Man Tailor (the cape), the Werewolf Gardener (the nightshade), Jekyll Handyman (the hinges). The cue (“they roll off: the high d6 keeps it, and the other picks another”) read cleanly.

**Practice** (R9 to R18, nothing counts), d12 + Mask against 8:
- Jekyll 5 (Trouble), Dracula 7 (a Cost), the Mummy 9, the Invisible Man 7 (a Cost), the Werewolf 16.
- With the Monster, Jekyll’s (8 over 6), Dracula’s (9 over 4) and the Werewolf’s (6 over 2) showed. Jekyll stayed Jekyll, as the cue says.

**Part One at five.** Your Card’s read box says “when it reaches 9 (8 if there are five of you)”, which reads naturally to five. Nothing else in Part One depends on the party’s size.

## 3. Turn-by-turn log

### The session

| Turn | What happened | Suspicion |
|---|---|---|
| 1 | Two groups (R19): Dracula and the Mummy to the tavern; Jekyll, the Werewolf and the Invisible Man to the carpenter. The carpenter’s Tell check, once all three had arrived (R20): 6, and the second d6’s 5 picks the third arrival. The Invisible Man’s sneeze. | 0 → **1** |
| 2 | **Tavern** (R21): the trapdoor. The Mummy, Brawn d10 + Monster: 8 + 10 = 18, but the Monster showed (+2). Read the trapdoor’s Success line and the Mummy’s Monster line. Suspicion 3 passes 2, so the first Suspicion Rising line (printed at 3) is read, by the five-player cue.<br>**Carpenter** (R22): the garden wall. The Werewolf, Nimble d12 + Mask: 3 + 6 = 9. Jekyll at the watchman, Wits d10 → d12 by Handyman + Mask (R29): 4 + 4 = 8, a **Critical**. He has spent no charge, so “If you’ve spent a charge tonight, you get one back” gives nothing. He has the **hinges**.<br>**Back room:** Dracula, Wits d4 → d6 by Cook + Mask (R30): 7, a Cost. He takes the **wine**. Drop is out (he carries only what this roll won); a lost Turn (R31).<br>The Invisible Man moves to the tailor: no Tell (R32). | 1 → **3** |
| 3 | Dracula misses his go. The Invisible Man takes Mrs Pinch the loud way, Sly d12 + Monster (R35): 13, and the **cape**. Read the loud-way Success line; +1, and the second line (printed at 5) is read at 4. Jekyll and the Mummy move to the tailor. The Werewolf moves to the florist: the Tell goes off (R36), his eyebrows. | 3 → 4 → **5** |
| 4 | The Werewolf takes the drainpipe, Nimble d12 + Mask (R39): 8 against 10, a Cost. He has the **nightshade**, and loses a Turn (R40).<br>At the tailor, after the count aloud (“5 now; 6, 7, out on Turn 6 at best, and a Tell at the bridge makes 8”), they leave the mirror (R37). All three move to the bridge with Dracula (R38).<br>The bridge’s Tell check, four arrivals (R41): it goes off. The pick’s 6 belongs to nobody, so it is rerolled, as the box says (R42): the Mummy’s dust and spice. The third line (printed at 7) is read at 6. | 5 → **6** |
| 5 | The four at the bridge wait (“Only when everyone who isn’t locked up is here may one of them roll”). The Werewolf misses his go. | **6** |
| 6 | The Werewolf moves to the bridge. The Invisible Man rolls the way out, Sly d12 + Mask against 6 (R44): 5, a Cost, which costs nothing here. **Across.** | **6** |
| Part Three | Home: the wine, the nightshade, the hinges and the cape. A **Win** (the mirror wasn’t taken). The Win line; no missing-item lines; the goodnight in full. | |

### The branches

| Branch | What happened | Suspicion |
|---|---|---|
| **A** (R44 taken as Trouble) | Out of Sight doesn’t save the Invisible Man: he carries the cape. Trouble +1 → 7, and the line for 7 is read (“One more thing, just one…”). Caught: step 2’s “6–8: 11”, Lead 1.<br>Round 1, over the rooftops (R45). Once the ground was read, the give-up call (R46): **he gives up**, captured with no roll, and the cape is taken. The chase had no rolls, so step 5’s “biggest trigger among the chase’s rolls” is nothing: Suspicion stays 7 (see L3 on the read box). The Captured box was read through.<br>Turn 7: the four cross without him (R47). The Mummy, by Ancient Lore, rolls 7 against 6 (R49). The wine, the hinges and the nightshade make a Win, one step down for the Invisible Man left behind: **Partial**. | 6 → **7** |
| **B** (A, R46’s call taken as “runs”; R46’s second die stands) | Round 1, rooftops. The Daredevil reads “Never in a chase” on Through the Gap and asks whether he can spend it; the card’s help line and step 3 answer (L1). **Through the Gap as a raise**, Wits d10 → d12 + Mask against 11 (R50): 9, a Cost, Lead 1.<br>Round 2, the parade: Sly d12 + Monster (R53): 10, a Cost.<br>Round 3, rooftops, Flour (read its line): Through the Gap as a raise cancels it, Wits d10 + Mask (R56): 7, Trouble. Lead 0, **cornered**, and the cape is taken.<br>The rise: +1 (round 3’s Trouble) → **8, the Limit**. The Captured cue and step 8 send the other four to the flight, and he stays.<br>**Flight** (Lead 2, mob 10):<br>• Round 1, the parade (R57–R62). Garlic makes Dracula’s Charm a d10: Dracula 8 and the Mummy (Royal Bearing as a raise) 9 are Costs; Jekyll 18 and the Werewolf 10 are Successes. Lead 4.<br>• Round 2, back alleys (R63–R68): 2 to 2, level.<br>• Round 3, a dead end; three Weaknesses come in (R69–R74). Dracula (Mesmerise as a raise, Garlic cancelled) 11, the Mummy 5, Jekyll (the Draught to Hyde, Brawn d12 → d10) 11, the Werewolf 8. 2 to 1: **home**.<br>The wine, the hinges and the nightshade: a Win, one step down: **Partial**. | 7 → **8** |
| **C** (R37’s second die taken as “Jekyll tries the dog”) | Jekyll, Charm d12 + Monster against 10 (R76): 16, past the dog, no show. The count aloud, then the Mummy takes the mirror (R77) and the mirror box is read (her Nimble d4 can’t shrink). Taking it was free, so she starts the two-Turn carry; the Invisible Man waits to walk with her (R78).<br>Dracula arrives at the bridge alone: Tell (R79), No Reflection → 6, the line for 6. End of Turn 4: the mirror +1 → 7, the line for 7.<br>Turn 5: the Werewolf still owes his lost Turn, so nobody can roll the way out; the mirror will make 8 at the Turn’s end. They keep it (R80). The others reach the bridge. End of Turn 5: **8**.<br>**Flight**, five runners, the Mummy carrying the mirror:<br>• Round 1, back alleys: 4 Successes and a Cost, Lead 4. Jekyll’s Monster showed, so Hyde takes over.<br>• Round 2, rooftops: 1 Success to 3 Trouble, **Lead 2**.<br>• Round 3, a dead end; four Weaknesses: 3 to 1, Lead 4.<br>• Round 4, a dead end: 4 to 1, **home**.<br>Everything, the mirror included: **Grand Year**. | 5 → 6 → 7 → **8** |
| **D** (C, R80 taken as “abandon the mirror”) | The Mummy abandons it on arriving at the bridge in Turn 5, before the Turn ends: no more noise, Suspicion stays 7. Turn 6: the Werewolf arrives. The Invisible Man rolls the way out (R110): 5 against 6, a Cost: across. **Win**. | **7** |
| **D2** *(stipulated: R110 taken as Trouble, no show)* | Trouble +1 → **8, the Limit**. The way out’s Trouble line says “caught in a local chase”. Turning to Caught, its first cue (“If that Trouble takes Suspicion to the Limit, there’s no local chase…”) and Running a Turn’s cue send everyone to **the flight** with no pause. Five runners, every charge at 3.<br>Round 1, rooftops (R111–R117): Dracula 3, Jekyll 4 and the Werewolf 2 are Trouble; the Mummy 8 is a Cost; the Invisible Man 13 is a Success. Trouble ahead by 2: Lead 2 → **0**. The Forked box; Part Three, the Forked line only; the goodnight stops at “spoons”. | 7 → **8** |
| **E** *(stipulated: D2’s flight replayed with fresh rolls, Dracula at 0 charges)* | **Round 1**, the crowded square. Dracula **overdraws**, Mesmerise spent as a raise: Charm d12 with Garlic cancelled, 10, a Success. With the Mummy 9, Jekyll 15, the Invisible Man 21 and the Werewolf 5: 3 to 1, Lead 4.<br>**Round 2**, the market stalls. By step 6 (“From the overdrawer’s own next roll … one size smaller, on top of any Weakness”), Dracula’s Nimble d10 is now a **d6** (Garlic and the overdraw’s step): 6, Trouble. 1 to 3, Lead 2.<br>**Round 3**, the parade; four Weaknesses. Jekyll’s Doctor’s Bag on Dracula’s Charm cancels one of the two steps (the first-roll box’s “one for one”): d10, 9, a Cost. 2 Successes, 0 Trouble: Lead 4.<br>**Round 4**, rooftops. The Planner asks to overdraw again: **refused** (“Once per flight each, Weakness or not”; the card’s “in the final flight, once”). The Mummy’s Royal Bearing raises his Nimble one step back to a d8: 7, Trouble. 3 to 2: **home**.<br>Four items: **Win**. | **8** |
| **F** (R29 taken as Trouble) | Jekyll is caught at the watchman, carrying nothing. 3 → 4, and the line for 4. Mob 10, Lead 1.<br>Round 1, the parade: Charm d12 + Monster (R148), 10, a Success, Lead 2. The Monster showed, so the chase owes +2 and **Hyde takes over** after the roll (the Monster box: “In a chase, a show counts towards the chase’s one rise instead”).<br>Round 2, the market stalls: the give-up call came up 6 (R150) and **Hyde gives up** at Lead 2 (O6). The rise, +2 → 6. Not played on. | 3 → 4 → **6** |
| **F2** (F, R150’s call taken as “runs”) | Round 2: Brawn d12 + Mask (R151), 3, Trouble, Lead 1.<br>Round 3, rooftops, A Familiar Face (“Doctor Jekyll? Is that you?”, to Hyde): Nimble d10 → d8 + Mask (R154), 5, Trouble. Lead 0, **cornered**. The rise, +2 → 6. Not played on. | 4 → **6** |
| **G** *(stipulated: F2’s chase set at the start of round 5: Lead 2, mob 10, Hyde at 0 charges, the chase owing +2, the Weakness in play)* | **Round 5**, the market stalls. Hyde **overdraws the Draught as a raise**, Brawn d12 with the Weakness cancelled (R157): 16, Lead 3. It showed (the chase already owes +2), and the overdraw adds its +2 at the end.<br>**Round 6**, a dead end. The Newcomer asks to overdraw Doctor’s Bag as a raise: **refused** (the card’s “once in a local chase”, the Overdraw box’s “only once a chase”, step 5’s “one per runner”). Brawn d10 + Monster (R160): 9, a Cost, Lead 3.<br>**After round 6** (the read box: “a Lead of 2 or more and you’re away”; step 7), Hyde **escapes**, back at the carpenter with the Turn used up. The rise: +2 for the show, +2 for the overdraw: 4 → **8, the Limit**. Step 8 sends everyone to the flight on Turn 2 with nothing stolen (Dracula hadn’t rolled the back room yet). Not played on (O3). | 4 → **8** |
| **H** *(stipulated: Branch A at four players, the Werewolf’s seat empty, Limit 9; Suspicion 7 before the way-out roll)* | The Invisible Man’s Trouble makes 8, and step 2 gives 8 + 4 = 12, **at most 11** (the table’s “6–8: 11”). Lead 1.<br>Round 1, the crowded square: Sly d12 + Mask (R163), 15, Lead 2. Round 2, the parade: Sly d12 + Monster (R166), 16, Lead 3. Round 3, back alleys, Flour: Through the Gap as a raise cancels it (R169), 12. **Escaped**, back at the bridge.<br>No Trouble or show in the chase, so it raises nothing: 8 of 9. Every roll would also have beaten 12, so the cap changed no result. Not played on. | 7 → **8** |
| **I** *(stipulated re-seat: the Ghost in the Werewolf’s seat; she swaps to Gardener; R25 stands as hers, her Nimble also a d12)* | Turn 3: she moves to the florist (R33). The Tell check goes off (R36): her Cold Spot line, 4 → 5. The florist cue: “A Ghost with its Spectral Perk isn’t stopped by the crowd, a group way in. It walks through with no roll and no action, even in the Turn it arrives, and takes the pot.” She takes the **nightshade** at once; the card says the same. The florist’s way in stays unpicked, which doesn’t matter, since the pot is the location’s only item.<br>Turn 4: all five to the bridge (R170), no Tell (R171). Turn 5: the Invisible Man rolls the way out (R173), 15. **Win**. | 4 → **5** |
| **J** (R27’s first die taken as “the Monster under the Werewolf’s Good Dog”) | The Werewolf spends Good Dog on Jekyll’s roll (3 → 2). Wits d12 + Monster (R174): 17, a Success, and the Monster showed (9 over 8). Under Good Dog it adds nothing (Suspicion stays 3), and **Hyde takes over** holding the hinges. The Monster box (“even if an ability meant it added nothing”) and the card (“his own or a friend’s”) settled it at once. Not played on. | **3** |

## 4. Findings

Severity: **high** = a wrong rule, a dead end, or something that would visibly trip the reader at the table; **medium** = would stall the table or confuse; **low** = polish. Files are in `book/demo/chapters/` unless marked. Replacement wording is exact. Each fix to the script also belongs in the Foundry Demo journal, which `tools/gen-demo-source.mjs` converts from these chapters, and gets a row in `book/REVIEW.md`.

**Layout note for M1 and L1–L3.**
- Page 12 has about half an inch free under the What Raises Suspicion cue, so M1’s one extra line fits.
- Page 21 ends with the Caught read box at the foot of the page, and page 22 is full to the Weakness table. L1–L3 together add about two lines to the box. Caught’s opening cue repeats what the “Caught together” cue already says (“Caught together, read the box, then add that the Lead moves once a round, by the majority rule (Caught together, below).”). Cutting that sentence frees about a line and a half.
- Build and check pages 21–22 after the change.

| # | Sev | Passage (file) | What happened | Suggested fix |
|---|---|---|---|---|
| M1 | **medium** | How the Night Works, read aloud (`30-raid.html`): “And remember Suspicion. If it reaches **9**, or you’re still in town when the sun comes up, the whole town hunts you, and you run for the castle together. That’s the **final flight**, and it’s how monsters get forked.” The cue after the box: “With five players, say 8 instead of 9. Then begin.” | The main session, five players. The box starts on page 11 and ends on page 12 with this paragraph, and the five-player cue comes only after it. Reading word for word, as the script asks, the Storyteller said “9” to a table of five, then met the cue and had to correct it. The players had already heard “9 (8 if there are five of you)” in Part One’s Your Card. Now they had two numbers, minutes before the first roll. This is the only place the Limit is spoken or printed with one number: Before You Play, the glance, Your Card, the tracker, Suspicion Rising and the run guide give both, and the rest say “the Limit”. The cue was added today and placed after the box it changes. | Read box: “And remember Suspicion. If it reaches **9** (8 if there are five of you), or you’re still in town when the sun comes up, the whole town hunts you, and you run for the castle together. That’s the **final flight**, and it’s how monsters get forked.” (the same words as Your Card). The cue after the box goes back to: “Then begin.” |
| L1 | low | Caught, read aloud (`40-happens.html`): “Every round, I’ll tell you what the ground is like, and it gives you two traits to choose from. Roll one of them, with the Mask or the Monster, against the mob.” The cards (`60-pregens.html`): Mesmerise, Mountain Stride, Royal Bearing, Through the Gap and Through the Wall each say “Never in a chase.” Step 3 (grey): “any may be spent as a raise instead.” | Branch B, round 1. The Daredevil read “Never in a chase” on Through the Gap and asked whether he could spend it. The same card’s help line (“In a chase, any ability can be a raise”) and step 3 answered him, so it cost a moment, not a ruling. The final flight’s read-aloud already answers this in so many words (“even if your card says it never works in a chase”). The local chase’s doesn’t, and today’s change 7 made it a local-chase question too. Players heard the rule once, in Part One’s Your Powers, an hour earlier. | Caught read box, after “…against the mob.”: “Any ability of yours can make your die one size bigger instead, even one your card says never works in a chase, but nobody else can spend a charge on your roll.” (Layout: see the note above the table.) |
| L2 | low | Caught, read aloud: “After six rounds it’s over: a Lead of 2 or more and you’re away.” Step 7 (grey): “**After round 6,** a Lead of 2 or more escapes, and less is cornered.” | Branch G: the end after round 6 played cleanly (Lead 3, away). But the players hear only the good half. A runner on Lead 1 after round 6 is captured having been told only “a Lead of 2 or more and you’re away”, and may expect another round. Not reached at the table (G ended on 3). | Read box: “After six rounds it’s over: a Lead of 2 or more and you’re away, and anything less and they’ve got you.” |
| L3 | low | Caught, read aloud: “Then it goes up once: by 2 if your Monster showed at any point, or else by 1 if you had any Trouble, and not at all if neither.” Step 5: “Note the biggest trigger among the chase’s rolls”. Rulebook, Chapter 6: “A chase given up before anyone has rolled raises nothing.” | Branch A. The Invisible Man gave up in round 1 before any roll. He *had* had Trouble, the way out’s, which got him caught and already raised Suspicion 6 → 7. “If you had any Trouble” reads as counting it. Step 5’s “among the chase’s rolls” settled it at 0, as the rulebook and both quick sheets say outright; the one-shot never does. Today’s change 12 (give up once the ground is read) makes a no-roll give-up a regular thing. | Read box: “…or else by 1 if you had any Trouble in the chase, and not at all if neither.” Step 7, after “captured, no roll.”, add: “A chase given up before anyone has rolled raises nothing.” |
| L4 | low | Suspicion Rising (`40-happens.html`): the cue “With five players (Limit 8), read each line one number sooner, at 2, 4, 6 and 7.”, over a table whose number column says 3, 5, 7 and 8. | The main session and Branch A. All four lines were read at the right moment (3 for 2, then 4, 6 and 7). But each time, the Storyteller had to look from the printed number up to the cue and subtract one. It’s the table consulted most often in Part Two, and the run guide already prints both numbers. | Number column: “3 (2)”, “5 (4)”, “7 (6)”, “8 (7)”. Cue: “…At the Limit, skip them and turn to The Final Flight. With five players (Limit 8), read each line at the number in brackets.” |
| L5 | low | Run guide (`docs/guides/run-guide/guide.html`), The Rules Most Likely to Trip You Up: “A runner can give up at the start of any round and go to the lock-up. After round 6, a Lead of 2 or more gets away and less is caught.” | “Caught” is the word for what starts a chase. The script’s word for how it ends is “cornered” (captured). The give-up line also leaves out “once the ground is read and before anyone rolls”, which the script (step 7), the rulebook and both quick sheets have. | “A runner can give up at the start of any round, once the ground is read and before anyone rolls, and go to the lock-up. After round 6, a Lead of 2 or more gets away and less is cornered.” |
| L6 | low | Foundry Demo journal, Hallowby at a Glance (`packs/_source/demo-journal/01-lantern-night.json`, written by `tools/gen-demo-source.mjs` line 126): “Easy: Suspicion Limit 9 · Difficulty: the way out 6…”. The book’s glance (`15-glance.html`, from `book/tools/town-pages.mjs` line 62): “Suspicion Limit 9 (8 with five players)”. | Every other journal page carries today’s five-player wording (Before You Play, Part One, How the Night Works’ cue, Suspicion Rising). The glance page is built by its own line of code, which didn’t get the clause. A Storyteller using the Foundry journal sees Limit 9 on the page they keep open. | In `tools/gen-demo-source.mjs` line 126, after `Suspicion Limit ${t.limit}` add `${t.limitFive !== t.limit ? ` (${t.limitFive} with five players)` : ""}`, as `town-pages.mjs` does (`demoTown()` already carries `limitFive`). Then regenerate the packs’ sources and `npm run build:packs`. |
| L7 | low | `book/dist/Lantern_Night_in_Hallowby_v0.2_printer-friendly.pdf` (built 05:06; not tracked in git), Before You Play: “…against a mob of 8 plus half the Suspicion when the chase starts (rounded down, at most 11), for 6 rounds at most. The chase raises Suspicion once, when it ends.” | The class of HW3’s and HW4’s H2, harmless this time. The normal PDF (05:15) and the source end the item “…at most 11). The chase raises Suspicion once, when it ends. It lasts 6 rounds at most.” A word diff of the two PDFs finds nothing else, apart from a “Waiting for Artwork” box. No rule differs. | Rebuild the printer-friendly copy with the next build, after the fixes above (`npm run build:book -- --demo --white`). Then the usual contact sheet and text diff; check the cards are still on 28–31 and the tracker on 32. |
| L8 | low | Player’s Rules quick sheet (`docs/guides/quick-sheets/players.html`), Caught: “It raises Suspicion once, when it ends: its biggest trigger (Trouble +1, the Monster +2), plus +2 an overdraw.” | A word is missing. Found in the rules check, not at the table. | “…plus +2 for an overdraw.” |

In all, **0 high, 1 medium and 8 low** findings. On today’s changes themselves:
- M1 and L4 are the five-player Limit.
- L1 to L3 are the Caught read box lagging the steps.
- L5 to L8 are the run guide, the Foundry journal, a build and a quick sheet.

No rule in the one-shot differs from the rulebook.

Optional, not counted:
- **A roll-off tie.** “The high d6 keeps it” (the castle’s two cues; Chapter 2 likewise) doesn’t say what a tie does. Three roll-offs here, none tied. If wanted: “they roll off (again on a tie): the high d6 keeps it”.
- **The tracker’s Duties line** has one blank for “Butler / Librarian”. At five, two players can hold those two.
- **The Overdraw box’s** “only once a chase” and step 5’s “(one per runner)” agree in effect, since the box’s subject is “an Entity”. The rulebook (“You can overdraw only once in a local chase”) and Foundry (`module/logic/chase.mjs`, `overdrawsBy`) count per runner too.

**Observations, no change proposed:**
- **O1. The cap at 11 never binds at five players.** With Limit 8, a local chase starts at 7 at most (Trouble that makes 8 starts no chase), and 8 + 3 is already 11. The table’s “6–8: 11” reaches the cap only at four players or fewer. Branch H, at four, took 12 to 11 and changed no result.
- **O2. Chases run by the script ended early.** Four of them (A, B, F, F2) ended in rounds 1 to 3: two give-ups, two cornered. So the six-round end and the second overdraw needed a stipulated state (G). That fits the simulator’s 17% of lone chases reaching round 6 (Decisions log, 2026-10-21).
- **O3. At five players a local-chase overdraw is a quarter of the track.** In G, a show (+2) and an overdraw (+2) took 4 to 8, and the whole party ran on Turn 2 with nothing stolen. The book says so (the card, the Overdraw box, step 5). A table may want the Storyteller to say “that’s +2 more when this ends” before the overdraw. That is what the box already allows, not a rule change.
- **O4. Five-runner flights swing.** D2 went 2 → 0 in round 1 (one Success to three Trouble); C went 2 → 4 → 2 → 4 → home. With five rolls, “ahead by 2 or more” comes easily both ways. The simulator measured five-player cells for today’s change 6; this is one night, not a sample.
- **O5. Spectral at a way in changes nothing in Hallowby.** Its one group obstacle is the florist’s way in, which is also the location’s only obstacle, so the florist cue stands and played cleanly (I).
- **O6. The give-up policy.** Give-ups in A (round 1, Lead 1) and F (round 2, Lead 2) came from a flat 1-in-6 call. F’s, at Lead 2 with a d12 to roll, isn’t what a table would do. From F2 on, the call was rolled only at Lead 1. As in HW4’s O7, the dice played the table; the rule is fine.
- **O7. Abandoning the mirror while caught (not from today).** The mirror box: “You can put it down any time, except when you’ve been caught and are running for it, but only giving it up for good stops the noise.” The rulebook (Chapter 4: “You may abandon it at any time, free”) and the Player’s Rules (“Abandon it any time”) allow abandoning while caught. The one-shot doesn’t say either way. It didn’t come up.
- **O8. HW4’s fixes held.** Trouble at the Limit goes straight to the flight (D2, no pause). The mirror box is read without the Creature’s line. “Fleeing alone when the chase starts” is now in the Caught cue, steps 1 and 2, the Caught-together cue and both cards.

## 5. Rules check

Every rule the day’s decisions touched, against `book/src/chapters` (Chapters 2–6, 8, 9 and At the Table), the two quick sheets, `module/config.mjs` and the Foundry chase logic where it decides a reading. The one-shot’s other rules were rechecked only where a branch reached them.

### Today’s changes (Decisions log, 2026-10-21)

| Change | One-shot (file) | Rulebook | Quick sheets | Played | Verdict |
|---|---|---|---|---|---|
| (1) Spectral only at a way in | the card; the florist cue (`35-places`: “isn’t stopped by the crowd, a group way in”) | Ch2 Spectral (same words as the card); Ch4 “A Ghost’s Spectral pass, with no roll, doesn’t pick it” | the Storyteller’s sheet doesn’t mention it | I | **Match.** Nothing changes in Hallowby (O5). |
| (2) One overdraw per local chase | card help line; Overdraw box (“only once a chase”); Caught step 5 (“one per runner”); tracker (“one overdraw”) | Ch3 “In a local chase you can overdraw only once”; Ch6 | Players: “(only once in a local chase)”, “one overdraw a chase”; Storyteller: “one overdraw a chase” | G (second refused) | **Match.** Per runner everywhere (`chase.mjs`, `overdrawsBy`). |
| (3) The flight’s overdraw a step down of its own | flight step 6 (“on top of any Weakness. Once per flight each, Weakness or not.”); Overdraw box; card help line | Ch3; Ch6 Once the Hunt Is On (adds: an overdraw on an earlier roller’s roll means your own roll that round already takes it) | both, “once a flight” | E (with Garlic; second refused) | **Match.** The rulebook’s extra sentence follows from the one-shot’s “own next roll”. |
| (4) The local mob at most 11 | Before You Play; Caught step 2 (table “6–8: 11”); tracker | Ch6 “at most 11” | both | A, B (7: 11); H (8: 12 → 11, four players) | **Match.** Never binds at five (O1). |
| (5) A local chase lasts at most 6 rounds | Before You Play; Caught read box; step 7; tracker (“after round 6 a Lead of 2+ escapes”) | Ch6 | both | G (Lead 3 after round 6: away) | **Match.** The read box gives only the escape half (**L2**). |
| (6) Five players: the Limit 1 lower (Hallowby 8) | Before You Play; the glance; Your Card; How the Night Works (cue after the box: **M1**); Suspicion Rising cue (**L4**); tracker (8 marked); everything else says “the Limit” | Ch5 “With five players, it’s 1 lower on Easy and Standard: 8 and 9”; Ch8 and At the Table tables; Ch9 town pages | both | the whole session; A for 7 | **Match** but for M1. The Foundry journal’s glance lags (**L6**). |
| (7) Any ability as a raise in a local chase, own roll | Your Powers read box; Caught step 3; card help line; tracker (“Any chase: any ability as a raise”) | Ch2 (“on your own roll in a local chase”); Ch6 (“approaches and the Draught included”) | both | B (Through the Gap ×2), G (the Draught), H | **Match.** The Caught read box is silent and five cards say “Never in a chase” (**L1**). |
| (8) Roll-offs for an Entity or a Duty | the castle’s two cues (`20-castle`) | Ch2 (both) | the Storyteller’s sheet | setup (three roll-offs) | **Match.** A tie isn’t covered anywhere (optional). |
| (9) Huge piece, one carrier caught | n/a: Hallowby’s mirror is Bulky | Ch4, Ch6 | | | n/a |
| (10) Hyde takes over even when an ability hid the Monster | the card (“his own or a friend’s”); Monster box (“even if an ability meant it added nothing”) | Ch2 The Draught (same words as the card) | | J; F (a chase show) | **Match.** |
| (11) Rolled towns | n/a | Ch8 | | | n/a |
| (12) Give up once the ground is read (Foundry) | Caught step 7 (“once the ground is read and before anyone rolls”); read box (“at the start of any round, before anyone rolls”) | Ch6 | both | A, F | **Match.** The no-roll give-up’s zero rise isn’t said outright (**L3**). |

### The eight cards against Chapter 2 and `module/config.mjs`

- `node book/tools/demo-pages.mjs --check` (read-only): “The one-shot’s generated pages match the game data.”
- Compared field by field with Chapter 2’s entries, all eight match:
  - the dice (both forms for Jekyll & Hyde);
  - the signature, and the default Gift (name and kind);
  - the default Perk (name and rule; Fear the Curse’s and Spectral’s new wording word for word);
  - the default Duty, the Weakness (name, timing and flavour) and the Tell.
- The Draught’s new sentence is word for word on the card, in Chapter 2 and in `config.mjs`.
- One intended difference, as before: Familiar’s Warning on the card leaves out “(Chapter 5)”.
- The help line on all eight carries today’s overdraw wording.

### Fixed-height cards

The cards are 4.28 inches high with `overflow: hidden` (`book/demo/demo.css`), so a long card would be cut, not spilled. Checks on `book/dist/Lantern_Night_in_Hallowby_v0.2.pdf` (built 05:15, after the last card edit at 00:56):
- **Text.** Every card paragraph’s first and last five words appear in pages 28–31. The only misses are the ability headings, whose right-hand “1 charge” / “always on” label extracts elsewhere.
- **Rendered pages.** Pages 28–31 were rendered at 90 dpi and **looked at, card by card**. Every card ends with its full help line (“…from your next roll instead).”) inside the double border, with a clear margin.
- The fullest is **the Ghost’s** (page 30): her Through the Wall carries the extra “Not while you carry…” sentence, and her help line ends about a quarter inch above the border. Jekyll’s (page 31) is next.
- The printer-friendly copy’s card text is word for word the same.

### The quick sheets (`docs/guides/quick-sheets/`)

Neither contradicts the one-shot or the rulebook on any of today’s changes. Each changed rule is stated as the rulebook states it:
- the five-player Limits;
- at most 11;
- 6 rounds, then Lead 2+;
- one overdraw a chase;
- the flight’s step down, once a flight;
- any ability as a raise on your own roll;
- give up once the ground is read, and the zero rise if no one has rolled;
- the roll-offs;
- Trouble at the Limit starting no local chase.

Notes:
- Player’s Rules: the missing word in “plus +2 an overdraw” (**L8**). “Abandon it any time” matches the rulebook; the one-shot is silent on abandoning while caught (O7, not from today).
- Storyteller’s Guide: “You: a d20, a d10 and two d6” is for the rulebook’s rolled towns. The one-shot needs only a d6. Not a contradiction.

### The run guide (`docs/guides/run-guide/guide.html`, at b4189d3)

**Rules lines.**
- The page numbers all match the current PDF (32 pages; Before You Play 4–5, the glance 6, Part One 7–10, Part Two 11–24, the places 13–18, When It Happens 19–24, the flight 25–26, Part Three 27, the cards 28–31, the tracker 32).
- “Suspicion reaches 3, 5, 7 or 8 (2, 4, 6 or 7 with five players)” and “When Suspicion reaches 9 (8 with five players)” are right.
- “In any chase, any ability can be spent as a raise … (in a local chase, on the runner’s own roll)” and “Trouble at a watched obstacle means caught, and a chase, unless it takes Suspicion to the Limit” are right.
- One line needs wording: the give-up and six-round line (**L5**).

**Foundry lines (not reported).** The guide was updated to 0.1.6 and the one-shot’s setup prompt while this check ran (b4189d3). The release and the portal zip become 0.1.6 after this round, so they are left to the lead. Its 0.1.6 lines agree with today’s rules:
- “Suspicion 0 of 9 (8 with five players)”;
- “Give up appears once the ground is rolled. It ends a local chase after round 6 by itself.”;
- “tick ‘A way in’ (so a Ghost walks through)”.

### HW4’s fixes, checked against the current text

All in place:
- H3: Trouble at the Limit starts no local chase (the Running a Turn cue and Caught’s first cue; played in D2).
- L1: the mirror box read without the Creature’s line (now a cue before the box).
- L2: the first-roll box’s “carrying the mirror unless you’re the Creature”.
- L3: “fleeing alone when the chase starts” (the Caught cue, steps 1 and 2, the Caught-together cue, both cards).
- HW4’s H1 and H2 (stale builds) were closed by v0.1.5 and the rebuilt PDFs. The normal one-shot PDF carries today’s text; the printer-friendly copy differs in one sentence’s phrasing (L7).

## 6. Table time

Method as in HW1 to HW4:
- read-aloud at about 140 words a minute (Part One’s boxes 1,243 words, Part Two’s opening 493, the flight 288);
- about 1 minute a roll (a flight round of five rolled together about 3), 1 minute a party decision and 1 minute a place read;
- 2 minutes for each stumble a finding describes.

| | Part One | Part Two | Part Three | Total |
|---|---|---|---|---|
| The session (five players) | 23 (9 reading, 5 choosing with two roll-offs and re-choices, 1 names, 5 practice for five, 3 Duties with a roll-off) | about 34 (3.5 reading, 5 place reads, 2 Tell checks with a reroll, 9 rolls and two Costs, 10 decisions, 2.5 lines, 2 for M1) | 3 | **about 60 min**, nearer 75 with a break |
| Branch C (the mirror and a five-runner flight) | 23 | about 32 to the flight, then about 15 (2 reading, 4 rounds of five) | 3 | about 73 min |
| Branch B’s chase and four-runner flight alone | | about 12 (3 chase rounds, 1 for L1, 3 flight rounds) | | |

The cover says 1½ to 2½ hours, and the run guide 1½ to 2. Five players add about 5 minutes to Part One and make each flight round longer. They don’t lengthen the raid, because more Entities split up and finish sooner (out on Turn 5 or 6 here, as the full-table playtests found). A smooth five-player night with no chase comes in at about an hour, and one with a five-runner flight at about 1¼ hours.

## Appendix: every roll

All from Math.random, through a small helper in a private scratch folder (not in the repository). Each line is one call, in order. “choice” rolls settled table decisions that could go either way. The bold rows mark where a branch begins and what was changed or stipulated there.

Notes on four calls:
- **R19**’s option 3–4 was written in two drafts within the one call. The last, the two groups (Dracula and the Mummy to the tavern; Jekyll, the Werewolf and the Invisible Man to the carpenter), is the one taken.
- **R45:** when the first branch row was written, the helper counted it as a roll, so the next roll was logged as R46. It was renumbered R45 at once, before any further roll; no roll was dropped or redone.
- **R166** rolled both possible second dice for a choice already made by R165 (the Monster). The d6 was ignored.
- In Branches A, B and F, the give-up call was rolled after the ground, as step 7 says, on a flat 6 (5–6 in B round 3). From F2 on, it was rolled only at Lead 1 (O6).

| # | What | Dice |
|---|---|---|
| R1 | Seat wishes, all at once (d8 card order: 1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Ghost 7 Witch 8 Jekyll & Hyde): Newcomer, Planner, Joker, Daredevil, Quiet One | d8 5 · d8 1 · d8 3 · d8 5 · d8 1 |
| R2 | Roll-off for the Invisible Man: Newcomer, Daredevil (high d6 keeps it) | d6 2 · d6 3 |
| R3 | Roll-off for Dracula: Planner, Quiet One (high d6 keeps it) | d6 5 · d6 2 |
| R4 | Choose again (d8; reroll 1, 3, 5 held): Newcomer, Quiet One | d8 5 · d8 4 |
| R5 | Newcomer chooses again (R4's 5 is held; d8, reroll 1, 3, 4, 5) | d8 8 |
| R6 | Duty wishes, after the read box (1-2 keep the card's, 3-4 Cook, 5-6 Handyman): Dracula (Butler), the Mummy (Librarian), Jekyll (Librarian) | d6 6 · d6 2 · d6 6 |
| R7 | Duty roll-off for Handyman: Dracula, Jekyll (high d6 keeps it) | d6 1 · d6 4 |
| R8 | Dracula picks another Duty (1-5 Cook, the one free Duty with an item; 6 back to Butler) | d6 3 |
| R9 | practice, Jekyll Charm d12 + Mask vs 8 | d12 3 · d6 2 |
| R10 | practice, Dracula Charm d12 + Mask vs 8 | d12 6 · d6 1 |
| R11 | practice, Mummy Wits d12 + Mask vs 8 | d12 7 · d6 2 |
| R12 | practice, Invisible Man Sly d12 + Mask vs 8 | d12 1 · d6 6 |
| R13 | practice, Werewolf Nimble d12 + Mask vs 8 | d12 11 · d6 5 |
| R14 | practice, Jekyll Charm d12 + Monster | d12 6 · d10 8 |
| R15 | practice, Dracula Charm d12 + Monster | d12 4 · d10 9 |
| R16 | practice, Mummy Wits d12 + Monster | d12 9 · d10 4 |
| R17 | practice, Invisible Man Sly d12 + Monster | d12 8 · d10 3 |
| R18 | practice, Werewolf Nimble d12 + Monster | d12 2 · d10 6 |
| R19 | T1 choice: party plan (1-2 all to the tavern; 3-4 split: Dracula+Mummy tavern, Werewolf florist, Jekyll carpenter, Invisible Man tailor... by Duty in two groups: Dracula+Mummy tavern, Jekyll+Werewolf+Invisible Man carpenter; 5-6 each to their Duty's place, the Mummy with Jekyll at the carpenter) | d6 3 |
| R20 | T1 Tell check, carpenter (Jekyll, Werewolf, Invisible Man arrive); second d6 picks who if it goes off (1-2, 3-4, 5-6) | d6 6 · d6 5 |
| R21 | T2 choice: tavern way in (1-3 goose yard, Dracula Sly d6->d8 by Cook, vs 6; 4-5 trapdoor, the Mummy Brawn d10 vs 8; 6 goose yard the loud way, Dracula Nimble d10->d12 by Cook) | d6 4 |
| R22 | T2 choice: carpenter way in (1-4 garden wall, the Werewolf Nimble d12 vs 8; 5-6 front door, the Invisible Man Sly d12 vs 8, watched) | d6 1 |
| R23 | T2 choice: Mask (1-4) or Monster (5-6) for the tavern roller, the carpenter roller | d6 5 · d6 4 |
| R24 | T2 Mummy, cellar trapdoor, Brawn d10 + Monster vs 8 (not watched) | d10 8 · d10 10 |
| R25 | T2 Werewolf, garden wall, Nimble d12 + Mask vs 8 (not watched) | d12 3 · d6 6 |
| R26 | T2 choice: Dracula at the back room (1-2 waits for the Mummy's Wits d12 next Turn; 3-4 Bat, 1 charge, Nimble d10->d12 by Cook; 5 Sly d6->d8 by Cook the loud way; 6 Wits d4->d6 by Cook) | d6 6 |
| R27 | T2 choice: Jekyll at the watchman, Wits d10->d12 by Handyman: Mask (1-4) or Monster (5-6); the Invisible Man (1-3 waits at the carpenter, 4-6 moves to the tailor) | d6 2 · d6 4 |
| R28 | T2 choice: Dracula Mask (1-5) or Monster (6) on Wits d6 | d6 3 |
| R29 | T2 Jekyll, night watchman, Wits d10->d12 (Handyman) + Mask vs 8 (watched) | d12 4 · d6 4 |
| R30 | T2 Dracula, back room, Wits d4->d6 (Cook) + Mask vs 8 (not watched) | d6 4 · d6 3 |
| R31 | T2 Dracula's Cost (1-2 Suspicion +1, 3-4 lose a Turn, 5-6 smaller die; drop is out) | d6 4 |
| R32 | T2 Tell check, tailor (the Invisible Man arrives alone) | d6 1 |
| R33 | T3 choices: Invisible Man at the tailor (1-2 Mrs Pinch Charm d6->d8 by Tailor; 3-4 Mrs Pinch Sly d12 the loud way; 5-6 window Nimble d8->d10 by Tailor); Werewolf (1-4 to the florist, 5-6 to the tailor); Jekyll with the hinges (1-2 to the florist, 3-4 to the tailor, 5-6 to the bridge); Mummy (1-3 to the tailor, 4-6 to the florist) | d6 4 · d6 3 · d6 4 · d6 1 |
| R34 | T3 choice: Invisible Man on Sly d12 loud (1-3 Mask, 4-5 Monster, 6 Unseen, 1 charge, Monster at no risk) | d6 5 |
| R35 | T3 Invisible Man, Mrs Pinch, Sly d12 the loud way (Tailor: d12 stays) + Monster vs 8 (watched) | d12 9 · d10 4 |
| R36 | T3 Tell check, florist (the Werewolf arrives alone) | d6 5 |
| R37 | T4 choices: Werewolf at the florist (1-5 drainpipe Nimble d12 vs 10, Gardener: stays d12; 6 crowd Sly d6->d8 by Gardener vs 8); at the tailor, after the count aloud (5 now; taken this Turn it makes 6, 7, out on Turn 6 at best, and a Tell at the bridge would make 8) (1-2 Jekyll tries the dog, 3-6 leave the mirror); Dracula with the wine (1-3 moves to the bridge, 4-6 moves to the tailor to join the others) | d6 4 · d6 5 · d6 1 |
| R38 | T4 choices: Werewolf on Nimble d12 (1-4 Mask, 5 Monster, 6 Good Dog, 1 charge); the tailor three (1-4 all move to the bridge now, arriving with Dracula; 5-6 wait at the tailor) | d6 2 · d6 3 |
| R39 | T4 Werewolf, drainpipe, Nimble d12 + Mask vs 10 (not watched) | d12 2 · d6 6 |
| R40 | T4 Werewolf's Cost (1-2 Suspicion +1, 3-4 lose a Turn, 5-6 smaller die; drop is out) | d6 4 |
| R41 | T4 Tell check, the way out (Dracula, Mummy, Jekyll, Invisible Man arrive: numbered 1-4, second d6 picks, reroll 5-6) | d6 6 · d6 6 |
| R42 | T4 Tell pick reroll (1 Dracula, 2 Mummy, 3 Jekyll, 4 Invisible Man; reroll 5-6) | d6 2 |
| R43 | T6 choice: way-out roller vs 6 (1-4 Invisible Man Sly d12; 5 Dracula Nimble d10; 6 the Mummy by Ancient Lore, Wits d12); Mask (1-5) or Monster (6) | d6 4 · d6 3 |
| R44 | T6 Invisible Man, the way out, Sly d12 + Mask vs 6 (watched) | d12 4 · d6 1 |
| | **Branch A: from Turn 6, R44 taken as Trouble (the Invisible Man caught at the way out carrying the cape; Suspicion 6 -> 7; mob 11; Lead 1; charges 3)** | |
| R45 | A chase round 1, ground | d6 4 |
| R46 | A round 1, after the ground: Invisible Man gives up (6) or runs (1-5); his roll (1-2 Wits d10 + Mask; 3-4 Through the Gap spent as a raise, Wits d10->d12 + Mask; 5 Unseen, Wits d10 + Monster at no risk; 6 Wits d10 + Monster) | d6 6 · d6 4 |
| R47 | A T7 choice: (1-4) the Invisible Man tries to slip free while the four wait at the bridge, or (5-6) the four cross now and leave him; his method (1-3 Sly d12 + Mask vs 10; 4-6 Through the Gap, 1 charge, Nimble d8 + Mask vs 8) | d6 6 · d6 2 |
| R48 | A T7 choice: way-out roller vs 6 (1-3 Werewolf Nimble d12; 4-5 the Mummy by Ancient Lore, Wits d12; 6 Dracula Nimble d10); Mask (1-5) or Monster (6) | d6 4 · d6 3 |
| R49 | A T7 Mummy, the way out, Ancient Lore (1 charge, 3->2): Wits d12 + Mask vs 6 (watched) | d12 6 · d6 1 |
| | **Branch B: from Branch A at R46, the give-up call taken as runs; R46's second die (4) stands: Through the Gap spent as a raise (3->2). Suspicion 7, mob 11, Lead 1** | |
| R50 | B round 1, rooftops: Invisible Man, Through the Gap as a raise (3->2), Wits d10->d12 + Mask vs 11 | d12 6 · d6 3 |
| R51 | B round 2, ground | d6 5 |
| R52 | B round 2, after the ground: gives up (6) or runs; his roll on Sly d12 (1-3 Mask, 4 Monster, 5-6 Unseen, 1 charge, Monster at no risk) | d6 3 · d6 4 |
| R53 | B round 2, parade: Invisible Man, Sly d12 + Monster vs 11 | d12 9 · d10 1 |
| R54 | B round 3, ground | d6 4 |
| R55 | B round 3, after the ground: gives up (5-6: Lead 1, best die a d8) or runs; his roll (1-3 Through the Gap as a raise, 2->1, cancels Flour: Wits d10 + Mask; 4 Wits d8 + Mask; 5 Wits d8 + Monster; 6 Unseen, Wits d8 + Monster at no risk) | d6 3 · d6 3 |
| R56 | B round 3, rooftops: Invisible Man, Through the Gap as a raise (2->1) cancels Flour: Wits d10 + Mask vs 11 | d10 1 · d6 6 |
| R57 | B flight round 1, ground | d6 5 |
| R58 | B flight R1 choices, parade: Dracula (1-3 spends Mesmerise as a raise on his Charm, cancelling Garlic: d12; 4-6 Charm d10); Mummy (1-3 spends Royal Bearing as a raise, Charm d8->d10; 4-6 Charm d8); Werewolf (1-2 own Good Dog as a raise, Sly d6->d8; 3-4 Jekyll's Doctor's Bag on his Sly, d8; 5-6 Sly d6) | d6 5 · d6 1 · d6 6 |
| R59 | B flight R1 Dracula, parade, Charm d12->d10 (Garlic) + Monster vs 10 | d10 2 · d10 6 |
| R60 | B flight R1 Mummy, parade, Royal Bearing as a raise (3->2), Charm d8->d10 + Monster vs 10 | d10 5 · d10 4 |
| R61 | B flight R1 Jekyll, parade, Charm d12 + Monster vs 10 | d12 12 · d10 6 |
| R62 | B flight R1 Werewolf, parade, Sly d6 + Monster vs 10 | d6 6 · d10 4 |
| R63 | B flight round 2, ground | d6 2 |
| R64 | B flight R2 choices, back alleys: Dracula (1-3 Bat as a raise, cancelling Garlic: Nimble d10; 4-6 Nimble d8); Mummy (1-4 Ancient Lore, Wits d12; 5-6 Sly d6); Jekyll (1-3 Doctor's Bag, Sly d8->d10; 4-6 Sly d8) | d6 6 · d6 6 · d6 2 |
| R65 | B flight R2 Dracula, back alleys, Nimble d10->d8 (Garlic) + Monster vs 10 | d8 3 · d10 3 |
| R66 | B flight R2 Mummy, back alleys, Sly d6 + Monster vs 10 | d6 3 · d10 9 |
| R67 | B flight R2 Jekyll, back alleys, Doctor's Bag (3->2), Sly d8->d10 + Monster vs 10 | d10 5 · d10 1 |
| R68 | B flight R2 Werewolf, back alleys, Nimble d12 + Monster vs 10 | d12 10 · d10 5 |
| R69 | B flight round 3, ground | d6 6 |
| R70 | B flight R3 choices, dead end: Dracula (1-3 Mesmerise as a raise, Brawn d8 with Garlic cancelled; 4-6 Brawn d6); Mummy (1-3 Ancient Lore as a raise, Wits d12 with Loose Thread cancelled; 4-6 Wits d10); Jekyll (1-2 the Draught to Hyde: Brawn d12->d10; 3-4 Doctor's Bag, Wits d10; 5-6 Wits d8); Werewolf (1-3 Keen Nose as a raise, Brawn d10; 4-6 Brawn d8) | d6 1 · d6 3 · d6 1 · d6 5 |
| R71 | B flight R3 Dracula, dead end, Mesmerise as a raise (3->2), Brawn d8 (Garlic cancelled) + Monster vs 10 | d8 6 · d10 5 |
| R72 | B flight R3 Mummy, dead end, Ancient Lore as a raise (2->1), Wits d12 (Loose Thread cancelled) + Monster vs 10 | d12 1 · d10 4 |
| R73 | B flight R3 Jekyll, the Draught (2->1) to Hyde, Brawn d12->d10 (A Familiar Face) + Monster vs 10 | d10 8 · d10 3 |
| R74 | B flight R3 Werewolf, dead end, Brawn d10->d8 (Hounds) + Monster vs 10 | d8 4 · d10 4 |
| | **Branch C: from Turn 4, R37's second die taken as 1-2 (Jekyll tries the guard dog at Suspicion 5, after the count aloud); the Werewolf's drainpipe (R39, R40) and Dracula's move to the bridge stand** | |
| R75 | C T4 choice: Jekyll at the dog, Charm d12 vs 10 (1-4 Mask, 5-6 Monster) | d6 5 |
| R76 | C T4 Jekyll, guard dog, Charm d12 + Monster vs 10 (watched; he carries the hinges) | d12 10 · d10 6 |
| R77 | C T4 choice, after the count aloud: take the mirror (1-4) or leave it (5-6); who takes it (1-2 Jekyll, 3-4 the Mummy, 5-6 the Invisible Man) | d6 3 · d6 4 |
| R78 | C T4 choices: the Mummy starts the two-Turn carry to the bridge now (1-5) or waits (6); the Invisible Man with the cape (1-3 moves to the bridge now, 4-6 walks with the Mummy, i.e. waits this Turn) | d6 4 · d6 6 |
| R79 | C T4 Tell check, the way out (Dracula arrives alone) | d6 6 |
| R80 | C T5 choice at 7 (the mirror makes 8 at the end of this Turn): abandon the mirror (1-3) or keep it and take the final flight (4-6) | d6 5 |
| R81 | C flight round 1, ground | d6 2 |
| R82 | C flight R1 choices, back alleys: Dracula (1-4 spends his own charge as a raise, Nimble d10 with Garlic cancelled; 5-6 Nimble d8); Mummy (1-4 Ancient Lore, Wits d12; 5-6 Sly d6); Jekyll (1-3 Doctor's Bag, Sly d10; 4-6 Sly d8) | d6 4 · d6 5 · d6 2 |
| R83 | C flight R1 Dracula, Bat as a raise (3->2), Nimble d10 (Garlic cancelled) + Monster vs 10 | d10 4 · d10 10 |
| R84 | C flight R1 Mummy (mirror), Sly d6 + Monster vs 10 | d6 6 · d10 8 |
| R85 | C flight R1 Jekyll, Doctor's Bag (3->2), Sly d8->d10 + Monster vs 10 | d10 7 · d10 8 |
| R86 | C flight R1 Invisible Man, Sly d12 + Monster vs 10 | d12 12 · d10 9 |
| R87 | C flight R1 Werewolf, Nimble d12 + Monster vs 10 | d12 7 · d10 1 |
| R88 | C flight round 2, ground | d6 4 |
| R89 | C flight R2 choice: Dracula (1-4 spends his own charge as a raise, Nimble d10 with Garlic cancelled; 5-6 Nimble d8) | d6 5 |
| R90 | C flight R2 Mummy (mirror), Wits d12 + Monster vs 10 | d12 1 · d10 7 |
| R91 | C flight R2 Hyde, Nimble d10 + Monster vs 10 | d10 1 · d10 2 |
| R92 | C flight R2 Invisible Man, Wits d10 + Monster vs 10 | d10 2 · d10 2 |
| R93 | C flight R2 Werewolf, Nimble d12 + Monster vs 10 | d12 6 · d10 5 |
| R94 | C flight R2 Dracula, Nimble d10->d8 (Garlic) + Monster vs 10 | d8 1 · d10 2 |
| R95 | C flight round 3, ground | d6 6 |
| R96 | C flight R3 choices (1-4 spends own charge as a raise, cancelling the Weakness; 5-6 not): Dracula Brawn d8, Mummy Wits d12, Hyde Brawn d12, Invisible Man Wits d10, Werewolf Brawn d10 | d6 1 · d6 5 · d6 6 · d6 3 · d6 5 |
| R97 | C flight R3 Dracula, Mesmerise as a raise (2->1), Brawn d8 (Garlic cancelled) + Monster vs 10 | d8 7 · d10 5 |
| R98 | C flight R3 Mummy (mirror), Wits d12->d10 (Loose Thread) + Monster vs 10 | d10 10 · d10 7 |
| R99 | C flight R3 Hyde, Brawn d12->d10 (A Familiar Face) + Monster vs 10 | d10 7 · d10 5 |
| R100 | C flight R3 Invisible Man, Through the Gap as a raise (3->2), Wits d10 (Flour cancelled) + Monster vs 10 | d10 1 · d10 8 |
| R101 | C flight R3 Werewolf, Brawn d10->d8 (Hounds) + Monster vs 10 | d8 2 · d10 5 |
| R102 | C flight round 4, ground | d6 6 |
| R103 | C flight R4 choices (1-4 spends own charge as a raise, cancelling the Weakness; 5-6 not): Dracula Brawn d8 (his last), Mummy Wits d12, Hyde Brawn d12, Invisible Man Wits d10, Werewolf Brawn d10 | d6 5 · d6 2 · d6 3 · d6 3 · d6 6 |
| R104 | C flight R4 Dracula, Brawn d8->d6 (Garlic) + Monster vs 10 | d6 4 · d10 7 |
| R105 | C flight R4 Mummy (mirror), Ancient Lore as a raise (3->2), Wits d12 (Loose Thread cancelled) + Monster vs 10 | d12 11 · d10 10 |
| R106 | C flight R4 Hyde, Doctor's Bag as a raise (2->1), Brawn d12 (A Familiar Face cancelled) + Monster vs 10 | d12 7 · d10 10 |
| R107 | C flight R4 Invisible Man, Unseen as a raise (2->1), Wits d10 (Flour cancelled) + Monster vs 10 | d10 6 · d10 5 |
| R108 | C flight R4 Werewolf, Brawn d10->d8 (Hounds) + Monster vs 10 | d8 1 · d10 4 |
| | **Branch D: from Branch C at R80 taken as 1-3 (the mirror abandoned at the bridge in Turn 5, Suspicion stays 7); Turn 6 the Werewolf arrives, then the way out at 7** | |
| R109 | D T6 choice: way-out roller vs 6 (1-3 Invisible Man Sly d12; 4-5 the Mummy by Ancient Lore, Wits d12; 6 Dracula Nimble d10); Mask (1-5) or Monster (6) | d6 2 · d6 2 |
| R110 | D T6 Invisible Man, the way out, Sly d12 + Mask vs 6 (watched) | d12 1 · d6 4 |
| | **Branch D2 (stipulated): R110 taken as Trouble, no show: Suspicion 7 -> 8, the Limit; no local chase; the final flight with all five, every charge at 3** | |
| R111 | D2 flight round 1, ground | d6 4 |
| R112 | D2 flight R1 choice: Dracula (1-3 spends one charge as a raise on his own Nimble, cancelling Garlic, and one on Jekyll's Wits d10->d12; 4-5 only on his own; 6 none) | d6 6 |
| R113 | D2 flight R1 Dracula, Nimble d10->d8 (Garlic) + Monster vs 10 | d8 1 · d10 2 |
| R114 | D2 flight R1 Mummy, Wits d12 + Monster vs 10 | d12 6 · d10 2 |
| R115 | D2 flight R1 Jekyll, Wits d10 + Monster vs 10 | d10 3 · d10 1 |
| R116 | D2 flight R1 Invisible Man, Wits d10 + Monster vs 10 | d10 4 · d10 9 |
| R117 | D2 flight R1 Werewolf, Nimble d12 + Monster vs 10 | d12 1 · d10 1 |
| | **Branch E (stipulated): D2's final flight replayed from round 1 with fresh rolls, Dracula at 0 charges (taken as spent earlier); the others at 3** | |
| R118 | E flight round 1, ground | d6 1 |
| R119 | E flight R1 choices: Dracula at 0 charges (1-3 overdraws Mesmerise as a raise on his Charm: d12 this roll, then a step down of its own from his next roll; 4-6 Charm d10 with Garlic); the Werewolf's Sly d6 (1-3 the Mummy spends Royal Bearing as a raise on it, d8; 4-6 nobody); the Mummy (1-3 Charm d8, 4-6 Sly d6) | d6 1 · d6 6 · d6 3 |
| R120 | E flight R1 Dracula, overdraw (Mesmerise as a raise), Charm d12 (Garlic cancelled) + Monster vs 10 | d12 8 · d10 2 |
| R121 | E flight R1 Mummy, Charm d8 + Monster vs 10 | d8 5 · d10 4 |
| R122 | E flight R1 Jekyll, Charm d12 + Monster vs 10 | d12 8 · d10 7 |
| R123 | E flight R1 Invisible Man, Sly d12 + Monster vs 10 | d12 11 · d10 10 |
| R124 | E flight R1 Werewolf, Sly d6 + Monster vs 10 | d6 4 · d10 1 |
| R125 | E flight round 2, ground | d6 3 |
| R126 | E flight R2 choices: Dracula (1-3 the Planner asks to overdraw again; 4-6 doesn't ask); a friend's raise on Dracula's Nimble (1-3 the Werewolf spends Keen Nose as a raise: one step back, d8; 4-6 nobody: d6); Jekyll (1-3 the Draught to Hyde, Brawn d12; 4-6 Nimble d6) | d6 5 · d6 5 · d6 6 |
| R127 | E flight R2 Dracula, Nimble d10->d6 (Garlic and the overdraw's step) + Monster vs 10 | d6 4 · d10 2 |
| R128 | E flight R2 Mummy, Brawn d10 + Monster vs 10 | d10 5 · d10 9 |
| R129 | E flight R2 Jekyll, Nimble d6 + Monster vs 10 | d6 5 · d10 2 |
| R130 | E flight R2 Invisible Man, Nimble d8 + Monster vs 10 | d8 5 · d10 2 |
| R131 | E flight R2 Werewolf, Nimble d12 + Monster vs 10 | d12 4 · d10 4 |
| R132 | E flight round 3, ground | d6 5 |
| R133 | E flight R3 choices: Dracula (1-3 the Planner asks to overdraw again; 4-6 doesn't); a friend's raise on Dracula's Charm d12->d8 (1-4 Jekyll's Doctor's Bag, d10; 5-6 nobody); own raises cancelling the Weakness (1-4 yes): Mummy Charm d8, Jekyll Charm d12, Invisible Man Sly d12, Werewolf Sly d6 | d6 6 · d6 1 · d6 5 · d6 4 · d6 3 · d6 2 |
| R134 | E flight R3 Dracula, Charm d12, two steps down, one cancelled by Jekyll's Doctor's Bag (3->2): d10 + Monster vs 10 | d10 4 · d10 5 |
| R135 | E flight R3 Mummy, Charm d8->d6 (Loose Thread) + Monster vs 10 | d6 6 · d10 3 |
| R136 | E flight R3 Jekyll, the Draught spent as a raise (2->1), Charm d12 (A Familiar Face cancelled) + Monster vs 10 | d12 4 · d10 4 |
| R137 | E flight R3 Invisible Man, Unseen as a raise (3->2), Sly d12 (Flour cancelled) + Monster vs 10 | d12 5 · d10 7 |
| R138 | E flight R3 Werewolf, Good Dog as a raise (3->2), Sly d6 (Hounds cancelled) + Monster vs 10 | d6 3 · d10 8 |
| R139 | E flight round 4, ground | d6 4 |
| R140 | E flight R4 choices: Dracula (1-3 the Planner asks to overdraw again; 4-6 doesn't); a friend's raise on Dracula's Nimble d10->d6 (1-4 the Mummy's Royal Bearing, d8; 5-6 nobody); own raises cancelling the Weakness (1-4 yes): Mummy Wits d12, Jekyll Wits d10 (his last), Invisible Man Wits d10, Werewolf Nimble d12 | d6 1 · d6 2 · d6 6 · d6 2 · d6 6 · d6 1 |
| R141 | E flight R4 Dracula, Nimble d10 two steps down, one cancelled by the Mummy's Royal Bearing (3->2): d8 + Monster vs 10 | d8 3 · d10 4 |
| R142 | E flight R4 Mummy, Wits d12->d10 (Loose Thread) + Monster vs 10 | d10 4 · d10 9 |
| R143 | E flight R4 Jekyll, Doctor's Bag as a raise (1->0), Wits d10 (A Familiar Face cancelled) + Monster vs 10 | d10 10 · d10 5 |
| R144 | E flight R4 Invisible Man, Wits d10->d8 (Flour) + Monster vs 10 | d8 1 · d10 1 |
| R145 | E flight R4 Werewolf, Keen Nose as a raise (2->1), Nimble d12 (Hounds cancelled) + Monster vs 10 | d12 12 · d10 7 |
| | **Branch F: from Turn 2, R29 taken as Trouble (Jekyll caught at the watchman, carrying nothing): Suspicion 3 -> 4; mob 10; Lead 1; charges 3. Each round: ground, then the give-up call (6 gives up; 5-6 at Lead 1 with no die over d8), then the roll: with charges, 1-4 spends one as a raise (second die 1-3 Doctor's Bag, 4-6 the Draught as a raise); at 0 charges, 1-3 overdraws as a raise (once); after an overdraw, 1-3 asks for another** | |
| R146 | F chase round 1, ground | d6 5 |
| R147 | F round 1, after the ground: Jekyll gives up (6) or runs; Charm d12 with Mask (1-4) or Monster (5-6) | d6 4 · d6 5 |
| R148 | F round 1, parade: Jekyll, Charm d12 + Monster vs 10 | d12 2 · d10 8 |
| R149 | F chase round 2, ground | d6 3 |
| R150 | F round 2, after the ground: Hyde gives up (6) or runs; Brawn d12 with Mask (1-2) or Monster (3-6, the chase already owes +2) | d6 6 · d6 2 |
| | **Branch F2: from Branch F at R150, the give-up call taken as runs; R150's second die (Mask) stands. From here the give-up call is rolled only at Lead 1 (6 gives up)** | |
| R151 | F2 round 2, market stalls: Hyde, Brawn d12 + Mask vs 10 | d12 1 · d6 2 |
| R152 | F2 chase round 3, ground | d6 4 |
| R153 | F2 round 3, after the ground: Hyde gives up (6, Lead 1) or runs; spends a charge as a raise on Nimble (1-4) or not (5-6); which (1-3 Doctor's Bag, 4-6 the Draught as a raise); Mask (1-2) or Monster (3-6, the chase already owes +2) | d6 5 · d6 5 · d6 3 · d6 2 |
| R154 | F2 round 3, rooftops: Hyde, Nimble d10->d8 (A Familiar Face) + Mask vs 10 | d8 1 · d6 4 |
| | **Branch G (stipulated): Hyde's local chase from F2, set at the start of round 5: Lead 2, mob 10, Hyde at 0 charges, the chase owes +2 (round 1's show), A Familiar Face in play. Suspicion 4 (the rise comes when it ends)** | |
| R155 | G chase round 5, ground | d6 3 |
| R156 | G round 5 choices (Lead 2, no give-up call): Hyde at 0 charges overdraws the Draught as a raise on Brawn, cancelling the Weakness (1-4) or not (5-6); Mask (1-2) or Monster (3-6, the chase already owes +2) | d6 4 · d6 5 |
| R157 | G round 5, market stalls: Hyde, overdraw (the Draught as a raise), Brawn d12 (Weakness cancelled) + Monster vs 10 | d12 6 · d10 10 |
| R158 | G chase round 6, ground | d6 6 |
| R159 | G round 6 choices: the Newcomer asks to overdraw again (1-4) or not (5-6); Mask (1-2) or Monster (3-6) | d6 1 · d6 6 |
| R160 | G round 6, dead end: Hyde, Brawn d12->d10 (A Familiar Face) + Monster vs 10 | d10 6 · d10 3 |
| | **Branch H (stipulated): Branch A at four players (the Werewolf's seat empty, Limit 9), Suspicion 7 before the way-out roll; the Invisible Man's Trouble makes 8; mob 8 + 4 = 12, at most 11; Lead 1; charges 3. Give-up call only at Lead 1 (6)** | |
| R161 | H chase round 1, ground | d6 1 |
| R162 | H round 1, after the ground: gives up (6) or runs; Sly d12 with Mask (1-3), Monster (4-5) or Unseen, Monster at no risk (6) | d6 2 · d6 2 |
| R163 | H round 1, crowded square: Invisible Man, Sly d12 + Mask vs 11 | d12 12 · d6 3 |
| R164 | H chase round 2, ground | d6 5 |
| R165 | H round 2, parade (Lead 2, no give-up call): Sly d12 with Mask (1-3), Monster (4-5) or Unseen, Monster at no risk (6) | d6 5 |
| R166 | H round 2, parade: Invisible Man, Sly d12 + (Mask d6 / Monster d10 per choice) vs 11 | d12 11 · d6 6 · d10 5 |
| R167 | H chase round 3, ground | d6 2 |
| R168 | H round 3 (Lead 3): Through the Gap as a raise cancelling Flour, Sly d12 (1-4) or Sly d10 (5-6); Mask (1-4) or Monster (5-6) | d6 4 · d6 3 |
| R169 | H round 3, back alleys: Invisible Man, Through the Gap as a raise (3->2), Sly d12 (Flour cancelled) + Mask vs 11 | d12 9 · d6 3 |
| | **Branch I (stipulated re-seat): the Quiet One's seat holds a Ghost instead of the Werewolf (Gardener); R25 stands as hers (Nimble d12); from Turn 3 (R33: to the florist; R36: her Tell, 4 -> 5), Spectral takes the pot at the crowd with no roll and no action; Turn 4 fresh from there (R37's second and third dice stand: the tailor three leave the mirror, Dracula to the bridge)** | |
| R170 | I T4 choices: the Ghost with the nightshade (1-4 moves to the bridge with the others, 5-6 waits a Turn); the tailor three (1-4 move to the bridge now, 5-6 wait) | d6 1 · d6 4 |
| R171 | I T4 Tell check, the way out (five arrive; second d6 picks 1-5, reroll 6) | d6 1 · d6 3 |
| R172 | I T5 choice: way-out roller vs 6 (1-3 Invisible Man Sly d12; 4-6 the Ghost Nimble d12); Mask (1-5) or Monster (6) | d6 1 · d6 3 |
| R173 | I T5 Invisible Man, the way out, Sly d12 + Mask vs 6 (watched) | d12 10 · d6 5 |
| | **Branch J: from Turn 2, R27's first die taken as: Jekyll takes the Monster with the Werewolf's Good Dog spent on his roll (the Werewolf 3->2); the watchman roll fresh (Suspicion 3)** | |
| R174 | J T2 Jekyll, night watchman, Wits d10->d12 (Handyman) + Monster under the Werewolf's Good Dog vs 8 (watched) | d12 8 · d10 9 |
