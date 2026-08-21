# 五套隔离配置

这不是统一写作规范，只记录每个候选调用哪一套上游方法。五套配置互不叠加；唯一例外是 OUBIGFA 仓库自身就把 `good-writing` 与 `de-AI-writing` 分成互补模块，因此二者共同构成第五个候选。

## 01 · shuorenhua

- 来源：`MrGeDiao/shuorenhua`
- 场景：`public-writing`
- scope：`structural`，允许重新设计标题、小标题、段落和落点
- 力度：按其 Tier 判定使用 `standard` 或 `aggressive`，不受作品集原有文风限制
- 引用策略：`rewrite-safe`
- 读取：主 SKILL、protected spans、positive style、operation manual、structures、中文短语表、scene guardrails、scene packs、公开写作样本与示例
- 自检：保真回读后，再做 residual audit

## 02 · blader/humanizer

- 来源：`blader/humanizer`，安装版本元数据 `2.11.2`
- 模式：file/embedded rewrite
- 允许整体重写、拆并段落、改标题与小标题
- 不提供额外作者样本；原稿自身是唯一语气参照
- 完整执行：模式扫描 → 初稿 → 朗读式节奏复核 → “仍像 AI 的地方”复核 → 事实增删复核 → 最终稿
- 执行其破折号、格式、假深刻、假反对意见、戏剧碎句等全套规则

## 03 · stop-slop

- 来源：`hardikpandya/stop-slop`
- 直接执行其全部 Core Rules，不给中文工程笔记另加保守例外
- 删除填充、副词、被动句、假主体、二元对比、三件套、提问铺垫、金句式段尾和破折号
- 主动把读者放进现场，优先人类主语、具体动作与不均匀节奏
- 按 Directness、Rhythm、Trust、Authenticity、Density 五项评分；低于 `35/50` 自动重写

## 04 · writing-agent

- 来源：`dongbeixiaohuo/writing-agent`，本地完整仓库版本 `0.10.0`
- 原仓库是交互式 Claude 工作流；本实验配置一个不调用外部模型账户的一次性 Codex 适配链
- 文本链：事实账本 → 反模板大纲 → 8 个标题候选内部赛马 → 3 个开头内部赛马 → writing-executor 初稿 → editor-review 修改 → humanizer（内部自评至少 `40/50`）→ 事实回查
- 只跳过原工作流中需要用户逐阶段点选、配图、HTML 导出、发布后复盘的环节；保留它对文章结构、标题、开头、主编修订和 Humanizer 的原生取向
- 内部选择标题与开头时，以该工具自己的评分标准决定，不套用其他四套工具的判断

## 05 · OUBIGFA

- 来源：`OUBIGFA/De-AI-Prompt-Enhancer-Writer-Booster-SKILL`
- 第一步用 `good-writing` 完整重构，采用其事实密度、厚段、多分句长句、克制判断的特定作者风格
- 为发挥该模块的强模仿能力，读取风格摘要和仓库指定的科普范文片段作为语感参照
- 第二步只用同仓库的 `de-AI-writing` 对成稿打补丁，清理段落同构、路标词、二分对照、协作口吻和模板句式
- 标题按其规则控制在 20 个汉字以内，小标题由内容自然决定
