import 'server-only';
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session");
  }
}


export async function createSession(userToken: string) {
  // const expires = new Date(Date.now() + 15 * 60 * 1000);
  const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); 
  const session = await encrypt({ userToken, expires });  

  cookies().set("session", session, { expires, httpOnly: true }); 
}


export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function verifySession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    console.log("No session found");
    return null;
  }

  const decryptedSession = await decrypt(session);
  return decryptedSession?.userToken;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  // parsed.expires = new Date(Date.now() + 10 * 1000);
  const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); 
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
