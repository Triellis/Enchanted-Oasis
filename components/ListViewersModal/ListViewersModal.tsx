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
import { fetcher } from "@/lib/functions";
import useSWR from "swr";
function useViewers(id: string, page: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/notification/${id}/listViewers?page=${page}`,
    fetcher
  );
  return {
    viewers: data as ReceivedUserDataOnClient[],
    isLoading,
    error: error,
    mutate,
  };
}

export default function ListViewersModal({
  notificationId,
  isOpen,
  onClose,
}: {
  notificationId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  const { viewers, error, isLoading, mutate } = useViewers(
    notificationId,
    page
  );
  return (
    <Modal isCentered size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

      <ModalContent borderRadius={10} backgroundColor="hsl(var(--b2))">
        <ModalCloseButton />
        <Box p="1em">
          <Heading>Viewers</Heading>
          <UserList
            error={error}
            isLoading={isLoading}
            mutate={mutate}
            usersData={viewers}
            forceSmall={true}
          />
          <Pagination items={viewers} page={page} setPage={setPage} />
        </Box>
      </ModalContent>
    </Modal>
  );
}
