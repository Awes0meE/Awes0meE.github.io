---
trial: revised
input: tests/inputs/08-research-expansion.md
phase: final-cognition-led-runtime
runtime_commit: 9eab429041e3478d3c58c6fc730828d02366477d
trial_agent: /root/task6_green_trials/final_08
captured_at: 2026-08-12 Asia/Shanghai
---

## 占空比只是风扇这一侧

我最先盯着的是 PWM。原理图和固件里确实接了一只四线 PWM 风扇，演示中它也会响应速度控制指令；但这最多说明控制链通了，不能把实际风量顺手也一起签收。直到打印风道装起来，我才意识到，占空比只是风扇这一侧的条件。

现在我更愿意用“工作点”理解这件事：风扇能送出多少空气，是风扇性能曲线与系统阻力曲线共同决定的，不能只看自由出风时的标称流量（[ebm-papst](https://www.ebmpapst.com/us/en/support/faq.html)）。入口附近若有缩口、急转或遮挡，会带来额外损失和不均匀进气，这类安装条件本身就可能改变风扇的实际表现（[Greenheck](https://www.greenheck.com/resources/blog/understanding-fan-system-effects)）。风道缝隙则可能形成更省力的旁路，让一部分空气绕开原本想经过的位置（[Eaton](https://www.eaton.com/us/en-us/products/thermal-management-solutions/cooling-architecture/ducted-versus-bypass-flow.html)）。

所以我现在不会再把“占空比更高”直接翻译成“冷却一定更强”。现有材料只说明风扇可控、风道存在；静压、体积流量、漏风和冷却效果都还没有测量，真实工作点仍然是空白。
