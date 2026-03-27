type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--heading)] sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
