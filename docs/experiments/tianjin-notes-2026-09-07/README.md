# 天津津铁 STM32 笔记审阅

2026-09-07。用户要求暂时搁置 About，继续下一个项目的学习笔记。按现有选题顺序准备天津津铁的两篇候选稿，尚未获用户批准或发布。

- [光照标定与查表控制](tianjin-stm32-light-calibration-control.mdx)：目标 1000 对应 PWM 209 的推算、标定点分布与补测、环境光变化后的修正方向。
- [I²C 通信与 OLED 调试](tianjin-stm32-i2c-oled-debugging.mdx)：开漏与上拉、地址和 ACK、软件与硬件实现的比较、BUSY 与勘误条件。

[本地审阅页](http://127.0.0.1:8771/preview.html?note=calibration&lang=zh)可以切换两篇文章和中英文。`preview.html` 用网站现有 `ContentRenderer` 从这两份 MDX 生成，正文以 MDX 为准。之后修改正文时须同步刷新预览；正式应用时移动经批准的稿件并清理完成的预览副本。

[中文 Step 10 记录](chinese-step10.json)完成于英文适配之前，[最终审阅记录](review.json)说明计算、来源与两篇的分工。已有天津主页和五篇暂挂笔记均已读过，原文仍保持不变。

About 的未批准草稿保存在独立分支 `docs/rewrite-about-copy`，文案提交 `bd6cdc9`，暂挂记录 `af3ace5`。当前笔记分支 `docs/rewrite-tianjin-notes` 从 main 的 `007decf` 开始，未携带 About 改动。当前网站仍为 8 个项目、27 个笔记源文件（15 公开、12 暂挂）和 84 条媒体记录。
