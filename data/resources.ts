export type MediaResource = {
  id: string;
  title: string;
  description: string;
  /** Path under /resources/ (symlinked from /docs in repo). */
  file: string;
  kind: "video" | "audio" | "pdf";
};

export const mediaResources: MediaResource[] = [
  {
    id: "overview-video",
    title: "Product overview (video)",
    description:
      "Walkthrough-style video covering VerifiedSignal / VeriDoc document intelligence positioning and workflows.",
    file: "videoplayback.mp4",
    kind: "video",
  },
  {
    id: "podcast",
    title: "Document intelligence deep dive (audio)",
    description:
      "Podcast-style discussion: VeriDoc, document intelligence, and the “X-ray” lens on unstructured content.",
    file: "VeriDoc_and_the_document_intelligence_X-ray.m4a",
    kind: "audio",
  },
  {
    id: "pdf-brief",
    title: "Document intelligence brief (PDF)",
    description:
      "Downloadable PDF overview you can share offline or attach to diligence packets.",
    file: "Veridoc_Document_Intelligence.pdf",
    kind: "pdf",
  },
];
