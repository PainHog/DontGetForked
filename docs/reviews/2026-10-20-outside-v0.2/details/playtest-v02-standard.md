# Don't Get Forked v0.2: Standard playtest (Thistlewick, five players)

Tester focus: the risky systems (chases, capture, rescue, the final flight, furniture), played by a rowdy five-player table. Other testers cover Gallowsmere (Hard) and Puddlecombe (Easy).

## Summary

- **No blockers.** Every situation I forced had an answer in the book, and the answers mostly held together. I played two full Thistlewick raids, then 14 labelled DRILLs and chains. The results were Grand Year, Partial, Win, Partial, Forked, Forked, Forked and Win.
- **Four "confusing" items will come up at the table tomorrow.** Each one has a one-line ruling (see the Rulings cheat-sheet):
  1. Overdraws in a local chase become free once the Limit is certain. One chase ran 12 rounds this way.
  2. Do an ability's own limits still apply when it is spent "as a raise" in the final flight?
  3. Does giving up before any roll raise Suspicion?
  4. "Capture is only a setback" sits badly with captured loot being gone for good. One capture permanently lost an essential.
- **The local chase still spirals at the top of the track.** On Standard at Suspicion 8+ the mob is 12. A lone runner escapes about 22% of the time with the Monster and 2-3% with the Mask. The chase's rise is +2 in about 70-90% of cases, which brings the Limit, and a cornered runner is captured before the hunt starts and is left behind. Lower down it plays fine: at Suspicion 2 (mob 9) it took 3 rounds and cost +1.
- **Charges:** a smooth raid spent only 3 of 15. In the final flight, abilities spent as raises (plus trait swaps handed to friends) carried the party: 6 charges in one round.

## Method

- **Dice.** All dice were real Math.random rolls from `play-scripts-std/roll.js`, logged with sequence numbers in `play-scripts-std/dice-log.txt` (142 entries). Log #1 is a harness test, #45 is void (the hunt started before that Entity acted), and #135 is an unused setup die. References below such as "#23" point into that log.
- **Stipulations.** Where a drill needed a starting condition the dice had not produced (for example "this roll was Trouble"), the condition is marked **[stipulated]** and every roll after it is real.
- **Odds.** The exact-odds tables come from `chase-odds.js`, `flight-odds.js`, `shared-odds.js` and `round1-odds.js` in the same folder. They assume each runner takes its best listed trait for the ground and spends no abilities unless stated.
- **Thistlewick (p30).** Every location is watched (eye icons), so every first arrival gets a Tell check. No entrance is small and every move is 1 Turn. The furniture is a gilt mirror (Bulky) behind the ironmonger's guard dog (watched, Charm 10 / Nimble loud 10). Limit 10, way out 8, lock-up 10, flight mob 11 with escape at 5.

## Entity setups

The Entities were chosen in this order: Dracula, Werewolf, Witch, Ghost, Creature. That order matters for the Duty clash (p7: "the player who chose their Entity later picks another or rolls a d6").

### Raid 1 (some defaults, some random picks)

| Entity | Traits | Signature | Gift | Perk | Castle Duty | Weakness |
|---|---|---|---|---|---|---|
| Dracula | Br d8 Ni d10 Sl d6 Ch d12 Wi d4 | Mesmerise | Bat (default) | Hypnotic Eyes (default) | Butler (china shop) | Garlic, Always |
| Werewolf | Br d10 Ni d12 Sl d6 Ch d4 Wi d8 | Good Dog | Keen Nose (rolled 2, #2) | Shortcut (rolled 4, #3) | Gardener (seed merchant) | Hounds, Soon |
| Witch | Br d6 Ni d4 Sl d10 Ch d8 Wi d12 | Hedge Spell | A Potion for That (default) | Familiar's Warning (default) | Cook (baker) | Rowan, Soon |
| Ghost | Br d4 Ni d12 Sl d10 Ch d8 Wi d6 | Through the Wall | Chill (default) | Rattle (rolled 3, #4) | Butler clashes with Dracula, so the Ghost rolls: 6 = Tailor (hatter) (#6) | Cold Iron, Always |
| Creature | Br d12 Ni d8 Sl d6 Ch d4 Wi d10 | Brute Force | Mountain Stride (default) | Strong Back (rolled 1, #5): dead here, no Huge piece | Handyman (ironmonger) | Fire, Soon |

### Raid 2 (all Gifts and Perks rolled, #24-#29)

| Entity | Gift | Perk | Castle Duty |
|---|---|---|---|
| Dracula | Bat | Wall-Crawler | Butler |
| Werewolf | Through the Hedge | Fetch | Gardener |
| Witch | A Potion for That | Wise Woman | Cook |
| Ghost | Fade | Rattle | Tailor (rolled 4 and 2, both taken, then 6) |
| Creature | Hovel Watcher | Strong Back (dead again) | Handyman |

All 5 kinds on the list have a Duty owner, and Librarian is unused. The Butler clash between Dracula and the Ghost is built into this Entity combination.

## Play log: Raid 1 (rowdy but sensible)

Abbreviations: S = Suspicion, T = Turn, M = Monster d10, Mk = Mask d6.

| T | Step | Rule (page) | Dice | Result | S |
|---|---|---|---|---|---|
| 1 | Full split: each Entity moves to its own Duty location | Turns p14 | - | 5 arrivals | 0 |
| 1 | Tell checks: baker (Familiar's Warning), china, hatter, ironmonger, seed merchant | Tells p16 | #7-#11 | Only the seed merchant goes off (5): Werewolf's eyebrows | 1 |
| 2 | Creature, ironmonger cart (Brawn 6): Br d12+M (the Duty raise is wasted at d12) | p12 | #12: 3+1=4 | Cost. Storyteller picks "next die smaller" because the strongbox is next | 1 |
| 2 | Dracula, china front door (Sly 8, unwatched): Sl d6, d8 with Butler, +M | p12 | #13: 2+4=6 | Cost, Monster shows +2. "Suspicion +1" can't be picked (p12) and he carries nothing, so he loses his next Turn | 3 |
| 2 | Werewolf, seed merchant muddy yard (Sly 6): Sl d8 (Gardener) +M | p12 | #14: 6+8 | Success, Monster shows | 5 |
| 2 | Ghost, hatter nosy neighbour (watched, Sly 8): Sl d12 (Tailor) +M | p12 | #15: 12+10 | Success. Top hat (the way in is the last obstacle, p14) | 5 |
| 2 | Witch, baker crowded shop floor (group, watched): Sl d12 (Cook) +Mk | p14-15 | #16: 8+4 | Success. The crowd is now the baker's way in for the raid | 5 |
| 3 | Ghost moves to the ironmonger (already Tell-checked) | p16 | - | - | 5 |
| 3 | Creature, strongbox (watched, Wits 10): Brute Force for Br d12. The Duty raise cancels the Cost step-down, and the Ghost's Chill can't add a second raise | p7, p13 | #17: 8+4 | Success. Coil of rope (not loud: Brawn isn't listed, p16) | 5 |
| 3 | Witch, shopkeeper (watched, Charm 8): Ch d10 (Cook) +Mk | p12 | #18: 1+6=7 | Cost. Wedding cake (essential). Storyteller picks Suspicion +1 | 6 |
| 3 | Werewolf, night watchman (watched, Wits 10): Wi d10 (Gardener) + Good Dog | p13 | #19: 4+6=10 | Success. Monster showed but safe. Turnip seed | 6 |
| 3 | Dracula skips his action (lost Turn) | p12 | - | - | 6 |
| 4 | Witch and Werewolf go back to the way out: Tell check | p16 | #20: 3 | None | 6 |
| 4 | Dracula, back room (Wits 8, unwatched): Bat for Ni d12 (Butler) +Mk | p8 | #21: 12+2 | Success. Tea service (essential). All 5 items in hand by T4 | 6 |
| 4 | Ghost, guard dog for the piece (watched, Nimble loud 10): Ni d12+M | p15 | #22: 9+9=18 | Critical, but no spent charge to refund. Loud +1. The Ghost takes the mirror at once (rowdy) and hands the top hat to the Creature (free) | 7 |
| 4 | End of Turn: furniture tick | p15 | - | +1 | 8 |
| 5 | Ghost starts the carried move (between places). Creature and Dracula go to the way out | p15 | - | - | 8 |
| 5 | End of Turn: tick | p15 | - | +1 | 9 |
| 6 | Ghost arrives. Werewolf rolls the way out: Shortcut makes it 6, Ni d12+M (any rise would hit the Limit, but the result comes first) | p15, p16 | #23: 6+2=8 | Success. Everyone is out with 5 items + mirror before the T6 tick | 9 |

**How the Year Went (p20):** all 5 items are home, so it is a Win. The piece came home too, so it is a **Grand Year**. Nobody was left behind. Epilogue: "A year of plenty. The new piece goes in the great hall, and everyone pretends it was always there." There are no missing-kind lines. Charges spent: 3 of 15 (Bat, Brute Force, Good Dog).

## Play log: Raid 2 (reckless replay with new picks)

| T | Step | Rule (page) | Dice | Result | S |
|---|---|---|---|---|---|
| 1 | Dracula, Witch and Werewolf go to the baker. Creature and Ghost go to the ironmonger (furniture first!) | p14 | #30, #31 | No Tells | 0 |
| 2 | **Group check** at the crowd: Dracula Sl d6+M, Werewolf Sl d6+M, Witch Sl d12+M | p15 | #32 | All 3 succeed. Dracula's Monster shows, and one rise for the check gives +2 | 2 |
| 2 | Creature, cart: Br d12+M | p12 | #33: 8+8 | Critical, with no spent charge to refund | 2 |
| 2 | Ghost, strongbox the loud way: Ch d8+M | p16 | #34: 5+9 | Success. Monster shows, but Rattle makes it +1, and loud is +1: one rise of +1. Rope | 3 |
| 3 | Dracula, shopkeeper: Ch d12+M | p12 | #35 | Success. Cake | 3 |
| 3 | Ghost, guard dog the loud way: Ni d12+M | p15 | #36 | Success, +1 loud. **Takes the mirror now** and hands the rope to the Creature | 4 |
| 3 | Werewolf to the seed merchant, Witch to the hatter: Tell checks | p16 | #37: 2, #38: 6 | The Witch's black cat goes off | 5 |
| 3 | End of Turn: tick | p15 | - | +1 | 6 |
| 4 | Witch, neighbour: Sl d10+Mk | p12 | #39 | Success. Top hat | 6 |
| 4 | Werewolf, muddy yard: Sl d8+Mk | p12 | #40 | Success | 6 |
| 4 | Dracula and Creature go to the china shop: Tell check | p16 | #41-#42 | 6, so a Tell. Picking which arrival went off took 5 rerolls (1-2 of 6 faces count): Dracula, "No Reflection" | 7 |
| 4 | Ghost carries the mirror (move 1 of 2). End of Turn tick | p15 | - | +1 | 8 |
| 5 | Ghost arrives at the way out and the Witch moves there: Tell check | p16 | #43: 6 then 2 | The Witch's cat again | 9 |
| 5 | Werewolf, night watchman (watched): Through the Hedge, Br d12 (Gardener) at 8, +Mk | p7 | #44: 1+1=2 | **Trouble, +1, so the Limit.** Watched, but there is **no local chase** (p17). The **hunt starts mid-Turn**: Dracula and the Creature hadn't acted, so they don't (#45 void, p14) | 10 |
| FF | Final flight: Lead 3 (Fetch), escape 5, mob 11. R1 market stalls | p18 | #46-#47 | 2 Successes, 1 Trouble, 2 Costs: Lead +1, to 4 | - |
| FF | R2 crowded square. Raises spent: Dracula's own Bat; the **Creature's Brute Force on the Werewolf** (he rolls his own Brawn d10) plus his Good Dog as a raise; the Witch's Hedge Spell; the Ghost's Through the Wall as a raise **while carrying the mirror** (see issue I2); the Creature's own Brute Force. 6 charges in one round | p13, p18 | #48-#49 | 2 Criticals + 3 Successes, 0 Trouble: Lead +2, to 6. **Escaped** | - |

**How the Year Went:** home are the cake, top hat, rope and the mirror. The tea service (essential) and the turnip seed are missing. That is 3 of 5 with an essential missing, so **Partial**; the mirror doesn't help because a Grand Year needs a Win. Epilogue: "The castle gets by, just..." plus "Dinner is served on old coffin lids." and "Nothing grows but nettles, and the nettles win." Charges spent: 9 of 15.

## DRILLs

All rolls are fresh and real. **[stipulated]** marks the forced starting conditions.

| Drill | What it exercised | Setup | Dice | What happened | S |
|---|---|---|---|---|---|
| **D1** | Local chase from **low** Suspicion | Ghost (Raid 1) at the hatter neighbour, T2 **[stipulated Trouble, Mask]**: S1 to 2. Mob 8+1=9, Lead 1 | #50-#55 | R1 Ni d10 (Cold Iron) +M: Success, Monster shows. R2 Sl d10 (Chill cancels Cold Iron): Success. R3: Success. **Escaped in 3 rounds.** Rise is the biggest trigger, the Monster, but Rattle makes it +1 | 2 to 3 |
| **D2** | Local chase from **high** Suspicion | Raid 2 T4 variant: the Witch at the neighbour **[stipulated Trouble, Mask]**: S7 to 8. Mob 8+4=**12** | #56-#79 | Wits d12 every round, via Potion when the ground lacked it, plus Hedge Spell against Rowan from R3. Out of charges by R5, then **15 overdraws** (two per roll). Lead went 1,2,1,2,1,2,1,2,3,2,3,4: **escaped after 12 rounds.** Rise +2 (Monster) +30 in overdraws, but everything past the Limit is lost (p16). **Hunt on as the chase ends**; the Witch joins the flight; the two who hadn't acted that Turn don't | 8 to 10 |
| **D3** | **Giving up** (twice, both in chains below) | Chain C #85: the Werewolf is caught at the way out at S9 (mob 12). Chain D #91: the Ghost is caught as a rescuer at S9 | - | Both gave up at the start of round 1: captured, no roll, **no rise** (my reading, issue I3), so no hunt. Both were the right call: running had about 22% escape odds and a near-certain hunt | 9 stays 9 |
| **D4** | **Two caught in one group check** (shared chase) | Baker crowd group check, S4: Dracula (carrying the tea service), Creature, Werewolf, all Sl d6+Mk (#80). Dracula Trouble, Creature Success, Werewolf Cost **[stipulated Trouble]**. One rise +1 to S5, mob 10 | #80-#82 | R1 dead end: Dracula Bat for Ni d8 +M: Trouble. Werewolf Br d10+M: Trouble. Trouble ahead by 2 is Lead -2: **cornered in round 1, both captured.** Rise +2. **The tea service (essential) and turnip seed are gone for the night (p18), so the year can no longer be a Win** | 5 to 7 |
| **D4b** | Shared chase again | Witch + Creature **[stipulated both Trouble]**, S5, mob 10 | #100-#103 | R1 Cost + Success: Lead 2. R2 two Troubles: -2, **cornered** | 5 to 7 |
| **D4c** | Shared chase plus a give-up decision | Dracula (tea service, 0 charges) + Witch **[stipulated]**, S6, mob 11 | #104-#109 | R1: Lead 2. R2 Dracula Critical vs Witch Trouble: Lead 3. R3 Witch Critical (Potion + Hedge Spell) vs Dracula Trouble: Lead 4, **escaped in 3 rounds**. Nobody gave up: Dracula can't hand off the essential mid-chase (p18), and exact odds show a partner quitting never helps the other (see Odds) | 6 to 8 |
| **D5** | **Slipping free** | After D4 (S7): Werewolf Ni d12 + Good Dog vs 10 (#83), Success. Dracula **Mesmerise at the lock-up** (approach, so 8) Ch d12+M (#84), Success. Also Chain C #86 Success; Chain D #88 Success and #89 **Trouble: +1, no chase** | as listed | Mesmerise plus Hypnotic Eyes makes Dracula's slip about 83% per try (intended, p18). A slip-free Cost (nothing happens) never came up | - |
| **Chain C** | Give up, abandon the furniture, a lock-up Tell, slip free, **way-out Success that fills the Limit (D7a)** | Raid 1 alternate: the Ghost takes the mirror at the **start of T5** instead of T4 (only one tick before the exit, the "at least 1" case, p27), so S8 at T6. Werewolf's way out **[stipulated Trouble]**: S9, caught, gives up (D3). The Ghost **abandons** the mirror (free) so the T6 tick never comes. The Witch and Dracula hand their loot to the Creature and go to the lock-up | #85-#87 | Lock-up Tell: none (#85). T7 Werewolf slips free (#86). T8 all five at the way out; the **Creature takes the loud way, Br d12+M vs 8** (#87). Success, and loud +1 makes **S10 = Limit, but the result comes first (p16): out, no hunt.** Year: 4 items home (turnip seed lost on capture), essentials home, so a **Win** | 9 to 10 |
| **Chain D** | **Rescue failure, give up as a rescuer, rescue Success that fills the Limit (D7b), hunt mid-Turn, 5-runner flight with overdraws** | **[stipulated T9, S7]**: Werewolf and Witch held (the cake and turnip seed taken). Ghost (top hat) and Creature (rope) at the lock-up, Dracula (tea) at the way out. Charges: Dracula 1, Werewolf 0, Witch 1, Ghost 1, Creature 0 | #88-#99 | Werewolf slips free (#88). Witch slip **Trouble** +1 (#89), S8. Ghost hands the top hat over, then **rescues** with Sl d12 (Chill) +M: **Trouble** (#90). Monster shows (Rattle +1), one rise +1: S9. Rescuer caught at mob 12, **gives up** (no rise). Creature **rescues the loud way**, Br d12+M (#91): **Success, loud +1, Limit**. Result first: the Witch and Ghost are freed **and join the flight**. Dracula hadn't acted, so he doesn't. **5-runner flight**, Lead 2: R1 3S 2T, to 3 (Werewolf and Creature **overdraw** in R1: Keen Nose for Wits, Brute Force for Brawn). R2 2S 3T, to 2 (Witch's R2 **overdraw is free**, issue I6). R3 4S 1T, to 4. R4 3S 0T, to 6: **escaped in 4 rounds.** Home: tea, rope, top hat. Cake lost, so **Partial** | 7 to 10 |
| **D9b** | **3-runner flight**, hunt from the **furniture tick**, an Entity between places | **[stipulated end of T10, S9]**: Werewolf and Witch held. The Ghost is mid-carry with the mirror. Dracula (tea) and Creature (cake, rope) at the way out. The tick brings S10 at the end of the Turn, after everyone has acted | #110-#111 | R1 crowded square: Dracula Cost, Ghost Trouble (Chill raise), Creature Trouble (Brute Force for Br d12). 0S 2T, so -2: **cornered in round 1, Forked.** Had they escaped: Win + mirror = Grand Year, then two left behind drops it two steps to Partial | 9 to 10 |
| **D9c** | **Dawn**, a **1-runner flight** | **[stipulated]** T12 ends with the Werewolf (1 charge, carrying the cake) alone at the lock-up and the other 4 held | #112-#127 | Lead 2,3,2,2,1,1,2,1,0. Good Dog spent as a raise in R3. The crowded square and festival parade rows (Sly or Charm) gave him a d4 once Hounds came in. **Cornered in round 8: Forked.** Had he escaped: 1 of 5, Bust, and 4 left behind still can't go below Bust (p20) | - |
| **D10** | **Huge piece, two carriers**, a carrier caught | **[hypothetical]** grandfather clock in place of the mirror, carried by the Ghost and Werewolf. The Werewolf (carrying) rolls the way out **[stipulated Trouble, Monster forced, hidden]**: S5 to 6, mob 11. **No Mask, Nimble one size smaller** | #136-#141 | R1 alleys: Ni d10 + Good Dog, Success. R2 Br d10 + Good Dog, Success. R3 Br d8 (Hounds) +M, Success with Monster showing. **Escaped in 3 rounds, still carrying**, back at the way out. Good Dog kept two Monster shows from counting; the R3 one still made +2 | 6 to 8 |
| **D11** | **Everyone held**, so Forked | **[stipulated T9, S6]**: four held. The Creature (0 charges) is the last free Entity at the lock-up | #128-#134 | Loud rescue, Br d12+Mk: **Trouble** (one rise +1, S7). Caught: chase at mob 11. R1 Cost, R2 Cost, R3 Trouble (Fire): **cornered, so every Entity is held, the night ends at once, Forked** (p18) | 6 to 8 |
| **D12** | **Left Behind** on the ladder | **[stipulated]** Raid 1 at T6, S9, the Witch held (she had handed the cake over first); the other four hold all 5 items + mirror and choose to leave her | #142 | Werewolf, way out at 6, Ni d12+Mk: Success. Grand Year, one left behind, so **Win** | 9 |

**The hunt starting mid-Turn with Entities who haven't acted** happened naturally in Raid 2 T5 (Dracula and the Creature) and Chain D T9 (Dracula). A pending "Lose a Turn" lapses (p12), and that never needed dice.

**Small entrances:** Thistlewick has none and "In a rolled town no way in or way out is small" (p25), so I could only test this as a reading (issue I11).

## Odds (exact, from the scripts; no abilities unless stated)

**Solo local chase, P(escape): Mask / Monster, then average rounds with the Monster.**

| Entity | mob 9 (S2-3) | mob 10 (S4-5) | mob 11 (S6-7) | mob 12 (S8+) |
|---|---|---|---|---|
| Dracula | 42% / 73%; 3.8r | 20% / 58%; 3.8r | 6% / 39%; 3.8r | 2% / 22%; 3.3r |
| Werewolf | 38% / 73%; 4.0r | 18% / 58%; 4.0r | 7% / 39%; 4.0r | 3% / 22%; 3.5r |
| Witch | 45% / 76%; 3.9r | 23% / 62%; 4.0r | 8% / 44%; 4.0r | 3% / 26%; 3.6r |
| Ghost | 39% / 71%; 3.8r | 18% / 57%; 3.8r | 6% / 39%; 3.7r | 2% / 22%; 3.3r |
| Creature | 31% / 70%; 4.0r | 13% / 53%; 4.1r | 4% / 33%; 3.9r | 2% / 17%; 3.4r |

- Spending a raise in rounds 1-3 adds 4-11 points, for example Witch at mob 12 goes from 26% to 33%.
- At mob 12 with the Monster, the rise is +2 in 89% of escapes and 69% of cornerings. With the Mask it is +1 or 0, but escape is only about 3%.

**Two-runner shared chase vs fleeing alone (Monster).** Together is always at least as good as alone, for example Dracula + Werewolf at mob 10: 72% together vs 58% each alone. So the two quick cornerings in D4 and D4b were bad luck, not a flaw. It also means giving up to "help" a partner never helps.

**Final flight (Standard: Lead 2, escape 5, mob 11).**

| Runners | No raises | A raise on every roll for 2 rounds | For 3 rounds | Fetch (Lead 3), no raises | Lost in round 1 |
|---|---|---|---|---|---|
| 1 (Werewolf) | 57% (about 7 rounds) | 61% | 64% | 75% | - |
| 3 (Dracula, Witch, Creature) | 67% | 76% | 79% | 82% | 8% |
| 5 (all) | 71% (about 3.4 rounds) | 81% | 84% | 86% | 11% (6% with raises) |

## NEW ISSUES

The severity scale is blocker / confusing / minor. **I found no blockers.**

**I1. Free, unlimited overdraws in a local chase once the Limit is certain** (confusing; it causes stalls)
- *Where:* D2. The Witch at S8: her Monster showed in round 1, so the chase's +2 was already going to bring the Limit. After that, every overdraw cost nothing. She overdrew 15 times, two per roll, rolled Wits d12 every round, and the chase ran 12 rounds while four players waited.
- *Quotes:*
  - "At zero charges you can still use one by overdrawing: it costs Suspicion +2 instead of a charge, on top of anything else the roll raises." (p12)
  - "An overdraw in the chase adds its +2 on top." (p17)
  - "Then Suspicion stops, and any extra points are lost." (p16)
  - The book limits overdraws "only once per flight" (p19) but sets no limit for a local chase, or for several overdraws on one roll.
- *Fix:* "You may overdraw at most once per chase (local or final), one ability per roll."
- **Ruling to use tomorrow: one overdraw per local chase, one ability per overdraw.**

**I2. Abilities spent "as a raise" in the final flight: do the ability's own limits apply, and can an approach go on a friend's roll?** (confusing; it comes up in almost every flight)
- *Where:* Raid 2 flight, round 2. The Ghost spent Through the Wall as a raise while carrying the mirror. Through the Wall's text says "not while you carry loot or furniture" (p10). Mesmerise says "at a watched obstacle only" (p8), and a flight has no obstacle, so read strictly it could never be a raise.
- *Quotes:*
  - "an approach of your own, or the Draught, only ever works on your own roll. In the final flight, any of them may be spent as a raise instead." (p7)
  - "In the final flight, any ability may be spent as a raise instead of doing what it usually does." (p13)
  - "Abilities can go on anyone's roll, since you all flee together." (p18)
- *Fix:* add "As a raise, an ability ignores its own trait, place and carrying limits, and can go on any runner's roll."
- **Ruling: as a raise, ignore the ability's own conditions. Any runner may spend one on any runner's roll.**

**I3. Does giving up before any roll raise Suspicion?** (confusing)
- *Where:* Chain C (Werewolf at S9) and Chain D (Ghost at S9). Giving up before rolling is the strongest play at high Suspicion: no roll means no trigger, so no rise and no hunt, though you lose your loot.
- *Quote:* "A local chase raises Suspicion once, when it ends, by the biggest trigger among all its rolls" (p17), and "Giving up. At the start of any round, a runner may give up and be captured, with no roll." (p18). Neither says what happens with zero rolls.
- *Fix:* add "Give up before your first roll and the chase raises nothing." Alternatively, if this escape valve isn't wanted, "giving up still raises Suspicion by 1."
- **Ruling: no rolls, no rise.**

**I4. "Capture is only a setback" vs loot lost for good** (confusing; it sets the wrong expectation)
- *Where:* D4. Dracula was captured carrying the tea service (an essential), so the year could no longer be a Win, whatever the rescue did. Chain D lost the cake the same way.
- *Quotes:* "The lock-up. Capture is only a setback." (p27) against "the town takes back what you were carrying, furniture included. It's gone for the night, and nobody can take it again." (p18)
- *Fix:* reword p27 to "Capture is only a setback for the Entity. What it carried is gone, so pass the essentials to someone who isn't rolling at watched obstacles." Optionally, a captured item goes back to its location, to be stolen again.
- **Ruling: read p18 aloud at the start ("loot you're captured with is gone for the night") and remind players that handing loot over is free.**

**I5. Giving up: before or after the ground roll?** (minor)
- *Quote:* "At the start of any round, a runner may give up" (p18), while step 1 of a round is "The ground. The Storyteller rolls a d6" (p17).
- *Fix:* say "before the ground is rolled".
- **Ruling: decide before the Storyteller rolls the ground.**

**I6. A final-flight overdraw costs a "Soon" Entity nothing in round 2, and little in round 1** (minor; balance)
- *Where:* Chain D round 2. The Witch overdrew on her own roll; the cost starts "from your own next roll", which is round 3, and Rowan arrives in round 3 anyway. A round-1 overdraw costs only round 2. Dracula and the Ghost (Always) can never overdraw in the flight. So 6 of the 8 Entities get a nearly free extra ability, and 2 get none.
- *Quote:* "From your own next roll to the end of the flight, your trait die is one size smaller (if you overdraw on your own roll, that roll doesn't take it)." (p19), together with "Soon: from the third round of any chase" (p17)
- *Fix:* "a flight overdraw makes your trait die one size smaller from your next roll, **on top of** your Weakness" (and then Always Entities could overdraw too).
- **Ruling: play as written tomorrow; just know an overdraw in round 2 is free.**

**I7. The local chase still spirals at high Suspicion** (minor; design, works as written)
- *Where:* D2 plus the odds table. At S8+ the mob is 12: about 22% escape with the Monster and 2-3% with the Mask, and the rise is almost always +2, which brings the Limit. A cornered runner is "captured first and stays behind" (p18), with no Turns left to rescue it, so it is left behind. One Trouble at a watched obstacle at S8 typically costs the runner (capture), its loot, and one step on the ladder.
- *Quote:* "The mob's Difficulty: 8 plus half the Suspicion when the chase starts, rounded down, at most 12." (p17)
- *Fix (pick one):*
  - cap the local mob at 11 (the flight's number);
  - start the local Lead at 2 when Suspicion is 6+;
  - or say plainly in the chase rules that giving up (I3) is the safety valve.
- **Ruling: none needed. At S8+ the Storyteller tells a caught player: "you can give up now and nothing rises".**

**I8. Picking which arrival's Tell went off** (minor; slow)
- *Where:* Raid 2 T4. With 2 arrivals, "rerolling unused numbers" took 6 dice.
- *Quote:* "number them and roll a d6, rerolling unused numbers" (p16)
- *Fix:* "two arrivals: odd/even; three: 1-2/3-4/5-6".
- **Ruling: odd/even for two, pairs for three.**

**I9. A random Perk can be dead for the town** (minor)
- *Where:* the Creature rolled Strong Back in both raids, and Thistlewick's piece is Bulky. The Duty rule already says "pick one that is where you can" (p7), but Perks have no equivalent.
- *Quote:* "To pick a Gift or a Perk at random, roll a d6" (p6)
- *Fix:* "Reroll a random Perk that can't matter this raid."
- **Ruling: reroll Strong Back on Thistlewick.**

**I10. Huge-piece carriers: partial actions** (minor; not on Thistlewick)
- *Where:* D10. The rules cover "lose it if either is captured" but not:
  - whether both carriers must spend their action on each Turn of the move;
  - what happens if one carrier has "Lose a Turn";
  - whether the partner still counts as carrying while the other is in a chase.
- *Quote:* "A Huge piece's two carriers both count as carrying it, move together, and lose it if either is captured." (p15)
- **Ruling: both spend their action on every Turn of the move. If either can't, the piece doesn't move. A caught carrier's partner still holds it.**

**I11. Small entrances** (minor; no premade or rolled town has one)
- *Where:* reading only. It is unclear whether a small way in also stops a Huge piece leaving that location, and whether a small way out also blocks the piece in the final flight.
- *Quotes:* "A Huge piece can't go through a way in or way out that a map marks small." (p15) and "(then a Huge piece can't be carried out of town)" (p23)
- **Ruling: a Huge piece leaves a location by its chosen way in. A small way out means it never leaves town, the flight included.**

**I12. Fetch nearly halves the flight's risk** (minor; balance)
- *Where:* Raid 2. With Fetch's Lead 3, a 5-runner flight escapes 86% of the time instead of 71% (no raises); Raid 2 escaped in 2 rounds.
- *Quote:* "A final flight you're in starts at Lead 3, not 2." (p9)
- **Ruling: none; it's strong but fine.**

## Rulings cheat-sheet for tomorrow

1. **Local chase overdraws:** at most one per chase, one ability each.
2. **Abilities as raises in the flight:** ignore the ability's own limits. Any runner's charge can raise any runner's roll.
3. **Giving up before any roll:** no Suspicion rise.
4. **Captured loot is gone for the night.** Say so at the start and remind players to pass essentials around (handing over is free).
5. **Give-up timing:** decide before the ground roll.
6. **Tell-arrival pick:** odd/even for two arrivals.
7. **Random Perks:** reroll one that can't matter this raid (Strong Back on Thistlewick).
8. **Huge piece:** both carriers spend their action on each Turn of the move.

## What worked

- **Turn order and "anyone who hasn't acted doesn't."** It resolved the mid-Turn hunts cleanly (Raid 2 T5, Chain D T9), as did "If that Trouble brings the Limit, there's no local chase" (p17).
- **"A roll's result comes first" (p16).** It settled both Limit-filling successes, at the way out (#87) and at the rescue (#91), without argument.
- **"One roll, one rise" and "one chase, one rise."** Easy to track, including Rattle and Good Dog inside a chase.
- **The group check and majority rule.** The worked example on p18 makes counting quick.
- **The lock-up table (p18).** Clear: slip free, rescue, Cost and Trouble rows all applied without lookups.
- **The furniture tick as a clock.** In Raid 2 the mirror's +1 per Turn was the real tension. Abandoning it to stop the tick (Chain C) is a good decision point, and "Warn the party" (p27) is the right tip.
- **Raise netting (p13).** Duty raise vs Cost step-down vs Weakness: unambiguous every time it came up.
- **The way-out Tell "once anyone comes back"** and "The lock-up counts, but not a captive's arrival": clear.
- **Ability sharing in the final flight.** Brute Force or Potion for That spent on a friend, "the roller always rolls its own dice", makes the flight a team effort. It was the most fun part of play.

## How it felt

- **Pace.** With 5 players on Standard, splitting five ways finished the list by Turn 4-5 in both raids. Twelve Turns never bit; Suspicion and the furniture tick were the only clocks. With 3 players the Turn clock would matter much more.
- **Was getting caught fair?**
  - At low Suspicion, yes: D1 took 3 rounds and cost +1.
  - In the middle (mob 10-11) it's a coin flip, and since you need the Monster to have a chance, a chase almost always costs +2.
  - At S8+ being caught is mostly a capture plus the hunt. The give-up option is the hidden lifeline, but it costs your loot. Losing an essential to one capture (D4) felt harsher than "Capture is only a setback" promised.
  - Shared chases felt fragile (two cornerings in 1-2 rounds), but the exact odds show they are actually better than fleeing alone.
- **Did the chase still spiral?** Only at the top of the track, but there it does (I7). Local chases ran 1-3 rounds in 6 of the 7 that were played out (the two give-ups took no rounds). The outlier was 12 rounds, made possible by the free overdraws in I1.
- **The final flight** felt tense and fair with charges in hand: Raid 2 escaped in 2 rounds and Chain D in 4. With empty pools and Weaknesses in, d4 rows such as Sly or Charm for the Werewolf are near-hopeless. A lone runner (D9c) slogged 8 rounds and was forked. A 3-runner flight (D9b) was forked in round 1, the roughly 10% "no agency" case.
- **Were charges spent?** Barely in a smooth raid (3 of 15), and early Criticals refunded nothing. In the flight they flowed (6 in one round), and in chases players spent until empty, then overdrew. Spending as a raise in the flight is the big sink and works well.
- **The way out at Limit-1.** The loud way and the Monster cost nothing, because the result comes first. Rowdy players will discover that the last roll of the night is always "let it out". That is fun rather than a problem.

## Files

- Dice log: `play-scripts-std/dice-log.txt`
- Roller: `play-scripts-std/roll.js`
- Odds: `play-scripts-std/chase-odds.js`, `flight-odds.js`, `shared-odds.js`, `round1-odds.js`
- Map crop: `play-scripts-std/zoom/p30map.png`

All paths are relative to this folder (`dgf-v02`).
