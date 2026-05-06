#include "bsp_eev.h"

/* =========================
   可调参数
   ========================= */

/* 满行程脉冲数 */
#define EEV_FULL_OPEN_PULSE         500

/* 回零时额外多打一些脉冲，确保顶到机械零位 */
#define EEV_HOME_EXTRA_PULSE         50

/* 回零步进间隔：建议更慢、更稳 */
#define EEV_HOME_STEP_INTERVAL_MS    25

/* 正常运行步进间隔：可比回零稍快 */
#define EEV_RUN_STEP_INTERVAL_MS     20

/* 开阀方向符号
   如果发现“开度加大其实在关阀”，改成 -1 */
#define EEV_OPEN_DIR_SIGN           (-1)

/* =========================
   模块内部状态
   ========================= */

static int16_t s_curr_pulse = 0;
static int16_t s_target_pulse = 0;
static uint8_t s_homed = 0U;
static uint8_t s_busy = 0U;

static uint8_t s_phase = 0U;
static uint16_t s_home_left = 0U;
static uint32_t s_last_step_ms = 0U;

#define EEV_ALL_PINS_MASK  (EEV_A_Pin | EEV_B_Pin | EEV_C_Pin | EEV_D_Pin)

/* 4相8拍，1-2相激磁 */
static const uint8_t k_seq[8][4] =
{
    {1,0,0,0},
    {1,1,0,0},
    {0,1,0,0},
    {0,1,1,0},
    {0,0,1,0},
    {0,0,1,1},
    {0,0,0,1},
    {1,0,0,1},
};

static int16_t clampi_local(int16_t x, int16_t min_v, int16_t max_v)
{
    if (x < min_v) return min_v;
    if (x > max_v) return max_v;
    return x;
}

static void eev_all_off(void)
{
    EEV_A_GPIO_Port->BSRR = ((uint32_t)EEV_ALL_PINS_MASK << 16);
}

static void eev_apply_phase(uint8_t idx)
{
    uint32_t set_mask = 0U;

    if (k_seq[idx][0]) set_mask |= EEV_A_Pin;
    if (k_seq[idx][1]) set_mask |= EEV_B_Pin;
    if (k_seq[idx][2]) set_mask |= EEV_C_Pin;
    if (k_seq[idx][3]) set_mask |= EEV_D_Pin;

    EEV_A_GPIO_Port->BSRR = ((uint32_t)(EEV_ALL_PINS_MASK & (~set_mask)) << 16) | set_mask;
}

static void eev_step_raw(int8_t dir)
{
    if (dir > 0)
    {
        s_phase = (uint8_t)((s_phase + 1U) & 0x07U);
    }
    else
    {
        s_phase = (uint8_t)((s_phase + 7U) & 0x07U);
    }

    eev_apply_phase(s_phase);
}

void BSP_EEV_Init(void)
{
    s_curr_pulse = 0;
    s_target_pulse = 0;
    s_homed = 0U;
    s_busy = 0U;
    s_phase = 0U;
    s_home_left = 0U;
    s_last_step_ms = 0U;

    eev_all_off();
}

void BSP_EEV_StartHome(void)
{
    s_home_left = EEV_FULL_OPEN_PULSE + EEV_HOME_EXTRA_PULSE;
    s_homed = 0U;
    s_busy = 1U;
    s_target_pulse = 0;
}

void BSP_EEV_SetTargetPulse(int16_t pulse)
{
    s_target_pulse = clampi_local(pulse, 0, EEV_FULL_OPEN_PULSE);
}

void BSP_EEV_MoveByPulse(int16_t delta)
{
    BSP_EEV_SetTargetPulse((int16_t)(s_target_pulse + delta));
}

void BSP_EEV_Task1ms(void)
{
    uint32_t now = HAL_GetTick();
    uint32_t interval_ms;

    /* -------- 回零流程 -------- */
    if (s_home_left > 0U)
    {
        interval_ms = EEV_HOME_STEP_INTERVAL_MS;

        if ((now - s_last_step_ms) < interval_ms)
        {
            return;
        }

        s_last_step_ms = now;

        /* 朝“关阀方向”走，直到顶到机械零位 */
        eev_step_raw(-EEV_OPEN_DIR_SIGN);
        s_home_left--;

        if (s_home_left == 0U)
        {
            s_curr_pulse = 0;
            s_target_pulse = 0;
            s_homed = 1U;
            s_busy = 0U;
            eev_all_off();
        }

        return;
    }

    /* -------- 正常运行流程 -------- */
    interval_ms = EEV_RUN_STEP_INTERVAL_MS;

    if ((now - s_last_step_ms) < interval_ms)
    {
        return;
    }

    if (s_curr_pulse < s_target_pulse)
    {
        s_last_step_ms = now;
        eev_step_raw(+EEV_OPEN_DIR_SIGN);
        s_curr_pulse++;
        s_busy = 1U;
    }
    else if (s_curr_pulse > s_target_pulse)
    {
        s_last_step_ms = now;
        eev_step_raw(-EEV_OPEN_DIR_SIGN);
        s_curr_pulse--;
        s_busy = 1U;
    }
    else
    {
        if (s_busy)
        {
            s_busy = 0U;
            eev_all_off();
        }
    }
}

int16_t BSP_EEV_GetCurrentPulse(void)
{
    return s_curr_pulse;
}

int16_t BSP_EEV_GetTargetPulse(void)
{
    return s_target_pulse;
}

float BSP_EEV_GetOpenPct(void)
{
    return (100.0f * (float)s_curr_pulse) / (float)EEV_FULL_OPEN_PULSE;
}

uint8_t BSP_EEV_IsHomed(void)
{
    return s_homed;
}

uint8_t BSP_EEV_IsBusy(void)
{
    return s_busy;
}
