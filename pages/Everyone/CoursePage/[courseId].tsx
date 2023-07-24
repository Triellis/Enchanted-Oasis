import { fetcher } from "@/lib/functions";
import { CourseInformation, ReceivedUserDataOnClient } from "@/lib/types";
import Layout from "@/pages/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";

import styles from "./CoursePage.module.css";
import { useMemo, useState } from "react";
import UserList from "@/components/UserList/UserList";
import SearchBar from "@/components/SearchBar/SearchBar";
import Pagination from "@/components/Pagination/Pagination";
import {
  Button,
  Divider,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import tabStyles from "@/components/TabsComponent/TabsComponent.module.css";
import TabsComponent from "@/components/TabsComponent/TabsComponent";
function useCourse(courseId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/course/${courseId}`,
    fetcher
  );
  return {
    course: data as CourseInformation,
    isLoading,
    error,
    mutate,
  };
}

function useMembers(
  courseId: string,
  page: number,
  search: string,
  memberType: "student" | "faculty"
) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/course/${courseId}/member?page=${page}&memberType=${memberType}&searchQuery=${search}`,
    fetcher
  );
  return {
    members: data as ReceivedUserDataOnClient[],
    isLoading,
    error,
    mutate,
  };
}

function CoursePlate({
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
          <div className={styles.courseName}>{course.name}</div>
          <div className={styles.subHeader}>
            <div className={styles.courseCode}>{course.code}</div>
            <div className={styles.courseCredits}>{course.credits} credits</div>
            <Button className={styles.enrollBtn}>Enroll</Button>
          </div>

          <div className={styles.footer}>
            <div className={styles.numberOfStudents}>
              {course.numberOfStudents} Students Enrolled
            </div>
            <div className={styles.numberOfFaculties}>
              {course.numberOfFaculties} Faculties
            </div>
          </div>
          {/* <div className={styles.schedule}>{course.schedule}</div> */}
        </div>
        <div className={styles.descriptionPlate}>
          <div className={styles.courseName}>About The Course</div>
          <div className={styles.CourseDescription}>{course.description}</div>
        </div>
      </div>
    );
  }
  return courseToRender;
}

export default function CoursePage() {
  const router = useRouter();
  const { courseId } = router.query;
  const { course, isLoading, error, mutate } = useCourse(courseId as string);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [memberType, setMemberType] = useState<"student" | "faculty">(
    "faculty"
  );
  const {
    members,
    isLoading: isLoadingMembers,
    error: errorMembers,
    mutate: mutateMembers,
  } = useMembers(courseId as string, page, search, memberType);

  const tabs = useMemo(
    () => [
      { label: "Faculties", value: "faculty", color: "green.600" },
      { label: "Students", value: "student", color: "blue.600" },
    ],
    []
  );

  return (
    <Layout>
      <div className={styles.coursePage}>
        <CoursePlate isLoading={isLoading} course={course} error={error} />
        <div className={styles.membersWrapper}>
          <SearchBar searchQuery={search} setSearchQuery={setSearch} />
          <TabsComponent
            setPage={setPage}
            setTab={setMemberType as any}
            tab={memberType}
            tabs={tabs}
          />
          <UserList
            usersData={members}
            isLoading={isLoadingMembers}
            error={errorMembers}
            mutate={mutateMembers}
          />
          <Pagination items={members} page={page} setPage={setPage} />
        </div>
      </div>
    </Layout>
  );
}
