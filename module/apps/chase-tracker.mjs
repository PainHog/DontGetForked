/**
 * DON'T GET FORKED — the chase tracker (ApplicationV2)
 * ----------------------------------------------------
 * Everyone sees the chase: who is in it, the Lead track (0 = cornered, the
 * escape number = clear), the mob's Difficulty, this round's ground and the
 * traits that work, whose Weakness is in play, who has rolled. Each player gets
 * a Roll button for their own Entity; the Storyteller gets the controls (roll
 * the ground, move the Lead by the rolls, Lead ±1, escaped / cornered / call it
 * off, add or take out an Entity, start the final flight by hand). Every control
 * is a GM operation (module/raid/chase-flow.mjs); the rules are in
 * module/logic/chase.mjs.
 */
import { SYSTEM_ID, SETTINGS, OPS, ACTOR_TYPES } from "../contracts.mjs";
import { DGF } from "../config.mjs";
import * as C from "../logic/chase.mjs";
import { runOp } from "../net/gm-ops.mjs";
import { getRaid } from "../raid/store.mjs";
import { entities } from "../raid/chase-flow.mjs";
import { rollEntity } from "../dice/rolling.mjs";
import { setting } from "../settings.mjs";
import { t, traitList } from "../helpers/i18n.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ChaseTracker extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "dgf-chase-tracker",
    classes: ["dont-get-forked", "dgf-chase-tracker"],
    tag: "aside",
    window: { title: "DGF.Chase.title", icon: "fa-solid fa-person-running", minimizable: true, resizable: true },
    position: { width: 340, top: 70, left: 400 },
    actions: {
      rollFor: ChaseTracker.#onRollFor,
      rollGround: ChaseTracker.#op(OPS.chaseGround),
      resolveRound: ChaseTracker.#op(OPS.chaseResolve),
      leadUp: ChaseTracker.#op(OPS.chaseLead, { delta: 1 }),
      leadDown: ChaseTracker.#op(OPS.chaseLead, { delta: -1 }),
      escaped: ChaseTracker.#op(OPS.chaseEnd, { outcome: "escaped" }),
      cornered: ChaseTracker.#op(OPS.chaseEnd, { outcome: "cornered" }),
      dropChase: ChaseTracker.#op(OPS.chaseEnd, { outcome: "dropped" }),
      startFlight: ChaseTracker.#op(OPS.chaseStart, { final: true }),
      removeMember: ChaseTracker.#onMember(true),
      addMember: ChaseTracker.#onMember(false),
    },
  };

  static PARTS = {
    body: { template: `systems/${SYSTEM_ID}/templates/apps/chase-tracker.hbs` },
  };

  /** @override */
  async _prepareContext(options) {
    const raid = getRaid();
    const c = raid.chase;
    const isGM = !!game.user?.isGM;
    const base = { isGM, hasChase: !!c, hunt: raid.hunt, canStartFlight: isGM && raid.hunt && !raid.over && !(C.isRunning(c) && c.kind === "final") };
    if (!c) return base;
    const running = C.isRunning(c);
    const ground = c.ground ? DGF.chaseTable[c.ground.face - 1] : null;
    const members = c.members.map((m) => {
      const actor = game.actors.get(m.actorId);
      const roll = c.rolls[m.actorId];
      return {
        actorId: m.actorId,
        name: m.name,
        traits: c.ground ? traitList(C.traitsFor(c, m.actorId)) : "",
        weakness: running && C.weaknessFor(c, m.actorId, { overdrawn: !!actor?.system?.weaknessInPlay }),
        weaknessName: DGF.entities.find((e) => e.key === m.entityKey)?.weakness?.name ?? "",
        rolled: roll ? `${t(`DGF.Band.${roll.band}`)}${roll.critical ? ` (${t("DGF.Critical")})` : ""}` : "",
        canRoll: running && !!c.ground && !roll && !!actor?.isOwner,
      };
    });
    const inChase = new Set(c.members.map((m) => m.actorId));
    return {
      ...base,
      running,
      kindLabel: t(`DGF.Chase.kind.${c.kind}`),
      causeLabel: t(`DGF.Chase.cause.${c.cause}`),
      roundLine: t("DGF.Chase.roundLine", { round: c.round }),
      lead: c.lead,
      escape: c.escape,
      pips: Array.from({ length: c.escape + 1 }, (_, n) => ({ n, here: n === c.lead, end: n === 0 || n === c.escape })),
      leadLine: t("DGF.Chase.leadLine", { lead: c.lead, escape: c.escape }),
      mobLine: c.mob ? t("DGF.Chase.mobShort", { mob: c.mob }) : "",
      groundLine: ground ? t("DGF.Chase.groundLine", { ground: ground.name, traits: traitList(c.ground.traits) }) : running ? t("DGF.Chase.noGround") : "",
      groundText: ground?.text ?? "",
      members,
      shared: c.kind === "final" || c.members.length > 1,
      waiting: running && c.ground ? C.waitingFor(c).map((m) => m.name).join(", ") : "",
      roundDone: C.roundDone(c),
      outcome: c.outcome ? t(`DGF.Chase.outcome.${c.kind}.${c.outcome}`) : "",
      history: c.history.slice(-4).reverse().map((h) => ({ text: t("DGF.Chase.historyLine", { round: h.round, ground: DGF.chaseTable[h.face - 1]?.name ?? "", move: h.move > 0 ? `+${h.move}` : `${h.move}`, lead: h.lead }) })),
      addable: isGM && running ? entities().filter((a) => !inChase.has(a.id)).map((a) => ({ actorId: a.id, name: a.name })) : [],
      auto: setting(SETTINGS.autoChase),
    };
  }

  static #op(op, args = {}) {
    return async function () { return runOp(op, args); };
  }

  static #onMember(remove) {
    return async function (event, target) { return runOp(OPS.chaseMember, { actorId: target.dataset.actorId, remove }); };
  }

  static async #onRollFor(event, target) {
    const actor = game.actors.get(target.dataset.actorId);
    if (actor?.type !== ACTOR_TYPES.entity) return null;
    return rollEntity(actor, { chase: true });
  }
}

/* ------------------------------------------- one tracker per client -- */

const trackers = new Map(); // user id → ChaseTracker (one entry in a real client)

/** Open (or refresh) this client's chase tracker. */
export async function openChaseTracker() {
  const key = game.user?.id ?? "";
  let app = trackers.get(key);
  if (!app) { app = new ChaseTracker(); trackers.set(key, app); }
  await app.render({ force: true });
  return app;
}

/** The raid changed: a new chase opens the tracker for everyone (setting chaseTracker); an open tracker re-renders. */
export async function refreshChaseTracker(state, previous) {
  const app = trackers.get(game.user?.id ?? "");
  const started = state?.chase && state.chase.id !== previous?.chase?.id;
  if (started && setting(SETTINGS.chaseTracker)) return openChaseTracker();
  if (app?.rendered) await app.render();
  return app ?? null;
}

/** This client's chase tracker (for tests and macros). */
export function currentChaseTracker() {
  return trackers.get(game.user?.id ?? "") ?? null;
}
