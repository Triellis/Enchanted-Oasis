import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { mongoUri } from "../../../lib/DB";
import { MySession, UserCol } from "../../../lib/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Session } from "next-auth";
import { clientPromise } from "../../../lib/DB";
import md5 from "md5";
import { capitalizeFirstLetter } from "../../../lib/functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session.user.role);
  if (!session) {
    return res.status(403).send("Not logged in");
  } else if (session.user.role !== "Admin" && session.user.role !== "Faculty") {
    return res.status(403).send("Not an Admin or Faculty");
  }
  if (req.method === "GET") {
    return GET(req, res, session);
  } else {
    return res.status(405).send("Method not allowed");
  }
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Exclude<MySession, null>
) {
  const query = req.query;
  const maxResults = query.maxResults
    ? parseInt(query.maxResults as string) || 10
    : 10;
  const page = query.page ? parseInt(query.page as string) || 1 : 1;
  let role: any = query.role ? (query.role as string) : "Student";
  const searchQuery = query.searchQuery as string;
  if (!searchQuery) {
    return res.status(400).send("No searchQuery provided in the query");
  }

  if (
    role.toLowerCase() !== "student" &&
    role.toLowerCase() !== "faculty" &&
    role.toLowerCase() !== "both"
  ) {
    return res
      .status(400)
      .send("Invalid role, must be student, faculty, or both");
  }
  role = capitalizeFirstLetter(role);
  role = role === "Both" ? { $in: ["Student", "Faculty"] } : role;

  const db = (await clientPromise).db("enchanted-oasis");
  const usersCollection = db.collection<UserCol>("Users");
  const regex = new RegExp(searchQuery, "i");
  const users = await usersCollection
    .find(
      {
        role: role,
        $or: [
          { name: regex },
          { email: regex },
          { phone: regex },
          { rollNumber: regex },
        ],
      },
      {
        projection: {
          _id: 1,
          name: 1,
          phone: 1,
          email: 1,
          house: 1,
          role: 1,
          profilePicture: 1,
          rollNumber: 1,
        },
      }
    )
    .skip((page - 1) * maxResults)
    .limit(maxResults)
    .toArray();

  return res.json(users);
}
