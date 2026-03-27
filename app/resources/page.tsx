import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { mediaResources } from "@/data/resources";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description: `Video, audio, and PDF resources for ${site.name} and document intelligence.`,
};

function mediaUrl(file: string) {
  return `/resources/${encodeURIComponent(file)}`;
}

export default function ResourcesPage() {
  return (
    <>
      <HeroSection
        eyebrow="Resources"
        title="Video, audio, and documents"
        subtitle="Supplementary materials from the docs folder—stream in the browser or download for offline review."
        ctas={[
          { label: "Documentation", href: "/documentation", variant: "secondary" },
          { label: "Contact", href: "/contact", variant: "secondary" },
        ]}
      />

      <section className="border-b border-[var(--border)] py-16">
        <Container>
          <ul className="flex flex-col gap-16">
            {mediaResources.map((item) => {
              const url = mediaUrl(item.file);
              return (
                <li key={item.id} id={item.id}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                        {item.kind === "video"
                          ? "Video"
                          : item.kind === "audio"
                            ? "Podcast / audio"
                            : "PDF"}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--heading)]">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                        {item.description}
                      </p>
                    </div>
                    <a
                      href={url}
                      download={item.file}
                      className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-elevated)_80%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--heading)] backdrop-blur-sm transition hover:border-[color-mix(in_srgb,var(--accent-strong)_45%,var(--border))]"
                    >
                      Download
                    </a>
                  </div>

                  <div className="mt-6">
                    {item.kind === "video" ? (
                      <video
                        className="aspect-video w-full max-w-4xl rounded-2xl border border-[var(--border)] bg-black shadow-lg"
                        controls
                        preload="metadata"
                        playsInline
                      >
                        <source src={url} type="video/mp4" />
                        <a href={url}>Download the video (MP4)</a>
                      </video>
                    ) : null}
                    {item.kind === "audio" ? (
                      <div className="card-surface max-w-2xl rounded-2xl p-6">
                        <audio className="w-full" controls preload="metadata">
                          <source src={url} type="audio/mp4" />
                          <a href={url}>Download the audio (M4A)</a>
                        </audio>
                      </div>
                    ) : null}
                    {item.kind === "pdf" ? (
                      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] shadow-lg">
                        <iframe
                          title={item.title}
                          src={url}
                          className="h-[min(75vh,720px)] w-full"
                        />
                        <p className="border-t border-[var(--border)] px-4 py-3 text-center text-xs text-[var(--text-muted)]">
                          If the preview does not load, use Download above or open the PDF in a new
                          tab:{" "}
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[var(--accent-strong)] hover:underline"
                          >
                            Open PDF
                          </a>
                          .
                        </p>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
