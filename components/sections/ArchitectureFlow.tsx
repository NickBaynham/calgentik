type Step = {
  id: string;
  title: string;
  detail: string;
};

const defaultSteps: Step[] = [
  {
    id: "ingest",
    title: "Ingest",
    detail: "Normalize uploads, object storage, and metadata capture.",
  },
  {
    id: "process",
    title: "Process",
    detail: "Async workers orchestrate extraction and scoring jobs.",
  },
  {
    id: "index",
    title: "Index",
    detail: "Derived structures feed OpenSearch for retrieval.",
  },
  {
    id: "review",
    title: "Review",
    detail: "Human checkpoints with evidence and audit trails.",
  },
  {
    id: "integrate",
    title: "Integrate",
    detail: "API-first exports into CRM, GRC, and line-of-business tools.",
  },
];

function ArrowRight({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--accent-strong)]">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function ArrowDown({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--accent-strong)]">
        <path
          d="M12 5v14M6 13l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function ArchitectureFlow({ steps = defaultSteps }: { steps?: Step[] }) {
  return (
    <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
      {steps.map((step, i) => (
        <div key={step.id} className="flex flex-1 items-stretch">
          <div className="card-surface flex flex-1 flex-col rounded-2xl p-5 transition duration-300 lg:min-w-0 lg:rounded-none lg:border-r-0 lg:first:rounded-l-2xl lg:last:rounded-r-2xl lg:last:border-r">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
              Step {i + 1}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-[var(--heading)]">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{step.detail}</p>
          </div>
          {i < steps.length - 1 ? (
            <>
              <ArrowDown className="flex justify-center py-2 lg:hidden" />
              <div className="hidden w-10 shrink-0 items-center justify-center lg:flex">
                <ArrowRight />
              </div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
