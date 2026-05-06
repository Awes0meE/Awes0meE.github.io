# MEMORY.md

Durable project memory for `F:\XJTLU\XJTLU_Portfolio`.

This file is for future AI sessions and long-running portfolio maintenance. It should stay concise, current, and edited rather than blindly appended.

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
- `2026-05-06`: Juanyun technical materials were expanded on branch `content/juanyun-tech` into 7 Juanyun project pages, 13 Juanyun notes, media entries, and a broad draft public asset set. That early draft later became too permissive for company work.
- `2026-05-06`: All `content/notes/*.mdx` files were rewritten toward the user's own learning-log voice, modeled after their Qt internship note style: process-first, reflective, mildly informal, with `前期想法 / 改变 / 疑问 / 阶段目标 / 证据 / 复盘` style sections where appropriate.

- `2026-05-06`: Branch `feature/note-visibility` was created from `main` to test note-level public/private visibility. Missing note visibility defaults to private. Juanyun notes are public on this branch, but website-accessible Juanyun assets are limited to approved screenshots/renders and one prototype demo video; Gerber, schematic, BOM/PnP, EDA/CAD, and source-code files are not served.
- `2026-05-06`: Public project and note writing direction shifted toward direct descriptive narration: fewer "我..." claims, more plain system/scope/evidence descriptions, and bilingual section support.

## Stable Decisions

- Use `CODEX.md` as the primary project-agent guide. `AGENTS.md` points to it for compatibility.
- Keep `AGENTS.md` focused on cross-device bootstrap and short agent entry instructions.
- Use `MEMORY.md` as the current durable memory index, with `docs/session-log.md` as append-only chronology.
- Keep content Git-friendly: projects and notes live in `content/**/*.mdx`; media metadata lives in `content/media.json`; assets live under `public/uploads/`.
- Use optional `projectSlug` on notes and media to connect project pages, related notes, related media, and note back-links.
- Use `visibility: public` or `visibility: private` on every note. Treat missing `visibility` as private so draft notes do not accidentally publish.
- Write notes with the user's practical self-study / internship-log texture, but public pages should prefer direct descriptive narration over repetitive first-person "我..." claims.
- Do not introduce a database or CMS until file-based content becomes a real bottleneck.
- Public files under `public/uploads/` are not private. Do not place company Gerber, schematic, BOM, PnP, EDA/CAD source, full firmware source, invoice, reimbursement, billing, credential, installer, vendor, or build-output files there.
- Preserve `legacy/hexo-export/` as historical reference. Do not serve it as the live website.
- Use Vercel for deployment and Cloudflare for DNS management.

## Site Identity

- Brand/domain: `66ccff Labs` can be used as a lab-style wrapper, but the personal portfolio identity remains `Awes0meE / Li Zhiyi`.
- Visual tone: engineering academic, precise, bilingual, clean, evidence-driven.
- Avoid returning to generic template-blog styling.

## Important Files

- `app/page.tsx`: homepage layout and major public-facing sections.
- `lib/content.ts`: content loaders and typed content models.
- `lib/site.ts`: site constants and navigation labels.
- `content/projects/`: project case-study source files.
- `content/notes/`: learning note source files.
- `content/media.json`: gallery metadata.
- `public/uploads/`: images, videos, and downloadable assets.
- `docs/content-workflow.md`: how to add and maintain portfolio content.
- `docs/juanyun-tech-source-inventory.md`: mapping from the raw Juanyun source folder to public portfolio content and excluded private material.

## Verification Baseline

Known-good checks as of `2026-05-06` on Windows PowerShell:

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

- Keep checking that company-sensitive Juanyun files are not restored under `public/uploads/`; notes and safe screenshots can be public, but raw board/manufacturing/source files should not be website-accessible.
- If older Git history privacy matters, decide whether to rewrite Git history or move the repository private, because previously committed Juanyun attachments may remain in commit history even after they are removed from the served website.
- Add real project photos, screenshots, videos, and diagrams for projects that still use placeholder SVG visuals.
- Fill `PID Starter Kit` with concrete modules, firmware/tool screenshots, test data, and links.
- Fill `SAT301 Graduation Thesis` with abstract, architecture, experiments, figures, and thesis evidence.
- Improve `About` with real biography, skills, education, and contact details.
- Decide how `66ccff Labs` should appear in the visual identity without diluting the personal portfolio.

## Memory Update Rules

- Update this file when durable facts change.
- Move detailed chronology into `docs/session-log.md`.
- Do not store secrets, private tokens, or sensitive personal information.
- Use absolute dates.
- Replace stale facts instead of adding contradictory entries.
