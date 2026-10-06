# Testing the Foundry system in real Foundry — slice 1

The automated tests run the system on a stand-in for Foundry. This script checks the same things in the real thing, with two browsers: you as the **Storyteller (GM)** and one **player**. It takes about 30 minutes. Dice are random, so some steps say "roll until…".

**What slice 1 covers:** the Entity sheets, the roll dialog and roll cards, charges and abilities, Costs, Jekyll & Hyde's change of form, and the Raid HUD (Suspicion, the Limit, the Turns, dawn and the hunt).
**Not built yet (slice 2):** chases (the Lead, the chase table, the majority rule), the lock-up, group checks sharing one Suspicion rise, and Tell checks.

## Setup

1. Until a release is published, copy the repository folder into your Foundry data folder as `Data/systems/dont-get-forked` (the folder name must match). Restart Foundry. *(After a release: Install System → manifest URL `https://github.com/PainHog/DontGetForked/releases/latest/download/system.json`.)*
2. Create a world with the system **Don't Get Forked** (Foundry 13 or 14) and launch it.
3. In **Configure Players**, add a player user, say **Ann** (role: Player).
4. Browser 1: log in as Gamemaster. Browser 2 (or a private window): log in as Ann.
5. Keep the browser console open in both (F12 → Console). Any red error is worth a screenshot.

## 1. The world loads

- **GM:** a small **The Raid** window (top left): *Suspicion 0 / 13*, a row of 13 empty boxes, *Turn 1 of 12 · Standard*, and buttons (+1, −1, Undo, ◀ Turn, Next Turn ▶, Start the hunt, New raid). The chat shows **A new raid** (Standard: Suspicion 0 of 13, 12 Turns until dawn) the first time the world loads.
- **Ann:** the same window with the numbers but **no buttons**.
- **GM:** Game Settings → Configure Settings → *Don't Get Forked*: six switches (Raise Suspicion automatically, Spend charges automatically, Jekyll becomes Hyde automatically, Apply the Storyteller's Cost, Start the hunt automatically, Show the Raid HUD), all on, plus *Show the odds when rolling* (each player's own).

## 2. Making Entities

1. **GM:** Actors sidebar → **New Entity**. Pick **A Witch**, player **Ann** → *Create*. Her sheet opens:
   - dice **Brawn d6 · Nimble d4 · Sly d10 · Charm d8 · Wits d12**; **Charges 3 / 3**;
   - **Hedge Spell** (signature) with the book's text; **Gift: Witchcraft** set to *Broomstick (default)*; **Perk** *Familiar's Warning (default)*; **Castle Duty** *Cook (default)*;
   - **Weakness: Rowan (Soon)** and **Tell: A Black Cat**, with the book's text;
   - Status *Active*, Carrying furniture (unticked), *Carrying: Nothing yet*, Notes.
   - Change the Gift to *Black Cat*: the text under it changes. Change it back.
2. **GM:** New Entity → **Dracula**, no player. Then New Entity → **Jekyll & Hyde**, player **Ann**. The chooser marks Entities already in the world ("already in this world").
3. **Ann:** the Actors sidebar shows all three. Ann can edit the Witch and Jekyll & Hyde, and open Dracula's sheet read-only.

## 3. A plain roll

1. **Ann:** on the Witch's sheet, click **Sly d10**. The roll dialog shows: Trait called (Sly), Second die (Mask d6 / Monster d10), Difficulty (6 easy … 12 daunting, 8 selected); her abilities (Hedge Spell, Broomstick); *Help from the others* (Dracula's Bat, "3 left"); the situation (Castle Duty, the loud way, watched, the way out, a chase roll); and an odds line at the bottom.
2. Change the second die to **Monster d10**: the odds line updates and adds "The Monster shows …%". *(If it doesn't update, note it: the line is meant to follow every change.)*
3. Click **Roll**. In **both** browsers a card appears: both dice with their faces, the total "against 8", and **Success**, **Cost** or **Trouble**.
   - If the Monster die rolled higher than the Sly die: *The Monster shows.* and **Suspicion +2 (the Monster shows) — on the track**, and the Raid window shows **2 / 13** in both browsers.
   - On Trouble with nothing showing: *Suspicion +1 (Trouble)*.
   - Doubles on a Success: *Critical: a spent charge back*.
4. **GM** sees a **Cancel Suspicion** button on cards that raised Suspicion; **Ann** sees no buttons.
5. Roll again with *Watched* ticked until you get Trouble: the card says **Caught! Someone was watching: a local chase starts (Chapter 6)** (the chase itself is slice 2). Unticked, Trouble says *Nobody was watching: no chase.*
6. Tick *The way out of town*: the dialog's line says Difficulty 8 for Standard; the card says "against 8" and "the way out".

## 4. Costs

1. **Ann** rolls (Mask) until a **Cost** (1–2 short). The card says *Cost — the Storyteller picks one: Suspicion +1 · Lose a Turn · Next roll one size smaller*. (*Drop an item* only appears when the roller carries something; *Suspicion +1* doesn't appear when the roll already raised Suspicion.)
2. **GM** sees those three as buttons; Ann sees none. GM clicks **Next roll one size smaller**: the card says *Cost: Next roll one size smaller*, the buttons go, and the Witch's sheet shows *Next roll's trait die one size smaller (1)*.
3. **Ann** clicks Sly again: the dialog warns about the smaller die; the card says "rolls Sly (d8)" and "One size smaller (a Cost)". The mark disappears from the sheet.
4. On another Cost, **GM** picks **Suspicion +1**: the Raid window goes up by 1.
5. On another, **GM** picks **Lose a Turn**: the card says "loses Turn 2" (one more than the current Turn) and the sheet shows *Loses Turn 2*.
6. **Ann:** *+ Add an item* → "a jar of honey". On the next Cost, **GM** picks **Drop an item**: the honey disappears from the sheet and the card says it dropped. (With two or more items, the GM is asked which one.)

## 5. Abilities and charges

1. **Ann:** roll Sly with **Hedge Spell** ticked: the card says "rolls Sly (d12)" and "Raised one size"; the sheet's charges go **3 → 2**.
2. Tick **Hedge Spell** *and* **Castle Duty**: a warning says *At most one raise per roll, from any source, Castle Duty included*, and the dialog opens again.
3. Tick **Bat (Dracula)**: the card says "rolls Nimble … instead of Sly" and "Dracula spends 1"; **Dracula's** sheet (GM) shows 2 charges. (Ann can't edit Dracula; the Storyteller's client did it.)
4. Set the Witch's charges to **0** on the sheet, tick Hedge Spell and roll: the card says *A Witch overdraws (Suspicion +2)* and the Raid window rises by 2 (unless the roll itself raised 2: one roll raises Suspicion once, by its biggest trigger).
5. Click **Spend a charge** with 0 charges: a confirm asks about Suspicion +2; yes → a card *A Witch uses an ability* and Suspicion +2. Put her charges back to 3.

## 6. Jekyll & Hyde

1. **Ann:** open Jekyll & Hyde: the subtitle says **Jekyll**, dice Brawn d4 · Nimble d6 · Sly d8 · Charm d12 · Wits d10, and a **The Draught** button.
2. Roll **Brawn** with the **Monster** until the Monster die beats the Brawn die (often, with a d4): the card says **Hyde takes over.** and the sheet changes to **Hyde**: Brawn d12 · Nimble d10 · Sly d8 · Charm d4 · Wits d6. No charge spent.
3. Click **The Draught**: back to Jekyll, still 3 charges (*Practised Hand*: changing back costs nothing); the card says so. Click it again: Hyde, and 2 charges.

## 7. The Storyteller's controls

1. **GM:** on the Raid window press **+1**, **−1**, **Undo**: the number moves each time, in both browsers.
2. The list under the buttons shows each event (T1 · A Witch: the Monster shows …) with **Cancel**. Cancel a roll's event: Suspicion drops by its amount, the line is struck through with **Restore**, and that roll's card now says *cancelled by the Storyteller* with a **Restore Suspicion** button. Restore it.
3. Press **Next Turn ▶** until *Turn 12 of 12*, then once more: **Dawn**. The chat says **The whole town hunts** (Dawn came…) and the window shows it in red.
4. **Ann** rolls now: the dialog says the Mask is off; the card rolls the Monster whatever was chosen, and raises no Suspicion.
5. **GM:** **Stop the hunt**, then **◀ Turn**: back to Turn 12, no dawn, no hunt.
6. **New raid** → *Easy (Limit 12)*: Suspicion 0 / 12, Turn 1, a "A new raid" card. Press **+1** twelve times: at 12 the hunt starts by itself (*Suspicion reached the Limit*); more presses don't go past 12. New raid → Standard again.

## 8. Who may change what

1. **Ann** has no buttons on the Raid window and no buttons on any card.
2. *(Optional)* In Ann's console: `game.settings.set("dont-get-forked", "raidState", {})` → an error; nothing changes.
3. **GM:** close the GM browser tab. **Ann** rolls with the Monster until it shows: a warning *The Storyteller isn't connected — nothing was changed.*; the card says *not on the track yet*. **GM** logs back in: within a few seconds the Raid window includes that roll and the card says *on the track*.

## 9. Switching automations off (Configure Settings)

Turn each off, check, and turn it back on:

| Switch off | What you should see |
|---|---|
| Raise Suspicion automatically | Ann's roll card says *not on the track yet*; the GM's card has **Apply Suspicion**, which applies it |
| Spend charges automatically | Abilities on a roll don't change any charges; a Critical gives nothing back |
| Jekyll becomes Hyde automatically | When the Monster shows on Jekyll's roll, the card says to drink the Draught by hand; the sheet stays Jekyll |
| Apply the Storyteller's Cost | Picking a Cost only records it on the card (no mark on the sheet, no Suspicion) |
| Start the hunt automatically | At the Limit, a card says **At the Limit**; the hunt waits for **Start the hunt** |
| Show the Raid HUD | The Raid window closes for everyone; on again, it reopens |
| Show the odds when rolling (Ann's own) | Ann's roll dialog has no odds line |

## What to send back

For anything that looked wrong or clumsy: which step, what you expected, what happened, a screenshot, and any red console lines. Also how the sheet, cards and Raid window look in your Foundry theme (light and dark), since only you can see them.
