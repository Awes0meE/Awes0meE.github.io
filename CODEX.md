# CODEX.md

Project operating guide for AI agents working on the XJTLU Portfolio.

## Project Snapshot

- Repository: `Awes0meE/Awes0meE.github.io`
- Current local path: `D:\Develop\Project_Final_Collation\XJTLU_Portfolio` on this machine. The path may differ on another computer.
- Public site: `https://www.66ccff-labs.com/`
- Vercel preview/base deployment: `https://awes0mee-portfolio.vercel.app/`
- Deployment target: Vercel. GitHub Pages for this username repository is only a redirect fallback: keep Pages source on `gh-pages:/`, never `main:/`. Keep root `.nojekyll` committed because the repository name can trigger GitHub Pages, and this Next.js site should not let Jekyll/Liquid parse uploaded Markdown or code evidence under `public/uploads/`.
- Stack: Next.js App Router, TypeScript, React, Tailwind CSS, local MDX-like content files, JSON media metadata.
- Package manager: npm.
- Main content folders:
  - `content/projects/*.mdx`
  - `content/notes/*.mdx`
  - `content/media.json`
  - `public/uploads/`

## Operating Principles

These rules incorporate the installed `karpathy-guidelines` skill:

- Think before coding. State assumptions when the task is ambiguous and ask only for decisions that cannot be derived from the repo.
- Prefer the minimum working change. Do not add speculative abstractions, hidden CMS complexity, or unnecessary framework changes.
- Make surgical edits. Every changed line should trace to the current request.
- Preserve unrelated user work. Never revert or rewrite unrelated changes.
- Define success criteria for non-trivial tasks and verify them with commands or browser checks.
- If a simpler approach is better than the requested approach, explain the tradeoff and proceed pragmatically.

## Knowledge Hygiene

These rules incorporate the installed `neat-freak` skill:

- Treat project knowledge as three layers with different audiences:
  - `CODEX.md` / `AGENTS.md`: instructions for AI agents inside this repo.
  - `MEMORY.md`: durable project memory and decision history.
  - `docs/` plus `README.md` and `USER_GUIDE.md`: human-facing documentation.
- At the end of meaningful milestones, reconcile docs against code. Do not only append new facts.
- Prefer updating existing memory entries over duplicating them.
- Use absolute dates such as `2026-05-06`; avoid vague relative-time wording in durable docs.
- Delete or rewrite stale guidance when it becomes wrong.

## Commands

Full setup details live in `docs/environment-toolchain.md`. Use the Node.js install on PATH if available. On this Windows machine, Node was installed under `C:\Program Files\nodejs`.

Baseline:

- Node.js 22 LTS or newer; this machine is verified with `v24.15.0`.
- npm 10 or newer; this machine is verified with `11.12.1`.
- `.nvmrc` pins the portable baseline to Node `22`.
- Use npm only; do not introduce pnpm, yarn, Bun, or extra lockfiles.

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
npm.cmd audit --omit=dev
```

On Windows PowerShell, prefer `npm.cmd` by default. `npm` can resolve to `npm.ps1`, and execution policy may block that shim even when Node.js is installed correctly.

Check the toolchain with:

```powershell
node --version
npm.cmd --version
where.exe node
where.exe npm.cmd
```

If the current PowerShell process cannot find npm at all, temporarily prefix PATH:

```powershell
$env:Path='C:\Program Files\nodejs;' + $env:Path
```

Local Next.js cache rule:

- Do not run `npm.cmd run build` while `npm.cmd run dev` is still running. Both commands write to `.next/`.
- If local dynamic routes fail with `Cannot find module './vendor-chunks/esprima.js'`, stop the project Node/Next.js processes, delete `.next/`, and restart `npm.cmd run dev`.
- This error comes from a corrupted local build cache around `gray-matter -> js-yaml -> esprima`; it does not automatically mean the MDX note content is broken.

## Encoding Policy

- Use UTF-8 for all source, content, documentation, and public-upload text files. Do not commit GBK, UTF-16, or mixed-encoding text artifacts.
- `.editorconfig` and `.vscode/settings.json` enforce UTF-8, LF line endings, and final newlines for this workspace.
- `.gitattributes` keeps common text formats normalized to LF in Git.
- `npm.cmd run validate-encoding` checks every Git-managed text-like file for valid UTF-8, null bytes, replacement characters, and common mojibake snippets. `npm.cmd run lint` runs this check after ESLint and content validation.
- Normalize legacy `.txt`, `.md`, `.csv`, source, XML, and HTML exports to UTF-8 before placing them under `content/` or `public/uploads/`. Do not add runtime GBK fallback readers to hide bad source files; fix the files at import time.
- On Windows PowerShell, command output can still display mojibake if the console code page is wrong. Verify file contents with Node.js or VS Code before rewriting text that may already be valid UTF-8.
- Hard rule for future batch edits: do not pipe inline Chinese here-strings from PowerShell into Node/Python/other interpreters. Use `apply_patch` for Chinese text, or create a temporary UTF-8 script/file first and run that. After generation, verify files with Node.js `fs.readFileSync(path, "utf8")` and scan for `\uFFFD` / repeated question-mark mojibake.

## Routes

- `/` homepage
- `/work` project list
- `/work/[slug]` project detail
- `/notes` note list
- `/notes/[slug]` note detail
- `/media` media gallery
- `/about` profile and contact

## Content Model

Projects require frontmatter matching `lib/content.ts`:

- `title`
- `titleZh`
- `summary`
- `summaryZh`
- `date`
- `status`
- `tags`
- `cover`
- `featured`
- `links`
- optional `assetPaths`

Notes require:

- `title`
- `titleZh`
- `summary`
- `summaryZh`
- `date`
- `tags`
- `visibility`: `public` or `private`
- optional `projectSlug`

Notes without `visibility: public` are treated as private. Private notes are not listed on the homepage, `/notes`, or project detail pages, and `/notes/[slug]` returns 404 for them through the public route helpers.

Media items live in `content/media.json` and require:

- `id`
- `title`
- optional `titleZh`
- `type`
- `src`
- `thumbnail`
- `date`
- `caption`
- optional `captionZh`
- optional `projectSlug`

`projectSlug` powers two reverse-link surfaces: project detail pages show related notes/media, and note detail pages show the related project card. Project `assetPaths` entries point to files or directories under `public/uploads/` so project pages can render a two-pane public file browser: the server component resolves reviewed files with path normalization, directory/file caps, strict UTF-8 reads, aggregate preview-size caps, and the Juanyun allowlist; the client component handles left-index selection plus right-side previews for images/videos, Markdown/text, source code, PDFs, and binary fallback cards. Uploaded Markdown previews resolve relative links/images against the source file path. HTML and SVG uploads are download-only artifacts, not inline previews. Project detail pages intentionally render in this order: project body, development notes, public project files, then related media.

## Language Switching

The site has a top-right language toggle for English and Simplified Chinese.

- `components/language-toggle.tsx` stores the selected language in `localStorage` under `portfolio-language`.
- `app/layout.tsx` uses an inline bootstrap script at the start of `<body>` to set `html[data-lang]` before the main UI renders.
- `components/bilingual-text.tsx` renders paired English/Chinese text and CSS in `app/globals.css` hides the inactive language.
- Projects and notes use existing `title/titleZh` and `summary/summaryZh` fields.
- Media items can use optional `titleZh` and `captionZh`; if missing, the English field is reused.
- `components/content-renderer.tsx` can split simple bilingual headings such as `English / 中文`, hide language-detected body blocks/headings/tables when both languages exist, render basic Markdown tables, and add heading anchors for internal links. Single-language notes stay readable instead of showing missing-language placeholder notices.
- MDX body content is not automatically machine-translated. Add real bilingual body sections manually when a project/note needs full two-language article text. As of `v0.7.0`, public project/note pages should not leave important Chinese-only body content without an English counterpart.
- Normal fenced code blocks are language-neutral in `ContentRenderer`. Use `en-*` / `zh-*` language prefixes, such as `en-text` or `zh-powershell`, only when a whole code/listing block belongs to one language view. `ContentRenderer` strips that prefix from the visible code label and hides the block with the same CSS language rules as prose.
- Standalone HTML comments in MDX bodies are ignored by `ContentRenderer`; use them only as internal markers, not as visible content.

## Current Content State

The current working content state extends release `v0.7.0` on `main`, including the media/cover refresh, the two-pane public project-file browser for project archives, and the imported Digital Clock course project.

As of `2026-07-04`, `main` has removed placeholder projects and consolidated real internship / hardware material from:

```text
D:\XJTLU\工作相关\卷云科技有限责任公司
D:\XJTLU\工作相关\南京图灵人工智能研究院
D:\XJTLU\工作相关\天津津铁通信有限公司
D:\XJTLU\工作相关\Claude Chime 硬件
```

Current content count in this workspace:

- 7 project pages total;
- 20 public notes total;
- 3 Juanyun project pages and 9 Juanyun notes remain;
- 1 Claude Chime hardware power-board archive was added;
- 1 Nanjing Turing Qt/CMake/packaging project and 5 related notes were added;
- 1 Tianjin rail-transit STM32 foundation project and 5 related notes were added.
- 1 Arduino Digital Clock course project and 1 related note were added from `C:\Users\123\Desktop\Digital Clock`; the original course PDF and source description TXT stay out of `public/uploads/`, while selected course screenshots without the top-right XJTLU logo, cropped homework-report excerpts, the original homework report PDF, Arduino sketches, demo video, and SN54LS47 datasheet are public.
- 61 media gallery items cover images/videos referenced by project and note pages, including the Notion-exported Nanjing Turing build-logic diagrams, processed Juanyun / Turing / Tianjin cover images, FOC schematic sheets, DIY STM32 board images, EEV driver-board images, and Digital Clock screenshots/demo/report media.
- The old portfolio rebuild project, PID Starter Kit placeholder project, ACUnit/BaseUnit/DHT standalone project pages, and actuator/fan standalone project page were removed or merged into larger project archive pages.
- The Nanjing Turing CMake/build-logic note renders the user's two Notion-exported Markdown originals directly, with a matching English reading section and page-internal anchor links.
- Public project/note bodies have an English coverage pass; future content should keep Chinese and English article sections equivalent rather than relying only on frontmatter translation.
- `ContentRenderer` renders consecutive standalone Markdown images as a clickable responsive gallery grid. Use plain consecutive image lines in MDX when several schematic sheets or board renders belong together. In-body evidence figures and project-file image previews are served through direct public URLs, so keep these assets compressed before adding them.

Juanyun public boundary:

- Sensitive: `Current_Product_ACUnit_Project` and `Current_Product_BaseUnit_Project`. Do not publish raw Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source, complete firmware source, internal product requirements, manufacturing packages, invoices, reimbursements, billing records, credentials, executable installers, vendor folders, or generated build outputs from those folders.
- Public after pruning: legacy Juanyun DIY cooling, FOC, solenoid valve, BLDC quiet fan, DHT breakout planning, and the self-authored `卷云硬件开发SOP_Awes0meE.pdf`.
- Static public assets for the expanded public Juanyun material live under `public/uploads/projects/juanyun-public/`; `main` may include selected legacy Gerber, EDA, BOM/PnP, STEP/3MF, source snippets, schematics, PDFs, and images from non-Current_Product folders after pruning installers, dependency folders, vendor folders, generated build outputs, financial/proof documents, and duplicate raw dumps.

## Visual Direction

Maintain the current engineering-academic identity:

- precise, calm, credible, portfolio-grade;
- bilingual Chinese/English content;
- white/paper background, fine grid, pine green, graphite, and copper accents;
- 6-8px radius, fine borders, restrained shadows;
- project evidence over decoration;
- no generic template blog styling, no Hexo identity, no stock marketing hero.

## Writing Direction

Portfolio notes should keep the user's current practical learning-log texture: concrete, casual, close to the debugging scene, and comfortable with small human details. Avoid AI handoff / delivery-report phrasing such as "only these two evidence types are public" or "the change was not intentionally expanded"; write closer to first-hand learning and debugging traces. When uploaded public `.txt`, `.md`, or self-authored document text is itself the artifact, make it a real note page with the original wording rendered as readable article content instead of hiding it under a project asset frame or compressing it into a short summary.

Use the repo-local `skills/engineering-note-writer/SKILL.md` when turning rough project bullet points, timelines, technical stacks, and evidence into portfolio prose. Before drafting or finalizing, read its `references/hard-gated-checklist.md`; the checklist gates fact sheet, structure, voice, banned wording, bilingual equivalence, public boundary, and MDX readiness. The skill drafts Chinese first, then creates an English counterpart that matches the Chinese substance without turning the note into a resume, paper abstract, corporate report, or AI handoff.

For `content/notes/*.mdx`:

- describe the system, constraint, question, file, and next step directly;
- use natural sections such as `起点`, `怎么卡住`, `怎么改`, `文件`, `还要补的记录`, and `现在回头看` when they fit;
- keep mild self-reflection only when it clarifies the work;
- explain why a direction changed, not only what was done;
- avoid repetitive `我负责 / 我参与 / 我整理` bullet-heavy writing unless the note genuinely needs a checklist;
- keep evidence links, files, and technical constraints concrete;
- use bilingual headings or paired English/Chinese paragraphs on public pages when a section would otherwise be Chinese-only.

## Verification Policy

For content-only edits:

```powershell
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
```

For project imports or project-media updates driven by a local source folder, use `AddProject.skill` / `skills/add-project/SKILL.md` and keep `skills/add-project/references/hard-gated-checklist.md` as the live phase gate. Do not copy source files, write public prose, verify, commit, push, merge, tag, or release until the corresponding gate passes or is reported as blocked.

Use the plain `npm run ...` form only in shells where `npm` is known to resolve correctly.

For visual/layout edits:

- run local dev server;
- inspect `http://127.0.0.1:3000`;
- check desktop and mobile widths;
- verify no horizontal overflow;
- verify links and dynamic content routes.

For dependency changes:

```powershell
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
npm.cmd audit --omit=dev
```

## Documentation Update Triggers

Update project docs when any of these change:

- route structure;
- content schema;
- deployment/domain details;
- commands or dependencies;
- site identity or visual direction;
- long-term portfolio content plan;
- any decision that future agents should not rediscover.

Use `docs/memory-system.md` for the memory update protocol.
