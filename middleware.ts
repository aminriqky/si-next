import { NextResponse, type NextRequest } from "next/server";

// Middleware function with TypeScript types
export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const response = NextResponse.next();

  // Apply noindex only to vercel.app domain
  if (url.hostname.includes("vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

// Middleware configuration
export const config = {
  matcher: "/:path*", // Apply to all paths
};
