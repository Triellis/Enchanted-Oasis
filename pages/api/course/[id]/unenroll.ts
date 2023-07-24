import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { CourseCol, MySession } from "@/lib/types";
import { clientPromise } from "@/lib/DB";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).send("Not logged in");
  }
  if (req.method === "DELETE") {
    return DELETE(req, res, session);
  } else {
    return res.status(405).send("Method not allowed");
  }
}

async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  const id = req.query.id as string;
  if (session?.user.role !== "Student") {
    return res.status(403).send("Not a student");
  }
  if (!id) {
    return res.status(400).send("Missing courseId");
  }

  const client = await clientPromise;
  const db = client.db("enchanted-oasis");
  const courseCol = db.collection<CourseCol>("Courses");
  const updateResponse = await courseCol.updateOne(
    { _id: new ObjectId(id) },
    { $pull: { students: session.user.id.toString() } }
  );

  if (!updateResponse.acknowledged) {
    return res.status(500).send("Request failed");
  }

  return res.status(200).json("unEnrolled");
}
