/**
 * DON'T GET FORKED — localization shortcuts for the UI layer.
 * Every word the system shows comes from lang/en.json, except the book's own
 * game text (Entity names, abilities, Perks…), which lives in module/config.mjs.
 */

/** Localize a key; with data, format its {placeholders}. */
export function t(key, data) {
  return data ? game.i18n.format(key, data) : game.i18n.localize(key);
}

/** "Brawn", "Nimble", … */
export function traitLabel(trait) {
  return trait ? t(`DGF.Trait.${trait}`) : "";
}

/** "d8" */
export function dieLabel(n) {
  return `d${n}`;
}

/** A plan/notice code as words: DGF.Plan.<code>, formatted with its data. */
export function planText(entry) {
  const { code, ...data } = entry;
  return t(`DGF.Plan.${code}`, data);
}
