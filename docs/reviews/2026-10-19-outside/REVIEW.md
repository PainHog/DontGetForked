# Don't Get Forked v0.1: playtest-copy review

**What was reviewed:** the 34-page playtest PDF (v0.1). Three independent reviews ran, and their findings were cross-checked against the book's text:
1. **Rules review.** Every chapter was checked against the others, against the Entity entries, the At the Table page, the Entity Sheet and the three towns. Exact dice odds and a raid simulator were run: 3,000–8,000 raids per row and 20,000–40,000 chases.
2. **Procedural playtest.** One full session was played strictly by the book with real dice: a five-Entity party, Gallowsmere (Hard) and then Thistlewick (Standard), plus labelled drills for capture, rescue, the final flight and getting forked.
3. **Layout, art and image-rights review.** All 34 pages were checked at print size, along with all 35 pictures.

All fixes below are **suggestions**. You decide.

## Verdict

- **The core works.** The Mask/Monster choice, "one roll, one rise", Castle Duties and the town tables all play well.
- **The difficulty curve already lands near the targets** that worked for Heisty Spideys. Simulated Win rates for a party of 3–5:

  | Level | Simulated Win |
  |---|---|
  | Easy | 86–92% |
  | Standard | 73–80% |
  | Hard | 47–56% |

- **Entities are balanced.** All eight sit within a few points of each other.
- **The three towns match their maps and the town-building rules exactly.**
- **The worked example's arithmetic is perfect**, and no typos were found.

The problems sit in four areas:
- **The local chase.** It feeds on its own Suspicion, and one bad Turn can end a raid.
- **A handful of edge cases** a table would have to invent a ruling for.
- **Four near-empty pages.**
- **Two stand-in pictures** that could read as offensive caricatures.

---

## 1. Fix before anyone outside your table sees it

| # | Page | Issue | Fix |
|---|---|---|---|
| S1 | 10 | **Invisible Man "In costume"** shows two men in top hats with long hooked false noses, whispering. Gavarni meant carnival noses, but at print size it reads like a 19th-century antisemitic caricature. | Swap it for a bandaged or goggled figure, or a guest at a masked ball in a domino mask. |
| S2 | 8 | **Frankenstein "In costume"** is a procession giant whose face is blacked out. It can read as blackface. | Swap it, or crop to the left giant and the drummer. A single stilt-walker would sell "a head above the crowd" better anyway. |

---

## 2. Design decisions for you (these change how the game plays)

### D1. The local chase feeds on its own Suspicion: the biggest issue
**Pages:** 17–18.
- "The mob's Difficulty: 8 plus half the Suspicion… Work it out again at the start of every round, because the chase can raise Suspicion."
- "In a local chase it still rises as usual (Trouble +1, the Monster showing +2, an overdraw +2)".
- "The whole chase, however many rounds it takes, happens inside the Turn it started."

**What happens:** every Monster show or Trouble raises Suspicion, which makes the next round harder.
- **In the playtest,** one chase ran 10 rounds and took Gallowsmere from Suspicion 4 to the Limit of 15. That ended the raid on **Turn 2 of 12**.

**What the simulator shows:**
- One failed roll at a watched obstacle starts a chase that adds about **+4 Suspicion** on average.
- Escape odds fall as Suspicion rises:

  | Suspicion when the chase starts | Chance to escape |
  |---|---|
  | 0 | 60–86% |
  | 4 | 25–57% |
  | 8 | 7–26% |

- **About 1 in 5 chases** that start at Suspicion 4 end the whole raid in the final flight.
- **Hiding behind the Mask** keeps Suspicion down, but escape collapses: the Creature escapes only 12% of the time at Suspicion 4.
- **Overall win rates still land on target,** because careful parties avoid Trouble at watched obstacles. So this is a design choice, not a bug. Its effect is huge swings: a Turn-2 Bust in one raid, a Grand Year in the next.

**Options:**
- (a) Fix the mob's Difficulty when the chase starts.
- (b) Make a local chase raise Suspicion only once, by its biggest trigger, when it ends.
- (c) Cap a local chase at 3 rounds: escape if the Lead is 2 or more, otherwise captured.
- (d) Make chase Trouble move only the Lead.
- (e) Keep it, but tell players plainly that letting the Monster out in a local chase usually backfires. Also add an ST note that "a chase usually costs 3–5 Suspicion".

**Related:** the Example of Play (p30–31) has the Witch take the Monster every chase round. New groups copy that, and the playtest's Creature did too. Whatever you choose, show one round with the Mask in the example.

### D2. A runner can't give up
**Pages:** 16–17.
- There's no way to choose capture to stop the bleeding.
- The only "out" is overdrawing on purpose to hit the Limit. That sinks the whole party, and p16 seems to endorse it ("even if a runner's own roll brought it there on purpose").

**Options:**
- "At the start of any round a runner may give up: captured, no roll."
- Forbid an overdraw in a local chase when it would reach the Limit.

### D3. Overdraws are nearly free on Monster rolls and in group checks
**Pages:** 12, 16, 18.
- "One roll raises Suspicion only once, by its biggest trigger (overdraw included)."
- So on a roll where the Monster may show anyway, an overdraw really costs far less than +2:
  - **On a Monster roll with a d4–d8:** about **+0.35 to +0.8**.
  - **In a group check:** close to free.
  - **On the loud way:** +1.
- Overdraws are unlimited outside the final flight, which undercuts the 3-charge economy.
- **In the final flight:**
  - For a "Soon" Entity, an overdraw in round 2 costs nothing, because the Weakness arrives in round 3 anyway.
  - Several overdraws on one roll cost +2 in total.

**Options:** pick one or both.
- "An overdraw always adds +2 on top of the roll's rise."
- "Once per Turn per Entity."

**For the flight:** make the overdraw a second step down that stacks with the Weakness, or allow it only in round 1.

### D4. Spectral skips rolls
**Pages:** 7, 10, 14.
- The Ghost's default Perk passes group obstacles with "no roll and no action".
- The book flags this as its one deliberate exception (p7: "one, the Ghost's Spectral, skips a roll"), so it isn't a contradiction. But it breaks the Heisty lesson that nothing should skip a roll for free.

**Where it bites:**
- **Thistlewick:** the top hat needs only the move.
- **Gallowsmere:** Spectral skips the Difficulty 12 tug-of-war, the hardest counted obstacle in town.
- **Every town:** her free pass also locks the way in for the whole party, who must then roll that group obstacle themselves.
- **On average** it fires only about once a raid, because it switches off while she carries anything.

**Options:**
- "At a group obstacle, roll Sly or Nimble at a Difficulty 2 lower; Trouble there never gets you caught."
- "Once per location, never at its last obstacle."

**Either way:** add to p14 that a Spectral pass doesn't choose the way in.

### D5. Hard is decided by the final flight; Suspicion is the only clock
- **Hard:** about **60%** of Gallowsmere raids hit the Limit. Only about 39% leave by the way out, and **12–19% end Forked**. The local mob caps at Difficulty 12 from Suspicion 8, so nearly half of Hard's track runs at maximum chase Difficulty.
  - **If intended** ("on Hard you'll probably run for it"), say so in Ch 8.
  - **If not,** raise the Hard Limit to about 17, or let the mob cap scale with the Limit.
- **Easy and Standard:** parties leave around Turn 6.5–7.4 of 12, and dawn almost never arrives. That makes several things nearly irrelevant:
  - the "Lose a Turn" Costs;
  - Patience of Ages and Wise Woman;
  - the advice to "warn when three are left".

  **Options:** 9–10 Turns on Easy and Standard; a late-night Suspicion tick (+1 every 3 Turns from Turn 6); or drop the time-pressure claims.
- **Party size isn't scaled.** In the playtest, five players with a Castle Duty lined up for each item got a Grand Year by Turn 6, at Suspicion 5 of 11, with 11 of 15 charges unspent.
  - **Option:** scale the Turns or the Limit with party size.

### D6. The danger is inverted: the final flight is gentler than a lone local chase
- **The final flight is fair to easy for a full party.** 3–4 runners pooling abilities escaped in 3–5 rounds every time. Simulated Forked chances are 27–34% with no abilities, lower with charges.
- **A lone runner in a local chase is captured 50–88% of the time** without charges.
- **Options:** start local chases at Lead 2, or raise the flight mob.
- **Also in the flight:** every "Monster without Suspicion" ability and every own approach is dead. The Invisible Man carried 3 useless charges.
  - **Option:** in the flight, any ability may be spent as a raise.

### D7. Capture, rescue and "everyone captured"
- **A captured essential makes a Win impossible.** p18: "the town takes back what you were carrying… gone for the night".
  - **Options:** keep captured loot in the lock-up, where a rescue can recover it, or return it to its location so it can be stolen again.
- **Everyone captured has no rule.** All Left Behind floors at **Bust**, which is better than **Forked**, so a doomed party should surrender rather than run.
  - **Option:** "If every Entity is held, the night ends and the year is Forked." Or keep Bust deliberately and say so.
- **The lock-up is Difficulty 10 even on Easy,** and a failed rescue starts a new chase. In one drill, one failed rescue cascaded into three captives and the Limit.
  - **Options:** scale the lock-up 8 / 10 / 10, or make a failed rescue a retreat (Suspicion only, no chase).
- **A shared local chase can lose both runners in round 1.** It starts at Lead 1, and two Troubles make −2.
  - **Options:** start shared chases at Lead 2, or cap the swing at −1.

### D8. Tells tax splitting up
**Pages:** 14, 16.
- The book recommends splitting up on Standard and Hard.
- But each newly reached place rolls a d6 Tell on 4–6, so a five-way split on Turn 1 cost **+3 Suspicion** before any roll in both playtest raids. That's about a quarter of the Standard Limit.
- **In the simulator,** Tells were a fifth to a quarter of all Suspicion.

**Options:** Tells on 5–6 only, or one Tell check per Turn for the whole party.

---

## 3. Rules gaps and contradictions (wording fixes)

| # | Sev. | Page | Issue | Suggested fix |
|---|---|---|---|---|
| R1 | **blocker** | 14–16 | **A roll that succeeds and also fills the Limit.** "each result counts at once" and "A Success or a Cost gets everyone out" sit against "When Suspicion reaches the Limit… the hunt is on". Is the party home, or in the final flight? The same question applies to a rescue. | Add one sentence: "A roll's result happens first, then its Suspicion; if that roll gets the party out, it's out." Or say the reverse. |
| R2 | confusing | 14, 16 | **Sequencing mid-Turn.** If the hunt starts mid-Turn, it isn't clear what happens to Entities who haven't acted. Tables naturally say "everyone roll". | "Resolve one Entity's action fully, chase included, before the next acts. If the hunt begins mid-Turn, anyone who hasn't acted loses that action." Add it to At the Table too. |
| R3 | confusing | 12, 17 | **"A chase roll only moves the Lead"**, then the next paragraph says Suspicion still rises in a local chase. | "…moves the Lead instead of beating an obstacle. No Storyteller's Cost, no new chase, **but in a local chase it still raises Suspicion** (below)." |
| R4 | confusing | 14, 15 | **The way out: several tries per Turn, or one?** p14: "Several may try the same obstacle in one Turn". p15: "the roller is caught; try again next Turn." Several tries make the Hard way out far easier. | State it outright: "once per Turn", or "another Entity may try at once". |
| R5 | confusing | 12, 18, 32, 33 | **When does a final-flight overdraw's Weakness start?** "From your own next roll" is unclear when you overdraw on your own roll. | "…starting with the roll you overdraw on", or "starting with your following roll". |
| R6 | confusing | 12 vs 17 | **A pending Cost** ("next roll's trait die one size smaller") versus a chase roll ("A Cost costs nothing there"). Does it carry into a chase or the flight? Does "Lose a Turn" carry over at dawn? | Say whether pending Costs carry into chases and the flight. |
| R7 | confusing | 5, 12, 22, 33 | **"6 easy, 8 standard, 10 hard, 12 daunting"** reuses the town-level words, which p5 says are different things. | Use "6 simple, 8 tricky, 10 tough, 12 daunting", and write "level" for Easy/Standard/Hard. |
| R8 | confusing | 6, 7 | **Castle Duty clashes.** "The player who chose later picks another" (p7) has no defined order, and it clashes with "a new player can skip the choices" (p6). The d6 1–2/3–4/5–6 random rule doesn't fit six Duties, and a Duty whose kind isn't on the shopping list is dead. | Define the order (e.g. seating order). For Duty, roll its d6 table directly, preferring kinds on the list. |
| R9 | confusing | 6 vs 21 | **The campaign.** Can Duty, Gift or Perk be re-picked between raids? "The Entities themselves never change" (p21) vs reading the list "before anyone picks" (p6). | E.g. "Each raid, re-pick Castle Duty; Gift and Perk stay." |
| R10 | confusing | 14 | **When the way in gets locked.** It's unclear whether arriving, a Spectral pass or an own approach counts as "trying". | "…the first time anyone rolls at, or passes, one of its ways in. An own approach or a Spectral pass doesn't choose it." |
| R11 | confusing | 12 | **Who gets a Critical's charge refund** when a helper paid for the roll, and whether an overdraw counts as "spent". | "The roller gets back one charge it spent earlier this raid; an overdraw isn't a charge." |
| R12 | confusing | 15 | **Huge furniture with two carriers.** It's unclear whether both spend both Turns, whether both lose the Mask, and what happens if one is caught or captured. | "Both move together, both spend the two Turns and lose the Mask. If either is caught, the piece is set down; if either is captured, the town takes it." |
| R13 | confusing | 10 | **Spectral during a move.** Read literally, the Ghost passes a location's only group way in on her arrival Turn and has the item at once. | Decide whether the pass needs an earlier arrival. |
| R14 | minor | 14, 15 | **Several Entities passing the last obstacle in one group check:** who holds the item? | "If several get past at once, the party chooses who holds it." |
| R15 | minor | 15, 23 | **"An entrance a map marks small"**: "entrance" isn't defined, and no map or key shows one. | Define it ("a way in or out marked small") and add a map symbol, or drop the rule. |
| R16 | minor | 16 | **The Tell check** is made "once everyone moving there this Turn has arrived", but a player can decide to move after it's rolled. Picking between arrivals "at random" doesn't say which die. | Make Tell checks at the end of the Turn. "Roll a d6, rerolling numbers above the number of arrivals." |
| R17 | minor | 18 | **Is slipping free the captive's action?** And can a captive hand loot out to a visitor (Hidden Pockets)? | "…as its action." Add one clause either way on handing loot out. |
| R18 | minor | 15, 27 | **"At least 1" furniture tick** (p27) only happens if you may leave a piece and take it later, which the book never says. | "You may leave the piece and take it (free) at the start of a later action." |
| R19 | minor | 23 | **Rolling the second way in.** Is the Difficulty d20 and the Watched d10 rolled again too? Also, five of one kind fails "two of them share a place". | "Roll all three dice for each way in." "…they share places, two to a place." |
| R20 | minor | 14, 23 | **Two-Turn map moves while carrying** (four Turns?). | "Carrying adds one Turn to any move." |
| R21 | minor | 8, 9, 13 | **No floor on Difficulty.** Reductions stack, e.g. Fetch plus Mesmerise at the Easy way out gives 3, an automatic pass. | Optional: "No Difficulty goes below 4." |
| R22 | minor | 5, 27, 34 | **Play time:** "1–2 hours" (p5, p27) vs "2–3 hours" on the back cover. | "1–2 hours a raid; 2–3 with setup". |
| R23 | minor | 18, 20, 21 | **"Killed"** (p18) vs "back at the castle" (p21). "Forked… whatever came home" when nothing can come home. Forked isn't on the Left Behind ladder. | Soften "killed". Write "Forked: cornered in the final flight; nothing comes home". "Left Behind doesn't apply to Forked." |
| R24 | minor | 7, 11, 31 | **"Any ability can go on a friend's roll"**, but the Draught can't. | "…any ability but an approach or the Draught". |
| R25 | minor | 5 | **"For the Storyteller, a d20":** the ST also needs d6s and a d10. | "a d20, a d10 and two d6". |
| R26 | minor | 5 vs 12 | **"Choose on every roll"** between the Mask and the Monster, but carrying and the final flight force the Monster. | "on most rolls". |
| R27 | minor | 6 | **Furniture before picks:** players should hear the furniture too before choosing Perks. | "The shopping list and the furniture." |
| R28 | minor | 33, 32 | **Omissions in At the Table and the Sheet:**<br>• no Forked line in How the Year Went;<br>• the approach line misses "at the way out and lock-up it works for everyone";<br>• the Tell line misses "not a captive's arrival" and "the way out counts once anyone comes back";<br>• the overdraw line misses "not while your Weakness is in play";<br>• the chase line misses "no Mask while carrying furniture";<br>• the Sheet's Status box has no "caught" state. | Add the missing words. |

---

## 4. Entity tuning (minor; all eight are within a few points)

| Entity | Simulated Win (party of 4), Standard / Hard | Note |
|---|---|---|
| Dracula | 75 / 51 | **Hypnotic Eyes** (default) barely matters: it cuts the Monster showing on a d12 Charm roll from 37.5% to 30%. Make Mist the default, or let the Monster never show on Charm. **Wall-Crawler** adds only about 3 points of chase escape (Fly by Night adds 13–19); give it a second edge. |
| Creature | 77 / 50 | **Strong Back** (default) does nothing in all three ready-made towns, which have only Bulky furniture. Make another Perk the default, add a Huge piece to a town, or add "a Bulky piece doesn't cost you the Mask". |
| Mummy | 76 / 48 | Patience of Ages rarely matters, because time rarely binds (D5). |
| Werewolf | 78 / 52 | Night Runner is the best chase Perk; fine. |
| Invisible Man | 81 / 54 | Best overall. **Out of Sight** switches off if *anyone* in the same place carries loot; narrow it to "you carry". |
| Ghost | 71 / 49 | Spectral (D4). Spectral and Through the Wall switch off once she holds the silver she's usually sent for. |
| Witch | 77 / 50 | **Weakest default kit.** The Broomstick approach rolls her **d4** Nimble, and Hedge Spell does nothing on her d12 Wits. Make A Potion for That the default, or let Broomstick roll Wits. Hedge Spell is also the only signature with no flavour line. |
| Jekyll & Hyde | 76 / 50 | Flexible and balanced. |

**General:** "your trait die one size bigger" is worthless on a d12. **Option:** "one size bigger, or +2 on a d12".

---

## 5. Layout

### Must-fix: near-empty pages
Chapters always start on a new page, so their last pages are left blank or padded.

| Page | What's there now | Suggested fix |
|---|---|---|
| **p19** | Two lines carried over from p18, then about 2.7 in of white beside the chase table, a soft filler windmill picture, and blank space at the foot. | Pull the two lines back to p18. Set the chase table full width at the top of p19 (or beside "The ground" on p17), and make p19 a deliberate full-page plate. |
| **p21** | The campaign box, a filler cart picture, then 2.2 in of blank. | Tighten p20's tables so the box fits on p20, or make p21 an intentional art page that fills to the margin. |
| **p15** | The end of Ch 4: the bottom third is empty, with no art. | Balance the columns, then add a picture. The cart picture suits "Carrying". |
| **p27** | Under 2 in of text, a gap, the bonfire picture, then 1.2 in of blank. The column on p26 stops 2.1 in early. | Remove the column break before "The Villagers" on p26, and crop the bonfire picture to fill the page. |

**Also:** p13 is about half filler. The night-watchman picture belongs with the Ch 8 obstacles.

**Page count:** pp. 2–33 are currently 32 pages, which suits print-on-demand. Fill pages with art rather than deleting them.

### Should-fix
- **pp7–9:** gaps on p7 push Frankenstein's entry onto p9. Moving "Abilities never pass automatically" to the foot of p6 (or making it full width), and "Four kinds of ability" into p7's white space, keeps all eight entries whole at two per page.
- **p29:** the "Reading the Town Pages" key comes after the first town. Merge it with p28's intro.
- **p28:** the last Puddlecombe row wraps "(group) watched" under the label column. Check every long obstacle name.
- **p25:** shopping-list numbers wrap away from their items. Use non-breaking spaces, or a 2×3 grid per row. The "same on every difficulty" list is split across columns.
- **p24:** the d20 town-rolling table has no heading.
- **Small print:**
  - Table labels are 6.8 pt; aim for 7.5+.
  - Map numbers are 5.6 pt and map labels 6.9 pt.
  - Ability tags are 7.4 pt.
  - "Watched" is shown only in red italic, which turns grey on a black-and-white printer. Add the eye icon.
- **Back cover:**
  - It says "2–3 hours".
  - There's a 2.5 in empty band.
  - The picture (Palmer's sheep) has no monster, mob or town. Vallotton's crowd, the torchlit procession or Maurice Sand's wolf-men would sell it better.
- **Printing:** there's no bleed, and every inside page has a light grey tint that home printers will lay toner over.
  - **For playtests:** make a printer-friendly white version.
  - **For print-on-demand:** build with 0.125 in bleed.

### Nice-to-have
- The rule above the footer appears on some pages but not others, and the footer sits lower on pp32–33.
- The contents page is correct but half empty. Add second-level entries: The Eight, the Chase Table, the Obstacle Table, the Shopping List, the three towns, and the Example of Play.
- The way-out arrowheads are cut off by the frame on all three maps.
- The p5 lantern prints as a near-black block.
- The Entity Sheet has faint 8.4 pt hint text and no Notes box.
- The front cover has no author name and no playtest mark.

---

## 6. Art (stand-ins)

- **Wrong-reading pictures:**
  - **Dracula "Revealed" (p8)** is a plumed theatre cavalier, not a vampire. Try the *Varney the Vampire* woodcut, a Doré bat, or a cloaked night figure.
  - **Invisible Man "Revealed" (p10)** is a skeleton, which reads as Death and competes with the Ghost. Try empty clothes, floating gloves, or bandages unwinding.
- **Soft at print size:**
  - **The Ch 1 castle banner (p5)** is heavily upscaled, and over half of it is empty sky. It's the first chapter opener. Use a higher-resolution scan, or a Doré castle cropped tight.
  - **The full-width pictures on pp19, 21 and 27** are about 126 ppi. Re-download the full-size museum files (aim for 250 ppi or more).
- **The "In costume" and "Revealed" pairs rarely look like the same character:**
  - Mummy: a Cleopatra woman, then a male mummy.
  - Frankenstein: three female giants.
  - Witch: a child, then a crone.

  That's fine for stand-ins. For the final art, brief each pair as one figure in two states.
- **Awkward crops:**
  - A woman sliced through her face beside Dracula (p8).
  - A stray arm on the Mummy picture (p9).
  - Plate-mark lines on p21.
- **Strongest pictures:**
  - Doré's wolf in the bonnet
  - Maurice Sand's wolf-men
  - Leech's Marley's Ghost
  - the sheet ghost
  - the 1820s stage Frankenstein
  - the Batten witch
  - Vallotton's crowd
  - the Palmer etchings
  - the torchlit procession
  - the bonfire
  - the night watchman

---

## 7. Rights and credits (risk flags, not legal advice)

- **Good news: no film stills, publicity photos or photographs anywhere.** None of the monster pictures is from the Universal films:
  - **Frankenstein:** an 1820s stage print, not Karloff, with no flat head and no bolts.
  - **The mummy:** an engraving.
  - **Dracula:** not Lugosi.
  - **The Invisible Man:** not [the 1933 film's star].
  - **The wolves:** Doré and Maurice Sand.

  Everything looks pre-1931. Keep it that way when replacing pictures.
- **Before any store listing (fine for private playtests):**
  - [Storefront-disclosure note left out of the repository at Richard's request; he has the original.]
  - **Maps.** The town maps (pp28–30) aren't credited at all.
- **Should-fix:**
  - **Image log.** Keep a log for every picture: artist, title, date, museum, link or object ID, and the licence as downloaded. The credits list names but not which picture each belongs to.
  - **Wikimedia files.** Check each one individually (public domain in the US and the country of origin; a straight scan of a flat work). Swap to the same work from a CC0 museum release where possible (Rijksmuseum, NGA, Met, Paris Musées).
  - **Three 20th-century artists.** Confirm publication years: Ludvík Strimpl (d. 1937, probably the p10 skeleton), Anton Louis Koster (d. 1937) and Alice B. Woodward (d. 1951).
- **Nice-to-have.** "All rights reserved" reads as claiming the public-domain pictures too. Add: "Stand-in illustrations are public-domain works and remain in the public domain."

---

## 8. What works well (keep these)

- **The core roll.** A trait die plus the Mask d6 or the Monster d10, and "the Monster shows if it beats your trait die", gives a real choice on almost every roll. It costs about +6–31 points of pass chance against about +1 expected Suspicion.
- **"One roll, one rise", and one raise per roll from any source.** These are clean versions of what Heisty had to retrofit.
- **No opposed rolls and no NPC stat blocks.** The mob is a single Difficulty, which removes two whole classes of Heisty problems.
- **Party size doesn't inflate the threat track.** There's one roll for the way out, group checks rise once, Tells are once per place, and a shared chase rises once per round.
- **Castle Duties.** They give every player a spotlight location and make splitting up natural.
- **Teamwork.** Helpers spend charges without using their action. The best moments in the playtest came from this.
- **Losing costs something at every stage,** and the Limit is fully specified.
- **The random tables cover every step,** with reroll rules. The chase table always offers a non-Nimble trait.
- **The ready-made towns are clean.** Each location has two ways in, a non-athletic way out, and maps that match the text.
- **The worked example** is arithmetically perfect and teaches about ten rules in a page.
- **The At the Table page** covered almost every lookup.

---

## Appendix: key numbers

**Core roll: pass chance (Success or Cost)**

| Trait die | Difficulty 8: Mask | Difficulty 8: Monster | Difficulty 10: Mask | Difficulty 10: Monster | Difficulty 12: Mask | Difficulty 12: Monster |
|---|---|---|---|---|---|---|
| d4 | 58% | 75% | 25% | 55% | 4% | 35% |
| d6 | 72% | 83% | 42% | 65% | 17% | 45% |
| d8 | 79% | 88% | 56% | 74% | 31% | 55% |
| d10 | 83% | 90% | 65% | 79% | 45% | 64% |
| d12 | 86% | 92% | 71% | 83% | 54% | 70% |

**Chance the Monster shows when you roll it:**

| Trait die | Shows |
|---|---|
| d4 | 75% |
| d6 | 65% |
| d8 | 55% |
| d10 | 45% |
| d12 | 37.5% |

**Whole raids** (simulated, party of 3–5, furniture not modelled):

| Town | Win | Forked | Hit the Limit |
|---|---|---|---|
| Puddlecombe (Easy) | 86–89% | 0.4–1.2% | 15–17% |
| Thistlewick (Standard) | 73–80% | 4–8% | 25–30% |
| Gallowsmere (Hard) | 47–56% | 12–19% | 58–61% |

Towns rolled from the Ch 8 tables land within about 5 points of these. A reckless party (the Monster on most rolls) drops Standard to 63%.

*Method and caveats: the raid simulator uses a heuristic party policy and doesn't model furniture or overdraws, so treat its numbers as ±5 points. The playtest used real dice, logged roll by roll. The full detailed reports are attached separately: rules-review.md, playtest.md and layout-art-review.md.*
