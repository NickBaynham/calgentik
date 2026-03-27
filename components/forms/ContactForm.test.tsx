import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("shows a thank-you state after submit without calling a server", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^name$/i), "Test User");
    await user.type(screen.getByLabelText(/work email/i), "test@example.com");
    await user.type(screen.getByLabelText(/how can we help/i), "Hello from unit tests.");

    await user.click(screen.getByRole("button", { name: /submit inquiry/i }));

    expect(await screen.findByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/thank you/i);
  });
});
