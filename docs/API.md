# Api Routes Details

## Results

### List Results

-   **URL:** `/api/result/list`
-   **Method:** `GET`
-   **Permissions:** `Faculty` | `Student`

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

-   **URL:** `/api/result/{id}`
-   **Method:** `GET`
-   **Permissions:** `Student` | `Faculty`

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

-   **URL:** `/api/result`
-   **Method:** `POST`
-   **Permissions:** `Faculty`

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

-   **URL:** `/api/result/{id}`
-   **Method:** `PUT`
-   **Permissions:** `Faculty`

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

-   **URL:** `/api/result/{id}`
-   **Method:** `DELETE`
-   **Permissions:** `Faculty`

#### Response will be status code

## Courses

### List Courses

-   **URL:** `/api/course/list`
-   **Method:** `GET`
-   **Permissions:** `Admin` | `Student`

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
	"courses":Course[],
	"totalCourses":number
}

```

### Add Course

-   **URL:** `/api/course`
-   **Method:** `POST`
-   **Permissions:** `Admin`

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
		}
	}
	faculties: string[], // faculty id
	gradingScheme: {
		[gradeLetter: string]: {
			minMarks: number,
			maxMarks: number
		}

	},
}
```

#### Response will be status code

### Get Course

-   **URL:** `/api/course/{id}`
-   **Method:** `GET`
-   **Permissions:** `Admin` | `Student`

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

-   **URL:** `/api/course/{id}`
-   **Method:** `PUT`
-   **Permissions:** `Admin`

#### Request body

`same as add course`

#### Response will be status code

### Remove Course

-   **URL:** `/api/course/{id}`
-   **Method:** `DELETE`
-   **Permissions:** `Admin`

#### Response will be status code

### List Students

-   **URL:** `/api/course/{id}/student/list`
-   **Method:** `GET`
-   **Permissions:** `Admin` | `Student`

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

### Add Student

-   **URL:** `/api/course/{id}/student`
-   **Method:** `POST`
-   **Permissions:** `Admin`

#### Request body

```typescript
{
	studentId: string;
}
```

#### Response will be status code

### Remove Student

-   **URL:** `/api/course/{id}/student/{studentId}`
-   **Method:** `DELETE`
-   **Permissions:** `Admin`

#### Response will be status code

### List Faculties

-   **URL:** `/api/course/{id}/faculty/list`
-   **Method:** `GET`
-   **Permissions:** `Admin` | `Student` | `Faculty`

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
	"students":Faculty[],
	"totalStudents":number
}

```

```typescript
type Faculty = {
	_id: ObjectID;
	name: string;
	email: string;
};
```

### Add Faculty

-   **URL:** `/api/course/{id}/faculty`
-   **Method:** `POST`
-   **Permissions:** `Admin`

#### Request body

```typescript
{
	facultyId: string;
}
```

#### Response will be status code

### Remove Faculty

-   **URL:** `/api/course/{id}/faculty/{facultyId}`
-   **Method:** `DELETE`
-   **Permissions:** `Admin`

#### Response will be status code

### Enroll self

-   **URL:** `/api/course/{id}/enroll`
-   **Method:** `POST`
-   **Permissions:** `Student`

#### Response will be status code

### Unenroll self

-   **URL:** `/api/course/{id}/unenroll`
-   **Method:** `POST1
-   **Permissions:** `Student`

#### Response will be status code

### Get Grading Scheme

-   **URL:** `/api/course/{id}/gradingScheme`
-   **Method:** `GET`
-   **Permissions:** `Student` | `Faculty`

#### Response

```typescript
{
	[gradeLetter: string]: {
		minMarks: number,
		maxMarks: number
	}
}
```

### Update Grading Scheme

-   **URL:** `/api/course/{id}/gradingScheme`
-   **Method:** `PUT`
-   **Permissions:** `Faculty`

#### Request body

```typescript
{
	[gradeLetter: string]: {
		minMarks: number,
		maxMarks: number
	}
}
```

### Post Grading Scheme

-   **URL:** `/api/course/{id}/gradingScheme`
-   **Method:** `POST`
-   **Permissions:** `Faculty`

#### Request body

```typescript
{
	[gradeLetter: string]: {
		minMarks: number,
		maxMarks: number
	}
}
```

#### Response will be status code

### Delete Grading Scheme

-   **URL:** `/api/course/{id}/gradingScheme`
-   **Method:** `DELETE`
-   **Permissions:** `Faculty`

#### Response will be status code

## Houses

### List Houses

-   **URL:** `/api/house/list`
-   **Method:** `GET`
-   **Permissions:** `Admin` | `Faculty`

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
	"houses":House[],
	"totalHouses":number
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

-   **URL:** `/api/house/my`
-   **Method:** `GET`
-   **Permissions:** `Student`

#### Response

```typescript
{
	_id: ObjectID;
	name: string;
	points: number;
}
```

### List members

-   **URL:** `/api/house/{id}/listMembers`
-   **Method:** `GET`
-   **Permissions:** `Admin` | `Faculty`

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

### Add member

-   **URL:** `/api/house/{id}/member`
-   **Method:** `POST`
-   **Permissions:** `Admin`

#### Request body

```typescript
{
	memberId: string;
}
```

#### Response will be status code

### Remove member

-   **URL:** `/api/house/{id}/member/{memberId}`
-   **Method:** `DELETE`
-   **Permissions:** `Admin`

#### Response will be status code

### Add points

-   **URL:** `/api/house/{id}/increase`
-   **Method:** `POST`
-   **Permissions:** `Admin`

#### Request body

```typescript
{
	points: number;
}
```

#### Response will be status code

### Remove points

-   **URL:** `/api/house/{id}/decrease`
-   **Method:** `POST`
-   **Permissions:** `Admin`

#### Request body

```typescript
{
	points: number;
}
```

#### Response will be status code

### Edit House

-   **URL:** `/api/house/{id}`
-   **Method:** `PUT`
-   **Permissions:** `Admin`

#### Request body

```typescript
{
	name: string;
}
```

#### Response will be status code

### Create House

-   **URL:** `/api/house`
-   **Method:** `POST`
-   **Permissions:** `Admin`

#### Request body

```typescript
{
	name: string;
	members: string[];

}
```

#### Response will be status code

### Delete House

-   **URL:** `/api/house/{id}`
-   **Method:** `DELETE`
-   **Permissions:** `Admin`

#### Response will be status code
