// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 重要：替换 '你的用户名' 为你的 GitHub 用户名
  // 例如：site: 'https://zhangsan.github.io/yunn-blog'
  site: 'https://你的用户名.github.io/yunn-blog',
  
  // 如果仓库名不是你的用户名.github.io，需要添加 base 配置
  // 例如仓库名是 yunn-blog，base 应该是 '/yunn-blog/'
  base: '/yunn-blog/',
  
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