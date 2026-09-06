# Chinese Sentence Gate Regression

Current-rule qualitative cases for `references/chinese-sentence-gate.md`.
These are review inputs and expected behavior, not captured fresh-model outputs
or an automatic grammar benchmark. Judge the diagnosed relationship and the
preserved meaning; the illustrative repairs are not required exact wording.
All engineering events below are fixture assumptions, not new portfolio facts.

## Eight Fault Cases

| ID | Confirmed context and input | Expected behavior |
|---|---|---|
| Z01 | Each sample is read before it is logged. `程序先记录再读取这次 ADC 采样值。` | ZH-1: restore the confirmed read-before-log order; do not invent a buffering stage to justify the reversed sequence. |
| Z02 | Voltage was measured, and the cause was investigated but not established. `我测量了输出电压和故障原因。` | ZH-2: `测量` fits voltage, not cause. A repair such as `我测量了输出电压，并排查了故障原因。` preserves the unfinished diagnosis. `查明了原因` would invent a result. |
| Z03 | The test showed the voltage change before reset. `通过这次测试，使我看清了复位前的电压变化。` | ZH-3: recover the missing main subject by removing `使` or restructuring the sentence; keep the observed voltage change. |
| Z04 | A drop of approximately 0.2 V is all that is known; no emphatic repetition is intended. `输出电压下降了大约 0.2 V 左右。` | ZH-3: remove one redundant approximation marker, retaining approximate 0.2 V. Do not turn the measurement into an exact value. |
| Z05 | An interrupted supply is the confirmed reset cause. `这次复位的原因是由于供电中断造成的。` | ZH-4: disentangle the mixed cause constructions, for example `这次复位是供电中断造成的。` Do not change the established cause. |
| Z06 | Two boards are mentioned; the source does not say which was hot. `我把开发板接到电源板上，它很快就发热了。` | ZH-5: identify both possible antecedents of `它`. Recover the referent from evidence or keep the draft provisional and ask which board. Do not choose the power board because it sounds plausible. |
| Z07 | The purpose of adding a check is to prevent crashes. `为了防止程序不再崩溃，我加了一次检查。` | ZH-6: repair the unintended negation, for example `为了防止程序再次崩溃，我加了一次检查。` A prevention goal does not prove that crashes stopped. |
| Z08 | Only the order of external-supply connection and successful restart is known. `接入外部电源后再次启动成功，所以外部电源修复了保护电路。` | ZH-6 plus Truth: chronology does not establish repair or mechanism. Retain the sequence, qualify the causal interpretation as unknown, and do not strengthen the result. |

## Six Positive Controls

| ID | Input and context | Expected behavior |
|---|---|---|
| P01 | The actor is already clear. `我把电源接好，又测了一遍输出电压。` | Pass: the second clause can omit `我`; do not add subjects everywhere. |
| P02 | A section heading. `电池冷启动排查` | Pass: a navigation label does not need a complete subject-predicate sentence. |
| P03 | Repeated board failures and the user's amused frustration are confirmed. `板子又闹脾气了。` | No six-category failure merely for native personification; retain the existing L1 licensed-frame and evidence checks. |
| P04 | Two failed attempts are confirmed, with emphasis on the repetition. `第一次没启动。第二次，也没启动。` | Pass: purposeful repetition and recoverable omission are not automatic redundancy or missing-component faults. |
| P05 | The source says each sample is read before logging. `程序先读取这次 ADC 采样值，再把它记录下来。` | Pass: the same technical terms as Z01 now express the confirmed sequence. |
| P06 | As a statement of this test's question. `这次测试要检查板子能否正常启动。` | Pass: a two-sided question is legitimate and does not claim a successful result. |

## PCB Regression

ID: Z09. Input:

> 落到这块 PCB 上，更直接的要求是把两边的开关节点，连同输入、整流、输出电容回路都收紧。

Expected: identify ZH-2 and ZH-5 with the specific predicate-object and modifier
scope problems. Do not merely label it “AI-like”, blame the comma, or ban
`落到` globally. Do not infer from this sentence whether the intended property
is node copper area, trace length, loop area, or component placement.

Repair variant with an explicitly supplied meaning: the intended design
requirements are to reduce the copper area of each switching node and the area
of the associated current loops; implementation and measurements are unknown.
A valid repair may say `布局时，需要减小两路开关节点的铜箔面积，并缩小相关电流回路的面积。`
Reject `我已经把……缩小了` or a claimed EMI improvement. These add implementation
or results to a requirement. Never apply this fixture assumption to the actual
Claude Chime page without its own supporting evidence.

## Five Workflow Cases

| ID | Situation | Expected behavior |
|---|---|---|
| W01 | A confirmed brief and Chinese editorial pass exist, but Z02 remains when English is requested. | Run the independent gate at the Step 10 entrance, repair Chinese within the known meaning, then derive English. Do not translate first and use English to guess the Chinese intent. |
| W02 | Chinese passed before English, but a final edit introduces Z04 into the ending. | The Step 12 full Chinese recheck catches it. Retain approximation when repairing, align any affected English, and repeat the existing English/bilingual checks. An earlier pass is insufficient. |
| W03 | The task is a faithful English-only edit, and an existing-rule idiom reads `The protected battery added one surprise.` | Mark the six-category Chinese gate not applicable. Apply existing English rules and evidence review, without imposing Chinese subject or word-order criteria or creating a Chinese draft. |
| W04 | A narrow sentence repair has a current confirmed brief. Its reaction is `第三次还是同一个错误，我当时真的给整懵了。` | Preserve the confirmed intensity and repair only an actual identified fault. Do not require another interview, convert the prose into a neutral report, or add the six categories to the English voice rules. |
| W05 | A bilingual article contains an authored Chinese title, a Chinese sentence around `ADC_BAT`, English prose, and an exact quoted log containing faulty Chinese. | Inspect the Chinese title and authored sentence, preserve the exact token and log, and keep English under its existing rules. Technical syntax does not shelter surrounding authored prose; verbatim evidence is not silently corrected. |

## Review Procedure

For these 20 cases, record the relationship that passes or fails, any sufficient
repair, and any meaning or language-scope change introduced by that repair.
Re-read the repaired Chinese in context. Check that English is still evaluated
by the pre-existing rules. A search for labels or a successful build alone does
not demonstrate behavioral compliance. Keep results explicit about whether the
review was manual or captured from an independent model run.

Also run the skill validator, reference-path checks, UTF-8 validation, and
`git diff --check`. Keep frozen Trials 01-11 and their provenance unchanged.
