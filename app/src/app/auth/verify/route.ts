/**
 * /auth/verify?token=… — exchanges a magic-link token for a session
 * cookie and redirects to /today (or whichever ?next route was set
 * before the user kicked off the login).
 */
import { NextResponse, type NextRequest } from "next/server";
import { verifyMagicToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const next = req.nextUrl.searchParams.get("next") ?? "/today";
  if (!token) {
    return NextResponse.redirect(new URL("/login?error=empty", req.nextUrl));
  }

  const user = await verifyMagicToken(token);
  if (!user) {
    return NextResponse.redirect(new URL("/login?error=expired", req.nextUrl));
  }

  return NextResponse.redirect(new URL(next, req.nextUrl));
}
