import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { HouseCol, MySession } from "../../../lib/types";
import { clientPromise } from "../../../lib/DB";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).send("Not logged in");
  } else if (session.user.role !== "Admin" && session.user.role !== "Faculty") {
    return res.status(403).send("Not an Admin or Faculty");
  }
  if (req.method === "POST") {
    return POST(req, res, session);
  } else {
    return res.status(405).send("Method not allowed");
  }
}

async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  const { body } = req;
  if (session?.user.role !== "Admin") {
    return res.status(403).send("Not an Admin");
  }
  const { name } = body;

  if (!name) {
    return res.status(400).send("Missing body parameter: name");
  }

  const house = {
    name,
    points: 0,
    _id: new ObjectId(),
  };

  const db = (await clientPromise).db("enchanted-oasis");
  const housesCollection = db.collection<HouseCol>("Houses");

  const insertResponse = await housesCollection.insertOne(house);

  if (!insertResponse.acknowledged) {
    return res.status(500).json("House creation failed");
  }
  return res.status(200).json("House created successfully");
}
