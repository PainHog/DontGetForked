# Foundry system audit (2026-10-06)

The whole Foundry VTT system, not one diff: `system.json`, `module/` (rules logic, apps, sheet, chat cards, raid store, chases and the lock-up, GM operations, dice, settings), `templates/`, `lang/en.json`, `styles/`, `packs/`, `tools/`, `test/`, `.github/workflows/` and `TESTING.md`, read against the rulebook (`book/src/chapters/*.html`, the source of truth) and `docs/LESSONS.md` (Foundry). There is no live Foundry here: every finding is proved by a test on the fake Foundry (`tools/fake-foundry.mjs`) or by the exact code path.

**Result:** 18 findings fixed, each with a test written to fail first (`test/audit.test.mjs`, 19 tests); 14 left open (rule questions, design choices and recommendations). `npm run check` at the audit's last commit: 226 tests (the other audits' included), 224 pass, 0 fail, 2 todo (the book audit's known mismatches BA-03 and BA-21).

| Severity | Fixed | Open | Total |
|---|---|---|---|
| High | 1 | 0 | 1 |
| Medium | 6 | 1 | 7 |
| Low | 9 | 7 | 16 |
| Info | 2 | 6 | 8 |
| **Total** | **18** | **14** | **32** |

Severity: **High** anyone can do something only the Storyteller should; **Medium** a rule applied wrongly, or a player can change what isn't theirs; **Low** a wrong or stale screen, a lost charge, a corner case; **Info** a note or a gap the book leaves to the table.

## Fixed

### Rules against the book

**FA-01 · Medium · The loud way at the way out and the lock-up was read from the trait called, not the trait rolled.**
Chapter 5: "A trait the obstacle lists as loud is loud however you came to roll it." `buildRollPlan` (module/logic/roll-plan.mjs) set `loud = listed.loud.includes(called)`. So Frankenstein's creature using Brute Force at the way out (Sly called, Brawn rolled: the way out's loud way) raised no Suspicion, and a Werewolf calling Brawn but rolling Wits with Keen Nose paid +1 for nothing. The same at the lock-up.
*Fix:* `listed.loud.includes(trait)` (the trait after any switch). *Test:* "Chapter 5: a trait the way out or the lock-up lists as loud is loud however you came to roll it".

**FA-02 · Medium · A Cost at the way out offered the Storyteller a Cost.**
Chapter 4: "A Success or a Cost gets everyone out, free" (T4: "an exit Cost costs nothing more"). `costOptions` didn't know the way out, so the card offered Suspicion +1, Lose a Turn and the smaller die.
*Fix:* `costOptions` takes `wayOut` and returns none. A rescue's Cost still costs as usual. *Test:* "Chapter 4 (T4): a Cost at the way out gets everyone out, free".

**FA-03 · Low · The Castle Duty raise applied in a chase the tracker doesn't run.**
Chapter 2: the Duty edge is "not in a chase" (F19). `buildInput` (module/dice/rolling.mjs) dropped the Duty only when the tracker gave a chase context, so with *Run chases automatically* off (or the hunt on with no tracked flight) a ticked Duty still raised the die.
*Fix:* the roll plan itself ignores the Duty on any chase roll (`chase` or `hunt`). *Test:* "Chapter 2 (F19): no Castle Duty raise in a chase, whether or not the tracker runs it".

### GM authority and security

**FA-04 · High · Any player could run every Storyteller-only operation from the browser console.**
v13 `User#query` handlers don't receive the sender (the Heisty lesson), so each request names its `userId`, and `gmOnly` operations trusted it. Proof (as a player): `game.users.activeGM.query("dont-get-forked.op", { op: "raid.reset", args: {}, userId: game.users.activeGM.id })` reset the raid; the same for Suspicion, the hunt, capture and freeing, ending the year. The socket fallback the same.
*Fix (module/net/gm-ops.mjs):* a request off the wire is refused (`spoofed`) when it claims to come from the active GM itself (the active GM runs its own operations locally, never over the wire) or from a user who isn't connected. *Tests:* "a request off the wire that claims to come from the active Storyteller, or from a user who isn't connected, is refused"; test/table.test.mjs's retry test now uses a second, connected Storyteller. *Residual:* see FA-R2.

**FA-05 · Medium · A forged chat card could act on another player's Entity.**
`raid.roll` and `raid.applyCard` (any user) read everything from the card, and a card's facts are whatever its poster wrote. Proof: Ann posted a card for Ben's captured Dracula with `lockup: "slip", freed: true` and asked for `raid.roll`: Dracula was freed. The same could start a chase for someone else's Entity, mark the way out beaten or raise Suspicion in their name.
*Fix:* `postedByOwner(message)` (module/chat/cards.mjs): the card's author (set by Foundry's server, not by the request) must be a GM or an owner of the card's Entity. *Test:* "a forged card can't act on someone else's Entity".

**FA-06 · Medium · Any player could spend any Entity's charges, and bring its Weakness, with no roll.**
`actor.spendCharges` took `{ actorId, count, weakness }` from the request. Proof: as Ann, `runOp("actor.spendCharges", { actorId: <Dracula>, count: 3, weakness: true })` → Dracula at 0 charges with his Weakness in play.
*Fix:* the operation now takes a roll card: the helpers on a card its roller's owner posted, in this raid, pay what the card says (never more than the abilities they have), once (`helpersPaid`). The roller asks for it after posting the card. *Test:* "a helper's charges are spent only as a roll card says, once".

**FA-07 · Medium · HTML in an Entity's name ran on the Storyteller's client.**
`pickDropped` (the "which item drops?" dialog) and the overdraw confirmation built their HTML with the Entity's name unescaped; a player owns their Entity and can rename it. Proof: a Witch named `Witchy <img src=x onerror=alert(1)>` put a live `<img>` in the Storyteller's dialog. Every Handlebars template already escapes (`{{ }}`, no triple-stash); item names in the same dialog were escaped.
*Fix:* `foundry.utils.escapeHTML` on both names. *Test:* "no HTML from a player's Entity name runs on the Storyteller's client".

### Resilience

**FA-08 · Low · A helped roll made while no Storyteller was connected never charged the helper.**
The roll went ahead (the player is warned), the card said "Dracula spends 1", and `reconcile` applied its Suspicion later, but nothing ever spent Dracula's charge.
*Fix:* with FA-06, the card records `helpersPaid: false` and `reconcile` pays it when a Storyteller returns. *Test:* "a helped roll made while no Storyteller was connected charges the helper when one returns".

**FA-09 · Low · With Suspicion by hand, a chase or lock-up roll made while no Storyteller was connected was never picked up.**
`reconcile` returned at once when *Raise Suspicion automatically* was off, so a caught roll's chase never started.
*Fix:* `reconcile` always processes the rolls the raid follows (`raid.roll` reads the switches itself); only the plain Suspicion catch-up depends on the switch. *Test:* "a chase roll made while no Storyteller was connected is picked up when one returns, even with Suspicion by hand".

### Screens and words

**FA-10 · Low · The Raid HUD and the chase tracker didn't follow the Entities.**
They re-rendered only when the raid setting changed. A capture writes the Entity, not the raid, so the HUD didn't list the captive; pressing **free** freed her but left her listed (with a Free button that did nothing).
*Fix:* an `updateActor`/`deleteActor` hook re-renders both, only when a shown field changes (status, capture Turn, Weakness, name). *Test:* "the Raid HUD follows the Entities".

**FA-11 · Low · Refusals: silent for a group check, raw keys for others.**
A group check that couldn't open (one Entity ticked, one already open, group checks off) said nothing; a Tell check or year refused for an unworded reason (`error`, `notActiveGM`, `timeout`…) showed the key `DGF.Tell.refused.error`.
*Fix:* `refusalText` / `sayRefused` (module/apps/raid-dialogs.mjs) with words for the group check's reasons and a general line otherwise; nothing extra when `runOp` has already said the Storyteller is gone. *Tests:* "a group check the Storyteller can't open says why"; "a refusal without words of its own still reads as words, never as a key".

**FA-12 · Low · A Cost left on the last raid's card could be picked in the new raid.**
`gmButtons` showed the Cost buttons on any old card, and `raid.cost` applied them, so "Next roll one size smaller" marked the new raid's Entity.
*Fix:* both check the card's raid. *Test:* "a Cost left on a card from the last raid can't be picked in the new one".

**FA-13 · Low · The Storyteller's private roll mode hid the raid's announcements.**
`postCard` applied the poster's roll mode to every card. A Storyteller on *Private GM Roll* whispered the hunt, the chase's ground and Lead, the lock-up and the year to themselves.
*Fix:* the roll mode applies only to a roller's own roll and ability cards. *Test:* "the Storyteller's own roll mode doesn't hide the raid's announcements from the players".

**FA-14 · Medium · The furniture tick doubled the +2 in a premade town.**
Chapter 9: "The furniture's obstacle is already 2 harder." The guide tells the Storyteller to tick *The furniture's extra obstacle*, which adds 2 (at most 12), so Puddlecombe's guard dog, printed 10, was rolled at 12.
*Fix (wording only, no rule change):* the tick says it adds the 2 harder to the Difficulty rolled for it, and to leave it off in a premade town. *Test:* "the roll dialog's furniture tick and the furniture switch say what they do". *To consider:* a premade town could set the Difficulty for the Storyteller (FA-R1's party list would be the place to keep the town).

**FA-15 · Low · The furniture switch's hint contradicted V4.** It said Suspicion rises "while any Entity carries a piece"; since V4 it rises from the Turn the piece is taken until it leaves town, is lost or abandoned, even set down (which is what the code does). Reworded; same test as FA-14.

**FA-16 · Info · Two unused words** (`DGF.Limit`, `DGF.Lead`) removed. New test: "every word in lang/en.json is used by the system" (keys built at run time included). The contracts test now accepts a literal that is a prefix of keys (`"DGF.Tell.refused"` + reason).

### Release

**FA-17 · Low · The release shipped working notes and built without the checks.**
Dry run of `release.yml`: `PORTAL.md` (the family portal page) and `TESTING.md` went into `system.zip`, and the workflow zipped and published without validating or testing.
*Fix:* both are excluded; the workflow installs and runs `npm run check` before stamping and zipping. *Test:* "the release ships only what Foundry needs, and only after the checks pass".

**FA-18 · Info · Stale comments:** `module/config.mjs` said the Standard Limit was 12 (B3 made it 11); `module/logic/chase.mjs` said the local mob was 10 plus half (B3: 8). Comments only.

## Open: questions and recommendations

**FA-R1 · Medium · The system has no notion of "the party": every Entity in the world counts.**
The Entities compendium invites dragging all eight in, and `entities()` (module/raid/chase-flow.mjs) is every Entity actor. Proof (fake Foundry): with an unplayed Werewolf set to Fetch in the world, Ann's way out was Difficulty 7 (*1 easier (Fetch)*), and the final flight's members were the Witch, Dracula **and the Werewolf**, so the flight waited for a roll nobody would make until the Storyteller took it out by hand. Left behind, the helpers list and the Tell and group pickers count every Entity too.
Options: **(1, recommended)** a "in this raid" tick per Entity, set on **New raid** (defaulting to Entities with a player owner) and shown on the HUD; every party rule reads it. (2) Count only Entities with a player owner (simple, but a Storyteller running an absent player's Entity loses it). (3) Leave it and tell the Storyteller to keep only the party's Entities in the world (TESTING.md and the guide).

**FA-R2 · Low · What a request can still claim.** After FA-04 a console request can still claim to be another *connected* Storyteller (a second GM or Assistant), and the card operations (FA-05, FA-06) trust only what the server records (the card's author). Foundry v13 gives a query handler no sender, so this is the floor without server-side identity. Accept.

**FA-R3 · Low · Storyteller handover.** `reconcile` and `driveChase` run on a client's `ready`. If the active GM drops and another GM becomes active, the new one doesn't catch up until the next raid write or a reload. Recommend re-running them on `userConnected` when this client becomes the active GM.

**FA-R4 · Low · A player who drops between posting a chase roll and the Storyteller's client recording it** leaves the chase waiting; when they're back, the tracker lets them roll that round again (the first card was never recorded). Recommend the active GM processing tracked cards on `createChatMessage` (which needs `promptHome` made idempotent first), or a "pick up rolls" button on the tracker that runs `reconcile`.

**FA-R5 · Low · A deleted Entity stays in a running chase or an open group check** until the Storyteller takes it out or closes the check (both possible by hand; nothing crashes). Recommend a `deleteActor` hook that drops it.

**FA-R6 · Info · Undo is Suspicion only.** It cancels an event's Suspicion; a chase or capture that event caused stays (the tracker's buttons and the lock-up's free undo those). Worth a line in the guide.

**FA-R7 · Low · Book question: the Witch's Hedge Spell.** `module/config.mjs` says "…hers or a friend's (in a local chase, only hers)", which REVIEW row 43 lists among PT4's wording fixes, but Chapter 2 doesn't have the bracket (the book audit marks it BA-03). The book is the source of truth: either the bracket goes into Chapter 2, or out of the config. Richard's call.

**FA-R8 · Low · Rule question: Hidden Pockets and furniture.** Captured with Hidden Pockets, the Invisible Man "keeps what you carry"; the system keeps his loot but still takes a piece of furniture (Chapter 6: "the town takes back what you were carrying, furniture included"; F15). Does Hidden Pockets keep a carried piece? Recommend: no (a captive can't carry furniture in the lock-up), and say so in the Perk.

**FA-R9 · Info · What the system leaves to the table.** The campaign upgrades (three at most; one extra charge to an Entity of the players' choice each raid) aren't tracked: the Storyteller sets an Entity's starting charges on its sheet and a new raid refills to it. Also by hand: how many carry a Huge piece and small entrances, a carried move taking two Turns, Spectral, handing loot over, a lost Turn being skipped, one action per Turn.

**FA-R10 · Low · `compatibility.verified` is "14".** Nothing in this repository has run on Foundry 14 (TESTING.md says "13 or 14"). Recommend setting `verified` to the version Richard's TESTING.md run used. In 14, check `ChatMessage.applyRollMode` and the core `rollMode` setting first: they are the v13 calls most likely to move. Everything else is v13's namespaced API (ApplicationV2, DialogV2, ActorSheetV2, TypeDataModel, `foundry.applications.handlebars.renderTemplate`, `renderChatMessageHTML`, `User#query`), with no v1 Application, no deprecated global and no `renderChatMessage`.

**FA-R11 · Info · A player can edit their own Entity's status and charges on the sheet** (as on paper), so a captive could free itself. Accept, or let only the Storyteller change status in the data model's `_preUpdate`.

**FA-R12 · Info · Leaving town isn't behind a switch.** Beating the way out or escaping the flight marks the party out of town whatever the switches (no hunt starts after); **back in town** undoes it.

**FA-R13 · Info · One chase at a time.** A second Entity caught elsewhere while a local chase runs isn't chased: its card keeps **Start the local chase** and the Storyteller is told. The book doesn't rule out two at once; with one tracker this is the honest limit.

**FA-R14 · Info · A Cost chosen as Suspicion +1 raises Suspicion even with *Raise Suspicion automatically* off** (it follows *Apply the Storyteller's Cost*). Consistent with each switch's wording.

## Checked and sound

- **Rules, module by module:** rolls and bands, Criticals (a charge back, never above the start; +2 or two Successes in a chase), the Monster showing (Hypnotic Eyes, Rattle, unseen effects), Costs (never one that costs nothing; Perks remove theirs), abilities and charges, overdraw (+2, the Weakness once the hunt is on, once per flight, never while the Weakness is in play), the one-raise cap and steps cancelling, the eight Entities' dice, signatures, Gifts and Perks (compared word for word with Chapter 2), Jekyll & Hyde's forms (free change on the Monster showing; Steady Nerves; Pillar of Society still changes), Duties, Suspicion's ledger (one roll one rise, the Limit, nothing below 0, the hunt stopping it), Tells (once per place, Familiar's Warning), group checks, the hunt at the Limit or dawn, local chases (Lead 1 to 4, mob 8 + half Suspicion, Night Runner and Fear the Curse alone only), shared chases and the final flight with the majority rule and its ±2, Weaknesses Always and Soon (round 3, restarting in the flight), capture and the town taking the loot (Hidden Pockets), Already Dead (V5 at the Limit), slipping free (once per Turn from the Turn after; Built to Last), rescue, left behind, furniture noise (V4, V11), the way out (Shortcut, Fetch), the year and the epilogue.
- **Settings:** every automation has a world switch and each code path reads it; *Show the odds* is the only client setting.
- **Performance:** renders follow raid writes; the only hook on every actor update returns at once unless a shown field changed; no query over all actors runs per hook.
- **i18n:** every word the system shows is in `lang/en.json` (game text stays in `module/config.mjs`, from the book); no template has literal words.

## Release dry run

`release.yml` reproduced in a scratch directory from a clean `git archive` of `main`: stamped with `VERSION=0.1.0`, zipped with the workflow's own command; nothing tagged or published.

- `system.zip`: 160 KB, 82 files: `system.json`, `README.md`, `LICENSE`, `assets/maps/` (3 maps), `lang/en.json`, `module/` (26), `packs/` (entities, tables, journal: compiled LevelDB only), `styles/`, `templates/` (13).
- Every manifest path, every template the code names and every relative import resolves inside the zip.
- Not shipped: `docs/`, `book/`, `sim/`, `tools/`, `test/`, `node_modules/`, `packs/_source/`, `AGENTS.md`, `package*.json` and, after FA-17, `PORTAL.md` and `TESTING.md`.
- The stamped manifest: `version` 0.1.0, `manifest` `…/releases/latest/download/system.json` (Foundry sees updates), `download` `…/releases/download/v0.1.0/system.zip` (pinned). The version comes from the dispatch input or the `v*` tag and must be semver.
- The clean checkout passes `npm run check` (the step the release now runs first).
