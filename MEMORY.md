# MEMORY.md

Durable project memory for the XJTLU Portfolio repository. Current local path in this session: `D:\Develop\Project_Final_Collation\XJTLU_Portfolio`.

This file is for future AI sessions and long-running portfolio maintenance. Keep it concise and current; edit stale facts instead of blindly appending duplicates.

## Current State

- `2026-05-03`: The old Hexo deployment output from `Awes0meE/Awes0meE.github.io` was archived under `legacy/hexo-export/`.
- `2026-05-03`: The site was rebuilt as a Next.js App Router portfolio with TypeScript, Tailwind CSS, local content files, and Vercel deployment as the target.
- `2026-05-03`: Release `v0.1.0` was pushed to GitHub at commit `468d42b Rebuild portfolio with Next.js`.
- `2026-05-06`: Custom domain `https://www.66ccff-labs.com/` was verified working from the public internet.
- `2026-05-06`: Cloudflare DNS points the domain to Vercel. `www.66ccff-labs.com` resolves through a Vercel DNS CNAME, and the apex domain redirects to `www`.
- `2026-05-06`: External skills installed into Codex user skills: `karpathy-guidelines` and `neat-freak`. Restart Codex to expose them as first-class skills.
- `2026-05-06`: `AGENTS.md` gained a cross-device bootstrap section so a new Codex session on another computer can quickly inspect the repo, restore missing environment context, and install or emulate required skills.
- `2026-05-06`: Public identity was normalized to `Awes0meE / Li Zhiyi`; contact email is `lizhiyi20030401@gmail.com`; degree wording is Communication Engineering.
- `2026-05-06`: Branch `content/juanyun-tech` was created for draft portfolio content from `F:\XJTLU\工作相关\卷云科技有限责任公司`.
- `2026-05-06`: Juanyun technical materials were expanded into 7 Juanyun project pages, 13 Juanyun notes, media entries, and a broad draft public asset set. That early draft later became too permissive for company work.
- `2026-05-06`: Branch `feature/note-visibility` was created from `main` to test note-level public/private visibility. Missing note visibility defaults to private.
- `2026-05-06`: Juanyun public content was tightened to 7 Juanyun project pages and 9 Juanyun notes. Pure datasheet/manual/manufacturing-export notes were removed from the public note set.
- `2026-05-06`: Juanyun public boundary was clarified: only `Current_Product_ACUnit_Project*` and `Current_Product_BaseUnit_Project*` are treated as sensitive product folders by default. Non-Current_Product legacy Juanyun folders can publish selected Gerber, schematic, BOM/PnP, EDA, STEP/3MF, source snippets, PDFs, and images after pruning installers, vendor/dependency folders, generated build outputs, financial/proof documents, and duplicate raw dumps.
- `2026-05-06`: Added a site-wide English/Simplified Chinese language toggle. The implementation uses `html[data-lang]`, `components/language-toggle.tsx`, `components/bilingual-text.tsx`, and optional `titleZh/captionZh` media metadata without adding a heavy i18n dependency.
- `2026-05-06`: The language bootstrap script was moved out of manual `<head>` rendering and into the start of `<body>` to reduce hydration mismatch noise from browser-extension-injected head scripts.
- `2026-05-06`: `feature/note-visibility` was merged into `main` for release `v0.3.0`, covering Juanyun public/private visibility, site-wide bilingual switching, UTF-8 workspace policy, and public asset cleanup.
- `2026-05-06`: Local note-route failures such as `Cannot find module './vendor-chunks/esprima.js'` were traced to corrupted `.next` development cache, not broken note content. Stop project Node/Next.js processes, delete `.next/`, then restart `npm.cmd run dev` on Windows PowerShell.
- `2026-05-06`: Branch `content/internship-juanyun-expansion` was created from `main` to remove inaccurate placeholders and add real internship content from Juanyun, Nanjing Turing AI Research Institute, and Tianjin rail-transit STM32 study materials.
- `2026-05-06`: The SAT301 placeholder project and five empty notes (`pid-control-notes`, `embedded-debug-log`, `kalman-filter-note`, `slam-reading`, `motor-driver-log`) were removed from the working branch because they were not real user work.
- `2026-05-06`: Nanjing Turing content was added as one Qt/CMake/packaging project with four public notes; Tianjin rail-transit content was added as one STM32 foundation project with five public notes.
- `2026-05-06`: Release `v0.4.0` was merged back to `main` and pushed to GitHub at commit `55ffaab Merge internship portfolio content`. The final handoff review then continued on `main`.
- `2026-05-07`: Final handoff review fixes were pushed to `main` at commit `3c14b80 Finalize portfolio handoff review`, adding Chinese labels for the new project statuses and reconciling docs with the merged `main` state.
- `2026-05-07`: Branch `project-archive-pages` was created to make project pages larger evidence archives. The branch removed the portfolio rebuild, PID Starter Kit, ACUnit, BaseUnit, DHT, and actuator standalone project pages; merged ACUnit/BaseUnit/DHT/actuator material into `juanyun-thermal-hardware`; added `components/project-assets.tsx` and project `assetPaths`; added a Claude Chime hardware power-board archive; and updated the footer copyright to `Awes0meE / 66CCFF Labs`.
- `2026-05-07`: Release `v0.5.0` was merged to `main` and pushed to GitHub at commit `3add408 Add project archive pages`.
- `2026-05-07`: Added root `.nojekyll` because GitHub Pages/Jekyll tried to parse uploaded Markdown/code evidence under `public/uploads/` as Liquid templates and failed on an Inno Setup GUID. Vercel remains the canonical deployment target.
- `2026-05-07`: Media and notes were refreshed after `v0.5.0`: `content/media.json` now has 29 items covering project/note images and videos; Nanjing Turing gained `turing-three-week-development-log`; the Juanyun hardware SOP is rendered as webpage text; and notes/projects were rewritten away from AI handoff phrasing toward practical learning-log narration.
- `2026-05-07`: Release `v0.6.0` names the post-`v0.5.0` media/note refresh on `main`, including the 29-item media gallery, webpage-rendered SOP/text assets, note prose refresh, and release-boundary docs cleanup.
- `2026-05-07`: Nanjing Turing source-text notes were changed to render uploaded public originals directly as note pages: Qt6 Seamly2D first-run TXT, Release packaging Markdown, README + `.sm2d` / `.smis` samples, and then the CMake/build-logic note was replaced again with the user's two Notion-exported Markdown originals instead of the lossy PDF text extraction.
- `2026-05-07`: Release `v0.6.1` adds the Notion CMake/build-logic originals, page-internal heading anchors, Markdown table rendering, a full public English body coverage pass across projects/notes, and a 38-item media gallery covering all project/note images and videos.
- `2026-05-07`: Content rendering was tightened after English translation code snippets leaked into Chinese note views. `ContentRenderer` now ignores standalone HTML comments, supports scoped fenced-code prefixes such as `en-text` / `zh-text`, splits bilingual slash text from the last valid Chinese separator, and project/note detail routes lock unknown slugs to generated static params.
- `2026-05-07`: Post-`v0.6.1` media/cover refresh added processed cover images for Juanyun, Nanjing Turing, and Tianjin rail-transit project pages; added DIY STM32 PCB render/schematic, FOC board render plus five schematic sheets, and EEV driver-board render/schematic to project pages and `/media`; `content/media.json` now has 50 items. `ContentRenderer` now turns consecutive standalone Markdown images into clickable responsive galleries, and in-body / project-asset evidence images use direct public URLs to avoid blank optimizer placeholders on long archive pages.
- `2026-05-07`: Environment/toolchain handoff was made explicit: `docs/environment-toolchain.md` now covers Git restore, Node/npm baselines, PowerShell `npm.cmd`, PATH recovery, local preview, Playwright screenshots, UTF-8 rules, and Vercel settings. `package.json` declares Node `>=22` and npm `>=10`; `.nvmrc` pins the portable Node baseline to `22`.
- `2026-05-07`: Encoding policy is now executable. `scripts/validate-encoding.mjs` checks Git-managed text-like files for valid UTF-8, null bytes, replacement characters, and common mojibake snippets; `npm.cmd run lint` includes the check. Legacy public FOC source and PnP evidence that had GBK/UTF-16 remnants was normalized to UTF-8 before display.
- `2026-05-07`: Experimental branch `experiment/project-asset-browser` replaces stacked public project-file cards with a two-pane browser. `components/project-assets.tsx` remains the server-side resolver and safety boundary; `components/project-asset-browser.tsx` is the client-side index/preview UI.
- `2026-05-07`: Full review of the experimental project asset browser hardened public-file handling: non-allowlisted local Juanyun files were moved out of `public/uploads/projects/juanyun-tech` to `D:\XJTLU\XJTLU_Portfolio_private\juanyun-tech-public-quarantine-20260507`; content validation now fails if extra files reappear there; browser previews gained directory/file caps, aggregate text-preview caps, strict UTF-8 reads, Markdown relative-link resolution, safer active-upload handling, and mobile preview scrolling.
- `2026-05-07`: Release `v0.7.0` promotes the two-pane public project-file browser to `main`, keeps the 50-item media/gallery content state, and records the public-asset hardening work as part of the release boundary.
- `2026-05-07`: Added repo-local `AddProject.skill` / `skills/add-project/SKILL.md` to make future local-folder project imports repeatable.
- `2026-05-07`: Homepage identity polish after `v0.7.0`: the top-left wordmark now reads `Awes0meE / 66CCFF Lab`, the hero/footer can still use `66CCFF Labs`, the homepage profile avatar uses `public/uploads/projects/avatar.jpg`, the Chinese XJTLU school label is `智能工程学院`, and the homepage current date range starts at `2025.08`.
- `2026-07-03`: Upgraded repo-local `AddProject.skill` / `skills/add-project/SKILL.md` into the portfolio project-import SOP for turning a user-provided raw project folder into public-safe uploads, bilingual project pages, notes, media entries, preview checks, verification, Git handoff, and optional release. The skill now uses focused references for intake, source audit, public-safety review, content building, and review/release.
- `2026-07-03`: Added repo-local `engineering-note-writer` skill for converting rough project bullet points, timelines, technical stacks, and evidence into the portfolio's Chinese-first practical engineering-note voice with accurate English counterparts. `AddProject.skill` now points to it for project/note/media prose during imports.
- `2026-07-04`: Hardened `AddProject.skill` and `engineering-note-writer` with mandatory hard-gated checklists so future agents must pass source-audit/public-safety/content/verification gates for imports and fact/structure/voice/bilingual/MDX gates for writing before continuing.
- `2026-07-04`: Imported `C:\Users\123\Desktop\Digital Clock` as the `arduino-digital-clock-counter` portfolio project: 1 project page, 1 public learning note, 11 media entries, normalized public uploads under `public/uploads/projects/arduino-digital-clock-counter/`, selected public screenshots from the course handout, and selected cropped excerpts from the homework report. The original `Digital Clock.pdf` course handout and homework report PDF are reference-only and should not be copied into `public/uploads/`.
- `2026-07-04`: Investigated failed GitHub Pages deployment run `28677991122` at commit `f1371d0`. Vercel and local builds were healthy; the problem was the username repository still had legacy GitHub Pages configured to publish `main:/`, so Pages tried to deploy the raw Next.js source repository. Direct Pages deactivation returned HTTP 422, so the repository now uses a dedicated `gh-pages` branch containing only `index.html`, `404.html`, and `.nojekyll` as a redirect fallback to `https://www.66ccff-labs.com/`, with Pages source set to `gh-pages:/`.

## Stable Decisions

- Use `CODEX.md` as the primary project-agent guide. `AGENTS.md` points to it for compatibility.
- Keep `AGENTS.md` focused on cross-device bootstrap and short agent entry instructions.
- Use `MEMORY.md` as the current durable memory index, with `docs/session-log.md` as append-only chronology.
- Use `docs/environment-toolchain.md` as the canonical setup and local-tooling guide for new machines, WPS-synced folders, PowerShell, Node/npm, preview servers, and Vercel settings.
- Keep content Git-friendly: projects and notes live in `content/**/*.mdx`; media metadata lives in `content/media.json`; assets live under `public/uploads/`.
- Use optional `projectSlug` on notes and media to connect project pages, related notes, related media, and note back-links.
- Use optional project `assetPaths` to render public project evidence from `public/uploads/` on project detail pages. Keep filesystem resolution, path normalization, strict UTF-8 reads, Juanyun allowlist filtering, directory recursion caps, file-count caps, and aggregate preview-size caps server-side in `components/project-assets.tsx`; pass only serializable asset metadata/content into the client-side browser. The browser previews images/videos, Markdown/text, source code, and PDFs, while binary documents / CAD / EDA / fabrication archives keep direct open links.
- Keep project detail sections ordered as project body, development notes, public project files, then related media. This keeps the narrative and note trail above the file archive.
- Use `BilingualText` for fixed UI labels and paired metadata. Do not return to mixed labels such as `Work / 项目` now that the site has a global language toggle.
- Use `visibility: public` or `visibility: private` on every note. Treat missing `visibility` as private so draft notes do not accidentally publish.
- Keep the current project/note prose style for future content. The user likes the plain practical self-study / internship-log texture now used in notes and projects: concrete, casual, close to the debugging scene, less formal logic, not AI handoff or delivery-report phrasing.
- When uploaded public `.txt`, `.md`, or self-authored document text is itself the artifact, prefer making it a real note page with the original wording rendered as readable article content. Do not hide the only copy under a project asset frame or replace it with a short summary.
- Keep English body sections equivalent to Chinese body sections on public project/note pages. Do not rely on `title/titleZh` and `summary/summaryZh` alone when the article body has real content in both languages.
- Treat normal fenced code blocks as language-neutral rendered evidence. When a whole code/listing block belongs to only one language view, use a scoped fence prefix such as `en-text`, `en-powershell`, `zh-text`, or `zh-powershell`; the renderer hides it with the same language CSS and displays the suffix as the code label.
- Project asset browser review lesson: key the preview pane by selected file href so scroll state from one file does not leak into the next file; resolve uploaded Markdown image/link paths relative to the source asset href through `ContentRenderer baseHref`; keep HTML and SVG uploads as download-only artifacts rather than inline-rendering arbitrary active content; keep the open-file action visible because PDF embed behavior differs across browsers.
- Strict encoding rule: every committed source, content, docs, and public-upload text file must be UTF-8. Convert GBK/UTF-16 legacy exports at import time; do not mix encodings in the repo and do not add runtime decoder fallbacks to hide bad files.
- On Windows PowerShell, do not pipe inline Chinese here-strings directly into Node/Python/other interpreters for file generation. Use `apply_patch` for Chinese text or write a temporary UTF-8 script/file first, then run it. After any batch content generation, verify with Node `fs.readFileSync(path, "utf8")` and scan for `\uFFFD` or repeated question-mark mojibake before committing.
- On Windows PowerShell, use `npm.cmd` and avoid assuming modern .NET helper APIs exist in older shells. In particular, do not rely on `[System.IO.Path]::GetRelativePath` for safety-critical moves; use Node.js `path.relative` or a verified substring fallback, set `$ErrorActionPreference = 'Stop'`, and hash-check copied files before deleting/moving originals.
- Use `AddProject.skill` for future "give Codex a local folder and deploy it as a portfolio project" tasks. The canonical skill lives at `skills/add-project/SKILL.md`; the root `AddProject.skill` file is a human-friendly shortcut. The import workflow is intentionally staged and hard-gated by `skills/add-project/references/hard-gated-checklist.md`: read-only source audit, public/private classification, user confirmation for ambiguous material, asset normalization, bilingual content/media creation, preview, verification, branch handoff, and optional main release after explicit approval.
- Use `engineering-note-writer` for future "turn my rough project bullet points into portfolio prose" tasks. It should draft Chinese first, then create an English counterpart that matches the Chinese substance. It must preserve concrete engineering evidence and avoid resume, academic, corporate, or AI handoff tone. Its `skills/engineering-note-writer/references/hard-gated-checklist.md` gates fact sheet, structure, voice, banned wording, bilingual equivalence, public boundary, and MDX readiness.
- Do not introduce a database or CMS until file-based content becomes a real bottleneck.
- Public files under `public/uploads/` are not private. For Juanyun, treat only `Current_Product_ACUnit_Project` and `Current_Product_BaseUnit_Project` as sensitive product folders by default; do not place their Gerber, schematic, BOM, PnP, EDA/CAD source, full firmware source, invoice, reimbursement, billing, credential, installer, vendor, or build-output files there. Other Juanyun legacy folders can be public after pruning noisy raw project/build/vendor files.
- Preserve `legacy/hexo-export/` as historical reference. Do not serve it as the live website.
- Use Vercel for deployment and Cloudflare for DNS management.
- GitHub Pages is not the production deployment target. Because `Awes0meE.github.io` is a username repository, Pages may stay enabled and may reject deactivation; keep its source set to `gh-pages:/`, where the branch only serves the redirect fallback to `https://www.66ccff-labs.com/`. Never point Pages at `main:/` and never deploy the full Next.js source tree through Pages.
- When editing the `gh-pages` redirect branch from Windows PowerShell, avoid piping PowerShell-generated tree text directly into `git mktree`; CRLF can become literal `\r` in filenames. Use a temporary worktree or temporary `GIT_INDEX_FILE` plus `git update-index` instead.
- Keep root `.nojekyll` committed so incidental GitHub Pages builds do not run Jekyll/Liquid over Next.js source files and uploaded Markdown/code archives.

## Site Identity

- Brand/domain: `66CCFF Lab(s)` can be used as a lab-style wrapper. The top-left site wordmark is `Awes0meE / 66CCFF Lab`; the hero/footer may use `Awes0meE / 66CCFF Labs`; the personal identity and metadata can still refer to `Awes0meE / Li Zhiyi`.
- Visual tone: engineering academic, precise, bilingual, clean, evidence-driven.
- Avoid returning to generic template-blog styling.

## Important Files

- `app/page.tsx`: homepage layout and major public-facing sections.
- `app/layout.tsx`: root layout, metadata, language bootstrap script, header/footer shell.
- `components/language-toggle.tsx`: client-side EN/简中 language switch.
- `components/bilingual-text.tsx`: paired English/Chinese text rendering.
- `components/project-assets.tsx`: server-side resolver for project `assetPaths` from `public/uploads/`, with an explicit allowlist for reviewed `juanyun-tech` files.
- `components/project-asset-browser.tsx`: client-side two-pane file index and preview UI for public project files.
- `components/content-renderer.tsx`: renders safe markdown-like body content, including readable Markdown/text document previews, normal and language-scoped fenced code blocks, basic Markdown tables, heading anchors, ignored standalone HTML comments, and language-scoped body/headings/tables.
- `lib/content.ts`: content loaders and typed content models.
- `lib/site.ts`: site constants and navigation labels.
- `scripts/validate-content.mjs`: project/note/media content gate, including local `/uploads` reference checks and the explicit Juanyun `public/uploads/projects/juanyun-tech` allowlist boundary.
- `scripts/validate-encoding.mjs`: Git-managed text encoding gate. Keep it strict so PowerShell/GBK/UTF-16 regressions fail locally before deployment.
- `content/projects/`: project case-study source files.
- `content/notes/`: learning note source files.
- `content/media.json`: gallery metadata.
- `public/uploads/`: images, videos, and downloadable assets.
- `docs/content-workflow.md`: how to add and maintain portfolio content.
- `docs/environment-toolchain.md`: Node/npm, Git restore, PowerShell, local preview, screenshot tooling, encoding, and Vercel setup.
- `docs/juanyun-tech-source-inventory.md`: mapping from the raw Juanyun source folder to public portfolio content and excluded private material.
- `skills/add-project/SKILL.md`: portfolio import SOP for turning future local project-material folders into public-safe uploads, bilingual project pages, notes, media entries, preview checks, verification, Git handoff, and optional release.
- `skills/add-project/references/hard-gated-checklist.md`: mandatory phase gate checklist for future project imports and releases.
- `AddProject.skill`: root shortcut that points to the repo-local add-project skill.
- `skills/engineering-note-writer/SKILL.md`: writing-style skill for converting rough project bullets and evidence into Chinese-first bilingual engineering notes in the user's portfolio voice.
- `skills/engineering-note-writer/references/hard-gated-checklist.md`: mandatory writing checklist for fact integrity, structure, voice, bilingual equivalence, public boundary, and MDX readiness.
- `public/uploads/projects/juanyun-public/`: reviewed public Juanyun legacy PDFs, images, source snippets, and selected project-file evidence.
- `public/uploads/projects/claude-chime-hardware/`: public Claude Chime hardware PDFs, BOM, Gerber, EasyEDA project, logo image, and datasheets.
- `public/uploads/projects/nanjing-turing/`: reviewed public Qt/CMake/Seamly2D learning evidence.
- `public/uploads/projects/tianjin-metro/`: reviewed public STM32 foundation learning evidence.
- `public/uploads/projects/arduino-digital-clock-counter/`: reviewed public MEC104 Digital Clock assets, including selected course screenshots, selected homework-report excerpts, a metadata-stripped demo MP4, Arduino sketches, and a public TI SN54LS47 datasheet. The original course PDF, homework report PDF, and source description TXT remain outside public uploads.

## Verification Baseline

Known-good checks as of `2026-07-04` on Windows PowerShell:

```powershell
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
npm.cmd audit --omit=dev
```

Expected result:

- lint passes;
- content validation passes for project/note frontmatter, projectSlug joins, and local `/uploads` references;
- encoding validation passes for Git-managed source/content/docs/public text files;
- production build passes;
- production audit should report `0 vulnerabilities` when dependency state has not changed.

## Open Content Work

- Keep checking that company-sensitive Juanyun Current_Product files are not restored under `public/uploads/`; non-Current_Product legacy evidence can be public only after pruning noisy installers, vendor/dependency folders, generated build outputs, financial/proof files, and uncurated full dumps.
- If older Git history privacy matters, decide whether to rewrite Git history or move the repository private, because previously committed Juanyun attachments may remain in commit history even after they are removed from the served website.
- Browser-review the next deployment on `https://www.66ccff-labs.com/`, especially `/media`, `/work/juanyun-thermal-hardware`, `/work/juanyun-foc-driver-board`, `/work/juanyun-diy-cooling-prototype`, the Nanjing Turing project page, and the Tianjin STM32 project page.
- Add more real project photos, screenshots, videos, diagrams, and written interpretation for project archive files that are now listed directly on project pages.
- Re-evaluate thesis content later only after the user provides real project evidence.
- Improve `About` with real biography, skills, education, and contact details.
- Decide how `66ccff Labs` should appear in the visual identity without diluting the personal portfolio.

## Memory Update Rules

- Update this file when durable facts change.
- Move detailed chronology into `docs/session-log.md`.
- Do not store secrets, private tokens, or sensitive personal information.
- Use absolute dates.
- Replace stale facts instead of adding contradictory entries.
