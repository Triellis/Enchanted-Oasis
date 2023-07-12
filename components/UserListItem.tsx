import { Avatar, Badge, useToast } from "@chakra-ui/react";
import { ReceivedUserDataOnClient } from "../lib/types";
import classNames from "classnames";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import styles from "./UserListItem.module.css";
export default function UserListItem({
  userData,
  mutate,
}: {
  userData: ReceivedUserDataOnClient;
  mutate: () => void;
}) {
  const toast = useToast();

  const handleDelete = async () => {
    const res = await fetch(`/api/user?userId=${userData._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast({
        title: "User deleted",
        description: `User ${userData.name} deleted`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: `User ${userData.name} could not be deleted`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    mutate();
  };

  const isSmall = window.innerWidth < 768;

  let compoenentToRender;
  if (isSmall) {
    compoenentToRender = (
      <span className={styles.responsiveBlock}>
        <span className={styles.name}>{userData.name}</span>
        <span className={styles.role}>
          <Badge colorScheme={userData.role === "Student" ? "blue" : "red"}>
            {userData.role}
          </Badge>
        </span>
        <span className={styles.email}>{userData.email}</span>
      </span>
    );
  } else {
    compoenentToRender = (
      <span className={styles.responsiveBlock}>
        <span className={styles.name}>{userData.name}</span>
        <span className={styles.role}>
          <Badge colorScheme={userData.role === "Student" ? "blue" : "red"}>
            {userData.role}
          </Badge>
        </span>
        <span className={styles.email}>{userData.email}</span>
        <span className={styles.phone}>{userData.phone}</span>
        <span className={styles.rollNumber}>{userData.rollNumber}</span>
        <span className={styles.house}>{userData.house}</span>
      </span>
    );
  }

  return (
    <li className={styles.userListItem}>
      <div className={styles.userInfo}>
        <span>
          <Avatar bg="teal.500" />
        </span>

        {compoenentToRender}

        <button className={classNames(styles.deleteButton, styles.btnGroup)}>
          <DeleteIcon onClick={handleDelete} />
        </button>
        <button className={classNames(styles.editButton, styles.btnGroup)}>
          <EditIcon />
        </button>
      </div>
    </li>
  );
}
