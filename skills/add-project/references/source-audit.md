# Source Audit Reference

Use this before copying files from a user-provided local project path.

## Read-Only Inventory

Collect:

- root path, project name, apparent date range, owner/company context;
- folder tree summary, top-level directories, and approximate file counts;
- file groups by extension: images, videos, Markdown/TXT, Word/PDF, source code, EDA/CAD, firmware projects, archives, spreadsheets, generated/build output;
- likely cover candidates and visual proof;
- self-authored notes/logs/specs;
- public-safe evidence candidates;
- sensitive/noisy exclusions.

PowerShell examples:

```powershell
Get-ChildItem -LiteralPath "<source_path>" -Force | Select-Object Mode,Name,Length,LastWriteTime
Get-ChildItem -LiteralPath "<source_path>" -Recurse -File |
  Group-Object Extension | Sort-Object Count -Descending | Select-Object Count,Name
Get-ChildItem -LiteralPath "<source_path>" -Recurse -File -Include *.png,*.jpg,*.jpeg,*.webp,*.gif,*.mp4,*.mov,*.webm |
  Select-Object FullName,Length,LastWriteTime
```

Do not delete or move from the source folder.

## Public-Safe Heuristics

Usually good candidates:

- project photos, board renders, schematics already meant for display;
- demo videos and screenshots;
- self-authored Markdown/TXT notes;
- small source snippets that show implementation style without exposing private product internals;
- public datasheets only when they add context;
- selected Gerber/BOM/PnP/STEP/EDA files only when the project is explicitly public-safe.

Default exclusions:

- invoices, reimbursement, billing, payroll, contract, credential, proof, ID, private certificates;
- installers, executables, downloaded toolchains;
- `node_modules`, vendor libraries, STM32 HAL/CMSIS bundles unless specifically needed and approved;
- generated build output: `build`, `dist`, `Debug`, `Release`, `.next`, `.pio`, temporary caches;
- duplicate raw exports and uncurated whole-folder dumps;
- files with secrets, Wi-Fi credentials, tokens, customer/company private info;
- current-product company design packages unless explicitly approved.

Juanyun-specific:

- `Current_Product_ACUnit_Project*` and `Current_Product_BaseUnit_Project*` stay sensitive by default.
- Non-Current_Product legacy folders can publish selected reviewed evidence after pruning.
- `public/uploads/projects/juanyun-tech` has a strict allowlist enforced by `scripts/validate-content.mjs`.

## Subagent Brief Template

Use only when the user explicitly permits subagents in the current turn.

```text
You are auditing a local project folder for a portfolio import. Read-only task.
Source path: <path>
Do not edit files. Do not recommend publishing private/sensitive/noisy files.
Return:
1. candidate public media with reasons;
2. candidate text/note artifacts with reasons;
3. candidate project asset files with reasons;
4. exclusions and risk flags;
5. suggested project slug/title/tags if obvious.
Keep paths exact and concise.
```

## Output Shape

End the audit with:

```text
Project slug:
Project title / 中文标题:
Likely project status/date:
Candidate cover:
Public media:
Public project assets:
Potential notes:
Excluded categories:
Questions/blockers:
```
