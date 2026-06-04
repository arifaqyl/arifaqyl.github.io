import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { updateProject } from "@/lib/repository";
import { env } from "@/lib/env";

const patchSchema = z.object({
  featured: z.boolean().optional(),
  summary: z.string().min(10).optional(),
  status: z.string().min(2).optional()
});

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Context) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!env.databaseConfigured) {
    return NextResponse.json({ error: "Database is not configured yet." }, { status: 503 });
  }
  const parsed = patchSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update payload.", issues: parsed.error.flatten() }, { status: 400 });
  }
  const { id } = await params;
  const project = await updateProject(id, parsed.data);
  return NextResponse.json({ project });
}

