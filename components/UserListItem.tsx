import {
  Avatar,
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { ReceivedUserDataOnClient } from "../lib/types";
import classNames from "classnames";
import { DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import styles from "./UserListItem.module.css";
import React from "react";
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
  let roleColor = "gray";
  if (userData.role === "Student") {
    roleColor = "blue";
  } else if (userData.role === "Admin") {
    roleColor = "red";
  } else if (userData.role === "Faculty") {
    roleColor = "green";
  }

  let componentToRender;
  if (isSmall) {
    componentToRender = (
      <span className={styles.responsiveBlock}>
        <span className={styles.name}>{userData.name}</span>
        <span className={styles.role}>
          <Badge colorScheme={roleColor} className={styles.roleLabel}>
            {userData.role}
          </Badge>
        </span>
        <span className={styles.email}>{userData.email}</span>
      </span>
    );
  } else {
    componentToRender = (
      <span className={styles.responsiveBlock}>
        <span className={styles.name}>{userData.name}</span>
        <span className={styles.role}>
          <Badge colorScheme={roleColor} className={styles.roleLabel}>
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

  // function to ask for modal for confirmation:
  function OverlayOne() {
    return <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <li className={styles.userListItem}>
      <div className={styles.userInfo}>
        {/* profile picture */}
        <span>
          <Avatar src={userData.profilePicture} />
        </span>

        {/* remaining components which changes visibility as per screen size */}
        {componentToRender}

        {/* Info button */}
        <IconButton
          isRound
          variant="outline"
          aria-label="Call Sage"
          icon={<InfoOutlineIcon />}
          className={classNames(styles.editButton, styles.btnGroup)}
        />

        {/* Edit IconButton */}
        <IconButton
          isRound
          variant="outline"
          aria-label="Call Sage"
          icon={<DeleteIcon />}
          className={classNames(styles.deleteButton, styles.btnGroup)}
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
        />

        <Modal
          isCentered
          isOpen={isOpen}
          onClose={onClose}
          size={{ sm: "2xl", base: "xs", lg: "3xl" }}
        >
          {overlay}
          <ModalContent bg={"hsl(var(--b1))"}>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                {" "}
                Are you sure you want to delete the user:{" "}
                <span style={{ fontWeight: "bold", color: "hsl(var(--er)" }}>
                  {userData.name}
                </span>{" "}
                ?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button className={styles.del} onClick={handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </li>
  );
}
