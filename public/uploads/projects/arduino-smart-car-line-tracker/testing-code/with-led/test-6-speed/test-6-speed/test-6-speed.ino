#include "Adafruit_NeoPixel.h"  //彩色灯珠驱动
#include "comm.h"               //传感器数据读取
#include "motor.h"              //电机控制
extern unsigned int a;
#define PIN            4
#define NUMPIXELS      2
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

void setup()
{
    Serial.begin(9600);
    shift_reg_init();   //传感器初始化
    motor_init();       //电机初始化
    pixels.begin();     //彩色灯珠初始化

    pixels.setPixelColor(0, pixels.Color(0,100,0));
    pixels.setPixelColor(1, pixels.Color(0,100,0));
    pixels.show();
}

void loop()
{
    reload_shift_reg(); //刷新传感器数据(必须)

    if(left_pulse%2)
    {   //显示测速状态
        pixels.setPixelColor(0, pixels.Color(0,0,100));
        pixels.show();
    }
    else
    {
        pixels.setPixelColor(0, pixels.Color(0,100,0));
        pixels.show();
    }

    if(right_pulse%2)
    {
        pixels.setPixelColor(1, pixels.Color(0,0,100));
        pixels.show();
    }
    else
    {
        pixels.setPixelColor(1, pixels.Color(0,100,0));
        pixels.show();
    }

    if(sensor.switcher_back_right)  //车体以左轮为圆心旋转360度
    {
        motor_step(0,150,0,48);//左转48个刻度
        motor_step(0,0);       //停止
    }

    if(sensor.switcher_back_left)   //车体以右轮为圆心旋转360度
    {
        motor_step(150,0,48,0);//右转48个刻度
        motor_step(0,0);       //停止
    }
}
