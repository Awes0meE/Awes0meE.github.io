# AM32/AT32F421 Final Adaptation Notes

Date: 2026-05-17

This note summarizes the final AM32 firmware adaptation for the AT32F421 ESC board used in the FYP experiments. It is grounded in the final source snapshot at commit `3f8192fb30c31544cc35bff51cc336ef25dbf7fd`.

## Target

- Build target: `AT32DEV_F421`.
- MCU family makefile: `f421makefile.mk`.
- Part macro: `AT32F421K8U7`.
- Firmware version macros: `VERSION_MAJOR = 2`, `VERSION_MINOR = 20`, `EEPROM_VERSION = 3`.
- Target identity in `Inc/targets.h`:
  - `FIRMWARE_NAME "AT32PB4     "`
  - `FILE_NAME "AT32DEV_F421"`
  - `DEAD_TIME 60`
  - `HARDWARE_GROUP_AT_B`
  - `HARDWARE_GROUP_AT_045`
  - `USE_SERIAL_TELEMETRY`
  - current sense: `ADC_CHANNEL_3`, `GPIO_PINS_3`
  - voltage sense: `ADC_CHANNEL_6`, `GPIO_PINS_6`

## Direct Flash Layout

This FYP branch uses a direct-flash layout for AT32F421 instead of the upstream AM32 bootloader layout.

- Application flash starts at `0x08000000`.
- Main firmware flash region length is `0x7BE0`.
- File-name region is at `0x08007BE0`, length `32` bytes.
- EEPROM emulation/config region is at `0x08007C00`, length `1 KB`.
- RAM origin is `0x20000000`, with GCC RAM length kept at `15 KB`.
- Stack top is set to `0x20003C00`.

The Keil scatter file and GCC linker script are aligned around this direct-flash memory map.

## Pin Mapping

The final target combines `HARDWARE_GROUP_AT_B` and `HARDWARE_GROUP_AT_045`.

Input capture / DShot signal:

| Signal | MCU pin/macro | Timer/DMA |
| --- | --- | --- |
| Input signal | `PB4` / `GPIO_PINS_4` | `TMR3`, channel 1 |
| Input timer channel | `TMR_SELECT_CHANNEL_1` | input capture |
| Input DMA | `DMA1_CHANNEL4` | IRQ `DMA1_Channel5_4_IRQn` |

Power-stage phase outputs:

| Phase | Low-side macro | High-side macro |
| --- | --- | --- |
| Phase A | `PB1` / `GPIO_PINS_1` | `PA10` / `GPIO_PINS_10` |
| Phase B | `PB0` / `GPIO_PINS_0` | `PA9` / `GPIO_PINS_9` |
| Phase C | `PA7` / `GPIO_PINS_7` | `PA8` / `GPIO_PINS_8` |

Back-EMF comparator phase mapping from `HARDWARE_GROUP_AT_045`:

| Floating phase | Comparator input |
| --- | --- |
| Phase A BEMF | `PA0`, encoded as `0x400000E5` |
| Phase B BEMF | `PA4`, encoded as `0x400000C5` |
| Phase C BEMF | `PA5`, encoded as `0x400000D5` |

Current and voltage measurement:

| Measurement | ADC channel | Pin macro |
| --- | --- | --- |
| Current | `ADC_CHANNEL_3` | `GPIO_PINS_3` |
| Voltage | `ADC_CHANNEL_6` | `GPIO_PINS_6` |

## Dead Time and PWM

- Target dead-time macro: `DEAD_TIME = 60`.
- AT32 timer setup writes this value to `TMR1->brk_bit.dtc` during `TIM1_Init()`.
- Final runtime settings keep `driving_brake_strength = 10`; therefore the code path that increases `dead_time_override` for lower brake-strength values is not used in the final configuration.
- Complementary PWM is enabled by final settings: `ESC_SETTING_COMP_PWM = 1`.
- Variable PWM is disabled: `ESC_SETTING_VARIABLE_PWM = 0`.
- Final PWM frequency setting is `48 kHz`.
- With `CPU_FREQUENCY_MHZ = 120` and nominal `TIM1_AUTORELOAD = 4999`, the custom settings recalculate the active PWM ARR to approximately `2499`, matching a 48 kHz PWM period.

## Timers

AT32F421 timer roles in the final target:

| Role | Timer | Notes |
| --- | --- | --- |
| Main PWM | `TMR1` | Three-phase PWM output with complementary drive and dead time |
| Commutation interval timer | `TMR6` | `div = 59`, used as 0.5 us interval counter |
| Control-loop timer | `TMR14` | `LOOP_FREQUENCY_HZ = 20000`, 20 kHz periodic loop |
| Utility timer | `TMR17` | General utility timing |
| Delayed commutation timer | `TMR16` | `COM_TIMER`, IRQ `TMR16_GLOBAL_IRQn` |
| Input capture timer | `TMR3` | DShot/PWM input capture for `PB4` |

The system clock is generated from the internal HICK source through PLL multiplier 30, giving `CPU_FREQUENCY_MHZ = 120`.

## Final Runtime ESC Settings

The final experiment settings are centralized in `Inc/ESC_Settings.h` and applied from `main()` through `ApplyCustomEscSettings(...)`.

Important final values:

| Setting | Final value |
| --- | --- |
| Motor poles | `14` |
| EEPROM KV code | `49` |
| Runtime motor KV | `1960` |
| Bidirectional mode | disabled |
| RC car reverse | disabled |
| Complementary PWM | enabled |
| Variable PWM | disabled |
| Auto advance | disabled |
| Fixed advance | `22.5 degrees` (`advance_level = 34`, runtime `temp_advance = 24`) |
| PWM frequency | `48 kHz` |
| Sine startup | enabled |
| Startup power | `60` |
| Sine startup range | `20` |
| Sine mode power | `6` |
| Stuck rotor protection | enabled |
| Stall protection | disabled |
| Brake on stop | disabled |
| Active brake power | `0` |
| Stopped brake level | `10` |
| Running brake level | `10` |

The fixed duty and fixed speed compile-time test modes remain disabled in the final firmware. The final experiment firmware therefore uses the normal input-driven control path with the custom ESC settings above.

## DShot and Telemetry

- DShot input is captured using timer/DMA input capture through the target input timer and DMA channel.
- The decoder computes the DShot frame length from the DMA capture buffer and decodes 16 pulse bits using a half-pulse threshold.
- CRC validation is performed before commands or throttle values are accepted.
- DShot command support includes beacon tones, direction commands, save settings, extended telemetry enable/disable, and a programming-mode sequence.
- Extended DShot telemetry is present in the final code. It schedules current, voltage and temperature frames while preserving eRPM interleaving.
- For AT32F421, `DSHOT_PRIORITY_THRESHOLD = 50`; when DShot telemetry is active and commutation interval is above the threshold, the firmware raises input DMA priority relative to the commutation timer.

## Commutation and BEMF Handling

- The motor drive uses six-step sensorless commutation.
- `comStep()` selects the energized phase pair and floating phase for each of the six states, then writes the comparator input for the floating phase.
- Zero-cross timing uses the interval timer and either polling or comparator interrupt mode depending on speed/startup state.
- `zcfoundroutine()` updates `commutation_interval`, calculates timing advance, waits the required delay, then commutates in polling mode.
- `PeriodElapsedCallback()` performs delayed commutation from the commutation timer path and enables comparator interrupts when the firmware has moved out of the startup polling path.
- Final timing advance is fixed at 22.5 degrees by disabling auto advance and setting runtime `temp_advance = 24`.
- Startup remains sine-assisted to reduce hard-start current and improve repeatability in bench tests.

## Final Build Artefact

The final artefacts were generated by a clean build of target `AT32DEV_F421` on 2026-05-17 from commit `3f8192fb30c31544cc35bff51cc336ef25dbf7fd`.

Primary flashing artefact:

- `artifacts/AM32_AT32DEV_F421_2.20.bin`
- Size: `31744` bytes
- SHA256: `FF165CFFB8CC8AF5548FBBB984E36A83FB7576C29A182955697DF3352D440BD6`

The `.hex` and `.elf` outputs are preserved alongside the `.bin` for reproducibility and debugging.

