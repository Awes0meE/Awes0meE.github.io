# Arduino Car Power and Wheel-Speed Measurement

The battery, motors, and controller all connect to the same PCB on this Arduino car. Looking at the circuit again, I want to follow what changes when the battery voltage changes. Tracing power out to the wheels, then following the speed signals back into the program, gives me a more concrete view of how the supply and control work together.

## Battery and Logic Supply

In the [kit schematic](/uploads/projects/arduino-smart-car-line-tracker/smart-car-manual-teas1-en.pdf#page=46), the positive battery connection splits after the switch. One path goes straight to the L293D motor supply, labelled `VC`. The other feeds an L7805CV, whose `5V` output supplies the Nano board and the driver's logic. Both paths share ground. The controller's logic levels select a drive state, while the battery-to-driver path carries the main motor current.

![Motor-driver and power-supply schematic](/uploads/projects/arduino-smart-car-line-tracker/manual-motor-driver-power-schematic.png)

That makes a 9 V battery and a controller operating at 5 V quite compatible along this supply path. Regulation happens before power reaches the controller. To work out what voltage a particular chip receives, I need to find its supply pin and trace the connection back. The battery's nominal voltage and the chip's supply voltage belong at different points in that trace.

The L7805CV needs some voltage headroom to maintain its 5 V output. [ST specifies a typical dropout of 2 V](https://www.st.com/resource/en/datasheet/l78.pdf#page=13) at 1 A output and a junction temperature of 25 °C. A 6 V input therefore calls for more thought than subtracting 5 V and declaring the remaining volt sufficient. Load and battery sag matter too. Starting from 3 V would require a supply arrangement that can boost the voltage. A motor turning after power is connected and every supply in the car meeting its requirements are separate things to check.

Raising the input voltage introduces a different practical concern. Ignoring the regulator's own quiescent current for a first estimate, its dissipation is `P ≈ (Vin − 5 V) × I5V`. Suppose the 5 V branch draws 100 mA: a 9 V input gives about 0.4 W of heat, rising to 0.7 W at 12 V. The current in that calculation passes through the regulator; the motor branch needs a separate calculation. I find this distinction useful. A higher battery voltage brings a thermal question on the controller side and changes the drive conditions on the motor side.

## L293D and PWM

The L293D contains four half bridges, paired so that each pair connects to the two terminals of one motor. Applying a voltage difference drives current through the winding; exchanging the high and low states reverses the drive direction. H-bridge describes the arrangement. [TI identifies the L293D output stage](https://www.ti.com/product/L293D) as a Darlington sink and a pseudo-Darlington source. I can follow the same current paths when studying a MOSFET motor bridge, but its conduction losses need to be calculated for that device structure.

At low supply voltages, those losses are substantial. The [L293D electrical characteristics](https://www.ti.com/lit/ds/symlink/l293.pdf#page=5) give typical high-side and low-side drops of about 1.4 V and 1.2 V at 0.6 A. A conducting path through the motor includes both, adding up to roughly 2.6 V. Using those conditions in a 6 V supply example leaves about 3.4 V across the motor during the drive interval. Current and temperature affect the drops. This calculation helps me understand the loss; choosing a motor and driver also requires their respective voltage and current ratings.

In `motor_set_PWM(128, 128)`, 128 is a drive command. [Arduino's PWM documentation](https://support.arduino.cc/hc/en-us/articles/9350537961500-Use-PWM-output-with-Arduino) describes the default 8-bit range of 0 to 255, with 128 giving approximately half duty. On this board, resistors pull both enable inputs high, and PWM is applied to the bridge inputs. During one part of the cycle the motor receives a driving voltage; during the other, both terminals are driven to the same potential for braking. Winding current continues to change through the available recirculation paths. A fraction of time spent driving is a better way to read the command than assigning 128 a particular wheel speed.

There is an easy detail to miss in the [motor library](/uploads/projects/arduino-smart-car-line-tracker/testing-code/without-led/test-6-speed/motor.cpp). The two sides use opposite drive polarities. For positive commands, the fixed left input is low and the fixed right input is high, so the right PWM uses `255 - right`. At this point I would lay out the voltage at each motor terminal over a PWM cycle before interpreting the drive. Looking at only one pin's duty cycle makes it easy to read the right wheel's command backwards.

Rotation also generates back EMF in the motor. [Microchip's brushed DC motor explanation](https://ww1.microchip.com/downloads/en/appnotes/00905b.pdf) connects speed with back EMF in a permanent-magnet motor, and winding current with torque. A greater load calls for more current to produce torque; at the same supply voltage, speed can fall. When a motor runs at several different voltages, I therefore want to compare speed, load, and heating at each operating point.

Battery voltage, bridge losses, PWM, and mechanical load all affect wheel motion. Giving both sides the same command does not automatically compensate for differences between the motors or their mechanical resistance. To find out how fast a wheel actually turns, I need to follow the small sensor beside it.

## Optical Wheel Encoding

The speed circuit uses an ITR8307. Its infrared emitter and phototransistor sit together to detect light reflected from a target, as described in [Everlight's component overview](https://everlightamericas.com/reflective-type/234-itr8307.html). Repeating marks on the kit's wheels vary that reflection, converting rotation into a periodic electrical signal. Each wheel has one sensor channel of its own.

![Tracking and wheel-speed sensor circuits, with the ITR8307 speed circuit below](/uploads/projects/arduino-smart-car-line-tracker/manual-ir-sensor-schematic.png)

In the lower circuit, R3 limits emitter current, while R4 and the adjustable RT form the receiver's pull-up path. Stronger reflected light increases phototransistor collector current and pulls the output voltage down. As the reflection weakens, the pull-up brings it high again. The main schematic labels the speed-sensor supply `3V3`. The controller recognises high and low states at its input thresholds; adjusting the resistance changes how much voltage variation results from a change in light. Sensor distance and surface reflection consequently affect how clearly the pulses can be detected.

The [wheel drawing in the manual](/uploads/projects/arduino-smart-car-line-tracker/smart-car-manual-teas1-en.pdf#page=9) has twelve repeating groups around one revolution. Each group contains a light and a dark region, producing one rising and one falling transition as it passes the sensor. The course code selects `RISING`, so ideally one revolution produces twelve counts. Counting both edges would give twenty-four and require a corresponding change in conversion. One channel per wheel indicates how quickly it turns; identifying direction from the sensor alone would require additional information that distinguishes forward from reverse.

## Pulses and RPM

The speed signals connect directly to D2 and D3 on the Nano. The course code registers `attachInterrupt(0, left_tri, RISING)` and its counterpart using the interrupt numbers for this ATmega328-based board. [Arduino's interrupt reference](https://github.com/arduino/reference-en/blob/master/Language/Functions/External%20Interrupts/attachInterrupt.adoc) provides the pin mapping and trigger modes. Each rising edge increments a pulse count, and `millis()` supplies the elapsed time since the preceding rising edge.

The expression `5 * 1000 / float(left_interval)` makes me want to account for that 5. Twelve pulses per revolution supplies the missing connection. If consecutive rising edges are `Δt_ms` apart, the pulse rate is `1000 / Δt_ms` per second. Dividing by twelve gives revolutions per second; multiplying by sixty converts it to revolutions per minute.

```text
RPM = (1000 / Δt_ms) × (60 / 12)
    = 5000 / Δt_ms
```

So the 5 comes from `60 ÷ 12`. A 20 ms interval between rising edges gives 250 rpm in this model. It also explains why changing the interrupt mode requires care: count both edges while retaining the old coefficient, and the calculated speed doubles. The number of repeating marks around a physical wheel ends up inside one small constant in the program.

I also want to know how this behaves when the wheel turns slowly. Counting pulses over a fixed window is another option, but twelve pulses per revolution is fairly coarse. In a 100 ms window, one count represents 50 rpm; extending the window to 500 ms brings that increment down to 10 rpm, at the cost of a longer wait. Measuring the interval avoids having too few counts in a short window, though updates arrive farther apart as the wheel slows. Once it stops, no new edge arrives, so the program needs elapsed time to clear an old speed value. The first edge should also establish the time reference, leaving subsequent edges to produce a speed estimate.

## Feeding Speed Back

Returning to the course library, I can now read the two motor interfaces more clearly. `motor_set_PWM()` sets the drive directly. In the branch of `motor_step()` that requests speed without a travel count, the library compares the target with the calculated wheel speed and adjusts PWM up or down by one count per update. This is where pulse timing enters the control action. It gives a concrete example of feedback adjustment and a reason to check parameter units before choosing values for a function call.

For further work on this car, I would view target rpm, measured rpm, and applied PWM together for both wheels, alongside battery voltage under load. A slow wheel would then lead to more specific questions: has the drive already reached its limit, or is the speed reading taking too long to update? This is where the supply and sensing come together for me. When I read a motor-control function now, I follow it in both directions, toward the current through the motor and toward the wheel's actual motion returning to the program.
