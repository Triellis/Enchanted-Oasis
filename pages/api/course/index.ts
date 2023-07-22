import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CourseCol, MySession } from "@/lib/types";
import { clientPromise } from "@/lib/DB";

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
  //   _id: ObjectId;
  //   name: string;
  //   code: string;
  //   description: string;
  //   credits: number;
  //   schedule: {
  //     [day in Day]: {
  //       startTime: Date;
  //       endTime: Date;
  //     };
  //   };
  //   faculties: string[]; // faculty ids
  //   students: string[]; // array of student ids
  //   lectures: string[]; // array of lecture ids
  //   gradingScheme: {
  //     [gradeLetter: string]: {
  //       minMarks: number;
  //       maxMarks: number;
  //     };
  //   };
  const fields = [
    "name",
    "code",
    "description",
    "credits",
    "schedule",
    "faculties",
    "students",
  ];

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

  const db = (await clientPromise).db("enchanted-oasis");
  const coursesCollection = db.collection<CourseCol>("Courses");
  const insertResponse = await coursesCollection.insertOne(course);
  if (!insertResponse.acknowledged) {
    return res.status(500).send("Failed to insert");
  }
  return res.status(200).send("Course added");
}
