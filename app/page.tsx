import Link from "next/link";
import { LiveAppsShowcase } from "@/components/live-apps-showcase";
import { ProjectExplainerShowcase } from "@/components/project-explainer-showcase";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { getFeaturedProjects, getNowUpdates, getSiteSection } from "@/lib/repository";

export const metadata = {
  title: "Home",
  description:
    "Arif Aqyl builds practical tools around information people need to trust — kedai payments, transit disruptions, and developer tooling."
};

export default async function HomePage() {
  const [hero, about, contact, featuredProjects, nowUpdates] = await Promise.all([
    getSiteSection("hero"),
    getSiteSection("about"),
    getSiteSection("contact"),
    getFeaturedProjects(),
    getNowUpdates()
  ]);
  const spotlight = featuredProjects.filter(
    (project) => !["sah-bukti", "trafficmy"].includes(project.slug)
  ).slice(0, 4);

  return (
    <SiteShell>
      <section className="hero" id="hero">
        <article className="hero-card hero-main">
          <div className="hero-kicker">
            <span className="hero-kicker-dot" />
            open to internship · kl based
          </div>
          <p className="eyebrow">software engineer</p>
          <h1>{hero?.title ?? "I build software for the messy moment between \u201csomeone said so\u201d and \u201cwe know.\u201d"}</h1>
          <p className="hero-terminal">
            <span>&gt;</span> {hero?.subtitle ?? "kedai operations, transit information, and developer tools"}
          </p>
          <p className="muted">
            {hero?.body ??
              "Three shipped systems live up front — Sah.Bukti, TrafficMY, and Threadterm — each built around a real workflow where proof and trust matter."}
          </p>
          <div className="hero-actions">
            <Link href="#live" className="button-primary">
              View live apps
            </Link>
            <Link href="/projects" className="button-secondary">
              Open project index
            </Link>
            <Link href="https://github.com/arifaqyl" className="button-secondary" target="_blank" rel="noreferrer">
              GitHub
            </Link>
          </div>
        </article>

        <div className="hero-side">
          <article className="hero-card hero-index">
            <p className="eyebrow">featured index</p>
            <h2>Case studies, not decoration.</h2>
            <div className="project-index-list">
              {spotlight.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="project-index-item">
                  <div>
                    <span className="project-index-label">{project.category}</span>
                    <strong>{project.title}</strong>
                  </div>
                  <p>{project.summary}</p>
                </Link>
              ))}
            </div>
          </article>

          <div className="stats-strip">
            <article className="stat-card">
              <strong>{featuredProjects.length}</strong>
              <span>documented projects</span>
            </article>
            <article className="stat-card">
              <strong>2</strong>
              <span>live production apps</span>
            </article>
            <article className="stat-card">
              <strong>{nowUpdates.length}</strong>
              <span>active focus areas</span>
            </article>
            <article className="stat-card">
              <strong>24/7</strong>
              <span>droplet-backed uptime lane</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="live">
        <SectionHeading
          eyebrow="live apps"
          title="Production systems with their own lane"
          description="Live products stay visible up front — Sah.Bukti and TrafficMY are shipped systems, not portfolio filler."
        />
        <LiveAppsShowcase />
      </section>

      <section className="section" id="work">
        <SectionHeading
          eyebrow="project lab"
          title="Interactive project documentation"
          description="Open a card, read the problem, inspect the architecture, and jump into the full case study when you want depth."
        />
        <ProjectExplainerShowcase projects={featuredProjects} />
      </section>

      <section className="section" id="now">
        <SectionHeading
          eyebrow="now"
          title="What I'm focused on now"
          description="A quick read on what is active without making people hunt through the repo list."
        />
        <div className="content-grid">
          {nowUpdates.map((item) => (
            <article key={item.title} className="content-card">
              <p className="eyebrow">{item.tag}</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="about">
        <SectionHeading
          eyebrow="about"
          title={about?.title ?? "I build small systems around information people need to trust."}
          description={
            about?.subtitle ??
            "Malaysian full-stack engineer. Whether a WhatsApp payment was actually made, whether a train disruption is corroborated, or whether a developer can use Threads without a browser — the work starts with an awkward real workflow and stays close to its constraints."
          }
        />
        <div className="content-grid">
          <article className="content-card">
            <h3>What this site is</h3>
            <p className="muted">
              A portfolio that reads like documentation: live apps up front, expandable project cards,
              and route-level case studies underneath — not a gallery of screenshots.
            </p>
          </article>
          <article className="content-card">
            <h3>How I like to build</h3>
            <p className="muted">
              Start from friction, ship the smallest useful system, then harden it with tests, deploy paths,
              and a public story that explains the engineering honestly.
            </p>
          </article>
          <article className="content-card">
            <h3>What you&rsquo;ll find here</h3>
            <p className="muted">
              Kedai operations, public transit information, and developer tooling —
              with live demos and repos where the proof actually matters.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="contact">
        <SectionHeading
          eyebrow="contact"
          title={contact?.title ?? "Let's build something real."}
          description={
            contact?.subtitle ??
            "Open to internship opportunities in backend engineering, automation, and applied AI."
          }
        />
        <div className="content-grid two-up">
          <article className="content-card">
            <h3>What I respond to</h3>
            <ul className="hero-list">
              <li>backend engineering for real workflows</li>
              <li>kedai and small-business operations tooling</li>
              <li>public information and transit systems</li>
              <li>developer tooling and CLI/TUI work</li>
            </ul>
          </article>
          <article className="content-card">
            <h3>Reach out</h3>
            <p className="muted">
              Internships, collaborations, or systems work — the contact page is the fastest way in.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="button-primary">
                Open contact form
              </Link>
              <Link href="mailto:hello@arifaqyl.me" className="button-secondary">
                Email me
              </Link>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
