import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

export const sessionCookieName = "bc_store_session";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSession(email: string) {
  const timestamp = Date.now().toString();
  const data = `${email}|${timestamp}`;
  const signature = sign(data);

  return Buffer.from(`${data}|${signature}`).toString("base64url");
}

export async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token || !getSecret()) return false;

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split("|");

    if (parts.length !== 3) return false;

    const [email, timestamp, signature] = parts;

    if (email !== process.env.ADMIN_EMAIL) return false;

    const age = Date.now() - Number(timestamp);

    if (!Number.isFinite(age) || age < 0 || age > SESSION_MAX_AGE * 1000) {
      return false;
    }

    const expectedSignature = sign(`${email}|${timestamp}`);

    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}
