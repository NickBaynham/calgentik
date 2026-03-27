import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/sections/CTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { audienceSegments } from "@/data/reference-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description: `Who ${site.name} serves—from newsrooms and markets to classrooms and compliance—and the outcomes each segment cares about.`,
};

export default function SolutionsPage() {
  return (
    <>
      <HeroSection
        eyebrow="Solutions"
        title="Audience-specific workflows on one verification substrate"
        subtitle="The product reference segments buyers by how they consume documents: publish, decide, teach, or defend. VerifiedSignal aligns scoring, provenance, and review to those jobs."
        ctas={[
          { label: "Request a Demo", href: "/contact" },
          { label: "Explore the Platform", href: "/platform", variant: "secondary" },
        ]}
      />

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Segments"
            title="Where VerifiedSignal shows up"
            description="Copy below is drawn from the internal product & architecture reference—tuned for VerifiedSignal positioning on this site."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {audienceSegments.map((a) => (
              <article
                key={a.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-sm"
              >
                <h2 className="font-display text-xl font-semibold text-[var(--heading)]">{a.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{a.body}</p>
                <div className="mt-4 text-sm text-[var(--text)]">
                  <p className="font-semibold">Likely benefits</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--text-muted)]">
                    <li>Faster triage of questionable sources</li>
                    <li>Comparable scorecards across corpora</li>
                    <li>Evidence-linked review for stakeholders</li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Pick your workflow—we will map dimensions to it"
        body="Share sample documents and success criteria; we will align fallacy, factuality, provenance, and collection analytics to how your team decides."
        primary={{ label: "Request a Demo", href: "/contact" }}
        secondary={{ label: "Market Intelligence", href: "/market-intelligence" }}
      />
    </>
  );
}
