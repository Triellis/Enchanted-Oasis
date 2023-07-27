import { CourseInformation, Day } from "@/lib/types";
import { Button } from "@chakra-ui/react";
import styles from "./CoursePlate.module.css";

function extractTimeIn24HrsFormat(date: string) {
  const dateObj = new Date(date);
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

function ScheduleTable({
  schedule,
}: {
  schedule: CourseInformation["schedule"];
}) {
  return (
    <div className={styles.scheduleTable}>
      {Object.keys(schedule).map((day) => (
        <div className={styles.tableElement} key={day}>
          <div className={styles.day}>{day}</div>
          <div className={styles.time}>
            {schedule[day as Day].map((time) => {
              return (
                <span
                  key={time.startTime.toString() + day}
                  className={styles.timeElement}
                >{`${extractTimeIn24HrsFormat(
                  time.startTime.toString()
                )} to ${extractTimeIn24HrsFormat(
                  time.endTime.toString()
                )}`}</span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CoursePlate({
  course,
  isLoading,
  error,
}: {
  course: CourseInformation;
  isLoading: boolean;
  error: any;
}) {
  let courseToRender;
  if (isLoading) {
    courseToRender = <div>Loading...</div>;
  } else if (error) {
    courseToRender = <div>Error</div>;
  } else {
    courseToRender = (
      <div className={styles.courseDataWrapper}>
        <div className={styles.coursePlate}>
          <div className={styles.header}>
            <div className={styles.courseName}>{course.name}</div>
            <Button size={"lg"} className={styles.enrollBtn}>
              Enroll
            </Button>
          </div>
          <div className={styles.subHeader}>
            <div className={styles.courseCode}>{course.code}</div>
            <div className={styles.courseCredits}>{course.credits} credits</div>
          </div>

          <div className={styles.footer}>
            <button className={styles.numberOfStudents} onClick={() => {}}>
              {course.numberOfStudents} Students Enrolled
            </button>
            <button className={styles.numberOfFaculties} onClick={() => {}}>
              {course.numberOfFaculties} Faculties
            </button>
          </div>
        </div>
        <div className={styles.descriptionPlate}>
          <div className={styles.courseName}>About The Course</div>
          <div className={styles.CourseDescription}>{course.description}</div>
        </div>
        <div className={styles.schedulePlate}>
          <div className={styles.courseName}>Schedule</div>
          <ScheduleTable schedule={course.schedule} />
        </div>
      </div>
    );
  }
  return courseToRender;
}
