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
  const db = (await clientPromise).db("enchanted-oasis");
  const usersCollection = db.collection<UserCol>("Users");
  const pipeline = [
    { $match: { _id: session?.user.id } }, // Match the user ID
    { $project: { house: 1 } }, // Include only the house property
    {
      $lookup: {
        // Perform a join with the houses collection
        from: "Houses",
        localField: "house",
        foreignField: "name",
        as: "houseDocument",
      },
    },
    { $unwind: "$houseDocument" }, // Unwind the houseDocument array
    { $replaceRoot: { newRoot: "$houseDocument" } }, // Replace the root with the house document
  ];

  const house = await usersCollection.aggregate(pipeline).toArray();

  if (house.length === 0) {
    return res.status(200).send("You are not in any house");
  }

  return res.status(200).send(house);
}
