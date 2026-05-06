#include "bsp_comp.h"

extern TIM_HandleTypeDef htim1;

static float s_spd_duty_pct = 0.0f;
static uint8_t s_run_enable = 0U;

static float clampf_local(float x, float min_v, float max_v)
{
    if (x < min_v) return min_v;
    if (x > max_v) return max_v;
    return x;
}

static void comp_run_pin_write(GPIO_PinState level)
{
    if (level == GPIO_PIN_SET)
    {
        COMP_RUN_CTL_GPIO_Port->BSRR = COMP_RUN_CTL_Pin;
    }
    else
    {
        COMP_RUN_CTL_GPIO_Port->BSRR = ((uint32_t)COMP_RUN_CTL_Pin << 16);
    }
}

void BSP_COMP_Init(void)
{
    HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);

    s_spd_duty_pct = 0.0f;
    s_run_enable = 0U;

    /* 你的硬件里 PB0 -> NMOS -> RUN 拉地失能
       所以高电平 = 失能停机，低电平 = 允许运行 */
    comp_run_pin_write(GPIO_PIN_SET);

    BSP_COMP_SetSpdDutyPct(0.0f);
}

void BSP_COMP_SetRunEnable(uint8_t en)
{
    s_run_enable = en ? 1U : 0U;

    if (s_run_enable)
    {
        comp_run_pin_write(GPIO_PIN_RESET);
    }
    else
    {
        comp_run_pin_write(GPIO_PIN_SET);
    }
}

void BSP_COMP_SetSpdDutyPct(float duty_pct)
{
    duty_pct = clampf_local(duty_pct, 0.0f, 100.0f);
    s_spd_duty_pct = duty_pct;

    /* PA8 -> 2N7002 开漏 -> 4.7k 拉到 5V
       所以送到驱动板 SPD 引脚的最终占空比，与 PA8 自身占空比相反 */
    float mcu_pwm_duty = 100.0f - duty_pct;

    uint32_t arr = __HAL_TIM_GET_AUTORELOAD(&htim1);
    uint32_t ccr = (uint32_t)(((arr + 1U) * mcu_pwm_duty) / 100.0f);

    if (ccr > arr) ccr = arr;

    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, ccr);
}

float BSP_COMP_GetSpdDutyPct(void)
{
    return s_spd_duty_pct;
}

uint8_t BSP_COMP_GetRunEnable(void)
{
    return s_run_enable;
}
