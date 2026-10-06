/**
 * DON'T GET FORKED — settings
 * Every automation has its own switch (Heisty lesson): with them all off, the
 * system is a sheet, a dice roller and a Suspicion counter the Storyteller moves.
 * Keys come from module/contracts.mjs SETTINGS; words from lang/en.json.
 */
import { SYSTEM_ID, SETTINGS } from "./contracts.mjs";

/** Read one of this system's settings. */
export function setting(key) {
  return game.settings.get(SYSTEM_ID, key);
}

/**
 * Register every setting. `onRaidChange` runs on every client when the raid
 * state changes; `onHudChange` when the HUD switch changes.
 */
export function registerSettings({ onRaidChange = () => {}, onHudChange = () => {} } = {}) {
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

  // Per player.
  reg(SETTINGS.showOdds, {
    name: `DGF.Settings.${SETTINGS.showOdds}.Name`, hint: `DGF.Settings.${SETTINGS.showOdds}.Hint`,
    scope: "client", config: true, type: Boolean, default: true
  });
}
