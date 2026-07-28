import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const RESERVED_PREFIXES = ["_next", "api", "favicon.ico", "robots.txt", "sitemap.xml"];

const isIpAddress = (hostname: string): boolean =>
  /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (RESERVED_PREFIXES.some((prefix) => pathname.startsWith(`/${prefix}`))) {
    return NextResponse.next();
  }

  const hostname = request.nextUrl.hostname;

  if (!hostname || hostname === "localhost" || isIpAddress(hostname)) {
    return NextResponse.next();
  }

  const hostParts = hostname.split(".");
  if (hostParts.length < 3) {
    return NextResponse.next();
  }

  const subdomain = hostParts[0];

  if (!subdomain || subdomain === "www" || subdomain === "localhost") {
    return NextResponse.next();
  }

  if (pathname.startsWith(`/${subdomain}`)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${subdomain}${pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};
