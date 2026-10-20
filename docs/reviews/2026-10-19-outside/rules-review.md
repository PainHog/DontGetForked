# Don't Get Forked v0.1: rules review

Reviewed: the whole 34-page playtest copy, read from the extracted text. I checked the PDF renders of pages 7, 8, 11, 18 and 28–33 for tables, maps, the Entity Sheet and At the Table. The Heisty Spideys lessons file served as a checklist (Appendix A).

How the numbers were made:
- Exact dice odds come from full enumeration.
- Chases, the final flight and whole raids come from a Monte Carlo simulator. It plays the v0.1 rules as written with a heuristic party policy. Assumptions are in Appendix B; the scripts are in `rr-sim/` next to this file.
- Every quote is verbatim from v0.1. Apostrophes are straightened.

**Severity**
- **Blocker:** a table must invent a ruling, and that ruling decides the outcome.
- **Confusing:** readers will disagree or misplay. For a balance finding it means the effect is large enough to need a design decision.
- **Minor:** polish, or a small effect.

All fixes are suggestions; the author decides.

---

## Top 10

| # | Severity | Pages | Issue |
|---|---|---|---|
| 1 | confusing (balance) | 17 | **Local chases pump Suspicion and feed on it.** One Trouble at a watched obstacle starts a chase that adds about **+4 Suspicion** on average (Limit 11). The mob's Difficulty climbs with that same Suspicion. Escape odds fall from 60–86% at Suspicion 0 to 25–57% at 4 and 7–26% at 8. Chases that start at Suspicion 4 end the whole raid in the final flight about 20% of the time. Using the Mask in the chase keeps Suspicion down, but then escape collapses (Creature: 12% at Suspicion 4). |
| 2 | blocker | 14, 15, 16 | **A roll that succeeds and also fills the Limit.** No rule says which happens first. A passing way-out roll where the Monster shows could leave the party out of town or put it in a final flight. A rescue that fills the Limit could free the captives or not. |
| 3 | confusing (balance) | 12, 16, 18 | **Overdraw is nearly free on Monster rolls and in group checks** because of "one roll, one rise". On a d4–d8 Monster roll it costs +0.3 to +0.8 expected Suspicion, not +2. It is unlimited outside the flight, which undercuts the 3-charge economy. |
| 4 | confusing (balance) | 7, 10, 14 | **Spectral (the Ghost's default Perk) passes group obstacles with no roll, no action and no charge.** This contradicts the book's own "ABILITIES NEVER PASS AUTOMATICALLY" box and the Heisty lesson. Every premade town has a group obstacle, often the last one before an item, that a Ghost carrying nothing passes for free; the Thistlewick top hat needs only the move. The pass also picks the way in for the whole party. |
| 5 | confusing | 12, 17 | **"A chase roll only moves the Lead"**, yet Suspicion still rises in local chases. Both statements are on p17. |
| 6 | confusing | 12, 18, 32, 33 | **When does a final-flight overdraw's Weakness start?** "From your own next roll" is ambiguous when you overdraw on your own roll: does the penalty cancel the raise you just bought? |
| 7 | confusing | 14, 15 | **Way out: one try per Turn, or several?** "Several may try the same obstacle in one Turn" conflicts with "try again next Turn". |
| 8 | confusing | 5, 12, 22, 33 | **"6 easy, 8 standard, 10 hard"** reuses the town-level names Easy/Standard/Hard for obstacle Difficulties. The book itself warns that these are different things. |
| 9 | minor (balance) | 8, 9, 11 | **Default picks that barely matter.** Hypnotic Eyes cuts the Monster showing on Charm d12 only from 37.5% to 30%. Strong Back does nothing in all three premade towns, which have only Bulky furniture. The Witch's default Broomstick approach uses her d4 Nimble, and her signature raise does nothing on her d12 Wits. Wall-Crawler adds 2.5–3 points of chase escape, while Fly by Night adds 13–19. |
| 10 | confusing (balance) | 14, 16, 25 | **Suspicion is the only clock, and Hard is decided by the final flight.** On Easy and Standard, simulated parties leave around Turn 6.5–7.4 of 12, and dawn almost never arrives. On Hard, about 60% of raids hit the Limit, only about 39% leave by the way out, and 12–19% end Forked. |

Overall, the simulated difficulty curve is close to the Heisty targets (Win rate, party of 3–5):
- Easy: 86–92%.
- Standard: 73–80%.
- Hard: 47–56%.

The Entities are balanced within a few points of each other (§4). The core is sound; most issues are about wording, edge cases, and the chase/overdraw interaction with "one roll, one rise".

---

## 1. Contradictions

### C1. "A chase roll only moves the Lead" vs Suspicion rising in chases
**Confusing.** Pages 12 and 17.
- p12: "In a chase, a result moves the Lead instead. A Cost costs nothing there, and Trouble starts no new chase."
- p17: "A chase roll only moves the Lead. A Cost brings no Storyteller's Cost, and Trouble starts no new chase."
- p17, next paragraph: "Suspicion in a chase. In a local chase it still rises as usual (Trouble +1, the Monster showing +2, an overdraw +2), once per roll, by its biggest trigger."

The worked example (p31) then raises Suspicion twice in one chase. A reader who stops at "only" will play chases with no Suspicion cost.

**Fix:** "A chase roll moves the Lead instead of beating an obstacle. A Cost brings no Storyteller's Cost and Trouble starts no new chase, **but in a local chase the roll still raises Suspicion** (below)."

### C2. The way out: several tries per Turn, or one?
**Confusing.** Pages 14 and 15.
- p14: "Several may try the same obstacle in one Turn, and each try risks Trouble."
- p15, the way out (an obstacle): "On Trouble, Suspicion rises and the roller is caught; try again next Turn."

If several tries are allowed, a party at the way out gets 3–5 attempts per Turn, which makes the Hard way out (Difficulty 10) far easier.

**Fix:** state it outright: "The way out can be rolled once per Turn." Or: "...another Entity may try at once."

### C3. Play length
**Minor.** Pages 5, 27 and 34.
- p5: "A raid runs 1–2 hours, so an evening often fits two."
- p27: "A raid should fit in an hour or two".
- p34 (back cover): "For 3–5 players and a Storyteller · 2–3 hours · ages 12+".

**Fix:** use one figure. The simulator's 12–30 rolls and 0.4–1.1 chases per raid support "1–2 hours a raid". If setup is included, say "2–3 hours including setup".

### C4. The quick reference drops the approach exception at the way out and lock-up
**Confusing.** Pages 13 and 33.
- p33: "open your own approach with an unlisted trait (a Difficulty 2 lower; your own roll, and only you get past; never in a chase)".
- p13: "Two places work as usual. At the way out, your Success or Cost gets everyone out. At the lock-up, a rescuer's Success or Cost frees every captive".

At the table, a player reading p33 will think Dracula's Mesmerise at the way out takes only Dracula out. (Mesmerise works there because the way out is always watched.)

**Fix:** add "(at the way out and the lock-up it works for everyone)".

### C5. Other omissions in At the Table (p33) and the Entity Sheet (p32)
**Minor.** Pages 16, 18, 20, 32 and 33.
- **How the Year Went (p33)** has no **Forked** line. It appears only under Chases as "Cornered: forked."
- **The Tell line (p33)**, "the first time anyone reaches each watched place, the lock-up and the way out included", omits two qualifiers from p16:
  - "not a captive's arrival";
  - "The way out counts once anyone comes back to it".

  The party starts at the way out, so a literal reader checks a Tell at setup.
- **The overdraw line (p33)**, "(once a flight, from your next roll)", omits "and not at all while your Weakness is in play" (p18). The Sheet does include it.
- **"The Mask allowed" (p33, local chase)** omits "no Mask while carrying furniture" (p17). It is under Turns, but not in the chase line.
- **The Sheet's Status box** (p32: "In town / Captured (lock-up) / In the final flight / Out of town") has no state for "caught (in a local chase)" or "between places (carrying)".

**Fix:** add the missing words. Each needs only a few.

### C6. "Killed" vs back next year
**Minor.** Pages 18 and 21.
- p18: "If you're cornered, the party is forked. The monsters in the flight are killed and the year's result is Forked."
- p21: "An Entity forked or left behind is back at the castle for the next raid, and the Entities themselves never change."

**Fix:** soften p18 ("...are dragged off to the bonfire, and the year's result is Forked") or add a wink on p21 ("they're monsters; they get better").

### C7. Forked "whatever came home", but nothing can come home
**Minor.** Pages 15, 20 and 21.
- p20: "Forked: Cornered in the final flight: the raid is lost, whatever came home".
- p21: "Each piece of furniture or decor brought home, whatever the year's result, becomes a castle upgrade."

Nothing can come home on a Forked result. "The party leaves together" (p15), and everyone not captured is in the flight. So "whatever came home" invites the question of whether a Forked party keeps its upgrade.

**Fix:** "Forked: cornered in the final flight; nothing comes home."

### C8. "Any ability" can help a friend, but the Draught can't
**Minor.** Pages 7, 11 and 31.
- p7: "A signature or a Gift can go on any roll in the same place... The roll can be yours or a friend's".
- p31: "(Any ability but an approach of your own can go on a friend's roll in the same place...)".
- p11, the Draught: "Before one of your rolls, change form".

**Fix:** "any ability but an approach or the Draught".

### C9. "Three Picks" random rule vs a six-option Castle Duty
**Minor.** Pages 6 and 7.
- p6: "Three Picks... To pick at random, roll a d6: 1–2 the first option, 3–4 the second, 5–6 the third." Castle Duty is listed as one of the three picks, but it has six options.
- p7 gives the right rule: "rolls a d6, rerolling any Duty already taken".

**Fix:** "(Gift and Perk)" after the 1–2/3–4/5–6 rule, plus "Castle Duty: roll on its d6 table, rerolling any Duty already taken."

### C10. The Storyteller's dice
**Minor.** Page 5. The text says "For the Storyteller, a d20." The Storyteller also rolls:
- d6s for Tell checks, the chase ground, villagers, customs, the furniture, and two d6 for each shopping item;
- a d10 for the Watched row.

**Fix:** "a d20, a d10 and two d6".

### C11. "Choose on every roll"
**Minor.** Pages 5 and 12.
- p5: "Choose on every roll whether to hide behind your Mask or let the Monster out."
- p12: "When you're carrying furniture, or in the final flight, it must be the Monster."

**Fix:** "on most rolls".

### Towns vs the town-building rules (Ch 9 vs Ch 8): no contradictions found
I checked these line by line against the maps (zoomed renders of pp. 28–30):
- shopping-list sizes and essentials (4/1, 5/2, 5/2);
- every item's kind against its location (the Ch 8 places table);
- different quiet traits for every pair of ways in;
- furniture obstacles at rolled Difficulty +2;
- the 12-ceiling, including Gallowsmere's furniture 12 (rolled 10) not counting;
- the way out, lock-up, mob and escape numbers;
- villagers and customs taken from the d6 tables;
- eyes on every watched location;
- stars on the furniture location;
- map numbering.

All are consistent. Two observations:
- Gallowsmere plays slightly harder than an average rolled Hard town. 12 of its 17 obstacles are watched (71%, against 60% from the d10), and it simulated at a 50% Win against 55% for rolled Hard towns.
- No map uses a "small" entrance, and no map key shows one (see U4).

---

## 2. Undefined or ambiguous rules (in session order)

### Setup and town rolling

**U1. Rolling the second way in.** Minor. Page 23.
"Roll the first obstacle twice, once for each way in." The text doesn't say whether the Difficulty d20 and the Watched d10 are also rolled twice. The premade towns show separate values for each way in.
**Fix:** "Roll all three dice for each way in."

**U2. More items of one kind than places.** Minor. Page 23.
"If a kind has more items than places, two of them share a place." This works for four of a kind (0.7% of 5-item lists). It fails for five of a kind (0.01%), which needs two shared places.
**Fix:** "...they share places, two to a place."

**U3. Two items at one location.** Minor. Page 14.
"Whoever gets past the last obstacle has the item in hand". It doesn't say who gets the second item. In a group check, two Entities can pass the last obstacle at once.
**Fix:** "...has both items in hand. If several pass at once, they choose who holds what."

**U4. "Small" entrances.** Minor. Pages 15 and 23.
"A Huge piece can't go through an entrance a map marks small." "Entrance" isn't a defined term (locations have "ways in", and the town has "the way out"), and the maps have no symbol for it.
**Fix:** "a way in or way out marked small (a narrow door symbol on the map key)".

### At a location

**U5. When the way in is locked.** Confusing. Page 14.
"The party picks one the first time anyone tries the location, and everyone uses only that one there for the rest of the raid." It doesn't say whether arriving, a Spectral pass, or an approach counts as "trying". This matters because a Ghost's free pass through a group way in chooses it for everyone (see E1).
**Fix:** "...the first time anyone rolls at, or passes, one of its ways in."

**U6. Who gets a Critical's refund.** Confusing. Page 12.
"Outside a chase, you get back one charge you spent (never more than you started with)." Open questions:
- Does the roller get a charge back when a helper paid for this roll?
- Does an overdraw count as "spent"?

**Fix:** "...the roller gets back one charge it spent earlier this raid; an overdraw isn't a charge."

**U7. The Ghost's free pass happens during a move.** Confusing. Page 10.
"no roll and no action, so you can still move or roll that Turn." Read literally, the Ghost moves to a location and passes a group way in on arrival. If that is the only obstacle (the Thistlewick hatter's rooftops), the item is in hand on the arrival Turn.
**Fix:** decide whether a pass needs the Ghost to have arrived on an earlier Turn.

**U8. A roll that succeeds and also fills the Limit.** **Blocker.** Pages 14, 15 and 16.
- p14: "each result counts at once".
- p15: "A Success or a Cost gets everyone out".
- p16: "When Suspicion reaches the Limit... the hunt is on. Every Entity who isn't captured flees together in the final flight."

A passing way-out roll where the Monster shows (37–75% on a Monster roll) can fill the Limit. Either the party is home, or it is in a final flight with a 10–30% chance of Forked. The same question arises for a rescue: are the freed captives in the flight, or left behind? A careful simulated party almost never meets this case at the way out, because it uses the Mask there. A table that rolls the Monster at the way out near the Limit will.
**Fix:** "A roll's result happens first, then its Suspicion. If that roll gets the party out, it is out." Or the reverse, stated in one sentence.

**U9. Huge furniture with two carriers.** Confusing. Page 15.
"A Bulky piece needs one carrier and a Huge piece two". Undefined:
- whether both carriers spend both Turns of the move;
- what happens if one carrier is caught or captured ("the town takes back what you were carrying, furniture included", p18), or wants to set the piece down alone;
- whether the second carrier also loses the Mask.

**Fix:** "Both carriers move together and both spend the two Turns. Both lose the Mask. If either is caught, the piece is set down where they are; if either is captured, the town takes it."

**U10. Two-Turn map moves while carrying.** Minor. Pages 14 and 23.
"A move takes one Turn, or two when carrying furniture, unless a map says otherwise." Does a map's two-Turn move take four Turns while carrying?
**Fix:** "Carrying adds one Turn to any move."

### Chases, capture and the end of the night

**U11. Everyone captured.** Confusing. Pages 16 and 20. There is no rule.
- Can captives keep slipping free until dawn?
- Does the Limit still start a hunt with nobody to flee?
- What is the result?

All left behind gives Bust ("It never drops below Bust"). That is strictly better than Forked, so a doomed party should surrender rather than run.
**Fix:** "If every Entity is held, the night ends: everyone is left behind and the year is Forked." Or keep Bust deliberately and say so.

**U12. A captive handing loot out (Hidden Pockets).** Minor. Pages 10, 15 and 18.
- p15: "it can never hand loot to a captive".
- p18: "While held, you can't pick up or be handed anything."

Neither says whether a captive (the Invisible Man with Hidden Pockets) can hand loot to a visitor.
**Fix:** one clause either way.

**U13. Is slipping free the captive's action?** Minor. Page 18.
"The captive, once per Turn, from the Turn after its capture". The text implies an action but never says it, and captives can also "spend charges on any roll at the lock-up".
**Fix:** "...as its action".

**U14. When a final-flight overdraw's Weakness starts.** Confusing. Pages 12, 18, 32 and 33.
- p18: "From your own next roll to the end of the flight, your trait die is one size smaller. If you overdraw on the roll of someone who rolls before you in a round, your own roll that round already takes it."
- p12: "...so your trait die is one size smaller to the end of the flight."
- p32: "your Weakness from your next roll".

When you overdraw on your own roll, it is unclear whether that roll takes the step-down:
- If it does, an overdrawn raise cancels itself on that roll.
- If it doesn't, the overdraw is a free raise now, and the flight may end before the penalty bites.

**Fix:** "...starting with the roll you overdraw on, if it's yours." Or: "starting with your following roll." Either works; pick one.

**U15. No floor on Difficulty.** Minor. Pages 8, 9 and 13. Reductions stack with no floor:
- an approach (−2);
- Shortcut (−2);
- Fetch (−1);
- Fear the Curse (−1).

Example: Fetch plus Dracula's Mesmerise at the Easy way out gives 6 − 1 − 2 = 3, a guaranteed pass. This is harmless, but it is the only stacking the book doesn't cap.
**Fix (optional):** "No Difficulty goes below 4."

### Checked and found answered (not reported as issues)
- Can Suspicion pass the Limit or come down? No (p16).
- What happens at the Limit during a local chase? Answered, including "captured first" (p16, p18) and Already Dead (p10).
- Duty raise plus an ability raise: one raise only (p7, p13).
- A step-down plus a raise: they net out (p13).
- Cost at the way out: none (p15, p26).
- Watched furniture doesn't make its location watched (p14, p16, p29).
- Abilities in a local chase: own roll only (p13, p17).
- Overdraw with an Always Weakness: banned (p18).
- Group checks: one rise, everyone with Trouble caught together (p15, p16).
- The d3 (p5).
- Tell timing with several arrivals (p16).
- Dropped items between places (p15).
- Furniture ticks and when they stop (p15).
- A Weakness resets for the final flight (p17).
- Cost "drop an item" never takes the loot that roll won (p12).
- The ST never picks a free Cost (p12).

---

## 3. Arithmetic and probability

### 3.1 The core roll (exact)

Pass = Success or Cost. "E[Susp]" is the expected Suspicion from the roll itself (Trouble +1, Monster shows +2, one rise), with no loud way and no Cost picks.

| Trait | Difficulty 8: Mask pass / Trouble / E[Susp] | Difficulty 8: Monster pass / Trouble / shows / E[Susp] | Difficulty 10: Mask pass / Trouble | Difficulty 10: Monster pass / Trouble | Difficulty 12: Mask pass | Difficulty 12: Monster pass |
|---|---|---|---|---|---|---|
| d4 | 58 / 42 / 0.42 | 75 / 25 / 75% / 1.65 | 25 / 75 | 55 / 45 | 4 | 35 |
| d6 | 72 / 28 / 0.28 | 83 / 17 / 65% / 1.40 | 42 / 58 | 65 / 35 | 17 | 45 |
| d8 | 79 / 21 / 0.21 | 88 / 13 / 55% / 1.18 | 56 / 44 | 74 / 26 | 31 | 55 |
| d10 | 83 / 17 / 0.17 | 90 / 10 / 45% / 0.96 | 65 / 35 | 79 / 21 | 45 | 64 |
| d12 | 86 / 14 / 0.14 | 92 / 8 / 37.5% / 0.80 | 71 / 29 | 83 / 18 | 54 | 70 |

Readings:
- The Mask/Monster choice is a real one. The Monster adds 6–31 points of pass chance, but costs about +0.8 to +1.7 expected Suspicion per roll, against 0.1–0.8 for the Mask. This works.
- **Trouble is common.** Even the best case (d12 with the Mask) gives Trouble 14% at Difficulty 8, 29% at 10 and 46% at 12. Heisty's target was about 10% failures. Here Trouble at a watched obstacle starts a chase, so these numbers matter a lot (3.3).
- **Criticals are rare:** about 2–8% of rolls at Difficulty 8 and up (simulated raids: 4.5–6.7%). The charge refund seldom happens; at Difficulty 12 with a d4 or d6 trait it is (almost) impossible. Fine as a small bonus, but don't count on it to fund abilities.

### 3.2 What one charge buys (pass chance, Mask unless stated)

| Trait / Difficulty | Base | Raise | Monster without Suspicion | Approach (Difficulty −2) |
|---|---|---|---|---|
| d6 / 8 | 72 | 79 (+7) | 83 (+11) | 92 (+19) |
| d10 / 8 | 83 | 86 (+3) | 90 (+7) | 95 (+12) |
| d12 / 8 | 86 | 86 (**+0**) | 92 (+6) | 96 (+10) |
| d6 / 10 | 42 | 56 (+15) | 65 (+23) | 72 (+31) |
| d10 / 10 | 65 | 71 (+6) | 79 (+14) | 83 (+18) |
| d12 / 10 | 71 | 71 (**+0**) | 83 (+12) | 86 (+15) |
| d10 / 12 | 45 | 54 (+9) | 64 (+19) | 65 (+20) |

- **"Your trait die one size bigger" is the weakest kind of ability.** It is worthless on a d12, and at Duty locations it is blocked ("That is the roll's one raise").
  - Raises are the Witch's signature, the Ghost's default Gift and Jekyll & Hyde's default Gift.
  - The Witch's Hedge Spell does nothing on her own d12 Wits.
  - **Fix (optional):** let a raise on a d12 add +1 to the total. Or make raise abilities "one size bigger, or +2 on a d12".
- Charges are spent: 52–100% of starting charges in the simulated raids. Criticals refunded some, so Hard parties spent slightly over 100%. The "unspent ones are lost" rule works.

### 3.3 Local chases (simulated, solo, Limit 11, no charges left)
Lead 1, escape at 4, mob = 8 + floor(Suspicion/2) (max 12), recomputed each round. Weakness as listed. The policy picks the better ground trait and chooses the Mask or Monster by expected Lead gain. The weight it gives Suspicion rises toward the Limit.

| Entity | Start Suspicion 0 (mob 8): escape / captured / flight, +Suspicion | Start 4 (mob 10) | Start 8 (mob 12) |
|---|---|---|---|
| Dracula | 69 / 24 / 7, +4.4 | 31 / 48 / 21, +3.9 | 8 / 58 / 35 |
| Creature | 60 / 30 / 10, +4.9 | 25 / 52 / 24, +4.2 | 7 / 58 / 36 |
| Mummy | 64 / 27 / 9, +4.8 | 28 / 49 / 23 | 7 / 55 / 37 |
| Werewolf (Night Runner) | **86** / 8 / 6, +3.6 | **57** / 21 / 22 | 26 / 22 / 52 |
| Invisible Man | 76 / 18 / 6, +4.0 | 42 / 38 / 20 | 14 / 47 / 39 |
| Ghost | 66 / 27 / 8, +4.6 | 30 / 49 / 21 | 7 / 58 / 35 |
| Witch | 70 / 22 / 8, +4.4 | 35 / 43 / 22 | 11 / 51 / 38 |
| Jekyll | 75 / 20 / 5, +4.0 | 40 / 41 / 20 | 12 / 51 / 37 |

The same chase with the Mask only (escape / Suspicion added):

| Entity | Start 0 | Start 4 | Start 8 |
|---|---|---|---|
| Creature | 54%, +1.1 | **12%**, +1.5 | 2% |
| Dracula | 63% | 17% | 2% |

With 3 charges, the Werewolf and Invisible Man (Monster-without-Suspicion signatures) escape 85–94% at Suspicion 0 and add only about +1.4.

**P1. The chase is a Suspicion pump with a feedback loop.** Confusing (balance). Page 17.
- p17: "The mob's Difficulty: 8 plus half the Suspicion, rounded down, at most 12. Work it out again at the start of every round, because the chase can raise Suspicion."
- p17: "In a local chase it still rises as usual (Trouble +1, the Monster showing +2...)".

One failed roll costs +1, then the chase averages about +4 more: roughly 45% of an 11-point track. Each rise makes the next round harder. From Suspicion 4, about one chase in five ends the raid for everyone in a final flight.

This is exactly the Heisty "one event, one trigger" question. The book has answered it with "many triggers", and the numbers are steep. Simulated raids nonetheless land near target Win rates, because careful parties avoid watched Trouble. So treat this as a design decision, not a bug.

Options:
- (a) Fix the mob's Difficulty at the start of the chase.
- (b) Make the Monster showing in a local chase +1.
- (c) A local chase raises Suspicion at most once: by its biggest trigger, when it ends.
- (d) Leave it, and add an ST note that a chase usually costs 3–5 Suspicion.

### 3.4 The final flight (simulated)
Majority rule, Monster forced, Weakness timing as written, abilities on anyone's roll. Final-flight overdraws are not modelled.

| Level (mob, escape) | 1 Entity | 3 Entities | 4 Entities | 5 Entities |
|---|---|---|---|---|
| Easy (10, 5), no charges | 81% | 90% | 91% | 93% |
| Standard (11, 5), no charges | 60% | 70% | 71% | 75% |
| Standard, 3 charges each | 69% | 84% | 87% | 90% |
| Hard (11, 6), no charges | 56% | 67% | 68% | 72% |
| Hard, 3 charges each | 64% | 81% | 85% | 89% |

- The flight is winnable but dangerous, so hitting the Limit costs something even with loot in hand. Heisty's "losing must cost something" lesson is met.
- The jump from Easy to Standard (mob 10 to 11) is large: −20 points. Standard and Hard flights are nearly equal; Hard's extra Lead step (escape at 6) costs only about 3 points.
- Every Entity's presence gives 70–73% (party of 4, Standard), so the Always Weakness doesn't hurt Dracula or the Ghost in the flight.

### 3.5 Whole raids (simulated; furniture ignored, so no Grand Years)

| Town | Party | Win | Partial | Bust | Forked | Limit hit | Suspicion after T3 / T6 | Chases per raid | Captures per raid |
|---|---|---|---|---|---|---|---|---|---|
| Puddlecombe (Easy) | 3 / 4 / 5 | 86 / 88 / 89 | 4–6 | 6–7 | 0.4–1.2 | 15–17% | 3.7–5.4 / 6.0–6.3 | 0.4 | 0.13 |
| Thistlewick (Standard) | 3 / 4 / 5 | 73 / 76 / 80 | 8 | 8–11 | 4–8 | 25–30% | 3.5–4.9 / 7.2 | 0.5 | 0.18 |
| Gallowsmere (Hard) | 3 / 4 / 5 | 47 / 50 / 56 | 13 | 19–22 | 12–19 | 58–61% | 5.6–7.3 / 10–13 | 1.1 | 0.5 |
| Rolled Easy | 4 | 92 | 3 | 4 | 1 | 11% | 3.5 / 5.3 | 0.25 | 0.08 |
| Rolled Standard | 4 | 73 | 9 | 11 | 7 | 33% | 4.3 / 7.6 | 0.5 | 0.18 |
| Rolled Hard | 4 | 55 | 13 | 19 | 12 | 49% | 6.0 / 11.4 | 0.9 | 0.45 |

Where the Suspicion comes from (party of 4, Standard):
- rolls: about 2;
- Storyteller Costs: about 1.3;
- Tells: about 2.6;
- chases: the rest (about 1.5).

Tells alone are a fifth to a quarter of the Easy/Standard track. They are a flat tax that only the Witch can influence.

Sensitivity (Standard, Win rate):
- Storyteller avoids Suspicion Costs: 78% (Hard 55%).
- Cautious party: 75%.
- Reckless party (Monster on most rolls): **63%**, with the Limit hit in 53% of raids.

Labels match how the towns play. Rolled towns land within about 5 points of the premade towns.

**P2. Overdraw is cheap thanks to "one roll, one rise".** Confusing (balance). Pages 12, 16 and 18.
- p12: "At zero charges you can still use one by overdrawing: it costs Suspicion +2 instead of a charge."
- p16: "One roll raises Suspicion only once, by its biggest trigger (overdraw included)."
- p15: a group check rises "only once for the whole check".

The real (marginal) cost of an overdraw is 2 minus the rise the roll would have had anyway:

| Overdraw on a... | d4 | d6 | d8 | d10 | d12 |
|---|---|---|---|---|---|
| Monster roll, Difficulty 8 | +0.35 | +0.60 | +0.82 | +1.04 | +1.20 |
| Mask roll, Difficulty 8 | +1.58 | +1.72 | +1.79 | +1.83 | +1.86 |

- On the loud way, an overdraw costs +1, not +2.
- In a group check where three Entities roll the Monster on d8s, someone shows 91% of the time, so every overdraw in that check is about free. The same holds in a group local chase ("once a round").
- Overdraws are unlimited outside the flight, so low-die Monster rolls can carry an extra ability on every roll.

**Fix:** "An overdraw always adds +2 on top of the roll's rise," or "once per Turn per Entity". Both keep the 3 charges meaningful.

**P3. Twelve Turns rarely bind; Suspicion is the only clock.** Confusing (balance). Pages 14 and 27.
- The parties that left by the way out did so at a mean Turn 6.5 (Puddlecombe), 7.4 (Thistlewick) and 9.0 (Gallowsmere).
- Dawn flights happened in 0–2% of raids.

So these matter little:
- "Lose a Turn" Costs;
- Patience of Ages and Wise Woman;
- "warn when three are left" (p27);
- "there's rarely time to visit every place together" (p14).

Parties that move in pairs (like the example) are slower, but the example itself has both essentials by Turn 3 with nine Turns left.

Options:
- 9–10 Turns on Easy/Standard;
- a festival "winding down" tick (+1 Suspicion every 3 Turns from Turn 6);
- or accept it, and drop the time-pressure claims.

**P4. Hard is mostly decided by the final flight.** Confusing (balance). Pages 16, 17 and 25.
- 58–61% of Gallowsmere raids hit the Limit (55–64% across the party mixes tested).
- Only about 39% of Gallowsmere raids leave by the way out.
- Forked is 12–19%.
- The local mob caps at 12 from Suspicion 8, so nearly half of Hard's track (Suspicion 8–14) runs at maximum chase Difficulty.

If intended ("Hard means you'll probably run for it"), say so in Ch 8. If not, raise the Hard Limit to about 17, or let the local mob cap scale with the Limit (for example, at most 8 + Limit/3).

**P5. The worked example has an unusually bad start.** Minor. Page 31.
"Suspicion is 8 of 11". For that exact party in Thistlewick, the simulated median after Turn 3 is 4. Only 7% of raids are at 8 or more.

**Fix (optional):** add "That was a rough start; most parties are nearer 4 at this point," so new groups don't read 8/11 as normal.

### 3.6 Arithmetic checks (all verified correct)
- **p17:** "(Suspicion 5: 8 + 2 = 10.)" Correct.
- **p18, majority example:** a Success, a Critical, a Cost and a Trouble give 3 Successes to 1 Trouble, so Lead +2. Correct.
- **p25:** the d20 percentages 15·50·30·5 and 0·40·45·15 match the p24 ranges. The watched d10 gives 40/50/60%. The Standard essential count ("roll any die: odd, one essential; even, two") is 50/50 on any standard die.
- **p27:** "even a piece carried straight to the way out adds at least 1, and usually 2". Correct. The minimum of 1 needs the piece taken on the Turn after its obstacle, plus the way out rolled by someone already there in the carrier's arrival Turn. Taking it at once gives 2.
- **p30–31, the whole example:** every step checks out.
  - Turn 1: no Tell on rolls of 2 and 1.
  - Werewolf: 10+4 = 14 against 8.
  - Witch: Charm d8 raised to d10 by her Duty; 1+4 = 5 is Trouble, the Monster shows, one rise brings Suspicion to 2, and she is caught.
  - Chase: mob 9; round 1, 12+3; round 2, 2+9, show, Suspicion 4, mob 10; round 3, Weakness takes Sly d10 to d8, Hedge Spell raises it back, 5+7 = 12, escape, Suspicion 6.
  - Dracula: Sly d6 raised to d8 by his Duty; 7+2 = 9.
  - Creature: 5+2 = 7 is a Cost; "drop an item" would cost nothing, so the Cost is Suspicion 7.
  - Good Dog on a friend's roll: 7+4 = 11.
  - Tell, Suspicion 8; "nine to go".
- **p33:** quick-reference numbers match p25 and the chapters.

---

## 4. Entities

### 4.1 Comparison (simulated)

| Entity | d12 | Chase escape, start Suspicion 0 / 4 | Party-of-4 Win with it: Standard / Hard | Notes |
|---|---|---|---|---|
| Dracula | Charm | 69 / 31 | 75 / 51 | Mesmerise works at the way out and lock-up (always watched): Hard way out passes at 86–92%. Hypnotic Eyes is weak (E3). |
| Creature | Brawn | 60 / 25 | 77 / 50 | Lowest chase escape (d6 on both Sly/Charm rows). Strong Back does nothing in all premade towns (E3). |
| Mummy | Wits | 64 / 28 | 76 / 48 | Patience of Ages rarely matters (P3). Fear the Curse is worth +14–16 chase points. |
| Werewolf | Nimble | **86 / 57** | 78 / 52 | Night Runner is the best chase perk. Fetch cuts Hard Forked from 17% to 10%. Shortcut barely matters on Hard. |
| Invisible Man | Sly | 76 / 42 | **81** / **54** | Best overall: Sly d12 (the way out and rescue trait), Unseen, Out of Sight. |
| Ghost | Nimble | 66 / 30 | 71 / 49 | Spectral (E1). Already Dead is its best Hard perk (Win 57% vs 49%). |
| Witch | Wits | 70 / 35 | 77 / 50 | The weakest default kit (E2). Fly by Night is worth +13–19 chase points. |
| Jekyll & Hyde | Charm/Brawn | 75 / 40 | 76 / 50 | Flexible; balanced. |

The spread is fairly even: 71–81% Win on Standard, 48–54% on Hard, and 70–73% in the final flight. No Entity is a must-pick or a trap.

### 4.2 Issues

**E1. Spectral skips rolls for free and picks the way in for everyone.** Confusing (balance). Pages 7, 10 and 14.
- p10: "Group obstacles (the ones each Entity must get past for itself) don't stop you: no roll and no action, so you can still move or roll that Turn. Not while you carry loot or furniture."
- p7: "ABILITIES NEVER PASS AUTOMATICALLY ... Every one of them still needs a roll." and "Perks aren't abilities. They cost nothing, and one, the Ghost's Spectral, skips a roll."

The book flags this exception itself, but it breaks Heisty's "nothing should skip a roll for free". Every premade town has a group obstacle, often the last one before an item, that a Ghost carrying nothing passes with no roll:
- Puddlecombe: the children at the schoolhouse.
- Thistlewick: the hatter's rooftops (Difficulty 10), the hatter's only obstacle, so the top hat needs only the move.
- Gallowsmere: the rooftops into the printer, the crowded shop floor at the tailor, and the tug-of-war (**Difficulty 12, the hardest counted obstacle in town**).

In rolled towns, 44% of locations have a group way in. Because "the party picks one the first time anyone tries the location" (p14), the Ghost's free pass also locks friends into a group obstacle each must roll.

In the simulator, the "not while you carry" clause kept Spectral to about one skip per raid, and it didn't raise the Ghost's win rate. So the concern is the principle and the specific free items, not the average.

**Fix options:**
- "At a group obstacle, roll Sly or Nimble at a Difficulty 2 lower, and Trouble there never gets you caught."
- Or "once per location, never at its last obstacle".
- Either way, add to p14 that a Spectral pass doesn't choose the way in.

**E2. The Witch's default kit is the weakest.** Minor. Page 11.
- "Brawn d6 · Nimble **d4** · Sly d10 · Charm d8 · Wits d12".
- "Broomstick (default): An approach of your own, with Nimble."
- "Signature: Hedge Spell ... Your trait die one size bigger."

Problems:
- Broomstick rolls a d4 at Difficulty −2, which plays like a d8 at full Difficulty: 58% pass at the Difficulty 8 she is most likely to meet with it.
- Hedge Spell does nothing on her own best rolls (d12 Wits).
- Hedge Spell is the only signature with no italic flavour line.

**Fix:** make A Potion for That (Wits instead) the default Gift, or let Broomstick roll Wits ("the broom knows the way"). Add a flavour line to Hedge Spell.

**E3. Default Perks that rarely matter.** Minor. Pages 8 and 9.
- **Hypnotic Eyes** (Dracula, default): "the Monster shows only if it beats your trait die by 2 or more". On his d12 Charm this cuts showing from 37.5% to 30%, about 0.15 Suspicion per Monster Charm roll.
  **Fix:** "On Charm rolls the Monster never shows" (still roll-gated), or make Mist the default.
- **Strong Back** (Creature, default): "You carry a Huge piece alone." Only 2 of 6 furniture rolls are Huge, and none of the three premade towns has one, so it is a dead default in every premade town.
  **Fix:** make Tireless or Built to Last the default, or give Strong Back a second edge ("and a Bulky piece doesn't cost you the Mask").
- **Patience of Ages** (Mummy, default) and **Wise Woman** remove one Cost the Storyteller rarely picks, since time rarely binds (P3). **Keeper of Treasures** removes "drop an item", which costs one action. Only **Old Money** bites, because it blocks the Storyteller's favourite Cost (Suspicion) on Charm rolls.

**E4. The "always roll X in a chase" perks are unequal.** Minor. Pages 8 and 11.
- Wall-Crawler (Dracula, Nimble d10) adds **+2.5 to +3 points** of local-chase escape (at starting Suspicion 0 and 4). His best ground die is already about a d10.
- Fly by Night (Witch, Wits d12) adds **+13 to +19**.
- For comparison: Night Runner adds +21–26, Fear the Curse +14–16.

**Fix:** give Wall-Crawler a second edge ("...and your local chase starts at Lead 2 on the rooftops row").

**E5. Always vs Soon Weakness.** Minor; no change needed.
An Always Weakness costs Dracula and the Ghost about 6–9 points of local-chase escape. Their final-flight results are unaffected (70–71%), and the book explicitly bans their flight overdraws (p18). This is a fair trade for Dracula's and the Ghost's strengths.

**E6. Everything references rules that exist.**
These all point at real rules:
- watched obstacles;
- the Tell check;
- "Lose a Turn" and "Drop an item";
- Huge and Bulky pieces;
- carrying's Nimble step-down;
- slipping free;
- the local and final Lead;
- the way out's Difficulty;
- the loud way;
- capture.

The only wording slip is C8: the Draught counted among abilities that "can go on a friend's roll".

**E7. Trait spread vs the rescue.** Minor observation. Page 18.
Four Entities (Dracula, Creature, Mummy, Werewolf) have Sly d6, and the rescue's only quiet trait is Sly ("Sly, or Brawn the loud way"). Most rescues will therefore be loud (+1 Suspicion each try). This is fine if intended. Adding Nimble to rescue (a cell door, a high window) would match slipping free.

---

## 5. Terminology drift and typos

**T1. Difficulty words collide with town levels.** Confusing. Pages 5, 12, 22, 26 and 33.
- p12 and p33: "Difficulty: 6 easy, 8 standard, 10 hard, 12 daunting."
- p5 warns: the town's level "isn't an obstacle's Difficulty".
- p22: "setting its difficulty" (lowercase, meaning the town level).
- p26: "a smaller die before a hard roll".

**Fix:** drop the words, or use different ones ("6 simple, 8 tricky, 10 tough, 12 daunting"). Write "level" for Easy/Standard/Hard.

**T2. "Cost" means both the result band and the penalty.** Minor. Pages 12, 17, 26 and 32.
Examples: "the Storyteller picks one of these costs", "A Cost brings no Storyteller's Cost", "Choosing Costs", "Cost to come", and "a Cost here costs nothing".
**Fix:** keep "Cost" for the result, and call the penalty "a price" or "a setback".

**T3. "signature" is lowercase while Gift and Perk are capitalised.** Minor. Pages 6, 7 and 8.
Examples: p6 "A signature ability"; p7 "A signature or a Gift" (twice); p8 "Every signature and Gift". The entries use "Signature:".
**Fix:** capitalise Signature in prose.

**T4. Cost names are written inconsistently.** Minor. Pages 9, 11, 12 and 26.
- "Lose a Turn" (p12, Mummy p9) vs "lose a Turn" (Wise Woman p11).
- "Drop an item" (p12, p9) vs "drop an item" (p26).
- The Cost is named "Lose a Turn" but means "skipping your next action" (p12); the Sheet says "next action lost".

**Fix:** use one form, e.g. "Lose an action".

**T5. Articles on Entity names.** Minor. Pages 6, 7, 10, 11, 18, 30 and 31.
"a Ghost" and "a Witch" (pp. 6, 10, 11, 18) vs "the Ghost's Spectral" (p7) and "the Witch" (pp. 30–31). The pick is defensible either way, but choose one.

**T6. caught / cornered / captured / held / captive.** Minor. Page 27.
These are mostly consistent: caught is in a local chase; cornered is Lead 0; captured, held and captive mean in the lock-up. One slip on p27: "once each Turn after the one it was caught in". It should read "captured in". The two happen in the same Turn, but the wrong word blurs the states.

**Typos:** none found.
- No doubled words.
- Curly quotes are balanced (20/20).
- British spelling is consistent (colour, armour, neighbour, practising, Mesmerise).
- No missing spaces after full stops.

The only polish item is the Witch's missing signature flavour line (E2).

---

## 6. What works well

- **No opposed rolls and no NPC stat blocks.** The mob is a single Difficulty, villagers are flavour, and watched obstacles carry the stakes. This neatly removes two Heisty problems: opposed rolls vs Difficulty, and NPCs needing stats.
- **Party size doesn't inflate the threat track**:
  - one roll for the way out;
  - non-group obstacles beaten once for the party;
  - group checks rise once;
  - one Tell check per place;
  - one rise per round in a shared chase.
- **One raise per roll from any source**, with clear netting against step-downs: the Heisty bonus-dice cap, done cleanly.
- **The Limit is fully specified:**
  - the track stops;
  - extra points are lost;
  - good results never lower it;
  - local chases end with "captured first";
  - the Ghost's exception is spelled out.
- **Losing costs something at every stage:**
  - capture takes your loot for the night;
  - Left Behind drops the result a step;
  - the final flight has a real Forked chance (Standard and Hard about 70% escape with no charges).
- **Charges get spent:** "unspent ones are lost", helpers keep their action, and Criticals refund.
- **The Mask/Monster choice** is simple, visible and genuinely tense: +6–31 points of pass chance for about +1 expected Suspicion.
- **Random tables cover every step**, with reroll rules:
  - Gift and Perk;
  - Duty, with clash handling;
  - items (no duplicates);
  - places;
  - the second way in's quiet trait;
  - the 12-ceiling;
  - the furniture;
  - the custom;
  - villagers.

  The obstacle table spreads quiet traits evenly (4 each) and has one group obstacle per trait.
- **The chase table** guarantees a non-Nimble trait on every row, which protects the d4-Nimble Mummy and Witch. Chase strength is even across Entities.
- **Ready-made towns** match their maps room by room. They have two ways in everywhere, every obstacle's trait and Difficulty, and a non-athletic way out (Sly). Their levels play as labelled: Easy about 88%, Standard about 76%, Hard about 50%.
- **The worked example is arithmetically perfect** and teaches about ten rules in a page.
- **Clear definitions up front:** place, item, loot, piece. "The Storyteller never picks a cost that costs nothing right then" is clean as well.
- **The designer's note on the Storyteller's role** (p26) sets the right table tone.

---

## Appendix A: Heisty lessons checklist

| Lesson | Don't Get Forked v0.1 |
|---|---|
| Simulate the core dice before writing | Done here. The difficulty curve lands near the targets: Easy about 88%, Standard about 76%, Hard about 50% (target 55–60). |
| Cap bonus dice | Yes: one raise per roll, any source. |
| No common good result undoes the threat | Yes: "Good results never lower it." |
| Nothing skips a roll for free | **No: Spectral (E1).** |
| Losing costs something even at the end | Yes: capture loses loot; the flight risks Forked. Left Behind floors at Bust (U11). |
| Resources get spent | Yes, 52–100%. But overdraw is near-free in places (P2). |
| "Scene" defined | Not used; Turn and round are clear. |
| Opposed rolls vs Difficulty | No opposed rolls; mob modifiers are Difficulty changes. |
| Group checks | Defined: one rise, everyone with Trouble caught together. |
| At the threat limit | Fully defined (p16). |
| NPC stats | Not needed by design. |
| Carrying loot | Defined: Bulky/Huge, small entrances, unlimited loot. Gaps: two carriers (U9), "small" undefined (U4). |
| Per-character vs per-group limits | Clear: charges and overdraw per Entity; Tells per place. |
| One event, one trigger | Clear per roll. **But one Trouble starts a chase worth about +4 more (P1).** |
| Maps with two entries; a non-athletic escape | Yes (two ways in everywhere; the way out allows Sly). |
| Labels match play | Yes. Gallowsmere is slightly harder than an average rolled Hard town. |
| Scenario text matches the map | Verified for all three towns. |
| Random tables cover every step, with rerolls | Yes. |
| Starting resources don't swing by species | Yes: 3 charges each. |

## Appendix B: Simulation method and caveats

Scripts are in `rr-sim/`:
- `odds.mjs`: exact odds.
- `core.mjs`: rules, chases, flight.
- `towns.mjs`: the three towns and the Ch 8 generator.
- `raid.mjs`: whole raids.
- `run.mjs`: drivers, run as `chase`, `flight`, `raid` or `variants`.
- `chase2.mjs`, `weak.mjs`, `extra.mjs`, `misc.mjs`, `s3.mjs`: the specific experiments.

Outputs are in `raid-out.txt`, `variants-out.txt` and `chase-out.txt`. Raids were run 3,000–8,000 times per row and chases 20,000–40,000 times.

What is modelled, as written:
- all four ability kinds, from the roller or helpers at the same place;
- the Draught and form changes;
- Duty raises and the one-raise cap;
- Cost results, with the Storyteller picking Suspicion unless it costs nothing (a variant picks other Costs);
- the loud way;
- group checks with one rise;
- Tell checks, including Familiar's Warning;
- local chases (Weakness timing, mob recomputed each round, the Limit ending a chase, "captured first");
- capture losing loot, slipping free and rescue;
- the way out (one try per Turn, Shortcut, Fetch);
- the final flight (majority rule, abilities on anyone's roll);
- Left Behind and the results table;
- every default Perk, plus the alternative Perks tested in §4.

The policy is a heuristic:
- Entities split up and take the location they're best at, essentials first.
- They choose the trait, second die and abilities by pass chance minus a Suspicion weight that grows toward the Limit, minus capture risk.
- They head to the way out when nothing is left, time is short, or Suspicion is within 2 of the Limit.

Not modelled:
- furniture (so no Grand Years);
- overdraws (not used outside or inside the flight);
- handing loot to re-enable Spectral;
- deliberate Limit triggering.

A smarter table will do somewhat better, and a looser table worse (the reckless variant: Standard 63%). Treat the numbers as ±5 points.
