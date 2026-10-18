import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  getAdminSession,
} from "@/lib/admin-session";
import {
  hashAdminPassword,
  validateAdminEmail,
  validateNewPassword,
  verifyAdminPassword,
} from "@/lib/admin-credentials";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  if (!session) {
    return null;
  }

  const db = await getDb();
  const admins = db.collection("admins");

  const admin = await admins.findOne({
    $or: [{ email: session.email }, { username: session.email }],
    isActive: true,
  });

  if (!admin) {
    return null;
  }

  return { admin, admins };
}

function setSessionCookie(response, identity) {
  const token = createAdminSession(identity);

  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  return response;
}

export async function GET(request) {
  try {
    const result = await getAuthenticatedAdmin(request);

    if (!result) {
      return jsonResponse(
        {
          success: false,
          message: "Please log in again.",
        },
        401,
      );
    }

    const { admin } = result;

    return jsonResponse({
      success: true,
      account: {
        email: admin.email || "",
        username: admin.username || "",
      },
    });
  } catch (error) {
    console.error("Admin account fetch error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Unable to load account details.",
      },
      500,
    );
  }
}

export async function PATCH(request) {
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

    const result = await getAuthenticatedAdmin(request);

    if (!result) {
      return jsonResponse(
        {
          success: false,
          message: "Please log in again.",
        },
        401,
      );
    }

    const { admin, admins } = result;
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid request data.",
        },
        400,
      );
    }

    const currentPassword =
      typeof body.currentPassword === "string" ? body.currentPassword : "";

    if (
      !currentPassword ||
      currentPassword.length > 1024 ||
      typeof admin.password !== "string" ||
      !(await verifyAdminPassword(currentPassword, admin.password))
    ) {
      return jsonResponse(
        {
          success: false,
          message: "Current password is incorrect.",
        },
        401,
      );
    }

    const wantsEmailChange =
      typeof body.newEmail === "string" && body.newEmail.trim().length > 0;

    const wantsUsernameChange =
      typeof body.newUsername === "string" &&
      body.newUsername.trim().length > 0;

    const wantsPasswordChange =
      typeof body.newPassword === "string" && body.newPassword.length > 0;

    if (!wantsEmailChange && !wantsUsernameChange && !wantsPasswordChange) {
      return jsonResponse(
        {
          success: false,
          message: "Enter a new email, username, or password.",
        },
        400,
      );
    }

    const updates = {};
    let nextEmail = admin.email || "";
    let nextUsername = admin.username || "";

    // Update email
    if (wantsEmailChange) {
      let validatedEmail;

      try {
        validatedEmail = validateAdminEmail(body.newEmail);
      } catch (error) {
        return jsonResponse(
          {
            success: false,
            message: error.message || "Invalid email address.",
          },
          400,
        );
      }

      if (validatedEmail !== (admin.email || "").trim().toLowerCase()) {
        const existingAdmin = await admins.findOne({
          email: validatedEmail,
          _id: { $ne: admin._id },
        });

        if (existingAdmin) {
          return jsonResponse(
            {
              success: false,
              message: "This email address is already in use.",
            },
            409,
          );
        }

        updates.email = validatedEmail;
        nextEmail = validatedEmail;
      }
    }

    // Update username
    if (wantsUsernameChange) {
      const username = body.newUsername.trim();

      if (
        username.length < 3 ||
        username.length > 30 ||
        !/^[a-zA-Z0-9_.-]+$/.test(username)
      ) {
        return jsonResponse(
          {
            success: false,
            message:
              "Username must be 3–30 characters and contain only letters, numbers, dots, underscores, or hyphens.",
          },
          400,
        );
      }

      if (username !== (admin.username || "")) {
        const existingAdmin = await admins.findOne({
          username: username,
          _id: { $ne: admin._id },
        });

        if (existingAdmin) {
          return jsonResponse(
            {
              success: false,
              message: "This username is already in use.",
            },
            409,
          );
        }

        updates.username = username;
        nextUsername = username;
      }
    }

    // Update password
    if (wantsPasswordChange) {
      if (
        typeof body.confirmPassword !== "string" ||
        body.newPassword !== body.confirmPassword
      ) {
        return jsonResponse(
          {
            success: false,
            message: "The new passwords do not match.",
          },
          400,
        );
      }

      let validatedPassword;

      try {
        validatedPassword = validateNewPassword(body.newPassword);
      } catch (error) {
        return jsonResponse(
          {
            success: false,
            message: error.message || "Invalid new password.",
          },
          400,
        );
      }

      if (validatedPassword === currentPassword) {
        return jsonResponse(
          {
            success: false,
            message:
              "Your new password must differ from your current password.",
          },
          400,
        );
      }

      updates.password = await hashAdminPassword(validatedPassword);
      updates.passwordUpdatedAt = new Date();
    }

    if (Object.keys(updates).length === 0) {
      return jsonResponse({
        success: true,
        message: "Your account details are already up to date.",
        account: {
          email: admin.email || "",
          username: admin.username || "",
        },
      });
    }

    updates.updatedAt = new Date();

    const updateResult = await admins.updateOne(
      {
        _id: admin._id,
        password: admin.password,
        isActive: true,
      },
      {
        $set: updates,
      },
    );

    if (updateResult.matchedCount !== 1) {
      return jsonResponse(
        {
          success: false,
          message:
            "Your account changed during this request. Please try again.",
        },
        409,
      );
    }

    // Keep the current session valid after updating credentials.
    // Email is preferred as the session identity.
    const identity = nextEmail || nextUsername;

    if (!identity || typeof identity !== "string") {
      const response = jsonResponse({
        success: true,
        message: "Account updated. Please log in again.",
        account: {
          email: nextEmail,
          username: nextUsername,
        },
      });

      response.cookies.set(ADMIN_COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });

      return response;
    }

    const response = jsonResponse({
      success: true,
      message: "Your account credentials have been updated.",
      account: {
        email: nextEmail,
        username: nextUsername,
      },
    });

    return setSessionCookie(response, identity);
  } catch (error) {
    console.error("Admin account update error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Unable to update your account. Please try again.",
      },
      500,
    );
  }
}
