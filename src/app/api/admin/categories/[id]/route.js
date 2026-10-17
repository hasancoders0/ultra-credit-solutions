
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

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

async function getCategoryId(context) {
  const params = await context.params;
  return params.id;
}

export async function PATCH(request, context) {
  try {
    const id = await getCategoryId(context);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const db = await getDb();
    const collection = db.collection(COLLECTION_NAME);
    const objectId = new ObjectId(id);

    const existing = await collection.findOne({ _id: objectId });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Category not found." },
        { status: 404 }
      );
    }

    const update = {};

    if (body.name !== undefined) {
      const name = String(body.name).trim();

      if (!name) {
        return NextResponse.json(
          { success: false, message: "Category name is required." },
          { status: 400 }
        );
      }

      update.name = name;
    }

    if (body.slug !== undefined) {
      const slug = createSlug(body.slug);

      if (!slug) {
        return NextResponse.json(
          { success: false, message: "A valid category slug is required." },
          { status: 400 }
        );
      }

      update.slug = slug;
    }

    if (body.description !== undefined) {
      update.description = String(body.description).trim();
    }

    if (body.status !== undefined) {
      if (!["active", "inactive"].includes(body.status)) {
        return NextResponse.json(
          { success: false, message: "Invalid category status." },
          { status: 400 }
        );
      }

      update.status = body.status;
    }

    if (body.type !== undefined) {
      if (!validType(body.type)) {
        return NextResponse.json(
          { success: false, message: "Invalid category type." },
          { status: 400 }
        );
      }

      update.type = body.type;
    }

    const nextType = update.type || existing.type;
    const nextSlug = update.slug || existing.slug;

    const duplicate = await collection.findOne({
      _id: { $ne: objectId },
      type: nextType,
      slug: nextSlug,
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

    update.updatedAt = new Date();

    await collection.updateOne(
      { _id: objectId },
      { $set: update }
    );

    const updated = await collection.findOne({ _id: objectId });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Unable to retrieve updated category." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully.",
      category: serializeCategory(updated),
    });
  } catch (error) {
    console.error("PATCH /api/admin/categories/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update category." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const id = await getCategoryId(context);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Category not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/categories/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to delete category." },
      { status: 500 }
    );
  }
}
