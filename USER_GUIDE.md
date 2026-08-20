# Portfolio Website User Guide / 作品集网站使用说明书

English | 中文

## What This Website Is

This is Alvin Li's personal engineering portfolio, with iRidium / 铱 as the engineering archive brand. It is designed for HR, supervisors, classmates, collaborators, and reviewers who want to understand his projects, technical direction, notes, and media evidence.

The site contains:

- Homepage: personal introduction and featured work
- Work: project case studies
- Notes: learning notes and technical writing
- Media: images, videos, board renders, and experiment materials
- About: profile and contact information

## 这个网站是什么

这是 Alvin Li 的个人工程作品集网站，iRidium / 铱 作为工程档案品牌。网站面向 HR、导师、同学、合作方和评审者，用来展示项目、技术方向、学习笔记和图片/视频等证据材料。

网站包含：

- 首页：个人介绍和精选项目
- Work / 项目：项目案例
- Notes / 笔记：学习笔记和技术记录
- Media / 媒体：图片、视频、板卡渲染图和实验材料
- About / 关于：个人信息和联系方式

## How To Visit The Website On This Computer

If the local development server is already running, open:

```text
http://127.0.0.1:3000
```

If the page does not open, start the website first:

```bash
npm run dev
```

Then open the address above in a browser.

## 如何在这台电脑上访问网站

如果本地开发服务器已经启动，直接打开：

```text
http://127.0.0.1:3000
```

如果打不开，先启动网站：

```bash
npm run dev
```

然后再用浏览器打开上面的地址。

## How Other People Can Visit It

Other people should not use `127.0.0.1`; that address only works on your own computer.

The current public website is:

```text
https://www.66ccff-labs.com/
```

The Vercel deployment address is:

```text
https://awes0mee-portfolio.vercel.app/
```

The GitHub Pages address is only a fallback redirect. Share the custom domain or Vercel address instead.

To publish a new version:

1. Push the latest code to GitHub.
2. Let Vercel rebuild the site automatically.
3. Share the public domain or Vercel link.

## 如何让别人访问

别人不能访问你的 `127.0.0.1`，这个地址只代表你自己的电脑。

当前公开网站地址是：

```text
https://www.66ccff-labs.com/
```

Vercel 部署地址是：

```text
https://awes0mee-portfolio.vercel.app/
```

GitHub Pages 地址只作为跳转兜底使用。对外请发自定义域名或 Vercel 地址。

发布新版本时：

1. 把最新代码推送到 GitHub。
2. 等 Vercel 自动重新构建网站。
3. 把公开域名或 Vercel 链接发给别人。

## Language Switch

The top-right `EN / ZH` or `EN / 简中` button switches the main website UI between English and Simplified Chinese. The choice is saved in the browser, so refreshing the page keeps the selected language.

Long note or project body text is not automatically machine-translated. If a long article needs both languages, edit the MDX content manually.

## 语言切换

网页右上角的 `EN / 简中` 或 `EN / ZH` 按钮可以把主要界面在英文和简体中文之间切换。选择会保存在浏览器里，刷新页面后仍然保持上次选择。

长篇项目正文和笔记正文不会自动机翻。如果某篇文章需要完整中英双语，需要手动编辑对应的 MDX 内容。

## Header Brand, Homepage Education, And Atom Visual

The header brand is always the English wordmark `iRidium`; switching the site to Chinese does not replace it with `铱`. Its approved mark and transparent B-style script wordmark live under `public/brand/`. Keep the upper-left and lower-right blocks of the mark equal in size and preserve the compact 26px wordmark height.

The homepage education block uses a full-width row for `Nanyang Technological University, Singapore`, followed by a two-column undergraduate row labelled as dual-degree awards. The two undergraduate degrees are listed separately under Xi'an Jiaotong-Liverpool University and the University of Liverpool; `First Class Honours` belongs to the University of Liverpool degree.

The homepage technical visual is maintained in `components/technical-visual.tsx` and `components/technical-visual.module.css`. Five prototype images from `public/uploads/hero/` form a slowly rotating nucleus. Three equal-sized orbits are separated by 60 degrees, and each orbit carries five evenly spaced technology marks representing embedded systems, firmware development, or engineering tools.

The prototype images and technology marks are presentation material only. They do not prove that a pictured board was fabricated or validated, and the marks do not imply affiliation, endorsement, or proficiency. Technology-mark sources are documented in `public/skills/icons/README.md`; institution-mark sources are documented in `public/education/README.md`.

The orbit and nucleus motion pauses when the visual is offscreen or the browser document is hidden. If the operating system requests reduced motion, the visual becomes a static composition. The frontend refresh is maintained on the separate `feat/frontend-refresh` topic branch and is not released: only the homepage has been redesigned, while Work, Notes, Media, About, and their detail pages keep their existing structures.

## 页头品牌、首页学校信息与原子可视化

页头品牌名始终使用英文 `iRidium`，切换到中文界面也不会变成“铱”。已确认的图形标记和 B 款透明花体字标保存在 `public/brand/`；维护时要保持图形左上角与右下角方块等大，并保留字标 26px 的紧凑显示高度。

首页教育区第一行显示南洋理工大学及硕士在读信息，第二行以双栏明确展示西交利物浦大学与英国利物浦大学授予的本科双学位；“一等荣誉学位”归在英国利物浦大学学位下。

首页技术可视化由 `components/technical-visual.tsx` 和 `components/technical-visual.module.css` 维护。`public/uploads/hero/` 中的五张 prototype 图片组成缓慢旋转的核团；三条尺寸一致的轨道互成 60 度，每条轨道上有五个等距技术标识，分别代表嵌入式系统、固件开发或工程工具。

prototype 图片和技术标识只用于展示。它们不能证明某块板卡已经制造或完成验证，标识也不表示关联、背书或熟练度。技术标识来源记录在 `public/skills/icons/README.md`，学校标识来源记录在 `public/education/README.md`。

当可视化离开视口或浏览器页面被隐藏时，轨道和核团动效会暂停；如果操作系统启用了“减少动态效果”，可视化会降级为静态构图。当前前端刷新保存在独立的 `feat/frontend-refresh` 主题分支，尚未发布：只有首页完成了重构，Work、Notes、Media、About 及其详情页继续使用原有结构。

## How To Modify Text

Most portfolio content is stored as text files.

Project files:

```text
content/projects/
```

Note files:

```text
content/notes/
```

Media metadata:

```text
content/media.json
```

Open a file, modify the English and Chinese text, save it, then refresh the browser.

## 如何修改文字

大部分作品集内容都保存在普通文本文件里。

项目文件：

```text
content/projects/
```

笔记文件：

```text
content/notes/
```

媒体数据：

```text
content/media.json
```

打开文件，修改里面的中文和英文内容，保存后刷新浏览器即可看到变化。

## Note Visibility

Notes have a visibility switch in the file header:

```yaml
visibility: public
```

Use `public` when the note can appear on the website. Use `private` when the note is a draft or should not be visible to normal visitors.

This only hides the note from the website. It does not make the source file private if the GitHub repository is public.

## 笔记可见性

笔记文件头部有一个可见性开关：

```yaml
visibility: public
```

`public` 表示这篇笔记会显示在网站上；`private` 表示暂时隐藏，适合草稿或者暂时不想公开的内容。

这个开关只控制网站显示，不代表 GitHub 仓库里的源文件也是私密的。

## How To Add A New Project

1. Copy an existing file from `content/projects/`.
2. Rename it, for example `content/projects/my-new-project.mdx`.
3. Edit the metadata at the top:

```yaml
---
title: "English Project Name"
titleZh: "中文项目名称"
summary: "Short English summary"
summaryZh: "中文简短介绍"
date: "2026.05 to Now"
status: "In Progress"
tags: ["Next.js", "Control", "Robotics"]
cover: "/uploads/visuals/circuit-board.svg"
featured: false
links:
  repo: "https://github.com/Awes0meE/example"
assetPaths:
  - "/uploads/projects/my-new-project"
---
```

4. Write the project story below the metadata.
5. Save the file and check the website locally.

If `featured: true`, the project appears on the homepage featured section.

If `assetPaths` is set, the project page shows uploaded public files in a file browser. The left side is a project-file index, and the right side previews the selected file. Images and videos show inline previews, Markdown / text documents render as readable page content, source/code files render in code frames, PDFs embed from page one where the browser supports it, and binary files keep direct open links. Relative images and links inside uploaded Markdown are resolved from the source file path. HTML and SVG files are kept as download-only artifacts.

## 如何添加新项目

1. 复制 `content/projects/` 里面已有的一个文件。
2. 重命名，例如 `content/projects/my-new-project.mdx`。
3. 修改文件顶部的元数据。
4. 在元数据下面写项目介绍。
5. 保存文件，并在本地网站里检查效果。

如果把 `featured` 设置为 `true`，这个项目会显示在首页精选项目区域。

如果设置 `assetPaths`，项目页会用文件浏览器展示这些公开路径下的上传资料。左侧是项目文件索引，右侧是当前文件预览。图片和视频会内嵌预览，Markdown 和文本文件会以正文形式显示，源码/代码文件会放进代码框，PDF 会尽量从第一页内嵌预览，二进制文件保留直接打开链接。上传 Markdown 里的相对图片和链接会按源文件位置解析；HTML 和 SVG 文件只作为下载附件保留。

## How To Add Images Or Videos

Put image or video files under:

```text
public/uploads/
```

Example:

```text
public/uploads/projects/pid/demo-board.jpg
```

Use it in content with a public path:

```text
/uploads/projects/pid/demo-board.jpg
```

For media gallery items, edit `content/media.json`. Add `titleZh` and `captionZh` if the card needs Chinese text for the language switch, and use `projectSlug` so the card can show its source project.

For project-file archives, add the file or folder path to the project's `assetPaths` field. This is the preferred way to show code snippets, Markdown notes, PDFs, Gerber archives, EDA files, spreadsheets, Word documents, and other project files inside a project-page browser.

Keep uploaded text-like files in UTF-8 before publishing them. This includes Markdown, TXT, CSV, source code, XML, HTML, and EDA/manufacturing text exports. The site now checks Git-managed text files with `npm run validate-encoding`.

## 如何添加图片或视频

把图片或视频文件放到：

```text
public/uploads/
```

例如：

```text
public/uploads/projects/pid/demo-board.jpg
```

在内容里使用时，路径写成：

```text
/uploads/projects/pid/demo-board.jpg
```

如果要添加到媒体库，编辑 `content/media.json`。如果媒体卡片需要支持中文切换，补上 `titleZh` 和 `captionZh`；如果媒体属于某个项目，补上 `projectSlug`。

如果要把资料展示在某个项目页，把文件或文件夹路径加入该项目的 `assetPaths`。这是把代码片段、Markdown 笔记、PDF、Gerber、EDA、表格、Word 文档和其他项目文件放进项目页文件浏览器的推荐方式。

上传前要把文本类文件统一成 UTF-8，包括 Markdown、TXT、CSV、源码、XML、HTML、EDA/制造导出的文本资料。网站现在会通过 `npm run validate-encoding` 检查 Git 管理的文本文件编码。

## What Not To Publish

Do not put private or unnecessary files into the public website folder. Avoid publishing invoices, reimbursements, billing records, internship proof documents, executable installers, downloaded vendor packages, and generated build outputs.

For company projects, also avoid putting Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source files, firmware source dumps, desktop source dumps, and internal manufacturing packages under `public/uploads/` unless they have been reviewed and desensitized. Under the current Juanyun public boundary, `Current_Product_ACUnit_Project*` and `Current_Product_BaseUnit_Project*` remain sensitive, while non-Current_Product legacy folders may publish selected reviewed evidence after pruning installers, vendor/dependency folders, generated build output, private proof files, and uncurated raw dumps.

Files in `public/uploads/` are public after deployment even when no page links to them.

## 不要公开哪些文件

不要把私密或没必要公开的文件放进网站公开目录。不要发布发票、报销单、开票资料、实习证明、exe 安装包、下载来的 vendor 包和编译生成物。

公司项目还要额外谨慎：Gerber、原理图 PDF、BOM/PnP、EDA/CAD 源文件、固件源码、桌面端源码和内部制造资料不要直接放进 `public/uploads/`，除非已经明确脱敏审核过。在当前卷云公开边界里，`Current_Product_ACUnit_Project*` 和 `Current_Product_BaseUnit_Project*` 仍然敏感；非 Current_Product 的 legacy 文件夹可以发布筛选后的公开证据，但要排除安装包、vendor/依赖目录、构建输出、证明文件和未整理的原始整包。

`public/uploads/` 里的文件部署后就是公开静态文件，就算页面没有链接也不能当私密存储用。

## How To Check Before Publishing

Before sharing a new version, run:

```bash
npm run lint
npm run validate-content
npm run validate-encoding
npm run typecheck
npm run build
```

On Windows PowerShell, use the `npm.cmd` form of the same commands. `npm run lint` already includes content validation and encoding validation, but the individual commands are useful when checking one layer. Full machine setup is documented in `docs/environment-toolchain.md`.

If checks and the build pass, the site is ready to publish.

## 发布前如何检查

分享新版本前，建议运行：

```bash
npm run lint
npm run validate-content
npm run validate-encoding
npm run typecheck
npm run build
```

在 Windows PowerShell 里使用同样命令的 `npm.cmd` 形式。`npm run lint` 已经包含内容校验和编码校验，但单独命令方便只检查其中一层。

校验和构建都通过，就说明网站可以发布。

## Suggested Maintenance Workflow

1. Start local preview with `npm run dev`.
2. Modify content or pages.
3. Check the website in the browser.
4. Run `npm run lint`, `npm run validate-content`, `npm run validate-encoding`, `npm run typecheck`, and `npm run build`.
5. Commit the reviewed changes on a topic branch.
6. Push the topic branch and open a pull request.
7. Review the pull-request diff and Vercel preview, then merge after checks pass.
8. Fast-forward local `main` from GitHub; Vercel deploys the merged version automatically.

## 推荐维护流程

1. 用 `npm run dev` 启动本地预览。
2. 修改内容或页面。
3. 在浏览器检查网站效果。
4. 运行 `npm run lint`、`npm run validate-content`、`npm run validate-encoding`、`npm run typecheck` 和 `npm run build`。
5. 在 topic branch 上提交已经检查过的改动。
6. 推送 topic branch，并创建 pull request。
7. 检查 PR diff 与 Vercel 预览，所有检查通过后再合并。
8. 从 GitHub 快进同步本地 `main`；Vercel 会自动部署合并后的公开版本。
