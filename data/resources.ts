export type MediaResource = {
  id: string;
  title: string;
  description: string;
  /** Served from `public/resources/` (filename only). */
  file: string;
  kind: "video" | "audio" | "pdf";
};

export const mediaResources: MediaResource[] = [
  {
    id: "screen-recording-demo",
    title: "Product demo (screen recording)",
    description:
      "In-app screen capture showing VerifiedSignal in use—upload, review, scoring overlays, and core workflows.",
    file: "VerifiedSignal_screen_recording_demo.mp4",
    kind: "video",
  },
  {
    id: "overview-video",
    title: "Product overview (video)",
    description:
      "Walkthrough-style video covering VerifiedSignal document intelligence positioning and workflows.",
    file: "videoplayback.mp4",
    kind: "video",
  },
  {
    id: "podcast",
    title: "Document intelligence deep dive (audio)",
    description:
      "Podcast-style discussion: VerifiedSignal, document intelligence, and the “X-ray” lens on unstructured content.",
    file: "VerifiedSignal_and_the_document_intelligence_X-ray.m4a",
    kind: "audio",
  },
  {
    id: "pdf-brief",
    title: "Document intelligence brief (PDF)",
    description:
      "Downloadable PDF overview you can share offline or attach to diligence packets.",
    file: "VerifiedSignal_Document_Intelligence.pdf",
    kind: "pdf",
  },
  {
    id: "pdf-product-architecture-guide",
    title: "Product & architecture guide (PDF)",
    description:
      "Comprehensive reference: product scope, architecture, and how VerifiedSignal fits into document intelligence workflows.",
    file: "VerifiedSignal Reference Document_ Comprehensive Product & Architecture Guide.pdf",
    kind: "pdf",
  },
  {
    id: "pdf-use-cases",
    title: "Use cases (PDF)",
    description:
      "Scenario-focused overview of where VerifiedSignal applies and how teams get value from structured review on unstructured documents.",
    file: "VerifiedSignal_UseCases.pdf",
    kind: "pdf",
  },
];
