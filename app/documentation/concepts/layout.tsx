import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Concepts",
  description: "Core ideas behind VerifiedSignal: eight intelligence dimensions, collections, and verification.",
};

export default function ConceptsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--bg)] py-12 lg:py-16">
      <Container>
        <div className="prose prose-invert prose-slate max-w-none prose-headings:font-display prose-a:text-[var(--accent-strong)]">
          {children}
        </div>
      </Container>
    </div>
  );
}
