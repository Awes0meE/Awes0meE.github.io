# Product AC Unit Pinout

Target MCU: `STM32F103C8T6`
Clock: `72 MHz`
Project file: `product_acunit.ioc`

## Pin Map

| Pin | Net Label | Peripheral | Direction | Function |
| --- | --- | --- | --- | --- |
| `PA0` | `ENC_A` | `TIM2_CH1` | Input | Encoder phase A |
| `PA1` | `ENC_B` | `TIM2_CH2` | Input | Encoder phase B |
| `PA2` | `HC05_TX` | `USART2_TX` | Output | Bluetooth / HC-05 TX |
| `PA3` | `HC05_RX` | `USART2_RX` | Input | Bluetooth / HC-05 RX |
| `PA4` | `ENC_KEY` | `GPIO` | Input | Encoder push key, pull-up |
| `PA5` | `NTC1_ADC` | `ADC1_IN5` | Input | NTC sensor 1 |
| `PA6` | `NTC2_ADC` | `ADC1_IN6` | Input | NTC sensor 2 |
| `PA8` | `COMP_PWM_RAW` | `TIM1_CH1` | Output | Compressor speed PWM |
| `PB0` | `COMP_RUN_CTL` | `GPIO` | Output | Compressor run enable |
| `PB1` | `COMP_FG_IN` | `TIM3_CH4` | Input | Compressor FG speed feedback |
| `PB6` | `OLED_SCL` | `I2C1_SCL` | Output | OLED clock |
| `PB7` | `OLED_SDA` | `I2C1_SDA` | Bidirectional | OLED data |
| `PB8` | `DHT22_DATA` | `GPIO` | Bidirectional | DHT22 single-wire data |
| `PB10` | `COMP_UART_TX` | `USART3_TX` | Output | Compressor UART TX |
| `PB11` | `COMP_UART_RX` | `USART3_RX` | Input | Compressor UART RX |
| `PB12` | `EEV_A` | `GPIO` | Output | EEV phase A |
| `PB13` | `EEV_B` | `GPIO` | Output | EEV phase B |
| `PB14` | `EEV_C` | `GPIO` | Output | EEV phase C |
| `PB15` | `EEV_D` | `GPIO` | Output | EEV phase D |
| `PD0` | `OSC_IN` | `RCC_HSE` | Input | External high-speed crystal input |
| `PD1` | `OSC_OUT` | `RCC_HSE` | Output | External high-speed crystal output |
| `PA13` | `SWDIO` | `SYS_JTMS` | Bidirectional | SWD debug |
| `PA14` | `SWCLK` | `SYS_JTCK` | Input | SWD debug |

## Timer Usage

| Timer | Purpose |
| --- | --- |
| `TIM1` | Compressor PWM output |
| `TIM2` | Encoder interface |
| `TIM3` | FG capture and overflow timing |
| `TIM4` | Microsecond delay for DHT22 |

## ADC / DMA Usage

| Block | Purpose |
| --- | --- |
| `ADC1 + DMA1_Channel1` | Continuous scan of NTC1 and NTC2 |

## Notes

- `COMP_RUN_CTL` is active-low in the current hardware design.
- `COMP_PWM_RAW` is inverted in software to match the external drive stage.
- `EEV_A/B/C/D` keep the original 4-phase stepper sequence and direction settings.
