# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-08-14
**Branch:** `main`
**Current project:** None selected
**Last completed project:** `Claude Chime Hardware Power Board`
**State:** Pull request #20 merged the hardened writer plus refreshed Claude Chime note and project-page prose; waiting for the next remaining project selection

## Working Contract

- Leave the approved Arduino Smart Car project, note, and media copy unchanged.
- Rewrite every other project family one at a time, never as a batch.
- Before writing each project, inspect its uploaded public materials, then
  reuse a user-confirmed brief for the same scope or run a `grill-me` interview.
- Treat the user's voice answers as primary first-person material. They may be
  disordered; extract engineering decisions, mistakes, reactions, and changes
  in understanding before drafting.
- Store confirmed understanding as a compact, non-sensitive brief rather than
  an interview transcript.
- Only after confirmation, research current reliable knowledge beyond the
  uploaded material; use nearby links lightly and keep new first-person insight
  in the present, never as invented project history, action, result, or measurement.
- Use `skills/engineering-note-writer/SKILL.md` to draft Chinese through the
  user's cognition trail, allowing genuine cross-subsystem or non-strictly
  chronological attention without imposing a cognition template.
- Adapt English with the same facts and calmer intensity, then require
  first-person prose to pass the Truth gate and Li Zhiyi gate, and require
  model-authored article body to pass the scoped zero-hit reader-prose L1 gate.
- Evidence bounds project facts, authorship, results, and publication claims,
  but must not choose the reader-facing structure.

## Confirmed Global Decisions

- Public display name: Alvin Li.
- Public contact remains GitHub-only; email and location stay hidden.
- Project demonstration media remains unchanged unless the user explicitly
  requests an asset edit.
- Project covers and other visual-identity choices remain unchanged during
  prose/content rewrites unless the user explicitly requests or approves the
  visual change.
- A project rewrite reaches `main` only after the user reviews its bilingual
  copy and explicitly approves the merge.

## Completed Rewrite Checkpoints

- Arduino Smart Car is approved and remains protected from unsolicited rewrites.
- DIY Cooling completed its interview-led and cognition-led passes through pull
  requests #5 and #9. Remembered thermal and frame-rate effects remain personal
  recollection rather than controlled benchmark results.
- The cognition-led `engineering-note-writer` reached `main` through pull request
  #8. It requires confirmed shared understanding, post-confirmation research,
  Chinese-first drafting, equivalent English adaptation, and independent Truth
  and Li Zhiyi release gates.
- Arduino Digital Clock completed the same workflow through pull request #10 at
  `80c3743d938236ed36968c5b5adb6047a3edd3ce`; the surviving video, early
  `main.c`, final switch polarity/debounce, and later-found datasheet retain their
  documented evidence limits.
- Tianjin STM32 completed the same workflow through pull request #12 at
  `bb06ad81304643f8eb3afe4badf06fa04f828bfe`; the 16-point map remains
  feedforward, hardware-I2C lockup remains a present-day hypothesis, and PID plus
  ATP/ATO/ATS remain reading-layer concepts.
- Nanjing Turing completed the same workflow through pull request #14 at
  `f5e1082e778a49cb4a740f42e483a17c397a7eac`; formal development-machine
  acceptance, the later clean Windows test, the unsigned macOS DMG, and unknown
  post-handoff adoption remain separate claims.
- Claude Chime completed the same workflow through pull request #16 at
  `03f5ba5a22cfc5be1d67a5e489c519ccb77154c9`. The approved release adds the
  bilingual commissioned-hardware case study, one cold-start note, one media-copy
  update, and 10 reviewed public artifacts including the original software handoff.
- Alvin owned the Claude Chime board requirements breakdown, architecture,
  calculations and selection, schematic, PCB, manufacturing outputs, ordering,
  hand assembly, and scoped bring-up. ESP32 firmware and final real-load system
  integration remained with the client.
- Direct Claude Chime evidence covers two no-load 5 V readings, charge current
  plus later battery-voltage rise, the manually enabled ADC divider, and repeated
  no-load control switching. Real-solenoid and complete-device operation remain
  client chat feedback; cold-start protection triggering remains a bounded
  inference without a measured inrush waveform. V1.0 needed no rework or respin.
- On 2026-08-14, the Claude Chime cold-start note became the first real forward
  test for the hardened reader-prose L1 gate. The project-page body then received
  the same pass. Pull request #20 merged both rewrites and the hardened skill at
  `b3dc51cbc1620163fbfdcac0c8ca624d08a2434f`, without changing the project
  frontmatter, cover, media, public artifacts, or evidence boundaries.
- The verified published content count is 8 projects, 22 notes, and 73 media items.

## Next Action

1. Ask the user to select the next remaining family: Juanyun thermal/control
   hardware or the Juanyun FOC driver-board archive.
2. Audit that family's evidence, then run or reuse a confirmed interview brief
   before drafting substantive first-person copy.
3. Do not reopen Smart Car, DIY Cooling, Arduino Digital Clock, Tianjin STM32,
   Nanjing Turing, or Claude Chime unless explicitly requested.

## Current Verification

- Pull request #20 was mergeable and its Vercel deployment plus preview-comment
  checks passed before the exact head `6197e8e` was merged.
- `npm run lint` and `npm run typecheck` passed for the hardened skill and both
  refreshed Claude Chime pages.
- `next build --webpack` passed with 37 static pages, including the project and note.
- Pull request #16 remains the latest desktop/mobile bilingual browser sweep.
  This copy-only refresh used the static build and successful Vercel preview
  rather than repeating that full interaction pass.
- Content validation covers 8 projects, 22 notes, and 73 media records; UTF-8
  validation covers 287 text files.
- The public interactive BOM has empty customer/order metadata fields; the
  credential/password source file was excluded from public uploads.

## Updating This File

Replace stale current-state sections at each device handoff; do not append an
endless transcript. Keep durable writing rules and confirmed decisions. Never
commit credentials, private email addresses, private locations, tokens, or
machine-specific absolute paths.
