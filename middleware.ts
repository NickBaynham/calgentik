import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getMediaBaseUrlForEdge } from "@/lib/media-base";

/**
 * When media lives on S3 and `public/resources/` is empty, direct requests to
 * `/resources/<filename>` would 404. Redirect to `MEDIA_BASE_URL` / `NEXT_PUBLIC_MEDIA_BASE_URL`.
 * The `/resources` page route is unchanged.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/resources" || pathname === "/resources/") {
    return NextResponse.next();
  }
  if (!pathname.startsWith("/resources/")) {
    return NextResponse.next();
  }

  const base = getMediaBaseUrlForEdge();
  if (!base) {
    return NextResponse.next();
  }

  const relative = pathname.slice("/resources/".length);
  if (!relative || relative.includes("..")) {
    return NextResponse.next();
  }

  const encoded = relative
    .split("/")
    .filter(Boolean)
    .map((s) => encodeURIComponent(s))
    .join("/");
  const target = `${base}/${encoded}`;
  return NextResponse.redirect(new URL(target), 307);
}

export const config = {
  matcher: "/resources/:path*",
};
