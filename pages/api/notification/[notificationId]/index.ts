import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AdminNotificationCol, MySession, UserCol } from "@/lib/types";
import { clientPromise } from "@/lib/DB";
import { ObjectId, UpdateFilter } from "mongodb";
import { markAsSeen } from "./seen";
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
  if (session?.user.role !== "Admin") {
    return res.status(403).send("Not an Admin");
  }
  const notificationId = req.query.notificationId as string;
  const db = (await clientPromise).db("enchanted-oasis");
  const notificationCollection =
    db.collection<AdminNotificationCol>("AdminNotifications");

  const usersCollection = db.collection<UserCol>("Users");
  const updateResponse = await usersCollection.updateMany(
    { [`notifications.${notificationId}.seen`]: { $eq: false } },
    { $inc: { unseenNotificationsCount: -1 } }
  );
  let filter = {
    [`notifications.${notificationId}`]: { $exists: true },
  };

  const update = {
    $unset: {
      ["notifications." + notificationId]: "",
    } as UpdateFilter<UserCol>["notifications"],
  };
  const deleteResponse = await notificationCollection.deleteOne({
    _id: new ObjectId(notificationId),
  });
  const updateResponse2 = await usersCollection.updateMany(filter, update);
  if (deleteResponse.deletedCount === 0) {
    return res.status(404).json("Notification not found");
  } else if (!updateResponse2.acknowledged || !updateResponse.acknowledged) {
    return res
      .status(500)
      .json("Notification deletion failed, could not delete them from users");
  } else if (!deleteResponse.acknowledged) {
    return res
      .status(500)
      .json(
        "Notification deletion failed, could not delete them from notification Doc"
      );
  }
  return res.status(200).json("Notification deleted successfully");
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  let projection;
  if (session?.user.role === "Admin") {
    projection = {
      seenBy: 0,
    };
  } else {
    projection = {
      seenBy: 0,
      seenByCount: 0,
    };
  }

  const { userUpdate, noficUpdate, notifDoc } = await markAsSeen(req, session);

  if (!notifDoc) {
    return res.status(404).send("Notification does not exists");
  }

  if (!userUpdate.acknowledged || !noficUpdate.acknowledged) {
    return res.status(500).json("Something went while marking as seen");
  }

  for (let k of Object.keys(projection)) {
    delete notifDoc[k as keyof AdminNotificationCol];
  }

  return res.status(200).json(notifDoc);
}
