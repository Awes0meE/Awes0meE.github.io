# Juanyun Technology Source Inventory

Date: 2026-05-06

Source path inspected:

```text
F:\XJTLU\工作相关\卷云科技有限责任公司
```

This document records how the raw Juanyun source folder is represented in the portfolio. It is a source-to-portfolio map, not permission to publish the raw source tree.

## Current Public Boundary

On `feature/note-visibility`, the website keeps the Juanyun notes public, but only serves a small approved media set from:

```text
public/uploads/projects/juanyun-tech/
```

The current website-accessible files are:

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
```

No Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source files, firmware source files, manufacturing packages, or raw company document bundles should be present under `public/uploads/projects/juanyun-tech/` without explicit desensitization review.

## Portfolio Content Mapping

The public-facing writing lives in:

```text
content/projects/juanyun-*.mdx
content/notes/juanyun-*.mdx
content/media.json
```

The current branch contains 7 Juanyun project pages and 13 Juanyun notes. Notes use `visibility: public` or `visibility: private`; on this branch the Juanyun notes are public so their writing can be reviewed in the live portfolio layout.

## Source Folder Summary

| Source folder | Approx. files | Portfolio treatment |
| --- | ---: | --- |
| `Current_Product_ACUnit_Project` | 1210 | Used for public case-study writing, block diagrams, PCB render screenshots, parameter screenshots, and AC unit notes. Raw schematic, Gerber, BOM/PnP, EDA source, firmware source, and manufacturing exports are not served by the website on `feature/note-visibility`. |
| `Current_Product_BaseUnit_Project` | 1659 | Used for base-unit firmware narrative and learning notes. Raw STM32 project files, source code, vendor packages, and build output are not served. |
| `DHT11 AM2302 温湿度传感器模块小板开发任务计划书.pdf` | 1 | Used as background for the DHT11/AM2302 small-board project note. The original PDF is not served on the current branch. |
| `Legacy_DIY压风式散热器_Project` | 536 | Used for the DIY cooling prototype project and note. Current public evidence is limited to two 3D-print preview images and one prototype demo video. Gerber, EasyEDA, DWG, 3MF, source code, installers, vendor packages, and build outputs are not served. |
| `Legacy_慧驱动FOC_Project` | 4762 | Used for an archive-style FOC driver project and note. Raw Gerber, STEP, BOM/PnP, EasyEDA, source code, and datasheets are not served on this branch. |
| `Legacy_螺线管阀门开发_Project` | 818 | Used for actuator/fan archive writing. Raw source, schematics, and vendor examples are not served. |
| `Legacy_BLDC_QuietFan_Project` | 2 | Mentioned inside the actuator/fan archive. Raw BOM and EDA files are not served. |
| `通用数据手册` | 3 | Used as reference for compressor/driver discussion. The original datasheet PDFs are not served on the current branch. |
| `实习证明` | 2 | Not published. Treat as private credential material. |
| `费用报销单 & 发票` | 46 | Not published. Treat as private financial evidence. |
| `卷云科技开票资料.docx` | 1 | Not published. Treat as private company billing material. |

## Privacy Boundary

The source folder was inspected to create portfolio notes, but company-sensitive files should not be made website-accessible:

- Gerber archives;
- schematic PDFs;
- BOM and pick-and-place files;
- EDA/CAD source files;
- firmware or desktop source-code dumps;
- internal requirement and manufacturing packages;
- invoices, reimbursements, and billing information;
- internship proof documents;
- executable installers;
- vendor package folders;
- generated build artifacts.

`visibility: private` only hides note pages from the website. It does not protect files committed to a public GitHub repository, and it does not make anything under `public/uploads/` private. Keep confidential raw files outside the public repo unless a later authenticated/private storage workflow is added.
