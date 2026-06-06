import Link from "next/link";
import { ProjectExplainerShowcase } from "@/components/project-explainer-showcase";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { getFeaturedProjects, getNowUpdates, getSiteSection } from "@/lib/repository";

export const metadata = {
  title: "Home",
  description: "Arif Aqyl's portfolio with a project-docs homepage, case studies, current work, and contact paths."
};

export default async function HomePage() {
  const [hero, about, contact, featuredProjects, nowUpdates] = await Promise.all([
    getSiteSection("hero"),
    getSiteSection("about"),
    getSiteSection("contact"),
    getFeaturedProjects(),
    getNowUpdates()
  ]);
  const projectIndex = featuredProjects.slice(0, 4);

  return (
    <SiteShell>
      <section className="hero" id="hero">
        <article className="hero-card">
          <p className="eyebrow">project docs / portfolio index</p>
          <h1>{hero?.title ?? "Read the work first, then decide what matters."}</h1>
          <p>
            {hero?.body ??
              "This homepage is designed like an index. Each project opens into a case study so people can skim the result, inspect the build, and jump into the details without hunting through a generic portfolio layout."}
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="button-primary">
              Open project index
            </Link>
            <Link href="/now" className="button-secondary">
              See now
            </Link>
            <Link href="/legacy/index.html" className="button-secondary">
              Open legacy view
            </Link>
          </div>
        </article>

        <div className="hero-side">
          <article className="hero-card hero-index">
            <p className="eyebrow">project map</p>
            <h2>Featured work, arranged like documentation.</h2>
            <div className="project-index-list">
              {projectIndex.map((project) => (
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

          <article className="hero-card hero-note">
            <p className="eyebrow">how to read this</p>
            <h2>Start with the index, then open the case study.</h2>
            <p>
              Open a card to inspect the problem, architecture, build process, results, and live
              links. The site is meant to read like documentation instead of a static gallery.
            </p>
            <ul className="hero-list">
              <li>scan the featured project index first</li>
              <li>filter the full project list by category</li>
              <li>expand the case-study tabs for deeper context</li>
              <li>jump to the repo or the live system when available</li>
            </ul>
          </article>

          <div className="stats-strip">
            <article className="stat-card">
              <strong>{featuredProjects.length}</strong>
              <span>featured projects on the front page</span>
            </article>
            <article className="stat-card">
              <strong>{nowUpdates.length}</strong>
              <span>current focus items</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <SectionHeading
          eyebrow="project lab"
          title="Interactive project documentation"
          description="Open a card, read the problem, inspect the architecture, and jump into the full case study when you want the deeper version."
        />
        <ProjectExplainerShowcase projects={featuredProjects} />
      </section>

      <section className="section" id="now">
        <SectionHeading
          eyebrow="now"
          title="What I’m focused on now"
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
          title={about?.title ?? "Backend-minded builder with a bias for shipping."}
          description={about?.subtitle ?? "I like projects that connect infrastructure, automation, data, and user experience into something useful."}
        />
        <div className="content-grid">
          <article className="content-card">
            <h3>What this site is</h3>
            <p className="muted">
              A portfolio system that combines a public homepage, interactive project docs, and
              route-level case studies. The old visual identity still exists in the legacy copy,
              but the landing page now explains the work directly.
            </p>
          </article>
          <article className="content-card">
            <h3>Why the project section exists</h3>
            <p className="muted">
              Each project is meant to answer what it does, what problem it solves, and what the
              implementation looked like. That keeps the site useful instead of just decorative.
            </p>
          </article>
          <article className="content-card">
            <h3>How to use it</h3>
            <p className="muted">
              Start on the homepage, open a project card, then move into the full case study if you
              want the deeper breakdown. The repo and live links are there when they matter.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="contact">
        <SectionHeading
          eyebrow="contact"
          title={contact?.title ?? "Let's build something real."}
          description={contact?.subtitle ?? "Open to internship opportunities in backend engineering, automation, and applied AI."}
        />
        <div className="content-grid">
          <article className="content-card">
            <h3>What I respond to</h3>
            <ul className="hero-list">
              <li>backend engineering</li>
              <li>automation and tooling</li>
              <li>applied AI systems</li>
              <li>projects with real users or a clear portfolio story</li>
            </ul>
          </article>
          <article className="content-card">
            <h3>Reach out</h3>
            <p className="muted">
              If you want to talk about internships, projects, or systems work, the contact page is
              the fastest way in.
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
          <article className="content-card">
            <h3>Legacy view</h3>
            <p className="muted">
              The old full-screen homepage still exists if you want the original visual identity.
              The new root page keeps the same energy but adds the project documentation layer.
            </p>
            <div className="hero-actions">
              <Link href="/legacy/index.html" className="button-secondary">
                Open legacy homepage
              </Link>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
