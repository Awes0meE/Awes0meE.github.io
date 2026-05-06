// Condensed from Study_STM32F103C8T6 / STM32 metro environment monitoring example.
// Evidence scope: module-level integration in the main control loop.

#include "stm32f10x.h"
#include "Encoder.h"
#include "CLED.h"
#include "DHT11.h"
#include "OLED.h"
#include "LightSensor.h"
#include "TIM3.h"
#include "TIM4.h"

uint16_t set_light_value = 1000;
uint16_t light_value;

int main(void)
{
    CLED_Init();
    OLED_Init();
    LightSensor_Init();
    TIM3_Config();
    TIM4_PWM_Config();
    Encoder_EXTI_Config();

    OLED_ShowString(1, 1, "CUR BRT: ");
    OLED_ShowString(2, 1, "SET BRT: ");
    OLED_ShowString(3, 1, "LED BRT: ");
    OLED_ShowString(4, 1, "TEM/HUM: ");

    set_pwm_duty_cycle(0, 1000, 0);

    uint8_t humidity = 0;
    uint8_t temperature = 0;
    uint8_t dht_updated = 0;

    while (1) {
        set_light_value = 1000 + Get_Encoder_Value();
        OLED_ShowNum(2, 10, set_light_value, 4);

        if (dht_read_flag) {
            light_value = Read_LightSensor();
            dht_read_flag = 0;

            uint8_t temp;
            uint8_t humi;
            if (DHT11_Read(&humi, &temp)) {
                temperature = temp;
                humidity = humi;
                dht_updated = 1;
            }
        }

        OLED_ShowNum(1, 10, light_value, 4);

        if (dht_updated) {
            dht_updated = 0;
            OLED_ShowNum(4, 10, temperature, 2);
            OLED_ShowNum(4, 14, humidity, 2);
        }

        uint16_t ideal_pwm = Lookup_PWM_For_Target(set_light_value);
        OLED_ShowNum(3, 10, ideal_pwm, 4);
        Set_LED_Brightness(ideal_pwm);
    }
}
