# 固件、处理代码与归属

以下仓库和提交来自本地归档中的发布记录。本次未查询远端当前 HEAD、未重新编译或烧录固件，链接可用性和最新版本不作为本次校验结果。

| 角色 | 归档仓库 | 归档提交 |
| --- | --- | --- |
| AM32 / AT32F421 电调适配 | https://github.com/Awes0meE/AM32-firmware-FYP-modified | `3f8192fb30c31544cc35bff51cc336ef25dbf7fd` |
| P0 DShot-RPM 映射控制器 | https://github.com/Awes0meE/STM32_ESC_Dshot_P0_RPM_Mapping | `14911846f96db5d3c69f1cc6e1614776e24a61b4` |
| E1 电气测试控制器 | https://github.com/Awes0meE/STM32_ESC_Dshot_E1 | `0aca3df8c1dd01db76a8bcda30e4d615c046e439` |
| E2 波形测试控制器 | https://github.com/Awes0meE/STM32_ESC_Dshot_E2 | `3ef0fbad2d9498549a1afd6b3d292bf5a862b113` |
| E3 热浸测试控制器 | https://github.com/Awes0meE/STM32_ESC_Dshot_E3 | `90cfad39f7326f53a96c11ca994e4f7f2c1acdee` |

展示贡献可落在 AT32 目标适配、直接烧录内存布局、运行设置和启动参数、DShot/ADC/DMA、测试状态机、日志与热像检查点。AM32 及厂商驱动部分仍须保留原有归属与许可证，不能把整个依赖栈写为个人原创。

没有复制整套压缩源码和可烧录二进制：它们带有大量厂商库、工具与构建文件，网站展示更适合引用相应仓库。部分原始 commit record 含私人邮箱，已排除；这里仅保留归档提交信息。

本目录的原始适配/版本记录可能引用未复制的 ZIP、BIN、ELF 或原项目路径；这是保留归档语境，不代表那些文件在本包中缺失或已经验证可编译。

`绘图脚本原件` 为未经改写的脚本，依赖原论文和 `FYP_Evidence` 目录结构。运行前要配置输入、输出路径和 Python/MATLAB 依赖；本次未运行它们，避免覆盖原始图表。

E1 处理脚本与对应 raw logs 放在 `03_实验数据与处理/E1_sameRPM_electrical`。E2 的旧首轮指标处理脚本未复制，避免再次产生已纠正的 Si R1 Up 指标；以修正后 CSV 和重处理说明为准。

> 2026-10 update: the five repositories above are now consolidated as subfolders of the public repository https://github.com/Awes0meE/STM32-BLDC-ESC-Experiments (AM32-firmware-FYP-modified, STM32_ESC_Dshot_P0_RPM_Mapping, STM32_ESC_Dshot_E1, STM32_ESC_Dshot_E2, STM32_ESC_Dshot_E3).
