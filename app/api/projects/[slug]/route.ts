import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/repository";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: Context) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }
  return NextResponse.json({ project });
}

