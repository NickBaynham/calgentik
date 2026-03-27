import type { ReactNode } from "react";

export type FeatureItem = {
  title: string;
  description: string;
  icon?: ReactNode;
};

type FeatureGridProps = {
  items: FeatureItem[];
  columns?: 2 | 3;
};

export function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  const grid =
    columns === 2
      ? "grid gap-6 sm:grid-cols-2"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={grid}>
      {items.map((item) => (
        <div
          key={item.title}
          className="card-surface rounded-2xl p-6 transition duration-300"
        >
          {item.icon ? (
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface-muted)] text-[var(--accent-strong)]">
              {item.icon}
            </div>
          ) : null}
          <h3 className="font-display text-lg font-semibold text-[var(--heading)]">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
