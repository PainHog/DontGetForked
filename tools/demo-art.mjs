/**
 * DON'T GET FORKED — the Halloween one-shot's pictures for Foundry (the Demo compendiums)
 * ---------------------------------------------------------------------------------------
 * Renders, with the local Chromium (Playwright) and the book's typefaces:
 *   assets/demo/hallowby-map.jpg     the players' battle map (book/tools/scene-map.mjs), 4200 px wide
 *   assets/demo/hallowby-thumb.jpg   its thumbnail for the scene list
 *   assets/demo/tokens/<key>.png     each Entity's token: a round crop of one of its two Chapter 2 portraits
 *                                    (book/art, public-domain stand-ins: book/art/stand-in/SOURCES.md) in a ring
 *                                    of its own colour, with its name on a ribbon; also the actor's picture
 *   assets/demo/castle.jpg           the castle for Part One's scene (the book's cover stand-in, book/art/cover-castle.jpg)
 * The images are committed: the release zips the repository as it is. Run again after changing the town's layout,
 * the map code or a crop below.
 *   node tools/demo-art.mjs
 * Chromium: $CHROME_PATH, else /opt/pw-browsers/chromium when present, else Playwright's own.
 */
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./pack-config.mjs";
import { DGF } from "../module/config.mjs";
import { demoTown } from "../book/tools/demo-pages.mjs";
import { sceneMap } from "../book/tools/scene-map.mjs";
import { DEMO_MAP_WIDTH } from "./gen-demo-source.mjs";

export const DEMO_ASSETS = join(ROOT, "assets", "demo");
const MAP_WIDTH = DEMO_MAP_WIDTH;

/**
 * Each token's crop: which portrait, the centre of the crop (fractions of the picture's width and height) and its
 * size (a fraction of the picture's width), chosen by eye so the face fills the token. Ring colours tell the eight
 * apart at a glance; the short name goes on the ribbon.
 */
export const TOKENS = {
  dracula: { art: "dracula-revealed", cx: 0.55, cy: 0.42, size: 0.66, ring: "#8b1e2b", short: "Dracula" },
  creature: { art: "creature-revealed", cx: 0.43, cy: 0.2, size: 0.48, ring: "#3f6f52", short: "The Creature" },
  mummy: { art: "mummy-revealed", cx: 0.31, cy: 0.3, size: 0.52, ring: "#b08a3e", short: "The Mummy" },
  werewolf: { art: "werewolf-costume", cx: 0.55, cy: 0.48, size: 0.66, ring: "#7a5634", short: "The Werewolf" },
  invisible: { art: "invisible-costume", cx: 0.38, cy: 0.25, size: 0.45, ring: "#4b6584", short: "Invisible Man" },
  ghost: { art: "ghost-costume", cx: 0.45, cy: 0.4, size: 0.72, ring: "#8fa6ad", short: "A Ghost" },
  witch: { art: "witch-revealed", cx: 0.33, cy: 0.24, size: 0.5, ring: "#5e3a7a", short: "A Witch" },
  "jekyll-hyde": { art: "jekyll-hyde-costume", cx: 0.54, cy: 0.2, size: 0.5, ring: "#3a3a3f", short: "Jekyll & Hyde" },
};

const FONT_DIR = join(ROOT, "node_modules", "@fontsource");
const fontFace = (family, pkg, weight) => `@font-face{font-family:"${family}";src:url("${pathToFileURL(join(FONT_DIR, pkg, "files", `${pkg}-latin-${weight}-normal.woff2`)).href}") format("woff2");font-weight:${weight};}`;
const FONTS = [fontFace("Fraunces", "fraunces", 800), fontFace("Fraunces", "fraunces", 900), fontFace("Alegreya Sans", "alegreya-sans", 700)].join("");

/** Pixel size of a JPEG, read from its header. */
function jpegSize(buf) {
  for (let i = 2; i < buf.length - 9;) {
    if (buf[i] !== 0xff) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error("can't read the JPEG's size");
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** One token, 400 × 400, transparent outside its ring. */
export function tokenSvg(key) {
  const t = TOKENS[key];
  const buf = readFileSync(join(ROOT, "book", "art", `${t.art}.jpg`));
  const { w, h } = jpegSize(buf);
  const D = 336; // the picture's circle
  const k = D / (t.size * w); // picture px → token px
  const ix = 200 - t.cx * w * k, iy = 200 - t.cy * h * k;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
<defs><clipPath id="c"><circle cx="200" cy="200" r="${D / 2}"/></clipPath>
</defs>
<circle cx="200" cy="200" r="196" fill="#0e1112"/>
<g clip-path="url(#c)"><rect width="400" height="400" fill="#f2f1ee"/><image href="data:image/jpeg;base64,${buf.toString("base64")}" x="${ix.toFixed(1)}" y="${iy.toFixed(1)}" width="${(w * k).toFixed(1)}" height="${(h * k).toFixed(1)}"/></g>
<circle cx="200" cy="200" r="${D / 2 + 8}" fill="none" stroke="${t.ring}" stroke-width="16"/>
<circle cx="200" cy="200" r="${D / 2 + 16}" fill="none" stroke="#0e1112" stroke-width="3"/>
<circle cx="200" cy="200" r="${D / 2}" fill="none" stroke="#0e1112" stroke-width="2.5"/>
<rect x="64" y="312" width="272" height="54" rx="10" fill="#2b2423" stroke="#b38a4a" stroke-width="4"/>
<text x="200" y="350" font-family="Fraunces, Georgia, serif" font-weight="900" font-size="${t.short.length > 11 ? 30 : 34}" fill="#efe6d2" text-anchor="middle">${esc(t.short)}</text>
</svg>`;
}

async function render(browser, svg, { width, height, type, out, quality }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><style>${FONTS} html,body{margin:0;background:transparent} svg{display:block;width:${width}px;height:${height}px}</style></head><body>${svg}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, type, quality, omitBackground: type === "png", clip: { x: 0, y: 0, width, height } });
  await page.close();
}

export async function renderDemoArt() {
  mkdirSync(join(DEMO_ASSETS, "tokens"), { recursive: true });
  const CHROME = process.env.CHROME_PATH ?? (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
  const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
  const written = [];
  try {
    const m = sceneMap(demoTown());
    const width = MAP_WIDTH, height = Math.round((MAP_WIDTH * m.height) / m.width);
    await render(browser, m.svg, { width, height, type: "jpeg", quality: 84, out: join(DEMO_ASSETS, "hallowby-map.jpg") });
    await render(browser, m.svg, { width: 400, height: Math.round((400 * m.height) / m.width), type: "jpeg", quality: 80, out: join(DEMO_ASSETS, "hallowby-thumb.jpg") });
    written.push("hallowby-map.jpg", "hallowby-thumb.jpg");
    for (const e of DGF.entities) {
      await render(browser, tokenSvg(e.key), { width: 400, height: 400, type: "png", out: join(DEMO_ASSETS, "tokens", `${e.key}.png`) });
      written.push(`tokens/${e.key}.png`);
    }
  } finally {
    await browser.close();
  }
  copyFileSync(join(ROOT, "book", "art", "cover-castle.jpg"), join(DEMO_ASSETS, "castle.jpg"));
  written.push("castle.jpg");
  return written;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const w = await renderDemoArt();
  console.log(`wrote assets/demo/: ${w.join(", ")}`);
}
