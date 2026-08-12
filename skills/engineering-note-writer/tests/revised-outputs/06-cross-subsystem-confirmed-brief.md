---
trial: revised
input: tests/inputs/06-cross-subsystem-confirmed-brief.md
phase: final-cognition-led-runtime
runtime_commit: 352c82878db75c2b27c0912b40eadd9dcf096181
trial_agent: /root/task6_green_trials/green_06
captured_at: 2026-08-12 Asia/Shanghai
---

# 当 **Connect** 把四件事连成一个系统

游戏一跑起来，笔记本的热量就像在提醒我：散热这件事，光忍着似乎有点亏。于是我想试试，能不能做一个外置控制器，让风扇不只是插电猛转，而是根据电脑端读到的状态调整输出。

最直接的起点是一段 ESP32 测试：最大 PWM，持续 30 秒。风扇确实转起来了，输出链路也确实存在，但这离“控制住温度”还差得很远。ESP32 的 LEDC 外设能按设定的频率和占空比在 GPIO 上生成 PWM；它解决的是怎样发出信号，并不会替我证明热量真的被有效带走。[Espressif 的 LEDC 文档](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/ledc.html)后来帮我把这层区别看得更清楚：占空比是命令，不是散热结果。

## PID 把问题推回了链路中间

为了让输出看起来更像一个真正的温度控制器，我花了差不多半周尝试 PID。结果并不体面，也没必要假装体面：我没有得到一个值得信任的闭环控制器。

PID 一卡住，注意力就开始在几个部分之间来回跳。ESP32 能不能稳定接收新的 PWM？蓝牙有没有把命令送到正确的位置？`Form1.cs` 里的 C# reader 与控制界面传递的，究竟是不是我以为的那个状态？这些问题没法被干净地分进“上位机一章”“通信一章”“硬件一章”，因为其中任何一段含糊，最后都会表现成同一个结果——风扇在转，但我无法确信它为什么这样转。

因此，演示版本退回到了比例控制。它没有实现我最初想象中的 PID 闭环，却至少保留了一条能够解释的关系：输入变化，控制量随之变化，ESP32 再把它变成 PWM 输出。这个退让有点遗憾，但比给一个不可靠的 PID 套上“完成”标签诚实得多。

## **Connect** 之后，零件第一次不再各说各话

真正让我满意的是 **Connect** 那一刻。

C# 桌面端、蓝牙通信、ESP32 PWM 板和风扇终于沿着同一条链路作出响应。单看其中任何一个都不算惊艳：一个界面、一块板、一段无线连接、一个会转的风扇。但系统演示跑起来时，它们第一次不再像四份互不相干的作业。

那种满足感并不来自某个算法突然变高级，而是来自“这边发生变化，那边真的接住了”。软件读到状态，控制关系给出输出，命令跨过蓝牙到达板端，风扇再把电信号变成空气运动。**Connect** 连接起来的不是几个文件，而是一条终于能从头走到尾的因果链。

## 泡棉缝隙给 PWM 补了一课

后来做泡棉和亚克力风道时，我对这套系统的理解又变了一次。

此前我很容易盯着占空比：数值更大，风扇更快，散热应该更强。可外壳迭代把一个更朴素的问题摆到了面前——风到底去了哪里？如果进风口受阻，或者空气从缝隙提前泄掉，那么再积极的 PWM 也不能替气流选择路线。

我现在更愿意把风扇和风道看成同一个空气系统。AMCA 对风机系统的说明指出，实际工作点由风机曲线与系统阻力曲线的交点决定；改变系统阻力，也会改变最终风量。[AMCA 201](https://www.amca.org/assets/resources/public/pdf/Education%20Modules/AMCA%20201-02%20%28R2011%29.pdf)给了我一个比“转得更快”完整得多的解释。风机入口或出口附近的障碍还可能带来额外损失，使安装后的表现偏离理想测试条件，[Greenheck 对 system effect 的说明](https://webcontent.greenheck.com/atg-cms-prod/docs/default-source/pdf-downloads/application-articles/system_eff.pdf?sfvrsn=fca6cf37_14)正好对应了外壳和进风几何为什么不能被当成最后才补上的包装。

项目里没有保留下来可供核对的风量、静压或完整温度曲线，所以这些资料不能替这台装置补出一组性能数据。它们只是让我明白，外壳并非控制器外面的一只盒子；它本身就在参与控制结果。

我记得实际玩游戏时，笔记本温度降了一些，帧率也感觉更稳。但准确温度和 FPS 没有作为测量记录保存下来，因此这里只能算个人体验，不能叫作经过验证的性能结论。记忆很擅长在事后把曲线画得漂亮，可惜硬盘没有替它签字。

最后留在我脑子里的，也就不再是“PID 没调出来”或者“PWM 能跑满 30 秒”这两个孤立结论。那次 **Connect** 真正连上的，是软件、电子、无线通信和空气路径；而泡棉与亚克力又提醒我，即使信号已经走通，热量仍然有自己的路要走。

下一次再看到占空比升高，我大概不会急着把它叫作散热增强了。我会先看风到底去了哪里。

---

# When **Connect** Turned Four Parts into One System

A hot laptop made gaming more frustrating than it needed to be, so I wanted to find out whether an external cooling controller could improve the experience. The idea was to make the fan respond to information from the computer rather than simply run at full speed whenever power was available.

The most direct starting point was an ESP32 test that held maximum PWM for 30 seconds. The fan ran and the output path existed, but that was still far from controlling temperature. The ESP32 LEDC peripheral generates a PWM signal on a GPIO with configured frequency and duty settings; it establishes the command signal, not evidence that heat is being removed effectively. The distinction became clearer to me through [Espressif’s LEDC documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/ledc.html): duty cycle is a command, not a cooling result.

## PID Sent My Attention Back into the Chain

I spent roughly half a week trying PID control. The outcome was simple, if disappointing: I did not get a closed-loop controller that I could trust.

Once PID stalled, my attention kept moving between subsystems. Could the ESP32 receive new PWM commands consistently? Was Bluetooth carrying the intended command? Did the C# reader and control interface in `Form1.cs` represent the state I thought they did? These questions did not fit neatly into separate software, communication, and hardware chapters. Uncertainty anywhere in the chain produced the same uncomfortable result: the fan was spinning, but I could not confidently explain why it was spinning that way.

The demonstrated build therefore fell back to proportional control. It did not deliver the PID loop I had originally imagined, but it preserved a relationship I could explain: the input changed, the control value followed, and the ESP32 converted that value into PWM. Calling that a fallback felt less impressive, but it was more honest than calling an untrustworthy PID controller finished.

## After **Connect**, the Parts Stopped Speaking Separately

The most satisfying point was **Connect**.

The C# desktop side, Bluetooth communication, the ESP32 PWM board, and the fan finally responded along one connected path. None of the parts looked remarkable in isolation: an interface, a board, a wireless link, and a spinning fan. During the system demonstration, however, they stopped feeling like four unrelated exercises.

The satisfaction came from seeing a change on one side actually reach the other. Software read a state, the control relationship produced an output, Bluetooth carried the command to the board, and the fan turned an electrical signal into moving air. **Connect** joined more than a few artifacts; it completed a causal chain that could finally be followed from end to end.

## The Foam Gaps Taught PWM Its Missing Lesson

A later foam-and-acrylic duct iteration changed my interpretation again.

Until then, it was easy to focus on duty cycle: a larger value meant a faster fan, which seemed to imply stronger cooling. The enclosure raised a more basic question—where was the air actually going? If the intake was restricted or air escaped through gaps, more aggressive PWM could not choose the airflow path for me.

I now prefer to think of the fan and duct as one air system. AMCA explains that the actual operating point is set by the intersection of the fan curve and the system-resistance curve, so changing resistance changes the resulting airflow. [AMCA Publication 201](https://www.amca.org/assets/resources/public/pdf/Education%20Modules/AMCA%20201-02%20%28R2011%29.pdf) gave me a more complete model than “faster rotation means more cooling.” Obstructions near a fan inlet or outlet can also introduce additional losses and make installed performance differ from ideal test conditions, as described in [Greenheck’s explanation of system effects](https://webcontent.greenheck.com/atg-cms-prod/docs/default-source/pdf-downloads/application-articles/system_eff.pdf?sfvrsn=fca6cf37_14).

The project did not retain airflow, static-pressure, or complete temperature curves, so those sources cannot manufacture performance data for this device. They only helped me understand why the enclosure was not packaging around the controller; it was participating in the result.

I remember the laptop temperature dropping and the frame rate feeling steadier during a game. The exact temperature and FPS values were not retained as measurements, so that remains a personal recollection rather than validated performance evidence. Memory is quite capable of smoothing a curve after the fact; the disk left no data to sign off on it.

What stayed with me was no longer just that PID had failed or that PWM could run at maximum for 30 seconds. **Connect** had joined software, electronics, wireless communication, and the physical airflow path. The foam and acrylic then added the final correction: even when the signal path is complete, heat still has a route of its own.

The next time I see duty cycle increase, I will probably hesitate before calling it improved cooling. First, I will look at where the air actually goes.
