import { fetcher } from "@/lib/functions";
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
          <Avatar src="https://bit.ly/sage-adebayo" size="lg" />
          <Flex flexDirection="column">
            <span className={styles.infoName}>Segun Adebayo</span>
            <span className={styles.infoEmail}> admin@gmail.com</span>
          </Flex>
        </div>
      </div>

      <Divider />
      <div className={styles.notifMisc}>
        <div className={styles.badges}>
          <Badge colorScheme="green">Published</Badge>
          <Badge colorScheme="green">Published</Badge>
        </div>
        <div style={{ textAlign: "right" }}>
          69views
          <Flex className={styles.whenBox}>
            <span className={styles.infoDateTime}>12/12/2021 • 12:00 PM</span>
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
