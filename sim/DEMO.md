# The Halloween one-shot: Hallowby, simulated

Command: `node sim/demo-check.mjs 6000` (seed 1). 6,000 raids per party size (3, 4 and 5 Entities, random from the approved roster), the rules as decided and the current numbers, on Hallowby (the one-shot's town, book/demo/hallowby.json) and on Puddlecombe (the book's Easy town) for comparison. Easy targets: Win or better 87–93%, Forked 0–2%. The simulated players are simpler than people: read these as the shape of the night, not a promise.

| Town | Style | Win or better | Grand Year | Forked | Win with 3 · 4 · 5 | Any local chase | Someone captured · left behind | Final flight (at the Limit · at dawn) | Went for the furniture | Turns used (half by) | Suspicion at the end |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hallowby (11 obstacles, mean 8.18, 5 watched) | Default players (furniture only when safe) | 90% | 70% | 1% | 88% · 92% · 92% | 35% | 14% · 6% | 28% (28% · 0%) | 87% | 8 | 6.9 |
| Hallowby (11 obstacles, mean 8.18, 5 watched) | Daredevils (go for the furniture as soon as they can) | 90% | 74% | 2% | 86% · 92% · 91% | 35% | 15% · 7% | 32% (32% · 0%) | 96% | 8 | 7.0 |
| Puddlecombe (12 obstacles, mean 8.00, 5 watched) | Default players (furniture only when safe) | 90% | 12% | 1% | 88% · 91% · 92% | 31% | 12% · 6% | 12% (12% · 0%) | 14% | 7 | 5.0 |
| Puddlecombe (12 obstacles, mean 8.00, 5 watched) | Daredevils (go for the furniture as soon as they can) | 79% | 70% | 4% | 67% · 80% · 90% | 28% | 13% · 9% | 76% (76% · 0%) | 100% | 7 | 8.2 |

✗ marks a default-players row outside the Easy targets. A shared chase counts once.
