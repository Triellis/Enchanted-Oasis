# Api Routes Details

## Results

### List Results

-   **URL:** `/api/result/list`
-   **Method:** `GET`
-   **Permissions:** `Teacher` | `Student`

#### Query Parameters

```json
{
	"courseId"?: "string", // filter parameter for student
	"semester"?: "string", // filter parameter
	"maxResults"?: "number", // pagination parameter default is 10
	"page"?: "number" // pagination parameter, default is 1
}
```

#### Response

```json
Result[]


```

```typescript
type Result = {
	_id: ObjectID;
	studentId: string;
	courseId: string;
	date: Date;
	components: {
		[componentName: string]: {
			marks: number;
			weightage: string;
		};
	};
	gradePoint: number;
	gradeLetter: string;
	semester: string;
};
```

### List Result Courses

-   **URL:** `/api/result/courses`
-   **Method:** `GET`
-   **Permissions:** `Student`

#### Query Parameters

```json
{
	"semester"?: "string", // this is a filter parameter for faculty
	"maxResults"?: "number", // this is a pagination parameter default is 10
	"page"?: "number" // this is a pagination parameter, default is 1
}
```

#### Response

```json
{
	Course[],

}

```

```typescript
type Course = {
	_id: ObjectID;
	name: string;
	description: string;
	department: string;
	credits: number;
	schedule: {
		[day: string]: {
			startTime: Date;
			endTime: Date;
		};
	};
	faculty: string; // faculty id
	students: string[]; // array of student ids
	lectures: string[]; // array of lecture ids
	gradingScheme: {
		[gradeLetter: string]: {
			minMarks: number;
			maxMarks: number;
		};
	};
};
```
