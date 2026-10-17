
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

const STATUSES = ["draft", "published", "scheduled"];

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanPost(body) {
  const title = String(body.title || "").trim();
  const slug = slugify(body.slug || title);
  const category = String(body.category || "").trim();
  const status = STATUSES.includes(body.status) ? body.status : "draft";

  if (!title || !slug || !category) {
    throw new Error("Title, slug and category are required.");
  }

  const excerpt = String(body.excerpt || "").trim();

  const content = Array.isArray(body.content)
    ? body.content
        .map((section) => ({
          heading: String(section.heading || "").trim(),
          paragraphs: Array.isArray(section.paragraphs)
            ? section.paragraphs
                .map((p) => String(p || "").trim())
                .filter(Boolean)
            : [],
        }))
        .filter((section) => section.heading || section.paragraphs.length)
    : [];

  if (
    status === "published" &&
    (!excerpt ||
      !content.some(
        (section) => section.heading && section.paragraphs.length
      ))
  ) {
    throw new Error(
      "Add an excerpt and a complete content section before publishing."
    );
  }

  const image = body.featuredImage || {};
  const seo = body.seo || {};

  return {
    title,
    slug,
    excerpt,
    category,
    tags: Array.isArray(body.tags)
      ? [
          ...new Set(
            body.tags.map((tag) => String(tag).trim()).filter(Boolean)
          ),
        ]
      : [],
    featuredImage: {
      src: String(image.src || "").trim(),
      alt: String(image.alt || "").trim(),
    },
    author: String(
      body.author || "Ultra Credit Solutions Team"
    ).trim(),
    status,
    featured: Boolean(body.featured),
    publishedAt:
      status === "published"
        ? body.publishedAt || new Date().toISOString().slice(0, 10)
        : status === "scheduled"
          ? body.publishedAt || null
          : null,
    updatedAt: new Date().toISOString(),
    seo: {
      title: String(seo.title || title).trim(),
      description: String(seo.description || excerpt).trim(),
    },
    content,
  };
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid blog post ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const post = cleanPost(body);
    const db = await getDb();
    const collection = db.collection("blogs");
    const _id = new ObjectId(id);

    const existing = await collection.findOne({ _id });

    if (!existing) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    const duplicate = await collection.findOne({
      slug: post.slug,
      _id: { $ne: _id },
    });

    if (duplicate) {
      return NextResponse.json(
        { message: "This slug is already in use." },
        { status: 409 }
      );
    }

    await collection.updateOne(
      { _id },
      { $set: post }
    );

    const updated = await collection.findOne({ _id });

    if (!updated) {
      return NextResponse.json(
        { message: "Could not retrieve the updated blog post." },
        { status: 500 }
      );
    }

    const { _id: savedId, ...rest } = updated;

    return NextResponse.json({
      post: {
        ...rest,
        id: savedId.toString(),
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/blog/[id]:", error);

    const message = error.message || "Could not update blog post.";
    const status = /required|complete content section/i.test(message)
      ? 400
      : 500;

    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid blog post ID." },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db.collection("blogs").deleteOne({
      _id: new ObjectId(id),
    });

    if (!result.deletedCount) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/blog/[id]:", error);

    return NextResponse.json(
      { message: "Could not delete blog post." },
      { status: 500 }
    );
  }
}
