import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CourseCol, CourseListItemProjection, MySession } from "@/lib/types";
import { clientPromise } from "@/lib/DB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).send("Not logged in");
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
  session: MySession
) {
  const userId = session!.user.id.toString();
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const maxResults = req.query.maxResults
    ? parseInt(req.query.maxResults as string)
    : 10;
  const searchQuery = req.query.searchQuery
    ? (req.query.searchQuery as string)
    : "";
  let type = req.query.type ? (req.query.type as string) : "all";
  type = type.toLowerCase();
  const client = await clientPromise;
  const db = client.db("enchanted-oasis");
  const regex = new RegExp(searchQuery, "i");
  const courseCol = db.collection<CourseCol>("Courses");
  let filter: any = {
    $or: [{ name: regex }, { code: regex }, { description: regex }],
  };
  if (type === "enrolled") {
    filter["students"] = { $exists: true, $elemMatch: { $eq: userId } };
  } else if (type === "notenrolled") {
    filter["students"] = {
      $exists: true,
      $not: { $elemMatch: { $eq: userId } },
    };
  } else if (type === "teaching") {
    filter["faculties"] = { $exists: true, $elemMatch: { $eq: userId } };
  }

  const courses = await courseCol
    .find(filter, {
      projection: CourseListItemProjection,
    })
    .skip((page - 1) * maxResults)
    .limit(maxResults)
    .sort({ name: 1 })
    .toArray();

  return res.status(200).json(courses);
}
