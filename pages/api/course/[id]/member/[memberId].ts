import { clientPromise } from "@/lib/DB";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
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

async function DELETE(req: NextApiRequest, res: NextApiResponse, session: any) {
  const courseId = req.query.id as string;
  const memberId = req.query.memberId as string;
  if (!courseId) {
    return res.status(400).send("Missing courseId");
  }
  if (!memberId) {
    return res.status(400).send("Missing memberId");
  }
  const memberType = req.query.memberType as "student" | "faculty";
  if (!memberType) {
    return res.status(400).send("Missing memberType");
  } else if (memberType !== "student" && memberType !== "faculty") {
    return res
      .status(400)
      .send("Invalid memberType, must be student or faculty");
  }
  const db = (await clientPromise).db("enchanted-oasis");
  const coursesCollection = db.collection("Courses");
  const filter = { _id: new ObjectId(courseId) }; // Filter to identify the document to update
  const arrayField = memberType === "student" ? "students" : "faculties";

  const update = {
    $pull: { [arrayField]: memberId },
  };

  const result = await coursesCollection.updateOne(filter, update);
  if (!result.acknowledged) {
    return res.status(500).send("Request failed");
  }

  return res.status(200).send("Member removed");
}
