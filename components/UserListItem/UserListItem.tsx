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
import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";

import styles from "./UserListItem.module.css";

import { getRoleColor } from "@/lib/functions";
import { ReceivedUserDataOnClient, SentUserDataFromClient } from "@/lib/types";

import classNames from "classnames";
import React, { useState } from "react";

import EditUserModal from "@/components/EditUserModal";
import { motion } from "framer-motion";
import MotionDiv from "../MotionDiv";

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
  editMode,
  forceSmall,
  customMode,
  CustomComponent,
  transition,
}: {
  userData: ReceivedUserDataOnClient;
  mutate: () => void;
  editMode: boolean;
  forceSmall: boolean;
  customMode: boolean;
  CustomComponent: any;
  transition: any;
}) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  // for dynamic rendering of components as per screen size
  const [isSmall, setIsSmall] = React.useState(true);

  React.useEffect(() => {
    window.addEventListener("resize", () => handleResize(setIsSmall));
    handleResize(setIsSmall);

    return () => {
      window.removeEventListener("resize", () => handleResize(setIsSmall));
    };
  }, []);

  let componentToRender;
  if (isSmall || forceSmall) {
    componentToRender = (
      <span
        className={classNames(
          styles.responsiveBlock,
          forceSmall && styles.smallBlock
        )}
      >
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
          <Badge colorScheme={getRoleColor(userData.role)}>
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

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={transition}
      className={styles.userListItem}
    >
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

          {customMode && CustomComponent(userData)}
          {/* Content */}
          <Portal>
            <PopoverContent zIndex={20} className={styles.popMain}>
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
              {editMode && (
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
              )}
              {/* edit user modal to be called: */}
            </PopoverContent>
          </Portal>
        </Popover>

        {/* Delete IconButton */}
        {editMode && userData.role !== "Admin" && (
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
        )}

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
              <Button
                isLoading={isLoading}
                className={styles.del}
                onClick={() => {
                  handleDelete();
                }}
              >
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
        />
      </div>
    </MotionDiv>
  );
}
