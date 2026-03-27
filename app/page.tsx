import Link from "next/link";
import type { Metadata } from "next";
import { ArchitectureFlow } from "@/components/sections/ArchitectureFlow";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import {
  agenticWorkflow,
  audienceSegments,
  brand,
  crisisVsSolution,
  eightDimensions,
  marketContextBullets,
} from "@/data/reference-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description: `${site.tagline} ${brand.trustTagline} ${site.description}`,
};

export default function HomePage() {
  const capabilityItems = eightDimensions.map((d) => ({
    title: d.title,
    description: `${d.summary} ${d.indicators}`,
  }));

  return (
    <>
      <HeroSection
        showHeroArt
        eyebrow={site.company}
        title={`${site.name}: ${brand.trustTagline}`}
        subtitle={`${brand.visionLead}. ${brand.visionBody}`}
        ctas={[
          { label: "Request a Demo", href: "/contact" },
          { label: "Explore the Platform", href: "/platform", variant: "secondary" },
          { label: "View Technology", href: "/technology", variant: "secondary" },
          { label: "Launch App", href: site.appUrl, external: true },
        ]}
      />

      <section className="border-b border-[var(--border)] bg-[var(--bg-elevated)] py-16">
        <Container>
          <SectionHeader
            eyebrow="The problem"
            title="Document-heavy workflows fail when trust is assumed instead of verified"
            description="Volume is not the hard part. The hard part is knowing what to believe—especially when synthetic text, persuasive framing, and thin sourcing look credible at a glance."
          />
          <p className="mt-6 max-w-3xl text-[var(--text-muted)]">{brand.valueProp}</p>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="The intervention"
            title="Technical scoring—not vibes—for skeptical reading at scale"
            description="VerifiedSignal pairs extraction and structure with explicit intelligence lenses, evidence links, and review workflows so teams can defend conclusions."
          />
          <div className="mt-10">
            <ComparisonTable
              caption="Illustrative framing from the product reference: problems map to concrete system behaviors, not generic “AI summaries.”"
              columns={["Problem", "Technical intervention"]}
              rows={crisisVsSolution.map((r, i) => ({
                label: `Signal ${i + 1}`,
                cells: [r.problem, r.intervention],
              }))}
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)]/60 py-16">
        <Container>
          <SectionHeader
            eyebrow="Solution overview"
            title="Eight dimensions. One auditable scorecard."
            description="Every document is evaluated through system-wide lenses designed for operational use—not a single opaque “helpfulness” label."
          />
          <div className="mt-10">
            <FeatureGrid items={capabilityItems} columns={2} />
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Workflow"
            title='From "submit" to "collect"—an agentic loop with humans in control'
            description="Uploads and URLs become structured signals, provenance checks, multi-model analysis, and collections you can compare over time."
          />
          <div className="mt-10">
            <ArchitectureFlow steps={agenticWorkflow} />
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-elevated)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Use cases"
            title="Built for teams who publish, decide, or teach from documents"
            description="The same verification substrate supports research corpora, newsroom workflows, markets analysis, classrooms, and compliance reviews."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audienceSegments.slice(0, 6).map((a) => (
              <article key={a.title} className="card-surface rounded-2xl p-6 transition duration-300">
                <h3 className="font-display text-lg font-semibold text-[var(--heading)]">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{a.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link
              href="/solutions"
              className="text-sm font-semibold text-[var(--accent-strong)] hover:underline"
            >
              View all audience workflows →
            </Link>
          </p>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Architecture snapshot"
            title="Postgres is canonical; search is derived"
            description="The product reference treats PostgreSQL as the system of record and OpenSearch as an expendable analytics and retrieval plane—so reliability and auditability stay anchored."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Intake & acquisition",
              "Extract & enrich",
              "LLM scoring (Bedrock)",
              "Persist → index → SSE",
            ].map((label, i) => (
              <li
                key={label}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-sm font-medium text-[var(--text)]"
              >
                <span className="text-[var(--accent-strong)]">{i + 1}.</span> {label}
              </li>
            ))}
          </ol>
          <p className="mt-8">
            <Link
              href="/technology"
              className="text-sm font-semibold text-[var(--accent-strong)] hover:underline"
            >
              Full pipeline & stack →
            </Link>
          </p>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--navy)] py-16 text-slate-100">
        <Container>
          <SectionHeader
            eyebrow="Why now"
            title="Market pull toward agentic document workflows—and buyer demand for proof"
            description="Procurement is shifting from demos to operational criteria: provenance, traceable scores, and review interfaces that stand up to scrutiny."
          />
          <ul className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-slate-300">
            {marketContextBullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-[var(--accent-muted)]" aria-hidden>
                  ·
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Differentiation"
            title="Verification infrastructure—not another generic document chatbot"
            description="VerifiedSignal emphasizes named fallacies, factuality rationale, provenance history, and collection-level analytics. Outputs are designed to be challenged, corrected, and audited."
          />
        </Container>
      </section>

      <CTASection
        title="See the scorecard on your own documents"
        body="Request a walkthrough of the eight dimensions, the review UI, and how SSE-driven progress fits your deployment model."
        primary={{ label: "Request a Demo", href: "/contact" }}
        secondary={{ label: "Launch App", href: site.appUrl, external: true }}
      />
    </>
  );
}
