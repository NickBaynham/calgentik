export type Solution = {
  id: string;
  title: string;
  industry: string;
  problem: string;
  howWeHelp: string;
  outcomes: string[];
};

export const solutions: Solution[] = [
  {
    id: "financial-services",
    title: "Financial services operations",
    industry: "Banking & capital markets",
    problem:
      "Loan packets, KYC artifacts, and statements arrive in inconsistent formats. Teams reconcile manually, and model outputs rarely ship with evidence teams can defend.",
    howWeHelp:
      "VerifiedSignal standardizes ingestion, extracts decision fields with citations, and routes exceptions to reviewers with full traceability.",
    outcomes: [
      "Faster exception handling with reviewer-ready evidence",
      "Clearer audit posture for model-assisted decisions",
      "Repeatable pipelines across document types",
    ],
  },
  {
    id: "insurance-claims",
    title: "Insurance & claims",
    industry: "P&C and specialty lines",
    problem:
      "Claims folders mix forms, photos, correspondence, and third-party reports. Straight-through processing stalls when confidence is unclear or contested.",
    howWeHelp:
      "We structure the claim narrative into scored signals, surface uncertainty explicitly, and keep humans in the loop where policy and risk require it.",
    outcomes: [
      "Fewer false straight-through approvals",
      "Better triage for complex claims",
      "Operational transparency for regulators and partners",
    ],
  },
  {
    id: "legal-compliance",
    title: "Legal & compliance review",
    industry: "Corporate legal and GRC",
    problem:
      "Contract review and disclosure workflows drown in version churn. Teams need extracted obligations and risk markers they can verify—not black-box summaries.",
    howWeHelp:
      "Extraction is tied to source locations, supporting clause-level review, redlines, and structured export into downstream systems.",
    outcomes: [
      "Defensible review artifacts for audits",
      "Consistent obligation inventories across portfolios",
      "Less rework between legal and business owners",
    ],
  },
  {
    id: "healthcare-admin",
    title: "Healthcare administration & records",
    industry: "Providers and health ops",
    problem:
      "Clinical and administrative documents are high stakes. Errors propagate into billing, authorization, and care coordination.",
    howWeHelp:
      "VerifiedSignal emphasizes verification gates, role-aware review, and structured outputs that map to operational workflows—not one-off PDF summaries.",
    outcomes: [
      "Clear human checkpoints for sensitive fields",
      "Better alignment between extracted data and EHR/ops systems",
      "Reduced downstream rework from silent errors",
    ],
  },
  {
    id: "enterprise-knowledge",
    title: "Enterprise knowledge extraction",
    industry: "Knowledge-intensive teams",
    problem:
      "Institutional knowledge is trapped in PDFs, presentations, and email attachments. Search tools retrieve text, not decision-ready facts.",
    howWeHelp:
      "We combine extraction, scoring, and retrieval so answers can point to evidence, not just similar chunks.",
    outcomes: [
      "More trustworthy internal Q&A workflows",
      "Better onboarding for complex domains",
      "Cleaner handoffs between teams and systems",
    ],
  },
  {
    id: "due-diligence",
    title: "Due diligence & investment workflows",
    industry: "Investors and corporate development",
    problem:
      "Data rooms are noisy. Analysts need comparable fields, risk flags, and timelines—without losing the trail back to the source document.",
    howWeHelp:
      "Structured signals across decks, filings, and contracts, with scoring tuned to materiality and reviewer workflows.",
    outcomes: [
      "Faster first-pass coverage with verifiable citations",
      "Consistent issue spotting across large corpora",
      "Cleaner collaboration between deal teams and specialists",
    ],
  },
  {
    id: "qa-audit",
    title: "QA & audit document review",
    industry: "Manufacturing, pharma, regulated ops",
    problem:
      "Batch records, SOPs, and quality reports require meticulous cross-checking. Partial automation without traceability increases liability.",
    howWeHelp:
      "Human-in-the-loop review is first-class: extraction proposes, evidence anchors, and sign-off is explicit.",
    outcomes: [
      "Stronger evidence packages for inspections",
      "Reduced variance between reviewers",
      "Operational metrics that reflect quality, not just speed",
    ],
  },
];
