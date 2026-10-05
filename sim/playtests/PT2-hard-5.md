# PT2: Hard raid, 5 Entities, played to stress the edges

*Agent playtest, 2026-10-05. Rules played: `docs/CORE-RULES.md`, core rules 1.0. The file's header changed from draft 0.16 to 1.0 during the run; I re-read it, and the rules text was the same apart from the header. No other rules source was used, and the simulator's code was not read. Every random result is a real `node` roll (Math.random), logged in the appendix as R1–R76.*

> **PLACEHOLDER WARNING.** None of the Entities, Gifts, Castle Duties, Tells, Weakness timings, the chase table or the town procedure below is game content. They are stand-ins: the anonymous Entities E1–E8 from `sim/entities.mjs`, plus the procedures the brief set out or I invented for this test. Each is marked PLACEHOLDER where it is used. Perks are not written, so they have **no effect** in this test.

## Summary

| Line | What it is | Result | Turn | Suspicion |
|---|---|---|---|---|
| **Main line** | The raid, played by my best reading of the text | **GRAND YEAR** | exit on T6 of 12 | 0 / 15 |
| Branch S | The same town and party from T2, with the stricter readings of A7 and A13 and a bolder Monster-die policy | Grand Year | exit T7 | 3 / 15 |
| Branch S2 | The same from T2, with the strictest readings of A1, A6, A7, A13 and A18 | Grand Year | exit T8 | 4 / 15 |
| Drill D1 | Counterfactual start (chosen, not rolled): the T6 exit roll is Trouble. Plays the local chase, capture and slipping free | Grand Year (**Partial** under the other reading of A11) | exit T10 | 6 / 15 |
| Drill D2 | Counterfactual start (chosen, not rolled): dawn comes with the party at the way out. Plays a full dawn final flight | **FORKED** after 9 rounds | — | stopped |

Ambiguities: **6 blocker** (1 rules gap and 5 missing content), **18 major**, **20 minor**. They are listed in §4.

The main line finished too quickly to reach the rarer rules. Every obstacle passed on its first roll, so nobody was caught and Suspicion never moved. I therefore played two branches with other readings, which is legitimate because those readings change outcomes, and two clearly labelled **drills**. Each drill starts from a chosen counterfactual state, and all its dice are real. The drills put the local chase, capture, lock-up, slipping free, Weakness, overdraw, carrying in a flight, the Critical in a flight and being forked through the text. **The result of PT2 is the main line: Grand Year.**

---

## 1. Setup

### 1.1 Party (PLACEHOLDER Entities from `sim/entities.mjs` ROSTER)
Picked with a d8, rerolling duplicates. R1 gave 4, 4, 1, 7, 4, 4, 2, 4, which are E4, E1, E7 and E2. R2 gave 5, so E5. Gifts were rolled with a d3 each (R3). Castle Duties were rolled with a d6 each, rerolling duplicates (R4: 6, 2, 6→4, 1, 1→3), which kept them unique (R8). Each Entity has 3 charges. Tells are placeholders.

| Entity | Brawn | Nimble | Sly | Charm | Wits | Signature | Gift (rolled) | Castle Duty | Weakness | Tell |
|---|---|---|---|---|---|---|---|---|---|---|
| E1 | **d12** | d6 | d4 | d10 | d8 | raise | **open** (Charm) | K6 | mob-type | Tell A |
| E2 | d8 | **d12** | d10 | d6 | d4 | switch (to Nimble) | **raise** | K2 | mob-type | Tell B |
| E4 | d10 | d6 | d8 | **d12** | d4 | open (Charm) | **raise** | K4 | mob-type | Tell C |
| E5 | d4 | d10 | d6 | d8 | **d12** | raise | **open** (Nimble) | K1 | mob-type | Tell D |
| E7 | d10 | **d12** | d8 | d6 | d4 | hidden | **open** (Brawn) | K3 | sunlight-type | Tell E |

The four standard ability effects are those in the rules (raise a die one size, switch to the ability's trait, roll the Monster die without risking Suspicion, open an approach). Perks are not written: **no effect**.

### 1.2 PLACEHOLDER content rules used (the brief's stand-ins, plus one of mine)
- **Tell chance** (missing content, A3): 1 in 2 per check (d6 4–6). If it goes off, the Tell belongs to a random Entity among those arriving.
- **When the mob brings a Weakness** (missing content, A4): a mob-type Weakness on a d6 roll of 5–6 at the start of each chase; a sunlight-type Weakness only in a dawn flight (always, there).
- **Chase table** (missing content, A5): 1 Nimble/Sly · 2 Nimble/Brawn · 3 Nimble/Charm · 4 Nimble/Wits · 5 Sly/Charm · 6 Brawn/Wits.
- **Castle Duty edge** (missing content, A6), *my placeholder*: a Duty K*n* gives a free raise (counted as the roll's one raise under R2) on rolls at the obstacles guarding a list item of kind K*n*. Only E7 (K3) matched: Items 1 and 3 are K3. Branch S2 plays with no Duty edge at all.

### 1.3 PLACEHOLDER town procedure (mine; the rules give none, A2)
Hard label: 4 items, 2 of them essentials. Obstacle Difficulties follow the Hard mix (0 · 40 · 45 · 15% for 6/8/10/12), Limit 15, exit 8, final-flight mob 11, lock-up 12, 12 Turns.
1. **List:** Items 1–4, each with a kind rolled on a d6 (K1–K6). Items 1 and 2 are the essentials.
2. **Locations:** Location *n* holds Item *n*. Number of obstacles: d3. Obstacles are crossed **in sequence** (A23).
3. **Each obstacle:** Difficulty d20 (1–8 → 8, 9–17 → 10, 18–20 → 12, matching 40/45/15%). Number of traits d2. Each trait d5 (1 Brawn, 2 Nimble, 3 Sly, 4 Charm, 5 Wits; duplicates rerolled). With two traits, a d2 picks which one is the loud way. **Watched** on a d6 of 1–3. **Group** on a d6 of 5–6: under my A1 reading, a group obstacle must be crossed by each Entity on its own result, as a group check.
4. **A location is watched** (for Tells) if any of its obstacles is watched (A12).
5. **Furniture (S7):** location d4, size d2 (1 Bulky, 2 Huge), and one extra obstacle rolled as in step 3.
6. **Small entrances** (A37): a d6 of 1–2 on each of the furniture location's two ways in and on the way out.
7. **Lock-up (R9):** Sly, or Brawn the loud way, at 12, always watched. **Way out (S4):** Sly or Nimble, or Brawn the loud way, at 8, watched.

### 1.4 The town as rolled (R5–R15)

| Place | Holds | Obstacles in order (Difficulty · traits · watched · group) |
|---|---|---|
| Location 1 (not watched) | **Item 1, essential, K3** + **Huge furniture** | O1: 8 · Brawn · no · no — O2: 8 · Charm · no · no — **F-O1** (to the furniture): 12 · Sly / Wits *(loud)* · no · **group** |
| Location 2 (watched) | **Item 2, essential, K5** | O1: 8 · Brawn *(loud)* / Wits · **yes** · no — O2: 10 · Sly *(loud)* / Charm · no · no |
| Location 3 (watched) | Item 3, extra, K3 | O1: 10 · Sly · **yes** · no |
| Location 4 (watched) | Item 4, extra, K5 | O1: 8 · Brawn · **yes** · no |
| Lock-up (watched) | — | 12 · Sly / Brawn *(loud)* · yes |
| The way out (watched) | — | 8 · Sly / Nimble / Brawn *(loud)* · yes |

No entrance is small (R15: 6, 5, 4). Raw rolls: L1 had 2 obstacles, L2 2, L3 1 and L4 1, so the town has 6 list obstacles plus the furniture obstacle.

### 1.5 Standing rulings for the main line (each one is a logged ambiguity)
- **A1:** a normal obstacle stays passed for the whole party once any Entity gets a Success or Cost on it. The loot goes to whoever passes the last obstacle. A group obstacle needs each crossing Entity's own result.
- **A12:** Trouble at an unwatched obstacle raises Suspicion by 1 but starts no chase.
- **A13:** within a Turn, Entities act one at a time in the order the players choose, and results apply at once.
- **A14:** the party starts at the edge of town, which is not a location. Any move takes 1 Turn. The way out is a watched place you move to.
- **A15:** one Tell check per watched place per Turn at which anyone arrives.
- **A16 / A25:** the loud way merges with the roll's other triggers under "one roll raises it once".
- **A21:** everyone not held must be at the way out for the exit roll.
- **A7 / A8 / A9:** "open" may be used with a trait the obstacle already lists, and in chases. An Entity may stack open and a raise on one roll.
- **A10:** in a chase, Trouble moves the Lead and (in a local chase) adds Suspicion +1. A Cost changes nothing, and no P3 Cost is picked.
- **A18:** "lose a Turn" means that Entity skips its next action.

**Player policy (main line):** split up to save Turns; take the quiet option, using abilities to dodge loud traits and small dice; use the Mask when it gives at least about 70% success, and the Monster die otherwise or when Suspicion no longer matters; go for the furniture. **Storyteller policy:** pick the Cost that hurts most in context, and never a Suspicion +1 that the one-roll rule would absorb.

---

## 2. Play log — main line

Format: *who @ obstacle (Difficulty, traits, watched?): dice = faces = total vs Difficulty → band · Monster shows y/n · Suspicion before→after · [roll]*.

**Turn 1** (Suspicion 0/15)
- Moves: E1 and E4 go to Location 1. It is unwatched, so there is no Tell check. Brawn 8 then Charm 8 suits E1 (Brawn d12) and E4 (Charm d12), and both are needed to carry the Huge piece.
- E2 and E5 go to Location 2 (watched). Tell check d6=3: nothing. [R16]
- E7 goes to Location 4 (watched). Tell check d6=2: nothing. [R17]
- *Why:* splitting three ways because 12 Turns for 4 locations is plenty, and every location has an Entity with a matching big die. Suspicion 0→0.

**Turn 2**
1. E1 @ L1-O1 (8, Brawn, unwatched): Brawn d12 + Mask d6 = 10+4 = **14** vs 8 → **Success** · Monster n/a · 0→0 · [R18]. O1 now open for the party (A1).
2. E5 @ L2-O1 (8, Brawn loud / Wits, watched): Wits d12 + Mask d6 = 11+2 = **13** vs 8 → **Success** · n/a · 0→0 · [R19]. Took the quiet Wits, not the loud Brawn d4.
3. E7 @ L4-O1 (8, Brawn, watched): **Gift open** (Brawn; 1 charge, 3→2) gives Difficulty 6 (A7: open used on a listed trait). Brawn d10 + Mask d6 = 7+2 = **9** vs 6 → **Success** · n/a · 0→0 · [R20]. **Item 4 (extra) to E7.**
4. E4 @ L1-O2 (8, Charm, unwatched), rolled after E1 opened O1 this Turn (A13): Charm d12 + Mask d6 = 4+5 = **9** vs 8 → **Success** · n/a · 0→0 · [R21]. **Item 1 (essential) to E4**, at no extra action (A36).
5. E2 @ L2-O2 (10, Sly loud / Charm, unwatched), after E5 opened O1 (A13): **signature switch** to Nimble (1 charge, 3→2) to dodge the loud Sly d10 and the Charm d6. Nimble d12 + Mask d6 = 11+5 = **16** vs 10 → **Success** · n/a · 0→0 · [R22]. **Item 2 (essential) to E2.**

**Turn 3**
1. **Group check, F-O1** (12, Sly / Wits loud, unwatched, group). Item 1 is in hand, so S7 allows the attempt. E1 and E4 cross together because the Huge piece needs both.
   - E4: **signature open** (Charm; 1 charge, 3→2) gives Difficulty 10. Charm d12 + Mask d6 = 10+3 = **13** → **Success**.
   - E1: **Gift open** (Charm) **plus its own signature raise**, Charm d10 to d12 (2 charges, 3→1; A9: R2 limits raises only, not abilities), at Difficulty 10. Charm d12 + Mask d6 = 12+6 = **18** → **Success** (no doubles).
   - Suspicion rises once, by the worst result (A17): there was none. 0→0 · [R23]. Both reach the piece.
2. E2 (from L2) and E7 (from L4) arrive at Location 3 (watched). One check (A15): d6=2, nothing. [R24]
3. E5 moves L2 → L1 as a spare carrier in case the group check failed. L1 is unwatched.

**Turn 4**
1. E7 @ L3-O1 (10, Sly, watched): **Gift open** (Brawn; 1 charge, 2→1) gives Difficulty 8. The **Castle Duty K3 raise** (PLACEHOLDER; Item 3 is K3) makes Brawn d10 a d12. Brawn d12 + Mask d6 = 10+5 = **15** vs 8 → **Success** · n/a · 0→0 · [R25]. **Item 3 (extra) to E7**, who now carries Items 3 and 4 (A40: no carrying limit for small loot).
2. E1 and E4 pick up the Huge piece (no action spent, A36) and start the move to the way out. It takes two Turns (S7): 1 of 2.
3. E2 waits at L3 and E5 waits at L1, so that everyone arrives at the way out together and shares one Tell check (A15).
- End of T4: **all 4 list items and the Huge furniture in hand, Suspicion 0.**

**Turn 5**
- The carriers finish their move (2 of 2). E2 and E7 come from L3 and E5 from L1. All five arrive at the way out (watched). One check: d6=1, nothing. [R26] Suspicion 0→0.

**Turn 6**
- **Exit** (8, Sly / Nimble / Brawn loud, watched). All five are present (A21). E2 rolls for the party with Nimble d12 + **Monster d10**, a bold choice: Trouble chance 8% against 14% with the Mask. E7 spends **signature hidden** on E2's roll (P7; 1 charge, 1→0). Roll: 11+5 = **16** vs 8 → **Success** · Monster would not have shown anyway (5 < 11), so the charge was wasted in hindsight · 0→0 · [R27]. **Everyone is out.**

**End state:** Items 1 and 2 (both essentials) plus Items 3 and 4, and 1 Huge furniture piece. Nobody left behind. Suspicion 0/15. Turn 6/12. Charges left: E1 1, E2 2, E4 2, E5 3, E7 0, so **8 of 15 unspent** (and lost). No Costs, no Trouble, no Criticals, no Monster shows, no Tells.

### 2.1 Branch S: stricter A7 and A13, bold Monster die (from the end of T1; real dice R28–R38)
Readings changed: no chaining within a Turn (A13), and "open" only with a trait the obstacle does not list (A7). New policy: the Monster die whenever the Mask's success chance is below 70%.

| Turn | Roll | Suspicion |
|---|---|---|
| T2 | E1 L1-O1 Brawn d12+Mask 11+3=14 vs 8 S [R28]. E5 L2-O1 Wits d12+Mask 5+3=8 vs 8 S [R29]. E7 L4-O1 Brawn d10+**Monster** 8+9=17 S, **Monster shows (9>8) +2**, Item 4 [R30] | 0→2 |
| T3 | E4 L1-O2 Charm d12+Mask 7+4=11 S, Item 1 [R31]. E2 L2-O2 switch Nimble d12+Monster 9+7=16 vs 10 S, no show, Item 2 [R32]. E7 to L3: **Tell goes off** (d6=6), Tell E +1 [R33] | 2→3 |
| T4 | Group F-O1: E4 open Charm d12+Monster 11+3=14 vs 10 S; E1 open+raise Charm d12+Monster 7+6=13 S; no shows [R34]. E7 L3-O1 open Brawn (Sly not listed, so allowed) + Duty raise d12+Mask 6+3=9 vs 8 S, Item 3 [R35]. E2 to L3, Tell no [R36]. E5 to L1 | 3 |
| T5–T6 | Carriers move 2 Turns, the rest move on T6. Tell at the way out: no [R37] | 3 |
| T7 | Exit: E2 Nimble d12+Monster, E7 hidden: 11+2=13 vs 8 S [R38] | 3 |

**Grand Year, T7, Suspicion 3.** Difference from the main line: one Turn slower, +3 Suspicion, and one Monster show. The outcome is the same.

### 2.2 Branch S2: strictest readings (from the end of T1; R39–R49)
Readings: **each Entity must cross every obstacle itself** (A1, so every shared crossing is a group check); no chaining within a Turn (A13); open only on unlisted traits (A7); **no Castle Duty edge** (A6); **"lose a Turn" advances the night clock** (A18); bold Monster policy. T1 is the same, except that at T2 E2 leaves L2 for L3.

| Turn | Roll | Suspicion |
|---|---|---|
| T2 | Group L1-O1: E1 Brawn d12+Mask 9+4=13 S; E4 Brawn d10+Monster 9+5=14 S, no show [R39]. E5 L2-O1 Wits d12+Mask 11+6=17 S [R40]. E7 L4-O1 Brawn d10+Monster 6+2=8 vs 8 S, no show, Item 4 [R41]. E2 to L3, Tell no [R42] | 0 |
| T3 | Group L1-O2: E4 Charm d12+Mask 7+5=12 S; E1 Charm d10+Monster 7+3=10 S, no show, Item 1 to E4 [R43]. E5 L2-O2 open Nimble d10+Monster @8: 7+5=12 S, Item 2 [R44]. E2 L3-O1 Gift raise Sly d12+Monster @10: 10+5=15 S, Item 3 [R45]. E7 to L1 | 0 |
| T4 | **Group F-O1:** E4 open Charm d12+Monster @10: 2+8=10 **Success, Monster shows (8>2)**; E1 open+raise Charm d12+Monster: 7+1=8 → **Cost** [R46]. The group raises Suspicion once by the worst result: **+2** (A17). For E1's Cost the Storyteller can't usefully pick "Suspicion +1", because the group's single raise would absorb it (A25). "Drop an item" is unclear because E1 carries nothing and E4 does (A26). So the Storyteller picks **"lose a Turn"**, which under this branch's reading means **T5 is lost for everyone**. E7 (backup carrier) L1-O1 Brawn d10+Monster 2+2=4 → **Trouble** (doubles on a failure, nothing), unwatched so no chase, +1 [R47] | 0→2→3 |
| T5 | *lost to the Cost* | 3 |
| T6–T7 | Carriers move 2 Turns, the rest move on T7. Tell at the way out **goes off** (d6=4), Tell B (E2) +1 [R48] | 3→4 |
| T8 | Exit: E2 Nimble d12+Monster, E7 hidden: 7+10=17 S. The Monster *would* have shown (10>7), and hidden saved +2 [R49] | 4 |

**Grand Year, T8, Suspicion 4.** The strict readings cost 2 Turns and 4 Suspicion and doubled the L1 rolls (6 instead of 3) but did not change the outcome in this town.

### 2.3 Drill D1: local chase, capture, slipping free (R50–R57)
**Start (chosen, NOT rolled):** the main line at the end of T5, everyone at the way out, Suspicion 0. Charges: E1 1, E2 2, E4 2, E5 3, E7 1. On T6, E2's exit roll (with the Mask, no ability) is taken to be **Trouble**. Everything after that is real dice.

- **T6.** Exit Trouble: Suspicion 0→1. E2 is caught in front of witnesses, so a **local chase** starts (A28), within T6 (R5). Lead 1, escape at 4. Mob Difficulty = 10 + half of 1 → **10** (rounded down, recomputed each round; A32). E2 carries Item 2.
  - Weakness (PLACEHOLDER): d6=1, not brought [R50].
  - Round 1: ground d6=2, Nimble/Brawn [R51]. E2 rolls Nimble d12 + Monster d10 (Monster nearly doubles the escape odds; §3). 1+4 = **5** vs 10 → **Trouble**, and the **Monster shows** (4 > 1) [R52]. Lead 1→0: **cornered and captured.** Suspicion: Trouble +1 and the Monster +2 make one roll with biggest trigger +2 (A10), so 1→3.
  - **The town takes back what E2 carried (R3): Item 2, an essential.** Where it goes is not said (A11). Ruling: it returns to Location 2, whose obstacles stay passed.
  - E2 is held at the lock-up (12, Sly / Brawn loud, watched). The party plans a rescue: E4 (signature open, Charm, at 10) and E7 to go to the lock-up. The rescue rules are unclear (A20).
- **T7.** E2 tries to **slip free** first (A19: I used the lock-up's traits at the lock-up's Difficulty). Gift raise on Sly d10 → d12 (1 charge, 2→1), plus Monster d10: 5+9 = **14** vs 12 → **Success**, but the **Monster shows** (9>5) [R53]. E2 is free, at the lock-up. Suspicion 3→5. Because E2 got out, the rescue team stays put (the A13 order). E5 goes to L2 (watched): Tell d6=1, nothing [R54].
- **T8.** E5 picks Item 2 back up, which costs the action (by analogy with S3, A36). E2 goes from the lock-up to the way out: Tell d6=2, nothing [R55].
- **T9.** E5 goes to the way out: **Tell goes off** (d6=5), Tell D +1 [R56]. Suspicion 5→6.
- **T10.** Exit: E2 Nimble d12 + Monster, with E7's hidden (1→0): 9+7 = **16** vs 8 → Success [R57]. Everyone is out.
- **Result: Grand Year, T10, Suspicion 6.** **Branch A11 (taken-back loot is gone for good):** Item 2, an essential, is missing, so at best a Partial. 3 of 4 items are home, at least half, so **Partial**; the furniture can't lift it, because Grand Year needs a Win. *The one ruling swings Grand Year to Partial.*

### 2.4 Drill D2: dawn final flight (R58–R76)
**Start (chosen, NOT rolled):** the main line state at the end of T5. All five are at the way out. E1 and E4 carry the Huge piece. E4 carries Item 1, E2 Item 2, E7 Items 3 and 4. Charges: E1 1, E2 2, E4 2, E5 3, E7 1. Then **dawn** arrives, which starts the final flight for everyone in town (P5). Everything after that is real dice.

Setup: Lead 2, escape at 6, mob **11**, everyone rolls the Monster d10, and Suspicion stops (S1). Weakness (PLACEHOLDER) [R58]: E1 3 no, E2 3 no, **E4 5 yes**, E5 4 no. **E7 sunlight: brought (dawn flight).** Carriers roll Nimble one size smaller. Every step down floors at d4 (R6).

| Round | Ground | Rolls (trait + Monster d10 vs 11 unless noted) | S / T | Lead |
|---|---|---|---|---|
| 1 [R59–60] | 3 N/C | E1 Gift **open** Charm d10 @9: 3+10=13 **S** · E2 Nimble d12: 1+6=7 **T** · E4 (Weak) sig **open** Charm d12→d10 @9: 5+1=6 **T** · E5 Gift **open** Nimble d10 @9: 4+2=6 **T** · E7 (sun) Nimble d12→d10, **E2's raise** → d12: 11+6=17 **S** | 2 / 3 | 2→**1** |
| 2 [R61–62] | 3 N/C | E1 **overdraws** Gift open, so **E1's Weakness is now in play**: Charm d10→d8 @9: 8+4=12 **S** · E2 Nimble d12: 9+4=13 **S** · E4 (Weak) sig open Charm d10 @9: 5+4=9 **S** · E5 Gift open Nimble @9 + **E2's raise** → d12: 4+5=9 **S** · E7 (sun) Gift **open** Brawn d10→d8, **E5's raise** → d10, @9: 10+8=18 **S** | 5 / 0 | 1→**2** |
| 3 [R63–64] | 1 N/S | *All charges spent.* E1 Sly d4 (Weak, floor): 4+1=5 **T** · E2 Nimble d12: 12+10=22 **S** · E4 Sly d8→d6: 2+7=9 C · E5 Nimble d10: 1+9=10 C · E7 Nimble d10 (sun): 2+4=6 **T** | 1 / 2 | 2→**1** |
| 4 [R65–66] | 5 S/C | E1 Charm d8: 4+5=9 C · E2 Sly d10: 3+3=6 **T** · E4 Charm d10: 8+9=17 **S** · E5 **overdraws** Gift open, Weakness now in play, Nimble d10→d8 @9: 2+9=11 **S** · E7 Sly d6: 1+4=5 **T** | 2 / 2 | **1** |
| 5 [R67–68] | 5 S/C | E1 Charm d8: 5+10=15 **S** · E2 Sly d10: 2+1=3 **T** · E4 Charm d10: **8+8=16, CRITICAL (counts as 2)** · E5 Charm d8→d6: 4+5=9 C · E7 Sly d6: 3+3=6 **T** | 3 / 2 | 1→**2** |
| 6 [R69–70] | 2 N/B | E1 Brawn d12→d10: 1+1=2 **T** · E2 Nimble d12: 4+1=5 **T** · E4 Brawn d10→d8: 5+10=15 **S** · E5 Nimble d10→d8: 1+5=6 **T** · E7 Nimble d10: 1+7=8 **T** | 1 / 4 | 2→**1** |
| 7 [R71–72] | 4 N/W | E1 Wits d8→d6: 1+1=2 **T** · E2 Nimble d12: 7+1=8 **T** · E4 Wits d4: 4+7=11 **S** · E5 Wits d12→d10: 5+10=15 **S** · E7 Nimble d10: 6+10=16 **S** | 3 / 2 | 1→**2** |
| 8 [R73–74] | 4 N/W | E1 Wits d6: 2+7=9 C · E2: 1+4=5 **T** · E4 Wits d4: 4+1=5 **T** · E5 Wits d10: 1+9=10 C · E7: 2+3=5 **T** | 0 / 3 | 2→**1** |
| 9 [R75–76] | 1 N/S | E1 Sly d4: 2+6=8 **T** · E2 Nimble d12: 3+3=6 **T** · E4 Sly d6: 3+4=7 **T** · E5 Nimble d8: 2+9=11 **S** · E7 Nimble d10: 1+3=4 **T** | 1 / 4 | 1→**0** |

**Cornered: FORKED.** It took 9 rounds and 45 Entity rolls: 17 Successes (one Critical), 6 Costs and 22 Troubles (49%, well above the 28–35% expected). Decisions and notes:
- All charges went in rounds 1–2, mostly on **open** (Difficulty 11 → 9, A8), which was the best use by far.
- Overdraw was worth it only with open. A raise or switch overdraw never helps the roll that pays for it, because the Weakness applies at once (A22).
- E4 and E7 could never overdraw, because their Weakness was already in play (A34).
- **The carriers never dropped the Huge piece. Carrying cost them nothing, because Weakness had already floored their Nimble at d4 (A35).**
- Hidden is useless once the hunt is on (A44).

**Exact odds for comparison** (computed, not rolled; no abilities): this party at full strength escapes a final flight from Lead 2 in **94.5%** of cases (mean 6.8 rounds). In D2's weakened state from round 5 it escapes in **81.6%** (mean 8.7 rounds). With 3 Entities at full strength the figure is 88.0%, and with 4 it is 92.7%. The mob's Difficulty doesn't change with party size, but the escape chance does. **D2 was an unlucky run, at roughly 1 in 5.**

---

## 3. Result and how it felt

**Result (main line): GRAND YEAR.** All four list items and a Huge furniture piece were home on Turn 6 of 12, with Suspicion 0 of 15, nobody caught and 8 of 15 charges unspent.

- **Hard didn't play hard.** The rolled town had only 6 list obstacles, mostly Difficulty 8. Five Entities cover every trait with a d12 or d10, and splitting three ways meant the 12-Turn clock never pressed. In the main line 8 obstacle rolls (plus the exit) gave 8 passes. 4 of those 8 used **open** (−2 Difficulty on the Entity's best die, A7), and one used switch. **No loud option was ever taken:** a quiet ability route was always on hand, so R1 never fired (A16). Even the strictest readings (S2) only added 2 Turns and 4 Suspicion.
- **The tension sits entirely in being caught and in the final flight, and both are knife-edge.**
  - A local chase starts at Lead 1, so the first Trouble before any Success means capture. D1's E2 was captured on its very first roll.
  - Exact odds, escaping from Lead 1 with a d12 trait: 51% with the Mask and 76% with the Monster against mob 10; 19% and 51% against mob 12. The local mob reaches its cap of 12 by Suspicion 4.
  - So the Monster die is almost forced in a local chase, but each time it shows it adds +2 Suspicion, and with it +1 to the mob's Difficulty. That is a nice spiral, but it is harsh.
- **The final flight is long.** About 7–9 rounds × 5 players is 35–45 rolls with no decisions after the charges run out (round 2). It swings: Lead 1↔2 seven times in D2. It felt like a slot machine once the charges were gone.
  - Overdraw in the hunt is mostly a trap, unless it pays for an open (A22).
  - Weaknesses stacked fast: 2 at the start (mob + sunlight) and 2 more from overdraw by round 4.
- **Decisions that mattered:**
  - The three-way split on T1.
  - Using switch and open to dodge loud traits and small dice.
  - E1 stacking open + raise to beat the Difficulty 12 furniture obstacle (A9).
  - Hidden on the exit roll. Insurance; it mattered in S2, where the Monster rolled 10.
  - In D1, the order within the Turn (E2 slips free before the rescuers commit).
- **Carrying the Huge piece had no tension.** No roll is required while carrying, and the only cost is the two-Turn move, which is free when Turns are spare. In the flight, the carriers' Nimble penalty vanished under the d4 floor.
- **Charges:** 8 of 15 unspent in the main line, 9 of 15 in Branch S and 9 of 15 in S2. E5 spent nothing in the main line. Charges are spent only in a crisis, which is consistent with the Heisty Spideys hoarding lesson.

---

## 4. Ambiguity table (most severe first)

Severity: **blocker** = I can't play on without a ruling; **major** = changes outcomes or balance; **minor** = wording or clarity. *Content* means missing content the rules already flag as still to be written.

| id | sev | Passage (quoted from core rules 1.0) | What I did | Suggested fix |
|---|---|---|---|---|
| A1 | **blocker** | "Several Entities may try the same obstacle in one Turn; each try risks Trouble [R7]." / "when the party crosses the same obstacle together, everyone rolls and gets through on their own result" | The text never says whether one Entity's pass opens an obstacle for the others, or who must cross to reach the loot or a furniture piece. Main: a normal obstacle stays open for everyone once anyone passes; my "group" obstacles need each crosser's own result. **S2:** everyone crosses everything; L1 rolls doubled, +2 Turns, +4 Suspicion | Say "An obstacle stays passed for the party once anyone gets through it, unless it is marked *group*: then every Entity who wants past rolls (a group check)." |
| A2 | **blocker** (content) | "There are three ways to build one: a premade sequence, a map, or random tables with a difficulty budget." | No tables or budget exist, and nothing says how often obstacles are watched or group, or how trait pairs and loud ways are chosen. I wrote my own procedure (§1.3) | Write the town tables (obstacle count, trait pairs with a loud way, watched and group chances, loot) and the difficulty budget per label. |
| A3 | **blocker** (content) | "The chance is set with the Tell content [sim]." | 1 in 2 per check (from the brief). 3 Tells went off in 12 checks across all lines | Set the Tell chance (and whose Tell shows) when Tells are written. |
| A4 | **blocker** (content) | "When the mob brings each Weakness is set with the Weakness content [sim]." | The brief's placeholder (mob 5–6 per chase, sunlight at dawn) | Write it with the Weaknesses. |
| A5 | **blocker** (content) | "each round, roll on a d6 chase table." | The brief's placeholder table | Write the chase table. |
| A6 | **blocker** (content) | "a **Castle Duty** (… with a small edge tied to the shopping list …)" and R2 "Castle Duty included" | Placeholder: a free raise on rolls at the obstacles guarding a list item of the Duty's kind (main, S, D1, D2); none in S2. It turned one roll (E7 at L3) from d10 into d12 | Define the Duty edge (what it does, when, how often). |
| A7 | major | "open an approach nobody else can take, still with a roll: you roll the ability's trait at 2 lower Difficulty" | Main: allowed on an obstacle that already lists the trait (E7 Brawn at L4: Difficulty 8 → 6). S/S2: only with an unlisted trait. As played, open is a flat −2 on your best die anywhere; 4 of the 8 main-line obstacle rolls used it | Add "only with a trait the obstacle doesn't list" (that is what "nobody else can take" implies). |
| A8 | major | (same passage); Chases section silent | D2: open used in the final flight, so the mob's 11 became 9 for that roll. It was the strongest use of a charge in the flight | Say whether open works in chases (and against which Difficulty). |
| A9 | major | "A roll takes at most one raise, from any source" | Nothing limits other abilities. E1 used open + raise on one roll (Charm d12 at 10 against a 12). E5 used two abilities in one flight round (one on itself, one on E7) | Say "One ability per roll", and/or "each Entity uses at most one ability per Turn (per round in a chase)". |
| A10 | major | Chases: "Success +1, cost no change, trouble −1." vs Rolling: "Cost: … the Storyteller picks one …"; "Trouble: … Suspicion +1" | Local chase: Trouble also adds Suspicion +1 (merged with the Monster's +2 by the one-roll rule). A Cost moves nothing, and no P3 Cost is picked. Final flight: no P3 Costs. If P3 applied, D2's 6 Costs would have let the Storyteller strip items or the furniture mid-flight | Add "In a chase the Lead replaces the band effects: no Cost is picked and Trouble only moves the Lead (in a local chase the Monster showing still raises Suspicion)." |
| A11 | major | "the town takes back what you carried [R3]" | D1: Item 2 returned to Location 2, its obstacles still passed, and was re-taken for one action. **If it is gone for good, D1 drops from Grand Year to Partial** | Say where taken-back loot goes ("back to its location, obstacles still passed", or "lost for the night"). |
| A12 | major | "Tells: checked … at a watched location" / "Trouble: … witnesses catch you." / "trouble in front of witnesses starts a local chase" | "Watched" is used for both locations and obstacles, and the Trouble band says witnesses catch you unconditionally. I marked obstacles watched; a location counts as watched if any of its obstacles is; Trouble at an unwatched obstacle = +1, no chase (S2 R47) | Say "Each obstacle is watched or not; a location is watched if any of its obstacles is; Trouble where nobody watches raises Suspicion but starts no chase." |
| A13 | major | "Each Turn, every Entity either makes one roll at its location or moves" | The order within a Turn is not given. Main: one at a time in the players' order, results immediate (T2: the second obstacles were rolled right after the first were opened). S: no chaining. The main line was one Turn faster | Add "Within a Turn, Entities act one at a time in any order; each result applies at once." (or the opposite) |
| A14 | major | Same passage; "the way out of town is one watched obstacle" | Where the party arrives, whether the way out is a location, and how long moves take are not given. I ruled: start at the edge of town (not a location); any move takes 1 Turn; the way out is a watched place you move to | Add "The party arrives at the way out; any two places are one move apart unless the map says otherwise." |
| A15 | major | "checked once each time the party arrives at a watched location, for the whole party" | With a split party it is unclear what counts as one arrival. I used one check per watched place per Turn at which anyone arrives, with the Tell from a random arrival. Splitting three ways doubled the checks on T1 | Say "Check once per Turn for each watched place where one or more Entities arrive; the Tell is one of theirs." |
| A16 | major | "taking it costs +1 Suspicion whatever the result [R1]" vs "One roll raises it once, by its biggest trigger." (loud not in the Raised-by list) | Merged by the max, so the loud way is free whenever the roll shows the Monster or gets Trouble. Never tested in play: no loud option was taken in any line | Put "loud way +1" in the Raised-by list and say whether it stacks. |
| A17 | major | "Suspicion rises once, by the worst result." | Unclear what counts: the band only, or the Monster's +2 and the Cost's Suspicion pick too. S2 R46: E4 Success + Monster shows, E1 Cost. I used the biggest single trigger among the rolls (+2), with E1's Cost picked separately | Say "a group check raises Suspicion once, by the biggest single trigger among its rolls; each Cost is still picked." |
| A18 | major | "[P3: … lose a Turn …]" | Whose Turn? Main: that Entity skips its next action. S2: the night clock advances, so T5 was lost for everyone | Say "lose a Turn: you skip your next action." |
| A19 | major | "once per Turn you may try to slip free; only a Success frees you" vs "Nimble (climbing, running, slipping free)" vs lock-up "(Sly, or Brawn the loud way)" | The lock-up's traits at the lock-up Difficulty (12). E2's d12 was the same either way here, but an Entity with high Nimble and low Sly would differ hugely | Say "To slip free, roll the lock-up obstacle at the lock-up Difficulty" (and drop "slipping free" from Nimble, or make it Nimble). |
| A20 | major | "with a new rescue obstacle for each capture [R9]; the party can rescue you (costs Turns)" | The rescue obstacle's traits and Difficulty, whether a Cost frees the captive, when the freed captive acts, and whether a rescuer's Trouble starts a chase are all unstated. I planned to use the lock-up profile with Success or Cost freeing. Not reached: E2 slipped free first | Spell out the rescue obstacle (same as the lock-up?), that a Success or Cost frees the captive, who may act next Turn, and that Trouble starts a local chase for the rescuer. |
| A21 | major | "One Entity rolls for the party. A Success or Cost gets everyone out" | Must everyone be at the way out? I said yes (everyone not held). Otherwise one roll pulls the whole party out from anywhere and skips the furniture's two-Turn walk | Add "Everyone leaving must be at the way out; anyone elsewhere stays in town." |
| A22 | major | "An Entity may still overdraw, but its Weakness is then in play for the rest of the flight" | Does the step down hit the roll that overdraws? I said yes, so overdrawing a raise or switch never helps that roll for a d12; only open overdraws were worth it (D2 rounds 2 and 4) | Say whether the Weakness applies from that roll or from the next one. |
| A23 | major | "a **location** (1–3 obstacles, some loot, at least two ways in)" | Sequence or alternatives? I played the obstacles in sequence, with the ways in as fiction only. Alternatives would roughly halve the work | Say whether a location's obstacles are crossed in order, or each way in has its own obstacles. |
| A24 | major (content) | "a **Perk** (one of three passive edges)" | No effect (from the brief) | Write the Perks. |
| A25 | minor | P3 "Suspicion +1" and "One roll raises it once" | If the roll already raised Suspicion (loud way, Monster shows, a group check), the Cost's +1 vanishes, so the Storyteller avoided it (S2 R46) | Say whether a Cost's Suspicion +1 is a separate event. |
| A26 | minor | "The Storyteller picks 'drop an item' only if someone carries loot [R10]." | "Someone" or the roller? In S2 R46, E1 (Cost) carried nothing and E4 did. Not picked | Say "only if the rolling Entity carries loot; it drops one of its own items." |
| A27 | minor | "raise a die one size"; "your next roll one size smaller" | Unclear which die (trait, Mask, Monster), and what raising a d12 does. I used the trait die only, with no raise above d12 | Say "the trait die", and that "a d12 can't be raised". |
| A28 | minor | "Trouble raises Suspicion and that Entity is caught" (way out) | Is "caught" a local chase, or straight to the lock-up? D1: a local chase (the way out is watched) | Add "…caught (a local chase)". |
| A29 | minor | "A Success or Cost gets everyone out" | Does an exit Cost also take a P3 Cost (for example, an item dropped at the edge of town)? Not met | Say so. |
| A30 | minor | "[P7: an ability may target any Entity's roll at the same location.]" | Can the party help a local chase? I said no (the chased Entity has left the location) | Say who may roll or spend abilities in a local chase. |
| A31 | minor | "Reach the escape number … and you're clear" | Where is the Entity afterwards, and can it act again this Turn? Not met | Add "…you're back at your location and your Turn is over." |
| A32 | minor | "a mob of 10 + half the Suspicion (at most 12)" | Rounding, and whether it is re-read each round: I rounded down and recomputed each round. Note: the cap is reached at Suspicion 4 | Say "rounded down, checked each round". |
| A33 | minor | "(Trouble: Suspicion +1)" (slipping free) vs "trouble in front of witnesses starts a local chase"; lock-up "always watched" | No chase on a failed slip; a Cost on a slip does nothing | Say "a failed slip never starts a chase; a Cost does nothing." |
| A34 | minor | "once its Weakness is in play it can't overdraw again" | The word "again" implies an earlier overdraw. I said a mob-brought Weakness also blocks overdraw (E4, E7 in D2) | Say "can't overdraw while its Weakness is in play." |
| A35 | minor | "roll Nimble one size smaller" (carriers) + Weakness + "No die goes below a d4; further steps down are lost [R6]" | Stacked steps floor at d4, so weakened carriers pay nothing for carrying (E1 and E4 in D2) | Check whether the R6 floor is meant to erase the carrying penalty. |
| A36 | minor | (silent) | Picking up loot or furniture: no action after passing the last obstacle; re-taking taken-back loot cost 1 action (by analogy with S3) | Say whether taking loot or a piece costs an action. |
| A37 | minor | "Huge pieces don't fit small entrances." | Which entrances are small is not said; I rolled for them (none small) | Mark small entrances in the town tables or map. |
| A38 | minor | "at least one piece of furniture or decor" | "Decor" is defined nowhere | Define decor or drop it. |
| A39 | minor | "some loot" | Loot that isn't on the list has no use | Say what extra loot does (or drop it). |
| A40 | minor | (silent) | No limit on small loot; E7 carried two items | Say whether small loot has a carrying limit. |
| A41 | minor | "flee together on one shared Lead (majority rule)" | "Majority rule" is undefined. Not met (no multiple catch) | Spell it out (like the final flight: successes vs Troubles?). |
| A42 | minor | "At the Limit … Every Entity who isn't captured flees together in the final flight." | What if the Limit is reached mid local chase? Not met (D1 peaked at 6 of 15) | Say "a local chase in progress ends; everyone joins the final flight at its Lead". |
| A43 | minor | "once the mob brings your Weakness, you roll your trait one size smaller in the chase" | This chase only, or the rest of the night? I used this chase only | Say how long it lasts. |
| A44 | minor | "roll the Monster die without risking Suspicion"; "From then on Suspicion stops" | "Hidden" abilities are dead once the hunt is on, and a raise is dead on a d12 trait | Consider giving hidden a hunt effect, or note it. |

---

## 5. Roll appendix
All dice from `node` (Math.random) via a logging script. R1 printed its faces after the dice list; R2 onwards prints `dN=face`. R1 and R2 were rolled before the log moved to its own folder; nothing was re-rolled. Abbreviations: S Success, C Cost, T Trouble; N/S/B/C/W = Nimble/Sly/Brawn/Charm/Wits.

| # | For | Dice | Faces |
|---|---|---|---|
| R1 | Party pick (d8, reroll duplicates) | 8×d8 | 4 4 1 7 4 4 2 4 (→ E4, E1, E7, E2) |
| R2 | 5th Entity | 4×d8 | 5 2 2 8 (→ E5) |
| R3 | Gifts E1 E2 E4 E5 E7 | 5×d3 | 3 1 1 3 3 |
| R4 | Castle Duties (reroll duplicates) | 10×d6 | 6 2 6 4 1 1 3 4 3 5 (→ K6 K2 K4 K1 K3) |
| R5 | Item kinds 1–4 | 4×d6 | 3 5 3 5 |
| R6 | Obstacle counts L1–L4 | 4×d3 | 2 2 1 1 |
| R7 | L1-O1: Diff, #traits, trait, trait, loud, watched, group | d20 d2 d5 d5 d2 d6 d6 | 2 1 1 4 2 5 2 |
| R8 | L1-O2 | same | 5 1 4 5 2 4 3 |
| R9 | L2-O1 | same | 1 2 1 5 1 3 2 |
| R10 | L2-O2 | same | 14 2 3 4 1 5 3 |
| R11 | L3-O1 | same | 13 1 3 1 2 3 1 |
| R12 | L4-O1 | same | 8 1 1 4 2 2 1 |
| R13 | Furniture location, size | d4 d2 | 1 2 |
| R14 | F-O1 | d20 d2 d5 d5 d2 d6 d6 | 19 2 3 5 2 4 6 |
| R15 | Small entrances: L1 A, L1 B, way out | 3×d6 | 6 5 4 |
| R16 | T1 Tell L2, whose | d6 d2 | 3 2 |
| R17 | T1 Tell L4 | d6 | 2 |
| R18 | T2 E1 L1-O1 | d12 d6 | 10 4 |
| R19 | T2 E5 L2-O1 | d12 d6 | 11 2 |
| R20 | T2 E7 L4-O1 (open) | d10 d6 | 7 2 |
| R21 | T2 E4 L1-O2 | d12 d6 | 4 5 |
| R22 | T2 E2 L2-O2 (switch) | d12 d6 | 11 5 |
| R23 | T3 group F-O1: E4, E1 | d12 d6 d12 d6 | 10 3 12 6 |
| R24 | T3 Tell L3, whose | d6 d2 | 2 1 |
| R25 | T4 E7 L3-O1 (open + Duty) | d12 d6 | 10 5 |
| R26 | T5 Tell way out, whose | d6 d5 | 1 3 |
| R27 | T6 exit E2 (Monster, hidden) | d12 d10 | 11 5 |
| R28 | S T2 E1 L1-O1 | d12 d6 | 11 3 |
| R29 | S T2 E5 L2-O1 | d12 d6 | 5 3 |
| R30 | S T2 E7 L4-O1 | d10 d10 | 8 9 |
| R31 | S T3 E4 L1-O2 | d12 d6 | 7 4 |
| R32 | S T3 E2 L2-O2 | d12 d10 | 9 7 |
| R33 | S T3 Tell L3 (E7) | d6 | 6 |
| R34 | S T4 group F-O1: E4, E1 | d12 d10 d12 d10 | 11 3 7 6 |
| R35 | S T4 E7 L3-O1 | d12 d6 | 6 3 |
| R36 | S T4 Tell L3 (E2) | d6 | 3 |
| R37 | S T6 Tell way out, whose | d6 d5 | 2 1 |
| R38 | S T7 exit | d12 d10 | 11 2 |
| R39 | S2 T2 group L1-O1: E1, E4 | d12 d6 d10 d10 | 9 4 9 5 |
| R40 | S2 T2 E5 L2-O1 | d12 d6 | 11 6 |
| R41 | S2 T2 E7 L4-O1 | d10 d10 | 6 2 |
| R42 | S2 T2 Tell L3 (E2) | d6 | 1 |
| R43 | S2 T3 group L1-O2: E4, E1 | d12 d6 d10 d10 | 7 5 7 3 |
| R44 | S2 T3 E5 L2-O2 (open) | d10 d10 | 7 5 |
| R45 | S2 T3 E2 L3-O1 (raise) | d12 d10 | 10 5 |
| R46 | S2 T4 group F-O1: E4, E1 | d12 d10 d12 d10 | 2 8 7 1 |
| R47 | S2 T4 E7 L1-O1 | d10 d10 | 2 2 |
| R48 | S2 T7 Tell way out, whose | d6 d5 | 4 2 |
| R49 | S2 T8 exit | d12 d10 | 7 10 |
| R50 | D1 E2 Weakness | d6 | 1 |
| R51 | D1 round 1 ground | d6 | 2 |
| R52 | D1 round 1 E2 | d12 d10 | 1 4 |
| R53 | D1 T7 E2 slip free | d12 d10 | 5 9 |
| R54 | D1 T7 Tell L2 (E5) | d6 | 1 |
| R55 | D1 T8 Tell way out (E2) | d6 | 2 |
| R56 | D1 T9 Tell way out (E5) | d6 | 5 |
| R57 | D1 T10 exit | d12 d10 | 9 7 |
| R58 | D2 Weakness E1 E2 E4 E5 | 4×d6 | 3 3 5 4 |
| R59 | D2 r1 ground | d6 | 3 |
| R60 | D2 r1 E1, E2, E4, E5, E7 (trait, Monster each) | d10 d10 d12 d10 d10 d10 d10 d10 d12 d10 | 3 10 · 1 6 · 5 1 · 4 2 · 11 6 |
| R61 | D2 r2 ground | d6 | 3 |
| R62 | D2 r2 | d8 d10 d12 d10 d10 d10 d12 d10 d10 d10 | 8 4 · 9 4 · 5 4 · 4 5 · 10 8 |
| R63 | D2 r3 ground | d6 | 1 |
| R64 | D2 r3 | d4 d10 d12 d10 d6 d10 d10 d10 d10 d10 | 4 1 · 12 10 · 2 7 · 1 9 · 2 4 |
| R65 | D2 r4 ground | d6 | 5 |
| R66 | D2 r4 | d8 d10 d10 d10 d10 d10 d8 d10 d6 d10 | 4 5 · 3 3 · 8 9 · 2 9 · 1 4 |
| R67 | D2 r5 ground | d6 | 5 |
| R68 | D2 r5 | d8 d10 d10 d10 d10 d10 d6 d10 d6 d10 | 5 10 · 2 1 · 8 8 · 4 5 · 3 3 |
| R69 | D2 r6 ground | d6 | 2 |
| R70 | D2 r6 | d10 d10 d12 d10 d8 d10 d8 d10 d10 d10 | 1 1 · 4 1 · 5 10 · 1 5 · 1 7 |
| R71 | D2 r7 ground | d6 | 4 |
| R72 | D2 r7 | d6 d10 d12 d10 d4 d10 d10 d10 d10 d10 | 1 1 · 7 1 · 4 7 · 5 10 · 6 10 |
| R73 | D2 r8 ground | d6 | 4 |
| R74 | D2 r8 | d6 d10 d12 d10 d4 d10 d10 d10 d10 d10 | 2 7 · 1 4 · 4 1 · 1 9 · 2 3 |
| R75 | D2 r9 ground | d6 | 1 |
| R76 | D2 r9 | d4 d10 d12 d10 d6 d10 d8 d10 d10 d10 | 2 6 · 3 3 · 3 4 · 2 9 · 1 3 |

*In D2 rows the faces are paired per Entity in the order E1 · E2 · E4 · E5 · E7, each as trait die then Monster d10.*
