# FT4: a full table in a rolled Standard town (five players and a Storyteller)

*A simulated session played strictly by the rulebook text (`book/src/chapters/*.html`, read as text, map titles and alt text included). Not the simulator, not `docs/`, not the Foundry code. Every random result is a real roll (`node -e`, `Math.random`), numbered R1 onward and listed in the appendix. Where the book is silent or unclear, the table made a ruling, noted where it happened and logged in §4. Date: 2026-10-07.*

*Status: work in progress (setup done, play under way).*

---

## 0. Setup

### 0.1 Building the town (Chapter 8, "Rolling a Town", Standard)

The Storyteller builds the town at the table while the players watch, in the order Chapter 8 gives.

**Shopping list** (R1–R11). Essentials: R1 = 6, even, so **two** on Standard. Kind and item per item:

| # | Kind (d6) | Item (d6) | Essential | Duty that gets the edge |
|---|---|---|---|---|
| 1 | 6 cloth and costumes (R2) | 2 bandages, lots (R3) | yes | Tailor |
| 2 | 1 food and drink (R4) | 5 a jar of honey (R5) | yes | Cook |
| 3 | 1 food and drink (R6) | 1 a wheel of strong cheese (R7) | | Cook |
| 4 | 1 food and drink (R8) | 4 a sack of flour (R9) | | Cook |
| 5 | 3 books and paper (R10) | 2 black-edged writing paper (R11) | | Librarian |

No repeated items, no rerolls. Three food items: food has three places, so each gets its own.

**Lantern Night** (R12 = 6): *bells rung every hour to keep the real monsters away. They never work.*

**Locations** (R13–R16, a d3 each; the last food item took the only place left):

| Loc | Place | Item | Roll |
|---|---|---|---|
| L1 | the draper | bandages, lots (essential) | R13 = 1 |
| L2 | the butcher | a jar of honey (essential) | R14 = 2 |
| L3 | the tavern cellar | a wheel of strong cheese | R15 = 3 |
| L4 | the baker | a sack of flour | no roll (last place left) |
| L5 | the bookseller | black-edged writing paper | R16 = 1 |

**Obstacles per location** (d20, Standard 1–6 one, 7–15 two, 16–20 three): L1 R17 = 4 one · L2 R18 = 13 two · L3 R19 = 1 one · L4 R20 = 14 two · L5 R21 = 1 one.

**Each obstacle** (obstacle table d20, Difficulty d20 on the Standard column, watched on d10 1–5): R22–R57, three rolls each. Every second way in came up with a different quiet trait on the first try, so no rerolls. No Difficulty 12 came up, so the ceiling never bit.

**Furniture** (R58–R62): R58 = 1 **a wingback armchair (Bulky)**; R59 = 5, at **L5 the bookseller**; its obstacle R60 = 16 *children in costumes who want a closer look (group)*, Difficulty R61 = 14 → 10, +2 = **12**, watched R62 = 3 → **yes**.

**The town:**

| Location · obstacle | Quiet way | Loud way | Diff | Watched | Rolls |
|---|---|---|---|---|---|
| **L1 the draper**: bandages, lots (cloth) · essential · *not watched* | | | | | |
| Way in: a heavy cellar trapdoor | Brawn | — | 10 | no | R22–24 |
| or: a doorman checking invitations | Charm | Wits | 10 | no | R25–27 |
| **L2 the butcher**: a jar of honey (food) · essential · *watched* | | | | | |
| Way in: the shopkeeper behind the counter | Charm | Sly | 10 | yes | R28–30 |
| or: a muddy yard full of geese | Sly | Nimble | 8 | yes | R31–33 |
| Then: a bolted back gate | Brawn | Charm | 10 | yes | R34–36 |
| **L3 the tavern cellar**: a wheel of strong cheese (food) · *not watched* | | | | | |
| Way in: a high garden wall | Nimble | Brawn | 8 | no | R37–39 |
| or: a locked strongbox | Wits | Charm | 10 | no | R40–42 |
| **L4 the baker**: a sack of flour (food) · *watched* | | | | | |
| Way in: the rooftops (group) | Nimble | — | 8 | yes | R43–45 |
| or: a doorman checking invitations | Charm | Wits | 8 | yes | R46–48 |
| Then: a muddy yard full of geese | Sly | Nimble | 8 | yes | R49–51 |
| **L5 the bookseller**: black-edged writing paper (books) · *watched* (one way in is) | | | | | |
| Way in: a tug-of-war across the lane (group) | Brawn | — | 10 | no | R52–54 |
| or: the shopkeeper behind the counter | Charm | Sly | 8 | yes | R55–57 |
| Furniture: children in costumes who want a closer look (group) · **wingback armchair, Bulky** | Charm | — | 12 | yes | R60–62 |
| **The way out** (Standard) | Sly or Nimble | Brawn | 8 | always | — |
| **The lock-up** | Sly | Brawn | 10 | always | — |

**Villagers:** Chapter 8 says to roll one "whenever a watched obstacle needs a face, or a Cost needs someone to cause it", so the Storyteller rolls them in play (who d6, doing d6), not in the build. Each roll is logged where it happens.

**Map:** Chapter 8 has no map table or map step for a rolled town. The table used Chapter 4's default, "any move takes one Turn unless the map says otherwise", for every move (way out, five locations, lock-up), and Chapter 8's "In a rolled town no entrance is small". Logged as F2.

Things the table noticed while building (all logged in §4): the random order puts *the shopkeeper behind the counter* as the butcher's way in with *a bolted back gate* behind it, and *a locked strongbox* as the tavern's way in; a doorman at the draper "checking invitations" that nobody watches; the furniture's obstacle is a *group* obstacle; and the bookseller counts as watched even if the party takes its unwatched tug-of-war.

**Build time.** 62 rolls (R1–R62) and 13 lookups (the Rolling a Town steps, the difficulty table, the shopping table, the essentials rule, the custom table, the places, the obstacle-count row, the obstacle table, the Difficulty row, the watched row, the second-way-in rule, the ceiling, the furniture table and its location rule). By the session formula that is 62 + 26 = **88 minutes**. That formula overstates table rolls in a build: a d20 read off a table takes well under a minute. A realistic estimate with one Storyteller rolling and writing a town sheet is **35–45 minutes** (about 30 seconds a roll plus writing 12 obstacles out by hand), and the players have nothing to do during it. See T1.

### 0.2 The Entities (d8, rerolling repeats)

R63 = 2, R64 = 6, R65 = 6 (repeat, rerolled), R66 = 8, R67 = 7, R68 = 5. In order: **Frankenstein's Creature, a Ghost, Jekyll & Hyde, a Witch, the Invisible Man.**

| Player | Entity | Brawn | Nimble | Sly | Charm | Wits | Signature | Gift | Perk | Castle Duty | Weakness | Tell |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 Newcomer | Frankenstein's Creature | d12 | d8 | d6 | d4 | d10 | Brute Force (use Brawn) | Mountain Stride (open with Nimble) *default* | Strong Back *default* | Handyman *default* (nothing on the list) | Fire (Soon) | Head and Shoulders |
| 2 Daredevil | A Ghost | d4 | d12 | d10 | d8 | d6 | Through the Wall (open with Sly, not carrying) | Fade (Monster without risk) | Spectral *default* | Butler *default* (nothing on the list) | Cold Iron (Always) | Cold Spot |
| 3 Planner | Jekyll & Hyde | J d4 / H d12 | J d6 / H d10 | d8 / d8 | J d12 / H d4 | J d10 / H d6 | The Draught (change form) | Doctor's Bag (raise) *default* | Practised Hand *default* | Librarian *default* (writing paper) | A Familiar Face (Soon) | The Wrong Hand |
| 4 Hoarder | A Witch | d6 | d4 | d10 | d8 | d12 | Hedge Spell (raise, hers or a friend's) | A Potion for That (use Wits) | Fly by Night | Cook *default* (honey, cheese, flour) | Rowan (Soon) | A Black Cat |
| 5 Roleplayer | The Invisible Man | d4 | d8 | d12 | d6 | d10 | Unseen (Monster without risk) | Poltergeist (raise) | Out of Sight *default* | Tailor *default* (bandages) | Flour (Soon) | Bandages and Goggles |

Charges: 3 each, 15 in all. Jekyll & Hyde starts as Jekyll.

**How the picks went (table talk).**
- *Newcomer* took every marked default and asked what "Handyman" does. Planner: "Nothing tonight, there are no tools on the list. Don't worry about it." (See X3: two of five Duties do nothing in this town.)
- *Daredevil* first wanted Rattle ("the Monster only costs +1? I'm rolling the big die all night"), then the Planner pointed at the armchair: its obstacle is a group obstacle, and Spectral walks past group obstacles without rolling. "Spectral. I'm getting that chair." Gift: Fade, "so I can roll the Monster for free once".
- *Planner* checked the Duties against the list: the three defaults that matter (Cook, Tailor, Librarian) fall on three different players with no clash, so no swaps. Took Doctor's Bag because a raise can go on anyone's roll in the same place. Noted his Librarian edge is wasted on Jekyll's Charm d12 (a d12 can't go higher).
- *Hoarder* wanted the safe options: A Potion for That ("Wits d12 on anything, for emergencies") and Fly by Night ("if I'm caught, I always have my d12").
- *Roleplayer* took Poltergeist ("things move by themselves!") and kept Out of Sight because "a floating candlestick is the whole point of me". Delighted that "bandages, lots" is on the list, and horrified that a sack of flour is.

Duty clash rule: no two defaults clashed, so the "second player picks another" rule never came up (but see F3: the book never says what order players pick in).

### 0.3 What the party knows

The book never says how much of a rolled town the Storyteller shows the players. Chapter 9's maps mark watched locations and the furniture, the Example of Play has players quoting Difficulties ("Charm, 8, watched"), and the party has to pick a way in, so the table ruled: **the whole town sheet is open** (obstacles, traits, Difficulties, watched). Logged as F1.
