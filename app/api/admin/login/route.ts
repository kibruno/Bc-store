import { NextResponse } from "next/server";
import { createSession, sessionCookieName } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) return NextResponse.json({error:"invalid"}, {status:401});
  const res = NextResponse.json({ok:true});
  res.cookies.set(sessionCookieName, createSession(email), { httpOnly:true, secure:process.env.NODE_ENV==="production", sameSite:"lax", path:"/", maxAge:60*60*24*7 });
  return res;
}