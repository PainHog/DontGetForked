# Foundry system audit (2026-10-06)

The whole Foundry VTT system, not one diff: `system.json`, `module/` (rules logic, apps, sheet, chat cards, raid store, chases and the lock-up, GM operations, dice, settings), `templates/`, `lang/en.json`, `styles/`, `packs/`, `tools/`, `test/`, `.github/workflows/` and `TESTING.md`, read against the rulebook (`book/src/chapters/*.html`, the source of truth) and `docs/LESSONS.md` (Foundry). There is no live Foundry here: every finding is proved by a test on the fake Foundry (`tools/fake-foundry.mjs`) or by the exact code path.

**Result:** 18 findings fixed in the audit, each with a test written to fail first (`test/audit.test.mjs`, 19 tests); then, on Richard's decisions F26 and V16 (DESIGN.md, 2026-10-06), six of the open ones (`test/party.test.mjs`, 14 tests). Then FA-R6, R9 and R11 were fixed too, FA-R7 was resolved in the book, and the rest are accepted: nothing is left open. `npm run check` on `main` after the last round: 272 tests (the other audits' included), 272 pass, 0 fail.

| Severity | Fixed | Resolved in the book | Accepted | Total |
|---|---|---|---|---|
| High | 1 | 0 | 0 | 1 |
| Medium | 7 | 0 | 0 | 7 |
| Low | 14 | 1 | 1 | 16 |
| Info | 5 | 0 | 3 | 8 |
| **Total** | **27** | **1** | **4** | **32** |

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

## Fixed after Richard's decisions (F26, V16)

Tests in `test/party.test.mjs`; the human steps are `TESTING.md` section 21.

**FA-R1 → F26 · Medium · The system had no notion of "the party": every Entity in the world counted.**
Proof (before): with an unplayed Werewolf set to Fetch in the world, Ann's way out was Difficulty 7 (*1 easier (Fetch)*), and the final flight's members were the Witch, Dracula **and the Werewolf**, so the flight waited for a roll nobody would make. Left behind, the helpers, the Tell and group pickers and the sheet's Duty clashes counted every Entity too.
*Fix:* each Entity has an *In this raid* mark (`system.inRaid`; missing, as in an older world, counts as in). **New raid** sets it for every Entity with a player owner and clears it for the rest; the Storyteller changes it on the Raid window (**In this raid** list: **add** / **take out**, a GM operation `raid.member`) or on the sheet (the tick shows only to a GM). Every raid rule now reads only the Entities in the raid (`entities()` in module/raid/chase-flow.mjs; `allEntities()` is the whole world): Fetch's way-out ease, the final flight at the Limit or at dawn, a caught Entity's chase, group and Tell checks (pickers and operations), helpers, carried furniture's noise, the lock-up list, rescue, left behind and the year, the sheet's party clashes. A new raid's reset (*A new raid resets the Entities*) applies to the Entities in it; one ticked in later is made ready then, once per raid (the raid keeps `readied`; an older raid without it makes nobody ready twice). An Entity outside the raid can still roll; its roll dialog says it isn't in the raid. *Tests:* "F26: a new raid puts every Entity with a player owner in the raid, and only those", "… without the mark … counts as in the raid", "… Fetch that isn't in the raid doesn't ease the way out; ticked in on the Raid window, it does", "… the final flight takes only the Entities in the raid; helpers come only from the raid", "… group and Tell checks pick from the Entities in the raid only", "… the lock-up and the year count only the Entities in the raid", "… a new raid resets only the Entities in it; one ticked in later is made ready then", "… the sheet shows the Storyteller the tick; a player can't change it there".
The compendium guide says who the raid holds and that a new raid frees every Entity in the raid.

**FA-R3 · Low · Storyteller handover.** `reconcile` and `driveChase` ran only on a client's `ready`, so a GM who became the active one when the other dropped didn't catch up on rolls the other never saw.
*Fix (module/dont-get-forked.mjs):* on `userConnected`, a client that has just become the active GM runs the same catch-up as `ready` (a raid to play, the rolls nobody saw, a chase where it stopped). *Test:* "a Storyteller who takes over (the active one drops) catches up on the rolls the other never saw" (the fake Foundry now fires `userConnected`).

**FA-R4 · Low · A chase roll whose request was lost (its roller dropped mid-roll) left the chase waiting**, and let the roller roll that round again on return.
*Fix (module/raid/chase-flow.mjs):* the active Storyteller's client picks a chase round's card up as it arrives (`createChatMessage`); `raid.roll` is idempotent for a chase card, so the roller's own request then changes nothing. Only chase-round cards (not caught, lock-up, way-out or group cards, whose side effects aren't all idempotent; reconcile still covers those). The Storyteller can also roll a member's chase roll for them from the tracker (a GM owns every Entity), and it counts. *Test:* "a chase roll whose request was lost still counts; the Storyteller can roll a member's chase roll for them".

**FA-R5 · Low · A deleted Entity stayed in a running chase or an open group check.**
*Fix:* on `deleteActor` the active Storyteller's client takes it out of the chase (the round can then complete and the Lead moves; with nobody left the chase is off) and out of the group check (complete without it, the check closes and anyone caught flees, as when the Storyteller closes it). *Test:* "a deleted Entity leaves a running chase and an open group check" (the fake Foundry now deletes actors).

**FA-R8 → V16 · Low · Hidden Pockets keeps the loot you carry, not furniture.** The system already did this (the capture keeps the loot, takes the piece and marks it lost for the night, F15); a test now pins it: "V16: captured, Hidden Pockets keeps the loot but not the furniture (F15)". The Perk's wording is the book's (another session).

**V17 · Out of Sight with anyone carrying beside you** (a ruling after the audit: "Trouble gets you caught only while you or anyone with you carries loot or furniture"). The system doesn't track who is at which place, so the Invisible Man's roll dialog has a tick, *Someone with you carries loot or furniture*, ticked to start with when another Entity in the raid carries loot or furniture. His own carrying counts by itself, and so does a helper's on that roll (a helper is at the same place). The card says which made him visible (*he carries…*, *{helper}, helping him, carries…*, *someone with him carries…*). Logic: `DGF.perkRules.outOfSight.withYou`, the roll plan's `carryingBy`. *Tests:* "V17 Out of Sight: caught only while you or anyone with you carries loot or furniture; the card says which" (test/roll-plan.test.mjs) and "V17 Out of Sight at the table…" (test/audit.test.mjs); TESTING.md section 21, step 9.

**B7 · Mesmerise only where someone's watching; the lock-up 10 on every difficulty** (a ruling after the audit). The roll plan refuses Dracula's Mesmerise (the signature's `watchedOnly` flag) on a roll that isn't watched (`openNotWatched`); the way out and the lock-up always are. The roll dialog greys it out until *Watched*, the way out or the lock-up is ticked, and says "where someone's watching". Nothing in `module/` hard-codes the lock-up's Difficulty (it is read from `DGF.labels`), so Hard's 10 needed no code change. *Tests:* "B7: Mesmerise opens an approach only where someone's watching…" (test/roll-plan.test.mjs) and "B7 at the table…" (test/audit.test.mjs); TESTING.md section 21, step 10.

**V19 · Spectral, not while carrying** (a ruling after the audit: "…unless you carry loot or furniture"). Spectral wasn't automated before; now a group check lets a Spectral Ghost that carries nothing past without rolling (it isn't waited for and can't be caught; `DGF.perkRules.spectral`, `spectralPasses` in module/logic/checks.mjs), and one that carries loot or furniture rolls like anyone else. The group card names both, and the Ghost's roll dialog says it's past. A Ghost alone at a group obstacle (no group check) is still the Storyteller's call. V20 (Thistlewick's neighbour) is town data only: nothing in `module/` names it. *Tests:* "V19 Spectral: a Ghost gets past a group obstacle without rolling, unless it carries loot or furniture" and "V19 at the table…" (test/audit.test.mjs); TESTING.md section 21, step 11.

**FA-R10 · Low · `compatibility.verified` was "14", untested.** Now "13" (minimum 13) until Richard tests on 14; TESTING.md says Foundry 13. In 14, check `ChatMessage.applyRollMode` and the core `rollMode` setting first: they are the v13 calls most likely to move. Everything else is v13's namespaced API (ApplicationV2, DialogV2, ActorSheetV2, TypeDataModel, `foundry.applications.handlebars.renderTemplate`, `renderChatMessageHTML`, `User#query`), with no v1 Application, no deprecated global and no `renderChatMessage`. *Test:* "the manifest claims the Foundry version it was tested on (13) until Richard tests on 14".

## Fixed in the last round (Richard: "all recommended, keep going")

**FA-R11 · Info · Only the Storyteller changes an Entity's status.** A player could free its own captive from the sheet. Now the data model's `_preUpdate` (module/data/entity-data.mjs) drops a player's change to `status`, `capturedTurn`, `slipTurn` or `inRaid` (the rest of the update saves) and tells them; the sheet shows a player its status as words. Charges, notes and marks stay the player's, as on paper. Foundry runs a system's data model on the clients only, so this stops the sheet and the ordinary API, not a hand-made socket message (FA-R2's floor). *Test:* "FA-R11: only the Storyteller changes an Entity's status; players keep their own charges and notes" (the fake Foundry now runs `_preUpdate`).

**FA-R9 · Info · Campaign play: castle upgrades.** Chapter 7's optional box: "each piece of furniture or decor brought home becomes a castle upgrade. In every later raid, each upgrade gives one Entity of the players' choice one extra charge. The castle holds three upgrades at most; bringing home a fourth replaces one of them." A new switch, *Campaign play: castle upgrades (optional)*, off by default. The castle's upgrades are a world setting (three at most; `addUpgrade`). A year card that brings a piece home gives the Storyteller **Add a castle upgrade** (once per card, before the next raid; a fourth asks which one it replaces). The rule says any piece brought home, so the button shows on any year card that brought one home (usually a Grand Year). At **New raid**, a second form asks which Entities in the raid get the extra charges (one per upgrade; `assignExtraCharges` refuses more than the castle has, or an Entity outside the raid); each starts the raid with them (`charges.extra`, shown on the sheet as "+n from castle upgrades"), and a Critical gives a charge back up to that raid's starting number. Upgrades and extra charges are announced on a card; the Raid window shows *The castle: n of 3 upgrades*. *Tests:* test/campaign.test.mjs (5).

**FA-R6 · Info · The guide now says what Undo does.** A line in the compendium guide (tools/gen-pack-source.mjs, packs rebuilt): Undo (or Cancel Suspicion on a card) cancels an event's Suspicion only; a chase or a capture it caused is undone with the chase tracker's buttons and the lock-up's free. *Test:* "FA-R6: the compendium guide says Undo cancels Suspicion only".

**V21 · Drop your loot any time; picking it up costs your next action; V22 · two items in one place** (rulings after the audit, Chapter 3: "A dropped item (drop yours any time) falls where you are; picking it up costs your next action"). The sheet has **drop** beside each item an Entity carries; a Cost's "drop an item" takes the same path (module/raid/store.mjs `dropFrom`). The system doesn't track places, so a dropped item waits in the raid's state (`dropped`, with who dropped it; `dropLoot` / `pickUpLoot` in module/logic/raid.mjs) and the Raid window lists it with **pick up**: the Entity that picks it up carries it and its next action is spent (`nextActionLost`, shown on its sheet and in its roll dialog; its next roll clears it). The owner or a Storyteller drops and picks up (operations `raid.drop`, `raid.pickUp`, checked from the request); a captive can't pick up; a new raid clears both. A new switch, *Dropped loot waits where it fell* (on): off, a dropped item just leaves the sheet. Furniture keeps its own path (taking a piece is free, V4/V11), so it doesn't share the pick-up cost. V22 needs no code: the system has no locations, and two list items carried home both count (a test pins it). *Tests:* test/drop.test.mjs (9).

**V23–V25 · after playtest PT9.** V24, nothing dropped in a local chase: `raid.drop` refuses (`inChase`) while the Entity is a member of a running local chase (`inLocalChase` in module/logic/chase.mjs), the sheet greys its **drop** buttons with a tooltip, and a player can't untick *Carrying furniture* then (the data model drops the change; the Storyteller can). A final flight isn't a local chase, and a Cost's drop comes from a raid roll, so neither is affected. V25, picking up is the Entity's action for that Turn: the pick-up records the Turn and what was picked up (`pickedUpTurn`, `pickedUp`; the old `nextActionLost` mark is gone); more pick-ups the same Turn join the same mark at no further cost; the roll dialog says so only on another roll that Turn; the mark clears at **Next Turn** or a new raid (or by hand on the sheet). V23, the lock-up is watched for slipping free: already so, and a test pins that Mesmerise is offered there. *Tests:* test/drop.test.mjs (the V24 and V25 tests) and test/audit.test.mjs ("B7 at the table…").

**V26–V27 · after playtest PT10.** V26, taking a set-down piece back up is an action: the raid records the Turn the piece was first taken (`furnitureTakenTurn`; an older raid without it counts as "not this Turn"), and when an Entity ticks *Carrying furniture* while the piece is in play in any other Turn (`isFurnitureRetake` in module/logic/raid.mjs), the data model gives it the same pick-up mark as loot for this Turn (`pickedUpTurn`, "the furniture" in `pickedUp`; the system doesn't track the piece's name). So each carrier of a Huge piece taking it back up spends an action, while the first take, and a second carrier joining it that Turn, stay free (corrected after be42015, which let a second re-taker join free). V27, nothing is picked up in the final flight: `raid.pickUp` refuses (`flight`) once the hunt is on, the Raid window hides its **pick up** buttons and says what's dropped is left in town, and a set-down piece isn't taken back up. A drop in the flight is allowed and simply isn't listed (the simpler choice): the item leaves the sheet and a card says it's left in town. A captive can't pick up (refused, `captured`; already tested). "Between places, the one you left" needs no code (the system has no places). *Tests:* test/drop.test.mjs ("V26: …", "V26 at the table…", "V27: …").

**V28 · after playtest PT11: nothing handed to a captive, nothing handed over from a local chase.** The system has no hand-over action (players edit the carried list), so the Entity's data model guards it, as it guards *Carrying furniture*: a player's edit that would give a captive an item, or take one from an Entity in a running local chase, is dropped with a warning (`carriedChangeRefused` in module/logic/lockup.mjs: items compared by name as a multiset; `raid.drop` already refused in a chase). The Storyteller's client still corrects either, and the chase's own capture (run by the Storyteller's client) clears the list as before. *Tests:* test/drop.test.mjs ("V28: …", "V28 at the table…").

**The Entity sheet spells each power out as Chapter 2 does** (Richard, 2026-10-07). The sheet shows the signature, every Gift version and every Perk with the book's heading and cost (*1 charge*; *pick one · 1 charge a use*; *pick one · always on*; localised), the rule from module/logic/power-text.mjs (`powerRule`, `perkParts`) and the flavour in italics, the chosen Gift and Perk marked; the Weakness with its timing spelled out (`weaknessTiming`) and the Tell's flavour in italics. The roll dialog's ability lines say the same things in context, so they stay. The compendium Entities carry no descriptions, so no pack changed. *Tests:* test/sheet-powers.test.mjs compares each sheet line with the book's (book/tools/entity-entries.mjs `powersHtml`) for four Entities.

**FA-R7 · Low · Resolved in the book:** the book audit (BA-03) put "(in a local chase, only hers)" into Chapter 2's Hedge Spell, so the book and the config agree.

## Accepted

**FA-R2 · Low · What a request can still claim.** After FA-04 a console request can still claim to be another *connected* Storyteller (a second GM or Assistant), and the card operations (FA-05, FA-06) trust only what the server records (the card's author). Foundry v13 gives a query handler no sender, so this is the floor without server-side identity. Accept. *Accepted (Richard, 2026-10-06).*

**FA-R12 · Info · Leaving town isn't behind a switch.** Beating the way out or escaping the flight marks the party out of town whatever the switches (no hunt starts after); **back in town** undoes it. *Accepted.*

**FA-R13 · Info · One chase at a time.** A second Entity caught elsewhere while a local chase runs isn't chased: its card keeps **Start the local chase** and the Storyteller is told. The book doesn't rule out two at once; with one tracker this is the honest limit. *Accepted.*

**FA-R14 · Info · A Cost chosen as Suspicion +1 raises Suspicion even with *Raise Suspicion automatically* off** (it follows *Apply the Storyteller's Cost*). Consistent with each switch's wording. *Accepted.*

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

# Drop and pick-up review (2026-10-07)

Today's V21–V28 work in the Foundry system (`git diff 1d72371^..HEAD -- module templates lang test`): the `raid.drop` and `raid.pickUp` operations (module/raid/store.mjs), `dropLoot`, `pickUpLoot` and `isFurnitureRetake` (module/logic/raid.mjs), `inLocalChase` (module/logic/chase.mjs), `carriedChangeRefused` (module/logic/lockup.mjs), the Entity data model's guards (module/data/entity-data.mjs), the pick-up mark and its clearing, the sheet's **drop**, the Raid window's **pick up** and the roll dialog's notice, read against the book (Chapter 3's Cost and dropping, Chapter 4's Turn and the piece, Chapter 6's local chase, lock-up and final flight). Every finding fixed here was proved first by a test that failed on the code before the fix (`test/drop-audit.test.mjs`, 11 tests); `npm run check` afterwards: 283 tests, 283 pass, 0 fail.

| Severity | Fixed | Not proved | Total |
|---|---|---|---|
| Medium | 4 | 0 | 4 |
| Low | 5 | 6 | 11 |
| **Total** | **9** | **6** | **15** |

## Proved and fixed

**FA-D1 · Medium · A double click on drop dropped the same item twice.** `dropFrom` read the carried list before the last drop's write had landed, so two quick clicks (or a player's drop and the Storyteller's "drop an item" Cost at once) each took the same item: one jar of honey on the sheet became two on the Raid window.
*Fix:* drops run one at a time on the Storyteller's client, each reading the list the last one left, and the sheet sends the item's name, which must still be at that place in the list, so the second click drops nothing. *Test:* "a double click on drop drops one item once: never the same item twice, and never a second item".

**FA-D2 · Medium · V26: in the Turn of the first take, a carrier could set the piece down and take it back up for free.** Chapter 4: "Taking a piece is free (taking it back up is an action)". The Turn check couldn't tell a second carrier joining the first take (free) from the first carrier taking it back up, so in that Turn the piece could be set down before a roll and taken up again at no cost (the dodge V26 was made to close).
*Fix:* `isFurnitureRetake(state, { setDown })`: in the Turn of the first take it's a retake when nobody else carries the piece now (it was set down); joining a carrier that Turn stays free. *Test:* "V26: the first carrier who sets the piece down and takes it back up in the Turn of the first take spends an action".

**FA-D3 · Medium · V27: a final flight starting in the Turn of the first take let a piece set down in the flight be taken back up.** Same cause: the "nothing is picked up in the final flight" check sat behind the Turn check, so with the Limit reached in the same Turn as the first take, a carrier could drop the piece in the flight and take it again.
*Fix:* as FA-D2 (nobody carries it now, so it's a retake, refused in the flight). *Test:* "V27: the final flight starting in the Turn of the first take: a piece set down in the flight isn't taken back up".

**FA-D4 · Low · With "Dropped loot waits where it fell" off, its rules still ran.** The switch's hint puts "nothing is dropped in a local chase" and the pick-up action under it, but off, `raid.drop` still refused a drop in a local chase, the sheet still greyed its buttons, the data model still refused a player's furniture and carried-list edits (V24, V28), and taking the piece back up was still marked as an action and refused in the flight (V26, V27). Off must leave the sheet usable by hand.
*Fix:* each of these reads the switch; off, a drop just leaves the sheet and the table keeps the rules by hand. The hint now says everything the switch covers. *Test:* "with 'Dropped loot waits where it fell' off, the drop and pick-up rules are by hand: nothing refused, no action marked".

**FA-D5 · Low · An Entity outside the raid dropped its loot into this raid's town (F26).** The Raid window listed it, and an Entity in the raid could pick it up, though the one that dropped it couldn't (pick-up already takes only Entities in the raid).
*Fix:* an Entity that isn't in the raid isn't in town: its drop just leaves the sheet, as with the switch off. *Test:* "an Entity that isn't in this raid drops nothing into the town: nobody in the raid can pick it up".

**FA-D6 · Low · A drop refused in a local chase said nothing on a sheet opened before the chase.** The sheet doesn't re-render when the raid changes, so its **drop** buttons were still live after its Entity was caught, and the refusal was silent.
*Fix:* the sheet warns "Not in a local chase…" when the drop is refused for that. *Test:* "a drop refused in a local chase says why, even from a sheet opened before the chase began".

**FA-D7 · Low · The roll dialog called a flight roll a second action.** After a pick-up, the dialog said "that was its action for the Turn" on every roll that Turn, including the final flight started later that Turn by the Limit, where everyone flees and rolls.
*Fix:* the notice isn't shown on a chase roll or once the hunt is on. *Test:* "the pick-up notice is for the Turn's own rolls: a flight roll later that Turn isn't a second action".

**FA-D8 · Medium · Once the party was out of town, the Raid window still offered pick up.** After the way out was beaten, an item left in town could be picked up, and then counted as home in the year's starting ticks. "Anyone there may pick up": nobody is there any more.
*Fix:* `raid.pickUp` refuses (`outOfTown`) once the party is out of town or the raid is over; the Raid window drops its **pick up** buttons and says *Out of town: all this is left behind*. *Test:* "once the party is out of town, nothing left in town is picked up: it can't come home".

**FA-D9 · Low · The Storyteller taking the piece back up for an Entity marked no action.** The data model skipped every Storyteller write, so a GM ticking *Carrying furniture* for an Entity they play (TESTING.md section 14 has the GM do it for Dracula, and expects the mark) took the piece back up for free, and the Storyteller had to remember the action by hand.
*Fix:* the action is the Entity's whoever ticks it; in the final flight a Storyteller's tick is still a correction and stands, unmarked (as with V24 and V28). *Test:* "V26: the Storyteller taking the piece back up for an Entity (TESTING.md's GM does it for Dracula) marks its action too; in the flight it's a correction".

**FA-D10 · Low · The roll dialog's "lose a Turn" notice showed on flight rolls too** (the same class as FA-D7). An Entity that lost its Turn to a Cost was told so on every roll that Turn, including the final flight started later that Turn by the Limit, where everyone flees and rolls.
*Fix:* one pure check for a Turn's marks, `turnMarkApplies` in module/logic/raid.mjs: a lost Turn and a pick-up speak to that Turn's raid rolls only (not a chase roll, not once the hunt is on, not at dawn); the dialog uses it for both. *Tests:* "a Turn's mark (a lost Turn, a pick-up) is for that Turn's raid rolls…" and "the lose-a-Turn notice is for the Entity's raid rolls: a flight roll later that Turn doesn't get it" (test/drop.test.mjs).

**FA-D11 · Low · An Entity outside the raid took the raid's piece (F26).** Ticking *Carrying furniture* on an Entity ticked out of the raid marked the town's piece taken (and so noisy every Turn), through the V4 hook in module/raid/store.mjs, which didn't check the raid.
*Fix:* `takesThePiece` (module/logic/raid.mjs): only an Entity in the raid takes the piece; outside it, the tick just stays on its own sheet, and it doesn't count as taking a set-down piece back up either (it isn't in town). *Tests:* "F26: only an Entity in the raid takes the raid's piece" and "an Entity that isn't in this raid ticking Carrying furniture doesn't take the raid's piece" (test/drop.test.mjs).

TESTING.md section 14 has the human steps for FA-D1, D2, D4, D8 and D9.

## Suspected, not proved (not changed)

- **Two pick-ups by one Entity at once** (two different items) could lose one if the first's actor write landed after the second read the list. On the fake Foundry both land, and in Foundry each pick-up's actor write follows its raid write, which the server answers in order.
- **Next Turn racing a pick-up** could clear the mark of a pick-up made in the new Turn. Not reproducible on the fake Foundry.
- **A freed captive "acts again next Turn"**, and an Entity that lost its Turn "skips its next action", yet either can pick up that Turn. The system doesn't record when a captive was freed, and, as with rolls, a second action gets a notice at most, never a refusal.
- **A cornered Entity with "Run the lock-up automatically" off** can drop or hand over before the Storyteller captures it by hand (its chase has ended). That's by the switch.

## Checked and sound

- **Authority:** `raid.drop` and `raid.pickUp` act only for the Entity's owner or a Storyteller, checked from the request; a request claiming to be the active Storyteller or a user who isn't connected is refused (FA-04); claiming another connected player is FA-R2's accepted floor. A player can't drop or pick up for another player's Entity (tested in test/drop.test.mjs).
- **Two clients picking up the same item:** the raid's one write queue gives it to the first; the second is told it's gone.
- **HTML in item names** is escaped everywhere it appears: the Raid window, the chat cards, the sheet, the roll dialog's notice, the drop-an-item and pick-up dialogs.
- **Turn boundaries:** Next Turn clears every pick-up mark, Turn 12 into dawn included; a new raid clears the marks, the dropped list and the first take's Turn; stepping a Turn back clears nothing.
- **An older saved raid** (normalizeRaid) gets an empty dropped list and no first-take Turn (any take while in play counts as taking it back up, as documented for V26).
- **The data model's guards skip every Storyteller write:** a capture emptying the list, a new raid's reset, an Entity ticked in later, the Cost's drop, the Storyteller's corrections (only the action mark for taking the piece back up applies to a Storyteller's tick, FA-D9; no automated flow ticks it).
- **Chases:** a local chase the Limit ends puts its members in the flight, where they may drop (left in town); every member of a shared local chase is held to it; a Huge piece's carriers each spend an action taking it back up in a later Turn, while joining the first take is free.
- **A Storyteller handing over:** the operations run on whichever GM is active, and nothing in this work keeps state outside the raid setting and the Entities (the one-at-a-time drop queue is per client and empty between drops).
