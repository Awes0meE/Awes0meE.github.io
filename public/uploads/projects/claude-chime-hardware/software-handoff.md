# 单路电磁锁控制器电源管理板 V1.0 软件交接说明

## 1. 项目简介

本板是给 ESP32-S3 核心板使用的外接电源管理板，主要功能包括：

1. 单节 3.7V 锂电池充电管理；
2. 锂电池升压给 ESP 核心板备用供电；
3. 锂电池升压给 5V 电磁阀供电；
4. ESP GPIO 控制电磁阀开关；
5. ESP ADC 读取锂电池电压；
6. ESP GPIO 控制是否允许充电。

本板不包含 ESP 主控芯片。ESP32-S3 核心板通过 SH1.0-6P 线束连接到电源管理板。

---

## 2. 硬件供电结构

### 2.1 Type-C 在 ESP 核心板上

Type-C 接口不在本电源管理板上，而是在 ESP32-S3 核心板上。

Type-C 插电脑时：

```text
电脑 Type-C 5V
→ ESP 核心板 5V_BUS
→ ESP 板载 3.3V LDO
→ ESP32-S3 工作
```

同时，ESP 核心板的 5V_BUS 会通过 SH1.0 接到本电源管理板的 `ESP_5V_BUS`，用于给锂电池充电。

### 2.2 电池供电路径

锂电池接在本电源管理板的 `BAT+ / BAT-`。

本板有两路升压：

```text
BAT → 小升压 → ESP_5V → 二极管 → ESP_5V_BUS
BAT → 大升压 → SOL_5V → 电磁阀
```

说明：

- 小升压用于 Type-C 拔掉后给 ESP 核心板供电；
- 大升压用于给 5V 电磁阀供电；
- 两路升压输出不能混接；
- `SOL_5V` 只给电磁阀，不给 ESP 供电；
- `ESP_5V_BUS` 是 ESP 核心板的 5V 输入 / Type-C 5V 母线。

---

## 3. SH1.0-6P 接口信号说明

请以 PCB 丝印和线束最终顺序为准。当前设计中的 6 个网络如下：

| 信号名 | 方向 | 说明 |
|---|---|---|
| `ESP_5V_BUS` | 电源 | ESP 核心板 5V 母线，与 Type-C 5V 同节点 |
| `GND` | 电源地 | ESP 与电源板共地 |
| `SOL_CTRL` | ESP 输出 | 控制电磁阀 MOS 开关 |
| `CHARGE_CTRL` | ESP 输出 | 控制是否允许 MCP73831 给电池充电 |
| `ADC_ENABLE` | ESP 输出 | 控制电池电压采样分压电路是否打开 |
| `ADC_BAT` | ESP ADC 输入 | 电池电压采样信号 |

注意：

- `ESP_5V_BUS` 和 `GND` 不要接反；
- `SOL_CTRL / CHARGE_CTRL / ADC_ENABLE` 都是 3.3V GPIO 控制信号；
- `ADC_BAT` 接 ESP ADC 输入，不要配置成输出；
- 电磁阀的大电流不经过 SH1.0 接口，只通过电源板上的 `SOL+ / SOL-` 焊盘走线。

---

## 4. GPIO 控制逻辑

### 4.1 电磁阀控制：`SOL_CTRL`

硬件结构：

```text
SOL_5V → 电磁阀 → AO3400A N-MOS → GND
```

控制逻辑：

| `SOL_CTRL` | 电磁阀状态 |
|---|---|
| LOW / 0 | 关闭 |
| HIGH / 1 | 吸合 / 打开 |

说明：

- `SOL_CTRL` 默认应配置为 LOW；
- 上电初始化时必须先将 `SOL_CTRL` 拉低；
- 不建议上电后立即打开电磁阀；
- 建议等待系统电压稳定、读取电池电压后，再允许电磁阀动作。

推荐初始化：

```c
pinMode(SOL_CTRL, OUTPUT);
digitalWrite(SOL_CTRL, LOW);
```

---

### 4.2 充电控制：`CHARGE_CTRL`

本板使用 MCP73831 给单节锂电池充电。
`CHARGE_CTRL` 通过 2N7002 控制 MCP73831 的 `PROG` 脚。

控制逻辑：

| `CHARGE_CTRL` | 充电状态 |
|---|---|
| LOW / 0 | 禁止充电 |
| HIGH / 1 | 允许充电，最大约 300mA |

重要说明：

- `CHARGE_CTRL` 不能一直拉高；
- 当 Type-C 没有连接电脑 / 外部 5V 时，必须拉低；
- 否则可能出现“电池 → 小升压 → ESP_5V_BUS → 充电芯片 → 电池”的假充电回路，造成额外耗电和发热。

推荐策略：

```text
检测到 Type-C / USB 数据连接 / 上位机心跳存在：
    CHARGE_CTRL = HIGH，允许充电

检测不到 Type-C / USB 断开 / 心跳超时：
    CHARGE_CTRL = LOW，禁止充电
```

推荐初始化：

```c
pinMode(CHARGE_CTRL, OUTPUT);
digitalWrite(CHARGE_CTRL, LOW);
```

如果软件暂时无法判断 USB 是否连接，建议默认保持 `CHARGE_CTRL = LOW`，不要默认充电。

---

### 4.3 电池电压采样控制：`ADC_ENABLE` 和 `ADC_BAT`

电池电压通过分压后送到 ESP ADC。
为了避免分压电阻长期耗电，分压电路由 MOS 控制开关。

控制逻辑：

| `ADC_ENABLE` | ADC 分压电路 |
|---|---|
| LOW / 0 | 关闭，省电 |
| HIGH / 1 | 打开，可以读取 `ADC_BAT` |

推荐采样流程：

```text
1. ADC_ENABLE = HIGH
2. 延时 5ms ~ 10ms，等待 ADC 节点稳定
3. 连续采样 16 次或 32 次
4. 求平均值
5. ADC_ENABLE = LOW
```

电压换算公式：

```text
VBAT = Vadc × 1.682
```

其中：

```text
Vadc = ESP ADC 实际换算后的 ADC_BAT 电压
VBAT = 锂电池实际电压
```

设计参考：

```text
锂电池满电 4.2V 时，ADC_BAT 约为 2.5V
```

推荐初始化：

```c
pinMode(ADC_ENABLE, OUTPUT);
digitalWrite(ADC_ENABLE, LOW);

// ADC_BAT 配置为 ADC 输入
```

---

## 5. 推荐软件启动流程

建议 ESP 上电后按以下顺序执行：

```text
1. 初始化 GPIO
   - SOL_CTRL = LOW
   - CHARGE_CTRL = LOW
   - ADC_ENABLE = LOW

2. 延时 300ms ~ 1000ms
   - 等待电源稳定
   - 等待 USB 状态稳定

3. 读取一次 VBAT
   - 打开 ADC_ENABLE
   - 延时 5ms ~ 10ms
   - 多次采样取平均
   - 关闭 ADC_ENABLE

4. 判断电池电压是否允许电磁阀工作

5. 判断是否存在 USB / Type-C / 上位机连接
   - 如果存在，CHARGE_CTRL = HIGH
   - 如果不存在，CHARGE_CTRL = LOW

6. 进入主循环
```

---

## 6. 电池电压建议阈值

建议软件加入低电压保护，避免电磁阀动作时电池保护板触发或 ESP 重启。

| VBAT | 软件行为 |
|---|---|
| `VBAT > 3.5V` | 正常工作，允许电磁阀动作 |
| `3.3V < VBAT ≤ 3.5V` | 低电量，限制电磁阀动作频率 / 持续时间 |
| `VBAT ≤ 3.3V` | 禁止电磁阀动作 |
| `VBAT ≤ 3.1V` | 进入低功耗或提示严重低电量 |

说明：

- 电池保护板的过放保护通常比软件阈值更低；
- 不建议等保护板切断后再保护；
- 电磁阀动作瞬间会造成电池电压下跌，所以软件阈值要留余量。

---

## 7. 电磁阀控制注意事项

电磁阀由 `SOL_CTRL` 控制，建议先按普通开关量使用：

```text
SOL_CTRL = HIGH → 电磁阀吸合
SOL_CTRL = LOW  → 电磁阀释放
```

建议事项：

1. 上电后不要立刻打开电磁阀；
2. 打开电磁阀前先读取 VBAT；
3. 低电量时禁止打开电磁阀；
4. 单次吸合时间由业务逻辑限制；
5. 如果后续使用 PWM 保持电流，需先硬件实测确认 MOS、升压芯片、电磁阀温升。

---

## 8. USB / 充电判断建议

因为 Type-C 在 ESP 核心板上，本电源板无法直接知道 Type-C 是否插入。

软件可以用以下方式判断：

### 8.1 方案 A：USB CDC / 原生 USB 状态

ESP32-S3 使用原生 USB时，可以通过 USB CDC 连接状态、DTR 状态或 USB 事件判断电脑是否连接。

建议：

```text
USB 已连接并枚举成功：
    CHARGE_CTRL = HIGH

USB 断开：
    CHARGE_CTRL = LOW
```

### 8.2 方案 B：上位机心跳

如果上位机会通过 USB 串口给 ESP 发数据，可以设置心跳包。

建议逻辑：

```text
最近 N 秒内收到上位机心跳：
    CHARGE_CTRL = HIGH

心跳超时：
    CHARGE_CTRL = LOW
```

建议 N 取：

```text
2s ~ 5s
```

---

## 9. 已知硬件特性和限制

### 9.1 小升压和大升压默认常开

本硬件 V1.0 中：

```text
小升压：默认开启
大升压：默认开启
```

也就是说，接上电池后，两路升压会自动启动。

注意：

- 某些锂电池保护板可能对启动浪涌比较敏感；
- 如果电池接入后电压掉到约 1.4V ~ 1.6V，可能是电池保护板触发；
- 推荐使用持续放电能力 ≥3A，峰值 ≥5A 的带保护板锂电池。

### 9.2 充电电流

MCP73831 的充电电流由硬件电阻设置：

```text
最大充电电流约 300mA
```

软件只能通过 `CHARGE_CTRL` 允许或禁止充电，不能调节充电电流大小。

### 9.3 没有 STAT 状态反馈

本板没有把 MCP73831 的 STAT 状态接到 ESP。

所以软件无法直接知道：

```text
正在充电
充满
充电异常
```

软件只能控制是否允许充电，不能读取充电芯片状态。

---

## 10. 建议调试步骤

### 10.1 不接电磁阀，先测电源

接电池后测：

```text
BAT+ / BAT-：约 3.0V ~ 4.2V
ESP_5V：约 5V
SOL_5V：约 5V
```

### 10.2 接 ESP 核心板

确认：

```text
ESP 能正常上电
ESP_5V_BUS 稳定
ESP 3.3V 稳定
USB 通信正常
```

### 10.3 测 ADC

测试流程：

```text
ADC_ENABLE = HIGH
delay 10ms
读取 ADC_BAT
计算 VBAT = Vadc × 1.682
ADC_ENABLE = LOW
```

对照万用表测量电池电压，校准 ADC 系数。

建议做软件校准：

```text
VBAT = Vadc × 1.682 × K
```

其中 `K` 通过实测修正。

### 10.4 测充电控制

插 Type-C 后：

```text
CHARGE_CTRL = HIGH
```

用万用表观察电池电压是否缓慢上升，或测输入电流是否增加。

拔 Type-C / 无 USB 时：

```text
CHARGE_CTRL = LOW
```

避免假充电回路。

### 10.5 测电磁阀

接电磁阀后：

```text
SOL_CTRL = HIGH
```

观察：

```text
电磁阀是否吸合
BAT+ 是否明显掉压
SOL_5V 是否明显掉压
ESP 是否重启
```

如果 ESP 重启，优先检查：

```text
电池放电能力
电池保护板是否触发
SOL_5V 是否跌落
ESP_5V_BUS 是否跌落
GND 线是否太细 / 太长
```

---

## 11. 软件侧必须遵守的规则

1. 上电默认 `SOL_CTRL = LOW`；
2. 上电默认 `CHARGE_CTRL = LOW`；
3. 上电默认 `ADC_ENABLE = LOW`；
4. 只有确认 USB / 上位机连接时，才允许 `CHARGE_CTRL = HIGH`；
5. 每次读取电池电压前，先打开 `ADC_ENABLE`，延时后再读；
6. 读取完成后关闭 `ADC_ENABLE`；
7. 电池电压低于阈值时禁止电磁阀动作；
8. 不要在 ESP 刚上电时立即打开电磁阀；
9. 若电磁阀动作导致 ESP 重启，需要优先检查电池和供电，不要只改软件；
10. `ADC_BAT` 只能作为 ADC 输入，不要配置成输出。

---

## 12. 推荐伪代码

```c
void setup() {
    pinMode(SOL_CTRL, OUTPUT);
    pinMode(CHARGE_CTRL, OUTPUT);
    pinMode(ADC_ENABLE, OUTPUT);

    digitalWrite(SOL_CTRL, LOW);
    digitalWrite(CHARGE_CTRL, LOW);
    digitalWrite(ADC_ENABLE, LOW);

    delay(500);

    float vbat = read_battery_voltage();

    if (usb_or_host_connected()) {
        digitalWrite(CHARGE_CTRL, HIGH);
    } else {
        digitalWrite(CHARGE_CTRL, LOW);
    }
}

float read_battery_voltage() {
    digitalWrite(ADC_ENABLE, HIGH);
    delay(10);

    float vadc = read_adc_average(ADC_BAT, 32);
    digitalWrite(ADC_ENABLE, LOW);

    return vadc * 1.682;
}

bool can_open_solenoid() {
    float vbat = read_battery_voltage();

    if (vbat <= 3.3) {
        return false;
    }

    return true;
}

void solenoid_on() {
    if (!can_open_solenoid()) {
        digitalWrite(SOL_CTRL, LOW);
        return;
    }

    digitalWrite(SOL_CTRL, HIGH);
}

void solenoid_off() {
    digitalWrite(SOL_CTRL, LOW);
}

void loop() {
    if (usb_or_host_connected()) {
        digitalWrite(CHARGE_CTRL, HIGH);
    } else {
        digitalWrite(CHARGE_CTRL, LOW);
    }

    // Main application logic here
}
```

---

## 13. 交付备注

本板硬件版本：V1.0

本板只负责电源管理、电池采样和电磁阀功率驱动。

ESP 程序需要负责：

1. `CHARGE_CTRL` 充电允许逻辑；
2. `ADC_ENABLE` 电池采样开关逻辑；
3. `ADC_BAT` 电压换算；
4. `SOL_CTRL` 电磁阀控制；
5. 低电量禁止电磁阀动作。

如果出现电池接入后掉到 1.4V ~ 1.6V 的情况，通常是电池保护板触发，不一定是 PCB 短路。建议换用持续放电能力更高的带保护板锂电池。
