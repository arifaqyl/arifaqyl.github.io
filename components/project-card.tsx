import Link from "next/link";
import { PortfolioProject } from "@/lib/types";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <div>
          <p className="project-category">{project.category}</p>
          <h3>{project.title}</h3>
        </div>
        <span className={`status-pill ${project.visibility === "private" ? "private" : ""}`}>
          {project.visibility === "private" ? "private" : project.status}
        </span>
      </div>
      <p className="project-summary">{project.summary}</p>
      <div className="project-tech-row">
        {(project.technologies ?? []).slice(0, 4).map((tech) => (
          <span key={tech.slug} className="chip">
            {tech.name}
          </span>
        ))}
      </div>
      <div className="project-metrics">
        {(project.metrics ?? []).slice(0, 3).map((metric) => (
          <div key={metric.label} className="metric">
            <span className="metric-value">
              {metric.value}
              {metric.suffix ?? ""}
            </span>
            <span className="metric-label">{metric.label}</span>
          </div>
        ))}
      </div>
      <div className="project-actions">
        <Link href={`/projects/${project.slug}`} className="button-primary">
          Open case study
        </Link>
        {project.repoUrl ? (
          <Link href={project.repoUrl} className="button-secondary" target="_blank" rel="noreferrer">
            GitHub
          </Link>
        ) : null}
      </div>
    </article>
  );
}
