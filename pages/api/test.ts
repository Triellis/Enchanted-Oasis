// Use the JS library to create a bucket.
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MySession } from "@/lib/types";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
import multer from "multer";

// Set up multer middleware
const upload = multer({ dest: "uploads/" }); // Set the destination folder to store uploaded files

// Create the API route handler using next-connect

if (!SUPABASE_URL) {
  throw new Error("Missing env.SUPABASE_URL");
}
if (!SUPABASE_ANON_KEY) {
  throw new Error("Missing env.SUPABASE_ANON_KEY");
}
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const session = await getServerSession(req, res, authOptions);

  //   if (!session) {
  //     return res.status(403).send("Not logged in");
  //   }
  if (req.method === "POST") {
    return POST(req, res);
  } else {
    res.status(405).send("Method not allowed");
  }
}

async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  session?: MySession
) {
  await upload.single("file")(req, res);
  //@ts-ignore

  const file = req.file;
  const { data, error } = await supabase.storage
    .from("enchanted-oasis")
    .upload("profile pics", file);
  if (error) {
    console.log(error);
  }
  res.status(200).json({ data, error });
}
