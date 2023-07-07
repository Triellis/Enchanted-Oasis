import { ObjectId } from "mongodb";
import { Session } from "next-auth";
export type UserCol = {
  _id: ObjectId;
  name: string;
  role: "Student" | "Faculty" | "Admin";
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

export type UserDataOnClient = Exclude<
  UserCol,
  | "courses"
  | "notifications"
  | "seenNotifications"
  | "notificationsCount"
  | "seenNotificationsCount"
  | "passwordHash"
>;
