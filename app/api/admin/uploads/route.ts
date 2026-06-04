import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function POST() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json(
    {
      error:
        "Upload handling is intentionally not enabled yet. Use hosted object storage or Vercel Blob before turning on admin media uploads."
    },
    { status: 501 }
  );
}

