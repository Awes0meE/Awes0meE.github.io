---
trial: revised
input: tests/inputs/06-cross-subsystem-confirmed-brief.md
phase: final-cognition-led-runtime
runtime_commit: 9eab429041e3478d3c58c6fc730828d02366477d
trial_agent: /root/task6_green_trials/final_06
captured_at: 2026-08-12 Asia/Shanghai
---

# Connect 亮起以后，四个子系统才变成一台散热器

## 最大 PWM 跑了 30 秒，问题却跑出了电路板

项目最初没有什么宏大的控制目标。笔记本一玩游戏就热，过程也跟着变得不痛快。我想知道，一套外置散热控制器能不能让这件事少一点烦躁。

最先吸引我的是最容易改变的数字：PWM 占空比。那段让 ESP32 以最大 PWM 连续运行 30 秒的测试很直接，至少证明板子能够把输出拉起来并保持住。可风扇全速运行，只回答了“能不能转”；游戏体验会不会改善，温度为什么变化，空气最后进了哪里，它一句也没回答。

注意力就这样离开了 GPIO，跳到了 Windows。

## `Form1.cs` 把温度送进了蓝牙链路

[`Form1.cs`](/uploads/projects/juanyun-public/diy-cooling/desktop-form1.cs)读取 CPU 和 GPU 温度，列出串口，并在点击 **Connect** 后发送数据。单看它只是一个并不复杂的 C# 界面；接到 ESP32 以后，屏幕里的读数才有机会变成 PWM 输出。

这里最容易让人误判的是：每一段单独看都像已经完成。上位机能读温度，蓝牙能传字符，ESP32 能输出 PWM，风扇也能转。然而只要串口没有连上、消息没有被正确接住，或者控制规则没有更新占空比，这些“能运行”的零件依然互不相干。

也正是在这里，我把注意力拐进了 PID。

## PID 先把我调了半周

我花了大约半周尝试 PID，最后没有得到一套值得信任的闭环控制器。困难远不只是把三个公式写进代码：目标温度怎么定，误差怎样进入控制，积分如何避免越积越多，微分又会不会追着温度噪声乱跑，每个问题都比“让风扇快一点”大得多。

我当时退回了比例控制；更准确地说，演示版留下的是一条把温度直接映射为 PWM 占空比的比例规则。按照我后来重新查到的 [PID 控制说明](https://www.ni.com/en/shop/labview/pid-theory-explained.html)，标准的比例项建立在设定值与过程变量之间的误差上。我的实现没有形成这样一套经过验证的闭环，所以把它写成“调通了 P 控制”仍然太满。它完成的是一件更朴素、也更重要的事：温度升高时，让风扇确实得到更高的输出命令。

PID 没把风扇调明白，倒先把我调了半周。好在退一步之后，整条链终于有机会往前走。

## 点下 Connect，软件、板子和风道同时回答

[系统演示](/uploads/projects/juanyun-tech/diy-cooling-desktop-demo.mp4)里最让我满足的不是某一行 C#，也不是 ESP32 上的一次 PWM 更新，而是点下 **Connect** 以后，温度数据穿过桌面程序与蓝牙，落到控制板上，再让安装在泡棉与亚克力结构里的风扇作出反应。

那一刻，几个此前轮流出问题的部分终于同时回答了。界面不再只是一个读数窗口，PCB 也不再只是会输出波形的板子；软件、电子电路、无线通信和实体风路第一次像同一套系统那样工作。

这种满足感也解释了为什么 PID 的失败没有毁掉整个项目。比例规则并不漂亮，却让连接完整地发生了。对当时的我来说，这个 **Connect** 比单独完成任何一个文件都更像“做成了”。

## 占空比不会替空气选择方向

后来的泡棉与亚克力风道迭代，又把我从控制板旁边拉开了一次。占空比当然重要，但它只能要求风扇怎样工作，不能替空气决定往哪里走。泡棉有没有漏风、风扇与笔记本进风口是否对齐、截面和转折怎样安排，都会改变相同 PWM 命令最终产生的效果。

我现在更愿意用风机与系统共同作用来理解这件事。[Greenheck 的风机性能说明](https://webcontent.greenheck.com/atg-cms-prod/docs/default-source/pdf-downloads/application-articles/perf_basics.pdf?sfvrsn=6df9b7ac_16)把实际工作点描述为风机曲线与系统阻力曲线的交点；[AMCA 对 system effect 的说明](https://www.amca.org/educate/articles-and-technical-papers/amca-inmotion-articles/mitigating-system-effect-to-optimize-fan-performance-efficiency.html)也指出，风机入口或出口附近不理想的流动条件会损失系统性能。它们没有替这台原型提供测量结果，却让我重新读懂了那次外壳修改：更高的 PWM 不是风道问题的万能答案。

我记得玩游戏时温度有所下降，帧率也感觉稳定了一些，但没有留下足以复核的温度和 FPS 数据，更没有受控对照。因此，这只能是我对使用体验的回忆，不能写成经过验证的性能提升。

真正留下来的理解反而更清楚：控制并没有终止在占空比上。下一次再看到 PWM 已经拉满，我大概会先把视线从代码移开，看看空气到底被送去了哪里。

# When Connect Lit Up, Four Subsystems Became One Cooler

## A 30-Second Maximum-PWM Test Pushed the Question Beyond the Board

The project began with a laptop that ran hot during gaming. I wanted to find out whether an external cooling controller could make that experience less frustrating.

PWM duty was the first obvious variable to watch. One ESP32 test held the output at maximum PWM for 30 seconds, confirming that the board could issue and sustain the command. But full-speed operation answered only whether the fan could run. It did not explain whether the gaming experience would improve, why the temperature might change, or where the air would actually travel.

That moved my attention away from the GPIO and toward Windows.

## `Form1.cs` Put Temperature onto the Bluetooth Link

[`Form1.cs`](/uploads/projects/juanyun-public/diy-cooling/desktop-form1.cs) reads CPU and GPU temperatures, lists serial ports, and begins sending data after **Connect** is clicked. On its own, it is a modest C# interface. Connected to the ESP32, its readings can become PWM commands in the physical controller.

Each part could look finished in isolation: the application could read temperatures, Bluetooth could carry characters, the ESP32 could generate PWM, and the fan could spin. Yet a missing serial connection, an unrecognized message, or a duty value that never updated was enough to leave those working pieces unrelated.

That gap was what pulled me toward PID.

## PID Occupied Half a Week; a Proportional Rule Survived

I spent roughly half a week trying PID and never produced a closed-loop controller I could trust. The difficulty went well beyond placing three terms in code. I still had to choose a temperature target, define the error, contain the integral term, and decide whether the derivative response would simply chase noisy readings.

The demonstrated build fell back to proportional control—or, more precisely, a direct proportional mapping from temperature to PWM duty. As [NI’s PID overview](https://www.ni.com/en/shop/labview/pid-theory-explained.html) explains, the standard proportional response is based on the error between a setpoint and a process variable. My implementation did not establish and validate that complete loop, so describing it as a tuned P controller would overstate the result. What it did achieve was simpler: a higher temperature produced a higher fan command.

PID did not tune the fan successfully, but it did consume half a week of my patience. Stepping back gave the rest of the system a chance to move forward.

## Connect Made the Software, Board, and Air Path Answer Together

The most satisfying part of the [system demo](/uploads/projects/juanyun-tech/diy-cooling-desktop-demo.mp4) was not an individual line of C# or a single PWM update. It was clicking **Connect**, watching temperature data cross the desktop application and Bluetooth link, reach the controller, and make the fan respond inside the foam-and-acrylic structure.

For the first time, the parts that had taken turns exposing problems answered together. The interface was no longer only a temperature display, and the PCB was no longer only a board that generated a waveform. Software, electronics, wireless communication, and the physical airflow path were behaving as one system.

That moment also explains why the failed PID attempt did not invalidate the project. The proportional rule was limited, but it completed the connection. At that stage, **Connect** felt more significant than finishing any artifact in isolation.

## Duty Cycle Cannot Choose the Air’s Destination

A later foam-and-acrylic duct iteration pulled my attention away from the controller again. Duty cycle mattered, but it could only command the fan. It could not decide where the air went. Leakage around the foam, alignment with the laptop intakes, and the geometry of the flow path all affected what the same PWM command could accomplish.

I now understand this more clearly as an interaction between the fan and the air system. Greenheck’s [guide to fan performance](https://webcontent.greenheck.com/atg-cms-prod/docs/default-source/pdf-downloads/application-articles/perf_basics.pdf?sfvrsn=6df9b7ac_16) describes the operating point as the intersection of the fan curve and the system-resistance curve. AMCA’s discussion of [system effect](https://www.amca.org/educate/articles-and-technical-papers/amca-inmotion-articles/mitigating-system-effect-to-optimize-fan-performance-efficiency.html) likewise explains how unfavorable inlet or outlet flow conditions can reduce system performance. Those sources do not provide measurements for my prototype, but they changed how I interpret the enclosure revision: more PWM could not solve the airflow path by itself.

I remember the laptop temperature dropping and the frame rate feeling steadier during gaming. I did not retain measurements or run a controlled comparison, so that remains a remembered experience rather than validated performance evidence.

The more durable lesson is that control did not end at the duty value. The next time I see PWM already at maximum, I will probably look away from the code first and ask where the air is actually going.
