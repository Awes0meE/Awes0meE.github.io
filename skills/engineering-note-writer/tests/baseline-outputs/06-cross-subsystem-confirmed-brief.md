---
trial: baseline
input: tests/inputs/06-cross-subsystem-confirmed-brief.md
phase: baseline-before-cognition-led-redesign
runtime_commit: 663116c8587de716a5eb701548d4dc74e1222511
trial_agent: /root/task1_red_fixtures/baseline_06
captured_at: 2026-08-12 Asia/Shanghai
---

# Connect 之后，PWM 还是管不了风往哪走 / After Connect, PWM Still Couldn’t Tell the Air Where to Go

游戏时，笔记本一热起来，风扇声和帧率波动就会一起提醒我：散热这件事并不抽象。我想试试看，做一个外置散热控制器，能不能让这种体验少一点烦躁。

一开始，我以为核心问题大概是“怎样控制风扇”。真正做起来以后，注意力却不断在 ESP32 PWM 板、C# 桌面端、Bluetooth 通信，以及泡沫板和亚克力组成的风道之间跳来跳去。问题显然没有按软件、电路、无线、机械四个窗口排队挂号；每接通一部分，另一部分就会冒出来提醒我，它也在这个系统里。

## 问题没有按子系统排队

桌面端的读取与控制界面放在 `Form1.cs` 中，另一边则要让 ESP32 输出 PWM。为了先确认最直接的输出行为，我做过一个让 ESP32 以最大 PWM 运行 30 秒的测试。这个测试能回答“最大占空比命令有没有被执行”，却回答不了整套控制器是否真的有用。

C# 端、Bluetooth 和 PWM 板之间也不能完全分开看。桌面端发出的控制意图需要经过无线通信到达电子部分，电子部分的输出最后还要变成风扇和气流的实际变化。我的注意力因此来回切换：有时盯着 `Form1.cs`，有时回到 ESP32，有时又要确认 Bluetooth 这段连接。系统还没完整连起来时，每一块都很像主角；出问题时，它们又都很擅长把镜头推给下一块。

## PID 用掉了半周，闭环却没有站稳

我大约花了半周尝试 PID 控制。它是这次过程中很明确的一次弯路：我没有得到一个足够可信的闭环控制器，因此最终展示的版本退回到了比例控制。

这一区别很重要。程序里出现 PID 形式、参数能够调整，甚至输出看起来会变化，都不等于闭环已经可靠。既然当时没有做出可以信任的 PID 结果，就不能把“试过 PID”写成“完成了 PID 控制”。比例控制没有那么漂亮，但它至少与实际展示出来的系统一致。

## Connect 把四条链路接成了一个动作

真正让我觉得这套东西成立的，是 **Connect** 那一刻。

满足感并不来自某一个文件终于能运行，也不只是 ESP32 能输出 PWM。系统演示中，桌面软件、电子控制、Bluetooth 通信和实际的风扇与风道终于开始作为一套相连的东西响应。前面那些在不同子系统之间来回跳转的注意力，到这里才突然有了共同指向。

单独看，`Form1.cs` 是一个界面和读取程序，30 秒最大 PWM 是一个测试，泡沫板和亚克力只是一个外壳迭代。Connect 之后，它们不再只是几件并排放着的作品，而是同一个动作经过不同介质继续向前传递。那种“终于接上了”的感觉，比某一个模块单独通过测试更痛快。

## 风扇转得更快，空气却未必走对路

后来对外壳和风道的调整，又改变了我对控制问题的理解。占空比当然重要，但它只决定风扇被命令以多大力度工作。空气从哪里进入、经过什么路径、最后能不能到达笔记本进风位置，还取决于进气口和风道的几何形状。

换句话说，PWM 可以让风扇更卖力，却不能替空气选路。泡沫板与亚克力风道并不是控制器外面随手加上的包装；它们直接参与了系统结果。直到这一版结构出现，我才更清楚地意识到，软件里的控制量和机器真正得到的气流之间，还隔着一段非常物理的路。

我记得游戏过程中笔记本温度有所下降，帧率体感也更稳定。不过，准确的温度和 FPS 数值没有被保留下来，所以这些只能算当时的个人体验，不能当作经过验证的性能测试。真正能够确认的是各部分在系统演示中产生了连贯响应，以及风道迭代让我看到：提高 PWM 只是把风吹得更用力，风最终吹到哪里，仍然要由结构回答。

---

I started this project because gaming on a hot laptop made cooling impossible to ignore. I wanted to learn whether an external cooling controller could make that experience less frustrating.

At first, the central problem seemed to be fan control. In practice, my attention kept jumping among an ESP32 PWM board, a C# desktop application, Bluetooth communication, and an air duct made from foam board and acrylic. The problem did not respect subsystem boundaries. Each connected part revealed another part that also mattered.

## The Problem Did Not Respect Subsystem Boundaries

The desktop reader and control interface lived in `Form1.cs`, while the ESP32 handled the PWM output. To establish one clear piece of behavior, I ran a test that drove maximum PWM for 30 seconds. That test could show that the maximum-duty command was being executed, but it could not establish whether the complete controller was effective.

The C# application, Bluetooth link, and PWM board were difficult to treat as separate stages. A control action from the desktop had to cross the wireless connection, reach the electronics, and eventually become a physical change in the fan and airflow. I kept moving between `Form1.cs`, the ESP32, and the Bluetooth link because each one exposed a different part of the same question.

## Half a Week of PID Still Did Not Produce a Trustworthy Loop

I spent roughly half a week trying PID control. It was a genuine false start: I did not produce a closed-loop controller that I could trust, so the demonstrated build fell back to proportional control.

That distinction matters. PID-shaped code, adjustable parameters, and changing output do not by themselves prove that a closed loop is reliable. The proportional controller was less ambitious, but it accurately represented what the demonstrated system could do. The PID work remained an experiment, not a completed result.

## Connect Turned Four Links Into One Action

The most satisfying point was the **Connect** moment.

It was not the success of an isolated file or the fact that the ESP32 could generate PWM. In the system demo, the desktop software, electronics, Bluetooth communication, and the physical fan-and-duct arrangement finally responded as connected parts of one system. All the earlier jumps between subsystems suddenly had a common direction.

On their own, `Form1.cs` was a reader and control interface, the 30-second maximum-PWM run was a test, and the foam-and-acrylic structure was an enclosure iteration. After Connect, they became stages of the same action passing through software, wireless communication, electronics, and physical airflow. That complete response was more rewarding than any single module passing on its own.

## A Faster Fan Could Still Send Air the Wrong Way

A later enclosure iteration changed how I interpreted the control problem. Fan duty cycle mattered, but it only determined how strongly the fan was commanded to run. Intake geometry and the shape of the duct also affected where the air entered, how it travelled, and whether it reached the laptop intake.

PWM could ask the fan to work harder, but it could not choose the route for the air. The foam-and-acrylic duct was therefore not just packaging around the controller; it participated directly in the system’s behavior. The software command and the airflow reaching the laptop were separated by a very physical path.

I remember the laptop temperature dropping and the frame rate feeling steadier during a game. The exact temperature and FPS values were not retained, so those remain personal recollections rather than validated performance measurements. What the demo did confirm was a coherent response across the connected parts, while the enclosure iteration made the remaining lesson tangible: increasing PWM can push harder, but the structure still decides where the air goes.
