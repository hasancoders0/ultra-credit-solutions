
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSession,
} from "@/lib/admin-session";
import { notifyContactSubmission } from "@/lib/email-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLLECTION_NAME = "contacts";

const CONTACT_STATUSES = [
  "New",
  "Read",
  "Reply Drafted",
  "Replied",
  "Closed",
];

const MAX_NAME_LENGTH = 160;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 3000;

function jsonError(message, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email) {
  return (
    email.length <= MAX_EMAIL_LENGTH &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function serializeContact(contact) {
  return {
    ...contact,
    id: contact._id.toString(),
    _id: undefined,
    createdAt:
      contact.createdAt instanceof Date
        ? contact.createdAt.toISOString()
        : contact.createdAt,
    updatedAt:
      contact.updatedAt instanceof Date
        ? contact.updatedAt.toISOString()
        : contact.updatedAt,
    replies: (contact.replies || []).map((reply) => ({
      ...reply,
      createdAt:
        reply.createdAt instanceof Date
          ? reply.createdAt.toISOString()
          : reply.createdAt,
      sentAt:
        reply.sentAt instanceof Date
          ? reply.sentAt.toISOString()
          : reply.sentAt || null,
    })),
  };
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token || !verifyAdminSession(token)) {
    return null;
  }

  return true;
}

/**
 * GET /api/contact
 * Admin-only endpoint.
 * Returns saved contact submissions from MongoDB.
 */
export async function GET() {
  try {
    const isAdmin = await requireAdmin();

    if (!isAdmin) {
      return jsonError("Unauthorized. Please log in.", 401);
    }

    const db = await getDb();

    const contacts = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      contacts: contacts.map(serializeContact),
    });
  } catch (error) {
    console.error("GET /api/contact error:", error);

    return jsonError("Unable to load contact submissions.", 500);
  }
}

/**
 * POST /api/contact
 * Public endpoint.
 * Saves a new contact form submission and sends an optional email notification.
 */
export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return jsonError("Invalid request format.", 415);
    }

    const body = await request.json();

    const fullName = normalizeText(body.fullName);
    const email = normalizeText(body.email).toLowerCase();
    const message = normalizeText(body.message);

    if (
      fullName.length < 2 ||
      fullName.length > MAX_NAME_LENGTH
    ) {
      return jsonError("Please enter a name between 2 and 160 characters.");
    }

    if (!isValidEmail(email)) {
      return jsonError("Please enter a valid email address.");
    }

    if (
      message.length < 10 ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return jsonError(
        "Your message must contain between 10 and 3000 characters."
      );
    }

    const now = new Date();

    const newContact = {
      fullName,
      email,
      message,
      status: "New",
      replies: [],
      createdAt: now,
      updatedAt: now,
    };

    const db = await getDb();

    const result = await db
      .collection(COLLECTION_NAME)
      .insertOne(newContact);

    // Email notification must never invalidate a saved contact submission.
    try {
      await notifyContactSubmission({
        ...newContact,
        id: result.insertedId.toString(),
      });
    } catch (notificationError) {
      console.error(
        "Contact notification failed:",
        notificationError
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been submitted successfully.",
        contactId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);

    if (error instanceof SyntaxError) {
      return jsonError("Invalid JSON request.", 400);
    }

    return jsonError(
      "Unable to submit your message. Please try again.",
      500
    );
  }
}

/**
 * PATCH /api/contact
 * Admin-only endpoint.
 * Updates a contact's status.
 */
export async function PATCH(request) {
  try {
    const isAdmin = await requireAdmin();

    if (!isAdmin) {
      return jsonError("Unauthorized. Please log in.", 401);
    }

    const body = await request.json();

    const id = normalizeText(body.id);
    const status = normalizeText(body.status);

    if (!ObjectId.isValid(id)) {
      return jsonError("Invalid contact ID.");
    }

    if (!CONTACT_STATUSES.includes(status)) {
      return jsonError("Invalid contact status.");
    }

    const db = await getDb();

    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return jsonError("Contact not found.", 404);
    }

    return NextResponse.json({
      success: true,
      message: "Contact status updated successfully.",
    });
  } catch (error) {
    console.error("PATCH /api/contact error:", error);

    if (error instanceof SyntaxError) {
      return jsonError("Invalid JSON request.", 400);
    }

    return jsonError("Unable to update contact status.", 500);
  }
}
