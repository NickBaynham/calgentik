import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("site", () => {
  it("uses HTTPS for external URLs", () => {
    expect(site.appUrl).toMatch(/^https:\/\//);
    expect(site.githubUrl).toMatch(/^https:\/\//);
  });

  it("uses a plausible contact email on the company domain", () => {
    expect(site.contactEmail).toMatch(/^[^\s@]+@calgentik\.com$/);
  });

  it("exposes non-empty branding strings", () => {
    expect(site.name.length).toBeGreaterThan(0);
    expect(site.company.length).toBeGreaterThan(0);
    expect(site.tagline.length).toBeGreaterThan(0);
    expect(site.description.length).toBeGreaterThan(0);
    expect(site.domain).toBe("calgentik.com");
  });
});
