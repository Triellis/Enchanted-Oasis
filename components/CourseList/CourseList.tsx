import CourseListItem from "@/components/CourseListItem";
import { CourseListItemData } from "@/lib/types";
import { Accordion } from "@chakra-ui/react";

export default function CourseList({
  courses,
}: {
  courses: CourseListItemData[];
}) {
  return (
    <Accordion
      allowMultiple
      display={"flex"}
      gap={"0.5em"}
      flexDirection={"column"}
    >
      {courses.map((course) => (
        <CourseListItem key={course._id.toString()} course={course} />
      ))}
    </Accordion>
  );
}
