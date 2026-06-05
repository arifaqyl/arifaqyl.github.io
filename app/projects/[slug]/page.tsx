import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichContent } from "@/components/rich-content";
import { SiteShell } from "@/components/site-shell";
import { ProjectTabs } from "@/components/project-tabs";
import { getProjectBySlug, getRelatedProjects } from "@/lib/repository";
import { PortfolioProject } from "@/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.media?.[0]?.src ? [project.media[0].src] : ["/media/og-image.jpg"]
    }
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const related = await getRelatedProjects(slug);
  const overviewBlocks = project.tabs.find((tab) => tab.key === "overview")?.richContent ?? [];

  return (
    <SiteShell>
      <section className="section">
        <div className="project-page-grid">
          <article className="project-detail-card">
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p className="project-summary">{project.summary}</p>
            <div className="project-lead">
              <p className="pf-block-label">Project walkthrough</p>
              <RichContent blocks={overviewBlocks} />
            </div>
            <ProjectTabs tabs={project.tabs} />
          </article>
          <aside className="meta-grid">
            <article className="meta-card">
              <h3>Snapshot</h3>
              <div className="project-tech-row">
                {(project.technologies ?? []).map((tech) => (
                  <span key={tech.slug} className="chip">{tech.name}</span>
                ))}
              </div>
              <div className="project-metrics">
                {(project.metrics ?? []).map((metric) => (
                  <div key={metric.label} className="metric">
                    <span className="metric-value">
                      {metric.value}
                      {metric.suffix ?? ""}
                    </span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
              <div className="hero-actions">
                {project.liveUrl ? <Link href={project.liveUrl} className="button-primary" target="_blank" rel="noreferrer">View live</Link> : null}
                {project.repoUrl ? <Link href={project.repoUrl} className="button-secondary" target="_blank" rel="noreferrer">View repo</Link> : null}
              </div>
            </article>
            <article className="meta-card">
              <h3>Related work</h3>
              <div className="admin-stack">
                {related.map((item: PortfolioProject) => (
                  <Link href={`/projects/${item.slug}`} key={item.slug} className="admin-project-row">
                    <div>
                      <p className="row-title">{item.title}</p>
                      <p className="muted">{item.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </article>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
