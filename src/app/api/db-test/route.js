
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();

    await db.command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully!",
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed.",
      },
      { status: 500 }
    );
  }
}
