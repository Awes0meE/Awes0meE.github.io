# Add Project Hard-Gated Checklist

Use this as the live checklist for every portfolio import, update, media addition, cleanup, or release.

Rule: do not move past a gate until every required checkbox is true, explicitly not applicable, or blocked with a user question. A failed gate means stop, fix, or ask.

## Gate 0 - Repository And Context Loaded

- [ ] `git status --short --branch` has been inspected and unrelated dirty files are named.
- [ ] `CODEX.md`, `MEMORY.md`, `docs/content-workflow.md`, `docs/architecture.md`, and `docs/environment-toolchain.md` have been read as needed for the task.
- [ ] Juanyun-related work has checked `docs/juanyun-tech-source-inventory.md`.
- [ ] Node/npm availability is known, or the task is clearly docs-only.
- [ ] The current branch strategy is known: current branch, new import branch, or release branch.

## Gate 1 - Intake Is Safe Enough

- [ ] `source_path` is known for source-folder work, or the operation is an existing-repo edit.
- [ ] Operation type is clear: `new-project`, `update-project`, `media-only`, `note-only`, `cleanup`, or `release`.
- [ ] Target `project_slug` is known or a proposed slug is recorded.
- [ ] Project scope, date/status, and ownership context are understood enough to avoid false claims.
- [ ] Public/private boundary is clear enough to proceed. If not, stop after read-only audit.

## Gate 2 - Read-Only Audit Completed

- [ ] `references/source-audit.md` has been read.
- [ ] First pass over the source folder was read-only.
- [ ] File counts, extension groups, large files, and media candidates were inventoried.
- [ ] Notes/reports/source snippets/hardware files were identified without copying them.
- [ ] Risky folders and file types were listed.
- [ ] User questions are grouped under `needs-user-confirmation`.

## Gate 3 - Public Safety Decision Passed

- [ ] `references/public-safety.md` has been read.
- [ ] Every relevant material group is classified as `publish-media`, `publish-asset`, `publish-note`, `reference-only`, `exclude`, or `needs-user-confirmation`.
- [ ] No item marked `needs-user-confirmation` is copied into the repo.
- [ ] No private, financial, proof, credential, installer, vendor, generated-output, or raw folder dump enters `public/uploads/`.
- [ ] Company/internship/client/lab work uses derived public evidence unless explicit approval exists.
- [ ] Juanyun current-product raw packages remain out of public uploads.

## Gate 4 - Asset Import Passed

- [ ] Only public-safe files were copied.
- [ ] Public filenames are lowercase ASCII kebab-case unless preserving an extension/name is necessary.
- [ ] Oversized media was compressed or intentionally left as-is with a reason.
- [ ] Text-like uploads are UTF-8.
- [ ] `assetPaths` is explicit when a folder contains anything that should not appear in the public file browser.
- [ ] `npm.cmd run validate-content` and `npm.cmd run validate-encoding` pass after asset/content changes.

## Gate 5 - Content And Writing Passed

- [ ] `references/content-build.md` has been read.
- [ ] `skills/engineering-note-writer/SKILL.md` was used for new or rewritten project/note/media prose.
- [ ] Project frontmatter has accurate `title/titleZh`, `summary/summaryZh`, date, status, tags, cover, `featured`, links, and `assetPaths`.
- [ ] Notes have correct `visibility` and `projectSlug`.
- [ ] Media entries have unique IDs and valid `src`/`thumbnail` paths.
- [ ] Chinese and English content cover the same substantive points.
- [ ] Public page text does not expose private source paths or sensitive filenames.

## Gate 6 - Local Review Passed

- [ ] `npm.cmd run lint` passes.
- [ ] `npm.cmd run typecheck` passes.
- [ ] Preview or production build review covers `/`, `/work`, `/media`, `/work/<project-slug>`, and edited notes when applicable.
- [ ] Images, videos, file browser entries, bilingual text, and mobile layout were checked where relevant.
- [ ] Any local server/process conflict around `.next/` was resolved before preview/build.

## Gate 7 - Final Verification Passed

- [ ] `references/review-and-release.md` has been read.
- [ ] `git diff --check` passes.
- [ ] `npm.cmd run lint` passes.
- [ ] `npm.cmd run validate-content` passes.
- [ ] `npm.cmd run validate-encoding` passes.
- [ ] `npm.cmd run typecheck` passes.
- [ ] `npm.cmd run build` passes, unless the task is explicitly docs/skill-only and that reason is reported.
- [ ] `npm.cmd audit --omit=dev` passes or remaining advisories are reported exactly.

## Gate 8 - Git And Release Permission Passed

- [ ] Commit permission exists before committing.
- [ ] Push permission exists before pushing.
- [ ] Merge/tag/deploy permission exists before release actions.
- [ ] Commits are coherent Conventional Commits.
- [ ] Unrelated user changes are not staged.

## Gate 9 - Handoff And Memory Passed

- [ ] Handoff lists changed project pages, notes, media entries, and uploads.
- [ ] Excluded/private categories are summarized without leaking raw private inventories.
- [ ] Verification results are reported from fresh command output.
- [ ] Suggested commit messages are provided if changes remain uncommitted.
- [ ] `MEMORY.md` or `docs/session-log.md` are updated only for durable public-state or workflow changes.
