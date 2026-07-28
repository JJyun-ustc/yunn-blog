// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const base = '/yunn-blog';

function prefixMarkdownImagePaths() {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== 'object') return;

      if (node.tagName === 'img' && node.properties?.src) {
        const src = String(node.properties.src);
        const isAssetImage = src.startsWith('/images/') || src.startsWith('images/');
        const isAlreadyPrefixed = src.startsWith(`${base}/`);

        if (isAssetImage && !isAlreadyPrefixed) {
          node.properties.src = `${base}/${src.replace(/^\/+/, '')}`;
        }
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  // GitHub Pages URL
  site: 'https://jjyun-ustc.github.io',
  
  // 仓库名作为 base 路径 - 这会让所有链接自动添加 /yunn-blog/ 前缀
  base,
  trailingSlash: 'always',
  
  integrations: [mdx(), sitemap()],
  
  // 配置 Markdown 语法高亮
  markdown: {
    rehypePlugins: [prefixMarkdownImagePaths],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
