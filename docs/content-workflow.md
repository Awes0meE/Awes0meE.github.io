# Content Workflow

This document explains how to add real portfolio content without changing the application architecture.

## Content Priority

1. Review the current eight-project archive and every route changed by the release candidate or active maintenance branch in both languages and at desktop/mobile widths.
2. Keep the Juanyun sensitive boundary explicit: `Current_Product_ACUnit_Project` and `Current_Product_BaseUnit_Project` remain sensitive; only individually reviewed and explicitly approved desensitized derivatives may be published. Other legacy Juanyun material can use selected reviewed public evidence.
3. Prefer real project photos, screenshots, videos, diagrams, logs, and selected files over placeholders or generated evidence imagery.
4. Expand project archive pages with direct evidence, inline source/text previews, and internal links while preserving claim and privacy boundaries.
5. Keep Work, Notes, Media, About, education, technical-stack, and contact details aligned with the current public identity and the route scope in `DESIGN.md`.
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
date: "2026.05"
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

Use `assetPaths` when a project should show uploaded public evidence. Entries can be individual files or directories under `public/uploads/`. Project pages show these files in a two-pane browser: the left side is a project-file index, and the right side previews the currently selected file. Images and videos preview inline, Markdown / text documents render as readable article content with relative image/link paths resolved from the source file, small UTF-8 source/code files render in code frames, PDFs embed from page one where the browser supports it, and spreadsheets, EDA/CAD files, fabrication archives, and other binary files keep a direct open action. HTML and SVG uploads are treated as download-only artifacts rather than inline previews. Prefer explicit file lists over broad directories when a folder contains Notion stubs, unfinished exports, or other files that should not appear as project evidence; the resolver also has directory-depth, file-count, and aggregate text-preview caps as a safety backstop.

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

`projectSlug` is optional in the note schema. Add it when a note should appear automatically on a project detail page. The current `/notes` Routed Signal Map has only real-project channels, so a public note also needs a valid matching `projectSlug` to enter that index.

The value must match a file slug in `content/projects/`. Example: `projectSlug: "juanyun-thermal-hardware"` connects the note to `/work/juanyun-thermal-hardware`.

On project detail pages, related development notes appear above the public project-file archive. Use notes for narrative, debugging, and reflection; use `assetPaths` for the downloadable or inline-rendered evidence below that note trail.

`visibility` controls whether the note is served publicly:

- `visibility: public` makes the detail route available and lets the note participate in public homepage selection. It appears on `/notes` and in a project detail related-note section only when `projectSlug` resolves to a real project.
- `visibility: private` hides the note from those public surfaces and makes the public detail route return 404.
- missing `visibility` is treated as private. Use this for drafts.

This is website-level hiding only. If the GitHub repository is public, private note source can still be visible in the repository. Truly confidential notes should stay outside the public repo or move to a future authenticated storage layer.

The `/notes` Chinese display face is a local subset. When a new note title introduces missing Chinese glyphs, update `app/fonts/ZCOOLQingKeHuangYou-NotesSubset.txt`, regenerate `app/fonts/ZCOOLQingKeHuangYou-NotesSubset.woff2` with the documented command in `app/fonts/README.md`, and keep the bundled SIL OFL record intact.

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
public/uploads/hero/
```

Approved site-identity assets are kept separately under `public/brand/`. Preserve the exact `iRidium` capitalization in both language modes, keep the mark's upper-left and lower-right square bounds equal, and retain the user-selected B-style transparent wordmark at its approved compact 26px header height. Treat logo/brand changes as user-controlled visual-identity decisions; do not mix project evidence into that folder.

`public/uploads/hero/` contains the five prototype images consumed by the homepage atom visual in `components/technical-visual.tsx`. Keep all five in the rotating nucleus. The three equal-sized orbits remain separated by 60 degrees and each carries five evenly spaced technology marks, grouped as embedded systems, firmware development, and engineering tools. Do not treat the nucleus images or orbit marks as project evidence, proof of fabrication or validation, an affiliation or endorsement claim, or a proficiency scale; project pages and technical claims must continue to use original photographs or direct engineering artifacts.

Keep technology-mark source and trademark notes current in `public/skills/icons/README.md`, and keep institution-mark provenance current in `public/education/README.md`. Do not add a mark to the visual without recording its source and confirming that its public use remains appropriate.

The homepage animation must retain its non-visual fallbacks: pause the orbit, dash, tail, nucleus, and background motion while the visual is offscreen or the document is hidden, and preserve the static composition selected by `prefers-reduced-motion`. Surface-specific rules for Work, Notes, Media, and About live in `DESIGN.md`; never infer one route's composition or evidence meaning from another route's visual language.

Reference files with public paths:

```text
/uploads/projects/my-project/cover.jpg
```

For technical archives, normalize filenames to stable ASCII names before publishing. Do not publish private or noisy folders directly. Exclude invoices, reimbursements, billing records, internship proof, executable installers, vendor package folders, and generated build outputs.

Normalize text-like uploads to UTF-8 before publishing. This includes `.txt`, `.md`, `.csv`, source files, XML, HTML, EasyEDA text exports, and any Notion/EDA/manufacturing text output. Do not leave GBK or UTF-16 files under `public/uploads/`; `npm.cmd run validate-encoding` is part of lint and should fail if a committed text artifact is not clean UTF-8.

In project and note bodies, one standalone Markdown image renders as a clickable figure. Several standalone image lines in the same paragraph block render as a responsive gallery grid, which is the preferred pattern for related board renders, schematic sheets, and before/after image sets. These evidence figures and project-file image previews use direct public URLs for reliability, so crop and compress large source images before adding them.

For company work, be stricter: do not put Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source files, full firmware source dumps, or internal requirement/manufacturing packages under `public/uploads/` unless they are explicitly reviewed and desensitized. For Juanyun, the user explicitly approved non-Current_Product legacy folders for selected public evidence; `Current_Product_ACUnit_Project*` and `Current_Product_BaseUnit_Project*` remain sensitive. Files under `public/uploads/` are public static assets even when no page links to them. `public/uploads/projects/juanyun-tech` is intentionally allowlisted by `scripts/validate-content.mjs`; if WPS or a local copy restores ignored raw files there, move them outside the repo before building.

## Add Project-Linked Media Records

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

Every project/note image or video that should be discoverable from the media page needs a matching `content/media.json` entry. Set `projectSlug` for every project-owned record; `/media` uses it to build the source chooser and the server-rendered project chapters, and repeats the source project on each record. The unassigned group is a defensive fallback, not a substitute for confirming provenance.

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

For substantial new project prose, rewrites, or humanization, use the repository-local `engineering-note-writer`, its `references/cognition-led-composition.md` guidance, and `references/reader-prose-hard-gates.md`. The canonical sequence is: inspect artifacts; reuse a user-confirmed `grill-me` brief or obtain one; after confirmation, research beyond uploaded material with current reliable web sources; draft Chinese through the user's cognition trail; adapt English with the same substance and calmer intensity; then pass the Truth gate, Li Zhiyi gate, and the scoped zero-hit reader-prose L1 gate.

Evidence bounds project facts, authorship, actions, results, measurements, uncertainty, and publication claims, but it cannot choose the reader-facing structure. External knowledge may add light nearby links and first-person present-learning insight; never turn it into invented project history, action, result, or measurement.

Every serious project should eventually include:

- problem / background;
- what was built;
- technical stack;
- key decisions;
- evidence: screenshots, videos, diagrams, metrics, logs;
- links to source, demo, release, or paper if available;
- English and Chinese summaries.

Notes should keep the user's practical learning-log texture. Public pages should stay technically rigorous while letting real confusion, amusement, failed assumptions, and small discoveries appear beside the evidence:

- begin from the actual course material, file, symptom, command, or engineering question rather than a meta-document introduction;
- let the user's changing understanding decide the order instead of forcing a standard build-log sequence; attention may jump across subsystems or chronology and synthesize later when genuine, with no mandatory cognition template;
- derive headings after drafting, make each one describe the following technical subject, and follow the limit defined in `engineering-note-writer`;
- avoid reusable framework headings that name the writing process rather than the technical subject;
- keep links to files, images, videos, source snippets, PDFs, and datasets concrete;
- use natural spoken transitions where they fit; thought-bookmark headings, real parallel bullet lists, and ordinary sequence words retain their existing rules;
- state scoped normal narration directly and do not use Chinese corner quotes there; write exact technical tokens as inline code. Avoid a bare `不是 A，而是 B` / `not A but B` correction. Keep ordinary factual negation, and use only the exact user-confirmed `不是说 A 不行，而是说 B` form when it genuinely prevents a false reading;
- use first person and emotion only when the user or evidence supports them; when a real event and emotional direction are both confirmed, reconstruct the scene naturally without adding surrounding facts;
- let humor come from real tool, file, hardware, code, or mistaken-assumption friction rather than an invented scene;
- avoid AI handoff phrasing, repetitive resume lists, and repeated contrast/sequence scaffolds;
- name known tools and models exactly, and never guess an unknown product name;
- require model-authored project and note body to pass the L1 wording, punctuation, and canned-structure scans with zero applicable hits in both languages; exclude frontmatter, Markdown syntax, links, code, paths, logs, verbatim artifacts, and exact technical strings;
- require first-person learning-note prose to pass the Truth gate and Li Zhiyi gate; keep specifically requested neutral audits, summaries, and captions neutral, applying the gates only to claims and voice within that scope;
- adapt English with the same facts and narrative nodes at slightly lower emotional intensity;
- if an uploaded public `.txt`, `.md`, or self-authored document is the real artifact, publish it as a proper note page with the original wording rendered as article text; project `assetPaths` can still link the file, but should not be the only readable copy.

Keep the tone honest, specific, and slightly informal when appropriate. Do not remove technical evidence or constraints just to make the writing more casual.

On Windows PowerShell, avoid Chinese batch-generation through inline here-string pipes. Use `apply_patch` for Chinese edits, or create a temporary UTF-8 script/file and run it. After generating Chinese content, verify the saved file with Node.js `fs.readFileSync(path, "utf8")` and check for `\uFFFD` or repeated question-mark mojibake before committing.

## Local Development Troubleshooting

For complete machine setup, Node/npm versions, PowerShell rules, and local preview commands, use `docs/environment-toolchain.md`.

For local preview:

```powershell
npm.cmd run dev -- -H 127.0.0.1 -p 3000
```

Open:

```text
http://127.0.0.1:3000
```

Avoid running `npm.cmd run build` while the dev server is still running. Both commands write to `.next/`, and concurrent writes can corrupt local cache files.

If a local dynamic route fails with:

```text
Cannot find module './vendor-chunks/esprima.js'
```

Use this recovery path:

1. Stop all project Node/Next.js processes.
2. Delete `.next/`.
3. Run `npm.cmd run dev` again.
4. Revisit the affected note route.

That error usually means the local `.next` cache is corrupt around `gray-matter -> js-yaml -> esprima`. It does not automatically mean the MDX note body needs to be rewritten.

## Pre-Publish Checklist

```powershell
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
npm.cmd audit --omit=dev
```

Commit on a topic branch, push that branch, and open a pull request. Do not push
release commits directly to `main`:

```powershell
git add -- <reviewed-paths>
git commit -m "docs(content): add portfolio project"
git push -u origin <topic-branch>
```

Review the pull-request diff and Vercel preview, then merge only after the
required checks pass. Synchronize and prune the local checkout afterward:

```powershell
git switch main
git fetch --prune origin
git pull --ff-only origin main
```

Vercel deploys pushed topic branches as previews and merged `main` commits to
production automatically.

For prose or content-only rewrites, keep the project's `cover`, visual assets,
and established presentation role unchanged. Covers are user-controlled visual
identity choices; replace one only when the user explicitly requests or approves
that visual change.
