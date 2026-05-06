# Portfolio Website User Guide / 作品集网站使用说明书

English | [中文](#中文说明)

## What This Website Is

This is a personal engineering portfolio for Li Zhiyi / Awes0meE. It is designed for visitors such as HR, supervisors, classmates, collaborators, and reviewers who want to understand the author's projects, technical direction, notes, and media evidence.

The site contains:

- Homepage: personal introduction and featured work
- Work: project case studies
- Notes: learning notes and technical writing
- Media: images, videos, dashboards, and experiment materials
- About: profile and contact information

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

## How Other People Can Visit It

Other people should not use `127.0.0.1`; that address only works on your own computer.

To let others visit the website, deploy it online. The recommended method is Vercel:

1. Push the latest code to GitHub.
2. Log in to Vercel.
3. Import the GitHub repository.
4. Keep the default Next.js build settings.
5. Deploy.
6. Share the Vercel website link with HR, teachers, or friends.

After deployment, every time you push new changes to GitHub, Vercel can rebuild and update the public website automatically.

## How To Modify Text

Most portfolio content is stored as simple text files.

To edit projects:

```text
content/projects/
```

To edit notes:

```text
content/notes/
```

Open a `.mdx` file, modify the English and Chinese text, save it, then refresh the browser.

## How To Add A New Project

1. Copy an existing file from `content/projects/`.
2. Rename it, for example:

```text
content/projects/my-new-project.mdx
```

3. Edit the top metadata section:

```yaml
---
title: "English Project Name"
titleZh: "中文项目名"
summary: "Short English summary"
summaryZh: "中文简短介绍"
date: "2026.05 to Now"
status: "In Progress"
tags: ["Next.js", "Control", "Robotics"]
cover: "/uploads/visuals/circuit-board.svg"
featured: false
links:
  repo: "https://github.com/Awes0meE/example"
---
```

4. Write the project story below the metadata.
5. Save the file and check the website locally.

If `featured: true`, the project appears on the homepage featured section.

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

For media gallery items, edit:

```text
content/media.json
```

Add a new object with title, type, thumbnail, date, and caption.

## How To Check Before Publishing

Before sharing a new version, run:

```bash
npm run lint
npm run build
```

If both commands pass, the site is ready to publish.

## Suggested Maintenance Workflow

1. Start local preview with `npm run dev`.
2. Modify content or pages.
3. Check the website in the browser.
4. Run `npm run lint` and `npm run build`.
5. Commit changes to Git.
6. Push to GitHub.
7. Let Vercel deploy the public version.

## Notes For HR Or Non-Technical Visitors

If you are reading this as a visitor, you only need the public website link. The GitHub repository is mainly for source code and development history.

---

## 中文说明

## 这个网站是什么

这是 Li Zhiyi / Awes0meE 的个人工程作品集网站。它面向 HR、导师、同学、合作者和评审者，用来展示作者的项目、技术方向、学习笔记和图片/视频等证据材料。

网站包含：

- 首页：个人介绍和精选项目
- Work / 项目：项目案例
- Notes / 笔记：学习笔记和技术记录
- Media / 媒体：图片、视频、仪表盘和实验材料
- About / 关于：个人信息和联系方式

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

## 如何让别人访问

别人不能访问你的 `127.0.0.1`，因为这个地址只代表你自己的电脑。

如果想让 HR、老师或朋友访问，需要把网站部署到线上。推荐使用 Vercel：

1. 把最新代码推送到 GitHub。
2. 登录 Vercel。
3. 导入这个 GitHub 仓库。
4. 保持默认 Next.js 构建设置。
5. 点击部署。
6. 把 Vercel 生成的网站链接发给别人。

部署完成后，以后每次推送新代码到 GitHub，Vercel 都可以自动重新构建并更新公开网站。

## 如何修改文字

大部分作品集内容都保存在普通文本文件里。

修改项目：

```text
content/projects/
```

修改笔记：

```text
content/notes/
```

打开 `.mdx` 文件，修改里面的中文和英文内容，保存后刷新浏览器即可看到变化。

## 如何添加新项目

1. 复制 `content/projects/` 里面已有的一个文件。
2. 重命名，例如：

```text
content/projects/my-new-project.mdx
```

3. 修改文件顶部的元数据：

```yaml
---
title: "English Project Name"
titleZh: "中文项目名"
summary: "Short English summary"
summaryZh: "中文简短介绍"
date: "2026.05 to Now"
status: "In Progress"
tags: ["Next.js", "Control", "Robotics"]
cover: "/uploads/visuals/circuit-board.svg"
featured: false
links:
  repo: "https://github.com/Awes0meE/example"
---
```

4. 在元数据下面写项目介绍。
5. 保存文件，并在本地网站里检查效果。

如果把 `featured` 设置为 `true`，这个项目会显示在首页精选项目区域。

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

如果要添加到媒体图库，编辑：

```text
content/media.json
```

添加包含标题、类型、缩略图、日期和说明的新对象。

## 发布前如何检查

分享新版本前，建议运行：

```bash
npm run lint
npm run build
```

两个命令都通过，就说明网站可以发布。

## 推荐维护流程

1. 用 `npm run dev` 启动本地预览。
2. 修改内容或页面。
3. 在浏览器检查网站效果。
4. 运行 `npm run lint` 和 `npm run build`。
5. 提交 Git 版本。
6. 推送到 GitHub。
7. 让 Vercel 自动部署公开版本。

## 给 HR 或非技术访客的说明

如果你只是访问者，只需要公开网站链接即可。GitHub 仓库主要用于保存源码和开发历史。
