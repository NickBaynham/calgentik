import { docsFaqItems } from "@/data/reference-content";

export default function FaqPage() {
  return (
    <>
      <h1>FAQ</h1>
      <p>Practical answers sourced from the product reference—refine with your GTM and security teams as you approach launch.</p>
      <div className="not-prose mt-10 space-y-6">
        {docsFaqItems.map((item) => (
          <div
            key={item.q}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--heading)]">{item.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.a}</p>
          </div>
        ))}
      </div>
    </>
  );
}
