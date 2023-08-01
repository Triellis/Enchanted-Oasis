# Database Collections

## Admin Notifications

```typescript

{
	_id: ObjectId,
	title: string,
	body: string, // supports markdown
	date: Date,
	badgeText: string, // badge text
	badgeColor: string, // badge color
	seenBy: string[], // array of user ids,
	seenByCount: number, // number of users who ave seen this notification
	creatorId: string ,// id of the user who created this notification
	creatorName: string, // name of the user who created this notification
	audience : "Students"| "Faculty" | "Both" // audience of the notification
}
```

## Houses

```typescript

{
	_id: ObjectID,
	name: string,
	points: number

}
```

## Users

```typescript

{
	_id: ObjectID,
	name: string,
	role: "Student" | "Faculty" | "Admin",
	email: string,
	passwordHash: string,
	house: string,
	profilePicture: string,
	phone: string,
	rollNumber: string,

	courses: string[], // array of course ids

	notifications: {
		[notificationId: string]: {
			seen: boolean,

		}
	}, // array of notification ids

	unseenNotificationsCount: number // number of notifications not seen by this user
}
```

## Lectures

```typescript

{
	_id: ObjectID,
	courseId: string,
	startTime: Date,
	endTime: Date,
	attendance: string[], // array of student ids
	attendanceCount: number // number of students present
}
```

## Results

```typescript

{
	_id: ObjectID,
	studentId: string,
	courseId: string,
	date: Date,
	components: {
		[componentName: string]: {
			marks: number,
			weightage: string
		}
	},
	gradePoint: number,
	gradeLetter: string,
	semester: string
}
```

## Courses

```typescript

{
	_id: ObjectID,
	name: string,
	code: string,
	description:string,
	credits: number,
	schedule:{
		[day:string]:{
			startTime:Date,
			endTime:Date
		}
	}
	faculties: string[], // faculty ids
	students: string[], // array of student ids
	lectures: string[], // array of lecture ids

}
```

## Course Notifications

```typescript

{
	_id: ObjectID,
	courseId: string,
	title: string,
	body: string, // supports markdown
	date: Date,
	badgeText: string, // badge text
	badgeColor: string, // badge color
	attachment?: string, // attachment url
	creatorId:string

}
```
