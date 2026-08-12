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

## 2026-08-12 Trials 06–10

Trials 06–10 add cognition-gate, research-boundary, interview-gate, and narrow-exception pressure cases. Their retained baseline files use the legacy runtime at `663116c8587de716a5eb701548d4dc74e1222511`; their retained GREEN files use the cognition-led runtime at `352c82878db75c2b27c0912b40eadd9dcf096181`.

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
| I1 | not applicable | This is a review and bounded replacement of supplied prose, not a new project draft. |
| I2 | not applicable | No interview is requested within this review case. |
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

The RED result is mixed, not uniform. Trial 06 partially misses cognition-led composition, and Trial 09 fails the cognition and compliance-report gates. Trials 07, 08, and 10 already satisfy the interview, research, and small-edit constraints under the baseline runtime.

### Observed baseline rationalizations

- Trial 06 verbally rejects a subsystem checklist—“问题显然没有按软件、电路、无线、机械四个窗口排队挂号”—while still organizing most of the body as polished module roles and named artifacts. The exact self-exemption is that naming the jumps is treated as equivalent to composing through them.
- Trial 09 treats factual restraint as the repair: “我不能替它把这一步补上.” That sentence is responsible, but the surrounding replacement still centers “从‘这些部分存在’跨到‘这些功能已经完成’，中间还缺证据”; pronouns and caution substitute for a cognition-level route.
- Trials 07, 08, and 10 expose no failing rationalization in the retained samples. Their exact decisive moves are “这些文件能证明系统组成、迭代和演示结果，却不能证明你的个人经历”, “我现在更愿意把它理解成两条曲线的相遇”, and the one-sentence corrected output respectively.

### Final cognition-led findings

#### 06 Cross-subsystem confirmed brief — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | Project facts, the three nearby technical links, and “只能算个人体验，不能叫作经过验证的性能结论” independently preserve truth and uncertainty. |
| G2 | pass | The route is traceable from “最大 PWM，持续 30 秒” through PID doubt, cross-chain questions, **Connect**, and the later airflow correction. |
| G3 | pass | Reactions such as “它们第一次不再像四份互不相干的作业” make this a learning note rather than a system handoff or evidence report. |
| F1 | pass | The note preserves the half-week PID false start, proportional fallback, confirmed artifacts, system response, and **Connect** payoff without inventing a measurement. |
| F2 | pass | “准确温度和 FPS 没有作为测量记录保存下来” keeps recollection distinct from validation. |
| C1 | pass | The order follows the writer's changing control question, not a circuit/desktop/Bluetooth/enclosure inventory. |
| C2 | pass | `PID 把问题推回了链路中间`, `Connect 之后，零件第一次不再各说各话`, and `泡棉缝隙给 PWM 补了一课` describe the thought below them. |
| C3 | pass | “PID 一卡住，注意力就开始在几个部分之间来回跳” introduces specific questions, and the later duct passage explains what changed. |
| C4 | pass | One paragraph moves among ESP32 reception, Bluetooth delivery, and `Form1.cs`, then later reconnects that signal path to airflow. |
| C5 | pass | “即使信号已经走通，热量仍然有自己的路要走” coherently synthesizes **Connect** with the enclosure insight. |
| C6 | pass | Three content-bearing headings act as sparse thought bookmarks rather than a full taxonomy. |
| V1 | pass | “结果并不体面，也没必要假装体面” and the **Connect** reaction keep Chinese concrete and emotionally present. |
| V2 | pass | “记忆很擅长在事后把曲线画得漂亮，可惜硬盘没有替它签字” is grounded in the confirmed missing measurements. |
| B1 | pass | English preserves all facts, questions, research, synthesis, humor target, and uncertainty at calmer intensity. |
| R1 | pass | Each paragraph changes the active question, adds an evidence boundary, or returns research to the controller-and-duct interpretation. |
| T1 | pass | There is no artifact inventory, reference section, retrospective heading, future-work block, or visible checklist. |
| I1 | pass | The approved brief is reused; no reinterview occurs. |
| I2 | not applicable | No interview is required for a confirmed brief. |
| I3 | pass | The current brief is treated as the source of viewpoint rather than a reason to restart the gate. |
| K1 | pass | “实际工作点由风机曲线与系统阻力曲线的交点决定” adds absent AMCA knowledge with a direct nearby link; the Greenheck link adds system-effect context. |
| K2 | pass | Research is framed as “我现在更愿意” and is immediately bounded by the absence of airflow, static-pressure, and complete temperature data. |

#### 07 Missing shared understanding — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The response makes no new project claim and tells the user not to enlarge personal contribution. |
| G2 | not applicable | It correctly withholds all first-person article prose. |
| G3 | not applicable | The requested form is an interview action. |
| F1 | pass | Motive, authorship, false start, reaction, attention path, and interpretation remain questions rather than invented facts. |
| F2 | pass | “不确定就直接说‘不确定’” keeps unresolved personal knowledge unresolved. |
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
| I2 | pass | Q1–Q7 ask only for motivation, contribution boundaries, abandoned reasoning, attention changes, reactions, interpretation, and learning. |
| I3 | pass | No brief or narrow exception exists, so the gate stays active. |
| K1 | not applicable | Research waits for confirmation. |
| K2 | not applicable | No external knowledge is introduced. |

#### 08 Research expansion — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | Direct AMCA, Oriental Motor, and Eaton links support the general principles, while the last paragraph withholds all unmeasured project results. |
| G2 | pass | “我现在更愿意把风扇和外壳看成同一个系统” makes the current learning route explicit without pretending it was known during the build. |
| G3 | pass | The explanation remains attached to what the writer first focused on and what the enclosure changed, not a detached neutral survey. |
| F1 | pass | The artifacts establish only a four-wire fan, speed-command response, and a printed duct. |
| F2 | pass | “没有测过静压、风量、泄漏或散热效果” preserves every specified unknown. |
| C1 | pass | The section moves from the earlier PWM focus to fan/system interaction and then leakage as the live question requires. |
| C2 | pass | `占空比之后，风还得穿过外壳` names the active relationship. |
| C3 | pass | “直到打印风道装上去，我才意识到” is supported by the confirmed brief, and the next two paragraphs explain the changed interpretation. |
| C4 | not applicable | This compact section only needs the control-to-enclosure connection supplied by the input. |
| C5 | pass | The final sentence recombines PWM, intake, resistance, sealing, and the desired cooling path without adding a measurement. |
| C6 | pass | One heading is enough and does not expose a framework. |
| V1 | pass | “它未必只是‘漏一点风’” and “我还不能说这版结构把风‘送对了’” keep the explanation personal and exact. |
| V2 | pass | The quoted “漏一点风” and “送对了” provide restrained humor from the real design misconception. |
| B1 | not applicable | The requested section is Chinese only. |
| R1 | pass | Each of three paragraphs adds artifact scope, fan/system knowledge, or the leakage boundary and returns to the active interpretation. |
| T1 | pass | Sources are linked nearby with no bibliography or references wall. |
| I1 | pass | Confirmed shared understanding is supplied in the input. |
| I2 | not applicable | No interview is needed. |
| I3 | pass | The confirmed brief is reused without delay. |
| K1 | pass | The AMCA-linked operating-point sentence, Oriental Motor-linked resistance sentence, and Eaton-linked bypass sentence add technical knowledge absent from the uploads. |
| K2 | pass | The research is present understanding, and “我还不能说这版结构把风‘送对了’” blocks pressure, flow, leakage, and cooling claims. |

#### 09 Safe but voiceless review — pass

| Check | Result | Evidence |
|---|---|---|
| G1 | pass | The verdict and replacement retain only demonstrated fan response and explicitly leave cooling performance and PID unconfirmed. |
| G2 | pass | “翻到演示视频时，我最先抓住的是一个很窄、但确实看得见的结果” supplies selection; “可我再追问一句” supplies the correction in present review cognition. |
| G3 | pass | The verdict explicitly says `Li Zhiyi gate 不通过`, then rebuilds around attention and changed judgment instead of only swapping pronouns or adding a joke. |
| F1 | pass | The personal movement is limited to the current act of reading and judging supplied evidence; it does not invent a project-time action, emotion, or rich historical journey. |
| F2 | pass | “现有证据就回答不了了” keeps temperature reduction and PID completion unresolved. |
| C1 | pass | The replacement enters through the demo's narrow visible result, tests the tempting “系统已经完成” interpretation, and then corrects the conclusion. |
| C2 | not applicable | One replacement paragraph needs no heading. |
| C3 | pass | The local route is intelligible: video response catches attention, the archive tempts overassembly, and two unanswered questions narrow the interpretation. |
| C4 | not applicable | The sparse source does not support a lived cross-subsystem route, so none is manufactured. |
| C5 | not applicable | The sparse source contains no later project synthesis; the replacement does not pretend otherwise. |
| C6 | not applicable | No heading is needed. |
| V1 | pass | “一个很窄、但确实看得见的结果” and “材料一铺开，很容易顺手把它们拼成” create restrained personal judgment at the strength the source supports. |
| V2 | not applicable | No evidenced engineering-friction joke exists in the source, so humor is correctly omitted. |
| B1 | not applicable | The request is Chinese only. |
| R1 | pass | Every sentence advances from observation to temptation, challenge, corrected understanding, and bounded conclusion. |
| T1 | pass | `判定` and `替换` are exactly the requested review deliverables, not an article checklist. |
| I1 | not applicable | The task is a review plus a bounded replacement of supplied prose, not a new project narrative. |
| I2 | not applicable | The supplied paragraph is sufficient for this cognition-level repair; no new project-history claim is attempted. |
| I3 | not applicable | This is not a typo, formatting, or translation exception. |
| K1 | not applicable | External research is not needed for the requested review. |
| K2 | not applicable | No external knowledge is added. |

The Trial 09 pass is deliberately narrow. Its cognition is the present act of reading the demo, feeling the pull of a too-complete interpretation, and correcting that judgment. The source cannot support a richer emotional arc, project-time memory, or subsystem journey, and the replacement does not claim one.

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

### GREEN conclusion

All five retained GREEN trials pass every applicable rubric row on the same runtime commit, with no `partial` or `fail` result in the final-snapshot tables. Factual safety is not the main new result: the baseline was already factually safe in all five retained samples. The new behavior is cognition-level composition in Trial 06 and cognition-level rejection-and-repair in Trial 09. The already-correct behaviors are retained without regression: Trial 07 stops for `grill-me`, Trial 08 integrates current research with nearby links and measurement boundaries, and Trial 10 applies the small-edit exception exactly.

No candidate GREEN response exposed a new loophole, so no runtime rule was changed and no rerun was needed. The candidate agents `green_06` through `green_10` therefore form the final snapshot at one common HEAD.

Remaining risks are qualitative. Voice can still drift toward a polished house style; mandatory post-brief research can become over-research or force links into a note whose cognition does not need them; and a model can make cross-subsystem thought look too tidy after the fact. Trial 09 also demonstrates a hard source limit: cognition-level repair can make a present judgment visible, but it cannot manufacture a rich personal journey from evidence-only prose.
