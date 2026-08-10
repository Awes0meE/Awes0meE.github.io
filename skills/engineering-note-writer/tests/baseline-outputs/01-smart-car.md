---
trial: baseline
input: 01-smart-car.md
skill_revision: pre-redesign working tree
---

---
title: "MEC104 Smart Car Bring-Up From a Bare PCB"
titleZh: "从裸 PCB 开始的 MEC104 智能小车调试"
summary: "A 2024 MEC104 build note following the smart car from board assembly and LM7805 power checks through 74HC165 input tests, L293 motor driving, staged Arduino checks, and track-side PWM tuning."
summaryZh: "2024 年 MEC104 智能小车从裸 PCB 装配开始，经过 LM7805 电源检查、74HC165 输入测试、L293 电机驱动、Arduino 分段验证，再到赛道上的 PWM 转向调参。"
date: "2024"
tags: ["Arduino", "Embedded Systems", "Smart Car", "Line Tracking", "PWM", "Soldering", "Course Note"]
visibility: public
---

<!-- Replace each PATH_TBD value with a reviewed public upload path before publishing. -->

## Starting From a Bare PCB / 从裸 PCB 开始

The 2024 MEC104 Smart Car project began with a bare PCB. I worked with my group on board assembly, staged hardware tests, and track tuning. Before any complete program could mean much, the components had to be installed in the right direction, the solder joints had to be reliable, and each circuit block needed to respond on its own.

2024 年的 MEC104 Smart Car 项目从一块裸 PCB 开始。我和组员一起参与了板卡装配、分阶段硬件测试和赛道调参。完整程序真正有意义之前，元件方向要装对，焊点要可靠，每个电路模块也要能单独响应。

The manual recommended installing components from low to high and from the center outward. That order made the crowded board easier to handle: shorter components could be soldered while the surrounding area was still open, then taller parts could be added without blocking the iron or hiding nearby joints.

手册建议按从低到高、从中心到外围的顺序安装元件。这个顺序对一块元件密集的板子很实用：周围还比较空的时候先焊低矮元件，再逐步加入更高的器件，烙铁不容易被挡住，附近焊点也更方便检查。

![Smart car board during soldering and assembly / 智能小车焊接与装配现场](PATH_TBD/soldering-bench.jpg)

## Checking Power Before Chasing Logic / 先查电源，再追逻辑

The power section used an LM7805 with nearby capacitors to provide the regulated 5 V supply. Several capacitors proved easy to damage during testing, so this small area of the board deserved attention whenever the car behaved inconsistently. Component direction, solder quality, and supply stability all sat upstream of the Arduino readings and motor commands.

电源部分使用 LM7805 和周围的电容提供稳压 5 V。测试过程中有几个电容比较容易损坏，所以小车表现不稳定时，这一小块电路值得优先检查。元件方向、焊接质量和供电稳定性都处在 Arduino 读数与电机指令的上游。

This became a recurring debugging lesson. A symptom might first appear in the program—a sensor value looks wrong, a key does not respond, or a motor command behaves strangely—while the cause may be a solder joint, a reversed component, or unstable power several steps earlier.

这也成了整个项目里反复出现的调试经验。问题经常先在程序里露出来：传感器数值不对、按键没有响应，或者电机指令表现奇怪；原因却可能藏在更前面的焊点、元件方向或供电状态里。

![LM7805 power section and nearby capacitors / LM7805 电源模块与周边电容](PATH_TBD/course-power-block.png)

## Reading Many Inputs Through the 74HC165 / 用 74HC165 读取多路输入

The board had six IR tracking sensors, six collision switches, and two keys. Reading all of those parallel signals directly would require a large number of controller pins. The 74HC165 serialized the input states, giving the controller a smaller interface to the complete set of switches and sensors.

板上有 6 个红外循迹传感器、6 个碰撞开关和 2 个按键。如果直接读取这些并行信号，会占用很多主控引脚。74HC165 把各路输入状态串行化，让主控通过更少的接口读取整组开关和传感器。

This circuit also gave the testing code a clear job. A key test could focus on the two keys, a collision-switch test could watch the six contact inputs, and an IR test could show whether the tracking sensors changed state as expected. Each small program made one section observable before those readings were allowed to affect the motors.

这部分电路也让测试代码有了很明确的分工。按键测试只关注两个按键，碰撞开关测试观察 6 路触点输入，红外测试则检查循迹传感器能不能按预期改变状态。每个小程序先让一个模块变得可观察，再让这些读数参与电机控制。

![IR sensors, collision switches, and keys / 红外传感器、碰撞开关与按键](PATH_TBD/course-input-devices.png)
![74HC165 parallel-to-serial input path / 74HC165 并行转串行输入链路](PATH_TBD/course-74hc165.png)

## From L293 Outputs to PWM Steering / 从 L293 输出到 PWM 转向

The L293 motor driver sat between the controller and the motors. The controller produced the direction and speed commands, while the driver handled the motor side of the circuit. On the Arduino side, left- and right-wheel PWM values used the familiar range from 0 to 255.

L293 电机驱动器位于主控和电机之间。主控给出方向与速度指令，驱动器负责连接到电机侧的电路。在 Arduino 程序里，左右轮 PWM 使用常见的 0 到 255 数值范围。

Track tuning turned those values into steering behavior. When an outer IR sensor detected the line, the car needed a stronger correction. When an inner sensor detected it, a smaller correction was enough. Sensor position therefore became a rough correction scale: the farther the detected line was from the center, the larger the left-right PWM difference could be.

到了赛道调参阶段，这些数值才真正变成转向动作。外侧红外传感器检测到黑线时，小车需要更强的修正；内侧传感器触发时，较小的修正已经够用。传感器位置因此形成了一套粗略的修正尺度：黑线离中心越远，左右轮之间的 PWM 差值就可以越大。

The report PDF preserves this steering strategy. It is more useful than a single unexplained pair of PWM values because the tuning depended on where the line appeared under the sensor array. The available material does not record a lap time or an individual competition result, so the note stays focused on the control method and the bring-up process.

报告 PDF 保留了这套转向策略。它比一组脱离场景的 PWM 数值更有用，因为调参依据是黑线出现在传感器阵列的什么位置。现有材料没有记录圈速或个人比赛结果，所以这里保留的是控制方法和分阶段调试过程。

![L293 motor-driver block / L293 电机驱动模块](PATH_TBD/course-l293.png)
![Arduino PWM range and motor-speed control / Arduino PWM 范围与电机调速](PATH_TBD/course-pwm.png)

## Bringing the Car Up One Block at a Time / 一次只验证一个模块

Before running the complete racing program, we tested the LED, keys, collision switches, IR tracking sensors, motors, and speed sensors separately. These checks divided one complicated system into smaller questions: can the board produce an output, can it read a switch, can it see the line, and can each motor respond to a command?

运行完整赛道程序之前，我们分别测试了 LED、按键、碰撞开关、红外循迹传感器、电机和测速传感器。这些检查把一整套复杂系统拆成了几个小问题：板子能不能产生输出，能不能读取开关，能不能识别黑线，每个电机能不能响应指令。

This staged order mattered once several modules were connected at the same time. If the full program behaved strangely, the smaller tests provided a place to step back. A working LED test could confirm basic execution; an IR test could separate sensor readings from steering logic; a motor test could check the driver and wiring without waiting for the tracking algorithm.

多个模块同时接入以后，这种分段顺序更有价值。完整程序表现异常时，可以退回到更小的测试。LED 测试可以确认基础执行链路，红外测试可以把传感器读数和转向逻辑分开，电机测试则能在不依赖循迹算法的情况下检查驱动与接线。

![Staged hardware-test checklist / 分阶段硬件测试清单](PATH_TBD/course-staged-tests.png)

## Files and Evidence / 文件和证据

- [Power, 74HC165, L293, PWM, and staged-test screenshots](PATH_TBD/course-screenshots/) explain the circuit blocks and the intended bring-up sequence.
- [Soldering-bench photo](PATH_TBD/soldering-bench.jpg) records the project while the board was still being assembled and checked.
- [Steering-strategy report PDF](PATH_TBD/smart-car-report.pdf) records how inner and outer sensor triggers were mapped to different correction strengths.
- [Testing-code folder](PATH_TBD/testing-code/) keeps the separate LED, key, collision-switch, IR, motor, and speed-sensor checks.
- [Final demo video](PATH_TBD/final-demo-video.mp4) records the assembled car running with the modules combined.
- The original tutorial PDF remains outside the public site; the page uses selected course screenshots as references.

- [电源、74HC165、L293、PWM 与分段测试截图](PATH_TBD/course-screenshots/) 说明了主要电路模块和建议的 bring-up 顺序。
- [焊接现场照片](PATH_TBD/soldering-bench.jpg) 记录了板卡仍在装配和检查中的阶段。
- [转向策略报告 PDF](PATH_TBD/smart-car-report.pdf) 记录了内外侧传感器触发时采用不同修正强度的思路。
- [测试代码文件夹](PATH_TBD/testing-code/) 保留了 LED、按键、碰撞开关、红外传感器、电机和测速传感器的独立测试。
- [最终演示视频](PATH_TBD/final-demo-video.mp4) 记录了各模块组合后的小车运行状态。
- 原始 tutorial PDF 不放入公开站点；页面使用经过选择的课程截图作为参考。

## Looking Back / 现在回头看

The most durable part of this project is the debugging order it taught me. The complete chain started at a soldered component, passed through power and input serialization, reached the Arduino program, and ended as left- and right-wheel PWM. A fault anywhere along that path could surface as movement that looked like a software problem.

现在回头看，这个项目留下来最牢的一点，是它教会了我一套调试顺序。完整链路从焊上去的元件开始，经过供电和输入串行化，再进入 Arduino 程序，最后变成左右轮 PWM。链路中任何位置出问题，都可能以一个很像软件错误的运动现象表现出来。

The separate test programs made that chain manageable. Check the power, observe one input group, drive one output block, then combine the system and tune it on the track. That sequence later became a useful habit whenever hardware and code started pointing at each other.

分开的测试程序让这条链路变得可以处理：先检查供电，再观察一组输入，接着驱动一个输出模块，最后把系统合起来放到赛道上调。后来再遇到硬件和代码互相“甩锅”的情况时，这套顺序依然很好用。
