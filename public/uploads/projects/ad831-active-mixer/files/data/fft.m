clc; close; clear;
clc; close; clear;
% Read CSV file
data = readtable('NewFile0.csv', 'HeaderLines', 1, 'VariableNamingRule', 'preserve');

% Extract time and voltage data
time = data{:,1};  % Time in seconds
voltage = data{:,2};  % Voltage in volts

% Remove header rows if any non-numeric values exist
time = time(~isnan(time));
voltage = voltage(~isnan(voltage));

% Display basic information about the data
fprintf('=== WAVEFORM DATA ANALYSIS ===\n');
fprintf('Total data points: %d\n', length(time));
fprintf('Time range: %.2e to %.2e seconds\n', min(time), max(time));
fprintf('Total duration: %.2e seconds\n', max(time) - min(time));
fprintf('Voltage range: %.3f to %.3f volts\n', min(voltage), max(voltage));
fprintf('\n');

% Extract 600ns segment (0.6 microseconds)
segment_duration = 600e-9; % 600 nanoseconds

% Find a good segment in the middle of the data
start_idx = round(length(time) * 0.4);
end_idx = start_idx + round(segment_duration / (time(2) - time(1)));

% Ensure we don't exceed array bounds
if end_idx > length(time)
    end_idx = length(time);
    start_idx = end_idx - round(segment_duration / (time(2) - time(1)));
end

time_segment = time(start_idx:end_idx);
voltage_segment = voltage(start_idx:end_idx);

% FFT Analysis for frequency spectrum
Fs = 1 / (time(2) - time(1)); % Sampling frequency
N = length(voltage);

% Remove DC component for better frequency analysis
voltage_ac = voltage - mean(voltage);

% Perform FFT
Y = fft(voltage_ac);
P2 = abs(Y/N);
P1 = P2(1:floor(N/2)+1);
P1(2:end-1) = 2*P1(2:end-1);

% Convert to dB
P1_dB = 20*log10(P1);

% Frequency vector
f = Fs * (0:(N/2)) / N;

% FIGURE 2: Frequency Spectrum (dB scale)
figure('Position', [200, 200, 1000, 600]);
plot(f/1e6, P1_dB, 'r-', 'LineWidth', 1.5);
hold on;

% Mark 10.7 MHz
freq_mark = 10.7;
[~, idx_10p7] = min(abs(f/1e6 - freq_mark));
plot(freq_mark, P1_dB(idx_10p7), 'ro', 'MarkerSize', 10, 'LineWidth', 2, 'MarkerFaceColor', 'red');
text(freq_mark, P1_dB(idx_10p7)+2, sprintf('10.7 MHz\n%.1f dB', P1_dB(idx_10p7)), ...
     'HorizontalAlignment', 'left', 'FontWeight', 'bold');

xlabel('Frequency (MHz)');
ylabel('Magnitude (dB)');
title('Frequency Spectrum (dB Scale)');
grid on;
% Change x-axis to start from 1MHz instead of 0MHz
xlim([1, min(150, max(f/1e6))]); % Show from 1 MHz to 150 MHz
legend('Spectrum', '10.7 MHz', 'Location', 'best');

% Find dominant frequencies
[peaks, locs] = findpeaks(P1_dB, 'SortStr', 'descend', 'NPeaks', 5);
dominant_freqs = f(locs(1:min(5, length(locs))));

fprintf('\nDominant frequencies:\n');
for i = 1:min(5, length(dominant_freqs))
    fprintf('  %d. %.2f MHz (Magnitude: %.1f dB)\n', i, dominant_freqs(i)/1e6, peaks(i));
end
fprintf('\n');
