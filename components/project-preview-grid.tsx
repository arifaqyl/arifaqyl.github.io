"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ProjectTabs } from "@/components/project-tabs";
import { PortfolioProject } from "@/lib/types";

const filters = ["all", "automation", "backend", "web platform"];

export function ProjectPreviewGrid({ projects }: { projects: PortfolioProject[] }) {
  const [filter, setFilter] = useState("all");
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter, projects]);

  return (
    <>
      <div className="filter-row">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? "filter-chip active" : "filter-chip"}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filtered.map((project) => (
          <div key={project.slug} className="preview-card-shell">
            <ProjectCard project={project} />
            <div className="preview-actions">
              <button type="button" className="button-secondary" onClick={() => setActiveProject(project)}>
                Quick preview
              </button>
              <Link href={`/projects/${project.slug}`} className="button-primary">
                Open full case study
              </Link>
            </div>
          </div>
        ))}
      </div>

      {activeProject ? (
        <dialog open className="project-dialog" onClose={() => setActiveProject(null)}>
          <div className="dialog-head">
            <div>
              <p className="eyebrow">{activeProject.category}</p>
              <h3>{activeProject.title}</h3>
            </div>
            <button type="button" className="dialog-close" onClick={() => setActiveProject(null)}>
              close
            </button>
          </div>
          <p className="dialog-summary">{activeProject.summary}</p>
          <ProjectTabs tabs={activeProject.tabs} />
          <div className="dialog-actions">
            <Link href={`/projects/${activeProject.slug}`} className="button-primary">
              Open full case study
            </Link>
            {activeProject.repoUrl ? (
              <Link href={activeProject.repoUrl} target="_blank" rel="noreferrer" className="button-secondary">
                GitHub
              </Link>
            ) : null}
          </div>
        </dialog>
      ) : null}
    </>
  );
}
