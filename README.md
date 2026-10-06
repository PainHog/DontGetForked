# Don't Get Forked

A tabletop roleplaying game by **Richard Moore**. The players are classic monsters who live together in a castle in the woods. Once a year they have to go down into the village and steal what the castle needs — and get out again before the villagers and their pitchforks catch them.

**Status:** the core rules are approved and the rulebook chapters drafted; the Foundry system's first two slices (Entity sheets, rolls, the Raid HUD; chases, the lock-up, group and Tell checks, the year) and its compendiums (the eight Entities, the book's random tables, the three premade towns) are ready for testing (`TESTING.md`). See `docs/DESIGN.md`.

## What's in here
| Folder | What it is |
|---|---|
| `docs/` | Design document (pitch, decisions, open questions), lessons from *Heisty Spideys*, and the kickoff prompt for new sessions |
| `book/` | The rulebook: HTML chapters built into a typeset PDF (digital and print-on-demand) |
| `sim/` | Rules simulator for balance testing (built once the rules exist) |
| `module/`, `templates/`, `styles/`, `lang/`, `packs/`, `assets/` | The Foundry VTT game system: Entity sheets, the roll dialog and cards, the Raid HUD, the chase tracker and the lock-up; compendiums of the eight Entities, the book's random tables and the three premade towns with their maps (generated from the game data) |
| `tools/`, `test/` | Build, validation and test tooling |

## Commands
```
npm install
npm run build:book          # rulebook PDF → book/dist/
node book/build.mjs --print # print-on-demand interior + covers
npm run build:packs         # regenerate the compendiums from the game data, then compile them
npm run check               # validate the Foundry system + run tests
```

© 2026 Richard Moore. All rights reserved.
