# 五套隔离配置

这不是统一写作规范，只记录每个候选调用哪一套上游方法。五套配置互不叠加；唯一例外是 OUBIGFA 仓库自身把 `good-writing` 与 `de-AI-writing` 设计为互补模块，因此二者共同构成第五个候选。

所有候选共享 `00-original.md` 与 `00-facts.md`。作品集仓库内的 `engineering-note-writer` 只提供事实、第一人称归属、证据强度和未完成边界，不约束标题、小标题、段落顺序、措辞、标点、篇幅或文风。候选之间禁止互读。

## 01 · shuorenhua

- 来源：`MrGeDiao/shuorenhua`
- 场景：`public-writing`
- scope：`structural`，用户已明确允许重新设计标题、小标题、段落顺序和全文落点
- 力度：按其 Tier 判定使用 `standard` 或 `aggressive`
- 引用策略：`rewrite-safe`
- 读取：主 SKILL、protected spans、positive style、operation manual、structures、中文短语表、scene guardrails、scene packs、公开写作样本与示例
- 自检：保真回读后，再做 pattern / phrase / scene residual audit

## 02 · blader/humanizer

- 来源：`blader/humanizer`，安装版本元数据 `2.11.2`
- 模式：file/embedded rewrite
- 允许整体重写、拆并段落、改标题与小标题
- 不提供额外作者样本；原稿自身是唯一语气参照
- 完整执行：模式扫描 → 初稿 → 朗读式节奏复核 → “仍像 AI 的地方”复核 → 事实增删复核 → 最终稿
- 执行其全部 35 类模式规则，包括破折号、格式、假深刻、假反对意见和戏剧碎句检查

## 03 · stop-slop

- 来源：`hardikpandya/stop-slop`
- 直接执行全部 Core Rules，不添加中文工程笔记的保守例外
- 删除填充、副词、被动句、假主体、二元对比、三件套、提问铺垫、金句式段尾和破折号
- 主动把读者放进现场，优先人类主语、具体动作与不均匀节奏
- 按 Directness、Rhythm、Trust、Authenticity、Density 五项评分；低于 `35/50` 自动重写

## 04 · writing-agent

- 来源：`dongbeixiaohuo/writing-agent`，本地完整仓库版本 `0.10.0`
- 原仓库是交互式 Claude 工作流；本实验沿用上一轮已确认的一次性 Codex 适配链，不调用外部模型账户
- 文本链：事实账本 → 反模板大纲 → 8 个标题候选内部赛马 → 3 个开头内部赛马 → writing-executor 初稿 → editor-review 修改 → humanizer（内部自评至少 `40/50`）→ 事实回查
- 只跳过需要用户逐阶段点选、配图、HTML 导出和发布后复盘的环节；保留文章结构、标题、开头、主编修订与 Humanizer 的原生取向
- 标题和开头由该工具自己的评分标准内部选定，不套用其他四套工具的判断

## 05 · OUBIGFA

- 来源：`OUBIGFA/De-AI-Prompt-Enhancer-Writer-Booster-SKILL`
- 第一步用 `good-writing` 完整重构，采用事实密度、厚段、多分句长句和克制判断的特定作者风格
- 读取风格摘要与 AI 痕迹索引；不引入仓库外作者材料
- 第二步只用同仓库的 `de-AI-writing` 清理段落同构、路标词、二分对照、协作口吻和模板句式
- 标题按其规则控制在 20 个汉字以内，小标题由内容自然决定
