import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="font-display text-3xl font-semibold tracking-tight text-[var(--heading)]"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mt-10 border-b border-[var(--border)] pb-2 font-display text-xl font-semibold text-[var(--heading)]"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-8 font-display text-lg font-semibold text-[var(--heading)]" {...props} />
    ),
    p: (props) => (
      <p className="mt-4 leading-relaxed text-[var(--text-muted)]" {...props} />
    ),
    ul: (props) => (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--text-muted)]" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-[var(--text-muted)]" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    code: (props) => (
      <code
        className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-sm text-[var(--accent-strong)]"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 font-mono text-sm text-[var(--text)]"
        {...props}
      />
    ),
    a: (props) => (
      <a
        className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="mt-4 border-l-4 border-[var(--accent)] pl-4 italic text-[var(--text-muted)]"
        {...props}
      />
    ),
    ...components,
  };
}
