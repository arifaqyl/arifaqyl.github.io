import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { createProject } from "@/lib/repository";
import { env } from "@/lib/env";

const projectSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  summary: z.string().min(10),
  year: z.number().int(),
  status: z.string().min(2),
  visibility: z.string().min(2),
  category: z.string().min(2),
  repoUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().optional()
});

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!env.databaseConfigured) {
    return NextResponse.json({ error: "Database is not configured yet." }, { status: 503 });
  }
  const parsed = projectSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid project payload.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const project = await createProject({
    ...data,
    repoUrl: data.repoUrl || undefined,
    liveUrl: data.liveUrl || undefined
  });

  return NextResponse.json({ project });
}

