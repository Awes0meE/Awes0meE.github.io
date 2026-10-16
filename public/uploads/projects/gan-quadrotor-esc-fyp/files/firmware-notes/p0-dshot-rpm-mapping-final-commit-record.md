# P0 DShot-to-RPM Mapping Final Firmware Evidence

Generated: 2026-05-17 Asia/Shanghai

## GitHub Release

- Repository: https://github.com/Awes0meE/STM32_ESC_Dshot_P0_RPM_Mapping
- Release tag/version: Final
- Release URL: https://github.com/Awes0meE/STM32_ESC_Dshot_P0_RPM_Mapping/releases/tag/Final
- Final commit hash: 14911846f96db5d3c69f1cc6e1614776e24a61b4
- Short commit: 14911846
- Commit date: 2026-05-17 00:12:36 +0800
- Commit subject: Guard high-throttle P0 starts

## What This Evidence Contains

This folder records the final P0 DShot-to-RPM mapping firmware version used for the FYP P0 experiment evidence.

Included files:

- P0_DShot_RPM_Mapping_Final_source_14911846.zip: exact source snapshot exported with git archive from commit 14911846f96db5d3c69f1cc6e1614776e24a61b4.
- STM32_ESC_DSHOT_P0_RPM_MAPPING_Final_14911846.hex: flashable Intel HEX build artifact.
- STM32_ESC_DSHOT_P0_RPM_MAPPING_Final_14911846.bin: flashable raw binary build artifact.
- STM32_ESC_DSHOT_P0_RPM_MAPPING_Final_14911846.elf: ELF build artifact with symbols.
- STM32_ESC_DSHOT_P0_RPM_MAPPING_Final_14911846.map: linker map from the final build.
- P0_DShot_RPM_Mapping_Final_checksums_sha256.txt: SHA256 hashes for the exported files.

## Verification Performed Before Release

Commands run successfully before this evidence export:

```text
cmake --preset Debug --fresh
cmake --build --preset Debug
git diff --check
python -m py_compile tools\parse_p0_log.py
parser sample check
```

Final build memory usage:

```text
RAM:   5712 B / 20 KB  (27.89%)
FLASH: 43448 B / 64 KB (66.30%)
```

## Reproduction Notes

The source zip was produced from the committed Git object, not from the working tree:

```text
git archive --format=zip --prefix=STM32_ESC_Dshot_P0_Final/ --output P0_DShot_RPM_Mapping_Final_source_14911846.zip 14911846f96db5d3c69f1cc6e1614776e24a61b4
```

The local working tree had an unrelated .vscode/settings.json editor configuration change at export time. It is not included in the committed source snapshot, the GitHub release, or this final evidence archive.

## SHA256

```text
7AFFB3CC745544146ABFAD79EE954E14E7CC1890CDCF7A89F40DA87D58A24B46  P0_DShot_RPM_Mapping_Final_source_14911846.zip
AF0AEEC083D4693831A31DE8CBCCEBA8A0D3977D2F4167B5ECEF29863FEC3606  STM32_ESC_DSHOT_P0_RPM_MAPPING_Final_14911846.bin
13630247ECA5FE8204BE2D84C56BFA6424E50BE823756285B0FA482E655B26EE  STM32_ESC_DSHOT_P0_RPM_MAPPING_Final_14911846.elf
B5699B78D0865A0847A8A4940992687518983A23716654EAA528612E0811CCA9  STM32_ESC_DSHOT_P0_RPM_MAPPING_Final_14911846.hex
98CD0EE08F2A38BEC1F3FE348855968CA9ADFF36B4B7D5F69F6C9F8CDE6C24E2  STM32_ESC_DSHOT_P0_RPM_MAPPING_Final_14911846.map
```
