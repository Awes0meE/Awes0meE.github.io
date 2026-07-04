#include "Adafruit_NeoPixel.h"  //彩色灯珠驱动
#include "comm.h"               //传感器数据读取
#include "motor.h"              //电机控制

#define PIN            4
#define NUMPIXELS      2
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
char led_static = HIGH;

void setup()
{
    shift_reg_init();   //传感器初始化
    motor_init();       //电机初始化
    pixels.begin();     //彩色灯珠初始化
    pinMode(13,OUTPUT); //板载LED初始化
}
void loop()
{
    pixels.setPixelColor(0, pixels.Color(100,0,0)); //设定第一个灯珠颜色RGB(0~255)
    pixels.setPixelColor(1, pixels.Color(100,0,0)); //设定第二个灯珠颜色
    pixels.show();  //显示设定好的颜色
    digitalWrite(13,led_static);//点亮LED
    led_static = !led_static;//状态反转
    delay(1000);    //延迟1秒
    pixels.setPixelColor(0, pixels.Color(0,100,0));
    pixels.setPixelColor(1, pixels.Color(0,100,0));
    pixels.show();
    digitalWrite(13,led_static);
    led_static = !led_static;
    delay(1000);
    pixels.setPixelColor(0, pixels.Color(0,0,100));
    pixels.setPixelColor(1, pixels.Color(0,0,100));
    pixels.show();
    digitalWrite(13,led_static);
    led_static = !led_static;
    delay(1000);
}
