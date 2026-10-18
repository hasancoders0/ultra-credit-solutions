
import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "ucs_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

/**
 * Read the session signing secret from environment variables.
 */
function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be at least 32 characters."
    );
  }

  return secret;
}

/**
 * Encode a value using Base64URL.
 */
function encodeBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

/**
 * Create an HMAC-SHA256 signature for a session payload.
 */
function createSignature(payload, secret) {
  return createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
}

/**
 * Create a signed administrator session token.
 */
export function createAdminSession(identity) {
  if (typeof identity !== "string" || !identity.trim()) {
    throw new Error("A valid admin identity is required.");
  }

  const secret = getSecret();

  const payload = encodeBase64Url(
    JSON.stringify({
      email: identity.trim().toLowerCase(),
      exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE,
    })
  );

  const signature = createSignature(payload, secret);

  return `${payload}.${signature}`;
}

/**
 * Validate a session token and return its data.
 * Returns null when the token is invalid or expired.
 */
export function getAdminSession(token) {
  try {
    if (typeof token !== "string" || !token) {
      return null;
    }

    const parts = token.split(".");

    if (parts.length !== 2) {
      return null;
    }

    const [payload, signature] = parts;

    if (!payload || !signature) {
      return null;
    }

    const secret = getSecret();
    const expectedSignature = createSignature(payload, secret);

    const actualBuffer = Buffer.from(signature, "base64url");
    const expectedBuffer = Buffer.from(
      expectedSignature,
      "base64url"
    );

    if (
      actualBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(actualBuffer, expectedBuffer)
    ) {
      return null;
    }

    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (
      typeof data.email !== "string" ||
      !data.email.trim() ||
      !Number.isFinite(data.exp) ||
      data.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return {
      email: data.email,
      exp: data.exp,
    };
  } catch {
    return null;
  }
}

/**
 * Check whether an administrator session token is valid.
 */
export function verifyAdminSession(token) {
  return getAdminSession(token) !== null;
}
