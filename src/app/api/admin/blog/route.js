
import { NextResponse } from "next/server";
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

function serializePost(post) {
  const { _id, ...rest } = post;
  return { ...rest, id: _id.toString() };
}

function cleanPost(body) {
  const title = String(body.title || "").trim();
  const slug = slugify(body.slug || title);
  const category = String(body.category || "").trim();
  const status = STATUSES.includes(body.status) ? body.status : "draft";

  if (!title || !slug || !category) {
    throw new Error("Title, slug and category are required.");
  }

  const tags = Array.isArray(body.tags)
    ? [
        ...new Set(
          body.tags.map((tag) => String(tag).trim()).filter(Boolean)
        ),
      ]
    : [];

  const content = Array.isArray(body.content)
    ? body.content
        .map((section) => ({
          heading: String(section.heading || "").trim(),
          paragraphs: Array.isArray(section.paragraphs)
            ? section.paragraphs
                .map((paragraph) => String(paragraph || "").trim())
                .filter(Boolean)
            : [],
        }))
        .filter((section) => section.heading || section.paragraphs.length)
    : [];

  const excerpt = String(body.excerpt || "").trim();

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
    tags,
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

export async function GET() {
  try {
    const db = await getDb();

    const posts = await db
      .collection("blogs")
      .find({})
      .sort({ updatedAt: -1, _id: -1 })
      .toArray();

    return NextResponse.json({
      posts: posts.map(serializePost),
    });
  } catch (error) {
    console.error("GET /api/admin/blog:", error);

    return NextResponse.json(
      { message: "Could not load blog posts." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const post = cleanPost(body);
    const db = await getDb();
    const collection = db.collection("blogs");

    const duplicate = await collection.findOne({
      slug: post.slug,
    });

    if (duplicate) {
      return NextResponse.json(
        { message: "This slug is already in use." },
        { status: 409 }
      );
    }

    const now = new Date().toISOString();

    const result = await collection.insertOne({
      ...post,
      createdAt: now,
    });

    const saved = await collection.findOne({
      _id: result.insertedId,
    });

    return NextResponse.json(
      { post: serializePost(saved) },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error.message || "Could not create blog post.";

    const status = /required|complete content section/i.test(message)
      ? 400
      : 500;

    console.error("POST /api/admin/blog:", error);

    return NextResponse.json(
      { message },
      { status }
    );
  }
}
