import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { HouseCol, MySession, userProjection } from "@/lib/types";
import { clientPromise } from "@/lib/DB";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

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
  const id = req.query.id as string;
  const page = (req.query.page as string)
    ? parseInt(req.query.page as string)
    : 1;
  const maxResults = (req.query.maxResults as string)
    ? parseInt(req.query.maxResults as string)
    : 10;
  const searchQuery = req.query.searchQuery as string;

  if (!id) {
    return res.status(400).send("Missing query parameter: id");
  }
  const db = (await clientPromise).db("enchanted-oasis");
  const usersCollection = db.collection<HouseCol>("Users");
  const housesCollection = db.collection<HouseCol>("Houses");
  const house = await housesCollection.findOne({
    _id: new ObjectId(id),
  });
  if (!house) {
    return res.status(404).json("House not found");
  }
  const regex = new RegExp(searchQuery, "i");
  const houseMembers = await usersCollection
    .find(
      {
        house: house.name,
        $or: [
          { name: { $regex: regex } },
          { email: { $regex: regex } },
          { rollNumber: { $regex: regex } },
        ],
      },
      {
        projection: userProjection,
      }
    )
    .toArray();

  return res.status(200).json(houseMembers);
}
