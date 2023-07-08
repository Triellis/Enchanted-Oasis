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

function UserListItem({ userData }: { userData: ReceivedUserDataOnClient }) {
  return (
    <div className={styles.userListItem}>
      <div>
        <span>{userData.name}{` `}</span>
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
  const [newUserData, setNewUserData] = useState<SentUserDataFromClient>();

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
                <Input type="Text" />
                <FormLabel>Role</FormLabel>
                <RadioGroup defaultValue="Student">
                  <Stack spacing={5} direction="row">
                    <Radio value="Student">Student</Radio>
                    <Radio value="Faculty">Faculty</Radio>
                    <Radio value="Admin">Admin</Radio>
                  </Stack>
                  {/* Text for now, in future we will retrive all the houses  */}
                  <FormLabel>House</FormLabel>
                  <Input type="text" />
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </RadioGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    </>
  );
}
