# Reader-Prose Hard Gates

Apply these gates to model-authored reader-facing Chinese and English article body for portfolio project pages and their related notes. Every applicable violation must reach zero hits before release. A permitted punctuation mark is not a hit merely because the character exists.

## Scope The Scan Correctly

Scan reader-visible `title` and `titleZh`, headings, paragraphs, transitions, list prose, and endings written for the reader. The two title fields remain in scope even when the target stores them inside frontmatter.

Exclude all other frontmatter and metadata, Markdown syntax from the wording and punctuation scans, URL and link destinations, fenced code, inline code, commands, file paths, raw errors and logs, verbatim artifact text, and exact technical strings that must remain unchanged. Still inspect Markdown emphasis structure for L1-3. Do not use an exclusion to hide ordinary reader-facing prose.

These gates do not change the existing composition rules. Learning-note headings remain available when a new work or study block helps navigation. Bullets remain available for real parallel sets of files, measurements, checks, or alternatives. Ordinary words such as `首先`, `其次`, and `最后` remain legal when natural; rewrite them only when they become a repeated scaffold.

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

## L1-2 Scan Punctuation And Quotation Use

Do not use an em dash, Chinese dash, en dash, or double hyphen as a dash in model-authored normal prose: `—`, `——`, `–`, or ` -- `. Use a comma, semicolon, colon, parentheses, or a sentence boundary. Exact quoted material, raw logs, and technical syntax remain covered by the scope exclusions above.

Allow Chinese or ASCII colons, `：` or `:`, when they perform a clear grammatical job, such as introducing a real list, explanation, result, or source quotation. Reject them when they turn narrative prose or headings into template labels such as `问题：答案`, `原因：结论`, `关键点：解释`, or a row of bold mini-headings. Also reject dense repetition in which adjacent sentences or paragraphs keep using the same label-colon frame. Judge the function and repetition, not the character alone.

Allow quotation marks when they identify traceable source wording, a real utterance, a UI label, a document claim, or a term being discussed as language. Prefer inline code for commands, identifiers, filenames, and exact code-like tokens. Reject decorative or scare quotes that only make an ordinary phrase look ironic, important, or profound, and reject dense repeated quotation that turns ordinary concepts into model-styled labels. Keep real quotations exact and attributed closely enough that the reader knows whose wording they are seeing.

Use natural quotation marks for the target language and preserve the punctuation of a verbatim source when accuracy requires it. Do not normalize a grounded quotation merely to satisfy another tool's style preference.

## L1-3 Scan Canned Structure

Reject textbook openings such as `在当今……的时代`, `在当今……背景下`, `随着……的发展`, and `随着技术的不断进步`, plus direct English equivalents such as `in today's rapidly changing era`, `in today's landscape`, and `with the continued development of`.

Do not use bold as paragraph-level structure. More than two consecutive source lines of bold prose, or a full prose paragraph whose main structure depends on bold, fails this check. Short emphasis remains available when it genuinely helps.

Keep the current heading and list rules. Do not add a fixed heading count below the existing ceiling, and do not reject a genuine parallel bullet list merely because it has more than three items.

Reject bare negative-first binary reframes such as `不是 A，而是 B`, `这不是 A，这是 B`, `问题不在 A，而在 B`, `难点不是 A，而是 B`, `not A but B`, and `was not A; it was B`. State the useful conclusion directly. Ordinary factual negation remains allowed. The confirmed qualifier `不是说 A 不行，而是说 B` remains allowed when it prevents a real misreading and is not repeated as scaffolding.

## Do Not Manufacture A Scene

Do not write `比如有一次` or another scene lead-in unless the event is real and confirmed. A plausible example is still fabricated if the source does not place Li in that event.

If the user confirms both a real event and the direction or intensity of the reaction, reconstruct a first-person scene using only that confirmed anchor. Natural reaction wording is allowed; new time, place, action, dialogue, participant, technical result, or causal order is not. If only an emotion is confirmed, keep it as an emotion rather than inventing a surrounding scene. Write `我自己还没试过` only when the user has confirmed that fact.

## L1-4 Enforce Note-Specific Prohibitions

Record any reader-facing expression, construction, metaphor, title form, address, or punctuation use that the user explicitly prohibits for the current note. Match the scan to what the user prohibited: exact forms and obvious variants for an expression ban, or direct functional equivalents for a construction or reader-effect ban. Every applicable hit must reach zero even when the general rules above would otherwise allow it.

Match the scope of the user's instruction. If the user prohibits an exact word or phrase, scan that expression and obvious inflectional variants; do not invent a wider semantic ban. If the user prohibits a function, construction, or reader effect, scan direct functional equivalents as well as the literal wording.

Do not silently turn a one-note prohibition into a permanent global ban. Promote it into this repository-wide reference only when the user explicitly makes it a durable writing preference.

## Release Decision

Run L1-1 through L1-4 after the Chinese draft, again after the English adaptation, and once more on the final reader-facing body. Repair every prohibited hit individually. Semantically necessary colons and grounded quotations remain allowed; zero applicable violations is the release threshold.
