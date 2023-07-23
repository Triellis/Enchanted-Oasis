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
              _id="0"
              name="Introduction to Computer Science"
              code="FCP100"
              description="This course introduces students to the fundamentals of computer science through the use of a high-level programming language. Students will learn to design, code, test, debug, document, and maintain programs using good software engineering practices. Topics include: problem solving, program design, program implementation, program testing, and program documentation."
              credits="3"
            />

            <CourseListItem
              _id="1"
              name="Data Structures and Algorithms"
              code="DSA200"
              description="This course delves deeper into data structures and algorithms, focusing on their design, analysis, and implementation. Students will learn various data structures such as arrays, linked lists, trees, graphs, and hash tables, as well as algorithmic techniques for searching, sorting, and optimizing performance."
              credits="3"
            />

            <CourseListItem
              _id="2"
              name="Data Structures and Algorithms"
              code="DSA200"
              description="This course delves deeper into data structures and algorithms, focusing on their design, analysis, and implementation. Students will learn various data structures such as arrays, linked lists, trees, graphs, and hash tables, as well as algorithmic techniques for searching, sorting, and optimizing performance."
              credits="3"
            />

            <CourseListItem
              _id="3"
              name="Object-Oriented Programming"
              code="OOP220"
              description="This course introduces students to object-oriented programming concepts. They will learn how to design and implement classes, encapsulation, inheritance, polymorphism, and abstraction using a programming language such as Java or C++. The course will emphasize the importance of modularity and reusability in software development."
              credits="3"
            />

            <CourseListItem
              _id="4"
              name="Web Development Fundamentals"
              code="WEB101"
              description="This course provides an introduction to web development technologies and practices. Students will learn HTML, CSS, and JavaScript to build interactive and visually appealing websites. Topics include front-end development, responsive design, and basic web server interaction."
              credits="3"
            />

            <CourseListItem
              _id="5"
              name="Database Management Systems"
              code="DBM300"
              description="This course focuses on the principles and practices of database management systems. Students will learn about data modeling, relational databases, SQL queries, and database administration. Emphasis will be placed on designing efficient and secure databases for various applications."
              credits="3"
            />

            <CourseListItem
              _id="6"
              name="Software Engineering Principles"
              code="SEP250"
              description="This course covers the principles and methodologies of software engineering. Students will learn about the software development life cycle, requirements analysis, software design patterns, testing strategies, and project management. The course will emphasize the importance of teamwork and communication in software development projects."
              credits="3"
            />

            <CourseListItem
              _id="7"
              name="Operating Systems Fundamentals"
              code="OSF180"
              description="This course provides an overview of operating systems' functionalities and concepts. Students will study process management, memory management, file systems, and security mechanisms. The course will also cover the basics of concurrent programming and synchronization."
              credits="3"
            />

            <CourseListItem
              _id="8"
              name="Introduction to Artificial Intelligence"
              code="AI200"
              description="This course introduces students to the principles and techniques of artificial intelligence. Topics include problem-solving, search algorithms, knowledge representation, machine learning, and natural language processing. Students will gain practical experience through AI programming projects."
              credits="3"
            />

            <CourseListItem
              _id="8"
              name="Awkward Anatomy and Uncomfortable Discussions"
              code="BIO200"
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
