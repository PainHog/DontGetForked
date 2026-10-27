/**
 * DON'T GET FORKED — the Ready-made Towns compendiums' source (Chapter 9's three towns, ready to play)
 * ---------------------------------------------------------------------------------------------------
 * Part of tools/gen-pack-source.mjs's generate(): everything here is made from book/src/towns.json (read through
 * book/tools/towns.mjs, which checks each town against Chapter 8's rules) and the book's own words, so Foundry says
 * what the book says. Nothing here is new game content.
 *
 *   packs/_source/town-scenes/   each town's night map (assets/towns/<key>-map.jpg, rendered by tools/town-art.mjs
 *                                from book/tools/scene-map.mjs), with a pin on each place (the Storyteller's: the
 *                                town's journal entry is theirs) that opens that place's page in the town's entry
 *   packs/_source/town-macros/   each town's "Start the Raid" macro: a new raid at the town's level with its list
 *   journal pages                one page per location, the lock-up and the way out (townPlacePages), added to each
 *                                town's entry in packs/_source/journal by gen-pack-source.mjs townDoc
 * The Entities are the Demo's (packs/_source/demo-entities); setting a town up brings them in if the world lacks them.
 * Every town document carries flags["dont-get-forked"].setup = the town's key: the setup (module/logic/demo.mjs) picks
 * a town's documents out of the shared packs by it.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SYSTEM_ID, FLAG } from "../module/contracts.mjs";
import { wayText } from "../book/tools/towns.mjs";
import { sceneMap } from "../book/tools/scene-map.mjs";
import { ROOT, makeId } from "./pack-config.mjs";
import { DEMO_MAP_WIDTH, DEMO_GRID, sceneBase, startMacroCommand } from "./gen-demo-source.mjs";

/** The towns' maps are as wide as Hallowby's (tools/town-art.mjs renders them so), so a token is the same size on each. */
export const TOWN_MAP_WIDTH = DEMO_MAP_WIDTH;
const ASSET = (p) => `systems/${SYSTEM_ID}/assets/${p}`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const low = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const pretty = (s) => s.replace(/^the /, "The ").replace(/(^|\s)(\w)/g, (m, a, b) => a + b.toUpperCase());
const textPage = (key, name, content) => ({ key, name, type: "text", text: { format: 1, content } });
const SIZE = { bulky: "Bulky", huge: "Huge" };

/** The flag that ties a document to its ready-made game (module/logic/demo.mjs reads it). */
export const setupFlag = (key) => ({ [FLAG]: { setup: key } });

/** The journal page each place's pin opens (its key in the town's entry). */
export const placePageKey = (place) => (place === "lockup" || place === "wayout" ? place : `place-${place}`);

/* ------------------------------------------------------- the key's rows -- */

/** One obstacle row, as Chapter 9's town key prints it (the journal's Locations page uses the same rows). */
export function obstacleRow(step, o, tag = "") {
  const name = `${esc(o.name)}${o.group ? " <em>(group)</em>" : ""}${o.watched ? " <strong>watched</strong>" : ""}${tag ? ` <em>${tag}</em>` : ""}`;
  return `<tr><td><strong>${step}</strong> ${name}</td><td>${esc(wayText(o.quiet, o.quietText))}</td><td>${o.loud ? esc(wayText(o.loud, o.loudText)) : "—"}</td><td>${o.difficulty}</td></tr>`;
}

/** A location's rows in the key: its heading, its two ways in, each "Then", and the furniture's obstacle last. */
export function locationRows(l) {
  return [
    `<tr><th colspan="4">${l.n}. ${esc(cap(l.place))}: ${esc(l.item)} (${esc(l.kindName)})${l.essential ? " · <strong>essential</strong>" : ""}</th></tr>`,
    obstacleRow("Way in", l.waysIn[0]),
    obstacleRow("or", l.waysIn[1]),
    ...l.then.map((o) => obstacleRow("Then", o)),
    ...(l.furniture ? [obstacleRow("Then", l.furniture.obstacle, "for the piece")] : []),
  ];
}

const keyTable = (rows) => [
  `<table>`,
  `<thead><tr><th>Location · obstacle</th><th>Quiet way</th><th>Loud way</th><th>Difficulty</th></tr></thead>`,
  `<tbody>`, ...rows, `</tbody>`,
  `</table>`,
].join("\n");

/** The furniture line, as Chapter 9's town page prints it. */
export const furnitureLine = (host) => `<p><strong>The furniture:</strong> ${esc(low(host.furniture.name))} (${SIZE[host.furniture.size]}: ${host.furniture.size === "huge" ? "two carriers" : "one carrier"}), at ${esc(host.place)} (${host.n}).</p>`;

/* --------------------------------------------------- the book's words -- */

const chapter = (file) => readFileSync(join(ROOT, "book", "src", "chapters", file), "utf8");

/** Chapter 6's lock-up table (Rescue and Slipping free), as printed, for the lock-up's page. */
export function lockupTable() {
  const html = (chapter("16-ch06.html").match(/<table class="tbl lockup[^"]*">[\s\S]*?<\/table>/) ?? [])[0];
  if (!html) throw new Error("Chapter 6 has no lock-up table");
  return html
    .replace(/<table[^>]*>/, "<table>")
    .replace(/<span class="sr-only">([^<]*)<\/span>/g, "$1")
    .replace(/ scope="row"/g, "")
    .replace(/\n\s*/g, "\n");
}

/* ---------------------------------------------------------- the pages -- */

/**
 * The pages the map's pins open: one per location (its list item, its obstacles in order with their ways, Difficulty
 * and marks, and the furniture where it stands, as Chapter 9 gives them), then the lock-up and the way out. `Q` is
 * the book's quoted sentences (gen-pack-source.mjs BOOK_QUOTES), `B` a button's name (lang/en.json).
 */
export function townPlacePages(t, { Q, B, L }) {
  const host = t.locations.find((l) => l.furniture);
  const legend = `<p>${Q("townRows")} ${Q("townTraits")}</p>`;
  const pages = t.locations.map((l) => {
    const watched = [...l.waysIn, ...l.then].some((o) => o.watched);
    return textPage(placePageKey(l.key), `${l.n} · ${pretty(l.place)}`, [
      keyTable(locationRows(l)),
      ...(l.furniture ? [furnitureLine(host)] : []),
      legend,
      ...(watched ? [`<p>${Q("tells")}</p>`, `<p><strong>In Foundry:</strong> ${B("DGF.Raid.tellCheck")} on the Raid HUD makes it.</p>`] : []),
    ].join("\n"));
  });
  pages.push(textPage("lockup", "The Lock-up", [
    `<p>${Q("townAlways")}</p>`,
    `<p><strong>${t.labelName}:</strong> Difficulty: the lock-up ${t.lockup.difficulty}.</p>`,
    `<p>${Q("lockupHeld")}</p>`,
    lockupTable(),
    `<p>${Q("lockupWatched")}</p>`,
    `<p>${Q("tells")} ${Q("lockupTell")}</p>`,
    `<p><strong>In Foundry:</strong> a capture shows on the Raid HUD at the lock-up. From the next Turn a captive’s roll is slipping free (tick <em>${esc(L("DGF.Roll.lockupSlip").replace(/\s*\(.*$/, ""))}</em>); a rescue that beats the lock-up frees every captive there.</p>`,
  ].join("\n")));
  pages.push(textPage("wayout", "The Way Out", [
    `<p>${Q("townAlways")}</p>`,
    `<p><strong>${t.labelName}:</strong> Difficulty: the way out ${t.wayOut.difficulty}.</p>`,
    `<p>${Q("gettingOut")}</p>`,
    `<p>${Q("partyStarts")}</p>`,
    `<p>${Q("tells")} ${Q("wayOutTell")}</p>`,
    `<p><strong>In Foundry:</strong> the party’s tokens start on this yard. The roll dialog has a tick for the way out.</p>`,
  ].join("\n")));
  return pages;
}

/* ------------------------------------------------------------- scenes -- */

/** A pin on the town's map, opening one page of the town's journal entry (in the Towns and Guide compendium). */
const pin = (t, place, x, y) => ({
  key: `${t.key}-${place}`,
  entryId: makeId("journal", t.key), pageId: makeId("journal", t.key, placePageKey(place)),
  x, y, elevation: 0, sort: 0,
  texture: { src: "icons/svg/book.svg" }, iconSize: 72,
  text: "", fontSize: 32, textAnchor: 1, textColor: "#efe6d2", global: false, flags: {},
});

/** A town's scene: its night map, sized for Foundry like Hallowby's, with a pin on every place. */
export function townSceneDoc(t) {
  const m = sceneMap(t);
  const k = TOWN_MAP_WIDTH / m.width;
  const W = TOWN_MAP_WIDTH, H = Math.round(m.height * k);
  return {
    key: t.key, name: t.name, flags: setupFlag(t.key),
    background: { src: ASSET(`towns/${t.key}-map.jpg`) }, width: W, height: H, thumb: ASSET(`towns/${t.key}-thumb.jpg`),
    grid: { type: 0, size: DEMO_GRID }, initial: { x: Math.round(W / 2), y: Math.round(H / 2), scale: 0.35 },
    ...sceneBase,
    notes: Object.entries(m.places).map(([place, p]) => pin(t, place, Math.round(p.x * k), Math.round(p.y * k))),
  };
}

/** A town's "Start the Raid" macro. */
export function townMacroDoc(t) {
  return { key: t.key, name: `${t.name}: Start the Raid`, type: "script", img: "icons/svg/fire.svg", command: startMacroCommand(t), flags: setupFlag(t.key) };
}

/** Every Ready-made Towns document, by pack: { scenes, macros }. */
export function townDocs(towns) {
  return { scenes: towns.map(townSceneDoc), macros: towns.map(townMacroDoc) };
}
