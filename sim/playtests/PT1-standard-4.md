# PT1: a Standard raid with 4 Entities (agent playtest)

*Rules tested: `docs/CORE-RULES.md` draft 0.16, read literally. The text was the only rules source: the simulator code was not read for rules. `sim/entities.mjs` was read only for the placeholder Entities' dice, abilities, Gift options, Gift trait and Weakness type. Every random result below comes from a real roll (`node` + `Math.random`), and all of them are listed in the appendix (R1–R56). Date: 2026-10-05.*

> **PLACEHOLDER WARNING.** The Entities (E1–E8), Castle Duties (K1–K6), Tells, item kinds, the town, the chase table and every procedure used to build them are **placeholders made up for this test. None of it is game content.** No names or setting text were invented; places are just "Location 1" and so on.

**Main result: Grand Year** (Turn 9 of 12, Suspicion 9 of 13, all 12 charges spent, no chases).
**Drill D1** (the exit roll forced to Trouble so the chase rules got tested; every roll after that is real): **Partial**, after a capture, an escape from the lock-up, the Limit and a final flight.
**Ambiguities: 5 blockers, 17 major, 15 minor** (table in §4).

---

## 1. Setup

### 1.1 Party (PLACEHOLDER Entities, picked with real dice)
Picked with d8s, rerolling duplicates (R1, R2): **E7, E3, E1, E4**. Gift: d3 over the three listed options (R3). Castle Duty: d6 for K1–K6, rerolling duplicates as R8 requires (R4). Perks: **not written, so they have no effect** (A19). Tells: one generic placeholder line each. Tell chance: **1 in 2 per check** (the rules leave it to the Tell content, see A5).

| Entity | Brawn | Nimble | Sly | Charm | Wits | Signature (trait) | Gift (rolled) | Weakness type | Castle Duty | Tell |
|---|---|---|---|---|---|---|---|---|---|---|
| E7 | d10 | **d12** | d8 | d6 | d4 | hidden (Nimble) | switch → Brawn (R3: 2 of raise/switch/open) | sunlight | K4 | Tell A |
| E3 | d8 | d4 | **d12** | d10 | d6 | hidden (Sly) | raise (R3: 1 of raise/switch/open) | sunlight | K2 | Tell B |
| E1 | **d12** | d6 | d4 | d10 | d8 | raise (Brawn) | hidden (R3: 2 of switch/hidden/open) | mob | K6 | Tell C |
| E4 | d10 | d6 | d8 | **d12** | d4 | open (Charm) | switch → Brawn (R3: 2 of raise/switch/hidden) | mob | K3 | Tell D |

Ability effects, as the rules give them: **raise** = raise a die one size; **switch** = use the ability's trait instead of the one called; **hidden** = roll the Monster die without risking Suspicion; **open** = roll the ability's trait at 2 lower Difficulty, watched as usual. Charges: 3 each (S9).

**PLACEHOLDER Castle Duty edge** (the rules give none, see A18): *a free raise of the trait die on your own rolls at the location of a list item of your Duty's kind; it counts as the roll's one raise (R2).* E4 (K3) matches Item 2. E1 (K6) matches Items 3 and 4.

### 1.2 Town-building procedure (PLACEHOLDER, mine: the rules have no tables, see A3)
Built only from the rules' parts ("The raid" + Standard column of "Starting numbers"):
1. List: 4 items (S9). Essentials: d2 = 1 or 2; the first N items are the essentials. Each item gets a placeholder kind K1–K6 (d6, repeats allowed) so the Castle Duty edge can work.
2. One location per item (Location *n* holds Item *n*). Obstacles per location: d3.
3. Each obstacle: **Difficulty** d20 (1–3 → 6, 4–13 → 8, 14–19 → 10, 20 → 12, which is the 15/50/30/5% Standard mix); **traits** d2 = one or two; each trait d5 (1 Brawn, 2 Nimble, 3 Sly, 4 Charm, 5 Wits, rerolling a repeat); with two traits a d2 marks which one is **the loud way**; **watched** on d6 1–3; **group obstacle** on d6 1–2.
4. Obstacles are taken in the order listed. The list item is in hand when the last one is beaten (A2).
5. A location counts as **watched** for Tells if any of its obstacles is watched (A6).
6. Furniture (S7): d2 for Bulky or Huge, d4 for which list location; one extra obstacle rolled as in step 3, standing after the location's loot.
7. Lock-up (R9): Sly, or Brawn the loud way; always watched; Difficulty 10; one rescue obstacle per capture. Way out (S4): Sly or Nimble, or Brawn the loud way; watched; Difficulty 8.
8. **Placeholder chase table** (the rules have none, see A4): six rows, each with two different traits (d5 per trait, rerolling a repeat). Every row then holds at least one trait that isn't Nimble.
9. Movement: any place is one move from any other (A16). The party starts at the way out, the edge of town, before Turn 1 and gets in without a roll (A16).

### 1.3 The town (PLACEHOLDER, R5–R18)
List (R5: 2 essentials; R6: kinds): **Item 1** essential, K5 · **Item 2** essential, K3 · **Item 3** extra, K6 · **Item 4** extra, K6.

| Place | Obstacle | Traits (loud) | Diff | Watched | Group | Rolls |
|---|---|---|---|---|---|---|
| Location 1 (Item 1) | O1 | Charm | 12 | yes | yes | R7, R8 |
| Location 2 (Item 2) | O1 | Charm / Nimble (loud) | 10 | yes | no | R9, R15 |
| | O2 | Wits | 10 | yes | yes | R10 |
| | O3 | Sly (loud) / Charm | 10 | yes | no | R11 |
| | F: furniture, **Bulky** | Nimble | 10 | yes | no | R16, R17 |
| Location 3 (Item 3) | O1 | Nimble | 10 | yes | no | R12 |
| Location 4 (Item 4) | O1 | Nimble | 8 | yes | no | R13 |
| | O2 | Nimble | 8 | **no** | no | R14 |
| Lock-up | one per captive | Sly / Brawn (loud) | 10 | always | – | rules |
| Way out | – | Sly / Nimble / Brawn (loud) | 8 | yes | one roll for the party | rules |

All four list locations count as watched. Notes on the dice: they came out hard (five of the eight obstacles are Difficulty 10 and one is 12), and the procedure made Nimble loud at L2-O1 and Sly loud at L2-O3, because the rules don't say which traits can be loud.

**Placeholder chase table (R18):** 1 Charm/Wits · 2 Nimble/Brawn · 3 Nimble/Wits · 4 Sly/Nimble · 5 Nimble/Sly · 6 Brawn/Sly.

**Label numbers used (Standard):** Limit 13 · 12 Turns · exit 8 · lock-up 10 · local chase: Lead 1, escape at 4, mob 10 + half the Suspicion (rounded down, at most 12) · final flight: Lead 2, escape at 6, mob 11 · overdraw +2.

### 1.4 Readings I used where the text needed a ruling (details in §4)
- A beaten non-group obstacle stays beaten for everyone. Each Entity who goes past a group obstacle rolls it, and when several do it in the same Turn that is a group check (A1).
- Inside a Turn, Entities act one after another, and an Entity may use what an earlier one opened that Turn. Moves land at the end of the Turn, and Tells are checked then (A27).
- Abilities are declared before the roll (A25). Using one on another Entity's roll doesn't use up the helper's action (A26). Raise and hidden work on any roll; raise moves the trait die and never past d12 (A12, A28).
- "Without risking Suspicion" (hidden) covers only the Monster showing (A9). One roll raises Suspicion once, and the loud way and a Cost of "Suspicion +1" count among its triggers (A10).
- A Tell check happens once for each group arriving at a watched place, the way out and the lock-up included. If it goes off, a random arriver's Tell shows (A6).
- In a chase, the result only moves the Lead. The Monster showing still raises Suspicion until the hunt starts (A7).

**Player policy.** Use the Mask by default. Spend a charge to put the Monster d10 under "hidden" (or to raise or switch) on any watched roll at Difficulty 10 or more, because Trouble there means a local chase (escape is only about 19–51%, see §3). Pool abilities onto one roll at the same location (P7). Send one Entity through each group obstacle. Spend everything: unspent charges are lost.

**Storyteller policy.** The rules give no guidance on picking a Cost (A11). I pick the one that bites now and isn't wasted, and say why.

---

## 2. Play log

*Format: roll: dice = faces → total vs Difficulty → band; Monster shows y/n; Suspicion before → after. "Sus" = Suspicion (Limit 13). Charges are shown as E7/E3/E1/E4.*

**Start.** Sus 0. Charges 3/3/3/3. Everyone is at the way out. Plan: E7 takes Locations 3 then 4 (Nimble d12); E4 takes Location 1 (Charm d12, with open); E3 and E1 take Location 2 (Charm d10s, Wits d8, and their raise and hidden to share).

**Turn 1.** Everyone moves: E7 → L3, E4 → L1, E3 + E1 → L2. Tell checks (three groups, so three checks; R19): d2 = 2, 2, 2 → none. Sus 0 → 0.

**Turn 2**
- E7, L3-O1 (Nimble 10, watched). Signature hidden (charges 3 → 2). Nimble d12 + Monster d10 = 3 + 6 = **9 vs 10 → Cost**. Monster shows **y** (6 > 3), but hidden blocks it. The Storyteller picks **Suspicion +1**: it's the first Cost, Turns are plentiful, and "drop an item" isn't allowed because nobody held loot when the roll was made (A35). Sus 0 → 1. **E7 has Item 3.** (R20)
- E4, L1-O1 (Charm 12, watched, group, crossing alone). Signature **open**: Charm at Difficulty 10 (charges 3 → 2). Monster rather than Mask, because this is a daunting essential: 70% vs 54% success, 17.5% vs 29% Trouble, at a 37.5% risk of the Monster showing. Charm d12 + Monster d10 = 1 + 9 = **10 vs 10 → Success**. Monster shows **y** (9 > 1): +2. Sus 1 → 3. **E4 has Item 1 (essential).** (R21)
- E3, L2-O1 (Charm / Nimble-loud 10, watched). Signature hidden (charges 3 → 2). Charm d10 + Monster d10 = 8 + 6 = **14 vs 10 → Success**. Monster shows n, so the charge was spent for nothing (A25). Sus 3. O1 beaten.
- E1, L2-O2 (Wits 10, watched, group, crossing alone, straight after E3's success: A27). E3's Gift **raise** takes Wits d8 → d10 (E3 2 → 1). E1's Gift **hidden** (E1 3 → 2). Wits d10 + Monster d10 = 10 + 3 = **13 vs 10 → Success**. Monster shows n. Sus 3. E1 is past O2. (R22, R23)
- Charges 2/1/2/2.

**Turn 3**
- E1, L2-O3 (Sly-loud / Charm 10, watched). Charm, the quiet trait. E3's raise takes Charm d10 → d12 (E3 1 → 0). E1's hidden (E1 2 → 1). Charm d12 + Monster d10 = 11 + 7 = **18 vs 10 → Success**. Monster shows n. Sus 3. **E1 has Item 2 (essential).** Both essentials are in hand on Turn 3. (R24)
- E7 moves L3 → L4. E4 moves L1 → L2 to go after the furniture. E3 waits at L2 to lend abilities (it has none left).
- Tell checks (R25): at L4 (E7), d2 = 1, **goes off**: Tell A, +1. Sus 3 → 4. At L2 (E4), d2 = 2, none.
- Charges 2/0/1/2.

**Turn 4**
- E7, L4-O1 (Nimble 8, watched). Mask: Nimble d12 + Mask d6 = 11 + 6 = **17 vs 8 → Success**. Monster n/a. Sus 4. (R26)
- E4, L2-O2 (Wits 10, watched, group, crossing alone). Gift **switch** to Brawn d10 (E4 2 → 1). The Castle Duty K3 edge raises it to **d12**. E1's hidden on E4's roll (P7; E1 1 → 0). Brawn d12 + Monster d10 = 9 + 8 = **17 vs 10 → Success**. Monster shows n. Sus 4. E4 is past O2. (R27)
- E1 and E3 wait. Charges 2/0/0/1.

**Turn 5**
- E7, L4-O2 (Nimble 8, **not watched**). Nimble d12 + Mask d6 = 2 + 3 = **5 vs 8 → Trouble**. No witnesses, so no chase. Sus 4 → 5. (R28)
- E4, L2-F (furniture obstacle, Nimble 10, watched). The location's loot is in hand, so the party may try it (S7). Switch to Brawn d10 (E4 1 → 0), Duty raise to d12, and the Monster die without hidden, since nobody here has a charge left. Brawn d12 + Monster d10 = 1 + 9 = **10 vs 10 → Success**. Monster shows **y** (9 > 1): +2. Sus 5 → 7. The Bulky piece is free to take. (R29)
- E1 and E3 wait. The party decides that E1 (no charges, Brawn d12) will carry the piece, and times its moves so that everyone reaches the way out together, for one Tell check instead of several (A6).
- Charges 2/0/0/0.

**Turn 6**
- E7, L4-O2 again. Nimble d12 + Mask d6 = 2 + 2 = **4 vs 8 → Trouble**. Doubles, but not a Success, so no Critical. Sus 7 → 8. (R30)
- The others wait.

**Turn 7**
- E7, L4-O2 for the third time. The extra isn't needed for a Win, but it insures against a capture, and unspent charges are lost. Signature hidden (E7 2 → 1). Nimble d12 + Monster d10 = 1 + 9 = **10 vs 8 → Success**. Monster shows **y**, but hidden blocks it. Sus 8. **E7 has Item 4.** All four list items are in hand. (R31)
- E1 picks up the Bulky piece and starts the two-Turn move L2 → way out (S7). Picking it up is free (A29). E3 and E4 wait.

**Turn 8**
- E1 finishes the carry. E3 and E4 move L2 → way out, and E7 moves L4 → way out. Everyone arrives together.
- Tell check at the way out (R32): d2 = 1, **goes off**. d4 = 3 → Tell C (E1), +1. Sus 8 → 9.

**Turn 9**
- Way out (Sly / Nimble / Brawn-loud 8, watched). One Entity rolls for the party: E7, with its last charge on signature hidden (E7 1 → 0). Nimble d12 + Monster d10 = 11 + 8 = **19 vs 8 → Success**. Monster shows n. **Everyone at the way out leaves town** with Items 1–4 and the Bulky piece. (R33)

**End of the raid:** Turn 9 of 12. Sus **9 / 13**. Charges 0/0/0/0 (12 of 12 spent, no Criticals). Nobody captured or left behind.

### Suspicion ledger (main line)
| Turn | Source | +Sus | Total |
|---|---|---|---|
| 2 | E7's Cost (Storyteller: Suspicion +1) | 1 | 1 |
| 2 | E4's Monster shows | 2 | 3 |
| 3 | Tell A (E7, L4) | 1 | 4 |
| 5 | E7 Trouble (not watched) | 1 | 5 |
| 5 | E4's Monster shows | 2 | 7 |
| 6 | E7 Trouble (not watched) | 1 | 8 |
| 8 | Tell C (E1, way out) | 1 | 9 |

### Short branches on other readings (main line)
- **Tells only when the whole party arrives together (A6, other reading):** the Turn 1 and Turn 3 checks would not happen and Tell A would not show, so Sus ends at 8. Same result.
- **Hidden covers all Suspicion on that roll (A9, other reading):** the Storyteller couldn't make E7's Turn 2 Cost "Suspicion +1" stick and would have to pick another Cost. Sus ends at 8, or at 9 if "lose a Turn" is picked. Same result.
- **No Castle Duty edge (A18, treated like Perks):** E4's two Location 2 rolls would use Brawn d10 instead of d12. With the Monster die, success drops from 70% to 64% each, and the risk of the Monster showing on the furniture roll rises from 37.5% to 45%. Not re-rolled, because it doesn't clearly change the outcome.
- **Raise only works on rolls of the ability's own trait (A12, other reading):** E3's raise (Gift trait Charm) could not have helped E1's Wits roll on Turn 2 (Wits d8 would stay d8: success 55% instead of 64%). The Turn 3 Charm roll is unaffected.

---

### 2b. Drill D1: the exit goes wrong (tests the chase rules; it does not change the main result)
*The main line never had a chase. To test that text, I take the real state at Turn 9 and **force E7's exit roll to Trouble**. That is the one invented result, and it is marked as such. Every roll after it is real.*

**Turn 9 (drill).** Way out: E7 rolls Trouble (forced). Suspicion +1, and hidden doesn't block Trouble (A9). Sus 9 → 10. "That Entity is caught" → a **local chase** for E7, inside this Turn (R5, A13). E7 has 0 charges.
- Local chase: Lead 1, escape at 4. Mob 10 + 5 = 15, capped at **12**.
- Round 1: chase table d6 = 3 (Nimble/Wits) → Nimble d12. Monster rather than Mask, because 54% vs 38% success and 30% vs 46% Trouble beats the 37.5% show risk. Nimble d12 + Monster d10 = 5 + 1 = **6 vs 12 → Trouble**. Lead 1 → **0: cornered, captured.** Monster shows n. Sus 10 (no +1 for Trouble in a chase under my reading; 11 under the literal one, A7). (R34)
- R3: the town takes back what E7 carried, **Items 3 and 4** (where they go: A14). E7 is held at the lock-up.

**Turn 10.** Choice for the party: leave now, which gives a Partial with E7 left behind, a drop of one step to **Bust**; or wait. They wait at the way out. E7 tries to slip free, using the lock-up's quiet trait Sly (A15) and the Mask, because the Monster would show 55% of the time at Sus 10. Sly d8 + Mask d6 = 4 + 6 = **10 vs 10 → Success → free** (at the lock-up). Sus 10. (R35)

**Turn 11.** E7 moves lock-up → way out. Tell check d2 = 2, none. Sus 10. (R36)

**Turn 12.** E3 rolls the way out for the party: Sly d12 + Mask d6 = 2 + 2 = **4 vs 8 → Trouble**. Sus 10 → 11. E3 is caught → local chase (Lead 1, mob 10 + 5 = 15, capped at 12). (R37)
- Round 1: table d6 = 6 (Brawn/Sly) → Sly d12. Sly d12 + Monster d10 = 1 + 9 = **10 vs 12 → Cost**: Lead stays at 1. Monster shows **y**: +2. Sus 11 → **13 = the Limit. The whole town hunts.** (R38, R39)
- **Ruling (A8):** the local chase ends and E3, who isn't captured, joins the final flight. Branch D1b below plays the other reading.

**Final flight** (E7, E3, E1 carrying the Bulky piece and Item 2, E4 holding Item 1). Lead 2, escape at 6, mob 11. Everyone rolls the Monster die. Suspicion has stopped. **Weakness:** the hunt began at the Limit, not at dawn, so the placeholder sunlight-type Weaknesses (E7, E3) don't bite; when the mob brings the mob-type ones (E1, E4) is unwritten, so they are not brought (A17). No charges are left, and nobody overdraws.

| Round | Table (d6) | E7 | E3 | E1 | E4 | S : T | Lead |
|---|---|---|---|---|---|---|---|
| 1 (R40–41) | 6 Brawn/Sly | Brawn d10 8+2=10 C | Sly d12 2+9=11 **S** | Brawn d12 6+3=9 C | Brawn d10 1+8=9 C | 1 : 0 | 2 → 3 |
| 2 (R42–43) | 6 Brawn/Sly | 2+9=11 **S** | 3+7=10 C | 1+9=10 C | 1+2=3 **T** | 1 : 1 | 3 |
| 3 (R44–45) | 2 Nimble/Brawn | Nimble d12 11+1=12 **S** | Brawn d8 8+2=10 C | Brawn d12 12+9=21 **S** | Brawn d10 8+8=16 **S, Critical (×2)** | 4 : 0 | 3 → 4 |
| 4 (R46–47) | 3 Nimble/Wits | Nimble d12 10+1=11 **S** | Wits d6 2+2=4 **T** | Wits d8 6+6=12 **S, Critical (×2)** (Nimble would be d6 → d4 while carrying) | Nimble d6 6+9=15 **S** | 4 : 1 | 4 → 5 |
| 5 (R48–49) | 1 Charm/Wits | Charm d6 4+3=7 **T** | Charm d10 9+4=13 **S** | Charm d10 5+2=7 **T** | Charm d12 10+8=18 **S** | 2 : 2 | 5 |
| 6 (R50–51) | 6 Brawn/Sly | Brawn d10 1+2=3 **T** | Sly d12 11+4=15 **S** | Brawn d12 4+8=12 **S** | Brawn d10 4+9=13 **S** | 3 : 1 | 5 → **6: escape** |

**Drill result:** home with Items 1 and 2 (both essentials) and the Bulky piece. Items 3 and 4 were lost to R3. That is 2 of 4: every essential, but two extras missing, so not a Win; at least half the list, so **Partial**. Furniture only counts with a Win. Nobody was left behind. **Partial.** One capture of the Entity carrying the extras cost two result steps (Grand Year → Partial), even though every Entity got home.

**Branch D1b: E3 must finish its local chase after the Limit (other reading of A8).** The hunt is on, so E3 rolls the Monster die and Suspicion has stopped. Mob 12, Lead 1. Round 2: table 5 → Sly d12 6+9=15 S, Lead 2. Round 3: table 2 → Brawn d8 5+5=10 C, Lead 2. Round 4: table 6 → Sly d12 7+10=17 S, Lead 3. Round 5: table 5 → Sly 3+1=4 T, Lead 2. Round 6: table 1 → Charm d10 7+7=14 **S, Critical, +2**, Lead **4: clear** (R52–R56). E3 gets away, but the rules then don't say where an Entity is who escapes a local chase once the hunt has begun (join the flight? already safe?). Had it been cornered, E3 would be captured and left behind: Partial → **Bust**. This reading adds a Lead-1, Difficulty-12 chase (about 50% capture even with a d12 and the Monster) before the final flight.

**Branch on A7 (literal reading: a chase Trouble also adds Suspicion +1, and a chase Cost also gets a P3 Cost).** E7's Trouble would add +1 (10 → 11), E3's exit Trouble +1 (→ 12), and E3's round-1 Cost plus the Monster showing would still reach 13 on the same roll. Same outcome here.

---

## 3. Result and how it felt

**Main result: Grand Year.** Both essentials were in hand by Turn 3 and all four items by Turn 7. The furniture took two of E4's rolls and E1's two-Turn carry. The party left on Turn 9 with Sus 9 of 13.
**Drill D1: Partial.**

**Numbers from the main line.**
- 12 rolls: 9 Success, 1 Cost, 2 Trouble. Both Troubles came on the one unwatched obstacle.
- The Monster showed on 4 rolls. Two were blocked by hidden; the other two (+2 each, both on Successes where the trait die rolled a 1) gave 4 of the 9 Suspicion points.
- 12 of 12 charges spent, no Criticals:
  - hidden 7 times;
  - raise 2;
  - switch 2;
  - open 1.
- 13 of 36 Entity-Turns were idle, and Turns 10–12 were never needed.

**How it felt**
- **Pace: fast and safe in the main line.** Splitting three ways on Turn 1 and pooling abilities onto single rolls (P7) cleared the hardest location by Turn 3. The 12-Turn clock never pressed. Waiting costs nothing, so the party could even hold Entities back to time their arrivals and dodge Tell checks. One sample, with good dice on the essentials, but the slack was large.
- **Tension came only from Suspicion.** The Monster showing on a Success (+2) hurt more than any failure. The Storyteller had a single decision all night (one Cost) and no other lever: nothing in the town reacts to Suspicion below the Limit except the local-chase Difficulty, and that is already at its cap of 12 from Suspicion 4 on.
- **Abilities decided everything.** "Hidden" (a d10 Monster die with no risk) turned Difficulty 10 rolls from about 45–54% into 64–70%. With P7, two Entities could stack hidden and raise on one roll. Spending was easy and felt right, so nobody hoarded.
- **Group obstacles never became group checks.** The sensible play was always to send one Entity through alone, so P6 never fired.
- **The drill showed a much harsher game behind the safe surface.**
  - A local chase starts at Lead 1 against Difficulty 12, so a single Trouble means capture. Escape odds from Lead 1 (exact maths): about 51% with a d12 trait and the Monster, 37% with a d10 and the Monster, 19% with a d12 and the Mask, 1% with a d8 and the Mask.
  - Rolling the Monster to survive a chase shows it 37–55% of the time, so local chases throw Suspicion at the Limit: two chase rolls took it from 10 to 13.
  - R3 made one capture cost two result steps.
  - The final flight then felt safe: with four rollers, "successes outnumber trouble" moved the Lead up in 4 of 6 rounds and never down. Party size probably matters a lot in the final flight; worth measuring in `sim/`.
- **Decisions that mattered:**
  - Splitting the party.
  - Who crosses each group obstacle.
  - Pooling hidden and raise on the essentials.
  - Going back for the second extra (it cost +2 Sus in Trouble but would have insured a Win).
  - Timing arrivals to dodge Tells.
  - In the drill, waiting for the captive (Partial) instead of leaving (Bust).

---

## 4. Ambiguity table (most severe first)

**Blocker** = can't continue without a ruling · **major** = changes outcomes or balance · **minor** = wording or clarity. "(content)" = the rules say the thing is still to be written.

| ID | Severity | Passage (quoted) | What I did | Suggested fix |
|---|---|---|---|---|
| A1 | blocker | "Group checks [P6]: when the party crosses the same obstacle together, everyone rolls and gets through on their own result" · "Several Entities may try the same obstacle in one Turn; each try risks Trouble [R7]." | Nothing says whether one Entity's Success beats an obstacle for everyone, which obstacles each Entity must cross for itself, or whether the party must cross together. I flagged a third of obstacles as group (each Entity going past rolls; beaten for itself only). Other obstacles, once beaten by a Success or Cost, stay beaten for all. The party sent one Entity through each group obstacle alone, so P6 never fired. | Mark every obstacle as **shared** (one Success or Cost clears it for everyone, for the night) or **personal** (each Entity going past rolls; several in one Turn = a group check), and say how a party moves through personal ones. |
| A2 | blocker | "a location (1–3 obstacles, some loot, at least two ways in)" | Obstacles taken in the listed order. Beating the last puts the list item in the beater's hand with no extra action. No loot beyond the list item. "Two ways in" not modelled. | "A location's obstacles are taken in order; beating the last puts its loot in that Entity's hand; the two ways in are two different first obstacles (pick one)." |
| A3 | blocker (content) | "There are three ways to build one: a premade sequence, a map, or random tables with a difficulty budget." | There are no tables and no budget. I wrote my own procedure (§1.2): d3 obstacles, d20 Difficulty mix, d2 or d5 traits, d2 loud, watched 1 in 2, group 1 in 3. | Write the town tables (obstacles per location, Difficulty mix, which traits can be loud, watched and group shares, loot) before the next playtest. |
| A4 | blocker (content) | "each round, roll on a d6 chase table. The result lists the traits that work, always including one that isn't Nimble." | Rolled a placeholder table (§1.3). | Write the chase table. Also say whether one table roll serves the whole final flight each round (I used one for all). |
| A5 | blocker (content) | "The chance is set with the Tell content [sim]." | Used 1 in 2 per check, as instructed. Tells gave 2 of 9 Suspicion points. | Put a Tell chance in Starting numbers (for example "1 in 3 per check") so it can be simulated before the Tells are written. |
| A6 | major | "Tells [S5]: checked once each time the party arrives at a watched location, for the whole party; if one goes off, one Entity's Tell shows" | With the party split, I checked once per group arriving, with a random arriver's Tell. "Watched location" = any of its obstacles watched; the way out and lock-up count. Players then timed moves so all four arrived together (one check, not four). Under "only when the whole party arrives", a split party is never checked (−1 Sus here). | "Each time one or more Entities arrive together at a watched location (the way out and the lock-up included), roll once; if it goes off, the Storyteller picks one of them," and define a watched location. |
| A7 | major | "Each round, roll against the mob's Difficulty … Success +1, cost no change, trouble −1." vs "Cost: … the Storyteller picks one …" and "Trouble: … Suspicion +1, and witnesses catch you." | In a chase, the band only moved the Lead. The Monster showing still raised Suspicion (until the hunt). Under the literal reading, chase Trouble adds +1 and a chase Cost adds a P3 Cost. The Limit was reached on the same roll either way in D1. | "In a chase the result only moves the Lead; the Monster showing still raises Suspicion until the hunt is on." |
| A8 | major | "At the Limit … the whole town hunts. Every Entity who isn't captured flees together in the final flight." · "A local chase happens within the Turn it started [R5]." | E3's local chase was under way when Suspicion hit 13. I ended it and put E3 in the final flight. Branch D1b (finish the local chase first) adds about 50% capture risk, so Partial → Bust if caught. It also leaves an Entity who escapes a local chase during the hunt nowhere. | "When the hunt starts, every local chase ends at once and those Entities join the final flight." |
| A9 | major | "roll the Monster die without risking Suspicion" | Read as: the Monster showing raises nothing on that roll. Trouble or a Cost on the same roll still can. The broad reading would have blocked the Storyteller's Cost on Turn 2 (−1 Sus). | "…roll the Monster die; if it shows, Suspicion doesn't rise for it." |
| A10 | major | "taking it costs +1 Suspicion whatever the result [R1]" · "One roll raises it once, by its biggest trigger." · Cost: "Suspicion +1" | The loud way isn't in the "Raised by" list, and a Cost of "Suspicion +1" isn't either. I counted both as triggers of the roll, so loud + Monster showing = +2 and a Cost of Suspicion +1 on a roll where the Monster showed is wasted. Players avoided both loud options, partly because of this. | List "the loud way +1" and "a Cost's +1" in "Raised by" and say whether they stack with the roll's other trigger. |
| A11 | major | "[P3: the Storyteller picks one: Suspicion +1, drop an item, lose a Turn, or your next roll one size smaller]" | No guidance. Some choices are wasted in context: lose a Turn when time is slack, +1 when the roll already raised Suspicion. I picked Suspicion +1 for the only Cost, with a reason. | Give the Storyteller a default (a short priority list or a d4) and say a Cost must not be one that does nothing. |
| A12 | major | "Abilities (one charge each) do one of four things: raise a die one size; use the ability's trait instead of the one called; roll the Monster die without risking Suspicion; open an approach…" | Only switch and open name a trait. I let raise and hidden apply to any roll (E3's Charm-trait raise helped E1's Wits roll on Turn 2). Under the other reading that raise fails, and 64% → 55%. | Say whether every ability is tied to its trait, or only switch and open. |
| A13 | major | "One Entity rolls for the party. A Success or Cost gets everyone out; Trouble raises Suspicion and that Entity is caught, and the party may try again next Turn." | "Everyone" = every Entity at the way out. "Caught" = a local chase (the way out is watched). No P3 Cost on an exit Cost (didn't arise). | "…gets every Entity at the way out home; Trouble starts a local chase for the roller; an exit Cost carries no further cost" (or say what it costs). |
| A14 | major | "cornered means captured, and the town takes back what you carried [R3]" | Read as gone for the night (there was no time left to steal it again anyway). In D1 this one capture turned Grand Year into Partial. | Say where the items go: back to their locations with their obstacles reset, or gone for the night. |
| A15 | major | "once per Turn you may try to slip free; only a Success frees you [S6] (Trouble: Suspicion +1)" | Used the lock-up's traits (quiet Sly), as the captive's action for the Turn, Mask allowed, no new chase on Trouble. The trait list says Nimble covers "slipping free", which conflicts. | "As its action, a captive may roll the lock-up obstacle (its traits); only a Success frees it; Trouble adds +1 Suspicion and nothing else." |
| A16 | major | "Each Turn, every Entity either makes one roll at its location or moves to another location." | No start position, no rule for getting in, no distances. I started at the way out, got in free, and made every place one move apart. That spent 1 of 12 Turns before any roll. | "The party starts at the way out; getting in needs no roll; any two places are one move apart unless the raid says otherwise." |
| A17 | major (content) | "When the mob brings each Weakness is set with the Weakness content [sim]." | In D1's final flight (begun at the Limit) no Weakness was brought: placeholder sunlight types bite only at dawn, and mob-type timing is unwritten. If mob types came from round 1, E1 and E4 would roll one size smaller. | Set a default timing for each Weakness type in Starting numbers so the sim and playtests agree. |
| A18 | major (content) | "a Castle Duty (… with a small edge tied to the shopping list …)" · R2 "Castle Duty included" | Placeholder: a free trait-die raise on your own rolls at the location of a list item of your Duty's kind. E4 used it twice (Brawn d10 → d12). | Write the Duties, or agree one placeholder edge for sim and playtests. |
| A19 | major (content) | "a Perk (one of three passive edges)" | No effect (not written), as instructed. | Write the Perks; their balance effect is unmeasured. |
| A20 | major | R7 "each try risks Trouble" vs P6 "Suspicion rises once, by the worst result" · R4 "Several Entities caught by one roll flee together" | Didn't arise: nobody crossed together. Unclear whether two Entities rolling the same obstacle in one Turn is a group check (Suspicion once) or two tries (Suspicion each), and whether several in Trouble in a group check were "caught by one roll" (shared Lead). | "Entities rolling the same obstacle in the same Turn make one group check: Suspicion rises once; everyone in Trouble is caught together (R4)." |
| A21 | major | "Every Entity who isn't captured flees together in the final flight." · "Forked: Cornered in the final flight. The session ends" | Didn't arise (the party always left together). If some have already left town, do they flee too? Does cornering the rest fork the whole party? | "Only Entities still in town flee; if they are cornered they are forked, and the result counts them as left behind" (or say what it is). |
| A22 | major | "open an approach nobody else can take, still with a roll: you roll the ability's trait at 2 lower Difficulty" | Used once, on a group obstacle (only the opener got through). Not said whether open works in a chase (−2 to the mob) or on the way out (beaten for everyone?). | Say where open works: obstacles only, and only for the opener. |
| A23 | minor | "Once the hunt is on [S1]: the Mask is off" | So the Mask is allowed in a local chase; I allowed it. | Say it plainly in Chases. |
| A24 | minor | "a mob of 10 + half the Suspicion (at most 12)" | Rounded down. The cap is reached at Suspicion 4, so "rises with Suspicion" hardly matters. | Say "rounded down", and check in the sim whether the cap makes the rise pointless. |
| A25 | minor | (no timing given for abilities) | Declared before the roll (E3's hidden on Turn 2 was spent for nothing). | "Spend abilities before you roll." |
| A26 | minor | "[P7: an ability may target any Entity's roll at the same location.]" | Helping didn't use the helper's action. | Say whether using an ability on another's roll costs your action. |
| A27 | minor | "Each Turn, every Entity either makes one roll … or moves" | Acted one after another inside a Turn, using what an earlier Entity had just opened; moves land at Turn end. Saved E1 one Turn on Turn 2. | Give the order inside a Turn. |
| A28 | minor | "raise a die one size" · "No die goes below a d4" | Raise = the trait die, never above d12 (a raise on a d12 trait is wasted). | "Raise your trait die one size (a d12 can't go higher)." |
| A29 | minor | "a piece stands at one of the list's locations, behind one extra obstacle…" · "You can drop a piece at any time." | Piece put after the location's loot. Anyone may carry it, picking it up is free, and leaving a location doesn't re-cross its obstacles. | Say who takes the piece, whether picking it up costs an action, and whether you re-cross obstacles on the way out. |
| A30 | minor | "Huge pieces don't fit small entrances." | Nothing marks an entrance as small (the piece rolled Bulky, so this didn't arise). | Mark small entrances on obstacles or locations. |
| A31 | minor | "Carrying: Bulky pieces need one carrier…" | No limit on small loot per Entity. | Say whether small loot has a limit. |
| A32 | minor | "Grand Year: A Win, plus at least one piece of furniture or decor" | "Decor" is defined nowhere. | Define decor or drop the word. |
| A33 | minor | "the night lasts a set number of Turns before dawn" · Suspicion "One town-wide track up to a Limit" | Sus starts at 0; dawn comes after Turn 12 ends. | State both. |
| A34 | minor | "lose a Turn, or your next roll one size smaller" | Not used. Read as: skip the Entity's next Turn; the trait die is one size smaller. | Say which die, and that a lost Turn is that Entity's next one. |
| A35 | minor | "The Storyteller picks 'drop an item' only if someone carries loot [R10]." | Only the roller's loot, and not on the roll that wins the item. | "…only if the roller carries loot." |
| A36 | minor | "each round, roll on a d6 chase table" (final flight) | One table roll per round for the whole flight. | Say "one roll per round for everyone in the chase." |
| A37 | minor | "Critical … in the final flight it counts as two successes" | Applied (D1 rounds 3 and 4), but the Lead moves at most 1 a round, so it changed nothing. | Check in the sim; consider "a Critical in the final flight cancels one trouble." |

**Counts: 5 blockers (3 of them content not yet written), 17 major (3 of them content), 15 minor.**

---

## 5. Roll appendix
Roller: a scratch `node` script using `Math.random` (`1 + floor(random × n)`), logging every call. Faces are given in the order the dice are listed.

| # | What for | Dice = faces |
|---|---|---|
| R1 | Party pick, d8 each in order, repeats rerolled | d8=7 d8=3 d8=7 d8=7 d8=1 d8=3 → E7, E3, (7), (7), E1, (3) |
| R2 | 4th Entity (reroll 1/3/7) | d8=7 d8=1 d8=4 d8=5 → (7), (1), E4 |
| R3 | Gift option for E7, E3, E1, E4 | d3=2 d3=1 d3=2 d3=2 |
| R4 | Castle Duty K# for E7, E3, E1, E4 (+ spares) | d6=4 d6=2 d6=6 d6=6 d6=3 d6=5 d6=5 d6=6 → K4, K2, K6, (6), K3 |
| R5 | Essentials count | d2=2 |
| R6 | Item kinds, items 1–4 | d6=5 d6=3 d6=6 d6=6 |
| R7 | Obstacle count, Locations 1–4 | d3=1 d3=3 d3=1 d3=2 |
| R8 | L1-O1: diff, #traits, trait1, trait2, spare, loud, watched, group | d20=20 d2=1 d5=4 d5=4 d5=4 d2=2 d6=3 d6=1 |
| R9 | L2-O1 (same order) | d20=16 d2=2 d5=4 d5=4 d5=4 d2=2 d6=3 d6=3 |
| R10 | L2-O2 | d20=19 d2=1 d5=5 d5=4 d5=2 d2=1 d6=3 d6=2 |
| R11 | L2-O3 | d20=19 d2=2 d5=3 d5=4 d5=4 d2=1 d6=3 d6=6 |
| R12 | L3-O1 | d20=17 d2=1 d5=2 d5=4 d5=5 d2=1 d6=2 d6=5 |
| R13 | L4-O1 | d20=4 d2=1 d5=2 d5=2 d5=2 d2=2 d6=1 d6=5 |
| R14 | L4-O2 | d20=4 d2=1 d5=2 d5=3 d5=4 d2=1 d6=5 d6=5 |
| R15 | L2-O1 second trait (reroll 4) | d5=2 d5=5 d5=5 → Nimble |
| R16 | Furniture size, location | d2=1 d4=2 → Bulky, Location 2 |
| R17 | Furniture obstacle (same order as R8) | d20=15 d2=1 d5=2 d5=2 d5=2 d2=1 d6=2 d6=4 |
| R18 | Chase table rows 1–6, two different traits each | d5: 4 5 2 2 2 1 2 5 3 2 2 3 1 3 1 3 → (4,5) (2,1) (2,5) (3,2) (2,3) (1,3), last two unused |
| R19 | T1 Tells: L3, L1, L2, who-at-L2 | d2=2 d2=2 d2=2 d2=2 |
| R20 | T2 E7 L3-O1 Nimble + Monster (hidden) | d12=3 d10=6 |
| R21 | T2 E4 L1-O1 open, Charm + Monster | d12=1 d10=9 |
| R22 | T2 E3 L2-O1 Charm + Monster (hidden) | d10=8 d10=6 |
| R23 | T2 E1 L2-O2 Wits (raised to d10) + Monster (hidden) | d10=10 d10=3 |
| R24 | T3 E1 L2-O3 Charm (raised to d12) + Monster (hidden) | d12=11 d10=7 |
| R25 | T3 Tells: L4 (E7), L2 (E4) | d2=1 d2=2 |
| R26 | T4 E7 L4-O1 Nimble + Mask | d12=11 d6=6 |
| R27 | T4 E4 L2-O2 Brawn (switch, Duty raise to d12) + Monster (hidden) | d12=9 d10=8 |
| R28 | T5 E7 L4-O2 Nimble + Mask | d12=2 d6=3 |
| R29 | T5 E4 L2-F Brawn (switch, Duty raise to d12) + Monster | d12=1 d10=9 |
| R30 | T6 E7 L4-O2 Nimble + Mask | d12=2 d6=2 |
| R31 | T7 E7 L4-O2 Nimble + Monster (hidden) | d12=1 d10=9 |
| R32 | T8 Tell at the way out; who (1 E7, 2 E3, 3 E1, 4 E4) | d2=1 d4=3 |
| R33 | T9 E7 way out, Nimble + Monster (hidden) | d12=11 d10=8 |
| R34 | Drill: E7 local chase round 1, table + Nimble + Monster | d6=3 d12=5 d10=1 |
| R35 | Drill T10: E7 slip free, Sly + Mask | d8=4 d6=6 |
| R36 | Drill T11: Tell, E7 at the way out | d2=2 |
| R37 | Drill T12: E3 way out, Sly + Mask | d12=2 d6=2 |
| R38 | Drill: E3 local chase round 1 table | d6=6 |
| R39 | Drill: E3 local chase round 1, Sly + Monster | d12=1 d10=9 |
| R40 | Drill FF round 1 table | d6=6 |
| R41 | Drill FF round 1: E7 (d10+d10), E3 (d12+d10), E1 (d12+d10), E4 (d10+d10) | 8,2 · 2,9 · 6,3 · 1,8 |
| R42 | Drill FF round 2 table | d6=6 |
| R43 | Drill FF round 2 (same dice as R41) | 2,9 · 3,7 · 1,9 · 1,2 |
| R44 | Drill FF round 3 table | d6=2 |
| R45 | Drill FF round 3: E7 (d12+d10), E3 (d8+d10), E1 (d12+d10), E4 (d10+d10) | 11,1 · 8,2 · 12,9 · 8,8 |
| R46 | Drill FF round 4 table | d6=3 |
| R47 | Drill FF round 4: E7 (d12+d10), E3 (d6+d10), E1 (d8+d10), E4 (d6+d10) | 10,1 · 2,2 · 6,6 · 6,9 |
| R48 | Drill FF round 5 table | d6=1 |
| R49 | Drill FF round 5: E7 (d6+d10), E3 (d10+d10), E1 (d10+d10), E4 (d12+d10) | 4,3 · 9,4 · 5,2 · 10,8 |
| R50 | Drill FF round 6 table | d6=6 |
| R51 | Drill FF round 6: E7 (d10+d10), E3 (d12+d10), E1 (d12+d10), E4 (d10+d10) | 1,2 · 11,4 · 4,8 · 4,9 |
| R52 | Branch D1b round 2: table; d12 d10 d8 d6 d4 (use E3's chosen trait); Monster d10 | d6=5 · 6 2 5 5 4 · 9 → Sly d12 6 |
| R53 | Branch D1b round 3 (same) | d6=2 · 1 9 5 6 4 · 5 → Brawn d8 5 |
| R54 | Branch D1b round 4 | d6=6 · 7 4 3 6 4 · 10 → Sly d12 7 |
| R55 | Branch D1b round 5 | d6=5 · 3 4 3 1 3 · 1 → Sly d12 3 |
| R56 | Branch D1b round 6 | d6=1 · 4 7 6 1 4 · 7 → Charm d10 7 |

*The only result not rolled is the Trouble forced at the start of Drill D1 (marked there). Faces from R52–R56 that weren't for E3's chosen trait were rolled and not used: the trait was chosen by die size before looking at the faces.*
