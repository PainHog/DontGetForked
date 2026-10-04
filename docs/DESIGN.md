# Don't Get Forked — design document

Living document. The **Pitch** is Richard's. **Decisions** are only what Richard has approved. Everything under **Open questions** and **Suggestions** is undecided.

## Pitch (Richard Moore, 2026-10-04)

> The idea is the players can select from one of a set of premade Entities. They would be playing figures like Frankenstein, Dracula, The Mummy, etc. They all live in a castle in the woods and once a year (the session), they must go into town and steal ingredients, and sometimes new furniture/decor (if they really really want it). The goal is to use their supernatural abilities (they have charges), stat rolls and wits to get in and out of the town with the loot the storyteller says you need to "replenish". The game will be called "Don't Get Forked". It's a play on the villagers chasing them with pitchforks. Most of the stuff would happen in the town, but if they are caught they must try to escape before getting "forked".

### What the pitch fixes
- **Title:** *Don't Get Forked* (the villagers' pitchforks).
- **Player characters:** chosen from a set of **premade Entities**: classic monsters such as Frankenstein's creature, Dracula and the Mummy.
- **Home base:** a shared **castle in the woods**.
- **One session = one yearly raid** on the town.
- **Goal:** bring back the loot the Storyteller says the castle needs to "replenish": mostly **ingredients**, sometimes **furniture/decor** (optional, high-desire).
- **Tools:** supernatural **abilities with charges**, **stat rolls**, and wits.
- **Most play happens in the town.** If caught, the Entities must **escape before they get "forked"**.

## Decisions log
| Date | Decision | Notes |
|---|---|---|
| 2026-10-04 | Title, premise and core loop as in the pitch above | — |
| 2026-10-04 | Public repository; same toolchain as Heisty Spideys (book pipeline, simulator, Foundry system) | Foundry automation-first is the default from Heisty's lessons; confirm in the first session |

## Open questions (work through these with Richard, roughly in this order)
1. **Engine.** Reskin the proven *Heisty Spideys* engine, or build something new? Heisty's engine is a d6 pool with Successes on 5–6, Difficulty, an Alert track to a Limit, and Silk Points; it is fully simulated, balanced and automated in Foundry. Options include reusing it as-is, reusing its core dice with new subsystems, or a new resolution system.
2. **Entities.**
   - Which monsters, how many at launch, and whether two players can pick the same one.
   - Premade only, or premade with choices (e.g. pick perks)?
   - What makes each one play differently?
3. **Stats.** Which attributes and skills, if any? How do Entities differ in them?
4. **Supernatural abilities and charges.**
   - How many abilities per Entity, and what a charge buys.
   - Whether charges refill: once a year, at the castle, or by some in-town action.
   - Whether there's a shared pool or one per Entity, and what happens at zero.
5. **The town.**
   - How a town is structured: a map of districts or shops, a sequence of obstacles, or a sandbox.
   - Is it the same town every year, changing as it remembers past raids?
   - When does the raid happen: night, a festival, market day? Do the Entities disguise themselves?
6. **The shopping list.**
   - How the Storyteller sets what must be replenished, and how much.
   - What a partial haul means.
   - Do consequences carry over to the castle next year (running low, the castle decaying)?
7. **Furniture and decor ("if they really really want it").**
   - What makes it tempting: castle upgrades, personal rewards?
   - What makes it risky: bulky, slow, loud?
8. **Getting caught.**
   - What raises suspicion, and what triggers the chase.
   - How the chase works.
   - What "getting forked" means mechanically: out for the session, captured and rescued, a lasting scar? These are immortal-ish monsters, so how lethal is it?
   - Can a forked Entity still contribute?
9. **Campaign.**
   - Does each session advance a year?
   - Do the castle and Entities improve?
   - Does the village escalate (more guards, a monster hunter)?
10. **Table.** Number of players, session length, age/tone (cosy-spooky? slapstick? horror-comedy?), GM-full or GM-light.
11. **Art direction.** Palette and look (Heisty used "heist noir"), and how the Entities are drawn.
12. **Foundry.** Online version from day one? The recommendation from Heisty is yes, automation-first, with the rules engine designed so every rule is automatable.
13. **Name check.** Search for existing products called "Don't Get Forked" before committing to store pages or art with the title.

## Rights note: classic monsters (not legal advice)
- **Public-domain sources:** these literary characters are in the public domain:
  - Dracula (Bram Stoker, 1897)
  - Frankenstein's creature (Mary Shelley, 1818)
  - The Invisible Man (H. G. Wells, 1897)
  - Dr Jekyll and Mr Hyde (1886)
  - The Phantom of the Opera (1910)
- **Generic folklore:** mummies, werewolves, ghosts, witches and vampires in general.
- **Film designs are not free to use.** The Universal Pictures film designs and branding still belong to Universal. That includes:
  - the flat-topped head with neck bolts;
  - specific makeup looks;
  - the "Universal Monsters" name;
  - characters created for the films, such as the Gill-man from *Creature from the Black Lagoon* (1954).
- **Use original visual designs** and names drawn from the public-domain books or folklore. Avoid echoing *Hotel Transylvania* too closely.
- **Before launch,** check the final roster with someone qualified.

## Suggestions from the Heisty Spideys experience (for discussion, not decisions)
- Heisty's structure maps closely onto this pitch:
  - **Location** → the town;
  - **loot tiers** → the ingredients and furniture;
  - **Alert track** → suspicion and the pitchfork mob;
  - **Escape phase and capture at Full Alert** → the chase;
  - **Silk Points** → ability charges.
  
  Reusing its simulated engine would save months. Renaming everything isn't enough, though; the new game needs its own identity.
- Decide early the things Heisty had to retrofit:
  - group checks;
  - opposed rolls versus Difficulty;
  - what a "scene" is;
  - how NPCs (villagers) are statted;
  - carrying bulky loot;
  - maps with at least two entry points for every ready-to-run town;
  - per-character versus per-group limits.

  See `docs/LESSONS.md`.
- Set win-rate targets before writing rules. Heisty settled on Easy ~90%, Standard ~75%, Hard ~55–60%.
