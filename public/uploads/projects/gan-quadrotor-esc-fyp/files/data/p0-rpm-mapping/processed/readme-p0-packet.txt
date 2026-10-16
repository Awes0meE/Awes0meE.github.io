P0 processed mapping table evidence packet
================================================

Files:
- P0_processed_mapping_table.xlsx: main workbook with selected mapping, raw readings, interpolation support, and processing audit.
- RPM_mapping_Si.csv: processed Si raw mapping table.
- RPM_mapping_GaN.csv: processed GaN raw mapping table.
- selected_DShot_commands.csv: final board-specific DShot commands for R1/R2/R3.
- selected_RPM_points.md: Markdown summary for evidence folder.
- FINAL_RPM_MAPPING.md: context-ready mapping summary for thesis/Codex handoff.
- P0_interpolation_support.csv: linear interpolation support table.
- P0_processing_notes_and_audit.csv: correction and treatment log.

Corrections applied:
- Si DShot 520 RPM reading 1 = 2360.
- Si DShot 790 RPM reading 2 = 6560.
- GaN data accepted as transcribed.
- GaN sweep note: coarse x1, fine x5.
- Si sweep note: coarse x1, fine x6.
- Crossed-out throttle values are treated as not continued after the target/useful interval was found, not as failed measurements.

Claim boundary:
This packet supports same-RPM command selection. DShot differences alone should not be interpreted as efficiency, thrust, or flight-performance conclusions.
