/**
 * Edge proxy (Next.js 16 successor to "middleware"): gates the (app)
 * route group behind a session cookie. The cookie's existence is the
 * only check here — full session validation happens in the page via
 * getCurrentUser(), because the SQLite/D1 client doesn't run in the
 * edge runtime.
 */
import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "dogworld_session";

const PROTECTED_PREFIXES = [
  "/today",
  "/hunder",
  "/dog",
  "/kull",
  "/kennel",
  "/pedigree",
  "/mer",
];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  const sid = req.cookies.get(SESSION_COOKIE)?.value;
  if (sid) {
    return NextResponse.next();
  }

  // No session — redirect to /login with ?next= so we can return after auth
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals + static assets + the auth/login routes themselves
  matcher: [
    "/((?!_next|api/|auth/|login|onboarding|styleguide|favicon.ico).*)",
  ],
};
