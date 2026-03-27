import Link from "next/link";
import type { Solution } from "@/data/solutions";

type UseCaseGridProps = {
  solutions: Solution[];
  showCta?: boolean;
};

export function UseCaseGrid({ solutions, showCta }: UseCaseGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {solutions.map((s) => (
        <article
          key={s.id}
          className="card-surface flex flex-col rounded-2xl p-6 transition duration-300"
          id={s.id}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
            {s.industry}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-[var(--heading)]">{s.title}</h3>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
            <div>
              <p className="font-semibold text-[var(--text)]">Problem</p>
              <p className="mt-1">{s.problem}</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--text)]">How VerifiedSignal helps</p>
              <p className="mt-1">{s.howWeHelp}</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--text)]">Likely outcomes</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {s.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
          </div>
          {showCta ? (
            <div className="mt-6">
              <Link
                href="/contact"
                className="text-sm font-semibold text-[var(--accent-strong)] hover:underline"
              >
                Discuss this workflow →
              </Link>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
