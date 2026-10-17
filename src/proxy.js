
import { NextResponse } from "next/server";

const COOKIE_NAME = "ucs_admin_session";

function base64UrlToBytes(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );

  return Uint8Array.from(atob(padded), (char) =>
    char.charCodeAt(0),
  );
}

async function isValidSession(token, secret) {
  try {
    if (!token || !secret || secret.length < 32) return false;

    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra) return false;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signature),
      new TextEncoder().encode(payload),
    );

    if (!valid) return false;

    const data = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(payload)),
    );

    return (
      typeof data.email === "string" &&
      Number.isFinite(data.exp) &&
      data.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const authenticated = await isValidSession(
    token,
    process.env.ADMIN_SESSION_SECRET,
  );

  if (authenticated) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin/")) {
    return NextResponse.json(
      { message: "Unauthorized. Please sign in." },
      { status: 401 },
    );
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
