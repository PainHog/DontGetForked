# Don't Get Forked — a full table (five players), simulated

Command: `node sim/full-table.mjs 6000` (seed 1). 6,000 raids per town with five Entities (random, the approved roster), the rules as decided and the current numbers; 3,000 per town for each other style of play. The simulated players are simpler than people (sim/params.mjs): read these as the shape of what a table meets, not a promise.

## What a five-player night looks like

| Town | Grand Year | Win | Partial | Bust | Forked | Turns used (1 in 10 · half · 9 in 10 by) | Ends at the Limit · at dawn | Any local chase · 3 or more · per night | Final flight (rounds: half by · 9 in 10 by) | Someone captured · left behind | Suspicion at the end | Charges spent · Entities with none spent |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Puddlecombe (Easy) | 40% | 52% | 4% | 4% | 1% | 5 · 7 · 8 | 16% · 0% | 26% · 0% · 0.3 | 16% (2 · 4) | 9% · 4% | 6.7 | 47% · 1.2 of 5 |
| Thistlewick (Standard) | 61% | 17% | 8% | 9% | 5% | 5 · 8 · 9 | 37% · 0% | 44% · 1% · 0.5 | 37% (2 · 5) | 18% · 10% | 9.2 | 69% · 0.5 of 5 |
| Gallowsmere (Hard) | 0% | 59% | 15% | 17% | 8% | 4 · 9 · 11 | 38% · 3% | 63% · 3% · 0.9 | 41% (3 · 8) | 34% · 17% | 12.8 | 81% · 0.3 of 5 |
| A rolled Easy town | 40% | 52% | 4% | 3% | 0% | 6 · 7 · 9 | 15% · 0% | 22% · 0% · 0.3 | 15% (2 · 4) | 8% · 4% | 6.7 | 51% · 1.2 of 5 |
| A rolled Standard town | 13% | 62% | 10% | 11% | 4% | 5 · 8 · 10 | 28% · 0% | 39% · 0% · 0.5 | 28% (2 · 6) | 16% · 10% | 8.0 | 71% · 0.5 of 5 |
| A rolled Hard town | 7% | 53% | 15% | 17% | 7% | 4 · 8 · 11 | 39% · 2% | 59% · 2% · 0.8 | 41% (3 · 8) | 31% · 17% | 12.5 | 79% · 0.3 of 5 |

Win is a Win without the furniture; a Grand Year is a Win with it. "Ends at the Limit · at dawn": how often the night ends in a final flight because Suspicion hit the Limit, or because the 12th Turn ended; the rest leave by the way out. A shared chase counts once.

## How the style of play changes it

| Town | Style | Grand Year | Win or better | Forked | Turns used (half by) | Any local chase | Someone left behind |
|---|---|---|---|---|---|---|---|
| Puddlecombe (Easy) | Default players (split up; furniture only when safe) | 40% | 91% | 1% | 7 | 26% | 4% |
| Puddlecombe (Easy) | Cautious (never go for the furniture) | 0% | 92% | 1% | 6 | 25% | 3% |
| Puddlecombe (Easy) | Daredevils (go for the furniture as soon as the essentials are in hand) | 87% | 91% | 1% | 7 | 25% | 5% |
| Puddlecombe (Easy) | Stay together (the party never splits) | 0% | 91% | 0% | 11 | 34% | 6% |
| Thistlewick (Standard) | Default players (split up; furniture only when safe) | 61% | 78% | 5% | 8 | 44% | 10% |
| Thistlewick (Standard) | Cautious (never go for the furniture) | 0% | 82% | 2% | 7 | 35% | 7% |
| Thistlewick (Standard) | Daredevils (go for the furniture as soon as the essentials are in hand) | 63% | 76% | 6% | 8 | 45% | 11% |
| Thistlewick (Standard) | Stay together (the party never splits) | 0% | 89% | 2% | 12 | 26% | 6% |
| Gallowsmere (Hard) | Default players (split up; furniture only when safe) | 0% | 59% | 8% | 9 | 63% | 17% |
| Gallowsmere (Hard) | Cautious (never go for the furniture) | 0% | 60% | 8% | 9 | 63% | 18% |
| Gallowsmere (Hard) | Daredevils (go for the furniture as soon as the essentials are in hand) | 35% | 54% | 15% | 7 | 59% | 17% |
| Gallowsmere (Hard) | Stay together (the party never splits) | 0% | 55% | 6% | 11 | 63% | 17% |
| A rolled Easy town | Default players (split up; furniture only when safe) | 40% | 92% | 0% | 7 | 22% | 4% |
| A rolled Easy town | Cautious (never go for the furniture) | 0% | 93% | 0% | 7 | 19% | 3% |
| A rolled Easy town | Daredevils (go for the furniture as soon as the essentials are in hand) | 64% | 90% | 1% | 7 | 23% | 5% |
| A rolled Easy town | Stay together (the party never splits) | 0% | 92% | 0% | 11 | 18% | 3% |
| A rolled Standard town | Default players (split up; furniture only when safe) | 13% | 75% | 4% | 8 | 39% | 10% |
| A rolled Standard town | Cautious (never go for the furniture) | 0% | 75% | 4% | 8 | 39% | 9% |
| A rolled Standard town | Daredevils (go for the furniture as soon as the essentials are in hand) | 38% | 65% | 9% | 7 | 41% | 10% |
| A rolled Standard town | Stay together (the party never splits) | 0% | 60% | 3% | 12 | 36% | 8% |
| A rolled Hard town | Default players (split up; furniture only when safe) | 7% | 60% | 7% | 8 | 59% | 17% |
| A rolled Hard town | Cautious (never go for the furniture) | 0% | 61% | 7% | 8 | 58% | 17% |
| A rolled Hard town | Daredevils (go for the furniture as soon as the essentials are in hand) | 25% | 52% | 11% | 8 | 62% | 18% |
| A rolled Hard town | Stay together (the party never splits) | 0% | 43% | 7% | 12 | 57% | 14% |
