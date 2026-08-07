import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_MAX_AGE_SECONDS,
  ADMIN_COOKIE_NAME,
  createSessionCookieValue,
} from "@/lib/admin-auth";

function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD!;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (typeof password !== "string" || !passwordMatches(password)) {
    return NextResponse.json({ error: "密碼錯誤" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE_SECONDS,
  });

  return response;
}