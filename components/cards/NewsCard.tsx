import Link from "next/link";
import type { NewsArticle } from "@/data/news";

type NewsCardProps = {
  article: NewsArticle;
  featured?: boolean;
};

export function NewsCard({ article, featured }: NewsCardProps) {
  const CardInner = (
    <>
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
        <span className="rounded-full bg-[var(--surface-muted)] px-2 py-0.5 font-medium text-[var(--accent-strong)]">
          {article.category}
        </span>
        <time dateTime={article.date}>{article.date}</time>
      </div>
      <h3
        className={`mt-3 font-display font-semibold text-[var(--heading)] ${
          featured ? "text-xl sm:text-2xl" : "text-lg"
        }`}
      >
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{article.excerpt}</p>
      <span className="mt-4 inline-flex text-sm font-semibold text-[var(--accent-strong)]">
        Read update →
      </span>
    </>
  );

  return (
    <article
      id={article.slug}
      className={`card-surface scroll-mt-28 rounded-2xl p-6 transition duration-300 ${
        featured ? "ring-1 ring-[color-mix(in_srgb,var(--accent-strong)_35%,transparent)]" : ""
      }`}
    >
      <Link href={`/news#${article.slug}`} className="block focus-visible:outline-none">
        {CardInner}
      </Link>
    </article>
  );
}
