# Content Build Reference

Use this while creating or editing project, note, media, and asset files.

## Repo Targets

```text
content/projects/<project-slug>.mdx
content/notes/<project-slug>-<topic>.mdx
content/media.json
public/uploads/projects/<project-slug>/
```

Use `apply_patch` for text edits. Use normal file-copy tools for binary assets. Normalize text uploads to UTF-8 before committing.

## Filename Rules

- Prefer lowercase ASCII kebab-case.
- Preserve meaningful version numbers: `board-v2-front.jpg`, `release-note-v05.md`.
- Avoid spaces, Chinese punctuation, random export IDs, and parenthetical duplicate suffixes in public filenames.
- Keep original extensions when format matters.
- Prefer `cover.jpg` or `<project-slug>-cover.jpg` for cover images.
- Prefer explicit names for evidence: `schematic-page-1.jpg`, `demo-loop.mp4`, `debug-log-uart.txt`.

## Project Frontmatter

```yaml
---
title: "English project title"
titleZh: "中文项目标题"
summary: "One or two precise English sentences."
summaryZh: "一到两句准确中文摘要。"
date: "2026-05 to 2026-06"
status: "In Progress"
tags: ["STM32", "PCB", "Control"]
cover: "/uploads/projects/<project-slug>/cover.jpg"
featured: false
links:
  repo: "https://github.com/Awes0meE/example"
assetPaths:
  - "/uploads/projects/<project-slug>"
---
```

Set `featured: true` only when the project should appear on the homepage.

Use explicit `assetPaths` file lists when a folder contains any file that should not appear in the project file browser.

## Note Frontmatter

```yaml
---
title: "English note title"
titleZh: "中文笔记标题"
summary: "English summary."
summaryZh: "中文摘要。"
date: "2026-05-07"
tags: ["Project Log", "Debugging"]
visibility: public
projectSlug: "<project-slug>"
---
```

Use `visibility: private` for drafts. Missing visibility is treated as private. Truly confidential content should stay outside the public repo.

## Media JSON Entry

```json
{
  "id": "<project-slug>-cover",
  "title": "English title",
  "titleZh": "中文标题",
  "type": "image",
  "src": "/uploads/projects/<project-slug>/cover.jpg",
  "thumbnail": "/uploads/projects/<project-slug>/cover.jpg",
  "date": "2026-05-07",
  "projectSlug": "<project-slug>",
  "caption": "Concrete English caption.",
  "captionZh": "具体中文说明。"
}
```

Every image/video that should be discoverable on `/media` needs one entry. Keep IDs unique.

## Writing Style

Chinese:

- write like a real learning/debugging log;
- use concrete filenames, symptoms, decisions, and constraints;
- start sections from action or observation when natural;
- allow plain phrasing such as `先把...跑起来`, `卡在...`, `回头看...`;
- avoid AI handoff wording such as `这次只公开`, `公开证据边界`, `功能改动没有故意扩大`.

English:

- match the Chinese content and structure;
- keep it accurate and readable, not a tiny summary;
- do not invent achievements beyond the evidence;
- keep technical terms stable.

Useful sections:

```markdown
## 起点 / Starting Point
## 怎么卡住 / Where It Got Stuck
## 怎么改 / What Changed
## 文件和证据 / Files And Evidence
## 现在回头看 / Looking Back
```

Use only sections that fit the material.

## Rendering Patterns

Single image:

```markdown
![English caption / 中文说明](/uploads/projects/<project-slug>/image.jpg)
```

Gallery:

```markdown
![Front view / 正面](/uploads/projects/<project-slug>/front.jpg)
![Back view / 背面](/uploads/projects/<project-slug>/back.jpg)
![Schematic page / 原理图页](/uploads/projects/<project-slug>/schematic.jpg)
```

Language-scoped listing:

````markdown
```en-text
English-only listing.
```

```zh-text
只在中文视图展示的列表。
```
````

Normal code fences are shared evidence and remain visible in both languages.

## Internal Links

- Link project body to important notes: `/notes/<note-slug>`.
- Link downloads/assets with public paths: `/uploads/projects/<project-slug>/<file>`.
- Use `projectSlug` to create related note/media surfaces automatically.
- Keep project detail order in mind: body, related notes, public project files, related media.

## Validation Checklist

Before each commit:

- project/note frontmatter is valid;
- local upload paths exist;
- `assetPaths` does not expose private/noisy files;
- media `src` and `thumbnail` exist;
- media IDs are unique;
- note `projectSlug` matches an existing project slug;
- English and Chinese sections cover the same substantive content;
- text files pass UTF-8 validation;
- images/videos are reasonably sized;
- no unrelated changes are staged.
