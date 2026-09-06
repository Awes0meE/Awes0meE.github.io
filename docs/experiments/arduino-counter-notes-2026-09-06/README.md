# Arduino counter learning notes

Both notes, including the revised endings, were approved by the user on 2026-09-07 at content checkpoint `f631175`. The preview now shows approved status. Both remain private while work moves to DIY cooling topic selection.

Ending feedback applied on 2026-09-07. The working language drafts and preview include the revised closing paragraphs. Earlier verification and Step 10 files remain historical snapshots; see [the ending revision](../natural-endings-2026-09-06/README.md) for the current comparison, Chinese-first review and final checks.

2026-09-06. The user selected both proposed topics and requested complete drafts for review. This packet contains Chinese-first bilingual versions of **共阳数码管与 BCD 译码 / Common-Anode Displays and BCD Decoding** and **自锁按键与计数控制 / Latching Switches and Counter Control**.

Open `preview.html` through a local static server in this directory. The current session serves <http://127.0.0.1:8769/preview.html>. The two article buttons, language buttons, section links and footer navigation all work within the same page. Direct entries use `?note=display&lang=zh` and `?note=switch&lang=zh`; replace `zh` with `en` for English.

## Sources and recovery

- `content/notes/arduino-digital-clock-counter-course-note.mdx` now contains the display investigation, remaining private. `before.mdx` preserves the old suspended body exactly from parent checkpoint `6828f59`.
- `content/notes/arduino-counter-latching-switch-control.mdx` is the new second private note.
- `display/` and `switch/` hold the separate language drafts and their Chinese Step 10 records. Each Chinese draft passed editorial and six-category sentence review before English began.
- Both dates describe present study, 2026.09.06. The homepage retains the original project period. The two already approved Arduino car notes and the counter homepage are unchanged.

The local source count is 26 notes: nine public and seventeen private. New private sources do not add public routes; the production build retains 24 rendered pages. This task prepares review copies, without restoring public visibility or deploying them.

## Page allocation

The homepage owns the user's wiring and programming work, the common-pin fault, reporting the correction to the professor, borrowing a meter to map contacts, the separately flashed 17 and 99 limits, and the classroom result. Neither note replays those episodes.

The display note follows one displayed number into decimal splitting, ABCD bit order, active-low open-collector outputs, individual LED current paths and resistors, and the effect of display controls. The switch note follows mechanical position into biased input levels, stable state, a selected transition, and count timing. Each closes its own investigation. Hypothetical calculations and proposed control rules are clearly written as present reasoning, not past experiments or a reconstruction of the missing final firmware.

## Technical references

- Existing project report and `single-digit-bcd-counter.ino`: units/tens extraction, ABCD array order and modulo-ten indexing. The report's Uno/CD4511 simulation is not treated as an exact picture of the physical Nano/SN54LS47 build.
- Existing `sn54ls47-datasheet.pdf`: page 2 confirms the SN54LS47 low-active open-collector structure and the 1/2/4/8 input weights. The course slide shows a resistor per output. The note keeps SN54LS47 separate from the different SN74LS47 drive-current rating and does not borrow a numeric current limit from the other part.
- [TI LS47](https://www.ti.com/product/SN74LS47) and [CD4511B](https://www.ti.com/product/CD4511B): decoder functions, non-decimal input behaviour, common-anode versus common-cathode drive, test and blanking controls. The 5 V / 2.0 V / 0.3 V / 5 mA resistor example is hypothetical and yields 540 ohms, or approximately 4.82 mA with 560 ohms.
- Existing switch slide and `digital-read-key.ino`: latching switch, external bias circuits and INPUT polling. No exact six-terminal topology is inferred from the pin count; the article describes deriving it from disconnected continuity measurements. A 5 V, 10 kilohm closed-switch example yields 0.5 mA.
- [Arduino pinMode](https://github.com/arduino/reference-en/blob/master/Language/Functions/Digital%20IO/pinMode.adoc), [Debounce](https://github.com/arduino/arduino-examples/blob/main/examples/02.Digital/Debounce/Debounce.ino) and [StateChangeDetection](https://github.com/arduino/arduino-examples/blob/main/examples/02.Digital/StateChangeDetection/StateChangeDetection.ino): INPUT versus INPUT_PULLUP, stability timing and event detection. The 20 ms interval is a worked example, not a measured requirement or the final project's debounce implementation.
- [Arduino delay](https://github.com/arduino/reference-en/blob/master/Language/Functions/Time/delay.adoc) and [BlinkWithoutDelay](https://github.com/arduino/arduino-examples/blob/main/examples/02.Digital/BlinkWithoutDelay/BlinkWithoutDelay.ino): main-loop blocking and elapsed-time checks. Pause state, reset-on-entry, startup initialization, resume timing and reset priority are explicitly proposed present-day choices.

## Review

The final review covers Truth, personal learning voice, reader-prose L1, all six Chinese sentence categories, bilingual meaning and natural syntax, and cross-page allocation. It is manual review by the current writer; lexical checks do not replace semantic judgment and no independent review agent was used. `verification.json` records source hashes, arithmetic checks, project validation and the observed browser checks. No firmware, application code, new visual assets or dependency changes are included.
