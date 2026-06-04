import { ContactForm } from "@/components/contact-form";
import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Contact",
  description: "Contact Arif Aqyl for internships, collaboration, or project conversations."
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="section">
        <SectionHeading
          eyebrow="contact"
          title="Send a message without guessing where to start."
          description="This form is backed by the portfolio database so messages are stored and reviewable from the admin side."
        />
        <div className="contact-layout">
          <article className="content-card">
            <h3>What to use this for</h3>
            <div className="rich-content">
              <ul>
                <li>Internship opportunities in backend engineering, automation, and applied AI</li>
                <li>Project collaboration or technical discussions</li>
                <li>Questions about a case study or repo</li>
              </ul>
              <p>Email fallback: <a href="mailto:hello@arifaqyl.me">hello@arifaqyl.me</a></p>
            </div>
          </article>
          <ContactForm />
        </div>
      </section>
    </SiteShell>
  );
}

