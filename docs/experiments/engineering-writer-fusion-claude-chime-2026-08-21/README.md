# Claude Chime 冷启动笔记重构

这是一次已经通过用户评审的融合重构记录。用户于 2026-08-21 确认采用，重构稿于 2026-08-22 提升为线上正文。

- 线上笔记：[`content/notes/claude-chime-cold-start-battery-protection.mdx`](../../../content/notes/claude-chime-cold-start-battery-protection.mdx)
- 已采用的重构快照：[`01-fused-rewrite.mdx`](./01-fused-rewrite.mdx)
- 前后对比：[`comparison.md`](./comparison.md)

线上原文在本次实验开始时的 SHA-256 为 `0f3a16cbbb751992c20c1c8290e14822d0f09d31c082b6ad5839fa1a2097a6d7`。已采用重构稿与替换后的线上文件 SHA-256 均为 `73fcbd880aa125893b65366b8eb6d665e7d0040918c572ddeb7acbce089ea811`。

## 使用范围

重构稿使用当前仓库内 `skills/engineering-note-writer` 的完整流程完成，范围包括英文与中文标题、摘要、小标题、认知路线、段落边界和正文。日期、标签、公开状态、`projectSlug`、三张图片、项目动作、测试归属和客户反馈归属保持不变。

本次没有借用其他作者的 persona，也没有增加新的第一人称经历或情绪。原有的 PCB 嫌疑、双路 Boost 取舍、螃蟹动作带来的压降风险、5.5 V 误判和测量边界仍然属于李知宜自己的认知路线。

## 资料边界

重构使用了线上原文、Claude Chime 项目页、软件交接文档和项目已确认的事实边界。新增技术核对只来自三份原厂资料：

- [TI TLV61048 数据手册](https://www.ti.com/lit/ds/symlink/tlv61048.pdf)
- [Fortune DW01A 数据手册](https://www.ic-fortune.com/upload/Download/DW01A-DS-13_EN.pdf)
- [Microchip MCP73831 数据手册](https://ww1.microchip.com/downloads/aemDocuments/documents/APID/ProductDocuments/DataSheets/MCP73831-Family-Data-Sheet-DS20001984H.pdf)

原厂资料只用于解释现在如何理解软启动、保护检测和充电使能，没有被写成当时已经完成的测量。

## 采用状态

`01-fused-rewrite.mdx` 作为用户批准版本的冻结快照保留在 `docs/experiments`，本身不由网站内容加载器发布。线上笔记已经采用同一份内容，发布验证与远端记录见仓库会话日志。
