import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
import { promises as fs } from "fs";
if (!SUPABASE_URL) {
  throw new Error("Missing env.SUPABASE_URL");
}
if (!SUPABASE_ANON_KEY) {
  throw new Error("Missing env.SUPABASE_ANON_KEY");
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getFileUrl(
  filepath: any,
  bucketFolder: string,
  originalFilename: string
): Promise<string> {
  const file = await fs.open(filepath, "r");
  const fileData = await file.readFile();

  //   console.log(formData.files.file[0].originalFilename);
  //   //@ts-ignore
  //   console.log(formData?.files.file[0].filepath);
  const { data: uploadData, error } = await supabase.storage
    .from("enchanted-oasis")
    .upload(bucketFolder + "/" + originalFilename, fileData);
  if (error) {
    console.log(error);
  }

  const { data } = await supabase.storage
    .from("enchanted-oasis")
    .getPublicUrl(uploadData!.path);
  return data.publicUrl;
}
