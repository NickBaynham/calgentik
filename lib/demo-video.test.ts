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

  it("uses local /resources path when NEXT_PUBLIC_DEMO_VIDEO_URL is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_VIDEO_URL", "");
    const { url, mimeType } = getDemoVideoPlayback();
    expect(url).toContain("/resources/");
    expect(url).toContain("VerifiedSignal_screen_recording_demo.mp4");
    expect(mimeType).toBe("video/mp4");
  });

  it("uses remote URL for demo playback when env is set", () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_VIDEO_URL", "https://cdn.example.com/media/demo.mp4");
    expect(getDemoVideoPlayback()).toEqual({
      url: "https://cdn.example.com/media/demo.mp4",
      mimeType: "video/mp4",
    });
  });

  it("resolveMediaPlaybackUrl applies remote only to screen-recording id", () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_VIDEO_URL", "https://cdn.example.com/x.mov");
    expect(resolveMediaPlaybackUrl(DEMO_SCREEN_RECORDING_ID, "local.mov")).toBe(
      "https://cdn.example.com/x.mov",
    );
    expect(resolveMediaPlaybackUrl("overview-video", "videoplayback.mp4")).toBe(
      "/resources/videoplayback.mp4",
    );
  });
});
