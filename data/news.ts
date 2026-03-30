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
    slug: "s3-cdn-resources-leaner-deploys",
    title: "Media on S3, site on Amplify: leaner Git, faster resource delivery",
    excerpt:
      "Large video, audio, and PDF assets now stream from dedicated object storage with build-time redirects, so the marketing repo stays small and deploys stay reliable—without sacrificing in-browser preview.",
    date: "2026-03-29",
    category: "Engineering",
    featured: true,
  },
  {
    slug: "openapi-swagger-on-documentation",
    title: "OpenAPI draft and Swagger UI land on the documentation hub",
    excerpt:
      "We published an interactive API explorer plus machine-readable OpenAPI 3—aligned with our SSE and ingestion narratives—so integration teams can review contracts while the production API hardens.",
    date: "2026-03-28",
    category: "Product",
  },
  {
    slug: "amplify-env-media-base-url",
    title: "Field note: wiring NEXT_PUBLIC and Edge for `/resources` on AWS Amplify",
    excerpt:
      "A short engineering note on why build-time redirects and explicit CDN base URLs matter when `public/resources` is empty—so PDF iframes and direct links resolve to the same S3 objects every time.",
    date: "2026-03-27",
    category: "Engineering",
  },
  {
    slug: "verification-not-summarization",
    title: "Verification is not summarization: what buyers should ask document-AI vendors",
    excerpt:
      "Scorecards, provenance, and named failure modes beat a single “confidence” dial. We outline diligence questions that separate audit-ready platforms from demo-only wrappers.",
    date: "2026-03-26",
    category: "Market",
  },
  {
    slug: "screen-recording-product-demo",
    title: "New product screen recording on the home page and Resources",
    excerpt:
      "A compressed walkthrough shows VerifiedSignal-style intake, review, and scoring overlays—paired with downloadable briefs for offline sharing.",
    date: "2026-03-25",
    category: "Company",
  },
  {
    slug: "content-reference-powers-site",
    title: "Product & architecture reference now powers calgentik.com",
    excerpt:
      "We structured the comprehensive VerifiedSignal product reference (eight dimensions, AWS stack, SSE contracts, marketplace metering) into public pages for diligence and onboarding.",
    date: "2026-03-27",
    category: "Company",
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
    slug: "rebrand-verifiedsignal",
    title: "VerifiedSignal rebrand: a sharper product story",
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
