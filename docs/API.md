# Index

-   [Api Routes Summary](#Api-Routes-Summary)
    -   [Results](#results)

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

## Houses

| Route Name     | Method | URL Pattern                         |
| -------------- | ------ | ----------------------------------- |
| Get Data       | GET    | `/api/house/info`                   |
| List Houses    | GET    | `/api/house/list`                   |
| Get Members    | GET    | `/api/house/{id}/listMembers`       |
| Add Member     | POST   | `/api/house/{id}/member`            |
| Remove Member  | DELETE | `/api/house/{id}/member/{memberId}` |
| Increase pts   | POST   | `/api/house/{id}/increase`          |
| Decrease pts   | POST   | `/api/house/{id}/decrease`          |
| Edit House     | PUT    | `/api/house/{id}`                   |
| Delete House   | DELETE | `/api/house/{id}`                   |
| ! Create house | POST   | `/api/house`                        |

## User

| Route Name     | Method | URL Pattern |
| -------------- | ------ | ----------- |
| Update Details | PUT    | `/api/user` |
| Delete User    | DELETE | `/api/user` |
| Get User       | GET    | `/api/user` |
| Create User    | POST   | `/api/user` |

## Course Notifications

| Route Name          | Method | URL Pattern                                                    |
| ------------------- | ------ | -------------------------------------------------------------- |
| List Notifications  | GET    | `/api/course/{id}/notification`                                |
| Add Notification    | POST   | `/api/course/{id}/notification`                                |
| Remove Notification | DELETE | `/api/course/{id}/notification/{notificationId}`               |
| Edit Notification   | PUT    | `/api/course/{id}/notification/{notificationId}`               |
| Get Notification    | GET    | `/api/course/{id}/notification/{notificationId}`               |
| Get Views           | GET    | `/api/course/{id}/notification/{notificationId}/views `        |
| Get Viewers         | GET    | `/api/course/{id}/notification/{notificationId}/listViewers  ` |

## Course Materials

| Route Name      | Method | URL Pattern                              |
| --------------- | ------ | ---------------------------------------- |
| List Materials  | GET    | `/api/course/{id}/Material`              |
| Add Material    | POST   | `/api/course/{id}/Material`              |
| Remove Material | DELETE | `/api/course/{id}/Material/{MaterialId}` |
| Edit Material   | PUT    | `/api/course/{id}/Material/{MaterialId}` |
| Get Material    | GET    | `/api/course/{id}/Material/{MaterialId}` |

## Admin Notifications

| Route Name          | Method | URL Pattern                                        |
| ------------------- | ------ | -------------------------------------------------- |
| List Notifications  | GET    | `/api/notification`                                |
| Add Notification    | POST   | `/api/notification`                                |
| Remove Notification | DELETE | `/api/notification/{notificationId}`               |
| Edit Notification   | PUT    | `/api/notification/{notificationId}`               |
| Get Notification    | GET    | `/api/notification/{notificationId}`               |
| Get Views           | GET    | `/api/notification/{notificationId}/views `        |
| Get Viewers         | GET    | `/api/notification/{notificationId}/listViewers  ` |

## Lectures

| Route Name        | Method | URL Pattern                                                 |
| ----------------- | ------ | ----------------------------------------------------------- |
| List Lectures     | GET    | `/api/course/{id}/lecture`                                  |
| Add Lecture       | POST   | `/api/course/{id}/lecture`                                  |
| Remove Lecture    | DELETE | `/api/course/{id}/lecture/{lecture}`                        |
| View Attendance   | GET    | `/api/course/{id}/lecture/{lecture}/attendance`             |
| Post Attendance   | POST   | `/api/course/{id}/lecture/{lecture}/attendance`             |
| View Lecture      | GET    | `/api/course/{id}/lecture/{lecture}`                        |
| Mark Attendance   | POST   | `/api/course/{id}/lecture/{lecture}/attendance/{studentId}` |
| Unmark Attendance | DELETE | `/api/course/{id}/lecture/{lecture}/attendance/{studentId}` |
