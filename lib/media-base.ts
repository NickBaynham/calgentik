/**
 * CDN / S3 origin for files that used to live under `public/resources/`.
 *
 * Prefer `MEDIA_BASE_URL` (no `NEXT_PUBLIC_` prefix) so values are read at **request
 * time** on the server and in middleware—Amplify often injects env after build, and
 * `NEXT_PUBLIC_*` can be inlined at build time only.
 *
 * `NEXT_PUBLIC_MEDIA_BASE_URL` is still supported as a fallback (local dev, older setups).
 */
export function getMediaBaseUrl(): string | undefined {
  const v =
    process.env.MEDIA_BASE_URL?.trim() || process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim();
  return v ? v.replace(/\/$/, "") : undefined;
}
