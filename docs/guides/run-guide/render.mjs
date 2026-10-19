// Render the guide and the player map to PDF with the book's fonts.
// Usage: node docs/guides/run-guide/render.mjs . <out dir>   (from the repository root)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const [ROOT, OUT] = process.argv.slice(2);
const HERE = dirname(fileURLToPath(import.meta.url));
const { chromium } = await import(pathToFileURL(join(ROOT, "node_modules/playwright-core/index.mjs")).href);

const FONT_DIR = join(ROOT, "node_modules", "@fontsource");
const face = (family, pkg, w, s) => `@font-face{font-family:"${family}";src:url("${pathToFileURL(join(FONT_DIR, pkg, "files", `${pkg}-latin-${w}-${s}.woff2`)).href}") format("woff2");font-weight:${w};font-style:${s};}`;
const fonts = [
  ...[400, 700, 900].flatMap(w => [face("Fraunces", "fraunces", w, "normal")]),
  ...[400, 500, 700, 800].flatMap(w => [face("Alegreya", "alegreya", w, "normal"), face("Alegreya", "alegreya", w, "italic")]),
  ...[400, 500, 700, 800].flatMap(w => [face("Alegreya Sans", "alegreya-sans", w, "normal")]),
].join("\n");

const CHROME = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
const page = await browser.newPage();
const jobs = [
  ["guide.html", "Running_Lantern_Night.pdf", s => s],
  ["map.html", "Hallowby_Player_Map.pdf", s => s.replace("MAP", pathToFileURL(join(ROOT, "assets/demo/hallowby-map.jpg")).href)],
];
for (const [src, out, fix] of jobs) {
  const html = fix(readFileSync(join(HERE, src), "utf8")).replace("/*FONTS*/", fonts);
  const tmp = join(OUT, "_" + src);
  writeFileSync(tmp, html);
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: join(OUT, out), preferCSSPageSize: true, printBackground: true, tagged: true });
  console.log("wrote", out);
}
await browser.close();
