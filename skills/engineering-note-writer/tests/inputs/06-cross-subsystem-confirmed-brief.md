# Trial 06: A Cooling Controller Story Across Subsystems

Write a Chinese-first bilingual learning note from the approved brief below. The Chinese should carry the full narrative and emotional weight; the English should preserve the same experience with slightly lower intensity.

## Approved brief

- The motivation came from gaming on a laptop that ran hot. I wanted to learn whether an external cooling controller could make that experience less frustrating.
- My attention did not move cleanly through one subsystem at a time. It jumped among an ESP32 PWM board, a C# desktop reader, Bluetooth communication, and a foam-and-acrylic air duct as each part exposed a different piece of the problem.
- The emotional payoff is the **Connect** moment: the satisfying point was not any isolated artifact, but seeing software, electronics, wireless communication, and the physical airflow path finally behave like one system.
- I spent roughly half a week trying PID control. It was a false start: I did not get a trustworthy closed-loop controller working, so the demonstrated build fell back to proportional control.
- A later enclosure iteration changed my interpretation. Fan duty cycle mattered, but airflow and intake geometry mattered alongside it; commanding more PWM could not decide where the air actually travelled.
- I remember the laptop temperature dropping and the frame rate feeling steadier during a game, but the exact temperature and FPS values are recollections rather than retained measurements. Present them only as remembered experience, not validated performance evidence.

## Confirmed artifacts

- `Form1.cs`, containing the C# reader and control interface;
- an ESP32 test that runs maximum PWM for 30 seconds;
- a system demo showing the controller responding across the connected parts;
- the foam-and-acrylic enclosure and duct iteration.

## Composition requirement

Allow the story to jump between subsystems wherever the attention path requires it, then synthesize those jumps later into the enclosure-and-airflow insight. Do not turn the note into an artifact inventory or a subsystem-by-subsystem checklist. Preserve the PID false start, proportional fallback, Connect payoff, and the distinction between recollection and measurement.
