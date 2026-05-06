# Session Log

Append-only chronology for meaningful project milestones. Keep detailed current facts in `MEMORY.md`.

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
