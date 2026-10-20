import { setSeed, NAMES, rnd, setRules, V2_RULES } from './core.mjs';
import { runRaid, DEFAULT_P } from './raid.mjs';
import { thistlewick, gallowsmere } from './towns.mjs';
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
for (const snp of [false, true]) {
  setRules({ ...V2_RULES, spectralNoPick: snp });
  for (const t of [thistlewick(), gallowsmere()]) {
    setSeed(2); let w = 0, sk = 0; const R = 2000;
    for (let i = 0; i < R; i++) { const st = runRaid(t, ['Ghost', ...shuffle(NAMES.filter((x) => x !== 'Ghost')).slice(0, 3)], DEFAULT_P); if (st.result === 'Win') w++; sk += st.spectralSkips; }
    console.log(`spectralNoPick=${snp} ${t.name}: Win ${(100 * w / R).toFixed(1)} skips ${(sk / R).toFixed(2)}`);
  }
}
