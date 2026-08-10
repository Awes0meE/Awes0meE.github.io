# Trial 05: EXTI And Encoder Rewrite

Rewrite the stiff source paragraph below as a short bilingual learning note. Chinese should feel emotionally present and lightly humorous; English should keep the same experience and humor target with slightly lower intensity. Use content-specific headings only if they genuinely help.

## Confirmed experience

- I first polled a button in the STM32 main loop to change an LED state.
- For a rotary encoder, I moved to EXTI edge interrupts and read the B-phase level to decide whether the count increased or decreased.
- I used an OLED to display the count so the input event became observable.
- At first the count occasionally jumped. The confirmed cause was contact bounce, not an NVIC configuration error.
- The final exercise was still introductory; it did not implement a production-grade debounce algorithm.

## Stiff source paragraph

```text
本次学习首先完成了 GPIO 输入输出实验，其次学习了外部中断的配置方法，最后使用 OLED 对编码器计数结果进行显示。通过本次实验，我深入理解了 EXTI、NVIC 和编码器方向判断的基本原理，并为后续项目开发打下了坚实基础。
```

## Boundaries

- Do not claim mastery, production readiness, timing measurements, or hardware changes not listed above.
- Do not add a generic future-work section.
