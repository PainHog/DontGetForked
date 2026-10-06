/**
 * DON'T GET FORKED — GM-authoritative operations
 * ----------------------------------------------
 * Only the active Storyteller's (GM's) client writes shared state (the raid
 * setting, other players' Entities, cards). A player's client asks for a change
 * with runOp(name, args): on the active GM it runs at once; elsewhere it travels
 * to the active GM with User#query (CONFIG.queries[QUERY]); if User#query is
 * missing, a request/reply over the system socket is the fallback.
 *
 * Heisty lesson: v13 query handlers don't receive the sender, so every request
 * carries `userId` and each operation checks what that user may do (gmOnly ops
 * refuse non-GM users). Each request has a `requestId`; the GM remembers the last
 * 200 so a retry never applies twice.
 */
import { QUERY, SOCKET } from "../contracts.mjs";
import { t } from "../helpers/i18n.mjs";

const registry = new Map();
const seen = new Map(); // requestId → result (last 200)
const pending = new Map(); // socket fallback: requestId → resolve
const TIMEOUT = 10000;

/** Register an operation: { gmOnly, apply(args, { user }) → result }. */
export function registerOp(name, { gmOnly = false, apply }) {
  if (registry.has(name)) throw new Error(`GM operation ${name} registered twice`);
  registry.set(name, { gmOnly, apply });
}

/** The names registered so far (for tests). */
export function registeredOps() {
  return [...registry.keys()];
}

/** Is this client the one GM that writes? */
export function isActiveGM() {
  return !!game.user?.isGM && game.users?.activeGM?.id === game.user.id;
}

/** Run an operation as the GM: here if this is the active GM, otherwise by asking it. */
export async function runOp(op, args = {}) {
  if (!registry.has(op)) throw new Error(`unknown GM operation: ${op}`);
  const requestId = foundry.utils.randomID();
  if (isActiveGM()) return execute({ op, args, userId: game.user.id, requestId });
  const gm = game.users.activeGM;
  if (!gm) {
    ui.notifications.warn(t("DGF.Notify.noGM"));
    return { ok: false, reason: "noGM" };
  }
  const payload = { op, args, userId: game.user.id, requestId };
  try {
    const result = typeof gm.query === "function"
      ? await gm.query(QUERY, payload, { timeout: TIMEOUT })
      : await viaSocket(payload);
    if (result && result.ok === false && result.reason !== "noop") console.warn(`Don't Get Forked | ${op} refused: ${result.reason}`, result);
    return result ?? { ok: false, reason: "noReply" };
  } catch (err) {
    console.error(`Don't Get Forked | ${op} failed`, err);
    ui.notifications.warn(t("DGF.Notify.opFailed"));
    return { ok: false, reason: "failed" };
  }
}

/** CONFIG.queries handler (runs on the client the query was sent to). */
export async function handleQuery(data) {
  if (!isActiveGM()) return { ok: false, reason: "notActiveGM" };
  return execute(data ?? {});
}

async function execute({ op, args = {}, userId, requestId }) {
  if (requestId && seen.has(requestId)) return seen.get(requestId);
  const def = registry.get(op);
  let result;
  const user = game.users.get(userId);
  if (!def) result = { ok: false, reason: "unknownOp" };
  else if (!user) result = { ok: false, reason: "unknownUser" };
  else if (def.gmOnly && !user.isGM) result = { ok: false, reason: "gmOnly" };
  else {
    try { result = (await def.apply(args, { user })) ?? { ok: true }; }
    catch (err) {
      console.error(`Don't Get Forked | ${op} failed on the GM`, err);
      result = { ok: false, reason: "error", message: String(err?.message ?? err) };
    }
  }
  if (requestId) {
    seen.set(requestId, result);
    if (seen.size > 200) seen.delete(seen.keys().next().value);
  }
  return result;
}

/* ------------------------------------------------ socket fallback -- */

function viaSocket(payload) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => { pending.delete(payload.requestId); resolve({ ok: false, reason: "timeout" }); }, TIMEOUT);
    pending.set(payload.requestId, (result) => { clearTimeout(timer); resolve(result); });
    game.socket.emit(SOCKET, { type: "request", ...payload });
  });
}

async function onSocket(msg) {
  if (!msg || typeof msg !== "object") return;
  if (msg.type === "request" && isActiveGM()) {
    const result = await execute(msg);
    game.socket.emit(SOCKET, { type: "reply", requestId: msg.requestId, to: msg.userId, result });
  } else if (msg.type === "reply" && msg.to === game.user?.id) {
    pending.get(msg.requestId)?.(msg.result);
    pending.delete(msg.requestId);
  }
}

/** Init: register the query handler. */
export function registerGmOps() {
  CONFIG.queries ??= {};
  CONFIG.queries[QUERY] = handleQuery;
}

let listening = false;
/** Ready: listen on the system socket (the fallback when User#query is missing). */
export function listenSocket() {
  if (listening || !game.socket) return;
  game.socket.on(SOCKET, onSocket);
  listening = true;
}
