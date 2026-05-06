# MEMORY.md

Durable project memory for the XJTLU Portfolio repository. Current local path in this session: `D:\XJTLU\XJTLU_Portfolio`.

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
- `2026-05-06`: Local note-route failures such as `Cannot find module './vendor-chunks/esprima.js'` were traced to corrupted `.next` development cache, not broken note content. Stop project Node/Next.js processes, delete `.next/`, then restart `npm run dev`.
- `2026-05-06`: Branch `content/internship-juanyun-expansion` was created from `main` to remove inaccurate placeholders and add real internship content from Juanyun, Nanjing Turing AI Research Institute, and Tianjin rail-transit STM32 study materials.
- `2026-05-06`: The SAT301 placeholder project and five empty notes (`pid-control-notes`, `embedded-debug-log`, `kalman-filter-note`, `slam-reading`, `motor-driver-log`) were removed from the working branch because they were not real user work.
- `2026-05-06`: Nanjing Turing content was added as one Qt/CMake/packaging project with four public notes; Tianjin rail-transit content was added as one STM32 foundation project with five public notes.
- `2026-05-06`: Release `v0.4.0` was merged back to `main` and pushed to GitHub at commit `55ffaab Merge internship portfolio content`. The final handoff review then continued on `main`.
- `2026-05-07`: Final handoff review fixes were pushed to `main` at commit `3c14b80 Finalize portfolio handoff review`, adding Chinese labels for the new project statuses and reconciling docs with the merged `main` state.
- `2026-05-07`: Branch `project-archive-pages` was created to make project pages larger evidence archives. The branch removed the portfolio rebuild, PID Starter Kit, ACUnit, BaseUnit, DHT, and actuator standalone project pages; merged ACUnit/BaseUnit/DHT/actuator material into `juanyun-thermal-hardware`; added `components/project-assets.tsx` and project `assetPaths`; added a Claude Chime hardware power-board archive; and updated the footer copyright to `Awes0meE / 66CCFF Labs`.
- `2026-05-07`: Release `v0.5.0` was merged to `main` and pushed to GitHub at commit `3add408 Add project archive pages`.
- `2026-05-07`: Added root `.nojekyll` because GitHub Pages/Jekyll tried to parse uploaded Markdown/code evidence under `public/uploads/` as Liquid templates and failed on an Inno Setup GUID. Vercel remains the canonical deployment target.

## Stable Decisions

- Use `CODEX.md` as the primary project-agent guide. `AGENTS.md` points to it for compatibility.
- Keep `AGENTS.md` focused on cross-device bootstrap and short agent entry instructions.
- Use `MEMORY.md` as the current durable memory index, with `docs/session-log.md` as append-only chronology.
- Keep content Git-friendly: projects and notes live in `content/**/*.mdx`; media metadata lives in `content/media.json`; assets live under `public/uploads/`.
- Use optional `projectSlug` on notes and media to connect project pages, related notes, related media, and note back-links.
- Use optional project `assetPaths` to render public project evidence from `public/uploads/` on project detail pages. The renderer previews images/videos, inlines small source/text/Markdown files, and links binary documents / CAD / EDA / fabrication archives.
- Use `BilingualText` for fixed UI labels and paired metadata. Do not return to mixed labels such as `Work / 项目` now that the site has a global language toggle.
- Use `visibility: public` or `visibility: private` on every note. Treat missing `visibility` as private so draft notes do not accidentally publish.
- Write notes with the user's practical self-study / internship-log texture, but public pages should prefer direct descriptive narration over repetitive first-person `我...` claims.
- Do not introduce a database or CMS until file-based content becomes a real bottleneck.
- Public files under `public/uploads/` are not private. For Juanyun, treat only `Current_Product_ACUnit_Project` and `Current_Product_BaseUnit_Project` as sensitive product folders by default; do not place their Gerber, schematic, BOM, PnP, EDA/CAD source, full firmware source, invoice, reimbursement, billing, credential, installer, vendor, or build-output files there. Other Juanyun legacy folders can be public after pruning noisy raw project/build/vendor files.
- Preserve `legacy/hexo-export/` as historical reference. Do not serve it as the live website.
- Use Vercel for deployment and Cloudflare for DNS management.
- Keep root `.nojekyll` committed so incidental GitHub Pages builds do not run Jekyll/Liquid over Next.js source files and uploaded Markdown/code archives.

## Site Identity

- Brand/domain: `66ccff Labs` can be used as a lab-style wrapper, but the personal portfolio identity remains `Awes0meE / Li Zhiyi`.
- Visual tone: engineering academic, precise, bilingual, clean, evidence-driven.
- Avoid returning to generic template-blog styling.

## Important Files

- `app/page.tsx`: homepage layout and major public-facing sections.
- `app/layout.tsx`: root layout, metadata, language bootstrap script, header/footer shell.
- `components/language-toggle.tsx`: client-side EN/简中 language switch.
- `components/bilingual-text.tsx`: paired English/Chinese text rendering.
- `components/project-assets.tsx`: renders project `assetPaths` from `public/uploads/`, with an explicit allowlist for reviewed `juanyun-tech` files.
- `lib/content.ts`: content loaders and typed content models.
- `lib/site.ts`: site constants and navigation labels.
- `content/projects/`: project case-study source files.
- `content/notes/`: learning note source files.
- `content/media.json`: gallery metadata.
- `public/uploads/`: images, videos, and downloadable assets.
- `docs/content-workflow.md`: how to add and maintain portfolio content.
- `docs/juanyun-tech-source-inventory.md`: mapping from the raw Juanyun source folder to public portfolio content and excluded private material.
- `public/uploads/projects/juanyun-public/`: reviewed public Juanyun legacy PDFs, images, source snippets, and selected project-file evidence.
- `public/uploads/projects/claude-chime-hardware/`: public Claude Chime hardware PDFs, BOM, Gerber, EasyEDA project, logo image, and datasheets.
- `public/uploads/projects/nanjing-turing/`: reviewed public Qt/CMake/Seamly2D learning evidence.
- `public/uploads/projects/tianjin-metro/`: reviewed public STM32 foundation learning evidence.

## Verification Baseline

Known-good checks as of `2026-05-07` on Windows PowerShell:

```powershell
npm.cmd run lint
npm.cmd run build
npm audit --omit=dev
```

Expected result:

- lint passes;
- production build passes;
- production audit should report `0 vulnerabilities` when dependency state has not changed.

## Open Content Work

- Keep checking that company-sensitive Juanyun Current_Product files are not restored under `public/uploads/`; non-Current_Product legacy evidence can be public only after pruning noisy installers, vendor/dependency folders, generated build outputs, financial/proof files, and uncurated full dumps.
- If older Git history privacy matters, decide whether to rewrite Git history or move the repository private, because previously committed Juanyun attachments may remain in commit history even after they are removed from the served website.
- Browser-review the deployed `v0.5.0` pages on `https://www.66ccff-labs.com/` after Vercel finishes deployment, especially the larger Juanyun archive, Claude Chime hardware page, Nanjing Turing logs, and Tianjin STM32 archive files.
- Add real project photos, screenshots, videos, diagrams, and written interpretation for project archive files that are now listed directly on project pages.
- Re-evaluate thesis content later only after the user provides real project evidence.
- Improve `About` with real biography, skills, education, and contact details.
- Decide how `66ccff Labs` should appear in the visual identity without diluting the personal portfolio.

## Memory Update Rules

- Update this file when durable facts change.
- Move detailed chronology into `docs/session-log.md`.
- Do not store secrets, private tokens, or sensitive personal information.
- Use absolute dates.
- Replace stale facts instead of adding contradictory entries.
