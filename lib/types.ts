import { ObjectId } from "mongodb";
import { Session } from "next-auth";

export type Role = "Student" | "Faculty" | "Admin";
export type UserCol = {
  _id: ObjectId;
  name: string;
  role: Role;
  email: string;
  passwordHash: string;
  house: string;
  profilePicture: string;
  phone: string;
  rollNumber: string;

  courses: string[]; // array of course ids

  notifications: string[]; // array of notification ids
  notificationsCount: number; // number of notifications received by this user
  seenNotifications: string[]; // array of notification ids
  seenNotificationsCount: number; // number of notifications seen by this user
};

export type MySession = {
  user: {
    id: ObjectId;
    role: string;
    name: string;
    email: string;
    image: string;
  };
} | null;

export type ReceivedUserDataOnClient = Omit<
  UserCol,
  | "courses"
  | "notifications"
  | "seenNotifications"
  | "notificationsCount"
  | "seenNotificationsCount"
  | "passwordHash"
>;
export type SentUserDataFromClient = Omit<
  UserCol,
  | "courses"
  | "notifications"
  | "seenNotifications"
  | "notificationsCount"
  | "seenNotificationsCount"
  | "passwordHash"
  | "_id"
  | "profilePicture"
> & {
  password: string;
  profilePicture: File | null;
};

export type HouseCol = {
  _id: ObjectId;
  name: string;
  points: number;
};

export const userProjection = {
  _id: 1,
  name: 1,
  phone: 1,
  email: 1,
  house: 1,
  role: 1,
  profilePicture: 1,
  rollNumber: 1,
};
