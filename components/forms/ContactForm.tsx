"use client";

import { useState } from "react";
import { CONTACT_INQUIRY_TYPES } from "@/lib/contact-inquiry-types";

const inputClass =
  "mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--text)] shadow-inner placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]";

type SubmitState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const website = String(fd.get("website") ?? "").trim();
    if (website.length > 0) {
      setState("success");
      return;
    }

    const inquiry = String(fd.get("inquiry") ?? "").trim();
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    setState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiry, name, email, company, message }),
      });

      const data: unknown = await res.json().catch(() => null);
      const messageText =
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : "Something went wrong. Please try again.";

      if (!res.ok) {
        let detail = messageText;
        if (typeof data === "object" && data !== null) {
          const rec = data as Record<string, unknown>;
          if (Array.isArray(rec.missingEnv) && rec.missingEnv.every((x) => typeof x === "string")) {
            detail += ` Missing: ${(rec.missingEnv as string[]).join(", ")}.`;
          }
          if (typeof rec.hint === "string" && rec.hint.length > 0) {
            detail += ` ${rec.hint}`;
          }
        }
        setErrorMessage(detail);
        setState("error");
        return;
      }

      setState("success");
      form.reset();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="card-surface rounded-2xl p-8 transition duration-300" role="status">
        <h3 className="font-display text-xl font-semibold text-[var(--heading)]">Thank you</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
          Your message was sent. We will get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative card-surface rounded-2xl p-6 transition duration-300 sm:p-8"
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
            defaultValue={CONTACT_INQUIRY_TYPES[0]}
          >
            {CONTACT_INQUIRY_TYPES.map((t) => (
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
      {/* Honeypot: hidden from users; bots often fill every field. */}
      <div className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {state === "error" && errorMessage ? (
        <p className="mt-6 text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-on-gradient)] shadow-[0_0_24px_-6px_var(--glow-teal)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "loading" ? "Sending…" : "Submit inquiry"}
        </button>
        <p className="text-xs text-[var(--text-muted)]">
          We use your email only to respond to this inquiry.
        </p>
      </div>
    </form>
  );
}
