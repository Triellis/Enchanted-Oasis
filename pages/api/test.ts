// Use the JS library to create a bucket.
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MySession } from "@/lib/types";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

import { IncomingForm } from "formidable";
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from "fs";
// Set up multer middleware

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
  //@ts-ignore
  const formData = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  // read file from the temporary path
  //@ts-ignore

  const contents = await fs.readFile(formData?.files.file[0].filepath, {
    encoding: "utf8",
  });
  // await fs.writeFile("profile pic3.jpg", contents);
  //@ts-ignore

  const file = await fs.open(formData?.files.file[0].filepath, "r");
  const fileData = await file.readFile();
  //   console.log(contents);
  //@ts-ignore
  console.log(formData?.files.file[0].filepath);
  const { data, error } = await supabase.storage
    .from("enchanted-oasis")
    //@ts-ignore
    .upload("profile pic2.jpg", fileData);
  if (error) {
    console.log(error);
  }
  res.status(200).json("k");
}
export const config = {
  api: {
    bodyParser: false,
  },
};
