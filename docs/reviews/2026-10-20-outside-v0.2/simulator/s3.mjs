import { setSeed, NAMES, rnd } from './core.mjs';
import { runRaid, DEFAULT_P } from './raid.mjs';
import { THISTLEWICK } from './towns.mjs';
import { joint } from './odds.mjs';
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
setSeed(17); const R = 4000; const h = {}; let ge8 = 0; const arr = [];
for (let i = 0; i < R; i++) { const st = runRaid(THISTLEWICK, ['Dracula', 'Witch', 'Creature', 'Werewolf'], DEFAULT_P); const s = st.suspAt[3]; arr.push(s); h[s] = (h[s] || 0) + 1; if (s >= 8) ge8++; }
arr.sort((a, b) => a - b);
console.log('Example party, Thistlewick, Suspicion after Turn 3: median', arr[R / 2], 'P(>=8)', (100 * ge8 / R).toFixed(1) + '%', JSON.stringify(h));
console.log('\nOverdraw marginal Suspicion on a single Monster roll (vs D8 / D10): 2 - E[rise without overdraw]');
for (const s of [4, 6, 8, 10, 12]) console.log(`d${s}: D8 ${(2 - joint(s, 10, 8).rise).toFixed(2)}  D10 ${(2 - joint(s, 10, 10).rise).toFixed(2)}   (on a Mask roll it would be ${(2 - joint(s, 6, 8).rise).toFixed(2)} / ${(2 - joint(s, 6, 10).rise).toFixed(2)})`);
// group check of 3 on Monster with d8 traits: P(someone shows)
const p = joint(8, 10, 8).show; console.log('\nGroup check, 3 Entities on Monster with d8 traits: P(at least one shows) =', (100 * (1 - (1 - p) ** 3)).toFixed(1) + '%');
