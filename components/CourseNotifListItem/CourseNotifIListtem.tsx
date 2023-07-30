import { CourseNotifOnClient } from "@/lib/types";
import MotionDiv from "../MotionDiv";
import classNames from "classnames";
import { Avatar, Badge, Flex, Spacer, Text } from "@chakra-ui/react";
import { formatDateTime, getRoleColor } from "@/lib/functions";
import styles from "@/components/NotifItem/NotifItem.module.css";
import Link from "next/link";
export default function CourseNotifItem({
  notification,
  mutate,
}: {
  notification: CourseNotifOnClient;
  mutate: () => void;
}) {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className={classNames(styles.notifItem)}>
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
            <Badge colorScheme={notification.badgeColor}>
              {" "}
              {notification.badgeText}{" "}
            </Badge>
          </div>
          <Spacer />
        </Flex>
      </div>
    </div>
  );
}
