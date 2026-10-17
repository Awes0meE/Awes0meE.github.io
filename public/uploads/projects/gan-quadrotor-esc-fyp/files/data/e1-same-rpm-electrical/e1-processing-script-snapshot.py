#!/usr/bin/env python3
"""Process final E1 same-RPM electrical raw logs.

This script is the archived processing snapshot for the final propeller-loaded
same-RPM E1 electrical evidence folder. It parses the STM32 E1 FireWater-style
raw logs, extracts only STATE_RUN samples, applies a stable-window crop within
each repeated run cycle, and writes:

- E1_processed_voltage_current_power_table.csv
- E1_repeatability_summary.csv

The script intentionally reports input electrical behaviour only. It does not
calculate ESC efficiency because torque, thrust and shaft power are not present
in the E1 evidence.
"""

from __future__ import annotations

import csv
import math
import re
import statistics
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parent
RAW_PATTERN = "*_raw_log.txt"
STABLE_START_FRACTION = 0.15
STABLE_END_FRACTION = 0.85

RUN_STATE = 2
MALFORMED_LINES: list[str] = []

DATA_COLUMNS = [
    "t_ms",
    "state",
    "cmd_raw",
    "dshot_cmd",
    "adc_i_raw",
    "adc_vbat_raw",
    "v_i_sense",
    "v_vbat_adc",
    "current_A",
    "vbat_V",
    "power_W",
    "zero_offset_V",
    "active_zero_offset_V",
    "delta_i_V",
    "profile",
    "target_rpm",
    "instant_current_A",
]

STATE_RE = re.compile(r"^#\s*state_change,(.*)$")
PROFILE_RE = re.compile(r"^#\s*profile_set,(.*)$")


def parse_kv_list(text: str) -> dict[str, str]:
    values: dict[str, str] = {}
    for part in text.split(","):
        if "=" not in part:
            continue
        key, value = part.split("=", 1)
        values[key.strip()] = value.strip()
    return values


def parse_data_line(line: str, path: Path, line_number: int) -> dict[str, float | int] | None:
    payload = line.strip()[3:]
    parts = payload.split(",")
    if len(parts) != len(DATA_COLUMNS):
        MALFORMED_LINES.append(
            f"{path.name}:{line_number}: skipped malformed h1 frame with {len(parts)} columns: {line}"
        )
        return None

    row: dict[str, float | int] = {}
    int_columns = {
        "t_ms",
        "state",
        "cmd_raw",
        "dshot_cmd",
        "adc_i_raw",
        "adc_vbat_raw",
        "profile",
        "target_rpm",
    }
    for key, value in zip(DATA_COLUMNS, parts):
        if key in int_columns:
            row[key] = int(value)
        else:
            row[key] = float(value)
    return row


def safe_stdev(values: list[float]) -> float:
    return statistics.stdev(values) if len(values) >= 2 else 0.0


def stable_slice(rows: list[dict[str, float | int]]) -> list[dict[str, float | int]]:
    if not rows:
        return []
    n = len(rows)
    start_idx = int(math.ceil(n * STABLE_START_FRACTION))
    end_idx = int(math.floor(n * STABLE_END_FRACTION))
    if end_idx <= start_idx:
        return rows
    return rows[start_idx:end_idx]


def mean(values: list[float]) -> float:
    return statistics.fmean(values) if values else float("nan")


def stat_block(rows: list[dict[str, float | int]], key: str) -> dict[str, float]:
    values = [float(row[key]) for row in rows]
    return {
        f"{key}_mean": mean(values),
        f"{key}_std": safe_stdev(values),
        f"{key}_min": min(values) if values else float("nan"),
        f"{key}_max": max(values) if values else float("nan"),
        f"{key}_range": (max(values) - min(values)) if values else float("nan"),
    }


def parse_log(path: Path) -> list[dict[str, object]]:
    runs: dict[int, dict[str, object]] = {}
    current_cycle: int | None = None
    current_state: int | None = None
    meta: dict[str, str] = {}

    for line_number, raw_line in enumerate(path.read_text(encoding="utf-8", errors="replace").splitlines(), start=1):
        line = raw_line.strip()
        if not line:
            continue

        profile_match = PROFILE_RE.match(line)
        if profile_match:
            meta.update(parse_kv_list(profile_match.group(1)))
            continue

        state_match = STATE_RE.match(line)
        if state_match:
            kv = parse_kv_list(state_match.group(1))
            meta.update({k: v for k, v in kv.items() if k in {"board", "rpm_point", "target_rpm", "profile", "run_cmd_raw"}})
            current_cycle = int(kv.get("cycle", current_cycle or 0))
            current_state = int(kv.get("state", -1))
            if kv.get("name") == "RUN":
                runs.setdefault(
                    current_cycle,
                    {
                        "source_file": path.name,
                        "board": kv.get("board", meta.get("board", "")),
                        "rpm_point": kv.get("rpm_point", meta.get("rpm_point", "")),
                        "target_rpm": int(kv.get("target_rpm", meta.get("target_rpm", "0"))),
                        "profile": int(kv.get("profile", meta.get("profile", "0"))),
                        "dshot_cmd": int(kv.get("run_cmd_raw", meta.get("run_cmd_raw", "0"))),
                        "cycle": current_cycle,
                        "rows": [],
                    },
                )
            continue

        if line.startswith("h1:"):
            row = parse_data_line(line, path, line_number)
            if row is None:
                continue
            if int(row["state"]) != RUN_STATE:
                continue
            if current_state != RUN_STATE or current_cycle is None:
                continue
            run = runs.setdefault(
                current_cycle,
                {
                    "source_file": path.name,
                    "board": meta.get("board", ""),
                    "rpm_point": meta.get("rpm_point", ""),
                    "target_rpm": int(row["target_rpm"]),
                    "profile": int(row["profile"]),
                    "dshot_cmd": int(row["dshot_cmd"]),
                    "cycle": current_cycle,
                    "rows": [],
                },
            )
            run_rows = run["rows"]
            assert isinstance(run_rows, list)
            run_rows.append(row)

    return [runs[key] for key in sorted(runs)]


def round3(value: float) -> str:
    return f"{value:.3f}"


def round6(value: float) -> str:
    return f"{value:.6f}"


def build_processed_rows() -> list[dict[str, str]]:
    processed: list[dict[str, str]] = []

    for path in sorted(ROOT.glob(RAW_PATTERN)):
        for run in parse_log(path):
            rows = run["rows"]
            assert isinstance(rows, list)
            stable_rows = stable_slice(rows)
            if not stable_rows:
                continue

            vbat_stats = stat_block(stable_rows, "vbat_V")
            current_stats = stat_block(stable_rows, "current_A")
            power_stats = stat_block(stable_rows, "power_W")
            zero_stats = stat_block(stable_rows, "zero_offset_V")
            active_zero_stats = stat_block(stable_rows, "active_zero_offset_V")
            delta_stats = stat_block(stable_rows, "delta_i_V")

            start_t = int(rows[0]["t_ms"])
            end_t = int(rows[-1]["t_ms"])
            stable_start_t = int(stable_rows[0]["t_ms"])
            stable_end_t = int(stable_rows[-1]["t_ms"])

            processed.append(
                {
                    "source_file": str(run["source_file"]),
                    "board": str(run["board"]),
                    "rpm_point": str(run["rpm_point"]),
                    "target_rpm": str(run["target_rpm"]),
                    "profile": str(run["profile"]),
                    "dshot_cmd": str(run["dshot_cmd"]),
                    "cycle": str(run["cycle"]),
                    "run_start_t_ms": str(start_t),
                    "run_end_t_ms": str(end_t),
                    "run_duration_s": round3((end_t - start_t) / 1000.0),
                    "samples_total": str(len(rows)),
                    "stable_window_fraction": f"{STABLE_START_FRACTION:.2f}-{STABLE_END_FRACTION:.2f}",
                    "stable_start_t_ms": str(stable_start_t),
                    "stable_end_t_ms": str(stable_end_t),
                    "samples_used": str(len(stable_rows)),
                    "vbat_mean_V": round6(vbat_stats["vbat_V_mean"]),
                    "vbat_std_V": round6(vbat_stats["vbat_V_std"]),
                    "vbat_min_V": round6(vbat_stats["vbat_V_min"]),
                    "vbat_max_V": round6(vbat_stats["vbat_V_max"]),
                    "current_mean_A": round6(current_stats["current_A_mean"]),
                    "current_std_A": round6(current_stats["current_A_std"]),
                    "current_min_A": round6(current_stats["current_A_min"]),
                    "current_max_A": round6(current_stats["current_A_max"]),
                    "power_mean_W": round6(power_stats["power_W_mean"]),
                    "power_std_W": round6(power_stats["power_W_std"]),
                    "power_min_W": round6(power_stats["power_W_min"]),
                    "power_max_W": round6(power_stats["power_W_max"]),
                    "zero_offset_mean_V": round6(zero_stats["zero_offset_V_mean"]),
                    "active_zero_offset_mean_V": round6(active_zero_stats["active_zero_offset_V_mean"]),
                    "delta_i_mean_V": round6(delta_stats["delta_i_V_mean"]),
                    "processing_note": "STATE_RUN only; first/last 15 percent of each run cycle excluded",
                }
            )

    return sorted(processed, key=lambda r: (r["board"] != "Si", r["rpm_point"], int(r["cycle"])))


def build_repeatability_rows(processed: list[dict[str, str]]) -> list[dict[str, str]]:
    groups: dict[tuple[str, str, str, str], list[dict[str, str]]] = defaultdict(list)
    for row in processed:
        key = (row["board"], row["rpm_point"], row["target_rpm"], row["dshot_cmd"])
        groups[key].append(row)

    summary: list[dict[str, str]] = []
    for (board, rpm_point, target_rpm, dshot_cmd), rows in groups.items():
        rows = sorted(rows, key=lambda r: int(r["cycle"]))
        power = [float(r["power_mean_W"]) for r in rows]
        current = [float(r["current_mean_A"]) for r in rows]
        vbat = [float(r["vbat_mean_V"]) for r in rows]
        summary.append(
            {
                "board": board,
                "rpm_point": rpm_point,
                "target_rpm": target_rpm,
                "dshot_cmd": dshot_cmd,
                "repeats_n": str(len(rows)),
                "cycle_ids": ";".join(r["cycle"] for r in rows),
                "power_mean_W": round6(mean(power)),
                "power_std_W": round6(safe_stdev(power)),
                "power_min_W": round6(min(power)),
                "power_max_W": round6(max(power)),
                "power_range_W": round6(max(power) - min(power)),
                "current_mean_A": round6(mean(current)),
                "current_std_A": round6(safe_stdev(current)),
                "current_min_A": round6(min(current)),
                "current_max_A": round6(max(current)),
                "current_range_A": round6(max(current) - min(current)),
                "vbat_mean_V": round6(mean(vbat)),
                "vbat_std_V": round6(safe_stdev(vbat)),
                "vbat_min_V": round6(min(vbat)),
                "vbat_max_V": round6(max(vbat)),
                "vbat_range_V": round6(max(vbat) - min(vbat)),
                "mean_samples_used_per_repeat": round3(mean([float(r["samples_used"]) for r in rows])),
                "stable_window_fraction": rows[0]["stable_window_fraction"],
                "source_files": ";".join(sorted({r["source_file"] for r in rows})),
                "interpretation": "input electrical repeatability only; not strict efficiency",
            }
        )

    return sorted(summary, key=lambda r: (r["board"] != "Si", r["rpm_point"]))


def write_csv(path: Path, rows: list[dict[str, str]]) -> None:
    if not rows:
        raise RuntimeError(f"No rows to write for {path}")
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    processed = build_processed_rows()
    repeatability = build_repeatability_rows(processed)

    write_csv(ROOT / "E1_processed_voltage_current_power_table.csv", processed)
    write_csv(ROOT / "E1_repeatability_summary.csv", repeatability)
    (ROOT / "E1_processing_audit.txt").write_text(
        "E1 processing audit\n"
        "Date: 2026-05-18\n\n"
        f"Raw log files parsed: {len(list(ROOT.glob(RAW_PATTERN)))}\n"
        f"Processed run-cycle rows: {len(processed)}\n"
        f"Repeatability summary rows: {len(repeatability)}\n"
        f"Stable window: {STABLE_START_FRACTION:.2f}-{STABLE_END_FRACTION:.2f} of each STATE_RUN cycle\n"
        f"Malformed h1 frames skipped: {len(MALFORMED_LINES)}\n\n"
        + ("\n".join(MALFORMED_LINES) if MALFORMED_LINES else "No malformed h1 frames skipped.")
        + "\n",
        encoding="utf-8",
    )

    print(f"Wrote {len(processed)} processed run-cycle rows")
    print(f"Wrote {len(repeatability)} repeatability summary rows")
    print(f"Skipped {len(MALFORMED_LINES)} malformed h1 rows")


if __name__ == "__main__":
    main()
