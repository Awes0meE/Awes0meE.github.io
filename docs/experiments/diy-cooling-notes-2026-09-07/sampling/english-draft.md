# Temperature Sampling and Fan Response

To understand a change in this cooler's output, I want to follow the temperature reading that led to it. My desktop program sends the ESP32 short messages such as `CPU62.7`. The number travels easily enough, but explaining the response calls for more detail: where the reading came from, when it was obtained, and what happened to it along the way.

## Sensor Selection

In the [desktop source](/uploads/projects/juanyun-public/diy-cooling/desktop-form1.cs), LibreHardwareMonitor is used to walk through the hardware and its sensors. Each matching CPU temperature overwrites `cpuTemperature`, with the same approach used for GPU readings. When several temperature entries match during a pass, later assignments replace earlier ones. The name CPU temperature sounds specific, yet the value left in that field depends on which matching entry the traversal reaches last.

That affects how I interpret a temperature change. To follow `CPU Package`, for example, I would select that entry explicitly and keep observing it. LibreHardwareMonitor exposes `Name` and `Identifier` through its [`ISensor` interface](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/blob/master/LibreHardwareMonitorLib/Hardware/ISensor.cs), giving me a way to identify sensors and define a consistent selection rule. One decimal place makes the number convenient to display. A consistent source makes successive readings useful to compare.

## Reading and Sending

Even with a sensor selected, a new reading still has to be ready for transmission. The desktop timer is set to five seconds. Within one callback, however, it starts monitoring and sending through separate `Task.Run` calls. Monitoring appears first in the source, but there is no dependency making transmission wait for it to finish. [Microsoft's task programming guide](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming) covers scheduling and the use of waits or continuations to establish dependencies. As written, the sender can pick up a temperature left in the field by a previous pass.

A hypothetical sequence makes the ordering easier to follow. Start with 60°C in the field. At 5.000 seconds, the program submits both tasks; at 5.002, the sender takes 60°C; only at 5.080 does monitoring write a new value of 72°C. The transmitted value is still 60°C. Those millisecond offsets are chosen for the example. What matters is the missing wait for the current read to complete. Shortening the timer interval would leave that dependency unresolved.

CPU and GPU also take turns using the sending opportunity. At the intended cadence, one type is sent every five seconds, so each type gets a turn roughly every ten seconds. A timer tick, completion of a sensor read, and transmission of its value are therefore separate events. I would have a read return a definite sample and pass that sample to the sender. That avoids looking up a shared field again at send time while another task may be changing it.

## The Peak Window

The [ESP32 program](/uploads/projects/juanyun-public/diy-cooling/esp32-platformio-main.cpp) handles an arriving message in two ways. It stores the most recently received readings in `cpuValue` and `gpuValue` for the OLED. It updates `maxCpuValue` and `maxGpuValue` only when a higher reading arrives. About every 30 seconds, the periodic control path saves the larger of those peaks in `maxValue` and calculates duty according to the current mode. A lower new reading can reach the screen immediately while an earlier high reading remains available for the next output calculation.

Consider an automatic mode with periodic updates only and no button activity. A window begins at zero seconds. A CPU reading of 80°C arrives at five seconds, followed by 60°C at both 15 and 25 seconds, while the GPU stays below that CPU peak. At 30 seconds, the output calculation still uses 80°C. The retained peaks are then cleared, and the output setting stays in place until the next update. The screen could thus show 60°C from 15 seconds onwards, even as the program starts applying the earlier 80°C at 30 seconds. The software has arranged a wait between a falling reading and a falling output.

The two assignments clearing the peaks in `updatePWM()` caught my attention. This excerpt includes the output calculation and peak reset.

```cpp
dutyCycle =processBluetoothValue(maxValue);
ledcWrite(ledChannel, map(dutyCycle, 0, 100, 0, 255));
maxCpuValue = 0.0;
maxGpuValue = 0.0;
```

Setting PWM and clearing the temperature peaks happen inside the same function. Following its callers, I found that the button handler calls it as well as the 30-second update path. Changing mode or adjusting frequency therefore clears the accumulated peaks too. The button path still uses the previously saved `maxValue`, without first selecting the new peaks being accumulated, and it leaves `lastUpdateTime` unchanged.

That allows another variation on the timeline. Suppose a frequency-button event is handled at 25 seconds. The retained 80°C is cleared, but the periodic update still arrives at 30 seconds. Its calculation now draws on the short stretch of data received after the button reset. This makes the relationship between functions much more interesting to me. Reading `30000` alone suggests a fixed 30-second collection window. Following every reset explains how an operation can change what remains inside it.

## Timing Each Sample

To reorganize this code, I would separate writing PWM from closing out a temperature window. A button could change the output setting, with an explicit rule deciding whether temperature collection starts again. A fixed-period policy could retain the accumulated peaks through a button event. A policy that restarts collection on a mode change could clear the peaks and reset the timing origin together. Either is straightforward to describe; combining the operations in one function makes the choice easier to overlook.

I would also keep a little more information with each desktop sample: its sensor identifier, value, read-completion time, and message sequence number. On the ESP32, I could record when the message arrived and when its sample was used. Read completion describes when the program obtained the value; the sensor may have an update cycle of its own. A computer timestamp and ESP32 `millis()` also cannot be subtracted directly. Matching a message by sequence number and examining the waits on each device separately would give me a clearer account than subtracting timestamps from different clocks.

A lower temperature with an unchanged fan output would then be something I could trace through the program. I could identify the sensor first, follow the message's departure and arrival, and check which peak entered the calculation. The records should locate those seconds of waiting between tasks, between sending turns, or within peak retention. Once I understand where that time is spent, I have a reason for choosing which part to speed up.
