/**
 * DON'T GET FORKED — the premade towns' pictures for Foundry (the Ready-made Towns compendiums)
 * ---------------------------------------------------------------------------------------------
 * Renders, with the local Chromium (Playwright) and the book's typefaces, for each of Chapter 9's three towns
 * (book/src/towns.json, read through book/tools/towns.mjs):
 *   assets/towns/<key>-map.jpg     the players' battle map (book/tools/scene-map.mjs), as wide as Hallowby's
 *   assets/towns/<key>-thumb.jpg   its thumbnail for the scene list
 *   assets/towns/rendered.json     what each map was rendered from (a hash of its SVG) and the pictures' sizes, so
 *                                  `--check` and the tests can tell a stale picture without a browser
 * The images are committed: the release zips the repository as it is. Run again after changing a town's layout or
 * the map code (the check says so).
 *   node tools/town-art.mjs           render the three
 *   node tools/town-art.mjs --check   fail if a picture is missing, out of date or not the scene's size
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROOT } from "./pack-config.mjs";
import { loadTowns } from "../book/tools/towns.mjs";
import { sceneMap } from "../book/tools/scene-map.mjs";
import { TOWN_MAP_WIDTH } from "./gen-town-source.mjs";
import { render, launchChromium, jpegSize } from "./demo-art.mjs";

export const TOWN_ASSETS = join(ROOT, "assets", "towns");
export const THUMB_WIDTH = 400;
const RECORD = join(TOWN_ASSETS, "rendered.json");

/** One town's pictures: their files (relative to assets/towns) and pixel sizes, and the hash of the SVG they show. */
export function townArt(town) {
  const m = sceneMap(town);
  const size = (w) => [w, Math.round((w * m.height) / m.width)];
  return {
    svg: m.svg,
    hash: createHash("sha256").update(m.svg).digest("hex").slice(0, 16),
    map: { file: `${town.key}-map.jpg`, size: size(TOWN_MAP_WIDTH) },
    thumb: { file: `${town.key}-thumb.jpg`, size: size(THUMB_WIDTH) },
  };
}

/** What is wrong with the committed pictures (missing, stale or the wrong size): a list of lines, empty when all is well. */
export function artProblems(towns = loadTowns()) {
  const problems = [];
  const record = existsSync(RECORD) ? JSON.parse(readFileSync(RECORD, "utf8")) : {};
  for (const t of towns) {
    const art = townArt(t);
    if (record[t.key]?.svg !== art.hash) problems.push(`${t.key}: the map has changed since it was rendered`);
    for (const pic of [art.map, art.thumb]) {
      const file = join(TOWN_ASSETS, pic.file);
      if (!existsSync(file)) { problems.push(`${pic.file} is missing`); continue; }
      const { w, h } = jpegSize(readFileSync(file));
      if (w !== pic.size[0] || h !== pic.size[1]) problems.push(`${pic.file} is ${w} × ${h}, not ${pic.size.join(" × ")}`);
    }
  }
  return problems;
}

export async function renderTownArt(towns = loadTowns()) {
  mkdirSync(TOWN_ASSETS, { recursive: true });
  const browser = await launchChromium();
  const record = {};
  const written = [];
  try {
    for (const t of towns) {
      const art = townArt(t);
      await render(browser, art.svg, { width: art.map.size[0], height: art.map.size[1], type: "jpeg", quality: 84, out: join(TOWN_ASSETS, art.map.file) });
      await render(browser, art.svg, { width: art.thumb.size[0], height: art.thumb.size[1], type: "jpeg", quality: 80, out: join(TOWN_ASSETS, art.thumb.file) });
      record[t.key] = { svg: art.hash, map: art.map.size, thumb: art.thumb.size };
      written.push(art.map.file, art.thumb.file);
    }
  } finally {
    await browser.close();
  }
  writeFileSync(RECORD, `${JSON.stringify(record, null, 2)}\n`);
  return written;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--check")) {
    const problems = artProblems();
    if (problems.length) {
      console.error(`The towns' pictures are out of date:\n  ${problems.join("\n  ")}\n  run: node tools/town-art.mjs`);
      process.exit(1);
    }
    console.log("The towns' pictures match their maps.");
  } else {
    const w = await renderTownArt();
    console.log(`wrote assets/towns/: ${w.join(", ")}, rendered.json`);
  }
}
