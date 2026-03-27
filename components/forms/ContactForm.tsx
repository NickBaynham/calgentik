"use client";

import { useState } from "react";

const inquiryTypes = [
  "Request demo",
  "Investor inquiry",
  "Partnership",
  "Technical discussion",
] as const;

const inputClass =
  "mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--text)] shadow-inner placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST to API route or third-party form handler (e.g. HubSpot, SES).
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card-surface rounded-2xl p-8 transition duration-300" role="status">
        <h3 className="font-display text-xl font-semibold text-[var(--heading)]">Thank you</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
          Your message has been recorded in this demo UI. Wire the form to your CRM or email
          endpoint when ready.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-surface rounded-2xl p-6 transition duration-300 sm:p-8"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="inquiry" className="text-sm font-medium text-[var(--text)]">
            Inquiry type
          </label>
          <select
            id="inquiry"
            name="inquiry"
            required
            className={inputClass}
            defaultValue={inquiryTypes[0]}
          >
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name" className="text-sm font-medium text-[var(--text)]">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="company" className="text-sm font-medium text-[var(--text)]">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-[var(--text)]">
            How can we help?
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className={inputClass}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-on-gradient)] shadow-[0_0_24px_-6px_var(--glow-teal)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-strong)]"
        >
          Submit inquiry
        </button>
        <p className="text-xs text-[var(--text-muted)]">
          No backend is connected yet; this submission is simulated.
        </p>
      </div>
    </form>
  );
}
