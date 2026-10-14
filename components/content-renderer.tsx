import Image from "next/image";
import { cn } from "@/lib/utils";

type BlockLanguage = "en" | "zh" | "neutral";

function hasChinese(text: string) {
  return /[\u3400-\u9fff]/.test(text);
}

function getBlockLanguage(text: string): BlockLanguage {
  const normalized = text
    .replace(/`[^`]*`/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "");
  const chineseCount = normalized.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const englishWordCount = normalized.match(/[A-Za-z]{3,}/g)?.length ?? 0;
  const startsWithChinese = /^[\s>*-]*[\u3400-\u9fff]/.test(normalized);
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

  if (englishWordCount) {
    return "en";
  }

  if (chineseCount) {
    return "zh";
  }

  return "neutral";
}

function getLanguageClass(language: BlockLanguage) {
  if (language === "neutral") {
    return undefined;
  }

  return language === "zh" ? "lang-zh" : "lang-en";
}

function getScopedLanguageClass(language: BlockLanguage, shouldScope: boolean) {
  return shouldScope ? getLanguageClass(language) : undefined;
}

function splitBilingualSlash(text: string) {
  const separators = [...text.matchAll(/\s+\/\s+/g)].reverse();

  for (const separator of separators) {
    const separatorIndex = separator.index ?? -1;

    if (separatorIndex < 0) {
      continue;
    }

    const first = text.slice(0, separatorIndex).trim();
    const second = text.slice(separatorIndex + separator[0].length).trim();

    if (!first || !second) {
      continue;
    }

    if (hasChinese(first) || !hasChinese(second)) {
      continue;
    }

    return {
      en: first,
      zh: second
    };
  }

  return null;
}

function getCodeLanguageMeta(language: string) {
  const scopedLanguage = language.match(/^(en|zh)-(.+)$/);

  if (!scopedLanguage) {
    return {
      displayLanguage: language,
      languageClass: undefined
    };
  }

  return {
    displayLanguage: scopedLanguage[2],
    languageClass: scopedLanguage[1] === "en" ? "lang-en" : "lang-zh"
  };
}

function isHtmlCommentBlock(block: string) {
  return /^<!--[\s\S]*-->$/.test(block.trim());
}

function resolveContentHref(href: string, baseHref?: string) {
  if (
    !baseHref ||
    href.startsWith("/") ||
    href.startsWith("#") ||
    /^[a-z][a-z0-9+.-]*:/i.test(href)
  ) {
    return href;
  }

  try {
    const resolved = new URL(href, new URL(baseHref, "https://portfolio.local"));
    return `${resolved.pathname}${resolved.search}${resolved.hash}`;
  } catch {
    return href;
  }
}

function parseInline(text: string, baseHref?: string) {
  const inlinePattern = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlinePattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      parts.push(
        <code key={`code-${match.index}`} className="prose-code text-wrap-safe">
          {match[1]}
        </code>
      );
    } else {
      if (match[2]) {
        parts.push(
          <a
            key={`${match[2]}-${match.index}`}
            href={resolveContentHref(match[3], baseHref)}
            className="prose-link"
          >
            {match[2]}
          </a>
        );
      } else {
        parts.push(
          <strong key={`strong-${match.index}`} className="prose-strong">
            {parseInline(match[4], baseHref)}
          </strong>
        );
      }
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function plainInlineText(text: string) {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function slugifyHeading(text: string) {
  return plainInlineText(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]+/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseLocalizedInline(text: string, baseHref?: string) {
  const split = splitBilingualSlash(text);

  if (!split) {
    return <span>{parseInline(text, baseHref)}</span>;
  }

  return (
    <>
      <span className="lang-en">{parseInline(split.en, baseHref)}</span>
      <span className="lang-zh">{parseInline(split.zh, baseHref)}</span>
    </>
  );
}

type ParsedImage = {
  alt: string;
  src: string;
};

function parseImageLine(line: string, baseHref?: string): ParsedImage | null {
  const match = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

  if (!match) {
    return null;
  }

  return {
    alt: match[1],
    src: resolveContentHref(match[2], baseHref)
  };
}

function splitBlocks(source: string) {
  const blocks: string[] = [];
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  let buffer: string[] = [];
  let inFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      buffer.push(line);
      inFence = !inFence;
      continue;
    }

    if (!inFence && !line.trim()) {
      if (buffer.length) {
        blocks.push(buffer.join("\n"));
        buffer = [];
      }
      continue;
    }

    buffer.push(line);
  }

  if (buffer.length) {
    blocks.push(buffer.join("\n"));
  }

  return blocks.filter((block) => block.trim());
}

function isMarkdownTable(block: string) {
  const lines = block.trim().split("\n");
  return lines.length >= 2 && lines[0].includes("|") && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[1]);
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function hasBilingualBody(blocks: string[]) {
  const textBlocks = blocks
    .map((block) => block.trim())
    .filter(
      (block) =>
        !isHtmlCommentBlock(block) &&
        !block.startsWith("# ") &&
        !block.startsWith("## ") &&
        !block.startsWith("### ") &&
        !block.startsWith("#### ") &&
        !block.startsWith("![") &&
        !block.startsWith("```")
    );
  const hasEnglishBody = textBlocks.some((block) => getBlockLanguage(block) === "en");
  const hasChineseBody = textBlocks.some((block) => getBlockLanguage(block) === "zh");
  return hasEnglishBody && hasChineseBody;
}

function createHeadingIdFactory() {
  const headingCounts = new Map<string, number>();

  return function getHeadingId(text: string) {
    const baseId = slugifyHeading(text);

    if (!baseId) {
      return undefined;
    }

    const count = headingCounts.get(baseId) ?? 0;
    headingCounts.set(baseId, count + 1);
    return count ? `${baseId}-${count + 1}` : baseId;
  };
}

export type ContentOutlineEntry = {
  id: string;
  en: string;
  zh: string;
  /** "both" when the heading carries both languages; otherwise the only language it shows in. */
  language: "both" | "en" | "zh";
};

/** Top-level sections, with the same ids ContentRenderer gives their headings. */
export function getContentOutline(source: string): ContentOutlineEntry[] {
  const blocks = splitBlocks(source);
  const shouldScopeLanguage = hasBilingualBody(blocks);
  const getHeadingId = createHeadingIdFactory();
  const outline: ContentOutlineEntry[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    const heading = trimmed.match(/^(#{1,4})\s+([\s\S]+)$/);

    if (!heading || isHtmlCommentBlock(trimmed)) {
      continue;
    }

    const text = heading[2];
    const id = getHeadingId(text);

    if (!id || heading[1].length > 2) {
      continue;
    }

    const split = splitBilingualSlash(text);
    const plain = plainInlineText(text);

    if (split) {
      outline.push({ id, en: plainInlineText(split.en), zh: plainInlineText(split.zh), language: "both" });
      continue;
    }

    const language = getBlockLanguage(text);
    outline.push({
      id,
      en: plain,
      zh: plain,
      language: shouldScopeLanguage && language !== "neutral" ? language : "both"
    });
  }

  return outline;
}

export function ContentRenderer({ source, baseHref }: { source: string; baseHref?: string }) {
  const blocks = splitBlocks(source);
  const shouldScopeLanguage = hasBilingualBody(blocks);
  const getHeadingId = createHeadingIdFactory();

  function renderHeading(index: number, level: 2 | 3 | 4, text: string, className: string) {
    const Heading = `h${level}` as const;
    const split = splitBilingualSlash(text);
    const languageClass = split ? undefined : getScopedLanguageClass(getBlockLanguage(text), shouldScopeLanguage);

    return (
      <Heading id={getHeadingId(text)} key={index} className={cn(className, languageClass)}>
        {split ? (
          <>
            <span className="lang-en">{parseInline(split.en, baseHref)}</span>
            <span className="lang-zh">{parseInline(split.zh, baseHref)}</span>
          </>
        ) : (
          parseInline(text, baseHref)
        )}
      </Heading>
    );
  }

  function renderImageFigure(image: ParsedImage, key: string | number, sizes: string, className?: string) {
    return (
      <figure key={key} className={cn("prose-figure", className)}>
        <a href={image.src} className="block">
          <div className="relative aspect-[16/9]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              loading="eager"
              unoptimized
              className="prose-figure-image"
            />
          </div>
        </a>
        {image.alt ? (
          <figcaption className="prose-figcaption">
            {parseLocalizedInline(image.alt, baseHref)}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div className="bench-prose">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        const imageLines = trimmed.split("\n").map((line) => parseImageLine(line, baseHref));
        const codeMatch = trimmed.match(/^```([A-Za-z0-9_+#.-]*)\n([\s\S]*?)\n```$/);

        if (isHtmlCommentBlock(trimmed)) {
          return null;
        }

        if (imageLines.every(Boolean)) {
          const images = imageLines as ParsedImage[];

          if (images.length === 1) {
            return renderImageFigure(images[0], index, "(min-width: 1024px) 760px, calc(100vw - 32px)");
          }

          return (
            <div key={index} className="prose-figure-pair">
              {images.map((image, imageIndex) =>
                renderImageFigure(image, `${index}-${image.src}-${imageIndex}`, "(min-width: 1024px) 380px, calc(100vw - 32px)")
              )}
            </div>
          );
        }

        if (codeMatch) {
          const [, language, code] = codeMatch;
          const { displayLanguage, languageClass } = getCodeLanguageMeta(language);

          return (
            <figure key={index} className={cn("prose-codeblock", languageClass)}>
              {displayLanguage ? (
                <figcaption className="prose-codeblock-label">
                  {displayLanguage}
                </figcaption>
              ) : null}
              <pre tabIndex={0} className="prose-pre">
                <code>{code}</code>
              </pre>
            </figure>
          );
        }

        if (isMarkdownTable(trimmed)) {
          const [headerLine, , ...rowLines] = trimmed.split("\n");
          const headers = splitTableRow(headerLine);
          const rows = rowLines.filter((line) => line.includes("|")).map(splitTableRow);
          const languageClass = getScopedLanguageClass(getBlockLanguage(trimmed), shouldScopeLanguage);

          return (
            <div key={index} className={cn("prose-table-wrap", languageClass)}>
              <table className="prose-table">
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th key={header}>
                        {parseInline(header, baseHref)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={`${row.join("-")}-${rowIndex}`}>
                      {headers.map((_, cellIndex) => (
                        <td key={cellIndex}>
                          {parseInline(row[cellIndex] ?? "", baseHref)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (trimmed.startsWith("# ")) {
          return renderHeading(index, 2, trimmed.replace(/^#\s+/, ""), "prose-h2");
        }

        if (trimmed.startsWith("## ")) {
          return renderHeading(index, 2, trimmed.replace(/^##\s+/, ""), "prose-h2");
        }

        if (trimmed.startsWith("### ")) {
          return renderHeading(index, 3, trimmed.replace(/^###\s+/, ""), "prose-h3");
        }

        if (trimmed.startsWith("#### ")) {
          return renderHeading(index, 4, trimmed.replace(/^####\s+/, ""), "prose-h4");
        }

        if (/^[-*]\s+/.test(trimmed)) {
          const languageClass = getScopedLanguageClass(getBlockLanguage(trimmed), shouldScopeLanguage);

          return (
            <ul key={index} className={cn("prose-list prose-list-bullet", languageClass)}>
              {trimmed.split("\n").map((item) => (
                <li key={item}>
                  {parseInline(item.replace(/^[-*]\s+/, ""), baseHref)}
                </li>
              ))}
            </ul>
          );
        }

        if (/^\d+[.)]\s+/.test(trimmed)) {
          const languageClass = getScopedLanguageClass(getBlockLanguage(trimmed), shouldScopeLanguage);

          return (
            <ol key={index} className={cn("prose-list prose-list-number", languageClass)}>
              {trimmed.split("\n").map((item) => (
                <li key={item}>
                  {parseInline(item.replace(/^\d+[.)]\s+/, ""), baseHref)}
                </li>
              ))}
            </ol>
          );
        }

        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={index}
              className={cn(
                "prose-quote",
                getScopedLanguageClass(getBlockLanguage(trimmed), shouldScopeLanguage)
              )}
            >
              {parseInline(trimmed.replace(/^>\s?/gm, ""), baseHref)}
            </blockquote>
          );
        }

        if (/^-{3,}$/.test(trimmed)) {
          return <hr key={index} className="prose-rule" />;
        }

        return (
          <p
            key={index}
            className={cn(
              "prose-p text-wrap-safe",
              getScopedLanguageClass(getBlockLanguage(trimmed), shouldScopeLanguage)
            )}
          >
            {parseInline(trimmed, baseHref)}
          </p>
        );
      })}
    </div>
  );
}
