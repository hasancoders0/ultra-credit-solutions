
import { NextResponse } from "next/server";

import { getDb } from "@/lib/mongodb";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
} from "@/lib/admin-session";

import {
  hashAdminPassword,
  isHashedAdminPassword,
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

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);

    const identifier =
      typeof body?.identifier === "string"
        ? body.identifier.trim().toLowerCase()
        : typeof body?.email === "string"
          ? body.email.trim().toLowerCase()
          : "";

    const password =
      typeof body?.password === "string" ? body.password : "";

    if (
      !identifier ||
      !password ||
      identifier.length > 254 ||
      password.length > 1024
    ) {
      return jsonResponse(
        {
          success: false,
          message: "Please enter your email or username and password.",
        },
        400,
      );
    }

    const db = await getDb();
    const admins = db.collection("admins");

    const admin = await admins.findOne({
      $or: [
        { email: identifier },
        { username: identifier },
      ],
      isActive: true,
    });

    if (!admin || typeof admin.password !== "string") {
      return jsonResponse(
        {
          success: false,
          message: "Incorrect username/email or password.",
        },
        401,
      );
    }

    const passwordMatches = await verifyAdminPassword(
      password,
      admin.password,
    );

    if (!passwordMatches) {
      return jsonResponse(
        {
          success: false,
          message: "Incorrect username/email or password.",
        },
        401,
      );
    }

    // Migrate legacy plaintext passwords after a successful login.
    if (!isHashedAdminPassword(admin.password)) {
      const hashedPassword = await hashAdminPassword(password);

      await admins.updateOne(
        {
          _id: admin._id,
          password: admin.password,
        },
        {
          $set: {
            password: hashedPassword,
            passwordUpdatedAt: new Date(),
          },
        },
      );
    }

    const sessionIdentity = admin.email || admin.username;

    if (
      typeof sessionIdentity !== "string" ||
      !sessionIdentity.trim()
    ) {
      console.error("Admin login failed: account has no session identity.");

      return jsonResponse(
        {
          success: false,
          message: "Unable to start your session. Contact an administrator.",
        },
        500,
      );
    }

    const token = createAdminSession(sessionIdentity);

    const response = jsonResponse({
      success: true,
      message: "Login successful.",
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Login failed due to a server error. Please try again.",
      },
      500,
    );
  }
}
