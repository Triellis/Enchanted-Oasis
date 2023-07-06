import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { mongoUri } from "../../../lib/DB";
import { MySession, UserCol } from "../../../lib/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Session } from "next-auth";
import { client } from "../../../lib/DB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.time("session");
  const session = await getServerSession(req, res, authOptions);
  console.timeEnd("session");
  if (!session) {
    return res.status(403).send("Not logged in");
  }
  if (req.method === "GET") {
    return GET(req, res, session);
  }
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Exclude<MySession, null>
) {
  const db = client.db("enchanted-oasis");
  const usersCollection = db.collection<UserCol>("Users");

  const id = session.user.id;
  console.time("data");
  const user = await usersCollection.findOne(
    {
      _id: id,
    },
    {
      projection: {
        notifications: 0,
        notificationsCount: 0,
        seenNotifications: 0,
        seenNotificationsCount: 0,
      },
    }
  );
  console.timeEnd("data");
  return res.json(user);
}
