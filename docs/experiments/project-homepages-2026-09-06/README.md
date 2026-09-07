# 七个项目主页重构与笔记暂挂

2026-09-06。用户已确认这版主页并授权发布；此目录保留审阅、恢复和验证资料。具体合并与部署结果以关联 PR 和 GitHub 部署记录为准。

- 用户授权：重写 Claude Chime 以外的七个项目主页；暂挂与主页重复的学习笔记，保留可恢复状态；只整理后续选题，不写新笔记。
- 分支：`docs/refactor-project-homepages`，从包含最新分工规则的 `ce015f2a8ca035d3dc0582b2bc5e58e933370539` 建立。此前的 `feat/project-note-division` 分支保留。重构开始时远端 `main` 的基准为 `b43c83b`。
- 当时数量：8 个主页，24 个笔记源文件，其中 9 篇公开、15 篇暂挂；84 条媒体及所有 public/uploads 文件不变。
- [七个主页中英前后对照](comparison.html)可用本地 HTTP 服务打开；实际主页位于 `/work`。对照中的旧文本是历史版本，不代表最新事实判断。
- [后续选题](../../releases/remaining-engineering-notes-2026-09-07/topic-decisions.md)给每个项目一个优先题和一个备选题，另说明卷云现有自动控制笔记继续承担的主题。

## 用户审阅后的文案精简

用户认可这一轮的大部分文案，要求去掉反复声明证据边界的盘点口吻。七个主页已同步精简中英文中的缺失测试清单、附件盘点和“不能据此声称”的解释。实际故障、未完成的尝试、自然的反馈归属与必要条件仍按经历书写。用户进一步明确要求移除这道检查，因此写作 Skill 已删除独立的“编排保真／信息不丢失”门禁及逐项保留旧稿信息的要求。主流程、英文适配、正文门禁及当前回归案例同步更新；原有真实性检查负责保留陈述的准确性。

`pre-boundary-feedback/` 保存此次反馈前的八份页面与上一轮验证记录；`before/` 仍是整批重构前的原稿。`boundary-chinese-gate.json` 记录本次中文先行审阅，最新结果以 `verification.json` 为准。

随后按用户意见复查七个结尾：DIY 在温度与帧率数据后补上自然收尾，南京图灵将已有的个人感受放回最后。其余五个结尾已经完整，予以保留。Skill 第 11 步明确允许普通结尾段，避免强行升华，同时防止删减后只剩数据或文件信息便突然结束。

## 后续状态

2026-09-07，小车、两位计数器和 DIY 散热器已完成六篇新专题并获准发布。三个旧笔记正文已由新稿替换，独立旧稿备份按用户要求删除；不要用本目录的旧清单覆盖新稿。其他项目的暂挂来源继续保留。当前状态见 `../../active-work/portfolio-copy-rewrite.md`。

## 原暂挂批次的恢复方法

笔记仅把 `visibility: public` 改为 `visibility: private`。正文、标题、摘要、日期、关联项目及全部附件不变；这是使用现有网站的显示开关，未增加删除或跳转机制。索引与项目关联列表不再展示暂挂稿，直接访问其详情路径返回 404。

完成某个专题的重构与跨页面检查后，将该文件的 `visibility` 改回 `public` 即可恢复。若只是要撤销此次暂挂，也可直接恢复这一字段，不需要找回已删文件。`manifest.json` 记录了每篇原文件的 SHA-256，基准提交保存完整原稿。

Claude Chime 主页没有重构。为避免链接到暂挂的冷启动笔记，仅移除原末段的两句链接文字：

- English: `The full investigation is in the [cold-start debugging note](/notes/claude-chime-cold-start-battery-protection).`
- 中文：`完整过程写在[冷启动排查笔记](/notes/claude-chime-cold-start-battery-protection)里。`

恢复该笔记后，可按上下文恢复这两句；原主页完整副本在 `before/claude-chime-hardware-power-board.mdx`。不要在已经有后续修改时整页覆盖。

小车原笔记的 Nano 数字引脚数存在旧误述；本次保留原稿，没有借暂挂改正文。今后恢复前须核对 Arduino 官方 pinout：D0 到 D13 为 14 个编号引脚，部分模拟引脚也可作数字 IO，不能以“只有 13 个”作为完整理由。L293 也不能按 MOSFET 驱动器解释。

## 24 篇笔记处理清单

| 笔记 | 本次动作 | 依据 |
| --- | --- | --- |
| `arduino-digital-clock-counter-course-note` | 暂挂 | 公共端、BCD、六脚按键与调试习惯的经历重复。 |
| `arduino-smart-car-line-tracking-learning-note` | 暂挂 | 从焊接、电源、输入、驱动到比赛成绩重复完整项目路线。 |
| `claude-chime-cold-start-battery-protection` | 暂挂 | 重复展开双路升压、供电取舍、充电与交付过程；待集中冷启动诊断。 |
| `juanyun-acunit-automatic-control` | 保留公开 | 独立技术问题或来源保真资料；必要背景不当作重复项目叙事。 |
| `juanyun-acunit-board` | 暂挂 | 设计、装配、分阶段验证至整机联调的小项目叙事与主页重合。 |
| `juanyun-acunit-firmware` | 暂挂 | 裸机选择、提前分层与后期扩展的过程与主页重合，待聚焦时序问题。 |
| `juanyun-acunit-hardware-revision-archive` | 保留公开 | 独立技术问题或来源保真资料；必要背景不当作重复项目叙事。 |
| `juanyun-baseunit-firmware` | 暂挂 | 开头、结尾重复 BaseUnit 先行并带向 ACUnit 的项目经历。 |
| `juanyun-dht11-am2302-board` | 保留公开 | 独立技术问题或来源保真资料；必要背景不当作重复项目叙事。 |
| `juanyun-diy-cooling` | 暂挂 | 首次 Connect、控制链和 PID 尝试重复；保留原代码分析待选题。 |
| `juanyun-hardware-sop` | 保留公开 | 独立技术问题或来源保真资料；必要背景不当作重复项目叙事。 |
| `juanyun-legacy-actuator-archive` | 保留公开 | 独立技术问题或来源保真资料；必要背景不当作重复项目叙事。 |
| `juanyun-production-line-control-panel` | 暂挂 | 首尾重复首次整机连通，按提交演进也较宽，待聚焦控制权或观测问题。 |
| `sensorless-foc-handoff` | 暂挂 | 六步对比、运行点、Codex 调试与长远目标在首尾重复项目经历。 |
| `tianjin-metro-environment-monitoring-stm32` | 暂挂 | 综合 demo 的集成过程、分工、功能结果与工程师反馈重复。 |
| `tianjin-rail-control-pid-atc-reading` | 暂挂 | 再次展开光照前馈判断与培训到轨道控制阅读的主线，兼有笔记间重复。 |
| `tianjin-stm32-environment-setup` | 暂挂 | Keil 配置、300 ms 闪烁与首次上板经历重复。 |
| `tianjin-stm32-gpio-exti-timer` | 暂挂 | 从 Arduino 转向外设的经历、编码器应用和定时器角色重复。 |
| `tianjin-stm32-pwm-uart-adc` | 暂挂 | 16 点标定的操作过程与前馈判断在主页也完整展开。 |
| `turing-cmake-build-logic` | 保留公开 | 独立技术问题或来源保真资料；必要背景不当作重复项目叙事。 |
| `turing-qt-seamly2d-first-run` | 保留公开 | 独立技术问题或来源保真资料；必要背景不当作重复项目叙事。 |
| `turing-release-packaging-cross-platform` | 保留公开 | 独立技术问题或来源保真资料；必要背景不当作重复项目叙事。 |
| `turing-sm2d-xml-data-format` | 保留公开 | 独立技术问题或来源保真资料；必要背景不当作重复项目叙事。 |
| `turing-three-week-development-log` | 暂挂 | 三周从环境、账户、打包到交付的完整路线重复。 |

## 内容分配与证据

主页按已确认的经历重新组织：小车从装板到赛道；计数器从接线到排障与演示；DIY 从风道和温度需求到两版硬件；天津从外设学习到综合 demo；南京从构建到账户、安装与交接；卷云从 BaseUnit 到 ACUnit、联调与后续维护；FOC 从自制驱动到开环运行和未完成接管。

正文中的 36 张既有图片、封面、文件附件路径及媒体记录保留。标题改为简短主题名，小车与计数器保留既有标题。保留的叙述准确表达直接测量、用户回忆、公司/客户反馈、现今查阅与未来计划，不再另写盘点式解释。没有新增制造、测量、故障、最终控制算法或产品验收结论。

从主页压缩的模式系数、逐步排障、详细代码与归档说明，保留在对应暂挂笔记、原始附件和 `before/` 中，供后续专题重新分配。Turing 的四篇原始资料和卷云 SOP 按原始文档保真例外保留；另外四篇卷云技术专题也保留。必要背景不等于重复整段项目经历。没有把原始资料每一行都重新做技术审计。

依据包括原获批主页与笔记、`docs/session-log.md` 中的用户确认、2026-08-11 小车设计 brief、2026-08-14 卷云 brief、2026-08-16 FOC brief，以及 2026-08-21 两个 de-AI 对照实验中的已确认 facts。外部资料只用于现今原理理解，在新主页相应句旁给出官方链接，不补写历史行动。

## 写作与验证记录

Step 10 先完成七份中文精修和六类病句人工审阅，再写英文；记录在 `chinese-gate.json`。Step 12 对组装后的中文再查语序、搭配、成分、结构、表意、逻辑，同时检查 Truth、Li Zhiyi、L1、中英一致与跨页分工。英文只按既有英文和双语规则检查。

`verification.json` 保存最终文件哈希、范围保护、链接和检查结果。词面扫描仅辅助人工逐句检查，不声称程序能够自动判断所有病句。检查完成后记录实际结果，不复用旧版本的通过结论。
