import Script from "next/script";
import { ProjectExplainerShowcase } from "@/components/project-explainer-showcase";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { getFeaturedProjects, getSiteSection } from "@/lib/repository";

export default async function HomePage() {
  const hero = await getSiteSection("hero");
  const about = await getSiteSection("about");
  const contact = await getSiteSection("contact");
  const featuredProjects = await getFeaturedProjects();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arif Aqyl",
    url: "https://arifaqyl.me",
    email: "hello@arifaqyl.me",
    sameAs: ["https://github.com/arifaqyl", "https://linkedin.com/in/arifaqyl"],
    alumniOf: "UniKL MIIT",
    knowsAbout: ["Backend engineering", "Automation", "Applied AI", "Full-stack systems"]
  };

  return (
    <SiteShell>
      <Script id="person-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <section className="hero">
        <div className="hero-card">
          <p className="eyebrow">software engineer · automation · systems</p>
          <h1>{hero?.title}</h1>
          <p>{hero?.subtitle}</p>
          <div className="hero-actions">
            <a href="#work" className="button-primary">
              Explore projects
            </a>
            <a href="/contact" className="button-secondary">
              Contact me
            </a>
          </div>
        </div>

        <div className="hero-side">
          <article className="hero-card hero-note">
            <p className="eyebrow">how to read this</p>
            <h2>Interactive project breakdowns, not random portfolio filler.</h2>
            <p>
              The original arifaqyl.me worked best when it showed the build logic directly. This
              version keeps that idea, but turns it into a cleaner system with real case studies
              and expandable code explanations for each project.
            </p>
            <ul className="hero-list">
              <li>Open a project card to see the problem, architecture, build, and result.</li>
              <li>Each project includes a representative code slice, not just marketing copy.</li>
              <li>Use the full case study page if you want the deeper implementation tabs.</li>
            </ul>
          </article>

          <div className="stats-strip">
            <div className="hero-card stat-card">
              <strong>6+</strong>
              <span>public-facing systems and automation projects</span>
            </div>
            <div className="hero-card stat-card">
              <strong>SQL-backed</strong>
              <span>portfolio rebuild with case studies, admin, contact, and SEO</span>
            </div>
            <div className="hero-card stat-card">
              <strong>Backend-first</strong>
              <span>practical focus on architecture, automation, and operational clarity</span>
            </div>
            <div className="hero-card stat-card">
              <strong>Open to internships</strong>
              <span>backend engineering, automation, and applied AI roles</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <SectionHeading
          eyebrow="featured work"
          title="Interactive coding explanations for the projects that matter most."
          description="This keeps the same design direction that made the old site memorable, but makes the projects easier to understand, easier to navigate, and much less noisy."
        />
        <ProjectExplainerShowcase projects={featuredProjects} />
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="about"
          title={about?.title ?? "About"}
          description={about?.subtitle ?? undefined}
        />
        <div className="content-grid">
          <article className="content-card">
            <h3>How I work</h3>
            <p className="muted">{about?.body}</p>
          </article>
          <article className="content-card">
            <h3>What I like building</h3>
            <p className="muted">
              Automation pipelines, operational tooling, backend-heavy apps, and systems that reduce
              repetitive human work.
            </p>
          </article>
          <article className="content-card">
            <h3>What I want next</h3>
            <p className="muted">
              Strong internship environments where I can ship, learn from serious engineers, and
              keep sharpening system design instincts.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="contact"
          title={contact?.title ?? "Get in touch"}
          description={contact?.subtitle ?? undefined}
        />
        <article className="content-card">
          <p className="muted">{contact?.body}</p>
          <div className="hero-actions">
            <a href="/contact" className="button-primary">
              Send a message
            </a>
            <a
              href="https://github.com/arifaqyl"
              className="button-secondary"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}
