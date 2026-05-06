# Cirro STM32F1 底座固件

这是一个基于 `STM32F103C8T6` 的散热底座控制固件工程，面向温湿度采集、设备在位检测、风扇调速、本地人机交互与蓝牙数据上报。  
当前版本同时保留了原始 `STM32CubeIDE` 工程文件，并补齐了 `VSCode + CMake + arm-none-eabi-gcc + ST-Link` 的编译、烧录和调试链路。

## 1. 项目定位

本工程用于散热底座主控板的软件开发与联调验证，当前已覆盖的核心能力包括：

- 双路温湿度采集（DHT11 + DHT22）
- 红外在位检测
- 编码器调速（0~100%）
- 风扇 PWM 输出控制
- OLED 本地状态显示
- 蓝牙串口上报
- 风扇设定值掉电记忆（内部 Flash 参数存储）

当前控制形态以“可稳定运行的底座控制固件”为目标，已经打通传感、执行、显示、通信与参数存储链路。

## 2. 硬件平台

- MCU：`STM32F103C8T6`
- 内核：`Cortex-M3`
- 主频：`72 MHz`
- Flash：`64 KB`（其中 2KB 预留为参数区）
- RAM：`20 KB`
- 时钟：外部 HSE + PLL

链接脚本：[`STM32F103C8TX_FLASH.ld`](./STM32F103C8TX_FLASH.ld)

工程配置文件：[`product_base.ioc`](./product_base.ioc)

## 3. 目录结构

```text
product_base/
├─ App/                    顶层应用调度与状态机
├─ BSP_drivers/            板级驱动层（传感器/执行器/显示/通信/参数存储）
├─ Core/                   CubeMX 生成的底层启动和外设初始化
├─ Drivers/                HAL 与 CMSIS
├─ cmake/                  CMake 工具链文件
├─ openocd/                ST-Link + OpenOCD 配置
├─ .vscode/                VSCode 任务与调试配置
├─ CMakeLists.txt          CMake 主构建脚本
├─ CMakePresets.json       CMake 预设
└─ README.md               项目说明文档
```

## 4. 软件分层

工程分为三层：

### 4.1 Core 层

由 `STM32CubeMX / STM32CubeIDE` 生成，负责：

- 时钟与中断初始化
- GPIO / TIM / I2C / USART / DMA 初始化
- 启动文件与中断入口

关键入口文件：

- [`Core/Src/main.c`](./Core/Src/main.c)
- [`Core/Src/stm32f1xx_it.c`](./Core/Src/stm32f1xx_it.c)
- [`Core/Startup/startup_stm32f103c8tx.s`](./Core/Startup/startup_stm32f103c8tx.s)

### 4.2 App 层

应用总入口，负责业务编排、状态机与任务调度。

关键文件：

- [`App/Src/app.c`](./App/Src/app.c)

职责：

- 管理 `UI_OFF / UI_BOOT / UI_NORMAL / UI_CONFIRM` 状态机
- 调度传感采样、OLED 刷新、蓝牙上报
- 组织“在位判定 + 风扇输出 + 用户交互 + 参数持久化”逻辑

### 4.3 BSP 层

板级驱动层，直接面向具体外设或器件。

- [`BSP_drivers/Src/dht.c`](./BSP_drivers/Src/dht.c)：DHT11/DHT22 单总线读取
- [`BSP_drivers/Src/ir.c`](./BSP_drivers/Src/ir.c)：红外在位检测（去抖）
- [`BSP_drivers/Src/button.c`](./BSP_drivers/Src/button.c)：按键去抖与单次触发
- [`BSP_drivers/Src/encoder.c`](./BSP_drivers/Src/encoder.c)：编码器增量读取
- [`BSP_drivers/Src/fan.c`](./BSP_drivers/Src/fan.c)：风扇 PWM 占空比输出
- [`BSP_drivers/Src/oled.c`](./BSP_drivers/Src/oled.c)：SSD1306 显示驱动
- [`BSP_drivers/Src/bluetooth.c`](./BSP_drivers/Src/bluetooth.c)：串口 DMA 异步上报
- [`BSP_drivers/Src/nvstore.c`](./BSP_drivers/Src/nvstore.c)：Flash 参数存储
- [`BSP_drivers/Src/dwt_delay.c`](./BSP_drivers/Src/dwt_delay.c)：微秒级延时

## 5. 主流程

上电后的主要执行顺序如下：

1. `HAL_Init()`
2. `SystemClock_Config()`
3. 初始化 GPIO / I2C / TIM / USART / DMA
4. 进入 `APP_BindHandles()` 绑定句柄
5. 进入 `APP_Init()` 完成应用与驱动初始化
6. 主循环中持续执行 `APP_Loop()`

状态机流程：

- `UI_OFF`：黑屏待机，风扇停转，等待按键唤醒
- `UI_BOOT`：显示开机 Logo（3 秒），风扇保持停转
- `UI_NORMAL`：正常采样、显示、调速和蓝牙上报
- `UI_CONFIRM`：关机确认倒计时（5 秒）

## 6. 功能说明

### 6.1 温湿度采样

工程当前使用两路温湿度源：

- `DHT11`：环境温湿度
- `DHT22`：出风口温湿度

采样策略：

- 主循环周期触发，默认 `2000ms` 一次
- 驱动内置重试与状态码
- 读取失败时保留最近一次有效值

### 6.2 在位检测与按键处理

- 红外输入采用去抖处理，避免抖动误判
- 按键采用去抖 + latch 机制，一次按下只触发一次事件
- `UI_OFF` 下要求先松开按键，再允许下一次按下触发唤醒

### 6.3 风扇控制

风扇由 `TIM2_CH3` 输出 PWM：

- 占空比调节范围：`0~100%`
- 当前频率约：`25kHz`（`PSC=0, ARR=2879`）

输出约束：

- `UI_OFF / UI_BOOT` 状态强制输出 `0%`
- 其他状态下，输出按“在位检测结果 + 用户设定值”计算

### 6.4 OLED 显示

OLED 使用 `I2C1`（SSD1306）显示运行信息：

- 正常界面显示 `ENV / OUT / FAN`
- 关机确认界面显示倒计时
- 开机阶段支持整屏 Logo 显示

显示侧当前包含以下稳健性处理：

- I2C 总线恢复
- 设备就绪检测与初始化重试
- 文本缓存比对，内容不变时跳过重复刷新

### 6.5 蓝牙上报

蓝牙上报通过 `USART1 + DMA1_Channel4` 异步发送：

- 默认周期：`3000ms`
- `UI_OFF` 状态下不上报
- 报文格式：`DATA:<envT>,<outT>,<fan>\r\n`

示例：

- `DATA:26.4,31.8,45`

### 6.6 风扇设定值掉电记忆

参数存储基于内部 Flash，采用 EEPROM Emulation 思路：

- 预留区域：`0x0800F800 ~ 0x0800FFFF`（2KB）
- 组织方式：双页（每页 1KB）日志轮转
- 数据安全：页头与记录均带 `CRC32 + commit` 标记
- 写入策略：变更后延迟写入（默认 4 秒），关机时强制落盘
- 读取策略：上电自动扫描并恢复最后一条有效记录

## 7. 引脚定义

核心引脚如下：

| 引脚 | 名称 | 功能 |
| --- | --- | --- |
| `PA0` | `DHT11_INPUT` | DHT11 数据线 |
| `PA1` | `DHT22_INPUT` | DHT22 数据线 |
| `PA2` | `FAN_PWM` | 风扇 PWM（TIM2_CH3） |
| `PA6` | `ENCODER_A` | 编码器 A 相 |
| `PA7` | `ENCODER_B` | 编码器 B 相 |
| `PB0` | `IR_DO` | 红外在位输入 |
| `PB1` | `PWR_BTN` | 电源按键输入 |
| `PB6` | `OLED_SCL` | OLED I2C 时钟 |
| `PB7` | `OLED_SDA` | OLED I2C 数据 |
| `PA9` | `USART1_TX` | 蓝牙串口发送 |
| `PA10` | `USART1_RX` | 蓝牙串口接收 |

## 8. 外设资源分配

| 外设 | 用途 |
| --- | --- |
| `TIM2` | 风扇 PWM 输出 |
| `TIM3` | 编码器接口 |
| `I2C1` | OLED 显示 |
| `USART1 + DMA1_Channel4` | 蓝牙上报 DMA 发送 |
| `SysTick` | 系统毫秒节拍调度 |

## 9. 当前版本已做的工程化改造

在当前版本中，除了保留原始 CubeIDE 工程，还完成了以下工程化改造：

- 重构目录为 `App + BSP_drivers + Core`
- 增加 `CMake` 构建脚本与 `CMakePresets`
- 增加 `VSCode` 任务与调试配置
- 补齐 `OpenOCD` 配置与 ST-Link 调试链路
- 新增风扇设定值掉电记忆（Flash 参数存储）
- 蓝牙上报改为 DMA 异步发送

同时进行了不改变功能行为的效率与功耗优化：

- 主循环空闲阶段使用 `__WFI()` 降低空转功耗
- 周期任务统一按时间片调度
- OLED 增量刷新，减少无效 I2C 传输

## 10. 编译环境

推荐工具链：

- `arm-none-eabi-gcc`
- `cmake`
- `ninja`
- `STM32_Programmer_CLI`
- `openocd`
- `arm-none-eabi-gdb`
- VSCode 插件：
  - `ms-vscode.cmake-tools`
  - `marus25.cortex-debug`

## 11. 在 VSCode 中编译

工作目录请直接打开本工程根目录：

```text
STM32F1_Product_BaseUnit_FW_main/product_base
```

首次配置：

```bash
cmake --preset debug
```

编译：

```bash
cmake --build build/debug --parallel
```

输出文件位于：

```text
build/debug/
├─ product_base.elf
├─ product_base.bin
├─ product_base.hex
├─ product_base.map
└─ product_base.list
```

## 12. 在 VSCode 中一键构建与烧录

本工程已提供 `.vscode` 配置：

- 默认构建任务：`cmake-build`
- 烧录任务：`stlink-flash`
- 调试配置：`STM32F103C8T6: Build + Flash + Debug`

使用方式：

- `Ctrl + Shift + B`：编译
- 运行 `stlink-flash`：编译并通过 ST-Link 烧录
- 按 `F5`：编译、烧录并进入 OpenOCD 调试

## 13. 烧录说明

当前烧录命令通过 `STM32_Programmer_CLI` 执行，写入地址：

```text
0x08000000
```

烧录对象：

```text
build/debug/product_base.bin
```

## 14. 调试说明

调试链路使用：

- `arm-none-eabi-gdb`
- `openocd`
- ST-Link SWD

OpenOCD 配置文件：

- [`openocd/stm32f103c8_stlink.cfg`](./openocd/stm32f103c8_stlink.cfg)

## 15. 已知边界

当前版本仍有以下边界：

- 蓝牙报文暂未输出湿度字段（湿度已采集）
- 未实现闭环温控策略
- 未引入故障状态机与异常上报协议
- `UI_OFF` 状态尚未切换到 STOP/Standby 低功耗模式

## 16. 版本说明

当前 release 版本：`V0.6`

建议后续版本规划：

- `V0.6.x`：联调修正、稳定性增强
- `V0.7.x`：补齐故障状态机、通信字段与参数配置项
- `V1.0.0`：形成量产控制策略

## 17. 维护建议

后续迭代建议优先推进：

- 蓝牙上报协议版本化（字段可扩展）
- 关机态深度低功耗模式
- 传感器故障检测与保护策略
- 关键参数的可配置化与校准流程
- 产测与联调文档固化
