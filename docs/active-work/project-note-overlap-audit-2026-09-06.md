# 项目主页与学习笔记重合审阅

2026-09-06。范围为 8 个项目、按 `projectSlug` 关联的 24 篇公开笔记，共 32 页。Claude Chime 以本次获批新版为基准，其他页面以 `a22072a` 中的内容为基准。这是最初的审查快照。用户随后明确批准执行：七个主页已在本地重构，Claude Chime 主页仅维护暂挂链接；15 篇笔记暂挂、9 篇保留。当前清单与恢复说明见 [执行记录](../experiments/project-homepages-2026-09-06/README.md)，新选题见 [候选题目](project-note-topics-2026-09-06.md)。下文保留原始审查意见，不作为当前执行状态。

**后续决定：** 用户已确认“主页为主干、笔记为枝叶”的分工，并要求补入 Skill。本地 writer 已接入选题与跨页面检查。下文逐篇建议仍待选定范围后实施，不能把先前提到的 bring-up 或三周日志当成已选题目；新笔记应围绕具体问题展开研究，避免再次完整复述项目推进过程。

## 结论

值得处理的是相同故事和推理过程被完整讲了两遍。换词无法解决这个问题。项目主页与笔记可以共享背景、重要结果和必要的不确定性，但应当在展开的问题、证据和读者收获上分工。

按本次编辑判断，4 个项目重复较明显，2 个适合局部精简，2 个分工较好。这是基于正文主题、段落路线和展开深度的判断，不是字符串重复率或自动评分。扫描覆盖中英文内容与关联关系，逐组核对主线；原始文档型笔记按来源、正文主题与目录判断用途，不把重复的代码、原文和中英译文当成冗余。

页面代码只在项目正文后显示关联笔记的标题链接，没有把笔记全文自动插入。主要问题来自写作分工，并非页面重复渲染。

## 逐项目处理建议

| 项目 | 笔记数 | 判断 | 重合在哪里 | 建议分工 |
| --- | ---: | --- | --- | --- |
| [Claude Chime 电源板](../../content/projects/claude-chime-hardware-power-board.mdx) | 1 | 明显，局部可解决 | 冷启动现象、两路升压理由、5.5 V/4.984 V 取舍、PROG 控制、基础测试与客户反馈，在两页都有较完整叙述 | 保留本次获批主页。冷启动笔记保留排查证据、保护推断和待做实验，压缩供电设计回顾与交付清单 |
| [Arduino 循迹小车](../../content/projects/arduino-smart-car-line-tracker.mdx) | 1 | 明显，整条路线重讲 | 两页均从裸 PCB、焊接、电源、14 路输入、L293、六项测试，走到三档转向和前 5% | 主页保留个人任务、总体信号链、比赛取舍与结果；笔记围绕首次 bring-up，展开装配顺序、分模块测试和故障定位 |
| [Arduino 两位计数器](../../content/projects/arduino-digital-clock-counter.mdx) | 1 | 明显 | 公共端接错、BCD 拆位、六脚按键测通断、源码缺失及调试习惯，在两页重复 | 主页保留搭建职责、器件不符造成的关键转折、完成情况；笔记负责共阳/共阴电流路径、译码器差别、按键拓扑和分步诊断 |
| [南京图灵 Qt/Seamly2D](../../content/projects/nanjing-turing-qt-embedded-learning.mdx) | 5 | 明显，集中在三周日志 | 主页和三周日志都依次讲下载慢、Qt5/Qt6、账号角色、windeployqt、Windows 换机、Mac 签名、验收与成长 | 主页讲进入大型仓库后完成的功能、构建交付与结果边界；三周日志需另选具体问题深入研究，例如本地角色状态或干净机器的运行依赖；四篇原文型笔记继续提供可复查步骤和资料 |
| [DIY 压风式散热器](../../content/projects/juanyun-diy-cooling-prototype.mdx) | 1 | 局部精简 | Fan Speed 实为占空比、5 秒发送、30 秒峰值、PID 未完成与 Connect 场景重复 | 主页保留结构/控制的整机选择、两版硬件差别与使用结果；把详细采样节拍、比例映射和后来的代码反思集中到笔记 |
| [天津 STM32 实习](../../content/projects/tianjin-metro-stm32-foundation.mdx) | 5 | 局部精简，兼有笔记间重合 | 主页展开了环境配置、外设原理、16 点插值和主循环；数篇笔记又重复“目标查表到 PWM，实测只显示”的完整说明 | 主页保留学习路线、应用贡献与综合 demo；五篇笔记按工具链、事件时序、采样执行、调度集成、控制阅读分工，给 16 点映射指定一篇详细出处 |
| [卷云相变散热器系统](../../content/projects/juanyun-thermal-hardware.mdx) | 9 | 分工较好 | BaseUnit 起点、裸机选择、首次遥测场景与公司反馈有少量回顾 | 保留系统总览与各篇深度说明。局部压缩笔记开头/结尾的同一场景；公司测试数字继续集中在主页，技术笔记保留与自身结论直接有关的测试边界 |
| [无感 FOC 学习路线](../../content/projects/sensorless-foc-learning-route.mdx) | 1 | 分工较好 | 六步驱动对比、开环运行点、Codex 协作、接管未完成和远期方向重复 | 主页保留自制硬件、制造、台架和阶段结果；笔记保留波形层次、dq、SVPWM/TIM1、角度误差与接管条件，缩短开头对比和末尾项目经历回顾 |

## Claude Chime 的具体改法

当前[冷启动笔记](../../content/notes/claude-chime-cold-start-battery-protection.mdx)分为“冷启动排查”“双路升压”“电源路径”“台架验证”。建议保持一篇独立完整的排查文章，按以下内容取舍：

1. **保留冷启动排查的主体。** 4.03 V 降到 1.49–1.57 V、静态电阻、台式电源反例、示波器接入/断开现象、外接电源后的再启动，构成诊断证据。尤其要保留电池包输出端与电芯的区别，以及外接电源时连接状态未知。
2. **保留双路升压对启动的影响。** 简短交代两个负载为何分开，重点放在两路仍向同一电池取能、软启动不等于已经测得总输入电流、尚未验证的启动协调方案。这里增加的是对冷启动的解释。
3. **压缩“电源路径”。** 5.5 V/4.984 V 的选型经历与 MCP73831/PROG 的完整工作说明由主页承担；笔记仅保留会影响故障解释的供电状态，链接到主页“供电与充电控制”。没有证据表明充电回路导致这次故障，不能为了串故事把二者写成已证实因果。
4. **压缩“台架验证”。** 限流电源和空载结果在排查前段保留；ADC、客户整机反馈、一次打板与无飞线等完整交付清单留在主页。笔记只保留当前诊断仍依赖的测试条件与未测项目。
5. **收尾停在排查认识。** 电压塌陷究竟反映什么、还缺哪项电流或状态测量，足以结束这篇文章。无需再完整回顾整个电源板项目。

这样即使读者直接从搜索进入笔记，也能理解硬件和故障；从主页点进来的人则能看到新的测量、推理和未解问题。两页必要的结果与边界仍可以各自保留简短表述。

## 24 篇笔记的用途与动作

以下均为建议；原文型资料不因去重而被删改历史表述，现今补充应放在原文之外。

| 所属项目 | 笔记 | 应保留的独立内容 | 建议动作 |
| --- | --- | --- | --- |
| Claude Chime | [电池冷启动排查](../../content/notes/claude-chime-cold-start-battery-protection.mdx) | 测阻、波形、保护机制推断、启动实验 | 按上文集中主题 |
| 小车 | [第一次完整 Bring-up](../../content/notes/arduino-smart-car-line-tracking-learning-note.mdx) | 焊接顺序、六项模块测试、黑胶带传感检查 | 减少竞赛成绩与整机原理的二次叙述 |
| 计数器 | [数码管不亮](../../content/notes/arduino-digital-clock-counter-course-note.mdx) | LS47/CD4511、电流路径、按键拓扑、诊断顺序 | 主页减细节，笔记集中故障分析 |
| DIY | [Fan Speed 与占空比](../../content/notes/juanyun-diy-cooling.mdx) | 传感器身份、Task.Run 时序、10 秒单路节拍、30 秒峰值与同步日志 | 保留主体，主页压缩控制实现细节 |
| 南京 | [三周开发记录](../../content/notes/turing-three-week-development-log.mdx) | 角色状态或运行依赖等可单独展开的问题，以及直接相关的失败和修正 | 先确定研究问题，避免重新讲完整三周经历；工具命令转引原文记录 |
| 南京 | [Qt6 首跑原文](../../content/notes/turing-qt-seamly2d-first-run.mdx) | 安装、Kit、工程修改与实际报错处理 | 保留可操作原文，叙事页缩短同一流程 |
| 南京 | [Release 打包原文](../../content/notes/turing-release-packaging-cross-platform.mdx) | 依赖、证书、安装包命令和当时验证范围 | 保留原文；后来的换机测试只在外部注记或叙事页补充 |
| 南京 | [CMake 与编译原文](../../content/notes/turing-cmake-build-logic.mdx) | 构建系统、工具链、ABI、包发现的学习资料 | 保留，不因篇幅长就视为重复 |
| 南京 | [sm2d XML 样例](../../content/notes/turing-sm2d-xml-data-format.mdx) | README 原话与 XML 样例本体 | 保留原文与样例；历史“任意电脑”措辞不当成当前验证结论 |
| 天津 | [环境搭建](../../content/notes/tianjin-stm32-environment-setup.mdx) | 编译、下载、执行三阶段和最小输出验证 | 主体保留，主页缩短配置与引脚细节 |
| 天津 | [GPIO/EXTI/Timer](../../content/notes/tianjin-stm32-gpio-exti-timer.mdx) | 电平、边沿、计数、时钟与事件消费 | 缩短开头工具链回顾和编码器消费示例 |
| 天津 | [PWM/UART/ADC](../../content/notes/tianjin-stm32-pwm-uart-adc.mdx) | 16 点标定、插值、比较寄存器、数据路径 | 作为 16 点映射的详细出处 |
| 天津 | [综合 main()](../../content/notes/tianjin-metro-environment-monitoring-stm32.mdx) | 快慢变量、flag、模式、共享状态与阻塞限制 | 查表算法只保留调用关系，链接详细笔记 |
| 天津 | [PID/轨道控制阅读](../../content/notes/tianjin-rail-control-pid-atc-reading.mdx) | 限幅与反馈的区别、PID 到 ATP/ATO/ATS 的尺度变化 | 16 点查表只用作短例，避免再次完整解释 |
| 卷云 | [BaseUnit 固件](../../content/notes/juanyun-baseunit-firmware.mdx) | UI 状态、按键 latch、DMA、Flash 日志 | 保留，缩短与主页相同的起点及结尾 |
| 卷云 | [ACUnit 三板 bring-up](../../content/notes/juanyun-acunit-board.mdx) | 电压/电流、逐外设验证、排线问题 | 保留，测量明细由此页承担 |
| 卷云 | [ACUnit 裸机固件](../../content/notes/juanyun-acunit-firmware.mdx) | 五档节拍、deadline、非阻塞回零与慢任务避让 | 保留完整推理，主页保留选择理由即可 |
| 卷云 | [自动制冷控制](../../content/notes/juanyun-acunit-automatic-control.mdx) | 双周期、过热度、安全仲裁、启动与标定 | 保留，后期实现/测试边界必须留在附近 |
| 卷云 | [ControlPanel 与维护](../../content/notes/juanyun-production-line-control-panel.mdx) | 可观测性、控制权、时钟回退、回归覆盖限制 | 主体分工已好；精简末尾首次连通回顾 |
| 卷云 | [V2.0/V2.1 框图](../../content/notes/juanyun-acunit-hardware-revision-archive.mdx) | 两种图的阅读方式及不能证明的改版历史 | 保留，与实物 bring-up 区分 |
| 卷云 | [DHT 小板任务书](../../content/notes/juanyun-dht11-am2302-board.mdx) | 文档脚位冲突、接口/结构约束、待验收事项 | 保留，不合并为本人的已完成板卡故事 |
| 卷云 | [EEV/BLDC 归档](../../content/notes/juanyun-legacy-actuator-archive.mdx) | ULN2003A、四相序列、阻塞控制与归档范围 | 保留，与后期 ACUnit 非阻塞实现明确分开 |
| 卷云 | [硬件 SOP 原文](../../content/notes/juanyun-hardware-sop.mdx) | 可复用的需求、评审、发板、测试与归档表单 | 保留原文，不当作又一篇项目总结 |
| FOC | [无感接管](../../content/notes/sensorless-foc-handoff.mdx) | 四层波形、坐标变换、SVPWM/TIM1、速度与角度、接管条件 | 保留技术主体，精简首尾经历与远期目标 |

## 已采纳的写作流程检查

扫描时，writer 的主流程与最终检查尚未要求先比较同项目的所有页面，主页和笔记因而容易被写成两篇完整项目故事。用户确认后，规则已落入 [`project-note-division.md`](../../skills/engineering-note-writer/references/project-note-division.md) 及主流程、自查门禁。

当前流程要求：

1. 在第 1 步材料检查时读同项目的主页与全部关联笔记，列出每篇要回答的具体问题。
2. 第 2 步在题目未定时简短询问用户想深入了解什么，也可结合材料提出候选问题。用户已选题则直接沿用，委托代选则自行确定；不把新研究虚构成当时的兴趣或经历。
3. 在第 5 步安排认知路线前，确定每个重要经历、论证和测量明细在哪篇完整展开。其他页面只给理解当前问题所需的短背景或结果，并链接到详细出处。
4. 第 12 步联合检查整个项目组：看完主页再点笔记，是否增加了新的推理、证据、步骤或可复用方法？两篇是否仍讲完同一故事，哪怕换了词或顺序？中英是否执行了同样的取舍？

主页仍应保留人做选择和修正判断的过程，不能压成冷冰冰的简历清单。笔记也应能独立阅读。不要设机械重复率或统一字数；保留必要背景、核心结果、测量限制及相关图像，同时避免同一段完整推理占据多个页面。

## 原审查时的实施顺序

已批准的 Claude Chime 新主页已通过 PR #35 发布。后续建议用其冷启动笔记试做一次专题重构，再选择小车、计数器和南京图灵的具体学习问题。DIY 与天津可局部重新分配；卷云和 FOC 不需要全面重构。每次仍以一个项目组为单位，提供中英对比后再发布；本次扫描及后续 Skill 更新没有删除笔记、修改路由或批量重写正文。
