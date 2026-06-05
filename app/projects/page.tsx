import { ProjectExplainerShowcase } from "@/components/project-explainer-showcase";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { getProjects } from "@/lib/repository";

export const metadata = {
  title: "Projects",
  description: "Detailed case studies and systems work by Arif Aqyl."
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <SiteShell>
      <section className="section">
        <SectionHeading
          eyebrow="project index"
          title="The project list is meant to be read like engineering notes."
          description="Every project opens into the same explanation flow: what was broken, how I approached it, what the implementation looked like, and what outcome it produced."
        />
        <ProjectExplainerShowcase projects={projects} compact />
      </section>
    </SiteShell>
  );
}
