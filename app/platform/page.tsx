import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureFlow } from "@/components/sections/ArchitectureFlow";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import {
  agenticWorkflow,
  eightDimensions,
  saasPricingTiers,
  smbMarketplaceTiers,
  uiStandards,
} from "@/data/reference-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Platform",
  description: `How ${site.name} scores documents across eight intelligence dimensions, supports review, and ships real-time progress.`,
};

export default function PlatformPage() {
  const dimensionCards = eightDimensions.map((d) => ({
    title: d.title,
    description: `${d.summary} Indicators: ${d.indicators}`,
  }));

  return (
    <>
      <HeroSection
        eyebrow="Platform"
        title="A verification layer for the synthetic age"
        subtitle="VerifiedSignal turns uploads and URLs into structured scorecards—fallacies, factuality, authorship, provenance, and more—with human-in-the-loop review and streaming progress."
        ctas={[
          { label: "Request a Demo", href: "/contact" },
          { label: "Documentation", href: "/documentation", variant: "secondary" },
        ]}
      />

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="Operational intelligence—not a black box"
            description="Scores are designed to be inspected: fallacies link to passages, factuality carries rationale, and collections reveal trends over time."
          />
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)]/50 py-16">
        <Container>
          <SectionHeader
            eyebrow="Measurement framework"
            title="The eight dimensions of intelligence"
            description="Every document is evaluated through the same lenses so teams can compare sources, time periods, and workflows consistently."
          />
          <div className="mt-10">
            <FeatureGrid items={dimensionCards} columns={2} />
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="How it works"
            title="Submit → investigate → analyze → collect"
            description="The reference workflow keeps provenance checks upstream of scoring, then makes results durable in collections for comparison."
          />
          <div className="mt-10">
            <ArchitectureFlow steps={agenticWorkflow} />
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-elevated)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Experience"
            title="UI standards built for skeptical readers"
            description="Side-by-side review, suspicious-document surfacing, and SSE-driven scorecards keep operators oriented during long analyses."
          />
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {uiStandards.map((u) => (
              <li
                key={u.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-[var(--heading)]">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{u.detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Commercial packaging"
            title="Reference SaaS tiers"
            description="Pricing in the product reference is illustrative—confirm current plans with the team during onboarding."
          />
          <div className="mt-10 space-y-10">
            <ComparisonTable
              title="Direct SaaS (illustrative)"
              caption="From the internal reference document; limits and features may change."
              columns={["Price (monthly)", "Document limits", "Feature inclusions"]}
              rows={saasPricingTiers.map((t) => ({
                label: t.plan,
                cells: [t.price, t.limits, t.features],
              }))}
            />
            <div>
              <h3 className="font-display text-xl font-semibold text-[var(--heading)]">
                AWS Marketplace–oriented SMB tracks
              </h3>
              <p className="mt-2 max-w-3xl text-sm text-[var(--text-muted)]">
                A middle ground between raw SDKs and heavy enterprise suites—usage-shaped tiers with connectors
                and API depth at the high end.
              </p>
              <ul className="mt-6 grid gap-4 md:grid-cols-3">
                {smbMarketplaceTiers.map((m) => (
                  <li
                    key={m.name}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
                      {m.price}
                    </p>
                    <h4 className="mt-2 font-display text-lg font-semibold text-[var(--heading)]">
                      {m.name}
                    </h4>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{m.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Governance & reliability"
            title="Designed for auditability"
            description="Canonical records live in PostgreSQL; derived search can be rebuilt. Failure modes—from malformed JSON to Redis outages—have explicit mitigations in the engineering reference."
          />
          <p className="mt-6 text-sm text-[var(--text-muted)]">
            See{" "}
            <Link href="/technology" className="font-medium text-[var(--accent-strong)] hover:underline">
              Technology
            </Link>{" "}
            for pipeline stages, SSE contracts, and deployment targets.
          </p>
        </Container>
      </section>

      <CTASection
        title="Map the platform to your workflows"
        body="Walk through dimensions, review UI patterns, and how collections analytics would surface in your org."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "View Technology", href: "/technology" }}
      />
    </>
  );
}
