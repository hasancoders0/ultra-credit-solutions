
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import {
  ADMIN_COOKIE_NAME,
  getAdminSession,
} from "@/lib/admin-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLLECTION_NAME = "integrations";

const ALLOWED_PLACEMENTS = new Set([
  "head",
  "body-start",
  "body-end",
]);

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

async function getAuthenticatedAdmin(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = getAdminSession(token);

  if (!session?.email) {
    return null;
  }

  const db = await getDb();
  const admins = db.collection("admins");

  const admin = await admins.findOne({
    $or: [
      { email: session.email },
      { username: session.email },
    ],
    isActive: true,
  });

  return admin ? { admin, db } : null;
}

function normalizeIntegration(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Invalid integration data.");
  }

  const providerId =
    typeof body.providerId === "string"
      ? body.providerId.trim()
      : "";

  const name =
    typeof body.name === "string"
      ? body.name.trim()
      : "";

  const enabled = body.enabled;

  const configuration = body.configuration;

  if (
    !providerId ||
    providerId.length > 120 ||
    !/^[a-zA-Z0-9_-]+$/.test(providerId)
  ) {
    throw new Error("Invalid integration identifier.");
  }

  if (!name || name.length > 120) {
    throw new Error("Integration name must be between 1 and 120 characters.");
  }

  if (typeof enabled !== "boolean") {
    throw new Error("Integration enabled status must be true or false.");
  }

  if (
    !configuration ||
    typeof configuration !== "object" ||
    Array.isArray(configuration)
  ) {
    throw new Error("Invalid integration configuration.");
  }

  const code =
    typeof configuration.code === "string"
      ? configuration.code
      : "";

  const placement =
    typeof configuration.placement === "string"
      ? configuration.placement
      : "body-end";

  const codeType =
    typeof configuration.codeType === "string"
      ? configuration.codeType
      : "html";

  if (code.length > 100_000) {
    throw new Error("Integration code must not exceed 100 KB.");
  }

  if (!ALLOWED_PLACEMENTS.has(placement)) {
    throw new Error("Invalid code placement.");
  }

  if (codeType !== "html") {
    throw new Error("Unsupported integration code type.");
  }

  return {
    providerId,
    name,
    enabled,
    configuration: {
      code,
      placement,
      codeType,
    },
  };
}

/**
 * GET /api/admin/integrations
 * Return saved integrations for the authenticated admin.
 */
export async function GET(request) {
  try {
    const authenticated = await getAuthenticatedAdmin(request);

    if (!authenticated) {
      return jsonResponse(
        {
          success: false,
          message: "Please log in again.",
        },
        401,
      );
    }

    const { db } = authenticated;

    const integrations = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    return jsonResponse({
      success: true,
      integrations: integrations.map((item) => ({
        providerId: item.providerId,
        name: item.name,
        enabled: item.enabled === true,
        configuration: {
          code: item.configuration?.code || "",
          placement: item.configuration?.placement || "body-end",
          codeType: item.configuration?.codeType || "html",
        },
        createdAt: item.createdAt || null,
        updatedAt: item.updatedAt || null,
      })),
    });
  } catch (error) {
    console.error("Admin integrations fetch error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Unable to load integrations.",
      },
      500,
    );
  }
}

/**
 * POST /api/admin/integrations
 * Create or update an integration using providerId as its key.
 */
export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid request format.",
        },
        415,
      );
    }

    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin && host) {
      try {
        if (new URL(origin).host !== host) {
          return jsonResponse(
            {
              success: false,
              message: "Invalid request origin.",
            },
            403,
          );
        }
      } catch {
        return jsonResponse(
          {
            success: false,
            message: "Invalid request origin.",
          },
          403,
        );
      }
    }

    const authenticated = await getAuthenticatedAdmin(request);

    if (!authenticated) {
      return jsonResponse(
        {
          success: false,
          message: "Please log in again.",
        },
        401,
      );
    }

    const body = await request.json().catch(() => null);

    let integration;

    try {
      integration = normalizeIntegration(body);
    } catch (error) {
      return jsonResponse(
        {
          success: false,
          message: error.message || "Invalid integration data.",
        },
        400,
      );
    }

    const { db } = authenticated;
    const collection = db.collection(COLLECTION_NAME);
    const now = new Date();

    const existing = await collection.findOne({
      providerId: integration.providerId,
    });

    const document = {
      ...integration,
      updatedAt: now,
    };

    if (!existing) {
      document.createdAt = now;
    }

    await collection.updateOne(
      { providerId: integration.providerId },
      {
        $set: document,
      },
      { upsert: true },
    );

    return jsonResponse({
      success: true,
      message: "Integration saved successfully.",
      integration: {
        ...integration,
        createdAt: existing?.createdAt || now,
        updatedAt: now,
      },
    });
  } catch (error) {
    console.error("Admin integration save error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Unable to save integration.",
      },
      500,
    );
  }
}
