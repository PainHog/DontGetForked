# PT10: Verification playtest after the PT9 fix round (V23, V24, V25 and the Chapter 4 wording; drills a–f)

## 1. What this is

A short, drills-only verification playtest of the rules after PT9's fix round (commit c90b70e): **V24** (Chapter 3: "A dropped item stays where you are (the location, the way out or the lock-up); drop yours any time but in a local chase."; Chapter 4: "Taking a piece (or taking it back up) is free; drop it any time but in a local chase."), **V25** (Chapter 3: "Anyone there may pick items up, as their action for a Turn."), **V23** (Chapter 6, slipping free: "at the lock-up Difficulty (it's always watched)", with Dracula's Mesmerise: "open an approach with Charm at a watched obstacle"), and the Chapter 4 wording: a location "guarding a list item (or two sharing a place); beat or pass the last and the loot is in your hand", and the furniture: "whoever is past all its obstacles may try for the piece". It also checks each of PT9's six findings against the book's text now (section 7).

**Rules source:** the rulebook text only: `book/src/chapters/*.html`, read as text (the chapters at commit 7b9eacc, the same text as c90b70e; they did not change while I played). Not the simulator, not `docs/`, not the Foundry code. Where the book is silent I made a ruling, listed it in section 3, and logged it as a finding in section 5. The fix commit's message was read only to see which PT9 findings it meant to answer (section 7).

**Dice:** every random result is a real `Math.random` roll from `node -e`, numbered R1 onward and listed in section 8. Each drill says exactly what I chose at its start; every roll after that is real. Where a drill needed a particular result to put a rule through the text, I restarted it from the same chosen start until the dice gave it, and every restart's rolls are listed. The players played to win; the Storyteller played by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now, but never one that costs nothing").

**Town:** drills a–e use Thistlewick, the premade Standard town (Chapter 9: Suspicion Limit 11, the way out 8, the lock-up 10, the final flight mob 11, escape at Lead 5). Drill f builds one location of an Easy town from Chapter 8's tables on a list whose kinds I chose. Entities use their default picks unless said.

---

## 2. Summary

(in progress)

---

## 3. Standing readings (my rulings where the book is silent; the ones that matter are findings in section 5)

| # | Reading | Finding |
|---|---|---|
| S1 | Starts, parties and what each Entity carries are chosen and stated at each drill's start; every roll after that is real. Thistlewick (Chapter 9) for drills a–e. | — (not a rule) |
| S2 | Dropping your own loot or piece takes no action and may happen at any moment, in anyone's turn, except from the moment you're caught until your local chase ends: Chapter 5 says Trouble "gets the Entity caught, and a local chase starts", so the catch and the chase begin together. | **w1** |
| S3 | "Anyone there" is any Entity at that place (the location as a whole, past its obstacles or not), the dropper or not, in the same Turn if they haven't acted yet. | — (the text answers it) |
| S4 | One pick-up takes any number of items lying at the place, for one action ("pick items up"). | **w2** |
| S5 | When the Storyteller picks "drop an item", the Storyteller also picks which of the roller's items (never what this roll wins). | — (minor; not logged) |
| S6 | A Cost on the way out costs nothing: "A Success or a Cost gets everyone out, free" (as PT8 read it, its S7). So nothing is ever dropped at the way out by a Cost; a drop there is by choice. | — (the text answers it) |
| S7 | A piece (or loot) dropped in the final flight stays in town, and nobody can take it up during the flight: the flight isn't one of Chapter 3's places, and it has no Turns. | **m1** |

---

## 4. Drill logs

Notation: trait die + second die = total vs Difficulty → result. "Shows" = the Monster die beat the trait die. Sus = Suspicion after the roll. Odds are Success / Cost / Trouble, exact from the book's dice.

### 4.1 Drill a: no dropping in a local chase (V24); dropping a piece in the final flight

**Start (chosen):** Thistlewick, Turn 10, at the way out. A party of two. **The Werewolf** (default: Good Dog, Keen Nose, Night Runner, Gardener; Hounds, Soon), **2 charges**, carries **the gilt mirror** (Bulky, taken at the hatter) and **the top hat**. **The Witch** (default: Hedge Spell, Broomstick, Familiar's Warning, Cook; Rowan, Soon), **1 charge**, carries **the wedding cake** and **the tea service** (both essentials). The rope and the turnip seed are not in hand. The Werewolf has rolled the way out (he is the better roller even carrying: Nimble d10 with the Monster die, 79% against the Witch's Sly d10 and the Mask, 65%) and got **Trouble**: I chose the start at the moment of the catch rather than roll for a 10% Trouble. Suspicion 6 → **7** (Trouble; the Monster didn't show). He flees alone: **Lead 2** (Night Runner), escape at 4, mob 8 + 3 = **11**. As a carrier he can't use the Mask, and his Nimble is d10.

**The drop, refused.** Before round 1 he wants to set down the mirror (for the Mask and his d12 Nimble) and the top hat (so a capture can't take it). Chapter 3: "drop yours any time **but in a local chase**"; Chapter 4 the same for a piece. Chapter 5: Trouble at a watched obstacle "gets the Entity caught, **and a local chase starts**", so the chase starts at the catch and there is no moment between them: **refused** (S2). He asks again in round 2: refused.

**a1, run 1** (R1–R12):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R1 = 1 crowded square (Sly d6, Charm d4) | **Keen Nose** (2 → 1): Wits d8 instead, Monster (carrier) (45 / 20 / 35) | 1 + 1 | 2 vs 11 | Trouble (doubles, but no Success) | 1 | 8 |
| 2 | R4 = 3 market stalls | Asks to drop the mirror for Nimble d12: **refused**. Brawn d10, Monster with **Good Dog** (1 → 0) (45 / 19 / 36) | 6 + 6 | 12 vs 12 | **Critical**: two Successes | 3 | 8 |
| 3 | R7 = 5 festival parade (Sly d6 → d4, Charm d4: Hounds from round 3) | Keen Nose **overdrawn** (+2): Wits d8 → d6 (Hounds), Monster (25 / 20 / 55) | 1 + 10 (shows) | 11 vs 12 | Cost (no change). Show +2, overdraw +2: one rise, +2 | 3 | 10 |
| 4 | R10 = 5 festival parade | Sly d4, Monster (15 / 20 / 65) | 4 + 1 | 5 vs 12 | Trouble: +1, **the Limit** (11) | 2 | 11 |

"If the Limit comes during a local chase, that chase ends at once and those Entities join the flight." Not cornered, so not captured: he goes into the final flight **still carrying the mirror and the top hat**. That is drill a2's start (below), reached by the dice. For a capture or an escape I restarted from the same start.

**a1, run 2** (R28–R33):

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R28 = 1 crowded square | Keen Nose (2 → 1): Wits d8, Monster (45 / 20 / 35) | 3 + 5 (shows) | 8 vs 11 | Trouble; show +2 (one rise) | 1 | 9 |
| 2 | R31 = 4 rooftops (Nimble d10 carrying, Wits d8) | Asks to drop the mirror and the hat: **refused**. Nimble d10, Monster with Good Dog (1 → 0) (45 / 19 / 36) | 3 + 4 | 7 vs 12 | Trouble: **cornered** | 0 | 10 |

**Captured.** "The town takes back what you were carrying, furniture included: it's gone for the night": **the gilt mirror and the top hat are gone**, and he is held at the lock-up. Without V24 he would have set both down before round 1 (PT9's drill c) and lost neither; with it, the capture costs what Chapter 6 says. Had he been allowed to drop the mirror, round 2 would have been Nimble d12 with the Mask; the refusal also kept the carrier's two penalties in the chase, which is what Chapter 4 says ("Carriers can't use the Mask; their Nimble is one size smaller").

**a2: the same Werewolf in the final flight, with the piece** (from run 1's Limit; R13–R27). The Werewolf (0 charges, already overdrawn once this raid, which doesn't count against "once per flight") carries the mirror and the top hat; the Witch (1 charge) the cake and the tea service. In hand: both essentials and one extra; the rope and the turnip seed are missing, so the best result is a **Partial** ("at most one extra missing" for a Win), and the mirror can't make a Grand Year ("A Win, plus at least one piece"). It is dead weight. Before round 1 **he drops it**: a final flight isn't a local chase, so "drop it any time but in a local chase" allows it. Where does it stay, and may the Witch take it up again ("taking it back up is free")? The book doesn't say; I ruled that it stays in town and nobody can take it up in the flight (S7). Finding **m1**. The final flight: Lead 2, escape at 5, mob 11, the Mask off; Hounds and Rowan from round 3.

| Round | Ground | Werewolf | Witch | Successes / Trouble | Lead |
|---|---|---|---|---|---|
| 1 | R13 = 6 dead end | Brawn d10 + Monster (55 / 17 / 28): 3 + 3 = 6, Trouble | Wits d12 + Monster (63 / 14 / 23): 6 + 9 = 15, Success | 1 / 1: stays | 2 |
| 2 | R18 = 5 festival parade | Sly d6 → d8 (the Witch's **Hedge Spell** on his roll, 1 → 0: "abilities can help anyone's roll") + Monster (45 / 20 / 35): 6 + 7 = 13, Success | Sly d10 + Monster (55 / 17 / 28): 9 + 4 = 13, Success | 2 / 0: +2 | 4 |
| 3 | R23 = 2 back alleys | **Nimble d12 → d10** (Hounds; still carrying it would have been d8) + Monster (55 / 17 / 28): 4 + 7 = 11, Success | Sly d10 → d8 (Rowan) + Monster (45 / 20 / 35): 2 + 7 = 9, Cost | 1 / 0: +1 | **5: escaped** |

Home with the cake, the tea service and the top hat: a **Partial**. The mirror stayed in town. The drop paid off only in round 3, the one round where Nimble was his trait, and was worth one die size there.

**What a showed.** V24 reads cleanly: a caught carrier keeps loot and furniture through the chase, and a capture takes both (run 2). The final flight allows the drop, as the text says. Two gaps around it: the moment of the catch is covered only by reading Chapter 5 with Chapter 3 (**w1**), and a drop in the final flight has no place to stay and no rule on taking it up (**m1**).

### 4.2 Drill b: a dropped item picked up by someone else; two items in one action; Turn 12; as the Limit comes (V25)

**b1. Start (chosen):** Thistlewick, **Turn 7**, Suspicion **3**, the china shop (watched by its back gate; the Tell check was made on arrival). The locked front door (way A) is beaten. **Frankenstein's Creature** (default: Brute Force, Mountain Stride, Strong Back, Handyman; Fire, Soon), 2 charges, carries **the coil of rope**. **Dracula** (default: Mesmerise, Bat, Hypnotic Eyes, Butler; Garlic, Always), 2 charges, carries nothing and **hasn't acted this Turn**. Next and last: the dark, cluttered back room (Wits / Sly loud, 8, not watched). The Creature rolls (Wits d10, Mask: 65 / 18 / 17; Dracula's Butler raise works only on his own rolls, and his Wits is d4). The drill needed a Cost, so I restarted until one came.

| Try | Rolls | Dice | Total | Result |
|---|---|---|---|---|
| 1 | R34–R35 | 8 + 4 | 12 vs 8 | Success |
| 2 | R36–R37 | 10 + 5 | 15 | Success |
| 3 | R38–R39 | 7 + 6 | 13 | Success |
| 4 | R40–R41 | 4 + 3 | **7 vs 8** | **Cost**: the tea service is in hand |

**The Storyteller's Cost.** Turn 7 isn't "near dawn" and Suspicion 3 of 11 isn't "near the Limit"; the Creature carries loot, and Chapter 8 says "'drop an item' when someone carries loot". It can't be the tea service ("never what this roll wins"), so **the rope drops**. Chapter 3: "A dropped item stays where you are (the location, the way out or the lock-up)": it lies at the china shop.

**The pick-up.** "Anyone there may pick items up, as their action for a Turn." Dracula is there and hasn't acted, so he picks the rope up **as his Turn 7 action** ("Entities act one at a time, in any order, and each result counts at once"), instead of moving ahead to the hatter as planned. The Cost cost the party Dracula's move. It reads cleanly: anyone at the place, not only the dropper (S3), and in the same Turn if they haven't acted. (Had Dracula had nothing better to do that Turn, the drop would have cost nothing at all: section 6.)

**b2: two items in one action. Start (chosen):** Thistlewick, **Turn 6**, Suspicion 4. **The Witch**, 2 charges, **alone** at the baker, past the shuttered window (beaten), carries **the turnip seed and the coil of rope**. Next and last: the shopkeeper behind the counter (Charm / Sly loud, 8, **watched**). Before rolling she **sets both down** (not in a local chase, so allowed), so that if she's caught and captured the town can't take them. Charm d8 → d10 (Cook: the wedding cake is food), Mask (65 / 18 / 17).

| Turn | Rolls | Action | Dice | Result |
|---|---|---|---|---|
| 6 | R42–R43 | Sets both down (free); the shopkeeper | 7 + 4 = 11 vs 8 | **Success**: the wedding cake is in hand |
| 7 | — | **Picks up the seed and the rope**, as her action for the Turn | — | Both in hand |

"Anyone there may pick items up": I read the plural as one action for any number of items lying there (S4); the text doesn't say "any number" in so many words (**w2**). Her insurance cost one action and no roll.

**b3: picking up in Turn 12. Start (chosen):** Thistlewick, **Turn 12**, Suspicion 8. **The Werewolf**, alone at the seed merchant (both obstacles beaten); the turnip seed lies there (his own Cost dropped it on Turn 11; chosen, not rolled). He picks it up **as his Turn 12 action**. He can't also move to the way out: the pick-up is the action. Dawn comes when the 12th Turn ends, and he runs in the final flight **with the seed in hand**. No dice needed. Under PT9's second reading ("pick it up at once and skip your next action") he could have picked it up and moved in Turn 12; the new text closes that.

**b4: as the Limit comes. Start (chosen):** Thistlewick, **Turn 9**, Suspicion **10** of 11. **The Witch** is at the china shop, where **the tea service** (an essential) lies, dropped by a Cost earlier; she hasn't acted. **The Creature** hasn't acted either, and the party chooses to move him first: to the seed merchant, a watched location nobody has reached yet, so a Tell check (a d6, 4–6). The drill needed the Tell, so I restarted until it came.

| Try | Roll | Tell check | What follows |
|---|---|---|---|
| 1–5 | R44–R48 = 2, 2, 3, 2, 2 | Nothing | The Witch picks up the tea service as her Turn 9 action |
| 6 | R49 = **5** | **The Creature's Tell** (he arrives alone, so no roll for whose): Head and Shoulders. Suspicion **11, the Limit** | See below |

"When Suspicion reaches the Limit ... the whole town hunts. Every Entity who isn't captured flees together in the final flight." The Witch asks to pick up the tea service "as the Limit comes": **refused**. Picking up is "their action for a Turn", and the Turns are over. The tea service stays at the china shop, and the party flees without an essential: a Partial at best. Had the party moved her first (the order is theirs), it would have been in hand. Under PT9's second reading she could have picked it up at once, skipping a next action that never came; the new text closes that too.

**What b showed.** V25 reads cleanly for the dropper, a friend at the place, two items and the end of the night. One wording gap: "pick items up" for any number at once (**w2**).
