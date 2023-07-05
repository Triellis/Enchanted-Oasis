import { MongoClient } from "mongodb";
import { UserCol } from "./types";
import md5 from "md5";
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
	throw new Error(
		"Please define the MONGO_URI environment variable inside .env"
	);
}

export async function validateLogin(email: string, password: string) {
	const client = await MongoClient.connect(mongoUri!);
	const usersCollection = client
		.db("enchanted-oasis")
		.collection<UserCol>("Users");
	const user = await usersCollection.findOne({ email: email });
	client.close();
	const passwordHash = md5(password);

	if (!user) {
		return null;
	}
	if (user.passwordHash !== passwordHash) {
		return null;
	}

	return {
		email: user.email,
		name: user.name,
		role: user.role,
		id: user._id,
		image: user.profilePicture,
	};
}
