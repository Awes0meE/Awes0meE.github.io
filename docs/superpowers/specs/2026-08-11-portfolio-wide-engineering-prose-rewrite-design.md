# Portfolio-Wide Engineering Prose Rewrite Design

**Date:** 2026-08-11

**Status:** Approved in conversation; awaiting written-spec review

**Branch:** `agent/rewrite-ai-authored-portfolio-copy`

**Baseline:** `dc386bb408f0dff217f5f05cd3091cf0c636178d`

## Objective

Rewrite the portfolio's older AI-composed public prose with the current
`engineering-note-writer`, while preserving self-authored source notes and the
newly approved Arduino Smart Car pages. The finished site should read as one
bilingual engineering portfolio: concrete, evidence-led, personally voiced,
and honest about incomplete validation.

The same change updates the public identity from an XJTLU undergraduate to an
XJTLU Communication Engineering graduate and a first-year student in NTU's
School of Mechanical and Aerospace Engineering MSc (Robotics and Intelligent
Systems) programme.

## Approved Positioning

The homepage leads with engineering direction rather than student status.

- Primary identity: robotic systems hardware.
- Hero direction: building the hardware behind intelligent machines.
- Main interests: robot control hardware, flight-control electronics,
  schematic and PCB design, board bring-up, hardware-firmware integration,
  motor-drive electronics, and power electronics.
- Current stage: first-year MSc (Robotics and Intelligent Systems) student at
  NTU MAE.
- Previous education: Communication Engineering graduate of XJTLU.
- Tone: early-career and ambitious without claiming mature expert status.

The local `个人信息.txt` is approved as a factual and voice source. It remains a
reference-only local file and must not be copied into the repository or public
uploads. Future-tense NTU passages in that file must be adapted to current
enrolment, not pasted verbatim.

## Privacy Decision

Use a privacy-first public profile:

- hide the public email address;
- hide the public location;
- keep the GitHub profile link;
- add a professional email only after the user supplies one later;
- do not infer Singapore residence from NTU enrolment.

Minimal component changes are allowed only where needed to remove empty contact
rows cleanly. This is not a layout redesign.

## Writing Method

All changed prose follows the repository's current `engineering-note-writer`:

1. Bound confirmed actions, artifact facts, inferences, and unknowns.
2. Find the material's real narrative force instead of selecting a template.
3. Plan information moves around changing understanding.
4. Draft Chinese first with controlled energy and evidence-grounded reactions.
5. Derive titles and headings from the finished Chinese argument.
6. Adapt English with the same facts, uncertainty, technical detail, and ending
   beat at a calmer intensity.
7. Stop at the last useful verification, observation, or unresolved question.

No artifact may be upgraded into personal authorship. Gerbers, source files,
screenshots, course slides, or vendor diagrams prove only what they directly
show unless another source confirms the user's action.

## Rewrite Architecture

Work by project family, not by content type. Each family moves through the same
pipeline:

```text
source material and Git history
  -> internal fact sheet
  -> Chinese information moves
  -> Chinese draft
  -> English adaptation
  -> titles, summaries, and media copy
  -> factual, voice, bilingual, and MDX review
  -> validation
  -> family-scoped commit
```

The internal fact sheets are working notes, not reader-facing compliance
sections. Publication prose should carry uncertainty beside the limited claim
instead of collecting disclaimers at the end.

## Implementation Order

### 1. Identity and site positioning

Update the homepage Hero, homepage biography, About page, compact logo subtitle,
footer, list-page introductions, fixed reader-facing detail-page copy, default
SEO, Open Graph copy, and the public-facing README identity summary.

Likely files include:

- `app/page.tsx`
- `app/about/page.tsx`
- `app/layout.tsx`
- `app/work/page.tsx`
- `app/notes/page.tsx`
- `app/media/page.tsx`
- `app/work/[slug]/page.tsx`
- `app/notes/[slug]/page.tsx`
- `components/logo.tsx`
- `components/site-footer.tsx`
- `components/technical-visual.tsx`
- `lib/site.ts`
- `README.md`

Do not add localized routes or rebuild the SEO architecture. Update the existing
default metadata and keep any Chinese description field current even where the
current metadata wiring remains English-first.

### 2. Arduino Digital Clock

- Project: `content/projects/arduino-digital-clock-counter.mdx`
- Note: `content/notes/arduino-digital-clock-counter-course-note.mdx`
- Media: 11 entries with `projectSlug: arduino-digital-clock-counter`

Use the committed evidence and the available local Digital Clock source folder.
Keep group-work context, course/reference material, and personal contribution at
the strength supported by the report and artifacts.

### 3. Tianjin Metro STM32 training

- Project: `content/projects/tianjin-metro-stm32-foundation.mdx`
- Notes:
  - `content/notes/tianjin-metro-environment-monitoring-stm32.mdx`
  - `content/notes/tianjin-rail-control-pid-atc-reading.mdx`
  - `content/notes/tianjin-stm32-environment-setup.mdx`
  - `content/notes/tianjin-stm32-gpio-exti-timer.mdx`
  - `content/notes/tianjin-stm32-pwm-uart-adc.mdx`
- Media: 3 entries with `projectSlug: tianjin-metro-stm32-foundation`

Keep this framed as learning and a training/demo integration, not production
metro-system work. Preserve exact STM32 identifiers and avoid invented failure
scenes.

### 4. Nanjing Turing

- Project: `content/projects/nanjing-turing-qt-embedded-learning.mdx`
- AI-composed note: `content/notes/turing-three-week-development-log.mdx`
- Media: 19 entries with `projectSlug: nanjing-turing-qt-embedded-learning`

Keep claims tied to raw logs and source notes. Treat Seamly2D, Qt/CMake,
institutional marks, and generated figures as upstream or third-party material
where appropriate. Do not claim that cross-platform signing/notarization was
completed when the records do not show it.

### 5. Juanyun thermal and control platform

- Project: `content/projects/juanyun-thermal-hardware.mdx`
- Notes:
  - `content/notes/juanyun-acunit-board.mdx`
  - `content/notes/juanyun-acunit-firmware.mdx`
  - `content/notes/juanyun-acunit-hardware-revision-archive.mdx`
  - `content/notes/juanyun-baseunit-firmware.mdx`
  - `content/notes/juanyun-dht11-am2302-board.mdx`
  - `content/notes/juanyun-legacy-actuator-archive.mdx`
- Media: 15 entries with `projectSlug: juanyun-thermal-hardware`

Respect the Current_Product privacy boundary. Public renders support visible
structure; they do not automatically support precise timing, design rationale,
personal ownership, or bring-up results.

### 6. DIY pressure-flow cooling

- Project: `content/projects/juanyun-diy-cooling-prototype.mdx`
- Note: `content/notes/juanyun-diy-cooling.mdx`
- Media: 6 entries with `projectSlug: juanyun-diy-cooling-prototype`

Artifacts support the existence of mechanical, code, desktop-demo, and PCB
iterations. They do not support cooling-performance claims without measurements.

### 7. FOC driver board

- Project: `content/projects/juanyun-foc-driver-board.mdx`
- Note: `content/notes/juanyun-foc-driver.mdx`
- Media: 6 entries with `projectSlug: juanyun-foc-driver-board`

Keep missing startup, waveform, sampling, protection, tuning, and performance
evidence visible in the prose. Do not convert source/board existence into a
successful-bring-up claim.

### 8. Claude Chime power board

- Project: `content/projects/claude-chime-hardware-power-board.mdx`
- Media: 1 entry with `projectSlug: claude-chime-hardware-power-board`

The schematic, BOM, Gerber, and EasyEDA archive support board structure but not
unqualified authorship, exact contribution, or verified completion.

### 9. Smart Car media and final site sweep

- Keep both Smart Car MDX files unchanged.
- Rewrite the 12 media title/caption pairs with
  `projectSlug: arduino-smart-car-line-tracker` so they match the approved page
  and note without changing the underlying assets.
- Sweep remaining fixed functional copy for bilingual consistency, but keep
  navigation and action labels concise.

## Protected Files

The following files must remain byte-identical to baseline `dc386bb`:

- `content/projects/arduino-smart-car-line-tracker.mdx`
- `content/notes/arduino-smart-car-line-tracking-learning-note.mdx`
- `content/notes/juanyun-hardware-sop.mdx`
- `content/notes/turing-cmake-build-logic.mdx`
- `content/notes/turing-qt-seamly2d-first-run.mdx`
- `content/notes/turing-release-packaging-cross-platform.mdx`
- `content/notes/turing-sm2d-xml-data-format.mdx`

All `public/uploads` assets also remain unchanged. The rewrite does not modify
PDFs, source code, XML, Markdown/TXT/DOCX artifacts, images, archives, or legacy
content.

## Field-Level Boundaries

Project filenames/slugs and non-prose frontmatter remain unchanged, including:

- `date`
- `status`
- `tags`
- `cover`
- `featured`
- `links`
- `assetPaths`

Note filenames/slugs and these fields remain unchanged:

- `date`
- `tags`
- `visibility`
- `projectSlug`

For `content/media.json`, item order and every non-copy field remain unchanged.
Only these four fields may be rewritten:

- `title`
- `titleZh`
- `caption`
- `captionZh`

The final counts remain 8 projects, 21 notes, and 73 media items.

## Title Policy

- Preserve project main titles and routes.
- Preserve all protected-note titles.
- Derive new titles for AI-composed notes only after the Chinese body is stable.
- Record an old-title to new-title map with each relevant family checkpoint and
  in the final handoff.

## Concurrency and Git Strategy

All work stays in the isolated worktree on
`agent/rewrite-ai-authored-portfolio-copy`.

Concurrent subagents are allowed for independent, read-only source audits,
family-scoped drafting, and independent semantic review. Do not assign two
agents to edit the same file or the shared `content/media.json` concurrently.
The main agent owns integration, field-level media edits, protected-file checks,
validation, commits, and pushes.

Use Conventional Commits and make one coherent checkpoint per identity/family
batch. Do not merge into `main` without explicit user approval after preview.

## Failure Handling

- If an unknown changes authorship or result strength, pause that family or
  qualify the claim; continue independent families where safe.
- If a source conflicts with the current MDX, prefer first-hand records and
  surface only the decision-bearing conflict.
- If a protected file changes, stop and restore it before any commit.
- If a validation command fails, fix the scoped issue and rerun the exact failed
  command before continuing.
- If long text causes layout overflow, make the smallest necessary copy or
  layout adjustment and verify both languages at the affected breakpoints.

## Per-Family Acceptance

Before each family commit:

1. Review every first-person action, result, measurement, and uncertainty.
2. Compare Chinese and English facts, identifiers, links, and ending beats.
3. Scan for banned generic headings and empty corporate/AI phrasing.
4. Confirm relevant uploads, technical listings, and evidence links remain.
5. Run content and UTF-8 validation.
6. Inspect the intended diff and stage only family-scoped files.

AI-smell scans are warnings except for exact banned framework headings and
phrases. Human semantic review remains authoritative because automated counts
cannot prove factual truth, authorship, justified emotion, or bilingual parity.

## Final Verification

Run after all family commits and after stopping any development server:

```powershell
git diff --check
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
npm.cmd audit --omit=dev
```

Also verify:

- protected files have no diff against `dc386bb`;
- the branch diff contains only approved files and media fields;
- 8 projects, 21 notes, and 73 media items still validate;
- all generated routes return a successful local response;
- homepage, About, Work, Notes, and Media are reviewed in English and Chinese at
  desktop and mobile widths;
- at least one representative project and note per family is screenshot-reviewed;
- all changed routes have no console errors, horizontal overflow, empty bodies,
  missing images, or broken primary links;
- long protected Turing/SOP notes and the Smart Car pages regress cleanly;
- language toggle state, `html[lang]`, route navigation, and reload persist;
- titles, descriptions, Open Graph copy, and dynamic project/note metadata match
  the approved identity and rewritten frontmatter.

## GitHub and Preview Gate

After local verification:

1. Confirm the worktree is clean and the local branch is based on current
   `origin/main`.
2. Push the topic branch and confirm the remote SHA matches local `HEAD`.
3. Wait for Vercel Preview checks to succeed.
4. Run the browser matrix against the preview URL where access permits.
5. Hand the preview to the user for review.
6. Merge only after explicit release authorization.

## Success Criteria

The rewrite is ready for user review when:

- all approved public prose surfaces have received an evidence-led bilingual
  pass;
- the identity consistently reflects an XJTLU graduate and NTU MAE robotics MSc
  first-year student focused on robotic systems hardware;
- email and location are no longer public while GitHub remains available;
- 7 older project pages, 15 AI-composed notes, and all 73 media title/caption
  pairs are covered;
- 7 protected MDX files and every public asset remain unchanged;
- all local validation and browser checks pass;
- the Vercel Preview is available for the user's decision;
- `main` remains unchanged until the user explicitly approves release.
