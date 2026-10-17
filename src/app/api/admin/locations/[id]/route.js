import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLLECTION = "locations";

function createSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function serializeLocation(document) {
  if (!document) return null;

  const { _id, ...location } = document;

  return {
    ...location,
    id: String(_id),
  };
}

function validateId(id) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

function normalizeLocation(data = {}) {
  const title = String(data.title || "").trim();

  return {
    title,
    slug: createSlug(data.slug || title),
    state: String(data.state || "").trim(),
    city: String(data.city || "").trim(),
    description: String(data.description || ""),
    introduction: String(data.introduction || ""),
    serviceAreas: Array.isArray(data.serviceAreas)
      ? data.serviceAreas
      : [],
    content: Array.isArray(data.content) ? data.content : [],
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    internalLinks: Array.isArray(data.internalLinks)
      ? data.internalLinks
      : [],
    image: {
      src: String(data.image?.src || ""),
      alt: String(data.image?.alt || ""),
    },
    status: data.status === "published" ? "published" : "draft",
    featured: Boolean(data.featured),
    seo: {
      title: String(data.seo?.title || ""),
      description: String(data.seo?.description || ""),
      canonical: String(data.seo?.canonical || ""),
      ogImage: String(data.seo?.ogImage || ""),
      robots: String(data.seo?.robots || "noindex,follow"),
    },
  };
}

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    if (!validateId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid location ID." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const document = await db.collection(COLLECTION).findOne({
      _id: new ObjectId(id),
    });

    if (!document) {
      return NextResponse.json(
        { success: false, message: "Location not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: serializeLocation(document),
    });
  } catch (error) {
    console.error("GET location error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to load location." },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    if (!validateId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid location ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const location = normalizeLocation(body);

    if (
      !location.title ||
      !location.slug ||
      !location.state ||
      !location.city
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, slug, state, and city are required.",
        },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection(COLLECTION);
    const _id = new ObjectId(id);

    const existing = await collection.findOne({ _id });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Location not found." },
        { status: 404 }
      );
    }

    const duplicate = await collection.findOne({
      slug: location.slug,
      _id: { $ne: _id },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: "A location with this slug already exists.",
        },
        { status: 409 }
      );
    }

    const result = await collection.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...location,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    const updatedDocument = result?.value ?? result;

    if (!updatedDocument) {
      return NextResponse.json(
        { success: false, message: "Location not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Location updated successfully.",
      data: serializeLocation(updatedDocument),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "A location with this slug already exists.",
        },
        { status: 409 }
      );
    }

    console.error("PATCH location error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update location." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    if (!validateId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid location ID." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection(COLLECTION).deleteOne({
      _id: new ObjectId(id),
    });

    if (!result.deletedCount) {
      return NextResponse.json(
        { success: false, message: "Location not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Location deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE location error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to delete location." },
      { status: 500 }
    );
  }
}