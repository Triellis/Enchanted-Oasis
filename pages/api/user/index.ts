import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { mongoUri } from "../../../lib/DB";
import { MySession, UserCol } from "../../../lib/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Session } from "next-auth";
import { clientPromise } from "../../../lib/DB";

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
  } else if (req.method === "DELETE") {
    return DELETE(req, res, session);
  } else {
    res.status(405);
  }
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Exclude<MySession, null>
) {
  const db = (await clientPromise).db("enchanted-oasis");
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
  const db = (await clientPromise).db("enchanted-oasis");
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

async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Exclude<MySession, null>
) {
  if (session.user.role !== "Admin") {
    return res.status(403).send("Not authorized");
  }

  const db = (await clientPromise).db("enchanted-oasis");
  const usersCollection = db.collection<UserCol>("Users");
  const userId = req.query.userId as string;
  if (!userId) {
    return res.status(400).send("Provide userId in query params");
  }
  const deleteRes = await usersCollection.deleteOne({
    _id: new ObjectId(userId),
  });

  if (deleteRes.deletedCount === 0) {
    return res.status(404).send("User not found");
  } else if (!deleteRes.acknowledged) {
    return res.status(500).send("Something went wrong");
  }
  return res.status(200).send("User deleted");
}
