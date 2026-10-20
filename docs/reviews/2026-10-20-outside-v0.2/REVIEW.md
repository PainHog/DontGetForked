# Don't Get Forked v0.2: review

**What was reviewed:** the 34-page v0.2 playtest PDF. Five checks ran:
- every v0.1 finding re-checked against v0.2;
- a rules review of all the changed text, with the simulator re-run (same party policy and seeds as v0.1);
- three full real-dice playtests: Puddlecombe as a first night plus a rolled Standard town; Thistlewick with five reckless players; Gallowsmere plus a rolled Standard town;
- a layout, art and image-rights re-check.

All fixes are **suggestions**. You decide. The one-page **Table Rulings** sheet (sent separately) covers everything your group might hit tomorrow. This document is for v0.3.

## Verdict

**v0.2 is ready to play, with no blockers.** The big v0.1 problem is solved:
- A local chase now costs about +1.7 Suspicion instead of about +4.
- A chase can never end a raid if it starts more than 2 below the Limit.
- A lone runner at Suspicion 4 escapes 53–83% of the time, up from 23–55%.

**Score against the v0.1 review:** 28 of 45 rules items fixed, 6 partly fixed, 3 changed differently, 6 left as designs. Both sensitive pictures were replaced. The towns still match their maps and rules, and every worked example's arithmetic checks out.

### Simulated Win rates (parties of 3–5)

| Level | v0.1 | v0.2 | Target |
|---|---|---|---|
| Easy: Puddlecombe / rolled towns | 86–89 / 91–93 | 88.5–92 / 92–95 | ~90 |
| Standard: Thistlewick / rolled towns | 73–80 / 71–76 | 71–78.5 / 72.5–80 | ~75 |
| Hard: Gallowsmere / rolled towns | 47–56 / 51–58 | 48.5–58 / 53–62 | 55–60 |

**Entities:** still balanced. The spread is 71–79% on Standard and 50.5–58% on Hard.

**What the playtests felt** (every raid ended Grand Year, Win or Partial):
- **Easy** is right for a first night.
- **With five players on Standard,** the party finished the list by Turn 4–5 and spent few charges, so it felt easy.
- **Hard** feels like a heist.
- **Danger is concentrated** in chases at Suspicion 8 or higher, and in the final flight once charges run out.

---

## 1. Design decisions still open

### 1.1 Spectral plus free hand-offs means no rolls at group obstacles
**New in play, and the biggest one.**
- **The rule:** Spectral turns off while the Ghost carries loot (p10). But handing loot over is free and can happen any time (p15).
- **What happens:** she passes a group obstacle with no roll, hands the item to a friend standing there, and is free to do it again.
- **In Gallowsmere** she took the bacon past the Brawn 12 tug-of-war, and in the rolled town the ink (an essential), the paper and the velvet, all with no roll.
- **Why the simulator missed it:** it doesn't model hand-offs, so it rates Spectral her weakest Perk (70.5/50.0 against Already Dead's 76.9/58.4).

**Options:**
- (a) Spectral doesn't work on a location's last obstacle. This is the optional rule on the Table Rulings sheet.
- (b) A Spectral pass doesn't take the item; someone must roll the last obstacle.
- (c) Spectral works only on a location's first obstacle.

**Also clarify (p14):** if the party later picks the other way in, is she still past the first obstacle? The simulator assumed yes.

### 1.2 Overdraws
- **In a local chase,** "An overdraw in the chase adds its +2 on top" (p17). Points past the Limit are lost (p16), so once the hunt is certain, overdraws are free.
  - The Thistlewick Witch overdrew 15 times, and one chase ran 12 rounds.
  - **Suggested fix:** one overdraw per local chase (as on the Table Rulings sheet), and state "each overdraw adds +2".
- **In the final flight, unchanged from v0.1:**
  - It's free in round 2 for the six "Soon" Entities, because their Weakness arrives in round 3 anyway.
  - It's also free if you roll first and then overdraw onto a later roller.
  - **Options:** a second step down that stacks with the Weakness, or round 1 only.

### 1.3 Late-track chases and long chases
- **The late track:** from Suspicion 8 the mob is 12, and a lone runner escapes only about 17–26% of the time with the Monster, and 2–3% with the Mask.
  - Giving up is the real safety valve, but it costs the loot.
  - **Option:** a mob of 8 + ⌊Suspicion / 3⌋, or a cap of 11.
- **Length:** 18–24% of lone chases run 6+ rounds, and two test chases ran 15, all inside one player's Turn.
  - **Option:** after round 6, Lead 2+ escapes, otherwise captured (optional on the Table Rulings sheet).
- **Shared local chases** still start at Lead 1, so two runners are cornered in round 1 about 21% of the time. The odds still say fleeing together is never worse than fleeing alone.

### 1.4 Capture and the lock-up (partly addressed)
- **"Everyone held = Forked" is now defined.** That's good.
- **Still open from v0.1:**
  - captured loot is gone for the night, so one capture can cost an essential and the Win;
  - the lock-up is Difficulty 10 even on Easy;
  - a failed rescue starts another chase.
- **p27's "Capture is only a setback"** now undersells it. Suggested wording: "Capture is a setback, not the end, unless it takes the last of you."

### 1.5 Clocks and party size (kept designs that still show in the numbers)
- **Dawn** comes in under 1% of simulated raids. With five players, 12 Turns never mattered; Suspicion and the furniture tick are the only clocks. With three players, the Turn clock matters more.
- **Tells** are now about a quarter of the Easy and Standard Limits, because the lower Limits made them relatively bigger.
- **Nothing scales with party size,** and five Duties lined up against five locations make Standard easy.
  - **Option:** fewer Turns or a lower Limit for 5 players.
- **Easy's Limit (9) is lower than Standard's (10).** That's fine for balance, but readers will think it's a misprint.
  - **Option:** add "a small town notices sooner", or use 10/10/13. Easy would gain about 1–2 points.
- **p25 says "most Hard raids end in the final flight".** That's true for Gallowsmere (58%) but not for rolled Hard towns (44–48%). Say "about half".
- **Thistlewick's strongbox went from Difficulty 8 to 10** without being mentioned. It's legal under the town rules, but it costs Thistlewick about 3 points of Win, about 6 for a reckless table.
  - **Simulated Win, reckless (Monster-heavy) party:** 51.8%, against 62.8% in v0.1.

### 1.6 Smaller balance notes
- **Fetch** is the strongest flight lever: a five-runner flight escapes 86% of the time with it against 71% without. Probably fine for a Perk.
- **The Monster is always right at the way out,** because a Success or Cost gets everyone out and "the result comes first". Fine if intended; tell players.
- **Some abilities are still dead in a local chase:** Bat on a ground that already offers Nimble, and Good Dog once the Monster has shown.
  - **Option:** "as a raise" on your own roll in a local chase too.
- **Hypnotic Eyes (Dracula's default)** is still weak.

---

## 2. Rules wording to fix (each is a sentence or two)

| # | Page | Issue | Suggested fix |
|---|---|---|---|
| W1 | 7, 13, 18 | "In the final flight, any of them may be spent as a raise" reads as only the approach and the Draught. It's also unclear whether they can go on a friend's roll: p13 says your own roll only, p18 says "anyone's roll". | "In the final flight, any signature or Gift — approaches and the Draught included — may be spent as a raise on any runner's roll, whatever its usual conditions." |
| W2 | 17–18 | **Giving up** "at the start of any round": before or after the ground is rolled? Does a chase with no rolls raise Suspicion? | "Before the ground is rolled." "A chase with no rolls raises nothing." |
| W3 | 9, 17 | **Fear the Curse and Night Runner "when you flee alone"** when a partner gives up mid-chase. | "…alone when the chase starts." |
| W4 | 15, 18 | **A Huge piece when one of its two carriers is caught.** | E.g. "it stays with the other carrier and can't move until both are free; if either is captured, the town takes it." |
| W5 | 17, 33 | **Which Suspicion sets the mob's Difficulty:** before or after the roll that got you caught? Only the Example of Play shows "after". | State "after the catching roll". |
| W6 | 6–7 | **Picks:** there's no tie-break for two players wanting the same Entity. The Duty clash order relies on "who chose their Entity later", which nobody tracks, and a random Duty can land on one that does nothing. A three-of-a-kind list leaves two of five players with no Duty edge. | A roll-off. Clashes go in seating order. Reroll any Duty that's taken or not on the list while a useful one remains. Consider letting two share a Duty when the list has 3+ of a kind. |
| W7 | 9, 11 | **Jekyll and a friend's "Monster without Suspicion"** (Unseen, Good Dog): does Hyde take over? Pillar of Society says yes only for itself. | "Hyde takes over whenever the Monster shows, at no Suspicion if an ability covered it." |
| W8 | 13 | **An own approach at a way in picks that way in for everyone,** even when it fails. | Say so, or say it doesn't pick it. |
| W9 | 16 | **Picking among three Tell arrivals** took four d6. | "Odd/even for two; 1–2, 3–4, 5–6 for three." |
| W10 | 14 | **"No extra Tells"** isn't true with the Witch's Familiar's Warning. | "…(unless the Witch's cat was covering you)". |
| W11 | 28 | **"(its page follows)":** Thistlewick is on p30, not the next page. | "(page 30)". |
| W12 | 26 | **"(Rolling a Town, step 3)" points to itself.** It means step 3 of "Placing the locations and their obstacles". This was already in v0.1. | Fix the reference. |
| W13 | 27 | **"A carried move takes two Turns"**, but since v0.2 it's at least two. | "at least two Turns". |
| W14 | 23–24 | **Rolled towns can put inside-only obstacles at a way in** (a strongbox, a back room), give both ways in as group obstacles, or repeat "front door" obstacles mid-location. Two rolled locations had no watched obstacle. | Mark which obstacles can be a way in, or reroll inside-only results there. "At most one group way in." Say no map is needed for a rolled town. |
| W15 | 33 | **At the Table is missing** what tables needed mid-play:<br>• one Entity at a time, chase included;<br>• "if the hunt starts mid-Turn, the rest don't act";<br>• "a roll's result comes first";<br>• the group check;<br>• "no local chase if that Trouble hits the Limit";<br>• furniture can be taken later or left;<br>• dropping is free;<br>• start at the way out;<br>• the Castle Duty table. | Add them; a second reference page would hold them all. |
| W16 | 5, 32 | **First-night friction:**<br>• the book says only to copy the Entity Sheet (also print p33, the town page and map, and pp8–11);<br>• it doesn't say to use a different colour for the Mask d6 and Monster d10, or that 0 on a d10 is 10;<br>• players need a second d6 that a standard dice set lacks;<br>• there's no printed track for Suspicion, Turns and the Lead;<br>• the Entity Sheet lacks room for the ability text, a box for each ability's kind, and a "where am I" field.<br>Setup from scratch ran 40–50 minutes. | A "Before you play" box. A track strip on the sheet or the tracker. A bigger ability area on the sheet. |

---

## 3. Layout

- **Must-fix:**
  - **p25** is now about half empty: the "same on every level" box sits alone after the bonfire picture was removed.
  - **p15's** right column is still 4.5 in empty, with no art.
- **Should-fix:**
  - **p30** has a 2.8 in blank band after Thistlewick.
  - **pp24, 26 and 27** end 1.6–2.7 in short. Restoring the bonfire picture at full resolution would fill most of Chapter 8's gaps.
  - **p19:** the windmill still floats, with gaps above and below.
  - **p21** has a 1.7 in blank band.
  - **Small print:** map labels 6.9 pt, map numbers 5.6 pt, and "watched" is still shown only in red.
  - **p25:** shopping-list items still break mid-phrase.
- **Fixed:**
  - Frankenstein's entry is whole on p8.
  - The town key comes before the towns.
  - The map arrows are complete.
  - The footer position is consistent, though the hairline above it still isn't.
  - The contents page, including every second-level entry and link, matches.
- **Print:**
  - There's still no bleed, and every page has a grey tint.
  - For playtests, print a white version.
  - For print-on-demand, build with a 0.125 in bleed.

## 4. Art and rights

**Fixed:** both sensitive pictures.
- The false-noses print is now Giovanni David's masked Venetian (1775).
- The procession giants are now a single stilt-walker (Charles Morel), a good match for "a head above the crowd".

**Also fixed:**
- **New pictures:**
  - Dracula "Revealed" is now Doré's Satan.
  - The Invisible Man's skeleton is gone.
  - The Ch 1 banner is now Sandby's *Caernarvon Castle*, at 281 ppi.
  - pp19 and 21 were re-scanned.
- **The public-domain notice** has been added.

Every new picture is a pre-1931 print, with no photos or film stills.

**Still to do:**
- **Credit error:** Paul Gavarni was dropped from the credits, but his print is still Dracula's "In costume" (p8). Also check that Cornet, Rochussen, Wageman and Whittock still have a picture in the book.
- [Storefront-disclosure note left out of the repository at Richard's request; he has the original.]
- **A source log for every picture,** and date checks for Woodward (d. 1951) and Koster (d. 1937).
- **Nice-to-have:**
  - the "In costume" and "Revealed" pairs still look like different people;
  - the owl and the lantern are embedded at 1,154 and 772 ppi (fine, but large files);
  - the windmill crop cuts off the engraver's signature.

---

*Detailed reports behind this summary: rules-verify.md (the verification table, new issues, all numbers), playtest-v02.md (Gallowsmere), playtest-v02-easy.md (first night), playtest-v02-standard.md (Thistlewick) and layout-art-verify.md.*
