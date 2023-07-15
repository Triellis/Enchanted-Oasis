import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {
  AdminNotificationCol,
  MySession,
  UserCol,
  userProjection,
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
  if (session?.user.role !== "Admin") {
    return res.status(403).send("Not an Admin");
  }

  const maxResults = (req.query.maxResults as string)
    ? parseInt(req.query.maxResults as string)
    : 10;
  const page = (req.query.page as string)
    ? parseInt(req.query.page as string)
    : 1;
  const skip = (page - 1) * maxResults;
  const notificationId = req.query.notificationId as string;

  const db = (await clientPromise).db("enchanted-oasis");
  const notificationCollection =
    db.collection<AdminNotificationCol>("AdminNotifications");

  const notifDoc = await notificationCollection.findOne({
    _id: new ObjectId(notificationId),
  });
  if (!notifDoc) {
    return res.status(404).send("Notification not found");
  }
  const usersCollection = db.collection<UserCol>("Users");
  const seenBy = notifDoc.seenBy
    .map((i) => new ObjectId(i))
    .slice(skip, skip + maxResults);

  let viewersList = await usersCollection
    .find(
      { _id: { $in: seenBy } },
      {
        projection: userProjection,
      }
    )
    .toArray();
  const seenByStrings = seenBy.map((i) => i.toString());
  viewersList = viewersList
    .sort(
      (a, b) =>
        seenByStrings.indexOf(a._id.toString()) -
        seenByStrings.indexOf(b._id.toString())
    )
    .reverse();

  return res.status(200).json(viewersList);
}
