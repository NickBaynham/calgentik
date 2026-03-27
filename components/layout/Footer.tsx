import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { site } from "@/lib/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--navy)_100%,transparent)] text-slate-300">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-xl font-semibold text-[var(--heading)]">{site.name}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              {site.description} Built for teams that need auditable document intelligence—not
              black-box automation.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Company site: {site.domain} · Application: verifiedsignal.io
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--heading)]">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 transition hover:text-[var(--accent-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-strong)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--heading)]">Resources</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={site.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition hover:text-[var(--accent-muted)]"
                >
                  Launch App
                </a>
              </li>
              <li>
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition hover:text-[var(--accent-muted)]"
                >
                  GitHub repository
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 transition hover:text-[var(--accent-muted)]"
                >
                  Request a demo
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-slate-400 transition hover:text-[var(--accent-muted)]"
                >
                  Video, audio & PDF
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.company}. All rights reserved.</p>
          <p className="max-w-xl">
            {site.name} is a document intelligence platform. Messaging on this site describes
            product direction and is not a binding commitment.
          </p>
        </div>
      </Container>
    </footer>
  );
}
