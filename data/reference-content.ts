/**
 * Structured site copy derived from the product reference in `content.txt`
 * Sourced from the internal product reference (legacy filename: content.txt). Public-facing copy uses the VerifiedSignal brand.
 * Update this module when `content.txt` changes to keep marketing and docs in sync.
 */

export const brand = {
  visionLead: "The newspaper-of-record for the synthetic age",
  visionBody:
    "An automated epistemological verification layer designed to restore trust in digital discourse. In an era where an estimated $78 billion is lost annually to decisions predicated on bad information, VerifiedSignal provides infrastructure for skeptical reading.",
  trustTagline: "Read everything. Trust wisely.",
  valueProp:
    "We move beyond simple AI detection to offer a scalable critical-thinking engine that uncovers hidden persuasion, misinformation, and factual inconsistencies.",
} as const;

export const crisisVsSolution: { problem: string; intervention: string }[] = [
  {
    problem:
      "AI detection gap: as LLMs reach human parity in style, many readers struggle to recognize machine-generated text.",
    intervention:
      "Multi-model scoring: specialized detection models (beyond style heuristics) assess authorship probability with high-precision confidence estimates.",
  },
  {
    problem:
      'Logical fallacies: viral articles often use “invisible machinery” such as false equivalences to steer readers.',
    intervention:
      "Fallacy rating engine: identifies and names specific fallacy types (for example ad hominem) with direct links to the offending passages.",
  },
  {
    problem:
      "Cost of bad information: investment and policy decisions grounded in misinformation create fiscal and operational leakage.",
    intervention:
      "Factuality confidence: a 0–1 score from internal consistency checks, citation signals, and cross-referenced claim validation.",
  },
];

export const audienceSegments: { title: string; body: string }[] = [
  {
    title: "Researchers & academics",
    body: "Build trustworthy evidence bases at scale. Ingest large volumes to identify high-factuality sources and track quality trends across scientific literature.",
  },
  {
    title: "Journalists & fact-checkers",
    body: "Vet sources before publication. Surface provenance gaps, misleading framing, and AI-generated content presented as human reporting.",
  },
  {
    title: "Investors & analysts",
    body: "Pressure-test market narratives. Score earnings calls and research reports to find overstatements or track a source’s accuracy over time.",
  },
  {
    title: "Educators & students",
    body: "Scale critical thinking and media literacy. Compare high- and low-quality sources through objective intelligence lenses.",
  },
  {
    title: "Legal & compliance teams",
    body: "Run due diligence on regulatory filings, expert witness materials, and third-party reports through factuality and provenance scoring.",
  },
  {
    title: "Curious individuals",
    body: "Defend against digital manipulation. Analyze threads or blogs to understand the mechanics of persuasion before deciding what to believe.",
  },
];

export const eightDimensions: { title: string; summary: string; indicators: string }[] = [
  {
    title: "Logical fallacy rating",
    summary: "Measures manipulative reasoning.",
    indicators:
      "Per-fallacy breakdown (ad hominem, straw man, false dichotomy, slippery slope) mapped to specific text triggers.",
  },
  {
    title: "Factuality confidence",
    summary: "Measures the reliability of claims.",
    indicators:
      "Internal consistency, citation signals, and cross-referenced factual claims with rationale.",
  },
  {
    title: "AI generation probability",
    summary: "Measures machine authorship likelihood.",
    indicators:
      "Multi-model assessment of linguistic patterns versus known LLM signatures, including a specific model guess.",
  },
  {
    title: "Pseudoscience indicators",
    summary: "Measures adherence to scientific rigor.",
    indicators:
      "Unfalsifiable claims, anecdotal evidence, appeal to nature, absence of peer review.",
  },
  {
    title: "Fictional content likelihood",
    summary: "Measures intent and genre.",
    indicators:
      "Separates reported fact from narrative; satire detection; speculation presented as journalism.",
  },
  {
    title: "Source provenance",
    summary: "Measures document origin history.",
    indicators:
      "Domain reputation, WHOIS history, canonical URL verification, archive.org presence.",
  },
  {
    title: "Semantic search",
    summary: "Measures deep content relevance.",
    indicators: "Vector similarity (kNN) and hybrid retrieval across large collections.",
  },
  {
    title: "Collection analytics",
    summary: "Measures aggregate quality shifts.",
    indicators: "Trend dashboards for factuality and fallacy frequency across sources over time.",
  },
];

export const agenticWorkflow: { id: string; title: string; detail: string }[] = [
  {
    id: "submit",
    title: "Submit",
    detail: "Upload PDF, Word, or HTML—or provide a URL. The system fetches, extracts text, and cleans content automatically.",
  },
  {
    id: "investigate",
    title: "Investigate",
    detail: "Verify source provenance—publication dates, author identity, and domain history—before analysis begins.",
  },
  {
    id: "analyze",
    title: "Analyze",
    detail: "A coordinated set of models scores the document across all eight intelligence dimensions.",
  },
  {
    id: "collect",
    title: "Collect",
    detail: "Save documents to collections for side-by-side comparison and trend visualization.",
  },
];

export const uiStandards: { title: string; detail: string }[] = [
  {
    title: "Review UI",
    detail:
      "Side-by-side human-in-the-loop verification so users can correct low-confidence extractions with context.",
  },
  {
    title: "Document explorer",
    detail:
      "Suspicious-document logic that surfaces items with high AI probability (e.g. >0.7) and low factuality (e.g. <0.4).",
  },
  {
    title: "Real-time feedback",
    detail: "Scorecards stream progress via Server-Sent Events (SSE) during analysis.",
  },
];

export const saasPricingTiers: {
  plan: string;
  price: string;
  limits: string;
  features: string;
}[] = [
  {
    plan: "Reader",
    price: "Free",
    limits: "50 documents / month",
    features: "All 8 dimensions, 3 collections, 7-day history.",
  },
  {
    plan: "Analyst",
    price: "$29 / month",
    limits: "1,000 documents / month",
    features: "Unlimited collections, trend dashboards, semantic search, CSV/JSON export.",
  },
  {
    plan: "Team",
    price: "$99 / month",
    limits: "10,000 documents / month",
    features: "10 seats, shared collections, API access, SSO/SAML, self-host (Docker).",
  },
];

export const smbMarketplaceTiers: { name: string; price: string; detail: string }[] = [
  {
    name: "Solopreneur",
    price: "$49 / month",
    detail: "Up to 200 documents; basic QuickBooks/Xero one-click connectors.",
  },
  {
    name: "Growth",
    price: "$199 / month",
    detail:
      "Up to 1,500 documents; agentic email drafting for missing information; few-shot training for unique document types.",
  },
  {
    name: "Scale",
    price: "$499 / month",
    detail: "Unlimited documents; full API access and premium support.",
  },
];

export const marketContextBullets: string[] = [
  "Intelligent document processing remains a large and growing category; banking and finance is a major segment for KYC, AML, and operational document automation.",
  "Buyer interest in agentic workflows is showing up strongly in cloud marketplaces and procurement conversations.",
  "Teams are consolidating around outcomes: traceable scoring, provenance, and review—not opaque summaries.",
];

export const awsCoreStack: { name: string; detail: string }[] = [
  { name: "AWS Amplify", detail: "Frontend hosting and global edge delivery." },
  {
    name: "Amazon S3",
    detail: "Object storage with presigned URLs for direct uploads, reducing unnecessary compute on the hot path.",
  },
  {
    name: "Amazon Cognito",
    detail: "Authentication, including paths that align with AWS Marketplace–native identity flows.",
  },
  {
    name: "Amazon Textract",
    detail: "High-accuracy OCR for tables, forms, and document geometry.",
  },
  {
    name: "Amazon Bedrock",
    detail: "LLM reasoning (for example Claude 3.5 / Llama 3) for structured scoring and agentic sanity checks.",
  },
];

export const dataPlanePrinciples = {
  postgres:
    "PostgreSQL is the system of record: users, permissions, final scores, billing, and authoritative outcomes.",
  opensearch:
    "Amazon OpenSearch holds derived search and analytics state: full-text search, kNN vectors, and dashboard aggregations—treated as expendable relative to Postgres.",
} as const;

export const ingestionPipeline: { id: string; title: string; detail: string }[] = [
  {
    id: "intake",
    title: "Intake",
    detail: "Client submits file or URL; API creates a queued record in Postgres.",
  },
  {
    id: "acquisition",
    title: "Acquisition",
    detail: "Worker fetches bytes, computes content hashes, and deduplicates.",
  },
  {
    id: "extraction",
    title: "Extraction",
    detail: "Textract/worker extracts plain text and structure; progress published to Redis.",
  },
  {
    id: "enrichment",
    title: "Enrichment",
    detail: "Metadata, topical tags, and initial quality flags.",
  },
  {
    id: "llm",
    title: "LLM scoring",
    detail: "Worker calls Bedrock for structured analysis via the Converse API.",
  },
  {
    id: "persist",
    title: "Canonical persistence",
    detail: "Validated scores written to the authoritative PostgreSQL layer.",
  },
  {
    id: "index",
    title: "Search indexing",
    detail: "Document indexed into OpenSearch for retrieval and analytics.",
  },
  {
    id: "notify",
    title: "Completion",
    detail: "Final status pushed to the frontend via SSE.",
  },
];

export const llmImplementationBullets: string[] = [
  'Auditor-style prompting with strict structure (for example XML-style sections) and JSON schema enforcement—including sanity checks such as totals matching line items.',
  'Few-shot sets covering success, graceful failure (explicit nulls when data is missing), and messy edge documents to reduce hallucinated fields.',
  'Low temperature (0.0) for deterministic, “boring auditor” consistency.',
];

export const sseNotes = {
  nginx:
    "Nginx should disable proxy buffering for SSE (for example `X-Accel-Buffering: no`) so streams reach clients reliably.",
  incremental:
    "Partial JSON token parsing streams fields to the UI as they complete; field state progresses through unseen → in progress → complete → validated → persisted.",
} as const;

export const sseSampleEvent = `{
  "event": "stage",
  "document_id": "doc_123",
  "stage": "extract_text",
  "status": "running",
  "timestamp": "2026-03-26T22:11:10Z",
  "progress": 35
}`;

export const marketplaceBullets: string[] = [
  "Marketplace subscriptions arrive with an `x-amzn-marketplace-token`; the backend exchanges it for a customer identifier linked to billing.",
  "Scheduled metering (for example hourly) aggregates document usage from Postgres and reports to AWS Marketplace Metering for usage-based plans.",
];

export const implementationPhases: { phase: string; duration: string; tasks: string }[] = [
  {
    phase: "Infrastructure",
    duration: "Weeks 1–2",
    tasks: "IaC for object storage, identity, and supporting data stores.",
  },
  {
    phase: "AI pipeline",
    duration: "Weeks 3–5",
    tasks: "Connect workers to Textract and Bedrock (Converse API).",
  },
  {
    phase: "Frontend",
    duration: "Weeks 6–8",
    tasks: "Review UI (side-by-side) and document explorer experiences.",
  },
  {
    phase: "Marketplace",
    duration: "Weeks 9–10",
    tasks: "ResolveCustomer and BatchMeterUsage–style integrations.",
  },
  {
    phase: "Listing",
    duration: "Weeks 11–12",
    tasks: "Security review and marketplace go-live readiness.",
  },
];

export const deploymentTargets: string[] = [
  "Bare metal / local: filesystem or MinIO and single-node OpenSearch for development.",
  "Containers: portable Docker Compose for repeatable environments.",
  "AWS: production-style topologies using ECS Fargate, RDS, and Amazon OpenSearch Service.",
];

export const mvpExclusions: string[] = [
  "Custom model training (stay on foundation models for MVP).",
  "Complex multi-tenant roles (admin-first MVP).",
  "Dedicated mobile apps (responsive web only).",
];

export const failureMitigations: { failure: string; mitigation: string }[] = [
  {
    failure: "LLM returns malformed JSON",
    mitigation: "Incremental parser with field-level validation; fallback to a final pass parse.",
  },
  {
    failure: "Search unavailable",
    mitigation: "Persist to Postgres first; retry indexing later; UI shows search as pending.",
  },
  {
    failure: "Worker crash",
    mitigation: "Idempotent stage checkpoints so work resumes from the last saved state.",
  },
  {
    failure: "Redis outage",
    mitigation: "UI falls back to polling; event logs persist in Postgres for replay.",
  },
];

export const docsFaqItems: { q: string; a: string }[] = [
  {
    q: "What does VerifiedSignal score?",
    a: "Documents are evaluated across eight dimensions—fallacies, factuality, AI authorship likelihood, pseudoscience signals, fiction vs. fact, provenance, semantic relevance, and collection-level trends.",
  },
  {
    q: "Where is the source of truth?",
    a: "PostgreSQL holds canonical records and final scores. OpenSearch is a derived index for search and analytics and can be rebuilt.",
  },
  {
    q: "How does real-time progress work?",
    a: "Server-Sent Events stream stage updates to the UI; infrastructure must not buffer those streams end-to-end.",
  },
  {
    q: "Can we self-host?",
    a: "The reference product roadmap includes Docker-based self-host options at higher tiers; confirm availability for your contract.",
  },
];
