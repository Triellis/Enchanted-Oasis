import { Image, Grid, GridItem, Button, Divider } from "@chakra-ui/react";
import styles from "./HousePage.module.css";
import Layout from "../Layout";
import { useRouter } from "next/router";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import TabsComponent from "@/components/TabsComponent";
import { fetcher } from "@/lib/functions";
import { ReceivedUserDataOnClient } from "@/lib/types";
import useSWR from "swr";
import UserListItem from "@/components/UserListItem";
import Pagination from "@/components/Pagination";

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

function HousePage() {
  // getting the house from the url or previous page
  const router = useRouter();
  const { house } = router.query;

  let banner = "";
  if (house === "G") {
    banner = "Gb";
  } else if (house === "R") {
    banner = "Rb";
  } else if (house === "H") {
    banner = "Hb";
  } else if (house === "S") {
    banner = "Sb";
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("All");
  const [page, setPage] = useState(1);

  const { users, isLoading, error, mutate } = useSearch(
    searchQuery,
    role,
    page
  );

  let componentToRender;
  if (isLoading) {
    componentToRender = <div>Loading...</div>;
  }
  if (
    error &&
    error.message !==
      "Unexpected token 'N', \"Not logged in\" is not valid JSON"
  ) {
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

  return (
    <Layout>
      <div className={styles.main}>
        {/* Banner in the start */}
        <div>
          <Image
            src={`/assets/image/Banners/${banner}.png`}
            alt="Gryffindor"
            className={styles.banner}
          />
        </div>

        {/* Remaining contnet beside it */}
        <div className={styles.wrapper}>
          <div>
            <Button>Points</Button>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <TabsComponent
            role={role}
            setRole={setRole}
            setPage={setPage}
            isHousePage={true}
          />

          <div className={styles.tableHeader}>
            <span>
              <span>Profile</span>
            </span>
            <div className={styles.tableHeadersMain}>
              <span>Name</span>
              <span>Role</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Roll No.</span>
              <span>House</span>
            </div>
            <span>Info</span>
            <span>Remove</span>
          </div>
          <Divider orientation="horizontal" paddingBlock={"5px"} />

          {/* list of users */}
          {componentToRender}

          <div className={styles.botBar}>
            <Pagination page={page} setPage={setPage} users={users} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HousePage;
function toast(arg0: {
  title: any;
  description: any;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}
