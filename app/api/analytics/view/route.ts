import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";

const schema = z.object({
  path: z.string().min(1),
  referrer: z.string().nullable().optional(),
  deviceType: z.string().nullable().optional()
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!env.databaseConfigured) {
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    await prisma.pageView.create({
      data: {
        path: parsed.data.path,
        referrer: parsed.data.referrer ?? undefined,
        deviceType: parsed.data.deviceType ?? undefined,
        countryCode: request.headers.get("x-vercel-ip-country") ?? undefined
      }
    });
  } catch {
    return NextResponse.json({ ok: true, persisted: false });
  }

  return NextResponse.json({ ok: true, persisted: true });
}

