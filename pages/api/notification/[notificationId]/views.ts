import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AdminNotificationCol, MySession, UserCol } from "@/lib/types";
import { clientPromise } from "@/lib/DB";
import { ObjectId, UpdateFilter } from "mongodb";

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
  if (session?.user.role !== "Admin") {
    return res.status(403).send("Not an Admin");
  }
  const notificationId = req.query.notificationId as string;
  const db = (await clientPromise).db("enchanted-oasis");
  const notificationCollection =
    db.collection<AdminNotificationCol>("AdminNotifications");
  const notifDoc = await notificationCollection.findOne({
    _id: new ObjectId(notificationId),
  });
  if (!notifDoc) {
    return res.status(404).json("Notification not found");
  }

  const seenByCount = notifDoc.seenByCount;
  return res.status(200).json({ seenByCount });
}
