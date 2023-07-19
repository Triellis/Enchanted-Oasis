import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { HouseCol, MySession } from "@/lib/types";
import { clientPromise } from "@/lib/DB";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "DELETE") {
    return DELETE(req, res, session);
  } else if (req.method === "GET") {
    return GET(req, res, session);
  } else if (req.method === "PUT") {
    return PUT(req, res, session);
  } else {
    return res.status(405).send("Method not allowed");
  }
}

async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  if (session?.user.role !== "Admin" && session?.user.role !== "Faculty") {
    return res.status(403).send("Not an Admin or Faculty");
  }
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).send("Missing query parameter: id");
  }
  const db = (await clientPromise).db("enchanted-oasis");
  const housesCollection = db.collection<HouseCol>("Houses");

  const deleteStatus = await housesCollection.deleteOne({
    _id: new ObjectId(id),
  });

  if (!deleteStatus.acknowledged) {
    return res.status(500).json("House deletion failed");
  }

  return res.status(200).json("House deleted successfully");
}

async function PUT(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  const { body } = req;
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).send("Missing query parameter: id");
  }
  if (session?.user.role !== "Admin") {
    return res.status(403).send("Not an Admin");
  }
  const validKeys = ["name", "points"];

  for (const key in body) {
    if (!validKeys.includes(key)) {
      return res.status(400).send("Invalid body parameter: " + key);
    }
  }

  const db = (await clientPromise).db("enchanted-oasis");
  const housesCollection = db.collection<HouseCol>("Houses");

  const insertResponse = await housesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );

  if (!insertResponse.acknowledged) {
    return res.status(500).json("updating House failed");
  }
  return res.status(200).json("House updated successfully");
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  const db = (await clientPromise).db("enchanted-oasis");
  const housesCollection = db.collection<HouseCol>("Houses");

  const houses = await housesCollection.findOne({
    _id: new ObjectId(req.query.id as string),
  });

  if (!houses) {
    return res.status(404).send("House not found");
  }

  return res.json(houses);
}
