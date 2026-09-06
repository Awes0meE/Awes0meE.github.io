# DIY cooling note selection

2026-09-07. The user approved both counter notes, including the ending revision,
and requested the next project. Following the topic list, the active family is
DIY laptop cooling. The user selected both topics together. Draft both bilingual notes for review,
reusing the confirmed project context.

## 温度采样与风扇响应

The note follows one temperature value from its sensor identity through desktop
sampling, serial sending, ESP32 reception, peak retention and PWM update. Its
question is which sample the fan is responding to, and when it reaches the output.

Current source anchors:

- `public/uploads/projects/juanyun-public/diy-cooling/desktop-form1.cs`:
  `Monitor()` overwrites the shared CPU/GPU field for every matching temperature
  sensor, without choosing a specific sensor `Name` or `Identifier`.
- `UpdateTimer_Tick()` queues `Monitor()` and transmission in separate
  `Task.Run` calls, with no ordering dependency between them. The nominal timer
  interval is 5000 ms, and transmission alternates CPU/GPU, yielding about one
  sending opportunity per source per ten seconds under the intended cadence.
  This does not establish a fixed sample age or a worst-case latency bound.
- `public/uploads/projects/juanyun-public/diy-cooling/esp32-platformio-main.cpp`:
  `cpuValue`/`gpuValue` track recent received values, while `maxCpuValue` and
  `maxGpuValue` retain peaks. The periodic path selects their maximum after
  30000 ms and calls `updatePWM()`.
- `handleButtonPress()` also calls `updatePWM()`, and `updatePWM()` clears both
  retained peaks. The note must account for these event-driven resets instead
  of describing every peak window as an uninterrupted 30 seconds.

Develop a labelled timing example, explaining sample completion, transmission,
arrival and application separately. Sensor identity, a timestamp and an explicit
sample object provide a concrete design to study. Explain peak hold through
the actual update/reset paths. Any sample-age calculation is a stated timing
model, not an old measured delay. Keep scope on the data and update sequence;
do not expand into a full PID tutorial or retell the first Connect episode.

## PWM 风扇控制与转速反馈

The note follows the interface from the PWM command to fan behaviour and a
separate tach reading. Begin with the existing `Fan Speed` display being fed by
`dutyCycle`, then explain how frequency, duty and RPM describe different things.

Current source anchors:

- The ESP32 source configures GPIO 5, initial frequency 15000 Hz and 8-bit LEDC.
  It maps a 0–100 duty value to 0–255; button handlers change frequency by 200 Hz
  or manual duty by ten percentage points. There is no tach reading path in
  this source.
- Use the reviewed project schematic to identify the actual power and control
  connections before describing the board interface. Do not infer a fan model
  or its ratings from the generic four-wire fan explanation.
- [Noctua's manufacturer guide](https://www.noctua.at/en/support/faqs/microcontroller-guide-pwm-setup-and-rpm-monitoring)
  separates supply, PWM and tach. It documents its own PWM frequency, logic
  levels, low-duty behaviour and open-collector tach output. Its model-specific
  details are teaching examples, not specifications of Alvin's unidentified fan.

Study why a command needs its own feedback channel, how an open-collector tach
output connects to a controller, and what a measured duty/RPM curve could show.
The car note already explains counting pulses and reciprocal speed calculation;
link or summarize that step briefly instead of repeating the entire derivation.
Leave airflow, noise and controlled cooling comparisons for a later focused
investigation with an appropriate experiment. Preserve remembered CSGO results
as project context rather than recasting them as new measurements.

## Page allocation and current state

The homepage retains the actual build, desktop application, PCB revisions,
first connection, enclosure and personal use. The old private
`content/notes/juanyun-diy-cooling.mdx` supplies material for the two bounded
investigations and remains intact until the topics are selected. Preserve a
recovery copy when replacing its body. Proposed experiments remain present
learning; no project event is invented from a code path or an external source.

Research starting points verified during selection:

- [Microsoft task-based asynchronous programming](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming)
- [LibreHardwareMonitor ISensor](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/blob/master/LibreHardwareMonitorLib/Hardware/ISensor.cs)
- Noctua guide linked above.

Apply the current Engineering Note Writer, Chinese Step 10 and Step 12 checks,
English adaptation rules and cross-page division. Compare nearby endings for
recurrence; an apt occasional next-time sentence is allowed. The user selected both notes; do not ask for the same selection again.
