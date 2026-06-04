import { Prisma, PrismaClient } from "@prisma/client";
import { awards, nowUpdates, projects, siteSections, siteSettings, timelineEntries } from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        summary: project.summary,
        status: project.status,
        year: project.year,
        visibility: project.visibility,
        featured: project.featured,
        repoUrl: project.repoUrl,
        liveUrl: project.liveUrl,
        category: project.category,
        accent: project.accent,
        sortOrder: project.sortOrder
      },
      create: {
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        status: project.status,
        year: project.year,
        visibility: project.visibility,
        featured: project.featured,
        repoUrl: project.repoUrl,
        liveUrl: project.liveUrl,
        category: project.category,
        accent: project.accent,
        sortOrder: project.sortOrder
      }
    });

    const dbProject = await prisma.project.findUniqueOrThrow({ where: { slug: project.slug } });

    await prisma.projectTab.deleteMany({ where: { projectId: dbProject.id } });
    await prisma.projectMetric.deleteMany({ where: { projectId: dbProject.id } });
    await prisma.projectMedia.deleteMany({ where: { projectId: dbProject.id } });
    await prisma.projectTechnology.deleteMany({ where: { projectId: dbProject.id } });

    for (const tech of project.technologies) {
      const dbTech = await prisma.technology.upsert({
        where: { slug: tech.slug },
        update: { name: tech.name, category: tech.category },
        create: tech
      });

      await prisma.projectTechnology.create({
        data: {
          projectId: dbProject.id,
          technologyId: dbTech.id
        }
      });
    }

    await prisma.projectTab.createMany({
      data: project.tabs.map((tab) => ({
        projectId: dbProject.id,
        key: tab.key,
        label: tab.label,
        orderIndex: tab.orderIndex,
        richContent: tab.richContent
      }))
    });

    await prisma.projectMetric.createMany({
      data: project.metrics.map((metric) => ({
        projectId: dbProject.id,
        label: metric.label,
        value: metric.value,
        suffix: metric.suffix,
        orderIndex: metric.orderIndex
      }))
    });

    if (project.media.length) {
      await prisma.projectMedia.createMany({
        data: project.media.map((item) => ({
          projectId: dbProject.id,
          type: item.type,
          src: item.src,
          alt: item.alt,
          width: item.width,
          height: item.height,
          orderIndex: item.orderIndex,
          isCover: Boolean(item.isCover)
        }))
      });
    }
  }

  for (const section of siteSections) {
    await prisma.siteSection.upsert({
      where: { key: section.key },
      update: {
        key: section.key,
        title: section.title,
        subtitle: section.subtitle,
        body: section.body,
        jsonPayload: (section.jsonPayload ?? undefined) as Prisma.InputJsonValue | undefined
      },
      create: {
        key: section.key,
        title: section.title,
        subtitle: section.subtitle,
        body: section.body,
        jsonPayload: (section.jsonPayload ?? undefined) as Prisma.InputJsonValue | undefined
      }
    });
  }

  await prisma.nowUpdate.deleteMany();
  await prisma.nowUpdate.createMany({ data: nowUpdates });

  await prisma.timelineEntry.deleteMany();
  await prisma.timelineEntry.createMany({ data: timelineEntries });

  await prisma.award.deleteMany();
  await prisma.award.createMany({ data: awards });

  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {
        valueJson: setting.valueJson as Prisma.InputJsonValue
      },
      create: {
        key: setting.key,
        valueJson: setting.valueJson as Prisma.InputJsonValue
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
