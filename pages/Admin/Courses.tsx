import Layout from "../Layout";
import CourseListItem from "@/components/CourseListItem";

import { Accordion } from "@chakra-ui/react";

function Courses() {
  return (
    <>
      <Layout>
        <div>
          <Accordion allowMultiple>
            <CourseListItem
              _id="1"
              name="Introduction to Computer Science"
              code="FCP100"
              descripton="This course introduces students to the fundamentals of computer science through the use of a high-level programming language. Students will learn to design, code, test, debug, document, and maintain programs using good software engineering practices. Topics include: problem solving, program design, program implementation, program testing, and program documentation."
              credits="3"
            />
          </Accordion>
        </div>
      </Layout>
    </>
  );
}

export default Courses;
