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

If the current PowerShell process cannot find `npm`, temporarily prefix PATH:

```powershell
$env:Path='C:\Program Files\nodejs;' + $env:Path
```

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

Media items live in `content/media.json` and require:

- `id`
- `title`
- `type`
- `src`
- `thumbnail`
- `date`
- `caption`
- optional `projectSlug`

## Visual Direction

Maintain the current engineering-academic identity:

- precise, calm, credible, portfolio-grade;
- bilingual Chinese/English content;
- white/paper background, fine grid, pine green, graphite, and copper accents;
- 6-8px radius, fine borders, restrained shadows;
- project evidence over decoration;
- no generic template blog styling, no Hexo identity, no stock marketing hero.

## Verification Policy

For content-only edits:

```powershell
npm run lint
npm run build
```

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
