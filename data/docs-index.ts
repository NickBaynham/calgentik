export type DocLink = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

export const docsSections: DocLink[] = [
  {
    title: "Concepts",
    description: "Core ideas: signals, evidence, scoring, review loops, and governance.",
    href: "/documentation/concepts",
  },
  {
    title: "Architecture",
    description: "How services, workers, storage, and search fit together in production.",
    href: "/documentation/architecture",
  },
  {
    title: "API",
    description: "API-first design patterns, SSE notes, and links to the OpenAPI draft.",
    href: "/documentation/api",
    badge: "Preview",
  },
  {
    title: "OpenAPI",
    description: "Interactive Swagger UI for the HTTP API (draft specification).",
    href: "/documentation/openapi",
    badge: "Draft",
  },
  {
    title: "Deployment",
    description: "Deployment topology, environments, and operational checklists.",
    href: "/documentation/deployment",
  },
  {
    title: "FAQ",
    description: "Common questions from security, IT, and business stakeholders.",
    href: "/documentation/faq",
  },
  {
    title: "Roadmap",
    description: "Near-term direction for platform depth and enterprise readiness.",
    href: "/documentation/roadmap",
  },
];
