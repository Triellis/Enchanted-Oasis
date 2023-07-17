import { ReceivedUserDataOnClient } from "@/lib/types";
import UserListItem from "./UserListItem";
import { Divider, useToast } from "@chakra-ui/react";
import styles from "./UserList.module.css";

export default function UserList({
  usersData,
  mutate,
  editMode = false,
  isLoading,
  error,
}: {
  usersData: ReceivedUserDataOnClient[];
  mutate: () => void;
  editMode?: boolean;
  isLoading: boolean;
  error: any;
}) {
  let componentToRender;
  const toast = useToast();

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
  if (usersData) {
    componentToRender = (
      <>
        {usersData.map((user) => (
          <UserListItem
            mutate={mutate}
            userData={user}
            key={user._id.toString()}
            editMode={editMode}
          />
        ))}
      </>
    );
  }
  return (
    <>
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
      <Divider orientation="horizontal" paddingBlock={"5px"} />
      {/* list of users */}
      {componentToRender}
    </>
  );
}
