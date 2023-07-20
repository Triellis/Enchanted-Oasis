import { fetcher, formatDateTime, getRoleColor } from "@/lib/functions";
import Layout from "@/pages/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";

import styles from "./Notification.module.css";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import remarkGfm from "remark-gfm";
import { Flex, Avatar, Badge, Box, Text, Divider } from "@chakra-ui/react";
import { AdminNotificationOnClient } from "@/lib/types";

function useNotification(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/notification/${id}`,
    fetcher
  );
  return {
    notification: data as AdminNotificationOnClient,
    isLoading,
    error: error,
    mutate,
  };
}

function NotificationComponent({
  notification,
}: {
  notification: AdminNotificationOnClient;
}) {
  return (
    <div className={styles.notifMain}>
      {/* title */}
      <div className={styles.title}>{notification.title}</div>

      {/* Profile */}
      <div className={styles.notifProfile}>
        <div className={styles.whoBox}>
          <Avatar src={notification.creator.profilePicture} size="lg" />
          <Flex flexDirection="column">
            <span className={styles.infoName}>{notification.creator.name}</span>
            <span className={styles.infoEmail}>
              {" "}
              {notification.creator.email}
            </span>
          </Flex>
        </div>
      </div>
      <Divider />

      <div className={styles.notifMisc}>
        <div className={styles.badges}>
          <span>
            <Badge colorScheme={notification.badgeColor}>
              {notification.badgeText}
            </Badge>
          </span>
          <span>
            <Badge colorScheme={getRoleColor(notification.audience)}>
              {notification.audience}
            </Badge>
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          {notification.seenByCount + " "} views
          <Flex className={styles.whenBox}>
            <span className={styles.infoDateTime}>
              {formatDateTime(new Date(notification.date))}
            </span>
          </Flex>
        </div>
      </div>
      <Divider />

      {/* content of the notification */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className={styles.markDownArea}
        components={ChakraUIRenderer()}
      >
        {notification.body}
      </ReactMarkdown>
    </div>
  );
}

export default function NotificationPage() {
  const router = useRouter();
  const { notification, isLoading, error } = useNotification(
    router.query.notificationId as string
  );
  let notificationComponent;
  if (isLoading) {
    notificationComponent = <div>Loading...</div>;
  } else if (error) {
    notificationComponent = <div>Error: {error}</div>;
  } else {
    notificationComponent = (
      <NotificationComponent notification={notification} />
    );
  }

  return (
    <Layout>
      <div>{notificationComponent}</div>
    </Layout>
  );
}
