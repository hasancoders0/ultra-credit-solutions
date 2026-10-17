import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";

import { getDb } from "@/lib/mongodb";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/admin-session";

export const runtime = "nodejs";

const MAX_REPLY_LENGTH = 10000;

function errorResponse(message, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return Boolean(token && verifyAdminSession(token));
}

function getSmtpTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM) {
    return null;
  }

  const port = Number(SMTP_PORT);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("Invalid SMTP_PORT configuration.");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

export async function POST(request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return errorResponse("Unauthorized. Please log in.", 401);
  }

  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return errorResponse("Invalid contact ID.", 400);
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return errorResponse("Invalid JSON request.", 400);
    }

    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!message || message.length > MAX_REPLY_LENGTH) {
      return errorResponse(
        `Reply must contain between 1 and ${MAX_REPLY_LENGTH} characters.`,
        400,
      );
    }

    const db = await getDb();
    const contacts = db.collection("contacts");
    const contactId = new ObjectId(id);

    const contact = await contacts.findOne({
      _id: contactId,
    });

    if (!contact) {
      return errorResponse("Contact not found.", 404);
    }

    if (typeof contact.email !== "string" || !contact.email.trim()) {
      return errorResponse(
        "This contact does not have a valid email address.",
        400,
      );
    }

    const createdAt = new Date();
    const replyId = new ObjectId().toString();

    let deliveryStatus = "not_sent";
    let sentAt = null;
    let deliveryMessage =
      "Reply saved as a draft. SMTP is not configured, so no email was sent.";

    let transporter = null;

    try {
      transporter = getSmtpTransporter();
    } catch (error) {
      console.error("SMTP configuration error:", error.message);

      deliveryMessage =
        "Reply saved as a draft, but the SMTP configuration is invalid.";
    }

    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: contact.email.trim(),
          subject: "Re: Your inquiry to Ultra Credit Solutions USA",
          text: message,
        });

        deliveryStatus = "sent";
        sentAt = new Date();
        deliveryMessage = "Reply emailed successfully.";
      } catch (error) {
        console.error("Contact reply email delivery failed:", error.message);

        deliveryMessage =
          "Reply saved as a draft, but email delivery failed. Check the SMTP configuration and server logs.";
      }
    }

    const replyRecord = {
      id: replyId,
      message,
      direction: "outgoing",
      createdAt,
      deliveryStatus,
      sentAt,
    };

    const nextStatus = deliveryStatus === "sent" ? "Replied" : "Reply Drafted";

    const result = await contacts.updateOne(
      { _id: contactId },
      {
        $push: {
          replies: replyRecord,
        },
        $set: {
          status: nextStatus,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return errorResponse("Contact not found.", 404);
    }

    return NextResponse.json({
      success: true,
      message: deliveryMessage,
      deliveryStatus,
      reply: {
        ...replyRecord,
        createdAt: createdAt.toISOString(),
        sentAt: sentAt ? sentAt.toISOString() : null,
      },
      contact: {
        id,
        status: nextStatus,
      },
    });
  } catch (error) {
    console.error("POST contact reply error:", error);

    return errorResponse(
      "Unable to process the contact reply. Please try again.",
      500,
    );
  }
}
