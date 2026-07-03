# Environment And Toolchain

This page is the portable setup checklist for a new computer, a WPS-cloud-synced copy, or a fresh Codex session.

## Baseline

- OS: Windows is the primary local development environment; PowerShell is the default shell.
- Git: any current Git for Windows release is fine. This machine is verified with `git version 2.53.0.windows.2`.
- Node.js: use Node.js 22 LTS or newer. This machine is verified with `v24.15.0`.
- npm: use npm 10 or newer. This machine is verified with `11.12.1`.
- Package manager: npm only. Do not introduce pnpm, yarn, Bun, or lockfiles for those tools.
- Deployment: Vercel builds the Next.js app; Cloudflare only manages DNS.
- GitHub Pages: redirect fallback only. Keep repository Pages source on `gh-pages:/`, not `main:/`.

The repo includes `.nvmrc` with `22` as the portable baseline, and `package.json` declares `engines` for Node/npm.

## First Machine Check

Run these commands from the repository root:

```powershell
git status --short --branch
git remote -v
node --version
npm.cmd --version
where.exe node
where.exe npm.cmd
```

Use `npm.cmd` in PowerShell. On many Windows machines, `npm` resolves to `npm.ps1`, and PowerShell execution policy can block it even when Node.js is installed correctly.

This repo is often maintained from Windows PowerShell rather than PowerShell 7. Avoid shell syntax and .NET APIs that only work in newer environments: use separate commands instead of `&&`, and do not assume `[System.IO.Path]::GetRelativePath` exists for safety-critical file moves. For file quarantines or public-folder cleanup, use `$ErrorActionPreference = 'Stop'`, verify source/target roots, copy with hash checks, then remove originals only after the copy is confirmed.

If Node.js is installed but the current shell cannot find it, restart PowerShell or temporarily refresh PATH:

```powershell
$env:Path='C:\Program Files\nodejs;' + $env:Path
```

## Restoring A WPS-Synced Folder Without `.git`

If a synced workspace has files but no `.git/` folder, prefer a clean clone:

```powershell
git clone https://github.com/Awes0meE/Awes0meE.github.io.git D:\XJTLU\XJTLU_Portfolio
cd D:\XJTLU\XJTLU_Portfolio
```

If the synced folder contains local files that must be preserved, clone to a separate folder first, then compare or copy the needed files manually. Do not blindly run destructive Git commands over an unknown synced directory.

## Install And Verify

Use this sequence after cloning or after a large dependency/content change:

```powershell
npm.cmd install
npm.cmd run lint
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
npm.cmd audit --omit=dev
```

`npm.cmd run lint` already runs `scripts/validate-content.mjs` and `scripts/validate-encoding.mjs`, but `npm.cmd run validate-content` and `npm.cmd run validate-encoding` are also available when you want one check alone.

## Local Preview

Development server:

```powershell
npm.cmd run dev -- -H 127.0.0.1 -p 3000
```

Production smoke test after `npm.cmd run build`:

```powershell
npm.cmd run start -- -H 127.0.0.1 -p 3000
```

Do not run `dev`, `build`, and `start` against `.next/` at the same time. If port 3000 or the `.next/` cache gets stuck, stop the local Next.js process before rebuilding:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
```

If a route fails with `Cannot find module './vendor-chunks/esprima.js'`, stop the project Node processes, delete `.next/`, then rebuild or restart the dev server. That error is a local cache failure, not automatically a content bug.

## Visual Review Tools

For screenshot checks, use Playwright through `npx.cmd` so no repo dependency is added:

```powershell
npx.cmd playwright install chromium
npx.cmd playwright screenshot --wait-for-timeout=3000 --viewport-size=1440,1200 http://127.0.0.1:3000/media temp-media.png
```

Delete temporary screenshots and helper scripts before committing.

## Encoding Rules

- Keep source, content, docs, and public-upload text files in UTF-8. Do not mix UTF-8, GBK, and UTF-16 inside the repo.
- Convert legacy `.txt`, `.md`, `.csv`, source, XML, and HTML exports to UTF-8 before placing them under `content/` or `public/uploads/`.
- `npm.cmd run validate-encoding` checks Git-managed text-like files for valid UTF-8, null bytes, replacement characters, and common mojibake snippets. It intentionally follows Git's tracked/non-ignored file list so WPS-synced private folders excluded through `.git/info/exclude` do not block normal checks.
- Prefer `apply_patch` for Chinese text edits.
- Do not pipe inline Chinese here-strings from PowerShell into Node/Python/other interpreters.
- If batch generation is unavoidable, write a temporary UTF-8 script/file first, then verify the result with `node` and `fs.readFileSync(path, "utf8")`.
- Scan changed content for `\uFFFD` and repeated question-mark mojibake before committing.

## Vercel Settings

- Framework preset: Next.js.
- Install command: `npm install`.
- Build command: `npm run build`.
- Output directory: default.
- Node.js: use the repository `engines` baseline or Vercel's current Node LTS.

Keep root `.nojekyll` committed. The live deployment is Vercel, but this repository name can trigger GitHub Pages, and `.nojekyll` prevents Jekyll/Liquid from parsing uploaded Markdown and code evidence under `public/uploads/`.

## GitHub Pages Fallback Guardrail

`Awes0meE.github.io` is a GitHub username repository, so GitHub Pages may remain enabled even though the real site is deployed by Vercel. GitHub may reject direct Pages deactivation with HTTP 422. Treat Pages as a compatibility redirect only.

Expected configuration:

- Canonical site: `https://www.66ccff-labs.com/`
- Vercel deployment: `https://awes0mee-portfolio.vercel.app/`
- GitHub Pages source: `gh-pages` branch, `/` path.
- `gh-pages` branch contents: only `index.html`, `404.html`, and `.nojekyll`, redirecting to the canonical site.
- `main` branch contents: full Next.js source. Do not set Pages source to `main:/`.

Check the Pages configuration with:

```powershell
gh api repos/Awes0meE/Awes0meE.github.io/pages --jq '{status,build_type,source,html_url,cname,https_enforced}'
```

If the local `gh-pages` branch is missing on a fresh clone, restore it from the remote first:

```powershell
git fetch origin gh-pages:gh-pages
```

If GitHub Pages drifts back to `main:/`, fix it from the repository root:

```powershell
git push origin gh-pages
gh api -X PUT repos/Awes0meE/Awes0meE.github.io/pages -f "source[branch]=gh-pages" -f "source[path]=/"
```

Do not upload `path: .` from `main` as a Pages artifact. That publishes the raw Next.js source tree and can also make Jekyll/Liquid parse public Markdown/code evidence.

When editing the `gh-pages` branch from Windows PowerShell, prefer a temporary worktree or a temporary `GIT_INDEX_FILE` with `git update-index`. Do not pipe PowerShell-generated tree text directly into `git mktree`; CRLF handling can accidentally create paths such as `index.html\r` instead of `index.html`.
