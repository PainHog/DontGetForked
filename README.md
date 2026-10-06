# Don't Get Forked

A tabletop roleplaying game by **Richard Moore**. The players are classic monsters who live together in a castle in the woods. Once a year they have to go down into the village and steal what the castle needs — and get out again before the villagers and their pitchforks catch them.

**Status:** the core rules are approved and the rulebook chapters drafted; the Foundry system's first slice (Entity sheets, rolls, the Raid HUD) is ready for testing (`TESTING.md`). See `docs/DESIGN.md`.

## What's in here
| Folder | What it is |
|---|---|
| `docs/` | Design document (pitch, decisions, open questions), lessons from *Heisty Spideys*, and the kickoff prompt for new sessions |
| `book/` | The rulebook: HTML chapters built into a typeset PDF (digital and print-on-demand) |
| `sim/` | Rules simulator for balance testing (built once the rules exist) |
| `module/`, `templates/`, `styles/`, `lang/`, `packs/` | The Foundry VTT game system: Entity sheets, the roll dialog and cards, the Raid HUD (chases and the lock-up next) |
| `tools/`, `test/` | Build, validation and test tooling |

## Commands
```
npm install
npm run build:book          # rulebook PDF → book/dist/
node book/build.mjs --print # print-on-demand interior + covers
npm run check               # validate the Foundry system + run tests
```

© 2026 Richard Moore. All rights reserved.
