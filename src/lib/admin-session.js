
import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "ucs_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be at least 32 characters.",
    );
  }

  return secret;
}

function encodeBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function createSignature(payload, secret) {
  return createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
}

export function createAdminSession(email) {
  const secret = getSecret();

  const payload = encodeBase64Url(
    JSON.stringify({
      email,
      exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE,
    }),
  );

  const signature = createSignature(payload, secret);

  return `${payload}.${signature}`;
}

export function verifyAdminSession(token) {
  try {
    const secret = getSecret();

    if (typeof token !== "string" || !token) {
      return false;
    }

    const parts = token.split(".");

    if (parts.length !== 2) {
      return false;
    }

    const [payload, signature] = parts;
    const expectedSignature = createSignature(payload, secret);

    const actualBuffer = Buffer.from(signature, "base64url");
    const expectedBuffer = Buffer.from(
      expectedSignature,
      "base64url",
    );

    if (
      actualBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(actualBuffer, expectedBuffer)
    ) {
      return false;
    }

    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );

    return (
      typeof data.email === "string" &&
      data.email.length > 0 &&
      Number.isFinite(data.exp) &&
      data.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}
