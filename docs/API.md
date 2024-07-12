# Index

- [Api Routes Summary](#api-routes-summary)
  - [Results](#results) **(Cancelled)**
  - [Courses](#courses)
  - [Houses](#houses)
  - [User](#user)
  - [Course Notifications](#course-notifications)
  - [Course Materials](#course-materials) **(Cancelled)**
  - [Admin Notifications](#admin-notifications)
  - [Lectures](#lectures) **(Cancelled)**

# Api Routes Details

## Results

### List Results

- **URL:** `/api/result/list`
- **Method:** `GET`
- **Permissions:** `Faculty` | `Student`

#### Query Parameters

```typescript
{
	"courseId"?: string, // filter parameter for student
	"semester"?: string, // filter parameter
	"maxResults"?: number, // pagination parameter default is 10
	"page"?: number // pagination parameter, default is 1
}
```

#### Response

```typescript

{
	"results":Result[],
	"totalResults":number
}


```

```typescript
type Result = {
  courseId: string;
  gradePoint: number;
  gradeLetter: string;
  semester: string;
};
```

### Get Result

- **URL:** `/api/result/{id}`
- **Method:** `GET`
- **Permissions:** `Student` | `Faculty`

#### Response

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

### Post Result

- **URL:** `/api/result`
- **Method:** `POST`
- **Permissions:** `Faculty`

#### Request body

```typescript

{

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

#### Response will be status code

### Update Result

- **URL:** `/api/result/{id}`
- **Method:** `PUT`
- **Permissions:** `Faculty`

#### Request body

```typescript

{

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

#### Response will be status code

### Delete Result

- **URL:** `/api/result/{id}`
- **Method:** `DELETE`
- **Permissions:** `Faculty`

#### Response will be status code

## Courses

### List Courses

- **URL:** `/api/course/list`
- **Method:** `GET`
- **Permissions:** `Admin` | `Student`

#### Query Parameters

```typescript
{
	"maxResults"?: number, // pagination parameter default is 10
	"page"?: number // pagination parameter, default is 1
	"type"?: "All" | "Enrolled" | "notEnrolled" | "Teaching" // filter parameter for student
}
```

#### Response

```typescript

{
	"courses":Course[],
	"totalCourses":number
}

```

### Add Course

- **URL:** `/api/course`
- **Method:** `POST`
- **Permissions:** `Admin`

#### Request body

```typescript


{
	name: string,
	description:string,
	credits: number,
	schedule:{
		[day:string]:{
			startTime:Date,
			endTime:Date
		}[]
	}
}
```

#### Response will be status code

### Get Course

- **URL:** `/api/course/{id}`
- **Method:** `GET`
- **Permissions:** `Admin` | `Student` | `Faculty`

#### Response

```typescript

{
	_id: ObjectID,
	name: string,
	description:string,
	credits: number,
	schedule:{
		[day:string]:{
			startTime:Date,
			endTime:Date
		}
	}
	faculties: string[], // faculty id
	students: string[], // array of student ids
	lectures: string[], // array of lecture ids
	gradingScheme: {
		[gradeLetter: string]: {
			minMarks: number,
			maxMarks: number
		}

	},
}
```

### Update Course

- **URL:** `/api/course/{id}`
- **Method:** `PUT`
- **Permissions:** `Admin`

#### Request body

`same as add course`

#### Response will be status code

### Remove Course

- **URL:** `/api/course/{id}`
- **Method:** `DELETE`
- **Permissions:** `Admin`

#### Response will be status code

### List Members

- **URL:** `/api/course/{id}/member`
- **Method:** `GET`
- **Permissions:** `Admin` | `Student`

#### Query Parameters

```typescript
{
	"maxResults"?: number, // pagination parameter default is 10
	"page"?: number, // pagination parameter, default is 1
	"notEnrolledOnly"?: boolean // filter parameter for student
	"memberType": "Student" | "Faculty"

}
```

#### Response

```typescript

{
	"students":Student[],
	"totalStudents":number
}

```

```typescript
type Student = {
  _id: ObjectID;
  name: string;
  email: string;
  rollNo: string;
};
```

### Add Members

- **URL:** `/api/course/{id}/member`
- **Method:** `POST`
- **Permissions:** `Admin`

#### Query Parameters

```typescript
{
	"memberType": "Student" | "Faculty"
}
```

#### Request body

```typescript
{
  studentIds: string[];
}
```

#### Response will be status code

### Remove Member

- **URL:** `/api/course/{id}/member/{memberId}`
- **Method:** `DELETE`
- **Permissions:** `Admin`

#### Query Parameters

```typescript
{
	"memberType": "Student" | "Faculty"
}
```

#### Response will be status code

### Enroll self

- **URL:** `/api/course/{id}/enroll`
- **Method:** `POST`
- **Permissions:** `Student`

#### Response will be status code

### Unenroll self

- **URL:** `/api/course/{id}/unenroll`
- **Method:** `DELETE`
- **Permissions:** `Student`

#### Response will be status code

## Houses

### Get House

- **URL:** `/api/house/{id}`
- **Method:** `GET`
- **Permissions:** `Admin` | `Faculty` | `Student`

#### Response

```typescript
{
  _id: ObjectID;
  name: string;
  points: number;
}
```

### list Houses

- **URL:** `/api/house/list`
- **Method:** `GET`
- **Permissions:** `Admin` | `Faculty` | `Student`

#### Response

```typescript

{
	"houses":House[],

}

```

```typescript
type House = {
  _id: ObjectID;
  name: string;
  points: number;
};
```

### See my house data

- **URL:** `/api/house/my`
- **Method:** `GET`
- **Permissions:** `Student`

#### Response

```typescript
{
  _id: ObjectID;
  name: string;
  points: number;
}
```

### Search members

- **URL:** `/api/house/{id}/searchMembers`
- **Method:** `GET`
- **Permissions:** `Admin` | `Faculty`

#### Query Parameters

```typescript
{
	"maxResults"?: number, // pagination parameter default is 10
	"page"?: number // pagination parameter, default is 1
	"searchQuery"?: string // search query
}
```

#### Response

```typescript

{
	"students":Student[],
	"totalStudents":number
}

```

```typescript
type Student = {
  _id: ObjectID;
  name: string;
  email: string;
  rollNo: string;
};
```

### ~~Add member~~

- **URL:** `/api/house/{id}/member`
- **Method:** `POST`
- **Permissions:** `Admin`

#### Request body

```typescript
{
  memberId: string;
}
```

#### Response will be status code

### ~~Remove member~~

- **URL:** `/api/house/{id}/member/{memberId}`
- **Method:** `DELETE`
- **Permissions:** `Admin`

#### Response will be status code

### Increase points

- **URL:** `/api/house/{id}/increase`
- **Method:** `POST`
- **Permissions:** `Admin`

#### Request body

```typescript
{
  points: number;
}
```

#### Response will be status code

### Decrease points

- **URL:** `/api/house/{id}/decrease`
- **Method:** `POST`
- **Permissions:** `Admin`

#### Request body

```typescript
{
  points: number;
}
```

#### Response will be status code

### Edit House

- **URL:** `/api/house/{id}`
- **Method:** `PUT`
- **Permissions:** `Admin`

#### Request body

```typescript
{
  name: string;
}
```

#### Response will be status code

### Create House

- **URL:** `/api/house`
- **Method:** `POST`
- **Permissions:** `Admin`

#### Request body

```typescript
{
  name: string;
}
```

#### Response will be status code

### Delete House

- **URL:** `/api/house/{id}`
- **Method:** `DELETE`
- **Permissions:** `Admin`

#### Response will be status code

## User

### Get User

- **URL:** `/api/user`
- **Method:** `GET`
- **Permissions:** `Admin` | `Student` | `Faculty`

#### Response

```typescript
{
	name: string,
	role: "Student" | "Faculty" | "Admin",
	email: string,
	house: string,
	profilePicture: string,
	phone: string,
	rollNumber: string,


}
```

### Update User

- **URL:** `/api/user`
- **Method:** `PUT`
- **Permissions:** `Admin` | `Student` | `Faculty`

#### Request body

```typescript
{
	name?: string,
	profilePicture: string,
	phone: string,
	userId?: string,


}
```

#### Response will be status code

### Update Password

- **URL:** `/api/user/password`
- **Method:** `PUT`
- **Permissions:** `Admin` | `Student` | `Faculty`

#### Request body

```typescript
{
	oldPassword: string,
	newPassword: string,
}
```

#### Response will be status code

### Delete User

- **URL:** `/api/user`
- **Method:** `DELETE`
- **Permissions:** `Admin`

#### Query Parameters

```typescript
{
	"userId": string
}
```

#### Response will be status code

### Create User

- **URL:** `/api/user`
- **Method:** `POST`
- **Permissions:** `Admin`

#### Request body

```typescript
{
	name: string,
	role: "Student" | "Faculty" | "Admin",
	email: string,
	house: string,
	profilePicture: string,
	phone: string,
	rollNumber: string,
	password: string,
}
```

#### Response will be status code

### Search Users

- **URL:** `/api/allUser/search`
- **Method:** `GET`
- **Permissions:** `Admin`

#### Query Parameters

```typescript
{
	"maxResults"?: number, // pagination parameter default is 10
	"page"?: number // pagination parameter, default is 1
	"searchQuery"?: string // search parameter
	"role"?: "Student" | "Faculty" | "Admin" | "All"// filter by role
}
```

#### Response

```typescript


	User[]


```

```typescript
type User = {
  _id: ObjectID;
  name: string;
  email: string;
  role: "Student" | "Faculty" | "Admin";
  house: string;
  profilePicture: string;
  phone: string;
  rollNumber: string;
};
```

## Course notifications

### List notifications

- **URL:** `/api/course/{id}/notifications`
- **Method:** `GET`
- **Permissions:** `Student` | `Faculty`

#### Query Parameters

```typescript
{
	"maxResults"?: number, // pagination parameter default is 10
	"page"?: number // pagination parameter, default is 1
}
```

#### Response

```typescript

{
	"notifications":Notification[],
	"totalNotifications":number
}

```

```typescript
type Notification = {
  _id: ObjectID;
  courseId: string;
  title: string;
  body: string; // supports markdown
  date: Date;
  badgeText: string; // badge text
  badgeColor: string; // badge color
  creatorId: string; // id of the faculty who created this notification
  creatorName: string; // name of the user who created this notification
};
```

### Create notification

- **URL:** `/api/course/{id}/notifications`
- **Method:** `POST`
- **Permissions:** `Faculty`

#### Request body

```typescript
{
  title: string;
  body: string; // supports markdown
  badgeText: string; // badge text
  badgeColor: string; // badge color
  attachment?: string; // attachment url
}
```

#### Response will be status code

### Delete notification

- **URL:** `/api/course/{id}/notifications/{notificationId}`
- **Method:** `DELETE`
- **Permissions:** `Faculty`

#### Response will be status code

### Get notification ( it will mark notification as seen )

- **URL:** `/api/course/{id}/notifications/{notificationId}`
- **Method:** `GET`
- **Permissions:** `Student` | `Faculty`

#### Response

```typescript
type Notification = {
  _id: ObjectID;
  courseId: string;
  title: string;
  body: string; // supports markdown
  date: Date;
  badgeText: string; // badge text
  badgeColor: string; // badge color
  creatorId: string; // id of the faculty who created this notification
};
```

## Admin notifications

### List notifications

- **URL:** `/api/notification`
- **Method:** `GET`
- **Permissions:** `Admin` | `Faculty` | `Student`

#### Query Parameters

```typescript
{
	"maxResults"?: number, // pagination parameter default is 10
	"page"?: number // pagination parameter, default is 1
	"unreadOnly":boolean // show unread only if true
}
```

#### Response

```typescript

{
	"notifications":Notification[],

}

```

```typescript
type Notification = {
  _id: ObjectID;
  courseId: string;
  title: string;
  body: string; // supports markdown
  date: Date;
  badgeText: string; // badge text
  badgeColor: string; // badge color
  creator: User;
  unseen: boolean; // true if the notification is unseen by the user
};
```

### Create notification

- **URL:** `/api/notification`
- **Method:** `POST`
- **Permissions:** `Admin`

#### Request body

```typescript
{
  title: string;
  body: string; // supports markdown
  badgeText: string; // badge text
  badgeColor: string; // badge color in hex code (eg: #ffffff)
  audience: "All" | "Faculty" | "Student";
}
```

#### Response will be status code

### Delete notification

- **URL:** `/api/notification/{notificationId}`
- **Method:** `DELETE`
- **Permissions:** `Admin`

#### Response will be status code

### ~~Update notification~~

- **URL:** `/api/notification/{notificationId}`
- **Method:** `PUT`
- **Permissions:** `Admin`

#### Request body

```typescript
{
  title: string;
  body: string; // supports markdown
  badgeText: string; // badge text
  badgeColor: string; // badge color
  audience: "All" | "Faculty" | "Student";
}
```

#### Response will be status code

### Get notification ( it will mark notification as seen )

- **URL:** `/api/notification/{notificationId}`
- **Method:** `GET`
- **Permissions:** `Admin` | `Faculty` | `Student`

#### Response

```typescript
type Notification = {
  _id: ObjectID;
  courseId: string;
  title: string;
  body: string; // supports markdown
  date: Date;
  badgeText: string; // badge text
  badgeColor: string; // badge color
  creator: User; // id of the faculty who created this notification
  creatorName: string; // name of the user who created this notification
};
```

### Get Views

- **URL:** `/api/notification/{notificationId}/views`
- **Method:** `GET`
- **Permissions:** `Admin`

#### Response

```typescript
{

	"seenByCount":number
}
```

### Get Viewers

- **URL:** `/api/notification/{notificationId}/listViewers`
- **Method:** `GET`
- **Permissions:** `Admin`

#### Query Parameters

```typescript
{
	"maxResults"?: number, // pagination parameter default is 10
	"page"?: number // pagination parameter, default is 1
}
```

#### Response

```typescript
{

	"viewers":User[],
	"totalViewers":number
}
```

```typescript
type User = {
  _id: ObjectID;
  name: string;
  email: string;
  role: "Student" | "Faculty" | "Admin";
  profilePicture: string;
};
```

### get number of unseen notifications

- **URL:** `/api/notification/unseen`
- **Method:** `GET`
- **Permissions:** `Admin` | `Faculty` | `Student`

#### Response

```typescript

{
	"unseenNotificationsCount":number
}

```

### mark notification as seen

- **URL:** `/api/notification/{notificationId}/seen`
- **Method:** `PATCH`
- **Permissions:** `Admin` | `Faculty` | `Student`

#### Response will be status code

## Lectures

### Get upcoming lectures

- **URL:** `/api/course/{id}/lecture/upcoming`
- **Method:** `GET`
- **Permissions:** `Student` | `Faculty`

#### Response

```typescript
type Lecture = {
  courseId: string;
  startTime: Date;
  endTime: Date;
};
```

### Add lecture

- **URL:** `/api/course/{id}/lecture`
- **Method:** `POST`

#### Request body

```typescript
{
  startTime: Date;
  endTime: Date;
}
```

#### Response will be status code

## List lectures

- **URL:** `/api/course/{id}/lecture`
- **Method:** `GET`
- **Permissions:** `Student` | `Faculty`

#### Query Parameters

```typescript
{
	"maxResults"?: number, // pagination parameter default is 10
	"page"?: number // pagination parameter, default is 1
}
```

#### Response

```typescript
{
	"lectures":Lecture[],
	"totalLectures":number
}
```

```typescript
type Lecture = {
  _id: ObjectID;
  courseId: string;
  startTime: Date;
  endTime: Date;
};
```

### Delete lecture

- **URL:** `/api/course/{id}/lecture/{lectureId}`
- **Method:** `DELETE`
- **Permissions:** `Faculty`

#### Response will be status code

### View Attendance

- **URL:** `/api/course/{id}/lecture/{lectureId}/attendance`
- **Method:** `GET`
- **Permissions:** `Faculty`

#### Response

```typescript
{
	"attendance":studentIds[],
	"totalAttendance":number
}
```

### Post Attendance

- **URL:** `/api/course/{id}/lecture/{lectureId}/attendance`
- **Method:** `POST`
- **Permissions:** `Faculty`

#### Request body

```typescript
{
	"studentIds":string[]
}
```

### View Lecture

- **URL:** `/api/course/{id}/lecture/{lectureId}`
- **Method:** `GET`
- **Permissions:** `Faculty`

#### Response

```typescript

{
	"lecture":Lecture
}

```

```typescript
type Lecture = {
  _id: ObjectID;
  courseId: string;
  startTime: Date;
  endTime: Date;
  attendance: string[]; // array of student ids
  attendanceCount: number; // number of students present
};
```

### Mark attendance

- **URL:** `/api/course/{id}/lecture/{lectureId}/attendance`
- **Method:** `POST`
- **Permissions:** `Faculty`

#### Query parameters

```typescript
{
	"studentId":string
}
```

#### Response will be status code

### Unmark attendance

- **URL:** `/api/course/{id}/lecture/{lectureId}/attendance`
- **Method:** `DELETE`
- **Permissions:** `Faculty`

#### Query parameters

```typescript
{
	"studentId":string
}
```

### Get attendance summary

- **URL:** `/api/attendanceSummary`
- **Method:** `GET`
- **Permissions:** `Student`

#### Response

```typescript
{
	"attendanceSummary":AttendanceSummary[]
}
```

```typescript
type AttendanceSummary = {
  courseId: string;
  attendance: number;
  totalLectures: number;
};
```
