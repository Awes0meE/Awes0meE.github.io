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

## Learning-Note Title Layer

Source title: `“能跑”改了三次意思：Seamly2D 三周开发记录`

Expected main title: `Seamly2D 三周开发记录`

Source section heading: `回车键连着取消，权限还没来得及复杂`

Expected section heading: `开发尝试`

The expected titles are short learning-note indexes. The body may remain
narrative and expressive; the title layer does not inherit the body's hook,
punchline, conclusion, or sentence structure.

## Thick Paragraph With A Real Short Break

Accepted shape:

> 我第一次按回车时，以为文件已经保存，窗口却直接回到了上一层。再试一次还是一样。顺着事件处理往下看，回车最终走到了取消分支，权限判断也只保留了最简单的实现；程序确实能启动，但这条操作链还没有跑通。
>
> “能跑”的范围又缩了一次。

Rejected shape:

> 我按了回车。
>
> 窗口关闭了。
>
> 我再次测试。
>
> 结果还是一样。
>
> 功能还没有完成。

The accepted case joins one cognition movement into a substantial paragraph
and reserves the isolated sentence for an actual turn. Do not enforce a
paragraph-length or sentence-length quota.

## Li Zhiyi Identity And Emotion

Confirmed source: `第三次还是同一个错误，我当时真的给整懵了。`

Pass when the rewrite keeps equivalent intensity and remains recognizably Li
Zhiyi.

Fail when it flattens the reaction to `我略感意外`, amplifies it to `我彻底崩溃`,
or imports another persona through diction such as `诚哉此错，诸君当鉴`.
Borrowed paragraph mechanics do not authorize borrowed vocabulary, cultural
references, audience calls, cadence, or signature endings.

## Accepted Semantic Colon

Allowed: `我最后确认了一件事：绿色三角只证明程序启动，不证明导出流程可用。`

Rejected template label: `开发结果：完成了启动测试。`

A colon passes because of its semantic role, not merely because it occurs
infrequently. Reject adjacent sentences or paragraphs that repeatedly use the
same label-colon frame.

## Accepted Term And Direct Quotation

Allowed term: `我当时把“能跑”理解成窗口能打开。`

Allowed confirmed quotation: `导师当时的原话是“先把导出跑通”。`

Rejected decorative cluster: `这次“完整”“稳定”“可靠”的“工程闭环”终于形成了。`

Quotation marks require a real term, title, label, document claim, or confirmed
original wording. They may not manufacture importance or decorate ordinary
abstractions.

## Rejected Em Dash

Input: `窗口已经打开——导出仍然失败。`

Expected repair: `窗口已经打开。导出仍然失败。`

Model-authored normal prose uses no em dash by default. Exact technical strings
and verbatim evidence remain governed by the existing scope exclusions.

## Article-Local Zero-Hit Ban

Current-article instruction: `本篇不要出现“说真的”和“这玩意”。`

Pass only when both expressions and their obvious inflectional variants have
zero hits across the scoped title, headings, body, transitions, and ending.
Do not expand this exact-expression ban into a general prohibition on every
conversational aside. The two expressions remain generally available elsewhere
in the voice palette.

Separate function-level instruction: `本篇不要用面向读者套近乎的填充语。`

This second instruction rejects direct functional equivalents as well as one
literal phrase because the user prohibited the reader effect, not a word alone.

## Cognition-Route Reconstruction

Source order:

1. Install the environment.
2. Reach the first successful launch.
3. Discover that Enter reaches the cancel branch.
4. Find that permission handling is still minimal.

Confirmed central learning: the meaning of a working build changed as more of
the operation chain became visible.

An accepted reconstruction may open with the Enter failure, return to what the
first launch had actually proved, and then connect the permission path to the
narrower definition of a working build. It may reorder sections, merge or split
paragraphs, and replace every title. It must preserve all claims, uncertainty,
and real temporal relations, and each attention jump must remain locally
intelligible.

Fail a result that treats humanization as phrase substitution only or requires
the source heading order to remain fixed.

## Bilingual Adaptation Without Paragraph Lock

Chinese:

```markdown
# Seamly2D 三周开发记录

## 开发尝试

回车最终走到了取消分支。权限判断也只保留了最简单的实现。

“能跑”的范围又缩了一次。
```

Accepted English:

```markdown
# Seamly2D Three-Week Development Log

## Development Attempts

Enter still reached the cancel branch, while permission handling remained minimal. That narrowed what I could honestly call a working build.
```

The English combines two Chinese paragraphs into one while preserving both
technical facts and the cognition change. Matching paragraph count or sentence
boundaries is not a release condition.

Confirmed reaction: `第三次还是同一个错误，我当时真的给整懵了。`

Accepted English intensity: `The same error came back for the third time, and it completely threw me.`

Rejected flattening: `The repeated error was mildly unexpected.`

Rejected amplification: `The repeated error devastated me.`

## Release Expectation

- Main and section titles read as concise learning-note indexes rather than compressed body prose.
- Related material may form substantial paragraphs, with natural length variation and a supported one-sentence break.
- Li Zhiyi's identity, established voice, and the confirmed emotional intensity are preserved.
- Model-authored em dashes reach zero scoped hits.
- Semantic colons and real quotations remain; template-label colons, decorative quotation, and dense repetition are repaired.
- Every current-article user prohibition reaches zero scoped hits.
- A substantial rewrite may rebuild the cognition route.
- Chinese and English preserve the same substance without matching paragraph boundaries.
- English adapts rhythm and idiom without lowering or amplifying the confirmed emotional intensity.
- Bare binary reframes are repaired in both languages.
- The confirmed Chinese qualifier remains available when it carries real nuance.
- Missing tests, implementations, evidence, authorship, and publication limits remain explicit.

## Verification

Run the stale-rule scan and report its hits:

```text
rg -n -S 'Reject these characters in scoped|Reader prose contains no `「」`|do not use Chinese corner quotes|Do not use Chinese corner quotes' CODEX.md MEMORY.md docs/content-workflow.md skills/engineering-note-writer/SKILL.md skills/engineering-note-writer/references skills/engineering-note-writer/tests/rubric.md
```

The stale-rule scan must return no hits. Also run:

- the installed `skill-creator/scripts/quick_validate.py` against `skills/engineering-note-writer`;
- `git diff --check`
- a commit-local diff guard proving the frozen trial paths did not change.
