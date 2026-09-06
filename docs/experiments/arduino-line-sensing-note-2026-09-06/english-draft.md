# Arduino Car Line Sensing and Input Acquisition

One comment in the car's [infrared test sketch](/uploads/projects/arduino-smart-car-line-tracker/testing-code/without-led/test-4-ir/test-4-ir.ino) caught my attention while reading it again. Beside `if(sensor.ir_left_3)`, it describes the outermost left sensor detecting a black line or being lifted clear of the surface. Both conditions take the program into the same branch. I want to trace that `1` back through the circuit and find out what happens between light reflecting off the floor and a sensor variable becoming true.

## Reflection and Voltage

The line sensors are ITR20001 devices. An infrared emitter and a phototransistor share the package, facing the target surface, as shown in [Everlight's component documentation](https://everlightamericas.com/datasheets/ITR20001_T.pdf). The emitter illuminates a small area beneath the car, and the returning infrared light produces current in the receiver. At a suitable mounting height, the difference in reflection between a light floor and black tape can indicate where the line lies.

![Tracking and wheel-speed sensor circuits, with the ITR20001 line-sensing circuit above](/uploads/projects/arduino-smart-car-line-tracker/manual-ir-sensor-schematic.png)

In the upper circuit, R1 limits current through the emitter. The phototransistor has its emitter connected to ground and its collector connected to `OUT`, with R2 pulling that node up toward the supply. Stronger reflected light increases collector current and lowers the output voltage. As reflection weakens, the pull-up brings the voltage back up. Black tape and an unobstructed view into the distance can both reduce the light returning to the receiver, which explains why the comment groups them together.

I would therefore read a high input first as weak reflected light reaching the receiver. Interpreting it as a black line also depends on the sensor's position relative to the track. Raising the chassis, tilting the sensor, or mounting it too far above the floor can change the received light. In [Pololu's reflectance-sensor experiment](https://www.pololu.com/docs/0J13/3), increasing the distance reduced the voltage difference between the black and white regions. That gives me something specific to watch when following the car manual's test of moving a sensor over black tape: whether my hand changes its height at the same time.

Surface material and ambient light matter as well. Two materials that look equally black to my eyes can reflect infrared differently, while gloss and angle affect how much light returns toward the receiver. Ambient infrared can also reach it. If a change of floor makes the readings erratic, I would hold the position and height steady, compare output voltages, and then observe what changes when external light is screened out. Keeping those changes separate would help identify which condition affects the reading.

## Logic Inputs

The [main schematic](/uploads/projects/arduino-smart-car-line-tracker/smart-car-manual-teas1-en.pdf#page=45) takes the line-sensor outputs into one of the two 74HC165 chips. Both the sensors and the registers have supplies labelled `3V3`. There is no separate comparator in the phototransistor circuit shown above; `OUT` can vary over a range of voltages. The 74HC165 input circuit classifies that voltage as a logic level. By the time the program reads a bit, it has the result of that decision, with no way to recover the original voltage from it.

It is tempting to put the dividing point at half of 3.3 V. The [74HC165 datasheet](https://assets.nexperia.com/documents/data-sheet/74HC_HCT165.pdf#page=6) instead specifies `VIL`, the maximum voltage guaranteed to count as low, and `VIH`, the minimum guaranteed to count as high, under the stated supply conditions. Between them, I cannot assign a dependable `0` or `1` in advance. Reliable detection calls for the two surfaces to produce voltages inside their respective valid logic regions, with margin. Small changes in light or position can flip a reading that sits near a switching threshold.

I can now see the tradeoff in this circuit more clearly. The program gets convenient binary inputs, but the detail in the received light level is lost. Faced with several `1`s, I would also consider neighbouring sensors and the chassis position to distinguish a wide dark region from the whole sensor row being too far above the floor. An `ir` field name makes those physical conditions easy to overlook.

## Parallel Load and Serial Read

Seven line sensors, six collision switches, and two buttons occupy fifteen inputs across the two 74HC165 chips. Each register holds eight bits, so cascading them provides a sixteen-bit readout. The [course library's pin definitions](/uploads/projects/arduino-smart-car-line-tracker/testing-code/without-led/test-4-ir/comm.h) assign load control to Nano D8, clock to D13, and serial data input to D12. The individual signals connect locally to the registers, then travel back to the controller one after another along the same data wire.

Before reaching the loops in `reload_shift_reg()`, I stop at `LOAD`. This macro drives D8 low, waits 1 ms, and raises it again. The [74HC165 loads its parallel inputs asynchronously while `PL` is low](https://assets.nexperia.com/documents/data-sheet/74HC_HCT165.pdf#page=1). Raising `PL` ends parallel loading so the contents can be shifted out. Both chips share the load wire, giving all sixteen bits the same loading event. Although transmission is sequential, the input states are retained when that common load ends, subject to the specified setup and hold times around its end.

Clock pulses then move the loaded contents toward the serial output. The course code uses an order I could easily reverse by accident: read D12 first, then generate a rising clock edge. The first bit is already at the output after loading. Reading it before shifting brings in the full sequence; clocking first would skip that bit and offset the following ones. This is the first eight-iteration loop in [`comm.cpp`](/uploads/projects/arduino-smart-car-line-tracker/testing-code/without-led/test-4-ir/comm.cpp). A second loop fills `reg1` the same way.

```cpp
for (i = 0; i < 8; i++)
{
    sensor.reg0 <<= 1;
    if (MISO)
        sensor.reg0 |= 0x01;
    CLK_1;
    CLK_0;
}
```

Each iteration shifts the accumulated value left and places the current input in its least significant bit. After eight iterations, the first bit read has reached bit 7 of `reg0`, while the last remains in bit 0. The first group fills `reg0`; the next fills `reg1`. Here, `MISO` expands to `digitalRead(12)`, and `digitalWrite()` generates the clock. Following those macros reveals how this routine actually collects the sequence one bit at a time.

## Bits and Sensor Positions

Once the sixteen bits are in memory, their positions still need to be matched to the physical sensors. The course library assigns bits 0 through 6 of `reg0` to the outer, middle, and inner left sensors, the centre sensor, then the inner, middle, and outer right sensors. The centre field, `ir_mid`, uses the mask `1 << 3`. As a worked example, `reg0 = 0b00001000` has only bit 3 high, producing `ir_mid = 1` and six other fields set to `0`. The first bit received ends up at the top of the byte, while the leftmost sensor is assigned to its lowest bit. I need to check transmission order and physical order separately.

There is another small detail in the decoding expressions. Line inputs use a double logical NOT, such as `!!(sensor.reg0 & (1 << 3))`, to turn a zero or nonzero masked value into `0` or `1` without changing its truth value. Collision switches and buttons use a single `!`: pressing them pulls the input low, so the inversion makes a press true. A `1` in the resulting structure consequently has different electrical origins. In a line-sensor field, it corresponds to a high input caused by weaker reflection; in a button field, it corresponds to the low input from a press. I would read the circuit and the inversion expression together when examining this kind of interface.

Returning to `if(sensor.ir_left_3)`, I can now follow the variable all the way back beneath the car. Reflected light changes phototransistor current, the circuit turns that into a voltage, and the 74HC165 accepts a logic level, loads it, and shifts it out. The program places the relevant bit in the outermost left sensor's field. The comment about black tape or being clear of the surface also brings the sensor's present position into the interpretation. With that path understood, a line-following condition in the code connects to both a physical location on the car and the light actually reaching it.
