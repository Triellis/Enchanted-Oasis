import { Collection, MongoClient } from "mongodb";
import { Role, UserCol } from "./types";
import md5 from "md5";

export async function validateLogin(
  email: string,
  password: string,
  usersCollection: Collection<UserCol>
) {
  const user = await usersCollection.findOne({ email: email });

  const passwordHash = md5(password);

  if (!user) {
    return null;
  }
  if (user.passwordHash !== passwordHash) {
    return null;
  }

  return {
    email: user.email,
    name: user.name,

    image: user.profilePicture,
  };
}

export async function getRoleAndId(
  email: string,
  usersCollection: Collection<UserCol>
) {
  const user = await usersCollection.findOne({ email: email });

  const role = user?.role;
  const id = user?._id;

  return { role, id };
}

export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function getRoleColor(role: Role) {
  let roleColor = "gray";
  if (role === "Student") {
    roleColor = "blue";
  } else if (role === "Admin") {
    roleColor = "red";
  } else if (role === "Faculty") {
    roleColor = "green";
  }
  return roleColor;
}
