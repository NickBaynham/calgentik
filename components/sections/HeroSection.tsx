import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

type Cta = { label: string; href: string; external?: boolean; variant?: "primary" | "secondary" };

type HeroSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctas?: Cta[];
  children?: ReactNode;
  /** Show decorative art (replace /public/brand/hero-abstract.svg with your artifact export). */
  showHeroArt?: boolean;
};

const btnPrimary =
  "inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-on-gradient)] shadow-[0_0_28px_-6px_var(--glow-teal)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-strong)]";

const btnSecondary =
  "inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-elevated)_75%,transparent)] px-5 py-2.5 text-sm font-semibold text-[var(--text)] shadow-sm backdrop-blur-sm transition hover:border-[color-mix(in_srgb,var(--accent-strong)_45%,var(--border))] hover:bg-[color-mix(in_srgb,var(--bg-elevated)_95%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-strong)]";

export function HeroSection({
  eyebrow,
  title,
  subtitle,
  ctas = [],
  children,
  showHeroArt = false,
}: HeroSectionProps) {
  return (
    <section className="hero-proto border-b border-[var(--border)]">
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
          <div className="max-w-2xl animate-fade-up">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-[var(--heading)] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl">
              {subtitle}
            </p>
            {ctas.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {ctas.map((cta) =>
                  cta.external ? (
                    <a
                      key={cta.href + cta.label}
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cta.variant === "secondary" ? btnSecondary : btnPrimary}
                    >
                      {cta.label}
                    </a>
                  ) : (
                    <Link
                      key={cta.href + cta.label}
                      href={cta.href}
                      className={cta.variant === "secondary" ? btnSecondary : btnPrimary}
                    >
                      {cta.label}
                    </Link>
                  ),
                )}
              </div>
            ) : null}
            {children}
          </div>
          {showHeroArt ? (
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div
                className="animate-pulse-soft pointer-events-none absolute -inset-4 rounded-[2rem] opacity-70 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(45,212,191,0.25), transparent 55%), radial-gradient(circle at 70% 60%, rgba(34,211,238,0.15), transparent 50%)",
                }}
                aria-hidden
              />
              <Image
                src="/brand/hero-abstract.svg"
                alt=""
                width={560}
                height={480}
                className="relative w-full drop-shadow-2xl"
                priority
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
