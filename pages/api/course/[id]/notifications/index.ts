import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { CourseCol, CourseNotifCol, MySession } from "@/lib/types";
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
  } else if (req.method === "GET") {
    return GET(req, res, session);
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
  const courseNotifCollection = db.collection<CourseNotifCol>(
    "CourseNotifications"
  );
  notification.courseId = req.query.id;
  notification.date = new Date();

  const insertResponse = await courseNotifCollection.insertOne(notification);
  if (!insertResponse.acknowledged) {
    return res.status(500).send("Failed to insert");
  }

  return res.status(200).send("Notification added");
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  if (session?.user.role !== "Faculty" && session?.user.role !== "Student") {
    return res.status(403).send("Not an Faculty or Student");
  }
  const maxResults = req.query.maxResults
    ? parseInt(req.query.maxResults as string)
    : 10;
  const page = req.query.page ? Number(req.query.page as string) : 1;
  const skip = (page - 1) * maxResults;
  const searchQuery = req.query.searchQuery
    ? (req.query.searchQuery as string)
    : "";
  const searchRegex = new RegExp(searchQuery, "i");
  const db = (await clientPromise).db("enchanted-oasis");
  const courseNotifCollection = db.collection<CourseNotifCol>(
    "CourseNotifications"
  );
  const courseId = req.query.id;
  const notifications = await courseNotifCollection
    .find({
      courseId,
      $or: [
        { title: { $regex: searchRegex } },
        { body: { $regex: searchRegex } },
        { badge: { $regex: searchRegex } },
      ],
    })
    .sort({ date: -1 })
    .skip(skip)
    .limit(maxResults)
    .toArray();
  console.log(notifications);
  return res.status(200).json(notifications);
}
