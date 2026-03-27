"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNav } from "@/data/navigation";
import { site } from "@/lib/site";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`focus-ring rounded-md px-2 py-1 text-sm font-medium transition-colors ${
        active
          ? "text-[var(--accent-strong)]"
          : "text-[var(--text-muted)] hover:text-[var(--heading)]"
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--bg)_65%,transparent)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="focus-ring group rounded-md">
            <span className="font-display text-lg font-semibold tracking-tight text-[var(--heading)]">
              {site.name}
            </span>
            <span className="mt-0.5 block text-xs text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-muted)]">
              by {site.company}
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {mainNav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden rounded-lg border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-elevated)_70%,transparent)] px-3 py-2 text-sm font-medium text-[var(--text)] shadow-sm backdrop-blur-sm transition hover:border-[color-mix(in_srgb,var(--accent-strong)_40%,var(--border))] sm:inline-flex"
          >
            GitHub
          </a>
          <a
            href={site.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] px-3 py-2 text-sm font-semibold text-[var(--accent-on-gradient)] shadow-[0_0_20px_-4px_var(--glow-teal)] transition hover:brightness-110 sm:inline-flex"
          >
            Launch App
          </a>
          <button
            type="button"
            className="focus-ring inline-flex rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-2 text-[var(--text)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile primary">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2 text-base font-medium text-[var(--text)] hover:bg-[var(--surface-muted)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-2 py-2 text-base font-medium text-[var(--text)] hover:bg-[var(--surface-muted)]"
            >
              GitHub
            </a>
            <a
              href={site.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] px-3 py-2 text-center text-base font-semibold text-[var(--accent-on-gradient)]"
            >
              Launch App
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
