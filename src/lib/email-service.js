
import "server-only";

import nodemailer from "nodemailer";
import { getSmtpCredentials } from "@/lib/email-settings";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function createTransport(settings) {
  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: {
      user: settings.username,
      pass: settings.password,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

function getFromAddress(settings) {
  return {
    name: settings.senderName,
    address: settings.senderEmail,
  };
}

async function sendMail({ settings, to, subject, text, html }) {
  const transporter = createTransport(settings);

  try {
    return await transporter.sendMail({
      from: getFromAddress(settings),
      to,
      subject,
      text,
      html,
    });
  } finally {
    transporter.close();
  }
}

function validateTestRecipient(email) {
  return (
    typeof email === "string" &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  );
}

/**
 * Send a test email using the currently saved SMTP settings.
 * Errors intentionally propagate so the protected API can report failure.
 */
export async function sendTestEmail(recipient) {
  const settings = await getSmtpCredentials();

  if (!settings) {
    throw new Error("SMTP settings have not been configured.");
  }

  if (!validateTestRecipient(recipient)) {
    throw new Error("Please provide a valid test recipient email.");
  }

  const to = recipient.trim();

  await sendMail({
    settings,
    to,
    subject: "SMTP Test — Ultra Credit Solutions USA",
    text: [
      "Your SMTP configuration is working.",
      "",
      "This is a test email from Ultra Credit Solutions USA.",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#081828">
        <h2>SMTP Configuration Test</h2>
        <p>Your email configuration is working correctly.</p>
        <p>This test message was sent by Ultra Credit Solutions USA.</p>
      </div>
    `,
  });

  return { success: true };
}

function buildNotificationEmail({
  title,
  introduction,
  fields,
}) {
  const rows = fields
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eeeeee;font-weight:bold;vertical-align:top">
            ${escapeHtml(label)}
          </td>
          <td style="padding:10px;border-bottom:1px solid #eeeeee;white-space:pre-wrap;overflow-wrap:anywhere">
            ${escapeHtml(value || "Not provided")}
          </td>
        </tr>
      `,
    )
    .join("");

  const text = [
    title,
    "",
    introduction,
    "",
    ...fields.map(
      ({ label, value }) => `${label}: ${value || "Not provided"}`,
    ),
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#081828">
      <div style="padding:20px;background:#2852A0;color:white">
        <h2 style="margin:0">${escapeHtml(title)}</h2>
      </div>
      <div style="padding:20px">
        <p>${escapeHtml(introduction)}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>${rows}</tbody>
        </table>
        <p style="margin-top:24px;color:#777;font-size:12px">
          Automated notification from Ultra Credit Solutions USA.
        </p>
      </div>
    </div>
  `;

  return { text, html };
}

/**
 * Notifications are best-effort:
 * failures are logged without exposing SMTP credentials or message content.
 */
async function sendSubmissionNotification({
  type,
  enabled,
  fields,
  introduction,
}) {
  if (!enabled) return;

  try {
    const settings = await getSmtpCredentials();

    if (!settings) {
      console.error(
        `[Email notification] ${type}: SMTP settings are not configured.`,
      );
      return;
    }

    if (!settings.recipients?.length) {
      console.error(
        `[Email notification] ${type}: No recipients are configured.`,
      );
      return;
    }

    const { text, html } = buildNotificationEmail({
      title:
        type === "contact"
          ? "New Contact Form Submission"
          : "New Appointment Request",
      introduction,
      fields,
    });

    await sendMail({
      settings,
      to: settings.recipients,
      subject:
        type === "contact"
          ? "New Contact Form Submission"
          : "New Appointment Request",
      text,
      html,
    });
  } catch (error) {
    // Do not log credentials, recipient lists, or submitted message content.
    console.error(
      `[Email notification] ${type} delivery failed:`,
      error instanceof Error ? error.message : "Unknown email error",
    );
  }
}

export async function notifyContactSubmission(contact) {
  const settings = await getSmtpCredentials().catch((error) => {
    console.error(
      "[Email notification] Unable to load contact notification settings:",
      error instanceof Error ? error.message : "Unknown settings error",
    );

    return null;
  });

  if (!settings?.contactNotificationsEnabled) return;

  await sendSubmissionNotification({
    type: "contact",
    enabled: true,
    introduction: "A new message was submitted through the website contact form.",
    fields: [
      { label: "Name", value: contact.fullName },
      { label: "Email", value: contact.email },
      { label: "Message", value: contact.message },
      {
        label: "Submitted At",
        value: contact.createdAt
          ? new Date(contact.createdAt).toISOString()
          : new Date().toISOString(),
      },
    ],
  });
}

export async function notifyAppointmentSubmission(appointment) {
  const settings = await getSmtpCredentials().catch((error) => {
    console.error(
      "[Email notification] Unable to load appointment notification settings:",
      error instanceof Error ? error.message : "Unknown settings error",
    );

    return null;
  });

  if (!settings?.appointmentNotificationsEnabled) return;

  await sendSubmissionNotification({
    type: "appointment",
    enabled: true,
    introduction: "A new appointment request was submitted through the website.",
    fields: [
      { label: "Name", value: appointment.fullName },
      { label: "Email", value: appointment.email },
      { label: "Requested Service", value: appointment.service },
      { label: "Concerns", value: appointment.concerns },
      {
        label: "Submitted At",
        value: appointment.createdAt
          ? new Date(appointment.createdAt).toISOString()
          : new Date().toISOString(),
      },
    ],
  });
}
