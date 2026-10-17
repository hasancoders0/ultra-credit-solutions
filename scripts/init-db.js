import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "ultra_credit_solutions";

const collections = [
  "admins",
  "settings",
  "categories",
  "blogs",
  "locations",
  "appointment-list",
  "contact-list",
];

if (!uri) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

const client = new MongoClient(uri);

async function initializeDatabase() {
  try {
    await client.connect();

    const db = client.db(dbName);

    for (const name of collections) {
      const exists = await db
        .listCollections({ name }, { nameOnly: true })
        .hasNext();

      if (!exists) {
        await db.createCollection(name);
        console.log(`Created collection: ${name}`);
      } else {
        console.log(`Already exists: ${name}`);
      }
    }

    await db
      .collection("categories")
      .createIndex({ slug: 1 }, { unique: true, name: "category_slug_unique" });

    await db
      .collection("blogs")
      .createIndex({ slug: 1 }, { unique: true, name: "blog_slug_unique" });

    await db
      .collection("locations")
      .createIndex({ slug: 1 }, { unique: true, name: "location_slug_unique" });

    for (const name of ["appointment-list", "contact-list"]) {
      await db
        .collection(name)
        .createIndex(
          { status: 1, createdAt: -1 },
          { name: "status_createdAt_index" },
        );
    }

    console.log("Database initialization completed successfully.");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

initializeDatabase();
