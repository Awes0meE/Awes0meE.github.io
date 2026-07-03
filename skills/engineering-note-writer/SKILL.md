---
name: engineering-note-writer
description: Generate and revise XJTLU Portfolio engineering-note copy in the user's Chinese-first practical learning-log style. Use when the user provides bullet points, rough project details, timelines, technical stacks, screenshots/files, oral notes, project import materials, or asks to write/rewrite/polish project notes, project page body copy, media captions, summaries, bilingual Chinese/English portfolio prose, or "make this sound like my own engineering notes" for this portfolio.
---

# Engineering Note Writer

This skill writes portfolio copy for `Awes0meE / Li Zhiyi`.

Core output: a Chinese-first engineering note that reads like the user personally wrote it, plus an accurate English counterpart for the bilingual site.

Use this skill with `AddProject.skill` during the writing phase of project imports, and use it directly when the user asks for note/project/media copy from rough bullet points.

## Required Context

Before writing for this repository, read the task-relevant parts of:

- `CODEX.md`
- `MEMORY.md`
- `docs/content-workflow.md`
- representative existing notes under `content/notes/`

Use these bundled references:

- `references/hard-gated-checklist.md`: read first and keep open as the mandatory writing checklist.
- `references/voice-rules.md`: read before drafting or rewriting prose.
- `references/note-archetypes.md`: read before choosing structure.
- `references/bilingual-writing.md`: read before producing English counterpart text or MDX-ready bilingual sections.
- `references/self-review.md`: read before claiming a draft is ready.

## Hard-Gated Writing

Before drafting or rewriting, read `references/hard-gated-checklist.md` and use it as the live checklist.

Rules:

- Do not draft before the evidence/fact gate has enough concrete anchors or explicit unknowns.
- Do not use first person unless the evidence supports personal action.
- Do not produce final copy before the voice gate checks banned wording and AI-like patterns.
- Do not produce English copy as a short marketing summary; it must match the Chinese substance.
- Do not hand off MDX-ready text until public-boundary and path checks pass.
- If a gate fails, revise or ask a focused question before continuing.

## Working Principle

The note should feel like:

```text
一个正在整理自己工程经历的人，把当时怎么开始、怎么卡住、怎么改、留下了哪些证据、现在回头怎么看，认真但不端着地写下来。
```

Do not write a resume, press release, academic paper, AI handoff report, or generic product case study.

## Input Intake

Accept messy input. The user may only provide:

- bullet points;
- a source folder path;
- a few technologies;
- "I want to emphasize X";
- screenshots/videos/PDF/source snippets;
- rough Chinese oral notes.

Extract or ask for only what is missing and important:

- project/time range;
- what triggered the work;
- what the user actually did;
- what got stuck;
- what changed;
- what evidence exists;
- what is still missing;
- what must not be claimed or published.

Do not block for polished wording. Turn rough details into structure.

## Drafting Workflow

### 1. Build The Fact Sheet

Before prose, write an internal fact sheet:

```text
Project:
Time range:
Context:
User role/action:
Technical stack:
Timeline:
Key stuck points:
Key decisions:
Evidence files:
Public/private constraints:
Current result:
Looking-back point:
Uncertainties:
```

Never invent facts to fill blanks. If something is unknown, write around it or mark it as a question.

### 2. Choose A Note Archetype

Read `references/note-archetypes.md`, then choose one primary archetype:

- debugging recap;
- environment setup;
- hardware/archive note;
- project build log;
- learning path;
- evidence/file explanation;
- project overview.

Use the archetype to decide section order. Do not force every section into every note.

### 3. Create A Timeline Spine

Turn bullet points into an ordered spine:

```text
起点 -> 第一个问题 -> 试过的方向 -> 真正卡住的点 -> 改法 -> 结果 -> 留下的证据 -> 现在回头看
```

If the project is not chronological, use a system spine:

```text
目标 -> 结构/模块 -> 关键约束 -> 证据 -> 还缺什么 -> 回头看
```

The draft must have a visible reason why one paragraph follows another.

### 4. Draft Chinese First

Write the Chinese main draft first.

Rules:

- Use concrete files, tools, symptoms, boards, commands, screenshots, videos, and dates.
- Use "我" only when the evidence supports personal action. Otherwise use neutral action phrasing.
- Keep mild self-reflection when it explains the engineering work.
- Prefer "卡在..." / "先把...跑起来" / "现在回头看..." over formal delivery language.
- Let paragraphs breathe. One paragraph should usually carry one move.
- Use bullets only for file lists, evidence lists, or genuinely parallel items.

### 5. Add The English Counterpart

Read `references/bilingual-writing.md`.

English must match the Chinese content, not summarize it into a smaller marketing blurb. It should be clear, technical, and natural. Keep the Chinese voice as the source of truth.

### 6. Produce MDX-Ready Output When Needed

When the output is meant for `content/notes/*.mdx` or `content/projects/*.mdx`, include:

- suggested `title/titleZh`;
- suggested `summary/summaryZh`;
- suggested tags;
- suggested section headings;
- body text in the repository's bilingual heading style, such as `## Starting Point / 起点`;
- links or placeholders for concrete evidence paths.

Do not fabricate upload paths. Use provided paths or mark placeholders clearly.

### 7. Self-Review

Read `references/self-review.md`, then run the checks before finalizing:

- fact integrity;
- timeline/system structure;
- voice;
- bilingual equivalence;
- public boundary language;
- MDX readiness.

If the draft fails, revise it before showing it as final.

## Cooperation With AddProject.skill

When `AddProject.skill` is importing a project:

1. Use AddProject for source audit, public-safety decisions, file copying, media metadata, validation, Git workflow, and release.
2. Use this skill for project/note prose, summaries, captions, and rewriting user bullet points into engineering notes.
3. If writing reveals missing evidence or public-risk ambiguity, return that question to AddProject's audit/review flow.

## Output Shapes

For a standalone writing request, return:

```text
Draft type:
Assumptions:
Chinese draft:
English counterpart:
Suggested title/summary/tags:
Open questions:
```

For a project import, return MDX-ready sections and metadata that AddProject can place into the content files.

## Hard No

Do not:

- invent first-person experiences;
- overstate project impact;
- turn the note into a resume achievement list;
- use corporate words such as `赋能`, `闭环`, `抓手`, `沉淀`, `落地成效` unless quoting source text;
- use AI handoff phrases such as `本次仅公开`, `公开证据边界`, `功能改动没有故意扩大`;
- flatten everything into `首先 / 其次 / 最后`;
- use negation-then-reframe templates such as `不是...而是...`, `不是为了...而是...`, `并不是...而是...`, `不只是...而...`, `not X but Y`, or `not only...but...`; state the positive engineering point directly or split it into concrete evidence sentences;
- write a tiny English summary when Chinese has a real article body;
- remove technical constraints just to sound smoother.
