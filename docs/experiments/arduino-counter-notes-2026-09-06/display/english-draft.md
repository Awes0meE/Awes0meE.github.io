# Common-Anode Displays and BCD Decoding

When the two-digit display reads `17`, it looks as though the program has simply moved a number onto the breadboard. Reading the counter program again, I want to follow what happens in between. The Arduino holds a number, the decoders receive two groups of four inputs, and a set of LED segments lights up. Numbers, pin levels, and illuminated segments each have a mapping that needs to make sense.

## Decimal Digits and BCD

The [project report](/uploads/projects/arduino-digital-clock-counter/digital-clock-homework-report.pdf#page=1) separates the digits with `Num % 10` for units and `(Num / 10) % 10` for tens. Applying those expressions to `17` gives `7` and `1`, which go to separate decoders. BCD represents each decimal digit with four binary bits, so there are two independent digit codes here. The binary representation of the integer 17 is `10001`; the two display digits require the BCD groups `0001 0111`. Those representations serve different purposes.

The number `1` made me pause when I read the [single-digit example](/uploads/projects/arduino-digital-clock-counter/single-digit-bcd-counter.ino). Its array entry is `{1, 0, 0, 0}`, while I normally expect to see `0001` written down. The pin definitions explain the order. The array follows A, B, C, D, with weights of 1, 2, 4, and 8. Written binary usually puts the most significant bit on the left. Here the first array element goes to A, exactly where it belongs.

```text
Decimal digit    D C B A    Array order A, B, C, D
      1          0 0 0 1          1, 0, 0, 0
      7          0 1 1 1          1, 1, 1, 0
```

The example contains sixteen array rows, but `% 10` limits the index to 0 through 9 in the loop. Four wires can represent sixteen combinations; one decimal digit uses ten of them. The other six are not automatically hexadecimal characters. [TI defines particular patterns for the LS47](https://www.ti.com/product/SN74LS47), whereas the [CD4511B blanks inputs above 9](https://www.ti.com/product/CD4511B). When comparing decoders, I would now check what happens outside the normal digit range as well.

## Active-Low Outputs

Inputs A through D select the number; outputs a through g correspond to the seven LED segments. With the usual segment labels, `7` lights the top segment a, upper-right b, and lower-right c. The project's SN54LS47 turns those segments on by taking their outputs low. Its [datasheet](/uploads/projects/arduino-digital-clock-counter/sn54ls47-datasheet.pdf#page=2) identifies active-low, open-collector outputs for common-anode displays. Following current through the circuit makes that low level easier to interpret.

In a common-anode display, the segment anodes share a connection to the positive supply. Selecting a segment turns on the corresponding output transistor inside the LS47. Current travels from the supply through that LED and its series resistor, into the driver, and back to ground. Lowering the output voltage forward-biases the LED, causing it to emit light. The relationship between a low output and a lit segment becomes straightforward once I follow that path.

I also want to look more closely at open-collector operation. When the output transistor turns off, the chip releases the path to ground. The output is then high impedance, with its voltage determined by the external circuit. It does not actively drive the pin up to the supply as a push-pull output would. A segment-off entry in the truth table, the voltage measured at the pin, and the ability to supply current are consequently different things to examine. This makes me pay more attention to why the datasheet calls the part both a decoder and a driver.

![Course diagram of decoder pins and individual segment resistors](/uploads/projects/arduino-digital-clock-counter/bcd-decoder-notes.png)

## Current in Each Segment

The course slide calls for one series resistor per segment output. I want to understand why a single resistor at the display's common pin would not do the same job. With a shared resistor, two LED branches divide the current when displaying `1`, and seven do so when displaying `8`. Changing the number of lit segments changes the current available to each, making brightness depend on the displayed digit. Individual branch resistors let each segment's current be limited separately.

For one segment, I would subtract both the LED's forward drop and the driver's on-state low voltage from the supply. Suppose the supply is 5 V, the LED forward drop near the intended current is 2.0 V, and the driver drop is taken as 0.3 V. A target of roughly 5 mA gives `(5 − 2.0 − 0.3) / 0.005 = 540 Ω`. Using a standard 560 Ω resistor gives about 4.8 mA under the same assumptions. This is an example of choosing a value; the calculation for particular parts needs their electrical parameters.

That gives me a useful way to examine the slide's 330 Ω value. Supply voltage, current, and LED forward voltage belong in the same calculation. Changing the LED while keeping 330 Ω need not preserve the current. When `8` lights all seven segments, their currents also add at the common connection and place a combined load on the supply and driver. I need to consider both each segment and the full digit operating together.

## Matching the Decoder and Display

The [CD4511B](https://www.ti.com/product/CD4511B) used in the course simulation makes the difference concrete. It supplies segment current for common-cathode LEDs. An active segment output goes high, sending current through the LED and its limiting resistor to the common cathode and ground. The two chips therefore require different common connections and active output levels for the same input digit. Both turn BCD into a seven-segment pattern, but the LED connections have to match the output structure.

I would also look beyond the four data inputs to the test and blanking pins. [The LS47 controls](https://www.ti.com/product/SN74LS47) include lamp test, blanking, and zero suppression, all of which affect what appears on the display. A correct value on A through D can still be hidden by those controls. For a single-digit check, I would first establish normal decoding conditions from the truth table, then hold the inputs at `1`, `7`, and `8` in turn. That sequence checks the two right-hand segments, adds the top segment, then exercises all seven.

Returning to `17`, I now think about the BCD code for each digit, the selected segments, and the current through each LED. A segment that never lights leads me along its individual branch; a whole digit that consistently shows the wrong number sends me first to input order and decoding conditions. The small display now connects to specific pins and currents. I have a much clearer starting point the next time I work with one.
