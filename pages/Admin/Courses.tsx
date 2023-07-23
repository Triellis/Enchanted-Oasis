import { Accordion } from "@chakra-ui/react";
import Layout from "../Layout";
import CourseListItem from "@/components/CourseListItem";

function Courses() {
  return (
    <>
      <Layout>
        <div>
          <CourseListItem
            _id="1"
            name="Introduction to Computer Science"
            code="COMP 1000"
            description="An introduction to the fundamentals of computer science. Topics include algorithm design and program development; data types; control structures; functions; arrays; and the mechanics of running, testing, and debugging. Students will learn to program in a high-level language such as Python or Java."
            credits="3"
          />
        </div>
      </Layout>
    </>
  );
}

export default Courses;
