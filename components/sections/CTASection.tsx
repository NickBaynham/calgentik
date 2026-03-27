import Link from "next/link";
import { Container } from "@/components/layout/Container";

type CTASectionProps = {
  title: string;
  body: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string; external?: boolean };
};

export function CTASection({ title, body, primary, secondary }: CTASectionProps) {
  return (
    <section className="relative border-y border-[color-mix(in_srgb,var(--accent-strong)_22%,var(--border))] py-16 text-white">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#042f2e] via-[var(--navy-soft)] to-[#0c1222]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(45,212,191,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--heading)] sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {primary.external ? (
              <a
                href={primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-on-gradient)] shadow-[0_0_24px_-6px_var(--glow-teal)] transition hover:brightness-110"
              >
                {primary.label}
              </a>
            ) : (
              <Link
                href={primary.href}
                className="inline-flex rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-on-gradient)] shadow-[0_0_24px_-6px_var(--glow-teal)] transition hover:brightness-110"
              >
                {primary.label}
              </Link>
            )}
            {secondary ? (
              secondary.external ? (
                <a
                  href={secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/10"
                >
                  {secondary.label}
                </a>
              ) : (
                <Link
                  href={secondary.href}
                  className="inline-flex rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/10"
                >
                  {secondary.label}
                </Link>
              )
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
