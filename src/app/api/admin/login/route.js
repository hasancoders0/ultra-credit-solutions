
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
} from "@/lib/admin-session";

export const runtime = "nodejs";

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

    if (!identifier || !password || password.length > 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your email or username and password.",
        },
        { status: 400 },
      );
    }

const db = await getDb();

    const admin = await db.collection("admins").findOne({
      $or: [{ email: identifier }, { username: identifier }],
      isActive: true,
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin account not found or inactive." },
        { status: 401 },
      );
    }

    if (typeof admin.password !== "string") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password field is missing in MongoDB. Check the admins document.",
        },
        { status: 500 },
      );
    }

    if (admin.password !== password) {
      return NextResponse.json(
        { success: false, message: "Incorrect username/email or password." },
        { status: 401 },
      );
    }

    const token = createAdminSession(admin.email || admin.username);

    const response = NextResponse.json({
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

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Login API error. Check your VS Code terminal.",
      },
      { status: 500 },
    );
  }
}
