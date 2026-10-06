/**
 * DON'T GET FORKED — chat cards
 * -----------------------------
 * A card's facts live in flags["dont-get-forked"].card (computed by the rules
 * logic when it was made); its HTML is always rendered from those facts, so
 * when the Storyteller picks a Cost or cancels an event the card is re-rendered,
 * never edited by hand. Buttons are added per viewer on renderChatMessageHTML:
 * only the Storyteller sees the Cost choices and the Suspicion controls.
 */
import { SYSTEM_ID, FLAG, CARD, OPS } from "../contracts.mjs";
import { runOp } from "../net/gm-ops.mjs";
import { t, traitLabel, dieLabel } from "../helpers/i18n.mjs";

const TEMPLATES = {
  [CARD.roll]: `systems/${SYSTEM_ID}/templates/chat/roll-card.hbs`,
  [CARD.ability]: `systems/${SYSTEM_ID}/templates/chat/ability-card.hbs`,
  [CARD.raid]: `systems/${SYSTEM_ID}/templates/chat/raid-card.hbs`,
};

/** The card facts on a message, or null. */
export function cardOf(message) {
  return message?.getFlag?.(FLAG, "card") ?? message?.flags?.[FLAG]?.card ?? null;
}

/** The current raid's id, read lazily (avoids an import cycle with the store). */
let raidIdReader = () => "";
export function setRaidIdReader(fn) { raidIdReader = fn; }

/* ------------------------------------------------------------ contexts -- */

const join = (list) => list.filter(Boolean).join(" · ");

function rollContext(card) {
  const trigger = (k) => t(`DGF.Trigger.${k}`);
  const stepNotes = [
    ...(card.raises ? [t(card.duty && !card.abilities?.some((a) => a.effect === "raise") ? "DGF.Card.raisedDuty" : "DGF.Card.raised")] : []),
    ...(card.downParts ?? []).map((p) => t(`DGF.Card.smaller.${p.key}`)),
  ];
  const diffNotes = (card.diffParts ?? []).map((p) => t(`DGF.Card.diff.${p.key}`, { n: Math.abs(p.n) }));
  const abilities = (card.abilities ?? []).map((a) => (a.own ? a.name : t("DGF.Card.helpedBy", { name: a.name, helper: a.payerName })));
  const payments = (card.payments ?? []).filter((p) => p.uses > 0).map((p) => {
    const bits = [];
    if (p.spend) bits.push(t("DGF.Card.spent", { name: p.payerName, n: p.spend }));
    if (p.overdraw) bits.push(t(p.weakness ? "DGF.Card.overdrawWeakness" : "DGF.Card.overdraw", { name: p.payerName }));
    return bits.join(", ");
  });
  const status = card.hunt ? t("DGF.Card.huntStops")
    : card.cancelled ? t("DGF.Card.cancelled")
    : card.applied ? t("DGF.Card.applied")
    : t("DGF.Card.notApplied");
  return {
    kind: card.kind,
    actorName: card.actorName,
    headline: t("DGF.Card.rolls", { name: card.actorName, trait: traitLabel(card.trait), die: dieLabel(card.traitDie) }),
    instead: card.trait !== card.calledTrait ? t("DGF.Card.instead", { trait: traitLabel(card.calledTrait) }) : "",
    dice: [
      { label: `${traitLabel(card.trait)} ${dieLabel(card.traitDie)}`, face: card.traitFace, cls: "trait" },
      { label: `${t(`DGF.Second.${card.second}`)} ${dieLabel(card.secondDie)}`, face: card.secondFace, cls: card.second },
    ],
    total: card.total,
    difficulty: card.difficulty,
    diffNote: join(diffNotes),
    stepNote: join(stepNotes),
    warnNote: join((card.warnings ?? []).map((code) => t(`DGF.Plan.${code}`))),
    band: card.band,
    bandLabel: t(`DGF.Band.${card.band}`),
    critical: !!card.critical,
    criticalNote: card.critical ? (card.chargeBack ? t("DGF.Card.criticalCharge") : t("DGF.Card.criticalChase")) : "",
    monsterNote: card.show ? t("DGF.Card.monsterShows") : card.hiddenShow ? t("DGF.Card.monsterUnseen") : "",
    formNote: card.formShift ? t(card.formTo ? "DGF.Card.hydeTakesOver" : "DGF.Card.hydeWouldTakeOver") : "",
    suspicion: card.suspicion,
    suspicionLine: card.suspicion > 0 ? t("DGF.Card.suspicion", { n: card.suspicion, why: join((card.triggers ?? []).filter((x) => x.amount === card.suspicion).map((x) => trigger(x.key))) }) : "",
    suspicionStatus: card.suspicion > 0 ? status : "",
    caughtNote: card.caught ? t("DGF.Card.caught") : card.unseen ? t("DGF.Card.unseen") : card.troubleUnwatched ? t("DGF.Card.unwatched") : "",
    flags: join([card.loud ? t("DGF.Card.loud") : "", card.watched ? t("DGF.Card.watched") : "", card.wayOut ? t("DGF.Card.wayOut") : "", card.chase ? t("DGF.Card.chase") : ""]),
    abilities: join(abilities),
    payments: join(payments),
    charges: card.autoCharges && card.chargesBefore !== card.chargesAfter ? t("DGF.Card.charges", { from: card.chargesBefore, to: card.chargesAfter }) : "",
    costChosen: card.cost ? t(`DGF.Cost.${card.cost}`) : "",
    costDetail: card.cost === "loseTurn" && card.skipTurn ? t("DGF.Card.skipsTurn", { turn: card.skipTurn })
      : card.cost === "drop" && card.dropped ? t("DGF.Card.dropped", { item: card.dropped })
      : card.cost === "smaller" ? t("DGF.Card.nextSmaller") : "",
    costPending: card.band === "cost" && !card.cost && (card.costs?.length ?? 0) > 0,
    costList: join((card.costs ?? []).map((c) => t(`DGF.Cost.${c}`))),
    costNone: card.band === "cost" && !card.cost && !(card.costs?.length),
  };
}

function abilityContext(card) {
  const status = card.hunt ? t("DGF.Card.huntStops") : card.cancelled ? t("DGF.Card.cancelled") : card.applied ? t("DGF.Card.applied") : t("DGF.Card.notApplied");
  return {
    kind: card.kind,
    headline: card.action === "draught"
      ? t("DGF.Card.draught", { name: card.actorName, form: t(`DGF.Form.${card.formTo}`) })
      : t("DGF.Card.spendCharge", { name: card.actorName }),
    charges: card.autoCharges ? t("DGF.Card.charges", { from: card.chargesBefore, to: card.chargesAfter }) : "",
    free: card.cost === 0 ? t("DGF.Card.free") : "",
    overdraw: card.overdraw ? t(card.weakness ? "DGF.Card.overdrawWeakness" : "DGF.Card.overdraw", { name: card.actorName }) : "",
    suspicionLine: card.suspicion > 0 ? t("DGF.Card.suspicion", { n: card.suspicion, why: t("DGF.Trigger.overdraw") }) : "",
    suspicionStatus: card.suspicion > 0 ? status : "",
  };
}

function raidContext(card) {
  const label = t(`DGF.Label.${card.difficulty}`);
  return {
    kind: card.kind,
    headline: t(`DGF.RaidCard.${card.event}.title`),
    text: t(`DGF.RaidCard.${card.event}.text`, { label, limit: card.limit, turns: card.turns, cause: card.cause ? t(`DGF.HuntCause.${card.cause}`) : "" }),
    hunt: card.event === "hunt",
  };
}

const CONTEXTS = { [CARD.roll]: rollContext, [CARD.ability]: abilityContext, [CARD.raid]: raidContext };

/** Render a card's HTML from its facts. */
export async function renderCard(card) {
  const tpl = TEMPLATES[card.kind];
  if (!tpl) throw new Error(`unknown card kind: ${card.kind}`);
  return foundry.applications.handlebars.renderTemplate(tpl, CONTEXTS[card.kind](card));
}

/** Post a card (as the current user). */
export async function postCard(card, { speaker, rolls } = {}) {
  const data = {
    speaker: speaker ?? ChatMessage.getSpeaker({ alias: t("DGF.SystemTitle") }),
    content: await renderCard(card),
    flags: { [FLAG]: { card } },
    style: CONST.CHAT_MESSAGE_STYLES?.OTHER ?? 0,
  };
  if (rolls?.length) {
    data.rolls = rolls;
    if (CONFIG.sounds?.dice) data.sound = CONFIG.sounds.dice;
  }
  ChatMessage.applyRollMode?.(data, game.settings.get("core", "rollMode"));
  return ChatMessage.create(data);
}

/** Merge facts into a card and re-render it (the GM, or the message's author). */
export async function updateCard(message, patch) {
  const card = { ...cardOf(message), ...patch };
  await message.update({ content: await renderCard(card), [`flags.${FLAG}.card`]: card });
  return card;
}

/* ------------------------------------------------------------ buttons -- */

function button(label, dataset, onClick) {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = label;
  b.className = "dgf-card-button";
  Object.assign(b.dataset, dataset);
  b.addEventListener("click", (event) => {
    event?.preventDefault?.();
    b.disabled = true;
    Promise.resolve(onClick()).catch((err) => console.error("Don't Get Forked | card button failed", err)).finally(() => { b.disabled = false; });
  });
  return b;
}

/** Which Storyteller buttons a card shows (pure: for the hook and for tests). */
export function gmButtons(card, currentRaidId) {
  const out = [];
  if (!card) return out;
  if (card.kind === CARD.roll && card.band === "cost" && !card.cost) {
    for (const c of card.costs ?? []) out.push({ action: "cost", choice: c, label: `DGF.Cost.${c}` });
  }
  if ((card.kind === CARD.roll || card.kind === CARD.ability) && card.suspicion > 0 && !card.hunt && card.raidId === currentRaidId) {
    if (card.cancelled) out.push({ action: "restore", label: "DGF.Card.restoreButton" });
    else if (card.applied) out.push({ action: "cancel", label: "DGF.Card.cancelButton" });
    else out.push({ action: "apply", label: "DGF.Card.applyButton" });
  }
  return out;
}

async function pickDropped(message, card) {
  const actor = game.actors.get(card.actorId);
  const carried = actor?.system?.carried ?? [];
  if (carried.length <= 1) return 0;
  const options = carried.map((c, i) => `<option value="${i}">${foundry.utils.escapeHTML(c.name)}</option>`).join("");
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title: t("DGF.Cost.drop") },
    classes: ["dont-get-forked"],
    content: `<div class="dont-get-forked dgf-dialog"><p>${t("DGF.Card.whichItem", { name: card.actorName })}</p><select name="item">${options}</select></div>`,
    buttons: [
      { action: "ok", label: t("DGF.Cost.drop"), default: true, callback: (event, btn) => Number(btn.form.elements.namedItem("item")?.value ?? 0) },
      { action: "cancel", label: t("DGF.Dialog.cancel") },
    ],
    rejectClose: false,
  });
  return typeof answer === "number" ? answer : null;
}

/** renderChatMessageHTML: add the viewer's buttons to our cards. */
export function onRenderChatMessage(message, html) {
  const card = cardOf(message);
  if (!card || !html?.querySelector) return;
  if (!game.user?.isGM) return;
  const buttons = gmButtons(card, raidIdReader());
  if (!buttons.length) return;
  let bar = html.querySelector(".dgf-card-actions");
  if (!bar) { bar = document.createElement("div"); bar.className = "dgf-card-actions"; html.appendChild(bar); }
  for (const b of buttons) {
    bar.appendChild(button(t(b.label), { dgfAction: b.action, choice: b.choice ?? "" }, async () => {
      if (b.action === "cost") {
        let itemIndex = 0;
        if (b.choice === "drop") { itemIndex = await pickDropped(message, card); if (itemIndex === null) return; }
        return runOp(OPS.raidCost, { messageId: message.id, choice: b.choice, itemIndex });
      }
      if (b.action === "apply") return runOp(OPS.raidApplyCard, { messageId: message.id });
      if (b.action === "cancel") return runOp(OPS.raidCancel, { eventId: card.eventId });
      if (b.action === "restore") return runOp(OPS.raidCancel, { eventId: card.eventId, restore: true });
    }));
  }
}

/** Every kind declared in contracts has a template here. */
export const CARD_KINDS = Object.freeze(Object.keys(TEMPLATES));
