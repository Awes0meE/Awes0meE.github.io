# PWM Fan Control and Speed Feedback

The cooler's OLED labels a percentage as `Fan Speed`. Following the [display function](/uploads/projects/juanyun-public/diy-cooling/esp32-platformio-main.cpp), I find that it reads `dutyCycle`, the PWM duty sent to the fan. That label gives me a useful question to pursue. How does a duty setting act on a fan, and where would I get a reading of how fast the fan actually turns?

## Fan Interface Wiring

On this version of the [ESP32 controller schematic](/uploads/projects/juanyun-public/diy-cooling/pcb-schematic.pdf), D5 connects to the `PWM` net. The fan outputs use three signals, `12V+`, `12V−`, and `PWM`. The two four-pin connectors also carry only those three signals, leaving one pin unconnected on each. Following the nets tells me more directly where power and control go than counting the connector pins does.

![Fan power and PWM connections on the ESP32 controller schematic](/uploads/projects/juanyun-public/diy-cooling/esp32-schematic.png)

Studying four-wire PWM fans brought their internal drive electronics into the picture for me. The four connections provide power, ground, a PWM input, and a tachometer output. The supply wires deliver the motor's energy, the controller sends a command through the PWM input, and circuitry inside the fan drives the motor. [Analog Devices' explanation of fan control](https://www.analog.com/en/resources/analog-dialogue/articles/how-to-control-fan-speed.html) also describes why a dedicated PWM input matters. It lets the fan electronics remain powered; repeatedly switching the entire fan supply can interrupt the tachometer output along with it.

I can now consider the two wiring jobs separately. The 12 V supply provides energy for the motor, while the GPIO provides a logic signal. That signal needs a compatible voltage level and ground reference at the fan interface. The motor supply voltage does not define the PWM pin's logic level. I would map each connector pin against the schematic and the fan's pin definitions; a four-pin housing alone leaves those connections unspecified.

## Frequency, Duty, and Speed

The program initially configures PWM at 15 kHz with 8-bit resolution. A cycle at that frequency lasts about 66.7 μs. An ideal 50% duty keeps the signal high for about 33.3 μs of each cycle. The code maps percentages to integers from 0 to 255, so 50 becomes 127, producing approximately half duty. All of these quantities describe the pin waveform. None yet tells me how many revolutions the blades make per minute.

The main loop also does not have to toggle the pin for every 15 kHz pulse. As the [ESP32 LEDC documentation](https://docs.espressif.com/projects/esp-idf/en/v4.4.8/esp32/api-reference/peripherals/ledc.html) explains, a configured channel generates PWM at the selected frequency and duty. The program can wait before writing a new duty while the peripheral continues producing the previous waveform. How often temperature processing changes a setting and how long one PWM cycle lasts are two different time scales.

For the frequency itself, I would start with the particular fan's interface requirements. [Noctua's microcontroller guide](https://www.noctua.at/en/support/faqs/microcontroller-guide-pwm-setup-and-rpm-monitoring), for example, specifies a 25 kHz target and an accepted range of 21 to 28 kHz for its fans. It is a useful manufacturer example of what to check. The original program lets buttons change frequency in 200 Hz steps. Those steps change how often the waveform repeats; a proportional increase in fan speed does not follow from increasing that number.

## Receiving a Speed Signal

An actual speed reading has to travel back from the fan. [Noctua's PWM white paper](https://cdn.noctua.at/media/Noctua_PWM_specifications_white_paper.pdf) describes an open-collector tachometer output producing two pulses per revolution on its fans. The internal output transistor pulls the signal low when it conducts. When it switches off, an external pull-up resistor brings the line high. A controller connected to that node can count the pulses produced as the fan rotates.

I would choose the pull-up supply for the controller's logic voltage and give the tachometer output and controller a common ground reference. For a worked example, a 10 kΩ resistor to 3.3 V gives approximately 0.33 mA while the output is low. That calculation helps check the current, but resistor selection also depends on the allowed sink current and the signal's rise time. A larger resistance charges the line capacitance more slowly. Inspecting the levels and edges at the controller input would establish whether the signal can be read reliably.

Once the pulse count per revolution is known, the conversion is short. At two pulses per revolution, a 100 Hz tachometer signal represents 50 revolutions per second, or 3000 rpm. I explored pulse timing in the [car power and speed-feedback note](/notes/arduino-smart-car-line-tracking-learning-note); the same counting idea applies here. I need the fan's own pulses-per-revolution value and must keep the tachometer frequency separate from the 15 kHz control waveform.

Two fans introduce another wiring question. Both fan outputs in the schematic share `PWM`, so they receive the same control waveform. Reading each fan's speed would require separate tachometer inputs. Reasoning from the open-collector circuit, joining both outputs would let either one pull the shared node low. Overlapping pulses would no longer identify which fan produced them. Sharing a command is convenient, while observing each fan individually requires its own feedback.

## Duty and Actual Response

With a speed reading available, I could compare duty and rotation directly. I would hold supply voltage and PWM frequency constant, step through duty settings, and record speed after it settles to build a response curve for that fan. Low duty deserves a closer check. Starting from rest and reducing duty on a fan that is already turning can be recorded separately, so the curve also captures the starting and low-speed behaviour that matter in use.

The current program displays duty after `Fan Speed` and does not read a tachometer input. I would label that percentage `PWM` and add a separate `RPM` reading when speed sensing is connected. One shows the setting I sent; the other shows the fan's response. Both would be visible while adjusting the cooler, with each fan's operation available to check individually.
