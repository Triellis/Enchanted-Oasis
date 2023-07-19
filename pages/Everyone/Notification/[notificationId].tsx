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

export default function notificationsPage() {
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
      <div>
        <h1>{notification.title}</h1>
        <p>{notification.body}</p>
      </div>
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
