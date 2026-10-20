# Don't Get Forked — a full table (five players), simulated

Command: `node sim/full-table.mjs 6000` (seed 1). 6,000 raids per town with five Entities (random, the approved roster), the rules as decided and the current numbers; 3,000 per town for each other style of play. The simulated players are simpler than people (sim/params.mjs): read these as the shape of what a table meets, not a promise.

## What a five-player night looks like

| Town | Grand Year | Win | Partial | Bust | Forked | Turns used (1 in 10 · half · 9 in 10 by) | Ends at the Limit · at dawn | Any local chase · 3 or more · per night | Final flight (rounds: half by · 9 in 10 by) | Someone captured · left behind | Suspicion at the end | Charges spent · Entities with none spent |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Puddlecombe (Easy) | 38% | 56% | 4% | 2% | 0% | 6 · 7 · 8 | 16% · 0% | 26% · 1% · 0.3 | 16% (2 · 4) | 10% · 5% | 5.7 | 52% · 1.1 of 5 |
| Thistlewick (Standard) | 27% | 56% | 9% | 4% | 3% | 6 · 7 · 9 | 22% · 0% | 41% · 1% · 0.5 | 22% (2 · 5) | 20% · 9% | 7.3 | 68% · 0.6 of 5 |
| Gallowsmere (Hard) | 0% | 62% | 18% | 12% | 7% | 6 · 9 · 11 | 23% · 8% | 62% · 6% · 1.0 | 31% (3 · 8) | 39% · 19% | 11.0 | 84% · 0.3 of 5 |
| A rolled Easy town | 38% | 55% | 4% | 2% | 1% | 6 · 7 · 9 | 16% · 0% | 22% · 0% · 0.3 | 16% (2 · 4) | 9% · 4% | 5.7 | 55% · 1.0 of 5 |
| A rolled Standard town | 13% | 65% | 13% | 7% | 3% | 6 · 8 · 10 | 18% · 0% | 39% · 1% · 0.5 | 18% (2 · 6) | 20% · 11% | 7.1 | 72% · 0.5 of 5 |
| A rolled Hard town | 6% | 54% | 20% | 13% | 7% | 6 · 9 · 11 | 27% · 6% | 59% · 4% · 0.9 | 33% (3 · 9) | 39% · 20% | 10.7 | 82% · 0.3 of 5 |

Win is a Win without the furniture; a Grand Year is a Win with it. "Ends at the Limit · at dawn": how often the night ends in a final flight because Suspicion hit the Limit, or because the 12th Turn ended; the rest leave by the way out. A shared chase counts once.

## How the style of play changes it

| Town | Style | Grand Year | Win or better | Forked | Turns used (half by) | Any local chase | Someone left behind |
|---|---|---|---|---|---|---|---|
| Puddlecombe (Easy) | Default players (split up; furniture only when safe) | 38% | 94% | 0% | 7 | 26% | 5% |
| Puddlecombe (Easy) | Cautious (never go for the furniture) | 0% | 95% | 0% | 6 | 26% | 4% |
| Puddlecombe (Easy) | Daredevils (go for the furniture as soon as the essentials are in hand) | 86% | 94% | 1% | 7 | 25% | 7% |
| Puddlecombe (Easy) | Stay together (the party never splits) | 0% | 93% | 0% | 11 | 35% | 6% |
| Thistlewick (Standard) | Default players (split up; furniture only when safe) | 27% | 84% | 3% | 7 | 41% | 9% |
| Thistlewick (Standard) | Cautious (never go for the furniture) | 0% | 85% | 2% | 7 | 38% | 8% |
| Thistlewick (Standard) | Daredevils (go for the furniture as soon as the essentials are in hand) | 60% | 76% | 8% | 7 | 48% | 14% |
| Thistlewick (Standard) | Stay together (the party never splits) | 0% | 91% | 2% | 12 | 31% | 7% |
| Gallowsmere (Hard) | Default players (split up; furniture only when safe) | 0% | 62% | 7% | 9 | 62% | 19% |
| Gallowsmere (Hard) | Cautious (never go for the furniture) | 0% | 61% | 8% | 9 | 63% | 20% |
| Gallowsmere (Hard) | Daredevils (go for the furniture as soon as the essentials are in hand) | 30% | 53% | 16% | 7 | 58% | 19% |
| Gallowsmere (Hard) | Stay together (the party never splits) | 0% | 60% | 6% | 12 | 64% | 21% |
| A rolled Easy town | Default players (split up; furniture only when safe) | 38% | 94% | 1% | 7 | 22% | 4% |
| A rolled Easy town | Cautious (never go for the furniture) | 0% | 94% | 0% | 7 | 19% | 3% |
| A rolled Easy town | Daredevils (go for the furniture as soon as the essentials are in hand) | 61% | 91% | 1% | 7 | 23% | 6% |
| A rolled Easy town | Stay together (the party never splits) | 2% | 94% | 0% | 11 | 18% | 2% |
| A rolled Standard town | Default players (split up; furniture only when safe) | 13% | 78% | 3% | 8 | 39% | 11% |
| A rolled Standard town | Cautious (never go for the furniture) | 0% | 78% | 2% | 8 | 39% | 10% |
| A rolled Standard town | Daredevils (go for the furniture as soon as the essentials are in hand) | 36% | 66% | 8% | 7 | 41% | 12% |
| A rolled Standard town | Stay together (the party never splits) | 0% | 65% | 2% | 12 | 36% | 8% |
| A rolled Hard town | Default players (split up; furniture only when safe) | 6% | 60% | 7% | 9 | 59% | 20% |
| A rolled Hard town | Cautious (never go for the furniture) | 0% | 61% | 6% | 8 | 58% | 20% |
| A rolled Hard town | Daredevils (go for the furniture as soon as the essentials are in hand) | 22% | 50% | 12% | 8 | 61% | 22% |
| A rolled Hard town | Stay together (the party never splits) | 0% | 45% | 7% | 12 | 57% | 17% |
