---
name: add-project
description: Import a new real project, note set, and media set into this XJTLU Portfolio from a user-provided local folder path. Use when the user asks Codex to add/deploy a new portfolio project, scan local project files, curate public evidence, copy media/assets into public/uploads, create bilingual project and note MDX pages, update content/media.json, run review/verification, push each milestone branch commit to GitHub, and run /neat-style documentation/memory cleanup.
---

# Add Project

## Goal

Turn one local source folder into a polished portfolio addition: public-safe assets, media gallery entries, bilingual notes, one project archive page, internal links, review fixes, verification, pushed Git milestones, and updated handoff docs.

Use the repository docs as the source of truth:

- `CODEX.md`
- `MEMORY.md`
- `docs/content-workflow.md`
- `docs/architecture.md`
- `docs/environment-toolchain.md`
- `docs/juanyun-tech-source-inventory.md` when the source path is Juanyun-related

For detailed checklists, load:

- `references/source-audit.md` before scanning the local folder
- `references/content-build.md` before creating assets, notes, media, and project pages

## Inputs

Require or infer:

- `source_path`: absolute local folder path from the user.
- `project_slug`: kebab-case public slug. If absent, derive from folder/project name and confirm only if ambiguous.
- `project_scope`: what the project is, who it is for, and whether company-sensitive material is involved.
- `release_target`: branch-only by default; merge/tag only when the user explicitly asks.

If the path is missing, ask for it. If public/private boundary is unclear, pause and ask a concise safety question.

## Workflow

### 1. Bootstrap And Branch

1. Check repo state:
   - `git status --short --branch`
   - `git remote -v`
   - `node --version`
   - `npm.cmd --version`
2. Read the docs listed in Goal.
3. Require a clean worktree before starting. If dirty, identify whether changes are yours; do not overwrite user work.
4. Start from current `main` unless the user requested a different base:
   - `git fetch origin`
   - `git switch main`
   - `git pull --ff-only origin main`
   - `git switch -c content/add-<project-slug>`
   - `git push -u origin HEAD`

Use Windows PowerShell-compatible commands. Do not rely on `&&` or `[System.IO.Path]::GetRelativePath`.

### 2. Audit The Local Source Folder

Scan read-only first. Do not copy, delete, or publish during the first pass.

If the user explicitly allows subagents in the current request, spawn bounded read-only subagents:

- source inventory: folder structure, file types, candidate evidence, exclusions;
- media curator: images/videos, cover candidates, cropping/compression notes;
- text/note curator: `.md`, `.txt`, `.docx`, PDF text candidates, possible note pages;
- code/archive curator: source snippets, CAD/EDA/manufacturing files, binaries for project `assetPaths`.

Tell subagents they are not alone in the codebase, should not edit files unless explicitly assigned, and must not recommend publishing sensitive files. Keep their outputs concrete: paths, proposed public filenames, reasons, and risk flags.

Locally verify the critical findings. Treat anything under `public/uploads/` as public, even if no page links it.

### 3. Decide The Public Evidence Set

Classify files into:

- publish as media: images/videos useful on `/media`;
- publish as project assets: PDFs, source snippets, small text, CAD/EDA/fabrication archives, docs;
- publish as notes: self-authored `.md` / `.txt` / reliable document text that should be readable as an article;
- exclude: private, noisy, duplicate, generated, vendor/dependency, installer, build output, financial/proof/credential/billing files.

For unknown company material, default to private until the user explicitly approves. For Juanyun, `Current_Product_ACUnit_Project*` and `Current_Product_BaseUnit_Project*` remain sensitive by default.

### 4. Copy And Normalize Assets

Create:

```text
public/uploads/projects/<project-slug>/
```

Normalize filenames to lowercase ASCII kebab-case with stable extensions. Keep a mapping from original path to public path in working notes, but do not commit sensitive raw inventories.

Use UTF-8 for text-like uploads. Convert before committing; never add runtime GBK/UTF-16 fallbacks to hide bad files. For images, crop/compress when needed so pages stay fast and covers look intentional.

After assets are copied:

```powershell
npm.cmd run validate-content
npm.cmd run validate-encoding
git add public/uploads content/media.json
git commit -m "Import <project-slug> public assets"
git push
```

Skip the commit only if no asset/media files were added in that phase.

### 5. Create Notes

Create one or more files under:

```text
content/notes/<project-slug>-<topic>.mdx
```

Rules:

- Use `visibility: public` only for publishable notes.
- Set `projectSlug: "<project-slug>"`.
- If the user wrote original `.md` / `.txt` material, render the original wording as article content rather than reducing it to a summary.
- Add accurate English content matching the Chinese content and format.
- Use the current writing style: plain learning-log texture, concrete file/debugging traces, less formal delivery-report phrasing.
- Avoid phrases like `这次只公开`, `功能改动没有故意扩大`, `公开证据边界`, and repetitive `我负责/我参与` lists.
- Use consecutive Markdown image lines for related image galleries.
- Link project assets and related notes internally.

After notes:

```powershell
npm.cmd run lint
git add content/notes public/uploads content/media.json
git commit -m "Add <project-slug> notes"
git push
```

### 6. Create The Project Page

Create:

```text
content/projects/<project-slug>.mdx
```

Include:

- strong `title/titleZh`, `summary/summaryZh`, `date`, `status`, `tags`, `cover`, `featured`;
- `links` when real links exist;
- `assetPaths` pointing to explicit files or a curated project folder;
- body sections that explain background, what was built, important decisions, evidence, notes, current limitations, and next steps;
- bilingual body coverage when the page has substantial article content.

The project detail route will automatically show related notes above public project files and related media below.

After project page:

```powershell
npm.cmd run lint
npm.cmd run typecheck
git add content/projects content/notes content/media.json public/uploads
git commit -m "Add <project-slug> project page"
git push
```

### 7. Review, Polish, And Verify

Do a code-review pass focused on bugs and future footguns:

- broken upload paths and wrong `projectSlug`;
- Chinese/English mismatch;
- huge media files, duplicate media entries, weak covers;
- leaked sensitive filenames or private evidence;
- invalid UTF-8, mojibake, accidental GBK/UTF-16;
- asset browser behavior for Markdown relative links, code previews, PDF fallback, and binary downloads;
- responsive layout, text overflow, image galleries, and media page source labels.

Run:

```powershell
git diff --check
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
npm.cmd audit --omit=dev
```

Use local preview and screenshots for visual changes:

```powershell
npm.cmd run dev -- -H 127.0.0.1 -p 3000
```

Stop the server and delete temporary screenshots/logs before committing.

Commit and push review fixes:

```powershell
git add -A
git commit -m "Review <project-slug> portfolio import"
git push
```

### 8. Neat Cleanup

Run the repo-local `/neat` discipline:

- update `MEMORY.md` with durable facts;
- append `docs/session-log.md`;
- update `README.md`, `USER_GUIDE.md`, `docs/architecture.md`, `docs/content-workflow.md`, or source inventories only when the new project changes durable public state or workflow;
- do not add raw sensitive inventories to public docs;
- use absolute dates.

Verify again after docs:

```powershell
git diff --check
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

Commit and push:

```powershell
git add -A
git commit -m "Neaten <project-slug> import docs"
git push
```

### 9. Handoff Or Release

By default, stop on the pushed content branch and report:

- branch name and latest commit;
- files added/changed;
- public assets copied;
- notes/project/media created;
- excluded sensitive/noisy categories;
- verification results;
- remaining open questions.

Only merge to `main`, tag, or deploy when the user explicitly asks. For release:

```powershell
git switch main
git pull --ff-only origin main
git merge --no-ff content/add-<project-slug> -m "Merge <project-slug> portfolio content"
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
git tag -a vX.Y.Z -m "vX.Y.Z <project-slug> portfolio content"
git push origin main
git push origin vX.Y.Z
```

## Non-Negotiables

- Never publish private files because they are merely unlinked.
- Never trust `visibility: private` or `.gitignore` as secrecy for anything committed or under `public/uploads/`.
- Never rewrite or delete unrelated user work.
- Never use PowerShell inline Chinese here-string pipes for content generation.
- Always use `apply_patch` for manual repo edits.
- Always push each meaningful milestone commit to GitHub when following this skill.
