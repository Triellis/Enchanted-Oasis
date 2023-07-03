import { MongoClient } from "mongodb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const uri = "your mongodb uri";
const client = new MongoClient(uri);
export async function GET(request: NextApiRequest) {
	const database = client.db("test");
	const values = database.collection("values");
	// Replace the uri string with your connection string.

	// Query for a movie that has the title 'Back to the Future'
	await values.updateOne({ name: "counter" }, { $inc: { value: 1 } });

	console.time("mongo");
	const doc = await values.findOne({ name: "counter" });
	const value = doc!.value;
	console.timeEnd("mongo");
	// Ensures that the client will close when you finish/error
	// await client.close();

	// client.close();
	return NextResponse.json(
		{
			value,
		},
		{
			status: 200,
		}
	);
}
