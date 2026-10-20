// Core rules model for Don't Get Forked, v0.2 rules by default (RULES flags switch each v0.2 change back to v0.1),
// with the same heuristic player policy as the v0.1 review.
// Traits: 0 Brawn, 1 Nimble, 2 Sly, 3 Charm, 4 Wits. Kinds: 1 food 2 plants 3 books 4 silver 5 tools 6 cloth.
import { joint } from './odds.mjs';
export const B = 0, N = 1, S = 2, C = 3, W = 4;
// v0.2 rule switches. setRules(V1_RULES) reproduces the v0.1 simulator exactly.
export const V2_RULES = {
  v: 2,
  chaseFixedMob: true,     // p17: mob Difficulty set when the chase starts, same for the whole chase
  chaseOneRise: true,      // p17: a local chase raises Suspicion once, when it ends, by its biggest trigger
  flightAnyRaise: true,    // p18: in the final flight any ability may be spent as a raise
  wallCrawlerRaise: true,  // p8: Wall-Crawler also makes Nimble one size bigger in a chase
  everyoneHeldForked: true,// p18: every Entity held at once -> Forked
  resultFirst: true,       // p16: a roll's result comes first (way out / rescue / slip free at the Limit)
  v2defaults: true,        // p8-11: Tireless, Fear the Curse, A Potion for That are the defaults
  limits: { Easy: 9, Standard: 10, Hard: 13 },
  thistleStrongbox: 10,    // p30: the ironmonger's strongbox is Difficulty 10 (was 8)
  giveUp: false,           // p18: a runner may give up (policy option, off by default for comparability)
  spectralNoPick: true,    // p14: a Spectral pass doesn't pick the way in (the Ghost stays past it whichever is picked)
};
export const V1_RULES = { v: 1, chaseFixedMob: false, chaseOneRise: false, flightAnyRaise: false, wallCrawlerRaise: false,
  everyoneHeldForked: false, resultFirst: false, v2defaults: false, limits: { Easy: 11, Standard: 11, Hard: 15 }, thistleStrongbox: 8, giveUp: false, spectralNoPick: false };
export const RULES = { ...V2_RULES };
export function setRules(r) { for (const k of Object.keys(RULES)) delete RULES[k]; Object.assign(RULES, r); }
export const TN = ['Brawn', 'Nimble', 'Sly', 'Charm', 'Wits'];
const SZ = [4, 6, 8, 10, 12];
export const step = (s, n) => SZ[Math.max(0, Math.min(4, SZ.indexOf(s) + n))];
let seed = 12345;
export function setSeed(x) { seed = x >>> 0; }
export function rnd() { // mulberry32
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
export const die = (n) => 1 + Math.floor(rnd() * n);

// ---- Entities (default picks) ----
export const ENT = {
  Dracula: { t: [8, 10, 6, 12, 4], weak: 1, duty: 4, sig: { kind: 'approach', trait: C, watchedOnly: true }, gift: { kind: 'trait', trait: N }, perk: 'hypnotic' },
  Creature: { t: [12, 8, 6, 4, 10], weak: 3, duty: 5, sig: { kind: 'trait', trait: B }, gift: { kind: 'approach', trait: N }, perk: 'tireless' },
  Mummy: { t: [10, 4, 6, 8, 12], weak: 3, duty: 3, sig: { kind: 'trait', trait: W }, gift: { kind: 'approach', trait: C }, perk: 'fearcurse' },
  Werewolf: { t: [10, 12, 6, 4, 8], weak: 3, duty: 2, sig: { kind: 'nosusp' }, gift: { kind: 'trait', trait: W }, perk: 'nightrunner' },
  Invisible: { t: [4, 8, 12, 6, 10], weak: 3, duty: 6, sig: { kind: 'nosusp' }, gift: { kind: 'approach', trait: N }, perk: 'outofsight' },
  Ghost: { t: [4, 12, 10, 8, 6], weak: 1, duty: 4, sig: { kind: 'approach', trait: S, notCarrying: true }, gift: { kind: 'raise' }, perk: 'spectral' },
  Witch: { t: [6, 4, 10, 8, 12], weak: 3, duty: 1, sig: { kind: 'raise' }, gift: { kind: 'trait', trait: W }, perk: 'familiar' },
  Jekyll: { t: [4, 6, 8, 12, 10], hyde: [12, 10, 8, 4, 6], weak: 3, duty: 3, sig: { kind: 'draught' }, gift: { kind: 'raise' }, perk: 'practised' },
};
export const NAMES = Object.keys(ENT);
// v0.1 defaults (Strong Back, Patience of Ages, Broomstick)
export const V1_DEFAULTS = { Creature: { perk: 'strongback' }, Mummy: { perk: 'patience' }, Witch: { gift: { kind: 'approach', trait: N } } };

export function makeEntity(name, overrides = {}) {
  const d = { ...ENT[name], ...(RULES.v2defaults ? {} : V1_DEFAULTS[name] || {}), ...overrides };
  return {
    name, ...d, form: 'J', charges: 3, max: 3, spent: 0, pos: 'out0', captured: false, out: false,
    loot: [], stepDown: 0, skip: false, acted: false, past: {}, target: null, capturedTurn: -1,
  };
}
export const traitsOf = (e) => (e.hyde && e.form === 'H' ? e.hyde : e.t);

// ---- Shared state helpers ----
export function addSusp(st, n) {
  if (st.hunt || n <= 0) return;
  st.S = Math.min(st.L, st.S + n);
  st.suspLog.push(n);
  if (st.S >= st.L) st.limitHit = true;
}

// Evaluate one configured roll. cfg: {s, sec, D, thr, loud, nosusp, rattle}
function evalCfg(cfg) {
  const j = joint(cfg.s, cfg.sec, cfg.D, cfg.thr);
  const showV = cfg.nosusp ? 0 : 2;
  const base = cfg.loud ? 1 : 0;
  // one roll one rise: max(base, T?1, show?showV). With a floor (v0.2 local chase: the biggest trigger so far),
  // the cost of this roll is only what it adds above the floor.
  const f = cfg.floor || 0; const g = (x) => Math.max(x, f) - f;
  const rise = j.showT * g(Math.max(base, 1, showV)) + j.showNotT * g(Math.max(base, showV)) + j.Tns * g(Math.max(base, 1)) + (j.pass - j.showNotT) * g(base);
  return { j, rise };
}

// Ability tokens available to roller from providers at the same place
function tokens(roller, providers, opts) {
  const out = [];
  for (const p of providers) {
    if (p.charges <= 0) continue;
    for (const ab of [p.sig, p.gift]) {
      if (!ab) continue;
      if (ab.kind === 'approach' && p !== roller) continue;
      if (opts.chase && ab.kind === 'approach') continue;
      if (opts.localChase && p !== roller) continue;
      if (ab.kind === 'draught') continue;
      out.push({ p, ab });
    }
  }
  return out;
}

// Choose the best option for a roll at an obstacle (or chase). Returns plan.
// obs: {traits:[quiet, loud|null], D, watched}; ctx: {S, L, dutyRaise, chase:'local'|'flight'|null, lambda, kappa, charge}
export function plan(roller, obs, providers, ctx) {
  const forms = roller.hyde ? (['J', 'H']) : [null];
  let best = null;
  const listed = [...obs.quiet, ...(obs.loud || [])];
  const toks = tokens(roller, providers, { chase: !!ctx.chase, localChase: ctx.chase === 'local' });
  let raiseT = [null, ...toks.filter((x) => x.ab.kind === 'raise')];
  if (ctx.chase === 'flight' && RULES.flightAnyRaise) { // p18: any ability may be spent as a raise
    raiseT = [null];
    for (const p of providers) { if (p.charges <= 0) continue; for (const ab of [p.sig, p.gift]) if (ab) raiseT.push({ p, ab, asRaise: true }); }
  }
  const traitT = [null, ...toks.filter((x) => x.ab.kind === 'trait' || x.ab.kind === 'approach')];
  const nsT = ctx.chase === 'flight' ? [null] : [null, ...toks.filter((x) => x.ab.kind === 'nosusp')];
  for (const form of forms) {
    let formCost = 0;
    if (form && form !== roller.form) {
      if (form === 'H') { if (roller.charges <= 0) continue; formCost = 1; }
      else formCost = roller.perk === 'practised' ? 0 : 1;
      if (formCost && roller.charges <= 0) continue;
    }
    const tr = form === 'H' ? roller.hyde : form === 'J' ? roller.t : traitsOf(roller);
    for (const tt of traitT) {
      let traitList; let Dmod = 0; let approach = false;
      if (!tt) traitList = [...obs.quiet.map((t) => ({ t, loud: false })), ...(obs.loud || []).map((t) => ({ t, loud: !ctx.chase }))];
      else {
        const t = tt.ab.trait;
        if (listed.includes(t)) continue; // ability trait already listed: pointless
        if (tt.ab.kind === 'approach') {
          if (tt.ab.watchedOnly && !obs.watched) continue;
          if (tt.ab.notCarrying && roller.loot.length) continue;
          approach = true; Dmod = -2; traitList = [{ t, loud: false }];
        } else {
          traitList = [{ t, loud: false }];
        }
      }
      for (const { t, loud } of traitList) for (const rt of raiseT) for (const nt of nsT) {
        // charge feasibility per provider
        const use = new Map();
        for (const x of [tt, rt, nt]) if (x) use.set(x.p, (use.get(x.p) || 0) + 1);
        if (formCost) use.set(roller, (use.get(roller) || 0) + formCost);
        let ok = true; for (const [p, n] of use) if (p.charges < n) ok = false;
        if (!ok) continue;
        if (rt && tt && rt.p === tt.p && rt.ab === tt.ab) continue; // same ability twice
        const perkRaise = !!ctx.chase && RULES.wallCrawlerRaise && roller.perk === 'wallcrawler' && t === N;
        if (rt && (ctx.dutyRaise || perkRaise)) continue; // duty (or Wall-Crawler) is the one raise
        let steps = -(roller.stepDown ? 1 : 0) - (ctx.weak ? 1 : 0);
        if (rt || ctx.dutyRaise || perkRaise) steps += 1;
        const s = step(tr[t], steps);
        const nCharges = [tt, rt, nt].filter(Boolean).length + formCost;
        const secs = ctx.chase === 'flight' || ctx.forceMonster ? [10] : [6, 10];
        for (const sec of secs) {
          if (nt && sec === 6) continue;
          const thr = roller.perk === 'hypnotic' && t === C ? 2 : 1;
          const D = Math.max(2, ctx.D + Dmod);
          const { j, rise } = evalCfg({ s, sec, D, thr, loud: loud && roller.perk !== 'lightstep', nosusp: !!nt, floor: ctx.riseFloor || 0 });
          let score;
          if (ctx.chase) {
            score = j.S + j.crit - 1.2 * j.T - (ctx.chase === 'local' ? ctx.lambda * rise : 0) - ctx.charge * nCharges;
          } else {
            const capRisk = obs.watched && !ctx.noCatch ? ctx.kappa : 0;
            score = j.pass - ctx.lambda * rise - capRisk * j.T - 0.05 * j.C - ctx.charge * nCharges;
          }
          if (!best || score > best.score) best = { score, form, t, s, sec, D, thr, loud, approach, tt, rt, nt, formCost, j, rise };
        }
      }
    }
  }
  return best;
}

// Execute a planned roll. Returns {res:'S'|'C'|'T', crit, show, rise}
export function execute(roller, pl, st, opts = {}) {
  // pay charges
  for (const x of [pl.tt, pl.rt, pl.nt]) if (x) { x.p.charges--; x.p.spent++; st.chargesSpent++; }
  if (pl.formCost) { roller.charges -= pl.formCost; roller.spent += pl.formCost; st.chargesSpent += pl.formCost; }
  if (pl.form) roller.form = pl.form;
  const a = die(pl.s), b = die(pl.sec);
  const m = a + b - pl.D;
  const res = m >= 0 ? 'S' : m >= -2 ? 'C' : 'T';
  const crit = res === 'S' && a === b;
  const show = pl.sec === 10 && b - a >= pl.thr;
  let rise = 0;
  if (pl.loud && roller.perk !== 'lightstep') rise = Math.max(rise, 1);
  if (res === 'T') rise = Math.max(rise, 1);
  if (show && !pl.nt) rise = Math.max(rise, roller.perk === 'rattle' ? 1 : 2);
  roller.stepDown = 0; // pending cost consumed
  if (roller.hyde && roller.form === 'J' && show && pl.sec === 10) roller.form = 'H';
  st.rolls++; if (crit) st.crits++; if (res === 'T') st.troubles++; if (show) st.shows++;
  return { res, crit, show, rise, a, b };
}

export const GROUND = [[S, C], [N, S], [B, N], [N, W], [C, S], [B, W]];

// ---- Chases ----
// local chase: returns 'escaped' | 'captured' | 'flight' (v0.1 only: the Limit came mid-chase and the runner wasn't cornered).
// v0.2: the chase always runs to its end; its one rise is added then (st.lastChaseRise), and the caller checks the Limit.
export function localChase(runners, st, P) {
  st.localChases++;
  const solo = runners.length === 1;
  let lead = solo && runners[0].perk === 'nightrunner' ? 2 : 1;
  const D0 = Math.min(12, 8 + Math.floor(st.S / 2));
  let chaseRise = 0; let active = runners.slice();
  const end = (r) => { if (RULES.chaseOneRise) addSusp(st, chaseRise); st.lastChaseRise = chaseRise; return r; };
  for (let round = 1; round < 100; round++) {
    // p18 giving up (policy option): solo runner, nothing raised yet, and any Trouble would bring the Limit
    if (RULES.giveUp && solo && chaseRise === 0 && st.S + 1 >= st.L && !(st.lastFree === 1)) { st.gaveUp = (st.gaveUp || 0) + 1; return end('captured'); }
    const g = GROUND[die(6) - 1];
    const D = RULES.chaseFixedMob ? D0 : Math.min(12, 8 + Math.floor(st.S / 2));
    let succ = 0, trb = 0, rise = 0;
    for (const r of active) {
      const weak = round >= r.weak;
      const Dr = solo && r.perk === 'fearcurse' ? D - 1 : D;
      const chaseTraits = r.perk === 'wallcrawler' ? [...g, N] : r.perk === 'flybynight' ? [...g, W] : g;
      const obs = { quiet: [...new Set(chaseTraits)], D: Dr, watched: false };
      // choose best of listed traits as base (no loud in chase)
      const pl = bestChasePlan(r, obs, st, P, 'local', weak, RULES.chaseOneRise ? chaseRise : 0);
      const x = execute(r, pl, st);
      if (x.res === 'S') succ += x.crit ? 2 : 1;
      if (x.res === 'T') trb++;
      rise = Math.max(rise, x.rise);
    }
    if (solo) lead += succ >= 2 ? 2 : succ === 1 ? 1 : trb ? -1 : 0;
    else { const d = succ - trb; lead += d >= 2 ? 2 : d === 1 ? 1 : d <= -2 ? -2 : d === -1 ? -1 : 0; }
    if (RULES.chaseOneRise) chaseRise = Math.max(chaseRise, rise); else { addSusp(st, rise); chaseRise += 0; }
    if (lead <= 0) { return end('captured'); }
    if (lead >= 4) return end('escaped');
    if (!RULES.chaseOneRise && st.S >= st.L) return end('flight');
  }
  return end('captured');
}

function bestChasePlan(r, obs, st, P, kind, weak, riseFloor = 0) {
  // try each listed trait separately (no loud in chases)
  let best = null;
  for (const t of obs.quiet) {
    const o = { quiet: [t], D: obs.D, watched: false };
    const sEff = st.S + riseFloor; // v0.2: Suspicion the chase will leave behind so far
    const lam = P.lambdaChase + (P.lambdaChaseSlope || 0) * (sEff / st.L) ** 2;
    const pl = plan(r, o, kind === 'local' ? [r] : st.flightParty, { chase: kind, D: obs.D, lambda: lam, charge: P.chargeChase, weak, forceMonster: kind === 'flight', riseFloor });
    if (pl && (!best || pl.score > best.score)) best = pl;
  }
  return best;
}

export function finalFlight(party, st, P) {
  st.flights++;
  st.hunt = true;
  st.flightParty = party;
  if (!party.length) return 'none';
  let lead = party.some((e) => e.perk === 'fetch') ? 3 : 2;
  for (let round = 1; round < 200; round++) {
    const g = GROUND[die(6) - 1];
    let succ = 0, trb = 0;
    for (const r of party) {
      const weak = round >= r.weak;
      const chaseTraits = r.perk === 'wallcrawler' ? [...g, N] : r.perk === 'flybynight' ? [...g, W] : g;
      const obs = { quiet: [...new Set(chaseTraits)], D: st.mob, watched: false };
      const pl = bestChasePlan(r, obs, st, P, 'flight', weak);
      const x = execute(r, pl, st);
      if (x.res === 'S') succ += x.crit ? 2 : 1;
      if (x.res === 'T') trb++;
    }
    const d = succ - trb; lead += d >= 2 ? 2 : d === 1 ? 1 : d <= -2 ? -2 : d === -1 ? -1 : 0;
    if (lead <= 0) return 'forked';
    if (lead >= st.esc) return 'escaped';
  }
  return 'forked';
}
