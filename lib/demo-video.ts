import { videoSourceMimeType } from "@/lib/media";

/** MediaResources id for the in-app screen recording. */
export const DEMO_SCREEN_RECORDING_ID = "screen-recording-demo";

const LOCAL_DEMO_FILE = "VerifiedSignal_screen_recording_demo.mp4";

function remoteDemoUrl(): string | undefined {
  const v = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL?.trim();
  return v || undefined;
}

/** True when the demo streams from an absolute URL (e.g. S3/CloudFront). */
export function isDemoVideoRemote(): boolean {
  return Boolean(remoteDemoUrl());
}

/**
 * Playback URL for the homepage / demo screen recording.
 * Set `NEXT_PUBLIC_DEMO_VIDEO_URL` to the public object URL (HTTPS) to stream from S3/CloudFront.
 */
export function getDemoVideoPlayback(): { url: string; mimeType: string } {
  const remote = remoteDemoUrl();
  if (remote) {
    return { url: remote, mimeType: mimeTypeForUrl(remote, LOCAL_DEMO_FILE) };
  }
  return {
    url: `/resources/${encodeURIComponent(LOCAL_DEMO_FILE)}`,
    mimeType: videoSourceMimeType(LOCAL_DEMO_FILE),
  };
}

/**
 * Resolves stream/download URL for a media resource row (local `/resources/` unless demo override).
 */
export function resolveMediaPlaybackUrl(resourceId: string, localFile: string): string {
  if (resourceId === DEMO_SCREEN_RECORDING_ID) {
    const remote = remoteDemoUrl();
    if (remote) return remote;
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
