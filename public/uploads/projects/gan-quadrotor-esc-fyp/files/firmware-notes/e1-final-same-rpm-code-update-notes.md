# E1 Final Same-RPM Experiment Code Update Notes

Date: 2026-05-18.

This note summarises the final E1 same-RPM firmware behaviour for thesis evidence and ChatGPT Pro handoff. It is based on the local source folder `../FYP_Evidence/06_Firmware/STM32_ESC_Dshot_E1_Code/` and the GitHub-aligned release commit `0aca3df8c1dd01db76a8bcda30e4d615c046e439` tagged `E1-Final-DShot300`.

## Purpose

The final E1 firmware is an STM32F103C8T6 experiment-controller program for steady-state same-RPM ESC comparison. It sends board-specific DShot commands selected by the final P0 RPM mapping, logs input-voltage/current telemetry, and provides local timing for repeated same-command run windows at each selected P0 operating point.

## DShot Rate And Output Path

- Protocol/rate: `DShot300`.
- DShot output pin: `PB8`.
- Timer channel: `TIM4_CH3`.
- DMA channel: `DMA1_Channel5` for TIM4 CH3.
- Timer configuration evidence: `TIM4.Period = 239` in `STM32_ESC_DSHOT_E1.ioc`, with `PSC = 0` documented in the source README.
- DShot frame length: 16 bits plus 8 reset slots.
- DShot high-time ticks: `E1_DSHOT_BIT_0_HIGH_TICKS = 90`, `E1_DSHOT_BIT_1_HIGH_TICKS = 180`.
- Send-service interval: `E1_DSHOT_SEND_INTERVAL_MS = 1`.
- Valid throttle range: `48` to `2047`; `0` is used as stop.
- Telemetry bit: `E1_DSHOT_TELEMETRY_BIT = 0`.

## Compiled Same-RPM Profiles

The six final P0-selected operating profiles are compiled into `Core/Inc/app_e1_test.h` and selected before `START` by the local button.

| Profile | Board | RPM point | Target RPM | DShot command |
|---:|---|---|---:|---:|
| 1 | Si | R1 | 3000 | 551 |
| 2 | Si | R2 | 6500 | 786 |
| 3 | Si | R3 | 10000 | 1124 |
| 4 | GaN | R1 | 3000 | 540 |
| 5 | GaN | R2 | 6500 | 762 |
| 6 | GaN | R3 | 10000 | 1022 |

## Run Sequence

The final state machine is:

```text
WAIT_BT -> PREPARE -> RAMP -> RUN -> STOP -> RAMP -> RUN -> STOP -> RAMP -> RUN -> DONE
```

Operational sequence:

1. Power on and enter `WAIT_BT`.
2. Keep sending DShot stop.
3. Wait for `HC-05 STATE` Bluetooth connection confirmation.
4. Allow PB13 button presses to cycle the six compiled P0 same-RPM profiles before the run starts.
5. Wait for serial command `START`.
6. Enter `PREPARE` for `E1_BT_PREPARE_MS = 10000 ms`.
7. Execute three automatic cycles using the selected profile:
   - enter `RAMP`;
   - step directly to `E1_RAMP_START_DSHOT = 500`;
   - hold for `E1_RAMP_START_HOLD_MS = 250 ms`;
   - ramp to the selected profile command within `E1_RAMP_MS = 5000 ms`;
   - enter `RUN` for `E1_RUN_MS = 60000 ms`;
   - rest at DShot stop for `E1_REST_MS = 30000 ms` between cycles.
8. Enter `DONE` after the third run cycle.
9. Re-arm to `WAIT_BT` after `E1_DONE_REARM_DELAY_MS = 5000 ms` after a normal run or manual `STOP`.

Supported serial control commands:

- `START`: starts the prepared same-RPM profile sequence.
- `STOP`: forces DShot stop and ends the current session.
- `ABORT`: same emergency-stop path as `STOP`.

State enum values in the CSV stream:

| State | Numeric value |
|---|---:|
| `STATE_WAIT_BT` | 0 |
| `STATE_PREPARE` | 1 |
| `STATE_RUN` | 2 |
| `STATE_STOP` | 3 |
| `STATE_DONE` | 4 |
| `STATE_IDLE` | 5 |
| `STATE_RAMP` | 6 |

## Log Format

UART/HC-05 settings:

- UART: `USART1`.
- Baud rate: `9600`.
- TX/RX pins: `PA9` / `PA10`.
- Output interval: `E1_CSV_INTERVAL_MS = 1000 ms`.
- Log style: FireWater-compatible data lines for VOFA-style parsing.

Current FireWater frame:

```text
h1:t_ms,state,cmd_raw,dshot_cmd,adc_i_raw,adc_vbat_raw,v_i_sense,v_vbat_adc,current_A,vbat_V,power_W,zero_offset_V,active_zero_offset_V,delta_i_V,profile,target_rpm,instant_current_A
```

The firmware also emits human-readable helper lines beginning with `#`, including:

- `# boot`
- `# connected`
- `# waiting`
- `# ack`
- `# firewater_channels`
- `# state_change`
- `# profile_set`
- `# start_profile`
- `# user_stop`
- `# safety_fault`
- `# rearmed`

Important log interpretation boundaries:

- `cmd_raw` is retained for compatibility with the older "us-like" command abstraction, but the active ESC transport is DShot.
- `dshot_cmd` is the actual DShot command sent to the ESC.
- `profile` and `target_rpm` identify the selected P0 same-RPM operating point.
- Electrical values are firmware-processed telemetry values and still require calibration/uncertainty wording in the dissertation.

## Measurement Channels

- `PA0 / ADC1_IN0`: INA199 current-sense output.
- `PA1 / ADC1_IN1`: VBAT divider midpoint.
- Derived fields include `current_A`, `instant_current_A`, `vbat_V`, `power_W`, `zero_offset_V`, `active_zero_offset_V` and `delta_i_V`.
- Zero baseline is normally sampled during `PREPARE`, then frozen during non-zero DShot `RAMP` and `RUN`.

## Safety And Limitations

The firmware contains current-trip logic:

- `E1_CURRENT_TRIP_A = 55.0`
- `E1_CURRENT_TRIP_HOLD_MS = 100`
- `E1_CURRENT_FAST_TRIP_A = E1_CURRENT_TRIP_A`
- `E1_CURRENT_FAST_TRIP_HOLD_MS = 20`

These are firmware safety-latch thresholds, not a replacement for the separate bench safety checklist or the lab power-supply current limit used during propeller-loaded tests.

## Evidence Use

Allowed thesis claim: the final E1 same-RPM experiment-controller firmware used DShot300, compiled the six P0-selected Si/GaN R1/R2/R3 command profiles, executed three repeated 60 s run windows after a 10 s prepare stage and 5 s ramp stages, and logged FireWater-compatible voltage/current/power telemetry with profile and target-RPM identifiers.

Forbidden overclaim: this code release alone does not prove final E1 electrical results, current/voltage calibration, efficiency, thrust, torque, shaft power, thermal behaviour, waveform behaviour, run validity or board superiority.
