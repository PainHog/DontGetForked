/**
 * DON'T GET FORKED — group checks, Tell checks, the shopping list and the year (GM-authoritative)
 * ----------------------------------------------------------------------------------------------
 * The Foundry side of module/logic/checks.mjs and year.mjs, run on the active
 * Storyteller's client through the raid store's write queue.
 *
 *  - group check (Chapter 4, P6): the Storyteller opens one for the Entities
 *    rolling a group obstacle together; their rolls share one Suspicion event
 *    (it rises once, by the biggest trigger) and those caught flee together
 *    (module/raid/chase-flow.mjs, raid.roll). Setting autoGroupChecks.
 *  - Tell check (Chapter 5): once per watched location, a d6 (Familiar's Warning:
 *    a second d6), whose Tell among those arriving, Suspicion +1 (autoSuspicion).
 *  - the shopping list (Chapter 4): rolled on the d66 table (C14) or set by hand.
 *  - how the year went (Chapter 7): the year card from what came home; when the
 *    party is forked it posts itself (autoYear); when the party gets out, a card
 *    asks the Storyteller to confirm what came home.
 */
import { SYSTEM_ID, SETTINGS, OPS, CARD, HOOKS, ACTOR_TYPES } from "../contracts.mjs";
import { DGF } from "../config.mjs";
import * as R from "../logic/raid.mjs";
import { rollShoppingList, epilogueLines, tellGoesOff, addUpgrade } from "../logic/rules.mjs";
import { newGroup, closeGroup, needsSecondDie, readTellCheck, placeChecked, spectralPasses } from "../logic/checks.mjs";
import { yearFromList, homeFromCarried, listShape, listItem, essentialsFor } from "../logic/year.mjs";
import { isCaptive } from "../logic/lockup.mjs";
import { registerOp, runOp } from "../net/gm-ops.mjs";
import { setting } from "../settings.mjs";
import { getRaid, mutateRaid, castleUpgrades } from "./store.mjs";
import { postCard, cardOf, updateCard } from "../chat/cards.mjs";
import { entities, inRaid } from "./chase-flow.mjs";

const isEntity = (actor) => actor?.type === ACTOR_TYPES.entity;

/* --------------------------------------------------------------- the year -- */

/** What the end-of-raid form starts from: the list (what looks home), the furniture, who is left behind. */
export function yearDefaults(raid = getRaid()) {
  const out = entities().filter((a) => !isCaptive(a.system));
  const held = entities().filter((a) => isCaptive(a.system));
  const shape = listShape(raid.difficulty);
  const base = raid.list.length ? raid.list : Array.from({ length: shape.size }, (_, i) => ({ name: "", duty: DGF.duties[0].key, essential: i < shape.essentials[0] }));
  const carried = out.flatMap((a) => (a.system.carried ?? []).map((c) => c.name));
  return {
    list: homeFromCarried(base, carried),
    furnitureHome: !raid.furnitureLost && out.some((a) => a.system.carryingFurniture),
    furnitureLost: !!raid.furnitureLost,
    leftBehind: held.length,
    leftNames: held.map((a) => a.name),
    forked: raid.chase?.kind === "final" && raid.chase.outcome === "cornered",
  };
}

async function postYear(year, raid, extra = {}) {
  const duty = (k) => DGF.duties.find((d) => d.key === k);
  const card = {
    v: 1, kind: CARD.year, raidId: raid.raidId, difficulty: raid.difficulty, ...year,
    missingKinds: (year.missingDuties ?? []).map((k) => duty(k)?.kind ?? k), ...extra,
  };
  const message = await postCard(card);
  Hooks.callAll(HOOKS.yearDecided, card);
  return message;
}

/** Forked (cornered in the final flight): the raid is lost; the year card posts itself. */
export async function finishForked() {
  const raid = getRaid();
  if (raid.over) return null;
  const year = raid.list.length
    ? yearFromList({ list: raid.list.map((it) => ({ ...it, home: false })), forked: true })
    : { result: "forked", lines: epilogueLines({ result: "forked" }), listSize: 0, itemsHome: 0, missingDuties: [], leftBehind: 0 };
  await mutateRaid((s) => R.endRaid(s, { result: "forked" }));
  return postYear(year, raid);
}

/** The party got out (the way out beaten, or the final flight escaped): a card asks the Storyteller what came home. */
export async function promptHome(how) {
  const raid = getRaid();
  if (raid.over) return null;
  const held = entities().filter((a) => isCaptive(a.system)).map((a) => a.name);
  return postCard({ kind: CARD.raid, event: "home", how, raidId: raid.raidId, difficulty: raid.difficulty, limit: raid.limit, turns: raid.turns, leftNames: held });
}

/* ------------------------------------------------------------ operations -- */

async function rollList(size, essentials) {
  const faces = [];
  const more = async (n) => { const r = await new Roll(`${n}d6`).evaluate(); faces.push(...r.dice[0].results.map((x) => x.result)); return r; };
  const rolls = [await more(size * 2 + 4)];
  for (let tries = 0; tries < 20; tries++) {
    let i = 0;
    try {
      const list = rollShoppingList({ size, essentials, roll: () => { if (i >= faces.length) throw new Error("more"); return faces[i++]; } });
      return { list, rolls };
    } catch (err) {
      if (err.message !== "more") throw err;
      rolls.push(await more(6));
    }
  }
  throw new Error("could not roll a shopping list");
}

export function registerCheckOps() {
  // GM (campaign play, Chapter 7): a piece of furniture or decor brought home becomes a castle upgrade, from that
  // year's card, once. The castle holds three: a fourth replaces the one the Storyteller names (`replace`, an index).
  registerOp(OPS.castleUpgrade, {
    gmOnly: true,
    apply: async ({ messageId, name = "", replace = null } = {}) => {
      if (!setting(SETTINGS.campaign)) return { ok: false, reason: "campaignOff" };
      const message = game.messages.get(messageId);
      const card = cardOf(message);
      if (card?.kind !== CARD.year || !card.furnitureHome) return { ok: false, reason: "noPiece" };
      if (card.raidId !== getRaid().raidId) return { ok: false, reason: "otherRaid" }; // before the next raid starts
      if (card.upgradeAdded) return { ok: false, reason: "already" };
      const piece = String(name ?? "").trim() || game.i18n.localize("DGF.Castle.defaultPiece");
      const at = replace === null || replace === "" || replace === undefined ? null : Math.trunc(Number(replace));
      let upgrades;
      try { upgrades = addUpgrade(castleUpgrades(), piece, Number.isInteger(at) ? at : null); } catch (err) { return { ok: false, reason: "full" }; }
      await game.settings.set(SYSTEM_ID, SETTINGS.castleUpgrades, upgrades);
      await updateCard(message, { upgradeAdded: true });
      const raid = getRaid();
      await postCard({ kind: CARD.raid, event: "castle", raidId: raid.raidId, difficulty: raid.difficulty, limit: raid.limit, turns: raid.turns, upgrades, extras: [] });
      return { ok: true, upgrades };
    },
  });

  // GM: open a group check for the Entities rolling a group obstacle together, or close it.
  registerOp(OPS.raidGroup, {
    gmOnly: true,
    apply: async ({ action = "open", members = [], label = "" }) => {
      if (action === "close") {
        const g = getRaid().group;
        if (!g?.open) return { ok: false, reason: "noGroup" };
        await mutateRaid((s) => R.setGroup(s, closeGroup(s.group)));
        // anyone caught so far flees together (the rolls that came in)
        const caught = getRaid().group.members.filter((m) => getRaid().group.rolls[m.actorId]?.caught);
        if (caught.length && setting(SETTINGS.autoChase)) {
          const first = game.messages.get(getRaid().group.rolls[caught[0].actorId].messageId);
          if (first) await runOp(OPS.chaseStart, { messageId: first.id });
        }
        await postCard({ kind: CARD.raid, event: "groupClosed", raidId: getRaid().raidId, label: g.label, difficulty: getRaid().difficulty });
        return { ok: true };
      }
      if (!setting(SETTINGS.autoGroupChecks)) return { ok: false, reason: "groupChecksOff" };
      if (getRaid().group?.open) return { ok: false, reason: "groupOpen" };
      // V19: a Spectral Ghost carrying nothing is past without rolling; carrying, it rolls like anyone else
      const list = members.map((id) => game.actors.get(id)).filter((a) => isEntity(a) && inRaid(a))
        .map((a) => ({ actorId: a.id, name: a.name, passes: spectralPasses(a.system), spectral: !!DGF.perkRules[a.system.perk]?.groupPass }));
      if (list.length < 2) return { ok: false, reason: "tooFew" };
      const id = foundry.utils.randomID();
      const { state } = await mutateRaid((s) => R.setGroup(s, newGroup({ id, label: String(label ?? ""), turn: s.turn, members: list })));
      await postCard({
        kind: CARD.raid, event: "group", raidId: state.raidId, difficulty: state.difficulty, label: String(label ?? ""),
        names: list.filter((m) => !m.passes).map((m) => m.name),
        passed: list.filter((m) => m.passes).map((m) => m.name), spectralRolls: list.filter((m) => m.spectral && !m.passes).map((m) => m.name),
      });
      return { ok: true, groupId: id };
    },
  });

  // GM: a Tell check for the Entities arriving at a watched location (once per location).
  registerOp(OPS.raidTell, {
    gmOnly: true,
    apply: async ({ arriving = [], place = "" }) => {
      const raid = getRaid();
      if (placeChecked(raid.tells, place)) return { ok: false, reason: "alreadyChecked" };
      const actors = [...new Set(arriving)].map((id) => game.actors.get(id)).filter((a) => isEntity(a) && inRaid(a));
      if (!actors.length) return { ok: false, reason: "nobodyArriving" };
      const list = actors.map((a) => ({ actorId: a.id, name: a.name, perk: a.system.perk, entityKey: a.system.entityKey }));
      const rolls = [];
      const d6 = async () => { const r = await new Roll("1d6").evaluate(); rolls.push(r); return r.total; };
      const face = await d6();
      const second = needsSecondDie(list) ? await d6() : null;
      let whoseFace = 1;
      if (tellGoesOff(face) && (second === null || tellGoesOff(second)) && list.length > 1) {
        const r = await new Roll(`1d${list.length}`).evaluate();
        rolls.push(r);
        whoseFace = r.total;
      }
      const read = readTellCheck({ arriving: list, face, second, whoseFace });
      const id = foundry.utils.randomID();
      await mutateRaid((s) => R.addTell(s, { id, place: String(place ?? ""), goesOff: read.goesOff, actorId: read.whose?.actorId ?? "", name: read.whose?.name ?? "" }));
      const message = await postCard({
        v: 1, kind: CARD.tell, raidId: raid.raidId, eventId: `tell:${id}`, place: String(place ?? ""), turn: raid.turn,
        arriving: list.map((a) => a.name), face, second, whoseFace: read.goesOff && list.length > 1 ? whoseFace : 0,
        goesOff: read.goesOff, needsSecond: read.needsSecond, actorId: read.whose?.actorId ?? "", actorName: read.whose?.name ?? "",
        tellName: read.whose?.tell.name ?? "", tellText: read.whose?.tell.text ?? "",
        suspicion: read.goesOff ? DGF.suspicion.tell : 0, suspicionLabel: "tell", hunt: raid.hunt, applied: false, cancelled: false,
      }, { rolls });
      if (read.goesOff && !raid.hunt && setting(SETTINGS.autoSuspicion)) await runOp(OPS.raidApplyCard, { messageId: message.id });
      return { ok: true, goesOff: read.goesOff, whose: read.whose?.actorId ?? "" };
    },
  });

  // GM: the shopping list — roll it on the d66 table (F16: on Standard, any die: odd one essential, even two), set it by hand, or clear it.
  registerOp(OPS.raidList, {
    gmOnly: true,
    apply: async ({ action = "roll", list = [] }) => {
      const raid = getRaid();
      if (action === "clear") { await mutateRaid((s) => R.setList(s, [])); return { ok: true }; }
      if (action === "set") {
        let items;
        try { items = list.map((it) => listItem(it)); } catch (err) { return { ok: false, reason: "badList" }; }
        await mutateRaid((s) => R.setList(s, items));
        return { ok: true, size: items.length };
      }
      const shape = listShape(raid.difficulty);
      let essentialsFace = 0;
      const pre = [];
      if (shape.essentials.length > 1) {
        const r = await new Roll("1d6").evaluate();
        essentialsFace = r.total;
        pre.push(r);
      }
      const n = essentialsFor(raid.difficulty, essentialsFace || 1);
      const { list: rolled, rolls } = await rollList(shape.size, n);
      const { state } = await mutateRaid((s) => R.setList(s, rolled));
      await postCard({
        kind: CARD.raid, event: "list", raidId: state.raidId, difficulty: state.difficulty, essentials: n, essentialsFace,
        items: rolled.map((it) => ({ name: it.name, essential: it.essential, kind: DGF.duties.find((d) => d.key === it.duty)?.kind ?? "" })),
      }, { rolls: [...pre, ...rolls] });
      return { ok: true, essentials: n, essentialsFace, list: rolled.map((it) => it.name) };
    },
  });

  // GM: how the year went, from what came home.
  registerOp(OPS.raidEnd, {
    gmOnly: true,
    apply: async ({ list = [], furnitureHome = false, leftBehind = 0, forked = false }) => {
      const raid = getRaid();
      if (raid.over) return { ok: false, reason: "raidOver" };
      let items;
      try { items = list.map((it) => listItem(it)); } catch (err) { return { ok: false, reason: "badList" }; }
      if (!items.length && !forked) return { ok: false, reason: "emptyList" };
      const year = items.length
        ? yearFromList({ list: items, furnitureHome: !!furnitureHome, leftBehind: Number(leftBehind) || 0, forked: !!forked, furnitureLost: raid.furnitureLost })
        : { result: "forked", lines: epilogueLines({ result: "forked" }), listSize: 0, itemsHome: 0, missingDuties: [], leftBehind: 0 };
      const held = entities().filter((a) => isCaptive(a.system)).map((a) => a.name);
      await mutateRaid((s) => R.endRaid(R.setList(s, items), { result: year.result }));
      await postYear(year, raid, { items: items.map((it) => ({ name: it.name, essential: it.essential, home: it.home && !forked })), leftNames: forked ? [] : held.slice(0, year.leftBehind) });
      return { ok: true, result: year.result };
    },
  });
}
