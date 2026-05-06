// Condensed from Study_STM32F103C8T6 / 2-1 STM32 basic peripheral example.
// Evidence scope: GPIO clock setup, OLED status output, and onboard LED blink loop.

#include "stm32f10x.h"
#include "Delay.h"
#include "OLED.h"

static void LED_Turn(GPIO_TypeDef *port, uint16_t pin)
{
    if (GPIO_ReadOutputDataBit(port, pin)) {
        GPIO_ResetBits(port, pin);
    } else {
        GPIO_SetBits(port, pin);
    }
}

int main(void)
{
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);

    GPIO_InitTypeDef oledPower;
    oledPower.GPIO_Mode = GPIO_Mode_Out_PP;
    oledPower.GPIO_Pin = GPIO_Pin_4 | GPIO_Pin_5;
    oledPower.GPIO_Speed = GPIO_Speed_50MHz;
    GPIO_Init(GPIOB, &oledPower);

    GPIO_SetBits(GPIOB, GPIO_Pin_5);
    GPIO_ResetBits(GPIOB, GPIO_Pin_4);

    OLED_Init();
    OLED_ShowString(1, 1, "Status: OFF");
    OLED_ShowString(2, 1, "Open Count: 00");

    GPIO_InitTypeDef led;
    led.GPIO_Mode = GPIO_Mode_Out_PP;
    led.GPIO_Pin = GPIO_Pin_13;
    led.GPIO_Speed = GPIO_Speed_50MHz;
    GPIO_Init(GPIOC, &led);

    while (1) {
        GPIO_SetBits(GPIOC, GPIO_Pin_13);
        Delay_ms(300);
        GPIO_ResetBits(GPIOC, GPIO_Pin_13);
        Delay_ms(300);
    }
}
