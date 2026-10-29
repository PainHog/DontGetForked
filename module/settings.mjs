/**
 * DON'T GET FORKED — settings
 * Every automation has its own switch (Heisty lesson): with them all off, the
 * system is a sheet, a dice roller and a Suspicion counter the Storyteller moves.
 * Keys come from module/contracts.mjs SETTINGS; words from lang/en.json.
 */
import { SYSTEM_ID, SETTINGS, MENUS } from "./contracts.mjs";

/** Read one of this system's settings. */
export function setting(key) {
  return game.settings.get(SYSTEM_ID, key);
}

/**
 * Register every setting. `onRaidChange` runs on every client when the raid
 * state changes; `onHudChange` when the HUD switch changes; `onLimitRule` when the
 * party-size Limit switch changes (the active Storyteller's client sets the Limit again).
 */
export function registerSettings({ onRaidChange = () => {}, onHudChange = () => {}, onCastleChange = () => {}, onLimitRule = () => {}, demoMenu = null } = {}) {
  const reg = (key, data) => game.settings.register(SYSTEM_ID, key, data);
  const toggle = (key, def, extra = {}) => reg(key, {
    name: `DGF.Settings.${key}.Name`, hint: `DGF.Settings.${key}.Hint`,
    scope: "world", config: true, type: Boolean, default: def, ...extra
  });

  // Hidden world state (written only by the active GM).
  reg(SETTINGS.migrationVersion, { scope: "world", config: false, type: String, default: "" });
  reg(SETTINGS.raidState, { scope: "world", config: false, type: Object, default: {}, onChange: (v) => onRaidChange(v) });

  // Automations.
  toggle(SETTINGS.autoSuspicion, true);
  toggle(SETTINGS.autoCharges, true);
  toggle(SETTINGS.autoForm, true);
  toggle(SETTINGS.autoCosts, true);
  toggle(SETTINGS.autoHunt, true);
  toggle(SETTINGS.hudVisible, true, { onChange: (v) => onHudChange(v) });
  toggle(SETTINGS.autoChase, true);
  toggle(SETTINGS.autoLockup, true);
  toggle(SETTINGS.autoGroupChecks, true);
  toggle(SETTINGS.autoYear, true);
  toggle(SETTINGS.autoFurniture, true);
  toggle(SETTINGS.resetOnNewRaid, true);
  toggle(SETTINGS.chaseTracker, true);
  toggle(SETTINGS.autoDrops, true);
  toggle(SETTINGS.autoAllHeld, true); // D7b
  toggle(SETTINGS.wayOutOncePerTurn, true); // R4
  // The v0.2 review's decisions (2026-10-21)
  toggle(SETTINGS.localOverdrawOnce, true);
  toggle(SETTINGS.localRoundCap, true);
  toggle(SETTINGS.limitByPartySize, true, { onChange: () => onLimitRule() });
  toggle(SETTINGS.hugePieceHeld, true);
  toggle(SETTINGS.lockDuties, true); // 2026-10-29: Standard and Hard keep each monster's own Castle Duty
  // The ready-made games, the one-shot Lantern Night in Hallowby and the three towns of Chapter 9
  // (module/apps/demo-import.mjs): offered once to a GM opening a world without any, and set up from a menu (GM only).
  toggle(SETTINGS.demoPrompt, true);
  reg(SETTINGS.demoImported, { scope: "world", config: false, type: String, default: "" });
  if (demoMenu) {
    game.settings.registerMenu(SYSTEM_ID, MENUS.demoImport, {
      name: `DGF.Settings.${MENUS.demoImport}.Name`, label: `DGF.Settings.${MENUS.demoImport}.Label`,
      hint: `DGF.Settings.${MENUS.demoImport}.Hint`, icon: "fa-solid fa-masks-theater", type: demoMenu, restricted: true,
    });
  }
  // The optional campaign rules (Chapter 7): castle upgrades, kept from raid to raid (off: a raid stands alone).
  toggle(SETTINGS.campaign, false, { onChange: () => onCastleChange() });
  reg(SETTINGS.castleUpgrades, { scope: "world", config: false, type: Array, default: [], onChange: () => onCastleChange() });

  // Per player.
  reg(SETTINGS.showOdds, {
    name: `DGF.Settings.${SETTINGS.showOdds}.Name`, hint: `DGF.Settings.${SETTINGS.showOdds}.Hint`,
    scope: "client", config: true, type: Boolean, default: true
  });
}
