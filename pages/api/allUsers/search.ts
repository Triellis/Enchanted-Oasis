import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { mongoUri } from "../../../lib/DB";
import { MySession, UserCol, userProjection } from "../../../lib/types";
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
  if (searchQuery === undefined) {
    return res.status(400).send("No searchQuery provided in the query");
  }

  if (
    role.toLowerCase() !== "student" &&
    role.toLowerCase() !== "faculty" &&
    role.toLowerCase() !== "admin" &&
    role.toLowerCase() !== "all"
  ) {
    return res
      .status(400)
      .send("Invalid role, must be student, faculty, admin or all");
  }
  role = capitalizeFirstLetter(role);
  role = role === "All" ? { $in: ["Student", "Faculty", "Admin"] } : role;

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
        projection: userProjection,
      }
    )
    .sort({ _id: -1 })
    .skip((page - 1) * maxResults)
    .limit(maxResults)
    .toArray();

  return res.json(users);
}
