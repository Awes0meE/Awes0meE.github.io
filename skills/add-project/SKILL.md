---
name: add-project
description: Import, update, review, publish, or release a project in the XJTLU Portfolio from a user-provided local source folder. Use when the user asks to add a new portfolio project, add media/assets, revise an existing project or note from local materials, scan a project folder, curate public-safe evidence, create bilingual project/notes/media content, update public/uploads, preview the website, verify, commit, push, merge to main, or deploy the portfolio content to the live site.
---

# Add Project

This is the portfolio import SOP for `Awes0meE / Li Zhiyi`'s Next.js portfolio.

Goal: turn a user-provided local folder of raw project material into public-safe website content: curated uploads, media entries, bilingual project pages, related notes, verification, review, Git milestones, and optional release to `main` / Vercel.

## Required Project Context

Before substantial work, read:

- `CODEX.md`
- `MEMORY.md`
- `docs/content-workflow.md`
- `docs/architecture.md`
- `docs/environment-toolchain.md`
- `docs/juanyun-tech-source-inventory.md` when the source or target content is Juanyun-related

Use these bundled references as needed:

- `references/hard-gated-checklist.md`: read first and keep open as the mandatory phase gate checklist.
- `references/intake-template.md`: read when the source path, scope, or user intent is incomplete.
- `references/source-audit.md`: read before scanning any local source folder.
- `references/public-safety.md`: read before deciding what can enter `public/uploads/`.
- `references/content-build.md`: read before creating or editing project, note, media, or asset files.
- `references/review-and-release.md`: read before final verification, commit, push, merge, or release.

When writing or rewriting project prose, note bodies, summaries, or media captions from user bullet points, also use the repo-local `engineering-note-writer` skill at `skills/engineering-note-writer/SKILL.md`.

## Hard-Gated Execution

Before acting, read `references/hard-gated-checklist.md` and keep it as the live phase checklist.

Rules:

- Do not copy or publish anything before the read-only audit and public-safety gates pass.
- Do not write project/note prose before the writing gate confirms `engineering-note-writer` has been used.
- Do not claim the import is done before verification commands have fresh passing output.
- Do not commit, push, merge, tag, or release without the corresponding user approval gate.
- If any gate is unclear, stop at that gate, report the blocker, and ask the smallest necessary question.

## Inputs To Establish

Require or infer:

- `source_path`: absolute path containing the raw project materials.
- `operation`: new project, update existing project, media-only import, note-only import, cleanup/removal, or release.
- `project_slug`: existing or proposed kebab-case slug.
- `project_scope`: what the project is, when it happened, whether it is personal/course/internship/company work, and what the user wants to show.
- `public_boundary`: what is allowed to publish, what is private, and what needs user confirmation.
- `release_target`: branch preview by default; merge/push/deploy only after explicit user approval.

If `source_path` is missing, ask for it. If public/private boundary is unclear, stop after read-only audit and ask a concise safety question.

## Non-Negotiables

- Treat `public/uploads/` as public internet, even for unlinked files.
- Never publish files from `private-do-not-publish`, `private`, `secret`, `confidential`, `invoice`, `reimbursement`, `billing`, `credential`, `proof`, `contract`, or similar folders without explicit user approval.
- Never publish credentials, tokens, personal IDs, financial/proof documents, executables, installers, vendor/dependency folders, generated build output, or unreviewed whole-folder dumps.
- For Juanyun, keep `Current_Product_ACUnit_Project*` and `Current_Product_BaseUnit_Project*` sensitive by default. Non-Current_Product legacy material can publish selected reviewed evidence only after pruning.
- The first pass over a user source folder must be read-only. Do not copy, move, delete, rename, or publish during the first scan.
- Do not rely on `visibility: private`, `.gitignore`, or "not linked from a page" as secrecy.
- Preserve unrelated user work. If the worktree is dirty, identify the changes and do not overwrite them.
- Use `apply_patch` for manual text edits. Do not pipe Chinese here-strings through PowerShell into interpreters.
- Use Windows PowerShell-compatible commands: prefer `npm.cmd`; avoid `&&`; avoid APIs that may not exist in PowerShell 5.1.

## SOP

### 1. Bootstrap The Repository

Run and inspect:

```powershell
git status --short --branch
git remote -v
node --version
npm.cmd --version
where.exe node
where.exe npm.cmd
```

If `node_modules/` is missing or stale, run:

```powershell
npm.cmd install
```

If there are unrelated changes, keep them out of this import. Ask only if they block the work.

### 2. Clarify Intake

Use `references/intake-template.md` to gather missing context. At minimum, know:

- source folder path;
- project name/title candidates;
- time range and status;
- target operation;
- whether company-sensitive material is involved;
- what the user definitely does not want public.

If the source folder includes a `00-项目说明.md`, README, report, or user notes, read them early.

### 3. Branch For The Import

For a new project or substantial update, work on a branch:

```powershell
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c content/add-<project-slug>
```

If the task is a tiny docs/media fix and the user explicitly wants to stay on the current branch, document that assumption. Do not switch branches over uncommitted user work.

### 4. Audit Source Folder Read-Only

Read `references/source-audit.md`, then scan the source path without modifying it.

Produce an audit summary with:

- source path and apparent project scope;
- file counts and extension groups;
- candidate covers, images, and videos;
- candidate documents, notes, reports, and code snippets;
- candidate project assets such as PDFs, CAD/EDA/fabrication files;
- risky/private/noisy exclusions;
- questions needing user decision.

If subagents are available and the user explicitly allows them, dispatch bounded read-only agents for media, text/note, and code/archive review. Locally verify critical findings yourself.

### 5. Decide Public Evidence

Read `references/public-safety.md`. Classify every relevant material group as:

- `publish-media`: image/video for `/media`;
- `publish-asset`: downloadable or previewable project evidence;
- `publish-note`: self-authored text that should become a readable note page;
- `reference-only`: useful for writing but not copied to the repo;
- `exclude`: private, sensitive, generated, duplicate, noisy, or not worth publishing;
- `needs-user-confirmation`: unclear boundary.

Stop before copying files if any important item is `needs-user-confirmation`.

### 6. Import And Normalize Assets

Read `references/content-build.md`.

Create or reuse:

```text
public/uploads/projects/<project-slug>/
```

Rules:

- Normalize public filenames to lowercase ASCII kebab-case.
- Prefer `cover.jpg`, `demo.mp4`, `board-front.jpg`, `schematic-page-1.jpg`, etc.
- Convert text-like uploads to UTF-8 before committing.
- Compress/crop oversized images and videos when needed for page performance.
- Prefer explicit `assetPaths` file lists when a folder contains anything not meant for display.
- Keep any sensitive source-to-public mapping in working notes only; do not commit raw sensitive inventories.

After asset import, run:

```powershell
npm.cmd run validate-content
npm.cmd run validate-encoding
```

### 7. Build Portfolio Content

Depending on operation, create or edit:

```text
content/projects/<project-slug>.mdx
content/notes/<project-slug>-<topic>.mdx
content/media.json
```

For writing, first use `skills/engineering-note-writer/SKILL.md` to turn rough user bullet points and evidence into Chinese-first engineering notes with accurate English counterparts.

Project pages must include accurate `title/titleZh`, `summary/summaryZh`, date, status, tags, cover, `featured`, links when real, `assetPaths` when useful, and bilingual body coverage for substantial content.

Notes should preserve the user's practical learning-log tone: concrete files, symptoms, decisions, evidence, and reflection. Use `visibility: public` only for publishable notes and set `projectSlug` so related notes appear on project pages.

Media entries need unique IDs, valid `src`/`thumbnail`, bilingual captions where useful, and `projectSlug` when tied to a project.

### 8. Local Review

Run:

```powershell
npm.cmd run lint
npm.cmd run typecheck
```

Start preview only when no conflicting build/start process is using `.next/`:

```powershell
npm.cmd run dev -- -H 127.0.0.1 -p 3000
```

Review:

- `/`
- `/work`
- `/media`
- `/work/<project-slug>`
- every new or edited `/notes/<note-slug>`

Check desktop and mobile widths for text overflow, broken images, duplicate media, wrong language behavior, and accidental private filenames in public views.

### 9. Full Verification

Read `references/review-and-release.md`, then run:

```powershell
git diff --check
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
npm.cmd audit --omit=dev
```

Do not claim the import is complete unless these checks have been run and their output has been read. If any check fails, fix or report the exact blocker.

### 10. Commit And Push Milestones

Commit coherent milestones with Conventional Commits. Examples:

```text
feat(content): import <project-slug> public assets
feat(content): add <project-slug> notes
feat(content): add <project-slug> project page
fix(content): polish <project-slug> media metadata
docs(content): document <project-slug> import handoff
```

Push the branch when the user has granted push permission:

```powershell
git push -u origin HEAD
```

If the user has not granted commit/push permission, leave changes uncommitted and report the suggested commit messages.

### 11. Handoff Or Publish

Default stopping point: pushed content branch and local preview verified.

Report:

- branch name and changed files;
- project page, notes, media entries, and public uploads created/updated;
- excluded or quarantined sensitive categories;
- verification results;
- preview URL;
- questions or remaining polish.

Only merge to `main`, tag, or rely on Vercel deployment after explicit user approval. For release, follow `references/review-and-release.md`.

### 12. Memory And Docs Cleanup

At durable milestones, update:

- `MEMORY.md`
- `docs/session-log.md`
- `README.md`, `USER_GUIDE.md`, `docs/architecture.md`, or `docs/content-workflow.md` only when public state or workflow actually changed

Use absolute dates. Do not publish raw sensitive source inventories in docs.
