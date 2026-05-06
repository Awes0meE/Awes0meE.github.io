import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = process.cwd();
const utf8Decoder = new TextDecoder("utf-8", { fatal: true });

const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".vercel",
  "node_modules",
  "legacy",
  "test-results"
]);

const textExtensions = new Set([
  ".c",
  ".cjs",
  ".cpp",
  ".cs",
  ".css",
  ".csv",
  ".h",
  ".hpp",
  ".html",
  ".ini",
  ".ino",
  ".ioc",
  ".iss",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".sh",
  ".sm2d",
  ".smis",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yaml",
  ".yml"
]);

const textFileNames = new Set([
  ".editorconfig",
  ".gitattributes",
  ".gitignore",
  ".nvmrc",
  ".nojekyll"
]);

const mojibakeSnippets = [
  "\uFFFD",
  "\u6D93\u20AC",
  "\u7EE0\u20AC",
  "\u6FEF\u638D",
  "\u6924\u572D",
  "\u7ED7\u65C7",
  "\u922B",
  "\u9286",
  "\u951B"
];

function shouldCheck(filePath) {
  const name = path.basename(filePath);
  const extension = path.extname(filePath).toLowerCase();
  return textFileNames.has(name) || textExtensions.has(extension);
}

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && shouldCheck(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function listGitManagedFiles() {
  try {
    const output = execFileSync(
      "git",
      ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
      {
        cwd: repoRoot,
        encoding: "buffer",
        maxBuffer: 64 * 1024 * 1024
      }
    );

    return output
      .toString("utf8")
      .split("\0")
      .filter(Boolean)
      .map((filePath) => path.resolve(repoRoot, filePath));
  } catch {
    return walk(repoRoot);
  }
}

function hasNullBytes(text) {
  return text.includes("\u0000");
}

const failures = [];
const files = listGitManagedFiles()
  .filter((filePath) => fs.existsSync(filePath))
  .filter((filePath) => {
    const relativeParts = path.relative(repoRoot, filePath).split(path.sep);
    return !relativeParts.some((part) => ignoredDirectories.has(part));
  })
  .filter(shouldCheck)
  .sort((a, b) => a.localeCompare(b));

for (const filePath of files) {
  const buffer = fs.readFileSync(filePath);
  let text;

  try {
    text = utf8Decoder.decode(buffer);
  } catch {
    failures.push({
      file: path.relative(repoRoot, filePath),
      reason: "not valid UTF-8"
    });
    continue;
  }

  if (hasNullBytes(text)) {
    failures.push({
      file: path.relative(repoRoot, filePath),
      reason: "contains null bytes"
    });
  }

  for (const snippet of mojibakeSnippets) {
    if (text.includes(snippet)) {
      failures.push({
        file: path.relative(repoRoot, filePath),
        reason: `matches mojibake snippet ${JSON.stringify(snippet)}`
      });
      break;
    }
  }
}

if (failures.length) {
  console.error("Encoding validation failed. Text files must be UTF-8 without mojibake:");
  for (const failure of failures.slice(0, 100)) {
    console.error(`- ${failure.file}: ${failure.reason}`);
  }
  if (failures.length > 100) {
    console.error(`...and ${failures.length - 100} more`);
  }
  process.exit(1);
}

console.log(`Encoding validation passed: ${files.length} UTF-8 text files.`);
