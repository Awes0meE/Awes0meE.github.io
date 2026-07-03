# Source Audit Reference

Use this before copying anything from a user-provided source path. The first scan is read-only.

## Audit Commands

Run from the repository root. Use `-LiteralPath` for user paths.

```powershell
Get-ChildItem -LiteralPath "<source_path>" -Force |
  Select-Object Mode,Name,Length,LastWriteTime

Get-ChildItem -LiteralPath "<source_path>" -Recurse -File |
  Group-Object Extension |
  Sort-Object Count -Descending |
  Select-Object Count,Name

Get-ChildItem -LiteralPath "<source_path>" -Recurse -File |
  Sort-Object Length -Descending |
  Select-Object -First 30 FullName,Length,LastWriteTime

Get-ChildItem -LiteralPath "<source_path>" -Recurse -File -Include *.png,*.jpg,*.jpeg,*.webp,*.gif,*.mp4,*.mov,*.webm |
  Select-Object FullName,Length,LastWriteTime
```

If Chinese text displays strangely in PowerShell, re-read text with `Get-Content -Encoding UTF8` or inspect through Node.js `fs.readFileSync(path, "utf8")` before judging content.

## What To Inventory

Capture:

- root path, project name, apparent date range, and owner/company context;
- top-level directories and rough file counts;
- extension groups: images, videos, Markdown/TXT, Word/PDF, source code, EDA/CAD, firmware projects, archives, spreadsheets, generated/build output;
- likely cover candidates and visual proof;
- self-authored notes, reports, logs, README files, and specs;
- public-safe evidence candidates;
- sensitive/noisy exclusions;
- ambiguous items needing user approval.

## Folder Name Signals

Default private or risky:

```text
private
private-do-not-publish
secret
confidential
invoice
reimbursement
billing
contract
credential
proof
id
backup
raw
node_modules
vendor
Debug
Release
build
dist
.next
.pio
```

Potentially useful:

```text
images
screenshots
videos
docs
notes
reports
source-snippets
hardware-files
schematics
renders
demo
```

Folder names are signals, not proof. Inspect before deciding.

## Output Shape

End the audit with:

```text
Project slug:
Project title / 中文标题:
Likely project status/date:
Source path:
Scope summary:
Candidate cover:
Public media candidates:
Public project asset candidates:
Potential note/article candidates:
Reference-only materials:
Excluded categories:
Needs user confirmation:
Recommended next step:
```

Do not copy files until the public evidence set is accepted or the boundary is obvious and low-risk.

## Optional Subagent Brief

Use only when the user explicitly permits subagents.

```text
You are auditing a local project folder for a portfolio import. This is read-only.
Source path: <path>
Do not edit, move, copy, delete, or publish files.
Do not recommend publishing private/sensitive/noisy files.
Return exact paths and concise reasons:
1. candidate public media;
2. candidate note/article artifacts;
3. candidate project asset files;
4. exclusions and risk flags;
5. suggested slug/title/tags if obvious.
```
