# Text-clarity audit, part C: Chapter 2, Chapter 9, the Entity Sheet and At the Table (2026-10-07)

Four parts of the book were read as text, in order: Chapter 2 (`book/src/chapters/12-ch02.html`): the introduction and the eight entries now generated from the game data. Chapter 9 (`32-ch09.html`): the opener, the fixed wording of the three town pages, and the example of play. The Entity Sheet (`40-entity-sheet.html`). At the Table (`41-reference.html`). The reader in mind is a first-time player or Storyteller. In Chapter 2 that reader has read only Chapter 1. In Chapter 9, the whole book. On the two sheets, nothing: every label and line has to work at the table without opening a chapter. The question was the one Richard raised about Chapter 2's powers. Can the reader tell what a rule costs, exactly what to do at the table, when it doesn't apply, and which words are rules and which are flavour? Layout was checked in the built PDF (`book/dist/Dont_Get_Forked_v0.1.pdf`, built 2026-10-07 18:57 with the spelled-out entries).

Nothing in the book or the data was changed. Every rewrite below restates a rule the book already has (Chapters 3–7), checked against `docs/CORE-RULES.md` (1.31), the Decisions log and `module/logic/` (plus `sim/engine.mjs` for Already Dead). None of the fixes needs a rule change, so none is marked **needs Richard**. Two touch content Richard owns: C2-22 (moving Trample's flavour line leaves it without flavour, and a new one would be setting text) and C2-6 (whether Hedge Spell keeps its own wording). Both are noted in the finding.

Severity: **high** = the reader can't act on the passage; **medium** = it needs a second reading or a lookup; **low** = polish. Passages are quoted from the source with the HTML (bold, italics) removed; italics are marked *thus* where they matter.

## Summary

Each finding is counted once, under its main class. Most also touch a second class, listed with the finding.

| Class | High | Medium | Low | Total |
|---|---|---|---|---|
| 1. Term used before it's explained | 1 | 2 | 3 | 6 |
| 2. Effect named, not explained | – | 2 | – | 2 |
| 3. Missing who / when / how often / cost / duration / failure | – | 5 | 4 | 9 |
| 4. Several options or cases run together | – | – | 1 | 1 |
| 5. Flavour mixed into rules | – | 1 | 1 | 2 |
| 6. Overloaded sentence | – | 4 | 2 | 6 |
| 7. Inconsistent terms | 1 | 4 | 5 | 10 |
| 8. Numbers or conditions only stated elsewhere | 1 | 6 | 2 | 9 |
| Sheet / reference: too terse to act on alone | – | 5 | 6 | 11 |
| **Total** | **3** | **29** | **24** | **56** |

By area: Chapter 2, 23 findings (2 high: 8 in the introduction, 15 in the generated entries); Chapter 9, 11 (none high); the Entity Sheet, 10 (none high); At the Table, 12 (1 high).

**High:**
- **C2-2.** Chapter 2 never says what "the Monster shows" means (the Monster die rolling higher than your trait die: Suspicion +2), yet about twenty lines of the entries depend on it (eight "Monster without risking Suspicion" powers, Hypnotic Eyes, Rattle, the Draught, Steady Nerves, Pillar of Society).
- **C2-6.** Chapter 2 never says an ability can be spent on a friend's roll in the same place (Chapter 3, rule P7). Worse, Hedge Spell alone says "yours or a friend's" while every other entry says "your", so a first-time reader concludes only the Witch can help. That is the opposite of the rule, and it makes the example of play's Good Dog (Chapter 9, Turn 3) look like a mistake.
- **AT-5.** At the Table's "Carrying: moves take two Turns" reads as any carrying. The Entity Sheet's "Carrying (loot)" box uses the same word for loot. A first-time table will slow down everyone holding the cheese. Only furniture slows you.

**What to fix first.**
1. Page 6: define "shows" (C2-2). It fits in the left column's free lines.
2. Page 7: a short box under "The Eight" (C2-9). It would hold the four rules every entry leans on: help a friend (C2-6), one raise per roll and the d12 cap (C2-13), loud stays loud (C2-11), and where the terms are explained. Page 7 has about 15 empty lines. Pages 8–11 have little room, and every entry line is generated, so putting this fine print in each entry would cost far more space.
3. The generated wording, in `module/logic/power-text.mjs` (C2-10 open, C2-12 hidden, C2-14 the Weakness line) and in six Perk or signature texts in `module/config.mjs` (C2-16, C2-18, C2-19, C2-20, C2-21, C2-23). Then run `node book/tools/entity-entries.mjs`. The online sheet uses the same words, so it follows automatically.
4. At the Table: AT-5, AT-8 (when you're cornered), AT-9 ("everyone free"), AT-4 (helping).

**Overlaps with parts A and B.** The generated entries repeat four Chapter 3 phrases flagged in part A: C3-15 ("Trouble or a Cost still counts"), C3-16 and C3-18 ("Only you get past, except at the way out and the lock-up"), C3-17 ("at 2 lower Difficulty") and C3-14 ("the ground’s"). C2-10 and C2-12 here use the same wording as part A's rewrites, so if both are adopted, Chapter 3 and Chapter 2 will match. C2-6 and C9-10 match part A's C3-19 (helping). C2-20, C9-7 and AT-7 depend on part A's C5-4 (when the Tell check is made, and who picks whose Tell: **needs Richard** there). SH-5 matches part B's C6-15 (overdraw in the flight). AT-10 matches C6-14 (the majority rule). AT-8 matches C6-8 and C6-11 (the local chase; rescue and slipping free). Part A's C3-20 (two trait-changing abilities can't share a roll, ruling F2) also affects every "switch" entry here. It isn't repeated below.

**Where the generated text comes from.** In each Chapter 2 entry, everything after the dice line is written by `book/tools/entity-entries.mjs` from `DGF.entities` in `module/config.mjs`:
- **The four standard effects** (raise, switch, hidden, open): `powerRule()` in `module/logic/power-text.mjs`.
- **Hedge Spell and the Draught**: their own `signature.rule`.
- **Gift flavour**: each version's `text`.
- **Perks**: `perks[].text`, with the flavour split off by `perkParts()` using `perks[].flavour`.
- **Weakness timing**: `weaknessTiming` in `power-text.mjs`.
- **Tell**: `tell.text`.

The online Entity sheet shows the same `powerRule`/`perkParts` text (`test/sheet-powers.test.mjs`). `test/book-numbers.test.mjs` pins some exact phrases that rewrites below touch. Each finding says which phrase to keep or which test to update:
- "the Mask d6, passing as human, or the Monster d10"
- "Every Entity has 3 charges."
- "a second d6 also rolls 4–6"
- the regexes for "one size bigger", "^Roll X instead of the trait the obstacle calls for", "without risking Suspicion" and "roll X at 2 lower Difficulty"
- in Chapter 9: "The furniture’s obstacle is already 2 harder.", each town's numbers line, its furniture line and every row of its location key (step labels included), and many phrases of the example of play
- on the sheet: "it shows if it rolls higher than your trait die: Suspicion +2", "overdraw: Suspicion +2" and the Always/Soon boxes
- on At the Table: "(2 lower", the Final flight regex, "Local chase: Lead 1, escape at 4, against 8 + half the Suspicion (at most 12)", "The way out: Sly or Nimble, or Brawn the loud way; one roll for all." and "(Always: round 1; Soon: round 3)"

## Room on the full pages

Measured from the built PDF (page bottoms of each column).
- **Page 6 (Chapter 2's first page).** The right column (What Every Entity Has to the abilities box) is full to the bottom margin. The left column ends about six lines early, because the "What Every Entity Has" heading is bound to its list and moved to the right column. So up to about six lines can go into Five Traits and The Mask and the Monster with nothing moving (C2-1, C2-2). Anything added from What Every Entity Has onward must be balanced by a cut there: drop the bullet "Its dice arrangement." (−1 line, Five Traits says it), and the Castle Duty parenthesis in Three Picks (−1 line, page 7 says it again).
- **Page 7.** The right column ends after Dracula's Tell, with about 15 empty lines: Frankenstein's Creature's heading and portraits are kept together and start page 8. C2-6, C2-8 and C2-9 (about 9–10 lines) fit here. Dracula's heading and portraits still fit in the left column, and his text flows on into the right.
- **Pages 8–11 (the entries).** About 2–5 spare lines per column. Page 10 (the Ghost and the Witch) is tightest, with about 2 in the left column. Page 11 (Jekyll & Hyde) is half empty. Keep each generated rule to about +½ line, and put cross-cutting rules in the page-7 box.
- **Chapter 9.** Page 24 (the opener, the key paragraph and Puddlecombe) has about half a line spare. Pages 25–26 (Thistlewick, the example, Gallowsmere) have about one line before Gallowsmere's table is pushed. Additions to the key paragraph need C9-1's cut. Additions to the example need trims inside it, or Gallowsmere moved to a new page, which costs a page.
- **The Entity Sheet.** Full. SH-6 (+3 lines) is paid for by SH-8 (−1), dropping the one-line "Notes" field (−1) and shortening the intro line (−½).
- **At the Table.** The right column (Suspicion, Chases, How the Year Went) has about 3 lines spare; the left (The Roll, Abilities, Turns) has none, and the two columns re-balance. Cuts available: the intro line "The rules on one page. The chapters have the details." (−1), and the lock-up row of the numbers table (−1 row; it's 10 on every label, so say it once in AT-8). Priority if not everything fits: AT-5, AT-8, AT-9, AT-4, AT-10.

---

## Chapter 2: The Entities

### Introduction

### C2-1 · Five Traits: Jekyll & Hyde's two forms
**Class** 1 (term before it's explained) · **Severity** low

> "Jekyll & Hyde has two forms on one sheet, each with its own arrangement of the same five dice."

**Problem.** The reader learns there are two forms but not how one becomes the other, or where to look. "On one sheet" also promises something the Entity Sheet doesn't provide (SH-2).

**Rewrite.**
> …each with its own arrangement of the same five dice; he changes form with his signature, the Draught.

**Length.** +½ line, in page 6's left column (room).

### C2-2 · The Mask and the Monster: "shows" is never defined in Chapter 2
**Class** 1 (term before it's explained), also 8 · **Severity** high

> "The Monster is stronger, but it risks Suspicion (Chapter 3). Every Entity has the same pair."

**Problem.** "Risks Suspicion" doesn't say what the risk is, and "Suspicion" itself isn't glossed. The entries then use "the Monster shows" in about twenty lines:
- the eight "Roll the Monster die without risking Suspicion: if it shows…" powers;
- "the Monster shows only if it beats your trait die by 2" (Hypnotic Eyes);
- "The Monster showing on your roll is Suspicion +1, not +2" (Rattle);
- "When the Monster shows on one of Jekyll’s rolls" (the Draught);
- Steady Nerves and Pillar of Society.

The definition (the Monster die higher than your trait die's roll: Suspicion +2; a tie or the Mask shows nothing) is in Chapter 3, and what Suspicion is comes in Chapter 5. Without it, a first-time reader can't tell what Mist, Hypnotic Eyes or Rattle change, or why the Monster is a risk at all.

**Rewrite.**
> The Monster is stronger, but if it rolls higher than your trait die, the Monster **shows**: Suspicion, the town’s shared alarm, rises by 2 (Chapters 3 and 5). On a tie, or with the Mask, nothing shows. Every Entity has the same pair.

(Keep "the Mask d6, passing as human, or the Monster d10": a test pins it.)

**Length.** +2 lines, in page 6's left column, which has about six free. Nothing moves.

### C2-3 · What Every Entity Has: the Weakness and the Tell are named, not explained
**Class** 2 (effect named, not explained) · **Severity** medium

> "A Weakness: something the town can use against it." / "A Tell: how it gives itself away."

**Problem.** Neither says what happens in play. Each entry's Weakness line now does. But each entry's Tell line is description only ("Tell: No Reflection. *A shop window shows everyone but him.*"). So nowhere in Chapter 2 does a player learn that a Tell going off costs Suspicion +1, or when that can happen, and Familiar's Warning (C2-20) assumes they know.

**Rewrite.**
> - **A Weakness**: what the mob brings in a chase to make your trait die one size smaller (Chapter 6).
> - **A Tell**: how it gives itself away. When it goes off (a d6, the first time anyone reaches a watched place), Suspicion +1 (Chapter 5).

**Length.** +2 lines in page 6's right column, which is full. Offset: drop the bullet "Its dice arrangement." (−1) and take C2-4's −1.

### C2-4 · Three Picks: one sentence, three rules; "shared by all the Entities"
**Class** 6 (overloaded), also 7 and 3 · **Severity** medium

> "Every pick has a marked default, so a new player can skip the choices; to pick at random, roll a d6: 1–2 the first option, 3–4 the second, 5–6 the third (for the Castle Duty, roll on its table, rerolling one already taken)."
> "Castle Duty: one of the castle’s household jobs, shared by all the Entities, each with a small edge tied to the shopping list (hear it before you pick). No two Entities in a party take the same Duty."

**Problem.**
- The first sentence holds the defaults, the random roll and the Duty's exception to it.
- "Shared by all the Entities" reads as "every Entity has every Duty", which the next sentence contradicts. It means the same six jobs are open to every Entity.
- "Hear it before you pick": the list, or the edge? Who reads it out, and when?

**Rewrite.**
> Each Entity is premade, with three picks. Every pick has a marked default, so a new player can skip the choices. To pick at random, roll a d6: 1–2 the first option, 3–4 the second, 5–6 the third.
> - **Castle Duty:** one of six household jobs, the same six for every Entity, each with a small edge where one kind of list item is found (below). No two Entities in a party take the same Duty. The Storyteller reads out the shopping list before anyone picks.

The Duty's random roll is already in Castle Duties on page 7 ("rolls a d6, rerolling any Duty already taken"), so the parenthesis can go.

**Length.** About −1 line.

### C2-5 · Charges: the fiction stands in for the rule
**Class** 5 (flavour mixed into rules), also 8 · **Severity** low

> "Charges refill once a year, at the castle; any you don’t spend on a raid are lost, so spend them."

**Problem.** The reader has to translate "once a year, at the castle" into the rule: each raid starts with all 3, and nothing carries over. Nothing says what happens at zero (overdraw, Chapter 3), though the Entity Sheet and At the Table both name it.

**Rewrite.**
> Every Entity has 3 charges. One charge pays for one use of an ability. Every raid starts with all 3 (they refill at the castle, once a year), and unspent ones are lost, so spend them. At zero you can still overdraw, at a price (Chapter 3).

(Keep "Every Entity has 3 charges.": pinned.)

**Length.** +1 line in page 6's right column. Drop the last sentence if C2-3 and C2-4's cuts don't cover it.

### C2-6 · Helping a friend: never said, and Hedge Spell implies the opposite
**Class** 8 (stated only elsewhere), also 7 · **Severity** high

> Box: "A signature or a Gift costs a charge each time you use it and does one of four things: … Each still needs a roll (Chapter 3)."
> Wolf and six other raise powers: "Your trait die is one size bigger for this roll (a d8 becomes a d10)."
> Hedge Spell: "One trait die is one size bigger for one roll in the same place, yours or a friend’s (in a local chase, only yours)."

**Problem.** Chapter 2 never says that any signature or Gift can be spent on a friend's roll in the same place, costing the charge but not your action (Chapter 3; core rule P7). Nor does it say when to spend (before the roll). Worse, Hedge Spell spells out "yours or a friend's", while every other entry says "you" and "your". A first-time reader concludes that only the Witch can help others, which is the opposite of the rule. Then the example of play (Chapter 9, Turn 3: "the Werewolf spends a charge on Good Dog for her") looks like a mistake.

**Rewrite.** One line in the page-7 box (C2-9), restating Chapter 3 and Chapter 6:
> **Spend before you roll.** A signature or a Gift can go on any roll in the same place (a location, the way out or the lock-up): yours, or a friend’s, for your charge but not your action. Not on a friend’s roll in a local chase, and you can open an approach only on your own roll.

Hedge Spell can keep its own wording: "raise a die, any roll in the same place" is the approved description (C2). If Richard prefers every entry in one voice, the alternative is a neutral subject in `powerRule` ("The trait die is one size bigger for this roll"). Neither changes a rule.

**Length.** About 3 lines on page 7 (room). Putting it in the page-6 box instead needs +3 lines there, which page 6 doesn't have.

### C2-7 · The abilities box: names that don't match the entries; the heading vs Spectral
**Class** 7 (inconsistent terms) · **Severity** low

> Heading: "Abilities Never Pass Automatically". Text: "a bigger trait die, another trait, the Monster rolled safely, or an approach of your own"

**Problem.**
- The four names don't match the entries' words. No entry says "approach": they say "At an obstacle that doesn’t list Nimble, roll Nimble at 2 lower Difficulty". Chapter 3 and At the Table do say "approach", so the entries are the odd ones out. "Rolled safely" is looser than the entries.
- A page later, Spectral reads "You get past group obstacles without rolling". A first-timer who counts Perks as abilities (Chapter 2 calls them "edges", but never says they aren't abilities) sees a contradiction with the heading.

**Rewrite.**
> …a bigger trait die, a different trait, the Monster die without its Suspicion, or an approach of your own (a trait the obstacle doesn’t list) … Each still needs a roll (Chapter 3). Perks aren’t abilities: they cost nothing, and one, the Ghost’s Spectral, skips a roll.

If page 6 can't take it, put the Perk sentence in the page-7 box. Optionally, start the generated "open" rule with "Your own approach:" so the name and the rule meet.

**Length.** +1 line (page 6 needs a cut) or +1 on page 7.

### C2-8 · Castle Duties: two exceptions in a parenthesis, and "one raise" unexplained
**Class** 6 (overloaded), also 1 · **Severity** low

> "At a location whose list item is your Duty’s kind, your trait die is one size larger on your own rolls there (the furniture’s obstacle included; not in a chase); it counts as that roll’s one raise (Chapter 3)."

**Problem.** Two exceptions share one parenthesis. Then comes a rule ("one raise") without its consequence: at your Duty's location, no ability can raise the roll further (the Witch's Hedge Spell is wasted on her own Charm roll at the baker). "The furniture's obstacle" is a Chapter 4 term, with no pointer.

**Rewrite.**
> At a location whose list item is your Duty’s kind, your trait die is one size larger on your own rolls there, the furniture’s obstacle (Chapter 4) included, but never in a chase. That is the roll’s one raise: no ability can raise it further (Chapter 3).

**Length.** +½ line on page 7 (room).

### C2-9 · The Eight: "terms from Chapters 3–6", with no map
**Class** 1 (terms before they're explained) · **Severity** medium

> "The entries use terms from Chapters 3–6; a new player can take the defaults and come back to them."

**Problem.** True, but it doesn't say which terms or where to find them. The entries use: watched, the way out, the lock-up, Success, Cost, Trouble, Difficulty, the ground, local chase, flee alone, cornered, Lead, the Limit, the final flight, group obstacles, a Huge piece, carrying, a Tell check, the loud way, an action, a Turn. A reader who wants to understand Fetch or Already Dead has to search four chapters.

**Rewrite.** The pointer, then the short box that C2-6, C2-11 and C2-13 need:
> The entries use terms from later chapters: rolls, Success, Cost, Trouble and Difficulty (Chapter 3); obstacles, watched and group, Turns, carrying and the way out (Chapter 4); Suspicion, the loud way, Tells and the Limit (Chapter 5); chases, the ground, the Lead, the lock-up and the final flight (Chapter 6). A new player can take the defaults and come back to them.
>
> **Box: Using an Entry**
> - **Spend before you roll.** (C2-6's line.)
> - **One raise per roll,** from any source, your Castle Duty’s included; a d12 can’t go higher.
> - **Loud stays loud:** a trait the obstacle lists as its loud way is loud however you came to roll it.

**Length.** +3 lines (intro) and about 7 (box) on page 7, which has about 15 spare. Check after the build that Dracula's heading and portraits still sit in the left column.

### The generated entries

### C2-10 · The "open" rule: the exception names places, not what happens there
**Class** 3 (missing what happens), also 8 · **Severity** medium · **Source** `powerRule()`, effect "open"

> Mesmerise (and Mountain Stride, Royal Bearing, Through the Hedge, Through the Gap, Through the Wall, Broomstick, Trample): "At a watched obstacle that doesn’t list Charm, roll Charm at 2 lower Difficulty. Only you get past, except at the way out and the lock-up (Chapter 3). Never in a chase."

**Problem.**
- "Except at the way out and the lock-up" names an exception without saying what happens there. At the way out, everyone leaves. At the lock-up, a rescue frees every captive, and a captive may also use it to slip free.
- Nothing says Trouble still gets you caught if the obstacle is watched (Chapter 3: "watched as usual"). A reader can take a power like Through the Wall (*It drifts in where there’s no door*) as a way past the watcher.
- "2 lower" can be read as two steps of the ladder (part A, C3-17).

**Rewrite.**
> At an obstacle that doesn’t list Charm, roll Charm at a Difficulty 2 lower, watched as usual. Only you get past, but the way out still takes everyone, and a rescue still frees every captive (Chapter 3). Never in a chase.

(If "at 2 lower Difficulty" is kept, the test's regex needs no change; with "at a Difficulty 2 lower", update `test/book-numbers.test.mjs`. Through the Wall keeps its "Not while you carry loot or furniture" sentence.)

**Length.** About +½ line per entry, eight entries.

### C2-11 · The "switch" rule: a loud trait stays loud
**Class** 8 (condition stated elsewhere) · **Severity** medium · **Source** `powerRule()`, effect "switch"

> Bat (and Brute Force, Ancient Lore, Keen Nose, Work It Out, Whisper, A Potion for That): "Roll Nimble instead of the trait the obstacle calls for (in a chase, instead of the ground’s)."

**Problem.** The reader isn't told that a trait the obstacle lists as its loud way stays loud (Chapter 5's box). Take Brute Force at "A locked front door: Sly (pick the lock) / Brawn (kick it in)". It reads as "kick it in quietly". In fact Brute Force is wasted there: Brawn is already allowed, and it costs Suspicion +1 whatever the result. "The ground" is a Chapter 6 term (covered by C2-9's pointer).

**Rewrite.** The "Loud stays loud" line in the page-7 box (C2-9). Or, in `powerRule`:
> Roll Nimble instead of the trait the obstacle calls for (in a chase, instead of the ground’s). If the obstacle lists Nimble as its loud way, it’s still loud.

(The test pins the start, "Roll X instead of the trait the obstacle calls for": keep it.)

**Length.** Box: counted in C2-9. Per entry: +½ line × 7.

### C2-12 · The "hidden" rule: "Roll the Monster die without risking Suspicion"
**Class** 2 (effect named, not explained), also 6 and 1 · **Severity** medium · **Source** `powerRule()`, effect "hidden"

> Mist (and Hovel Watcher, Just a Costume, Good Dog, Unseen, Fade, Black Cat, Pillar of Society): "Roll the Monster die without risking Suspicion: if it shows, Suspicion doesn’t rise for it (Trouble or a Cost still counts)."

**Problem.** Reading it for the first time:
- "Roll the Monster die" sounds like an extra die. It's your usual second die, taken instead of the Mask.
- "If it shows" is undefined in this chapter (C2-2).
- "Still counts": counts for what? It means Trouble still raises Suspicion and still gets you caught at a watched obstacle. The loud way still adds its 1, and the Storyteller can still pick Suspicion +1 as a Cost. A reader can take "still counts" as "still counts as a result".

**Rewrite** (part A's C3-15 wording, shortened):
> Take the Monster d10 as your second die without risking Suspicion: if it shows, that adds nothing. Trouble (caught if watched), the loud way or a Cost of Suspicion +1 still adds its 1.

(Keeps "without risking Suspicion", which the test pins.)

**Length.** +½ line per entry, eight entries.

### C2-13 · The "raise" rule: the d12 cap and the one raise
**Class** 8 (condition stated elsewhere) · **Severity** medium · **Source** `powerRule()`, effect "raise", and Hedge Spell's `signature.rule`

> Wolf (and Book-Learned, Old Curse, Howl, Poltergeist, Chill, Doctor’s Bag): "Your trait die is one size bigger for this roll (a d8 becomes a d10)."

**Problem.**
- A d12 can't go higher: Wolf on Dracula's Charm d12 does nothing.
- A roll takes one raise only, so a raise is wasted on a roll your Castle Duty already raises.
- Not said either: a raise cancels a step down (a Weakness, a "smaller die" Cost), which is how the example of play uses Hedge Spell.

**Rewrite.**
> Your trait die is one size bigger for this roll (a d8 becomes a d10; a d12 can’t go higher).

Plus the "One raise per roll" line in the page-7 box (C2-9). Optionally add to that line: "a raise also cancels a step down".

**Length.** +4 words per entry, usually no new line.

### C2-14 · The Weakness line: "Always:" reads as an adverb
**Class** 7 (term read two ways), also 3 · **Severity** low · **Source** `weaknessTiming` in `power-text.mjs`

> "Weakness: Garlic. Always: from the first round of any chase, your trait die is one size smaller."

**Problem.** "Always:" first reads as "always, your trait die is smaller", until the rest of the sentence corrects it. It is the timing's name (Chapter 6; the sheet's checkbox). The line also doesn't say how long the effect lasts (to the end of that chase).

**Rewrite.**
> Always (from round 1): in any chase, from its first round to its end, your trait die is one size smaller.
> Soon (from round 3): in any chase, from its third round to its end, your trait die is one size smaller.

**Length.** +3 words; usually no new line.

### C2-15 · "1 easier", "2 lower Difficulty", "bigger", "larger"
**Class** 7 (inconsistent terms) · **Severity** low · **Source** `perks[].text` for fearTheCurse, shortcut and fetch

> Fear the Curse: "the mob in your local chase is 1 easier". Shortcut: "The way out is 2 easier when you roll it". Fetch: "The way out is 1 easier". The open rule: "roll Charm at 2 lower Difficulty". Entries: "one size bigger"; Castle Duties and At the Table: "one size larger".

**Problem.** The same thing is said two ways, a page apart. "The mob is 1 easier" leaves the reader to work out that the mob's Difficulty drops by 1.

**Rewrite.** "The mob’s Difficulty in your local chase is 1 lower"; "The way out’s Difficulty is 2 lower when you roll it"; Fetch likewise. Pick "bigger" or "larger" for raises and use it book-wide. (Keep the numbers: the test checks them against `DGF.perkRules`.)

**Length.** +1 word each.

### C2-16 · Fetch: two edges in one sentence
**Class** 6 (overloaded) · **Severity** medium · **Source** `perks[fetch].text`

> "Fetch: The way out is 1 easier, whoever rolls it, while you’re there, and a final flight you’re in starts at Lead 3. *You know the way home.*"

**Problem.** Two unrelated edges and two conditions in one sentence. Because "while you’re there" comes after "whoever rolls it", it's unclear whose presence counts. The "one option per line" idea breaks here.

**Rewrite.**
> Two edges. While you’re at the way out, it’s 1 easier for whoever rolls it. A final flight you’re in starts at Lead 3 (not 2). *You know the way home.*

**Length.** +½ line.

### C2-17 · Out of Sight: only the limit is stated
**Class** 3 (missing what still happens) · **Severity** low · **Source** `perks[outOfSight].text`

> "Out of Sight (default): Trouble gets you caught only while you or anyone in the same place carries loot or furniture."

**Problem.** Phrased as a limit on getting caught, it leaves the reader wondering whether that Trouble still costs Suspicion (it does). It also doesn't say this is about watched obstacles (Trouble at an unwatched one never catches anyone).

**Rewrite.**
> Trouble at a watched obstacle doesn’t get you caught unless you, or anyone in the same place, carries loot or furniture. It still raises Suspicion.

(Keeps V17/V22's "anyone in the same place".)

**Length.** +½ line.

### C2-18 · Spectral: three clauses and an exception
**Class** 6 (overloaded), also 1 and 7 · **Severity** medium · **Source** `perks[spectral].text`

> "Spectral (default): You get past group obstacles without rolling and without using your action, even in a Turn you move; not while you carry loot or furniture."

**Problem.**
- "Group obstacles" is a Chapter 4 term (the ones each Entity must beat for itself), with no pointer.
- "Even in a Turn you move" is the useful part: move there and get past in the same Turn, or get past and still roll the next obstacle. It's buried mid-sentence.
- It seems to contradict the page-6 heading "Abilities Never Pass Automatically" (C2-7).

**Rewrite.**
> Group obstacles (the ones each Entity must pass for itself) don’t stop you: no roll and no action, so you can still move or roll that Turn. Not while you carry loot or furniture.

**Length.** About ±0.

### C2-19 · Already Dead: the "instead" comes last, and what you keep is missing
**Class** 6 (overloaded), also 3 · **Severity** medium · **Source** `perks[alreadyDead].text`

> "Already Dead: Cornered in a local chase, you’re back where you were caught and lose your next Turn instead of being captured (if the Limit comes that round, you just join the final flight)."

**Problem.**
- The effect comes before the "instead of" that frames it, and the Limit case sits in a parenthesis.
- The line leaves out what a reader most wants to know: you keep what you carry. Capture would take it away. The online version and the simulator only cost the Turn (`corneredFates` in `module/logic/chase.mjs`).
- "You just join" doesn't say whether the Turn is still lost. It isn't: the flight starts at once.

**Rewrite.**
> Cornered in a local chase, you aren’t captured: you’re back where you were caught, still carrying what you had, and you lose your next Turn. If the Limit comes that round, you simply join the final flight.

**Length.** +½ line.

### C2-20 · Familiar's Warning: "a Tell check goes off"
**Class** 7 (inconsistent terms), also 1 and 3 · **Severity** medium · **Source** `perks[familiarsWarning].text`

> "Familiar’s Warning (default): When you arrive (alone or with others), a Tell check goes off only if a second d6 also rolls 4–6. *The cat warns you.*"

**Problem.**
- "A Tell check goes off" mixes two things. The check is the d6 roll; the Tell is what goes off (Chapter 5: "roll a d6, and on 4–6 a Tell goes off").
- "When you arrive" covers only arrivals that get a Tell check: the first time anyone reaches each watched place.
- It protects everyone arriving with her (the simulator squares the chance for the whole group), but "(alone or with others)" only hints at that.
- Chapter 5 never uses the name "Tell check" ("check once"), though this entry and Chapter 9 do.

**Rewrite.**
> When you arrive somewhere that gets a Tell check (Chapter 5), alone or with others, a Tell goes off only if a second d6 also rolls 4–6. That covers everyone arriving with you. *The cat warns you.*

(Keeps the pinned "a second d6 also rolls 4–6". In Chapter 5, outside this part, bold **Tell check** where it's defined. When the check is made depends on part A's C5-4, which needs Richard.)

**Length.** +½ line.

### C2-21 · The Draught: "Hyde takes over at once"
**Class** 3 (missing when) · **Severity** medium · **Source** Jekyll & Hyde's `signature.rule`

> "When the Monster shows on one of Jekyll’s rolls, Hyde takes over at once, free."

**Problem.** "At once" can be read as "for this roll", re-scoring it with Hyde's dice. In fact the roll stands, and the form changes after it (the online version's roll card shows the change after the result). Also unclear: how long Hyde lasts after a free change (until a draught changes him back, like any change).

**Rewrite.**
> When the Monster shows on one of Jekyll’s rolls, that roll stands and Hyde takes over straight after it, free, until a draught changes him back.

**Length.** +½ line.

### C2-22 · Pillar of Society and Trample: rules set as flavour
**Class** 5 (flavour mixed into rules) · **Severity** medium · **Source** `gift.versions[pillarOfSociety].text` and `[trample].text`

> Pillar of Society: "…(Trouble or a Cost still counts). *A respectable doctor having a funny turn (if the Monster shows, Hyde still takes over).*"
> Trample: "…Never in a chase. *A d4 as Jekyll, a d12 as Hyde.*"

**Problem.** Italics mark flavour, and the Chapter 2 rewrite taught readers to skip them for rules. So the one rule that matters here gets missed: when the Monster shows, it costs no Suspicion but still turns Jekyll into Hyde. Trample's line isn't flavour either. It's a warning that the approach is weak as Jekyll.

**Rewrite.** Give a Gift version a rule-side note that `powerRule` adds after the standard wording (for example a `note` field), and leave only flavour in `text`:
> **Pillar of Society:** …still adds its 1. On Jekyll’s roll, Hyde still takes over if it shows. *A respectable doctor having a funny turn.*
> **Trample:** …Never in a chase. Your Brawn is a d4 as Jekyll, a d12 as Hyde.

Trample is then left without flavour. A new flavour line would be new setting text: Richard's call.

**Length.** ±0.

### C2-23 · Steady Nerves: worded like Hypnotic Eyes, but does something else
**Class** 3 (missing what still happens), also 7 · **Severity** medium · **Source** `perks[steadyNerves].text`

> "Steady Nerves: Hyde takes over only if the Monster beats your trait die by 2 or more."

**Problem.** It's worded like Dracula's Hypnotic Eyes ("the Monster shows only if it beats your trait die by 2 or more"), but it changes something else. When the Monster beats your trait die by 1, it still shows (Suspicion +2); only the change to Hyde waits for 2 (`DGF.perkRules.steadyNerves` is `formMargin`, not `showMargin`). Nor does it say this is about Jekyll's rolls.

**Rewrite.**
> On Jekyll’s rolls, Hyde takes over only if the Monster beats your trait die by 2 or more. Beating it by 1 still shows: Suspicion +2.

**Length.** +½ line.

---

## Chapter 9: Three Towns

### C9-1 · Opener: "villagers (its faces), numbers"
**Class** 1 (term before it's explained), also 5 · **Severity** low

> "Three towns ready to raid, one for each difficulty, each with its list, locations, obstacles, furniture, Lantern Night custom, villagers (its faces), numbers and map."

**Problem.** "Faces" is Chapter 8 shorthand for the people watching at a watched obstacle. "Numbers" doesn't say which. Nothing on the town pages says that the custom and the villagers are colour, not rules (Chapter 8 does).

**Rewrite.**
> Three towns ready to raid, one for each difficulty, each with a map and everything needed to run it.

…and in the next paragraph: "The Lantern Night custom and the villagers are colour: the villagers are the faces at watched obstacles."

**Length.** −1 line in the opener, +1 in the key paragraph (the room C9-2 needs).

### C9-2 · The key paragraph: the table's tags aren't explained
**Class** 1 (terms before they're explained), also 8 · **Severity** medium

> "A location’s first two rows are its two ways in: the party picks one and keeps to it. The furniture’s obstacle is already 2 harder. On the map, an eye marks a watched location, a star the furniture. Any move takes one Turn."

**Problem.** The ways in are explained, but not the rest of what a Storyteller needs to run the table:
- "Then" rows come in order after the way in.
- The Furniture row can be tried only once that location's loot has been taken.
- *watched*: Trouble there gets you caught.
- *(group)*: each Entity rolls for itself.
- The Loud way column means Suspicion +1 whatever the result, and "—" means there's none.
- The kind in brackets is what one Castle Duty shops for.
- "Any move takes one Turn": two when carrying furniture (Chapter 4).

**Rewrite.**
> Each location’s rows run in order: two ways in (the party picks one and keeps to it), then each “Then”. The furniture’s obstacle is already 2 harder; try it once that location’s loot has been taken. Watched: Trouble there gets you caught. (group): each Entity rolls for itself. The loud way works too, at Suspicion +1 whatever the result. The kind in brackets is what one Castle Duty shops for. Any move takes one Turn (two carrying furniture).

(Keeps the pinned "The furniture’s obstacle is already 2 harder." The map sentence is in C9-3.)

**Length.** +3 lines on page 24, which has about ½ spare: pair it with C9-1's cut. If that isn't enough, keep only the furniture order, watched and the loud way (+1½).

### C9-3 · The eye on the map vs "watched" in the table
**Class** 7 (one word, two things), also 8 · **Severity** medium

> "On the map, an eye marks a watched location, a star the furniture."

**Problem.** The table tags obstacles as watched; the map's eye marks locations. A location counts as watched if any of its obstacles is, on either way in, but not for the furniture's obstacle alone (Chapters 4–5). That's what sets off a Tell check on arrival, even if the party then takes an unwatched way in. The example of play relies on exactly this: "Both are watched" says it of the china shop, whose front door isn't. Every location in all three towns has an eye, and a first-time Storyteller can't explain why from this page.

**Rewrite.**
> On the map, an eye marks a watched location (one with a watched obstacle besides the furniture’s): the first time anyone arrives, make a Tell check (Chapter 5). A star marks the furniture.

**Length.** +1 line (same page-24 budget as C9-2).

### C9-4 · Each town's numbers line: unlabelled Difficulties, and no traits for the way out or the lock-up
**Class** 8 (stated only elsewhere), also 1 · **Severity** medium · **Source** `book/tools/town-pages.mjs`, `townBlock()`

> "Easy: Suspicion Limit 11 · the way out 6 · the lock-up 10 · the final flight: mob 10, escape at Lead 5."

**Problem.**
- "The way out 6" and "the lock-up 10" don't say they're Difficulties.
- The town pages never give the traits for the way out or the lock-up, though the Storyteller needs them in every raid. The way out: Sly or Nimble, or Brawn the loud way. The lock-up: Sly, or Brawn the loud way, and Nimble too to slip free. Both are always watched (Chapters 4 and 6).
- The final flight's starting Lead (2, the same everywhere) isn't there either.

**Rewrite.** The generated line:
> Easy: Suspicion Limit 11 · Difficulty: the way out 6, the lock-up 10 · the final flight: mob 10, Lead 2, escape at 5.

…and once, in the key paragraph: "The way out (Sly or Nimble, or Brawn the loud way) and the lock-up (Sly, or Brawn the loud way; Nimble too to slip free) are always watched." (The test pins the current line: update it.)

**Length.** The line: about the same. The key paragraph: +1½ lines on page 24.

### C9-5 · The furniture row: "Furniture · A guard dog"
**Class** 7 (reads as something else), also 1 · **Severity** low · **Source** `town-pages.mjs`, `obstacleRow("Furniture", …)` and the "The furniture:" line

> Row: "Furniture | A guard dog | Charm (good dog) | Nimble (outrun it, barking) | 10". Facts: "The furniture: a stuffed bear (Bulky), at the tavern cellar (1)."

**Problem.**
- The step label "Furniture" in front of "A guard dog" reads as "the furniture is a guard dog". The dog is the obstacle in front of the stuffed bear.
- The whole row is set in italics, which Chapter 2 just taught means flavour.
- "(Bulky)" doesn't say it needs one carrier (Huge: two).

**Rewrite.** Step label "For the piece" (or "Furniture’s obstacle", if the column allows), set roman, not italic; facts line "(Bulky: one carrier)". (The test builds the key's rows with the label "Furniture": update it.)

**Length.** ±0.

### C9-6 · Example, Turn 1: "Dracula’s as Butler"
**Class** 6 (elliptical) · **Severity** low

> "Dracula and the Creature take the china shop, Dracula’s as Butler."

**Problem.** "Dracula's" what? It means the china shop is where Dracula's Duty (silver, china and linen) applies, so his trait die is one size larger there.

**Rewrite.**
> Dracula and the Creature take the china shop, where Dracula’s Butler Duty gives him the same edge.

**Length.** +½ line.

### C9-7 · Example, Turn 1: the first Tell check isn't explained
**Class** 8 (stated only elsewhere), also 1 · **Severity** medium

> "Both are watched, so the Storyteller makes a Tell check at each: a 2 and a 1, no Tells."

**Problem.** The book's first worked Tell check doesn't say what one is (a d6; on 4–6 one arriving Entity's Tell goes off, Suspicion +1). Nor does it say why the china shop counts as watched when the way they use, the front door, isn't (its back gate is; C9-3). The Witch's default Perk, Familiar's Warning, applies at the baker, but the example doesn't mention it.

**Rewrite.**
> Both count as watched (the china shop for its back gate, though they’ll use the front door), so the Storyteller makes a **Tell check** at each, a d6 that sets off one arriving Entity’s Tell on 4–6: a 2 and a 1, no Tells. (At the baker, the Witch’s Familiar’s Warning would have needed a second 4–6 too.)

**Length.** +2 lines on pages 25–26 (about one spare; see Room). Drop the last sentence first if space is short.

### C9-8 · Example, the chase: "a dead end"
**Class** 1 (term before it's explained) · **Severity** low

> "Round 1, a dead end: Wits d12 and the Monster, 12 + 3 = 15, Lead 2."

**Problem.** "A dead end" is a chase-table result (the ground: Brawn or Wits), and the example never says so. Nor does it say why the Witch dares the Monster here: it can't beat a d12, so it can't show.

**Rewrite.** One sentence before it, leaving the pinned sentence as it is:
> Each round, the ground is a d6 on the chase table (Chapter 6); a dead end lets her roll Brawn or Wits, and against a d12 the Monster can’t show.

**Length.** +1 line.

### C9-9 · Example, the Cost: "so it’s Suspicion +1"
**Class** 3 (missing how the choice is made) · **Severity** low

> "Dropping an item would cost nothing (he carries only what this roll won), so it’s Suspicion +1: a teacup smashes."

**Problem.** "So" makes Suspicion +1 sound like the only Cost left. The Storyteller could also take the Creature's next Turn or shrink his next die, and picks the one that hurts most (Chapter 8).

**Rewrite.**
> Dropping an item would cost nothing (he carries only what this roll won); of the rest, Suspicion +1 hurts most: a teacup smashes. Suspicion 7.

(Keeps "a teacup smashes. Suspicion 7.")

**Length.** ±0.

### C9-10 · Example, Turn 3: Good Dog on the Witch's roll
**Class** 8 (stated only elsewhere) · **Severity** medium

> "The Witch tries the shopkeeper again, and the Werewolf spends a charge on Good Dog for her: she rolls the Monster without risking Suspicion."

**Problem.** This is the first time the book shows an ability going on another Entity's roll. Chapter 2's entries say "your" (and only Hedge Spell says "or a friend's", C2-6), so it reads like an error. It also doesn't show that helping costs the Werewolf's charge but not its action.

**Rewrite.**
> …the Werewolf spends a charge on Good Dog for her (any ability can go on a friend’s roll in the same place, for the charge but not the helper’s action): she rolls the Monster without risking Suspicion.

**Length.** +1 line.

### C9-11 · Example, Turn 3: "a second roll picks the Creature"
**Class** 3 (missing how) · **Severity** low

> "the Tell check is a 4, and a second roll picks the Creature, who stands a head above the crowd."

**Problem.** What roll? A die split between the arrivals: 1–3 Dracula, 4–6 the Creature, as the hidden dice note records. (How to pick among more arrivals: part A's C5-4.)

**Rewrite.**
> …the Tell check is a 4, and a d6 between the two arrivals picks the Creature…

**Length.** ±0.

---

## The Entity Sheet

### SH-1 · "Castle Duty / Shops for": nothing says why it matters
**Class** too terse, also 8 · **Severity** low

> "Castle Duty ____ Shops for ____"

**Problem.** It says what to write, not what it does: at a location whose list item is that kind, your trait die is one size larger on your own rolls, never in a chase.

**Rewrite.** "Shops for (trait die one size larger there)"; or add to the footer (SH-10): "Castle Duty: one size larger where the list item is your kind (not in a chase)."

**Length.** ±0 in the label; +½ line in the footer.

### SH-2 · The trait grid: one row for Jekyll & Hyde's two arrangements
**Class** 3 (missing how) · **Severity** medium

> One row of five boxes under "Brawn Nimble Sly Charm Wits"; "Form (Jekyll & Hyde; starts as Jekyll) ☐ Jekyll ☐ Hyde".

**Problem.** Jekyll & Hyde has two arrangements (Chapter 2: "two forms on one sheet"), but the sheet has one row. A Jekyll & Hyde player has nowhere to keep Hyde's dice and must open Chapter 2 at every Draught.

**Rewrite.** Add to the line under the grid: "(Jekyll & Hyde: Jekyll’s die above Hyde’s in each box)". The boxes are tall enough for two. Or put it in the Form label: "Form (Jekyll & Hyde: Jekyll’s dice above, Hyde’s below; starts as Jekyll)".

**Length.** +½ line (the line under the grid already wraps).

### SH-3 · "higher than your trait die": its size or its roll?
**Class** 7 (term read two ways) · **Severity** low

> Sheet: "(it shows if it rolls higher than your trait die: Suspicion +2)". At the Table: "The Monster shows if it beats your trait die: Suspicion +2."

**Problem.** "Your trait die" can be read as the die's size (a d8, so 8) rather than what it rolled. Chapter 3 ("came up higher than your trait die") and the example ("the Monster’s 4 beat her trait die’s 1") mean the roll.

**Rewrite.** "(it shows if it rolls higher than your trait die did: Suspicion +2)"; At the Table: "if it beats your trait die’s roll". (Update the pinned sheet phrase in the test.)

**Length.** +1 word.

### SH-4 · "castle upgrades:"
**Class** too terse · **Severity** low

> "castle upgrades: ◌ ◌ ◌"

**Problem.** A first-timer doesn't know these are extra charges from the optional campaign rules (Chapter 7), and may tick them as ordinary charges.

**Rewrite.** "extra charges (campaign, Chapter 7): ◌ ◌ ◌".

**Length.** ±0.

### SH-5 · The overdraw note
**Class** too terse, also 2 · **Severity** medium

> "overdraw: Suspicion +2, or your Weakness once the hunt is on (once per flight)"

**Problem.**
- It doesn't say what overdrawing is: using an ability at zero charges.
- "Your Weakness once the hunt is on" doesn't say what happens: your Weakness is in play from your next roll to the end of the flight.
- It doesn't say you can't overdraw while your Weakness is already in play (part B, C6-15).

**Rewrite.**
> at 0, use one anyway (overdraw: Suspicion +2; in the final flight, your Weakness from your next roll instead, once per flight, never while it’s in play)

(Keeps the pinned "overdraw: Suspicion +2".)

**Length.** +½ line (it wraps).

### SH-6 · Signature / Gift / Perk: no cost, and one line for a three-line rule
**Class** too terse, also 3 · **Severity** medium

> "Signature ____ / Gift ____ / Perk ____"

**Problem.** Nothing says what each costs: 1 charge; 1 charge a use; always on and free. One ruled line holds a name, not the rule, and Chapter 2's rules run to two or three lines (Through the Wall, Already Dead, the Draught). So at the table the player still needs the book.

**Rewrite.** "Signature (1 charge)", "Gift (1 charge)", "Perk (always on)", each with two ruled lines.

**Length.** +3 lines. Offset: SH-8 (−1), drop the one-line "Notes" field (−1), and shorten the intro to "Copy for each player; fill it in from Chapter 2." (−½).

### SH-7 · Weakness "Always / Soon" and Tell: labels without meaning
**Class** too terse, also 2 · **Severity** low

> "Weakness ____ ☐ Always ☐ Soon" / "Tell ____"

**Problem.** "Always" and "Soon" mean something only to someone who has read Chapter 6 (from round 1 / round 3 of every chase). "Tell" doesn't say what it costs.

**Rewrite.** "☐ Always (round 1) ☐ Soon (round 3)" and "Tell (goes off: Suspicion +1)". (The test matches the boxes' markup: update the regex.)

**Length.** ±0 (there's room on both lines).

### SH-8 · Status: "Caught" and "Fleeing" overlap
**Class** 7 (inconsistent terms) · **Severity** medium

> "☐ In town ☐ Caught ☐ Captured ☐ Fleeing ☐ Out of town"

**Problem.** "Caught" and "Fleeing" overlap: when you're caught, you flee, in a local chase. The final flight isn't named. The book's terms are "caught" (a local chase), "captured" (the lock-up) and "the final flight".

**Rewrite.** "☐ In town ☐ In a local chase ☐ Captured (lock-up) ☐ In the final flight ☐ Out of town". Or, since a local chase starts and ends within one Turn, leave it out: "In town / Captured (lock-up) / In the final flight / Out of town". That frees a row for SH-6.

**Length.** −1 line with four items.

### SH-9 · "Next": the label and its two boxes read oddly
**Class** too terse · **Severity** low

> "Next ☐ roll: trait die one size smaller (a Cost) ☐ action: lost (lose a Turn, a Cost)"

**Problem.** The label is split from its words ("Next … action: lost"), so the line reads as a list of what's next rather than two Costs waiting to be paid.

**Rewrite.** "Cost to come ☐ next roll’s trait die one size smaller ☐ next action lost".

**Length.** ±0.

### SH-10 · The footer: "One raise per roll"
**Class** too terse, also 1 · **Severity** low

> "One raise per roll, from any source. Nothing makes a die smaller than a d4."

**Problem.** "Raise" is Chapter 3's shorthand. The sheet doesn't say it means a trait die one size bigger, that a d12 can't go higher, or that the Castle Duty counts as one.

**Rewrite.**
> One raise (trait die one size bigger) per roll, from any source, Castle Duty included; a d12 can’t go higher, and nothing makes a die smaller than a d4.

**Length.** +1 line.

---

## At the Table

### AT-1 · The Roll: which trait die?
**Class** 8 (stated only elsewhere) · **Severity** low

> "Your trait die + the Mask d6 or the Monster d10, against the Difficulty"

**Problem.** It doesn't say which trait. One the obstacle lists; in a chase, one the ground allows; any other needs an ability.

**Rewrite.**
> Your trait die (one the obstacle lists; in a chase, one the ground allows) + …

**Length.** +1 line (left column).

### AT-2 · Trouble: never says you fail
**Class** too terse, also 2 · **Severity** medium

> "Trouble: 3+ short. Suspicion +1; caught if watched."

**Problem.** It never says the attempt fails ("It doesn’t happen", Chapter 3), and "caught" isn't linked to what follows: a local chase, further down.

**Rewrite.**
> **Trouble:** 3+ short. You don’t do it; Suspicion +1; at a watched obstacle you’re caught: a local chase.

**Length.** +½ line (left).

### AT-3 · Critical: reads as a choice
**Class** 4 (cases run together) · **Severity** low

> "Critical: a Success on doubles. A spent charge back, or two Successes in a chase."

**Problem.** "A…, or…" reads as a choice. Which one you get depends on where you are.

**Rewrite.**
> **Critical:** a Success on doubles. In a chase it counts as two Successes; anywhere else, one spent charge back.

**Length.** ±0.

### AT-4 · Abilities: helping a friend is missing
**Class** 8 (stated only elsewhere), also too terse · **Severity** medium

> "One charge each, spent before the roll. … or open your own approach with an unlisted trait (2 lower, your roll only, never in a chase)."

**Problem.**
- It doesn't say an ability can go on a friend's roll in the same place (not in a local chase), costing the charge, not the action. That is the table rule about abilities most often needed.
- "2 lower" is the Difficulty.
- "Your roll only" doesn't say only you get past (the way out and a rescue still work for everyone).

**Rewrite.**
> One charge each, spent before the roll, on your roll or a friend’s in the same place (not in a local chase); helping costs no action. … or open your own approach with an unlisted trait (2 lower Difficulty; your own roll, and only you get past; never in a chase).

(Keeps the pinned "(2 lower".)

**Length.** +1 line (left).

### AT-5 · Turns: "Carrying: moves take two Turns"
**Class** 7 (inconsistent terms) · **Severity** high

> "Carrying: moves take two Turns."

**Problem.** It reads as any carrying, and the Entity Sheet's "Carrying (loot)" box uses the same word for loot. A first-time table will slow down everyone holding the cheese. Only furniture slows you; loot has no limit (Chapter 4). The other furniture rules aren't on the page either: Bulky needs one carrier, Huge two; carriers can't use the Mask; their Nimble is one size smaller. (Chapter 4's own bullet, "Carrying, a move takes two Turns", is saved there by its section, which is about pieces of furniture.)

**Rewrite.**
> Carrying furniture (Bulky: one carrier; Huge: two): moves take two Turns, no Mask, Nimble one size smaller. Loot: no limit, handed over free.

**Length.** +1 line (left; use the cuts listed under Room).

### AT-6 · Turns: one action; the Duty's limits; who's at the way out
**Class** 8 (stated only elsewhere) · **Severity** low

> "Each Turn, each Entity rolls, moves, picks up or waits. … At a location with your Duty’s kind of item: trait die one size larger (the one raise). … The way out: Sly or Nimble, or Brawn the loud way; one roll for all."

**Problem.** Things a player at the table will ask that the block doesn't say:
- that an Entity takes one action a Turn;
- that the Duty's raise is only on your own rolls, never in a chase;
- that everyone not captured must be at the way out, which is watched.

**Rewrite.**
> Each Turn, each Entity takes one action: a roll, a move, picking up, or waiting. … (your own rolls; the one raise; not in a chase). … Everyone not captured must be at the way out (watched). The way out: Sly or Nimble, or Brawn the loud way; one roll for all.

(Keeps the pinned way-out sentence.)

**Length.** +1 line (left). Lowest priority on this page.

### AT-7 · Suspicion: "first visit to a watched place"
**Class** 3 (missing when / how often) · **Severity** medium

> "a Tell +1 (4–6 on a d6, first visit to a watched place)"

**Problem.** "First visit" gets read as each Entity's first visit. It's once per place, the first time anyone arrives, and the d6 then picks whose Tell among the arrivals. The lock-up also counts, and so does the way out, the first time the party comes back to it.

**Rewrite.**
> a Tell +1 (4–6 on a d6, the first time anyone reaches each watched place, the lock-up and the way out included; one arriving Entity’s Tell)

(Keeps the pinned "(4–6 on a d6".)

**Length.** +1 line (right column; room).

### AT-8 · Chases: the local chase never says when you're cornered
**Class** too terse, also 1 and 8 · **Severity** medium

> "Local chase: Lead 1, escape at 4, against 8 + half the Suspicion (at most 12); the Mask allowed, abilities on your own roll only. Cornered: captured (slip free on a Success, or be rescued)."

**Problem.** The block never says:
- when you're cornered (Lead 0);
- what capture costs (the town takes everything you carry, gone for the night);
- how slipping free and rescue work. Both are at the lock-up Difficulty, which is watched. Slip free once a Turn from the next Turn: Sly or Nimble, or Brawn the loud way; only a Success frees you. A rescue is Sly or Brawn the loud way; a Success or a Cost frees everyone held there.
- that escaping puts you back where you were caught, your Turn used.

**Rewrite.**
> **Local chase:** Lead 1, escape at 4, against 8 + half the Suspicion (at most 12); cornered at 0. The Mask allowed; abilities on your own roll only. Escape: back where you were caught, Turn used. Cornered: captured, and the town takes what you carry. At the lock-up (Difficulty 10, watched): slip free once a Turn (Sly or Nimble, Brawn loud; Success only), or be rescued (Sly, Brawn loud; a Success or Cost frees all).

(Keeps the pinned opening phrase. Saying "Difficulty 10" here lets the numbers table lose its lock-up row: AT-12.)

**Length.** +2½ lines (right column: most of its spare room).

### AT-9 · Chases: "Final flight: everyone free"
**Class** 7 (term read two ways) · **Severity** medium

> "Final flight: everyone free; the Mask is off."

**Problem.** "Everyone free" can be read as "all captives are freed". It means everyone not captured flees together; captives stay behind and count against the result. Also not said: in the flight, abilities can help anyone's roll, and Suspicion has stopped.

**Rewrite.**
> **Final flight:** everyone not captured flees together; the Mask is off, Suspicion stops, abilities help anyone. Lead 2, escape at 5 (6 on Hard). Cornered: forked.

(The pinned regex still matches.)

**Length.** +½ line.

### AT-10 · Chases: "the side with more"
**Class** too terse, also 2 and 6 · **Severity** medium

> "Each round: roll the ground (the chase table); Success +1, Trouble −1. Together, the majority rule: 1 toward the side with more, 2 if it leads by 2+."

**Problem.** "The side with more" doesn't say which sides: Successes and Trouble. It doesn't say what a Cost does (nothing) or what a Critical counts as (+2, or two Successes).

**Rewrite** (matches part B's C6-14):
> Each round: roll the ground (the chase table); Success Lead +1 (Critical +2), Cost 0, Trouble −1. Several together: more Successes than Trouble, Lead +1 (+2 if ahead by 2 or more); more Trouble, −1 (−2); level, 0.

**Length.** +½ line.

### AT-11 · Chases: "Your Weakness: trait one size smaller"
**Class** 3 (missing how long) · **Severity** low

> "Your Weakness: trait one size smaller (Always: round 1; Soon: round 3)."

**Problem.** "Trait" means your trait die, whichever trait you roll. The line also doesn't say for how long: to the end of that chase.

**Rewrite.**
> Your Weakness: trait die one size smaller to the end of the chase (Always: round 1; Soon: round 3).

(Keeps the pinned parenthesis.)

**Length.** ±0–½ line.

### AT-12 · The numbers table: two rows without "Difficulty"
**Class** too terse, also 1 · **Severity** low

> Rows: "The way out | 6 | 8 | 10", "The lock-up | 10 | 10 | 10"

**Problem.** These are Difficulties, but unlike "The final flight: mob", the two rows don't say so.

**Rewrite.** "The way out: Difficulty". Drop the lock-up row (the same on every label) and say "Difficulty 10" in AT-8. That frees a row for the additions above.

**Length.** −1 row.
