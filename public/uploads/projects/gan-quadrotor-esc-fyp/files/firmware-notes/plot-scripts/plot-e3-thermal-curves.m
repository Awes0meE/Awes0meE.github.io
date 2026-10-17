% Redraw E3 thermal curves with clean MATLAB layout.
%
% Reads the registered E3 thermal extraction CSV and exports:
%   - three separate R1/R2/R3 Si-vs-GaN thermal curve figures
%   - one combined three-panel figure for thesis use
%
% Raw thermal images and extraction CSV files are read-only inputs.

clear; clc;

scriptPath = mfilename('fullpath');
repoRoot = fileparts(fileparts(scriptPath));
dateTag = '2026-05-24';

figureDir = fullfile(repoRoot, 'figures', 'chapter5');
evidenceRoot = findEvidenceRoot(repoRoot);
experimentDir = fullfile(evidenceRoot, '08_Experiments', 'E3_sameRPM_thermal');
figuresEvidenceDir = fullfile(evidenceRoot, '09_Figures_for_Thesis', 'Chapter5_E3_Thermal');
outputDir = fullfile(experimentDir, ['redrawn_temperature_rise_curves_' dateTag]);

if ~exist(outputDir, 'dir')
    mkdir(outputDir);
end

sourceCsv = fullfile(experimentDir, 'E3_thermal_extraction_table.csv');
data = readtable(sourceCsv, 'TextType', 'string');
required = ["hotspot_temperature_C", "ambient_C", "time_point_s", "board_route"];
missing = setdiff(required, string(data.Properties.VariableNames));
if ~isempty(missing)
    error('Missing E3 CSV columns: %s', strjoin(missing, ', '));
end

parts = split(strtrim(data.board_route));
if size(parts, 2) ~= 2
    error('Unexpected board_route format in %s', sourceCsv);
end
data.board = parts(:, 1);
data.rpm_point = parts(:, 2);

siColor = [76, 145, 217] / 255;
ganColor = [234, 106, 74] / 255;
textColor = [24, 35, 43] / 255;
gridColor = [217, 224, 229] / 255;

rpmPoints = ["R1", "R2", "R3"];

for i = 1:numel(rpmPoints)
    rpmPoint = rpmPoints(i);
    fig = figure('Color', 'w', 'Units', 'centimeters', 'Position', [2, 2, 15.5, 9.2]);
    ax = axes(fig);
    hold(ax, 'on');
    plotThermalPair(ax, data, rpmPoint, siColor, ganColor);
    styleAxes(ax, sprintf('%s thermal curve', rpmPoint), true, true, textColor, gridColor, data, rpmPoint);
    legend(ax, {'Si', 'GaN'}, 'Location', 'southoutside', 'Orientation', 'horizontal', ...
        'Box', 'off', 'FontSize', 12, 'NumColumns', 2);
    ax.Position = [0.14, 0.28, 0.82, 0.58];
    exportFigure(fig, outputDir, sprintf('fig_e3_%s_thermal_curve', lower(rpmPoint)));
    close(fig);
end

fig = figure('Color', 'w', 'Units', 'centimeters', 'Position', [2, 2, 24.5, 8.6]);
t = tiledlayout(fig, 1, 3, 'TileSpacing', 'compact', 'Padding', 'compact');
firstAx = [];

for i = 1:numel(rpmPoints)
    rpmPoint = rpmPoints(i);
    ax = nexttile(t);
    if isempty(firstAx)
        firstAx = ax;
    end
    hold(ax, 'on');
    plotThermalPair(ax, data, rpmPoint, siColor, ganColor);
    styleAxes(ax, sprintf('%s thermal curve', rpmPoint), i == 1, false, textColor, gridColor, data, rpmPoint);
end

lgd = legend(firstAx, {'Si', 'GaN'}, 'Location', 'north', 'Orientation', 'horizontal', ...
    'Box', 'off', 'FontSize', 12, 'NumColumns', 2);
lgd.Layout.Tile = 'north';
xlabel(t, 'Time from heat-soak entry (s)', 'FontSize', 12, 'Color', textColor);

exportFigure(fig, figureDir, 'fig_e3_temperature_rise_curves');
exportFigure(fig, figuresEvidenceDir, 'fig_e3_temperature_rise_curves');
exportFigure(fig, outputDir, 'fig_e3_temperature_rise_curves');
close(fig);

writeReadme(outputDir, sourceCsv);

fprintf('Read: %s\n', sourceCsv);
fprintf('Wrote individual and combined figures: %s\n', outputDir);
fprintf('Updated thesis combined figure: %s\n', fullfile(figureDir, 'fig_e3_temperature_rise_curves.pdf'));
fprintf('Updated 09 figure export: %s\n', fullfile(figuresEvidenceDir, 'fig_e3_temperature_rise_curves.pdf'));

function evidenceRoot = findEvidenceRoot(repoRoot)
    candidates = {
        fullfile(repoRoot, 'FYP_Evidence')
        fullfile(fileparts(repoRoot), 'FYP_Evidence')
    };
    for k = 1:numel(candidates)
        candidate = candidates{k};
        if exist(fullfile(candidate, '08_Experiments', 'E3_sameRPM_thermal'), 'dir')
            evidenceRoot = candidate;
            return;
        end
    end
    error('Could not locate FYP_Evidence/08_Experiments/E3_sameRPM_thermal');
end

function plotThermalPair(ax, data, rpmPoint, siColor, ganColor)
    plotOne(ax, data, rpmPoint, "Si", siColor);
    plotOne(ax, data, rpmPoint, "GaN", ganColor);
end

function plotOne(ax, data, rpmPoint, board, color)
    mask = data.rpm_point == rpmPoint & data.board == board;
    subset = sortrows(data(mask, :), 'time_point_s');
    plot(ax, subset.time_point_s, subset.hotspot_temperature_C, '-o', ...
        'Color', color, 'MarkerFaceColor', color, 'MarkerEdgeColor', 'w', ...
        'LineWidth', 1.9, 'MarkerSize', 5.5);
end

function styleAxes(ax, titleText, showYLabel, showXLabel, textColor, gridColor, data, rpmPoint)
    title(ax, titleText, 'FontSize', 13, 'FontWeight', 'bold', 'Color', textColor);
    if showXLabel
        xlabel(ax, 'Time from heat-soak entry (s)', 'FontSize', 12, 'Color', textColor);
    end
    if showYLabel
        ylabel(ax, 'Surface temperature ({\circ}C)', 'FontSize', 12, 'Color', textColor);
    end

    ax.FontName = 'Times New Roman';
    ax.FontSize = 11;
    ax.LineWidth = 1.0;
    ax.Box = 'on';
    ax.XColor = [83, 103, 117] / 255;
    ax.YColor = [83, 103, 117] / 255;
    ax.GridColor = gridColor;
    ax.GridAlpha = 1.0;
    grid(ax, 'on');
    ax.XGrid = 'off';
    ax.YGrid = 'on';

    xlim(ax, [-10, 610]);
    xticks(ax, [0, 60, 120, 300, 600]);

    temps = data.hotspot_temperature_C(data.rpm_point == rpmPoint);
    low = min(temps);
    high = max(temps);
    pad = max(0.8, (high - low) * 0.18);
    ylim(ax, [max(24, low - pad), high + pad]);
end

function exportFigure(fig, destination, basename)
    if ~exist(destination, 'dir')
        mkdir(destination);
    end
    exportgraphics(fig, fullfile(destination, [basename '.png']), 'Resolution', 300);
    exportgraphics(fig, fullfile(destination, [basename '.pdf']), 'ContentType', 'vector');
end

function writeReadme(outputDir, sourceCsv)
    [parentDir, ~, ~] = fileparts(outputDir);
    relCsv = erase(sourceCsv, [parentDir filesep]);
    relCsv = strrep(relCsv, filesep, '/');
    text = sprintf([ ...
        '# E3 MATLAB-redrawn thermal curve figures\n\n' ...
        'Date generated: 2026-05-24\n\n' ...
        'These figures redraw the E3 Si/GaN thermal curves from the registered extraction CSV using MATLAB. ' ...
        'They replace the earlier crowded combined export whose top-left title/axis text overlapped.\n\n' ...
        'Source data:\n\n' ...
        '- `%s`\n' ...
        '- `../E3_camera_settings.txt`\n' ...
        '- `../E3_test_timeline.txt`\n\n' ...
        'Generated files:\n\n' ...
        '- `fig_e3_r1_thermal_curve.png` / `.pdf`\n' ...
        '- `fig_e3_r2_thermal_curve.png` / `.pdf`\n' ...
        '- `fig_e3_r3_thermal_curve.png` / `.pdf`\n' ...
        '- `fig_e3_temperature_rise_curves.png` / `.pdf`\n\n' ...
        'Processing notes:\n\n' ...
        '- Raw thermal-image folders and the extraction CSV were not edited.\n' ...
        '- The y-axis shows the camera/app centre surface temperature in degrees Celsius, matching `hotspot_temperature_C`.\n' ...
        '- The 30 s measurement point is plotted but not labelled as an x-axis tick, which avoids crowding between 0, 30 and 60 s.\n' ...
        '- The readout should still be described as V-phase MOSFET-centred surface temperature evidence, not junction temperature or full-board hotspot proof.\n'], relCsv);
    fid = fopen(fullfile(outputDir, 'README_redrawn_thermal_curves.md'), 'w', 'n', 'UTF-8');
    if fid < 0
        error('Could not write README in %s', outputDir);
    end
    cleanup = onCleanup(@() fclose(fid));
    fwrite(fid, text, 'char');
end
