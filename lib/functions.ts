import { Collection, MongoClient } from "mongodb";
import { Role, SentUserDataFromClient, UserCol } from "./types";
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
export async function editUser(
  newUserData: SentUserDataFromClient & { _id: string }
) {
  const formData = new FormData();

  //allowed entries are name, profile picture, phone and password only:
  const allowedEntries = [
    "name",
    "phone",
    "password",
    "profilePicture",
    "userId",
    "oldPicture",
  ];

  // the key should only consider those entries which are not empty and allowed

  for (let key in newUserData) {
    if (
      allowedEntries.includes(key) &&
      newUserData[key as keyof SentUserDataFromClient]
    ) {
      // @ts-ignore
      formData.append(key, newUserData[key]);
    }
  }
  if (!formData.get("profilePicture")) {
    formData.delete("oldPicture");
  }
  if (newUserData.hasOwnProperty("_id")) {
    formData.append("userId", newUserData._id);
  }

  const res = await fetch("/api/user", {
    method: "PUT",
    body: formData,
  });

  return res;
}
