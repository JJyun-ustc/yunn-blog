// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages 会自动添加仓库名作为 URL 前缀
  // 所以这里只需要设置 GitHub Pages 的域名
  site: 'https://jjyun-ustc.github.io',
  
  // 不要设置 base，GitHub Pages 会自动处理
  // base: '/yunn-blog/',  // ❌ 移除这个配置
  
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