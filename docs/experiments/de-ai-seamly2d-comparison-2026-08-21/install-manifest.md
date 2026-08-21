# 本地工具状态

复核日期：2026-08-21

本轮复用上一轮已经安装并验证的同一套本地工具，不重新下载或改写配置。

| 对照项 | 上游 | 本地位置 | 当前标识 | 本轮状态 |
| --- | --- | --- | --- | --- |
| shuorenhua | `MrGeDiao/shuorenhua` | `/Users/alvinli/.codex/skills/shuorenhua` | README `v2.3.1` | 主 SKILL 与本场景要求的 references 已重新完整读取 |
| humanizer | `blader/humanizer` | `/Users/alvinli/.codex/skills/humanizer-blader` | SKILL `2.11.2` | 主 SKILL 已重新完整读取 |
| stop-slop | `hardikpandya/stop-slop` | `/Users/alvinli/.codex/skills/stop-slop` | main 快照 | 主 SKILL 与全部 references 已重新完整读取 |
| writing-agent | `dongbeixiaohuo/writing-agent` | `/Users/alvinli/.codex/tools/writing-agent` | npm `0.10.0`; commit `6edd1a4539d668bcd01fbd3d492b16f26aaf1b46` | workflow 契约与本轮使用的角色说明已重新完整读取 |
| OUBIGFA | `OUBIGFA/De-AI-Prompt-Enhancer-Writer-Booster-SKILL` | `/Users/alvinli/.codex/skills/oubigfa-good-writing`、`/Users/alvinli/.codex/skills/oubigfa-de-ai-writing` | main 快照 | 两个互补 SKILL 与所需索引、风格摘要已重新完整读取 |

本实验只读取本地 prompt、规则和工作流文件并生成 Markdown，没有启动外部模型服务或修改全局工具配置。
