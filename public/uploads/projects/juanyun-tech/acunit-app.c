#include "app.h"
#include "bsp_oled.h"
#include "bsp_encoder.h"
#include "bsp_key.h"
#include "svc_control.h"
#include "svc_sensor.h"
#include "svc_ui.h"

extern TIM_HandleTypeDef htim4;

void App_Init(void)
{
    HAL_TIM_Base_Start(&htim4);   /* DHT22 delay_us */

    BSP_OLED_Init();
    BSP_Encoder_Init();
    BSP_Key_Init();

    SVC_Control_Init();
    SVC_Sensor_Init();
    SVC_UI_Init();

    BSP_OLED_Draw4Lines("INIT", "WAIT", "", "");
}

void App_Loop(void)
{
    static uint32_t t1 = 0U;
    static uint32_t t10 = 0U;
    static uint32_t t100 = 0U;
    static uint32_t t500 = 0U;
    static uint32_t t2000 = 0U;

    uint32_t now = HAL_GetTick();

    if ((now - t1) >= 1U)
    {
        t1 = now;
        SVC_Control_Task1ms();
    }

    if ((now - t10) >= 10U)
    {
        t10 = now;
        SVC_Control_Task10ms();
        SVC_UI_Task10ms();
    }

    if ((now - t100) >= 100U)
    {
        t100 = now;
        SVC_Sensor_Task100ms();
    }

    if ((now - t500) >= 500U)
    {
        t500 = now;
        SVC_UI_Task500ms();
    }

    if ((now - t2000) >= 2000U)
    {
        t2000 = now;
        SVC_Sensor_Task2000ms();
    }
}

void App_TIM_IC_CaptureCallback(TIM_HandleTypeDef *htim)
{
    if (htim->Instance == TIM3 && htim->Channel == HAL_TIM_ACTIVE_CHANNEL_4)
    {
        SVC_Control_FG_IC_Callback();
    }
}

void App_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
    if (htim->Instance == TIM3)
    {
        SVC_Control_FG_PeriodElapsed_Callback();
    }
}
