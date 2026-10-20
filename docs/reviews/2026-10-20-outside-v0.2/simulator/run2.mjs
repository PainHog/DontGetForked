// v0.2 re-review driver. usage: node run2.mjs <mode> [N] [v1|v2] [extra]
import { setSeed, NAMES, makeEntity, localChase, finalFlight, rnd, setRules, V1_RULES, V2_RULES, RULES } from './core.mjs';
import { runRaid, DEFAULT_P } from './raid.mjs';
import { puddlecombe, thistlewick, gallowsmere, rollTown } from './towns.mjs';
const pct = (x) => (100 * x).toFixed(1);
const mode = process.argv[1].endsWith("run2.mjs") ? (process.argv[2] || "raid") : "none";
const NR = +(process.argv[3] || 6000);
const ver = process.argv[4] || 'v2';
const base = ver === 'v1' ? V1_RULES : V2_RULES;
setRules(base);
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const towns = () => [[puddlecombe(), 'Puddlecombe (Easy)'], [thistlewick(), 'Thistlewick (Standard)'], [gallowsmere(), 'Gallowsmere (Hard)']];
console.log(`# rules ${ver}: ${JSON.stringify(RULES)}`);

export function chaseRow(name, S0, L, charges, P = DEFAULT_P, over = {}, R = 20000, seed = 1000) {
  let esc = 0, cap = 0, lim = 0, escLim = 0, add = 0, rounds = 0;
  setSeed(seed + S0);
  for (let i = 0; i < R; i++) {
    const e = makeEntity(name, over); e.charges = charges;
    const st = { S: S0, L, mob: 11, esc: 5, hunt: false, suspLog: [], rolls: 0, crits: 0, troubles: 0, shows: 0, chargesSpent: 0, localChases: 0, flightParty: [], lastFree: 3 };
    const r = localChase([e], st, P);
    const hit = st.S >= L;
    if (r === 'captured') cap++; else { esc++; if (hit || r === 'flight') escLim++; }
    if (hit) lim++;
    add += st.S - S0; rounds += st.rolls;
  }
  return { esc: esc / R, cap: cap / R, lim: lim / R, escClean: (esc - escLim) / R, add: add / R, rounds: rounds / R };
}

if (mode === 'chase') {
  const Ls = [...new Set(Object.values(RULES.limits))];
  for (const L of Ls) for (const charges of [0, 3]) {
    console.log(`\n-- Local chase, solo, Limit ${L}, charges ${charges}: escape% (not cornered) / captured% / chase's rise reaches the Limit% / mean Suspicion added by the chase --`);
    console.log('| Entity | start 0 | start 4 | start 8 |');
    for (const n of NAMES) {
      const cells = [0, 4, 8].map((S0) => { if (S0 >= L) return '-'; const r = chaseRow(n, S0, L, charges); return `${pct(r.esc)} / ${pct(r.cap)} / ${pct(r.lim)}, +${r.add.toFixed(1)}`; });
      console.log(`| ${n} | ${cells.join(' | ')} |`);
    }
  }
  const L = RULES.limits.Standard;
  console.log(`\n-- Mask-only runner (chase Suspicion weight 5), Limit ${L}, 0 charges: escape / +Susp --`);
  for (const n of ['Creature', 'Dracula']) {
    const cells = [0, 4, 8].map((S0) => { const r = chaseRow(n, S0, L, 0, { ...DEFAULT_P, lambdaChase: 5 }); return `${pct(r.esc)}% +${r.add.toFixed(1)}`; });
    console.log(`| ${n} | ${cells.join(' | ')} |`);
  }
  console.log(`\n-- Shared local chase, two runners (Creature + Mummy), Limit ${L}, 0 charges --`);
  for (const S0 of [0, 4, 8]) {
    let cap = 0, esc = 0, add = 0, r1 = 0; const R = 20000; setSeed(5 + S0);
    for (let i = 0; i < R; i++) {
      const a = makeEntity('Creature'), b = makeEntity('Mummy'); a.charges = b.charges = 0;
      const st = { S: S0, L, mob: 11, esc: 5, hunt: false, suspLog: [], rolls: 0, crits: 0, troubles: 0, shows: 0, chargesSpent: 0, localChases: 0, flightParty: [] };
      const r = localChase([a, b], st, DEFAULT_P); if (r === 'captured') { cap++; if (st.rolls === 2) r1++; } else esc++; add += st.S - S0;
    }
    console.log(`start ${S0}: escape ${pct(esc / R)}% captured ${pct(cap / R)}% (in round 1: ${pct(r1 / R)}%) +${(add / R).toFixed(1)}`);
  }
}

if (mode === 'flight') {
  console.log('\n| Level (mob, escape at) | charges | 1 Entity | 3 | 4 | 5 |');
  for (const [lvl, mob, esc] of [['Easy', 10, 5], ['Standard', 11, 5], ['Hard', 11, 6]]) for (const charges of [0, 3]) {
    const row = [];
    for (const size of [1, 3, 4, 5]) {
      let ok = 0; const R = 20000; setSeed(77 + size);
      for (let i = 0; i < R; i++) {
        const party = shuffle(NAMES).slice(0, size).map((n) => { const e = makeEntity(n); e.charges = charges; return e; });
        const st = { S: 0, L: 99, mob, esc, hunt: false, suspLog: [], rolls: 0, crits: 0, troubles: 0, shows: 0, chargesSpent: 0, localChases: 0, flights: 0, flightParty: [] };
        if (finalFlight(party, st, DEFAULT_P) === 'escaped') ok++;
      }
      row.push(pct(ok / R) + '%');
    }
    console.log(`| ${lvl} (${mob}, ${esc}) | ${charges} | ${row.join(' | ')} |`);
  }
}

export function raidStats(townF, sizes, R, P = DEFAULT_P, label = '', perkOverrides = {}, partyF = null) {
  const a = { n: 0, res: {}, limit: 0, dawn: 0, flightEsc: 0, flights: 0, chases: 0, caps: 0, s3: 0, tells: 0, spent: 0, cs: 0, exit: 0, exitN: 0, allHeld: 0, left: 0, srcTell: 0, srcRoll: 0, srcCost: 0, sEnd: 0, gaveUp: 0, fTurn: 0 };
  for (let i = 0; i < R; i++) {
    const size = sizes[i % sizes.length];
    const names = partyF ? partyF(i) : shuffle(NAMES).slice(0, size);
    const town = typeof townF === 'function' ? townF() : townF;
    const st = runRaid(town, names, P, perkOverrides);
    a.n++; a.res[st.result] = (a.res[st.result] || 0) + 1;
    if (st.limitHit) a.limit++; if (st.dawn) a.dawn++; if (st.allHeld) a.allHeld++;
    if (st.flights) { a.flights++; a.fTurn += st.flightTurn || 12; if (st.flightResult === 'escaped') a.flightEsc++; }
    if (st.exitTurn) { a.exit += st.exitTurn; a.exitN++; }
    a.chases += st.localChases; a.caps += st.captures; a.s3 += st.suspAt[3]; a.tells += st.tells; a.spent += st.chargesSpent; a.cs += 3 * st.partySize;
    a.left += st.leftBehind; a.srcTell += st.src.tell; a.srcRoll += st.src.roll; a.srcCost += st.src.cost; a.sEnd += st.S; a.gaveUp += st.gaveUp || 0;
  }
  const n = a.n; const r = (k) => pct((a.res[k] || 0) / n);
  return { label, win: (a.res.Win || 0) / n, line: `| ${label} | ${r('Win')} | ${r('Partial')} | ${r('Bust')} | ${r('Forked')} | ${pct(a.limit / n)} | ${pct(a.flights / n)} | ${a.flights ? pct(a.flightEsc / a.flights) : '-'} | ${pct(a.allHeld / n)} | ${a.exitN ? (a.exit / a.exitN).toFixed(1) : '-'} | ${pct(a.dawn / n)} | ${(a.s3 / n).toFixed(1)} | ${(a.chases / n).toFixed(2)} | ${(a.caps / n).toFixed(2)} | ${(a.tells / n).toFixed(1)} | ${pct(a.spent / a.cs)} |`,
    extra: `rolls-susp ${(a.srcRoll / n).toFixed(1)} cost-susp ${(a.srcCost / n).toFixed(1)} tells ${(a.srcTell / n).toFixed(1)} end-susp ${(a.sEnd / n).toFixed(1)} left-behind ${(a.left / n).toFixed(2)} gave-up ${(a.gaveUp / n).toFixed(3)} flight-turn ${a.flights ? (a.fTurn / a.flights).toFixed(1) : '-'}` };
}
const HDR = '| Row | Win | Partial | Bust | Forked | Limit hit | Final flight | Flight escape | Everyone held | Exit Turn (way out) | Dawn | Susp after T3 | Chases | Captures | Tells | Charges spent |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|';
const show = (x, verbose = false) => { console.log(x.line); if (verbose) console.log(`|  ${x.extra} |`); };

if (mode === 'raid') {
  console.log(HDR);
  for (const [town, lbl] of towns()) for (const size of [3, 4, 5]) { setSeed(42 + size); show(raidStats(town, [size], NR, DEFAULT_P, `${lbl} x${size}`), true); }
}
if (mode === 'rolled') {
  console.log(HDR);
  for (const lvl of ['Easy', 'Standard', 'Hard']) for (const size of [3, 4, 5]) { setSeed(9 + size); show(raidStats(() => rollTown(lvl), [size], NR, DEFAULT_P, `rolled ${lvl} x${size}`), true); }
}
if (mode === 'entity') {
  console.log(HDR);
  for (const [town, lbl] of towns().slice(1)) for (const n of NAMES) { setSeed(2); show(raidStats(town, [4], NR, DEFAULT_P, `${lbl} with ${n}`, {}, () => [n, ...shuffle(NAMES.filter((x) => x !== n)).slice(0, 3)])); }
}
if (mode === 'variants') {
  console.log(HDR);
  const sizes = [3, 4, 5];
  for (const [P, nm] of [[{ ...DEFAULT_P, stSusp: false }, 'ST avoids Susp Costs'], [{ ...DEFAULT_P, lambdaBase: 0.2, lambdaSlope: 0.5 }, 'cautious'], [{ ...DEFAULT_P, lambdaBase: 0.03, lambdaSlope: 0.05 }, 'reckless']])
    for (const [town, lbl] of towns()) { setSeed(1); show(raidStats(town, sizes, NR, P, `${lbl} ${nm}`)); }
  setRules({ ...base, giveUp: true });
  for (const [town, lbl] of towns()) { setSeed(1); show(raidStats(town, sizes, NR, DEFAULT_P, `${lbl} runners may give up`), true); }
  setRules(base);
}
if (mode === 'decompose') {
  // start from v0.1 and switch on each v0.2 change alone, then all; party of 3-5, three towns
  const steps = [
    ['v0.1 rules', V1_RULES],
    ['+ Limits 9/10/13 only', { ...V1_RULES, limits: V2_RULES.limits }],
    ['+ local chase: fixed mob only', { ...V1_RULES, chaseFixedMob: true }],
    ['+ local chase: one rise only', { ...V1_RULES, chaseOneRise: true }],
    ['+ local chase: fixed mob + one rise', { ...V1_RULES, chaseFixedMob: true, chaseOneRise: true }],
    ['+ flight: any ability as a raise only', { ...V1_RULES, flightAnyRaise: true }],
    ['+ everyone held = Forked only', { ...V1_RULES, everyoneHeldForked: true }],
    ['+ result first only', { ...V1_RULES, resultFirst: true }],
    ['+ new defaults only', { ...V1_RULES, v2defaults: true }],
    ['+ Spectral pass doesn\'t pick the way in only', { ...V1_RULES, spectralNoPick: true }],
    ['+ Thistlewick strongbox 10 only', { ...V1_RULES, thistleStrongbox: 10 }],
    ['all v0.2 changes except the Limits', { ...V2_RULES, limits: V1_RULES.limits }],
    ['v0.2 rules (all)', V2_RULES],
  ];
  console.log(HDR);
  for (const [nm, r] of steps) { setRules(r); for (const [town, lbl] of towns()) { setSeed(1); show(raidStats(town, [3, 4, 5], NR, DEFAULT_P, `${lbl}: ${nm}`)); } }
  setRules(base);
}
if (mode === 'example') {
  setSeed(17); const R = NR; const h = {}; const arr = [];
  const t = thistlewick();
  for (let i = 0; i < R; i++) { const st = runRaid(t, ['Dracula', 'Witch', 'Creature', 'Werewolf'], DEFAULT_P); const s = st.suspAt[3]; arr.push(s); h[s] = (h[s] || 0) + 1; }
  arr.sort((a, b) => a - b);
  console.log('Example party, Thistlewick, Suspicion after Turn 3: median', arr[Math.floor(R / 2)], 'P(>=6)', pct(arr.filter((x) => x >= 6).length / R) + '%', JSON.stringify(h));
  setSeed(3); show(raidStats(t, [4], R, DEFAULT_P, 'Thistlewick, example party', {}, () => ['Dracula', 'Witch', 'Creature', 'Werewolf']), true);
}
if (mode === 'perks') {
  console.log(HDR);
  const R = NR;
  const cases = [
    ['Dracula', ['hypnotic', 'wallcrawler', 'oldmoney_none']],
    ['Mummy', ['fearcurse', 'patience']],
    ['Werewolf', ['nightrunner', 'shortcut', 'fetch']],
    ['Ghost', ['spectral', 'rattle', 'alreadydead']],
    ['Invisible', ['outofsight', 'pockets', 'lightstep']],
  ];
  for (const [town, lbl] of towns().slice(1)) for (const [n, perks] of cases) for (const perk of perks) {
    setSeed(2); show(raidStats(town, [4], R, DEFAULT_P, `${lbl} ${n} perk=${perk}`, { [n]: { perk } }, () => [n, ...shuffle(NAMES.filter((x) => x !== n)).slice(0, 3)]));
  }
  for (const [town, lbl] of towns().slice(1)) for (const [gn, gift] of [['Potion (Wits)', { kind: 'trait', trait: 4 }], ['Broomstick (Nimble approach)', { kind: 'approach', trait: 1 }], ['Black Cat', { kind: 'nosusp' }]]) {
    setSeed(2); show(raidStats(town, [4], R, DEFAULT_P, `${lbl} Witch gift=${gn}`, { Witch: { gift } }, () => ['Witch', ...shuffle(NAMES.filter((x) => x !== 'Witch')).slice(0, 3)]));
  }
}
if (mode === 'chaseperks') {
  const L = RULES.limits.Standard;
  console.log(`Local chase, solo, 0 charges, Limit ${L}: escape% at start 0 / 4 / 8`);
  for (const [n, over, nm] of [['Dracula', {}, 'Dracula Hypnotic (default)'], ['Dracula', { perk: 'wallcrawler' }, 'Dracula Wall-Crawler'], ['Witch', {}, 'Witch Familiar (default)'], ['Witch', { perk: 'flybynight' }, 'Witch Fly by Night'], ['Werewolf', {}, 'Werewolf Night Runner'], ['Werewolf', { perk: 'none' }, 'Werewolf no perk'], ['Mummy', {}, 'Mummy Fear the Curse (default)'], ['Mummy', { perk: 'patience' }, 'Mummy Patience'], ['Dracula', { weak: 3 }, 'Dracula if Soon'], ['Ghost', {}, 'Ghost (Always)'], ['Ghost', { weak: 3 }, 'Ghost if Soon']]) {
    const cells = [0, 4, 8].map((S0) => { const r = chaseRow(n, S0, L, 0, DEFAULT_P, over, 20000, 99); return `${pct(r.esc)} (+${r.add.toFixed(1)})`; });
    console.log(`| ${nm} | ${cells.join(' | ')} |`);
  }
}
