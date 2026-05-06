#include "bsp_ntc.h"

extern ADC_HandleTypeDef hadc1;

static uint16_t s_adc_dma[2] = {0, 0};
static float s_temp1 = 25.0f;
static float s_temp2 = 25.0f;
static uint8_t s_init1 = 0U;
static uint8_t s_init2 = 0U;

#define NTC_PULLUP_R    10000.0f
#define ADC_FS          4095.0f

#define NTC_T_MIN_C     (-30.0f)
#define NTC_T_MAX_C     (125.0f)

static const float k_ntc_r_ohm[] =
{
    179266.6f, 168405.3f, 158272.6f, 148815.1f, 139983.7f, 131733.2f, 124021.6f, 116810.7f,
    110064.8f, 103751.2f, 97839.6f, 92302.0f, 87112.4f, 82247.1f, 77683.7f, 73401.8f,
    69382.3f, 65607.7f, 62061.6f, 58728.8f, 55595.3f, 52648.0f, 49874.7f, 47264.3f,
    44806.2f, 42490.6f, 40308.6f, 38251.6f, 36311.7f, 34481.7f, 32754.7f, 31124.3f,
    29584.7f, 28130.1f, 26755.6f, 25456.2f, 24227.4f, 23065.0f, 21965.0f, 20923.9f,
    19938.0f, 19004.1f, 18119.3f, 17280.7f, 16485.7f, 15731.7f, 15016.4f, 14337.6f,
    13693.3f, 13081.6f, 12500.5f, 11948.5f, 11423.9f, 10925.2f, 10451.0f, 10000.0f,
    9570.9f, 9162.6f, 8773.8f, 8403.7f, 8051.2f, 7715.4f, 7395.3f, 7090.3f,
    6799.5f, 6522.1f, 6257.6f, 6005.1f, 5764.2f, 5534.2f, 5314.6f, 5104.9f,
    4904.5f, 4713.0f, 4530.0f, 4355.1f, 4187.8f, 4027.8f, 3874.8f, 3728.3f,
    3588.2f, 3454.0f, 3325.5f, 3202.5f, 3084.6f, 2971.7f, 2863.5f, 2759.7f,
    2660.3f, 2564.9f, 2473.4f, 2385.6f, 2301.4f, 2220.6f, 2143.1f, 2068.6f,
    1997.0f, 1928.3f, 1862.3f, 1798.9f, 1738.0f, 1679.4f, 1623.1f, 1568.9f,
    1516.8f, 1466.7f, 1418.5f, 1372.2f, 1327.5f, 1284.5f, 1243.1f, 1203.3f,
    1164.9f, 1127.9f, 1092.3f, 1058.0f, 1024.9f, 993.0f, 962.3f, 932.6f,
    904.0f, 876.4f, 849.8f, 824.1f, 799.4f, 775.4f, 752.3f, 730.0f,
    708.5f, 687.7f, 667.6f, 648.2f, 629.5f, 611.3f, 593.8f, 576.9f,
    560.5f, 544.7f, 529.3f, 514.5f, 500.2f, 486.3f, 472.9f, 459.9f,
    447.4f, 435.2f, 423.4f, 412.0f, 400.9f, 390.2f, 379.9f, 369.8f,
    360.1f, 350.6f, 341.5f, 332.6f
};

static float ntc_adc_to_resistance(uint16_t adc)
{
    if (adc >= 4095U) adc = 4094U;
    if (adc == 0U) adc = 1U;

    return NTC_PULLUP_R * ((float)adc / (ADC_FS - (float)adc));
}

static float ntc_resistance_to_temp(float r_ohm)
{
    const uint32_t table_size = sizeof(k_ntc_r_ohm) / sizeof(k_ntc_r_ohm[0]);
    uint32_t lo = 0U;
    uint32_t hi = table_size - 1U;

    if (r_ohm >= k_ntc_r_ohm[0])
    {
        return NTC_T_MIN_C;
    }

    if (r_ohm <= k_ntc_r_ohm[table_size - 1U])
    {
        return NTC_T_MAX_C;
    }

    while ((hi - lo) > 1U)
    {
        uint32_t mid = lo + ((hi - lo) / 2U);

        if (r_ohm > k_ntc_r_ohm[mid])
        {
            hi = mid;
        }
        else
        {
            lo = mid;
        }
    }

    {
        float r_hi = k_ntc_r_ohm[lo];
        float r_lo = k_ntc_r_ohm[hi];
        float t_base = NTC_T_MIN_C + (float)lo;
        float ratio = (r_hi - r_ohm) / (r_hi - r_lo);

        return t_base + ratio;
    }
}

static float ntc_adc_to_temp(uint16_t adc)
{
    float r_ohm = ntc_adc_to_resistance(adc);
    return ntc_resistance_to_temp(r_ohm);
}

void BSP_NTC_Init(void)
{
    s_temp1 = 25.0f;
    s_temp2 = 25.0f;
    s_init1 = 0U;
    s_init2 = 0U;

    HAL_ADC_Start_DMA(&hadc1, (uint32_t *)s_adc_dma, 2);
}

void BSP_NTC_Task100ms(void)
{
    float t1 = ntc_adc_to_temp(s_adc_dma[0]);
    float t2 = ntc_adc_to_temp(s_adc_dma[1]);

    if (!s_init1)
    {
        s_temp1 = t1;
        s_init1 = 1U;
    }
    else
    {
        s_temp1 = 0.8f * s_temp1 + 0.2f * t1;
    }

    if (!s_init2)
    {
        s_temp2 = t2;
        s_init2 = 1U;
    }
    else
    {
        s_temp2 = 0.8f * s_temp2 + 0.2f * t2;
    }
}

float BSP_NTC_GetTemp1(void)
{
    return s_temp1;
}

float BSP_NTC_GetTemp2(void)
{
    return s_temp2;
}
