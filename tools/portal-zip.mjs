// Builds the portal copy of the online version: downloads/Dont_Get_Forked_Foundry_v<version>.zip,
// made from the latest released tag (never unreleased work on main), with a system.json that
// carries no repository links. Run by hand only (`npm run build:portal-zip`), and only after a new
// release: every rebuild that changes the file is a new copy Richard has to check again.
// Never call it from `npm run check`, CI or a hook.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOWNLOADS = path.join(ROOT, "downloads");
const SYSTEM_ID = "dont-get-forked";
const MAX_BYTES = 25 * 1024 * 1024;
const COPY = ["system.json", "LICENSE", "module", "styles", "templates", "lang", "assets", "packs"];
const FORBIDDEN = [/github/i, /painhog/i, /prodlog/i, /spideyheist/i, /DontGetForked/, /\b[0-9a-f]{40}\b/i];

const git = (args, opts = {}) =>
  execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 28, ...opts });
const fail = (msg) => { throw new Error(`portal-zip: ${msg}`); };

// 1. The latest release tag, by version order, and its commit.
function latestTag() {
  const refs = new Map();
  for (const line of git(["ls-remote", "--tags", "origin"]).trim().split("\n")) {
    const m = line.match(/^([0-9a-f]{40})\trefs\/tags\/(v\d+(?:\.\d+)*)(\^\{\})?$/);
    if (!m) continue;
    // An annotated tag lists its peeled commit as "<tag>^{}"; prefer that.
    if (m[3] || !refs.has(m[2])) refs.set(m[2], m[1]);
  }
  if (!refs.size) fail("no v* tags on origin");
  const parts = (t) => t.slice(1).split(".").map(Number);
  const tag = [...refs.keys()].sort((a, b) => {
    const pa = parts(a), pb = parts(b);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const d = (pa[i] ?? 0) - (pb[i] ?? 0);
      if (d) return d;
    }
    return 0;
  }).at(-1);
  return { tag, commit: refs.get(tag) };
}

function hasCommit(commit) {
  try { git(["cat-file", "-e", `${commit}^{commit}`], { stdio: "ignore" }); return true; }
  catch { return false; }
}

function walk(dir, base = dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base, out);
    else out.push(path.relative(base, p).split(path.sep).join("/"));
  }
  return out;
}

const isText = (buf) => !buf.includes(0);

function scan(file, rel, problems) {
  const buf = fs.readFileSync(file);
  if (!isText(buf)) return;
  const text = buf.toString("utf8");
  for (const re of FORBIDDEN) {
    const m = text.match(re);
    if (m) problems.push(`${rel}: "${m[0]}"`);
  }
}

function main() {
  const { tag, commit } = latestTag();
  const version = tag.slice(1);
  if (!hasCommit(commit)) git(["fetch", "--depth", "1", "origin", "tag", tag], { stdio: "inherit" });
  if (!hasCommit(commit)) fail(`could not fetch ${tag} (${commit})`);

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dgf-portal-zip-"));
  const tree = path.join(tmp, "tree");
  const stage = path.join(tmp, "stage");
  const top = path.join(stage, SYSTEM_ID);
  git(["worktree", "add", "--detach", tree, commit], { stdio: "ignore" });
  try {
    // 2. Copy only tracked files Foundry needs.
    const tracked = execFileSync("git", ["ls-files", "-z"], { cwd: tree, encoding: "utf8" })
      .split("\0").filter(Boolean);
    const wanted = tracked.filter((f) => {
      const head = f.split("/")[0];
      if (!COPY.includes(head)) return false;
      if (f.startsWith("packs/_source/")) return false;
      const name = path.posix.basename(f);
      if (name === ".gitkeep") return false;
      if (/^packs\/[^/]+\/(LOCK|LOG|LOG\.old)$/.test(f)) return false;
      return true;
    });
    if (!wanted.includes("system.json")) fail(`${tag} has no system.json`);
    for (const f of wanted) {
      const dest = path.join(top, f);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(path.join(tree, f), dest);
    }

    // 3. Clean the staged system.json (the repo's own copy is never touched).
    const sysPath = path.join(top, "system.json");
    const sys = JSON.parse(fs.readFileSync(sysPath, "utf8"));
    sys.version = version;
    sys.url = "https://domoorestudio.com/dont-get-forked/";
    for (const a of sys.authors ?? []) a.url = "https://domoorestudio.com/";
    delete sys.manifest;
    delete sys.download;
    delete sys.bugs;
    fs.writeFileSync(sysPath, JSON.stringify(sys, null, 2) + "\n");

    // 4. A short install README.
    fs.writeFileSync(path.join(top, "README.md"), [
      `# Don't Get Forked for Foundry VTT, release ${version}`,
      "",
      "Game design & writing: Richard Moore.",
      "",
      "## Installing by hand",
      "",
      "1. Unzip this file into Foundry's `Data/systems` folder, so you get `Data/systems/dont-get-forked/system.json`.",
      "2. Restart Foundry.",
      "3. Pick Don't Get Forked when you create a world.",
      "",
    ].join("\n"));

    // 7 (text part). Nothing that names the repository, its owner or a commit.
    const problems = [];
    const files = walk(stage).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    for (const f of files) {
      if (f.startsWith(`${SYSTEM_ID}/packs/`)) continue;
      scan(path.join(stage, f), f, problems);
    }
    const sources = path.join(tree, "packs", "_source");
    if (fs.existsSync(sources)) {
      for (const f of walk(sources)) scan(path.join(sources, f), `packs/_source/${f}`, problems);
    }
    if (problems.length) fail(`forbidden text found:\n  ${problems.join("\n  ")}`);

    // 5. Zip reproducibly: fixed times and modes, byte-ordered list, no extra attributes.
    const when = new Date(Number(git(["show", "-s", "--format=%ct", commit]).trim()) * 1000);
    const dirs = new Set();
    for (const f of files) {
      fs.chmodSync(path.join(stage, f), 0o644);
      fs.utimesSync(path.join(stage, f), when, when);
      for (let d = path.posix.dirname(f); d !== "."; d = path.posix.dirname(d)) dirs.add(d);
    }
    for (const d of dirs) {
      fs.chmodSync(path.join(stage, d), 0o755);
      fs.utimesSync(path.join(stage, d), when, when);
    }
    const name = `Dont_Get_Forked_Foundry_v${version}.zip`;
    const out = path.join(tmp, name);
    execFileSync("zip", ["-X", "-q", "-@", out], {
      cwd: stage, input: files.join("\n") + "\n", env: { ...process.env, TZ: "UTC" },
    });

    // 7. Check the result.
    const buf = fs.readFileSync(out);
    if (buf.length > MAX_BYTES) fail(`${name} is ${buf.length} bytes, over 25 MiB`);
    if (!buf.subarray(0, 4).equals(Buffer.from("PK\x03\x04", "latin1"))) fail(`${name} has no ZIP signature`);
    const eocd = buf.lastIndexOf(Buffer.from("PK\x05\x06", "latin1"));
    if (eocd < 0 || buf.readUInt16LE(eocd + 20) !== 0) fail(`${name} has a zip comment`);
    const listing = execFileSync("unzip", ["-l", out], { encoding: "utf8" });
    if (!listing.includes(`${SYSTEM_ID}/system.json`)) fail(`${name} lacks ${SYSTEM_ID}/system.json`);

    // 6. Keep only the current zip in downloads/.
    fs.mkdirSync(DOWNLOADS, { recursive: true });
    for (const f of fs.readdirSync(DOWNLOADS)) {
      if (f.endsWith(".zip") && f !== name) fs.rmSync(path.join(DOWNLOADS, f));
    }
    fs.copyFileSync(out, path.join(DOWNLOADS, name));

    try { git(["diff", "--quiet", "--", "system.json"]); }
    catch { fail("the repository's own system.json changed"); }

    console.log(`Wrote downloads/${name} (${tag}, ${commit.slice(0, 7)}, ${buf.length} bytes, ${files.length} files)`);
  } finally {
    git(["worktree", "remove", "--force", tree], { stdio: "ignore" });
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

try { main(); } catch (err) { console.error(err.message); process.exit(1); }
