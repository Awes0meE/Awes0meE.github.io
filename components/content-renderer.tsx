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
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <a
        key={`${match[1]}-${match.index}`}
        href={match[2]}
        className="font-medium text-pine underline-offset-4 hover:underline"
      >
        {match[1]}
      </a>
    );
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
    return <span className={getLanguageClass(getBlockLanguage(text))}>{parseInline(text)}</span>;
  }

  return (
    <>
      <span className="lang-en">{parseInline(split.en)}</span>
      <span className="lang-zh">{parseInline(split.zh)}</span>
    </>
  );
}

export function ContentRenderer({ source }: { source: string }) {
  const blocks = source.split(/\n{2,}/).filter(Boolean);
  const textBlocks = blocks
    .map((block) => block.trim())
    .filter((block) => !block.startsWith("## ") && !block.startsWith("### ") && !block.startsWith("!["));
  const hasEnglishBody = textBlocks.some((block) => getBlockLanguage(block) === "en");
  const hasChineseBody = textBlocks.some((block) => getBlockLanguage(block) === "zh");

  return (
    <div>
      {!hasEnglishBody ? (
        <p className="lang-en mt-4 rounded-lg border border-line bg-white px-4 py-3 text-sm leading-6 text-graphite">
          English body text is being prepared. The project title, summary, metadata, media captions, and navigation are already available in English.
        </p>
      ) : null}
      {!hasChineseBody ? (
        <p className="lang-zh mt-4 rounded-lg border border-line bg-white px-4 py-3 text-sm leading-6 text-graphite">
          中文正文正在补充中。项目标题、摘要、元数据、媒体说明和导航已经支持中文。
        </p>
      ) : null}
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

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

        if (trimmed.startsWith("- ")) {
          const languageClass = getLanguageClass(getBlockLanguage(trimmed));

          return (
            <ul key={index} className={cn("mt-4 list-disc space-y-2 pl-5 text-graphite", languageClass)}>
              {trimmed.split("\n").map((item) => (
                <li key={item} className="leading-7">
                  {parseInline(item.replace(/^-\s+/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className={cn("mt-4 leading-7 text-graphite", getLanguageClass(getBlockLanguage(trimmed)))}>
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
