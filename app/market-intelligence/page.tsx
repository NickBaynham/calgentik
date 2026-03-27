import type { Metadata } from "next";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/sections/CTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { brand, marketContextBullets } from "@/data/reference-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Market Intelligence",
  description: `Strategic context for document intelligence, verification platforms, and ${site.name} positioning.`,
};

const competitiveBuckets = [
  {
    label: "Legacy OCR / capture",
    cells: [
      "Strong at digitization; weaker at explainable scoring across persuasion, fallacy, and multi-model authorship signals.",
    ],
  },
  {
    label: "RPA-first automation",
    cells: [
      "Good at routing and forms; often thin on provenance history, collection analytics, and skeptical-reading workflows.",
    ],
  },
  {
    label: "Hyperscaler document AI",
    cells: [
      "Broad primitives and scale; buyers still must compose review UX, dimension-specific scorecards, and audit narratives.",
    ],
  },
  {
    label: "AI-native document startups",
    cells: [
      "Fast UX iteration; differentiation hinges on evidence design, not model novelty—exactly where verification layers matter.",
    ],
  },
];

export default function MarketIntelligencePage() {
  return (
    <>
      <HeroSection
        eyebrow="Market intelligence"
        title="Why skeptical reading became infrastructure"
        subtitle={`${brand.visionLead}. Buyers are moving from demos to operational proof: provenance, traceable scores, and interfaces that hold up to scrutiny.`}
        ctas={[
          { label: "View Technology", href: "/technology" },
          { label: "Contact Us", href: "/contact", variant: "secondary" },
        ]}
      />

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Why now"
            title="Document intelligence is table stakes; verification is the wedge"
            description="Teams already process documents. The open gap is deciding what to trust—especially as synthetic text and persuasive framing scale."
          />
          <ul className="mt-8 max-w-3xl list-disc space-y-3 pl-5 text-sm text-[var(--text-muted)]">
            {marketContextBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)]/50 py-16">
        <Container>
          <SectionHeader
            eyebrow="Demand signals"
            title="Market pull without overclaiming precision"
            description="Enterprises ask for agentic workflows, but procurement still rewards defensible outputs. Qualitative buyer pain clusters around auditability, reviewer throughput, and integration—not raw OCR accuracy alone."
          />
        </Container>
      </section>

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Competitive landscape"
            title="Four buckets, one strategic question"
            description="Where does the product force evidence into the UI and exports? That is the axis VerifiedSignal emphasizes."
          />
          <div className="mt-10">
            <ComparisonTable
              title="Illustrative positioning (not a quantitative market share analysis)"
              caption="Strategic framing only—validate specifics with your own diligence materials."
              columns={["How teams should read this bucket"]}
              rows={competitiveBuckets}
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-elevated)] py-16">
        <Container>
          <SectionHeader
            eyebrow="Comparison"
            title="VerifiedSignal vs. generic “AI summaries”"
            description="Eight explicit dimensions, passage-linked fallacy naming, provenance checks, SSE progress, and Postgres-first persistence compose a different buyer conversation than a chat box over PDFs."
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Investment thesis"
            title="A verification layer compounds"
            description="Collections analytics turn single-document scores into monitoring products. Marketplace metering aligns revenue with usage. Strong engineering notes (checkpoints, incremental JSON, SSE contracts) reduce execution risk if teams ship with discipline."
          />
        </Container>
      </section>

      <CTASection
        title="Dig into the architecture story"
        body="Pair this narrative with the technology page and documentation index for diligence-ready depth."
        primary={{ label: "View Technology", href: "/technology" }}
        secondary={{ label: "Documentation", href: "/documentation" }}
      />
    </>
  );
}
