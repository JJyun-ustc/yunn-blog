export function withBase(path = '') {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, '');

  return normalizedPath ? `${normalizedBase}${normalizedPath}` : normalizedBase;
}

export function withoutBase(pathname: string) {
  const base = import.meta.env.BASE_URL;

  if (base === '/' || !pathname.startsWith(base)) {
    return pathname;
  }

  const trimmed = pathname.slice(base.length - 1);
  return trimmed || '/';
}
