# DIY cooling learning notes

2026-09-07. The user selected both proposed topics. Both Chinese-first bilingual
drafts are complete and awaiting user review. The notes remain private.

- **温度采样与风扇响应 / Temperature Sampling and Fan Response** follows sensor
  identity, independently scheduled reading and sending, alternate CPU/GPU
  transmission, retained peaks, and button-triggered resets.
- **PWM 风扇控制与转速反馈 / PWM Fan Control and Speed Feedback** follows the
  schematic's power and PWM connections, carrier frequency and duty, and the
  separate tachometer signal needed to observe each fan's response.

## Review

The session serves [the combined review page](http://127.0.0.1:8770/preview.html).
The article buttons, language buttons, section links and footer navigation work
within one page. Direct entries use `?note=sampling&lang=zh` and
`?note=fan&lang=zh`; replace `zh` with `en` for English.

`preview.html` can be served from this directory on another computer. Its
schematic image is embedded, and selecting it opens the existing public PDF.
The contextual car-note link goes to its local review at port 8767 while both
note families are private. On another device, start that review server as well
or read the referenced car note from the repository. The MDX retains its final
note route for eventual publication.

## Files and recovery

- `content/notes/juanyun-diy-cooling.mdx` now contains the sampling investigation,
  preserving the old slug and private visibility.
- `content/notes/juanyun-diy-cooling-pwm-fan-control.mdx` is the new private fan
  interface note.
- `before.mdx` preserves the old suspended note byte for byte from `2b21af8`.
  Its SHA-256 is `b2d6d37214e7da77eb2bc13c00aa50c5feffaf37f821186cbeb10e5bd67dabcb`.
  Restoring it to the original content path recovers the earlier note. Remove
  the newly added note from the content collection only if reverting this batch.
- `sampling/` and `fan/` hold the separate language drafts and the Chinese
  Step 10 review records made before English began. The later sampling wording
  correction is documented under `lateEditorialRepairs` in `verification.json`;
  Step 12 reviewed the complete final Chinese again.
- `public/uploads/projects/juanyun-public/diy-cooling/esp32-schematic.png` is a
  faithful render of the existing public one-page `pcb-schematic.pdf`. The
  original PDF remains unchanged. No fan model or unseen connection was added.

The date marks present study. The project homepage retains the original build,
desktop application, PCB revisions, first connection, enclosure and personal
use. Neither note replays those experiences. The timing examples, pull-up
calculation and proposed response measurements are current reasoning, not
historical measurements or implemented firmware changes. The four approved
Arduino notes and all project homepages are unchanged in this batch.

## Technical references

- Existing `desktop-form1.cs` assigns each matching temperature entry to a
  shared CPU/GPU field. `UpdateTimer_Tick()` submits reading and sending through
  separate `Task.Run` calls without an ordering dependency. The nominal timer
  interval is 5000 ms, with alternating CPU/GPU transmission.
- [LibreHardwareMonitor ISensor](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/blob/master/LibreHardwareMonitorLib/Hardware/ISensor.cs)
  supplies sensor names and identifiers.
- [Microsoft task programming](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming)
  supports the distinction between independent scheduling and ordered execution.
- Existing `esp32-platformio-main.cpp` keeps current readings and retained peaks
  separately. Both the periodic path and `handleButtonPress()` call
  `updatePWM()`, which clears both peaks. The button path uses the previously
  saved `maxValue` and leaves `lastUpdateTime` unchanged. The worked window
  explicitly assumes automatic mode; Manual retains its chosen duty.
- The schematic's fan outputs use PWM, 12V+ and 12V−. Its two four-pin connectors
  each leave pin 2 unconnected; their pin order is not treated as the standard
  PC fan connector order. No tachometer path is added by interpreting that spare
  pin or the separate voltage-converter module.
- [Analog Devices fan control](https://www.analog.com/en/resources/analog-dialogue/articles/how-to-control-fan-speed.html)
  explains the separate PWM input and why supply switching can interrupt tach.
- [Espressif LEDC](https://docs.espressif.com/projects/esp-idf/en/v4.4.8/esp32/api-reference/peripherals/ledc.html)
  explains continuing waveform generation with configured frequency and duty.
  The note discusses the archived 15 kHz / 8-bit code without rewriting its APIs.
- [Noctua microcontroller guide](https://www.noctua.at/en/support/faqs/microcontroller-guide-pwm-setup-and-rpm-monitoring)
  supplies the manufacturer example of a 25 kHz target and 21 to 28 kHz range.
- [Noctua PWM white paper](https://cdn.noctua.at/media/Noctua_PWM_specifications_white_paper.pdf)
  describes its open-collector tach output and two pulses per revolution.
  These specifications are teaching examples, not an identification of the
  cooler's fan. The shared-tach analysis is explicitly circuit reasoning.

## Verification

`verification.json` records the manual Truth, personal learning voice, L1,
Chinese Step 12, English, bilingual, cross-page and ending review, along with
source hashes and actual browser observations. No independent agent reviewed
the prose. Lexical checks supplement contextual sentence review.

Lint, content and encoding validation, typecheck, and the webpack production
build passed. Eight browser views cover two notes, two languages and 1440/390 px
widths. Article/language switching, section navigation and footer controls
passed; desktop/mobile screenshots were also inspected. The source collection
has 27 notes, nine public and eighteen private; the public build remains 24
pages. No remote push, PR, merge or publication was performed.
