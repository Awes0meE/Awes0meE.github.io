// Local Chinese-only content editor for the portfolio: a tiny 127.0.0.1-only server
// plus a single-page UI (index.html).
//
// The editor shows only the Chinese title and the Chinese blocks of each body.
// Saving rewrites just the `titleZh:` frontmatter line and the edited Chinese blocks;
// English text, other frontmatter fields and untouched lines stay byte-identical.
// Every saved change is appended to docs/active-work/translation-queue.json so a
// later Claude session can update the matching English (see docs/content-workflow.md).
//
// Usage: npm run editor            (opens an app window)
//        npm run editor -- --no-open

import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { applyEdits, parseBody } from "./blocks.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
// EDITOR_REPO_ROOT lets tests run against a scratch copy of content/ and docs/.
const repoRoot = path.resolve(process.env.EDITOR_REPO_ROOT ?? path.join(here, "..", ".."));
const contentDirs = {
  project: path.join(repoRoot, "content", "projects"),
  note: path.join(repoRoot, "content", "notes")
};
const queueFile = path.join(repoRoot, "docs", "active-work", "translation-queue.json");
const token = crypto.randomBytes(16).toString("hex");
const slugPattern = /^[a-z0-9][a-z0-9-]*$/;

function hash(text) {
  return crypto.createHash("sha1").update(text).digest("hex");
}

function relative(file) {
  return path.relative(repoRoot, file).replaceAll("\\", "/");
}

function writeAtomic(file, text) {
  const temp = `${file}.tmp`;
  fs.writeFileSync(temp, text, "utf8");
  fs.renameSync(temp, file);
}

function splitFile(raw) {
  const text = raw.replace(/^﻿/, "");
  if (!text.startsWith("---\n")) throw new Error("missing opening frontmatter fence");
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) throw new Error("missing closing frontmatter fence");
  return { frontmatter: text.slice(4, end + 1), body: text.slice(end + 5) };
}

function readEntry(kind, slug) {
  const file = path.join(contentDirs[kind], `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { frontmatter, body } = splitFile(raw);
  const data = yaml.load(frontmatter) ?? {};
  return { kind, slug, file, raw, frontmatter, body, data };
}

// ---------- translation queue ----------

function readQueue() {
  if (!fs.existsSync(queueFile)) return { entries: [] };
  const queue = JSON.parse(fs.readFileSync(queueFile, "utf8"));
  return { ...queue, entries: Array.isArray(queue.entries) ? queue.entries : [] };
}

function writeQueue(queue) {
  writeAtomic(queueFile, `${JSON.stringify(queue, null, 2)}\n`);
}

// Record one Chinese change. If an earlier unprocessed entry already produced the text
// being changed now, extend that entry instead, so each entry always reads
// "original Chinese (which the English still matches) -> current Chinese".
function recordChange(queue, change) {
  const now = new Date().toISOString();
  const sameFile = queue.entries.filter((e) => e.file === change.file && e.field === change.field);
  const parts = (text) => text.split(/\n\s*\n/);
  const previous =
    sameFile.find((e) => e.after === change.before) ??
    (change.field === "body" ? sameFile.find((e) => e.after && parts(e.after).includes(change.before)) : undefined);

  if (previous) {
    previous.after =
      previous.after === change.before
        ? change.after
        : previous.after.replace(change.before, () => change.after).replace(/\n{3,}/g, "\n\n").trim();
    previous.updatedAt = now;
    if (previous.after === previous.before) queue.entries.splice(queue.entries.indexOf(previous), 1);
    return;
  }
  queue.entries.push({ id: crypto.randomUUID(), ...change, savedAt: now });
}

function pendingCounts() {
  const counts = {};
  for (const entry of readQueue().entries) counts[entry.file] = (counts[entry.file] ?? 0) + 1;
  return counts;
}

// ---------- read / list ----------

function listEntries() {
  const counts = pendingCounts();
  const read = (kind) =>
    fs
      .readdirSync(contentDirs[kind])
      .filter((name) => name.endsWith(".mdx"))
      .map((name) => readEntry(kind, name.slice(0, -4)));
  const projects = read("project");
  const notes = read("note");
  const summary = (entry) => ({
    kind: entry.kind,
    slug: entry.slug,
    titleZh: String(entry.data.titleZh ?? entry.data.title ?? ""),
    date: String(entry.data.date ?? ""),
    visibility: entry.kind === "note" ? String(entry.data.visibility ?? "private") : undefined,
    pending: counts[relative(entry.file)] ?? 0
  });
  const byDate = (a, b) => String(b.data.date ?? "").localeCompare(String(a.data.date ?? ""));
  const projectSlugs = new Set(projects.map((p) => p.slug));
  return {
    pendingTotal: Object.values(counts).reduce((sum, n) => sum + n, 0),
    projects: projects.sort(byDate).map((project) => ({
      ...summary(project),
      notes: notes
        .filter((note) => note.data.projectSlug === project.slug)
        .sort(byDate)
        .map(summary)
    })),
    unlinkedNotes: notes.filter((note) => !projectSlugs.has(note.data.projectSlug)).map(summary)
  };
}

function entryView(entry) {
  const { blocks } = parseBody(entry.body);
  return {
    kind: entry.kind,
    slug: entry.slug,
    titleZh: String(entry.data.titleZh ?? ""),
    hash: hash(entry.raw),
    path: relative(entry.file),
    pending: pendingCounts()[relative(entry.file)] ?? 0,
    blocks: blocks
      .filter((b) => b.role === "zh" || b.role === "fixed")
      .map(({ index, role, type, level, text }) => ({ index, role, type, level, text }))
  };
}

// ---------- save ----------

function nearestHeading(blocks, index) {
  for (let i = index - 1; i >= 0; i -= 1) {
    if (blocks[i].type === "heading" || blocks[i].type === "heading-pair") return blocks[i].source;
  }
  return null;
}

function saveEntry(kind, slug, { titleZh, edits, baseHash }) {
  const entry = readEntry(kind, slug);
  if (baseHash !== hash(entry.raw)) {
    return { status: 409, payload: { error: "文件在磁盘上已被其他程序修改，请重新打开这一篇再改。" } };
  }
  if (typeof titleZh !== "string" || !titleZh.trim()) {
    return { status: 400, payload: { error: "中文标题不能为空。" } };
  }

  let result;
  try {
    result = applyEdits(entry.body, new Map(Object.entries(edits ?? {}).map(([i, text]) => [Number(i), String(text)])));
  } catch (error) {
    return { status: 400, payload: { error: error.message } };
  }

  const file = relative(entry.file);
  const oldTitleZh = String(entry.data.titleZh ?? "");
  const newTitleZh = titleZh.trim().replace(/\s*\n\s*/g, " ");
  let frontmatter = entry.frontmatter;
  if (newTitleZh !== oldTitleZh) {
    const line = `titleZh: ${JSON.stringify(newTitleZh)}`;
    frontmatter = /^titleZh:.*$/m.test(frontmatter)
      ? frontmatter.replace(/^titleZh:.*$/m, () => line)
      : frontmatter.replace(/^title:.*$/m, (match) => `${match}\n${line}`);
    if (yaml.load(frontmatter).titleZh !== newTitleZh) {
      return { status: 500, payload: { error: "标题写回校验失败，未保存。" } };
    }
  }

  const next = `---\n${frontmatter}---\n${result.body}`;
  if (next === entry.raw) return { status: 200, payload: { hash: hash(next), unchanged: true } };

  const queue = readQueue();
  if (newTitleZh !== oldTitleZh) {
    recordChange(queue, {
      file,
      kind,
      slug,
      field: "titleZh",
      englishCounterpart: `title: ${JSON.stringify(String(entry.data.title ?? ""))}`,
      before: oldTitleZh,
      after: newTitleZh
    });
  }
  for (const { block, before, after } of result.changes) {
    const previous = result.blocks[block.index - 1];
    recordChange(queue, {
      file,
      kind,
      slug,
      field: "body",
      blockType: block.type,
      section: nearestHeading(result.blocks, block.index),
      englishCounterpart:
        block.type === "heading-pair"
          ? `(English half of the same heading) ${block.en}`
          : previous?.role === "en"
            ? previous.source
            : null,
      before,
      after
    });
  }

  writeAtomic(entry.file, next);
  writeQueue(queue);
  return { status: 200, payload: { hash: hash(next) } };
}

// ---------- http ----------

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 5_000_000) reject(new Error("payload too large"));
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

// The page pings every minute; with no request at all for this long (window gone
// without a goodbye), the server stops itself.
const idleLimitMs = 30 * 60 * 1000;
let shutdownTimer = null;
let idleTimer = null;

function armIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => process.exit(0), idleLimitMs);
}

const server = http.createServer(async (req, res) => {
  const { port } = server.address();
  if (req.headers.host !== `127.0.0.1:${port}`) return sendJson(res, 403, { error: "forbidden host" });
  clearTimeout(shutdownTimer);
  armIdleTimer();

  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  try {
    if (req.method === "GET" && url.pathname === "/") {
      const html = fs.readFileSync(path.join(here, "index.html"), "utf8").replace("__TOKEN__", token);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      return res.end(html);
    }
    if (!url.pathname.startsWith("/api/")) return sendJson(res, 404, { error: "not found" });
    // sendBeacon cannot set headers, so the goodbye call carries the token in the query.
    const given = req.headers["x-token"] ?? url.searchParams.get("token");
    if (given !== token) return sendJson(res, 403, { error: "bad token" });

    if (req.method === "POST" && url.pathname === "/api/ping") return sendJson(res, 200, {});
    if (req.method === "POST" && url.pathname === "/api/bye") {
      // The window closed; exit unless it reconnects (a reload) within a few seconds.
      shutdownTimer = setTimeout(() => process.exit(0), 4000);
      return sendJson(res, 200, {});
    }
    if (req.method === "GET" && url.pathname === "/api/list") return sendJson(res, 200, listEntries());

    const match = url.pathname.match(/^\/api\/(project|note)\/([^/]+)$/);
    if (!match || !slugPattern.test(match[2])) return sendJson(res, 404, { error: "not found" });
    const [, kind, slug] = match;
    if (!fs.existsSync(path.join(contentDirs[kind], `${slug}.mdx`))) {
      return sendJson(res, 404, { error: "not found" });
    }

    if (req.method === "GET") return sendJson(res, 200, entryView(readEntry(kind, slug)));
    if (req.method === "PUT") {
      const { status, payload } = saveEntry(kind, slug, JSON.parse(await readBody(req)));
      return sendJson(res, status, payload);
    }
    return sendJson(res, 405, { error: "method not allowed" });
  } catch (error) {
    return sendJson(res, 500, { error: String(error.message ?? error) });
  }
});

function openWindow(url) {
  const detached = { detached: true, stdio: "ignore" };
  if (process.platform === "win32") {
    const edge = [
      process.env["ProgramFiles(x86)"],
      process.env.ProgramFiles,
      process.env.LOCALAPPDATA
    ]
      .filter(Boolean)
      .map((base) => path.join(base, "Microsoft", "Edge", "Application", "msedge.exe"))
      .find((candidate) => fs.existsSync(candidate));
    const child = edge
      ? spawn(edge, [`--app=${url}`, "--window-size=1280,860"], detached)
      : spawn("cmd", ["/c", "start", "", url], detached);
    child.unref();
  } else if (process.platform === "darwin") {
    const child = spawn("open", ["-na", "Google Chrome", "--args", `--app=${url}`], detached);
    child.on("error", () => spawn("open", [url], detached).unref());
    child.on("exit", (code) => code && spawn("open", [url], detached).unref());
    child.unref();
  } else {
    spawn("xdg-open", [url], detached).unref();
  }
}

server.listen(0, "127.0.0.1", () => {
  const url = `http://127.0.0.1:${server.address().port}/`;
  console.log(`Content editor running at ${url}`);
  console.log("Close the editor window (or press Ctrl+C) to stop.");
  armIdleTimer();
  if (!process.argv.includes("--no-open")) openWindow(url);
});
