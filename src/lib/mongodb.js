import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error("Please define MONGODB_URI in your .env.local file.");
}

if (!dbName) {
  throw new Error("Please define MONGODB_DB in your .env.local file.");
}

const options = {};

const globalForMongo = globalThis;

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options);

    globalForMongo._mongoClientPromise = client.connect();
  }

  clientPromise = globalForMongo._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb() {
  const client = await clientPromise;

  return client.db(dbName);
}

export default clientPromise;
