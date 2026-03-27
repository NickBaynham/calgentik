import type { Metadata } from "next";
import Link from "next/link";
import { DocsCard } from "@/components/cards/DocsCard";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { docsSections } from "@/data/docs-index";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Documentation",
  description: `Concepts, architecture, APIs, and operations for ${site.name}.`,
};

export default function DocumentationPage() {
  return (
    <>
      <HeroSection
        eyebrow="Documentation"
        title="VerifiedSignal knowledge base"
        subtitle="Start with concepts and architecture, then follow API, deployment, and marketplace notes as they mature. Content tracks the product & architecture reference."
        ctas={[
          { label: "Media resources", href: "/resources", variant: "secondary" },
          { label: "Technology overview", href: "/technology", variant: "secondary" },
          { label: "GitHub", href: site.githubUrl, external: true, variant: "secondary" },
        ]}
      />
      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Index"
            title="Guides and deep dives"
            description="MDX-backed pages below are living drafts—extend or replace with CMS content when ready."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {docsSections.map((doc) => (
              <DocsCard key={doc.href} doc={doc} />
            ))}
          </div>
          <p className="mt-10 text-sm text-[var(--text-muted)]">
            Looking for narrative context first? Read the{" "}
            <Link href="/market-intelligence" className="font-medium text-[var(--accent-strong)]">
              market intelligence
            </Link>{" "}
            brief or jump to the{" "}
            <Link href="/technology" className="font-medium text-[var(--accent-strong)]">
              technology
            </Link>{" "}
            page.
          </p>
        </Container>
      </section>
    </>
  );
}
