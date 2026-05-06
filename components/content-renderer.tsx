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

  if (chineseCount && (!englishWordCount || chineseCount >= englishWordCount * 2)) {
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

function parseInline(text: string) {
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
        <code key={`code-${match.index}`} className="rounded border border-line bg-paper px-1 py-0.5 text-[0.9em] text-ink">
          {match[1]}
        </code>
      );
    } else {
      if (match[2]) {
        parts.push(
          <a
            key={`${match[2]}-${match.index}`}
            href={match[3]}
            className="font-medium text-pine underline-offset-4 hover:underline"
          >
            {match[2]}
          </a>
        );
      } else {
        parts.push(
          <strong key={`strong-${match.index}`} className="font-semibold text-ink">
            {parseInline(match[4])}
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

function parseLocalizedInline(text: string) {
  const split = splitBilingualSlash(text);

  if (!split) {
    return <span>{parseInline(text)}</span>;
  }

  return (
    <>
      <span className="lang-en">{parseInline(split.en)}</span>
      <span className="lang-zh">{parseInline(split.zh)}</span>
    </>
  );
}

type ParsedImage = {
  alt: string;
  src: string;
};

function parseImageLine(line: string): ParsedImage | null {
  const match = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

  if (!match) {
    return null;
  }

  return {
    alt: match[1],
    src: match[2]
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

export function ContentRenderer({ source }: { source: string }) {
  const blocks = splitBlocks(source);
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
  const shouldScopeLanguage = hasEnglishBody && hasChineseBody;
  const headingCounts = new Map<string, number>();

  function getHeadingId(text: string) {
    const baseId = slugifyHeading(text);

    if (!baseId) {
      return undefined;
    }

    const count = headingCounts.get(baseId) ?? 0;
    headingCounts.set(baseId, count + 1);
    return count ? `${baseId}-${count + 1}` : baseId;
  }

  function renderHeading(index: number, level: 2 | 3 | 4, text: string, className: string) {
    const Heading = `h${level}` as const;
    const split = splitBilingualSlash(text);
    const languageClass = split ? undefined : getScopedLanguageClass(getBlockLanguage(text), shouldScopeLanguage);

    return (
      <Heading id={getHeadingId(text)} key={index} className={cn(className, "scroll-mt-24", languageClass)}>
        {split ? (
          <>
            <span className="lang-en">{parseInline(split.en)}</span>
            <span className="lang-zh">{parseInline(split.zh)}</span>
          </>
        ) : (
          parseInline(text)
        )}
      </Heading>
    );
  }

  function renderImageFigure(image: ParsedImage, key: string | number, sizes: string, className?: string) {
    return (
      <figure key={key} className={cn("overflow-hidden rounded-lg border border-line bg-chalk", className)}>
        <a href={image.src} className="block">
          <div className="relative aspect-[16/9]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              loading="eager"
              unoptimized
              className="object-contain p-2 transition duration-500 hover:scale-[1.01]"
            />
          </div>
        </a>
        {image.alt ? (
          <figcaption className="border-t border-line bg-white px-4 py-3 text-sm text-graphite">
            {parseLocalizedInline(image.alt)}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div>
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        const imageLines = trimmed.split("\n").map(parseImageLine);
        const codeMatch = trimmed.match(/^```([A-Za-z0-9_+#.-]*)\n([\s\S]*?)\n```$/);

        if (isHtmlCommentBlock(trimmed)) {
          return null;
        }

        if (imageLines.every(Boolean)) {
          const images = imageLines as ParsedImage[];

          if (images.length === 1) {
            return renderImageFigure(images[0], index, "(min-width: 1024px) 896px, calc(100vw - 40px)", "mt-8");
          }

          return (
            <div key={index} className="mt-8 grid gap-4 md:grid-cols-2">
              {images.map((image, imageIndex) =>
                renderImageFigure(image, `${index}-${image.src}-${imageIndex}`, "(min-width: 1024px) 432px, calc(100vw - 40px)")
              )}
            </div>
          );
        }

        if (codeMatch) {
          const [, language, code] = codeMatch;
          const { displayLanguage, languageClass } = getCodeLanguageMeta(language);

          return (
            <figure key={index} className={cn("mt-6 overflow-hidden rounded-lg border border-line bg-[#10231e]", languageClass)}>
              {displayLanguage ? (
                <figcaption className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-normal text-[#b9d2ca]">
                  {displayLanguage}
                </figcaption>
              ) : null}
              <pre className="overflow-auto p-4 text-xs leading-5 text-[#e8f3ef]">
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
            <div key={index} className={cn("mt-6 overflow-x-auto rounded-lg border border-line", languageClass)}>
              <table className="min-w-full border-collapse bg-white text-sm text-graphite">
                <thead className="bg-paper text-left text-ink">
                  <tr>
                    {headers.map((header) => (
                      <th key={header} className="border-b border-line px-4 py-3 font-semibold">
                        {parseInline(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={`${row.join("-")}-${rowIndex}`} className="border-b border-line last:border-b-0">
                      {headers.map((_, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 align-top leading-6">
                          {parseInline(row[cellIndex] ?? "")}
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
          return renderHeading(index, 2, trimmed.replace(/^#\s+/, ""), "mt-10 text-2xl font-semibold text-ink");
        }

        if (trimmed.startsWith("## ")) {
          return renderHeading(index, 2, trimmed.replace(/^##\s+/, ""), "mt-10 text-2xl font-semibold text-ink");
        }

        if (trimmed.startsWith("### ")) {
          return renderHeading(index, 3, trimmed.replace(/^###\s+/, ""), "mt-8 text-xl font-semibold text-ink");
        }

        if (trimmed.startsWith("#### ")) {
          return renderHeading(index, 4, trimmed.replace(/^####\s+/, ""), "mt-6 text-lg font-semibold text-ink");
        }

        if (/^[-*]\s+/.test(trimmed)) {
          const languageClass = getScopedLanguageClass(getBlockLanguage(trimmed), shouldScopeLanguage);

          return (
            <ul key={index} className={cn("mt-4 list-disc space-y-2 pl-5 text-graphite", languageClass)}>
              {trimmed.split("\n").map((item) => (
                <li key={item} className="leading-7">
                  {parseInline(item.replace(/^[-*]\s+/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        if (/^\d+[.)]\s+/.test(trimmed)) {
          const languageClass = getScopedLanguageClass(getBlockLanguage(trimmed), shouldScopeLanguage);

          return (
            <ol key={index} className={cn("mt-4 list-decimal space-y-2 pl-5 text-graphite", languageClass)}>
              {trimmed.split("\n").map((item) => (
                <li key={item} className="leading-7">
                  {parseInline(item.replace(/^\d+[.)]\s+/, ""))}
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
                "mt-5 border-l-4 border-pine bg-paper px-4 py-3 text-sm leading-7 text-graphite",
                getScopedLanguageClass(getBlockLanguage(trimmed), shouldScopeLanguage)
              )}
            >
              {parseInline(trimmed.replace(/^>\s?/gm, ""))}
            </blockquote>
          );
        }

        if (/^-{3,}$/.test(trimmed)) {
          return <hr key={index} className="mt-8 border-line" />;
        }

        return (
          <p
            key={index}
            className={cn(
              "mt-4 leading-7 text-graphite",
              getScopedLanguageClass(getBlockLanguage(trimmed), shouldScopeLanguage)
            )}
          >
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
