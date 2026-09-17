import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE = "bc_admin_session";

function sign(value: string) {
  return crypto.createHmac("sha256", process.env.SESSION_SECRET || "change-me").update(value).digest("hex");
}

export function createSession(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function validSession(token?: string) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.exp > Date.now() && data.email === process.env.ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export async function isAdmin() {
  const store = await cookies();
  return validSession(store.get(COOKIE)?.value);
}

export const sessionCookieName = COOKIE;