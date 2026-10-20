// One raid, v0.2 rules by default (see RULES in core.mjs), with the v0.1 heuristic party policy. Furniture is ignored (no Grand Years).
import { B, N, S, C, W, die, makeEntity, plan, execute, localChase, finalFlight, addSusp, RULES } from './core.mjs';
import { joint } from './odds.mjs';

const LIMIT = { limit: true };
const ALLHELD = { allHeld: true };
export const DBG = { on: false, log: [] };
const dbg = (...a) => { if (DBG.on) DBG.log.push(a.join(' ')); };

export const DEFAULT_P = {
  lambdaBase: 0.10, lambdaSlope: 0.30, kappa: 0.35, charge: 0.06, lambdaChase: 0.10, lambdaChaseSlope: 0.8, chargeChase: 0.06,
  panic: 2, greed: 4, reserveTurn: 11, stSusp: true,
};

function assignDuties(party, town) {
  const kinds = new Set(town.locs.flatMap((l) => l.items.map((i) => i.kind)));
  const taken = new Set();
  for (const e of party) {
    if (!taken.has(e.duty)) { taken.add(e.duty); continue; }
    // pick another: prefer a kind on the list
    const free = [1, 2, 3, 4, 5, 6].filter((k) => !taken.has(k));
    const pref = free.filter((k) => kinds.has(k));
    e.duty = (pref.length ? pref : free)[0]; taken.add(e.duty);
  }
}

export function runRaid(town, names, P = DEFAULT_P, perkOverrides = {}) {
  const st = { S: 0, L: town.L, mob: town.mob, esc: town.esc, hunt: false, limitHit: false, suspLog: [], rolls: 0, crits: 0, troubles: 0, shows: 0,
    chargesSpent: 0, localChases: 0, captures: 0, flights: 0, tells: 0, spectralSkips: 0, suspAt: {}, turn: 0, flightParty: [], src: { tell: 0, roll: 0, chase: 0, cost: 0 } };
  const party = names.map((n) => makeEntity(n, perkOverrides[n] || {}));
  assignDuties(party, town);
  const locs = town.locs.map((l, i) => ({ ...l, id: i, wayIn: null, beaten: new Set(), taken: false, lost: false, checked: false,
    watchedLoc: [...l.waysIn, ...l.then].some((x) => x.watched) }));
  const checked = { wayout: false, lock: false };
  const lockObsRescue = { quiet: [S], loud: [B], D: 10, watched: true };
  const lockObsSlip = { quiet: [S, N], loud: [B], D: 10, watched: true };
  const wayObs = { quiet: [S, N], loud: [B], D: town.wayOut, watched: true };
  for (const e of party) { e.passed = {}; e.pos = 'way'; }
  const free = () => party.filter((e) => !e.captured && !e.out);
  const lambda = () => P.lambdaBase + P.lambdaSlope * (st.S / st.L) ** 2;
  const ctxBase = () => ({ lambda: lambda(), kappa: P.kappa, charge: P.charge });

  const obsList = (l) => (l.wayIn === null ? null : [l.waysIn[l.wayIn], ...l.then]);
  function nextIdx(e, l) {
    const list = obsList(l); if (!list) return 0;
    for (let i = 0; i < list.length; i++) {
      const passed = (e.passed[l.id] || new Set()).has(i);
      if (passed) continue;
      if (!list[i].group && l.beaten.has(i)) continue;
      return i;
    }
    return list.length;
  }
  function carriesAny(place) { return party.some((x) => !x.captured && !x.out && x.pos === place && x.loot.length); }

  function stCost(e, rose, trait, wonNow) {
    const opts = [];
    if (!rose) opts.push('susp');
    if (e.loot.length > wonNow && e.perk !== 'keeper') opts.push('drop');
    if (e.perk !== 'patience' && !(e.perk === 'wisewoman' && trait === W)) opts.push('lose');
    opts.push('smaller');
    const left = 12 - st.turn;
    let pick;
    if (opts.includes('susp') && (P.stSusp || st.S >= st.L - 3)) pick = 'susp';
    else if (left <= 3 && opts.includes('lose')) pick = 'lose';
    else if (opts.includes('drop')) pick = 'drop';
    else if (opts.includes('lose') && !P.stSusp) pick = left <= 6 ? 'lose' : 'smaller';
    else pick = opts.includes('lose') ? 'lose' : 'smaller';
    dbg(`   cost for ${e.name}: ${pick}`);
    if (pick === 'susp') { addSusp(st, 1); st.src.cost++; }
    else if (pick === 'lose' || pick === 'drop') e.skip = true; // drop = an action to pick it up again
    else e.stepDown = 1;
  }

  function capture(e) {
    st.captures++;
    e.captured = true; e.pos = 'lock'; e.capturedTurn = st.turn;
    if (e.perk !== 'pockets') { for (const it of e.loot) it.lost = true; e.loot = []; }
  }
  function afterCatch(runners) {
    const s0 = st.S;
    st.lastFree = free().length;
    const r = localChase(runners, st, P);
    dbg(`   chase ${runners.map((x) => x.name).join('+')}: ${r} S ${s0}->${st.S}`);
    if (r === 'captured') { for (const e of runners) { if (e.perk === 'alreadydead') e.skip = true; else { dbg(`   CAPTURED ${e.name}, loses ${e.loot.length} items`); capture(e); } } }
    if (RULES.everyoneHeldForked && party.every((x) => x.captured)) throw ALLHELD; // p18: everyone held -> Forked
    if (st.S >= st.L) throw LIMIT;
  }
  function chkLimit() { if (st.S >= st.L) throw LIMIT; }

  // roll at an obstacle (single roller), providers = free entities at same place
  function doRoll(e, ob, place, opts = {}) {
    const providers = party.filter((x) => !x.out && x.pos === place && (!x.captured || place === 'lock'));
    const ctx = { ...ctxBase(), D: ob.D, dutyRaise: !!opts.duty, noCatch: !!opts.noCatch };
    const pl = plan(e, ob, providers, ctx);
    const before = st.S;
    const x = execute(e, pl, st);
    addSusp(st, x.rise); st.src.roll += st.S - before;
    if (x.crit && e.charges < e.max) e.charges++;
    return { ...x, pl };
  }

  function chooseWayIn(l, here) {
    let best = 0, bs = -1;
    for (let w = 0; w < 2; w++) {
      const ob = l.waysIn[w];
      let sc = 0;
      for (const e of here) {
        if (ob.group && e.perk === 'spectral' && !e.loot.length) { sc = Math.max(sc, 1.2); continue; }
        const pl = plan(e, ob, here, { ...ctxBase(), D: ob.D, dutyRaise: dutyAt(e, l) });
        sc = Math.max(sc, pl.score);
      }
      if (ob.group && here.length > 1 && !here.every((e) => e.perk === 'spectral')) sc -= 0.1;
      if (sc > bs) { bs = sc; best = w; }
    }
    l.wayIn = best;
  }
  const dutyAt = (e, l) => l.items.some((i) => i.kind === e.duty);

  function workLocation(l) {
    for (let guard = 0; guard < 20; guard++) {
      if (l.taken) return;
      const here = party.filter((e) => !e.acted && !e.captured && !e.out && e.pos === l.id);
      if (!here.length) return;
      if (!RULES.spectralNoPick) { if (l.wayIn === null) chooseWayIn(l, here); }
      else {
        // v0.2 p14: a Spectral pass doesn't pick the way in. Ghosts alone hold a tentative group way in;
        // the first non-Ghost who needs the way in picks it for real (the Ghost stays past it).
        const spec = (e) => e.perk === 'spectral' && !e.loot.length;
        const needs = here.filter((e) => !spec(e) && !(e.passed[l.id] || new Set()).has(0));
        if (l.wayIn === null) {
          if (!needs.length && l.waysIn.some((w) => w.group)) { l.wayIn = l.waysIn.findIndex((w) => w.group); l.tentative = true; }
          else chooseWayIn(l, needs.length ? needs : here);
        } else if (l.tentative && needs.length) { chooseWayIn(l, needs); l.tentative = false; }
      }
      const list = obsList(l);
      // spectral skips
      for (const e of here) {
        let i = nextIdx(e, l);
        while (i < list.length && list[i].group && e.perk === 'spectral' && !e.loot.length) {
          (e.passed[l.id] ||= new Set()).add(i); st.spectralSkips++; dbg(`T${st.turn} ${e.name} spectral-skips ${list[i].name}`);
          if (i === list.length - 1) { takeItems(e, l); return; }
          i = nextIdx(e, l);
        }
      }
      // pick roller(s)
      const cand = here.map((e) => ({ e, i: nextIdx(e, l) })).filter((c) => c.i < list.length);
      if (!cand.length) return;
      // group check if >=2 share the same group obstacle
      const g = cand.filter((c) => list[c.i].group);
      if (g.length >= 2) {
        const idx = g[0].i; const grp = g.filter((c) => c.i === idx).map((c) => c.e);
        if (grp.length >= 2) { groupCheck(grp, l, idx); continue; }
      }
      // otherwise the best scorer rolls its next obstacle
      let best = null;
      for (const c of cand) {
        const ob = list[c.i];
        const pl = plan(c.e, ob, here, { ...ctxBase(), D: ob.D, dutyRaise: dutyAt(c.e, l) });
        const sc = pl.score + c.i * 0.01;
        if (!best || sc > best.sc) best = { ...c, sc };
      }
      singleRoll(best.e, l, best.i);
    }
  }

  function takeItems(e, l) {
    l.taken = true;
    for (const it of l.items) { const item = { kind: it.kind, ess: !!it.ess, lost: false }; e.loot.push(item); st.allItems.push(item); }
  }

  function singleRoll(e, l, i) {
    const list = obsList(l); const ob = list[i];
    e.acted = true;
    const noCatch = e.perk === 'outofsight' && !carriesAny(l.id);
    const x = doRoll(e, ob, l.id, { duty: dutyAt(e, l), noCatch });
    dbg(`T${st.turn} ${e.name}@${l.name} ${ob.name}(D${ob.D}${ob.watched ? ' W' : ''}) trait=${x.pl.t} d${x.pl.s}+${x.pl.sec === 6 ? 'Mask' : 'Mon'} ${x.a}+${x.b} -> ${x.res}${x.crit ? '*' : ''}${x.show ? ' SHOW' : ''} ${x.pl.tt || x.pl.rt || x.pl.nt ? '[ability]' : ''} S=${st.S}`);
    if (x.res !== 'T') {
      if (ob.group || x.pl.approach) (e.passed[l.id] ||= new Set()).add(i); else l.beaten.add(i);
      const last = i === list.length - 1;
      let won = 0;
      if (last && (ob.group || x.pl.approach ? true : true)) { const n0 = e.loot.length; takeItems(e, l); won = e.loot.length - n0; }
      chkLimit();
      if (x.res === 'C') { stCost(e, x.rise > 0, x.pl.t, won); chkLimit(); }
    } else {
      chkLimit();
      if (ob.watched && !noCatch) afterCatch([e]);
    }
  }

  function groupCheck(grp, l, i) {
    const list = obsList(l); const ob = list[i];
    let rise = 0; const caught = []; const costs = [];
    const before = st.S;
    for (const e of grp) {
      e.acted = true;
      const providers = party.filter((x) => !x.out && !x.captured && x.pos === l.id);
      const pl = plan(e, ob, providers, { ...ctxBase(), D: ob.D, dutyRaise: dutyAt(e, l) });
      const x = execute(e, pl, st);
      dbg(`T${st.turn} GROUP ${e.name}@${l.name} ${ob.name}(D${ob.D}${ob.watched ? ' W' : ''}) d${pl.s}+${pl.sec === 6 ? 'Mask' : 'Mon'} ${x.a}+${x.b} -> ${x.res}${x.show ? ' SHOW' : ''}`);
      if (x.crit && e.charges < e.max) e.charges++;
      rise = Math.max(rise, x.rise);
      if (x.res !== 'T') {
        (e.passed[l.id] ||= new Set()).add(i);
        if (i === list.length - 1 && !l.taken) takeItems(e, l);
        if (x.res === 'C') costs.push([e, pl.t]);
      } else if (ob.watched && !(e.perk === 'outofsight' && !carriesAny(l.id))) caught.push(e);
    }
    addSusp(st, rise); st.src.roll += st.S - before; chkLimit();
    for (const [e, t] of costs) { stCost(e, rise > 0, t, 0); chkLimit(); }
    if (caught.length) afterCatch(caught);
  }

  function wayOutRoll() {
    const fr = free();
    if (!fr.length || !fr.every((e) => e.pos === 'way')) return false;
    if (!fr.every((e) => decideMove(e) === 'way')) return false;
    const can = fr.filter((e) => !e.acted);
    if (!can.length) return false;
    // best roller
    let best = null;
    const fetch = fr.some((x) => x.perk === 'fetch') ? 1 : 0;
    const wob = (e) => ({ ...wayObs, D: wayObs.D - fetch - (e.perk === 'shortcut' ? 2 : 0) });
    for (const e of can) { const ob = wob(e); const pl = plan(e, ob, fr, { ...ctxBase(), D: ob.D }); if (!best || pl.score > best.s) best = { e, s: pl.score }; }
    const e = best.e; e.acted = true;
    const sBefore = st.S;
    const x = doRoll(e, wob(e), 'way'); dbg(`T${st.turn} WAY OUT ${e.name} -> ${x.res} S=${st.S}`);
    if (x.res !== 'T' && st.S >= st.L && sBefore < st.L) { st.wayOutLimitClash = true; if (P.outBeatsLimit || RULES.resultFirst) { for (const y of free()) y.out = true; st.exitTurn = st.turn; return true; } }
    chkLimit();
    if (x.res !== 'T') { for (const y of free()) y.out = true; st.exitTurn = st.turn; return true; }
    afterCatch([e]);
    return false;
  }

  function lockupPhase() {
    // captives slip free
    for (const e of party) {
      if (!e.captured || e.acted || st.turn <= e.capturedTurn) continue;
      e.acted = true;
      const x = doRoll(e, lockObsSlip, 'lock'); dbg(`T${st.turn} ${e.name} slip-free -> ${x.res} S=${st.S}`);
      if (!RULES.resultFirst) chkLimit();
      if (x.res === 'S' || (x.res === 'C' && e.perk === 'builttolast')) { e.captured = false; e.pos = 'lock'; e.freedTurn = st.turn; }
      chkLimit();
    }
    // rescuers
    for (const e of party) {
      if (e.captured || e.out || e.acted || e.pos !== 'lock') continue;
      if (!party.some((x) => x.captured)) break;
      e.acted = true;
      const x = doRoll(e, lockObsRescue, 'lock'); dbg(`T${st.turn} ${e.name} RESCUE -> ${x.res} S=${st.S}`);
      if (!RULES.resultFirst) chkLimit();
      if (x.res !== 'T') { for (const y of party) if (y.captured) { y.captured = false; y.freedTurn = st.turn; y.acted = true; } chkLimit(); if (x.res === 'C') { stCost(e, x.rise > 0, x.pl.t, 0); chkLimit(); } }
      else { chkLimit(); afterCatch([e]); }
    }
  }

  function estPass(e, l) {
    let p = 1;
    const list = (l.wayIn === null || (l.tentative && !(e.passed[l.id] || new Set()).has(0))) ? null : obsList(l);
    const steps = [];
    if (!list) steps.push(l.waysIn, ...l.then.map((x) => [x])); else for (let i = nextIdx(e, l); i < list.length; i++) steps.push([list[i]]);
    for (const alts of steps) {
      let bp = 0;
      for (const ob of alts) {
        if (ob.group && e.perk === 'spectral' && !e.loot.length) { bp = 1; continue; }
        const tr = e.hyde && e.form === 'H' ? e.hyde : e.t;
        for (const t of [...ob.quiet, ...ob.loud]) {
          let s = tr[t]; if (dutyAt(e, l)) s = Math.min(12, s + 2);
          bp = Math.max(bp, joint(s, 6, ob.D).pass);
        }
      }
      p *= bp;
    }
    return { p, n: steps.length };
  }

  function decideMove(e) {
    const winNow = winSecured();
    const captives = party.filter((x) => x.captured);
    const left = 12 - st.turn;
    if (st.S >= st.L - P.panic) return 'way';
    // rescue
    if (captives.length && !party.some((x) => x !== e && !x.captured && !x.out && x.target === 'lock') && st.turn + 2 <= P.reserveTurn) {
      const rs = Math.max(joint(e.t[S], 6, 10).pass, joint(e.t[B], 6, 10).pass);
      if (rs >= 0.25) return 'lock';
    }
    if (winNow && st.S >= st.L - P.greed) return 'way';
    let best = null;
    for (const l of locs) {
      if (l.taken) continue;
      const { p, n } = estPass(e, l);
      const moveCost = e.pos === l.id ? 0 : 1;
      if (st.turn + moveCost + n + 1 > P.reserveTurn) continue;
      const others = party.filter((x) => x !== e && !x.captured && !x.out && (x.target === l.id || x.pos === l.id)).length;
      const sc = p + (l.items.some((i) => i.ess) ? 0.6 : 0) - 0.45 * others;
      if (!best || sc > best.sc) best = { l, sc };
    }
    if (!best) return 'way';
    return best.l.id;
  }

  function winSecured() {
    const items = st.allItems.filter((i) => !i.lost);
    const total = town.locs.reduce((a, l) => a + l.items.length, 0);
    const ess = town.locs.reduce((a, l) => a + l.items.filter((i) => i.ess).length, 0);
    const haveEss = items.filter((i) => i.ess).length;
    return haveEss === ess && items.length >= total - 1;
  }

  st.allItems = [];
  let result = null; let left = [];
  try {
    for (let t = 1; t <= 12; t++) {
      st.turn = t;
      for (const e of party) e.acted = false;
      for (const e of party) if (e.skip && !e.out) { e.skip = false; e.acted = true; }
      lockupPhase();
      if (wayOutRoll()) break;
      for (const l of locs) workLocation(l);
      // moves
      const arrivals = new Map();
      for (const e of free()) {
        if (e.acted) continue;
        if (e.freedTurn === t) continue;
        const tgt = decideMove(e);
        e.target = tgt;
        if (tgt === e.pos) { e.acted = true; continue; } // wait
        if (e.pos === 'way' && tgt === 'way') { e.acted = true; continue; }
        e.pos = tgt; e.acted = true; dbg(`T${t} ${e.name} moves to ${typeof tgt === 'number' ? locs[tgt].name : tgt}`);
        if (!arrivals.has(tgt)) arrivals.set(tgt, []); arrivals.get(tgt).push(e);
      }
      for (const [place, who] of arrivals) {
        let watched = false;
        if (place === 'way') { if (!checked.wayout) { checked.wayout = true; watched = true; } }
        else if (place === 'lock') { if (!checked.lock) { checked.lock = true; watched = true; } }
        else { const l = locs[place]; if (!l.checked && l.watchedLoc) { l.checked = true; watched = true; } }
        if (watched) {
          let off = die(6) >= 4; dbg(`T${st.turn} tell check at ${place}: ${off}`);
          if (off && who.some((x) => x.perk === 'familiar')) off = die(6) >= 4;
          if (off) { st.tells++; addSusp(st, 1); st.src.tell++; chkLimit(); }
        }
      }
      if (wayOutRoll()) break;
      st.suspAt[t] = st.S;
    }
    // dawn
    if (free().length) { st.dawn = true; throw LIMIT; }
  } catch (err) {
    if (err === ALLHELD) { result = 'Forked'; st.allHeld = true; }
    else if (err !== LIMIT) throw err;
    else {
    st.flightTurn = st.turn;
    const fl = free();
    if (fl.length) {
      const r = finalFlight(fl, st, P); dbg(`FINAL FLIGHT (${st.dawn ? 'dawn' : 'limit'}) ${fl.map((x) => x.name).join(',')}: ${r}`);
      st.flightResult = r;
      if (r === 'escaped') for (const e of fl) e.out = true;
      else result = 'Forked';
    }
    }
  }
  for (let t = 1; t <= 12; t++) if (st.suspAt[t] === undefined) st.suspAt[t] = st.S;
  const leftBehind = party.filter((e) => e.captured).length;
  if (!result) {
    const home = party.filter((e) => e.out).flatMap((e) => e.loot);
    const total = town.locs.reduce((a, l) => a + l.items.length, 0);
    const ess = town.locs.reduce((a, l) => a + l.items.filter((i) => i.ess).length, 0);
    const hEss = home.filter((i) => i.ess).length;
    let lvl;
    if (hEss === ess && home.length >= total - 1) lvl = 2; // Win
    else if (home.length * 2 >= total) lvl = 1; // Partial
    else lvl = 0;
    lvl = Math.max(0, lvl - leftBehind);
    result = ['Bust', 'Partial', 'Win'][lvl];
  }
  st.result = result; st.leftBehind = leftBehind;
  st.chargesLeft = party.reduce((a, e) => a + e.charges, 0);
  st.partySize = party.length;
  return st;
}
