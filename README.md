# yunn-blog ✨

一个功能完善、美观现代的个人博客，使用 Astro 构建，部署在 GitHub Pages。

## 🌟 特性

### 核心功能
- ✅ **移动端响应式设计** - 完美适配各种设备
- ✅ **暗黑模式** - 自动跟随系统设置，也可手动切换
- ✅ **文章目录（TOC）** - 自动生成，滚动高亮
- ✅ **阅读统计** - 显示阅读时间和字数
- ✅ **阅读进度条** - 顶部渐变进度指示
- ✅ **全站搜索** - 快速查找文章
- ✅ **分类和标签** - 文章分类管理
- ✅ **归档页面** - 按时间线展示所有文章

### 增强功能
- ✅ **评论系统** - 集成 Giscus（基于 GitHub Discussions）
- ✅ **图片灯箱** - 点击图片放大查看
- ✅ **代码高亮** - 支持 100+ 编程语言
- ✅ **代码复制** - 一键复制代码块
- ✅ **上一篇/下一篇** - 文章导航
- ✅ **返回顶部** - 一键返回页面顶部
- ✅ **友情链接** - 友链展示和申请
- ✅ **RSS 订阅** - 支持 RSS 阅读器订阅
- ✅ **SEO 优化** - 完善的 SEO 配置

### 内容管理
- ✅ **Markdown/MDX 支持** - 写作更自由
- ✅ **TinaCMS 集成** - 可视化内容管理
- ✅ **草稿功能** - 未发布的文章不会显示

## 🚀 快速开始

### 前置要求
- Node.js 22.12.0 或更高版本
- npm 或 pnpm

### 安装

```bash
# 克隆仓库
git clone https://github.com/你的用户名/yunn-blog.git

# 进入项目目录
cd yunn-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 `http://localhost:4321` 查看博客。

### 构建

```bash
npm run build
```

构建产物在 `dist` 文件夹中。

### 预览构建结果

```bash
npm run preview
```

## 📁 项目结构

```
yunn-blog/
├── .github/              # GitHub 配置
│   └── workflows/        # GitHub Actions 工作流
├── public/               # 静态资源
│   ├── fonts/            # 字体文件
│   ├── favicon.ico       # 网站图标
│   └── favicon.svg
├── src/
│   ├── assets/           # 图片等资源
│   ├── components/       # Astro 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── BlogCard.astro
│   │   ├── TableOfContents.astro
│   │   ├── ReadingProgress.astro
│   │   ├── BackToTop.astro
│   │   ├── Comments.astro
│   │   ├── ImageLightbox.astro
│   │   ├── CodeCopy.astro
│   │   └── ...
│   ├── content/          # 博客内容
│   │   └── blog/         # 文章 Markdown 文件
│   ├── layouts/          # 页面布局
│   │   └── BlogPost.astro
│   ├── pages/            # 页面路由
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── friends.astro
│   │   ├── 404.astro
│   │   ├── blog/
│   │   ├── categories/
│   │   ├── tags/
│   │   ├── archive/
│   │   └── search.astro
│   ├── styles/           # 全局样式
│   │   └── global.css
│   ├── consts.ts         # 站点配置
│   ├── content.config.ts # 内容集合配置
│   └── utils/            # 工具函数
├── astro.config.mjs      # Astro 配置
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 写文章

### 创建新文章

在 `src/content/blog/` 文件夹中创建新的 `.md` 文件：

```markdown
---
title: '文章标题'
description: '文章描述'
pubDate: 'Apr 03 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
category: '随笔'
tags: ['标签1', '标签2']
draft: false
---

文章内容...

## 二级标题

正文内容...

### 三级标题

更多内容...
```

### Frontmatter 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 文章标题 |
| `description` | string | ✅ | 文章描述（用于 SEO 和分享） |
| `pubDate` | string | ✅ | 发布日期 |
| `updatedDate` | string | ❌ | 更新日期 |
| `heroImage` | string | ❌ | 封面图片路径 |
| `category` | string | ❌ | 分类（默认：随笔） |
| `tags` | string[] | ❌ | 标签数组 |
| `draft` | boolean | ❌ | 是否草稿（默认：false） |

## 🎨 自定义配置

### 修改站点信息

编辑 `src/consts.ts`：

```typescript
export const SITE_TITLE = '你的博客名字';
export const SITE_DESCRIPTION = '你的博客描述';
export const SITE_AUTHOR = '你的名字';
```

### 修改主题颜色

编辑 `src/styles/global.css`：

```css
:root {
  --primary: #8B5CF6;      /* 主色调 */
  --primary-dark: #7C3AED;  /* 主色调深色 */
  --primary-light: #A78BFA; /* 主色调浅色 */
  --accent: #F472B6;        /* 辅助色 */
  --accent-light: #F9A8D4;  /* 辅助色浅色 */
}
```

### 配置评论系统

1. 创建 GitHub 仓库并启用 Discussions
2. 访问 https://giscus.app/zh-CN 获取配置
3. 编辑 `src/components/Comments.astro`

详细步骤请查看 [DEPLOY.md](./DEPLOY.md)。

## 🚀 部署

### 部署到 GitHub Pages

详细部署指南请查看 **[DEPLOY.md](./DEPLOY.md)**，包含：
- 环境搭建
- GitHub 账号注册
- 仓库创建
- 代码上传
- GitHub Pages 配置
- 评论系统配置
- 常见问题解答

### 其他部署平台

博客也可以部署到：
- **Vercel** - 推荐，简单快速
- **Netlify** - 功能强大
- **Cloudflare Pages** - 全球 CDN

## 🛠️ 技术栈

- **框架**: [Astro](https://astro.build) - 现代化静态站点生成器
- **样式**: [Tailwind CSS](https://tailwindcss.com) - 实用优先的 CSS 框架
- **内容**: [TinaCMS](https://tinacms.org) - 可视化内容管理
- **部署**: GitHub Pages
- **评论**: [Giscus](https://giscus.app) - 基于 GitHub Discussions

## 📖 文档

- [部署指南](./DEPLOY.md) - 小白专用的详细部署教程
- [Astro 文档](https://docs.astro.build)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [Astro](https://astro.build) - 优秀的静态站点生成器
- [Tailwind CSS](https://tailwindcss.com) - 强大的 CSS 框架
- [Giscus](https://giscus.app) - 简洁的评论系统

---

**Made with ❤️ by yunn_**
