# CODEX.md

Project operating guide for AI agents working on the XJTLU Portfolio.

## Project Snapshot

- Repository: `Awes0meE/Awes0meE.github.io`
- Local path: `F:\XJTLU\XJTLU_Portfolio`
- Public site: `https://www.66ccff-labs.com/`
- Vercel preview/base deployment: `https://awes0mee-portfolio.vercel.app/`
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

Use the Node.js install on PATH if available. On this Windows machine, Node was installed under `C:\Program Files\nodejs`.

```powershell
npm install
npm run dev
npm run lint
npm run build
npm audit --omit=dev
```

On this Windows machine, use `npm.cmd` if PowerShell blocks `npm.ps1` through execution policy:

```powershell
npm.cmd run lint
npm.cmd run build
```

If the current PowerShell process cannot find npm at all, temporarily prefix PATH:

```powershell
$env:Path='C:\Program Files\nodejs;' + $env:Path
```

Local Next.js cache rule:

- Do not run `npm run build` while `npm run dev` is still running. Both commands write to `.next/`.
- If local dynamic routes fail with `Cannot find module './vendor-chunks/esprima.js'`, stop the project Node/Next.js processes, delete `.next/`, and restart `npm run dev`.
- This error comes from a corrupted local build cache around `gray-matter -> js-yaml -> esprima`; it does not automatically mean the MDX note content is broken.

## Encoding Policy

- Use UTF-8 for all source, content, and documentation files.
- `.editorconfig` and `.vscode/settings.json` enforce UTF-8, LF line endings, and final newlines for this workspace.
- `.gitattributes` keeps common text formats normalized to LF in Git.
- On Windows PowerShell, command output can still display mojibake if the console code page is wrong. Verify file contents with Node.js or VS Code before rewriting text that may already be valid UTF-8.

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

`projectSlug` powers two reverse-link surfaces: project detail pages show related notes/media, and note detail pages show the related project card.

## Language Switching

The site has a top-right language toggle for English and Simplified Chinese.

- `components/language-toggle.tsx` stores the selected language in `localStorage` under `portfolio-language`.
- `app/layout.tsx` uses an inline bootstrap script at the start of `<body>` to set `html[data-lang]` before the main UI renders.
- `components/bilingual-text.tsx` renders paired English/Chinese text and CSS in `app/globals.css` hides the inactive language.
- Projects and notes use existing `title/titleZh` and `summary/summaryZh` fields.
- Media items can use optional `titleZh` and `captionZh`; if missing, the English field is reused.
- MDX body content is not automatically translated. Add bilingual body sections manually when a project/note needs full two-language article text.

## Current Content Branch

`content/juanyun-tech` is a draft content branch for materials from:

```text
F:\XJTLU\工作相关\卷云科技有限责任公司
```

As of `2026-05-06`, the Juanyun content set contains 7 Juanyun project pages and 9 Juanyun notes after removing pure datasheet/manual/manufacturing-export notes from the public note set.

On branch `feature/note-visibility`, Juanyun notes are visible, but the public Juanyun asset folder only contains approved screenshots/renders and one prototype demo video. Do not re-publish Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source files, company firmware source dumps, desktop source dumps, internal manufacturing packages, invoices, reimbursements, billing records, internship proof, executable installers, vendor package folders, or generated build outputs without explicit desensitization review.

## Visual Direction

Maintain the current engineering-academic identity:

- precise, calm, credible, portfolio-grade;
- bilingual Chinese/English content;
- white/paper background, fine grid, pine green, graphite, and copper accents;
- 6-8px radius, fine borders, restrained shadows;
- project evidence over decoration;
- no generic template blog styling, no Hexo identity, no stock marketing hero.

## Writing Direction

Portfolio notes should keep the user's practical learning-log texture, but public-facing writing should use direct descriptive narration rather than repetitive first-person claims.

For `content/notes/*.mdx`:

- describe the system, constraint, question, evidence, and next step directly;
- use sections such as `前期想法`, `改变`, `疑问`, `阶段目标`, `证据`, and `复盘` when they fit;
- keep mild self-reflection only when it clarifies the work;
- explain why a direction changed, not only what was done;
- avoid repetitive `我负责 / 我参与 / 我整理` bullet-heavy writing unless the note genuinely needs a checklist;
- keep evidence links, files, and technical constraints concrete;
- use bilingual headings or paired English/Chinese paragraphs on public pages when a section would otherwise be Chinese-only.

## Verification Policy

For content-only edits:

```powershell
npm run lint
npm run build
```

Use the `npm.cmd` form on Windows PowerShell if script execution policy blocks `npm`.

For visual/layout edits:

- run local dev server;
- inspect `http://127.0.0.1:3000`;
- check desktop and mobile widths;
- verify no horizontal overflow;
- verify links and dynamic content routes.

For dependency changes:

```powershell
npm run lint
npm run build
npm audit --omit=dev
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
