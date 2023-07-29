import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { CourseCol, MySession } from "@/lib/types";
import { clientPromise } from "@/lib/DB";
import { authOptions } from "../../../auth/[...nextauth]";

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
  if (session?.user.role !== "Faculty") {
    return res.status(403).send("Not an Faculty");
  }

  const fields = ["title", "body", "badge", "badgeColor"];

  const notification = req.body;
  // check for missing fields
  for (const field of fields) {
    if (!notification[field]) {
      return res.status(400).send(`Missing field ${field}`);
    }
  }

  fields.push("attachment");
  // check for  not allowed fields
  for (const field in notification) {
    if (!fields.includes(field)) {
      return res.status(400).send(`Not allowed field ${field}`);
    }
  }

  const db = (await clientPromise).db("enchanted-oasis");
  const courseNotifCollection = db.collection<CourseCol>("CourseNotifications");
  notification.courseId = req.query.id;

  const insertResponse = await courseNotifCollection.insertOne(notification);
  if (!insertResponse.acknowledged) {
    return res.status(500).send("Failed to insert");
  }

  return res.status(200).send("Notification added");
}
