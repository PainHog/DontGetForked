/**
 * Integration smoke test — setting up the ready-made games (module/apps/demo-import.mjs), on the fake Foundry with the
 * system's compendium packs (tools/fake-foundry.mjs, installFoundry({ packs: true })): a GM opening a world without
 * any of them is asked once, with a tick for each game (Lantern Night in Hallowby ticked); "Set it up" brings the
 * ticked ones in (the one-shot's four Demo compendiums: journal first, then scenes, Entities and the macro), each in a
 * folder named after its pack or its town and keeping every id, so the map pins still open the journal's pages; the
 * settings menu sets any of them up again, keeping or replacing what is there and never doubling it; a town brings its
 * journal entry, scene and macro into folders named after it and shares the Demo's Entities; "Not now", "Don't ask
 * again", the prompt's switch, a world that already has a game, and GM only.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { installFoundry, asUser, settle, dialogResponders, fakeForm, log } from "../tools/fake-foundry.mjs";
import {
  DEMO_PACKS, SETUPS, SETUP_KEYS, SETUP_PACKS, TOWNS, DEFAULT_CHOICE, packPlan, toCreate, shouldOffer, importTotals, demoPackIds,
  availableSetups, setupSteps, stepIds, setupHere, menuChoice,
} from "../module/logic/demo.mjs";

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
const { SYSTEM_ID, SETTINGS, MENUS, FLAG } = await import("../module/contracts.mjs");
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
/** A town's documents in a pack (by its flag), and those of them in the world. */
const townIds = (name, key) => pack(name)._docs.filter((d) => d.flags?.[FLAG]?.setup === key).map((d) => d._id);
const townHere = (name, key) => townIds(name, key).filter((id) => world(name).get(id));
/** A scripted dialog answer: record what it asked, press `action` with the form's ticks (`values`). */
const press = (action, values = null, seen = []) => (options) => {
  seen.push({ title: options.window?.title, buttons: options.buttons.map((b) => b.action), content: options.content });
  const b = options.buttons.find((x) => x.action === action);
  return values && b?.callback ? b.callback({}, { form: fakeForm(values) }, null) : action;
};
const tick = (...keys) => Object.fromEntries(keys.map((k) => [`setup.${k}`, true]));
const folderOf = (doc) => game.folders.get(doc.folder);

test("the pure plan: the games' parts, import all, keep or replace what's there; when to ask", () => {
  assert.deepEqual(DEMO_PACKS, ["demo-journal", "demo-scenes", "demo-entities", "demo-macros"], "the journal first: the scenes' pins open its pages");
  assert.deepEqual(demoPackIds("dont-get-forked")[0], "dont-get-forked.demo-journal");
  assert.deepEqual(SETUP_KEYS, ["hallowby", "puddlecombe", "thistlewick", "gallowsmere"]);
  assert.deepEqual(SETUP_PACKS, [...DEMO_PACKS, "journal", "town-scenes", "town-macros"]);
  assert.deepEqual(DEFAULT_CHOICE, ["hallowby", "puddlecombe", "thistlewick", "gallowsmere"], "every ready-made game is ticked to start with (Richard, 2026-10-27)");
  assert.deepEqual(packPlan(["a", "b"], []), { importAll: true, create: ["a", "b"], replace: [], skip: [] });
  assert.deepEqual(packPlan(["a", "b"], ["a"]), { importAll: false, create: ["b"], replace: [], skip: ["a"] });
  assert.deepEqual(packPlan(["a", "b"], ["a"], "replace"), { importAll: true, create: ["b"], replace: ["a"], skip: [] });
  assert.deepEqual(toCreate(packPlan(["a", "b"], ["a"], "replace"), ["a", "b"]), ["a", "b"], "replacing brings them all back");
  assert.deepEqual(toCreate(packPlan(["a", "b"], ["a"]), ["a", "b"]), ["b"]);
  assert.throws(() => packPlan(["a"], [], "twice"), /unknown import mode/);
  assert.deepEqual(importTotals([packPlan(["a", "b"], ["a"]), packPlan(["c"], ["c"], "replace")]), { created: 1, replaced: 1, skipped: 1 });
  // a town: its own documents from the shared packs, the Demo's Entities, folders named after it; the journal first
  assert.deepEqual(setupSteps(["puddlecombe"]), [
    { pack: "journal", setup: "puddlecombe", only: true, folder: "Puddlecombe" },
    { pack: "town-scenes", setup: "puddlecombe", only: true, folder: "Puddlecombe" },
    { pack: "demo-entities", setup: "puddlecombe", only: false, folder: null },
    { pack: "town-macros", setup: "puddlecombe", only: true, folder: "Puddlecombe" },
  ]);
  // several games: in SETUPS order, the shared Entities once
  const steps = setupSteps(["gallowsmere", "hallowby", "nowhere"]);
  assert.deepEqual(steps.map((s) => `${s.pack}${s.only ? `#${s.setup}` : ""}`), ["demo-journal", "demo-scenes", "demo-entities", "demo-macros", "journal#gallowsmere", "town-scenes#gallowsmere", "town-macros#gallowsmere"]);
  const index = [{ _id: "a", flags: { [FLAG]: { setup: "thistlewick" } } }, { _id: "b", flags: {} }, { _id: "c", flags: { [FLAG]: { setup: "gallowsmere" } } }];
  assert.deepEqual(stepIds({ only: true, setup: "thistlewick" }, index), ["a"]);
  assert.deepEqual(stepIds({ only: false, setup: "thistlewick" }, index), ["a", "b", "c"]);
  assert.deepEqual(availableSetups(DEMO_PACKS), ["hallowby"]);
  assert.deepEqual(availableSetups(SETUP_PACKS), SETUP_KEYS);
  assert.deepEqual(availableSetups(["journal", "town-scenes", "town-macros"]), [], "a town needs the Demo's Entities");
  assert.equal(setupHere([[2, 2], [8, 8]]), true);
  assert.equal(setupHere([[2, 2], [8, 7]]), false);
  assert.equal(setupHere([]), false);
  assert.deepEqual(menuChoice(["hallowby"]), ["puddlecombe", "thistlewick", "gallowsmere"]);
  const ask = { isGM: true, promptOn: true, imported: "", available: 4, alreadyHere: false };
  assert.equal(shouldOffer(ask), true);
  for (const change of [{ isGM: false }, { promptOn: false }, { imported: "0.2.0" }, { available: 0 }, { alreadyHere: true }]) assert.equal(shouldOffer({ ...ask, ...change }), false, JSON.stringify(change));
  // the towns are the book's (book/src/towns.json is checked against them in test/towns-foundry.test.mjs)
  assert.deepEqual(TOWNS.map((t) => t.key), SETUPS.filter((s) => s.town).map((s) => s.key));
});

test("the system's packs hold every game's documents, and the switches are registered", () => {
  for (const name of SETUP_PACKS) assert.ok(pack(name), name);
  assert.deepEqual(DEMO_PACKS.map((n) => pack(n).documentName), ["JournalEntry", "Scene", "Actor", "Macro"]);
  for (const t of TOWNS) for (const name of ["journal", "town-scenes", "town-macros"]) assert.equal(townIds(name, t.key).length, 1, `${t.key} in ${name}`);
  assert.equal(setting("demoPrompt"), true);
  assert.equal(setting("demoImported"), "");
  const menu = game.settings.menus.get(`${SYSTEM_ID}.${MENUS.demoImport}`);
  assert.equal(menu.type, DemoImportMenu);
  assert.equal(menu.restricted, true, "the menu is the Storyteller's");
  assert.equal(menu.label, "DGF.Settings.demoImport.Label");
});

test("a GM opening the world is asked once, with a tick for each game; Set it up brings the one-shot in, in order, in folders named after its packs, keeping every id", async () => {
  const order = [];
  for (const name of ["createJournalEntry", "createScene", "createActor", "createMacro"]) Hooks.on(name, (doc) => { if (game.user?.id === GM.id) order.push(doc.documentName); });
  const seen = [];
  dialogResponders.push(press("import", tick("hallowby"), seen));
  Hooks.callAll("ready");
  await settle();
  assert.equal(seen.length, 1, "asked once");
  assert.equal(seen[0].title, "Set up a ready-made game?");
  assert.deepEqual(seen[0].buttons, ["import", "later", "never"]);
  assert.match(seen[0].content, /in its own folders/);
  assert.match(seen[0].content, /name="setup\.hallowby" checked> <strong>Lantern Night in Hallowby<\/strong> \(Easy\)/, "the one-shot ticked");
  for (const [key, label] of [["puddlecombe", "Easy"], ["thistlewick", "Standard"], ["gallowsmere", "Hard"]]) {
    assert.match(seen[0].content, new RegExp(`name="setup\\.${key}" checked> <strong>${TOWNS.find((t) => t.key === key).name}</strong> \\(${label}\\): a town from Chapter 9`), `${key}: offered and ticked`);
  }
  assert.deepEqual(counts(), WANT, "everything is in the world");
  assert.deepEqual([...new Set(order)], ["JournalEntry", "Scene", "Actor", "Macro"], "the journal first, then the scenes, the Entities, the macro");
  for (const name of DEMO_PACKS) {
    const folder = game.folders.find((f) => f.name === pack(name).title && f.type === pack(name).documentName);
    assert.ok(folder, `a folder named after ${name}`);
    assert.ok(world(name).filter((d) => ids(name).includes(d.id)).every((d) => d.folder === folder.id), `${name}: in its folder`);
  }
  for (const t of TOWNS) assert.deepEqual(townHere("town-scenes", t.key), [], `${t.key}: unticked here, so not set up`);
  // the map pins open the script's pages: every note's entry and page are in the world, at the same ids
  const pages = new Map(game.journal.flatMap((j) => (j.pages ?? []).map((p) => [p._id, j.id])));
  const notes = game.scenes.flatMap((s) => s.notes ?? []);
  assert.ok(notes.length > 0);
  for (const n of notes) assert.equal(pages.get(n.pageId), n.entryId, `pin ${n._id} opens its page`);
  assert.equal(setting("demoImported"), game.system.version || "imported");
  assert.ok(log.infos.some((m) => /Set up Lantern Night in Hallowby: 13 added, 0 replaced, 0 already here/.test(m)));
  // the next time the world opens: not asked again
  assert.equal(await asUser(GM, () => api().demo.offer()), null);
  assert.deepEqual(log.errors, []);
});

test("the settings menu sets it up again: keep what's there (only the missing come back), or replace it; never a second copy", async () => {
  const before = log.infos.length;
  const seen = [];
  dialogResponders.push(press("skip", tick("hallowby"), seen));
  await asUser(GM, () => new DemoImportMenu().render(true));
  await settle();
  // the menu ticks what isn't here yet, and marks what is
  assert.equal(seen[0].title, "Set up a ready-made game");
  assert.deepEqual(seen[0].buttons, ["skip", "replace", "cancel"]);
  assert.match(seen[0].content, /name="setup\.hallowby"> <strong>Lantern Night in Hallowby<\/strong>[^<]*<em>\(already in this world\)<\/em>/);
  for (const t of TOWNS) assert.match(seen[0].content, new RegExp(`name="setup\\.${t.key}" checked>`));
  assert.deepEqual(counts(), WANT, "nothing doubled");
  assert.equal(game.folders.length, 4, "the folders are reused");
  assert.ok(log.infos.slice(before).some((m) => /0 added, 0 replaced, 13 already here/.test(m)));
  // one Entity and the script go missing: keeping the rest brings back just those, at their ids
  const lost = [ids("demo-entities")[2], ids("demo-journal")[0]];
  await asUser(GM, () => game.actors.get(lost[0]).delete());
  await asUser(GM, () => game.journal.get(lost[1]).delete());
  dialogResponders.push(press("skip", tick("hallowby")));
  await asUser(GM, () => api().demo.dialog());
  await settle();
  assert.deepEqual(counts(), WANT);
  assert.ok(game.actors.get(lost[0]) && game.journal.get(lost[1]), "back at the same ids");
  assert.equal(game.folders.length, 4);
  // replace: fresh copies, the same ids
  const drac = game.actors.get(ids("demo-entities")[0]);
  await asUser(GM, () => drac.update({ name: "Count Renamed" }));
  dialogResponders.push(press("replace", tick("hallowby")));
  await asUser(GM, () => api().demo.dialog());
  await settle();
  assert.deepEqual(counts(), WANT);
  assert.notEqual(game.actors.get(ids("demo-entities")[0]).name, "Count Renamed", "a fresh copy");
  assert.ok(log.infos.some((m) => /0 added, 13 replaced, 0 already here/.test(m)));
  // Cancel does nothing; nothing ticked sets nothing up
  dialogResponders.push(press("cancel"));
  assert.equal(await asUser(GM, () => api().demo.dialog()), null);
  const warned = log.warnings.length;
  dialogResponders.push(press("skip", {}));
  assert.deepEqual(await asUser(GM, () => api().demo.dialog()), { ok: false, reason: "noneChosen" });
  assert.ok(log.warnings.slice(warned).some((w) => /Nothing was ticked/.test(w)));
  assert.deepEqual(log.errors, []);
});

test("a town: its journal entry, scene and macro come in at their ids, in folders named after it; the Entities are the one-shot's, never doubled", async () => {
  const before = log.infos.length;
  dialogResponders.push(press("skip", tick("puddlecombe")));
  await asUser(GM, () => api().demo.dialog());
  await settle();
  const entry = game.journal.get(townIds("journal", "puddlecombe")[0]);
  const scene = game.scenes.get(townIds("town-scenes", "puddlecombe")[0]);
  const macro = game.macros.get(townIds("town-macros", "puddlecombe")[0]);
  assert.equal(entry?.name, "Puddlecombe (Easy)");
  assert.equal(scene?.name, "Puddlecombe");
  assert.equal(macro?.name, "Puddlecombe: Start the Raid");
  for (const [doc, type] of [[entry, "JournalEntry"], [scene, "Scene"], [macro, "Macro"]]) {
    assert.equal(folderOf(doc)?.name, "Puddlecombe", `${type} in its town's folder`);
    assert.equal(folderOf(doc)?.type, type);
  }
  assert.equal(game.actors.length, 8, "the eight Entities, already here, kept");
  assert.ok(log.infos.slice(before).some((m) => /Set up Puddlecombe: 3 added, 0 replaced, 8 already here/.test(m)));
  // every pin on the town's map opens a page of its entry; one on each place
  assert.equal(scene.notes.length, 4 + 2);
  for (const n of scene.notes) {
    assert.equal(n.entryId, entry.id);
    assert.ok(entry.pages.some((p) => p._id === n.pageId), `pin ${n._id} opens its page`);
  }
  // the other two together, Puddlecombe again: nothing doubled, folders reused
  const folders = game.folders.length;
  dialogResponders.push(press("skip", tick("puddlecombe", "thistlewick", "gallowsmere")));
  await asUser(GM, () => api().demo.dialog());
  await settle();
  for (const t of TOWNS) for (const name of ["journal", "town-scenes", "town-macros"]) assert.deepEqual(townHere(name, t.key), townIds(name, t.key), `${t.key}: ${name}`);
  assert.equal(game.journal.filter((j) => j.name === "Puddlecombe (Easy)").length, 1);
  assert.equal(game.folders.length, folders + 2 * 3, "three folders for each new town, Puddlecombe's reused");
  assert.equal(game.actors.length, 8);
  assert.ok(log.infos.some((m) => /Set up Puddlecombe, Thistlewick, Gallowsmere: 6 added, 0 replaced, 11 already here/.test(m)));
  assert.deepEqual(log.errors, []);
});

test("GM only: a player can't import it, isn't asked, and the menu tells it so", async () => {
  assert.deepEqual(await asUser(ANN, () => api().demo.import()), { ok: false, reason: "gmOnly" });
  assert.equal(await asUser(ANN, () => api().demo.offer()), null);
  const before = log.warnings.length;
  await asUser(ANN, () => api().demo.dialog());
  assert.ok(log.warnings.slice(before).some((w) => /Only the Storyteller can set up a ready-made game/.test(w)));
});

test("Not now asks again next time; Don't ask again turns the prompt off; a world that has a game already counts as set up", async () => {
  // a world that already holds every Demo document (imported by hand): not asked, and marked set up
  await setSetting("demoImported", "");
  assert.equal(await asUser(GM, () => api().demo.offer()), null);
  assert.equal(setting("demoImported"), game.system.version || "imported");
  // a world without any of them
  for (const name of SETUP_PACKS) for (const id of ids(name)) await asUser(GM, () => world(name).get(id)?.delete());
  await setSetting("demoImported", "");
  dialogResponders.push(press("later"));
  assert.equal(await asUser(GM, () => api().demo.offer()), "later");
  assert.deepEqual(counts(), [0, 0, 0, 0], "nothing imported");
  assert.equal(setting("demoPrompt"), true, "asked again next time");
  dialogResponders.push(press("never"));
  assert.equal(await asUser(GM, () => api().demo.offer()), "never");
  assert.equal(setting("demoPrompt"), false);
  assert.ok(log.infos.some((m) => /won.t be offered again/.test(m)));
  assert.equal(await asUser(GM, () => api().demo.offer()), null, "not asked any more");
  // the switch on again: asked again
  await setSetting("demoPrompt", true);
  dialogResponders.push(press("later"));
  assert.equal(await asUser(GM, () => api().demo.offer()), "later");
});

test("the first question can set up a town alone: the Entities come with it, into the one-shot's Entities folder", async () => {
  assert.equal(game.actors.length, 0);
  dialogResponders.push(press("import", tick("thistlewick")));
  assert.equal(await asUser(GM, () => api().demo.offer()), "imported");
  await settle();
  assert.deepEqual(townHere("town-scenes", "thistlewick"), townIds("town-scenes", "thistlewick"));
  assert.equal(game.actors.length, 8);
  assert.ok(game.actors.every((a) => folderOf(a)?.name === pack("demo-entities").title));
  assert.deepEqual(counts(), [0, 0, 8, 0], "the one-shot's Entities only, not its script");
  assert.ok(log.infos.some((m) => /Set up Thistlewick: 11 added, 0 replaced, 0 already here/.test(m)));
  // a world that has all of a town counts as set up
  await setSetting("demoImported", "");
  assert.equal(await asUser(GM, () => api().demo.offer()), null);
  assert.equal(setting("demoImported"), game.system.version || "imported");
});

test("the session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
});
