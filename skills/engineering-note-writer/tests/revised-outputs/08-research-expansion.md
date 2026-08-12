---
trial: revised
input: tests/inputs/08-research-expansion.md
phase: final-cognition-led-runtime
runtime_commit: 352c82878db75c2b27c0912b40eadd9dcf096181
trial_agent: /root/task6_green_trials/green_08
captured_at: 2026-08-12 Asia/Shanghai
---

## 占空比之后，风还得穿过外壳

我最先盯着 PWM：原理图和固件里是四线风扇，演示也能看到它响应调速命令。做到这里时，我很容易把“风扇转起来、速度能变化”当成问题的主体。直到打印风道装上去，我才意识到，占空比只回答了我给风扇什么命令，并没有回答空气最后能走多少、走到哪里。

我现在更愿意把风扇和外壳看成同一个系统。风量并不是脱离安装环境的固定值；按照 [AMCA 对风机曲线的解释](https://www.amca.org/educate/articles-and-technical-papers/amca-inmotion-articles/straightening-out-fan-curves.html)，实际工作点由风机性能曲线和系统阻力曲线共同决定。进气口太窄、风道中的转折或遮挡都会形成压力损失，使同一转速下的实际风量不同；[Oriental Motor 的技术资料](https://www.orientalmotor.com/products/pdfs/F_TecRef/TecRefAll.pdf)也把这种关系归纳为气流阻力、静压与风量之间的配合。

缝隙则是另一种麻烦：它未必只是“漏一点风”，还可能变成阻力更小的旁路，让空气绕开原本希望它经过的位置，这和 [Eaton 对 ducted flow 与 bypass flow 的说明](https://www.eaton.com/us/en-us/products/thermal-management-solutions/cooling-architecture/ducted-versus-bypass-flow.html)是同一个问题。现有照片、CAD 和演示能证明风道存在、风扇也会响应控制，但没有测过静压、风量、泄漏或散热效果，所以我还不能说这版结构把风“送对了”。它真正改变的是我看问题的方式：PWM 决定风扇怎么转，进气、阻力和密封才决定这次转动有多少真正穿过了需要冷却的路径。
