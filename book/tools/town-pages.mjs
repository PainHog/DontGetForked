/**
 * Writes Chapter 9's town pages and maps from book/src/towns.json (the one place the
 * premade towns are kept; the simulator plays the same file through sim/premade.mjs).
 *
 *   node book/tools/town-pages.mjs           rewrite each town's block in 32-ch09.html
 *                                            (between <!-- town:KEY --> and <!-- /town:KEY -->)
 *                                            and book/art/map-KEY.svg
 *   node book/tools/town-pages.mjs --check   fail if the chapter or a map is out of date
 *
 * Everything in a town's block restates the approved tables: the custom, the villagers,
 * the list, the furniture, each obstacle's name and ways as printed in Chapter 8, and the
 * label's numbers from the Difficulty table. The hand-written parts of the chapter (its
 * opener and the example of play) sit outside the markers and are never touched.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { loadTowns, wayText } from "./towns.mjs";
import { townMap } from "./town-maps.mjs";

const CHAPTER = new URL("../src/chapters/32-ch09.html", import.meta.url);
const mapFile = (key) => new URL(`../art/map-${key}.svg`, import.meta.url);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const low = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const SIZE = { bulky: "Bulky", huge: "Huge" };

function obstacleRow(step, o, cls = "") {
  const name = `${o.name}${o.group ? " <em>(group)</em>" : ""}${o.watched ? ' <span class="watched">watched</span>' : ""}`;
  return `<tr${cls ? ` class="${cls}"` : ""}><td><span class="step">${step}</span>${name}</td><td>${wayText(o.quiet, o.quietText)}</td><td>${o.loud ? wayText(o.loud, o.loudText) : "—"}</td><td class="num">${o.difficulty}</td></tr>`;
}

function townBlock(t, { newPage }) {
  const L = t.locations;
  const host = L.find((l) => l.furniture);
  const list = L.map((l) => `<li>${l.essential ? `<strong>${cap(l.item)}</strong> (essential)` : cap(l.item)}</li>`).join("");
  const villagers = t.villagers.map((v) => `${low(v.who)} (${low(v.doing)})`).join("; ");
  // one <tbody> per location, headed by its name (a row-group header, so a screen reader ties each obstacle to its location)
  const groups = [];
  for (const l of L) {
    const rows = [`<tr class="loc"><th colspan="4" scope="rowgroup"><span class="loc-n">${l.n}</span>${cap(l.place)}: ${l.item} <span class="kind">(${l.kindName})</span>${l.essential ? " · <strong>essential</strong>" : ""}</th></tr>`];
    rows.push(obstacleRow("Way in", l.waysIn[0]));
    rows.push(obstacleRow("or", l.waysIn[1]));
    for (const o of l.then) rows.push(obstacleRow("Then", o));
    if (l.furniture) rows.push(obstacleRow("Furniture", l.furniture.obstacle, "furn"));
    groups.push(`<tbody>\n${rows.join("\n")}\n</tbody>`);
  }
  return `<div class="town${newPage ? " new-page" : ""}" id="town-${t.key}">
<div class="town-head"><p class="town-label">${t.labelName}</p><h3>${t.name}</h3>
<p class="town-desc">${t.description}</p></div>
<div class="town-top">
<div class="town-facts">
<p><strong>Lantern Night:</strong> ${t.custom}</p>
<p class="town-list-head"><strong>The shopping list</strong> (${L.length} items):</p>
<ol class="town-list">${list}</ol>
<p><strong>The furniture:</strong> ${low(host.furniture.name)} (${SIZE[host.furniture.size]}), at ${host.place} (${host.n}).</p>
<p><strong>Villagers:</strong> ${villagers}.</p>
<p><strong>${t.labelName}:</strong> Suspicion Limit ${t.limit} · the way out ${t.wayOut.difficulty} · the lock-up ${t.lockup.difficulty} · the final flight: mob ${t.finalMob}, escape at Lead ${t.finalEscape}.</p>
</div>
<figure class="art map" data-art="map-${t.key}"></figure>
</div>
<table class="tbl town-key">
<colgroup><col class="c-ob"><col class="c-quiet"><col class="c-loud"><col class="c-d"></colgroup>
<thead><tr><th>Location · obstacle</th><th>Quiet way</th><th>Loud way</th><th class="num">Difficulty</th></tr></thead>
${groups.join("\n")}
</table>
</div>`;
}

const towns = loadTowns();
const check = process.argv.includes("--check");
let html = readFileSync(CHAPTER, "utf8");
let stale = [];
towns.forEach((t, i) => {
  const re = new RegExp(`(<!-- town:${t.key} [^>]*-->)[\\s\\S]*?(<!-- /town:${t.key} -->)`);
  if (!re.test(html)) throw new Error(`32-ch09.html has no <!-- town:${t.key} … --> … <!-- /town:${t.key} --> markers`);
  html = html.replace(re, (_, a, b) => `${a}\n${townBlock(t, { newPage: !!t.map?.newPage })}\n${b}`); // layout: which towns start a page
  const svg = townMap(t);
  let old = "";
  try { old = readFileSync(mapFile(t.key), "utf8"); } catch {}
  if (old !== svg) { stale.push(`map-${t.key}.svg`); if (!check) writeFileSync(mapFile(t.key), svg); }
});
if (html !== readFileSync(CHAPTER, "utf8")) { stale.push("32-ch09.html"); if (!check) writeFileSync(CHAPTER, html); }
if (check && stale.length) { console.error(`out of date: ${stale.join(", ")} — run node book/tools/town-pages.mjs`); process.exit(1); }
console.log(check ? "Chapter 9's towns and maps match book/src/towns.json." : stale.length ? `wrote ${stale.join(", ")}` : "nothing to change");
