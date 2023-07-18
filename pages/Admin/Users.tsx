import { useSession } from "next-auth/react";
import Layout from "../Layout";
import {
  useDisclosure,
  Divider,
  ModalOverlay,
  useToast,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import useSWR from "swr";
import {
  ReceivedUserDataOnClient,
  SentUserDataFromClient,
} from "../../lib/types";
import { fetcher } from "@/lib/functions";

import React, { useState } from "react";
import styles from "./Users.module.css";

import NewUserModal from "@/components/NewUserModal";
import TabsComponent from "@/components/TabsComponent";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import UserList from "@/components/UserList";

function useSearch(searchQuery: string, role: string, page: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/allUsers/search?searchQuery=${searchQuery}&page=${page}&role=${role}`,
    fetcher
  );
  return {
    users: data as ReceivedUserDataOnClient[],
    isLoading,
    error: error,
    mutate,
  };
}

export default function Users() {
  const session = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [role, setRole] = useState("All");
  const [page, setPage] = useState(1);

  const { users, isLoading, error, mutate } = useSearch(
    searchQuery,
    role,
    page
  );

  const [newUserData, setNewUserData] = useState<SentUserDataFromClient>({
    name: "",
    email: "",
    role: "Student",
    house: "",
    password: "",
    phone: "",
    profilePicture: null,
    rollNumber: "",
  });

  // for the new overlay when the modal is opened:
  function OverlayOne() {
    return <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />;
  }
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Layout>
        {/* header */}
        <div className={styles.wrapper}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Tabs here*/}
          <TabsComponent role={role} setRole={setRole} setPage={setPage} />

          {/* list of users */}
          <UserList
            isLoading={isLoading}
            error={error}
            editMode={true}
            usersData={users}
            mutate={mutate}
          />
        </div>

        {/* divider */}
        <Divider orientation="horizontal" paddingBlock={"5px"} />

        {/* pagination */}
        <div className={styles.botBar}>
          <Pagination page={page} setPage={setPage} users={users} />
          {/* Adding new users */}
          <Button
            className={"clicky"}
            onClick={() => {
              onOpen();
              setOverlay(<OverlayOne />);
            }}
          >
            Add
          </Button>
        </div>

        <button
          className={styles.addUserButton}
          onClick={() => {
            onOpen();
            setOverlay(<OverlayOne />);
          }}
        >
          <AddIcon className={styles.icon} />
          Add{" "}
        </button>

        {/* Modal window to add new users */}
        <NewUserModal
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          newUserData={newUserData}
          setNewUserData={setNewUserData}
        />
      </Layout>
    </>
  );
}
