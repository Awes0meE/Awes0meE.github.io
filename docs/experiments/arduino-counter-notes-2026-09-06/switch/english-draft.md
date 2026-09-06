# Latching Switches and Counter Control

Pause and reset each need only one switch, yet they call for quite different handling in the program. Pausing keeps the counter in a state; resetting can be defined as clearing the number when a particular action occurs. Revisiting this two-digit counter, I want to understand how a switch's mechanical position relates to a pin voltage and, eventually, to a single program action.

## Switch Contacts

The course uses six-pin latching pushbuttons. Latching describes the mechanical action: one push leaves the switch in a position, and another changes it back. The connections among the six pins depend on the contact arrangement inside. Taking a finger off the button does not necessarily return the contacts to their original position. Pause makes this distinction easy to see. The user can let go while the counter stays paused.

To understand the contacts, I would first disconnect the switch from the surrounding circuit, number its pins from a fixed viewing direction, and record continuity in both stable positions. If one pin connects to a neighbour on one side in the first position and to another on the opposite side after switching, that measurement identifies a changeover contact group. A second group needs its own check. Recording the viewing direction with the numbers lets me translate the drawing back to the physical part. I would rather establish those connections before choosing which wire goes to the input and which goes to ground.

![Course slide showing six-pin latching switches, pull-up and pull-down circuits, and an input test sketch](/uploads/projects/arduino-digital-clock-counter/button-pullup-notes.png)

## The Default Input Level

After identifying the contacts, the circuit still needs to give an open contact a definite input level. In the course slide's pull-up example, a resistor connects the input node to VCC, and the switch connects that node to ground. Opening the contact lets the resistor pull the input high; closing it grounds the input, producing a low reading. Choosing a different contact pair can change how mechanical position maps to voltage. I need to interpret `HIGH` and `LOW` from the actual wiring.

The resistor has another role that is easy to miss. With the contact closed, current flows from the supply through the resistor and switch to ground. A 5 V supply and 10 kΩ resistor give about 0.5 mA. Replacing the resistor with a wire would directly short the supply when the switch closes. Looking at both positions explains its job more fully: establishing the level while open and limiting current while closed.

The [course test sketch](/uploads/projects/arduino-digital-clock-counter/digital-read-key.ino) uses `INPUT` and repeatedly prints the readings. [Arduino's `pinMode()` reference](https://github.com/arduino/reference-en/blob/master/Language/Functions/Digital%20IO/pinMode.adoc) distinguishes that mode from `INPUT_PULLUP`, which enables the internal pull-up. Following this sketch therefore also means providing the external pull-up or pull-down shown in the circuit. Configuring an input alone does not supply the missing default level.

## Stable States and Single Actions

Debouncing comes next. Mechanical contacts can briefly make and break several times during a transition, producing multiple changes from one operation. [Arduino's Debounce example](https://github.com/arduino/arduino-examples/blob/main/examples/02.Digital/Debounce/Debounce.ino) restarts a timer whenever the raw reading changes and accepts a new button state only after the reading has remained steady for an interval. That gives me two distinct values to follow. The raw input can change first; the state accepted by the program changes later.

Consider 20 ms as a stability interval for a worked example. The input goes low at 0 ms, returns high at 4 ms, and goes low again at 7 ms, staying there afterwards. Timing begins again at the final transition, so low is accepted at about 27 ms. The 20 ms value makes the sequence easy to follow; an actual interval needs to suit the switch and response requirements. Waiting for stability adds latency, and a longer interval delays acceptance of the action.

Even after debouncing, the loop will read the same stable state repeatedly. Incrementing or toggling something every time it reads low can still produce many actions from a switch left latched in position. A single action needs a comparison between the old and new stable states, triggering only on the chosen transition. [Arduino's state-change example](https://github.com/arduino/arduino-examples/blob/main/examples/02.Digital/StateChangeDetection/StateChangeDetection.ino) compares the current value with the previous one. I can now separate the two jobs: debouncing establishes the state, while change detection identifies the moment chosen to trigger an action.

For this counter, I would define the two controls explicitly. Pause follows the debounced switch state, stopping increments while latched in the pause position and continuing when switched back. Reset uses a selected transition, such as entering the active position, to clear the number once. Staying there does not repeatedly clear it. At startup, the program should also read and establish the initial state, so a switch already pressed is not mistaken for a new operation. Other interactions can use different rules; the code and the way the controls are used need to agree.

## Timing and Response

The counter's `delay(1000)` introduces another timing question. While the main loop waits for a second, the button polling that follows has to wait too. A brief press and return can fit entirely between two reads. A latching switch that remains in its new position will usually still be read on the next pass, although the response comes later. [Arduino's `delay()` documentation](https://github.com/arduino/reference-en/blob/master/Language/Functions/Time/delay.adoc) also distinguishes suspension of the main program from mechanisms such as interrupts that can continue. What matters for these buttons is how often the loop returns to read them.

I would treat one second as a condition between increments and let the loop keep checking the switches. On each pass, read `millis()`, process the inputs and state changes, and update the count only when a second has elapsed since the last counting reference. [Blink Without Delay](https://github.com/arduino/arduino-examples/blob/main/examples/02.Digital/BlinkWithoutDelay/BlinkWithoutDelay.ino) demonstrates this elapsed-time approach. Display updates and other work also need to stay brief so that debouncing and change detection receive input samples frequently enough.

Resuming from pause raises a small question worth answering before writing the code. If 700 ms of the second has elapsed when I pause, should resuming leave 300 ms or begin a fresh second? Both behaviours are possible, but they feel different to use. For a new version of this exercise, I would start a full second on resume and reset the timing reference when clearing the count. Preserving the elapsed 700 ms would instead require storing that partial interval. Defining the choice avoids an immediate extra increment caused by an old timing reference after resuming.

I would also give reset priority when it arrives in the same loop iteration as an increment becoming due, skipping that increment. Otherwise the program can write `0` and then immediately change it to `1`, making reset appear ineffective. This example makes me want to reason through input handling, state updates, and count updates together. Contact bounce and the order of program operations each deserve their own check when behaviour looks wrong.

Pause should hold the displayed number, reset should clear it, and either action should take effect promptly. Getting that behaviour depends on how the contacts are wired, how inputs are interpreted, and when the loop acts on them. A single movement of the switch feels simple in the hand. The program still has to deal carefully with the changes it produces.
