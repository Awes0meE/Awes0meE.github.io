---
trial: baseline
input: tests/inputs/08-research-expansion.md
phase: baseline-before-cognition-led-redesign
runtime_commit: 663116c8587de716a5eb701548d4dc74e1222511
trial_agent: /root/task1_red_fixtures/baseline_08
captured_at: 2026-08-12 Asia/Shanghai
---

## PWM 管转速，风道管工作点

我最开始盯着的是 PWM 占空比：原理图和固件能确认这里使用了四线 PWM 风扇，演示也能确认风扇会响应调速指令。后来把打印风道装起来，我才意识到，风扇转得更快只是问题的一半；照片和 CAD 能证明风道确实存在，却不能告诉我实际有多少空气穿过了目标区域。

我现在更愿意把它理解成两条曲线的相遇。[Greenheck 的风机性能说明](https://webcontent.greenheck.com/atg-cms-prod/docs/default-source/pdf-downloads/application-articles/perf_basics.pdf?sfvrsn=6df9b7ac_16)把实际工作点定义为风机性能曲线与系统阻力曲线的交点，而风道、弯折、进风口和其他阻流结构造成的压力损失都会进入后者。也就是说，PWM 改变的是风扇这一侧的工作状态；装上外壳之后，进风是否受限、流道有多曲折，同样会改变最后得到的风量。占空比并不是风量旋钮，这个弯我算是做到外壳以后才转过来。

风道也不只是“多了一圈塑料”。密闭流道可以把空气引向需要冷却的位置，但接缝或空隙如果形成更容易通过的路径，空气也可能绕开目标区域；[Eaton 对 ducted flow 与 bypass flow 的说明](https://www.eaton.com/us/en-us/products/thermal-management-solutions/cooling-architecture/ducted-versus-bypass-flow.html)正好解释了这种区别。对这件打印风道，我目前只能把进风限制、沿程损失和可能的泄漏视为需要检查的因素，不能说它们已经发生，更不能给出大小。现有演示证明调速命令有效，外壳资料证明流道做出来了；它究竟带来了多少静压、风量或冷却变化，还需要测量才能回答。
