import { Fragment } from "react";

/* Renders words from `zhWords` (lib/zh-words.ts) with a break opportunity
   between them; `.zh-words` stops breaks inside a word. */
export function ZhWords({ words }: { words: string[] }) {
  return (
    <span className="zh-words">
      {words.map((word, index) => (
        <Fragment key={index}>
          {index > 0 ? <wbr /> : null}
          {word}
        </Fragment>
      ))}
    </span>
  );
}
