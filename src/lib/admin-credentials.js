
import "server-only";

import bcrypt from "bcryptjs";

const BCRYPT_PREFIX = /^\$2[aby]\$/;
const MIN_PASSWORD_LENGTH = 4;
const MAX_PASSWORD_LENGTH = 128;
const MAX_BCRYPT_BYTES = 72;
const BCRYPT_ROUNDS = 12;

export function validateAdminEmail(value) {
  if (typeof value !== "string") {
    throw new Error("Please enter a valid email address.");
  }

  const email = value.trim().toLowerCase();

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    throw new Error("Please enter a valid email address.");
  }

  return email;
}

export function validateNewPassword(value) {
  if (typeof value !== "string") {
    throw new Error("Please enter a valid new password.");
  }

  if (
    value.length < MIN_PASSWORD_LENGTH ||
    value.length > MAX_PASSWORD_LENGTH
  ) {
    throw new Error(
      `Your new password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`
    );
  }

  if (Buffer.byteLength(value, "utf8") > MAX_BCRYPT_BYTES) {
    throw new Error(
      "Your new password must not exceed 72 bytes."
    );
  }

  return value;
}

export async function hashAdminPassword(password) {
  const validatedPassword = validateNewPassword(password);

  return bcrypt.hash(validatedPassword, BCRYPT_ROUNDS);
}

export async function verifyAdminPassword(password, storedPassword) {
  if (
    typeof password !== "string" ||
    typeof storedPassword !== "string" ||
    !storedPassword
  ) {
    return false;
  }

  try {
    if (BCRYPT_PREFIX.test(storedPassword)) {
      if (Buffer.byteLength(password, "utf8") > MAX_BCRYPT_BYTES) {
        return false;
      }

      return await bcrypt.compare(password, storedPassword);
    }

    // Backward compatibility for existing plaintext passwords.
    return password === storedPassword;
  } catch {
    return false;
  }
}

export function isHashedAdminPassword(password) {
  return (
    typeof password === "string" &&
    BCRYPT_PREFIX.test(password)
  );
}
