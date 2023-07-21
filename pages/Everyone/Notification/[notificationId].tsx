import { fetcher, formatDateTime, getRoleColor } from "@/lib/functions";
import Layout from "@/pages/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";

import styles from "./Notification.module.css";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import remarkGfm from "remark-gfm";
import {
  Flex,
  Avatar,
  Badge,
  Box,
  Text,
  Divider,
  Center,
} from "@chakra-ui/react";
import { AdminNotificationOnClient, MySession } from "@/lib/types";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

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
  adminMode = false,
}: {
  notification: AdminNotificationOnClient;
  adminMode?: boolean;
}) {
  const viewsFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        notation: "standard",
        compactDisplay: "short",
      }),
    []
  );
  return (
    <div className={styles.notifMain}>
      {/* title */}
      <div className={styles.title}>{notification.title}</div>

      {/* Profile */}
      <div className={styles.notifProfile}>
        <div className={styles.whoBox}>
          <Avatar src={notification.creator.profilePicture} size="md" />
          <Flex flexDirection="column">
            <span className={styles.infoName}>{notification.creator.name}</span>
            <span className={styles.infoEmail}>
              {" "}
              {notification.creator.email}
            </span>
          </Flex>
        </div>
      </div>
      <Divider w={{ md: 0 }} />

      <div className={styles.notifDetails}>
        <span className={styles.badgeWrapper}>
          <Badge colorScheme={getRoleColor(notification.audience)}>
            {notification.audience}
          </Badge>
        </span>
        <span className={styles.badgeWrapper}>
          <Badge colorScheme={notification.badgeColor}>
            {notification.badgeText}
          </Badge>
        </span>
        <Center height="1.5em">
          <Divider orientation="vertical" />
        </Center>
        <span className={styles.infoDateTime}>
          {formatDateTime(new Date(notification.date))}
        </span>
        {adminMode && (
          <span className={styles.viewsWrapper}>
            {viewsFormatter.format(notification.seenByCount) + " "} views
          </span>
        )}
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
  const session = useSession();
  const sessionData = session.data as MySession;
  const { notification, isLoading, error } = useNotification(
    router.query.notificationId as string
  );

  let notificationComponent;
  if (isLoading) {
    notificationComponent = <div>Loading...</div>;
  } else if (error) {
    notificationComponent = <div>Error</div>;
  } else {
    notificationComponent = (
      <NotificationComponent
        adminMode={session && sessionData?.user?.role === "Admin"}
        notification={notification}
      />
    );
  }

  return <Layout>{notificationComponent}</Layout>;
}
