// Central place for resolving media URLs.
//
// In production, set VITE_ASSET_BASE_URL to your public Cloudflare R2 URL,
// e.g. https://assets.kimberlycamanero.com/ (custom domain on the bucket).
// When it is not set, media is served from /public/media in this repo, which
// is handy for local development and for the portrait (fastest LCP).
//
// Never put R2 access keys here. This file ships to the browser.

const env = import.meta.env || {};
const LOCAL_BASE = `${env.BASE_URL || '/'}media/`;
const REMOTE_BASE = env.VITE_ASSET_BASE_URL || '';

const withSlash = (url) => (url.endsWith('/') ? url : `${url}/`);

/**
 * Resolve a media key (e.g. "projects/seastar/hero") to a URL.
 * @param {string} key path inside the bucket, without size suffix
 * @param {{ local?: boolean }} opts force the copy bundled in /public/media
 */
export function asset(key, { local = false } = {}) {
  const base = !local && REMOTE_BASE ? withSlash(REMOTE_BASE) : LOCAL_BASE;
  return `${base}${key.replace(/^\//, '')}`;
}

/**
 * Build srcset strings for images processed by scripts/optimize-media.mjs,
 * which writes `<key>-<width>.avif` and `<key>-<width>.webp`.
 */
export function srcSet(key, widths, format, opts) {
  return widths.map((w) => `${asset(`${key}-${w}.${format}`, opts)} ${w}w`).join(', ');
}

export const portrait = {
  key: 'portrait/kimberly',
  widths: [640, 1000, 1500],
  width: 1500,
  height: 1998,
  alt: 'Portrait of Kimberly Camanero smiling, wearing a navy jacket',
  local: true, // bundled with the site so the hero never waits on the CDN
  // WebP only: with a transparent background, AVIF came out larger than WebP for this image.
  formats: ['webp'],
};
