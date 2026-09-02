# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-09-02
**Copy-rewrite active branch:** `docs/rewrite-claude-chime-project-page`
**Current project:** `Claude Chime Power Board` project page only
**Last completed project:** `Claude Chime 电池冷启动排查`
**State:** `c1155c5b8d2f2ccc904661f92d177961082db203` was the incoming remote checkpoint, three commits ahead of `main`; the user approved the verified `/neat` reconciliation for publication to this topic branch on 2026-09-02, but the branch has not been merged or released

## Working Contract

- Handle substantive portfolio rewrites one project family at a time.
- Start each new family from a clean, synchronized `main` on a semantic topic
  branch.
- Inspect the available evidence before drafting. Reuse a user-confirmed brief
  for the same project and scope or run a `grill-me` interview.
- Research current reliable knowledge only after shared understanding is
  confirmed. Use external sources for present-day interpretation, never for
  invented project history, actions, results, or measurements.
- Draft Chinese through the user's cognition trail with the repository-local
  `skills/engineering-note-writer/SKILL.md`, then adapt English with equivalent
  facts and uncertainty.
- Compose Chinese from the confirmed brief and evidence, derive English from
  the Chinese, then run the L1-5 calque and pair-divergence check.
- Require the Truth gate, Li Zhiyi gate, bilingual gate, editorial-conservation
  gate, and scoped reader-prose L1-1 through L1-5 gates before review.
- Preserve user-controlled covers and demonstration media unless the user
  explicitly requests or approves a visual change.
- Merge only after the user reviews the bilingual copy and explicitly approves
  publication.

## Completed Claude Chime Note Checkpoint

- The public note is
  `content/notes/claude-chime-cold-start-battery-protection.mdx`, titled
  `Claude Chime Battery Cold-Start Debugging` / `Claude Chime 电池冷启动排查`.
- The user explicitly reopened this one note and approved a complete bilingual
  rewrite of its titles, summaries, section structure, cognition route,
  paragraph boundaries, and body. The Claude Chime project page, cover, media,
  public artifacts, and technical frontmatter were unchanged.
- The fused repository-local writer used for the rewrite was already part of
  `main` through pull request #31 and commit `0ceb784`; pull request #32 did not
  manufacture another skill change.
- Treat the observed `4.03 V` to `1.49–1.57 V` collapse as a measurement at the
  protected-pack output, not a demonstrated cell-voltage collapse. The
  `3.8 V / 50 mA` supply test and `5.12 V / 5.08 V` unloaded outputs make a
  persistent hard short less likely, but the two output readings can no longer
  be assigned to individual rails.
- Applying an external supply and the next successful battery start are recorded
  in that order. Whether the board remained connected during the external-supply
  step and the mechanism that restored operation are unknown.
- No connection-current waveform or exact protection-state transition was
  measured. The dual TLV61048 rails do not imply startup ordering or a known
  combined current. Real-solenoid and complete-device results remain
  client-engineer chat feedback rather than Alvin's direct observation.
- The accepted experiment snapshot and live note share SHA-256
  `73fcbd880aa125893b65366b8eb6d665e7d0040918c572ddeb7acbce089ea811`.

## Active Claude Chime Project-Page Checkpoint

- The active page is
  `content/projects/claude-chime-hardware-power-board.mdx`, titled
  `Claude Chime Power Board` / `Claude Chime 电源板` on this branch.
- Remote commits `9bce881`, `f7e0ea8`, and `c1155c5` respectively rewrite the
  page, add the L1-5 syntax/collocation gate to the repository-local writer,
  and run a second bilingual editorial pass. They are branch checkpoints, not
  published `main` or production claims.
- The scope is the Claude Chime project page plus the writer runtime and its
  current regression/rubric files. The cold-start note, cover, media records,
  public artifacts, and application code remain unchanged.
- Preserve the approved cold-start boundary across both pages: `4.03 V` to
  `1.49–1.57 V` was measured at the protected-pack output, not proven at the
  cell. Startup demand opening the DW01A/8205A protection path remains a
  bounded hypothesis because neither the current peak nor the exact state
  transition was measured.
- Direct bench checks remain distinct from the client's firmware engineer's
  report of ESP32 communication, ADC battery reading, charging control,
  repeated real-solenoid actuation, and complete-device operation.

## Protected Completed Families

Do not reopen these approved families unless the user explicitly requests it.
The active Claude Chime project-page branch is the current explicit exception:

- Arduino Smart Car;
- DIY pressure-flow cooling;
- Arduino Digital Clock;
- Tianjin STM32;
- Nanjing Turing;
- Claude Chime;
- Juanyun phase-change thermal management;
- sensorless FOC learning route.

Pull request #23 was a one-time explicitly authorized surface-cleanup exception,
not standing permission to bulk-rewrite approved content.

## Next Action

1. Open or update the pull request and inspect its Vercel and mergeability
   checks.
2. Merge only after the user explicitly approves publication.

## 2026-08-22 Claude Chime Note Release Verification

- Pull request #32 used exact head
  `290daf5d5be3b0109a959f307c1243ad4e6568de`; its Vercel checks passed before
  GitHub merged it at `1808aae2a7bc7b92c0eedc5876473d0a9d225119`.
- Content validation passes for 8 projects, 24 public notes, and 84 media items.
- UTF-8 validation passes for 370 text files.
- Lint, TypeScript checking, the 39-page Next.js production build, and the
  production dependency audit pass.
- The Vercel production status passed, and the custom-domain note route returned
  the new English and Chinese titles plus the rewritten protected-pack text.

## 2026-09-02 Active Branch Verification

- Local `HEAD` and
  `origin/docs/rewrite-claude-chime-project-page` matched at `c1155c5` before
  this `/neat` pass; released `main` remains at `74f6a39`.
- The project-page cold-start paragraph now matches the approved note boundary:
  protected-pack output rather than cell voltage, bounded protection-path
  inference, and no claimed current peak or exact state transition.
- Scoped reader-prose searches, diff whitespace, lint, content validation for
  8 projects / 24 public notes / 84 media items, encoding validation for 370
  UTF-8 text files, TypeScript, and the 39-page Next.js webpack production build
  pass.
- `npm audit --omit=dev` reports 0 production vulnerabilities. A fresh
  `npm ci` reports 2 issues in the full dependency tree, 1 low and 1 high, so
  dependency maintenance remains separate from this content/docs branch.
- Nineteen unrelated WPS/Finder-style files with ` 2` suffixes remain untracked
  and untouched.

## Updating This File

Replace the current-state sections at each handoff. Keep durable writing rules
and confirmed boundaries; do not append interview transcripts, secrets,
credentials, or machine-specific checkout paths.
