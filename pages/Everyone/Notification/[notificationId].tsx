import { fetcher } from "@/lib/functions";
import Layout from "@/pages/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";

import styles from "./Notification.module.css";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import remarkGfm from "remark-gfm";

function useNotification(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/notification/${id}`,
    fetcher
  );
  return {
    notification: data as Notification,
    isLoading,
    error: error,
    mutate,
  };
}

function NotificationComponent({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div>
      <h1>{notification.title}</h1>
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
