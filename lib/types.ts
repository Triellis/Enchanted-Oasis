import { ObjectId } from "mongodb";

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
