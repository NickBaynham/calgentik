import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Request a demo, investor deck, or technical session with the ${site.name} team.`,
};

export default function ContactPage() {
  return (
    <>
      <HeroSection
        eyebrow="Contact"
        title="Request a demo or start a conversation"
        subtitle="Choose the inquiry type that fits—demo, investor, partnership, or technical deep dive. This form is front-end only until you connect an API endpoint."
        ctas={[{ label: "Launch App", href: site.appUrl, external: true, variant: "secondary" }]}
      />
      <section className="pb-20">
        <Container className="max-w-2xl">
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
