import "server-only";

import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

import { getDb } from "@/lib/mongodb";

const COLLECTION_NAME = "siteSettings";
const SETTINGS_ID = "emailNotifications";

const MIN_RECIPIENTS = 1;
const MAX_RECIPIENTS = 5;

function getEncryptionKey() {
  const value = process.env.SMTP_SETTINGS_ENCRYPTION_KEY;

  if (!value || !/^[a-fA-F0-9]{64}$/.test(value)) {
    throw new Error(
      "SMTP_SETTINGS_ENCRYPTION_KEY must be a 64-character hexadecimal key.",
    );
  }

  return Buffer.from(value, "hex");
}

function encryptPassword(password) {
  const key = getEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(password, "utf8"),
    cipher.final(),
  ]);

  return {
    algorithm: "aes-256-gcm",
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
    ciphertext: encrypted.toString("base64"),
  };
}

function decryptPassword(encryptedPassword) {
  if (!encryptedPassword) return "";

  const key = getEncryptionKey();

  const decipher = createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(encryptedPassword.iv, "base64"),
  );

  decipher.setAuthTag(Buffer.from(encryptedPassword.authTag, "base64"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedPassword.ciphertext, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(value) {
  return normalizeText(value).toLowerCase();
}

function isValidEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeRecipients(value) {
  if (!Array.isArray(value)) {
    throw new Error("Recipients must be an array of email addresses.");
  }

  const recipients = [...new Set(value.map(normalizeEmail).filter(Boolean))];

  if (
    recipients.length < MIN_RECIPIENTS ||
    recipients.length > MAX_RECIPIENTS
  ) {
    throw new Error("Please configure between 1 and 5 recipients.");
  }

  if (recipients.some((email) => !isValidEmail(email))) {
    throw new Error("One or more recipient email addresses are invalid.");
  }

  return recipients;
}

function validateSettings(input, existingSettings = null) {
  const host = normalizeText(input.host);
  const port = Number(input.port);
  const username = normalizeText(input.username);
  const senderEmail = normalizeEmail(input.senderEmail);
  const senderName = normalizeText(input.senderName);

  if (!host || host.length > 253) {
    throw new Error("Please enter a valid SMTP host.");
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP port must be between 1 and 65535.");
  }

  if (!username || username.length > 254) {
    throw new Error("Please enter an SMTP username.");
  }

  if (!isValidEmail(senderEmail)) {
    throw new Error("Please enter a valid sender email address.");
  }

  if (!senderName || senderName.length > 120) {
    throw new Error(
      "Sender name is required and must be 120 characters or fewer.",
    );
  }

  if (typeof input.secure !== "boolean") {
    throw new Error("Please select a valid SMTP security setting.");
  }

  const recipients = normalizeRecipients(input.recipients);

  if (
    typeof input.contactNotificationsEnabled !== "boolean" ||
    typeof input.appointmentNotificationsEnabled !== "boolean"
  ) {
    throw new Error("Notification switches must be enabled or disabled.");
  }

  const submittedPassword =
    typeof input.password === "string" ? input.password : "";

  // An empty password retains the existing saved password.
  const password = submittedPassword
    ? submittedPassword
    : existingSettings?.password
      ? decryptPassword(existingSettings.password)
      : "";

  if (!password) {
    throw new Error("SMTP password is required.");
  }

  if (password.length > 2048) {
    throw new Error("SMTP password is too long.");
  }

  return {
    host,
    port,
    secure: input.secure,
    username,
    password,
    senderEmail,
    senderName,
    recipients,
    contactNotificationsEnabled: input.contactNotificationsEnabled,
    appointmentNotificationsEnabled: input.appointmentNotificationsEnabled,
  };
}

function toPublicSettings(settings) {
  if (!settings) {
    return {
      configured: false,
      host: "",
      port: 465,
      secure: true,
      username: "",
      senderEmail: "",
      senderName: "Ultra Credit Solutions USA",
      recipients: [],
      contactNotificationsEnabled: false,
      appointmentNotificationsEnabled: false,
      hasPassword: false,
    };
  }

  return {
    configured: Boolean(settings.password),
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    username: settings.username,
    senderEmail: settings.senderEmail,
    senderName: settings.senderName,
    recipients: settings.recipients,
    contactNotificationsEnabled: settings.contactNotificationsEnabled,
    appointmentNotificationsEnabled: settings.appointmentNotificationsEnabled,
    hasPassword: Boolean(settings.password),
    updatedAt: settings.updatedAt
      ? new Date(settings.updatedAt).toISOString()
      : null,
  };
}

async function findStoredSettings() {
  const db = await getDb();

  return db.collection(COLLECTION_NAME).findOne({
    _id: SETTINGS_ID,
  });
}

export async function getEmailSettings() {
  const settings = await findStoredSettings();

  return toPublicSettings(settings);
}

export async function saveEmailSettings(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Invalid email settings.");
  }

  const existingSettings = await findStoredSettings();
  const validated = validateSettings(input, existingSettings);

  const { password, ...safeSettings } = validated;

  const db = await getDb();
  const now = new Date();

  await db.collection(COLLECTION_NAME).updateOne(
    { _id: SETTINGS_ID },
    {
      $set: {
        ...safeSettings,
        password: encryptPassword(password),
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true },
  );

  return getEmailSettings();
}

export async function getSmtpCredentials() {
  const settings = await findStoredSettings();

  if (!settings?.password) {
    return null;
  }

  return {
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    username: settings.username,
    password: decryptPassword(settings.password),
    senderEmail: settings.senderEmail,
    senderName: settings.senderName,
    recipients: settings.recipients,
    contactNotificationsEnabled: settings.contactNotificationsEnabled,
    appointmentNotificationsEnabled: settings.appointmentNotificationsEnabled,
  };
}
