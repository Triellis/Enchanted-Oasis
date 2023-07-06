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
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).send("Not logged in");
  }
  if (req.method === "GET") {
    return GET(req, res, session);
  } else if (req.method === "PUT") {
    return PUT(req, res, session);
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

  return res.json(user);
}

async function PUT(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Exclude<MySession, null>
) {
  const db = client.db("enchanted-oasis");
  const usersCollection = db.collection<UserCol>("Users");
  const updateDoc = req.body;
  const allowedFields = ["name", "phone", "profilePicture"];
  const updatingFields = Object.keys(updateDoc);
  for (let f of updatingFields) {
    if (allowedFields.includes(f)) {
      continue;
    } else {
      return res
        .status(400)
        .send(
          `You can not update field ${f}. fields that are allowed to update are ${allowedFields.join(
            ", "
          )}`
        );
    }
  }
  const id = session.user.id;
  const user = await usersCollection.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        ...updateDoc,
      },
    }
  );
  return res.json(user);
}
