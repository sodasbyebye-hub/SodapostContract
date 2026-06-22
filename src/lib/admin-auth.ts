import "server-only";

import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "sodapost_admin_session";
const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60;

function getRequiredEnvironmentVariable(name: "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

function safeEqual(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function signExpiresAt(expiresAt: string) {
  return createHmac("sha256", getRequiredEnvironmentVariable("ADMIN_SESSION_SECRET"))
    .update(expiresAt)
    .digest("base64url");
}

function createSessionValue(expiresAt: number) {
  const value = String(expiresAt);
  return `${value}.${signExpiresAt(value)}`;
}

function verifySessionValue(value: string | undefined) {
  if (!value) return false;

  const [expiresAt, signature, ...extra] = value.split(".");
  if (!expiresAt || !signature || extra.length > 0 || !/^\d+$/.test(expiresAt)) {
    return false;
  }

  if (Number(expiresAt) <= Date.now()) {
    return false;
  }

  return safeEqual(signature, signExpiresAt(expiresAt));
}

export function verifyAdminPassword(password: string) {
  return safeEqual(password, getRequiredEnvironmentVariable("ADMIN_PASSWORD"));
}

export async function createAdminSession() {
  const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createSessionValue(expiresAt), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
    expires: new Date(expiresAt),
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  return verifySessionValue(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  if (!(await hasAdminSession())) {
    throw new Error("Unauthorized.");
  }
}
