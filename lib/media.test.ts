import { describe, expect, it } from "vitest";
import { videoSourceMimeType } from "./media";

describe("videoSourceMimeType", () => {
  it("maps common extensions", () => {
    expect(videoSourceMimeType("a.mp4")).toBe("video/mp4");
    expect(videoSourceMimeType("a.MOV")).toBe("video/quicktime");
    expect(videoSourceMimeType("a.mov")).toBe("video/quicktime");
    expect(videoSourceMimeType("a.webm")).toBe("video/webm");
  });
});
