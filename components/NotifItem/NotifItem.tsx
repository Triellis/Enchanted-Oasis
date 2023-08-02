import {
  Flex,
  Avatar,
  Badge,
  Text,
  Spacer,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import styles from "./NotifItem.module.css";
import { DeleteIcon } from "@chakra-ui/icons";
import { AdminNotificationOnClient } from "@/lib/types";
import classNames from "classnames";
import Link from "next/link";
import { formatDateTime, getRoleColor } from "@/lib/functions";
import ListViewersModal from "@/components/ListViewersModal";

import MotionDiv from "../MotionDiv";

//  function should send a DELETE request to this URL /api/notification/[notificationId]
//  with the notificationId as a query parameter
async function deleteNotification(
  notificationId: string,
  courseId: string | undefined,
  toast: any,
  onClose: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  mutate?: any
) {
  setIsLoading(true);
  let url;
  if (courseId) {
    url = `/api/course/${courseId}/notifications/${notificationId}`;
  } else {
    url = `/api/notification/${notificationId}`;
  }
  const res = await fetch(url, {
    method: "DELETE",
  });
  if (res.ok) {
    toast({
      title: "Notification Deleted",

      status: "success",
      duration: 3000,
      isClosable: true,
    });
    if (mutate) {
      mutate();
    }
    onClose();
  } else {
    toast({
      title: "Something went wrong",
      description: res.statusText,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  setIsLoading(false);
}

export function DeleteConfirmationModal({
  notificationId,
  courseId,
  isOpen,
  onClose,
  mutate,
}: {
  notificationId: string;
  courseId?: string;
  isOpen: boolean;
  onClose: any;
  mutate?: any;
}) {
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Modal isCentered size={"sm"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

      <ModalContent borderRadius={10} backgroundColor="hsl(var(--b2))">
        <ModalHeader>Sure About Deleting?</ModalHeader>
        <ModalCloseButton onClick={onClose} />

        <ModalFooter display={"flex"} justifyContent={"center"}>
          <Button
            isLoading={isLoading}
            className={styles.modalDelBtn}
            variant="solid"
            onClick={() =>
              deleteNotification(
                notificationId,
                courseId,
                toast,
                onClose,
                setIsLoading,
                mutate
              )
            }
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function NotifItem({
  notification,
  adminMode = false,
  transition,
}: {
  notification: AdminNotificationOnClient;
  adminMode?: boolean;
  transition: any;
}) {
  const viewsFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        notation: "compact",
        compactDisplay: "short",
      }),
    []
  );
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isViewsOpen,
    onOpen: onViewsOpen,
    onClose: onViewsClose,
  } = useDisclosure();

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
      className={classNames(
        styles.notifItem,
        !notification.seen && styles.unreadNotif
      )}
    >
      <div className={styles.header}>
        {/* Avatar, name, email */}
        <Flex gap={4}>
          <Avatar src={notification.creator.profilePicture} />
          <div>
            <Text fontSize="sm">{notification.creator.name}</Text>
            <Text fontSize="sm" color={"hsl(var(--nc)  )"}>
              {notification.creator.email}
            </Text>
          </div>
        </Flex>
      </div>
      <Link
        className={styles.link}
        href={`/Everyone/Notification/${notification._id}`}
      >
        <div className={styles.body}>
          {/* Title and Content */}
          <span className={styles.title}>
            <Text fontWeight="bold" fontSize="1.1em">
              {notification.title}
            </Text>
          </span>
          <Text fontSize="sm" color={"hsl(var(--pc) /70% )"}>
            {notification.body}
          </Text>
        </div>
      </Link>

      <div className={styles.footer}>
        {/* Date and time without icons */}

        <Text fontSize="sm" color="hsl(var(--nc) )">
          {formatDateTime(new Date(notification.date))}
        </Text>

        {/* Badge */}
        <Flex>
          <div className={styles.badgesWrapper}>
            {!notification.seen && <Badge colorScheme="green">New</Badge>}
            <Badge colorScheme={getRoleColor(notification.audience)}>
              {" "}
              {notification.audience}
            </Badge>
            <Badge colorScheme={notification.badgeColor}>
              {" "}
              {notification.badgeText}{" "}
            </Badge>
          </div>
          <Spacer />
          {adminMode && (
            <div className={styles.viewsDisplay}>
              <button className={styles.viewsText} onClick={onViewsOpen}>
                {viewsFormatter.format(notification.seenByCount)}
                {"  "}
                {notification.seenByCount === 1 ? "view" : "views"}
              </button>
              <button
                className={styles.del}
                aria-label="delete"
                onClick={onDeleteOpen}
              >
                <DeleteIcon />
              </button>
              <DeleteConfirmationModal
                notificationId={notification._id.toString()}
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
              />
              <ListViewersModal
                isOpen={isViewsOpen}
                onClose={onViewsClose}
                notificationId={notification._id.toString()}
              />
            </div>
          )}
        </Flex>
      </div>
    </MotionDiv>
  );
}
