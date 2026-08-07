import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 天

function sign(expiresAt: number) {
  const secret = process.env.ADMIN_SESSION_SECRET!;
  return createHmac("sha256", secret).update(String(expiresAt)).digest("hex");
}

export function createSessionCookieValue() {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  return `${expiresAt}.${sign(expiresAt)}`;
}

function isValidToken(token: string) {
  const [expiresAtStr, signature] = token.split(".");
  if (!expiresAtStr || !signature) return false;

  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expected = sign(expiresAt);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminAuthed() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return isValidToken(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;