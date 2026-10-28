/**
 * DON'T GET FORKED — The roll plan (pure, Foundry-free)
 * -----------------------------------------------------
 * The roll dialog collects choices; this module turns them into exactly what
 * the book says happens, so the UI holds no rules:
 *
 *   buildRollPlan(input)                 → which dice, what Difficulty, who pays which charges
 *   resolvePlannedRoll(plan, tFace, sFace) → band, Critical, the Monster, Suspicion, caught, Costs …
 *   costOptions(…)                       → the Costs the Storyteller may pick (never one that costs nothing)
 *   planOdds(plan)                       → exact odds of each band, for the dialog
 *
 * Source: rulebook Chapter 3 (Rolling the Dice), Chapter 4 (Carrying, Getting
 * Out), Chapter 5 (Suspicion), Chapter 6 (Once the Hunt Is On, Weakness), and the
 * Perks of Chapter 2 (DGF.perkRules). Built on module/logic/rules.mjs.
 *
 * input = {
 *   roller:    { id, system },          // the rolling Entity (its actor id and system data)
 *   trait,                              // the trait the obstacle calls for
 *   second,                             // "mask" | "monster"
 *   difficulty,                         // the obstacle's Difficulty (or the way out's)
 *   abilities: [{ payerId, payerName, slot, name, effect, trait, noLoot, watchedOnly, asRaise,
 *                 payer: { charges, overdrewInFlight, overdrewInChase } }],   // spent before the roll; asRaise: spent as a raise
 *                 // (D6b: any runner's roll in the final flight; 2026-10-21: your own roll in a local chase)
 *   duty,      // at a location whose list item is the roller's Castle Duty kind
 *   loud,      // taking the loud way
 *   watched,   // the obstacle is watched
 *   wayOut,    // this is the way out of town (always watched; Shortcut)
 *   wayOutRolled, // R4: the way out has already been rolled this Turn (once a Turn; the switch wayOutOncePerTurn)
 *   pieceHeld, // 2026-10-21 (W4): a Huge piece one of whose carriers is in a local chase can't move: no way out (the switch hugePieceHeld)
 *   localOverdrawOnce, // 2026-10-21: one overdraw per runner per local chase (the switch localOverdrawOnce)
 *   partyPerks, // the way out: the Perks of the others there (everyone not captured; Fetch)
 *   chase,     // a chase roll (a local chase; every roll once the hunt is on)
 *   hunt,      // the whole town hunts (Suspicion stops, the Mask is off)
 *   chaseTraits, // in a chase the tracker runs: the traits this member may roll this round (module/logic/chase.mjs)
 *   chaseBlocked, // in that chase but it can't roll now: "noGround" | "alreadyRolled"
 *   weakness,  // the chase brings this Entity's Weakness now (its timing, C3)
 *   lockup,    // "slip" (a captive slipping free) | "rescue" (beating the lock-up) | ""
 *   furniture, // the furniture's extra obstacle (B2: 2 harder than rolled, at most 12)
 *   companionCarrying, // V17 (Out of Sight): someone with the roller carries loot or furniture (the dialog's tick)
 *   turn,      // the raid's Turn (slipping free: once per Turn, from the Turn after the capture)
 * }
 * Errors and warnings are codes (with data) for the UI to word.
 */
import { DGF } from "../config.mjs";
import { stepUp, stepDown, resolveRoll, leadMove, furnitureObstacleDifficulty } from "./rules.mjs";
import { formsOf, payFor, TRAITS, findEntity } from "./entity.mjs";
import { slipProblems, slipFrees, rescueFrees } from "./lockup.mjs";

const perkRule = (perk) => DGF.perkRules[perk] ?? {};
/** The roller's Perk by name (Chapter 2), for the words the dialog and the card show. */
const perkName = (sys) => findEntity(sys.entityKey)?.perks?.find((k) => k.key === sys.perk)?.name ?? sys.perk ?? "";

export function buildRollPlan(input) {
  const errors = [];
  const warnings = [];
  const sys = input?.roller?.system ?? {};
  const rollerId = input?.roller?.id ?? null;
  const P = perkRule(sys.perk);
  const hunt = !!input.hunt;
  const chase = !!input.chase || hunt; // once the hunt is on, every roll is a final-flight roll
  const carriesLoot = (sys.carried?.length ?? 0) > 0;
  const carryingFurniture = !!sys.carryingFurniture;

  const called = input.trait;
  if (!TRAITS.includes(called)) errors.push({ code: "badTrait", trait: called });
  const baseDifficulty = Number(input.difficulty);
  if (!Number.isInteger(baseDifficulty) || baseDifficulty < 1) errors.push({ code: "badDifficulty", difficulty: input.difficulty });

  const abilities = (input.abilities ?? []).map((a) => ({ ...a }));
  const isOwn = (a) => a.payerId === rollerId;

  // D6b (Chapter 6, The Final Flight): any ability may be spent as a raise (the trait die one size bigger) instead of
  // doing what it usually does, on any runner's roll; 2026-10-21 (The Local Chase): in a local chase too, on your own roll
  // (a friend's ability helps nobody there: helpInLocalChase below), even one that never works in a chase. Only in a
  // chase. It still costs its charge, and still counts as the one raise.
  for (const a of abilities.filter((x) => x.asRaise)) {
    if (!chase) errors.push({ code: "raiseOnlyInChase", name: a.name });
    Object.assign(a, { usual: a.effect, effect: "raise", trait: null, noLoot: false, watchedOnly: false });
  }
  // each ability goes on a roll once, one way or the other
  const spentTwice = abilities.filter((a, i) => abilities.findIndex((b) => b.payerId === a.payerId && b.slot === a.slot) !== i);
  for (const a of spentTwice) errors.push({ code: "sameAbilityTwice", name: a.name });
  // the Draught changes form from the sheet; on a roll it goes only as a raise, in a chase
  if (abilities.some((a) => a.effect === "form")) errors.push({ code: "draughtNotOnRoll" });

  // Chapter 6: in a local chase, abilities help only your own roll (anyone's in the final flight).
  if (chase && !hunt && abilities.some((a) => !isOwn(a))) errors.push({ code: "helpInLocalChase" });

  // Only one trait can be rolled: at most one ability that changes it.
  const changers = abilities.filter((a) => a.effect === "switch" || a.effect === "open");
  if (changers.length > 1) errors.push({ code: "twoTraits" });
  const opener = abilities.find((a) => a.effect === "open") ?? null;
  if (opener) {
    if (chase) errors.push({ code: "openInChase" }); // "never in a chase"
    if (!isOwn(opener)) errors.push({ code: "openByHelper", name: opener.name }); // "only the opener gets through" (T5)
    if (opener.noLoot && (carriesLoot || carryingFurniture)) errors.push({ code: "noLootThroughWall", name: opener.name });
  }
  const trait = changers[0]?.trait ?? called;

  // Where the roll is: the way out (Chapter 4) or the lock-up (Chapter 6) list their own traits.
  const mode = input.wayOut ? "wayOut" : input.lockup === "slip" ? "slip" : input.lockup === "rescue" ? "rescue" : "";
  const listed = mode === "wayOut" ? DGF.wayOut : mode ? DGF.lockup[mode] : null;
  // B7: Mesmerize opens an approach only at a watched obstacle (the way out and the lock-up always are)
  if (opener?.watchedOnly && !input.watched && !mode) errors.push({ code: "openNotWatched", name: opener.name });
  const captive = sys.status === "captured";
  if (captive && mode !== "slip") errors.push({ code: "captiveOnlySlips" }); // held at the lock-up: its one roll is slipping free
  if (mode === "slip") for (const code of slipProblems(sys, { turn: Number(input.turn) || 0 })) errors.push({ code });
  if (mode === "wayOut" && input.wayOutRolled) errors.push({ code: "wayOutOncePerTurn" }); // R4: the way out can be rolled once a Turn
  if (mode === "wayOut" && input.pieceHeld && !hunt) errors.push({ code: "pieceHeld" }); // W4: the Huge piece can't move until the chase is over
  if ((mode === "slip" || mode === "rescue") && hunt) errors.push({ code: "lockupInHunt" }); // everyone not captured is in the final flight
  if (listed) {
    const all = [...listed.quiet, ...listed.loud];
    if (opener && all.includes(opener.trait)) errors.push({ code: "openListed", name: opener.name }); // T5: only with a trait the obstacle doesn't list
    else if (!opener && !all.includes(called)) errors.push({ code: `notListed.${mode}` });
  }
  // A chase the tracker runs: the ground (plus Wall-Crawler's or Fly by Night's trait) says what works this round.
  const chaseTraits = Array.isArray(input.chaseTraits) ? input.chaseTraits : null;
  if (input.chaseBlocked) errors.push({ code: input.chaseBlocked }); // in the chase, but not now: "noGround" (the ground isn't rolled yet) or "alreadyRolled" (this round)
  // V2: "use the ability's trait instead" works in a chase too, replacing the ground's traits
  if (chase && chaseTraits && !changers.length && !chaseTraits.includes(called)) errors.push({ code: "notOnGround", traits: chaseTraits });
  // Chapter 5: "a trait the obstacle lists as loud is loud however you came to roll it" (a switch ability included)
  const loud = listed ? !opener && listed.loud.includes(trait) : !!input.loud;

  // The second die. Once the hunt is on the Mask is off; carriers can't use the Mask.
  let second = input.second === "monster" ? "monster" : "mask";
  if (second === "mask" && hunt) { second = "monster"; warnings.push({ code: "maskOffHunt" }); }
  else if (second === "mask" && carryingFurniture) { second = "monster"; warnings.push({ code: "maskCarrying" }); }

  // At most one raise per roll, from any source, Castle Duty included (R2). The Duty's edge is "not in a chase"
  // (Chapter 2, F19): not in a local chase, not once the hunt is on, whether or not the tracker runs the chase.
  const duty = !!input.duty && !chase;
  // Wall-Crawler (Chapter 2, 2026-10-20): in a chase, a local one or the final flight, his Nimble die is one size bigger,
  // with no charge and nothing to tick. It is the roll's one raise, so an ability's raise can't go on top (a smaller die
  // still cancels it one for one: Garlic leaves his Nimble a d10).
  const perkRaise = chase && !!P.chaseRaise && P.chaseRaise === trait;
  const abilityRaises = abilities.filter((a) => a.effect === "raise").length;
  const raiseSources = abilityRaises + (duty ? 1 : 0) + (perkRaise ? 1 : 0);
  if (raiseSources > 1) errors.push(perkRaise ? { code: "perkRaiseTaken", perk: perkName(sys), trait } : { code: "tooManyRaises" });
  const raises = Math.min(1, raiseSources);

  // Steps down: a Cost's "next roll one size smaller", carrying (Nimble), the Weakness in a chase, and (2026-10-21) an
  // overdraw in the final flight: from the overdrawer's next roll to the end of the flight, on top of any Weakness.
  const downParts = [];
  if ((sys.nextRollSmaller ?? 0) > 0) downParts.push({ key: "cost", n: sys.nextRollSmaller });
  const carryExempt = P.carryNimble === false && (!P.form || P.form === sys.form);
  if (carryingFurniture && trait === "nimble" && !carryExempt) downParts.push({ key: "carrying", n: 1 });
  const weakness = !!sys.weaknessInPlay || !!input.weakness;
  if (weakness && chase) downParts.push({ key: "weakness", n: 1 });
  if (hunt && sys.overdrewInFlight) downParts.push({ key: "overdraw", n: 1 });
  const downs = downParts.reduce((n, p) => n + p.n, 0);

  // Raises and steps down cancel out; then the die moves (d12 top, d4 floor: extra steps are lost).
  const baseDie = sys.traits?.[trait] ?? 4;
  const net = raises - downs;
  let traitDie = baseDie;
  if (DGF.dieSteps.includes(baseDie)) {
    const r = net >= 0 ? stepUp(baseDie, net) : stepDown(baseDie, -net);
    traitDie = r.die;
    if (r.over) warnings.push({ code: "raiseLost" });
    if (r.under) warnings.push({ code: "stepLost" });
  } else errors.push({ code: "badDie", trait, die: baseDie });

  // Difficulty: the furniture's extra obstacle (2 harder, at most 12), the way out (Shortcut: 2 easier; Fetch: 1 easier), an opened approach (2 lower).
  const diffParts = [];
  let difficulty = baseDifficulty;
  const furniture = !!input.furniture && !mode && !chase;
  if (furniture) {
    const harder = furnitureObstacleDifficulty(difficulty) - difficulty;
    difficulty += harder;
    if (harder) diffParts.push({ key: "furniture", n: harder });
  }
  if (input.wayOut && P.exitEase) { difficulty -= P.exitEase; diffParts.push({ key: "shortcut", n: -P.exitEase }); }
  const partyEase = input.wayOut ? Math.max(0, ...[sys.perk, ...(input.partyPerks ?? [])].map((k) => perkRule(k).partyExitEase ?? 0)) : 0;
  if (partyEase) { difficulty -= partyEase; diffParts.push({ key: "fetch", n: -partyEase }); } // B5: Fetch, for whoever rolls while the Werewolf is there
  if (opener) { difficulty -= DGF.openApproachEase; diffParts.push({ key: "open", n: -DGF.openApproachEase }); }

  const hidden = abilities.some((a) => a.effect === "hidden");
  if (hidden && second === "mask") warnings.push({ code: "hiddenWithMask" });

  // Charges: one per ability, before the roll; at zero, overdraw (Suspicion +2; once the hunt is on, a step down of its own).
  // 2026-10-21: in a local chase a runner overdraws once at most (the switch localOverdrawOnce); in the flight once (B3).
  const localOnce = chase && !hunt && !!input.localOverdrawOnce;
  const byPayer = new Map();
  for (const a of abilities) {
    const p = byPayer.get(a.payerId) ?? { payerId: a.payerId, payerName: a.payerName ?? "", own: isOwn(a), uses: 0, charges: a.payer?.charges ?? 0, overdrewInFlight: !!a.payer?.overdrewInFlight, overdrewInChase: !!a.payer?.overdrewInChase };
    p.uses += 1;
    byPayer.set(a.payerId, p);
  }
  const payments = [...byPayer.values()].map((p) => {
    const pay = payFor({ charges: p.charges, uses: p.uses, hunt, overdrewInFlight: p.overdrewInFlight, localChase: localOnce, overdrewInChase: p.overdrewInChase });
    if (!pay.allowed) errors.push({ code: pay.refusal === "onceLocal" ? "overdrawOnceLocal" : "overdrawOnce", name: p.payerName });
    return { ...p, ...pay };
  });
  // D3: outside the final flight each overdraw costs Suspicion +2 on top of the roll's other rise (in a local chase, on
  // top of the chase's one rise); in the flight it costs a step down of its own instead (payFor; 2026-10-21)
  const overdraws = hunt ? 0 : payments.reduce((n, p) => n + (p.overdraw > 0 ? p.overdraw : 0), 0);
  const overdraw = overdraws > 0;

  // V17 Out of Sight: Trouble gets you caught only while you or anyone in the same place carries loot or furniture. The
  // roller's own carrying counts by itself; a helper on this roll is at the same place; anyone else is the dialog's tick.
  let carryingBy = "", carryingName = "";
  if (P.caughtOnlyCarrying) {
    const helper = P.withYou ? abilities.find((a) => !isOwn(a) && a.payer?.carrying) : null;
    if (carriesLoot || carryingFurniture) carryingBy = "self";
    else if (helper) { carryingBy = "helper"; carryingName = helper.payerName ?? ""; }
    else if (P.withYou && input.companionCarrying) carryingBy = "companion";
  }

  const forms = formsOf(sys.entityKey);
  return {
    ok: errors.length === 0,
    errors,
    warnings,
    rollerId,
    calledTrait: called,
    trait,
    baseDie,
    traitDie,
    raises,
    downs,
    downParts,
    perkRaise: perkRaise ? perkName(sys) : "", // the Perk that raised this roll (Wall-Crawler), for the card
    second,
    secondDie: DGF.second[second],
    baseDifficulty,
    difficulty,
    diffParts,
    open: !!opener,
    hidden,
    loud,
    loudAmount: P.loud === 0 ? 0 : DGF.suspicion.loud,
    // the way out and the lock-up are always watched; slipping free starts no chase
    watched: mode === "slip" ? false : !!input.watched || mode === "wayOut" || mode === "rescue",
    wayOut: mode === "wayOut",
    lockup: mode === "slip" || mode === "rescue" ? mode : "",
    tracked: !!chaseTraits,
    furniture,
    weakness: weakness && chase,
    duty,
    chase,
    hunt,
    abilities,
    payments,
    overdraw,
    overdraws,
    stepFromOverdraw: payments.filter((p) => p.step).map((p) => p.payerId), // 2026-10-21: their trait die one size smaller from their next roll
    showMargin: P.showMargin && P.trait === trait ? P.showMargin : 1,
    formMargin: forms.length > 1 && sys.form === forms[0] ? (P.formMargin ?? 1) : null,
    monsterAmount: P.monsterShows ?? DGF.suspicion.monsterShows,
    caughtOnlyCarrying: !!P.caughtOnlyCarrying,
    carrying: carriesLoot || carryingFurniture || !!carryingBy,
    carryingBy,
    carryingName,
    carriesLoot,
    consumeSmaller: sys.nextRollSmaller ?? 0,
    perk: sys.perk ?? "",
  };
}

/**
 * Read the dice for a plan. Suspicion: one roll raises it once, by its biggest
 * trigger (Trouble +1, the Monster shows +2, the loud way +1), and each overdraw
 * adds +2 on top (D3); nothing once the hunt is on. D1: a local chase roll raises
 * nothing now: what it would (`chaseRise`, its trigger keys, `chaseOverdraws`) waits
 * for the chase's one rise when it ends (the ground has no loud way). Returns
 * everything the chat card shows: `suspicion` (raised now) = `rise` (the biggest
 * trigger) + `overdrawRise` (the overdraws on top).
 */
export function resolvePlannedRoll(plan, traitFace, secondFace) {
  const base = resolveRoll({
    traitFace, secondFace, difficulty: plan.difficulty, second: plan.second,
    hidden: plan.hidden, loud: plan.loud && plan.loudAmount > 0 && !plan.chase, overdraw: plan.overdraws ?? (plan.overdraw ? 1 : 0), hunt: plan.hunt,
  });
  const margin = secondFace - traitFace;
  const monster = plan.second === "monster";
  const showed = monster && margin >= plan.showMargin;
  const show = showed && !plan.hidden;
  const localChase = plan.chase && !plan.hunt;
  const overdraws = plan.hunt ? 0 : (plan.overdraws ?? (plan.overdraw ? 1 : 0));
  const triggers = [];
  if (base.band === "trouble") triggers.push({ key: "trouble", amount: DGF.suspicion.trouble });
  if (show) triggers.push({ key: "monster", amount: plan.monsterAmount });
  if (plan.loud && plan.loudAmount > 0 && !plan.chase) triggers.push({ key: "loud", amount: plan.loudAmount });
  if (overdraws) triggers.push({ key: "overdraw", amount: overdraws * DGF.suspicion.overdraw, onTop: true });
  const top = plan.hunt ? 0 : Math.max(0, ...triggers.filter((t) => !t.onTop).map((t) => t.amount));
  const topKeys = top > 0 ? triggers.filter((t) => !t.onTop && t.amount === top).map((t) => t.key) : [];
  const overdrawRise = overdraws * DGF.suspicion.overdraw;
  const rise = localChase ? 0 : top;
  const onTop = localChase ? 0 : overdrawRise;
  const suspicion = rise + onTop;
  const caught = base.band === "trouble" && plan.watched && !plan.chase && (!plan.caughtOnlyCarrying || plan.carrying);
  return {
    traitFace,
    secondFace,
    total: base.total,
    band: base.band,
    critical: base.critical,
    showed,
    show,
    hiddenShow: showed && plan.hidden,
    triggers,
    suspicion,
    rise,
    overdrawRise: onTop,
    riseKeys: localChase ? [] : topKeys,
    chaseRise: localChase ? top : 0,
    chaseRiseKeys: localChase ? topKeys : [],
    chaseOverdraws: localChase ? overdraws : 0,
    caught,
    troubleUnwatched: base.band === "trouble" && !plan.watched && !plan.chase && plan.lockup !== "slip",
    unseen: base.band === "trouble" && plan.watched && !caught && !plan.chase, // Out of Sight: watched, but nobody there carries anything
    formShift: plan.formMargin !== null && monster && margin >= plan.formMargin,
    chargeBack: base.critical && !plan.chase, // in a chase a Critical moves the Lead instead
    costs: costOptions({ band: base.band, trait: plan.trait, perk: plan.perk, suspicion: rise, carriesLoot: plan.carriesLoot, chase: plan.chase, hunt: plan.hunt, slip: plan.lockup === "slip", wayOut: plan.wayOut }),
    leadMove: plan.chase ? leadMove(base) : 0, // one Entity's move; a shared Lead moves by the majority rule (module/logic/chase.mjs)
    freed: plan.lockup === "slip" && slipFrees(base.band, plan.perk), // only a Success frees you (Built to Last: a Cost too)
    slipTrouble: plan.lockup === "slip" && base.band === "trouble", // Suspicion rises, but no chase starts
    rescued: plan.lockup === "rescue" && rescueFrees(base.band), // every captive there is free
    wayOutBeaten: plan.wayOut && !plan.chase && (base.band === "success" || base.band === "cost"), // everyone gets out
  };
}

/**
 * P3 + T10: the Costs the Storyteller may pick on a Cost result. Never one that
 * costs nothing right then: no Suspicion +1 the roll's triggers already raised (`suspicion`:
 * the roll's rise without its overdraws, which add on top, D3), or once the hunt is on; "drop an item" only if the roller carries loot; in a chase a Cost
 * costs nothing more; slipping free from the lock-up, a Cost does nothing; at the
 * way out a Cost gets everyone out, free (Chapter 4, T4). Perks remove options (Old Money, Patience of Ages, Keeper
 * of Treasures, Wise Woman). "A lost Turn when nothing waits" is the Storyteller's call.
 */
export function costOptions({ band, trait, perk = "", suspicion = 0, carriesLoot = false, chase = false, hunt = false, slip = false, wayOut = false }) {
  if (band !== "cost" || chase || slip || wayOut) return []; // slipping free: a Cost does nothing; the way out: free
  const P = perkRule(perk);
  const ruledOut = (c) => P.noCost === c && (!P.trait || P.trait === trait);
  return DGF.costs.filter((c) => {
    if (ruledOut(c)) return false;
    if (c === "suspicion") return !hunt && suspicion < DGF.suspicion.cost;
    if (c === "drop") return carriesLoot;
    return true;
  });
}

/** Exact odds for a plan (every face pair): each band, the Monster showing (counted), a Critical, expected Suspicion. */
export function planOdds(plan) {
  const out = { success: 0, cost: 0, trouble: 0, show: 0, critical: 0, suspicion: 0 };
  const w = 1 / (plan.traitDie * plan.secondDie);
  for (let t = 1; t <= plan.traitDie; t++) {
    for (let s = 1; s <= plan.secondDie; s++) {
      const r = resolvePlannedRoll(plan, t, s);
      out[r.band] += w;
      if (r.show) out.show += w;
      if (r.critical) out.critical += w;
      out.suspicion += w * r.suspicion;
    }
  }
  return out;
}

/** Charges after the roll: what was spent, plus a Critical's charge back (never above the starting number). */
export function chargesAfter({ value, start, spent = 0, chargeBack = false }) {
  const after = value - spent;
  return chargeBack ? Math.max(after, Math.min(start, after + 1)) : after;
}
