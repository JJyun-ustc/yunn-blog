// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 替换 '你的用户名' 为你的 GitHub 用户名
  // 如果仓库名是 yunn-blog，地址是：https://你的用户名.github.io/yunn-blog
  // 如果仓库名是你的用户名，地址是：https://你的用户名.github.io
    site: 'https://JJyun-ustc.github.io/yunn-blog',
  integrations: [mdx(), sitemap()],
  
  // 配置 Markdown 语法高亮
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});