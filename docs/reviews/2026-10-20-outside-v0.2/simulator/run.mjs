import { setSeed, NAMES, makeEntity, localChase, finalFlight, rnd, setRules, V1_RULES, V2_RULES, RULES } from './core.mjs';
import { runRaid, DEFAULT_P } from './raid.mjs';
import { puddlecombe, thistlewick, gallowsmere, rollTown } from './towns.mjs';
// usage: node run.mjs <mode> <raids per row> [v1|v2]
setRules((process.argv[4] || 'v2') === 'v1' ? V1_RULES : V2_RULES);
const PUDDLECOMBE = puddlecombe(), THISTLEWICK = thistlewick(), GALLOWSMERE = gallowsmere();
console.log(`# rules v${RULES.v}, Limits ${JSON.stringify(RULES.limits)}`);
const pct = (x) => (100 * x).toFixed(1) + '%';
const mode = process.argv[2] || 'all';
const NR = +(process.argv[3] || 20000);

function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

if (mode === 'chase' || mode === 'all') {
  console.log('=== Local chase, solo, default perk/abilities, by starting Suspicion (mob 8+S/2), Limit 11 vs 15 ===');
  for (const L of [11, 15]) for (const charges of [0, 3]) {
    console.log(`-- Limit ${L}, charges ${charges} --`);
    console.log('Entity      S0=0 (mob 8)        S0=4 (mob 10)       S0=8 (mob 12)   [escape / captured / ->flight ; mean Susp added]');
    for (const n of NAMES) {
      const row = [];
      for (const S0 of [0, 4, 8]) {
        let esc = 0, cap = 0, fl = 0, add = 0; const R = 20000;
        setSeed(1000 + S0);
        for (let i = 0; i < R; i++) {
          const e = makeEntity(n); e.charges = charges;
          const st = { S: S0, L, mob: 11, esc: 5, hunt: false, suspLog: [], rolls: 0, crits: 0, troubles: 0, shows: 0, chargesSpent: 0, localChases: 0, flightParty: [] };
          const r = localChase([e], st, DEFAULT_P);
          if (r === 'escaped') esc++; else if (r === 'captured') cap++; else fl++;
          add += st.S - S0;
        }
        row.push(`${pct(esc / R).padStart(6)}/${pct(cap / R).padStart(6)}/${pct(fl / R).padStart(5)} +${(add / R).toFixed(1)}`);
      }
      console.log(n.padEnd(10), row.join('  '));
    }
  }
  // Mask-only vs best policy for a d12 runner
}

if (mode === 'flight' || mode === 'all') {
  console.log('\n=== Final flight: P(escape) by party size and level, random default parties ===');
  for (const [lvl, mob, esc] of [['Easy', 10, 5], ['Standard', 11, 5], ['Hard', 11, 6]]) {
    for (const size of [1, 2, 3, 4, 5]) for (const charges of [0, 1, 3]) {
      let ok = 0; const R = 20000; setSeed(77 + size);
      for (let i = 0; i < R; i++) {
        const names = shuffle(NAMES).slice(0, size);
        const party = names.map((n) => { const e = makeEntity(n); e.charges = charges; return e; });
        const st = { S: 0, L: 99, mob, esc, hunt: false, suspLog: [], rolls: 0, crits: 0, troubles: 0, shows: 0, chargesSpent: 0, localChases: 0, flights: 0, flightParty: [] };
        if (finalFlight(party, st, DEFAULT_P) === 'escaped') ok++;
      }
      process.stdout.write(`${lvl.padEnd(8)} size ${size} charges ${charges}: ${pct(ok / R)}\n`);
    }
  }
  console.log('\n-- Final flight, Standard, party of 4: each Entity included vs not (charges 0) --');
  for (const n of NAMES) {
    let ok = 0; const R = 20000; setSeed(5);
    for (let i = 0; i < R; i++) {
      const others = shuffle(NAMES.filter((x) => x !== n)).slice(0, 3);
      const party = [n, ...others].map((m) => { const e = makeEntity(m); e.charges = 0; return e; });
      const st = { S: 0, L: 99, mob: 11, esc: 5, hunt: false, suspLog: [], rolls: 0, crits: 0, troubles: 0, shows: 0, chargesSpent: 0, localChases: 0, flights: 0, flightParty: [] };
      if (finalFlight(party, st, DEFAULT_P) === 'escaped') ok++;
    }
    console.log(n.padEnd(10), pct(ok / R));
  }
}

function raidStats(townF, sizes, R, P = DEFAULT_P, label = '', perkOverrides = {}, partyF = null) {
  const agg = { n: 0, res: {}, limit: 0, dawn: 0, flightEsc: 0, flights: 0, chases: 0, caps: 0, rolls: 0, crits: 0, troubles: 0, shows: 0, spent: 0, left: 0, s3: 0, s6: 0, sEnd: 0, tells: 0, spectral: 0, srcTell: 0, srcRoll: 0, srcCost: 0, leftBehind: 0, chargesStart: 0 };
  for (let i = 0; i < R; i++) {
    const size = sizes[i % sizes.length];
    const names = partyF ? partyF(i) : shuffle(NAMES).slice(0, size);
    const town = typeof townF === 'function' ? townF() : townF;
    const st = runRaid(town, names, P, perkOverrides);
    agg.n++; agg.res[st.result] = (agg.res[st.result] || 0) + 1;
    if (st.limitHit) agg.limit++; if (st.dawn) agg.dawn++;
    if (st.flights) { agg.flights++; if (st.flightResult === 'escaped') agg.flightEsc++; }
    agg.chases += st.localChases; agg.caps += st.captures; agg.rolls += st.rolls; agg.crits += st.crits; agg.troubles += st.troubles; agg.shows += st.shows;
    agg.spent += st.chargesSpent; agg.chargesStart += 3 * st.partySize; agg.left += st.chargesLeft; agg.s3 += st.suspAt[3]; agg.s6 += st.suspAt[6]; agg.sEnd += st.S; agg.tells += st.tells; agg.spectral += st.spectralSkips;
    agg.srcTell += st.src.tell; agg.srcRoll += st.src.roll; agg.srcCost += st.src.cost; agg.leftBehind += st.leftBehind;
  }
  const n = agg.n; const r = (k) => pct((agg.res[k] || 0) / n);
  console.log(`${label.padEnd(34)} Win ${r('Win')} Partial ${r('Partial')} Bust ${r('Bust')} Forked ${r('Forked')} | Limit hit ${pct(agg.limit / n)} dawn-flight ${pct(agg.dawn / n)} flight-escape ${agg.flights ? pct(agg.flightEsc / agg.flights) : '-'}`);
  console.log(`${''.padEnd(34)} Susp@T3 ${(agg.s3 / n).toFixed(1)} @T6 ${(agg.s6 / n).toFixed(1)} end ${(agg.sEnd / n).toFixed(1)} | per raid: rolls ${(agg.rolls / n).toFixed(1)} chases ${(agg.chases / n).toFixed(2)} captures ${(agg.caps / n).toFixed(2)} left-behind ${(agg.leftBehind / n).toFixed(2)} tells ${(agg.tells / n).toFixed(1)} spectral-skips ${(agg.spectral / n).toFixed(2)}`);
  console.log(`${''.padEnd(34)} charges spent ${pct(agg.spent / agg.chargesStart)} of starting | crit ${pct(agg.crits / agg.rolls)} trouble ${pct(agg.troubles / agg.rolls)} monster-shows ${pct(agg.shows / agg.rolls)} | Susp from rolls ${(agg.srcRoll / n).toFixed(1)} costs ${(agg.srcCost / n).toFixed(1)} tells ${(agg.srcTell / n).toFixed(1)}`);
}

if (mode === 'raid' || mode === 'all') {
  console.log('\n=== Full raids (heuristic policy; furniture ignored), random default parties ===');
  for (const [town, lbl] of [[PUDDLECOMBE, 'Puddlecombe (Easy)'], [THISTLEWICK, 'Thistlewick (Standard)'], [GALLOWSMERE, 'Gallowsmere (Hard)']]) {
    for (const size of [3, 4, 5]) { setSeed(42 + size); raidStats(town, [size], NR, DEFAULT_P, `${lbl} x${size}`); }
  }
  console.log('\n-- Rolled towns (Chapter 8 tables), party of 4 --');
  for (const lvl of ['Easy', 'Standard', 'Hard']) { setSeed(9); raidStats(() => rollTown(lvl), [4], NR, DEFAULT_P, `rolled ${lvl} x4`); }
}

if (mode === 'example') {
  setSeed(3);
  raidStats(THISTLEWICK, [4], NR, DEFAULT_P, 'Thistlewick example party', {}, () => ['Dracula', 'Witch', 'Creature', 'Werewolf']);
}

if (mode === 'variants') {
  const sizes = [3, 4, 5];
  console.log('=== Sensitivity: ST picks lose-a-Turn/smaller die instead of Suspicion on Costs ===');
  for (const [town, lbl] of [[PUDDLECOMBE, 'Easy'], [THISTLEWICK, 'Standard'], [GALLOWSMERE, 'Hard']]) { setSeed(1); raidStats(town, sizes, NR, { ...DEFAULT_P, stSusp: false }, `${lbl} ST avoids Susp`); }
  console.log('=== Sensitivity: cautious party (higher Suspicion weight) ===');
  for (const [town, lbl] of [[PUDDLECOMBE, 'Easy'], [THISTLEWICK, 'Standard'], [GALLOWSMERE, 'Hard']]) { setSeed(1); raidStats(town, sizes, NR, { ...DEFAULT_P, lambdaBase: 0.2, lambdaSlope: 0.5 }, `${lbl} cautious`); }
  console.log('=== Sensitivity: reckless party (low Suspicion weight) ===');
  for (const [town, lbl] of [[PUDDLECOMBE, 'Easy'], [THISTLEWICK, 'Standard'], [GALLOWSMERE, 'Hard']]) { setSeed(1); raidStats(town, sizes, NR, { ...DEFAULT_P, lambdaBase: 0.03, lambdaSlope: 0.05 }, `${lbl} reckless`); }
  console.log('=== Per-Entity: party of 4 always including X (Standard, Thistlewick) ===');
  for (const n of NAMES) { setSeed(2); raidStats(THISTLEWICK, [4], NR, DEFAULT_P, `with ${n}`, {}, () => [n, ...shuffle(NAMES.filter((x) => x !== n)).slice(0, 3)]); }
  console.log('=== Per-Entity: party of 4 always including X (Hard, Gallowsmere) ===');
  for (const n of NAMES) { setSeed(2); raidStats(GALLOWSMERE, [4], NR, DEFAULT_P, `with ${n}`, {}, () => [n, ...shuffle(NAMES.filter((x) => x !== n)).slice(0, 3)]); }
}
