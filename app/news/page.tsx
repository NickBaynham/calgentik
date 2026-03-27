import type { Metadata } from "next";
import { NewsCard } from "@/components/cards/NewsCard";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { articles, newsCategories } from "@/data/news";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "News",
  description: `Updates, commentary, and engineering notes from the ${site.name} team.`,
};

export default function NewsPage() {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      <HeroSection
        eyebrow="News"
        title="Product updates and field notes"
        subtitle="Short, high-signal updates you can later replace with CMS or MDX-backed posts. Latest item reflects the consolidated product & architecture reference powering this site."
        ctas={[{ label: "Contact Us", href: "/contact", variant: "secondary" }]}
      />
      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Categories"
            title="Tags we use for now"
            description="Filter UI can map to these labels when you wire a CMS."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {newsCategories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]"
              >
                {c}
              </span>
            ))}
          </div>

          {featured ? (
            <div className="mt-12">
              <SectionHeader eyebrow="Featured" title="Latest deep dive" />
              <div className="mt-6 max-w-3xl">
                <NewsCard article={featured} featured />
              </div>
            </div>
          ) : null}

          <div className="mt-14">
            <SectionHeader eyebrow="Latest updates" title="All posts" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {rest.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
