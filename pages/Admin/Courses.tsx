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
              code="COMP 1000"
              descripton="This course introduces students to the fundamentals of computer science through the use of a high-level programming language. Students will learn to design, code, test, debug, document, and maintain programs using good software engineering practices. Topics include: problem solving, program design, program implementation, program testing, and program documentation."
              credits="3"
            />

            <CourseListItem
              _id="4"
              name="Awkward Anatomy and Uncomfortable Discussions"
              code="BIOL 200"
              descripton="Prepare to squirm in your seat as we delve into the world of reproduction! This cringe-worthy course will have you blushing with embarrassment as we explore the most intimate aspects of human anatomy and reproductive systems. From graphic illustrations of reproductive organs to explicit discussions about mating behaviors, this class will leave no awkward topic untouched. Get ready for cringe-worthy group activities and role-playing exercises that might make you wish you were anywhere else. Brace yourself for uncomfortable moments and the overwhelming desire to hide from your classmates. If you thought talking about the 'birds and the bees' with your parents was bad, you haven't seen anything yet! Enroll at your own risk and leave your dignity at the door!"
              credits="4"
            />
          </Accordion>
        </div>
      </Layout>
    </>
  );
}

export default Courses;
