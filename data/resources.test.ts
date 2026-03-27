import { describe, expect, it } from "vitest";
import { mediaResources } from "./resources";

describe("mediaResources", () => {
  it("lists at least one asset per kind", () => {
    const kinds = new Set(mediaResources.map((r) => r.kind));
    expect(kinds.has("video")).toBe(true);
    expect(kinds.has("audio")).toBe(true);
    expect(kinds.has("pdf")).toBe(true);
  });

  it("has unique ids and filenames", () => {
    const ids = mediaResources.map((r) => r.id);
    const files = mediaResources.map((r) => r.file);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(files).size).toBe(files.length);
  });

  it("uses expected file extensions", () => {
    for (const r of mediaResources) {
      if (r.kind === "video") expect(r.file).toMatch(/\.mp4$/i);
      if (r.kind === "audio") expect(r.file).toMatch(/\.m4a$/i);
      if (r.kind === "pdf") expect(r.file).toMatch(/\.pdf$/i);
    }
  });

  it("has non-empty copy for each entry", () => {
    for (const r of mediaResources) {
      expect(r.title.length).toBeGreaterThan(0);
      expect(r.description.length).toBeGreaterThan(0);
    }
  });
});
