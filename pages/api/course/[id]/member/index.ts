import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { CourseCol, MySession } from "@/lib/types";
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
  if (req.method === "POST") {
    return POST(req, res, session);
  } else {
    return res.status(405).send("Method not allowed");
  }
}

async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  if (session?.user.role !== "Admin") {
    return res.status(403).send("Not an Admin");
  }

  const memberIds = req.body.studentIds as string[];
  const memberType = req.body.memberType as "student" | "faculty";
  if (!memberType) {
    return res.status(400).send("Missing memberType");
  } else if (memberType !== "student" && memberType !== "faculty") {
    return res
      .status(400)
      .send("Invalid memberType, must be student or faculty");
  }
  if (!memberIds) {
    return res.status(400).send("Missing studentIds");
  } else if (!Array.isArray(memberIds)) {
    return res.status(400).send("studentIds must be an array");
  }
  const courseId = req.query.id as string;
  if (!courseId) {
    return res.status(400).send("Missing courseId");
  }

  const db = (await clientPromise).db("enchanted-oasis");
  const coursesCollection = db.collection<CourseCol>("Courses");
  const filter = { _id: new ObjectId(courseId) }; // Filter to identify the document to update
  let update;
  if (memberType === "faculty")
    update = {
      $addToSet: { faculties: { $each: memberIds } },
    };
  // Elements to add to the array
  else update = { $addToSet: { students: { $each: memberIds } } }; // Elements to add to the array

  const updateResponse = await coursesCollection.updateOne(filter, update);
  if (!updateResponse.acknowledged) {
    return res.status(500).send("Failed to Add");
  }

  return res.status(200).send("Member added");
}
