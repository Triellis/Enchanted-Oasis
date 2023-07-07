import { MongoClient } from "mongodb";

export const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env"
  );
}

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  //@ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(mongoUri);
    //@ts-ignore
    global._mongoClientPromise = client.connect();
  }
  //@ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(mongoUri);
  clientPromise = client.connect();
}

export { clientPromise };
