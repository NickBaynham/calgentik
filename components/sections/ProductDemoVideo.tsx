import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { videoSourceMimeType } from "@/lib/media";

const DEMO_FILE = "VerifiedSignal_screen_recording_demo.mov";

function demoUrl() {
  return `/resources/${encodeURIComponent(DEMO_FILE)}`;
}

export function ProductDemoVideo() {
  const url = demoUrl();
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface-muted)]/40 py-16">
      <Container>
        <SectionHeader
          eyebrow="See it in action"
          title="Watch the product in motion"
          description="Screen recording of VerifiedSignal—document intake, review UI, and intelligence overlays. For the full media library (including downloads), visit Resources."
        />
        <div className="mt-10">
          <video
            className="aspect-video w-full max-w-5xl rounded-2xl border border-[var(--border)] bg-black shadow-[0_24px_80px_-32px_rgba(0,0,0,0.75)]"
            controls
            preload="metadata"
            playsInline
          >
            <source src={url} type={videoSourceMimeType(DEMO_FILE)} />
            <a href={url} className="text-[var(--accent-strong)] hover:underline">
              Download the screen recording
            </a>
          </video>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--text-muted)]">
            <Link
              href="/resources#screen-recording-demo"
              className="font-semibold text-[var(--accent-strong)] hover:underline"
            >
              Open in Resources →
            </Link>
            <span className="text-[var(--text-muted)]">
              Large file—first play may take a moment while the stream buffers.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
