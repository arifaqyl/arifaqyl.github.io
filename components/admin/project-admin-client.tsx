"use client";

import { useMemo, useState } from "react";
import { PortfolioProject } from "@/lib/types";

type AdminProject = Pick<
  PortfolioProject,
  "id" | "slug" | "title" | "summary" | "year" | "status" | "visibility" | "category" | "featured" | "repoUrl" | "liveUrl"
>;

const blankProject: AdminProject = {
  slug: "",
  title: "",
  summary: "",
  year: new Date().getFullYear(),
  status: "draft",
  visibility: "public",
  category: "automation",
  featured: false,
  repoUrl: "",
  liveUrl: ""
};

export function ProjectAdminClient({ initialProjects }: { initialProjects: AdminProject[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [draft, setDraft] = useState<AdminProject>(blankProject);
  const [message, setMessage] = useState("");

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => Number(b.featured) - Number(a.featured) || a.year - b.year),
    [projects]
  );

  async function createProject(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft)
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "Failed to create project.");
      return;
    }
    setProjects([...projects, data.project]);
    setDraft(blankProject);
    setMessage("Project created.");
  }

  async function toggleFeatured(project: AdminProject) {
    if (!project.id) return;
    const response = await fetch(`/api/admin/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !project.featured })
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "Failed to update project.");
      return;
    }
    setProjects(projects.map((item) => (item.id === project.id ? data.project : item)));
    setMessage(`Updated ${project.title}.`);
  }

  return (
    <div className="admin-stack">
      <section className="admin-card">
        <div className="admin-card-head">
          <div>
            <p className="eyebrow">owner tools</p>
            <h2>Projects</h2>
          </div>
          <p className="muted">CRUD is live for project creation and featured toggles. Deep tab/media editing is backed by Prisma and can expand from here.</p>
        </div>
        <div className="admin-project-list">
          {sortedProjects.map((project) => (
            <div key={project.slug} className="admin-project-row">
              <div>
                <p className="row-title">{project.title}</p>
                <p className="muted">{project.slug} · {project.category} · {project.visibility}</p>
              </div>
              <button type="button" className="button-secondary" onClick={() => toggleFeatured(project)}>
                {project.featured ? "Remove featured" : "Feature project"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-card-head">
          <div>
            <p className="eyebrow">create</p>
            <h2>New project</h2>
          </div>
          {message ? <p className="muted">{message}</p> : null}
        </div>
        <form className="contact-form" onSubmit={createProject}>
          <div className="form-grid">
            <label>
              <span>Slug</span>
              <input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} required />
            </label>
            <label>
              <span>Title</span>
              <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required />
            </label>
          </div>
          <label>
            <span>Summary</span>
            <textarea rows={4} value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} required />
          </label>
          <div className="form-grid">
            <label>
              <span>Year</span>
              <input type="number" value={draft.year} onChange={(e) => setDraft({ ...draft, year: Number(e.target.value) })} required />
            </label>
            <label>
              <span>Status</span>
              <input value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })} required />
            </label>
          </div>
          <div className="form-grid">
            <label>
              <span>Visibility</span>
              <select value={draft.visibility} onChange={(e) => setDraft({ ...draft, visibility: e.target.value })}>
                <option value="public">public</option>
                <option value="private">private</option>
              </select>
            </label>
            <label>
              <span>Category</span>
              <input value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} required />
            </label>
          </div>
          <div className="form-grid">
            <label>
              <span>GitHub URL</span>
              <input value={draft.repoUrl ?? ""} onChange={(e) => setDraft({ ...draft, repoUrl: e.target.value })} />
            </label>
            <label>
              <span>Live URL</span>
              <input value={draft.liveUrl ?? ""} onChange={(e) => setDraft({ ...draft, liveUrl: e.target.value })} />
            </label>
          </div>
          <label className="checkbox">
            <input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} />
            <span>Feature on homepage</span>
          </label>
          <button type="submit" className="button-primary">Create project</button>
        </form>
      </section>
    </div>
  );
}
