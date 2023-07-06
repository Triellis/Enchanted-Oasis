import { MongoClient } from "mongodb";

export const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env"
  );
}

export const client = new MongoClient(mongoUri!);
