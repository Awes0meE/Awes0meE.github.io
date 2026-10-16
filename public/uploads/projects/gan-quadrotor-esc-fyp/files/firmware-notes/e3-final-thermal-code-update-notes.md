# E3 Final Thermal Code Update Notes

Date: 2026-05-21.

This note summarises the final E3 same-RPM thermal-test firmware behaviour for thesis evidence and handoff. It is based on the local source folder `../STM32_ESC_Dshot_E3_Code/`, the GitHub-aligned commit `90cfad39f7326f53a96c11ca994e4f7f2c1acdee`, and the GitHub tag/release `Final`.

## Purpose

The final E3 firmware is an STM32F103C8T6 local bench controller for ESC thermal behaviour experiments. It runs one selected P0 same-RPM DShot operating point for a long thermal-soak window, displays live bench status on a 1.3 inch I2C OLED, samples input current and battery voltage through ADC/DMA, and emits short PB0 marker pulses so thermal images and optional oscilloscope captures can be aligned with the firmware timeline.

## DShot Rate And Output Path

- Protocol/rate: `DShot300`.
- DShot output pin: `PB8`.
- Timer channel: `TIM4_CH3`.
- DMA channel: `DMA1_Channel5` for TIM4 CH3.
- This output chain intentionally matches the working E2 bench wiring.
- DShot frame length: 16 bits plus 8 reset slots.
- DShot high-time ticks: `H1_DSHOT_BIT_0_HIGH_TICKS = 90`, `H1_DSHOT_BIT_1_HIGH_TICKS = 180`.
- Send-service interval: `E3_DSHOT_SEND_INTERVAL_MS = 1`.
- Valid throttle range: `48` to `2047`; `0` is used as stop.
- Telemetry bit: `E3_DSHOT_TELEMETRY_BIT = 0`.

## Compiled Same-RPM Profiles

The six final P0-selected operating profiles are compiled into `Core/Src/app_e3_test.c` and exposed through constants in `Core/Inc/app_e3_test.h`. They are inherited from the E2 same-RPM mapping.

| Profile | Board | RPM point | Target RPM | DShot command |
|---:|---|---|---:|---:|
| `P1` | Si | R1 | 3000 | 551 |
| `P2` | Si | R2 | 6500 | 786 |
| `P3` | Si | R3 | 10000 | 1124 |
| `P4` | GaN | R1 | 3000 | 540 |
| `P5` | GaN | R2 | 6500 | 762 |
| `P6` | GaN | R3 | 10000 | 1022 |

Before a session starts, the active-low PB13 button cycles through the profiles in table order.

## Run Sequence

The final E3 state machine is:

```text
ARMING -> READY -> PREPARE -> RAMP -> STABILIZE -> HEAT_SOAK -> STOP -> DONE
```

Operational sequence:

1. Power on and enter `ARMING`.
2. Continuously send DShot stop (`0`) for `E3_ESC_ARMING_MS = 6000 ms`, allowing the ESC to complete power-on tones, arm tone and stopped arming.
3. Enter `READY`; keep sending DShot stop while the operator selects a profile.
4. Use short PB13 presses to select one of the six P0 same-RPM profiles.
5. Use a long PB13 press (`E3_BUTTON_LONG_PRESS_MS = 800 ms`) to start one thermal-test session.
6. Enter `PREPARE` for `E3_PREPARE_MS = 10000 ms`, with DShot held at `0`.
7. Enter `RAMP`: start from `E3_RAMP_START_DSHOT = 500`, hold for `E3_RAMP_START_HOLD_MS = 250 ms`, then ramp to the selected profile within `E3_RAMP_MS = 5000 ms`.
8. Enter `STABILIZE` for `E3_STABILIZE_MS = 10000 ms` at the selected profile command.
9. Enter `HEAT_SOAK` for `E3_HEAT_SOAK_MS = 600000 ms`; this is the thermal evidence window.
10. Enter `STOP` for `E3_STOP_MS = 10000 ms`, with DShot returned to `0`.
11. Enter `DONE`, keep stopped, and allow another profile/session to be started.

During `PREPARE`, `RAMP`, `STABILIZE`, `HEAT_SOAK` and `STOP`, a debounced button press forces the emergency stop path into `ABORTED`, requests DShot stop immediately and pulls the marker low.

## Thermal Image Timing, Checkpoints And Marker Interface

- Marker output: `PB0`.
- Marker polarity: active HIGH.
- Marker pulse width: `E3_TRIGGER_PULSE_MS = 50 ms`.
- Marker behaviour: LOW outside checkpoint pulses.
- Checkpoint pulses occur at heat-soak entry (`0 s`) and at `30 s`, `60 s`, `120 s`, `300 s` and `600 s`.
- OLED reminder text displays `IMG xxxS` around thermal-image checkpoints.

| Thermal timing | Firmware event | PB0 marker behaviour | OLED/operator cue | Intended evidence use |
|---:|---|---|---|---|
| `0 s` | Enter `HEAT_SOAK` | 50 ms HIGH pulse | `IMG 000S` near the start | Initial thermal image and timeline alignment |
| `30 s` | First checkpoint | 50 ms HIGH pulse | `IMG 030S` reminder window | Thermal image |
| `60 s` | Second checkpoint | 50 ms HIGH pulse | `IMG 060S` reminder window | Thermal image |
| `120 s` | Third checkpoint | 50 ms HIGH pulse | `IMG 120S` reminder window | Thermal image |
| `300 s` | Fourth checkpoint | 50 ms HIGH pulse | `IMG 300S` reminder window | Thermal image |
| `600 s` | Final checkpoint / heat-soak completion boundary | 50 ms HIGH pulse, then transition toward stop handling | `IMG 600S` reminder window | Final thermal image and stop-boundary alignment |

The firmware does not store thermal images or oscilloscope traces. Thermal evidence is captured externally and aligned using the OLED timing cues and PB0 marker pulses.

## Safety Stop And Abort Behaviour

The final E3 firmware keeps stop handling explicit because the thermal experiment runs a motor/ESC under load for a long soak window.

- On cold power-up, the firmware enters `ARMING` before `READY` and continuously sends DShot stop (`0`) for `6000 ms`.
- In `READY`, the ESC command remains DShot stop (`0`) until the operator starts a session with a long PB13 press.
- In `PREPARE`, the firmware keeps DShot at `0` for `10000 ms`, giving the operator a final bench-safety countdown before motion.
- The ramp does not jump from stop directly to a high same-RPM command. It starts at DShot `500`, holds for `250 ms`, then ramps to the selected command across the 5 s ramp window.
- During `PREPARE`, `RAMP`, `STABILIZE`, `HEAT_SOAK` and `STOP`, a debounced PB13 press immediately enters `ABORTED`.
- The abort path requests DShot stop (`0`), stops any active DShot DMA transfer, clears the timer compare output to zero, pulls PB0 LOW, and leaves the firmware in a stopped state until the operator starts a new session.
- Normal completion also returns to DShot stop through `STOP` for `10000 ms`, then enters `DONE` with the ESC held stopped.

The safety-stop logic is a firmware-side stop/abort boundary for the experiment controller. It does not replace physical lab safety controls, current limiting, ESC protection settings, propeller/load guarding or power-supply emergency shutoff.

## OLED And Analog Interface

- OLED bus: `I2C1` on `PB6 / PB7`.
- OLED address: `E3_OLED_I2C_ADDR = 0x3C << 1`.
- OLED cold-start handling: wait `E3_OLED_POWERUP_DELAY_MS = 120 ms` before probing and retry every `E3_OLED_RETRY_INTERVAL_MS = 500 ms` until ready.
- OLED update interval: `E3_OLED_UPDATE_INTERVAL_MS = 200 ms`.
- ADC channels: `PA0 / ADC1_IN0` for current sense and `PA1 / ADC1_IN1` for battery divider.
- ADC mode: two-channel scan with circular DMA on `DMA1_Channel1`.
- Derived values: `current_A`, `vbat_V`, `power_W`.
- Current zero offset is collected only while DShot output is `0`; it is frozen during non-zero running states.

## Important Difference From E2

E2 is a scope-focused waveform controller with Bluetooth/UART control and a PB0 marker held HIGH during the capture window. E3 is a local thermal-test controller: it does not require Bluetooth or PC-side start commands, it runs a longer 600 s heat-soak window, uses OLED-guided operation, samples current/voltage/power, and emits short PB0 pulses at thermal checkpoints rather than holding the marker high for the whole run.

## Evidence Use

Allowed thesis claim: the final E3 same-RPM thermal-test firmware used DShot300 on `PB8 / TIM4_CH3 / DMA1_Channel5`, compiled the six P0-selected Si/GaN R1/R2/R3 command profiles, executed a safe `ARMING -> PREPARE -> RAMP -> STABILIZE -> HEAT_SOAK -> STOP` local bench sequence, displayed OLED operator guidance and live electrical estimates, and provided PB0 marker pulses for thermal evidence alignment.

Forbidden overclaim: this code release alone does not prove thermal performance, waveform quality, switching loss, EMI compliance, commercial reliability, efficiency, thrust, torque, shaft power, measurement calibration, run validity or board superiority.
