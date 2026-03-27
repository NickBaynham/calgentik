import { describe, expect, it } from "vitest";
import { articles, newsCategories } from "./news";

describe("articles", () => {
  it("has unique slugs", () => {
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses ISO-like dates", () => {
    for (const a of articles) {
      expect(a.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("restricts categories to the known set", () => {
    for (const a of articles) {
      expect(newsCategories).toContain(a.category);
    }
  });

  it("has at most one featured article", () => {
    const featured = articles.filter((a) => a.featured);
    expect(featured.length).toBeLessThanOrEqual(1);
  });
});
