import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/now") {
    return NextResponse.rewrite(new URL("/legacy/now.html", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/now"]
};
