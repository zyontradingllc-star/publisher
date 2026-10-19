import { MongoClient } from "mongodb";

/**
 * Optional raw Mongo client (env-based).
 * Payload CMS uses the same DATABASE_URL / MONGODB_URI via mongooseAdapter.
 * Prefer getPayloadClient() for Book Submissions / Authors / Books.
 */

function mongoUri(): string {
  const uri = process.env.DATABASE_URL || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Set DATABASE_URL or MONGODB_URI in .env.local");
  }
  return uri;
}

declare global {
  // eslint-disable-next-line no-var
  var __authorsPilotMongoClient: MongoClient | undefined;
}

export async function connectToMongoDB(): Promise<MongoClient> {
  if (global.__authorsPilotMongoClient) {
    return global.__authorsPilotMongoClient;
  }

  const client = new MongoClient(mongoUri());
  await client.connect();
  global.__authorsPilotMongoClient = client;

  if (process.env.NODE_ENV !== "production") {
    console.log("[mongodb] connected");
  }

  return client;
}

export async function disconnectFromMongoDB() {
  if (!global.__authorsPilotMongoClient) return;
  await global.__authorsPilotMongoClient.close();
  global.__authorsPilotMongoClient = undefined;
}
