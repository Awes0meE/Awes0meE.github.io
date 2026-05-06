# Session Log

Append-only chronology for meaningful project milestones. Keep detailed current facts in `MEMORY.md`.

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
