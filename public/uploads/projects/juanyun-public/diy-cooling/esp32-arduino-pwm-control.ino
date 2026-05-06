#include <Arduino.h>
#include "BluetoothSerial.h"
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// 定义LEDC通道和GPIO引脚
const int ledChannel = 0;
const int gpioPin = 5; // 你可以选择其他的GPIO引脚
const int resolution = 8; // 分辨率 8 位

// 设置频率和占空比
int frequency = 15000; // 频率（Hz）
int dutyCycle = 50; // 占空比（0-100 对应0-100%）
int mode = 1; // 初始模式

BluetoothSerial SerialBT;

// 按钮引脚定义
const int buttonPins[] = {12, 13, 14, 15, 16}; // 5个按钮的GPIO引脚
bool buttonStates[] = {false, false, false, false, false}; // 按钮状态
unsigned long buttonPressTimes[] = {0, 0, 0, 0, 0}; // 按钮按下时间
const unsigned long longPressDuration = 1000; // 长按时间阈值（毫秒）

// OLED显示屏设置
#define SCREEN_WIDTH 128 // OLED显示屏宽度，单位：像素
#define SCREEN_HEIGHT 64 // OLED显示屏高度，单位：像素
#define OLED_RESET    -1 // 没有使用复位引脚
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// 全局变量存储CPU和GPU的值
float cpuValue = 0.0;
float gpuValue = 0.0;
float maxCpuValue = 0.0;
float maxGpuValue = 0.0;
float maxValue = 50;

// 计时变量
unsigned long lastUpdateTime = 0;
const unsigned long updateInterval = 30000; // 30秒

// 函数声明
int processBluetoothValue(int value);
void handleButtonPress(int buttonIndex);
void handleButtonLongPress(int buttonIndex);
void updateDisplay();
void updatePWM();
void parseBluetoothData(const String& data);
void modeDisplay();
const char* modechar;

void setup() {
    Serial.begin(115200); // 启动串口通信
    SerialBT.begin("ESP32_Bluetooth"); // 蓝牙名称

    // 配置LEDC通道
    ledcSetup(ledChannel, frequency, resolution);
    // 将LEDC通道连接到指定的GPIO引脚
    ledcAttachPin(gpioPin, ledChannel);
    // 设置占空比，转换为0-255范围
    ledcWrite(ledChannel, map(dutyCycle, 0, 100, 0, 255));

    // 配置按钮引脚
    for (int i = 0; i < 5; i++) {
        pinMode(buttonPins[i], INPUT_PULLDOWN); // 按钮为常开式，使用内置下拉电阻
    }

    // 初始化OLED显示屏
    if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println(F("SSD1306 allocation failed"));
        for (;;);
    }
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(0, 0);
    display.print(F("Initializing..."));
    display.display();

    Serial.println("The device started, now you can pair it with Bluetooth!");
    
    //更新模式显示
    modeDisplay();
}

void modeDisplay(){
    //模式显示
    if (mode == 1) {
        modechar = "Quiet";
    } else if (mode == 2) {
        modechar = "Normal";
    } else if (mode == 3) {
        modechar = "high speed";
    } else if (mode == 4) {
        modechar = "Manual";
    }
        updateDisplay();
}


void loop() {
    unsigned long currentMillis = millis();

    // 检查是否有蓝牙串口数据
    if (SerialBT.available()) {
        String input = SerialBT.readStringUntil('\n');
        parseBluetoothData(input);
    }

    // 处理按钮输入
    for (int i = 0; i < 5; i++) {
        bool buttonState = digitalRead(buttonPins[i]) == HIGH; // 检查是否按下
        if (buttonState && !buttonStates[i]) {
            buttonPressTimes[i] = currentMillis;
            buttonStates[i] = true;
        } else if (!buttonState && buttonStates[i]) {
            if (currentMillis - buttonPressTimes[i] >= longPressDuration) {
                handleButtonLongPress(i);
            } else {
                handleButtonPress(i);
            }
            buttonStates[i] = false;
        }
    }

    // 每隔30秒更新一次PWM
    if (currentMillis - lastUpdateTime >= updateInterval) {
        maxValue = max(maxCpuValue, maxGpuValue);
        updatePWM();
        lastUpdateTime = currentMillis;
    }

    // 更新OLED显示
    updateDisplay();
}

// 处理蓝牙传入数据的函数
void parseBluetoothData(const String& data) {
    if (data.startsWith("CPU")) {
        float value = data.substring(3).toFloat();
        if (value > maxCpuValue) {
            maxCpuValue = value;
        }
        cpuValue = value;
    } else if (data.startsWith("GPU")) {
        float value = data.substring(3).toFloat();
        if (value > maxGpuValue) {
            maxGpuValue = value;
        }
        gpuValue = value;
    }
}

// 处理蓝牙数据的函数
int processBluetoothValue(int value) {
    switch (mode) {
        case 1: return value * 0.5;
        case 2: return value * 0.7;
        case 3: return value;
        case 4: return dutyCycle; // 在手动模式下，蓝牙数据不改变占空比
        default: return value;
    }
}

// 处理按钮按下事件
void handleButtonPress(int buttonIndex) {
    switch (buttonIndex) {
        case 0: // 切换模式
            mode = (mode % 4) + 1;
            break;
        case 1: // 增加频率
            frequency += 200;
            ledcSetup(ledChannel, frequency, resolution);
            break;
        case 2: // 减少频率
            frequency -= 200;
            if (frequency < 200) frequency = 200;
            ledcSetup(ledChannel, frequency, resolution);
            break;
        case 3: // 手动模式下增加占空比
            if (mode == 4) {
                dutyCycle += 10;
                if (dutyCycle > 100) dutyCycle = 100;
                ledcWrite(ledChannel, map(dutyCycle, 0, 100, 0, 255));
            }
            break;
        case 4: // 手动模式下减少占空比
            if (mode == 4) {
                dutyCycle -= 10;
                if (dutyCycle < 0) dutyCycle = 0;
                ledcWrite(ledChannel, map(dutyCycle, 0, 100, 0, 255));
            }
            break;
    }

    // 更新PWM占空比
    updatePWM();
    // 更新模式显示
    modeDisplay();
}

// 处理按钮长按事件
void handleButtonLongPress(int buttonIndex) {
    // 长按处理逻辑，可以根据需要添加
}

// 更新OLED显示
void updateDisplay() {
    display.clearDisplay();
    display.setCursor(0, 0);
    display.print(F("Mode: "));
    display.println(modechar);
    display.println();
    
    display.print(F("Fan Speed: "));
    display.print(dutyCycle);
    display.println(F("%"));
    display.println();

    display.print(F("Frequency: "));
    display.print(frequency);
    display.println(F("Hz"));
    display.println();

    display.print(F("CPU:"));
    display.print(cpuValue);
    display.print(("  GPU:"));
    display.println(gpuValue);
    display.display();
}

// 更新PWM占空比
void updatePWM() {
    dutyCycle =processBluetoothValue(maxValue);
    ledcWrite(ledChannel, map(dutyCycle, 0, 100, 0, 255));
    maxCpuValue = 0.0;
    maxGpuValue = 0.0;
    Serial.print("Duty Cycle updated to: ");
    Serial.println(dutyCycle);
    SerialBT.print("Duty Cycle updated to: ");
    SerialBT.println(dutyCycle);
}
