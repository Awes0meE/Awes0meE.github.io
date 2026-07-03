# Review And Release Reference

Use this before final handoff, commit, push, merge, tag, or live release.

## Local Verification

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

Expected:

- diff check has no whitespace errors;
- lint passes;
- content validation reports expected project/note/media counts;
- encoding validation passes;
- typecheck passes;
- production build succeeds;
- production audit reports `0 vulnerabilities` or the exact remaining advisory is reported.

## Preview Review

Start dev server only when no conflicting `dev`, `build`, or `start` process is writing `.next/`:

```powershell
npm.cmd run dev -- -H 127.0.0.1 -p 3000
```

Review:

```text
http://127.0.0.1:3000/
http://127.0.0.1:3000/work
http://127.0.0.1:3000/media
http://127.0.0.1:3000/work/<project-slug>
http://127.0.0.1:3000/notes/<note-slug>
```

Check:

- homepage featured state is intentional;
- project title, summary, date, status, and tags are correct;
- Chinese/English toggle does not hide important content;
- media thumbnails and videos load;
- project file browser does not expose private filenames;
- Markdown/text/PDF/code previews work where expected;
- mobile widths do not overflow;
- no duplicate media entries or broken upload paths.

## Commit Milestones

Use Conventional Commits. Keep commits coherent:

```text
feat(content): import <project-slug> public assets
feat(content): add <project-slug> notes
feat(content): add <project-slug> project page
fix(content): polish <project-slug> media metadata
docs(content): document <project-slug> import handoff
```

If commit permission is missing, do not commit. Report suggested commit messages.

## Push And Branch Handoff

For branch preview:

```powershell
git push -u origin HEAD
```

Handoff should include:

```text
Branch:
Latest commit:
Project page:
Notes:
Media entries:
Public uploads:
Excluded/private categories:
Verification:
Preview URL:
Open questions:
```

## Main Release

Only after explicit user approval:

```powershell
git switch main
git pull --ff-only origin main
git merge --no-ff content/add-<project-slug> -m "Merge <project-slug> portfolio content"
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
git push origin main
```

Vercel should redeploy from `main`.

## Version Tag

Tag only when the user asks for a release tag:

```powershell
git tag -a vX.Y.Z -m "vX.Y.Z <project-slug> portfolio content"
git push origin vX.Y.Z
```

## Post-Release Check

After Vercel deploys, review the production URL if requested:

```text
https://www.66ccff-labs.com/work/<project-slug>
https://www.66ccff-labs.com/media
```

If live deployment differs from local build, inspect Vercel logs and report the exact failure.

## Memory Cleanup

Update durable docs only for durable facts:

- `MEMORY.md`: stable content/release facts and decisions.
- `docs/session-log.md`: concise chronology.
- `README.md` / `USER_GUIDE.md`: human-facing changes.
- `docs/architecture.md` / `docs/content-workflow.md`: workflow, schema, route, or architecture changes.

Do not document raw private file inventories.
