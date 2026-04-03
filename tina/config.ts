import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "博客文章",
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "发布日期",
            required: true,
          },
          {
            type: "datetime",
            name: "updatedDate",
            label: "更新日期",
          },
          {
            type: "image",
            name: "heroImage",
            label: "封面图片",
          },
          {
            type: "string",
            name: "category",
            label: "分类",
            required: true,
            options: ["随笔", "读书", "生活", "旅行", "美食"],
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "boolean",
            name: "draft",
            label: "草稿",
          },
          {
            type: "rich-text",
            name: "body",
            label: "正文",
            isBody: true,
            templates: [
              {
                name: "blockquote",
                label: "引用",
                fields: [
                  {
                    type: "string",
                    name: "quote",
                    label: "引用内容",
                    required: true,
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "作者",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
