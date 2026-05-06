#include "fan.h"

void FAN_Init(FAN_Handle *fan, TIM_HandleTypeDef *htim, uint32_t channel)
{
    fan->htim = htim;
    fan->channel = channel;
    fan->duty = 0;

    HAL_TIM_PWM_Start(fan->htim, fan->channel);
    FAN_SetDuty(fan, 0);
}

void FAN_SetDuty(FAN_Handle *fan, uint8_t percent)
{
    if (percent > 100) percent = 100;
    fan->duty = percent;

    uint32_t arr = __HAL_TIM_GET_AUTORELOAD(fan->htim);
    uint32_t ccr = (uint32_t)((arr + 1U) * (uint32_t)percent / 100U);
    __HAL_TIM_SET_COMPARE(fan->htim, fan->channel, ccr);
}

uint8_t FAN_GetDuty(FAN_Handle *fan)
{
    return fan->duty;
}
