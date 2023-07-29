import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { CourseCol, CourseNotifCol, MySession } from "@/lib/types";
import { clientPromise } from "@/lib/DB";
import { authOptions } from "../../../auth/[...nextauth]";
import { ObjectId } from "mongodb";

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
  } else if (req.method === "GET") {
    return GET(req, res, session);
  } else {
    return res.status(405).send("Method not allowed");
  }
}

async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  if (session?.user.role !== "Faculty") {
    return res.status(403).send("Not an Faculty");
  }

  const db = (await clientPromise).db("enchanted-oasis");
  const courseNotifCollection = db.collection<CourseNotifCol>(
    "CourseNotifications"
  );
  const deleteResponse = await courseNotifCollection.deleteOne({
    _id: new ObjectId(req.query.notificationId as string),
  });
  if (!deleteResponse.acknowledged) {
    return res.status(500).send("Failed to delete");
  }
  return res.status(200).send("Deleted");
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  if (session?.user.role !== "Faculty" && session?.user.role !== "Student") {
    return res.status(403).send("Not an Faculty or Student");
  }

  const db = (await clientPromise).db("enchanted-oasis");
  const courseNotifCollection = db.collection<CourseNotifCol>(
    "CourseNotifications"
  );
  const notification = await courseNotifCollection.findOne({
    _id: new ObjectId(req.query.notificationId as string),
  });
  if (!notification) {
    return res.status(404).send("Notification not found");
  }
  return res.status(200).json(notification);
}
