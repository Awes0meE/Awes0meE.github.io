# Public Safety Reference

Use this before copying any user material into the repository, especially into `public/uploads/`.

## Core Rule

Anything committed under `public/uploads/` is public after deployment. Unlinked files are still public static assets.

## Publish Classes

Use these classes in audit summaries:

- `publish-media`: safe image/video for `/media` or inline project evidence.
- `publish-asset`: safe downloadable/previewable artifact for a project file browser.
- `publish-note`: self-authored text that should become a readable note.
- `reference-only`: useful for writing summaries but not copied into the repo.
- `exclude`: private, sensitive, noisy, duplicate, generated, or not worth publishing.
- `needs-user-confirmation`: ambiguous.

## Default Exclusions

Exclude unless explicitly approved and desensitized:

- credentials, tokens, API keys, Wi-Fi passwords, certificates;
- personal IDs, addresses, phone numbers, school proof, internship proof;
- invoices, reimbursement records, billing, payroll, bank/payment screenshots;
- contracts, internal requirements, customer/company private data;
- executable installers, downloaded toolchains, app installers;
- `node_modules`, vendor libraries, dependency folders;
- generated output: `build`, `dist`, `Debug`, `Release`, `.next`, `.pio`, cache/temp folders;
- complete firmware/source dumps for company current products;
- uncurated ZIP/RAR/7z archives of raw project folders.

## Usually Safe Candidates

Potentially safe after review:

- project photos, board renders, screenshots, short demo videos;
- self-authored README, Markdown/TXT notes, public-facing reports;
- small source snippets that show style without exposing private internals;
- schematics, Gerber, BOM/PnP, STEP, CAD/EDA only when the project is public-safe;
- public datasheets when they add context and are already vendor-public.

## Company And Third-Party Material

For company, internship, lab, team, or client work:

- Default to `reference-only` or `needs-user-confirmation` until reviewed.
- Prefer derived explanations, screenshots, and small desensitized snippets over raw packages.
- Remove names, phone numbers, emails, IDs, customer details, internal paths, and credentials.
- Avoid publishing complete source trees or manufacturing packages unless explicitly approved.

## Juanyun Rule

For Juanyun:

- `Current_Product_ACUnit_Project*` is sensitive by default.
- `Current_Product_BaseUnit_Project*` is sensitive by default.
- Do not publish raw Gerber archives, schematic PDFs, BOM/PnP, EDA/CAD source, full firmware, internal requirements, manufacturing packages, invoices, reimbursements, billing, credentials, installers, vendor folders, or build outputs from those folders.
- Non-Current_Product legacy material can publish selected evidence after pruning noisy/private files.
- `public/uploads/projects/juanyun-tech` is allowlisted by content validation. If raw files reappear there, move them out before building.

## Approval Gate

Stop and ask the user before copying when:

- source ownership is unclear;
- a file appears company-private;
- a file contains personal or financial/proof material;
- a whole folder dump is the only candidate;
- a filename itself leaks private context;
- you cannot explain why a file is safe to publish.

Use this wording:

```text
I found materials that may be private or company-sensitive. I will not copy them into public/uploads yet. Please confirm whether these specific categories can be published, should be summarized only, or should be excluded.
```
