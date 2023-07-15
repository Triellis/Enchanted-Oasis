import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import {
  AdminNotificationCol,
  HouseCol,
  MySession,
  UserCol,
} from "../../../lib/types";
import { clientPromise } from "../../../lib/DB";
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
  const db = (await clientPromise).db("enchanted-oasis");
  const usersCollection = db.collection<UserCol>("Users");
  const user = await usersCollection.findOne({ _id: session?.user.id });
  if (!user) {
    return res.status(500).send("User not found");
  }
  const unseenNotificationsCount = user.unseenNotificationsCount;
  return res.json({
    unseenNotificationsCount,
  });
}
