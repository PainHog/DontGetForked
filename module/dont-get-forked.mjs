/**
 * DON'T GET FORKED
 * A tabletop roleplaying game by Richard Moore.
 * Foundry VTT game system — entry point.
 *
 * This file only wires things up: data models, sheets, settings and GM
 * operations in "init"; runtime services in "ready". Rules logic lives in
 * module/logic/ (Foundry-free, tested with node --test); shared names in
 * module/contracts.mjs.
 *
 * Slice 1 (the core loop at the table): the Entity actor and sheet, the roll
 * dialog and roll card, the raid state (Suspicion ledger, Limit, Turns, dawn,
 * the hunt) with its HUD, all GM-authoritative and switchable in settings.
 * TODO(slice 2): chases (Lead track, chase table, majority rule) and the lock-up.
 */

import { DGF } from "./config.mjs";
import { SYSTEM_ID, ACTOR_TYPES } from "./contracts.mjs";
import { EntityData } from "./data/entity-data.mjs";
import { EntitySheet } from "./sheets/entity-sheet.mjs";
import { registerSettings } from "./settings.mjs";
import { registerGmOps, listenSocket, runOp, isActiveGM } from "./net/gm-ops.mjs";
import { registerRaidOps, onRaidChange, primeRaid, seedRaid, reconcile, getRaid, raidView, mutateRaid } from "./raid/store.mjs";
import { onRenderChatMessage } from "./chat/cards.mjs";
import { rollEntity, performRoll, spendCharge, drinkDraught } from "./dice/rolling.mjs";
import { createEntity, newEntityFlow, onRenderActorDirectory } from "./entities/create.mjs";
import { RaidHud, openHud, refreshHud, onHudSetting, currentHud } from "./apps/raid-hud.mjs";

/* -------------------------------------------- */
/*  Init                                        */
/* -------------------------------------------- */

Hooks.once("init", function () {
  console.log("Don't Get Forked | Initialising the system.");

  // Static game data, reachable as CONFIG.DGF (and from macros/modules via the API below).
  CONFIG.DGF = DGF;

  // The Entity actor: its data model and its sheet.
  CONFIG.Actor.dataModels[ACTOR_TYPES.entity] = EntityData;
  foundry.applications.apps.DocumentSheetConfig.registerSheet(Actor, SYSTEM_ID, EntitySheet, {
    types: [ACTOR_TYPES.entity], makeDefault: true, label: "DGF.Sheet.label"
  });

  // Settings (every automation switchable), then GM-authoritative operations.
  registerSettings({
    onRaidChange: (value) => onRaidChange(value, { refresh: () => refreshHud() }),
    onHudChange: (on) => onHudSetting(on)
  });
  registerGmOps();
  registerRaidOps();

  Hooks.on("renderChatMessageHTML", onRenderChatMessage);
  Hooks.on("renderActorDirectory", onRenderActorDirectory);

  // Public API namespace for macros and other modules.
  game.dontGetForked = Object.assign(game.dontGetForked ?? {}, {
    DGF, id: SYSTEM_ID,
    createEntity, newEntity: newEntityFlow,
    roll: rollEntity, performRoll, spendCharge, drinkDraught,
    raid: { get: getRaid, view: raidView, mutate: mutateRaid, reconcile, openHud, refreshHud, currentHud, RaidHud },
    runOp
  });
});

/* -------------------------------------------- */
/*  Ready                                       */
/* -------------------------------------------- */

Hooks.once("ready", async function () {
  listenSocket();
  primeRaid();
  if (isActiveGM()) {
    await seedRaid();
    await reconcile();
  }
  await openHud();
  console.log("Don't Get Forked | Ready.");
});
