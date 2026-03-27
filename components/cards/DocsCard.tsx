import Link from "next/link";
import type { DocLink } from "@/data/docs-index";

export function DocsCard({ doc }: { doc: DocLink }) {
  return (
    <Link
      href={doc.href}
      className="card-surface group flex flex-col rounded-2xl p-6 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-[var(--heading)] group-hover:text-[var(--accent-strong)]">
          {doc.title}
        </h3>
        {doc.badge ? (
          <span className="shrink-0 rounded-full bg-[var(--surface-muted)] px-2 py-0.5 text-xs font-semibold text-[var(--accent-strong)]">
            {doc.badge}
          </span>
        ) : null}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
        {doc.description}
      </p>
      <span className="mt-4 text-sm font-semibold text-[var(--accent-strong)]">Open →</span>
    </Link>
  );
}
