import Image from "next/image";

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

export function ContentRenderer({ source }: { source: string }) {
  const blocks = source.split(/\n{2,}/).filter(Boolean);

  return (
    <div>
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
                  {alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index} className="mt-10 text-2xl font-semibold text-ink">
              {parseInline(trimmed.replace(/^##\s+/, ""))}
            </h2>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={index} className="mt-8 text-xl font-semibold text-ink">
              {parseInline(trimmed.replace(/^###\s+/, ""))}
            </h3>
          );
        }

        if (trimmed.startsWith("- ")) {
          return (
            <ul key={index} className="mt-4 list-disc space-y-2 pl-5 text-graphite">
              {trimmed.split("\n").map((item) => (
                <li key={item} className="leading-7">
                  {parseInline(item.replace(/^-\s+/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="mt-4 leading-7 text-graphite">
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
