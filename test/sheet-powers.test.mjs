/**
 * The Entity sheet shows each power as Chapter 2 does (Richard, 2026-10-07: "spell each power out"): the heading
 * with its cost, the rule (module/logic/power-text.mjs), the flavour in italics; the Weakness with its timing. The
 * book's entries come from book/tools/entity-entries.mjs (powersHtml), so the sheet is compared with those words.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { installFoundry, asUser, settle, log } from "../tools/fake-foundry.mjs";
import { powersHtml } from "../book/tools/entity-entries.mjs";
import { DGF } from "../module/config.mjs";

const { game } = installFoundry({
  users: [
    { id: "gmUser0000000000", name: "Storyteller", isGM: true },
    { id: "annUser000000000", name: "Ann" },
  ],
});
const GM = game.users.get("gmUser0000000000");
const ANN = game.users.get("annUser000000000");

await import("../module/dont-get-forked.mjs");
const { EntitySheet } = await import("../module/sheets/entity-sheet.mjs");
Hooks.callAll("init");
Hooks.callAll("ready");
await settle();
const api = game.dontGetForked;

/** Text as a reader sees it: tags gone, entities decoded, spaces collapsed. */
const text = (html) => String(html).replace(/<[^>]*>/g, " ")
  .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&#x3D;/g, "=").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
  .replace(/\s+/g, " ").replace(/ ([:.,])/g, "$1").trim();
/** The book's lines for an Entity (one per paragraph or list item), as text. */
const bookLines = (key) => powersHtml(DGF.entities.find((e) => e.key === key)).split("\n").map(text).filter(Boolean);
const sheetText = async (actor, user = ANN) => {
  const sheet = new EntitySheet({ document: actor });
  await asUser(user, () => sheet.render());
  return text(sheet.renderedParts.sheet);
};

test("the sheet's signature, Gift versions, Perks, Weakness and Tell read exactly as the book's entry", async () => {
  for (const key of ["dracula", "witch", "jekyll-hyde", "ghost"]) {
    const actor = await asUser(GM, () => api.createEntity(key, { ownerId: ANN.id }));
    await settle();
    const shown = await sheetText(actor);
    const lines = bookLines(key).filter((l) => !l.startsWith("Castle Duty")); // the sheet picks the Duty with its own words
    for (const line of lines) assert.ok(shown.includes(line), `${key}: the sheet says "${line}"`);
  }
  // spot checks, word for word
  const drac = game.actors.find((a) => a.system.entityKey === "dracula");
  const shown = await sheetText(drac);
  assert.ok(shown.includes("Signature: Mesmerise 1 charge"));
  assert.ok(shown.includes("At a watched obstacle that doesn’t list Charm, roll Charm at a Difficulty 2 lower; Trouble still gets you caught."));
  assert.ok(shown.includes("Gift: Shape of the Night pick one · 1 charge a use"));
  assert.ok(shown.includes("Perk pick one · always on"));
  assert.ok(shown.includes("Weakness: Garlic. Always (from round 1): in any chase, from its first round to its end, your trait die is one size smaller. Every kitchen in town has some, and the mob knows it."));
});

test("the flavour is in italics, and the chosen Gift and Perk are marked", async () => {
  const drac = game.actors.find((a) => a.system.entityKey === "dracula");
  const sheet = new EntitySheet({ document: drac });
  await asUser(ANN, () => sheet.render());
  const html = sheet.renderedParts.sheet;
  assert.match(html, /<em>He bends a mind with a look\.<\/em>/);
  assert.match(html, /class="dgf-chosen"[^>]*><strong>Bat<\/strong>/, "the default Gift is the chosen one");
  assert.match(html, /class="dgf-chosen"[^>]*><strong>Hypnotic Eyes<\/strong>/);
});

test("the sheet session left no errors and no missing words", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
});
