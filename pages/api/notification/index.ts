import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import {
  AdminNotificationCol,
  AdminNotificationOnClient,
  MySession,
  UserCol,
} from "@/lib/types";
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
  if (session?.user.role !== "Admin") {
    return res.status(403).send("Not an Admin");
  }

  const { body: reqBody } = req;

  const { title, body, badgeText, badgeColor, audience } = reqBody;
  if (!title) {
    return res.status(400).send("Missing body parameter: title");
  } else if (!body) {
    return res.status(400).send("Missing body parameter: body");
  } else if (!badgeText) {
    return res.status(400).send("Missing body parameter: badgeText");
  } else if (!badgeColor) {
    return res.status(400).send("Missing body parameter: badgeColor");
  } else if (
    !audience ||
    (audience !== "All" && audience !== "Student" && audience !== "Faculty")
  ) {
    return res
      .status(400)
      .send(
        "Missing body parameter: audience or invalid audience type, must be All, Student, or Faculty"
      );
  }
  const notifID = new ObjectId();
  const notificationDoc = {
    _id: notifID,
    title,
    body,
    badgeText,
    badgeColor,
    audience,
    creatorId: session.user.id,
    creatorName: session.user.name,
    seenBy: [],
    date: new Date(),
    seenByCount: 0,
  };

  const db = (await clientPromise).db("enchanted-oasis");
  const notificationCollection =
    db.collection<AdminNotificationCol>("AdminNotifications");

  const insertResponse = await notificationCollection.insertOne(
    notificationDoc
  );

  const usersCollection = db.collection<UserCol>("Users");
  let filter; // Add your filter criteria here if needed
  if (audience === "All") {
    filter = {};
  } else {
    filter = { role: { $in: [audience, "Admin"] } };
  }

  const update = {
    $set: {
      [`notifications.${[notifID.toString()]}`]: {
        seen: false,
      },
    },

    $inc: { unseenNotificationsCount: 1 },
  } as UpdateFilter<UserCol>["notifications"]; // Replace 'myArrayField' with your field name

  const options = { upsert: true };

  const updateResponse = await usersCollection.updateMany(
    filter,
    update,
    options
  );

  if (!insertResponse.acknowledged) {
    return res.status(500).json("Notification creation failed");
  } else if (!updateResponse.acknowledged) {
    return res
      .status(500)
      .json(
        "users collection update failed, notification created but not sent to users"
      );
  }
  return res.status(200).json("Notification created successfully");
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  const maxResults = (req.query.maxResults as string)
    ? parseInt(req.query.maxResults as string)
    : 10;
  const page = (req.query.page as string)
    ? parseInt(req.query.page as string)
    : 1;
  const skip = (page - 1) * maxResults;
  const unseenOnly = req.query.unseenOnly
    ? Boolean(req.query.unseenOnly)
    : false;

  const db = (await clientPromise).db("enchanted-oasis");
  const notificationCollection =
    db.collection<AdminNotificationCol>("AdminNotifications");
  const usersCollection = db.collection<UserCol>("Users");
  const userId = new ObjectId(session?.user.id);
  let userNotifDoc = (
    await usersCollection.findOne(
      { _id: userId },
      {
        projection: {
          notifications: 1,
        },
      }
    )
  )?.notifications!;
  if (unseenOnly) {
    userNotifDoc = Object.fromEntries(
      Object.entries(userNotifDoc).filter(([key, value]) => !value.seen)
    );
  }
  // reverse the object
  userNotifDoc = Object.fromEntries(
    Object.entries(userNotifDoc).reverse() as any
  );

  // slice the object
  userNotifDoc = Object.fromEntries(
    Object.entries(userNotifDoc).slice(skip, skip + maxResults)
  );

  const userNotifIds = Object.keys(userNotifDoc).map(
    (key) => new ObjectId(key)
  );

  console.log(userNotifIds);
  let notifProjection;
  if (session?.user.role === "Admin") {
    notifProjection = {
      seenBy: 0,
    };
  } else {
    notifProjection = {
      seenBy: 0,
      seenByCount: 0,
    };
  }
  let notifications;

  notifications = await notificationCollection
    .find({ _id: { $in: userNotifIds } }, { projection: notifProjection })
    .toArray();
  console.log(notifications);
  const notificationsWithSeen: AdminNotificationOnClient[] = notifications
    .map((notification) => {
      let seen = false;
      if (userNotifDoc.hasOwnProperty(notification._id.toString())) {
        seen = userNotifDoc[notification._id.toString()].seen;
      }
      return { ...notification, seen };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return res.status(200).json(notificationsWithSeen);
}
