import { ReceivedUserDataOnClient } from "@/lib/types";
import UserListItem from "@/components/UserListItem";
import { Divider, useToast } from "@chakra-ui/react";
import styles from "./UserList.module.css";

import { motion } from "framer-motion";

export default function UserList({
  usersData,
  mutate,
  editMode = false,
  forceSmall = false,
  isLoading,
  error,
  customMode = false,
  CustomComponent,
}: {
  usersData: ReceivedUserDataOnClient[];
  mutate: () => void;
  editMode?: boolean;
  forceSmall?: boolean;
  isLoading: boolean;
  error: any;
  customMode?: boolean;
  CustomComponent?: any;
}) {
  let componentToRender;
  const toast = useToast();

  const transition = {
    duration: 0.3,
    ease: "easeInOut",
  };

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
  }
  if (usersData && usersData.length === 0) {
    componentToRender = <div>No users found</div>;
  } else if (usersData) {
    componentToRender = (
      <>
        {usersData.map((user, index) => (
          <UserListItem
            forceSmall={forceSmall}
            mutate={mutate}
            userData={user}
            key={user._id.toString()}
            editMode={editMode}
            customMode={customMode}
            CustomComponent={CustomComponent}
            transition={{ ...transition, delay: index * 0.09 }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {!forceSmall && (
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
          {editMode && <span>Remove</span>}
        </div>
      )}

      <Divider orientation="horizontal" paddingBlock={"5px"} />
      {/* list of users */}
      {componentToRender}
    </>
  );
}
