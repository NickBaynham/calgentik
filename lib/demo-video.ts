import { getMediaBaseUrl } from "@/lib/media-base";
import { videoSourceMimeType } from "@/lib/media";

/** MediaResources id for the in-app screen recording. */
export const DEMO_SCREEN_RECORDING_ID = "screen-recording-demo";

const LOCAL_DEMO_FILE = "VerifiedSignal_screen_recording_demo.mp4";

function remoteDemoUrl(): string | undefined {
  const v =
    process.env.DEMO_VIDEO_URL?.trim() || process.env.NEXT_PUBLIC_DEMO_VIDEO_URL?.trim();
  return v || undefined;
}

function remoteMediaBase(): string | undefined {
  return getMediaBaseUrl();
}

function objectUrlUnderBase(base: string, filename: string): string {
  const path = filename.split("/").map(encodeURIComponent).join("/");
  return `${base}/${path}`;
}

/** True when the homepage demo resolves to an absolute URL (CDN or per-demo override). */
export function isDemoVideoRemote(): boolean {
  const url = resolveMediaPlaybackUrl(DEMO_SCREEN_RECORDING_ID, LOCAL_DEMO_FILE);
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Playback URL for the homepage / demo screen recording.
 *
 * Precedence: `NEXT_PUBLIC_DEMO_VIDEO_URL` (exact object) → `NEXT_PUBLIC_MEDIA_BASE_URL` + filename → `/resources/…`.
 */
export function getDemoVideoPlayback(): { url: string; mimeType: string } {
  const url = resolveMediaPlaybackUrl(DEMO_SCREEN_RECORDING_ID, LOCAL_DEMO_FILE);
  const mimeType =
    url.startsWith("http://") || url.startsWith("https://")
      ? mimeTypeForUrl(url, LOCAL_DEMO_FILE)
      : videoSourceMimeType(LOCAL_DEMO_FILE);
  return { url, mimeType };
}

/**
 * Resolves stream/download URL for a media resource row.
 *
 * Precedence for the screen recording: `NEXT_PUBLIC_DEMO_VIDEO_URL` → `NEXT_PUBLIC_MEDIA_BASE_URL` → local.
 * For all other assets: `NEXT_PUBLIC_MEDIA_BASE_URL` → local.
 */
export function resolveMediaPlaybackUrl(resourceId: string, localFile: string): string {
  if (resourceId === DEMO_SCREEN_RECORDING_ID) {
    const specific = remoteDemoUrl();
    if (specific) return specific;
  }
  const base = remoteMediaBase();
  if (base) {
    return objectUrlUnderBase(base, localFile);
  }
  return `/resources/${encodeURIComponent(localFile)}`;
}

export function mediaPlaybackMimeType(
  resourceId: string,
  localFile: string,
  resolvedUrl: string,
): string {
  if (resolvedUrl.startsWith("http://") || resolvedUrl.startsWith("https://")) {
    return mimeTypeForUrl(resolvedUrl, localFile);
  }
  return videoSourceMimeType(localFile);
}

function mimeTypeForUrl(absoluteUrl: string, fallbackFile: string): string {
  try {
    return videoSourceMimeType(new URL(absoluteUrl).pathname);
  } catch {
    return videoSourceMimeType(fallbackFile);
  }
}
