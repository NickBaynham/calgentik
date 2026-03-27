import type { Metadata } from "next";
import { ArchitectureFlow } from "@/components/sections/ArchitectureFlow";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import {
  awsCoreStack,
  dataPlanePrinciples,
  deploymentTargets,
  failureMitigations,
  ingestionPipeline,
  llmImplementationBullets,
  marketplaceBullets,
  mvpExclusions,
  sseNotes,
  sseSampleEvent,
} from "@/data/reference-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technology",
  description: `Architecture for ${site.name}: AWS services, Postgres system of record, OpenSearch, Bedrock scoring, SSE, and marketplace metering patterns.`,
};

export default function TechnologyPage() {
  const stackItems = awsCoreStack.map((s) => ({
    title: s.name,
    description: s.detail,
  }));

  return (
    <>
      <HeroSection
        eyebrow="Technology"
        title="Credible systems architecture—not slideware"
        subtitle="This page reflects the engineering reference behind VerifiedSignal: presigned uploads, worker orchestration, deterministic LLM settings, Postgres as truth, and OpenSearch as a derived plane."
        ctas={[
          { label: "Documentation", href: "/documentation" },
          { label: "GitHub", href: site.githubUrl, external: true, variant: "secondary" },
        ]}
      />

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Stack overview"
            title="AWS-native core with clear separation of concerns"
            description="Frontend delivery, identity, object storage, OCR, and LLM inference map to managed services so teams spend integration effort on scoring quality and review UX."
          />
          <div className="mt-10">
            <FeatureGrid items={stackItems} columns={2} />
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)]/50 py-16">
        <Container>
          <SectionHeader
            eyebrow="Data plane"
            title="PostgreSQL is canonical; OpenSearch is derived"
            description={dataPlanePrinciples.postgres + " " + dataPlanePrinciples.opensearch}
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--heading)]">System of record</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{dataPlanePrinciples.postgres}</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--heading)]">Search & analytics</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{dataPlanePrinciples.opensearch}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Pipeline"
            title="Eight-stage ingestion and scoring pipeline"
            description="From queued intake through Bedrock scoring, canonical persistence, OpenSearch indexing, and SSE completion events."
          />
          <div className="mt-10 max-w-full overflow-x-auto">
            <ArchitectureFlow steps={ingestionPipeline} />
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-elevated)] py-16">
        <Container>
          <SectionHeader
            eyebrow="LLM layer"
            title="Auditor-style prompting and strict structure"
            description="Temperature at zero, schema discipline, and few-shot examples that include graceful failure reduce hallucinated fields."
          />
          <ul className="mt-8 list-disc space-y-3 pl-5 text-sm text-[var(--text-muted)]">
            {llmImplementationBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Streaming UX"
            title="Server-Sent Events and incremental field hydration"
            description={sseNotes.nginx}
          />
          <p className="mt-4 text-sm text-[var(--text-muted)]">{sseNotes.incremental}</p>
          <pre
            className="mt-6 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 font-mono text-xs text-[var(--text)]"
            tabIndex={0}
          >
            {sseSampleEvent}
          </pre>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)]/40 py-16">
        <Container>
          <SectionHeader
            eyebrow="Marketplace & metering"
            title="Subscription plumbing and usage reporting"
            description="Patterns for AWS Marketplace tokens, customer resolution, and scheduled metering that align billable usage with Postgres-grounded counts."
          />
          <ul className="mt-8 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)]">
            {marketplaceBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Deployment"
            title="Targets from local to AWS"
            description="The reference explicitly supports bare-metal style dev, containerized compose, and Fargate/RDS/OpenSearch Service production shapes."
          />
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)]">
            {deploymentTargets.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-elevated)] py-16">
        <Container>
          <SectionHeader
            eyebrow="API-first posture"
            title="Integrations and exports"
            description="Higher tiers expose CSV/JSON export and API access in the reference packaging—ideal for analysts wiring scores into notebooks, GRC tools, or newsroom CMS hooks."
          />
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Security & governance"
            title="Explicit failure mitigations"
            description="Operational resilience is specified: malformed JSON, search outages, worker crashes, and Redis loss each have a playbook."
          />
          <div className="mt-10">
            <ComparisonTable
              caption="Drawn from the engineering reference; implement exactly to your SRE standards."
              columns={["Mitigation strategy"]}
              rows={failureMitigations.map((r) => ({
                label: r.failure,
                cells: [r.mitigation],
              }))}
            />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="MVP scope"
            title="What the reference explicitly defers"
            description="Clarity on exclusions keeps delivery honest: no custom training, no complex multi-tenant RBAC for MVP, no native mobile shell."
          />
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)]">
            {mvpExclusions.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Go deeper with the team"
        body="Architecture reviews, threat modeling, and integration design for your AWS estate."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Documentation", href: "/documentation" }}
      />
    </>
  );
}
