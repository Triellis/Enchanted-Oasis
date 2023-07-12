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
  if (session?.user.role !== "Admin") {
    return res.status(403).send("Not an Admin  ");
  }
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).send("Missing query parameter: id");
  }
  const db = (await clientPromise).db("enchanted-oasis");
  const housesCollection = db.collection<HouseCol>("Houses");
  const house = await housesCollection.findOne({
    _id: new ObjectId(id),
  });
  if (!house) {
    return res.status(404).send("House not found");
  }
  const points = house.points;
  if (points <= 0) {
    return res.status(400).send("House points are already 0");
  }

  const updateStatus = await housesCollection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $inc: { points: -1 },
    }
  );

  if (!updateStatus.acknowledged) {
    return res.status(500).json("decreasing House points failed");
  }

  return res.status(200).json("House points decreased successfully");
}
