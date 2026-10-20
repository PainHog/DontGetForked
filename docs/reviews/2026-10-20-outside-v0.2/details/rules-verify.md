# Don't Get Forked v0.2: rules re-review

**What was checked:**
- Every rules item from the v0.1 review: D1–D8, R1–R28 and the Section 4 Entity notes.
- The whole v0.2 text, with every changed passage in the word-level diff read in context.
- At the Table (p33), the Entity Sheet (p32), the Example of Play (p28–29) and the three towns (p29–31, maps re-rendered and checked) against the changed chapters.
- Re-simulation with the v0.1 simulator, updated to the v0.2 rules. The heuristic party policy, seeds and party mixes are unchanged.

**Conventions:**
- Page numbers are v0.2's printed page numbers.
- Quotes are verbatim from v0.2, with straightened apostrophes.
- Severity follows the v0.1 review:
  - **blocker:** a table must invent a ruling, and that ruling decides the outcome;
  - **confusing:** readers will disagree or misplay;
  - **minor:** polish, or a small effect.
- All fixes are suggestions. "Not changed" just records that a design was kept.

**Simulator check:** with every v0.2 switch turned off, the updated simulator reproduces the v0.1 review's raid and chase outputs exactly, from the same seeds. So each v0.1→v0.2 difference below comes from a rule change.

---

## Summary

**v0.1 items (45):**

| Status | Count | Items |
|---|---|---|
| Fixed | 28 | D1, D2; R1–R12, R14, R17–R20, R22–R28; Creature, Witch |
| Partly fixed | 6 | D3, D4, D6, D7; R15; Dracula |
| Changed differently | 3 | D5 (lower Limits, plus a note that Hard means running for it); R16 (Tell timing solved by "ask first"); Mummy (Fear the Curse became the default) |
| Not changed | 6 | D8; R13, R21; Invisible Man, Ghost, the general "raise on a d12" note |
| No change asked | 2 | Werewolf, Jekyll & Hyde |

**The fixes are clean, and the big one works.** The local chase now:
- raises Suspicion once, when it ends, against a mob fixed at the start;
- costs +1.6 to +1.8 Suspicion on average, never more than +2 without an overdraw (v0.1: +3.6 to +4.9);
- can't end the raid if it starts more than 2 below the Limit.

One failed roll at a watched obstacle now costs at most +4 in all (+2 on the roll, +2 for the chase), so v0.1's Turn-2 Bust can't happen. Solo escape from Suspicion 4 is now 53–83%, up from 23–55%.

**No blockers. Top new issues:**
1. **Confusing (p14):** "(A Ghost's Spectral pass, with no roll, doesn't pick it.)" doesn't say whether the Ghost is still past the first obstacle if the party then picks the *other* way in.
2. **Minor (balance):** Thistlewick is now much harsher on Monster-happy tables. Reckless play wins 52% (v0.1: 63%). Two changes do it: the Standard Limit of 10, and the strongbox moving from Difficulty 8 to 10. Careful play barely changes: 74–80%, against 75–78% in v0.1.
3. **Minor (p25):** "most Hard raids end in the final flight" holds for Gallowsmere (58%), but not for rolled Hard towns (44–48%).
4. **Minor wording and cross-references:**
   - "any of them" on p7;
   - whether each overdraw in a local chase adds +2;
   - "(its page follows)" on p28;
   - "(Rolling a Town, step 3)" points at the wrong list;
   - "Capture is only a setback";
   - Fear the Curse when a fellow runner gives up;
   - two new rules missing from At the Table.
5. **Kept designs that still show in the numbers:**
   - Time never binds: dawn comes in under 1% of raids.
   - Tells are now a quarter of the Easy and Standard Limits.
   - The Ghost's default Perk (Spectral) is still her weakest: about 6 points below Rattle and Already Dead on Standard, and 8 below Already Dead on Hard. She's the lowest Entity on Standard.

**Headline Win rates** (party of 3, 4 and 5; same policy and seeds):

| Level | v0.1 | v0.2 | Target |
|---|---|---|---|
| Easy: Puddlecombe / rolled | 86–89 / 91–93 | 88.5–92 / 92–95 | ~90 |
| Standard: Thistlewick / rolled | 73–80 / 71–76 | 71–78.5 / 72.5–80 | ~75 |
| Hard: Gallowsmere / rolled | 47–56 / 51–58 | 48.5–58 / 53–62 | 55–60 |

The curve barely moved. The new chase alone is worth about +4.5 to +7.5 points. The lower Limits take 1.5–3.5 back, and Thistlewick's harder strongbox takes about 3 more. What changed is **variance**: Suspicion now climbs in small, predictable steps, with no runaway chases.

---

## 1. Verification table

### 1a. Design decisions (v0.1 Section 2)

| # | Status | v0.2 page | v0.2 wording | Note |
|---|---|---|---|---|
| D1 Local chase feeds on its own Suspicion | **Fixed** (options a and b both) | 17; also 12, 16, 25, 33; example p28 | p17: "The mob's Difficulty: 8 plus half the Suspicion when the chase starts, rounded down, at most 12. It stays the same for the whole chase." · "One chase, one rise. A local chase raises Suspicion once, when it ends, by the biggest trigger among all its rolls, however many rounds it took and whoever rolled them: Trouble +1, the Monster showing +2. An overdraw in the chase adds its +2 on top. Until the chase ends, Suspicion stays where it was." · p28: "(Once the Monster has shown in a chase, letting it out again costs nothing more, which is why she kept it out.)" | See §3.1 for the numbers. Under one rise, Suspicion can't move during the chase, so "fixed mob" is redundant: the simulator gives identical results with or without it. Harmless. The example now explains the choice instead of showing a Mask round. That is the right lesson under the new rule, because the Mask now almost never pays in a local chase (Creature with the Mask only: 59 / 13 / 2% escape from Suspicion 0 / 4 / 8). |
| D2 A runner can't give up | **Fixed** | 18, 33 | "Giving up. At the start of any round, a runner may give up and be captured, with no roll. Anyone caught with it carries on without it." The v0.1 line "even if a runner's own roll brought it there on purpose" is gone. | The Limit can't arrive mid-chase any more, so overdrawing on purpose to end a chase is gone too. Giving up hardly changes Win rates (§3.7). It's a release valve, not a strategy. |
| D3 Overdraws nearly free | **Partly fixed** | 12, 16, 19 | p12: "it costs Suspicion +2 instead of a charge, on top of anything else the roll raises." · p16: "The one exception is an overdraw, which always adds its +2 on top." | Option (a) was taken outside the flight. **The flight half is not changed:** "From your own next roll to the end of the flight, your trait die is one size smaller (if you overdraw on your own roll, that roll doesn't take it)." For a Soon Entity, an overdraw on its own roll in round 2 still costs nothing, since its Weakness arrives in round 3 anyway. The R5 wording also makes a round-1 overdraw cost only round 2. |
| D4 Spectral skips rolls | **Partly fixed** (the way-in note only) | 10, 14 | p10, unchanged: "Group obstacles ... don't stop you: no roll and no action, so you can still move or roll that Turn." · p14, new: "(A Ghost's Spectral pass, with no roll, doesn't pick it.)" | The design is kept. The new note helps the party a little (+0.5 points on Thistlewick), but it opens N1. |
| D5 Hard decided by the flight; time; party size | **Changed differently** | 16, 25, 33, towns | The Limits are now "9 on Easy, 10 on Standard and 13 on Hard" (v0.1: 11/11/15). · p25: "On Hard, expect to run for it: most Hard raids end in the final flight, with the loot on your backs." | Hard is now stated as intended. **Not changed:** 12 Turns, so time still doesn't bind. Parties leave at Turn 5.5–9.5 on average, and dawn flights happen in under 1% of raids. **Not changed:** party size. A party of 3 vs 5 wins 88.5 vs 92% on Easy and 48.5 vs 58% on Hard. "Most" fits Gallowsmere but not rolled Hard towns (N5). |
| D6 Danger inverted; dead charges in the flight | **Partly fixed** | 7, 13, 18, 33 | p18: "Any ability may also be spent as a raise (the trait die one size bigger) instead of doing what it usually does. Still one raise per roll." | Dead charges are fixed. That's worth only about +1 point of flight escape with full charges (§3.2), but it fixes the feel. **Not changed:** a local chase still starts at Lead 1, and the flight mob is the same. The inversion has largely gone anyway, because the local chase got kinder. From Suspicion 0, a lone runner is now captured 3–18% of the time (v0.1: 8–30%). The flight is Forked 25–34% of the time with no charges, and 9–18% with full charges (3–5 runners, Standard or Hard). |
| D7 Capture, rescue, everyone captured | **Partly fixed** | 18, 20, 25, 33 | p18: "Everyone held. If every Entity in the party is held at once, the night ends there and then. The town has the lot of you, and the year is Forked." · p20: "Forked: Cornered in the final flight, or every Entity held at once" | Everyone held is fixed. It is rare (0–0.1% of simulated raids). **Not changed:** captured loot is still lost ("It's gone for the night"); the lock-up is still "10 10 10"; a failed rescue still starts a chase; a shared chase still starts at Lead 1 and loses both runners in round 1 4.7% / 15% / 33% of the time from Suspicion 0 / 4 / 8. Captures per raid went *up* slightly (Standard 0.22–0.25, was 0.16–0.20), because every chase now runs to an end. In v0.1, some chases were cut short by the Limit. |
| D8 Tells tax splitting up | **Not changed** (explained instead) | 14, 16 | p16, unchanged: "roll a d6, and on 4–6 a Tell goes off. Each place is checked once a raid". p14 adds: "The party may split up, and it costs no extra Tells, only earlier ones (Chapter 5)." | Mostly true: there's one check per place either way. The exception is the Witch (N4). With the lower Limits, Tells are now a bigger share of the track: 2.2 of 9 on Puddlecombe (24%) and 2.6 of 10 on Thistlewick (26%), against 20% and 24% in v0.1. |

### 1b. Rules gaps and contradictions (v0.1 Section 3)

| # | Status | v0.2 page | v0.2 wording | Note |
|---|---|---|---|---|
| R1 A Success that fills the Limit | **Fixed** | 16 | "A roll's result comes first, so if the roll that reaches the Limit gets the party out, it's out, and captives it frees join the flight." | It covers rescues too. |
| R2 Sequencing mid-Turn | **Fixed** | 14 | "Finish one Entity's action, chase and all, before the next begins; if the hunt starts mid-Turn, anyone who hasn't acted yet doesn't." | It isn't on At the Table (N10). |
| R3 "only moves the Lead" | **Fixed** | 12, 17 | p12: "A local chase still raises Suspicion, once, when it ends (Chapter 6)." · p17: "A chase roll moves the Lead instead of getting you past an obstacle." | |
| R4 Way out: tries per Turn | **Fixed** | 14, 15, 33 | p14: "though the way out can be rolled only once a Turn" · p15: "The way out can be rolled once a Turn, so try again next Turn." | |
| R5 When a flight overdraw starts | **Fixed** | 19 | "(if you overdraw on your own roll, that roll doesn't take it)" | p32 and p33 ("from your next roll") agree. |
| R6 Pending Costs | **Fixed** | 12 | "Your next roll's trait die is one size smaller, whatever that roll is, a chase's included." · "Lose a Turn ... If the hunt starts first, it lapses." | |
| R7 Difficulty words | **Fixed** | 12, 27, 33 | "compare the total with the obstacle's Difficulty, which is 6, 8, 10 or 12." · p27: "a smaller die before a big roll" | A trace is left on p22: "setting its difficulty" (lowercase, meaning the level). Trivial. |
| R8 Castle Duty clashes | **Fixed** | 6, 7 | p6: "To pick a Gift or a Perk at random ... For Castle Duty, roll on its table below." · p7: "the player who chose their Entity later picks another or rolls a d6, rolling again on any Duty already taken. A Duty whose kind isn't on the list gives no edge that raid, so pick one that is where you can." | |
| R9 Campaign re-picks | **Fixed** | 6, 21 | p6: "the picks are made again each raid." · p21: "Each raid, the players pick Castle Duty, Gift and Perk again after hearing the new list, but the Entities themselves never change." | |
| R10 When the way in is locked | **Fixed** | 14, 28 | "The party picks one the first time anyone rolls at one of them ... (A Ghost's Spectral pass, with no roll, doesn't pick it.)" | An own approach is a roll, so it does pick the way in. That is now defined. N1 covers the Spectral side. |
| R11 Critical refund | **Fixed** | 12 | "the roller gets back one charge it has spent this raid (never more than it started with; an overdraw isn't a charge)." | |
| R12 Two carriers | **Fixed** | 15 | "A Huge piece's two carriers both count as carrying it, move together, and lose it if either is captured." | "Both count as carrying" covers the Mask, Nimble and the extra Turn. "One carrier caught" is still open, but the stakes are low, because the chase ends in the same Turn. |
| R13 Spectral during a move | **Not changed** | 10 | "no roll and no action, so you can still move or roll that Turn." | The Thistlewick top hat still needs only the move. |
| R14 Who holds the item | **Fixed** | 14 | "If several get past at once, they choose who holds it." | |
| R15 "small" entrances | **Partly fixed** | 15, 23, 25 | p15: "A Huge piece can't go through a way in or way out that a map marks small." · p25: "In a rolled town no way in or way out is small." | p23 still says "mark some entrances small, even the way out", and the map key has no symbol for it. Side effect: if a location's *picked* way in is small, its Huge piece can never leave. |
| R16 Tell timing and picking die | **Changed differently** | 16 | "(number them and roll a d6, rerolling unused numbers) ... Ask first who else is coming this Turn, since a later arrival isn't checked." | The die is fixed as suggested. The timing is handled by asking first instead of checking at the end of the Turn. That works. |
| R17 Slipping free; a captive's loot | **Fixed** | 15, 18 | p18: "The captive, as its action, once per Turn" · p15: "(though a captive who kept its loot can hand it out)" | |
| R18 Leaving the piece | **Fixed** | 15 | "Taking the piece, once you're past its obstacle, is free, then or on a later Turn." | p27's "at least 1, and usually 2" now follows from the rules. |
| R19 Second way in; five of one kind | **Fixed** | 23 | "For the first obstacle, roll all three dice twice, once for each way in." · "they share places, two to a place" | |
| R20 Carrying on two-Turn moves | **Fixed** | 14, 28, 33 | "Carrying furniture adds one Turn to any move." | p27 still says "two Turns" (N12). |
| R21 No Difficulty floor | **Not changed** | 9, 13 | (no floor) | Fetch plus Mesmerise at the Easy way out still gives Difficulty 3. Harmless. |
| R22 Play time | **Fixed** | 5, 27, 34 | Back cover: "1–2 hours a raid" | |
| R23 "Killed"; Forked wording | **Fixed** | 18, 20 | p18: "the party is forked, and the year's result is Forked." · p20: "the raid is lost, and nothing comes home" · "a Forked year stays Forked." | |
| R24 The Draught on a friend's roll | **Fixed** | 7, 13, 29 | p7: "an approach of your own, or the Draught, only ever works on your own roll." · p29: "(Any ability but an approach of your own or the Draught can go on a friend's roll ...)" | |
| R25 The Storyteller's dice | **Fixed** | 5 | "For the Storyteller, a d20, a d10 and two d6." | |
| R26 "every roll" | **Fixed** | 5 | "Choose on most rolls" | |
| R27 The furniture before picks | **Fixed** | 6 | "The Storyteller reads out the shopping list and the furniture before anyone picks" | |
| R28 At the Table / Sheet omissions | **Fixed** (all six) | 32, 33 | "Forked: cornered in the flight, or everyone held." · "except at the way out and the lock-up" · "but not a captive's arrival, and the way out only once anyone comes back" · "never while it's in play" · "The Mask allowed (not carrying furniture)" · Sheet: "Between places (carrying)", "Caught (a local chase)", plus a Notes box | |

### 1c. Entity tuning notes (v0.1 Section 4)

Simulated Win for a party of 4 that always includes the Entity, Standard / Hard, v0.1 → v0.2 with the same seeds. The average across all Entities moved −1.6 on Standard and +2.6 on Hard.

| Entity | Status | v0.2 wording | Win v0.1 → v0.2 | Note |
|---|---|---|---|---|
| Dracula | **Partly fixed** | Hypnotic Eyes is still the default, unchanged. Wall-Crawler: "In a chase you can always roll Nimble, whatever the ground, and your Nimble die is one size bigger (the roll's one raise)." | 75.8 / 51.1 → 75.3 / 53.8 | **Wall-Crawler is fixed.** It now cancels Garlic on Nimble and adds +4 / +11 / +15 points of solo escape from Suspicion 0 / 4 / 8 (v0.1: +2 to +4). That's on a par with Fly by Night. Flight escape rises from 79% to 84%. **Hypnotic Eyes is not changed.** It still simulates the same as having no Perk (75.1 vs 74.8). |
| Creature | **Fixed** | "Tireless (default)" | 77.1 / 50.4 → 74.7 / 51.6 | Strong Back is no longer a dead default. The simulator doesn't model furniture, so Tireless doesn't show up in these numbers. |
| Mummy | **Changed differently** | "Fear the Curse (default)" | 76.3 / 47.3 → 76.8 / 50.5 | She is now the second-best solo chaser: 91 / 73 / 38% escape from 0 / 4 / 8. Fear the Curse beats Patience of Ages by +0.5 on Standard and +1.7 on Hard. Patience itself is unchanged and still rarely matters. |
| Werewolf | No change asked | (unchanged) | 78.3 / 52.4 → 74.8 / 54.1 | Night Runner is still the best chase Perk (97 / 83% escape). Fetch is the strongest Werewolf Perk for the whole raid (75.4 / 56.2, and Forked only 3–10%). |
| Invisible Man | **Not changed** | Out of Sight: "unless you, or anyone in the same place, carries loot or furniture." | 81.1 / 54.6 → 79.4 / 58.4 | Still the best Entity overall. |
| Ghost | **Not changed** | Spectral and Through the Wall still switch off "while you carry loot or furniture". | 70.4 / 49.2 → 70.8 / 51.0 | Still the lowest Entity on Standard, 2 points below the next. **Spectral simulates as her weakest Perk:** 70.5 / 50.0, against Rattle 76.1 / 52.5 and Already Dead 76.9 / 58.4. Making Already Dead (or Rattle) the default would bring her into the pack. |
| Witch | **Fixed** | "A Potion for That (default)" · Hedge Spell: "Old village magic: a muttered word, a pinch of salt, and luck leans her way." | 76.8 / 50.5 → 72.9 / 54.1 | Potion vs Broomstick, under v0.2: −2.2 on Thistlewick, +3.0 on Gallowsmere. That's a wash, within policy noise. Black Cat simulates best on both (77.3 / 56.3). No action needed. |
| Jekyll & Hyde | No change asked | Trample gains a flavour line ("Hyde doesn't wait to be let in.") | 76.0 / 50.4 → 74.1 / 52.8 | |
| General: a raise on a d12 | **Not changed** | "A d12 can't go higher." | — | It reaches a little further now: the new flight rule ("any ability ... as a raise") does nothing for a d12 roll until a Weakness steps it down. |

---

## 2. New issues in v0.2

No blockers were found. Each changed passage was read in context. Every chapter and page reference was checked, as were the contents page, At the Table, the Sheet and the three towns.

| # | Sev. | Page | Exact quote | Problem | Suggested fix |
|---|---|---|---|---|---|
| N1 | **confusing** | 14 (with 10) | "(A Ghost's Spectral pass, with no roll, doesn't pick it.)" + "everyone uses only that one there for the rest of the raid." | The Ghost passes way in A, a group obstacle. Later, the party rolls at way in B, which picks B. Is she still past the location's first obstacle, or must she now get past B? It decides whether she can go on to the item. The simulator assumed she stays past. | "...doesn't pick it, and she stays past the first obstacle whichever way in the party picks later." Or the reverse: "...her pass counts only if the party later picks that way in." |
| N2 | minor | 7 (with 13, 18) | "an approach of your own, or the Draught, only ever works on your own roll. In the final flight, any of them may be spent as a raise instead." | Read literally, "any of them" means only the approach and the Draught. It's also unclear whether an approach or the Draught, spent as a raise, can go on a friend's roll: p13 says "You can open an approach, or drink the Draught, only on your own roll", but p18 says "Abilities can go on anyone's roll". | "In the final flight, any signature or Gift, an approach or the Draught included, may be spent as a raise on anyone's roll." |
| N3 | minor | 17, 19 | "An overdraw in the chase adds its +2 on top." | Is that once per chase, or once per overdraw? A runner with no charges might overdraw every round of a long chase. | "Each overdraw in the chase adds +2 on top." |
| N4 | minor | 14 | "The party may split up, and it costs no extra Tells, only earlier ones (Chapter 5)." | It does cost extra Tells with the Witch, because her Familiar's Warning covers only the places she arrives at. | "...no extra Tells (unless the Witch's cat was covering you), only earlier ones." |
| N5 | minor | 25 | "On Hard, expect to run for it: most Hard raids end in the final flight, with the loot on your backs." | 58% of Gallowsmere raids end in the final flight, but only 44–48% of rolled Hard towns (§3.3–3.4). | "...about half of Hard raids end in the final flight". |
| N6 | minor | 28 | "Four players raid Thistlewick (its page follows)" | The page after the example is Puddlecombe (p29). Thistlewick is on p30. | "(page 30)". |
| N7 | minor (old; missed in the v0.1 review) | 23, 25, 26 | p26: "It stands behind one extra obstacle, after that location's last (Rolling a Town, step 3)." · p23 and p25: "(Rolling a Town, step 4)" | p23 has two numbered lists. Step 3 of "Rolling a Town" is "Roll the furniture", so p26 sends the reader back to itself; the extra obstacle is step 3 of the second list, "Placing the locations and their obstacles". "Step 4" works only loosely: the ceiling is sub-step 4 inside top-level step 4. | "(Placing the locations, step 3)" and "(Placing the locations, step 4)", or number the second list 4a–4d. |
| N8 | minor | 27 | "The lock-up. Capture is only a setback." | Capture also loses the captive's loot for the night. And if it takes the last free Entity, the year is now Forked (p18). | "Capture is a setback, not the end, unless it takes the last of you." |
| N9 | minor | 9 (with 17, 18) | Fear the Curse: "When you flee alone, the mob's Difficulty in your local chase is 1 lower." | If the Mummy's fellow runner gives up, she is now fleeing alone. Does the mob drop by 1 mid-chase, against "It stays the same for the whole chase"? | "...if you're fleeing alone when the chase starts." |
| N10 | minor | 33 | TURNS: "Each Turn, each Entity takes one action: roll, move, pick up or wait." · SUSPICION: "At the Limit, or at dawn, the hunt is on: the final flight." | Two rules a table needs mid-play are missing: one action at a time, with "anyone who hasn't acted yet doesn't" (R2), and "a roll's result comes first" (R1). | Add: "One at a time, chase and all; if the hunt starts mid-Turn, the rest don't act." And: "A roll's result comes first: if it gets you out, you're out." |
| N11 | minor | 16, 25, 29 | "a Limit: 9 on Easy, 10 on Standard and 13 on Hard." | Easy now has a lower Limit than Standard. That's fine for balance (Easy simulates at 88.5–95%), but readers will think it's a misprint. | Add a clause on p25 ("a small town notices sooner"), or use 10 / 10 / 13. Easy would gain about 1–2 points. |
| N12 | minor | 27 | "A carried move takes two Turns, so even a piece carried straight to the way out adds at least 1" | Since R20, a move the map marks as two Turns takes three while carrying. | "A carried move takes at least two Turns". |

**Checked and consistent:**
- Every "Chapter N" reference, and the contents page (The Eight 7, The Chase Table 19, The Obstacle Table 24, The Shopping List 26, An Example of Play 28, Puddlecombe 29, Thistlewick 30, Gallowsmere 31).
- pp12, 16, 17, 18, 19, 25 and 33 agree on: one rise per chase, the overdraw on top, the Lose a Turn lapse, the Limit during a chase, giving up, and everyone held.
- Already Dead's new sentence (p10) matches pp16 and 18.
- The Sheet matches the chapters. At the Table matches them too, apart from N10.
- The example's Witch spends Hedge Spell, not her new default Gift. That is still a correct play: both give a d10 there.

### Town check (Chapter 9 against the changed Chapter 8)

Re-checked line by line:
- list size and essentials;
- every item's kind against its place;
- two ways in with different quiet traits;
- 1–3 obstacles per location;
- furniture obstacles at the rolled Difficulty +2, at most 12;
- the 12-ceiling (Gallowsmere's furniture trapdoor 12 is a rolled 10, so it doesn't count);
- no 6s on Hard;
- villagers and customs come from the d6 tables;
- each town's header against p25: Limits 9/10/13, way out 6/8/10, lock-up 10, mob 10/11/11, escape at 5/5/6;
- every eye and star on all three maps (re-rendered).

**All consistent.**

One unannounced change: **Thistlewick's strongbox is now Difficulty 10, not 8** (p30). It is still within the Standard rules. It costs Thistlewick about 3 points of Win for a careful party, and about 6 for a reckless one (§3.6, §3.8).

---

## 3. Numbers: v0.1 vs v0.2

**Method:**
- The same heuristic party policy is used throughout, so the numbers compare.
- **"v0.1"** is the updated simulator with every v0.2 switch off. It is identical to the v0.1 review's simulator.
- **"v0.2"** has all the switches on:
  - the fixed mob and one rise per local chase;
  - Limits 9/10/13;
  - flight raises;
  - everyone held means Forked;
  - a roll's result comes first;
  - the new default Perks and Gifts;
  - Wall-Crawler's raise;
  - a Spectral pass doesn't pick the way in;
  - Thistlewick's strongbox at 10.
- Runs per row: 6,000 raids for towns, 4,000–5,000 for per-Entity and variant rows, 20,000 chases or flights.
- Treat differences under about 2 points as noise.
- As in v0.1, the simulator doesn't model furniture (so there are no Grand Years) or overdraws.

### 3.1 Local chase escape table

Solo runner, default kit, no charges. **Standard**: v0.1 at Limit 11, v0.2 at Limit 10. Each cell shows clean escape % (escaped, and the raid goes on) / captured % / % where the chase ends the raid (the Limit is reached), then the Suspicion the chase itself added.

| Entity | Start 0: v0.1 | Start 0: v0.2 | Start 4: v0.1 | Start 4: v0.2 | Start 8: v0.1 | Start 8: v0.2 |
|---|---|---|---|---|---|---|
| Dracula | 68 / 24 / 9, +4.4 | 83 / 17 / 0, +1.8 | 29 / 48 / 28, +3.9 | 58 / 42 / 0, +1.7 | 6 / 58 / 45, +2.1 | 2 / 78 / 69, +1.7 |
| Creature | 59 / 30 / 14, +4.9 | 82 / 18 / 0, +1.8 | 23 / 52 / 32, +4.2 | 53 / 47 / 0, +1.8 | 5 / 58 / 48, +2.2 | 2 / 82 / 71, +1.7 |
| Mummy | 63 / 27 / 13, +4.8 | 91 / 9 / 0, +1.8 | 26 / 49 / 31, +4.1 | 73 / 27 / 0, +1.8 | 6 / 55 / 49, +2.2 | 3 / 62 / 77, +1.7 |
| Werewolf | 86 / 8 / 7, +3.6 | 97 / 3 / 0, +1.6 | 55 / 21 / 29, +4.0 | 83 / 17 / 0, +1.7 | 22 / 22 / 73, +2.5 | 10 / 54 / 82, +1.7 |
| Invisible Man | 75 / 18 / 8, +4.0 | 87 / 13 / 0, +1.7 | 40 / 38 / 26, +3.8 | 67 / 33 / 0, +1.7 | 11 / 47 / 51, +2.2 | 4 / 67 / 73, +1.7 |
| Ghost | 65 / 27 / 10, +4.6 | 82 / 18 / 0, +1.8 | 28 / 49 / 28, +4.0 | 56 / 44 / 0, +1.8 | 6 / 58 / 46, +2.2 | 2 / 78 / 72, +1.7 |
| Witch | 70 / 22 / 10, +4.4 | 86 / 14 / 0, +1.7 | 33 / 43 / 29, +4.0 | 62 / 38 / 0, +1.7 | 8 / 51 / 50, +2.2 | 3 / 74 / 73, +1.7 |
| Jekyll | 74 / 20 / 7, +4.0 | 86 / 14 / 0, +1.8 | 37 / 41 / 26, +3.8 | 64 / 36 / 0, +1.7 | 9 / 51 / 48, +2.2 | 3 / 70 / 72, +1.7 |

**Reading:**
- From Suspicion 0 and 4, chases got much kinder. Clean escape is now 82–97% and 53–83% (v0.1: 59–86% and 23–55%), and these chases can never end the raid.
- From Suspicion 8 on Standard, a caught runner almost always ends the raid, as in v0.1. One Monster showing (+2) now reaches the Limit, so clean escape there is only 2–10%.
- **Hard** (v0.1 Limit 15, v0.2 Limit 13), from Suspicion 0 / 4 / 8: clean escape is 82–97 / 53–83 / 18–47%, against 62–87 / 28–61 / 12–36% in v0.1. On Hard, no chase that starts below Suspicion 11 can reach the Limit.
- **With 3 charges** (Standard), from Suspicion 0 / 4: 85–98 / 61–85% (v0.1: 71–94 / 33–70%). The Werewolf and the Invisible Man add only +0.6–1.0, because Good Dog and Unseen stop the Monster raising Suspicion.
- **Mask only** (Standard, Creature), from Suspicion 0 / 4 / 8: 59 / 13 / 2%, against 82 / 53 / 18% when it takes the Monster. The Mask is now almost never right in a local chase.
- **Shared chase** (Creature + Mummy, Standard), captured: 7 / 32 / 77% from Suspicion 0 / 4 / 8. Both runners are captured in round 1 4.7 / 15 / 33% of the time, the same as v0.1 (D7).

### 3.2 Final flight (escape %)

| Level (mob, escape at) | Charges | 1 Entity | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Easy (10, 5) | 0 (v0.1 = v0.2) | 81.3 | 89.5 | 90.7 | 92.9 |
| Easy | 3: v0.1 → v0.2 | 87.0 → 87.6 | 95.2 → 95.6 | 96.2 → 96.4 | 97.7 → 97.8 |
| Standard (11, 5) | 0 | 60.0 | 69.7 | 71.1 | 75.0 |
| Standard | 3: v0.1 → v0.2 | 69.4 → 70.7 | 83.7 → 84.9 | 86.5 → 87.4 | 90.3 → 90.6 |
| Hard (11, 6) | 0 | 55.9 | 66.5 | 68.3 | 72.2 |
| Hard | 3: v0.1 → v0.2 | 64.4 → 66.1 | 81.3 → 81.9 | 84.9 → 85.2 | 88.5 → 88.8 |

"Any ability as a raise" adds 0.2–1.7 points. The heuristic already spent the raise and trait abilities, so the gain is mostly feel: the Invisible Man's charges are no longer dead.

### 3.3 Whole raids: the three towns

| Town | Party | Win v0.1 → v0.2 | Forked | Limit hit | Ended in final flight | Mean exit Turn | Dawn flight | Suspicion after T3 | Chases / captures per raid |
|---|---|---|---|---|---|---|---|---|---|
| Puddlecombe (Easy) | 3 | 85.9 → **88.5** | 1.2 → 0.9 | 16.3 → 13.9 | 16 → 14 | 7.4 → 7.3 | 0 → 0 | 3.7 → 3.5 | 0.41 / 0.13 → 0.41 / 0.12 |
| | 4 | 88.0 → **91.6** | 1.0 → 0.5 | 16.8 → 9.7 | 17 → 10 | 6.5 → 6.2 | 0 → 0 | 4.5 → 4.2 | 0.42 / 0.15 → 0.42 / 0.12 |
| | 5 | 88.9 → **92.1** | 0.4 → 0.5 | 14.9 → 11.8 | 15 → 12 | 5.5 → 5.5 | 0 → 0 | 5.4 → 5.0 | 0.38 / 0.12 → 0.40 / 0.12 |
| Thistlewick (Standard) | 3 | 72.8 → **71.3** | 7.9 → 8.3 | 29.7 → 32.4 | 30 → 32 | 8.3 → 8.2 | 0 → 0 | 3.5 → 3.5 | 0.51 / 0.20 → 0.57 / 0.25 |
| | 4 | 76.3 → **74.7** | 5.3 → 5.9 | 26.8 → 28.8 | 27 → 29 | 7.4 → 7.4 | 0 → 0 | 4.3 → 4.2 | 0.48 / 0.19 → 0.55 / 0.24 |
| | 5 | 80.0 → **78.5** | 3.7 → 4.0 | 24.4 → 25.7 | 24 → 26 | 6.6 → 6.7 | 0 → 0 | 4.9 → 4.5 | 0.45 / 0.16 → 0.54 / 0.22 |
| Gallowsmere (Hard) | 3 | 46.9 → **48.6** | 18.6 → 18.8 | 58.1 → 57.1 | 60 → 58 | 9.8 → 9.5 | 1.4 → 0.9 | 5.6 → 4.6 | 1.04 / 0.49 → 1.07 / 0.52 |
| | 4 | 50.8 → **52.9** | 16.9 → 16.5 | 60.3 → 58.5 | 61 → 59 | 8.9 → 8.7 | 0.3 → 0.2 | 6.3 → 5.3 | 1.08 / 0.50 → 1.12 / 0.55 |
| | 5 | 55.9 → **58.0** | 12.3 → 14.0 | 58.6 → 57.9 | 59 → 58 | 8.1 → 7.9 | 0.1 → 0 | 7.3 → 6.2 | 1.10 / 0.51 → 1.15 / 0.56 |

Tells per raid stay the same: 2.1–2.2 in Puddlecombe, 2.6–2.7 in Thistlewick and 2.5–2.6 in Gallowsmere. They are now 24%, 26% and 20% of the Limit.

### 3.4 Rolled towns (Chapter 8 tables)

| Level | Party | Win v0.1 → v0.2 | Forked | Limit hit | Ended in final flight | Mean exit Turn |
|---|---|---|---|---|---|---|
| Easy | 3 / 4 / 5 | 90.9 / 92.5 / 92.4 → **92.2 / 94.5 / 94.8** | 0.2–1.3 | 9.5–11.7 (was 10–12) | 10–12 | 5.6–7.1 |
| Standard | 3 / 4 / 5 | 70.8 / 72.5 / 75.7 → **72.5 / 75.8 / 79.6** | 4.5–8.1 | 26.7–30.5 (was 32–34) | 27–31 | 6.9–8.5 |
| Hard | 3 / 4 / 5 | 50.6 / 54.1 / 57.7 → **52.7 / 57.5 / 62.0** | 9.5–14.9 | 44.2–47.3 (was 48.5–51) | **44–48** | 7.4–9.1 |

Rolled towns still land within about 5 points of the ready-made ones. Gallowsmere is still a little harder than an average rolled Hard town (52.9 vs 57.5 with 4 players).

### 3.5 Per-Entity Win rates (party of 4 always including the Entity)

| Entity | Standard v0.1 → v0.2 | Hard v0.1 → v0.2 |
|---|---|---|
| Dracula | 75.8 → 75.3 | 51.1 → 53.8 |
| Creature | 77.1 → 74.7 | 50.4 → 51.6 |
| Mummy | 76.3 → 76.8 | 47.3 → 50.5 |
| Werewolf | 78.3 → 74.8 | 52.4 → 54.1 |
| Invisible Man | 81.1 → **79.4** | 54.6 → **58.4** |
| Ghost | 70.4 → **70.8** | 49.2 → 51.0 |
| Witch | 76.8 → 72.9 | 50.5 → 54.1 |
| Jekyll & Hyde | 76.0 → 74.1 | 50.4 → 52.8 |
| **Spread** | 70–81 → **71–79** | 47–55 → **50.5–58** |

**Perk and Gift checks** (v0.2, Standard / Hard, same seeds; the default is listed first):

| Entity | Option | Win |
|---|---|---|
| Dracula | Hypnotic Eyes | 75.1 / 53.5 |
| Dracula | Wall-Crawler | 75.7 / 55.6 (Forked 4.7 / 13.1, against 6.2 / 16.2) |
| Dracula | no Perk | 74.8 / 53.5 |
| Mummy | Fear the Curse | 76.4 / 50.0 |
| Mummy | Patience of Ages | 75.9 / 48.3 |
| Werewolf | Night Runner | 74.9 / 53.9 |
| Werewolf | Shortcut | 75.0 / 53.0 |
| Werewolf | Fetch | **75.4 / 56.2** |
| Ghost | Spectral | **70.5 / 50.0** |
| Ghost | Rattle | 76.1 / 52.5 |
| Ghost | Already Dead | **76.9 / 58.4** |
| Invisible Man | Out of Sight | 78.7 / 57.5 |
| Invisible Man | Hidden Pockets | 76.7 / 58.4 |
| Invisible Man | Light Step | 76.7 / 56.3 |
| Witch | A Potion for That | 72.9 / 54.2 |
| Witch | Broomstick | 75.1 / 51.2 |
| Witch | Black Cat | 77.3 / 56.3 |

**Solo chase escape from Suspicion 0 / 4 / 8** (Standard, no charges):

| Entity | Option | v0.2 | v0.1 |
|---|---|---|---|
| Dracula | Hypnotic Eyes | 84 / 58 / 22 | — |
| Dracula | Wall-Crawler | **87 / 69 / 36** | +2 to +4 over Hypnotic |
| Witch | Familiar's Warning | 86 / 62 / 25 | — |
| Witch | Fly by Night | 90 / 74 / 44 | — |

### 3.6 What moved the numbers

Each v0.2 change was switched on by itself, starting from v0.1 rules. Party of 3–5, 4,000 raids per cell, Win %.

| Change | Puddlecombe | Thistlewick | Gallowsmere |
|---|---|---|---|
| v0.1 rules | 86.9 | 75.8 | 50.5 |
| Local chase: one rise (with or without the fixed mob) | **+7.4** | **+4.6** | **+5.4** |
| Local chase: fixed mob only (still rising each round) | +2.4 | +1.5 | +1.7 |
| Limits 9/10/13 | **−2.5** | **−1.4** | **−1.6** |
| Thistlewick strongbox 10 | — | **−2.9** | — |
| New default Perks and Gifts | +0.8 | +0.7 | +3.1 |
| Flight: any ability as a raise | +1.2 | −0.4 | +0.9 |
| Spectral doesn't pick the way in | +0.7 | +0.5 | −0.1 |
| A roll's result comes first | 0.0 | +0.7 | −0.6 |
| Everyone held is Forked | 0.0 | 0.0 | 0.0 |
| All v0.2 changes except the Limits | 94.0 | 77.5 | 56.5 |
| **All v0.2 changes** | **92.0** | **74.0** | **53.9** |

On top of everything else, the Limits take back 2.0 / 3.5 / 2.6 points. The one-rise chase mostly turns raids that hit the Limit into raids that leave by the way out. On Gallowsmere, Limit hits fall from 59% to 48% with the chase change alone, and rise back to 56% with the Limits.

### 3.7 Sensitivity (party of 3–5)

| Variant | Easy v0.1 → v0.2 | Standard v0.1 → v0.2 | Hard v0.1 → v0.2 |
|---|---|---|---|
| As written (heuristic) | 86.9 → 92.0 | 75.8 → 74.0 | 50.5 → 53.9 |
| Storyteller avoids Suspicion Costs | 88.5 → 92.5 | 78.1 → 79.5 | 54.6 → 57.0 |
| Cautious party | 87.3 → 90.7 | 75.1 → 74.1 | 45.9 → 48.2 |
| **Reckless party** (Monster on most rolls) | 84.6 → 82.9 | **62.8 → 51.8** | 45.2 → 41.1 |
| Runners may give up (v0.2 only) | 91.6 | 74.3 | 52.8 |

### 3.8 New balance flags

| # | Sev. | What | Numbers | Suggestion |
|---|---|---|---|---|
| B1 | minor | **Thistlewick punishes Monster-happy tables much harder.** | Reckless Win is 51.8% (v0.1: 62.8%), with the Limit hit in 59% of raids. Rolled Standard reckless is 58.3% (v0.1: 61.2%). Thistlewick with Limit 11 would be 62.4%; with the strongbox back at 8, 57.8%; with v0.1 rules and Limit 10, 55.6%. Careful play is unaffected. | It's the Standard Limit of 10 (each Monster showing is a fifth of the track) combined with the strongbox at 10. Either put the strongbox back to 8, or add an ST line: "on Standard, every Monster you show is a fifth of the track." |
| B2 | minor | **"Most Hard raids end in the final flight" is town-dependent.** | Gallowsmere 58–59%, rolled Hard 44–48%. | See N5. |
| B3 | minor (kept design) | **Time still doesn't bind.** | Mean exit Turn: 5.5–7.3 (Easy), 6.7–8.5 (Standard), 7.4–9.5 (Hard). Dawn flights happen in 0–0.9% of raids. | As in v0.1 (D5): fewer Turns, or drop the time-pressure lines (p14 "there's rarely time to visit every place together", p27 "warn when three are left"). |
| B4 | minor (kept design) | **Tells are now a quarter of the Easy and Standard track.** | 2.2 of 9 and 2.6 of 10, against 20–24% in v0.1. | As in v0.1 (D8). |
| B5 | minor | **The Ghost's default Perk is her weakest.** | Spectral 70.5 / 50.0, against Already Dead 76.9 / 58.4 (Standard / Hard). The Ghost is the lowest Entity on Standard. | Make Already Dead (or Rattle) the default. |
| B6 | minor (kept design) | **Party size isn't scaled.** | From 3 to 5 players: Easy 88.5 → 92.1, Standard 71.3 → 78.5, Hard 48.6 → 58.0. A party of 3 on Gallowsmere sits below the 55–60 target. | As in v0.1 (D5). |

Nothing new is out of range. Easy, Standard and rolled Hard all sit on target. Gallowsmere with 3 players (48.6%) is below 55–60, as it was in v0.1 (46.9%).

### 3.9 Worked examples: arithmetic re-checked

- **p17:** "(Suspicion 5: 8 + 2 = 10.)" Correct.
- **p18, the majority-rule example:** a Success, a Critical, a Cost and a Trouble make 3 Successes to 1 Trouble, so Lead +2. Correct.
- **p25:** the d20 bands still give 15·50·30·5 and 0·40·45·15. The watched d10 gives 40/50/60%. Correct.
- **p27:** "at least 1, and usually 2". Correct, and now backed by R18's "then or on a later Turn".
- **p20:** "2 of 4 items, 3 of 5" and "0–1 of 4, 0–2 of 5". Correct.
- **p28–29, the Example of Play: every step is correct.**
  - Limit 10, the Standard Limit.
  - Turn 1: rolls of 2 and 1 mean no Tells.
  - Werewolf: 10 + 4 = 14 against 8.
  - Witch: Charm d8 raised to d10 by her Duty, against 8. 1 + 4 = 5 is 3 short, so Trouble. The Monster's 4 beats her 1, so it shows. One rise takes Suspicion to 2, and she is caught.
  - Her chase:
    - The mob is 8 + ⌊2/2⌋ = 9 for the whole chase.
    - Round 1: 12 + 3 = 15. Lead 2, no show.
    - Round 2: 2 + 9 = 11. Lead 3, and the Monster shows.
    - Round 3: Rowan steps Sly d10 down to d8, and Hedge Spell raises it back to d10. 5 + 7 = 12, Lead 4: escape.
    - One rise of +2 takes Suspicion to 4.
  - Dracula: Sly d6 raised to d8 by his Duty. 7 + 2 = 9 against 8.
  - Creature: Wits d10 with the Mask. 5 + 2 = 7 is a Cost. Dropping an item would cost nothing, so the Storyteller picks Suspicion +1: Suspicion 5.
  - Turn 3: Good Dog on the Witch, 7 + 4 = 11. The Tell at the ironmonger takes Suspicion to 6. "Three Turns gone, nine to go"; "6 of 10". All correct.
- **The example's pace:** in the simulator, this party's median Suspicion after Turn 3 is 4. A 6 or worse happens 19% of the time. That's a slightly rough start, but no longer an outlier (v0.1's 8 of 11 happened 7% of the time). No change needed.
- **The town headers and At the Table's numbers** match p25.

---

## Appendix: scripts and outputs

All scripts and outputs are in `dgf-v02/sim/`. They are copies of the v0.1 scripts, edited; the v0.1 originals were not touched.

**Rule switches:**
- `core.mjs` holds `V2_RULES` and `V1_RULES`, plus `setRules()`.
- The chase now uses one rise, with a fixed mob at the start.
- Flight raises, Wall-Crawler's raise and the v0.2 defaults are included.

**`raid.mjs`:**
- everyone held is Forked;
- a roll's result comes first (way out, rescue, slipping free);
- a Spectral pass doesn't pick the way in. The Ghost holds a tentative group way in, and the first non-Ghost who needs a way in picks the real one.

**`towns.mjs`:** the Limits and Thistlewick's strongbox are read from the rule set.

**Drivers:**
- `run2.mjs` modes: `chase`, `flight`, `raid`, `rolled`, `entity`, `variants`, `decompose`, `perks`, `chaseperks`, `example`. Pass `v1` or `v2` as the third argument.
- `chasecmp.mjs` produces the §3.1 table.
- `reckless.mjs` produces B1.
- `ghostcheck.mjs` checks the Spectral way-in rule.

**Outputs:** `out-*.txt`. `check-v1-*.txt` are the exact-reproduction checks against v0.1.

**Policy additions** (needed by the new rules; kept minimal):
- In a local chase, a roll's Suspicion cost is measured above the chase's biggest trigger so far.
- Giving up is off by default and appears only as a variant: a solo runner gives up when any Trouble would bring the Limit and nothing has risen yet.

**Not modelled**, as in v0.1: furniture, overdraws, and handing loot back to re-enable Spectral.
