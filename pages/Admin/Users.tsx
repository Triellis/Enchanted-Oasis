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
} from "@chakra-ui/react";
import useSWR from "swr";
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
import { Search2Icon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Image from "next/image";
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());
function useSearch(searchQuery: string, role: string, page: number) {
  const { data, error, isLoading } = useSWR(
    `/api/allUsers/search?searchQuery=${searchQuery}&page=${page}&role=${role}`,
    fetcher
  );
  return {
    users: data as ReceivedUserDataOnClient[],
    isLoading,
    error: error,
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

function UserListItem({ userData }: { userData: ReceivedUserDataOnClient }) {
  return (
    <div className={styles.userListItem}>
      <div>
        <span>{userData.name}</span>

        <Badge colorScheme={userData.role == "Student" ? "blue" : "red"}>
          {userData.role}
        </Badge>
      </div>
    </div>
  );
}

export default function Users() {
  const session = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [role, setRole] = useState("student");
  const { users, isLoading, error } = useSearch(searchQuery, role, 1);
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
            <UserListItem userData={user} key={user._id.toString()} />
          ))}
        </>
      );
    }
  }

  return (
    <>
      <Layout>
        <div className={styles.wrapper}>
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
          <RadioGroup onChange={setRole} value={role}>
            <Stack direction="row">
              <Radio value="Student">Student</Radio>
              <Radio value="Faculty">Faculty</Radio>
              <Radio value="Admin">Admin</Radio>
              <Radio value="All">All</Radio>
            </Stack>
          </RadioGroup>
          {componentToRender}
        </div>
        <Button onClick={onOpen}>add </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new user</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="Text"
                  value={newUserData.name}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, name: e.target.value })
                  }
                />
                <FormLabel>Role</FormLabel>
                <RadioGroup defaultValue="Student">
                  <Stack spacing={5} direction="row">
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
                  {/* Text for now, in future we will retrive all the houses  */}
                  <FormLabel>House</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        house: e.target.value,
                      })
                    }
                  />
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
                  <FormLabel>profilePicture</FormLabel>
                  <Input
                    type="file"
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        profilePicture: e.target.value,
                      });
                    }}
                  />
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
                </RadioGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                variant={"ghost"}
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                colorScheme="blue"
                variant="solid"
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
