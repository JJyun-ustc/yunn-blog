import { execSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const publicAdminDir = resolve(rootDir, 'public', 'admin');
const adminIndexPath = resolve(publicAdminDir, 'index.html');

const tinaClientId = process.env.TINA_PUBLIC_CLIENT_ID;
const tinaToken = process.env.TINA_TOKEN;
const hasTinaCredentials = Boolean(tinaClientId && tinaToken);

function run(command) {
  execSync(command, {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env,
  });
}

function writeFallbackAdminPage() {
  mkdirSync(publicAdminDir, { recursive: true });
  writeFileSync(
    adminIndexPath,
    `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TinaCMS Admin</title>
    <style>
      :root {
        color-scheme: light dark;
        --bg: #f6f3ef;
        --card: rgba(255, 255, 255, 0.92);
        --text: #1d1d1f;
        --muted: #5c6470;
        --border: rgba(36, 42, 53, 0.12);
        --accent: #b84d1e;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #121517;
          --card: rgba(24, 28, 32, 0.92);
          --text: #f4f5f7;
          --muted: #a8b0bb;
          --border: rgba(255, 255, 255, 0.12);
          --accent: #ff8a4c;
        }
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
        background:
          radial-gradient(circle at top left, rgba(184, 77, 30, 0.12), transparent 28%),
          linear-gradient(180deg, var(--bg), color-mix(in srgb, var(--bg) 84%, #000 16%));
        color: var(--text);
        display: grid;
        place-items: center;
        padding: 24px;
      }
      .card {
        width: min(720px, 100%);
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 24px;
        padding: 32px;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
        backdrop-filter: blur(12px);
      }
      .eyebrow {
        margin: 0 0 12px;
        color: var(--accent);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0 0 16px;
        font-size: clamp(28px, 5vw, 42px);
        line-height: 1.1;
      }
      p, li {
        color: var(--muted);
        line-height: 1.75;
        font-size: 15px;
      }
      code {
        font-family: Consolas, "SFMono-Regular", monospace;
        font-size: 14px;
      }
      pre {
        margin: 16px 0 0;
        padding: 14px 16px;
        border-radius: 14px;
        border: 1px solid var(--border);
        overflow: auto;
        background: rgba(127, 127, 127, 0.08);
      }
      ul {
        margin: 16px 0 0;
        padding-left: 20px;
      }
      a {
        color: var(--accent);
      }
    </style>
  </head>
  <body>
    <main class="card">
      <p class="eyebrow">CMS</p>
      <h1>TinaCMS 后台尚未启用</h1>
      <p>
        当前构建没有检测到 <code>TINA_PUBLIC_CLIENT_ID</code> 和 <code>TINA_TOKEN</code>，
        所以这里显示的是占位页，而不是真正的 TinaCloud 登录后台。
      </p>
      <p>要启用可登录后台，需要在 GitHub 仓库 Secrets 中配置这两个值，然后重新部署。</p>
      <pre><code>TINA_PUBLIC_CLIENT_ID=...
TINA_TOKEN=...</code></pre>
      <ul>
        <li>本地编辑可运行：<code>npm run admin:dev</code></li>
        <li>线上启用后，<code>/admin/</code> 会变成 TinaCMS 登录界面</li>
      </ul>
    </main>
  </body>
</html>`,
    'utf8',
  );
}

rmSync(publicAdminDir, { recursive: true, force: true });

if (hasTinaCredentials) {
  console.log('Tina credentials detected, building TinaCMS admin...');
  try {
    run('npx tinacms build');
  } catch (error) {
    console.warn('TinaCMS build failed, falling back to the placeholder admin page.');
    console.warn(error instanceof Error ? error.message : error);
    writeFallbackAdminPage();
  }
} else {
  console.log('Tina credentials not found, writing fallback admin page...');
  writeFallbackAdminPage();
}

run('astro build');
