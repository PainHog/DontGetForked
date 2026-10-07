# FT5: verification game in Thistlewick (Standard), five players and a Storyteller

*Agent playtest, 2026-10-07, after the full-table fix round (V29 and V30). Rules source: only the rulebook text, `book/src/chapters/*.html` read as text, plus the Thistlewick map's title and labels. The simulator, `docs/` and the Foundry code were not used as rules. Every random result is a real `node -e` roll (Math.random), numbered R1 onward and listed in the appendix. Where the book is silent or unclear I made a ruling, noted it in the log and listed it under Friction. Lookups are marked [L1]…[L15] in the log.*

---

## 1. Summary

| | |
|---|---|
| **Result** | **Win** (5 of 5 items home, both essentials; nobody left behind). No Grand Year: the mirror was taken, then abandoned. |
| Turns used | **7 of 12** (out on Turn 7) |
| Suspicion at the end | **10 / 11** |
| Where the Suspicion came from | Tells 2 (Turn 1) · Costs chosen as Suspicion 1 · the Monster showing 2 (on a loud roll) · Trouble 3 (one in the chase) · the loud way 1 · the mirror 1 |
| Local chases | **1**: Jekyll, caught at the ironmonger's strongbox (Suspicion 7, mob 11). Drank the Draught; Cost, Cost, then Trouble on round 3 with his Weakness in play: **cornered, captured** |
| Captures | **1**: Hyde. He carried nothing, so the town took nothing. **Slipped free on his first try** (Turn 4) |
| Final flight | **none** |
| Furniture | **Tried, beaten, taken, abandoned.** The Daredevil won two votes for the mirror (4–1, then 3–2). Only the Werewolf was past the strongbox (he’d opened his own approach), so only he could try the guard dog: loud Nimble d12 and the Monster, 13 against 10. Taken at Suspicion 9, it made the Limit certain at the end of Turn 7, before a two-Turn carry could get it out. The party voted 3–2 to abandon it and walk out with the Win. |
| Charges spent | Newcomer (Witch) **0** · Daredevil (Werewolf) **3** · Planner (Dracula) **2** · Hoarder (Ghost) **0** · Roleplayer (Jekyll &amp; Hyde) **3** · all **8 of 15** |

What stood out:
- **The mirror’s new place gets played, and it bites.** It’s behind two watched obstacles now, so it is no longer nearly free. Here it cost the loud way +1 and the mirror +1, and it would have forced a final flight if the party had kept it. A real choice, Win or a gamble on a Grand Year. In FT2 the mirror was a free extra.
- **Every Thistlewick location is watched now** (the hatter’s neighbour). Five first visits on Turn 1 meant five Tell checks: 2 Suspicion before anyone rolled.
- **Open approach plus furniture worked as written.** Through the Hedge got only the Werewolf past the strongbox (“Only you get through”), so under the new Chapter 4 line (“whoever is past all its obstacles”) he alone could try the dog. The Planner caught this mid-Turn and sent Dracula to the way out instead.
- **Five players again finished early.** Turn 7 of 12, as in FT2 (Turn 6 twice).
- **Friction:** no blockers, no majors, 5 minor, 4 wording (§3). Two are new and come from this round: the **back cover still says “2–3 hours”**, and Chapter 1 now says **“Each session is one raid … so a session often fits two.”**

## 2. The changed passages

| Passage (as printed now) | Came up? | Read cleanly? |
|---|---|---|
| **Thistlewick: the mirror at the ironmonger.** “The furniture: a gilt mirror (Bulky), at the ironmonger (4).” Location 4’s last row: “Furniture · A guard dog *watched* · Charm (good dog) · Nimble (outrun it, barking) · 10”. Map title: “…the star marks the furniture, at the ironmonger.” | **Yes**, Turns 5–7. | **Yes.** The facts line, the table row and the map title all agree. One thing goes unsaid: Handyman’s raise applies to the dog (Ch2, “the furniture’s obstacle included”). It never came up, because our Handyman (Jekyll) was the one captured. |
| **Thistlewick: the hatter’s neighbour watched.** “A nosy neighbour at her window *watched* · Sly · Wits (a false alarm…) · 8”. Map title: “Every location is watched”. | **Yes**: the Tell check on Turn 1, and the Ghost’s Cost there on Turn 2. | **Yes.** The map title’s “Every location is watched” is now true (baker, china shop, hatter, ironmonger, seed merchant), and it saved a lookup. |
| **Ch1:** “A raid runs **1–2 hours**, so a session often fits two.” | **Yes**, read aloud at the start. | **Partly.** On its own it is clear, and it matched the table-time estimate (§4, about 1 h 30 min). But the same paragraph opens “Each session is one raid”, and the **back cover still says “2–3 hours”** (findings W1, M1). |
| **Ch2:** “Every pick has a marked default, so a new player can skip the choices (hear the shopping list first)” | **Yes**, at choosing. | **Mostly.** The table heard the list first. That changed a pick: no books on the list, so Jekyll &amp; Hyde swapped Librarian for Handyman. But the bracket hangs off “skip the choices”, and the Newcomer asked, “So I skip them after I hear the list?” (finding W2). |
| **Ch2:** “if two defaults clash in a party, **the player who chose later** picks another or rolls a d6” | **Yes**: Dracula and the Ghost both default to Butler. | **Yes.** The Entities were rolled one player at a time, so the roll order counted as the choosing order: the Ghost (rolled fourth) moved, and the Hoarder picked Tailor. A table that picks Entities all at once would have no “later” (finding W3, a nit). |
| **Ch2, Fetch:** “The way out is 1 easier, **whoever rolls it**, while you’re there” | **No**: the Werewolf took Night Runner. | Read in passing: clean. |
| **Ch4:** “**Once that location’s loot has been taken**, whoever is past all its obstacles may try for the piece.” | **Yes**, Turns 5–6. The Werewolf took the rope (Turn 5) through his own approach, then tried the dog (Turn 6). | **Yes.** Read together with Ch3 (“Only you get through (others must beat it themselves)”), it settled the question in one lookup [L12]: only the Werewolf could try. |
| **Ch5:** “Roll to see whose, **among the Entities arriving (all who move there in the same Turn)**” | **Only with one arrival at a time.** On Turn 1 each of the five watched locations had a single Entity arriving. On Turn 4 the Witch came back to the way out alone. Three Entities did arrive together on Turn 5, but not on a first visit. | Read twice, clean. **Not tested with several Entities arriving.** |
| **Ch5:** the Limit ends a local chase “**even if a runner pushed it there on purpose**” | **No**: the only chase ran at Suspicion 7–8. | Read in passing: clean. |
| **Ch6:** “**The final flight is a new chase, even for those who join it from a local one.**” | **No**: no final flight. | Read when Jekyll’s Weakness arrived (“Soon: from the third round of any chase”). As the third bullet under “Your Weakness” it reads cleanly: a new chase, so the round count starts again. |
| **Ch6:** “the town takes back what you were carrying, furniture included: **it’s gone for the night, and nobody can take it again**” | **Yes**, at Hyde’s capture (Turn 3). Moot: he carried nothing. | **Yes.** The Planner checked it in case Hyde had been carrying anything. |
| **Ch8, villager faces:** “A watched obstacle means someone is looking: give them a face: **one of a ready-made town’s villagers, or a roll**.” | **Yes**, three times. The mayor spotted Jekyll’s wrong hand at the strongbox; the vicar and his pitchfork watched the dog’s yard. At the nosy neighbour the Storyteller used the neighbour herself. | **Mostly.** The ready-made faces worked. But when the obstacle is already a person (the neighbour, a shopkeeper, the watchman, a doorman), it doesn’t say whether that person is the face. And the sentence has two colons (finding W4). |
| **Ch8:** “Keep the captive’s player, **and anyone else waiting**, busy: let them voice a jailer or a villager.” | **Yes.** The Roleplayer was captive for Turn 3. Four players stood at the way out for Turns 5–6 (the Witch from Turn 4), and the Storyteller had them voice the parade crowd and the vicar. | **Yes.** It did its job: it was the waiting players’ only thing to do. |
| **Ch8:** “Early on, give each player a job that suits their monster, and **a new player a Difficulty 8 first**.” | **Yes**, decision D1. The Newcomer’s first roll was the baker’s crowded shop floor (8). | **Yes.** |
| **Ch8:** “**roll a town before the session** (it takes about half an hour)” | **No**: a ready-made town. | Read: clean. |
| **At the Table:** “open your own approach **with an unlisted trait** (2 lower, your roll only, never in a chase)” | **Yes**, Turns 3 and 5 (Through the Hedge). | **Yes**, and it matches Ch3. But the card leaves out the consequence that decided the furniture: only the opener gets through (finding M3). |

## 3. Friction findings

| # | Severity | What | Quoted passage | Where it came up | Suggested fix |
|---|---|---|---|---|---|
| M1 | **minor** | The back cover still gives the old play time. After this round Ch1 and Ch8 say a raid takes 1–2 hours; the back cover says 2–3. Same class of mistake as the change, missed in the audit. | Back cover: “For 3–5 players and a Storyteller · **2–3 hours** · ages 12+”. Ch1: “A raid runs **1–2 hours**”. Ch8: “A raid should fit in an hour or two”. | Setup (reading the book cover to cover) | “… · **1–2 hours a raid** · …” |
| M2 | **minor** | A Cost at the way out, near the Limit. The Storyteller first picked Suspicion +1 at 10 of 11 (“the one that hurts most right now”, Ch8), which would have hit the Limit as the party left. The Planner quoted “free”, and the table read it as “a Cost here costs nothing”, as FT2 (F4) and PT10 (S6) did. One lookup, but the two rules pull against each other, and this time the stakes were a final flight. | Ch4: “A Success or a Cost gets everyone out, **free**.” Ch3: “The Storyteller never picks a Cost that costs nothing right then.” Ch8: “Suspicion +1 near the Limit.” | Turn 7, the Ghost’s 7 against 8 [L14] | Ch4: “A Success or a Cost gets everyone out, free (a Cost here costs nothing).” |
| M3 | **minor** | At the Table’s open approach leaves out “only you get through”. That rule decided who could try the mirror. “Your roll only” can be read either as “only on your own roll” (Ch3’s meaning) or as “only you get past”. | At the Table: “open your own approach with an unlisted trait (2 lower, your roll only, never in a chase)”. Ch3: “Only you get through (others must beat it themselves)… you can only open an approach on your own roll.” | Turn 5, the Planner redirecting Dracula [L12] | “… (2 lower, on your own roll, and only you get through; never in a chase)”. |
| M4 | **minor** | A Critical with full charges pays nothing (repeated from FT2). The Newcomer’s first roll was 6 + 6 on the shop floor: “Did I do something good?” | Ch3: “anywhere else you get back one spent charge, up to your starting number.” | Turn 2, R14 [L2] | Leave it (it’s clear), or have the Storyteller say so. If Richard wants it to pay, options for him: (a) as now; (b) at full charges, the next Cost becomes a Success; (c) at full charges, Suspicion −1. Recommend (a): it’s rare, and (b) and (c) add rules. |
| M5 | **minor** | Furniture and the Limit: the arithmetic decides the vote, and nothing in the book warns about it. A Bulky piece one move from the way out costs at least 2 Suspicion (the end of the Turn it’s taken, and the end of the first carrying Turn), plus the loud way if that’s how it was beaten. Taken at 9, the Limit came before it could leave. The Planner worked it out, but only after the Werewolf had rolled. | Ch4: “Carrying, a move takes two Turns” · “Once taken, it raises Suspicion by 1 at the end of each Turn, even set down”. | Turns 6–7, decision D4 [L13] | Ch8, Pacing (advice only, no rule change): “A piece costs at least 2 Suspicion to get home from a location next to the way out; warn the party if that would reach the Limit.” |
| W1 | wording | Ch1 now says both “each session is one raid” and “a session often fits two”. Ch7’s Forked line (“the session ends”) also uses “session” to mean a raid. | Ch1: “**Each session is one raid** on a town you have never seen before … A raid runs 1–2 hours, **so a session often fits two**.” | Setup | “**Each raid** is on a town you have never seen before … A raid runs 1–2 hours, so an evening often fits two.” Ch7: “Forked … the raid ends.” |
| W2 | wording | “(hear the shopping list first)” hangs off “skip the choices”, so it reads as if the new player hears the list and then skips the picks. The point is to hear the list before choosing, because the Duty depends on it. | Ch2: “Every pick has a marked default, so a new player can skip the choices (hear the shopping list first); to pick at random…” | Choosing | “Every pick has a marked default, so a new player can skip the choices. Hear the shopping list before you pick: the Duty depends on it. To pick at random…” |
| W3 | wording (nit) | “The player who chose later” works when Entities are picked or rolled one at a time. It doesn’t work when a table picks all at once. | Ch2: “if two defaults clash in a party, the player who chose later picks another” | Choosing (Dracula and the Ghost) [L1] | Leave it, or add: “(choosing together, the younger player)” or “(…, roll off)”. |
| W4 | wording | Villager faces: when the watched obstacle is itself a person, is that person the face? And the sentence has two colons. | Ch8: “A watched obstacle means someone is looking: give them a face: one of a ready-made town’s villagers, or a roll.” | Turn 2 (the nosy neighbour), Turns 3 and 6 | “A watched obstacle means someone is looking. If the obstacle isn’t already a person, give them a face (one of a ready-made town’s villagers, or a roll).” |

Also noticed, not exercised (wording): At the Table’s Turns line, “Each Turn, each Entity rolls, moves or waits”, leaves out picking up, which Ch4 lists (“a roll at its location, a move, picking up, or waiting”). Suggest: “rolls, moves, picks up or waits”.

What read cleanly with no friction: the Thistlewick table and map; the Duty raise; “Several abilities may go on one roll” (Through the Hedge with Good Dog); the Monster comparing faces, and one roll, one rise (the Werewolf’s loud geese with the Monster showing: +2, not +3); the Draught and Pillar of Society in a local chase, as Hyde; the Soon Weakness; capture with nothing carried; slipping free from the Turn after; the way out’s Tell check (“when anyone first comes back to it”); abandoning a piece (“free: it stays put, goes quiet, can’t be taken again”); How the Year Went.

## 4. Table-time estimate

| Item | Count | Minutes |
|---|---|---|
| Choosing (Entities, picks, Duty clash) | flat | 20 |
| Rolls (R1–R35, less R34, which stood in for a player’s vote) | 34 | 34 |
| Party decisions (D1 plan and the mirror vote; D2 Turn 4; D3 Turn 5 and the second mirror vote; D4 keep or abandon; D5 who rolls the way out) | 5 | 5 |
| Lookups (L1–L15, listed in the log) | 15 | 30 |
| **Total** | | **89 min (about 1 h 30)** |

That fits Ch1’s new “1–2 hours” with room to spare. The back cover’s “2–3 hours” is too long (M1). The game ran 7 Turns. A raid that reaches dawn or a final flight would add about 10–20 rolls.

---

## Log A. Setup

### A.1 The Entities (R1–R8, a d8, rerolling repeats)
1 Dracula · 2 the Creature · 3 the Mummy · 4 the Werewolf · 5 the Invisible Man · 6 a Ghost · 7 a Witch · 8 Jekyll &amp; Hyde.

| Player | Roll | Entity |
|---|---|---|
| Newcomer | R1 = 7 | **a Witch** |
| Daredevil | R2 = 4 | **the Werewolf** |
| Planner | R3 = 1 | **Dracula** |
| Hoarder | R4 = 7 (repeat), R5 = 4 (repeat), R6 = 7 (repeat), R7 = 6 | **a Ghost** |
| Roleplayer | R8 = 8 | **Jekyll &amp; Hyde** |

### A.2 The town and the list (heard before picking)
**Thistlewick**, Standard, as printed in Chapter 9. Lantern Night: a costume parade through the square at midnight. Faces: the mayor, in his best costume (judging the costume contest), and the vicar (carrying a lantern and a pitchfork “for the parade”). Limit 11 · the way out 8 · the lock-up 10 · the final flight: mob 11, escape at Lead 5. The list: **the wedding cake** (baker, food, essential), **a tea service** (china shop, silver/china, essential), a top hat (hatter, cloth), a coil of rope (ironmonger, tools), turnip seed (seed merchant, plants). The furniture: a gilt mirror (Bulky) at the ironmonger, behind a watched guard dog (Charm, or Nimble the loud way, 10). All five locations are watched.

### A.3 Picks (as each persona would; no dice)
The table read Ch2’s “(hear the shopping list first)” and heard the list before picking.
- **Witch (Newcomer):** all defaults: Broomstick, Familiar’s Warning, Cook. Sly d10 · Charm d8 · Wits d12 · Brawn d6 · Nimble d4.
- **Werewolf (Daredevil):** Gift **Through the Hedge** (“it goes straight through”); Perk Night Runner (default); Gardener (default).
- **Dracula (Planner):** all defaults: Bat, Hypnotic Eyes, Butler.
- **Ghost (Hoarder):** Gift Chill (default); Perk **Already Dead** (“I’m not getting locked up”); Duty: Butler **clashes** with Dracula’s. Ch2: “the player who chose later picks another” [L1]. The Ghost was rolled after Dracula, so the Hoarder moves and picks **Tailor**: Sly d10, a d12 at the hatter.
- **Jekyll &amp; Hyde (Roleplayer):** Gift **Pillar of Society** (“a respectable doctor having a funny turn”); Perk Practised Hand (default). Duty: Librarian has no books on the list, so he picks **Handyman** (“the doctor’s instruments”).

Every list item now has its Duty: baker (Cook, the Witch), china shop (Butler, Dracula), hatter (Tailor, the Ghost), ironmonger (Handyman, Jekyll), seed merchant (Gardener, the Werewolf).

### A.4 Decision D1: the plan, and the first mirror vote
Planner: “Everyone to their own shop. Jekyll, you’re at the ironmonger, so you’re nearest the mirror.” The Storyteller (Ch8, “a new player a Difficulty 8 first”) points the Newcomer to the baker’s shop floor (8).
**Mirror vote:** Daredevil yes, Roleplayer yes, Newcomer yes (“a mirror for the great hall!”), Planner yes (“only if Suspicion is 7 or less when we take it”), Hoarder no. **4–1, go.**

## Log B. The raid

| Turn | What happened | Suspicion |
|---|---|---|
| **1** | All five move, each to their own shop. Five watched locations, one Entity arriving at each, so five Tell checks (Ch5, “among the Entities arriving (all who move there in the same Turn)”: one arrival each, no “whose” roll needed). Baker R9 = 1; china shop R10 = 5: **Dracula’s Tell** (the china shop’s window shows everyone but him); hatter R11 = 3; ironmonger R12 = 5: **Jekyll’s Tell** (the wrong hand on the latch); seed merchant R13 = 3. | 0 → **2** |
| **2** | **Witch**, baker shop floor (group, watched), Sly d12 (Cook) + Mask: 6+6 = 12 against 8, a **Critical** with full charges, so nothing back [L2] (“Did I do something good?”). **Dracula**, china shop front door, Sly d8 (Butler) + Mask: 5+6 = 11, Success. **Ghost**, hatter nosy neighbour (watched), Sly d12 (Tailor) + Mask: 2+5 = 7, a **Cost**, and the top hat is his. The Storyteller can’t drop what the roll won, and neither near dawn nor near the Limit applies, so **Suspicion +1**: the neighbour shrieks “I saw that!” and is the face herself (ruling, W4) [L3]. **Jekyll**, ironmonger cart, Brawn d6 (Handyman) + Mask: 5+3 = 8 against 6, Success. **Werewolf**, seed merchant geese, **loud** Nimble d12 + Monster, no charge: 2+6 = 8 against 6, Success, but the Monster’s 6 beat the trait die’s 2, so it showed. One roll, one rise: +2, not +3 [L4]. | 2 → 3 → **5** |
| **3** | **Witch**, baker shopkeeper (watched), Charm d10 (Cook) + Mask: 10+2 = 12, Success: **the wedding cake**. **Dracula**, china shop back room, **Bat** (charge 1): Nimble d12 (Butler) + Mask: 2+1 = 3, Trouble, not watched: +1, no chase. **Werewolf**, seed merchant watchman (watched), **Through the Hedge** (charge 1): Brawn instead, at 2 lower (8), Brawn d12 (Gardener), with **Good Dog** (charge 2) for the Monster [L5]: 1+7 = 8, Success: **the turnip seed**. The Monster showed under Good Dog, so it raises nothing (“a very large dog in the seed sacks”). **Ghost** moves to the ironmonger. **Jekyll**, ironmonger strongbox (watched), Wits d12 (Handyman) + Mask: 1+1 = 2, **Trouble**, and caught. The face is the mayor, judging the costume contest: “Splendid Hyde, doctor, but that hand is *real*!” | 5 → 6 → **7** |
| 3, chase | **Jekyll’s local chase** [L6]: Lead 1, escape at 4, mob 8 + 7/2 = **11**. Round 1, back alleys (R23 = 2): Jekyll drinks **the Draught** (charge 1), so Hyde; **Pillar of Society** (charge 2) [L7]: Nimble d10 + Monster: 5+4 = 9, a Cost, no change. Round 2, market stalls (R25 = 3): Pillar (charge 3), Hyde Brawn d12 + Monster: 5+4 = 9, a Cost. Round 3, market stalls (R27 = 3): **his Weakness**, a familiar face (“Doctor Jekyll? Is that you?”): Brawn d10. No charges left, and overdrawing Pillar would cost the same +2 the Monster risks, so plain Monster [L8]: 4+3 = 7, **Trouble**, Lead 0: **captured**. Nothing carried, so nothing taken (“it’s gone for the night, and nobody can take it again”, moot). No Tell check for a captive brought in [L9]. | 7 → **8** |
| **4** | **Decision D2.** Planner: “Hyde tries to slip free first. Witch, take the cake to the way out now, so your cat covers the Tell check there. Werewolf, come to the ironmonger. Ghost, wait for him.” **Hyde** slips free [L10], Nimble d10 + Mask against 10: 10+3 = 13, **free**, at the lock-up; he acts next Turn. **Dracula**, back room, **Bat** (charge 2): 10+5 = 15, Success: **the tea service**. **Witch** moves to the way out. First time anyone comes back to it, so a Tell check [L11]: R31 = 2, nothing (the cat’s die isn’t needed). **Werewolf** moves to the ironmonger. **Ghost** waits. | **8** |
| **5** | **Decision D3**, the second mirror vote at 8 of 11. Planner: “That’s past my 7. No.” Hoarder no; Daredevil, Roleplayer and Newcomer yes: **3–2, go.** The plan: the Werewolf opens the strongbox; Dracula comes over to charm the dog with his Charm d12. **Werewolf**, strongbox, **Through the Hedge** (charge 3, his last): Brawn d10 against 6. Planner: “If the Monster shows we’re at 10 and the mirror’s dead.” The Daredevil takes the Mask: 10+4 = 14, Success: **the coil of rope**. Then the Planner checks Ch3 against the new Ch4 line [L12]: “Only you get through (others must beat it themselves)” and “whoever is past all its obstacles may try for the piece.” Only the Werewolf can try the dog. Dracula changes course: **Dracula, the Ghost and Hyde** move to the way out (not a first visit, so no Tell check). | **8** |
| **6** | The others wait at the way out and, as Ch8 suggests, voice the parade and the vicar. Planner: “Loud Nimble puts us at 9; the mirror adds one at the end of this Turn and one at the end of the next, before you can carry it here. That’s the Limit.” Daredevil: “Then we run with it. There are five of us.” **Werewolf**, guard dog (furniture, watched), **loud** Nimble d12 + Monster: 11+2 = 13 against 10, Success; the Monster didn’t show. The vicar drops his pitchfork. He takes the **mirror** (free). End of Turn: the mirror +1 [L13]. | 8 → 9 → **10** |
| **7** | **Decision D4**, keep the mirror or abandon it. Keeping it means the Limit at the end of this Turn and a final flight with a Bulky mirror (Lead 2, escape at 5, mob 11, Mask off). Abandoning it means walking out with a Win now. Daredevil and Roleplayer keep; Planner and Hoarder abandon. The Newcomer can’t decide, so a die stands in for her (R34 = 1, abandon): “I don’t want to lose the cake.” **3–2, abandon.** The **Werewolf** abandons it (free: it stays put, goes quiet) and moves to the way out. **Decision D5:** the Ghost rolls, with the best die. **Ghost**, the way out (watched), Nimble d12 + Mask against 8: 3+4 = 7, a **Cost**, and everyone is out. The Storyteller reaches for Suspicion +1 (10 → 11, the Limit). The Planner quotes Ch4, “A Success or a Cost gets everyone out, free”, and the table rules that the Cost costs nothing (M2) [L14]. | **10** (out) |

### How the Year Went [L15]
Home: the wedding cake and the tea service (both essentials), the top hat, the coil of rope and the turnip seed: **5 of 5**. No furniture. Nobody left behind. **Win**: “Full larders, warm fires. The castle creaks happily through another year.” With nothing missing, there are no lines from the “What the castle went without” table. The Daredevil, about the mirror: “Next year.” The Roleplayer: “Dracula wouldn’t have seen himself in it anyway.”

### Lookups (2 minutes each)
L1 the Duty clash · L2 a Critical with full charges · L3 which Costs are allowed · L4 the Monster showing (faces), and one roll, one rise · L5 an open approach and a second ability on one roll · L6 local chase numbers · L7 the Draught and Pillar in a local chase · L8 the Soon Weakness, and overdraw in a local chase · L9 capture, loot taken back, no Tell check for a captive · L10 slipping free · L11 the way out’s Tell check and Familiar’s Warning · L12 “only you get through” with “whoever is past all its obstacles” · L13 carrying, and the mirror’s Suspicion · L14 abandoning, the way out, and a Cost there · L15 How the Year Went.

## Appendix: every roll

All from `node -e` with Math.random, through a small helper in my own scratch folder (not in the repository).

| # | What | Result |
|---|---|---|
| R1 | Entity, Newcomer (d8) | 7: Witch |
| R2 | Entity, Daredevil (d8) | 4: Werewolf |
| R3 | Entity, Planner (d8) | 1: Dracula |
| R4 | Entity, Hoarder (d8) | 7: repeat |
| R5 | Entity, Hoarder, reroll (d8) | 4: repeat |
| R6 | Entity, Hoarder, reroll (d8) | 7: repeat |
| R7 | Entity, Hoarder, reroll (d8) | 6: Ghost |
| R8 | Entity, Roleplayer (d8) | 8: Jekyll &amp; Hyde |
| R9 | T1 Tell check, baker (d6) | 1 |
| R10 | T1 Tell check, china shop (d6) | 5: Dracula’s Tell |
| R11 | T1 Tell check, hatter (d6) | 3 |
| R12 | T1 Tell check, ironmonger (d6) | 5: Jekyll’s Tell |
| R13 | T1 Tell check, seed merchant (d6) | 3 |
| R14 | T2 Witch, shop floor, Sly d12 + Mask d6, vs 8 | 6 + 6 = 12, Critical |
| R15 | T2 Dracula, front door, Sly d8 + Mask d6, vs 8 | 5 + 6 = 11, Success |
| R16 | T2 Ghost, nosy neighbour, Sly d12 + Mask d6, vs 8 | 2 + 5 = 7, Cost |
| R17 | T2 Jekyll, cart, Brawn d6 + Mask d6, vs 6 | 5 + 3 = 8, Success |
| R18 | T2 Werewolf, geese (loud), Nimble d12 + Monster d10, vs 6 | 2 + 6 = 8, Success, Monster shows |
| R19 | T3 Witch, shopkeeper, Charm d10 + Mask d6, vs 8 | 10 + 2 = 12, Success |
| R20 | T3 Dracula, back room (Bat), Nimble d12 + Mask d6, vs 8 | 2 + 1 = 3, Trouble |
| R21 | T3 Jekyll, strongbox, Wits d12 + Mask d6, vs 8 | 1 + 1 = 2, Trouble, caught |
| R22 | T3 Werewolf, watchman (Through the Hedge, Good Dog), Brawn d12 + Monster d10, vs 8 | 1 + 7 = 8, Success |
| R23 | T3 chase round 1, ground (d6) | 2: back alleys |
| R24 | T3 chase round 1, Hyde Nimble d10 + Monster d10, vs 11 | 5 + 4 = 9, Cost |
| R25 | T3 chase round 2, ground (d6) | 3: market stalls |
| R26 | T3 chase round 2, Hyde Brawn d12 + Monster d10, vs 11 | 5 + 4 = 9, Cost |
| R27 | T3 chase round 3, ground (d6) | 3: market stalls |
| R28 | T3 chase round 3, Hyde Brawn d10 (Weakness) + Monster d10, vs 11 | 4 + 3 = 7, Trouble, captured |
| R29 | T4 Hyde slips free, Nimble d10 + Mask d6, vs 10 | 10 + 3 = 13, free |
| R30 | T4 Dracula, back room (Bat), Nimble d12 + Mask d6, vs 8 | 10 + 5 = 15, Success |
| R31 | T4 Tell check, the way out (d6) | 2 |
| R32 | T5 Werewolf, strongbox (Through the Hedge), Brawn d10 + Mask d6, vs 6 | 10 + 4 = 14, Success |
| R33 | T6 Werewolf, guard dog (loud), Nimble d12 + Monster d10, vs 10 | 11 + 2 = 13, Success |
| R34 | T7 the Newcomer’s undecided vote (d6: 1–3 abandon, 4–6 keep) | 1: abandon |
| R35 | T7 Ghost, the way out, Nimble d12 + Mask d6, vs 8 | 3 + 4 = 7, Cost |
