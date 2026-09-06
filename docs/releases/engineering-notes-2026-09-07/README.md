# Approved Engineering Notes — 2026-09-07

The user approved these six bilingual studies and requested publication with the latest repository-local Engineering Note Writer, deletion of the three superseded notes, Neat and a PR merged to `main`.

| Project | Note | Public route |
| --- | --- | --- |
| Arduino Smart Car | 供电与轮速测量 / Arduino Car Power and Wheel-Speed Measurement | [/notes/arduino-smart-car-line-tracking-learning-note](https://www.66ccff-labs.com/notes/arduino-smart-car-line-tracking-learning-note) |
| Arduino Smart Car | 循迹信号与输入采集 / Arduino Car Line Sensing and Input Acquisition | [/notes/arduino-smart-car-line-sensing-input-acquisition](https://www.66ccff-labs.com/notes/arduino-smart-car-line-sensing-input-acquisition) |
| Two-digit counter | 共阳数码管与 BCD 译码 / Common-Anode Displays and BCD Decoding | [/notes/arduino-digital-clock-counter-course-note](https://www.66ccff-labs.com/notes/arduino-digital-clock-counter-course-note) |
| Two-digit counter | 自锁按键与计数控制 / Latching Switches and Counter Control | [/notes/arduino-counter-latching-switch-control](https://www.66ccff-labs.com/notes/arduino-counter-latching-switch-control) |
| DIY cooling | 温度采样与风扇响应 / Temperature Sampling and Fan Response | [/notes/juanyun-diy-cooling](https://www.66ccff-labs.com/notes/juanyun-diy-cooling) |
| DIY cooling | PWM 风扇控制与转速反馈 / PWM Fan Control and Speed Feedback | [/notes/juanyun-diy-cooling-pwm-fan-control](https://www.66ccff-labs.com/notes/juanyun-diy-cooling-pwm-fan-control) |

## Publication Scope

All six bodies match approved checkpoint `2337f2d`; publication changes only their visibility. Three old slugs carry replacement articles and three companion slugs are new. The source collection has eight projects, 27 notes, 15 public notes, 12 suspended notes and 84 media records. The Notes index has five project channels and two archive years.

Nine writer files consolidate the approved ending guidance: close an article naturally, compare nearby endings for repeated moves, and allow an apt occasional retrospective. The Chinese Step 10/12 sentence checks and project/note division remain; the removed information-retention gate stays removed. Canonical rules are in [Engineering Note Writer](../../../skills/engineering-note-writer/SKILL.md).

The release also includes the approved DIY homepage ending, the Smart Car homepage's seven-IR-input correction in both languages, and a faithful PNG render of the existing DIY ESP32 schematic PDF. No application code, dependencies or original engineering source files change.

## Cleanup and Handoff

Deleted three superseded `before.mdx` files, twelve completed language drafts, four review preview pages and the finished DIY selection plan. Git retains the earlier copies. Current prose lives in `content/notes/`; dated review observations and Step 10 checks remain historical evidence. The other 12 suspended notes await their own project-by-project rewrite.

[Verification](verification.json) records approved-body hashes and removed-file hashes. [Neat audit](neat-audit.json) records documentation assessment. The [writing handoff](../../active-work/portfolio-copy-rewrite.md) and [topic backlog](../../active-work/project-note-topics-2026-09-06.md) replace obsolete pending-review instructions.

## Validation and Publication

Lint, content/UTF-8 validation, TypeScript, skill validation and the webpack production build passed; the build prerendered 30 pages. Production dependency audit reported zero vulnerabilities. Manual review checked the nine changed writer files and eight ending-variety cases.

Browser checks passed for all six articles in both languages at 1440 and 390 pixels (24 views), the Notes index (4 views) and all three related-project link sets (6 views). No page exceptions, horizontal overflow, wrong-language body blocks or broken images were found. The mobile introduction/ending and desktop schematic were visually inspected. Existing stylesheet preload warnings did not affect rendering. All [53 local route/attachment checks](local-http.json) passed, including 404 for the 12 suspended notes.

Publication is tracked by [PR #37](https://github.com/Awes0meE/Awes0meE.github.io/pull/37). Its GitHub/Vercel checks record preview validation, merge and the production deployment. Continue subsequent writing from synchronized `main` after this PR is merged.
