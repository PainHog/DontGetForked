# PT3: Standard raid, 3 Entities (verification playtest after the fix round)

## 1. Placeholder warning

> **PLACEHOLDER WARNING.** This playtest uses stand-in content that is **not game content** and was never approved by Richard. The Entities are the anonymous placeholders E1–E8 (dice, abilities, Gift options and Weakness type from the simulator's stand-in roster). The town, item kinds K1–K6, Castle Duties and their edge, the Tell chance, Weakness timing and the chase table were all set by the playtest brief or rolled by my own procedure. Perks have no effect. Every use is marked PLACEHOLDER. Read the numbers as tests of the **rules text** (core rules 1.2 snapshot, 2026-10-05), not as balance verdicts on real content.

Rules source: the rulebook text snapshot only (`RULES-SNAPSHOT.md`, v0.1 source, core rules 1.2). Every random result is a real `Math.random` roll (204 rolls, appendix in section 8). Drills are labelled, and each says exactly what I chose. Every roll after a drill's chosen start is real.

---

## 2. Summary

| Line | What it puts through the text | Result | Turn | Suspicion |
|---|---|---|---|---|
| **Main line** | A full raid, played to win | **Grand Year** (Items 1, 3, 4 and the Bulky piece; one extra missing) | out on Turn 10 | 5 of 13 |
| D1 drill: together at L4 | Tell with two arrivals; a group check (two Entities roll one group obstacle in one Turn); open + raise on one roll | L4's loot and the piece in hand (drill stops) | Turn 3 | 1 |
| D2 drill: Duty stack | Switch + Duty raise + hidden on one roll; a second raise refused | Item 2 taken (drill stops) | Turn 8 | 5 |
| D3 drill: bad exit | Trouble on the exit → local chase → capture (loot gone) → slipping free (Nimble) → a Cost on the exit | **Partial** (2 of 4, essential lost) | out on Turn 12 | 8 |
| D4 drill: caught together | Two caught by one group check → shared local chase → the Limit arrives mid-chase → final flight with Weakness and three overdraws | **Partial** (escaped in flight round 4) | Turn 8 | 13 (Limit) |
| D5 drill: rescue at dawn | A rescue with open at the lock-up → dawn flight with sunlight and mob Weaknesses, nobody allowed to overdraw | **Partial** (escaped in flight round 5) | dawn after Turn 12 | 11 |

**Fix targets and where each was exercised**

| Target | Where | Rolls |
|---|---|---|
| Group obstacles vs shared obstacles | Main line (L1 ob2 group, crossed by E7 alone; shared obstacles beaten once for all at L1, L2, L3, L4) | R137–R147 |
| Group check (several roll one group obstacle in one Turn) | D1 (L4 way A, both rolled); D4 (chosen start: both in Trouble) | R150–R151 |
| Two ways in, crossing in order, loot into hand | Main line (way A at L1, L3, L4; way B at L2; loot into hand on a Success and on a Cost) | R134–R147 |
| Tells for a split party | Main line T1 (three places at once) and T5 (L2); D1 (two arrive together) | R131–R133, R144, R149 |
| Leaving town together | Main line (all at the way out, one roll) | R148 |
| Trouble on the exit (a local chase) | D3 (chosen start) | R155–R156 |
| A Cost on the exit | D3 (rolled) | R158 |
| Open only with an unlisted trait; never in a chase | Main line (E1 Charm at L3 way A and L2 ob2; E6 Sly at L4 way A and the furniture); D5 (lock-up). Barred in all chases (D3–D5), which stopped E1 and E6 using their Gifts there | R135, R136, R142, R143, R147, R182 |
| Raises on the trait die only; several abilities, one raise | D1 (open + raise); D2 (switch + Duty raise + hidden; E1's raise refused); D4 (two overdraws on one roll, stepped down then raised) | R153, R154, R180 |
| Costs: never one that costs nothing | Every Cost choice below says why it costs something | R139, R140, R145, R147, R152 |
| "Drop an item" drops the roller's own loot | Main line T6 (E7 dropped Item 1) | R145 |
| Local chase, capture, loot gone | D3 (E7 cornered in one roll; Item 1 gone) | R156 |
| Slipping free | D3 (Nimble) | R157 |
| A rescue | D5 (open Charm at the lock-up) | R182 |
| The Limit during a local chase | D4 | R163 |
| Dawn during a local chase | Can't happen by the text (see m13) | — |
| Final flight with overdraw and Weakness | D4 (mob Weakness rolled; three overdraws); D5 (sunlight + two mob Weaknesses; overdraw barred) | R164–R204 |

---

## 3. Setup

### 3.1 Party (PLACEHOLDER Entities, rolled R1–R10)

d8 picks: E6 (R1), E7 (R2), E6 again (R3, reroll), E1 (R4). Each has 3 charges.

| Entity | Brawn | Nimble | Sly | Charm | Wits | Signature | Gift (rolled) | Castle Duty (rolled) | Weakness |
|---|---|---|---|---|---|---|---|---|---|
| E1 | d12 | d6 | d4 | d10 | d8 | raise | open, with Charm (R7) | K5: no list item of that kind (R10) | mob |
| E6 | d12 | d8 | d10 | d4 | d6 | switch to Brawn | open, with Sly (R5) | K3: no list item (R8) | mob |
| E7 | d10 | d12 | d8 | d6 | d4 | hidden Monster | switch to Brawn (R6) | K4: Item 2, at L2 (R9) | sunlight |

The party is Brawn-heavy: three abilities can turn any roll into a Brawn d12 or d10.

### 3.2 Shopping list (R11–R15)

Standard: 4 items, 1 essential (R11 = 1).

| Item | Kind (PLACEHOLDER) | Essential? | Location |
|---|---|---|---|
| Item 1 | K2 | **essential** | L1 |
| Item 2 | K4 (E7's Duty) | extra | L2 |
| Item 3 | K1 | extra | L3 |
| Item 4 | K6 | extra | L4 |

A Win needs Item 1 plus two of the three extras.

### 3.3 Town (my procedure, all rolled: R16–R130)

Procedure as briefed: d3 obstacles per location; the first obstacle comes in two versions (way A, way B), each rolled separately; Difficulty by d20 (1–3 → 6, 4–13 → 8, 14–19 → 10, 20 → 12); d2 traits, each on a d5 (rerolling repeats); with two traits, a d2 picks the loud one; watched on a d6 of 1–3; group on a d6 of 1–2. If way B rolled the same traits as way A, I rerolled way B's traits (R83 → R84–R85), since the snapshot says "with different traits".

**L1, Item 1 (essential).** 3 obstacles. Counts as watched (only through way B; see M7).

| Obstacle | Diff | Traits | Watched | Group |
|---|---|---|---|---|
| Way A | 8 | Brawn (loud) / Sly | no | shared |
| Way B | 8 | Wits | yes | shared |
| 2 | 6 | Nimble / Wits (loud) | no | **group** |
| 3 (loot) | 6 | Nimble / Charm (loud) | no | shared |

**L2, Item 2.** 3 obstacles. Counts as watched (only through way A).

| Obstacle | Diff | Traits | Watched | Group |
|---|---|---|---|---|
| Way A | 12 | Wits / Sly (loud) | yes | **group** |
| Way B | 6 | Wits / Nimble (loud) | no | shared |
| 2 | 8 | Sly (loud) / Wits | no | shared |
| 3 (loot) | 10 | Wits (loud) / Charm | no | **group** |

**L3, Item 3.** 3 obstacles. Counts as watched (only through way B).

| Obstacle | Diff | Traits | Watched | Group |
|---|---|---|---|---|
| Way A | 6 | Nimble | no | **group** |
| Way B | 8 | Charm | yes | **group** |
| 2 | 8 | Charm (loud) / Brawn | no | shared |
| 3 (loot) | 8 | Charm / Wits (loud) | no | shared |

**L4, Item 4, and the furniture.** 2 obstacles plus the furniture's extra obstacle. Watched (both ways in).

| Obstacle | Diff | Traits | Watched | Group |
|---|---|---|---|---|
| Way A | 8 | Charm (loud) / Brawn | yes | **group** |
| Way B | 8 | Sly | yes | **group** |
| 2 (loot) | 6 | Wits | no | shared |
| Furniture (Bulky, R121–R122) | 10 | Wits | no | **group** |

Small entrances (R128–R130): L4's ways in are not small; **the way out is small**. That doesn't matter, because the piece is Bulky and only Huge pieces are blocked.

**Fixed parts (Standard):** way out: Difficulty 8, Sly or Nimble, or Brawn the loud way, watched. Lock-up: Difficulty 10. Rescue: Sly, or Brawn the loud way, always watched. Slipping free: Sly or Nimble, or Brawn the loud way. Local chase: Lead 1, escape 4, mob 10 + half Suspicion (round down), at most 12. Final flight: Lead 2, escape 6, mob 11. Limit 13. 12 Turns.

Difficulty mix rolled: 16 obstacles: five at 6 (31%), eight at 8 (50%), two at 10 (13%), one at 12 (6%). That's easier than the 15/50/30/5 target, by chance.

### 3.4 Placeholder rules used (from the brief)

- **Duty edge (PLACEHOLDER):** a free raise of the trait die on the Duty holder's own rolls at the obstacles of a list item of its kind; it counts as the roll's one raise. Only E7 had a match (K4, L2).
- **Tell chance (PLACEHOLDER):** a d6 of 4–6 per check; if several arrive, roll for whose Tell.
- **Weakness timing (PLACEHOLDER):** mob type is brought on a d6 of 5–6 at the start of each chase (local chases included); sunlight type only in a dawn flight (always there).
- **Chase table (PLACEHOLDER, d6):** 1 Nimble/Sly · 2 Nimble/Brawn · 3 Nimble/Charm · 4 Nimble/Wits · 5 Sly/Charm · 6 Brawn/Wits. One roll per round for everyone.
- **Perks:** none (not written).

### 3.5 Standing readings (my rulings where the text is unclear; each is logged in section 7)

1. A location is watched if any of its obstacles is, **counting both versions of the way in** (M7). Being caught depends on the obstacle rolled, not the location.
2. The way out and the lock-up are not "locations" for Tells: no Tell checks there (m9).
3. A helper only needs to be at the same place, whether or not it has crossed that place's obstacles. The way out and the lock-up count as places (m10).
4. A move counts at once: an Entity that moves arrives in that Turn, and others may act on that in the same Turn (m16).
5. Leaving a location is a plain move; nobody re-crosses its obstacles. The piece is in hand once its obstacle is beaten, with no extra action (both still open from PT1 A29 / PT2 A36).
6. Small loot may be handed to an Entity at the same place, free (M6).
7. Trouble in a local chase raises Suspicion +1, merged with the roll's other triggers (M2).
8. A group check counts as "one roll" for being caught together (M1). Its single rise is a running maximum, applied as each roll lands (M4).
9. Step-downs (Weakness, Cost, carrying) apply before a raise (m14).
10. Beating the lock-up with an opened approach frees every captive there (M3).
11. A captive's first slip attempt is the Turn after its capture. A rescued captive acts the Turn after its rescue (m11).
12. In a chase round, everyone rolls, then the Lead moves. Suspicion rises per roll. If the Limit is reached, the chase ends after that round's rolls (m12).

**Storyteller policy for Costs** (the snapshot's only guidance is "never a Cost that costs nothing right then" and "drop only the roller's own items"): pick the valid Cost that bites hardest right now. That means Suspicion early in the night, and time once the clock binds. Each choice below says why.

---

## 4. Turn-by-turn log

Notation: trait die + second die = total vs Difficulty → band. "Shows" = the Monster die beat the trait die. Sus = Suspicion before → after.

### 4.1 Main line

**Turn 1 (Sus 0).** The party splits three ways to work three locations at once. E7 (Nimble d12) goes to L1, the essential, where two obstacles take Nimble. E1 (Charm d10, open with Charm) goes to L3. E6 (Brawn d12, Sly d10) goes to L4, which also holds the furniture.

| Roll | Who / where | Dice | Result | Sus |
|---|---|---|---|---|
| R131 | Tell check, L1 (E7 arrives) | d6 = 1 | doesn't go off | 0 → 0 |
| R132 | Tell check, L3 (E1 arrives) | d6 = 6 | E1's Tell shows | 0 → 1 |
| R133 | Tell check, L4 (E6 arrives) | d6 = 4 | E6's Tell shows | 1 → 2 |

L1 and L3 got a Tell check only because their way B is watched (reading 1). L3's Tell went off, although E1 never went near the watched way.

**Turn 2 (Sus 2).**

| Roll | Who / where | Choice and why | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|
| R134 | E7, L1 way A (unwatched, shared) | Sly avoids the loud Brawn. Signature hidden (charge 3 → 2) gives the d10 with no +2 risk: 74% vs 56% with the Mask | Sly d8 = 2, Monster d10 = 1 | 3 vs 8 | **Trouble** | no | 2 → 3 |
| R135 | E1, L3 way A (Nimble, unwatched, **group**) | Gift open with Charm (not listed) at 6 − 2 = 4 (3 → 2): about 95% vs 72% with Nimble d6 | Charm d10 = 10, Mask d6 = 5 | 15 vs 4 | Success | — | 3 |
| R136 | E6, L4 way A (watched, **group**) | Watched, so Trouble means a chase. Gift open with Sly (not listed) at 6 (3 → 2) cuts Trouble from 14% to 5% | Sly d10 = 6, Mask d6 = 6 | 12 vs 6 | **Critical**: charge back (2 → 3) | — | 3 |

E7's Trouble was at an unwatched obstacle: +1, no chase. Only E1 got past L3 way A (group). E6 got past L4 way A.

**Turn 3 (Sus 3).**

| Roll | Who / where | Choice and why | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|
| R137 | E7, L1 way A again | Hidden again (2 → 1) | Sly d8 = 2, Monster d10 = 8 | 10 vs 8 | Success | yes, but hidden: +0 | 3 |
| R138 | E1, L3 ob2 (shared) | Brawn (the quiet trait here), Mask | Brawn d12 = 8, Mask d6 = 5 | 13 vs 8 | Success | — | 3 |
| R139 | E6, L4 ob2 (Wits, shared, **last**) | Signature switch to Brawn (3 → 2): 86% vs 72% | Brawn d12 = 1, Mask d6 = 3 | 4 vs 6 | **Cost** | — | 3 → 4 |

R139: a Cost still beats the obstacle, so **Item 4 comes into E6's hand**. Storyteller's Cost: **Suspicion +1**. Why: the roll raised nothing, so +1 costs something; and Suspicion 4 puts the local-chase mob at its cap of 12. L1 way A is now beaten for the party. L3 ob2 is beaten for the party.

**Turn 4 (Sus 4).**

| Roll | Who / where | Choice and why | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|
| R140 | E7, L1 ob2 (Nimble/Wits, **group**) | Nimble, Mask | Nimble d12 = 3, Mask d6 = 1 | 4 vs 6 | **Cost** | — | 4 |
| R141 | E1, L3 ob3 (shared, **last**) | Charm, Mask. No raise: 65% → 71% isn't worth a charge E1 can use for opens | Charm d10 = 2, Mask d6 = 6 | 8 vs 8 | Success | — | 4 |
| R142 | E6, L4 furniture (Wits, unwatched, **group**) | The loot is in hand, so the piece may be tried. Gift open with Sly at 10 − 2 = 8 (2 → 1): 65% vs 54% for switch to Brawn | Sly d10 = 2, Mask d6 = 3 | 5 vs 8 | **Trouble** | — | 4 → 5 |

R140: E7 is past L1 ob2 (group: only E7). Storyteller's Cost: E7 carries no loot, so "drop an item" isn't allowed. The pick is **lose a Turn** (E7 skips its next action). Why: E7's next action is the essential's last obstacle, and time is tighter than Suspicion at 4 of 13.
R141: **Item 3 into E1's hand.**
R142: unwatched (although L4 is a watched location), so +1 and no chase.

**Turn 5 (Sus 5).** E7 skips (lost Turn). E1 moves L3 → L2, for insurance and because L2's obstacles suit E1's open with Charm.

| Roll | Who / where | Choice and why | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|
| R143 | E6, furniture again | Open with Sly (1 → 0) | Sly d10 = 4, Mask d6 = 4 | 8 vs 8 | **Critical**: charge back (0 → 1) | — | 5 |
| R144 | Tell check, L2 (E1 arrives) | — | d6 = 2 | doesn't go off | — | — | 5 |

E6 has the Bulky piece (reading 5).

**Turn 6 (Sus 5).** E6 starts the two-Turn carry move L4 → way out.

| Roll | Who / where | Choice and why | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|
| R145 | E7, L1 ob3 (shared, **last**) | Nimble, Mask | Nimble d12 = 2, Mask d6 = 2 | 4 vs 6 | **Cost** (doubles, but not a Success, so no Critical) | — | 5 |
| R146 | E1, L2 way B (Wits/Nimble loud, unwatched, shared) | Wits (quiet), Mask; charges saved for L2's harder obstacles | Wits d8 = 3, Mask d6 = 3 | 6 vs 6 | **Critical**: charge back (2 → 3) | — | 5 |

R145: **Item 1 (the essential) comes into E7's hand**, then the Storyteller's Cost: **drop an item**. Item 1 falls at L1, and picking it up costs E7 its next action. Why: the clock now binds, with L2's three obstacles ahead; Suspicion +1 would barely matter at 5 of 13. The text allows dropping the item the roll just won (m8).

**Turn 7 (Sus 5).** E7 picks up Item 1 (its action). E6 finishes the carry and is at the way out.

| Roll | Who / where | Choice and why | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|
| R147 | E1, L2 ob2 (Sly loud/Wits, shared) | Gift open with Charm (not listed) at 6 (3 → 2): 83% vs 56% with Wits | Charm d10 = 2, Mask d6 = 3 | 5 vs 6 | **Cost** | — | 5 |

Storyteller's Cost: E1 carries Item 3. The pick is **lose a Turn** (E1 skips Turn 8). Why: it forces a choice between the insurance roll at L2 ob3 and leaving early, and every exit retry now matters.

**Party decision.** They hold Items 1, 3 and 4 plus the piece. That's a Win plus furniture, so a Grand Year if they get out. Item 2 can't improve on that; it only helps if an extra is lost later. They give up L2 ob3 and head out.

**Turn 8 (Sus 5).** E7 moves L1 → way out. E1 skips. E6 waits.
**Turn 9 (Sus 5).** E1 moves L2 → way out. *(Slip by me: E1's move counts at once, so E7 or E6 could have rolled the exit later in Turn 9. I played it on Turn 10. The result would be the same.)*

**Turn 10 (Sus 5).** Before the roll, E7 hands Item 1 to E6 (reading 6), so the roller risks nothing if caught.

| Roll | Who / where | Choice and why | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|
| R148 | E7, the way out (watched) | Nimble; last charge on hidden (1 → 0): 82.5% vs 71% with the Mask | Nimble d12 = 7, Monster d10 = 2 | 9 vs 8 | Success | no | 5 |

Everyone is out. **Result: Grand Year.** Items 1, 3 and 4 are home with the Bulky piece; Item 2 (one extra) is missing. Nobody was left behind. Unspent charges lost: E1 2, E6 1.

### 4.2 Drill D1: together at L4

**Chosen:** at the start of the night, E1 and E6 go to L4 together (E7 is left out of this drill). Charges 3 each, Sus 0.
Reason for both crossing L4's group way in: with both inside, E1 can take the loot and E6 can try the furniture in the **same** Turn.

| Roll | Turn | Who | Choice | Dice | Total vs Diff | Band | Sus |
|---|---|---|---|---|---|---|---|
| R149 | 1 | Tell check, L4 (E1 and E6 arrive together; one check) | — | d6 = 2 | — | doesn't go off | 0 |
| R150 | 2 | E6, L4 way A (watched, group): **group check, first roll** | Open with Sly at 6 (3 → 2) | Sly d10 = 9, Mask d6 = 2 | 11 vs 6 | Success | 0 |
| R151 | 2 | E1, L4 way A: **group check, second roll** | Brawn (quiet), Mask | Brawn d12 = 11, Mask d6 = 5 | 16 vs 8 | Success | 0 |
| R152 | 3 | E1, L4 ob2 (last) | Wits, Mask | Wits d8 = 2, Mask d6 = 3 | 5 vs 6 | Cost: Item 4 in E1's hand | 0 → 1 |
| R153 | 3 | E6, furniture (group) | **Two abilities, one raise:** E6's open with Sly at 8 (2 → 1) plus E1's raise on E6's roll (E1 3 → 2), so Sly d10 → d12. Helping cost E1 a charge, not its action | Sly d12 = 7, Mask d6 = 5 | 12 vs 8 | Success: piece in hand | 1 |

The group check raised nothing, because neither roll had a trigger. R152's Cost: **Suspicion +1**. Why: early in the night time is cheap and Suspicion is permanent, and the roll raised nothing.
**D1 ends on Turn 3, Suspicion 1**, with L4 cleared and the piece in hand, two Turns ahead of the main line's L4.

### 4.3 Drill D2: Duty stack

**Chosen:** the main line at the end of Turn 7, except that E7 walked to L2 instead (holding Item 1, 2 charges), and E1 has no lost Turn. Sus 5. L2 ob3: Difficulty 10, Wits (loud) / Charm, unwatched, group.

| Roll | Turn | Who | Choice | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|---|
| R154 | 8 | E7, L2 ob3 | **Three effects on one roll:** Gift switch to Brawn (d10); Duty edge (K4) free raise, d10 → d12; signature hidden Monster (2 → 0). E1 offers its raise too: **refused**, because the Duty is the roll's one raise ("Castle Duty included") | Brawn d12 = 11, Monster d10 = 4 | 15 vs 10 | Success: Item 2 in E7's hand | no | 5 |

E7 went first because it had the best odds (70%). Had it failed, E1 would have tried in the same Turn as a group check. **D2 ends on Turn 8, Suspicion 5.**

### 4.4 Drill D3: bad exit

**Chosen:** the main line on Turn 10, with everyone at the way out and Sus 5. But E7 kept Item 1 (no handover), has 0 charges, and **its exit roll was Trouble** (chosen, not rolled).

Exit Trouble: Suspicion rises (5 → 6) and E7 is caught (the way out is always watched), so a **local chase** starts. Lead 1, escape 4, mob 10 + 3 = 13, capped at **12**. E7's Weakness is the sunlight kind, so no Weakness here. In a local chase only E7's own abilities count, and it has none.

| Roll | Step | Who | Choice | Dice | Total vs Diff | Band | Shows? | Lead | Sus |
|---|---|---|---|---|---|---|---|---|---|
| R155 | round 1 ground | — | — | d6 = 4: Nimble/Wits | — | — | — | — | 6 |
| R156 | round 1 | E7 | Monster: escape odds 51% vs 19% with the Mask | Nimble d12 = 4, Monster d10 = 5 | 9 vs 12 | **Trouble** | yes | 1 → **0** | 6 → 8 |

R156: the Monster showed (+2) and the roll was Trouble (+1). One roll, one rise, so +2 (reading 7). Lead 0: **E7 is cornered and captured.** The town takes back what it carried: **Item 1 is gone for the night.** A Win is now impossible.

The rest of Turn 10: E1 moves to the lock-up (one move). E6 waits.

| Roll | Turn | Who | Choice | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|---|
| R157 | 11 | E7 slips free (first try, reading 11) | Nimble, which slipping free allows and the rescue doesn't; Monster, since time is short | Nimble d12 = 6, Monster d10 = 5 | 11 vs 10 | Success: E7 free, acts next Turn | no | 8 |
| R158 | 12 | E6, the way out | E7 walked to the way out first this Turn (arrives at once). E6 handed Item 4 to E1. E1 raised E6's Sly (E1 2 → 1) | Sly d12 = 5, Monster d10 = 2 | 7 vs 8 | **Cost**: everyone out, "with nothing more to pay" | no | 8 |

E1 didn't need to rescue, so it walked back to the way out in Turn 11.
**D3 result: Partial** (Items 3 and 4 home; Item 1 lost; Item 2 never taken; the piece can't lift a Partial). Out on Turn 12, Suspicion 8.

### 4.5 Drill D4: caught together, then the Limit

**Chosen:** Turn 8, Sus 11. E1 (holding Item 3, 1 charge) and E6 (no loot, 1 charge) rolled L4 way A together as a group check, and **both got Trouble, no Monster shown** (chosen). E7 waits at the way out with Item 1 and 1 charge (as in the main line at Turn 8).
Group check: Suspicion rises once (+1), 11 → 12. Reading 8: a group check is "one roll", so they are caught together and share one Lead.

Local chase: Lead 1, escape 4, mob 10 + 6 = 16, capped at **12**.

| Roll | Step | Who | Choice | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|---|
| R159 | chase start | E1 mob Weakness (5–6) | — | d6 = 1 | — | not brought | — | 12 |
| R160 | chase start | E6 mob Weakness (5–6) | — | d6 = 5 | — | **brought**: one size smaller for this chase | — | 12 |
| R161 | round 1 ground | — | — | d6 = 6: Brawn/Wits | — | — | — | 12 |
| R162 | round 1 | E1 | Brawn, Monster | Brawn d12 = 10, Monster d10 = 4 | 14 vs 12 | Success | no | 12 |
| R163 | round 1 | E6 | Brawn d12 stepped down to d10, Monster | Brawn d10 = 4, Monster d10 = 5 | 9 vs 12 | Trouble | yes | 12 → **13** |

R163: +2 takes Suspicion to 14, held at the Limit of 13. **The Limit arrives during the local chase.** The round was 1 Success against 1 Trouble, so the Lead would have stayed at 1. The chase ends at once and E1 and E6 join the final flight (reading 12). Suspicion stops.

**Final flight (at the Limit).** E1, E6, E7. Lead 2, escape 6, mob 11, everyone on the Monster die.

| Roll | Step | Who | Choice | Dice | Total vs 11 | Band |
|---|---|---|---|---|---|---|
| R164 | start | E1 mob Weakness | — | d6 = 2 | — | not brought |
| R165 | start | E6 mob Weakness (new chase, new check) | — | d6 = 2 | — | not brought |
| — | start | E7 sunlight | not a dawn flight | — | — | not brought |
| R166 | r1 ground | — | — | d6 = 5: Sly/Charm | — | — |
| R167 | r1 | E1 | Raises own Charm, d10 → d12 (1 → 0) | Charm d12 = 12, Monster = 3 | 15 | Success |
| R168 | r1 | E6 | Switch to Brawn d12 (1 → 0) | Brawn d12 = 2, Monster = 6 | 8 | Trouble |
| R169 | r1 | E7 | Switch to Brawn d10 (1 → 0) | Brawn d10 = 6, Monster = 7 | 13 | Success |
| | | | | | **2 S vs 1 T** | **Lead 2 → 3** |
| R170 | r2 ground | — | — | d6 = 4: Nimble/Wits | — | — |
| R171 | r2 | E1 | Wits d8; keeps its overdraw for later | Wits d8 = 3, Monster = 7 | 10 | Cost |
| R172 | r2 | E6 | **Overdraws** switch: Brawn d12 instead of Nimble d8. Weakness in play from its next roll | Brawn d12 = 7, Monster = 9 | 16 | Success |
| R173 | r2 | E7 | Nimble d12 | Nimble d12 = 8, Monster = 5 | 13 | Success |
| | | | | | **2 S vs 0 T** | **Lead 3 → 4** |
| R174 | r3 ground | — | — | d6 = 2: Nimble/Brawn | — | — |
| R175 | r3 | E1 | Brawn d12 (its raise would be wasted on a d12) | Brawn d12 = 11, Monster = 4 | 15 | Success |
| R176 | r3 | E6 | Brawn d12 stepped down to d10 (Weakness); can't overdraw | Brawn d10 = 5, Monster = 2 | 7 | Trouble |
| R177 | r3 | E7 | Nimble d12 | Nimble d12 = 11, Monster = 5 | 16 | Success |
| | | | | | **2 S vs 1 T** | **Lead 4 → 5** |
| R178 | r4 ground | — | — | d6 = 4: Nimble/Wits | — | — |
| R179 | r4 | E1 | Wits d8 | Wits d8 = 5, Monster = 9 | 14 | Success |
| R180 | r4 | E6 | E6's best here is Nimble d8 stepped down to d6, so **two overdraws go on its roll**. E7 overdraws switch, so E6 rolls Brawn: d12, stepped down to d10, then E1's overdrawn raise makes it d12 again (reading 9). One raise. Both Weaknesses are now in play, but neither ever bites (no later roll) | Brawn d12 = 3, Monster = 2 | 5 | Trouble |
| R181 | r4 | E7 | Nimble d12 | Nimble d12 = 9, Monster = 4 | 13 | Success |
| | | | | | **2 S vs 1 T** | **Lead 5 → 6: escape** |

**D4 result: Partial.** Items 1 and 3 are home; two extras are missing, so it's not a Win. Suspicion 13 (stopped).

### 4.6 Drill D5: rescue, then the dawn flight

**Chosen:** Turn 12 begins, Sus 9. E7 has been held at the lock-up since Turn 10 (Item 1 gone), has 0 charges, and **has already failed this Turn's slip attempt** (chosen). E1 is at the lock-up, holding Item 2, with 1 charge. E6 is at the way out, holding Items 3 and 4 and the Bulky piece, with 1 charge.

**Decision:** leave now (E1 walks to the way out and E6 rolls: at best a Partial dropped to a Bust for leaving E7), or rescue (dawn flight: escape gives a Partial, cornered gives Forked). They rescue.

| Roll | Step | Who | Choice | Dice | Total vs Diff | Band | Shows? | Sus |
|---|---|---|---|---|---|---|---|---|
| R182 | Turn 12 | E1, the lock-up (rescue) | Gift open with Charm (not listed: Sly/Brawn) at 10 − 2 = 8 (1 → 0), Monster: Success or Cost frees E7 90% of the time, vs 82.5% for Brawn (loud) + Monster | Charm d10 = 6, Monster d10 = 8 | 14 vs 8 | Success: E7 freed (reading 10) | yes | 9 → 11 |

Turn 12 ends with all three in town, so **dawn** brings the final flight. E6 drops the piece: it can't lift a Partial, and a carrier rolls Nimble one size smaller.

**Dawn flight.** Lead 2, escape 6, mob 11, everyone on the Monster die.

| Roll | Step | Who | Choice | Dice | Total vs 11 | Band |
|---|---|---|---|---|---|---|
| R183 | start | E1 mob Weakness | — | d6 = 5 | — | **brought** |
| R184 | start | E6 mob Weakness | — | d6 = 5 | — | **brought** |
| — | start | E7 sunlight | dawn flight, so always | — | — | **brought** |
| | | | All three have their Weakness in play, so **nobody can overdraw** for the whole flight | | | |
| R185 | r1 ground | — | — | d6 = 5: Sly/Charm | — | — |
| R186 | r1 | E1 | Charm d10 stepped down to d8 | Charm d8 = 7, Monster = 5 | 12 | Success |
| R187 | r1 | E6 | Sly d10 stepped down to d8 | Sly d8 = 3, Monster = 5 | 8 | Trouble |
| R188 | r1 | E7 | E6's last charge switches E7 to Brawn: d10 stepped down to d8 (better than Sly d6) | Brawn d8 = 6, Monster = 4 | 10 | Cost |
| | | | | | **1 S vs 1 T** | **Lead stays 2** |
| R189 | r2 ground | — | — | d6 = 1: Nimble/Sly | — | — |
| R190 | r2 | E1 | Best is a d4 (Nimble d6 stepped down; Sly already d4) | Nimble d4 = 2, Monster = 10 | 12 | Success |
| R191 | r2 | E6 | Sly d8 | Sly d8 = 7, Monster = 1 | 8 | Trouble |
| R192 | r2 | E7 | Nimble d12 stepped down to d10 | Nimble d10 = 5, Monster = 6 | 11 | Success |
| | | | | | **2 S vs 1 T** | **Lead 2 → 3** |
| R193 | r3 ground | — | — | d6 = 2: Nimble/Brawn | — | — |
| R194 | r3 | E1 | Brawn d10 | 2 + 9 | 11 | Success |
| R195 | r3 | E6 | Brawn d10 | 8 + 6 | 14 | Success |
| R196 | r3 | E7 | Nimble d10 | 7 + 4 | 11 | Success |
| | | | | | **3 S** | **Lead 3 → 4** |
| R197 | r4 ground | — | — | d6 = 1: Nimble/Sly | — | — |
| R198 | r4 | E1 | Nimble d4 | 4 + 8 | 12 | Success |
| R199 | r4 | E6 | Sly d8 | 8 + 4 | 12 | Success |
| R200 | r4 | E7 | Nimble d10 | 4 + 4 | 8 | Trouble (doubles, but no Success, so no Critical) |
| | | | | | **2 S vs 1 T** | **Lead 4 → 5** |
| R201 | r5 ground | — | — | d6 = 6: Brawn/Wits | — | — |
| R202 | r5 | E1 | Brawn d10 | 3 + 8 | 11 | Success |
| R203 | r5 | E6 | Brawn d10 | 2 + 9 | 11 | Success |
| R204 | r5 | E7 | Brawn d10 stepped down to d8 | 4 + 9 | 13 | Success |
| | | | | | **3 S** | **Lead 5 → 6: escape** |

**D5 result: Partial.** Items 2, 3 and 4 are home, but the essential is missing, so a Partial at best. Nobody was left behind. Suspicion 11 (stopped at dawn).

---

## 5. Result and how it felt

**Main line: Grand Year, out on Turn 10, Suspicion 5 of 13.**

**Numbers**
- 14 action rolls: 8 Successes (3 of them Criticals), 4 Costs, 2 Troubles. Plus 4 Tell checks (2 went off).
- Suspicion 5: Tells 2, Trouble 2 (both at unwatched obstacles), one Cost picked as +1. The Monster never raised it: it showed once (R137), under hidden. Peak 5 of 13 (38%). No chase, no capture.
- Charges: 9 spent (E7 3, E6 4, E1 2), 3 refunded by Criticals, 3 lost unspent (E1 2, E6 1). Critical refunds were lucky: 3 against about 1 expected.
- Entity-Turns (3 × 10 = 30): 14 rolls, 8 move-Turns (including the two-Turn carry), 3 lost to Costs (two lost Turns and one pick-up after a drop), 5 idle at the way out.
- The Storyteller's Costs were the main brake: 3 of the 4 main-line Costs were picked to cost time, and they cost 3 Entity-Turns.

**Pace and tension.** The main line felt safe. Suspicion never passed 38%, and the party had two spare Turns. The rolled town came out easier than the target mix (31% of obstacles at 6, only 19% at 10 or 12). The open approach did a lot of work: five of E1's and E6's nine obstacle rolls used it, turning watched or hard obstacles into 65–95% rolls.

**Decisions that mattered**
1. Splitting three ways on Turn 1: three places worked at once.
2. Spending open on watched ways in, where Trouble starts a chase.
3. Skipping Item 2. With 1 essential and 3 extras, once Items 1, 3 and 4 are home, **the fourth item is worth nothing**: a Win allows one extra missing, and a Grand Year only adds furniture. The list became "3 items plus the piece".
4. Handing the essential away before the exit roll. Under reading 6 this is free and removes the capture risk. Without it (D3), one bad exit lost the essential and the Win.

**Things that felt off (with numbers)**
- **A local chase is far deadlier than the final flight.** Exact odds from Lead 1 against a mob of 12, best trait d12: **51% escape with the Monster, 19% with the Mask**. From a d10 trait with the Monster: 37%. The final flight with three Entities against 11: 96% (all d12 + Monster), 90% (all d10), 84% (d10/d8/d10), 65% (all d8, every Weakness in play). In D3 one roll cornered E7 and cost the essential. In D4 the party at Suspicion 12 was arguably *better off* reaching the Limit: a final flight they won, instead of a coin-flip local chase.
- **The local-chase mob sits at its cap from Suspicion 4.** Every local chase in this playtest was against 12 (Suspicion 4 to 12). "10 plus half the Suspicion" does almost nothing after the first few points (PT1 A24's note still stands).
- **In the Mask vs Monster choice, the Mask is a trap in a local chase** (19% vs 51%), even before M2's open question about Trouble's +1.
- **Abilities shrink in chases.** Open is barred, and hidden is dead once the hunt is on (Suspicion stops). E1's Gift, E6's Gift and E7's signature did nothing in the final flights. Only raise and switch worked.
- **Weakness can shut off overdraw for the whole flight.** In D5 all three had their Weakness from round 1 (two mob rolls of 5, plus sunlight), so nobody could overdraw. A sunlight-type Entity can never overdraw in a dawn flight.
- **"Drop an item" costs the same as "lose a Turn"** (picking it up costs the next action), unless the roller then decides to abandon the item. The list of four Costs is really three.
- **Group checks rarely raise anything in sensible play.** Players use the Mask on group obstacles, so triggers are rare (D1: two clean Successes, +0). The single-rise rule matters mostly for Troubles and Monster dice (M4).
- **The furniture went smoothly.** Bulky, one carrier, two-Turn moves: E6 got the piece on Turn 5 and was at the way out by Turn 7. Carrying never touched a roll, because the carrier never rolled again.

---

## 6. Fix check (PT1 and PT2 ambiguities against the snapshot)

**Still content (not written yet, listed once):** town tables and difficulty budget (PT1 A3, PT2 A2); the chase table (PT1 A4 table part, PT2 A5); the Tell chance (PT1 A5, PT2 A3); Weakness timing (PT1 A17, PT2 A4); Castle Duties (PT1 A18, PT2 A6); Perks (PT1 A19, PT2 A24); marking small entrances (PT1 A30, PT2 A37).

### 6.1 PT1

| ID | Clear now? | Snapshot passage that settles it | New problem it causes |
|---|---|---|---|
| A1 | yes | "Once anyone beats an obstacle (a Success or a Cost), it stays beaten for the whole party, unless it's marked group … each Entity who wants past rolls for itself." | Group-check timing (M4); "caught by one roll" unreachable (M1) |
| A2 | yes | "A location: 1–3 obstacles, crossed in order, and some loot; beat the last and the loot is in your hand. Its two ways in are two versions of the first obstacle … pick one." | Watched status with one watched way in (M7) |
| A4 | yes (one roll per round); table still content | "Each round, roll a d6 on the chase table … which traits work this round for everyone in the chase" | — |
| A6 | yes | "The first time anyone reaches each watched location, check once, however the party has split" | Way out and lock-up (m9); one watched way in (M7) |
| A7 | partly | "In a chase the roll only moves the Lead: a Cost costs nothing more, and Trouble doesn't start another chase." | Does chase Trouble still add +1? (M2) |
| A8 | yes | "a local chase still running ends at once, and those Entities join the flight" | Order within a round (m12); dawn can't interrupt one (m13) |
| A9 | yes | "if it shows, that raises nothing (Trouble or a Cost still counts)" | — |
| A10 | yes | Trigger table lists the loud way and "A Cost chosen as Suspicion"; "One roll raises Suspicion only once, by its biggest trigger." | Overdraw is in the same table, so it merges too (M5) |
| A11 | partly | "never picks a Cost that costs nothing right then" | Still no default or priority for choosing (Storyteller chapter is a placeholder) |
| A12 | partly | Raise says "your trait die"; only switch and open name "the ability's trait" | Implied, not said: raise and hidden work on any roll |
| A13 | yes | "everyone not captured must be there … a Success or a Cost gets everyone out, with nothing more to pay. On Trouble … that Entity is caught" | — |
| A14 | yes | "the town takes back what you were carrying: it's gone for the night" | — |
| A15 | yes | "Sly or Nimble, or Brawn the loud way, at the lock-up Difficulty. Only a Success frees you; a Cost does nothing … no chase starts" | Can open be used to slip free? (M3); first try timing (m11) |
| A16 | yes | "The party starts at the edge of town, by the way out, and gets in without a roll … any move takes one Turn" | — |
| A20 | partly | "When several roll it in the same Turn (a group check), Suspicion rises only once" | Caught together? (M1); timing (M4) |
| A21 | yes | "The party leaves together, so everyone not captured must be there." (nobody can be out early) | — |
| A22 | yes | "Only on obstacles (the lock-up included), never in a chase, and only you get through." | "Only you" vs the lock-up freeing everyone and the way out taking everyone (M3) |
| A23 | yes | "You may use the Mask" (local chase) | — |
| A24 | yes (wording) | "half the Suspicion (round down), at most 12, checked each round" | The cap is still reached at Suspicion 4 (section 5) |
| A25 | yes | "Spend abilities before you roll." | — |
| A26 | yes | "helping costs the charge, not your action" | Must a helper be past the obstacles? (m10) |
| A27 | yes | "Entities act one at a time, in any order, and each result counts at once." | Easy to miss move-then-roll (m16); clashes with group checks (M4) |
| A28 | yes | "Raise your trait die one size (… a d12 can't go higher)" | Order of raise and step-down (m14) |
| A29 | **no** | (silent: taking the piece, re-crossing obstacles when leaving) | Ruled: no action, no re-crossing |
| A31 | yes | "Small loot has no limit." | Handing loot over (M6) |
| A32 | **no** | "One piece of furniture or decor" | "Decor" still undefined |
| A33 | yes | "from 0 up to a Limit"; "Dawn comes when the 12th Turn ends" | — |
| A34 | yes | "lose a Turn (you skip your next action), or your next roll's trait die one size smaller" | — |
| A35 | partly | "picks 'drop an item' only if you carry loot: one of your own items" | May it drop the item this roll just won? (m8) |
| A36 | yes | "for everyone in the chase" | — |
| A37 | **no** (design call) | "A Critical counts as two Successes." | Still only breaks ties: the Lead moves at most 1 a round |

PT1: **23 yes, 5 partly, 3 no**, 6 still content.

### 6.2 PT2

| ID | Clear now? | Snapshot passage that settles it | New problem it causes |
|---|---|---|---|
| A1 | yes | (as PT1 A1) | M1, M4 |
| A7 | yes | "if the obstacle doesn't list the ability's trait, roll that trait at 2 lower Difficulty" | — |
| A8 | yes | "never in a chase" | — |
| A9 | yes | "Several abilities may go on one roll, but it takes at most one raise, from any source, Castle Duty included." | Tested in D1, D2, D4; clear |
| A10 | partly | (as PT1 A7) | M2 |
| A11 | yes | "it's gone for the night" | — |
| A12 | yes | "It is watched if any of its obstacles is" · "if anyone is watching, you are caught" · "Trouble where nobody is watching still raises Suspicion, but starts no chase" | One watched way in (M7) |
| A13 | yes | "Entities act one at a time, in any order, and each result counts at once." | M4, m16 |
| A14 | yes | "starts at the edge of town, by the way out … any move takes one Turn" | — |
| A15 | yes | "check once, however the party has split" | — |
| A16 | yes | "Taking the loud way \| +1" in the trigger table | — |
| A17 | yes | "by the biggest single trigger among their rolls" | Free Monster dice after the first trigger (M4) |
| A18 | yes | "lose a Turn (you skip your next action)" | — |
| A19 | yes | "Slipping free: … Sly or Nimble, or Brawn the loud way, at the lock-up Difficulty" | — |
| A20 | partly | "Sly, or Brawn the loud way, always watched — at the lock-up Difficulty, with a new rescue obstacle for each capture … Beat it (a Success or a Cost) and every captive there is free; a rescuer's Trouble gets them caught as usual." | When a rescued captive acts (m11); open "only you" (M3) |
| A21 | yes | "everyone not captured must be there" | — |
| A22 | yes | "your Weakness is then in play from your next roll to the end of the flight" | — |
| A23 | yes | "crossed in order … two versions of the first obstacle" | — |
| A25 | yes | "never picks a Cost that costs nothing right then (say, a Suspicion +1 the roll already raised)" | — |
| A26 | yes | "only if you carry loot: one of your own items" | m8 |
| A27 | yes | "Raise your trait die … a d12 can't go higher" · "your next roll's trait die one size smaller" | m14 |
| A28 | yes | "that Entity is caught (Chapter 6)" | — |
| A29 | yes | "with nothing more to pay" | Tested in D3 (R158) |
| A30 | yes | "In a local chase, abilities help only your own roll." | — |
| A31 | yes | "escape and you're back where you were caught, with your Turn used up" | — |
| A32 | yes | "(round down) … checked each round" | — |
| A33 | yes | "a Cost does nothing, and on Trouble Suspicion rises but no chase starts" | — |
| A34 | yes | "while your Weakness is in play, however it came, you can't overdraw" | In D5 this barred overdraw for everyone, all flight (section 5) |
| A35 | **no** (design call) | "Nothing makes a die smaller than a d4: further steps down are lost." | Still erases the carrying penalty for a d4 trait |
| A36 | partly | Loot: "beat the last and the loot is in your hand"; a dropped item: "picking it up costs that Entity its next action" | Taking the piece still unstated |
| A38 | **no** | "furniture or decor" | Still undefined |
| A39 | **no** | "and some loot" | Loot beyond the list item still has no use |
| A40 | yes | "Small loot has no limit." | — |
| A41 | yes | "The Majority Rule" section; the local chase points to it | — |
| A42 | yes | "a local chase still running ends at once" | m12 |
| A43 | yes | "for the rest of the chase" | — |
| A44 | **no** (design call) | "From then on Suspicion stops" | Hidden is still dead in the final flight (and open is barred there) |

PT2: **30 yes, 3 partly, 4 no**, 7 still content.

**Overall: 53 yes, 8 partly, 7 no (3 of them design calls rather than gaps), 13 still content.**

---

## 7. New ambiguities (most severe first)

No blockers: every gap below had a sensible ruling, so play went on.

| id | Severity | Passage (quoted) | What I did | Suggested fix |
|---|---|---|---|---|
| M1 | major | "Several Entities caught by one roll flee together." · "Several Entities caught by one roll flee together on one shared Lead … and are captured together if cornered." vs exit: "that Entity is caught" and "Entities act one at a time … each result counts at once." | No rule makes one roll catch several Entities. The exit catches only the roller, and a group check is several rolls, each counting at once. So the shared-Lead rule can never fire. In D4 I ruled that a group check counts as "one roll". | Either say "Everyone who gets Trouble in one group check is caught together", or drop the shared-Lead rule. |
| M2 | major | "In a chase the roll only moves the Lead: a Cost costs nothing more, and Trouble doesn't start another chase." vs (local chase) "You may use the Mask, and rolls raise Suspicion as usual." | Ruled: Trouble in a local chase still adds +1, merged with the roll's other triggers (D3 R156: +2 total). "Only moves the Lead" reads the other way. It decides whether the Mask is a safe choice in a local chase (Mask Trouble is 46% a round against 12). | Say it outright: "In a local chase, Trouble also raises Suspicion by 1 (as usual)" or "…raises nothing; only the Monster showing does." |
| M3 | major | "Open an approach … Only on obstacles (the lock-up included), never in a chase, and only you get through." vs rescue: "Beat it … and every captive there is free" · way out: "One Entity rolls for all" | "Only you get through" clashes with both. Ruled: an opened lock-up frees every captive (D5 R182: Charm at 8 instead of Brawn (loud) at 10 lifted the free chance from 82.5% to 90%). Unclear whether open may be used to slip free (not used), and whether an opened way out lets everyone out (not used). | Say what open does on the lock-up (rescue and slipping free) and on the way out, for example "on the lock-up it frees every captive; on the way out only the opener leaves." |
| M4 | major | "When several roll it in the same Turn (a group check), Suspicion rises only once, by the biggest single trigger among their rolls." vs "Entities act one at a time, in any order, and each result counts at once." | Ruled: a running maximum, applied as each roll lands. Two holes: (a) once one roll in a group check has raised +2, the later rollers' Monster dice (and overdraws) are free; (b) if the first roll reaches the Limit or starts a chase, it's unclear whether the others still roll. Didn't bite in D1 (no triggers). | Make the group check one declared step: "Everyone rolling declares first, all roll together, then apply the single biggest rise." Decide whether that free-Monster effect is wanted. |
| M5 | major | Trigger table: "Overdraw \| +2" · "One roll raises Suspicion only once, by its biggest trigger." | Taken literally, an overdraw on a roll where the Monster shows costs nothing extra, and overdrawing to pay for hidden costs exactly what the Monster showing would. Not met in play (no overdraw during the raid). | "Overdraw is paid on its own, on top of the roll's rise" (like a Tell), or confirm that it merges. |
| M6 | major | (silent) · "the town takes back what you were carrying" · "Small loot has no limit." | Nothing says whether Entities can pass loot to each other. Ruled: free between Entities at the same place. It matters: in the main line the exit roller handed the essential away first. In D3 (no handover) one exit Trouble lost the essential and the Win. | Say whether, and how (free? an action?), loot changes hands. |
| M7 | major | "Its two ways in are two versions of the first obstacle … pick one. It is watched if any of its obstacles is." · "The first time anyone reaches each watched location, check once" | L1, L2 and L3 each had one watched way in. Ruled: the location is watched (both versions count), so it gets a Tell check on arrival, before anyone picks a way in. L3's Tell went off (+1) although E1 used the unwatched way. Being caught I ruled by the obstacle rolled (R142: Trouble at L4's unwatched furniture, no chase). | Say whether both ways in count, or check the Tell when the first Entity *tries* the location's way in. Say plainly that being caught depends on the obstacle, not the location. |
| m8 | minor | "picks 'drop an item' only if you carry loot: one of your own items." · "beat the last and the loot is in your hand" | A Cost on the roll that wins the loot can drop that same loot (main line R145: Item 1 won and dropped at once). Allowed by the text. It works out the same as "lose a Turn". | Say whether the just-won item can be the one dropped. Consider making "drop an item" differ from "lose a Turn" (for example, the item goes back behind the last obstacle). |
| m9 | minor | "The first time anyone reaches each watched location" · "The way out of town, always watched" · the lock-up "always watched" | Ruled: the way out and the lock-up are not locations, so no Tell checks there. | Say whether they count. |
| m10 | minor | "An ability can help any Entity's roll at the same location" | Ruled: same place, whether or not the helper has crossed that place's obstacles (group ones included). The way out and the lock-up count as places (D3 R158: E1 raised E6's exit roll). | Say whether a helper must be past the obstacles, and whether the way out and the lock-up count. |
| m11 | minor | "A freed Entity acts again next Turn." (slipping free only) · "every captive there is free" (rescue) · "once per Turn, a captive may try to slip free" | Ruled: a rescued captive also acts next Turn; the first slip try is the Turn after capture (the capture used the Turn). | Put both timings in the Captured section. |
| m12 | minor | "a local chase still running ends at once" · "Everyone rolls each round." | Ruled: the round's rolls are all made, then the chase ends if the Limit was reached. In D4 the Limit came on the round's last roll and the Lead would have stayed, so it didn't matter. Unclear if a round both corners them and reaches the Limit. | Say which comes first: capture or the hunt. |
| m13 | minor | "When Suspicion reaches the Limit — or dawn comes with anyone still in town — … a local chase still running ends at once" vs "The chase happens within the Turn it started" and "Dawn comes when the 12th Turn ends" | A local chase always finishes inside its Turn, so dawn can never interrupt one. The text suggests it can. | Tie "a local chase still running ends" to the Limit only. |
| m14 | minor | "Raise your trait die one size (… a d12 can't go higher)" · Weakness "one size smaller" · "Nothing makes a die smaller than a d4" | The order matters: d12 stepped down then raised gives d12; raised first (wasted) then stepped down gives d10. Ruled: step-downs first (D4 R180). | Give the order: "apply steps down first, then the raise." |
| m15 | minor | "two versions of the first obstacle (front door or back window, with different traits)" · "When several roll it in the same Turn (a group check)" | Two questions. (a) If two Entities take different ways in during the same Turn, is that one group check? (Not met.) (b) May the two ways share one trait? L2's are Wits/Sly and Wits/Nimble; I allowed it. | Say whether both ways in are "the same obstacle" for group checks, and whether "different traits" means no shared trait. |
| m16 | minor | "Entities act one at a time, in any order, and each result counts at once." · "any move takes one Turn" | A move counts at once, so one Entity can walk to the way out and another can roll the exit in the same Turn. I missed this in the main line (the exit could have been on Turn 9) and used it in D3. | Add a one-line example under Turns: one Entity walks to the way out, then another rolls the way out in the same Turn. |

**Counts: 0 blockers, 7 major, 9 minor.**

---

## 8. Roll appendix

All rolls are `1 + Math.floor(Math.random() * n)`, made by my own roller in my private scratch folder, one numbered line per call.

| Roll | What | Faces |
|---|---|---|
| R1 | Entity pick 1 (E1–E8) | d8 = 6 |
| R2 | Entity pick 2 | d8 = 7 |
| R3 | Entity pick 3 | d8 = 6 (duplicate) |
| R4 | Entity pick 3 reroll | d8 = 1 |
| R5 | E6 Gift (1 raise, 2 hidden, 3 open) | d3 = 3 |
| R6 | E7 Gift (1 raise, 2 switch, 3 open) | d3 = 2 |
| R7 | E1 Gift (1 switch, 2 hidden, 3 open) | d3 = 3 |
| R8 | E6 Castle Duty | d6 = 3 |
| R9 | E7 Castle Duty | d6 = 4 |
| R10 | E1 Castle Duty | d6 = 5 |
| R11 | Essentials (1 or 2) | d2 = 1 |
| R12 | Item 1 kind | d6 = 2 |
| R13 | Item 2 kind | d6 = 4 |
| R14 | Item 3 kind | d6 = 1 |
| R15 | Item 4 kind | d6 = 6 |
| R16 | L1 obstacle count | d3 = 3 |
| R17 | L2 obstacle count | d3 = 3 |
| R18 | L3 obstacle count | d3 = 3 |
| R19 | L4 obstacle count | d3 = 2 |
| R20 | L1 way A Difficulty | d20 = 5 |
| R21 | L1 way A trait count | d2 = 2 |
| R22 | L1 way A trait 1 | d5 = 1 |
| R23 | L1 way A trait 2 | d5 = 1 (repeat) |
| R24 | L1 way A trait 2 reroll | d5 = 3 |
| R25 | L1 way A loud | d2 = 1 |
| R26 | L1 way A watched | d6 = 4 |
| R27 | L1 way A group | d6 = 5 |
| R28 | L1 way B Difficulty | d20 = 8 |
| R29 | L1 way B trait count | d2 = 1 |
| R30 | L1 way B trait 1 | d5 = 5 |
| R31 | L1 way B watched | d6 = 1 |
| R32 | L1 way B group | d6 = 4 |
| R33 | L1 ob2 Difficulty | d20 = 1 |
| R34 | L1 ob2 trait count | d2 = 2 |
| R35 | L1 ob2 trait 1 | d5 = 2 |
| R36 | L1 ob2 trait 2 | d5 = 5 |
| R37 | L1 ob2 loud | d2 = 2 |
| R38 | L1 ob2 watched | d6 = 4 |
| R39 | L1 ob2 group | d6 = 1 |
| R40 | L1 ob3 Difficulty | d20 = 1 |
| R41 | L1 ob3 trait count | d2 = 2 |
| R42 | L1 ob3 trait 1 | d5 = 2 |
| R43 | L1 ob3 trait 2 | d5 = 4 |
| R44 | L1 ob3 loud | d2 = 2 |
| R45 | L1 ob3 watched | d6 = 5 |
| R46 | L1 ob3 group | d6 = 6 |
| R47 | L2 way A Difficulty | d20 = 20 |
| R48 | L2 way A trait count | d2 = 2 |
| R49 | L2 way A trait 1 | d5 = 5 |
| R50 | L2 way A trait 2 | d5 = 3 |
| R51 | L2 way A loud | d2 = 2 |
| R52 | L2 way A watched | d6 = 1 |
| R53 | L2 way A group | d6 = 2 |
| R54 | L2 way B Difficulty | d20 = 1 |
| R55 | L2 way B trait count | d2 = 2 |
| R56 | L2 way B trait 1 | d5 = 5 |
| R57 | L2 way B trait 2 | d5 = 5 (repeat) |
| R58 | L2 way B trait 2 reroll | d5 = 2 |
| R59 | L2 way B loud | d2 = 2 |
| R60 | L2 way B watched | d6 = 4 |
| R61 | L2 way B group | d6 = 4 |
| R62 | L2 ob2 Difficulty | d20 = 7 |
| R63 | L2 ob2 trait count | d2 = 2 |
| R64 | L2 ob2 trait 1 | d5 = 3 |
| R65 | L2 ob2 trait 2 | d5 = 5 |
| R66 | L2 ob2 loud | d2 = 1 |
| R67 | L2 ob2 watched | d6 = 6 |
| R68 | L2 ob2 group | d6 = 4 |
| R69 | L2 ob3 Difficulty | d20 = 16 |
| R70 | L2 ob3 trait count | d2 = 2 |
| R71 | L2 ob3 trait 1 | d5 = 5 |
| R72 | L2 ob3 trait 2 | d5 = 4 |
| R73 | L2 ob3 loud | d2 = 1 |
| R74 | L2 ob3 watched | d6 = 4 |
| R75 | L2 ob3 group | d6 = 2 |
| R76 | L3 way A Difficulty | d20 = 1 |
| R77 | L3 way A trait count | d2 = 1 |
| R78 | L3 way A trait 1 | d5 = 2 |
| R79 | L3 way A watched | d6 = 5 |
| R80 | L3 way A group | d6 = 2 |
| R81 | L3 way B Difficulty | d20 = 5 |
| R82 | L3 way B trait count | d2 = 1 |
| R83 | L3 way B trait 1 | d5 = 2 (same as way A: reroll traits) |
| R84 | L3 way B trait count (reroll) | d2 = 1 |
| R85 | L3 way B trait 1 (reroll) | d5 = 4 |
| R86 | L3 way B watched | d6 = 3 |
| R87 | L3 way B group | d6 = 2 |
| R88 | L3 ob2 Difficulty | d20 = 7 |
| R89 | L3 ob2 trait count | d2 = 2 |
| R90 | L3 ob2 trait 1 | d5 = 4 |
| R91 | L3 ob2 trait 2 | d5 = 1 |
| R92 | L3 ob2 loud | d2 = 1 |
| R93 | L3 ob2 watched | d6 = 6 |
| R94 | L3 ob2 group | d6 = 6 |
| R95 | L3 ob3 Difficulty | d20 = 5 |
| R96 | L3 ob3 trait count | d2 = 2 |
| R97 | L3 ob3 trait 1 | d5 = 4 |
| R98 | L3 ob3 trait 2 | d5 = 4 (repeat) |
| R99 | L3 ob3 trait 2 reroll | d5 = 5 |
| R100 | L3 ob3 loud | d2 = 2 |
| R101 | L3 ob3 watched | d6 = 5 |
| R102 | L3 ob3 group | d6 = 5 |
| R103 | L4 way A Difficulty | d20 = 8 |
| R104 | L4 way A trait count | d2 = 2 |
| R105 | L4 way A trait 1 | d5 = 4 |
| R106 | L4 way A trait 2 | d5 = 4 (repeat) |
| R107 | L4 way A trait 2 reroll | d5 = 1 |
| R108 | L4 way A loud | d2 = 1 |
| R109 | L4 way A watched | d6 = 3 |
| R110 | L4 way A group | d6 = 1 |
| R111 | L4 way B Difficulty | d20 = 13 |
| R112 | L4 way B trait count | d2 = 1 |
| R113 | L4 way B trait 1 | d5 = 3 |
| R114 | L4 way B watched | d6 = 3 |
| R115 | L4 way B group | d6 = 2 |
| R116 | L4 ob2 Difficulty | d20 = 1 |
| R117 | L4 ob2 trait count | d2 = 1 |
| R118 | L4 ob2 trait 1 | d5 = 5 |
| R119 | L4 ob2 watched | d6 = 5 |
| R120 | L4 ob2 group | d6 = 5 |
| R121 | Furniture location (L1–L4) | d4 = 4 |
| R122 | Furniture size (1 Bulky, 2 Huge) | d2 = 1 |
| R123 | Furniture obstacle Difficulty | d20 = 16 |
| R124 | Furniture obstacle trait count | d2 = 1 |
| R125 | Furniture obstacle trait 1 | d5 = 5 |
| R126 | Furniture obstacle watched | d6 = 5 |
| R127 | Furniture obstacle group | d6 = 1 |
| R128 | Small entrance? L4 way A | d6 = 3 |
| R129 | Small entrance? L4 way B | d6 = 5 |
| R130 | Small entrance? way out | d6 = 1 (small) |
| R131 | Main T1 Tell check L1 | d6 = 1 |
| R132 | Main T1 Tell check L3 | d6 = 6 |
| R133 | Main T1 Tell check L4 | d6 = 4 |
| R134 | Main T2 E7 L1 way A, Sly + Monster (hidden) vs 8 | d8 = 2, d10 = 1 (3) |
| R135 | Main T2 E1 L3 way A, open Charm + Mask vs 4 | d10 = 10, d6 = 5 (15) |
| R136 | Main T2 E6 L4 way A, open Sly + Mask vs 6 | d10 = 6, d6 = 6 (12) |
| R137 | Main T3 E7 L1 way A, Sly + Monster (hidden) vs 8 | d8 = 2, d10 = 8 (10) |
| R138 | Main T3 E1 L3 ob2, Brawn + Mask vs 8 | d12 = 8, d6 = 5 (13) |
| R139 | Main T3 E6 L4 ob2, switch Brawn + Mask vs 6 | d12 = 1, d6 = 3 (4) |
| R140 | Main T4 E7 L1 ob2, Nimble + Mask vs 6 | d12 = 3, d6 = 1 (4) |
| R141 | Main T4 E1 L3 ob3, Charm + Mask vs 8 | d10 = 2, d6 = 6 (8) |
| R142 | Main T4 E6 furniture, open Sly + Mask vs 8 | d10 = 2, d6 = 3 (5) |
| R143 | Main T5 E6 furniture, open Sly + Mask vs 8 | d10 = 4, d6 = 4 (8) |
| R144 | Main T5 Tell check L2 | d6 = 2 |
| R145 | Main T6 E7 L1 ob3, Nimble + Mask vs 6 | d12 = 2, d6 = 2 (4) |
| R146 | Main T6 E1 L2 way B, Wits + Mask vs 6 | d8 = 3, d6 = 3 (6) |
| R147 | Main T7 E1 L2 ob2, open Charm + Mask vs 6 | d10 = 2, d6 = 3 (5) |
| R148 | Main T10 E7 way out, Nimble + Monster (hidden) vs 8 | d12 = 7, d10 = 2 (9) |
| R149 | D1 T1 Tell check L4 (two arrive) | d6 = 2 |
| R150 | D1 T2 group check, E6 open Sly + Mask vs 6 | d10 = 9, d6 = 2 (11) |
| R151 | D1 T2 group check, E1 Brawn + Mask vs 8 | d12 = 11, d6 = 5 (16) |
| R152 | D1 T3 E1 L4 ob2, Wits + Mask vs 6 | d8 = 2, d6 = 3 (5) |
| R153 | D1 T3 E6 furniture, open Sly raised to d12 + Mask vs 8 | d12 = 7, d6 = 5 (12) |
| R154 | D2 T8 E7 L2 ob3, switch Brawn + Duty raise (d12) + Monster (hidden) vs 10 | d12 = 11, d10 = 4 (15) |
| R155 | D3 local chase round 1, chase table | d6 = 4 |
| R156 | D3 local chase round 1, E7 Nimble + Monster vs 12 | d12 = 4, d10 = 5 (9) |
| R157 | D3 T11 E7 slip free, Nimble + Monster vs 10 | d12 = 6, d10 = 5 (11) |
| R158 | D3 T12 E6 way out, Sly raised to d12 + Monster vs 8 | d12 = 5, d10 = 2 (7) |
| R159 | D4 local chase start, E1 mob Weakness | d6 = 1 |
| R160 | D4 local chase start, E6 mob Weakness | d6 = 5 |
| R161 | D4 local chase round 1, chase table | d6 = 6 |
| R162 | D4 local chase r1, E1 Brawn + Monster vs 12 | d12 = 10, d10 = 4 (14) |
| R163 | D4 local chase r1, E6 Brawn d10 (Weakness) + Monster vs 12 | d10 = 4, d10 = 5 (9) |
| R164 | D4 final flight start, E1 mob Weakness | d6 = 2 |
| R165 | D4 final flight start, E6 mob Weakness | d6 = 2 |
| R166 | D4 flight round 1, chase table | d6 = 5 |
| R167 | D4 flight r1, E1 Charm raised to d12 + Monster vs 11 | d12 = 12, d10 = 3 (15) |
| R168 | D4 flight r1, E6 switch Brawn d12 + Monster vs 11 | d12 = 2, d10 = 6 (8) |
| R169 | D4 flight r1, E7 switch Brawn d10 + Monster vs 11 | d10 = 6, d10 = 7 (13) |
| R170 | D4 flight round 2, chase table | d6 = 4 |
| R171 | D4 flight r2, E1 Wits d8 + Monster vs 11 | d8 = 3, d10 = 7 (10) |
| R172 | D4 flight r2, E6 overdraw switch Brawn d12 + Monster vs 11 | d12 = 7, d10 = 9 (16) |
| R173 | D4 flight r2, E7 Nimble d12 + Monster vs 11 | d12 = 8, d10 = 5 (13) |
| R174 | D4 flight round 3, chase table | d6 = 2 |
| R175 | D4 flight r3, E1 Brawn d12 + Monster vs 11 | d12 = 11, d10 = 4 (15) |
| R176 | D4 flight r3, E6 Brawn d10 (Weakness) + Monster vs 11 | d10 = 5, d10 = 2 (7) |
| R177 | D4 flight r3, E7 Nimble d12 + Monster vs 11 | d12 = 11, d10 = 5 (16) |
| R178 | D4 flight round 4, chase table | d6 = 4 |
| R179 | D4 flight r4, E1 Wits d8 + Monster vs 11 | d8 = 5, d10 = 9 (14) |
| R180 | D4 flight r4, E6 Brawn (E7's overdrawn switch) d12 → d10 → d12 (E1's overdrawn raise) + Monster vs 11 | d12 = 3, d10 = 2 (5) |
| R181 | D4 flight r4, E7 Nimble d12 + Monster vs 11 | d12 = 9, d10 = 4 (13) |
| R182 | D5 T12 E1 rescue, open Charm + Monster vs 8 | d10 = 6, d10 = 8 (14) |
| R183 | D5 dawn flight start, E1 mob Weakness | d6 = 5 |
| R184 | D5 dawn flight start, E6 mob Weakness | d6 = 5 |
| R185 | D5 flight round 1, chase table | d6 = 5 |
| R186 | D5 flight r1, E1 Charm d8 (Weakness) + Monster vs 11 | d8 = 7, d10 = 5 (12) |
| R187 | D5 flight r1, E6 Sly d8 (Weakness) + Monster vs 11 | d8 = 3, d10 = 5 (8) |
| R188 | D5 flight r1, E7 Brawn d8 (switch, sunlight) + Monster vs 11 | d8 = 6, d10 = 4 (10) |
| R189 | D5 flight round 2, chase table | d6 = 1 |
| R190 | D5 flight r2, E1 Nimble d4 (Weakness) + Monster vs 11 | d4 = 2, d10 = 10 (12) |
| R191 | D5 flight r2, E6 Sly d8 (Weakness) + Monster vs 11 | d8 = 7, d10 = 1 (8) |
| R192 | D5 flight r2, E7 Nimble d10 (sunlight) + Monster vs 11 | d10 = 5, d10 = 6 (11) |
| R193 | D5 flight round 3, chase table | d6 = 2 |
| R194 | D5 flight r3, E1 Brawn d10 (Weakness) + Monster vs 11 | d10 = 2, d10 = 9 (11) |
| R195 | D5 flight r3, E6 Brawn d10 (Weakness) + Monster vs 11 | d10 = 8, d10 = 6 (14) |
| R196 | D5 flight r3, E7 Nimble d10 (sunlight) + Monster vs 11 | d10 = 7, d10 = 4 (11) |
| R197 | D5 flight round 4, chase table | d6 = 1 |
| R198 | D5 flight r4, E1 Nimble d4 (Weakness) + Monster vs 11 | d4 = 4, d10 = 8 (12) |
| R199 | D5 flight r4, E6 Sly d8 (Weakness) + Monster vs 11 | d8 = 8, d10 = 4 (12) |
| R200 | D5 flight r4, E7 Nimble d10 (sunlight) + Monster vs 11 | d10 = 4, d10 = 4 (8) |
| R201 | D5 flight round 5, chase table | d6 = 6 |
| R202 | D5 flight r5, E1 Brawn d10 (Weakness) + Monster vs 11 | d10 = 3, d10 = 8 (11) |
| R203 | D5 flight r5, E6 Brawn d10 (Weakness) + Monster vs 11 | d10 = 2, d10 = 9 (11) |
| R204 | D5 flight r5, E7 Brawn d8 (sunlight) + Monster vs 11 | d8 = 4, d10 = 9 (13) |
