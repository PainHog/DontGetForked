/**
 * Integration smoke test — setting up the one-shot (module/apps/demo-import.mjs), on the fake Foundry with the system's
 * compendium packs (tools/fake-foundry.mjs, installFoundry({ packs: true })): a GM opening a world without Lantern Night
 * in Hallowby is asked once; "Set it up" brings the four Demo compendiums in (journal first, then scenes, Entities and
 * the macro), each in a folder named after its pack and keeping every id, so the map pins still open the script's pages;
 * the settings menu runs it again, keeping or replacing what is there and never doubling it; "Not now", "Don't ask
 * again", the prompt's switch, a world that already has it, and GM only.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { installFoundry, asUser, settle, dialogResponders, log } from "../tools/fake-foundry.mjs";
import { DEMO_PACKS, packPlan, shouldOffer, importTotals, demoPackIds } from "../module/logic/demo.mjs";

const { game } = installFoundry({
  users: [
    { id: "gmUser0000000000", name: "Storyteller", isGM: true },
    { id: "annUser000000000", name: "Ann" },
  ],
  packs: true,
});
await game._packsLoading;
const GM = game.users.get("gmUser0000000000");
const ANN = game.users.get("annUser000000000");

await import("../module/dont-get-forked.mjs");
const { SYSTEM_ID, SETTINGS, MENUS } = await import("../module/contracts.mjs");
const { DemoImportMenu } = await import("../module/apps/demo-import.mjs");
Hooks.callAll("init");

const api = () => game.dontGetForked;
const setting = (k) => game.settings.get(SYSTEM_ID, SETTINGS[k]);
const setSetting = (k, v) => asUser(GM, () => game.settings.set(SYSTEM_ID, SETTINGS[k], v));
const pack = (name) => game.packs.get(`${SYSTEM_ID}.${name}`);
const ids = (name) => [...pack(name).index.keys()];
const world = (name) => game.collections.get(pack(name).documentName);
const counts = () => DEMO_PACKS.map((n) => world(n).filter((d) => ids(n).includes(d.id)).length);
const WANT = DEMO_PACKS.map((n) => ids(n).length);
/** A scripted dialog answer: record what it asked, press `action`. */
const answer = (action, seen = []) => (options) => { seen.push({ title: options.window?.title, buttons: options.buttons.map((b) => b.action), content: options.content }); return action; };

test("the pure plan: import all, keep or replace what's there; when to ask", () => {
  assert.deepEqual(DEMO_PACKS, ["demo-journal", "demo-scenes", "demo-entities", "demo-macros"], "the journal first: the scenes' pins open its pages");
  assert.deepEqual(demoPackIds("dont-get-forked")[0], "dont-get-forked.demo-journal");
  assert.deepEqual(packPlan(["a", "b"], []), { importAll: true, create: ["a", "b"], replace: [], skip: [] });
  assert.deepEqual(packPlan(["a", "b"], ["a"]), { importAll: false, create: ["b"], replace: [], skip: ["a"] });
  assert.deepEqual(packPlan(["a", "b"], ["a"], "replace"), { importAll: true, create: ["b"], replace: ["a"], skip: [] });
  assert.throws(() => packPlan(["a"], [], "twice"), /unknown import mode/);
  assert.deepEqual(importTotals([packPlan(["a", "b"], ["a"]), packPlan(["c"], ["c"], "replace")]), { created: 1, replaced: 1, skipped: 1 });
  const ask = { isGM: true, promptOn: true, imported: "", packsFound: 4, alreadyHere: false };
  assert.equal(shouldOffer(ask), true);
  for (const change of [{ isGM: false }, { promptOn: false }, { imported: "0.2.0" }, { packsFound: 3 }, { alreadyHere: true }]) assert.equal(shouldOffer({ ...ask, ...change }), false, JSON.stringify(change));
});

test("the system's packs are the four Demo packs of system.json, and the switches are registered", () => {
  const manifest = game.packs;
  for (const name of DEMO_PACKS) assert.ok(manifest.get(`${SYSTEM_ID}.${name}`), name);
  assert.deepEqual(DEMO_PACKS.map((n) => pack(n).documentName), ["JournalEntry", "Scene", "Actor", "Macro"]);
  assert.equal(setting("demoPrompt"), true);
  assert.equal(setting("demoImported"), "");
  const menu = game.settings.menus.get(`${SYSTEM_ID}.${MENUS.demoImport}`);
  assert.equal(menu.type, DemoImportMenu);
  assert.equal(menu.restricted, true, "the menu is the Storyteller's");
  assert.equal(menu.label, "DGF.Settings.demoImport.Label");
});

test("a GM opening the world is asked once; Set it up imports the four packs in order, in folders named after them, keeping every id", async () => {
  const order = [];
  for (const name of ["createJournalEntry", "createScene", "createActor", "createMacro"]) Hooks.on(name, (doc) => { if (game.user?.id === GM.id) order.push(doc.documentName); });
  const seen = [];
  dialogResponders.push(answer("import", seen));
  Hooks.callAll("ready");
  await settle();
  assert.equal(seen.length, 1, "asked once");
  assert.equal(seen[0].title, "Set up Lantern Night in Hallowby?");
  assert.deepEqual(seen[0].buttons, ["import", "later", "never"]);
  assert.match(seen[0].content, /each in a folder named after its compendium/);
  assert.deepEqual(counts(), WANT, "everything is in the world");
  assert.deepEqual([...new Set(order)], ["JournalEntry", "Scene", "Actor", "Macro"], "the journal first, then the scenes, the Entities, the macro");
  for (const name of DEMO_PACKS) {
    const folder = game.folders.find((f) => f.name === pack(name).title && f.type === pack(name).documentName);
    assert.ok(folder, `a folder named after ${name}`);
    assert.ok(world(name).filter((d) => ids(name).includes(d.id)).every((d) => d.folder === folder.id), `${name}: in its folder`);
  }
  // the map pins open the script's pages: every note's entry and page are in the world, at the same ids
  const pages = new Map(game.journal.flatMap((j) => (j.pages ?? []).map((p) => [p._id, j.id])));
  const notes = game.scenes.flatMap((s) => s.notes ?? []);
  assert.ok(notes.length > 0);
  for (const n of notes) assert.equal(pages.get(n.pageId), n.entryId, `pin ${n._id} opens its page`);
  assert.equal(setting("demoImported"), game.system.version || "imported");
  assert.ok(log.infos.some((m) => /Lantern Night in Hallowby is set up: 13 added, 0 replaced, 0 already here/.test(m)));
  // the next time the world opens: not asked again
  assert.equal(await asUser(GM, () => api().demo.offer()), null);
  assert.deepEqual(log.errors, []);
});

test("the settings menu runs it again: keep what's there (only the missing come back), or replace it; never a second copy", async () => {
  const before = log.infos.length;
  dialogResponders.push(answer("skip"));
  await asUser(GM, () => new DemoImportMenu().render(true));
  await settle();
  assert.deepEqual(counts(), WANT, "nothing doubled");
  assert.equal(game.folders.length, 4, "the folders are reused");
  assert.ok(log.infos.slice(before).some((m) => /0 added, 0 replaced, 13 already here/.test(m)));
  // one Entity and the script go missing: keeping the rest brings back just those, at their ids
  const lost = [ids("demo-entities")[2], ids("demo-journal")[0]];
  await asUser(GM, () => game.actors.get(lost[0]).delete());
  await asUser(GM, () => game.journal.get(lost[1]).delete());
  dialogResponders.push(answer("skip"));
  await asUser(GM, () => api().demo.dialog());
  await settle();
  assert.deepEqual(counts(), WANT);
  assert.ok(game.actors.get(lost[0]) && game.journal.get(lost[1]), "back at the same ids");
  assert.equal(game.folders.length, 4);
  // replace: fresh copies, the same ids
  const drac = game.actors.get(ids("demo-entities")[0]);
  await asUser(GM, () => drac.update({ name: "Count Renamed" }));
  dialogResponders.push(answer("replace"));
  await asUser(GM, () => api().demo.dialog());
  await settle();
  assert.deepEqual(counts(), WANT);
  assert.notEqual(game.actors.get(ids("demo-entities")[0]).name, "Count Renamed", "a fresh copy");
  assert.ok(log.infos.some((m) => /0 added, 13 replaced, 0 already here/.test(m)));
  // Cancel does nothing
  dialogResponders.push(answer("cancel"));
  assert.equal(await asUser(GM, () => api().demo.dialog()), null);
  assert.deepEqual(log.errors, []);
});

test("GM only: a player can't import it, isn't asked, and the menu tells it so", async () => {
  assert.deepEqual(await asUser(ANN, () => api().demo.import()), { ok: false, reason: "gmOnly" });
  assert.equal(await asUser(ANN, () => api().demo.offer()), null);
  const before = log.warnings.length;
  await asUser(ANN, () => api().demo.dialog());
  assert.ok(log.warnings.slice(before).some((w) => /Only the Storyteller can set up the one-shot/.test(w)));
});

test("Not now asks again next time; Don't ask again turns the prompt off; a world that has it all already counts as set up", async () => {
  // a world that already holds every Demo document (imported by hand): not asked, and marked set up
  await setSetting("demoImported", "");
  assert.equal(await asUser(GM, () => api().demo.offer()), null);
  assert.equal(setting("demoImported"), game.system.version || "imported");
  // a world without it
  for (const name of DEMO_PACKS) for (const id of ids(name)) await asUser(GM, () => world(name).get(id)?.delete());
  await setSetting("demoImported", "");
  dialogResponders.push(answer("later"));
  assert.equal(await asUser(GM, () => api().demo.offer()), "later");
  assert.deepEqual(counts(), [0, 0, 0, 0], "nothing imported");
  assert.equal(setting("demoPrompt"), true, "asked again next time");
  dialogResponders.push(answer("never"));
  assert.equal(await asUser(GM, () => api().demo.offer()), "never");
  assert.equal(setting("demoPrompt"), false);
  assert.ok(log.infos.some((m) => /won.t be offered again/.test(m)));
  assert.equal(await asUser(GM, () => api().demo.offer()), null, "not asked any more");
  // the switch on again: asked again
  await setSetting("demoPrompt", true);
  dialogResponders.push(answer("later"));
  assert.equal(await asUser(GM, () => api().demo.offer()), "later");
});

test("the session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
});
