# Content Workflow

This document explains how to add real portfolio content without changing the application architecture.

## Content Priority

1. Review `content/juanyun-tech` attachments before merging to `main`.
2. Replace remaining placeholder visuals with real project photos, screenshots, videos, or diagrams.
3. `PID Starter Kit`
4. `SAT301 Graduation Thesis`
5. `About`
6. Media gallery polish and smaller notes.

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
---
```

Set `featured: true` only for projects that should appear on the homepage.

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

The value must match a file slug in `content/projects/`. Example: `projectSlug: "juanyun-acunit-control-platform"` connects the note to `/work/juanyun-acunit-control-platform`.

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
public/uploads/projects/pid-starter-kit/
public/uploads/projects/sat301-graduation-thesis/
public/uploads/media/
public/uploads/profile/
```

Reference files with public paths:

```text
/uploads/projects/pid-starter-kit/cover.jpg
```

For technical archives, normalize filenames to stable ASCII names before publishing. Do not publish private or noisy folders directly. Exclude invoices, reimbursements, billing records, internship proof, executable installers, vendor package folders, and generated build outputs.

For company work, be stricter: do not put Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source files, full firmware source dumps, or internal requirement/manufacturing packages under `public/uploads/` unless they are explicitly reviewed and desensitized. Files under `public/uploads/` are public static assets even when no page links to them.

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
  "src": "/uploads/projects/pid-starter-kit/step-response.png",
  "thumbnail": "/uploads/projects/pid-starter-kit/step-response.png",
  "date": "2026-05-06",
  "projectSlug": "pid-starter-kit",
  "caption": "Step response captured during controller tuning.",
  "captionZh": "控制器调参过程中记录的阶跃响应。"
}
```

Use `titleZh` and `captionZh` when a media card should switch cleanly between English and Simplified Chinese.

## Language Switching

The website has a top-right `EN / 简中` language switch.

- Use `BilingualText` for fixed labels in TSX files.
- Keep `title/titleZh` and `summary/summaryZh` complete for projects and notes.
- Use `titleZh/captionZh` in `content/media.json` for media cards.
- Long MDX body content is not automatically translated. Add bilingual body sections manually when an article needs both languages.

## Writing Standard

Every serious project should eventually include:

- problem / background;
- what was built;
- technical stack;
- key decisions;
- evidence: screenshots, videos, diagrams, metrics, logs;
- links to source, demo, release, or paper if available;
- English and Chinese summaries.

Notes should keep the user's practical learning-log texture. Public pages should read more like direct engineering notes than self-promotional reports:

- start from `前期想法` when the motivation or confusion matters;
- use `改变` to explain a pivot in direction;
- use `疑问` to capture practical questions and the answer reached at the time;
- use `阶段目标` for concrete next steps or constraints;
- keep `证据` links for files, images, videos, source, PDFs, and datasets;
- end with `复盘` when there is a useful lesson;
- avoid overusing `我负责了...` and `我参与了...` lists, because they sound fake when the note is meant to be a learning record;
- use direct description: system scope, constraints, evidence boundary, question, and next step;
- add English headings or paired English paragraphs on public content when a section would otherwise be Chinese-only.

Keep the tone honest, specific, and slightly informal when appropriate. Do not remove technical evidence or constraints just to make the writing more casual.

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

For draft content branches such as `content/juanyun-tech`, push that branch and review attachments before merging:

```powershell
git push origin content/juanyun-tech
```
