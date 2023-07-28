import CourseListItem from "@/components/CourseListItem";
import { CourseListItemData } from "@/lib/types";
import { List } from "@chakra-ui/react";
import styles from "./CourseList.module.css";
export default function CourseList({
  courses,
  isLoading,
  error,
  mutate,
}: {
  courses: CourseListItemData[];
  isLoading: boolean;
  error: any;
  mutate: () => void;
}) {
  let componentToRender;
  if (isLoading) {
    componentToRender = <div>Loading...</div>;
  }
  if (error) {
    componentToRender = <div>Error: {error.message}</div>;
  }
  if (courses && courses.length === 0) {
    componentToRender = <div>No courses found</div>;
  } else if (courses) {
    componentToRender = (
      <List className={styles.courseList}>
        {courses.map((course) => (
          <CourseListItem
            mutate={mutate}
            key={course._id.toString()}
            course={course}
          />
        ))}
      </List>
    );
  }

  return componentToRender;
}
