export type NewsCategory = "Product" | "Market" | "Engineering" | "Company" | "Industry";

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  featured?: boolean;
};

export const articles: NewsArticle[] = [
  {
    slug: "content-reference-powers-site",
    title: "Product & architecture reference now powers calgentik.com",
    excerpt:
      "We structured the comprehensive Veridoc / VerifiedSignal reference (eight dimensions, AWS stack, SSE contracts, marketplace metering) into public pages for diligence and onboarding.",
    date: "2026-03-27",
    category: "Company",
    featured: true,
  },
  {
    slug: "verifiedsignal-pipeline-hardening",
    title: "Hardening the document pipeline for production workloads",
    excerpt:
      "How we tightened ingestion, async processing, and observability so teams can trust throughput under real enterprise constraints.",
    date: "2026-03-12",
    category: "Engineering",
  },
  {
    slug: "from-veridoc-to-verifiedsignal",
    title: "From VeriDoc to VerifiedSignal: a sharper product story",
    excerpt:
      "The rebrand reflects what customers actually buy: verified signals—not generic document AI—with evidence and review built in.",
    date: "2026-03-05",
    category: "Company",
  },
  {
    slug: "why-explainability-matters-in-capture",
    title: "Why explainability still matters in document capture",
    excerpt:
      "When decisions depend on extracted fields, “confidence” without provenance creates operational risk. Here is the bar we hold.",
    date: "2026-02-28",
    category: "Industry",
  },
  {
    slug: "launch-prep-checklist",
    title: "Launch prep: security, governance, and customer onboarding",
    excerpt:
      "A practical checklist for teams moving from pilot to production with document intelligence and human review loops.",
    date: "2026-02-14",
    category: "Product",
  },
  {
    slug: "market-note-document-intelligence",
    title: "Market note: document intelligence vs. document hype",
    excerpt:
      "Buyers are consolidating around outcomes: traceable extraction, audit trails, and workflow fit—not slide-deck promises.",
    date: "2026-01-30",
    category: "Market",
  },
];

export const newsCategories: NewsCategory[] = [
  "Product",
  "Market",
  "Engineering",
  "Company",
  "Industry",
];
