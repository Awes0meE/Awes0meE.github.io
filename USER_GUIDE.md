# Portfolio Website User Guide / 作品集网站使用说明书

English | 中文

## What This Website Is

This is Li Zhiyi / Awes0meE's personal engineering portfolio. It is designed for HR, supervisors, classmates, collaborators, and reviewers who want to understand the author's projects, technical direction, notes, and media evidence.

The site contains:

- Homepage: personal introduction and featured work
- Work: project case studies
- Notes: learning notes and technical writing
- Media: images, videos, dashboards, and experiment materials
- About: profile and contact information

## 这个网站是什么

这是 Li Zhiyi / Awes0meE 的个人工程作品集网站，面向 HR、导师、同学、合作方和评审者，用来展示项目、技术方向、学习笔记和图片/视频等证据材料。

网站包含：

- 首页：个人介绍和精选项目
- Work / 项目：项目案例
- Notes / 笔记：学习笔记和技术记录
- Media / 媒体：图片、视频、仪表盘和实验材料
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

发布新版本时：

1. 把最新代码推送到 GitHub。
2. 等 Vercel 自动重新构建网站。
3. 把公开域名或 Vercel 链接发给别人。

## Language Switch

The top-right `EN / 简中` button switches the main website UI between English and Simplified Chinese. The choice is saved in the browser, so refreshing the page keeps the selected language.

Long note or project body text is not automatically machine-translated. If a long article needs both languages, edit the MDX content manually.

## 语言切换

网页右上角的 `EN / 简中` 按钮可以把主要界面在英文和简体中文之间切换。选择会保存在浏览器里，刷新页面后仍然保持上次选择。

长篇项目正文和笔记正文不会自动机翻。如果某篇文章需要完整中英双语，需要手动编辑对应的 MDX 内容。

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

If `assetPaths` is set, the project page lists uploaded public files from those paths. Images and videos show previews, Markdown / text documents render as readable page content, source/code files render in code frames, and binary files open through direct links.

## 如何添加新项目

1. 复制 `content/projects/` 里面已有的一个文件。
2. 重命名，例如 `content/projects/my-new-project.mdx`。
3. 修改文件顶部的元数据。
4. 在元数据下面写项目介绍。
5. 保存文件，并在本地网站里检查效果。

如果把 `featured` 设置为 `true`，这个项目会显示在首页精选项目区域。

如果设置 `assetPaths`，项目页会列出这些公开路径下的上传资料。图片和视频会预览，Markdown 和文本文件会以正文形式显示，源码/代码文件会放进代码框，二进制文件会提供直接打开链接。

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

For project-file archives, add the file or folder path to the project's `assetPaths` field. This is the preferred way to show code snippets, Markdown notes, PDFs, Gerber archives, EDA files, spreadsheets, Word documents, and other project files inside a project page.

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

如果要把资料展示在某个项目页，把文件或文件夹路径加入该项目的 `assetPaths`。这是展示代码片段、Markdown 笔记、PDF、Gerber、EDA、表格、Word 文档和其他项目文件的推荐方式。

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
npm run build
```

If both checks and the build pass, the site is ready to publish.

## 发布前如何检查

分享新版本前，建议运行：

```bash
npm run lint
npm run validate-content
npm run build
```

内容校验和构建都通过，就说明网站可以发布。

## Suggested Maintenance Workflow

1. Start local preview with `npm run dev`.
2. Modify content or pages.
3. Check the website in the browser.
4. Run `npm run lint`, `npm run validate-content`, and `npm run build`.
5. Commit changes to Git.
6. Push to GitHub.
7. Let Vercel deploy the public version.

## 推荐维护流程

1. 用 `npm run dev` 启动本地预览。
2. 修改内容或页面。
3. 在浏览器检查网站效果。
4. 运行 `npm run lint`、`npm run validate-content` 和 `npm run build`。
5. 提交 Git 版本。
6. 推送到 GitHub。
7. 让 Vercel 自动部署公开版本。
