import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
import sharp from "sharp";
import { promises as fs } from "fs";
if (!SUPABASE_URL) {
  throw new Error("Missing env.SUPABASE_URL");
}
if (!SUPABASE_ANON_KEY) {
  throw new Error("Missing env.SUPABASE_ANON_KEY");
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const bucketName = "enchanted-oasis";
export async function getFileUrl(
  filepath: any,
  bucketFolder: string,
  originalFilename: string
): Promise<string> {
  const compressedFile = sharp(filepath).resize(1280);
  const compressedFilePath = filepath + "-compressed";
  await compressedFile.toFile(compressedFilePath);
  filepath = compressedFilePath;
  console.log(filepath);
  const file = await fs.open(filepath, "r");
  const fileData = await file.readFile();
  originalFilename = originalFilename.replace(/ /g, "_");

  const { data: uploadData, error } = await supabase.storage
    .from(bucketName)
    .upload(bucketFolder + "/" + originalFilename, fileData);
  if (error) {
    throw error;
  }

  const { data } = await supabase.storage
    .from("enchanted-oasis")
    .getPublicUrl(uploadData!.path);
  file.close();
  return data.publicUrl;
}

export async function deleteFile(fileUrl: string) {
  // Extract the filename from the image URL
  const fileUrlArr = fileUrl.split("/");

  const bucketNameIndex = fileUrlArr.indexOf(bucketName) + 1;
  const fileName = decodeURI(fileUrlArr.slice(bucketNameIndex).join("/"));

  // Delete the file from Supabase storage
  const { error } = await supabase.storage.from(bucketName).remove([fileName]);

  if (error) {
    return 500;
  } else {
    return 200;
  }
}
