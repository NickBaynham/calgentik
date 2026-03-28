import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "OpenAPI",
  description:
    "Interactive Swagger UI for the VerifiedSignal HTTP API (draft OpenAPI 3 specification).",
};

export default function OpenApiLayout({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--bg)] py-10 lg:py-14">
      <Container>
        <header className="mb-8 space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent-strong)]">
            Draft specification
          </p>
          <h1 className="font-display text-3xl text-[var(--heading)] sm:text-4xl">
            API reference
          </h1>
          <p className="max-w-2xl text-[var(--text-muted)]">
            OpenAPI 3 document for documents, collections, scores, and SSE status
            streams. Base URLs and operation details are illustrative until the
            production service publishes a canonical spec.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link
              href="/documentation/api"
              className="text-[var(--accent-strong)] underline-offset-4 hover:underline"
            >
              API concepts &amp; SSE notes
            </Link>
            <a
              href="/openapi/verifiedsignal.yaml"
              className="text-[var(--accent-strong)] underline-offset-4 hover:underline"
            >
              Raw YAML
            </a>
          </p>
        </header>
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] shadow-[0_0_0_1px_rgba(0,0,0,0.2)]">
          {children}
        </div>
      </Container>
    </div>
  );
}
