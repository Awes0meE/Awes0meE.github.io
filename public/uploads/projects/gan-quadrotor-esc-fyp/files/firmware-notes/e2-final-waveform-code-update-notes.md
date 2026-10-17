# E2 Final Waveform Code Update Notes

Date: 2026-05-18.

This note summarises the final E2 same-RPM waveform firmware behaviour for thesis evidence and ChatGPT Pro handoff. It is based on the local source folder `../FYP_Evidence/06_Firmware/STM32_ESC_Dshot_E2_Code/` and the GitHub-aligned commit `3ef0fbad2d9498549a1afd6b3d292bf5a862b113`.

## Purpose

The final E2 firmware is an STM32F103C8T6 experiment-controller program for propeller-loaded same-RPM ESC phase-node waveform observation. It sends board-specific DShot commands selected by the final P0 RPM mapping, provides local timing for oscilloscope capture, and exposes a PB0 marker so the scope screenshots can be tied to the firmware `RUN` window.

## DShot Rate And Output Path

- Protocol/rate: `DShot300`.
- DShot output pin: `PB8`.
- Timer channel: `TIM4_CH3`.
- DMA channel: `DMA1_Channel5` for TIM4 CH3.
- DShot frame length: 16 bits plus 8 reset slots.
- DShot high-time ticks: `E2_DSHOT_BIT_0_HIGH_TICKS = 90`, `E2_DSHOT_BIT_1_HIGH_TICKS = 180`.
- Send-service interval: `E2_DSHOT_SEND_INTERVAL_MS = 1`.
- Valid throttle range: `48` to `2047`; `0` is used as stop.
- Telemetry bit: `E2_DSHOT_TELEMETRY_BIT = 0`.

## Compiled Same-RPM Profiles

The six final P0-selected operating profiles are compiled into `Core/Inc/app_e2_waveform.h` and are selected before `START` by either PB13 or a UART command.

| Profile | Board | RPM point | Target RPM | DShot command |
|---:|---|---|---:|---:|
| `P1` | Si | R1 | 3000 | 551 |
| `P2` | Si | R2 | 6500 | 786 |
| `P3` | Si | R3 | 10000 | 1124 |
| `P4` | GaN | R1 | 3000 | 540 |
| `P5` | GaN | R2 | 6500 | 762 |
| `P6` | GaN | R3 | 10000 | 1022 |

Supported selection commands include `P1` ... `P6`, `PROFILE1` ... `PROFILE6`, `SI_R1` ... `SI_R3`, and `GAN_R1` ... `GAN_R3`.

## Run Sequence

The final E2 state machine is:

```text
WAIT_BT -> PREPARE -> RAMP -> STABILIZE -> RUN -> DONE -> WAIT_BT
```

Operational sequence:

1. Power on and enter `WAIT_BT`.
2. Keep sending DShot stop while waiting for an HC-05 Bluetooth connection.
3. Confirm `HC-05 STATE` high for `E2_BT_CONNECT_CONFIRM_MS = 500 ms`.
4. Allow PB13 or UART profile commands to select one of the six P0 same-RPM profiles.
5. Wait for UART command `START`.
6. Enter `PREPARE` for `E2_BT_PREPARE_MS = 10000 ms`.
7. Enter `RAMP`: start from `E2_RAMP_START_DSHOT = 500`, hold for `E2_RAMP_START_HOLD_MS = 250 ms`, and ramp to the selected profile within `E2_RAMP_MS = 5000 ms`.
8. Enter `STABILIZE` for `E2_STABILIZE_MS = 10000 ms` at the selected profile command.
9. Enter `RUN` for `E2_RUN_MS = 300000 ms`; this is the oscilloscope capture window.
10. Enter `DONE`, send DShot stop, then re-arm to `WAIT_BT` after `E2_DONE_REARM_DELAY_MS = 5000 ms`.

Supported stop commands:

- `STOP`: forces DShot stop, pulls the scope marker low and ends the current session.
- `ABORT`: same emergency-stop path as `STOP`.

## Scope Marker And Measurement Interface

- Scope marker output: `PB0`.
- Marker behaviour: LOW outside `RUN`, HIGH during `RUN`.
- Intended scope use in the source README: CH1 records PB0 marker, CH2 records ESC W-phase waveform.
- Actual final E2 CSV waveform evidence uses the exported column `CH2V` for the W-phase voltage trace.
- The firmware itself does not sample the phase waveform. Waveform data are captured by the Rigol DHO814 oscilloscope and stored in `../FYP_Evidence/08_Experiments/E2_sameRPM_waveform/`.

## UART And Local Operator Interface

- UART: `USART1`.
- Baud rate: `9600`.
- TX/RX pins: `PA9` / `PA10`.
- Bluetooth state input: `PB12`.
- Local profile button: `PB13`, active low with debounce.
- OLED: displays firmware identity, W-phase target, PB0 marker status, selected profile/DShot command and capture countdown.

E2 UART is used for control/status only. It is not a final electrical-telemetry or waveform-data channel.

## Important Difference From E1

E2 is scope-only waveform evidence. It intentionally does not include E1-style current-sense, voltage-sense, power telemetry, FireWater CSV logging, or repeated 60 s electrical run windows. Electrical input-power evidence belongs to E1; waveform evidence belongs to E2.

## Evidence Use

Allowed thesis claim: the final E2 same-RPM experiment-controller firmware used DShot300, compiled the six P0-selected Si/GaN R1/R2/R3 command profiles, executed a `PREPARE -> RAMP -> STABILIZE -> RUN` oscilloscope-capture sequence, and provided a PB0 marker that is high during the `RUN` waveform capture window.

Forbidden overclaim: this code release alone does not prove waveform quality, switching loss, EMI compliance, commercial reliability, efficiency, thrust, torque, shaft power, thermal behaviour, measurement calibration, run validity or board superiority.
