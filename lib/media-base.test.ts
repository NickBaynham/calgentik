import { afterEach, describe, expect, it, vi } from "vitest";
import { getMediaBaseUrl, getMediaBaseUrlForEdge } from "./media-base";

describe("getMediaBaseUrl (Node / server)", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("prefers MEDIA_BASE_URL over NEXT_PUBLIC_MEDIA_BASE_URL", () => {
    vi.stubEnv("MEDIA_BASE_URL", "https://a.example.com");
    vi.stubEnv("NEXT_PUBLIC_MEDIA_BASE_URL", "https://b.example.com");
    expect(getMediaBaseUrl()).toBe("https://a.example.com");
  });

  it("falls back to NEXT_PUBLIC_MEDIA_BASE_URL", () => {
    vi.stubEnv("MEDIA_BASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_MEDIA_BASE_URL", "https://b.example.com");
    expect(getMediaBaseUrl()).toBe("https://b.example.com");
  });
});

describe("getMediaBaseUrlForEdge (middleware)", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("prefers NEXT_PUBLIC_MEDIA_BASE_URL over MEDIA_BASE_URL", () => {
    vi.stubEnv("NEXT_PUBLIC_MEDIA_BASE_URL", "https://pub.example.com");
    vi.stubEnv("MEDIA_BASE_URL", "https://srv.example.com");
    expect(getMediaBaseUrlForEdge()).toBe("https://pub.example.com");
  });

  it("falls back to MEDIA_BASE_URL", () => {
    vi.stubEnv("NEXT_PUBLIC_MEDIA_BASE_URL", "");
    vi.stubEnv("MEDIA_BASE_URL", "https://srv.example.com");
    expect(getMediaBaseUrlForEdge()).toBe("https://srv.example.com");
  });
});
