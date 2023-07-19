import { fetcher } from "@/lib/functions";
import Layout from "@/pages/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";

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
      <p>{notification.body}</p>
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
      <div>
        <h1>{notificationComponent}</h1>
      </div>
    </Layout>
  );
}
