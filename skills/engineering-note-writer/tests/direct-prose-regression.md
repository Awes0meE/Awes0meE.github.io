# Direct Prose Current-Rule Regression

Use this case to review the active runtime after 2026-08-14. It does not alter or supersede the frozen Trials 01–11.

## Rejected Chinese Binary Reframe

Input: `屏幕显示的不是风扇转速，而是占空比。`

Expected repair: `屏幕显示的是占空比命令，代码没有测量风扇转速。`

## Accepted Chinese Conversational Qualifier

Allowed when the first idea needs genuine protection: `不是说固定比例不行，而是说我当时还没有定义清楚控制目标。`

## Accepted Chinese Factual Boundary

`这次测试确认程序能在干净的 Windows 机器上启动。测试发生在实习以后，不计入公司正式验收。`

## Rejected English Binary Reframe

Input: `The screen did not show fan speed; it showed duty cycle.`

Expected repair: `The screen showed a duty command. The code did not measure fan speed.`

## Accepted English Factual Negation

`I did not write the firmware.`

## Release Expectation

- Reader prose contains no `「」`.
- Bare binary reframes are repaired in both languages.
- The confirmed Chinese qualifier remains available when it carries real nuance.
- Missing tests, implementations, evidence, authorship, and publication limits remain explicit.

## Verification

Run the red scan before edits and report its hits:

```text
rg -n -S 'use `「」`|我说「理论上」|下一次再看到「|habitual `不是\.\.\.而是\.\.\.`' skills/engineering-note-writer/SKILL.md skills/engineering-note-writer/references skills/engineering-note-writer/tests/rubric.md
```

After edits, the same conflict scan must return no hits. Also run:

- `python -X utf8 C:\Users\123\.codex\skills\.system\skill-creator\scripts\quick_validate.py skills\engineering-note-writer`
- `git diff --check`
- a commit-local diff guard proving the frozen trial paths did not change.

Use `py -3.12 -X utf8 ...` only when the Python Launcher has a registered Python 3.12 runtime.
