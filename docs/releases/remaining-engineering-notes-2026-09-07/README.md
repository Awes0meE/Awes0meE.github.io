# Approved engineering-note publication — 2026-09-07

All notes were approved by the user, including the concrete-heading and natural-paragraph-opening revisions. This release promotes ten bilingual studies across the five remaining project families and publishes the current repository-local Engineering Note Writer. The earlier six studies and nine technical/source-document pages remain, giving 25 public notes across all eight projects and 84 unchanged media records.

Twelve suspended old notes are retired from current source. Their final source paths and hashes at `ce2411e` are in [verification.json](verification.json); Git history preserves recovery. Completed draft copies, two generated preview pages and their builder are removed. Historical review JSON remains in the original experiment folders. The old FOC redirect now leads to the new angle-handoff study.

## New routes

| Note | Canonical source |
| --- | --- |
| [带保护电池的启动测量](https://www.66ccff-labs.com/notes/claude-chime-startup-current) | `content/notes/claude-chime-startup-current.mdx` |
| [电池采样开关与 ADC 建立时间](https://www.66ccff-labs.com/notes/claude-chime-switched-adc-divider) | `content/notes/claude-chime-switched-adc-divider.mdx` |
| [无感 FOC 接管时的角度连续性](https://www.66ccff-labs.com/notes/foc-angle-handoff) | `content/notes/foc-angle-handoff.mdx` |
| [PWM 周期内的电流采样](https://www.66ccff-labs.com/notes/foc-current-sampling-timing) | `content/notes/foc-current-sampling-timing.mdx` |
| [ACUnit 的协作式任务时序](https://www.66ccff-labs.com/notes/juanyun-cooperative-task-timing) | `content/notes/juanyun-cooperative-task-timing.mdx` |
| [Flash 参数保存与恢复](https://www.66ccff-labs.com/notes/juanyun-flash-parameter-recovery) | `content/notes/juanyun-flash-parameter-recovery.mdx` |
| [本地账户的权限判断](https://www.66ccff-labs.com/notes/turing-local-role-permissions) | `content/notes/turing-local-role-permissions.mdx` |
| [Qt 程序的 Windows 运行依赖](https://www.66ccff-labs.com/notes/turing-windows-runtime-dependencies) | `content/notes/turing-windows-runtime-dependencies.mdx` |
| [I²C 通信与 OLED 调试](https://www.66ccff-labs.com/notes/tianjin-stm32-i2c-oled-debugging) | `content/notes/tianjin-stm32-i2c-oled-debugging.mdx` |
| [光照标定与查表控制](https://www.66ccff-labs.com/notes/tianjin-stm32-light-calibration-control) | `content/notes/tianjin-stm32-light-calibration-control.mdx` |

## Writing and scope

The current writer includes Chinese sentence checks before English and in final review, project/note division, natural endings, concrete verb-object matching, headings derived from complete section content, and at most one Chinese paragraph beginning with 我 per learning note. English retains its existing adaptation rules. The independent old-draft information-retention gate remains removed.

Approved article bodies match checkpoint `ce2411e`; promotion changes only visibility. The other fifteen note sources match that approved checkpoint exactly. Homepages, About, media and uploaded assets, dependency manifests and original source-document bodies are unchanged against main `007decf`. Browser review exposed long inline code overflowing three original Turing pages on mobile; the shared paragraph and inline-code renderer now uses the existing safe-wrap class. Fenced code retains its horizontal scrolling. The unapproved About work stays on `docs/rewrite-about-copy` at `af3ace5` and is excluded.

## Verification and handoff

Lint/content/UTF-8 checks, typecheck, the 40-route webpack production build and production dependency audit pass; the audit reports zero vulnerabilities. All 100 note/language/viewport combinations and 50 route checks passed, including project associations, retired-note 404s and the FOC redirect. Browser and route results are recorded in [verification.json](verification.json). [Neat audit](neat-audit.json) records the documentation assessment; [the handoff](../../active-work/portfolio-copy-rewrite.md) records current state. [Completed topic decisions](topic-decisions.md) and [the original overlap audit](overlap-audit-2026-09-06.md) are historical rationale, not pending work.

Publication tracking: PR creation follows local review. Vercel's PR checks and main deployment provide remote publication status. No new tag is created; the latest named tag remains `v0.9.0`. Preserve the remote `gh-pages` redirect branch.
