/**
 * The Halloween one-shot's battle map: Hallowby on Lantern Night, for a Foundry scene the players move their tokens
 * on (tools/demo-art.mjs renders it to assets/demo/hallowby-map.jpg). Drawn from the town's layout in
 * book/demo/hallowby.json (the same positions as the Storyteller's map, book/tools/town-maps.mjs), at a size where
 * each place has a yard big enough for a whole party's tokens.
 *
 * It is the players' map, so it shows only what they can see: the four places on the list, the lock-up and the way
 * out, by name and number (the script's numbers), the lanes between them, the square, the town, the brook and the
 * bridge, the woods, and the turnip lanterns. No watched eyes and no furniture star: those are the Storyteller's.
 * Every move takes one Turn, so the map shows where things are, never how far.
 *
 * A stand-in, like the book's other art, until the illustrator's map arrives: flat shapes and gradients only (no
 * filters, no external images), seeded so the same data always draws the same map.
 *   sceneMap(town) → { svg, width, height, places: { key: { x, y, label } } } in layout units (the town's map w × h)
 */
import { rng, r1 } from "./art-gen/lib.mjs";

const SANS = "'Alegreya Sans', 'Segoe UI', sans-serif";
const DISPLAY = "'Fraunces', Georgia, serif";
const hash = (s) => [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261) >>> 0;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** A night palette for the stand-in map (the book's art palette is still undecided: book/art/README.md). */
const N = {
  sky: "#141a1d", ground: "#1d2427", grass: "#263035", woods: "#11181a", woodsRim: "#1f2a2b",
  lane: "#6d655a", laneEdge: "#2c2824", cobble: "#857b6d", yard: "#4b463f", yardEdge: "#2a2622",
  wall: "#b9ab92", wallShade: "#8f8370", roof: "#3c3330", roofLine: "#2a2321", door: "#2a2321",
  glow: "#f2a33a", glowHot: "#ffd38a", water: "#24404a", waterLine: "#3d6470",
  bone: "#efe6d2", ink: "#0e1112", banner: "#2b2423", bannerEdge: "#b38a4a", stone: "#7d7a74", stoneDark: "#4e4c48",
};

/** A small seeded wobble along a closed outline, so shapes read as drawn by hand. */
function blob(cx, cy, rx, ry, R, n = 18, amp = 0.08) {
  const ph = R() * 6.28;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + amp * Math.sin(3 * a + ph) + amp * 0.6 * Math.sin(5 * a + ph * 1.3);
    return [cx + rx * Math.cos(a) * k, cy + ry * Math.sin(a) * k];
  });
  // a smooth closed curve through the points (quadratic midpoints)
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M${r1(mid(pts[n - 1], pts[0])[0])} ${r1(mid(pts[n - 1], pts[0])[1])}`;
  for (let i = 0; i < n; i++) { const m = mid(pts[i], pts[(i + 1) % n]); d += ` Q${r1(pts[i][0])} ${r1(pts[i][1])} ${r1(m[0])} ${r1(m[1])}`; }
  return d + " Z";
}

/** A lantern: a warm glow with a turnip face in it. */
function lantern(x, y, s = 1) {
  return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})"><circle r="7" fill="url(#glow)"/><circle r="2.3" fill="${N.glow}" stroke="${N.ink}" stroke-width="0.4"/><path d="M-1.1 -0.5 l0.5 -0.6 l0.5 0.6 M0.1 -0.5 l0.5 -0.6 l0.5 0.6 M-1.2 0.7 q1.2 0.9 2.4 0" fill="none" stroke="${N.ink}" stroke-width="0.35" stroke-linecap="round"/></g>`;
}

/** A building seen from above at a slant: walls, a pitched roof with its ridge and tiles, lit windows, a door. */
function building(cx, cy, w, h, R, { door = "s", windows = 3, sign = null, stone = false } = {}) {
  const x0 = cx - w / 2, y0 = cy - h / 2;
  const wall = stone ? N.stone : N.wall, shade = stone ? N.stoneDark : N.wallShade;
  let s = `<rect x="${r1(x0 + 1.4)}" y="${r1(y0 + 2)}" width="${r1(w)}" height="${r1(h)}" rx="1" fill="${N.ink}" opacity="0.55"/>`; // shadow
  // the front wall (facing the yard) shows below the roof
  const fh = Math.min(7, h * 0.32);
  s += `<rect x="${r1(x0)}" y="${r1(y0 + h - fh)}" width="${r1(w)}" height="${r1(fh)}" fill="${wall}" stroke="${N.ink}" stroke-width="0.6"/>`;
  s += `<rect x="${r1(x0)}" y="${r1(y0 + h - fh)}" width="${r1(w * 0.12)}" height="${r1(fh)}" fill="${shade}"/>`;
  // windows along the front, lit
  for (let i = 0; i < windows; i++) {
    const wx = x0 + (w * (i + 1)) / (windows + 1) - 1.6;
    if (door === "s" && Math.abs(wx + 1.6 - cx) < 3) continue;
    s += `<rect x="${r1(wx)}" y="${r1(y0 + h - fh + 1.4)}" width="3.2" height="${r1(fh - 3)}" fill="${N.glow}" stroke="${N.ink}" stroke-width="0.4"/>`;
    s += `<path d="M${r1(wx + 1.6)} ${r1(y0 + h - fh + 1.4)} v${r1(fh - 3)}" stroke="${N.ink}" stroke-width="0.3"/>`;
  }
  if (door === "s") s += `<rect x="${r1(cx - 1.8)}" y="${r1(y0 + h - fh + 1)}" width="3.6" height="${r1(fh - 1)}" fill="${N.door}" stroke="${N.ink}" stroke-width="0.4"/>`;
  // the roof: two slopes meeting at the ridge, tiles hatched on the near slope
  const ry = y0 + (h - fh) * 0.42;
  s += `<path d="M${r1(x0 - 1)} ${r1(y0 + h - fh)} L${r1(x0 + 2)} ${r1(ry)} L${r1(x0 + w - 2)} ${r1(ry)} L${r1(x0 + w + 1)} ${r1(y0 + h - fh)} Z" fill="${N.roof}" stroke="${N.ink}" stroke-width="0.7" stroke-linejoin="round"/>`;
  s += `<path d="M${r1(x0 + 2)} ${r1(ry)} L${r1(x0 + 4)} ${r1(y0)} L${r1(x0 + w - 4)} ${r1(y0)} L${r1(x0 + w - 2)} ${r1(ry)} Z" fill="${N.roofLine}" stroke="${N.ink}" stroke-width="0.7" stroke-linejoin="round"/>`;
  for (let k = 1; k < 4; k++) {
    const yy = ry + ((y0 + h - fh - ry) * k) / 4;
    s += `<path d="M${r1(x0 + 1)} ${r1(yy)} L${r1(x0 + w - 1)} ${r1(yy)}" stroke="${N.roofLine}" stroke-width="0.5"/>`;
  }
  // a chimney with a little smoke
  const chx = x0 + w * (0.2 + R() * 0.6);
  s += `<rect x="${r1(chx - 1.6)}" y="${r1(y0 - 2.5)}" width="3.2" height="5" fill="${N.stoneDark}" stroke="${N.ink}" stroke-width="0.5"/>`;
  s += `<path d="M${r1(chx)} ${r1(y0 - 3)} q-2 -3 0 -5 t0 -5" fill="none" stroke="${N.bone}" stroke-width="0.6" opacity="0.25" stroke-linecap="round"/>`;
  if (sign) s += signBoard(x0 + w + 2.5, y0 + h - fh - 1, sign);
  return s;
}

/** A hanging sign beside a door: a board on a bracket with a simple picture. */
function signBoard(x, y, kind) {
  let pic = "";
  if (kind === "tankard") pic = `<path d="M-2 -2 h3.2 v4.6 h-3.2 Z M1.2 -1.2 q1.6 0 1.6 1.4 q0 1.4 -1.6 1.4" fill="${N.bone}" stroke="${N.ink}" stroke-width="0.35"/>`;
  if (kind === "flower") pic = `<g fill="${N.glow}" stroke="${N.ink}" stroke-width="0.3">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${r1(Math.cos((a * Math.PI) / 180) * 1.4)}" cy="${r1(Math.sin((a * Math.PI) / 180) * 1.4)}" r="1.1"/>`).join("")}</g><circle r="0.8" fill="${N.ink}"/>`;
  if (kind === "saw") pic = `<path d="M-2.8 0.8 L2.4 -1.6 L2.8 -0.6 L-2.4 1.8 Z" fill="${N.bone}" stroke="${N.ink}" stroke-width="0.3"/><path d="M-2.2 1.9 l0.4 0.6 l0.4 -0.8 l0.4 0.6 l0.4 -0.8 l0.4 0.6 l0.4 -0.8" fill="none" stroke="${N.ink}" stroke-width="0.3"/>`;
  if (kind === "scissors") pic = `<g fill="none" stroke="${N.bone}" stroke-width="0.6"><circle cx="-1.6" cy="1.6" r="0.9"/><circle cx="1.6" cy="1.6" r="0.9"/><path d="M-1 1 L1.6 -2.4 M1 1 L-1.6 -2.4"/></g>`;
  return `<g transform="translate(${r1(x)} ${r1(y)})"><path d="M-2.5 -4.5 h4" stroke="${N.ink}" stroke-width="0.6"/><path d="M-1 -4.5 v1.2 M1 -4.5 v1.2" stroke="${N.ink}" stroke-width="0.35"/><rect x="-3.6" y="-3.3" width="7.2" height="6.6" rx="0.8" fill="${N.banner}" stroke="${N.bannerEdge}" stroke-width="0.5"/><g transform="translate(0 0)">${pic}</g></g>`;
}

/** A name on a ribbon. */
function banner(x, y, text, n = null) {
  const size = 7.4;
  const w = text.length * size * 0.56 + (n ? 15 : 8);
  const x0 = x - w / 2;
  let s = `<path d="M${r1(x0 - 4)} ${r1(y - 4.6)} l3 4.6 l-3 4.6 h5 v-9.2 Z M${r1(x0 + w + 4)} ${r1(y - 4.6)} l-3 4.6 l3 4.6 h-5 v-9.2 Z" fill="${N.roofLine}" stroke="${N.bannerEdge}" stroke-width="0.5" stroke-linejoin="round"/>`;
  s += `<rect x="${r1(x0)}" y="${r1(y - 5.6)}" width="${r1(w)}" height="11.2" rx="1.2" fill="${N.banner}" stroke="${N.bannerEdge}" stroke-width="0.7"/>`;
  let tx = x;
  if (n) {
    s += `<circle cx="${r1(x0 + 5.6)}" cy="${r1(y)}" r="3.9" fill="${N.bone}"/><text x="${r1(x0 + 5.6)}" y="${r1(y + 2.3)}" text-anchor="middle" font-family="${DISPLAY}" font-weight="900" font-size="6" fill="${N.ink}">${n}</text>`;
    tx = x + 4;
  }
  s += `<text x="${r1(tx)}" y="${r1(y + 2.6)}" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="${size}" letter-spacing="0.2" fill="${N.bone}">${esc(text)}</text>`;
  return s;
}

const tree = (x, y, r, R, rim = N.woodsRim, fill = N.woods) =>
  `<path d="${blob(x, y, r, r * 0.92, R, 12, 0.1)}" fill="${fill}" stroke="${rim}" stroke-width="${r1(Math.max(0.5, r * 0.12))}"/>`
  + `<path d="M${r1(x - r * 0.4)} ${r1(y - r * 0.15)} q${r1(r * 0.35)} ${r1(-r * 0.45)} ${r1(r * 0.75)} ${r1(-r * 0.05)}" fill="none" stroke="${rim}" stroke-width="${r1(Math.max(0.4, r * 0.08))}" stroke-linecap="round"/>`;

/** The places: the town's locations, the lock-up and the way out, with where their yards and banners go. */
function placesOf(t) {
  const M = t.map;
  const pretty = (s) => s.replace(/^the /, "The ").replace(/(^|\s)(\w)/g, (m, a, b) => a + b.toUpperCase());
  const out = {};
  t.locations.forEach((l) => {
    const up = l.map.y < M.hub[1];
    out[l.key] = { x: l.map.x, y: l.map.y, n: l.n, label: pretty(l.place), bannerY: up ? l.map.y - 44 : l.map.y + 44, kind: l.key };
  });
  out.lockup = { x: M.lockup.x, y: M.lockup.y + 16, label: "The Lock-up", bannerY: M.lockup.y + 49, kind: "lockup" };
  out.wayout = { x: M.wayOut.at[0] - 62, y: M.wayOut.at[1], label: "The Way Out", bannerY: M.wayOut.at[1] - 33, kind: "wayout" };
  return out;
}

const SIGNS = { tavern: "tankard", florist: "flower", carpenter: "saw", tailor: "scissors" };

/** The battle map for one town (its layout from the town's `map`, as on the Storyteller's map). */
export function sceneMap(town) {
  const M = town.map;
  const W = M.w, H = M.h;
  const R = rng(hash(`${town.key}-scene`));
  const P = placesOf(town);
  const hub = M.hub;
  const L = [];
  const avoid = []; // [cx, cy, rx, ry] areas the town's fabric keeps off

  L.push(`<defs>
    <radialGradient id="glow"><stop offset="0" stop-color="${N.glowHot}" stop-opacity="0.9"/><stop offset="0.35" stop-color="${N.glow}" stop-opacity="0.45"/><stop offset="1" stop-color="${N.glow}" stop-opacity="0"/></radialGradient>
    <radialGradient id="pool"><stop offset="0" stop-color="${N.glow}" stop-opacity="0.16"/><stop offset="1" stop-color="${N.glow}" stop-opacity="0"/></radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.55"/></radialGradient>
    <pattern id="grass" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M1 7 l1 -2 M5 3 l1 -2 M6.5 8 l0.8 -1.6" stroke="${N.grass}" stroke-width="0.6" stroke-linecap="round"/></pattern>
    <pattern id="cobbles" width="5" height="4" patternUnits="userSpaceOnUse"><rect width="5" height="4" fill="${N.yard}"/><path d="M0 2 h5 M2.5 0 v2 M0 2 v2 M5 2 v2" stroke="${N.yardEdge}" stroke-width="0.35"/></pattern>
  </defs>`);

  // ground, grass and the woods round the edge
  L.push(`<rect width="${W}" height="${H}" fill="${N.ground}"/><rect width="${W}" height="${H}" fill="url(#grass)"/>`);
  const inTown = (x, y) => ((x - W / 2) / (W / 2 - 30)) ** 2 + ((y - H / 2) / (H / 2 - 24)) ** 2 < 1;

  // the brook, north to south past the way out, and the path beyond the bridge
  const bx = M.wayOut.at[0] - 18; // the brook and bridge sit a little inside the edge on this map
  const brook = [];
  for (let y = -10; y <= H + 10; y += 10) brook.push([bx + 7 * Math.sin(y / 37) + 3 * Math.sin(y / 13), y]);
  const bd = "M" + brook.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(" L");
  L.push(`<path d="${bd}" fill="none" stroke="${N.ink}" stroke-width="16" stroke-linecap="round"/><path d="${bd}" fill="none" stroke="${N.water}" stroke-width="13" stroke-linecap="round"/>`);
  for (let k = 0; k < 18; k++) {
    const y = 10 + R() * (H - 20), x = bx + 7 * Math.sin(y / 37) + 3 * Math.sin(y / 13) + (R() - 0.5) * 6;
    if (Math.abs(y - hub[1]) < 14) continue;
    L.push(`<path d="M${r1(x - 2)} ${r1(y)} q1 -1 2 0 t2 0" fill="none" stroke="${N.waterLine}" stroke-width="0.5" stroke-linecap="round"/>`);
  }
  L.push(`<path d="M${r1(bx + 8)} ${r1(M.wayOut.at[1])} C${r1(bx + 18)} ${r1(M.wayOut.at[1] - 4)} ${r1(W - 12)} ${r1(M.wayOut.at[1] - 16)} ${r1(W + 2)} ${r1(M.wayOut.at[1] - 30)}" fill="none" stroke="${N.laneEdge}" stroke-width="9" stroke-linecap="round"/>`);
  L.push(`<path d="M${r1(bx + 8)} ${r1(M.wayOut.at[1])} C${r1(bx + 18)} ${r1(M.wayOut.at[1] - 4)} ${r1(W - 12)} ${r1(M.wayOut.at[1] - 16)} ${r1(W + 2)} ${r1(M.wayOut.at[1] - 30)}" fill="none" stroke="${N.lane}" stroke-width="6.5" stroke-linecap="round"/>`);

  // woods outside the town
  const woods = [];
  for (let k = 0; k < 520; k++) {
    const x = R() * W, y = R() * H;
    if (inTown(x, y) || Math.abs(x - bx) < 11) continue;
    if (x > bx && Math.abs(y - (M.wayOut.at[1] - ((x - bx) / (W - bx)) * 30)) < 9) continue;
    woods.push([x, y, 5 + R() * 6]);
  }
  woods.sort((a, b) => a[1] - b[1]).forEach(([x, y, r]) => L.push(tree(x, y, r, R)));

  // the town's edge: a low hedge
  L.push(`<path d="${blob(W / 2 - 4, H / 2, W / 2 - 34, H / 2 - 27, R, 26, 0.02)}" fill="none" stroke="${N.woodsRim}" stroke-width="4.5" stroke-dasharray="3 2.2" stroke-linecap="round"/>`);

  // the lanes: from the square to each place
  const lanes = Object.values(P).map((p) => {
    const ty = p.kind === "wayout" ? p.y : p.kind === "lockup" ? p.y - 14 : p.y + (p.y < hub[1] ? 26 : -26);
    return [hub, [p.x, ty]];
  });
  const laneD = ([a, b]) => {
    const mx = (a[0] + b[0]) / 2 + (R() - 0.5) * 16, my = (a[1] + b[1]) / 2 + (R() - 0.5) * 12;
    return `M${r1(a[0])} ${r1(a[1])} Q${r1(mx)} ${r1(my)} ${r1(b[0])} ${r1(b[1])}`;
  };
  const laneDs = lanes.map(laneD);
  laneDs.forEach((d) => L.push(`<path d="${d}" fill="none" stroke="${N.laneEdge}" stroke-width="15" stroke-linecap="round"/>`));
  laneDs.forEach((d) => L.push(`<path d="${d}" fill="none" stroke="${N.lane}" stroke-width="12" stroke-linecap="round"/>`));
  laneDs.forEach((d) => L.push(`<path d="${d}" fill="none" stroke="${N.cobble}" stroke-width="10" stroke-dasharray="0.6 2.4" stroke-linecap="round" opacity="0.6"/>`));
  lanes.forEach(([a, b]) => { for (let t = 0.12; t < 1; t += 0.11) avoid.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, 13, 13]); });

  // the square: cobbles, a well, lanterns round it
  L.push(`<circle cx="${hub[0]}" cy="${hub[1]}" r="32" fill="${N.laneEdge}"/><circle cx="${hub[0]}" cy="${hub[1]}" r="30" fill="url(#cobbles)"/>`);
  L.push(`<circle cx="${hub[0]}" cy="${hub[1]}" r="7" fill="${N.stone}" stroke="${N.ink}" stroke-width="0.8"/><circle cx="${hub[0]}" cy="${hub[1]}" r="4.6" fill="${N.water}" stroke="${N.ink}" stroke-width="0.6"/><path d="M${hub[0] - 7} ${hub[1] - 6} h14" stroke="${N.ink}" stroke-width="1"/>`);
  avoid.push([hub[0], hub[1], 40, 40]);
  for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2 + 0.3; L.push(lantern(hub[0] + Math.cos(a) * 24, hub[1] + Math.sin(a) * 24, 0.9)); }

  // the yards (where tokens stand) and their buildings
  for (const p of Object.values(P)) {
    if (p.kind === "wayout") continue;
    const big = p.kind !== "lockup";
    const yw = big ? 58 : 34, yh = big ? 36 : 22;
    const yy = p.kind === "lockup" ? p.y : p.y + (p.y < hub[1] ? 6 : -6);
    avoid.push([p.x, p.y, yw + 22, yh + 30]);
    L.push(`<path d="${blob(p.x, yy, yw, yh, R, 16, 0.05)}" fill="url(#pool)"/>`);
    L.push(`<path d="${blob(p.x, yy, yw * 0.86, yh * 0.8, R, 16, 0.04)}" fill="url(#cobbles)" stroke="${N.yardEdge}" stroke-width="1.2"/>`);
    // the building stands at the yard's far side from the square
    const by = p.kind === "lockup" ? yy - 11 : p.y < hub[1] ? yy - yh * 0.8 + 2 : yy + yh * 0.8 - 26;
    if (p.kind === "lockup") L.push(building(p.x, by, 26, 15, R, { windows: 0, stone: true }) + bars(p.x, by + 5));
    else if (p.y < hub[1]) L.push(building(p.x, by, 62, 24, R, { windows: 4, sign: SIGNS[p.kind] }));
    else L.push(building(p.x, by + 2, 62, 24, R, { windows: 4, sign: SIGNS[p.kind] }));
    // lanterns at the yard's edge
    for (let k = 0; k < 4; k++) { const a = (k / 4) * Math.PI * 2 + 0.6 + R() * 0.3; L.push(lantern(p.x + Math.cos(a) * yw * 0.88, yy + Math.sin(a) * yh * 0.82, 0.8)); }
  }
  // the way out: the bridge, and a little clearing on the town side where the party gathers
  const wo = P.wayout;
  L.push(`<path d="${blob(wo.x + 8, wo.y, 30, 22, R, 14, 0.05)}" fill="url(#pool)"/><path d="${blob(wo.x + 6, wo.y, 26, 18, R, 14, 0.04)}" fill="url(#cobbles)" stroke="${N.yardEdge}" stroke-width="1.2"/>`);
  avoid.push([wo.x + 6, wo.y, 44, 36]);
  L.push(`<rect x="${r1(bx - 12)}" y="${r1(wo.y - 7)}" width="24" height="14" rx="2" fill="${N.stone}" stroke="${N.ink}" stroke-width="0.9"/>`);
  for (let k = 0; k < 6; k++) L.push(`<path d="M${r1(bx - 10 + k * 4)} ${r1(wo.y - 6)} v12" stroke="${N.stoneDark}" stroke-width="0.6"/>`);
  L.push(`<path d="M${r1(bx - 12)} ${r1(wo.y - 7)} h24 M${r1(bx - 12)} ${r1(wo.y + 7)} h24" stroke="${N.ink}" stroke-width="1.6"/>`);
  L.push(lantern(bx - 12, wo.y - 8, 0.9) + lantern(bx + 12, wo.y + 8, 0.9));
  L.push(`<text x="${r1(W - 16)}" y="${r1(wo.y + 14)}" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="4.2" letter-spacing="0.5" fill="${N.bone}" opacity="0.9"><tspan x="${r1(W - 16)}">TO THE</tspan><tspan x="${r1(W - 16)}" dy="5.2">CASTLE</tspan></text>`);

  // the town's fabric: cottages with lit windows, and trees, kept off the lanes and yards
  const clear = (x, y, rx, ry) => avoid.every(([ax, ay, arx, ary]) => ((x - ax) / (arx + rx)) ** 2 + ((y - ay) / (ary + ry)) ** 2 > 1);
  const fabric = [];
  for (let k = 0, placed = 0; k < 1600 && placed < 46; k++) {
    const x = 40 + R() * (W - 80), y = 30 + R() * (H - 60);
    const w = 14 + R() * 10, h = 9 + R() * 5;
    if (!inTown(x, y) || Math.abs(x - bx) < 24 || !clear(x, y, w * 0.7, h * 0.8)) continue;
    avoid.push([x, y, w * 0.6, h * 0.7]);
    fabric.push([y, building(x, y, w, h, R, { windows: Math.max(1, Math.round(w / 8)), door: R() < 0.5 ? "s" : "n" })]);
    placed++;
  }
  for (let k = 0, placed = 0; k < 1200 && placed < 34; k++) {
    const x = 36 + R() * (W - 72), y = 26 + R() * (H - 52);
    const r = 4 + R() * 3;
    if (!inTown(x, y) || Math.abs(x - bx) < 14 || !clear(x, y, r, r)) continue;
    avoid.push([x, y, r, r]);
    fabric.push([y, tree(x, y, r, R, "#2f3d33", "#1c2a22")]);
    placed++;
  }
  fabric.sort((a, b) => a[0] - b[0]).forEach(([, s]) => L.push(s));
  for (let k = 0, placed = 0; k < 600 && placed < 26; k++) {
    const [a, b] = lanes[Math.floor(R() * lanes.length)];
    const t = 0.2 + R() * 0.6, side = R() < 0.5 ? -1 : 1;
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
    const x = a[0] + dx * t - (dy / len) * 9 * side, y = a[1] + dy * t + (dx / len) * 9 * side;
    L.push(lantern(x, y, 0.7)); placed++;
  }

  // names on ribbons, over everything
  for (const p of Object.values(P)) L.push(banner(p.x, p.bannerY, p.label, p.n ?? null));
  // a title cartouche
  L.push(`<g transform="translate(18 16)"><rect width="104" height="30" rx="2" fill="${N.banner}" stroke="${N.bannerEdge}" stroke-width="0.9"/><text x="52" y="15.5" text-anchor="middle" font-family="${DISPLAY}" font-weight="900" font-size="12.5" fill="${N.bone}">Hallowby</text><text x="52" y="24.5" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="5" letter-spacing="1.2" fill="${N.glow}">ON LANTERN NIGHT</text></g>`);
  L.push(`<rect width="${W}" height="${H}" fill="url(#vignette)"/>`);
  L.push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke="${N.bannerEdge}" stroke-width="1.6"/>`);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Map of ${esc(town.name)} on Lantern Night for the players: ${Object.values(P).map((p) => (p.n ? `${p.n} ${p.label.toLowerCase()}` : p.label.toLowerCase())).join(", ")}.">\n${L.join("\n")}\n</svg>\n`;
  return { svg, width: W, height: H, places: Object.fromEntries(Object.entries(P).map(([k, p]) => [k, { x: p.x, y: p.y, label: p.label, n: p.n ?? null }])) };
}

function bars(x, y) {
  let s = `<rect x="${r1(x - 6)}" y="${r1(y - 1)}" width="12" height="5" fill="${N.ink}"/>`;
  for (let i = 0; i < 5; i++) s += `<path d="M${r1(x - 5 + i * 2.5)} ${r1(y - 1)} v5" stroke="${N.stone}" stroke-width="0.7"/>`;
  return s;
}
