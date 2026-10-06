/**
 * module/logic/entity.mjs against rulebook Chapter 2 (and Chapter 3's charges).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { DGF } from "../module/config.mjs";
import {
  ENTITY_KEYS, findEntity, entitySystem, rollAbilities, entityView, formsOf, diceFor, otherForm, payFor, draughtPlan, partyClashes,
} from "../module/logic/entity.mjs";

test("eight Entities, each with one each of d12, d10, d8, d6 and d4 (in every form)", () => {
  assert.equal(ENTITY_KEYS.length, 8);
  for (const e of DGF.entities) {
    const arrangements = e.forms ? Object.values(e.forms) : [e.dice];
    for (const dice of arrangements) assert.deepEqual(Object.values(dice).sort((a, b) => a - b), [4, 6, 8, 10, 12], e.key);
  }
});

test("a premade Entity starts with the book's defaults and 3 charges", () => {
  const d = entitySystem("dracula");
  assert.deepEqual(d.traits, { brawn: 8, nimble: 10, sly: 6, charm: 12, wits: 4 });
  assert.deepEqual(d.charges, { value: 3, start: 3 });
  assert.equal(d.gift, "bat");
  assert.equal(d.perk, "hypnoticEyes");
  assert.equal(d.duty, "butler");
  assert.equal(d.status, "active");
  assert.equal(d.form, "");
  assert.deepEqual(d.carried, []);
  // every Entity: the marked default of each pick
  for (const e of DGF.entities) {
    const s = entitySystem(e.key);
    assert.equal(s.gift, e.gift.versions.find((v) => v.default).key, e.key);
    assert.equal(s.perk, e.perks.find((p) => p.default).key, e.key);
    assert.equal(s.duty, e.duty, e.key);
  }
  // C16 campaign: an upgrade is one extra charge
  assert.deepEqual(entitySystem("ghost", { upgrades: 1 }).charges, { value: 4, start: 4 });
  assert.throws(() => entitySystem("vampire-bat"));
});

test("Jekyll & Hyde starts as Jekyll; the Draught swaps the arrangement", () => {
  const s = entitySystem("jekyll-hyde");
  assert.equal(s.form, "jekyll");
  assert.deepEqual(s.traits, { brawn: 4, nimble: 6, sly: 8, charm: 12, wits: 10 });
  assert.deepEqual(formsOf("jekyll-hyde"), ["jekyll", "hyde"]);
  assert.deepEqual(diceFor("jekyll-hyde", "hyde"), { brawn: 12, nimble: 10, sly: 8, charm: 4, wits: 6 });
  assert.equal(otherForm("jekyll-hyde", "jekyll"), "hyde");
  assert.equal(otherForm("jekyll-hyde", "hyde"), "jekyll");
  assert.equal(otherForm("dracula", ""), null);

  const toHyde = draughtPlan(s);
  assert.equal(toHyde.to, "hyde");
  assert.equal(toHyde.cost, 1);
  assert.equal(toHyde.spend, 1);
  // Practised Hand (the default Perk): changing back to Jekyll costs no charge
  const back = draughtPlan({ ...s, form: "hyde", traits: diceFor("jekyll-hyde", "hyde") });
  assert.equal(back.to, "jekyll");
  assert.equal(back.cost, 0);
  assert.equal(back.spend, 0);
  assert.equal(back.overdraw, 0);
  // without it, back costs a charge too
  assert.equal(draughtPlan({ ...s, form: "hyde", perk: "steadyNerves" }).cost, 1);
  assert.equal(draughtPlan(entitySystem("mummy")), null);
});

test("roll abilities: the signature and the chosen Gift, as standard effects", () => {
  assert.deepEqual(rollAbilities(entitySystem("dracula")).map((a) => [a.slot, a.effect, a.trait]), [["signature", "open", "charm"], ["gift", "switch", "nimble"]]);
  assert.deepEqual(rollAbilities({ ...entitySystem("dracula"), gift: "mist" }).map((a) => a.effect), ["open", "hidden"]);
  // The Draught changes form, so Jekyll & Hyde brings only its Gift to a roll
  assert.deepEqual(rollAbilities(entitySystem("jekyll-hyde")).map((a) => a.name), ["Doctor’s Bag"]);
  // Through the Wall can't carry anything through
  assert.equal(rollAbilities(entitySystem("ghost"))[0].noLoot, true);
  assert.deepEqual(rollAbilities({ entityKey: "nobody" }), []);
});

test("the sheet view resolves picks, Weakness, Tell and the signature text", () => {
  const v = entityView({ ...entitySystem("werewolf"), perk: "fetch" });
  assert.equal(v.name, "The Werewolf");
  assert.equal(v.signature.name, "Good Dog");
  assert.match(v.signature.text, /very large dog/);
  assert.equal(v.gift.key, "keenNose");
  assert.equal(v.perk.key, "fetch");
  assert.equal(v.duty.key, "gardener");
  assert.deepEqual(v.weakness, { name: "Hounds", timing: "soon", text: "Someone lets the hunting dogs out." });
  assert.equal(v.tell.name, "Eyebrows That Meet");
  assert.equal(entityView({ ...entitySystem("witch"), perk: "nonsense" }).perk.fallback, true);
  assert.equal(entityView({ entityKey: "" }), null);
  for (const e of DGF.entities) assert.ok(e.signature.text?.length > 10, `${e.key} has its signature text`);
});

test("perk keys are unique across the eight (DGF.perkRules is keyed by them)", () => {
  const keys = DGF.entities.flatMap((e) => e.perks.map((p) => p.key));
  assert.equal(new Set(keys).size, keys.length);
  for (const k of Object.keys(DGF.perkRules)) assert.ok(keys.includes(k), `perkRules.${k} is a real Perk`);
});

test("charges and overdraw (Chapter 3, Chapter 6)", () => {
  assert.deepEqual(payFor({ charges: 2, uses: 1 }), { spend: 1, overdraw: 0, suspicion: 0, weakness: false, allowed: true });
  assert.deepEqual(payFor({ charges: 1, uses: 2 }), { spend: 1, overdraw: 1, suspicion: 2, weakness: false, allowed: true });
  assert.deepEqual(payFor({ charges: 0, uses: 1, hunt: true }), { spend: 0, overdraw: 1, suspicion: 0, weakness: true, allowed: true });
  assert.equal(payFor({ charges: 0, uses: 1, hunt: true, weaknessInPlay: true }).allowed, false);
  assert.deepEqual(payFor({ charges: 0, uses: 1, cost: 0 }), { spend: 0, overdraw: 0, suspicion: 0, weakness: false, allowed: true });
});

test("party clashes: duplicate Entities and shared Castle Duties", () => {
  const party = [
    { id: "a", entityKey: "dracula", duty: "butler" },
    { id: "b", entityKey: "ghost", duty: "butler" },
    { id: "c", entityKey: "dracula", duty: "cook" },
  ];
  assert.deepEqual(partyClashes(party), { entity: ["c"], duty: ["b"] });
  assert.ok(findEntity("witch"));
});
