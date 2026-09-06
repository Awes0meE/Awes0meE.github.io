# Arduino line-sensing and input-acquisition note

2026-09-06. The user explicitly combined black-line detection and 74HC165 input acquisition into one second Arduino learning note. The user has reviewed and approved the Chinese-first bilingual note at <http://127.0.0.1:8768/preview.html>. The first power/wheel-speed note has already received content approval. Both notes are now approved; neither has been published in this writing phase.

The new source is `content/notes/arduino-smart-car-line-sensing-input-acquisition.mdx`, with `visibility: private`. `chinese-draft.md` and `english-draft.md` contain the language drafts; `preview.html` renders their 15 paragraph pairs, four sections, one existing circuit image and one exact course-code excerpt. Start a local static server in this directory to reopen the packet on another device. The preview's figures and local-source links point to the existing public portfolio assets.

## Scope and recovery

The homepage owns assembly, bring-up, battery replacement, tuning and the race result. The first note follows power delivery and wheel-speed measurement. This second note follows a different question from the actual test-sketch comment about black line or a sensor lifted clear of the surface, through reflection, input voltage thresholds, shared loading, serial read order and spatial field mapping. The short phototransistor explanation and shared circuit sheet are necessary context; wheel marks, rpm conversion, power circuitry and the full project journey are not repeated.

This is present study of the provided circuit and course library. Conditional observations are proposed ways of investigating input behaviour; the 0x08 example is arithmetic, not a past measurement. No new bench test, historical curiosity, PCB authorship or firmware authorship is assigned to Alvin.

The new note adds a source file and leaves the first note and project homepage byte-for-byte unchanged. It can be removed from a future publication set simply by retaining its private visibility; the existing suspended note's original is still in the first packet's `before.mdx`.

## Sources and findings

- Kit manual `public/uploads/projects/arduino-smart-car-line-tracker/smart-car-manual-teas1-en.pdf`: the BOM lists seven ITR20001 sensors; §5.4 states seven; PDF page 45 labels IR1–IR7 and the two input registers. Page 47 shows the ITR20001 phototransistor output with a pull-up. The top-level schematic labels their supply `3V3`.
- `testing-code/without-led/test-4-ir/test-4-ir.ino`: actual black-line-or-air comment. `comm.h` defines load on D8, input on D12, and clock on D13. `comm.cpp` loads before two eight-bit loops, reads before clocking, maps reg0 bits 0–6 from the outermost left sensor through centre to outermost right, and inverts collision/key inputs separately. All are existing public course materials.
- [Everlight ITR20001/T datasheet](https://everlightamericas.com/datasheets/ITR20001_T.pdf): reflective emitter/phototransistor construction. The note keeps the project's ITR20001 label without assigning an unverified suffix.
- [Nexperia 74HC165/HCT165 datasheet](https://assets.nexperia.com/documents/data-sheet/74HC_HCT165.pdf): asynchronous parallel loading while PL is low, rising-edge shifting with clock enabled, and input-level limits. No exact half-supply switching threshold, Schmitt input, or falling-edge-only capture is invented. Shared loading is distinguished from sequential delivery.
- [Pololu QTR reflectance application note, A-type outputs](https://www.pololu.com/docs/0J13/3): a manufacturer's height comparison supports studying reflection geometry. Its measured distances and voltages are not assigned to this car.

The protected homepage still contains an old six-IR count. The BOM, dedicated sensor section, schematic and code agree on seven. This discrepancy is recorded in the active relay for correction before the next relevant publication; the scoped note-writing task does not claim that the whole family is already reconciled.

## Review

`chinese-step10.json` records six-category Chinese review before English adaptation. Final review removed quotation marks around an invented clock-first intuition and rechecked that Chinese sentence; the English already stated the idea without a quotation. The final Chinese hash is therefore different from the historical Step 10 hash. `verification.json` records final editorial checks, source checks and four browser views.

Editorial review was manual, performed in the current writing session. Lexical searches and arithmetic checks supplement it and are not independent semantic-review agents. No firmware or new unit-test suite was added. Lint/content/encoding, typecheck and the webpack production build passed; the build retains 24 rendered pages and nine public notes. The local source count rises from 24 to 25 because this is a new private note.
