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
  const mesmerise = ownAbility(drac, "signature"); // open with Charm
  p = plan(drac, { abilities: [mesmerise], difficulty: 10 });
  assert.equal(p.trait, "charm");
  assert.equal(p.difficulty, 8);
  assert.equal(p.open, true);
  assert.deepEqual(plan(drac, { abilities: [mesmerise, bat] }).errors.map((e) => e.code), ["twoTraits"]);
  assert.ok(plan(drac, { abilities: [mesmerise], chase: true }).errors.some((e) => e.code === "openInChase"));

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
  const helper = { slot: "signature", name: "Hedge Spell", effect: "raise", trait: null, payerId: "witch1", payerName: "Witch", payer: { charges: 0, weaknessInPlay: false } };
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

test("overdraw: Suspicion +2, or once the hunt is on the Weakness (and never while it is in play)", () => {
  const broke = roller("witch", { charges: { value: 0, start: 3 } });
  let p = plan(broke, { abilities: [ownAbility(broke, "signature")] });
  assert.equal(p.overdraw, true);
  assert.equal(resolvePlannedRoll(p, 10, 6).suspicion, 2);
  p = plan(broke, { abilities: [ownAbility(broke, "signature")], hunt: true, second: "monster" });
  assert.equal(p.overdraw, false);
  assert.deepEqual(p.weaknessFromOverdraw, ["me"]);
  assert.equal(resolvePlannedRoll(p, 1, 1).suspicion, 0); // Suspicion stops once the hunt is on
  const weak = roller("witch", { charges: { value: 0, start: 3 }, weaknessInPlay: true });
  assert.ok(plan(weak, { abilities: [ownAbility(weak, "signature")], hunt: true }).errors.some((e) => e.code === "overdrawWeakness"));
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
  assert.equal(resolvePlannedRoll(plan(roller("invisible", { carried: [{ name: "a top hat" }] }), { watched: true }), 1, 1).caught, true);
  assert.equal(resolvePlannedRoll(plan(drac, { watched: true }), 1, 1).caught, true);
  assert.equal(resolvePlannedRoll(plan(drac, { watched: false }), 1, 1).caught, false);
  // Shortcut: the way out is 2 easier; the way out is always watched
  const way = plan(roller("werewolf", { perk: "shortcut" }), { wayOut: true, difficulty: 8 });
  assert.equal(way.difficulty, 6);
  assert.equal(way.watched, true);
  assert.equal(plan(roller("werewolf"), { wayOut: true, difficulty: 8 }).difficulty, 8);
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
