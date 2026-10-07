# Text-clarity audit, part B: Chapters 6, 7 and 8 (2026-10-07)

Chapters 6 (`book/src/chapters/16-ch06.html`), 7 (`17-ch07.html`) and 8 (`31-ch08.html`) were read as text, the way a first-time player or Storyteller would read them after Chapters 1–5. The question was the one Richard raised about Chapter 2's powers: can the reader tell what it costs, exactly what to do at the table, when it doesn't work, which words are rules and which are flavour? Nothing in the book was changed. Every rewrite below is meant to keep the rules as they are. Where the meaning was unclear, it was checked against `docs/CORE-RULES.md`, `module/logic/` and `sim/engine.mjs`. Where the only clear fix would add or change a rule, the finding is marked **needs Richard**.

Severity: **high** = the reader can't act on the passage; **medium** = it needs a second reading or a look elsewhere; **low** = polish.

## Summary

Each finding is counted once, under its main class. Most findings also touch a second class, listed with the finding.

| Class | High | Medium | Low | Total |
|---|---|---|---|---|
| 1. Term used before it's explained | – | 1 | 1 | 2 |
| 2. Effect named, not explained | 1 | 1 | 1 | 3 |
| 3. Missing who / when / how often / cost / duration / failure | 1 | 4 | 3 | 8 |
| 4. Several options or cases run together | – | 4 | 2 | 6 |
| 5. Flavour mixed into rules | – | – | 2 | 2 |
| 6. Overloaded sentence | – | 6 | 2 | 8 |
| 7. Inconsistent terms | – | 3 | 2 | 5 |
| 8. Numbers or conditions only stated elsewhere | – | 1 | 2 | 3 |
| Ch. 8: steps in no stated order / unclear dice / terse table | 1 | 1 | – | 2 |
| **Total** | **3** | **21** | **15** | **39** |

By chapter: Chapter 6, 15 findings (1 high); Chapter 7, 5 (none high); Chapter 8, 19 (2 high).

**High:**
- **C6-2.** No step-by-step chase round. "Round" is never defined, and what you roll (the ground's trait; the Mask or the Monster) is spread over five sections. The Mask being off in the final flight comes only after the flight's own rules.
- **C8-1.** "A map" is named as one of the three ways to build a town, but nothing says how to make one.
- **C8-3.** Building a rolled town has no overall order. Step 1 needs the shopping list, the difficulty and the furniture's location, and all three come in later sections. The lock-up and the way out are never mentioned.

**Needs Richard (all small):**
- C6-10: may a captive spend charges on another captive's roll?
- C7-5: may one Entity take several castle upgrades? Is a forked or left-behind Entity back next raid?
- C8-1: what "a map" means as a way to build a town.
- C8-9: optional: a separate name for Easy / Standard / Hard.
- C8-10 and C8-13: should hand-built towns aim for the rolled Difficulty mix?
- C8-19: the "at least 2 Suspicion" in Pacing looks like it can be 1 (worked case given).

**Fitting Chapter 6.** All of Chapter 6's rewrites together add about 20 lines, which is more than the room on its pages. Suggested priority: C6-2 (the round), C6-8 (local chase list), C6-11 (rescue / slipping free), C6-15 (the overdraw sentence), then C6-14. C6-2's block makes parts of C6-3, C6-4, C6-5, C6-6 and C6-13 unnecessary (noted in each), so doing C6-2 first saves room.

---

## Chapter 6: Chases and Getting Forked

### C6-1 · Opener
**Class** 5 (flavour mixed into rules), also 7 · **Severity** low

> "There are two kinds of chase. Get caught during the raid and you run from a crowd; botch the whole job and the entire town turns out with pitchforks."

**Problem.** The sentence announces two kinds of chase but doesn't name them ("local chase" and "final flight", the terms the rest of the chapter uses). "Botch the whole job" suggests the final flight happens only after failure. In fact it also comes at dawn, even when the job went well, for anyone still in town (Chapter 4).

**Rewrite.**
> There are two kinds of chase. Caught during the raid, you run from a crowd: a **local chase**. When Suspicion reaches the Limit, or dawn comes with anyone still in town, the whole town turns out with pitchforks: the **final flight**.

**Length.** +1 line.

### C6-2 · The Lead and The Ground: no chase round
**Class** 3 (missing who / when / how), also 1 and 8 · **Severity** high

> "Every chase uses a Lead track. Each round you roll against the mob’s Difficulty:"
> "Each round, roll a d6 on the chase table at the end of this chapter. The result says which traits work this round for everyone in the chase, and always includes one that isn’t Nimble."

**Problem.** "Round" is never defined, and the chapter never lays out a round in order. A reader at "Each round you roll" can't yet tell:
- which trait to roll. The ground sets it, but that is the next section, and nothing says each Entity picks one of the two traits.
- which second die to use. The Mask is allowed in a local chase (The Local Chase), is off in the final flight (Once the Hunt Is On, the last rules section, after the flight's own rules), and is never allowed for carriers (Chapter 4).
- who rolls the ground. Only Chapter 8's advice says the Storyteller "reads" it.
- which abilities work in a chase. Opening an approach never does (Chapter 3), and Castle Duty doesn't either (Chapter 2).
- when the Lead moves when several flee together.

This is the chapter's core procedure, and putting it together means reading five sections.

**Rewrite.** Replace the first sentence of The Lead and the whole of The Ground with the block below. It also covers C6-3 to C6-6. The chase table stays at the end.

> **The Lead.** A chase is played in **rounds**, on a **Lead** track. The Lead starts low; you try to raise it to the escape number before the mob brings it to 0. The starting Lead, the escape number and the mob's Difficulty depend on the kind of chase (below).
>
> **Each round:**
> 1. **The ground.** The Storyteller rolls a d6 on the chase table (end of this chapter). The row names two traits that work this round, for everyone in the chase.
> 2. **Choose.** Each Entity in the chase picks one of those two traits, and its second die. In a local chase that is the Mask or the Monster (no Mask while carrying furniture). In the final flight it is the Monster only.
> 3. **Abilities.** Spend them before rolling, as in Chapter 3. An ability that changes the trait rolls its trait instead of the ground's. Opening an approach never works in a chase, and Castle Duty gives no raise.
> 4. **Roll** against the mob's Difficulty.
> 5. **Move the Lead.** Fleeing alone, your result moves it: Success +1 (a Critical +2), Cost no change, Trouble −1. Fleeing with others, it moves once for the round, by the majority rule (below).
>
> Reach the escape number and you're clear. Reach 0 and you're cornered: captured in a local chase, forked in the final flight.

**Length.** About +6 lines over the current The Lead and The Ground. Some of it can come back: "You may use the Mask." in The Local Chase becomes redundant, and so does the Mask half of Once the Hunt Is On.

### C6-3 · The Lead: the results list reads as if it applied to everyone
**Class** 7 (one rule shown two ways), also 4 · **Severity** medium

> "Success: Lead +1 (a Critical: +2). / Cost: no change. / Trouble: Lead −1."

**Problem.** The list is written for one runner, but nothing in the section says so. A group in the final flight could reasonably move the Lead once per roll: three Successes = +3. The majority rule that replaces it is two sections later. A Critical is also described two ways: "+2" here, "counts as two Successes" in the majority rule box and in Chapter 3.

**Rewrite.** Covered by step 5 of C6-2. If C6-2 isn't adopted, put **"Fleeing alone:"** before the list and add after it: "Fleeing with others, the Lead moves once a round, by the majority rule (below)."

**Length.** +1 line (0 with C6-2).

### C6-4 · The Lead: the escape number and "cornered" lead nowhere yet
**Class** 8 (numbers stated elsewhere), also 1 · **Severity** low

> "Reach the escape number and you are clear. Reach 0 and you are cornered."

**Problem.** At this point the reader doesn't know the escape number or what being cornered does. Both depend on the kind of chase and come later, with no pointer.

**Rewrite.** "Reach the escape number (4 in a local chase; 5 in the final flight, 6 on Hard) and you're clear. Reach 0 and you're cornered: captured in a local chase, forked in the final flight." (C6-2's block does this with "below".)

**Length.** +½ line.

### C6-5 · The Lead: what a chase roll does to Suspicion
**Class** 6 (overloaded), also 8 · **Severity** medium

> "In a chase the roll moves the Lead: a Cost costs nothing more, and Trouble doesn’t start another chase. In a local chase, Trouble and the Monster showing still raise Suspicion (one roll, one rise); when several flee together, it rises once a round, by the biggest trigger."

**Problem.** These are four rules in two sentences, and two of them are about only one kind of chase:
- "A Cost costs nothing more" means the Storyteller picks no Cost. A first reader may not see that.
- Listing two triggers suggests those are the only two. An overdraw in a local chase still costs Suspicion +2 (Chapter 3; the logic agrees).
- What happens to Suspicion in the final flight (it has stopped) is only in Once the Hunt Is On.
- Nothing links rising Suspicion to the local mob's Difficulty, which goes up with it.

**Rewrite.**
> **A chase roll only moves the Lead.** A Cost brings no Storyteller's Cost, and Trouble starts no new chase.
> **Suspicion in a chase.** In a local chase it still rises as usual: Trouble +1, the Monster showing +2, an overdraw +2, once per roll, by its biggest trigger. When several flee together, it rises once a round, by the biggest trigger among all their rolls. As it rises, the local mob gets harder (below). In the final flight Suspicion has stopped (Once the Hunt Is On).

**Length.** +2 lines.

### C6-6 · The Ground: a design note written as a rule
**Class** 5 (non-rule words mixed into rules) · **Severity** low

> "…and always includes one that isn’t Nimble."

**Problem.** This reads like an instruction, but there is nothing to do with it. It describes the table, which is fixed. A reader looks for the rule it implies (should I reroll a Nimble-only row?).

**Rewrite.** Delete the clause (the table shows it), or move it below the chase table as a note: "*Every row offers a trait other than Nimble.*"

**Length.** −½ line.

### C6-7 · Your Weakness: a rule listed as if it were a third timing
**Class** 4 (cases run together), also 8 · **Severity** low

> "Always: from the first round of any chase (Dracula, a Ghost). / Soon: from the third round of any chase (everyone else). / The final flight is a new chase, even for those who join it from a local one."

**Problem.** The list introduces the two timings, but its third bullet is a different kind of item: a rule about counting rounds. The section also doesn't mention that an overdraw in the final flight brings a Weakness in early (two sections later).

**Rewrite.** Keep the two bullets, then:
> Count rounds from 1 in each chase. The final flight is a new chase, even for an Entity who joins it from a local chase. In the final flight, an overdraw can bring your Weakness in sooner (Once the Hunt Is On).

**Length.** +½ line.

### C6-8 · The Local Chase: seven rules in one paragraph
**Class** 4 (cases run together), also 6, 3 and 8 · **Severity** medium

> "When you are caught during the raid, you run, and you can’t drop or hand over anything until the chase ends. Your Lead starts at 1 and you escape at 4. The mob’s Difficulty is 8 plus half the Suspicion (round down), at most 12, checked each round. You may use the Mask. In a local chase, abilities help only your own roll. The chase happens within the Turn it started; escape and you’re back where you were caught, with your Turn used up. Entities caught together in one group check flee together on one shared Lead, which moves by the majority rule below, and are captured together if cornered."

**Problem.** This is the section a Storyteller looks up mid-game, and it is a single block.
- "Checked each round" doesn't say what to do: work the number out again at the start of every round, because the chase itself can raise Suspicion.
- "Abilities help only your own roll" leaves open whether a friend outside the chase, or a fellow runner, may still spend a charge on your roll. The rule (and the Witch's Hedge Spell entry) says no.
- "Happens within the Turn it started" doesn't say plainly that the chase takes no extra Turns, however many rounds it runs.
- What happens if Suspicion reaches the Limit mid-chase is only in Chapter 5. A local chase raises Suspicion, so this comes up at the table.

**Rewrite.**
> When you're caught (Trouble at a watched obstacle, Chapter 5), you run:
> - **Lead:** starts at 1. You escape at 4.
> - **The mob's Difficulty:** 8 plus half the Suspicion, rounded down, at most 12. Work it out again at the start of every round: the chase can raise Suspicion. (Suspicion 5: 8 + 2 = 10.)
> - **Dice:** the Mask or the Monster.
> - **Abilities:** on your own roll only. Nobody else can spend a charge on your roll in a local chase, not even a fellow runner.
> - **What you carry:** you can't drop or hand over anything until the chase ends.
> - **Time:** the whole chase, however many rounds it takes, happens inside the Turn it started. Escape, and you're back where you were caught, with that Turn used up.
> - **Caught together:** Entities caught in the same group check flee together on one shared Lead, moved by the majority rule (below), and are captured together if cornered.
> - **The Limit:** if Suspicion reaches the Limit during the chase, the chase ends at once and the runners join the final flight. Anyone cornered that same round is captured first (Chapter 5).

**Length.** +4 lines. The Limit bullet is optional if space is short (it's in Chapter 5), and the Dice bullet can go if C6-2 is adopted.

### C6-9 · Captured: the lock-up is used as a place but never introduced as one
**Class** 1 (term before it's explained) · **Severity** medium

> "You are held at the town’s lock-up…" / "Getting there is a move."

**Problem.** Chapter 4 lists the parts of a town (obstacles, locations, the way out) and Chapter 8 says how to build one, but neither mentions a lock-up. The reader learns it is a place only from "Getting there is a move" and from Chapter 5's Tell rule. A Storyteller who rolled a town has no lock-up on the table and no idea how far away it is. Chapter 9's maps show one, so the answer exists. Reading the rules together, the lock-up is a place of its own, one move from anywhere unless the map says otherwise ("any move takes one Turn unless the map says otherwise", Chapter 4), and always watched.

**Rewrite.**
> You are held at the town's **lock-up**: a place of its own, like a location, one move from anywhere unless the map says otherwise, and always watched.

Also add it to the town's parts in Chapter 8. See C8-3. Optionally add it to Chapter 4's town list too.

**Length.** +½ line.

### C6-10 · Captured: two rules in one parenthesis
**Class** 6 (overloaded), also 3 · **Severity** low · part **needs Richard**

> "You are held at the town’s lock-up (you can’t pick up or be handed anything, but you can still spend charges, on your own roll or a rescuer’s)."

**Problem.** Two rules sit inside one parenthesis. The list "your own roll or a rescuer's" also reads as complete, which leaves one case open: may a captive spend a charge on another captive's slip-free roll? Chapter 3 says an ability can help "any Entity's roll at the same place (… the lock-up)", which suggests yes. This sentence suggests no.

**Rewrite.**
> While held, you can't pick up or be handed anything. You can still spend charges: on your own roll, or on [**needs Richard:** "anyone's roll at the lock-up, a rescuer's or another captive's" / "your own roll or a rescuer's, not another captive's"].

**Length.** +½ line.

### C6-11 · Captured: rescue and slipping free run together
**Class** 4 (cases run together), also 6 and 7 · **Severity** medium

> "Rescue: the lock-up is an obstacle — Sly, or Brawn the loud way, always watched — at the lock-up Difficulty (10), with a new rescue obstacle for each capture. Getting there is a move. Beat it (a Success or a Cost) and every captive there is free, at the lock-up, and acts again next Turn; a rescuer’s Trouble gets them caught as usual."
> "Slipping free: once per Turn, from the Turn after its capture, a captive may try to slip free: Sly or Nimble, or Brawn the loud way, at the lock-up Difficulty (it’s always watched). Only a Success frees you; a Cost does nothing, and on Trouble Suspicion rises but no chase starts. A freed Entity starts at the lock-up and acts again next Turn."

**Problem.** These are two procedures with nearly the same settings, written as prose, and they differ in four places that matter: the traits (Nimble only for slipping free), what a Cost does, what Trouble does, and who may roll when.
- "With a new rescue obstacle for each capture" needs a second reading. It means a rescue frees only the captives held at that moment, and anyone captured later needs a new rescue (`sim/engine.mjs`: "a later capture needs a new rescue").
- "(it's always watched)" next to "no chase starts" puzzles the reader: why does watched matter here? (For Dracula's Mesmerise, Chapter 2.)
- The text switches from "a captive … its capture" to "frees you".

**Rewrite.** Turn the two bullets into a small table:

> | | **Rescue** | **Slipping free** |
> |---|---|---|
> | Who rolls | Anyone who isn't held, at the lock-up (getting there is a move) | The captive, once per Turn, from the Turn after its capture |
> | Traits | Sly, or Brawn the loud way | Sly or Nimble, or Brawn the loud way |
> | Difficulty | The lock-up's: 10 | The lock-up's: 10 |
> | Success | Every captive there is free | You're free |
> | Cost | Every captive there is free (the Storyteller picks a Cost as usual) | Nothing happens |
> | Trouble | Suspicion +1, and the rescuer is caught: a local chase | Suspicion +1, but no chase |
> | Then | The freed act again next Turn, from the lock-up | You act again next Turn, from the lock-up |
>
> The lock-up is always watched, so abilities that need a watched obstacle (Dracula's Mesmerise) work on both. A rescue frees only the captives held at that moment: anyone captured later needs a new rescue.

**Length.** About +3 lines (the table replaces two 4-line bullets).

### C6-12 · Left behind: two ways to leave town, said in only one place
**Class** 3 (missing when), also 8 · **Severity** low

> "Left behind: anyone still held when the party leaves town is left behind (Chapter 7)."
> "Escape and you are home with the goods. Get cornered and the party is forked: the monsters in the flight are killed (a captive is left behind) and the raid is lost."

**Problem.** The party leaves town either by the way out or by escaping the final flight. The Escape line says nothing about captives, so the only mention of a captive in the flight comes in the *forked* parenthesis. A reader may think that escaping the flight frees the captives too. Also, "the raid is lost" doesn't point to the result it gives (Forked, Chapter 7).

**Rewrite.**
> **Left behind:** anyone still held when the others leave town, by the way out or by escaping the final flight, is left behind (Chapter 7).
> **Escape**, and everyone in the flight is home with what they carry. Anyone still in the lock-up is left behind. **Cornered**, and the party is **forked**: the monsters in the flight are killed, and the year's result is Forked (Chapter 7).

**Length.** +½ line.

### C6-13 · The Final Flight: one paragraph, and the Mask rule comes after it
**Class** 8 (conditions stated elsewhere), also 1, 4 and 7 · **Severity** medium

> "At the Limit, or at dawn, every Entity who isn’t captured flees together; anything dropped in the flight is left in town. The Lead starts at 2 and the party escapes at 5 (at 6 on Hard). The mob’s Difficulty is set by the town’s difficulty (10 on Easy, 11 on Standard and Hard) and doesn’t change with the size of the party. Everyone flees together, so abilities can help anyone's roll."

**Problem.**
- The most important difference from a local chase, that there is no Mask, is two blocks further down, under a heading the reader doesn't connect with the flight ("Once the Hunt Is On").
- "The mob’s Difficulty is set by the town’s difficulty" uses one word for two things in the same sentence (see C8-9).
- Five settings are packed into one paragraph, where the local chase has (or will have, C6-8) a list. The two chase sections should read the same way.

**Rewrite.**
> At the Limit, or at dawn with anyone still in town, every Entity who isn't captured flees together, wherever they are.
> - **Lead:** starts at 2. The party escapes at 5 (6 on Hard).
> - **The mob's Difficulty:** 10 on Easy, 11 on Standard and Hard, however many flee.
> - **Dice:** the Mask is off. Everyone rolls the Monster die (Once the Hunt Is On).
> - **Abilities:** on anyone's roll. You all flee together.
> - **The Lead** moves by the majority rule (below).
> - **What you carry:** anything dropped in the flight is left in town.

**Length.** +2 lines (+1 with C6-2, which already covers the dice).

### C6-14 · The Majority Rule box
**Class** 6 (overloaded), also 3 and 7 · **Severity** medium

> "Everyone rolls each round, in any order the party likes. If Successes outnumber Trouble, the Lead rises by 1, or by 2 if they outnumber it by two or more; if Trouble outnumbers Successes, it falls the same way; otherwise it stays. A Critical counts as two Successes."

**Problem.**
- "It falls the same way" makes the reader build the falling half from the rising half.
- Costs aren't mentioned. They count for neither side, but a first reader may wonder whether a Cost cancels a Success.
- The Critical rule comes last, after the counting it changes.
- "Everyone" means everyone in this chase, but the box sits in the Final Flight section and is also used by shared local chases (C6-8).

**Rewrite.**
> **The Majority Rule.** Whenever several Entities share a chase (the final flight, or a local chase begun by one group check), everyone in it rolls each round, in any order the party likes. Then count the Successes (a Critical counts as two) and the Trouble. Costs count for neither.
> - Successes ahead by 1: Lead +1. Ahead by 2 or more: Lead +2.
> - Trouble ahead by 1: Lead −1. Ahead by 2 or more: Lead −2.
> - Level: the Lead stays.
>
> *Example: a Success, a Critical, a Cost and a Trouble make 3 Successes to 1 Trouble: Lead +2.*

**Length.** +2 lines (+1 without the example).

### C6-15 · Once the Hunt Is On: the overdraw sentence
**Class** 6 (overloaded), also 3 · **Severity** medium

> "You may still overdraw, once per flight, but your Weakness is then in play from your own next roll (even later the same round) to the end of the flight, and while your Weakness is in play, however it came, you can’t overdraw."

**Problem.** One sentence holds five rules: overdraw is allowed; only once per flight; it costs your Weakness, not Suspicion; from when to when; and no overdraw while your Weakness is in play.
- "(Even later the same round)" only makes sense once you realise you can overdraw to help someone who rolls before you.
- "However it came" reads as if it applied everywhere. The logic applies it only in the final flight. In a local chase, overdraw still costs Suspicion +2, whether or not your Weakness is in play.
- The sentence never says the plain result: Dracula and a Ghost, whose Weakness is in play from round 1, can't overdraw in the flight at all.

**Rewrite.**
> From the moment the final flight begins (the hunt):
> - Suspicion stops. Nothing raises it any more.
> - The Mask is off. Everyone rolls the Monster die.
> - **Overdraw** (Chapter 3) costs your Weakness instead of Suspicion: from your own next roll to the end of the flight, your trait die is one size smaller. If you overdraw on the roll of someone who rolls before you in a round, your own roll that round already takes it.
> - You can overdraw only once per flight, and not at all while your Weakness is in play, however it came. (An Always Weakness is in play from round 1, so Dracula and a Ghost can't overdraw in the flight.)
>
> In a local chase none of this applies: overdraw costs Suspicion +2 as usual.

**Length.** +2 lines (+1 if the Mask line moves into C6-2).

---

## Chapter 7: How the Year Went

### C7-1 · The results table
**Class** 3 (missing how), also 6 and 8 · **Severity** medium

> "Grand Year — A Win, plus at least one piece of furniture or decor"
> "Win — Every essential, and at most one extra missing"
> "Partial — Less than a Win, with at least half the list home (missing an essential is at best a Partial)"
> "Bust — Less than half the list home"

**Problem.**
- "At least half the list" doesn't settle a five-item list (Standard and Hard). Is 2 of 5 "half"? Many readers round 2.5 down. The logic (`yearResult`: home × 2 ≥ list size) needs 3 of 5 and 2 of 4.
- Win mixes "every essential [home]" with "one extra missing" in the same line.
- Partial has a second rule in parentheses.
- "At least one piece" suggests a raid may have several pieces. Chapter 4 places exactly one.

**Rewrite.**
> | Result | When |
> |---|---|
> | **Grand Year** | A Win, and the piece of furniture or decor came home too |
> | **Win** | Every essential home, and no more than one extra missing |
> | **Partial** | Not a Win, but at least half the list home: 2 of 4 items, 3 of 5. A missing essential makes it a Partial at best |
> | **Bust** | Less than half the list home: 0–1 of 4, 0–2 of 5 |
> | **Forked** | Cornered in the final flight: the raid is lost, whatever came home |

**Length.** +1 line.

### C7-2 · What counts as "home"
**Class** 3 (missing what) · **Severity** low

> "When the party is out of town — or the mob has the last word — look at what came home."

**Problem.** "Home" is used throughout the table but never defined. Do items dropped at the way out count? A captive's loot? The logic counts an item as home when an Entity who got out of town carries it.

**Rewrite.** Add after the opener: "An item, or the piece, is **home** if an Entity who got out of town, by the way out or by escaping the final flight, carries it."

**Length.** +1 line.

### C7-3 · Left Behind: the order, and more than one left behind
**Class** 3 (missing how often) · **Severity** low

> "Each Entity left behind in the lock-up drops the result one step: a Grand Year becomes a Win, a Win a Partial, a Partial a Bust. Bust is as low as it goes, short of being forked."

**Problem.** The meaning is clear once you think about it, but it doesn't say to work out the result first, and it gives no example with two left behind. "Short of being forked" reads as if being left behind could lead to Forked.

**Rewrite.**
> Work out the result first. Then drop it one step for each Entity left behind in the lock-up: a Grand Year becomes a Win, a Win a Partial, a Partial a Bust. Two left behind drop it two steps. It never drops below Bust.

**Length.** ±0.

### C7-4 · The Epilogue: which lines to read
**Class** 6 (overloaded) · **Severity** medium

> "Read the line for the result, then (except after Forked) one line for each kind with an item on the list that didn’t come home."

**Problem.** "Each kind with an item on the list that didn’t come home" needs parsing. It doesn't say that a kind with two missing items gets only one line (the logic reads one line per kind), or which table each line comes from.

**Rewrite.**
> Read the result's line from the first table below. Then, unless the result is Forked, read a line from the second table for each kind of item that didn't come home: once per kind, however many items of that kind are missing.

**Length.** +½ line.

### C7-5 · Optional: Campaign Play
**Class** 3 (missing who / when), also 6 · **Severity** medium · **needs Richard** (two points)

> "For groups who play several raids: each piece of furniture or decor brought home becomes a castle upgrade. In every later raid, each upgrade gives one Entity of the players’ choice one extra charge (part of its starting number that raid). The castle holds three upgrades at most; bringing home a fourth replaces one of them. Nothing negative carries over, and the Entities themselves don’t change."

**Problem.**
- It doesn't say **when** the players choose: once, or at the start of each raid. The online version asks at each new raid.
- It doesn't say whether **one Entity may take several** upgrades (up to 6 charges). The online version (`assignExtraCharges`) allows it. The book neither allows nor forbids it, and it affects balance.
- "(Part of its starting number that raid)" doesn't say why it matters: a Critical refills charges "up to your starting number" (Chapter 3), so the cap becomes 4.
- "Replaces one of them" doesn't say who chooses. All upgrades work the same way, so the choice only changes the story.
- "Nothing negative carries over" doesn't say directly that a forked or left-behind Entity is back next raid. The online version resets them.
- It isn't clear whether a piece brought home in a Partial or Bust raid counts. As written it does. In Forked, nothing comes home.

**Rewrite.**
> For groups who play several raids with the same castle:
> - Each piece of furniture or decor brought home, whatever the year's result, becomes a **castle upgrade**.
> - At the start of each later raid, the players give each upgrade to one Entity in the party. That Entity has **one extra charge** that raid: it starts with 4, and a Critical can refill it up to 4 (Chapter 3). [**Needs Richard:** "One Entity may take more than one upgrade" (what the online version allows) or "No Entity takes more than one".]
> - The castle holds **three upgrades** at most. A fourth piece replaces one of them; the players choose which (all upgrades work the same).
> - Nothing else carries over. [**Needs Richard, confirm:** "An Entity forked or left behind is back at the castle for the next raid."] The Entities themselves never change.

**Length.** +3 lines (Chapter 7 has room).

---

## Chapter 8: Building a Town

### C8-1 · Three Ways: "a map" has no procedure
**Class** 2 (named, not explained), also 3 · **Severity** high · **needs Richard**

> "A map: a set of locations the party picks its route through."

**Problem.** This is one of three ways to build a town, and the only one with no instructions. A Storyteller can't act on it.
- What is drawn, and where do the obstacles come from: the tables, or invented?
- Chapter 4's rules depend on "the map" in two places ("any move takes one Turn unless the map says otherwise"; "an entrance a map marks small"), but nothing says when a move may take longer, or which entrances may be small.
- Chapter 9's premade towns also come "with its map", so readers can't tell how "a map" differs from "a premade raid".

The Decisions log (2026-10-04, "Three ways to build a raid") only says "a map of locations as an alternative".

**Options for Richard.**
1. **Make it "your own town"** (recommended): "Draw your own town: choose its locations and build each one as in the Obstacles box below (or roll any part of it). Your map may make some moves take two Turns and mark some ways in small." This adds guidance, so Richard decides. It uses the Obstacles box (C8-13), which is already a by-hand procedure without a label.
2. **Merge it into premade raids**: "A premade raid with its map (Chapter 9)". Then there are two ways, plus building by hand with the Obstacles box. The smallest change, but the "three ways" in Chapter 1 and the Decisions log change.
3. **Keep the line and point it at the box**: "A map: draw the locations and build each with the Obstacles box below." This doesn't settle what a map may say about moves or small entrances.

**Length.** +1 line (option 1 or 3); −1 line (option 2).

### C8-2 · Three Ways: names for the same thing, and "ceiling" before it's explained
**Class** 1 (term before explained), also 7 · **Severity** low

> "A premade raid: a fixed set of locations and obstacles, ready to run." / "A ceiling on the hardest obstacles keeps a rolled town playing at the difficulty it promises." / (Running the Villagers) "one of a ready-made town’s villagers"

**Problem.** Chapter 1 says "a premade one", Chapter 9 is "Three Towns", and this chapter says both "premade raid" and "ready-made town" for the same thing. "Ceiling" is a term defined two sections later, with no pointer.

**Rewrite.** Use "premade town" everywhere (Chapter 8's line and the Running paragraph). End the random-tables line with "…the difficulty it promises (the ceiling: Rolling a Town, step 4)."

**Length.** ±0.

### C8-3 · Rolling a Town: no overall order, and the lock-up and way out are missing
**Class** Ch. 8 procedure order, also 1 and 8 · **Severity** high

> "Locations: one for each item on the list, at one of the places its kind is found…" (step 1), with Difficulty, The Shopping List and The Furniture coming later in the chapter.

**Problem.** Read in page order, the procedure can't be followed.
- Step 1 needs the shopping list, which is rolled two sections later (The Shopping List).
- The d20 rows need Easy, Standard or Hard, which is chosen a section later (Difficulty).
- Step 3 needs to know which location holds the furniture, which is decided in The Furniture, near the end.
- The list should be rolled before the players pick (Chapter 2: "hear it before you pick"), and this chapter doesn't say so.
- The lock-up (see C6-9) and the way out appear nowhere in the building procedure. The opener's "same parts" leaves out the lock-up.

**Rewrite.** Put an overview at the top of Rolling a Town (and ideally move the sections into this order too):
> Build a rolled town in this order:
> 1. **Choose Easy, Standard or Hard** (the table under Difficulty).
> 2. **Roll the shopping list** (The Shopping List). Do it before the players make their picks: they hear the list first (Chapter 2).
> 3. **Roll the furniture** and the location it stands at (The Furniture).
> 4. **Place the locations and roll their obstacles** (the four steps below).
> 5. **Roll the Lantern Night custom** (above).
>
> Every town also has **the way out** (Sly or Nimble, or Brawn the loud way; Chapter 4) and **the lock-up** (Chapter 6). Both are the same in every town. Only their Difficulties come from the table under Difficulty. Each is a place of its own, one move from any location. Roll villagers when you need them (The Villagers).

**Length.** +6 lines. If the sections are moved into build order (Difficulty → Shopping List → Furniture → Rolling a Town → Obstacle Table → Lantern Night → Villagers), the overview can shrink to 2 lines. Check the layout after moving them.

### C8-4 · Rolling a Town, step 1 (Locations)
**Class** 4 (cases run together), also 3 and the Ch. 8 die rule · **Severity** medium

> "Locations: one for each item on the list, at one of the places its kind is found (the shopping table below lists them): a d3 or pick, one item per place; if a kind has more items than places, two may share a place (one location, guarding both)."

**Problem.** Three rules are joined by a colon, two semicolons and two parentheses.
- It doesn't say which d3 face is which place: the order they are listed under the kind.
- It doesn't say what to do when the d3 lands on a place another item already holds.

**Rewrite.**
> 1. **Locations.** Each item on the list gets a location at one of the three places its kind is found (listed under its kind in the shopping table below).
>    - Roll a d3, or pick: 1 is the first place listed, 2 the second, 3 the third.
>    - One item per place. If the place is taken, roll again or pick another.
>    - If a kind has more items than places, two of them share a place: one location, guarding both items.

**Length.** +2 lines.

### C8-5 · Rolling a Town, steps 2 and 3 (Obstacles)
**Class** 6 (overloaded), also 4 and 8 · **Severity** medium

> "Obstacles: roll a d20 for how many each location has."
> "Each obstacle (both versions of the first, its two ways in, and the furniture’s extra one, 2 harder): the obstacle table for what it is, a d20 for its Difficulty, a d10 for whether it’s watched. For the second way in, roll the obstacle table again until its quiet way is a different trait."

**Problem.**
- Step 2 doesn't point to the table row it uses, or say that the two ways in count as one obstacle.
- In step 3, the parenthesis "(both versions of the first, its two ways in, and the furniture's extra one, 2 harder)" reads like a list of four things, when "its two ways in" just restates "both versions of the first".
- "2 harder" leaves out "at most 12" (only in Chapter 4).
- Where the furniture's obstacle stands (after the location's last) isn't said here.
- Three dice are named without saying which table or row each one uses.

**Rewrite.**
> 2. **How many obstacles.** For each location, roll a d20 on the first row of the table below: one, two or three obstacles, crossed in order. The two ways in count as one: the first obstacle.
> 3. **Each obstacle.** Roll three dice for each:
>    - a d20 on the obstacle table: what it is, and its quiet and loud ways;
>    - a d20 on the Difficulty row of the table below;
>    - a d10 on the Watched row of the table below.
>
>    Roll the first obstacle twice, once for each way in. If the second way in's quiet way is the same trait as the first's, roll the obstacle table again until it differs.
>    Roll one more obstacle at the furniture's location. It stands after that location's last obstacle, and its Difficulty is 2 higher than rolled, at most 12.

**Length.** +3 lines.

### C8-6 · Rolling a Town, step 4 (the ceiling)
**Class** 3 (missing how), also 6 · **Severity** medium

> "The ceiling: at most one Difficulty 12 in an Easy or Standard town, two in a Hard town (the furniture’s obstacle counts by its roll, before its +2). Reroll any extra."

**Problem.**
- "Reroll any extra" doesn't say what to reroll: the Difficulty d20, or the whole obstacle? It also doesn't say which 12s are the extra ones.
- The logic (`capTwelves`) keeps the first 12s rolled and rerolls the Difficulty of each later one until it isn't 12.
- The furniture parenthesis needs an example to be clear.

**Rewrite.**
> 4. **The ceiling.** A town may have one Difficulty 12 (two on Hard). Keep the first you roll. Reroll the Difficulty d20 of each later one until it isn't 12. The furniture's obstacle counts by its d20 roll, before the +2: a rolled 10 that becomes 12 doesn't count; a rolled 12 does.

**Length.** +1 line.

### C8-7 · The town dice table: the Watched row
**Class** Ch. 8 terse table · **Severity** medium

> "Watched (d10) | 1–4 | 1–5 | 1–6"

**Problem.** The cell gives a range without saying what it means. Is the obstacle watched on 1–4, or not watched? The rows above use "1–3: 6 · …", which pairs each roll with a result, so this row reads as unfinished.

**Rewrite.** Cells: "watched on 1–4" / "watched on 1–5" / "watched on 1–6". Optional: put each band in the d20 rows on its own line in the cell, rather than separating them with "·".

**Length.** ±0 (+1 table row height if bands go on separate lines).

### C8-8 · The Obstacle Table: intro wording and flavour in the cells
**Class** 7 (inconsistent terms), also 5 · **Severity** low

> "At a group obstacle, everyone there rolls for themselves (Chapter 4)." / "A guard dog | Charm (good dog) | Nimble (outrun it, barking)"

**Problem.**
- "Everyone there rolls" can be read as everyone present must roll. Chapter 4 says "each Entity who wants past rolls for itself".
- The parentheses in the Quiet and Loud cells are flavour, but they look like the rules text beside them. Chapter 2 now sets flavour apart in italics.
- "(good dog)" echoes the Werewolf's signature **Good Dog**, which has nothing to do with it.

**Rewrite.** "At a group obstacle, each Entity who wants past rolls for itself (Chapter 4)." Set the parenthesised flavour in the two "way" columns in italics, as in Chapter 2. For entry 14, use another phrase, e.g. "Charm (*a biscuit and a pat*)" (wording only: the trait stays Charm).

**Length.** ±0.

### C8-9 · "difficulty" and "Difficulty": one word for two things
**Class** 7 (one word used for two things) · **Severity** medium · naming option **needs Richard**

> "Difficulty" (section heading) / "Choose Easy, Standard or Hard. The difficulty sets these numbers:" / "Difficulty (d20)" (row, same page) / "On every difficulty: …" / "(how many: the difficulty table above; …)" / "one for each difficulty" / "the difficulty it promises" / Chapter 6: "The mob’s Difficulty is set by the town’s difficulty"

**Problem.** "Difficulty" is the number you roll against (Chapter 3). "difficulty" is Easy, Standard or Hard. Only the capital letter tells them apart. The section heading "Difficulty" is title-cased, so it looks exactly like the other word, and the same page has a "Difficulty (d20)" row that means the number. Players also meet Easy, Standard and Hard in Chapters 4 and 5 before the book explains them.

**Rewrite (wording only, no new term).**
- Heading: "Easy, Standard or Hard".
- "Choose Easy, Standard or Hard. The choice sets these numbers:"
- "The same on Easy, Standard and Hard: …" (see C8-11)
- "(how many: the table above; …)"
- "Chapter 9 has three, one each for Easy, Standard and Hard"
- "…keeps a rolled town as hard as its choice promises"
- Chapter 6: see C6-13.

**Optional (needs Richard):** give the setting a name of its own, e.g. "the town's **level**" or "**grade**", used everywhere the setting is meant.

**Length.** ±0.

### C8-10 · The Easy / Standard / Hard table: the "share" row
**Class** 2 (named, not explained) · **Severity** low · one option **needs Richard**

> "Obstacle Difficulties: share of 6 · 8 · 10 · 12 | 15 · 50 · 30 · 5% | …"

**Problem.** Nothing says what to do with this row. It is what the d20 bands produce (the tests check that), but a reader may take it as a separate rule, or as a target to hit when building a town by hand.

**Rewrite.** Label: "Obstacle Difficulties the d20 gives (6 · 8 · 10 · 12)". **Needs Richard** if it should also guide hand-built towns: "…aim for the same mix when you build a town by hand" (ties to C8-1 and C8-13).

**Length.** ±0.

### C8-11 · "On every difficulty": a run-on list, and one more rule tacked on
**Class** 4 (cases run together), also 8 and 7 · **Severity** low

> "On every difficulty: 3 charges per Entity, 12 Turns, overdraw +2 Suspicion; a local chase starts at Lead 1 and escapes at 4 against a mob of 8 plus half the Suspicion (at most 12); the final flight starts at Lead 2. In a rolled town no entrance is small."

**Problem.**
- Six numbers and an unrelated rule share one sentence.
- "Rounded down" is missing (it's in Chapter 6).
- "Entrance" is used here and in Chapter 4 ("an entrance a map marks small"), but everywhere else a location has "ways in". The reader can't tell if "entrance" means a way in, or could also mean the way out.

**Rewrite.**
> The same on Easy, Standard and Hard:
> - 3 charges per Entity, 12 Turns, overdraw Suspicion +2.
> - Local chase: Lead starts at 1, escape at 4; the mob is 8 plus half the Suspicion, rounded down, at most 12.
> - Final flight: Lead starts at 2.
> - In a rolled town no way in is small (Chapter 4).

If "entrance" can also mean the way out, keep "entrance" and say so. Richard to confirm which.

**Length.** +2 lines.

### C8-12 · The Shopping List: repeats and essentials
**Class** 6 (overloaded), also 3 and 4 · **Severity** medium

> "For each item, roll a d6 for its kind and a d6 for the item itself; roll again on a repeated item. The first items rolled are the essentials (how many: the difficulty table above; on Standard, roll any die: odd, one; even, two). Only the kind matters to the rules: it decides which Castle Duty gets its edge there."

**Problem.**
- "Roll again on a repeated item" doesn't say whether to reroll both dice or only the item die. The logic (`rollShoppingList`) rerolls both.
- The essentials sentence has a parenthesis containing a colon, two semicolons and another colon.
- "There" (in "gets its edge there") has no clear place it refers to.

**Rewrite.**
> For each item, roll two d6: the first for its kind, the second for the item. If you roll an item already on the list, roll both dice again.
> The essentials are the first items you roll: one on Easy, two on Hard. On Standard, roll any die first: odd, one essential; even, two.
> Only the kind matters to the rules. It decides where the item can be (Rolling a Town) and which Castle Duty gets its edge at its location (Chapter 2).

**Length.** +1 line.

### C8-13 · The Obstacles box: what it's for, and what it leaves out
**Class** 2 (named, not explained), also 8 · **Severity** medium · Difficulty guidance **needs Richard**

> "Give each obstacle one or two traits that work. When there are two, usually one is the loud way. Mark which obstacles are watched — Trouble there gets an Entity caught — and which are group obstacles that each Entity must roll for itself. Give each location two versions of its first obstacle, with different traits: its two ways in."

**Problem.**
- The box doesn't say when to use it. It is a procedure for building by hand, but it sits between the shopping list and the furniture, after the rolled procedure, so a Storyteller who rolls everything wonders if it is an extra step.
- It says nothing about **Difficulty**, the one thing a by-hand builder most needs to choose.
- "Usually one is the loud way" leaves open when not.
- "One or two traits" doesn't match the way out and the lock-up, which list three.
- "With different traits" is looser than the rolled rule, which is a different *quiet* trait.

**Rewrite.**
> **Building a location by hand** (for your own map, or when you'd rather pick than roll):
> - **Traits:** one or two. With two, usually one is quiet and one loud (the loud way costs Suspicion +1 whatever the result). The way out and the lock-up are fixed and list three.
> - **Difficulty:** 6, 8, 10 or 12 (Chapter 3). [**Needs Richard:** "Aim for the mix the table above gives, and keep to the ceiling (Rolling a Town, step 4)."]
> - **Watched or not:** Trouble at a watched obstacle gets an Entity caught.
> - **Group or not:** at a group obstacle each Entity who wants past rolls for itself.
> - **Two ways in:** two versions of the first obstacle, with different quiet traits.

**Length.** +3 lines.

### C8-14 · The Furniture: two rolls in one sentence
**Class** 4 (cases run together), also 7 and the Ch. 8 die rule · **Severity** medium

> "Roll a d6 for the piece of furniture or decor standing at one of the list’s locations (pick, or number them and roll a d6, rerolling a number without one; Chapter 4)."

**Problem.**
- Two separate d6 rolls (which piece; which location) sit in one sentence, the second inside a parenthesis.
- Where its obstacle goes, and what Bulky and Huge mean, are only in Chapter 4.
- The rules elsewhere say "furniture" alone (Carrying, Suspicion, Captured, several Perks). Only the core rules say "decor counts as furniture", so a reader may wonder whether a gilt mirror or a stuffed bear is "furniture" for those rules.

**Rewrite.**
> 1. Roll a d6 on the table below for the piece. Decor counts as furniture for every rule.
> 2. Choose the location it stands at, or roll for it: number the list's locations from 1 and roll a d6, rolling again on a number with no location.
> 3. It stands behind one extra obstacle, after that location's last (Rolling a Town, step 3).
>
> Its size says how many carry it: Bulky one, Huge two (Carrying, Chapter 4).

**Length.** +2 lines.

### C8-15 · The Villagers: one table, two rolls; flavour or rules?
**Class** 3 (missing how), also 5 and the Ch. 8 die rule · **Severity** medium

> "Whenever a watched obstacle needs a face, or a Cost needs someone to cause it, roll who it is and what they’re doing."

**Problem.**
- The table has one d6 column, so it reads as one roll giving a pair ("the baker's wife, looking for a lost cat"). The core rules (C19) and Chapter 9's towns ("the mayor … (judging the costume contest)") use two separate d6.
- Unlike Lantern Night's "Customs are flavour, not rules", nothing here says villagers don't change the obstacle. "Tipsy from the cider" invites an easier roll.
- Three Ways says the random tables roll the villagers while building, but this section says to roll them during play.

**Rewrite.**
> Whenever a watched obstacle needs a face, or a Cost needs someone to cause it, roll a d6 for who it is and another d6 for what they're doing. Villagers are flavour: they don't change an obstacle's traits or Difficulty. Roll them as you need them, or a couple before play (each of Chapter 9's towns lists two).

**Length.** +1 line.

### C8-16 · Choosing Costs: "someone", and a Cost that "costs nothing"
**Class** 7 (inconsistent terms), also 6 · **Severity** medium

> "A lost Turn bites near dawn, a smaller die before a hard roll, “drop an item” when someone carries loot, Suspicion +1 near the Limit. A Cost at the way out costs nothing: everyone still leaves."

**Problem.**
- "When someone carries loot" goes against Chapter 3: "drop an item" drops **the roller's own** item, never anyone else's. A Storyteller following this line may pick it when only a friend carries loot. Chapter 3 forbids that, because it would cost nothing.
- "A Cost at the way out costs nothing" comes one sentence after "never one that costs nothing", so it reads like a contradiction. What it means is that at the way out a Cost has no effect and there is nothing to pick (Chapter 4: "A Success or a Cost gets everyone out, free").

**Rewrite.**
> A lost Turn bites near dawn, a smaller die before a hard roll, "drop an item" when the roller carries loot (it drops its own, Chapter 3), Suspicion +1 near the Limit. At the way out a Cost has no effect: everyone still leaves, free (Chapter 4), so there's nothing to pick.

**Length.** +½ line.

### C8-17 · The mob: the ground only "once the hunt is on"?
**Class** 7 (inconsistent terms) · **Severity** low

> "Once the hunt is on, the mob is like the weather: always there, always closer. Read the ground off the chase table every round."

**Problem.** "The hunt" means the final flight (Chapter 6), so this reads as if the ground were rolled only in the flight. It is rolled in every chase, local chases included. "Read … off" also doesn't say plainly that the Storyteller rolls the d6. This is the only place in the book that says who rolls.

**Rewrite.**
> In every chase, roll the ground on the chase table each round, and describe it. Once the hunt is on, the mob is like the weather: always there, always closer.

**Length.** ±0.

### C8-18 · The lock-up advice: "every Turn"
**Class** 8 (conditions stated elsewhere) · **Severity** low

> "The captive can try to slip free every Turn, and the others can come for them (Chapter 6)."

**Problem.** Chapter 6 says "once per Turn, from the Turn after its capture". "Every Turn" suggests the captive can try in the Turn it was caught.

**Rewrite.** "The captive can try to slip free once each Turn after the one it was caught in, and the others can come for it (Chapter 6)."

**Length.** ±0.

### C8-19 · Pacing: the furniture's minimum Suspicion, and "a Difficulty 8 first"
**Class** 6 (overloaded), also 2 · **Severity** low · the number **needs Richard**

> "Early on, give each player a job that suits their monster, and a new player a Difficulty 8 first. A Bulky piece by the way out still costs at least 2 Suspicion to get home (a carried move takes two Turns)."

**Problem.**
- "By the way out" isn't a position in the rules: every location is one move from the way out.
- The parenthesis doesn't let the reader check the "2".
- By Chapter 4's own rules, the minimum looks like **1**. In Turn N, A beats the furniture's obstacle. B (already past the location's obstacles, not yet acted) takes the piece, which is free, and starts the carried move as its action. At the end of N, +1. In Turn N+1, B acts first and arrives at the way out. C, already there, rolls the way out and the party leaves during N+1, so there is no end-of-Turn rise. Total: 1. The "2" (from playtest FT5, M5) holds when the carrier beats the obstacle itself.
- "Give … a new player a Difficulty 8 first" doesn't say how the Storyteller does that. The party chooses where to go.

**Rewrite.**
> Early on, give each player a job that suits their monster, and steer a new player toward a Difficulty 8 obstacle first. Furniture always costs Suspicion: from the Turn it's taken, +1 at the end of every Turn until it leaves town, and a carried move takes two Turns. Even a piece carried straight to the way out adds [**needs Richard:** "at least 1, and usually 2" / keep "at least 2", if a ruling makes taking and moving in the same Turn impossible]. Warn the party if that would reach the Limit.

**Length.** +1 line.

---

## Rule gaps noticed (outside this audit's scope)

These came up while reading. They are questions about the rules, not wording, so no rewrite is offered.

1. **Repeated obstacles in a rolled town.** Can a location's later obstacle be the same as one of its ways in (two shuttered windows)? The procedure doesn't say. Chapter 9's towns never repeat one at a location.
2. **"Entrance" and the way out** (C8-11). Can a map mark the way out small, so that a Huge piece can't leave by it?
3. **A captive helping another captive** (C6-10), and **campaign upgrades on one Entity** (C7-5). Both are already marked needs Richard above.
4. **Furniture's minimum Suspicion** (C8-19). Already marked needs Richard above.
