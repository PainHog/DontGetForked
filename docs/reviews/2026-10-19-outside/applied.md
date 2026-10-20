# The outside review of v0.1: what happened to each finding

The review is `REVIEW.md` here, with its three detailed reports. Richard's calls are in `docs/DESIGN.md` (rows of 2026-10-19 and 2026-10-20), and every text change is a row of `book/REVIEW.md` (rows 80 onward). The rulebook is now Version 0.2 (`book/dist/Dont_Get_Forked_v0.2.pdf`, 34 pages). The one-shot is also Version 0.2 (`book/dist/Lantern_Night_in_Hallowby_v0.2.pdf`, 32 pages).

## 1. Fix before anyone outside the table sees it

| # | Outcome |
|---|---|
| S1 | **Replaced.** The Invisible Man "In costume" is now Giovanni David's *Le Masque au caffé* (Venice, 1775): a figure muffled in a black cloak with a mask pushed up on the hat (National Gallery of Art, CC0). |
| S2 | **Replaced.** The Creature "In costume" is now Charles Morel's stilt-walker Sylvain Dornon, a head above the Paris crowd (c. 1891; Paris Musées, CC0). |

## 2. Design decisions (Richard)

| # | Outcome |
|---|---|
| D1 | One chase, one rise; the mob is set when the chase starts. In the book, Foundry, the simulator and the one-shot. |
| D2 | A runner may give up at the start of a round. Everywhere. |
| D3 | An overdraw costs +2 on top. Everywhere; the final flight's overdraw is unchanged. |
| D4 | Spectral kept; its pass doesn't pick the way in. |
| D5 | Hard stays as designed, and Chapter 8 says so. The 10-Turn night was simulated and failed the targets, so the night stays 12 Turns. No scaling by party size. |
| D6 | Local chases keep Lead 1. In the final flight any ability may be spent as a raise. Everywhere. |
| D7 | A captive's loot stays gone. Everyone held means Forked. The lock-up stays 10. Runners caught together are unchanged. |
| D8 | Tells unchanged. The book says splitting costs no extra Tells, only earlier ones. |
| Numbers | The package made every level about 2 points easier, so the Suspicion Limits are now 9 / 10 / 13 (were 11 / 11 / 15). Decided under Richard's delegation of 2026-10-20; the numbers are in `sim/FINDINGS.md`. |

## 3. Rules gaps and contradictions

| # | Outcome |
|---|---|
| R1 | Richard: result first (Chapter 5). Foundry and the simulator follow. |
| R2 | Clarified: finish one action, chase and all, before the next; a hunt mid-Turn ends that Turn for anyone who hasn't acted (Chapter 4). |
| R3 | "A chase roll moves the Lead instead…" plus the one chase, one rise paragraph (Chapters 3 and 6). |
| R4 | Richard: the way out once a Turn (Chapter 4, At the Table, Foundry). |
| R5 | Clarified: an overdraw on your own roll in the flight takes effect from your next roll (Chapter 6). |
| R6 | Clarified: a pending smaller die applies to the next roll of any kind; a lost Turn lapses when the hunt starts (Chapter 3). |
| R7 | Richard: Difficulties are plain numbers; the words are gone (Chapters 1, 3, 8, At the Table, Foundry). |
| R8 | The Duty clash goes to the player who chose their Entity later; a Duty is rolled on its own table; prefer a Duty on the list (Chapter 2). |
| R9 | Richard: every raid's picks are made again (Chapters 2 and 7). |
| R10 | The way in is picked by the first roll at one of them; a Spectral pass doesn't pick it (Chapter 4, Chapter 9's key). |
| R11 | Clarified: the roller gets back a charge it spent; an overdraw isn't a charge (Chapter 3). |
| R12 | Clarified: a Huge piece's two carriers both count as carrying, move together, and lose it if either is captured (Chapter 4). |
| R13 | With D4: as the book had it, a Ghost may pass on the Turn it arrives. The simulator now matches. |
| R14 | Clarified: several passing at once choose who holds the item (Chapter 4). |
| R15 | "A way in or way out that a map marks small" (Chapters 4 and 8). No map uses one, so no map symbol was added. |
| R16 | Tell timing kept (the 2026-10-07 ruling). The Storyteller asks first who else is coming; the arrival is picked on a d6, rerolling unused numbers (Chapter 5). |
| R17 | Clarified: slipping free is the captive's action; a captive who kept its loot can hand it out (Chapters 4 and 6). |
| R18 | Clarified: the piece may be taken then or on a later Turn (Chapter 4). |
| R19 | Clarified: all three dice for each way in; items of one kind share places, two to a place (Chapter 8). |
| R20 | Richard: carrying adds one Turn to any move (Chapter 4). |
| R21 | Left as it is (optional): no floor under Difficulty. |
| R22 | The back cover says "1–2 hours a raid". |
| R23 | Richard: "killed" is gone; Forked means nothing comes home and stays Forked under Left Behind (Chapters 6 and 7). |
| R24 | An approach or the Draught only on your own roll (Chapters 2, 3 and 9). |
| R25 | The Storyteller's dice: a d20, a d10 and two d6 (Chapter 1). |
| R26 | "Choose on most rolls" (Chapter 1). |
| R27 | Richard: hear the list and the furniture before picking (Chapter 2). |
| R28 | At the Table and the Entity Sheet have the missing words; the Sheet has Between places, Caught and Notes. |

## 4. Entity tuning

Not part of this round. Under the package, every Entity is within ±2.5 win points on average over three seeds (`sim/FINDINGS.md`). The review's suggestions (Hypnotic Eyes, Strong Back, Wall-Crawler, the Witch's defaults, "+2 on a d12") are still open for Richard.

## 5. Layout

| Finding | Outcome |
|---|---|
| p19 near-empty (Chapter 6's end) | The page ends with the chase table, and the windmill plate now fills the rest of the page: end pictures may grow past their full-width height, trimming at most a sixth of their width. |
| p21 near-empty (Chapter 7's end) | The campaign box, then the cart filling the page to its margin. |
| p15 half-empty | Chapter 4's second page now holds the longer rules. |
| p27 near-empty | Chapter 8's end is now full text. The furniture table is kept whole (it split across the columns). |
| p7 → 8 → 9, the Creature split | The Abilities Never Pass box is shorter and sits at the foot of page 6. All eight Entities sit whole, two to a page, on pages 8–11. |
| p13 half filler | Kept: Chapter 3 runs one and a half pages, and the night-watchman plate fills the rest (no dice picture is available among the stand-ins). |
| p29, key after the first town | The key comes first in Chapter 9, followed by the worked example, then a town to a page. Chapter 9 is a page shorter. |
| p28, wrapped obstacle names | Long names wrap under themselves, not under the row label. Row labels are 7.5 pt. |
| p25, shopping-list numbers | Each number stays with its item, and the separator with the item before it. "The same on Easy, Standard and Hard" is one box. |
| p24, the d20 table had no heading | Now "The Location Rolls". |
| Small print | Town row labels are up from 6.8 to 7.5 pt; the Sheet's hints are 8.6 pt in full black. The map labels are unchanged, since the maps were drawn to fit them. |
| The back cover | "1–2 hours a raid". The picture swap is under Section 6. |
| Printing | `node book/build.mjs --white` (and `--demo --white`) makes a printer-friendly copy: white pages, no tint. Print-on-demand already builds with a 0.125 in bleed (`--print`). |
| Footers | The sheets now use the usual bottom margin, so the footer sits where it does on every other page. The hairline above some footers didn't show in a 200 dpi render. |
| Contents | Second-level entries: The Eight, the Chase Table, the Obstacle Table, the Shopping List, an Example of Play and the three towns. |
| Map arrows | The way-out arrows stop inside the frame on every map. |
| The cover | Richard's name with the version. |
| Credits | Closing full stop added. |
| Page count | 34 pages (32 inside, a multiple of 4). |

## 6–7. Art, rights and credits

See the stand-in section of `book/art/stand-in/SOURCES.md` for every picture's source, licence and audit. That per-image log already existed; the reviewer only had the PDF. The storefront-disclosure suggestion was not taken up: Richard's standing instruction is that no AI credit goes in the book or the repository. The maps are credited to Richard. The legal page now says the stand-in illustrations remain in the public domain.
