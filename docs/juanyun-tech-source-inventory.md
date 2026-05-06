# Juanyun Technology Source Inventory

Date: 2026-05-06

Source path inspected:

```text
F:\XJTLU\工作相关\卷云科技有限责任公司
```

This document records how the raw source folder was mapped into the portfolio branch `content/juanyun-tech`.

## Public Portfolio Mapping

The public website content lives in:

```text
content/projects/juanyun-thermal-hardware.mdx
content/projects/juanyun-acunit-control-platform.mdx
content/projects/juanyun-baseunit-control-firmware.mdx
content/projects/juanyun-dht-sensor-breakout-board.mdx
content/notes/juanyun-*.mdx
content/media.json
public/uploads/projects/juanyun-tech/
```

## Source Folder Summary

| Source folder | Approx. files | Portfolio treatment |
| --- | ---: | --- |
| `Current_Product_ACUnit_Project` | 1210 | Standalone current-product case-study material: AC unit PCB V2.0/V2.1, system block diagrams, PCB renders, schematics, SOP, selected STM32 external unit firmware source evidence, and V2.1 manufacturing exports. |
| `Current_Product_BaseUnit_Project` | 1659 | Standalone firmware project, public notes, selected source evidence, and component datasheets for STM32 base unit firmware: DHT11/DHT22, IR presence detection, fan PWM, OLED UI, Bluetooth report, Flash persistence. |
| `DHT11 AM2302 温湿度传感器模块小板开发任务计划书.pdf` | 1 | Standalone small hardware planning project and public note for the DHT11/AM2302 sensor breakout board. |
| `Legacy_DIY压风式散热器_Project` | 536 | Standalone archived project plus public note, with video, schematic, ESP32 sketch, and 3D print previews. |
| `Legacy_慧驱动FOC_Project` | 4762 | Standalone archived project plus public note with FOC PCB Gerber and STEP model; code details still need a later review. |
| `Legacy_螺线管阀门开发_Project` | 818 | Standalone actuator/fan archive project plus public note; selected project source files and ULN2003 schematic are published, while vendor example packages are not. |
| `Legacy_BLDC_QuietFan_Project` | 2 | Included in the actuator/fan archive project with BOM and EDA project attachment. |
| `通用数据手册` | 3 | Supporting compressor/driver datasheet note for the AC unit control platform. |
| `实习证明` | 2 | Not published. Treat as private credential material. |
| `费用报销单 & 发票` | 46 | Not published. Treat as private financial evidence. |
| `卷云科技开票资料.docx` | 1 | Not published. Treat as private company billing material. |

## Public Assets Added

```text
public/uploads/projects/juanyun-tech/acunit-v20-development-sop.pdf
public/uploads/projects/juanyun-tech/acunit-v20-requirements.pdf
public/uploads/projects/juanyun-tech/acunit-v20-system-block.png
public/uploads/projects/juanyun-tech/acunit-app.c
public/uploads/projects/juanyun-tech/acunit-bsp-comp.c
public/uploads/projects/juanyun-tech/acunit-bsp-eev.c
public/uploads/projects/juanyun-tech/acunit-bsp-ntc.c
public/uploads/projects/juanyun-tech/acunit-bsp-oled.c
public/uploads/projects/juanyun-tech/acunit-firmware-pinout.md
public/uploads/projects/juanyun-tech/acunit-firmware-readme.md
public/uploads/projects/juanyun-tech/acunit-product-acunit.ioc
public/uploads/projects/juanyun-tech/acunit-release-notes-v05.md
public/uploads/projects/juanyun-tech/acunit-svc-control.c
public/uploads/projects/juanyun-tech/acunit-svc-sensor.c
public/uploads/projects/juanyun-tech/acunit-svc-ui.c
public/uploads/projects/juanyun-tech/acunit-v21-main-back.png
public/uploads/projects/juanyun-tech/acunit-v21-main-bom.xlsx
public/uploads/projects/juanyun-tech/acunit-v21-main-front.png
public/uploads/projects/juanyun-tech/acunit-v21-main-gerber.zip
public/uploads/projects/juanyun-tech/acunit-v21-main-pick-place.csv
public/uploads/projects/juanyun-tech/acunit-v21-main-pcb.pdf
public/uploads/projects/juanyun-tech/acunit-v21-main-schematic.pdf
public/uploads/projects/juanyun-tech/acunit-v21-power-back.png
public/uploads/projects/juanyun-tech/acunit-v21-power-bom.xlsx
public/uploads/projects/juanyun-tech/acunit-v21-power-front.png
public/uploads/projects/juanyun-tech/acunit-v21-power-gerber.zip
public/uploads/projects/juanyun-tech/acunit-v21-power-pick-place.csv
public/uploads/projects/juanyun-tech/acunit-v21-power-pcb.pdf
public/uploads/projects/juanyun-tech/acunit-v21-power-schematic.pdf
public/uploads/projects/juanyun-tech/acunit-v21-system-block.png
public/uploads/projects/juanyun-tech/acunit-v21-ui-back.png
public/uploads/projects/juanyun-tech/acunit-v21-ui-bom.xlsx
public/uploads/projects/juanyun-tech/acunit-v21-ui-front.png
public/uploads/projects/juanyun-tech/acunit-v21-ui-gerber.zip
public/uploads/projects/juanyun-tech/acunit-v21-ui-pick-place.csv
public/uploads/projects/juanyun-tech/acunit-v21-ui-pcb.pdf
public/uploads/projects/juanyun-tech/acunit-v21-ui-schematic.pdf
public/uploads/projects/juanyun-tech/baseunit-app.c
public/uploads/projects/juanyun-tech/baseunit-32k-crystal-datasheet.pdf
public/uploads/projects/juanyun-tech/baseunit-ao4407-mosfet-datasheet.pdf
public/uploads/projects/juanyun-tech/baseunit-bluetooth.c
public/uploads/projects/juanyun-tech/baseunit-dc005-power-jack-datasheet.pdf
public/uploads/projects/juanyun-tech/baseunit-ec11-encoder-datasheet.pdf
public/uploads/projects/juanyun-tech/baseunit-fan.c
public/uploads/projects/juanyun-tech/baseunit-firmware-readme.md
public/uploads/projects/juanyun-tech/baseunit-nvstore.c
public/uploads/projects/juanyun-tech/baseunit-product-base.ioc
public/uploads/projects/juanyun-tech/baseunit-ss12d10g6-slide-switch-datasheet.pdf
public/uploads/projects/juanyun-tech/baseunit-ss8050-bjt-datasheet.pdf
public/uploads/projects/juanyun-tech/baseunit-x32258-8mhz-crystal-datasheet.pdf
public/uploads/projects/juanyun-tech/baseunit-xl1509-3v3-dcdc-datasheet.pdf
public/uploads/projects/juanyun-tech/bldc-quiet-fan-bom.xlsx
public/uploads/projects/juanyun-tech/bldc-quiet-fan-driver.epro
public/uploads/projects/juanyun-tech/cirro-logo.png
public/uploads/projects/juanyun-tech/dht11-am2302-board-plan.pdf
public/uploads/projects/juanyun-tech/diy-cooling-3d-print-preview-1.jpg
public/uploads/projects/juanyun-tech/diy-cooling-3d-print-preview-2.jpg
public/uploads/projects/juanyun-tech/diy-cooling-desktop-demo.mp4
public/uploads/projects/juanyun-tech/diy-cooling-esp32.ino
public/uploads/projects/juanyun-tech/diy-cooling-schematic.pdf
public/uploads/projects/juanyun-tech/foc-driver-gerber.zip
public/uploads/projects/juanyun-tech/foc-driver-pcb-3d.step
public/uploads/projects/juanyun-tech/ge2117-v2-compressor-driver-manual.pdf
public/uploads/projects/juanyun-tech/hardware-sop-cover.jpeg
public/uploads/projects/juanyun-tech/juanyun-hardware-sop-awes0mee.pdf
public/uploads/projects/juanyun-tech/panasonic-6md030z-24v-compressor-datasheet.pdf
public/uploads/projects/juanyun-tech/solenoid-valve-control.ioc
public/uploads/projects/juanyun-tech/solenoid-valve-control-main.c
public/uploads/projects/juanyun-tech/solenoid-valve-control-valve.c
public/uploads/projects/juanyun-tech/uln2003-stepper-driver-schematic.pdf
public/uploads/projects/juanyun-tech/zh204-24v-compressor-datasheet.pdf
```

## Privacy Boundary

The user asked to put the folder contents into the portfolio branch. The implementation intentionally publishes technical evidence first and excludes obvious private or sensitive files from the served app:

- invoices;
- reimbursements;
- billing information;
- internship proof documents;
- raw vendor package folders;
- full build artifacts and generated object files.

Before merging this branch into `main`, review all public PDFs and download attachments again. This matters because the GitHub repository and Vercel deployment can become public-facing once pushed or merged.
