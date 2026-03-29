function normalizeBase(v: string | undefined): string | undefined {
  const t = v?.trim();
  return t ? t.replace(/\/$/, "") : undefined;
}

/**
 * Node server (App Router): prefer `MEDIA_BASE_URL` so Amplify can inject at **runtime**
 * without relying on build-time inlining.
 */
export function getMediaBaseUrl(): string | undefined {
  return normalizeBase(
    process.env.MEDIA_BASE_URL || process.env.NEXT_PUBLIC_MEDIA_BASE_URL,
  );
}

/**
 * Edge Middleware: **`NEXT_PUBLIC_MEDIA_BASE_URL` is usually required** — many hosts
 * (including Amplify) only bundle `NEXT_PUBLIC_*` into the edge bundle, so
 * `MEDIA_BASE_URL` may be empty here and `/resources/*` redirects would not run.
 */
export function getMediaBaseUrlForEdge(): string | undefined {
  return normalizeBase(
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL || process.env.MEDIA_BASE_URL,
  );
}
