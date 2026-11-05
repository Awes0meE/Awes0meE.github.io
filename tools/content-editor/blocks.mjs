// Splits an MDX body into the same blocks `components/content-renderer.tsx` renders,
// classifies each one as English, Chinese or neutral with the renderer's own rules, and
// rebuilds the body after Chinese-only edits without touching any other line.

export function hasChinese(text) {
  return /[㐀-鿿]/.test(text);
}

// Mirrors getBlockLanguage in components/content-renderer.tsx.
export function getBlockLanguage(text) {
  const normalized = text
    .replace(/`[^`]*`/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "");
  const chineseCount = normalized.match(/[㐀-鿿]/g)?.length ?? 0;
  const englishWordCount = normalized.match(/[A-Za-z]{3,}/g)?.length ?? 0;
  const startsWithChinese = /^[\s>*-]*[㐀-鿿]/.test(normalized);
  const hasChinesePunctuation = /[，。；：？！、（）《》“”]/.test(normalized);
  if (
    chineseCount &&
    (!englishWordCount ||
      startsWithChinese ||
      hasChinesePunctuation ||
      chineseCount >= 6 ||
      chineseCount >= englishWordCount / 3)
  ) {
    return "zh";
  }
  if (englishWordCount) return "en";
  if (chineseCount) return "zh";
  return "neutral";
}

// Mirrors splitBilingualSlash, but also reports where the Chinese half starts.
export function splitBilingualSlash(text) {
  const separators = [...text.matchAll(/\s+\/\s+/g)].reverse();
  for (const separator of separators) {
    const first = text.slice(0, separator.index).trim();
    const zhStart = separator.index + separator[0].length;
    const second = text.slice(zhStart).trim();
    if (!first || !second) continue;
    if (hasChinese(first) || !hasChinese(second)) continue;
    return { en: first, zh: second, zhStart };
  }
  return null;
}

function isHtmlComment(text) {
  return /^<!--[\s\S]*-->$/.test(text);
}

const imageLine = /^!\[[^\]]*\]\([^)]+\)$/;

// Returns { lines, blocks }. Each block keeps its [start, end) line range in `lines`.
export function parseBody(body) {
  const lines = body.replace(/\r\n?/g, "\n").split("\n");
  const ranges = [];
  let start = -1;
  let inFence = false;
  lines.forEach((line, index) => {
    if (line.trim().startsWith("```")) {
      if (start === -1) start = index;
      inFence = !inFence;
      return;
    }
    if (!inFence && !line.trim()) {
      if (start !== -1) ranges.push([start, index]);
      start = -1;
      return;
    }
    if (start === -1) start = index;
  });
  if (start !== -1) ranges.push([start, lines.length]);

  const raw = ranges.map(([s, e]) => lines.slice(s, e).join("\n"));
  const bilingual = raw.some((text) => isTextBlock(text) && getBlockLanguage(text.trim()) === "en")
    && raw.some((text) => isTextBlock(text) && getBlockLanguage(text.trim()) === "zh");

  const blocks = ranges.map(([s, e], index) => ({ index, start: s, end: e, ...classify(raw[index].trim(), bilingual) }));
  return { lines, blocks, bilingual };
}

function isTextBlock(text) {
  const trimmed = text.trim();
  return !isHtmlComment(trimmed) && !/^#{1,4} /.test(trimmed) && !trimmed.startsWith("![") && !trimmed.startsWith("```");
}

// role: "zh"   — editable Chinese text (`text` is what the editor shows)
//       "en"   — English-only, hidden in the Chinese view
//       "fixed"— shown read-only for orientation (images, code, neutral)
//       "skip" — not shown at all (HTML comments)
function classify(text, bilingual) {
  if (isHtmlComment(text)) return { role: "skip", type: "comment", source: text };

  const heading = text.match(/^(#{1,4})\s+([\s\S]+)$/);
  if (heading) {
    const split = splitBilingualSlash(heading[2]);
    if (split) {
      return { role: "zh", type: "heading-pair", level: heading[1].length, text: split.zh, en: split.en, source: text };
    }
    const language = getBlockLanguage(heading[2]);
    if (language === "en" && bilingual) return { role: "en", type: "heading", source: text };
    if (language === "neutral") return { role: "fixed", type: "heading", text: heading[2], source: text };
    return { role: "zh", type: "heading", level: heading[1].length, text: heading[2], source: text };
  }

  if (text.split("\n").every((line) => imageLine.test(line.trim()))) {
    const captions = [...text.matchAll(/!\[([^\]]*)\]/g)].map((m) => {
      const split = splitBilingualSlash(m[1]);
      return split ? split.zh : m[1];
    });
    return { role: "fixed", type: "image", text: captions.join(" · "), source: text };
  }

  const fence = text.match(/^```([A-Za-z0-9_+#.-]*)\n/);
  if (fence) {
    if (/^en-/.test(fence[1]) && bilingual) return { role: "en", type: "code", source: text };
    return { role: "fixed", type: "code", text: text.split("\n").slice(1, 4).join("\n"), source: text };
  }

  const language = getBlockLanguage(text);
  if (language === "neutral") return { role: "fixed", type: "text", text, source: text };
  if (language === "en" && bilingual) return { role: "en", type: "text", source: text };
  return { role: "zh", type: "text", text, source: text };
}

function tidy(text) {
  return text.replace(/\r\n?/g, "\n").replace(/^\s*\n/, "").replace(/\s+$/, "");
}

// Rebuild the editable form of a zh block back into its Markdown source.
export function blockSource(block, text) {
  const value = tidy(text);
  if (block.type === "heading-pair") {
    if (!value) throw new Error("双语小标题的中文部分不能删空。");
    const body = block.source.replace(/^#{1,4}\s+/, "");
    const prefix = block.source.slice(0, block.source.length - body.length);
    const split = splitBilingualSlash(body);
    return `${prefix}${body.slice(0, split.zhStart)}${value.replace(/\n+/g, " ")}`;
  }
  if (block.type === "heading") {
    return value ? `${"#".repeat(block.level)} ${value.replace(/\n+/g, " ")}` : "";
  }
  return value;
}

// edits: Map<blockIndex, newEditableText>. Returns the new body and the per-block changes.
export function applyEdits(body, edits) {
  const { lines, blocks } = parseBody(body);
  const changes = [];
  for (const [index, text] of edits) {
    const block = blocks[index];
    if (!block || block.role !== "zh") throw new Error(`第 ${index} 段不是可编辑的中文段落。`);
    const next = blockSource(block, text);
    if (next === block.source) continue;
    changes.push({ block, before: block.source, after: next });
  }
  // Splice from the bottom so earlier line numbers stay valid.
  for (const { block, after } of [...changes].sort((a, b) => b.block.start - a.block.start)) {
    const replacement = after ? after.split("\n") : [];
    lines.splice(block.start, block.end - block.start, ...replacement);
    if (!after) {
      // A deleted block leaves two separators; drop one blank line.
      while (lines[block.start] === "" && (block.start === 0 || lines[block.start - 1] === "")) {
        lines.splice(block.start, 1);
      }
    }
  }
  return { body: lines.join("\n"), changes, blocks };
}
