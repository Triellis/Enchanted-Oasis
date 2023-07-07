import { useSession } from "next-auth/react";
import Layout from "../Layout";
import {
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import useSWR from "swr";
import { UserDataOnClient } from "../../lib/types";
import { useState } from "react";
import { Badge } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import styles from "./Users.module.css";
import { Input } from "@chakra-ui/react";
import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());
function useSearch(searchQuery: string, role: string, page: number) {
  const { data, error, isLoading } = useSWR(
    `/api/allUsers/search?searchQuery=${searchQuery}&page=${page}&role=${role}`,
    fetcher
  );
  return {
    users: data as UserDataOnClient[],
    isLoading,
    error: error,
  };
}

function UserListItem({ userData }: { userData: UserDataOnClient }) {
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

  const [role, setRole] = useState("student");
  const { users, isLoading, error } = useSearch(searchQuery, role, 1);
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
            <UserListItem userData={user} />
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
              <Radio value="Both">Both</Radio>
            </Stack>
          </RadioGroup>
          {componentToRender}
        </div>
      </Layout>
    </>
  );
}
