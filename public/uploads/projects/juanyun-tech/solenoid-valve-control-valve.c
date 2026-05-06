#include "valve.h"

// ===== GPIO 映射：PB12~PB15 -> ULN2003 IN1~IN4 =====
#define VALVE_GPIO_Port   GPIOB
#define VA_Pin            GPIO_PIN_12
#define VB_Pin            GPIO_PIN_13
#define VC_Pin            GPIO_PIN_14
#define VD_Pin            GPIO_PIN_15
#define VALVE_PIN_MASK    (VA_Pin | VB_Pin | VC_Pin | VD_Pin)

// ULN2003：MCU=1 -> ULN导通下拉 -> 线圈得电
// 这里 mask bit=1 表示该相“得电”
static const uint8_t s_seq8_mask[8] = {
    0x1, // A
    0x3, // A+B
    0x2, // B
    0x6, // B+C
    0x4, // C
    0xC, // C+D
    0x8, // D
    0x9  // D+A
};

static int32_t  s_pos_steps = 0;
static int32_t  s_seq_idx   = 0;
static uint32_t s_step_ms   = 1000 / VALVE_PPS_DEFAULT;

// 可校准的全开步数
static int32_t  s_full_open_steps = VALVE_SPEC_FULL_OPEN_STEPS;

static inline int32_t _clamp_i32(int32_t x, int32_t lo, int32_t hi)
{
    if (x < lo) return lo;
    if (x > hi) return hi;
    return x;
}
static inline uint32_t _clamp_u32(uint32_t x, uint32_t lo, uint32_t hi)
{
    if (x < lo) return lo;
    if (x > hi) return hi;
    return x;
}

// mask: bit0=A(PB12) bit1=B(PB13) bit2=C(PB14) bit3=D(PB15)
static inline void _apply_mask(uint8_t mask)
{
    uint32_t set_bits = 0;
    uint32_t rst_bits = 0;

    if (mask & 0x1) set_bits |= VA_Pin; else rst_bits |= VA_Pin;
    if (mask & 0x2) set_bits |= VB_Pin; else rst_bits |= VB_Pin;
    if (mask & 0x4) set_bits |= VC_Pin; else rst_bits |= VC_Pin;
    if (mask & 0x8) set_bits |= VD_Pin; else rst_bits |= VD_Pin;

    // 原子更新：同时置位/复位
    VALVE_GPIO_Port->BSRR = (set_bits) | (rst_bits << 16);
}

void Valve_AllOff(void)
{
    // 全部输入拉低 -> ULN 全关
    VALVE_GPIO_Port->BSRR = (VALVE_PIN_MASK << 16);
}

void Valve_SetFullOpenSteps(int32_t full_open_steps)
{
    s_full_open_steps = _clamp_i32(full_open_steps, VALVE_FULL_OPEN_MIN, VALVE_FULL_OPEN_MAX);
}

int32_t Valve_GetFullOpenSteps(void)
{
    return s_full_open_steps;
}

void Valve_Init(uint32_t pps)
{
    pps = _clamp_u32(pps, VALVE_PPS_MIN, VALVE_PPS_MAX);
    s_step_ms = 1000 / pps;
    if (s_step_ms == 0) s_step_ms = 1;

    s_pos_steps = 0;
    s_seq_idx   = 0;
    s_full_open_steps = VALVE_SPEC_FULL_OPEN_STEPS;

    Valve_AllOff();
}

static void _step_once(int dir)
{
    if (dir > 0) {
        s_seq_idx = (s_seq_idx + 1) & 7;
        s_pos_steps++;
    } else {
        s_seq_idx = (s_seq_idx - 1) & 7;
        s_pos_steps--;
    }

    _apply_mask(s_seq8_mask[s_seq_idx]);
    HAL_Delay(s_step_ms);
}

void Valve_StepNBlocking(int32_t dir, uint32_t n_steps)
{
    // 用于验证“会不会动”
    for (uint32_t i = 0; i < n_steps; i++) {
        _step_once(dir);
    }
    if (VALVE_HOLD_MS) HAL_Delay(VALVE_HOLD_MS);
    Valve_AllOff();
}

void Valve_HomeBlocking(void)
{
    // 上电先断相，避免一上来就持续励磁
    Valve_AllOff();
    HAL_Delay(50);

    // 强关归零
    for (int i = 0; i < VALVE_HOME_EXTRA; i++) {
        _step_once(VALVE_DIR_CLOSE);
    }

    s_pos_steps = 0;
    s_seq_idx   = 0;

    if (VALVE_HOLD_MS) HAL_Delay(VALVE_HOLD_MS);
    Valve_AllOff();
}

void Valve_MoveToStepsBlocking(int32_t target_steps)
{
    target_steps = _clamp_i32(target_steps, 0, s_full_open_steps);

    while (s_pos_steps != target_steps)
    {
        int dir = (target_steps > s_pos_steps) ? (+1) : (-1);
        _step_once(dir);
    }

    if (VALVE_HOLD_MS) HAL_Delay(VALVE_HOLD_MS);
    Valve_AllOff();
}

int32_t Valve_PercentToSteps(int32_t pct)
{
    pct = _clamp_i32(pct, 0, 100);
    if (pct == 0) return 0;

    int32_t full = s_full_open_steps;
    int32_t min  = _clamp_i32(VALVE_MIN_EFFECTIVE_OPEN_STEPS, 0, full);
    int32_t span = full - min;

    // 1..100 -> min..full
    return min + (pct * span + 50) / 100; // 四舍五入
}

void Valve_MoveToPercentBlocking(int32_t pct)
{
    Valve_MoveToStepsBlocking(Valve_PercentToSteps(pct));
}

int32_t Valve_Unit500ToSteps(int32_t u500)
{
    u500 = _clamp_i32(u500, 0, 500);
    if (u500 == 0) return 0;

    int32_t full = s_full_open_steps;
    int32_t min  = _clamp_i32(VALVE_MIN_EFFECTIVE_OPEN_STEPS, 0, full);
    int32_t span = full - min;

    // 1..500 -> min..full（四舍五入）
    return min + (u500 * span + 250) / 500;
}

void Valve_MoveToUnit500Blocking(int32_t u500)
{
    Valve_MoveToStepsBlocking(Valve_Unit500ToSteps(u500));
}

int32_t Valve_GetUnit500(void)
{
    int32_t full = s_full_open_steps;
    int32_t min  = _clamp_i32(VALVE_MIN_EFFECTIVE_OPEN_STEPS, 0, full);
    int32_t span = full - min;

    if (s_pos_steps <= 0) return 0;
    if (s_pos_steps <= min) return 1;

    int32_t u = ((s_pos_steps - min) * 500 + span / 2) / span;
    return _clamp_i32(u, 0, 500);
}

void Valve_SinglePhaseSelfTest(uint32_t hold_ms)
{
    // A
    _apply_mask(0x1); HAL_Delay(hold_ms);
    // B
    _apply_mask(0x2); HAL_Delay(hold_ms);
    // C
    _apply_mask(0x4); HAL_Delay(hold_ms);
    // D
    _apply_mask(0x8); HAL_Delay(hold_ms);

    Valve_AllOff();
}

void Valve_SoftHomeByU500Blocking(int32_t cur_u500, int32_t extra_pulse)
{
    if (cur_u500 < 0) cur_u500 = 0;
    if (cur_u500 > 500) cur_u500 = 500;
    if (extra_pulse < 0) extra_pulse = 0;

    // 估算当前位置 steps，然后往回走 steps + extra_pulse
    int32_t cur_steps = Valve_Unit500ToSteps(cur_u500);
    int32_t back_steps = cur_steps + extra_pulse;

    // 往“关阀方向”打 back_steps 个拍
    for (int32_t i = 0; i < back_steps; i++) {
        // 直接复用你内部 _step_once 的逻辑：这里用公开接口的话就走 StepN
        // 但 StepN 会 hold+AllOff；我们这里不想每次都 hold，所以建议你把 _step_once 变成非static，
        // 或者简单点：这里就调用 Valve_StepNBlocking(-1,1)（会慢一点但能用）
        Valve_StepNBlocking(VALVE_DIR_CLOSE, 1);
    }

    // 归零位置
    // 注意：你 Valve_StepNBlocking 里会把相断掉并 hold；因此这里无需再额外处理
}




