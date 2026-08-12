# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-08-13
**Branch:** `docs/rewrite-nanjing-turing-internship`
**Current project:** `南京图灵 Qt、编译与打包实习记录`
**Last completed project:** `天津津铁通信 STM32 嵌入式实习记录`
**State:** Nanjing Turing bilingual rewrite is approved and locally verified; Git handoff is in progress

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
  first-person prose to pass both the Truth gate and Li Zhiyi gate.
- Evidence bounds project facts, authorship, results, and publication claims,
  but must not choose the reader-facing structure.

## Confirmed Global Decisions

- Public display name: Alvin Li.
- Public contact remains GitHub-only; email and location stay hidden.
- Project demonstration media remains unchanged unless the user explicitly
  requests an asset edit.
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
- Arduino Digital Clock completed the same workflow on 2026-08-13. Pull request
  #10 merged the approved bilingual project page, learning note, and 11 media-copy
  records into `main` at `80c3743d938236ed36968c5b5adb6047a3edd3ce`.
- The Digital Clock account attributes breadboard construction, pin research,
  decoder/display wiring, Arduino firmware, switch investigation, and integration
  to the user; report/video/general work remains attributed to other group members.
- Its core learning route is the CD4511 common-cathode reference versus the
  common-anode LS47/display path, followed by multimeter-led mapping of the
  undocumented six-pin switches. The two rollover thresholds were separately
  flashed and verified, both final buttons worked, and the classroom result was
  full marks.
- The surviving video still proves only changing digits, `main.c` remains an
  early development trace, and final switch polarity/debounce remain unresolved.
  The archived LS47 datasheet and linked external sources explain present-day
  understanding; they are not presented as resources used during the project.
- Smart Car, DIY Cooling, and all public uploads were unchanged by pull request
  #10. The verified content counts remain 8 projects, 21 notes, and 73 media items.
- Tianjin STM32 completed the same workflow on 2026-08-13. Pull request #12
  merged the approved bilingual project page, five learning notes, and three
  media-copy records into `main` at
  `bb06ad81304643f8eb3afe4badf06fa04f828bfe`.
- The final account follows Alvin from Arduino-style high/low calls through
  Keil/ST-Link bring-up, GPIO/EXTI/timer reasoning, ADC/PWM/UART roles, and one
  bare-metal integrated demo. The supervising engineer's involvement remains
  informal training guidance rather than production rail-system work.
- The 16-point target-to-PWM mapping remains explicitly feedforward; the later
  hardware-I2C lockup explanation remains a present-day hypothesis; PID and
  ATP/ATO/ATS remain reading-layer concepts rather than implemented control.
  All four public C excerpts and all public uploads were unchanged.

## Confirmed Nanjing Turing Brief

- The internship was three full-time, in-person weeks in August 2025, directly
  after the 2025 National Undergraduate Electronics Design Contest. Alvin
  entered with school-level C/C++ fundamentals but no Qt, GUI, large-codebase,
  or collaborative Git experience.
- The company was prototyping secondary development on the upstream open-source
  Seamly2D desktop application. Alvin's scope was a local `QSettings`
  account/role entrance plus the build, deployment, documentation, and handoff
  path; no server, database, or online authentication system was built.
- Alvin personally completed the Qt/MSVC/qmake bring-up, local registration and
  login, hash-based password storage and verification, role rules, UI edge-case
  fixes, XML reading, Windows packaging, macOS migration, scripts, and documents.
  The supervising engineer assigned direction, reviewed daily progress, watched
  the final demonstrations, and completed the formal internship acceptance.
- The development trail includes a Qt 5/Qt 6 source mismatch, more than thirty
  subsequent compile errors, and a roughly three-day `windeployqt` failure. The
  preserved first-run document supplies the recoverable technical route: align
  Qt 6.5.3 MSVC2019 64-bit with v142, clear stale build/user state, expose the
  Qt `bin` path, and make the qmake deploy rule resolve `QT_INSTALL_BINS` for
  Release builds. A slow overseas Qt download also became an early lesson when
  the Tsinghua mirror reduced the remaining installation time substantially.
- Windows reached Release compilation, Qt and Xerces dependency collection,
  self-signing, an Inno Setup installer, installation, and launch. About two
  weeks after the internship, Alvin separately verified that installer and the
  modified login/role functions on a newly installed home Windows desktop with
  neither Qt nor Visual Studio. This later clean-machine test was not part of
  the company's formal acceptance and was not added back to the earlier guide.
- On Alvin's own Mac, Debug and Release builds, `macdeployqt`, application
  launch, and an unsigned DMG were demonstrated. A self-signed certificate was
  created, but application signing and notarization remained unfinished; no
  second clean Mac was tested.
- Git was practical work, not terminology-only study: clone, upstream branch
  inspection/switching, a development branch, commit, push, merge, pull request,
  fork, and tag were all exercised. The final handoff was committed to the
  company's intern `develop` branch. Later adoption or productization is unknown.
- The cognition route expands what “working” means: entering a large repository;
  aligning branch, Qt package, compiler, ABI, Kit, paths, and dependencies;
  treating GUI behavior as state and permissions; separating IDE, Release,
  deploy-folder, installer, and clean-machine results; then meeting the new
  dependency and signing rules on macOS. Preserve the real frustration around
  `windeployqt`, the self-mockery around the mirror discovery, the excitement of
  the supervisor's strong final praise, and the unfinished signing boundary.

## Next Action

1. Commit and push the approved bilingual project page, three-week note, five
   aligned media-copy records, and this handoff record.
2. Open a Draft PR for preview and record its URL here. Do not merge into `main`
   until the user explicitly approves the deployed preview.
3. Keep the four source-document notes and every public upload unchanged through
   preview and merge checks.

## Current Verification

- `npm run lint` passed on 2026-08-13 for the Nanjing Turing bilingual draft.
- `npm run typecheck` passed on 2026-08-13 for the Nanjing Turing bilingual draft.
- `npm run build` passed on 2026-08-13 with 36 static pages.
- Content validation remains 8 projects, 21 notes, and 73 media records; UTF-8
  validation covers 283 text files.
- English/Chinese paragraph counts match within all 14 rewritten sections.
- The four protected Turing source-document notes and every public upload remain
  unchanged. Media order and non-copy fields remain unchanged; five records have
  aligned title/caption copy updates only.

## Updating This File

Replace stale current-state sections at each device handoff; do not append an
endless transcript. Keep durable writing rules and confirmed decisions. Never
commit credentials, private email addresses, private locations, tokens, or
machine-specific absolute paths.
