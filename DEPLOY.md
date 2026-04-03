# 🚀 博客部署完整指南（小白专用）

本指南将手把手教你如何将博客部署到 GitHub Pages，完全免费且无需服务器！

## 📋 目录

- [前置准备](#前置准备)
- [步骤一：安装必要软件](#步骤一安装必要软件)
- [步骤二：注册 GitHub 账号](#步骤二注册-github-账号)
- [步骤三：创建 GitHub 仓库](#步骤三创建-github-仓库)
- [步骤四：上传代码到 GitHub](#步骤四上传代码到-github)
- [步骤五：配置 GitHub Pages](#步骤五配置-github-pages)
- [步骤六：配置个人信息](#步骤六配置个人信息)
- [步骤七：配置评论系统](#步骤七配置评论系统)
- [常见问题](#常见问题)

---

## 前置准备

你需要准备：
- ✅ 一台电脑（Windows/Mac/Linux 都可以）
- ✅ 稳定的网络连接
- ✅ 一个邮箱（用于注册 GitHub）
- ✅ 30-60 分钟时间

---

## 步骤一：安装必要软件

### 1. 安装 Node.js

Node.js 是运行博客程序的必要环境。

#### Windows 系统：
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 **LTS（长期支持版）** 安装包
3. 双击安装包，一路点击"下一步"完成安装
4. 打开命令提示符（按 `Win + R`，输入 `cmd`，回车）
5. 输入命令验证安装：
   ```bash
   node -v
   npm -v
   ```
   如果显示版本号，说明安装成功！

#### Mac 系统：
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 **LTS 版本** 的 macOS 安装包
3. 双击安装包完成安装
4. 打开终端（在"启动台"中搜索"终端"）
5. 验证安装：
   ```bash
   node -v
   npm -v
   ```

### 2. 安装 Git

Git 是版本控制工具，用于上传代码到 GitHub。

#### Windows：
1. 访问 [Git 官网](https://git-scm.com/download/win)
2. 下载 Windows 版本
3. 双击安装，保持默认选项即可
4. 安装完成后，在任意文件夹右键，应该能看到"Git Bash Here"选项

#### Mac：
- **方式一**：安装 Xcode 命令行工具
  ```bash
  xcode-select --install
  ```
- **方式二**：访问 [Git 官网](https://git-scm.com/download/mac) 下载安装

---

## 步骤二：注册 GitHub 账号

### 1. 创建账号
1. 访问 [GitHub 官网](https://github.com/)
2. 点击右上角 **Sign up**（注册）
3. 输入邮箱、密码、用户名
4. 完成邮箱验证

### 2. 配置 Git 用户信息
打开终端（Windows 用 Git Bash），输入以下命令：

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

例如：
```bash
git config --global user.name "zhangsan"
git config --global user.email "zhangsan@example.com"
```

---

## 步骤三：创建 GitHub 仓库

### 1. 创建新仓库
1. 登录 GitHub
2. 点击右上角 **+** 号，选择 **New repository**
3. 填写仓库信息：
   - **Repository name**: `yunn-blog`（或你喜欢的名字）
   - **Description**: `我的个人博客`（可选）
   - **Public**: 选择 **Public**（公开，否则无法使用 GitHub Pages）
   - **不要勾选** "Add a README file"、"Add .gitignore"、"Choose a license"
4. 点击 **Create repository**

### 2. 记录仓库地址
创建后会看到仓库地址，类似：
```
https://github.com/你的用户名/yunn-blog.git
```
记下这个地址，后面会用到。

---

## 步骤四：上传代码到 GitHub

### 1. 初始化 Git 仓库

在博客项目文件夹中打开终端：
- **Windows**: 在文件夹空白处右键 → "Git Bash Here"
- **Mac**: 在终端中用 `cd` 命令进入文件夹

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 创建第一次提交
git commit -m "Initial commit: 初始化博客"
```

### 2. 连接远程仓库并推送

```bash
# 添加远程仓库（替换成你的仓库地址）
git remote add origin https://github.com/你的用户名/yunn-blog.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

首次推送时会弹出 GitHub 登录窗口，完成授权即可。

---

## 步骤五：配置 GitHub Pages

### 1. 启用 GitHub Pages
1. 进入你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. **Source** 选择 **GitHub Actions**
5. 保存

### 2. 等待自动部署
- 推送代码后，GitHub Actions 会自动构建和部署
- 点击仓库的 **Actions** 标签查看部署进度
- 大约 2-5 分钟后部署完成

### 3. 访问你的博客
部署成功后，在 Settings → Pages 页面会看到博客地址：
```
https://你的用户名.github.io/yunn-blog/
```

点击链接即可访问你的博客！🎉

---

## 步骤六：配置个人信息

### 1. 修改基本信息

编辑 `src/consts.ts` 文件：

```typescript
export const SITE_TITLE = '你的博客名字';
export const SITE_DESCRIPTION = '你的博客描述';
export const SITE_AUTHOR = '你的名字';
```

### 2. 修改 About 页面

编辑 `src/pages/about.astro`：
- 修改个人简介
- 更新技能列表
- 填写真实的社交链接和邮箱
- 修改经历时间线

### 3. 修改友链页面

编辑 `src/pages/friends.astro`：
- 更新 `siteInfo` 中的网站信息
- 添加或删除友情链接

### 4. 修改网站地址

编辑 `astro.config.mjs`：

```javascript
export default defineConfig({
  site: 'https://你的用户名.github.io/yunn-blog',
  // 其他配置...
});
```

### 5. 提交修改

```bash
git add .
git commit -m "更新个人信息"
git push
```

推送后，GitHub 会自动重新部署。

---

## 步骤七：配置评论系统

博客集成了 Giscus 评论系统（基于 GitHub Discussions）。

### 1. 创建评论仓库
1. 在 GitHub 创建一个新的**公开仓库**，命名为 `blog-comments` 或其他名字
2. 进入仓库 Settings → Features → 勾选 **Discussions**

### 2. 获取 Giscus 配置
1. 访问 [Giscus 官网](https://giscus.app/zh-CN)
2. 按照页面提示配置：
   - **仓库**: 输入你的评论仓库地址
   - **页面 ↔️ discussions 映射关系**: 选择"pathname"
   - **Discussion 分类**: 选择"Announcements"
3. 复制生成的配置信息

### 3. 更新博客配置

编辑 `src/components/Comments.astro`，替换以下值：

```javascript
const {
  repo = '你的用户名/blog-comments',  // 你的评论仓库
  repoId = '从 Giscus 页面复制',        // 仓库 ID
  category = 'Announcements',
  categoryId = '从 Giscus 页面复制',    // 分类 ID
  mapping = 'pathname',
  theme = 'preferred_color_scheme',
  lang = 'zh-CN'
} = Astro.props;
```

### 4. 提交更改

```bash
git add .
git commit -m "配置评论系统"
git push
```

---

## 日常使用

### 写新文章

1. 在 `src/content/blog/` 文件夹创建新的 `.md` 文件
2. 添加文章内容（参考现有文章格式）
3. 推送到 GitHub

示例：
```bash
# 创建新文章
# Windows: 在 src/content/blog/ 文件夹中新建 .md 文件
# Mac/Linux: 
touch src/content/blog/my-new-post.md

# 编辑完成后提交
git add .
git commit -m "发布新文章：文章标题"
git push
```

### 更新文章

1. 编辑对应的 `.md` 文件
2. 添加 `updatedDate` 字段：
   ```yaml
   ---
   title: '文章标题'
   pubDate: 'Jan 01 2026'
   updatedDate: 'Apr 03 2026'
   ---
   ```
3. 提交推送

---

## 常见问题

### Q1: 推送代码时提示"fatal: 'origin' already exists"
**A**: 这说明远程仓库已配置。使用以下命令更新：
```bash
git remote set-url origin https://github.com/你的用户名/yunn-blog.git
```

### Q2: 访问博客显示 404
**A**: 检查以下几点：
1. GitHub Pages 是否已启用（Settings → Pages）
2. Source 是否选择了 GitHub Actions
3. Actions 构建是否成功（查看 Actions 标签）
4. 是否等待了足够时间（首次部署需 2-5 分钟）

### Q3: 如何绑定自定义域名？
**A**: 
1. 在仓库根目录创建 `CNAME` 文件，内容为你的域名
2. 在域名服务商处添加 DNS 记录：
   - 类型: CNAME
   - 名称: www
   - 值: 你的用户名.github.io
3. 等待 DNS 生效（可能需要几小时）

### Q4: 如何修改主题颜色？
**A**: 编辑 `src/styles/global.css` 中的 CSS 变量：
```css
:root {
  --primary: #你喜欢的颜色;
  --accent: #辅助颜色;
}
```

### Q5: 本地预览博客
**A**: 在项目文件夹打开终端：
```bash
# 安装依赖
npm install

# 启动本地服务器
npm run dev
```
浏览器访问 `http://localhost:4321`

### Q6: 评论系统不显示
**A**: 检查：
1. 评论仓库是否公开
2. 是否启用了 Discussions 功能
3. Giscus 配置信息是否正确填写

### Q7: 图片无法显示
**A**: 
- 确保图片路径正确
- 图片文件放在 `public` 文件夹中
- 使用相对路径或绝对路径

### Q8: 如何删除文章？
**A**: 
1. 删除对应的 `.md` 文件
2. 或者在文章 frontmatter 中添加 `draft: true`

---

## 🎉 恭喜！

你已经成功部署了自己的博客！

### 下一步建议：
1. ✏️ 写第一篇文章
2. 🎨 自定义主题颜色和样式
3. 🔗 添加友链
4. 📢 分享你的博客给朋友

### 有问题？
- 查看项目 README.md
- 在 GitHub 创建 Issue
- 搜索相关错误信息

祝你写博客愉快！ 🎊
