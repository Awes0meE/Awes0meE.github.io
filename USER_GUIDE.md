# Portfolio Website User Guide / 作品集网站使用说明书

English | 中文

## What This Website Is

This is Alvin Li's personal engineering portfolio, with iRidium / 铱 as the engineering archive brand. It is designed for HR, supervisors, classmates, collaborators, and reviewers who want to understand his projects, technical direction, notes, and media evidence.

The site contains:

- Homepage: personal introduction and featured work
- Work: project case studies
- Notes: learning notes and technical writing
- Media: images, videos, board renders, and experiment materials
- About: a CV-grounded identity, working-method, and contact route

## 这个网站是什么

这是 Alvin Li 的个人工程作品集网站，iRidium / 铱 作为工程档案品牌。网站面向 HR、导师、同学、合作方和评审者，用来展示项目、技术方向、学习笔记和图片/视频等证据材料。

网站包含：

- 首页：个人介绍和精选项目
- Work / 项目：项目案例
- Notes / 笔记：学习笔记和技术记录
- Media / 媒体：图片、视频、板卡渲染图和实验材料
- About / 关于：以简历事实为边界的个人路径、工作方法和联系方式

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

1. Commit reviewed changes on a topic branch and push that branch to GitHub.
2. Open a pull request, review its diff and Vercel preview, and merge only after checks pass.
3. Let Vercel deploy the merged `main` commit automatically, then verify the public routes before sharing them.

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

1. 在主题分支提交已审核的修改，并把该分支推送到 GitHub。
2. 创建 Pull Request，检查 diff 和 Vercel 预览，所有检查通过后再合并。
3. 等 Vercel 自动部署合并后的 `main`，验证公开路由后再分享域名或 Vercel 链接。

## Language Switch

The top-right `EN / ZH` or `EN / 简中` button switches the main website UI between English and Simplified Chinese. The choice is saved in the browser, so refreshing the page keeps the selected language.

Long note or project body text is not automatically machine-translated. If a long article needs both languages, edit the MDX content manually.

## 语言切换

网页右上角的 `EN / 简中` 或 `EN / ZH` 按钮可以把主要界面在英文和简体中文之间切换。选择会保存在浏览器里，刷新页面后仍然保持上次选择。

长篇项目正文和笔记正文不会自动机翻。如果某篇文章需要完整中英双语，需要手动编辑对应的 MDX 内容。

## Header Brand, Shared Navigation, Homepage Education, And Atom Visual

The header brand is always the English wordmark `iRidium`; switching the site to Chinese does not replace it with `铱`. Its approved mark and transparent B-style script wordmark live under `public/brand/`. Keep the upper-left and lower-right blocks of the mark equal in size and preserve the compact 26px wordmark height.

On every `.signal-theme` desktop header, each navigation label has a subdued `01`–`04` prefix. English labels use the same display face as `Project evidence index`; hover, keyboard focus, and the current section reveal one Ember line across both the number and label, while pressing gives a short tactile response. The mobile navigation remains unnumbered. Reduced-motion mode keeps the current/focus signal but removes movement and transition effects.

The homepage education block uses a full-width row for `Nanyang Technological University, Singapore`, followed by a two-column undergraduate row labelled as dual-degree awards. The two undergraduate degrees are listed separately under Xi'an Jiaotong-Liverpool University and the University of Liverpool; `First Class Honours` belongs to the University of Liverpool degree.

The homepage technical visual is maintained in `components/technical-visual.tsx` and `components/technical-visual.module.css`. Five prototype images from `public/uploads/hero/` form a slowly rotating nucleus. Three equal-sized orbits are separated by 60 degrees, and each orbit carries five evenly spaced technology marks representing embedded systems, firmware development, or engineering tools.

The prototype images and technology marks are presentation material only. They do not prove that a pictured board was fabricated or validated, and the marks do not imply affiliation, endorsement, or proficiency. Technology-mark sources are documented in `public/skills/icons/README.md`; institution-mark sources are documented in `public/education/README.md`.

The orbit and nucleus motion pauses when the visual is offscreen or the browser document is hidden. If the operating system requests reduced motion, the visual becomes a static composition. The frontend refresh is maintained on the separate `feat/frontend-refresh` topic branch and is not released. Ember Black is enabled per route through `.signal-theme`; Work, Notes, Media, and About now use their own Project Aperture Sequence, Routed Signal Map, project-first Focus Aperture, and Tension Signal Column, while project and note detail pages keep the paper system. See `DESIGN.md` for the current route scope.

## 页头品牌、共享导航、首页学校信息与原子可视化

页头品牌名始终使用英文 `iRidium`，切换到中文界面也不会变成“铱”。已确认的图形标记和 B 款透明花体字标保存在 `public/brand/`；维护时要保持图形左上角与右下角方块等大，并保留字标 26px 的紧凑显示高度。

每个 `.signal-theme` 桌面页头都会在四个导航标签前显示低透明度的 `01`–`04` 编号。英文标签使用与 `Project evidence index` 相同的展示字体；鼠标悬浮、键盘聚焦和当前栏目状态会显示一条贯穿编号与文字的橙色信号线，按下时提供短促反馈。移动端导航不显示编号；“减少动态效果”模式仍保留当前项和焦点提示，但取消位移与过渡动画。

首页教育区第一行显示南洋理工大学及硕士在读信息，第二行以双栏明确展示西交利物浦大学与英国利物浦大学授予的本科双学位；“一等荣誉学位”归在英国利物浦大学学位下。

首页技术可视化由 `components/technical-visual.tsx` 和 `components/technical-visual.module.css` 维护。`public/uploads/hero/` 中的五张 prototype 图片组成缓慢旋转的核团；三条尺寸一致的轨道互成 60 度，每条轨道上有五个等距技术标识，分别代表嵌入式系统、固件开发或工程工具。

prototype 图片和技术标识只用于展示。它们不能证明某块板卡已经制造或完成验证，标识也不表示关联、背书或熟练度。技术标识来源记录在 `public/skills/icons/README.md`，学校标识来源记录在 `public/education/README.md`。

当可视化离开视口或浏览器页面被隐藏时，轨道和核团动效会暂停；如果操作系统启用了“减少动态效果”，可视化会降级为静态构图。当前前端刷新保存在独立的 `feat/frontend-refresh` 主题分支，尚未发布。Ember Black 通过 `.signal-theme` 按路由启用；Work、Notes、Media 与 About 已分别采用项目检视窗序列、路由信号图、项目优先的深焦检视窗和张力信号柱，项目与笔记详情页继续使用 paper system。当前路由范围以 `DESIGN.md` 为准。

## Using The Work Project Aperture

On `/work`, the desktop `01`–`08` rail stays visible while eight large project chapters pass through the inspection stage. Each chapter is one complete link and exposes authentic imagery, status, timeline, focus, summary, and evidence availability. On mobile, the rail becomes a horizontal locator above the vertical chapter sequence.

Seven spacious black signal intervals separate adjacent projects. Their short orange ticks move from right to left, pause when the interval is offscreen or the browser document is hidden, and become static when the operating system requests reduced motion. The moving ticks mean “next record”; they do not report progress, telemetry, or completion.

## 使用项目检视窗

`/work` 的桌面版会固定显示 `01`–`08` 定位 rail，右侧依次展示 8 个大型项目章节。每个章节本身就是一个完整链接，并显示真实项目图像、状态、时间、方向、摘要和证据可用性；移动端会把 rail 改成位于纵向章节上方的横向定位条。

相邻项目之间共有 7 段留白更大的黑色信号间隔。橙色短竖线由右向左移动；间隔离开视口或浏览器页面被隐藏时暂停，操作系统启用“减少动态效果”时保持静态。这些短竖线只表示“下一条档案”，不表示进度、遥测或项目完成度。

## Using The Notes Routed Index

On `/notes`, choose one of the eight project channels or use the project dropdown, then narrow the 24 linked public records by frontmatter year. Search matches English and Chinese titles, summaries, tags, and related project names. The result count updates with the controls, and Reset restores the complete ledger.

Each ledger row is one complete link to the note detail. Dates describe archive coverage rather than a strict activity timeline, and `/notes/[slug]` deliberately keeps the paper reading surface.

## 使用笔记路由索引

在 `/notes` 中，可以直接选择 8 个项目通道之一，也可以使用项目下拉框，再按 frontmatter 年份缩小当前 24 篇已关联公开笔记的范围。搜索会匹配中英文标题、摘要、标签和关联项目名；结果数会随条件更新，“重置”会恢复完整台账。

每条台账记录都是进入笔记详情的完整链接。日期只表示档案覆盖，不代表严格的工程活动时间线；`/notes/[slug]` 会继续使用适合阅读的 paper surface。

## Using The Media Focus Aperture

On `/media`, choose one of eight project sources to load that project's authentic lead record in the Focus Aperture. Homepage media thumbnails carry their project source into this chooser. The complete 84-record archive remains grouped by project below, where each chapter keeps its context, case-study link, and source records together.

Technical evidence is shown with contain fitting so schematics, PCB renders, and board photographs remain complete. The aperture reveal and scan stop when the operating system requests reduced motion; project identity, selection state, and all links remain available.

## 使用媒体深焦检视窗

在 `/media` 中，选择 8 个项目来源之一，就会在深焦检视窗中加载该项目的一条真实主记录。首页媒体缩略图会把项目来源带入这个选择器。完整的 84 条档案仍按项目分组保留在下方，每个章节会把工程背景、案例链接和来源记录放在一起。

原理图、PCB 渲染和板卡照片使用 contain 适配，避免为了版式裁掉技术证据。操作系统启用“减少动态效果”时，检视窗显现和扫描线会停止，但项目身份、选择状态和所有链接仍然可用。

## Reading The About Tension Column

On `/about`, the opening field introduces Alvin's route from telecommunications study into connected embedded work, then the lower ledger anchors that method in selected CV-grounded contexts and current study. Project, GitHub, and email actions remain direct links; the page is an identity-and-method narrative rather than a second homepage capability list.

The portrait is intentionally shown as its complete original white field with black line art. The four route nodes describe system framing, firmware and protocols, bring-up and measurement, and handoff and iteration; they are not a skill score or progress indicator. One restrained pulse stops when the column is offscreen or the document is hidden, and reduced-motion mode keeps the full route visible without animation.

## 阅读关于页张力信号柱

`/about` 首屏介绍 Alvin 从通信工程学习走向相互连接的嵌入式工作的路径，下方台账再用经过简历事实约束的经历与当前学习状态说明这套工作方法。项目、GitHub 与邮箱入口都是直接链接；这个页面讲个人路径与方法，不再重复首页的能力清单。

头像刻意保留原图完整白底与黑色线稿。四个节点分别表示系统界定、固件与协议、bring-up 与测量、交接与迭代，不是技能评分或进度条。一次克制的脉冲会在信号柱离开视口或页面被隐藏时停止；“减少动态效果”模式会保留完整静态路径，不依赖动画传达信息。

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
date: "2026.05"
status: "In Progress"
tags: ["Next.js", "Control", "Robotics"]
cover: "/uploads/projects/my-new-project/cover.jpg"
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

For project-linked media records, edit `content/media.json`. Add `titleZh` and `captionZh` when the record needs Chinese text for the language switch, and set `projectSlug` so the record appears inside the correct project chapter on `/media`.

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

如果要添加项目媒体记录，编辑 `content/media.json`。如果记录需要支持中文切换，补上 `titleZh` 和 `captionZh`；同时设置 `projectSlug`，让它进入 `/media` 中正确的项目分区。

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
npm audit --omit=dev
```

On Windows PowerShell, use the `npm.cmd` form of the same commands. `npm run lint` already includes content validation and encoding validation, but the individual commands are useful when checking one layer. Full machine setup is documented in `docs/environment-toolchain.md`.

For visual changes, also review English and Chinese at desktop and mobile widths, check horizontal overflow, links, interactive states, and reduced motion, then review the pull-request diff and Vercel preview. Passing commands alone does not authorize publication.

## 发布前如何检查

分享新版本前，建议运行：

```bash
npm run lint
npm run validate-content
npm run validate-encoding
npm run typecheck
npm run build
npm audit --omit=dev
```

在 Windows PowerShell 里使用同样命令的 `npm.cmd` 形式。`npm run lint` 已经包含内容校验和编码校验，但单独命令方便只检查其中一层。

视觉修改还要在桌面端与移动端检查中英文、横向溢出、链接、交互状态和“减少动态效果”，再检查 Pull Request diff 与 Vercel 预览。命令通过本身不代表已经批准发布。

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
