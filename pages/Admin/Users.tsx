import { useSession } from "next-auth/react";
import Layout from "../Layout";
import {
  useDisclosure,
  Divider,
  ModalOverlay,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import useSWR from "swr";
import { SentUserDataFromClient, TabsType } from "../../lib/types";
import { useUserSearch } from "@/lib/functions";

import React, { useMemo, useState } from "react";
import styles from "./Users.module.css";

import NewUserModal from "@/components/NewUserModal";
import TabsComponent from "@/components/TabsComponent";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import UserList from "@/components/UserList";
import FloatingButton from "@/components/FloatingButton";

export default function Users() {
  const session = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [role, setRole] = useState("All");
  const [page, setPage] = useState(1);

  const { users, isLoading, error, mutate } = useUserSearch(
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
  const tabs: TabsType = useMemo(
    () => [
      { label: "All", value: "All", color: "gray.600" },
      { label: "Student", value: "Student", color: "blue.600" },
      { label: "Faculty", value: "Faculty", color: "green.600" },
      { label: "Admin", value: "Admin", color: "red.600" },
    ],
    []
  );

  return (
    <>
      <Layout>
        {/* header */}
        <div className={styles.wrapper}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPage={setPage}
          />

          {/* Tabs here*/}
          <TabsComponent
            tab={role}
            setTab={setRole}
            setPage={setPage}
            tabs={tabs}
          />

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
          <Pagination page={page} setPage={setPage} items={users} />
        </div>

        {/* floating button */}
        <FloatingButton
          onOpen={onOpen}
          SideIcon={AddIcon}
          HalfText={"Add"}
          RemainingText={"New User"}
          initialWidth={5.5}
          finalWidth={10}
          rotateBy={180}
        />

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
