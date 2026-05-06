# Juanyun Technology Source Inventory

Date: 2026-05-07

Source path inspected:

```text
D:\XJTLU\工作相关\卷云科技有限责任公司
```

This document records how the raw Juanyun source folder is represented in the portfolio. It is a source-to-portfolio map, not permission to publish the raw source tree.

## Current Public Boundary

On `main` release `v0.7.0`, the website keeps Juanyun public writing in:

```text
content/projects/juanyun-*.mdx
content/notes/juanyun-*.mdx
```

Website-accessible Juanyun assets are limited to reviewed evidence under:

```text
public/uploads/projects/juanyun-tech/
public/uploads/projects/juanyun-public/
```

Current website-accessible Juanyun technical evidence groups:

```text
public/uploads/projects/juanyun-tech/acunit-v20-system-block.png
public/uploads/projects/juanyun-tech/acunit-v21-main-back.png
public/uploads/projects/juanyun-tech/acunit-v21-main-front.png
public/uploads/projects/juanyun-tech/acunit-v21-power-back.png
public/uploads/projects/juanyun-tech/acunit-v21-power-front.png
public/uploads/projects/juanyun-tech/acunit-v21-pressure-transmitter-params.jpg
public/uploads/projects/juanyun-tech/acunit-v21-pwm-fan-params.jpg
public/uploads/projects/juanyun-tech/acunit-v21-system-block.png
public/uploads/projects/juanyun-tech/acunit-v21-ui-back.png
public/uploads/projects/juanyun-tech/acunit-v21-ui-front.png
public/uploads/projects/juanyun-tech/diy-cooling-3d-print-preview-1.jpg
public/uploads/projects/juanyun-tech/diy-cooling-3d-print-preview-2.jpg
public/uploads/projects/juanyun-tech/diy-cooling-desktop-demo.mp4
public/uploads/projects/juanyun-tech/hardware-sop-cover.jpeg
public/uploads/projects/juanyun-public/dht11-am2302-breakout-plan-cover.png
public/uploads/projects/juanyun-public/dht11-am2302-breakout-plan.pdf
public/uploads/projects/juanyun-public/diy-cooling-3d-print-preview-3.jpg
public/uploads/projects/juanyun-public/hardware-development-sop-awes0mee.pdf
public/uploads/projects/juanyun-public/hardware-sop-cover.jpeg
public/uploads/projects/juanyun-public/diy-cooling/
public/uploads/projects/juanyun-public/foc-driver/
public/uploads/projects/juanyun-public/actuator-fan/
```

The three `juanyun-public/` subfolders contain selected legacy evidence such as small source snippets, Gerber/BOM/PnP exports, EDA files, STEP/3MF files, schematics, datasheets, PDFs, images, and demo media. This is allowed only for non-Current_Product legacy folders after pruning installers, dependency folders, vendor packages, generated build outputs, invoices, reimbursements, billing records, internship proof documents, and duplicate raw dumps.

Project pages render these files through `components/project-assets.tsx`. The renderer has an explicit allowlist for `public/uploads/projects/juanyun-tech/`, and `scripts/validate-content.mjs` fails if non-allowlisted files reappear there. This matters because WPS-synced ignored ACUnit/BaseUnit raw files would still be static public files if they were left under `public/`, even when no page lists them.

## Portfolio Content Mapping

The public-facing writing lives in:

```text
content/projects/juanyun-*.mdx
content/notes/juanyun-*.mdx
content/media.json
```

Current Juanyun project-page structure focuses on three larger public archives instead of many thin pages:

- `juanyun-diy-cooling-prototype` and `juanyun-diy-cooling`;
- `juanyun-foc-driver-board` and `juanyun-foc-driver`;
- `juanyun-thermal-hardware` as the main archive for ACUnit overview, BaseUnit firmware overview, DHT11 / AM2302 planning, actuator/fan evidence, and SOP material;
- `juanyun-legacy-actuator-archive`, `juanyun-dht11-am2302-board`, ACUnit notes, and BaseUnit notes now point to `juanyun-thermal-hardware`;
- `juanyun-hardware-sop`;
- ACUnit media entries now point to `juanyun-thermal-hardware`.

## Source Folder Summary

| Source folder | Approx. files | Portfolio treatment |
| --- | ---: | --- |
| `Current_Product_ACUnit_Project` | 1210 | Sensitive current-product material. Used only for high-level writing and already-approved screenshots/renders. Raw schematic, Gerber, BOM/PnP, EDA/CAD, firmware source, and manufacturing exports are not served by the website. |
| `Current_Product_BaseUnit_Project` | 1659 | Sensitive current-product material. Used only for public narrative where appropriate. Raw STM32 project files, source code, vendor packages, and build output are not served. |
| `DHT11 AM2302 温湿度传感器模块小板开发任务计划书.pdf` | 1 | Public small-board planning document. Copied as `dht11-am2302-breakout-plan.pdf` with a rendered cover image. Used for the DHT11 / AM2302 project and note. |
| `Legacy_DIY压风式散热器_Project` | 536 | Public legacy material. Published selected preview images, demo video, ESP32/Arduino snippets, C# desktop snippets, schematic PDF, Gerber archive, EasyEDA projects, acrylic list, and one 3MF slice. Installers, dependency folders, generated output, duplicate exports, and uncurated full project dumps are not served. |
| `Legacy_慧驱动FOC_Project` | 4762 | Public legacy material. Published selected Gerber, BOM/PnP, InteractiveBOM, EasyEDA, STEP, datasheets, board config, and motor-control source snippets. Full STM32F4 source tree, IAR/Keil projects, vendor libraries, generated output, and duplicate tool exports are not served. |
| `Legacy_螺线管阀门开发_Project` | 818 | Public legacy material. Published selected solenoid source files, IOC configuration, OLED/EC11 schematics, and ULN2003 reference. Vendor examples, executable tools, generated output, and uncurated full project folders are not served. |
| `Legacy_BLDC_QuietFan_Project` | 2 | Public legacy material. Published selected BOM and EasyEDA evidence under the actuator/fan archive. |
| `卷云硬件开发SOP_Awes0meE.pdf` | 1 | Public self-authored SOP. Copied as `hardware-development-sop-awes0mee.pdf` and linked from the SOP note. |
| `SOP封面.jpeg` | 1 | Public SOP cover image. Copied as `hardware-sop-cover.jpeg`. |
| `LOGO_temp.png` | 1 | Not used in this subtask. |
| `通用数据手册` | 3 | Reference-only compressor / driver datasheets. Not served by the website. |
| `实习证明` | 2 | Not published. Treat as private credential material. |
| `费用报销单 & 发票` | 46 | Not published. Treat as private financial evidence. |
| `卷云科技开票资料.docx` | 1 | Not published. Treat as private company billing material. |

## Privacy Boundary

The source folder was inspected to create portfolio notes. Current-product and private administrative files should not be made website-accessible:

- `Current_Product_ACUnit_Project*` raw design, firmware, and manufacturing files;
- `Current_Product_BaseUnit_Project*` STM32 firmware, vendor packages, and build outputs;
- ACUnit/BaseUnit Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source files, full firmware source dumps, internal requirement files, and manufacturing packages;
- invoices, reimbursements, billing information, and internship proof documents;
- executable installers;
- vendor package folders;
- generated build artifacts.

Non-Current_Product legacy folders can publish selected evidence when the file is small, relevant, and linked from the corresponding portfolio page. Do not publish entire raw folder dumps.

`visibility: private` only hides note pages from the website. It does not protect files committed to a public GitHub repository, and it does not make anything under `public/uploads/` private. Keep confidential raw files outside the public repo unless a later authenticated/private storage workflow is added.
