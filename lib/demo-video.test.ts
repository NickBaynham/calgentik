import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DEMO_SCREEN_RECORDING_ID,
  getDemoVideoPlayback,
  resolveMediaPlaybackUrl,
} from "./demo-video";

describe("demo video URL resolution", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses local /resources path when no remote env is set", () => {
    vi.stubEnv("MEDIA_BASE_URL", "");
    vi.stubEnv("DEMO_VIDEO_URL", "");
    vi.stubEnv("NEXT_PUBLIC_DEMO_VIDEO_URL", "");
    vi.stubEnv("NEXT_PUBLIC_MEDIA_BASE_URL", "");
    const { url, mimeType } = getDemoVideoPlayback();
    expect(url).toContain("/resources/");
    expect(url).toContain("VerifiedSignal_screen_recording_demo.mp4");
    expect(mimeType).toBe("video/mp4");
  });

  it("uses remote URL for demo playback when env is set", () => {
    vi.stubEnv("MEDIA_BASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_DEMO_VIDEO_URL", "https://cdn.example.com/media/demo.mp4");
    expect(getDemoVideoPlayback()).toEqual({
      url: "https://cdn.example.com/media/demo.mp4",
      mimeType: "video/mp4",
    });
  });

  it("resolveMediaPlaybackUrl: DEMO_VIDEO_URL only overrides screen-recording id", () => {
    vi.stubEnv("MEDIA_BASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_DEMO_VIDEO_URL", "https://cdn.example.com/x.mov");
    vi.stubEnv("NEXT_PUBLIC_MEDIA_BASE_URL", "");
    expect(resolveMediaPlaybackUrl(DEMO_SCREEN_RECORDING_ID, "local.mov")).toBe(
      "https://cdn.example.com/x.mov",
    );
    expect(resolveMediaPlaybackUrl("overview-video", "videoplayback.mp4")).toBe(
      "/resources/videoplayback.mp4",
    );
  });

  it("resolveMediaPlaybackUrl uses MEDIA_BASE_URL for all assets when set", () => {
    vi.stubEnv("MEDIA_BASE_URL", "https://media.example.com/static");
    vi.stubEnv("NEXT_PUBLIC_DEMO_VIDEO_URL", "");
    vi.stubEnv("NEXT_PUBLIC_MEDIA_BASE_URL", "");
    expect(resolveMediaPlaybackUrl(DEMO_SCREEN_RECORDING_ID, "VerifiedSignal_screen_recording_demo.mp4")).toBe(
      "https://media.example.com/static/VerifiedSignal_screen_recording_demo.mp4",
    );
    expect(resolveMediaPlaybackUrl("overview-video", "videoplayback.mp4")).toBe(
      "https://media.example.com/static/videoplayback.mp4",
    );
    expect(resolveMediaPlaybackUrl("pdf-brief", "Guide With Spaces.pdf")).toBe(
      "https://media.example.com/static/Guide%20With%20Spaces.pdf",
    );
  });

  it("falls back to NEXT_PUBLIC_MEDIA_BASE_URL when MEDIA_BASE_URL is unset", () => {
    vi.stubEnv("MEDIA_BASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_DEMO_VIDEO_URL", "");
    vi.stubEnv("NEXT_PUBLIC_MEDIA_BASE_URL", "https://legacy.example.com/r");
    expect(resolveMediaPlaybackUrl("overview-video", "a.mp4")).toBe("https://legacy.example.com/r/a.mp4");
  });

  it("DEMO_VIDEO_URL wins over MEDIA_BASE_URL for screen recording", () => {
    vi.stubEnv("MEDIA_BASE_URL", "https://media.example.com/static");
    vi.stubEnv("NEXT_PUBLIC_DEMO_VIDEO_URL", "https://cdn.example.com/only-demo.mp4");
    vi.stubEnv("NEXT_PUBLIC_MEDIA_BASE_URL", "");
    expect(resolveMediaPlaybackUrl(DEMO_SCREEN_RECORDING_ID, "VerifiedSignal_screen_recording_demo.mp4")).toBe(
      "https://cdn.example.com/only-demo.mp4",
    );
  });
});
