import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { isContactInquiryType } from "@/lib/contact-inquiry-types";

const LIMITS = {
  name: 200,
  email: 254,
  company: 200,
  message: 10_000,
} as const;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function trimString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const t = value.trim();
  if (t.length === 0) return null;
  if (t.length > max) return null;
  return t;
}

function isLikelyEmail(value: string): boolean {
  if (value.length > LIMITS.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX_EMAIL;

  if (!apiKey?.trim() || !inbox?.trim()) {
    const missing: string[] = [];
    if (!apiKey?.trim()) missing.push("RESEND_API_KEY");
    if (!inbox?.trim()) missing.push("CONTACT_INBOX_EMAIL");

    return NextResponse.json(
      {
        error: "Contact delivery is not configured on the server.",
        ...(process.env.NODE_ENV === "development"
          ? {
              missingEnv: missing,
              hint: "Set these in .env.local (project root) and restart `next dev`. On AWS Amplify, add them under App settings → Environment variables and redeploy.",
            }
          : {}),
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isPlainObject(body)) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const honeypot = typeof body.website === "string" ? body.website.trim() : "";
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const inquiryRaw = trimString(body.inquiry, 80);
  if (!inquiryRaw || !isContactInquiryType(inquiryRaw)) {
    return NextResponse.json({ error: "Invalid inquiry type." }, { status: 400 });
  }

  const name = trimString(body.name, LIMITS.name);
  const email = trimString(body.email, LIMITS.email);
  const message = trimString(body.message, LIMITS.message);
  const company = body.company === undefined || body.company === ""
    ? ""
    : trimString(body.company, LIMITS.company);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (company === null) {
    return NextResponse.json({ error: "Company is too long." }, { status: 400 });
  }

  if (!isLikelyEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || "Calgentik Contact <onboarding@resend.dev>";

  const html = `
    <p><strong>Inquiry</strong>: ${escapeHtml(inquiryRaw)}</p>
    <p><strong>Name</strong>: ${escapeHtml(name)}</p>
    <p><strong>Email</strong>: ${escapeHtml(email)}</p>
    ${company ? `<p><strong>Company</strong>: ${escapeHtml(company)}</p>` : ""}
    <p><strong>Message</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `.trim();

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [inbox.trim()],
    replyTo: email,
    subject: `[Calgentik] ${inquiryRaw}: ${name}`,
    html,
  });

  if (error) {
    console.error("[contact]", error);
    return NextResponse.json({ error: "Could not send your message. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
