import { NextResponse } from "next/server";
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

function normalizeLocation(data = {}) {
  const title = String(data.title || "").trim();
  const slug = createSlug(data.slug || title);

  return {
    title,
    slug,
    state: String(data.state || "").trim(),
    city: String(data.city || "").trim(),
    description: String(data.description || ""),
    introduction: String(data.introduction || ""),
    serviceAreas: Array.isArray(data.serviceAreas) ? data.serviceAreas : [],
    content: Array.isArray(data.content) ? data.content : [],
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    internalLinks: Array.isArray(data.internalLinks) ? data.internalLinks : [],
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

function serializeLocation(document) {
  const { _id, ...location } = document;

  return {
    ...location,
    id: String(_id),
  };
}

function errorResponse(error, message = "Locations request failed.") {
  console.error(`[Locations API] ${message}`, error);

  const details =
    process.env.NODE_ENV === "development"
      ? error?.message || String(error)
      : undefined;

  return NextResponse.json(
    {
      success: false,
      message,
      ...(details ? { details } : {}),
    },
    { status: 500 },
  );
}

export async function GET() {
  try {
    const db = await getDb();

    const documents = await db
      .collection(COLLECTION)
      .find({})
      .sort({ updatedAt: -1, title: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: documents.map(serializeLocation),
    });
  } catch (error) {
    return errorResponse(error, "Unable to load locations.");
  }
}

export async function POST(request) {
  try {
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
        { status: 400 },
      );
    }

    const db = await getDb();
    const collection = db.collection(COLLECTION);

    const duplicate = await collection.findOne({
      slug: location.slug,
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: "A location with this slug already exists.",
        },
        { status: 409 },
      );
    }

    const now = new Date();

    const document = {
      ...location,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(document);

    return NextResponse.json(
      {
        success: true,
        message: "Location created successfully.",
        data: {
          ...document,
          id: String(result.insertedId),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "A location with this slug already exists.",
        },
        { status: 409 },
      );
    }

    return errorResponse(error, "Unable to create location.");
  }
}
