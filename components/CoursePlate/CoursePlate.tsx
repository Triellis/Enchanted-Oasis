import { CourseInformation, Day } from "@/lib/types";
import { Button, Toast, useDisclosure, useToast } from "@chakra-ui/react";
import styles from "./CoursePlate.module.css";
import { useState } from "react";
import ListCourseMembersModal from "../ListCourseMembersModal/ListCourseMembersModal";

import { motion } from "framer-motion";

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
            {schedule[day as Day]!.map((time) => {
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

async function EnrollOrUnEnroll(
  action: "enroll" | "unenroll",
  courseId: string,
  toast: any
) {
  const res = await fetch(`/api/course/${courseId}/${action}`, {
    method: action == "enroll" ? "POST" : "DELETE",
  });
  if (res.ok) {
    toast({
      title: `You have successfully ${action}ed the course`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } else {
    toast({
      title: `Something went wrong`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

export default function CoursePlate({
  course,
  isLoading,
  error,
  actionBtn = null,
  membersModal = false,
}: {
  course: CourseInformation;
  isLoading: boolean;
  error: any;
  actionBtn?: "enroll" | "unenroll" | null;
  membersModal?: boolean;
}) {
  let actionComponent;
  let membersComponent;
  const toast = useToast();
  const [actionText, setActionText] = useState(actionBtn);
  if (actionBtn) {
    actionComponent = (
      <Button
        size={"lg"}
        className={styles.enrollBtn}
        onClick={() => {
          setActionText((text) => {
            if (text == "enroll") return "unenroll";
            else return "enroll";
          });
          EnrollOrUnEnroll(actionText!, course._id.toString(), toast);
        }}
      >
        {actionText}
      </Button>
    );
  }
  let courseToRender;
  const {
    isOpen: isFacultiesOpen,
    onOpen: onFacultiesOpen,
    onClose: onFacultiesClose,
  } = useDisclosure();
  const {
    isOpen: isStudentsOpen,
    onOpen: onStudentsOpen,
    onClose: onStudentsClose,
  } = useDisclosure();

  if (isLoading) {
    courseToRender = <div>Loading...</div>;
  } else if (error) {
    courseToRender = <div>Error</div>;
  } else {
    if (membersModal) {
      membersComponent = (
        <div className={styles.footer}>
          <button className={styles.numberOfStudents} onClick={onStudentsOpen}>
            {course.numberOfStudents} Students Enrolled
          </button>
          <button
            className={styles.numberOfFaculties}
            onClick={onFacultiesOpen}
          >
            {course.numberOfFaculties} Faculties
          </button>
          <ListCourseMembersModal
            courseId={course._id.toString()}
            isOpen={isFacultiesOpen}
            memberType={"faculty"}
            onClose={onFacultiesClose}
          />
          <ListCourseMembersModal
            courseId={course._id.toString()}
            isOpen={isStudentsOpen}
            memberType={"student"}
            onClose={onStudentsClose}
          />
        </div>
      );
    } else {
      membersComponent = (
        <div className={styles.footer}>
          <div className={styles.numberOfStudents}>
            {course.numberOfStudents} Students Enrolled
          </div>
          <div className={styles.numberOfFaculties}>
            {course.numberOfFaculties} Faculties
          </div>
        </div>
      );
    }
    courseToRender = (
      <div className={styles.courseDataWrapper}>
        {/* plate 1 */}
        <div className={styles.coursePlate}>
          <div className={styles.header}>
            <div className={styles.courseName}>{course.name}</div>
            {actionComponent}
          </div>
          <div className={styles.subHeader}>
            <div className={styles.courseCode}>{course.code}</div>
            <div className={styles.courseCredits}>{course.credits} credits</div>
          </div>
          {membersComponent}
        </div>

        {!membersModal && (
          <>
            {/* plate 2 */}
            <div className={styles.descriptionPlate}>
              <div className={styles.courseName}>About The Course</div>
              <div className={styles.CourseDescription}>
                {course.description}
              </div>
            </div>

            {/* plate 3 */}
            <div className={styles.schedulePlate}>
              <div className={styles.courseName}>Schedule</div>
              <ScheduleTable schedule={course.schedule} />
            </div>
          </>
        )}
      </div>
    );
  }
  return courseToRender;
}
