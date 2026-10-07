# Text-clarity audit, part A: Chapters 1, 3, 4 and 5 (2026-10-07)

Chapters 1 (`book/src/chapters/11-ch01.html`), 3 (`13-ch03.html`), 4 (`14-ch04.html`) and 5 (`15-ch05.html`) were read as text, in order. The reader in mind is a first-time player who has read only the book up to that point, Chapter 2 included. The question was the one Richard raised about Chapter 2's powers: can the reader tell what a rule costs, exactly what to do at the table, when it doesn't apply, and which words are rules and which are flavour? Nothing in the book was changed. Every rewrite below is meant to keep the rules as they are. Where the meaning was unclear, it was checked against `docs/CORE-RULES.md` (1.31), the Decisions log in `docs/DESIGN.md` and `module/logic/`. Where the only clear fix would add or change a rule, the finding is marked **needs Richard**.

Severity: **high** = the reader can't act on the passage; **medium** = it needs a second reading or a look elsewhere; **low** = polish.

Passages are quoted from the source with the HTML (bold, italics) removed.

## Summary

Each finding is counted once, under its main class. Most findings also touch a second class, listed with the finding.

| Class | High | Medium | Low | Total |
|---|---|---|---|---|
| 1. Term used before it's explained | 1 | 1 | 3 | 5 |
| 2. Effect named, not explained | – | 3 | 1 | 4 |
| 3. Missing who / when / how often / cost / duration / failure | – | 4 | 3 | 7 |
| 4. Several options or cases run together | 1 | 5 | 2 | 8 |
| 5. Flavour mixed into rules | – | – | 2 | 2 |
| 6. Overloaded sentence | – | 6 | 3 | 9 |
| 7. Inconsistent terms | – | 5 | 6 | 11 |
| 8. Numbers or conditions only stated elsewhere | – | 3 | 4 | 7 |
| **Total** | **2** | **27** | **24** | **53** |

By chapter: Chapter 1, 5 findings (all low); Chapter 3, 21 (1 high); Chapter 4, 20 (1 high); Chapter 5, 7 (none high).

**High:**
- **C3-16.** "Open an approach" packs three exceptions into one sentence, uses five terms the book hasn't explained yet, and says "its own way out" for slipping free of the lock-up. "The way out" already means the town's exit. All eight Entities' open-an-approach powers in Chapter 2 send the reader here for exactly these exceptions.
- **C4-1.** "4 items on Easy, 5 on Standard and Hard": nothing in Part One says what Easy, Standard and Hard are, or who chooses. Chapter 3 has just used "easy, standard, hard" for Difficulties 6, 8 and 10. So the list size, the Limit (Chapter 5) and the flight numbers (Chapter 6) can't be read, and they get misread.

**Needs Richard (all small):**
- C3-1: may the Storyteller call for a roll anywhere other than at an obstacle or in a chase?
- C4-6: when does the party pick a location's way in, and does "keeps to it" mean for the rest of the raid?
- C5-4: is the Tell check rolled when the first Entity arrives, or after everyone moving there that Turn has moved? Who rolls it?
- Confirm only (the rewrites follow the rules summary and the online version): C3-7, that "you're back there too" applies only to a carrier setting its piece down (V28); C3-8, that a piece of furniture is never the "item" a Cost drops.
- Naming options (only if Richard prefers a new name to the wording fix): C3-4 / C4-1, as part B's C8-9.

**Overlaps with part B.** C1-4 waits on part B's C8-1 (what "a map" is). C3-12 and C5-6 match C6-15 (overdraw; "the hunt"). C4-8 matches C6-9 (the lock-up as a place). C4-20 matches C8-16 (the way-out Cost). C4-1 matches C8-9 (difficulty / Difficulty). C3-10 matches C6-2 (a chase round).

**Echoes in Chapter 2.** Chapter 2's entries are generated from the game data (`book/tools/entity-entries.mjs`), and they repeat four phrases flagged here: "Trouble or a Cost still counts" (C3-15), "at 2 lower Difficulty" (C3-17), "Only you get past, except at the way out and the lock-up" (C3-16, C3-18) and "in a chase, instead of the ground’s" (C3-14). If the Chapter 3 wording changes, the entries should follow, through the data.

## Page budget

Measured on the current PDF (pages 5, 12, 13 and 14). One line of a column holds about 10 words, and a page about 66 lines. The line counts include the extra lines that lists take.

| Chapter | Room now | Every rewrite taken | High and medium only |
|---|---|---|---|
| 1 (p. 5) | about 6 lines, plus the spot illustration's space | about +75 words, +8 lines (C4-1's sentence included) | +39 words, +4 lines (C4-1's sentence) |
| 3 (p. 12) | none | about +200 words, +28 lines (under half a page), after 52 words move to Chapter 4 | about +115 words, +18 lines (a third of a page) |
| 4 (p. 13) | under 1 line | about +425 words, +55 lines (most of a page), the 81 words moved from Chapter 3 included | about +345 words, +45 lines (two thirds of a page) |
| 5 (p. 14) | about 15 lines | about +115 words, +14 lines | about +60 words, +8 lines |

Chapters 1 and 5 can take their fixes on their pages (Chapter 5 only just: if it's tight, use C5-2's table column instead of the longer box text). Chapters 3 and 4 can't. Even the high and medium fixes add a third of a page to Chapter 3 and two thirds of a page to Chapter 4. Ways to get there without changing a rule (layout is Richard's call):
1. **Move.** The dropping and picking-up rules move from Chapter 3's Cost result to Chapter 4's Carrying section (C3-7), and the difficulty sentence goes to Chapter 1 (C4-1). This is already counted above.
2. **Lists.** Some prose would read better as a list, and each list costs one or two lines more than the prose: the four Costs (C3-6), the open-approach exceptions (C3-16), using abilities (C3-19), a Turn's actions (C4-10), carrying (C4-17), dropping (C3-7) and the Tell cases (C5-3).
3. **Pages.** Let Chapters 3 and 4 run to three pages between them, and fill the spare half page with something useful (for example a worked roll), so no page is near-empty.
4. **A table would read better** in two places: Chapter 5's What Raises It, with a "from a roll?" column (C5-2), and Chapter 4's The Town (part / what it is / watched?), if Richard prefers a table to the list in C4-4 to C4-8.

**If only some fixes go in at first**, these matter most, in this order. Chapter 3: C3-16 (open an approach), then C3-6 to C3-8 (the Cost bullet, with C3-7's move, which takes words out of Chapter 3), C3-12, C3-9, C3-15. Chapter 4: C4-19 and C4-20 (getting out), then C4-7, C4-13, C4-15, C4-17, C4-2. Even this short list needs about 10 more lines in Chapter 3 and about 30 in Chapter 4 (C3-7's block included) than the pages have now. So the two chapters will grow whichever fixes are taken.

---

## Chapter 1: The Game

### C1-1 · What a Session Is
**Class** 7 (inconsistent terms), also 5 · **Severity** low

> "What a Session Is" (heading) / "Each raid is on a town you have never seen before. It is always the year’s first stock-up: nothing from earlier raids carries over unless your group uses the optional campaign rules (Chapter 7). A raid runs 1–2 hours, so an evening often fits two."

**Problem.** The heading says "Session", the section defines a raid, and the last line says an evening fits two raids. "Session" appears nowhere else in the book, so the reader can't tell whether a session is a raid or an evening. "It is always the year’s first stock-up" is the story reason for the rule, set in the rule's sentence. Read next to "once a year" in the opener, it raises a question: the first of how many?

**Rewrite.**
> **What a Raid Is**
> Each raid is on a new town and stands alone: nothing from earlier raids carries over, unless your group uses the optional campaign rules (Chapter 7). A raid runs 1–2 hours, so an evening often fits two. *In the story, every raid is the year’s first stock-up.*

**Length.** +2 words.

### C1-2 · What You Need: the dice
**Class** 4 (options run together), also 1 · **Severity** low

> "A set of polyhedral dice for each player: d4, d6, d8, d10 and d12, plus a second d6 (the Mask) and a second d10 (the Monster); and a d20 for the Storyteller (a d6 halved, rounding up, serves as the d3)."

**Problem.** Two people's kits and a die substitute share one sentence, with a semicolon and three parentheses. "The d3" is named before any rule uses one. The reader doesn't know who needs it or when: it's the Storyteller's, for placing locations when rolling a town (Chapter 8).

**Rewrite** (two bullets):
> - Each player: one each of d4, d6, d8, d10 and d12 (the trait dice, Chapter 2), plus a second d6 (the Mask) and a second d10 (the Monster).
> - The Storyteller: a d20. When Chapter 8 calls for a d3, roll a d6, halve it and round up.

**Length.** +6 words, +1 line.

### C1-3 · What You Need: trackers
**Class** 1 (term before it's explained), also 8 · **Severity** low

> "An Entity Sheet for each player (copy the one at the back of the book), and something to track Suspicion, Turns and the Lead."

**Problem.** Suspicion, Turns and the Lead are named with no pointer, so the reader doesn't know what they are or how big a tracker each needs.

**Rewrite.**
> …and something to track Suspicion (Chapter 5), Turns (Chapter 4) and the Lead (Chapter 6).

Optionally add the ranges: Suspicion 0 up to 15, Turns 1–12, the Lead 0 up to 6.

**Length.** +6 words (+15 with the ranges).

### C1-4 · What You Need: a town
**Class** 2 (named, not explained) · **Severity** low

> "A town to raid: a premade one (Chapter 9), a map, or one rolled on the random tables (Chapter 8)."

**Problem.** "A map": a map of what, made by whom? It is Chapter 8's second way to build a town, but the pointer sits only on the third option, so the reader doesn't know where to look it up.

**Rewrite.**
> A town to raid: a premade one (Chapter 9), or one the Storyteller builds from a map or rolls on the random tables (Chapter 8).

What "a map" means is part B's C8-1 (needs Richard). Change this line to match whatever he decides.

**Length.** +4 words.

### C1-5 · The Raid at a Glance
**Class** 1 (term before it's explained) · **Severity** low

> "Roll the shopping list: one or two essentials, the rest extras." / "Watch Suspicion: at the Limit, the whole town hunts you." / "Get out of town with the goods — or run for it, and don’t get forked."

**Problem.** A summary can be short, but the reader can't look anything up: no line has a pointer. "Roll the shopping list" doesn't say who rolls it (the Storyteller). Essentials, extras, the Limit and "forked" (killed, and the raid lost) are explained two to five chapters later. "Before dawn" doesn't say how long that is. "Choose on every roll" isn't quite true (carriers and the final flight must take the Monster). That's acceptable in a summary.

**Rewrite.**
> - The Storyteller rolls the **shopping list**: one or two essentials, the rest extras (Chapter 4).
> - **Visit the town’s locations** before dawn (12 Turns), getting past their obstacles and taking the loot (Chapter 4).
> - **Choose on every roll**: hide behind your Mask, or let the Monster out (Chapter 3).
> - **Watch Suspicion**: when it reaches the Limit, the whole town hunts you (Chapter 5).
> - **Get out of town** with the goods — or run for it, and don’t get forked (Chapter 6).

**Length.** +17 words (62 → 79), about +2 lines.

---

## Chapter 3: Rolling the Dice

### C3-1 · Opener
**Class** 3 (missing when) · **Severity** low · **needs Richard**

> "When the outcome is in doubt, you roll two dice — your trait die and your Mask or Monster die — and add them together."

**Problem.** "When the outcome is in doubt" sounds like a general Storyteller call. But every roll in Part One is at an obstacle (Chapter 4; the way out and the lock-up are obstacles too) or in a chase round (Chapter 6). The reader can't tell whether the Storyteller may also call for a roll elsewhere, for example to talk past a villager who isn't an obstacle. If so, the book would need to say what sets the trait and the Difficulty.

**Rewrite** (if rolls happen only there):
> You roll to get past an obstacle (Chapter 4) and in each round of a chase (Chapter 6): your trait die plus your Mask or Monster die, added together.

If the Storyteller may call other rolls: needs Richard.

**Length.** +6 words.

### C3-2 · The Roll, step 1: the loud way
**Class** 6 (overloaded), also 1 · **Severity** low

> "Each obstacle lists one or two traits that work, usually one of them the loud way (Suspicion +1 whatever the result, Chapter 5). Using any other trait needs an ability."

**Problem.** It reads as if most obstacles, even those with one trait, have a loud way. In fact only an obstacle with two traits usually marks one as loud (Chapter 8: "When there are two, usually one is the loud way"). The way out and slipping free list three traits, so "one or two" isn't the whole story. "Obstacle" has no pointer (Chapter 4).

**Rewrite.**
> **The obstacle sets the trait.** Each obstacle (Chapter 4) lists the traits that work, usually one or two. When it lists two, one is usually marked as the loud way: rolling that one raises Suspicion by 1, whatever the result (Chapter 5). To roll any other trait you need an ability (below).

**Length.** +22 words, +2 lines.

### C3-3 · The Roll, step 2: when you can't choose the Mask
**Class** 8 (conditions stated elsewhere) · **Severity** low

> "Choose the second die: the Mask d6 or the Monster d10."

**Problem.** The choice isn't always open. Carriers of furniture can't use the Mask (Chapter 4), and in the final flight nobody can (Chapter 6). A reader who learns the choice here doesn't learn the exceptions.

**Rewrite** (only if the page allows; otherwise leave it to Chapters 4 and 6):
> **Choose the second die:** the Mask d6 or the Monster d10. (Carrying furniture, or in the final flight, it must be the Monster: Chapters 4 and 6.)

**Length.** +16 words.

### C3-4 · The Roll, step 3: easy, standard, hard
**Class** 7 (one word for two things) · **Severity** medium

> "compare the total with the Difficulty: 6 easy, 8 standard, 10 hard, 12 daunting."

**Problem.** The ladder's easy, standard and hard are the same words as the town's difficulty (Easy, Standard, Hard). Chapter 4 uses those a page later without introducing them (C4-1), so "4 items on Easy" reads as being about easy obstacles. "Difficulty" (an obstacle's number) and "difficulty" (Easy, Standard or Hard: Chapter 6's "the town’s difficulty") differ only by a capital letter.

**Rewrite.** No change here. Fix it where the town's difficulty is first used (C4-1), and keep the phrase "the town’s difficulty" everywhere it's meant. Optional (**needs Richard**, naming): give one of the two a different name, as in part B's C8-9.

**Length.** ±0 here.

### C3-5 · Results: Success
**Class** 7 (inconsistent terms) · **Severity** low

> "Success: the total meets the Difficulty. You do it."

**Problem.** "Meets" means equal or more. But Chapter 4 says "beats an obstacle (a Success or a Cost)", where "beat" also covers a Cost that falls short. Chapter 2 says "the Monster ... beats your trait die", meaning strictly higher. That is three readings of meet and beat in three chapters.

**Rewrite.**
> **Success:** the total is equal to the Difficulty or more. You do it.

**Length.** +4 words.

### C3-6 · Results: Cost, the four costs
**Class** 4 (options run together), also 1 · **Severity** medium

> "Cost: 1–2 short. You do it, at a cost the Storyteller picks: Suspicion +1, drop an item, lose a Turn (you skip your next action), or your next roll’s trait die one size smaller."

**Problem.** Four options in one line, the third with a parenthesis. "Turn" and "action" are explained only in Chapter 4.

**Rewrite** (see C3-8 for the whole bullet):
> **Cost:** 1–2 short. You do it, but the Storyteller picks one cost:
> - Suspicion +1.
> - Drop an item (below).
> - Lose a Turn: you skip your next action (Chapter 4).
> - Your next roll’s trait die is one size smaller.

**Length.** +3 words, +3 lines (list).

### C3-7 · Results: Cost, dropping and picking up
**Class** 6 (overloaded), also 1 and 3 · **Severity** medium

> "A dropped item or piece stays where you are (the location, the way out or the lock-up; between places, the one you left, and you’re back there too); drop yours any time but in a local chase. Anyone there may pick up any number of items, as their action for a Turn."

**Problem.**
- Three rules sit inside the Cost result, and two of them have nothing to do with a Cost: where a dropped thing ends up, dropping at will, and picking up.
- "Piece", "between places" and "local chase" are explained only in Chapters 4–6. Only a furniture carrier is ever between places, so the case can't be understood here.
- "And you’re back there too" reads as applying to any drop between places. In the rules (V28, CORE 1.30), the carrier who **sets its piece down** between places is back at the place it left. Loot dropped there also stays at the place you left (V27).
- "Any time" implies that dropping needs no action, but the text doesn't say so.

**Rewrite.** In Chapter 3, keep only the pointer in C3-8's "Drop an item" line. Move the rest to Chapter 4's Carrying section as its own short list:
> **Dropping and picking up**
> - You may drop your own loot, or a piece you carry, at any time, without using your action. Not in a local chase (Chapter 6).
> - It stays where you are: a location, the way out or the lock-up. Between places, it stays at the place you left; set down a piece there and you’re back at that place too.
> - Anyone at that place may pick up any number of dropped items, as their action for a Turn.

(Taking a set-down piece back up is in C4-17.) Confirm with Richard: "you're back there too" only for a set-down piece (as V28 has it).

**Length.** Chapter 3 −52 words (−5 lines); Chapter 4 +80 words (+9 lines as a list).

### C3-8 · Results: Cost, choosing it, and "drop an item"
**Class** 8 (condition stated elsewhere), also 1, 3 and 7 · **Severity** medium

> "The Storyteller never picks a Cost that costs nothing right then (say, a Suspicion +1 the roll already raised); “drop an item” drops one of your own items, never what this roll wins."

**Problem.**
- The example only makes sense once you know One Roll, One Rise (Chapter 5). Here the reader can't see why a Suspicion +1 could cost nothing.
- Two rules share one sentence, joined by a semicolon.
- "Drop an item" doesn't say who picks which item. The approved ruling F8 says the Storyteller does.
- The book says "item" here, "loot" in Chapter 4 and "piece" for furniture. "A dropped item or piece" just above suggests a piece of furniture might count as an item. The online version offers this Cost only to a roller who carries loot (`costOptions` in `module/logic/roll-plan.mjs`), so an item is loot, never furniture.

**Rewrite** (the whole Cost bullet, with C3-6 and C3-7):
> **Cost:** 1–2 short. You do it, but the Storyteller picks one cost:
> - Suspicion +1.
> - Drop an item: one item of loot you carry, which the Storyteller picks. Never the loot this roll wins, and never furniture (dropping: Chapter 4).
> - Lose a Turn: you skip your next action (Chapter 4).
> - Your next roll’s trait die is one size smaller.
>
> The Storyteller never picks a cost that costs nothing right then. For example, Suspicion +1 costs nothing on a roll that already raises Suspicion, because one roll raises it only once (Chapter 5).

For the terms: say "item" for a thing on the shopping list, "loot" for the items an Entity carries and "piece" for the furniture or decor, and say so once in Chapter 4's The Town (C4-5). Confirm with Richard that furniture is never the dropped "item" (the online version already works that way).

**Length.** This passage +25 words. The whole Cost bullet (C3-6 to C3-8) goes from 119 to 91 words in Chapter 3, but as a list it takes about 3 lines more. C3-7's block adds about 80 words to Chapter 4.

### C3-9 · Results: Trouble, "if anyone is watching"
**Class** 7 (inconsistent terms), also 1 · **Severity** medium

> "Trouble: 3 or more short. It doesn’t happen, Suspicion rises by 1, and if anyone is watching, you are caught (Chapter 6)."

**Problem.** "If anyone is watching" reads as the Storyteller judging the scene. The rule is a mark on the obstacle: Trouble at a **watched obstacle** gets you caught (Chapters 4 and 5), and the way out and the lock-up always are watched. The pointer skips Chapter 5, where Getting Caught is. "Caught" isn't explained: it means a local chase starts. (Slipping free of the lock-up, where Trouble starts no chase, stays as Chapter 6's exception.)

**Rewrite.**
> **Trouble:** 3 or more short. It doesn’t happen, and Suspicion rises by 1. If the obstacle is watched (Chapter 4), you are also caught and must run: a local chase (Chapters 5 and 6).

**Length.** +12 words.

### C3-10 · Results: Critical, and results in a chase
**Class** 4 (cases run together), also 1 and 8 · **Severity** low

> "Critical: a Success where both dice show the same face. In a chase it counts as two Successes; anywhere else you get back one spent charge, up to your starting number."

**Problem.** Two cases are joined by a semicolon. "Two Successes" means nothing until Chapter 6 (Lead +2). "Up to your starting number" leaves out the word charges. More broadly, nothing in this list says that in a chase a result moves the Lead instead: a Cost costs nothing, and Trouble starts no new chase. So a reader applies the Cost list in chases too. See part B's C6-2.

**Rewrite.**
> **Critical:** a Success where both dice show the same number. Outside a chase, you get back one charge you spent (never more than you started with). In a chase, it counts as two Successes (Chapter 6).
>
> In a chase, results move the Lead instead (Chapter 6).

**Length.** +15 words, +1 line.

### C3-11 · The Monster Shows
**Class** 5 (flavour mixed into rules), also 6 · **Severity** low

> "If you rolled the Monster die and it came up higher than your trait die, the monster did the work and it showed: Suspicion +2. On a tie, or with the Mask, nothing shows."

**Problem.** The story ("the monster did the work") sits in the middle of the rule. "Higher than your trait die" can be read as the die's size: a d10 is always "higher" than a d8. The text doesn't say that it counts whatever the result.

**Rewrite.**
> If you rolled the Monster die and its number is higher than your trait die’s, the Monster shows: Suspicion +2, whatever the result. A tie, or the Mask, shows nothing. *The monster did the work, and someone saw it.*

**Length.** +5 words.

### C3-12 · Abilities: overdraw
**Class** 2 (named, not explained), also 1 and 8 · **Severity** medium

> "At zero charges you can still use one, at a price: overdraw costs Suspicion +2, or your Weakness once the hunt is on (Chapter 6)."

**Problem.**
- "Costs ... your Weakness" names an effect without saying what happens. From your next roll to the end of the flight your trait die is one size smaller.
- "The hunt is on" is a new term. It means the final flight, which the reader has met in Chapter 2's Perks. Chapter 5 says "the whole town hunts" and Chapter 6 has "Once the Hunt Is On" (C5-6).
- The limits are only in Chapter 6: once per flight, and never while your Weakness is in play, so an Entity with an Always Weakness can't overdraw in the flight at all. That's fine, but the pointer should say there are limits.

**Rewrite.**
> Using an ability costs one charge. At zero charges you can still use one by **overdrawing**: it costs Suspicion +2 instead of a charge. In the final flight it costs your Weakness instead: your trait die is one size smaller to the end of the flight (Chapter 6 says when you may).

Part B's C6-15 rewrites the Chapter 6 end of this.

**Length.** +21 words.

### C3-13 · Abilities: "every ability does one of four things"
**Class** 7 (inconsistent statements) · **Severity** low

> "Every ability does one of four things:"

**Problem.** Chapter 2's box says the Draught changes form instead. "Every" contradicts it.

**Rewrite.**
> Every ability but the Draught (Chapter 2) does one of four things:

**Length.** +5 words.

### C3-14 · Abilities: "the ground"
**Class** 1 (term before it's explained) · **Severity** low

> "Use the ability’s trait instead of the one the obstacle calls for (in a chase, instead of the ground’s)."

**Problem.** "The ground" is explained only in Chapter 6, and there's no pointer. Chapter 2's entries use the same words.

**Rewrite.**
> …(in a chase, instead of the ground’s: Chapter 6).

**Length.** +2 words.

### C3-15 · Abilities: rolling the Monster safely
**Class** 2 (named, not explained), also 6 · **Severity** medium

> "Roll the Monster die without risking Suspicion: if it shows, that raises nothing (Trouble or a Cost still counts)."

**Problem.** "Still counts" toward what? The reader can't tell whether the ability also covers the loud way or an overdraw paying for it. The rule (CORE 1.31) is that only the Monster showing is ignored. Trouble, the loud way, a Cost picked as Suspicion and an overdraw still raise it. Chapter 2 repeats the same parenthesis in all eight entries.

**Rewrite.**
> **Roll the Monster die without risking Suspicion:** if the Monster shows, that adds no Suspicion. Everything else on the roll still counts: Trouble, the loud way, a Cost picked as Suspicion, an overdraw.

**Length.** +14 words.

### C3-16 · Abilities: open an approach
**Class** 4 (cases run together), also 1, 6 and 7 · **Severity** high

> "Open an approach nobody else can take: at any obstacle, not only a way in, if it doesn’t list the ability’s trait, roll that trait at 2 lower Difficulty, watched as usual. Never in a chase. Only you get through (others must beat it themselves), though the way out (everyone leaves) and a rescue work as usual, and a captive may open its own way out."

**Problem.** Every Entity has an open-an-approach power (Mesmerise, Mountain Stride, Royal Bearing, Through the Hedge, Through the Gap, Through the Wall, Broomstick, Trample). Each Chapter 2 entry says "except at the way out and the lock-up (Chapter 3)" and sends the reader here, to the hardest sentence in the chapter.
- "A way in", "watched", "the way out", "a rescue" and "a captive" are all explained only in Chapters 4–6.
- Three exceptions run together after "though", two of them in parentheses.
- "Its own way out" uses "the way out" (the town's exit) for something else: slipping free of the lock-up. Readers take it to mean a captive can open the town's exit.
- "Watched as usual" doesn't say what follows: the obstacle keeps its own mark, so Trouble at a watched one still gets you caught.
- The verbs change: "get through" here, "get past" in Chapter 2, "beat" in the same sentence (C3-18).

What a reader gets wrong: that an obstacle passed this way is beaten for the party (Chapter 4's "stays beaten for the whole party" seems to say so), or that a captive can open the way out of town.

**Rewrite** (a list):
> **Open an approach of your own:** at an obstacle that doesn’t list the ability’s trait, roll that trait at a Difficulty 2 lower (a 10 becomes an 8). Never in a chase.
> - Any obstacle will do, not only a location’s first one (its way in, Chapter 4).
> - The obstacle is still watched or not, as marked (Chapter 4).
> - Only you get past it. It isn’t beaten for the others: they must beat it themselves.
> - Two places work as usual. At the way out, your Success or Cost gets everyone out (Chapter 4). At the lock-up (Chapter 6), a rescuer’s Success or Cost frees every captive, and a captive may use it to slip free.

**Length.** +48 words (66 → 114), +5 lines as a list. This is the fix to keep if Chapter 3 can take only one long one.

### C3-17 · Abilities: "at 2 lower Difficulty"
**Class** 6 (ambiguous wording) · **Severity** low

> "roll that trait at 2 lower Difficulty"

**Problem.** The Difficulty ladder goes up in steps of 2 (6, 8, 10, 12), so "2 lower" can be read as two steps lower (10 becomes 6). The rule is 2 points, one step (the rules logic subtracts 2: `openApproachEase` in `module/config.mjs`). The same phrase is in all eight Chapter 2 entries.

**Rewrite.** "at a Difficulty 2 lower (a 10 becomes an 8)": already in C3-16. In Chapter 2's entries: "at a Difficulty 2 lower".

**Length.** +5 words here (counted in C3-16).

### C3-18 · Get past, get through, beat, pass, cross
**Class** 7 (inconsistent terms) · **Severity** medium

> Chapter 2: "Only you get past" / "You get past group obstacles without rolling". Chapter 3: "Only you get through (others must beat it themselves)" / "even past obstacles you haven’t crossed". Chapter 4: "crossed in order" / "beat or pass the last" / "Once anyone beats an obstacle (a Success or a Cost)" / "each Entity who wants past rolls for itself".

**Problem.** Five verbs for two ideas:
- **beating** an obstacle: a Success or a Cost on it, which makes it beaten for the whole party;
- **being past** it: because you or someone else beat it, or because you got past with your own approach or Spectral.

A reader asks whether "pass" or "get through" is a different mechanic, and whether an obstacle you got past with your own approach is "beaten" (it isn't).

**Fix.** Say "beat" only for the roll result (a Success or a Cost), and "get past" for being on the far side. Replace "get through", "pass" and "cross" with "get past" (Chapter 3 abilities; Chapter 4 The Town). The rewrites in C3-16, C3-19 and C4-5 already do this.

**Length.** ±0.

### C3-19 · Abilities: spending and helping
**Class** 4 (several rules run together), also 2 and 6 · **Severity** medium

> "Spend abilities before you roll. An ability can help any Entity’s roll at the same place (a location, the way out or the lock-up), even past obstacles you haven’t crossed; helping costs the charge, not your action. The roller rolls its own die; you can only open an approach on your own roll."

**Problem.**
- Five rules in four sentences.
- "The roller rolls its own die" is too short to act on. It means that when your ability changes a friend's trait, the friend rolls its own die for that trait, not yours. Brute Force on the Witch's roll gives her Brawn d6, not the Creature's d12.
- "Even past obstacles you haven’t crossed" means you can help anyone at the same location, wherever you each are among its obstacles.
- "Action" is explained only in Chapter 4.
- Not said here: in a local chase, abilities help only your own roll (Chapter 6).

**Rewrite** (a list):
> Spend abilities before you roll.
> - You can spend one on any Entity’s roll at the same place as you (a location, the way out or the lock-up), even if you haven’t got past the obstacles it has. Not in a local chase (Chapter 6).
> - Helping costs the charge, not your action.
> - The roller always rolls its own dice: Brute Force spent on a friend’s roll means the friend rolls its own Brawn.
> - You can open an approach only on your own roll.

**Length.** +29 words, +3 lines.

### C3-20 · Abilities: two trait changes on one roll
**Class** 8 (ruling stated elsewhere) · **Severity** low

> "Several abilities may go on one roll"

**Problem.** The approved ruling F2 (DESIGN, 2026-10-06) isn't in the book: two abilities that change the trait can't go on one roll. The online version enforces it (`twoTraits` in `module/logic/roll-plan.mjs`). A reader may stack Brute Force and Keen Nose and wonder which trait to roll. This is wording, since a roll has only one trait die.

**Rewrite.**
> Several abilities may go on one roll, but only one of them may change the trait.

**Length.** +9 words.

### C3-21 · Abilities: raises and steps down
**Class** 1 (term before it's explained), also 7 · **Severity** medium

> "Several abilities may go on one roll, but it takes at most one raise, from any source, Castle Duty included. Raises and steps down cancel out (a d4 stepped down and raised stays a d4, and a d12 raised and stepped down stays a d12). Nothing makes a die smaller than a d4: further steps down are lost."

**Problem.**
- "Step down" is used without saying what steps a die down: a Cost's "one size smaller", your Weakness, carrying furniture.
- The same idea goes by other names: "one size bigger" (Chapter 2), "one size larger" (Castle Duty), "raise".
- The two examples show edge cases (the d4 floor, the d12 ceiling), and the reader has to infer the point: net them out first, then apply the limits.
- Not said: any number of steps down may apply (ruling F4: two smaller-die Costs stack).

**Rewrite** (with C3-20):
> Several abilities may go on one roll, but only one may change the trait, and the roll takes **at most one raise**, from any source, Castle Duty included. A **step down** is anything that makes your trait die one size smaller: a Cost, your Weakness, carrying furniture (Nimble only). Any number may apply. Net raises against steps down first: a d4 stepped down and raised stays a d4, and a d12 raised and stepped down stays a d12. Then no die goes below a d4 or above a d12.

Also make Chapter 2's "one size bigger" and Castle Duty's "one size larger" the same phrase (suggest "one size bigger").

**Length.** +31 words (C3-20's 9 included).

---

## Chapter 4: The Raid

### C4-1 · The Shopping List: Easy, Standard and Hard
**Class** 1 (term before it's explained), also 7 · **Severity** high

> "Before the raid, the Storyteller rolls the shopping list (Chapter 8; Chapter 9’s towns have theirs): 4 items on Easy, 5 on Standard and Hard."

**Problem.** Easy, Standard and Hard are the town's difficulty, and nothing in Part One introduces it: what it is, who chooses it (the Storyteller: Chapter 8's "Choose Easy, Standard or Hard"), or when. Chapter 3 has just used easy, standard and hard for Difficulties 6, 8 and 10, so "4 items on Easy" reads as being about easy obstacles. The same undefined labels set the Limit (Chapter 5's opener: "11 on Easy and Standard, 15 on Hard") and the final flight's numbers (Chapter 6). A player can't work any of them out.

**Rewrite.** Introduce it once, early. Chapter 1's What a Raid Is (C1-1) has room:
> The Storyteller chooses how hard the town is: **Easy, Standard or Hard** (Chapter 8). This sets the list’s size, the Suspicion Limit and a few other numbers. It isn’t the same as an obstacle’s Difficulty (Chapter 3).

In Chapter 4, optionally: "4 items on Easy, 5 on Standard and Hard (the town’s difficulty, Chapter 1)". Part B's C8-9 fixes the Chapter 8 side and offers a new name as an option (needs Richard).

**Length.** Chapter 1 +39 words (+4 lines); Chapter 4 ±0 (+5 with the pointer).

### C4-2 · The Shopping List: essentials and extras
**Class** 8 (numbers stated elsewhere), also 3 · **Severity** medium

> "One or two are essentials; the rest are extras."

**Problem.** It doesn't say why the split matters, which is the whole goal of the raid: a Win needs every essential, with at most one extra missing (Chapter 7). It doesn't say how many are essential either (Easy 1, Standard 1 or 2, Hard 2: Chapter 8). A player planning the night can't set priorities.

**Rewrite.**
> One or two are essentials; the rest are extras. To win, bring home every essential, with at most one extra missing (Chapter 7).

Optionally, the counts: "One is an essential on Easy, one or two on Standard, two on Hard."

**Length.** +14 words (+26 with the counts).

### C4-3 · The Shopping List: six kinds
**Class** 8 (stated elsewhere) · **Severity** low

> "Each item is one of six kinds (Chapter 2)."

**Problem.** The kinds are the "Shops for" column of Chapter 2's Castle Duties table, and the pointer doesn't say so. Why the kind matters (it decides whose Castle Duty gives an edge there) is only in Chapter 8.

**Rewrite.**
> Each item is one of six kinds (the “Shops for” column of the Castle Duties table, Chapter 2); its kind decides whose Duty gives an edge there.

**Length.** +18 words.

### C4-4 · The Town: an obstacle
**Class** 2 (named, not explained), also 4 · **Severity** medium

> "An obstacle: one or two traits that work, and a Difficulty. It is watched or not."

**Problem.** "Watched" is named but not explained. What it does (Trouble there gets you caught) comes only in Chapter 5. The definition also leaves out the obstacle's other marks, used on the same page and in Chapter 3: a loud way, and "group".

**Rewrite.**
> **An obstacle:** the traits that work (one may be the loud way, Chapter 3) and a Difficulty. It may be marked **watched** (Trouble there gets you caught, Chapter 5) and **group** (below).

**Length.** +16 words.

### C4-5 · The Town: a location
**Class** 6 (overloaded), also 7 · **Severity** medium

> "A location: 1–3 obstacles, crossed in order, guarding a list item (or two sharing a place); beat or pass the last and the loot is in your hand."

**Problem.** "(or two sharing a place)" packs a second case into a parenthesis. "Beat or pass" uses two verbs, and "pass" is never defined (C3-18). "The loot" replaces "list item" mid-sentence. The sentence doesn't say whose hand (the Entity who gets past the last obstacle) or that it takes no extra action.

**Rewrite.**
> **A location:** 1–3 obstacles, which you get past in order, guarding one list item (sometimes two, when two items share a place). Whoever gets past the last obstacle has the item in hand, with no extra action. Items in hand are **loot**.

**Length.** +14 words.

### C4-6 · The Town: two ways in, "keeps to it"
**Class** 3 (missing when / how long) · **Severity** medium · part **needs Richard**

> "Its two ways in are two versions of the first obstacle (say, front door or back window): the party picks one and keeps to it."

**Problem.** It doesn't say when the party picks, or how long "keeps to it" lasts: the rest of the raid, or until everyone there is past? It also doesn't say what happens when the party has split and one Entity arrives first.

**Rewrite** (the most likely reading of "keeps to it"; Richard to confirm the parts in italics):
> Its first obstacle comes in two versions, its two **ways in** (say, front door or back window). The party picks one *the first time anyone tries the location*, and everyone uses only that one there *for the rest of the raid*.

**Length.** +16 words.

### C4-7 · The Town: a watched location
**Class** 7 (one word for two things), also 8 · **Severity** medium

> "It’s watched if any obstacle is, either way in."

**Problem.** "Watched" now means two things. A watched **obstacle** gets you caught on Trouble. A watched **location** gets a Tell check (Chapter 5). This sentence doesn't say which, so readers think Trouble anywhere in a watched location gets you caught, and Chapter 5 has to correct it ("it’s the obstacle you roll that counts"). The sentence also isn't quite true: Chapter 5 says a watched furniture obstacle doesn't make its location watched (V20).

**Rewrite.**
> A location is watched, for Tell checks (Chapter 5), if any of its obstacles is, on either way in (the furniture’s aside). Being caught depends only on the obstacle you roll.

**Length.** +22 words.

### C4-8 · The Town: places, and the lock-up
**Class** 7 (inconsistent terms), also 8 · **Severity** low

> "The way out of town, always watched." (the list's last item) / Chapter 3: "at the same place (a location, the way out or the lock-up)" / "a roll at its location" (Turns)

**Problem.** The book uses "place" for a location, the way out and the lock-up (Chapters 3 and 5; Chapter 4's "visit every place"). But the town list names only locations and the way out. The lock-up is a place the party can move to (Chapter 6), and the list leaves it out. "A roll at its location" (Turns) leaves out rolls at the way out and the lock-up. Part B's C6-9 makes the same point from Chapter 6.

**Rewrite.** Add a fourth item and one line:
> - **The lock-up**, where captives are held (Chapter 6), always watched.
>
> A **place** is any of these: a location, the way out or the lock-up.

In Turns, "a roll where it is" (C4-10).

**Length.** +24 words, +2 lines.

### C4-9 · Turns: "gets in"
**Class** 7 (inconsistent terms) · **Severity** low

> "The party starts at the edge of town, by the way out, and gets in without a roll."

**Problem.** "Gets in" comes a few lines after a location's "ways in", so it can be read as getting into a location free. It means entering the town. "By the way out" leaves open whether the party is at that place (it is, and Chapter 5's Tell rule counts the way out only "when anyone first comes back to it").

**Rewrite.**
> The party starts at the edge of town, at the way out; entering the town needs no roll.

**Length.** ±0.

### C4-10 · Turns: the actions
**Class** 4 (options run together), also 6 · **Severity** medium

> "Each Turn, every Entity takes one action: a roll at its location, a move, picking up, or waiting (any move takes one Turn unless the map says otherwise). Entities act one at a time, in any order, and each result (a move too) counts at once. Several may try the same obstacle in one Turn; each try risks Trouble."

**Problem.**
- Four actions in one sentence, then their exceptions in a parenthesis.
- The sentence doesn't say a move goes to **any** place: there's no adjacency.
- The two-Turn carried move comes only in Carrying.
- "Each result (a move too) counts at once" doesn't say what follows from it. Someone who moves has arrived. An obstacle one Entity beats is already beaten for the next Entity to act in the same Turn.

**Rewrite** (a list):
> Each Turn, every Entity takes one action:
> - **Roll** at the next obstacle where it is.
> - **Move** to any other place. A move takes one Turn (two when carrying furniture, below; a map may say otherwise).
> - **Pick up** dropped items (below).
> - **Wait.**
>
> Entities act one at a time, in any order, and each result counts at once: an Entity who moves has arrived, and an obstacle one Entity beats is already beaten for the next to act. Several may try the same obstacle in one Turn; each try risks Trouble.

**Length.** +30 words, +4 lines.

### C4-11 · Turns: advice in the rules
**Class** 5 (advice mixed into rules) · **Severity** low

> "The party may split up, and on Standard and Hard it usually should: there’s rarely time to visit every place together."

**Problem.** Advice sits inside the rules paragraph, so the reader can't tell it isn't a rule.

**Rewrite.**
> The party may split up. *On Standard and Hard it usually should: there’s rarely time to visit every place together.*

**Length.** −1 word.

### C4-12 · Turns: what stays beaten
**Class** 8 (condition stated elsewhere), also 6 · **Severity** low

> "Once anyone beats an obstacle (a Success or a Cost), it stays beaten for the whole party, unless it’s marked group (a crowd, a guard who checks everyone): then each Entity who wants past rolls for itself."

**Problem.** It leaves out the other exception, from Chapter 3: an obstacle someone got past with its own approach isn't beaten for the others. The general rule and its exception also share one sentence.

**Rewrite.**
> Once anyone beats an obstacle (a Success or a Cost), it stays beaten for the whole party, with two exceptions:
> - A **group** obstacle (a crowd, a guard who checks everyone): each Entity who wants past rolls for itself.
> - An obstacle someone got past with its own approach (Chapter 3): the others must still beat it.

**Length.** +18 words, +2 lines.

### C4-13 · Turns: the group check
**Class** 3 (missing whether / how), also 6 · **Severity** medium

> "When several roll it in the same Turn (a group check), all declare their dice and abilities, then roll together; Suspicion rises only once, by the biggest trigger among their rolls."

**Problem.**
- It reads as optional: could two Entities at a group obstacle roll one after the other, as the rest of the Turn allows ("Entities act one at a time")? The book and the rules summary mean that rolling it in the same Turn **is** a group check, an exception to acting one at a time.
- The sentence doesn't say each Entity gets past on its own result.
- "Trigger" is Chapter 5's word.

**Rewrite.**
> If two or more Entities roll the same group obstacle in one Turn, they make one **group check** instead of acting one at a time: all declare their dice and abilities, then all roll at once. Each gets past on its own result. Suspicion rises only once for the whole check, by the biggest trigger among the rolls (Chapter 5).

**Length.** +29 words.

### C4-14 · Furniture: "2 harder"
**Class** 6 (overloaded), also 3 · **Severity** medium

> "One piece of furniture or decor (Chapter 8) stands at one of the list’s locations, behind one extra obstacle, 2 harder (at most 12)."

**Problem.** "2 harder" than what? The rule (Chapter 8) is that the extra obstacle is rolled like any other, then its Difficulty goes up by 2, to at most 12. Readers take it as 2 harder than the location's last obstacle. That the extra obstacle comes after the location's others is only implied by the next sentence.

**Rewrite.**
> One piece of furniture or decor (Chapter 8) stands at one of the list’s locations, behind one extra obstacle of its own, after the location’s others. That obstacle’s Difficulty is 2 higher than it would otherwise be (at most 12).

**Length.** +16 words.

### C4-15 · Carrying: who is a carrier
**Class** 7 (one word for two things), also 6 · **Severity** medium

> "Bulky pieces need one carrier, Huge two (not through an entrance a map marks small). Carriers can’t use the Mask; their Nimble is one size smaller."

**Problem.**
- "Carriers" means furniture carriers. But the book also says "carry" for loot (Chapter 2: "carries loot or furniture"; "Loot has no limit" a few lines down). A reader can think anyone carrying loot loses the Mask and a Nimble size.
- The parenthesis seems to cover Bulky pieces too. It is only for Huge ones (CORE: "Huge pieces don't fit small entrances").
- Which pieces are Bulky or Huge is in Chapter 8's furniture table, and there's no pointer.

**Rewrite.**
> - A **Bulky** piece needs one carrier, a **Huge** piece two (Chapter 8 says which is which). A Huge piece can’t go through an entrance a map marks small.
> - While you carry a piece, you can’t use the Mask, and your Nimble is one size smaller. Carrying loot doesn’t do this.

**Length.** +23 words, +1 line.

### C4-16 · Carrying: a carried move
**Class** 3 (missing how / what meanwhile), also 6 · **Severity** medium

> "Carrying, a move takes two Turns: you’re between places until you act in the second."

**Problem.** "Act in the second" doesn't say you spend your action in the next Turn to finish the move. "Between places" doesn't say where you are meanwhile: at neither place. That matters for helping and for Tells.

**Rewrite.**
> Carrying a piece, a move takes your action in two Turns in a row. After the first you’re **between places**, at neither one. You arrive when you take your action in the second.

**Length.** +18 words.

### C4-17 · Carrying: taking, noise and abandoning
**Class** 4 (several rules run together), also 1 and 6 · **Severity** medium

> "Taking a piece is free (taking it back up is an action); drop it any time but in a local chase. Once taken, it raises Suspicion by 1 at the end of each Turn, even set down, until it’s carried out of town, lost or abandoned (free: it stays put, goes quiet, can’t be taken again)."

**Problem.**
- Five rules in two sentences.
- Abandoning, the one way to stop the noise, is buried in the last parenthesis.
- "Lost" isn't explained: it means taken back when its carrier is captured (Chapter 6).
- "Taking" and "taking it back up" use one verb for two costs: free and an action.

**Rewrite** (a list; dropping moves to C3-7's block):
> - Taking the piece, once you’re past its obstacle, is free. Taking it back up after it’s been set down is an action.
> - From the Turn it’s first taken, it raises Suspicion by 1 at the end of each Turn, even while set down.
> - That stops when it’s carried out of town, lost (the town takes it back when its carrier is captured, Chapter 6) or abandoned.
> - You may **abandon** it at any time, free: it stays where it is, makes no more noise, and can’t be taken again.

**Length.** +32 words, +3 lines (the dropping clause moves to C3-7's block).

### C4-18 · Carrying: loot
**Class** 3 (missing what / when) · **Severity** low

> "Loot has no limit; hand it over free in the same place."

**Problem.** "No limit" on what? It means how much one Entity can carry. "Hand it over" doesn't say when (any time, not only as your action), and the exceptions are in Chapter 6: nothing is handed over once caught, and nothing to a captive.

**Rewrite.**
> An Entity can carry any amount of loot, and can hand it to another Entity in the same place at any time, free (not while it's in a local chase, and never to a captive: Chapter 6).

**Length.** +23 words.

### C4-19 · Getting Out: the Difficulty
**Class** 8 (numbers stated elsewhere) · **Severity** medium

> "The way out is one watched obstacle: Sly or Nimble, or Brawn the loud way."

**Problem.** The way out's Difficulty appears nowhere in Part One. It is 6 on Easy, 8 on Standard and 10 on Hard (Chapter 8 and At the Table). Everything else needed to roll it is here.

**Rewrite.**
> The way out is one watched obstacle: Sly or Nimble, or Brawn the loud way, at Difficulty 6 on Easy, 8 on Standard and 10 on Hard.

**Length.** +12 words.

### C4-20 · Getting Out: leaving together, and "free"
**Class** 6 (overloaded), also 2 · **Severity** medium

> "The party leaves together: everyone not captured is there, and one rolls for all. A Success or a Cost gets everyone out, free."

**Problem.**
- "Everyone not captured is there" reads like a description. It is a condition: nobody may roll the way out until every Entity who isn't captured is at the way out.
- "Free" leaves the reader asking what is free. It means a Cost here costs nothing (Chapter 8: "A Cost at the way out costs nothing"; part B's C8-16).
- Not said here: anyone still captured is left behind (Chapters 6 and 7).

**Rewrite.**
> The party leaves together. One Entity rolls for everyone, but only when every Entity who isn’t captured is at the way out. A Success or a Cost gets everyone out; a Cost here costs nothing. Anyone still captured is left behind (Chapter 7).

**Length.** +20 words.

---

## Chapter 5: Suspicion

(The opener's "11 on Easy and Standard, 15 on Hard" is covered by C4-1.)

### C5-1 · The Loud Way box
**Class** 6 (cryptic wording) · **Severity** low

> "A trait the obstacle lists as loud is loud however you came to roll it."

**Problem.** "However you came to roll it" is cryptic. It means that if an ability makes you roll the obstacle's loud trait (Brute Force where the loud way is Brawn), it's still loud. The other half isn't said: a trait the obstacle doesn't list, rolled with your own approach, is never loud. The online version works the same way.

**Rewrite.**
> If an ability makes you roll the trait the obstacle lists as loud (say, Brute Force at a door whose loud way is Brawn), that’s still the loud way. A trait the obstacle doesn’t list, rolled with your own approach, is never loud.

**Length.** +28 words.

### C5-2 · What Raises It and One Roll, One Rise
**Class** 3 (missing which / how), also 2 · **Severity** low

> "One roll raises Suspicion only once, by its biggest trigger (overdraw included). Good results never lower it." (and the table's rows "A Tell goes off +1" and "Furniture taken, each Turn (even set down) +1")

**Problem.** The table mixes rises that come from a roll (Trouble, the Monster, the loud way, a Cost, overdraw) with two that don't (a Tell, the furniture), and the box doesn't say which is which. A reader can't tell whether the furniture's +1 at the end of a Turn is swallowed by a roll's rise. "By its biggest trigger" has no example, and Chapter 3's Cost rule (C3-8) depends on it.

**Rewrite.**
> One roll raises Suspicion only once, by its biggest trigger (overdraw included): the loud way and the Monster showing on one roll make +2, not +3. A Tell and the furniture aren’t rolls: each adds its own +1. Good results never lower it.

A table would read better: add a third column, "From a roll?" (yes for the first five rows, no for the last two).

**Length.** +26 words, +3 lines.

### C5-3 · Tells: when to check
**Class** 4 (cases run together), also 6 · **Severity** medium

> "The first time anyone reaches each watched location (a watched furniture obstacle doesn’t count; the lock-up does, and the way out when anyone first comes back to it; not a captive being brought in), check once, however the party has split: roll a d6, and on 4–6 a Tell goes off."

**Problem.** Four cases sit in one parenthesis, separated by semicolons, in the middle of the sentence that gives the basic rule. "However the party has split" is cryptic. It means one check per location for the whole party, not one per Entity or per group.

**Rewrite.**
> The first time anyone reaches a watched location (Chapter 4), roll a d6: on **4–6** a Tell goes off. Each place is checked once a raid, for the whole party.
> - The lock-up counts as watched, but a captive being brought in doesn’t set off its check.
> - The way out counts the first time anyone comes back to it (not at the start).
> - A watched furniture obstacle doesn’t make its location watched.

**Length.** +20 words, +3 lines.

### C5-4 · Tells: whose, and who rolls
**Class** 3 (missing who / how / when), also 2 and 5 · **Severity** medium · part **needs Richard**

> "Roll to see whose, among the Entities arriving (all who move there in the same Turn): its Tell shows (Chapter 2), and Suspicion rises by 1."

**Problem.**
- It doesn't say how to pick among two to five Entities, or who rolls the d6. The online version gives the check to the Storyteller.
- "All who move there in the same Turn" clashes with Chapter 4's "each result (a move too) counts at once". If the first arrival is checked at once, those who arrive later that Turn haven't arrived yet. It decides whose Tell can show and whether the Witch's Familiar's Warning covers a later arrival.
- "Its Tell shows" can be read as a further effect. Chapter 2's Tells are description only.

**Rewrite** (Richard to confirm the part in italics):
> *The Storyteller makes the check once everyone moving there this Turn has arrived.* If several Entities are arriving (all who move there in the same Turn), pick one at random: number them and roll a die, rolling again on a number nobody has. Describe its Tell (Chapter 2). The only effect is Suspicion +1.

**Length.** +28 words.

### C5-5 · Getting Caught
**Class** 6 (cryptic parenthesis), also 7 · **Severity** medium

> "Trouble at a watched obstacle (it’s the obstacle you roll that counts) gets the Entity caught, and a local chase starts (Chapter 6). … Trouble where nobody is watching still raises Suspicion, but starts no chase."

**Problem.** The parenthesis answers a question the reader hasn't asked yet. It means the location being watched (Chapter 4) doesn't matter here: only the obstacle you rolled does (C4-7). "Where nobody is watching" goes back to Chapter 3's story phrase instead of "an unwatched obstacle".

**Rewrite.**
> Trouble at a watched obstacle gets the Entity caught, and a local chase starts (Chapter 6). Only the obstacle you rolled counts: Trouble at an unwatched obstacle starts no chase, even in a watched location. It still raises Suspicion.

**Length.** +4 words.

### C5-6 · At the Limit: "the whole town hunts"
**Class** 7 (one thing, four names) · **Severity** low

> "When Suspicion reaches the Limit — or dawn comes with anyone still in town — the whole town hunts."

**Problem.** "The whole town hunts" (here), "once the hunt is on" (Chapter 3), "Once the Hunt Is On" (Chapter 6) and "the final flight" are four names for one phase, and the book never ties them together. A reader can't be sure "the hunt" is the final flight.

**Rewrite.**
> When Suspicion reaches the Limit — or dawn comes with anyone still in town — **the hunt is on**: every Entity who isn’t captured flees together in the **final flight** (Chapter 6).

Then use "the final flight" (or "the hunt") consistently. Chapter 3's overdraw line (C3-12) already says "in the final flight".

**Length.** ±0 (it takes in the next sentence).

### C5-7 · At the Limit: during a local chase
**Class** 6 (overloaded) · **Severity** medium

> "If the Limit comes during a local chase, that chase ends at once (even if a runner pushed it there on purpose) and those Entities join the flight; anyone the same round cornered is captured first and stays behind."

**Problem.** "Anyone the same round cornered" takes two readings. It means anyone cornered in the round that brought the Limit. The "on purpose" parenthesis hints at a tactic without saying how (a runner's own roll in a local chase can raise Suspicion), and it breaks up the rule.

**Rewrite.**
> If the Limit comes during a local chase, that chase ends at once, even if a runner’s own roll brought it there on purpose, and its runners join the final flight. But anyone cornered in that same round is captured first, and stays behind at the lock-up.

**Length.** +8 words.
