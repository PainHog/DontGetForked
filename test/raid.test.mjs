/**
 * module/logic/raid.mjs against rulebook Chapters 4–5: the Limit, the Turns and
 * dawn, one roll one rise, the hunt, and the Storyteller's undo.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { DGF } from "../module/config.mjs";
import {
  newRaid, normalizeRaid, suspicionOf, raidView, recordEvent, cancel, restore, lastLiveEvent, adjust, advanceTurn, setHunt, huntDue, eventsOf, leaveTown, backInTown, takeFurniture, setFurniture,
} from "../module/logic/raid.mjs";
import { foldSuspicion } from "../module/logic/suspicion.mjs";

test("a new raid: the Limit by difficulty (11 / 11 / 15), 12 Turns, nothing raised", () => {
  for (const [label, n] of [["easy", 11], ["standard", 11], ["hard", 15]]) { // B3: Easy and Standard 11
    const s = newRaid({ id: "r1", difficulty: label });
    assert.equal(s.limit, n);
    assert.equal(s.limit, DGF.labels[label].limit);
    assert.equal(s.turns, 12);
    assert.equal(s.turn, 1);
    assert.equal(suspicionOf(s).value, 0);
  }
  assert.throws(() => newRaid({ difficulty: "nightmare" }));
  assert.equal(raidView(newRaid({ difficulty: "easy" })).exit, 6);
});

test("normalize fills a missing or partial stored state", () => {
  const s = normalizeRaid({});
  assert.equal(s.raidId, "");
  assert.equal(s.difficulty, "standard");
  assert.equal(s.limit, 11);
  const t = normalizeRaid({ raidId: "x", difficulty: "hard", turn: 5, ledger: [{ eventId: "a", amount: 1, source: "roll" }] });
  assert.equal(t.limit, 15);
  assert.equal(t.turn, 5);
  assert.equal(t.ledger[0].cancelled, false);
  assert.equal(normalizeRaid(null).turn, 1);
});

test("one roll, one rise: entries of one event apply only the biggest; a retry never counts twice", () => {
  let s = newRaid({ id: "r" });
  s = recordEvent(s, { eventId: "roll1", amount: 2, source: "roll" });
  s = recordEvent(s, { eventId: "roll1", amount: 2, source: "roll" }); // a retried request
  s = recordEvent(s, { eventId: "roll1", amount: 1, source: "cost" }); // a Cost +1 the roll already raised
  assert.equal(suspicionOf(s).value, 2);
  assert.equal(s.ledger.length, 2);
  s = recordEvent(s, { eventId: "roll2", amount: 0, source: "roll" });
  s = recordEvent(s, { eventId: "roll2", amount: 1, source: "cost" }); // the Cost is the rise
  assert.equal(suspicionOf(s).value, 3);
  assert.throws(() => recordEvent(s, { eventId: "roll3", amount: -1, source: "roll" }), /only abilities or Perks/);
});

test("the track never goes past the Limit; reaching it starts the hunt; then Suspicion stops", () => {
  let s = newRaid({ id: "r", difficulty: "easy" }); // Limit 11 (B3)
  for (let i = 0; i < 5; i++) s = recordEvent(s, { eventId: `e${i}`, amount: 2, source: "roll" });
  assert.equal(suspicionOf(s).value, 10);
  assert.equal(huntDue(s), "");
  s = recordEvent(s, { eventId: "e5", amount: 2, source: "roll" });
  assert.equal(suspicionOf(s).value, 11);
  assert.equal(suspicionOf(s).lost, 1);
  assert.equal(huntDue(s), "limit");
  s = recordEvent(s, { eventId: "e6", amount: 2, source: "roll" });
  assert.equal(suspicionOf(s).value, 11);
  assert.equal(suspicionOf(s).lost, 3);
  s = setHunt(s, true, "limit");
  assert.equal(huntDue(s), "");
  s = recordEvent(s, { eventId: "e7", amount: 2, source: "roll" });
  assert.equal(s.ledger.at(-1).hunt, true);
  assert.equal(suspicionOf(s).value, 11);
  assert.equal(raidView(s).huntCause, "limit");
});

test("Turns: dawn comes when the 12th Turn ends; going back undoes it", () => {
  let s = newRaid({ id: "r" });
  for (let i = 0; i < 11; i++) s = advanceTurn(s, 1);
  assert.equal(s.turn, 12);
  assert.equal(s.dawn, false);
  s = advanceTurn(s, 1);
  assert.equal(s.dawn, true);
  assert.equal(s.turn, 12);
  assert.equal(huntDue(s), "dawn");
  assert.equal(advanceTurn(s, 1), s);
  s = advanceTurn(s, -1);
  assert.equal(s.dawn, false);
  s = advanceTurn(s, -1);
  assert.equal(s.turn, 11);
  assert.equal(advanceTurn(newRaid(), -1).turn, 1);
});

test("the hunt starts at the moment of the Limit or dawn, so the Storyteller can stop it", () => {
  let s = newRaid({ id: "r", difficulty: "easy" });
  for (let i = 0; i < 11; i++) s = advanceTurn(s, 1);
  const beforeDawn = s;
  s = advanceTurn(s, 1);
  assert.equal(huntDue(s, beforeDawn), "dawn");
  const stopped = setHunt(setHunt(s, true, "dawn"), false);
  assert.equal(huntDue(stopped, setHunt(s, true, "dawn")), "", "still dawn, but the Storyteller stopped the hunt");
  let t = newRaid({ id: "r", difficulty: "easy" });
  t = recordEvent(t, { eventId: "a", amount: 10, source: "storyteller" }); // one short of the Limit (11)
  const at = recordEvent(t, { eventId: "b", amount: 2, source: "roll" });
  assert.equal(huntDue(at, t), "limit");
  assert.equal(huntDue(recordEvent(at, { eventId: "c", amount: 1, source: "roll" }), at), "", "already at the Limit before this change");
});

test("once the party is out of town, neither dawn nor the Limit starts a hunt", () => {
  let s = leaveTown(newRaid({ id: "r", difficulty: "easy" }), "wayOut");
  assert.deepEqual(s.partyOut, { how: "wayOut", turn: 1, piece: "" });
  assert.equal(leaveTown(s, "flight"), s, "once");
  assert.deepEqual(raidView(s).partyOut, { how: "wayOut", turn: 1, piece: "" });
  assert.deepEqual(normalizeRaid(JSON.parse(JSON.stringify(s))).partyOut, s.partyOut, "it is kept");
  assert.equal(newRaid({ id: "n" }).partyOut, null);
  for (let i = 0; i < 11; i++) s = advanceTurn(s, 1);
  const beforeDawn = s;
  s = advanceTurn(s, 1);
  assert.equal(s.dawn, true);
  assert.equal(huntDue(s, beforeDawn), "", "dawn hunts only those still in town");
  const at = recordEvent(s, { eventId: "a", amount: 11, source: "storyteller" });
  assert.equal(huntDue(at, s), "");
});

test("back in town: the Storyteller takes back a mistaken leaving; a piece that leaving moved is in play again, nothing else", () => {
  const taken = takeFurniture(newRaid({ id: "r" }));
  // carried out of town, then taken back
  const out = leaveTown(taken, "wayOut", { carried: true });
  assert.deepEqual([out.furniture, out.partyOut.piece], ["out", "out"]);
  const back = backInTown(out);
  assert.equal(back.partyOut, null);
  assert.deepEqual([back.furniture, back.furnitureLost], ["inPlay", false]);
  assert.deepEqual({ ...back, partyOut: undefined, furniture: undefined }, { ...taken, partyOut: undefined, furniture: undefined }, "nothing else changes");
  // set down, left behind (lost), then taken back
  const left = leaveTown(taken, "flight", { carried: false });
  assert.deepEqual([left.furniture, left.furnitureLost, left.partyOut.piece], ["lost", true, "lost"]);
  assert.deepEqual([backInTown(left).furniture, backInTown(left).furnitureLost], ["inPlay", false]);
  // the Storyteller changed the piece since: that stays; a piece never taken stays untaken
  assert.equal(backInTown(setFurniture(out, "lost")).furniture, "lost");
  const none = leaveTown(newRaid({ id: "n" }), "wayOut");
  assert.equal(none.partyOut.piece, "");
  assert.equal(backInTown(none).furniture, "");
  assert.equal(backInTown(taken), taken, "in town already: nothing to take back");
});

test("the Storyteller's adjust, cancel, restore and undo", () => {
  let s = newRaid({ id: "r" });
  s = recordEvent(s, { eventId: "roll1", amount: 2, source: "roll", label: "the Monster shows" });
  s = adjust(s, 1, { label: "a Tell" });
  assert.equal(suspicionOf(s).value, 3);
  s = adjust(s, -1);
  assert.equal(suspicionOf(s).value, 2);
  const last = lastLiveEvent(s);
  assert.equal(last.source, "storyteller");
  s = cancel(s, last.eventId);
  assert.equal(suspicionOf(s).value, 3);
  s = cancel(s, "roll1");
  assert.equal(suspicionOf(s).value, 1);
  assert.equal(eventsOf(s).find((e) => e.eventId === "roll1").cancelled, true);
  s = restore(s, "roll1");
  assert.equal(suspicionOf(s).value, 3);
  assert.throws(() => adjust(s, 0));
  // events newest first, one row per event
  assert.deepEqual(eventsOf(s).map((e) => e.eventId), [last.eventId, eventsOf(s)[1].eventId, "roll1"]);
});

test("the stored ledger folds the same as suspicion.mjs", () => {
  let s = newRaid({ id: "r", difficulty: "hard" });
  s = recordEvent(s, { eventId: "a", amount: 1, source: "roll" });
  s = recordEvent(s, { eventId: "b", amount: 2, source: "roll" });
  assert.deepEqual(suspicionOf(s), foldSuspicion(s.ledger, 15));
});

/* ------------------------------------------- the outside review's rules (DESIGN 2026-10-19, 2026-10-20) -- */

test("D3: a roll's overdraw goes on top of its event (a group check's one rise included); the event list shows the sum", async () => {
  const { eventAmount } = await import("../module/logic/raid.mjs");
  let s = newRaid({ id: "r" });
  s = recordEvent(s, { eventId: "group:g", amount: 2, extra: 0, source: "roll", messageId: "a" }); // the Monster shows
  s = recordEvent(s, { eventId: "group:g", amount: 1, extra: 2, source: "roll", messageId: "b" }); // Trouble and an overdraw
  assert.equal(suspicionOf(s).value, 4, "the group's one rise (2), plus the overdraw on top");
  assert.equal(eventsOf(s)[0].amount, 4);
  assert.equal(eventAmount(s, "group:g"), 2, "what a Cost's Suspicion +1 is weighed against: the triggers only");
  s = recordEvent(s, { eventId: "group:g", amount: 1, extra: 2, source: "roll", messageId: "b" }); // a retried request
  assert.equal(suspicionOf(s).value, 4, "a retry never counts twice");
  assert.throws(() => recordEvent(s, { eventId: "x", amount: 1, extra: -1, source: "roll" }));
});

test("F25: a rise recorded before the hunt counts though the hunt is on (a local chase's rise so far)", () => {
  let s = setHunt(newRaid({ id: "r" }), true, "dawn");
  s = recordEvent(s, { eventId: "late", amount: 2, source: "roll" });
  assert.equal(suspicionOf(s).value, 0, "once the hunt is on, Suspicion stops");
  s = recordEvent(s, { eventId: "chase:c", amount: 1, extra: 2, source: "chase", beforeHunt: true });
  assert.equal(suspicionOf(s).value, 3);
});

test("R4: the way out is rolled once a Turn: marked for the Turn, free again next Turn, taken back with a mistaken leaving", async () => {
  const { markWayOut, wayOutRolled } = await import("../module/logic/raid.mjs");
  let s = newRaid({ id: "r" });
  assert.equal(s.wayOutTurn, 0);
  assert.equal(wayOutRolled(s), false);
  s = markWayOut(s);
  assert.equal(wayOutRolled(s), true);
  assert.equal(markWayOut(s), s);
  s = advanceTurn(s, 1);
  assert.equal(wayOutRolled(s), false, "Next Turn: it can be rolled again");
  assert.equal(wayOutRolled(advanceTurn(s, -1)), true, "the Storyteller steps back: that Turn had its roll");
  assert.equal(normalizeRaid(JSON.parse(JSON.stringify(markWayOut(s)))).wayOutTurn, 2);
  assert.equal(normalizeRaid({}).wayOutTurn, 0, "an older raid: not rolled");
  // the way out beaten, then taken back as a mistake: that roll no longer counts as this Turn's
  const out = leaveTown(markWayOut(s), "wayOut");
  assert.equal(wayOutRolled(backInTown(out)), false);
  assert.equal(wayOutRolled(backInTown(leaveTown(markWayOut(s), "flight"))), true, "the flight escaped: the way-out roll stands");
});
