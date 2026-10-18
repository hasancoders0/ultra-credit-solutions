import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/admin-session";
import { getSmtpCredentials } from "@/lib/email-settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REPLY_LENGTH = 10000;

function errorResponse(message, status = 400) {
  return NextResponse.json(
    { success: false, message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return Boolean(token && verifyAdminSession(token));
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

    const contact = await contacts.findOne({ _id: contactId });

    if (!contact) {
      return errorResponse("Contact not found.", 404);
    }

    if (
      typeof contact.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())
    ) {
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
      "Reply saved as a draft. Configure SMTP in Admin Settings to send email.";

    try {
      // Load SMTP credentials saved in the Admin Settings database.
      const smtp = await getSmtpCredentials();

      if (!smtp) {
        throw new Error("SMTP_NOT_CONFIGURED");
      }

      const nodemailer = (await import("nodemailer")).default;

      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: Number(smtp.port),
        secure: smtp.secure,
        auth: {
          user: smtp.username,
          pass: smtp.password,
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
      });

      await transporter.sendMail({
        from: {
          name: smtp.senderName,
          address: smtp.senderEmail,
        },
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
        error.message === "SMTP_NOT_CONFIGURED"
          ? "Reply saved as a draft, but SMTP is not configured. Save valid SMTP settings in Admin Settings first."
          : "Reply saved as a draft, but email delivery failed. Check your SMTP settings and server logs.";
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
        $push: { replies: replyRecord },
        $set: {
          status: nextStatus,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return errorResponse("Contact not found.", 404);
    }

    return NextResponse.json(
      {
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
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("POST contact reply error:", error);

    return errorResponse(
      "Unable to process the contact reply. Please try again.",
      500,
    );
  }
}
