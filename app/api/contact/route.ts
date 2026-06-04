import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { hitRateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  subject: z.string().min(3),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") || "local";
  const limit = hitRateLimit(`contact:${forwardedFor}`, 5, 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many messages right now. Try again shortly." }, { status: 429 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact submission.", issues: parsed.error.flatten() }, { status: 400 });
  }

  if (!env.databaseConfigured) {
    return NextResponse.json({ error: "Database is not configured yet." }, { status: 503 });
  }

  const submission = await prisma.contactSubmission.create({
    data: parsed.data
  });

  return NextResponse.json({ ok: true, submissionId: submission.id });
}

