// Use the JS library to create a bucket.
import { NextApiRequest, NextApiResponse } from "next";
import { MySession } from "@/lib/types";

import { IncomingForm } from "formidable";
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from "fs";
import { supabase } from "@/lib/supabase";
// Set up multer middleware

// Create the API route handler using next-connect

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

  // await fs.writeFile("profile pic3.jpg", contents);

  //@ts-ignore
  const file = await fs.open(formData?.files.pic[0].filepath, "r");
  const fileData = await file.readFile();
  file.close();
  //@ts-ignore
  console.table(formData);

  res.status(200).json("t");
}
export const config = {
  api: {
    bodyParser: false,
  },
};
