# Arduino power and wheel-speed note review

Ending feedback applied on 2026-09-07. The working language drafts and preview include the revised closing paragraphs. Earlier verification and Step 10 files remain historical snapshots; see [the ending revision](../natural-endings-2026-09-06/README.md) for the current comparison, Chinese-first review and final checks.

2026-09-06. User selected power delivery and wheel-speed sensing in **one note**. The new Chinese-first bilingual draft replaces the body of `content/notes/arduino-smart-car-line-tracking-learning-note.mdx` locally and remains `visibility: private`. The user has since approved the content; it is not published yet.

Open `preview.html` through a local static server. The current session uses <http://127.0.0.1:8767/preview.html>. The full language drafts are `chinese-draft.md` and `english-draft.md`; the preview uses the same paragraphs. Figures and source links use the already public portfolio assets and original manufacturers' pages.

## Recovery

`before.mdx` preserves the old private note exactly as it stood in main commit `8e009efd2a00ef8fdbb2a47eaed9bf5b2251020d`. Restoring the body and restoring public visibility are separate actions. The user has approved the rewritten content. Keep visibility separate from that content approval until the notes are prepared for publication. No other project or note body is part of this draft.

The date now identifies this present investigation, while the project homepage retains the original project period. Present research and calculated examples are not retroactive claims about the original race or measurements.

## Editorial allocation

The homepage owns assembly, staged bring-up, the battery-change decision, track tuning, and the top-five-percent result. This note investigates battery and logic rails, linear-regulator loss, L293D drive and input PWM, ITR8307 optical sensing, conversion from twelve rising edges per wheel revolution to rpm, and feedback in the provided course library.

Reusing necessary component names and diagrams supports the selected question; no full project episode or tuning story is retold. The course library's `motor_step()` branch is described as provided code, not as Alvin's original implementation or the verified final racing controller.

## Research and checks

- Kit manual: PDF pages 9–10 explain wheel marks; page 45 is the top-level schematic; pages 46–47 show driver, regulator and sensing circuits. The supply diagram grounds L7805CV normally and labels its output `5V`; the manual's isolated 5.5 V sentence is not adopted. Sensor supply is `3V3` in the top-level schematic. Read these against the relevant subcircuits rather than treating all `VCC` labels as one global supply.
- Provided `without-led/test-6-speed/motor.cpp`: rising-edge interrupts, `millis()` interval, `5 * 1000 / float(interval)`, signed drive polarity, input PWM and the speed-without-distance feedback branch. The coefficient derives from 60 seconds/minute divided by twelve counts/revolution. The 20 ms example gives 250 rpm; counting one pulse in 100 or 500 ms gives steps of 50 or 10 rpm.
- [ST L78 datasheet](https://www.st.com/resource/en/datasheet/l78.pdf), Table 10: L7805C and typical dropout conditions. Dissipation examples use a hypothetical 100 mA in the regulated branch and neglect regulator quiescent current.
- [TI L293D overview](https://www.ti.com/product/L293D) and [datasheet](https://www.ti.com/lit/ds/symlink/l293.pdf): output structure, two supply domains, typical output drops and braking states. The 6 V / 0.6 A calculation is illustrative, not an operating measurement or device recommendation.
- [Everlight ITR8307](https://everlightamericas.com/reflective-type/234-itr8307.html): reflective emitter/phototransistor construction. No unsupported suffix, quadrature channel or direction measurement is assigned.
- [Arduino PWM](https://support.arduino.cc/hc/en-us/articles/9350537961500-Use-PWM-output-with-Arduino) and [interrupt reference](https://github.com/arduino/reference-en/blob/master/Language/Functions/External%20Interrupts/attachInterrupt.adoc): 8-bit output and board-specific interrupt mapping.
- [Microchip AN905](https://ww1.microchip.com/downloads/en/appnotes/00905b.pdf): brushed permanent-magnet motor speed, current/torque and drive principles.

`chinese-step10.json` records the Chinese review before English. `verification.json` records final Chinese, English, cross-page, build and browser review. Checks are manual editorial review plus observed tool results, not independent model trials. No new firmware or automated unit tests were added.

## Homepage release completed before this draft

[PR #36](https://github.com/Awes0meE/Awes0meE.github.io/pull/36) merged at `8e009ef`, and its Vercel production deployment succeeded. Seven bilingual homepage endings and all 24 note detail routes passed 31 production checks. See `../project-homepages-2026-09-06/production-verification.json`. The two merged work branches were removed; `main` was synced and remote `gh-pages` preserved.
