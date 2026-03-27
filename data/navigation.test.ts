import { describe, expect, it } from "vitest";
import { mainNav } from "./navigation";

describe("mainNav", () => {
  it("has unique hrefs", () => {
    const hrefs = mainNav.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("starts with Home at /", () => {
    expect(mainNav[0]).toEqual({ label: "Home", href: "/" });
  });

  it("includes documentation, resources, and contact", () => {
    const hrefs = mainNav.map((i) => i.href);
    expect(hrefs).toContain("/documentation");
    expect(hrefs).toContain("/resources");
    expect(hrefs).toContain("/contact");
  });

  it("uses absolute paths only", () => {
    for (const item of mainNav) {
      expect(item.href.startsWith("/")).toBe(true);
      expect(item.href).not.toContain("//");
    }
  });

  it("has labels for every item", () => {
    for (const item of mainNav) {
      expect(item.label.trim().length).toBeGreaterThan(0);
    }
  });
});
