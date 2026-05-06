## 版本说明

`V0.5` 是当前外机固件工程的首个整理发布版本，完成了源码结构梳理、中文文档补齐，以及 VSCode + CMake + arm-none-eabi-gcc + ST-Link 的构建烧录链路迁移。

## 本版内容

- 补齐完整中文 README，说明工程结构、模块职责、任务调度、引脚与使用方法
- 新增 `PINOUT.md` 引脚说明文档
- 新增 `CMakeLists.txt`、`CMakePresets.json` 和 ARM GCC 工具链文件
- 新增 VSCode 的 `tasks.json` 与 `launch.json`
- 新增 OpenOCD ST-Link 调试配置
- 保持原有业务逻辑和硬件连接不变的前提下做了若干运行效率优化
- 完成 `build/debug/product_acunit.elf/.bin/.hex` 产物验证构建

## 主要优化

- 规范 1ms 任务调用节拍，减少主循环空转
- 优化 UI 文本拼接路径，降低格式化开销
- OLED 内容不变时跳过刷新，减少 I2C 传输
- 高频 GPIO 控制路径改为更轻量的寄存器写法
- NTC 查表由线性搜索改为二分搜索

## Release 附件

- `product_acunit_V0.5_firmware.zip`：固件打包附件，包含 `.elf`、`.bin`、`.hex`、`.map`、`.list` 和 README
- `product_acunit.bin`：可直接烧录到 `0x08000000`
- `product_acunit.hex`：HEX 固件文件

## 构建环境

- `cmake`
- `ninja`
- `arm-none-eabi-gcc`
- `STM32_Programmer_CLI`
- `openocd`
- `arm-none-eabi-gdb`

## 验证

- `cmake --preset debug`
- `cmake --build build/debug --parallel`
