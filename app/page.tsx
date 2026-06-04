import Image from "next/image";
import Script from "next/script";
import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/section-heading";
import { ProjectPreviewGrid } from "@/components/project-preview-grid";
import { getAwards, getFeaturedProjects, getSiteSection, getTimelineEntries } from "@/lib/repository";

export default async function HomePage() {
  const hero = await getSiteSection("hero");
  const about = await getSiteSection("about");
  const contact = await getSiteSection("contact");
  const featuredProjects = await getFeaturedProjects();
  const timeline = await getTimelineEntries();
  const awards = await getAwards();

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
      </section>

      <section className="section" id="work">
        <SectionHeading
          eyebrow="featured work"
          title="Projects that go deeper than screenshots."
          description="Each project now opens as a structured case study so people can see the system, tradeoffs, and impact instead of just a repo name."
        />
        <ProjectPreviewGrid projects={featuredProjects} />
      </section>

      <section className="section">
        <SectionHeading eyebrow="about" title={about?.title ?? "About"} description={about?.subtitle ?? undefined} />
        <div className="content-grid">
          <article className="content-card">
            <h3>How I work</h3>
            <p className="muted">
              {about?.body}
            </p>
          </article>
          <article className="content-card">
            <h3>What I like building</h3>
            <p className="muted">
              Automation pipelines, operational tooling, backend-heavy apps, and systems that reduce repetitive human work.
            </p>
          </article>
          <article className="content-card">
            <h3>What I want next</h3>
            <p className="muted">
              Strong internship environments where I can ship, learn from serious engineers, and keep sharpening system design instincts.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="timeline" title="How the work has evolved." description="A quick view of the path behind the current projects." />
        <div className="timeline-grid">
          {timeline.map((entry) => (
            <article key={entry.title} className="timeline-card">
              {entry.mediaSrc ? (
                <Image src={entry.mediaSrc} alt={entry.organization} width={480} height={300} />
              ) : null}
              <p className="eyebrow">{entry.organization}</p>
              <h3>{entry.title}</h3>
              <p className="muted">{entry.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="highlights" title="Proof of momentum outside the repo list." description="Awards, committees, and team-facing work that show how I operate beyond solo coding." />
        <div className="awards-grid">
          {awards.map((award) => (
            <article key={award.title + award.year} className="award-card">
              {award.imageSrc ? <Image src={award.imageSrc} alt={award.title} width={480} height={300} /> : null}
              <p className="eyebrow">{award.year}</p>
              <h3>{award.title}</h3>
              <p className="muted">{award.eventName}</p>
              <p className="muted">{award.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="contact" title={contact?.title ?? "Get in touch"} description={contact?.subtitle ?? undefined} />
        <article className="content-card">
          <p className="muted">{contact?.body}</p>
          <div className="hero-actions">
            <a href="/contact" className="button-primary">Send a message</a>
            <a href="https://github.com/arifaqyl" className="button-secondary" target="_blank" rel="noreferrer">View GitHub</a>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}

