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
projectSlug: "my-project-slug"
---
```

`projectSlug` is optional. Add it when a note should appear automatically on a project detail page.

The value must match a file slug in `content/projects/`. Example: `projectSlug: "juanyun-acunit-control-platform"` connects the note to `/work/juanyun-acunit-control-platform`.

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
  "type": "image",
  "src": "/uploads/projects/pid-starter-kit/step-response.png",
  "thumbnail": "/uploads/projects/pid-starter-kit/step-response.png",
  "date": "2026-05-06",
  "projectSlug": "pid-starter-kit",
  "caption": "Step response captured during controller tuning."
}
```

## Writing Standard

Every serious project should eventually include:

- problem / background;
- what was built;
- your responsibility;
- technical stack;
- key decisions;
- evidence: screenshots, videos, diagrams, metrics, logs;
- links to source, demo, release, or paper if available;
- English and Chinese summaries.

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
