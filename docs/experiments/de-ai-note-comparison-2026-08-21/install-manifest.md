# 本地安装记录

安装日期：2026-08-21

| 对照项 | 上游 | 本地位置 | 当前标识 | 安装/检查结果 |
| --- | --- | --- | --- | --- |
| shuorenhua | `MrGeDiao/shuorenhua` | `/Users/alvinli/.codex/skills/shuorenhua` | README `v2.3.1` | 官方 Codex skill 安装器；`check_repo.py` 通过，另报告上游已知的 HUMAN 语料代表性缺口 |
| humanizer | `blader/humanizer` | `/Users/alvinli/.codex/skills/humanizer-blader` | SKILL `2.11.2` | 官方 Codex skill 安装器；包验证通过 |
| stop-slop | `hardikpandya/stop-slop` | `/Users/alvinli/.codex/skills/stop-slop` | main 快照 | 官方 Codex skill 安装器；主 SKILL 与全部 references 已读取 |
| writing-agent | `dongbeixiaohuo/writing-agent` | `/Users/alvinli/.codex/tools/writing-agent` | npm `0.10.0`; commit `6edd1a4539d668bcd01fbd3d492b16f26aaf1b46` | 完整仓库与锁定依赖已安装；工作流契约和 24 个 Python 文件语法检查通过；入口另注册到 `/Users/alvinli/.codex/skills/writing-agent-workflow-producer` |
| OUBIGFA | `OUBIGFA/De-AI-Prompt-Enhancer-Writer-Booster-SKILL` | `/Users/alvinli/.codex/skills/oubigfa-good-writing` 与 `/Users/alvinli/.codex/skills/oubigfa-de-ai-writing` | main 快照 | 按上游目录拆成两个互补 skill 安装；第五路内部串联使用 |

安装使用本地 Codex 的 GitHub skill installer。writing-agent 是 Claude 工作流仓库，因此同时保留完整源码和 npm 运行时，再用本实验的 Codex 适配链调用其文本生产组件；没有登录或调用 Claude/OpenAI 等外部模型账户。

`npm ci` 报告 1 个 low severity 依赖告警。本测试只读取本地 prompt/workflow 文件并生成 Markdown，没有启动服务器、图像生成、网页抓取或外部 API。
