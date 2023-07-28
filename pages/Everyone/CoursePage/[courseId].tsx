import {
  fetcher,
  useCourseMembers,
  useCoursePage,
  useUserSearch,
} from "@/lib/functions";
import {
  CourseInformation,
  Day,
  MySession,
  ReceivedUserDataOnClient,
} from "@/lib/types";
import Layout from "@/pages/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";

import styles from "./CoursePage.module.css";
import { useEffect, useMemo, useState } from "react";
import UserList from "@/components/UserList/UserList";
import SearchBar from "@/components/SearchBar/SearchBar";
import Pagination from "@/components/Pagination/Pagination";
import userStyles from "@/pages/Admin/Users.module.css";

import CoursePlate from "@/components/CoursePlate/CoursePlate";

import {
  Button,
  IconButton,
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
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import classNames from "classnames";
import { useSession } from "next-auth/react";

async function enrollUsers(
  cousreId: string,
  selectedUsers: string[],
  memberType: any,
  toast: any,
  onClose: any,
  mutateMembers: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsLoading(true);
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
    mutateMembers();
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
  setIsLoading(false);
}

function Selector({
  userData,
  selectedUsers,
  setSelectedUsers,
}: {
  userData: ReceivedUserDataOnClient;
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (selectedUsers.includes(userData._id.toString())) {
      setIsSelected(true);
    }
  }, [selectedUsers, userData._id]);
  if (isSelected) {
    return (
      <Button
        className={styles.selectBtn}
        onClick={() => {
          setSelectedUsers(
            selectedUsers.filter((id) => id !== userData._id.toString())
          );
          setIsSelected(false);
        }}
      >
        <CheckIcon color={"green.500"} />
      </Button>
    );
  } else {
    return (
      <Button
        className={styles.selectBtn}
        onClick={() => {
          setSelectedUsers([...selectedUsers, userData._id.toString()]);
          setIsSelected(true);
        }}
      >
        <AddIcon />
      </Button>
    );
  }
}

function EnrollUserModal({
  isOpen,
  onClose,
  mutateMembers,
}: {
  isOpen: boolean;
  onClose: () => void;
  mutateMembers: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("Faculty");
  const memberType = role == "Student" ? "student" : "faculty";
  const [page, setPage] = useState(1);
  const router = useRouter();
  const courseId = router.query.courseId;
  const { members, error, isLoading, mutate } = useCourseMembers(
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

  const [isLooading, setIsLooading] = useState(false);

  return (
    <Modal
      isCentered
      size={{
        base: "full",
        md: "xl",
      }}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

      <ModalContent borderRadius={10} backgroundColor="hsl(var(--b2))">
        <ModalHeader className={styles.modalHeader}>
          Select Users to Enroll
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody
          overflowX={"hidden"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <div className={styles.search}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPage={setPage}
            />
          </div>

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
            customMode={true}
            CustomComponent={(user: ReceivedUserDataOnClient) => (
              <Selector
                userData={user}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
            )}
          />
          <Pagination items={members} page={page} setPage={setPage} />
        </ModalBody>

        <ModalFooter className={styles.modalFooter}>
          <Button className="modalNoBtn" onClick={onClose}>
            Cancel
          </Button>

          <Button
            isLoading={isLooading}
            className="modalYesBtn"
            onClick={() => {
              enrollUsers(
                courseId as string,
                selectedUsers,
                memberType,
                toast,
                onClose,
                mutateMembers,
                setIsLooading
              );
            }}
          >
            Enroll
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function UnEnrollButton({
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

      {session?.user.role === "Admin" && (
        <button
          className={classNames(userStyles.addUserButton, styles.enrollUserBtn)}
          onClick={() => {
            onOpen();
          }}
        >
          <AddIcon className={userStyles.icon} />
          Enroll{" "}
        </button>
      )}
      <EnrollUserModal
        mutateMembers={mutateMembers}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Layout>
  );
}
