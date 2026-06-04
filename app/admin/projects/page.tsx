import { ProjectAdminClient } from "@/components/admin/project-admin-client";
import { AuthCallout } from "@/components/admin/auth-callout";
import { env } from "@/lib/env";
import { getAdminSession } from "@/lib/auth";
import { getProjects } from "@/lib/repository";
import { PortfolioProject } from "@/lib/types";

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  const projects = await getProjects();

  return (
    <div className="admin-stack">
      {!session ? <AuthCallout signedIn={false} configured={env.githubConfigured} /> : null}
      <ProjectAdminClient initialProjects={projects as PortfolioProject[]} />
    </div>
  );
}
