"use server";
import { cookies } from "next/headers";
const { createSecretKey } = require("crypto");
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
const SECRET_KEY = createSecretKey(process.env.JWT_SECRET_KEY, "utf-8");

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 min from now")
    .sign(SECRET_KEY);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, SECRET_KEY, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function setUserCookies(userData: any) {
  const expires = new Date(Date.now() + 30 * 60000);
  const session = await encrypt({ userData, expires });
  cookies().set("cybernet_session", session, { expires, httpOnly: true });
}

export async function getUserCookieSession() {
  const session = cookies().get("cybernet_session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function logout() {
  cookies().set("cybernet_session", "", { expires: new Date(0) });
}
