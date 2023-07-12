import { useSession } from "next-auth/react";
import Layout from "../Layout";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  Divider,
  TabPanel,
  Tab,
  TabIndicator,
  TabList,
  TabPanels,
  Tabs,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Grid,
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

import useSWR, { useSWRConfig } from "swr";
import {
  ReceivedUserDataOnClient,
  Role,
  SentUserDataFromClient,
} from "../../lib/types";

import { useState } from "react";
import { Badge } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import styles from "./Users.module.css";
import { Input } from "@chakra-ui/react";
import {
  DeleteIcon,
  Search2Icon,
  EditIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import Image from "next/image";
import classNames from "classnames";
import UserListItem from "../../components/UserListItem";
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());
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

async function postUser(newUserData: SentUserDataFromClient) {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  });
  return res;
}

export default function Users() {
  const session = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [role, setRole] = useState("student");
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
    profilePicture: "",
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

  // for the confirm delete modal:
  

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
                setRole("Student");
              } else if (index === 1) {
                setRole("Faculty");
              } else if (index === 2) {
                setRole("Admin");
              } else if (index === 3) {
                setRole("All");
              }
            }}
          >
            <TabList className={styles.tabList}>
              <Tab>Student</Tab>
              <Tab>Faculty</Tab>
              <Tab>Admin</Tab>
              <Tab>All</Tab>
            </TabList>
            <TabIndicator
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
          <Button onClick={onOpen}>Add</Button>
        </div>

        {/* Modal window to add new users */}
        <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new user</ModalHeader>
            <ModalCloseButton />
            <ModalBody className={styles.modalBody}>
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={4}
              >
                <GridItem colSpan={2}>
                  {/* Name */}
                  <FormControl>
                    <div className={styles.quarter}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="Text"
                        value={newUserData.name}
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Role and House */}
                    <div className={styles.randh}>
                      <FormLabel>Role</FormLabel>
                      <RadioGroup defaultValue="Student">
                        <Stack>
                          <Radio
                            value="Student"
                            onChange={(e) =>
                              setNewUserData({
                                ...newUserData,
                                role: e.target.value as Role,
                              })
                            }
                          >
                            Student
                          </Radio>
                          <Radio
                            value="Faculty"
                            onChange={(e) =>
                              setNewUserData({
                                ...newUserData,
                                role: e.target.value as Role,
                              })
                            }
                          >
                            Faculty
                          </Radio>
                          <Radio
                            value="Admin"
                            onChange={(e) =>
                              setNewUserData({
                                ...newUserData,
                                role: e.target.value as Role,
                              })
                            }
                          >
                            Admin
                          </Radio>
                        </Stack>
                      </RadioGroup>

                      {/* divider */}
                      <Center height={"140px"}>
                        <Divider orientation="vertical" />
                      </Center>

                      {/* House */}
                      <FormLabel>House</FormLabel>
                      <RadioGroup>
                        <Stack>
                          <Radio value="Gryffindor">Gryffindor</Radio>
                          <Radio value="Ravenclaw">Ravenclaw</Radio>
                          <Radio value="Slytherin">Slytherin</Radio>
                          <Radio value="Hufflepuff">Hufflepuff</Radio>
                        </Stack>
                      </RadioGroup>
                    </div>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    {/* Profile Picture */}
                    <FormLabel>Profile Picture</FormLabel>
                    <form className={styles.picIn}>
                      <input
                        type="file"
                        onChange={(e) => {
                          setNewUserData({
                            ...newUserData,
                            profilePicture: e.target.value,
                          });
                        }}
                      />
                    </form>
                  </FormControl>
                </GridItem>
                <GridItem className={styles.quarThree} colSpan={2}>
                  <div className={styles.quarter}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.quarter}>
                    {/* Password */}
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      onChange={(e) => {
                        setNewUserData({
                          ...newUserData,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <div className={styles.quarter}>
                      <FormLabel>Roll Number</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => {
                          setNewUserData({
                            ...newUserData,
                            rollNumber: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className={styles.quarter}>
                      <FormLabel>Phone</FormLabel>
                      <Input
                        type="number"
                        onChange={(e) => {
                          setNewUserData({
                            ...newUserData,
                            phone: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </FormControl>
                </GridItem>
              </Grid>
            </ModalBody>

            <ModalFooter className={styles.modalFooter}>
              <Button
                colorScheme="red"
                onClick={onClose}
                className={styles.modalClose}
              >
                Close
              </Button>
              <Button
                color={"bl"}
                className={styles.modalAdd}
                onClick={async () => {
                  const res = await postUser(newUserData);
                  if (res.status == 200) {
                    toast({
                      title: "User created",
                      description: "User created successfully",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    mutate("/api/users");
                  } else {
                    toast({
                      title: "User creation failed",
                      description: await res.text(),
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                }}
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    </>
  );
}
