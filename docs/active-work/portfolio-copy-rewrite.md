# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-09-06
**Current project:** Claude Chime approved refinement applied; cross-project overlap audit complete
**Last completed authoring scope:** `Claude Chime Power Board` / `Claude Chime 电源板`
**Publication record:** [PR #35](https://github.com/Awes0meE/Awes0meE.github.io/pull/35), from `docs/refine-claude-chime-copy` into `main`, records integration and deployment; PR #34 covers the preceding copy.
**State:** On 2026-09-06 the user approved the full bilingual candidate, authorized publication and branch/workspace cleanup, and requested an all-project overlap audit. The approved `01-after.mdx` was applied byte-for-byte to the project page, with SHA-256 `a2698f058b8171ac1c5bcca35bec8cb9e5e8e81677dbc79bc0cb5f3188ea0ffa`. Runtime `a1253dc` adds the Chinese-only sentence gate. The overlap audit covers 8 projects and 24 public notes; its proposed rewrites have not been applied.

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
- Compose Chinese from the confirmed brief and evidence, finish Chinese
  refinement, and pass the independent Chinese sentence gate before English
  at Step 10. Derive English from the Chinese, then run the existing L1-5
  calque and pair-divergence check. Recheck final Chinese at Step 12; the
  six-category gate is Chinese-only and leaves existing English rules unchanged.
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

## Approved Claude Chime Project-Page Scope

- The approved page is `content/projects/claude-chime-hardware-power-board.mdx`.
  Its full before/after archive is under
  `docs/experiments/chinese-gate-claude-chime-project-2026-09-06/`.
- The approved Chinese and English keep the commissioned-hardware ownership,
  dual-boost architecture, supply/charge decisions, gated analog sampling,
  first-spin work, direct bench checks, client feedback, and software handoff.
- The cold-start note, covers, images, public artifacts, and application code
  are unchanged. The new layout explanation is present-day interpretation,
  not an added historical PCB change or measured performance claim.
- Both pages retain the protected-pack-output boundary, an unproven
  DW01A/8205A startup-protection hypothesis, and unmeasured current peak / exact
  state transition. Shared-boost supply dips remain a possibility.
- The user also approved publishing the Chinese sentence-gate runtime. Chinese
  is checked before English at Step 10 and again at Step 12; existing English
  rules remain unchanged.

## Protected Completed Families

Do not reopen these approved families unless the user explicitly requests it.
The new Claude Chime project page is approved for publication. The cross-project
audit is diagnostic; it does not reopen every article for automatic rewriting.
The cold-start note and the other families below remain protected:

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

1. Use the release PR and its linked checks as the publication record for this
   approved revision. Do not recreate a deleted, fully merged source branch.
2. Read [the project/note overlap audit](project-note-overlap-audit-2026-09-06.md)
   for all 8 projects and 24 notes. The proposed first experiment narrows the
   Claude Chime cold-start note while keeping this approved project page.
3. Implement only the next user-selected project scope, with Chinese/English
   review before publication. Page-division checks in the audit are proposals,
   not new writer rules already installed.
4. Preserve `gh-pages`, the GitHub Pages redirect source. The 19 previously
   untracked duplicate-named files have been removed from the checkout only
   after a verified recoverable backup; see the session log for the local path.

## Verification And History

The approved candidate matches its archived MDX byte-for-byte. The 39-page
webpack production build and TypeScript passed; a local production preview
rendered the new English and Chinese body, assets and note link. No other
article was edited by the overlap audit. Earlier release and environment
checkpoints are retained in `docs/session-log.md`, rather than repeated here
as stale current-state instructions.

## Updating This File

Replace the current-state sections at each handoff. Keep durable writing rules
and confirmed boundaries; do not append interview transcripts, secrets,
credentials, or machine-specific checkout paths.
