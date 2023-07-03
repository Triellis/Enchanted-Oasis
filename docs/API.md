# Api Routes Details

## Results

### List Results

-   **URL:** `/api/result/list`
-   **Method:** `GET`
-   **Permissions:** `Faculty` | `Student`

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

#### Response will be status code

### Update Result

-   **URL:** `/api/result/{id}`
-   **Method:** `PUT`
-   **Permissions:** `Faculty`

#### Request body

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

```json
{
	"maxResults"?: "number", // pagination parameter default is 10
	"page"?: "number" // pagination parameter, default is 1
}
```

#### Response

```json

{
	"courses":Course[],
"totalCourses":number
}

```
