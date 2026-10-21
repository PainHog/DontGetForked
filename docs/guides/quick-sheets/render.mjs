// Render the two one-page quick sheets to PDF with the book's fonts.
// Usage: node docs/guides/quick-sheets/render.mjs . <out dir>   (from the repository root)
// Adapted from docs/guides/run-guide/render.mjs.
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const [ROOT = ".", OUT = "."] = process.argv.slice(2);
const HERE = dirname(fileURLToPath(import.meta.url));
mkdirSync(OUT, { recursive: true });
const { chromium } = await import(pathToFileURL(join(ROOT, "node_modules/playwright-core/index.mjs")).href);

const FONT_DIR = join(ROOT, "node_modules", "@fontsource");
const face = (family, pkg, w, s) => `@font-face{font-family:"${family}";src:url("${pathToFileURL(join(FONT_DIR, pkg, "files", `${pkg}-latin-${w}-${s}.woff2`)).href}") format("woff2");font-weight:${w};font-style:${s};}`;
const fonts = [
  ...[700, 800, 900].map(w => face("Fraunces", "fraunces", w, "normal")),
  ...[400, 500, 700, 800].flatMap(w => [face("Alegreya", "alegreya", w, "normal"), face("Alegreya", "alegreya", w, "italic")]),
  ...[400, 500, 700, 800].map(w => face("Alegreya Sans", "alegreya-sans", w, "normal")),
].join("\n");

const CHROME = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
const page = await browser.newPage();
const jobs = [
  ["players.html", "Players_Rules.pdf"],
  ["storyteller.html", "Storyteller_Guide.pdf"],
];
let ok = true;
for (const [src, out] of jobs) {
  const html = readFileSync(join(HERE, src), "utf8").replace("/*FONTS*/", fonts);
  const tmp = join(OUT, "_" + src);
  writeFileSync(tmp, html);
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const pdf = await page.pdf({ path: join(OUT, out), preferCSSPageSize: true, printBackground: true, tagged: true });
  // each sheet must stay on one page
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page(?!s)/g) || []).length;
  unlinkSync(tmp);
  if (pages !== 1) ok = false;
  console.log(`wrote ${out}: ${pages} page${pages === 1 ? "" : "s"}${pages === 1 ? "" : "  <-- must be 1"}`);
}
await browser.close();
if (!ok) process.exitCode = 1;
