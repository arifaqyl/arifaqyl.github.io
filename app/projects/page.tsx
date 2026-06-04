import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
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
          title="A deeper portfolio, not just a repo wall."
          description="These projects are organized as system stories: what problem existed, how the architecture worked, what tradeoffs showed up, and what the result actually was."
        />
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

