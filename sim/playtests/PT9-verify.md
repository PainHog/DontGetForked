# PT9: Verification playtest after the PT8 fix round (V21, V22 and the wording fixes; a rolled Standard town, drills a–h)

*Work in progress: written as play goes; the summary, findings and PT8 follow-up come last.*

## 1. What this is

A short, focused verification playtest of the rules after PT8's fix round (commit 08abd30): **V21** (Chapter 3: "A dropped item (drop yours any time) falls where you are; picking it up costs your next action"), **V22** (Chapter 8: "if a kind has more items than places, two may share a place (one location, guarding both)"), and the wording fixes: Mesmerise "at a watched obstacle", Out of Sight's "anyone in the same place", an opened approach's "Only you get through (others must beat it themselves), though the way out (everyone leaves) and a rescue work as usual", the d3 ("a d6 halved, rounding up, serves as the d3"), and a castle upgrade's "one extra charge (part of its starting number that raid)". It also checks each of PT8's twelve findings against the book's text now (section 8).

**Rules source:** the rulebook text only: `book/src/chapters/*.html`, read as text, with the alt text the book prints for its pictures (the chapters at commit 7fe8663, the same text as 08abd30; they did not change while I played). Not the simulator, not `docs/`, not the Foundry code. Where the book is silent I made a ruling, listed it in section 4, and logged it as a finding in section 7. The commit diff and the decisions log were read only to see what was decided about PT8's findings (section 8).

**Dice:** every random result is a real `Math.random` roll from `node -e`, numbered R1 onward and listed in section 10. Drills say exactly what I chose at their start; every roll after that is real. Where a drill needed a particular result to put a rule through the text, I restarted it from the same chosen start until the dice gave it, and every restart's rolls are listed. The players played to win; the Storyteller played by Chapter 3 and Chapter 8's advice ("Pick the one that hurts most right now, but never one that costs nothing").

---

## 2. Summary

*(filled in at the end)*

---

## 3. Setup

### 3.1 Main line: a Standard town rolled on Chapter 8's tables (R1–R71)

Built by Chapter 8's Rolling a Town, Standard column, every number rolled.

**Lantern Night** (R1 = 1): turnip lanterns in every window.

**The list** (R2–R12). Standard: "roll any die: odd, one; even, two": R2 = 6, **two essentials**, the first two rolled. Each item a d6 for its kind and a d6 for the item: R3–R4 cloth 4, **a new cape** · essential; R5–R6 plants 3, **rose bushes for the graveyard** · essential; R7–R8 cloth 3, a top hat; R9–R10 tools 3, hinges that creak properly; R11–R12 silver 2, a tea service. No repeated item.

**Places** ("a d3 or pick, one item per place"; the d3 rolled as Chapter 1 now says, "a d6 halved, rounding up": 1–2 → 1, 3–4 → 2, 5–6 → 3): the cape R13 = 3 → 2, **the tailor**; the roses R14 = 3 → 2, **the florist**; the top hat R15 = 4 → 2, the tailor again: one item per place and cloth has three places, so rolled again: R18 = 1 → 1, **the draper**; the hinges R16 = 2 → 1, **the smithy**; the tea service R17 = 2 → 1, **the silversmith**.

**Obstacles** (counts R19–R23, Standard: 1–6 one · 7–15 two · 16–20 three: 6, 11, 9, 12, 2 → one, two, two, two, one; each obstacle a d20 on the obstacle table, a d20 for its Difficulty (1–3: 6 · 4–13: 8 · 14–19: 10 · 20: 12) and a d10 for watched (1–5); R24–R62). Three second ways in rolled the first way's quiet trait and were rerolled on the obstacle table only ("roll the obstacle table again until its quiet way is a different trait"; their Difficulty and watched rolls stand): the draper's (R42 = 18 back room, Wits; R63 = 20 maze, Wits; R65 = 18 back room, Wits; R66 = 3, a cart) and the silversmith's (R60 = 18 back room, Wits; R64 = 8, a drainpipe).

**The furniture** (R67–R71): R67 = 3, **a suit of armour** (Bulky); its location, "number them and roll a d6, rerolling a number without one" (1–5 in list order): R68 = 1, **the tailor**. Its obstacle: R69 = 11, a crowded shop floor (group), R70 = 6 → 8, +2 = **10**; R71 = 9, not watched.

| # | Location · item | Obstacle | Quiet way | Loud way | Difficulty | Watched |
|---|---|---|---|---|---|---|
| 1 | **The tailor**: a new cape (cloth and costumes) · essential | Way in: a shuttered window | Nimble | Brawn | 10 | — |
| | | or: a maze of festival stalls (group) | Wits | — | 6 | watched |
| | | Furniture: a crowded shop floor (group) (the suit of armour, Bulky) | Sly | — | 10 (rolled 8) | — |
| 2 | **The florist**: rose bushes for the graveyard (plants and seeds) · essential | Way in: the rooftops (group) | Nimble | — | 8 | — |
| | | or: a bolted back gate | Brawn | Charm | 10 | — |
| | | Then: a guard dog | Charm | Nimble | 6 | watched |
| 3 | **The draper**: a top hat (cloth and costumes) | Way in: a maze of festival stalls (group) | Wits | — | 10 | — |
| | | or: a cart blocking the alley | Brawn | Nimble | 8 | watched |
| | | Then: a shuttered window | Nimble | Brawn | 8 | watched |
| 4 | **The smithy**: hinges that creak properly (tools and hardware) | Way in: a crowded shop floor (group) | Sly | — | 6 | — |
| | | or: the shopkeeper behind the counter | Charm | Sly | 12 | watched |
| | | Then: a high garden wall | Nimble | Brawn | 8 | watched |
| 5 | **The silversmith**: a tea service (silver, china and linen) | Way in: a dark, cluttered back room | Wits | Sly | 8 | — |
| | | or: a rickety drainpipe | Nimble | — | 10 | watched |

Standard: Suspicion Limit 11 · the way out 8 · the lock-up 10 · the final flight: mob 11, escape at Lead 5. 14 obstacles, 7 watched (50%; the table's share is 50%); Difficulties by roll 6 ×3, 8 ×6, 10 ×4, 12 ×1 (the table's 15 / 50 / 30 / 5%). The ceiling (one 12 on Standard) holds: the smithy's shopkeeper is the only 12. **All five locations are watched** (the tailor and the silversmith by one way in each, "either way in"; the florist by its guard dog), so every first arrival gets a Tell check. Five group obstacles, two of them ways in the party might take. No town name: the tables don't make one.

### 3.2 Main line party (R72–R76)

As the brief asked, four Entities rolled on a d8 in Chapter 2's order (1 Dracula … 8 Jekyll & Hyde), rerolling one already in: R72 = 7, R73 = 7 (repeat), R74 = 8, R75 = 5, R76 = 2: **the Witch, Jekyll & Hyde, the Invisible Man, Frankenstein's Creature**, default picks. No Duty clash. 3 charges each.

| Entity | Dice | Signature | Gift | Perk | Duty (item here) | Weakness |
|---|---|---|---|---|---|---|
| A Witch | Brawn d6 · Nimble d4 · Sly d10 · Charm d8 · Wits d12 | Hedge Spell (raise, hers or a friend's, same place) | Broomstick (open with Nimble) | Familiar's Warning | Cook (nothing on this list) | Rowan (Soon) |
| Jekyll & Hyde | Jekyll: Brawn d4 · Nimble d6 · Sly d8 · Charm d12 · Wits d10 / Hyde: Brawn d12 · Nimble d10 · Sly d8 · Charm d4 · Wits d6 | The Draught (change form before a roll) | Doctor's Bag (raise) | Practised Hand (back to Jekyll free) | Librarian (nothing on this list) | A Familiar Face (Soon) |
| The Invisible Man | Brawn d4 · Nimble d8 · Sly d12 · Charm d6 · Wits d10 | Unseen (hidden Monster) | Through the Gap (open with Nimble) | **Out of Sight** | Tailor (the cape **and** the top hat) | Flour (Soon) |
| Frankenstein's Creature | Brawn d12 · Nimble d8 · Sly d6 · Charm d4 · Wits d10 | Brute Force (Brawn instead) | Mountain Stride (open with Nimble) | Strong Back | Handyman (the hinges) | Fire (Soon) |

The Invisible Man's default Perk is Out of Sight, so V21's set-down and Out of Sight's "anyone in the same place" could come up in the main line itself.

---

## 4. Standing readings (my rulings where the book is silent; the ones that matter are findings in section 7)

*(being filled in as play goes)*

---

## 5. Play log: main line (a rolled Standard town, 4 Entities)

Notation: trait die + second die = total vs Difficulty → result. "Shows" = the Monster die beat the trait die. Sus = Suspicion after the roll. Odds are Success / Cost / Trouble, exact from the book's dice. Charges are shown before → after.

**Plan.** Split four ways on Turn 1 ("on Standard and Hard it usually should"), each to the place it does best: the Witch to the silversmith (the back room, Wits d12 at 8, unwatched), the Creature to the smithy (Handyman: the shop floor's Sly d6 is a d8 there), the Invisible Man to the tailor (Tailor: the maze's Wits d10 is a d12 there; then the armour's shop floor with Sly d12), Jekyll & Hyde to the florist (Hyde's Nimble d10 for the rooftops, then back to Jekyll free for the guard dog with Charm d12). Then the draper (the Invisible Man's second Tailor location) with whoever is free.

**Turn 1 (Sus 0).** Moves. Every location is watched, so a Tell check at each first arrival:

| Roll | Check | d6 | Result | Sus |
|---|---|---|---|---|
| R77, R81 | the silversmith (Witch) | 5, then **Familiar's Warning**'s second d6: 6 | the cat doesn't warn her: A Black Cat stares at the silversmith's customers | 1 |
| R78 | the smithy (Creature) | 6 | Head and Shoulders: old Granny Mott (R82–R83: looking for a lost cat) looks up, and up | 2 |
| R79 | the tailor (Invisible Man) | 3 | — | 2 |
| R80 | the florist (Jekyll) | 1 | — | 2 |

| Turn | Roll | Who / where | Choice and why | Dice | Total | Result | Sus |
|---|---|---|---|---|---|---|---|
| 2 | R84–R85 | Witch, silversmith way A (dark back room, Wits / Sly loud, 8, unwatched) | Wits d12, Mask (71 / 15 / 14) | 11 + 1 | 12 vs 8 | Success: **the tea service** (one obstacle) | 2 |
| 2 | R86–R87 | Creature, smithy way A (crowded shop floor, group, Sly, 6, unwatched) | Sly d6 → d8 (Handyman), Mask (79 / 15 / 6) | 8 + 3 | 11 vs 6 | Success (group: past for himself only) | 2 |
| 2 | R88–R89 | Invisible Man, tailor way B (maze of festival stalls, group, Wits, 6, watched) | Wits d10 → d12 (Tailor), Mask (86 / 10 / 4) | 2 + 4 | 6 vs 6 | Success: **the cape** (essential; one obstacle) | 2 |
| 2 | R90–R91 | Jekyll & Hyde, florist way A (the rooftops, group, Nimble, 8, unwatched) | **The Draught** (3 → 2): Hyde, Nimble d10, Mask (65 / 18 / 17); the gate would be Hyde's Brawn d12 at 10 (54 / 17 / 29) | 5 + 3 | 8 vs 8 | Success (past for himself) | 2 |

*(play continues)*
