# Session Log

Append-only chronology for meaningful project milestones. Keep detailed current facts in `MEMORY.md`.

## 2026-05-07

- Summary: Ran final `/neat` after homepage identity polish.
- Files changed: recorded the post-`v0.7.0` homepage identity state in `MEMORY.md`: top-left wordmark `Awes0meE / 66CCFF Lab`, homepage avatar path, Chinese school label `智能工程学院`, and `2025.08` current date-range start.
- Verification: `git diff --check`, `npm.cmd run lint`, and final worktree cleanup checks passed.

## 2026-05-07

- Summary: Added a repo-local `AddProject.skill` workflow for future project imports.
- Files changed: created `skills/add-project/SKILL.md`, `skills/add-project/references/source-audit.md`, `skills/add-project/references/content-build.md`, and root `AddProject.skill`; updated `docs/agent-skills.md` and `MEMORY.md`; added `.skill` files to the UTF-8 validation extension list.
- Verification: skill structure validation, `git diff --check`, `npm.cmd run validate-encoding`, `npm.cmd run lint`, and `npm.cmd run build` passed.

## 2026-05-07

- Summary: Prepared release `v0.7.0` for the project asset browser branch.
- Files changed: bumped package metadata to `0.7.0`; refreshed README, USER_GUIDE, CODEX, MEMORY, architecture, environment-toolchain, Juanyun inventory, and content workflow guidance so the two-pane browser, relative Markdown asset links, HTML/SVG download behavior, strict UTF-8 preview reads, directory/file/preview caps, and `juanyun-tech` allowlist validation are the documented release behavior.
- Verification: `git diff --check`, `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed before merging to `main` and tagging `v0.7.0`.

## 2026-05-07

- Summary: Created experimental branch `experiment/project-asset-browser` for a two-pane public project-file browser.
- Files changed: replaced stacked `ProjectAssets` cards with a server/client split: `components/project-assets.tsx` still resolves safe public files and `components/project-asset-browser.tsx` provides the left file index, right preview window, current-file open action, inline Markdown/text/code/media previews, PDF first-page embeds, and binary-file fallback panel. Follow-up review tightened bilingual file counts, preview remounting by selected href, external-link `rel`, Markdown relative-link resolution, mobile preview scrolling, HTML/SVG download handling, directory/file/preview caps, strict UTF-8 reads, and the Juanyun public allowlist gate. Non-allowlisted local Juanyun files were copied out of `public/uploads/projects/juanyun-tech` to an outside-repo quarantine before deletion from the public folder. Updated README, USER_GUIDE, CODEX, MEMORY, architecture, and content workflow docs for the new archive behavior.
- Verification: `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build` passed; local production screenshots checked desktop and mobile rendering on the Nanjing Turing project page.

## 2026-05-07

- Summary: Ran `/neat` after the English UI and UTF-8 enforcement commit, then cleaned the remaining human guide wording.
- Files changed: updated `USER_GUIDE.md` so media wording, language-toggle wording, publish checks, maintenance workflow, and upload guidance include the current UTF-8 encoding gate; tightened README command comments so `npm run lint` is described as ESLint plus content and encoding validation.
- Verification: repository docs, root Markdown guides, stale command wording, and relative-time wording were reviewed; `git diff --check`, `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-05-07

- Summary: Audited the English interface and made the UTF-8 encoding policy executable.
- Files changed: switched list-page metadata titles to English; removed English-mode Chinese residue from the language toggle and project-file cards; tightened `ContentRenderer` language detection for Chinese source-text blocks; made Chinese-only uploaded documents show an English note-link panel in English mode while keeping the original inline in Chinese mode; added `scripts/validate-encoding.mjs`; added the encoding gate to `npm.cmd run lint`; normalized public FOC source/PnP text evidence to UTF-8; updated `CODEX.md`, `MEMORY.md`, `README.md`, `docs/content-workflow.md`, and `docs/environment-toolchain.md` with the strict UTF-8 rule.
- Verification: `git diff --check`, `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, `npm.cmd audit --omit=dev`, and a local production English UI audit over 30 routes passed.

## 2026-05-07

- Summary: Ran `/neat` focused on cross-device environment and toolchain setup.
- Files changed: added `docs/environment-toolchain.md`; added `.nvmrc`; declared Node/npm engines in `package.json` and `package-lock.json`; updated `AGENTS.md`, `CODEX.md`, `README.md`, `USER_GUIDE.md`, `MEMORY.md`, `docs/architecture.md`, `docs/content-workflow.md`, and `docs/memory-system.md` so new sessions use Node 22+, npm 10+, `npm.cmd` on Windows PowerShell, explicit PATH checks, local preview cleanup, Playwright screenshot guidance, and Vercel settings.
- Verification: environment commands confirmed Node `v24.15.0`, npm `11.12.1`, and Git `2.53.0.windows.2`; `npm.cmd install --package-lock-only`, `git diff --check`, `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-05-07

- Summary: Refreshed project cover images and Juanyun legacy media evidence after new local assets were added.
- Files changed: added processed Cirro Tech, Nanjing Turing, Tianjin Rail Transit, DIY STM32 PCB, FOC board, FOC schematic, and EEV driver-board images under `public/uploads/`; updated Juanyun thermal, FOC, DIY, Nanjing Turing, and Tianjin project pages; refreshed `content/media.json`; taught `ContentRenderer` to turn consecutive Markdown images into clickable galleries; made in-body and project-file evidence images use direct public URLs; updated docs and memory.
- Verification: `git diff --check`, `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed; local production HTTP checks returned `200` for `/media` and the updated project routes; Playwright desktop/mobile screenshots confirmed the new covers and FOC schematic gallery render cleanly.

## 2026-05-07

- Summary: Fixed language-scoping leaks in Turing and Juanyun notes, then tightened the renderer and verification pipeline.
- Files changed: removed English-only fenced snippets from the Qt6 and Release translation sections; scoped Juanyun SOP paired listings with `en-text` / `zh-text`; added bilingual image captions for Juanyun note media; updated `components/content-renderer.tsx` to ignore standalone HTML comments, support scoped code fences, improve mixed slash heading/caption splitting, and use a less brittle language detector; decoded percent-encoded `assetPaths` in `components/project-assets.tsx`; locked project/note detail routes with `dynamicParams = false`; migrated linting to ESLint flat config; added `scripts/validate-content.mjs`; refreshed docs and memory for the new content rules.
- Verification: `npm.cmd run lint`, `npm.cmd run validate-content`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed; local production HTTP checks returned `200` for the Qt6 note, Release packaging note, Juanyun SOP note, Juanyun thermal project page, and `/media`.

## 2026-05-07

- Summary: Moved project development-note cards above public project-file archives on every project detail page.
- Files changed: reordered the related-notes and `ProjectAssets` sections in `app/work/[slug]/page.tsx`; updated `CODEX.md`, `MEMORY.md`, `docs/architecture.md`, and `docs/content-workflow.md` to record the project detail order as body, development notes, public project files, then related media.
- Verification: `git diff --check`, `npm.cmd run lint`, and `npm.cmd run build` passed for the route change; `/neat` docs were checked with UTF-8 and diff checks.

## 2026-05-07

- Summary: Hid English-only CMake translation snippets from the Chinese view and documented the code-fence language-switching trap.
- Files changed: converted the English translation examples at the top of `content/notes/turing-cmake-build-logic.mdx` from fenced code blocks to inline code and made the heading English-only; updated `CODEX.md`, `MEMORY.md`, `README.md`, and `docs/content-workflow.md` so future content edits treat fenced code blocks as shared evidence, not language-scoped prose.
- Verification: `git diff --check`, `npm.cmd run lint`, and `npm.cmd run build` passed before the content fix was pushed; `/neat` docs were checked with `git diff --check`.

## 2026-05-07

- Summary: Prepared release `v0.6.1` with the user's Notion-exported CMake/build-logic originals, full public English body coverage, and refreshed media coverage.
- Files changed: replaced the lossy CMake/build-logic PDF extraction path with two Notion Markdown originals under `public/uploads/projects/nanjing-turing/other-materials/`; expanded the Nanjing Turing project asset list; added the Notion build diagrams to `content/media.json`; improved `components/content-renderer.tsx` with heading anchors, language-scoped headings/tables, recursive bold inline parsing, and Markdown table rendering; added/adjusted English sections across Juanyun, Nanjing Turing, Tianjin, and project pages; bumped package metadata to `0.6.1`; updated `CODEX.md`, `MEMORY.md`, `README.md`, `docs/architecture.md`, `docs/content-workflow.md`, and `docs/juanyun-tech-source-inventory.md`.
- Verification: upload/media coverage validation passed for 101 content upload refs, 38 media items, and 38 content image/video refs; UTF-8/mojibake scan passed for 35 markdown/content files; version/media metadata check passed; `git diff --check`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed; local production HTTP checks returned `200` for `/media`, `/work/nanjing-turing-qt-embedded-learning`, `/notes/turing-cmake-build-logic`, `/notes/tianjin-stm32-environment-setup`, and `/notes/juanyun-hardware-sop`.

## 2026-05-07

- Summary: Reworked the Nanjing Turing source-text notes so public originals appear as real note pages, and removed generic visual-system cards from the media gallery.
- Files changed: replaced the short summaries in the Qt6 Seamly2D first-run, CMake/build-logic, Release packaging, and sm2d XML notes with source-text-driven page bodies; removed the dashboard, lab-notes, robot-platform, and waveform cards from `content/media.json`; added Markdown bold support in `components/content-renderer.tsx`; updated memory/docs with the user's preferred prose style and the PowerShell UTF-8 hard rule.
- Verification: UTF-8/mojibake scan passed for changed Chinese content; upload-link validation passed for 85 public upload refs; media coverage validation passed for 25 media items and 24 content image/video refs; `git diff --check`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed; local HTTP checks returned `200` for `/media` and the four updated Turing note pages.

## 2026-05-07

- Summary: Tagged the media/note refresh as release `v0.6.0` and pushed it for deployment.
- Files changed: bumped package metadata to `0.6.0`; updated `README.md`, `CODEX.md`, `MEMORY.md`, `docs/architecture.md`, `docs/juanyun-tech-source-inventory.md`, and this session log so the current release boundary is no longer described as post-`v0.5.0`.
- Verification: version metadata check, upload/media coverage validation, `git diff --check`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed before tagging and pushing `v0.6.0`.

## 2026-05-07

- Summary: Ran `/neat` after the media/note refresh commit reached `main`, focusing on release-boundary wording and handoff freshness.
- Files changed: updated `README.md`, `USER_GUIDE.md`, `MEMORY.md`, `docs/architecture.md`, and `docs/juanyun-tech-source-inventory.md` so the docs distinguish the `v0.5.0` tag from the later media/note refresh on `main` and avoid stale branch wording; removed a duplicate Juanyun SOP cover asset path so the project page and media page share the same public cover entry.
- Verification: repository state, Node/npm versions, external Codex skills, content counts, media JSON, stale-phrase searches, and upload/media coverage were checked; `git diff --check`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-05-07

- Summary: Ran `/neat` for a cross-device handoff cleanup after the final portfolio review commit reached `main`.
- Files changed: updated `MEMORY.md` with the `3c14b80` handoff commit and refreshed the known-good verification date.
- Verification: repository docs were checked for stale branch wording and relative-date drift; content reference validation passed for 11 projects, 18 public notes, and 11 media items; `git diff --check`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-05-06

- Summary: Completed the final handoff code review on `main` before continuing development on another computer.
- Files changed: added missing Chinese status labels for the new archive/review project statuses; updated `CODEX.md`, `MEMORY.md`, `README.md`, `docs/architecture.md`, `docs/content-workflow.md`, and `docs/juanyun-tech-source-inventory.md` so durable docs describe the merged `main` / `v0.4.0` state instead of the old content branch.
- Verification: `git diff --check` passed; content/project/media reference validation passed for 11 projects, 18 public notes, and 11 media items; `npm.cmd run lint` passed; `npm.cmd run build` passed and generated 37 static pages; `npm.cmd audit --omit=dev` reported 0 vulnerabilities.

## 2026-05-06

- Summary: Prepared release `v0.4.0` for the internship content expansion branch.
- Files changed: bumped package metadata to `0.4.0` and updated README release-tag guidance for the new release.
- Verification: release checks were rerun before merging the branch back to `main`.

## 2026-05-06

- Summary: Continued the interrupted `content/internship-juanyun-expansion` work and completed the Juanyun non-Current_Product legacy evidence alignment.
- Files changed: linked selected DIY cooling, FOC driver, solenoid-valve, and BLDC quiet-fan legacy evidence from their project and note pages; updated `CODEX.md`, `MEMORY.md`, `docs/architecture.md`, `docs/content-workflow.md`, and `docs/juanyun-tech-source-inventory.md` so the public boundary matches the user's clarified rule.
- Verification: checked that all `/uploads/...` links in content files resolve to files under `public/`; `npm.cmd run lint` passed; `npm.cmd run build` passed after rerunning outside the sandbox because the sandboxed build hit `spawn EPERM`.

## 2026-05-06

- Summary: Created `content/internship-juanyun-expansion` and expanded real portfolio content from three internship/work folders.
- Files changed: removed the inaccurate SAT301 placeholder project and five empty shell notes; expanded public Juanyun legacy material while keeping ACUnit/BaseUnit current product folders sensitive; added Nanjing Turing Qt/CMake/packaging project notes; added Tianjin rail-transit STM32 foundation project notes; copied reviewed public evidence into `public/uploads/projects/juanyun-public/`, `public/uploads/projects/nanjing-turing/`, and `public/uploads/projects/tianjin-metro/`.
- Verification: content frontmatter, project slugs, media paths, public asset references, and Juanyun sensitive filename boundary were checked before running lint/build.

## 2026-05-06

- Summary: Merged `feature/note-visibility` into `main` and prepared release `v0.3.0`.
- Files changed: synchronized release documentation with the merged mainline state, including Juanyun public/private boundaries, bilingual language switching behavior, UTF-8 workspace policy, and release tag guidance.
- Verification: release checks were rerun after the merge before pushing `main` and the release tag.

## 2026-05-06

- Summary: Cleaned up local preview troubleshooting after a corrupted Next.js `.next` development cache caused Juanyun note pages to fail with a missing `vendor-chunks/esprima.js` module.
- Files changed: documented the recovery path in `README.md`, `CODEX.md`, `MEMORY.md`, and `docs/content-workflow.md`; clarified that the error comes from local cache corruption around `gray-matter -> js-yaml -> esprima`, not from broken MDX note content.
- Verification: stopped stale project Next.js processes, deleted `.next/`, restarted `npm run dev`, and confirmed all 9 Juanyun note routes returned `200`.

## 2026-05-06

- Summary: Reconciled project documentation after the language-toggle and Juanyun visibility updates.
- Files changed: rewrote long-term project docs with clean bilingual examples, documented the body-level language bootstrap, and removed stale/garbled guidance from `README.md`, `CODEX.md`, `MEMORY.md`, and `docs/content-workflow.md`.
- Verification: `npm.cmd run lint`, `npm.cmd run build`, and `git diff --check` passed.

## 2026-05-06

- Summary: Added a site-wide English/Simplified Chinese language toggle.
- Files changed: added `LanguageToggle` and `BilingualText`, rewired header/footer/home/list/detail/about/media UI labels to use paired text, added optional Chinese media title/caption metadata, and kept the app statically generated with `html[data-lang]` CSS switching.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Repaired Juanyun note mojibake and removed low-value reference notes.
- Files changed: rewrote the remaining Juanyun note bodies as normal Chinese, removed the compressor datasheet, AC unit component datasheet, AC unit manufacturing-export, and base-unit component datasheet notes, and updated project memory/docs counts from 13 to 9 Juanyun notes.
- Verification: checked the remaining `content/notes/juanyun-*.mdx` files for common mojibake markers and checked content references to the deleted note slugs.

## 2026-05-06

- Summary: Ran `/neat` after pushing `feature/note-visibility`.
- Files changed: reconciled `CODEX.md`, `MEMORY.md`, `README.md`, `USER_GUIDE.md`, and `docs/juanyun-tech-source-inventory.md` with the current Juanyun public boundary: notes are public, but website-accessible assets are limited to approved screenshots/renders and one prototype demo video.
- Verification: checked note visibility frontmatter, listed current Juanyun public assets, confirmed the sensitive public-link scan stays empty, and confirmed no raw Juanyun files are tracked under the public upload folder at HEAD.

## 2026-05-06

- Summary: Adjusted the Juanyun public boundary before pushing `feature/note-visibility`.
- Files changed: made Juanyun notes public, restored safe board/system screenshots, added board media entries, and kept raw PCB/manufacturing/source downloads out of `public/uploads/projects/juanyun-tech/`.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed. Production build now includes the Juanyun note pages while the sensitive file-link scan stays empty.

## 2026-05-06

- Summary: Revised public project and note narration on `feature/note-visibility`.
- Files changed: rewrote public project pages and five public notes toward direct descriptive narration, removed `My Work` style sectioning, reduced first-person phrasing, and added English/Chinese section support.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Created `feature/note-visibility` to test note-level public/private visibility and reduce public Juanyun exposure.
- Files changed: added `visibility` to the note content model, filtered public note routes through `getNotes()`, rewrote Juanyun project pages as public-safe shells, reduced raw downloadable assets, and removed company Gerber/schematic/BOM/source/CAD files from `public/uploads/projects/juanyun-tech/`.
- Privacy: Juanyun notes and safe screenshots/renders are public; raw board/manufacturing/source files are not website-accessible on this branch.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed. Production build generated only the five public note pages and no Juanyun note HTML pages.

## 2026-05-06

- Summary: Ran `/neat` after rewriting all notes in the user's personal learning-log style.
- Files changed: updated `CODEX.md`, `MEMORY.md`, and `docs/content-workflow.md` so future agents preserve the new note voice instead of reverting to generic portfolio prose.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Ran `/neat` knowledge cleanup after the Juanyun content expansion.
- Files changed: reconciled `CODEX.md`, `MEMORY.md`, `docs/architecture.md`, `docs/content-workflow.md`, `README.md`, and `USER_GUIDE.md` with the current `content/juanyun-tech` branch state, including project/note counts, `projectSlug` behavior, public domain, branch review boundary, and privacy exclusions.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-03

- Summary: Rebuilt the old Hexo deployment output as a Next.js portfolio.
- Files changed: archived old static output under `legacy/hexo-export/`; created `app/`, `components/`, `content/`, `lib/`, `public/uploads/`, and project docs.
- Verification: `npm run lint`, `npm run build`, and `npm audit --omit=dev` passed after dependency cleanup.
- Release: pushed `main` and tag `v0.1.0` at commit `468d42b`.

## 2026-05-06

- Summary: Verified custom domain and created project-local AI memory/docs system.
- Domain: `https://www.66ccff-labs.com/` works publicly; apex domain redirects to `www`.
- Skills: installed `karpathy-guidelines` and `neat-freak` into Codex user skills.
- Documentation: added `CODEX.md`, `AGENTS.md`, `MEMORY.md`, and `docs/` knowledge base; added a cross-device bootstrap path in `AGENTS.md`.
- Profile: normalized public identity to `Awes0meE / Li Zhiyi`, updated contact email, and aligned degree wording with Communication Engineering.
- Follow-up: start replacing placeholder content with real portfolio assets and case studies.

## 2026-05-06

- Summary: Created branch `content/juanyun-tech` and drafted the first Juanyun Technology content import.
- Source: inspected `F:\XJTLU\工作相关\卷云科技有限责任公司`, including current AC unit/base unit projects, legacy DIY cooling, FOC, solenoid valve, BLDC fan, datasheets, internship proof, reimbursement, and billing folders.
- Files changed: added `content/projects/juanyun-thermal-hardware.mdx`, eight `content/notes/juanyun-*.mdx` files, Juanyun media entries, public technical assets under `public/uploads/projects/juanyun-tech/`, and `docs/juanyun-tech-source-inventory.md`.
- Privacy: kept invoices, reimbursements, billing documents, internship proof, vendor package trees, and build artifacts out of the served public app.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed; local HTTP checks returned `200` for `/work/juanyun-thermal-hardware`, `/media`, and `/notes/juanyun-acunit-board`.
- Follow-up: review public PDFs/downloads before merging or pushing this branch to any public deployment.

## 2026-05-06

- Summary: Improved content sorting on the Juanyun branch.
- Files changed: updated `lib/content.ts` so project and note lists sort by the leading date inside date ranges such as `2026-02 to 2026-05`, instead of relying on unstable `Date.parse()` behavior.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Expanded the DIY pressure-flow cooling prototype with PCB, PlatformIO, desktop C# source, acrylic DWG, and 3MF slice evidence.
- Files changed: updated `content/projects/juanyun-diy-cooling-prototype.mdx`, `content/notes/juanyun-diy-cooling.mdx`, and the Juanyun inventory; published EasyEDA/Gerber, selected ESP32/PlatformIO files, selected C# desktop source, DWG files, and one 3MF slice while excluding duplicate video, executable installers, NuGet/vendor packages, and build outputs.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Expanded the FOC driver archive with selected source, manufacturing, EDA, interactive BOM, and datasheet evidence.
- Files changed: updated `content/projects/juanyun-foc-driver-board.mdx` and `content/notes/juanyun-foc-driver.mdx`, published selected STM32F4/DRV8301 source files, BOM/PnP/interactive BOM, EasyEDA project, DRV8301/HY3010D datasheets, and updated the Juanyun inventory.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Added an AC unit V2.1 component datasheet review note for key power, sensing, Wi-Fi, fan, EEV driver, MOSFET, and TVS evidence.
- Files changed: added `content/notes/juanyun-acunit-v21-component-datasheets.mdx`, linked it from the AC unit project/board note, and published selected V2.1 datasheets plus fan/pressure-transmitter parameter images.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Added an AC unit V1.0/V2.0 hardware revision archive note with earlier mechanical and manufacturing exports.
- Files changed: added `content/notes/juanyun-acunit-hardware-revision-archive.mdx`, linked it from the AC unit project/board note, and published normalized V1.0 BOM/Gerber/DXF/STEP plus V2.0 PCB/BOM/Gerber/PnP files.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Added an AC unit V2.1 manufacturing export package note with BOM, Gerber, and pick-and-place evidence for the main, power, and interaction boards.
- Files changed: added `content/notes/juanyun-acunit-v21-manufacturing-package.mdx`, linked it from the AC unit project/board note, and published normalized V2.1 BOM/Gerber/PnP files.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Added selected AC unit firmware source evidence to the current AC unit control platform and firmware note.
- Files changed: published selected V0.5 `product_acunit` README, PINOUT, IOC, release notes, App/Service/BSP source files, and linked them from the AC unit project/note while excluding HAL/CMSIS vendor trees and binary build artifacts.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Added a base unit component datasheet review note and published the selected datasheet PDFs as supporting evidence.
- Files changed: added `content/notes/juanyun-baseunit-component-datasheets.mdx`, linked it from the base unit project/note, and added normalized public filenames for the eight base unit component datasheets.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Split the DHT11/AM2302 sensor breakout board planning task into its own lightweight hardware project page.
- Files changed: added `content/projects/juanyun-dht-sensor-breakout-board.mdx`, reassigned the DHT note to that project slug, and linked the small-board project from the Juanyun overview and source inventory.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Split the STM32 base unit firmware into its own project page with selected public source evidence.
- Files changed: added `content/projects/juanyun-baseunit-control-firmware.mdx`, reassigned the base unit firmware note to the new project slug, linked the project from the Juanyun overview, and published selected `product_base` App/BSP/IOC/README files while excluding CubeIDE metadata, HAL/CMSIS vendor trees, and build outputs.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Split the current AC unit control platform into its own project page and added a compressor/driver datasheet review note.
- Files changed: added `content/projects/juanyun-acunit-control-platform.mdx`, added `content/notes/juanyun-compressor-datasheets.mdx`, reassigned AC unit notes/media to the new project slug, fixed DIY media ownership, and published selected compressor/driver datasheets.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Added inline image rendering for portfolio notes.
- Files changed: updated `components/content-renderer.tsx` to render simple Markdown image blocks, then embedded key Juanyun board, SOP, and DIY cooling images into the project and notes.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Added related media to project detail pages.
- Files changed: updated `app/work/[slug]/page.tsx` so each project automatically displays media entries whose `projectSlug` matches the current project.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Added related development notes to project detail pages.
- Files changed: added optional `projectSlug` to the note content model, tagged Juanyun notes with `juanyun-thermal-hardware`, and updated project pages to render matching notes.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Added project back-links on note detail pages.
- Files changed: updated `app/notes/[slug]/page.tsx` to show a related-project card when a note has `projectSlug`.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Split the DIY pressure-flow cooling prototype into its own project page.
- Files changed: added `content/projects/juanyun-diy-cooling-prototype.mdx`, reassigned its note and media entries to the new project slug, and updated the Juanyun source inventory.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Split the FOC driver board archive into its own project page.
- Files changed: added `content/projects/juanyun-foc-driver-board.mdx`, reassigned the FOC note to that project slug, and updated the Juanyun source inventory.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-06

- Summary: Split the actuator and quiet fan driver archive into its own project page.
- Files changed: added `content/projects/juanyun-actuator-fan-archive.mdx`, published selected solenoid-valve source files, ULN2003 schematic, and BLDC EDA project attachment, then reassigned the actuator archive note to the new project slug.
- Verification: `npm.cmd run lint` and `npm.cmd run build` passed.

## 2026-05-07

- Summary: Consolidated project pages into larger evidence archives on branch `project-archive-pages`.
- Files changed: removed the old portfolio rebuild, PID Starter Kit, ACUnit, BaseUnit, DHT, and actuator standalone project pages; merged ACUnit/BaseUnit/DHT/actuator material into `juanyun-thermal-hardware`; added `components/project-assets.tsx` with project `assetPaths`; added Claude Chime hardware public assets and project page; added Nanjing Turing logs / Markdown / Word-derived text evidence; updated footer copyright to `Awes0meE / 66CCFF Labs`; refreshed docs and memory.
- Verification: `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed. Production server smoke checks passed for `/work`, `/work/juanyun-thermal-hardware`, `/work/claude-chime-hardware-power-board`, and the old ACUnit redirect to `/work/juanyun-thermal-hardware`.

## 2026-05-07

- Summary: Ran `/neat` after the project-archive expansion to reconcile docs and remove stale branch / path wording.
- Files changed: updated `CODEX.md`, `MEMORY.md`, `README.md`, and `USER_GUIDE.md` so the current local path, unreleased branch state, release-tag wording, and `assetPaths` workflow match the code.
- Verification: content/project/media reference validation passed for 6 projects, 18 public notes, and current media items; `git diff --check`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-05-07

- Summary: Merged the project archive work into `main`, tagged release `v0.5.0`, pushed GitHub, and ran a release-state `/neat`.
- Files changed: updated `CODEX.md`, `MEMORY.md`, `README.md`, `docs/architecture.md`, `docs/juanyun-tech-source-inventory.md`, `package.json`, and `package-lock.json` so durable docs and package metadata describe `main` / `v0.5.0` instead of the temporary `project-archive-pages` branch.
- Verification: content/project/media reference validation passed for 6 projects, 18 public notes, and current media items; `git diff --check`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-05-07

- Summary: Fixed the GitHub Pages build failure caused by Jekyll parsing uploaded project Markdown as Liquid.
- Files changed: added root `.nojekyll`, documented the GitHub Pages/Vercel deployment boundary, and recorded the failure mode in project memory.
- Verification: `git diff --check`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-05-07

- Summary: Refreshed the media gallery and rewrote notes/projects into a more natural learning-log voice.
- Files changed: expanded `content/media.json` to cover project/note images and videos; updated `/media` cards to show source projects; changed Markdown/text project assets to render as readable page content while source files stay in code frames; added `content/notes/turing-three-week-development-log.mdx`; replaced the Juanyun hardware SOP note with the SOP text itself; rewrote Juanyun, Nanjing Turing, and Tianjin STM32 notes/projects away from AI handoff phrasing.
- Verification: upload-link validation passed for 25 content files; media coverage validation passed for 29 media items and 16 content image/video refs; `git diff --check`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed; local HTTP checks returned `200` for `/media`, `/notes/juanyun-hardware-sop`, `/notes/turing-three-week-development-log`, `/work/juanyun-thermal-hardware`, and `/work/nanjing-turing-qt-embedded-learning`.

## 2026-07-03

- Summary: Upgraded the repo-local `AddProject.skill` into the portfolio project-import SOP for future high-volume project and media ingestion.
- Files changed: updated `AddProject.skill`, `skills/add-project/SKILL.md`, `skills/add-project/agents/openai.yaml`, refreshed `source-audit.md` and `content-build.md`, added `intake-template.md`, `public-safety.md`, and `review-and-release.md`, and reconciled `CODEX.md`, `MEMORY.md`, and `docs/agent-skills.md`.
- Verification: `quick_validate.py skills/add-project`, `git diff --check`, `npm.cmd run lint`, and `npm.cmd run typecheck` passed.

## 2026-07-03

- Summary: Added the repo-local `engineering-note-writer` skill for drafting Chinese-first bilingual engineering notes from rough project bullets and evidence.
- Files changed: created `skills/engineering-note-writer/SKILL.md`, `agents/openai.yaml`, and references for voice rules, note archetypes, bilingual writing, and self-review; linked the skill from `AddProject.skill` and `skills/add-project/SKILL.md`; updated `MEMORY.md` and `docs/agent-skills.md`.
- Verification: `PYTHONUTF8=1 quick_validate.py skills/engineering-note-writer`, `quick_validate.py skills/add-project`, `git diff --check`, `npm.cmd run lint`, and `npm.cmd run typecheck` passed.

## 2026-07-04

- Summary: Hardened the repo-local project-import and engineering-note writing skills with mandatory hard-gated checklists.
- Files changed: added `skills/add-project/references/hard-gated-checklist.md` and `skills/engineering-note-writer/references/hard-gated-checklist.md`; linked them from both `SKILL.md` files, `AddProject.skill`, agent prompts, `CODEX.md`, `MEMORY.md`, and `docs/agent-skills.md`.
- Verification: `quick_validate.py skills/add-project`, `quick_validate.py skills/engineering-note-writer`, `git diff --check`, `npm.cmd run lint`, and `npm.cmd run typecheck` passed.

## 2026-07-04

- Summary: Imported the MEC104 Digital Clock source folder as a new public portfolio project.
- Files changed: added `content/projects/arduino-digital-clock-counter.mdx`, `content/notes/arduino-digital-clock-counter-course-note.mdx`, 8 `content/media.json` entries, and normalized public uploads under `public/uploads/projects/arduino-digital-clock-counter/`; updated `CODEX.md`, `MEMORY.md`, `README.md`, and `docs/architecture.md` content counts. The original `Digital Clock.pdf` course handout stayed reference-only; selected course screenshots were published with user approval.
- Verification: `git diff --check`, `npm.cmd run lint`, `npm.cmd run validate-content`, `npm.cmd run validate-encoding`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed. Local preview returned 200 for `/`, `/work`, `/media`, `/work/arduino-digital-clock-counter`, and `/notes/arduino-digital-clock-counter-course-note`; Playwright screenshots were reviewed for desktop and mobile project views.

## 2026-07-04

- Summary: Ran a whole-portfolio neat pass after the Digital Clock import.
- Files changed: reconciled README English/Chinese current-content wording, moved the homepage identity memory entry back into chronological order, and refreshed the verification baseline date in `MEMORY.md`.
- Verification: searched root/docs for stale 6-project / 19-note / 50-media wording and relative-time wording; `npm.cmd run validate-content` and `npm.cmd run validate-encoding` passed.

## 2026-07-04

- Summary: Revised the Digital Clock project page with selected homework-report content and removed the source description TXT from public project files.
- Files changed: added cropped report excerpt images for two-digit wiring, digit splitting, and switch logic; expanded `content/projects/arduino-digital-clock-counter.mdx`; added 3 media entries; removed the public project description TXT from `assetPaths` and `public/uploads`; updated content-state wording in docs.
- Verification: `git diff --check`, `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-07-04

- Summary: Investigated the failed GitHub Pages deployment and converted Pages into a redirect fallback instead of a second app deployment path.
- Files changed: pushed a dedicated `gh-pages` branch with only `index.html`, `404.html`, and `.nojekyll`; changed repository Pages source from `main:/` to `gh-pages:/`; documented the failure mode and future guardrails in `CODEX.md`, `MEMORY.md`, `README.md`, `USER_GUIDE.md`, `docs/architecture.md`, and `docs/environment-toolchain.md`.
- Verification: `gh api repos/Awes0meE/Awes0meE.github.io/pages --jq '{status,build_type,source,html_url,cname,https_enforced}'` reported `status: built`, `source.branch: gh-pages`, and `source.path: /`; `pages-build-deployment` run `28678418554` completed successfully on `gh-pages`; `https://awes0mee.github.io/` returned the redirect fallback HTML; `git diff --check`, `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-07-04

- Summary: Updated the Digital Clock project with the user's replacement cover, published the original homework report PDF, and rewrote the related course-note page with `engineering-note-writer`.
- Files changed: added `cover-wiring.jpg` / `cover-wiring-thumb.jpg` for the replacement cover while keeping the old cover paths as compatibility files; regenerated course screenshots from `Digital Clock.pdf` with the top-right XJTLU logo removed; added `digital-clock-homework-report.pdf`; updated the Digital Clock project page, related note, cover media caption, README, and durable memory.
- Verification: `npm.cmd run validate-content`, `npm.cmd run validate-encoding`, `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-07-04

- Summary: Fixed Vercel preview failures caused by the redirect-only `gh-pages` branch.
- Files changed: added root `vercel.json` with `git.deploymentEnabled.gh-pages = false`; updated `docs/environment-toolchain.md` and `MEMORY.md`; mirrored the same `vercel.json` into the `gh-pages` branch so future redirect updates do not trigger a Next.js preview build.
- Verification: GitHub statuses showed `main` Vercel deployment success at commit `10061ff`; failed previews were on `gh-pages` commits `159147e` and `79a9737`; Vercel CLI logs for `dpl_Ga5hESaXyDevREn4FpRZ4QL9uyHi` reported `Couldn't find any pages or app directory`; after the fix, `git diff --check`, `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed.

## 2026-07-05

- Summary: Imported `C:\Users\123\Desktop\Smart Car Project` as the `arduino-smart-car-line-tracker` portfolio project using `AddProject.skill` and `engineering-note-writer`.
- Files changed: added `content/projects/arduino-smart-car-line-tracker.mdx`, `content/notes/arduino-smart-car-line-tracking-learning-note.mdx`, 12 Smart Car media entries, normalized public uploads under `public/uploads/projects/arduino-smart-car-line-tracker/`, and refreshed current-content wording in `CODEX.md`, `MEMORY.md`, `README.md`, and `docs/architecture.md`. The original course tutorial PDF and `项目描述.txt` stayed reference-only; selected course screenshots were published with the school logo area removed; the user's replacement cover was converted into padded horizontal `cover-wide.jpg` so the full car remains visible in wide project cards.
- Verification: `git diff --check` on Smart Car paths, `npm.cmd run lint`, `npm.cmd run validate-content`, `npm.cmd run validate-encoding`, `npm.cmd run typecheck`, `npm.cmd run build`, and `npm.cmd audit --omit=dev` passed. Local preview returned 200 for `/`, `/work`, `/media`, `/work/arduino-smart-car-line-tracker`, and `/notes/arduino-smart-car-line-tracking-learning-note`; Playwright screenshots were reviewed for desktop, mobile, English project views, and the updated wide cover.

## 2026-07-05

- Summary: Refreshed `engineering-note-writer` discovery metadata and synchronized the new writing guardrails into project docs.
- Files changed: updated `skills/engineering-note-writer/SKILL.md`, its OpenAI agent prompt, writing references, `CODEX.md`, `docs/content-workflow.md`, `docs/agent-skills.md`, `MEMORY.md`, this session log, and the Digital Clock / Smart Car note summaries that still used `重新整理`-style openings.
- Verification: custom frontmatter CSO check passed after failing on the previous description; subagent pressure checks chose to load the full skill before drafting; archive-summary opening scan passed after failing on the previous skill and note summaries; `git diff --check`, `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build` passed.

## 2026-07-05

- Summary: Rewrote older project pages and related notes with `engineering-note-writer` to reduce AI-archive phrasing and bring the copy closer to practical engineering notes.
- Files changed: updated 6 older project pages and 15 related note pages covering Juanyun, Nanjing Turing, Tianjin STM32, Claude Chime, FOC, and DIY cooling; left the newly added Smart Car and Digital Clock project/note bodies unchanged; preserved the Nanjing Turing original uploaded notes and only rewrote the later `turing-three-week-development-log` note.
- Verification: target-file banned-phrase scan passed; `npm.cmd run validate-content`, `npm.cmd run validate-encoding`, `npm.cmd run lint`, `npm.cmd run typecheck`, `git diff --check`, and `npm.cmd run build` passed.
