# Cirro STM32F1 外机固件

这是一个基于 `STM32F103C8T6` 的外机控制固件工程，面向压缩机、电子膨胀阀、温度采集与本地人机交互联调。  
当前版本同时保留了原始 `STM32CubeIDE` 工程文件，并补齐了 `VSCode + CMake + arm-none-eabi-gcc + ST-Link` 的编译、烧录和调试链路。

## 1. 项目定位

本工程主要用于外机控制板的功能联调与样机验证，当前已覆盖的核心能力包括：

- 压缩机启停控制
- 压缩机速度 PWM 输出
- 压缩机 FG 反馈测速
- 电子膨胀阀回零与开度调节
- 双路 NTC 温度采样
- DHT22 温湿度读取
- 旋转编码器 + 按键输入
- OLED 状态显示

当前控制形态更偏向“联调/演示/验证平台”，而不是完整量产控制策略。  
也就是说，这版代码已经把关键硬件链路打通了，但还没有实现完整的温控闭环、故障状态机、通信协议和保护策略。

## 2. 硬件平台

- MCU：`STM32F103C8T6`
- 内核：`Cortex-M3`
- 主频：`72 MHz`
- Flash：`64 KB`
- RAM：`20 KB`
- 时钟：外部 HSE 晶振

链接脚本：[`STM32F103C8TX_FLASH.ld`](./STM32F103C8TX_FLASH.ld)

工程配置文件：[`product_acunit.ioc`](./product_acunit.ioc)

## 3. 目录结构

```text
product_acunit/
├─ App/                    顶层应用调度
├─ BSP_drivers/            板级驱动
├─ Core/                   CubeMX 生成的底层启动和外设初始化
├─ Drivers/                HAL 与 CMSIS
├─ Service/                业务逻辑层
├─ cmake/                  CMake 工具链文件
├─ openocd/                ST-Link + OpenOCD 配置
├─ .vscode/                VSCode 任务与调试配置
├─ CMakeLists.txt          CMake 主构建脚本
├─ CMakePresets.json       CMake 预设
├─ PINOUT.md               引脚说明
└─ README.md               项目说明文档
```

## 4. 软件分层

工程分为四层：

### 4.1 Core 层

由 STM32CubeMX / STM32CubeIDE 生成，负责：

- 时钟配置
- GPIO 初始化
- TIM / ADC / DMA / I2C / USART 初始化
- 中断入口
- 启动文件与链接脚本配合

关键入口文件：

- [`Core/Src/main.c`](./Core/Src/main.c)
- [`Core/Src/stm32f1xx_it.c`](./Core/Src/stm32f1xx_it.c)
- [`Core/Startup/startup_stm32f103c8tx.s`](./Core/Startup/startup_stm32f103c8tx.s)

### 4.2 App 层

应用总入口，只做初始化和任务调度。

关键文件：

- [`App/Src/app.c`](./App/Src/app.c)

职责：

- 启动 DHT22 微秒延时定时器
- 初始化 BSP 和 Service
- 按固定周期调度各业务任务

### 4.3 Service 层

业务逻辑层，把底层驱动组织成“可理解的功能模块”。

- [`Service/Src/svc_control.c`](./Service/Src/svc_control.c)  
  负责压缩机和电子膨胀阀控制

- [`Service/Src/svc_sensor.c`](./Service/Src/svc_sensor.c)  
  负责 DHT22 和 NTC 的采样结果管理

- [`Service/Src/svc_ui.c`](./Service/Src/svc_ui.c)  
  负责编码器按键逻辑、参数调节和 OLED 文本显示

### 4.4 BSP 层

板级设备驱动层，直接面向某个具体硬件器件或接口。

- [`bsp_comp.c`](./BSP_drivers/Src/bsp_comp.c)：压缩机运行控制和 PWM 输出
- [`bsp_fg.c`](./BSP_drivers/Src/bsp_fg.c)：FG 反馈测速
- [`bsp_eev.c`](./BSP_drivers/Src/bsp_eev.c)：电子膨胀阀步进驱动
- [`bsp_ntc.c`](./BSP_drivers/Src/bsp_ntc.c)：双路 NTC 采样和温度换算
- [`bsp_dht22.c`](./BSP_drivers/Src/bsp_dht22.c)：DHT22 单总线读取
- [`bsp_oled.c`](./BSP_drivers/Src/bsp_oled.c)：OLED 字库和显示刷新
- [`bsp_encoder.c`](./BSP_drivers/Src/bsp_encoder.c)：旋转编码器读取
- [`bsp_key.c`](./BSP_drivers/Src/bsp_key.c)：按键去抖、短按、长按识别

## 5. 主流程

上电后的主要执行顺序如下：

1. `HAL_Init()`
2. `SystemClock_Config()`
3. 初始化 GPIO、DMA、TIM、ADC、I2C、USART
4. 进入 `App_Init()`
5. 初始化 OLED、编码器、按键、控制模块、传感器模块、UI 模块
6. 主循环中进入 `App_Loop()`
7. 按固定节拍调用不同业务任务

当前调度周期如下：

- `1ms`：EEV 步进任务
- `10ms`：FG 维护、编码器按键扫描、UI 输入处理
- `100ms`：NTC 温度更新
- `500ms`：OLED 刷新
- `2000ms`：DHT22 温湿度读取

## 6. 功能说明

### 6.1 压缩机控制

压缩机控制由两部分组成：

- `COMP_RUN_CTL`：控制启停
- `COMP_PWM_RAW`：输出速度 PWM

注意：

- `COMP_RUN_CTL` 在当前硬件设计里是 **低电平使能**
- `COMP_PWM_RAW` 经过外围电路后与业务输入占空比是反相关的，因此软件里做了反相换算

### 6.2 FG 测速

FG 信号由 `TIM3 CH4` 输入捕获完成测速：

- 通过捕获相邻脉冲间隔计算转速
- 超过 1 秒没有新 FG 脉冲则认为转速为 0

### 6.3 电子膨胀阀

EEV 使用四相步进方式控制：

- 上电后先自动回零
- 回零完成后才允许手动调节
- 当前满量程定义为 `500 pulse`

相关逻辑见 [`BSP_drivers/Src/bsp_eev.c`](./BSP_drivers/Src/bsp_eev.c)。

### 6.4 温度采样

工程当前使用两类温度源：

- `DHT22`：读取环境温湿度
- `2 路 NTC`：通过 ADC + DMA 连续采样

NTC 的处理流程：

1. ADC 连续采样 2 个通道
2. 由 ADC 值换算出电阻
3. 通过查表得到温度
4. 做一阶滤波平滑结果

### 6.5 人机界面

输入设备：

- 旋转编码器
- 编码器按键

显示设备：

- I2C OLED

当前 UI 逻辑：

- 长按：切换 `CTRL` / `TEMP` 页面
- 短按：在 `CTRL` 页面切换调节项 `PWM` / `EEV`
- 旋钮：修改当前选中的目标值

## 7. 引脚定义

详细引脚表见 [`PINOUT.md`](./PINOUT.md)。

核心引脚摘要如下：

| 引脚 | 名称 | 功能 |
| --- | --- | --- |
| `PA0` | `ENC_A` | 编码器 A 相 |
| `PA1` | `ENC_B` | 编码器 B 相 |
| `PA4` | `ENC_KEY` | 编码器按键 |
| `PA5` | `NTC1_ADC` | NTC1 采样 |
| `PA6` | `NTC2_ADC` | NTC2 采样 |
| `PA8` | `COMP_PWM_RAW` | 压缩机 PWM 输出 |
| `PB0` | `COMP_RUN_CTL` | 压缩机启停控制 |
| `PB1` | `COMP_FG_IN` | 压缩机 FG 输入 |
| `PB6` | `OLED_SCL` | OLED 时钟 |
| `PB7` | `OLED_SDA` | OLED 数据 |
| `PB8` | `DHT22_DATA` | DHT22 数据线 |
| `PB10` | `COMP_UART_TX` | 压缩机串口发送 |
| `PB11` | `COMP_UART_RX` | 压缩机串口接收 |
| `PB12~PB15` | `EEV_A~D` | 电子膨胀阀四相输出 |

## 8. 外设资源分配

| 外设 | 用途 |
| --- | --- |
| `TIM1` | 压缩机 PWM |
| `TIM2` | 编码器接口 |
| `TIM3` | FG 输入捕获 |
| `TIM4` | DHT22 微秒延时 |
| `ADC1 + DMA1_Channel1` | 双路 NTC 采样 |
| `I2C1` | OLED |
| `USART2` | HC-05 / 蓝牙预留 |
| `USART3` | 压缩机串口预留 |

## 9. 当前版本已做的工程化改造

在 `V0.5` 版本中，除了原来的 CubeIDE 工程，本仓库还新增了：

- `CMake` 构建脚本
- `VSCode` 的任务与调试配置
- `OpenOCD` 的 ST-Link 调试配置
- 统一的引脚文档
- 更适合版本管理的 `.gitignore`

同时做了几项不改变业务逻辑的效率优化，包括：

- 避免 `1ms` 任务在主循环中空转调用
- 减少 UI 文本格式化开销
- OLED 在显示内容不变时跳过刷新
- 高频 GPIO 路径用更轻量的寄存器写法
- NTC 查表由线性搜索改为二分搜索

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
STM32F1_Product_ACUnit_FW_V0.5/product_acunit
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
├─ product_acunit.elf
├─ product_acunit.bin
├─ product_acunit.hex
├─ product_acunit.map
└─ product_acunit.list
```

## 12. 在 VSCode 中一键构建与烧录

本工程已经提供好了 `.vscode` 配置：

- 默认构建任务：`cmake-build`
- 烧录任务：`stlink-flash`
- 调试配置：`STM32F103C8T6: Build + Flash + Debug`

使用方式：

- `Ctrl + Shift + B`：编译
- 运行任务 `stlink-flash`：编译并使用 ST-Link 烧录
- 按 `F5`：编译并进入 OpenOCD 调试

## 13. 烧录说明

当前烧录命令通过 `STM32_Programmer_CLI` 执行，写入地址：

```text
0x08000000
```

烧录对象：

```text
build/debug/product_acunit.bin
```

如果你的电脑已经正确安装 `STM32CubeCLT` 或 `STM32CubeProgrammer`，并且 ST-Link 驱动正常，这条链路可以直接使用。

## 14. 调试说明

调试链路使用：

- `arm-none-eabi-gdb`
- `openocd`
- ST-Link SWD

OpenOCD 配置文件：

- [`openocd/stm32f103c8_stlink.cfg`](./openocd/stm32f103c8_stlink.cfg)

## 15. 已知边界

当前版本仍有以下边界：

- 没有完整的自动控制策略
- 没有完整故障保护状态机
- 没有压缩机串口协议实现
- `USART2 / USART3` 目前只是初始化，业务层未正式使用
- `DHT22` 仍是阻塞式时序读取，但当前 2 秒采样一次，对现阶段影响可控

## 16. 版本说明

当前 release 版本：`V0.5`

建议后续版本号规划：

- `V0.5.x`：联调修正、稳定性修复、构建工具完善
- `V0.6.x`：加入串口协议、故障处理和参数存储
- `V1.0.0`：形成完整量产控制逻辑

## 17. 维护建议

后续如果继续开发，建议优先推进：

- 压缩机串口协议接入
- 参数掉电存储
- 故障与保护状态机
- 控制策略闭环化
- 调试日志输出
- 单板 bring-up 文档和测试流程文档

## 18. 联系与说明

本仓库当前以中文文档为主，便于项目交接、联调和内部维护。  
如果后续需要再补英文版文档、硬件接线图、状态机图或通信协议文档，可以在此基础上继续扩展。
