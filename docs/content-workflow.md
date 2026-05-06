# Content Workflow

This document explains how to add real portfolio content without changing the application architecture.

## Content Priority

1. Review the current `main` deployment in the browser: Juanyun public legacy material, Nanjing Turing Qt/CMake/Notion source notes, Tianjin STM32 internship notes, and the media gallery.
2. Keep the Juanyun sensitive boundary explicit: `Current_Product_ACUnit_Project` and `Current_Product_BaseUnit_Project` stay public-safe only; other legacy Juanyun material can use reviewed public evidence.
3. Replace remaining placeholder visuals with real project photos, screenshots, videos, or diagrams.
4. Expand project archive pages with direct evidence, inline source/text previews, and internal links.
5. Improve `About`, media gallery polish, and smaller notes.
6. Keep public English and Chinese body sections equivalent. Frontmatter translation alone is not enough when an article body contains substantial Chinese or English content.

## Add Or Edit A Project

Project files live in:

```text
content/projects/
```

Create a new file:

```text
content/projects/my-project-slug.mdx
```

Use this frontmatter shape:

```yaml
---
title: "English title"
titleZh: "中文标题"
summary: "English summary"
summaryZh: "中文摘要"
date: "2026.05 to Now"
status: "In Progress"
tags: ["Control", "Embedded", "Next.js"]
cover: "/uploads/projects/my-project/cover.jpg"
featured: false
links:
  repo: "https://github.com/Awes0meE/example"
  demo: "https://example.com"
  download: "https://example.com/download"
assetPaths:
  - "/uploads/projects/my-project"
---
```

Set `featured: true` only for projects that should appear on the homepage.

Use `assetPaths` when a project should show uploaded public evidence. Entries can be individual files or directories under `public/uploads/`. Project pages preview images and videos, render Markdown / text documents as readable article content, render small source/code files in code frames, and link PDFs, spreadsheets, EDA/CAD files, fabrication archives, and other binary files. Prefer explicit file lists over broad directories when a folder contains Notion stubs, unfinished exports, or other files that should not appear as project evidence.

## Add Or Edit A Note

Note files live in:

```text
content/notes/
```

Create:

```text
content/notes/my-note-slug.mdx
```

Use:

```yaml
---
title: "English note title"
titleZh: "中文笔记标题"
summary: "English summary"
summaryZh: "中文摘要"
date: "2026-05-06"
tags: ["PID", "Control", "Lab Note"]
visibility: private
projectSlug: "my-project-slug"
---
```

`projectSlug` is optional. Add it when a note should appear automatically on a project detail page.

The value must match a file slug in `content/projects/`. Example: `projectSlug: "juanyun-thermal-hardware"` connects the note to `/work/juanyun-thermal-hardware`.

On project detail pages, related development notes appear above the public project-file archive. Use notes for narrative, debugging, and reflection; use `assetPaths` for the downloadable or inline-rendered evidence below that note trail.

`visibility` controls whether the note is served publicly:

- `visibility: public` makes the note appear on the homepage, `/notes`, project detail related-note sections, and `/notes/[slug]`.
- `visibility: private` hides the note from those public surfaces and makes the public detail route return 404.
- missing `visibility` is treated as private. Use this for drafts.

This is website-level hiding only. If the GitHub repository is public, private note source can still be visible in the repository. Truly confidential notes should stay outside the public repo or move to a future authenticated storage layer.

## Add Images Or Videos

Put assets under:

```text
public/uploads/
```

Recommended structure:

```text
public/uploads/projects/my-project/
public/uploads/media/
public/uploads/profile/
```

Reference files with public paths:

```text
/uploads/projects/my-project/cover.jpg
```

For technical archives, normalize filenames to stable ASCII names before publishing. Do not publish private or noisy folders directly. Exclude invoices, reimbursements, billing records, internship proof, executable installers, vendor package folders, and generated build outputs.

For company work, be stricter: do not put Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source files, full firmware source dumps, or internal requirement/manufacturing packages under `public/uploads/` unless they are explicitly reviewed and desensitized. For Juanyun, the user explicitly approved non-Current_Product legacy folders for selected public evidence; `Current_Product_ACUnit_Project*` and `Current_Product_BaseUnit_Project*` remain sensitive. Files under `public/uploads/` are public static assets even when no page links to them.

## Add Media Gallery Items

Edit:

```text
content/media.json
```

Example:

```json
{
  "id": "pid-step-response",
  "title": "PID step response",
  "titleZh": "PID 阶跃响应",
  "type": "image",
  "src": "/uploads/projects/my-project/step-response.png",
  "thumbnail": "/uploads/projects/my-project/step-response.png",
  "date": "2026-05-06",
  "projectSlug": "my-project",
  "caption": "Step response captured during controller tuning.",
  "captionZh": "控制器调参过程中记录的阶跃响应。"
}
```

Use `titleZh` and `captionZh` when a media card should switch cleanly between English and Simplified Chinese.

Every project/note image or video that should be discoverable from the media page needs a matching `content/media.json` entry. Use `projectSlug` whenever the media belongs to a project; the media page displays that source project on each card.

## Language Switching

The website has a top-right English / Simplified Chinese language switch. The default language is Simplified Chinese unless the visitor has saved English in browser `localStorage`.

- Use `BilingualText` for fixed labels in TSX files.
- Keep `title/titleZh` and `summary/summaryZh` complete for projects and notes.
- Use `titleZh/captionZh` in `content/media.json` for media cards.
- `ContentRenderer` can split simple bilingual headings such as `English / 中文` and hide language-detected body blocks when both languages exist. It does not show missing-language placeholder notices; single-language notes remain readable.
- Long MDX body content is not automatically machine-translated. Add real bilingual body sections manually when an article needs both languages, and keep the English section accurate to the Chinese section when the Chinese text is the user's original writing.
- Normal fenced code blocks are treated as shared technical evidence, so they are not hidden by the English/Chinese article-body filter.
- If a whole listing belongs to one language view, prefix the fence language with `en-` or `zh-`, for example `en-text`, `en-powershell`, or `zh-text`. The renderer shows only the suffix as the label and hides the block with the same language toggle CSS.
- Standalone HTML comments in MDX bodies are ignored by the renderer and can be used as internal markers.

## Writing Standard

Every serious project should eventually include:

- problem / background;
- what was built;
- technical stack;
- key decisions;
- evidence: screenshots, videos, diagrams, metrics, logs;
- links to source, demo, release, or paper if available;
- English and Chinese summaries.

Notes should keep the user's practical learning-log texture. Public pages should read like direct engineering notes, not AI handoff reports or self-promotional summaries:

- start from `起点` or the first confusing symptom when the motivation matters;
- use sections like `怎么卡住`, `怎么改`, `文件`, `还要补的记录`, and `现在回头看` when they fit;
- keep links to files, images, videos, source snippets, PDFs, and datasets concrete;
- avoid phrases like `这次只公开...`, `功能改动没有故意扩大`, `公开证据边界`, and repetitive `我负责了... / 我参与了...` lists;
- write in a plain learning-log voice, often beginning from the action or observation instead of a formal subject;
- add English headings or paired English paragraphs on public content when a section would otherwise be Chinese-only.
- if an uploaded public `.txt`, `.md`, or self-authored document is the real artifact, publish it as a proper note page with the original wording rendered as article text; project `assetPaths` can still link the file, but should not be the only readable copy.

Keep the tone honest, specific, and slightly informal when appropriate. Do not remove technical evidence or constraints just to make the writing more casual.

On Windows PowerShell, avoid Chinese batch-generation through inline here-string pipes. Use `apply_patch` for Chinese edits, or create a temporary UTF-8 script/file and run it. After generating Chinese content, verify the saved file with Node.js `fs.readFileSync(path, "utf8")` and check for `\uFFFD` or repeated question-mark mojibake before committing.

## Local Development Troubleshooting

For local preview:

```powershell
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

Avoid running `npm run build` while the dev server is still running. Both commands write to `.next/`, and concurrent writes can corrupt local cache files.

If a local dynamic route fails with:

```text
Cannot find module './vendor-chunks/esprima.js'
```

Use this recovery path:

1. Stop all project Node/Next.js processes.
2. Delete `.next/`.
3. Run `npm run dev` again.
4. Revisit the affected note route.

That error usually means the local `.next` cache is corrupt around `gray-matter -> js-yaml -> esprima`. It does not automatically mean the MDX note body needs to be rewritten.

## Pre-Publish Checklist

```powershell
npm run lint
npm run validate-content
npm run build
npm audit --omit=dev
```

Then push the branch you are working on. For `main` releases:

```powershell
git add -A
git commit -m "Add portfolio content"
git push origin main
```

Vercel will redeploy automatically.

For draft content branches, push the branch and review attachments before merging:

```powershell
git push origin my-content-branch
```
