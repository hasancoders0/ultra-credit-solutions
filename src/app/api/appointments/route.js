import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/admin-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_SERVICES = [
  "Credit Report Review",
  "Credit Repair Services",
  "Credit Score Information",
  "Credit Building Guidance",
  "Other",
];

const ALLOWED_STATUSES = ["New", "Reviewed", "Contacted", "Closed"];

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function toDashboardStatus(status) {
  const statuses = {
    pending: "New",
    new: "New",
    reviewed: "Reviewed",
    contacted: "Contacted",
    closed: "Closed",
  };

  return statuses[String(status || "").toLowerCase()] || "New";
}

function toDatabaseStatus(status) {
  return status === "New" ? "pending" : status.toLowerCase();
}

function serializeAppointment(appointment) {
  return {
    id: appointment._id.toString(),
    fullName: appointment.fullName || "",
    email: appointment.email || "",
    service: appointment.service || "Other",
    concerns: appointment.concerns || "",
    status: toDashboardStatus(appointment.status),
    adminNotes: appointment.adminNotes || "",
    source: appointment.source || "website",
    submittedAt: appointment.createdAt
      ? new Date(appointment.createdAt).toISOString()
      : null,
    createdAt: appointment.createdAt || null,
    updatedAt: appointment.updatedAt || null,
  };
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return verifyAdminSession(token);
}

// GET: List appointments for authenticated administrators.
export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your admin session is missing or expired. Please sign in again.",
        },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    const db = await getDb();

    const appointments = await db
      .collection("appointments")
      .find({})
      .sort({ createdAt: -1, _id: -1 })
      .limit(500)
      .toArray();

    const data = appointments.map(serializeAppointment);

    return NextResponse.json(
      {
        success: true,
        appointments: data,
        total: data.length,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    console.error("Fetching appointments failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load appointment requests.",
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}

// PATCH: Save appointment status and internal notes.
export async function PATCH(request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your admin session is missing or expired. Please sign in again.",
        },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    const body = await request.json().catch(() => null);

    const id = cleanText(body?.id);
    const status = cleanText(body?.status);
    const adminNotes = body?.adminNotes;

    if (!ObjectId.isValid(id) || !id.match(/^[a-f\d]{24}$/i)) {
      return NextResponse.json(
        { success: false, message: "Invalid appointment ID." },
        { status: 400 },
      );
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid appointment status.",
        },
        { status: 400 },
      );
    }

    if (typeof adminNotes !== "string" || adminNotes.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          message: "Internal notes must be 5,000 characters or fewer.",
        },
        { status: 400 },
      );
    }

    const db = await getDb();

    const result = await db.collection("appointments").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: toDatabaseStatus(status),
          adminNotes: adminNotes.trim(),
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    // Handle both common MongoDB driver return formats.
    const updatedAppointment = result?.value ?? result;

    if (!updatedAppointment?._id) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment not found. It may have been deleted.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Appointment updated successfully.",
        appointment: serializeAppointment(updatedAppointment),
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    console.error("Updating appointment failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save appointment changes. Please try again.",
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}

// POST: Public website appointment submission.
export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Invalid request format." },
        { status: 415 },
      );
    }

    const body = await request.json();

    const fullName = cleanText(body?.fullName);
    const email = cleanText(body?.email).toLowerCase();
    const service = cleanText(body?.service);
    const concerns = cleanText(body?.concerns);

    if (!fullName || !email || !service) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 },
      );
    }

    if (fullName.length > 120) {
      return NextResponse.json(
        { success: false, message: "Name is too long." },
        { status: 400 },
      );
    }

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 },
      );
    }

    if (!ALLOWED_SERVICES.includes(service)) {
      return NextResponse.json(
        { success: false, message: "Please select a valid service." },
        { status: 400 },
      );
    }

    if (concerns.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          message: "Your message must be 2,000 characters or fewer.",
        },
        { status: 400 },
      );
    }

    const db = await getDb();
    const now = new Date();

    const appointment = {
      fullName,
      email,
      service,
      concerns,
      status: "pending",
      adminNotes: "",
      createdAt: now,
      updatedAt: now,
      source: "website",
    };

    const result = await db.collection("appointments").insertOne(appointment);

    return NextResponse.json(
      {
        success: true,
        message:
          "Your appointment request has been submitted successfully. Our team will review your inquiry and follow up with you.",
        appointmentId: result.insertedId.toString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Appointment request submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't submit your request right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
