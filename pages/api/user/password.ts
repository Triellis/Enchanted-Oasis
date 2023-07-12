import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { mongoUri } from "../../../lib/DB";
import { MySession, UserCol } from "../../../lib/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Session } from "next-auth";
import { clientPromise } from "../../../lib/DB";
import md5 from "md5";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).send("Not logged in");
  }
  if (req.method === "PUT") {
    return PUT(req, res, session);
  } else {
    return res.status(405).send("Method not allowed");
  }
}

async function PUT(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Exclude<MySession, null>
) {
  const body: {
    oldPassword: string;
    newPassword: string;
  } = req.body;
  if (!body.oldPassword || !body.newPassword) {
    return res
      .status(400)
      .send("Provide oldPassword and newPassword in the body");
  }
  const db = (await clientPromise).db("enchanted-oasis");
  const usersCollection = db.collection<UserCol>("Users");

  const id = session.user.id;

  const user = await usersCollection.findOne(
    {
      _id: id,
    },
    {
      projection: {
        passwordHash: 1,
      },
    }
  );
  const correctPassHash = user?.passwordHash;
  const givenHash = md5(body.oldPassword);
  if (givenHash !== correctPassHash) {
    return res.status(401).send("Wrong password");
  }
  const updateStatus = await usersCollection.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        passwordHash: md5(body.newPassword),
      },
    }
  );

  if (!updateStatus.acknowledged) {
    return res.status(500).send("Failed to update password");
  }

  return res.status(200).send("Password updated");
}
