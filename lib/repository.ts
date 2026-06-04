import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { awards, nowUpdates, projects, siteSections, siteSettings, timelineEntries } from "@/lib/seed-data";
import { env } from "@/lib/env";
import { PortfolioProject, PortfolioTechnology } from "@/lib/types";

function projectSelect() {
  return {
    tabs: { orderBy: { orderIndex: "asc" as const } },
    metrics: { orderBy: { orderIndex: "asc" as const } },
    media: { orderBy: { orderIndex: "asc" as const } },
    technologies: {
      include: { technology: true }
    }
  };
}

type ProjectTechnologyJoin = {
  technology?: PortfolioTechnology;
};

type ProjectRecord = PortfolioProject & {
  id?: string;
  technologies: Array<PortfolioTechnology | ProjectTechnologyJoin>;
};

function isTechnology(value: unknown): value is PortfolioTechnology {
  if (!value || typeof value !== "object") return false;
  return "name" in value && "slug" in value && "category" in value;
}

function toProjectView(project: ProjectRecord): PortfolioProject {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
        .map((item) => ("technology" in item && item.technology ? item.technology : item))
        .filter(isTechnology)
    : [];

  return {
    ...project,
    technologies
  };
}

export async function getProjects(): Promise<PortfolioProject[]> {
  if (!env.databaseConfigured) {
    return projects;
  }
  try {
    const data = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
      include: projectSelect()
    });
    return data.map((project) => toProjectView(project as unknown as ProjectRecord));
  } catch {
    return projects;
  }
}

export async function getFeaturedProjects(): Promise<PortfolioProject[]> {
  const data = await getProjects();
  return data.filter((project) => project.featured).slice(0, 4);
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  if (!env.databaseConfigured) {
    return projects.find((project) => project.slug === slug) ?? null;
  }
  try {
    const data = await prisma.project.findUnique({
      where: { slug },
      include: projectSelect()
    });
    return data ? toProjectView(data as unknown as ProjectRecord) : null;
  } catch {
    return projects.find((project) => project.slug === slug) ?? null;
  }
}

export async function getRelatedProjects(slug: string, limit = 3) {
  const all = await getProjects();
  const current = all.find((project) => project.slug === slug);
  if (!current) return all.slice(0, limit);

  const techSlugs = new Set((current.technologies || []).map((tech) => tech.slug));
  return all
    .filter((project) => project.slug !== slug)
    .map((project) => ({
      project,
      score: (project.technologies || []).filter((tech) => techSlugs.has(tech.slug)).length
    }))
    .sort((a, b) => b.score - a.score || a.project.sortOrder - b.project.sortOrder)
    .slice(0, limit)
    .map((item) => item.project);
}

export async function getSiteSection(key: string) {
  if (!env.databaseConfigured) {
    return siteSections.find((item) => item.key === key) ?? null;
  }
  try {
    return await prisma.siteSection.findUnique({ where: { key } });
  } catch {
    return siteSections.find((item) => item.key === key) ?? null;
  }
}

export async function getNowUpdates() {
  if (!env.databaseConfigured) {
    return nowUpdates.sort((a, b) => a.orderIndex - b.orderIndex);
  }
  try {
    return await prisma.nowUpdate.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: "asc" }
    });
  } catch {
    return nowUpdates.sort((a, b) => a.orderIndex - b.orderIndex);
  }
}

export async function getTimelineEntries() {
  if (!env.databaseConfigured) {
    return timelineEntries.sort((a, b) => a.orderIndex - b.orderIndex);
  }
  try {
    return await prisma.timelineEntry.findMany({ orderBy: { orderIndex: "asc" } });
  } catch {
    return timelineEntries.sort((a, b) => a.orderIndex - b.orderIndex);
  }
}

export async function getAwards() {
  if (!env.databaseConfigured) {
    return awards.sort((a, b) => a.orderIndex - b.orderIndex);
  }
  try {
    return await prisma.award.findMany({ orderBy: { orderIndex: "asc" } });
  } catch {
    return awards.sort((a, b) => a.orderIndex - b.orderIndex);
  }
}

export async function getSiteSettings() {
  if (!env.databaseConfigured) {
    return siteSettings;
  }
  try {
    return await prisma.siteSetting.findMany();
  } catch {
    return siteSettings;
  }
}

export async function createProject(input: {
  slug: string;
  title: string;
  summary: string;
  year: number;
  status: string;
  visibility: string;
  category: string;
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}) {
  return prisma.project.create({
    data: {
      ...input,
      featured: Boolean(input.featured),
      sortOrder: 99
    }
  });
}

export async function updateProject(id: string, data: Prisma.ProjectUpdateInput) {
  return prisma.project.update({
    where: { id },
    data
  });
}
