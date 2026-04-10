import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const mockSend = vi.hoisted(() =>
  vi.fn().mockResolvedValue({ data: { id: "test-id" }, error: null }),
);

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: (...args: unknown[]) => mockSend(...args) },
  })),
}));

function jsonRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBody = {
  inquiry: "Request demo",
  name: "Jane",
  email: "jane@example.com",
  company: "",
  message: "Hello",
} as const;

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("CONTACT_INBOX_EMAIL", "recipient@example.com");
    mockSend.mockResolvedValue({ data: { id: "test-id" }, error: null });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("returns 503 when RESEND_API_KEY is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await POST(jsonRequest(validBody));
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.error).toMatch(/not configured/i);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 503 when CONTACT_INBOX_EMAIL is missing", async () => {
    vi.stubEnv("CONTACT_INBOX_EMAIL", "   ");
    const res = await POST(jsonRequest(validBody));
    expect(res.status).toBe(503);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid JSON", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 400 when body is not a plain object", async () => {
    const res = await POST(jsonRequest([1, 2, 3]));
    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 200 without sending email when honeypot website is set", async () => {
    const res = await POST(
      jsonRequest({ ...validBody, website: "http://spam.example" }),
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ ok: true });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid inquiry type", async () => {
    const res = await POST(jsonRequest({ ...validBody, inquiry: "Unknown" }));
    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await POST(jsonRequest({ ...validBody, message: "   " }));
    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid email format", async () => {
    const res = await POST(jsonRequest({ ...validBody, email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 400 when company exceeds max length", async () => {
    const res = await POST(
      jsonRequest({ ...validBody, company: "x".repeat(201) }),
    );
    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 200 and calls Resend with validated payload on success", async () => {
    const res = await POST(
      jsonRequest({
        ...validBody,
        company: "Acme",
        message: "Need a demo <script>x</script>",
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    expect(mockSend).toHaveBeenCalledTimes(1);
    const [args] = mockSend.mock.calls;
    expect(args[0]).toMatchObject({
      from: expect.stringContaining("Calgentik") as string,
      to: ["recipient@example.com"],
      replyTo: "jane@example.com",
      subject: "[Calgentik] Request demo: Jane",
    });
    const html = (args[0] as { html: string }).html;
    expect(html).toContain("Request demo");
    expect(html).toContain("Jane");
    expect(html).toContain("jane@example.com");
    expect(html).toContain("Acme");
    expect(html).toContain("Need a demo &lt;script&gt;x&lt;/script&gt;");
  });

  it("returns 502 when Resend returns an error", async () => {
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { message: "Rejected" },
    });
    const res = await POST(jsonRequest(validBody));
    errSpy.mockRestore();
    expect(res.status).toBe(502);
    const data = await res.json();
    expect(data.error).toMatch(/try again later/i);
  });
});
