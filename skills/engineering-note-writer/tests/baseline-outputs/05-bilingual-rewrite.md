---
trial: baseline
input: 05-bilingual-rewrite.md
skill_revision: pre-redesign working tree
---

## From Polling to EXTI / 从轮询到 EXTI

一开始，我在 STM32 主循环里轮询按键，让 LED 跟着改变状态。按键还能慢慢等主循环来问，旋转编码器就没这么客气了：我改用 EXTI 捕捉边沿，每次中断读取 B 相电平，据此决定计数加一还是减一，再把结果显示到 OLED 上。输入事件终于变成了看得见的数字。

刚跑起来时，计数偶尔会突然多跳几格，编码器像是在偷偷给自己加戏。排查后确认原因是机械触点抖动，NVIC 配置本身正常。这个练习仍然停留在入门阶段，没有实现面向实际产品的完整消抖算法，但它让我第一次把“边沿触发、方向判断、结果观察”连成了一条清楚的调试路径。

I started by polling a button in the STM32 main loop and using it to change the LED state. That worked for a button, but the rotary encoder needed a more responsive path: I used EXTI to catch its edges, read the B-phase level inside the interrupt, and incremented or decremented the count accordingly. Displaying the count on the OLED made each input event visible.

At first, the count occasionally jumped by several steps, as if the encoder had added a little flourish of its own. The investigation traced this to mechanical contact bounce; the NVIC configuration was fine. This remained an introductory exercise without a production-grade debounce algorithm, but it connected edge triggering, direction detection, and observable output into one clear debugging path.
