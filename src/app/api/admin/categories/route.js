
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import initialCategories from "@/data/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLLECTION_NAME = "categories";

function createSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function serializeCategory(category) {
  return {
    ...category,
    id: category._id.toString(),
    _id: category._id.toString(),
  };
}

function validType(type) {
  return type === "blog" || type === "services";
}

async function seedCategoriesIfEmpty(collection) {
  const count = await collection.countDocuments();

  if (count > 0) return;

  const documents = ["blog", "services"]
    .flatMap((type) => {
      const items = Array.isArray(initialCategories?.[type])
        ? initialCategories[type]
        : [];

      return items.map((item) => ({
        name: String(item.name || "").trim(),
        slug: createSlug(item.slug || item.name || ""),
        description: String(item.description || "").trim(),
        type,
        status: item.status === "inactive" ? "inactive" : "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    })
    .filter((item) => item.name && item.slug);

  if (documents.length) {
    await collection.insertMany(documents, { ordered: false });
  }
}

export async function GET(request) {
  try {
    const db = await getDb();
    const collection = db.collection(COLLECTION_NAME);

    await seedCategoriesIfEmpty(collection);

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const filter = validType(type) ? { type } : {};

    const categories = await collection
      .find(filter)
      .sort({ type: 1, name: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      categories: categories.map(serializeCategory),
    });
  } catch (error) {
    console.error("GET /api/admin/categories error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to load categories." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const slug = createSlug(body.slug || name);
    const description = String(body.description || "").trim();
    const type = String(body.type || "");
    const status = body.status === "inactive" ? "inactive" : "active";

    if (!name || !slug || !validType(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid name, slug, and category type are required.",
        },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection(COLLECTION_NAME);

    const duplicate = await collection.findOne({
      type,
      slug,
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: "This slug already exists in this category group.",
        },
        { status: 409 }
      );
    }

    const now = new Date();

    const document = {
      name,
      slug,
      description,
      type,
      status,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(document);

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully.",
        category: serializeCategory({
          ...document,
          _id: result.insertedId,
        }),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/categories error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to create category." },
      { status: 500 }
    );
  }
}
