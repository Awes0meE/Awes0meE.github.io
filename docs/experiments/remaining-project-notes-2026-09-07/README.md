# 学习笔记集中审阅

2026-09-07。按用户要求，剩余四个项目各完成两篇中英文候选稿，与已有天津两篇合并审阅。十篇均等待用户审阅，尚未应用到正式网站。

[打开集中审阅页](http://127.0.0.1:8772/preview.html?note=tianjin-stm32-i2c-oled-debugging&lang=zh)。顶部切换项目、篇目与语言，底部可依次阅读上一篇和下一篇。

| 项目 | 笔记 | 研究内容 |
| --- | --- | --- |
| 天津津铁 | [光照标定与查表控制](../tianjin-notes-2026-09-07/tianjin-stm32-light-calibration-control.mdx) | 标定分布、插值、环境变化与反馈方向 |
| 天津津铁 | [I²C 通信与 OLED 调试](../tianjin-notes-2026-09-07/tianjin-stm32-i2c-oled-debugging.mdx) | 开漏、上拉、ACK、软件与硬件实现、BUSY |
| 南京图灵 | [Qt 程序的 Windows 运行依赖](turing-windows-runtime-dependencies.mdx) | DLL、平台插件、第三方库与换机检查 |
| 南京图灵 | [本地账户的权限判断](turing-local-role-permissions.mdx) | 操作者、目标、动作与执行后的账户状态 |
| 卷云相变散热器 | [ACUnit 的协作式任务时序](juanyun-cooperative-task-timing.mdx) | 调度周期、连续占用、迟到任务与数据年龄 |
| 卷云相变散热器 | [Flash 参数保存与恢复](juanyun-flash-parameter-recovery.mdx) | 延迟写入、提交标记、双页迁移与恢复 |
| 无感 FOC | [无感 FOC 接管时的角度连续性](foc-angle-handoff.mdx) | 速度与角度、坐标误差、PI 状态与切换记录 |
| 无感 FOC | [PWM 周期内的电流采样](foc-current-sampling-timing.mdx) | 实际采样通道、RC、ADC 顺序与有效窗口 |
| Claude Chime | [带保护电池的启动测量](claude-chime-startup-current.mdx) | 电芯与包输出、充电电流、触发及恢复 |
| Claude Chime | [电池采样开关与 ADC 建立时间](claude-chime-switched-adc-divider.mdx) | RC 建立、电流支路、读取窗口和校准 |

中文先完成精修及六类病句检查，见 [Step 10 记录](chinese-step10.json)。英文由中文适配，最终检查与来源对应见 [审阅记录](review.json)。主页继续讲项目经历，各篇只保留所需背景并展开独立问题。原始操作记录、既有公开文章和暂挂旧稿均保留。

用户在审阅过程中指出“做 STM32 练习”的搭配问题。天津 I²C 开头已改为“我在折腾 STM32 的时候，遇到过程序编译、烧录都正常，OLED 却不显示的情况”，英文同步修改。Skill 的 ZH-2 规则补充了器件、程序、活动与技能的区别。旧天津预览仍在 8771，可刷新继续审阅。

上一次小标题审阅按各节完整内容重新命名，十篇候选稿和两个预览入口均已同步；该轮保持正文段落不变。[检查记录](../note-heading-review-2026-09-07/review.json)同时涵盖此前六篇重写笔记及四篇仍公开的旧笔记。

最新一轮调整了重复的“我……”段落开头，20 篇现用及待审文章均满足每篇最多一次的要求，开篇也计入。共修改 15 个中文段落开头，并对应调整 13 个英文段落；人物经历、技术解释与测试状态保持原意。两个预览入口已同步，[检查记录](../note-paragraph-openings-2026-09-07/review.json)列出修改范围。公开文章的标题和段落改动目前只在本地，尚未发布。

正文唯一来源是上表中的 MDX。`preview.html` 使用网站现有 `ContentRenderer` 生成；天津两篇没有复制新的 MDX。修改后运行：

```sh
node docs/experiments/remaining-project-notes-2026-09-07/build-preview.mjs
python3 -m http.server 8772 --bind 127.0.0.1 --directory docs/experiments/remaining-project-notes-2026-09-07
```

如果旧预览服务仍在运行，不必重复启动。预览生成器借用天津旧预览的样式；这两个审阅目录应在正式应用后一起清理。当前生产内容保持 8 个项目、27 个笔记源文件（15 公开、12 暂挂）和 84 条媒体记录。About 留在独立未批准分支；本批没有推送、PR 或发布操作。
