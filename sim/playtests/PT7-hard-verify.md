# PT7: Hard verification playtest after the PT6 fixes (Gallowsmere, a rolled Hard town, drills a–e)

## 1. What this is

A verification playtest of Hard difficulty under the current rules, after the PT6 fix round: **B6** (the Majority Rule: the shared Lead moves 2 when one side leads by two or more), **V2** (a switch ability works in a chase, in place of the ground's traits), **V4 / V11** (a piece of furniture raises Suspicion at the end of every Turn from when it is taken, even set down, until it is out of town, lost or abandoned for good), **V5** (Already Dead cornered in the round the Limit comes just joins the flight; otherwise the Ghost is back where it was caught), the overdraw rule (your Weakness is in play from your own next roll, even later the same round), and the PT6 wording fixes (a random Duty rerolls one already taken; opening an approach works at any obstacle).

**Rules source:** the rulebook text only: `book/src/chapters/11-ch01.html` to `17-ch07.html`, `31-ch08.html`, `32-ch09.html`, `40-entity-sheet.html` and `41-reference.html`, read as text (commit 0b6eff6 for the book; the book did not change while I played). Not the simulator, not `docs/`, not the Foundry code. Where the book is silent I made a ruling, listed it in section 4, and logged it as a finding in section 8.

**Dice:** every random result is a real `Math.random` roll, numbered R1 onward and listed in section 10. Drills say exactly what I chose at their start; every roll after that is real. The players played to win; the Storyteller played by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now").

---

## 5. Play log: main line A (Gallowsmere, Hard, 4 Entities)

Notation: trait die + second die = total vs Difficulty → result. "Shows" = the Monster die beat the trait die. Sus = Suspicion after the roll. Charges are shown as before → after.

**Plan.** Both essentials first, split three ways: the Ghost (Handyman) to the smithy (the garden wall with Nimble d12, then Through the Wall past the watchman with Sly, its Duty raising it to d12); the Werewolf and the Creature (Butler) to the silversmith's three obstacles; the Invisible Man (Librarian) to the printer (the neighbour with Sly d12, the back room with Wits d12). Then the tailor, where Spectral walks the Ghost past the crowded shop floor. The butcher (four obstacles, three watched, a Brawn 12 group tug-of-war) only if Turns are spare. The Werewolf rolls the way out (Shortcut: 10 becomes 8).

**Turn 1 (Sus 0).** Moves; every Gallowsmere location is watched, so a Tell check at each first arrival:

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R18 | the smithy (Ghost) | 4 | Cold Spot: Granny Mott's candle gutters | 1 |
| R19 | the silversmith (Creature, Werewolf) | 5 | whose (1–3 Creature, 4–6 Werewolf): R21 = 4, Eyebrows That Meet | 2 |
| R20 | the printer (Invisible Man) | 4 | Bandages and Goggles | 3 |

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R22–R23 | Ghost, smithy way B (high garden wall, Nimble / Brawn loud, 8, watched) | Nimble d12 (Handyman can't raise a d12), Mask: 71 / 15 / 14% | 10 + 1 | 11 vs 8 | Success | 3 |
| 2 | R24–R25 | Werewolf, silversmith way B (shuttered window, Nimble / Brawn loud, 8, watched) | Nimble d12, Mask; Good Dog kept for the 10s and 12s | 3 + 2 | 5 vs 8 | **Trouble**, caught (the children see him) | 4 |

**The Werewolf's local chase** (alone; his Perk is Shortcut, not Night Runner: Lead 1, escape at 4; mob 8 + 2 = **10**; Hounds from round 3). At Lead 1 a Trouble in round 1 corners him.

| Round | Ground | Roll | Dice | Total vs mob | Result | Lead | Sus |
|---|---|---|---|---|---|---|---|
| 1 | R26 = 4 rooftops | Nimble d12, **Good Dog** (3 → 2): a hidden Monster, 70 / 13 / 18% against the Mask's 54 / 17 / 29% | 11 + 6 | 17 vs 10 | Success | 2 | 4 |
| 2 | R29 = 5 parade (Charm d4, Sly d6) | Sly d6, **Good Dog** (2 → 1): 45 / 20 / 35% against 17 / 25 / 58% | 6 + 2 | 8 vs 10 | Cost (no change) | 2 | 4 |
| 3 | R32 = 4 rooftops | Nimble d12 → d10 (**Hounds**), **Good Dog** (1 → 0) | 10 + 10 | 20 vs 10 | **Critical**: two Successes | **4: escaped** | 4 |

He is back below the shuttered window, his Turn used up, with no charges left.

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R35–R36 | Creature, the same window | Nimble d8 → d10 (Butler), Mask (65 / 18 / 17%; Hovel Watcher saved for the strongbox) | 2 + 5 | 7 vs 8 | **Cost**: the window is open. He carries nothing, so "drop an item" would cost nothing; Turn 2 isn't "near dawn"; Suspicion 4 of 15 isn't "near the Limit". The Storyteller takes **his next roll's trait die one size smaller** ("a smaller die before a hard roll": the strongbox is a 10). The shutter slams on his fingers | 4 |
| 2 | R37–R38 | Invisible Man, printer way A (nosy neighbour, Sly / Wits loud, 8, watched) | Sly d12, **Unseen** (3 → 2): 83 / 9 / 8% | 4 + 6 (shows, hidden) | 10 vs 8 | Success | 4 |
| 3 | R39–R40 | Ghost, smithy (night watchman, Wits 10, watched) | **Through the Wall** (3 → 2): Sly isn't listed, so Sly d10 → d12 (Handyman) at 8, Mask | 9 + 4 | 13 vs 8 | Success: **the new lock** (essential) | 4 |
| 3 | R41–R42 | Invisible Man, printer (dark back room, Wits / Sly loud, 8) | Wits d10 → d12 (Librarian), Mask | 7 + 3 | 10 vs 8 | Success: **the writing paper** | 4 |
| 3 | R43–R44 | Werewolf, silversmith (guard dog, Charm / Nimble loud, 8, watched) | Nimble d12 the loud way, Mask (his Charm is a d4; no charges) | 6 + 4 | 10 vs 8 | Success (loud +1) | 5 |
| 3 | R45–R46 | Creature, silversmith (locked strongbox, Wits / Charm loud, 10) | Wits d10 → d12 (Butler) → **d10** (the Cost's step down; they cancel), **Hovel Watcher** (3 → 2): 64 / 15 / 21% | 8 + 7 | 15 vs 10 | Success: **the silver spoons** (essential) | 5 |
| 4 | R47 | The Ghost and the Creature move to the tailor | Tell check | 3 | — | — | 5 |
| 4 | R48 | The Invisible Man and the Werewolf move to the butcher (insurance for an extra) | Tell check | 2 | — | — | 5 |
| 5 | R49–R50 | Ghost, tailor way B (rickety drainpipe, Nimble 8) | Nimble d12, Mask | 3 + 4 | 7 vs 8 | **Cost**: the drainpipe is beaten. The Ghost carries the lock, so "drop an item" is possible, but the Creature stands beside it with an action to spare; Turn 5 isn't near dawn. The Storyteller takes **its next roll's trait die one size smaller**: its next roll is the furniture's trapdoor | 5 |
| 5 | — | The Ghost walks past the crowded shop floor (group, watched) by **Spectral**, at no action: **the bandages** | | | | | 5 |
| 5 | R51–R52 | Invisible Man, butcher way A (muddy yard of geese, Sly / Nimble loud, 8, watched) | Sly d12, Mask | 7 + 1 | 8 vs 8 | Success | 5 |
| 6 | — | The Ghost hands the lock and the bandages to the Creature (free, same place): **Through the Wall** works "not while you carry loot or furniture" | | | | | 5 |
| 6 | R53–R54 | Ghost, the furniture's trapdoor (Brawn 12, not watched) | **Through the Wall** (2 → 1): Sly at 10; Sly d10, **Chill** (1 → 0) raises it to d12 and the Cost's step down takes it back to d10. The Monster: 79% gets through against the Mask's 65%, and with no charges left a retry would mean an overdraw | 7 + 10 (shows) | 17 vs 10 | Success. **The suit of armour** (Bulky) is the Ghost's: only the opener can carry it out that way | 7 |
| 6 | R55–R56 | Invisible Man, butcher (shopkeeper, Charm / Sly loud, 10, watched) | Sly d12 the loud way, **Unseen** (2 → 1): 70 / 13 / 18% | 7 + 9 (shows, hidden) | 16 vs 10 | Success (loud +1) | 8 |
| 6 | R57–R58 | Werewolf, butcher (tug-of-war, group, Brawn 12, not watched) | Brawn d10 → d12 (Cook), Mask: 38 / 17 / 46%, but Trouble here costs only +1 | 6 + 3 | 9 vs 12 | Trouble (no chase) | 9 |
| 6 | — | End of the Turn: the armour, +1 | | | | | **10** |

At 10 of 15 with the armour to carry, the party drops the bacon: the two essentials and two extras are already a Win, and the bacon would add nothing to a Grand Year.

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 7 | — | The Ghost sets off with the armour (Turns 7–8; at the end of Turn 7 it is between places). The Creature, the Invisible Man and the Werewolf move to the way out | | | | | 10 |
| 7 | R59 | The way out, the first time anyone comes back (Creature, Invisible Man, Werewolf) | Tell check | 2 | — | — | 10 |
| 7 | — | End of the Turn: the armour, +1 | | | | | 11 |
| 8 | — | The Ghost acts first and finishes its carried move (S3) | | | | | 11 |
| 8 | R60–R61 | Werewolf, the way out (Sly / Nimble / Brawn loud, watched) | **Shortcut**: 10 → 8. Nimble d12, Monster: 92% against the Mask's 86% (a show only matters if the roll fails; he has no charge for Good Dog, and an overdraw would buy nothing the Monster doesn't) | 1 + 10 (shows) | 11 vs 8 | Success: **everyone out** | 13 |

**How the Year Went: Grand Year.** Both essentials, two of the three extras (the bacon missing) and the suit of armour; nobody left behind. "A year of plenty. The new piece goes in the great hall, and everyone pretends it was always there." Then the missing kind: "Turnip soup every night until spring." Out on **Turn 8** with four Turns to spare. Suspicion 11 when the last roll was made (13 after its show). Charges: 9 of 12 spent (Good Dog ×3 in one chase; Through the Wall ×2 and Chill; Unseen ×2; Hovel Watcher ×1). The armour cost +2 (S3).

---

## 10. Roll appendix

Every roll in order, as logged when rolled (`Math.random`, one die per line). Labels are the log's own shorthand: "A" and "B" are the main lines; a1–a2, b, c, d and e are the drills; "IM" is the Invisible Man, "J&H" Jekyll & Hyde; "T5" is Turn 5 and "r3" round 3.

| Roll | What | Die |
|---|---|---|
| R1 | A party pick 1 | d8 = 4 |
| R2 | A party pick 2 | d8 = 2 |
| R3 | A party pick 3 | d8 = 6 |
| R4 | A party pick 4 | d8 = 5 |
| R5 | A Werewolf Gift | d6 = 3 |
| R6 | A Werewolf Perk | d6 = 3 |
| R7 | A Werewolf Duty | d6 = 1 |
| R8 | A Creature Gift | d6 = 3 |
| R9 | A Creature Perk | d6 = 4 |
| R10 | A Creature Duty | d6 = 4 |
| R11 | A Ghost Gift | d6 = 2 |
| R12 | A Ghost Perk | d6 = 1 |
| R13 | A Ghost Duty | d6 = 5 |
| R14 | A IM Gift | d6 = 2 |
| R15 | A IM Perk | d6 = 3 |
| R16 | A IM Duty | d6 = 5 |
| R17 | A IM Duty reroll (Handyman taken) | d6 = 3 |
| R18 | A T1 Tell smithy (Ghost) | d6 = 4 |
| R19 | A T1 Tell silversmith (Creature, Werewolf) | d6 = 5 |
| R20 | A T1 Tell printer (IM) | d6 = 4 |
| R21 | A T1 silversmith whose Tell (1-3 Creature, 4-6 Werewolf) | d6 = 4 |
| R22 | A T2 Ghost smithy wall Nimble | d12 = 10 |
| R23 | A T2 Ghost Mask | d6 = 1 |
| R24 | A T2 Werewolf silversmith window Nimble | d12 = 3 |
| R25 | A T2 Werewolf Mask | d6 = 2 |
| R26 | A T2 Werewolf chase r1 ground | d6 = 4 |
| R27 | A T2 Werewolf chase r1 Nimble | d12 = 11 |
| R28 | A T2 Werewolf chase r1 Monster (Good Dog) | d10 = 6 |
| R29 | A T2 Werewolf chase r2 ground | d6 = 5 |
| R30 | A T2 Werewolf chase r2 Sly | d6 = 6 |
| R31 | A T2 Werewolf chase r2 Monster (Good Dog) | d10 = 2 |
| R32 | A T2 Werewolf chase r3 ground | d6 = 4 |
| R33 | A T2 Werewolf chase r3 Nimble (d12 Hounds->d10) | d10 = 10 |
| R34 | A T2 Werewolf chase r3 Monster (Good Dog) | d10 = 10 |
| R35 | A T2 Creature silversmith window Nimble (d8 Butler->d10) | d10 = 2 |
| R36 | A T2 Creature Mask | d6 = 5 |
| R37 | A T2 IM printer neighbour Sly | d12 = 4 |
| R38 | A T2 IM Monster (Unseen) | d10 = 6 |
| R39 | A T3 Ghost smithy watchman Through the Wall Sly (d10 Handyman->d12) at 8 | d12 = 9 |
| R40 | A T3 Ghost Mask | d6 = 4 |
| R41 | A T3 IM printer back room Wits (d10 Librarian->d12) | d12 = 7 |
| R42 | A T3 IM Mask | d6 = 3 |
| R43 | A T3 Werewolf silversmith guard dog Nimble loud | d12 = 6 |
| R44 | A T3 Werewolf Mask | d6 = 4 |
| R45 | A T3 Creature strongbox Wits (d10 Butler d12, Cost step-down d10) | d10 = 8 |
| R46 | A T3 Creature Monster (Hovel Watcher) | d10 = 7 |
| R47 | A T4 Tell tailor (Ghost, Creature) | d6 = 3 |
| R48 | A T4 Tell butcher (IM, Werewolf) | d6 = 2 |
| R49 | A T5 Ghost tailor drainpipe Nimble | d12 = 3 |
| R50 | A T5 Ghost Mask | d6 = 4 |
| R51 | A T5 IM butcher geese Sly | d12 = 7 |
| R52 | A T5 IM Mask | d6 = 1 |
| R53 | A T6 Ghost tailor trapdoor TtW Sly (d10 Chill d12, step-down d10) at 10 | d10 = 7 |
| R54 | A T6 Ghost Monster | d10 = 10 |
| R55 | A T6 IM butcher shopkeeper Sly loud | d12 = 7 |
| R56 | A T6 IM Monster (Unseen) | d10 = 9 |
| R57 | A T6 Werewolf butcher tug-of-war Brawn (d10 Cook->d12) | d12 = 6 |
| R58 | A T6 Werewolf Mask | d6 = 3 |
| R59 | A T7 Tell way out first return (Creature, IM, Werewolf) | d6 = 2 |
| R60 | A T8 Werewolf way out (Shortcut 10->8) Nimble | d12 = 1 |
| R61 | A T8 Werewolf Monster | d10 = 10 |
