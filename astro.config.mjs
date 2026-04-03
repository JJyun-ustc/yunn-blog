// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages 地址
  site: 'https://jjyun-ustc.github.io',
  
  // 仓库名作为 base 路径（关键配置）
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