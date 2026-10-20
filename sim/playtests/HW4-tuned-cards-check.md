# HW4: Lantern Night in Hallowby, the tuned-cards check

*Agent playtest and read-aloud check, 2026-10-20, the evening before Richard runs the one-shot for first-time players. It checks the one-shot after the day’s Entity tuning (Decisions log, 2026-10-20, “The outside review’s Entity tuning”; `book/REVIEW.md` rows 102–106; the script edits in `git diff 1acbc98 -- book/demo/chapters/`): the Creature’s default Perk is now **Tireless**, the Mummy’s **Fear the Curse**, the Witch’s default Gift **A Potion for That**, and Dracula’s Wall-Crawler (not a default) makes his Nimble one size bigger in a chase. Source at the table: only the one-shot, `book/demo/chapters/*.html` in filename order, with the cards (`60-pregens.html`) and the tracker (`70-tracker.html`). The rulebook (`book/src/chapters/*.html`, with `docs/CORE-RULES.md` 1.35) was used only for the rules check in section 5. Every random result is a real `node -e`-style roll (Math.random) through a helper kept outside the repository, numbered R1 onward and listed in the appendix. Table choices that could go either way were rolled too. The Storyteller read every box word for word and stopped wherever the text tripped or ran out. Each stop is a finding. Method and format follow HW3.*

---

## 1. Summary

The party had to include the three tuned Entities. A d5 picked the fourth: **Jekyll & Hyde** (R1). The seats chose in turn: the Newcomer took **the Creature**, the Planner **the Mummy**, the Joker **the Witch** and the Daredevil **Jekyll & Hyde**. The session ran by the script with real dice and got everyone out on Turn 7 with a Grand Year, without a chase or a flight. So the changes were exercised in short, clearly marked branches. Each branch changes one roll or one choice (E and F2 are stipulated, as marked), and every roll after the branch point is fresh.

| Line | Branch point | What it exercised | Result | Suspicion at the end | Ends |
|---|---|---|---|---|---|
| **The session** | none | **A Potion for That** at the guard dog (Wits instead of Charm or Nimble); the Creature takes and carries the mirror (the mirror box against the **Tireless** card); the way out | **Grand Year** | 6 | Turn 7, the way out |
| A | R46: the Mummy’s way-out roll is Trouble | **Fear the Curse** fleeing alone (mob 11 → 10); a give-up; the mirror’s end-of-Turn rise to 9; the final flight **carrying the mirror**; Hedge Spell on her own roll in the flight | **Bust** (a Partial, one step down for the Mummy left behind) | 9 | Turn 7, the flight escaped in 2 rounds |
| B | R43: the Mummy tries the florist | three arriving with Familiar’s Warning; a **group check** (both through) | **Grand Year** | 8 | Turn 8, the way out |
| C | B, R82: the Creature rolls the way out | a **normal roll while carrying** (Nimble d8 by Tireless, the Monster only); the result first at 9 | **Grand Year** | 9 | Turn 8, out (nobody runs) |
| D | C, R84 as Trouble | **Trouble at a watched obstacle that makes 9**: the Storyteller runs a local chase (H3); a give-up loses the mirror | the flight starts without the Creature (not played on): a **Partial** at best | 9 | Turn 8 |
| D2 | D, R85: straight to the flight | the rulebook’s reading; the final flight **carrying the mirror** with four | **Grand Year** | 9 | Turn 8, the flight escaped in 2 rounds |
| E | stipulated from B: the Creature caught at the way out at 7 | a **local chase while carrying** (no Mask, Nimble not smaller), Fire, a free overdraw passed up, a give-up | the flight starts without the Creature (not played on) | 9 | Turn 8 |
| F | B, R78: the Witch’s Hedge Spell on Jekyll | **Hedge Spell on a friend’s roll** in a group check; the Mummy’s Cost can now be a lost Turn | not played on | 7 | Turn 7 |
| F2 | F, the group check stipulated as Trouble for both | **caught together** (no Fear the Curse); a give-up leaves the Mummy **fleeing alone** (L3); a nine-round chase | the flight starts (not played on) | 9 | Turn 7 |

Across all lines: **4 local chases** (one, D, shouldn’t have run by the book), **4 give-ups**, **1 escape**, **4 captures** (all by giving up), **2 final flights played** (both escaped in 2 rounds), **3 group checks**, **A Potion for That** spent once at an obstacle, **Hedge Spell** twice (once on a friend’s roll), **Brute Force** five times, **2 Criticals** in flights. Table time for the session: **about 1 hour** (section 6).

What stood out:
- **The changed defaults read clearly at the table.** Tireless was understood from the card and the Part One cue. Caught step 3 (“though not the Creature’s”) and the flight’s step 3 (“not the Creature’s: it’s Tireless”) were read in every round of two chases and two flights without a pause. Fear the Curse was applied straight from the Caught cue and step 2 (Branch A: mob 10, not 11), and the Caught-together cue settled at once that it doesn’t apply to two runners (F2). A Potion for That at the guard dog went through without a question (main session), and so did Hedge Spell on a friend’s roll in a group check (F). Nothing a player hears in Part One contradicts the new cards (section 2).
- **Two small stalls on the changes, both low.** The mirror box, read aloud, tells the Creature’s player “your Nimble is one size smaller” before the grey cue says it isn’t (L1). And when the other runner gives up, nothing says whether the Mummy, now fleeing alone, gets Fear the Curse; the ruling decided a roll in F2 (L3).
- **The builds lag the source.** The Foundry release Richard is told to install, 0.1.4, was tagged at 13:53, before the tuning (18:43). Its Demo Entities still carry Strong Back, Patience of Ages and Broomstick, and its Demo journal the old cues (H1). Every PDF in `book/dist` was built before the tuning too. The normal one-shot and rulebook PDFs were rebuilt during this check and are now right, but the printer-friendly copies still print Strong Back, Patience of Ages and Broomstick on the cards (H2). The source files (script, cards, packs, config) are all right.
- **One rules gap, not from today’s tuning, that changed a night’s result (H3).** At 8, Trouble at a watched obstacle makes 9 and gets the roller “caught in a local chase”. Running a Turn says “finish the roll’s result first, then stop … and turn to The Final Flight”, which reads as “run the local chase first”. The rulebook, Foundry and the simulator all go straight to the flight. In Branch D the chase cost the Creature and the mirror: a Partial, where the book’s reading (D2) came home with a Grand Year.

## 2. Setup and Part One

**Entities.** The fourth Entity by d5 among the other five (1 Dracula, 2 the Werewolf, 3 the Invisible Man, 4 a Ghost, 5 Jekyll & Hyde): R1 = 5, **Jekyll & Hyde**. Seats chose in order (R2 to R4): the Newcomer **the Creature**, the Planner **the Mummy**, the Joker **the Witch**, the Daredevil **Jekyll & Hyde**.

**Castle Duties.** Jekyll’s default Librarian clashes with the Mummy’s, and Jekyll chose later, so he picks another: **Butler** (R5). The Planner notices the Librarian has nothing to buy tonight and swaps the Mummy to **Gardener** (R6, R7). So: Creature Handyman (the hinges), Mummy Gardener (the nightshade), Witch Cook (the wine), Jekyll Butler (nothing). The clash cue settled it at once.

**Practice** (R8 to R15, nothing counts), d12 + Mask against 8: the Creature 3 + 3 = 6 (a Cost; doubles, but not on a Success, so no Critical, as the box says), the Mummy 7 (a Cost), the Witch 15, Jekyll 4 (Trouble). With the Monster, the Creature’s (9 over 7) and Jekyll’s (7 over 3) showed, and Jekyll stayed Jekyll, as the cue says.

**Part One read against the new cards** (the brief’s fourth check):
- *Choosing Your Monster.* “**Frankenstein’s Creature,** the strongest. It breaks what others pick, and it can carry furniture like nobody else.” The card has Brute Force (“it breaks what others pick” is its flavour line) and Tireless. With Strong Back the line over-promised for a Bulky mirror, which is why the old “If asked” cue was needed. With Tireless it’s accurate: the Creature carries the mirror without the Nimble penalty, and nobody else does. The Newcomer chose the Creature partly on this line and carried the mirror in every line where it was taken. No contradiction.
- “**The Mummy,** the cleverest. It’s three thousand years old and remembers every trick. Please don’t tug at its loose threads.” Wits d12, Ancient Lore, A Loose Thread. The Perk isn’t mentioned, so nothing contradicts Fear the Curse.
- “**A Witch,** the best friend to have at your elbow, because her spell makes anyone’s roll better. Her black cat warns her when someone is watching.” Hedge Spell and Familiar’s Warning, both still on the card. The new Gift isn’t mentioned; nothing contradicts it. (“The cleverest” is the Mummy’s, though the Witch’s Wits is also a d12. That was so before today.)
- The cue after the introductions: “If asked: the Werewolf’s very large dog costs a charge. Tonight’s mirror is Bulky, so anyone can carry it, and the Creature’s Tireless means carrying it doesn’t make its Nimble smaller.” Asked by the Newcomer (“what does Tireless do?”), and answered word for word. It matches the card.
- *Your Card*, *Your Powers*, *Castle Duties.* Nothing names a Perk or a Gift. “Or it lets you roll a different trait” covers A Potion for That, and the Joker found her Gift in that sentence. “Tonight, keep the Gift and Perk your card shows” keeps Wall-Crawler (not on Dracula’s card) out of the night.

## 3. Turn-by-turn log

### The session

| Turn | What happened | Suspicion |
|---|---|---|
| 1 | All four go to the tavern (R16). Nothing there is watched, so no Tell check. | 0 |
| 2 | The trapdoor (R17): the **Creature**, Brawn d12 + Mask vs 8: 2 + 4 = 6, a Cost. The trapdoor has no Cost line, so the Success line, then A Cost. Suspicion +1, a lost Turn and a smaller die are all live (it carries nothing, so no drop): **lose a Turn** (R20). The **Witch**, the back room, Wits d12 + Mask (Cook can’t raise a d12): 12 + 6 = 18, the **wine**. The **Mummy** moves to the carpenter (R23), **Jekyll** to the tailor (R24). Tell checks: carpenter 5, the Mummy’s dust and spice; tailor 3. | 0 → **1** |
| 3 | The **Creature** misses its go. The **Mummy**, the garden wall, Brawn d10 the loud way + Mask: 9 + 2 = 11, its loud Success line, +1. **Jekyll**, Mrs Pinch, Charm d12 + Monster: 8 + 4 = 12, no show: the **cape**. The **Witch** moves to the tailor with the wine. | 1 → **2** |
| 4 | The **Creature** moves to the carpenter to back the Mummy up (R33). The **Mummy**, the watchman, Wits d12 + Mask: 7 + 5 = 12, the **hinges**. Jekyll and the Witch wait at the tailor for the Creature (R35, R37). | **2** |
| 5 | The **Creature** and the **Mummy** move to the tailor. The **Witch** tries the dog herself with **A Potion for That** (3 → 2), Wits d12 instead of Charm or Nimble, with the Monster (R40): 6 + 9 = 15, a Success, and the Monster showed (9 over 6), +2. Read her Monster line and the line for 3. The Planner, before the roll: “She’s carrying the wine into a watched place.” The Joker went anyway. Before the mirror is taken, the count aloud: “4 now, 5 at the end of this Turn, 6 at the next, out on Turn 7.” The **Creature** takes it (free, R42), and the mirror box is read. At “your Nimble is one size smaller” the Newcomer stops: “My card says Tireless.” The cue under the box settles it (L1). She asks whether Tireless also saves the second Turn of each move; the cue’s “the rest still applies” settles that. The Planner sees that the wine and two others make a Win and the mirror a Grand Year, so they skip the nightshade (R43). **Jekyll** moves to the bridge, the first back: Tell 3. End of the Turn: the mirror +1 (the line for 5). | 2 → 4 → **5** |
| 6 | The **Creature** starts the two-Turn carry to the bridge. The **Mummy** and the **Witch** move to the bridge; Jekyll waits. End: the mirror +1. | 5 → **6** |
| 7 | The **Creature** arrives, as its action. The **Mummy** rolls the way out with **Ancient Lore** (3 → 2), Wits d12 + Mask vs 6: 10 + 3 = 13. Across. | **6** |
| Part Three | Home: the wine, the hinges, the cape and the mirror. A Win (one of the three missing), with the mirror: a **Grand Year**. Lines: Grand Year, then the nightshade’s; the goodnight stops at “spoons”, as the cue says. | |

### The branches

| Branch | What happened | Suspicion |
|---|---|---|
| **A** (R46 taken as Trouble: the Mummy caught alone at the way out) | Trouble +1, and “the roller is caught in a local chase”. The Caught cue: “with the Mummy’s Fear the Curse, fleeing alone, the mob is 1 lower”, and step 2: Suspicion 7 makes 11, “With the Mummy’s Fear the Curse, fleeing alone, 1 lower”: **10**. Read without a pause. Round 1, the rooftops: Wits d12 + Mask, 12 + 2 = 14, Lead 2. Round 2, the square: Ancient Lore (2 → 1), 7 + 6 = 13, Lead 3. Round 3, the square, A Loose Thread (read its line): Charm d6 + Mask, 1 + 5 = 6, Trouble, Lead 2. Start of round 4, the parade: she **gives up** (R59), and the hinges are taken. The rise, +1 (the line for 8). Against 11, all three rolls would have ended the same. Then the count: the mirror makes 9 at the end of this Turn. They keep it (R61); the Witch and Jekyll can’t roll the way out again this Turn. End of Turn 7: **9**. **Flight:** the Creature (the mirror), the Witch (the wine), Jekyll (the cape). Round 1, a dead end: Creature Brawn d12 11 + 10 = 21, Witch Wits d12 9 + 8 = 17, Jekyll Wits d10 raised by Doctor’s Bag (3 → 2) 7 + 6 = 13: Lead 4. Round 2, the market stalls: the Creature, Brawn d12 5 + 5 = 10, a **Critical** (“You leave them standing”); the Witch, Hedge Spell (2 → 1) on her own Brawn d6, 8 + 2 = 10; Jekyll, Doctor’s Bag (2 → 1) on Nimble d6, 5 + 6 = 11, and his Monster showed, so Hyde takes over: **home**. The wine, the cape and the mirror; the hinges were taken. 2 of 4 is a Partial (the mirror counts only on a Win), and one step down for the Mummy left behind: **Bust**. | 6 → 7 → 8 → **9** |
| **B** (R43 taken as “the Mummy tries the florist, the rest head for the bridge”) | Jekyll and the Witch go with her (R73). Jekyll waits a Turn to arrive with the Witch (R74), for Familiar’s Warning. End of Turn 5: 5. Turn 6: the Creature starts the carry; the three arrive at the florist: Tell 2 (the second d6 isn’t needed). End: 6. Turn 7: the Creature arrives at the bridge, the first back: Tell 6, its head and shoulders, +1 (the line for 7). At the florist, a **group check** (R77), declared first: the Mummy by Ancient Lore (3 → 2), Wits d12 + Mask 11 + 1 = 12; Jekyll Sly d8 + Mask 7 + 1 = 8. Both through; the Mummy takes the pot. The Witch moves to the bridge. End: the mirror, 8 (the line for 8). Turn 8: the Mummy and Jekyll arrive; the Witch rolls the way out, Sly d10 + Mask vs 6: 3 + 5 = 8. Out with everything: **Grand Year**. | 4 → 7 → **8** |
| **C** (B at Turn 8, R82 taken as 6: the Creature rolls the way out) | It carries the mirror, so the Monster only; its Nimble stays a d8 (Tireless), which the Newcomer read off her card without asking. Nimble d8 + Monster vs 6: 3 + 9 = 12, a Success, and the Monster showed (9 over 3), +2 → 9. The way out’s line: “Even if this roll takes Suspicion to 9, they’re out, and nobody runs.” Settled at once. **Grand Year**. | 8 → **9** |
| **D** (C, with R84 taken as Trouble, no show) | Trouble +1 → 9, and the Trouble line: “the roller is caught in a local chase”. Running a Turn: “Whenever Suspicion reaches 9, finish the roll’s result first, then stop wherever you are and turn to The Final Flight.” The Storyteller stops, then reads “finish the roll’s result” as “run the chase” (R85, H3). Step 2’s list stops at 8, so the mob is worked out by hand: 8 + 4 = 12. Round 1, the crowded square (Sly d6, Charm d4, or Brute Force for Brawn): the Newcomer **gives up** (R87). Captured, and the town takes the mirror. No rolls, no rise; Suspicion is 9 anyway. The flight starts with the Mummy, the Witch and Jekyll (not played on). If they escape, a Win, one step down for the Creature: a **Partial** at best. | **9** |
| **D2** (D, with R85 taken as “straight to the flight”, the rulebook’s reading) | Four run, the Creature carrying (the Monster only; step 3: “not the Creature’s: it’s Tireless”). Round 1, the parade: the Creature, Brute Force (3 → 2), Brawn d12 5 + 7 = 12; the Mummy Charm d8 4 + 6 = 10; the Witch Sly d10 7 + 4 = 11; Jekyll Charm d12 8 + 7 = 15: Lead 4. Round 2, back alleys: the Newcomer weighs Nimble d8 (Tireless) against Brute Force and spends the charge (2 → 1), 10 + 5 = 15; the Mummy, Ancient Lore (2 → 1), 9 + 9 = 18, a **Critical**; the Witch Sly d10 10 + 4 = 14; Jekyll, Doctor’s Bag (3 → 2) on Sly, 8 + 5 = 13: **home**. Everything came home: **Grand Year**. | **9** |
| **E** (stipulated from B: R76 as no Tell, so 7 at the start of Turn 8; the Creature rolls the way out, as in C, and its roll is taken as Trouble, no show) | 8, and the Creature is caught carrying the mirror. Mob 8 + 4 = 12. Step 3 read each round: “carrying the mirror: no Mask, and Nimble one size smaller, though not the Creature’s”. Round 1, back alleys: Brute Force (3 → 2), Brawn d12 + Monster 5 + 10 = 15, Lead 2, and the Monster showed (the chase owes +2). Round 2, a dead end: 3 + 7 = 10, a Cost. Round 3, a dead end, Fire (read its line): Brawn d10, 1 + 5 = 6, Trouble, Lead 1. Round 4, the square: Brute Force (2 → 1), d10, 5 + 9 = 14, Lead 2. Round 5, the rooftops: the Storyteller tells the Newcomer her Nimble would be a d8, a d6 with Fire; she spends her last Brute Force, 1 + 10 = 11, a Cost. Round 6, the parade: the Planner points out an overdraw is free here (the chase already owes +2, and 8 + 2 stops at 9); she rolls Sly d4 instead (R119), 4 + 1 = 5, Trouble, Lead 1. Start of round 7, the parade: she **gives up** (R122). The mirror is taken. The rise, +2, stops at 9; step 8 sends the other three to the flight, and the Creature stays (not played on). | 7 → 8 → **9** |
| **F** (B at Turn 7, the Witch’s part of R78 taken as Hedge Spell on Jekyll) | Declared first, as the group-check box says: the Witch’s Hedge Spell (2 → 1) on Jekyll’s Sly, d8 → d10. The Mummy, Ancient Lore, 2 + 5 = 7, a Cost; Jekyll 10 + 5 = 15. Both past. The Cost cue no longer names the Mummy, and her card has no Cost Perk now, so the Storyteller can pick a lost Turn (R125). Not played on. | **7** |
| **F2** (F, with both group-check rolls taken as Trouble, no show) | One rise for the check, +1 → 8; caught together, mob 12. The Caught-together cue (“A Perk that changes a local chase only works for someone fleeing alone”) settles Fear the Curse at once: no −1. Round 1, the rooftops: Mummy Wits d12 + Mask 10 + 6 = 16, Jekyll Doctor’s Bag (3 → 2) on Wits, 11 + 3 = 14: two Successes, Lead 3. Round 2, the market stalls, both with the Monster (R133): Mummy Brawn d10 4 + 3 = 7, Jekyll Doctor’s Bag (2 → 1) on Nimble, 7 + 2 = 9: two Trouble, Lead 1 (the chase owes +1). Round 3, the parade, both Weaknesses: Mummy Ancient Lore (2 → 1), Wits d10, 8 + 7 = 15; Jekyll Charm d10 2 + 9 = 11, a Cost, and his Monster showed (the chase owes +2); Hyde takes over: Lead 2. Start of round 4, the rooftops: **Hyde gives up** (R142), and the cape is taken. The Planner: “I’m fleeing alone now. Fear the Curse?” Her card says “When you flee alone”; step 2 says the mob is set when the chase starts and “stays the same for the whole chase”; the Caught-together cue says the rest carry on and the Perk works “only for someone fleeing alone”. The Storyteller keeps 12 (L3). Round 4: Wits d10 4 + 5 = 9, Trouble (against 11, a Cost), Lead 1. Rounds 5 to 9: Wits d10 13 (Lead 2); Ancient Lore (1 → 0), Wits d10 12 (Lead 3); Charm d6 8, Trouble (Lead 2); Wits d10 14 (Lead 3); Brawn d8 14 (Lead 4): **escaped** after nine rounds, back at the florist with the hinges. The rise, +2, stops at 9; step 8: she joins the flight with the Witch and the Creature, and Hyde stays (not played on). | 7 → 8 → **9** |

## 4. Findings

Severity: **high** = a wrong rule, a dead end, or something that would visibly trip the reader at the table; **medium** = would stall the table or confuse; **low** = polish. Files are in `book/demo/chapters/` unless marked. Replacement wording is exact. Each fix to the script also belongs in the Foundry Demo journal (`packs/_source/demo-journal/01-lantern-night.json`) and gets a row in `book/REVIEW.md`; the card text comes from the game data through `book/tools/demo-pages.mjs`.

| # | Sev | Passage (file) | What happened | Suggested fix |
|---|---|---|---|---|
| H1 | **high** | Run guide (`docs/guides/run-guide/guide.html`): “**Foundry: update to 0.1.4.** … It carries the new rules (the one-chase rise, Give up, Limit 9).” Release v0.1.4 (tag at commit 96f146a, 13:53 today) and its portal copy `downloads/Dont_Get_Forked_Foundry_v0.1.4.zip`: the Demo Entities’ picks are `"perk": "strongBack"` (the Creature), `"perk": "patienceOfAges"` (the Mummy) and `"gift": "broomstick"` (the Witch). The Demo journal’s cues still say “the Creature’s Strong Back is for Huge furniture” and “the Mummy never loses a Turn as its Cost”. Neither Caught nor the mirror nor the flight mentions Fear the Curse or Tireless. | The tuning (commits 502a0ad and 0ad6c54, 18:43–18:50) came after the release. At HEAD the packs’ sources, the config and the journal are all right; only the release lags. Tomorrow, a player whose printed card says Tireless would open a Foundry sheet that says Strong Back, and the Storyteller reading from the Foundry journal would get the old cues. 0.1.4 already has all three new defaults as picks (Tireless, Fear the Curse, A Potion for That), so its automation would follow a sheet changed by hand. | Richard’s call (releases only when he says so). **Recommended (a):** release 0.1.5 through the release workflow before the game. Then the run guide reads: “**Foundry: update to 0.1.5.** On the setup screen, open Game Systems and click Update on Don’t Get Forked. It carries the new rules (the one-chase rise, Give up, Limit 9) and the new starting powers for the Creature, the Mummy and the Witch. …”. After it, `npm run build:portal-zip` and the PORTAL Download line. **Or (b)**, staying on 0.1.4, add to the run guide’s “In Foundry, once everyone has chosen” list: “On the sheets, set the Creature’s Perk to Tireless, the Mummy’s Perk to Fear the Curse and the Witch’s Gift to A Potion for That, to match the printed cards. Read the cues from the printed script tonight: the Foundry journal still has the old ones.” |
| H2 | **high** | `book/dist/Lantern_Night_in_Hallowby_v0.2_printer-friendly.pdf` (built 13:51; ignored by git): page 28 “Perk: Strong Back”, page 29 “Perk: Patience of Ages”, page 31 “Gift: Witchcraft (Broomstick)”; page 8, the castle cue “and the Creature’s Strong Back is for Huge furniture”; page 19, the Cost cue “since the Mummy never loses a Turn as its Cost”; no Tireless or Fear the Curse anywhere. `book/dist/Dont_Get_Forked_v0.2_printer-friendly.pdf` (13:53) still marks Strong Back, Patience of Ages and Broomstick as the defaults. | Not a text error: stale builds, the class of HW3’s H2. When this check began, every PDF in `book/dist` predated the tuning. The normal one-shot and rulebook PDFs were rebuilt at 19:15–19:16, during this check, by the picture work. They now carry Tireless, Fear the Curse and A Potion for That, with the cards still on pages 28–31 and the tracker on page 32, as the run guide says. The printer-friendly copies, the ones made for home printing, weren’t, and nothing in git shows they’re stale. Printed tomorrow, they’d contradict the source the table was tuned to. | Once the picture work is done, rebuild both printer-friendly copies (`npm run build:book -- --demo --white` and `npm run build:book -- --white`). Then the usual contact sheet and text diff, and `pdftotext <pdf> - \| grep -c "Strong Back\|Patience of Ages\|Broomstick"` gives 0 for the one-shot (the rulebook keeps them as picks, without “(default)”). Check the cards are still on pages 28–31 and the tracker on 32. Before committing the rebuilt normal PDFs (portal downloads), the usual scan of their text and properties for repo names, usernames and links. |
| H3 | **high** | Running a Turn, cue (`10-before.html`): “Whenever Suspicion reaches 9, finish the roll’s result first, then stop wherever you are and turn to The Final Flight. If that roll got the party out of town, they’re out, and nobody runs.” With every watched obstacle’s Trouble line, such as the way out’s “(Suspicion +1, and the roller is caught in a local chase. …)”. Rulebook Chapter 5: “the hunt is on: every Entity who isn’t captured flees together in the final flight.” Foundry won’t start a local chase once the hunt is on (`module/raid/chase-flow.mjs`, `startLocal`: “huntOn”), and the simulator goes straight to the flight (`sim/engine.mjs`, the Limit after Trouble). | Branch D: at 8, the Creature’s Trouble at the way out made 9. “Finish the roll’s result first” reads as “run the local chase”, since being caught is that roll’s result. The Storyteller ran one at mob 12, worked out by hand (step 2 stops at 8). The Creature gave up, the mirror was taken, and the night could at best be a Partial. D2, the book’s way, came home with a Grand Year. Not from today’s tuning: the sentence is HW3’s fix for result-first, and this edge came with it. Any Trouble at a watched obstacle at 8 hits it: the crowd, the carpenter’s front door, the watchman, Mrs Pinch, the dog, a rescue or the way out. | Running a Turn: “Whenever Suspicion reaches 9, finish the roll’s result first, then stop wherever you are and turn to The Final Flight. If that roll got the party out of town, they’re out, and nobody runs. If it got someone caught, there’s no local chase: they run in the final flight with everyone else.” Caught, first cue, after “Trouble at a watched obstacle.”, add: “If that Trouble takes Suspicion to 9, there’s no local chase: turn to The Final Flight, where the runner flees with everyone else.” Optional, for the book (wording of what it already does), Chapter 5 after “captives it frees join the flight”: “An Entity it gets caught has no local chase; it flees with the others.” Optional, the run guide’s tricky-rules line: “Trouble at a watched obstacle means caught, and a chase (but if that makes 9, the final flight instead).” |
| L1 | low | The mirror, read aloud (`35-places.html`): “While you do, you can’t use the Mask, your Nimble is one size smaller, and every move takes your action in two Turns in a row.” The cue after it: “If the Creature carries it, its Tireless Perk keeps its Nimble the same size; the rest still applies.” | Main session, Turn 5: the box tells the Creature’s player, out loud, something her card says isn’t so. She stopped, and the grey cue settled it a moment later. It’s the one passage where the change meets the read-aloud text. Same class as HW3’s L8. | Read box: “While you do, you can’t use the Mask, your Nimble is one size smaller (not the Creature’s: it’s Tireless), and every move takes your action in two Turns in a row.” Cue: “Tireless changes only the Nimble: carrying the mirror, the Creature still can’t use the Mask, and its moves still take two Turns. If Dracula is in the shop, …” |
| L2 | low | Your first roll, step 6 (`30-raid.html`): “**Bigger and smaller.** If something also makes the die smaller (a Cost, a Weakness, carrying the mirror), cancel them one for one first …” | Proofreading against the brief’s question: every other place that names the carry penalty now says the Creature is exempt (the castle cue, the mirror cue, Caught step 3, the flight’s step 3). This one doesn’t. It didn’t trip (the Newcomer had her card), but it’s the box the Storyteller walks through on the first roll. | “… (a Cost, a Weakness, or carrying the mirror, which makes Nimble smaller for anyone but the Creature), cancel them one for one first …” |
| L3 | low | Caught together, cue (`40-happens.html`): “Anyone may give up at the start of a round, and the rest carry on. A Perk that changes a local chase only works for someone fleeing alone.” Step 2: the mob is “worked out when the chase starts. It stays the same for the whole chase.” The card: “When you flee alone, the mob’s Difficulty in your local chase is 1 lower.” Rulebook Chapter 6: “Anyone caught with it carries on without it.” Accepted interpretation (Decisions log, 2026-10-20): “Fear the Curse is judged when the chase starts, as part of its fixed mob”. | Branch F2: when Hyde gave up, the Mummy was fleeing alone, and the Planner asked for her Perk. The answer comes only from putting step 2 next to the interpretation, which isn’t in the book or the script. The Storyteller kept 12, and it decided the next roll (9: Trouble, where against 11 it was a Cost). Rare: a group check, Trouble for the Mummy and someone else, then a give-up. | Cue: “Anyone may give up at the start of a round, and the rest carry on with the same Lead and mob. A Perk that changes a local chase only works for someone fleeing alone from the start, so it doesn’t begin to work when the others give up.” Chapter 6 first (wording of the accepted interpretation): “Anyone caught with it carries on without it, against the same mob; a Perk for fleeing alone still doesn’t apply.” |

In all, **3 high, 0 medium and 3 low** findings. H1 and H2 are about builds, not text. H3 is a rules gap from HW3’s fix round, not from today’s tuning. On today’s changes themselves the findings are two lows (L1, L2) and one edge (L3).

Optional, not counted: the Creature’s card and Chapter 2 mix pronouns (“it breaks what others pick”, but “He bounds over walls” and “He stands a head above the whole crowd”), and the new cues say “its Nimble”. That was so before today.

**Observations, no change proposed:**
- **O1. One night is not a balance sample.** The session was gentle (one Tell, one showing Monster, out on Turn 7). The branches were cut to reach the changes, not to sample odds. The simulator puts Hallowby on default kits at 91.2% won (Decisions log, 2026-10-20), with Fear the Curse worth +0.6 / +1.3 and A Potion for That +0.6 / +1.5 on Standard / Hard, and Tireless about 0.
- **O2. Tireless mattered once.** In chases and flights the Creature reached for Brawn d12 (offered on 2 of 6 grounds, and Brute Force on the rest), so its Nimble came up only as an option. It counted at the way out (C), where carrying forces the Monster: a d8 Nimble instead of a d6 also makes the Monster show less often. Players understood it at once; it just rarely bites, as the simulator said.
- **O3. Fear the Curse was clear when it applied, and unclear only at its edge.** In A it made the mob 10, and none of the three rolls would have ended differently against 11. It came into question only in F2’s give-up (L3).
- **O4. A Potion for That reads as the Witch’s Ancient Lore,** with the same card wording. The Joker found it in “Or it lets you roll a different trait” in Part One and used it at the guard dog, the obvious place (Charm d8 / Nimble d4 against 10). Wits is never a loud trait in Hallowby, so a Potion roll is always quiet here.
- **O5. For Richard, before the PDFs are rebuilt for printing:** the Witch’s card now carries the Hedge Spell flavour line “Old village magic: a muttered word, a pinch of salt, and luck leans her way.” It was written by the lead and is pending his approval (Decisions log 2026-10-20; `book/REVIEW.md` row 105), as is Trample’s in Chapter 2. Approve or strike before the cards go to the table.
- **O6. “Loud stays loud” isn’t in the one-shot.** Chapter 2: “A trait the obstacle lists as its loud way is loud however you came to roll it.” It didn’t come up (the Potion rolls Wits, never loud here, and the Creature spent Brute Force only in chases). But the Creature’s Brute Force rolls Brawn, the loud way at the carpenter’s door, the garden wall, the tailor’s window, a rescue, slipping free and the way out. Not from today’s change. A cue for step 2 of the first-roll box, if wanted: “A trait the obstacle lists as its loud way is still loud when an ability lets you roll it.”
- **O7. Every capture was a give-up.** The give-up choice was rolled at 1 in 6 a round (1 in 3 in F2 from round 3), and it came up four times. In A it went against the table’s interest: the chase already owed its +1, and running on with the Mask couldn’t raise it. That’s the dice playing the Planner, not a problem with the rule.
- **O8. A local chase can run long.** F2’s went nine rounds (about 15 minutes at the table), the Lead see-sawing between 1 and 3 against mob 12. Giving up is the release valve, and the text offers it every round.

## 5. Rules check

Every rule the tuning touched, against `book/src/chapters`, `docs/CORE-RULES.md` (1.35), `module/config.mjs`, the Foundry packs and the simulator. The one-shot’s other rules were rechecked only where a branch reached them.

### The Entity tuning (Decisions log 2026-10-20; `book/REVIEW.md` rows 102–106)

| Change | One-shot (file) | Rulebook | Foundry and simulator | Verdict |
|---|---|---|---|---|
| The Creature’s default Perk: Tireless (was Strong Back) | card (`60-pregens`); the “If asked” cue (`20-castle`); the mirror cue (`35-places`); Caught step 3 (`40-happens`); the flight’s step 3 (`45-flight`) | Ch2 (default marked; Strong Back stays a pick); Ch4: “While you carry a piece, you can’t use the Mask, and your Nimble is one size smaller” (the Perk bends it) | `config.mjs` `tireless` default, perkRules `carryNimble: false`; Demo and core Entities at HEAD `tireless`; **release 0.1.4 `strongBack`** | **Match** in the source. Played in A, C, D2 and E. The mirror read box (**L1**) and the first-roll box step 6 (**L2**) still name the penalty without the exemption. The release (**H1**) and the printer-friendly PDFs (**H2**) lag. |
| The Mummy’s default Perk: Fear the Curse (was Patience of Ages) | card; Caught cue and step 2; the Caught-together cue; the Cost cue no longer names the Mummy | Ch2; Ch6: the mob fixed when the chase starts, “Anyone caught with it carries on without it” | `fearTheCurse` default, `localMobEase: 1, aloneOnly: true`, judged when the chase starts (F14; accepted interpretation 2026-10-20); Demo at HEAD `fearTheCurse`; **0.1.4 `patienceOfAges`** | **Match.** Played alone (A) and together (F2). After a give-up, unsaid in the book and the script: **L3**. |
| The Witch’s default Gift: A Potion for That (was Broomstick) | card; nothing in the script names Broomstick | Ch2 | `potionForThat` default, `switch` to Wits; Demo at HEAD `potionForThat`; **0.1.4 `broomstick`** | **Match.** Played at the guard dog. |
| Wall-Crawler: Nimble one size bigger in a chase | not on Dracula’s card (Bat and Hypnotic Eyes are his defaults); not mentioned | Ch2 | `config.mjs` perkRules `chaseRaise`; roll plan | Nothing needed in the one-shot (“Tonight, keep the Gift and Perk your card shows”). |
| Flavour lines (Hedge Spell; Trample) | the Witch’s card has Hedge Spell’s | Ch2 | `config.mjs` | Match; pending Richard (O5). |
| Thistlewick’s strongbox at 10 | not in Hallowby | Ch9 | | n/a |

No passage in the one-shot, the tracker or the run guide still names Strong Back, Patience of Ages, Broomstick or “never loses a Turn”. The Foundry Demo journal at HEAD carries all of row 106’s cue changes.

### The eight cards against Chapter 2 and `module/config.mjs`

Compared line by line by a script outside the repository: every card’s dice (both forms for Jekyll & Hyde), signature, default Gift version (name, kind and trait), default Perk (name and rule), Castle Duty, Weakness (name, timing and flavour line) and Tell (name and flavour line), plus the “(default)” marks in Chapter 2. **All eight match.** One difference, intended: Familiar’s Warning on the card leaves out the rulebook’s “(Chapter 5)”. The footers are the same on all eight; Dracula’s and the Ghost’s say “never in the final flight”, as their Weaknesses start in round 1. The card files changed on disk during this check (the picture work: alt texts only); the rules text was unchanged.

### The run guide (`docs/guides/run-guide/guide.html`)

- “Foundry: update to 0.1.4 … It carries the new rules”: 0.1.4 predates the tuning (**H1**).
- “Print the Entity cards (pages 28–31) … and the tracker (page 32)”, “32 pages”: still right for the normal one-shot PDF rebuilt at 19:16 (the Creature’s card on 28, the Mummy’s on 29, the Witch’s on 31, the tracker on 32). Check the printer-friendly copy once it’s rebuilt (**H2**).
- Nothing else in the guide names a Perk, a Gift or the carry penalty. Its Suspicion lines (3, 5, 7, 8), Limit, chase box and tricky-rules box still match the script. For H3, an optional line is offered.

### HW3’s fixes, checked against the current text

All in place: the way out and slipping free finish their result first (H1, M1), step 8 and the flight cue send an everyone-held night to Forked (M2), the practice roll’s plain numbers (M3), the run guide’s 3, 5, 7, 8 (M4), and L1 to L14 (the Caught box’s one rise, the give-up after the ground, the Captured cue, the give-up with what you carry, the overdraw in a Cost, the lost Turn at the flight, the overdraw wording and footers, “even if your card says it never works in a chase”, the tracker’s give-up, the way out once a Turn, the Forked goodnight, Suspicion Rising skipped at 9, the flight cue, the Maps credit). HW3’s O2 sentence on Tell checks is in How the Night Works. H3 in this report is a new edge of HW3’s H1 wording, not a return.

## 6. Table time

Method as in HW1 to HW3: read-aloud at about 140 words a minute (Part One’s boxes 1,217 words, Part Two’s opening 493, the flight 288), about 1 minute a roll, 1 minute a party decision, 1 minute a place read, and 2 minutes for each stumble a finding describes.

| | Part One | Part Two | Part Three | Total |
|---|---|---|---|---|
| The session | 21 (9 reading, 4 choosing and names, 4 practice, 3 Duties with a clash and a swap, 1 for “what does Tireless do?”) | about 32 (3.5 reading, 5 place reads with the mirror box, 2 for three Tell checks, 8 rolls and a Cost, 10 decisions, 1.5 lines, 2 for L1) | 3 | **about 56 min**, nearer 70 with a break |
| Branch A (a chase, a capture, the flight) | 21 | about 48 | 3 | about 72 min |
| Branch F2’s chase alone | | about 15 (nine rounds, 2 for L3) | | |

The cover says 1½ to 2½ hours and the run guide 1½ to 2. A smooth four-player night with no chase comes in at about an hour, and one with a chase and a flight at about 1¼ hours, as HW3 found.

## Appendix: every roll

All from Math.random through a small helper in a private scratch folder (not in the repository). Each line is one call, in order. “choice” rolls settled table decisions that could go either way. The lines in bold mark where a branch begins and what was changed or stipulated there. Notes on three calls:
- R50 rolled both possible second dice for a choice already made by R49 (the Mask), and the d10 was ignored.
- In Branch A the give-up choice (R47, R51, R55, R59) was rolled just before that round’s ground (R48, R52, R56, R60). By step 7 the call comes once the ground is read, so each call was taken as made after hearing it. From Branch D on, the ground was rolled first.
- **R154 is void.** It was rolled for the overdraw, but R153’s 6 meant Charm; R155 is the roll that counts.

| # | What | Dice |
|---|---|---|
| R1 | Fourth Entity (d5: 1 Dracula 2 Werewolf 3 Invisible Man 4 Ghost 5 Jekyll & Hyde) | d5 5 |
| R2 | Seat 1 (the Newcomer) picks first (d4: 1 Creature 2 Mummy 3 Witch 4 Jekyll & Hyde) | d4 1 |
| R3 | Seat 2 (the Planner) picks second (d3: 1 Mummy 2 Witch 3 Jekyll & Hyde) | d3 1 |
| R4 | Seat 3 (the Joker) picks third (d2: 1 Witch 2 Jekyll & Hyde); seat 4 (the Daredevil) takes the other | d2 1 |
| R5 | choice: Jekyll’s new Duty after the clash (1–3 Gardener, 4–5 Tailor, 6 Butler) | d6 6 |
| R6 | choice: the Mummy swaps from Librarian (no item tonight) on the Planner’s own reading (1–4 swaps to a free Duty with an item, 5–6 keeps Librarian) | d6 2 |
| R7 | choice: the Mummy’s new Duty (1–3 Gardener, 4–6 Tailor) | d6 1 |
| R8 | practice, Creature Brawn d12 + Mask vs 8 | d12 3 · d6 3 |
| R9 | practice, Mummy Wits d12 + Mask vs 8 | d12 1 · d6 6 |
| R10 | practice, Witch Wits d12 + Mask vs 8 | d12 10 · d6 5 |
| R11 | practice, Jekyll Charm d12 + Mask vs 8 | d12 1 · d6 3 |
| R12 | practice, Creature Brawn d12 + Monster | d12 7 · d10 9 |
| R13 | practice, Mummy Wits d12 + Monster | d12 5 · d10 2 |
| R14 | practice, Witch Wits d12 + Monster | d12 12 · d10 10 |
| R15 | practice, Jekyll Charm d12 + Monster | d12 3 · d10 7 |
| R16 | T1 choice: party plan (1–2 all to the tavern, 3–4 split in pairs, 5–6 each to a different place) | d6 2 |
| R17 | T2 choice: way in (1–4 goose yard, the Witch Sly d10 raised to d12 by Cook, vs 6; 5–6 trapdoor, the Creature Brawn d12 vs 8) | d6 6 |
| R18 | T2 choice: roller’s second die (1–4 Mask, 5–6 Monster) | d6 2 |
| R19 | T2 Creature, cellar trapdoor, Brawn d12 + Mask vs 8 (not watched) | d12 2 · d6 4 |
| R20 | T2 Creature’s Cost (1–2 Suspicion +1, 3–4 lose a Turn, 5–6 smaller die; drop is out, it carries nothing) | d6 3 |
| R21 | T2 choice: who rolls the back room (1–3 the Mummy Wits d12, 4–6 the Witch Wits d12) and Mask (1–4 on a second d6) | d6 4 · d6 2 |
| R22 | T2 Witch, back room, Wits d12 (Cook: stays d12) + Mask vs 8 | d12 12 · d6 6 |
| R23 | T2 choice: Mummy (1–4 moves to the florist, her Gardener place; 5–6 moves to the carpenter) | d6 6 |
| R24 | T2 choice: Jekyll (1–4 moves to the tailor for Mrs Pinch, Charm d12; 5–6 waits with the Witch) | d6 1 |
| R25 | T2 Tell check, carpenter (Mummy arrives) | d6 5 |
| R26 | T2 Tell check, tailor (Jekyll arrives) | d6 3 |
| R27 | T3 choice: Mummy’s way in at the carpenter (1–3 garden wall by Ancient Lore, Wits d12, 1 charge; 4–5 garden wall Brawn d10 the loud way; 6 front door Sly d6) | d6 4 |
| R28 | T3 choice: Jekyll at Mrs Pinch, Charm d12 (1–3 Mask, 4–6 Monster) | d6 4 |
| R29 | T3 choice: Witch, carrying the wine (1–2 moves to the florist, 3–4 to the carpenter, 5–6 to the tailor) | d6 6 |
| R30 | T3 choice: Mummy Mask (1–4) or Monster (5–6) on Brawn d10 loud | d6 2 |
| R31 | T3 Jekyll, Mrs Pinch, Charm d12 + Monster vs 8 (watched) | d12 8 · d10 4 |
| R32 | T3 Mummy, garden wall, Brawn d10 the loud way + Mask vs 8 (not watched) | d10 9 · d6 2 |
| R33 | T4 choice: Creature (1–3 moves to the tailor to carry the mirror, 4–5 moves to the carpenter, 6 moves to the florist) | d6 4 |
| R34 | T4 choice: Mummy at the watchman, Wits d12 (1–4 Mask, 5–6 Monster) | d6 4 |
| R35 | T4 choice: at the tailor, the dog now (1–3) or wait for the Creature (4–6) | d6 5 |
| R36 | T4 Mummy, night watchman, Wits d12 + Mask vs 8 (watched) | d12 7 · d6 5 |
| R37 | T4 choice: the Witch, while Jekyll waits at the tailor (1–3 waits too, 4–6 moves to the florist with the wine) | d6 1 |
| R38 | T5 choice: Creature (1–4 moves to the tailor, 5–6 moves to the florist) | d6 2 |
| R39 | T5 choice: Mummy with the hinges (1–4 moves to the florist, 5–6 moves to the tailor) | d6 5 |
| R40 | T5 choice: who rolls the dog once the Creature is there (1–5 Jekyll Charm d12, 6 the Witch by A Potion for That, Wits d12) and Mask (1–3) / Monster (4–6) | d6 6 · d6 6 |
| R41 | T5 Witch, guard dog, A Potion for That (1 charge, 3→2): Wits d12 + Monster vs 10 (watched; she carries the wine) | d12 6 · d10 9 |
| R42 | T5 choice, after the count aloud (4 now; 5 at this Turn’s end, 6 the next, out on Turn 7): the Creature takes the mirror (1–4) or they leave it (5–6) | d6 1 |
| R43 | T5 choice: party plan with wine, hinges, cape and the mirror (a Grand Year if all get home) (1–4 everyone heads for the bridge, skip the nightshade; 5–6 the Mummy tries the florist, the rest head for the bridge) | d6 2 |
| R44 | T5 Tell check, the way out (Jekyll, first back) | d6 3 |
| R45 | T7 choice: way-out roller, Mask, vs 6 (1–2 the Witch Sly d10; 3–4 the Witch by A Potion for That, Wits d12; 5–6 the Mummy by Ancient Lore, Wits d12) | d6 6 |
| R46 | T7 Mummy, the way out, Ancient Lore (1 charge, 3→2): Wits d12 + Mask vs 6 (watched) | d12 10 · d6 3 |
| | **Branch A: from Turn 7, R46 taken as Trouble (the Mummy caught alone at the way out, Suspicion 7, mob 11 - 1 = 10 by Fear the Curse)** | |
| R47 | A chase, start of round 1: the Mummy gives up (6) or runs (1–5) | d6 3 |
| R48 | A chase round 1, ground | d6 4 |
| R49 | A R1 choice: Mummy Mask (1–4) or Monster (5–6) on Wits d12 (rooftops) | d6 3 |
| R50 | A R1 Mummy, rooftops, Wits d12 + (Mask d6 / Monster d10 per choice) vs 10 | d12 12 · d6 2 · d10 4 |
| R51 | A chase, start of round 2: the Mummy gives up (6) or runs (1–5) | d6 3 |
| R52 | A chase round 2, ground | d6 1 |
| R53 | A R2 choice: Mummy spends Ancient Lore for Wits d12 (1–4) or rolls Charm d8 (5–6); Mask (1–4) or Monster (5–6) | d6 2 · d6 2 |
| R54 | A R2 Mummy, crowded square, Ancient Lore (2→1): Wits d12 + Mask vs 10 | d12 7 · d6 6 |
| R55 | A chase, start of round 3: the Mummy gives up (6) or runs (1–5) | d6 4 |
| R56 | A chase round 3, ground | d6 1 |
| R57 | A R3 choice: Mummy spends her last Ancient Lore for Wits (d12, Loose Thread to d10) (1–4) or Charm (d8 to d6) (5–6); Mask (1–4) or Monster (5–6) | d6 5 · d6 4 |
| R58 | A R3 Mummy, crowded square, Charm d6 (Loose Thread) + Mask vs 10 | d6 1 · d6 5 |
| R59 | A chase, start of round 4: the Mummy gives up (6) or runs (1–5) | d6 6 |
| R60 | A chase round 4, ground | d6 5 |
| R61 | A T7 choice, Suspicion 8 with the mirror in town (it makes 9 at the end of this Turn): the Creature abandons the mirror to try a rescue (1–3) or they keep it and take the flight (4–6) | d6 4 |
| R62 | A flight round 1, ground | d6 6 |
| R63 | A flight R1 choice, dead end: Jekyll’s Wits d10 (1–2 the Witch spends Hedge Spell on it, 3–4 Jekyll spends Doctor’s Bag, 5–6 nobody spends) | d6 4 |
| R64 | A flight R1 Creature, dead end, Brawn d12 + Monster vs 10 (carrying the mirror) | d12 11 · d10 10 |
| R65 | A flight R1 Witch, dead end, Wits d12 + Monster vs 10 | d12 9 · d10 8 |
| R66 | A flight R1 Jekyll, dead end, Wits d10 raised to d12 by Doctor’s Bag (3→2) + Monster vs 10 | d12 7 · d10 6 |
| R67 | A flight round 2, ground | d6 3 |
| R68 | A flight R2 choice, market stalls: the Witch (1–4 A Potion for That on her own roll, Wits d12; 5–6 Hedge Spell on her Brawn d6) | d6 6 |
| R69 | A flight R2 choice: Jekyll (1–3 drinks the Draught: Hyde, Brawn d12; 4–5 Doctor’s Bag on Nimble d6; 6 rolls Nimble d6 as it is) | d6 5 |
| R70 | A flight R2 Creature, market stalls, Brawn d12 + Monster vs 10 (carrying) | d12 5 · d10 5 |
| R71 | A flight R2 Witch, market stalls, Brawn d6 raised to d8 by Hedge Spell (2→1) + Monster vs 10 | d8 8 · d10 2 |
| R72 | A flight R2 Jekyll, market stalls, Nimble d6 raised to d8 by Doctor’s Bag (2→1) + Monster vs 10 | d8 5 · d10 6 |
| | **Branch B: from Turn 5, R43 taken as ’the Mummy tries the florist, the rest head for the bridge’ (Suspicion 4; the Creature carries the mirror)** | |
| R73 | B T5 choice: who goes with the Mummy to the florist (1–2 nobody, 3–4 Jekyll, 5–6 Jekyll and the Witch) | d6 6 |
| R74 | B T5 choice: Jekyll moves to the florist now (1–2) or waits to arrive with the Witch next Turn, for her Familiar’s Warning (3–6) | d6 5 |
| R75 | B T6 Tell check, florist (Mummy, Witch, Jekyll arrive), with the Witch’s second d6 (Familiar’s Warning) | d6 2 · d6 6 |
| R76 | B T7 Tell check, the way out (the Creature, first back, carrying the mirror) | d6 6 |
| R77 | B T7 choice: who rolls the crowd (1–2 the Mummy alone, 3–4 the Mummy and Jekyll as a group check, 5–6 all three) | d6 3 |
| R78 | B T7 declare: the Mummy (1–3 Ancient Lore, Wits d12; 4–6 Sly d6 raised to d8 by Gardener); the Witch on Jekyll’s roll (1–3 Hedge Spell on Sly d8, 4 A Potion for That, Wits d10, 5–6 nothing); Jekyll Mask (1–4) or Monster (5–6) | d6 3 · d6 6 · d6 1 |
| R79 | B T7 group check: Mummy, crowd, Ancient Lore (3→2) Wits d12 + Mask vs 8 (watched) | d12 11 · d6 1 |
| R80 | B T7 group check: Jekyll, crowd, Sly d8 + Mask vs 8 (watched) | d8 7 · d6 1 |
| R81 | B T7 choice: the Witch moves to the bridge now (1–4) or waits for the others (5–6) | d6 1 |
| R82 | B T8 choice: way-out roller at Suspicion 8 (1–2 the Mummy by Ancient Lore, Wits d12 + Mask; 3–4 the Witch by A Potion for That, Wits d12 + Mask; 5 the Witch Sly d10 + Mask; 6 the Creature, Nimble d8 + the Monster, carrying) | d6 5 |
| R83 | B T8 Witch, the way out, Sly d10 + Mask vs 6 (watched) | d10 3 · d6 5 |
| | **Branch C: Branch B at Turn 8 (Suspicion 8), R82 taken as 6: the Creature rolls the way out, carrying the mirror** | |
| R84 | C T8 Creature, the way out, Nimble d8 (Tireless: not smaller) + Monster (carrying: no Mask) vs 6 (watched) | d8 3 · d10 9 |
| | **Branch D: Branch C with R84 taken as Trouble, no show (Suspicion 8 → 9, the Creature ’caught’ at the way out while carrying)** | |
| R85 | D choice: how the Storyteller settles ’caught’ at 9 on first reading (1–3 runs the local chase first, as ’finish the roll’s result first’ reads; 4–6 goes straight to the flight, as ’stop wherever you are’ reads) | d6 1 |
| R86 | D chase round 1, ground (the Creature, carrying) | d6 1 |
| R87 | D chase, start of round 1 (after the ground): the Creature gives up (6) or runs (1–5) | d6 6 |
| | **Branch D2: Branch D with R85 taken as ’straight to the flight’ (the rulebook’s reading): four run, the Creature carrying the mirror; charges Creature 3, Mummy 2, Witch 2, Jekyll 3** | |
| R88 | D2 flight round 1, ground | d6 5 |
| R89 | D2 flight R1 choices, parade: Creature (1–4 Brute Force, Brawn d12; 5–6 Sly d6 with the Witch’s Hedge Spell to d8); Mummy (1–3 Ancient Lore, Wits d12; 4–6 Charm d8); Witch (1–4 Sly d10; 5–6 A Potion for That, Wits d12) | d6 3 · d6 5 · d6 1 |
| R90 | D2 flight R1 Creature, parade, Brute Force (3→2): Brawn d12 + Monster vs 10 (carrying) | d12 5 · d10 7 |
| R91 | D2 flight R1 Mummy, parade, Charm d8 + Monster vs 10 | d8 4 · d10 6 |
| R92 | D2 flight R1 Witch, parade, Sly d10 + Monster vs 10 | d10 7 · d10 4 |
| R93 | D2 flight R1 Jekyll, parade, Charm d12 + Monster vs 10 | d12 8 · d10 7 |
| R94 | D2 flight round 2, ground | d6 2 |
| R95 | D2 flight R2 choices, back alleys: Creature (1–3 Nimble d8, Tireless; 4–6 Brute Force, Brawn d12); Mummy (1–4 Ancient Lore, Wits d12; 5–6 Sly d6 with the Witch’s Hedge Spell to d8); Jekyll (1–3 Doctor’s Bag on Sly d8; 4–6 Sly d8 as it is) | d6 4 · d6 2 · d6 1 |
| R96 | D2 flight R2 Creature, back alleys, Brute Force (2→1): Brawn d12 + Monster vs 10 (carrying) | d12 10 · d10 5 |
| R97 | D2 flight R2 Mummy, back alleys, Ancient Lore (2→1): Wits d12 + Monster vs 10 | d12 9 · d10 9 |
| R98 | D2 flight R2 Witch, back alleys, Sly d10 + Monster vs 10 | d10 10 · d10 4 |
| R99 | D2 flight R2 Jekyll, back alleys, Sly d8 raised to d10 by Doctor’s Bag (3→2) + Monster vs 10 | d10 8 · d10 5 |
| | **Branch E (stipulated from B): R76 taken as no Tell (Suspicion 7 at the start of Turn 8); the Creature rolls the way out (as in C) and its roll is taken as Trouble, no show: Suspicion 8, caught carrying the mirror, mob 8 + 4 = 12; the Creature has 3 charges** | |
| R100 | E chase round 1, ground (the Creature, carrying) | d6 2 |
| R101 | E chase, start of round 1 (after the ground): the Creature gives up (6) or runs (1–5) | d6 3 |
| R102 | E R1 choice, back alleys: the Creature rolls Nimble d8 (Tireless; saves the charge) (1–3) or spends Brute Force for Brawn d12 (4–6) | d6 4 |
| R103 | E R1 Creature, back alleys, Brute Force (3→2): Brawn d12 + Monster vs 12 (carrying: no Mask) | d12 5 · d10 10 |
| R104 | E chase round 2, ground | d6 6 |
| R105 | E chase, start of round 2 (after the ground): the Creature gives up (6) or runs (1–5) | d6 3 |
| R106 | E R2 Creature, dead end, Brawn d12 + Monster vs 12 (carrying) | d12 3 · d10 7 |
| R107 | E chase round 3, ground | d6 6 |
| R108 | E chase, start of round 3 (after the ground): the Creature gives up (6) or runs (1–5) | d6 2 |
| R109 | E R3 Creature, dead end, Brawn d12 to d10 (Fire) + Monster vs 12 (carrying) | d10 1 · d10 5 |
| R110 | E chase round 4, ground | d6 1 |
| R111 | E chase, start of round 4 (after the ground): the Creature gives up (6) or runs (1–5) | d6 3 |
| R112 | E R4 Creature, crowded square, Brute Force (2→1): Brawn d12 to d10 (Fire) + Monster vs 12 (carrying) | d10 5 · d10 9 |
| R113 | E chase round 5, ground | d6 4 |
| R114 | E chase, start of round 5 (after the ground): the Creature gives up (6) or runs (1–5) | d6 4 |
| R115 | E R5 choice, rooftops: the Creature spends its last Brute Force for Brawn (d12 to d10 by Fire) (1–3) or rolls Wits (d10 to d8 by Fire) (4–6); Nimble would be d8 to d6 | d6 3 |
| R116 | E R5 Creature, rooftops, Brute Force (1→0): Brawn d12 to d10 (Fire) + Monster vs 12 (carrying) | d10 1 · d10 10 |
| R117 | E chase round 6, ground | d6 5 |
| R118 | E chase, start of round 6 (after the ground): the Creature gives up (6) or runs (1–5) | d6 2 |
| R119 | E R6 choice, parade: overdraw Brute Force for Brawn d10 (Fire) (1–4; the chase already owes +2, so 9 either way) or Sly d4 (Fire) (5–6) | d6 5 |
| R120 | E R6 Creature, parade, Sly d6 to d4 (Fire) + Monster vs 12 (carrying) | d4 4 · d10 1 |
| R121 | E chase round 7, ground | d6 5 |
| R122 | E chase, start of round 7 (after the ground): the Creature gives up (6) or runs (1–5) | d6 6 |
| | **Branch F: Branch B at Turn 7 (Suspicion 7), R78’s second die taken as 1: the Witch spends Hedge Spell (2→1) on Jekyll’s Sly d8 (to d10); the Mummy’s Ancient Lore and both Masks stand** | |
| R123 | F T7 group check: Mummy, crowd, Ancient Lore (3→2) Wits d12 + Mask vs 8 (watched) | d12 2 · d6 5 |
| R124 | F T7 group check: Jekyll, crowd, Sly d8 raised to d10 by the Witch’s Hedge Spell + Mask vs 8 (watched) | d10 10 · d6 5 |
| R125 | F T7 Mummy’s Cost (1–2 Suspicion +1, 3 drop the hinges, 4–5 lose a Turn, 6 smaller die) | d6 4 |
| | **Branch F2: Branch F with R123 and R124 both taken as Trouble, no show (Suspicion 7 → 8; the Mummy and Jekyll caught together, mob 12, no Fear the Curse); charges Mummy 2, Jekyll 3** | |
| R126 | F2 chase round 1, ground | d6 4 |
| R127 | F2 chase, start of round 1 (after the ground): the Mummy gives up (6) or runs; Jekyll gives up (6) or runs | d6 1 · d6 2 |
| R128 | F2 R1 choices, rooftops: Mummy Mask (1–4) or Monster (5–6) on Wits d12; Jekyll Doctor’s Bag on Wits d10 (1–3) or not (4–6); Jekyll Mask (1–4) or Monster (5–6) | d6 3 · d6 1 · d6 3 |
| R129 | F2 R1 Mummy, rooftops, Wits d12 + Mask vs 12 | d12 10 · d6 6 |
| R130 | F2 R1 Jekyll, rooftops, Wits d10 raised to d12 by Doctor’s Bag (3→2) + Mask vs 12 | d12 11 · d6 3 |
| R131 | F2 chase round 2, ground | d6 3 |
| R132 | F2 chase, start of round 2 (after the ground): the Mummy gives up (6) or runs; Jekyll gives up (6) or runs | d6 5 · d6 3 |
| R133 | F2 R2 choices, market stalls: Mummy (1–3 Ancient Lore, Wits d12; 4–6 Brawn d10); Jekyll (1–3 the Draught to Hyde, Brawn d12; 4–5 Doctor’s Bag on Nimble d6; 6 Nimble d6); both Mask (1–4) or Monster (5–6) on one die | d6 6 · d6 5 · d6 6 |
| R134 | F2 R2 Mummy, market stalls, Brawn d10 + Monster vs 12 | d10 4 · d10 3 |
| R135 | F2 R2 Jekyll, market stalls, Nimble d6 raised to d8 by Doctor’s Bag (2→1) + Monster vs 12 | d8 7 · d10 2 |
| R136 | F2 chase round 3, ground | d6 5 |
| R137 | F2 chase, start of round 3 (after the ground): the Mummy gives up (5–6) or runs; Jekyll gives up (5–6) or runs | d6 3 · d6 2 |
| R138 | F2 R3 choices, parade (Weaknesses in): Mummy (1–4 Ancient Lore, Wits d12 to d10; 5–6 Charm d8 to d6); Jekyll Doctor’s Bag on Charm (cancels the Weakness: d12) (1–3) or Charm d10 (4–6); both Monster (1–4, the chase owes +1 so it’s 9 either way) or Mask (5–6) | d6 3 · d6 4 · d6 4 |
| R139 | F2 R3 Mummy, parade, Ancient Lore (2→1): Wits d12 to d10 (Loose Thread) + Monster vs 12 | d10 8 · d10 7 |
| R140 | F2 R3 Jekyll, parade, Charm d12 to d10 (A Familiar Face) + Monster vs 12 | d10 2 · d10 9 |
| R141 | F2 chase round 4, ground | d6 4 |
| R142 | F2 chase, start of round 4 (after the ground): the Mummy gives up (5–6) or runs; Hyde gives up (5–6) or runs | d6 3 · d6 6 |
| R143 | F2 R4 Mummy alone, rooftops, Wits d12 to d10 (Loose Thread) + Monster vs 12 (the chase already owes +2) | d10 4 · d10 5 |
| R144 | F2 chase round 5, ground | d6 4 |
| R145 | F2 chase, start of round 5 (after the ground): the Mummy gives up (5–6) or runs (1–4) | d6 3 |
| R146 | F2 R5 Mummy alone, rooftops, Wits d12 to d10 (Loose Thread) + Monster vs 12 | d10 10 · d10 3 |
| R147 | F2 chase round 6, ground | d6 3 |
| R148 | F2 chase, start of round 6 (after the ground): the Mummy gives up (5–6) or runs (1–4) | d6 4 |
| R149 | F2 R6 choice, market stalls: the Mummy spends her last Ancient Lore, Wits d12 to d10 (1–4), or rolls Brawn d10 to d8 (5–6) | d6 2 |
| R150 | F2 R6 Mummy alone, market stalls, Ancient Lore (1→0): Wits d12 to d10 (Loose Thread) + Monster vs 12 | d10 2 · d10 10 |
| R151 | F2 chase round 7, ground | d6 5 |
| R152 | F2 chase, start of round 7 (after the ground): the Mummy gives up (5–6) or runs (1–4) | d6 4 |
| R153 | F2 R7 choice, parade: the Mummy overdraws Ancient Lore, Wits d10 (1–4; 9 either way) or rolls Charm d8 to d6 (5–6) | d6 6 |
| R154 | F2 R7 Mummy alone, parade, overdrawn Ancient Lore: Wits d12 to d10 (Loose Thread) + Monster vs 12 | d10 9 · d10 1 |
| R155 | F2 R7 Mummy alone, parade, Charm d8 to d6 (Loose Thread) + Monster vs 12 (R154 void: rolled for the wrong option) | d6 4 · d10 4 |
| R156 | F2 chase round 8, ground | d6 4 |
| R157 | F2 chase, start of round 8 (after the ground): the Mummy gives up (5–6) or runs (1–4) | d6 3 |
| R158 | F2 R8 Mummy alone, rooftops, Wits d12 to d10 (Loose Thread) + Monster vs 12 | d10 9 · d10 5 |
| R159 | F2 chase round 9, ground | d6 3 |
| R160 | F2 chase, start of round 9 (after the ground): the Mummy gives up (5–6) or runs (1–4) | d6 4 |
| R161 | F2 R9 choice, market stalls: the Mummy overdraws Ancient Lore, Wits d10 (1–3) or rolls Brawn d10 to d8 (4–6) | d6 5 |
| R162 | F2 R9 Mummy alone, market stalls, Brawn d10 to d8 (Loose Thread) + Monster vs 12 | d8 4 · d10 10 |
