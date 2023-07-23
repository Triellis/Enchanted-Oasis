import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {
  CourseCol,
  CourseInformation,
  CourseInformationProjection,
  MySession,
} from "@/lib/types";
import { clientPromise } from "@/lib/DB";
import { ObjectId } from "mongodb";

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
  const id = req.query.id as string;

  const client = await clientPromise;
  const db = client.db("enchanted-oasis");
  const courseCol = db.collection<CourseCol>("Courses");
  const course = await courseCol.findOne(
    { _id: new ObjectId(id) },
    {
      projection: CourseInformationProjection,
    }
  );
  if (!course) {
    return res.status(404).send("Course not found");
  }

  return res.status(200).json(course);
}
