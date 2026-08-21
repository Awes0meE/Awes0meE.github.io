# 最终事实复核

复核对象：`01-shuorenhua.md` 至 `05-oubigfa.md`

依据：`00-original.md` 与 `00-facts.md`

| 候选 | 事实复核 | 归属边界 | 未完成边界 | 隐私边界 |
| --- | --- | --- | --- | --- |
| shuorenhua | PASS | PASS | PASS | PASS |
| humanizer | PASS | PASS | PASS | PASS |
| stop-slop | PASS | PASS | PASS | PASS |
| writing-agent | PASS | PASS | PASS | PASS |
| OUBIGFA | PASS | PASS | PASS | PASS |

## 复核内容

- 2025 年 8 月、三周全职线下实习、8 点至 5 点、镜像下载、Qt 版本和编译错误等时间与数字没有被改写成更强结论。
- `QSettings` 始终是本机持久化，没有被扩写成数据库、服务器、在线认证或后端账户系统。
- qmake 通过与完整构建通过保持区分；CMake 与 Ninja 只是同期学习，Seamly2D 没有迁移到 CMake。
- Windows 正式验收只覆盖实习开发机；约半个月后的无 Qt、无 Visual Studio 新装 Windows 台式机测试始终属于作者个人后补验证。
- macOS 只跑通 Debug、Release、应用启动和无签名 DMG。应用签名没有完成，notarization 没有尝试，也没有 Developer ID。
- 最终材料交到实习生 `develop` 分支；公司后续是否采用或产品化保持未知。
- 完整账户源码、公司内部实现与未公开仓库内容没有进入候选稿。

独立复核曾在 stop-slop 稿中发现三类主张过强：把放弃 Qt 5 路线写成客观上三周无法完成，把理解变化写成已执行的兼容检查，以及把既定角色规则写成作者制定。最终稿已把这些句子收回到事实包支持的强度，并按 Stop Slop 自身规则复核主体与句式；未用其他工具统一润色。

五篇均保留原稿的 14 个公开链接和主要技术标识。事实复核只负责防止事件、归属、证据强度与未完成状态漂移，不评价哪种文风更好。
