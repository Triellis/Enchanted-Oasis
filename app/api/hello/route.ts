import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// Replace the uri string with your connection string.
	const uri = process.env.MONGO_URI!;

	const client = new MongoClient(uri);

	const database = client.db("test");
	const values = database.collection("values");

	// Query for a movie that has the title 'Back to the Future'
	const doc = await values.findOne({ name: "counter" });
	const value = doc!.value;
	console.log(value);

	// Ensures that the client will close when you finish/error
	await client.close();

	return NextResponse.json(
		{
			value,
		},
		{
			status: 200,
		}
	);
}
