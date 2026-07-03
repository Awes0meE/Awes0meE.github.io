# Bilingual Writing

Use this before producing English counterpart text or MDX-ready bilingual sections.

## Default Direction

Write Chinese first. Then write English to match the Chinese.

The English should be:

- accurate;
- natural;
- technical enough;
- not shorter in substance;
- not more boastful than the Chinese;
- not a literal awkward translation.

## MDX Heading Pattern

Use bilingual headings:

```markdown
## Starting Point / 起点
## Where It Got Stuck / 怎么卡住
## What Changed / 怎么改
## Files And Evidence / 文件和证据
## Looking Back / 现在回头看
```

If the English side contains slashes as technical terms, keep the Chinese separator as the final ` / ` before Chinese text.

## Paragraph Pairing

Prefer paired paragraphs:

```markdown
English paragraph.

中文段落。
```

or Chinese-first when the note is being drafted:

```markdown
中文段落。

English counterpart.
```

Match the site's existing content style for the target file. Existing notes often place English before Chinese in final MDX. Drafting can still start Chinese-first internally.

## What To Translate

Translate:

- the actual reasoning;
- concrete tools/files/symptoms;
- limitations;
- looking-back reflection.

Do not translate by shrinking a detailed Chinese section into one English summary sentence.

## Technical Terms

Keep stable terms:

- `projectSlug`
- `assetPaths`
- `qmake`
- `windeployqt`
- `EXTI`
- `PWM`
- `Gerber`
- `BOM`
- `PnP`
- `CMake`
- `Qt Creator`

Translate around them, not through them.

## Voice Difference

Chinese can be slightly more conversational:

```text
现在回头看，这个目录确实有点野。
```

English should carry the same idea without becoming theatrical:

```text
Looking back, the folder was definitely messy, but it also shows how broad the early exploration was.
```

## Captions

Image captions should be concrete:

```markdown
![FOC schematic sheet 1 / FOC 原理图第一页](/uploads/projects/<slug>/foc-schematic-1.jpg)
```

Do not write generic captions like:

```markdown
![Project image / 项目图片](...)
```

## Summaries

Frontmatter summaries should be one or two precise sentences.

Good:

```text
A debugging note about moving Seamly2D from a Qt5 attempt to a Qt6 toolchain, including the qmake, windeployqt, and geometry-warning fixes.
```

Bad:

```text
This note describes a successful technical exploration and summarizes valuable development experience.
```
