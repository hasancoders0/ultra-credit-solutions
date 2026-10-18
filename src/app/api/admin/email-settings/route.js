
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  ADMIN_COOKIE_NAME,
  verifyAdminSession,
} from "@/lib/admin-session";

import {
  getEmailSettings,
  saveEmailSettings,
} from "@/lib/email-settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message, status = 400) {
  return NextResponse.json(
    { success: false, message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

function jsonSuccess(data, status = 200) {
  return NextResponse.json(
    { success: true, ...data },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return Boolean(token && verifyAdminSession(token));
}

// GET /api/admin/email-settings
// Returns settings without exposing the SMTP password.
export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return jsonError("Unauthorized. Please sign in again.", 401);
    }

    const settings = await getEmailSettings();

    return jsonSuccess({ settings });
  } catch (error) {
    console.error(
      "Loading email settings failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return jsonError("Unable to load email settings.", 500);
  }
}

// PUT /api/admin/email-settings
// Saves validated settings and encrypts the SMTP password server-side.
export async function PUT(request) {
  try {
    if (!(await requireAdmin())) {
      return jsonError("Unauthorized. Please sign in again.", 401);
    }

    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return jsonError("Invalid request format.", 415);
    }

    const body = await request.json();

    const settings = await saveEmailSettings(body);

    return jsonSuccess({
      message: "Email settings saved successfully.",
      settings,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    const validationMessages = [
      "Please enter a valid SMTP host.",
      "SMTP port must be between 1 and 65535.",
      "Please enter an SMTP username.",
      "Please enter a valid sender email address.",
      "Sender name is required and must be 120 characters or fewer.",
      "Please select a valid SMTP security setting.",
      "Please configure between 2 and 5 recipients.",
      "One or more recipient email addresses are invalid.",
      "Notification switches must be enabled or disabled.",
      "SMTP password is required.",
      "SMTP password is too long.",
      "Recipients must be an array of email addresses.",
      "Invalid email settings.",
    ];

    if (validationMessages.includes(message)) {
      return jsonError(message, 400);
    }

    console.error(
      "Saving email settings failed:",
      message,
    );

    return jsonError("Unable to save email settings.", 500);
  }
}
