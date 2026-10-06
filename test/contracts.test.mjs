/**
 * module/contracts.mjs is the list of names the parts of the system agree on:
 * every one must be used, every setting registered, every GM operation handled,
 * every card kind rendered and every hook fired. And lang/en.json must have
 * every word the code and templates ask for.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as C from "../module/contracts.mjs";
import { DGF } from "../module/config.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const walk = (dir, ext) => readdirSync(join(ROOT, dir), { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name), ext) : e.name.endsWith(ext) ? [join(dir, e.name)] : []));
const code = Object.fromEntries(walk("module", ".mjs").filter((f) => !f.endsWith("contracts.mjs")).map((f) => [f, readFileSync(join(ROOT, f), "utf8")]));
const allCode = Object.values(code).join("\n");
const templates = Object.fromEntries(walk("templates", ".hbs").map((f) => [f, readFileSync(join(ROOT, f), "utf8")]));
const lang = JSON.parse(readFileSync(join(ROOT, "lang/en.json"), "utf8"));

test("every name in contracts.mjs is used outside it", () => {
  for (const name of ["SYSTEM_ID", "FLAG", "QUERY", "SOCKET"]) assert.match(allCode, new RegExp(`\\b${name}\\b`), `${name} is used`);
  for (const group of ["SETTINGS", "CARD", "OPS", "HOOKS", "ACTOR_TYPES"]) {
    for (const key of Object.keys(C[group])) assert.match(allCode, new RegExp(`\\b${group}\\.${key}\\b`), `${group}.${key} is used`);
  }
});

test("every hook in HOOKS is fired, every OPS operation registered, every CARD kind has a template", async () => {
  for (const key of Object.keys(C.HOOKS)) assert.match(allCode, new RegExp(`Hooks\\.callAll\\(HOOKS\\.${key}\\b`), `HOOKS.${key} is fired`);
  for (const key of Object.keys(C.OPS)) assert.match(allCode, new RegExp(`registerOp\\(OPS\\.${key},`), `OPS.${key} is registered`);
  for (const kind of Object.values(C.CARD)) assert.ok(templates[join("templates", "chat", `${kind}-card.hbs`)], `card kind ${kind} has a template`);
  // and at run time, on the fake Foundry
  const { installFoundry, log } = await import("../tools/fake-foundry.mjs");
  const { game, Hooks } = installFoundry({ users: [{ id: "gmUser0000000000", name: "GM", isGM: true }] });
  await import("../module/dont-get-forked.mjs");
  Hooks.callAll("init");
  const { registeredOps } = await import("../module/net/gm-ops.mjs");
  const { CARD_KINDS } = await import("../module/chat/cards.mjs");
  assert.deepEqual(registeredOps().sort(), Object.values(C.OPS).sort());
  assert.deepEqual([...CARD_KINDS].sort(), Object.values(C.CARD).sort());
  for (const key of Object.values(C.SETTINGS)) assert.ok(game.settings.settings.has(`${C.SYSTEM_ID}.${key}`), `setting ${key} registered`);
  assert.equal(typeof globalThis.CONFIG.queries[C.QUERY], "function");
  assert.ok(globalThis.CONFIG.Actor.dataModels[C.ACTOR_TYPES.entity]);
  assert.deepEqual(log.errors, []);
});

test("system.json declares the Actor type the system registers", () => {
  const manifest = JSON.parse(readFileSync(join(ROOT, "system.json"), "utf8"));
  assert.deepEqual(Object.keys(manifest.documentTypes?.Actor ?? {}), Object.values(C.ACTOR_TYPES));
  assert.ok(lang[`TYPES.Actor.${C.ACTOR_TYPES.entity}`]);
});

test("lang/en.json has every literal key the code and templates use, and no key shadows another", () => {
  const used = new Set();
  for (const src of Object.values(code)) for (const m of src.matchAll(/["'`](DGF\.[A-Za-z0-9_.]+?)["'`]/g)) used.add(m[1]);
  for (const src of Object.values(templates)) for (const m of src.matchAll(/localize\s+"([^"]+)"/g)) used.add(m[1]);
  const missing = [...used].filter((k) => !(k in lang));
  assert.deepEqual(missing, []);
  // Foundry expands dotted keys: "A.B" and "A.B.C" can't both exist
  const keys = Object.keys(lang);
  const shadow = keys.filter((k) => keys.some((o) => o !== k && o.startsWith(`${k}.`)));
  assert.deepEqual(shadow, []);
});

test("lang/en.json has the words for every key the code builds from game data", () => {
  const need = [
    ...DGF.traits.map((k) => `DGF.Trait.${k}`),
    ...Object.keys(DGF.second).map((k) => `DGF.Second.${k}`),
    ...["success", "cost", "trouble"].map((k) => `DGF.Band.${k}`),
    ...DGF.effects.map((k) => `DGF.Effect.${k}`),
    ...DGF.costs.map((k) => `DGF.Cost.${k}`),
    ...DGF.statuses.map((k) => `DGF.Status.${k}`),
    ...DGF.weaknessTimings.map((k) => `DGF.Timing.${k}`),
    ...Object.keys(DGF.labels).map((k) => `DGF.Label.${k}`),
    ...Object.keys(DGF.difficulty).map((k) => `DGF.Ladder.${k}`),
    ...Object.keys(DGF.entities.find((e) => e.forms).forms).map((k) => `DGF.Form.${k}`),
    ...["trouble", "monster", "loud", "overdraw", "cost"].map((k) => `DGF.Trigger.${k}`),
    ...["limit", "dawn", "manual"].map((k) => `DGF.HuntCause.${k}`),
    ...["newRaid", "hunt", "dawn", "limit"].flatMap((k) => [`DGF.RaidCard.${k}.title`, `DGF.RaidCard.${k}.text`]),
    ...["cost", "carrying", "weakness"].map((k) => `DGF.Card.smaller.${k}`),
    ...["shortcut", "open"].map((k) => `DGF.Card.diff.${k}`),
    ...Object.values(C.SETTINGS).filter((k) => !["systemMigrationVersion", "raidState"].includes(k)).flatMap((k) => [`DGF.Settings.${k}.Name`, `DGF.Settings.${k}.Hint`]),
  ];
  // every error or warning code the roll plan can produce
  const plan = readFileSync(join(ROOT, "module/logic/roll-plan.mjs"), "utf8");
  for (const m of plan.matchAll(/code: "(\w+)"/g)) need.push(`DGF.Plan.${m[1]}`);
  assert.deepEqual(need.filter((k) => !(k in lang)), []);
});

test("nothing in the system names the assistant or its maker", () => {
  const files = [...walk("module", ".mjs"), ...walk("templates", ".hbs"), ...walk("styles", ".css"), "lang/en.json", "system.json", ...walk("test", ".mjs"), "tools/fake-foundry.mjs"];
  const banned = new RegExp(["Clau" + "de", "Anthro" + "pic", "\\bA\\.?I\\.?\\b", "language mod" + "el"].join("|"));
  for (const f of files) assert.doesNotMatch(readFileSync(join(ROOT, f), "utf8"), banned, f);
});
