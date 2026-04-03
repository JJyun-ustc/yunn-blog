# yunn-blog

基于 Astro 构建的个人博客，部署到 GitHub Pages，支持文章、分类、标签、归档、站内搜索、Giscus 评论和 TinaCMS 后台。

线上地址：`https://jjyun-ustc.github.io/yunn-blog/`

## 技术栈

- Astro 6
- Tailwind CSS 4
- MDX
- GitHub Pages
- Giscus
- TinaCMS

## 已实现功能

- 首页、文章列表、文章详情
- 分类页、标签页、归档页
- 站内搜索
- RSS 与 sitemap
- GitHub Pages 子路径部署
- Giscus 评论系统
- TinaCMS 后台入口 `/admin/`

## 本地开发

要求：

- Node.js `>= 22.12.0`
- npm

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认访问：

`http://localhost:4321`

本地启动 TinaCMS 开发模式：

```bash
npm run admin:dev
```

## 构建命令

构建站点：

```bash
npm run build
```

预览构建结果：

```bash
npm run preview
```

单独构建 Tina 后台：

```bash
npm run admin:build
```

说明：

- 正常生产构建走 `scripts/build-site.mjs`
- 如果未配置 Tina Cloud 凭据，构建会保留一个可访问的 `/admin/` 占位页
- 如果已配置 Tina Cloud 凭据，构建会生成正式 TinaCMS 后台

## 文章内容

文章目录：

`src/content/blog/`

新文章示例：

```md
---
title: '文章标题'
description: '文章摘要'
pubDate: 'Apr 04 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
category: '随笔'
tags: ['博客', '记录']
draft: false
---

正文内容
```

常用 frontmatter 字段：

- `title`: 文章标题
- `description`: 摘要
- `pubDate`: 发布时间
- `updatedDate`: 更新时间，可选
- `heroImage`: 封面图，可选
- `category`: 分类，可选
- `tags`: 标签数组，可选
- `draft`: 是否草稿，可选，默认 `false`

## 项目结构

```text
yunn-blog/
├─ .github/workflows/      # GitHub Pages 部署工作流
├─ public/                 # 静态资源
├─ scripts/build-site.mjs  # 生产构建入口
├─ src/
│  ├─ components/          # 页面组件
│  ├─ content/blog/        # 博客文章
│  ├─ layouts/             # 页面布局
│  ├─ pages/               # 路由页面
│  ├─ styles/              # 全局样式
│  ├─ utils/paths.ts       # GitHub Pages base 路径工具
│  ├─ consts.ts            # 站点常量
│  └─ content.config.ts    # 内容集合配置
├─ tina/
│  ├─ config.ts            # TinaCMS 配置
│  └─ tina-lock.json       # Tina Cloud 索引锁文件
├─ .env.example
├─ astro.config.mjs
└─ package.json
```

## GitHub Pages 部署

本项目按仓库子路径部署，Astro 配置如下：

- `site`: `https://jjyun-ustc.github.io`
- `base`: `/yunn-blog`

所以线上地址不是根域名首页，而是：

`https://jjyun-ustc.github.io/yunn-blog/`

部署方式：

1. 推送代码到 `main`
2. GitHub Actions 运行 `.github/workflows/deploy.yml`
3. 构建完成后自动发布到 GitHub Pages

## 评论系统配置

评论系统使用 Giscus，评论实际存储在 GitHub Discussions。

先决条件：

1. 仓库开启 `Discussions`
2. 安装 Giscus GitHub App
3. 在 `https://giscus.app/zh-CN` 生成配置

然后在 GitHub 仓库中添加 `Repository variables`：

- `PUBLIC_GISCUS_REPO`
- `PUBLIC_GISCUS_REPO_ID`
- `PUBLIC_GISCUS_CATEGORY`
- `PUBLIC_GISCUS_CATEGORY_ID`
- `PUBLIC_GISCUS_MAPPING`
- `PUBLIC_GISCUS_THEME`
- `PUBLIC_GISCUS_LANG`

推荐值：

- `PUBLIC_GISCUS_REPO=JJyun-ustc/yunn-blog`
- `PUBLIC_GISCUS_MAPPING=pathname`
- `PUBLIC_GISCUS_THEME=preferred_color_scheme`
- `PUBLIC_GISCUS_LANG=zh-CN`

## TinaCMS 后台配置

后台地址：

`/admin/`

线上完整地址：

`https://jjyun-ustc.github.io/yunn-blog/admin/`

TinaCMS 使用 Tina Cloud。要让线上后台可登录，需要：

1. 在 Tina Cloud 中创建并绑定仓库 `JJyun-ustc/yunn-blog`
2. 确认 `main` 分支已完成索引
3. 在 Tina Cloud 的 `Site URLs` 中加入：
   - `https://jjyun-ustc.github.io`
   - 如可填写，也建议加入 `https://jjyun-ustc.github.io/yunn-blog`
4. 在 GitHub 仓库 `Actions secrets` 中配置：
   - `TINA_PUBLIC_CLIENT_ID`
   - `TINA_TOKEN`

注意：

- 这两个值必须放在 `Repository secrets`，不是 `variables`
- 如果 Tina Cloud 项目重建过，要重新复制新的 `Client ID` 和 `Token`
- `tina/tina-lock.json` 已纳入仓库，用于 Tina Cloud 正确索引分支

## 环境变量

本地可参考仓库根目录下的 `.env.example`：

```bash
PUBLIC_GISCUS_REPO=JJyun-ustc/yunn-blog
PUBLIC_GISCUS_REPO_ID=
PUBLIC_GISCUS_CATEGORY=Announcements
PUBLIC_GISCUS_CATEGORY_ID=
PUBLIC_GISCUS_MAPPING=pathname
PUBLIC_GISCUS_THEME=preferred_color_scheme
PUBLIC_GISCUS_LANG=zh-CN

TINA_PUBLIC_CLIENT_ID=
TINA_TOKEN=
```

## 常见说明

- 普通访客不能直接修改博客页面
- 评论用户只能通过 GitHub 账号在 Giscus 中发表评论
- 真正能修改站点内容的人，是有仓库写权限的人，或者有 TinaCMS 后台编辑权限的人
- 页面更新机制是：内容变更 -> GitHub Actions 构建 -> GitHub Pages 重新部署

## 发布

提交并推送：

```bash
git add .
git commit -m "Update README"
git push origin main
```

推送后到 GitHub 的 `Actions` 查看最新 `Deploy to GitHub Pages` 工作流状态。
