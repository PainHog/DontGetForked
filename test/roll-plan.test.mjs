/**
 * module/logic/roll-plan.mjs against rulebook Chapters 2–6, with fixed dice.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { DGF } from "../module/config.mjs";
import { entitySystem, rollAbilities, diceFor } from "../module/logic/entity.mjs";
import { buildRollPlan, resolvePlannedRoll, costOptions, planOdds, chargesAfter } from "../module/logic/roll-plan.mjs";
import { resolveRoll, rollOdds } from "../module/logic/rules.mjs";

const roller = (key, patch = {}) => ({ id: "me", system: { ...entitySystem(key), ...patch } });
const ownAbility = (r, slot) => {
  const a = rollAbilities(r.system).find((x) => x.slot === slot);
  return { ...a, payerId: r.id, payerName: "Me", payer: { charges: r.system.charges.value, weaknessInPlay: r.system.weaknessInPlay } };
};
const plan = (r, opts = {}) => buildRollPlan({ roller: r, trait: "sly", second: "mask", difficulty: 8, abilities: [], ...opts });

test("a plain roll: the trait die, the Mask or the Monster, the Difficulty", () => {
  const p = plan(roller("dracula"));
  assert.equal(p.ok, true);
  assert.equal(p.traitDie, 6);
  assert.equal(p.secondDie, 6);
  assert.equal(p.difficulty, 8);
  assert.equal(plan(roller("dracula"), { second: "monster" }).secondDie, 10);
});

test("without Perks the plan reads a roll exactly as rules.resolveRoll does", () => {
  const r = roller("mummy"); // Patience of Ages bends no roll
  for (const second of ["mask", "monster"]) {
    for (const loud of [false, true]) {
      const p = plan(r, { second, loud, trait: "charm" });
      for (let t = 1; t <= p.traitDie; t++) for (let s = 1; s <= p.secondDie; s++) {
        const mine = resolvePlannedRoll(p, t, s);
        const ref = resolveRoll({ traitFace: t, secondFace: s, difficulty: 8, second, loud });
        assert.equal(mine.band, ref.band);
        assert.equal(mine.critical, ref.critical);
        assert.equal(mine.show, ref.show);
        assert.equal(mine.suspicion, ref.suspicion);
      }
    }
  }
  // and the dialog odds match rules.rollOdds
  const p = plan(r, { second: "monster", trait: "charm" });
  const a = planOdds(p), b = rollOdds(8, 10, 8, { monster: true });
  for (const k of ["success", "cost", "trouble", "show", "critical"]) assert.ok(Math.abs(a[k] - b[k]) < 1e-12, k);
});

test("one roll, one rise: the biggest trigger", () => {
  const p = plan(roller("mummy"), { second: "monster", loud: true, trait: "sly" }); // d6 + d10
  const r = resolvePlannedRoll(p, 1, 3); // total 4: Trouble; the Monster shows; loud
  assert.equal(r.band, "trouble");
  assert.deepEqual(r.triggers.map((t) => t.key), ["trouble", "monster", "loud"]);
  assert.equal(r.suspicion, 2);
});

test("a Critical is a Success on doubles and gives a spent charge back (not in a chase)", () => {
  const p = plan(roller("dracula"));
  const r = resolvePlannedRoll(p, 4, 4);
  assert.equal(r.critical, true);
  assert.equal(r.chargeBack, true);
  assert.equal(resolvePlannedRoll(plan(roller("dracula"), { chase: true }), 4, 4).chargeBack, false);
  assert.equal(chargesAfter({ value: 3, start: 3, spent: 0, chargeBack: true }), 3); // never above the start
  assert.equal(chargesAfter({ value: 3, start: 3, spent: 1, chargeBack: true }), 3);
  assert.equal(chargesAfter({ value: 1, start: 3, spent: 1, chargeBack: false }), 0);
  assert.equal(chargesAfter({ value: 0, start: 3, spent: 0, chargeBack: true }), 1);
});

test("abilities: raise, switch, hidden, open; at most one raise per roll, Castle Duty included", () => {
  const witch = roller("witch");
  const hedge = ownAbility(witch, "signature"); // raise
  let p = plan(witch, { abilities: [hedge] });
  assert.equal(p.traitDie, 12); // Sly d10 → d12
  assert.equal(p.payments[0].spend, 1);
  p = plan(witch, { abilities: [hedge], duty: true });
  assert.equal(p.ok, false);
  assert.deepEqual(p.errors.map((e) => e.code), ["tooManyRaises"]);
  // the Duty alone is the one raise
  assert.equal(plan(witch, { duty: true, trait: "nimble" }).traitDie, 6);
  // a d12 can't go higher
  const w = plan(witch, { abilities: [hedge], trait: "wits" });
  assert.equal(w.traitDie, 12);
  assert.deepEqual(w.warnings.map((x) => x.code), ["raiseLost"]);

  const drac = roller("dracula");
  const bat = ownAbility(drac, "gift"); // switch to Nimble
  p = plan(drac, { abilities: [bat] });
  assert.equal(p.trait, "nimble");
  assert.equal(p.traitDie, 10);
  const mesmerise = ownAbility(drac, "signature"); // open with Charm, at a watched obstacle (B7)
  p = plan(drac, { abilities: [mesmerise], difficulty: 10, watched: true });
  assert.equal(p.trait, "charm");
  assert.equal(p.difficulty, 8);
  assert.equal(p.open, true);
  assert.deepEqual(plan(drac, { abilities: [mesmerise, bat], watched: true }).errors.map((e) => e.code), ["twoTraits"]);
  assert.ok(plan(drac, { abilities: [mesmerise], chase: true, watched: true }).errors.some((e) => e.code === "openInChase"));

  const wolf = roller("werewolf");
  p = plan(wolf, { abilities: [ownAbility(wolf, "signature")], second: "monster" }); // Good Dog
  assert.equal(p.hidden, true);
  const r = resolvePlannedRoll(p, 2, 9); // the Monster shows, but raises nothing
  assert.equal(r.showed, true);
  assert.equal(r.show, false);
  assert.equal(r.hiddenShow, true);
  assert.equal(r.suspicion, 0);
  assert.deepEqual(plan(wolf, { abilities: [ownAbility(wolf, "signature")] }).warnings.map((x) => x.code), ["hiddenWithMask"]);
});

test("Through the Wall can't take loot or furniture through", () => {
  const ghost = roller("ghost", { carried: [{ name: "the silver spoons" }] });
  const p = plan(ghost, { abilities: [ownAbility(ghost, "signature")] });
  assert.ok(p.errors.some((e) => e.code === "noLootThroughWall"));
  assert.equal(plan(roller("ghost"), { abilities: [ownAbility(roller("ghost"), "signature")] }).ok, true);
});

test("helping: another Entity's ability on my roll costs its charge; never in a local chase; no opening for others", () => {
  const me = roller("dracula");
  const helper = { slot: "signature", name: "Hedge Spell", effect: "raise", trait: null, payerId: "witch1", payerName: "Witch", payer: { charges: 0 } };
  let p = plan(me, { abilities: [helper] });
  assert.equal(p.traitDie, 8);
  assert.deepEqual(p.payments.map((x) => [x.payerId, x.spend, x.overdraw]), [["witch1", 0, 1]]);
  assert.equal(p.overdraw, true); // the helper overdraws: one of this roll's triggers
  assert.equal(resolvePlannedRoll(p, 6, 6).suspicion, 2);
  assert.ok(plan(me, { abilities: [helper], chase: true }).errors.some((e) => e.code === "helpInLocalChase"));
  assert.equal(plan(me, { abilities: [helper], hunt: true }).ok, true); // anyone's roll in the final flight
  const opener = { slot: "signature", name: "Through the Wall", effect: "open", trait: "sly", payerId: "ghost1", payer: { charges: 3 } };
  assert.ok(plan(me, { abilities: [opener] }).errors.some((e) => e.code === "openByHelper"));
});

test("overdraw: Suspicion +2, or once the hunt is on a step down of its own from the next roll (2026-10-21), on top of any Weakness", () => {
  const broke = roller("witch", { charges: { value: 0, start: 3 } });
  let p = plan(broke, { abilities: [ownAbility(broke, "signature")] });
  assert.equal(p.overdraw, true);
  assert.equal(resolvePlannedRoll(p, 10, 6).suspicion, 2);
  p = plan(broke, { abilities: [ownAbility(broke, "signature")], hunt: true, second: "monster" });
  assert.equal(p.overdraw, false);
  assert.deepEqual(p.stepFromOverdraw, ["me"]);
  assert.equal(p.downs, 0, "not on this roll: from its next roll");
  assert.equal(resolvePlannedRoll(p, 1, 1).suspicion, 0); // Suspicion stops once the hunt is on
  // allowed while the Weakness is in play (no Dracula or Ghost exception any more)
  const weak = roller("witch", { charges: { value: 0, start: 3 }, weaknessInPlay: true });
  assert.equal(plan(weak, { abilities: [ownAbility(weak, "signature")], hunt: true, second: "monster" }).ok, true);
  // its next roll to the end of the flight: one size smaller, on top of the Weakness (Wits d12 → d10 → d8)
  const after = roller("witch", { charges: { value: 0, start: 3 }, overdrewInFlight: true });
  p = plan(after, { trait: "wits", hunt: true, chase: true, second: "monster", difficulty: 11 });
  assert.deepEqual([p.downParts.map((d) => d.key), p.traitDie], [["overdraw"], 10]);
  p = plan(after, { trait: "wits", hunt: true, chase: true, second: "monster", difficulty: 11, weakness: true });
  assert.deepEqual([p.downParts.map((d) => d.key), p.traitDie], [["weakness", "overdraw"], 8], "they stack");
  assert.equal(plan(after, { trait: "wits" }).traitDie, 12, "only in the flight");
  assert.ok(plan(after, { abilities: [{ ...ownAbility(after, "signature"), payer: { charges: 0, overdrewInFlight: true } }], hunt: true, second: "monster" }).errors.some((e) => e.code === "overdrawOnce"), "once per flight");
});

test("2026-10-21: one overdraw per runner per local chase (the switch localOverdrawOnce), on a roll or from the sheet", () => {
  const sig = (r, payer = {}) => ({ ...ownAbility(r, "signature"), payer: { charges: 0, ...payer } });
  const broke = roller("witch", { charges: { value: 0, start: 3 } });
  const local = (r, opts) => plan(r, { chase: true, chaseTraits: ["wits", "sly"], trait: "wits", difficulty: 9, localOverdrawOnce: true, ...opts });
  assert.equal(local(broke, { abilities: [sig(broke)] }).ok, true, "the first");
  assert.ok(local(broke, { abilities: [sig(broke, { overdrewInChase: true })] }).errors.some((e) => e.code === "overdrawOnceLocal"), "a second is refused");
  const gift = { ...sig(broke), slot: "gift", name: "Black Cat", effect: "hidden" };
  assert.ok(local(broke, { abilities: [sig(broke), gift], second: "monster" }).errors.some((e) => e.code === "overdrawOnceLocal"), "two on one roll");
  assert.equal(local(broke, { abilities: [sig(broke, { overdrewInChase: true })], localOverdrawOnce: false }).ok, true, "the switch off");
  assert.equal(plan(broke, { abilities: [sig(broke, { overdrewInChase: true })], localOverdrawOnce: true }).ok, true, "outside a chase: no limit");
});

test("2026-10-21 (W4): a Huge piece one of whose carriers is in a local chase can't move: the way out is refused", () => {
  const me = roller("werewolf");
  const out = (opts) => plan(me, { trait: "sly", wayOut: true, ...opts });
  assert.ok(out({ pieceHeld: true }).errors.some((e) => e.code === "pieceHeld"));
  assert.equal(out({}).ok, true);
  assert.equal(plan(me, { trait: "sly", pieceHeld: true }).ok, true, "only the way out");
});

test("Jekyll (2026-10-21): Hyde takes over whenever the Monster shows on Jekyll's roll, even when an ability (his or a friend's) kept its Suspicion off", () => {
  const jh = roller("jekyll-hyde"); // as Jekyll: Sly d8
  const pillar = { slot: "gift", name: "Pillar of Society", effect: "hidden", trait: null, payerId: "me", payerName: "Jekyll", payer: { charges: 3 } };
  const unseen = { slot: "signature", name: "Unseen", effect: "hidden", trait: null, payerId: "inv", payerName: "The Invisible Man", payer: { charges: 3 } };
  for (const ab of [pillar, unseen]) {
    const p = plan(jh, { trait: "sly", second: "monster", abilities: [ab] });
    assert.equal(p.ok, true, p.errors.map((e) => e.code).join());
    const r = resolvePlannedRoll(p, 3, 7); // the Monster beats the trait die
    assert.deepEqual([r.showed, r.show, r.suspicion, r.formShift], [true, false, 0, true], ab.name);
  }
});

test("once the hunt is on the Mask is off; carriers can't use the Mask and roll Nimble smaller", () => {
  let p = plan(roller("dracula"), { hunt: true });
  assert.equal(p.second, "monster");
  assert.deepEqual(p.warnings.map((w) => w.code), ["maskOffHunt"]);
  p = plan(roller("dracula", { carryingFurniture: true }), { trait: "nimble" });
  assert.equal(p.second, "monster");
  assert.equal(p.traitDie, 8); // d10 → d8
  // Tireless: carrying doesn't make your Nimble smaller
  assert.equal(plan(roller("creature", { carryingFurniture: true, perk: "tireless" }), { trait: "nimble" }).traitDie, 8);
  // Brute Strength: only as Hyde
  const hyde = { form: "hyde", traits: diceFor("jekyll-hyde", "hyde"), perk: "bruteStrength", carryingFurniture: true };
  assert.equal(plan(roller("jekyll-hyde", hyde), { trait: "nimble" }).traitDie, 10);
  assert.equal(plan(roller("jekyll-hyde", { perk: "bruteStrength", carryingFurniture: true }), { trait: "nimble" }).traitDie, 4); // Jekyll d6 → d4
});

test("steps down: a Cost's smaller die, the Weakness in a chase; raises and steps down cancel; nothing below d4", () => {
  const witch = roller("witch", { nextRollSmaller: 1 });
  assert.equal(plan(witch).traitDie, 8); // Sly d10 → d8
  assert.equal(plan(witch, { abilities: [ownAbility(witch, "signature")] }).traitDie, 10); // cancel out
  assert.equal(plan(witch).consumeSmaller, 1);
  const d4 = plan(roller("witch", { nextRollSmaller: 1 }), { trait: "nimble" });
  assert.equal(d4.traitDie, 4);
  assert.deepEqual(d4.warnings.map((w) => w.code), ["stepLost"]);
  const weak = roller("dracula", { weaknessInPlay: true });
  assert.equal(plan(weak).traitDie, 6); // not a chase roll
  assert.equal(plan(weak, { chase: true }).traitDie, 4);
});

test("Perks that bend a roll", () => {
  // Hypnotic Eyes: on Charm rolls the Monster shows only if it beats the trait die by 2+
  const drac = roller("dracula");
  const charm = plan(drac, { trait: "charm", second: "monster" });
  assert.equal(resolvePlannedRoll(charm, 5, 6).show, false);
  assert.equal(resolvePlannedRoll(charm, 5, 7).show, true);
  assert.equal(resolvePlannedRoll(plan(drac, { trait: "sly", second: "monster" }), 5, 6).show, true);
  // Rattle: the Monster showing is +1, not +2
  const rattle = plan(roller("ghost", { perk: "rattle" }), { second: "monster" });
  assert.equal(resolvePlannedRoll(rattle, 1, 9).suspicion, 1);
  // Light Step: the loud way costs no Suspicion
  assert.equal(resolvePlannedRoll(plan(roller("invisible", { perk: "lightStep" }), { loud: true }), 6, 6).suspicion, 0);
  assert.equal(resolvePlannedRoll(plan(roller("invisible", { perk: "hiddenPockets" }), { loud: true }), 6, 6).suspicion, 1);
  // Out of Sight (default): Trouble gets you caught only while you carry loot or furniture
  const inv = roller("invisible");
  assert.equal(resolvePlannedRoll(plan(inv, { watched: true }), 1, 1).caught, false);
  assert.equal(resolvePlannedRoll(plan(inv, { watched: true }), 1, 1).unseen, true);
  assert.equal(resolvePlannedRoll(plan(inv, { watched: false }), 1, 1).troubleUnwatched, true);
  assert.equal(resolvePlannedRoll(plan(inv, { watched: false }), 1, 1).unseen, false);
  assert.equal(resolvePlannedRoll(plan(roller("invisible", { carried: [{ name: "a top hat" }] }), { watched: true }), 1, 1).caught, true);
  assert.equal(resolvePlannedRoll(plan(drac, { watched: true }), 1, 1).caught, true);
  assert.equal(resolvePlannedRoll(plan(drac, { watched: false }), 1, 1).caught, false);
  // Shortcut: the way out is 2 easier; the way out is always watched
  const way = plan(roller("werewolf", { perk: "shortcut" }), { wayOut: true, difficulty: 8 });
  assert.equal(way.difficulty, 6);
  assert.equal(way.watched, true);
  assert.equal(plan(roller("werewolf"), { wayOut: true, difficulty: 8 }).difficulty, 8);
  // Fetch (B5): the way out is 1 easier for whoever rolls while the Werewolf is there
  assert.equal(plan(roller("dracula"), { wayOut: true, difficulty: 8, partyPerks: ["fetch"] }).difficulty, 7);
  assert.equal(plan(roller("werewolf", { perk: "fetch" }), { wayOut: true, difficulty: 8 }).difficulty, 7);
  assert.equal(plan(roller("dracula"), { wayOut: false, difficulty: 8, partyPerks: ["fetch"] }).difficulty, 8);
});

test("V17 Out of Sight: caught only while you or anyone with you carries loot or furniture; the card says which", () => {
  const inv = roller("invisible");
  const trouble = (p) => resolvePlannedRoll(p, 1, 1);
  // nobody carries: unseen
  const alone = plan(inv, { watched: true });
  assert.equal(trouble(alone).caught, false);
  assert.equal(alone.carryingBy, "");
  // he carries: seen (his own carrying counts by itself, tick or not)
  const own = plan(roller("invisible", { carried: [{ name: "a top hat" }] }), { watched: true });
  assert.equal(trouble(own).caught, true);
  assert.equal(own.carryingBy, "self");
  assert.equal(plan(roller("invisible", { carryingFurniture: true }), { watched: true }).carryingBy, "self");
  // someone with him carries (the dialog's tick): seen
  const withYou = plan(inv, { watched: true, companionCarrying: true });
  assert.equal(trouble(withYou).caught, true);
  assert.equal(withYou.carryingBy, "companion");
  assert.equal(trouble(withYou).unseen, false);
  // a helper at the same place who carries counts the same
  const hedge = { slot: "signature", name: "Hedge Spell", effect: "raise", trait: null, payerId: "witch", payerName: "A Witch", payer: { charges: 3, carrying: true } };
  const helped = plan(inv, { watched: true, abilities: [hedge] });
  assert.equal(trouble(helped).caught, true);
  assert.equal(helped.carryingBy, "helper");
  assert.equal(helped.carryingName, "A Witch");
  assert.equal(plan(inv, { watched: true, abilities: [{ ...hedge, payer: { charges: 3, carrying: false } }] }).carryingBy, "");
  // without Out of Sight the tick changes nothing: Trouble where watched is caught anyway
  const drac = plan(roller("dracula"), { watched: true, companionCarrying: true });
  assert.equal(trouble(drac).caught, true);
  assert.equal(drac.carryingBy, "");
});

test("B7: Mesmerise opens an approach only at a watched obstacle (the way out and the lock-up always are)", () => {
  const drac = roller("dracula");
  const mes = ownAbility(drac, "signature");
  assert.equal(mes.name, "Mesmerise");
  const unwatched = plan(drac, { trait: "sly", abilities: [mes] });
  assert.equal(unwatched.ok, false);
  assert.ok(unwatched.errors.some((e) => e.code === "openNotWatched" && e.name === "Mesmerise"));
  const watched = plan(drac, { trait: "sly", watched: true, abilities: [mes] });
  assert.equal(watched.ok, true);
  assert.equal(watched.trait, "charm");
  assert.equal(watched.difficulty, 6, "2 lower");
  assert.equal(plan(drac, { trait: "sly", wayOut: true, abilities: [mes] }).ok, true, "the way out is always watched");
  assert.equal(plan(drac, { trait: "sly", lockup: "rescue", difficulty: 10, abilities: [mes] }).ok, true, "so is the lock-up");
  const held = roller("dracula", { status: "captured", capturedTurn: 1 });
  assert.equal(plan(held, { trait: "sly", lockup: "slip", turn: 2, difficulty: 10, abilities: [ownAbility(held, "signature")] }).ok, true, "slipping free (U1)");
  // the other approaches of their own don't need a watcher
  const creature = roller("creature");
  assert.equal(plan(creature, { trait: "sly", abilities: [ownAbility(creature, "gift")] }).ok, true, "Mountain Stride");
});

test("Jekyll becomes Hyde when the Monster shows on his roll (Steady Nerves: by 2+), even unseen", () => {
  const jh = roller("jekyll-hyde");
  const p = plan(jh, { trait: "brawn", second: "monster" }); // Jekyll's Brawn d4
  assert.equal(resolvePlannedRoll(p, 3, 4).formShift, true);
  assert.equal(resolvePlannedRoll(p, 4, 4).formShift, false);
  const steady = plan(roller("jekyll-hyde", { perk: "steadyNerves" }), { trait: "brawn", second: "monster" });
  assert.equal(resolvePlannedRoll(steady, 3, 4).formShift, false);
  assert.equal(resolvePlannedRoll(steady, 3, 5).formShift, true);
  // Pillar of Society: no Suspicion, but Hyde still takes over
  const pillar = { slot: "gift", name: "Pillar of Society", effect: "hidden", payerId: "me", payer: { charges: 3 } };
  const hp = plan(roller("jekyll-hyde", { gift: "pillarOfSociety" }), { trait: "brawn", second: "monster", abilities: [pillar] });
  const r = resolvePlannedRoll(hp, 1, 8);
  assert.equal(r.suspicion, 0);
  assert.equal(r.formShift, true);
  // Hyde doesn't change on his own rolls; the Mask never changes anyone
  assert.equal(resolvePlannedRoll(plan(roller("jekyll-hyde", { form: "hyde", traits: diceFor("jekyll-hyde", "hyde") }), { second: "monster" }), 1, 9).formShift, false);
  assert.equal(resolvePlannedRoll(plan(jh, { trait: "brawn" }), 1, 6).formShift, false);
});

test("Costs the Storyteller may pick: never one that costs nothing", () => {
  assert.deepEqual(costOptions({ band: "cost", trait: "sly" }), ["suspicion", "loseTurn", "smaller"]);
  assert.deepEqual(costOptions({ band: "cost", trait: "sly", carriesLoot: true }), DGF.costs);
  assert.deepEqual(costOptions({ band: "cost", trait: "sly", suspicion: 2 }), ["loseTurn", "smaller"]); // already raised
  assert.deepEqual(costOptions({ band: "cost", trait: "sly", hunt: true }), ["loseTurn", "smaller"]);
  assert.deepEqual(costOptions({ band: "cost", trait: "sly", chase: true }), []); // a Cost costs nothing more in a chase
  assert.deepEqual(costOptions({ band: "success", trait: "sly" }), []);
  assert.deepEqual(costOptions({ band: "cost", trait: "charm", perk: "oldMoney" }), ["loseTurn", "smaller"]);
  assert.deepEqual(costOptions({ band: "cost", trait: "sly", perk: "oldMoney" }), ["suspicion", "loseTurn", "smaller"]);
  assert.deepEqual(costOptions({ band: "cost", trait: "sly", perk: "patienceOfAges" }), ["suspicion", "smaller"]);
  assert.deepEqual(costOptions({ band: "cost", trait: "sly", perk: "keeperOfTreasures", carriesLoot: true }), ["suspicion", "loseTurn", "smaller"]);
  assert.deepEqual(costOptions({ band: "cost", trait: "wits", perk: "wiseWoman" }), ["suspicion", "smaller"]);
  assert.deepEqual(costOptions({ band: "cost", trait: "sly", perk: "wiseWoman" }), ["suspicion", "loseTurn", "smaller"]);
});

test("bad input is refused with codes, not exceptions", () => {
  const p = buildRollPlan({ roller: roller("dracula"), trait: "luck", second: "mask", difficulty: "x" });
  assert.equal(p.ok, false);
  assert.deepEqual(p.errors.map((e) => e.code).sort(), ["badDifficulty", "badTrait"]);
});

/* ------------------------------------------- the outside review's rules (DESIGN 2026-10-19, 2026-10-20) -- */

test("D3: an overdraw always adds +2 on top of the roll's other rise (two overdraws +4); in the final flight it costs a step down instead", () => {
  const broke = roller("witch", { charges: { value: 0, start: 3 } });
  const hedge = ownAbility(broke, "signature");
  let p = plan(broke, { abilities: [hedge], second: "monster" });
  assert.equal(p.overdraws, 1);
  let r = resolvePlannedRoll(p, 2, 9); // the Monster shows (+2), and the overdraw on top
  assert.deepEqual([r.suspicion, r.rise, r.overdrawRise, r.riseKeys], [4, 2, 2, ["monster"]]);
  assert.deepEqual(r.triggers.map((x) => [x.key, x.amount, !!x.onTop]), [["monster", 2, false], ["overdraw", 2, true]]);
  r = resolvePlannedRoll(p, 1, 1); // Trouble (+1) and the overdraw
  assert.equal(r.suspicion, 3);
  assert.equal(resolvePlannedRoll(p, 10, 6).suspicion, 2, "nothing else: the overdraw alone");
  // two abilities at no charges: two overdraws
  const gift = { ...ownAbility(broke, "signature"), slot: "gift", name: "Black Cat", effect: "hidden" };
  p = plan(broke, { abilities: [hedge, gift], second: "monster" });
  assert.equal(p.overdraws, 2);
  assert.equal(resolvePlannedRoll(p, 10, 6).suspicion, 4);
  // a helper's overdraw is one of the roll's too
  const me = roller("dracula");
  const helper = { slot: "signature", name: "Hedge Spell", effect: "raise", trait: null, payerId: "witch1", payerName: "Witch", payer: { charges: 0 } };
  assert.equal(resolvePlannedRoll(plan(me, { abilities: [helper], loud: true }), 6, 6).suspicion, 3, "the loud way (+1) and the helper's overdraw");
  // the final flight: no Suspicion, a step down of its own (2026-10-21)
  p = plan(broke, { abilities: [hedge], hunt: true, second: "monster" });
  assert.equal(p.overdraws, 0);
  assert.equal(resolvePlannedRoll(p, 1, 9).suspicion, 0);
  assert.deepEqual(p.stepFromOverdraw, ["me"]);
  // a Cost's Suspicion +1 still adds to a roll whose only rise is its overdraw (the overdraw is on top of the rest)
  const cost = resolvePlannedRoll(plan(broke, { abilities: [hedge] }), 3, 4); // 7 against 8
  assert.equal(cost.band, "cost");
  assert.ok(cost.costs.includes("suspicion"));
  assert.ok(!resolvePlannedRoll(plan(broke, { abilities: [hedge], loud: true }), 3, 4).costs.includes("suspicion"), "the loud way already raised it");
});

test("D1: a local chase roll raises nothing now; its Trouble or Monster (and overdraws) wait for the chase's one rise", () => {
  const broke = roller("witch", { charges: { value: 0, start: 3 } });
  const hedge = ownAbility(broke, "signature");
  const p = plan(broke, { chase: true, chaseTraits: ["sly", "charm"], second: "monster", difficulty: 9, abilities: [hedge], loud: true });
  const r = resolvePlannedRoll(p, 2, 9); // 11 against 9: a Success, the Monster shows
  assert.equal(r.suspicion, 0, "nothing on the track now");
  assert.deepEqual([r.chaseRise, r.chaseRiseKeys, r.chaseOverdraws], [2, ["monster"], 1]);
  assert.ok(!r.triggers.some((x) => x.key === "loud"), "the ground has no loud way");
  const t = resolvePlannedRoll(plan(roller("dracula"), { chase: true, chaseTraits: ["sly", "charm"], difficulty: 9 }), 1, 1);
  assert.deepEqual([t.band, t.suspicion, t.chaseRise, t.chaseRiseKeys, t.caught], ["trouble", 0, 1, ["trouble"], false]);
  // a Monster without Suspicion still cancels the show's rise on that roll
  const wolf = roller("werewolf");
  const good = resolvePlannedRoll(plan(wolf, { chase: true, chaseTraits: ["nimble", "sly"], trait: "nimble", second: "monster", difficulty: 9, abilities: [ownAbility(wolf, "signature")] }), 2, 9);
  assert.deepEqual([good.hiddenShow, good.chaseRise], [true, 0]);
  // Rattle: the Monster showing is +1
  const ghost = roller("ghost", { perk: "rattle" });
  assert.equal(resolvePlannedRoll(plan(ghost, { chase: true, chaseTraits: ["nimble", "sly"], trait: "nimble", second: "monster", difficulty: 9 }), 2, 9).chaseRise, 1);
  // the final flight: nothing at all
  const f = resolvePlannedRoll(plan(roller("dracula"), { chase: true, hunt: true, chaseTraits: ["sly", "charm"], second: "monster", difficulty: 11 }), 1, 9);
  assert.deepEqual([f.suspicion, f.chaseRise], [0, 0]);
});

test("D6b: in the final flight any Signature or Gift (own, or a friend's in the flight) may be spent as a raise instead; still one raise per roll", () => {
  const drac = roller("dracula", { charges: { value: 2, start: 3 } }); // Bat (switch Nimble), Mesmerise (open Charm)
  const bat = { ...ownAbility(drac, "gift"), asRaise: true };
  const flight = (opts) => plan(drac, { chase: true, hunt: true, chaseTraits: ["sly", "charm"], second: "monster", difficulty: 11, ...opts });
  let p = flight({ trait: "charm", abilities: [bat] });
  assert.equal(p.ok, true, p.errors.map((e) => e.code).join());
  assert.equal(p.trait, "charm", "a raise, not Bat's switch to Nimble");
  assert.deepEqual([p.baseDie, p.traitDie, p.raises], [12, 12, 1]);
  p = flight({ trait: "sly", abilities: [bat] });
  assert.deepEqual([p.traitDie, p.payments[0].spend], [8, 1], "Sly d6 → d8, for its charge");
  // an approach of one's own (never in a chase) as a raise
  const mes = { ...ownAbility(drac, "signature"), asRaise: true };
  p = flight({ trait: "sly", abilities: [mes] });
  assert.equal(p.ok, true, p.errors.map((e) => e.code).join());
  assert.equal(p.traitDie, 8);
  assert.ok(flight({ trait: "sly", abilities: [ownAbility(drac, "signature")] }).errors.some((e) => e.code === "openInChase"), "as itself it still can't");
  // a friend's ability in the flight, even its approach of its own (only as a raise)
  const wall = { slot: "signature", name: "Through the Wall", effect: "open", trait: "sly", noLoot: true, payerId: "ghost1", payerName: "A Ghost", payer: { charges: 3 }, asRaise: true };
  p = flight({ trait: "sly", abilities: [wall] });
  assert.equal(p.ok, true, p.errors.map((e) => e.code).join());
  assert.equal(p.traitDie, 8);
  // the Draught: only as a raise, in the flight
  const draught = { slot: "signature", name: "The Draught", effect: "form", trait: null, payerId: "jh", payerName: "Jekyll & Hyde", payer: { charges: 3 } };
  assert.equal(flight({ trait: "sly", abilities: [{ ...draught, asRaise: true }] }).traitDie, 8);
  assert.ok(flight({ trait: "sly", abilities: [draught] }).errors.some((e) => e.code === "draughtNotOnRoll"));
  // still one raise per roll; a raise and a step down cancel
  assert.ok(flight({ trait: "sly", abilities: [bat, mes] }).errors.some((e) => e.code === "tooManyRaises"));
  p = flight({ trait: "charm", abilities: [bat], weakness: true });
  assert.deepEqual([p.raises, p.downs, p.traitDie], [1, 1, 12], "Garlic's step down and the raise cancel out");
  // one ability once: its own effect or a raise, not both
  assert.ok(flight({ trait: "sly", abilities: [ownAbility(drac, "gift"), bat] }).errors.some((e) => e.code === "sameAbilityTwice"));
  // only in a chase (2026-10-21: a local chase too, on your own roll; a friend's helps nobody there)
  assert.ok(plan(drac, { trait: "sly", abilities: [bat] }).errors.some((e) => e.code === "raiseOnlyInChase"));
  const local = (opts) => plan(drac, { chase: true, chaseTraits: ["sly", "charm"], second: "monster", difficulty: 9, ...opts });
  p = local({ trait: "sly", abilities: [bat] });
  assert.equal(p.ok, true, p.errors.map((e) => e.code).join());
  assert.deepEqual([p.trait, p.traitDie], ["sly", 8], "Bat as a raise in a local chase: Sly d6 → d8");
  p = local({ trait: "sly", abilities: [mes] });
  assert.equal(p.ok, true, "an approach of his own, which never works in a chase, as a raise");
  assert.ok(local({ trait: "sly", abilities: [wall] }).errors.some((e) => e.code === "helpInLocalChase"), "a friend's ability helps nobody in a local chase");
  assert.equal(local({ trait: "sly", abilities: [{ ...draught, payerId: "me", asRaise: true }] }).traitDie, 8, "the Draught as a raise");
  assert.ok(local({ trait: "sly", abilities: [bat, mes] }).errors.some((e) => e.code === "tooManyRaises"), "still one raise per roll");
  // at no charges, as a raise it is still an overdraw: in the flight a step down of its own, once per flight
  const broke = roller("dracula", { charges: { value: 0, start: 3 } });
  p = plan(broke, { chase: true, hunt: true, chaseTraits: ["sly", "charm"], second: "monster", difficulty: 11, trait: "sly", abilities: [{ ...ownAbility(broke, "gift"), asRaise: true }] });
  assert.deepEqual(p.stepFromOverdraw, ["me"]);
});

test("Wall-Crawler (2026-10-20): in a chase Dracula's Nimble die is one size bigger, the roll's one raise; a smaller die cancels it", () => {
  assert.equal(DGF.perkRules.wallCrawler.chaseRaise, "nimble");
  const drac = roller("dracula", { perk: "wallCrawler" }); // Nimble d10
  const local = (opts) => plan(drac, { chase: true, chaseTraits: ["sly", "charm", "nimble"], second: "monster", difficulty: 9, ...opts });
  // a local chase: Nimble d10 → d12, no charge, nothing ticked; the card names the Perk
  let p = local({ trait: "nimble" });
  assert.equal(p.ok, true, p.errors.map((e) => e.code).join());
  assert.deepEqual([p.baseDie, p.traitDie, p.raises, p.perkRaise, p.payments.length], [10, 12, 1, "Wall-Crawler", 0]);
  // Garlic (from round 1): bigger and smaller cancel one for one, so his Nimble stays a d10
  p = local({ trait: "nimble", weakness: true });
  assert.deepEqual([p.raises, p.downs, p.traitDie], [1, 1, 10]);
  // and a Cost's smaller die as well: d10 − 2 + 1 = d8
  p = plan(roller("dracula", { perk: "wallCrawler", nextRollSmaller: 1 }), { chase: true, chaseTraits: ["nimble", "sly"], trait: "nimble", difficulty: 9, weakness: true });
  assert.equal(p.traitDie, 8);
  // only on Nimble: another trait in the chase isn't raised
  p = local({ trait: "sly" });
  assert.deepEqual([p.traitDie, p.raises, p.perkRaise], [6, 0, ""]);
  // Bat's switch to Nimble in a chase is raised too (the trait rolled is Nimble)
  p = local({ trait: "charm", chaseTraits: ["sly", "charm"], abilities: [ownAbility(drac, "gift")] });
  assert.deepEqual([p.trait, p.traitDie], ["nimble", 12]);
  // not outside a chase, not with another Perk
  assert.equal(plan(drac, { trait: "nimble" }).traitDie, 10, "at an obstacle: no raise");
  assert.equal(plan(roller("dracula"), { chase: true, chaseTraits: ["nimble", "sly"], trait: "nimble", difficulty: 9 }).traitDie, 10, "Hypnotic Eyes: no raise");
  assert.equal(plan(roller("witch", { perk: "flyByNight" }), { chase: true, chaseTraits: ["sly", "charm", "wits"], trait: "wits", difficulty: 9 }).traitDie, 12, "Fly by Night: a trait, no raise (Wits d12 as it is)");
  assert.equal(plan(roller("witch", { perk: "flyByNight", traits: { ...entitySystem("witch").traits, wits: 8 } }), { chase: true, chaseTraits: ["sly", "charm", "wits"], trait: "wits", difficulty: 9 }).traitDie, 8, "Fly by Night never raises");
  // the final flight too; an ability's raise can't go on top (the roll's one raise), but cancels nothing either
  const flight = (opts) => plan(drac, { chase: true, hunt: true, chaseTraits: ["brawn", "nimble"], second: "monster", difficulty: 11, ...opts });
  p = flight({ trait: "nimble", weakness: true });
  assert.deepEqual([p.ok, p.traitDie, p.perkRaise], [true, 10, "Wall-Crawler"]);
  p = flight({ trait: "nimble", abilities: [{ ...ownAbility(drac, "signature"), asRaise: true }] });
  assert.ok(p.errors.some((e) => e.code === "perkRaiseTaken" && e.perk === "Wall-Crawler" && e.trait === "nimble"), p.errors.map((e) => e.code).join());
  const hedge = { slot: "signature", name: "Hedge Spell", effect: "raise", trait: null, payerId: "witch", payerName: "A Witch", payer: { charges: 3 } };
  assert.ok(flight({ trait: "nimble", abilities: [hedge] }).errors.some((e) => e.code === "perkRaiseTaken"), "a friend's raise neither");
  assert.equal(flight({ trait: "brawn", abilities: [hedge] }).ok, true, "on his Brawn, a raise as usual");
  // the odds the dialog shows follow the d12
  assert.equal(planOdds(local({ trait: "nimble" })).success > planOdds(plan(roller("dracula"), { chase: true, chaseTraits: ["nimble", "sly"], second: "monster", trait: "nimble", difficulty: 9 })).success, true);
});

test("R4: the way out is rolled once a Turn: a second roll that Turn is refused", () => {
  const ww = roller("werewolf");
  assert.ok(plan(ww, { wayOut: true, trait: "nimble", wayOutRolled: true }).errors.some((e) => e.code === "wayOutOncePerTurn"));
  assert.equal(plan(ww, { wayOut: true, trait: "nimble" }).ok, true);
  assert.equal(plan(ww, { trait: "nimble", wayOutRolled: true }).ok, true, "only the way out");
});
