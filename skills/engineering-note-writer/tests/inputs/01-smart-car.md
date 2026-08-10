# Trial 01: MEC104 Smart Car Bring-Up

Write an MDX-ready bilingual learning note for the portfolio. Draft Chinese first internally, then provide the final website body with natural English/Chinese pairing. Suggest `title/titleZh`, `summary/summaryZh`, and tags.

## Confirmed material

- This was an MEC104 Smart Car course project in 2024.
- I participated in board assembly, staged hardware tests, and track tuning with my group.
- The build started from a bare PCB. The manual recommended installing parts from low to high and from the center outward.
- The power section used an LM7805 and nearby capacitors. Several capacitors were easy to damage during testing.
- The board had six IR tracking sensors, six collision switches, and two keys. A 74HC165 serialized these parallel inputs.
- An L293 motor driver sat between the controller and motors. Steering used left/right PWM values in the Arduino range from 0 to 255.
- We tested LED, keys, collision switches, IR sensors, motors, and speed sensors separately before running the complete racing program.
- During tuning, outer sensors triggered stronger correction and inner sensors triggered smaller correction.
- One recurring lesson was that something that looked like a code bug could come from a solder joint, component direction, or unstable power several steps earlier.

## Available evidence

- course screenshots for the power block, 74HC165, L293, PWM, and staged tests;
- a soldering-bench photo;
- a report PDF with the steering strategy;
- a testing-code folder;
- a final demo video.

## Boundaries

- Do not claim an individual competition result or lap time; none is provided.
- Do not invent dialogue, a dramatic failure, or an exact damaged component count.
- The original tutorial PDF is not public. Use placeholders for evidence paths.
