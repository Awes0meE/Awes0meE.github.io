# E2 R1 Up Edge Reprocessing Audit

Raw waveform: `08_Experiments\E2_sameRPM_waveform\E2Si\E2SiR1Up.csv`

Reason: the original threshold scan selected the first 10 percent crossing in `E2SiR1Up.csv`. Visual and numerical review shows two earlier pre-edge threshold crossings before the main rising edge. The corrected derived thesis table uses the last 10 percent crossing before the main 50 percent crossing.

Original Si R1 Up:
- t10 = -2447.269 ns
- t50 = -1860.797 ns
- t90 = -1853.817 ns
- 10-90 percent edge time = 593.451 ns
- dV/dt = 0.0195 V/ns

Reprocessed Si R1 Up:
- t10 = -1869.825 ns
- t50 = -1860.797 ns
- t90 = -1853.817 ns
- 10-90 percent edge time = 16.007 ns
- dV/dt = 0.7238 V/ns

Boundary: this is a correction to a derived edge-timing metric for thesis figures/tables. It does not alter the raw oscilloscope CSV and does not turn E2 into EMI, switching-loss, reliability or strict efficiency evidence.
