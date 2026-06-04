import { AuthCallout } from "@/components/admin/auth-callout";
import { getProjects, getSiteSettings } from "@/lib/repository";
import { env } from "@/lib/env";
import { getAdminSession } from "@/lib/auth";

export default async function AdminOverviewPage() {
  const session = await getAdminSession();
  const projects = await getProjects();
  const settings = await getSiteSettings();

  return (
    <div className="admin-stack">
      <AuthCallout signedIn={Boolean(session)} configured={env.githubConfigured} />
      <section className="admin-card">
        <div className="admin-card-head">
          <div>
            <p className="eyebrow">overview</p>
            <h2>Portfolio system status</h2>
          </div>
        </div>
        <div className="content-grid">
          <article className="content-card">
            <h3>{projects.length}</h3>
            <p className="muted">Projects loaded into the content layer.</p>
          </article>
          <article className="content-card">
            <h3>{settings.length}</h3>
            <p className="muted">Site settings records available.</p>
          </article>
          <article className="content-card">
            <h3>{env.databaseConfigured ? "database ready" : "seed fallback"}</h3>
            <p className="muted">Public routes use fallback content until PostgreSQL is connected.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

