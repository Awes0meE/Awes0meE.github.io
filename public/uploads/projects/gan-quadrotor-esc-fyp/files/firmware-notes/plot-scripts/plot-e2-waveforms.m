%% plot_e2_waveforms.m
% Redraw clean thesis figures from the E2 oscilloscope CSV exports.
%
% Inputs:
%   FYP_Evidence/08_Experiments/E2_sameRPM_waveform/E2Si/*.csv
%   FYP_Evidence/08_Experiments/E2_sameRPM_waveform/E2GaN/*.csv
%
% Main outputs:
%   figures/chapter5/fig_e2_whole_waveform_matrix.png
%   figures/chapter5/fig_e2_whole_waveform_matrix.pdf
%   figures/chapter5/fig_e2_switching_detail_r3.png
%   figures/chapter5/fig_e2_switching_detail_r3.pdf
%
% Local review outputs:
%   figures/chapter5/e2_redrawn_clean_plots/*.png
%
% The script intentionally redraws from CSV points only; it does not use
% oscilloscope screenshot PNGs or modify the original evidence files.

clear;
clc;
close all;

%% User options
exportDpi = 450;
makeIndividualPlots = true;
showFigures = false;

fontName = 'Times New Roman';
axisFontSize = 8.5;
titleFontSize = 9.5;
lineWidthWhole = 0.80;
lineWidthDetail = 1.05;

boards = {'Si', 'GaN'};
boardLabels = {'Si', 'GaN'};
rpmTags = {'R1', 'R2', 'R3'};
rpmValues = [3000, 6500, 10000];
windows = {'Whole', 'Up', 'Down'};

siColor = [0.000, 0.329, 0.620];
ganColor = [0.800, 0.255, 0.145];
gridColor = [0.82, 0.82, 0.82];
zeroColor = [0.35, 0.35, 0.35];

%% Locate repository and evidence folders
scriptPath = mfilename('fullpath');
if isempty(scriptPath)
    repoRoot = pwd;
else
    repoRoot = fileparts(fileparts(scriptPath));
end

e2Root = resolveE2Root(repoRoot);
figureDir = fullfile(repoRoot, 'figures', 'chapter5');
individualDir = fullfile(figureDir, 'e2_redrawn_clean_plots');

if ~isfolder(figureDir)
    mkdir(figureDir);
end
if makeIndividualPlots && ~isfolder(individualDir)
    mkdir(individualDir);
end

if showFigures
    visibleMode = 'on';
else
    visibleMode = 'off';
end

fprintf('E2 CSV root: %s\n', e2Root);
fprintf('Thesis figure output: %s\n', figureDir);

%% Load all waveforms once
waveforms = struct();
groupX = struct('Whole', [], 'Up', [], 'Down', []);
groupY = struct('Whole', [], 'Up', [], 'Down', []);

for b = 1:numel(boards)
    board = boards{b};
    for r = 1:numel(rpmTags)
        rpmTag = rpmTags{r};
        for w = 1:numel(windows)
            windowName = windows{w};
            csvPath = waveformPath(e2Root, board, rpmTag, windowName);
            assert(isfile(csvPath), 'Missing CSV file: %s', csvPath);

            [timeSec, voltageV] = readWaveformCsv(csvPath);
            key = waveformKey(board, rpmTag, windowName);
            waveforms.(key).timeSec = timeSec;
            waveforms.(key).voltageV = voltageV;
            waveforms.(key).csvPath = csvPath;

            if strcmp(windowName, 'Whole')
                waveforms.(key).plotX = timeSec * 1e3;
                waveforms.(key).xLabel = 'Time (ms)';
            else
                [alignedNs, centerTimeSec] = alignToMainCrossing(timeSec, voltageV, windowName);
                waveforms.(key).plotX = alignedNs;
                waveforms.(key).xLabel = 'Time from 50% crossing (ns)';
                waveforms.(key).centerTimeSec = centerTimeSec;
            end

            groupX.(windowName) = [groupX.(windowName); waveforms.(key).plotX(:)]; %#ok<AGROW>
            groupY.(windowName) = [groupY.(windowName); voltageV(:)]; %#ok<AGROW>
        end
    end
end

plotLimits = struct();
for w = 1:numel(windows)
    windowName = windows{w};
    plotLimits.([windowName 'X']) = paddedLimits(groupX.(windowName), 0.02);
    plotLimits.([windowName 'Y']) = paddedLimits(groupY.(windowName), 0.08);
end
plotLimits.WholeY(1) = min(plotLimits.WholeY(1), -3);
plotLimits.WholeY(2) = max(plotLimits.WholeY(2), 23);
plotLimits.UpY(1) = min(plotLimits.UpY(1), -4);
plotLimits.UpY(2) = max(plotLimits.UpY(2), 29);
plotLimits.DownY(1) = min(plotLimits.DownY(1), -5);
plotLimits.DownY(2) = max(plotLimits.DownY(2), 16);

%% Figure 1: Whole-window matrix
wholeFig = figure( ...
    'Name', 'E2 whole waveform matrix', ...
    'Color', 'w', ...
    'Visible', visibleMode, ...
    'Units', 'centimeters', ...
    'Position', [2, 2, 18, 10.2]);

wholeTiles = tiledlayout(wholeFig, 2, 3, ...
    'TileSpacing', 'compact', ...
    'Padding', 'loose');

for b = 1:numel(boards)
    board = boards{b};
    boardColor = boardPlotColor(board, siColor, ganColor);
    for r = 1:numel(rpmTags)
        rpmTag = rpmTags{r};
        key = waveformKey(board, rpmTag, 'Whole');
        tMs = waveforms.(key).plotX;
        v = waveforms.(key).voltageV;

        ax = nexttile(wholeTiles);
        plot(ax, tMs, v, ...
            'Color', boardColor, ...
            'LineWidth', lineWidthWhole);
        hold(ax, 'on');
        xline(ax, 0, ':', 'Color', zeroColor, 'LineWidth', 0.7);
        yline(ax, 0, ':', 'Color', zeroColor, 'LineWidth', 0.6);
        hold(ax, 'off');

        grid(ax, 'on');
        box(ax, 'on');
        ax.GridColor = gridColor;
        ax.GridAlpha = 0.55;
        ax.FontName = fontName;
        ax.FontSize = axisFontSize;
        ax.LineWidth = 0.8;

        xlim(ax, plotLimits.WholeX);
        ylim(ax, plotLimits.WholeY);
        title(ax, sprintf('%s %s whole (%d rpm)', ...
            boardLabels{b}, rpmTag, rpmValues(r)), ...
            'FontName', fontName, ...
            'FontSize', titleFontSize, ...
            'FontWeight', 'bold');

        if r == 1
            ylabel(ax, 'Phase-node voltage (V)', ...
                'FontName', fontName, ...
                'FontSize', axisFontSize);
        end
        if b == numel(boards)
            xlabel(ax, 'Time (ms)', ...
                'FontName', fontName, ...
                'FontSize', axisFontSize);
        end
    end
end

wholeBase = fullfile(figureDir, 'fig_e2_whole_waveform_matrix');
exportFigurePair(wholeFig, wholeBase, exportDpi);
fprintf('Wrote %s.[png,pdf]\n', wholeBase);

%% Figure 2: R3 switching detail, aligned to 50 percent crossing
detailData = struct();

for b = 1:numel(boards)
    board = boards{b};
    for w = 1:2
        windowName = windows{w + 1}; % Up, Down
        key = waveformKey(board, 'R3', windowName);
        detailKey = waveformKey(board, 'R3', windowName);
        detailData.(detailKey).timeNs = waveforms.(key).plotX;
        detailData.(detailKey).voltageV = waveforms.(key).voltageV;
        detailData.(detailKey).centerTimeSec = waveforms.(key).centerTimeSec;
    end
end

detailFig = figure( ...
    'Name', 'E2 R3 switching detail', ...
    'Color', 'w', ...
    'Visible', visibleMode, ...
    'Units', 'centimeters', ...
    'Position', [2, 2, 16, 10.5]);

detailTiles = tiledlayout(detailFig, 2, 2, ...
    'TileSpacing', 'compact', ...
    'Padding', 'loose');

edgeWindows = {'Up', 'Down'};
edgeLabels = {'rising edge', 'falling edge'};
for w = 1:numel(edgeWindows)
    windowName = edgeWindows{w};
    for b = 1:numel(boards)
        board = boards{b};
        boardColor = boardPlotColor(board, siColor, ganColor);
        detailKey = waveformKey(board, 'R3', windowName);
        tNs = detailData.(detailKey).timeNs;
        v = detailData.(detailKey).voltageV;

        ax = nexttile(detailTiles);
        plot(ax, tNs, v, ...
            'Color', boardColor, ...
            'LineWidth', lineWidthDetail);
        hold(ax, 'on');
        xline(ax, 0, ':', 'Color', zeroColor, 'LineWidth', 0.8);
        yline(ax, 0, ':', 'Color', zeroColor, 'LineWidth', 0.6);
        hold(ax, 'off');

        grid(ax, 'on');
        box(ax, 'on');
        ax.GridColor = gridColor;
        ax.GridAlpha = 0.55;
        ax.FontName = fontName;
        ax.FontSize = axisFontSize;
        ax.LineWidth = 0.8;

        if strcmp(windowName, 'Up')
            ylim(ax, plotLimits.UpY);
            xlim(ax, plotLimits.UpX);
        else
            ylim(ax, plotLimits.DownY);
            xlim(ax, plotLimits.DownX);
        end

        title(ax, sprintf('%s R3 %s', boardLabels{b}, edgeLabels{w}), ...
            'FontName', fontName, ...
            'FontSize', titleFontSize, ...
            'FontWeight', 'bold');

        if b == 1
            ylabel(ax, 'Phase-node voltage (V)', ...
                'FontName', fontName, ...
                'FontSize', axisFontSize);
        end
        if w == numel(edgeWindows)
            xlabel(ax, 'Time from 50% crossing (ns)', ...
                'FontName', fontName, ...
                'FontSize', axisFontSize);
        end
    end
end

detailBase = fullfile(figureDir, 'fig_e2_switching_detail_r3');
exportFigurePair(detailFig, detailBase, exportDpi);
fprintf('Wrote %s.[png,pdf]\n', detailBase);

%% Optional individual review plots
if makeIndividualPlots
    for b = 1:numel(boards)
        board = boards{b};
        boardColor = boardPlotColor(board, siColor, ganColor);
        for r = 1:numel(rpmTags)
            rpmTag = rpmTags{r};
            for w = 1:numel(windows)
                windowName = windows{w};
                key = waveformKey(board, rpmTag, windowName);
                v = waveforms.(key).voltageV;

                fig = figure( ...
                    'Name', key, ...
                    'Color', 'w', ...
                    'Visible', visibleMode, ...
                    'Units', 'centimeters', ...
                    'Position', [2, 2, 13.5, 7.8]);
                ax = axes(fig);

                x = waveforms.(key).plotX;
                xLabelText = waveforms.(key).xLabel;

                plot(ax, x, v, 'Color', boardColor, 'LineWidth', 1.0);
                hold(ax, 'on');
                xline(ax, 0, ':', 'Color', zeroColor, 'LineWidth', 0.7);
                yline(ax, 0, ':', 'Color', zeroColor, 'LineWidth', 0.6);
                hold(ax, 'off');
                grid(ax, 'on');
                box(ax, 'on');
                ax.GridColor = gridColor;
                ax.GridAlpha = 0.55;
                ax.FontName = fontName;
                ax.FontSize = axisFontSize;
                ax.LineWidth = 0.8;
                xlim(ax, plotLimits.([windowName 'X']));
                ylim(ax, plotLimits.([windowName 'Y']));
                xlabel(ax, xLabelText, 'FontName', fontName, 'FontSize', axisFontSize);
                ylabel(ax, 'Phase-node voltage (V)', 'FontName', fontName, 'FontSize', axisFontSize);
                title(ax, sprintf('%s %s %s (%d rpm)', ...
                    boardLabels{b}, rpmTag, lower(windowName), rpmValues(r)), ...
                    'FontName', fontName, ...
                    'FontSize', titleFontSize, ...
                    'FontWeight', 'bold');

                outBase = fullfile(individualDir, key);
                exportgraphics(fig, [outBase '.png'], 'Resolution', exportDpi);
                close(fig);
            end
        end
    end
    fprintf('Wrote individual clean plots to %s\n', individualDir);
end

close(wholeFig);
close(detailFig);
fprintf('Done.\n');

%% Local functions
function e2Root = resolveE2Root(repoRoot)
    candidates = { ...
        fullfile(repoRoot, 'FYP_Evidence', '08_Experiments', 'E2_sameRPM_waveform'), ...
        fullfile(repoRoot, '..', 'FYP_Evidence', '08_Experiments', 'E2_sameRPM_waveform') ...
    };

    for i = 1:numel(candidates)
        if isfolder(candidates{i})
            e2Root = candidates{i};
            return;
        end
    end

    error('Could not find E2_sameRPM_waveform under FYP_Evidence.');
end

function path = waveformPath(e2Root, board, rpmTag, windowName)
    subdir = ['E2' board];
    filename = ['E2' board rpmTag windowName '.csv'];
    path = fullfile(e2Root, subdir, filename);
end

function key = waveformKey(board, rpmTag, windowName)
    key = ['E2' board rpmTag windowName];
end

function [timeSec, voltageV] = readWaveformCsv(csvPath)
    txt = fileread(csvPath);
    lines = regexp(txt, '\r\n|\n|\r', 'split');

    timeVoltagePairs = zeros(0, 2);
    simpleVoltages = zeros(0, 1);
    t0 = NaN;
    tInc = NaN;
    skippedRows = 0;

    for i = 1:numel(lines)
        line = strtrim(strrep(lines{i}, char(65279), ''));
        if isempty(line)
            skippedRows = skippedRows + 1;
            continue;
        end

        lowerLine = lower(line);
        if contains(lowerLine, 't0') && contains(lowerLine, 'tinc')
            t0 = parseNamedNumber(lowerLine, 't0');
            tInc = parseNamedNumber(lowerLine, 'tinc');
            skippedRows = skippedRows + 1;
            continue;
        end

        if isempty(regexp(line, '^\s*[-+]?(\d|\.)', 'once'))
            skippedRows = skippedRows + 1;
            continue;
        end

        nums = parseNumbers(line);
        if numel(nums) >= 2
            timeVoltagePairs(end + 1, :) = nums(1:2); %#ok<AGROW>
        elseif numel(nums) == 1 && isfinite(t0) && isfinite(tInc)
            simpleVoltages(end + 1, 1) = nums(1); %#ok<AGROW>
        else
            skippedRows = skippedRows + 1;
        end
    end

    if ~isempty(timeVoltagePairs)
        timeSec = timeVoltagePairs(:, 1);
        voltageV = timeVoltagePairs(:, 2);
    elseif ~isempty(simpleVoltages)
        voltageV = simpleVoltages(:);
        timeSec = t0 + (0:numel(voltageV)-1)' * tInc;
    else
        error('No numeric waveform rows found in %s.', csvPath);
    end

    valid = isfinite(timeSec) & isfinite(voltageV);
    timeSec = timeSec(valid);
    voltageV = voltageV(valid);

    [timeSec, order] = sort(timeSec(:));
    voltageV = voltageV(order);

    if numel(timeSec) < 10
        error('Too few valid waveform samples in %s.', csvPath);
    end

    if skippedRows > 0
        [~, name, ext] = fileparts(csvPath);
        fprintf('Skipped %d blank/header/non-data rows in %s%s\n', skippedRows, name, ext);
    end
end

function value = parseNamedNumber(line, name)
    pattern = [name '\s*=\s*(' numberPattern() ')'];
    token = regexp(line, pattern, 'tokens', 'once');
    if isempty(token)
        value = NaN;
    else
        value = str2double(token{1});
    end
end

function nums = parseNumbers(line)
    matches = regexp(line, numberPattern(), 'match');
    nums = str2double(matches);
    nums = nums(isfinite(nums));
end

function pattern = numberPattern()
    pattern = '[-+]?(?:(?:\d+\.?\d*)|(?:\.\d+))(?:[eE][-+]?\d+)?';
end

function color = boardPlotColor(board, siColor, ganColor)
    if strcmp(board, 'Si')
        color = siColor;
    else
        color = ganColor;
    end
end

function lim = paddedLimits(values, padFraction)
    values = values(isfinite(values));
    vMin = min(values);
    vMax = max(values);
    span = vMax - vMin;
    if span <= 0
        span = max(abs(vMax), 1);
    end
    pad = span * padFraction;
    lim = [vMin - pad, vMax + pad];
end

function [alignedNs, crossingTimeSec] = alignToMainCrossing(timeSec, voltageV, windowName)
    t = timeSec(:);
    v = voltageV(:);
    vSmooth = smoothForEdge(v);

    n = numel(vSmooth);
    nPlateau = max(5, round(0.10 * n));
    startLevel = median(vSmooth(1:nPlateau), 'omitnan');
    endLevel = median(vSmooth(end-nPlateau+1:end), 'omitnan');
    threshold = startLevel + 0.50 * (endLevel - startLevel);

    dv = diff(vSmooth) ./ diff(t);
    [~, slopeIdx] = max(abs(dv));
    candidateIdx = crossingCandidates(vSmooth, threshold, windowName);
    if isempty(candidateIdx)
        candidateIdx = crossingCandidates(vSmooth, threshold, 'Any');
    end
    if isempty(candidateIdx)
        crossingTimeSec = t(slopeIdx);
    else
        [~, nearest] = min(abs(candidateIdx - slopeIdx));
        idx = candidateIdx(nearest);
        crossingTimeSec = interpolateCrossingTime(t, vSmooth, idx, threshold);
    end

    alignedNs = (t - crossingTimeSec) * 1e9;
end

function y = smoothForEdge(v)
    y = movmedian(v(:), 5, 'omitnan');
    y = movmean(y, 11, 'omitnan');
end

function idx = crossingCandidates(v, threshold, windowName)
    y0 = v(1:end-1);
    y1 = v(2:end);
    switch lower(windowName)
        case 'up'
            mask = y0 <= threshold & y1 >= threshold;
        case 'down'
            mask = y0 >= threshold & y1 <= threshold;
        otherwise
            mask = (y0 - threshold) .* (y1 - threshold) <= 0;
    end
    idx = find(mask);
end

function crossingTimeSec = interpolateCrossingTime(t, v, idx, threshold)
    t0 = t(idx);
    t1 = t(idx + 1);
    v0 = v(idx);
    v1 = v(idx + 1);
    if abs(v1 - v0) < eps
        crossingTimeSec = t0;
    else
        frac = (threshold - v0) / (v1 - v0);
        frac = max(0, min(1, frac));
        crossingTimeSec = t0 + frac * (t1 - t0);
    end
end

function exportFigurePair(fig, outputBase, dpi)
    exportgraphics(fig, [outputBase '.png'], 'Resolution', dpi);
    exportgraphics(fig, [outputBase '.pdf'], 'ContentType', 'vector');
end
