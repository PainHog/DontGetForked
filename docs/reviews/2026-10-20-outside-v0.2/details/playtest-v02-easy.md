# Don't Get Forked v0.2: Easy / first-night playtest

**Tester role:** a Storyteller who has read the book once, with three brand-new players. I played every step by the book, process only.
**Covers:** first-night setup, then **Puddlecombe (Easy)** start to finish. Then a **second raid the same evening** with the campaign rules, in a **Standard town rolled with Chapter 8**. Then DRILLs A–F for what the dice didn't force.
**Dice:** every roll is real, from `play-scripts-easy/roll.js` (Math.random), with 140 labelled lines logged in `play-scripts-easy/dice-log.txt`. #001 was a script self-test. #052 was a mislabelled extra roll, marked VOID in the log and never used. No result was invented.
**Pages** are printed page numbers, matching `===== PAGE n =====` in dgf.txt.

**Headline:** I found **no blocker** for tomorrow. Puddlecombe runs cleanly and the town generator produces a playable town. There are **6 confusing points** a new table will stop on (the top three: what the players are allowed to see, which die is the Monster, and Hyde with a friend's Unseen) and **11 minor ones**. Each has a one-line ruling below.

---

## 0. Storyteller crib: rulings to use tomorrow

1. **Show everything.** Players see the map and the town table (traits, Difficulty, watched, group, the two ways in) before they choose.
2. **Dice.** Use a different colour for the Mask d6 and the Monster d10. A "0" on a d10 is 10. Roll the trait die and the second die together, but read the coloured one as the Mask or the Monster.
3. **Two players want the same Entity:** roll off (high d6).
4. **Duty clash:** whoever picked their Entity last gives way (taking turns around the table). If anyone rolls for a Duty, reroll any Duty that is taken **or not on the list**.
5. **A friend's "Monster without risking Suspicion" on Jekyll** (Unseen, Good Dog and so on): if the Monster shows, Hyde still takes over, at no Suspicion (as Pillar of Society says).
6. **Final flight:** any signature or Gift, including an approach Gift and the Draught, may be spent **as a raise on anyone's roll**.
7. **A local chase with no Trouble and no Monster showing raises nothing.**
8. **The local mob's Difficulty** uses Suspicion **after** the roll that got you caught (as in the Example of Play).
9. **An approach at a way in still picks that way in for everyone**, even if the roll fails, and the others must beat it themselves. Warn players before they try.
10. **Rolled towns:** re-skin odd repeats (a second "locked front door" becomes "the stockroom door"). No map is needed: every move is one Turn.
11. **Practised Hand's free change back is only a change back.** Spending the Draught as a raise in the flight costs a charge.
12. **Drop-before-you-roll is legal** (dropping loot is free, so a capture takes nothing).

---

## 1. First-night setup, step by step (timed in my head)

| # | Step | Book says (page) | Minutes | Newcomer question the book doesn't answer quickly |
|---|---|---|---|---|
| 1 | Print | "An Entity Sheet for each player (copy the one at the back of the book)" (p5) | before the session | What else to print? The book is silent on p33 At the Table (one per player is ideal), p29 Puddlecombe (the map must sit in front of the players) and pp8–11 (players need their Entity entry to fill the sheet). I printed p32 ×3, p33 ×3, p29 ×1 plus the map, and pp8–11 ×1. |
| 2 | Dice | per player d4, d6, d8, d10, d12 + a 2nd d6 + a 2nd d10; Storyteller d20, d10, 2d6 (p5) | 3 | That's 7 dice per player and 21 for three players. A standard 7-die set has only **one d6** (players need two) and its second d10 is the percentile die (00–90). The book never says "0 = 10" or "use a different colour for the Mask and the Monster". **This matters every time the trait die and the second die are the same size:** Mummy Charm d10 (Duty) + Monster d10 (#029), IM Charm d6 + Mask d6, Jekyll Wits d10 + Monster d10. Which number is the Monster's decides "the Monster shows" and the Hyde takeover. |
| 3 | Tracks | "something to track Suspicion, Turns and the Lead" (p5) | 2 | No printed track. I used three d20s, which works but isn't obvious. |
| 4 | Pitch + p5 "Raid at a glance" | p5 | 3 | Fine. |
| 5 | Players browse the 8 Entities | pp8–11 | 8–10 | **Two players wanted the Invisible Man.** p6 only says "No two players in a party play the same Entity", with no tie-break. I ruled a roll-off (#002: B 1, C 3, so C took the IM and B took Jekyll & Hyde). Can players see the town before choosing an Entity? The book doesn't say. |
| 6 | Read out the list + furniture | "The Storyteller reads out the shopping list and the furniture before anyone picks" (p6) | 1 | Fine (p29 has both). Should I also read the locations and obstacles? Not stated (Issue N1). |
| 7 | Castle Duty | p7 table and clash rule | 3 | **The defaults clash:** the Mummy and Jekyll are both Librarian. "The player who chose their Entity later" assumes a picking order nobody kept. Jekyll's player rolled: #003 6 (Tailor, taken), #006 3 (Librarian, taken), #007 3 (taken), #008 2 = Gardener. **That's four rolls.** A 4 or 5 (Butler, Handyman) would have been legal but dead, since Puddlecombe has no silver or tools. The book says "rolling again on any Duty already taken", not "not on the list". With Dracula, the Creature or the Ghost, the default Duty is dead at Puddlecombe, which clashes with "a new player can skip the choices" (p6). |
| 8 | Gift + Perk | default, or d6 1–2/3–4/5–6 (p6) | 5 | Worked. Jekyll rolled Gift #004 6 = Trample and Perk #005 1 = Practised Hand. |
| 9 | Fill the Entity Sheet | p32 | 10–15 | The **longest step**. Players copy the trait dice and the full ability text by hand. The Draught is about 6 lines and Out of Sight 4, but the sheet gives about 2 short lines each. There's nowhere to note an ability's **kind** (raise / other trait / Monster with no risk / approach), and that's the thing you need mid-roll. There's no "where am I / what have I passed" box. |
| 10 | Teach the roll + Suspicion | pp12, 16 | 5–10 | p33 covers it well. |
| | **Total before Turn 1** | | **≈40–50 min** | |

**Things missing from At the Table (p33) that came up in play:**
- The group check: two or more rolling one group obstacle in a Turn make one check, roll at once, and Suspicion rises once (DRILL B).
- "Act one at a time; finish a chase before the next Entity acts; if the hunt starts mid-Turn, anyone who hasn't acted doesn't."
- How to pick the Tell arrival (number the arrivals, roll a d6).
- "If that Trouble brings the Limit, there's no local chase" (DRILL C).
- Furniture: taking it is free, then or on a later Turn, and it can be abandoned. This is the single most useful furniture trick (Raid 1, T7).
- Dropping is free, but not while caught.
- The party starts at the way out, and entering needs no roll.
- The Castle Duty table (kind → Duty → where). It's needed at the picks and again in Chapter 8.
- The mob uses Suspicion **after** the catching roll.

**Things missing from the Entity Sheet (p32):** a current place / obstacles-passed field, more room for the Signature, Gift and Perk, and a tick-box for each ability's kind.

---

## 2. Entity setups

| Player | Entity (dice) | Raid 1 Puddlecombe | Raid 2 rolled Standard (campaign re-pick) |
|---|---|---|---|
| A | **Mummy**: Brawn d10 · Nimble d4 · Sly d6 · Charm d8 · Wits d12. Weakness Loose Thread (Soon). Tell Dust and Spice. | Duty **Librarian** (default) · Gift **Royal Bearing** (default; approach with Charm) · Perk **Fear the Curse** (default) · 3 charges | Same picks · 3 charges |
| C | **Invisible Man**: Brawn d4 · Nimble d8 · Sly d12 · Charm d6 · Wits d10. Weakness Flour (Soon). Tell Bandages and Goggles. | Duty **Tailor** (default) · Gift **Through the Gap** (default; approach with Nimble) · Perk **Out of Sight** (default) · 3 charges | Tailor · Through the Gap · Perk switched to **Light Step** · 3 charges |
| B | **Jekyll & Hyde**: Jekyll B4 N6 S8 C12 W10 / Hyde B12 N10 S8 C4 W6. Weakness A Familiar Face (Soon). Tell The Wrong Hand. | Duty **Gardener** (rolled after the clash) · Gift **Trample** (random #004) · Perk **Practised Hand** (random #005) · 3 charges | Duty **Handyman** · Gift **Pillar of Society** · Practised Hand · **4 charges** (the castle upgrade from Raid 1's bear, given to him) |

Order of choosing Entities: A (Mummy), then C (IM, after the roll-off), then B (Jekyll, last).

---

## 3. Raid 1: Puddlecombe (Easy), strict play

Limit 9 · 12 Turns · way out 6 · lock-up 10 · flight mob 10, Lead 2, escape 5. The list: cheese (essential, tavern cellar), seed potatoes (market garden), knitting wool (draper), almanac (schoolhouse). Stuffed bear (Bulky) behind the cellar's guard dog. All four locations are watched (eyes on the map).

| Step | Rule (p) | Dice (log) | Result | S |
|---|---|---|---|---|
| T1 split: Jekyll → market garden, IM → draper, Mummy → schoolhouse | move, Tell check (p14, p16) | #009 1, #010 2, #011 1 | no Tells | 0 |
| T2 Jekyll, muddy yard (way in): Sly d8→d10 (Gardener) + Mask vs 6 | p12, Duty p7 | #012 8+4 | Success | 0 |
| T2 IM, shopkeeper (watched): **Unseen** (3→2 ch), Charm d6→d8 (Tailor) + Monster vs 8 | p7 Monster with no risk | #013 5+8 | Success, knitting wool. The Monster showed (8>5), but Unseen means +0 | 0 |
| T2 Mummy, bolted back gate: Brawn d10→d12 (Librarian) + Mask vs 8 | | #014 12+4 | Success | 0 |
| T3 Jekyll, night watchman (watched): Wits d10→d12 + Mask vs 8 | Cost p12 | #015 2+4=6 | **Cost**, seed potatoes. Storyteller picks Suspicion +1 ("drop an item" would cost nothing: his only loot is what this roll won) | 1 |
| T3 Mummy, children (group, watched): Charm d8→d10 + Mask vs 8 | Trouble p12 | #016 1+2=3 | **Trouble**, +1, caught | 2 |
| ↳ **local chase**: mob 8+⌊2/2⌋=9, −1 for Fear the Curse = **8**; Lead 1, escape 4 | p17 | r1 ground #018 4 rooftops: Wits d12+Mask #019 6+1 Cost (L1). r2 #020 4: #021 8+6 Success (L2). r3 #022 3 stalls, **Weakness in**: **Ancient Lore** (3→2 ch) Wits d12→d10 + Mask #023 3+4 Cost (L2). r4 #024 6 dead end: Wits d10+Mask #025 4+6 Success (L3). r5 #026 2 alleys: **Ancient Lore** (2→1 ch) Wits d10+Mask #027 8+3 Success (**L4, escaped**) | No Trouble and no Monster in the chase: rise **0** (ruling 7). Back at the schoolhouse, Turn used. Mummy has 1 charge. **5 rounds.** | 2 |
| T3 IM → tavern cellar | Tell p16 | #017 2 | no Tell. Rolled before the chase in the log, but independent of it. | 2 |
| T4 IM, locked front door (watched way in): Sly d12 + Mask vs 8. He carries the wool, so Out of Sight can't protect him. | p10 | #028 7+5 | Success | 2 |
| T4 Mummy, children again: Charm d10 + **Monster** vs 8 | | #029 7+6 | Success, almanac. 6 ≤ 7, so no show. *(Which d10 was the Monster? I had to re-read the label: Issue N2.)* | 2 |
| T4 Jekyll → tavern cellar (already checked) | | — | | 2 |
| T5 IM, back room: Wits d10 + Mask vs 6 | | #030 3+2=5 | **Cost**, cheese (essential). Storyteller picks "drop an item": the **wool** stays in the cellar | 2 |
| T5 Jekyll, guard dog *for the piece*: Charm d12 + Mask vs 10 | p15 | #031 11+5 | Success. He **leaves the bear** for now ("taking the piece … is free, then or on a later Turn") | 2 |
| T5 Mummy → tavern cellar | | — | | 2 |
| T6 Mummy picks up the wool (action). IM → way out. Jekyll waits. | p15, p16 | Tell #032 **5** | Tell: a sneeze from nowhere | 3 |
| T7 Mummy → way out. Jekyll **takes the bear (free)** and starts a 2-Turn carried move. IM waits. | p15 | — | End of Turn: bear +1 | 4 |
| T8 Jekyll arrives. **IM rolls the way out**: Sly d12 + Mask vs 6 | p15 | #033 3+3 | Success, **Critical** (a charge back, but useless now). All out. | 4 |

**How the Year Went (p20):** 4/4 items plus the bear = **Grand Year**. Epilogue: "A year of plenty. The new piece goes in the great hall…", with no missing kinds. **Castle upgrade: 1.** Charges: 3 of 9 spent (1 refunded by the Critical), 7 lost unspent. **Out at Turn 8 of 12, peak Suspicion 4/9.**

---

## 4. DRILLs (stipulated starting states, fresh real rolls)

| Drill | State → what was rolled | Dice | Outcome / finding |
|---|---|---|---|
| **A1** Draught + approach | Schoolhouse. Jekyll drinks the Draught (1 ch) → Hyde. **Trample** (1 ch) is an approach with Brawn at the rickety drainpipe (Nimble only): 10−2=8. Brawn d12 + Mask. | #034 1+4 | Trouble (unwatched): +1. Two charges gone, **and the party is now locked into the D10 drainpipe** ("first time anyone rolls at one of them", p14). An approach doesn't beat it for the others. Issue N11. |
| **A2** helper | Trample again (→0 ch) at 8. **IM spends Unseen on Hyde's roll** (same place, not past anything, p13). | #035 8+3 | Success, only Hyde gets past. |
| **A3** Hyde with a friend's no-risk Monster | Children: free Draught back to Jekyll (Practised Hand). IM spends Unseen. Charm d12 + Monster vs 8. | #036 4+6 | Success, almanac. **The Monster showed. Does Hyde take over?** The book doesn't say for a friend's ability. Ruling: yes (Issue N3). |
| **B1** group check | Mummy (Charm d10+Mask) and Hyde (Charm d4+Monster) at the children in one Turn | #037 9+1 / 4+4 | Both Success (a tie doesn't show). Resolved in seconds. |
| **B2** group check, Out of Sight | Hyde (carrying the potatoes) + IM (no loot, Out of Sight) at the children, S3 | #038 2+2 / 3+1 | Both Trouble. **Out of Sight fails because Hyde, in the same place, carries loot.** Both caught. One rise: S4. |
| **B3** shared local chase | Hyde + IM, mob 8+2=10, Lead 1, majority rule. IM spends Unseen ×2; Practised Hand Draughts; one Draught on the last charge. | #039–#057 (#052 void) | Rounds 1–4 **level** (1 Success v 1 Trouble each time, Lead stuck at 1). r5 +1, r6 +1 (L3), r7 −2 (L1), r8 +1 (L2), r9 −2 → **0, both captured**. Rise +2 (a Monster in r5): S6. **9 rounds** while the third player waited. Issue N15. |
| **C** lock-up | Next Turn: IM slips free, Sly d12+Mask vs 10. Hyde slips free, Nimble d10+Mask. Mummy arrives at the lock-up (Tell). | #058 1+3, #059 9+5, #060 **4** | IM: Trouble, +1, no chase (S7). Hyde free. **Lock-up Tell: S8.** |
| **C2** rescue to the Limit | Mummy, **Royal Bearing** approach at the lock-up (Charm, D10−2=8): Charm d8 + Mask | #061 1+2 | Trouble: +1 = **9 = Limit**. "If that Trouble brings the Limit, there's no local chase" (p17). The hunt is on, and **IM is left behind**. |
| **D** final flight | Mummy + Hyde, mob 10, Lead 2, escape 5, Monster only, 0 charges. r1 #062 1 square: Mummy **overdraws** Ancient Lore (Wits d12); Hyde → Jekyll free (Charm d12). r2 #064 3 stalls: Mummy Brawn d10→d8 (overdraw Weakness); Jekyll **overdraws the Draught** → Hyde Brawn d12. | #063 4+7 / 10+4; #065 5+10 / 7+8 | r1 2S → L4. r2 2S → **L6, escaped**. The IM left behind drops the year one step (p20). |
| **F** flight with furniture | Raid 1 at the end of T7 (Jekyll between places carrying the bear), pretending S hit 9. Mob 10. | #135–#140 | r1 alleys: Mummy Trouble, IM Success, Jekyll (Trample **as a raise**, Sly d10) Trouble, and his Monster showed → **Hyde takes over mid-flight**. 1S v 2T: L1. r2 parade: Mummy **overdraws** Royal Bearing as a raise (Charm d10), Hyde → Jekyll free (Charm d12): 3S → L3. r3 stalls, all Weaknesses in play: **IM spends Through the Gap as a raise on the Mummy** (Issue N4); Hyde takes the Draught + Trample-as-raise: 3S → **L5, escaped with the bear**. |

Not drilled: Out of Sight saving a loot-free IM (I didn't fish for a Trouble), a Huge piece, Dracula/Ghost interactions (other testers).

---

## 5. Raid 2: rolled Standard town (Chapter 8 end to end), campaign rules on

### 5a. Generator log (pp23–27)

| Step | Dice (log) | Result |
|---|---|---|
| 1 Choose | — | Standard: Limit 10, way out 8, lock-up 10, flight mob 11 / escape 5 |
| 2 Shopping list, 2d6 each | #066 3/4 · #067 3/5 · #068 3/4 **duplicate** → #072 2/6 · #069 5/3 · #070 6/3 | 1 ink and sealing wax (books) · 2 almanac (books) · 3 mushroom spawn (plants) · 4 hinges that creak properly (tools) · 5 a top hat (cloth) |
| Essentials, "odd one, even two" | #071 6 | **two**: items 1 and 2, both books (so one Librarian covers both) |
| 3 Furniture | #073 4, #074 5 | a **stuffed bear** (Bulky) again, with item 5 (top hat) |
| 4.1 Places (d3 = d6 halved, rounded up) | #075 1 · #076 3 · #077 6 · #078 3 · #079 6 | bookseller · printer · seed merchant · ironmonger · hatter |
| 4.2 Obstacle counts (Std d20) | #080 6 · #081 6 · #082 3 · #083 18 · #084 20 | 1 · 1 · 1 · 3 · 3 |
| 4.3 Obstacles (d20 / Difficulty d20 / watched d10) | #085–#099 (15 obstacles, 45 dice) | below. The quiet-way-differs check passed at every location. |
| 4.4 Ceiling (one 12 on Std) | the hatter's way in A rolled 20 (kept). Way in B rolled 20 → reroll #100 = 8. The furniture's d20 18 → 10+2 = 12, which doesn't count. | |
| 5 Lantern Night | #101 4 | pies on doorsteps (same as Puddlecombe) |
| Villagers | #102 1/1 · #103 4/1 | the baker's wife, looking for a lost cat · the vicar, *also* looking for a lost cat (fine: a reroll or a joke) |

**Generator time:** 38 logged rolls (about 60 dice) plus writing the town out. That's about 25 minutes, in line with the book's "about half an hour".

### 5b. The rolled town (I named it "Mossbottom"; the book has no name table)

| Location · obstacle | Quiet | Loud | Diff | Watched |
|---|---|---|---|---|
| **1 Bookseller**: ink and sealing wax (books) · essential | | | | (location unwatched: no Tell) |
| WAY IN locked front door | Sly | Brawn | 8 | – |
| OR cart blocking the alley | Brawn | Nimble | 6 | – |
| **2 Printer**: almanac (books) · essential | | | | watched |
| WAY IN shopkeeper behind the counter | Charm | Sly | 10 | – |
| OR high garden wall | Nimble | Brawn | 8 | **watched** |
| **3 Seed merchant**: mushroom spawn (plants) | | | | (unwatched) |
| WAY IN heavy cellar trapdoor | Brawn | — | 8 | – |
| OR locked front door | Sly | Brawn | 8 | – |
| **4 Ironmonger**: hinges (tools) | | | | watched |
| WAY IN tug-of-war across the lane (group) | Brawn | — | 8 | **watched** |
| OR dark, cluttered back room | Wits | Sly | 10 | **watched** |
| THEN heavy cellar trapdoor | Brawn | — | 8 | **watched** |
| THEN guard dog | Charm | Nimble | 10 | – |
| **5 Hatter**: top hat (cloth) + bear | | | | watched |
| WAY IN children in costumes (group) | Charm | — | **12** | **watched** |
| OR high garden wall | Nimble | Brawn | 8 | – |
| THEN locked front door | Sly | Brawn | 10 | – |
| THEN guard dog | Charm | Nimble | 8 | **watched** |
| THEN locked front door *for the piece* | Sly | Brawn | 12 | **watched** |

**Generator verdict:** everything resolved and the town is **playable**. Each location has a sensible unwatched or easy way in, and the difficulty spread (one 6, eight 8s, five 10s, two 12s) feels Standard. Oddities: (a) obstacles written for the front of a building land in the middle or as the furniture obstacle, so the hatter has *three* "front door" style doors in a row and the ironmonger's way in is a "back room". The book never says to re-skin them (N13). (b) Two whole locations came out unwatched with a single obstacle, so an essential sat behind a D6 cart with no Tell and no catching. That's legal variety, not a bug. (c) There's no map step. That's fine because every move is one Turn, but the book doesn't say "no map needed" (N14).

### 5c. Play log

Campaign: the bear gave **1 upgrade**, and the players gave it to Jekyll (4 charges). Picks were redone after hearing the list (p21): see §2.

| Step | Rule (p) | Dice (log) | Result | S |
|---|---|---|---|---|
| T1: Mummy → bookseller (unwatched, no check). IM → hatter. Jekyll → ironmonger. | p16 | #104 **4**, #105 **5** | Two Tells before any roll | 2 |
| T2 Mummy, cart: Brawn d10→d12 + Mask vs 6 | | #106 5+5 | Success + **Critical** (no charge spent yet, so nothing back), ink (E) | 2 |
| T2 IM, garden wall: Nimble d8→d10 + Mask vs 8 | | #107 8+2 | Success | 2 |
| T2 Jekyll **Draught** (4→3) → Hyde. Tug-of-war (group, watched): Brawn d12 + Mask vs 8 | | #108 10+4 | Success (only Hyde past) | 2 |
| T3 Mummy → printer | | #109 2 | no Tell | 2 |
| T3 IM, front door: **Unseen** (→2), Sly d12 + Monster vs 10 | | #110 1+8=9 | **Cost**. Monster shown, no S. The Storyteller picks "next roll's trait die one size smaller" (a watched roll comes next) | 2 |
| T3 Hyde, trapdoor (watched): Brawn d12 + Mask vs 8 | | #111 7+3 | Success | 2 |
| T4 Mummy, **Royal Bearing** (→2) approach at the watched wall, D6: Charm d8→d10 + Mask | p13 | #112 5+2 | Success, almanac (E). The wall is now the printer's way in. | 2 |
| T4 IM, guard dog (watched): **loud** Nimble d8 (Tailor raise and Cost step-down cancel) + **Unseen** (→1) vs 8. **Light Step**: the loud way costs nothing. | p13 netting | #113 7+8 | Success, top hat. No S at all. | 2 |
| T4 Hyde → Jekyll (free, Practised Hand). **Pillar of Society** (→2): Charm d12 + Monster vs 10 | | #114 7+9 | Success, hinges. The Monster showed, so **Hyde takes over** (as Pillar of Society says), no S. | 2 |
| T5 IM **drops the hat** (free). **Through the Gap** (→0): approach with Nimble at the bear's door, D12−2=10: Nimble d8→d10 + Mask | p15 | #115 3+1 | **Trouble**, caught (watched) | 3 |
| ↳ local chase: mob 8+1=**9**, Lead 1 | | r1 #116 4: Wits d10+Mask #117 5+3 Cost (L1). r2 #118 6: #119 3+2 **Trouble → L0** | **Captured.** Rise +1. The town takes nothing (the hat was dropped). | 4 |
| T5 Hyde → hatter. Mummy → seed merchant (unwatched). | | — | | 4 |
| T6 IM **slips free**: Sly d12 + Mask vs 10 | p18 | #120 6+5 | Free (acts next Turn from the lock-up) | 4 |
| T6 Mummy, trapdoor: Brawn d10 + Mask vs 8 | | #121 3+2 | Trouble, unwatched, so no chase | 5 |
| T6 Hyde **drops the hinges**. **Pillar** (→1): **loud** Brawn d12 + Monster vs 12 at the bear's door (watched) | p16 one rise | #122 1+7 | Trouble. Loud + Trouble = +1. Caught. | 6 |
| ↳ local chase: mob 8+3=**11** | | r1 #123 4: **Pillar** (→0) Nimble d10+Monster #124 1+10 Success (L2). r2 #125 2: #126 6+5 Success (L3). r3 #127 3, **Weakness**: Brawn d10+Monster #128 9+1 Cost. r4 #129 4: Nimble d8+Monster #130 6+3 Cost. r5 #131 4: #132 2+9 **Success → L4, escaped** | The Monster showed in r5: rise **+2**. **5 rounds.** | **8** |
| T7 Hyde picks up the hat and hinges (one action). Mummy + IM → way out. **The bear is abandoned as a goal** (its tick would reach the Limit). | p15 | #133 3 | no Tell | 8 |
| T8 Hyde → way out. IM rolls the way out: Sly d12 + Mask vs 8 | | #134 8+2 | Success. Out. | 8 |

**How the Year Went:** ink and almanac (both essentials), hat and hinges are home; the mushroom spawn (an extra) is missing. That's **Win**: "Full larders, warm fires…" plus *Plants and seeds:* "Nothing grows but nettles, and the nettles win." Still 1 upgrade. **Out at Turn 8, peak Suspicion 8/10**, with two local chases (one capture and slip-free, one escape). This was a properly tense Standard raid.

---

## 6. NEW ISSUES (v0.2)

Severity: **blocker** = the table can't go on without a ruling and it may derail the night (none found). **confusing** = the table stops and argues. **minor** = polish or feel.

| # | Sev | Where it arose | Exact quote (page) | Suggested fix | Ruling to use tomorrow |
|---|---|---|---|---|---|
| N1 | **confusing** | Setup step 6, then every choice of way in | Nothing says whether players see the town table. The closest are "The Storyteller reads out the shopping list and the furniture before anyone picks" (p6) and the example's "(Charm, 8, watched)" (p28) | One line in Ch 8/9: "Show the players the map and the town table: traits, Difficulty, watched, group." | Everything on the town page except villagers is open information. |
| N2 | **confusing** | Raid 1 T4 (#029, two d10s), and every Jekyll roll | "plus a second d6 for the Mask and a second d10 for the Monster" (p5); "if its number is higher than your trait die's, the Monster shows" (p6) | Add to What You Need: "make the Mask d6 and the Monster d10 a different colour from your trait dice; a 0 on a d10 is 10." | Coloured Mask and Monster dice; 0 = 10. |
| N3 | **confusing** | DRILL A3 (#036): IM's Unseen on Jekyll's roll, and the Monster showed | "When the Monster shows on one of Jekyll's rolls, that roll stands and Hyde takes over straight after it, free" (p11) v "If it shows, that adds nothing" (p7). Pillar of Society spells it out for itself only: "On Jekyll's rolls, Hyde still takes over if the Monster shows." (p11) | Move Pillar's sentence into the Draught: "Hyde takes over whenever the Monster shows on Jekyll's roll, even with no Suspicion." | Hyde takes over. |
| N4 | **confusing** | DRILL F r3: IM wanted to give Through the Gap to the Mummy as a raise | "an approach of your own, or the Draught, only ever works on your own roll. In the final flight, any of them may be spent as a raise instead." (p7) v "Abilities can go on anyone's roll … Any ability may also be spent as a raise" (p18) | "In the final flight, any signature or Gift, approaches and the Draught included, may be spent as a raise on anyone's roll." | Yes, on anyone's roll, as a raise. |
| N5 | **confusing** (partly carried from v0.1 #7/#8) | Setup: Mummy and Jekyll both default to Librarian. Four Duty rolls (#003, #006–#008). Raid 2 re-picks. | "if two defaults clash in a party, the player who chose their Entity later picks another or rolls a d6, rolling again on any Duty already taken. A Duty whose kind isn't on the list gives no edge that raid, so pick one that is where you can." (p7); "Every pick has a marked default, so a new player can skip the choices." (p6); "the players pick Castle Duty, Gift and Perk again" (p21) | Define the order (e.g. "Entities are chosen in seating order"). When rolling, "reroll any Duty that's taken or not on the list". Cover clashes between chosen (not default) Duties in the campaign. | The last to pick an Entity gives way. Reroll Duties that are taken or off the list. In the campaign, the same order. |
| N6 | **confusing** | Raid 1 T3: the Mummy's 5-round chase had no Trouble and no Monster | "A local chase still raises Suspicion, once, when it ends (Chapter 6)." (p12) v "by the biggest trigger among all its rolls … Trouble +1, the Monster showing +2" (p17) | p12: "…raises Suspicion once, when it ends, by its biggest trigger (if any)". | A clean chase raises nothing. |
| N7 | minor | Setup step 5: two players wanted the IM | "Each player picks one. No two players in a party play the same Entity." (p6) | Add "if two want the same one, roll off". | Roll off. |
| N8 | minor | Setup step 9 | Entity Sheet lines "Signature (1 charge)", "Gift (1 charge)", "Perk (always on)", and the Status box "In town" (p32) | Give the Signature, Gift and Perk 3–4 lines, add kind tick-boxes (raise / other trait / Monster, no risk / approach) and a "Where: ____ past: ____" line. Better still, print 8 pre-filled Entity cards. | Write only the ability *kind* plus its trait, and keep the book open at pp8–11. |
| N9 | minor | Throughout (list in §1) | p33 omits: the group check; one-at-a-time sequencing and the hunt mid-Turn; how to pick the Tell arrival; "If that Trouble brings the Limit, there's no local chase" (p17); free furniture taking and abandoning (p15); free dropping (p15); "The party starts … at the way out" (p14); the Castle Duty table (p7) | Squeeze these in, or move the difficulty table to the Storyteller's page to make room. | The Storyteller keeps pp14–18 at hand. |
| N10 | minor | Setup steps 1 and 3 | "An Entity Sheet for each player (copy the one at the back of the book), and something to track Suspicion, Turns and the Lead." (p5) | Add a "Print this" line (p32 per player, p33 per player, the town page facing the players). Put tracks on p33: Suspicion 0–13, Turn 1–12, Lead 0–6. | Use three d20s or tokens on scrap paper. |
| N11 | minor | DRILL A1 (#034): a failed Trample at the drainpipe locked the party into the D10 way in | "The party picks one the first time anyone rolls at one of them … (A Ghost's Spectral pass, with no roll, doesn't pick it.)" (p14) with "Only you get past it. It isn't beaten for the others" (p13) | Say it outright: "An approach roll at a way in picks it too, even if it fails." Or exempt approaches as Spectral is exempted. | It picks the way in. Warn players first. |
| N12 | minor | Raid 1 T3: what Suspicion sets the mob? | "8 plus half the Suspicion when the chase starts" (p17). Only the Example (p28) shows that it includes the catching roll's rise. | Add "(after the roll that caught you)". | After the catching roll's rise. |
| N13 | minor | Raid 2 generator: three "front door" style doors in a row at the hatter; a "back room" as a way in | "A later obstacle may repeat one of the ways in (two shuttered windows are fine)." (p23) | Add "rename a repeat or an odd placement freely (a second front door is the stockroom door); the traits and Difficulty stay." | Re-skin freely. |
| N14 | minor | Raid 2 generator and the evening's schedule | "roll a town before the session (it takes about half an hour)" (p27) with "A raid runs 1–2 hours, so an evening often fits two." (p5) | Add "a rolled town needs no map: every move is one Turn". Offer a blank town sheet in Ch 9's format, and say "roll the second town before the session too". | Pre-roll the second town tonight. No map. |
| N15 | minor (pace; extends v0.1 #17) | DRILL B3: a shared local chase ran **9 rounds**, 4 of them level, then a −2 at Lead 1 captured both | "flee together on one shared Lead, moved by the majority rule" (p18); "Level: the Lead stays." (p18) | A round cap (e.g. after round 5: Lead 2+ escapes, otherwise captured), or start shared chases at Lead 2. | Keep it, but let waiting players voice the mob (p27). |
| N16 | minor (design note) | Raid 2 T5/T6: both runners dropped their loot (free) before a risky watched roll, so the capture took nothing | "You may drop your own loot … at any time without using your action. Once you're caught, though, you can't" (p15) | Intended? If not, "you can't drop loot in the Turn you roll a watched obstacle". | Legal (picking it up again costs an action). |
| N17 | minor | DRILL D/F: "can Hyde's free change back be my raise every round?" | "Practised Hand (default): Changing back to Jekyll costs no charge." (p11) with "Any ability may also be spent as a raise … instead of doing what it usually does" (p18) | Add to Practised Hand: "(only when it changes you back)". | Free only as a change back. As a raise it costs a charge. |

**Carried over from the v0.1 playtest, still open, seen again tonight:** v0.1 #19 *Out of Sight* ("anyone in the same place carries loot") cost the IM in DRILL B2. v0.1 #18 *lock-up 10 even on Easy*: DRILL C went slip-free Trouble +1, lock-up Tell +1, rescue Trouble +1 → Limit. v0.1 #6 *the Tell tax*: Raid 2 was at S2 before a single roll. v0.1 #26 *party size*: with 3 players **the Turn clock never mattered**, and both raids were out at Turn 8 of 12.

**Fixed since v0.1 and confirmed in play:** the mob fixed at the chase's start; giving up; abilities as raises in the flight; "reroll unused numbers" for the Tell pick; "they choose who holds it"; take the furniture later; Forked stays Forked; a pending step-down carries into a chase; "no local chase if the Trouble brings the Limit"; overdraw "on top". All worked without a question.

---

## 7. What worked

- **Puddlecombe is a superb first town.** Every location has an easy way in, all four are watched (so the Tell checks teach themselves), the one group obstacle is optional, and its list matches four default Duties (Mummy, IM, Witch, Werewolf). Nobody needed a ruling about the town itself.
- **The core roll** (trait + Mask/Monster, Success / Cost / Trouble) was learned in two rolls. "The Monster shows if it beats your trait die" made a real choice every time.
- **Castle Duty** gave each new player a spotlight location on Turn 1, and the raise mattered (Mummy Brawn d12, IM Charm d8 / Nimble d10, Jekyll Sly d10 / Wits d12).
- **Helping** (a charge without an action) and the **Jekyll/Hyde flip** gave the best moments (DRILL A3, Raid 2 T4).
- **"The Storyteller never picks a Cost that costs nothing"** answered T3 instantly. "Drop an item" (T5) created a nice pick-up errand.
- **Furniture sequencing** ("then or on a later Turn") lets a careful party bring the bear home for a single +1. It's satisfying and clear.
- **The rolled town generator** worked end to end: every table resolved, the ceiling rule was easy, and the result played like a real Standard raid.
- **Campaign hand-off** (one upgrade → a 4th charge, redo the picks) took about 2 minutes.

## 8. How it felt

- **Pace.** Setup ≈ 40–50 min (sheets are the bottleneck). **Raid 1 ≈ 60–70 min** for 8 Turns and one 5-round chase, teaching as we went. Generating the second town ≈ 25 min, unless done beforehand. **Raid 2 ≈ 60 min** for 8 Turns and two chases (2 and 5 rounds). **Whole evening ≈ 3¼–3½ hours.** Two raids fit if the second town is pre-rolled and the sheets are pre-filled. Local chases are the time sinks: 4–5 minutes each solo, 10+ shared.
- **Was Easy too easy?** For a *first* raid, it's about right. The Grand Year came at Turn 8 with Suspicion 4/9, and the only real danger was one Trouble at the watched children (an escaped chase that cost nothing). Experienced players would find it slack: 4 spare Turns, 7 of 9 charges unspent, and the bear for +1. Puddlecombe makes the right *first* night, but don't replay it. Note that Easy's Limit (9) is **lower** than Standard's (10). That's deliberate in v0.2, but newcomers may think it's a typo; one sentence saying why would help.
- **Standard (rolled)** felt like the real game: the bear behind a watched D12 caused two chases and +5 Suspicion, and abandoning it was a genuine, tense decision.
- **Suspicion, not Turns, was the clock** in both raids with 3 players.

Files: report `dgf-v02/playtest-v02-easy.md`; dice log `dgf-v02/play-scripts-easy/dice-log.txt`; roller `dgf-v02/play-scripts-easy/roll.js`; page-clip helper `dgf-v02/play-scripts-easy/clip.py`.
