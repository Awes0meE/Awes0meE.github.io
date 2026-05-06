// Condensed from Study_STM32F103C8T6 / encoder knob controlled servo example.
// Evidence scope: mapping encoder count to bounded servo speed.

#include "stm32f10x.h"
#include "servo.h"
#include "encoder.h"

int main(void)
{
    int speed = 0;

    servo_init();
    encoder_init();

    while (1) {
        speed = encoder_count * 50;

        if (speed > 500) {
            speed = 500;
        }

        if (speed < -500) {
            speed = -500;
        }

        servo_set_speed(speed);
    }
}
