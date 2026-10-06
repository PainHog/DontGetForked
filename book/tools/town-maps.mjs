/**
 * Schematic maps of the premade towns (Chapter 9), drawn from book/src/towns.json:
 * each location as a numbered building with its name, the lock-up, the way out at the
 * town's edge, lanes joining them, an eye on every watched location and a star where the
 * furniture stands. Stand-ins for the illustrator's maps.
 *
 * Every move takes one Turn (Chapter 4), so the maps show where things are, never how
 * far: no scale, no distances. The layout (where each building sits and which side its
 * label goes) is the `map` entry of each town and location in towns.json; everything
 * else is drawn here. Lines wobble a little so they read as drawn by hand; the wobble is
 * seeded, so the same data always draws the same map.
 *
 *   townMap(town)  → the SVG for one resolved town (book/tools/towns.mjs)
 *   node book/tools/town-maps.mjs --check   renders every map in Chromium with the book's
 *       fonts and fails if a label or a mark leaves the map, or a label overlaps another
 *       label, a mark or a building.
 */
import { C, rng, r1 } from "./art-gen/lib.mjs";

const SANS = "'Alegreya Sans', 'Segoe UI', sans-serif";
const DISPLAY = "'Fraunces', Georgia, serif";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const hash = (s) => [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261) >>> 0;

/** A hand-drawn line through `pts`: subdivided, each point nudged sideways by a smooth wobble. */
function wobble(pts, R, amp = 1.1, step = 9, closed = false) {
  const P = closed ? [...pts, pts[0]] : pts;
  const out = [];
  const ph1 = R() * 6.28, ph2 = R() * 6.28;
  let s = 0;
  for (let i = 0; i < P.length - 1; i++) {
    const [x0, y0] = P[i], [x1, y1] = P[i + 1];
    const len = Math.hypot(x1 - x0, y1 - y0);
    const n = Math.max(1, Math.round(len / step));
    const nx = -(y1 - y0) / (len || 1), ny = (x1 - x0) / (len || 1);
    for (let k = i === 0 ? 0 : 1; k <= n; k++) {
      const t = k / n;
      const d = s + t * len;
      const w = amp * (Math.sin(d / 23 + ph1) * 0.65 + Math.sin(d / 9.5 + ph2) * 0.35);
      const end = !closed && ((i === 0 && k === 0) || (i === P.length - 2 && k === n));
      out.push([x0 + (x1 - x0) * t + (end ? 0 : nx * w), y0 + (y1 - y0) * t + (end ? 0 : ny * w)]);
    }
    s += len;
  }
  return "M" + out.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(" L") + (closed ? " Z" : "");
}

/** Points along a gentle curve from a to b (a quadratic bend of `bend` × the length). */
function curve(a, b, bend = 0.12, n = 14) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const cx = mx - ((b[1] - a[1]) / (len || 1)) * len * bend, cy = my + ((b[0] - a[0]) / (len || 1)) * len * bend;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    return [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * cx + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * cy + t * t * b[1]];
  });
}

/** A closed, rounded town edge inside the frame (an irregular oval). */
function edgeLoop(W, H, inset, R, n = 40) {
  const cx = W / 2, cy = H / 2, rx = W / 2 - inset, ry = H / 2 - inset;
  const ph = R() * 6.28;
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + 0.035 * Math.sin(3 * a + ph) + 0.02 * Math.sin(5 * a + ph * 1.7);
    // a squarish oval: the town fills its frame
    const c = Math.cos(a), s = Math.sin(a);
    const sx = Math.sign(c) * Math.abs(c) ** 0.6, sy = Math.sign(s) * Math.abs(s) ** 0.6;
    return [cx + rx * sx * k, cy + ry * sy * k];
  });
}

const eye = (x, y, s = 1) =>
  `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})"><path d="M-10 0 Q0 -8 10 0 Q0 8 -10 0 Z" fill="${C.light}" stroke="${C.ink}" stroke-width="1.6" stroke-linejoin="round"/><circle r="3.3" fill="${C.ink}"/><circle cx="1.1" cy="-1.1" r="0.9" fill="${C.light}"/></g>`;
const star = (x, y, r = 8) => {
  const p = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
    return `${r1(x + rr * Math.cos(a))} ${r1(y + rr * Math.sin(a))}`;
  });
  return `<path d="M${p.join(" L")} Z" fill="${C.ink}" stroke="${C.ink}" stroke-width="0.8" stroke-linejoin="round"/>`;
};

/** A building seen from above: a block with its roof ridge and hatching. */
function building(x, y, w, h, R, { bars = false } = {}) {
  const x0 = x - w / 2, y0 = y - h / 2;
  let s = `<path d="${wobble([[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]], R, 0.7, 8, true)}" fill="${C.paper2}" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>`;
  if (bars) {
    for (let i = 1; i < 6; i++) s += `<path d="M${r1(x0 + (w * i) / 6)} ${r1(y0 + 3)} L${r1(x0 + (w * i) / 6)} ${r1(y0 + h - 3)}" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`;
  } else {
    // roof: a ridge along the long side and hatching on one slope
    s += `<path d="M${r1(x0 + 4)} ${r1(y)} L${r1(x0 + w - 4)} ${r1(y)}" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round"/>`;
    for (let k = x0 + 7; k < x0 + w - 4; k += 5) s += `<path d="M${r1(k)} ${r1(y + 2)} L${r1(k - 2.5)} ${r1(y0 + h - 2)}" stroke="${C.inkSoft}" stroke-width="0.9" stroke-linecap="round"/>`;
  }
  return s;
}

/** A small house for the town's fabric (no label). */
function cottage(x, y, w, h) {
  const x0 = x - w / 2, y0 = y - h / 2;
  return `<rect x="${r1(x0)}" y="${r1(y0)}" width="${r1(w)}" height="${r1(h)}" rx="1" fill="${C.paper2}" stroke="${C.ink}" stroke-width="1.3"/><path d="M${r1(x0 + 2)} ${r1(y)} L${r1(x0 + w - 2)} ${r1(y)}" stroke="${C.ink}" stroke-width="1" stroke-linecap="round"/>`;
}
const tree = (x, y, r, R) =>
  `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.3"/><path d="M${r1(x - r * 0.45)} ${r1(y + r * 0.1)} q${r1(r * 0.3)} ${r1(-r * 0.5 - R() * 2)} ${r1(r * 0.6)} 0 t${r1(r * 0.35)} ${r1(-r * 0.2)}" fill="none" stroke="${C.ink}" stroke-width="0.9" stroke-linecap="round"/>`;

const LABEL = 19;      // location names (about 8pt at the printed size)
const SMALL = 15.5;    // notes (about 6.5pt)

/** Rough text width for layout (the --check pass measures the real one). */
const textW = (s, size, bold = true) => s.length * size * (bold ? 0.53 : 0.48);

/**
 * The SVG for one town. Layout (towns.json `map`): w, h; hub [x, y] where the lanes meet;
 * hubR, hubLabel; wayOut {at: [x, y] near the edge, out: [x, y] beyond it, label: [x, y] where its
 * eye and words start}; lockup {x, y, label?}; edge "hedge" | "wall" | "plain"; inset; cottages;
 * trees. Each location: {x, y, label?} (label: above | below | left | right; default away from the hub).
 */
export function townMap(town) {
  const M = town.map;
  const W = M.w, H = M.h;
  const R = rng(hash(town.key));
  const parts = { ground: [], roadInk: [], roadFill: [], fabric: [], edge: [], marks: [], labels: [] };
  const boxes = []; // things a cottage or tree must not cover: [x0, y0, x1, y1]
  const roads = []; // centre lines, for keeping the town fabric off the lanes

  // frame and ground
  parts.ground.push(`<rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="10" fill="${C.paper}" stroke="${C.ink}" stroke-width="2.2"/>`);

  // the town's edge
  const loop = edgeLoop(W, H, M.inset ?? 22, R, 160);
  // the way out crosses the edge at the loop point nearest M.wayOut.at; the edge breaks there
  const gate = loop.reduce((b, p) => (Math.hypot(p[0] - M.wayOut.at[0], p[1] - M.wayOut.at[1]) < Math.hypot(b[0] - M.wayOut.at[0], b[1] - M.wayOut.at[1]) ? p : b), loop[0]);
  const G = M.edge === "wall" ? 20 : 17;
  const keep = loop.map((p) => Math.hypot(p[0] - gate[0], p[1] - gate[1]) >= G);
  const start = keep.findIndex((k, i) => k && !keep[(i - 1 + loop.length) % loop.length]);
  const open = [];
  for (let k = 0; k < loop.length; k++) { const i = (start + k) % loop.length; if (keep[i]) open.push(loop[i]); else if (open.length) break; }
  const edgePath = wobble(open, R, 1.6, 10);
  if (M.edge === "wall") {
    parts.edge.push(`<path d="${edgePath}" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`);
    parts.edge.push(`<path d="${edgePath}" fill="none" stroke="${C.paper2}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`);
    // towers along the wall, and one each side of the gate
    for (let i = 14; i < open.length - 10; i += 20) parts.edge.push(`<circle cx="${r1(open[i][0])}" cy="${r1(open[i][1])}" r="7.5" fill="${C.paper2}" stroke="${C.ink}" stroke-width="2"/>`);
    for (const p of [open[0], open[open.length - 1]]) parts.edge.push(`<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="9" fill="${C.paper2}" stroke="${C.ink}" stroke-width="2.2"/>`);
  } else if (M.edge === "hedge") {
    parts.edge.push(`<path d="${edgePath}" fill="none" stroke="${C.ink}" stroke-width="2" stroke-dasharray="2.5 5" stroke-linecap="round"/>`);
    for (let i = 4; i < open.length - 3; i += 8) parts.edge.push(tree(open[i][0], open[i][1], 4.5, R));
  } else {
    parts.edge.push(`<path d="${edgePath}" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`);
  }

  // lanes: hub to every location, the lock-up and the way out (and on out of town)
  const hub = M.hub;
  const lane = (to, bend) => {
    const pts = curve(hub, to, bend);
    roads.push(pts);
    const d = wobble(pts, R, 0.9, 9);
    parts.roadInk.push(`<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>`);
    parts.roadFill.push(`<path d="${d}" fill="none" stroke="${C.light}" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round"/>`);
  };
  const places = town.locations.map((l) => ({ ...l.map, n: l.n, name: cap(l.place), watched: [...l.waysIn, ...l.then].some((o) => o.watched), furniture: !!l.furniture }));
  places.forEach((p, i) => lane([p.x, p.y], (i % 2 ? 1 : -1) * 0.08));
  lane([M.lockup.x, M.lockup.y], 0.06);
  lane(gate, -0.05);
  {
    const pts = [gate, M.wayOut.out];
    roads.push(pts);
    const d = wobble(pts, R, 0.9, 9);
    parts.roadInk.push(`<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="15" stroke-linecap="round"/>`);
    parts.roadFill.push(`<path d="${d}" fill="none" stroke="${C.light}" stroke-width="11.5" stroke-linecap="round"/>`);
  }
  // the hub: a small open space where the lanes meet
  parts.roadInk.push(`<circle cx="${hub[0]}" cy="${hub[1]}" r="${M.hubR ?? 26}" fill="${C.ink}"/>`);
  parts.roadFill.push(`<circle cx="${hub[0]}" cy="${hub[1]}" r="${(M.hubR ?? 26) - 1.8}" fill="${C.light}"/>`);
  if (M.hubLabel) parts.labels.push({ text: M.hubLabel, x: hub[0], y: hub[1] + 5, size: SMALL, italic: true, anchor: "middle" });

  // the way out: an arrow pointing out of town, its label and an eye (always watched)
  {
    const [ax, ay] = gate, [bx, by] = M.wayOut.out;
    const len = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / len, uy = (by - ay) / len;
    const tip = [ax + ux * Math.min(len - 4, 46), ay + uy * Math.min(len - 4, 46)];
    const tail = [ax - ux * 6, ay - uy * 6];
    parts.marks.push(`<path d="M${r1(tail[0])} ${r1(tail[1])} L${r1(tip[0])} ${r1(tip[1])}" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/>`);
    parts.marks.push(`<path d="M${r1(tip[0] - ux * 11 - uy * 7)} ${r1(tip[1] - uy * 11 + ux * 7)} L${r1(tip[0])} ${r1(tip[1])} L${r1(tip[0] - ux * 11 + uy * 7)} ${r1(tip[1] - uy * 11 - ux * 7)}" fill="none" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`);
    // the label, with an eye before it (the way out is always watched)
    const L = M.wayOut.label;
    parts.marks.push(`<g class="mark">${eye(L[0] + 11, L[1] - 6)}</g>`);
    boxes.push([L[0] - 2, L[1] - 18, L[0] + 24, L[1] + 6]);
    parts.labels.push({ text: "The way out", x: L[0] + 26, y: L[1], size: LABEL, anchor: "start" });
  }

  // buildings: the locations and the lock-up
  const BW = 46, BH = 28;
  for (const p of places) {
    parts.marks.push(building(p.x, p.y, BW, BH, R));
    boxes.push([p.x - BW / 2 - 18, p.y - BH / 2 - 14, p.x + BW / 2 + 18, p.y + BH / 2 + 14]); // with its number, eye and star
    // the number on the building's left side, an eye on its right if watched, a star on a free corner for the furniture
    const nx = p.x - BW / 2 - 2, ny = p.y;
    parts.marks.push(`<circle cx="${r1(nx)}" cy="${r1(ny)}" r="11.5" fill="${C.ink}"/><text x="${r1(nx)}" y="${r1(ny + 5.6)}" font-family="${DISPLAY}" font-weight="800" font-size="15.5" fill="${C.light}" text-anchor="middle">${p.n}</text>`);
    const side = labelSide(p, hub);
    if (p.watched) parts.marks.push(`<g class="mark">${eye(p.x + BW / 2 + 3, p.y)}</g>`);
    if (p.furniture) parts.marks.push(`<g class="mark">${star(p.x + BW / 2 - 4, side === "above" ? p.y + BH / 2 + 2 : p.y - BH / 2 - 2, 9)}</g>`);
    parts.labels.push({ text: p.name, ...labelPos(p, BW, BH, side), size: LABEL });
  }
  {
    const p = M.lockup;
    parts.marks.push(building(p.x, p.y, BW, BH, R, { bars: true }));
    boxes.push([p.x - BW / 2 - 8, p.y - BH / 2 - 8, p.x + BW / 2 + 18, p.y + BH / 2 + 8]);
    parts.marks.push(`<g class="mark">${eye(p.x + BW / 2 + 3, p.y)}</g>`); // always watched
    parts.labels.push({ text: "The lock-up", ...labelPos(p, BW, BH, labelSide(p, hub)), size: LABEL });
  }

  // the labels (the --check pass measures them in the book's fonts)
  const labelSvg = [];
  for (const l of parts.labels) {
    const w = textW(l.text, l.size, !l.italic);
    const x0 = l.anchor === "start" ? l.x : l.anchor === "end" ? l.x - w : l.x - w / 2;
    labelSvg.push(`<text class="lbl" x="${r1(l.x)}" y="${r1(l.y)}" font-family="${SANS}" font-weight="${l.italic ? 500 : 700}"${l.italic ? ' font-style="italic"' : ""} font-size="${l.size}" fill="${C.ink}" text-anchor="${l.anchor}">${esc(l.text)}</text>`);
    boxes.push([x0 - 4, l.y - l.size, x0 + w + 4, l.y + l.size * 0.35]);
  }

  // the town's fabric: cottages and trees wherever nothing else is
  const nearRoad = (x, y, d) => roads.some((pts) => pts.some((p, i) => i < pts.length - 1 && segDist([x, y], p, pts[i + 1]) < d));
  const inTown = (x, y) => pointInPoly([x, y], loop.map(([px, py]) => [W / 2 + (px - W / 2) * 0.93, H / 2 + (py - H / 2) * 0.9]));
  const free = (b) => !boxes.some((c) => b[0] < c[2] && b[2] > c[0] && b[1] < c[3] && b[3] > c[1]);
  for (let tries = 0, made = 0; tries < 2500 && made < (M.cottages ?? 40); tries++) {
    const x = 30 + R() * (W - 60), y = 30 + R() * (H - 60);
    const w = 14 + R() * 10, h = 9 + R() * 6;
    const b = [x - w / 2 - 3, y - h / 2 - 3, x + w / 2 + 3, y + h / 2 + 3];
    if (!inTown(x, y) || nearRoad(x, y, 16 + Math.max(w, h) / 2) || !free(b)) continue;
    // keep near a lane, as houses line streets
    if (!nearRoad(x, y, 46)) continue;
    parts.fabric.push(cottage(x, y, w, h));
    boxes.push(b);
    made++;
  }
  for (let tries = 0, made = 0; tries < 1500 && made < (M.trees ?? 14); tries++) {
    const x = 26 + R() * (W - 52), y = 26 + R() * (H - 52), r = 5 + R() * 3;
    const b = [x - r - 3, y - r - 3, x + r + 3, y + r + 3];
    if (!inTown(x, y) || nearRoad(x, y, 12 + r) || !free(b)) continue;
    parts.fabric.push(tree(x, y, r, R));
    boxes.push(b);
    made++;
  }

  const body = [...parts.ground, ...parts.edge, ...parts.roadInk, ...parts.roadFill, ...parts.fabric, ...parts.marks, ...labelSvg].join("\n");
  // the map's alt text: its places, then what the eyes and the star mark
  const watched = town.locations.filter((l) => [...l.waysIn, ...l.then].some((o) => o.watched));
  const host = town.locations.find((l) => l.furniture);
  const eyes = watched.length === town.locations.length ? "Every location is watched" : watched.length ? `Watched: ${watched.map((l) => `${l.n} ${l.place}`).join(", ")}` : "No location is watched";
  const title = `Map of ${town.name}: ${town.locations.map((l) => `${l.n} ${l.place}`).join(", ")}, the lock-up and the way out. ${eyes}; the star marks the furniture, at ${host.place}.`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="map-${town.key}-title">\n<title id="map-${town.key}-title">${esc(title)}</title>\n${body}\n</svg>\n`;
}

/** Which side of its building a label goes: away from the hub (so off the lanes), unless the layout says. */
function labelSide(p, hub) {
  if (p.label) return p.label;
  if (p.y < hub[1] - 40) return "above";
  if (p.y > hub[1] + 40) return "below";
  return p.x < hub[0] ? "left" : "right";
}
function labelPos(p, BW, BH, side) {
  if (side === "above") return { x: p.x, y: p.y - BH / 2 - 9, anchor: "middle" };
  if (side === "left") return { x: p.x - BW / 2 - 18, y: p.y + 6, anchor: "end" };
  if (side === "right") return { x: p.x + BW / 2 + 20, y: p.y + 6, anchor: "start" };
  return { x: p.x, y: p.y + BH / 2 + 21, anchor: "middle" };
}

function segDist(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}
function pointInPoly([x, y], poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/* ------------------------------------------------------------- --check -- */
if (process.argv[1]?.endsWith("town-maps.mjs")) {
  const { chromium } = await import("playwright-core");
  const { existsSync, readFileSync } = await import("node:fs");
  const { join } = await import("node:path");
  const { pathToFileURL, fileURLToPath } = await import("node:url");
  const { loadTowns } = await import("./towns.mjs");
  const FONT_DIR = join(fileURLToPath(new URL("../../node_modules/@fontsource", import.meta.url)));
  const face = (family, pkg, weight, style) => `@font-face{font-family:"${family}";src:url("${pathToFileURL(join(FONT_DIR, pkg, "files", `${pkg}-latin-${weight}-${style}.woff2`)).href}");font-weight:${weight};font-style:${style};}`;
  const fonts = [face("Fraunces", "fraunces", 800, "normal"), ...[500, 700].flatMap((w) => [face("Alegreya Sans", "alegreya-sans", w, "normal"), face("Alegreya Sans", "alegreya-sans", w, "italic")]), face("Alegreya Sans", "alegreya-sans", 400, "normal")].join("");
  const CHROME = process.env.CHROME_PATH ?? (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
  const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
  const page = await browser.newPage();
  let bad = 0;
  for (const town of loadTowns()) {
    const file = new URL(`../art/map-${town.key}.svg`, import.meta.url);
    const svg = readFileSync(file, "utf8");
    if (svg !== townMap(town)) { console.error(`✗ map-${town.key}.svg is stale: run node book/tools/town-pages.mjs`); bad++; }
    await page.setContent(`<style>${fonts}</style><div style="width:700px">${svg}</div>`);
    await page.evaluate(() => document.fonts.ready);
    const res = await page.evaluate(() => {
      const s = document.querySelector("svg"); const vb = s.viewBox.baseVal;
      const items = [...s.querySelectorAll("text.lbl, g.mark")].map((e) => { const b = e.getBBox(); return { t: e.textContent || "mark", b: [b.x, b.y, b.x + b.width, b.y + b.height] }; });
      const solid = [...s.querySelectorAll("path[fill='#e3e1dc']")].map((e) => { const b = e.getBBox(); return [b.x, b.y, b.x + b.width, b.y + b.height]; });
      return { vb: [vb.x, vb.y, vb.width, vb.height], items, solid };
    });
    const [, , W, H] = res.vb;
    const over = (a, b, m = 0) => a[0] < b[2] - m && a[2] > b[0] + m && a[1] < b[3] - m && a[3] > b[1] + m;
    for (const it of res.items) {
      if (it.b[0] < 6 || it.b[1] < 6 || it.b[2] > W - 6 || it.b[3] > H - 6) { console.error(`✗ ${town.key}: "${it.t}" leaves the map`); bad++; }
      // a mark sits on its own building's edge by design; a label must clear every building
      if (it.t !== "mark") for (const s of res.solid) if (over(it.b, s, 1)) { console.error(`✗ ${town.key}: "${it.t}" overlaps a building`); bad++; }
    }
    for (let i = 0; i < res.items.length; i++) for (let j = i + 1; j < res.items.length; j++) {
      const a = res.items[i], b = res.items[j];
      if (a.t !== "mark" && b.t !== "mark" && over(a.b, b.b)) { console.error(`✗ ${town.key}: "${a.t}" overlaps "${b.t}"`); bad++; }
      if ((a.t === "mark") !== (b.t === "mark") && over(a.b, b.b, 0.5)) { console.error(`✗ ${town.key}: a mark overlaps "${a.t === "mark" ? b.t : a.t}"`); bad++; }
    }
    if (!bad) console.log(`✓ map-${town.key}: ${res.items.length} labels and marks inside the map, no overlaps`);
  }
  await browser.close();
  process.exit(bad ? 1 : 0);
}
