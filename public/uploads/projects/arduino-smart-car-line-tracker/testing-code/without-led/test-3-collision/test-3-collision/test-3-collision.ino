#include "Adafruit_NeoPixel.h"  //彩色灯珠驱动
#include "comm.h"               //传感器数据读取
#include "motor.h"              //电机控制

#define PIN            4
#define NUMPIXELS      2
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

void setup()
{
    shift_reg_init();   //传感器初始化
    motor_init();       //电机初始化
    pixels.begin();     //彩色灯珠初始化
    pinMode(13,OUTPUT); //板载LED初始化
}
void loop()
{
    char r0,r1,g0,g1,b0,b1;
    reload_shift_reg(); //刷新传感器数据(必须)
    if(sensor.switcher_back_left) r0 = 100; else r0 = 0;
    if(sensor.switcher_front_left_2) g0 = 100; else g0 = 0;
    if(sensor.switcher_front_left_1) b0 = 100; else b0 = 0;
    if(sensor.switcher_front_right_1) b1 = 100; else b1 = 0;
    if(sensor.switcher_front_right_2) g1 = 100; else g1 = 0;
    if(sensor.switcher_back_right) r1 = 100; else r1 = 0;

    pixels.setPixelColor(0, pixels.Color(r0,g0,b0)); //设定第一个灯珠颜色RGB(0~255)
    pixels.setPixelColor(1, pixels.Color(r1,g1,b1)); //设定第二个灯珠颜色
    pixels.show();  //显示设定好的颜色
    if(r0||g0||b0||r1||g1||b1)
    {
        digitalWrite(13,HIGH);//点亮LED
        delay(1000);
        digitalWrite(13,LOW);//关闭LED
    }
}
