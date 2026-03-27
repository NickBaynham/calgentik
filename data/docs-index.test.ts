import { describe, expect, it } from "vitest";
import { docsSections } from "./docs-index";

describe("docsSections", () => {
  it("only links under /documentation", () => {
    for (const doc of docsSections) {
      expect(doc.href.startsWith("/documentation/")).toBe(true);
    }
  });

  it("has unique hrefs", () => {
    const hrefs = docsSections.map((d) => d.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("defines title and description for each card", () => {
    for (const doc of docsSections) {
      expect(doc.title.length).toBeGreaterThan(0);
      expect(doc.description.length).toBeGreaterThan(0);
    }
  });
});
