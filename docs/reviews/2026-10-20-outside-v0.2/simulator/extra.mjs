import { setSeed, NAMES, rnd } from './core.mjs';
import { runRaid, DEFAULT_P } from './raid.mjs';
import { PUDDLECOMBE, THISTLEWICK, GALLOWSMERE } from './towns.mjs';
const pct = (x) => (100 * x).toFixed(1) + '%';
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const R = +(process.argv[2] || 4000);
console.log('=== Exit turn and way-out/Limit clash (party of 4) ===');
for (const t of [PUDDLECOMBE, THISTLEWICK, GALLOWSMERE]) {
  setSeed(4); let n = 0, ex = 0, exN = 0, clash = 0, hist = {};
  for (let i = 0; i < R; i++) { const st = runRaid(t, shuffle(NAMES).slice(0, 4), DEFAULT_P); n++; if (st.exitTurn) { ex += st.exitTurn; exN++; hist[st.exitTurn] = (hist[st.exitTurn] || 0) + 1; } if (st.wayOutLimitClash) clash++; }
  console.log(`${t.name}: left by the way out in ${pct(exN / n)} of raids, mean exit Turn ${(ex / exN).toFixed(1)}; a passing way-out roll also filled the Limit in ${pct(clash / n)} of raids`);
  console.log('   exit-turn histogram:', JSON.stringify(hist));
}
console.log('\n=== If a passing way-out roll wins over the Limit (party of 4) ===');
for (const t of [THISTLEWICK, GALLOWSMERE]) { setSeed(4); const res = {}; for (let i = 0; i < R; i++) { const st = runRaid(t, shuffle(NAMES).slice(0, 4), { ...DEFAULT_P, outBeatsLimit: true }); res[st.result] = (res[st.result] || 0) + 1; } console.log(t.name, Object.entries(res).map(([k, v]) => `${k} ${pct(v / R)}`).join(' ')); }
console.log('\n=== Ghost perk variants, party of 4 always incl. Ghost ===');
for (const t of [THISTLEWICK, GALLOWSMERE]) for (const perk of ['spectral', 'none', 'rattle', 'alreadydead']) {
  setSeed(2); const res = {}; let skips = 0;
  for (let i = 0; i < R; i++) { const st = runRaid(t, ['Ghost', ...shuffle(NAMES.filter((x) => x !== 'Ghost')).slice(0, 3)], DEFAULT_P, { Ghost: { perk } }); res[st.result] = (res[st.result] || 0) + 1; skips += st.spectralSkips; }
  console.log(`${t.name} Ghost perk=${perk.padEnd(11)}`, Object.entries(res).sort().map(([k, v]) => `${k} ${pct(v / R)}`).join(' '), `skips/raid ${(skips / R).toFixed(2)}`);
}
console.log('\n=== Werewolf perk variants (Hard), party of 4 incl. Werewolf ===');
for (const perk of ['nightrunner', 'shortcut', 'fetch', 'none']) {
  setSeed(2); const res = {};
  for (let i = 0; i < R; i++) { const st = runRaid(GALLOWSMERE, ['Werewolf', ...shuffle(NAMES.filter((x) => x !== 'Werewolf')).slice(0, 3)], DEFAULT_P, { Werewolf: { perk } }); res[st.result] = (res[st.result] || 0) + 1; }
  console.log(`Werewolf perk=${perk.padEnd(11)}`, Object.entries(res).sort().map(([k, v]) => `${k} ${pct(v / R)}`).join(' '));
}
