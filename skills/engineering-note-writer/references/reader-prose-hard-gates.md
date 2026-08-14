# Reader-Prose Hard Gates

Apply these gates to model-authored reader-facing Chinese and English article body for portfolio project pages and their related notes. Every applicable scan must reach zero hits before release.

## Scope The Scan Correctly

Scan headings, paragraphs, transitions, list prose, and endings written for the reader.

Exclude frontmatter and other metadata, Markdown syntax from the wording and punctuation scans, URL and link destinations, fenced code, inline code, commands, file paths, raw errors and logs, verbatim artifact text, and exact technical strings that must remain unchanged. Still inspect Markdown emphasis structure for L1-3. Do not use an exclusion to hide ordinary narrative prose.

These gates do not change the existing composition rules. Thought-bookmark headings remain available when attention genuinely shifts. Bullets remain available for real parallel sets of files, measurements, checks, or alternatives. Ordinary words such as `首先`, `其次`, and `最后` remain legal when natural; rewrite them only when they become a repeated scaffold.

## L1-1 Scan Banned Wording

Replace every occurrence of these Chinese patterns in scoped prose:

- `说白了` -> use `坦率地讲` or `其实就是` when either fits;
- `意味着什么` or `这意味着` -> state the consequence directly, or use `那结果会怎样呢` or `所以呢`;
- `本质上` -> use `说到底`, `其实`, or the concrete claim;
- `换句话说` -> use `你想想看`, `也就是说`, or continue directly;
- `不可否认` -> delete it and make the positive claim;
- `综上所述` or `总的来说` -> use a concrete callback to the active engineering question;
- `值得注意的是` or `不难发现` -> delete the preface and state the observation;
- `让我们来看看` or `接下来让我们` -> move directly to the event, artifact, or question;
- `这是一篇`, `本文将`, `下面介绍`, or `这篇笔记整理了` when they narrate the document or writing act -> begin from the engineering subject;
- `AI工具` or `某个模型` -> use the exact known product or model name; if it is unknown, ask, preserve the unknown internally, omit the reference, or write around it without guessing.

Reject direct English equivalents as well, including `to put it simply`, `what does this mean`, `this means`, `essentially`, `in essence`, `in other words`, `it is undeniable`, `in summary`, `overall`, `it is worth noting`, `it is easy to see`, `let us take a look`, `next, let us`, `this article will`, and `this note records` when they perform the same canned or meta-document function. Judge case-insensitively and by function, not only by capitalization.

## L1-2 Scan Banned Punctuation

Reject these characters in scoped Chinese and English prose:

- Chinese or ASCII colon, `：` or `:` -> use a comma, period, or recast the sentence;
- any em dash or Chinese dash, `—` or `——` -> use a comma or period;
- straight, curly, or full-width double quotation marks, `"`, `“”`, or `＂` -> use `「」`, inline code for an exact technical token, or no marks.

The exclusions above protect syntax and verbatim technical evidence. They do not permit decorative colons, dashes, or double quotes in normal prose.

## L1-3 Scan Canned Structure

Reject textbook openings such as `在当今……的时代`, `在当今……背景下`, `随着……的发展`, and `随着技术的不断进步`, plus direct English equivalents such as `in today's rapidly changing era`, `in today's landscape`, and `with the continued development of`.

Do not use bold as paragraph-level structure. More than two consecutive source lines of bold prose, or a full prose paragraph whose main structure depends on bold, fails this check. Short emphasis remains available when it genuinely helps.

Keep the current heading and list rules. Do not add a fixed heading count below the existing ceiling, and do not reject a genuine parallel bullet list merely because it has more than three items.

## Do Not Manufacture A Scene

Do not write `比如有一次` or another scene lead-in unless the event is real and confirmed. A plausible example is still fabricated if the source does not place Li in that event.

If the user confirms both a real event and the direction or intensity of the reaction, reconstruct a first-person scene using only that confirmed anchor. Natural reaction wording is allowed; new time, place, action, dialogue, participant, technical result, or causal order is not. If only an emotion is confirmed, keep it as an emotion rather than inventing a surrounding scene. Write `我自己还没试过` only when the user has confirmed that fact.

## Release Decision

Run L1-1, L1-2, and L1-3 after the Chinese draft, again after the English adaptation, and once more on the final reader-facing body. Repair every hit individually. Zero hits is the release threshold.
