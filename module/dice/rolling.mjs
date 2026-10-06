/**
 * DON'T GET FORKED — rolling at the table (UI and Foundry plumbing only)
 * ---------------------------------------------------------------------
 * The roll dialog (DialogV2) collects the player's choices; buildRollPlan and
 * resolvePlannedRoll (module/logic/roll-plan.mjs) decide everything the book
 * decides. This file only rolls the dice, writes the roller's own Entity (its
 * charges, a Critical's charge back, Jekyll → Hyde), asks the GM to charge any
 * helpers and to raise Suspicion, and posts the card.
 *
 * Also here: spending a charge from the sheet, and the Draught (Jekyll & Hyde).
 */
import { SYSTEM_ID, SETTINGS, OPS, HOOKS, CARD, ACTOR_TYPES } from "../contracts.mjs";
import { DGF } from "../config.mjs";
import { buildRollPlan, resolvePlannedRoll, planOdds, chargesAfter } from "../logic/roll-plan.mjs";
import { rollAbilities, otherForm, diceFor, payFor, draughtPlan } from "../logic/entity.mjs";
import { runOp } from "../net/gm-ops.mjs";
import { setting } from "../settings.mjs";
import { getRaid } from "../raid/store.mjs";
import { chaseRollContext, chaseWeakness, lockupDifficulty } from "../raid/chase-flow.mjs";
import { awaitsRoll, groupEventId } from "../logic/checks.mjs";
import { chaseEventId } from "../logic/chase.mjs";
import { postCard } from "../chat/cards.mjs";
import { t, traitLabel, dieLabel, planText, traitList } from "../helpers/i18n.mjs";

const DIALOG_TEMPLATE = `systems/${SYSTEM_ID}/templates/apps/roll-dialog.hbs`;
const plain = (v) => JSON.parse(JSON.stringify(v ?? {}));
const isEntity = (a) => a?.type === ACTOR_TYPES.entity;

/* ------------------------------------------------------- input -- */

/**
 * Every ability that could go on this actor's roll: its own (signature and Gift),
 * then the other Entities' (helping costs the helper's charge, Chapter 3).
 */
export function abilityChoices(actor, raid = getRaid()) {
  const entry = (a, owner, own) => ({
    ...a,
    id: `ability:${owner.id}:${a.slot}`,
    payerId: owner.id,
    payerName: owner.name,
    own,
    // "while your Weakness is in play, however it came, you can't overdraw" (the chase's timing counts too)
    payer: { charges: owner.system.charges?.value ?? 0, weaknessInPlay: !!owner.system.weaknessInPlay || (raid.hunt && chaseWeakness(owner.id, raid)) },
  });
  const own = rollAbilities(actor.system).map((a) => entry(a, actor, true));
  // in a local chase, abilities help only your own roll; in the final flight, only those fleeing can help
  const flight = raid.hunt && raid.chase && !raid.chase.outcome && raid.chase.kind === "final" ? new Set(raid.chase.members.map((m) => m.actorId)) : null;
  const helpers = game.actors.filter((a) => isEntity(a) && a.id !== actor.id && a.system.entityKey && (!flight || flight.has(a.id)))
    .flatMap((h) => rollAbilities(h.system).filter((a) => a.effect !== "open").map((a) => entry(a, h, false)));
  return [...own, ...helpers];
}

/**
 * Where this roll is, from the raid: the chase this Entity is in (its round, the ground,
 * the mob, its Weakness), the lock-up (a captive slips free, anyone else rescues), the
 * open group check. Plain data for the dialog and the card.
 */
export function rollSituation(actor, values, raid = getRaid()) {
  const chase = values.chase ? chaseRollContext(actor, raid) : null;
  const lockup = values.lockup ? (actor.system.status === "captured" ? "slip" : "rescue") : "";
  const group = values.group && awaitsRoll(raid.group, actor.id) ? raid.group : null;
  return { chase, lockup, group };
}

/** The roll plan's input from the dialog's values (see module/logic/roll-plan.mjs). */
export function buildInput(actor, values, raid = getRaid()) {
  const chosen = new Set(values.abilities ?? []);
  const where = rollSituation(actor, values, raid);
  const c = where.chase;
  let difficulty = values.difficulty;
  if (values.wayOut) difficulty = DGF.labels[raid.difficulty]?.exit ?? values.difficulty; // the way out: the label's exit Difficulty
  else if (where.lockup) difficulty = lockupDifficulty(raid); // the lock-up: the label's lock-up Difficulty
  else if (c?.ok) difficulty = c.difficulty; // a chase: the mob's Difficulty
  return {
    roller: { id: actor.id, system: plain(actor.system) },
    trait: values.trait,
    second: values.second,
    difficulty,
    abilities: abilityChoices(actor, raid).filter((a) => chosen.has(a.id)),
    duty: !!values.duty && !c,
    loud: !!values.loud,
    watched: !!values.watched,
    wayOut: !!values.wayOut,
    chase: !!values.chase,
    hunt: raid.hunt,
    chaseTraits: c?.ok ? c.traits : null,
    chaseBlocked: c && !c.ok ? c.reason : "",
    weakness: !!c?.ok && c.weakness,
    lockup: where.lockup,
    furniture: !!values.furniture,
    turn: raid.turn,
  };
}

/** The dialog's values from its form. */
export function readRollForm(form, choices) {
  const el = (n) => form?.elements?.namedItem?.(n) ?? null;
  const on = (n) => !!el(n)?.checked;
  return {
    trait: el("trait")?.value,
    second: el("second")?.value,
    difficulty: Number(el("difficulty")?.value),
    abilities: choices.filter((c) => on(c.id)).map((c) => c.id),
    duty: on("duty"),
    loud: on("loud"),
    watched: on("watched"),
    wayOut: on("wayOut"),
    chase: on("chase"),
    lockup: on("lockup"),
    group: on("group"),
    furniture: on("furniture"),
  };
}

function oddsLine(plan) {
  if (!plan?.ok) return plan?.errors?.map(planText).join(" ") ?? "";
  const o = planOdds(plan);
  const pc = (x) => `${Math.round(x * 100)}%`;
  const parts = [`${t("DGF.Band.success")} ${pc(o.success)}`, `${t("DGF.Band.cost")} ${pc(o.cost)}`, `${t("DGF.Band.trouble")} ${pc(o.trouble)}`];
  if (plan.second === "monster" && !plan.hidden) parts.push(`${t("DGF.MonsterShows")} ${pc(o.show)}`);
  return `${t("DGF.Roll.dice", { trait: dieLabel(plan.traitDie), second: dieLabel(plan.secondDie), difficulty: plan.difficulty })} — ${parts.join(" · ")}`;
}

function dialogContext(actor, values, raid) {
  const sys = actor.system;
  const choices = abilityChoices(actor);
  const chosen = new Set(values.abilities ?? []);
  const duty = DGF.duties.find((d) => d.key === sys.duty);
  const notices = [];
  if (raid.hunt) notices.push(t("DGF.Roll.notice.hunt"));
  if (sys.carryingFurniture) notices.push(t("DGF.Roll.notice.carrying"));
  if (sys.nextRollSmaller > 0) notices.push(t("DGF.Roll.notice.smaller", { n: sys.nextRollSmaller }));
  if (sys.skipTurn && sys.skipTurn === raid.turn && !raid.dawn) notices.push(t("DGF.Roll.notice.skipTurn", { turn: raid.turn }));
  if (sys.weaknessInPlay) notices.push(t("DGF.Roll.notice.weakness"));
  if (sys.status === "captured") notices.push(t("DGF.Roll.notice.captured"));
  const where = rollSituation(actor, { ...values, chase: true, lockup: true, group: true }, raid);
  const c = where.chase;
  if (c?.ok) {
    const ground = DGF.chaseTable[c.ground.face - 1]?.name ?? "";
    notices.push(t("DGF.Roll.notice.chase", { kind: t(`DGF.Chase.kind.${c.kind}`), round: c.round, ground, traits: traitList(c.traits), mob: c.difficulty }));
    if (c.weakness) notices.push(t("DGF.Roll.notice.chaseWeakness"));
  } else if (c) notices.push(t(`DGF.Plan.${c.reason}`));
  const describe = (a) => ({
    id: a.id, name: a.name, helper: a.payerName, charges: a.payer.charges,
    effectText: t(`DGF.Effect.${a.effect}`, { trait: traitLabel(a.trait) }),
    checked: chosen.has(a.id),
  });
  const plan = buildRollPlan(buildInput(actor, values, raid));
  return {
    actorName: actor.name,
    traits: DGF.traits.map((k) => ({ key: k, label: traitLabel(k), die: dieLabel(sys.traits[k]), selected: k === values.trait })),
    seconds: Object.entries(DGF.second).map(([k, d]) => ({ key: k, label: `${t(`DGF.Second.${k}`)} ${dieLabel(d)}`, selected: k === values.second })),
    difficulties: Object.entries(DGF.difficulty).map(([k, v]) => ({ value: v, label: `${v} — ${t(`DGF.Ladder.${k}`)}`, selected: v === Number(values.difficulty) })),
    own: choices.filter((a) => a.own).map(describe),
    helpers: choices.filter((a) => !a.own).map(describe),
    hasHelpers: choices.some((a) => !a.own),
    duty: duty ? { label: t("DGF.Roll.duty", { duty: duty.name, kind: duty.kind }), checked: !!values.duty } : null,
    loud: !!values.loud, watched: !!values.watched, wayOut: !!values.wayOut, chase: !!values.chase,
    lockup: !!values.lockup, furniture: !!values.furniture,
    lockupLabel: t(sys.status === "captured" ? "DGF.Roll.lockupSlip" : "DGF.Roll.lockupRescue", { difficulty: lockupDifficulty(raid) }),
    group: where.group ? { checked: !!values.group, label: t("DGF.Roll.group", { label: where.group.label || t("DGF.Group.unnamed") }) } : null,
    exit: DGF.labels[raid.difficulty]?.exit,
    wayOutLabel: t("DGF.Roll.wayOut", { difficulty: DGF.labels[raid.difficulty]?.exit }),
    notices,
    showOdds: setting(SETTINGS.showOdds),
    odds: oddsLine(plan),
    problems: [...plan.errors, ...plan.warnings].map(planText),
  };
}

/** Wire the live odds line (a real browser only; harmless if the DOM differs). */
function liveOdds(actor, raid, choices) {
  return (event, dialog) => {
    try {
      const root = dialog?.element ?? event?.target?.element ?? null;
      const form = root?.querySelector?.("form") ?? root;
      const out = root?.querySelector?.(".dgf-odds");
      if (!form || !out) return;
      const update = () => {
        try { out.textContent = oddsLine(buildRollPlan(buildInput(actor, readRollForm(form, choices), raid))); } catch (err) { /* keep the last line */ }
      };
      root.addEventListener("change", update);
    } catch (err) { console.warn("Don't Get Forked | live odds unavailable", err); }
  };
}

/** Open the roll dialog; resolves to its values, or null if cancelled. */
export async function promptRoll(actor, values) {
  const raid = getRaid();
  const choices = abilityChoices(actor);
  const content = await foundry.applications.handlebars.renderTemplate(DIALOG_TEMPLATE, dialogContext(actor, values, raid));
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title: t("DGF.Roll.title", { name: actor.name }) },
    classes: ["dont-get-forked", "dgf-roll-dialog"],
    position: { width: 460 },
    content,
    buttons: [
      { action: "roll", label: t("DGF.Roll.roll"), icon: "fa-solid fa-dice", default: true, callback: (event, button) => readRollForm(button.form, choices) },
      { action: "cancel", label: t("DGF.Dialog.cancel") },
    ],
    render: liveOdds(actor, raid, choices),
    rejectClose: false,
  });
  return answer && typeof answer === "object" ? answer : null;
}

/* -------------------------------------------------------- roll -- */

/** Open the dialog for a trait and roll (asking again if the choices break a rule). */
export async function rollEntity(actor, { trait = "", chase = null } = {}) {
  if (!isEntity(actor) || !actor.system.entityKey) return null;
  if (!actor.isOwner) { ui.notifications.warn(t("DGF.Notify.notOwner")); return null; }
  const raid = getRaid();
  // where the Entity is: in a chase (its round), held at the lock-up, in an open group check
  const inChase = chase ?? !!chaseRollContext(actor, raid);
  const captive = actor.system.status === "captured";
  const ctx = inChase ? chaseRollContext(actor, raid) : null;
  const best = (list) => [...list].sort((a, b) => (actor.system.traits[b] ?? 0) - (actor.system.traits[a] ?? 0))[0];
  const pick = trait || (ctx?.ok ? best(ctx.traits) : captive ? best(DGF.lockup.slip.quiet) : "brawn");
  let values = {
    trait: pick, second: raid.hunt || actor.system.carryingFurniture ? "monster" : "mask",
    difficulty: DGF.difficulty.standard, abilities: [], chase: raid.hunt || inChase,
    lockup: captive, group: awaitsRoll(raid.group, actor.id),
  };
  for (let i = 0; i < 5; i++) {
    const answer = await promptRoll(actor, values);
    if (!answer) return null;
    const result = await performRoll(actor, answer);
    if (result.ok) return result;
    ui.notifications.warn(result.plan.errors.map(planText).join(" "));
    values = answer;
  }
  return null;
}

/** Roll with these values (no dialog): plan, pay, roll, post the card, raise Suspicion. */
export async function performRoll(actor, values) {
  const raid = getRaid();
  const plan = buildRollPlan(buildInput(actor, values, raid));
  if (!plan.ok) return { ok: false, plan };
  const autoCharges = setting(SETTINGS.autoCharges);

  // Helpers' charges are spent by the GM (the roller doesn't own their Entities).
  for (const p of plan.payments.filter((x) => !x.own)) {
    if ((autoCharges && p.spend > 0) || p.weakness) await runOp(OPS.actorSpendCharges, { actorId: p.payerId, count: autoCharges ? p.spend : 0, weakness: p.weakness });
  }

  const traitRoll = await new Roll(`1d${plan.traitDie}`).evaluate();
  const secondRoll = await new Roll(`1d${plan.secondDie}`).evaluate();
  const res = resolvePlannedRoll(plan, traitRoll.total, secondRoll.total);

  // The roller's own Entity: charges spent and a Critical's charge back, the used Cost, the change of form.
  const sys = actor.system;
  const own = plan.payments.find((p) => p.own);
  const update = {};
  const before = sys.charges.value;
  let after = before;
  if (autoCharges) {
    after = chargesAfter({ value: before, start: sys.charges.start, spent: own?.spend ?? 0, chargeBack: res.chargeBack });
    if (after !== before) update["system.charges.value"] = after;
  }
  if (own?.weakness) update["system.weaknessInPlay"] = true;
  if (plan.consumeSmaller) update["system.nextRollSmaller"] = 0;
  let formTo = "";
  if (res.formShift && setting(SETTINGS.autoForm)) {
    formTo = otherForm(sys.entityKey, sys.form) ?? "";
    if (formTo) { update["system.form"] = formTo; update["system.traits"] = diceFor(sys.entityKey, formTo); }
  }
  if (Object.keys(update).length) await actor.update(update);

  const top = res.triggers.filter((x) => x.amount === res.suspicion).map((x) => x.key);
  const where = rollSituation(actor, values, raid);
  const chaseCtx = where.chase?.ok && plan.tracked ? where.chase : null;
  const groupId = where.group && setting(SETTINGS.autoGroupChecks) ? where.group.id : "";
  // F13: a shared local chase rises once a round, by the biggest trigger: its rolls share the round's event
  const roundEvent = chaseCtx ? chaseEventId(raid.chase, chaseCtx.round) : null;
  const card = {
    v: 1, kind: CARD.roll, raidId: raid.raidId,
    eventId: groupId ? groupEventId(groupId) : roundEvent ?? `roll:${foundry.utils.randomID()}`,
    roundEvent: !!roundEvent,
    groupId, lockup: plan.lockup, furniture: plan.furniture,
    chaseId: chaseCtx?.chaseId ?? "", chaseRound: chaseCtx?.round ?? 0, chaseKind: chaseCtx?.kind ?? "",
    groundName: chaseCtx ? DGF.chaseTable[chaseCtx.ground.face - 1]?.name ?? "" : "",
    chaseShared: !!chaseCtx && (chaseCtx.kind === "final" || (raid.chase?.members?.length ?? 0) > 1),
    leadMove: res.leadMove, freed: res.freed, rescued: res.rescued, slipTrouble: res.slipTrouble, wayOutBeaten: res.wayOutBeaten,
    chaseStarted: "", freedNames: [], gmSeen: false,
    actorId: actor.id, actorName: actor.name, userId: game.user.id, turn: raid.turn,
    calledTrait: plan.calledTrait, trait: plan.trait, baseDie: plan.baseDie, traitDie: plan.traitDie,
    second: plan.second, secondDie: plan.secondDie, baseDifficulty: plan.baseDifficulty, difficulty: plan.difficulty,
    diffParts: plan.diffParts, downParts: plan.downParts, raises: plan.raises, duty: plan.duty, open: plan.open, hidden: plan.hidden,
    loud: plan.loud, watched: plan.watched, wayOut: plan.wayOut, chase: plan.chase, hunt: plan.hunt,
    abilities: plan.abilities.map((a) => ({ name: a.name, effect: a.effect, trait: a.trait, payerId: a.payerId, payerName: a.payerName, own: a.payerId === actor.id })),
    payments: plan.payments.map((p) => ({ payerId: p.payerId, payerName: p.payerName, own: p.own, uses: p.uses, spend: p.spend, overdraw: p.overdraw, weakness: p.weakness })),
    warnings: plan.warnings.map((w) => w.code),
    traitFace: res.traitFace, secondFace: res.secondFace, total: res.total, band: res.band, critical: res.critical,
    showed: res.showed, show: res.show, hiddenShow: res.hiddenShow, triggers: res.triggers, suspicion: res.suspicion,
    suspicionLabel: top.join(","), caught: res.caught, troubleUnwatched: res.troubleUnwatched, unseen: res.unseen,
    formShift: res.formShift, formTo, chargeBack: res.chargeBack, costs: res.costs,
    autoCharges, chargesBefore: before, chargesAfter: after,
    applied: false, cancelled: false, cost: "", skipTurn: 0, dropped: "",
  };
  const message = await postCard(card, { speaker: ChatMessage.getSpeaker({ actor }), rolls: [traitRoll, secondRoll] });
  // a roll the raid follows (a group check, a chase round, a capture, the lock-up, the way out) goes to the GM whole;
  // any other roll only for its Suspicion
  const tracked = card.groupId || card.chaseId || card.lockup || card.caught || card.wayOutBeaten;
  if (tracked) await runOp(OPS.raidRoll, { messageId: message.id });
  else if (res.suspicion > 0 && !plan.hunt && setting(SETTINGS.autoSuspicion)) await runOp(OPS.raidApplyCard, { messageId: message.id });
  Hooks.callAll(HOOKS.rollResolved, message, card);
  return { ok: true, message, card, plan, result: res };
}

/* ------------------------------------------- charges outside a roll -- */

async function confirmOverdraw(actor, pay) {
  return foundry.applications.api.DialogV2.confirm({
    window: { title: t("DGF.Overdraw.title") },
    content: `<p>${t(pay.weakness ? "DGF.Overdraw.weakness" : "DGF.Overdraw.suspicion", { name: actor.name, n: DGF.suspicion.overdraw })}</p>`,
    rejectClose: false,
  });
}

async function postAbilityCard(actor, fields, raid) {
  const card = {
    v: 1, kind: CARD.ability, raidId: raid.raidId, eventId: `ability:${foundry.utils.randomID()}`,
    actorId: actor.id, actorName: actor.name, userId: game.user.id, turn: raid.turn, hunt: raid.hunt,
    applied: false, cancelled: false, suspicionLabel: "overdraw", ...fields,
  };
  const message = await postCard(card, { speaker: ChatMessage.getSpeaker({ actor }) });
  if (card.suspicion > 0 && !raid.hunt && setting(SETTINGS.autoSuspicion)) await runOp(OPS.raidApplyCard, { messageId: message.id });
  return message;
}

/** The sheet's "spend a charge": one use of an ability outside the roll dialog (overdraw at zero). */
export async function spendCharge(actor) {
  if (!isEntity(actor) || !actor.isOwner) return null;
  const raid = getRaid();
  const sys = actor.system;
  const pay = payFor({ charges: sys.charges.value, uses: 1, hunt: raid.hunt, weaknessInPlay: sys.weaknessInPlay });
  if (!pay.allowed) { ui.notifications.warn(planText({ code: "overdrawWeakness", name: actor.name })); return null; }
  if (pay.overdraw && !(await confirmOverdraw(actor, pay))) return null;
  const autoCharges = setting(SETTINGS.autoCharges);
  const update = {};
  if (autoCharges && pay.spend) update["system.charges.value"] = sys.charges.value - pay.spend;
  if (pay.weakness) update["system.weaknessInPlay"] = true;
  const before = sys.charges.value;
  if (Object.keys(update).length) await actor.update(update);
  return postAbilityCard(actor, { action: "spend", spend: pay.spend, overdraw: pay.overdraw, suspicion: pay.suspicion, weakness: pay.weakness, autoCharges, chargesBefore: before, chargesAfter: actor.system.charges.value }, raid);
}

/** The Draught (Jekyll & Hyde): change form; one charge, free back to Jekyll with Practised Hand. */
export async function drinkDraught(actor) {
  if (!isEntity(actor) || !actor.isOwner) return null;
  const raid = getRaid();
  const plan = draughtPlan(actor.system, { hunt: raid.hunt });
  if (!plan) return null;
  if (!plan.allowed) { ui.notifications.warn(planText({ code: "overdrawWeakness", name: actor.name })); return null; }
  if (plan.overdraw && !(await confirmOverdraw(actor, plan))) return null;
  const autoCharges = setting(SETTINGS.autoCharges);
  const before = actor.system.charges.value;
  const update = { "system.form": plan.to, "system.traits": plan.traits };
  if (autoCharges && plan.spend) update["system.charges.value"] = before - plan.spend;
  if (plan.weakness) update["system.weaknessInPlay"] = true;
  await actor.update(update);
  return postAbilityCard(actor, { action: "draught", name: actor.system.view?.signature?.name ?? "", formFrom: plan.from, formTo: plan.to, cost: plan.cost, spend: plan.spend, overdraw: plan.overdraw, suspicion: plan.suspicion, weakness: plan.weakness, autoCharges, chargesBefore: before, chargesAfter: actor.system.charges.value }, raid);
}
