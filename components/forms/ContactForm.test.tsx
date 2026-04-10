import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows thank-you after a successful submit", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^name$/i), "Test User");
    await user.type(screen.getByLabelText(/work email/i), "test@example.com");
    await user.type(screen.getByLabelText(/how can we help/i), "Hello from unit tests.");

    await user.click(screen.getByRole("button", { name: /submit inquiry/i }));

    expect(await screen.findByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/thank you/i);
    expect(screen.getByRole("status")).toHaveTextContent(/message was sent/i);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
    const [, init] = vi.mocked(globalThis.fetch).mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({
      name: "Test User",
      email: "test@example.com",
      message: "Hello from unit tests.",
    });
    expect(body).not.toHaveProperty("website");
  });

  it("shows an error when the API returns a failure", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "Server says no." }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^name$/i), "Test User");
    await user.type(screen.getByLabelText(/work email/i), "test@example.com");
    await user.type(screen.getByLabelText(/how can we help/i), "Hello.");

    await user.click(screen.getByRole("button", { name: /submit inquiry/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/server says no/i);
  });
});
