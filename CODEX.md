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

- Node.js 22 LTS or newer; this machine is verified with `v24.19.0`.
- npm 10 or newer; this machine is verified with `11.17.0`.
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

The current working content state extends release `v0.7.0` on `main`, including the media/cover refresh, the two-pane public project-file browser for project archives, and the imported Digital Clock and Smart Car course projects.

As of `2026-08-16`, this workspace builds on the `main` content set that removed placeholder projects and consolidated real internship / hardware material from:

```text
D:\XJTLU\工作相关\卷云科技有限责任公司
D:\XJTLU\工作相关\南京图灵人工智能研究院
D:\XJTLU\工作相关\天津津铁通信有限公司
D:\XJTLU\工作相关\Claude Chime 硬件
```

Current content count in this workspace:

- 8 project pages total;
- 24 public notes total;
- 2 Juanyun project pages and 10 Juanyun-prefixed notes remain;
- 1 independent sensorless FOC learning-route project and 1 related note replace the former Juanyun-labelled FOC archive;
- 1 Claude Chime commissioned hardware case study and 1 related note;
- 1 Nanjing Turing Qt/CMake/packaging project and 5 related notes were added;
- 1 Tianjin rail-transit STM32 foundation project and 5 related notes were added.
- 1 Arduino Digital Clock course project and 1 related note were added from `C:\Users\123\Desktop\Digital Clock`; the original course PDF and source description TXT stay out of `public/uploads/`, while selected course screenshots without the top-right XJTLU logo, cropped homework-report excerpts, the original homework report PDF, Arduino sketches, demo video, and SN54LS47 datasheet are public.
- 1 Arduino Smart Car line-tracking course project and 1 related note were added from `C:\Users\123\Desktop\Smart Car Project`; the original course tutorial PDF and project-description TXT stay reference-only, while selected course screenshots with the school logo area removed, the public kit manual PDF, the project report PDF, cleaned car photos, and Arduino testing code are public.
- 84 media gallery items cover images/videos referenced by project and note pages, including 12 independent FOC learning-route records for board renders, five schematic sheets, onsite SMT, the compressor bench, open-loop runtime, and the generated FOC/SVPWM signal-chain visual.
- The DIY pressure-flow cooling project, note, and six media records completed the one-project-at-a-time `grill-me` rewrite on `2026-08-12`, then received the final cognition-led pass after the redesigned writer merged through pull request #8; pull request #9 merged that prose into `main` at `baa7c98`. Remembered temperature and frame-rate changes remain explicitly personal observations rather than controlled benchmark results.
- The Arduino Digital Clock project, note, and 11 media records completed the confirmed bilingual cognition-led rewrite on `2026-08-13`; pull request #10 merged that prose into `main` at `80c3743`. The account preserves individual ownership, treats the two rollover thresholds as separately flashed versions, and keeps the demo video, early `main.c`, final switch polarity/debounce, and later-found datasheet within their verified evidence boundaries.
- The Tianjin Jintie Communications STM32 project and five notes completed the confirmed bilingual cognition-led rewrite on `2026-08-13`; pull request #12 merged the project page, five notes, and three media-copy updates into `main` at `bb06ad8`. The account follows the self-directed path from Arduino abstractions to peripheral-level reasoning, keeps the 16-point ADC-to-PWM mapping feedforward, treats the hardware-I2C lockup as a present-day hypothesis, and leaves PID plus ATP/ATO/ATS in the reading layer. All four public C excerpts and public uploads were unchanged.
- The Nanjing Turing Qt/Seamly2D project and three-week note completed the confirmed bilingual cognition-led rewrite on `2026-08-13`; pull request #14 merged the project page, note, and five media-copy updates into `main` at `f5e1082`. The account keeps the local `QSettings` account/role layer separate from online authentication, distinguishes formal development-machine acceptance from the later clean Windows PC test, stops macOS at a launched unsigned DMG with signing/notarization unfinished, and leaves post-handoff adoption unknown. The four source-document notes and all public uploads were unchanged.
- The Claude Chime project completed the same workflow on `2026-08-13`; pull request #16 merged the approved bilingual commissioned-hardware case study, cold-start battery-protection note, one media-copy update, and 10 new public artifacts into `main` at `03f5ba5`. The account attributes the board architecture, calculations, schematic, PCB, manufacturing outputs, hand assembly, and scoped bring-up to Alvin while keeping ESP32 firmware and final real-load integration with the client. The two no-load 5 V readings, charge-current/battery-voltage check, gated divider check, and no-load control switching are direct tests; real-solenoid operation is client chat feedback; cold-start protection triggering remains a bounded inference rather than a directly proven trigger or measured inrush-current peak.
- The Juanyun thermal project completed the confirmed bilingual cognition-led refactor on `2026-08-14`; pull request #22 merged the product-spine rewrite, three revised core notes, two new automatic-control/maintenance notes, five approved ACUnit V2.1 bring-up photographs, and updated media/inventory records into `main` at `e473b8c`. The public project title is `卷云相变散热器系统：两套控制器与一条完整制冷链`, and its canonical date range is `2025-11 to 2026-05`. Direct personal bring-up remains separate from company-reported later tests, and complete firmware plus reconstructable product source remain private.
- Pull request #23 merged the approved pre-PR20 prose maintenance into `main` on `2026-08-15` at `c89b3b0`. Five older project families received an L1 surface cleanup; the direct-prose follow-up then covered the Digital Clock and Smart Car project/note pairs plus the Nanjing Turing project page after user review. This was not a new cognition-led rewrite. FOC, Claude Chime, Juanyun thermal, the four Nanjing source-document notes, covers, public uploads, and application code were unchanged.
- Pull request #25 merged the user-approved sensorless FOC learning-route refactor into `main` on `2026-08-16` at `df5b913`. It replaces the legacy Juanyun-labelled project and note slugs, publishes 12 media records and 22 curated files under `public/uploads/projects/sensorless-foc-learning-route/`, keeps the full firmware repository external, and preserves the open-loop result plus unfinished sensorless-handoff boundary.
- The old portfolio rebuild project, PID Starter Kit placeholder project, ACUnit/BaseUnit/DHT standalone project pages, and actuator/fan standalone project page were removed or merged into larger project archive pages.
- The Nanjing Turing CMake/build-logic note renders the user's two Notion-exported Markdown originals directly, with a matching English reading section and page-internal anchor links.
- Public project/note bodies have an English coverage pass; future content should keep Chinese and English article sections equivalent rather than relying only on frontmatter translation.
- `ContentRenderer` renders consecutive standalone Markdown images as a clickable responsive gallery grid. Use plain consecutive image lines in MDX when several schematic sheets or board renders belong together. In-body evidence figures and project-file image previews are served through direct public URLs, so keep these assets compressed before adding them.

Juanyun public boundary:

- Sensitive: `Current_Product_ACUnit_Project` and `Current_Product_BaseUnit_Project`. Do not publish raw Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source, complete firmware source, internal product requirements, manufacturing packages, invoices, reimbursements, billing records, credentials, executable installers, vendor folders, or generated build outputs from those folders.
- Public after pruning: legacy Juanyun DIY cooling, solenoid valve, BLDC quiet fan, DHT breakout planning, and the self-authored `卷云硬件开发SOP_Awes0meE.pdf`.
- Static public assets for the expanded public Juanyun material live under `public/uploads/projects/juanyun-public/`; `main` may include selected legacy Gerber, EDA, BOM/PnP, STEP/3MF, source snippets, schematics, PDFs, and images from non-Current_Product folders after pruning installers, dependency folders, vendor folders, generated build outputs, financial/proof documents, and duplicate raw dumps.

Independent FOC public boundary:

- The FOC project is a personal learning route and must not be attributed to Juanyun or treated as a company archive.
- Its reviewed public artifacts live under `public/uploads/projects/sensorless-foc-learning-route/` and include selected design, manufacturing, bench, and explanatory evidence from the user's 2026-08-16 handoff.
- The complete firmware tree, vendor libraries, IDE caches, build output, and raw diagnostic logs stay out of `public/uploads/`; `https://github.com/Awes0meE/STM32_Sensorless_FOC` remains the external firmware evidence link.

## Visual Direction

Maintain the current engineering-academic identity:

- precise, calm, credible, portfolio-grade;
- Alvin Li is the sole reader-facing personal identity; `iRidium / 铱` is the engineering archive brand;
- keep the approved five-rectangle mark from `public/brand/iridium-mark.png` in the header, preserve equal square bounds for its upper-left and lower-right blocks, pair it with the user-selected B-style `public/brand/iridium-wordmark-script.png`, render that wordmark at the user-approved compact 26px height, and preserve the exact `iRidium` capitalization in both language modes;
- keep the homepage hardware hero in `components/technical-visual.tsx` as the approved five-card mosaic: the 0.96-inch OLED and TFT-display assemblies occupy the two-card upper row, while the battery/USB power board, 12 V / 5 V / 3.3 V power-supply board, and AD831 mixer occupy the three-card lower row; use the warm-paper presentation derivatives under `public/uploads/hero/`, but never treat AI background-replacement derivatives as exact component, silkscreen, or fabrication evidence;
- bilingual Chinese/English content;
- white/paper background, fine grid, pine green, graphite, and copper accents;
- 6-8px radius, fine borders, restrained shadows;
- project evidence over decoration;
- no generic template blog styling, no Hexo identity, no stock marketing hero.

## Writing Direction

Portfolio notes should keep the user's practical learning-log texture: technically rigorous, close to the debugging scene, and comfortable carrying real frustration, amusement, uncertainty, and small human details beside the evidence. When uploaded public `.txt`, `.md`, or self-authored document text is itself the artifact, make it a real note page with the original wording rendered as readable article content instead of hiding it under a project asset frame or compressing it into a short summary.

Use the repo-local `skills/engineering-note-writer/SKILL.md` when turning rough project bullet points, timelines, technical stacks, and evidence into portfolio prose. The canonical sequence is: inspect artifacts; reuse a user-confirmed `grill-me` brief or obtain one; after confirmation, research beyond uploaded material with current reliable web sources; draft Chinese through the user's cognition trail; adapt English with the same substance and calmer intensity; then pass the Truth gate, Li Zhiyi gate, and the scoped zero-hit reader-prose L1 gate. Follow `references/evidence-and-boundaries.md`, `references/cognition-led-composition.md`, and `references/reader-prose-hard-gates.md`, then the voice, bilingual, and self-review references.

Evidence bounds project facts, authorship, actions, results, measurements, uncertainty, and publication claims, but it cannot choose the reader-facing structure. External knowledge may add light nearby links and first-person present-learning insight after the brief is confirmed; it must never be written as invented project history, action, result, or measurement. A confirmed real event plus a confirmed emotional direction may be reconstructed in natural first person, but the prose may not add time, place, action, dialogue, participants, technical results, or causal order.

For `content/notes/*.mdx`:

- describe the system, constraint, question, file, and next step directly;
- begin from a concrete course detail, file, symptom, command, or engineering question instead of describing the page as a reorganized document;
- let the writer's changing understanding determine the paragraph and section order instead of selecting a note archetype; attention may jump across subsystems or chronology and synthesize later when that reflects genuine understanding, with no mandatory cognition template;
- derive headings after drafting, name the actual technical subject below them, and follow the heading constraints in `engineering-note-writer`;
- avoid reusable framework headings that expose the writing process instead of the technical subject;
- place supported reactions and light humor beside the real engineering friction rather than saving all personality for a conclusion;
- use natural spoken transitions where they fit, avoid repetitive resume lists and repeated contrast/sequence scaffolds, and continue allowing ordinary `首先` / `其次` / `最后` phrasing when it is concrete rather than structural filler;
- use direct assertions and normal sentence syntax in scoped normal narration. Do not use Chinese corner quotes there; write exact technical tokens as inline code. Avoid bare `不是 A，而是 B` / `not A but B` reframes; preserve ordinary factual negation and the exact user-confirmed `不是说 A 不行，而是说 B` form when it genuinely prevents a false reading;
- keep evidence links, files, and technical constraints specific;
- name known tools and models exactly without guessing unknown names;
- require model-authored project and note body to pass the scoped zero-hit wording, punctuation, and canned-structure rules in `reader-prose-hard-gates.md`; frontmatter, Markdown syntax, links, code, paths, logs, verbatim artifacts, and exact technical strings stay outside this scan;
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
