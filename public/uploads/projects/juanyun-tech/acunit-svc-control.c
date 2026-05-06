#include "../Inc/svc_control.h"

#include "../../BSP_drivers/Inc/bsp_comp.h"
#include "../../BSP_drivers/Inc/bsp_eev.h"
#include "../../BSP_drivers/Inc/bsp_fg.h"

#define COMP_DUTY_STEP_PCT   1.0f

static float s_comp_duty_pct = 0.0f;

static float clampf_local(float x, float min_v, float max_v)
{
    if (x < min_v) return min_v;
    if (x > max_v) return max_v;
    return x;
}

void SVC_Control_Init(void)
{
    BSP_COMP_Init();
    BSP_FG_Init();
    BSP_EEV_Init();

    s_comp_duty_pct = 0.0f;
    BSP_COMP_SetSpdDutyPct(0.0f);
    BSP_COMP_SetRunEnable(0);

    BSP_EEV_StartHome();
}

void SVC_Control_Task1ms(void)
{
    BSP_EEV_Task1ms();
}

void SVC_Control_Task10ms(void)
{
    BSP_FG_Task10ms();
}

void SVC_Control_SetCompDutyPct(float duty_pct)
{
    s_comp_duty_pct = clampf_local(duty_pct, 0.0f, 100.0f);
    BSP_COMP_SetSpdDutyPct(s_comp_duty_pct);

    if (s_comp_duty_pct > 0.0f)
    {
        BSP_COMP_SetRunEnable(1);
    }
    else
    {
        BSP_COMP_SetRunEnable(0);
    }
}

void SVC_Control_AdjustCompDutyPct(float delta_pct)
{
    SVC_Control_SetCompDutyPct(s_comp_duty_pct + delta_pct);
}

float SVC_Control_GetCompDutyPct(void)
{
    return s_comp_duty_pct;
}

uint8_t SVC_Control_GetCompRunEnable(void)
{
    return BSP_COMP_GetRunEnable();
}

uint32_t SVC_Control_GetCompRPM(void)
{
    return BSP_FG_GetRPM();
}

void SVC_Control_SetEEVTargetPulse(int16_t pulse)
{
    BSP_EEV_SetTargetPulse(pulse);
}

void SVC_Control_AdjustEEVPulse(int16_t delta_pulse)
{
    BSP_EEV_MoveByPulse(delta_pulse);
}

int16_t SVC_Control_GetEEVTargetPulse(void)
{
    return BSP_EEV_GetTargetPulse();
}

int16_t SVC_Control_GetEEVCurrentPulse(void)
{
    return BSP_EEV_GetCurrentPulse();
}

float SVC_Control_GetEEVOpenPct(void)
{
    return BSP_EEV_GetOpenPct();
}

uint8_t SVC_Control_IsEEVHomed(void)
{
    return BSP_EEV_IsHomed();
}

uint8_t SVC_Control_IsEEVBusy(void)
{
    return BSP_EEV_IsBusy();
}

void SVC_Control_FG_IC_Callback(void)
{
    BSP_FG_IC_CaptureCallback();
}

void SVC_Control_FG_PeriodElapsed_Callback(void)
{
    BSP_FG_PeriodElapsedCallback();
}


