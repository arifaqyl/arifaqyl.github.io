"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PortfolioProject, RichContentBlock } from "@/lib/types";

function collectText(blocks: RichContentBlock[] | undefined) {
  if (!blocks?.length) return "Details available in the full case study.";
  const paragraphs = blocks
    .filter((block) => block.type === "paragraph" || block.type === "quote")
    .map((block) => block.text);

  if (paragraphs.length) {
    return paragraphs.join(" ");
  }

  const list = blocks.find((block) => block.type === "list");
  if (list) {
    return list.items.join(" • ");
  }

  return "Details available in the full case study.";
}

function findCode(project: PortfolioProject) {
  for (const tab of project.tabs) {
    const block = tab.richContent.find((item) => item.type === "code");
    if (block) return block;
  }
  return null;
}

function getProjectStory(project: PortfolioProject) {
  const problem = project.tabs.find((tab) => tab.key === "problem");
  const architecture = project.tabs.find((tab) => tab.key === "architecture");
  const build = project.tabs.find((tab) => tab.key === "build");
  const results = project.tabs.find((tab) => tab.key === "results");
  const code = findCode(project);

  return {
    problem: collectText(problem?.richContent),
    architecture: collectText(architecture?.richContent),
    build: collectText(build?.richContent),
    results: collectText(results?.richContent),
    code
  };
}

function formatStatus(project: PortfolioProject) {
  if (project.visibility === "private") return "private";
  return `${project.status} · ${project.year}`;
}

export function ProjectExplainerShowcase({
  projects,
  compact = false
}: {
  projects: PortfolioProject[];
  compact?: boolean;
}) {
  const filters = useMemo(
    () => ["all", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects]
  );
  const [filter, setFilter] = useState("all");
  const [openSlug, setOpenSlug] = useState<string | null>(projects[0]?.slug ?? null);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter, projects]);

  const effectiveOpenSlug = filtered.some((project) => project.slug === openSlug)
    ? openSlug
    : filtered[0]?.slug ?? null;

  return (
    <div className="pf-showcase">
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

      <div className="pf-grid">
        {filtered.map((project, index) => {
          const story = getProjectStory(project);
          const isOpen = effectiveOpenSlug === project.slug;

          return (
            <article
              key={project.slug}
              className={isOpen ? "pf-card open" : "pf-card"}
              style={{ ["--project-accent" as string]: project.accent ?? "#ccff00" }}
            >
              <button
                type="button"
                className="pf-header"
                onClick={() => setOpenSlug(isOpen ? null : project.slug)}
                aria-expanded={isOpen}
              >
                <div className="pf-left">
                  <span className="pf-num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="pf-name">
                      {project.slug.replace(/-/g, "_")} — {project.title}
                    </span>
                    <p className="pf-summary">{project.summary}</p>
                  </div>
                </div>

                <div className="pf-right">
                  <div className="pf-tags">
                    {project.technologies.slice(0, compact ? 3 : 4).map((tech) => (
                      <span key={tech.slug} className="chip">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <span
                    className={
                      project.visibility === "private" ? "pf-badge private" : "pf-badge live"
                    }
                  >
                    {formatStatus(project)}
                  </span>
                </div>
              </button>

              {isOpen ? (
                <div className="pf-body">
                  <div className="pf-content">
                    <div className="pf-block">
                      <p className="pf-block-label">Problem</p>
                      <p className="pf-block-text">{story.problem}</p>
                    </div>

                    <div className="pf-block">
                      <p className="pf-block-label">Architecture</p>
                      <p className="pf-block-text">{story.architecture}</p>
                    </div>

                    <div className="pf-block">
                      <p className="pf-block-label">What I built</p>
                      <p className="pf-block-text">{story.build}</p>
                    </div>

                    <div className="pf-block">
                      <p className="pf-block-label">Result</p>
                      <p className="pf-block-text">{story.results}</p>
                    </div>

                    <div className="pf-block">
                      <p className="pf-block-label">Stack</p>
                      <div className="pf-stack">
                        {project.technologies.map((tech) => (
                          <span key={tech.slug} className="chip">
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pf-block">
                      <p className="pf-block-label">Signals</p>
                      <div className="pf-metrics">
                        {project.metrics.slice(0, 3).map((metric) => (
                          <div key={metric.label} className="metric">
                            <span className="metric-value">
                              {metric.value}
                              {metric.suffix ?? ""}
                            </span>
                            <span className="metric-label">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {story.code ? (
                      <div className="pf-code">
                        <div className="pf-code-header">{story.code.title}</div>
                        <pre>{story.code.snippet}</pre>
                      </div>
                    ) : null}

                    <div className="pf-footer">
                      <Link href={`/projects/${project.slug}`} className="pf-link">
                        Open full case study
                      </Link>
                      {project.liveUrl ? (
                        <Link href={project.liveUrl} target="_blank" rel="noreferrer" className="pf-link">
                          View live
                        </Link>
                      ) : null}
                      {project.repoUrl ? (
                        <Link href={project.repoUrl} target="_blank" rel="noreferrer" className="pf-link">
                          GitHub
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
