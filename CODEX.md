# CODEX.md

Project operating guide for AI agents working on the XJTLU Portfolio.

## Project Snapshot

- Repository: `Awes0meE/Awes0meE.github.io`
- Public identity: `Alvin Li`; engineering archive brand: `iRidium / 铱`.
- Brand spelling is immutable: lowercase `i`, uppercase `R`, then lowercase `idium`.
- Current local path varies by device. Treat the repository root as the working directory and do not hard-code a Windows or macOS checkout path.
- Public site: `https://www.66ccff-labs.com/`
- Vercel preview/base deployment: `https://awes0mee-portfolio.vercel.app/`
- Deployment target: Vercel. GitHub Pages for this username repository is only a redirect fallback: keep Pages source on `gh-pages:/`, never `main:/`. Keep root `.nojekyll` committed because the repository name can trigger GitHub Pages, and this Next.js site should not let Jekyll/Liquid parse uploaded Markdown or code evidence under `public/uploads/`.
- Stack: Next.js 16.3 App Router, TypeScript, React 19.2, Tailwind CSS, local MDX-like content files, JSON media metadata.
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
- Treat project covers and other visual-identity choices as user-controlled. A prose or content rewrite must preserve `cover`, visual assets, and their presentation role unless the user explicitly authorizes that visual change.
- Define success criteria for non-trivial tasks and verify them with commands or browser checks.
- If a simpler approach is better than the requested approach, explain the tradeoff and proceed pragmatically.

## Git Workflow

- Use Conventional Commits for every commit: `<type>(optional-scope): <short summary>`.
- Name topic branches `<semantic-prefix>/<kebab-case-purpose>`, using the Conventional Commits type that best matches the work, such as `feat/note-visibility`, `docs/update-handoff`, `refactor/content-renderer`, or `build/upgrade-next`.
- Treat Codex-authored changes exactly like ordinary human-authored development. Never use identity-based branch prefixes such as `agent/`, `codex/`, `ai/`, or `bot/`.
- Keep the existing worktree placement convention or use the platform's native worktree mechanism. When choosing a worktree directory manually, the kebab-case purpose may be used without the semantic prefix.
- Keep commits scoped to one completed feature, fix, documentation update, test addition, or coherent checkpoint. Do not hide features, fixes, tests, or docs inside `chore`.

## Knowledge Hygiene

These rules incorporate the installed `neat-freak` skill:

- Treat project knowledge as distinct layers with different audiences:
  - `CODEX.md` / `AGENTS.md`: instructions for AI agents inside this repo.
  - `PRODUCT.md`: durable product purpose, audience, scope, evidence, and constraints.
  - `DESIGN.md`: durable visual-system and interaction decisions for the active design direction.
  - `MEMORY.md`: durable project memory and decision history.
  - `docs/` plus `README.md` and `USER_GUIDE.md`: human-facing documentation.
- At the end of meaningful milestones, reconcile docs against code. Do not only append new facts.
- Prefer updating existing memory entries over duplicating them.
- Use absolute dates such as `2026-05-06`; avoid vague relative-time wording in durable docs.
- Delete or rewrite stale guidance when it becomes wrong.

## Commands

Full setup details live in `docs/environment-toolchain.md`. Use the Node.js and npm installations on PATH; machine-specific snapshots belong in `docs/session-log.md`, not in this portable guide.

Baseline:

- Node.js 22 LTS or newer.
- npm 10 or newer.
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
- `/notes` Routed Signal Map note index
- `/notes/[slug]` note detail
- `/media` project-grouped media evidence archive
- `/about` CV-grounded Tension Signal Column identity, method, and contact route

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
- optional `projectSlug` at schema level; the current `/notes` Routed Signal Map requires it to resolve to a real project before the note can enter an index channel

Notes without `visibility: public` are treated as private. Private notes are not listed on the homepage, `/notes`, or project detail pages, and `/notes/[slug]` returns 404 for them through the public route helpers.

An unlinked public note can still have a public `/notes/[slug]` route and remain eligible for homepage selection, but it is omitted from the current `/notes` project-channel index and from project-detail related-note lists. Do not invent an “unassigned” Notes channel to hide a missing or invalid join.

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

`projectSlug` powers project grouping on `/media` and the reverse-link surfaces on project and note detail pages. Every project-owned media record should carry it; the unassigned media group is a defensive fallback, not the intended archive structure. Project `assetPaths` entries point to files or directories under `public/uploads/` so project pages can render a two-pane public file browser: the server component resolves reviewed files with path normalization, directory/file caps, strict UTF-8 reads, aggregate preview-size caps, and the Juanyun allowlist; the client component handles left-index selection plus right-side previews for images/videos, Markdown/text, source code, PDFs, and binary fallback cards. Uploaded Markdown previews resolve relative links/images against the source file path. HTML and SVG uploads are download-only artifacts, not inline previews. Project detail pages intentionally render in this order: project body, development notes, public project files, then related media.

## Language Switching

The site has a top-right language toggle for English and Simplified Chinese.

- `components/language-toggle.tsx` stores the selected language in `localStorage` under `portfolio-language`.
- `app/layout.tsx` uses an inline bootstrap script at the start of `<body>` to set `html[data-lang]` before the main UI renders.
- A visitor without a valid saved preference starts in English. A valid saved English or Simplified Chinese choice remains authoritative on later visits.
- `components/bilingual-text.tsx` renders paired English/Chinese text and CSS in `app/globals.css` hides the inactive language.
- Projects and notes use existing `title/titleZh` and `summary/summaryZh` fields.
- Media items can use optional `titleZh` and `captionZh`; if missing, the English field is reused.
- `components/content-renderer.tsx` can split simple bilingual headings such as `English / 中文`, hide language-detected body blocks/headings/tables when both languages exist, render basic Markdown tables, and add heading anchors for internal links. Single-language notes stay readable instead of showing missing-language placeholder notices.
- MDX body content is not automatically machine-translated. Add real bilingual body sections manually when a project/note needs full two-language article text. As of `v0.7.0`, public project/note pages should not leave important Chinese-only body content without an English counterpart.
- Normal fenced code blocks are language-neutral in `ContentRenderer`. Use `en-*` / `zh-*` language prefixes, such as `en-text` or `zh-powershell`, only when a whole code/listing block belongs to one language view. `ContentRenderer` strips that prefix from the visible code label and hides the block with the same CSS language rules as prose.
- Standalone HTML comments in MDX bodies are ignored by `ContentRenderer`; use them only as internal markers, not as visible content.

## Current Content State

The 2026-09-07 source revision contains 8 project pages, 27 note sources and 84
media records. Fifteen notes are public across five project channels; twelve
remain private pending their project-specific rewrites. The six newly approved
bilingual notes cover Smart Car, the two-digit counter and DIY Cooling, two per
project. Three old note paths now contain the replacement studies, and three
additional note paths complete the set. Superseded old-note backups and completed
review copies have been removed at the user's request; Git retains their history.

Canonical prose lives in `content/projects/` and `content/notes/`. The writer is
`skills/engineering-note-writer/SKILL.md`. Release scope and verification are in
`docs/releases/engineering-notes-2026-09-07/README.md`; the active cross-device
relay is `docs/active-work/portfolio-copy-rewrite.md`. The latest named tag
remains `v0.9.0`; later maintenance uses PRs without inventing a new release tag.

Family source counts are Smart Car 2, counter 2, DIY Cooling 2, Juanyun thermal
9, Tianjin 5, Nanjing Turing 5, FOC 1 and Claude Chime 1. The source-document
notes and reviewed project assets keep their existing publication rules. The
Smart Car homepage identifies seven IR tracking inputs, matching the manual and
seven decoded sensor fields. The DIY schematic PNG is a faithful derivative of
the existing public PDF, not new hardware evidence.

The homepage, `/work`, `/notes`, `/media` and `/about` use the approved Ember
Black surfaces; project and note details retain the paper reading system.
Design contracts live in `DESIGN.md`, product/asset constraints in `PRODUCT.md`
and `docs/content-workflow.md`, and dated release history in `MEMORY.md` and
`docs/session-log.md`.

Publication constraints remain unchanged: Juanyun current-product raw design,
manufacturing and complete firmware packages stay private; selected legacy
material and individually approved derivatives follow
`docs/juanyun-tech-source-inventory.md`. FOC is Alvin's independent learning
route, with curated artifacts under `public/uploads/projects/sensorless-foc-learning-route/`
and the complete firmware kept in its external repository. Do not add vendor
libraries, IDE caches, build output or raw diagnostic dumps to public assets.
The original Arduino course tutorial PDFs and project-description TXT files
remain reference-only; use the already reviewed excerpts, reports and kit manual.

## Visual Direction

Maintain the current engineering-academic identity:

- precise, calm, credible, portfolio-grade;
- Alvin Li is the sole reader-facing personal identity; `iRidium / 铱` is the engineering archive brand;
- keep the approved five-rectangle mark from `public/brand/iridium-mark.png` in the header, preserve equal square bounds for its upper-left and lower-right blocks, pair it with the user-selected B-style `public/brand/iridium-wordmark-script.png`, render that wordmark at the user-approved compact 26px height, and preserve the exact `iRidium` capitalization in both language modes;
- keep the shared navigation's exact-route `aria-current="page"` and nested-route `aria-current="location"` semantics. On `.signal-theme` desktop headers, retain the `01`–`04` prefixes, English Barlow Condensed display face, Ember line spanning number and label, visible focus/current state, and short press response; omit indices on mobile and remove movement under reduced motion;
- preserve the `v0.8.0` five-card mosaic as a historical release fact: it placed the OLED and TFT-display assemblies above the battery/USB power board, multi-rail power-supply board, and AD831 mixer;
- in release `v0.9.0`, keep those five presentation derivatives as a compact prototype nucleus in `components/technical-visual.tsx`; surround it with three same-size orbital ellipses whose long axes begin at `0deg`, `60deg`, and `120deg`, with five evenly spaced technology marks on each orbit for embedded systems, firmware development, and engineering tools;
- keep the atom motion slow and legible, pause it when the hero is not visible, and provide a stable `prefers-reduced-motion` state with the five marks on every orbit still evenly distributed;
- on `/work`, keep the sticky `01`–`08` rail, eight complete semantic project links, and exactly seven black signal intervals whose short orange ticks move right to left at about `12px/s`; pause an interval when it is offscreen or the document is hidden, make it static under `prefers-reduced-motion`, and use only reviewed project imagery from `public/uploads/projects/`;
- on `/notes`, derive channel stems and semantic note rows from currently public notes, feeding one continuous Ember reading path with native search plus project and year controls (currently 5 channels and 15 rows). Search only lightweight bilingual metadata, treat dates as archive metadata rather than a strict engineering timeline, keep `/notes/[slug]` on the paper system, and preserve a fully visible static equivalent under `prefers-reduced-motion`;
- on `/media`, keep the project-first Focus Aperture with eight source choices, one authentic lead record, and all 84 repository records grouped server-side by project. Preserve uncropped evidence, query-linked source context from homepage thumbnails, native controls, and a complete static state under `prefers-reduced-motion`;
- on `/about`, keep the CV-grounded identity-and-method narrative distinct from the homepage capability list; preserve the complete original `public/uploads/projects/avatar.jpg` white field and black line art without crop, inversion, recoloring, filtering, blending, fading, tracing, or generated replacement. Treat the four stages as a route rather than a score, allow exactly one non-status pulse only while visible, and preserve the full static structure under `prefers-reduced-motion`;
- treat both the five hero derivatives and the sourced technology marks as presentation and identification only. They do not prove component identity, tool proficiency, project ownership, fabrication, bring-up, measurement, validation, endorsement, or affiliation;
- bilingual Chinese/English content;
- the `.signal-theme` shell uses a near-black engineering field, warm white information, fine rules, and ember-orange signal accents only on explicitly opted-in routes; do not infer that every route shares the same surface composition;
- project evidence over decoration;
- no generic template blog styling, no Hexo identity, no stock marketing hero.

## Writing Direction

Project homepages tell the user's actions and project progression; learning
notes investigate bounded questions arising from that work. Follow the writer's
`references/project-note-division.md`: inspect the homepage and linked notes at
Step 1, settle open note topics at Step 2, allocate detailed accounts at Step 5,
and check cross-page division in both languages at Step 12. Reuse chosen topics
or select them when delegated. Keep necessary context and accurate claims,
preserve source documents, and do not reopen protected pages merely to remove
overlap. Present research does not establish historical curiosity or actions.

Portfolio notes should keep the user's practical learning-log texture: technically rigorous, close to the debugging scene, and comfortable carrying real frustration, amusement, uncertainty, and small human details beside the evidence. When uploaded public `.txt`, `.md`, or self-authored document text is itself the artifact, make it a real note page with the original wording rendered as readable article content instead of hiding it under a project asset frame or compressing it into a short summary.

Use the repo-local `skills/engineering-note-writer/SKILL.md` when turning rough project bullet points, timelines, technical stacks, and evidence into portfolio prose. The canonical sequence is: inspect artifacts; reuse a user-confirmed `grill-me` brief or obtain one; after confirmation, research beyond uploaded material with current reliable web sources; compose Chinese through the user's cognition trail; run one voice-preserving editorial pass; pass the independent Chinese sentence gate at the entrance to Step 10; derive English from the Chinese with the same substance and confirmed emotional intensity; run the L1-5 syntax/collocation and pair-divergence check; then pass the Truth, Li Zhiyi, and scoped reader-prose gates, with a full Chinese sentence recheck at Step 12. The six sentence-error categories apply only to Chinese; English retains its existing adaptation and review rules. On a rewrite, select useful supported content without treating the old draft as a mandatory information inventory. Let `SKILL.md` own the staged reference order: evidence, cognition, and voice guide composition; editorial fusion follows the Chinese draft; the independent Chinese sentence gate precedes English and is rechecked at release; bilingual guidance governs English; hard gates and self-review control release.

Evidence checking stays internal. As requested on 2026-09-06, project and note prose must not inventory what the archive proves, list absent tests, or repeatedly say what cannot be claimed. State supported work and results directly, with natural conditions and attribution where useful. The independent editorial-conservation / information-retention gate is removed; do not recreate it under another name. English adaptation must not restore removed material. Evidence bounds facts, not the reader-facing structure. External knowledge may add light nearby links and first-person present-learning insight after the brief is confirmed; it must never be written as invented project history, action, result, or measurement. A confirmed real event plus a confirmed emotional direction may be reconstructed in natural first person, but the prose may not add time, place, action, dialogue, participants, technical results, or causal order.

For `content/notes/*.mdx`:

- describe the system, constraint, question, file, and next step directly;
- begin from a concrete course detail, file, symptom, command, or engineering question instead of describing the page as a reorganized document;
- let the writer's changing understanding determine the paragraph and section order instead of selecting a note archetype; attention may jump across subsystems or chronology and synthesize later when that reflects genuine understanding, with no mandatory cognition template;
- derive the title and headings after drafting; keep the page title short, accurate, and precise, naming the engineering subject plus only the scope needed to identify the learning note;
- derive each section heading from all its paragraphs after writing them. Use a concise label for their actual subject and aspect, such as `I²C 传输流程` or `执行前的权限检查`; reject question hooks, abstract labels and isolated moments such as `高电平从哪里来` or `重启之后`. `开发尝试` remains valid when it accurately indexes the block; keep the anecdote, judgment and cognition change in the body. Apply this rule to both languages, and preserve non-heading content during a heading-only revision;
- prefer substantial paragraphs when related facts, explanations, and judgments belong to one cognition movement; keep paragraph lengths naturally uneven and allow a one-sentence paragraph when a real interruption, failed assumption, result, or ending earns it;
- in each Chinese learning note, allow at most one prose paragraph beginning with `我`, counting the introduction and every paragraph beneath headings. Start other paragraphs naturally from their concrete subject, condition, question or action; do not simply prefix filler. Preserve personal ownership and proposed-versus-completed work. This does not ban first person within paragraphs or impose an English numerical quota;
- place supported reactions and light humor beside the real engineering friction rather than saving all personality for a conclusion;
- give project pages and learning notes a natural close without forced elevation or abrupt cuts after data. Compare nearby endings for repeated retrospective or hypothetical-next-time frames; an apt occasional `下一次再看到……` remains allowed. Judge recurring function, not a phrase blacklist;
- preserve Li Zhiyi's established voice and keep the confirmed emotional intensity unchanged, neither flattened nor amplified; borrow editing mechanics without importing another writer's vocabulary, register, cadence, audience relationship, or persona;
- use natural spoken transitions where they fit, avoid repetitive resume lists and repeated contrast/sequence scaffolds, and continue allowing ordinary `首先` / `其次` / `最后` phrasing when it is concrete rather than structural filler;
- use direct assertions and normal sentence syntax in scoped normal narration. Model-authored em dashes remain off by default. Allow a colon when it performs a clear semantic job and quotation marks for traceable source wording, real utterances, UI labels, document claims, or terms genuinely being discussed; reject template-label colons, decorative quotation, and dense repeated use. Prefer inline code for code-like technical tokens. Avoid bare `不是 A，而是 B` / `not A but B` reframes; preserve ordinary factual negation and the exact user-confirmed `不是说 A 不行，而是说 B` form when it genuinely prevents a false reading;
- keep evidence links, files, and technical constraints specific;
- name known tools and models exactly without guessing unknown names;
- require model-authored project and note body to reach zero applicable violations for the scoped wording, prohibited punctuation use, canned structure, note-specific user bans, and L1-5 syntax/collocation calques in `reader-prose-hard-gates.md`; one unqualified inanimate-subject experiential frame, concretized abstract polyseme, or one-to-one narrative clause mirror blocks release. Allowed semantic colons and grounded quotations are not hits. Reader-visible `title` and `titleZh` remain in scope even when stored in frontmatter; other metadata, Markdown syntax, links, code, paths, logs, verbatim artifacts, and exact technical strings stay outside this scan;
- require first-person learning-note prose to pass the Truth gate and Li Zhiyi gate; keep specifically requested neutral audits, summaries, and captions neutral, and apply the gates only to claims and voice within that scope;
- use bilingual headings or paired English/Chinese paragraphs on public pages when a section would otherwise be single-language.

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
- check both languages at desktop and mobile widths;
- verify no horizontal overflow;
- verify links and dynamic content routes;
- verify visibility pausing and `prefers-reduced-motion` behavior for every changed route motion, including the homepage atom, Work intervals, Notes route motion, Media reveal/scan, and About pulse when those surfaces are in scope.

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
