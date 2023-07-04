import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);
const database = client.db("test");
const values = database.collection("values");
export async function POST(request: NextRequest) {
	// Replace the uri string with your connection string.

	// Query for a movie that has the title 'Back to the Future'
	let startTime = performance.now();
	const doc = await values.findOne({ name: "counter" });
	const value = doc!.value;
	const updateStatus = await values.updateOne(
		{ name: "counter" },
		{ $inc: { value: 1 } }
	);

	let endTime = performance.now();
	let time = endTime - startTime;

	// Ensures that the client will close when you finish/error
	// await client.close();

	return NextResponse.json(
		{
			value,
			time,
		},
		{
			status: 200,
		}
	);
}
