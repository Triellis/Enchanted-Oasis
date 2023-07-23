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
  } else if (req.method === "DELETE") {
    return DELETE(req, res, session);
  } else if (req.method === "PUT") {
    return PUT(req, res, session);
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

async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  if (session?.user.role !== "Admin") {
    return res.status(403).send("Not an Admin");
  }

  const id = req.query.id as string;

  const client = await clientPromise;
  const db = client.db("enchanted-oasis");
  const courseCol = db.collection<CourseCol>("Courses");
  const course = await courseCol.deleteOne({ _id: new ObjectId(id) });
  if (!course.acknowledged) {
    return res.status(404).send("Course not found");
  }

  return res.status(200).json("Course deleted");
}

async function PUT(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  if (session?.user.role !== "Admin") {
    return res.status(403).send("Not an Admin");
  }

  const id = req.query.id as string;

  const fields = ["name", "code", "description", "credits", "schedule"];

  const course = req.body;
  // check for missing fields
  for (const field of fields) {
    if (!course[field]) {
      return res.status(400).send(`Missing field ${field}`);
    }
  }

  // check for  not allowed fields

  for (const field in course) {
    if (!fields.includes(field)) {
      return res.status(400).send(`Not allowed field ${field}`);
    }
  }

  const client = await clientPromise;
  const db = client.db("enchanted-oasis");
  const courseCol = db.collection<CourseCol>("Courses");
  const updateResponse = await courseCol.updateOne(
    { _id: new ObjectId(id) },
    { $set: course }
  );
  if (!updateResponse.acknowledged) {
    return res.status(404).send("Course not found");
  }

  return res.status(200).json("Course updated");
}
