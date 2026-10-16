# P0 Selected RPM Points and DShot Mapping
Purpose: processed mapping table used to infer the board-specific DShot throttle commands required for each target RPM from coarse and fine tachometer sweeps.

## Processing notes
- Target RPM points: R1 = 3000 rpm, R2 = 6500 rpm, R3 = 10000 rpm.
- Si board correction applied: DShot 520 RPM reading 1 = 2360; DShot 790 RPM reading 2 = 6560.
- GaN board raw data accepted as transcribed.
- Sweep notes confirmed by student: GaN coarse sweep x1 / fine sweep x5; Si coarse sweep x1 / fine sweep x6.
- Crossed-out throttle values are interpreted as measurements not continued after the target value or useful throttle interval had already been found; they are not treated as failed measurements.
- The visible RPM triplets are retained in the processed tables as the raw tachometer readings used for mean/median/error calculations.
- Interpretation boundary: this mapping supports same-RPM command selection; the command difference itself is not a performance or efficiency result.

## Final selected mapping
| Board | RPM point | Target RPM | Selected DShot | Raw RPM readings | Mean RPM | Median RPM | Error % | Stable? |
|---|---:|---:|---:|---|---:|---:|---:|---|
| Si | R1 | 3000 | 551 | 3008, 3017, 3006 | 3010.333 | 3008 | 0.344444 | yes |
| Si | R2 | 6500 | 786 | 6497, 6502, 6503 | 6500.667 | 6502 | 0.010256 | yes |
| Si | R3 | 10000 | 1124 | 10004, 9998, 10002 | 10001.333 | 10002 | 0.013333 | yes |
| GaN | R1 | 3000 | 540 | 2998, 3004, 3002 | 3001.333 | 3002 | 0.044444 | yes |
| GaN | R2 | 6500 | 762 | 6499, 6498, 6501 | 6499.333 | 6499 | -0.010256 | yes |
| GaN | R3 | 10000 | 1022 | 10002, 10001, 10003 | 10002.000 | 10002 | 0.020000 | yes |

## Compact paired mapping
| Target RPM | RPM point | Si DShot | Si mean RPM | GaN DShot | GaN mean RPM |
|---:|---|---:|---:|---:|---:|
| 3000 | R1 | 551 | 3010.333 | 540 | 3001.333 |
| 6500 | R2 | 786 | 6500.667 | 762 | 6499.333 |
| 10000 | R3 | 1124 | 10001.333 | 1022 | 10002.000 |

## Claim boundary
This file should be used as P0 evidence for board-specific DShot command selection under matched target RPM points. It should not be used to claim ESC efficiency, thrust, or flight performance.
