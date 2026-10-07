# PT10: Verification playtest after the PT9 fix round (V23, V24, V25 and the Chapter 4 wording; drills a–f)

## 1. What this is

A short, drills-only verification playtest of the rules after PT9's fix round (commit c90b70e): **V24** (Chapter 3: "A dropped item stays where you are (the location, the way out or the lock-up); drop yours any time but in a local chase."; Chapter 4: "Taking a piece (or taking it back up) is free; drop it any time but in a local chase."), **V25** (Chapter 3: "Anyone there may pick items up, as their action for a Turn."), **V23** (Chapter 6, slipping free: "at the lock-up Difficulty (it's always watched)", with Dracula's Mesmerise: "open an approach with Charm at a watched obstacle"), and the Chapter 4 wording: a location "guarding a list item (or two sharing a place); beat or pass the last and the loot is in your hand", and the furniture: "whoever is past all its obstacles may try for the piece". It also checks each of PT9's six findings against the book's text now (section 7).

**Rules source:** the rulebook text only: `book/src/chapters/*.html`, read as text (the chapters at commit 7b9eacc, the same text as c90b70e; they did not change while I played). Not the simulator, not `docs/`, not the Foundry code. Where the book is silent I made a ruling, listed it in section 3, and logged it as a finding in section 5. The fix commit and the decisions log were read only to see what was decided about PT9's findings (section 7); no ruling here comes from them.

**Dice:** every random result is a real `Math.random` roll from `node -e`, numbered R1 onward and listed in section 8. Each drill says exactly what I chose at its start; every roll after that is real. Where a drill needed a particular result to put a rule through the text, I restarted it from the same chosen start until the dice gave it, and every restart's rolls are listed. The players played to win; the Storyteller played by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now, but never one that costs nothing").

**Town:** drills a–e use Thistlewick, the premade Standard town (Chapter 9: Suspicion Limit 11, the way out 8, the lock-up 10, the final flight mob 11, escape at Lead 5). Drill f builds one location of an Easy town from Chapter 8's tables on a list whose kinds I chose. Entities use their default picks unless said.

---

## 2. Summary

| Drill | What it puts through the text | Result | Suspicion |
|---|---|---|---|
| **a**: no dropping in a local chase (V24); a piece dropped in the final flight | The Werewolf, caught at the way out carrying the gilt mirror and the top hat, asks to drop both before round 1 and in round 2; then the same Werewolf in a final flight with the mirror | Refused four times (two runs). Run 1: **the Limit** in round 4, into the flight still carrying both. Run 2: **captured** in round 2; the town took the mirror and the hat. a2: he dropped the mirror before round 1 (allowed); **escaped** in round 3, a Partial | 7 → 11; 7 → 10 |
| **b**: picking up (V25) | A Cost's "drop an item" picked up by a friend; two items in one action; a pick-up in Turn 12; a pick-up as the Limit comes | b1 the Cost on the 4th try, the rope dropped, Dracula picked it up as his own action that Turn. b2 two items set down before a watched roll, both picked up in one action. b3 the Turn 12 pick-up was the Turn's action. b4 the Limit on a Tell (6th try): the pick-up **refused**, an essential left in town | 3 → 3; 4; 8; 10 → 11 |
| **c**: the way out and the lock-up | Loot set down at the way out, and at the lock-up by a rescuer; who may pick each up | The rescue a Critical; the cake picked up by the Creature the same Turn; the way-out stash for anyone there before the party rolls | 5 |
| **d**: the furniture | "Try for the piece"; set down, wait, take it back up (free), carry on | The guard dog beaten first try; the mirror set down at the baker, the window rolled with the Mask and full Nimble (a Cost), a Turn waited, taken back up free | 1 → 8 (the mirror +6) |
| **e**: slipping free (V23) | Dracula's Mesmerise at the lock-up; another captive's slip; a slip's Trouble | Dracula and the Witch both slipped on their first try; a restart gave two slip Troubles (no chase), then Dracula Mesmerised the rescue (a Critical) | 6; 6 → 8 |
| **f**: two items sharing a place | An Easy list of four food items (kinds chosen; the rest rolled): the wedding cake and the flour share the butcher | One location, one Tell check; both items in the Mummy's hand on Turn 2 | 0 |

**What was verified and where**

| Text | Where | Rolls | Read cleanly? |
|---|---|---|---|
| Ch3: "A dropped item stays where you are (the location, the way out or the lock-up)" | b1 (a location), c1 (the way out), c2 (the lock-up) | R34–R41, R50–R53 | Yes. A drop off a place (the final flight, between places): **m1** |
| Ch3: "drop yours any time but in a local chase"; Ch4 the same for a piece | a1 (refused, both runs), a2 (allowed in the flight), b2, c1, c2, d2 (allowed) | R1–R33, R42–R43, R52–R53, R56–R58 | Yes. The instant of the catch: **w1** |
| Ch3: "Anyone there may pick items up, as their action for a Turn." | b1 (a friend), b2 and c1 (two at once), b3 (Turn 12), b4 (as the Limit comes: refused), c2 (who may) | R34–R53 | Yes. "Any number": **w2**; captives: **w3**; what a drop costs now: **w4** |
| Ch4: "guarding a list item (or two sharing a place); beat or pass the last and the loot is in your hand" | f | R73–R102 | Yes |
| Ch4: "Taking a piece (or taking it back up) is free" | d2 | R56–R58 | Yes. Round a roll it makes the carrier's dice penalty free to dodge: **m2** |
| Ch4: "whoever is past all its obstacles may try for the piece" | d1 | R54–R55 | Yes |
| Ch6: slipping free "at the lock-up Difficulty (it's always watched)"; Ch2: Mesmerise "at a watched obstacle" | e | R59–R72 | Yes |

**Counts: 0 blockers, 0 major, 2 minor, 4 wording** (6 in all, section 5). By kind: **2 rules** questions for the author (m1: where a drop in the final flight goes; m2: setting a piece down round a roll) and **4 wording** (w1–w4).

**PT9's 6 findings: 6 resolved, 0 partly, 0 not changed** (section 7). M1's fix held in play: a capture took a caught carrier's loot and furniture.

**Chases:** 2 local chases (a1), of 4 and 2 rounds: one ended at the Limit, one captured. 1 final flight (a2), 3 rounds, escaped. 102 rolls in all.

---

## 3. Standing readings (my rulings where the book is silent; the ones that matter are findings in section 5)

| # | Reading | Finding |
|---|---|---|
| S1 | Starts, parties and what each Entity carries are chosen and stated at each drill's start; every roll after that is real. Thistlewick (Chapter 9) for drills a–e. | — (not a rule) |
| S2 | Dropping your own loot or piece takes no action and may happen at any moment, in anyone's turn, except from the moment you're caught until your local chase ends: Chapter 5 says Trouble "gets the Entity caught, and a local chase starts", so the catch and the chase begin together. | **w1** |
| S3 | "Anyone there" is any Entity at that place (the location as a whole, past its obstacles or not), the dropper or not, in the same Turn if they haven't acted yet. | — (the text answers it) |
| S4 | One pick-up takes any number of items lying at the place, for one action ("pick items up"). | **w2** |
| S5 | When the Storyteller picks "drop an item", the Storyteller also picks which of the roller's items (never what this roll wins). | — (the Storyteller picks the Cost; not logged) |
| S6 | A Cost on the way out costs nothing: "A Success or a Cost gets everyone out, free" (as PT8 read it, its S7). So nothing is ever dropped at the way out by a Cost; a drop there is by choice. | — (the text answers it) |
| S7 | A piece (or loot) dropped in the final flight stays in town, and nobody can take it up during the flight: the flight isn't one of Chapter 3's places, and it has no Turns. | **m1** |
| S8 | A captive still held isn't "anyone there" at the lock-up: it may neither pick items up nor be handed them. Chapter 6 gives a captive one thing to do each Turn (try to slip free), and the town "takes back what you were carrying" (Hidden Pockets is the one exception). | **w3** |
| S9 | A freed captive (rescued or slipped) may pick items up from the next Turn: it "acts again next Turn". | — (the text answers it) |
| S10 | Anything still lying at the way out when "a Success or a Cost gets everyone out" stays in town; so does a set-down piece ("until it's carried out of town"). | — (the text answers it) |
| S11 | Taking a set-down piece back up is free: no action, no roll, at any moment (not in a chase), by anyone at the place where it stands; so also straight after your own roll, in the same action. | **m2** |
| S12 | A slip at the lock-up is "always watched", so Mesmerise can open it (Charm at 10 − 2 = 8); its Trouble still starts no chase, as the same sentence says. A freed Entity doesn't trigger the lock-up's Tell check. | — (the text answers it) |
| S13 | "Try for the piece" means rolling the furniture's extra obstacle; once it is beaten (it isn't a group obstacle) anyone at the location may take the piece, free. | — (the text answers it) |
| S14 | Two items sharing a place are one location: one obstacle count, one pair of ways in, one Tell check, and both items in the hand of whoever beats or passes the last obstacle. | — (the text answers it) |

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

**The pick-up.** "Anyone there may pick items up, as their action for a Turn." Dracula is there and hasn't acted, so he picks the rope up **as his Turn 7 action** ("Entities act one at a time, in any order, and each result counts at once"), instead of moving ahead to the hatter as planned. The Cost cost the party Dracula's move. It reads cleanly: anyone at the place, not only the dropper (S3), and in the same Turn if they haven't acted. (Had Dracula had nothing better to do that Turn, the drop would have cost nothing at all: **w4**.)

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

### 4.3 Drill c: loot set down at the way out, and at the lock-up by a rescuer: who may pick each up?

**Start (chosen):** Thistlewick, **Turn 8**, Suspicion **5**. A party of three. **Dracula** was captured on Turn 7 and is held at the lock-up (the town took what he carried). **Frankenstein's Creature**, 2 charges, is **alone at the way out** (he came back to it on Turn 7, and its first-return Tell check was made then: nothing), carrying **the top hat and the coil of rope**. **The Witch**, 2 charges, is at the baker with **the wedding cake**. Nobody has reached the lock-up yet.

**c1: the way out.** The Creature means to go to the rescue, and a rescuer's Trouble "gets them caught as usual"; cornered, he'd lose what he carries. So, Turn 8, he **sets the top hat and the rope down at the way out** (free; not in a local chase): "A dropped item stays where you are (the location, **the way out** or the lock-up)". Then he moves to the lock-up, as the Witch does from the baker; they arrive together.

| Turn | Rolls | What | Result |
|---|---|---|---|
| 8 | R50, R51 | The lock-up's Tell check: the first time anyone reaches it ("the lock-up does; ... not a captive being brought in"). A d6, and the Witch's Familiar's Warning second d6 | R50 = 2: nothing (R51 = 1, not needed) |

**c2: the lock-up, a rescuer.** Turn 9. The plan: the Witch tries the rescue first, and if she's caught the Creature tries after her ("Several may try the same obstacle in one Turn"). Either may be caught, so neither wants to hold the cake, and handing it over (free) would only move the risk. The Witch **sets the cake down at the lock-up** and rolls.

| Turn | Rolls | Roll | Dice | Total | Result |
|---|---|---|---|---|---|
| 9 | R52–R53 | The Witch, the rescue (Sly, or Brawn the loud way, 10, watched): Sly d10 → d12 (**Hedge Spell**, 2 → 1), Mask (54 / 17 / 29) | 5 + 5 | 10 vs 10 | **Critical**: Dracula is free, "at the lock-up, and acts again next Turn"; one spent charge back (1 → 2) |

**Who may pick each up.**

- **The cake, at the lock-up.** Anyone at the lock-up, as their action for a Turn. The Creature hasn't acted in Turn 9, so **he picks it up at once**, as his Turn 9 action. The Witch could from Turn 10. Dracula could from Turn 10 ("acts again next Turn"), not in Turn 9 (S9). Before the rescue, could Dracula have picked it up as a captive? He was "there", and "Anyone there may pick items up" doesn't exclude him; nor does "hand it over free in the same place". I ruled no: a captive is held, Chapter 6 gives a captive one thing to do each Turn (try to slip free), and the town "takes back what you were carrying" (S8). Finding **w3**.
- **The hat and the rope, at the way out.** Anyone at the way out, as their action. Turn 10: all three move there. Turn 11: the Creature **picks up both** (one action, S4), then the Witch rolls the way out for everyone. The order matters: anything still lying at the way out when "a Success or a Cost gets everyone out" stays in town (S10). (The way out wasn't rolled: the drill's question was answered.)

**What c showed.** Both places read cleanly: the way out and the lock-up are named in Chapter 3's list, and a stash there waits for anyone who comes. Setting loot down before a watched roll protects it from a capture at the cost of one action later (here the Creature's, in a Turn he had nothing else to do). One gap: captives at the lock-up (**w3**).

### 4.4 Drill d: the furniture's "try for the piece"; a carrier sets the piece down, waits, takes it back up

**Start (chosen):** Thistlewick, **Turn 3**, Suspicion **1**, the hatter. **Dracula** (3 charges) beat the nosy neighbour (way A, Sly 8, not watched) on Turn 2 and holds **the top hat**. **The Werewolf** (3 charges) is with him. The furniture: **the gilt mirror** (Bulky), behind a guard dog (watched, Charm (good dog) / Nimble loud, **10**, already 2 harder).

**d1: "try for the piece".** Chapter 4: "Once that location's loot is in hand, whoever is past all its obstacles may try for the piece." The top hat is in hand, and both are past the neighbour (it "stays beaten for the whole party"): either may try. Dracula hands the top hat to the Werewolf first (free, so a capture can't take it) and tries.

| Turn | Rolls | Roll | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|
| 3 | R54–R55 | Dracula, the guard dog: Charm d12, Monster under **Hypnotic Eyes** (shows only on a 2+ lead: 30%) (70 / 13 / 18; the Mask's 54 / 17 / 29) | 12 + 1 | 13 vs 10 | Success: the dog is beaten for the party | 1 |

I read "try for the piece" as rolling the extra obstacle named in the sentence before, and the piece as free to take once it's beaten, by anyone at the location (it isn't a group obstacle). It reads cleanly. **The Werewolf takes the mirror** ("Taking a piece ... is free"). End of Turn 3: the mirror +1 → **2**.

**d2: set down, wait, take it back up, carry on.**

| Turn | Rolls | The Werewolf | Sus at the end |
|---|---|---|---|
| 4 | — | Carries the mirror toward the baker: a move "takes two Turns: you're between places until you act in the second" | 3 |
| 5 | R56 | Arrives at the baker (watched; nobody has been there): Tell check R56 = 3, nothing | 4 |
| 6 | R57–R58 | **Sets the mirror down** (free). He's no longer carrying, so he rolls the shuttered window (way B, Nimble / Brawn loud, 8, not watched) with **Nimble d12 and the Mask** (71 / 15 / 14). Carrying, it would have been Nimble d10 and the Monster forced (a 45% show). 3 + 4 = 7 vs 8: **Cost**, the window is beaten. The Storyteller's Cost: "drop an item" would only cost him an action, and so would "lose a Turn", in a Turn he means to wait anyway; **Suspicion +1** | 4 + 1, then the mirror "even set down" +1: 6 |
| 7 | — | **Waits** (for the Witch, who arrives this Turn for the shopkeeper). The mirror lies at the baker | 7 |
| 8 | — | **Takes it back up** ("Taking a piece (or taking it back up) is free": no action) and carries on toward the way out, the first Turn of a two-Turn move | 8 |

Chapter 4's "Taking a piece (or taking it back up) is free" reads cleanly: no action, no roll, and the noise runs on "even set down". But it also means that in Turn 6 he could have **taken the mirror back up right after his roll**, in the same action, at no cost: he got the Mask and his full Nimble for the roll and kept the piece. Nothing in the book stops a carrier doing that before every roll outside a local chase, so "Carriers can't use the Mask; their Nimble is one size smaller" bites only in a chase, or when the carrier itself rolls the way out (a piece left lying there stays in town, S10); under the other reading of m1, not even in the final flight. Finding **m2**.

**What d showed.** "Try for the piece" and "taking it back up" both read cleanly. The six Turns of noise (+6, of Suspicion 1 → 8) were the real cost of the mirror; the carrier's dice penalty cost nothing, because a free set-down and a free take-up can go round any roll outside a chase (**m2**).

### 4.5 Drill e: slipping free at a watched lock-up (V23); Mesmerise; a slip's Trouble

**Start (chosen):** Thistlewick, the start of **Turn 6**, Suspicion **6**. **Dracula** (2 charges) and **the Witch** (1 charge) were each captured on Turn 5 and are held at the lock-up; nobody is coming for them. Chapter 6: "once per Turn, from the Turn after its capture, a captive may try to slip free: Sly or Nimble, or Brawn the loud way, at the lock-up Difficulty (**it's always watched**). Only a Success frees you; a Cost does nothing, and on Trouble Suspicion rises but no chase starts."

**Mesmerise at the lock-up.** "Open an approach with Charm at a watched obstacle", and Chapter 3: "if it doesn't list the ability's trait, roll that trait at 2 lower Difficulty, watched as usual ... a captive may open its own way out." The slip lists Sly, Nimble and Brawn, not Charm, and the lock-up is now always watched: Dracula rolls **Charm d12 at 10 − 2 = 8**. He takes the Mask (71 / 15 / 14) over the Monster under Hypnotic Eyes (83 / 9 / 8, but a 30% show for +2 while his friends are still raiding).

| Turn | Rolls | Captive | Roll | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 6 | R59–R60 | Dracula | **Mesmerise** (2 → 1): Charm d12, Mask | 7 + 4 | 11 vs 8 | **Success**: free, "starts at the lock-up and acts again next Turn" | 6 |
| 6 | R61–R62 | The Witch | Sly d10 → d12 (**Hedge Spell** on her own roll, 1 → 0), Mask (54 / 17 / 29) | 10 + 4 | 14 vs 10 | **Success**: free | 6 |

Both slipped on the first try. The drill needed a slip's Trouble, so I restarted **the Witch's slip** from the same start (Dracula's Turn 6 roll stands in every restart). R63–R68 were rolled as one batch of three restarts; restart 2 gave the Trouble and I played on from it, so restarts 3 (R65–R66: 3 + 1, Trouble) and 4 (R67–R68: 12 + 4, Success) are listed but not used.

**Restart 2** (R63–R64, R69–R72):

| Turn | Rolls | Who | Roll | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 6 | R63–R64 | The Witch | Sly d12 (Hedge Spell, 1 → 0), Mask | 3 + 1 | 4 vs 10 | **Trouble**: Suspicion +1, **no chase**; still held | 7 |
| 7 | R69–R70 | The Witch | Sly d10, Mask (45 / 20 / 35); no charge, and not worth an overdraw | 1 + 3 | 4 vs 10 | **Trouble**: +1, no chase | 8 |
| 7 | R71–R72 | Dracula (freed on Turn 6, at the lock-up) | The rescue ("Sly, or Brawn the loud way, always watched", 10): **Mesmerise** (1 → 0), Charm d12 at 8, Mask. An opened approach: "the way out (everyone leaves) and a rescue work as usual" | 6 + 6 | 12 vs 8 | **Critical**: "every captive there is free"; one charge back (0 → 1) | 8 |

A freed Entity isn't "reaching" the lock-up, so no Tell check for Dracula (Chapter 5 counts the first arrival).

**What e showed.** V23 reads cleanly: "(it's always watched)" lets Mesmerise open a slip, and the very next sentence still keeps a slip's Trouble from starting a chase, so "watched" here is for Mesmerise and nothing else. Two slip Troubles cost +1 each and nothing more. Dracula's Mesmerise worked from both sides of the bars: his own slip and, once out, the rescue of the Witch.

### 4.6 Drill f: two items sharing a place; the location guarding both

**Start (chosen):** an **Easy** list (4 items, the first essential) whose **kinds I chose**: all four food and drink, so one place must take two. Every item, place and obstacle rolled on Chapter 8's tables, Easy column. Only the shared location was built and played.

**The list** (R73–R77; "roll again on a repeated item"): **a side of bacon** · essential (R73 = 2), a wheel of strong cheese (R74 = 1), the wedding cake in the shop window (R75 = 6), and R76 = 1, the cheese again, so again: R77 = 4, **a sack of flour**.

**Places** (food: the baker, the butcher, the tavern cellar; a d3 as "a d6 halved, rounding up"; "one item per place"): the bacon R78 = 5 → 3, **the tavern cellar**; the cheese R79 = 2 → 1, **the baker**; the cake R80 = 1 → 1 (the baker, taken), R81 = 6 → 3 (the cellar, taken), R82 = 5 → 3 (taken), R83 = 2 → 1 (taken), R84 = 5 → 3 (taken), R85 = 4 → 2, **the butcher**. The flour: all three places are taken, so "if a kind has more items than places, two may share a place (one location, guarding both)": R86 = 4 → 2, **the butcher, with the cake**. Three locations for four items.

**The butcher** (R87–R96): obstacles R87 = 16, **two** (Easy: 11–18). Way A R88 = 17, a locked strongbox, Difficulty R89 = 2 → **6**, watched R90 = 2 (**watched**: Easy 1–4). Way B R91 = 7, the rooftops (group; its quiet way, Nimble, differs from Wits, so it stands), R92 = 1 → **6**, R93 = 4 (**watched**). Then R94 = 5, a high garden wall, R95 = 6 → **8**, R96 = 10 (not watched).

| Location · items | Obstacle | Quiet way | Loud way | Difficulty | Watched |
|---|---|---|---|---|---|
| **The butcher**: the wedding cake in the shop window **and** a sack of flour (food and drink) | Way in: a locked strongbox | Wits | Charm | 6 | watched |
| | or: the rooftops (group) | Nimble | — | 6 | watched |
| | Then: a high garden wall | Nimble | Brawn | 8 | — |

**Play.** Party (chosen): **the Witch** (Cook: her die is one size larger on her own rolls here, where the items are food) and **the Mummy** (default: Ancient Lore, Royal Bearing, Patience of Ages, Librarian; A Loose Thread, Soon), 3 charges each, Suspicion 0, at the edge of town.

| Turn | Rolls | What | Dice | Result | Sus |
|---|---|---|---|---|---|
| 1 | R97–R98 | Both move to the butcher: **one** Tell check for the location, however many items it guards. A d6 and Familiar's Warning's second d6 | 3; 6 | Nothing (both must be 4–6) | 0 |
| 2 | R99–R100 | The Witch, the strongbox (way A): Wits d12 (the Cook raise can't take a d12 higher), Mask (86 / 10 / 4) | 12 + 4 = 16 vs 6 | Success: way A is open for the party | 0 |
| 2 | R101–R102 | The Mummy, the wall: **Ancient Lore** (3 → 2), Wits d12 instead, Mask (71 / 15 / 14) | 6 + 4 = 10 vs 8 | Success: "beat or pass the last and **the loot** is in your hand": **the cake and the flour**, both in the Mummy's hand | 0 |

**What f showed.** Chapter 4's "guarding a list item (or two sharing a place); beat or pass the last and the loot is in your hand" now matches Chapter 8's "one location, guarding both": one obstacle count, one pair of ways in, one Tell check, both items on one roll. Had the wall been a Cost, "drop an item ... never what this roll wins" would have spared both (the roll won both), and the Mummy carried nothing else. Nothing unclear.

---

## 5. Findings (most severe first)

No blockers, no majors. Everything I was asked to verify read cleanly at the moment it mattered: a caught carrier couldn't drop loot or furniture, and a capture took both (V24); a dropped item stayed at its place and was picked up by a friend, two at a time, in Turn 12 but not as the Limit came (V25); the lock-up's "always watched" let Dracula Mesmerise a slip, and a slip's Trouble still started no chase (V23); and Chapter 4's shared location and "try for the piece" matched Chapter 8. What's left sits at the edges: a drop where there's no place to leave it (m1), and the free take-up of a piece, which lets a carrier dodge its dice penalty round any roll (m2). Each finding is marked **rules** (the fix would change or add a rule: needs the author's decision; no new numbers proposed) or **wording** (the book already implies an answer).

### 5.1 Minor

| id | Kind | Passage (quoted, chapter) | What happened / what I did | Suggested fix |
|---|---|---|---|---|
| m1 | rules | Ch3: "A dropped item **stays where you are (the location, the way out or the lock-up)**; drop yours any time but in a local chase." · Ch4: "**Taking a piece (or taking it back up) is free**; drop it any time but in a local chase." · Ch4: "Carrying, a move takes two Turns: **you're between places** until you act in the second." | Drill a2: the Werewolf dropped the gilt mirror before the final flight's first round; "but in a local chase" allows it. But a final flight isn't one of Chapter 3's three places (nor is "between places", which PT9's m1 noted in passing), and "taking it back up is free" names no place. I ruled that it stays in town and nobody can take it up during the flight (S7). Read the other way, flight-mates could hand a piece round each round to whoever isn't rolling Nimble, or a carrier could set it down before its own roll and take it up after (m2), and the carrier's Nimble penalty would never bite in a flight. | Needs the author's decision. **(a)** Ch3: "… (the location, the way out or the lock-up; dropped in the final flight, it's left in town)", and for a carrier between places, "a piece set down between places stays at the place you left" (recommended: it matches S7, and there's nothing to track); **(b)** let anyone in the flight take a dropped piece up (free), and say so. Then sync the simulator and Foundry. |
| m2 | rules | Ch4: "**Carriers can't use the Mask; their Nimble is one size smaller.**" · "**Taking a piece (or taking it back up) is free**; drop it any time but in a local chase." · Ch2: Tireless "carrying doesn't make your Nimble smaller"; Brute Strength "as Hyde, carrying doesn't make your Nimble smaller" | Drill d2: the Werewolf set the mirror down (free), rolled the window with Nimble d12 and the Mask instead of Nimble d10 and the Monster forced (a 45% show), and could have taken it back up straight after, in the same action, for nothing. Done before every roll, the carrier's dice penalty costs nothing except in a chase (dropping is barred in a local chase, and a piece dropped in the final flight is gone, S7) and when the carrier itself rolls the way out (a piece left lying there stays in town, S10). Tireless and Brute Strength then matter only in chases. The noise doesn't change: it runs "even set down". | Needs the author's decision. **(a)** Taking a set-down piece back up is your action for a Turn, as picking up an item is (recommended: one rule for loot and pieces, and the dodge then costs an action, as V21's set-down does for loot); **(b)** "a carrier who set its piece down this Turn still rolls as a carrier"; **(c)** keep it, and say the dice penalty is for chases. Simulate (a) before deciding: it slows furniture runs. |

### 5.2 Wording

| id | Passage (quoted, chapter) | Issue | Suggested fix |
|---|---|---|---|
| w1 | Ch3: "drop yours any time **but in a local chase**" · Ch5: "Trouble at a watched obstacle … gets the Entity caught, **and a local chase starts**" | Drill a1: PT9's case was a drop after the catch, "before round 1". Read with Chapter 5 the chase starts at the catch, so it's refused (S2), but "in a local chase" can be read as the rounds only, which reopens the moment PT9 found. | "drop yours any time but **once caught, until your chase ends**" (Chapter 4 the same for a piece). |
| w2 | Ch3: "Anyone there may **pick items up**, as their action for a Turn." | Drills b2 and c1: one action took two items each time. The plural implies it (S4), but a reader could take each item as its own action. | "Anyone there may pick up **any number of items**, as their action for a Turn." |
| w3 | Ch3: "**Anyone there** may pick items up" · Ch4: "hand it over free in the same place" · Ch6: "the town takes back what you were carrying"; "a captive may try to slip free" | Drill c2: the cake lay at the lock-up while Dracula was held there. On its face "anyone there" includes a captive, who could then pick loot up or be handed it. I ruled no (S8): Chapter 6 gives a captive only its slip each Turn, and Hidden Pockets is the one way a captive keeps loot. | Ch3: "Anyone there (**not a captive**) may pick items up …"; or in Chapter 6, "A captive can't take loot." |
| w4 | Ch8: "'drop an item' **when someone carries loot**" · Ch3: "The Storyteller never picks a Cost that costs nothing right then" · Ch3: "**Anyone there** may pick items up, as their action for a Turn." | Since anyone at the place may pick a dropped item up, "drop an item" now costs the party one action of whoever is there, and nothing at all when someone there has an action to spare that Turn: in drill b1 it cost Dracula his move; in drill d2 the Storyteller passed over it because the Werewolf meant to wait next Turn anyway. Chapter 8's advice doesn't reflect that. | Ch8: "'drop an item' when someone carries loot **and nobody there has an action to spare**". |

**Counts: 0 blockers, 0 major, 2 minor, 4 wording** (6 in all). By kind: **2 rules** (m1, m2) and **4 wording** (w1–w4).

---

## 6. Numbers and notes from play

- **Drops and pick-ups:** 8 drops or set-downs played (the mirror in the flight; the rope by a Cost; the seed and the rope, then the hat and the rope, set down before a risk; the cake at the lock-up; the mirror at the baker). 6 pick-ups: 1 item (b1), 2 in one action (b2), 1 in Turn 12 (b3), the cake (c2), 2 in one action planned at the way out (c1, not played to the roll), and the mirror taken back up free (d2). 5 refusals: 4 drops in a local chase (a1), 1 pick-up as the Limit came (b4).
- **Captures:** 1 (a1 run 2), and it took what Chapter 6 says: the mirror and the top hat. Under PT9's text the Werewolf would have set both down before round 1 and lost nothing.
- **Mesmerise:** 2 (a slip and a rescue), both Successes, one a Critical. With PT9's four, that's six in a row without a failure.
- **Criticals:** 3 (a1 run 1 in a chase: two Successes; the rescue in drill c and Dracula's rescue in drill e: a charge back each).
- **Balance note (for the simulator, not a finding).** V25 makes one action pick up any number of items, so a lone Entity can now insure its whole bag against a capture for one action: set it all down before a watched roll and pick it up after (b2, c1). Both times here the pick-up came in a Turn the party could spare. The decisions log's V21 simulation covered an Invisible Man doing this for Out of Sight; it may be worth running "every lone Entity sets its loot down before a watched roll" to see whether captures still cost what they should.
- **Usability.** The At the Table page and the Entity Sheet still carry nothing of V24 or V25 (PT8's m5, decided: the page stays one page). Every drill here needed Chapter 3's Cost paragraph and Chapter 4's Carrying list.

---

## 7. PT9's findings: what the book now says

| PT9 id | Status | Quote now in the book | Checked in PT10 |
|---|---|---|---|
| M1 dropping loot once caught | **resolved** (V24) | Ch3: "drop yours any time **but in a local chase**"; Ch4: "drop it any time **but in a local chase**" | Drill a1: refused before round 1 and in round 2, twice; run 2 captured, and the town took the mirror and the hat. The instant of the catch is this playtest's w1 |
| m1 where a dropped item lies, and who may pick it up | **resolved** (V25) | Ch3: "A dropped item **stays where you are (the location, the way out or the lock-up)** … **Anyone there** may pick items up" | Drills b1 (a friend picked it up), c1 (the way out), c2 (the lock-up). PT9's side remark about a carrier between places is still open: part of this playtest's m1 |
| m2 when a pick-up happens | **resolved** (V25) | Ch3: "Anyone there may pick items up, **as their action for a Turn**." | Drill b3 (in Turn 12 the pick-up was the Turn's action), b4 (as the Limit came: refused). How many at once is this playtest's w2 |
| w1 slipping free: watched? | **resolved** (V23) | Ch6: "at the lock-up Difficulty (**it's always watched**)" | Drill e: Mesmerise opened a slip and a rescue; two slip Troubles started no chase |
| w2 Chapter 4's one-item wording | **resolved** | Ch4: "guarding a list item **(or two sharing a place)**; beat or pass the last and **the loot** is in your hand" | Drill f: both items on one roll |
| w3 taking a set-down piece up again | **resolved** | Ch4: "Taking a piece **(or taking it back up)** is free" | Drill d2. What it allows round a roll is this playtest's m2 |

**PT9: 6 resolved, 0 partly, 0 not changed** (of 6).

---

## 8. Roll appendix

102 rolls, R1–R102, each a fresh `node -e` `Math.random` roll. Five were not used: R51 (Familiar's Warning's second d6, rolled with the first d6, which had already missed) and R65–R68 (rolled in the same batch as drill e's restart 2, which gave the Trouble the drill needed). Place rolls show the d3 they give (a d6 halved, rounding up). Rolls are listed in the order rolled, so drill a2 (R13–R27) comes between a1's two runs.

| Roll | Drill | What | Die | Result |
|---|---|---|---|---|
| R1 | a1 run 1 | round 1: the ground | d6 | 1 (the crowded square) |
| R2 | a1 run 1 | round 1: the Werewolf, Wits d8 (Keen Nose) / Monster | d8 | 1 |
| R3 | a1 run 1 | round 1: the Werewolf, Wits d8 (Keen Nose) / Monster | d10 | 1 |
| R4 | a1 run 1 | round 2: the ground | d6 | 3 (the market stalls) |
| R5 | a1 run 1 | round 2: the Werewolf, Brawn d10 / Monster (Good Dog) | d10 | 6 |
| R6 | a1 run 1 | round 2: the Werewolf, Brawn d10 / Monster (Good Dog) | d10 | 6 |
| R7 | a1 run 1 | round 3: the ground | d6 | 5 (the festival parade) |
| R8 | a1 run 1 | round 3: the Werewolf, Wits d6 (Keen Nose overdrawn; Hounds) / Monster | d6 | 1 |
| R9 | a1 run 1 | round 3: the Werewolf, Wits d6 (Keen Nose overdrawn; Hounds) / Monster | d10 | 10 |
| R10 | a1 run 1 | round 4: the ground | d6 | 5 (the festival parade) |
| R11 | a1 run 1 | round 4: the Werewolf, Sly d4 (Hounds) / Monster | d4 | 4 |
| R12 | a1 run 1 | round 4: the Werewolf, Sly d4 (Hounds) / Monster | d10 | 1 |
| R13 | a2 | flight round 1: the ground | d6 | 6 (a dead end) |
| R14 | a2 | round 1: the Werewolf, Brawn d10 / Monster | d10 | 3 |
| R15 | a2 | round 1: the Werewolf, Brawn d10 / Monster | d10 | 3 |
| R16 | a2 | round 1: the Witch, Wits d12 / Monster | d12 | 6 |
| R17 | a2 | round 1: the Witch, Wits d12 / Monster | d10 | 9 |
| R18 | a2 | flight round 2: the ground | d6 | 5 (the festival parade) |
| R19 | a2 | round 2: the Werewolf, Sly d8 (Hedge Spell) / Monster | d8 | 6 |
| R20 | a2 | round 2: the Werewolf, Sly d8 (Hedge Spell) / Monster | d10 | 7 |
| R21 | a2 | round 2: the Witch, Sly d10 / Monster | d10 | 9 |
| R22 | a2 | round 2: the Witch, Sly d10 / Monster | d10 | 4 |
| R23 | a2 | flight round 3: the ground | d6 | 2 (back alleys) |
| R24 | a2 | round 3: the Werewolf, Nimble d10 (Hounds) / Monster | d10 | 4 |
| R25 | a2 | round 3: the Werewolf, Nimble d10 (Hounds) / Monster | d10 | 7 |
| R26 | a2 | round 3: the Witch, Sly d8 (Rowan) / Monster | d8 | 2 |
| R27 | a2 | round 3: the Witch, Sly d8 (Rowan) / Monster | d10 | 7 |
| R28 | a1 run 2 | round 1: the ground | d6 | 1 (the crowded square) |
| R29 | a1 run 2 | round 1: the Werewolf, Wits d8 (Keen Nose) / Monster | d8 | 3 |
| R30 | a1 run 2 | round 1: the Werewolf, Wits d8 (Keen Nose) / Monster | d10 | 5 |
| R31 | a1 run 2 | round 2: the ground | d6 | 4 (over the rooftops) |
| R32 | a1 run 2 | round 2: the Werewolf, Nimble d10 (carrying) / Monster (Good Dog) | d10 | 3 |
| R33 | a1 run 2 | round 2: the Werewolf, Nimble d10 (carrying) / Monster (Good Dog) | d10 | 4 |
| R34 | b1 | try 1: the Creature, the back room, Wits d10 / Mask | d10 | 8 |
| R35 | b1 | try 1: the Creature, the back room, Wits d10 / Mask | d6 | 4 |
| R36 | b1 | try 2: the Creature, the back room, Wits d10 / Mask | d10 | 10 |
| R37 | b1 | try 2: the Creature, the back room, Wits d10 / Mask | d6 | 5 |
| R38 | b1 | try 3: the Creature, the back room, Wits d10 / Mask | d10 | 7 |
| R39 | b1 | try 3: the Creature, the back room, Wits d10 / Mask | d6 | 6 |
| R40 | b1 | try 4: the Creature, the back room, Wits d10 / Mask | d10 | 4 |
| R41 | b1 | try 4: the Creature, the back room, Wits d10 / Mask | d6 | 3 |
| R42 | b2 | the Witch, the shopkeeper, Charm d10 (Cook) / Mask | d10 | 7 |
| R43 | b2 | the Witch, the shopkeeper, Charm d10 (Cook) / Mask | d6 | 4 |
| R44 | b4 | try 1: the seed merchant's Tell check | d6 | 2 |
| R45 | b4 | try 2: the seed merchant's Tell check | d6 | 2 |
| R46 | b4 | try 3: the seed merchant's Tell check | d6 | 3 |
| R47 | b4 | try 4: the seed merchant's Tell check | d6 | 2 |
| R48 | b4 | try 5: the seed merchant's Tell check | d6 | 2 |
| R49 | b4 | try 6: the seed merchant's Tell check | d6 | 5 |
| R50 | c | the lock-up's Tell check | d6 | 2 |
| R51 | c | Familiar's Warning's second d6 | d6 | 1 (not needed: the first d6 missed) |
| R52 | c | the Witch, the rescue, Sly d12 (Hedge Spell) / Mask | d12 | 5 |
| R53 | c | the Witch, the rescue, Sly d12 (Hedge Spell) / Mask | d6 | 5 |
| R54 | d1 | Dracula, the guard dog, Charm d12 / Monster (Hypnotic Eyes) | d12 | 12 |
| R55 | d1 | Dracula, the guard dog, Charm d12 / Monster (Hypnotic Eyes) | d10 | 1 |
| R56 | d2 | the baker's Tell check | d6 | 3 |
| R57 | d2 | the Werewolf, the shuttered window, Nimble d12 / Mask (mirror set down) | d12 | 3 |
| R58 | d2 | the Werewolf, the shuttered window, Nimble d12 / Mask (mirror set down) | d6 | 4 |
| R59 | e | Turn 6: Dracula's slip, Mesmerise, Charm d12 / Mask | d12 | 7 |
| R60 | e | Turn 6: Dracula's slip, Mesmerise, Charm d12 / Mask | d6 | 4 |
| R61 | e | Turn 6: the Witch's slip, Sly d12 (Hedge Spell) / Mask | d12 | 10 |
| R62 | e | Turn 6: the Witch's slip, Sly d12 (Hedge Spell) / Mask | d6 | 4 |
| R63 | e restart 2 | Turn 6: the Witch's slip, Sly d12 (Hedge Spell) / Mask | d12 | 3 |
| R64 | e restart 2 | Turn 6: the Witch's slip, Sly d12 (Hedge Spell) / Mask | d6 | 1 |
| R65 | e restart 3 | Turn 6: the Witch's slip, Sly d12 / Mask | d12 | 3 (same batch; not used) |
| R66 | e restart 3 | Turn 6: the Witch's slip, Sly d12 / Mask | d6 | 1 (same batch; not used) |
| R67 | e restart 4 | Turn 6: the Witch's slip, Sly d12 / Mask | d12 | 12 (same batch; not used) |
| R68 | e restart 4 | Turn 6: the Witch's slip, Sly d12 / Mask | d6 | 4 (same batch; not used) |
| R69 | e restart 2 | Turn 7: the Witch's slip, Sly d10 / Mask | d10 | 1 |
| R70 | e restart 2 | Turn 7: the Witch's slip, Sly d10 / Mask | d6 | 3 |
| R71 | e restart 2 | Turn 7: Dracula, the rescue, Mesmerise, Charm d12 / Mask | d12 | 6 |
| R72 | e restart 2 | Turn 7: Dracula, the rescue, Mesmerise, Charm d12 / Mask | d6 | 6 |
| R73 | f | item 1 (food; essential) | d6 | 2 (a side of bacon) |
| R74 | f | item 2 (food) | d6 | 1 (a wheel of strong cheese) |
| R75 | f | item 3 (food) | d6 | 6 (the wedding cake) |
| R76 | f | item 4 (food) | d6 | 1 (the cheese again) |
| R77 | f | item 4 again (a repeat) | d6 | 4 (a sack of flour) |
| R78 | f | place: the bacon | d6 | 5 (d3 3: the tavern cellar) |
| R79 | f | place: the cheese | d6 | 2 (d3 1: the baker) |
| R80 | f | place: the wedding cake | d6 | 1 (d3 1: the baker) |
| R81 | f | place: the wedding cake | d6 | 6 (d3 3: the tavern cellar) |
| R82 | f | place: the wedding cake | d6 | 5 (d3 3: the tavern cellar) |
| R83 | f | place: the wedding cake | d6 | 2 (d3 1: the baker) |
| R84 | f | place: the wedding cake | d6 | 5 (d3 3: the tavern cellar) |
| R85 | f | place: the wedding cake | d6 | 4 (d3 2: the butcher) |
| R86 | f | place: the flour (it shares) | d6 | 4 (d3 2: the butcher) |
| R87 | f | the butcher: how many obstacles | d20 | 16 (two) |
| R88 | f | way A: the obstacle table | d20 | 17 (a locked strongbox) |
| R89 | f | way A: Difficulty | d20 | 2 (6) |
| R90 | f | way A: watched | d10 | 2 (watched) |
| R91 | f | way B: the obstacle table | d20 | 7 (the rooftops, group) |
| R92 | f | way B: Difficulty | d20 | 1 (6) |
| R93 | f | way B: watched | d10 | 4 (watched) |
| R94 | f | then: the obstacle table | d20 | 5 (a high garden wall) |
| R95 | f | then: Difficulty | d20 | 6 (8) |
| R96 | f | then: watched | d10 | 10 (not watched) |
| R97 | f | the butcher's Tell check | d6 | 3 |
| R98 | f | Familiar's Warning's second d6 | d6 | 6 |
| R99 | f | the Witch, the strongbox, Wits d12 / Mask | d12 | 12 |
| R100 | f | the Witch, the strongbox, Wits d12 / Mask | d6 | 4 |
| R101 | f | the Mummy, the wall, Wits d12 (Ancient Lore) / Mask | d12 | 6 |
| R102 | f | the Mummy, the wall, Wits d12 (Ancient Lore) / Mask | d6 | 4 |

