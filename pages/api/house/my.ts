import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { HouseCol, MySession, UserCol } from "@/lib/types";
import { clientPromise } from "@/lib/DB";

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
  const housesCollection = db.collection<HouseCol>("Houses");
  const usersCollection = db.collection<UserCol>("Users");

  const houses = await housesCollection
    .find({})
    .sort({
      points: -1,
    })
    .toArray();

  return res.status(200).json(houses);
}
