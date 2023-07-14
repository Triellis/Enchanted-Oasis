import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { mongoUri } from "../../../lib/DB";
import { MySession, UserCol } from "../../../lib/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Session } from "next-auth";
import { clientPromise } from "../../../lib/DB";
import md5 from "md5";
import { IncomingForm } from "formidable";
import { deleteFile, getFileUrl } from "@/lib/supabase";
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
  } else if (req.method === "POST") {
    return POST(req, res, session);
  } else {
    res.status(405).send("Method not allowed");
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
        passwordHash: 0,
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
  const formData: {
    fields: {
      [key: string]: any;
    };
    files: {
      profilePicture?: any[];
    };
  } = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields: any, files: any) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const userId = formData.fields.userId?.length
    ? formData.fields.userId[0]
    : session.user.id;
  const allowedFields = ["phone", "profilePicture"];
  if (session.user.role === "admin") {
    allowedFields.push("name");
  }
  const userDoc: {
    [key: string]: any;
  } = {};

  for (let f of Object.keys(formData.fields)) {
    if (formData.fields[f].length) {
      userDoc[f] = formData.fields[f][0];
    }
  }
  if (formData.files.profilePicture?.length) {
    userDoc.profilePicture = await getFileUrl(
      formData.files.profilePicture[0].filepath,
      "profile pic/" + userId.toString(),
      formData.files.profilePicture[0].originalFilename
    );
  }

  const db = (await clientPromise).db("enchanted-oasis");
  const usersCollection = db.collection<UserCol>("Users");

  const updatingFields = Object.keys(userDoc);
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

  const user = await usersCollection.updateOne(
    {
      _id: userId,
    },
    {
      $set: {
        ...userDoc,
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
  const user = await usersCollection.findOne({
    _id: new ObjectId(userId),
  });
  const fileDelete = await deleteFile(user!.profilePicture);
  const deleteRes = await usersCollection.deleteOne({
    _id: new ObjectId(userId),
  });
  if (fileDelete === 500) {
    return res.status(500).send("Something went wrong, profile not deleted");
  } else if (deleteRes.deletedCount === 0) {
    return res.status(404).send("User not found");
  } else if (!deleteRes.acknowledged) {
    return res.status(500).send("Something went wrong");
  }
  return res.status(200).send("User deleted");
}

async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Exclude<MySession, null>
) {
  if (session.user.role !== "Admin") {
    return res.status(403).send("Not authorized");
  }
  //   const body = req.body;

  const formData: {
    fields: {
      name: string;
      phone: string;
      email: string;
      role: string;
      rollNumber: string;
      password: string;
      house: string;
    };
    files: {
      profilePicture: any[];
    };
  } = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields: any, files: any) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const neededFields = [
    "name",
    "phone",
    "email",
    "role",
    "rollNumber",
    "password",
    "house",
  ];

  const fields = Object.keys(formData.fields);
  for (let f of neededFields) {
    if (fields.includes(f)) {
      continue;
    } else {
      return res.status(400).send(`You need to provide ${f} in body`);
    }
  }
  const newId = new ObjectId();
  const userDoc = {
    _id: newId,
    name: formData.fields.name[0],
    phone: formData.fields.phone[0],
    email: formData.fields.email[0],
    role: formData.fields.role[0],
    rollNumber: formData.fields.rollNumber[0],
    house: formData.fields.house[0],
    profilePicture: await getFileUrl(
      formData.files.profilePicture[0].filepath,
      "profile pic/" + newId.toString(),
      formData.files.profilePicture[0].originalFilename
    ),
    passwordHash: md5(formData.fields.password[0]),
  };

  const db = (await clientPromise).db("enchanted-oasis");
  const usersCollection = db.collection<UserCol>("Users");
  if ((await usersCollection.countDocuments({ email: userDoc.email })) !== 0) {
    return res.status(400).send("User with this email already exists");
  }

  const insertRes = await usersCollection.insertOne(userDoc as any);
  if (!insertRes.acknowledged) {
    return res.status(500).send("Something went wrong");
  }
  return res.status(200).send("User created");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
