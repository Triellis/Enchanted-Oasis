import CourseListItem from "@/components/CourseListItem";
import { CourseListItemData } from "@/lib/types";
import { Accordion } from "@chakra-ui/react";
import styles from "./CourseList.module.css";
export default function CourseList({
  courses,
}: {
  courses: CourseListItemData[];
}) {
  return (
    <Accordion
      allowMultiple
      className={styles.courseList}
    >
      {courses.map((course) => (
        <CourseListItem key={course._id.toString()} course={course} />
      ))}
    </Accordion>
  );
}
