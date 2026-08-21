# Bilingual Writing

Use this before producing English or bilingual MDX.

## Keep One Article, Two Natural Voices

Draft Chinese first. Treat it as the factual and narrative source of truth. Rewrite the English around the same information moves rather than translating sentence by sentence.

The user chose roughly 75% of the Khazix reference energy in Chinese and 60% of that same reference energy in English. These are qualitative surface-style anchors, not measurable quotas and not a rule that English should contain 60% of the Chinese draft. English may reduce Chinese-specific particles, literal slang, repeated emphasis, and exaggerated punctuation, but it must keep the confirmed emotional intensity, reaction, and humor target. A different English surface is not permission to weaken or exaggerate what the writer felt.

## Preserve The Cognition Route

Both languages must retain:

- the same actions and evidence;
- the same shifts in attention, including cross-subsystem jumps and later returns;
- the same researched explanation where it changes the writer's understanding;
- the same later synthesis that recombines earlier learning;
- the same uncertainty and public limits;
- the same boundary between documented project work and knowledge researched later;
- the same technical explanation;
- the same important reaction or joke target;
- the same ending beat.

English may change sentence boundaries and phrasing, and it may smooth a local transition when needed. It may not become a smaller marketing summary or reorder the note into a cleaner artifact taxonomy.

Apply `reader-prose-hard-gates.md` to both language bodies and to reader-visible `title` and `titleZh`. Avoid direct English equivalents of the banned Chinese scaffolds. Keep other metadata, links, code, paths, logs, verbatim artifacts, and exact technical strings outside that prose scan.

Use direct English assertions instead of literal `not A but B` reframes. Keep factual limits explicit, but express Chinese nuance naturally in English rather than copying its wording literally.

Keep source links close to the researched sentence in both languages when the target format permits it. Make the link placement natural; do not collect sources into a detached section that breaks the attention route.

## Translate The Comic Mechanism

Translate why something is funny, not the surface idiom.

```text
计数器偶尔会多跳几格，编码器像是在偷偷给自己加戏。

The count occasionally jumped a few extra steps, as if the encoder had added a small flourish of its own.
```

The English uses a calmer surface rhythm, but the reaction and contact-bounce joke keep their strength. Do not replace the joke with generic unexpected behavior occurred.

## Keep Technical Terms Stable

Preserve exact terms such as:

- `projectSlug`, `assetPaths`;
- `qmake`, `windeployqt`, `macdeployqt`;
- `EXTI`, `NVIC`, `PWM`;
- `Gerber`, `BOM`, `PnP`;
- `CMake`, `Ninja`, `Qt Creator`.

Translate around the term. Do not rename commands or normalize away useful filenames.

## Keep Bilingual Titles As Learning-Note Indexes

Keep both languages short, accurate, and equal in scope. Translate the subject,
not the surface word order. Suitable pairs include:

```markdown
# Seamly2D Three-Week Development Log / Seamly2D 三周开发记录
## Development Attempts / 开发尝试
## Release Packaging / Release 打包
## Contact Bounce / 触点抖动
```

Do not turn the English title into an explanatory subtitle when Chinese uses a
short label, or vice versa. The body in each language carries the friction,
judgment, and cognition change. Avoid turning a compact Chinese learning-note
heading into a marketing title, metaphor, or complete sentence.

## Match The Target File's Pairing

Existing final MDX often places English before Chinese so the language switch can select blocks consistently. Drafting may still begin in Chinese internally. Follow the target file's established block order when returning MDX-ready text.

Use language-scoped fences such as `en-text` and `zh-text` only when an entire code or listing block belongs to one language view. Shared code remains language-neutral.

## Captions And Metadata

- Make captions name the actual board, diagram, symptom, or stage.
- Keep `title/titleZh` and `summary/summaryZh` equivalent in scope and certainty.
- Keep summaries precise; do not advertise “valuable experience” or “successful exploration.”
- Return only the metadata the user requested or the target file already defines; do not invent a `projectSlug`, route, date, or visibility value to make the draft look complete.
- Use only real public paths or explicit placeholders requested by the user.
