import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function writeFallbackAdminPage({ title, message, details, status }) {
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);
  const safeDetails = details ? escapeHtml(details) : '';
  const safeStatus = escapeHtml(status);

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
        width: min(760px, 100%);
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
      .status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 20px;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(184, 77, 30, 0.12);
        color: var(--accent);
        font-size: 13px;
        font-weight: 600;
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
        white-space: pre-wrap;
        word-break: break-word;
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
      <div class="status">${safeStatus}</div>
      <h1>${safeTitle}</h1>
      <p>${safeMessage}</p>
      ${safeDetails ? `<pre><code>${safeDetails}</code></pre>` : ''}
      <ul>
        <li>本地编辑可运行：<code>npm run admin:dev</code></li>
        <li>线上后台依赖 GitHub Actions 构建成功后发布到 <code>/admin/</code></li>
      </ul>
    </main>
  </body>
</html>`,
    'utf8',
  );
}

function normalizeTinaAdminIndex() {
  const html = readFileSync(adminIndexPath, 'utf8');
  const normalizedHtml = html.replaceAll('/admin/assets/', './assets/');
  writeFileSync(adminIndexPath, normalizedHtml, 'utf8');
}

rmSync(publicAdminDir, { recursive: true, force: true });

if (hasTinaCredentials) {
  console.log('Tina credentials detected, building TinaCMS admin...');
  try {
    run('npx tinacms build');
    normalizeTinaAdminIndex();
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    console.warn('TinaCMS build failed, falling back to the placeholder admin page.');
    console.warn(details);
    writeFallbackAdminPage({
      status: 'Build Failed',
      title: 'TinaCMS 后台构建失败',
      message: '已经检测到 Tina 凭据，但 TinaCMS 后台在构建阶段失败了。请根据下方错误信息检查 Tina Cloud 索引、Schema 或构建日志。',
      details,
    });
  }
} else {
  console.log('Tina credentials not found, writing fallback admin page...');
  writeFallbackAdminPage({
    status: 'Credentials Missing',
    title: 'TinaCMS 后台尚未启用',
    message: '当前构建没有检测到 TINA_PUBLIC_CLIENT_ID 和 TINA_TOKEN，所以这里显示的是占位页，而不是真正的 TinaCloud 登录后台。',
    details: 'TINA_PUBLIC_CLIENT_ID=...\nTINA_TOKEN=...',
  });
}

run('astro build');
