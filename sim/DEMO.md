# The Halloween one-shot: Hallowby, simulated

Command: `node sim/demo-check.mjs 6000` (seed 1). 6,000 raids per party size (3, 4 and 5 Entities, random from the approved roster), the rules as decided and the current numbers, on Hallowby (the one-shot's town, book/demo/hallowby.json) and on Puddlecombe (the book's Easy town) for comparison. Easy targets: Win or better 87–93%, Forked 0–2%. The simulated players are simpler than people: read these as the shape of the night, not a promise.

| Town | Style | Win or better | Grand Year | Forked | Win with 3 · 4 · 5 | Any local chase | Someone captured · left behind | Final flight (at the Limit · at dawn) | Went for the furniture | Turns used (half by) | Suspicion at the end |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hallowby (11 obstacles, mean 8.18, 5 watched) | Default players (furniture only when safe) | 91% | 72% | 2% | 88% · 92% · 93% | 35% | 14% · 6% | 26% (26% · 0%) | 89% | 8 | 7.1 |
| Hallowby (11 obstacles, mean 8.18, 5 watched) | Daredevils (go for the furniture as soon as they can) | 90% | 76% | 2% | 86% · 92% · 93% | 35% | 15% · 6% | 29% (29% · 0%) | 97% | 8 | 7.2 |
| Puddlecombe (12 obstacles, mean 8.00, 5 watched) | Default players (furniture only when safe) | 91% | 13% | 1% | 88% · 92% · 94% | 30% | 12% · 6% | 10% (10% · 0%) | 14% | 7 | 5.1 |
| Puddlecombe (12 obstacles, mean 8.00, 5 watched) | Daredevils (go for the furniture as soon as they can) | 80% | 71% | 4% | 66% · 80% · 94% | 27% | 13% · 9% | 72% (72% · 0%) | 100% | 7 | 8.4 |

✗ marks a default-players row outside the Easy targets. A shared chase counts once.
