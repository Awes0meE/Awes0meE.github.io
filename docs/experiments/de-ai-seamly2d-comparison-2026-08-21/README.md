# Seamly2D 工程笔记去 AI 味五路对照

日期：2026-08-21

测试对象是当前公开工程笔记《“能跑”改了三次意思：Seamly2D 三周开发记录》。本目录只保存实验材料和候选稿，不参与网站内容构建；正式原稿 `content/notes/turing-three-week-development-log.mdx` 保持不变。

本轮只生成中文稿。五个候选共享同一份原稿和事实材料，但互不读取其他候选，也不接受作品集仓库的标题、结构、措辞、标点、篇幅或发布风格规则。`engineering-note-writer` 及项目文档在这里仅用于确认事实、第一人称归属、实测边界和未完成边界。

## 文件

- `00-original.md`：当前公开笔记的中文原稿快照
- `00-facts.md`：五路共用的事实材料包
- `tool-configs.md`：五套工具在本实验中的隔离配置
- `install-manifest.md`：本轮复用的本地工具状态
- `fact-audit.md`：五篇最终事实、归属与隐私边界复核
- `01-shuorenhua.md`：MrGeDiao / shuorenhua
- `02-humanizer-blader.md`：blader / humanizer
- `03-stop-slop.md`：hardikpandya / stop-slop
- `04-writing-agent.md`：dongbeixiaohuo / writing-agent
- `05-oubigfa.md`：OUBIGFA / Good Writing + De-AI Writing
- `blind/`：去掉工具名后的盲评副本与单独映射表

候选稿允许重写标题、小标题、段落顺序和叙事切口。它们不是同一模板的五次换词，而是五套工具各自完成的一篇新稿。

## 成稿概览

| 文件 | 新标题 | 汉字数 | H2 数 |
| --- | --- | ---: | ---: |
| `00-original.md` | “能跑”改了三次意思：Seamly2D 三周开发记录 | 2859 | 8 |
| `01-shuorenhua.md` | Seamly2D 能跑了，可条件越来越多 | 2248 | 8 |
| `02-humanizer-blader.md` | Seamly2D 跑起来的条件 | 2345 | 7 |
| `03-stop-slop.md` | Seamly2D 三周实习里的错误与交接边界 | 2174 | 7 |
| `04-writing-agent.md` | 绿色三角亮了，Seamly2D 还没跑完 | 2341 | 7 |
| `05-oubigfa.md` | 绿色三角退回起点 | 2317 | 5 |

汉字数按 Unicode Han 字符统计，只用于说明篇幅，不作为质量分数。五篇均保留原稿中的 14 个公开链接。

想避免工具名影响判断，可直接从 [盲评入口](./blind/README.md)开始。
