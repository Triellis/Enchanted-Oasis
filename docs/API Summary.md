# Index

- [Index](#index)
- [Api Routes Summary](#api-routes-summary)
  - [Results](#results)
  - [Courses](#courses)
  - [Houses](#houses)
  - [User](#user)
  - [Course Notifications](#course-notifications)
  - [Admin Notifications](#admin-notifications)
  - [Lectures](#lectures)

> **Note:** `Lectures` and `Results` routes were cancelled due to time constraints.

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

| Route Name                | Method | URL Pattern                          |
| ------------------------- | ------ | ------------------------------------ |
| List Courses              | GET    | `/api/course/list`                   |
| Add Course                | POST   | `/api/course`                        |
| Get Course                | GET    | `/api/course/{id}`                   |
| Update Course             | PUT    | `/api/course/{id}`                   |
| Remove Course             | Delete | `/api/course/{id}`                   |
| Add Member                | POST   | `/api/course/{id}/member`            |
| Remove Member             | DELETE | `/api/course/{id}/member/{memberId}` |
| list Member               | GET    | `/api/course/{id}/member/member`     |
| Enroll Self               | POST   | `/api/course/{id}/enroll`            |
| UnEnroll Self             | DELETE | `/api/course/{id}/unEnroll`          |
| ~~Read Grading Scheme~~   | GET    | `/api/course/{id}/gradingScheme`     |
| ~~Update Grading Scheme~~ | PUT    | `/api/course/{id}/gradingScheme`     |
| ~~Create Grading Scheme~~ | POST   | `/api/course/{id}/gradingScheme`     |
| ~~Delete Grading Scheme~~ | DELETE | `/api/course/{id}/gradingScheme`     |

## Houses

| Route Name        | Method | URL Pattern                         |
| ----------------- | ------ | ----------------------------------- |
| See My House Data | GET    | `/api/house/my`                     |
| List Houses       | GET    | `/api/house/list`                   |
| Search Members    | GET    | `/api/house/{id}/searchMembers`     |
| ~~Add Member~~    | POST   | `/api/house/{id}/member`            |
| ~~Remove Member~~ | DELETE | `/api/house/{id}/member/{memberId}` |
| Increase pts      | POST   | `/api/house/{id}/increase`          |
| Decrease pts      | POST   | `/api/house/{id}/decrease`          |
| Edit House        | PUT    | `/api/house/{id}`                   |
| Delete House      | DELETE | `/api/house/{id}`                   |
| Create house      | POST   | `/api/house`                        |
| Get House         | GET    | `/api/house/{id}`                   |

## User

| Route Name      | Method | URL Pattern           |
| --------------- | ------ | --------------------- |
| Update Details  | PUT    | `/api/user`           |
| Delete User     | DELETE | `/api/user`           |
| Get User        | GET    | `/api/user`           |
| Create User     | POST   | `/api/user`           |
| Update password | PUT    | `/api/user/password`  |
| Search Users    | GET    | `/api/allUser/search` |

## Course Notifications

| Route Name          | Method | URL Pattern                                      |
| ------------------- | ------ | ------------------------------------------------ |
| List Notifications  | GET    | `/api/course/{id}/notification`                  |
| Add Notification    | POST   | `/api/course/{id}/notification`                  |
| Remove Notification | DELETE | `/api/course/{id}/notification/{notificationId}` |
| Get Notification    | GET    | `/api/course/{id}/notification/{notificationId}` |

## Admin Notifications

| Route Name                         | Method | URL Pattern                                        |
| ---------------------------------- | ------ | -------------------------------------------------- |
| List Notifications                 | GET    | `/api/notification`                                |
| Add Notification                   | POST   | `/api/notification`                                |
| Remove Notification                | DELETE | `/api/notification/{notificationId}`               |
| ~~Edit Notification~~              | PUT    | `/api/notification/{notificationId}`               |
| Get Notification                   | GET    | `/api/notification/{notificationId}`               |
| Get Views                          | GET    | `/api/notification/{notificationId}/views `        |
| Get Viewers                        | GET    | `/api/notification/{notificationId}/listViewers  ` |
| Get Number of unseen notifications | GET    | `/api/notification/unseen`                         |
| mark as seen                       | PATCH  | `/api/notification/{notificationId}/seen`          |

## Lectures

| Route Name             | Method | URL Pattern                                                 |
| ---------------------- | ------ | ----------------------------------------------------------- |
| Get Up coming Lectures | GET    | `/api/course/{id}/lecture/upcoming`                         |
| List Lectures          | GET    | `/api/course/{id}/lecture`                                  |
| Add Lecture            | POST   | `/api/course/{id}/lecture`                                  |
| Remove Lecture         | DELETE | `/api/course/{id}/lecture/{lecture}`                        |
| View Attendance        | GET    | `/api/course/{id}/lecture/{lecture}/attendance`             |
| Post Attendance        | POST   | `/api/course/{id}/lecture/{lecture}/attendance`             |
| View Lecture           | GET    | `/api/course/{id}/lecture/{lecture}`                        |
| Mark Attendance        | POST   | `/api/course/{id}/lecture/{lecture}/attendance/{studentId}` |
| Unmark Attendance      | DELETE | `/api/course/{id}/lecture/{lecture}/attendance/{studentId}` |
| Get Attendance summary | GET    | `/api/attendanceSummary`                                    |
