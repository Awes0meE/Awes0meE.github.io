---
trial: baseline
input: 03-hardware-archive.md
skill_revision: pre-redesign working tree
---

Draft type: Hardware archive / 硬件归档型

Assumptions: 时间范围未知；全文只依据目录中的文件线索，不归属个人设计、制造或调试动作；页面展示经过脱敏的截图与文件说明，不提供原始制造文件路径。

Chinese draft:

# 靠文件线索读一份旧 FOC 硬件目录

## 从一张板卡照片开始

这个旧目录与一段早期 FOC 电机驱动探索有关。打开以后，能看到板卡照片、原理图、EasyEDA 工程与导出文件、Gerber、BOM、PnP 表格，以及 STEP、3MF 机械模型。材料种类很全，版本关系却有点野：`final`、`final2` 和几个日期同时出现，文件修改时间也排不出一条可信的开发顺序。

按文件名直接认定“最终版”很容易走偏。更稳妥的读法，是把照片、原理图、制造文件和机械模型放在一起相互对照，有点像靠文件名考古，再用文件内容纠正文件名留下的错觉。

## 这些文件分别说明什么

板卡照片提供了最直观的实物线索。其中一张照片的主要连接器位置与某版原理图能够对应，这让照片和电气资料之间建立了联系。这个对应关系还不足以锁定实际制造所采用的原理图版本，因为目录里没有可靠的版本号、生产记录或装配记录把两者明确连起来。

EasyEDA 工程与导出文件说明目录中保留了可继续检查的设计资料。Gerber 文件把证据推进到制造准备阶段，至少有一个板卡版本完成过面向加工的文件输出。BOM 和 PnP 表格分别记录元件清单与贴装位置，不过混乱的命名和时间戳意味着这些文件不能自动视为同一版本的一整套生产包。

STEP 与 3MF 模型又补上了机械侧的线索：板形、连接器高度和空间关系曾被转换成三维形式。它们能帮助理解结构考虑，现有材料还无法证明模型是否用于完整装配检查，也没有装机照片或干涉检查记录可以继续验证。

## 最容易读错的地方

这组材料最容易制造两种错觉。文件很多，会让人以为开发过程已经完整；Gerber、BOM 和三维模型放在一起，也容易让人顺手推到“已经完成制造和验证”。现有证据能确认设计资料存在，并且至少推进到了制造文件准备。板卡究竟对应哪一版原理图、是否完成系统 bring-up、运行表现怎样，仍然没有可靠答案。

个人贡献也需要停在证据能够支持的位置。目录中没有可靠来源区分哪些设计动作由 Li Zhiyi 完成，哪些来自协作者或继承材料。因此，这里可以描述“目录中保存了什么”“照片与哪部分图纸能够对应”，暂时不把原理图绘制、PCB 设计、下单、焊接或调试归到某个人名下。

## 页面里值得留下的线索

页面中适合展示的是经过脱敏的板卡照片、局部原理图截图，以及对几类文件作用的简短说明：

- 板卡照片：观察连接器、板形和主要器件区域；
- 原理图截图：与照片中的接口位置交叉比对；
- EasyEDA 文件说明：确认存在可继续检查的 EDA 设计资料；
- Gerber、BOM、PnP 说明：确认制造准备曾经发生，并保留版本未对齐的提醒；
- STEP、3MF 说明：补充板卡三维形态和机械空间线索。

这些材料已经足够把目录读成一条硬件探索线，却还撑不起完整的 FOC 性能案例。目录中缺少 bring-up 日志、实测波形、故障记录和最终性能结果。电机是否稳定起转、电流采样是否进入闭环、PWM 与相电流波形是否合理，这些问题都要等待新的记录。

## 现在回头看

老硬件目录的价值，经常藏在不同文件之间的对应关系里。照片回答“板子大概长什么样”，原理图回答“电气连接可能怎样组织”，Gerber 和表格回答“设计推进到了哪一步”，机械模型则留下空间结构的痕迹。把这些线索并排阅读，比追着某个 `final2` 文件猜版本可靠得多。

后面最值得补的，是一张版本对应表：照片、原理图、PCB、Gerber、BOM/PnP 和机械模型分别属于哪个版本，依据是什么。再往后才是 bring-up 记录、PWM 与相电流波形、故障现象和性能数据。有了这些，旧目录才能从“材料很多”继续走到“过程能够被复现”。

English counterpart:

# Reading an Old FOC Hardware Folder Through File Clues

## Starting With a Board Photo

This old folder is associated with an early FOC motor-driver exploration. It contains board photos, schematic sheets, an EasyEDA project and exports, Gerber files, BOM and PnP tables, plus STEP and 3MF mechanical models. The range of material is substantial, but the revision trail is messy: names such as `final` and `final2` coexist with dates that do not form a trustworthy development sequence.

Treating the filename marked “final” as the definitive revision would be risky. A more reliable reading comes from comparing the photos, schematics, fabrication files, and mechanical models together—something close to filename archaeology, with the contents used to correct the impressions left by the names.

## What Each File Type Can Show

The board photos provide the most direct physical clues. Major connector positions in one photo visually match a particular schematic revision, creating a useful link between the physical board and the electrical documents. The exact manufactured schematic revision remains unknown because the folder has no reliable revision identifier, production record, or assembly record that connects them explicitly.

The EasyEDA project and exports show that inspectable design material remains in the archive. The Gerber files take the evidence as far as manufacturing preparation: at least one board revision was exported in a fabrication-ready form. The BOM and PnP tables record component and placement information, although the inconsistent names and timestamps prevent them from being treated automatically as one synchronized manufacturing package.

The STEP and 3MF models add a mechanical view. Board shape, connector height, and spatial relationships were represented in three dimensions. They help explain the structural side of the exploration, while the available material provides no assembly photo or interference-check record that would demonstrate a completed mechanical fit review.

## Where the Archive Can Be Misread

The volume of material can create an impression of a complete development process. Gerber files, BOM tables, and 3D models together can also suggest that manufacturing and validation were completed. The evidence supports a narrower conclusion: design material exists, and at least one revision reached manufacturing-file preparation. The manufactured schematic revision, system bring-up status, and runtime performance remain unresolved.

Authorship must stay within the same evidential limit. Nothing reliable in the folder separates Li Zhiyi’s personal design actions from work contributed by collaborators or inherited from earlier material. The note can describe what the archive contains and which parts of the photo and schematic correspond. Schematic capture, PCB layout, ordering, soldering, and debugging should remain unattributed until stronger evidence appears.

## Clues Worth Showing on the Page

The page can use selected desensitized board photos, cropped schematic screenshots, and short explanations of the available file types:

- Board photos: show connector placement, board shape, and major component regions.
- Schematic screenshots: support comparison with the visible interfaces on the board.
- EasyEDA file description: confirms that inspectable EDA design material exists.
- Gerber, BOM, and PnP descriptions: show manufacturing preparation while preserving the warning that revisions may not align.
- STEP and 3MF descriptions: add clues about the board’s three-dimensional form and mechanical space.

This is enough to make the folder readable as a hardware exploration trail. It does not yet support a complete FOC performance case. There is no bring-up log, measured waveform, fault record, or final performance result. Reliable motor startup, the current-sampling path into the control loop, and the quality of the PWM and phase-current waveforms all remain open questions.

## Looking Back

The useful part of an old hardware folder often sits in the relationships between different files. A photo suggests what the board looked like. A schematic suggests how its electrical connections were organized. Gerber files and manufacturing tables indicate how far preparation progressed. Mechanical models preserve traces of the spatial design. Reading these clues side by side is more reliable than guessing the revision from a file called `final2`.

The most useful next addition would be a revision map connecting each photo, schematic, PCB file, Gerber set, BOM/PnP table, and mechanical model, together with the evidence for each match. Bring-up notes, PWM and phase-current waveforms, fault observations, and performance data would come next. Those records would let the folder progress from “many surviving files” to a process that another reader can follow and reproduce.

Suggested title/summary/tags:

- `title`: `Reading an Old FOC Hardware Folder Through File Clues`
- `titleZh`: `靠文件线索读一份旧 FOC 硬件目录`
- `summary`: `A cautious reading of an old FOC motor-driver folder through board photos, schematics, EasyEDA exports, fabrication tables, and mechanical models, with unresolved revision, authorship, and bring-up questions kept explicit.`
- `summaryZh`: `从板卡照片、原理图、EasyEDA 导出、制造表格和机械模型交叉阅读一份旧 FOC 电机驱动目录，并保留版本、作者归属与 bring-up 记录上的未解问题。`
- `tags`: `["FOC", "Motor Control", "PCB", "Hardware Archive"]`

Open questions:

- 哪一版原理图和 PCB 文件实际对应照片中的板卡？
- Gerber、BOM 与 PnP 表格能否通过内部版本标记重新配成同一套制造资料？
- 是否还能找到 bring-up 日志、波形、故障记录或明确的工作分工说明？
