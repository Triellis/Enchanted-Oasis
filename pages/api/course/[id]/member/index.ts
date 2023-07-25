import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { CourseCol, MySession, userProjection } from "@/lib/types";
import { clientPromise } from "@/lib/DB";
import { ObjectId } from "mongodb";
import { capitalizeFirstLetter } from "@/lib/functions";

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

  const memberIds = req.body.memberIds as string[];
  const memberType = req.query.memberType as "student" | "faculty";
  if (!memberType) {
    return res.status(400).send("Missing memberType");
  } else if (memberType !== "student" && memberType !== "faculty") {
    return res
      .status(400)
      .send("Invalid memberType, must be student or faculty");
  }
  if (!memberIds) {
    return res.status(400).send("Missing studentIds");
  } else if (!Array.isArray(memberIds)) {
    return res.status(400).send("studentIds must be an array");
  }
  const courseId = req.query.id as string;
  if (!courseId) {
    return res.status(400).send("Missing courseId");
  }

  const db = (await clientPromise).db("enchanted-oasis");
  const coursesCollection = db.collection<CourseCol>("Courses");
  const filter = { _id: new ObjectId(courseId) }; // Filter to identify the document to update
  let update;
  if (memberType === "faculty") {
    update = {
      $addToSet: { faculties: { $each: memberIds } }, // Elements to add to the array
    };
  } else {
    update = { $addToSet: { students: { $each: memberIds } } }; // Elements to add to the array
  }

  const updateResponse = await coursesCollection.updateOne(filter, update);
  if (!updateResponse.acknowledged) {
    return res.status(500).send("Failed to Add");
  }

  return res.status(200).send("Member added");
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: MySession
) {
  const courseId = req.query.id as string;
  if (!courseId) {
    return res.status(400).send("Missing courseId");
  }
  const memberType = req.query.memberType as "student" | "faculty";
  if (!memberType) {
    return res.status(400).send("Missing memberType");
  } else if (memberType !== "student" && memberType !== "faculty") {
    return res
      .status(400)
      .send("Invalid memberType, must be student or faculty");
  }

  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const maxResults = req.query.maxResults
    ? parseInt(req.query.maxResults as string)
    : 10;
  const searchQuery = req.query.searchQuery
    ? (req.query.searchQuery as string)
    : "";

  const notEnrolledOnly = req.query.notEnrolledOnly === "true" ? true : false;
  let filterQuery;
  const skip = (page - 1) * maxResults;
  const regex = new RegExp(searchQuery, "i");
  const arrayField = memberType === "student" ? "students" : "faculties";

  if (notEnrolledOnly) {
    filterQuery = { $not: { $in: ["$_id", "$$userIds"] } };
  } else {
    filterQuery = { $in: ["$_id", "$$userIds"] };
  }
  const aggregationPipeline = [
    {
      $match: {
        _id: new ObjectId(courseId), // Match specific course ID (optional)
      },
    },
    {
      $lookup: {
        from: "Users",
        let: {
          userIds: {
            $map: {
              input: "$" + arrayField,
              as: "userId",
              in: { $toObjectId: "$$userId" }, // Convert each string to ObjectId
            },
          },
        },
        pipeline: [
          {
            $match: {
              $expr: filterQuery,
              role: capitalizeFirstLetter(memberType),
              $or: [
                { name: regex },
                { email: regex },
                { phone: regex },
                { rollNumber: regex },
              ],
            },
          },
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $project: userProjection,
          },
        ],
        as: "users",
      },
    },

    {
      $unwind: "$users",
    },
    {
      $project: {
        _id: 0,
        users: 1,
      },
    },
  ];
  const db = (await clientPromise).db("enchanted-oasis");
  const coursesCollection = db.collection<CourseCol>("Courses");

  const members = await coursesCollection
    .aggregate(aggregationPipeline)
    .skip(skip)
    .limit(maxResults)
    .toArray();

  if (!members) {
    return res.status(404).send("Members not found");
  }
  let membersArr = [];
  for (let i = 0; i < members.length; i++) {
    membersArr.push(members[i].users);
  }

  return res.status(200).json(membersArr);
}
