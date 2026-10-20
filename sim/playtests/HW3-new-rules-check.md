# HW3: Lantern Night in Hallowby, the new-rules check

*Agent playtest and read-aloud check, 2026-10-20, the day before Richard runs the one-shot for first-time players. It checks the text after the outside review’s rule package (Decisions log, 2026-10-19 and 2026-10-20) and the new Suspicion Limit of 9 (commit 5695ad2). Source at the table: only the one-shot, `book/demo/chapters/*.html` in filename order, with the cards (`60-pregens.html`) and the tracker (`70-tracker.html`). The rulebook (`book/src/chapters/*.html`, with `docs/CORE-RULES.md` 1.34) was used only for the rules check in section 5. Every random result is a real `node -e`-style roll (Math.random) through a helper kept outside the repository, numbered R1 onward and listed in the appendix. Table choices that could go either way were rolled too. The Storyteller read every box word for word and stopped wherever the text tripped or ran out. Each stop is a finding.*

---

## 1. Summary

Four Entities, chosen by a d8 each: **the Mummy** (Librarian, kept), **the Invisible Man** (Tailor), **Dracula** (Butler, kept) and **a Ghost** (Butler by default, but Dracula chose first, so the Ghost changed to Gardener). The session ran by the script with real dice and reached the final flight on Turn 5. It exercised a local chase with its single end rise, a capture, two tries at slipping free, the Limit and the flight with two Gifts spent as raises. What the dice didn’t reach was replayed in short, clearly marked branches. Each branch changes one roll or one choice (Branch F also sets Dracula’s charges to 0), and every roll after the branch point is fresh.

| Line | Branch point | What it exercised | Result | Suspicion at the end | Ends |
|---|---|---|---|---|---|
| **The session** | none | chase (+1 at its end), capture, slipping free (a Cost, then Trouble), the Limit from a slip, final flight, Gifts as raises | **Partial** (a Win, one step down for the Ghost left behind) | **9** | Turn 5, the flight escaped in 2 rounds |
| B | R53: the Mummy goes to the lock-up | a lock-up Tell at 8 | the flight starts, Turn 4 (not played on) | 9 | Turn 4 |
| C | R40: the Ghost gives up at the start of round 1 | a **give-up** with no rise; a second chase whose rise reaches 9; the cornered runner stays behind; flight | **Bust** (2 of 4, two left behind) | 9 | Turn 3, the flight escaped in 2 rounds |
| D | R38: the Ghost beats the dog | **the mirror** (counted aloud at 7, taken anyway), the two-Turn carry, a flight carrying it | **Grand Year** | 9 | Turn 4, the flight escaped in 2 rounds |
| E | B, with R68 (the lock-up Tell) as no Tell | a **rescue** (Success), the way out | **Win** | 8 | Turn 6, the way out |
| E2 | E, with R104: the Mummy rescues the loud way | **a rescue whose Suspicion reaches 9** still frees the captive, who joins the flight | the flight starts (not played on) | 9 | Turn 5 |
| F, F2, F3, F4 | Dracula at 0 charges (stipulated); F2, F3 and F4 each change one more roll or choice | **overdraw on top** outside a chase (F2) and inside one (F4); a **give-up** after the ground is read (F4) | fragments | 6, 6, 7, 8 | Turn 3 |
| G | stipulated: three held, the last free Entity caught | **everyone held**, on the same roll that reaches the Limit | **Forked** | 9 | Turn 7 |
| H | E, with R107: the Mummy rolls the way out the loud way | **the way out at the Limit** (result first) | out by the book, but the one-shot says both “Part Three” and “The Final Flight” | 9 | Turn 6 |

Across all lines: **6 local chases** (each rose once, at its end: +1, 0, +1, +1, +2 for an overdraw, +1), **2 give-ups**, **6 captures**, **2 rescues**, **2 overdraws**, **3 final flights played** (all escaped in 2 rounds), **3 Gifts spent as raises**. Table time for the session: **about 1 hour 20 minutes** (section 6).

What stood out:
- **The new rules read well at the table.** One chase, one rise was understood at once, and it changed play the way it should: the Ghost kept the Mask on because the Planner worked out that a showing Monster would make 9. Giving up was used twice for the reason it exists (C and F4). The rescue at the Limit (E2) and everyone held (the Captured cue in G) were settled by the text without a pause. No 11 is left anywhere in the one-shot, the cards or the tracker, and none of HW1’s 27 or HW2’s 28 fixes has come back.
- **One real rules gap, and it changes a night’s result.** The way out says “Turn to Part Three”, and the general cue says that whenever Suspicion reaches 9 the flight starts at once. The rulebook says the result comes first, so a party that gets out is out (H1). The rescue got this sentence in the package, but the way out (H1) and slipping free (M1) didn’t. It came up for real in Branch H.
- **The printer-friendly PDF of the one-shot still says 11** in nine places (H2). The normal PDF was rebuilt at 13:31 and says 9.
- **Everyone held at the very moment Suspicion reaches 9** sends the Storyteller two ways (M2): the Captured cue says Forked, while chase step 8 sends them to the final flight’s “Run for the castle. All of you” with nobody left to run.
- **The practice roll still names Difficulties easy, normal and hard** (M3), which the 2026-10-20 decision (R7) took out. And the run guide still lists the old Suspicion Rising numbers (M4).
- **At 8, every new watched place is a coin flip for the flight.** It decided Branches B and D. That isn’t a text error; see O2.

## 2. Setup and Part One

**Entities**, a d8 per seat (1 Dracula, 2 the Creature, 3 the Mummy, 4 the Werewolf, 5 the Invisible Man, 6 a Ghost, 7 a Witch, 8 Jekyll &amp; Hyde): R1 = 3 the Mummy (the Newcomer), R2 = 5 the Invisible Man (the Planner), R3 = 1 Dracula (the Joker), R4 = 6 a Ghost (the Daredevil). No repeats.

**Castle Duties.** Dracula and the Ghost both default to Butler. The cue (“the one who chose their Entity later picks another”) settled it at once, and the Ghost took **Gardener** (R5). The Planner suggested the Mummy swap from Librarian, and she didn’t (R6). Dracula kept Butler (R7). So only the Tailor and the Gardener have an item tonight, and the Ghost’s Spectral makes its Duty moot at the florist’s crowd.

**Practice** (R8 to R15, nothing counts), d12 + Mask against 8: the Mummy 11, the Invisible Man 3 (Trouble), Dracula 6 (a Cost), the Ghost 14. With the Monster, only Dracula’s showed (3 over 2). The Newcomer, with the tracker’s “Easy” in front of her, heard “An easy one is 6” and asked whether everything in an Easy town is a 6 (M3).

## 3. Turn-by-turn log

### The session

| Turn | What happened | Suspicion |
|---|---|---|
| 1 | Everyone goes to a different place (R16): the **Mummy** to the tavern (not watched), the **Invisible Man** to the tailor, **Dracula** to the carpenter, the **Ghost** to the florist. Four arrival boxes. Tell checks: florist 3, carpenter 4 (Dracula’s No Reflection), tailor 5 (the Invisible Man’s sneeze). The Ghost walks through the crowd by Spectral, with no roll and no action, and takes the **nightshade**. | 0 → **2** |
| 2 | **Mummy**, the trapdoor, Brawn d10 + Monster vs 8: 4+6 = 10, Success, but the Monster showed (6 over 4), +2. Read its line and the line for 3. **Invisible Man**, Mrs Pinch, **Unseen** (3 → 2), Charm d8 (Tailor) + Monster: 2+8 = 10, the **cape**; his Monster showed but adds nothing. **Dracula**, the front door by **Mesmerise** (3 → 2), Charm d12 + Monster vs 6: 9+8 = 17, no show (Hypnotic Eyes), and only he is past. The **Ghost** moves to the tailor with the nightshade. | 2 → **4** |
| 3 | **Mummy**, the back room, Wits d12 + Monster: 12+7 = 19, the **wine**. **Dracula**, the watchman, plain Wits d4 + Monster: 1+6 = 7, a Cost, and the Monster showed, +2 (the line for 5). He has the **hinges**. The Cost can’t be Suspicion +1 (the roll already raised it) or a dropped item (he holds only what the roll won), so: lose a Turn (R39). **Ghost**, the dog, Nimble d12 the loud way + Mask vs 10: 3+1 = 4, Trouble (one rise, +1; the line for 7). It’s watched, so the Ghost is caught, carrying the nightshade. | 4 → 6 → **7** |
| 3, chase | Lead 1, mob 8 + 3 = **11**, set for the whole chase. Cold Iron from round 1 (read its line). The Planner, hearing the Caught box: “If its Monster shows, that’s 9.” So the Mask throughout. Round 1, back alleys: Nimble d10 + Mask, 8+6 = 14, Lead 2. Round 2, back alleys again: **Chill** (3 → 2) cancels Cold Iron, d12: 2+6 = 8, Trouble, Lead 1. Start of round 3: the Daredevil asks whether running on can cost more. By the box, no: Trouble is already in, and with the Mask nothing bigger can come. Round 3, the festival parade: Sly d8, 1+6 = 7, Trouble, Lead 0, **cornered and captured**. The town takes back the nightshade. The chase ends and **rises once, +1** (the line for 8). | 7 → **8** |
| 3, rest | The **Invisible Man** moves to the bridge, the first back: Tell 1. | **8** |
| 4 | **Dracula** misses his go. The **Ghost** tries to slip free, Nimble d12 + Mask vs 10: 3+6 = 9, a Cost, so nothing happens. The **Mummy** moves to the bridge; the Invisible Man waits. | **8** |
| 5 | **Dracula** moves to the bridge. The **Ghost** tries again: 3+4 = 7, Trouble, Suspicion +1, no chase. **The Limit.** Stop mid-Turn: the final flight. | 8 → **9** |
| Flight | Runners: the Mummy (wine), the Invisible Man (cape), Dracula (hinges); the Ghost stays in the lock-up. Lead 2, escape 5, mob 10, Garlic from round 1. **Round 1**, the crowded square: the Mummy spends her **Gift, Royal Bearing, as a raise on Dracula’s roll** (3 → 2), so his Charm d10 goes back to d12. The Newcomer: “My card says ‘Never in a chase’.” The footer and the flight box settle it (L8). Mummy Charm d8 3+6 = 9 (a Cost), Invisible Man Sly d12 4+7 = 11, Dracula 5+4 = 9 (a Cost): 1 to 0, Lead 3. **Round 2**, the crowded square: Dracula spends **his Gift, Bat, as a raise** (2 → 1). Mummy 8+2 = 10, Invisible Man 10+8 = 18, Dracula 6+9 = 15: 3 to 0, **Lead 5, home**. | Lead 2 → 3 → 5 |
| Part Three | Home: the wine, the cape and the hinges; the nightshade was taken back. That’s a Win (the wine, one extra missing), one step down for the Ghost left behind: a **Partial**. Lines: Partial, then the nightshade. The goodnight stops at “spoons”, as the cue says. | |

### The branches

| Branch | What happened | Suspicion |
|---|---|---|
| **B** (R53 flipped: the Mummy goes to the lock-up on Turn 4) | The Invisible Man is coming too (R70), so the Tell check waits for both arrivals, as the cue says to ask. R68 = 4, and R71 picks the Mummy’s dust and spice. The Limit, mid-Turn 4, before any rescue. The Ghost stays held. Not played on. | 8 → **9** |
| **C** (R40 flipped: the Ghost gives up at the start of round 1) | Captured, no roll. The chase had no rolls, so it adds nothing (the Daredevil asked “does giving up still cost the one?”, L1). The nightshade is taken back. The **Invisible Man** tries the dog, Charm d8 (Tailor) + Mask vs 10: 5+2 = 7, Trouble, +1. He carries the cape, so Out of Sight doesn’t help, and he’s caught. Mob 8 + 4 = **12**. He runs (R75). Round 1, a dead end: Wits d10 + Mask, 1+3 = 4, Trouble, cornered. Captured, the cape taken; the rise is +1, so **the hunt starts once the chase is settled**, and he stays behind (step 8 read cleanly). Flight: the Mummy and Dracula. Round 1, the square: the Mummy spends **Royal Bearing as a raise on her own Charm** (d10), 9+2 = 11; Dracula Charm d10 3+9 = 12; Lead 4. Round 2, the rooftops: Mummy Wits 8+7 = 15, Dracula Nimble d8 6+8 = 14; Lead 6, home. The wine and the hinges: a Partial (2 of 4), two left behind, so two steps down, to Bust at the floor. | 7 → 7 → 8 → **9** |
| **D** (R38 flipped: the Ghost beats the dog, still the loud way) | Turn 3 goes 4, then 6 (Dracula), then 7. The cue’s count aloud: “7 now, and the mirror adds 1 at the end of every Turn until it’s out of town. That’s 9.” The Joker: “Then we run with it.” They take it (R87). The **Invisible Man** takes it (free) and the mirror box is read (its cue placed it right this time). His action starts the two-Turn carry. End of Turn 3: +1. Turn 4: he arrives when he acts, and the Mummy and the Ghost arrive too; Dracula misses his go. The way-out Tell is 6, and R89 picks the Mummy: **9**, the hunt, mid-Turn 4. Four run. The Invisible Man carries the mirror, so the Monster only and Nimble d6; he never needed Nimble. Round 1, the square: the Ghost spends Chill (Sly back to d10). Mummy Charm d8 **7+7 = 14, a Critical** (“You leave them standing”), Invisible Man 8+7 = 15, Dracula 2+1 = 3 (Trouble), Ghost 10+2 = 12: 4 to 1, Lead 4. Round 2, a dead end: Mummy Wits 3+10 = 13, Invisible Man Wits 5+10 = 15, Dracula Brawn d6 1+9 = 10, Ghost Wits d4 3+4 = 7 (Trouble): 3 to 1, Lead 6. Home with all four items and the mirror: a **Grand Year**. Dracula’s player asked whether his lost Turn made him sit out round 1 (L6). | 7 → 8 → **9** |
| **E** (B, with R68 as no Tell; R69 and R70 stand) | Turn 5: the **Invisible Man rescues**, Unseen (2 → 1), Sly d12 + Monster vs 10: 10+1 = 11. The Ghost is free and acts next Turn from the lock-up. The Mummy and Dracula move to the bridge; on Turn 6 the Ghost and the Invisible Man do. Dracula rolls the way out, Nimble d10 + Mask vs 6: 4+2 = 6. Out on Turn 6: the wine, the cape and the hinges, nobody left behind. A **Win**. | **8** |
| **E2** (E at Turn 5, R104 flipped: the Mummy rescues with Brawn d10, the loud way) | The Storyteller warns that the loud way alone makes 9; she goes ahead. Brawn d10 + Mask: 6+4 = 10, a Success, +1. The line “If this roll’s Suspicion reaches 9, they’re still free, and they join the final flight” settles it at once: the Ghost runs with the others. Not played on. | 8 → **9** |
| **F** (Turn 3, Dracula at 0 charges) | He chooses plain Wits d4 + Monster (R113): 3+5 = 8, a Success, and the Monster showed: +2. No overdraw. | 4 → **6** |
| **F2** (F, choice flipped: he overdraws Mesmerise) | Charm d12 + Monster vs 6: 8+7 = 15, no show (Hypnotic Eyes). The only rise is the overdraw, +2 on top of nothing. “+2 instead, on top of anything else that roll raises” was clear. The Cost list would have been a question (L5). | 4 → **6** |
| **F3** (F, R114 as Trouble with the Monster showing) | One rise for the roll, +2. Caught at 6, mob 11, Garlic. Round 1, a dead end: Brawn d6 + Mask, 5+1 = 6, Trouble, cornered. The rise is +1. No overdraw. | 6 → **7** |
| **F4** (F3 round 1, R119 flipped: he **overdraws Bat**) | Nimble d8 + Mask: 5+6 = 11, Success, Lead 2, and the chase now owes +2. Round 2, the rooftops: 8+2 = 10, a Cost, Lead 2. Round 3: the ground is read (the parade), and then the Planner: “You already owe 2. One Trouble and it’s 9.” Dracula **gives up** (R127) after hearing the ground (L2). He’s captured and the hinges are taken. The rise is 0 for its rolls, +2 for the overdraw (the lines for 7 and 8). The Captured box opens “Cornered in a local chase” (L3). The table asked whether he kept the hinges (L4). | 6 → **8** |
| **G** (stipulated: Turn 7, Suspicion 7, the Mummy, Dracula and the Ghost held; the Invisible Man’s rescue roll taken as Trouble) | Trouble, +1, so 8; caught, mob 12. He runs (R128). Round 1, the square: Sly d12 + Mask, 6+1 = 7, Trouble, cornered. Captured, and the rise, +1, makes **9 at the moment every Entity is held**. The Captured cue says Forked; chase step 8 says turn to The Final Flight (M2). **Forked.** Then the goodnight on a Forked night (L11). | 8 → **9** |
| **H** (E at Turn 6, R107 flipped: the Mummy rolls the way out) | She picks Brawn d10, her best, the loud way, and the Monster (R132): 3+5 = 8 vs 6, a **Success**, and the Monster showed (5 over 3). One rise, +2, stops at **9**. The result line says “You’re across … Turn to Part Three.” The general cue says “Whenever Suspicion reaches 9, stop wherever you are and turn to The Final Flight.” By the rulebook the party is out: a Win, against a final flight with a chance of Forked (H1). | 8 → **9** |

## 4. Findings

Severity: **high** = a wrong rule, a dead end, or something that would visibly trip the reader at the table; **medium** = would stall the table or confuse; **low** = polish. Files are in `book/demo/chapters/` unless marked. Replacement wording is exact. Each fix to the script also belongs in the Foundry Demo journal (`packs/_source/demo-journal/01-lantern-night.json`) and gets a row in `book/REVIEW.md`. The card footers come from `book/tools/demo-pages.mjs`.

| # | Sev | Passage (file) | What happened | Suggested fix |
|---|---|---|---|---|
| H1 | **high** | The way out, Success (`35-places.html`): “**Success or Cost:** You’re across, and the woods close behind you. (The Cost here costs nothing. Turn to Part Three.)” Against Running a Turn (`10-before.html`): “Whenever Suspicion reaches 9, stop wherever you are and turn to The Final Flight.” and What Raises Suspicion (`30-raid.html`): “when it reaches 9 the final flight starts at once.” Rulebook Chapter 5: “A roll’s result comes first, so if the roll that reaches the Limit gets the party out, it’s out” (decision R1, 2026-10-20). | Branch H: at 8, the Mummy barged across with Brawn, the loud way, and her Monster showed. A Success, and Suspicion 9. The script gives two instructions at once, and the one it states most firmly (twice, in bold places) is the wrong one. The flight could end Forked; by the book it’s a Win. Likely at the table: the sim’s mean Suspicion at the end of a Hallowby night is 7.1, the loud way is Brawn, and a Mummy or a Creature will want it. The rescue got this sentence in the package; the way out didn’t. | The way out: “(The Cost here costs nothing. Even if this roll takes Suspicion to 9, they’re out, and nobody runs. Turn to Part Three.)” Running a Turn: “Whenever Suspicion reaches 9, finish the roll’s result first, then stop wherever you are and turn to The Final Flight. If that roll got the party out of town, they’re out, and nobody runs.” (`30-raid.html` can then stay as it is.) |
| H2 | **high** | `book/dist/Lantern_Night_in_Hallowby_v0.2_printer-friendly.pdf` (built 03:35 on 20 October, before the Limit change at 13:24): “The Limit is 11.”, “Whenever Suspicion reaches 11, stop wherever you are”, “Easy: Suspicion Limit 11”, “when it reaches 11, the whole town comes after you”, “If it reaches 11”, “It never goes past 11”, “warn the players if that would reach 11”, “8–10: 12” (twice), “If this roll’s Suspicion reaches 11”, “When Suspicion reaches 11”, the tracker’s “(at 11, the final flight starts)”, and Suspicion Rising at 4, 7, 9 and 10. | Not a text error: a stale build. The normal PDF (`Lantern_Night_in_Hallowby_v0.2.pdf`) was rebuilt at 13:31 and says 9 throughout. The printer-friendly copy is the one made for printing, and it’s ignored by git, so nothing shows it’s out of date. Printed tomorrow, the table would play to 11 with a tracker that stops at 11. | Rebuild it (`node book/build.mjs --white`) before anyone prints, then the usual contact sheet and text diff. Check that the tracker page shows 0 to 9. |
| M1 | **medium** | Slipping free (`40-happens.html`): “**Success:** free, and acts again next Turn, from the lock-up.” The Final Flight’s cue (`45-flight.html`): “Captives stay in the lock-up.” Rulebook Chapter 5: the result comes first, and “captives it frees join the flight”. | The same class as H1. Not reached (the Ghost’s slips were a Cost and Trouble), but at 8 a captive who slips free with Brawn, the loud way, or with a showing Monster reaches 9 on a Success. The rescue says what happens; slipping free doesn’t, and the flight cue reads as “stays in the lock-up”. | “**Success:** free, and acts again next Turn, from the lock-up. If this roll’s Suspicion reaches 9, it’s still free, and it joins the final flight.” |
| M2 | **medium** | Caught, step 8 (`40-happens.html`): “If the rise brings Suspicion to 9, turn to The Final Flight once the chase is settled. A runner who escaped joins the flight; anyone cornered, or who gave up, is in the lock-up and stays there.” The Final Flight (`45-flight.html`) has no line for nobody left to run. | Branch G: the last free Entity was cornered, and the rise made 9. The Captured cue gets it right (“If every Entity is now in the lock-up, the night is over”), but its first sentence ends “stop here”. Step 8, the last line read during the chase, sends the reader to the flight, whose box says “Run for the castle. All of you, together, right now.” to a table whose monsters are all locked up. | Step 8, add: “If that leaves nobody outside the lock-up, nobody runs. Turn to Part Three, where the year is Forked.” The Final Flight’s first cue, add: “If every Entity is in the lock-up, nobody runs. Turn to Part Three, where the year is Forked.” |
| M3 | **medium** | A Practice Roll, read aloud (`20-castle.html`): “Every roll is against a number called the **Difficulty**. An easy one is 6 and a normal one is 8, while 10 is hard and 12 is very hard. Let’s say 8.” Decision R7 (2026-10-20): Difficulties are just numbers, and “Easy”, “Standard” and “Hard” mean only the town’s level. | Part One: the tracker on the table says “Easy”, and the Newcomer asked whether everything in an Easy town is a 6. The rulebook dropped these words for exactly this reason. | “Every roll is against a number called the **Difficulty**, a 6, 8, 10 or 12. The bigger it is, the harder the roll. Let’s say 8.” |
| M4 | **medium** | Run guide (`docs/guides/run-guide/guide.html`), the When It Happens table: “Suspicion reaches 4, 7, 9 or 10. Read its line.” The script’s lines are now at 3, 5, 7 and 8. | Proofreading. This is Richard’s own guide for tomorrow. At 9 the flight starts, and 10 can’t happen. (The guide’s Limit, its tricky-rules box and its page numbers are right: checked against the rebuilt PDF.) | “Suspicion reaches 3, 5, 7 or 8. Read its line.” |
| L1 | low | Caught, read aloud (`40-happens.html`): “Whatever happens, Suspicion goes up only once, when the chase is over: by 2 if your Monster showed at any point, by 1 if you had any Trouble.” | Branch C: the Ghost gave up before any roll, and the Daredevil asked whether giving up still cost the 1. In F4 the chase had a Success and a Cost. Heard aloud, “goes up only once” sounds as if it always goes up, and “by 2 … by 1” leaves both open. | “Suspicion doesn’t move until the chase is over. Then it goes up once: by 2 if your Monster showed at any point, or else by 1 if you had any Trouble, and not at all if neither.” |
| L2 | low | Caught, step 7 (`40-happens.html`): “A runner may also **give up** at the start of any round: captured, no roll.” Step 3 rolls the ground first. Accepted interpretation (Decisions log, 2026-10-20): “a runner gives up before anyone has rolled that round”. | Branch F4: the ground was read (the parade) before Dracula decided. Is that still “the start” of the round? | “… give up at the start of any round, once the ground is read and before anyone rolls: captured, no roll.” |
| L3 | low | Captured, first cue (`40-happens.html`): “Cornered in a local chase. The town takes back everything …” | Branches C and F4: the Storyteller came here from a give-up. | “Cornered in a local chase, or gave up. The town takes back everything …” |
| L4 | low | Caught, read aloud (`40-happens.html`): “And at the start of any round, you can give up and let them take you to the lock-up.” | Branch F4: the table asked whether Dracula kept the hinges if he gave up. The answer (no) comes only in the Captured box, after the choice. | “And at the start of any round, you can give up and let them take you, and everything you carry, to the lock-up.” |
| L5 | low | A Cost, cue (`40-happens.html`): “Never pick one that costs nothing right then, such as Suspicion +1 on a roll that already raised Suspicion”. Rulebook Chapter 3 has the same example. Accepted interpretation (2026-10-20): “‘Suspicion +1’ stays a Cost choice when a roll’s only rise is an overdraw”. | Branch F2: had the overdrawn Mesmerise been a Cost, the cue rules out Suspicion +1, but the overdraw goes on top, so the +1 would still cost. Change the book first (Chapter 3’s example), then the script. | Script: “… such as Suspicion +1 on a roll that already raised Suspicion (an overdraw’s +2 doesn’t count here, since it goes on top) …” Chapter 3: “… costs nothing on a roll that already raises Suspicion (not counting an overdraw, which goes on top) …” |
| L6 | low | A Cost, read aloud (`40-happens.html`): “You do it, but it takes forever. You miss your next go.” Rulebook Chapter 3: “If the hunt starts first, it lapses.” | Branch D: the hunt started while Dracula still owed his lost Turn, and his player asked whether he sat out the flight’s first round. | Add to the cue after the Cost table: “A lost Turn still owed when the final flight starts is forgotten.” |
| L7 | low | Your Powers, read aloud (`20-castle.html`): “That’s an **overdraw**, and it costs Suspicion +2 instead, on top of anything else that roll raises.” Card footers (`60-pregens.html`, generated): “overdraw: Suspicion +2 on top”. | Part One: “instead” and “on top” in one breath. On the card, “on top” of what? | Read box: “That’s an **overdraw**. Instead of a charge, it costs Suspicion +2, on top of anything else the roll raises.” Footer: “overdraw: Suspicion +2, on top of the roll’s other rise”. |
| L8 | low | The Final Flight, read aloud (`45-flight.html`): “Any ability can now be spent just to make someone’s trait die one size bigger, whatever it usually does.” Six cards’ approach abilities say “Never in a chase.” | The session, flight round 1: the Newcomer stopped at her card’s “Never in a chase” before spending Royal Bearing. The footer settled it, after a pause. | “… one size bigger, whatever it usually does, even if your card says it never works in a chase.” |
| L9 | low | Tracker, the Lead (`70-tracker.html`): “Local chase: start at 1, escape at 4, give up any round.” | Proofreading: the script says “at the start of any round”. | “… escape at 4, give up at the start of a round.” |
| L10 | low | The way out, Trouble (`35-places.html`): “(Suspicion +1, and the roller is caught in a local chase. Everyone can try again next Turn.)” Decision R4: the way out can be rolled once a Turn. | Not reached. The rule is only implied, and a player who hasn’t acted yet may ask to roll it at once. | “(Suspicion +1, and the roller is caught in a local chase. The way out can be rolled only once a Turn, so the party tries again next Turn.)” |
| L11 | low | How the Year Went, cue (`50-year.html`): “Then, unless the result is Forked, read one line for each item that didn’t come home. If the nightshade is one of them, end the goodnight’s first sentence at ‘spoons’.” | Branch G: on a Forked night the reader skips this cue, so the goodnight says a florist is wondering where the nightshade went, when the town has it all back. The everyone-held Forked is new, so this is new, not a return of HW2’s M7. | “… If the nightshade didn’t come home, or the year is Forked, end the goodnight’s first sentence at ‘spoons’.” |
| L12 | low | Suspicion Rising, cue (`40-happens.html`): “Read each line the first time Suspicion reaches or passes that number”. The line for 8: “One more thing, just one, and they’ll come for you.” | Not reached exactly (F4 jumped 6 to 8 and read the lines for 7 and 8, which was fine). A jump from 7 or less straight to 9 means “passes” calls for the line for 8 as the town comes. | “… reaches or passes that number. At 9, skip them and turn to The Final Flight.” |
| L13 | low | The Final Flight, cue (`45-flight.html`): “Stop wherever you are, even in the middle of a Turn or a chase. If it was a local chase’s rise that brought it, anyone who escaped that chase runs too, and anyone cornered in it is in the lock-up.” | Proofreading. Under one chase, one rise, nothing raises Suspicion while a chase runs, so the flight can’t start mid-chase (a leftover of the old rule). Step 8 also names the runner who gave up; this cue doesn’t. | “Stop wherever you are, even in the middle of a Turn. If it was a local chase’s rise that brought it, anyone who escaped that chase runs too, and anyone cornered in it, or who gave up, is in the lock-up.” |
| L14 | low | Credits (`01-credits.html`): no “Maps”, and the illustration credit ends “… until the game’s own illustrations are finished” with no full stop. The rulebook’s credits now have “Maps: Richard Moore” (decision of 2026-10-20) and a closing full stop. | Proofreading. The one-shot has Richard’s map of Hallowby. | Add `<dt>Maps</dt><dd>Richard Moore</dd>` after the design credit, and end the illustration credit with a full stop. |

In all, **2 high, 4 medium and 14 low** findings. Optional, not counted: the Monster cue’s “counts toward the chase’s one rise” (`40-happens.html`, new in the package) would be “towards” in British English, though Chapter 8 also says “toward”.

**Observations, no change proposed:**
- **O1. One night is not a balance sample.** This one ran hot: two Tells on Turn 1, two showing Monsters on Turn 2 and 3, and a chase made it 8 by the end of Turn 3. Five of the six lines played to an end reached the Limit. The simulator puts Hallowby at Limit 9 at a final flight in 26% of nights, a mean Suspicion at the end of 7.1, a Win or better 90.9% and Forked 1.5% (`sim/DEMO.md`, `sim/FINDINGS.md`). The flights here all escaped in two rounds.
- **O2. At 8, a new watched place is a coin flip for the flight.** A Tell check (4 to 6) brought the hunt in Branches B and D. The players never hear, in a read box, that arriving somewhere watched (the bridge and the lock-up included) can set off a Tell; they learn it on Turn 1 if a Tell goes off. With a Limit of 9 this matters more than it did at 11. A proposal for Richard, as wording of the existing rule: one sentence in How the Night Works, such as “The first time any of you goes somewhere watched, the bridge and the lock-up included, I roll to see if your Tell gives you away, and that’s Suspicion +1.”
- **O3. Giving up did its job.** In C it kept Suspicion at 7 instead of the session’s 8. In F4 it held 8 rather than risk 9. Every chase rose once, by +2 at most (the overdraw), against the old per-round rises.
- **O4. Gifts as raises were the flight’s main tactic** (R58, R64, R80). Players reached for them as soon as the box said so, and two of the three went on a friend’s roll or cancelled Garlic.
- **O5. The mirror at Limit 9.** Counted aloud at 7, it meant the flight (D), and the table took it anyway and won a Grand Year. The cue’s count and warning worked as written.

## 5. Rules check

Every rule the one-shot states, against `book/src/chapters` and `docs/CORE-RULES.md` (1.34). The new rules come first.

### The outside review’s package and the new Limit

| Rule (decision) | One-shot (file) | Rulebook | Verdict |
|---|---|---|---|
| One chase, one rise: once, at its end, by its biggest trigger (D1) | `10-before` Night in Numbers; `30-raid` cue; `40-happens` Caught box, step 5, Caught together, the Monster cue; `70-tracker` | Ch5 box, Ch6 | **Match.** Played six times. Read aloud, L1. |
| The local mob, set when the chase starts (D1) | `10-before`; `40-happens` step 2 (0–1: 8 · 2–3: 9 · 4–5: 10 · 6–7: 11 · 8: 12); `70-tracker` | Ch6, Ch8 | **Match.** The table stops at 8, right for a Limit of 9. |
| Giving up at the start of a round (D2) | `40-happens` box, steps 7 and 8, Caught together; `70-tracker` | Ch6 | **Match.** Timing against the ground L2; Captured cue L3; loot L4; tracker L9. |
| Overdraw +2 on top, in a chase on top of its one rise (D3) | `10-before` step 4; `20-castle`; `30-raid` first roll step 8, the table and cue; `40-happens` step 5 and the Overdraw cue; `70-tracker`; cards | Ch3, Ch5, Ch6 | **Match.** Played in F2 and F4. The Cost example, L5 (in the book too). |
| Final flight: any ability as a raise, one raise per roll (D6) | `45-flight` read box and step 3; `70-tracker`; cards | Ch2, Ch3, Ch6 | **Match.** An approach on a friend’s roll as a raise follows the accepted interpretation. L8. |
| Everyone held: the night ends, Forked (D7) | `40-happens` Captured cue and the dawn box; `50-year` | Ch6, Ch7 | **Match.** But step 8 and the flight page send the reader on to a flight with nobody in it: **M2**. |
| Result first: a rescue at the Limit still frees (R1) | `40-happens` rescue | Ch5 | **Match.** Played in E2. |
| Result first: the way out at the Limit (R1) | not said; `10-before` and `30-raid` say the flight starts at once | Ch5 | **Mismatch: H1.** Played in H. |
| Result first: slipping free at the Limit (R1) | not said; `45-flight` “Captives stay in the lock-up” | Ch5 | **Gap: M1.** |
| The way out once a Turn (R4) | `35-places` “Everyone can try again next Turn” (after Trouble) | Ch4 | Implied only: L10. |
| Difficulties are numbers only (R7) | `20-castle` practice: easy, normal, hard, very hard | Ch1, Ch3 | **Mismatch with the decision: M3.** |
| Furniture adds a Turn to any move (R20) | `35-places` the mirror box: two Turns | Ch4 | Match (every Hallowby move is one Turn). |
| No “killed” in Forked (R23) | `45-flight` Forked, `50-year` | Ch6, Ch7 | Match. The word appears nowhere. |
| The list and the furniture read before picks (R27) | `20-castle` order | Ch2 | Match. |
| Limit 9 on Easy (F12) | `10-before` (twice), `15-glance`, `20-castle`, `30-raid` (twice), `35-places`, `40-happens` (three), `45-flight`, `70-tracker` (0 to 9) | Ch5, Ch8, reference | **Match.** No 11 is left. Suspicion Rising at 3, 5, 7, 8 fits. The printer-friendly PDF (**H2**) and the run guide (**M4**) lag. |
| Clarifications of 2026-10-20 | the hunt mid-Turn ends it for those who haven’t acted (`45-flight` “Stop wherever you are, even in the middle of a Turn”); overdraw in the flight from your next roll (`45-flight` step 6); a smaller die on the next roll of any kind (`40-happens`); a Critical’s charge back (`40-happens`); several past at once choose (`35-places`); slipping free is the captive’s action (`40-happens`) | Ch3, Ch4, Ch6 | Match. A lost Turn lapsing at the hunt isn’t said (L6). A Spectral pass not picking the way in isn’t said, and doesn’t matter in Hallowby (the florist has no “Then”). |

### The rest, rechecked

| Area | One-shot | Rulebook | Verdict |
|---|---|---|---|
| Numbers | Easy; 4 items, 1 essential; 12 Turns; 3 charges; way out 6; lock-up 10; local Lead 1, escape 4; flight Lead 2, escape 5, mob 10 | Ch4, Ch6, Ch8 | Match. |
| Results, the Monster, Criticals | Success, Cost 1–2 short, Trouble 3+ short; doubles on a Success; the Monster higher than the trait die, +2 whatever the result, not on a tie, never the Mask; Hypnotic Eyes; Jekyll to Hyde; a Critical outside a chase gives a charge back, in a chase two Successes | Ch2, Ch3 | Match (the practice’s labels aside: M3). |
| Suspicion triggers | Trouble +1, Monster +2, the loud way +1 whatever the result, a Cost as Suspicion +1, a Tell +1, the mirror +1 each Turn end; one roll, one rise; never past 9 | Ch5 | Match. |
| Tells | the florist, carpenter, tailor, lock-up (not a captive) and the way out on coming back; once a night; after everyone moving there arrives; d6 4–6; a random arrival; Familiar’s Warning | Ch2, Ch5 | Match. |
| Ways in, beaten obstacles, group checks | picked at the first try, kept; beaten for all except a crowd and a way of your own; group check declared then rolled, one rise | Ch4 | Match. |
| Abilities, Castle Duty | four kinds (the Draught apart); before the roll; a friend’s roll in the same place, not in a local chase; one raise per roll, Duty included; netting, then d4 to d12; own approach 2 lower, only you, the way out and a rescue for all | Ch2, Ch3 | Match. |
| Costs | four; never one that costs nothing; never what the roll wins, never the mirror; the Mummy’s Perk; a Cost at the way out costs nothing | Ch3, Ch4, Ch8 | Match (L5 aside). |
| Local chase | inside the Turn; no dropping or handing over; the ground; Mask or Monster (the Monster only carrying); own abilities only; no Duty, no approach; Lead moves; Weakness round 1 or 3; escape back where caught; Night Runner; caught together by the majority rule | Ch6 | Match. |
| Captured, rescue, slipping free | everything taken and gone for the night; captives spend charges at the lock-up; rescue Sly or Brawn loud, 10, Success or Cost frees all; slip Sly, Nimble or Brawn loud, 10, Success only, Trouble +1 and no chase; Mesmerise works | Ch3, Ch6 | Match (M1 aside). |
| The way out | watched; everyone not held there; one roll for all; a Success or Cost gets everyone out; Trouble +1 and the roller caught | Ch4 | Match (H1, L10 aside). |
| Furniture | the gilt mirror, Bulky, behind the dog (10, watched); taking it free; no Mask, Nimble smaller, two-Turn moves; +1 each Turn end until out, lost or abandoned; set down any time but when caught | Ch4, Ch8 | Match. Played in D. |
| Final flight, dawn, the year | the Weakness as a new chase; overdraw the Weakness once, never while in play; drops stay in town; after Turn 12; Grand Year, Win, Partial, Bust, Forked; a step down per Entity left behind, never below Bust | Ch5, Ch6, Ch7 | Match. |
| Cards and tracker | every card’s dice (compared line by line) and every default Gift, Perk, Duty, Weakness and Tell; footers; the tracker’s numbers | Ch2 | Match. Card wording L7; tracker L9. No typos, straight quotes or em dashes in prose (the town key’s “—” marks an empty cell). |

**Mismatches:** H1 (the way out at the Limit) and M3 (the Difficulty words). Gaps: M1 (slipping free at the Limit) and M2 (everyone held at the Limit).

### HW1 and HW2 fixes, checked against the current text

All 27 HW1 fixes and all 28 HW2 fixes are still in place. The ones the package touched were rewritten correctly for the new rules: HW2 H1 (all captured loot gone for the night), M4 (the Captured cue now stops when the chase’s rise reaches 9), L15 (everyone held is now Forked) and the card footers (H4, now with “+2 on top”). Two edges of fixed passages are new, not returns: the goodnight cue on a Forked night (L11), and the Captured cue’s order when everyone is held at the Limit (M2).

## 6. Table time

Method as in HW1 and HW2: read-aloud at about 140 words a minute (Part One’s boxes are 1,221 words, Part Two’s opening 459, the flight 277), about 1 minute a roll, 1 minute a party decision, 1 minute a place read, and 2 minutes for each stumble a finding describes.

| | Part One | Part Two | Part Three | Total |
|---|---|---|---|---|
| The session | 22 (9 reading, 4 choosing and names, 4 practice, 3 Duties with the clash, 2 for M3) | 53 (3.5 reading, 5 place reads, 3 for four Tell checks, 13 rolls and the chase, 3 lines, 8 decisions, 10 for the flight, 4 stumbles, 3 tokens) | 3 | **about 78 min**, nearer 90 with a break |
| Branch D (the mirror, four in the flight) | 22 | about 55 | 3 | about 80 min |
| Branch C (two chases, a give-up) | 22 | about 55 | 4 | about 80 min |
| Branch E (a rescue, out on Turn 6) | 22 | about 50 | 3 | about 75 min |

The cover says 1½ to 2½ hours. A four-player night with a chase and a flight comes in at about 1 hour 20 minutes, 1½ hours with a break. The one-shot fits the lower end, as in HW2.

## Appendix: every roll

All from Math.random through a small helper in a private scratch folder (not in the repository). Each line is one call, in order. “choice” rolls settled table decisions that could go either way. The lines starting “---” mark where a branch begins and what was stipulated there. Three calls rolled both possible dice for a choice already settled by the roll before it, and the die that didn’t apply was ignored: R46 (Chill was spent, so the d12 counted, not the d10), R123 (the Mask was chosen, so the d6 counted, not the d10) and R133 (the Monster was chosen, so the second d10 counted, not the d6).

| # | What | Dice |
|---|---|---|
| R1 | Entity, seat 1 (d8: 1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Ghost 7 Witch 8 Jekyll) | d8 3 |
| R2 | Entity, seat 2 (d8: 1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Ghost 7 Witch 8 Jekyll) | d8 5 |
| R3 | Entity, seat 3 (d8: 1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Ghost 7 Witch 8 Jekyll) | d8 1 |
| R4 | Entity, seat 4 (d8: 1 Dracula 2 Creature 3 Mummy 4 Werewolf 5 Invisible Man 6 Ghost 7 Witch 8 Jekyll) | d8 6 |
| R5 | choice: Ghost’s new Duty (1–2 Cook, 3–4 Handyman, 5–6 Gardener) | d6 5 |
| R6 | choice: Mummy swaps from Librarian on the Planner’s advice (1–4 yes) | d6 6 |
| R7 | choice: Dracula keeps Butler (1–3) or swaps to a free list Duty (4–6) | d6 3 |
| R8 | practice, Mummy d12 + Mask vs 8 | d12 6 · d6 5 |
| R9 | practice, Invisible Man d12 + Mask vs 8 | d12 1 · d6 2 |
| R10 | practice, Dracula d12 + Mask vs 8 | d12 5 · d6 1 |
| R11 | practice, Ghost d12 + Mask vs 8 | d12 10 · d6 4 |
| R12 | practice, Mummy d12 + Monster | d12 3 · d10 2 |
| R13 | practice, Invisible Man d12 + Monster | d12 12 · d10 4 |
| R14 | practice, Dracula d12 + Monster | d12 2 · d10 3 |
| R15 | practice, Ghost d12 + Monster | d12 9 · d10 7 |
| R16 | T1 choice: party plan (1–2 all to the tavern, 3–4 split in pairs, 5–6 everyone to their own place) | d6 5 |
| R17 | T1 Tell check, florist (Ghost) | d6 3 |
| R18 | T1 Tell check, carpenter (Dracula) | d6 4 |
| R19 | T1 Tell check, tailor (Invisible Man) | d6 5 |
| R20 | T2 choice: Mummy’s way in (1–3 trapdoor Brawn d10 vs 8, 4–6 goose yard Sly d6 vs 6) | d6 2 |
| R21 | T2 choice: Mummy Mask (1–4) or Monster | d6 5 |
| R22 | T2 choice: Invisible Man’s way in (1–4 Mrs Pinch with Unseen, 5–6 the window) | d6 1 |
| R23 | T2 choice: Dracula’s way in (1–3 garden wall Nimble, 4–6 front door by Mesmerise) | d6 4 |
| R24 | T2 choice: Dracula Mask (1–3) or Monster | d6 4 |
| R25 | T2 choice: Ghost moves (1–2 tailor, 3–4 carpenter, 5–6 tavern) | d6 2 |
| R26 | T2 Mummy, trapdoor, Brawn d10 + Monster vs 8 | d10 4 · d10 6 |
| R27 | T2 Invisible Man, Mrs Pinch, Unseen, Charm d8 (Tailor) + Monster vs 8 | d8 2 · d10 8 |
| R28 | T2 Dracula, front door, Mesmerise, Charm d12 + Monster vs 6 | d12 9 · d10 8 |
| R29 | T3 choice: Mummy Mask (1–4) or Monster at the back room | d6 6 |
| R30 | T3 choice: Dracula at the watchman, Mesmerise (1–4) or plain Wits d4 (5–6) | d6 5 |
| R31 | T3 choice: at the tailor, go for the mirror now (1–4) or not | d6 3 |
| R32 | T3 choice: who tries the dog (1–3 Invisible Man Charm, 4–6 Ghost) | d6 5 |
| R33 | T3 choice: Dracula Mask (1–2) or Monster (3–6) on Wits d4 | d6 4 |
| R34 | T3 choice: Ghost at the dog (1–3 Charm d8 with Chill, 4–6 Nimble d12 the loud way) | d6 6 |
| R35 | T3 choice: Ghost Mask (1–3) or Monster | d6 3 |
| R36 | T3 Mummy, back room, Wits d12 + Monster vs 8 | d12 12 · d10 7 |
| R37 | T3 Dracula, watchman, Wits d4 + Monster vs 8 (watched) | d4 1 · d10 6 |
| R38 | T3 Ghost, guard dog, Nimble d12 loud + Mask vs 10 (watched) | d12 3 · d6 1 |
| R39 | T3 Dracula’s Cost (1–3 lose a Turn, 4–6 smaller die; Suspicion +1 and drop are out) | d6 1 |
| R40 | T3 Ghost chase, start of round 1: Daredevil gives up (6) or runs (1–5) | d6 4 |
| R41 | T3 Ghost chase round 1, ground | d6 2 |
| R42 | T3 Ghost chase round 1: spend Chill to cancel Cold Iron (1–3) or not | d6 4 |
| R43 | T3 Ghost chase round 1, back alleys, Nimble d10 (Cold Iron) + Mask vs 11 | d10 8 · d6 6 |
| R44 | T3 Ghost chase round 2, ground | d6 2 |
| R45 | T3 Ghost chase round 2: spend Chill (1–3) or not | d6 2 |
| R46 | T3 Ghost chase round 2, back alleys, Nimble + Mask vs 11 (d12 if Chill, else d10: roll d12 and d10, use the one that applies) | d12 2 · d10 2 · d6 6 |
| R47 | T3 Ghost chase, start of round 3: gives up (6) or runs (1–5) | d6 3 |
| R48 | T3 Ghost chase round 3, ground | d6 5 |
| R49 | T3 Ghost chase round 3: spend Chill (1–3) or not | d6 6 |
| R50 | T3 Ghost chase round 3, festival parade, Sly d8 (Cold Iron) + Mask vs 11 | d8 1 · d6 6 |
| R51 | T3 choice: Invisible Man (1–2 move to the bridge, 3–4 move to the lock-up, 5–6 wait at the tailor) | d6 2 |
| R52 | T3 Tell check, way out (Invisible Man first back) | d6 1 |
| R53 | T4 choice: Mummy (1–4 move to the bridge, 5–6 move to the lock-up) | d6 3 |
| R54 | T4 choice: Ghost tries to slip free (1–5) or waits (6) | d6 1 |
| R55 | T4 Ghost slips free, Nimble d12 + Mask vs 10 (watched, Success only) | d12 3 · d6 6 |
| R56 | T5 Ghost slips free, Nimble d12 + Mask vs 10 | d12 3 · d6 4 |
| R57 | Flight round 1, ground | d6 1 |
| R58 | Flight R1 choice: (1–2 Mummy spends her Gift Royal Bearing as a raise on her own Charm, 3–4 on Dracula’s Charm, 5–6 nobody spends) | d6 4 |
| R59 | Flight R1 Mummy, Charm d8 + Monster vs 10 | d8 3 · d10 6 |
| R60 | Flight R1 Invisible Man, Sly d12 + Monster vs 10 | d12 4 · d10 7 |
| R61 | Flight R1 Dracula, Charm d12 (Garlic, raised by Royal Bearing) + Monster vs 10 | d12 5 · d10 4 |
| R62 | Flight round 2, ground | d6 1 |
| R63 | Flight R2 choice: Mummy uses Ancient Lore to roll Wits d12 (1–3) or Charm d8 (4–6) | d6 4 |
| R64 | Flight R2 choice: Dracula’s Charm d10 (1–3 he spends his Gift Bat as a raise, 4 the Invisible Man spends Through the Gap on it, 5–6 nobody) | d6 1 |
| R65 | Flight R2 Mummy, Charm d8 + Monster vs 10 | d8 8 · d10 2 |
| R66 | Flight R2 Invisible Man, Sly d12 + Monster vs 10 | d12 10 · d10 8 |
| R67 | Flight R2 Dracula, Charm d12 (Garlic, raised by Bat) + Monster vs 10 | d12 6 · d10 9 |
| | **Branch B: from Turn 4, R53 taken as ‘Mummy moves to the lock-up’** | |
| R68 | B T4 Tell check, lock-up (Mummy arrives) | d6 4 |
| R69 | B T4 choice: Ghost slips free now (1–3) or waits for the rescue (4–6) | d6 5 |
| R70 | B T4 choice: Invisible Man waits at the bridge (1–4) or moves to the lock-up (5–6) | d6 5 |
| R71 | B T4 whose Tell (1–3 Mummy, 4–6 Invisible Man) | d6 3 |
| | **Branch C: from Turn 3, R40 taken as ‘the Ghost gives up at the start of round 1’** | |
| R72 | C T3 choice: Invisible Man (1–2 tries the dog for the mirror, 3–4 moves to the lock-up, 5–6 moves to the bridge) | d6 2 |
| R73 | C T3 choice: Invisible Man at the dog, Unseen + Monster (1–4) or Mask (5–6) | d6 6 |
| R74 | C T3 Invisible Man, guard dog, Charm d8 (Tailor) + Mask vs 10 (watched; he carries the cape) | d8 5 · d6 2 |
| R75 | C T3 IM chase, start of round 1: gives up (1–3) or runs (4–6) | d6 6 |
| R76 | C T3 IM chase round 1, ground | d6 6 |
| R77 | C T3 IM chase R1 choice: Unseen + Monster (1–4) or Mask (5–6) | d6 5 |
| R78 | C T3 IM chase round 1, dead end, Wits d10 + Mask vs 12 | d10 1 · d6 3 |
| R79 | C flight round 1, ground | d6 1 |
| R80 | C flight R1 choice: (1–2 Dracula spends Mesmerise as a raise on himself, 3–4 Mummy spends Royal Bearing as a raise on herself, 5–6 both) | d6 3 |
| R81 | C flight R1 Mummy, Charm d10 (raised by her Gift Royal Bearing) + Monster vs 10 | d10 9 · d10 2 |
| R82 | C flight R1 Dracula, Charm d10 (Garlic) + Monster vs 10 | d10 3 · d10 9 |
| R83 | C flight round 2, ground | d6 4 |
| R84 | C flight R2 choice: Dracula spends his Gift Bat as a raise (1–3) or not | d6 5 |
| R85 | C flight R2 Mummy, Wits d12 + Monster vs 10 | d12 8 · d10 7 |
| R86 | C flight R2 Dracula, Nimble d8 (Garlic) + Monster vs 10 | d8 6 · d10 8 |
| | **Branch D: from Turn 3, R38 taken as a Success (the loud way)** | |
| R87 | D T3 choice, after the count aloud (7 now, the mirror would reach 9): take the mirror anyway (1–3) or leave it (4–6) | d6 1 |
| R88 | D T4 Tell check, way out (Invisible Man, Mummy, Ghost arrive) | d6 6 |
| R89 | D T4 whose Tell (1–2 Invisible Man, 3–4 Mummy, 5–6 Ghost) | d6 3 |
| R90 | D flight round 1, ground | d6 1 |
| R91 | D flight R1 choice: Ghost spends Chill as its raise (1–3) or not | d6 1 |
| R92 | D flight R1 choice: Dracula spends Bat as a raise (1–3) or not | d6 5 |
| R93 | D flight R1 Mummy, Charm d8 + Monster vs 10 | d8 7 · d10 7 |
| R94 | D flight R1 Invisible Man, Sly d12 + Monster vs 10 | d12 8 · d10 7 |
| R95 | D flight R1 Dracula, Charm d10 (Garlic) + Monster vs 10 | d10 2 · d10 1 |
| R96 | D flight R1 Ghost, Sly d10 (Cold Iron, raised by Chill) + Monster vs 10 | d10 10 · d10 2 |
| R97 | D flight round 2, ground | d6 6 |
| R98 | D flight R2 choice: Dracula uses Bat to roll Nimble (1–3) or rolls Brawn d6 (4–6) | d6 6 |
| R99 | D flight R2 choice: Ghost’s Wits (1–3 its own Chill, 4 the Invisible Man spends his Gift Through the Gap as a raise on it, 5–6 nothing) | d6 5 |
| R100 | D flight R2 Mummy, Wits d12 + Monster vs 10 | d12 3 · d10 10 |
| R101 | D flight R2 Invisible Man, Wits d10 + Monster vs 10 | d10 5 · d10 10 |
| R102 | D flight R2 Dracula, Brawn d6 (Garlic) + Monster vs 10 | d6 1 · d10 9 |
| R103 | D flight R2 Ghost, Wits d4 (Cold Iron) + Monster vs 10 | d4 3 · d10 4 |
| | **Branch E: Branch B with R68 taken as no Tell (R69, R70 stand)** | |
| R104 | E T5 choice: rescuer (1–4 Invisible Man Sly d12, 5–6 Mummy by Ancient Lore Wits d12) | d6 1 |
| R105 | E T5 choice: Mask (1–3) or the Monster with Unseen (4–6) | d6 6 |
| R106 | E T5 Invisible Man rescues, Unseen, Sly d12 + Monster vs 10 (watched; carries the cape) | d12 10 · d10 1 |
| R107 | E T6 choice: way-out roller (1–4 Dracula Nimble d10, 5–6 Mummy Brawn d10 the loud way) | d6 4 |
| R108 | E T6 choice: Mask (1–4) or Monster (5–6) | d6 4 |
| R109 | E T6 Dracula, the way out, Nimble d10 + Mask vs 6 | d10 4 · d6 2 |
| | **Branch E2: Branch E at T5 with R104 taken as ‘the Mummy rescues, Brawn the loud way’** | |
| R110 | E2 T5 choice: the Ghost spends Chill on the Mummy’s Brawn (1–3) or not | d6 5 |
| R111 | E2 T5 choice: Mummy Mask (1–4) or Monster (5–6) | d6 4 |
| R112 | E2 T5 Mummy rescues, Brawn d10 the loud way + Mask vs 10 (watched) | d10 6 · d6 4 |
| | **Branch F: session Turn 3, Suspicion 4, Dracula stipulated at 0 charges** | |
| R113 | F T3 choice: Dracula overdraws Mesmerise (1–3) or rolls plain Wits d4 + Monster (4–6) | d6 4 |
| R114 | F T3 Dracula, watchman, Wits d4 + Monster vs 8 (watched) | d4 3 · d10 5 |
| | **Branch F2: as F, choice R113 taken as ‘overdraw Mesmerise’** | |
| R115 | F2 T3 choice: Mask (1–3) or Monster (4–6) | d6 6 |
| R116 | F2 T3 Dracula, watchman, Mesmerise by overdraw, Charm d12 + (Mask d6 / Monster d10 per choice) vs 6 | d12 8 · d10 7 |
| | **Branch F3: as F, R114 taken as Trouble with the Monster showing; Dracula at 0 charges** | |
| R117 | F3 chase, start of round 1: Dracula gives up (6) or runs (1–5) | d6 5 |
| R118 | F3 chase round 1, ground | d6 6 |
| R119 | F3 R1 choice: overdraw Bat to roll Nimble d8 (1–3) or Brawn d6 (4–6) | d6 5 |
| R120 | F3 R1 choice: Mask (1–3) or Monster (4–6) | d6 1 |
| R121 | F3 R1 Dracula, dead end, Brawn d6 (Garlic) + Mask vs 11 | d6 5 · d6 1 |
| | **Branch F4: F3 round 1 with R119 taken as ‘overdraw Bat’** | |
| R122 | F4 R1 choice: Mask (1–3) or Monster (4–6) | d6 3 |
| R123 | F4 R1 Dracula, dead end, Bat by overdraw: Nimble d8 (Garlic) + (Mask d6 / Monster d10 per choice) vs 11 | d8 5 · d6 6 · d10 3 |
| R124 | F4 round 2, ground | d6 4 |
| R125 | F4 R2 Dracula, rooftops, Nimble d8 (Garlic) + Mask vs 11 | d8 8 · d6 2 |
| R126 | F4 round 3, ground | d6 5 |
| R127 | F4 start of round 3: Dracula gives up (1–2) or runs with the Mask (3–6) | d6 2 |
| | **Branch G: stipulated T7, Suspicion 7, Mummy/Dracula/Ghost held; IM’s rescue taken as Trouble (8), mob 12** | |
| R128 | G chase, start of round 1: Invisible Man gives up (6) or runs (1–5) | d6 4 |
| R129 | G chase round 1, ground | d6 1 |
| R130 | G R1 choice: Unseen + Monster (1–3) or Mask (4–6) | d6 6 |
| R131 | G R1 Invisible Man, crowded square, Sly d12 + Mask vs 12 | d12 6 · d6 1 |
| | **Branch H: Branch E at T6 with R107 taken as ‘the Mummy rolls the way out, Brawn the loud way’** | |
| R132 | H T6 choice: Mummy Mask (1–4) or Monster (5–6) | d6 6 |
| R133 | H T6 Mummy, the way out, Brawn d10 the loud way + (Mask d6 / Monster d10 per choice) vs 6 | d10 3 · d6 5 · d10 5 |
