/**
 * DON'T GET FORKED — How the year went (pure, Foundry-free)
 * ---------------------------------------------------------
 * The end of a raid, from the shopping list: what came home, the year's result
 * (rules.yearResult: Grand Year, Win, Partial, Bust, Forked; each Entity left
 * behind drops it one step) and the epilogue (rules.epilogueLines: the result's
 * line, then one line for each kind of item on the list that didn't come home).
 *
 *   list item = { name, duty, essential, home }   (duty = the item's kind, by Castle Duty key)
 *
 * Source: rulebook Chapter 7 (How the Year Went, Left Behind, The Epilogue),
 * Chapter 4 (The Shopping List: one or two essentials, the rest extras) and
 * Chapter 6 (left behind; forked: the raid is lost).
 */
import { DGF } from "../config.mjs";
import { yearResult, epilogueLines } from "./rules.mjs";

const DUTY_KEYS = DGF.duties.map((d) => d.key);
const norm = (s) => String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");

/** A list item as plain data (unknown kinds are refused). */
export function listItem({ name = "", duty, essential = false, home = false }) {
  if (!DUTY_KEYS.includes(duty)) throw new Error(`unknown kind of item: ${duty}`);
  return { name: String(name ?? ""), duty, essential: !!essential, home: !!home };
}

/**
 * Which list items look home: an item counts as home when an Entity that got out
 * carries something of the same name. `carried` = the names the Entities who got
 * out carry. The Storyteller confirms on the end-of-raid form.
 */
export function homeFromCarried(list, carried = []) {
  const have = new Map();
  for (const n of carried) have.set(norm(n), (have.get(norm(n)) ?? 0) + 1);
  return list.map((it) => {
    const k = norm(it.name);
    const n = have.get(k) ?? 0;
    if (k && n > 0) { have.set(k, n - 1); return { ...it, home: true }; }
    return { ...it, home: false };
  });
}

/**
 * The year from the list. `forked`: cornered in the final flight — the raid is lost,
 * so nothing came home. `furnitureLost`: a carrier was captured, so the piece can't
 * come home (F15). Returns { result, lines, listSize, itemsHome, essentialsAllHome,
 * extrasMissing, missingDuties, furnitureHome, leftBehind }.
 */
export function yearFromList({ list, furnitureHome = false, leftBehind = 0, forked = false, furnitureLost = false }) {
  if (furnitureLost) furnitureHome = false; // F15: a captured carrier's piece is gone for the night
  const items = (list ?? []).map(listItem);
  if (!items.length) throw new Error("the shopping list is empty");
  const home = (it) => !forked && it.home;
  const itemsHome = items.filter(home).length;
  const essentialsAllHome = items.filter((it) => it.essential).every(home);
  const extrasMissing = items.filter((it) => !it.essential && !home(it)).length;
  const lost = Math.max(0, Math.trunc(Number(leftBehind) || 0));
  const result = yearResult({ forked, listSize: items.length, itemsHome, essentialsAllHome, extrasMissing, furnitureHome: !forked && !!furnitureHome, leftBehind: lost });
  const missingDuties = [...new Set(items.filter((it) => !home(it)).map((it) => it.duty))];
  return {
    result, lines: epilogueLines({ result, missingDuties }), listSize: items.length, itemsHome, essentialsAllHome,
    extrasMissing, missingDuties, furnitureHome: !forked && !!furnitureHome, leftBehind: forked ? 0 : lost,
  };
}

/**
 * How many essentials (Chapter 8, F16): Easy one, Hard two; on Standard roll any die: odd, one; even, two.
 * `face` is that die's roll (unused when the label has only one number).
 */
export function essentialsFor(label, face = 1) {
  const { essentials } = listShape(label);
  if (essentials.length === 1) return essentials[0];
  return face % 2 === 1 ? Math.min(...essentials) : Math.max(...essentials);
}

/** The label's list size and how many essentials it may have (Chapter 4: 4 on Easy, 5 on Standard and Hard). */
export function listShape(label) {
  const L = DGF.labels[label];
  if (!L) throw new Error(`unknown difficulty: ${label}`);
  return { size: L.items, essentials: [...L.essentials] };
}
