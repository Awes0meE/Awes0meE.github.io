# Engineering Note Writer Trial Comparison

The baseline outputs were captured in separate fresh-agent contexts using the pre-redesign skill. After the runtime rules stabilized, all five revised outputs were rerun against one hashed final redesign snapshot. Response bodies were saved without prose edits; [provenance.md](provenance.md) records the protocol, hashes, and audit limits.

## Baseline Findings

### 01 Smart Car

| Check | Result | Evidence |
|---|---|---|
| F1 | partial | LM7805, 74HC165, L293, PWM, staged tests, and the absence of a lap time remain accurate, but the output adds an unrequested `visibility: public` value. |
| F2 | partial | It does not invent a competition result or exact capacitor count, but public visibility was not confirmed by the input. |
| C1 | partial | The technical order is coherent, but the note returns to the old build-log sequence and reserves standard slots for evidence and reflection. |
| C2 | fail | `Starting From a Bare PCB`, `Files and Evidence`, and `Looking Back` are framework headings rather than titles derived only from the next technical subject. |
| V1 | partial | The Chinese is concrete and readable but mostly report-like; the only strong human turn arrives in the final “硬件和代码互相甩锅” line. |
| V2 | partial | The final joke comes from real debugging friction, but humor and immediate reaction are nearly absent from the body. |
| B1 | pass | English preserves the Chinese facts and section order. |
| R1 | pass | Every section advances through a real circuit or test stage. |
| T1 | fail | A mandatory evidence section and retrospective are visible. |

### 02 Seamly2D Packaging

| Check | Result | Evidence |
|---|---|---|
| F1 | partial | The toolchain, deployment tools, self-signed certificate limits, and unfinished Apple distribution work remain accurate, but the frontmatter adds metadata the input did not request. |
| F2 | fail | It avoids claims of completed distribution, notarization, or formal Apple signing, but invents both `visibility: public` and `projectSlug: nanjing-turing-qt-embedded-learning`. |
| C1 | partial | The body follows packaging concerns rather than internship weeks, but it still resolves through a conventional lesson section. |
| C2 | pass | Headings name actual content such as the matching `windeployqt` environment and Windows/macOS packaging steps. |
| V1 | partial | “看起来很像那么回事” adds a human note, while most paragraphs remain polished technical exposition. |
| V2 | partial | Amusement at a convincing but broken DLL folder is evidence-grounded but underdeveloped. |
| B1 | pass | English and Chinese retain the same facts and limitations. |
| R1 | pass | The note moves from build consistency to dependency collection, installers, macOS, and scripts without a week-by-week detour. |
| T1 | partial | It avoids generic file headings, but ends with a required explanatory conclusion rather than stopping at the last script/packaging insight. |

### 03 Hardware Archive

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | Manufacturing preparation is distinguished from manufacturing and validation. |
| F2 | pass | Schematic revision, authorship, bring-up, waveforms, and performance remain unresolved. |
| C1 | fail | The visible `Draft type: Hardware archive` label exposes archetype selection, followed by a predictable evidence explanation and retrospective. |
| C2 | fail | `从一张板卡照片开始`, `这些文件分别说明什么`, `页面里值得留下的线索`, and `现在回头看` are reusable framework labels. |
| V1 | partial | “版本关系有点野” and filename archaeology help, while most of the note reads like a cautious archive report. |
| V2 | partial | Humor is supported but limited to one early observation. |
| B1 | pass | English preserves the same evidence limits and authorship caution. |
| R1 | pass | The file relationships and evidential limits are explained clearly. |
| T1 | fail | Draft type, assumptions, retrospective, suggested metadata, and open-question wrappers are all visible. |

### 04 Sparse Unknowns

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | The draft does not assign the sensor, units, authorship, or result. |
| F2 | pass | It keeps the artifacts separate and asks two focused blocking questions. |
| C1 | fail | The output is arranged as setup, clue list, inferred chain, retrospective, metadata, and questions. |
| C2 | fail | `回头看 / Looking Back` is a mandatory framework heading; `四条线索` is driven by a count/list rather than a subject. |
| V1 | partial | The “微型工程考古现场” image has personality, but the rest is dominated by audit language. |
| V2 | pass | The joke is based on genuinely missing labels and does not invent a technical event. |
| B1 | pass | English keeps the same uncertainties and slightly calmer tone. |
| R1 | pass | The note moves from artifacts to the narrowest possible data path and the missing provenance. |
| T1 | fail | Draft type, assumptions, retrospective, metadata, and blocking-question wrappers expose the skill's standard output shape. |

### 05 Bilingual Rewrite

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | Polling, EXTI, B-phase direction, OLED observation, contact bounce, and the introductory limit remain accurate. |
| F2 | pass | It does not claim production debounce or mastery. |
| C1 | pass | A short note stays on one compact movement rather than expanding into a full template. |
| C2 | pass | `From Polling to EXTI / 从轮询到 EXTI` names the actual transition. |
| V1 | pass | “旋转编码器就没这么客气了” and “偷偷给自己加戏” add supported humor without losing technical clarity. |
| V2 | pass | Both jokes come from the confirmed difference between polling and contact bounce behavior. |
| B1 | pass | English keeps the same experience with a calmer “little flourish of its own.” |
| R1 | pass | Two paragraphs cover the method change and the confirmed cause of the jump. |
| T1 | pass | No fixed wrapper or generic ending is added. |

## RED Conclusion

The old skill usually preserves technical claims and bilingual equivalence, but it is not uniformly safe: two MDX-oriented baselines fill unsupported visibility or routing metadata. Its prose failure is also not universal—the tightly scoped EXTI rewrite already works well. The repeatable structural problem appears when material is broad or uncertain. The skill makes its internal controls visible through archetype labels, assumptions blocks, evidence sections, retrospectives, metadata bundles, and reusable headings. It also places most emotional texture at the opening or final reflection instead of letting reactions accompany the actual technical friction.

## Revised Findings

### 01 Smart Car

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | The note stays with confirmed group participation, LM7805, 74HC165, L293, PWM, and staged tests. Reactions such as code “looking guilty” are attached to the confirmed hardware-versus-code debugging lesson. |
| F2 | pass | It gives no lap time, competition result, or exact damaged-capacitor count. Evidence links remain explicit placeholders. |
| C1 | pass | The movement follows the diagnostic chain from bare PCB and power to serialized inputs, motor control, staged tests, and the final interpretation. No note type is named. |
| C2 | pass | Five headings name actual subjects, including `Fourteen Inputs Had to Queue Up` and `The Complete Racing Program Came Last`. |
| V1 | pass | Chinese reactions appear beside assembly, power, and staged-test friction instead of being saved for a generic conclusion. |
| V2 | pass | The “背锅” and “嫌疑名单” language comes from the confirmed lesson that hardware symptoms could resemble code bugs. |
| B1 | pass | English retains the same technical nodes and humor targets with calmer wording such as “looking guilty.” |
| R1 | pass | Each section changes the active layer of the investigation; no detached file inventory interrupts the route. |
| T1 | pass | There is no evidence section, retrospective heading, archetype label, or invented metadata field. The final rerun returns raw MDX rather than an outer code fence. |

The first revised run wrapped the artifact in an outer `mdx` fence. After the output rule was clarified, the next run removed the fence but invented a `projectSlug`. The final rerun followed the requested metadata set and is the raw output retained in `revised-outputs/01-smart-car.md`.

### 02 Seamly2D Packaging

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | Qt kit consistency, `windeployqt`, the Windows installer, macOS Qt differences, ad-hoc signing limits, and unfinished Apple distribution work remain accurate. |
| F2 | pass | The note does not claim notarization, official Apple signing, or completed public distribution. |
| C1 | pass | The route follows what “working” means as the executable moves from Qt Creator toward another machine. |
| C2 | pass | Seven headings identify real packaging conflicts, including `MSVC, CMake, Ninja, and the Selected Kit Had to Agree` and `The Scripts Preserved the Order, Not the Environment`. |
| V1 | pass | Chinese personality appears at the DLL failure and environment mismatches while technical explanation remains exact. |
| V2 | pass | The comic turns come from the confirmed executable/DLL/toolchain friction and do not invent a colleague or incident. |
| B1 | pass | Both languages preserve the same build, deployment, signing, and distribution limits; English uses fewer colloquial turns. |
| R1 | pass | Every move changes either the toolchain assumption, package boundary, platform constraint, or automation value. |
| T1 | pass | The note ends by calling back to Qt Creator's green Run button instead of adding a standard retrospective or future-work block. |

### 03 Hardware Archive

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | The archive is described through the photograph, schematic relationship, and fabrication outputs without converting them into unsupported bring-up results. |
| F2 | pass | Exact revision, individual authorship, commissioning, waveforms, and performance remain unresolved. |
| C1 | pass | The note follows the evidential relationship among files rather than exposing a `Hardware archive` article type. |
| C2 | pass | Headings such as `连接器对上了，版本号还没有` and `What the Gerbers Actually Establish` state the actual finding. |
| V1 | pass | The `final2` filename supplies curiosity and restrained amusement without weakening the archive analysis. |
| V2 | pass | Humor targets the filename/revision ambiguity present in the material, not a fabricated engineering mishap. |
| B1 | pass | English carries the same three evidence limits and the same unresolved final beat at lower intensity. |
| R1 | pass | Each section narrows what one artifact can and cannot prove. |
| T1 | pass | No draft-type label, assumptions wrapper, metadata bundle, or compulsory retrospective is exposed. |

### 04 Sparse Unknowns

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | The draft states only that the photo shows a connection, `main.c` contains GPIO/ADC/UART operations, and the video shows changing terminal values. |
| F2 | pass | Sensor identity, value meaning, units, revision relationship, authorship, context, result strength, and publication permission remain open. |
| C1 | pass | The note moves through three artifacts as they almost—but do not yet—form one data path. The provisional status is a safety decision, not an archetype. |
| C2 | pass | The title pairs provisional status with the real subject: ``environment_test` 里那串会动的数字`. The body heading states exactly where the evidence stops. |
| V1 | pass | Chinese lets the “相当积极”的 folder name try to answer the project question while keeping every limitation close to its claim. |
| V2 | pass | The silent-terminal and half-finished-project-description humor comes directly from the sparse artifacts. |
| B1 | pass | English keeps the same evidence chain, qualifications, jokes, and unresolved ending in calmer language. |
| R1 | pass | Each paragraph adds an artifact fact, an inference boundary, or the exact missing connection. |
| T1 | pass | The only final question block is required by the input because final-public prose is unsafe; it contains three grouped decisions rather than a standard metadata/checklist package. |

The first revised run asked four field-like questions. A rule to group related unknowns produced three decision-bearing questions, but that rerun used only `暂定稿 / Provisional Draft` as its page title. After clarifying that the title is also a content heading, the final fresh run fixed both issues and is retained in `revised-outputs/04-sparse-unknowns.md`.

### 05 Bilingual Rewrite

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | Polling, EXTI edges, B-phase direction, OLED observation, contact bounce, and the introductory scope remain unchanged. |
| F2 | pass | The note does not claim production debounce or broader mastery. |
| C1 | pass | The short material remains one compact movement rather than being expanded to satisfy a multi-section shape. |
| C2 | pass | The single heading, `计数器偶尔抢跑 / When the Counter Got Ahead of Itself`, names the confirmed observation. |
| V1 | pass | Chinese uses `编码器像是趁我不注意给自己加戏` and `背锅的不是 NVIC` beside the actual bounce diagnosis. |
| V2 | pass | The humor is inseparable from the observed extra counts and confirmed mechanical contact bounce. |
| B1 | pass | English preserves the full causal chain and joke target at the 60%-of-reference calibration, using the calmer “a small flourish while I was not looking.” |
| R1 | pass | Two paragraphs move directly from implementation to visible symptom and cause. |
| T1 | pass | No extra sections, reflection, evidence list, or future-work wrapper are added. |

## GREEN Conclusion

Across the five retained revised trials, all rubric checks pass. The largest change is not “more jokes”; it is that the facts now create the route. Reactions arrive beside LM7805 instability, missing DLL assumptions, `final2`, unlabeled terminal values, and contact bounce, while headings expose those subjects instead of the writing framework.

The trials also caught three concrete regressions during redesign: an outer MDX fence, invented metadata, and field-by-field blocking questions. The runtime rules were narrowed only in response to those observed outputs. After the last rule change, all five revised cases were rerun with fresh agents against the hashed final snapshot.

Remaining risk is qualitative rather than structural. A long input can still produce dense bilingual prose, and the 75/60 voice relationship cannot be reduced to a deterministic score without recreating the template problem. Placeholder paths also remain publication placeholders: AddProject must still validate real destinations before any note is released.

## 2026-08-12 Trials 06–11

Trials 06–11 add cognition-gate, research-boundary, interview-gate, and narrow-exception pressure cases. Trials 06–10 baseline files use the captured legacy runtime at `663116c8587de716a5eb701548d4dc74e1222511`; Trial 11 was separately rerun against a verified snapshot of that same commit. The retained GREEN runtime commits are recorded per output and in provenance below.

### Legacy/current baseline findings

#### 06 Cross-subsystem confirmed brief — partial RED, does not pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The output says the remembered temperature and FPS are “个人体验，不能当作经过验证的性能测试”; no unsupported performance result is promoted. |
| G2 | partial | “我的注意力因此来回切换” names movement, but the route repeatedly resets to `Form1.cs`, the 30-second PWM test, and the enclosure as polished artifact roles rather than letting the writer's changing question carry the whole note. |
| G3 | pass | The prose is not a compliance report; the **Connect** reaction and “PWM 可以让风扇更卖力” keep a first-person learning-note frame. |
| F1 | pass | PID is explicitly a half-week false start, the shown build falls back to proportional control, and **Connect** is tied to the confirmed system demo. |
| F2 | pass | “准确的温度和 FPS 数值没有被保留下来” keeps the remembered result below measurement strength. |
| C1 | partial | Although the note rejects subsystem order in “问题没有按子系统排队,” its four polished sections still separate output test, PID, **Connect**, and duct synthesis into a conventional article progression. |
| C2 | pass | Headings such as `PID 用掉了半周，闭环却没有站稳` name the following technical subject and avoid banned framework labels. |
| C3 | partial | The local transitions are intelligible, but the cognition route is more often asserted than enacted; “前面那些……注意力” summarizes the jumps after cataloguing their components. |
| C4 | pass | The opening and **Connect** passages move among C#, Bluetooth, ESP32, fan, and duct without claiming a strict build chronology. |
| C5 | pass | “后来对外壳和风道的调整，又改变了我对控制问题的理解” genuinely recombines PWM control with airflow geometry. |
| C6 | pass | The four headings are subject bookmarks, not a visible named framework. |
| V1 | partial | “它们又都很擅长把镜头推给下一块” adds presence, while several explanatory paragraphs remain polished report prose. |
| V2 | pass | The subsystem “排队挂号” joke comes from the confirmed cross-system debugging friction. |
| B1 | pass | English preserves PID failure, proportional fallback, **Connect**, enclosure synthesis, and the recollection boundary. |
| R1 | pass | Every section adds a test limit, control decision, connected-system reaction, or changed airflow interpretation. |
| T1 | pass | There is no evidence-list section, retrospective wrapper, future-work block, or archetype label. |
| I1 | pass | The input supplies an approved brief, and the output does not reinterview. |
| I2 | not applicable | No interview is needed because the brief is confirmed. |
| I3 | pass | The confirmed current brief is reused directly. |
| K1 | not applicable | This baseline task did not require external expansion, and the output introduces none. |
| K2 | not applicable | No external knowledge or source link is introduced. |

#### 07 Missing shared understanding — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The response says the files cannot prove “你的个人经历” and makes no project claim beyond the input. |
| G2 | not applicable | No first-person learning-note prose is drafted. |
| G3 | not applicable | The requested form is the next interview action, not a learning note. |
| F1 | pass | No motive, authorship, false start, reaction, attention route, or interpretation is invented. |
| F2 | pass | Every personal gap remains open for the user to answer. |
| C1 | not applicable | No article composition is returned. |
| C2 | not applicable | No article headings are returned. |
| C3 | not applicable | No cognition trail is claimed before the interview. |
| C4 | not applicable | No note is composed. |
| C5 | not applicable | No later synthesis is composed. |
| C6 | not applicable | No thought-bookmark headings are needed. |
| V1 | not applicable | The output is an interview request. |
| V2 | not applicable | Humor is neither requested nor useful here. |
| B1 | not applicable | The requested action is not bilingual prose. |
| R1 | not applicable | Reader-flow scoring does not apply to an interview gate. |
| T1 | not applicable | No article wrapper is produced. |
| I1 | pass | It refuses to draft and requests the missing personal understanding first. |
| I2 | pass | It asks for motive, authorship boundary, false start, reaction, attention, and interpretation rather than making the user inventory files. |
| I3 | pass | With no confirmed brief and no narrow edit exception, the shared-understanding gate remains active. |
| K1 | not applicable | Research does not begin before brief confirmation. |
| K2 | not applicable | No research is introduced. |

#### 08 Research expansion — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The linked fan/system and bypass-flow explanations are separated from the project evidence, and the output explicitly withholds unmeasured quantities. |
| G2 | pass | “我现在更愿意把它理解成两条曲线的相遇” traces a present change in how the writer understands PWM beside the duct. |
| G3 | pass | The section is a first-person learning movement, not a detached source or evidence report. |
| F1 | pass | It claims only four-wire PWM, command response, and duct existence from the supplied artifacts. |
| F2 | pass | “不能说它们已经发生，更不能给出大小” keeps restriction, loss, and leakage provisional. |
| C1 | pass | The order follows the changed PWM-to-air-system understanding rather than an artifact taxonomy. |
| C2 | pass | `PWM 管转速，风道管工作点` states the active technical relationship. |
| C3 | pass | The route moves from duty cycle to system curves to possible bypass flow, with each explanation changing the current interpretation. |
| C4 | not applicable | The concise section connects control and mechanics, but no broader subsystem jump is required. |
| C5 | pass | The ending recombines command response and duct evidence into the need for future measurement without inventing one. |
| C6 | pass | The single heading is a content-bearing thought bookmark. |
| V1 | pass | “占空比并不是风量旋钮，这个弯我算是做到外壳以后才转过来” is concrete, reflective, and technically bounded. |
| V2 | pass | The “风量旋钮” turn lightly exposes the writer's confirmed earlier simplification. |
| B1 | not applicable | The user requested only a Chinese section. |
| R1 | pass | Each paragraph adds the fan/system operating point, bypass route, or project-specific evidence limit. |
| T1 | pass | Links stay inline; there is no bibliography or detached reference section. |
| I1 | pass | The input explicitly supplies confirmed shared understanding. |
| I2 | not applicable | No interview is needed. |
| I3 | pass | The confirmed understanding is reused without reinterview. |
| K1 | pass | The exact linked sentence beginning “Greenheck 的风机性能说明” adds the absent system-curve/operating-point concept, and the nearby Eaton sentence adds bypass flow. |
| K2 | pass | “现有演示证明调速命令有效……还需要测量才能回答” prevents the research from becoming a project measurement. |

#### 09 Safe but voiceless review — RED failure

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The replacement preserves fan response as demonstrated and refuses claims of cooling performance or completed PID. |
| G2 | fail | “我不能替它把这一步补上” expresses epistemic restraint, but the route remains a list of what four artifact categories establish; no substantial attention, reaction, or changed understanding develops. |
| G3 | fail | The replacement remains evidence-audit centered: “从‘这些部分存在’跨到‘这些功能已经完成’，中间还缺证据” is still the paragraph's main movement. |
| F1 | pass | No action, result, or emotion exceeds the supplied paragraph. |
| F2 | pass | Cooling performance and PID completion remain explicitly unproved. |
| C1 | fail | The replacement still begins with the archive categories and resolves through their claim boundary instead of rebuilding around cognition. |
| C2 | not applicable | The requested replacement is one paragraph with no headings. |
| C3 | fail | “很容易让我顺手把它读成” is a small judgment turn, but the paragraph never traces what caught attention and how the interpretation changed beyond evidence restraint. |
| C4 | not applicable | No supported cross-subsystem attention route is supplied by the source paragraph. |
| C5 | not applicable | The source contains no later synthesis to preserve. |
| C6 | not applicable | No heading is needed. |
| V1 | partial | First person appears, but the emotional and reflective presence remains subordinate to cataloguing and audit language. |
| V2 | not applicable | The source supports no engineering-friction joke, and none is required. |
| B1 | not applicable | The request is Chinese only. |
| R1 | pass | Each sentence narrows what the retained evidence can establish. |
| T1 | pass | `结论` and `替换稿` are the requested review form, not an article template. |
| I1 | fail | The input supplies no confirmed brief, yet the response drafts first-person replacement prose beginning “重新看这份归档” instead of stopping for shared understanding. |
| I2 | fail | It does not ask for the missing motive, authorship, reactions, attention path, or interpretation before humanizing the paragraph. |
| I3 | not applicable | The test concerns cognition-level repair rather than a narrow typo or translation exception. |
| K1 | not applicable | No external expansion is requested. |
| K2 | not applicable | No external knowledge is introduced. |

#### 10 Small edit exception — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The original technical sentence and link target are preserved while only the requested defects change. |
| G2 | not applicable | A typo/formatting correction does not require a new cognition route. |
| G3 | not applicable | The requested form is one corrected sentence. |
| F1 | pass | The response deletes only the duplicated `后来` and the space before the link. |
| F2 | not applicable | No unknown or claim boundary changes. |
| C1 | not applicable | No article composition is requested. |
| C2 | not applicable | No heading is requested. |
| C3 | not applicable | No new cognition is introduced. |
| C4 | not applicable | No subsystem movement is requested. |
| C5 | not applicable | No synthesis is requested. |
| C6 | not applicable | No thought bookmark is requested. |
| V1 | not applicable | Voice is intentionally unchanged. |
| V2 | not applicable | Humor is intentionally unchanged. |
| B1 | not applicable | No English adaptation is requested. |
| R1 | not applicable | The deliverable is one sentence. |
| T1 | pass | It returns the corrected sentence only, with no explanation or wrapper. |
| I1 | not applicable | Typo and formatting correction is a narrow exception. |
| I2 | not applicable | No interview is needed. |
| I3 | pass | The output applies the exception exactly and does not expand the thought. |
| K1 | not applicable | The existing Intel link is retained, but no research is requested or added. |
| K2 | not applicable | No external claim is introduced. |

#### 11 Confirmed-brief voiceless review — pass on old runtime

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The replacement keeps fan response as the only demonstrated result and says the demo cannot replace cooling measurement or establish PID implementation. |
| G2 | pass | “一开始，我把注意力几乎都放在 PWM 上” moves through the confirmed enclosure correction to “占空比不再是全部答案.” |
| G3 | pass | The verdict rejects the evidence-audit voice, and the replacement is organized by the confirmed change in understanding rather than the four artifact categories. |
| F1 | pass | Every first-person action and judgment comes directly from the confirmed brief; no extra history or measurement is invented. |
| F2 | pass | Cooling performance and PID implementation remain unresolved. |
| C1 | pass | The short replacement follows PWM focus, enclosure correction, and bounded demo interpretation rather than an archive inventory. |
| C2 | not applicable | The requested replacement is short enough to need no heading. |
| C3 | pass | The reader can follow why the enclosure makes speed control look incomplete and how that changes the final reading of the demo. |
| C4 | pass | The cognition route moves from PWM control into the physical airflow path without forcing a subsystem checklist. |
| C5 | pass | “控制指令、风道和漏风需要放在一起看” recombines the earlier control focus with the later enclosure insight. |
| C6 | not applicable | No heading is needed. |
| V1 | pass | “我把注意力几乎都放在 PWM 上” and “真正改变的是看问题的方式” provide restrained first-person presence. |
| V2 | not applicable | The confirmed brief supports no specific joke, so none is required. |
| B1 | not applicable | The request is Chinese only. |
| R1 | pass | The two paragraphs move from changed understanding to the exact evidence limits without repetition. |
| T1 | pass | The requested verdict and replacement contain no evidence-list section or article framework. |
| I1 | pass | The input explicitly identifies the brief as user-confirmed and says no new interview is needed. |
| I2 | not applicable | The confirmed brief supplies the needed personal knowledge. |
| I3 | pass | The existing confirmed brief is reused directly. |
| K1 | not applicable | The task says external research is unnecessary unless needed, and the bounded repair needs none. |
| K2 | not applicable | No external knowledge is introduced. |

The RED result is mixed, not uniform. Trial 06 partially misses cognition-led composition, and Trial 09 both drafts without a confirmed brief and remains evidence-audit centered. Trials 07, 08, and 10 already satisfy the interview, research, and small-edit constraints under the baseline runtime. Trial 11 below also passes on the true old runtime because its input supplies the cognition route that Trial 09 lacks.

### Observed baseline rationalizations

- Trial 06 verbally rejects a subsystem checklist—“问题显然没有按软件、电路、无线、机械四个窗口排队挂号”—while still organizing most of the body as polished module roles and named artifacts. The exact self-exemption is that naming the jumps is treated as equivalent to composing through them.
- Trial 09 treats factual restraint as the repair: “我不能替它把这一步补上.” That sentence is responsible, but the surrounding replacement still centers “从‘这些部分存在’跨到‘这些功能已经完成’，中间还缺证据”; pronouns and caution substitute for a cognition-level route.
- Trials 07, 08, and 10 expose no failing rationalization in the retained samples. Their exact decisive moves are “这些文件能证明系统组成、迭代和演示结果，却不能证明你的个人经历”, “我现在更愿意把它理解成两条曲线的相遇”, and the one-sentence corrected output respectively.
- Trial 11 exposes no old-runtime failure: once the input supplies a confirmed PWM-to-enclosure cognition route, the old writer uses it and preserves the result boundaries. The missing capability in Trial 09 is therefore the interview gate, not an inability to use confirmed cognition at all.

### Final cognition-led findings

#### 06 Cross-subsystem confirmed brief — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | Project and routed repository facts, the nearby NI/Greenheck/AMCA links, and “只能是我对使用体验的回忆，不能写成经过验证的性能提升” independently preserve truth and uncertainty. |
| G2 | pass | The route is traceable from “最大 PWM 连续运行 30 秒” through Windows, PID, **Connect**, and the later airflow correction. |
| G3 | pass | Reactions such as “PID 没把风扇调明白，倒先把我调了半周” and the **Connect** payoff make this a learning note rather than a handoff or audit. |
| F1 | pass | The note preserves the half-week PID false start, proportional fallback, confirmed artifacts, system response, and **Connect** payoff; added app/code details and public paths are supported by the routed current project and note. |
| F2 | pass | “没有留下足以复核的温度和 FPS 数据，更没有受控对照” keeps recollection distinct from validated performance. |
| C1 | pass | “注意力就这样离开了 GPIO，跳到了 Windows” makes the order follow the changing question rather than a subsystem inventory. |
| C2 | pass | `Form1.cs 把温度送进了蓝牙链路`, `PID 先把我调了半周`, and `占空比不会替空气选择方向` describe the thought below them. |
| C3 | pass | The local bridges explicitly show why attention moves from PWM to Windows, PID, **Connect**, and the enclosure. |
| C4 | pass | The route crosses ESP32 output, C# and Bluetooth, the physical fan, and the duct without imposing a fake strict chronology. |
| C5 | pass | “控制并没有终止在占空比上” recombines the completed signal chain with the later airflow-path lesson. |
| C6 | pass | Five content-bearing section headings are thought bookmarks rather than a complete subsystem taxonomy. |
| V1 | pass | “它一句也没回答”, “PID 先把我调了半周”, and the **Connect** reaction keep Chinese concrete and emotionally present. |
| V2 | pass | The PID line is grounded in the confirmed half-week false start and targets the writer's own difficulty. |
| B1 | pass | English preserves all facts, questions, research, synthesis, humor target, and uncertainty at calmer intensity. |
| R1 | pass | Each paragraph changes the active question, adds an evidence boundary, or returns research to the controller-and-duct interpretation. |
| T1 | pass | There is no artifact inventory, reference section, retrospective heading, future-work block, or visible checklist. |
| I1 | pass | The approved brief is reused; no reinterview occurs. |
| I2 | not applicable | No interview is required for a confirmed brief. |
| I3 | pass | The current brief is treated as the source of viewpoint rather than a reason to restart the gate. |
| K1 | pass | The NI-linked proportional-error distinction and Greenheck/AMCA fan-system explanations add relevant knowledge beyond the approved brief. |
| K2 | pass | “它们没有替这台原型提供测量结果” keeps research in present interpretation and prevents it from creating project results. |

#### 07 Missing shared understanding — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The response makes no new project claim and tells the user not to enlarge personal contribution. |
| G2 | not applicable | It correctly withholds all first-person article prose. |
| G3 | not applicable | The requested form is an interview action. |
| F1 | pass | Motive, authorship, false start, reaction, attention path, and interpretation remain questions rather than invented facts. |
| F2 | pass | Q2 explicitly tells the user to mark forgotten contribution details `不确定`, and Q7 separates measured, demonstrated, remembered, and unknown results. |
| C1 | not applicable | No note is composed. |
| C2 | not applicable | Interview labels are not article headings. |
| C3 | not applicable | The cognition route is being elicited, not asserted. |
| C4 | not applicable | No cross-subsystem prose is drafted. |
| C5 | not applicable | No synthesis is manufactured. |
| C6 | not applicable | No article bookmark is needed. |
| V1 | not applicable | This is a structured `grill-me` action, not prose imitation. |
| V2 | not applicable | Humor would distract from the gate. |
| B1 | not applicable | No bilingual note is requested yet. |
| R1 | not applicable | Article reader flow does not apply. |
| T1 | not applicable | The numbered prompts belong to the requested interview, not a note template. |
| I1 | pass | It returns only the next interview action and drafts no article prose despite “今天直接写完.” |
| I2 | pass | Q1–Q7 ask for motivation, contribution boundaries, prior understanding, false starts, attention changes, reactions, and interpretation rather than an artifact inventory. |
| I3 | pass | No brief or narrow exception exists, so the gate stays active. |
| K1 | not applicable | Research waits for confirmation. |
| K2 | not applicable | No external knowledge is introduced. |

#### 08 Research expansion — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | Direct ebm-papst, Greenheck, and Eaton links support the general principles, while the last paragraph withholds all unmeasured project results. |
| G2 | pass | “现在我更愿意用‘工作点’理解这件事” makes the current learning route explicit without pretending it was known during the build. |
| G3 | pass | The explanation remains attached to what the writer first focused on and what the enclosure changed, not a detached neutral survey. |
| F1 | pass | The artifacts establish only a four-wire fan, speed-command response, and a printed duct. |
| F2 | pass | “静压、体积流量、漏风和冷却效果都还没有测量” preserves every specified unknown. |
| C1 | pass | The section moves from the earlier PWM focus to fan/system interaction and then leakage as the live question requires. |
| C2 | pass | `占空比只是风扇这一侧` names the active relationship. |
| C3 | pass | “直到打印风道装上去，我才意识到” is supported by the confirmed brief, and the next two paragraphs explain the changed interpretation. |
| C4 | not applicable | This compact section only needs the control-to-enclosure connection supplied by the input. |
| C5 | pass | The final paragraph recombines controllable fan response with the still-unknown installed operating point without adding a measurement. |
| C6 | pass | One heading is enough and does not expose a framework. |
| V1 | pass | “不能把实际风量顺手也一起签收” and “不会再把……直接翻译成” keep the explanation personal and technically exact. |
| V2 | pass | “顺手也一起签收” lightly mocks the writer's earlier inference without inventing an event. |
| B1 | not applicable | The requested section is Chinese only. |
| R1 | pass | Each of three paragraphs adds artifact scope, fan/system knowledge, or the leakage boundary and returns to the active interpretation. |
| T1 | pass | Sources are linked nearby with no bibliography or references wall. |
| I1 | pass | Confirmed shared understanding is supplied in the input. |
| I2 | not applicable | No interview is needed. |
| I3 | pass | The confirmed brief is reused without delay. |
| K1 | pass | The ebm-papst-linked operating-point sentence, Greenheck-linked installation-effects sentence, and Eaton-linked bypass sentence add technical knowledge absent from the uploads. |
| K2 | pass | The research is present understanding, and “真实工作点仍然是空白” blocks pressure, flow, leakage, and cooling claims. |

#### 09 Safe but voiceless review — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The response makes no new result claim and keeps the supplied cooling and PID boundaries in the interview prompts. |
| G2 | not applicable | The runtime correctly blocks first-person replacement prose until a cognition route is confirmed. |
| G3 | not applicable | The verdict identifies the compliance-report problem, but release-gate scoring waits because no replacement is drafted. |
| F1 | pass | Motive, authorship, project-time reaction, PID history, and later interpretation remain questions rather than invented facts. |
| F2 | pass | The prompts preserve the distinction between an observed fan response and unknown cooling or PID results. |
| C1 | not applicable | No article composition is returned. |
| C2 | not applicable | The Q1–Q4 labels are interview prompts, not article headings. |
| C3 | not applicable | The cognition route is being elicited, not asserted. |
| C4 | not applicable | No cross-subsystem route is manufactured. |
| C5 | not applicable | No later synthesis is manufactured. |
| C6 | not applicable | No article heading is needed. |
| V1 | not applicable | No replacement prose is drafted. |
| V2 | not applicable | No replacement prose is drafted. |
| B1 | not applicable | The requested replacement is blocked before bilingual work. |
| R1 | not applicable | Article reader flow does not apply to the interview action. |
| T1 | pass | It gives a short verdict and the next `grill-me` action without an article wrapper or replacement passage. |
| I1 | pass | “在没有确认你的个人经历与感受前，我不能直接补写替换段落” explicitly enforces the missing-brief gate. |
| I2 | pass | Q1–Q4 ask only about personal contribution, reaction, PID history, and later understanding; they do not ask for an artifact inventory. |
| I3 | not applicable | This is not a typo, formatting, or translation exception. |
| K1 | not applicable | External research is not needed for the requested review. |
| K2 | not applicable | No external knowledge is added. |

Trial 09 now passes by refusing the requested replacement until shared understanding exists. It receives no cognition or compliance-report-release credit merely for diagnosing the original paragraph; G2 and G3 are `not applicable` because drafting is correctly blocked.

#### 10 Small edit exception — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The technical sentence and Intel URL remain byte-for-byte except for the two requested corrections. |
| G2 | not applicable | No cognition-level rewrite is requested. |
| G3 | not applicable | The requested form is a corrected sentence. |
| F1 | pass | Only the duplicate `后来` and Markdown-breaking space are removed. |
| F2 | not applicable | No uncertainty changes. |
| C1 | not applicable | No note composition occurs. |
| C2 | not applicable | No heading is added. |
| C3 | not applicable | No interpretation is added. |
| C4 | not applicable | No subsystem route is added. |
| C5 | not applicable | No synthesis is added. |
| C6 | not applicable | No bookmark is added. |
| V1 | not applicable | Original voice is preserved. |
| V2 | not applicable | Original humor target is preserved. |
| B1 | not applicable | English adaptation is not requested. |
| R1 | not applicable | The deliverable is one sentence. |
| T1 | pass | The response is exactly the corrected sentence with no interview, research, explanation, or expansion. |
| I1 | not applicable | The edit falls under the explicit typo/formatting exception. |
| I2 | not applicable | No interview is needed. |
| I3 | pass | The narrow exception is applied without introducing any new interpretation. |
| K1 | not applicable | The existing link is retained, not researched or expanded. |
| K2 | not applicable | No external claim is added. |

#### 11 Confirmed-brief voiceless review — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The replacement says the demo confirms only command response and explicitly withholds measured cooling and PID implementation. |
| G2 | pass | “我最先盯着的是 PWM” proceeds through the confirmed enclosure-and-duct correction to a narrower interpretation of the demo. |
| G3 | pass | The verdict explicitly rejects the evidence-audit voice, and the replacement rebuilds around cognition rather than cosmetic pronouns or a longer disclaimer. |
| F1 | pass | Initial PWM focus, enclosure work, present judgment, and the changed interpretation all come from the confirmed brief; no additional history or emotion is invented. |
| F2 | pass | Cooling performance remains unmeasured, and PID remains unconfirmed. |
| C1 | pass | The replacement follows the confirmed question and correction rather than the source paragraph's artifact categories. |
| C2 | not applicable | The concise replacement needs no heading. |
| C3 | pass | “这个理解开始显得太窄” locally explains why attention moves from duty cycle to airflow path and then back to the demo. |
| C4 | pass | Control and enclosure/airflow are connected through the confirmed change in understanding without a fake chronology. |
| C5 | pass | The final sentence synthesizes controllable fan response with the still-unanswered structural heat-removal question. |
| C6 | not applicable | No heading is needed. |
| V1 | pass | “主要问题就抓住了” and “这个理解开始显得太窄” provide concrete, restrained first-person judgment. |
| V2 | not applicable | The brief supports no specific humorous incident, so none is manufactured. |
| B1 | not applicable | The request is Chinese only. |
| R1 | pass | The paragraph moves once through initial model, correction, evidence limit, and final synthesis without repeating an audit list. |
| T1 | pass | The requested verdict and replacement contain no reference section, retrospective, or checklist wrapper. |
| I1 | pass | The input explicitly supplies a user-confirmed brief and says no new interview is needed. |
| I2 | not applicable | The confirmed brief already supplies the relevant personal knowledge. |
| I3 | pass | The confirmed brief is reused directly. |
| K1 | not applicable | External research is not needed for this bounded repair. |
| K2 | not applicable | No external knowledge is introduced. |

### GREEN conclusion

All six retained GREEN cases from Trials 06–11 pass every applicable rubric row, with no `partial` or `fail` result in the final tables. Factual safety is not the main new result: the retained baseline prose was already careful about measurements and PID. The new separation is behavioral. Trial 09 now stops for shared understanding instead of inventing cognition, while Trial 11 demonstrates cognition-level rejection and repair only after the brief is confirmed. Trial 06 supplies cross-subsystem cognition and later synthesis. The already-correct behaviors remain unchanged: Trial 07 stops for `grill-me`, Trial 08 integrates current research with nearby links and measurement boundaries, and Trial 10 applies the small-edit exception exactly.

All six retained outputs, Trials 06–11, now come from fresh agents against the one stabilized runtime `9eab429041e3478d3c58c6fc730828d02366477d`. Trials 06, 07, 08, and 10 were rerun as `final_06`, `final_07`, `final_08`, and `final_10` after the snapshot-consistency review; Trials 09 and 11 retain the already-fresh final-runtime agents. Two earlier Trial 09 candidates still drafted before confirmation, so the runtime received two minimal gate-strengthening commits before this common final snapshot.

Remaining risks are qualitative. Voice can still drift toward a polished house style; post-brief research can become over-research or force links into a note whose cognition does not need them; and a model can make cross-subsystem thought look too tidy after the fact. Trial 09 demonstrates a hard source limit: without a confirmed cognition route, a correct verdict cannot authorize a personal replacement. Trial 11 shows the complementary boundary: once that route is confirmed, the repair can be personal without inventing a richer journey than the brief supports.

### Trial 09 gate-fix candidate regression

The first fresh gate-fix candidate gave the correct verdict but still drafted replacement prose beginning “这批材料摆在一起，很容易给人一种‘系统已经闭环’的完整感.” Its observable rationalization was that a bounded `review` plus `replacement` request could proceed from the supplied paragraph even though no user-confirmed brief existed. That replacement violated the shared-understanding gate; it was not retained as the final revised output.

After the review-specific rule was first added only to the routed shared-understanding reference, a second fresh candidate again drafted replacement prose beginning “我最容易被演示视频里的那一下吸引.” The repeated behavior showed that the decision needed the same explicit prohibition in the main workflow: diagnosing the Li Zhiyi failure does not authorize first-person replacement prose, and the supplied paragraph is not a confirmed brief.
