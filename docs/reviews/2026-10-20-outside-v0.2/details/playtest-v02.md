# Don't Get Forked v0.2: procedural playtest

**Tester role:** Storyteller plus five players. The focus is on process; there is no roleplay.
**Book:** "Don't Get Forked" v0.2, Richard Moore.
- Page numbers are the printed ones, which match the `===== PAGE n =====` markers in `dgf.txt`.
- Tables and maps were checked on rendered PDF pages 7, 18, 31 and 33.

**Dice:**
- Every roll came from `play-scripts/roll.js` (`crypto.randomInt`) and was logged with a label to `play-scripts/rolls-v02.log` (221 lines). `#NNN` below points to a log line.
- No result was invented.
- One log-hygiene slip: an unused "colour" roll was hidden and its line deleted before #113. It was never seen or used, and line #114 records this.
- `#001` is a roller test.

**Session shape:**
- **Raid 1:** Gallowsmere (Hard), played strictly. It ended at Turn 7 with a **Grand Year**.
- **Raid 2:** the first raid ended early, so I played a second one with the campaign rules on, in a town rolled from Chapter 8's tables (Standard, which I'm calling "Inkwold"). Also a **Grand Year** at Turn 7.
- **DRILLs:** neither raid forced a single local chase, capture or final flight, so DRILLs A1–W cover them. Each has a stated premise and fresh real rolls.
- **Analysis:** Monte Carlo runs, labelled as analysis and not play: `play-scripts/sim-v02.js` and `sim-v02b.js`.

---

## 1. Entity setups (Ch 2, pp6–11)

The Storyteller read out the list **and the furniture** before anyone picked (p6). Entities were chosen in seating order: P1 Dracula, P2 Werewolf, P3 Witch, P4 Ghost, P5 Mummy. Four of the five differ from v0.1; the Ghost was kept on purpose, for Spectral.

| Entity | Traits (B/N/S/C/W) | Signature | Gift | Perk | Duty, Raid 1 (Gallowsmere) | Duty, Raid 2 (Inkwold) | Weakness | Tell |
|---|---|---|---|---|---|---|---|---|
| **Dracula** | d8/d10/d6/d12/d4 | Mesmerise | Bat (default) | Hypnotic Eyes (*random d6 = 2*, #002) | Butler: silversmith (spoons, essential) | Butler: laundry. **4 charges** (armour upgrade) | Garlic (Always) | No Reflection |
| **Werewolf** | d10/d12/d6/d4/d8 | Good Dog | Keen Nose (default) | Night Runner (R1), **Fetch** (R2) | **Tailor**, re-picked because Gardener is dead (no plants on the list): tailor (bandages, plus the armour) | Gardener: **dead**, with no live Duty left | Hounds (Soon) | Eyebrows |
| **Witch** | d6/d4/d10/d8/d12 | Hedge Spell | **Black Cat** (*random d6 = 4*, #003) | Familiar's Warning (default) | Cook: butcher (bacon) | Cook: **dead**, with no live Duty left | Rowan (Soon) | A Black Cat |
| **Ghost** | d4/d12/d10/d8/d6 | Through the Wall | Chill (default) | Spectral (default) | **Handyman**: Butler clashed with Dracula and she chose later, so she rolled d6 = 5 (#004): smithy (lock, essential) | **Tailor** (Butler clashed again; she picked a live one) | Cold Iron (Always) | Cold Spot |
| **Mummy** | d10/d4/d6/d8/d12 | Ancient Lore | Royal Bearing (default) | Fear the Curse (default) | Librarian: printer (paper) | Librarian: bookseller, schoolhouse and printer | A Loose Thread (Soon) | Dust and Spice |

**Setup friction:**
- **The Duty clash rule now works.** "The player who chose their Entity later" settled it at once both times.
- **A random Duty can land on a dead one.** In Raid 1 the Ghost's reroll could have landed on Gardener, which does nothing here (a 2-in-6 chance). New issue N7.
- **Dead Duties in Raid 2.** The rolled list was three books items, one silver and one cloth, so only three Duties were live and two of five players had no edge.

---

## 2. Raid 1: Gallowsmere (Hard), strict play

Numbers (p31, p25): Limit 13, way out 10, lock-up 10; final flight mob 11, Lead 2, escape at 6. The list is the lock (essential), the spoons (essential), writing paper, bandages and bacon. The furniture is a suit of armour (Bulky) at the tailor, behind a trapdoor (Brawn 12). Every location is watched (the map marks an eye at all five).

| # | Turn: who | Step (rule, page) | Dice (log) | Result | Susp |
|---|---|---|---|---|---|
| 1 | T1: all | Five-way split, each to its Duty location. No roll to enter (p14) | — | — | 0 |
| 2 | T1 | Tell checks at five watched places (p16). At the butcher, the Witch's Familiar's Warning (p11) means a second d6 must also roll 4–6 | smithy 1, silversmith 4, printer 5, tailor 6, butcher 1 + 5 (#005–009) | Dracula, the Mummy and the Werewolf's Tells go off | **3** |
| 3 | T2: Werewolf | Tailor's rickety drainpipe: Nimble d12 (Tailor at max), Mask, v 8, unwatched (p12) | 8+2 (#010) | Success. This picks the drainpipe as the way in (p14) | 3 |
| 4 | T2: Ghost | Smithy's garden wall: Nimble d12, Mask, v 8, watched | 9+1 (#011) | Success | 3 |
| 5 | T2: Dracula | Silversmith's shuttered window: Nimble d10, d12 with Butler, Mask, v 8, watched | 7+5 (#012) | Success | 3 |
| 6 | T2: Witch | Butcher's geese: Sly d10, d12 with Cook, Mask, v 8, watched | 7+2 (#013) | Success | 3 |
| 7 | T2: Mummy | Printer's nosy neighbour (watched, Sly 8). **Royal Bearing**, her own approach (p7, p13): Charm d8, d10 with Librarian, v 6 (charges 3→2) | 3+6 (#014) | Success. An own approach is a roll, so it picks this way in (p14) | 3 |
| 8 | T3: Mummy | Back room: Wits d12, Mask, v 8 | 10+5 (#015) | Success. **Writing paper** | 3 |
| 9 | T3: Dracula | Guard dog: Charm d12, Mask, v 8, watched | 9+1 (#016) | Success | 3 |
| 10 | T3: Ghost | Night watchman (watched, Wits 10). **Through the Wall**: Sly d10, d12 with Handyman, v 8 (3→2) | 8+2 (#017) | Success. **Lock** (essential) | 3 |
| 11 | T3: Witch | Shopkeeper (watched, Charm 10). Charm d10 with Cook, plus **Black Cat** (Monster, no Suspicion; 3→2) | 10+7 (#018) | Success | 3 |
| 12 | T3: Werewolf | Crowded shop floor (group, watched, Sly 10). **Keen Nose** (Wits d8, d10 with Tailor) plus **Good Dog** (3→1). Two abilities on one roll, only one changing the trait (p13) | 8+5 (#019) | Success. **Bandages** | 3 |
| 13 | T4: Werewolf | Trapdoor **for the piece**: Brawn d12, Mask, v 12, unwatched | 5+1 (#020) | Trouble. Unwatched, so no chase | 4 |
| 14 | T4: Dracula | Strongbox (unwatched, Wits/Charm 10). **Bat**: Nimble d12 with Butler (3→2). Nimble isn't listed, so it isn't loud | 1+2 (#021) | Trouble | 5 |
| 15 | T4: Ghost | Moves to the butcher (no new Tell: each place is checked once, p16). **Hands the lock to the Witch** (free, p15), then **Spectral** past the tug-of-war (group, Brawn 12) with no roll and no action (p10). That was the last obstacle (p14) | — | **Bacon** in hand, with no roll | 5 |
| 16 | T4: Witch | Moves to the silversmith carrying the lock. The Mummy waits | — | — | 5 |
| 17 | T5: Dracula | Strongbox retry: Bat (2→1) plus the Witch's **Black Cat on his roll** (2→1; a helper keeps its action, p13) | 6+2 = 8 (#022) | **Cost**: **silver spoons** (essential). Drop an item would cost nothing (p12), so the Storyteller picks **Lose a Turn**, which delays the whole exit | 5 |
| 18 | T5: Werewolf | Trapdoor retry: Brawn d12, Mask, v 12 | 6+4 = 10 (#023) | **Cost**: he's past it. The Storyteller picks Suspicion +1 | 6 |
| 19 | T5 | The Witch, the Ghost and the Mummy move to the way out. It's the first return, so a Tell check, with Familiar's Warning | 5 + 4 (#024). Arrival pick: d6 6, 6, 4, 3 (#025) | Tell goes off: **the Mummy** (it took four d6 to pick among three) | 7 |
| 20 | T6 | Dracula loses his action. The Werewolf **takes the armour** (free, p15) and starts the carried move (between places) | — | End-of-Turn furniture tick (p15) | 8 |
| 21 | T7 | Dracula arrives. The Werewolf arrives on his T7 action. The Ghost hasn't acted, so she rolls the way out: Nimble d12 **plus the Monster** (p16: the result comes first) v 10 | 10+9 (#026) | Success. Everyone out | 8 |

**How the Year Went (p20):** all five items plus the armour came home. **GRAND YEAR.** Epilogue: "A year of plenty…", with no missing-kind lines. Campaign (p21): the armour becomes castle upgrade 1.

**Charges:** 8 of 15 spent, 7 lost unspent (Dracula 2, Werewolf 2, Witch 2, Ghost 1, Mummy 1).

**Watched rolls:** 9 made, **0 Trouble**.

---

## 3. Raid 2: "Inkwold", a rolled Standard town, with the campaign rules

### Town roll (Ch 8 pp23–27; all dice in #027–095)

| Step | Dice | Result |
|---|---|---|
| List (2d6 each); essentials die | 3-3, 3-4, 4-3, 6-1, 3-2; essentials d6 = 4 (#027–032) | 1) cookbook (**E**), 2) ink and sealing wax (**E**), 3) bed linen, 4) black velvet, 5) black-edged paper |
| Furniture | d6 = 5; item d6 = 5 (#033–034) | **Grandfather clock (Huge)**, at item 5's location |
| Locations (d3 from a halved d6) and obstacles (d20 count; d20 type, d20 Difficulty and d10 watched each; way in rolled twice; ceiling) | #035–092 | See below. One Difficulty 12 (the printer's way in), within the ceiling. The piece's window is 8 + 2 = 10 |
| Custom; villagers | 6; 6-5 and 3-1 (#093–095) | Bells every hour; Granny Mott (gossiping, loudly) and a gang of children (looking for a lost cat) |

The town as rolled:
- **1 Bookseller** (cookbook, essential). Way in: bolted back gate (Brawn 10) or garden wall (watched, Nimble 6). Then a maze of stalls (group, watched, Wits 10). Then geese (Sly 10).
- **2 Schoolhouse** (ink, essential). One obstacle: the rooftops (group, watched, Nimble 10) or a back room (watched, Wits 8).
- **3 Laundry** (linen). Way in: garden wall (watched, Nimble 10) or a maze (group, Wits 10). Then geese (Sly 8). Then a trapdoor (watched, Brawn 8).
- **4 Tailor** (velvet). Way in: doorman (Charm 8) or **a locked strongbox** (Wits 8). Then a maze (group, watched, Wits 10).
- **5 Printer** (paper and clock). Way in: children (group, Charm 12) or crowded shop floor (group, watched, Sly 10); **both ways in are group**. For the piece: a shuttered window (Nimble 10).

Standard numbers: Limit 10, way out 8, lock-up 10, flight mob 11, escape at 5. All five locations are watched.

### Play log

| # | Turn: who | Step (rule, page) | Dice (log) | Result | Susp |
|---|---|---|---|---|---|
| 1 | T1 | The Ghost and the Witch go to the schoolhouse; Mummy to the bookseller, Dracula to the laundry, Werewolf to the tailor. Tell checks | schoolhouse 3 + 3 (Familiar), bookseller 2, laundry 5, tailor 5 (#096–099) | Dracula's and the Werewolf's Tells go off | **2** |
| 2 | T1: Ghost | **Spectral** past the rooftops (the way in and the only obstacle), after her move. She hands the ink to the Witch | — | **Ink** (essential), no roll. The way in isn't picked (p14) | 2 |
| 3 | T2 | The Ghost and the Witch move to the printer; Tell check with Familiar's Warning | 6 + 1 (#100) | No Tell. **Spectral** past the group way in: **paper**, handed to the Witch | 2 |
| 4 | T2: Mummy | Bookseller wall: Nimble d4, d6 with Librarian, Mask, v 6, watched | 2+6 (#101) | Success | 2 |
| 5 | T2: Dracula | Laundry maze (group, unwatched, Wits 10). **Bat**: Nimble d12 with Butler (4→3) | 11+6 (#102) | Success. Picks the maze as the way in | 2 |
| 6 | T2: Werewolf | Tailor's strongbox (way in, Wits 8): Wits d8, Mask | 4+3 = 7 (#103) | **Cost**. He carries nothing, so the Storyteller picks "next die smaller", since his next roll was meant to be the watched maze (p27) | 2 |
| 7 | T3: Ghost | Moves to the tailor. **Spectral** past the maze (group, watched): **velvet**, handed to the Werewolf | — | No roll | 2 |
| 8 | T3: Mummy | Bookseller maze (group, watched): Wits d12, Mask, v 10 | 9+6 (#104) | Success | 2 |
| 9 | T3: Dracula | Laundry geese: Sly d6, d8 with Butler, Mask, v 8 | 7+6 (#105) | Success | 2 |
| 10 | T3: Witch | Printer children (group, unwatched, Charm 12), to be the clock's second carrier. **Hedge Spell** plus **Black Cat** (3→1) | 9+4 (#106) | Success. Picks the children as the way in | 2 |
| 11 | T4: Mummy | Bookseller geese (Sly 10). **Ancient Lore**: Wits d12 (3→2) | 3+6 = 9 (#107) | **Cost**: **cookbook** (essential). Storyteller picks Suspicion +1 | 3 |
| 12 | T4: Dracula | Laundry trapdoor (watched, Brawn 8): Brawn d8, d10 with Butler, Mask | 6+1 = 7 (#108) | **Cost**: **bed linen**. Suspicion +1. **All five items by Turn 4** | 4 |
| 13 | T5: Ghost | Printer's window **for the piece**: Nimble d12, Mask, v 10 | 11+2 (#109) | Success | 4 |
| 14 | T5 | Dracula, the Mummy and the Werewolf move to the way out. They arrive early on purpose: an extra furniture tick would cost more than a Tell check without the cat | 4; arrival pick 6, 3 (#110–111) | The Werewolf's Tell goes off | 5 |
| 15 | T6 | The Ghost and the Witch take the clock (Huge, two carriers, p15) and start the carried move | — | Tick | 6 |
| 16 | T7: Werewolf | Both carriers arrive. The Werewolf rolls the way out: Standard 8, **Fetch −1 = 7**, Nimble d12 **stepped down to d10** by the pending Cost (p12: "whatever that roll is"), plus the Monster | 4+2 = 6 (#112) | Cost: everyone out ("a Cost here costs nothing", p15) | 6 |

**How the Year Went:** five of five items plus the clock. **GRAND YEAR.** Campaign: the clock becomes castle upgrade 2.

**Charges:** 4 of 16 spent, **12 lost unspent**.

**Watched rolls:** 4 made, 0 Trouble. **Spectral took four of the five items' group obstacles with no roll.**

---

## 4. DRILLs: stipulated premises, fresh real rolls

| DRILL | Premise | Steps and dice (log) | Outcome | Susp |
|---|---|---|---|---|
| **A1**: lone local chase, the v0.1 spiral premise | Gallowsmere, T2, S3. The Witch gets Trouble at the watched geese (+1, S4) and is caught. **Mob 8 + ⌊4/2⌋ = 10, fixed** (p17). Lead 1, escape at 4 | r1, parade: Sly d10 plus **Black Cat**, 6+6 **Critical**, two Successes: Lead 3 (#113, #115). r2, parade: Sly d10 with the Mask, 9+4: Lead 4 (#116–117) | Escaped in 2 rounds. **Chase rise +0** (no trigger in any roll) | 4 |
| **A2**: lone chase, an Always Weakness | Same premise. Dracula is caught at the silversmith's front door (S4, mob 10). Garlic from round 1 | r1 rooftops: Nimble d8 plus Monster, 7+3: Lead 2. *Bat is useless here: Nimble is already on the ground* (#118–119). r2 dead end: **Bat** for Nimble d8, 8+2: Lead 3 (#120–121). r3 square: Charm d10 plus Monster (Hypnotic Eyes), 2+8, **shows**, Success: Lead 4 (#122–123) | Escaped in 3 rounds. **Rise +2** | 6 |
| **B**: group check, **shared chase**, **giving up**, **overdraw in a local chase** | Gallowsmere, T4, S6. The Werewolf (3 charges) and the Mummy (2 charges, carrying the paper) both get Trouble in one group check at the shop floor. One rise, S7. Shared Lead 1, **mob 11** (p18) | r1 dead end: Werewolf Good Dog 3+1 Trouble; Mummy Wits d12 plus Monster 5+9 Success (shows). Level, Lead 1 (#124–126). r2 alleys: 4+10 Success; Ancient Lore 12+5 Success. +2, Lead 3 (#127–129). r3 parade (both Weaknesses arrive): Keen Nose d6 2+1 Trouble; Ancient Lore d10 1+5 Trouble. −2, Lead 1 (#130–132). r4: Cost and Success, Lead 2 (#133–135). r5: Trouble; **the Mummy overdraws Ancient Lore** (+2 on top, p19) for a Success. Level (#136–138). **r6: the Werewolf gives up at the start of the round** (p18): captured, with no roll. The Mummy goes on alone. *Fear the Curse: does the mob drop to 10? I ruled no ("stays the same for the whole chase")* (#139). r6–r15, the Mummy alone: T, S, T, S, C, S, C, T, T, T (#140–158). **Lead 0 in round 15** | **Both captured** (one gave up, one cornered). The town takes the paper. **15 rounds inside Turn 4.** Rise: Monster +2, plus the overdraw +2, = **+4** | 11 |
| **B2**: giving up to protect the party (no dice) | Gallowsmere, S12/13: a lone runner is caught. Any chase Trouble would make the rise +1 and reach the Limit | Gives up at the start of round 1 (p18) | Captured. Rise 0, Suspicion stays 12, and the raid goes on. The new valve works (v0.1 issue 3) | 12 |
| **C**: lock-up, slip free, Tell, rescue | Continues from B: both held | T5: Werewolf **slips free**, Nimble d12 with the Mask, v 10 (Mask, because a show at S11 would bring the Limit), 7+3 = 10 Success (#159). Dracula moves to the lock-up: **lock-up Tell check** (a captive's arrival doesn't count, p16), 3, no Tell (#160). T6: Dracula **rescues with Mesmerise**, Charm d12 v 8 (an own approach still frees every captive, p13). The freed Werewolf spends **Good Dog on the rescuer's roll**: 12+9 Success (#161) | The Mummy is freed. "The freed act again next Turn, from the lock-up" (p18) | 11 |
| **D**: **a roll that succeeds and fills the Limit** | Inkwold, T10, S9/10. The Werewolf is held (captured on T8 carrying the velvet, now lost). Dracula (0 charges) is at the lock-up. The Ghost and the Witch have just taken the clock and are between places. The Mummy hasn't acted | Dracula rescues **the loud way**: Brawn d8 plus Monster, and the captive Werewolf spends **Good Dog** on his roll (p18, captives may spend at the lock-up). 5+8 = 13 Success, Monster shows (covered) (#162) | Loud: +1, **S10 = Limit**. "A roll's result comes first … captives it frees join the flight" (p16), so the Werewolf **joins the flight**. The Mummy hasn't acted and **doesn't act** (p14) | 10 |
| **E**: final flight, abilities as **raises**, carrying a **Huge** piece, **Fetch** | Continues from D. Five runners; the Ghost and the Witch carry the clock (Nimble one size smaller). Mob 11, escape at 5, **Lead 3** (Fetch, p9) | r1 dead end (#163–168): Werewolf, **Good Dog as a raise**, Brawn d12: Success. Mummy Wits d12: Success. Witch Wits d12: Trouble. Dracula Brawn d8 (Garlic −1, plus the **Mummy's Royal Bearing as a raise**) 7+7 **Critical**. Ghost Wits d6 (Cold Iron −1, Chill +1): Trouble | Four Successes to two Troubles: +2, **Lead 5, escaped in round 1**. All home, including the clock. In this DRILL world: velvet missing, so a Win, plus the piece: Grand Year | — |
| **E2**: a thin party at **dawn** | Gallowsmere (Hard) dawn. Dracula (spoons, essential) and the Ghost are held. The Witch, the Mummy and the Werewolf flee, the Werewolf carrying the armour. Lead 2, escape at 6 | r1 alleys (#169–172): Sly d10 3+3 T; Ancient Lore Wits d12 3+4 T; Nimble d10 (armour) 5+1 T | Three Troubles: −2, **Lead 0: FORKED in round 1.** "A Forked year stays Forked" (p20), so the two captives don't matter | — |
| **E3**: **overdraws in the flight** | Gallowsmere: the Limit at T9, all five flee. Charges: Dracula 1, Ghost 2, the rest 0. The Werewolf carries the armour. Lead 2, escape at 6 | **r1 square** (#173–178): Dracula, **Bat as a raise**, Charm d12: S. Ghost, Chill, Sly d10: T. Werewolf, Sly d8 via the **Ghost's Through the Wall as a raise**: Cost. Witch Sly d10: S. **Mummy overdraws Ancient Lore** (Weakness from her next roll): T. Level, Lead 2. **r2 rooftops** (#179–184): **the Witch rolls first**, 2+9 S, **then overdraws Hedge Spell as a raise on Dracula's later roll** (her next own roll is round 3, when Rowan arrives anyway), Nimble d10: 10+3 S. **Werewolf overdraws Good Dog as a raise** in round 2, free (Hounds arrive in round 3 anyway), d12: S. Ghost Chill: T. Mummy Wits d10 (her Weakness in play): S. Four to one: +2, Lead 4. **r3 square** (#185–190), every Weakness in play: four Successes, one Cost: +2, **Lead 6** | Escaped in round 3. Dracula and the Ghost couldn't overdraw (Always, p19). All home | — |
| **W**: Trouble at **the way out**; a high-Suspicion chase; a way-out success that fills the Limit | Gallowsmere, T8, S9, everyone at the way out. The Ghost (carrying the lock, essential; 2 charges) rolls the way out: **Trouble** (stipulated), +1, S10, caught. Mob 8 + 5 = 13, **capped at 12**. Nobody may roll the way out again this Turn (p15) | **15 rounds** (#191–220): Chill in r1 and r2, then no charges. An overdraw was refused because the rise would reach the Limit. Leads 2, 3, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 3, then r15 Sly d8 8+8 **Critical**: Lead 5 | Escaped. Rise +2, S12. Back at the way out, Turn used. **T9:** the Werewolf rolls the way out with the Monster: 8+10 Success, shows (#221). +2 goes past the Limit, but "the roll that reaches the Limit gets the party out" (p16), so **out, no flight** | 12, then 14 (stops) |

---

## 5. Analysis: Monte Carlo, not play

These runs are analysis, not play. Each case is 200,000 runs: the best trait on each ground, the Monster unless stated, and no abilities unless stated.

### Lone local chase in v0.2

The mob is fixed at the start and the chase rises once.

| Mob (Suspicion at start) | Mask: escape / mean rise | Monster: escape / mean rise | 6+ rounds | 10+ rounds | 15+ rounds |
|---|---|---|---|---|---|
| 10 (S4) | 13–22% / +0.9 | **52–62% / +1.75**; +2 in 80% | 18–24% | 5–7% | ~1.4% |
| 12 (S8 or more: the cap) | 2–3% / +1.0 | **17–26% / +1.7** | 18–21% | 5–7% | ~1.3% |

- With 3 raises, each spent at Lead 1 (S4): Witch 67%, Dracula 66%. A Ghost at S10 escapes 29%.
- Night Runner (Lead 2): **82%**. Fear the Curse (mob −1): **72%**.
- v0.1, at S4 and Hard: Mask 12–19%, Monster 28–39%, mean +4.7 Suspicion, 41–46% of chases adding 5 or more.
- **v0.2's rise can never be more than +2 per chase, plus +2 per overdraw.**

### Shared local chase (two runners), Monster

- Werewolf and Mummy at mob 11: **49%** escape, against 37–40% for either alone.
- Witch and Werewolf at mob 10: 75%.
- But **21% are cornered in round 1** (−2 from Lead 1) at mob 11.

### Final flight

Forked rates, with no charges and then with two raises per runner plus the free round-2 overdraw. "In round 1" means forked in the first round.

| Flight | 5 runners | 3 Soon runners | 2 Always runners |
|---|---|---|---|
| Hard (Lead 2, escape 6) | **31% / 19%**; in round 1 11% | 37% / 27% | 41% / 32% |
| Standard (Lead 2, escape 5) | 28% / 16% | 33% / 23% | 38% / 29% |
| Easy | 8% / 4% | 11% / 7% | 18% / 12% |

- Standard with Fetch (Lead 3): **13% forked, never in round 1.**
- Hard with the armour carried: 34%.

---

## 6. CHECKLIST: v0.1 playtest issues

Statuses: **fixed**; **still a problem**; **partly** (part fixed, part not); **unchanged** (the text didn't change, but the issue wasn't stressed); **fixed in text** (the new wording fixes it, but play never tested it).

| # | v0.1 issue | Status | Where exercised / note |
|---|---|---|---|
| 1 | Local chase Suspicion spiral | **Fixed** | DRILLs A1 (+0), A2 (+2), B (+4 including an overdraw), W (+2). The mob is fixed at the start (p17) and there's one rise at the end, so it can't spiral. Long chases and the mob-12 cap remain (N8, N9) |
| 2 | Mid-Turn sequencing when the hunt starts | **Fixed** | p14 "Finish one Entity's action, chase and all … anyone who hasn't acted yet doesn't". Applied in DRILL D (the Mummy lost her action) |
| 3 | No way to surrender | **Fixed** | p18 "Giving up". DRILL B (shared), B2 (solo, near the Limit). Timing and Perk questions: N3, N4 |
| 4 | Captured loot is gone for the night | **Unchanged (still minor)** | DRILL B (the paper lost), DRILL D (the velvet lost). An essential carried by the runner still ends any chance of a Win |
| 5 | Tell-check timing v. late arrivals | **Fixed** | p16 "Ask first who else is coming". Used to plan both way-out arrivals |
| 6 | Splitting is taxed by Tells | **Partly** | p14's wording ("no extra Tells, only earlier ones") is accurate. Turn 1 still cost +3 of 13 (Hard) and +2 of 10 (Standard) |
| 7 | Duty clash order | **Fixed** | p7 "the player who chose their Entity later". Ghost v Dracula in both raids |
| 8 | Dead Duties; random pick | **Partly** | p6 and p7 now roll on the table and say "pick one that is where you can". But the reroll can still land on a dead Duty, and a three-kind list leaves two of five players dead (N7) |
| 9 | Re-picking between campaign raids | **Fixed** | p6 and p21. Re-picked for Inkwold (the Werewolf took Fetch) |
| 10 | Charges dead in the flight | **Fixed** | p7, p13, p18 "any ability may be spent as a raise". DRILL E and E3: Good Dog, Royal Bearing, Bat and Through the Wall all used as raises. The same deadness persists in **local** chases (N10) |
| 11 | Overdraw in the flight nearly free for Soon Entities | **Still a problem** | DRILL E3 r2: the Werewolf's overdraw was free. The Witch rolled first and then overdrew onto a later roller, also free. Round 1 costs only one round |
| 12 | Overdraws absorbed by "one roll, one rise" | **Fixed** | p16 "an overdraw … always adds its +2 on top". DRILL B r5: +2 Monster plus +2 overdraw = +4. Multiple overdraws: N5 |
| 13 | Pending step-down into a chase; Lose a Turn at dawn | **Fixed** | p12 "whatever that roll is, a chase's included" (the Werewolf's pending step-down used up at the Inkwold way out). "If the hunt starts first, it lapses" is fixed in text but wasn't exercised |
| 14 | Who holds an item after several get past | **Fixed in text** | p14 "they choose who holds it". Not exercised |
| 15 | Picking a random arrival for a Tell | **Fixed (polish)** | p16 "d6, rerolling unused numbers". Used twice; one pick among three took **four d6** (#025). Using the book's own d3 (p5) for three would be faster |
| 16 | Re-rolling the way out in the same Turn | **Fixed** | p15 "once a Turn, so try again next Turn". DRILL W |
| 17 | Shared chase at Lead 1 cornered by −2 in round 1 | **Still a problem** | DRILL B r1 was level (lucky). Analysis: **21% are cornered in round 1** at mob 11 |
| 18 | Lock-up 10 on every difficulty; failed rescue leads to a chase | **Unchanged** | DRILL C (slip free and rescue both succeeded); not stressed |
| 19 | Spectral, Out of Sight and Strong Back dead | **Partly** | Strong Back is no longer a default (Tireless is). Spectral and Out of Sight are unchanged, but a **free hand-off** works round Spectral's limit easily (N1) |
| 20 | Hear the furniture before picks | **Fixed** | p6. It drove the Werewolf's Tailor pick and the Fetch pick |
| 21 | Raid-length contradictions | **Fixed** | p5, p27, p34 now say "1–2 hours a raid" |
| 22 | Forked v Left Behind; "killed" | **Fixed** | p20 "a Forked year stays Forked", "nothing comes home". DRILL E2 |
| 23 | Leaving the piece to take it later | **Fixed** | p15 "then or on a later Turn". Both raids delayed the take to save ticks |
| 24 | Does an own approach pick a way in? | **Fixed** | p14 "the first time anyone rolls at one of them" and "(A Ghost's Spectral pass … doesn't pick it.)". Raid 1, step 7; Raid 2, steps 2–3 and 10 |
| 25 | Example of Play teaches the Monster every round | **Fixed** | p28 now explains "letting it out again costs nothing more". In v0.2 that is correct play (N11) |
| 26 | No scaling with party size | **Still a problem** | Five players and five Duty locations gave two Grand Years at Turn 7 (Hard S8/13; Standard S6/10), with 7 of 15 and 12 of 16 charges unspent |
| 27 | Flight milder than a local chase | **Partly** | At S4 a lone runner with the Monster is now captured ~40% (v0.1: 61–72%). From S8 (mob 12) it's ~78%, while a five-runner flight forks 28–31% |

---

## 7. NEW ISSUES (v0.2)

Severity: **blocker**, **confusing** (the table has to stop and agree a ruling) or **minor**. Fixes are suggestions only.

| # | Sev | Category | Where it arose | Exact passage (page) | Suggested fix |
|---|---|---|---|---|---|
| N1 | **confusing** (balance) | balance / exploit | Raid 1, step 15: the Brawn 12 tug-of-war passed with no roll for the bacon. Raid 2, steps 2, 3, 7: ink (essential), paper and velvet, each with no roll. A friend in the same place takes the loot each time, so Spectral is always "on" | "Spectral (default): Group obstacles … don't stop you: no roll and no action … Not while you carry loot or furniture." (p10); "can hand it to another Entity in the same place at any time, free" (p15); "Whoever gets past the last obstacle has the item in hand" (p14) | Decide if this is intended. Options: (a) a Spectral pass doesn't take the item, so someone must roll the last obstacle; (b) "not on a Turn you've carried or handed off loot"; (c) once per location. A rolled town with many group obstacles (Inkwold had 5) turns the Ghost into a skeleton key |
| N2 | minor | unclear wording | Raid 2, step 2: the Ghost moved, then passed on arrival, then had the item, all on Turn 1 | "no roll and no action, so you can still move or roll that Turn" (p10) | Say whether the pass may come **after** a move on the same Turn (I allowed it) |
| N3 | **confusing** | undefined (timing) | DRILL B r3: the parade came up after the ground roll, and the weak runner wanted to give up | "Giving up. At the start of any round, a runner may give up" (p18) v "Each round: 1. The ground. The Storyteller rolls a d6" (p17) | State "before the ground is rolled" or "after the ground, before anyone picks dice". The second is what tables will do |
| N4 | **confusing** | undefined | DRILL B r6: the partner gave up and the Mummy (Fear the Curse) was suddenly fleeing alone | "When you flee alone, the mob's Difficulty in your local chase is 1 lower." (p9) v "It stays the same for the whole chase." (p17); Night Runner "When you flee alone, your local chase starts at Lead 2" (p9) | "Alone" means alone when the chase starts; the Perks don't switch on mid-chase (or say they do) |
| N5 | minor | unclear wording | DRILL B r7 and DRILL W r3: a second overdraw in the same local chase was considered | "An overdraw in the chase adds its +2 on top." (p17) | "Each overdraw adds +2 on top." |
| N6 | **confusing** | undefined | Raid 2 planning, and the clock carried in DRILL E: what if one carrier of a Huge piece is caught (say, rolling the way out or a rescue)? | "A Huge piece's two carriers both count as carrying it, move together, and lose it if either is captured." (p15); "You can't drop or hand over what you carry until the chase ends." (p18) | Say the other carrier sets it down (or both are caught together), and how a lone runner "carries" a Huge piece in the chase |
| N7 | minor | choice friction | Setup: the Ghost's clash roll could hit the dead Gardener (2 in 6). Raid 2: three books items meant two of five players had no Duty | "rolls a d6, rolling again on any Duty already taken" (p7); "No two Entities in a party take the same one." (p6) | "…rolling again on any Duty already taken or not on the list, while a live one remains." Consider letting two Entities share a Duty when the list has 3 or more items of one kind |
| N8 | minor | process friction (table time) | DRILLs B and W each ran **15 rounds**, every one rolled by one player inside one Turn. Analysis: 18–24% of lone chases run 6 or more rounds, 5–7% 10 or more | "The whole chase, however many rounds it takes, happens inside the Turn it started." (p18) | Add a clock: e.g. "after round 6, Lead 2 or more escapes, otherwise captured", or the escape number drops by 1 from round 5 |
| N9 | minor | balance feel | DRILL W (mob 12). Analysis: from S8 a lone runner escapes 17–26% with the Monster and 2–3% with the Mask. On Standard (Limit 10), S8 is typical late in a raid | "8 plus half the Suspicion when the chase starts, rounded down, at most 12." (p17) | 8 + ⌊S/3⌋, or a cap of 11, so late chases aren't near-certain captures (capture also takes the loot, issue 4) |
| N10 | minor | balance feel | DRILL A2: Bat (roll Nimble) did nothing on Nimble grounds. DRILL B: Good Dog was worth nothing once the Monster had shown (the rise was already +2) | "In the final flight, any of them may be spent as a raise instead." (p7); "Abilities work on your own roll only." (p17) | Extend "as a raise" to your own roll in a local chase, so no charge is dead there either |
| N11 | minor | balance / teaching | Both way-out rolls and DRILL W: the Monster is never wrong at the way out (a Success or Cost gets out; "the result comes first"). Analysis: in a local chase the Monster triples escape odds for +0.9 Suspicion on average | "A Success or a Cost gets everyone out, and a Cost here costs nothing." (p15); "A roll's result comes first" (p16) | Fine if intended, but the Mask/Monster choice disappears in the two tensest moments. Tell players plainly, or make a Monster that shows at the way out cost something that outlasts the raid (e.g. in campaign play) |
| N12 | minor | flavour (rolled towns) | Inkwold: "A locked strongbox" became the tailor's way in, and "A dark, cluttered back room" the schoolhouse's. The printer's ways in were **both** group obstacles | "For the first obstacle, roll all three dice twice, once for each way in." (p23); table entries 17 and 18 (p24) | Mark which obstacles can be a way in, or reroll an inside-only result for a way in. Consider "at most one group way in" |
| N13 | minor | balance feel | DRILL E: Fetch's Lead 3 on Standard means one good round escapes (analysis: forked 13%, never in round 1, against 28% without it) | "A final flight you're in starts at Lead 3, not 2." (p9) | Probably fine as a Perk, but it is the strongest flight lever in the book. Consider escape −1 instead, or Lead 3 on Hard only |

---

## 8. What worked

- **The local-chase rewrite.** A fixed mob and one rise per chase made every chase predictable: "it's +2 at most, so keep the Monster out". Nothing spiralled. The worst real case was +4, and only because of a deliberate overdraw.
- **Sequencing rules.** "Finish one Entity's action, chase and all", "anyone who hasn't acted yet doesn't" and "a roll's result comes first" settled DRILL D and DRILL W with no debate.
- **Abilities as raises in the flight.** Every charge had a use in DRILLs E and E3. Through the Wall and Good Dog, both dead in v0.1, carried Lead swings.
- **Giving up** worked well as a valve near the Limit (B2). In a pair it worked mechanically ("carries on without it").
- **The lock-up.** Slip free, a captive spending charges on a rescuer's roll, Mesmerise as an own-approach rescue and the lock-up Tell all resolved straight from the table on p18.
- **Castle Duty edges, and picks after hearing the list and the furniture.**
  - Every player had a spotlight location in Raid 1.
  - The clash rule took seconds.
  - Hearing the furniture shaped real choices (the Werewolf's Tailor pick, the Fetch pick).
- **Furniture timing.** Taking the piece later, carried moves, arriving on the last action and then another rolling the way out the same Turn matched p27's "at least 1, usually 2" exactly (+1 in both raids).
- **Ways in.** "Picked by the first roll; Spectral doesn't pick" answered every question, the printer's unusual double-group way in included.
- **Tells and Familiar's Warning.** "Ask who else is coming" made arrival planning a real decision (both raids).
- **Choosing Costs.** "Never one that costs nothing" excluded drop-an-item four times. "A smaller die before a big roll" gave a natural pick (Raid 2, step 6).
- **The rolled-town procedure.**
  - Clear, roughly 70 dice.
  - The ceiling and the way-in reroll rule were easy to apply.
  - The town was playable at once.
- **Campaign rules.** Upgrades (Dracula with 4 charges) and re-picks were unambiguous.

## 9. How the difficulty felt now

- **Is the local chase still a spiral? No.**
  - Suspicion per chase is capped (+2, plus +2 per overdraw).
  - The four DRILL chases added +0, +2, +4 and +2.
  - Escape odds with the Monster roughly doubled against v0.1 at the same premise (about 57% at S4).
  - What's left is table time (two 15-round chases; about 1 in 4 chases runs 6 or more rounds) and **near-certain capture once the mob caps at 12 (S8 and up)**.
- **The raids were easy.**
  - Both strict raids ended in a **Grand Year on Turn 7**: Hard S8/13, Standard S6/10.
  - Neither forced a single local chase, capture or flight.
  - Part of that is luck: **0 Trouble in 13 watched rolls** (roughly a 15% event).
  - Part is structural: five players with five matching Duties, and **Spectral with free hand-offs** skipping four group obstacles (including a Brawn 12). The party never had to "run for it".
  - p25's "On Hard, expect to run for it: most Hard raids end in the final flight" did not hold in our one Hard sample. It needs more samples or a scaling rule (issue 26).
- **Were charges spent?**
  - In play, barely: 8 of 15 (Raid 1) and 4 of 16 (Raid 2) spent, so 19 charges were lost unspent.
  - Where danger appears (chases, the lock-up, the flight), every charge and overdraw now gets used.
  - So charges matter only when things go wrong, and the dice decide whether they do.
- **The final flight is now swingy but fair with a full party.**
  - Five runners with pooled raises fork about 16–19%. A thin party at dawn forks about 27–37%.
  - **8–12% of flights fork in round 1** from Lead 2 (DRILL E2 did).
  - Fetch's Lead 3 removes that round-1 risk.

---
*Files, all in `[a local folder]`:*
- *`play-scripts/rolls-v02.log`: every die, in order.*
- *`play-scripts/roll.js`: the roller.*
- *`play-scripts/tables.js`, `town-list.js`, `town-build.js`: the Chapter 8 town roller; `town-r2.json` is Inkwold as rolled.*
- *`play-scripts/sim-v02.js`, `sim-v02b.js`: the analysis.*
- *`play-scripts/pg/`: rendered PDF pages.*
