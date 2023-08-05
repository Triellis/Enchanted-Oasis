import CoursePlate from "@/components/CoursePlate/CoursePlate";
import Layout from "@/pages/Layout";
import styles from "./MyCoursePage.module.css";

import { fetcher, useCoursePage } from "@/lib/functions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MySession } from "@/lib/types";
 
import { Button, useDisclosure } from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import CourseNotifList from "@/components/CourseNotifList";
import Pagination from "@/components/Pagination/Pagination";
function useCourseNotifications(
  courseId: string,
  page: number,
  search: string
) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/course/${courseId}/notifications?page=${page}&searchQuery=${search}`,
    fetcher
  );
  return {
    notifications: data,
    error,
    isLoading,
    mutate,
  };
}
import EnrollMemberModal from "@/components/EnrollMemberModal";
import FloatingButton from "@/components/FloatingButton";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import SendMessageModal from "@/components/SendMessageModal/SendMessageModal";
import classNames from "classnames";

export default function MyCoursePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMsgModalOpen,
    onOpen: onMsgModalOpen,
    onClose: onMsgModalClose,
  } = useDisclosure();
  const router = useRouter();
  const courseId = router.query.courseId;
  const { course, isLoading, error } = useCoursePage(courseId?.toString()!);
  const session = useSession().data as MySession;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const {
    notifications,
    error: notificationsError,
    isLoading: isNotificationsLoading,
    mutate: mutateNotifications,
  } = useCourseNotifications(courseId as string, page, search);

  return (
    <Layout>
      <div className={styles.notifWrapper}>
        <CoursePlate
          course={course}
          error={error}
          isLoading={isLoading}
          actionBtn={session?.user.role === "Student" ? "unenroll" : null}
          membersModal={true}
        />
        {session?.user.role === "Faculty" && (
          <div className={styles.postBtnWrapper}>
            <Button
              className={classNames(styles.postBtn)}
              onClick={onOpen}
            >
              Enroll Students
            </Button>
          </div>
        )}

        <div className={styles.searchBar}>
          <SearchBar
            searchQuery={search}
            setSearchQuery={setSearch}
            setPage={setPage}
          />
        </div>
        <div className={styles.notifs}>
          <CourseNotifList
            error={notificationsError}
            isLoading={isNotificationsLoading}
            mutate={mutateNotifications}
            notifications={notifications}
          />
        </div>
        <Pagination items={notifications} page={page} setPage={setPage} />
        {session?.user.role === "Faculty" && (
          <FloatingButton
            onOpen={onMsgModalOpen}
            SideIcon={EditIcon}
            HalfText="Post"
            RemainingText="New Message"
            initialWidth={5.5}
            finalWidth={12.3}
            rotateBy={0}
          />
        )}

        {/* modals */}
        <EnrollMemberModal
          isOpen={isOpen}
          onClose={onClose}
          studentsOnly={session ? session?.user.role === "Faculty" : true}
        />
        <SendMessageModal
          isOpen={isMsgModalOpen}
          onClose={onMsgModalClose}
          courseId={courseId as string}
          mutate={mutateNotifications}
        />
      </div>
    </Layout>
  );
}
