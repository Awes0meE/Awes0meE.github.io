// Condensed from Study_STM32F103C8T6 / TIM4 PWM brightness control.
// Evidence scope: calibrated ADC-to-PWM lookup used by the LED brightness loop.

#include "stm32f10x.h"

typedef struct {
    uint16_t pwm;
    uint16_t adc;
} CalibPoint;

static const CalibPoint calibTable[] = {
    {   0, 1600 },
    {  10, 1530 },
    {  20, 1480 },
    {  30, 1400 },
    {  40, 1380 },
    {  50, 1350 },
    {  60, 1310 },
    {  70, 1290 },
    {  80, 1270 },
    {  90, 1220 },
    { 100, 1180 },
    { 200, 1015 },
    { 300,  850 },
    { 800,  551 },
    { 900,  515 },
    {1000,  480 }
};

#define CALIB_TABLE_SIZE (sizeof(calibTable) / sizeof(calibTable[0]))

void Set_LED_Brightness(uint16_t brightness)
{
    if (brightness > 999) {
        brightness = 999;
    }
    TIM_SetCompare1(TIM4, brightness);
}

uint16_t Lookup_PWM_For_Target(uint16_t target_adc)
{
    if (target_adc >= calibTable[0].adc) {
        return calibTable[0].pwm;
    }

    if (target_adc <= calibTable[CALIB_TABLE_SIZE - 1].adc) {
        return calibTable[CALIB_TABLE_SIZE - 1].pwm;
    }

    for (uint16_t i = 0; i < CALIB_TABLE_SIZE - 1; i++) {
        if (calibTable[i].adc >= target_adc &&
            calibTable[i + 1].adc <= target_adc) {
            int16_t adc1 = calibTable[i].adc;
            int16_t adc2 = calibTable[i + 1].adc;
            int16_t pwm1 = calibTable[i].pwm;
            int16_t pwm2 = calibTable[i + 1].pwm;

            float fraction = (float)(target_adc - adc1) / (float)(adc2 - adc1);
            float pwm_val = pwm1 + fraction * (pwm2 - pwm1);
            return (uint16_t)(pwm_val + 0.5f);
        }
    }

    return calibTable[CALIB_TABLE_SIZE - 1].pwm;
}
