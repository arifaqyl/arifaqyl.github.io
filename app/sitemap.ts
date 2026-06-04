import { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getProjects } from "@/lib/repository";
import { PortfolioProject } from "@/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const base = [
    "",
    "/projects",
    "/now",
    "/contact"
  ].map((path) => ({
    url: `${env.siteUrl}${path}`,
    lastModified: new Date()
  }));

  const projectRoutes = projects.map((project: PortfolioProject) => ({
    url: `${env.siteUrl}/projects/${project.slug}`,
    lastModified: new Date()
  }));

  return [...base, ...projectRoutes];
}
