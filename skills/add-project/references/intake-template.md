# Intake Template Reference

Use this when the user provides a folder but not enough project context.

## Minimum User Prompt

The user can say:

```text
使用 AddProject.skill，把 `D:\Portfolio_Inbox\my-project` 整理成作品集新项目。
先审查公开风险，再更新网页。
```

If details are missing, ask for only the most important missing item. Prefer continuing from source evidence when reasonable.

## Recommended Source Folder Shape

```text
<source_path>/
  00-项目说明.md
  images/
  videos/
  docs/
  notes/
  source-snippets/
  hardware-files/
  private-do-not-publish/
```

This shape is helpful but not required. Do not fail just because the source folder is messy.

## Project Brief Fields

Look for or ask for:

```text
项目名：
英文名：
时间：
状态：已完成 / 进行中 / 课程项目 / 实习项目 / 归档项目
背景：
我做了什么：
技术栈：
最想展示的证据：
哪些资料可以公开：
哪些资料不能公开：
是否涉及公司、客户、老师、队友或第三方隐私：
希望语气：学习记录 / 工程归档 / 实习项目 / 课程项目 / 产品原型
```

## Operation Types

Classify the request:

- `new-project`: create a new project page, notes, media, and uploads.
- `update-project`: add material or revise an existing project.
- `media-only`: add images/videos to `/media` and optionally project pages.
- `note-only`: create or update notes.
- `cleanup`: remove or hide risky/stale public material.
- `release`: merge, tag, push, or verify live deployment.

## Questions To Ask Only When Needed

Ask one concise question when blocked:

- "Which existing project slug should these materials attach to?"
- "Can these company files be public, or should I only use them as reference?"
- "Do you want this to stop on a preview branch, or merge to main after review?"
- "Is this folder allowed to be copied into the public website, excluding private/noisy files?"

Do not ask the user to provide metadata that can be inferred safely from files and docs.

## Default Assumptions

When the user does not specify:

- Create a branch and stop at preview by default.
- Do not merge to `main` until the user approves.
- Use `featured: false` unless the user says the project should be homepage-featured.
- Treat missing note visibility as private.
- Prefer one strong project page plus a few useful notes over many thin pages.
- Keep private source files outside the repo.
