# Style Examples

Use these examples to learn the move, not the exact wording.

## Start With The Engineering Event

Stiff:

```text
这是一篇对 Seamly2D 打包流程重新整理后的学习记录。
```

Cognition-led:

```text
Qt Creator 里的绿色运行按钮已经亮了，换到刚整理出来的 Release 目录，程序还是打不开。
```

Why it works: the writer's attention begins at the real gap between a development build and a portable package. That observed mismatch gives the next question somewhere concrete to come from.

## Put Humor Beside The Failure

Stiff:

```text
随后检查 DLL 依赖，并对部署目录进行进一步完善。
```

Cognition-led:

```text
DLL 已经铺满了整个目录，程序换台电脑还是打不开。这个画面多少有点喜剧效果，问题是它笑完还得继续查。
```

Why it works: the joke is inseparable from a confirmed packaging failure. It keeps the writer's reaction in the route without replacing the technical problem.

## Let The Component Explain The Code

Stiff:

```text
74HC165 可以实现并行输入转串行输出，节省单片机引脚资源。
```

Cognition-led:

```text
板上有 6 个红外传感器、6 个碰撞开关和 2 个按键，真要一根线一根线接回 Arduino，引脚先要开始紧张。74HC165 在这里做的事很直接，把这一排并行状态收进去，再排队送给主控。
```

Why it works: the component catches attention because fourteen inputs create a concrete constraint. The concept arrives where it changes how the wiring is understood.

## Cross Subsystems When Understanding Does

Archive route:

```text
控制板使用 ESP32 输出 PWM。上位机负责读取温度。外壳用于引导气流。
```

Cognition-led route:

```text
我最先盯着的是 PWM，觉得风扇转得更快，控制就算做完了。后来画外壳时，这个理解突然不够用了：如果风从泡棉缝里提前跑掉，占空比再积极，也只是让桌面更热闹。再回来看上位机里的温度映射，我才开始把它当成“热量怎样经过结构和控制一起被搬走”的问题，而不只是一个输出数值。
```

Why it works: the route crosses control, enclosure leakage, and temperature mapping, then synthesizes them into a changed systems-level question. It does not claim that pressure was measured or turn the three artifacts into isolated summaries.

## Replace Framework Headings With Subject Headings

Framework:

```markdown
## 怎么卡住
## 怎么改
## 回头看
```

Thought bookmarks:

```markdown
## Homebrew Qt 和官方 Qt 不在一条路径上
## `macdeployqt` 能收依赖，签名还没走完
## 脚本保住的是顺序，不是魔法
```

Why it works: each heading bookmarks the thought currently in view. Together they help the reader follow attention without exposing a complete writing framework.

## Keep English Calmer, Not Flatter

Chinese:

```text
计数器偶尔会多跳几格，编码器像是在偷偷给自己加戏。查了一圈，最后替 NVIC 洗清嫌疑的是最朴素的机械触点抖动。
```

English:

```text
The count occasionally jumped a few extra steps, as if the encoder had added a small flourish of its own. The investigation eventually cleared the NVIC setup and traced the behavior to ordinary mechanical contact bounce.
```

Why it works: both versions keep the same joke target and technical conclusion. English lowers the slang intensity without erasing the writer's reaction.

## End On The Last Useful Beat

Template ending:

```text
现在回头看，这次学习为后续工作打下了坚实基础。
```

Cognition-led ending:

```text
下一次再看到“开发机上能跑”，我大概不会那么快把它叫作 Release 了。
```

Why it works: the ending resolves the current understanding by calling back to the note's actual packaging problem. It does not claim vague growth or add a mandatory retrospective heading.
