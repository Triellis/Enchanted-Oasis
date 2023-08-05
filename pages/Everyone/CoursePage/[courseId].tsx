import { useCourseMembers, useCoursePage } from "@/lib/functions";
import { MySession, ReceivedUserDataOnClient } from "@/lib/types";
import Layout from "@/pages/Layout";
import { useRouter } from "next/router";

import styles from "./CoursePage.module.css";
import { useMemo, useState } from "react";
import UserList from "@/components/UserList/UserList";
import SearchBar from "@/components/SearchBar/SearchBar";
import Pagination from "@/components/Pagination/Pagination";

import CoursePlate from "@/components/CoursePlate/CoursePlate";

import { IconButton, useDisclosure, useToast } from "@chakra-ui/react";

import TabsComponent from "@/components/TabsComponent/TabsComponent";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import EnrollMemberModal from "@/components/EnrollMemberModal/EnrollMemberModal";
import FloatingButton from "@/components/FloatingButton";

export function UnEnrollButton({
  userData,
  courseId,
  mutate,
}: {
  userData: ReceivedUserDataOnClient;
  courseId: string;
  mutate: () => void;
}) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const memberType = userData.role == "Student" ? "student" : "faculty";
  const handleDelete = async () => {
    setIsLoading(true);
    const res = await fetch(
      `/api/course/${courseId}/member/${userData._id.toString()}?memberType=${memberType}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      toast({
        description: `User ${userData.name} Unenrolled`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      mutate();
    } else {
      toast({
        title: "Error",
        description: await res.text(),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };
  return (
    <IconButton
      className={styles.unEnrollBtn}
      onClick={handleDelete}
      aria-label="Unenroll User"
      isLoading={isLoading}
      isRound={true}
      icon={<CloseIcon color={"red.400"} />}
    ></IconButton>
  );
}

export default function CoursePage() {
  const router = useRouter();
  const { courseId } = router.query;
  const { course, isLoading, error, mutate } = useCoursePage(
    courseId as string
  );
  const session = useSession().data as MySession;
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
  } = useCourseMembers(courseId as string, page, search, memberType);

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
        <CoursePlate
          isLoading={isLoading}
          course={course}
          error={error}
          actionBtn={session?.user.role === "Student" ? "enroll" : null}
        />
        <div className={styles.membersWrapper}>
          <SearchBar
            searchQuery={search}
            setSearchQuery={setSearch}
            setPage={setPage}
          />
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
            customMode={session?.user.role === "Admin" ? true : false}
            CustomComponent={(user: ReceivedUserDataOnClient) => (
              <UnEnrollButton
                mutate={mutateMembers}
                userData={user}
                courseId={courseId as string}
              />
            )}
          />
          <Pagination items={members} page={page} setPage={setPage} />
        </div>
      </div>

      {(session?.user.role === "Admin" || session?.user.role === "Faculty") && (
        <FloatingButton
          onOpen={onOpen}
          SideIcon={AddIcon}
          HalfText="Enroll"
          RemainingText="New Users"
          initialWidth={6.3}
          finalWidth={11.4}
          rotateBy={180}
        />
      )}
      <EnrollMemberModal
        mutateMembers={mutateMembers}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Layout>
  );
}
