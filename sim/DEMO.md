# The Halloween one-shot: Hallowby, simulated

Command: `node sim/demo-check.mjs 6000` (seed 1). 6,000 raids per party size (3, 4 and 5 Entities, random from the approved roster), the rules as decided and the current numbers, on Hallowby (the one-shot's town, book/demo/hallowby.json) and on Puddlecombe (the book's Easy town) for comparison. Easy targets: Win or better 87–93%, Forked 0–2%. The simulated players are simpler than people: read these as the shape of the night, not a promise.

| Town | Style | Win or better | Grand Year | Forked | Win with 3 · 4 · 5 | Any local chase | Someone captured · left behind | Final flight (at the Limit · at dawn) | Went for the furniture | Turns used (half by) | Suspicion at the end |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hallowby (11 obstacles, mean 8.18, 5 watched) | Default players (furniture only when safe) | 88% | 73% | 1% | 86% · 89% · 91% | 35% | 13% · 6% | 26% (26% · 0%) | 88% | 8 | 8.3 |
| Hallowby (11 obstacles, mean 8.18, 5 watched) | Daredevils (go for the furniture as soon as they can) | 88% | 76% | 2% | 85% · 89% · 90% | 35% | 13% · 7% | 28% (28% · 0%) | 93% | 8 | 8.4 |
| Puddlecombe (12 obstacles, mean 8.00, 5 watched) | Default players (furniture only when safe) | 89% | 13% | 1% | 86% · 88% · 91% | 29% | 10% · 5% | 14% (14% · 0%) | 14% | 7 | 6.0 |
| Puddlecombe (12 obstacles, mean 8.00, 5 watched) | Daredevils (go for the furniture as soon as they can) | 83% | 77% | 3% | 75% · 81% · 91% | 28% | 10% · 7% | 56% (56% · 0%) | 98% | 7 | 9.8 |

✗ marks a default-players row outside the Easy targets. A shared chase counts once.
