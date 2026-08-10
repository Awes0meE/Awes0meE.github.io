---
trial: revised
input: 01-smart-car.md
skill_revision: final redesign snapshot
trial_agent: final_snapshot_01
---

---
title: "When the “Code Bug” Started at the Solder Joint"
titleZh: "当“代码 bug”其实从焊点开始"
summary: "A 2024 MEC104 smart-car bring-up note, from assembling a bare PCB and testing each hardware layer to tuning left/right PWM steering—and learning why a software-looking symptom may begin in power, component orientation, or solder."
summaryZh: "一份 2024 年 MEC104 智能小车上电记录：从裸 PCB 焊接、分阶段硬件测试到左右 PWM 转向调参，也记下那些看似来自代码、实际可能藏在供电、元件方向或焊点里的问题。"
tags: ["MEC104", "Smart Car", "Hardware Bring-Up", "PWM", "Line Tracking"]
---

With a bare PCB on the bench, the code had not yet earned the right to take the blame.

一块裸 PCB 摆在焊台上时，代码还没有资格背锅。

This was our 2024 MEC104 Smart Car course project. I took part in board assembly, staged hardware testing, and track tuning with my group. The eventual goal was a car that could read the track and steer itself, but the first job was much less glamorous: turn an empty board into something we could power, probe, and test without immediately creating a second problem.

这是我们在 2024 年完成的 MEC104 智能小车课程项目。我和小组一起参与了电路板装配、分阶段硬件测试和赛道调参。最终目标当然是让小车读懂赛道、自己转向，但最先要做的事情朴素得多：把一块空板变成可以上电、可以测量，而且不会一动手就顺便制造第二个问题的系统。

## The Assembly Order Was Already Part of the Test Plan / 焊接顺序已经是测试计划的一部分

The manual recommended placing components from low to high and working from the center outward. On paper, that sounds like a small assembly convention. At the bench, it gave the build a usable order: every new component changed which pads remained easy to reach and which parts could still be inspected clearly.

手册建议按照元件由低到高、从中心向外的顺序安装。写在纸上，这像是一条不起眼的焊接规范；真到了焊台前，它其实已经在安排后面的可操作性——每多装一个元件，哪些焊盘还够得着、哪些位置还能看清楚，都会跟着变化。

The power section made that caution concrete. An LM7805 and its nearby capacitors sat at the start of everything the board was expected to do. Several of those capacitors were easy to damage during testing, so “the board powers on” was never a detail to rush past. An unstable supply could make a later sensor or motor symptom look far more mysterious than it really was.

电源部分很快把这种谨慎变成了具体问题。LM7805 和附近的电容站在整块板工作的起点上，而其中几只电容在测试时又比较容易受损，所以“板子能上电”绝不是一句可以匆匆带过的话。供电一旦不稳，后面的传感器或电机表现就很容易突然披上一件“玄学 bug”的外套。

![Soldering bench and power-section evidence / 焊台与电源模块证据](/uploads/projects/mec104-smart-car/TODO-soldering-bench-and-power-section.jpg)

## Fourteen Inputs Had to Queue Up / 十四路输入得排队进主控

The board carried six IR tracking sensors, six collision switches, and two keys. That is fourteen parallel input states before the motors even enter the story. The 74HC165 made the arrangement manageable by capturing those parallel states and shifting them out serially to the controller.

板上有 6 个红外循迹传感器、6 个碰撞开关和 2 个按键。电机还没登场，主控面前已经摆了 14 路并行输入。74HC165 在这里干的事情很直接：先把这一排状态收进来，再按串行顺序送出去，免得所有输入一起挤在主控门口。

That detail changed how I read the testing code. A sensor value was not just an isolated `HIGH` or `LOW`; it belonged to an acquisition chain. If one state looked wrong, the useful question became wider: was the physical switch working, was the sensor producing the expected level, and was the serialized input being read in the right place?

这个细节也改变了我看测试代码的方式。一个传感器值不再只是孤零零的 `HIGH` 或 `LOW`，它属于一整条输入采集链。某一位状态不对时，问题也得跟着放宽：是实体开关没有动作，是传感器电平不对，还是串行读入时拿错了位置？

![74HC165 input-chain screenshot / 74HC165 输入链路截图](/uploads/projects/mec104-smart-car/TODO-74hc165-input-chain.png)

## PWM Was Only One Link in the Steering Chain / PWM 只是转向链条中的一环

The L293 motor driver sat between the controller and the motors. Steering was expressed through separate left and right PWM values in the Arduino range from 0 to 255. Once the two sides could be adjusted independently, a turn became a difference between motor commands rather than a single abstract instruction to “go left.”

L293 电机驱动位于主控和电机之间。转向由左右两侧各自的 PWM 值表示，取值使用 Arduino 常见的 0 到 255 范围。两边速度能够分别调整以后，“左转”就不再是一句抽象命令，而是落实成左右电机指令之间的差值。

The code could calculate perfectly reasonable PWM numbers and the car could still behave badly. The numbers had to pass through the driver, the motor connections, the power section, and the soldered board before becoming wheel motion. This was where code and hardware started taking turns looking suspicious; staring harder at one side of the system was not much of a diagnostic method.

代码完全可能算出一组看起来很合理的 PWM，小车却依旧表现得不太合理。那些数字还要经过驱动芯片、电机连接、电源部分和整块焊好的电路板，最后才会变成车轮的动作。到了这里，代码和硬件开始轮流显得可疑；只盯着其中一边看得更用力，并不能自动变成排障方法。

![L293 and PWM course screenshot / L293 与 PWM 课程截图](/uploads/projects/mec104-smart-car/TODO-l293-and-pwm.png)

## The Complete Racing Program Came Last / 完整赛道程序最后才上场

Before running the complete racing program, we tested the hardware in smaller pieces: the LED, keys, collision switches, IR sensors, motors, and speed sensors. Each test narrowed the number of places a later fault could hide.

在运行完整赛道程序之前，我们先把硬件拆成小块测试：LED、按键、碰撞开关、红外传感器、电机和测速传感器逐项确认。每通过一项，后面出现问题时需要怀疑的范围就会小一点。

The sequence mattered because the full program connected every layer at once. If the car turned unexpectedly at that point, the symptom alone could not tell us whether the cause was sensor input, serialized data, PWM logic, the motor driver, a solder joint, component orientation, or unstable power. The separate testing sketches gave us checkpoints instead of one large, dramatic question mark.

这个顺序很重要，因为完整程序会一下子把所有层都连起来。小车如果此时突然转得不对，单看症状很难判断问题究竟来自传感器输入、串行数据、PWM 逻辑、电机驱动、焊点、元件方向，还是不稳定的供电。分开的测试程序给每一层都留了检查点，至少不用面对一个体积巨大的问号。

[Testing-code folder / 测试代码文件夹](/uploads/projects/mec104-smart-car/TODO-testing-code/)

![Staged hardware-test evidence / 分阶段硬件测试证据](/uploads/projects/mec104-smart-car/TODO-staged-hardware-tests.png)

## Outer Sensors Called for a Stronger Correction / 外侧传感器需要更强的修正

Track tuning turned the six IR readings into steering decisions. When an outer sensor was triggered, the car needed a stronger correction; an inner sensor called for a smaller one. The steering strategy therefore treated sensor position as an estimate of how far the car had wandered, then changed the left/right PWM difference accordingly.

赛道调参把 6 路红外输入变成了实际的转向动作。外侧传感器触发时，小车需要更强的修正；内侧传感器触发时，修正幅度则更小。于是传感器的位置可以用来估计小车偏离的程度，再据此改变左右 PWM 的差值。

The report records that strategy, while the final demo video shows the complete program at the point where the separate checks had finally been joined together. Neither artifact needs an invented lap time or an individual result to make the engineering visible; the useful evidence is the chain from sensed position to motor correction.

报告记录了这套转向策略，最终演示视频则留下了各项独立测试重新接回完整程序后的状态。这里不需要补写圈速，也不需要凭空加上个人比赛结果；真正值得看的证据，是从赛道位置被感知，到电机执行修正的整条链路。

[Steering-strategy report / 转向策略报告](/uploads/projects/mec104-smart-car/TODO-steering-strategy-report.pdf)

[Final demo video / 最终演示视频](/uploads/projects/mec104-smart-car/TODO-final-demo-video.mp4)

The lesson that kept returning was simple: a bug could look as if it had been born in the racing code even when it had started several steps earlier, beside the LM7805, under a reversed component, or inside a dull solder joint. By the time we tuned the outer and inner sensor corrections, the code had earned the right to be questioned—but it was no longer the only suspect in the room.

最后反复出现的教训其实很简单：一个问题看起来像是从赛道程序里长出来的，源头却可能早在几步之前——LM7805 旁边、装反的元件下面，或者某个不起眼的焊点里。等到我们开始调整内外侧传感器对应的修正幅度时，代码当然已经有资格被怀疑了，只是它再也不是屋里唯一的嫌疑人。
