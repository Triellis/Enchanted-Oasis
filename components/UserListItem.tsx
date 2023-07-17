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
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";

import styles from "./UserListItem.module.css";

import { getRoleColor } from "@/lib/functions";
import { ReceivedUserDataOnClient, SentUserDataFromClient } from "../lib/types";

import classNames from "classnames";
import React, { useState } from "react";

import EditUserModal from "./EditUserModal";

function handleResize(setIsSmall: any) {
  if (window.innerWidth < 768) {
    setIsSmall(true);
  } else {
    setIsSmall(false);
  }
}

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

  // for dynamic rendering of components as per screen size
  const [isSmall, setIsSmall] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("resize", () => handleResize(setIsSmall));
    handleResize(setIsSmall);

    return () => {
      window.removeEventListener("resize", () => handleResize(setIsSmall));
    };
  }, []);

  let componentToRender;
  if (isSmall) {
    componentToRender = (
      <span className={styles.responsiveBlock}>
        <span className={styles.name}>{userData.name}</span>
        <span className={styles.role}>
          <Badge
            colorScheme={getRoleColor(userData.role)}
            className={styles.roleLabel}
          >
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
          <Badge
            colorScheme={getRoleColor(userData.role)}
            className={styles.roleLabel}
          >
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
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const isStudent = userData.role === "Student";
  const isAdmin = userData.role === "Admin";
  const isFaculty = userData.role === "Faculty";

  return (
    <li className={styles.userListItem}>
      <div className={styles.userInfo}>
        {/* profile picture */}
        <span>
          <Avatar
            size={isSmall ? "md" : "lg"}
            className={styles.profilePic}
            src={userData.profilePicture}
          />
        </span>

        {/* remaining components which changes visibility as per screen size */}
        {componentToRender}

        {/* Info button with popOver */}
        <Popover placement="auto-end">
          {/* Trigger -> info button */}
          <PopoverTrigger>
            <IconButton
              isRound
              variant="outline"
              aria-label="Call Sage"
              icon={<InfoOutlineIcon />}
              className={classNames(styles.editButton, styles.btnGroup)}
            />
          </PopoverTrigger>

          {/* Content */}
          <Portal>
            <PopoverContent className={styles.popMain}>
              <PopoverBody className={styles.popContent}>
                {/* first half */}
                <Avatar
                  className={styles.profilePic}
                  src={userData.profilePicture}
                  size="2xl"
                />

                {/* second half */}
                <div className={styles.popInfo}>
                  {/* Roll number (only visible to students) */}
                  {isStudent && (
                    <>
                      <span className={styles.popLabel}>Roll:</span>
                      <span className={styles.popValue}>
                        {userData.rollNumber}
                      </span>
                    </>
                  )}

                  {/* House (not visible to admins) */}
                  {!isAdmin && (
                    <>
                      <span className={styles.popLabel}>House:</span>
                      <span className={styles.popValue}>{userData.house}</span>
                    </>
                  )}

                  {/* Phone */}
                  <span className={styles.popLabel}>Phone:</span>
                  <span className={styles.popValue}>{userData.phone}</span>

                  {/* email */}
                  <span className={styles.popLabel}>Email:</span>
                  <span className={styles.popValue}>{userData.email}</span>
                </div>
              </PopoverBody>

              {/* Edit user button */}
              <PopoverFooter className={styles.popFoot}>
                <Button
                  className={styles.popEdit}
                  // calls edit user modal
                  onClick={() => {
                    setOverlay(<OverlayOne />);
                    onEditModalOpen();
                  }}
                >
                  Edit User
                </Button>
              </PopoverFooter>

              {/* edit user modal to be called: */}
            </PopoverContent>
          </Portal>
        </Popover>

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

        {/* Delete user confirmation modal */}
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

        {/* Edit user modal */}
        <EditUserModal
          isEditModalOpen={isEditModalOpen}
          onEditModalClose={onEditModalClose}
          mutate={mutate}
          userData={userData}
          editMode={true}
        />
      </div>
    </li>
  );
}
