import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/sections/CTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { brand } from "@/data/reference-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.company} builds ${site.name}—verification infrastructure for the synthetic age.`,
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        eyebrow="About"
        title={`${site.company} · ${site.name}`}
        subtitle={`${site.description} We publish the application at verifiedsignal.io and keep company narrative, diligence, and docs on ${site.domain}.`}
        ctas={[
          { label: "Request a Demo", href: "/contact" },
          { label: "Launch App", href: site.appUrl, external: true, variant: "secondary" },
        ]}
      />

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Mission"
            title="Restore trust in digital discourse—with systems, not slogans"
            description={brand.visionBody}
          />
          <blockquote className="mt-8 border-l-4 border-[var(--accent)] pl-6 font-display text-xl font-medium text-[var(--heading)]">
            {brand.trustTagline}
          </blockquote>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)]/50 py-16">
        <Container>
          <SectionHeader
            eyebrow="Positioning"
            title="Calgentik as company, VerifiedSignal as product"
            description="Calgentik houses strategy, partnerships, and investor conversations. VerifiedSignal is the document intelligence platform customers adopt—APIs, review UI, scoring dimensions, and marketplace packaging."
          />
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Founder & product story"
            title="From internal reference to customer-ready narrative"
            description="This site synthesizes a comprehensive product & architecture guide into investor-grade messaging. The engineering choices—Postgres first, OpenSearch derived, Bedrock with disciplined prompts, SSE for transparency—are the story, not an afterthought."
          />
        </Container>
      </section>

      <CTASection
        title="Demo, partnership, or investor inquiry"
        body="Tell us which lens matters most—newsroom workflows, markets analysis, compliance, or platform diligence—and we will tailor the walkthrough."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "GitHub", href: site.githubUrl, external: true }}
      />
    </>
  );
}
