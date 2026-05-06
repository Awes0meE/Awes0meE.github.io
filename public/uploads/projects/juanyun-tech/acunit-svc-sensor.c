#include "../Inc/svc_sensor.h"

#include "../../BSP_drivers/Inc/bsp_dht22.h"
#include "../../BSP_drivers/Inc/bsp_ntc.h"

static float s_dht_temp = 0.0f;
static float s_dht_hum = 0.0f;
static uint8_t s_dht_ok = 0U;

void SVC_Sensor_Init(void)
{
    BSP_NTC_Init();
    s_dht_temp = 0.0f;
    s_dht_hum = 0.0f;
    s_dht_ok = 0U;
}

void SVC_Sensor_Task100ms(void)
{
    BSP_NTC_Task100ms();
}

void SVC_Sensor_Task2000ms(void)
{
    float t = 0.0f;
    float h = 0.0f;

    if (BSP_DHT22_Read(&t, &h))
    {
        s_dht_temp = t;
        s_dht_hum = h;
        s_dht_ok = 1U;
    }
    else
    {
        s_dht_ok = 0U;
    }
}

float SVC_Sensor_GetDHTTemp(void)
{
    return s_dht_temp;
}

float SVC_Sensor_GetDHTHum(void)
{
    return s_dht_hum;
}

uint8_t SVC_Sensor_GetDHTOk(void)
{
    return s_dht_ok;
}

float SVC_Sensor_GetNTC1Temp(void)
{
    return BSP_NTC_GetTemp1();
}

float SVC_Sensor_GetNTC2Temp(void)
{
    return BSP_NTC_GetTemp2();
}
