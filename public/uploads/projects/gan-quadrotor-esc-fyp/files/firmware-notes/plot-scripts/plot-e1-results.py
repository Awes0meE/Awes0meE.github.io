"""Redraw thesis-facing E1 result figures with larger plot text.

The script reads the registered E1 repeatability summary CSV and regenerates:

- fig_e1_input_power_bar_final
- fig_e1_repeatability_final

It writes the thesis copies, the Chapter 5 figure-evidence copies, and a dated
copy under the E1 experiment evidence folder. Raw logs and processed CSV files
are read-only inputs.
"""

from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

import matplotlib.pyplot as plt
import numpy as np


REPO_ROOT = Path(__file__).resolve().parents[1]
DATE_TAG = "2026-05-24"

FIGURE_DIR = REPO_ROOT / "figures" / "chapter5"
EVIDENCE_ROOTS = [
    REPO_ROOT / "FYP_Evidence",
    REPO_ROOT.parent / "FYP_Evidence",
]

SI_COLOR = "#4C91D9"
GAN_COLOR = "#EA6A4A"
TEXT_COLOR = "#18232B"
GRID_COLOR = "#D9E0E5"
SPINE_COLOR = "#1F2B33"


@dataclass(frozen=True)
class E1Row:
    board: str
    rpm_point: str
    target_rpm: int
    power_mean_w: float
    power_std_w: float
    power_range_w: float


def find_evidence_root() -> Path:
    for candidate in EVIDENCE_ROOTS:
        if (candidate / "08_Experiments" / "E1_sameRPM_electrical").exists():
            return candidate.resolve()
    raise FileNotFoundError(
        "Could not locate FYP_Evidence/08_Experiments/E1_sameRPM_electrical"
    )


def read_rows(csv_path: Path) -> list[E1Row]:
    rows: list[E1Row] = []
    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        required = {
            "board",
            "rpm_point",
            "target_rpm",
            "power_mean_W",
            "power_std_W",
            "power_range_W",
        }
        missing = sorted(required.difference(reader.fieldnames or []))
        if missing:
            raise ValueError(f"{csv_path} is missing columns: {', '.join(missing)}")

        for line_no, row in enumerate(reader, start=2):
            try:
                rows.append(
                    E1Row(
                        board=row["board"].strip(),
                        rpm_point=row["rpm_point"].strip(),
                        target_rpm=int(float(row["target_rpm"])),
                        power_mean_w=float(row["power_mean_W"]),
                        power_std_w=float(row["power_std_W"]),
                        power_range_w=float(row["power_range_W"]),
                    )
                )
            except (TypeError, ValueError) as exc:
                raise ValueError(f"Invalid numeric value in {csv_path} line {line_no}") from exc

    expected = {(board, point) for board in ("Si", "GaN") for point in ("R1", "R2", "R3")}
    found = {(row.board, row.rpm_point) for row in rows}
    missing_pairs = sorted(expected.difference(found))
    if missing_pairs:
        raise ValueError(f"Missing E1 board/point rows: {missing_pairs}")
    return rows


def row_lookup(rows: Iterable[E1Row]) -> dict[tuple[str, str], E1Row]:
    return {(row.board, row.rpm_point): row for row in rows}


def setup_style() -> None:
    plt.rcParams.update(
        {
            "font.family": "serif",
            "font.serif": ["Times New Roman", "DejaVu Serif", "serif"],
            "font.size": 12,
            "axes.labelsize": 14,
            "xtick.labelsize": 13,
            "ytick.labelsize": 13,
            "legend.fontsize": 14,
            "pdf.fonttype": 42,
            "ps.fonttype": 42,
        }
    )


def style_axes(ax: plt.Axes, y_label: str, y_ticks: list[float], y_limit: tuple[float, float]) -> None:
    ax.set_ylim(*y_limit)
    ax.set_yticks(y_ticks)
    ax.set_axisbelow(True)
    ax.grid(axis="y", color=GRID_COLOR, linewidth=0.75)
    ax.tick_params(axis="x", length=0, pad=13, colors=TEXT_COLOR)
    ax.tick_params(axis="y", length=0, pad=7, colors="#536775")

    for side in ("top", "right"):
        ax.spines[side].set_color("#CFD7DD")
        ax.spines[side].set_linewidth(0.8)
    for side in ("left", "bottom"):
        ax.spines[side].set_color(SPINE_COLOR)
        ax.spines[side].set_linewidth(1.35)

    ax.text(
        -0.04,
        1.02,
        y_label,
        transform=ax.transAxes,
        ha="left",
        va="bottom",
        fontsize=14,
        color=TEXT_COLOR,
    )


def add_legend(ax: plt.Axes) -> None:
    legend = ax.legend(
        loc="upper right",
        bbox_to_anchor=(0.94, 1.18),
        ncols=2,
        frameon=False,
        handlelength=1.1,
        handletextpad=0.45,
        columnspacing=2.5,
        borderaxespad=0,
    )
    for text in legend.get_texts():
        text.set_color(TEXT_COLOR)


def label_bars(ax: plt.Axes, bars, y_offset: float, fmt: str = "{:.1f}") -> None:
    for bar in bars:
        height = bar.get_height()
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            height + y_offset,
            fmt.format(height),
            ha="center",
            va="bottom",
            fontsize=12,
            color=TEXT_COLOR,
        )


def save_figure(fig: plt.Figure, basename: str, destinations: Iterable[Path]) -> None:
    for destination in destinations:
        destination.mkdir(parents=True, exist_ok=True)
        fig.savefig(destination / f"{basename}.pdf", bbox_inches="tight", pad_inches=0.04)
        fig.savefig(destination / f"{basename}.png", dpi=300, bbox_inches="tight", pad_inches=0.04)


def plot_input_power(rows: list[E1Row], destinations: Iterable[Path]) -> None:
    data = row_lookup(rows)
    points = ["R1", "R2", "R3"]
    targets = [data[("Si", point)].target_rpm for point in points]
    si_mean = np.array([data[("Si", point)].power_mean_w for point in points])
    gan_mean = np.array([data[("GaN", point)].power_mean_w for point in points])
    si_std = np.array([data[("Si", point)].power_std_w for point in points])
    gan_std = np.array([data[("GaN", point)].power_std_w for point in points])

    x = np.arange(len(points)) * 1.65
    width = 0.32

    fig, ax = plt.subplots(figsize=(6.3, 3.55))
    si_bars = ax.bar(
        x - width / 1.85,
        si_mean,
        width,
        label="Si",
        color=SI_COLOR,
        yerr=si_std,
        error_kw={"elinewidth": 1.25, "ecolor": SPINE_COLOR, "capsize": 4, "capthick": 1.25},
    )
    gan_bars = ax.bar(
        x + width / 1.85,
        gan_mean,
        width,
        label="GaN",
        color=GAN_COLOR,
        yerr=gan_std,
        error_kw={"elinewidth": 1.25, "ecolor": SPINE_COLOR, "capsize": 4, "capthick": 1.25},
    )

    ax.set_xlim(x[0] - 0.68, x[-1] + 0.68)
    ax.set_xticks(x)
    ax.set_xticklabels([f"{point}\n{rpm} rpm" for point, rpm in zip(points, targets)])
    style_axes(ax, "Input power (W)", [0, 10, 20, 30, 40, 50, 60], (0, 60))
    add_legend(ax)
    label_bars(ax, si_bars, 0.8)
    label_bars(ax, gan_bars, 0.8)
    fig.subplots_adjust(left=0.10, right=0.99, top=0.82, bottom=0.24)
    save_figure(fig, "fig_e1_input_power_bar_final", destinations)
    plt.close(fig)


def plot_repeatability(rows: list[E1Row], destinations: Iterable[Path]) -> None:
    data = row_lookup(rows)
    points = ["R1", "R2", "R3"]
    targets = [data[("Si", point)].target_rpm for point in points]
    si_range = np.array([data[("Si", point)].power_range_w for point in points])
    gan_range = np.array([data[("GaN", point)].power_range_w for point in points])

    x = np.arange(len(points)) * 1.65
    width = 0.32

    fig, ax = plt.subplots(figsize=(6.3, 3.55))
    si_bars = ax.bar(x - width / 1.85, si_range, width, label="Si", color=SI_COLOR)
    gan_bars = ax.bar(x + width / 1.85, gan_range, width, label="GaN", color=GAN_COLOR)

    ax.set_xlim(x[0] - 0.68, x[-1] + 0.68)
    ax.set_xticks(x)
    ax.set_xticklabels([f"{point}\n{rpm} rpm" for point, rpm in zip(points, targets)])
    style_axes(ax, "Power range (W)", [0, 1, 2, 3], (0, 3))
    add_legend(ax)
    label_bars(ax, si_bars, 0.04)
    label_bars(ax, gan_bars, 0.04)
    fig.subplots_adjust(left=0.10, right=0.99, top=0.82, bottom=0.24)
    save_figure(fig, "fig_e1_repeatability_final", destinations)
    plt.close(fig)


def write_readme(experiment_output: Path, source_csv: Path) -> None:
    text = f"""# E1 redrawn thesis result figures

Date generated: {DATE_TAG}

These figures are regenerated from the final E1 same-RPM electrical CSV summary with larger axis, tick and legend text for dissertation readability.

Source data:

- `{source_csv.relative_to(experiment_output.parent).as_posix()}`

Generated figures:

- `fig_e1_input_power_bar_final.png`
- `fig_e1_input_power_bar_final.pdf`
- `fig_e1_repeatability_final.png`
- `fig_e1_repeatability_final.pdf`

Generation script:

- Dissertation repository script: `scripts/plot_e1_results.py`

Processing notes:

- Raw E1 logs and processed CSV files were not edited.
- The input-power chart plots mean input power with standard-deviation error bars.
- The repeatability chart plots the repeated-run power range from the registered summary CSV.
- The larger font settings are intended for the figures as inserted in Chapter 5.
"""
    (experiment_output / "README_redrawn_e1_result_figures.md").write_text(text, encoding="utf-8")


def update_source_notes(figures_dir: Path) -> None:
    common = f"""Generated by: `scripts/plot_e1_results.py`

Output files:
- `09_Figures_for_Thesis\\Chapter5_E1_Electrical\\{{name}}.png`
- `09_Figures_for_Thesis\\Chapter5_E1_Electrical\\{{name}}.pdf`

Evidence ID: E-EXP-E1-SAMERPM-001; EV-E1-RESULT-001

Source files:
- `08_Experiments\\E1_sameRPM_electrical\\E1_repeatability_summary.csv`

Processing: the script reads the registered E1 summary CSV, redraws the chart with larger axis, tick and legend text, trims outer whitespace, and writes PNG plus PDF outputs. No source CSV or raw evidence file is edited.
"""

    notes = {
        "source_note_fig_e1_input_power_bar_final.md": (
            "# fig_e1_input_power_bar_final\n\n"
            + common.format(name="fig_e1_input_power_bar_final")
            + "\nAllowed thesis claim: The E1 dataset reports lower measured input electrical power for the GaN route at R1/R2/R3 under the tested bench setup.\n\n"
            + "Forbidden overclaim: This is not strict ESC efficiency because torque, thrust and shaft power were not measured, and current/voltage calibration remains limited.\n\n"
            + "Review status: regenerated on 2026-05-24 for larger text readability.\n"
        ),
        "source_note_fig_e1_repeatability_final.md": (
            "# fig_e1_repeatability_final\n\n"
            + common.format(name="fig_e1_repeatability_final")
            + "\nAllowed thesis claim: The repeatability summary records run-to-run spread for the input electrical measurement.\n\n"
            + "Forbidden overclaim: Repeatability range does not prove calibration, strict efficiency or mechanical-output equivalence.\n\n"
            + "Review status: regenerated on 2026-05-24 for larger text readability.\n"
        ),
    }

    for filename, text in notes.items():
        (figures_dir / filename).write_text(text, encoding="utf-8")


def main() -> None:
    setup_style()
    evidence_root = find_evidence_root()
    experiment_dir = evidence_root / "08_Experiments" / "E1_sameRPM_electrical"
    figures_evidence_dir = evidence_root / "09_Figures_for_Thesis" / "Chapter5_E1_Electrical"
    experiment_output = experiment_dir / f"redrawn_result_figures_{DATE_TAG}"
    source_csv = experiment_dir / "E1_repeatability_summary.csv"

    rows = read_rows(source_csv)
    destinations = [FIGURE_DIR, figures_evidence_dir, experiment_output]
    plot_input_power(rows, destinations)
    plot_repeatability(rows, destinations)
    write_readme(experiment_output, source_csv)
    update_source_notes(figures_evidence_dir)

    print(f"Read: {source_csv}")
    print(f"Wrote thesis figures: {FIGURE_DIR}")
    print(f"Wrote figure evidence: {figures_evidence_dir}")
    print(f"Wrote experiment evidence: {experiment_output}")


if __name__ == "__main__":
    main()
