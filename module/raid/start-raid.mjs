/**
 * DON'T GET FORKED — starting a ready-made game's raid (the Storyteller's macros)
 * -------------------------------------------------------------------------------
 * game.dontGetForked.raid.start({ town, difficulty, list }) is what each ready-made game's "Start the Raid" macro
 * runs: a new raid at the town's level with the town's shopping list and its essentials on the Raid HUD, started as
 * the HUD's New raid starts one (the raid takes every Entity with a player owner; in campaign play it asks, as New raid
 * does, which Entities the castle's upgrades give an extra charge). Which GM operations do it, in order, is decided by
 * module/logic/start-raid.mjs; each one is GM-authoritative and refused for players (the macros are the Storyteller's).
 */
import { OPS, SETTINGS } from "../contracts.mjs";
import { raidStartSteps } from "../logic/start-raid.mjs";
import { runOp } from "../net/gm-ops.mjs";
import { setting } from "../settings.mjs";
import { castleUpgrades } from "./store.mjs";
import { allEntities } from "./chase-flow.mjs";
import { castleExtraDialog, refusalText } from "../apps/raid-dialogs.mjs";
import { t } from "../helpers/i18n.mjs";

/** Start a ready-made raid. Returns { ok, town, difficulty } or { ok: false, reason }. */
export async function startRaid(spec = {}) {
  if (!game.user?.isGM) {
    ui.notifications.warn(t("DGF.Start.gmOnly"));
    return { ok: false, reason: "gmOnly" };
  }
  const plan = raidStartSteps(spec);
  if (!plan.ok) {
    ui.notifications.warn(t(`DGF.Start.${plan.reason}`));
    return plan;
  }
  // campaign play: each castle upgrade gives one Entity of the players' choice an extra charge this raid (as New raid)
  let extra = {};
  const upgrades = setting(SETTINGS.campaign) ? castleUpgrades().length : 0;
  if (upgrades) {
    const chosen = await castleExtraDialog(allEntities().filter((a) => a.hasPlayerOwner), upgrades);
    if (!chosen) return { ok: false, reason: "cancelled" };
    extra = chosen;
  }
  for (const step of plan.steps) {
    const result = await runOp(step.op, step.op === OPS.raidReset ? { ...step.data, extra } : step.data);
    if (!result?.ok) {
      const why = refusalText(step.op === OPS.raidReset ? "DGF.Castle.refused" : "DGF.Start", result?.reason ?? "failed");
      if (why) ui.notifications.warn(why);
      return { ok: false, reason: result?.reason ?? "failed", op: step.op };
    }
  }
  ui.notifications.info(t("DGF.Start.done", { town: plan.town, label: t(`DGF.Label.${plan.difficulty}`) }));
  return { ok: true, town: plan.town, difficulty: plan.difficulty };
}
