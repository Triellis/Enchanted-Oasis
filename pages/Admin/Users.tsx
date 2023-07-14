import { useSession } from "next-auth/react";
import Layout from "../Layout";
import {
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  Divider,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Center,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import useSWR from "swr";
import {
  ReceivedUserDataOnClient,
  Role,
  SentUserDataFromClient,
} from "../../lib/types";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import styles from "./Users.module.css";
import { Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import UserListItem from "../../components/UserListItem";
import React from "react";
import { fetcher } from "@/lib/functions";
import NewUserModal from "@/components/NewUserModal";
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

  const toast = useToast();

  let componentToRender;
  if (isLoading) {
    componentToRender = <div>Loading...</div>;
  }
  if (error) {
    toast({
      title: error.name,
      description: error.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    componentToRender = <div> {error.message}</div>;
  }
  if (users) {
    if (users.length == 0) {
      componentToRender = <div>No users found</div>;
    } else {
      componentToRender = (
        <>
          {users.map((user) => (
            <UserListItem
              mutate={mutate}
              userData={user}
              key={user._id.toString()}
            />
          ))}
        </>
      );
    }
  }

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
          {/* search bar */}
          <div className={styles.searchBar}>
            <FormControl id="search">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search2Icon />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </div>

          {/* Tabs */}
          <Tabs
            className={styles.tabGrp}
            position="relative"
            variant="unstyled"
            defaultIndex={0}
            onChange={(index) => {
              if (index === 0) {
                setRole("All");
              } else if (index === 1) {
                setRole("Student");
              } else if (index === 2) {
                setRole("Faculty");
              } else if (index === 3) {
                setRole("Admin");
              }
              setPage(1); // Set the page state to 1 on click
            }}
          >
            <TabList className={styles.tabList}>
              <Tab>All</Tab>
              <Tab>Student</Tab>
              <Tab>Faculty</Tab>
              <Tab>Admin</Tab>
              <TabIndicator
                zIndex={-1}
                className={styles.tabIndicator}
                backgroundColor={
                  role === "Student"
                    ? "blue.600"
                    : role === "Faculty"
                    ? "green.600"
                    : role === "Admin"
                    ? "red.600"
                    : "gray.600"
                }
              />
            </TabList>
          </Tabs>

          {/* list of users */}
          {componentToRender}
        </div>

        {/* divider */}
        <Divider orientation="horizontal" paddingBlock={"5px"} />

        <div className={styles.botBar}>
          {/* Pagination */}
          <Button
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
          >
            {"<"}
          </Button>
          <span>{page}</span>
          <Button
            onClick={() => {
              if (users.length == 10) setPage(page + 1);
            }}
          >
            {">"}
          </Button>

          {/* Adding new users */}
          <Button
            onClick={() => {
              onOpen();
              setOverlay(<OverlayOne />);
            }}
          >
            Add
          </Button>
        </div>

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
