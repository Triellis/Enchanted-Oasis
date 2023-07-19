import {
  Flex,
  Avatar,
  Badge,
  Text,
  Box,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import styles from "./NotifItem.module.css";
import { CalendarIcon, EmailIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";
import { AdminNotificationOnClient } from "@/lib/types";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";

function formatDateTime(date: Date) {
  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedTime = time.toLowerCase().replace(/\s/g, "");

  const formattedDate = date.toLocaleDateString(["en-GB"], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedDateTime = `${formattedTime} • ${formattedDate}`;
  return formattedDateTime;
}

//  function should send a DELETE request to this URL /api/notification/[notificationId]
//  with the notificationId as a query parameter
async function deleteNotification(notificationId: string) {
  // const res = await fetch(`/api/notification/${notificationId}`, {
  //   method: "DELETE",
  // });
  // if (res.ok) {
  //   console.log("Notification deleted");
  // } else {
  //   console.log("Notification not deleted");
  // }
  console.log("deleted");
}

export default function NotifItem({
  notification,
}: {
  notification: AdminNotificationOnClient;
}) {
  const viewsFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        notation: "compact",
        compactDisplay: "short",
      }),
    []
  );
  return (
    <div
      className={classNames(
        styles.notifItem,
        !notification.seen && styles.unreadNotif
      )}
    >
      <Link href={`/Everyone/Notification/${notification._id}`}>
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
        <div className={styles.footer}>
          {/* Date and time without icons */}

          <Text fontSize="sm" color="hsl(var(--nc) )">
            {formatDateTime(new Date(notification.date))}
          </Text>

          {/* Badge */}
          <Flex>
            <div className={styles.badgesWrapper}>
              {!notification.seen && <Badge colorScheme="green">New</Badge>}
              <Badge colorScheme="blue"> {notification.audience}</Badge>
              <Badge colorScheme={notification.badgeColor}>
                {" "}
                {notification.badgeText}{" "}
              </Badge>
            </div>
            <Spacer />
            <div className={styles.viewsDisplay}>
              {viewsFormatter.format(notification.seenByCount)}
              <span className={styles.viewsText}>
                {notification.seenByCount === 1 ? "view" : "views"}
              </span>
              <IconButton
                className={styles.del}
                aria-label="delete"
                icon={<FiTrash2 />}
                onClick={() => {
                  deleteNotification(notification._id.toString());
                }}
              />
            </div>
          </Flex>
        </div>
      </Link>
    </div>
  );
}
