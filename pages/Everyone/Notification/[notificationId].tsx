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
  Divider,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AdminNotificationOnClient,
  CourseNotifOnClient,
  MySession,
  ReceivedUserDataOnClient,
} from "@/lib/types";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import UserList from "@/components/UserList";
import Pagination from "@/components/Pagination";
import ListViewersModal from "@/components/ListViewersModal";
import FilePreview from "@/components/FilePreview";

function useNotification(id: string, courseId: string | undefined) {
  let url;
  if (courseId) {
    url = `/api/course/${courseId}/notifications/${id}`;
  } else {
    url = `/api/notification/${id}`;
  }

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return {
    notification: data as AdminNotificationOnClient & CourseNotifOnClient,
    isLoading,
    error: error,
    mutate,
  };
}

function NotificationComponent({
  notification,
  adminMode = false,
}: {
  notification: AdminNotificationOnClient & CourseNotifOnClient;
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
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          {notification.audience && (
            <Badge colorScheme={getRoleColor(notification.audience)}>
              {notification.audience}
            </Badge>
          )}
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
            <button className={styles.viewsBtn} onClick={onOpen}>
              {viewsFormatter.format(notification.seenByCount) + " "} views
            </button>
            <ListViewersModal
              notificationId={notification._id.toString()}
              isOpen={isOpen}
              onClose={onClose}
            />
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
      {notification.attachment && <FilePreview url={notification.attachment} />}
    </div>
  );
}

export default function NotificationPage() {
  const router = useRouter();
  const session = useSession();
  const sessionData = session.data as MySession;
  const courseId = router.query.courseId as string | undefined;
  const { notification, isLoading, error } = useNotification(
    router.query.notificationId as string,
    courseId
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
