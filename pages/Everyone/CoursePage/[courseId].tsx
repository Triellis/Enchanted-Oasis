import { fetcher, useUserSearch } from "@/lib/functions";
import { CourseInformation, Day, ReceivedUserDataOnClient } from "@/lib/types";
import Layout from "@/pages/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";

import styles from "./CoursePage.module.css";
import { useEffect, useMemo, useState } from "react";
import UserList from "@/components/UserList/UserList";
import SearchBar from "@/components/SearchBar/SearchBar";
import Pagination from "@/components/Pagination/Pagination";
import userStyles from "@/pages/Admin/Users.module.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import TabsComponent from "@/components/TabsComponent/TabsComponent";
import { AddIcon } from "@chakra-ui/icons";
import classNames from "classnames";
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
  memberType: "student" | "faculty",
  notEnrolledOnly = false
) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/course/${courseId}/member?page=${page}&memberType=${memberType}&searchQuery=${search}&&notEnrolledOnly=${notEnrolledOnly}`,
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
            <div className={styles.numberOfStudents}>
              {course.numberOfStudents} Students Enrolled
            </div>
            <div className={styles.numberOfFaculties}>
              {course.numberOfFaculties} Faculties
            </div>
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

async function enrollUsers(
  cousreId: string,
  selectedUsers: string[],
  memberType: any,
  toast: any,
  onClose: any
) {
  const res = await fetch(
    ` /api/course/${cousreId}/member?memberType=${memberType}
   
  `,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberIds: selectedUsers,
      }),
    }
  );
  if (res.ok) {
    toast({
      title: "Users Enrolled",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  } else {
    toast({
      title: "Error",
      description: await res.text(),
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

function EnrollUserModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("Faculty");
  const memberType = role == "Student" ? "student" : "faculty";
  const [page, setPage] = useState(1);
  const router = useRouter();
  const courseId = router.query.courseId;
  const { members, error, isLoading, mutate } = useMembers(
    courseId as string,
    page,
    searchQuery,
    memberType,
    true
  );
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    setSelectedUsers([]);
  }, [isOpen, role]);
  return (
    <Modal
      isCentered
      size={{
        base: "full",
        md: "lg",
      }}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

      <ModalContent borderRadius={10} backgroundColor="hsl(var(--b2))">
        <ModalHeader>Select Users to Enroll</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody
          overflowX={"hidden"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {`${selectedUsers.length} ${role} selected`}
          <TabsComponent
            setPage={setPage}
            setTab={setRole as any}
            tab={role}
            tabs={[
              { label: "Faculty", value: "Faculty", color: "green.600" },
              { label: "Student", value: "Student", color: "blue.600" },
            ]}
          />
          <UserList
            forceSmall={true}
            usersData={members}
            isLoading={isLoading}
            error={error}
            mutate={mutate}
            selectMode={true}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
          <Pagination items={members} page={page} setPage={setPage} />
        </ModalBody>

        <ModalFooter display={"flex"} justifyContent={"center"}>
          <Button
            colorScheme="blue"
            onClick={() => {
              enrollUsers(
                courseId as string,
                selectedUsers,
                memberType,
                toast,
                onClose
              );
            }}
          >
            Enroll
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
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

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <button
        className={classNames(userStyles.addUserButton, styles.enrollUserBtn)}
        onClick={() => {
          onOpen();
        }}
      >
        <AddIcon className={userStyles.icon} />
        Enroll{" "}
      </button>
      <EnrollUserModal isOpen={isOpen} onClose={onClose} />
    </Layout>
  );
}
