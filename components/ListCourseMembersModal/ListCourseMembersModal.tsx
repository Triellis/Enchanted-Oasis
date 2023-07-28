import {
  Box,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import UserList from "@/components/UserList";
import Pagination from "@/components/Pagination";
import { ReceivedUserDataOnClient } from "@/lib/types";
import { fetcher, useCourseMembers } from "@/lib/functions";
import useSWR from "swr";
import SearchBar from "../SearchBar/SearchBar";

export default function ListCourseMembersModal({
  courseId,
  memberType,
  isOpen,
  onClose,
}: {
  courseId: string;
  memberType: "student" | "faculty";
  isOpen: boolean;
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { members, error, isLoading, mutate } = useCourseMembers(
    courseId,
    page,
    search,
    memberType
  );
  return (
    <Modal isCentered size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

      <ModalContent borderRadius={10} backgroundColor="hsl(var(--b2))">
        <ModalCloseButton />
        <Box p="1em">
          <Heading>
            {" "}
            {memberType === "faculty" ? "Faculties " : "Students"}
          </Heading>
          <SearchBar searchQuery={search} setSearchQuery={setSearch} />
          <UserList
            error={error}
            isLoading={isLoading}
            mutate={mutate}
            usersData={members}
            forceSmall={true}
          />
          <Pagination items={members} page={page} setPage={setPage} />
        </Box>
      </ModalContent>
    </Modal>
  );
}
