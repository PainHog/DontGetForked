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
import { DGF } from "../config.mjs";
import { runOp } from "../net/gm-ops.mjs";
import { t, traitLabel, dieLabel, traitList } from "../helpers/i18n.mjs";

const TEMPLATES = {
  [CARD.roll]: `systems/${SYSTEM_ID}/templates/chat/roll-card.hbs`,
  [CARD.ability]: `systems/${SYSTEM_ID}/templates/chat/ability-card.hbs`,
  [CARD.raid]: `systems/${SYSTEM_ID}/templates/chat/raid-card.hbs`,
  [CARD.chase]: `systems/${SYSTEM_ID}/templates/chat/chase-card.hbs`,
  [CARD.tell]: `systems/${SYSTEM_ID}/templates/chat/tell-card.hbs`,
  [CARD.year]: `systems/${SYSTEM_ID}/templates/chat/year-card.hbs`,
};

/** The card facts on a message, or null. */
export function cardOf(message) {
  return message?.getFlag?.(FLAG, "card") ?? message?.flags?.[FLAG]?.card ?? null;
}

/** The current raid's id, read lazily (avoids an import cycle with the store). */
let raidIdReader = () => "";
export function setRaidIdReader(fn) { raidIdReader = fn; }

/** Opens the end-of-raid form (set by the apps layer; avoids an import cycle). */
let yearOpener = async () => null;
export function setYearOpener(fn) { yearOpener = fn; }

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
    flags: join([card.loud ? t("DGF.Card.loud") : "", card.watched ? t("DGF.Card.watched") : "", card.wayOut ? t("DGF.Card.wayOut") : "", card.chase ? t("DGF.Card.chase") : "",
      card.lockup ? t(`DGF.Card.lockup.${card.lockup}`) : "", card.furniture ? t("DGF.Card.furniture") : "", card.groupId ? t("DGF.Card.group") : ""]),
    chaseNote: card.chaseId ? t("DGF.Card.chaseRound", { round: card.chaseRound, ground: card.groundName ?? "", move: card.leadMove > 0 ? `+${card.leadMove}` : `${card.leadMove}` }) + (card.chaseShared ? ` ${t("DGF.Card.majority")}` : "") : "",
    lockupNote: card.lockup === "slip"
      ? (card.freed ? t("DGF.Card.slipFree") : card.slipTrouble ? t("DGF.Card.slipTrouble") : t("DGF.Card.slipHeld"))
      : card.lockup === "rescue" && card.rescued ? t("DGF.Card.rescued") : "",
    freedNote: card.freedNames?.length ? t("DGF.Card.freedNames", { names: card.freedNames.join(", ") }) : "",
    wayOutNote: card.wayOutBeaten ? t("DGF.Card.wayOutBeaten") : "",
    chaseStartedNote: card.chaseStarted ? t("DGF.Card.chaseStarted") : "",
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
  const names = (card.names ?? []).join(", ");
  return {
    kind: card.kind,
    headline: t(`DGF.RaidCard.${card.event}.title`),
    text: t(`DGF.RaidCard.${card.event}.text`, {
      label, limit: card.limit, turns: card.turns, cause: card.cause ? t(`DGF.HuntCause.${card.cause}`) : "",
      names, what: card.label || t("DGF.Group.unnamed"), how: card.how ? t(`DGF.RaidCard.home.${card.how}`) : "",
    }),
    hunt: card.event === "hunt",
    items: (card.items ?? []).map((it) => ({ name: it.name, note: [it.kind, it.essential ? t("DGF.List.essential") : ""].filter(Boolean).join(", ") })),
    left: card.leftNames?.length ? t("DGF.RaidCard.home.left", { names: card.leftNames.join(", ") }) : "",
  };
}

function chaseContext(card) {
  const kindLabel = t(`DGF.Chase.kind.${card.chaseKind}`);
  const groundName = card.ground ? DGF.chaseTable[card.ground.face - 1]?.name ?? "" : "";
  const groundText = card.ground ? DGF.chaseTable[card.ground.face - 1]?.text ?? "" : "";
  const fate = (f) => {
    if (f.fate === "captured") {
      const bits = [t("DGF.Chase.fate.captured", { name: f.name })];
      if (f.taken?.length) bits.push(t("DGF.Chase.taken", { items: f.taken.join(", ") }));
      if (f.kept?.length) bits.push(t("DGF.Chase.kept", { items: f.kept.join(", ") }));
      if (f.furniture) bits.push(t("DGF.Chase.furnitureTaken"));
      return bits.join(" ");
    }
    if (f.fate === "loseTurn") return t("DGF.Chase.fate.loseTurn", { name: f.name, turn: f.skipTurn ?? "" });
    return t("DGF.Chase.fate.forked");
  };
  const fates = card.chaseKind === "final" && card.outcome === "cornered" ? [t("DGF.Chase.fate.forked")] : (card.fates ?? []).map(fate);
  const outcome = card.outcome ? t(`DGF.Chase.outcome.${card.chaseKind}.${card.outcome}`) : "";
  return {
    kind: card.kind,
    final: card.chaseKind === "final",
    headline: t(`DGF.Chase.event.${card.event}`, { kind: kindLabel, round: card.round }),
    who: card.event === "start" ? t("DGF.Chase.who", { names: (card.members ?? []).join(", ") }) : "",
    start: card.event === "start" ? t("DGF.Chase.startText", { lead: card.lead, escape: card.escape, cause: card.cause ? t(`DGF.Chase.cause.${card.cause}`) : "" }) : "",
    ground: card.ground && (card.event === "ground" || card.event === "round") ? t("DGF.Chase.groundLine", { ground: groundName, traits: traitList(card.ground.traits) }) : "",
    groundText: card.event === "ground" ? groundText : "",
    mob: card.mob && card.event === "ground" ? t("DGF.Chase.mobLine", { mob: card.mob, lead: card.lead, escape: card.escape }) : "",
    extras: (card.extras ?? []).map((x) => t("DGF.Chase.extraTraits", { name: x.name, traits: traitList(x.traits) })),
    weak: card.weak?.length ? t("DGF.Chase.weakLine", { names: card.weak.join(", ") }) : "",
    rolls: (card.rolls ?? []).map((r) => `${r.name}: ${t(`DGF.Band.${r.band}`)}${r.critical ? ` (${t("DGF.Critical")})` : ""}`),
    move: card.event === "round" ? t("DGF.Chase.moveLine", { move: card.move > 0 ? `+${card.move}` : `${card.move}`, lead: card.lead, escape: card.escape }) : "",
    outcome,
    outcomeClass: card.outcome || "",
    fates,
  };
}

function tellContext(card) {
  const status = card.hunt ? t("DGF.Card.huntStops") : card.cancelled ? t("DGF.Card.cancelled") : card.applied ? t("DGF.Card.applied") : t("DGF.Card.notApplied");
  const dice = [card.face, ...(card.second !== null && card.second !== undefined ? [card.second] : [])].join(" · ");
  return {
    kind: card.kind,
    headline: card.place ? t("DGF.Tell.titleAt", { place: card.place }) : t("DGF.Tell.title"),
    arriving: t("DGF.Tell.arriving", { names: (card.arriving ?? []).join(", ") }),
    dice: t("DGF.Tell.dice", { dice }),
    second: card.needsSecond ? t("DGF.Tell.familiar") : "",
    goesOff: !!card.goesOff,
    result: card.goesOff ? t("DGF.Tell.goesOff", { name: card.actorName, tell: card.tellName }) : t("DGF.Tell.quiet"),
    tellText: card.goesOff ? card.tellText : "",
    suspicionLine: card.suspicion > 0 ? t("DGF.Card.suspicion", { n: card.suspicion, why: t("DGF.Trigger.tell") }) : "",
    suspicionStatus: card.suspicion > 0 ? status : "",
  };
}

function yearContext(card) {
  return {
    kind: card.kind,
    result: card.result,
    headline: t("DGF.Year.title", { result: t(`DGF.Result.${card.result}`) }),
    summary: card.result === "forked" ? "" : t("DGF.Year.summary", { home: card.itemsHome, size: card.listSize }),
    furniture: card.result !== "forked" && card.furnitureHome ? t("DGF.Year.furniture") : "",
    left: card.leftBehind ? t("DGF.Year.left", { n: card.leftBehind, names: (card.leftNames ?? []).join(", ") }) : "",
    lines: card.lines ?? [],
    missing: card.missingKinds?.length ? t("DGF.Year.missing", { kinds: card.missingKinds.join(", ") }) : "",
  };
}

const CONTEXTS = { [CARD.roll]: rollContext, [CARD.ability]: abilityContext, [CARD.raid]: raidContext, [CARD.chase]: chaseContext, [CARD.tell]: tellContext, [CARD.year]: yearContext };

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
  if ([CARD.roll, CARD.ability, CARD.tell].includes(card.kind) && card.suspicion > 0 && !card.hunt && card.raidId === currentRaidId) {
    if (card.cancelled) out.push({ action: "restore", label: "DGF.Card.restoreButton" });
    else if (card.applied) out.push({ action: "cancel", label: "DGF.Card.cancelButton" });
    else out.push({ action: "apply", label: "DGF.Card.applyButton" });
  }
  // a caught Entity's chase, when the automation didn't start it
  if (card.kind === CARD.roll && card.caught && !card.chaseStarted && card.raidId === currentRaidId) out.push({ action: "chase", label: "DGF.Card.chaseButton" });
  // the party got out: how did the year go?
  if (card.kind === CARD.raid && card.event === "home" && card.raidId === currentRaidId) out.push({ action: "year", label: "DGF.Card.yearButton" });
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
      if (b.action === "chase") return runOp(OPS.chaseStart, { messageId: message.id });
      if (b.action === "year") return yearOpener();
      if (b.action === "cancel") return runOp(OPS.raidCancel, { eventId: card.eventId });
      if (b.action === "restore") return runOp(OPS.raidCancel, { eventId: card.eventId, restore: true });
    }));
  }
}

/** Every kind declared in contracts has a template here. */
export const CARD_KINDS = Object.freeze(Object.keys(TEMPLATES));
