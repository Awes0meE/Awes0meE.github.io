import Image from "next/image";
import { cn } from "@/lib/utils";

type BlockLanguage = "en" | "zh" | "neutral";

function hasChinese(text: string) {
  return /[\u3400-\u9fff]/.test(text);
}

function hasEnglishWords(text: string) {
  return /[A-Za-z]{3,}/.test(text);
}

function getBlockLanguage(text: string): BlockLanguage {
  if (hasChinese(text)) {
    return "zh";
  }

  if (hasEnglishWords(text)) {
    return "en";
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
  const parts = text.split(/\s+\/\s+/);

  if (parts.length !== 2) {
    return null;
  }

  const [first, second] = parts;
  const zhCandidate = second.trim();

  if (hasChinese(first) || !hasChinese(zhCandidate) || /^[A-Za-z0-9]/.test(zhCandidate)) {
    return null;
  }

  return {
    en: first,
    zh: second
  };
}

function parseInline(text: string) {
  const inlinePattern = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
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
      parts.push(
        <a
          key={`${match[2]}-${match.index}`}
          href={match[3]}
          className="font-medium text-pine underline-offset-4 hover:underline"
        >
          {match[2]}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
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

export function ContentRenderer({ source }: { source: string }) {
  const blocks = splitBlocks(source);
  const textBlocks = blocks
    .map((block) => block.trim())
    .filter(
      (block) =>
        !block.startsWith("## ") &&
        !block.startsWith("### ") &&
        !block.startsWith("![") &&
        !block.startsWith("```")
    );
  const hasEnglishBody = textBlocks.some((block) => getBlockLanguage(block) === "en");
  const hasChineseBody = textBlocks.some((block) => getBlockLanguage(block) === "zh");
  const shouldScopeLanguage = hasEnglishBody && hasChineseBody;

  return (
    <div>
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        const codeMatch = trimmed.match(/^```([A-Za-z0-9_+#.-]*)\n([\s\S]*?)\n```$/);

        if (imageMatch) {
          const [, alt, src] = imageMatch;

          return (
            <figure key={index} className="mt-8 overflow-hidden rounded-lg border border-line bg-chalk">
              <div className="relative aspect-[16/9]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 896px, calc(100vw - 40px)"
                  className="object-contain p-2"
                />
              </div>
              {alt ? (
                <figcaption className="border-t border-line bg-white px-4 py-3 text-sm text-graphite">
                  {parseLocalizedInline(alt)}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (codeMatch) {
          const [, language, code] = codeMatch;

          return (
            <figure key={index} className="mt-6 overflow-hidden rounded-lg border border-line bg-[#10231e]">
              {language ? (
                <figcaption className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-normal text-[#b9d2ca]">
                  {language}
                </figcaption>
              ) : null}
              <pre className="overflow-auto p-4 text-xs leading-5 text-[#e8f3ef]">
                <code>{code}</code>
              </pre>
            </figure>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index} className="mt-10 text-2xl font-semibold text-ink">
              {parseLocalizedInline(trimmed.replace(/^##\s+/, ""))}
            </h2>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={index} className="mt-8 text-xl font-semibold text-ink">
              {parseLocalizedInline(trimmed.replace(/^###\s+/, ""))}
            </h3>
          );
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
