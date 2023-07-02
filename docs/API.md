# Api Routes Summary

## Results

| Route Name    | Method | URL Pattern        |
| ------------- | ------ | ------------------ |
| List Results  | GET    | `/api/result/list` |
| Get Result    | GET    | `/api/result/{id}` |
| Post Result   | POST   | `/api/result`      |
| Put Result    | PUT    | `/api/result/{id}` |
| Delete Result | DELETE | `/api/result/{id}` |

## Courses

| Route Name     | Method | URL Pattern                            |
| -------------- | ------ | -------------------------------------- |
| List Courses   | GET    | `/api/course/list`                     |
| Add Course     | POST   | `/api/course`                          |
| Get Course     | GET    | `/api/course/{id}`                     |
| Update Course  | PUT    | `/api/course/{id}`                     |
| Remove Course  | Delete | `/api/course/{id}`                     |
| Add Student    | POST   | `/api/course/{id}/student`             |
| Remove Student | DELETE | `/api/course/{id}/student/{studentId}` |
| list students  | GET    | `/api/course/{id}/student/list`        |
| Enroll Student | POST   | `/api/course/{id}/enroll`              |
| Drop Student   | POST   | `/api/course/{id}/drop`                |
