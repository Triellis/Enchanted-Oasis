import { useCourseMembers } from "@/lib/functions";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "../SearchBar";
import TabsComponent from "../TabsComponent";
import UserList from "../UserList";
import { ReceivedUserDataOnClient } from "@/lib/types";
import Pagination from "../Pagination";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import styles from "./EnrollMemberModal.module.css";
import classNames from "classnames";
import userStyles from "@/pages/Admin/Users.module.css";
import FloatingButton from "../FloatingButton";

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
    if (mutateMembers) {
      mutateMembers();
    }
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

export default function EnrollMemberModal({
  isOpen,
  onClose,
  mutateMembers,
  studentsOnly = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  mutateMembers?: () => void;
  studentsOnly?: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("Faculty");
  const memberType = role == "Student" ? "student" : "faculty";
  const [page, setPage] = useState(1);
  const router = useRouter();
  const courseId = router.query.courseId;
  const {
    members,
    error,
    isLoading: isMembersLoading,
    mutate,
  } = useCourseMembers(courseId as string, page, searchQuery, memberType, true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    setSelectedUsers([]);
    mutate();
  }, [isOpen, role]);

  const [isLoading, setIsLoading] = useState(false);
  const tabs = useMemo(() => {
    if (studentsOnly) {
      setRole("Student");
      return [{ label: "Student", value: "Student", color: "blue.600" }];
    } else {
      return [
        { label: "Faculty", value: "Faculty", color: "green.600" },
        { label: "Student", value: "Student", color: "blue.600" },
      ];
    }
  }, []);
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
            tabs={tabs}
          />
          <UserList
            forceSmall={true}
            usersData={members}
            isLoading={isMembersLoading}
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
            isLoading={isLoading}
            className="modalYesBtn"
            onClick={() => {
              enrollUsers(
                courseId as string,
                selectedUsers,
                memberType,
                toast,
                onClose,
                mutateMembers,
                setIsLoading
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
