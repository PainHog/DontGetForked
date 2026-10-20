# Don't Get Forked v0.1: procedural playtest

**Tester role:** Storyteller plus five players (process only, no roleplay).
**Book:** "Don't Get Forked" v0.1, Richard Moore. Page numbers below are the printed page numbers. They match the `===== PAGE n =====` markers in `dgf.txt`.
**Dice:** every roll came from a script (`crypto.randomInt`) and was appended to `rolls.log` in this folder, 120 lines with a label on each. No result was invented.
**Session shape:**
- **Raid 1:** Gallowsmere (Hard), played strictly by the book. I picked it because it exercises the most rules: Hard numbers, all five locations watched, two Difficulty 12s, a four-obstacle location, a watched group obstacle, an unwatched group obstacle and a Brawn 12 furniture obstacle. The dice ended it at Turn 2.
- **Raid 2:** Thistlewick (Standard), the evening's second raid ("an evening often fits two", p5), played strictly, with the optional campaign rules on.
- **DRILLs A to F:** clearly labelled, with stipulated starting states and fresh real rolls. They cover what the dice didn't force: a group check, a group local chase, capture, slipping free, rescue, the lock-up Tell, a rescue-to-Limit cascade, furniture in the final flight, overdraw in the flight, a solo flight that gets forked, Spectral, and the Tell pick between several arrivals.
- **Analysis:** Monte Carlo runs, labelled as analysis and not play, using `dgf-scripts/sim.js` and `sim2.js` in the scratchpad.

---

## 1. Table setup (Ch 2, pp6–11; Entity Sheet p32)

Shopping list read out first (p6). Five players, five different Entities. Four of them (the Mummy, the Invisible Man, the Ghost and Jekyll & Hyde) don't appear in the book's worked example.

| Entity | Traits | Signature | Gift | Perk | Duty R1 / R2 | Weakness | Tell |
|---|---|---|---|---|---|---|---|
| **Frankenstein's Creature** | Brawn d12, Nimble d8, Sly d6, Charm d4, Wits d10 | Brute Force (roll Brawn) | Mountain Stride (own approach, Nimble), default | **Tireless** (carrying doesn't shrink Nimble), *chosen over default Strong Back* | Handyman (smithy, essential) / Handyman (ironmonger) | Fire (Soon) | Head and Shoulders |
| **The Mummy** | Brawn d10, Nimble d4, Sly d6, Charm d8, Wits d12 | Ancient Lore (roll Wits) | **Just a Costume** (Monster without Suspicion), *random d6=4* | **Fear the Curse**, *random d6=5* | Librarian (printer) / **Gardener** (seed merchant), *re-picked* | A Loose Thread (Soon) | Dust and Spice |
| **The Invisible Man** | Brawn d4, Nimble d8, Sly d12, Charm d6, Wits d10 | Unseen (Monster without Suspicion) | Through the Gap (own approach, Nimble), default | Out of Sight, default | Tailor (tailor) / Tailor (hatter) | Flour (Soon) | Bandages and Goggles |
| **A Ghost** | Brawn d4, Nimble d12, Sly d10, Charm d8, Wits d6 | Through the Wall (own approach, Sly; not while carrying) | Chill (raise), default | Spectral, default | Butler (silversmith, essential) / Butler (china shop, essential) | Cold Iron (**Always**) | Cold Spot |
| **Jekyll & Hyde** | J: Brawn d4, Nimble d6, Sly d8, Charm d12, Wits d10 · H: Brawn d12, Nimble d10, Sly d8, Wits d6, Charm d4 | The Draught | Doctor's Bag (raise), default | Practised Hand, default | **Cook**, *forced off default Librarian by the clash* (butcher) / Cook (baker, essential) | A Familiar Face (Soon) | The Wrong Hand |

Everyone has 3 charges per raid (p6).

**Choice friction found at setup:**
- **Duty clashes.** Default Duties clash twice among the eight: Dracula and the Ghost are both Butler, and the Mummy and Jekyll are both Librarian. With five players the clash came up immediately. The tie-break says "the player who chose later", but the book never sets a picking order. *(Issue 7)*
- **Dead Duties.** Gallowsmere has no plants and seeds, so a Gardener would get no edge. Thistlewick has no books, so the Mummy's Librarian was useless and she re-picked. *(Issues 8, 9)*
- **Dead default Perk.** All three ready-made towns have Bulky furniture, so the Creature's default Perk, Strong Back, does nothing in any of them. The player only knew to swap because the Storyteller read out the furniture, and the book doesn't say whether to. *(Issues 19, 20)*
- **Random picks.** The random-pick rule (d6: 1–2 / 3–4 / 5–6) worked smoothly for the Mummy's Gift and Perk. It doesn't fit the six-option Duty table. *(Issue 8)*

---

## 2. Raid 1: Gallowsmere (Hard), strict play

Numbers (p30, p25): Limit 15, way out 10, lock-up 10. Final flight: mob 11, Lead 2, escape at 6. Shopping list: lock and spoons (essentials), writing paper, bandages, bacon. Furniture: a suit of armour (Bulky) at the tailor.

Plan: five-way split, each Entity to its own Duty location (p14 says on Hard the party "usually should" split).

| # | Step | Rule (ch/p) | Dice | Result | Susp |
|---|---|---|---|---|---|
| 1 | T1: all five move from the way out to five locations | Ch4 p14 (no roll to enter) | — | — | 0 |
| 2 | T1 Tell checks at 5 watched locations, one arrival each | Ch5 p16 | smithy 1, silversmith 6, printer 4, tailor 4, butcher 3 | Ghost, Mummy and Invisible Man Tells go off | **3** |
| 3 | T2 Ghost: silversmith, shuttered window (Nimble, 8, watched) | Ch3 p12 | Nimble d12 6 + Mask 1 = 7 | Cost. Storyteller picks "next roll's trait die one size smaller". Drop an item would cost nothing (p12) | 3 |
| 4 | T2 Creature: smithy, high garden wall (Nimble, 8, watched); Duty raise d8 to d10 | Ch2 p7, Ch3 p12 | d10 2 + Mask 3 = 5 | **Trouble at a watched obstacle: caught** | 4 |
| 5 | **Local chase #1** (Creature): Lead 1, escape at 4, mob 8 + ⌊4/2⌋ = 10 | Ch6 p17 | — | — | 4 |
| 5.1 | r1 ground 4 (Nimble/Wits): Wits d10 + Monster | Ch6 p17, p19 | 9 + 1 = 10 | Success. Lead 2 | 4 |
| 5.2 | r2 ground 4: Wits d10 + Monster | " | 1 + 4 = 5 | Trouble, and the Monster shows (one rise: +2). Lead 1. Mob 11 | 6 |
| 5.3 | r3 ground 6 (Brawn/Wits). Fire (Soon) arrives: Brawn d12 to d10 | Ch6 p17 Weakness | 7 + 9 = 16 | Success, Monster shows. Lead 2. Mob 12 | 8 |
| 5.4 | r4 ground 2 (Nimble/Sly): **Brute Force** (charges 3 to 2), Brawn d10 | Ch3 p12 "roll another trait" | 7 + 1 = 8 | Trouble. Lead 1 | 9 |
| 5.5 | r5 ground 3: Brawn d10 + Monster | " | 9 + 2 = 11 | Cost, no change. Lead 1 | 9 |
| 5.6 | r6 ground 4: Brute Force (2 to 1) | " | 10 + 7 = 17 | Success. Lead 2 | 9 |
| 5.7 | r7 ground 2: Brute Force (1 to 0) | " | 1 + 6 = 7 | Trouble, Monster shows. Lead 1 | 11 |
| 5.8 | r8 ground 3: Brawn d10 + Monster | " | 5 + 7 = 12 | Success, Monster shows. Lead 2 | **13** |
| 5.9 | r9 ground 1 (Sly/Charm, both d4 after Fire). A Monster or an overdraw would hit the Limit, and **no rule allows surrender**, so he takes Sly d4 + Mask, which can't succeed | Ch6 p17 | 3 + 5 = 8 | Trouble. Lead 1 | 14 |
| 5.10 | r10 ground 5 (Charm/Sly, d4s again). Any Trouble corners him and hits the Limit. Best odds of staying uncaptured: deliberately **overdraw** Brute Force (+2, which hits the Limit) on Brawn d10 + Monster | Ch3 p12 overdraw; Ch5 p16 "even if… on purpose" | 7 + 2 = 9 | Trouble. Lead 0, **cornered**. The Limit comes the same round, so he is **captured first and stays behind** | **15 = LIMIT** |
| 6 | **Hunt is on, mid-Turn 2.** The Mummy, the Invisible Man and Jekyll had not yet acted, so they lose their Turn 2 actions *(see note)* | Ch5 p16, Ch6 p18 | (their pre-rolled dice were voided: Mummy 4+4, IM 1+3, Jekyll 9+3) | — | 15 (stopped) |
| 7 | **Final flight** (Ghost, Mummy, Invisible Man, Jekyll): Lead 2, escape at 6, mob 11, Monster only, abilities on anyone's roll | Ch6 p18 | — | — | — |
| 7.1 | r1 ground 3 (Brawn/Nimble). Ghost: Nimble d12, minus Always Weakness, minus her *pending Cost from step 3*, plus Chill = d10. Mummy: Ancient Lore, Wits d12. Invisible Man: Mummy's Ancient Lore plus Jekyll's Doctor's Bag, Wits d10 to d12. Jekyll: Draught to Hyde, Brawn d12 | Ch3 p13 netting; Ch6 p18 | Ghost 6+10 = 16 S · Mummy 3+6 = 9 C · IM 11+8 = 19 S · Hyde 2+6 = 8 T | 2 Successes v 1 Trouble: Lead +1, to 3 | — |
| 7.2 | r2 ground 3. Ghost Chill (Nimble d12). Mummy Ancient Lore (charges to 0). IM Nimble d8 to d10 (Doctor's Bag, Jekyll to 0). Hyde Brawn d12 | majority rule p18 | 8+8 = 16 **Critical** · 4+6 = 10 C · 6+4 = 10 C · 9+1 = 10 C | 2 v 0: Lead +2, to 5 | — |
| 7.3 | r3 ground 1 (Sly/Charm). Soon Weaknesses arrive. Ghost Chill (to 0), Sly d10. Mummy Charm d6, no charges, and can't overdraw because her Weakness is in play. IM Sly d10. Hyde to Jekyll free (Practised Hand), Charm d10 | p18 | 1+9 = 10 C · 5+6 = 11 S · 3+8 = 11 S · 7+5 = 12 S | 3 v 0: Lead +2, to 7, **escape** | — |
| 8 | How the Year Went: 0 of 5 home, so **Bust**. Creature left behind: one step down, but "never below Bust" | Ch7 p20 | — | Epilogue: "A long, thin year…" plus five missing-kind lines (food, books, silver, tools, cloth) | — |

**Charges:** Creature 3 plus 1 overdraw, all in the chase. Ghost 3, Mummy 3 and Jekyll 3, all in the flight. **Invisible Man 0 of 3:** in the final flight neither his signature nor his Gift does anything. *(Issue 10)*

**Process note on step 6:** I rolled all five Turn 2 actions in one script call, which is what a real table does ("everyone roll!"). The book's sequencing (p14 "act one at a time … each result counts at once", plus p18 "the whole chase … happens inside the Turn it started") means the Creature's chase resolves before anyone after him acts. Once that chase hit the Limit, the later three actions never happened, so I voided their already-rolled dice. The book doesn't say this outright. *(Issue 2)*

---

## 3. Raid 2: Thistlewick (Standard), strict play, campaign rules on

Numbers (p29, p25): Limit 11, way out 8, lock-up 10. Final flight: mob 11, Lead 2, escape at 5.

The Entities carry over per the campaign rule (p21). Duties were re-picked for the new list; the book doesn't say whether that's allowed *(Issue 9)*. Every player now has a Duty location. Resolved strictly one Entity at a time.

| # | Step | Rule | Dice | Result | Susp |
|---|---|---|---|---|---|
| 1 | T1: five-way split. Tell checks at baker, china shop, hatter, ironmonger, seed merchant (all watched) | p16 | 6, 4, 5, 2, 2 | Jekyll, Ghost and Invisible Man Tells go off | **3** |
| 2 | T2 Ghost: china shop front door (Sly, 8, unwatched); Butler raise Sly d10 to d12 | p7, p12 | 9 + 5 = 14 | Success | 3 |
| 3 | T2 Invisible Man: hatter nosy neighbour (Sly, 8, watched). Out of Sight would have saved him from capture | p10 | 10 + 5 = 15 | Success. **Top hat** in hand (single-obstacle location) | 3 |
| 4 | T2 Creature: ironmonger cart (Brawn, 6) | p12 | 6 + 2 = 8 | Success | 3 |
| 5 | T2 Jekyll: baker shuttered window (Nimble d6 to d8 Cook, 8, unwatched); avoided the watched group shop floor | p14 | 2 + 6 = 8 | Success | 3 |
| 6 | T2 Mummy: seed merchant muddy yard (Sly d6 to d8 Gardener, 6) | p12 | 6 + 5 = 11 | Success | 3 |
| 7 | T3 Ghost: back room (Wits d6 to d8, 8, unwatched) | p12 | 6 + 3 = 9 | Success. **Tea service** (essential) | 3 |
| 8 | T3 Creature: strongbox (Wits d10 to d12, 8, watched) | p12 | 9 + 2 = 11 | Success. **Coil of rope** | 3 |
| 9 | T3 Jekyll: shopkeeper (Charm d12, 8, watched) | p12 | 10 + 2 = 12 | Success. **Wedding cake** (essential) | 3 |
| 10 | T3 Mummy: night watchman (Wits d12, 10, watched), **Just a Costume** (charges 3 to 2), Monster | p8, p12 | 7 + 6 = 13 | Success. **Turnip seed**. All 5 items in hand after 3 Turns | 3 |
| 11 | T3 Invisible Man moves to the ironmonger | p14 | — | — | 3 |
| 12 | T4 Jekyll and Ghost move to the way out. Tell check at the way out ("once anyone comes back"). The Invisible Man decided *after* the check to move there too *(Issue 5)* | p16 | 1 | No Tell | 3 |
| 13 | T4 Mummy moves to the ironmonger. Creature: guard dog *for the piece* (Charm 10, watched). Mummy's **Ancient Lore** (to 1) makes it Wits; Duty raises it to d12. IM's **Unseen** (to 2) lets him take the Monster safely | p7 (Duty applies to the furniture obstacle), p13 (helpers keep their action) | 5 + 6 = 11 | Success. The Monster shows but adds nothing. **Gilt mirror** taken (free) | 3 |
| 14 | End of T4: furniture tick | p15 | — | +1 | 4 |
| 15 | T5: Creature's carried move, first half (between places). Mummy moves to the way out. End-of-Turn tick | p15 | — | +1 | 5 |
| 16 | T6: Creature arrives. Everyone uncaptured is at the way out. Invisible Man rolls the way out (Sly, 8, watched) with **Unseen** (to 1) | p15 | 12 + 6 = 18 | Success. Everyone out. No tick: the mirror has left town | **5** |
| 17 | How the Year Went: 5 of 5, plus the piece | Ch7 p20 | — | **Grand Year**. "A year of plenty…" No missing-kind lines | — |
| 18 | Campaign: the gilt mirror becomes **castle upgrade 1 of 3**. Next raid, one Entity starts with 4 charges | Ch7 p21 | — | — | — |

**Charges spent:** 4 of 15 (Mummy 2, Invisible Man 2). **11 were lost unspent.**

---

## 4. DRILLs: stipulated states, fresh real rolls

| # | DRILL step | Rule | Dice | Result | Susp |
|---|---|---|---|---|---|
| A1 | *Premise: Gallowsmere, T4, S6.* At the tailor, the Invisible Man, Jekyll and the Creature roll the **crowded shop floor (group, watched, Sly 10)** in one Turn, so it becomes **one group check**. IM: Sly d12 + Mask. Jekyll: Sly d8 + Monster. Creature: Sly d6 + Monster, with IM's Unseen | Ch4 p15 group check | IM 8+4 = 12 S · Jekyll 7+10 = 17 S, Monster shows · Creature 4+5 = 9 C (Monster shown but covered) | All three get past. One rise for the whole check (+2). **Jekyll's Monster showed, so Hyde takes over.** The Creature's Cost can't be "Suspicion +1" (the check already rose), so the Storyteller picks "next die smaller". *Who holds the bandages? (Issue 14)* | 8 |
| A1b | Hyde: **heavy cellar trapdoor for the piece (Brawn 12, unwatched)**, with IM's Unseen | p15 | 7 + 5 = 12 | Success. Hyde takes the **suit of armour** | 8 |
| A2 | *Premise: S9. The Mummy (carrying the writing paper) and the Creature (carrying the lock, an essential) are both caught in one group check.* Shared Lead 1, escape at 4, mob 8 + 4 = 12. Ground 3. Mummy: Ancient Lore plus Just a Costume (two abilities, one roll), Wits d12. Creature: Brawn d12. Both with the Monster | Ch6 p18 shared Lead, majority rule | Mummy 4+2 = 6 T · Creature 7+1 = 8 T | 0 v 2: Lead −2, **both captured in round 1**. The town takes back the **essential lock**, so no Win is possible | 10 |
| A3 | Next Turn: slip-free attempts (once per Turn, Success only, Difficulty 10). Creature: Brawn d12 (loud) + Mask. Mummy: Ancient Lore (to 0), Wits d12 + Mask | Ch6 p18 table | Creature 1+2 = 3 T · Mummy 2+5 = 7 T | Each +1, no chase | 12 |
| A3b | Invisible Man moves to the lock-up. **Lock-up Tell check** (a captive's arrival doesn't count) | p16 | 6 | IM's Tell | 13 |
| A3c | Next Turn: IM **rescue** (Sly d12) with Unseen (to 0) | p18 | 5 + 1 = 6 | Trouble. He carries the bandages, so **Out of Sight doesn't protect him: caught** | 14 |
| A3d | IM local chase: Lead 1, mob 12. Ground 5. Sly d12 + Mask (a Monster showing would hit the Limit) | p17 | 4 + 4 = 8 | Trouble. **Captured**, and the Limit is hit the same round, so he is captured first. One failed rescue turned into three captives and the hunt | **15** |
| B | *Final flight: Ghost (spoons) and Hyde (carrying the armour).* Hard, Lead 2, escape at 6. r1 ground 6: Ghost Chill, Wits d6 (Always then raise). Hyde Brawn d12 | p18 | Ghost 5+7 = 12 S · Hyde 3+5 = 8 T | Level. Lead 2 | — |
| B r2 | Ground 2: Ghost Chill, Nimble d12. Hyde's Nimble would be d8 while carrying, so he takes Sly d8 raised to d10 with Doctor's Bag | p15 carrying | 4+9 = 13 S · 8+8 = 16 **Crit** | 3 v 0: Lead 4 | — |
| B r3 | Ground 3: Ghost Chill (to 0) Nimble d12. Hyde: Brawn d12, Weakness then Doctor's Bag | p13 net | 10+1 = 11 S · 10+4 = 14 S | Lead 6, **escape with the armour** | — |
| C | *Premise: Gallowsmere T12, S13, all charges spent, IM in the lock-up, Creature carrying the armour just arrived.* Ghost rolls the way out (Nimble d12 + Mask v 10) | p15 | 5 + 5 = 10 | Success. A **Critical** refunds a charge, which is now useless. Out; IM left behind. *(Way-out Trouble never came up in play; see Issue 16)* | 13 |
| D | *Premise: dawn on Gallowsmere, Mummy, Jekyll and Creature (carrying the armour, Tireless), 0 charges.* r1 ground 2: **all three overdraw** (Ancient Lore Wits d12; Draught to Hyde, Nimble d10; Brute Force Brawn d12), so each Weakness starts next roll | p18 overdraw in flight | 4+1 = 5 T · 6+5 = 11 S · 1+1 = 2 T | 1 v 2: Lead 1 | — |
| D r2–r5 | r2 ground 2 (Weaknesses in play): 3+7 C · 3+8 S · 4+4 T, so Lead 1. r3 ground 5 (Hyde to Jekyll free, Charm d10): 6+6 **Crit** · 8+4 S · 3+8 S, so Lead 3. r4 ground 5: 6+8 S · 7+6 S · 1+4 T, so Lead 4. r5 ground 4: 9+2 S · 7+10 S (Monster shows, Hyde again) · 1+8 C, so Lead 6 | p18 | (as shown) | **Escape** | — |
| E | *Premise: only the Ghost is uncaptured at dawn on Gallowsmere, with 0 charges; she can't overdraw (Always).* | p18 | r1 Sly d8 1+1 = 2 T (Lead 1) · r2 Nimble d10 3+7 = 10 C · r3 Sly d8 5+4 = 9 C · r4 ground 6, Wits d4 1+3 = 4 T | **Lead 0: FORKED.** Result is Forked. The ladder doesn't say what the captives left behind do to a Forked result *(Issue 22)* | — |
| F | *Premise: Gallowsmere, S6.* Ghost and IM arrive at the printer together. Tell check, then pick one of the two "at random (number them and roll a die)": I used d6 odd/even | p16 | 6, then 5 (odd) | Ghost's Tell *(Issue 15)* | 7 |
| F b | IM: rooftops (group, Nimble 10, unwatched). Ghost: **Spectral** skips them, no roll and no action, then rolls the back room (Wits d6 + Mask v 8) in the same Turn | p10, p14 | IM 4+1 = 5 T · Ghost 6+1 = 7 C | IM stuck outside, no chase. Ghost has the paper. Storyteller picks **Lose a Turn** (drop an item would only hit the loot this roll won). Spectral and Through the Wall are now off for her (she's carrying) | 8 |
| F2 | Party at the Gallowsmere way out. IM Sly d12 + Mask v 10 | p15 | 11 + 3 = 14 | Out | 8 |

### Analysis: Monte Carlo, not play (no abilities or Perks; best trait on each ground)

- **Lone runner in a local chase,** starting at S4 on Hard:
  - With the Mask, they escape only **12–19%** of the time (Creature, Ghost, Witch, Werewolf). Mean Suspicion added is about 1.5.
  - With the Monster, escape rises to **28–39%**, but they're still captured 50–60% of the time. Mean Suspicion added is about 4.7, and **41–46% of chases add 5 or more Suspicion**. About 10% hit the Hard Limit outright.
  - At Standard S8, escape falls to **2–8%**.
  - About 17–26% of chases run 6 or more rounds.
- **Final flight with no abilities:**
  - Forked about 27–30% with four or five runners on Standard or Hard.
  - About 33–34% with three runners on Standard or Hard.
  - About 12% with three runners on Easy.
- **Rescue or slip-free against 10:** d12 + Mask 54%, d12 + Monster 70%, d8 + Mask 31%.

---

## 5. ISSUES

Severity: **blocker** = can derail or end a session, or the table can't proceed without a ruling. **confusing** = the table has to stop and agree a ruling. **minor** = polish or feel.

| # | Sev | Category | Where it arose | Passage (page) | Suggested fix |
|---|---|---|---|---|---|
| 1 | **blocker** | balance feel | Raid 1, step 5: one local chase took Suspicion from 4 to 15 (11 points, 10 rounds, all inside Turn 2) and ended the raid at Turn 2 of 12 | "The mob's Difficulty: 8 plus half the Suspicion, rounded down, at most 12. Work it out again at the start of every round, because the chase can raise Suspicion." and "In a local chase it still rises as usual (Trouble +1, the Monster showing +2, an overdraw +2)" (p17); "The whole chase, however many rounds it takes, happens inside the Turn it started." (p18) | It's a feedback loop: every Monster show feeds the mob's Difficulty, and Trouble both lowers the Lead and raises Suspicion. Options: (a) cap a local chase at 3 rounds, then escape if the Lead is 2 or more, otherwise captured; (b) fix the mob Difficulty when the chase starts; (c) chase Trouble moves the Lead only, with no Suspicion; (d) escape at 3. Also tell players plainly that the Monster in a local chase usually backfires. |
| 2 | **confusing** | undefined | Raid 1, step 6. The natural table habit ("everyone roll") clashes with strict sequencing | "Entities act one at a time, in any order, and each result counts at once." (p14); "If the Limit comes during a local chase, that chase ends at once … and its runners join the flight." (p16) | State it outright: "Resolve one Entity's action fully, chase included, before the next acts. If the hunt begins mid-Turn, anyone who hasn't acted loses that action." Add a line to At the Table (p33). |
| 3 | **confusing** | undefined / process friction | Raid 1, r9–r10: the runner wanted to stop the bleeding (be captured) but had no option. Overdrawing on purpose to hit the Limit was his best way to avoid capture, which torpedoes the whole party | "Reach the escape number and you're clear. Reach 0 and you're cornered" (p17); "even if a runner's own roll brought it there on purpose" (p16) | Add "At the start of any round a runner may give up: captured, no roll." Consider forbidding overdraw in a local chase when it would reach the Limit, or say the book intends that move. |
| 4 | minor (amplifies 1) | balance feel | DRILL A2: the captured carrier lost the essential, so a Win became impossible | "the town takes back what you were carrying … It's gone for the night, and nobody can take it again." (p18) | Put captured loot in the lock-up, recoverable by a rescue, or return it to its location's last obstacle so it can be stolen again. |
| 5 | minor | process friction | Raid 2, step 12: the Tell check was rolled, then another player decided to move there in the same Turn | "The check is made once everyone moving there this Turn has arrived." (p16) | Make the Tell check at the **end of the Turn** for every place newly reached, or at each arrival. |
| 6 | minor | balance feel | Both raids: a five-way split on Turn 1 cost +3 Suspicion before any roll (expected +2.5). That's 27% of the Standard Limit | "On Standard and Hard it usually should [split]" (p14) v "roll a d6, and on 4–6 a Tell goes off. Each place is checked once a raid" (p16) | Tells on 5–6, or a single Tell check per Turn for the whole party. Otherwise the book's advice to split is taxed hard. |
| 7 | **confusing** | contradiction / undefined | Setup: Mummy and Jekyll are both Librarian (Dracula and the Ghost are both Butler) | "Every pick has a marked default, so a new player can skip the choices." (p6) v "if two defaults clash in a party, the player who chose later picks another" (p7) | Define the order (e.g. "in seating order after the list is read"), or give the Duty to whoever's default kind is on the list. Drop "can skip the choices" for Duty. |
| 8 | minor | unclear wording / balance | Setup: a Duty whose kind isn't on the list is dead (Gardener in Gallowsmere, Librarian in Thistlewick). The random-pick rule doesn't fit six Duties | "To pick at random, roll a d6: 1–2 the first option, 3–4 the second, 5–6 the third." (p6) | Say "pick a Duty whose kind is on the list where possible; for Duty, roll the d6 straight on the table". |
| 9 | **confusing** | unclear wording | Raid 2 setup: can Duty, Gift or Perk be re-picked between campaign raids? | "the Entities themselves never change" (p21) v "The Storyteller reads out the shopping list before anyone picks" (p6) | Say "each raid, re-pick Castle Duty (it depends on the list); Gift and Perk stay" (or "may change"). |
| 10 | minor | balance feel | Raid 1 flight: the Invisible Man held 3 charges and nothing could use them. Every "Monster without Suspicion" ability (Good Dog, Unseen, Just a Costume, Mist, Fade, Black Cat, Hovel Watcher, Pillar of Society) and every own approach is dead in the final flight | "Suspicion stops. Nothing raises it any more." (p18); "Never in a chase." (p13) | In the final flight, let any ability be spent as a raise, or let a Monster-without-Suspicion ability turn your Cost into a Success. |
| 11 | minor | balance feel | DRILL D: all three overdrew in round 1. For a Soon Entity, overdrawing in round 2 costs nothing at all (the Weakness arrives in round 3 anyway) | "From your own next roll to the end of the flight, your trait die is one size smaller … You can overdraw only once per flight" (p18) | Make an overdraw in the flight a **second** step down that stacks with the Weakness, or allow it only in round 1. |
| 12 | minor | balance (exploit) | Rules reading, plus Raid 1 r10 (the overdraw's +2 swallowed Trouble's +1): several overdraws on one roll, or an overdraw on a roll where the Monster shows anyway, cost +2 in total | "One roll raises Suspicion only once, by its biggest trigger (overdraw included)." (p16) with "Several abilities may go on one roll" (p13) | Let each overdraw add +2 on its own, outside "one roll, one rise". |
| 13 | **confusing** | undefined | Raid 1, 7.1: the Ghost's pending Cost ("next roll's trait die one size smaller") came due on her first final-flight roll | "Your next roll's trait die is one size smaller." (p12) v "In a chase … A Cost costs nothing there" (p12) | Say whether a pending step-down carries into a chase roll (I applied it), and whether "Lose a Turn" carries over at dawn. |
| 14 | minor | undefined | DRILL A1: three Entities passed the loot obstacle in one group check | "Whoever gets past the last obstacle has the item in hand" (p14); "all roll at once, and each gets past on its own result" (p15) | Add "If several get past at once, the party chooses who holds it." |
| 15 | minor | unclear wording | DRILL F: picking between two arrivals | "pick one of the arrivals at random (number them and roll a die)" (p16) | Say "roll a d6, rerolling numbers higher than the number of arrivals". |
| 16 | minor | unclear wording | Rules reading; the dice didn't force it | "On Trouble, Suspicion rises and the roller is caught; try again next Turn." (p15) | Clarify whether another Entity may roll the way out in the same Turn, and whether the others' actions are used up. |
| 17 | minor | balance feel | DRILL A2: two runners from one group check, shared Lead 1, both rolled Trouble, so −2 and both captured in round 1 | "flee together on one shared Lead, moved by the majority rule" (p18); "Lead: starts at 1." (p17) | Start a shared local chase at Lead 2, or cap the swing at −1 when Lead is 1. |
| 18 | minor | balance feel | DRILL A3: two failed slip-frees, a lock-up Tell and a failed rescue led to a third capture and the Limit. The lock-up is 10 even on Easy | "The lock-up: Difficulty 10 10 10" (p25); rescue "Trouble: Suspicion +1, and the rescuer is caught: a local chase" (p18) | Scale the lock-up (8 / 10 / 10), or make a failed rescue a Cost-style "you retreat" (Suspicion only, no chase). |
| 19 | minor | balance feel / choice friction | Raid 2 and DRILL F: once the default Butler (Ghost) holds the silver, her signature and Perk are both off. The Invisible Man's Out of Sight is dead from his first item. Strong Back is dead in all three ready-made towns (all Bulky furniture) | Out of Sight: "unless you, or anyone in the same place, carries loot or furniture" (p10); Spectral and Through the Wall: "not while you carry loot or furniture" (p10); Strong Back "You carry a Huge piece alone." (p8) | Let the Ghost's Spectral work while carrying loot (but not furniture). Narrow Out of Sight to "you carry". Put one Huge piece in a ready-made town, or swap the Creature's default Perk. |
| 20 | minor | unclear wording | Setup: should players hear the furniture before picking Perks? | "The Storyteller reads out the shopping list before anyone picks." (p6) | Change it to "the shopping list and the furniture". |
| 21 | minor | contradiction | Front matter v back cover | "A raid runs 1–2 hours, so an evening often fits two." (p5); "A raid should fit in an hour or two" (p27) v "2–3 hours" (p34) | Make them consistent: 2–3 hours per session, 1–2 per raid. |
| 22 | minor | unclear wording / contradiction | DRILL E: a Forked result with captives in the lock-up. Forked isn't on the step-down ladder. "Whatever came home" is empty, since the party always leaves together. "Killed" sits oddly with "back at the castle" | "Forked … the raid is lost, whatever came home" and "One step turns a Grand Year into a Win … never drops below Bust" (p20); "The monsters in the flight are killed" (p18) v "An Entity forked … is back at the castle" (p21) | Say "Left Behind doesn't apply to Forked". Drop "whatever came home". Soften "killed" to fit the campaign rules. |
| 23 | minor | unclear wording | Raid 2 furniture: the "at least 1" tick only happens if you beat the piece's obstacle, leave the piece, and take it on a later Turn before moving. The book never says you may leave it | "even a piece carried straight to the way out adds at least 1, and usually 2" (p27) v "Taking the piece, once you're past its obstacle, is free." (p15) | Add "you may leave the piece and take it (free) at the start of a later action". |
| 24 | minor | undefined | Rules reading: a Ghost (Through the Wall) or Dracula (Mesmerise) uses an own approach on a location's way in. Which way in is now locked for the party? | "The party picks one the first time anyone tries the location" (p14); "Any obstacle will do, not only a location's first one (its way in)." (p13) | Say "An own approach at a way in doesn't choose it; the next ordinary roll does." |
| 25 | minor | process friction (teaching) | Example of Play: the Witch takes the Monster every chase round, which adds +4 Suspicion | p30–31 example | Show one round with the Mask and explain the trade-off. New groups copy the example (as Raid 1's Creature did). |
| 26 | minor | balance feel | Raid 2: Standard with five players, each with a Duty location matching one list item, gave a Grand Year by Turn 6 at S5 of 11, with 11 of 15 charges unspent. Raid 1 (Hard) was a Bust at Turn 2 | Ch8 p25 numbers do not scale with party size | Scale Turns or the Limit with party size (e.g. 3 players: 12 Turns; 5 players: 10 Turns or Limit −2). |
| 27 | minor | balance feel | Raid 1, B, D: the final flight with 3–4 runners and pooled abilities escaped in 3–5 rounds every time. A lone local-chase runner is far likelier to be captured (analysis: 50–88%, depending on Mask or Monster) | Ch6 p17–18 | The "big" danger is milder than the "small" one, and that inversion reads oddly. Consider Lead 2 for local chases too, or a higher flight mob. |

---

## 6. What worked well

- **The core roll** (trait die plus Mask d6 or Monster d10, then Success / Cost / Trouble bands) is fast and readable, and "the Monster shows if it beats your trait die" creates a real, frequent choice.
- **"One roll, one rise"** is easy to apply once learned. Group checks (DRILL A1) resolved in seconds.
- **Castle Duties** give every player a spotlight location and make splitting the party feel natural. The Duty raise rule, including "furniture's obstacle included" and "never in a chase", answered every question that came up.
- **Ready-made town tables** (Ch 9) are clear. Picking a way in is a meaningful choice: the unwatched alternatives (window, drainpipe, yard) are where good players go.
- **Teamwork abilities** were the best moments, e.g. Ancient Lore plus Unseen on the Creature at the guard dog. The rule that helping costs a charge but not an action is a great design.
- **Edge cases the book answers precisely:** the Limit arriving mid-chase ("captured first … stays behind"); the Storyteller never picking a Cost that costs nothing (stopped a "drop the loot you just won" twice, and a Suspicion Cost in a group check); netting raises against step-downs (Ghost: Always plus Cost plus Chill); Practised Hand's free change back; a Critical outside a chase giving back only spent charges.
- **The final flight's majority rule** is quick and gets everyone rolling. The Hyde takeover on a Jekyll Monster is a fun swing.
- **The At the Table sheet** (p33) covered almost every lookup. Only the lock-up and furniture-ticking details needed the chapter text.

## 7. How the difficulty felt

- **Getting caught is a very real threat, arguably too real.** One Trouble at a watched obstacle (a 3-short roll, about 17–21% at Difficulty 8 with a d8 or d10 and the Mask) started a chase that, by itself, ended the Hard raid at Turn 2. Without charges a lone runner usually ends up captured (analysis: 50–88%). Capture also confiscates any essential being carried.
- **The swings are huge.** Raid 1 (Hard) was a Bust at Turn 2. Raid 2 (Standard) was a Grand Year at Turn 6 with Suspicion 5 of 11. Most of the game's tension sits in a few watched-obstacle rolls. Between them, play is smooth and fairly safe, especially with five Duties lined up against five locations.
- **Charges:**
  - In Raid 1 every usable charge was spent, all in chases: the Creature spent 3 and overdrew once, and the flight used 9.
  - The Invisible Man had **nothing to spend his on** in the flight.
  - In Raid 2, **11 of 15 charges were lost unspent**: when rolls succeed early, charges don't matter.
  - Overdraw happened twice for real: once to force the Limit on purpose, and three times in DRILL D's flight (where it is nearly free).
- **The final flight** felt fair to easy with a full party. It became lethal only for a thin party: the lone Ghost (Always Weakness, no overdraw) was **forked** in DRILL E.
- **Suspicion pacing:** Tells alone put both raids at 3 before any roll. After that the track moved little except in chases, where it moved violently (Raid 1: +11 in one chase; DRILL A: +7 across the lock-up sequence).

---
*Files: `rolls.log` (every die rolled, in order), `notes-raid1.md` (working notes) and `pages/` (rendered PDF pages used to check tables and maps), all in this folder.*
