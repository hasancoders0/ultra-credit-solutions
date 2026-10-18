
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  ADMIN_COOKIE_NAME,
  verifyAdminSession,
} from "@/lib/admin-session";

import { sendTestEmail } from "@/lib/email-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return Boolean(token && verifyAdminSession(token));
}

// POST /api/admin/email-settings/test
// Body: { "recipient": "your-email@example.com" }
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!token || !verifyAdminSession(token)) {
      return jsonResponse(
        {
          success: false,
          message: "Unauthorized. Please sign in again.",
        },
        401,
      );
    }

    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid request format.",
        },
        415,
      );
    }

    const body = await request.json().catch(() => null);
    const recipient =
      typeof body?.recipient === "string"
        ? body.recipient.trim()
        : "";

    if (
      recipient.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)
    ) {
      return jsonResponse(
        {
          success: false,
          message: "Please enter a valid test recipient email.",
        },
        400,
      );
    }

    await sendTestEmail(recipient);

    return jsonResponse({
      success: true,
      message: "Test email sent successfully.",
    });
  } catch (error) {
    // Avoid returning SMTP credentials or raw server details to the browser.
    console.error(
      "SMTP test email failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return jsonResponse(
      {
        success: false,
        message:
          "Unable to send the test email. Check the saved SMTP settings and server logs.",
      },
      500,
    );
  }
}
