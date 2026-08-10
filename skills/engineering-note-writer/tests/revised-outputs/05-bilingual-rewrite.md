---
trial: revised
input: 05-bilingual-rewrite.md
skill_revision: final redesign snapshot
trial_agent: bilingual_calibration_refactor_test
---
## 计数器偶尔抢跑 / When the Counter Got Ahead of Itself

最开始，我在 STM32 主循环里轮询按键，用它改变 LED 状态。到了旋转编码器，我把检测移到 EXTI 边沿中断里：边沿触发后读取 B 相电平，再决定计数加一还是减一。OLED 把计数直接显示出来，原本一闪而过的输入事件总算留下了“现场记录”。

计数偶尔会突然多跳几格，编码器像是趁我不注意给自己加戏。最终确认，背锅的不是 NVIC 配置，而是机械触点抖动。这仍是一次入门练习，我没有实现面向实际产品的消抖算法；不过轮询、EXTI、方向判断和可观察输出，至少不再是四个散开的名词。

I began by polling a button in the STM32 main loop and using it to change the LED state. For the rotary encoder, I moved the input handling to EXTI edge interrupts: after an edge triggered, I read the B-phase level to decide whether the count should increase or decrease. Displaying the result on the OLED gave those brief input events a visible record.

The count occasionally jumped a few extra steps, as if the encoder had added a small flourish while I was not looking. The confirmed cause was mechanical contact bounce, not an NVIC configuration error. This was still an introductory exercise, and I did not implement a production-grade debounce algorithm; however, polling, EXTI, direction detection, and observable output now formed one connected path instead of four separate terms.
