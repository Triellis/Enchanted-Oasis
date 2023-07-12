import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { HouseCol, MySession } from "../../../lib/types";
import { clientPromise } from "../../../lib/DB";

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
  if (req.method === "GET") {
    return GET(req, res, session);
  } else {
    return res.status(405).send("Method not allowed");
  }
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  if (session?.user.role !== "Admin" && session?.user.role !== "Faculty") {
    return res.status(403).send("Not an Admin or Faculty");
  }

  const db = (await clientPromise).db("enchanted-oasis");
  const HousesCollection = db.collection<HouseCol>("Houses");

  const houses = await HousesCollection.find({})
    .sort({
      points: -1,
    })
    .toArray();

  return res.status(200).json(houses);
}
