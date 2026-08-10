---
trial: revised
input: 03-hardware-archive.md
skill_revision: final redesign snapshot
trial_agent: final_snapshot_03
---

# `final2` 到底 final 在哪里 / Which `Final` Was Final?

这个老 FOC 电机驱动文件夹最先抛出来的问题，不是某个器件怎么选，而是 `final` 和 `final2` 到底谁更 final。文件名、修改时间和文件里的日期互相对不上，靠排序找最新版，多少有点像让资源管理器临时兼职版本控制——它显然没收到这份任命。

## 一块板散落在六种文件里

把目录摊开以后，同一项硬件探索留下了几种完全不同的观察角度：板卡照片记录实物外观，原理图页描述电气连接，EasyEDA 工程与导出保存设计数据，Gerber 面向制板，BOM 与 PnP 表面向物料和贴装，STEP、3MF 模型则把视角转到机械外形。

这些材料放在一起，能确认的不是一条干净的开发时间线，而是这个文件夹确实覆盖了从电气设计到制造准备、再到机械模型的多个环节。它很像一张被拆散的地图：路还看得见，图例却混进了好几版。

## 连接器对上了，版本号还没有

一张板卡照片与某版原理图在几个主要连接器的位置上能够互相对应。这条线索很有用，因为它让照片不再只是“某块 FOC 板”的泛泛证明；至少可以把实物与一个具体的原理图候选联系起来。

但“看起来对得上”还不是版本身份证。现有材料没有可靠来源证明照片里的板就是按那一版原理图制造，也无法把 Gerber、BOM、PnP 和某个明确的原理图修订一一锁定。日期没有替文件名解围，文件名也没有替日期作证。

## Gerber 说明走到哪一步

Gerber 文件的存在说明至少有一个板卡修订进入了制造准备；BOM 和 PnP 表也表明归档里留下了物料与贴装数据。这个判断可以停在“准备过制造资料”，不能顺手滑到“完成了装配和调试”。

归档中没有完整的 bring-up 记录，没有测得的波形，也没有最终性能结果。因此，它不能证明板卡成功上电、FOC 闭环跑通，或某项指标达标。硬件文件看起来很齐全时，这条界线尤其容易被文件数量悄悄冲淡。

## 保存了文件，不等于包办了设计

另一个容易被目录完整度制造出来的错觉，是把所有设计动作都归到保存者名下。现有证据无法证明哪些工作由 Li Zhiyi 亲自完成，哪些来自协作者，哪些又是继承下来的材料。这里能写的是文件展示了什么，不能把 Gerber、原理图或机械模型自动改写成个人署名。

所以，这份归档最稳妥也最有信息量的读法，停在两条实证上：一块可见实物与某版原理图在主要连接器上互相照应；至少一版板卡走到了制造准备。至于具体是哪一版、由谁完成、上电后表现如何，文件名再喊几遍 `final` 也回答不了。

---

# Which `Final` Was Final? / `final2` 到底 final 在哪里

The first question raised by this old FOC motor-driver folder is not about component selection. It is whether `final` or `final2` was supposed to be more final. Filenames, modification times, and dates inside the files do not line up cleanly. Sorting the folder to find the latest revision feels like asking File Explorer to fill in as a version-control system, a job it was clearly never briefed for.

## One Board, Scattered Across Six File Types

The archive offers several different views of the same hardware exploration. Board photos capture the physical object. Schematic sheets describe electrical connections. An EasyEDA project and export preserve design data. Gerber files target board fabrication, BOM and PnP tables cover parts and placement data, and STEP and 3MF models shift the view to mechanical geometry.

Together, these files do not establish a clean development timeline. They do show that the folder spans several stages, from electrical design and manufacturing preparation to mechanical modelling. It reads like a map taken apart into separate sheets: the routes are still visible, but several revisions have been mixed into the legend.

## The Connectors Match; the Revision Still Does Not

One board photo visually matches the placement of several major connectors in one schematic revision. That is a useful clue. It makes the photo more informative than a generic image of “some FOC board” and links the physical object to a specific schematic candidate.

A visual match is not a revision identifier, though. Nothing reliable proves that the photographed board was manufactured from that schematic, and the available evidence does not lock the Gerber, BOM, PnP, and schematic files into one confirmed revision set. The dates do not rescue the filenames, and the filenames do not corroborate the dates.

## What the Gerbers Actually Establish

The Gerber files show that at least one board revision reached manufacturing preparation. The BOM and PnP tables also show that parts and placement data were retained in the archive. That supports “manufacturing files were prepared,” but it does not quietly extend to “the board was assembled and brought up.”

There is no complete bring-up log, measured waveform, or final performance result. The archive therefore cannot demonstrate that the board powered up successfully, that an FOC loop ran, or that any performance target was met. A folder can look impressively complete while still leaving the most important bench questions unanswered.

## Keeping the Files Does Not Claim the Design

The folder's apparent completeness can create one more misleading shortcut: assigning every design action to the person who retained the archive. The evidence does not establish which work Li Zhiyi completed personally, which came from collaborators, or which was inherited. The safe account is what each artifact shows, not an automatic personal claim over the schematic, Gerber, or mechanical model.

The most informative reading therefore ends with two supported findings: a visible board corresponds with one schematic revision at the major connectors, and at least one board revision reached manufacturing preparation. Which exact revision it was, who completed each design action, and what happened after power-up remain unanswered, no matter how many filenames insist that they are `final`.
