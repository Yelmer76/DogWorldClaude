/**
 * /auth/logout — clears the session cookie and bounces to /login.
 * GET so it can be linked to from the Mer page without a form.
 */
import { NextResponse, type NextRequest } from "next/server";
import { logout } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await logout();
  return NextResponse.redirect(new URL("/login", req.nextUrl));
}
