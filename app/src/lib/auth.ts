/**
 * Server-only auth helpers for the magic-link login flow.
 *
 * Sprint 14 prints magic-link URLs to the dev console. Sprint 15 will
 * swap the `deliverMagicLink` step to send via Resend.
 *
 * Cookie name: dogworld_session. Sessions live 30 days. Tokens live
 * 15 minutes and are single-use (consumed on first verify).
 */
import "server-only";
import { cookies } from "next/headers";
import { eq, and, gt, isNull } from "drizzle-orm";
import { randomBytes } from "node:crypto";
import { db } from "@/db";
import {
  users,
  sessions,
  magicTokens,
  type UserRow,
} from "@/db/schema";

const SESSION_COOKIE = "dogworld_session";
const SESSION_DAYS = 30;
const TOKEN_MINUTES = 15;

function isoIn(ms: number): string {
  return new Date(Date.now() + ms).toISOString();
}

function newId(): string {
  return randomBytes(18).toString("base64url");
}

// ── Magic link issue + verify ─────────────────────────────────────────────

export type IssueResult = {
  email: string;
  /** Full URL the user clicks; in dev we surface it on screen too. */
  url: string;
  /** Bare token (used in tests + dev console output) */
  token: string;
  expiresAt: string;
};

/**
 * Issue a magic-link token for the given email. Creates the user
 * record on first sign-in (passwordless signup). Always returns the
 * URL — the caller decides whether to email it (Sprint 15) or just
 * print it (Sprint 14 dev).
 */
export async function issueMagicLink(
  emailRaw: string,
  origin: string,
): Promise<IssueResult> {
  const email = emailRaw.trim().toLowerCase();
  if (!email.includes("@")) {
    throw new Error("Ugyldig e-postadresse");
  }

  // Auto-create user if first time
  const existing = db.select().from(users).where(eq(users.email, email)).get();
  if (!existing) {
    db.insert(users)
      .values({
        id: newId(),
        email,
        name: email.split("@")[0],
        createdAt: new Date().toISOString(),
      })
      .run();
  }

  const token = newId();
  const expiresAt = isoIn(TOKEN_MINUTES * 60 * 1000);
  db.insert(magicTokens)
    .values({ token, email, expiresAt, consumedAt: null })
    .run();

  const url = `${origin}/auth/verify?token=${encodeURIComponent(token)}`;

  // Dev: log so you don't need email yet
  if (process.env.NODE_ENV !== "production") {
    console.log("\n────────────────────────────────────────────");
    console.log(`✉  Magic link for ${email}`);
    console.log(`   ${url}`);
    console.log(`   (utløper ${expiresAt})`);
    console.log("────────────────────────────────────────────\n");
  }

  return { email, url, token, expiresAt };
}

/**
 * Verify a token: marks it consumed, creates a session, sets the cookie.
 * Returns the user on success or null if the token is invalid/expired/used.
 */
export async function verifyMagicToken(
  token: string,
): Promise<UserRow | null> {
  const now = new Date().toISOString();
  const row = db
    .select()
    .from(magicTokens)
    .where(
      and(
        eq(magicTokens.token, token),
        gt(magicTokens.expiresAt, now),
        isNull(magicTokens.consumedAt),
      ),
    )
    .get();
  if (!row) return null;

  db.update(magicTokens)
    .set({ consumedAt: now })
    .where(eq(magicTokens.token, token))
    .run();

  const user = db
    .select()
    .from(users)
    .where(eq(users.email, row.email))
    .get();
  if (!user) return null;

  // Create session + set cookie
  const sessionId = newId();
  const expiresAt = isoIn(SESSION_DAYS * 24 * 60 * 60 * 1000);
  db.insert(sessions)
    .values({
      id: sessionId,
      userId: user.id,
      expiresAt,
      createdAt: now,
    })
    .run();

  const jar = await cookies();
  jar.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    path: "/",
  });

  return user;
}

// ── Session lookup + logout ───────────────────────────────────────────────

export async function getCurrentUser(): Promise<UserRow | null> {
  const jar = await cookies();
  const sid = jar.get(SESSION_COOKIE)?.value;
  if (!sid) return null;

  const now = new Date().toISOString();
  const session = db
    .select()
    .from(sessions)
    .where(and(eq(sessions.id, sid), gt(sessions.expiresAt, now)))
    .get();
  if (!session) return null;

  const user = db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .get();
  return user ?? null;
}

export async function logout(): Promise<void> {
  const jar = await cookies();
  const sid = jar.get(SESSION_COOKIE)?.value;
  if (sid) {
    db.delete(sessions).where(eq(sessions.id, sid)).run();
  }
  jar.delete(SESSION_COOKIE);
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
