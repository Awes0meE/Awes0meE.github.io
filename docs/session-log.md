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
